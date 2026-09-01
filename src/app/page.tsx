import Link from "next/link";
import { FAMILIES, getFamily } from "@/lib/families";
import { INSIGHTS, featuredInsights } from "@/lib/insights";
import { HORMONES } from "@/lib/hormones";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { FamilyGlyph } from "@/components/FamilyGlyph";
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
    body: "No storefront, no sponsored conclusions. One disclosed affiliate link funds the work — but the incentive that shapes the catalog is to be correct, never to sell.",
  },
];

// Homepage tools band — a compact echo of the canonical registry in
// src/app/tools/page.tsx, with shorter blurbs sized for the landing page.
const HOME_TOOLS: { href: string; tag: string; name: string; blurb: string; accent: string }[] = [
  {
    href: "/tools/half-life",
    tag: "Pharmacokinetics",
    name: "Half-life & dosing",
    blurb:
      "Model how long a compound stays bioactive and how dose frequency vs half-life builds to steady state.",
    accent: "text-accent",
  },
  {
    href: "/tools/compare",
    tag: "Structure–activity",
    name: "Analog comparison",
    blurb:
      "Put a native hormone beside the analogs engineered from it — receptor, weight, half-life, and evidence tier on one axis.",
    accent: "text-accent-teal",
  },
  {
    href: "/tools/cycle-planner",
    tag: "Protocol planning",
    name: "Cycle planner",
    blurb:
      "Sketch a research cycle from a goal stack: week-by-week timeline, reference dosing, and a supply estimate. Shareable by URL.",
    accent: "text-accent-amber",
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

export default function Home() {
  const featured = featuredInsights();
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
          <Container className="relative grid items-center gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Independent · research-grade · no products
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
                The peptide frontier,
                <span className="text-accent"> mapped from the source.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/65">
                Short chains of amino acids, outsized reach — from the signals
                that run the body to the compounds redrawing the edge of research
                and discovery. PeptideHormone is the independent, research-grade
                catalog of peptide science: every signaling family, the molecules
                that matter, and the evidence behind them — sourced, graded, and
                cross-linked, with pharmacokinetic tools.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
            </div>

            <div className="mx-auto w-full max-w-sm md:max-w-none">
              <HeroChain />
            </div>
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

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
              {featured.map((post) => {
                const fam = getFamily(post.family);
                return (
                  <Link
                    key={post.slug}
                    href={`/insights/${post.slug}`}
                    className="group block bg-surface p-7 transition-colors hover:bg-panel"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-wide ${fam?.accent ?? "text-accent"}`}
                      >
                        {fam?.name ?? "Peptide science"}
                      </span>
                      <span className="font-mono text-[11px] text-ink/40">
                        {post.readingMinutes} min
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/60">
                      {post.dek}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform group-hover:translate-x-0.5">
                      Read the deep-dive <span aria-hidden>→</span>
                    </span>
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
                  <h3 className="mt-4 font-display text-lg font-semibold">{t.name}</h3>
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

/* ── Hero visual: a peptide chain docking into its receptor ──
   The brand story in one image — a signal (the residue chain, left) meeting the
   structure that reads it (the receptor cradle, right). Backbone dashes travel
   toward the pocket; a bind-pulse breathes at the opening. Pure SVG + CSS, so it
   honours prefers-reduced-motion (see globals.css). */
function HeroChain() {
  const nodes = [
    { x: 56, y: 150, c: "var(--accent)" },
    { x: 126, y: 214, c: "var(--accent-blue)" },
    { x: 196, y: 136, c: "var(--accent-teal)" },
    { x: 266, y: 210, c: "var(--accent-purple)" },
    { x: 346, y: 150, c: "var(--accent-amber)" },
  ];
  return (
    <div className="hero-float">
      <svg
        viewBox="0 0 460 340"
        className="w-full"
        role="img"
        aria-label="A peptide chain docking into its receptor"
      >
        <defs>
          <linearGradient id="bbStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-amber)" />
          </linearGradient>
          <radialGradient id="heroAmbient" cx="0.72" cy="0.4" r="0.6">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ambient glow */}
        <rect x="0" y="0" width="460" height="340" fill="url(#heroAmbient)" />

        {/* receptor cradle the terminal residue docks into */}
        <g fill="none" stroke="var(--accent)" strokeLinecap="round">
          <path d="M392 108 A42 42 0 0 1 392 192" strokeWidth="2.5" opacity="0.4" />
          <path d="M390 122 A30 30 0 0 1 390 178" strokeWidth="2.5" opacity="0.6" />
        </g>
        {/* bind-pulse at the opening */}
        <circle
          className="hero-bind"
          cx="360"
          cy="150"
          fill="none"
          stroke="var(--accent-amber)"
          strokeWidth="2"
        />

        {/* backbone */}
        <path
          d="M56 150 L126 214 L196 136 L266 210 L346 150"
          fill="none"
          stroke="url(#bbStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
          className="hero-bond"
        />

        {/* residues */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              className="hero-node"
              style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${n.x}px ${n.y}px` }}
              cx={n.x}
              cy={n.y}
              r="22"
              fill={n.c}
              opacity="0.12"
            />
            <circle cx={n.x} cy={n.y} r="11" fill={n.c} opacity="0.95" />
            <circle cx={n.x} cy={n.y} r="11" fill="none" stroke="#fff" strokeOpacity="0.14" />
            <circle cx={n.x} cy={n.y} r="4" fill="var(--surface-deep)" />
            <circle cx={n.x - 3.4} cy={n.y - 3.4} r="2.2" fill="#fff" opacity="0.45" />
          </g>
        ))}
      </svg>
    </div>
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
