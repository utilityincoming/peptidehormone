import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Callout, Bullets, CrossLink, StatusNote } from "@/components/insight";
import { DocumentedRange } from "@/components/DocumentedRange";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-week-is-not-flat")!;

export const metadata: Metadata = {
  title: "Cagrilintide Across the Week: Why One Day Is a Bad Sample",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

const REF = {
  phase2: "https://pubmed.ncbi.nlm.nih.gov/34798060/",
  redefine: "https://pubmed.ncbi.nlm.nih.gov/40544433/",
} as const;

const FAQS = [
  {
    q: "Why does appetite come back before the next weekly dose?",
    a: "Cagrilintide’s reported human half-life is about 159 to 195 hours, on the order of a week. A half-life of that length means roughly half of a dose is still circulating seven days later, and roughly half is gone. Late-week hunger is what that fade feels like. It is not, by itself, evidence that the drug stopped working or that the body has become tolerant. Weekly dosing also stacks: each injection lands on what remains of the earlier ones, so the level is still rising for several weeks even when the injected amount is unchanged. A single day in week one is a poor sample of the week, and a poor sample of the later weeks.",
  },
  {
    q: "Is the first month the drug, or the ramp?",
    a: "In the 26-week phase 2 trial the treatment period included a dose-escalation of up to six weeks, then the assigned dose, then a six-week follow-up with no treatment. Six of the twenty-six weeks were the ramp by design. Gastrointestinal events were the common adverse events. In the later combination trial, REDEFINE-1, those events were described as mainly transient and mild to moderate. Transient is a group description, not a promise that a given person’s nausea ends on a schedule. Judging the drug entirely inside the escalation window judges the ramp.",
  },
  {
    q: "What else did the phase 2 trial record besides nausea?",
    a: "The most frequent adverse events were gastrointestinal disorders — the abstract names nausea, constipation, and diarrhea — and administration-site reactions. Nausea was 20% to 47% across the cagrilintide doses, against 18% on placebo. Constipation and diarrhea are both on the list because a slower gut is not one symptom. Injection-site reactions were common enough to be named beside the gut events, and they are the part the informal account usually leaves out. The paper called the treatment well tolerated: about 4% stopped for adverse events, similar across groups.",
  },
  {
    q: "Does the effect stay after you stop?",
    a: "The phase 2 trial was built with a six-week follow-up off treatment, which is the investigators saying the question matters. The abstract does not give the off-treatment weight curve. What the design does say is that exposure was expected to end. A week-long half-life clears over a few weeks, not overnight and not never. Anyone treating a result on the drug as a result they now own is ahead of the evidence.",
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
            <Section title="One day is a bad sample">
              <P>
                <Link href="/hormones/cagrilintide" className={LINK}>Cagrilintide</Link> is
                injected once a week, and a weekly habit trains people to treat the drug as a
                weekly mood: on, or not on. The pharmacokinetics do not work that way. The
                human half-life reported for it is 159 to 195 hours — about seven to eight
                days. At the next injection, on that range, something like half of the
                previous dose is still in circulation and something like half is gone. The
                week has a high end and a low end. Appetite returning on day six is what the
                low end feels like.
              </P>
              <P>
                That return gets misread in both directions. As failure: the drug wore off,
                so it is not strong enough. As a cue to add more before the week is over. The
                first reading ignores the clock. The second fights it. A half-life near the
                dosing interval also means the injections stack. Each new one lands on the
                remainder of the earlier ones, so the level keeps rising for several weeks
                even when the amount injected does not change. Week one at a given amount is
                not week six at the same amount. The shape — a rise over weeks, and inside
                each week a fall of about half — is what a half-life of this length implies.
                It is not a published hour-by-hour curve of how hungry a person will be.
                <Grade g="clinical" />
              </P>
              <Callout label="The misread">
                Late-week hunger is the fade the half-life predicts. It is a weak reason to
                decide the drug has quit, and a weak reason to shorten the week.
              </Callout>
              <DocumentedRange id="cagrilintide" />
              <P>
                The box is the upper phase-2 span — 2.4 to 4.5&nbsp;mg once weekly —
                not the 0.3&nbsp;mg start and not a dose to pick. How to tell a target
                from a titration start is{" "}
                <Link href="/insights/how-to-read-peptide-dosing" className={LINK}>
                  how to read a peptide dose
                </Link>
                .
              </P>
            </Section>

            <Section title="The ramp is a large part of the trial">
              <P>
                The phase 2 weight trial did not start people at the dose it judged them on.
                Its 26-week treatment period included an escalation of up to six weeks, and
                after treatment stopped there was a six-week follow-up with nothing on board (
                <a href={REF.phase2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lau et al., Lancet 2021
                </a>
                ). Nearly a quarter of the time anyone spent on the drug, in that protocol,
                was the climb. The result everyone quotes from it — a mean 10.8% at 4.5 mg,
                against 9.0% on liraglutide and 3.0% on placebo — is the end of that climb,
                not a portrait of the first Saturday.
              </P>
              <P>
                Gastrointestinal events were common and rose with dose. The combination trial
                later described its own gastrointestinal events as mainly transient and mild
                to moderate (
                <a href={REF.redefine} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Garvey et al., NEJM 2025
                </a>
                ). “Mainly transient” is how a cohort looks in a paper. It does not schedule
                an individual’s nausea. What it does support is the class pattern: the worst
                of the gut effects sits early, while the level is still being walked up, and
                a verdict passed entirely inside those weeks is a verdict on the ramp. The
                phase 2 paper still called the program well tolerated, because stopping for
                adverse events was about 4% and did not single the drug out. Both can be true
                of a drug that is unpleasant for a month and then merely present. <Grade g="clinical" />
              </P>
            </Section>

            <Section title="A slower gut is more than nausea">
              <P>
                The phase 2 abstract names the frequent events in one sentence: gastrointestinal
                disorders, for example nausea, constipation, and diarrhea, and administration-site
                reactions. Nausea has a number, 20% to 47% against 18% on placebo. Constipation
                and diarrhea are listed and not separately counted in that summary. They belong
                in the expectation anyway. Amylin slows the stomach. A gut that moves more
                slowly can be queasy, backed up, or unpredictably loose, including in the same
                person across a month. People who arrive from a GLP-1 often know nausea and do
                not expect the other two to be part of the same mechanism.
              </P>
              <P>
                Injection-site reactions are the event the informal account drops. They were
                frequent enough, in a 706-person trial, to be named next to the gut. A weekly
                injection that stings, itches, or leaves a knot is not a sign the vial is
                wrong, and it is also not nothing. It is in the published tolerability, beside
                the weight number, and it is one more way the drug occupies the week rather
                than disappearing into it.
              </P>
              <P>
                The quality of the appetite change is the other half of reading a day
                correctly, and it is the subject of{" "}
                <Link href="/insights/finished-sooner" className={LINK}>Finished sooner</Link>.
                Short version, so this piece can stay on the clock: hunger at the first bite
                can be real. The amylin signal truncates the meal. A day that starts with an
                ordinary appetite and ends after a few bites is the drug showing up, not the
                drug missing. Comparing that day with a GLP-1 day in which food never came to
                mind is comparing two clocks and two signals at once.
              </P>
            </Section>

            <Section title="It leaves when the exposure leaves">
              <P>
                The follow-up without treatment is easy to skip and it is the most useful
                sentence in the design. The investigators planned six weeks of watching people
                who were no longer taking it. The abstract does not report how fast the weight
                came back, so this page will not invent a regain curve. The structure is the
                evidence: exposure was expected to end, and the question of what remains was
                left open rather than assumed.
              </P>
              <P>
                A half-life of about a week does put a bound on the feeling. After the last
                injection the level keeps halving on that same clock. It is not gone the next
                morning, and it is not a permanent edit. Someone who has rearranged eating
                around the drug is rearranged around a level that will fall. The{" "}
                <Link href="/hormones/pramlintide" className={LINK}>pramlintide</Link> label,
                the only approved amylin drug, is the older version of the same fact: the
                signal is given with the meal because that is when it is wanted, and it is
                short. Cagrilintide lengthens the signal to a week. Lengthening is not the
                same as installing it.
              </P>
              <Bullets
                items={[
                  [
                    "Day six",
                    "More appetite than day two is the fade a one-week half-life predicts. It is not a tolerance test and not a prompt to compress the interval.",
                  ],
                  [
                    "Week one",
                    "The phase 2 protocol spent up to six weeks escalating. The first week is the bottom of a ramp, and, even at a fixed amount, not yet the stacked level of later weeks.",
                  ],
                  [
                    "The gut",
                    "Nausea, constipation, and diarrhea were named together. A slower stomach can show up as any of the three. Being unable to keep fluids down is the point where that stops being an expectation and becomes a reason to get care.",
                  ],
                  [
                    "The injection site",
                    "Reactions were among the most frequent adverse events in phase 2. They are part of the published week, not an anecdote about a bad batch.",
                  ],
                  [
                    "After the last dose",
                    "The trial scheduled six weeks off treatment. The effect is leased for as long as the level lasts. The abstract does not say how much of the weight loss outlives it.",
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
                <CrossLink href="/insights/finished-sooner" label="Finished sooner — the feeling, apart from the GLP-1 story" />
                <CrossLink href="/hormones/cagrilintide" label="Cagrilintide — the catalog entry" />
                <CrossLink href="/insights/peptide-half-life-engineering" label="How a peptide is made to last a week" />
                <CrossLink href="/insights/insulins-forgotten-twin" label="Amylin, the signal being prolonged" />
                <CrossLink href="/tools/half-life" label="Half-life calculator — the shape of a weekly clock" />
                <CrossLink
                  href="/research?q=What%20is%20the%20human%20half-life%20of%20cagrilintide%20and%20how%20did%20phase%202%20structure%20dose%20escalation%20and%20follow-up%3F"
                  label="Ask the research agent about the clock"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reading of published pharmacokinetics and trial design. The
              within-week fall of about half is what a 159–195 hour half-life implies at a
              seven-day interval. It is not a personal curve, and nothing here is a schedule
              to follow. Not individualized medical advice or a prescription. Where a dose or
              regimen appears it is reported from its source as research literacy — so you
              can read the evidence yourself — not an instruction to dose.{" "}
              <StatusNote of={["cagrilintide", "pramlintide", "semaglutide"]} />
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

const GRADES = {
  clinical: {
    label: "Clinical",
    hue: "text-accent-blue bg-accent-blue/10 border-accent-blue/30",
    note: "Human pharmacokinetic or trial data.",
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
