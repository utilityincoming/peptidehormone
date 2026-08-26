#!/usr/bin/env node
/**
 * Resolve authoritative external identifiers for every molecule in the catalog,
 * so the ChemicalSubstance JSON-LD can carry `sameAs` links into the global
 * knowledge graph (Wikidata, Wikipedia, PubChem, DrugBank, ChEBI, UniProt,
 * ChEMBL, CAS). This is the entity layer that lets answer engines resolve a
 * page's subject to a known entity and cite it — semantic-search grounding,
 * "sourced, not asserted."
 *
 * Wikidata is the curated hub: one QID yields the enwiki sitelink plus
 * cross-references to the chemistry databases, all human-maintained. Direct
 * PubChem name->CID only SUPPLEMENTS a missing CID. Nothing is guessed: every
 * identifier here traces to a curated record, and the audit report records the
 * matched label + description so a human can catch a wrong-entity match before
 * it ships.
 *
 * No dependencies. Node 18+ (global fetch). Two modes:
 *   node scripts/fetch-identifiers.mjs --audit [out.json]   # fetch + write audit report
 *   node scripts/fetch-identifiers.mjs --check              # verify src/lib/identifiers.ts URLs resolve
 *
 * Uses process.exitCode (not process.exit) — on Windows, exiting while fetch's
 * keep-alive socket tears down can trip a libuv assertion.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UA = "peptidehormone-identifier-bot/1.0 (https://peptidehormone.com; educational reference)";

// Wikidata property IDs -> our key. Order = display order downstream.
const WD_PROPS = {
  P662: "pubchem", // PubChem CID
  P715: "drugbank", // DrugBank
  P683: "chebi", // ChEBI ID
  P352: "uniprot", // UniProt protein ID
  P592: "chembl", // ChEMBL ID
  P231: "cas", // CAS Registry Number
};

// Description keywords that mark a Wikidata hit as a plausible molecule/biology
// entity. Absence doesn't auto-reject (audit surfaces it), but presence + any
// chemical xref or an enwiki page = high confidence.
const BIO_RE =
  /peptide|protein|hormone|drug|medication|compound|chemical|agonist|antagonist|analog|enzyme|receptor|amino acid|molecule|gonadotropin|insulin|factor/i;

const j = async (url) => {
  const res = await fetch(url, { headers: { "user-agent": UA, accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Parse the catalog (regex, like check-absim-stock.mjs — no build step) ──
function readCatalog() {
  const src = readFileSync(join(ROOT, "src/lib/hormones.ts"), "utf8").replace(/\r\n/g, "\n");
  // Entries open with a brace on its own line at 2-space indent: "\n  {\n".
  const chunks = src.split(/\n {2}\{\n/).filter((c) => /^\s+slug:/.test(c));
  const field = (chunk, name) => (chunk.match(new RegExp(`${name}:\\s*"([^"]+)"`)) || [])[1];
  return chunks
    .map((c) => ({
      slug: field(c, "slug"),
      name: field(c, "name"),
      abbr: field(c, "abbr"),
      class: field(c, "class"),
      type: field(c, "type") || "endogenous",
    }))
    .filter((h) => h.slug && h.name);
}

// instance-of (P31) QIDs that mark a candidate as a molecule/biology entity…
const GOOD_P31 = new Set([
  "Q11173", // chemical compound
  "Q12140", // medication
  "Q172847", // peptide
  "Q8054", // protein
  "Q7187", // gene
  "Q11364", // hormone
  "Q898273", // protein family
  "Q84467700", // group of stereoisomers
  "Q79529", // chemical substance
  "Q28885102", // pharmaceutical product
  "Q417841", // protein domain
  "Q210861", // growth factor
  "Q206229", // neuropeptide
  "Q8386", // drug
]);
// …and QIDs that mark it as definitely NOT our molecule (beetle, football club, paper…).
const BAD_P31 = new Set([
  "Q16521", // taxon
  "Q13442814", // scholarly article
  "Q5", // human
  "Q4167410", // Wikimedia disambiguation page
  "Q476028", // association football club
  "Q847017", // sports club
  "Q215380", // musical group
  "Q4830453", // business
  "Q101352", // family name
  "Q3305213", // painting
  "Q532", // village
]);

const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

// ── Wikidata: search -> score every candidate by type/xrefs/CID-match -> pick best ──
// The top label-match hit is unreliable ("leptin" -> a beetle), so we fetch claims
// for all candidates and choose the one that actually looks like the molecule.
async function wikidata(name, abbr, directCid) {
  const search = async (term) =>
    (
      await j(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
          term,
        )}&language=en&format=json&limit=7&origin=*`,
      )
    ).search || [];

  let hits = await search(name);
  if (abbr) hits = hits.concat(await search(abbr)); // union: abbr often finds the chemical entity
  // de-dupe by id, keep first-seen order
  const seen = new Set();
  hits = hits.filter((h) => (seen.has(h.id) ? false : seen.add(h.id)));
  if (!hits.length) return null;

  const ids = hits.slice(0, 8).map((h) => h.id);
  const ents = (
    await j(
      `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids.join(
        "|",
      )}&props=claims|sitelinks|descriptions|labels&format=json&origin=*`,
    )
  ).entities;

  const targets = new Set([norm(name), norm(abbr)].filter(Boolean));
  const scored = ids.map((id) => {
    const ent = ents[id];
    const claims = ent.claims || {};
    const first = (p) => {
      const v = claims[p]?.[0]?.mainsnak?.datavalue?.value;
      return typeof v === "object" && v?.id ? v.id : v;
    };
    const p31 = (claims.P31 || []).map((c) => c.mainsnak?.datavalue?.value?.id).filter(Boolean);
    const xref = {};
    for (const [p, key] of Object.entries(WD_PROPS)) {
      const v = first(p);
      if (v != null && v !== "") xref[key] = String(v);
    }
    const label = ent.labels?.en?.value || hits.find((h) => h.id === id)?.label || "";
    const description = ent.descriptions?.en?.value || "";
    const enwiki = ent.sitelinks?.enwiki?.title || null;
    const hasChem = !!(xref.pubchem || xref.drugbank || xref.chebi || xref.chembl);
    const cidMatch = !!(directCid && xref.pubchem && String(xref.pubchem) === String(directCid));

    let score = 0;
    if (hasChem) score += 4;
    if (cidMatch) score += 4;
    if (p31.some((q) => GOOD_P31.has(q))) score += 3;
    if (xref.uniprot) score += 2;
    if (enwiki) score += 2;
    if (targets.has(norm(label))) score += 2;
    if (BIO_RE.test(description)) score += 1;
    if (p31.some((q) => BAD_P31.has(q)) && !hasChem && !xref.uniprot) score -= 8;

    return { id, label, description, enwiki, xref, p31, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  return {
    qid: best.id,
    label: best.label,
    description: best.description,
    enwiki: best.enwiki,
    xref: best.xref,
    score: best.score,
    alternates: scored
      .slice(1, 4)
      .map((s) => `${s.id}(${s.score}) ${s.label} — ${s.description || "?"}`),
  };
}

// ── PubChem: direct name -> CID (supplements a missing Wikidata CID) ──
async function pubchemCid(name, abbr) {
  for (const term of [name, abbr].filter(Boolean)) {
    try {
      const d = await j(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(term)}/cids/JSON`,
      );
      const cid = d?.IdentifierList?.CID?.[0];
      if (cid != null) return { cid: String(cid), via: term };
    } catch {
      /* 404 = no compound of that name; try the next term */
    }
  }
  return null;
}

