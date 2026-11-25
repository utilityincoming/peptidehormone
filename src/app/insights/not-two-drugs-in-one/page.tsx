import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("not-two-drugs-in-one")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "How Does Tirzepatide Work? Imbalanced and Biased Agonism at the GIP and GLP-1 Receptors — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "How Does Tirzepatide Work? Not Two Drugs in One · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  surmount5: "https://pubmed.ncbi.nlm.nih.gov/40353578/", // Aronne et al. 2025, NEJM — tirzepatide vs semaglutide for obesity (SURMOUNT-5)
  coskun: "https://pubmed.ncbi.nlm.nih.gov/30473097/", // Coskun et al. 2018, Mol Metab — LY3298176, discovery to clinical proof of concept
  willard: "https://pubmed.ncbi.nlm.nih.gov/32730231/", // Willard et al. 2020, JCI Insight — tirzepatide is an imbalanced and biased dual agonist
  novikoff: "https://pubmed.ncbi.nlm.nih.gov/33556643/", // Novikoff et al. 2021, Mol Metab — receptor signaling and trafficking of mono- and dual agonists
  sun: "https://pubmed.ncbi.nlm.nih.gov/35333651/", // Sun et al. 2022, PNAS — structural determinants of dual incretin receptor agonism
  jones: "https://pubmed.ncbi.nlm.nih.gov/29686402/", // Jones et al. 2018, Nat Commun — GLP-1 receptor trafficking and agonist efficacy
  elk: "https://pubmed.ncbi.nlm.nih.gov/37277609/", // El et al. 2023, Nat Metab — tirzepatide requires GIPR in human islets
  heise: "https://pubmed.ncbi.nlm.nih.gov/35468322/", // Heise et al. 2022, Lancet Diabetes Endocrinol — islet function and insulin sensitivity on tirzepatide
  samms: "https://pubmed.ncbi.nlm.nih.gov/34003802/", // Samms et al. 2021, J Clin Invest — GIPR agonism and weight-independent insulin sensitization in mice
  zhang: "https://pubmed.ncbi.nlm.nih.gov/33571454/", // Zhang et al. 2021, Cell Metab — GIP regulates body weight via CNS GIPR signaling
  borner: "https://pubmed.ncbi.nlm.nih.gov/34380697/", // Borner et al. 2021, Diabetes — GIPR agonism attenuates GLP-1R agonist-induced nausea in animals
  roell: "https://pubmed.ncbi.nlm.nih.gov/41391569/", // Roell et al. 2026, Mol Metab — a long-acting selective GIPR agonist in humans (phase 1)
  killion: "https://pubmed.ncbi.nlm.nih.gov/33020469/", // Killion et al. 2020, Nat Commun — chronic GIPR agonism desensitizes adipocyte GIPR
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "How does tirzepatide work?",
    a: "Tirzepatide is a single peptide that activates two hormone receptors: the GIP receptor and the GLP-1 receptor. Both are incretin receptors, which increase insulin release after eating and act on the brain to reduce appetite. It is built on the sequence of GIP, with a fatty-acid chain that lets it bind albumin and last about five days, so it is given once a week.",
  },
  {
    q: "Is tirzepatide just a GLP-1 drug plus a GIP drug?",
    a: "No. Laboratory studies show it is not an even mix. At the doses used clinically it engages the GIP receptor more fully than the GLP-1 receptor, and at the GLP-1 receptor it signals differently from natural GLP-1, favoring the cAMP pathway over beta-arrestin recruitment. It is better described as a GIP-like molecule with an unusual, partial style of GLP-1 activity.",
  },
  {
    q: "What does biased agonism mean?",
    a: "A receptor can send more than one signal when a hormone binds. The GLP-1 receptor activates a G-protein, which raises cAMP and drives insulin release, and it also recruits beta-arrestin, which switches the receptor off and pulls it inside the cell. A biased agonist favors one of those over the other. Tirzepatide favors cAMP, so it causes less receptor internalization than GLP-1 itself.",
  },
  {
    q: "Is tirzepatide more effective than semaglutide?",
    a: "In the head-to-head SURMOUNT-5 trial in adults with obesity and without diabetes, tirzepatide produced a mean weight reduction of 20.2% at 72 weeks compared with 13.7% for semaglutide. The trial was open-label and compared the maximum tolerated dose of each drug. It shows which molecule produced more weight loss; it does not show which feature of the molecule was responsible.",
  },
  {
    q: "Does the GIP part of tirzepatide actually do anything?",
    a: "The evidence says yes, though not all of it is from people. In human pancreatic islets, blocking the GIP receptor reduced the insulin response to tirzepatide. In mice, GIP receptor activity improved insulin sensitivity independently of weight loss and reduced food intake through the brain. And in an early human study, a long-acting drug that activates only the GIP receptor produced modest weight loss on its own.",
  },
  {
    q: "Why can both activating and blocking the GIP receptor cause weight loss?",
    a: "This is an unresolved question. One proposal is that continuous activation of the GIP receptor eventually desensitizes it in fat tissue, so a long-acting activator ends up behaving partly like a blocker there. Another is that activation and blockade act through different tissues. Drugs of both kinds have produced weight loss in trials when combined with GLP-1 activity.",
  },
];

