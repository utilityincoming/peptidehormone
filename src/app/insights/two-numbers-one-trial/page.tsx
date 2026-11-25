import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink, StatusNote } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("two-numbers-one-trial")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Why Weight-Loss Trials Report Two Numbers: Treatment-Policy vs Efficacy Estimand Explained · Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "Two Numbers, One Trial: Why the Headline and the Label Disagree · Peptide Hormone",
    description: insight.dek,
  },
};

// Primary sources, named inline so each pair of figures stays checkable.
const REF = {
  e9r1: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/e9r1-statistical-principles-clinical-trials-addendum-estimands-and-sensitivity-analysis-clinical", // ICH E9(R1) — estimands addendum
  step1: "https://pubmed.ncbi.nlm.nih.gov/33567185/", // Wilding et al. 2021, NEJM — STEP 1, semaglutide
  surmount1: "https://pubmed.ncbi.nlm.nih.gov/35658024/", // Jastreboff et al. 2022, NEJM — SURMOUNT-1, tirzepatide
  redefine: "https://pubmed.ncbi.nlm.nih.gov/40544433/", // Garvey et al. 2025, NEJM — REDEFINE-1, CagriSema
  triumph1: "https://pubmed.ncbi.nlm.nih.gov/42814954/", // Jastreboff et al. 2026, NEJM — TRIUMPH-1, retatrutide
  lilly1: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss", // 21 May 2026 — TRIUMPH-1 efficacy estimand
} as const;

