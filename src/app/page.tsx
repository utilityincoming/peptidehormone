import Link from "next/link";
import { FAMILIES, getFamily } from "@/lib/families";
import { INSIGHTS, featuredInsights } from "@/lib/insights";
import { HORMONES, getHormone, halfLifeForLink } from "@/lib/hormones";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { FamilyGlyph } from "@/components/FamilyGlyph";
import { InsightCover } from "@/components/InsightCover";
import { ToolPreview, shortHalfLife, type ToolPreviewKind } from "@/components/home";
import HeroTimeline, { type TimelineSeries } from "@/components/HeroTimeline";
import { StructureHero } from "@/components/StructureHero";
import { compoundTierClasses, regulatoryClasses } from "@/components/evidence";
import { regulatoryFor, regulatoryMeta, REGULATORY_AS_OF, formatAsOf } from "@/lib/regulatory";
import { SourcingLine } from "@/components/Sourcing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const PRINCIPLES: { icon: PrincipleName; title: string; body: string }[] = [
  {
    icon: "sourced",
    title: "Sourced, not asserted",
    body: "Every mechanism traces to primary literature, structural data, and registered trials — cited, not paraphrased into authority.",
  },
  {
    icon: "research",
    title: "Research-grade, not medical",
    body: "Reference material for understanding the biology. Nothing here is medical advice, a recommendation, or a substitute for a clinician.",
  },
  {
    icon: "independent",
    title: "Editorially independent",
    body: "No storefront, no sponsored conclusions. Disclosed affiliate links fund the work — but the incentive that shapes the catalog is to be correct, never to sell.",
  },
];

// Homepage tools band — a compact echo of the canonical registry in
// src/app/tools/page.tsx, with shorter blurbs sized for the landing page.
const HOME_TOOLS: {
  href: string;
  tag: string;
  name: string;
  blurb: string;
  accent: string;
  preview: ToolPreviewKind;
}[] = [
  {
    href: "/tools/half-life",
    tag: "Pharmacokinetics",
    name: "Half-life & dosing",
    blurb:
      "Model how long a compound stays bioactive and how dose frequency vs half-life builds to steady state.",
    accent: "text-accent",
    preview: "half-life",
  },
  {
    href: "/tools/compare",
    tag: "Structure–activity",
    name: "Analog comparison",
    blurb:
      "Put a native hormone beside the analogs engineered from it — receptor, weight, half-life, and evidence tier on one axis.",
    accent: "text-accent-teal",
    preview: "compare",
  },
  {
    href: "/tools/cycle-planner",
    tag: "Protocol planning",
    name: "Cycle planner",
    blurb:
      "Sketch a research cycle from a goal stack: week-by-week timeline, reference dosing, and a supply estimate. Shareable by URL.",
    accent: "text-accent-amber",
    preview: "cycle",
  },
];

// At-a-glance coverage — counts driven from the data so they never drift.
// The page is a server component, so the large HORMONES array stays server-side.
const STATS: { n: string; label: string }[] = [
  { n: `${HORMONES.length}`, label: "molecules, graded" },
  { n: `${FAMILIES.length}`, label: "signaling families" },
  { n: `${INSIGHTS.length}`, label: "long-form deep-dives" },
  { n: "3", label: "research tools" },
];

// The hero's lineage: native GLP-1 and the three molecules engineered from it,
// one receptor at a time. Only the presentation lives here — half-lives, the
// evidence tier and the regulatory standing are all read from the catalog, so
// the landing page cannot disagree with the monographs it links to.
const LINEAGE: {
  slug: string;
  name: string;
  alias?: string;
  receptors: string[];
  color: string;
  lead?: boolean;
}[] = [
  { slug: "glp-1", name: "Native GLP-1", receptors: ["GLP-1"], color: "var(--accent-amber)" },
  { slug: "semaglutide", name: "Semaglutide", receptors: ["GLP-1"], color: "var(--accent-blue)" },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    receptors: ["GIP", "GLP-1"],
    color: "var(--accent-teal)",
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    alias: "GLP-3",
    receptors: ["GIP", "GLP-1", "glucagon"],
    color: "var(--accent)",
    lead: true,
  },
];

