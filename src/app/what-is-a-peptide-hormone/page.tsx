import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { FamilyGlyph } from "@/components/FamilyGlyph";
import { LINK, Section, P, Em, Callout, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { primerLd } from "@/lib/jsonld";
import { HORMONES } from "@/lib/hormones";
import { FAMILIES, accentRGB } from "@/lib/families";

const MOLECULES = HORMONES.length;
const FAMILY_COUNT = FAMILIES.length;

// Lead doubles as the meta description and the snippet an answer engine lifts,
// so it opens with the plain definition before the house voice takes over.
const DESCRIPTION =
  "A peptide hormone is a short chain of amino acids — from three residues to around fifty — that one set of cells releases to signal another. Here is what that means: how they are made, how they work, and the families they fall into.";

// The questions readers actually type, answered in the page body and emitted as
// FAQPage structured data. Answers are self-contained (snippet-ready) and stay
// inside textbook endocrinology — no claim here needs a frontier citation.
const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a peptide hormone?",
    a: "A peptide hormone is a hormone made of a short chain of amino acids — typically from three residues to about fifty — that is released by one group of cells to change the behavior of another. Insulin, glucagon, GLP-1, oxytocin, and growth hormone are all peptide hormones. Being water-soluble, they act on receptors at the cell surface rather than entering the cell.",
  },
  {
    q: "How are peptide hormones made?",
    a: "A gene is transcribed and translated into a larger inactive precursor called a preprohormone. Its signal peptide is removed in the endoplasmic reticulum to give a prohormone, which enzymes called convertases cut at specific sites to release the mature, active peptide. The products are packaged into secretory vesicles and released by exocytosis. One precursor can yield several hormones: proglucagon is cut into GLP-1, glucagon, and GLP-2.",
  },
  {
    q: "How do peptide hormones differ from steroid hormones?",
    a: "Peptide hormones are chains of amino acids and are water-soluble, so they cannot cross the cell membrane and instead bind receptors on the cell surface, triggering fast second-messenger signaling. Steroid hormones are lipid-soluble, cross the membrane, and act on receptors inside the cell to change gene transcription — a slower, longer-lasting effect.",
  },
  {
    q: "What are some examples of peptide hormones?",
    a: "Examples include insulin and glucagon (blood-sugar control), GLP-1 and GIP (the incretins), growth hormone and IGF-1, oxytocin and vasopressin, the melanocortins, PTH and calcitonin, and the natriuretic peptides ANP and BNP. They are usually grouped by the signaling system they belong to.",
  },
];

export const metadata: Metadata = {
  title: "What a peptide hormone is",
  alternates: { canonical: "/what-is-a-peptide-hormone" },
  description: DESCRIPTION,
  openGraph: {
    title: "What a peptide hormone is · Peptide Hormone",
    description:
      "The plain definition, how peptide hormones are synthesized from a preprohormone, how they signal at the cell surface, and the families they fall into.",
  },
};

