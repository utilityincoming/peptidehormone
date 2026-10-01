// Static A-vs-B comparison routes, derived from catalog parent/child links
// plus a small allowlist of high-intent cross-lineage pairs. Selected pairs
// carry sourced editorial content in addition to the catalog fields.

import { HORMONES, getHormone, type Hormone } from "./hormones";
import { aliasesFor } from "./aliases";
import { comparisonEditorial } from "./compare-editorials";

export function comparePairPath(a: string, b: string): string {
  return `${a}-vs-${b}`;
}

export function parseComparePair(pair: string): [string, string] | null {
  const parts = pair.split("-vs-");
  if (parts.length !== 2) return null;
  const [a, b] = parts;
  if (!a || !b || a === b) return null;
  if (!getHormone(a) || !getHormone(b)) return null;
  return [a, b];
}

// Cross-lineage pairs people actually search. Same-parent pairs are generated
// from `Hormone.parent` automatically; this list is only the extras.
const EXTRA_PAIRS: [string, string][] = [
  ["semaglutide", "tirzepatide"],
  ["tirzepatide", "retatrutide"],
  ["survodutide", "tirzepatide"],
  ["cjc-1295", "ipamorelin"],
  ["sermorelin", "ipamorelin"],
  ["tesamorelin", "ipamorelin"],
  ["bpc-157", "tb-500"],
  ["semaglutide", "cagrilintide"],
];

function undirectedKey(a: string, b: string): string {
  return a < b ? `${a}\0${b}` : `${b}\0${a}`;
}

/** Both directions of every static pair, for generateStaticParams. */
export function staticComparePairs(): [string, string][] {
  const undirected = new Set<string>();
  const add = (a: string, b: string) => {
    if (a === b) return;
    if (!getHormone(a) || !getHormone(b)) return;
    undirected.add(undirectedKey(a, b));
  };

  const byParent = new Map<string, string[]>();
  for (const h of HORMONES) {
    if (!h.parent) continue;
    const list = byParent.get(h.parent) ?? [];
    list.push(h.slug);
    byParent.set(h.parent, list);
  }
  for (const [parent, kids] of byParent) {
    for (const k of kids) add(parent, k);
    for (let i = 0; i < kids.length; i++) {
      for (let j = i + 1; j < kids.length; j++) add(kids[i], kids[j]);
    }
  }
  for (const [a, b] of EXTRA_PAIRS) add(a, b);

  const out: [string, string][] = [];
  for (const key of undirected) {
    const [x, y] = key.split("\0");
    out.push([x, y], [y, x]);
  }
  return out;
}

/**
 * The one direction of a pair that search engines should index. Both
 * `/compare/a-vs-b` and `/compare/b-vs-a` render (readers do type either), but
 * they carry the same content, so only one may be canonical: the parent/native
 * molecule first when one is the parent of the other, otherwise alphabetical.
 * The reverse route points its canonical here and stays out of the sitemap.
 */
export function canonicalComparePair(a: string, b: string): [string, string] {
  const ha = getHormone(a);
  const hb = getHormone(b);
  if (hb?.parent === a) return [a, b];
  if (ha?.parent === b) return [b, a];
  return a < b ? [a, b] : [b, a];
}

/** Unique undirected pairs, each in its canonical direction. */
export function uniqueComparePairs(): [string, string][] {
  const seen = new Set<string>();
  const out: [string, string][] = [];
  for (const [a, b] of staticComparePairs()) {
    const key = undirectedKey(a, b);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(canonicalComparePair(a, b));
  }
  return out;
}

function typePhrase(h: Hormone): string {
  if (h.type === "analog") return "an engineered analog";
  if (h.type === "research") return "a research peptide";
  return "an endogenous hormone";
}

function label(h: Hormone): string {
  return h.abbr ?? h.name;
}

export function compareFaq(a: Hormone, b: Hormone): { q: string; a: string }[] {
  const editorial = comparisonEditorial(a.slug, b.slug);
  if (editorial) return editorial.faqs;
  const faqs = [
    {
      q: `What is the difference between ${a.name} and ${b.name}?`,
      a: `${a.name} is ${typePhrase(a)}${a.parent ? ` based on ${getHormone(a.parent)?.name ?? a.parent}` : ""}; ${b.name} is ${typePhrase(b)}${b.parent ? ` based on ${getHormone(b.parent)?.name ?? b.parent}` : ""}. ${a.name} signals at ${a.receptor}; ${b.name} signals at ${b.receptor}.`,
    },
  ];
  if (a.halfLife || b.halfLife) {
    faqs.push({
      q: `How do the half-lives of ${label(a)} and ${label(b)} compare?`,
      a: `The reported circulating half-life of ${a.name} is ${a.halfLife ?? "not listed"}; ${b.name} is ${b.halfLife ?? "not listed"}. These are reference values for the native or representative form — educational only, not dosing advice.`,
    });
  }
  const aAliases = aliasesFor(a.slug);
  if (aAliases.length) {
    faqs.push({
      q: `Is ${a.name} the same as ${aAliases[0]}?`,
      a: `${aAliases.join(", ")} ${aAliases.length === 1 ? "is a brand name" : "are brand names"} of ${a.name}. This comparison describes the molecules, not branded products.`,
    });
  }
  return faqs;
}

export function compareMetaTitle(a: Hormone, b: Hormone): string {
  if (comparisonEditorial(a.slug, b.slug)) return `${label(a)} vs ${label(b)}: Evidence & Safety`;
  const left = aliasesFor(a.slug)[0] ? `${a.name} (${aliasesFor(a.slug)[0]})` : label(a);
  const right = aliasesFor(b.slug)[0] ? `${b.name} (${aliasesFor(b.slug)[0]})` : label(b);
  return `${left} vs ${right}`;
}

export function compareMetaDescription(a: Hormone, b: Hormone): string {
  const editorial = comparisonEditorial(a.slug, b.slug);
  if (editorial) return editorial.description;
  return `${a.name} vs ${b.name} — type, evidence tier, receptor, molecular weight, and half-life side by side. ${a.summary} ${b.summary} Educational reference only.`;
}
