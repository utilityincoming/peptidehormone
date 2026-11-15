import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Callout, CrossLink, StatusNote } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("glp-3-bull-case")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "The GLP-3 Bull Case: What Retatrutide's Phase 3 Trials Actually Support — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "The GLP-3 bull case · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  triumph1: "https://pubmed.ncbi.nlm.nih.gov/42814954/", // Jastreboff et al. 2026, NEJM — TRIUMPH-1, treatment-regimen weight
  triumph2: "https://pubmed.ncbi.nlm.nih.gov/42810372/", // Bellido et al. 2026, Lancet — TRIUMPH-2, obesity + type 2 diabetes
  lilly1: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss", // 21 May 2026 — TRIUMPH-1 efficacy estimand + 104-week extension
  lilly23: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-successful-two-additional", // 23 July 2026 — TRIUMPH-2/3 topline; BLA plan
  lilly2: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-substantial-weight", // 29 Sept 2026 — TRIUMPH-2 detailed results
  t2d2: "https://investor.lilly.com/news-releases/news-release-details/lillys-retatrutide-delivered-greater-a1c-reduction-and-more", // 28 Oct 2026 — TRANSCEND-T2D-2 head-to-head vs Ozempic 2 mg
  surmount1: "https://pubmed.ncbi.nlm.nih.gov/35658024/", // Jastreboff et al. 2022, NEJM — SURMOUNT-1, tirzepatide
  surmount5: "https://pubmed.ncbi.nlm.nih.gov/40353578/", // Aronne et al. 2025, NEJM — SURMOUNT-5, tirzepatide vs semaglutide
  step1: "https://pubmed.ncbi.nlm.nih.gov/33567185/", // Wilding et al. 2021, NEJM — STEP 1, semaglutide
  select: "https://pubmed.ncbi.nlm.nih.gov/37952131/", // Lincoff et al. 2023, NEJM — SELECT, semaglutide cardiovascular outcomes
  redefine: "https://pubmed.ncbi.nlm.nih.gov/40544433/", // Garvey et al. 2025, NEJM — REDEFINE-1, CagriSema
  kidneyweek: "https://www.asn-online.org/education/kidneyweek/2026/program-abstract.aspx?controlId=4591528", // Heerspink et al., ASN Kidney Week 2026 — TRANSCEND-CKD
  foundayo: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill", // 1 April 2026 — orforglipron approval
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is the GLP-3 bull case?",
    a: "That retatrutide — the molecule the internet nicknamed \u201cGLP-3\u201d — is the most efficacious weight-loss drug candidate yet tested, backed by five positive phase 3 trials, with a head-to-head win over Ozempic\u2019s highest approved diabetes dose and breadth beyond weight (knee pain, sleep apnea, kidney markers). The honest version also names what it must survive: the two-numbers problem, no head-to-head against tirzepatide, an unresolved cardiovascular question, and an unapproved molecule wearing a nickname.",
  },
  {
    q: "Is GLP-3 a real hormone or drug class?",
    a: "No. GLP-3 is a nickname, not a hormone or an FDA class. There is a genuine GLP-3 peptide fragment of proglucagon, but the drug nickname refers to retatrutide, Lilly\u2019s investigational triple agonist of GLP-1, GIP, and glucagon receptors — \u201cthree receptors,\u201d hence \u201c3.\u201d Lilly itself calls the label scientifically inaccurate. The bull case is about the molecule, not the name.",
  },
  {
    q: "How much weight did retatrutide cause in phase 3?",
    a: "In the published TRIUMPH-1 trial, mean weight fell 17.6% (4 mg), 23.7% (9 mg), and 25.0% (12 mg) at 80 weeks versus 3.9% on placebo — the treatment-regimen analysis counting everyone randomized. Lilly\u2019s on-treatment figure for the same 12 mg arm is 28.3% at 80 weeks and 30.3% at 104 weeks in a higher-BMI extension. Two analyses of one trial, not two results.",
  },
  {
    q: "Is retatrutide better than tirzepatide or semaglutide?",
    a: "Against semaglutide there is now a head-to-head: in TRANSCEND-T2D-2, retatrutide lowered A1C 2.2 vs 1.8 points and produced 19.5\u201320.9% weight loss vs 9.4% for Ozempic 2 mg over 80 weeks, in type 2 diabetes. Against tirzepatide there is no head-to-head trial; cross-trial league tables compare different populations and durations, so any \u201cbetter than Zepbound\u201d claim is an inference, not a measurement.",
  },
  {
    q: "When will retatrutide be approved?",
    a: "It is not approved. Lilly has said it plans a U.S. biologics license application in the first quarter of 2027. A filing plan is not an approval; with a standard review the decision would land in late 2027 at the earliest. Meanwhile an unapproved molecule already sells in the gray market — the risk the nickname carries.",
  },
  {
    q: "What are retatrutide's main risks?",
    a: "Gastrointestinal effects are the most common adverse events, mostly during dose escalation; dysesthesia (sensory disturbance) appears more often than placebo and on semaglutide in the head-to-head; and in TRIUMPH-3 the cardiovascular event comparison did not show a benefit — the MACE-3 hazard ratio was 1.12 (95% CI 0.64\u20131.96), which crosses 1. Discontinuation for adverse events ran up to 13.5% at 12 mg vs 4.8% placebo in TRIUMPH-3.",
  },
];

