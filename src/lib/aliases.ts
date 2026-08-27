// Verified brand / INN aliases for catalog molecules — the names people type
// into search. Used in <title>, meta description, JSON-LD alternateName, and
// a matching FAQ so schema and visible copy stay identical.
//
// Only FDA/EMA brand names and official INNs that resolve to this molecule.
// Investigational compounds with no marketed brand are intentionally absent.
// A wrong alias is worse than none.

import type { Hormone } from "./hormones";

export const ALIASES: Record<string, string[]> = {
  semaglutide: ["Ozempic", "Wegovy", "Rybelsus"],
  tirzepatide: ["Mounjaro", "Zepbound"],
  liraglutide: ["Victoza", "Saxenda"],
  exenatide: ["Byetta", "Bydureon"],
  pramlintide: ["Symlin"],
  "pt-141": ["Vyleesi"],
  tesamorelin: ["Egrifta"],
  leuprolide: ["Lupron", "Eligard"],
  goserelin: ["Zoladex"],
  cetrorelix: ["Cetrotide"],
  octreotide: ["Sandostatin"],
  lanreotide: ["Somatuline"],
  pasireotide: ["Signifor"],
};

export function aliasesFor(slug: string): string[] {
  return ALIASES[slug] ?? [];
}

/** Search-facing document title. H1 on the page stays the catalog name. */
export function hormoneMetaTitle(h: Hormone): string {
  const aliases = aliasesFor(h.slug);
  if (aliases.length) return `${h.name} (${aliases.join(", ")})`;
  return h.abbr ? `${h.name} (${h.abbr})` : h.name;
}

export function hormoneMetaDescription(h: Hormone): string {
  const aliases = aliasesFor(h.slug);
  if (!aliases.length) return h.summary;
  const list =
    aliases.length === 1
      ? aliases[0]
      : `${aliases.slice(0, -1).join(", ")}, and ${aliases[aliases.length - 1]}`;
  return `${h.summary} Also known as ${list}.`;
}

export function aliasFaq(h: Hormone): { q: string; a: string } | null {
  const aliases = aliasesFor(h.slug);
  if (!aliases.length) return null;
  const list =
    aliases.length === 1
      ? aliases[0]
      : aliases.length === 2
        ? `${aliases[0]} or ${aliases[1]}`
        : `${aliases.slice(0, -1).join(", ")}, or ${aliases[aliases.length - 1]}`;
  const also =
    aliases.length === 1
      ? aliases[0]
      : `${aliases.slice(0, -1).join(", ")}, and ${aliases[aliases.length - 1]}`;
  return {
    q: `Is ${h.name} the same as ${list}?`,
    a: `${also} ${aliases.length === 1 ? "is a brand name" : "are brand names"} of ${h.name} — the same molecule in different approved presentations. This page is the molecule reference, not a prescribing guide.`,
  };
}
