import type { ReactNode } from "react";
import Link from "next/link";
import { FAMILIES } from "@/lib/families";
import SearchDialog from "@/components/SearchDialog";
import MobileNav from "@/components/MobileNav";
import SectionNavLink from "@/components/SectionNavLink";

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
        Peptide<span className="text-muted">Hormone</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/[0.06] bg-surface/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Wordmark />
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
          <nav aria-label="Site" className="hidden items-center gap-6 text-sm text-secondary md:flex lg:gap-8">
            {[
              { href: "/catalog", label: "Catalog" },
              { href: "/insights", label: "Insights" },
              { href: "/tools", label: "Tools" },
              { href: "/available", label: "Availability" },
            ].map(({ href, label }) => (
              <SectionNavLink
                key={href}
                href={href}
                className="transition-colors hover:text-ink [&[aria-current]]:text-accent [&[aria-current]]:underline [&[aria-current]]:decoration-2 [&[aria-current]]:underline-offset-8"
              >
                {label}
              </SectionNavLink>
            ))}
          </nav>
          <div className="md:border-l md:border-ink/10 md:pl-4 lg:pl-5">
            <SearchDialog />
          </div>
          <MobileNav />
          <Link
            href="/catalog"
            className="hidden rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/90 transition-colors hover:border-accent hover:text-accent lg:inline-block"
          >
            Browse catalog
          </Link>
        </div>
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
          <p className="mt-4 text-sm leading-6 text-muted">
            An independent reference on peptide hormones and the research behind them.
          </p>
        </div>
        <div className="flex gap-14 text-sm">
          <div>
            <p className="font-medium text-muted">Families</p>
            <ul className="mt-3 space-y-2 text-secondary">
              {FAMILIES.slice(0, 3).map((f) => (
                <li key={f.slug}>
                  <Link href={`/families/${f.slug}`} className="hover:text-ink">{f.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-muted">Explore</p>
            <ul className="mt-3 space-y-2 text-secondary">
              <li><Link href="/research" className="hover:text-ink">Research agent</Link></li>
              <li><Link href="/catalog" className="hover:text-ink">Catalog</Link></li>
              <li><Link href="/insights" className="hover:text-ink">Insights</Link></li>
              <li><Link href="/tools" className="hover:text-ink">Tools &amp; calculators</Link></li>
              <li><Link href="/glossary" className="hover:text-ink">Glossary</Link></li>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col items-start gap-3 border-t border-ink/[0.06] py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">© {new Date().getFullYear()} Peptide Hormone</p>
        <Link href="/methodology" className="text-secondary hover:text-ink hover:underline">
          Evidence standards
        </Link>
      </Container>
    </footer>
  );
}
