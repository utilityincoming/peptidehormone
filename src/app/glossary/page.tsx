import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { glossaryLd } from "@/lib/jsonld";
import { GLOSSARY, ALL_TERMS, type GlossaryTerm } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  alternates: { canonical: "/glossary" },
  description:
    "A plain-language glossary of peptide science — receptors, agonists, pharmacokinetics, and the molecule classes this reference is built on. Every term defined, and linked to its record in the wider knowledge graph.",
  openGraph: {
    title: "Glossary · Peptide Hormone",
    description:
      "The vocabulary of the peptide hormone system — receptors, pharmacokinetics, and molecule classes — defined in plain language.",
  },
};

const groupId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function TermRow({ t }: { t: GlossaryTerm }) {
  return (
    <div
      id={t.slug}
      className="scroll-mt-24 border-t border-ink/[0.06] py-6 first:border-t-0 sm:grid sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-8"
    >
      <dt className="mb-2 sm:mb-0">
        <a href={`#${t.slug}`} className="group inline-flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-ink">{t.term}</span>
          {t.abbr && <span className="font-mono text-xs text-ink/45">{t.abbr}</span>}
          <span className="text-ink/0 transition-colors group-hover:text-ink/25" aria-hidden>#</span>
        </a>
        {t.aka && t.aka.length > 0 && (
          <p className="mt-1 text-xs leading-5 text-ink/40">also {t.aka.join(", ")}</p>
        )}
      </dt>
      <dd className="min-w-0">
        <p className="text-[15px] leading-7 text-ink/75">{t.def}</p>
        {(t.see?.length || t.wikipedia) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
            {t.see?.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="inline-flex items-center gap-1 text-accent transition-transform hover:translate-x-0.5"
              >
                {s.label} <span aria-hidden>→</span>
              </Link>
            ))}
            {t.wikipedia && (
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(t.wikipedia.replace(/ /g, "_"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-ink/45 transition-colors hover:text-ink/75"
              >
                Wikipedia <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        )}
      </dd>
    </div>
  );
}

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={glossaryLd()} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Header ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {ALL_TERMS.length} terms, defined
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">Glossary</h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">
              The working vocabulary of the peptide hormone system — what a receptor
              reads, how an agonist differs from a blocker, why a half-life is measured
              in minutes or days. Every term is defined here in plain language, and the
              ones that name a broader concept link out to their record in the wider
              knowledge graph.
            </p>
          </Container>
        </section>

        <Container className="max-w-3xl py-14 md:py-18">
          {/* Jump nav */}
          <nav aria-label="Glossary sections" className="mb-12 flex flex-wrap gap-2">
            {GLOSSARY.map((g) => (
              <a
                key={g.name}
                href={`#${groupId(g.name)}`}
                className="rounded-full border border-ink/12 bg-panel/40 px-3.5 py-1.5 text-sm text-ink/65 transition-colors hover:border-accent/40 hover:text-accent"
              >
                {g.name}
              </a>
            ))}
          </nav>

          <div className="space-y-14">
            {GLOSSARY.map((g) => (
              <section key={g.name} id={groupId(g.name)} className="scroll-mt-24">
                <div className="border-b border-ink/10 pb-4">
                  <h2 className="font-display text-2xl font-semibold">{g.name}</h2>
                  <p className="mt-1.5 text-sm leading-6 text-ink/50">{g.blurb}</p>
                </div>
                <dl className="mt-2">
                  {g.terms.map((t) => (
                    <TermRow key={t.slug} t={t} />
                  ))}
                </dl>
              </section>
            ))}
          </div>

          {/* Cross-links */}
          <div className="mt-16 rounded-2xl border border-ink/10 bg-panel/40 p-6">
            <h3 className="font-display text-base font-semibold">Put the vocabulary to work</h3>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <li>
                <Link href="/catalog" className="inline-flex items-center gap-1 text-accent hover:translate-x-0.5">
                  Browse the catalog <span aria-hidden>→</span>
                </Link>
              </li>
              <li>
                <Link href="/insights" className="inline-flex items-center gap-1 text-accent hover:translate-x-0.5">
                  Insights — the longer arguments <span aria-hidden>→</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/half-life" className="inline-flex items-center gap-1 text-accent hover:translate-x-0.5">
                  Half-life calculator <span aria-hidden>→</span>
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="inline-flex items-center gap-1 text-accent hover:translate-x-0.5">
                  How we grade evidence <span aria-hidden>→</span>
                </Link>
              </li>
            </ul>
          </div>

          <p className="mt-10 text-xs leading-5 text-ink/40">
            Educational reference only — not medical advice. Definitions summarize public
            scientific usage and may simplify active areas of research.
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
