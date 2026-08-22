// The site's commercial relationships, in one place.
//
// PeptideHormone hosts no storefront. It is part of the American Peptide network,
// which holds affiliate relationships with two research-peptide suppliers — ABSIM
// Peptides and AminoClub — disclosed in full on /methodology. ABSIM is the primary,
// per-product source: placement is deliberately data-gated so a sourcing note only
// renders on molecules ABSIM actually stocks (STOCKED below), never as a blanket
// pitch. AminoClub is a second network source, linked at the storefront level
// behind a research-use-only gate; we offer it as an additional option rather than
// folding it into the verified /available index, because we don't assert a per-lot
// COA we can't see. That keeps every recommendation an output of the standard, not
// a banner.
//
// Attribution flows to the shared network code/ref on purpose — the sites work
// together for a common cause and don't hide the connection.

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
  "ipamorelin": `https://absimpeptides.com/product/ipamorelin-10mg/${REF}`,
  "pt-141": `https://absimpeptides.com/product/pt-141-10mg/${REF}`,
  "ss-31": `https://absimpeptides.com/product/ss-31-10mg/${REF}`,
  "kpv": `https://absimpeptides.com/product/kpv-30mg/${REF}`,
  "dsip": `https://absimpeptides.com/product/dsip-5mg/${REF}`,
  "semax": `https://absimpeptides.com/product/semax-10mg/${REF}`,
  "ara-290": `https://absimpeptides.com/product/ara-290-10mg/${REF}`,
  // Out of stock at ABSIM — monographs exist, but intentionally NOT linked here so
  // the gate shows no note rather than a dead shelf. Restore each line when it's
  // back in stock (run `npm run check:stock` to catch this drift automatically):
  //   "sermorelin": `https://absimpeptides.com/product/sermorelin-10mg/${REF}`,
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

/** Every slug ABSIM currently stocks — the spine of the /available index. */
export function stockedSlugs(): string[] {
  return Object.keys(STOCKED);
}

// ── AminoClub ───────────────────────────────────────────────────────────────
// The network's second research-peptide source. Unlike ABSIM it is linked at the
// storefront level (no per-product deep-links) behind a research-use-only gate, so
// we present it as an additional option — never inside the verified /available
// index — and describe it only by what's visible from the outside: a trusted,
// research-use-only peptide supplier. The shared network code rides in the link for
// attribution; we deliberately don't advertise it as a discount. The value to a
// reader is the vetted lead itself — a quality source that makes these available
// research-use-only — not a coupon.

/** Network storefront link for AminoClub, carrying the shared code + UTM. */
export const AMINOCLUB_HOME =
  "https://aminoclub.com?utm_source=affiliate_marketing&code=AMERICANPEPTIDE";

/** Shared network code, carried in AMINOCLUB_HOME for attribution — intentionally
 *  not surfaced to readers as an offer (kept for parity + future use). */
export const AMINOCLUB_CODE = "AMERICANPEPTIDE";

// Molecules AminoClub is known to carry, intersected with this catalog. Used only
// to offer a second source on monographs we already list — a hint, not a stock
// guarantee (their shelf, behind the gate, is authoritative). Keep in sync.
const AMINOCLUB_CARRIES: ReadonlySet<string> = new Set([
  "bpc-157",
  "tb-500",
  "ghk-cu",
  "dsip",
]);

/** True when AminoClub is known to carry a molecule — a second-source hint only. */
export function carriedByAminoClub(slug: string): boolean {
  return AMINOCLUB_CARRIES.has(slug);
}

/**
 * The sourcing standard a compound clears to earn a listing — the same provenance
 * logic argued in "Where the powder comes from." Visibility is editorial and
 * earned, never pay-to-play; that is what keeps the availability layer worth
 * anything to a reader.
 */
export const SOURCING_STANDARD: { title: string; body: string }[] = [
  {
    title: "A lot-specific COA",
    body: "Third-party HPLC for purity and mass spec for identity, tied to the actual lot shipped — not a generic template.",
  },
  {
    title: "Primary literature on the page",
    body: "The science cited where the product is sold, not just marketing claims — the same discipline this reference holds itself to.",
  },
  {
    title: "Research-use framing",
    body: "Sold research-use-only, with provenance you can reason about. As of 2026 that is a reasonable ask, not a fantasy.",
  },
];