function lineageSeries(): TimelineSeries[] {
  return LINEAGE.flatMap((l) => {
    const h = getHormone(l.slug);
    const reg = regulatoryFor(l.slug);
    if (!h?.halfLifeMin || !reg) return [];
    const meta = regulatoryMeta(reg.status);
    return [
      {
        ...l,
        halfLifeMin: h.halfLifeMin,
        halfLifeLabel: shortHalfLife(h.halfLifeMin),
        tier: h.evidence
          ? { label: `Evidence: ${h.evidence}`, classes: compoundTierClasses(h.evidence) }
          : undefined,
        regulatory: {
          // Spell the standing out where it matters most: a molecule in trials
          // is, in plain words, not an approved drug.
          label: reg.status === "investigational" ? "Not FDA-approved · in trials" : meta.label,
          classes: regulatoryClasses(reg.status === "investigational" ? "amber" : meta.hue),
        },
      },
    ];
  });
}

export default function Home() {
  const series = lineageSeries();
  const frontier = getHormone("retatrutide");
  const frontierReg = regulatoryFor("retatrutide");
  const frontierLink = frontier?.halfLifeMin ? halfLifeForLink(frontier.halfLifeMin) : undefined;
  const [lead, ...rest] = featuredInsights();
  const leadFamily = lead ? getFamily(lead.family) : undefined;
  return (
    <>
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              background:
                "radial-gradient(60% 60% at 75% 0%, rgba(124,131,255,0.18), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgba(45,212,168,0.10), transparent 70%)",
            }}
          />
          <Container className="relative py-14 md:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Independent · research-grade · no products
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
                The peptide frontier,
                <span className="text-accent"> mapped from the source.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">
                Every signaling family, the molecules that matter, and the
                evidence behind them — sourced, graded, and cross-linked.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#families"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-surface-deep transition-transform hover:-translate-y-0.5"
                >
                  Explore the families
                  <span aria-hidden>→</span>
                </a>
                <Link
                  href="/catalog"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 font-medium text-ink/85 transition-colors hover:border-ink/40"
                >
                  Browse the catalog
                </Link>
              </div>
              <p className="mt-5 text-sm text-ink/60">
                New to the subject? Start with{" "}
                <Link
                  href="/what-is-a-peptide-hormone"
                  className="text-ink/85 underline decoration-ink/30 underline-offset-2 transition-colors hover:text-accent"
                >
                  what a peptide hormone is
                </Link>
                .
              </p>
            </div>

            <StructureHero />
            </div>

            {/* ── Lead figure: from a two-minute hormone to three receptors ── */}
            <figure className="mt-14 md:mt-20">
              <figcaption className="max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
                  Where the frontier is now
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                  Lasting a week is solved. The race is now receptors.
                </h2>
                <p className="mt-3 text-base leading-7 text-ink/65">
                  Native GLP-1 is gone minutes after the gut releases it. Semaglutide
                  made the same signal last a week; tirzepatide added a second
                  receptor, and retatrutide a third. Drag through two weeks to see
                  what is left of a single dose.
                </p>
              </figcaption>

              <div className="mt-8">
                <HeroTimeline series={series} />
              </div>

              {frontier && frontierReg && (
                <div className="mt-4 rounded-2xl border border-accent-amber/30 bg-accent-amber/[0.06] p-4 text-sm leading-6 text-ink/75 sm:p-5">
                  <p>
                    <span className="font-medium text-accent-amber">
                      Retatrutide is not an approved medicine.
                    </span>{" "}
                    {frontierReg.basis} &ldquo;GLP-3&rdquo; is a market nickname
                    for it, not a hormone — there is no GLP-3 — and material sold
                    under that name is research-use-only, outside the approved-drug
                    system.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {[
                      { href: "/insights/the-triple-agonist", label: "What the triple agonist is" },
                      { href: "/insights/is-there-a-glp-4", label: "Is there a GLP-4?" },
                      ...(frontierLink
                        ? [
                            {
                              href: `/tools/half-life?t12=${frontierLink.value}&unit=${frontierLink.unit}`,
                              label: "Model its half-life",
                            },
                          ]
                        : []),
                    ].map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="inline-flex items-center gap-1.5 font-medium text-ink/90 transition-colors hover:text-accent"
                      >
                        {l.label}
                        <span aria-hidden>→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-4 text-xs leading-5 text-ink/60">
                Half-lives are the representative values on each linked monograph.
                Curves show first-order elimination of one dose — a simplification
                with no absorption phase or accumulation, and not dosing guidance.
                Regulatory status: United States, reviewed{" "}
                {formatAsOf(REGULATORY_AS_OF)}.{" "}
                <Link
                  href="/methodology"
                  className="text-ink/85 underline decoration-ink/30 underline-offset-2 transition-colors hover:text-accent"
                >
                  How we grade evidence
                </Link>
              </p>
            </figure>
          </Container>
        </section>

        {/* ── At a glance ── */}
        <section className="border-b border-ink/[0.06]">
          <Container className="grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-3 text-center">
                <div className="font-display text-3xl font-semibold text-accent sm:text-4xl">
                  {s.n}
                </div>
                <div className="mt-1.5 text-xs font-medium uppercase tracking-wide text-ink/50">
                  {s.label}
                </div>
              </div>
            ))}
          </Container>
        </section>

        {/* ── Families ── */}
        <section id="families" className="border-b border-ink/[0.06] py-20 md:py-24">
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                The catalog, by signaling family
              </h2>
              <p className="mt-4 text-lg leading-8 text-ink/60">
                The whole landscape, mapped into the families that share receptors,
                anatomy, and logic — each a hub of the molecules that matter and the
                evidence behind them. Open any one for the full reference.
              </p>
              <Link
                href="/catalog"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:translate-x-0.5"
              >
                Browse the full catalog
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {FAMILIES.map((f) => (
                <Link
                  key={f.slug}
                  href={`/families/${f.slug}`}
                  className="group block bg-surface p-7 transition-colors hover:bg-panel"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.accent}`}
                      style={{
                        backgroundColor:
                          "color-mix(in oklab, currentColor 12%, transparent)",
                      }}
                    >
                      <FamilyGlyph slug={f.slug} className="h-[22px] w-[22px]" />
                    </span>
                    <span
                      className="text-ink/25 transition-all group-hover:translate-x-0.5 group-hover:text-ink/70"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <h3 className={`mt-5 font-display text-lg font-semibold ${f.accent}`}>
                    {f.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{f.blurb}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink/40">
                    {f.examples}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Insights rail ── */}
        <section id="insights" className="border-b border-ink/[0.06] py-20 md:py-24">
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                The mechanisms, in long form
              </h2>
              <p className="mt-4 text-lg leading-8 text-ink/60">
                Long-form deep-dives that trace one molecule — or one question — back
                to the source: receptors, second messengers, and the evidence behind
                them. Biology over benefits.
              </p>
              <Link
                href="/insights"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:translate-x-0.5"
              >
                All insights
                <span aria-hidden>→</span>
              </Link>
            </div>

            {lead && (
              <Link
                href={`/insights/${lead.slug}`}
                className="group mt-12 grid overflow-hidden rounded-2xl border border-ink/10 bg-surface transition-colors hover:bg-panel md:grid-cols-[1.1fr_1fr]"
              >
                <InsightCover
                  slug={lead.slug}
                  family={lead.family}
                  accent={leadFamily?.accent}
                  className="aspect-[16/9] md:aspect-auto md:min-h-72"
                />
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-wide ${leadFamily?.accent ?? "text-accent"}`}
                    >
                      {leadFamily?.name ?? "Peptide science"}
                    </span>
                    <span className="font-mono text-[11px] text-ink/60">
                      {lead.readingMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                    {lead.title}
                  </h3>
                  <p className="mt-3 line-clamp-4 leading-7 text-ink/65">{lead.dek}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform group-hover:translate-x-0.5">
                    Read the deep-dive <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {rest.map((post) => {
                const fam = getFamily(post.family);
                return (
                  <Link
                    key={post.slug}
                    href={`/insights/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface transition-colors hover:bg-panel"
                  >
                    <InsightCover
                      slug={post.slug}
                      family={post.family}
                      accent={fam?.accent}
                      className="aspect-[16/9]"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`font-mono text-[11px] uppercase tracking-wide ${fam?.accent ?? "text-accent"}`}
                        >
                          {fam?.name ?? "Peptide science"}
                        </span>
                        <span className="font-mono text-[11px] text-ink/60">
                          {post.readingMinutes} min
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/60">
                        {post.dek}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── Tools band ── */}
        <section id="tools" className="border-b border-ink/[0.06] py-20 md:py-24">
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                Run the numbers yourself
              </h2>
              <p className="mt-4 text-lg leading-8 text-ink/60">
                Free, in-browser, no sign-up — the pharmacokinetics the vendor pages
                skip. Educational, not dosing advice.
              </p>
              <Link
                href="/tools"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:translate-x-0.5"
              >
                All tools &amp; calculators
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {HOME_TOOLS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group block bg-surface p-7 transition-colors hover:bg-panel"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-wide ${t.accent}`}
                    >
                      {t.tag}
                    </span>
                    <span
                      className="text-ink/30 transition-all group-hover:translate-x-0.5 group-hover:text-ink/70"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <div className="mt-4">
                    <ToolPreview kind={t.preview} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{t.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/60">{t.blurb}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Approach ── */}
        <section id="approach" className="py-20 md:py-24">
          <Container className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                Bullish on the science.
                <span className="text-accent"> Sceptical on the page.</span>
              </h2>
              <p className="mt-4 max-w-md text-lg leading-8 text-ink/60">
                A signaling system this old, this economical, and this suddenly
                writable has earned real enthusiasm — pretending otherwise would be
                its own kind of dishonesty. But enthusiasm that outruns its citations
                is just marketing with better vocabulary. So every claim here carries
                its evidence, graded by how far it actually goes — settled where the
                science is settled, the frontier where it isn&rsquo;t.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link
                  href="/methodology"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:translate-x-0.5"
                >
                  How we grade
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/why-peptides"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
                >
                  Why this exists
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
            <div>
              <div className="space-y-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
                {PRINCIPLES.map((p) => (
                  <div key={p.title} className="bg-surface p-7">
                    <PrincipleIcon name={p.icon} className="h-6 w-6 text-accent" />
                    <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/65">{p.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <SourcingLine />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/* ── Principle icons ──
   Three line-glyphs for the trust principles, in the same grammar as the family
   marks but a single restrained accent — a sourced document, a research flask,
   an independence balance. */
type PrincipleName = "sourced" | "research" | "independent";

function PrincipleIcon({
  name,
  className = "",
}: {
  name: PrincipleName;
  className?: string;
}) {
  const glyph = {
    // Sourced — a cited reference page.
    sourced: (
      <>
        <path d="M6.5 3 H13.5 L17.5 7 V21 H6.5 Z" />
        <path d="M13.5 3 V7 H17.5" />
        <path d="M9 12 H15 M9 15 H15 M9 18 H12.5" />
      </>
    ),
    // Research-grade — a lab flask.
    research: (
      <>
        <path d="M9 3 H15" />
        <path d="M10 3 V9.5 L5.8 18.2 Q5.2 20.5 7.6 20.5 H16.4 Q18.8 20.5 18.2 18.2 L14 9.5 V3" />
        <path d="M7.3 15 H16.7" />
      </>
    ),
    // Editorially independent — a level balance.
    independent: (
      <>
        <path d="M12 4.8 V19 M8.5 19 H15.5 M6 8 H18" />
        <path d="M6 8 L4.6 12 M6 8 L7.4 12 M4.3 12 A2.6 2.6 0 0 0 7.7 12" />
        <path d="M18 8 L16.6 12 M18 8 L19.4 12 M16.3 12 A2.6 2.6 0 0 0 19.7 12" />
        <circle cx="12" cy="4.6" r="1.05" fill="currentColor" stroke="none" />
      </>
    ),
  }[name];
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {glyph}
    </svg>
  );
}