// Ceiling table — every number is the published primary analysis, not sponsor on-treatment figures.
const CEILING: { drug: string; trial: string; top: string; clock: string }[] = [
  { drug: "Semaglutide", trial: "STEP 1", top: "−14.9%", clock: "68 weeks" },
  { drug: "Tirzepatide", trial: "SURMOUNT-1", top: "−20.9%", clock: "72 weeks" },
  { drug: "CagriSema", trial: "REDEFINE-1", top: "−20.4%", clock: "68 weeks" },
  { drug: "Retatrutide", trial: "TRIUMPH-1", top: "−25.0%", clock: "80 weeks" },
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
          />
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
            <Section title="The nickname that ran ahead of the evidence">
              <P>
                Nobody at{" "}
                <Link href="https://www.lilly.com/news/stories/what-to-know-about-retatrutide" className={LINK}>Lilly</Link>{" "}
                ever called it GLP-3. The internet did — a nickname minted for a
                molecule whose official name, retatrutide, resists neither pronunciation
                nor recall. The &ldquo;3&rdquo; counts receptors: GLP-1, GIP, and
                glucagon, three axes of the metabolic system activated by{" "}
                <Link href="/hormones/retatrutide" className={LINK}>one engineered peptide</Link>.
                Strictly, GLP-3 is a mislabel — there is a real GLP-3 peptide fragment
                of proglucagon with no drug attached, and Lilly itself calls the nickname
                scientifically inaccurate. But nicknames tell you what a culture
                expects. This one expected a third generation: better than semaglutide,
                better than tirzepatide, a step change.
              </P>
              <P>
                For three years that expectation ran on a phase 2 trial. Now five phase
                3 trials have reported, and the bull case is no longer a vibe. This
                article is that case, stated as strongly as the evidence allows — and
                paired with the four asterisks it must survive. Both halves are the bull
                case. A thesis that only lists its own wins is marketing.
              </P>
              <Callout label="What a bull case is">
                Not a prediction that the drug will win, but the strongest honest version
                of the argument that it will — with its risks priced in, not hidden.
                Every number below is the published primary analysis unless labeled
                otherwise. Where the bull case rests on sponsor topline or cross-trial
                inference, it says so.
              </Callout>
            </Section>

            <Section title="Pillar one: the ceiling moved">
              <P>
                Every generation of this drug class has a ceiling — the mean weight
                loss at the top published dose in its pivotal trial, on the analysis that
                counts everyone randomized. Here is that ladder, each rung a published
                primary result:
              </P>
              <CeilingTable />
              <P>
                The published TRIUMPH-1 numbers behind retatrutide&rsquo;s rung: 2,339
                adults with obesity and no diabetes, 80 weeks, treatment-regimen
                estimand — mean body weight fell{" "}
                <strong>17.6% (4&nbsp;mg), 23.7% (9&nbsp;mg), and 25.0% (12&nbsp;mg)
                versus 3.9% on placebo</strong> (
                <a href={REF.triumph1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jastreboff et&nbsp;al., NEJM, 2026
                </a>
                ). Against the class&rsquo;s published ceilings — semaglutide&rsquo;s
                14.9% in STEP 1 (
                <a href={REF.step1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wilding et&nbsp;al., NEJM, 2021
                </a>
                ), tirzepatide&rsquo;s 20.9% in SURMOUNT-1 (
                <a href={REF.surmount1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jastreboff et&nbsp;al., NEJM, 2022
                </a>
                ) — that is roughly four points clear of the best-published injector, and
                45.3% of participants at the top dose lost ≥30% of body weight, a
                level long associated with bariatric surgery.
              </P>
              <P>
                Two honest caveats ride along. The clock: retatrutide&rsquo;s 80 weeks
                is longer than SURMOUNT-1&rsquo;s 72, so part of the gap is time on
                drug. And the estimand: 25.0% counts everyone randomized; Lilly&rsquo;s
                on-treatment figure for the same arm is 28.3% at 80 weeks and 30.3% at
                104 weeks in the BMI-≥35 extension — the number the headlines printed (
                <a href={REF.lilly1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 21 May 2026
                </a>
                ). If you compare retatrutide&rsquo;s 25.0% to tirzepatide&rsquo;s
                20.9%, you are comparing treatment-regimen to treatment-policy estimands
                across different populations and durations — directionally fine for a
                bull case, exact as a measurement it is not.
              </P>
              <Callout label="Asterisk one: the two-numbers problem">
                The bull thesis lives on 25.0% (published, counts everyone) while the
                marketing lives on 28.3% (on-treatment). Both are real analyses of the
                same trial. The honest bull quote is 25.0% and lets the reader know
                the other number exists — which is exactly what the nickname-owning
                gray-market pages will not do.
              </Callout>
            </Section>

            <Section title="Pillar two: it beat a competitor head-to-head">
              <P>
                Cross-trial comparisons are the weakest form of evidence in this class.
                Head-to-head trials are the strongest. Retatrutide now has one, and it
                won. In TRANSCEND-T2D-2, the first phase 3 trial to compare retatrutide
                with another incretin, 1,298 adults with type 2 diabetes on metformin
                were randomized to retatrutide 9&nbsp;mg, 12&nbsp;mg, or Ozempic
                (semaglutide) 2&nbsp;mg — the highest approved diabetes dose — for 80
                weeks. At 12&nbsp;mg, retatrutide lowered A1C by 2.2 percentage points
                versus 1.8 for semaglutide, and produced 20.9% mean weight loss versus
                9.4% — more than double (
                <a href={REF.t2d2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 28 October 2026
                </a>
                ; superiority of the 12&nbsp;mg dose on A1C was controlled for
                type&nbsp;1 error).
              </P>
              <P>
                That is a real win, and it converts the bull case from &ldquo;biggest
                placebo-controlled numbers&rdquo; to &ldquo;beat the incumbent injectable
                in the trial type that matters.&rdquo; But read the population line:
                adults with type 2 diabetes, mean A1C 8.3%, baseline weight 225.8&nbsp;lb
                — not the obesity-without-diabetes population of TRIUMPH-1, and not a
                comparison against Zepbound (tirzepatide) at its obesity dose. The
                bull case against semaglutide is measured. The bull case against
                tirzepatide remains an inference — no head-to-head exists.
              </P>
              <Callout label="Asterisk two: the missing head-to-head">
                SURMOUNT-5 already showed tirzepatide beating semaglutide 20.2% to
                13.7% at 72 weeks (
                <a href={REF.surmount5} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Aronne et&nbsp;al., NEJM, 2025
                </a>
                ). Retatrutide has no equivalent trial against tirzepatide. Until one
                reads out, &ldquo;better than Zepbound&rdquo; is the comparison the
                designs cannot support — the same discipline the site applies to every
                other cross-trial league table.
              </Callout>
            </Section>

            <Section title="Pillar three: it is not just a weight drug">
              <P>
                A weight drug becomes a metabolic franchise when the same molecule moves
                endpoints beyond the scale. Retatrutide&rsquo;s program has now reported
                signals across knee osteoarthritis pain, sleep apnea, kidney markers,
                liver-fat reduction, and cardiovascular risk factors — the breadth that
                turned semaglutide from a diabetes drug into a cultural event after SELECT
                (
                <a href={REF.select} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lincoff et&nbsp;al., NEJM, 2023
                </a>
                ). TRIUMPH-1&rsquo;s knee-osteoarthritis subgroup saw pain scores fall
                further than placebo; TRIUMPH-4 confirmed it in a dedicated trial; the
                sleep-apnea subgroup in TRIUMPH-1 saw apnea–hypopnea events fall by
                34.3 per hour at 9&nbsp;mg against 9.9 on placebo (
                <a href={REF.triumph1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jastreboff et&nbsp;al., NEJM, 2026
                </a>
                ).
              </P>
              <P>
                The newest organ to report is the kidney. In TRANSCEND-CKD, a
                24-week mechanistic trial in adults with obesity and chronic kidney
                disease, retatrutide cut urinary albumin-to-creatinine ratio by a
                median 49.2% versus placebo, with lower intraglomerular pressure and
                kidney fat and no change in measured GFR (
                <a href={REF.kidneyweek} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Heerspink et&nbsp;al., ASN Kidney Week 2026
                </a>
                ) — an albuminuria signal in the same family as the one that made
                semaglutide&rsquo;s kidney-outcome story, at roughly twice the
                magnitude reported for FLOW, though from a far smaller and shorter
                mechanistic trial. Bull case: the third receptor may be earning its
                seat beyond the scale.
              </P>
              <P>
                And the risk-factor table from TRIUMPH-3 — triglycerides down 37.0%,
                non-HDL cholesterol down 16.5%, systolic blood pressure down 9.3&nbsp;mmHg,
                hsCRP halved at the top dose (
                <a href={REF.lilly23} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 23 July 2026
                </a>
                ) — is the profile of a molecule being positioned for people whose
                obesity arrives with cardiovascular disease already attached.
              </P>
            </Section>

            <Section title="Asterisk three: the heart question is open">
              <P>
                The franchise-making result for this class was SELECT: semaglutide
                reduced major adverse cardiovascular events by 20% (hazard ratio 0.80,
                95% CI 0.72–0.90) in 17,604 people with established cardiovascular
                disease (
                <a href={REF.select} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lincoff et&nbsp;al., NEJM, 2023
                </a>
                ). Retatrutide&rsquo;s TRIUMPH-3 was that trial&rsquo;s population —
                severe obesity, established CVD — but not that trial&rsquo;s size or
                clock: 1,949 participants, 80 weeks, weight as the primary endpoint,
                cardiovascular events as an exploratory comparison. The result: 44 vs 52
                MACE-5 events (HR 0.82, 95% CI 0.55–1.22) and 27 vs 23 MACE-3 events
                (HR 1.12, 95% CI 0.64–1.96). Both intervals cross 1.
              </P>
              <P>
                The bull case reads that as &ldquo;reassuringly neutral, underpowered by
                design.&rdquo; The bear case reads MACE-3 point estimate above 1 and
                notes that glucagon — the third receptor — raises heart rate. Neither
                reading is available yet as a fact. A dedicated cardiovascular-outcomes
                trial exists in the program; until it reports, the heart question is
                open, and the honest bull case says so rather than borrowing
                semaglutide&rsquo;s SELECT halo.
              </P>
              <Callout label="How to hold this">
                SELECT proved cardiometabolic drugs can reduce events, not that
                incretins as a class inherit the benefit. TRIUMPH-3&rsquo;s intervals
                cross 1; a neutral-ish point estimate on MACE-5 and a slightly
                unfavorable MACE-3 point estimate are consistent with anything from a
                modest benefit to no difference to modest harm. Open, not answered.
              </Callout>
            </Section>

            <Section title="Asterisk four: the name is the risk">
              <P>
                Everything above describes an investigational molecule with five positive
                phase 3 trials and a planned Q1 2027 U.S. filing. Not an approved
                drug. But the nickname &ldquo;GLP-3&rdquo; already circulates in the
                gray market, where vials labeled retatrutide sell ahead of any approval
                — the same pattern that made &ldquo;Ozempic&rdquo; a synonym for
                semaglutide long before the gray market caught up. The buyer who
                searches &ldquo;GLP-3&rdquo; is often reaching for the expectation,
                not the molecule.
              </P>
              <P>
                The risk is asymmetric. If the filing slips or a safety signal emerges,
                the nickname keeps selling while the science pauses — a gray-market
                version of the two-numbers problem. The bull case&rsquo;s last pillar
                is therefore not a trial result but a stance: name the molecule, cite
                the trial, and let the published number — not the nickname — carry the
                weight.
              </P>
              <Callout label="The page vs the science">
                The science is strong: published, replicated, five-for-five in phase 3.
                The page — gray-market vials, nickname-driven search, an unapproved
                molecule sold as a generation — is where the risk lives. Bullish on the
                science, sceptical on the page. That is the whole case in one line.
              </Callout>
            </Section>

            <Section title="The verdict, with prices attached">
              <P>
                Stated as strongly as the evidence allows: retatrutide is the most
                efficacious weight-loss drug candidate yet tested in pivotal trials, with
                a published 25.0% mean weight loss at the top dose over 80 weeks, a
                head-to-head win over the highest approved dose of semaglutide in type 2
                diabetes, breadth beyond weight, and a regulator-ready data package with
                a planned Q1 2027 filing. Every pillar is cited; every asterisk is
                priced.
              </P>
              <P>
                What would falsify it: a head-to-head against tirzepatide that fails to
                separate; a cardiovascular-outcomes trial that lands on the wrong side of
                1; a filing slip past Q1 2027 into a competitive window where
                oral orforglipron — approved as Foundayo in April 2026 (
                <a href={REF.foundayo} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 1 April 2026
                </a>
                ) — and CagriSema close the efficacy gap from cheaper or more convenient
                positions. The bull case does not claim the molecule will win. It claims
                the evidence now exists to take the claim seriously — and the four
                asterisks are the price of holding it honestly.
              </P>
              <P>
                The deeper story is the one{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>the triple-agonist explainer</Link>{" "}
                tells: the class did not get louder, it learned to play chords. The
                bull case for GLP-3 is really a bet that the chord — GLP-1, GIP, and
                glucagon in one molecule, at a balanced ratio — is a better instrument
                than the two-note version. Phase 3 moved the ceiling. The verdict on
                the chord itself — what the third receptor actually contributes — waits
                on comparisons the published trials have not yet run.
              </P>
            </Section>

            {/* Visible FAQ block */}
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

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/two-numbers-one-trial" label="Two numbers, one trial — why the headline and the label disagree" />
                <CrossLink href="/hormones/retatrutide" label="Retatrutide — the triple agonist monograph" />
                <CrossLink href="/insights/the-triple-agonist" label="What is retatrutide? The mechanism explainer" />
                <CrossLink href="/insights/not-two-drugs-in-one" label="Why tirzepatide isn’t two drugs in one — the dual agonist it must beat" />
                <CrossLink href="/insights/the-hormone-we-tried-to-block" label="The hormone we tried to block — glucagon's century" />
                <CrossLink href="/insights/early-adopters-catalog" label="Early adopters — the gray market ahead of the evidence" />
                <CrossLink href="/families/incretins-metabolic" label="The incretins & metabolic family" />
                <CrossLink href="/research?q=Does%20retatrutide%20cause%20more%20weight%20loss%20than%20tirzepatide%20in%20head-to-head%20trials%3F" label="Ask the research agent about the ceiling race" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence,
              summarized from public scientific literature and clinical-trial
              disclosures and simplified in places. Not individualized medical advice
              or a prescription. Where a dose or regimen appears it is reported from
              its source as research literacy — so you can read the evidence yourself
              — not an instruction to dose. Compounds are named to explain the science.{" "}
              <StatusNote of={["retatrutide"]} />
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The published-ceiling ladder — primary analyses, not on-treatment figures ── */
function CeilingTable() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[13px] leading-5">
          <caption className="sr-only">
            Published primary-analysis mean weight loss at the top dose of each pivotal trial, on the analysis counting everyone randomized.
          </caption>
          <thead>
            <tr className="border-b border-ink/10 font-mono text-[11px] uppercase tracking-wide text-ink/45">
              <th scope="col" className="px-4 py-3 font-normal">Drug</th>
              <th scope="col" className="px-4 py-3 font-normal">Pivotal trial</th>
              <th scope="col" className="px-4 py-3 font-normal">Top published dose</th>
              <th scope="col" className="px-4 py-3 font-normal">Clock</th>
            </tr>
          </thead>
          <tbody>
            {CEILING.map((row) => (
              <tr
                key={row.drug}
                className={`border-b border-ink/[0.06] align-top last:border-0 ${row.drug === "Retatrutide" ? "bg-accent/[0.04]" : ""}`}
              >
                <th scope="row" className="px-4 py-3 font-semibold text-ink">{row.drug}</th>
                <td className="px-4 py-3 text-ink/70">{row.trial}</td>
                <td className="px-4 py-3 text-ink/80">{row.top}</td>
                <td className="px-4 py-3 text-ink/70">{row.clock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="border-t border-ink/[0.06] px-4 py-3 text-center text-xs text-ink/40">
        Published primary analyses that count everyone randomized — different trials,
        populations, and durations, so the ladder is context, not a ranking.
        CagriSema&rsquo;s REDEFINE-1 primary is the treatment-policy estimand (−20.4%);
        its on-treatment figure was 22.7%.
      </figcaption>
    </figure>
  );
}
