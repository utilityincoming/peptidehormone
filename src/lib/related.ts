// Related-molecule selection for monograph cards.
// Order: the parent hormone, engineered children, siblings that share that
// parent, then the rest of the family. The first five are what the page shows.
// Insights stay a separate list (insightsForHormone) so a card is always a molecule.

import { getHormone, hormonesByFamily, HORMONES, type Hormone } from "@/lib/hormones";

export function relatedMolecules(h: Hormone, limit = 5): Hormone[] {
  const out: Hormone[] = [];
  const push = (candidate?: Hormone) => {
    if (!candidate || candidate.slug === h.slug) return;
    if (out.some((item) => item.slug === candidate.slug)) return;
    out.push(candidate);
  };
  if (h.parent) push(getHormone(h.parent));
  for (const child of HORMONES) if (child.parent === h.slug) push(child);
  if (h.parent) for (const sib of HORMONES) if (sib.parent === h.parent) push(sib);
  for (const member of hormonesByFamily(h.family)) push(member);
  return out.slice(0, limit);
}
