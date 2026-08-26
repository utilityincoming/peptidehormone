import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { siteLd } from "@/lib/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peptidehormone.com"),
  title: {
    default: "Peptide Hormone — the research-grade catalog of peptide science",
    template: "%s · Peptide Hormone",
  },
  description:
    "An independent, research-grade catalog of peptide science — every signaling family, the molecules that matter, and the evidence behind them: sourced, evidence-graded, and cross-linked, with pharmacokinetic tools. Not medical advice.",
  openGraph: {
    title: "Peptide Hormone",
    description:
      "The research-grade catalog of peptide science — families, molecules, and the evidence behind them. Independent, citation-grounded, not medical advice.",
    url: "https://peptidehormone.com",
    siteName: "Peptide Hormone",
    type: "website",
  },
  // Large-image card site-wide. Title, description, and image are left unset so
  // that X falls back to each page's own og:* tags — keeping cards per-page
  // correct without repeating them on every route.
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Keyboard escape hatch past the sticky header and nav. Visually hidden
            until focused, then pinned over the header. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-medium focus:text-surface-deep focus:outline-none focus:ring-2 focus:ring-ink/40"
        >
          Skip to content
        </a>
        <JsonLd data={siteLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
