import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-active-site-sold-as-the-whole")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What Is TB-500? The Thymosin β4 Fragment (Ac-LKKTETQ), Its Evidence, and Why It Isn't the Whole Peptide — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each evidence grade stays checkable.
const REF = {
  // Thymosin β4 as the major intracellular G-actin-sequestering peptide.
  goldstein: "https://pubmed.ncbi.nlm.nih.gov/16099219/", // Goldstein, Hannappel, Kleinman — Trends Mol Med 2005
  huff: "https://pubmed.ncbi.nlm.nih.gov/15466884/", // Huff et al. — J Cell Sci 2004
  // The landmark cardiac-repair paper.
  cardiac: "https://pubmed.ncbi.nlm.nih.gov/15565145/", // Bock-Marquette et al. — Nature 2004
  // The active site = residues 17–23 (LKKTETQ), and TB-500 = its acetylated form.
  sosne: "https://pubmed.ncbi.nlm.nih.gov/20179146/", // Sosne et al. — FASEB J 2010: active sites in short sequences
  ho: "https://pubmed.ncbi.nlm.nih.gov/23084823/", // Ho et al. — J Chromatogr A 2012: TB-500, LKKTETQ actin-binding site, doping assay
  esposito: "https://pubmed.ncbi.nlm.nih.gov/22962027/", // Esposito et al. — Drug Test Anal 2012: Ac 17–23 fragment in TB-500, doping potential
  // The fragment's own rodent evidence.
  philp: "https://pubmed.ncbi.nlm.nih.gov/12581423/", // Philp et al. — Wound Repair Regen 2003: LKKTETQ heals in db/db + aged mice
  // The pivotal human trial of full-length thymosin β4 — withdrawn, never enrolled.
  rgn352: "https://clinicaltrials.gov/study/NCT01311518", // RegeneRx RGN-352, IV thymosin β4, acute MI
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd() and mirrored in the visible block.
const FAQS = [
  {
    q: "What is TB-500?",
    a: "TB-500 is a synthetic seven-amino-acid peptide, Ac-LKKTETQ — the acetylated fragment corresponding to residues 17–23 of thymosin β4. Those seven residues are thymosin β4's actin-binding active site. TB-500 is sold in the research-peptide market for recovery and healing on the strength of thymosin β4's biology, but it is a fragment of that peptide, not the peptide itself.",
  },
  {
    q: "Is TB-500 the same as thymosin β4?",
    a: "No. Thymosin β4 is a 43-residue endogenous peptide; TB-500 is seven of those residues. The fragment carries thymosin β4's actin-binding motif, but evidence generated for the full-length 43-residue peptide does not automatically transfer to a 7-residue fragment with a different size, stability and distribution. Treat them as related, not identical.",
  },
  {
    q: "Does TB-500 actually work in humans?",
    a: "There is no controlled human efficacy trial of TB-500. Its mechanism story borrows from thymosin β4, and the bare LKKTETQ motif has shown wound-healing activity in mice, but the human question has not been tested. Notably, even full-length thymosin β4's one pivotal human trial — an intravenous study in acute myocardial infarction (RGN-352) — was withdrawn before it enrolled a single patient.",
  },
  {
    q: "Why is most of the published literature on TB-500 about drug testing?",
    a: "Because that is where it circulates. The clearest peer-reviewed papers naming TB-500 are anti-doping analytical methods — assays built to detect the peptide in urine and plasma — rather than clinical trials. A detection assay exists when a lab expects to find a substance in samples, which locates TB-500 in sport and research use well ahead of any human efficacy evidence.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(197,122,146,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/repair" className="text-accent-rose hover:text-ink">
                Repair &amp; regenerative
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
            <Section title="Two names, and only one of them is a hormone">
              <P>
                Search for <Link href="/hormones/tb-500" className={LINK}>TB-500</Link> and you
                will find it described as thymosin β4 — the recovery peptide, the healing
                peptide, the thing that mended a famous Nature paper&rsquo;s mouse hearts.
                That description does a quiet, consequential thing: it lends a seven-residue
                synthetic fragment the entire biography of a 43-residue molecule it is only
                a piece of. The two are related. They are not the same, and the difference
                is the whole story.
              </P>
              <P>
                <Link href="/hormones/thymosin-beta-4" className={LINK}>Thymosin β4</Link> is a
                real and well-characterized peptide. TB-500 is <Em>Ac-LKKTETQ</Em>: the
                acetylated form of residues 17–23 of thymosin β4 — the short stretch that is
                its actin-binding active site (
                <a href={REF.esposito} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Esposito et&nbsp;al., Drug&nbsp;Test&nbsp;Anal, 2012
                </a>
                ;{" "}
                <a href={REF.ho} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ho et&nbsp;al., J&nbsp;Chromatogr&nbsp;A, 2012
                </a>
                ). Keep the active site, drop the rest of the chain — it is a move this
                reference has met before, and admires when it is done honestly.
              </P>
              <FragmentFigure />
              <P>
                So the question is not whether TB-500 is &ldquo;fake.&rdquo; It is a real
                molecule doing a real, well-motivated subtraction. The question is what the
                name borrows along with the biology — because the hard part of a fragment
                drug is never the cut.
              </P>
            </Section>

            <Section title="What thymosin β4 actually does">
              <P>
                Thymosin β4 is the cell&rsquo;s main reservoir of monomeric actin. It binds
                and holds G-actin, buffering how much is free to assemble into the filaments
                that drive a cell&rsquo;s shape and movement — which is why it is called the
                major actin-sequestering molecule in the cell (
                <a href={REF.goldstein} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Goldstein et&nbsp;al., Trends&nbsp;Mol&nbsp;Med, 2005
                </a>
                ;{" "}
                <a href={REF.huff} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Huff et&nbsp;al., J&nbsp;Cell&nbsp;Sci, 2004
                </a>
                ). Through that grip on the cytoskeleton it influences cell migration,
                angiogenesis and inflammation — the machinery tissue uses to repair itself.
              </P>
              <P>
                The high-water mark of that story is cardiac. In a 2004 Nature paper,
                thymosin β4 activated integrin-linked kinase and promoted cardiac cell
                migration and survival, improving repair after experimental injury (
                <a href={REF.cardiac} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Bock-Marquette et&nbsp;al., Nature, 2004
                </a>
                ). That is a landmark-grade mechanistic result, and it is the reason thymosin
                β4 is taken seriously — and the reason a fragment that borrows its name sounds
                so plausible.
              </P>
              <Callout label="Hold the altitude in mind">
                Everything above is mechanism and animal repair biology — a real, high rung
                for <Em>thymosin β4</Em>. It is not, by itself, a demonstrated clinical
                benefit in people, and it is certainly not evidence about a seven-residue
                fragment. Keep the molecule and the claim on separate rulers.
              </Callout>
            </Section>

            <Section title="The fragment is the active site — and the cut is real">
              <P>
                The seven residues are not arbitrary. <Em>LKKTETQ</Em>, residues 17–23, is the
                central actin-binding domain of thymosin β4 — the part that does the business
                of holding actin (
                <a href={REF.sosne} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sosne et&nbsp;al., FASEB&nbsp;J, 2010
                </a>
                ). Isolating it is a coherent bet: if the actin-binding activity lives in this
                stretch, maybe the stretch alone carries the repair effect.
              </P>
              <P>
                And unlike some fragment stories, the bet is not empty in animals. The bare
                seven-amino-acid peptide LKKTETQ promoted dermal wound repair in diabetic
                (db/db) and in aged mice (
                <a href={REF.philp} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Philp et&nbsp;al., Wound&nbsp;Repair&nbsp;Regen, 2003
                </a>
                ). So the subtraction genuinely retained something: the active site, on its
                own, can still move a repair endpoint in a mouse. That is more than you can say
                for{" "}
                <Link href="/insights/the-half-that-did-nothing" className={LINK}>AOD-9604</Link>,
                the growth-hormone fragment whose kept clause did nothing even in people.
              </P>
              <P>
                This is exactly the design the reference calls{" "}
                <Link href="/insights/keep-one-clause" className={LINK}>keep one clause</Link>:
                cut a molecule down to the fragment that carries the activity you want and
                throw the rest away. Done well it produces real medicine. The catch is that
                the design has two halves of very unequal trust.
              </P>
            </Section>

            <Section title="But the human evidence stops at the water's edge">
              <P>
                Here is the half the marketing skips. There is <Em>no controlled human
                efficacy trial of TB-500</Em>. The recovery, tendon-healing and
                injury-repair claims attached to it in the research-peptide market rest on
                thymosin β4&rsquo;s biology and on rodent data for the motif — not on a single
                blinded human study of the compound being sold.
              </P>
              <P>
                And the gap is not only at the fragment. Even full-length thymosin β4&rsquo;s
                one pivotal human trial never happened. RGN-352, an intravenous thymosin β4
                study in patients with acute myocardial infarction — the direct human test of
                that famous cardiac-repair result — was{" "}
                <a href={REF.rgn352} target="_blank" rel="noopener noreferrer" className={LINK}>
                  withdrawn before it enrolled a single patient
                </a>{" "}
                (RegeneRx, NCT01311518; status: withdrawn, enrollment zero). The headline
                mechanism of the whole field has not had its confirmatory human trial, let
                alone the seven-residue derivative.
              </P>
              <P>
                What <Em>does</Em> exist in the peer-reviewed record for TB-500 is telling:
                the clearest, most rigorous papers naming it are anti-doping analytical
                methods, assays written to detect it in urine and plasma (
                <a href={REF.ho} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ho et&nbsp;al., 2012
                </a>
                ;{" "}
                <a href={REF.esposito} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Esposito et&nbsp;al., 2012
                </a>
                ). A detection assay gets built when a laboratory expects to find a substance
                in real samples. That locates TB-500 precisely: circulating in sport and
                research use, years ahead of any evidence that it works.
              </P>
              <Callout label="The two halves of a fragment drug">
                The subtraction — you dropped the other 36 residues and kept the actin-binding
                site — is the easy, verifiable half. The retention — that the kept site still
                does something useful <Em>in a person</Em> — is the hard, trial-dependent half,
                and the only one that decides whether you have a drug. For TB-500 the first
                half is done and the second is simply unmade.
              </Callout>
            </Section>

            <Section title="What the name borrows">
              <P>
                Put the pieces together and the pattern is clean. The biology is real:
                thymosin β4 is a genuine actin-sequestering repair molecule with a
                landmark-grade mechanism. The cut is real: LKKTETQ is the active site, and the
                motif has rodent repair data of its own. What is <Em>not</Em> there is the one
                thing the product is sold on — a demonstrated human benefit — and the naming is
                what papers over the gap, letting a 43-residue peptide&rsquo;s reputation stand
                in for a seven-residue fragment&rsquo;s untested record.
              </P>
              <Bullets
                items={[
                  [
                    "The molecule",
                    "Thymosin β4 — 43 residues, the major actin-sequestering peptide, real repair and cardiac mechanism. High mechanistic rung; thin human-outcome rung.",
                  ],
                  [
                    "The fragment",
                    "TB-500 — Ac-LKKTETQ, residues 17–23, the actin-binding active site. Real rodent wound-healing data for the motif; no controlled human trial.",
                  ],
                  [
                    "The borrowed part",
                    "The confident human-benefit framing, imported from the parent's name rather than earned by the fragment's own evidence.",
                  ],
                ]}
              />
              <P>
                None of this makes TB-500 a scam, and none of it erases thymosin β4&rsquo;s
                science. It means the right question to ask of any &ldquo;it&rsquo;s basically
                thymosin β4&rdquo; claim is the one the whole reference keeps returning to: what
                is the best evidence <Em>for the thing in the vial</Em>, and which rung is it
                on? Real biology, borrowed name, missing trial.
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
                <CrossLink href="/hormones/thymosin-beta-4" label="Thymosin β4 — the 43-residue parent" />
                <CrossLink href="/hormones/tb-500" label="TB-500 — the fragment, in the catalog" />
                <CrossLink href="/insights/keep-one-clause" label="Keep one clause — the fragment design playbook" />
                <CrossLink href="/insights/the-half-that-did-nothing" label="The half that did nothing — AOD-9604's empty clause" />
                <CrossLink href="/insights/the-trial-that-hasnt-reported" label="The trial that hasn't reported — BPC-157's human record" />
                <CrossLink href="/insights/the-complexity-ladder" label="Where trust starts to mean something" />
                <CrossLink
                  href="/research?q=What%20controlled%20human%20evidence%20exists%20for%20TB-500%20%28Ac-LKKTETQ%29%2C%20and%20how%20does%20it%20differ%20from%20full-length%20thymosin%20%CE%B24%3F"
                  label="Ask the research agent what the human data shows"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized and
              simplified from the public record. Not individualized medical advice or a
              prescription. TB-500 is a research compound, not an approved treatment, and
              regulatory and anti-doping status varies by jurisdiction; it is named to explain
              the science, not to endorse use. Thymosin β4 and TB-500 are related but not
              identical — verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Keep the active site, drop the rest of the chain ── */
function FragmentFigure() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 600 232"
        className="w-full"
        role="img"
        aria-label="Thymosin β4 is a 43-residue peptide; TB-500 is the acetylated 17–23 fragment (Ac-LKKTETQ), its actin-binding active site. The motif heals wounds in mice, but TB-500 has no controlled human trial."
      >
        {/* parent label */}
        <text x="300" y="30" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="11.5" fontFamily="var(--font-space-grotesk), sans-serif">Thymosin β4 — 43 residues</text>

        {/* full-length chain */}
        <rect x="56" y="42" width="488" height="26" rx="8" fill="var(--color-ink)" fillOpacity="0.06" stroke="var(--color-ink)" strokeOpacity="0.15" strokeWidth="1" />
        {/* highlighted active site 17-23 */}
        <rect x="198" y="42" width="80" height="26" rx="6" fill="var(--accent-rose)" fillOpacity="0.2" stroke="var(--accent-rose)" strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="62" y="59" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily="var(--font-geist-mono), monospace">1</text>
        <text x="536" y="59" textAnchor="end" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily="var(--font-geist-mono), monospace">43</text>
        <text x="238" y="86" textAnchor="middle" fill="var(--accent-rose)" fontSize="10.5" fontWeight="600" fontFamily="var(--font-geist-mono), monospace">17–23 · actin-binding site</text>

        {/* cut-away arrow */}
        <line x1="238" y1="92" x2="238" y2="118" stroke="var(--accent-rose)" strokeWidth="2.5" />
        <polygon points="238,126 231,113 245,113" fill="var(--accent-rose)" />

        {/* fragment */}
        <rect x="186" y="128" width="104" height="24" rx="8" fill="var(--accent-rose)" fillOpacity="0.16" stroke="var(--accent-rose)" strokeOpacity="0.55" strokeWidth="1.5" />
        <text x="238" y="145" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">TB-500</text>
        <text x="306" y="144" fill="var(--color-ink)" fillOpacity="0.55" fontSize="11.5" fontFamily="var(--font-geist-mono), monospace">= Ac-LKKTETQ · the active site, kept</text>

        {/* outcomes */}
        <text x="300" y="188" textAnchor="middle" fill="var(--accent-teal)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">In mice — the 7-mer heals wounds ✓</text>
        <text x="300" y="210" textAnchor="middle" fill="var(--accent-amber)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">In humans — no controlled trial ✗</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        TB-500 is seven of thymosin β4&rsquo;s forty-three residues — its actin-binding active site, cut clean and kept.
        The subtraction is real and even works in mice; what it does in a person is the half no trial has tested.
      </figcaption>
    </figure>
  );
}
