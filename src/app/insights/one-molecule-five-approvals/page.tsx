import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink, StatusNote } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("one-molecule-five-approvals")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What a Drug Trial Has to Prove: Endpoints, Surrogates and Why One Drug Needs Several FDA Approvals · Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "One Molecule, Five Approvals: What Each Claim Has to Prove · Peptide Hormone",
    description: insight.dek,
  },
};

// Primary sources, named inline.
const REF = {
  obesity: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/obesity-and-overweight-developing-drugs-and-biological-products-weight-reduction", // FDA draft guidance, January 2025
  surrogates: "https://www.fda.gov/drugs/development-resources/table-surrogate-endpoints-were-basis-drug-approval-or-licensure", // FDA — table of surrogate endpoints
  accelerated: "https://www.fda.gov/drugs/nda-and-bla-approvals/accelerated-approval-program", // FDA — accelerated approval program
  step1: "https://pubmed.ncbi.nlm.nih.gov/33567185/", // Wilding et al. 2021, NEJM — STEP 1
  select: "https://pubmed.ncbi.nlm.nih.gov/37952131/", // Lincoff et al. 2023, NEJM — SELECT
} as const;

// One row per claim. Each was a separate FDA decision resting on a separate
// trial with a different thing measured.
const CLAIMS: { claim: string; measured: string; kind: string; example: string }[] = [
  {
    claim: "Lowers blood sugar",
    measured: "HbA1c, a blood marker of average glucose",
    kind: "Validated surrogate",
    example: "Ozempic, 2017",
  },
  {
    claim: "Reduces body weight",
    measured: "Percent change in weight against placebo, over at least a year",
    kind: "Direct measurement",
    example: "Wegovy, 2021 · STEP 1",
  },
  {
    claim: "Prevents heart attack and stroke",
    measured: "Counted events: cardiovascular death, heart attack, stroke",
    kind: "Clinical outcome",
    example: "Wegovy, March 2024 · SELECT",
  },
  {
    claim: "Slows kidney disease",
    measured: "Counted events: kidney failure, steep loss of function, death",
    kind: "Clinical outcome",
    example: "Ozempic, January 2025 · FLOW",
  },
  {
    claim: "Treats fatty-liver inflammation (MASH)",
    measured: "Liver biopsy findings",
    kind: "Surrogate, accelerated approval",
    example: "Wegovy, August 2025 · ESSENCE",
  },
];

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "Why does one drug need several FDA approvals?",
    a: "Because an approval is for a specific claim, not for a molecule. Each claim on a label, such as lowering blood sugar, reducing weight or preventing heart attacks, has to be supported by a trial that measured that thing in the relevant patients. Semaglutide has been approved separately for glucose control, weight reduction, cardiovascular risk, kidney disease and a liver condition, each on its own evidence.",
  },
  {
    q: "What is a surrogate endpoint?",
    a: "A measurement that stands in for the outcome patients actually care about. Blood sugar stands in for the complications of diabetes; a liver biopsy stands in for liver failure. Surrogates let trials finish in a year or two instead of a decade. Some are well validated. Others are only reasonably likely to predict benefit, and approvals resting on those come with a requirement to confirm the benefit later.",
  },
  {
    q: "How much weight loss does a drug need to show for FDA approval?",
    a: "FDA's January 2025 draft guidance sets the bar at a difference of at least 5 percentage points in mean weight reduction against the comparison group, statistically significant, after at least one year. Modern drugs clear it several times over, which is why the argument has moved to other questions: what is lost, whether it stays off, and whether health outcomes improve.",
  },
  {
    q: "Does an obesity drug have to prove it prevents heart attacks to be approved?",
    a: "No. A cardiovascular outcomes trial is not required for a weight-reduction approval. Preventing heart attacks is a separate claim needing its own trial. Wegovy was approved for weight in 2021 and gained the cardiovascular claim in March 2024, after the SELECT trial showed about a 20% reduction in major cardiovascular events.",
  },
  {
    q: "What is the difference between showing a drug is safe for the heart and showing it protects the heart?",
    a: "They are two different statistical tests. A safety trial aims to rule out harm: it succeeds if the drug is shown not to raise risk beyond a set margin. A benefit trial aims to show the drug lowers risk, which requires the whole plausible range of the result to sit below no-effect. A drug can pass the first without passing the second, and only the second supports a claim of protection.",
  },
  {
    q: "What is accelerated approval?",
    a: "A pathway for serious conditions that lets the FDA approve a drug on a surrogate measurement that is reasonably likely, but not yet proven, to predict real benefit. The sponsor must then run a confirmatory trial, and the approval can be withdrawn if it fails. Wegovy's 2025 approval for MASH is of this kind.",
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
            <Section title="An approval is for a claim, not a molecule">
              <P>
                <Link href="/hormones/semaglutide" className={LINK}>Semaglutide</Link> was
                approved in 2017. It was approved again in 2021, again in 2024, and twice
                more in 2025, to count only five of its approvals. The molecule did not change between those dates. What
                changed each time was a sentence on the label: a new thing the
                manufacturer was allowed to say the drug does.
              </P>
              <P>
                This is the part of drug regulation that most reporting skips, and it
                explains a great deal. &ldquo;FDA-approved&rdquo; is never a property of
                a molecule on its own. It is a property of a molecule <Em>for a
                stated use</Em>, backed by a trial that measured that use. To read any
                claim about what a peptide drug does, the first question is which
                approval the claim belongs to, and what that trial had to count.
              </P>
              <ClaimTable />
            </Section>

            <Section title="Three kinds of thing a trial can measure">
              <P>
                The right-hand side of that table is doing the work. Every trial has a
                primary <Em>endpoint</Em>: the one measurement, chosen in advance, on
                which it succeeds or fails. Endpoints come in three grades.
              </P>
              <Bullets
                items={[
                  [
                    "Clinical outcomes",
                    "how a patient feels, functions or survives. Heart attacks, strokes, kidney failure, death. These are what medicine is for, and they are slow and expensive to count: thousands of people followed for years until enough events occur",
                  ],
                  [
                    "Validated surrogates",
                    "a laboratory or physical measurement with a long record of predicting outcomes. Blood sugar and blood pressure are the classic cases. A trial can read them in months",
                  ],
                  [
                    "Reasonably likely surrogates",
                    "a measurement that should predict benefit on the biology but has not yet been shown to. These support only a provisional kind of approval, covered below",
                  ],
                ]}
              />
              <P>
                FDA publishes the list of surrogates it has accepted (
                <a href={REF.surrogates} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA
                </a>
                ). The trade is always the same. A surrogate buys speed and costs
                certainty, because a drug can move the marker without moving the
                outcome. This is the same gap{" "}
                <Link href="/insights/mechanism-is-not-proof" className={LINK}>
                  mechanism is not proof
                </Link>{" "}
                describes one level down: a marker moving is evidence, and it is not the
                thing itself.
              </P>
            </Section>

            <Section title="The bar for weight is lower than the headlines suggest">
              <P>
                Body weight is unusual, because it is both easy to measure and the thing
                patients are asking for. FDA treats it as an endpoint in its own right,
                and the bar it sets is modest. Under the agency&rsquo;s January 2025
                draft guidance, a weight-reduction drug is generally considered
                effective if mean weight loss beats the comparison group by at least
                five percentage points after at least a year, and the difference is
                statistically significant (
                <a href={REF.obesity} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA draft guidance
                </a>
                ).
              </P>
              <P>
                Semaglutide cleared that by a wide margin in 2021: 14.9% against 2.4% on
                placebo (
                <a href={REF.step1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wilding et&nbsp;al., NEJM, 2021
                </a>
                ). Everything since has cleared it by more. So the approval question
                for a new obesity drug is no longer whether it works on the scale. The
                live questions are the ones the five-point rule does not ask:{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>
                  what is being lost
                </Link>
                ,{" "}
                <Link href="/insights/when-the-drug-works-too-well" className={LINK}>
                  what happens on stopping
                </Link>
                , and whether anything beyond weight improves. (Which of a
                trial&rsquo;s weight figures counts toward the bar is its own subject:
                see{" "}
                <Link href="/insights/two-numbers-one-trial" className={LINK}>
                  two numbers, one trial
                </Link>
                .)
              </P>
              <Callout label="What approval for weight does not include">
                A cardiovascular outcomes trial is not required to approve a drug for
                weight reduction. An obesity drug can reach the market with no evidence
                either way on whether it prevents heart attacks. That is a separate
                claim, and it has to be earned separately.
              </Callout>
            </Section>

            <Section title="Safe for the heart is not the same as good for the heart">
              <P>
                Heart trials are where the most careless reading happens, because two
                different results are both reported as &ldquo;positive.&rdquo;
              </P>
              <P>
                A cardiovascular trial counts major events (cardiovascular death, heart
                attack, stroke) in the drug group and the placebo group and expresses
                the comparison as a ratio. A ratio of 1.0 means no difference. Below 1.0
                favours the drug. Because any trial is a sample, the ratio comes with a
                range of values the data are compatible with, and the conclusion
                depends on where that whole range sits.
              </P>
              <Bullets
                items={[
                  [
                    "A safety result",
                    "the range excludes meaningful harm. The trial has shown the drug does not raise risk beyond a margin set in advance. This is called non-inferiority, and it supports the statement that the drug is not dangerous to the heart",
                  ],
                  [
                    "A benefit result",
                    "the whole range sits below 1.0. The trial has shown the drug lowers risk. This is superiority, and only this supports a claim of protection",
                  ],
                ]}
              />
              <P>
                The SELECT trial of semaglutide was a benefit result: major
                cardiovascular events fell by about 20% in people with obesity and
                existing heart disease, and that became a new line on the Wegovy label
                in March 2024 (
                <a href={REF.select} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lincoff et&nbsp;al., NEJM, 2023
                </a>
                ).
              </P>
              <P>
                The newer molecules are not there yet, and the two on this site
                illustrate both other positions. Survodutide&rsquo;s cardiovascular
                trial reported in November 2026 that the drug did not increase events
                against placebo: a safety result. Retatrutide&rsquo;s reported a ratio
                of 1.12 with a range from 0.64 to 1.96, which spans both benefit and
                harm and so establishes neither; the trial was too small in events to
                say (see{" "}
                <Link href="/insights/glp-3-bull-case" className={LINK}>
                  the GLP-3 bull case
                </Link>
                ). Neither result is bad news. Neither is a claim of protection, and
                assuming a new drug inherits semaglutide&rsquo;s heart benefit because it
                produces more weight loss is an inference no trial has yet tested.
              </P>
            </Section>

            <Section title="Accelerated approval: a promise with a deadline">
              <P>
                For serious conditions with few treatments, waiting years for clinical
                outcomes has a cost of its own. Accelerated approval is the compromise.
                FDA may approve on a surrogate that is reasonably likely to predict
                benefit, on the condition that the sponsor runs a confirmatory trial
                afterwards, and the approval can be withdrawn if that trial fails (
                <a href={REF.accelerated} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA
                </a>
                ).
              </P>
              <P>
                Semaglutide&rsquo;s fifth approval is of this kind. In August 2025
                Wegovy was cleared for MASH, a form of fatty-liver disease with
                inflammation and scarring, on the basis of liver biopsies: more people
                on the drug saw the inflammation resolve without the scarring getting
                worse. Biopsy findings are a surrogate. Whether treated patients go on
                to have less cirrhosis and liver failure is what the continuing part of
                the trial has to show. The same pathway is how{" "}
                <Link href="/hormones/ss-31" className={LINK}>elamipretide</Link> reached
                its first approval.
              </P>
              <P>
                An accelerated approval is a real approval. The drug can be prescribed
                and the label says so. But it is a different epistemic object from an
                approval on outcomes, and a careful reader keeps the two apart.
              </P>
            </Section>

            <Section title="What this changes about how to read a claim">
              <Bullets
                items={[
                  [
                    "Ask which claim",
                    "An approved drug is approved for something. A benefit that is not on the label has not been reviewed, however plausible it is",
                  ],
                  [
                    "Ask what was counted",
                    "Events in patients, a validated marker, or a marker that is only expected to predict benefit. The same word, approved, covers all three",
                  ],
                  [
                    "Ask who was in the trial",
                    "SELECT enrolled people with existing heart disease. Its result is evidence about them, and weaker evidence about anyone else",
                  ],
                  [
                    "For heart results, ask which test was passed",
                    "Not harmful and protective are different findings",
                  ],
                  [
                    "Do not carry a result from one molecule to the next",
                    "Sharing a receptor is a reason to run the trial. It is not a substitute for it",
                  ],
                ]}
              />
              <P>
                The same discipline applies with more force to peptides that have never
                been through any of this. An approved drug has cleared at least one
                endpoint in at least one trial. A research peptide sold on the strength
                of its mechanism has cleared none, which is the argument of{" "}
                <Link href="/insights/the-trial-that-hasnt-reported" className={LINK}>
                  the trial that hasn&rsquo;t reported
                </Link>
                .
              </P>
            </Section>

            <Section title="The short version">
              <Bullets
                items={[
                  ["Approval attaches to a claim", "Each line on a label rests on its own trial with its own endpoint."],
                  ["Three grades of endpoint", "Clinical outcomes, validated surrogates, and surrogates only reasonably likely to predict benefit."],
                  ["The weight bar is five points over a year", "Clearing it says nothing about the heart, the kidneys or what is lost."],
                  ["Safe and protective are different results", "Ruling out harm is not showing benefit."],
                  ["Accelerated approval is provisional", "It rests on a surrogate and a confirmatory trial still owed."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/two-numbers-one-trial" label="Two numbers, one trial" />
                <CrossLink href="/insights/mechanism-is-not-proof" label="Mechanism is not proof" />
                <CrossLink href="/insights/how-peptide-compounding-rules-work" label="How the compounding rules work" />
                <CrossLink href="/insights/glp-3-bull-case" label="The GLP-3 bull case" />
                <CrossLink href="/insights/the-arm-that-points-at-the-liver" label="Survodutide — the arm that points at the liver" />
                <CrossLink href="/hormones/semaglutide" label="Semaglutide — current regulatory status" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on how drug approvals are structured, summarized and
              simplified from FDA&rsquo;s public pages and the published trials. Not medical
              or regulatory advice. Drugs are named to explain the method, not to endorse
              any use.{" "}
              <StatusNote of={["semaglutide", "tirzepatide", "ss-31", "retatrutide", "survodutide"]} />
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Semaglutide's five approvals: one row per claim ─────────────────────────
   The point of the table is the middle columns: the same molecule, a different
   thing measured each time.                                                    */
function ClaimTable() {
  return (
    <figure className="my-2 overflow-x-auto rounded-2xl border border-ink/10 bg-surface p-4">
      <table className="w-full min-w-[34rem] text-left text-[14px] leading-6">
        <caption className="sr-only">
          Five separate FDA approvals of semaglutide, the claim each allowed, what the supporting
          trial measured, and the grade of that measurement
        </caption>
        <thead className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
          <tr>
            <th scope="col" className="pb-3 pr-4 font-medium">The claim</th>
            <th scope="col" className="pb-3 pr-4 font-medium">What the trial counted</th>
            <th scope="col" className="pb-3 pr-4 font-medium">Grade</th>
            <th scope="col" className="pb-3 font-medium">Approved</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/[0.06]">
          {CLAIMS.map((c) => (
            <tr key={c.claim} className="align-top">
              <th scope="row" className="py-2.5 pr-4 font-semibold text-ink">{c.claim}</th>
              <td className="py-2.5 pr-4 text-ink/70">{c.measured}</td>
              <td className="py-2.5 pr-4 text-ink/70">{c.kind}</td>
              <td className="py-2.5 font-mono text-[12.5px] text-ink/60">{c.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-3 text-center text-xs text-ink/40">
        Semaglutide, United States. One molecule; five decisions, each on a different measurement.
        A selection: it has further approvals, including its tablet forms.
      </figcaption>
    </figure>
  );
}