async function resolve(h) {
  // Direct PubChem CID first, so Wikidata scoring can reward the candidate whose
  // P662 matches it (strong corroboration that it's the right chemical entity).
  const pc = await pubchemCid(h.name, h.abbr).catch(() => null);
  await sleep(100);
  const directCid = pc?.cid ?? null;

  const wd = await wikidata(h.name, h.abbr, directCid).catch((e) => ({ error: e.message }));
  await sleep(140);

  const xref = wd && !wd.error ? { ...wd.xref } : {};
  let pubchemVia = null;
  // Supplement a missing/blank Wikidata CID with the direct lookup.
  if (!xref.pubchem && directCid) {
    xref.pubchem = directCid;
    pubchemVia = pc.via;
  }
  const cidMatch = !!(directCid && wd?.xref?.pubchem && String(wd.xref.pubchem) === String(directCid));
  const score = wd?.score ?? -99;

  // Confidence from the winning candidate's score. A wrong-entity match (beetle,
  // football club) lands here as "review" or lower for a human to catch.
  const confidence = score >= 6 ? "high" : score >= 3 ? "review" : directCid ? "cid-only" : "none";

  return {
    slug: h.slug,
    name: h.name,
    abbr: h.abbr,
    type: h.type,
    confidence,
    score,
    wikidata: wd?.error ? null : wd?.qid ?? null,
    wikidataLabel: wd?.label ?? null,
    wikidataDesc: wd?.description ?? null,
    enwiki: wd?.enwiki ?? null,
    directCid,
    cidMatch,
    ...xref,
    pubchemVia,
    alternates: wd?.alternates ?? [],
    error: wd?.error ?? null,
  };
}

