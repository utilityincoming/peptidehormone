import Link from "next/link";
import { VENDORS, AFFILIATE_REL } from "@/lib/affiliate";

// Two intensities of the same disclosed recommendation. Both are text, never a
// button. The full block (SourcingNote) carries the affiliate disclosure inline;
// the one-liner (SourcingLine) leads with the reader benefit and links out. Both
// present every network vendor co-equally — order is tenure, not a ranking.
// Placement (which surface gets which) lives with the pages — see the build notes.

const AFF_LINK =
  "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

const CTA =
  "inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline";

const vendorCount =
  VENDORS.length === 2 ? "two" : VENDORS.length === 3 ? "three" : `${VENDORS.length}`;

/**
 * Full sourcing block. Bottom-of-page on the "where the powder comes from" insight
 * and the planning tools. Reads like a trusted tip, not an ad: muted panel, a clear
 * link out per source, disclosure kept intact.
 *
 * @param molecule optional human label (e.g. "BPC-157") for a molecule-specific line
 */
export function SourcingNote({ molecule }: { molecule?: string }) {
  const what = molecule ? <>research-grade {molecule}</> : <>research material</>;
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
      <ul className="mt-4 space-y-4">
        {VENDORS.map((v) => (
          <li key={v.key}>
            <p className="text-[15px] leading-7 text-ink/70">
              <a href={v.home} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
                {v.name}
              </a>{" "}
              — {v.blurb}.
              {v.code && (
                <>
                  {" "}
                  Your reader code{" "}
                  <span className="font-mono text-ink/90">{v.code}</span> rides in the link.
                </>
              )}
            </p>
            <a href={v.home} target="_blank" rel={AFFILIATE_REL} className={`mt-1.5 ${CTA}`}>
              Browse {v.name} <span aria-hidden>→</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-ink/40">
        Affiliate links across our network — a purchase supports this reference at no cost to
        you, and buys not one word of the catalog. See{" "}
        <Link
          href="/methodology"
          className="underline decoration-ink/20 underline-offset-2 hover:text-ink/60"
        >
          how we pick
        </Link>
        .
      </p>
    </aside>
  );
}

/**
 * One-sentence variant for lighter-touch surfaces (catalog, homepage). Coverage
 * without a per-card buy-button — a benefit-led line that leads to the vetted
 * sources. Outbound links carry rel="sponsored" as the honest signal for a paid link.
 */
export function SourcingLine() {
  return (
    <p className="text-sm leading-6 text-ink/60">
      Sourcing your own research material? Our{" "}
      <span className="text-ink/75">American Peptide</span> network vetted {vendorCount}{" "}
      research-use-only sources you can actually reason about —{" "}
      {VENDORS.map((v, i) => (
        <span key={v.key}>
          <a href={v.home} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
            {v.name}
          </a>
          {i < VENDORS.length - 2 ? ", " : i === VENDORS.length - 2 ? " and " : ""}
        </span>
      ))}
      .
    </p>
  );
}
