"use client";

import { useState, type ReactNode } from "react";
import { track } from "@vercel/analytics";
import { AFFILIATE_REL } from "@/lib/affiliate";

// The two client-side pieces of the referral layer. Everything else in Sourcing.tsx
// stays a server component; these are the only bits that need a browser.
//
// AffiliateLink: an outbound vendor link that reports the click to Vercel Analytics
// (vendor · molecule · surface) so we know which placements actually send readers
// through — the referral layer's own evidence base. Fires-and-forgets; the
// navigation is never blocked on it.
//
// CopyCode: the reader code as a one-tap copy chip. The code already rides in the
// link, but a visible, copyable code is the single biggest reassurance at the
// checkout step ("did it apply?") — and it survives a reader who opens the vendor
// in a fresh tab later.

type Surface = "monograph" | "available" | "vendor" | "note" | "line" | "catalog";

export function AffiliateLink({
  href,
  vendor,
  slug,
  surface,
  className,
  children,
}: {
  href: string;
  vendor: string;
  slug?: string;
  surface: Surface;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel={AFFILIATE_REL}
      className={className}
      onClick={() => {
        try {
          track("affiliate_click", { vendor, slug: slug ?? "storefront", surface });
        } catch {
          /* analytics is best-effort */
        }
      }}
    >
      {children}
    </a>
  );
}

export function CopyCode({
  code,
  className = "",
  size = "compact",
}: {
  code: string;
  className?: string;
  size?: "compact" | "comfortable";
}) {
  const [copied, setCopied] = useState(false);
  const comfortable = size === "comfortable";
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard unavailable — the code is still visible to select */
        }
      }}
      title="Copy code"
      aria-label={`Copy code ${code}`}
      className={`inline-flex items-center tracking-wide transition-colors ${
        comfortable
          ? "w-full justify-between gap-3 rounded-md border border-accent/40 bg-accent/[0.08] px-3.5 py-2.5 font-mono text-sm text-accent hover:bg-accent/[0.14]"
          : "gap-1.5 rounded-md border border-dashed border-accent-teal/50 bg-accent-teal/[0.08] px-2 py-0.5 font-mono text-[12px] text-accent-teal hover:bg-accent-teal/[0.14]"
      } ${className}`}
    >
      {code}
      <span
        aria-hidden
        className={`font-sans font-medium uppercase ${
          comfortable ? "text-xs tracking-[0.12em] text-accent" : "text-[10px] text-accent-teal/70"
        }`}
      >
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}