// The simple picture vs. what the pharmacology shows.
const PICTURE: { row: string; simple: string; shown: string }[] = [
  { row: "Backbone", simple: "A GLP-1 drug with GIP added", shown: "Built on the GIP sequence" },
  { row: "Balance", simple: "Equal activity at both receptors", shown: "Engages the GIP receptor more than the GLP-1 receptor" },
  { row: "At the GIP receptor", simple: "Acts like GIP", shown: "Acts like GIP" },
  { row: "At the GLP-1 receptor", simple: "Acts like GLP-1", shown: "Favors cAMP over beta-arrestin; less receptor internalization" },
  { row: "Why it beat semaglutide", simple: "Two receptors are better than one", shown: "Not isolated by any trial" },
];

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Header ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/incretins-metabolic" className="text-accent hover:text-ink">
                Incretins &amp; metabolic
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
            <Section title="The explanation everyone uses">
              <P>
                The standard account of{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link>{" "}
                fits in a sentence.{" "}
                <Link href="/hormones/semaglutide" className={LINK}>Semaglutide</Link>{" "}
                activates one receptor, tirzepatide activates two, and two is more than
                one. The head-to-head result seems to settle it. In adults with obesity
                and without diabetes, tirzepatide produced a mean weight reduction of
                20.2% over 72 weeks against 13.7% for semaglutide (
                <a href={REF.surmount5} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Aronne et&nbsp;al., NEJM, 2025
                </a>
                ). The trial detail is on the{" "}
                <Link href="/compare/semaglutide-vs-tirzepatide" className={LINK}>
                  comparison page
                </Link>
                .
              </P>
              <P>
                The arithmetic is tidy and the picture behind it is of a GLP-1 drug
                with a GIP drug bolted on, each doing its own job at full strength.
                That picture is wrong in two specific ways, both documented by the
                people who made the molecule. Neither changes the trial result. Both
                change what the result means.
              </P>
            </Section>

            <Section title="First correction: it is mostly a GIP molecule">
              <P>
                Start with what tirzepatide is made from. It was not built by adding
                GIP activity to a GLP-1 peptide. It is a 39-amino-acid chain based on
                the sequence of{" "}
                <Link href="/hormones/gip" className={LINK}>GIP</Link>, modified so that
                it also fits the{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> receptor,
                with a fatty-acid chain attached for once-weekly dosing (
                <a href={REF.coskun} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Coskun et&nbsp;al., 2018
                </a>
                ).
              </P>
              <P>
                The heritage shows in how it behaves. When the developers worked out
                how much of each receptor the drug occupies at the doses that work in
                people, the answer was lopsided: tirzepatide engages the GIP receptor
                to a greater degree than the GLP-1 receptor. They called it an{" "}
                <Em>imbalanced</Em> agonist, and put the word in the title of their
                paper (
                <a href={REF.willard} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Willard et&nbsp;al., 2020
                </a>
                ). So the mental model of two equal halves is off before the biology
                even starts. The molecule leans on GIP.
              </P>
            </Section>

            <Section title="Second correction: the GLP-1 half is a different shape of signal">
              <P>
                The second correction is subtler and more interesting. A receptor is
                not a light switch. When GLP-1 binds its receptor, two things happen:
                the receptor turns on a G-protein that raises the messenger{" "}
                <Em>cAMP</Em>, which drives insulin release, and it also recruits a
                protein called <Em>beta-arrestin</Em>, which switches the receptor off
                and drags it inside the cell to be recycled. The first is the signal;
                the second is the shut-off.
              </P>
              <P>
                Tirzepatide does not pull both levers equally. At the GLP-1 receptor it
                favors the cAMP arm over beta-arrestin, and as a result it triggers
                less of the internalization that native GLP-1 causes (
                <a href={REF.willard} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Willard et&nbsp;al., 2020
                </a>
                ). That is what pharmacologists mean by <Em>biased</Em> agonism:
                same receptor, different mix of downstream signals. The trafficking
                studies tell the same story, with tirzepatide keeping more receptor at
                the cell surface than matched GLP-1 agonists (
                <a href={REF.novikoff} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Novikoff et&nbsp;al., 2021
                </a>
                ), and the structural work shows why: tirzepatide closely mimics GIP at
                the GIP receptor but sits in the GLP-1 receptor in a way that resists
                desensitization (
                <a href={REF.sun} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sun et&nbsp;al., PNAS, 2022
                </a>
                ).
              </P>
              <P>
                Why would keeping a receptor at the surface matter? Because a receptor
                that is pulled inside stops responding. Work on engineered GLP-1
                agonists found that compounds which avoid beta-arrestin and stay on the
                membrane can produce more sustained insulin release, and in mice did so
                with less nausea (
                <a href={REF.jones} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jones et&nbsp;al., 2018
                </a>
                ). Bias is not a quirk of tirzepatide; it is a design lever the whole
                field is now pulling. The point for reading the drug is that its GLP-1
                activity is not a copy of GLP-1 turned down a notch. It is a different
                shape of signal.
              </P>
              <SignalPicture />
            </Section>

            <Section title="Does the GIP half earn its place?">
              <P>
                If the molecule leans on GIP, the obvious question is whether GIP
                contributes anything, since the role of the GIP receptor in metabolism
                was contested for years. Three lines of evidence say it does, with the
                usual caveat about where each one comes from.
              </P>
              <P>
                In human pancreatic islets, blocking the GIP receptor lowered the
                insulin response to tirzepatide, direct evidence that the GIP arm is
                doing work in human tissue (
                <a href={REF.elk} target="_blank" rel="noopener noreferrer" className={LINK}>
                  El et&nbsp;al., Nat Metab, 2023
                </a>
                ). A clamp study in people traced the drug&rsquo;s glucose-lowering to
                concurrent gains in beta-cell function and insulin sensitivity (
                <a href={REF.heise} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Heise et&nbsp;al., 2022
                </a>
                ). And in mice, GIP receptor activity improved insulin sensitivity
                even when weight was held constant (
                <a href={REF.samms} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Samms et&nbsp;al., 2021
                </a>
                ), while GIP signaling in the brain was needed for the extra weight
                loss of GIP/GLP-1 co-agonism over GLP-1 alone (
                <a href={REF.zhang} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Zhang et&nbsp;al., 2021
                </a>
                ). There is even a tolerability angle: in animals, GIP receptor
                agonism blunted the nausea that GLP-1 agonism causes (
                <a href={REF.borner} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Borner et&nbsp;al., 2021
                </a>
                ), which would let a person tolerate more of the drug.
              </P>
              <Callout label="The genuinely strange part">
                The GIP receptor is the one target where both <Em>activating</Em> and{" "}
                <Em>blocking</Em> it have produced weight loss alongside GLP-1 activity.
                A selective GIP receptor <Em>agonist</Em> caused modest weight loss on
                its own in an early human study (
                <a href={REF.roell} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Roell et&nbsp;al., 2026
                </a>
                ), yet GIP receptor <Em>blockers</Em> also drive weight loss in the
                same combination. One proposed reconciliation is that constant agonism
                eventually desensitizes the receptor in fat tissue, ending up
                functionally like blockade (
                <a href={REF.killion} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Killion et&nbsp;al., 2020
                </a>
                ). This catalog takes the puzzle up on its own in{" "}
                <Link href="/insights/the-gip-paradox" className={LINK}>
                  the GIP paradox
                </Link>
                .
              </Callout>
            </Section>

            <Section title="What the trial does and does not show">
              <P>
                Return to the 20.2% versus 13.7%. It is a real, prospective,
                head-to-head result, and it establishes that this molecule produced
                more weight loss than that one at their respective maximum tolerated
                doses. What it cannot do is tell you <Em>why</Em>.
              </P>
              <P>
                The trial compared two finished drugs, not two mechanisms. It did not
                include a version of tirzepatide with the GIP activity removed, or one
                with the GLP-1 bias undone, so it cannot attribute the margin to the
                second receptor, to the imbalance, to the biased GLP-1 signaling, or
                simply to tirzepatide reaching a higher effective dose. Each of those
                is a live hypothesis. The clean &ldquo;two receptors beat one&rdquo;
                story is the one thing the trial was not designed to prove, however
                reasonable it sounds. That gap between a result and its mechanism is
                the recurring lesson of{" "}
                <Link href="/insights/mechanism-is-not-proof" className={LINK}>
                  mechanism is not proof
                </Link>
                , running here in the opposite direction: a solid clinical result whose
                mechanistic explanation is still an inference.
              </P>
              <TheTwoReadings />
            </Section>

            <Section title="Reading tirzepatide honestly">
              <P>
                None of this diminishes the drug. It makes it more interesting. The
                flat &ldquo;two is better than one&rdquo; summary hides the actual
                engineering, which is a GIP-based molecule carrying a deliberately
                reshaped GLP-1 signal, tuned by which pathways it favors and how long
                it stays on the receptor.
              </P>
              <Bullets
                items={[
                  ["Not a GLP-1 drug with GIP added", "Tirzepatide is built on the GIP sequence and modified to also hit the GLP-1 receptor, not the reverse."],
                  ["Imbalanced", "At clinical doses it occupies the GIP receptor more than the GLP-1 receptor. The two halves are not equal."],
                  ["Biased", "At the GLP-1 receptor it favors cAMP signaling over beta-arrestin, so it internalizes the receptor less than native GLP-1 does."],
                  ["The GIP half contributes", "Human islets, clamp studies and mouse work all point to real GIP-receptor contributions, including a possible easing of nausea — though some of this is preclinical."],
                  ["The trial is a result, not a mechanism", "SURMOUNT-5 shows tirzepatide produced more weight loss than semaglutide. It does not isolate which molecular feature caused the difference."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/tirzepatide" label="Tirzepatide reference (dual GIP/GLP-1 agonist)" />
                <CrossLink href="/compare/semaglutide-vs-tirzepatide" label="Semaglutide vs. tirzepatide — the head-to-head comparison" />
                <CrossLink href="/insights/the-gip-paradox" label="The GIP paradox — why activating and blocking GIP both cause weight loss" />
                <CrossLink href="/insights/the-triple-agonist" label="The triple agonist explained — adding the glucagon receptor" />
                <CrossLink href="/families/incretins-metabolic" label="The incretins & metabolic family" />
                <CrossLink href="/insights/glp-3-bull-case" label="The GLP-3 bull case" />
                <CrossLink href="/research?q=What%20does%20it%20mean%20that%20tirzepatide%20is%20an%20imbalanced%20and%20biased%20dual%20GIP%2FGLP-1%20receptor%20agonist%2C%20and%20how%20much%20does%20the%20GIP%20receptor%20contribute%3F" label="Ask the research agent about tirzepatide's mechanism" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not individualized medical advice or a prescription. Where a dose or regimen appears it is reported from its source as research literacy — so you can read the evidence yourself — not an instruction to dose.
              Specific compounds and trials are named to explain the science; verify any
              claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The GLP-1 receptor's two signals, and which one tirzepatide favors ── */
function SignalPicture() {
  const W = 720;
  const H = 230;
  const INK = "var(--color-ink)";
  const cx = 150;
  const cy = 115;

  const Head = ({ x, y, dir = 1 }: { x: number; y: number; dir?: number }) => (
    <path d={`M ${x} ${y} l ${-7 * dir} -4 v 8 z`} fill={INK} fillOpacity={0.45} />
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="The GLP-1 receptor sends two signals. The G-protein / cAMP arm drives insulin release; the beta-arrestin arm switches the receptor off and pulls it inside the cell. Native GLP-1 drives both. Tirzepatide favors the cAMP arm and causes less internalization, which is what 'biased agonism' means."
      >
        {/* receptor */}
        <rect x={cx - 66} y={cy - 28} width={132} height={56} rx={12} fill="color-mix(in srgb, var(--accent) 13%, transparent)" stroke="var(--accent)" strokeOpacity={0.6} strokeWidth={1.2} />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={INK} fillOpacity={0.9} fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">GLP-1 receptor</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill={INK} fillOpacity={0.5} fontSize="10.5">one receptor, two signals</text>

        {/* top arm: cAMP (favored) */}
        <line x1={cx + 66} y1={cy - 12} x2={454} y2={46} stroke="var(--accent)" strokeOpacity={0.75} strokeWidth={2.4} />
        <Head x={462} y={44} />
        <rect x={464} y={22} width={232} height={48} rx={10} fill="var(--panel)" stroke="var(--accent)" strokeOpacity={0.5} strokeWidth={1.2} />
        <text x={480} y={42} fill={INK} fillOpacity={0.9} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">G-protein → cAMP</text>
        <text x={480} y={59} fill={INK} fillOpacity={0.55} fontSize="10.5">the insulin signal · tirzepatide favors this</text>

        {/* bottom arm: beta-arrestin (reduced) */}
        <line x1={cx + 66} y1={cy + 12} x2={454} y2={184} stroke={INK} strokeOpacity={0.3} strokeWidth={1.4} strokeDasharray="4 4" />
        <Head x={462} y={186} />
        <rect x={464} y={162} width={232} height={48} rx={10} fill="var(--panel)" stroke={INK} strokeOpacity={0.2} strokeWidth={1.2} />
        <text x={480} y={182} fill={INK} fillOpacity={0.7} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">β-arrestin → internalize</text>
        <text x={480} y={199} fill={INK} fillOpacity={0.5} fontSize="10.5">the shut-off · tirzepatide drives this less</text>

        {/* labels for emphasis */}
        <text x={cx} y={cy + 52} textAnchor="middle" fill="var(--accent)" fontSize="10.5" fontWeight="600">biased toward the top arm</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Native GLP-1 drives both arms. Tirzepatide leans on the cAMP arm and triggers less
        of the beta-arrestin shut-off, keeping more receptor at the cell surface. That is
        &ldquo;biased&rdquo; agonism.
      </figcaption>
    </figure>
  );
}

/* ── Two readings of the same head-to-head result ── */
function TheTwoReadings() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[13px] leading-5">
          <caption className="sr-only">
            The simple picture of tirzepatide compared with what the pharmacology actually shows.
          </caption>
          <thead>
            <tr className="border-b border-ink/10 font-mono text-[11px] uppercase tracking-wide text-ink/45">
              <th scope="col" className="px-4 py-3 font-normal"><span className="sr-only">Feature</span></th>
              <th scope="col" className="px-4 py-3 font-normal">The simple picture</th>
              <th scope="col" className="px-4 py-3 font-normal text-accent">What the pharmacology shows</th>
            </tr>
          </thead>
          <tbody>
            {PICTURE.map((p) => (
              <tr key={p.row} className="border-b border-ink/[0.06] align-top last:border-0">
                <th scope="row" className="px-4 py-3 font-semibold text-ink">{p.row}</th>
                <td className="px-4 py-3 text-ink/65">{p.simple}</td>
                <td className="px-4 py-3 text-ink/80">{p.shown}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="border-t border-ink/[0.06] px-4 py-3 text-center text-xs text-ink/40">
        The head-to-head trial lives in the last row: a measured difference in weight loss,
        with the molecular reason for it still unproven.
      </figcaption>
    </figure>
  );
}