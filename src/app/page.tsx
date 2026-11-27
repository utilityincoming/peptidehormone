import Link from "next/link";
import { FAMILIES, getFamily } from "@/lib/families";
import { INSIGHTS } from "@/lib/insights";
import { homeReading } from "@/lib/home-reading";
import styles from "./home.module.css";
import { HORMONES, getHormone, halfLifeForLink } from "@/lib/hormones";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { FamilyGlyph } from "@/components/FamilyGlyph";
import { HomeReadingPlate } from "@/components/HomeReadingPlate";
import { ToolPreview, shortHalfLife, type ToolPreviewKind } from "@/components/home";
import HeroTimeline, { type TimelineSeries } from "@/components/HeroTimeline";
import { StructureHero } from "@/components/StructureHero";
import { OxytocinBindingPreview, SequenceSignalHero } from "@/components/SequenceSignalHero";
import { compoundTierClasses, regulatoryClasses } from "@/components/evidence";
import { regulatoryFor, regulatoryMeta, REGULATORY_AS_OF, formatAsOf } from "@/lib/regulatory";
import { AffiliateLink, CopyCode } from "@/components/AffiliateLink";
import { getVendor } from "@/lib/affiliate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Look up a peptide hormone, follow its receptor, and see how far the human evidence goes. Native hormones, engineered analogs, and the papers behind them. Not medical advice.",
};

// Short card copy; article introductions remain unchanged.
const HOME_SUMMARIES: Record<string, string> = {
  "two-residues-apart": "Oxytocin and vasopressin differ by just two amino acids. How small sequence changes separate reproductive signaling from water balance — and why their clinical evidence differs.",
  "the-fat-hormone-that-falls-as-fat-rises": "Adiponectin links fat tissue to metabolism. Why a strong disease association has not translated into a replacement medicine.",
  "the-neuron-behind-the-hot-flash": "Kisspeptin, neurokinin B, and dynorphin connect reproductive pulses to temperature regulation. Follow the mechanism from neuron to clinical test.",
  "the-gene-the-parents-fight-over": "IGF-2 and genomic imprinting: how parental gene expression shapes growth, and what happens when that regulation changes.",
  "glp-1-signaling": "How GLP-1 links a meal to insulin release: the receptor, the intracellular signal, and why glucose matters.",
  "the-note-without-the-incretin": "Eloralintide targets amylin receptors rather than GLP-1. What its molecular design and human trials show — and what tolerability claims still need to prove.",
  "glp-1-in-a-pill": "Two routes to an oral GLP-1 drug: help a peptide cross the gut barrier, or activate the receptor with a small molecule.",
  "the-triple-agonist": "Retatrutide activates three receptors. Read the trial results, the difference between headline estimates, and its investigational status.",
  "glp-1-muscle-preservation": "Why weight loss can include muscle, and what the evidence says about preserving it — from established measures to investigational combinations.",
};

const PRINCIPLES: { icon: PrincipleName; title: string; body: string }[] = [
  {
    icon: "sourced",
    title: "Sourced, not asserted",
    body: "Monographs and explainers link to primary literature, structural data, and trial records so you can check the evidence and its limits.",
  },
  {
    icon: "research",
    title: "Research-grade, not medical",
    body: "Reference material for understanding the biology. Nothing here is medical advice, a recommendation, or a substitute for a clinician.",
  },
  {
    icon: "independent",
    title: "How this is funded",
    body: "Affiliate commissions help fund this reference. See our methodology for details on funding and editorial independence.",
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
      "Model elimination from a half-life and a dose interval. An estimate of concentration, not of how long an effect lasts.",
    accent: "text-accent",
    preview: "half-life",
  },
  {
    href: "/tools/compare",
    tag: "Structure–activity",
    name: "Analog comparison",
    blurb:
      "Put a native hormone beside the analogs engineered from it — receptor, weight, half-life, and evidence tier on one axis.",
    accent: "text-accent",
    preview: "compare",
  },
  {
    href: "/tools/cycle-planner",
    tag: "Protocol planning",
    name: "Cycle planner",
    blurb:
      "Lay out a week-by-week research timeline from a goal. Doses are the monograph figures, not a protocol.",
    accent: "text-accent",
    preview: "cycle",
  },
];

