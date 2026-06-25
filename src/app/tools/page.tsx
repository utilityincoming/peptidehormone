import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";

export const metadata: Metadata = {
  title: "Research tools & calculators",
  description:
    "Free, in-browser peptide research tools — a half-life & dosing calculator that models how long a compound stays bioactive and how dose frequency builds to steady state. Educational, not medical advice.",
};

const TOOLS: { href: string; name: string; blurb: string; tag: string; accent: string }[] = [
  {
    href: "/tools/half-life",
    name: "Half-life & dosing calculator",
    blurb:
      "Model how long a peptide stays bioactive and how dose frequency vs half-life builds to steady state — accumulation, peak-to-trough swing, and a concentration-over-time chart.",
    tag: "Pharmacokinetics",
    accent: "text-accent",
  },
];

export default function ToolsIndex() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(55% 55% at 75% 0%, rgba(124,131,255,0.14), transparent 70%)",
            }}
          />
          <Container className="relative py-16 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Free · no sign-up · no products
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Research tools & calculators
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
              Fast, transparent utilities for peptide research. Everything runs in
              your browser. Educational only, not medical or dosing advice.
            </p>
          </Container>
        </section>

        <Container className="py-16 md:py-20">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group block bg-surface p-7 transition-colors hover:bg-panel"
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[11px] uppercase tracking-wide ${t.accent}`}>{t.tag}</span>
                  <span className="text-ink/30 transition-all group-hover:translate-x-0.5 group-hover:text-ink/70" aria-hidden>→</span>
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold">{t.name}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/60">{t.blurb}</p>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