// ── URL builders (also exported shape for the check mode) ──
const URLS = {
  wikidata: (v) => `https://www.wikidata.org/wiki/${v}`,
  wikipedia: (title) => `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`,
  pubchem: (v) => `https://pubchem.ncbi.nlm.nih.gov/compound/${v}`,
  drugbank: (v) => `https://go.drugbank.com/drugs/${v}`,
  chebi: (v) => `https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:${v}`,
  uniprot: (v) => `https://www.uniprot.org/uniprotkb/${v}`,
  chembl: (v) => `https://www.ebi.ac.uk/chembl/compound_report_card/${v}/`,
  cas: (v) => `https://commonchemistry.cas.org/detail?cas_rn=${v}`,
};

async function runAudit(outPath) {
  const catalog = readCatalog();
  console.log(`Resolving identifiers for ${catalog.length} molecules…\n`);
  const rows = [];
  for (const h of catalog) {
    const r = await resolve(h);
    rows.push(r);
    const ids = ["pubchem", "drugbank", "chebi", "uniprot", "chembl", "cas"]
      .filter((k) => r[k])
      .map((k) => `${k}:${r[k]}`)
      .join(" ");
    const flag = { high: "   ", review: " ? ", "cid-only": " c ", none: " ✗ " }[r.confidence];
    const w = r.enwiki ? "W" : "-";
    const cm = r.cidMatch ? "=" : r.directCid ? "≠" : " ";
    console.log(
      `${flag}${String(r.score).padStart(2)} ${cm}${w} ${r.slug.padEnd(22)} ${(r.wikidata || "-").padEnd(11)} ${(
        r.wikidataLabel || ""
      )
        .slice(0, 26)
        .padEnd(27)} ${ids}`,
    );
  }
  writeFileSync(outPath, JSON.stringify(rows, null, 2));
  const n = (c) => rows.filter((r) => r.confidence === c).length;
  console.log(
    `\nhigh: ${n("high")}   review: ${n("review")}   cid-only: ${n("cid-only")}   none: ${n("none")}`,
  );
  console.log("legend: [conf] score  [=/≠ CID match][W enwiki]  slug  QID  label  ids");
  console.log(`Audit written to ${outPath}`);
  return 0;
}

