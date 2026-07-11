import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { siteLd } from "@/lib/jsonld";
import { Analytics } from "@vercel/analytics/next";

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
  metadataBase: new URL("https://www.peptidehormone.com"),
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
    url: "https://www.peptidehormone.com",
    siteName: "Peptide Hormone",
    type: "website",
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
        <JsonLd data={siteLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
