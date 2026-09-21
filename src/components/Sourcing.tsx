import Link from "next/link";
import { VENDORS, productUrl, vendorsFor, type Vendor } from "@/lib/affiliate";
import { AffiliateLink, CopyCode } from "@/components/AffiliateLink";

// The referral layer's presentation, in one place. Three intensities of the same
// disclosed recommendation, plus the per-vendor CTA row they all share:
//
//   VendorRow    — one vendor: name, honest blurb, code chip, and a deep-link CTA
//                  to the exact product when a molecule is in scope (storefront
//                  otherwise). Used by the monograph card, /available and the note.
//   SourcingNote — the full block, bottom of insights/tools; disclosure inline.
//   SourcingLine — one sentence for light surfaces (catalog, homepage).
//
// Every vendor is presented co-equally — order is tenure, not a ranking. Outbound
// links are text or a pill, never a banner, and every one carries rel="sponsored".

const AFF_LINK =
  "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

export const CTA_PILL =
  "inline-flex items-center justify-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/15";

const vendorCount =
  VENDORS.length === 2 ? "two" : VENDORS.length === 3 ? "three" : `${VENDORS.length}`;

/** Affiliate disclosure, the same words everywhere. */
export function Disclosure({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-5 text-ink/40 ${className}`}>
      Affiliate links across the American Peptide network — a purchase supports this
      reference at no cost to you, and buys not one word of the catalog. Sold
      research-use-only; each vendor&rsquo;s page is authoritative for stock and lot detail.{" "}
      <Link
        href="/methodology"
        className="underline decoration-ink/20 underline-offset-2 hover:text-ink/60"
      >
        How we pick
      </Link>
      .
    </p>
  );
}

/**
 * One vendor, one CTA. When `slug` is given and the vendor carries it, the button
 * deep-links to that product; otherwise it opens the storefront.
 */
export function VendorRow({
  v,
  slug,
  label,
  surface,
  compact = false,
}: {
  v: Vendor;
  slug?: string;
  /** human label for the molecule, e.g. "BPC-157" */
  label?: string;
  surface: "monograph" | "available" | "vendor" | "note";
  compact?: boolean;
}) {
  const deep = slug ? v.products[slug] : undefined;
  const href = slug ? productUrl(v, slug) : v.home;
  const cta = deep && label ? `Get ${label} at ${v.name}` : `Browse ${v.name}`;
  return (
    <div>
      <p className={`${compact ? "text-sm" : "text-[15px] leading-7"} text-ink/65`}>
        <Link
          href={`/available/${v.key}`}
          className="font-medium text-ink/90 underline decoration-ink/15 underline-offset-2 hover:decoration-accent"
        >
          {v.name}
        </Link>{" "}
        — {v.blurb}.
      </p>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <AffiliateLink
          href={href}
          vendor={v.key}
          slug={slug}
          surface={surface}
          className={CTA_PILL}
        >
          {cta} <span aria-hidden>→</span>
        </AffiliateLink>
        {v.code && (
          <span className="inline-flex items-center gap-1.5 text-xs text-ink/50">
            code <CopyCode code={v.code} />
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Full sourcing block. Bottom-of-page on the "where the powder comes from" insight
 * and the planning tools. Reads like a trusted tip, not an ad: muted panel, a clear
 * link out per source, disclosure kept intact.
 *
 * @param slug optional catalog slug, so CTAs deep-link to that molecule
 * @param molecule optional human label (e.g. "BPC-157") for a molecule-specific line
 */
export function SourcingNote({ slug, molecule }: { slug?: string; molecule?: string }) {
  const what = molecule ? <>research-grade {molecule}</> : <>research material</>;
  const vendors = slug ? vendorsFor(slug) : [...VENDORS];
  const list = vendors.length ? vendors : [...VENDORS];
  return (
    <aside className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
      <div className="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-ink/40">
        Where to source
      </div>
      <p className="text-[15px] leading-7 text-ink/70">
        We don&rsquo;t run a storefront — but the question we hear most is where to actually
        get {what} that clears the bar this site holds. Our sister project{" "}
        <span className="font-medium text-ink/90">American Peptide</span> did the legwork and
        vetted {vendorCount} research-use-only sources you can reason about:
      </p>
      <ul className="mt-5 space-y-5">
        {list.map((v) => (
          <li key={v.key}>
            <VendorRow v={v} slug={slug} label={molecule} surface="note" />
          </li>
        ))}
      </ul>
      <Disclosure className="mt-5" />
    </aside>
  );
}

/**
 * One-sentence variant for lighter-touch surfaces (catalog, homepage). Coverage
 * without a per-card buy-button — a benefit-led line that leads to the vetted
 * sources. Outbound links carry rel="sponsored" as the honest signal for a paid link.
 */
export function SourcingLine() {
  const withCode = VENDORS.find((v) => v.code);
  return (
    <p className="text-sm leading-6 text-ink/60">
      Sourcing your own research material? Our{" "}
      <span className="text-ink/75">American Peptide</span> network vetted {vendorCount}{" "}
      research-use-only sources you can actually reason about —{" "}
      {VENDORS.map((v, i) => (
        <span key={v.key}>
          <AffiliateLink href={v.home} vendor={v.key} surface="line" className={AFF_LINK}>
            {v.name}
          </AffiliateLink>
          {i < VENDORS.length - 2 ? ", " : i === VENDORS.length - 2 ? " and " : ""}
        </span>
      ))}
      .{" "}
      {withCode && (
        <>
          Code <CopyCode code={withCode.code!} /> at {withCode.name}.{" "}
        </>
      )}
      <Link href="/available" className="text-ink/70 underline decoration-ink/20 underline-offset-2 hover:text-accent">
        See what&rsquo;s reachable
      </Link>
      .
    </p>
  );
}