// One row per pivotal obesity trial, top dose. `policy` is the analysis that
// keeps what really happened to people who stopped the drug; `efficacy` is the
// analysis that models everyone staying on it. Mean % body-weight loss.
const TRIALS: { drug: string; trial: string; weeks: number; policy: number; efficacy: number }[] = [
  { drug: "Semaglutide", trial: "STEP 1", weeks: 68, policy: 14.9, efficacy: 16.9 },
  { drug: "Tirzepatide", trial: "SURMOUNT-1", weeks: 72, policy: 20.9, efficacy: 22.5 },
  { drug: "CagriSema", trial: "REDEFINE-1", weeks: 68, policy: 20.4, efficacy: 22.7 },
  { drug: "Retatrutide", trial: "TRIUMPH-1", weeks: 80, policy: 25.0, efficacy: 28.3 },
];

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "Why do weight-loss drug trials report two different results?",
    a: "Because they answer two different questions with the same data. One analysis asks what happened to everyone assigned the drug, whether or not they kept taking it. The other asks what the drug would do if everyone stayed on it as intended. People who stop a weight-loss drug regain weight, so the first number is always the smaller one. Both are legitimate; they are not interchangeable.",
  },
  {
    q: "What is a treatment-policy estimand?",
    a: "It is the analysis that measures the effect of being assigned a treatment, regardless of what happened afterwards. Participants who stopped the drug are still weighed and their real weights are used. Lilly's papers call a closely related analysis the treatment-regimen estimand. It is the analysis regulators lean on, and the one United States labels for obesity drugs report.",
  },
  {
    q: "What is an efficacy estimand?",
    a: "It is the analysis that estimates what would have happened if every participant had stayed on the drug for the whole trial. Measurements taken after someone stops are set aside and replaced with a statistical model. Novo Nordisk calls it the trial-product estimand. It describes the molecule's effect when taken; it does not describe what a typical group of patients experienced.",
  },
  {
    q: "Is the on-treatment number just the people who finished the trial?",
    a: "No. A completers-only analysis drops people who stopped, which breaks the randomization. The efficacy estimand still includes everyone who was randomized; what changes is how their data after stopping are handled. That is a real distinction, but the practical effect is similar: the figure reflects staying on the drug.",
  },
  {
    q: "Which number should I compare between drugs?",
    a: "The same kind for each drug. Comparing one drug's efficacy figure with another's treatment-policy figure builds in a gap of two or three percentage points that has nothing to do with the molecules. Even like-for-like figures come from different trials, populations and durations, so they are context, not a ranking. Only a head-to-head trial ranks two drugs.",
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
            <Section title="The same arm, the same day, two results">
              <P>
                In the pivotal trial of{" "}
                <Link href="/hormones/retatrutide" className={LINK}>retatrutide</Link>, the
                top-dose group lost 25.0% of body weight at 80 weeks. In the same trial,
                the same group, at the same 80 weeks, lost 28.3%. The first figure is in
                the journal paper (
                <a href={REF.triumph1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jastreboff et&nbsp;al., NEJM, 2026
                </a>
                ). The second is in the company&rsquo;s announcement (
                <a href={REF.lilly1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 2026
                </a>
                ). Neither is a mistake and neither is spin in the usual sense. They are
                answers to two different questions, and the trial was designed in advance
                to answer both.
              </P>
              <P>
                This happens in every modern obesity trial, and it is the single most
                common reason two articles about the same drug quote different numbers.
                Once you know which question each number answers, you can tell at a
                glance which one you are being shown, and whether a comparison between
                two drugs is fair.
              </P>
            </Section>

            <Section title="What goes wrong in the middle of a trial">
              <P>
                A trial randomizes people to a drug or a placebo and weighs them at the
                end. The complication is what happens in between. Over a year and a half
                some participants stop taking the drug: side effects, a move, a
                pregnancy, loss of interest. With a weight-loss drug this matters a great
                deal, because{" "}
                <Link href="/insights/when-the-drug-works-too-well" className={LINK}>
                  people who stop regain weight
                </Link>
                .
              </P>
              <P>
                So at the final weigh-in, the drug group contains two kinds of people:
                those still on the drug, and those who stopped months ago and have
                partly rebounded. The statistician has to decide what to do with the
                second kind. There are two defensible choices, and each one defines a
                different quantity. Trial statisticians call that quantity the{" "}
                <Em>estimand</Em>: the precise thing the trial is trying to estimate.
              </P>
            </Section>

            <Section title="Question one: what happened to everyone we assigned the drug?">
              <P>
                The first choice is to use the weights as they really were. Someone who
                stopped at month four and regained most of the loss is counted at their
                real final weight. The result is the average outcome of a policy:
                prescribe this drug to this kind of person and see what follows,
                stopping included.
              </P>
              <P>
                This is the <Em>treatment-policy</Em> estimand. Lilly&rsquo;s trials use
                a closely related version it calls the <Em>treatment-regimen</Em>{" "}
                estimand. It is the smaller number, it is the primary analysis in the
                published papers, and it is the figure that appears on United States
                drug labels. Regulators prefer it for a plain reason: it keeps the
                protection of randomization intact and it does not depend on a model of
                what might have been.
              </P>
            </Section>

            <Section title="Question two: what does the drug do if you keep taking it?">
              <P>
                The second choice is to ask a hypothetical. Suppose nobody had stopped.
                Weights measured after a participant quit the drug are set aside, and a
                statistical model fills in the path they would have followed had they
                continued, based on the people who did.
              </P>
              <P>
                This is the <Em>efficacy</Em> estimand; Novo Nordisk calls it the{" "}
                <Em>trial-product</Em> estimand. It is the larger number, and it is the
                one press releases tend to lead with. It is a real analysis with a real
                use: it is the closest the trial gets to the effect of the molecule
                itself, separated from the question of whether people tolerate it.
              </P>
              <Callout label="What it is not">
                The efficacy figure is often described as &ldquo;on-treatment&rdquo;,
                which makes it sound like a count of the people who finished. It is not.
                Dropping everyone who stopped would compare the hardiest drug-takers
                with the whole placebo group, and that is no longer a randomized
                comparison. The efficacy estimand keeps everyone in and changes only how
                their later data are treated. The distinction is technical, but it is why
                the number is respectable rather than a trick.
              </Callout>
            </Section>

            <Section title="The gap, across four trials">
              <P>
                Here are both figures for the top dose of four pivotal obesity trials.
                In every row the two marks describe the same people.
              </P>
              <GapChart />
              <P>
                Two things are worth reading off the chart. First, the gap is not a
                constant: it runs from under two points to over three. It grows with the
                share of people who stop and with how long the trial runs, because both
                widen the distance between what happened and what would have. A drug
                with a large gap is not a worse drug, but the gap is telling you
                something about how many people did not stay on it.
              </P>
              <P>
                Second, the gap is large enough to reorder the drugs if you mix the two
                kinds. Tirzepatide&rsquo;s efficacy figure (22.5%) is higher than
                CagriSema&rsquo;s treatment-policy figure (20.4%) and lower than its
                efficacy figure (22.7%). Which drug &ldquo;wins&rdquo; depends entirely
                on which pair of numbers a writer happened to pick up (
                <a href={REF.surmount1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  SURMOUNT-1
                </a>
                ,{" "}
                <a href={REF.redefine} target="_blank" rel="noopener noreferrer" className={LINK}>
                  REDEFINE-1
                </a>
                ,{" "}
                <a href={REF.step1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  STEP 1
                </a>
                ).
              </P>
            </Section>

            <Section title="Why trials now state both">
              <P>
                Until recently a trial could report a result without saying which of
                these questions it had answered, and readers were left to dig through
                the methods. In 2019 the international body that harmonizes drug
                regulation added a requirement that trials name their estimand in
                advance, including how they will treat events such as stopping the drug (
                <a href={REF.e9r1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  ICH E9(R1)
                </a>
                ). The obesity trials of the 2020s were designed under it, which is why
                they report two clearly labelled numbers where older trials often
                reported one ambiguous one.
              </P>
              <P>
                That is progress, and it has a side effect. Two labelled numbers mean a
                sponsor can lead with the larger one and a critic with the smaller one,
                and both can say truthfully that the figure is from the trial.
              </P>
            </Section>

            <Section title="Three more ways one trial gives several numbers">
              <P>
                The estimand is the biggest source of mismatched figures, but not the
                only one. Before comparing any two numbers, check these as well.
              </P>
              <Bullets
                items={[
                  [
                    "Raw or placebo-subtracted",
                    "People on placebo lose some weight too, usually two to four percent, because everyone in the trial gets diet and activity counselling. A drug that produced 25% against a placebo's 4% has a placebo-subtracted effect of 21%. Both are quoted",
                  ],
                  [
                    "Which dose",
                    "Trials test several doses. Headlines use the top one. The dose most people end up on in practice may be lower",
                  ],
                  [
                    "Which week",
                    "Weight is still falling at the end of most of these trials. A result at 80 weeks is not comparable with one at 68, and an extension figure at 104 weeks is a different measurement again",
                  ],
                ]}
              />
            </Section>

            <Section title="Which number to use">
              <P>
                Neither is the true one. They are for different jobs.
              </P>
              <Bullets
                items={[
                  [
                    "For what to expect across a group of patients",
                    "use the treatment-policy figure. It includes the reality that some people stop",
                  ],
                  [
                    "For what the molecule does when taken",
                    "use the efficacy figure, and remember it assumes a level of persistence the trial itself did not achieve",
                  ],
                  [
                    "For comparing two drugs",
                    "use the same kind for both, and treat the result as context. Different trials enrol different people for different lengths of time. Only a head-to-head trial is a ranking",
                  ],
                ]}
              />
              <P>
                This site quotes the published treatment-policy analysis as the main
                figure and names the other when it is the one in circulation, as in{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>
                  the retatrutide explainer
                </Link>{" "}
                and{" "}
                <Link href="/insights/glp-3-bull-case" className={LINK}>
                  the GLP-3 bull case
                </Link>
                . When a page anywhere gives a single weight-loss percentage with no
                label on it, the safe assumption is that it is the larger one.
              </P>
            </Section>

            <Section title="The short version">
              <Bullets
                items={[
                  ["Two numbers, two questions", "What happened to everyone assigned the drug, and what the drug does if everyone stays on it."],
                  ["The smaller one is on the label", "The treatment-policy (or treatment-regimen) analysis is the published primary result and the regulator's reference."],
                  ["The larger one is in the headline", "The efficacy (or trial-product) analysis is real, but it is a modelled hypothetical."],
                  ["The gap is two to three points", "Enough to reorder drugs if the two kinds are mixed."],
                  ["Check dose, week and placebo too", "Each can move a figure as much as the estimand does."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/one-molecule-five-approvals" label="One molecule, five approvals — what each claim has to prove" />
                <CrossLink href="/insights/the-triple-agonist" label="What is retatrutide? The triple agonist explained" />
                <CrossLink href="/insights/glp-3-bull-case" label="The GLP-3 bull case" />
                <CrossLink href="/insights/not-two-drugs-in-one" label="Why tirzepatide isn't two drugs in one" />
                <CrossLink href="/insights/when-the-drug-works-too-well" label="Stopping GLP-1 drugs: what happens next" />
                <CrossLink href="/insights/mechanism-is-not-proof" label="Mechanism is not proof" />
                <CrossLink href="/insights/the-trial-that-hasnt-reported" label="The trial that hasn't reported" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on how clinical trial results are analysed and
              reported, summarized and simplified from the public record. Not medical
              advice. Trial figures are quoted to explain the method, not to rank or
              endorse any drug.{" "}
              <StatusNote of={["retatrutide", "cagrisema", "semaglutide", "tirzepatide"]} />
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Dumbbell chart: both analyses of the same arm, four trials ──────────────
   One row per trial. The filled dot is the treatment-policy figure (what
   happened), the open ring the efficacy figure (if everyone stayed on drug);
   the bar between them is the gap the article is about. Colours validated as a
   two-slot categorical pair on the site surface; shape differs as well, so the
   pair never rests on colour alone.                                            */
function GapChart() {
  const POLICY = "#34566A";
  const EFFICACY = "#3E6B58";
  const W = 620;
  const LEFT = 150;
  const RIGHT = 36;
  const TOP = 58;
  const ROW = 50;
  const MIN = 12;
  const MAX = 30;
  const H = TOP + TRIALS.length * ROW + 34;
  const x = (v: number) => LEFT + ((v - MIN) / (MAX - MIN)) * (W - LEFT - RIGHT);
  const ticks = [15, 20, 25, 30];
  const font = "var(--font-space-grotesk), sans-serif";
  const mono = "var(--font-geist-mono), monospace";

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`Mean body-weight loss at the top dose of four pivotal obesity trials, shown two ways for the same participants. ${TRIALS.map(
          (t) => `${t.drug}, ${t.trial}, ${t.weeks} weeks: ${t.policy.toFixed(1)} percent on the treatment-policy analysis and ${t.efficacy.toFixed(1)} percent on the efficacy analysis`,
        ).join(". ")}. The efficacy figure is higher in every trial, by 1.6 to 3.3 percentage points.`}
      >
        {/* legend */}
        <circle cx={LEFT + 6} cy={18} r="5.5" fill={POLICY} />
        <text x={LEFT + 18} y={22} fill="var(--color-ink)" fillOpacity="0.75" fontSize="11.5" fontFamily={font}>
          What happened (treatment-policy)
        </text>
        <circle cx={LEFT + 226} cy={18} r="4.5" fill="var(--surface)" stroke={EFFICACY} strokeWidth="2.5" />
        <text x={LEFT + 238} y={22} fill="var(--color-ink)" fillOpacity="0.75" fontSize="11.5" fontFamily={font}>
          If everyone stayed on drug (efficacy)
        </text>

        {/* recessive grid */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={TOP - 14} x2={x(t)} y2={TOP + TRIALS.length * ROW - 12} stroke="var(--color-ink)" strokeOpacity="0.07" />
            <text x={x(t)} y={H - 8} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10.5" fontFamily={mono}>
              {t}%
            </text>
          </g>
        ))}

        {TRIALS.map((t, i) => {
          const y = TOP + i * ROW + 6;
          const gap = (t.efficacy - t.policy).toFixed(1);
          return (
            <g key={t.trial}>
              <title>{`${t.drug} (${t.trial}, ${t.weeks} weeks): ${t.policy.toFixed(1)}% treatment-policy, ${t.efficacy.toFixed(1)}% efficacy, gap ${gap} points`}</title>
              <text x={0} y={y - 1} fill="var(--color-ink)" fillOpacity="0.9" fontSize="13.5" fontWeight="600" fontFamily={font}>
                {t.drug}
              </text>
              <text x={0} y={y + 15} fill="var(--color-ink)" fillOpacity="0.45" fontSize="10.5" fontFamily={mono}>
                {t.trial} · {t.weeks} wk
              </text>
              {/* the gap */}
              <line x1={x(t.policy)} y1={y} x2={x(t.efficacy)} y2={y} stroke="var(--color-ink)" strokeOpacity="0.28" strokeWidth="2" />
              <circle cx={x(t.policy)} cy={y} r="6" fill={POLICY} stroke="var(--surface)" strokeWidth="2" />
              <circle cx={x(t.efficacy)} cy={y} r="5" fill="var(--surface)" stroke={EFFICACY} strokeWidth="2.5" />
              <text x={x(t.policy) - 11} y={y + 4} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.85" fontSize="12" fontFamily={mono}>
                {t.policy.toFixed(1)}
              </text>
              <text x={x(t.efficacy) + 11} y={y + 4} fill="var(--color-ink)" fillOpacity="0.85" fontSize="12" fontFamily={mono}>
                {t.efficacy.toFixed(1)}
              </text>
              <text x={(x(t.policy) + x(t.efficacy)) / 2} y={y + 20} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10" fontFamily={mono}>
                +{gap}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Mean % body-weight loss at the top dose, both analyses of the same participants.
        Different trials, populations and durations: read each row&rsquo;s gap, not the order
        of the rows.
      </figcaption>
    </figure>
  );
}
