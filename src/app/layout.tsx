import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
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
    default: "Peptide Hormone — a research-grade reference on the peptide hormone system",
    template: "%s · Peptide Hormone",
  },
  description:
    "An independent, sourced reference on peptide hormones — incretins, growth, metabolic, melanocortin, and neuropeptide signaling. Research-grade, not medical advice.",
  openGraph: {
    title: "Peptide Hormone",
    description:
      "A research-grade reference on the peptide hormone system. Sourced, independent, not medical advice.",
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
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
