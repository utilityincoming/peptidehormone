#!/usr/bin/env node
/**
 * Live pharmacovigilance counts for every catalog molecule — how large a
 * post-market adverse-event footprint each one has RIGHT NOW in the FDA's
 * public FAERS database, via the openFDA drug/event API. The monograph reads
 * this as a retrieval-stamped count with a link to the exact live query, so a
 * reader can re-run the search and get the same (or a newer) number.
 *
 * A FAERS footprint is a REGULATORY signal, not a safety verdict, and its
 * absence is as telling as its presence:
 *   - A large count means the compound is an approved drug the FDA has been
 *     collecting spontaneous reports on for years. It says how much real-world
 *     exposure and reporting exists — NOT that the drug is more dangerous. High
 *     counts track prescribing volume as much as anything.
 *   - Zero (openFDA 404s rather than returning total:0) means the compound has
 *     no mapped product in FAERS — the ordinary state for a research peptide
 *     that was never approved and is not prescribed. That is honest signal: no
 *     pharmacovigilance apparatus is watching it. Read it that way, not as
 *     "clean."
 * We deliberately do not roll these into a score — see /methodology. Tier the
 * claim, not the compound.
 *
 * Sources
 *   openFDA drug/event API — FAERS reports whose drug maps (by generic, brand
 *     or substance name, exact) to the molecule. Total, serious, death counts
 *     and the top reported reaction terms.
 *
 * No dependencies. Node 18+. Writes src/lib/adverse-live.ts.
 *   node scripts/fetch-adverse-events.mjs            # refresh everything
 *   node scripts/fetch-adverse-events.mjs semaglutide # one molecule (debug, no write)
 *
 * Optional: set OPENFDA_API_KEY to lift the rate limit (240/min, 1000/day
 * anonymous → 240/min, 120000/day keyed). https://open.fda.gov/apis/authentication/
 *
 * Uses process.exitCode, not process.exit — see fetch-identifiers.mjs.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UA = "peptidehormone-evidence-bot/1.0 (https://peptidehormone.com; educational reference)";
const KEY = process.env.OPENFDA_API_KEY ? `&api_key=${process.env.OPENFDA_API_KEY}` : "";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// openFDA returns 404 with {error:{code:"NOT_FOUND"}} for a search that matches
// nothing — that is a legitimate "zero", not a failure. getJson maps it to null;
// every real network/HTTP error still throws and is retried.
async function getJson(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": UA, accept: "application/json" } });
      if (res.status === 404) return null;
      if (res.status === 429) throw new Error("HTTP 429 (rate limited)");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === tries - 1) throw new Error(`${e.message} for ${url}`);
      await sleep(2000 * (i + 1));
    }
  }
}

// ── Catalog (regex over hormones.ts + aliases.ts, no build step) ──
function readCatalog() {
  const src = readFileSync(join(ROOT, "src/lib/hormones.ts"), "utf8").replace(/\r\n/g, "\n");
  const chunks = src.split(/\n {2}\{\n/).filter((c) => /^\s+slug:/.test(c));
  const field = (chunk, name) => (chunk.match(new RegExp(`\\b${name}:\\s*"([^"]+)"`)) || [])[1];
  return chunks
    .map((c) => ({ slug: field(c, "slug"), name: field(c, "name"), abbr: field(c, "abbr") }))
    .filter((h) => h.slug && h.name);
}
function readAliases() {
  const src = readFileSync(join(ROOT, "src/lib/aliases.ts"), "utf8");
  const body = src.split("export const ALIASES")[1].split("};")[0];
  const out = {};
  for (const m of body.matchAll(/"?([\w-]+)"?:\s*\[([^\]]*)\]/g)) {
    out[m[1]] = [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  }
  return out;
}

// The abbreviation/name spellings FAERS actually indexes are the approved-drug
// names — INNs and US brand names. FAERS is keyed on marketed products, so a
// raw peptide code (BPC-157, TB-500) simply will not be present, and that 404
// is the honest answer. This map supplies the INN/brand for the molecules that
// DO have a mapped product; additive only, everything else falls back to the
// catalog name + verified aliases.
const FAERS_TERMS = {
  semaglutide: ["semaglutide", "ozempic", "wegovy", "rybelsus"],
  tirzepatide: ["tirzepatide", "mounjaro", "zepbound"],
  liraglutide: ["liraglutide", "victoza", "saxenda"],
  dulaglutide: ["dulaglutide", "trulicity"],
  exenatide: ["exenatide", "byetta", "bydureon"],
  "glp-1": ["glucagon-like peptide 1"],
  teriparatide: ["teriparatide", "forteo"],
  pth: ["teriparatide", "abaloparatide", "tymlos"],
  "pt-141": ["bremelanotide", "vyleesi"],
  setmelanotide: ["setmelanotide", "imcivree"],
  leptin: ["metreleptin", "myalept"],
  "igf-1": ["mecasermin", "increlex"],
  vasopressin: ["vasopressin", "desmopressin", "vasostrict"],
  gnrh: ["gonadorelin", "leuprolide"],
  hcg: ["chorionic gonadotropin", "ovidrel", "pregnyl"],
  "growth-hormone": ["somatropin", "genotropin", "norditropin", "humatrope"],
  insulin: ["insulin human", "humulin", "novolin"],
  pramlintide: ["pramlintide", "symlin"],
  leuprolide: ["leuprolide", "lupron", "eligard"],
  goserelin: ["goserelin", "zoladex"],
  cetrorelix: ["cetrorelix", "cetrotide"],
  octreotide: ["octreotide", "sandostatin"],
  lanreotide: ["lanreotide", "somatuline"],
  pasireotide: ["pasireotide", "signifor"],
  tesamorelin: ["tesamorelin", "egrifta"],
  sermorelin: ["sermorelin", "geref"],
  acth: ["corticotropin", "cosyntropin", "acthar"],
  fsh: ["follitropin", "gonal-f", "follistim"],
  calcitonin: ["calcitonin", "miacalcin", "fortical"],
  glucagon: ["glucagon", "baqsimi", "gvoke"],
  oxytocin: ["oxytocin", "pitocin"],
  insulin: ["insulin"],
  cnp: ["vosoritide", "voxzogo"],
  "ss-31": ["elamipretide"],
  "ara-290": ["cibinetide"],
  "bnp": ["nesiritide", "natrecor"],
  "thymosin-beta-4": ["thymosin beta-4"],
};

function termsFor(h, aliases) {
  const out = [];
  const seen = new Set();
  const source = FAERS_TERMS[h.slug] ?? [h.name, ...(aliases[h.slug] ?? [])];
  for (const term of source) {
    if (!term) continue;
    // FAERS drug names are ASCII; a non-ASCII glyph (β4, α-MSH) 400s the API.
    if (/[^\x00-\x7F]/.test(term)) continue;
    const key = term.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(term);
  }
  return out;
}

// ── Queries ──
const EVENT = "https://api.fda.gov/drug/event.json";

// One OR expression across the three openFDA drug-name fields, each matched
// exactly against every candidate term. .exact requires the whole field to
// equal the value, so "insulin" cannot partial-match "insulin glargine" —
// exactly the term the reader will see re-run. openFDA .exact fields are stored
// UPPERCASE and are case-sensitive, so the search terms must be upper-cased;
// clauses separated by a space are OR'd (only an explicit AND narrows).
function searchExpr(terms) {
  const quoted = terms.map((t) => `"${t.toUpperCase()}"`).join(" ");
  return [
    `patient.drug.openfda.generic_name.exact:(${quoted})`,
    `patient.drug.openfda.brand_name.exact:(${quoted})`,
    `patient.drug.openfda.substance_name.exact:(${quoted})`,
  ].join(" ");
}

// total matching reports (meta.results.total); null when openFDA 404s = zero
async function countReports(expr) {
  const url = `${EVENT}?search=${encodeURIComponent(expr)}&limit=1${KEY}`;
  const j = await getJson(url);
  return j?.meta?.results?.total ?? 0;
}
// top reported reaction terms for the matching reports
async function topReactions(expr, n = 5) {
  const url = `${EVENT}?search=${encodeURIComponent(expr)}&count=patient.reaction.reactionmeddrapt.exact${KEY}`;
  const j = await getJson(url);
  return (j?.results ?? []).slice(0, n).map((r) => ({ term: r.term, count: r.count }));
}

async function fetchOne(h, aliases) {
  const terms = termsFor(h, aliases);
  // No searchable ASCII name (e.g. a purely Greek-lettered code) — treat as an
  // unmapped compound rather than building an empty query the API rejects.
  if (terms.length === 0) {
    return { terms, matched: false, reports: 0, serious: 0, deaths: 0, topReactions: [], url: "" };
  }
  const expr = searchExpr(terms);

  const reports = await countReports(expr);
  let serious = 0;
  let deaths = 0;
  let reactions = [];
  if (reports > 0) {
    await sleep(300);
    serious = await countReports(`(${expr}) AND serious:1`);
    await sleep(300);
    deaths = await countReports(`(${expr}) AND seriousnessdeath:1`);
    await sleep(300);
    reactions = await topReactions(expr);
  }

  // A human-reproducible link: the openFDA query itself. FAERS has no per-term
  // public UI page, and the API response IS the primary source — re-run it.
  const url = `${EVENT}?search=${encodeURIComponent(expr)}&limit=1`;

  return {
    terms,
    matched: reports > 0,
    reports,
    serious,
    deaths,
    topReactions: reactions,
    url,
  };
}

// ── Emit ──
function emit(data, retrieved) {
  const lines = Object.entries(data).map(([slug, d]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(d)},`);
  return `// GENERATED by scripts/fetch-adverse-events.mjs — do not edit by hand.
// Live FAERS pharmacovigilance counts per molecule, from the openFDA drug/event
// API: total spontaneous adverse-event reports whose drug maps to the molecule,
// how many were flagged serious or fatal, and the most-reported reaction terms.
// A regulatory footprint, not a safety verdict; absence (matched:false) means no
// mapped product in FAERS, the ordinary state of an unapproved research peptide.
// See the script header and /methodology. Retrieved ${retrieved}.

export interface AdverseReaction {
  term: string;
  count: number;
}

export interface LiveAdverse {
  /** The exact drug-name terms searched (INN + US brand names). */
  terms: string[];
  /** Whether any FAERS product mapped to these terms at all. */
  matched: boolean;
  /** Total matching FAERS reports. */
  reports: number;
  /** Reports flagged serious, and fatal. */
  serious: number;
  deaths: number;
  /** Most-reported MedDRA reaction terms (top 5). */
  topReactions: AdverseReaction[];
  /** The live openFDA query the counts came from — re-run it to check. */
  url: string;
}

