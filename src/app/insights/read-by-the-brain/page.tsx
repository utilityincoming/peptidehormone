import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("read-by-the-brain")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What is Brenipatide? The GIP/GLP-1 Agonist Aimed at Addiction and Mood — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "Read by the Brain: Brenipatide and the Incretin Bet on Addiction and Depression · Peptide Hormone",
    description: insight.dek,
  },
};

// External sources — a primary human trial plus the brenipatide trial registry.
const REF = {
  semaglutide: "https://pubmed.ncbi.nlm.nih.gov/39937469/", // Hendershot et al. 2025, JAMA Psychiatry — semaglutide in alcohol use disorder
  renewAlc: "https://clinicaltrials.gov/study/NCT07219966", // RENEW-ALC — brenipatide in moderate-to-severe alcohol use disorder
  renewMdd: "https://clinicaltrials.gov/study/NCT07775300", // RENEW-MDD — brenipatide adjunctive in major depressive disorder
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is brenipatide?",
    a: "Brenipatide (LY3537031) is an investigational Eli Lilly peptide that agonizes the same two receptors as tirzepatide — GIP and GLP-1 — from a single molecule, but is engineered for a far longer, roughly once-monthly dosing interval. What makes it unusual is where it is pointed: its lead development is not obesity but psychiatry and addiction. The Phase 3 RENEW program studies it in alcohol use disorder and as an add-on in major depression, on the bet that incretin signaling reaches the brain's reward and mood circuitry, not just metabolism.",
  },
  {
    q: "Why would a diabetes/obesity drug class be tested for addiction and depression?",
    a: "Because the receptors these drugs hit are not confined to the gut and pancreas — GLP-1 receptors are also expressed in the brain's reward circuitry, including areas that process the pull of alcohol, nicotine and drugs. In animals, GLP-1 agonists reduce self-administration of several addictive substances, and the first controlled human trials are beginning to show reduced craving and consumption. Brenipatide is a bet that this gut-to-brain effect is real and strong enough to treat addiction and mood disorders directly.",
  },
  {
    q: "Is there evidence that GLP-1 drugs reduce drinking?",
    a: "Early and promising, but not yet conclusive. In a small Phase 2 randomized trial, once-weekly semaglutide reduced the amount of alcohol people drank in a lab task and lowered their craving versus placebo — though the number of drinking days did not change, and participants also lost weight. That pattern raises a real question the field has to answer: is this a specific effect on the reward circuit, or a more general dampening of consumption that rides along with appetite suppression? Brenipatide's trials are built to help settle it.",
  },
  {
    q: "What is the RENEW program?",
    a: "RENEW is brenipatide's Phase 3 clinical program, and it is notable for leading in psychiatry rather than metabolism. It includes large trials in moderate-to-severe alcohol use disorder and in major depressive disorder (as adjunctive treatment), each enrolling on the order of a thousand participants, with results expected around 2028. Phase 2 work spans bipolar disorder, schizophrenia, opioid use disorder and smoking. Obesity, the class's home ground, sits in earlier-stage development.",
  },
  {
    q: "Does brenipatide have efficacy results yet?",
    a: "No. As of 2026, no efficacy or safety results from any brenipatide trial have been published. The case for it rests on the mechanism and on class-level evidence from other incretin drugs — it is a well-reasoned bet taken straight into large Phase 3 psychiatry trials, not a proven therapy. The honest status is: strong rationale, real but early class data, and zero published results for this specific molecule.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.16), transparent 70%)" }}
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
            <Section title="The sentence written for the pancreas">
              <P>
                For a decade the incretin story was a metabolic one: hold blood sugar, quiet
                appetite, lower weight. The{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> and{" "}
                <Link href="/hormones/gip" className={LINK}>GIP</Link> receptors were studied
                as gut-and-pancreas machinery, and the drugs built on them —{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link> and the
                rest — were weight-and-glucose drugs.{" "}
                <Link href="/hormones/brenipatide" className={LINK}>Brenipatide</Link> takes
                the same sentence and asks whether the brain can read it.
              </P>
              <P>
                It is, mechanically, close to familiar ground: a single peptide that agonizes
                both GIP and GLP-1, the same receptor pair as tirzepatide, engineered for a far
                longer — roughly once-monthly — reach. What is unfamiliar is the direction.
                Eli Lilly is leading brenipatide&rsquo;s development not with obesity but with
                <Em> alcohol use disorder</Em> and <Em>major depression</Em>, on the bet that
                incretin signaling touches the brain&rsquo;s reward and mood circuitry. This is
                a genuinely interesting wager and an almost entirely unproven one. Bullish on
                the science, sceptical on the page.
              </P>
            </Section>

            <Section title="Why the gut would talk to the reward system">
              <P>
                The premise is not arbitrary. GLP-1 receptors are expressed well beyond the
                pancreas — including in the mesolimbic dopamine pathway, the circuit running
                from the ventral tegmental area to the nucleus accumbens that encodes the pull
                of food, alcohol, nicotine and drugs. A signal that evolved to say &ldquo;you
                have had enough to eat&rdquo; turns out to wire into the same machinery that
                registers &ldquo;you want more of that,&rdquo; and in animals, GLP-1 agonists
                reduce the self-administration of several addictive substances, alcohol among
                them.
              </P>
              <P>
                That is the mechanistic case for pointing an incretin drug at addiction: if the
                same receptor that dials down appetite also dials down the reward value of a
                drink or a cigarette, then a durable, brain-penetrant agonist might blunt
                craving the way it blunts hunger. Depression is the softer extension of the
                same idea — reward processing, motivation and the inflammation-and-metabolism
                links to mood are all plausible routes by which the signal could lift it. The
                biology is real. The question is how much of it survives contact with a human
                trial.
              </P>
              <TwoDestinations />
            </Section>

            <Section title="The first human signal, and its asterisk">
              <P>
                The strongest human evidence so far comes not from brenipatide but from its
                older cousin. In a small Phase 2 randomized trial, once-weekly{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link> reduced
                how much alcohol people with alcohol use disorder drank in a controlled lab
                task, and lowered their craving, versus placebo (
                <a href={REF.semaglutide} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Hendershot et&nbsp;al., JAMA Psychiatry, 2025
                </a>
                ). For a first controlled test of the idea, that is an encouraging result, and
                it is the kind of signal that justifies a serious program.
              </P>
              <P>
                But read the asterisk, because it is the whole scientific question in miniature.
                The number of <Em>drinking days</Em> did not change; what fell was the quantity
                consumed — and the participants also lost weight. That pattern leaves two
                explanations standing side by side. One is the exciting one: a specific effect
                on the reward circuit, craving turned down at the source. The other is more
                mundane: a general suppression of consumption — the same &ldquo;want less,
                feel full, maybe faintly nauseated&rdquo; effect that curbs eating, applied to
                a glass instead of a plate. A small trial cannot separate those, and until the
                field does, &ldquo;GLP-1 treats addiction&rdquo; is a hypothesis wearing a
                result&rsquo;s clothing.
              </P>
              <Callout label="The confound to watch">
                The central uncertainty in this whole field is whether incretin drugs act on
                craving specifically or on consumption generally. Those look identical in a
                small drinking-quantity study and mean very different things for a psychiatric
                drug. Any trial that matters has to show an effect that is not just appetite
                suppression wearing a new label.
              </Callout>
            </Section>

            <Section title="What brenipatide actually is">
              <P>
                Against that backdrop, brenipatide&rsquo;s design choices make sense. It shares
                tirzepatide&rsquo;s two-receptor machinery but is built for an extended interval
                Lilly has not fully disclosed — on the order of monthly — and a drug meant to
                hold craving down for months, not meals, benefits from the longest possible
                reach and the fewest possible missed doses. Adherence is where addiction and
                depression treatments fail most; a once-monthly injection is a serious answer to
                that failure mode, independent of any reward-circuit effect.
              </P>
              <P>
                Two honest unknowns sit inside the molecule. The first: what the GIP arm
                contributes in the brain is essentially uncharted — the reward evidence is
                mostly GLP-1 work, and why a dual GIP/GLP-1 agonist should be better than a pure
                GLP-1 one for addiction is an assumption, not a finding (the{" "}
                <Link href="/insights/the-gip-paradox" className={LINK}>GIP paradox</Link> is a
                reminder that this receptor resists simple stories). The second: weight loss
                itself is a confound in a mood trial, where improvement could flow through
                metabolic health or inflammation rather than any direct action on the circuits
                of depression.
              </P>
            </Section>

            <Section title="Phase 3 in psychiatry, ahead of its own data">
              <P>
                The boldest thing about brenipatide is the shape of its program. The Phase 3{" "}
                <Em>RENEW</Em> trials lead in psychiatry — large studies in moderate-to-severe{" "}
                <a href={REF.renewAlc} target="_blank" rel="noopener noreferrer" className={LINK}>
                  alcohol use disorder
                </a>{" "}
                and in{" "}
                <a href={REF.renewMdd} target="_blank" rel="noopener noreferrer" className={LINK}>
                  major depression
                </a>{" "}
                as an add-on, each enrolling around a thousand participants, with Phase 2 work
                fanning out into bipolar disorder, schizophrenia, opioid use disorder and
                smoking. Obesity, the class&rsquo;s home ground, is the <Em>late</Em> program
                here, not the lead. A company is taking a molecule straight into large,
                expensive psychiatric Phase 3 trials on the strength of class evidence and
                mechanism, ahead of a single published efficacy result for the drug itself.
              </P>
              <P>
                That is a defensible bet and a real gamble at once. The upside is a genuinely new
                kind of treatment for conditions where the existing drugs are few and partial.
                The risk is that the human reward effect turns out to be the mundane explanation
                — consumption suppression that fades, or works only alongside weight loss — in
                which case a vast program will have been built on a signal that didn&rsquo;t
                generalize. The results read out around 2028, and until they do, the discipline
                the{" "}
                <Link href="/insights/the-trial-that-hasnt-reported" className={LINK}>
                  &ldquo;first human trial&rdquo; headlines
                </Link>{" "}
                demand applies here in full: a Phase 3 that has enrolled is not a Phase 3 that
                has reported.
              </P>
            </Section>

            <Section title="A bet, not a result">
              <P>
                Brenipatide is the most interesting thing the incretin class is doing that has
                nothing to do with weight — and it is almost entirely a promissory note. The
                mechanism is real: the receptors are in the reward circuitry, and the animal and
                early human data point the right way. The strategy is bold: lead in psychiatry,
                dose monthly, go big early. And the evidence specific to this molecule is
                nonexistent. Hold all three together and brenipatide is what a well-reasoned,
                high-conviction, unproven bet looks like — the incretin sentence, written for the
                pancreas, carried to the clinic on the wager that the brain can read it.
              </P>
              <Bullets
                items={[
                  ["A dual GIP/GLP-1 agonist pointed at the brain", "Brenipatide (LY3537031) hits tirzepatide's two receptors from one peptide, engineered for a ~monthly interval — but leads in addiction and depression, not obesity."],
                  ["The reward-circuit rationale is genuine", "GLP-1 receptors sit in the mesolimbic dopamine pathway; in animals, GLP-1 agonists cut self-administration of alcohol and other drugs."],
                  ["The first human signal has a built-in caveat", "Semaglutide lowered alcohol quantity and craving in a small RCT — but drinking days didn't change and weight fell. Reward-specific effect, or general consumption suppression? Unresolved."],
                  ["Monthly dosing targets the real failure mode", "Adherence is where addiction and depression drugs fail; a once-monthly injection is a serious answer — independent of any craving effect. The GIP arm's brain role is uncharted."],
                  ["Phase 3 ahead of its own data", "The RENEW program runs ~1,000-participant trials in alcohol use disorder and MDD, reading out ~2028, with no published brenipatide efficacy yet. A high-conviction bet, not a result."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/brenipatide" label="Brenipatide reference (LY3537031)" />
                <CrossLink href="/hormones/tirzepatide" label="Tirzepatide reference (the same GIP/GLP-1 pair)" />
                <CrossLink href="/insights/the-gip-paradox" label="The GIP paradox — why this receptor resists simple stories" />
                <CrossLink href="/insights/the-trial-that-hasnt-reported" label="The trial that hasn't reported — how to read the headline" />
                <CrossLink href="/families/incretins-metabolic" label="The incretins & metabolic family" />
                <CrossLink href="/research?q=What%20is%20the%20evidence%20that%20GIP%2FGLP-1%20agonists%20like%20brenipatide%20act%20on%20the%20brain%27s%20reward%20circuitry%20to%20treat%20addiction%20and%20depression%2C%20and%20how%20strong%20is%20it%3F" label="Ask the research agent about incretins and the brain" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not
              medical advice, dosing guidance, or a recommendation to use any compound.
              Specific compounds and trials are named to explain the science; verify any
              claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── One incretin signal, two destinations: the proven metabolic arm and the bet on reward ── */
function TwoDestinations() {
  const W = 700;
  const H = 300;
  const srcX = 150;
  const srcY = 150;

  const Node = ({ x, y, title, sub, proven }: { x: number; y: number; title: string; sub: string; proven: boolean }) => (
    <g>
      <rect x={x} y={y - 26} width={236} height={52} rx={11}
        fill={proven ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "color-mix(in srgb, var(--accent) 7%, transparent)"}
        stroke="var(--accent)" strokeOpacity={proven ? 0.6 : 0.35} strokeWidth={1.3}
        strokeDasharray={proven ? "none" : "5 4"} />
      <text x={x + 16} y={y - 5} fill="var(--color-ink)" fillOpacity={0.88} fontSize="12" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">{title}</text>
      <text x={x + 16} y={y + 12} fill="var(--color-ink)" fillOpacity={0.5} fontSize="9.5">{sub}</text>
    </g>
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="Brenipatide's dual GIP/GLP-1 signal fans to two destinations. The established arm reaches metabolic targets — pancreas, gut and appetite — for glucose control and weight loss, drawn as a solid box. The hypothesized arm reaches the brain's mesolimbic reward and mood circuitry to reduce craving and lift mood, drawn as a dashed box labelled as the bet now in Phase 3."
      >
        <text x={W / 2} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          One incretin signal, two destinations
        </text>

        {/* source */}
        <rect x={srcX - 74} y={srcY - 30} width={148} height={60} rx={12}
          fill="color-mix(in srgb, var(--accent) 16%, transparent)" stroke="var(--accent)" strokeOpacity={0.7} strokeWidth={1.5} />
        <text x={srcX} y={srcY - 6} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.9} fontSize="12" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">Brenipatide</text>
        <text x={srcX} y={srcY + 10} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="9.5">GIP + GLP-1</text>

        {/* branches */}
        <line x1={srcX + 74} y1={srcY - 6} x2={424} y2={84} stroke="var(--accent)" strokeOpacity={0.6} strokeWidth={1.8} />
        <line x1={srcX + 74} y1={srcY + 10} x2={424} y2={216} stroke="var(--accent)" strokeOpacity={0.4} strokeWidth={1.8} strokeDasharray="5 4" />

        {/* destinations */}
        <Node x={424} y={84} title="Metabolic arm" sub="pancreas · gut · appetite — glucose, weight" proven />
        <text x={424} y={120} fill="var(--accent)" fillOpacity={0.85} fontSize="9" fontWeight="700">ESTABLISHED</text>

        <Node x={424} y={216} title="Reward &amp; mood arm" sub="mesolimbic dopamine — craving, depression" proven={false} />
        <text x={424} y={252} fill="var(--color-ink)" fillOpacity={0.55} fontSize="9" fontWeight="700">THE BET · IN PHASE 3</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The metabolic destination is proven; the reward-and-mood destination is the dashed
        hypothesis brenipatide&rsquo;s Phase 3 trials exist to test.
      </figcaption>
    </figure>
  );
}
