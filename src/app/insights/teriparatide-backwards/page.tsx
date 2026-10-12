import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("teriparatide-backwards")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Why Intermittent PTH Builds Bone and Continuous PTH Destroys It: Teriparatide — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "Teriparatide, Backwards: Why the Bone-Dissolving Hormone Became a Bone-Building Drug · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  neer: "https://pubmed.ncbi.nlm.nih.gov/11346808/", // Neer et al. 2001, NEJM — teriparatide (PTH 1-34) reduces fractures in postmenopausal osteoporosis
  active: "https://pubmed.ncbi.nlm.nih.gov/27533157/", // Miller et al. 2016, JAMA — ACTIVE: abaloparatide (PTHrP analog) reduces vertebral fractures
  mechanism: "https://pubmed.ncbi.nlm.nih.gov/25854704/", // Silva & Bilezikian 2015, Curr Opin Pharmacol — PTH anabolic vs catabolic actions on the skeleton
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "Why does intermittent PTH build bone while continuous PTH destroys it?",
    a: "Because bone reads the duration of the signal, not just its presence. A brief daily spike of parathyroid hormone switches on the bone-building osteoblast program — and does it faster than it switches on resorption, opening a short 'anabolic window' in which formation outruns breakdown. A level that stays high, by contrast, keeps driving the osteoclast side: it raises RANKL and lowers osteoprotegerin, tipping the balance toward resorption. Same hormone, same PTH1 receptor — opposite outcome, decided by the shape of the exposure in time.",
  },
  {
    q: "What is teriparatide?",
    a: "Teriparatide is the first 34 amino acids of parathyroid hormone — PTH(1-34), the active N-terminal fragment — given as a once-daily injection. That single daily pulse makes it the first true bone-anabolic osteoporosis drug: unlike the antiresorptives, which slow bone loss, teriparatide actually builds new bone. In its pivotal trial it reduced vertebral and non-vertebral fractures in postmenopausal women with osteoporosis. It works precisely because it is given intermittently, not continuously.",
  },
  {
    q: "If PTH raises blood calcium by taking it from bone, how can it be good for bone?",
    a: "Those are two different exposure patterns of the same hormone. The chronic calcium-raising action — seen in primary hyperparathyroidism, where a tumor secretes PTH continuously — does mine the skeleton for calcium and weakens bone over time. The drug recreates only a brief daily spike, which triggers the formation program before the resorption program catches up. The hormone that dissolves bone when it never switches off builds bone when it is switched on and off once a day.",
  },
  {
    q: "What is abaloparatide, and how is it related?",
    a: "Abaloparatide is an analog of PTH-related protein (PTHrP), which acts on the same PTH1 receptor as PTH. Given intermittently, it is anabolic just like teriparatide and reduced vertebral fractures in its phase 3 trial. The connection is the deeper point: PTHrP secreted continuously by tumors is the leading cause of hypercalcemia of malignancy — the catabolic face again. One receptor, two ligands, and the same rule: intermittent builds, continuous breaks down.",
  },
  {
    q: "Why is teriparatide given for only about two years?",
    a: "Because the anabolic window closes. As treatment continues, bone resorption gradually catches up with formation, so the net bone-building advantage wanes over time, and the gains plateau. For that reason anabolic therapy is given as a time-limited course and then followed by an antiresorptive drug to lock in the bone that was built. There is also a precautionary limit rooted in a rat study that showed bone tumors at high lifetime exposure, which shaped the drug's labeling.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(94,168,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/calcium-bone" className="text-accent-blue hover:text-ink">
                Calcium &amp; bone
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
            <Section title="The bone hormone that dissolves bone">
              <P>
                <Link href="/hormones/pth" className={LINK}>Parathyroid hormone</Link> is
                the body&rsquo;s fastest defense against low blood calcium. Let the
                calcium level dip and within minutes PTH is released, pulling calcium out
                of bone, reclaiming it in the kidney, and switching on vitamin&nbsp;D to
                absorb more from food. It is, in its day job, a hormone that spends the
                skeleton to keep the blood supplied — and when it runs unchecked, that is
                exactly what it does.
              </P>
              <P>
                In primary hyperparathyroidism, a parathyroid tumor secretes PTH
                continuously, and the classic consequence is a skeleton slowly mined for
                calcium: thinned bone, in severe cases the cavities and fractures of
                osteitis fibrosa. For most of the twentieth century this was the whole
                reputation of PTH where bone was concerned — a catabolic hormone, the agent
                of a bone-wasting disease. Which is why the drug built from it is one of
                the most counterintuitive objects in endocrinology. Bullish on the science,
                sceptical on the easy story.
              </P>
            </Section>

            <Section title="The same molecule, built into a drug">
              <P>
                <Em>Teriparatide</Em> is parathyroid hormone — specifically its active
                business end, the first 34 residues, PTH(1-34) — given as a once-daily
                injection. And it does the opposite of what its parent hormone&rsquo;s
                reputation predicts: it <Em>builds</Em> bone. That makes it categorically
                different from the older osteoporosis drugs. Bisphosphonates and the rest
                are antiresorptive — they slow the loss of bone. Teriparatide is anabolic;
                it lays down new bone that was not there before, the first drug to do so.
              </P>
              <P>
                This was not a theoretical nicety. In the pivotal trial, daily teriparatide
                cut the risk of vertebral and non-vertebral fractures in postmenopausal
                women with osteoporosis (
                <a href={REF.neer} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Neer et&nbsp;al., NEJM, 2001
                </a>
                ). The hormone of a bone-dissolving disease had become the first bone-building
                medicine. The entire resolution of that paradox is a single variable — and it
                is one this site has met before, in another axis.
              </P>
            </Section>

            <Section title="Frequency is the message">
              <P>
                Bone does not read whether PTH is present. It reads <Em>how long</Em> it
                stays. A brief daily spike and a permanently elevated level are, to the
                skeleton, two different signals — and they drive opposite programs through
                the very same PTH1 receptor. This is the same counterintuitive rule that
                governs the{" "}
                <Link href="/insights/the-pulse-is-the-message" className={LINK}>
                  reproductive axis
                </Link>
                , where pulsatile GnRH switches the system on and continuous GnRH switches
                it off. In bone, the clock decides between building and breaking.
              </P>
              <P>
                The mechanism splits cleanly. A short pulse of PTH switches on the
                osteoblast — the bone-forming cell — faster than it switches on resorption,
                inducing the formation program (immediate-early genes, a drop in the
                bone-formation brake sclerostin) and opening what the field calls the{" "}
                <Em>anabolic window</Em>: a span in which formation outruns breakdown. A
                continuously high level does the reverse. It keeps driving the osteoclast
                side, raising RANKL and lowering osteoprotegerin until resorption dominates
                and the skeleton is spent (
                <a href={REF.mechanism} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Silva &amp; Bilezikian, Curr&nbsp;Opin&nbsp;Pharmacol, 2015
                </a>
                ). Same receptor, same hormone, opposite verdict — written by the shape of
                the exposure in time.
              </P>
              <PTHClock />
            </Section>

            <Section title="PTHrP: the same receptor, the same lesson">
              <P>
                The rule is not unique to PTH. Its sibling,{" "}
                <Link href="/hormones/pthrp" className={LINK}>PTH-related protein</Link>,
                shares PTH&rsquo;s N-terminus and acts on the same PTH1 receptor — and it
                obeys the same frequency law. Given intermittently as the analog
                <Em> abaloparatide</Em>, PTHrP is anabolic, and in its phase 3 trial it
                reduced new vertebral fractures much as teriparatide does (
                <a href={REF.active} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Miller et&nbsp;al., JAMA, 2016
                </a>
                ).
              </P>
              <P>
                And the catabolic face is there too, in the most literal way. When a tumor
                secretes PTHrP continuously into the blood, the result is the leading cause
                of hypercalcemia of malignancy — the skeleton stripped of calcium by exactly
                the mechanism continuous PTH1-receptor signaling predicts. One receptor, two
                ligands, and in both the identical rule: a pulse builds bone, a plateau
                dissolves it. The receptor is not reading which molecule arrived; it is
                reading how long the message lasts.
              </P>
            </Section>

            <Section title="Why the window closes">
              <P>
                The anabolic window is not permanent, and that shapes how the drug is used.
                As treatment continues, resorption gradually catches up with formation; the
                net building advantage narrows, and bone gains plateau. So anabolic therapy
                is deliberately time-limited — a course of roughly two years — after which an
                antiresorptive is given to lock in the bone that was built, because the gains
                erode if nothing holds them. The logic even extends to combinations: pairing
                teriparatide with a potent antiresorptive from the start can blunt the
                anabolic effect, since the formation program leans on some of the turnover
                the antiresorptive is suppressing.
              </P>
              <P>
                Two footnotes complete the honest picture. A rat study found bone tumors at
                high lifetime exposure, which shaped the drug&rsquo;s labeling and the limit
                on treatment duration. And{" "}
                <Link href="/hormones/calcitonin" className={LINK}>calcitonin</Link>, the
                hormone that formally opposes PTH by lowering calcium, turns out to play only
                a minor role in adult human bone — a reminder that the interesting lever in
                this axis was never a second hormone, but the <Em>timing</Em> of the first
                one.
              </P>
              <Callout label="The engineering read">
                Teriparatide is not a redesigned molecule; it is a redesigned <em>schedule</em>.
                The whole invention was recognizing that the bone-wasting hormone of
                hyperparathyroidism becomes bone-building the moment you deliver it as a daily
                pulse instead of a constant level. The drug is the dosing interval.
              </Callout>
            </Section>

            <Section title="The pulse, in a second axis">
              <P>
                Step back and PTH joins a small, revealing club: hormones whose meaning lives
                in time rather than concentration. The reproductive axis reads the frequency
                of GnRH; the skeleton reads the duration of PTH. In both, the same molecule
                flips a system&rsquo;s behavior end to end depending only on whether it
                arrives as a pulse or a plateau, and in both the most useful drugs are the ones
                that write to that rhythm deliberately. Teriparatide is what it looks like to
                take a hormone with a fearsome catabolic reputation and, by changing nothing
                but the clock, turn it into the first drug that builds the very tissue its
                parent was known for dissolving.
              </P>
              <Bullets
                items={[
                  ["PTH is catabolic when it never switches off", "Continuous excess, as in hyperparathyroidism, mines the skeleton for calcium — the hormone's historical reputation in bone."],
                  ["Teriparatide is PTH(1-34) given once daily", "A single daily pulse makes it the first anabolic osteoporosis drug — it builds new bone, where antiresorptives only slow loss. It cut fractures in its pivotal trial."],
                  ["Duration decides, through one receptor", "A brief spike drives the osteoblast formation program (↓sclerostin) and opens an 'anabolic window'; a sustained level drives osteoclasts (↑RANKL, ↓OPG). Same PTH1R, opposite outcome."],
                  ["PTHrP obeys the same law", "Intermittent PTHrP (abaloparatide) builds bone and cut vertebral fractures; continuous tumor-secreted PTHrP causes hypercalcemia of malignancy. One rule, two ligands."],
                  ["The window closes, so the course is finite", "Resorption catches up over ~2 years; anabolic therapy is time-limited and followed by an antiresorptive to lock in the gains. The drug is the schedule, not a new molecule."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/pth" label="PTH reference (the fast calcium hormone)" />
                <CrossLink href="/hormones/pthrp" label="PTHrP reference (the same receptor, in development and cancer)" />
                <CrossLink href="/hormones/calcitonin" label="Calcitonin reference (the opposing hormone)" />
                <CrossLink href="/insights/the-pulse-is-the-message" label="The pulse is the message — the same timing rule in the reproductive axis" />
                <CrossLink href="/insights/two-ways-to-ask-for-growth" label="Two ways to ask for growth — pulsatility in the GH axis" />
                <CrossLink href="/families/calcium-bone" label="The calcium & bone family" />
                <CrossLink href="/research?q=Why%20does%20intermittent%20PTH%20%28teriparatide%29%20build%20bone%20while%20continuous%20PTH%20exposure%20causes%20bone%20loss%2C%20through%20the%20same%20PTH1%20receptor%3F" label="Ask the research agent about PTH timing" />
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

/* ── Same hormone, two schedules, opposite bone outcomes ── */
function PTHClock() {
  const W = 700;
  const H = 320;
  const PL = 150;
  const PR = 596;

  const toPts = (pts: [number, number][]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  // Row baselines: in = PTH input line, bone = bone-mass trend line
  const R = [
    { in: 96, bone: 150 }, // intermittent
    { in: 232, bone: 286 }, // continuous
  ];

  // Row 0 — intermittent: sharp daily spikes
  const spikes = Array.from({ length: 6 }, (_, k) => PL + 30 + (k * (PR - PL - 60)) / 5);
  const bone0: [number, number][] = [];
  for (let x = PL; x <= PR; x += 5) bone0.push([x, R[0].bone - 24 * ((x - PL) / (PR - PL))]); // rising (bone built)

  // Row 1 — continuous: flat high plateau
  const bone1: [number, number][] = [];
  for (let x = PL; x <= PR; x += 5) bone1.push([x, R[1].bone + 22 * ((x - PL) / (PR - PL))]); // falling (bone lost)

  const Spikes = ({ y }: { y: number }) => (
    <g stroke="var(--accent-blue)" strokeOpacity={0.85} strokeWidth={2} strokeLinecap="round">
      {spikes.map((x, i) => <line key={i} x1={x} y1={y} x2={x} y2={y - 26} />)}
    </g>
  );

  const Verdict = ({ cy, label, up }: { cy: number; label: string; up: boolean }) => (
    <g>
      <rect x={612} y={cy - 12} width={80} height={24} rx={12}
        fill={up ? "color-mix(in srgb, var(--accent-blue) 16%, transparent)" : "color-mix(in srgb, var(--color-ink) 8%, transparent)"}
        stroke={up ? "var(--accent-blue)" : "var(--color-ink)"} strokeOpacity={up ? 0.7 : 0.3} strokeWidth={1.1} />
      <text x={652} y={cy + 4} textAnchor="middle" fill={up ? "var(--accent-blue)" : "var(--color-ink)"} fillOpacity={up ? 1 : 0.6} fontSize="10.5" fontWeight="700">{label}</text>
    </g>
  );

  const Label = ({ cy, name, sub }: { cy: number; name: string; sub: string }) => (
    <g fontFamily="var(--font-space-grotesk), sans-serif">
      <text x={18} y={cy - 4} fill="var(--color-ink)" fillOpacity={0.85} fontSize="12.5" fontWeight="600">{name}</text>
      <text x={18} y={cy + 12} fill="var(--color-ink)" fillOpacity={0.45} fontSize="10">{sub}</text>
    </g>
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="Two rows showing the same PTH1 receptor driven by two dosing patterns. In the top row, intermittent PTH arrives as sharp daily spikes (teriparatide) and the bone-mass line rises: the axis builds bone. In the bottom row, continuous PTH is a flat, permanently high level (hyperparathyroidism) and the bone-mass line falls: the axis breaks bone down. Same hormone, opposite outcome, decided by duration."
      >
        <text x={(PL + PR) / 2} y={22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          One receptor, two schedules, opposite bone
        </text>
        <text x={(PL + PR) / 2} y={40} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10.5">
          upper line = PTH exposure · lower line = bone mass
        </text>

        {/* faint bone baselines */}
        {R.map((r, i) => <line key={i} x1={PL} y1={r.bone} x2={PR} y2={r.bone} stroke="var(--color-ink)" strokeOpacity={0.08} strokeWidth={1} />)}

        {/* Row 0 — intermittent */}
        <Label cy={132} name="Intermittent" sub="teriparatide · daily pulse" />
        <Spikes y={R[0].in} />
        <polyline points={toPts(bone0)} fill="none" stroke="var(--accent-blue)" strokeOpacity={0.9} strokeWidth={1.9} />
        <text x={PR} y={R[0].bone - 30} textAnchor="end" fill="var(--accent-blue)" fillOpacity={0.9} fontSize="9.5">anabolic window — formation leads</text>
        <Verdict cy={R[0].bone - 12} label="BUILDS" up />

        {/* Row 1 — continuous */}
        <Label cy={268} name="Continuous" sub="hyperparathyroidism · plateau" />
        <rect x={PL} y={R[1].in - 16} width={PR - PL} height={16} rx={4} fill="color-mix(in srgb, var(--accent-blue) 14%, transparent)" stroke="var(--accent-blue)" strokeOpacity={0.45} strokeWidth={1} />
        <text x={(PL + PR) / 2} y={R[1].in - 22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.45} fontSize="9.5">never switches off — ↑RANKL, ↓OPG</text>
        <polyline points={toPts(bone1)} fill="none" stroke="var(--color-ink)" strokeOpacity={0.55} strokeWidth={1.9} />
        <Verdict cy={R[1].bone + 12} label="BREAKS" up={false} />

        {/* time axis */}
        <line x1={PL} y1={304} x2={PR} y2={304} stroke="var(--color-ink)" strokeOpacity={0.15} strokeWidth={1} />
        <text x={PR} y={316} textAnchor="end" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10">time →</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The pulse builds, the plateau breaks. Teriparatide&rsquo;s whole trick is delivering
        PTH as a daily spike, so bone formation leads resorption before the window closes.
      </figcaption>
    </figure>
  );
}
