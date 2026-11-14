import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, CrossLink } from "@/components/insight";
import { DocumentedRange } from "@/components/DocumentedRange";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-triple-agonist")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What Is Retatrutide? The Triple Agonist (GLP-1, GIP, Glucagon) and the Glucagon Paradox — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "What Is Retatrutide? The Triple Agonist · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  reta: "https://doi.org/10.1056/NEJMoa2301972", // Jastreboff et al. 2023, NEJM — retatrutide phase 2 obesity trial
  triumph1: "https://pubmed.ncbi.nlm.nih.gov/42814954/", // Jastreboff et al. 2026, NEJM — TRIUMPH-1, treatment-regimen weight
  triumph2: "https://pubmed.ncbi.nlm.nih.gov/42810372/", // Bellido et al. 2026, Lancet — TRIUMPH-2, obesity + type 2 diabetes
  triumph4: "https://pubmed.ncbi.nlm.nih.gov/43001755/", // Schnitzer et al. 2026, NEJM — TRIUMPH-4 and TRIUMPH-1 knee osteoarthritis
  lilly1: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss", // 21 May 2026 — TRIUMPH-1 efficacy estimand + 104-week extension
  lilly23: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-successful-two-additional", // 23 July 2026 — TRIUMPH-2/3 topline; BLA plan
  lilly2: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-substantial-weight", // 29 Sept 2026 — TRIUMPH-2 efficacy estimand; BLA plan restated
  transcend: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-demonstrated-significant", // 19 March 2026 — TRANSCEND-T2D-1 topline
  triumph1: "https://pubmed.ncbi.nlm.nih.gov/42814954/", // Jastreboff et al. 2026, NEJM 395(18):1781-1793 — TRIUMPH-1, retatrutide phase 3 obesity trial (doi 10.1056/NEJMoa2604169)
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is retatrutide?",
    a: "Retatrutide (LY3437943) is an investigational once-weekly peptide that activates three receptors at once — GLP-1, GIP, and glucagon. It is the next step beyond single agonists like semaglutide (GLP-1) and dual agonists like tirzepatide (GLP-1 + GIP), adding the glucagon receptor to the combination. Phase 3 results are published. It is not approved.",
  },
  {
    q: "Why would a weight-loss drug activate the glucagon receptor, which raises blood sugar?",
    a: "Glucagon does more than raise blood sugar — glucagon-receptor activation also increases energy expenditure, so the body burns more fuel. On its own that comes with an unwanted glucose-raising effect, but paired with two incretins (GLP-1 and GIP) that drive glucose-dependent insulin release and curb appetite, the glucose-raising arm is held in check while the energy-expenditure arm is recruited. A hormone's effect depends on the company it keeps.",
  },
  {
    q: "How much weight did retatrutide produce in phase 3?",
    a: "In the published TRIUMPH-1 trial, adults with obesity and no diabetes lost a mean 17.6% (4 mg), 23.7% (9 mg), and 25.0% (12 mg) of body weight at 80 weeks, versus 3.9% on placebo. That is the treatment-regimen analysis, which counts everyone randomized. Lilly's on-treatment (efficacy) figure for the same 12 mg arm was 28.3% at 80 weeks, and 30.3% at 104 weeks in a higher-BMI extension. The two numbers are the same trial analyzed two ways, not two results.",
  },
  {
    q: "Is retatrutide FDA approved?",
    a: "No. On September 29, 2026 Lilly said it plans to submit a U.S. biologics license application in the first quarter of 2027. A filing plan is not an approval. This page was checked against the public record in November 2026 and did not find a submitted application or an approval.",
  },
  {
    q: "What dose of retatrutide was studied in phase 3?",
    a: "In TRIUMPH-1 and TRIUMPH-2 the assigned once-weekly subcutaneous targets were 4 mg, 9 mg, and 12 mg. Participants started at 2 mg and the dose was increased every four weeks until the assigned target. Those figures are the trial regimens, reported so the evidence can be read, not a dose for an individual. Retatrutide is not an approved medicine.",
    q: "How much weight did retatrutide produce in trials?",
    a: "In the phase 3 TRIUMPH-1 trial (Jastreboff et al., NEJM 2026; PubMed 42814954), 2,339 adults with obesity and without diabetes received once-weekly retatrutide or placebo for 80 weeks. Mean body-weight change was −17.6% at 4 mg, −23.7% at 9 mg and −25.0% at 12 mg, against −3.9% with placebo. The most common adverse events were gastrointestinal. The trial compared the whole molecule with placebo, so it does not show how much of the effect comes from the glucagon or GIP arm, and retatrutide remains investigational and not approved.",
  },
  {
    q: "Is more receptors automatically better?",
    a: "No. Each receptor carries its own effects and liabilities, and the three have to be engaged in a deliberate ratio — enough glucagon signal to raise energy expenditure, enough incretin signal to keep glucose in line. Get the balance wrong and the glucose-raising arm wins. The engineering challenge is not hitting three targets; it is balancing them. Phase 3 compared the whole molecule with placebo, not with a version that lacked glucagon, so glucagon's share of the weight loss is still an inference.",
  },
];

