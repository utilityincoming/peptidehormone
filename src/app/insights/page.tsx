import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { collectionLd } from "@/lib/jsonld";
import { INSIGHTS } from "@/lib/insights";
import { getFamily } from "@/lib/families";

export const metadata: Metadata = {
  title: "Insights — mechanistic deep-dives",
  description:
    "Long-form, research-grade deep-dives into peptide hormone mechanisms and signaling — biology over benefits, sourced and explained.",
};

export default function InsightsIndex() {
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
      <main className="flex-1">
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
          </Container>
        </section>

        <Container className="py-14 md:py-18">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
            {INSIGHTS.map((post) => {
              const fam = getFamily(post.family);
              return (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group block bg-surface p-7 transition-colors hover:bg-panel"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`font-mono text-[11px] uppercase tracking-wide ${fam?.accent ?? "text-accent"}`}>
                      {fam?.name ?? "Peptide science"}
                    </span>
                    <span className="font-mono text-[11px] text-ink/40">
                      {post.readingMinutes} min · {post.reviewed}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-snug">{post.title}</h2>
                  <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink/60">{post.dek}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform group-hover:translate-x-0.5">
                    Read the deep-dive <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
