import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink, StatusNote } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("finished-sooner")!;

export const metadata: Metadata = {
  title: "Cagrilintide Experience: What Amylin Feels Like, and What It Is Not",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

const REF = {
  phase2: "https://pubmed.ncbi.nlm.nih.gov/34798060/",
  redefine: "https://pubmed.ncbi.nlm.nih.gov/40544433/",
  phase2Registry: "https://clinicaltrials.gov/study/NCT03856047",
  redefineRegistry: "https://clinicaltrials.gov/study/NCT05567796",
} as const;

const FAQS = [
  {
    q: "Does cagrilintide feel like a GLP-1?",
    a: "The overlap is that both reduce how much people eat and both commonly cause nausea. The difference is the kind of less. GLP-1 receptor agonists such as semaglutide are widely experienced as less interest in food — the “food noise” story. Amylin, which cagrilintide mimics, is a meal-termination signal: eating starts and then stops early, with the stomach emptying more slowly. Those are neighboring hindbrain circuits, and the amylin one sits in the area postrema, which is also where nausea and vomiting are triggered. A person who liked semaglutide because meals stayed pleasant and just got smaller can find cagrilintide’s stop abrupt. That contrast is mechanism plus the adverse-event pattern in trials. Nobody has published a head-to-head study of the subjective experience.",
  },
  {
    q: "How much weight did cagrilintide lose on its own?",
    a: "In the 26-week phase 2 trial (Lau et al., Lancet 2021; 706 adults with overweight or obesity, no diabetes), once-weekly cagrilintide reduced body weight by a mean 6.0% to 10.8% across 0.3–4.5 mg, against 3.0% on placebo and 9.0% on liraglutide 3.0 mg. The 4.5 mg result, 10.8%, was the trial-product estimand — the estimate that assumes people stayed on treatment. Gastrointestinal events ran 41–63% versus 32% on placebo, mostly nausea (20–47% versus 18%). About 4% stopped for adverse events, similar across groups. The −20.4% figure at 68 weeks is not this trial. It is CagriSema, cagrilintide 2.4 mg given with semaglutide 2.4 mg, in REDEFINE-1.",
  },
  {
    q: "Why do people say cagrilintide is harder to live with than a GLP-1?",
    a: "Because the number everyone repeats is the combination, and the combination’s side-effect line is steeper. In REDEFINE-1, gastrointestinal adverse events affected 79.6% of people on cagrilintide plus semaglutide and 39.9% on placebo — nausea, vomiting, diarrhea, constipation, or abdominal pain, mostly mild to moderate and transient, in the investigators’ summary. Two drugs that both slow the stomach are not a slightly stronger version of one of them. Cagrilintide alone, in phase 2, was described as well tolerated. The reputation for being “too active” usually arrives when someone stacks it on a GLP-1 they already find effective, and then meets a second brake.",
  },
  {
    q: "Is cagrilintide approved?",
    a: "No. Cagrilintide is investigational, alone and as the cagrilintide half of CagriSema. Novo Nordisk submitted the combination to the FDA in December 2025; no decision had been announced when this page was reviewed. The only amylin drug with a U.S. label is pramlintide (Symlin, 2005), a mealtime injection used with insulin. There is no patient leaflet that tells a prospective user what a week of cagrilintide is supposed to feel like. This page is that missing orientation, from the public trial record. It is not a dosing guide and not medical advice.",
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
            <Section title="The model people bring with them">
              <P>
                <Link href="/hormones/cagrilintide" className={LINK}>Cagrilintide</Link> shows
                up, in conversation, as the thing you add when a{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> was not enough.
                The nickname is short, the reputation is that it is “strong,” and the number
                attached to it is usually the one from the combination trial. That packaging
                is why it has not traveled the way semaglutide did. A drug becomes ordinary
                when a lot of people can stay on it and still recognize their week. Cagrilintide
                is ordinary in neither sense: it is investigational, and the experience it
                produces is a poor match for the GLP-1 story people use to explain it.
              </P>
              <P>
                Semaglutide’s cultural explanation is “the noise stopped.” Food is still
                food; it just asks for less of your attention. That account is informal, and
                it is also why the drug scaled. Friends could warn each other about nausea
                in the first weeks and then describe a life that was smaller at the plate
                and otherwise intact. Cagrilintide does not have that shared script. The only
                approved amylin drug, pramlintide, is a mealtime injection paired with insulin,
                known mostly to endocrinology clinics. A prospective user of the weekly analog
                is usually meeting the hormone for the first time, through a second vial, with
                the first drug’s expectations still in place.
              </P>
              <Callout label="The mismatch">
                If the hope is “semaglutide, but more of it,” cagrilintide is the wrong
                sentence. It is a second satiety system. More brake is not the same feeling
                as a stronger version of the first brake.
              </Callout>
            </Section>

            <Section title="Two kinds of less hungry">
              <P>
                <Link href="/hormones/amylin" className={LINK}>Amylin</Link> is released with
                insulin, in the same granule, as the meal is being absorbed. Its job is to
                say that this meal has gone on long enough: slow the stomach, shrink the next
                bites, and let the hindbrain close the meal. In animals the signature is
                specific. They begin eating at a normal rate and stop sooner. The meal is
                truncated. It is not that the food became uninteresting before they sat down.
              </P>
              <P>
                GLP-1’s satiety is a wider net — gut, pancreas, and reward circuits — and the
                part people notice is often earlier than the last bite. Less looking forward
                to the meal, less finishing it out of habit, sometimes an active disinterest.
                Both hormones reduce intake. They reduce different moments of it. Someone
                whose GLP-1 experience was “I forgot to eat lunch” can experience an amylin
                analog as “I sat down hungry and was done after a few bites, with the rest of
                the plate still looking like food.” That second feeling is closer to physical
                completion than to a changed appetite, and it collides harder with dinners
                that are social, slow, or the main pleasure of the day.
              </P>
              <P>
                Pramlintide is the one place this physiology has a label. It is given at
                meals, on purpose: the signal arrives when the meal does, and it wears off.
                Cagrilintide is built to be present all week. The off switch is no longer
                timed to sitting down. Fullness, slowed emptying, and whatever nausea comes
                with them are a background, not a post-injection hour. That is the design.
                It is also the part no patient leaflet currently explains, because there is
                no label. <Grade g="reference" />
              </P>
            </Section>

            <Section title="Satiety and nausea are neighbors">
              <P>
                Amylin is read in the area postrema, a hindbrain site with a thin
                blood–brain barrier so that a circulating hormone can be heard. The same
                neighborhood is the chemoreceptor trigger zone: the place the body uses to
                decide that something in the blood should be vomited. Satiety and nausea are
                not a clean effect plus an unfortunate side effect. They are adjacent uses
                of one sensory organ. Turning the meal-ending signal up moves you toward the
                border where “I have had enough” becomes “I feel sick.”
              </P>
              <P>
                Cagrilintide is a dual agonist. It activates amylin receptors and the
                calcitonin receptor they are built from.{" "}
                <Link href="/hormones/eloralintide" className={LINK}>Eloralintide</Link> was
                later engineered to prefer the amylin receptor, and in rats it produced less
                conditioned taste aversion than cagrilintide. That comparison is preclinical,
                in a different species, and it has never been repeated head-to-head in people (
                <Link href="/insights/the-note-without-the-incretin" className={LINK}>
                  the selectivity piece
                </Link>
                ). It is still the right warning for expectations. The weekly amylin analog
                already in late-stage trials was not designed to be the gentle one. A harsher
                stop, when it happens, is consistent with how the molecule was built. It is
                not proof that a given week of nausea means the dose was wrong. <Grade g="preclinical" />
              </P>
              <P>
                The phase 2 record matches the anatomy without dramatizing it. Gastrointestinal
                events — nausea, constipation, diarrhea — were the common adverse events, and
                they rose with dose: 41% to 63% on cagrilintide 0.3–4.5 mg, against 32% on
                placebo. Nausea specifically was 20% to 47%, against 18% (
                <a href={REF.phase2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lau et al., Lancet 2021
                </a>
                ). The paper’s own word for the program was that treatment “was well tolerated.”
                Permanent discontinuation for adverse events was about 4%, and it did not
                cluster in the cagrilintide arms. Both sentences are true. Nausea in nearly
                half of people at the top dose can still leave most of them in the trial.
                “Well tolerated” in a protocol is a completion statistic. It is not a promise
                that meals will feel the way they felt before. <Grade g="clinical" />
              </P>
            </Section>

            <Section title="Which number is the drug">
              <P>
                At 26 weeks, mean weight loss on cagrilintide alone ran from 6.0% at the
                lowest dose to 10.8% at 4.5 mg once weekly, against 3.0% on placebo and 9.0%
                on liraglutide 3.0 mg daily. The 4.5 mg comparison with liraglutide was an
                estimated 1.8 percentage points (p = 0.03), on the trial-product estimand,
                which models what happened if people stayed adherent. The treatment-policy
                estimand, which keeps everyone who was randomized, landed in the same place.
                About a hundred people sat in each dose group. This is a real phase 2 result.
                It is also roughly the liraglutide neighborhood, not the poster on the group chat.
              </P>
              <Figure />
              <P>
                The poster is{" "}
                <a href={REF.redefine} target="_blank" rel="noopener noreferrer" className={LINK}>
                  REDEFINE-1
                </a>
                . Adults with overweight or obesity, no diabetes, 68 weeks, lifestyle
                intervention in every arm: cagrilintide 2.4 mg coadministered with semaglutide
                2.4 mg produced a mean −20.4% change in body weight, against −3.0% on placebo
                (treatment-policy estimand, the intention-to-treat number). Gastrointestinal
                adverse events affected 79.6% of the combination group and 39.9% of placebo,
                described as mainly transient and mild to moderate. The abstract’s conclusion
                is about the combination. It does not report the monotherapy arms’ percentages
                in the summary most people will read, which is how a two-drug result became
                the folk dose-response of one of the drugs.
              </P>
              <Callout label="Read the vial you have">
                −20.4% is two mechanisms at 68 weeks. 10.8% is cagrilintide alone at 26 weeks,
                at a higher monotherapy dose than REDEFINE used. Quoting the first as the
                expectation for the second is how people decide the drug “isn’t working” or,
                from the other direction, decide they should push it until the combination
                number appears from one pen.
              </Callout>
            </Section>

            <Section title="What changes when it is stacked">
              <P>
                The life-changing part, beyond GLP-1, is real, and it is narrower than the
                marketing sentence. On top of semaglutide, cagrilintide is a second independent
                brake on the same behavior. REDEFINE exists because the brakes add: the
                combination beat placebo by 17.3 percentage points, and the program was built
                with a semaglutide arm and a cagrilintide arm precisely so that addition could
                be seen. Addition on the scale is also addition in the stomach. Both drugs
                slow gastric emptying. A person who has already rearranged breakfast around
                semaglutide is not adding a subtle extra. They are asking a gut that empties
                late to empty later.
              </P>
              <P>
                That is the practical reason it lacks mass appeal. Semaglutide’s tolerable
                plateau is wide enough that primary care can titrate toward it and a majority
                of trial participants can stay. The combination’s gastrointestinal line — four
                in five — says the plateau is narrower. Workdays, training, childcare, and
                restaurants all assume you can eat and drink on a schedule. A drug that ends
                meals early and holds food in the stomach rewrites that schedule. Some people
                experience the rewrite as the first time in years they are not thinking about
                food, and they will trade a lot for it. Others experience it as the removal
                of a daily pleasure plus a low-grade illness. The trials did not score those
                as separate outcomes. They scored nausea, vomiting, constipation, diarrhea,
                and abdominal pain, and they scored who left.
              </P>
              <Bullets
                items={[
                  [
                    "Early fullness",
                    "The effect to expect is a meal that finishes itself: normal hunger at the start, a hard stop partway through, leftovers that do not become a snack an hour later. That is the amylin phenotype, not a quoted percentage from a diary study.",
                  ],
                  [
                    "Food sitting",
                    "Slowed gastric emptying is the mechanism, not a rare reaction. Large meals, high fat, and alcohol meet a stomach that is still working on the last one. On top of a GLP-1, this is the interaction, not a coincidence.",
                  ],
                  [
                    "Nausea as a neighbor",
                    "In phase 2, nausea tracked the dose and still left discontinuation rates similar to placebo. Feeling sick during titration is common in the class. Being unable to keep fluids down is a different event — dehydration is the risk the symptom is pointing at, and it is a reason to stop and get care, not a sign the drug is “working.”",
                  ],
                  [
                    "A smaller social life at the table",
                    "The unmeasured change is participation. Long dinners, cooking as a hobby, and eating because everyone else is eating get harder when satiety is a physical stop. GLP-1 often softens interest and leaves the occasion intact. Amylin is more likely to end the occasion.",
                  ],
                  [
                    "The weight number you were promised",
                    "Alone, think of the phase 2 range — about 6% to 11% at 26 weeks — not the combination’s 20% at 68 weeks. Either figure is a mean. It describes a group, after a protocolized escalation, with lifestyle support. It does not describe a month on an uncounted product.",
                  ],
                ]}
              />
            </Section>

            <Section title="What is still unknown">
              <P>
                No trial has asked people to describe the quality of their appetite on
                cagrilintide versus semaglutide in the same week. The food-noise account and
                the meal-termination account are the best readings of the biology and of how
                patients talk about the two classes. They are not endpoints. Fatigue, which
                became impossible to ignore in eloralintide’s phase 2, is not the lead
                finding of cagrilintide’s phase 2 abstract; absence from an abstract is not
                a demonstration that energy is spared. Taste aversion differs in rats and has
                not been compared in people.
              </P>
              <P>
                There is also no decade of ordinary use to borrow expectations from. Pramlintide
                is meal-timed and tied to insulin. Cagrilintide is weekly, albumin-bound, and
                still in front of regulators as half of a combination. Anyone using it outside
                a trial is outside the population those percentages were measured in: no
                protocol visit, no guaranteed identity or purity of the vial, no one adjusting
                a co-prescribed GLP-1 because the stomach slowed further. The trial can tell
                you the shape of the experience. It cannot underwrite the product in front of you.
              </P>
              <P>
                The orientation is short on purpose. Cagrilintide is highly active in the only
                way that matters for a first month: it pulls a brake most people have never
                felt as its own sensation, and it pulls harder when a GLP-1 is already pulled.
                The weight loss on its own is in a range an older GLP-1 already reached. The
                reason to understand it is the feeling, which is specific, physical, and easy
                to misread as a broken version of a drug you already know.
              </P>
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
                <CrossLink href="/insights/the-week-is-not-flat" label="The week is not flat — how to read one week of it" />
                <CrossLink href="/hormones/cagrilintide" label="Cagrilintide — the catalog entry" />
                <CrossLink href="/hormones/amylin" label="Amylin — the hormone being mimicked" />
                <CrossLink href="/insights/insulins-forgotten-twin" label="Insulin’s forgotten twin" />
                <CrossLink href="/insights/the-molecule-that-is-both-halves" label="CagriSema and amycretin — two drugs or one" />
                <CrossLink href="/insights/the-note-without-the-incretin" label="Eloralintide — amylin without the GLP-1" />
                <CrossLink href="/insights/two-numbers-one-trial" label="Why one trial reports two percentages" />
                <CrossLink
                  href="/research?q=What%20did%20the%20cagrilintide%20phase%202%20and%20REDEFINE-1%20trials%20report%20for%20weight%20loss%20and%20gastrointestinal%20adverse%20events%3F"
                  label="Ask the research agent for the trial numbers"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and published trial results, summarized from
              the public record. Doses appear only as the doses those trials studied, so the
              monotherapy result is not confused with the combination. Not a dosing guide,
              not medical advice, and not an endorsement of any use. Someone who cannot keep
              fluids down, or who is using insulin or a GLP-1 and becomes acutely ill, needs
              a clinician. <StatusNote of={["cagrilintide", "cagrisema", "pramlintide", "semaglutide"]} />
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

function Figure() {
  const rows = [
    ["Cagrilintide alone, 0.3–4.5 mg", "Phase 2, 26 weeks", "−6.0% to −10.8%", "GI events 41–63%; nausea 20–47%"],
    ["Liraglutide 3.0 mg", "Same trial", "−9.0%", "Active control, not a GLP-1 of the current generation"],
    ["Placebo", "Same trial", "−3.0%", "GI events 32%; nausea 18%"],
    ["Cagrilintide 2.4 + semaglutide 2.4", "REDEFINE-1, 68 weeks", "−20.4%", "GI events 79.6%"],
    ["Placebo", "REDEFINE-1", "−3.0%", "GI events 39.9%"],
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-ink/10 text-ink/50">
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">What was given</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">Trial</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">Mean weight</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">The part you feel</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0] + r[1]} className="border-b border-ink/[0.06] last:border-0">
              {r.map((cell) => (
                <td key={cell} className="px-4 py-3 text-ink/80">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="px-4 py-3 text-xs leading-5 text-ink/40">
        Phase 2 weight figures are the trial-product estimand (Lau et al., Lancet 2021);
        the treatment-policy estimand was similar. REDEFINE-1 weight figures are the
        treatment-policy estimand (Garvey et al., NEJM 2025). The combination row is not a
        forecast for cagrilintide alone. Registries:{" "}
        <a href={REF.phase2Registry} className="underline decoration-ink/20 underline-offset-2">NCT03856047</a>
        {", "}
        <a href={REF.redefineRegistry} className="underline decoration-ink/20 underline-offset-2">NCT05567796</a>.
      </figcaption>
    </figure>
  );
}

const GRADES = {
  reference: {
    label: "Reference",
    hue: "text-accent-teal bg-accent-teal/10 border-accent-teal/30",
    note: "A label, a registry, or the hormone’s established physiology.",
  },
  clinical: {
    label: "Clinical",
    hue: "text-accent-blue bg-accent-blue/10 border-accent-blue/30",
    note: "Human trial data, randomized and placebo-controlled unless stated.",
  },
  preclinical: {
    label: "Preclinical",
    hue: "text-accent-amber bg-accent-amber/10 border-accent-amber/30",
    note: "Animal or cell data; no human head-to-head of the same comparison.",
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
