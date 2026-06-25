import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
    "An independent, research-grade catalog of peptide science — every signaling family, the molecules that matter, and the evidence behind them, with a citation-grounded research agent and pharmacokinetic tools. Not medical advice.",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
