import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("when-the-drug-works-too-well")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources - named inline so the evidence stays checkable.
const REF = {
  step1ext: "https://doi.org/10.1111/dom.14725",
  step4: "https://jamanetwork.com/journals/jama/fullarticle/2777886",
  surmount4: "https://pubmed.ncbi.nlm.nih.gov/38078870/",
  sumithran: "https://www.nejm.org/doi/full/10.1056/NEJMoa1105816",
  fothergill: "https://doi.org/10.1002/oby.21538",
  regainMeta: "https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(26)00043-X/fulltext",
} as const;

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family))} />
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
            <Section title="The people it helped most">
              <P>
                There is a particular kind of quiet distress that shows up once the
                weight is off. The drug worked. It worked better than anything the person
                had tried in twenty years of trying. And now the thought of stopping -
                because of cost, or supply, or a doctor&rsquo;s raised eyebrow, or just the
                sense that surely one shouldn&rsquo;t <Em>need</Em> a medication forever -
                arrives with a knot of something like shame. <Em>Why can&rsquo;t I just
                keep this off on my own?</Em>
              </P>
              <P>
                Here is the first and most important thing this piece has to say: that
                question is aimed at the wrong target. The difficulty of coming off a{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> is not a
                referendum on your discipline. It is the predictable, well-documented
                behavior of a body that is very good at defending its own fat mass - and
                the better the drug worked, the more there is to defend. The efficacy and
                the difficulty are the same fact seen from two sides.
              </P>
              <Callout label="The reframe in one line">
                A GLP-1 that is hard to stop is not a drug that trapped you. It is a drug
                that is still doing its job - and the job, it turns out, does not finish.
              </Callout>
            </Section>

            <Section title="Your body is defending a number">
              <P>
                Bodyweight is not a passive readout of calories in and out. It is a
                regulated variable, held near a value the brain treats as correct - the
                so-called defended weight, or set point. Lose a meaningful amount of it
                and the hypothalamus does not shrug; it mounts a coordinated,
                multi-system defense to get the fat back. Three arms of that defense do
                most of the work:
              </P>
              <Bullets
                items={[
                  ["Hunger turns up", "Ghrelin, the stomach's hunger signal, rises. Appetite climbs above where it sat before you ever lost the weight - the drive to eat is not just restored, it is amplified."],
                  ["Fullness turns down", "Leptin, the hormone fat tissue uses to report how much fuel is in the tank, falls with fat mass - and satiety signals like PYY drop with it. Meals stop registering as filling as quickly."],
                  ["The engine idles lower", "Energy expenditure falls by more than the smaller body should require - adaptive thermogenesis. You burn fewer calories at rest than a never-dieted person of the same size."],
                ]}
              />
              <P>
                The cruel part is how long this lasts. In a landmark study, people who
                lost weight on a strict diet still had elevated hunger hormones and
                suppressed satiety hormones a <Em>full year</Em> later - the appetite
                changes had not reverted at all (
                <a href={REF.sumithran} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sumithran et&nbsp;al., 2011, NEJM
                </a>
                ). Follow-up of &ldquo;The Biggest Loser&rdquo; contestants found the
                metabolic slowdown persisted <Em>six years</Em> on (
                <a href={REF.fothergill} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Fothergill et&nbsp;al., 2016
                </a>
                ). The defense does not know the weight came off on purpose. It just
                knows the tank looks low, and it pushes to refill it - for years.
              </P>
              <DefenseDiagram />
            </Section>

            <Section title="What the drug is actually doing">
              <P>
                Once you see the defense clearly, the GLP-1 stops looking like a weight-
                loss trick and starts looking like what it is: a <Em>counterweight</Em>.
                The drug does not delete the hunger signal or reset the set point. It sits
                on the other side of the scale, pharmacologically opposing the defense -
                turning appetite down, slowing gastric emptying, and making the brain read
                &ldquo;enough&rdquo; sooner. For as long as it is on board, the body&rsquo;s
                push to regain is matched by an equal push the other way.
              </P>
              <P>
                Which tells you exactly what stopping does. It does not return you to some
                neutral baseline. It <Em>removes the counterweight</Em> from a defense
                that never left. The hunger, the blunted fullness, the lowered burn - all
                of it is still there, quietly, the whole time you were succeeding. Take
                the drug away and that biology is simply unopposed again. Weight regain
                after stopping is not relapse in the moral sense. It is untreated obesity
                resuming, on schedule.
              </P>
            </Section>

            <Section title="What the withdrawal trials show">
              <P>
                This is not a hunch or a metaphor stretched too far - it is one of the
                most consistent findings in the whole metabolic literature, because the
                trials were deliberately built to test it. Take people who have already
                lost weight on the drug, split them into keep-going and stop groups, and
                watch. The picture is the same every time.
              </P>
              <TrajectoryChart />
              <TrialTable />
              <P>
                Read together, these say something both sobering and clarifying: the loss
                holds while the drug is on board and reverses when it comes off, across
                different molecules and different trials. A 2026 meta-analysis pooling
                cessation data landed on the same trajectory (
                <a href={REF.regainMeta} target="_blank" rel="noopener noreferrer" className={LINK}>
                  eClinicalMedicine, 2026
                </a>
                ). The authors of the first big withdrawal study put it plainly: the
                results &ldquo;confirm the chronicity of obesity.&rdquo;
              </P>
            </Section>

            <Section title="Chronic is the honest word">
              <P>
                That word - <Em>chronic</Em> - is the one that dissolves the shame. We do
                not ask why a blood-pressure pill stops working once you stop swallowing
                it. Nobody feels like a failure for needing thyroid hormone every morning,
                or for the fact that a statin&rsquo;s benefit vanishes weeks after the last
                dose. We understand those as management of ongoing conditions, not as
                dependencies to be embarrassed about. Obesity, the withdrawal data says,
                behaves the same way.
              </P>
              <Callout label="Not addiction - a different thing entirely">
                It is worth being precise, because the language of &ldquo;can&rsquo;t quit&rdquo;
                invites the wrong comparison. GLP-1 agonists are not reinforcing: there is
                no high, no craving for the drug itself, no need to escalate the dose to
                chase a feeling, and no withdrawal syndrome when you stop. What comes back
                is appetite, not a habit. If anything, the early signals point the other
                way - this class is being studied for <Em>reducing</Em> addictive
                behaviors. &ldquo;Hard to stop&rdquo; here means &ldquo;the condition is
                still there,&rdquo; not &ldquo;the drug has hold of you.&rdquo;
              </Callout>
              <P>
                None of which means anyone is sentenced to injections forever. It means
                the honest starting frame is maintenance, not cure - and that time off,
                when it is the right call, is a decision made with open eyes rather than a
                test of character you were always going to fail.
              </P>
            </Section>

            <Section title="So when is time off reasonable?">
              <P>
                Plenty of the time, there are real and good reasons to pause, taper, or
                stop - and wanting to is not irrational. What matters is separating the
                reasons that come with a plan from the ones driven by that misplaced
                shame. Legitimate reasons a clinician will actually work with:
              </P>
              <Bullets
                items={[
                  ["Pregnancy or trying to conceive", "Labels advise stopping well before a planned pregnancy - two months ahead, for semaglutide - because safety in pregnancy is not established. This is a clear, non-negotiable off-ramp."],
                  ["Surgery and procedures", "Because these drugs slow gastric emptying, anesthesia guidance now advises holding them before procedures to lower aspiration risk. A planned, temporary pause with a restart date."],
                  ["Cost, supply, or side effects", "The most common real-world reasons. They are worth naming honestly rather than dressing up as willpower - and they are exactly the constraints the next generation of drugs is built to ease."],
                  ["A considered trial off", "Some people have lost a modest amount, built durable habits, and want to see whether they can hold it on a lower dose or none. A reasonable experiment - if it is run as an experiment, with a plan."],
                ]}
              />
              <P>
                For many people with established obesity, the plain reality is that
                indefinite maintenance is the medically sound answer, the same way it is
                for hypertension. That is not a defeat. But time off is a legitimate
                choice, and the difference between it going well and going badly is almost
                entirely in how it is done.
              </P>
            </Section>

            <Section title="And how to do it well">
              <P>
                If you and a clinician decide to step down, the biology above points to a
                handful of principles. None of this is a protocol - doses and timing
                belong to you and your prescriber - but the shape of a good off-ramp is
                well understood.
              </P>
              <Bullets
                items={[
                  ["Prefer a maintenance dose to a cliff", "The emerging strategy is treat-to-maintain: find the lowest dose that holds the loss rather than stopping outright. The counterweight can often be smaller than the dose it took to lose the weight - it just cannot usually go to zero."],
                  ["Taper, do not drop", "Stepping the dose down gradually gives appetite time to rise slowly instead of rebounding all at once. The evidence for tapering specifically is still thin, but it follows directly from how the defense behaves."],
                  ["Build the scaffolding while you are on it", "The quiet-appetite window the drug creates is the time to install what has to hold afterward: protein at every meal and resistance training to protect muscle (see the muscle-preservation piece), plus the routines that outlast the prescription."],
                  ["Set a restart trigger in advance", "Decide, before you taper, the amount of regain at which you resume - and treat hitting it as the plan working, not as failure. An off-ramp with a return ticket. Stopping is not a one-way test you pass or flunk."],
                  ["Expect appetite to come back", "It will, and it is not the drug 'leaving your system' punishing you - it is your own physiology resuming. Naming that in advance takes most of the sting out of it."],
                ]}
              />
            </Section>

            <Section title="The frontier: making maintenance easy">
              <P>
                Here is the genuinely hopeful part, and it is where this site likes to
                live. The hard scientific problem - can we reliably strip large amounts of
                fat from the human body? - is essentially solved. The frontier has moved
                to a friendlier question: can we make <Em>keeping it off</Em> so low-
                burden that staying on treatment stops feeling like a burden at all? A lot
                of very good work is pointed straight at that.
              </P>
              <Bullets
                items={[
                  ["Maintenance that barely registers", "Oral GLP-1s like orforglipron and longer-interval dosing are turning maintenance from a weekly injection into something closer to a daily pill or an occasional one - the kind of regimen people actually stay on for years."],
                  ["Higher-quality weight to defend", "Pairing a GLP-1 with myostatin-pathway drugs preserves, even builds, muscle during loss. Keep more of the metabolically active tissue and the weight you hold is sturdier and easier to maintain."],
                  ["Induction, then maintenance", "The field is starting to think in two phases - a stronger agent to get the weight off, a gentler one to keep it there - borrowing a playbook that works across chronic medicine."],
                  ["Does the defense ever ease?", "The open, optimistic question: whether deep, sustained loss can gradually lower the defended weight itself, so maintenance gets easier over time rather than staying a lifelong standoff. Unproven - but exactly the right thing to be studying."],
                ]}
              />
              <P>
                So if you are the person at the top of this piece - the one it worked for,
                quietly worried about the day you stop - the science is on your side twice
                over. Once, in telling you the struggle was never a character flaw. And
                again, in the direction of travel: toward maintenance so easy that the
                question stops being <Em>how do I get off this?</Em> and becomes simply{" "}
                <Em>how do I keep feeling this good?</Em>
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/glp-1-muscle-preservation" label="Keeping the muscle on GLP-1 (build the scaffolding)" />
                <CrossLink href="/hormones/leptin" label="Leptin - the hormone that reports your fat stores" />
                <CrossLink href="/hormones/ghrelin" label="Ghrelin - the hunger signal that rises after loss" />
                <CrossLink href="/insights/peptide-half-life-engineering" label="Why one dose lasts a week (and where dosing is headed)" />
                <CrossLink href="/hormones/semaglutide" label="Semaglutide reference" />
                <CrossLink href="/research?q=What%20does%20the%20evidence%20show%20about%20weight%20regain%20after%20stopping%20GLP-1%20drugs%2C%20and%20do%20maintenance%20or%20tapering%20strategies%20help%3F" label="Ask the research agent about maintenance strategies" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on the physiology of weight regulation and the
              published withdrawal-trial evidence, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing guidance, or
              a recommendation to start, stop, or change any medication - decisions about
              treatment belong with your own clinician. Verify any claim against the linked
              primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The body's defense of its fat mass: three arms converging on regain ── */
function DefenseDiagram() {
  const arms: { label: string; sub: string; color: string }[] = [
    { label: "Ghrelin ↑", sub: "hunger climbs above baseline", color: "var(--accent-amber)" },
    { label: "Leptin · PYY ↓", sub: "fullness signals fall", color: "var(--accent-blue)" },
    { label: "Expenditure ↓", sub: "the body burns less at rest", color: "var(--accent-teal)" },
  ];
  const W = 560, H = 250;
  const boxW = 150, boxH = 74, gap = 20;
  const totalW = arms.length * boxW + (arms.length - 1) * gap;
  const x0 = (W - totalW) / 2;
  const boxY = 26;
  const targetY = 176, targetH = 52, targetW = 300, targetX = (W - targetW) / 2;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-lg" role="img" aria-label="After weight loss the body defends its fat mass three ways - rising hunger, falling fullness signals, and lower energy expenditure - all pushing weight back up">
        {arms.map((a, i) => {
          const x = x0 + i * (boxW + gap);
          const cx = x + boxW / 2;
          return (
            <g key={a.label}>
              <rect x={x} y={boxY} width={boxW} height={boxH} rx={13} fill="var(--panel)" stroke={a.color} strokeOpacity={0.4} />
              <text x={cx} y={boxY + 30} textAnchor="middle" fill="var(--color-ink)" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
                {a.label}
              </text>
              <text x={cx} y={boxY + 51} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11.5">
                {a.sub}
              </text>
              {/* connector to the target */}
              <line x1={cx} y1={boxY + boxH} x2={W / 2} y2={targetY - 8} stroke="var(--color-ink)" strokeOpacity="0.2" strokeWidth="1.5" />
            </g>
          );
        })}
        <path d={`M ${W / 2 - 6} ${targetY - 9} L ${W / 2} ${targetY - 1} L ${W / 2 + 6} ${targetY - 9}`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />
        <rect x={targetX} y={targetY} width={targetW} height={targetH} rx={14} fill="color-mix(in srgb, var(--accent-rose) 12%, transparent)" stroke="var(--accent-rose)" strokeOpacity={0.65} strokeWidth={2} />
        <text x={W / 2} y={targetY + 24} textAnchor="middle" fill="var(--color-ink)" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Weight pushed back up
        </text>
        <text x={W / 2} y={targetY + 43} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="11.5">
          the defended weight, reasserting itself
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        A GLP-1 drug works against all three arms at once. Stop it and the three arms,
        which never went away, are simply unopposed again.
      </figcaption>
    </figure>
  );
}

/* ── Schematic of the randomized-withdrawal pattern: keep going vs. stop ── */
function TrajectoryChart() {
  const W = 560, H = 340;
  const yFor = (pct: number) => 40 + -pct * 11.5; // 0% → 40, −20% → 270
  const x0 = 70, xR = 250, xE = 510;
  const grid = [0, -5, -10, -15, -20];

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-xl" role="img" aria-label="Schematic weight trajectory: everyone loses weight on the drug, then at the stop point those who keep taking it hold or keep losing while those who stop regain most of it within a year">
        {/* gridlines + y labels */}
        {grid.map((g) => (
          <g key={g}>
            <line x1={x0} y1={yFor(g)} x2={xE} y2={yFor(g)} stroke="var(--color-ink)" strokeOpacity="0.08" strokeWidth="1" />
            <text x={x0 - 10} y={yFor(g) + 4} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.4" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif">
              {g}%
            </text>
          </g>
        ))}

        {/* randomization marker */}
        <line x1={xR} y1={yFor(0)} x2={xR} y2={yFor(-20)} stroke="var(--color-ink)" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x={xR} y={yFor(0) - 8} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">
          stop point
        </text>

        {/* shared lead-in: everyone loses on the drug */}
        <path d={`M ${x0} ${yFor(0)} Q 150 ${yFor(-7)} ${xR} ${yFor(-11)}`} fill="none" stroke="var(--accent-blue)" strokeWidth="3" strokeLinecap="round" />

        {/* keep going: holds and keeps drifting down */}
        <path d={`M ${xR} ${yFor(-11)} Q 380 ${yFor(-15)} ${xE} ${yFor(-18)}`} fill="none" stroke="var(--accent-teal)" strokeWidth="3" strokeLinecap="round" />
        {/* stop: climbs back toward baseline */}
        <path d={`M ${xR} ${yFor(-11)} Q 380 ${yFor(-6)} ${xE} ${yFor(-4)}`} fill="none" stroke="var(--accent-rose)" strokeWidth="3" strokeLinecap="round" />

        {/* end dots + labels */}
        <circle cx={xE} cy={yFor(-18)} r="4.5" fill="var(--accent-teal)" />
        <circle cx={xE} cy={yFor(-4)} r="4.5" fill="var(--accent-rose)" />
        <text x={xE - 8} y={yFor(-18) + 20} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.7" fontSize="12" fontWeight="600">
          kept taking it
        </text>
        <text x={xE - 8} y={yFor(-4) - 10} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.7" fontSize="12" fontWeight="600">
          stopped - most of it back
        </text>

        {/* x-axis labels */}
        <text x={x0} y={H - 14} textAnchor="start" fill="var(--color-ink)" fillOpacity="0.4" fontSize="11">
          start on drug
        </text>
        <text x={xE} y={H - 14} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.4" fontSize="11">
          about a year later
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Schematic of the randomized-withdrawal pattern, drawn from the trials below. The
        blue lead-in is everyone losing weight on the drug; after the stop point the paths
        split by one variable only - whether the drug stays on board.
      </figcaption>
    </figure>
  );
}

