// The site's commercial relationships, in one place.
//
// PeptideHormone hosts no storefront. It is part of the American Peptide network,
// which holds disclosed affiliate relationships with research-peptide suppliers —
// AminoClub, plus Peptira at a lighter placement — set out in full on
// /methodology. Every outbound link is
// research-use-only and we describe each source only by what's visible from the
// outside, never asserting a per-lot COA we can't see. Where a vendor surfaces a
// reader code it rides in the link. Placement stays an output of the standard, not a
// banner — a sourcing note appears only where it earns its place, on molecules a
// vendor actually carries, never as a blanket pitch.
//
// Links are per-product where the vendor has a stable product URL (verified against
// each storefront's sitemap / collection index, 2026-09-20) so a reader lands on the
// molecule they were just reading about — not a homepage they then have to search.
// The storefront link stays as the fallback and as the "browse everything" CTA.
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
  /** stable key — also the /available/[vendor] path segment */
  key: string;
  /** display name */
  name: string;
  /** primary vendors get the pill CTAs; secondary is a quieter text link, listed last */
  prominence: "primary" | "secondary";
  /** affiliate storefront link, carrying the network ref/code — the fallback CTA */
  home: string;
  /** origin every product path is resolved against */
  base: string;
  /** query string appended to every product deep-link (the network ref/code) */
  ref: string;
  /** reader-facing code surfaced as the offer — omit where there is none */
  code?: string;
  /** one honest line describing the source, keyed off what's visible from outside */
  blurb: string;
  /** what a reader sees before the shelf — set expectations so the click lands */
  gate?: string;
  /** what's visible about their testing, as they state it (not verified by us) */
  coa: string;
  /** shipping terms as stated on the storefront — a conversion fact, not a promise */
  shipping: string;
  /** product paths keyed by catalog slug — the spine of /available and the gate for
   *  a monograph sourcing note. Blends, bacteriostatic water and non-catalog
   *  compounds are deliberately out. A hint, not a stock guarantee. */
  products: Readonly<Record<string, string>>;
  /** molecules this vendor is known to carry — derived from `products` */
  carries: ReadonlySet<string>;
};

function vendor(v: Omit<Vendor, "carries">): Vendor {
  return { ...v, carries: new Set(Object.keys(v.products)) };
}

/** Product deep-link for a molecule at a vendor, or the storefront if they list it
 *  under no stable URL. Always carries the network ref/code. */
export function productUrl(v: Vendor, slug: string): string {
  const path = v.products[slug];
  if (!path) return v.home;
  return v.ref ? `${v.base}${path}?${v.ref}` : `${v.base}${path}`;
}

// Storefront naming note: both vendors sell the incretin agonists under coded
// names — "GLP-1" = semaglutide, "GLP-2" = tirzepatide (CAS 2023788-19-2),
// "GLP-3" = retatrutide (CAS 2381089-83-2). We key by the real molecule.

const AMINOCLUB = vendor({
  key: "aminoclub",
  name: "AminoClub",
  prominence: "primary",
  // Network storefront link for AminoClub, carrying the shared code + UTM.
  home: "https://aminoclub.com?utm_source=affiliate_marketing&code=AMERICANPEPTIDE",
  base: "https://www.aminoclub.com",
  ref: "utm_source=affiliate_marketing&code=AMERICANPEPTIDE",
  code: "AMERICANPEPTIDE",
  blurb: "a research-use-only supplier with provenance you can reason about",
  gate: "a 21+ researcher attestation, then you land on the product",
  coa: "states an ISO 17025 third-party COA per product (purity, identity, sterility, heavy metals)",
  shipping: "orders processed in 0–2 business days; free US shipping over $100",
  products: {
    "bpc-157": "/us/products/bpc-157",
    "tb-500": "/us/products/tb-500",
    "ghk-cu": "/us/products/ghk-cu",
    dsip: "/us/products/dsip",
    semaglutide: "/us/products/glp-1",
    tirzepatide: "/us/products/glp-2",
    retatrutide: "/us/products/glp-3",
    tesamorelin: "/us/products/tesamorlin",
    "mots-c": "/us/products/mots-c",
    kisspeptin: "/us/products/kisspeptin",
    ipamorelin: "/us/products/ipamorelin",
    sermorelin: "/us/products/sermorelin",
    "igf-1-lr3": "/us/products/igf-1-lr3",
    cagrilintide: "/us/products/cagrilintide",
    "aod-9604": "/us/products/aod-9604",
    kpv: "/us/products/kpv",
    "pt-141": "/us/products/pt-141",
    epitalon: "/us/products/epithalon",
    semax: "/us/products/semax",
    selank: "/us/products/selank",
    "ara-290": "/us/products/ara-290",
    glutathione: "/us/products/glutathione",
  },
});

const PEPTIRA = vendor({
  key: "peptira",
  name: "Peptira",
  prominence: "secondary",
  // Path-style referral. Product deep-links are the public shelf (age-gated on
  // their side); this home URL is the attribution entry and the browse CTA.
  home: "https://peptira.com/r/PZCN5L29",
  base: "https://peptira.com",
  ref: "",
  blurb: "a research-use-only supplier that states a third-party COA on every batch",
  gate: "a sign-in wall before pricing and the shelf",
  coa: "states third-party testing with a COA on every batch",
  shipping: "states same-day fulfillment and 2-day shipping on all orders",
  // Paths checked against peptira.com/sitemap.xml on 2026-11-19. Blends, raws,
  // bacteriostatic water, and non-catalog SKUs are left out. Ambiguous handles
  // (cag-4, survo) are omitted rather than mapped to the wrong molecule.
  products: {
    "aod-9604": "/product/aod-9604-2",
    "ara-290": "/product/ara-290-2",
    "bpc-157": "/product/bpc-157-2",
    "cjc-1295": "/product/cjc-1295-nodac",
    dsip: "/product/dsip-2",
    epitalon: "/product/epitalon-2",
    "ghk-cu": "/product/ghk-cu-2",
    "igf-1-lr3": "/product/igf1-lr3-2",
    ipamorelin: "/product/ipamorelin-2",
    kisspeptin: "/product/kisspeptin-2",
    kpv: "/product/kpv-2",
    "mots-c": "/product/mots-c-2",
    oxytocin: "/product/oxytocin-2",
    "pt-141": "/product/pt-141-2",
    selank: "/product/selank-2",
    semax: "/product/semax-2",
    sermorelin: "/product/sermorelin-2",
    "ss-31": "/product/ss-31-5",
    "tb-500": "/product/tb-500-2",
    tesamorelin: "/product/tesamorelin-2",
    retatrutide: "/product/reta3-9",
    tirzepatide: "/product/tirz2-13",
    glutathione: "/product/glutathione-2",
  },
});

/** Every vendor in the network, in display order. Primary vendors lead; secondary
 *  vendors stay in the roster at a lighter placement. Order within a tier is tenure,
 *  not a ranking. */
export const VENDORS: readonly Vendor[] = [AMINOCLUB, PEPTIRA];

export function isPrimaryVendor(v: Vendor): boolean {
  return v.prominence !== "secondary";
}

/** Look a vendor up by its key (the /available/[vendor] segment). */
export function getVendor(key: string): Vendor | undefined {
  return VENDORS.find((v) => v.key === key);
}

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

/** Same union as a set — for client components that badge catalog cards. */
export const SOURCED_SLUGS: ReadonlySet<string> = new Set(sourcedSlugs());

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