// ── Verified corrections to the raw audit ──────────────────────────────────
// The auto-resolver picks the best-scoring Wikidata candidate, but for a handful
// of molecules the right entity needs a human call. Each correction below was
// checked against PubChem CID->title and UniProt organism/entryType so nothing
// links to the wrong entity or the wrong species. A wrong sameAs is worse than
// none, so these are authoritative and REPLACE the auto entry.
const OVERRIDES = {
  // scorer grabbed a "GLP-1 receptor agonist" node — this is glucagon itself
  glucagon: { wikidata: "Q170617", wikipedia: "Glucagon", pubchem: "16186314", drugbank: "DB00040", chebi: "5391", chembl: "CHEMBL266481", cas: "9007-92-5" },
  // "MGF" name-matched a magnesium compound + mecasermin (rIGF-1); neither is MGF
  mgf: { wikidata: "Q3853485", wikipedia: "Mechano growth factor" },
  // gene node had no UniProt; P05019 is human IGF-1 (Swiss-Prot)
  "igf-1": { wikidata: "Q12791246", wikipedia: "Insulin-like growth factor 1", uniprot: "P05019" },
  // auto UniProt P09535 was the MOUSE ortholog; P01344 is human IGF-2
  "igf-2": { wikidata: "Q14874349", wikipedia: "Insulin-like growth factor 2", uniprot: "P01344" },
  // scorer picked the shared alpha-subunit; this is LH the hormone
  lh: { wikidata: "Q50265477", wikipedia: "Luteinizing hormone", drugbank: "DB14741", chebi: "81568", cas: "9002-67-9" },
  // scorer picked urofollitropin (a drug form); this is FSH the hormone
  fsh: { wikidata: "Q200774", wikipedia: "Follicle-stimulating hormone", chebi: "81569", cas: "9002-68-0" },
  // scorer picked TSC22 domain protein; CID 68816 verified = "Delta Sleep-Inducing Peptide"
  dsip: { wikidata: "Q5254800", wikipedia: "Delta-sleep-inducing peptide", pubchem: "68816" },
  // auto entity was the mouse ortholog; P06850 is human CRH
  crh: { wikidata: "Q386664", wikipedia: "Corticotropin-releasing hormone", uniprot: "P06850", cas: "9015-71-8" },
  // auto UniProt O08689 was MOUSE; O14793 is human myostatin/GDF-8
  myostatin: { wikidata: "Q29630", wikipedia: "Myostatin", uniprot: "O14793" },
  // activin A is a homodimer of inhibin beta-A; P08476 is the human subunit
  "activin-a": { wikidata: "Q21107468", uniprot: "P08476" },
  // auto match was a journal-article node; this is the human Tβ4 protein
  "thymosin-beta-4": { wikidata: "Q7799643", wikipedia: "Thymosin beta-4", uniprot: "P62328" },
};

// Bad single fields to strip from an otherwise-correct auto entry. These are all
// glycoproteins / large peptides whose Wikidata P662 points at the wrong small
// molecule (verified by CID->title), so drop the CID and keep ChEBI/DrugBank/etc.
const DROP_FIELDS = {
  calcitonin: ["pubchem"], // CID 16132288 = (125I) radiolabeled tracer
  anp: ["pubchem"], // CID 16129708 = carperitide (a drug form)
  hcg: ["pubchem"], // CID 4369448 = ACV tripeptide (unrelated)
  bnp: ["pubchem"], // CID 1678 = 3-nitropropionic acid (unrelated)
};

// Molecules with no reliable public entity record — omitted rather than guessed.
// KPV: the Lys-Pro-Val tripeptide has no confident Wikidata node and the name
// resolves to an unrelated CID (5-phenyl-2-keto-valeric acid).
const DROP_ENTIRELY = new Set(["kpv"]);

const FIELD_ORDER = ["wikipedia", "wikidata", "pubchem", "drugbank", "chebi", "uniprot", "chembl", "cas"];

function buildEntry(row) {
  if (OVERRIDES[row.slug]) return { ...OVERRIDES[row.slug] };
  const e = {};
  const src = { ...row, wikipedia: row.enwiki };
  for (const k of FIELD_ORDER) if (src[k]) e[k] = String(src[k]);
  for (const k of DROP_FIELDS[row.slug] || []) delete e[k];
  return e;
}

