// The site's commercial relationships, in one place.
//
// PeptideHormone hosts no storefront. It is part of the American Peptide network,
// which holds a single disclosed affiliate relationship with a research-peptide
// supplier — AminoClub — set out in full on /methodology. AminoClub is linked at
// the storefront level (no per-product deep-links) behind a research-use-only
// gate: we present it as a vetted option and describe it only by what's visible
// from the outside — a trusted, research-use-only peptide supplier — never
// asserting a per-lot COA we can't see. The shared network code rides in the link
// and is surfaced to readers as the offer. Placement stays an output of the
// standard, not a banner — a sourcing note appears only where it earns its place,
// never as a blanket pitch.
//
// Attribution flows to the shared network code/ref on purpose — the sites work
// together for a common cause and don't hide the connection.

/** rel for every outbound affiliate link — sponsored + nofollow is the honest,
 *  SEO-correct signal for a paid relationship. */
export const AFFILIATE_REL = "sponsored nofollow noopener noreferrer";

// ── AminoClub ───────────────────────────────────────────────────────────────
// The network's research-peptide source. Linked at the storefront level behind a
// research-use-only gate, so we present it as a vetted option — never claiming a
// per-product stock or a per-lot COA we can't see. The shared network code rides
// in the link and is surfaced to readers as the offer.

/** Network storefront link for AminoClub, carrying the shared code + UTM. */
export const AMINOCLUB_HOME =
  "https://aminoclub.com?utm_source=affiliate_marketing&code=AMERICANPEPTIDE";

/** Shared network code, surfaced to readers as the offer at AminoClub. */
export const AMINOCLUB_CODE = "AMERICANPEPTIDE";

// Molecules AminoClub is known to carry, intersected with this catalog — the spine
// of the /available index and the gate for a monograph sourcing note. A hint, not a
// stock guarantee (their shelf, behind the gate, is authoritative). Keep in sync:
// add a slug here to surface it on /available and on its monograph.
const AMINOCLUB_CARRIES: readonly string[] = [
  "bpc-157",
  "tb-500",
  "ghk-cu",
  "dsip",
  "semaglutide",
  "tirzepatide",
];

const AMINOCLUB_CARRIES_SET: ReadonlySet<string> = new Set(AMINOCLUB_CARRIES);

/** True when AminoClub is known to carry a molecule — the sourcing-note gate. */
export function carriedByAminoClub(slug: string): boolean {
  return AMINOCLUB_CARRIES_SET.has(slug);
}

/** Every slug AminoClub is known to carry — the spine of the /available index. */
export function aminoClubSlugs(): string[] {
  return [...AMINOCLUB_CARRIES];
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
