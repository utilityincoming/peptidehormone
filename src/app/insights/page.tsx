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
        <section className="border-b border-ink/10 bg-panel/55" aria-labelledby="insights-title">
          <Container className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 py-7 sm:py-9">
            <div>
              <h1 id="insights-title" className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Insights
              </h1>
              <p className="mt-2 max-w-xl text-base leading-7 text-secondary">
                Research essays on peptide hormones, their receptors, and how they signal.
              </p>
            </div>
            <p className="text-sm text-secondary">
              {INSIGHTS.length} articles <span aria-hidden>·</span> {familyCount} signaling families
            </p>
          </Container>
        </section>

        <Container className="pb-12 pt-5 sm:pt-6 md:pb-16">
          <InsightsBrowser />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
