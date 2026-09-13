// The site's commercial relationships, in one place.
//
// PeptideHormone hosts no storefront. It is part of the American Peptide network,
// which holds disclosed affiliate relationships with research-peptide suppliers —
// AminoClub and ElyriaBio — set out in full on /methodology. Each is linked at the
// storefront level (no per-product deep-links) behind a research-use-only gate: we
// present them as vetted options and describe each one only by what's visible from
// the outside, never asserting a per-lot COA we can't see. Where a vendor surfaces a
// reader code it rides in the link. Placement stays an output of the standard, not a
// banner — a sourcing note appears only where it earns its place, on molecules a
// vendor actually carries, never as a blanket pitch.
//
// Attribution flows to the shared network code/ref on purpose — the sites work
// together for a common cause and don't hide the connection.

/** rel for every outbound affiliate link — sponsored + nofollow is the honest,
 *  SEO-correct signal for a paid relationship. */
export const AFFILIATE_REL = "sponsored nofollow noopener noreferrer";

/**
 * One research-peptide source in the network. Described by what's visible from the
 * outside — never a per-lot COA we can't see. `code` is a reader-facing offer that
 * rides in the link; omitted where a vendor has none (the ref is attribution only).
 */
export type Vendor = {
  /** stable key, for React lists */
  key: string;
  /** display name */
  name: string;
  /** affiliate storefront link, carrying the network ref/code */
  home: string;
  /** reader-facing code surfaced as the offer — omit where there is none */
  code?: string;
  /** one honest line describing the source, keyed off what's visible from outside */
  blurb: string;
  /** molecules this vendor is known to carry, intersected with the catalog */
  carries: ReadonlySet<string>;
};

// Molecules each vendor is known to carry, intersected with this catalog — the spine
// of the /available index and the gate for a monograph sourcing note. A hint, not a
// stock guarantee (their shelf, behind the gate, is authoritative). Keep in sync: add
// a slug here to surface it on /available and on its monograph. Blends (e.g. GLOW,
// KLOW, BPC+TB), bacteriostatic water, and non-catalog compounds are deliberately out.

const AMINOCLUB: Vendor = {
  key: "aminoclub",
  name: "AminoClub",
  // Network storefront link for AminoClub, carrying the shared code + UTM.
  home: "https://aminoclub.com?utm_source=affiliate_marketing&code=AMERICANPEPTIDE",
  code: "AMERICANPEPTIDE",
  blurb: "a research-use-only supplier with provenance you can reason about",
  carries: new Set([
    "bpc-157",
    "tb-500",
    "ghk-cu",
    "dsip",
    "semaglutide",
    "tirzepatide",
  ]),
};

const ELYRIA: Vendor = {
  key: "elyriabio",
  name: "ElyriaBio",
  // Referral link carries attribution only — no reader discount code (so `code` is
  // unset; ElyriaBio's own new-customer offer is not ours to surface as a reader code).
  home: "https://elyriabio.com/?ref=PEPTIDE",
  blurb:
    "a research-use-only source that commits to a per-lot third-party COA (a ≥99% HPLC purity floor)",
  carries: new Set([
    "bpc-157",
    "tb-500",
    "ghk-cu",
    "kisspeptin",
    "mots-c",
    "ss-31",
    "tesamorelin",
  ]),
};

/** Every vendor in the network, in display order. Co-equal — order is tenure in the
 *  network, not a ranking; the standard, not the order, is what a listing earns. */
export const VENDORS: readonly Vendor[] = [AMINOCLUB, ELYRIA];

/** The vendors known to carry a molecule — the sourcing-note gate (empty = no note). */
export function vendorsFor(slug: string): Vendor[] {
  return VENDORS.filter((v) => v.carries.has(slug));
}

/** True when any vendor carries a molecule. */
export function isSourced(slug: string): boolean {
  return VENDORS.some((v) => v.carries.has(slug));
}

/** Union of every slug any vendor carries — the spine of the /available index. */
export function sourcedSlugs(): string[] {
  return [...new Set(VENDORS.flatMap((v) => [...v.carries]))];
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
