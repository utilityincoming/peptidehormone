import Link from "next/link";
import { FAMILIES } from "@/lib/families";
import { Container, SiteHeader, SiteFooter } from "@/components/site";

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "Sourced, not asserted",
    body: "Every mechanism traces to primary literature, structural data, and registered trials — cited, not paraphrased into authority.",
  },
  {
    title: "Research-grade, not medical",
    body: "Reference material for understanding the biology. Nothing here is medical advice, a recommendation, or a substitute for a clinician.",
  },
  {
    title: "Independent",
    body: "No products, no storefront, no sponsored conclusions. The incentive is to be correct, not to sell.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
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
                that matter, and the evidence behind them — citation-grounded,
                with a research agent and pharmacokinetic tools.
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
                  href="/research"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 font-medium text-ink/85 transition-colors hover:border-ink/40"
                >
                  Ask the research agent
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <HeroChain />
            </div>
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
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {FAMILIES.map((f) => (
                <Link
                  key={f.slug}
                  href={`/families/${f.slug}`}
                  className="group block bg-surface p-7 transition-colors hover:bg-panel"
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`font-display text-lg font-semibold ${f.accent}`}>
                      {f.name}
                    </h3>
                    <span
                      className="text-ink/30 transition-all group-hover:translate-x-0.5 group-hover:text-ink/70"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{f.blurb}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink/40">
                    {f.examples}
                  </p>
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
                A reference you can trust the edges of
              </h2>
              <p className="mt-4 max-w-md text-lg leading-8 text-ink/60">
                The peptide space is loud with marketing and thin on rigor. This
                is the opposite: built to be checked.
              </p>
            </div>
            <div className="space-y-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="bg-surface p-7">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{p.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/* ── Hero peptide-chain visual ── */
function HeroChain() {
  const nodes = [
    { x: 60, y: 230, c: "var(--accent)" },
    { x: 130, y: 150, c: "var(--accent-blue)" },
    { x: 205, y: 215, c: "var(--accent-teal)" },
    { x: 270, y: 120, c: "var(--accent-purple)" },
    { x: 335, y: 185, c: "var(--accent-amber)" },
    { x: 395, y: 95, c: "var(--accent)" },
  ];
  return (
    <div className="hero-float">
      <svg viewBox="0 0 440 320" className="w-full" role="img" aria-label="Stylized peptide chain">
        <path
          d="M60 230 L130 150 L205 215 L270 120 L335 185 L395 95"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
          className="hero-bond"
        />
        {nodes.map((n, i) => (
          <g key={i} className="hero-node" style={{ animationDelay: `${i * 0.5}s` }}>
            <circle cx={n.x} cy={n.y} r="22" fill={n.c} opacity="0.12" />
            <circle cx={n.x} cy={n.y} r="11" fill={n.c} opacity="0.9" />
            <circle cx={n.x} cy={n.y} r="4" fill="var(--surface-deep)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
