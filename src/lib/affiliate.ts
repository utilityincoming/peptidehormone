// The site's one commercial relationship, in one place.
//
// PeptideHormone hosts no storefront. It is part of the American Peptide network,
// which holds an affiliate relationship with ABSIM Peptides — disclosed in full on
// /methodology. Placement is deliberately data-gated: the sourcing note only
// renders on molecules ABSIM actually stocks (STOCKED below), never as a blanket
// pitch. That keeps the recommendation an output of the standard, not a banner.
//
// Attribution flows to the shared network ref (?ref=americanpeptide) on purpose —
// the sites work together for a common cause and don't hide the connection.

const REF = "?ref=americanpeptide";

/** Network-wide referral link + reader discount. */
export const ABSIM_HOME = `https://absimpeptides.com/${REF}`;
export const ABSIM_CODE = "AMERICANPEPTIDE";
export const ABSIM_DISCOUNT = "20%";

/** rel for every outbound affiliate link — sponsored + nofollow is the honest,
 *  SEO-correct signal for a paid relationship. */
export const AFFILIATE_REL = "sponsored nofollow noopener noreferrer";

// Catalog slug → ABSIM product deep-link. Only molecules that exist BOTH here and
// in ABSIM's stock. Keep in sync with their store; drop a slug the day it goes out
// of stock rather than pointing a reader at a dead shelf.
const STOCKED: Record<string, string> = {
  "bpc-157": `https://absimpeptides.com/product/bpc-157/${REF}`,
  "tb-500": `https://absimpeptides.com/product/tb-500-10mg/${REF}`,
  "ghk-cu": `https://absimpeptides.com/product/ghk-cu-100mg-10-vials-kit/${REF}`,
  "mots-c": `https://absimpeptides.com/product/mots-c/${REF}`,
  "selank": `https://absimpeptides.com/product/n-acetyl-selank-amidate-10mg/${REF}`,
  "epitalon": `https://absimpeptides.com/product/epitalon-10mg/${REF}`,
  "tesamorelin": `https://absimpeptides.com/product/tesamorelin-10mg/${REF}`,
  "cjc-1295": `https://absimpeptides.com/product/cjc-1295-no-dac-10mg/${REF}`,
  "sermorelin": `https://absimpeptides.com/product/sermorelin-10mg/${REF}`,
  "ipamorelin": `https://absimpeptides.com/product/ipamorelin-10mg/${REF}`,
  "pt-141": `https://absimpeptides.com/product/pt-141-10mg/${REF}`,
  "ss-31": `https://absimpeptides.com/product/ss-31-10mg/${REF}`,
  "kpv": `https://absimpeptides.com/product/kpv-30mg/${REF}`,
  "dsip": `https://absimpeptides.com/product/dsip-5mg/${REF}`,
  "semax": `https://absimpeptides.com/product/semax-10mg/${REF}`,
  "ara-290": `https://absimpeptides.com/product/ara-290-10mg/${REF}`,
  // aod-9604: monograph exists, but ABSIM is out of stock — intentionally NOT
  // listed here so the gate shows no note rather than link a dead shelf.
  // Restore this line when it's restocked:
  //   "aod-9604": `https://absimpeptides.com/product/aod-5mg/${REF}`,
};

/** Product deep-link for a stocked slug, or null when ABSIM doesn't carry it. */
export function stockedLink(slug: string): string | null {
  return STOCKED[slug] ?? null;
}

/** True when a molecule earns a sourcing note (i.e. ABSIM actually stocks it). */
export function isStocked(slug: string): boolean {
  return slug in STOCKED;
}
