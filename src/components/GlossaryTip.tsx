import Link from "next/link";
import type { ReactNode } from "react";
import { termBySlug } from "@/lib/glossary";

/**
 * Inline glossary term. Renders a dotted-underlined link to the term's full
 * entry at /glossary#<slug> and reveals its definition in a small tooltip on
 * hover and on keyboard focus.
 *
 * No JavaScript: the reveal is pure CSS (`peer-hover` / `peer-focus-visible`),
 * so it works in a server-rendered page before — or entirely without —
 * hydration. With neither JS nor CSS it degrades to a plain link to the full
 * definition. The tooltip is decorative (`aria-hidden`); assistive-tech users
 * reach the same definition by following the link, which carries the term as
 * its accessible name.
 */
export function GlossaryTip({ slug, children }: { slug: string; children?: ReactNode }) {
  const term = termBySlug(slug);
  // Unknown slug: keep a working link rather than dropping to bare text, so a
  // typo degrades to the glossary index instead of a dead end.
  if (!term) {
    return (
      <Link href={`/glossary#${slug}`} className="text-accent hover:underline">
        {children ?? slug}
      </Link>
    );
  }
  return (
    <span className="relative inline-block">
      <Link
        href={`/glossary#${slug}`}
        className="peer cursor-help text-accent underline decoration-dotted decoration-accent/40 underline-offset-2 outline-none transition-colors hover:decoration-accent focus-visible:decoration-accent"
      >
        {children ?? term.term}
      </Link>
      <span
        role="tooltip"
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-64 max-w-[min(16rem,80vw)] -translate-x-1/2 rounded-xl border border-ink/10 bg-surface p-3 text-left text-xs font-normal normal-case leading-5 tracking-normal text-ink/70 opacity-0 shadow-lg transition-opacity duration-150 peer-hover:opacity-100 peer-focus-visible:opacity-100"
      >
        <span className="font-display text-[13px] font-semibold text-ink">{term.term}</span>
        {term.abbr ? <span className="text-ink/40"> · {term.abbr}</span> : null}
        <span className="mt-1 block">{term.def}</span>
      </span>
    </span>
  );
}
