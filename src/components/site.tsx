import type { ReactNode } from "react";
import Link from "next/link";
import { FAMILIES } from "@/lib/families";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}

/* Brand mark: a stylized tri-residue peptide. */
export function PeptideMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="5" cy="9" r="2.4" fill="currentColor" />
      <circle cx="12" cy="15" r="2.4" fill="currentColor" opacity="0.7" />
      <circle cx="19" cy="7" r="2.4" fill="currentColor" opacity="0.45" />
      <path
        d="M6.7 10.4 10.3 13.6M13.7 13.6 17.3 8.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <PeptideMark className="h-6 w-6 text-accent" />
      <span className="font-display text-[15px] font-semibold tracking-tight">
        Peptide<span className="text-ink/40">Hormone</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/[0.06] bg-surface/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Wordmark />
        <nav className="hidden items-center gap-8 text-sm text-ink/60 sm:flex">
          <Link href="/catalog" className="transition-colors hover:text-ink">Catalog</Link>
          <Link href="/insights" className="transition-colors hover:text-ink">Insights</Link>
          <Link href="/tools" className="transition-colors hover:text-ink">Tools</Link>
          <Link
            href="/catalog"
            className="rounded-full border border-ink/15 px-4 py-1.5 text-ink/90 transition-colors hover:border-accent hover:text-accent"
          >
            Browse catalog
          </Link>
        </nav>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/[0.06] bg-surface-deep">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-4 text-sm leading-6 text-ink/45">
            An independent, research-grade reference on the peptide hormone
            system. Educational only — not medical advice, diagnosis, or
            treatment.
          </p>
        </div>
        <div className="flex gap-14 text-sm">
          <div>
            <p className="font-medium text-ink/40">Families</p>
            <ul className="mt-3 space-y-2 text-ink/65">
              {FAMILIES.slice(0, 3).map((f) => (
                <li key={f.slug}>
                  <Link href={`/families/${f.slug}`} className="hover:text-ink">{f.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-ink/40">Explore</p>
            <ul className="mt-3 space-y-2 text-ink/65">
              <li><Link href="/catalog" className="hover:text-ink">Catalog</Link></li>
              <li><Link href="/insights" className="hover:text-ink">Insights</Link></li>
              <li><Link href="/tools" className="hover:text-ink">Tools &amp; calculators</Link></li>
              <li><Link href="/methodology" className="hover:text-ink">Methodology</Link></li>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="border-t border-ink/[0.06] py-6">
        <p className="text-xs text-ink/35">
          © {new Date().getFullYear()} Peptide Hormone · peptidehormone.com
        </p>
      </Container>
    </footer>
  );
}
