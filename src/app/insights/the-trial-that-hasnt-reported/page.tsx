import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-trial-that-hasnt-reported")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "BPC-157 Human Evidence (October 2026): The Three Pilots, the Trial, the FDA Vote",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each evidence grade stays checkable.
const REF = {
  // The three published human reports, all from one Florida private clinic.
  knee: "https://pubmed.ncbi.nlm.nih.gov/34324435/",
  cystitis: "https://pubmed.ncbi.nlm.nih.gov/39325560/",
  infusion: "https://pubmed.ncbi.nlm.nih.gov/40131143/",
  // The registered trials.
  hamstring: "https://clinicaltrials.gov/study/NCT07437547",
  rotator: "https://clinicaltrials.gov/study/NCT07803250",
  phase1: "https://clinicaltrials.gov/study/NCT02637284",
  // Reviews: the September 2026 critical review of the rodent record, the Utah
  // musculoskeletal scoping review, the Sports Medicine review.
  critical: "https://pubmed.ncbi.nlm.nih.gov/42794771/",
  utah: "https://pubmed.ncbi.nlm.nih.gov/40789979/",
  sportsmed: "https://pubmed.ncbi.nlm.nih.gov/41966639/",
  // FDA briefing document for the July 2026 Pharmacy Compounding Advisory Committee.
  fdaBrief: "https://www.fda.gov/media/193343/download",
  // WADA Prohibited List (S0), current edition.
  wada: "https://www.wada-ama.org/en/prohibited-list",
} as const;