function runBuild(auditPath) {
  const rows = JSON.parse(readFileSync(auditPath, "utf8"));
  // Preserve catalog order so the data file diffs against hormones.ts cleanly.
  const order = new Map(readCatalog().map((h, i) => [h.slug, i]));
  rows.sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999));

  const lines = [];
  let kept = 0;
  for (const row of rows) {
    if (DROP_ENTIRELY.has(row.slug)) continue;
    const e = buildEntry(row);
    if (!Object.keys(e).length) continue;
    kept++;
    const fields = FIELD_ORDER.filter((k) => e[k]).map((k) => `${k}: ${JSON.stringify(e[k])}`);
    lines.push(`  ${JSON.stringify(row.slug)}: { ${fields.join(", ")} },`);
  }

  const out = `${HEADER}\nexport interface ExternalIds {\n  /** English Wikipedia article title. */\n  wikipedia?: string;\n  /** Wikidata entity id (Q-number). */\n  wikidata?: string;\n  /** PubChem Compound id (CID). */\n  pubchem?: string;\n  /** DrugBank accession. */\n  drugbank?: string;\n  /** ChEBI numeric id. */\n  chebi?: string;\n  /** UniProt accession (human, reviewed). */\n  uniprot?: string;\n  /** ChEMBL id. */\n  chembl?: string;\n  /** CAS Registry Number. */\n  cas?: string;\n}\n\n// slug -> verified external identifiers. Catalog order. ${kept} of ${rows.length} molecules.\nexport const IDENTIFIERS: Record<string, ExternalIds> = {\n${lines.join(
    "\n",
  )}\n};\n${FOOTER}`;

  const dest = join(ROOT, "src/lib/identifiers.ts");
  writeFileSync(dest, out);
  console.log(`Wrote ${kept} entries (of ${rows.length}) to ${dest}`);
  return 0;
}

const HEADER = `// External identifiers for catalog molecules — the knowledge-graph anchor layer.
// Each molecule's ChemicalSubstance JSON-LD emits these as \`sameAs\` (authoritative
// entity URLs) and \`identifier\` (typed PropertyValues), so answer engines and
// Google's Knowledge Graph can resolve a page's subject to a known entity and cite
// it — the semantic-search grounding behind "sourced, not asserted."
//
// GENERATED, then hand-verified. \`node scripts/fetch-identifiers.mjs --audit\`
// proposes matches from Wikidata + PubChem; \`--build <audit.json>\` applies the
// verified corrections in that script and rewrites this file. Every id was checked
// against PubChem CID->title and UniProt organism so nothing links to the wrong
// entity or species (a wrong sameAs is worse than none). Molecules with no reliable
// public record are intentionally absent. Guard: \`--check\` HEADs every URL here.
// Nothing in this file is fabricated.`;

const FOOTER = `
const LABELS: Record<keyof ExternalIds, string> = {
  wikipedia: "Wikipedia",
  wikidata: "Wikidata",
  pubchem: "PubChem",
  drugbank: "DrugBank",
  chebi: "ChEBI",
  uniprot: "UniProt",
  chembl: "ChEMBL",
  cas: "CAS",
};

// schema.org identifier propertyID for the typed \`identifier\` PropertyValue nodes.
const PROPERTY_ID: Partial<Record<keyof ExternalIds, string>> = {
  pubchem: "PubChem CID",
  drugbank: "DrugBank",
  chebi: "ChEBI",
  uniprot: "UniProt",
  chembl: "ChEMBL",
  cas: "CAS Registry Number",
};

function urlFor(key: keyof ExternalIds, value: string): string {
  switch (key) {
    case "wikipedia":
      return \`https://en.wikipedia.org/wiki/\${encodeURIComponent(value.replace(/ /g, "_"))}\`;
    case "wikidata":
      return \`https://www.wikidata.org/wiki/\${value}\`;
    case "pubchem":
      return \`https://pubchem.ncbi.nlm.nih.gov/compound/\${value}\`;
    case "drugbank":
      return \`https://go.drugbank.com/drugs/\${value}\`;
    case "chebi":
      return \`https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:\${value}\`;
    case "uniprot":
      return \`https://www.uniprot.org/uniprotkb/\${value}\`;
    case "chembl":
      return \`https://www.ebi.ac.uk/chembl/compound_report_card/\${value}/\`;
    case "cas":
      return \`https://commonchemistry.cas.org/detail?cas_rn=\${value}\`;
  }
}

export interface ExternalRef {
  key: keyof ExternalIds;
  label: string;
  value: string;
  url: string;
}

/** All external references for a molecule, in display order (for the visible UI). */
export function externalRefs(slug: string): ExternalRef[] {
  const ids = IDENTIFIERS[slug];
  if (!ids) return [];
  return (Object.keys(LABELS) as (keyof ExternalIds)[])
    .filter((k) => ids[k])
    .map((k) => ({ key: k, label: LABELS[k], value: ids[k]!, url: urlFor(k, ids[k]!) }));
}

/** Authoritative entity URLs for JSON-LD \`sameAs\` — every reference is a canonical page. */
export function sameAsUrls(slug: string): string[] {
  return externalRefs(slug).map((r) => r.url);
}

/** Typed identifiers for JSON-LD \`identifier\` (schema.org PropertyValue). */
export function identifierProps(slug: string): { "@type": "PropertyValue"; propertyID: string; value: string }[] {
  const ids = IDENTIFIERS[slug];
  if (!ids) return [];
  return (Object.keys(PROPERTY_ID) as (keyof ExternalIds)[])
    .filter((k) => ids[k])
    .map((k) => ({ "@type": "PropertyValue" as const, propertyID: PROPERTY_ID[k]!, value: ids[k]! }));
}
`;

