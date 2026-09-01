import Link from "next/link";
import { AMINOCLUB_CODE, AMINOCLUB_HOME, AFFILIATE_REL } from "@/lib/affiliate";

// Two intensities of the same disclosed recommendation. Both are text, never a
// button, and both lead high-signal — front-load the answer, then link out. The
// full block (SourcingNote) keeps the affiliate disclosure inline; the one-liner
// (SourcingLine) is disclosure-free. Placement lives with the pages.

const AFF_LINK =
  "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

const CTA =
  "mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline";

/**
 * Full sourcing block. Bottom-of-page on the "where the powder comes from" insight
 * and the planning tools. Reads like a trusted tip, not an ad: muted panel, a clear
 * link out, disclosure kept intact.
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
        Where to actually get {what}? We host no storefront — so our sister project{" "}
        <span className="font-medium text-ink/90">American Peptide</span> vetted the source:{" "}
        <a href={AMINOCLUB_HOME} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
          AminoClub
        </a>
        , a research-use-only supplier with provenance you can actually reason about — the
        same bar this reference holds. Your code{" "}
        <span className="font-mono text-ink/90">{AMINOCLUB_CODE}</span> is already in the link.
      </p>
      <a href={AMINOCLUB_HOME} target="_blank" rel={AFFILIATE_REL} className={CTA}>
        Browse AminoClub <span aria-hidden>→</span>
      </a>
      <p className="mt-3 text-xs leading-5 text-ink/40">
        Affiliate link across our network — a purchase supports this reference at no cost to
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
 * without a per-card buy-button — a high-signal line that front-loads the answer
 * and links out. Outbound links carry rel="sponsored" as the honest paid-link signal.
 */
export function SourcingLine() {
  return (
    <p className="text-sm leading-6 text-ink/60">
      Where to actually get it:{" "}
      <a href={AMINOCLUB_HOME} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
        AminoClub
      </a>{" "}
      — the research-use-only supplier our network vetted,{" "}
      <span className="font-mono text-ink/75">{AMINOCLUB_CODE}</span> in the link.{" "}
      <a
        href={AMINOCLUB_HOME}
        target="_blank"
        rel={AFFILIATE_REL}
        className="font-medium text-accent hover:underline"
      >
        Browse AminoClub <span aria-hidden>→</span>
      </a>
    </p>
  );
}
