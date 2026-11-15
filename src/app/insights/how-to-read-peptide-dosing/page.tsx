import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { DocumentedRange } from "@/components/DocumentedRange";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("how-to-read-peptide-dosing")!;

export const metadata: Metadata = {
  title: "Peptide Dosing: Label vs Trial vs Community — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

const REF = {
  wegovy: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/215256s029lbl.pdf",
  zepbound: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/217806s000lbl.pdf",
  step1: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
  surmount1: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
  cagri: "https://pubmed.ncbi.nlm.nih.gov/34798060/",
  survodutide: "https://pubmed.ncbi.nlm.nih.gov/38330987/",
  falutz: "https://pubmed.ncbi.nlm.nih.gov/18057338/",
  egriftaWr: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/022505s020lbl.pdf",
  forteo: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/021318s057lbl.pdf",
  vyleesi: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/210557s002lbl.pdf",
  increlex: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/021839s033lbl.pdf",
  fdaErrors:
    "https://www.fda.gov/drugs/human-drug-compounding/fda-alerts-health-care-providers-compounders-and-patients-dosing-errors-associated-compounded",
} as const;

const FAQS = [
  {
    q: "What dose of semaglutide is used for weight loss?",
    a: "On the Wegovy label, titration starts at 0.25 mg once weekly for four weeks and the usual recommended maintenance dose is 2.4 mg once weekly, with 1.7 mg as an alternative. That is not the Ozempic diabetes label (0.5, 1, or 2 mg) and not the oral tablet. STEP 1 judged 2.4 mg, not the 0.25 mg start. The documented-range box on this site for semaglutide is Wegovy's 1.7–2.4 mg maintenance span.",
  },
  {
    q: "Is a trial protocol the same as a safe dose?",
    a: "No. A registered or published protocol is what that study administered to that population, on that schedule, with that stopping rule. It is evidence of what was studied, not a finding that the regimen is established, approved, or appropriate for a reader. Missing details — units, route, titration, who was excluded — are gaps, not invitations to fill them in.",
  },
  {
    q: "Why do documented ranges skip the starting dose?",
    a: "Because the number people quote from a trial is almost always the maintenance or assigned target, and the number that actually starts in a pen is almost always lower. Wegovy starts at 0.25 mg; Zepbound at 2.5 mg; survodutide's phase 2 spent 20 of 46 weeks escalating; cagrilintide's phase 2 spent up to six of 26. The box reports the published target span. The note carries the start.",
  },
  {
    q: "What went wrong in the compounded semaglutide dosing errors?",
    a: "FDA's July 2024 compounding alert describes patients and clinicians mixing milligrams, milliliters, and insulin-syringe 'units' on products that do not share the approved pens' fixed concentrations. People drew 50 units instead of 5, or a prescription of 25 units went out when 5 were intended — five- to twenty-fold overdoses, some hospitalized. That is a unit-conversion failure, not a pharmacology failure.",
  },
  {
    q: "Does IGF-1 LR3 have an approved human dose?",
    a: "No. There are no controlled human trials of LR3. The range this reference documents is community convention, labeled anecdotal. The closest labeled product is mecasermin (Increlex), recombinant IGF-1, starting 0.04–0.08 mg/kg twice daily for severe primary IGF-1 deficiency — a different analog, a different population, and not a conversion factor.",
  },
];

const KINDS: { kind: string; answers: string; example: string; blind: string }[] = [
  {
    kind: "Label",
    answers: "What this named product, indication, and jurisdiction tells a prescriber to give.",
    example: "Wegovy 2.4 mg weekly; Forteo 20 mcg daily; Vyleesi 1.75 mg as needed.",
    blind: "Any other product of the same molecule. Ozempic is not Wegovy. Egrifta WR is not Egrifta SV.",
  },
  {
    kind: "Trial protocol",
    answers: "What that study administered, to whom, for how long, including the ramp.",
    example: "Cagrilintide 0.3–4.5 mg weekly, up to 6 weeks' escalation (Lau 2021).",
    blind: "Approval, interchangeability with a label, and whether a grey-market vial matches the trial material.",
  },
  {
    kind: "Preclinical",
    answers: "What a mouse, rat, or cell experiment used.",
    example: "A milligram-per-kilogram rodent dose that does not convert by body weight to a human.",
    blind: "Human pharmacokinetics, human tolerability, and almost every community 'human equivalent.'",
  },
  {
    kind: "Community",
    answers: "What a forum, vendor page, or knowledge-transfer document currently repeats.",
    example: "IGF-1 LR3 100–500 mcg, labeled anecdotal in this reference.",
    blind: "Whether anyone measured it in people. Provenance is the grade, not confidence.",
  },
];

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(94,168,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/growth-repair" className="text-accent-blue hover:text-ink">
                Growth &amp; repair
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
            <Section title="The milligram is not the instruction">
              <P>
                Peptide pages talk in milligrams as if the unit carried its own meaning.
                It does not. A milligram is a mass. What it <Em>is</Em> — a labeled
                maintenance dose, a trial arm, a rodent experiment, or a number someone
                repeated — lives in the sentence around it. Drop the sentence and the
                milligram starts doing other jobs: a start dose pretends to be a target,
                a mouse paper pretends to be a protocol, a compounded vial pretends to
                be a pen.
              </P>
              <P>
                This reference reports published regimens as research literacy, so you
                can check the evidence yourself. It does not pick a dose for a person.
                The four-kind split below is the whole method. Once you can name which
                kind you are looking at, most of the internet&rsquo;s dosing arguments
                collapse into a category error.
              </P>
              <Callout label="The governing rule">
                Cite the source beside the number, and keep the compound, formulation,
                population, units, route, frequency, and duration that the source
                actually reported. Missing details are gaps. They are not blanks to
                fill.
              </Callout>
            </Section>

            <Section title="Four kinds of milligram">
              <P>
                Approved products have a label. Human studies have a protocol. Animal
                and cell work have an experimental dose. Forums have a convention. Those
                four objects share a unit and almost nothing else. A label is specific
                to one named product and indication. A protocol is specific to one
                trial. Neither licenses the other, and neither licenses a
                research-chemical vial.
              </P>
              <KindTable />
              <P>
                The documented-range box used on insight pages is the planner&rsquo;s
                number with the provenance badge attached, so the two surfaces cannot
                disagree. For clinical-tier molecules it is the{" "}
                <Em>published maintenance or target span</Em>, not the titration start
                and not a dose to pick. Semaglutide&rsquo;s box is Wegovy&rsquo;s 1.7–2.4
                mg once weekly, not the 0.25 mg first month (
                <a href={REF.wegovy} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wegovy prescribing information
                </a>
                ).
              </P>
              <DocumentedRange id="semaglutide" />
            </Section>

            <Section title="Same molecule, three products">
              <P>
                Semaglutide is the cleanest demonstration that the milligram is not
                portable. Injectable Wegovy for chronic weight management titrates from
                0.25 mg once weekly and usually maintains at 2.4 mg, with 1.7 mg as an
                alternative. Injectable Ozempic for type 2 diabetes maintains at 0.5, 1,
                or 2 mg. Oral Rybelsus is a daily tablet at a different milligram
                entirely, because almost none of a swallowed peptide survives the gut —
                the{" "}
                <Link href="/insights/glp-1-in-a-pill" className={LINK}>
                  oral GLP-1 story
                </Link>
                . One sequence. Three labeled objects.
              </P>
              <P>
                STEP 1, the trial that turned 2.4 mg into a cultural event, judged
                once-weekly 2.4 mg over 68 weeks in adults with overweight or obesity
                without diabetes (
                <a href={REF.step1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wilding et al., NEJM 2021
                </a>
                ). It did not judge the 0.25 mg start, and it did not judge a compounded
                multi-dose vial. Tirzepatide repeats the pattern at a different scale:
                SURMOUNT-1 assigned 5, 10, or 15 mg once weekly after a 20-week
                escalation (
                <a href={REF.surmount1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jastreboff et al., NEJM 2022
                </a>
                ); the Zepbound label&rsquo;s recommended maintenance dosages are those
                same three strengths, and 2.5 mg is the start, not the target (
                <a href={REF.zepbound} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Zepbound prescribing information
                </a>
                ).
              </P>
              <Callout label="The mix-up">
                Quoting a titration start as if it were the dose the trial measured is
                how a 0.25 mg first month and a 2.4 mg result end up in the same
                sentence as if they were one regimen.
              </Callout>
            </Section>

            <Section title="A protocol is a ramp, then a target">
              <P>
                Investigational peptides do not have a label, so the honest object is
                the protocol. That still is not a start-at-target instruction.{" "}
                <Link href="/hormones/cagrilintide" className={LINK}>Cagrilintide</Link>
                &rsquo;s 26-week phase 2 assigned 0.3, 0.6, 1.2, 2.4, or 4.5 mg once
                weekly, with up to six weeks of escalation inside the 26 (
                <a href={REF.cagri} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lau et al., Lancet 2021
                </a>
                ). The 10.8% mean loss everyone quotes is the 4.5 mg arm at week 26,
                after the climb.{" "}
                <Link href="/insights/the-week-is-not-flat" className={LINK}>
                  The week is not flat
                </Link>{" "}
                is how to read the clock; this page is how to read the milligram.
              </P>
              <P>
                <Link href="/hormones/survodutide" className={LINK}>Survodutide</Link>
                {" "}makes the ramp even larger. Phase 2 in obesity assigned 0.6, 2.4,
                3.6, or 4.8 mg once weekly for 46 weeks, of which 20 were escalation (
                <a href={REF.survodutide} target="_blank" rel="noopener noreferrer" className={LINK}>
                  le Roux et al., Lancet Diabetes Endocrinol 2024
                </a>
                ). The primary, planned-treatment analysis at 4.8 mg was a mean 14.9%
                loss against 2.8% on placebo. The ~19% figure that travels with the
                molecule is the actual-treatment reading of the same trial, not a
                second study. Two estimands, one protocol — the same split{" "}
                <Link href="/insights/two-numbers-one-trial" className={LINK}>
                  two numbers, one trial
                </Link>{" "}
                walks for retatrutide. Start-at-4.8 is exactly the mistake the
                twenty-week ramp exists to prevent.
              </P>
            </Section>

            <Section title="Formulation is part of the number">
              <P>
                Even an approved peptide will not carry its milligram across vials.{" "}
                <Link href="/hormones/tesamorelin" className={LINK}>Tesamorelin</Link>
                {" "}cut visceral fat about 15% at 2 mg subcutaneously once daily in
                the trial that earned the label (
                <a href={REF.falutz} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Falutz et al., NEJM 2007
                </a>
                ). Egrifta WR, a later formulation, is labeled at 1.28 mg once daily (
                <a href={REF.egriftaWr} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Egrifta WR prescribing information
                </a>
                ). Same active, different product, different milligram.{" "}
                <Link href="/insights/how-to-reconstitute-peptides" className={LINK}>
                  Reconstitution
                </Link>{" "}
                is where that difference becomes a concentration, which is why there
                is no universal bacteriostatic-water recipe.
              </P>
              <P>
                Other labeled peptides are honest in a different direction: the number
                is small, or it is not a weekly habit at all.{" "}
                <Link href="/insights/teriparatide-backwards" className={LINK}>Teriparatide</Link>
                {" "}is 20 mcg subcutaneously once daily on the Forteo label (
                <a href={REF.forteo} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Forteo prescribing information
                </a>
                ) — a brief pulse, which is the whole mechanism. Bremelanotide
                (Vyleesi) is 1.75 mg as needed, at least 45 minutes before anticipated
                activity (
                <a href={REF.vyleesi} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Vyleesi prescribing information
                </a>
                ), not a weekly schedule. Putting either number into a &ldquo;×/wk&rdquo;
                table without that clause is a mistranslation.
              </P>
            </Section>

            <Section title="Community numbers, and the error that hospitalizes">
              <P>
                <Link href="/insights/igf-1-lr3" className={LINK}>IGF-1 LR3</Link> is
                the type specimen for a community milligram. This reference documents
                100–500 mcg per administration and grades it anecdotal, because there
                is no human trial and no approved dose. The closest labeled window
                onto IGF-1 receptor agonism is mecasermin (Increlex): start 0.04–0.08
                mg/kg twice daily, maximum 0.12 mg/kg twice daily, for severe primary
                IGF-1 deficiency (
                <a href={REF.increlex} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Increlex prescribing information
                </a>
                ). That is a different analog, a weight-based pediatric endocrine
                regimen, and not a conversion factor for LR3.
              </P>
              <P>
                The harm-reduction case for reporting numbers, rather than refusing
                them, is not theoretical. In July 2024 FDA described dosing errors
                with compounded injectable semaglutide in which patients and
                clinicians mixed milligrams, milliliters, and insulin-syringe units
                on products that do not share the approved pens&rsquo; concentrations.
                People administered five to twenty times the intended dose; some were
                hospitalized (
                <a href={REF.fdaErrors} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA compounding dosing-error alert
                </a>
                ). A 5-unit instruction drawn as 50 units is a literacy failure at
                the syringe. Hiding the labeled milligram does not prevent it.
                Naming the milligram, the unit, and the product does.
              </P>
              <Callout label="What to ask of any number">
                Which product or material? Which population? Which units, route, and
                schedule? Is this a start, a target, or a one-off? If the source does
                not say, the number is not ready to use as evidence.
              </Callout>
              <Bullets
                items={[
                  [
                    "Label",
                    "Named product, indication, jurisdiction. Wegovy 2.4 mg is not Ozempic 1 mg and not a compounded vial.",
                  ],
                  [
                    "Trial",
                    "Arm, estimand, ramp, and who was enrolled. The quote is usually the target after the climb.",
                  ],
                  [
                    "Preclinical",
                    "Species and mg/kg. Do not scale a mouse into a person by body weight and call it a protocol.",
                  ],
                  [
                    "Community",
                    "Say so. Grade it anecdotal. Do not launder it into a clinical range by omitting the badge.",
                  ],
                ]}
              />
            </Section>

            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">Common questions</h2>
              <dl className="mt-6 space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/40 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/how-to-reconstitute-peptides" label="How to reconstitute peptides — the vial is not a recipe" />
                <CrossLink href="/insights/how-to-read-a-peptide-coa" label="How to read a peptide COA — what the certificate can and can't prove" />
                <CrossLink href="/insights/two-numbers-one-trial" label="Two numbers, one trial — why every obesity study reports both" />
                <CrossLink href="/insights/the-week-is-not-flat" label="The week is not flat — reading cagrilintide's clock" />
                <CrossLink href="/tools/cycle-planner" label="Cycle planner — the same ranges, with provenance" />
                <CrossLink href="/research?q=What%20is%20the%20labeled%20maintenance%20dose%20versus%20the%20titration%20start%20for%20this%20peptide%20product%3F" label="Ask the research agent for a labeled or trial regimen" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on how published regimens are reported, summarized from
              public labels, trial publications, and regulatory alerts and simplified in
              places. Not individualized medical advice or a prescription. Where a dose or
              regimen appears it is reported from its source as research literacy — so you
              can read the evidence yourself — not an instruction to dose. Follow the
              approved product label and instructions from a licensed prescriber and
              dispensing pharmacist. Specific products are named to explain why milligrams
              do not transfer; verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

function KindTable() {
  return (
    <figure className="my-2 overflow-x-auto overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <table className="w-full min-w-[36rem] text-left text-[13px] leading-6">
        <caption className="sr-only">
          Four kinds of peptide milligram: label, trial protocol, preclinical experiment, and community convention
        </caption>
        <thead>
          <tr className="border-b border-ink/10 font-mono text-[10px] uppercase tracking-wide text-ink/40">
            <th scope="col" className="px-4 py-3">Kind</th>
            <th scope="col" className="px-4 py-3">Answers</th>
            <th scope="col" className="px-4 py-3">Blind to</th>
          </tr>
        </thead>
        <tbody>
          {KINDS.map((row) => (
            <tr key={row.kind} className="border-b border-ink/[0.06] align-top last:border-0">
              <th scope="row" className="whitespace-nowrap px-4 py-3 font-display text-sm font-semibold text-ink">
                {row.kind}
                <div className="mt-1 font-sans text-[12px] font-normal leading-5 text-ink/45">{row.example}</div>
              </th>
              <td className="px-4 py-3 text-ink/70">{row.answers}</td>
              <td className="px-4 py-3 text-ink/55">{row.blind}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
