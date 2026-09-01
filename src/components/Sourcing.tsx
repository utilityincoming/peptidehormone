import Link from "next/link";
import { AMINOCLUB_CODE, AMINOCLUB_HOME, AFFILIATE_REL } from "@/lib/affiliate";

// Two intensities of the same disclosed recommendation. Both are text, never a
// button; both carry the affiliate disclosure inline and link to /methodology.
// Placement (which surface gets which) lives with the pages — see the build notes.

const AFF_LINK =
  "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

/**
 * Full sourcing block. Bottom-of-page on the "where the powder comes from" insight
 * and the planning tools. Reads like a footnote, not an ad: muted panel, small
 * type, one link out.
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
        We don&rsquo;t run a storefront — but people ask where to get {what} that meets the
        bar this site holds, and our sister project{" "}
        <span className="font-medium text-ink/90">American Peptide</span> did the homework.
        It points to{" "}
        <a href={AMINOCLUB_HOME} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
          AminoClub
        </a>
        : a research-use-only peptide supplier, sold with provenance you can reason about —
        the same discipline you&rsquo;re reading here. Use code{" "}
        <span className="font-mono text-ink/90">{AMINOCLUB_CODE}</span> at checkout.
      </p>
      <p className="mt-2.5 text-xs leading-5 text-ink/40">
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
 * without a per-card buy-button — a single quiet line with the disclosure intact.
 */
export function SourcingLine() {
  return (
    <p className="text-sm leading-6 text-ink/50">
      Sourcing research material? Our network points to{" "}
      <a href={AMINOCLUB_HOME} target="_blank" rel={AFFILIATE_REL} className={AFF_LINK}>
        AminoClub
      </a>{" "}
      — a research-use-only supplier; use code{" "}
      <span className="font-mono text-ink/75">{AMINOCLUB_CODE}</span>.{" "}
      <span className="text-ink/40">Affiliate link · </span>
      <Link
        href="/methodology"
        className="underline decoration-ink/20 underline-offset-2 hover:text-ink/70"
      >
        how we pick
      </Link>
    </p>
  );
}
