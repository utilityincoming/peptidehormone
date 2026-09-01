// Cross-property links to the sister site melanocortin.com, the receptor-level
// reference on the melanocortin system. We deep-link only where a matching page
// exists there, so the cross-link never carries a dead link.
const MC = "https://melanocortin.com";

const MC_PAGES: Record<string, string> = {
  "pt-141": `${MC}/bremelanotide`,
};

/**
 * Deep link to the melanocortin.com page for a molecule, or null when that
 * sister site doesn't cover it — so the cross-link only renders where it resolves.
 */
export function melanocortinUrl(slug: string): string | null {
  return MC_PAGES[slug] ?? null;
}