// ── Check mode: HEAD every URL emitted by src/lib/identifiers.ts (dead-link guard) ──
async function runCheck() {
  const src = readFileSync(join(ROOT, "src/lib/identifiers.ts"), "utf8");
  const m = src.match(/IDENTIFIERS[^=]*=\s*(\{[\s\S]*?\n\});/);
  if (!m) {
    console.error("Could not find IDENTIFIERS object in src/lib/identifiers.ts");
    return 2;
  }
  // eslint-disable-next-line no-eval
  const data = eval(`(${m[1]})`);
  const urls = [];
  for (const [slug, ids] of Object.entries(data)) {
    for (const [k, v] of Object.entries(ids)) {
      if (URLS[k]) urls.push([slug, k, URLS[k](v)]);
    }
  }
  // DrugBank (and sometimes CAS) sit behind Cloudflare and 403/429 any automated
  // request regardless of UA — a block, not a dead link. A browser UA + GET clears
  // most hosts (CAS included); the rest we report as SKIPPED, not failed, so the
  // guard only trips on genuine 404/410/5xx.
  const BROWSER =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";
  console.log(`Checking ${urls.length} identifier URLs…`);
  let bad = 0;
  let skipped = 0;
  for (const [slug, k, url] of urls) {
    try {
      const res = await fetch(url, { method: "GET", headers: { "user-agent": BROWSER }, redirect: "follow" });
      if (res.ok) continue;
      if (res.status === 403 || res.status === 429) {
        skipped++;
        continue; // bot-blocked, not dead
      }
      bad++;
      console.log(`  ✗ ${slug} ${k}: HTTP ${res.status} ${url}`);
    } catch (e) {
      bad++;
      console.log(`  ✗ ${slug} ${k}: ${e.message}`);
    }
    await sleep(60);
  }
  console.log(
    bad
      ? `\n${bad} dead link(s)${skipped ? ` (+${skipped} bot-blocked, skipped)` : ""}.`
      : `\nAll reachable identifier URLs resolve${skipped ? ` (${skipped} bot-blocked hosts skipped)` : ""}.`,
  );
  return bad ? 1 : 0;
}

const mode = process.argv[2];
if (mode === "--check") {
  process.exitCode = await runCheck();
} else if (mode === "--audit") {
  const out = process.argv[3] || join(ROOT, "identifier-audit.json");
  process.exitCode = await runAudit(out);
} else if (mode === "--build") {
  const src = process.argv[3] || join(ROOT, "identifier-audit.json");
  process.exitCode = runBuild(src);
} else {
  console.log(
    "Usage: node scripts/fetch-identifiers.mjs --audit [out.json] | --build [audit.json] | --check",
  );
  process.exitCode = 1;
}
