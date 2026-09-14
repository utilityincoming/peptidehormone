import type { Metadata } from "next";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { collectionLd } from "@/lib/jsonld";
import { INSIGHTS } from "@/lib/insights";
import InsightsBrowser from "@/components/InsightsBrowser";

export const metadata: Metadata = {
  title: "Insights — mechanistic deep-dives",
  alternates: { canonical: "/insights" },
  description:
    "Long-form, research-grade deep-dives into peptide hormone mechanisms and signaling — biology over benefits, sourced and explained.",
};

export default function InsightsIndex() {
  const familyCount = new Set(INSIGHTS.map((i) => i.family)).size;
  return (
    <>
      <JsonLd
        data={collectionLd({
          path: "/insights",
          name: "Insights — mechanistic deep-dives",
          description:
            "Long-form, research-grade deep-dives into peptide hormone mechanisms and signaling.",
          items: INSIGHTS.map((i) => ({ name: i.title, path: `/insights/${i.slug}` })),
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ],
        })}
      />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 75% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
          />
          <Container className="relative py-16 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Biology over benefits
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Insights
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
              Long-form deep-dives into how peptide hormones actually work —
              receptors, second messengers, and physiology, traced from the source.
              Mechanistic depth, not marketing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-ink/45">
              <span>
                <span className="text-ink/80">{INSIGHTS.length}</span> deep-dives
              </span>
              <span aria-hidden className="text-ink/20">·</span>
              <span>
                <span className="text-ink/80">{familyCount}</span> families
              </span>
              <span aria-hidden className="text-ink/20">·</span>
              <span>Sourced, reviewed — no dosing</span>
            </div>
          </Container>
        </section>

        <Container className="py-12 md:py-16">
          <InsightsBrowser />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