export const LIVE_ADVERSE_RETRIEVED = ${JSON.stringify(retrieved)};

export const LIVE_ADVERSE: Record<string, LiveAdverse> = {
${lines.join("\n")}
};
`;
}

async function main() {
  const only = process.argv[2];
  const aliases = readAliases();
  const catalog = readCatalog().filter((h) => !only || h.slug === only);
  const retrieved = new Date().toISOString().slice(0, 10);
  const data = {};
  let failed = 0;
  for (const h of catalog) {
    try {
      data[h.slug] = await fetchOne(h, aliases);
      const d = data[h.slug];
      console.log(
        `${h.slug.padEnd(24)} ${d.matched ? "reports" : "  none "} ${String(d.reports).padStart(7)}  serious ${String(d.serious).padStart(7)}  deaths ${String(d.deaths).padStart(6)}  (${d.terms.join(" | ")})`,
      );
      await sleep(300); // openFDA anonymous: 240 req/min
    } catch (e) {
      failed++;
      console.error(`FAIL ${h.slug}: ${e.message}`);
    }
  }
  if (only) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }
  if (failed) {
    console.error(`${failed} molecule(s) failed; not writing.`);
    process.exitCode = 1;
    return;
  }
  writeFileSync(join(ROOT, "src/lib/adverse-live.ts"), emit(data, retrieved));
  console.log(`wrote src/lib/adverse-live.ts (${Object.keys(data).length} molecules, ${retrieved})`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
