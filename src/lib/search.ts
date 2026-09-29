// Site-wide search. A single flat index is assembled at module load from every
// content source — molecule monographs, editorial insights, signalling
// families, glossary terms, and the tools — and scored with a small,
// dependency-free ranking function. The same index and scorer back both the
// client command palette (SearchDialog) and the server-rendered /search page,
// so results are identical whether or not JavaScript runs.

import { HORMONES } from "@/lib/hormones";
import { INSIGHTS } from "@/lib/insights";
import { FAMILIES, getFamily } from "@/lib/families";
import { ALL_TERMS } from "@/lib/glossary";
import { aliasesFor } from "@/lib/aliases";

export type SearchKind = "Hormone" | "Insight" | "Family" | "Term" | "Tool";

export interface SearchRecord {
  /** Stable id — unique across the whole index. */
  id: string;
  kind: SearchKind;
  title: string;
  /** One-line description shown under the title. */
  subtitle: string;
  href: string;
  /**
   * Extra searchable text that should match but need not be displayed —
   * abbreviations, aliases, family names, structural class, etc. Lower-cased
   * and joined once at build time.
   */
  keywords: string;
  /**
   * Base importance, breaking ties between records that score equally on text.
   * Higher sorts first. Molecules and insights are the primary destinations.
   */
  weight: number;
}

const TOOLS: { title: string; subtitle: string; href: string }[] = [
  {
    title: "Half-life & dosing calculator",
    subtitle: "Model peptide clearance and steady-state from half-life and dose interval.",
    href: "/tools/half-life",
  },
  {
    title: "Analog comparison",
    subtitle: "Put two analogs side by side on structure, kinetics, and evidence.",
    href: "/tools/compare",
  },
  {
    title: "Cycle planner",
    subtitle: "Sketch a research cycle and visualise dose timing across weeks.",
    href: "/tools/cycle-planner",
  },
];

const STATIC_PAGES: { title: string; subtitle: string; href: string }[] = [
  { title: "Catalog", subtitle: "Every molecule, filterable by family and evidence tier.", href: "/catalog" },
  { title: "Insights", subtitle: "Long-form, evidence-led deep-dives.", href: "/insights" },
  { title: "Availability", subtitle: "Where catalog molecules can actually be sourced.", href: "/available" },
  { title: "Glossary", subtitle: "Peptide-science vocabulary, defined in plain language.", href: "/glossary" },
  { title: "Why peptides", subtitle: "Signalling as language — the idea behind the reference.", href: "/why-peptides" },
  { title: "Methodology", subtitle: "How entries are researched and evidence is graded.", href: "/methodology" },
];

function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Assemble the flat search index from all content sources. Pure and
 * deterministic — safe to compute once at module scope.
 */
export function buildSearchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const h of HORMONES) {
    const family = getFamily(h.family);
    const keywords = [
      h.abbr,
      h.class,
      h.receptor,
      family?.name,
      h.type,
      ...aliasesFor(h.slug),
    ]
      .filter(Boolean)
      .join(" ");
    records.push({
      id: `hormone:${h.slug}`,
      kind: "Hormone",
      title: h.name,
      subtitle: truncate(h.summary),
      href: `/hormones/${h.slug}`,
      keywords: keywords.toLowerCase(),
      weight: 5,
    });
  }

  for (const i of INSIGHTS) {
    const family = getFamily(i.family);
    const keywords = [family?.name, ...(i.hormones ?? [])].filter(Boolean).join(" ");
    records.push({
      id: `insight:${i.slug}`,
      kind: "Insight",
      title: i.title,
      subtitle: truncate(i.dek),
      href: `/insights/${i.slug}`,
      keywords: keywords.toLowerCase(),
      weight: 4,
    });
  }

  for (const f of FAMILIES) {
    records.push({
      id: `family:${f.slug}`,
      kind: "Family",
      title: f.name,
      subtitle: truncate(f.blurb),
      href: `/families/${f.slug}`,
      keywords: `${f.examples} ${f.tagline}`.toLowerCase(),
      weight: 3,
    });
  }

  for (const t of ALL_TERMS) {
    const keywords = [t.abbr, ...(t.aka ?? [])].filter(Boolean).join(" ");
    records.push({
      id: `term:${t.slug}`,
      kind: "Term",
      title: t.term,
      subtitle: truncate(t.def),
      href: `/glossary#${t.slug}`,
      keywords: keywords.toLowerCase(),
      weight: 2,
    });
  }

  for (const t of TOOLS) {
    records.push({
      id: `tool:${t.href}`,
      kind: "Tool",
      title: t.title,
      subtitle: t.subtitle,
      href: t.href,
      keywords: "tool calculator",
      weight: 3,
    });
  }

  for (const p of STATIC_PAGES) {
    records.push({
      id: `page:${p.href}`,
      kind: "Tool",
      title: p.title,
      subtitle: p.subtitle,
      href: p.href,
      keywords: "page section",
      weight: 1,
    });
  }

  return records;
}

/** Prebuilt index — content is static, so it is assembled once. */
export const SEARCH_INDEX: SearchRecord[] = buildSearchIndex();

/**
 * Score a single record against a set of lower-cased query tokens. Returns 0
 * when any token fails to match anywhere, so results always contain every word
 * the user typed (AND semantics). Higher is better.
 */
function scoreRecord(record: SearchRecord, tokens: string[]): number {
  const title = record.title.toLowerCase();
  const haystack = `${title} ${record.keywords} ${record.subtitle.toLowerCase()}`;

  let score = 0;
  for (const token of tokens) {
    if (!haystack.includes(token)) return 0;

    if (title === token) {
      score += 100; // exact title hit
    } else if (title.startsWith(token)) {
      score += 60;
    } else if (new RegExp(`\\b${escapeRegExp(token)}`).test(title)) {
      score += 40; // word-boundary hit inside the title
    } else if (title.includes(token)) {
      score += 25;
    } else if (record.keywords.includes(token)) {
      score += 12;
    } else {
      score += 5; // subtitle-only hit
    }
  }

  return score + record.weight;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface SearchOptions {
  /** Max results to return. Default 20. */
  limit?: number;
}

/**
 * Run a query against an index (defaults to the prebuilt one). Returns records
 * ranked best-first. Empty/blank queries return an empty list.
 */
export function searchRecords(
  query: string,
  index: SearchRecord[] = SEARCH_INDEX,
  { limit = 20 }: SearchOptions = {},
): SearchRecord[] {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  if (tokens.length === 0) return [];

  const scored: { record: SearchRecord; score: number }[] = [];
  for (const record of index) {
    const score = scoreRecord(record, tokens);
    if (score > 0) scored.push({ record, score });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.record.title.localeCompare(b.record.title);
  });

  return scored.slice(0, limit).map((s) => s.record);
}
