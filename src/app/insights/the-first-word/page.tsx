import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-first-word")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What Is Secretin? The First Hormone Discovered, the Autism Trials, and the Brown-Fat Revival — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each claim stays checkable.
const REF = {
  bayliss: "https://pubmed.ncbi.nlm.nih.gov/16992627/", // Bayliss & Starling — J Physiol 1902: the mechanism of pancreatic secretion
  history: "https://pubmed.ncbi.nlm.nih.gov/14673718/", // Chey & Chang — J Gastroenterol 2003: "Secretin, 100 years later"
  bicarb: "https://pubmed.ncbi.nlm.nih.gov/38221598/", // Berg et al. — Pflugers Arch 2024: secretin, a hormone for HCO3- homeostasis
  zes: "https://pubmed.ncbi.nlm.nih.gov/17108779/", // Berna et al. — Medicine 2006: serum gastrin in ZES, secretin test
  zesReview: "https://pubmed.ncbi.nlm.nih.gov/37042078/", // Chatzipanagiotou et al. — J Neuroendocrinol 2023: gastrinoma/ZES update
  autism: "https://pubmed.ncbi.nlm.nih.gov/10588965/", // Sandler et al. — NEJM 1999: lack of benefit of secretin in autism
  autismReview: "https://pubmed.ncbi.nlm.nih.gov/15590241/", // Sturmey — Res Dev Disabil 2005: 15 double-blind RCTs
  cochrane: "https://pubmed.ncbi.nlm.nih.gov/22513913/", // Williams et al. — Cochrane 2012: IV secretin for ASD
  brownfat: "https://pubmed.ncbi.nlm.nih.gov/30449620/", // Li et al. — Cell 2018: secretin-activated brown fat, prandial thermogenesis, satiation
  commentary: "https://pubmed.ncbi.nlm.nih.gov/30500531/", // Mynatt & Ravussin — Cell 2018: "An Old Hormone with a Burning Secret"
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd() and mirrored in the visible block.
const FAQS = [
  {
    q: "What is secretin?",
    a: "Secretin is a 27-amino-acid peptide hormone released by S-cells in the lining of the duodenum when acidic stomach contents arrive. It tells the pancreas and bile ducts to secrete bicarbonate-rich fluid, neutralizing the acid. Historically it is the hormone whose 1902 discovery gave the field — and the word 'hormone' — its start.",
  },
  {
    q: "Was secretin really the first hormone discovered?",
    a: "Yes, by the usual telling. In 1902 William Bayliss and Ernest Starling showed that acid in the small intestine triggered pancreatic secretion even when the nerves were cut, so the signal had to be a chemical carried in the blood. That was the first demonstration of a hormone, and the word 'hormone' was coined for the new class of blood-borne messengers it defined.",
  },
  {
    q: "Does secretin treat autism?",
    a: "No. After a 1998 anecdotal report, secretin was widely and hopefully used for autism, but more than a dozen double-blind randomized controlled trials and a Cochrane systematic review found no benefit. It is one of the clearest cautionary tales in the field: a real hormone, a compelling story, and no effect when actually tested.",
  },
  {
    q: "What is secretin used for clinically?",
    a: "Its main modern clinical use is as a diagnostic agent. In the secretin stimulation test, giving secretin causes a paradoxical rise in the hormone gastrin in people with a gastrin-secreting tumor (gastrinoma / Zollinger-Ellison syndrome), which helps make the diagnosis. It is a test reagent more than a treatment.",
  },
  {
    q: "What is the connection between secretin and brown fat?",
    a: "A 2018 study found that secretin released during a meal activates brown adipose tissue to produce heat, and that this meal-induced warmth contributes to satiation — feeling full. It reframed an old digestive hormone as a signal linking eating, body temperature and appetite, and reopened secretin as a metabolism question.",
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
            <Section title="The experiment that invented a word">
              <P>
                Before 1902, the body&rsquo;s long-distance signalling was assumed to run on
                nerves. Then William Bayliss and Ernest Starling did a deceptively simple
                thing. They took a loop of dog small intestine, cut every nerve to it so it
                hung connected to the body only by its blood vessels, and dripped weak acid
                inside. The pancreas, at the other end of that bloodstream, promptly secreted
                (
                <a href={REF.bayliss} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Bayliss &amp; Starling, J&nbsp;Physiol, 1902
                </a>
                ). No nerve carried the message. Something made in the gut wall had travelled
                in the blood and given the pancreas an order.
              </P>
              <P>
                That something was <Link href="/hormones/secretin" className={LINK}>secretin</Link>,
                and the discovery did more than explain pancreatic juice. It established a
                whole category of biology — chemical messengers released into the blood to act
                on a distant organ — and the word <Em>hormone</Em> was coined for that new
                class (
                <a href={REF.history} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Chey &amp; Chang, J&nbsp;Gastroenterol, 2003
                </a>
                ). Endocrinology has a founding molecule, and this is it. Everything else in
                this reference — every incretin, every releasing hormone — is downstream of
                the sentence secretin let people write.
              </P>
              <SecretinLoopFigure />
            </Section>

            <Section title="What it actually does">
              <P>
                The job secretin was discovered doing is still its main one, and it is a tidy
                feedback loop. When acidic chyme leaves the stomach and hits the duodenum, the
                <Em> S-cells</Em> of the duodenal lining release secretin; secretin tells the
                pancreas, bile ducts and duodenal glands to pour out{" "}
                <Em>bicarbonate</Em>-rich fluid; the bicarbonate neutralizes the acid; and as
                the pH rises, the signal to release more secretin falls away (
                <a href={REF.bicarb} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Berg et&nbsp;al., Pflügers&nbsp;Arch, 2024
                </a>
                ). Acid is the trigger and its own neutralization is the off-switch — a clean
                chemical thermostat for the gut&rsquo;s pH.
              </P>
              <P>
                The receptor secretin acts on is quietly important, too. It is the prototype of
                the &ldquo;secretin family&rdquo; of class&nbsp;B G-protein-coupled receptors —
                the receptor class that, as{" "}
                <Link href="/insights/four-ways-to-hear-a-hormone" className={LINK}>
                  four ways to hear a hormone
                </Link>{" "}
                lays out, also hears <Link href="/hormones/glucagon" className={LINK}>glucagon</Link>,{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link>, GIP and PTH. The
                molecule that named the field also named the receptor dynasty that the modern
                incretin drugs act on.
              </P>
            </Section>

            <Section title="Still a working clinical tool — as a test">
              <P>
                Secretin never became much of a treatment, but it is a genuinely useful
                diagnostic reagent. Its headline use is the <Em>secretin stimulation test</Em>
                {" "}for gastrinoma — a gastrin-secreting tumor that causes Zollinger-Ellison
                syndrome. Give secretin and, counter-intuitively, the tumor&rsquo;s gastrin
                output <Em>jumps</Em>, while normal gastrin cells would be quieted. That
                paradoxical rise is diagnostic, and the test remains first-line for the
                condition (
                <a href={REF.zes} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Berna et&nbsp;al., Medicine, 2006
                </a>
                ;{" "}
                <a href={REF.zesReview} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Chatzipanagiotou et&nbsp;al., J&nbsp;Neuroendocrinol, 2023
                </a>
                ). The founding hormone earns its modern keep as a question you ask the
                pancreas, not a drug you give it.
              </P>
            </Section>

            <Section title="The fad: secretin for autism">
              <P>
                In 1998 a single anecdotal report suggested that a child&rsquo;s autism
                improved after a secretin infusion given for an unrelated endoscopy. The idea
                spread with astonishing speed: secretin became one of the most sought-after
                treatments in autism, given to thousands of children on the strength of a
                story. It is a near-perfect specimen of what the rest of this reference calls{" "}
                <Link href="/insights/mechanism-is-not-proof" className={LINK}>
                  mechanism mistaken for proof
                </Link>
                .
              </P>
              <P>
                Then it was tested properly, and the result was unambiguous. A randomized,
                double-blind, placebo-controlled trial found no benefit over placebo (
                <a href={REF.autism} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sandler et&nbsp;al., NEJM, 1999
                </a>
                ), and it was followed by many more: a review of <Em>fifteen</Em> double-blind
                randomized trials (
                <a href={REF.autismReview} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sturmey, Res&nbsp;Dev&nbsp;Disabil, 2005
                </a>
                ) and ultimately a Cochrane systematic review concluding there is no evidence
                that secretin, single-dose or repeated, is effective (
                <a href={REF.cochrane} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Williams et&nbsp;al., Cochrane, 2012
                </a>
                ). Rarely has a hopeful treatment been dismantled so thoroughly.
              </P>
              <Callout label="Why the story is worth keeping">
                The autism episode is not a knock on secretin; it is a knock on the reasoning.
                A real hormone with real effects on the gut had no effect on the thing it was
                hyped for — and only a stack of controlled trials could show that. The hormone
                survived the fad; the lesson is what the trials were for.
              </Callout>
            </Section>

            <Section title="The second act: a meal's own thermostat">
              <P>
                Then, a century after its discovery, secretin did something the founding story
                never predicted. A 2018 study reported that secretin released during a meal
                activates <Em>brown fat</Em> — the heat-producing tissue — to raise body
                temperature, and that this meal-induced thermogenesis feeds back as a signal of{" "}
                <Em>satiation</Em>: part of how a meal makes you feel full (
                <a href={REF.brownfat} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Li et&nbsp;al., Cell, 2018
                </a>
                ). An accompanying commentary called it, aptly, an old hormone with a burning
                secret (
                <a href={REF.commentary} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Mynatt &amp; Ravussin, Cell, 2018
                </a>
                ).
              </P>
              <P>
                It is early-stage biology, not a drug, and it should be held at that rung. But
                it reopens secretin as a metabolism question — linking eating, body heat and
                appetite — in exactly the territory the incretin drugs now dominate. The
                oldest hormone in the book turns out not to be finished.
              </P>
              <Bullets
                items={[
                  [
                    "The founding job",
                    "Acid-triggered pancreatic bicarbonate — the 1902 discovery, still its core physiology, and the first hormone ever shown.",
                  ],
                  [
                    "The clinical keep",
                    "A diagnostic reagent — the secretin stimulation test for gastrinoma — not a therapy.",
                  ],
                  [
                    "The fad, retired",
                    "Autism: hyped on an anecdote, then shown ineffective by 15+ randomized trials and a Cochrane review.",
                  ],
                  [
                    "The second act",
                    "A meal-induced brown-fat and satiation signal (2018) — real, early, and squarely in metabolic territory.",
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
                <CrossLink href="/hormones/secretin" label="Secretin — the hormone, in the catalog" />
                <CrossLink href="/insights/four-ways-to-hear-a-hormone" label="Four ways to hear a hormone — the class B receptor family" />
                <CrossLink href="/insights/mechanism-is-not-proof" label="Mechanism is not proof — why the autism trials mattered" />
                <CrossLink href="/insights/the-guts-full-report" label="The gut's full report — the other meal hormones" />
                <CrossLink href="/insights/the-antibiotic-that-kept-time" label="The antibiotic that kept time — motilin, the fasting signal" />
                <CrossLink href="/families/gut-appetite" label="The gut & appetite family" />
                <CrossLink
                  href="/research?q=How%20did%20Bayliss%20and%20Starling%27s%201902%20secretin%20experiment%20establish%20the%20concept%20of%20a%20hormone%2C%20and%20what%20is%20the%20evidence%20for%20secretin%27s%20role%20in%20brown-fat%20thermogenesis%20and%20satiation%3F"
                  label="Ask the research agent about secretin"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, history and the state of the evidence,
              summarized and simplified from the public record. Not individualized medical
              advice or a prescription. The brown-fat/satiation work is early-stage research,
              not an approved use; secretin is not a treatment for autism. Verify any claim
              against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The 1902 loop: acid in, a blood-borne message, bicarbonate back ── */
function SecretinLoopFigure() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 600 212"
        className="w-full"
        role="img"
        aria-label="Acid reaching the duodenum makes S-cells release secretin into the blood; secretin tells the pancreas to release bicarbonate, which neutralizes the acid — the feedback loop Bayliss and Starling uncovered in 1902."
      >
        {/* two organs */}
        <rect x="52" y="78" width="150" height="56" rx="14" fill="var(--accent-teal)" fillOpacity="0.1" stroke="var(--accent-teal)" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x="127" y="101" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Duodenum</text>
        <text x="127" y="119" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">acid · S-cells</text>

        <rect x="398" y="78" width="150" height="56" rx="14" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x="473" y="101" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Pancreas</text>
        <text x="473" y="119" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">bicarbonate</text>

        {/* top arrow: secretin via blood */}
        <path d="M206,92 C290,56 316,56 394,92" fill="none" stroke="var(--accent-teal)" strokeWidth="2.5" />
        <polygon points="394,92 381,88 385,100" fill="var(--accent-teal)" />
        <text x="300" y="52" textAnchor="middle" fill="var(--accent-teal)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">secretin — carried in the blood</text>

        {/* bottom arrow: bicarbonate neutralizes */}
        <path d="M394,120 C316,156 290,156 206,120" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        <polygon points="206,120 219,124 215,112" fill="var(--accent)" />
        <text x="300" y="172" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11.5" fontFamily="var(--font-geist-mono), monospace">HCO₃⁻ neutralizes the acid → signal falls</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The 1902 result in one loop: acid in the duodenum, a message carried by blood rather than nerve, bicarbonate back from
        the pancreas. That blood-borne message is what the word &ldquo;hormone&rdquo; was coined to name.
      </figcaption>
    </figure>
  );
}
