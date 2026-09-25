import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-famine-without-the-slowdown")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

const PAPER = "https://doi.org/10.1038/s41586-026-10940-7";

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
            <Section title="Ninety years of the same experiment">
              <P>
                In 1935 a Cornell nutritionist named Clive McCay underfed young rats
                and watched them outlive their well-fed cage-mates by a wide margin.
                It is the oldest reproducible result in the biology of ageing, and it
                has held up in yeast, worms, flies, mice, and, with the usual caveats,
                rhesus monkeys. Cut the calories – not the nutrients, just the energy –
                and the animal ages more slowly. <Em>Calorie restriction</Em> is the
                benchmark every other longevity intervention gets measured against.
              </P>
              <P>
                For most of those ninety years there was a tidy explanation attached.
                A restricted animal runs cooler and slower: its resting metabolic rate
                drops, its body temperature drops, it makes less of the oxidative
                by-product that was supposed to be the wear-and-tear of living. The
                &ldquo;rate of living&rdquo; idea goes back to Max Rubner in 1908 and
                Raymond Pearl in the 1920s, and it is intuitive enough to survive in
                every gym conversation about &ldquo;slowing your metabolism.&rdquo; The
                famine works, the story went, because it turns the engine down.
              </P>
              <P>
                Nobody wanted to actually live that way, so from the late 1990s the
                field went looking for a <Em>calorie-restriction mimetic</Em>: a
                molecule that would trip the same protective program without the
                hunger. Metformin was nominated. Resveratrol was nominated and mostly
                withdrawn. Rapamycin was the one that stuck, and it stuck for a
                specific reason worth holding onto: in 2009 the NIA&rsquo;s
                Interventions Testing Program started mice on it at 600 days old –
                twenty months, roughly a sixty-year-old human – and still extended
                their lives. Late start, real effect. That is the bar.
              </P>
            </Section>

            <Section title="A twenty-month-old mouse gets a weekly shot">
              <P>
                On 2 September 2026 Danica Chen&rsquo;s group at UC Berkeley published
                a{" "}
                <a href={PAPER} className={LINK} target="_blank" rel="noopener noreferrer">
                  paper in <Em>Nature</Em>
                </a>{" "}
                with a title that says exactly what it did: late-life semaglutide
                treatment slows ageing and extends lifespan in female mice. The design
                deliberately echoes the rapamycin precedent. Healthy female mice, aged
                twenty months, put on injectable{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link>{" "}
                – one cohort for three months of deep phenotyping, a second cohort for
                the rest of their lives. Alongside them ran the classic arm: mice fed
                24% fewer calories. And alongside both, untreated controls.
              </P>
              <P>
                The lifespan result is the headline and it is a real one. Median
                lifespan in the semaglutide arm ran about 100 days past the controls,
                a gain of roughly 12%. In a mouse that has already lived twenty
                months, that is a lot of extra mouse. Within three months of starting
                the drug the treated animals were more exploratory in the open field,
                held glucose better, ran longer on the treadmill, and remembered
                spatial layouts better than their untreated peers. Stem cells in the
                bone marrow and in neurogenic regions of the brain showed better
                regenerative capacity. Inflammatory markers came down. When the group
                read the transcriptome, several of the canonical hallmarks of ageing
                had moved the young direction.
              </P>
              <Callout label="The design choice that matters">
                Starting at twenty months is the honest version of this experiment.
                A drug that only works when given to young animals for life is a
                curiosity; a drug that works when given to the already-old is a
                candidate. Semaglutide has now passed the same late-start test
                rapamycin passed in 2009, in one lab, in one sex, in one strain.
              </Callout>
            </Section>

            <Section title="The famine without the slowdown">
              <P>
                The lifespan number is what the press ran with. The finding this site
                cares about is the comparison arm, because the comparison arm is
                where the biology is. Semaglutide and calorie restriction landed in
                the same neighbourhood on nearly every ageing readout, with the drug
                a notch ahead on exploration, spatial memory, and glucose handling.
                Chen went in asking a clean question – is a GLP-1 agonist just
                calorie restriction with a needle? – and the answer that came back is
                that it is not, and the place the two diverge is the engine.
              </P>
              <P>
                The calorie-restricted mice did what calorie-restricted mice have
                always done: their metabolic rate fell. The semaglutide mice, eating
                less and losing weight, <Em>kept theirs</Em>. Same protective program,
                same lifespan dividend, and only one of the two arms turned the engine
                down. If the slowdown were the cause of the benefit, the arm without
                the slowdown should have had no benefit. It had at least as much.
              </P>
              <LifespanVsMetabolism />
              <P>
                That is a ninety-year-old assumption taking a direct hit. The
                rate-of-living story has been wobbling for two decades anyway – naked
                mole-rats and birds burn hot and live long, and the free-radical
                theory has not aged well – but here is a controlled experiment in
                which the metabolic slowdown is cleanly separated from the outcome it
                was supposed to produce. The slowdown looks like a passenger. Whatever
                calorie restriction is actually doing to an old animal, a peptide
                acting on the GLP-1 receptor can apparently do it while the
                mitochondria keep the lights on. Chen&rsquo;s own phrasing is that the
                drug taps a pathway independent of calorie restriction. The more
                interesting reading is that both may be tapping something downstream
                of food intake that has nothing to do with how much fuel gets burnt.
              </P>
            </Section>

            <Section title="What the receptor is doing in an old brain">
              <P>
                Why would a gut hormone&rsquo;s receptor be wired into ageing at all?
                Because it was never only a gut hormone. GLP-1 receptors sit on
                hypothalamic neurons, on hippocampal neurons, on microglia, on
                vascular endothelium, on the heart, and on the immune cells that
                drive the low-grade inflammation of age. The{" "}
                <Link href="/insights/the-lizard-that-ate-twice-a-year" className={LINK}>
                  lizard the molecule came from
                </Link>{" "}
                needed a signal that could carry a whole organism through a months-long
                fast, not one that only talked to the pancreas.
              </P>
              <P>
                So the mouse findings sort into things the drug plausibly does
                directly and things that ride along with eating less. The reduced
                neuroinflammation and the recovered stem-cell activity in the brain
                are the direct-action candidates: central GLP-1 signalling dampens
                microglial activation, and the same receptor is the reason the class
                keeps showing up in Parkinson&rsquo;s and Alzheimer&rsquo;s trials.
                The glucose and adipose improvements are the ride-along candidates,
                the ones calorie restriction gets too. The paper does not fully
                untangle which is which, and it would be dishonest to pretend it
                does. What it establishes is that the two lists are not the same
                list.
              </P>
            </Section>

            <Section title="The muscle question, read the right way round">
              <P>
                Anyone who has followed this class in humans will trip on one line:
                the old mice on semaglutide had <Em>better</Em> muscle function. The
                whole reason{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>
                  muscle preservation
                </Link>{" "}
                is a live research programme is that people on these drugs lose lean
                mass alongside fat, and the industry is racing to bolt a myostatin
                blocker onto the weight loss. How can the mouse and the human
                disagree?
              </P>
              <P>
                They may not. The mouse readouts are endurance and grip, which are
                measures of what the muscle <Em>does</Em>; the human alarm is over
                DXA lean mass, which is a measure of how much muscle there <Em>is</Em>.
                Those are different things, and the field has already learned the
                hard way that{" "}
                <Link href="/insights/bigger-not-stronger" className={LINK}>
                  bigger is not stronger
                </Link>. An old mouse whose muscle is less inflamed, better
                perfused, and better fuelled can perform better on less tissue. The
                interesting hypothesis this raises is that the lean-mass loss in
                people might be a size story and the ageing benefit a quality story,
                and the two could coexist in the same animal. That is a hypothesis,
                not a finding. But it is the right shape of question, and it is a
                more productive one than &ldquo;the drug eats your muscle.&rdquo;
              </P>
            </Section>

            <Section title="How much survives the study design">
              <P>
                Now the sceptical half. This is one paper from one lab, and it is a
                strong paper, but the things it did not do are exactly the things a
                lifespan claim needs.
              </P>
              <Ledger />
              <P>
                The single-sex point is not a formality. Sex differences in mouse
                lifespan interventions are the rule, not the exception: rapamycin
                extends female lifespan more than male at most doses, several
                mimetics work in one sex only, and the Interventions Testing Program
                exists in part because single-site, single-sex results kept failing
                to replicate. A female-only result is a female result until someone
                runs the males. The NIA, which paid for the work, said so in its own
                release: this does not show that semaglutide slows ageing or extends
                lifespan in people.
              </P>
              <P>
                The pair-feeding question is the one to watch when the full methods
                are picked over. Semaglutide makes mice eat less. If the
                calorie-restriction arm was a fixed 24% cut rather than a group
                matched to what the drug-treated mice actually ate, then the two arms
                differed in intake as well as in metabolic rate, and the clean
                &ldquo;same restriction, different engine&rdquo; reading softens a
                little. It does not disappear. The metabolic divergence is real either
                way. It just becomes a slightly less tidy story.
              </P>
            </Section>

            <Section title="The only human number we actually have">
              <P>
                There is no human lifespan trial of semaglutide and there will not be
                one for a long time; the drug is too new and the endpoint too slow.
                What exists is SELECT: more than seventeen thousand adults with
                cardiovascular disease and obesity but no diabetes, randomised to
                semaglutide 2.4 mg or placebo and followed for about three years. The
                trial was built to measure heart attacks and strokes, and it found a
                20% reduction in those. Below the primary endpoint sat a secondary
                one that got less attention: all-cause death fell by about 19% too,
                and the reduction was not confined to cardiovascular death.
                Non-cardiovascular deaths, including infections, came down as well.
              </P>
              <P>
                That is not a longevity trial and it should not be read as one. A
                three-year mortality reduction in sick, heavy, middle-aged people is a
                treatment effect, not a slowing of the clock. But it is the human
                observation that sits closest to what the mouse paper is claiming,
                and it points the same direction. When the epidemiology and the
                mechanism agree, that is the moment a field earns the right to design
                the real experiment.
              </P>
            </Section>

            <Section title="What&rsquo;s settled, and what isn&rsquo;t">
              <P>
                <Em>Settled:</Em> semaglutide started late in life extends median
                lifespan and improves function in female mice; calorie restriction
                does the same; the two arms diverge on metabolic rate; the
                rate-of-living explanation for calorie restriction has one more hole
                in it, and it is a well-placed one.
              </P>
              <P>
                <Em>Open:</Em> males; other strains; other labs; whether the
                benefit holds when the restriction arm is pair-fed to the drug; which
                of the ageing readouts come from central receptor action and which
                from eating less; whether any of it translates to a human on a
                weekly pen for thirty years. The mouse has said something genuinely
                new about what calorie restriction is. It has not said anything
                about how long you will live.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/semaglutide" label="Semaglutide reference" />
                <CrossLink href="/insights/the-lizard-that-ate-twice-a-year" label="Where the molecule came from" />
                <CrossLink href="/insights/glp-1-muscle-preservation" label="The lean-mass problem in people" />
                <CrossLink href="/insights/bigger-not-stronger" label="Why size was never the finish line" />
                <CrossLink href="/insights/two-ways-to-bottle-a-gland" label="Another longevity headline, audited" />
                <CrossLink href="/research?q=Summarize%20the%202026%20Nature%20study%20on%20late-life%20semaglutide%20and%20lifespan%20in%20female%20mice%20and%20its%20calorie-restriction%20comparison" label="Ask the research agent for primary sources" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on a single preclinical study and its context,
              summarized from public scientific literature and press releases and
              simplified in places. Not medical advice, dosing guidance, or a
              recommendation to use any compound. Mouse results are not human
              results; verify any claim against the primary paper.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

const LINK = "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-7 text-ink/75">{children}</p>;
}

function Em({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-2 border-accent bg-accent/[0.06] p-5">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-accent">{label}</div>
      <p className="text-[15px] leading-7 text-ink/80">{children}</p>
    </div>
  );
}

function CrossLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="group flex items-start gap-2 text-ink/75 transition-colors hover:text-accent">
        <span className="mt-0.5 text-ink/30 transition-colors group-hover:text-accent" aria-hidden>→</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

/* ── Two arms, one dividend, one engine ── */
const ARMS = [
  { key: "ctrl", label: "Control", color: "var(--color-ink)", opacity: 0.25 },
  { key: "cr", label: "Calorie restriction −24%", color: "var(--accent-purple)", opacity: 0.85 },
  { key: "sema", label: "Semaglutide, late start", color: "var(--accent)", opacity: 0.95 },
] as const;

const PANEL_W = 240, BASE_Y = 190, TOP = 40, BAR_W = 48, BAR_GAP = 24;
const scale = (v: number) => (BASE_Y - TOP) * v;

function Panel({ x, title, data, note }: { x: number; title: string; data: Record<string, number>; note: string }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <text x={PANEL_W / 2} y={22} textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
        {title}
      </text>
      <line x1={0} y1={BASE_Y} x2={PANEL_W} y2={BASE_Y} stroke="var(--color-ink)" strokeOpacity="0.25" />
      <line x1={0} y1={BASE_Y - scale(data.ctrl)} x2={PANEL_W} y2={BASE_Y - scale(data.ctrl)} stroke="var(--color-ink)" strokeOpacity="0.2" strokeDasharray="4 4" />
      {ARMS.map((a, i) => {
        const bx = 24 + i * (BAR_W + BAR_GAP);
        const h = scale(data[a.key]);
        return <rect key={a.key} x={bx} y={BASE_Y - h} width={BAR_W} height={h} rx={6} fill={a.color} fillOpacity={a.opacity} />;
      })}
      <text x={PANEL_W / 2} y={BASE_Y + 22} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">
        {note}
      </text>
    </g>
  );
}