// FAQ — surfaced as FAQPage JSON-LD and mirrored in the visible Q&A block.
const FAQS = [
  {
    q: "Was the first human study of BPC-157 published in September 2026?",
    a: "No. As of early October 2026 PubMed indexes no new human study of BPC-157 from August or September 2026 — only reviews, and one critical review of the rodent ischemia-reperfusion literature (19 September 2026). The three published human reports date from 2021, 2024 and 2025; the first randomized, placebo-controlled trial (NCT07437547, acute hamstring strain, n=120) is still recruiting, with primary completion estimated for February 2027. If you have seen a 'first human trial' headline, check what it links to: it is almost certainly one of the three uncontrolled pilots, the registry record of the hamstring trial, or the July 2026 FDA advisory-committee vote.",
  },
  {
    q: "What human evidence for BPC-157 actually exists?",
    a: "Three small reports, all from the same private clinic in Florida and all without a control group: a 2021 retrospective chart review of 16 patients given intra-articular injections for knee pain (phone survey; 14 of 16 reported relief); a 2024 open-label pilot of 12 women given 10 mg intravesically for interstitial cystitis (all 12 scored the maximum on a global response questionnaire); and a 2025 safety pilot in which 2 adults received 10 mg then 20 mg intravenously on consecutive days with no change in routine labs. Together that is 30 people, none randomized, none blinded, none compared with placebo.",
  },
  {
    q: "What did the FDA advisory committee decide in July 2026?",
    a: "On 23 July 2026 the Pharmacy Compounding Advisory Committee voted 8–6, with one abstention, to recommend adding BPC-157 to the 503A bulk-substances list — against the recommendation of FDA review staff, who cited the absence of controlled human data, unresolved questions about what the compounded substance actually is, and inadequate safety information. The vote is advisory. BPC-157 remains in Category 2 of the 503A list until the agency completes rulemaking, which is expected to take a year or more.",
  },
  {
    q: "Is BPC-157 allowed in sport?",
    a: "No. WADA has listed BPC-157 under S0 (non-approved substances) since 2022. S0 covers any pharmacological substance with no current approval by a governmental regulatory health authority for human therapeutic use, and it applies at all times, in and out of competition.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(244,114,182,0.16), transparent 70%)" }}
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
            <Section title="First, the claim that prompted this piece">
              <P>
                In September 2026 the phrase &ldquo;first human study of BPC-157&rdquo;
                started circulating again. It is worth being exact about what it can and
                cannot refer to, because the molecule has had a &ldquo;first human
                study&rdquo; announced roughly once a year since 2021, and each time the
                thing being announced was something else.
              </P>
              <P>
                We checked the primary record rather than the headlines. PubMed, searched
                for BPC-157 in the window 1 August to 3 October 2026, returns reviews and
                a hydrogel-fabrication paper. The one substantive new paper is a critical
                review of the rodent ischemia-reperfusion literature, published 19
                September 2026, which is a paper <Em>about</Em> the animal data and
                explicitly treats human and regulatory sources as context, not evidence (
                <a href={REF.critical} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Demirtaş, Int J Mol Sci 2026
                </a>
                ). ClinicalTrials.gov lists one randomized trial recruiting and one not yet
                open, and neither has posted results. <Grade g="reference" />
              </P>
              <Callout label="The short version">
                As of October 2026 there is still no published, controlled human trial of
                BPC-157. What exists in people is three uncontrolled reports from one
                clinic, totalling thirty participants. The first trial that could actually
                answer the question began enrolling in February 2026 and is not expected
                to finish its primary endpoint before February 2027. &ldquo;Last
                month&rdquo; brought a registry update, a vote, and a review. It did not
                bring data.
              </Callout>
              <P>
                Every claim below is tagged by evidence tier, so you can see exactly where
                a statement comes from &ndash; settled regulatory fact, human data, animal
                work, or community report. The tiers grade <Em>provenance</Em>, not
                confidence: a well-replicated rodent study is still preclinical.
              </P>
              <GradeLegend />
            </Section>

            <Section title="The whole human record, in one table">
              <P>
                Thirty-three years after the peptide was first described, this is every
                published report of BPC-157 given to people. All three come from the same
                private clinic in Florida, all three appeared in the same journal, and
                none has a control arm. <Grade g="clinical" />
              </P>
              <HumanRecordFigure />
              <Bullets
                items={[
                  ["2021 — knee pain, n=16", "A retrospective chart review: patients who had received an intra-articular injection six to twelve months earlier were telephoned and asked whether it helped. Twelve had BPC-157 alone (11 reported significant improvement); four had BPC-157 plus a product described as thymosin β4 (3 improved). No validated outcome instrument, no imaging, no comparison group, and the authors note the follow-up interval varied by patient."],
                  ["2024 — interstitial cystitis, n=12", "An open-label pilot: twelve women who had failed pentosan polysulfate were given 10 mg of compounded BPC-157 by injection around the inflamed bladder wall during a single cystoscopy. All twelve scored 5/5 on a Global Response Assessment afterwards; ten reported complete resolution. A 100% response in an open-label study of a pain syndrome with a large expected placebo component is a result that demands a control group, and none was run."],
                  ["2025 — intravenous safety, n=2", "Two adults, both of whom had already received intravenous BPC-157 before the study, were infused with 10 mg on day one and 20 mg on day two. Routine cardiac, hepatic, renal, thyroid and glucose labs did not move over three days, and neither reported side effects. The paper reports no pharmacokinetics despite the title of the registry entry some sites attach to it."],
                ]}
              />
              <P>
                The sources are the papers themselves (
                <a href={REF.knee} target="_blank" rel="noopener noreferrer" className={LINK}>knee</a>,{" "}
                <a href={REF.cystitis} target="_blank" rel="noopener noreferrer" className={LINK}>cystitis</a>,{" "}
                <a href={REF.infusion} target="_blank" rel="noopener noreferrer" className={LINK}>infusion</a>
                ), and an independent 2025 scoping review from the University of Utah reaches
                the same count: three pilots, no adverse effects reported, no rigorous
                trial (
                <a href={REF.utah} target="_blank" rel="noopener noreferrer" className={LINK}>
                  McGuire et al., Curr Rev Musculoskelet Med 2025
                </a>
                ). <Grade g="clinical" />
              </P>
              <Callout label="What a two-person safety study can and cannot say">
                It can say that two people who had tolerated the drug before tolerated it
                again, at these doses, for three days, on these labs. It cannot say
                anything about uncommon harms, delayed harms, immunogenicity, or what
                happens over the weeks of daily injection that community protocols
                describe. &ldquo;Showed the safety of BPC-157 in humans&rdquo; is the
                paper&rsquo;s own phrasing, and it is a sentence the design cannot
                support.
              </Callout>
            </Section>

            <Section title="The trial that could answer the question">
              <P>
                The genuinely new thing in 2026 is not a result but a design. In February
                2026 Hudson Biotech opened enrolment for a Phase 2 trial in acute, MRI-confirmed
                grade II hamstring strain (
                <a href={REF.hamstring} target="_blank" rel="noopener noreferrer" className={LINK}>
                  NCT07437547
                </a>
                ). It is the first registered BPC-157 study with the features that make a
                human trial informative, and it is worth listing them, because they are
                exactly the features the three pilots lacked. <Grade g="reference" />
              </P>
              <Bullets
                items={[
                  ["Randomized and placebo-controlled", "120 participants, allocated 1:1 to daily subcutaneous BPC-157 or matched placebo for 14 days, both arms on the same standardized rehabilitation programme."],
                  ["Quadruple-blinded", "Participants, treating clinicians, investigators and outcome assessors are all blinded; the investigational pharmacy prepares identical prefilled syringes under a randomization code."],
                  ["Objective endpoints", "Time to clearance for unrestricted sport by a blinded clinician plus a functional battery, and change in MRI injury volume at day 14 read by blinded central radiology. Not a phone survey."],
                  ["A timeline", "Primary completion is estimated for February 2027 and study completion for February 2028. Nothing from this trial can have been published in September 2026."],
                ]}
              />
              <P>
                A second study, a 30-person Phase 1 at the University of Arkansas on
                recovery after rotator-cuff repair, was first posted on 3 September 2026
                and is not yet recruiting; its estimated start is January 2027 (
                <a href={REF.rotator} target="_blank" rel="noopener noreferrer" className={LINK}>
                  NCT07803250
                </a>
                ). That posting is the most likely source of a &ldquo;new human
                study&rdquo; headline last month, and a registry record is not a study
                result. <Grade g="reference" />
              </P>
              <P>
                There is also a ghost. A Phase 1 safety and pharmacokinetics study of
                &ldquo;PCO-02&rdquo;, with BPC-157 as the active ingredient, was registered
                by a Croatian sponsor in 2015 with a Tijuana hospital as collaborator,
                planned 42 healthy volunteers, and was last updated the same year with an
                estimated completion of early 2016 (
                <a href={REF.phase1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  NCT02637284
                </a>
                ). Its status is &ldquo;unknown&rdquo; and no result was ever posted or
                published. A decade later, that is the only human pharmacokinetic study of
                BPC-157 that has ever been planned, and we still do not have one.{" "}
                <Grade g="reference" />
              </P>
            </Section>

            <Section title="What did happen last month: a review of the rats">
              <P>
                The September 2026 paper is interesting precisely because it is not a
                human study. A cardiovascular surgeon at Gazi University searched the
                literature to 24 June 2026 and reviewed every rodent ischemia-reperfusion
                study of BPC-157: limb, gut, liver, brain, and the related major-vessel
                occlusion models. The findings are the ones the preclinical literature
                has always reported &ndash; less oxidative injury, modulated nitric-oxide
                responses, lower inflammatory and apoptotic markers, changes in the
                VEGFR2&ndash;Akt&ndash;eNOS axis (
                <a href={REF.critical} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Demirtaş 2026
                </a>
                ). <Grade g="preclinical" />
              </P>
              <P>
                What is new is the author&rsquo;s refusal to pool them. No meta-analysis
                was attempted because the organ systems, injury models, doses, routes,
                timings and outcomes were too heterogeneous to combine. The review
                describes an evidence base that &ldquo;frequently relies on short
                observation periods, single-dose paradigms, and incompletely characterized
                risk-of-bias domains&rdquo;, and its conclusion is that BPC-157 is a
                hypothesis-generating candidate for <Em>further preclinical</Em> work,
                with independent blinded replication, dose-response and
                therapeutic-window studies, PK/PD characterization and rigorous toxicology
                all required before controlled human trials would be justified.{" "}
                <Grade g="preclinical" />
              </P>
              <Callout label="Why this matters more than another rat study">
                For thirty years the preclinical record has been read as a mountain of
                positive results. This review reads it as a mountain of
                <Em> uncombined</Em> results: hundreds of papers, overwhelmingly from one
                Zagreb group, in designs that cannot be stacked into a single effect size.
                That is the sentence to carry into any conversation about
                &ldquo;217 studies&rdquo;. The number counts papers, not independent
                tests of one hypothesis.
              </Callout>
            </Section>

            <Section title="The vote that was not a verdict">
              <P>
                The other 2026 event that gets described as a change in BPC-157&rsquo;s
                status is the FDA advisory-committee meeting of 23 July. The Pharmacy
                Compounding Advisory Committee voted 8&ndash;6, with one abstention, to
                recommend adding BPC-157 to the 503A bulk-substances list, which would let
                compounding pharmacies prepare it under a prescription. The agency&rsquo;s
                own review staff had recommended against, on the grounds that there was no
                controlled human evidence of benefit, inadequate safety information, and
                an unresolved question of what the compounded substance even is: the FDA
                briefing document notes that nominations did not agree on a single
                chemical identity for the material being sold as BPC-157 (
                <a href={REF.fdaBrief} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA briefing document, July 2026
                </a>
                ). <Grade g="reference" />
              </P>
              <Bullets
                items={[
                  ["It is advisory", "The committee recommends; the agency decides, through rulemaking that is expected to take twelve to twenty-four months. Until then BPC-157 remains in Category 2 of the 503A list, as it has been since September 2023, and may not lawfully be compounded."],
                  ["It was not an evidence review", "Several yes votes were cast explicitly on patient-demand and access grounds, with members acknowledging the data were incomplete. A vote on access policy is not a finding of efficacy, and it adds nothing to the human evidence table above."],
                  ["Identity is a safety question", "A peptide that is sold under one name but reaches patients as more than one sequence, with impurity profiles no one has characterised, cannot have a safety record in any meaningful sense. That was the staff objection, and it stands regardless of the vote."],
                ]}
              />
              <P>
                Two 2026 reviews written for clinicians land in the same place: a{" "}
                <a href={REF.sportsmed} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sports Medicine
                </a>{" "}
                review of approved and unapproved peptides describes rigorous human safety
                data for BPC-157 as scarce, and devotes a section to the placebo effect,
                amplified by social media, as a mediator of the benefit people report.{" "}
                <Grade g="clinical" />
              </P>
            </Section>

            <Section title="How to read the next headline">
              <P>
                BPC-157 will have another &ldquo;first human study&rdquo; headline before
                the hamstring trial reports. Three questions sort them.
              </P>
              <Bullets
                items={[
                  ["Is there a control arm?", "If no one received a placebo, the study cannot distinguish the drug from the injection, the attention, or regression to the mean. All three existing human reports fail this test. The hamstring trial passes it."],
                  ["Who measured the outcome, and how?", "A phone call asking whether the knee feels better is not the same instrument as blinded MRI volumetry. The gap between those two is most of the gap between the 2021 paper and NCT07437547."],
                  ["Is it a result or a record?", "A ClinicalTrials.gov posting, an advisory vote, a review of reviews, and an IRB approval are all reported as news. None is a result. A result has a date, a journal, participants, and numbers you can check against the registry's pre-specified endpoints."],
                ]}
              />
              <Callout label="Bullish on the science, sceptical on the page">
                The preclinical story is real and the first adequate trial is finally
                running. That is a better position than BPC-157 has ever been in. It is
                also the position of a molecule whose human evidence currently consists of
                thirty people and no placebo, and whose sport status is a blanket S0 ban (
                <a href={REF.wada} target="_blank" rel="noopener noreferrer" className={LINK}>
                  WADA
                </a>
                ). Both are true. The honest date for the first human evidence is 2027,
                not last month.
              </Callout>
            </Section>

            {/* FAQ */}
            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">
                Common questions
              </h2>
              <dl className="mt-6 space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/40 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/bpc-157" label="BPC-157 reference (the compound itself)" />
                <CrossLink href="/compare/bpc-157-vs-tb-500" label="BPC-157 vs TB-500 — the sourced comparison" />
                <CrossLink href="/hormones/tb-500" label="TB-500 — the fragment sold under its parent's name" />
                <CrossLink href="/insights/the-complexity-ladder" label="The complexity ladder — why identity is the first question" />
                <CrossLink href="/insights/what-you-can-actually-get" label="What you can actually get — the regulatory map" />
                <CrossLink href="/research?q=What%20controlled%20human%20evidence%20exists%20for%20BPC-157%20as%20of%202026%3F" label="Ask the research agent what the human data shows" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference for research and laboratory contexts only. Not medical
              advice, and not a recommendation to use BPC-157. BPC-157 is not approved by
              any drug regulator for human use, sits in Category 2 of the FDA 503A
              bulk-substances list pending rulemaking, and is prohibited in sport at all
              times under WADA S0. Specific studies, trials and votes are named to explain
              the evidence &ndash; verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Evidence-grade badges ──────────────────────────────────────────────────
   A lightweight, article-local grade tag. Distinct from lib/evidence's
   claim-level TierBadge (which is bound to per-value provenance records and is,
   by its own design note, never used as a legend key). Here the four grades sit
   at prose altitude, so this renders the human-readable label in the site's
   accent tokens, strongest → weakest by hue.                                   */
const GRADES = {
  reference: {
    label: "Reference",
    hue: "text-accent-teal bg-accent-teal/10 border-accent-teal/30",
    note: "Established regulatory fact or a primary registry record.",
  },
  clinical: {
    label: "Clinical",
    hue: "text-accent-blue bg-accent-blue/10 border-accent-blue/30",
    note: "Data from human participants — here, uncontrolled pilots unless stated.",
  },
  preclinical: {
    label: "Preclinical",
    hue: "text-accent-amber bg-accent-amber/10 border-accent-amber/30",
    note: "Animal or cell-culture data; no human equivalent published.",
  },
  community: {
    label: "Community",
    hue: "text-ink/70 bg-ink/[0.06] border-ink/25",
    note: "Forum-reported and anecdotal — signal, not evidence.",
  },
} as const;

function Grade({ g }: { g: keyof typeof GRADES }) {
  const meta = GRADES[g];
  return (
    <span
      title={meta.note}
      className={`inline-flex items-center rounded-full border px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide ${meta.hue}`}
    >
      {meta.label}
    </span>
  );
}

function GradeLegend() {
  const order: (keyof typeof GRADES)[] = ["reference", "clinical", "preclinical", "community"];
  return (
    <dl className="grid gap-3 rounded-2xl border border-ink/10 bg-panel/40 p-5 sm:grid-cols-2">
      {order.map((g) => (
        <div key={g} className="flex items-baseline gap-2.5">
          <dt className="shrink-0">
            <Grade g={g} />
          </dt>
          <dd className="text-[13px] leading-5 text-ink/60">{GRADES[g].note}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── The human record, to scale ────────────────────────────────────────────
   Every person who has received BPC-157 in a published report, drawn as one
   square each, beside the 120 the first controlled trial will enrol. The point
   of the figure is the proportion, and the absence of any placebo square in
   the published set.                                                           */
function HumanRecordFigure() {
  const cell = 11, gap = 3, step = cell + gap;
  const rows = (n: number, cols: number) => Math.ceil(n / cols);
  const grid = (n: number, cols: number, x: number, y: number, fill: string, stroke: string, dashed = false) =>
    Array.from({ length: n }, (_, i) => (
      <rect
        key={`${x}-${y}-${i}`}
        x={x + (i % cols) * step}
        y={y + Math.floor(i / cols) * step}
        width={cell}
        height={cell}
        rx={2}
        fill={fill}
        stroke={stroke}
        strokeOpacity="0.7"
        strokeDasharray={dashed ? "2 2" : undefined}
      />
    ));
  const col1 = 60, col2 = 260;
  const y0 = 46;
  const trialRows = rows(60, 10);
  const trialH = trialRows * step;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 560 ${y0 + Math.max(rows(16, 8) * step + 24 + rows(12, 8) * step + 24 + step, trialH * 2 + 40) + 30}`}
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="Thirty squares on the left represent every person in the three published BPC-157 reports: sixteen knee-pain patients, twelve interstitial-cystitis patients, and two infusion volunteers, none with a placebo comparator. On the right, 120 squares represent the recruiting hamstring-strain trial, sixty on BPC-157 and sixty on placebo, blinded, with results not expected before 2027."
      >
        <text x={col1} y={22} fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Published, 2021–2025</text>
        <text x={col1} y={36} fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">30 people · one clinic · no control arm</text>

        {/* knee 16 */}
        {grid(16, 8, col1, y0, "color-mix(in srgb, var(--accent-blue) 18%, transparent)", "var(--accent-blue)")}
        <text x={col1 + 8 * step + 6} y={y0 + 10} fill="var(--color-ink)" fillOpacity="0.6" fontSize="10" fontFamily="var(--font-mono, monospace)">knee · 16</text>
        {/* cystitis 12 */}
        {grid(12, 8, col1, y0 + rows(16, 8) * step + 12, "color-mix(in srgb, var(--accent-blue) 18%, transparent)", "var(--accent-blue)")}
        <text x={col1 + 8 * step + 6} y={y0 + rows(16, 8) * step + 22} fill="var(--color-ink)" fillOpacity="0.6" fontSize="10" fontFamily="var(--font-mono, monospace)">cystitis · 12</text>
        {/* infusion 2 */}
        {grid(2, 8, col1, y0 + rows(16, 8) * step + 12 + rows(12, 8) * step + 12, "color-mix(in srgb, var(--accent-blue) 18%, transparent)", "var(--accent-blue)")}
        <text x={col1 + 8 * step + 6} y={y0 + rows(16, 8) * step + 12 + rows(12, 8) * step + 22} fill="var(--color-ink)" fillOpacity="0.6" fontSize="10" fontFamily="var(--font-mono, monospace)">infusion · 2</text>

        <text x={col2} y={22} fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Recruiting, NCT07437547</text>
        <text x={col2} y={36} fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">120 people · randomized · blinded · 2027</text>
        {/* active 60 */}
        {grid(60, 10, col2, y0, "color-mix(in srgb, var(--accent-rose) 18%, transparent)", "var(--accent-rose)")}
        <text x={col2 + 10 * step + 6} y={y0 + 10} fill="var(--color-ink)" fillOpacity="0.6" fontSize="10" fontFamily="var(--font-mono, monospace)">BPC-157 · 60</text>
        {/* placebo 60 */}
        {grid(60, 10, col2, y0 + trialH + 12, "transparent", "var(--color-ink)", true)}
        <text x={col2 + 10 * step + 6} y={y0 + trialH + 22} fill="var(--color-ink)" fillOpacity="0.6" fontSize="10" fontFamily="var(--font-mono, monospace)">placebo · 60</text>
      </svg>
      <figcaption className="mt-3 text-center text-xs leading-5 text-ink/50">
        One square per participant. Left: every person in the published human record.
        Right: the first controlled trial, which has enrolled no one whose outcome has
        been reported.
      </figcaption>
    </figure>
  );
}
