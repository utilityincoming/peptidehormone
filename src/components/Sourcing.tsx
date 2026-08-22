import Link from "next/link";
import {
  ABSIM_CODE,
  ABSIM_DISCOUNT,
  ABSIM_HOME,
  AFFILIATE_REL,
  AMINOCLUB_HOME,
  stockedLink,
} from "@/lib/affiliate";

// Two intensities of the same disclosed recommendation. Both are text, never a
// button; both carry the affiliate disclosure inline and link to /methodology.
// Placement (which surface gets which) lives with the pages — see the build notes.

const AFF_LINK =
  "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

/**
 * Full sourcing block. Bottom-of-page on monographs ABSIM stocks, the "where the
 * powder comes from" insight, and the planning tools. Reads like a footnote, not
 * an ad: muted panel, small type, one link out.
 *
 * @param slug     catalog slug — deep-links to the matching product when stocked
 * @param molecule human label (e.g. "BPC-157") for a molecule-specific line
 */
export function SourcingNote({ slug, molecule }: { slug?: string; molecule?: string }) {
  const href = (slug && stockedLink(slug)) || ABSIM_HOME;
  const what = molecule ? <>research-grade {molecule}</> : <>research material</>;
  return (
    <aside className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
      <div className="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-ink/40">
        Where to source
      </div>
      <p className="text-[15px] leading-7 text-ink/70">
        We don&rsquo;t run a storefront — but people ask where to get {what} that meets the
        bar this site holds, and our sister project{" "}
        <span className="font-medium text-ink/90">American Peptide</span> did the homework.
        It points to{" "}
        <a href={href} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
          ABSIM Peptides
        </a>
        : a certificate of analysis on every product, primary literature cited on the page,
        sold research-use-only — the same discipline you&rsquo;re reading here. Researchers
        get {ABSIM_DISCOUNT} off with code{" "}
        <span className="font-mono text-ink/90">{ABSIM_CODE}</span>.
      </p>
      <p className="mt-2.5 text-[15px] leading-7 text-ink/70">
        A second source in the network,{" "}
        <a href={AMINOCLUB_HOME} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
          AminoClub
        </a>
        , makes several of the same peptides available for research use only.
      </p>
      <p className="mt-2.5 text-xs leading-5 text-ink/40">
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
 * without a per-card buy-button — a single quiet line with the disclosure intact.
 */
export function SourcingLine() {
  return (
    <p className="text-sm leading-6 text-ink/50">
      Sourcing research material? Our network points to{" "}
      <a href={ABSIM_HOME} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
        ABSIM
      </a>{" "}
      — a COA on every SKU, {ABSIM_DISCOUNT} off with{" "}
      <span className="font-mono text-ink/75">{ABSIM_CODE}</span> — and{" "}
      <a href={AMINOCLUB_HOME} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
        AminoClub
      </a>
      , a second research-use-only source.{" "}
      <span className="text-ink/40">Affiliate links · </span>
      <Link
        href="/methodology"
        className="underline decoration-ink/20 underline-offset-2 hover:text-ink/70"
      >
        how we pick
      </Link>
    </p>
  );
}
