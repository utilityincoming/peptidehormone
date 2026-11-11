"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string }[] = [
  { href: "/catalog", label: "Catalog" },
  { href: "/insights", label: "Insights" },
  { href: "/tools", label: "Tools & calculators" },
  { href: "/research", label: "Research agent" },
  { href: "/available", label: "Availability" },
  { href: "/glossary", label: "Glossary" },
  { href: "/methodology", label: "Methodology" },
];

/**
 * Phone-width navigation: a menu button (hidden from `sm` up, where the inline
 * nav takes over) that drops a panel under the sticky header. Closes on Escape,
 * on navigation, and when a link is chosen.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 bg-panel/40 text-ink/70 transition-colors hover:border-ink/25 hover:text-ink"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          aria-hidden
        >
          {open ? <path d="M6 6 18 18M18 6 6 18" /> : <path d="M4 7H20M4 12H20M4 17H20" />}
        </svg>
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Site"
          className="absolute inset-x-0 top-full border-b border-ink/10 bg-surface shadow-2xl shadow-black/50"
        >
          <ul className="mx-auto max-w-6xl px-6 py-3">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-ink/[0.06] last:border-b-0">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="flex items-center justify-between py-3.5 text-base text-ink/85 aria-[current=page]:text-accent"
                >
                  {l.label}
                  <span aria-hidden className="text-ink/30">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
