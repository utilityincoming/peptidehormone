import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink, Term } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-receptor-outlived-the-drug")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What Is Calcitonin? The Hormone, Its Faded Osteoporosis Drug, and How Its Receptor Became the Amylin Receptor — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each claim stays checkable.
const REF = {
  physiology: "https://pubmed.ncbi.nlm.nih.gov/10519914/", // Sexton, Findlay, Martin — Curr Med Chem 1999: calcitonin review
  ema: "https://www.ema.europa.eu/en/medicines/human/referrals/calcitonin", // EMA 2012 Article 31 referral, cancer-risk review
  mtc: "https://pubmed.ncbi.nlm.nih.gov/36651167/", // Censi, Manso, Mian — Eur J Endocrinol 2023: MTC markers
  amylinRx: "https://pubmed.ncbi.nlm.nih.gov/35324283/", // Cao et al. — Science 2022: amylin receptor = CTR + RAMP
  iuphar: "https://pubmed.ncbi.nlm.nih.gov/12037140/", // Poyner et al. — Pharmacol Rev 2002: CGRP/amylin/calcitonin receptor nomenclature
  dacra: "https://pubmed.ncbi.nlm.nih.gov/36242844/", // Larsen et al. — Biomed Pharmacother 2022: DACRAs, cagrilintide
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd() and mirrored in the visible block.
const FAQS = [
  {
    q: "What does calcitonin do?",
    a: "Calcitonin is a hormone made by the C-cells of the thyroid. It lowers blood calcium, mainly by inhibiting osteoclasts — the cells that dissolve bone — so it is often described as the counterpart of parathyroid hormone (PTH), which raises calcium. In everyday human physiology its role is relatively minor, which is part of why its drug story is complicated.",
  },
  {
    q: "Is calcitonin still used as a drug?",
    a: "Rarely, and not for osteoporosis in Europe. Salmon calcitonin nasal spray for post-menopausal osteoporosis was found to have only modest benefit, and a 2012 European review found a small excess of cancer with long-term use, after which the osteoporosis nasal spray was told it should no longer be used. Injectable calcitonin is limited to narrow indications such as Paget's disease, acute immobilization bone loss and cancer-related high calcium.",
  },
  {
    q: "How is the calcitonin receptor related to the amylin receptor?",
    a: "The amylin receptor is not a separate protein — it is the calcitonin receptor combined with a RAMP (receptor-activity-modifying protein). The same core receptor, paired with one of three RAMPs, becomes an amylin receptor. So drugs acting at the amylin receptor are, in part, acting through calcitonin's own receptor.",
  },
  {
    q: "What are dual amylin and calcitonin receptor agonists (DACRAs)?",
    a: "DACRAs are drugs designed to activate both the amylin receptor and the calcitonin receptor, because those receptors share the same core. They are being developed for obesity and metabolic disease; cagrilintide — the amylin analog paired with semaglutide in CagriSema — is described as a DACRA. Calcitonin's receptor, in other words, is back at the center of metabolic pharmacology.",
  },
  {
    q: "Why is calcitonin measured in blood tests?",
    a: "Serum calcitonin is the established tumor marker for medullary thyroid carcinoma (MTC), a cancer of the same C-cells that make the hormone. A high calcitonin level can signal the disease and is used to follow it after treatment. This diagnostic use has outlasted calcitonin's career as a therapy.",
  },
];

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Header ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(94,168,250,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/calcium-bone" className="text-accent-blue hover:text-ink">
                Calcium &amp; bone
              </Link>
            </nav>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {insight.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">{insight.dek}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink/40">
              {insight.readingMinutes} min read · reviewed {insight.reviewed}
            </p>
          </Container>
        </section>

        <Container className="max-w-3xl py-14 md:py-18">
          <article className="space-y-12">
            <Section title="A hormone with a tidy job">
              <P>
                <Link href="/hormones/calcitonin" className={LINK}>Calcitonin</Link> is one of
                the easiest hormones to summarize. It is made by the C-cells of the thyroid,
                and it lowers blood calcium — chiefly by restraining the osteoclasts that
                dissolve bone (
                <a href={REF.physiology} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sexton et&nbsp;al., Curr&nbsp;Med&nbsp;Chem, 1999
                </a>
                ). Set it beside{" "}
                <Link href="/hormones/pth" className={LINK}>parathyroid hormone</Link>, which
                raises calcium, and you have a tidy opposing pair: one hormone that pushes
                calcium up, one that pulls it down.
              </P>
              <P>
                That symmetry is a little misleading. In adult humans calcitonin&rsquo;s
                day-to-day role in calcium balance is modest — people without a thyroid,
                and people with sky-high calcitonin from a tumor, don&rsquo;t have badly
                deranged calcium. The hormone with the cleanest textbook job turns out to be
                a minor player in the body that makes it, and that tension runs right through
                its history as a drug.
              </P>
              <Callout label="Where it still earns its keep clinically">
                Calcitonin&rsquo;s most durable medical use isn&rsquo;t as a treatment at all
                — it is a <Em>blood test</Em>. Serum calcitonin is the established tumor marker
                for medullary thyroid carcinoma, a cancer of the same C-cells that make it (
                <a href={REF.mtc} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Censi et&nbsp;al., Eur&nbsp;J&nbsp;Endocrinol, 2023
                </a>
                ). The measurement has outlasted the medicine.
              </Callout>
            </Section>

            <Section title="The drug that faded">
              <P>
                For a while the clean story made a clean drug. Salmon calcitonin — more potent
                at the human receptor than the human hormone — was given for post-menopausal
                osteoporosis, eventually as a convenient nasal spray. The pitch was
                straightforward: calcitonin brakes bone breakdown, osteoporosis is too much
                bone breakdown, so brake it.
              </P>
              <P>
                The benefit never matched the tidiness. Its effect on fracture risk proved
                modest, and in 2012 a European Medicines Agency review weighed that thin
                benefit against a safety signal that had accumulated across long-term trials:
                a small but consistent <Em>excess of cancer</Em> in patients on calcitonin
                versus placebo — on the order of 0.7% on the oral form and 2.4% on the nasal
                spray (
                <a href={REF.ema} target="_blank" rel="noopener noreferrer" className={LINK}>
                  EMA Article&nbsp;31 referral, 2012
                </a>
                ). The conclusion was blunt: the nasal spray for osteoporosis should no longer
                be used, and injectable calcitonin should be kept to short courses in a few
                narrow settings — Paget&rsquo;s disease, acute immobilization bone loss, and
                cancer-related high calcium.
              </P>
              <Callout label="The honest reading">
                This is not a scandal; it is a benefit–risk judgment on a drug whose benefit
                was always small. A hormone can be real, its biology sound, and its medicine
                still not worth a low cancer risk for a modest effect. Calcitonin-the-drug
                didn&rsquo;t fail because the hormone was fake. It faded because the margin was
                thin.
              </Callout>
            </Section>

            <Section title="The receptor keeps a second identity">
              <P>
                Here is where calcitonin stops being a historical footnote. Its receptor has a
                trick most receptors don&rsquo;t. On its own, the calcitonin receptor reads
                calcitonin. But pair it with a small accessory protein called a{" "}
                <Term slug="ramp"><Em>RAMP</Em></Term> — a receptor-activity-modifying protein — and the same core
                receptor changes what it hears: it becomes an <Em>amylin receptor</Em> (
                <a href={REF.amylinRx} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Cao et&nbsp;al., Science, 2022
                </a>
                ;{" "}
                <a href={REF.iuphar} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Poyner et&nbsp;al., Pharmacol&nbsp;Rev, 2002
                </a>
                ).
              </P>
              <ReceptorSwapFigure />
              <P>
                That is a genuinely unusual arrangement: the amylin receptor is not a separate
                gene product but the calcitonin receptor wearing an accessory. Which means the{" "}
                <Link href="/hormones/amylin" className={LINK}>amylin</Link> system — the
                satiety signal from the pancreas that this reference keeps running into — is
                built on calcitonin&rsquo;s own receptor core. The hormone whose drug was
                restricted never left the building; it was hiding inside the receptor the whole
                time.
              </P>
            </Section>

            <Section title="Which is why the obesity drugs borrow it">
              <P>
                Follow that wiring forward and it lands squarely in the busiest corner of
                metabolic pharmacology. Because the amylin and calcitonin receptors share a
                core, a drug can be built to hit <Em>both</Em> — a dual amylin and calcitonin
                receptor agonist, or DACRA. The design bet is that the amylin arm curbs
                appetite while the calcitonin arm adds its own metabolic and bone effects, and
                the class is in active development for obesity and diabetes (
                <a href={REF.dacra} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Larsen et&nbsp;al., Biomed&nbsp;Pharmacother, 2022
                </a>
                ).
              </P>
              <P>
                The clearest example is already familiar.{" "}
                <Link href="/hormones/cagrilintide" className={LINK}>Cagrilintide</Link> — the
                long-acting amylin analog paired with semaglutide in CagriSema, and the subject
                of{" "}
                <Link href="/insights/the-molecule-that-is-both-halves" className={LINK}>
                  its own deep-dive
                </Link>{" "}
                — is characterized as a DACRA, engaging the calcitonin receptor as well as the
                amylin receptor. The hormone whose osteoporosis spray was pulled is now, by way
                of its receptor, one of the halves of a leading obesity drug.
              </P>
              <Bullets
                items={[
                  [
                    "The hormone",
                    "Calcitonin — a real C-cell hormone that lowers calcium. Minor physiological role; durable only as the medullary-thyroid-cancer blood test.",
                  ],
                  [
                    "The drug",
                    "Salmon calcitonin for osteoporosis — modest anti-fracture benefit, a small long-term cancer signal, and an EMA conclusion to stop the nasal spray.",
                  ],
                  [
                    "The receptor",
                    "The calcitonin receptor plus a RAMP is the amylin receptor — so DACRAs and cagrilintide carry calcitonin's receptor into obesity medicine.",
                  ],
                ]}
              />
            </Section>

            <Section title="What the arc actually shows">
              <P>
                It is tempting to file calcitonin under &ldquo;failed drug&rdquo; and move on.
                That misreads it. The hormone is real, its receptor biology is real, and its
                most important legacy was never the nasal spray — it was the receptor the spray
                happened to act on. A molecule&rsquo;s medical life can outlast its own drug,
                carried forward by the receptor it leaves behind, and show up decades later
                wearing a different accessory and treating a different disease.
              </P>
              <P>
                So the useful question isn&rsquo;t &ldquo;did calcitonin work?&rdquo; — it&rsquo;s
                which calcitonin you mean: the faded osteoporosis drug, the enduring cancer
                blood test, or the receptor now doing its most consequential work inside the
                amylin agonists. Same hormone, three very different verdicts. The receptor
                outlived the drug.
              </P>
            </Section>

            {/* Visible Q&A — mirrors the FAQPage JSON-LD */}
            <Section title="Questions readers actually ask">
              <dl className="space-y-6">
                {FAQS.map(({ q, a }) => (
                  <div key={q}>
                    <dt className="font-display text-lg font-semibold">{q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/75">{a}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/calcitonin" label="Calcitonin — the hormone, in the catalog" />
                <CrossLink href="/hormones/cagrilintide" label="Cagrilintide — the amylin/calcitonin agonist" />
                <CrossLink href="/insights/the-molecule-that-is-both-halves" label="The molecule that is both halves — cagrilintide" />
                <CrossLink href="/insights/insulins-forgotten-twin" label="Insulin's forgotten twin — what amylin does" />
                <CrossLink href="/insights/teriparatide-backwards" label="Teriparatide, backwards — PTH, the calcium counterpart" />
                <CrossLink href="/families/calcium-bone" label="The calcium & bone family" />
                <CrossLink
                  href="/research?q=How%20does%20the%20calcitonin%20receptor%20combine%20with%20RAMPs%20to%20form%20the%20amylin%20receptor%2C%20and%20what%20are%20dual%20amylin%20and%20calcitonin%20receptor%20agonists%20%28DACRAs%29%3F"
                  label="Ask the research agent about the receptor"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, regulatory history and the state of the
              evidence, summarized and simplified from the public record. Not individualized
              medical advice or a prescription. Regulatory status varies by jurisdiction; the
              2012 restriction described here is the European Medicines Agency&rsquo;s. Compounds
              are named to explain the science, not to endorse use — verify any claim against the
              linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Same receptor core, one accessory protein changes what it hears ── */
function ReceptorSwapFigure() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 600 236"
        className="w-full"
        role="img"
        aria-label="The calcitonin receptor alone reads calcitonin; combined with a RAMP accessory protein, the same core receptor becomes an amylin receptor."
      >
        <line x1="300" y1="40" x2="300" y2="196" stroke="var(--color-ink)" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3 4" />

        {/* ── LEFT: CTR alone → calcitonin ── */}
        <text x="150" y="44" textAnchor="middle" fill="var(--accent-blue)" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Calcitonin receptor</text>
        <text x="150" y="62" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11" fontFamily="var(--font-geist-mono), monospace">CTR alone</text>
        <rect x="110" y="92" width="80" height="54" rx="12" fill="var(--accent-blue)" fillOpacity="0.1" stroke="var(--accent-blue)" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x="150" y="124" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.75" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">CTR</text>
        <line x1="150" y1="72" x2="150" y2="88" stroke="var(--accent-blue)" strokeWidth="2.5" />
        <polygon points="150,92 144,80 156,80" fill="var(--accent-blue)" />
        <text x="150" y="172" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11.5" fontFamily="var(--font-geist-mono), monospace">reads calcitonin</text>
        <text x="150" y="190" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">calcium · bone</text>

        {/* ── RIGHT: CTR + RAMP → amylin ── */}
        <text x="450" y="44" textAnchor="middle" fill="var(--accent-teal)" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Amylin receptor</text>
        <text x="450" y="62" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11" fontFamily="var(--font-geist-mono), monospace">CTR + RAMP</text>
        <rect x="396" y="92" width="58" height="54" rx="12" fill="var(--accent-blue)" fillOpacity="0.1" stroke="var(--accent-blue)" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x="425" y="124" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.75" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">CTR</text>
        <rect x="458" y="100" width="46" height="46" rx="11" fill="var(--accent-teal)" fillOpacity="0.14" stroke="var(--accent-teal)" strokeOpacity="0.5" strokeWidth="1.5" />
        <text x="481" y="127" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.7" fontSize="11" fontWeight="600" fontFamily="var(--font-geist-mono), monospace">RAMP</text>
        <line x1="450" y1="72" x2="450" y2="88" stroke="var(--accent-teal)" strokeWidth="2.5" />
        <polygon points="450,92 444,80 456,80" fill="var(--accent-teal)" />
        <text x="450" y="172" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11.5" fontFamily="var(--font-geist-mono), monospace">reads amylin</text>
        <text x="450" y="190" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">appetite · obesity drugs</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Same core receptor, one accessory protein: alone it hears calcitonin; with a RAMP it hears amylin. The amylin receptor
        <Em> is</Em> the calcitonin receptor in a different coat — which is how a faded bone drug ended up inside the obesity agonists.
      </figcaption>
    </figure>
  );
}
