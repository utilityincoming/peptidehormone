import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-molecule-that-is-both-halves")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What is Amycretin? The Unimolecular GLP-1 + Amylin Agonist, and the Oral Data — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Molecule That Is Both Halves: Amycretin, Unimolecular GLP-1 + Amylin Agonism · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  oral: "https://doi.org/10.1016/S0140-6736(25)01176-6", // Gasiorek et al. 2025, Lancet — oral amycretin, first-in-human phase 1
  sc: "https://doi.org/10.1016/S0140-6736(25)01185-7", // Dahl et al. 2025, Lancet — subcutaneous amycretin, phase 1b/2a
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is amycretin?",
    a: "Amycretin is an investigational obesity drug from Novo Nordisk that is a single molecule agonizing two receptors at once — the GLP-1 receptor and the amylin receptors. It is the unimolecular counterpart to CagriSema, which pairs the amylin analog cagrilintide with semaglutide as two separate drugs in two pens. Amycretin folds the same two satiety signals into one peptide, and it is being developed in both a weekly injection and, unusually for this class, a daily pill. As of 2025 it had early-phase data only and was advancing into phase 3.",
  },
  {
    q: "How much weight did amycretin cause people to lose in trials?",
    a: "In the phase 1b/2a subcutaneous trial, the 60 mg weekly dose produced a mean 24.3% weight loss at 36 weeks versus 1.1% on placebo, and the curves had not plateaued when the trial ended. The oral first-in-human study reported about 13.1% at 12 weeks on the top dose versus 1.2% on placebo. Those numbers are striking, but they come from small, short, early-phase studies — 125 and 144 participants respectively — not head-to-head trials, so they cannot be ranked against tirzepatide or retatrutide from the figures alone.",
  },
  {
    q: "What is the difference between amycretin and CagriSema?",
    a: "They make the same bet — combine GLP-1 and amylin agonism — in opposite forms. CagriSema is a combination: two engineered peptides, cagrilintide and semaglutide, each with its own dose, given together. Amycretin is a single molecule that does both jobs. The unimolecular design buys one pharmacokinetic profile, one titration, and one manufacturing line, but it also locks the ratio of GLP-1 to amylin activity, which a two-drug combination can still tune independently.",
  },
  {
    q: "Why combine GLP-1 with amylin at all?",
    a: "Because they suppress appetite through different machinery and the effects appear additive rather than redundant. GLP-1 acts through its own receptor on gut, pancreas and brain; amylin, co-secreted with insulin, acts through amylin receptors in the hindbrain to promote satiety and slow gastric emptying. Hitting two satiety pathways at once is the same logic behind the multi-agonist era — more of the brake, pulled by independent levers. Amylin is also being pursued on its own, as with eloralintide and cagrilintide.",
  },
  {
    q: "Can you take amycretin as a pill?",
    a: "An oral form is in development and is part of what makes amycretin notable. A peptide is normally digested if swallowed, which is why this class lives on the needle; the oral version rides the same absorption-enhancer approach that made oral semaglutide (Rybelsus) possible. The first-in-human oral study showed roughly 13% weight loss at 12 weeks. But oral peptide delivery is inefficient — bioavailability is low, the dose is large, and dosing comes with food and water timing rules — so the pill is an achievement of formulation, not a free lunch.",
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
            <Section title="Why two?">
              <P>
                The metabolic frontier spent a decade adding receptors like verses.
                Semaglutide plays one,{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link>{" "}
                two,{" "}
                <Link href="/hormones/retatrutide" className={LINK}>retatrutide</Link>{" "}
                three. Alongside that march ran a quieter idea: pair a{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> drug with an{" "}
                <Link href="/hormones/amylin" className={LINK}>amylin</Link> drug.
                CagriSema did exactly that, putting the amylin analog{" "}
                <Link href="/hormones/cagrilintide" className={LINK}>cagrilintide</Link>{" "}
                and{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link>{" "}
                together — two engineered peptides, two doses, two pens. It worked,
                and it raised an obvious question: if the body ends up with both
                signals anyway, why deliver them as two drugs?
              </P>
              <P>
                <Link href="/hormones/amycretin" className={LINK}>Amycretin</Link>{" "}
                is Novo Nordisk&rsquo;s answer. It is a single peptide engineered to
                agonize the GLP-1 receptor <Em>and</Em> the amylin receptors — the
                same two satiety pathways CagriSema plays separately, folded into one
                molecule. One chain, both halves. And it is being built in two forms
                at once: a weekly injection, and — the part that makes it stand out —
                a daily pill. This is the honest read of where it is, what its 2025
                numbers do and don&rsquo;t show, and what you give up by writing a
                combination as a single word. Bullish on the science, sceptical on the
                page.
              </P>
            </Section>

            <Section title="Why amylin belongs next to GLP-1">
              <P>
                The case for the pairing is that the two signals brake appetite through
                different machinery, so their effects add rather than overlap. GLP-1
                acts through its own receptor across gut, pancreas and brain. Amylin is
                a different hormone entirely — co-secreted with insulin from the same
                pancreatic granule, it acts on amylin receptors in the hindbrain to
                promote satiety and slow gastric emptying. It is{" "}
                <Link href="/insights/insulins-forgotten-twin" className={LINK}>
                  insulin&rsquo;s forgotten twin
                </Link>
                , and for a century it did its work without a drug built around it.
              </P>
              <P>
                That is why the amylin axis is suddenly crowded. Cagrilintide stretched
                the native hormone&rsquo;s minutes-long half-life to a week; Lilly&rsquo;s{" "}
                <Link href="/hormones/eloralintide" className={LINK}>eloralintide</Link>{" "}
                is being pushed as a{" "}
                <Link href="/insights/the-note-without-the-incretin" className={LINK}>
                  selective amylin agonist with no incretin at all
                </Link>
                . Amycretin takes the opposite tack: keep the incretin, and put both on
                one backbone. The logic is the multi-agonist logic — more of the brake,
                pulled by independent levers — except here the two levers live in the
                same molecule.
              </P>
            </Section>

            <Section title="The numbers, and the asterisks">
              <P>
                In June 2025 two trials landed together in <Em>The Lancet</Em>. The
                subcutaneous phase 1b/2a study randomized 125 adults with overweight or
                obesity; at the top 60 mg weekly dose, mean weight loss reached 24.3% at
                36 weeks against 1.1% on placebo, and — the detail Novo emphasized — the
                weight curves had not flattened when the trial stopped (
                <a href={REF.sc} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Dahl et&nbsp;al., Lancet, 2025
                </a>
                ). The oral first-in-human study, in 144 participants, reported about
                13.1% at 12 weeks on the highest dose versus 1.2% on placebo (
                <a href={REF.oral} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Gasiorek et&nbsp;al., Lancet, 2025
                </a>
                ). For a drug this early, both figures are genuinely large.
              </P>
              <P>
                Now the asterisks, because they are the whole point. These are small,
                short, early-phase trials whose job was safety and dose-finding, not a
                verdict on efficacy. Nobody was compared head-to-head with tirzepatide
                or retatrutide, so the tempting cross-trial ranking — &ldquo;24% beats
                X&rdquo; — is exactly the comparison the data cannot support; different
                populations, durations and titrations make those percentages
                non-interchangeable. The absent plateau cuts both ways: it may mean more
                weight was still to come, or simply that 36 weeks was too short to find
                the ceiling. And the tolerability signal is the familiar one — adverse
                events were mostly gastrointestinal and rose with dose, which is what a
                drug pulling two satiety levers at once should do, and what longer, larger
                trials will have to price in through discontinuation rates we do not yet
                have.
              </P>
              <Callout label="The cross-trial trap">
                The single most common error in reading this field is lining up weight-loss
                percentages from separate trials as if they were a league table. They are
                not. A 24% from a 125-person phase 1b/2a and a 20% from a phase 3 are
                measuring different things in different people over different windows. Early
                amycretin data says &ldquo;this axis is potent and worth a phase 3,&rdquo;
                not &ldquo;this is the strongest drug in the class.&rdquo;
              </Callout>
            </Section>

            <Section title="The pill is the real story">
              <P>
                The injectable numbers will get the headlines, but the oral arm is the
                more interesting object. A peptide is, chemically,{" "}
                <Link href="/insights/getting-the-molecule-in" className={LINK}>food</Link>{" "}
                — swallow it and the gut digests it before it can work, which is why this
                entire class has lived on the needle. Oral amycretin rides the same trick
                that made oral semaglutide possible: an absorption enhancer that smuggles a
                sliver of the dose across the stomach lining before the peptide is
                destroyed. That roughly 13% at 12 weeks is remarkable precisely because it
                came from a pill.
              </P>
              <P>
                It is also where the sceptical read stays sharp. The absorption-enhancer
                route is inefficient by design: oral bioavailability is on the order of a
                percent, so the dose is large and much of it never arrives, and the pill
                comes with real-world strings — fasting, a fixed sip of water, a wait before
                eating. The deeper point is the one the{" "}
                <Link href="/insights/glp-1-in-a-pill" className={LINK}>oral-GLP-1 story</Link>{" "}
                already made: the receptor reads the message, not the messenger. A dual
                agonist you can take as a daily tablet sits at the far convenience end of a
                class that began as a twice-daily injection milked from{" "}
                <Link href="/insights/the-lizard-that-ate-twice-a-year" className={LINK}>
                  lizard venom
                </Link>
                . If it holds up, the format matters as much as the molecule.
              </P>
              <UnimolecularDiagram />
            </Section>

            <Section title="What writing it as one word costs">
              <P>
                The unimolecular design is sold as elegance, and in several respects it
                is. One molecule means one pharmacokinetic profile instead of two that
                must be matched, one dose to titrate instead of a pair, and one
                manufacturing and regulatory path instead of a co-formulation. For a
                patient it is one injection, or one pill, rather than a regimen. These
                are not trivial; much of what makes a drug usable is whether its schedule
                fits a life.
              </P>
              <P>
                But a single molecule fixes something a combination keeps free: the
                <Em> ratio</Em>. CagriSema can, in principle, dial cagrilintide and
                semaglutide independently — more amylin for tolerability, more GLP-1 for
                potency, tuned to the person or the trial. Amycretin welds the two
                activities into one chain at whatever ratio the chemistry settled on, and
                that ratio travels with every dose. If the ideal balance of GLP-1 to
                amylin turns out to differ between people, or across a titration, a
                two-drug combination has a knob a unimolecular agent has machined away.
                Elegance and flexibility are the trade; which one wins is an empirical
                question the phase 3 program exists to answer.
              </P>
            </Section>

            <Section title="Where it actually sits">
              <P>
                Amycretin is a promising sketch that has earned a phase 3, not a finished
                drug. The biology is sound and the early signal is strong on both the
                needle and, more surprisingly, the pill. What does not yet exist is the
                evidence that it beats the combination it compresses, or the triple
                agonists it will be measured against, or that its tolerability holds over
                the years obesity is now understood to require treatment. The 2025
                readouts move it from idea to candidate. They do not settle the ranking,
                and the honest reader should resist every table that pretends they do.
              </P>
              <Bullets
                items={[
                  ["One molecule, two receptors", "Amycretin agonizes the GLP-1 receptor and the amylin receptors in a single peptide — the unimolecular version of the CagriSema combination."],
                  ["The 2025 numbers are large but early", "Subcutaneous: ~24% at 36 weeks (phase 1b/2a, n=125), no plateau. Oral: ~13% at 12 weeks (first-in-human, n=144). Small, short, not head-to-head."],
                  ["Don't build a league table", "These percentages come from separate early-phase trials and cannot be ranked against tirzepatide or retatrutide. Cross-trial comparison is the field's most common error."],
                  ["The oral form is the standout", "A daily-pill dual agonist rides the oral-semaglutide absorption-enhancer playbook — real formulation achievement, but low bioavailability and dosing strings remain."],
                  ["Unimolecular buys simplicity, costs tuning", "One PK, one titration, one line — but the GLP-1-to-amylin ratio is welded fixed, where a combination can still tune the two arms independently."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/amycretin" label="Amycretin reference (the unimolecular dual agonist)" />
                <CrossLink href="/hormones/amylin" label="Amylin reference (the second half)" />
                <CrossLink href="/hormones/cagrilintide" label="Cagrilintide reference (the amylin half of CagriSema)" />
                <CrossLink href="/insights/insulins-forgotten-twin" label="Insulin's forgotten twin — what amylin is" />
                <CrossLink href="/insights/the-note-without-the-incretin" label="The note without the incretin — amylin without GLP-1" />
                <CrossLink href="/insights/glp-1-in-a-pill" label="Oral GLP-1 — the pill the oral arm rides" />
                <CrossLink href="/insights/is-there-a-glp-4" label="Is there a GLP-4? — why the field moved sideways, not up" />
                <CrossLink href="/families/incretins-metabolic" label="The incretins & metabolic family" />
                <CrossLink href="/research?q=What%20does%20amycretin%27s%20early-phase%20evidence%20actually%20show%2C%20and%20how%20does%20a%20unimolecular%20GLP-1%20plus%20amylin%20agonist%20compare%20with%20the%20CagriSema%20combination%3F" label="Ask the research agent about amycretin" />
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

/* ── Combination vs unimolecular: two pens or one chain, same two receptors ── */
function UnimolecularDiagram() {
  const W = 720;
  const H = 332;
  const MIDX = 360;

  const Receptor = ({ x, y, label, sub }: { x: number; y: number; label: string; sub: string }) => (
    <g>
      <rect x={x - 54} y={y - 20} width={108} height={40} rx={10}
        fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--accent)" strokeOpacity={0.55} strokeWidth={1.3} />
      <text x={x} y={y - 2} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.85} fontSize="12" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">{label}</text>
      <text x={x} y={y + 13} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.45} fontSize="9">{sub}</text>
    </g>
  );

  const Pen = ({ x, y, name, sub }: { x: number; y: number; name: string; sub: string }) => (
    <g>
      <rect x={x - 48} y={y - 17} width={96} height={34} rx={9}
        fill="color-mix(in srgb, var(--color-ink) 6%, transparent)" stroke="var(--color-ink)" strokeOpacity={0.3} strokeWidth={1.2} />
      <text x={x} y={y - 1} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.8} fontSize="11.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{name}</text>
      <text x={x} y={y + 12} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="8.5">{sub}</text>
    </g>
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A comparison of two ways to agonize both the GLP-1 receptor and the amylin receptors. On the left, the CagriSema combination: two separate drugs, cagrilintide and semaglutide, each in its own pen, one reaching the amylin receptors and one the GLP-1 receptor — the ratio of the two can be tuned independently. On the right, amycretin: a single peptide that reaches both receptors itself, at a fixed, welded ratio."
      >
        <text x={W / 2} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Two pens, or one chain — the same two receptors
        </text>

        {/* divider */}
        <line x1={MIDX} y1={44} x2={MIDX} y2={300} stroke="var(--color-ink)" strokeOpacity={0.12} strokeWidth={1} strokeDasharray="3 4" />

        {/* ── Left: combination ── */}
        <text x={176} y={62} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="11" fontWeight="600">CagriSema — combination</text>
        <Pen x={120} y={110} name="Cagrilintide" sub="amylin analog" />
        <Pen x={120} y={210} name="Semaglutide" sub="GLP-1 analog" />
        <Receptor x={270} y={110} label="Amylin R" sub="hindbrain satiety" />
        <Receptor x={270} y={210} label="GLP-1 R" sub="gut · brain" />
        <line x1={168} y1={110} x2={214} y2={110} stroke="var(--accent)" strokeOpacity={0.55} strokeWidth={1.6} />
        <line x1={168} y1={210} x2={214} y2={210} stroke="var(--accent)" strokeOpacity={0.55} strokeWidth={1.6} />
        <text x={176} y={286} textAnchor="middle" fill="var(--accent)" fillOpacity={0.85} fontSize="9.5">ratio tunable — two separate doses</text>

        {/* ── Right: unimolecular ── */}
        <text x={544} y={62} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="11" fontWeight="600">Amycretin — unimolecular</text>
        {/* single peptide node */}
        <rect x={430} y={140} width={70} height={50} rx={12}
          fill="color-mix(in srgb, var(--accent) 16%, transparent)" stroke="var(--accent)" strokeOpacity={0.7} strokeWidth={1.5} />
        <text x={465} y={162} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.85} fontSize="11.5" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">one</text>
        <text x={465} y={177} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.6} fontSize="9.5">peptide</text>
        <Receptor x={636} y={110} label="Amylin R" sub="hindbrain satiety" />
        <Receptor x={636} y={210} label="GLP-1 R" sub="gut · brain" />
        <line x1={500} y1={152} x2={582} y2={112} stroke="var(--accent)" strokeOpacity={0.7} strokeWidth={1.8} />
        <line x1={500} y1={178} x2={582} y2={208} stroke="var(--accent)" strokeOpacity={0.7} strokeWidth={1.8} />
        <text x={544} y={286} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.45} fontSize="9.5">ratio welded — one dose, one PK</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Both approaches land on the same two receptors. The combination keeps the GLP-1-to-amylin
        ratio adjustable; the single molecule trades that knob for one dose and one pharmacokinetic
        profile.
      </figcaption>
    </figure>
  );
}