const TRIALS: { trial: string; who: string; time: string; top: string; placebo: string }[] = [
  {
    trial: "TRIUMPH-1",
    who: "Obesity, no diabetes (n=2,339)",
    time: "80 weeks",
    top: "−25.0% at 12 mg",
    placebo: "−3.9%",
  },
  {
    trial: "TRIUMPH-2",
    who: "Obesity and type 2 diabetes (n=1,152)",
    time: "80 weeks",
    top: "−18.8% at 12 mg",
    placebo: "−5.1%",
  },
  {
    trial: "TRIUMPH-4",
    who: "Knee osteoarthritis and obesity (n=445)",
    time: "68 weeks",
    top: "−23.7% at 12 mg",
    placebo: "−4.6%",
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
            <DocumentedRange id="retatrutide" />
            <Section title="From one signal to a chord">
              <P>
                The first metabolic peptides played a single note. A{" "}
                <Link href="/hormones/semaglutide" className={LINK}>GLP-1</Link> agonist
                activates one receptor — the{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> receptor — and
                works through the cascade behind{" "}
                <Link href="/insights/glp-1-signaling" className={LINK}>a single hormone&rsquo;s biology</Link>.
                Then came the two-note version:{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link>{" "}
                engages both the GLP-1 and{" "}
                <Link href="/hormones/gip" className={LINK}>GIP</Link> receptors from one
                molecule. The newest step adds a third:{" "}
                <Link href="/hormones/retatrutide" className={LINK}>retatrutide</Link>, an
                investigational peptide that activates GLP-1, GIP, and — the surprising
                one — the{" "}
                <Link href="/hormones/glucagon" className={LINK}>glucagon</Link> receptor,
                all at once.
              </P>
              <AgonismMatrix />
              <P>
                The organizing idea is <Em>combination as physiology</Em>. Rather than
                push one pathway harder, these molecules recruit several arms of the
                metabolic system so their effects add up — a chord instead of a louder
                single note.
              </P>
            </Section>

            <Section title="The glucagon paradox">
              <P>
                Glucagon is the hormone that <Em>raises</Em> blood sugar. It is
                insulin&rsquo;s counterweight — released in fasting to pull glucose out
                of the liver. So putting a glucagon-receptor agonist into a drug meant to
                improve metabolic health looks, at first glance, exactly backwards.
              </P>
              <P>
                The resolution is that glucagon does more than one thing. Alongside its
                effect on blood sugar, glucagon-receptor activation increases{" "}
                <Em>energy expenditure</Em> — the body burns more fuel. On its own, that
                comes packaged with the unwanted glucose-raising effect. But paired with
                two incretins that drive glucose-dependent insulin release and appetite
                reduction, the glucose-raising arm is held in check while the
                energy-expenditure arm is recruited. The incretins cover glucagon&rsquo;s
                downside; glucagon adds a lever the incretins don&rsquo;t have.
              </P>
              <Callout label="The real insight">
                A hormone&rsquo;s effect isn&rsquo;t fixed — it depends on the company it
                keeps. Glucagon in isolation raises blood sugar; glucagon alongside GLP-1
                and GIP becomes a fat-burning ally whose liability is neutralized by its
                partners. The meaning of a signal is set by the whole chord, not the note.
              </Callout>
            </Section>

            <Section title="Why more receptors isn't automatically better">
              <P>
                Adding receptors is not simply stacking benefits. Each pathway carries its
                own effects and its own liabilities, and the three receptors have to be
                engaged in the right <Em>proportion</Em>. A tri-agonist is tuned so that
                its potency at GLP-1, GIP, and glucagon sits in a deliberate ratio — enough
                glucagon signal to raise energy expenditure, enough incretin signal to keep
                glucose in line. Get the balance wrong and the glucose-raising arm wins.
                The engineering challenge isn&rsquo;t hitting three targets; it&rsquo;s
                <Em> balancing</Em> them.
              </P>
            </Section>

            <Section title="The body has to catch up">
              <P>
                Amplifying incretin signaling all at once is a large physiological change,
                and the body does not absorb it instantly. The same slowed-stomach-emptying
                mechanism that helps these molecules work is, early on, felt as nausea; the
                gut and its receptors need time to acclimate before the effect settles.
              </P>
              <P>
                That is why these peptides are introduced gradually rather than at full
                strength — not an arbitrary rule but a reflection of real{" "}
                <Em>receptor adaptation</Em>. Signaling systems down-regulate and
                recalibrate when flooded; easing the system in lets that adaptation happen
                without overwhelming it. The ramp-up is biology, not bureaucracy. In the
                phase 3 protocols the assigned targets were 4&nbsp;mg, 9&nbsp;mg, or
                12&nbsp;mg once weekly, but nobody started there: treatment began at
                2&nbsp;mg and stepped up every four weeks (
                <a href={REF.triumph2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Bellido et&nbsp;al., Lancet, 2026
                </a>
                ). The range at the top of this page is that span of maintenance targets,
                reported from the trials — not a dose to choose.
              </P>
            </Section>

            <Section title="What phase 3 measured">
              <P>
                Retatrutide is still <Em>investigational</Em>. The mid-stage result that
                made the reputation has not been withdrawn: in phase 2, body-weight
                reductions were among the largest then reported for the class, reaching
                roughly a quarter of body weight by 48 weeks in the most-exposed group (
                <a href={REF.reta} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jastreboff et&nbsp;al., NEJM, 2023
                </a>
                ). Phase 3 was the test of whether that lead survived contact with
                thousands of people and a longer clock. It has now reported.
              </P>
              <P>
                The trial to read first is{" "}
                <a href={REF.triumph1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  TRIUMPH-1
                </a>
                , published in the <Em>New England Journal of Medicine</Em>. Adults with
                obesity and no diabetes — 2,339 of them — were assigned once-weekly
                retatrutide at 4&nbsp;mg, 9&nbsp;mg, or 12&nbsp;mg, or placebo, for 80
                weeks. On the treatment-regimen analysis, which counts everyone randomized,
                mean body weight fell 17.6%, 23.7%, and 25.0%, against 3.9% on placebo.
                The same paper&rsquo;s knee-osteoarthritis and sleep-apnea subgroups also
                moved: pain scores and apnea–hypopnea events fell more than on placebo.
                Gastrointestinal events were the most common adverse events.
              </P>
              <TrialTable />
              <Callout label="Two numbers, one trial">
                The figure you will see quoted — 28.3% at 12&nbsp;mg, and 30.3% at 104
                weeks in people who started with a BMI of 35 or higher — is Lilly&rsquo;s
                efficacy estimand, the on-treatment analysis (
                <a href={REF.lilly1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 21 May 2026
                </a>
                ). The published primary analysis is the 25.0%. Neither number is fake.
                One asks what happened to people who stayed on the drug. The other asks
                what happened to everyone who was assigned it. A headline that prints only
                the larger one has chosen the friendlier question.
              </Callout>
              <P>
                Diabetes is a different trial, and a smaller loss, which is the usual
                pattern in this class. In{" "}
                <a href={REF.triumph2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  TRIUMPH-2
                </a>
                , 1,152 adults with obesity and type 2 diabetes were followed for 80
                weeks. On the same treatment-regimen analysis, mean weight fell 11.9%
                (4&nbsp;mg), 16.8% (9&nbsp;mg), and 18.8% (12&nbsp;mg), against 5.1% on
                placebo. Lilly&rsquo;s on-treatment figure for that 12&nbsp;mg arm is
                20.8%, with A1C down 1.4 to 1.6 percentage points from a baseline of 7.7% (
                <a href={REF.lilly2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 29 September 2026
                </a>
                ). A separate, shorter diabetes trial — TRANSCEND-T2D-1, 40 weeks, in
                people not already on a diabetes drug — reported A1C reductions of 1.7%
                to 2.0% and up to 16.8% weight loss at 12&nbsp;mg on the efficacy
                estimand (
                <a href={REF.transcend} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 19 March 2026
                </a>
                ). Do not average it into TRIUMPH-2. Different clock, different population,
                sponsor topline rather than the journal paper.
              </P>
              <P>
                Knee pain has its own paper. In TRIUMPH-4, 445 adults with obesity and
                painful knee osteoarthritis, and no diabetes, were followed for 68 weeks.
                Mean weight fell 20.0% at 9&nbsp;mg and 23.7% at 12&nbsp;mg, against 4.6%
                on placebo, and the WOMAC pain score fell further than on placebo (
                <a href={REF.triumph4} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Schnitzer et&nbsp;al., NEJM, 2026
                </a>
                ). The December 2025 sponsor release quoted 28.7% at 12&nbsp;mg. That is
                again the on-treatment analysis, not the published one.
              </P>
              <P>
                The cardiovascular trial is the one that has not yet been published.
                TRIUMPH-3, in adults with severe obesity and established cardiovascular
                disease, reported an efficacy-estimand weight loss of 22.6% at 12&nbsp;mg
                versus 3.2% on placebo at 80 weeks (
                <a href={REF.lilly23} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 23 July 2026
                </a>
                ). The prespecified event comparison did <Em>not</Em> show a heart-attack
                benefit: the hazard ratio for a five-point cardiovascular outcome was
                0.82 (95% CI 0.55 to 1.22), and for cardiovascular death, heart attack,
                or stroke it was 1.12 (0.64 to 1.96). Both intervals cross 1. A weight
                result is not a cardiovascular-outcome result, and this one is still a
                sponsor topline.
              </P>
              <P>
                Two things the program does not settle. No arm removed the glucagon
                component and left the rest, so how much of the loss is the third
                receptor — rather than a strong GLP-1/GIP drug run for 80 weeks — is
                still an inference, the point made in{" "}
                <Link href="/insights/the-hormone-we-tried-to-block" className={LINK}>
                  the hormone we tried to block
                </Link>
                . And none of these trials was a head-to-head against tirzepatide, so a
                league table built by lining the percentages up is the comparison the
                designs cannot support.
              </P>
              <P>
                The safety signal that is not the usual nausea story is dysesthesia, a
                sensory disturbance. In the published TRIUMPH-2 paper it was more common
                than placebo (4%, 6%, and 7% at 4, 9, and 12&nbsp;mg, versus 1%), and
                stopping permanently for an adverse event or death was more common at 9&nbsp;mg (12%) and
                12&nbsp;mg (8%) than on placebo (5%). Lilly&rsquo;s TRIUMPH-1 release
                reported dysesthesia in 5.1%, 12.3%, and 12.5%, versus 0.9%. Deaths
                occurred in TRIUMPH-2 in every arm, including placebo; the investigators
                judged them unrelated to the drug. Gastrointestinal events remain the
                ones the papers call most common.
              </P>
              <P>
                Approval has not followed the papers. On 29 September 2026 Lilly said it
                plans to submit a U.S. biologics license application in the first quarter
                of 2027. Checked against the public record in November 2026, that was
                still a plan, not a filed application and not an approval. The{" "}
                <Link href="/hormones/retatrutide" className={LINK}>catalog</Link> entry
                keeps the <Em>Investigational</Em> badge for that reason. Phase 3
                answered the weight question. It did not turn the molecule into a medicine.
                ).
              </P>
              <P>
                The first phase 3 trial has now been published. TRIUMPH-1 randomized
                2,339 adults with obesity and without diabetes to once-weekly
                retatrutide (4, 9 or 12&nbsp;mg) or placebo for 80 weeks (
                <a href={REF.triumph1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jastreboff et&nbsp;al., NEJM, 2026
                </a>
                ). Mean body-weight change was &minus;17.6%, &minus;23.7% and
                &minus;25.0% across the three doses, against &minus;3.9% with placebo.
                In the 574 participants with knee osteoarthritis, the 9 and 12&nbsp;mg
                doses lowered the WOMAC pain score by 3.5 and 3.6 points, against 1.9
                with placebo; in the 243 with obstructive sleep apnea, the
                apnea-hypopnea index fell by 34.3 and 31.7 events per hour, against 9.9.
                The most common adverse events were gastrointestinal.
              </P>
              <P>
                What the trial does not settle is the question this article opened with.
                TRIUMPH-1 compared the <Em>whole molecule</Em> with placebo, so it cannot
                say how much of the effect the glucagon arm or the GIP arm contributes;
                it also was not a head-to-head comparison with any other drug. And a
                published trial is not an approval: retatrutide remains under study,
                which is why its entry in the{" "}
                <Link href="/hormones/retatrutide" className={LINK}>catalog</Link> still
                carries an <Em>Investigational</Em> badge.
              </P>
            </Section>

            <Section title="The bigger shift">
              <P>
                Step back and the trajectory is clear. Peptide medicine began by{" "}
                <Em>replacing</Em> a missing hormone, moved to{" "}
                <Em>re-engineering</Em> a single signal for durability, and has now
                arrived at <Em>composing</Em> several signals into one molecule. The
                frontier is no longer a stronger agonist — it&rsquo;s the right
                combination, in the right ratio, of the hormones the body already uses.
                The instrument didn&rsquo;t get louder. It learned to play chords. Phase
                3 says the chord can be played at scale. It does not yet say which note
                did the work.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/retatrutide" label="Retatrutide — the triple agonist" />
                <CrossLink href="/hormones/glucagon" label="Glucagon — the counter-regulatory hormone" />
                <CrossLink href="/insights/glp-1-signaling" label="What GLP-1 does: how the hormone actually works" />
                <CrossLink href="/families/incretins-metabolic" label="The incretins & metabolic family" />
                <CrossLink href="/insights/the-gip-paradox" label="The GIP paradox: two drugs, one receptor" />
                <CrossLink href="/insights/the-arm-that-points-at-the-liver" label="The arm that points at the liver — survodutide’s glucagon bet" />
                <CrossLink href="/insights/the-hormone-we-tried-to-block" label="The hormone we tried to block — glucagon's century, from villain to drug target" />
                <CrossLink href="/insights/not-two-drugs-in-one" label="Why tirzepatide isn’t two drugs in one — the imbalanced, biased dual agonist" />
                <CrossLink href="/research?q=How%20does%20retatrutide%27s%20glucagon%20agonism%20add%20fat%20loss%20on%20top%20of%20GLP-1%20and%20GIP%20receptor%20activation%3F" label="Ask the research agent about the third axis" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence,
              summarized from public scientific literature and clinical-trial
              disclosures and simplified in places. Not individualized medical advice
              or a prescription. Where a dose or regimen appears it is reported from
              its source as research literacy — so you can read the evidence yourself
              — not an instruction to dose. Compounds are named to explain the science;
              retatrutide is investigational and not an approved treatment.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Published phase 3 weight analyses — not the on-treatment headline ── */
function TrialTable() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-[13px] leading-5">
          <caption className="sr-only">
            Published phase 3 weight results for retatrutide, using the analysis that counts everyone randomized, not the sponsor on-treatment figure.
          </caption>
          <thead>
            <tr className="border-b border-ink/10 font-mono text-[11px] uppercase tracking-wide text-ink/45">
              <th scope="col" className="px-4 py-3 font-normal">Trial</th>
              <th scope="col" className="px-4 py-3 font-normal">Who</th>
              <th scope="col" className="px-4 py-3 font-normal">Clock</th>
              <th scope="col" className="px-4 py-3 font-normal">Published top dose</th>
              <th scope="col" className="px-4 py-3 font-normal">Placebo</th>
            </tr>
          </thead>
          <tbody>
            {TRIALS.map((row) => (
              <tr key={row.trial} className="border-b border-ink/[0.06] align-top last:border-0">
                <th scope="row" className="px-4 py-3 font-semibold text-ink">{row.trial}</th>
                <td className="px-4 py-3 text-ink/70">{row.who}</td>
                <td className="px-4 py-3 text-ink/70">{row.time}</td>
                <td className="px-4 py-3 text-ink/80">{row.top}</td>
                <td className="px-4 py-3 text-ink/70">{row.placebo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="border-t border-ink/[0.06] px-4 py-3 text-center text-xs text-ink/40">
        Published analyses that count people who stopped the drug. TRIUMPH-1 and
        TRIUMPH-2 are treatment-regimen; TRIUMPH-4 weight is treatment-policy.
        Not the sponsor&rsquo;s on-treatment estimand, and not a ranking against
        tirzepatide.
      </figcaption>
    </figure>
  );
}

/* ── One / two / three receptors ── */
function AgonismMatrix() {
  const receptors = [
    { name: "GLP-1", color: "var(--accent)" },
    { name: "GIP", color: "var(--accent-blue)" },
    { name: "Glucagon", color: "var(--accent-amber)" },
  ];
  const rows: { drug: string; active: boolean[] }[] = [
    { drug: "Semaglutide", active: [true, false, false] },
    { drug: "Tirzepatide", active: [true, true, false] },
    { drug: "Retatrutide", active: [true, true, true] },
  ];
  const W = 560, colX = [300, 400, 500], headerY = 34, rowY = [90, 140, 190];

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} 220`} className="w-full" role="img" aria-label="Receptor activation of single, dual, and triple agonists">
        {/* receptor headers */}
        {receptors.map((r, c) => (
          <text key={r.name} x={colX[c]} y={headerY} textAnchor="middle" fill={r.color} fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
            {r.name}
          </text>
        ))}
        <text x={24} y={headerY} fill="var(--color-ink)" fillOpacity="0.4" fontSize="12" fontFamily="var(--font-geist-mono), monospace" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Receptor →
        </text>
        {rows.map((row, ri) => (
          <g key={row.drug}>
            {ri > 0 && <line x1={24} y1={rowY[ri] - 25} x2={W - 24} y2={rowY[ri] - 25} stroke="var(--color-ink)" strokeOpacity="0.06" />}
            <text x={24} y={rowY[ri] + 5} fill="var(--color-ink)" fillOpacity="0.85" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              {row.drug}
            </text>
            {receptors.map((r, c) => (
              <g key={c}>
                {row.active[c] ? (
                  <circle cx={colX[c]} cy={rowY[ri]} r="11" fill={r.color} />
                ) : (
                  <circle cx={colX[c]} cy={rowY[ri]} r="10" fill="none" stroke="var(--color-ink)" strokeOpacity="0.15" strokeWidth="1.5" />
                )}
              </g>
            ))}
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Single, dual, and triple: the same drug class, one receptor at a time.
      </figcaption>
    </figure>
  );
}
