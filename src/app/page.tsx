import type { ReactNode } from "react";
import Link from "next/link";

/* ── Peptide hormone families ──────────────────────────────────────────────
   The organizing spine of the reference. Each maps to a future section/hub.
   `href` is set only where a destination genuinely exists today (the sibling
   melanocortin hub); the rest are on-page anchors so nothing 404s. */
const FAMILIES: {
  name: string;
  blurb: string;
  examples: string;
  accent: string;
  href?: string;
}[] = [
  {
    name: "Incretins & metabolic",
    blurb:
      "Glucose-dependent signaling that reshaped obesity and diabetes care.",
    examples: "GLP-1 · GIP · glucagon · amylin · insulin",
    accent: "text-accent",
  },
  {
    name: "Growth & repair",
    blurb:
      "The somatotropic axis and the secretagogues that pulse it.",
    examples: "GH · IGF-1 · GHRH · ghrelin · GHRPs",
    accent: "text-accent-blue",
  },
  {
    name: "Melanocortins",
    blurb:
      "Pigmentation, appetite, inflammation, and sexual function from one receptor family.",
    examples: "α-MSH · MC1R–MC5R · melanotan · setmelanotide",
    accent: "text-accent-amber",
    href: "https://melanocortin.com",
  },
  {
    name: "Neuropeptides",
    blurb:
      "Hypothalamic and posterior-pituitary signals that tune behavior and fluid balance.",
    examples: "oxytocin · vasopressin · CRH · TRH",
    accent: "text-accent-purple",
  },
  {
    name: "Gut & appetite",
    blurb:
      "The enteroendocrine peptides that report on the meal you just ate.",
    examples: "PYY · CCK · secretin · motilin",
    accent: "text-accent-indigo",
  },
  {
    name: "Reproductive & gonadal",
    blurb:
      "Pulsatile control of the reproductive axis, from hypothalamus to gonad.",
    examples: "GnRH · LH · FSH · kisspeptin · hCG",
    accent: "text-accent",
  },
];

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

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}

export default function Home() {
  return (
    <>
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 border-b border-ink/[0.06] bg-surface/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <PeptideMark className="h-6 w-6 text-accent" />
            <span className="font-display text-[15px] font-semibold tracking-tight">
              Peptide<span className="text-ink/40">Hormone</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-ink/60 sm:flex">
            <a href="#families" className="transition-colors hover:text-ink">Families</a>
            <a href="#approach" className="transition-colors hover:text-ink">Approach</a>
            <a
              href="#families"
              className="rounded-full border border-ink/15 px-4 py-1.5 text-ink/90 transition-colors hover:border-accent hover:text-accent"
            >
              Explore
            </a>
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              background:
                "radial-gradient(60% 60% at 75% 0%, rgba(45,212,168,0.16), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgba(96,165,250,0.10), transparent 70%)",
            }}
          />
          <Container className="relative grid items-center gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Research-grade reference · independent
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
                The peptide hormone system,
                <span className="text-accent"> explained from the source.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">
                A clear, sourced reference on the hormones that signal in short
                chains of amino acids — incretins, growth, melanocortins,
                neuropeptides, and the gut–brain axis. Mechanism first. Citations
                always. No products.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#families"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-surface-deep transition-transform hover:-translate-y-0.5"
                >
                  Explore the families
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#approach"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 font-medium text-ink/85 transition-colors hover:border-ink/40"
                >
                  How we work
                </a>
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
                Organized by signaling family
              </h2>
              <p className="mt-4 text-lg leading-8 text-ink/60">
                Peptide hormones are easier to understand as families that share
                receptors, anatomy, and logic. Each is a hub in progress.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {FAMILIES.map((f) => {
                const inner = (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className={`font-display text-lg font-semibold ${f.accent}`}>
                        {f.name}
                      </h3>
                      {f.href && (
                        <span className="text-xs text-ink/40 transition-colors group-hover:text-ink/70">
                          melanocortin.com ↗
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink/65">{f.blurb}</p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink/40">
                      {f.examples}
                    </p>
                  </>
                );
                const cls =
                  "group block bg-surface p-7 transition-colors hover:bg-panel";
                return f.href ? (
                  <a
                    key={f.name}
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={f.name} className={cls}>
                    {inner}
                  </div>
                );
              })}
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

      {/* ── Footer ── */}
      <footer className="border-t border-ink/[0.06] bg-surface-deep">
        <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <PeptideMark className="h-5 w-5 text-accent" />
              <span className="font-display text-sm font-semibold tracking-tight">
                Peptide<span className="text-ink/40">Hormone</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink/45">
              An independent, research-grade reference on the peptide hormone
              system. Educational only — not medical advice, diagnosis, or
              treatment.
            </p>
          </div>
          <div className="flex gap-14 text-sm">
            <div>
              <p className="font-medium text-ink/40">Reference</p>
              <ul className="mt-3 space-y-2 text-ink/65">
                <li><a href="#families" className="hover:text-ink">Families</a></li>
                <li><a href="#approach" className="hover:text-ink">Approach</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-ink/40">Related</p>
              <ul className="mt-3 space-y-2 text-ink/65">
                <li>
                  <a href="https://melanocortin.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                    melanocortin.com ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
        <Container className="border-t border-ink/[0.06] py-6">
          <p className="text-xs text-ink/35">
            © {new Date().getFullYear()} Peptide Hormone · peptidehormone.com
          </p>
        </Container>
      </footer>
    </>
  );
}

/* ── Brand mark: a stylized tri-residue peptide ── */
function PeptideMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="5" cy="9" r="2.4" fill="currentColor" />
      <circle cx="12" cy="15" r="2.4" fill="currentColor" opacity="0.7" />
      <circle cx="19" cy="7" r="2.4" fill="currentColor" opacity="0.45" />
      <path
        d="M6.7 10.4 10.3 13.6M13.7 13.6 17.3 8.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Hero peptide-chain visual ── */
function HeroChain() {
  const nodes = [
    { x: 60, y: 230, c: "var(--accent)" },
    { x: 130, y: 150, c: "var(--accent-blue)" },
    { x: 205, y: 215, c: "var(--accent-indigo)" },
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
