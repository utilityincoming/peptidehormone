import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-antibiotic-that-kept-time")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What Is Motilin? The Between-Meal Gut Timekeeper, and Why Erythromycin Acts Like It — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each claim stays checkable.
const REF = {
  physiology: "https://pubmed.ncbi.nlm.nih.gov/34497583/", // Kitazawa & Kaiya — Front Endocrinol 2021: motilin structure, distribution, receptors, motility
  mori: "https://pubmed.ncbi.nlm.nih.gov/36436612/", // Mori, Verbeure, ... Tack — Peptides 2023: physiology and clinical applications of motilin
  itoh1986: "https://pubmed.ncbi.nlm.nih.gov/3943442/", // Tomomasa, ... Itoh — Dig Dis Sci 1986: erythromycin induces MMC in human GI tract
  agonist: "https://pubmed.ncbi.nlm.nih.gov/23190027/", // Broad & Sanger — Br J Pharmacol 2013: azithromycin is a motilin receptor agonist, vs erythromycin
  target: "https://pubmed.ncbi.nlm.nih.gov/26392067/", // Sanger & Furness — Nat Rev Gastroenterol Hepatol 2016: ghrelin and motilin receptors as drug targets
  camicinal: "https://pubmed.ncbi.nlm.nih.gov/25341626/", // Barshop & Kuo — Expert Opin Investig Drugs 2015: camicinal for gastroparesis
  design: "https://pubmed.ncbi.nlm.nih.gov/24438586/", // Sanger — Neurogastroenterol Motil 2014: motilin/ghrelin agonist drug design
  meta: "https://pubmed.ncbi.nlm.nih.gov/35188672/", // Chen et al. — JPEN 2022: IV erythromycin benefit in feeding intolerance questioned
  ghrelinKin: "https://pubmed.ncbi.nlm.nih.gov/22286034/", // Morozumi et al. — Peptides 2012: motilin stabilized using ghrelin's C-terminal (structural kinship)
  transgenic: "https://pubmed.ncbi.nlm.nih.gov/30789939/", // Kato et al. — PLoS One 2019: human motilin receptor transgenic mice
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd() and mirrored in the visible block.
const FAQS = [
  {
    q: "What is motilin?",
    a: "Motilin is a 22-amino-acid peptide hormone released from endocrine cells of the upper small intestine. Unlike the meal hormones, it works between meals: it is released in cyclic bursts during fasting and paces the migrating motor complex, the wave of contractions that sweeps the stomach and small intestine clean while you are not eating.",
  },
  {
    q: "Why does erythromycin cause stomach cramps and empty the stomach?",
    a: "Because erythromycin — a macrolide antibiotic — happens to be a motilin-receptor agonist. It activates the same receptor the hormone motilin uses, triggering strong stomach contractions. That is why it commonly causes cramping and nausea, and why a low dose is used off-label as a prokinetic to force a sluggish stomach to empty in gastroparesis.",
  },
  {
    q: "What is the migrating motor complex (MMC)?",
    a: "The MMC is a recurring pattern of gut contractions during fasting, cycling roughly every one to two hours. Its strong phase acts as a 'housekeeper,' sweeping residual food, secretions and bacteria out of the stomach and small intestine. Motilin is the main hormone that initiates it, which is why the MMC largely stops once you eat.",
  },
  {
    q: "Is there a motilin drug?",
    a: "Sort of, and imperfectly. Erythromycin is used as a de facto motilin agonist, and purpose-built motilin-receptor agonists such as camicinal have been developed for gastroparesis. But turning the receptor's jolt into durable benefit has been difficult, and even erythromycin's prokinetic benefit is contested in the evidence. No motilin agonist has become a clearly established long-term therapy.",
  },
  {
    q: "How is motilin related to ghrelin?",
    a: "Motilin and ghrelin are structural cousins — related gut peptides acting on related receptors. Roughly, motilin times the empty gut's housekeeping while ghrelin signals hunger, so the pair is often studied and drugged together as the 'motilin–ghrelin' receptor family.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(74,183,152,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/gut-appetite" className="text-accent-teal hover:text-ink">
                Gut &amp; appetite
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
            <Section title="The hormone of the gaps between meals">
              <P>
                Nearly every hormone in this corner of the reference is about eating —
                the signals a meal sets off. <Link href="/hormones/motilin" className={LINK}>Motilin</Link>{" "}
                is the exception that works in the silence between meals. Released in cyclic
                bursts during fasting, it paces the <Em>migrating motor complex</Em> (MMC):
                the slow wave of contractions that, every hour or two, sweeps leftover food,
                secretions and bacteria out of the stomach and small intestine (
                <a href={REF.physiology} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kitazawa &amp; Kaiya, Front&nbsp;Endocrinol, 2021
                </a>
                ;{" "}
                <a href={REF.mori} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Mori et&nbsp;al., Peptides, 2023
                </a>
                ). It is the gut&rsquo;s housekeeper, and it clocks on when you stop eating —
                which is also why that pattern largely halts once a meal arrives.
              </P>
              <P>
                That makes motilin easy to overlook. It doesn&rsquo;t curb appetite, lower
                glucose or build anything; it just keeps the empty gut in rhythm. The reason
                it is worth a deep-dive is the peculiar way medicine stumbled into its
                pharmacology.
              </P>
            </Section>

            <Section title="The side effect that turned out to be the pharmacology">
              <P>
                For decades, doctors knew that <Em>erythromycin</Em> — a common macrolide
                antibiotic — gave a lot of patients stomach cramps, nausea and diarrhea. The
                explanation, when it came, was elegant: erythromycin is a{" "}
                <Em>motilin-receptor agonist</Em>. It activates the very receptor the hormone
                motilin uses, and a dose of it induces the migrating motor complex in the human
                gut almost the way the hormone does (
                <a href={REF.itoh1986} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Tomomasa et&nbsp;al., Dig&nbsp;Dis&nbsp;Sci, 1986
                </a>
                ;{" "}
                <a href={REF.agonist} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Broad &amp; Sanger, Br&nbsp;J&nbsp;Pharmacol, 2013
                </a>
                ). The famous gut side effect was not a nuisance to explain away — it was the
                antibiotic accidentally impersonating a hormone.
              </P>
              <MotilinKeyFigure />
              <P>
                That accident became a tool. A low, sub-antibiotic dose of erythromycin is used
                as a <Em>prokinetic</Em> — a drug to make a sluggish stomach empty — in
                gastroparesis and in critically ill patients who can&rsquo;t tolerate tube
                feeds (
                <a href={REF.target} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sanger &amp; Furness, Nat&nbsp;Rev&nbsp;Gastroenterol&nbsp;Hepatol, 2016
                </a>
                ). A molecule designed to kill bacteria earns a second job forcing the stomach
                to keep time.
              </P>
            </Section>

            <Section title="Why it has been hard to make a good drug of it">
              <P>
                If activating the motilin receptor empties the stomach, a clean motilin agonist
                should be a straightforward prokinetic. It hasn&rsquo;t worked out that cleanly.
                Purpose-built motilin-receptor agonists — <Link href="/hormones/motilin" className={LINK}>motilides</Link>{" "}
                such as camicinal — were developed for gastroparesis (
                <a href={REF.camicinal} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Barshop &amp; Kuo, Expert&nbsp;Opin&nbsp;Investig&nbsp;Drugs, 2015
                </a>
                ), but turning the receptor&rsquo;s jolt into durable, day-after-day benefit has
                proved difficult, and drug designers have argued the problem is in how the
                receptor is engaged, not just which molecule engages it (
                <a href={REF.design} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sanger, Neurogastroenterol&nbsp;Motil, 2014
                </a>
                ).
              </P>
              <P>
                Even the original accidental drug is contested: a meta-analysis of intravenous
                erythromycin for feeding intolerance in critically ill adults questioned how
                much durable benefit it actually delivers (
                <a href={REF.meta} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Chen et&nbsp;al., JPEN, 2022
                </a>
                ). The receptor is real and the acute push is real; a lasting therapy out of it
                is the part that keeps slipping.
              </P>
              <Callout label="The honest read">
                Motilin&rsquo;s pharmacology is a genuine effect with a shrewd origin story —
                and a reminder that an acute physiological jolt is not the same as a drug. The
                stomach contracts; whether a patient is reliably better, for weeks, is a
                separate and harder question the motilin agonists keep running into.
              </Callout>
            </Section>

            <Section title="Motilin's sibling: ghrelin">
              <P>
                Motilin doesn&rsquo;t sit alone. It is a structural cousin of{" "}
                <Link href="/hormones/ghrelin" className={LINK}>ghrelin</Link>, the hunger
                hormone — related peptides acting on related receptors, close enough that part
                of ghrelin&rsquo;s own structure has been borrowed to stabilize motilin (
                <a href={REF.ghrelinKin} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Morozumi et&nbsp;al., Peptides, 2012
                </a>
                ). The pair is often studied and targeted together as the motilin–ghrelin
                receptor family (
                <a href={REF.target} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sanger &amp; Furness, 2016
                </a>
                ) — two gut signals with a neat division of labor: one times the empty gut&rsquo;s
                housekeeping, the other, as{" "}
                <Link href="/insights/the-hormone-found-after-its-drug" className={LINK}>
                  its own deep-dive
                </Link>{" "}
                tells, asks you to fill it.
              </P>
              <P>
                One caveat worth keeping: motilin is hard to study in the usual lab animals.
                Standard mice don&rsquo;t respond to it the way people do, and researchers have
                had to build mice carrying the human motilin receptor to model its effects (
                <a href={REF.transgenic} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kato et&nbsp;al., PLoS&nbsp;One, 2019
                </a>
                ). A hormone that is central in humans can be nearly invisible in the models
                drug development leans on — part of why its drug story has moved slowly.
              </P>
              <Bullets
                items={[
                  [
                    "The job",
                    "Pace the migrating motor complex — the between-meal housekeeper wave — not the fed-state response.",
                  ],
                  [
                    "The accident",
                    "Erythromycin is a motilin-receptor agonist; its gut side effects are that pharmacology, repurposed as a prokinetic.",
                  ],
                  [
                    "The difficulty",
                    "Purpose-built agonists (camicinal) and even erythromycin struggle to show durable benefit; the receptor is easier to jolt than to drug.",
                  ],
                ]}
              />
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
                <CrossLink href="/hormones/motilin" label="Motilin — the hormone, in the catalog" />
                <CrossLink href="/hormones/ghrelin" label="Ghrelin — motilin's hunger-signalling cousin" />
                <CrossLink href="/insights/the-hormone-found-after-its-drug" label="The hormone found after its drug — ghrelin" />
                <CrossLink href="/insights/the-guts-full-report" label="The gut's full report — the meal hormones" />
                <CrossLink href="/insights/the-first-word" label="The first word — secretin, the other gut founder" />
                <CrossLink href="/families/gut-appetite" label="The gut & appetite family" />
                <CrossLink
                  href="/research?q=How%20does%20motilin%20pace%20the%20migrating%20motor%20complex%2C%20why%20is%20erythromycin%20a%20motilin%20receptor%20agonist%2C%20and%20how%20well%20do%20motilin%20agonists%20like%20camicinal%20work%20for%20gastroparesis%3F"
                  label="Ask the research agent about motilin"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized and
              simplified from the public record. Not individualized medical advice or a
              prescription. The prokinetic use of erythromycin is off-label and dose-dependent;
              compounds are named to explain the science, not to endorse use. Verify any claim
              against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Two keys, one lock: the hormone and the antibiotic hit the same receptor ── */
function MotilinKeyFigure() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 600 224"
        className="w-full"
        role="img"
        aria-label="Both the hormone motilin and the antibiotic erythromycin activate the motilin receptor, triggering the migrating motor complex that empties the stomach."
      >
        {/* two inputs */}
        <text x="130" y="44" textAnchor="middle" fill="var(--accent-teal)" fontSize="13.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Motilin</text>
        <text x="130" y="62" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">the hormone</text>
        <text x="470" y="44" textAnchor="middle" fill="var(--accent-amber)" fontSize="13.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Erythromycin</text>
        <text x="470" y="62" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">an antibiotic</text>

        {/* converging arrows to the receptor */}
        <path d="M130,72 C150,104 210,110 268,120" fill="none" stroke="var(--accent-teal)" strokeWidth="2.5" />
        <polygon points="276,122 262,120 267,132" fill="var(--accent-teal)" />
        <path d="M470,72 C450,104 390,110 332,120" fill="none" stroke="var(--accent-amber)" strokeWidth="2.5" />
        <polygon points="324,122 338,120 333,132" fill="var(--accent-amber)" />

        {/* the receptor */}
        <rect x="238" y="118" width="124" height="34" rx="17" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x="300" y="140" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">motilin receptor</text>

        {/* outcome */}
        <line x1="300" y1="152" x2="300" y2="176" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />
        <polygon points="300,184 294,172 306,172" fill="var(--color-ink)" fillOpacity="0.4" />
        <text x="300" y="202" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">the housekeeper wave — the stomach empties</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two very different molecules, one receptor: the hormone built to pace the gut and an antibiotic built to kill bacteria
        both switch on the same motilin receptor — which is the whole reason erythromycin empties the stomach.
      </figcaption>
    </figure>
  );
}
