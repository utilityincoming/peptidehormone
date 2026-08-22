// Cross-property links to the sister site, American Peptide (americanpeptide.com),
// which carries the same molecules with a sourcing / vendor directory. We deep-link
// only where a matching catalog page exists, so the network cluster never carries a
// dead link. AP_CATALOG mirrors americanpeptide.com's catalog slugs (point-in-time,
// pulled from its sitemap) — refresh it if that catalog grows.

const AP = "https://americanpeptide.com";

const AP_CATALOG = new Set([
  "5-amino-1mq", "ahk-cu", "aod-9604", "apitegromab", "bimagrumab", "bpc-157",
  "bronchogen", "cagrilintide", "cardiogen", "cjc-1295-no-dac", "cjc-1295-with-dac",
  "dsip", "emugrobart", "epitalon", "epo", "follistatin", "fsh", "garetosmab",
  "ghk-cu", "glucagon", "hcg", "hexarelin", "igf-1", "igf-1-lr3", "insulin",
  "ipamorelin", "kisspeptin-10", "kpv", "ll-37", "matrixyl", "melanotan-1",
  "melanotan-2", "mgf", "mots-c", "myostatin", "nad-plus", "oxytocin", "pancragen",
  "pinealon", "pt-141", "retatrutide", "selank", "semaglutide", "semax",
  "sermorelin", "somatropin", "ss-31", "tb-500", "teriparatide", "thymalin",
  "thymosin-alpha-1", "tirzepatide", "trevogrumab", "vesugen", "vilon",
]);

// Where our slug differs from American Peptide's for the same molecule.
const AP_ALIAS: Record<string, string> = {
  "cjc-1295": "cjc-1295-no-dac",
  kisspeptin: "kisspeptin-10",
};

/**
 * Deep link to the American Peptide catalog page for a molecule, or null when the
 * sister site doesn't carry it — so the cross-link only renders where it resolves.
 */
export function americanPeptideUrl(slug: string): string | null {
  const s = AP_ALIAS[slug] ?? slug;
  return AP_CATALOG.has(s) ? `${AP}/catalog/${s}` : null;
}

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