// At-a-glance coverage — counts driven from the data so they never drift.
// The page is a server component, so the large HORMONES array stays server-side.
const STATS: { n: string; label: string }[] = [
  { n: `${HORMONES.length}`, label: "molecules in the catalog" },
  { n: `${FAMILIES.length}`, label: "signaling families" },
  { n: `${INSIGHTS.length}`, label: "essays" },
  { n: "3", label: "calculators" },
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
  const sourcingVendor = getVendor("aminoclub");
  const series = lineageSeries();
  const frontier = getHormone("retatrutide");
  const frontierReg = regulatoryFor("retatrutide");
  const frontierLink = frontier?.halfLifeMin ? halfLifeForLink(frontier.halfLifeMin) : undefined;
  const [lead, ...rest] = homeReading();
  const leadFamily = lead ? getFamily(lead.family) : undefined;
  return (
    <>
      <SiteHeader />

      <main id="main" tabIndex={-1} className={`${styles.atlas} flex-1 outline-none`}>
        {/* ── Hero ── */}
        <section className={styles.hero} aria-labelledby="atlas-title">
          <Container className="grid items-center gap-8 py-9 md:py-12 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <div>
              <h1 id="atlas-title" className={styles.title}>
                Peptide hormones, from sequence to evidence.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-7 text-secondary">
                Find native peptide hormones and their analogs. See which receptors
                they act on and what human studies have found.
              </p>
              <form action="/search" method="get" role="search" aria-label="Molecule lookup" className="mt-6 max-w-lg">
                <label htmlFor="home-molecule-query" className="mb-2 block text-sm font-medium">
                  Look up a molecule
                </label>
                <div className="flex gap-2">
                  <input
                    id="home-molecule-query"
                    name="q"
                    type="search"
                    required
                    placeholder="e.g. oxytocin"
                    className="h-12 min-w-0 flex-1 rounded border border-ink/20 bg-panel px-3 text-base placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent"
                  />
                  <button className="h-12 rounded bg-accent px-4 font-medium text-surface hover:bg-accent/90">
                    Search
                  </button>
                </div>
              </form>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-accent">
                <Link href="/catalog" className="hover:underline">Browse all molecules <span aria-hidden>→</span></Link>
                <a href="#families" className="hover:underline">Browse signaling families <span aria-hidden>↓</span></a>
              </div>
              <p className="mt-4 text-sm text-secondary">
                New to the subject?{" "}
                <Link href="/what-is-a-peptide-hormone" className="underline underline-offset-2 hover:text-accent">
                  What is a peptide hormone?
                </Link>
              </p>
            </div>

            <figure className={`${styles.specimen} hidden lg:block`}>
              <figcaption className="mb-3 font-display text-xl font-medium">Oxytocin, from sequence to signal</figcaption>
              <OxytocinBindingPreview />
              <a href="#oxytocin-figure" className={styles.specimenLink}>
                See the sequence and sources <span aria-hidden>↓</span>
              </a>
            </figure>
          </Container>
        </section>

        {/* ── Families ── */}
        <section id="families" className={`${styles.families} border-b border-ink/[0.06] py-14 md:py-16`}>
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                Twelve signaling families
              </h2>
              <p className="mt-4 text-lg leading-8 text-secondary">
                Browse by biological system to find related hormones and their analogs.
              </p>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {FAMILIES.map((f) => (
                <Link
                  key={f.slug}
                  href={`/families/${f.slug}`}
                  className="group block bg-surface p-7 transition-colors hover:bg-panel"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-[4px] ${f.accent}`}
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
                  <p className="mt-2 text-sm leading-6 text-secondary">{f.blurb}</p>
                  <p className="mt-4 text-xs font-medium text-muted">
                    {f.examples}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section id="oxytocin-figure" aria-labelledby="oxytocin-title" className="border-b border-ink/[0.06] py-12">
          <Container>
            <div className={`${styles.specimen} mx-auto max-w-2xl`}>
              <h2 id="oxytocin-title" className="mb-4 font-display text-2xl font-medium">
                Oxytocin, from sequence to signal
              </h2>
              <SequenceSignalHero />
              <Link href="/hormones/oxytocin" className={styles.specimenLink}>
                Explore oxytocin <span aria-hidden>→</span>
              </Link>
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
                <div className="mt-1.5 text-sm text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </Container>
        </section>

        {/* ── Insights rail ── */}
        <section id="insights" className="border-b border-ink/[0.06] py-20 md:py-24">
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                Essays that start from the paper
              </h2>
              <p className="mt-4 text-lg leading-8 text-secondary">
                Each essay follows one molecule or one question back to the receptor,
                the signal, and the human evidence.
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
                className="group mt-12 grid overflow-hidden rounded-[4px] border border-ink/10 bg-surface transition-colors hover:bg-panel md:grid-cols-[1.1fr_1fr]"
              >
                <HomeReadingPlate slug={lead.slug} className="aspect-[16/9] md:aspect-auto md:min-h-72" />
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-medium ${leadFamily?.accent ?? "text-accent"}`}
                    >
                      {leadFamily?.name ?? "Peptide science"}
                    </span>
                    <span className="font-mono text-[11px] text-secondary">
                      {lead.readingMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                    {lead.title}
                  </h3>
                  <p className="mt-3 leading-7 text-secondary">{HOME_SUMMARIES[lead.slug] ?? lead.dek}</p>
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
                    className="group flex flex-col overflow-hidden rounded-[4px] border border-ink/10 bg-surface transition-colors hover:bg-panel"
                  >
                    <HomeReadingPlate slug={post.slug} className="aspect-[16/9]" />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`text-xs font-medium ${fam?.accent ?? "text-accent"}`}
                        >
                          {fam?.name ?? "Peptide science"}
                        </span>
                        <span className="font-mono text-[11px] text-secondary">
                          {post.readingMinutes} min
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-secondary">
                        {HOME_SUMMARIES[post.slug] ?? post.dek}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        <section aria-label="Featured explainer" className="bg-panel/40 border-b border-ink/[0.06] py-16 md:py-20">
          <Container>
            {/* ── Lead figure: from a two-minute hormone to three receptors ── */}
            <figure>
              <figcaption className="max-w-3xl">
                <p className="text-xs font-medium text-accent">
                  Featured explainer
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                  From minutes to days. From one receptor to three.
                </h2>
                <p className="mt-3 text-base leading-7 text-secondary">
                  Native GLP-1 clears in minutes. Semaglutide lasts about a week.
                  Tirzepatide adds the GIP receptor; retatrutide also activates
                  glucagon. Drag across two weeks to compare one modeled dose.
                </p>
              </figcaption>

              <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
                <div>
                  <p className="text-sm text-plate-gold">Retatrutide at three receptors</p>
                  <StructureHero />
                </div>
                <HeroTimeline series={series} />
              </div>

              {frontier && frontierReg && (
                <div className="mt-4 rounded-[4px] border border-plate-gold/40 bg-plate-gold/[0.06] p-4 text-sm leading-6 text-ink/75 sm:p-5">
                  <p>
                    <span className="font-medium text-plate-gold">
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

              <p className="mt-4 text-xs leading-5 text-secondary">
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

        {/* ── Tools band ── */}
        <section id="tools" className="bg-panel/40 border-b border-ink/[0.06] py-20 md:py-24">
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                Check a half-life before you trust a claim
              </h2>
              <p className="mt-4 text-lg leading-8 text-secondary">
                In-browser estimates from the numbers on each monograph. No account.
                Not dosing advice.
              </p>
              <Link
                href="/tools"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:translate-x-0.5"
              >
                All tools &amp; calculators
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {HOME_TOOLS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group block bg-surface p-7 transition-colors hover:bg-panel"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-medium ${t.accent}`}
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
                  <p className="mt-2 text-sm leading-6 text-secondary">{t.blurb}</p>
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
                Follow the mechanism.
                <span className="text-accent"> Question the claim.</span>
              </h2>
              <p className="mt-4 max-w-md text-lg leading-8 text-secondary">
                Peptide engineering is changing what a hormone can do and how long
                it can last. That deserves attention, not a free pass. Our evidence
                labels distinguish established findings from investigational and
                preclinical work; approval status is tracked separately. A receptor
                mechanism can explain a hypothesis. It cannot, by itself, prove a
                clinical benefit.
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
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-ink"
                >
                  Why this exists
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
            <div>
              <div className="space-y-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10">
                {PRINCIPLES.map((p) => (
                  <div key={p.title} className="bg-surface p-7">
                    <PrincipleIcon name={p.icon} className="h-6 w-6 text-accent" />
                    <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-secondary">{p.body}</p>
                  </div>
                ))}
              </div>

            </div>
          </Container>
        </section>

        {sourcingVendor && (
          <aside aria-labelledby="home-sourcing-title" className={styles.sourcing}>
            <Container>
              <div className={styles.sourcingCard}>
                <div className={styles.sourcingCopy}>
                  <h2 id="home-sourcing-title" className={styles.sourcingTitle}>
                    {sourcingVendor.name} research catalog
                  </h2>
                  <p className={styles.sourcingIntro}>
                    Our research supply partner for lab materials, with product specifications and testing information in one place.
                  </p>
                  <p className={styles.sourcingDisclosure}>Research use only.</p>
                </div>
                <div className={styles.sourcingActions}>
                  <p id="home-sourcing-disclosure" className={styles.sourcingAffiliateLabel}>Paid affiliate link</p>
                  <AffiliateLink
                    href={sourcingVendor.home}
                    vendor={sourcingVendor.key}
                    surface="home"
                    describedBy="home-sourcing-disclosure"
                    className={styles.sourcingCta}
                  >
                    Browse {sourcingVendor.name} <span className="sr-only">(opens in a new tab)</span>
                    <span aria-hidden>→</span>
                  </AffiliateLink>
                  {sourcingVendor.code && (
                    <div className={styles.sourcingCode}>
                      <span>Checkout code</span>
                      <CopyCode code={sourcingVendor.code} className={styles.sourcingCodeButton} />
                    </div>
                  )}
                </div>
                <Link href={`/available/${sourcingVendor.key}`} className={styles.sourcingDetails}>
                  About our {sourcingVendor.name} partnership <span aria-hidden>→</span>
                </Link>
              </div>
            </Container>
          </aside>
        )}
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