/* ── The withdrawal trials, with checkable results ── */
function TrialTable() {
  const rows: { trial: React.ReactNode; drug: string; result: string }[] = [
    {
      trial: (
        <a href={REF.step1ext} target="_blank" rel="noopener noreferrer" className={LINK}>
          STEP&nbsp;1 extension
        </a>
      ),
      drug: "Semaglutide",
      result: "One year after stopping, participants had regained about two-thirds of the weight they had lost - the group mean drifting back from roughly −17% toward −6%.",
    },
    {
      trial: (
        <a href={REF.step4} target="_blank" rel="noopener noreferrer" className={LINK}>
          STEP&nbsp;4
        </a>
      ),
      drug: "Semaglutide",
      result: "Randomized at week 20 after an initial loss. Those who kept taking it lost a further 7.9%; those switched to placebo regained 6.9% - a 14.8-point gap that opened the moment the drug came off.",
    },
    {
      trial: (
        <a href={REF.surmount4} target="_blank" rel="noopener noreferrer" className={LINK}>
          SURMOUNT-4
        </a>
      ),
      drug: "Tirzepatide",
      result: "After a 36-week lead-in, continuing lost another 5.5% while placebo regained 14.0%. Nearly 90% of continuers held most of their loss, versus about 17% of those who stopped.",
    },
  ];

  return (
    <figure className="my-2 overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          Randomized-withdrawal trials of GLP-1-class drugs showing weight regain after stopping
        </caption>
        <thead className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
          <tr className="border-b border-ink/10">
            <th scope="col" className="p-3 font-medium">Trial</th>
            <th scope="col" className="p-3 font-medium">Drug</th>
            <th scope="col" className="p-3 font-medium">What stopping did</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-ink/[0.06] align-top last:border-0">
              <th scope="row" className="p-3 font-normal whitespace-nowrap">{r.trial}</th>
              <td className="p-3 text-ink/70">{r.drug}</td>
              <td className="p-3 text-ink/70">{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="border-t border-ink/10 p-3 text-center text-xs text-ink/40">
        Randomized-withdrawal designs: lose the weight on the drug, then keep going or
        stop. The verdict is consistent across molecules - the effect lasts as long as the
        treatment does.
      </figcaption>
    </figure>
  );
}
