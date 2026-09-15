#!/usr/bin/env node
/**
 * Live evidence counts for every catalog molecule — how much registered trial
 * activity and peer-reviewed literature exists for it RIGHT NOW, from the two
 * primary public registries. The monograph "In the literature" block renders
 * these as retrieval-stamped counts with a link to the exact live query, so a
 * reader can re-run the search and get the same (or a newer) number.
 *
 * These are SEARCH HITS, not curated sets. A count is a retrieval, not a verdict:
 * it says how much work exists, not how good it is. We deliberately do not roll
 * the numbers into a score — see /methodology. Tier the claim, not the compound.
 *
 * Sources
 *   ClinicalTrials.gov API v2  — studies whose INTERVENTION matches the molecule
 *     exactly (query.intr, EXPANSION[None]), by phase (aggFilters) + recruiting.
 *   PubMed E-utilities esearch — Title/Abstract hits for the molecule's name,
 *     abbreviation and verified brand aliases; plus the last-five-year slice.
 *
 * No dependencies. Node 18+. Writes src/lib/evidence-live.ts.
 *   node scripts/fetch-evidence.mjs            # refresh everything
 *   node scripts/fetch-evidence.mjs bpc-157    # one molecule (debug, no write)
 *
 * Uses process.exitCode, not process.exit — see fetch-identifiers.mjs.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UA = "peptidehormone-evidence-bot/1.0 (https://peptidehormone.com; educational reference)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": UA, accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === tries - 1) throw new Error(`${e.message} for ${url}`);
      await sleep(1500 * (i + 1));
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

// Abbreviations too ambiguous to search on their own (they collide with
// unrelated terms in the literature). The full name still carries the query.
const SKIP_ABBR = new Set(["GH", "GIP", "MGF", "CNP", "ADH", "SST", "IAPP", "Tβ4", "α-MSH", "GDF-8"]);

// Molecule-specific extra terms the catalog name alone would miss — verified
// INNs and the spellings the literature actually uses. Additive only.
const EXTRA_TERMS = {
  "growth-hormone": ["somatropin"],
  "alpha-msh": ["alpha-melanocyte-stimulating hormone", "alpha-MSH"],
  "thymosin-beta-4": ["thymosin beta4", "thymosin beta-4"],
  "ghk-cu": ["GHK-Cu", "copper tripeptide"],
  "igf-1-lr3": ["Long R3 IGF-1", "LR3-IGF-1"],
  "cjc-1295": ["CJC1295"],
  "pt-141": ["bremelanotide"],
  "ss-31": ["elamipretide"],
  "ara-290": ["cibinetide"],
  leptin: ["metreleptin"],
  "igf-1": ["mecasermin"],
  pth: ["teriparatide"],
  vasopressin: ["desmopressin"],
  gnrh: ["gonadorelin"],
  somatostatin: ["somatostatin-14"],
  "activin-a": ["activin A"],
  hcg: ["chorionic gonadotropin"],
  "glp-1": ["glucagon-like peptide 1"],
  gip: ["glucose-dependent insulinotropic polypeptide"],
  anp: ["atrial natriuretic peptide"],
  bnp: ["brain natriuretic peptide", "nesiritide"],
  cnp: ["C-type natriuretic peptide", "vosoritide"],
  mgf: ["mechano growth factor"],
  "mots-c": ["MOTS-c"],
};

function termsFor(h, aliases) {
  const out = [];
  const seen = new Set();
  for (const term of [h.name, h.abbr, ...(aliases[h.slug] ?? []), ...(EXTRA_TERMS[h.slug] ?? [])]) {
    if (!term || (term === h.abbr && SKIP_ABBR.has(term))) continue;
    const key = term.toLowerCase(); // both registries search case-insensitively
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(term);
  }
  return out;
}

// ── Queries ──
const CT = "https://clinicaltrials.gov/api/v2/studies";
const PM = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";

// EXPANSION[None] = exact term, no synonym expansion. Without it CT.gov turns
// "Mechano growth factor" into every IGF-1 trial (105 hits vs 0). Exact is the
// honest count, and the linked search uses the same expression.
const ctQuery = (terms) => terms.map((t) => `EXPANSION[None]${/[\s-]/.test(t) ? `"${t}"` : t}`).join(" OR ");
const pmQuery = (terms) => terms.map((t) => `"${t}"[tiab]`).join(" OR ");

async function ctCount(q, extra = "") {
  const url = `${CT}?query.intr=${encodeURIComponent(q)}&countTotal=true&pageSize=1&fields=NCTId${extra}`;
  return (await getJson(url)).totalCount ?? 0;
}
async function pmCount(term) {
  const url = `${PM}?db=pubmed&retmode=json&retmax=0&term=${encodeURIComponent(term)}`;
  return Number((await getJson(url)).esearchresult?.count ?? 0);
}

const FIVE_Y = new Date().getFullYear() - 4; // inclusive: this year plus the previous four

async function fetchOne(h, aliases) {
  const terms = termsFor(h, aliases);
  const cq = ctQuery(terms);
  const pq = pmQuery(terms);

  const total = await ctCount(cq);
  const phases = {};
  for (const p of ["1", "2", "3", "4"]) {
    phases[p] = await ctCount(cq, `&aggFilters=phase:${p}`);
    await sleep(150);
  }
  const recruiting = await ctCount(cq, "&filter.overallStatus=RECRUITING");
  await sleep(400); // NCBI: max 3 req/s without an API key
  const papers = await pmCount(pq);
  await sleep(400);
  const recent = await pmCount(`(${pq}) AND ${FIVE_Y}:3000[dp]`);

  return {
    terms,
    trials: { total, phase1: phases["1"], phase2: phases["2"], phase3: phases["3"], phase4: phases["4"], recruiting },
    papers: { total: papers, recent, recentSince: FIVE_Y },
    urls: {
      trials: `https://clinicaltrials.gov/search?intr=${encodeURIComponent(cq)}`,
      papers: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(pq)}`,
    },
  };
}

// ── Emit ──
function emit(data, retrieved) {
  const lines = Object.entries(data).map(([slug, d]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(d)},`);
  return `// GENERATED by scripts/fetch-evidence.mjs — do not edit by hand.
// Live registry counts per molecule: ClinicalTrials.gov interventional-search
// hits by phase, and PubMed Title/Abstract hits (all-time + last five years).
// Search hits, not curated sets; see the script header and /methodology.
// Retrieved ${retrieved}.

export interface LiveEvidence {
  /** The exact search terms used (name, abbreviation, verified aliases). */
  terms: string[];
  trials: { total: number; phase1: number; phase2: number; phase3: number; phase4: number; recruiting: number };
  papers: { total: number; recent: number; recentSince: number };
  /** The live queries the counts came from — re-run them to check. */
  urls: { trials: string; papers: string };
}

export const LIVE_EVIDENCE_RETRIEVED = ${JSON.stringify(retrieved)};

export const LIVE_EVIDENCE: Record<string, LiveEvidence> = {
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
        `${h.slug.padEnd(24)} trials ${String(d.trials.total).padStart(6)}  papers ${String(d.papers.total).padStart(7)}  (${d.terms.join(" | ")})`,
      );
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
  writeFileSync(join(ROOT, "src/lib/evidence-live.ts"), emit(data, retrieved));
  console.log(`wrote src/lib/evidence-live.ts (${Object.keys(data).length} molecules, ${retrieved})`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
