import type { Metadata } from "next";
import { connection } from "next/server";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { collectionLd } from "@/lib/jsonld";
import { INSIGHTS, recentInsights } from "@/lib/insights";
import Link from "next/link";
import InsightsBrowser from "@/components/InsightsBrowser";

export const metadata: Metadata = {
  title: "Insights — mechanistic deep-dives",
  alternates: { canonical: "/insights" },
  description:
    "Long-form, research-grade deep-dives into peptide hormone mechanisms and signaling — biology over benefits, sourced and explained.",
};

export default async function InsightsIndex() {
  // Render shared filters on the first request as well as after hydration.
  await connection();
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
        <section className="border-b border-ink/[0.06]" aria-labelledby="insights-title">
          <Container className="page-intro">
            <div>
              <h1 id="insights-title" className="page-title">
                Insights
              </h1>
              <p className="page-summary">
                Research essays on peptide hormones, their receptors, and how they signal.
              </p>
            </div>
            <p className="mt-3 text-sm text-secondary">
              {INSIGHTS.length} articles <span aria-hidden>·</span> {familyCount} signaling families
            </p>
          </Container>
        </section>

        <Container className="pb-12 pt-5 sm:pt-6 md:pb-16">
          <section className="mb-8">
            <h2 className="font-display text-lg font-semibold">Recently added</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {recentInsights(4).map((item) => (
                <li key={item.slug}>
                  <Link href={`/insights/${item.slug}`} className="reference-card block p-4 transition-colors hover:border-accent/40 hover:bg-panel">
                    <span className="font-display text-base font-semibold text-ink">{item.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-secondary">{item.readingMinutes} min · {item.reviewed}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <InsightsBrowser />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