function LifespanVsMetabolism() {
  // Schematic: directions and rough magnitudes as reported, not digitised data.
  const W = 560, H = 250;
  const lifespan = { ctrl: 0.55, cr: 0.67, sema: 0.68 };
  const metab = { ctrl: 0.7, cr: 0.5, sema: 0.69 };
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-xl" role="img" aria-label="Two bar panels: calorie restriction and late-life semaglutide both extend median lifespan by a similar margin, but only calorie restriction lowers metabolic rate; semaglutide holds it near control">
        <Panel x={30} title="Median lifespan" data={lifespan} note="both arms ≈ +12% over control" />
        <Panel x={300} title="Resting metabolic rate" data={metab} note="CR falls · semaglutide holds" />
        {ARMS.map((a, i) => (
          <g key={a.key} transform={`translate(${40 + i * 180} ${H - 12})`}>
            <rect x={0} y={-9} width={12} height={12} rx={3} fill={a.color} fillOpacity={a.opacity} />
            <text x={18} y={1} fill="var(--color-ink)" fillOpacity="0.65" fontSize="11">{a.label}</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Schematic of the paper&rsquo;s reported directions, not digitised data. Same
        dividend on the left; only one arm turned the engine down on the right.
      </figcaption>
    </figure>
  );
}

/* ── What a lifespan claim needs vs what this paper has ── */
function Ledger() {
  const rows: { need: string; has: string; ok: "yes" | "partial" | "no" }[] = [
    { need: "Late-life start", has: "20 months, matching the rapamycin precedent", ok: "yes" },
    { need: "Survival to natural death", has: "Lifelong cohort, median +~100 days", ok: "yes" },
    { need: "Both sexes", has: "Female only", ok: "no" },
    { need: "Multiple sites / labs", has: "One lab", ok: "no" },
    { need: "Genetically heterogeneous mice", has: "Single strain", ok: "no" },
    { need: "Restriction arm pair-fed to drug intake", has: "Reported as a fixed 24% cut", ok: "partial" },
    { need: "Function, not just survival", has: "Endurance, memory, glucose, stem cells, transcriptome", ok: "yes" },
  ];
  const mark = { yes: "✓", partial: "~", no: "✗" } as const;
  const tone = { yes: "text-accent", partial: "text-ink/60", no: "text-ink/40" } as const;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-ink/10 text-ink/50">
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">A lifespan claim needs</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">This paper</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide"><span className="sr-only">Status</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.need} className="border-b border-ink/[0.06] last:border-0">
              <td className="px-4 py-3 text-ink/80">{r.need}</td>
              <td className="px-4 py-3 text-ink/60">{r.has}</td>
              <td className={`px-4 py-3 font-mono ${tone[r.ok]}`}>{mark[r.ok]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="px-4 py-3 text-xs text-ink/40">
        The left-hand column is the NIA Interventions Testing Program&rsquo;s
        standard, which is the bar the field uses for a mouse lifespan result.
      </figcaption>
    </figure>
  );
}