export default function WhatIsAPeptideHormone() {
  return (
    <>
      <JsonLd
        data={primerLd({
          path: "/what-is-a-peptide-hormone",
          name: "What a peptide hormone is",
          description: DESCRIPTION,
          topic: {
            name: "Peptide hormone",
            sameAs: [
              "https://en.wikipedia.org/wiki/Peptide_hormone",
              "https://www.wikidata.org/wiki/Q416997",
            ],
          },
          faqs: FAQS,
        })}
      />
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Header ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <p className="font-mono text-xs uppercase tracking-wide text-accent">The primer</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              What a peptide hormone actually is
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">{DESCRIPTION}</p>
          </Container>
        </section>

        <Container className="max-w-3xl py-14 md:py-18">
          <article className="space-y-12">
            <Section title="The short version">
              <P>
                <Em>A peptide hormone is a short chain of amino acids — from three
                residues to around fifty — that one set of cells releases to change
                what another set of cells does.</Em> That is the whole definition.
                Insulin, glucagon, <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link>,
                oxytocin, growth hormone: all of them are a handful of amino acids,
                strung in a specific order, carrying a specific instruction.
              </P>
              <P>
                The order is the message. Change one residue and you can change the
                receptor it fits, how long it lasts, or whether it says anything at
                all. And because they are built from amino acids rather than fat,
                peptide hormones are water-soluble — which, as it turns out, decides
                almost everything about how they work.
              </P>
            </Section>

            <Section title="How a peptide hormone is made">
              <P>
                A peptide hormone is not translated in its final form. The gene is
                read into a longer, inactive precursor called a{" "}
                <Link href="/glossary#preprohormone" className={LINK}>preprohormone</Link>.
                A leading <Em>signal peptide</Em> routes it into the endoplasmic
                reticulum and is then clipped off, leaving a <Em>prohormone</Em>.
                Enzymes called convertases cut the prohormone at specific sites to
                release the mature, active peptide, which is packaged into vesicles
                and released on demand by exocytosis.
              </P>
              <P>
                The clever part is that one precursor can carry several messages. The
                same proglucagon chain is cut one way in the pancreas to make{" "}
                <Link href="/hormones/glucagon" className={LINK}>glucagon</Link> and
                another way in the gut to make <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link>
                {" "}— same source, different scissors, different hormone.
              </P>
              <BiosynthesisFigure />
            </Section>

            <Section title="How peptide hormones work">
              <P>
                Water-solubility is the fork in the road. A peptide hormone cannot
                slip through the fatty cell membrane, so it never goes inside the
                cell. Instead it docks onto a receptor on the <Em>surface</Em> —
                usually a <Link href="/glossary#gpcr" className={LINK}>G-protein-coupled
                receptor</Link> — which relays the message inward through
                second messengers like cAMP. The effect is fast, and it is meant to be
                brief: most peptide hormones are taken apart within minutes, on purpose,
                so the next instruction can differ from the last.
              </P>
              <P>
                This is exactly where a steroid hormone diverges. Steroids are
                lipid-soluble, so they cross the membrane, bind receptors{" "}
                <Em>inside</Em> the cell, and change which genes are transcribed — a
                slower, longer-lasting kind of instruction. Same word, &ldquo;hormone&rdquo;;
                two entirely different mechanisms. That short half-life is also why the
                native molecules make poor drugs, and why so much of the modern field
                is engineering around it — the subject of{" "}
                <Link href="/insights/peptide-half-life-engineering" className={LINK}>
                  two minutes to seven days
                </Link>.
              </P>
              <Callout label="The one-line version">
                A peptide hormone is a water-soluble amino-acid chain that signals from
                the cell surface, fast and briefly. A steroid is a lipid-soluble
                molecule that signals from inside the cell, slow and long. Everything
                else follows from that.
              </Callout>
            </Section>

            <Section title="Examples of peptide hormones, by family">
              <P>
                There are dozens, and they are easiest to hold in mind grouped by the
                signaling system they belong to. Across this reference that is{" "}
                {MOLECULES} molecules in {FAMILY_COUNT} families — here is the whole
                map, each opening onto the molecules that matter and the evidence
                behind them.
              </P>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {FAMILIES.map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/families/${f.slug}`}
                      className="group flex h-full items-start gap-3.5 bg-surface p-5 transition-colors hover:bg-panel"
                    >
                      <span
                        className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${f.accent}`}
                        style={{ backgroundColor: `rgba(${accentRGB(f.accent)}, 0.12)` }}
                      >
                        <FamilyGlyph slug={f.slug} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className={`font-display text-[15px] font-semibold ${f.accent}`}>
                          {f.name}
                        </span>
                        <span className="mt-1 block font-mono text-[11px] uppercase tracking-wide text-ink/40">
                          {f.examples}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-2.5 text-[15px] leading-7">
                <CrossLink href="/catalog" label="Browse the full catalog — every molecule, graded and cross-linked" />
                <CrossLink href="/glossary" label="Glossary — the vocabulary of peptide signaling, defined" />
                <CrossLink href="/why-peptides" label="Why peptides — the body's own signaling language, and the engineering rewriting it" />
              </ul>
            </Section>

            <Section title="Common questions">
              <dl className="space-y-3">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <p className="font-display text-base font-semibold">Education, not a protocol</p>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                This page explains what peptide hormones are and how they work. It is
                not medical advice and not a recommendation to take anything. For how
                this reference is sourced, graded, and bounded, see{" "}
                <Link href="/methodology" className="text-accent hover:underline">
                  methodology &amp; standards
                </Link>
                .
              </p>
            </div>
          </article>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}

/* ── Biosynthesis figure ─────────────────────────────────────────────────────
   The maturation a peptide hormone goes through before it can signal:
   preprohormone → (signal peptide removed) → prohormone → (convertases cut) →
   active peptides. Worked with proglucagon, the catalog's own example, so the
   fragments link back to real monographs. Pure inline SVG with theme CSS vars so
   it renders dark-native and honors the surrounding type scale. */
function BiosynthesisFigure() {
  return (
    <figure className="mt-8 rounded-2xl border border-ink/10 bg-surface-deep/60 p-6">
      <svg viewBox="0 0 720 250" className="w-full" role="img" aria-label="How a peptide hormone matures: a preprohormone loses its signal peptide to become a prohormone, which convertases cut into the active peptides — shown with proglucagon yielding GLP-1, glucagon, and GLP-2.">
        <defs>
          <marker id="bioArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--ink)" fillOpacity="0.35" />
          </marker>
        </defs>

        {/* Stage 1 — preprohormone (signal peptide + prohormone chain) */}
        <text x="40" y="38" className="fill-current" style={{ fontSize: 12, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }} fill="var(--ink)" fillOpacity="0.45">
          1 · PREPROHORMONE
        </text>
        <rect x="40" y="48" width="110" height="32" rx="6" fill="var(--accent-amber)" fillOpacity="0.22" stroke="var(--accent-amber)" strokeOpacity="0.5" />
        <text x="95" y="68" textAnchor="middle" style={{ fontSize: 11 }} fill="var(--ink)" fillOpacity="0.8">signal</text>
        <rect x="154" y="48" width="526" height="32" rx="6" fill="var(--ink)" fillOpacity="0.08" stroke="var(--ink)" strokeOpacity="0.14" />
        <text x="417" y="68" textAnchor="middle" style={{ fontSize: 12 }} fill="var(--ink)" fillOpacity="0.7">proglucagon chain</text>

        {/* Arrow 1 */}
        <line x1="360" y1="90" x2="360" y2="110" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.5" markerEnd="url(#bioArrow)" />
        <text x="372" y="104" style={{ fontSize: 11 }} fill="var(--ink)" fillOpacity="0.5">signal peptide removed (in the ER)</text>

        {/* Stage 2 — prohormone */}
        <text x="154" y="130" className="fill-current" style={{ fontSize: 12, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }} fill="var(--ink)" fillOpacity="0.45">
          2 · PROHORMONE
        </text>
        <rect x="154" y="140" width="526" height="32" rx="6" fill="var(--ink)" fillOpacity="0.08" stroke="var(--ink)" strokeOpacity="0.14" />
        <text x="417" y="160" textAnchor="middle" style={{ fontSize: 12 }} fill="var(--ink)" fillOpacity="0.7">proglucagon</text>

        {/* Arrow 2 */}
        <line x1="417" y1="182" x2="417" y2="200" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.5" markerEnd="url(#bioArrow)" />
        <text x="429" y="196" style={{ fontSize: 11 }} fill="var(--ink)" fillOpacity="0.5">convertases cut at paired basic residues</text>

        {/* Stage 3 — active peptides */}
        <text x="40" y="222" className="fill-current" style={{ fontSize: 12, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }} fill="var(--ink)" fillOpacity="0.45">
          3 · ACTIVE PEPTIDES
        </text>
        <g>
          <rect x="222" y="206" width="140" height="30" rx="6" fill="var(--accent-teal)" fillOpacity="0.22" stroke="var(--accent-teal)" strokeOpacity="0.6" />
          <text x="292" y="225" textAnchor="middle" style={{ fontSize: 12 }} fill="var(--ink)" fillOpacity="0.85">GLP-1</text>
          <rect x="372" y="206" width="140" height="30" rx="6" fill="var(--accent-amber)" fillOpacity="0.22" stroke="var(--accent-amber)" strokeOpacity="0.6" />
          <text x="442" y="225" textAnchor="middle" style={{ fontSize: 12 }} fill="var(--ink)" fillOpacity="0.85">glucagon</text>
          <rect x="522" y="206" width="140" height="30" rx="6" fill="var(--accent-blue)" fillOpacity="0.22" stroke="var(--accent-blue)" strokeOpacity="0.6" />
          <text x="592" y="225" textAnchor="middle" style={{ fontSize: 12 }} fill="var(--ink)" fillOpacity="0.85">GLP-2</text>
        </g>
      </svg>
      <figcaption className="mt-4 border-t border-ink/[0.06] pt-4 text-sm leading-6 text-ink/55">
        One gene, one precursor, several hormones. Proglucagon is cut one way in the
        pancreatic alpha cell to release glucagon, and another in the intestinal
        L-cell to release GLP-1 and GLP-2 — which is why the same chain can both
        raise and lower the body&rsquo;s response to a meal.
      </figcaption>
    </figure>
  );
}
