import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-pulse-is-the-message")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "Why GnRH Agonists Suppress: Pulsatility, Kisspeptin and the Reproductive Axis — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "GnRH Pulsatility, Agonists vs Antagonists, and Kisspeptin: The Reproductive Axis · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  knobil: "https://pubmed.ncbi.nlm.nih.gov/100883/", // Belchetz, Plant, Knobil et al. 1978, Science — continuous vs intermittent GnRH
  decode: "https://pubmed.ncbi.nlm.nih.gov/29102564/", // Stamatiades et al. 2018, Mol Cell Endocrinol — gonadotropin regulation by pulsatile GnRH
  deroux: "https://pubmed.ncbi.nlm.nih.gov/12944565/", // de Roux et al. 2003, PNAS — loss-of-function GPR54 → hypogonadotropic hypogonadism
  teles: "https://pubmed.ncbi.nlm.nih.gov/18272894/", // Teles et al. 2008, NEJM — GPR54 activating mutation → central precocious puberty
  jayasena: "https://pubmed.ncbi.nlm.nih.gov/25036713/", // Jayasena et al. 2014, J Clin Invest — kisspeptin-54 triggers egg maturation in IVF
  abbara: "https://pubmed.ncbi.nlm.nih.gov/26192876/", // Abbara et al. 2015, JCEM — kisspeptin-54 trigger in women at high OHSS risk
  hero: "https://pubmed.ncbi.nlm.nih.gov/32469183/", // Shore et al. 2020, NEJM — oral relugolix vs leuprolide (HERO)
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "Why does a GnRH agonist like leuprolide suppress testosterone instead of raising it?",
    a: "Because the reproductive axis responds to the rhythm of GnRH, not its amount. Native GnRH arrives in pulses, roughly one an hour, and the pituitary receptor recovers between beats. A long-acting agonist holds a continuous, high level, so after an initial surge (the flare) the receptor desensitizes and uncouples from its signaling, and gonadotropin output collapses. The drug shuts the system down by never letting the pattern reset. That is why continuous GnRH-agonist therapy is used to lower sex steroids in prostate cancer, endometriosis, precocious puberty and IVF downregulation.",
  },
  {
    q: "What is the difference between a GnRH agonist and a GnRH antagonist?",
    a: "Both end in suppression, by opposite routes. An agonist (leuprolide, goserelin) overstimulates the receptor until it desensitizes, so suppression is preceded by a testosterone or estrogen flare and takes days to set in. An antagonist (cetrorelix, degarelix, relugolix) blocks the receptor directly, so gonadotropins fall immediately with no flare. The flare-free profile is why antagonists are used when an initial hormone surge would be harmful, such as in advanced prostate cancer or to prevent a premature LH surge during IVF.",
  },
  {
    q: "Why does GnRH have to be delivered in pulses?",
    a: "Ernst Knobil's group showed it directly in the 1970s: in monkeys whose own GnRH was gone, hourly pulses of GnRH restored normal LH and FSH, while the same GnRH infused continuously shut them down. The receptor needs the gaps. Pulsatile exposure lets it recover and respond to each beat; continuous exposure desensitizes it. Pulse frequency also tunes the two outputs, with faster pulses favoring LH and slower ones FSH. The pituitary reads frequency, not concentration.",
  },
  {
    q: "What does kisspeptin do in the reproductive system?",
    a: "Kisspeptin sits one level above GnRH and provides the drive that generates the GnRH pulse. Its role was revealed by genetics: people with loss-of-function mutations in its receptor (KISS1R, formerly GPR54) fail to enter puberty, and a child with an activating mutation entered puberty very early. Kisspeptin neurons integrate sex-steroid feedback and metabolic signals, which is part of why energy balance and body fat influence fertility. It is now also being tested as a gentler way to trigger ovulation.",
  },
  {
    q: "Is there an oral drug for the reproductive axis, or are they all injections?",
    a: "Most were injectable peptides, but relugolix is a small-molecule GnRH antagonist taken as a daily pill. In a head-to-head trial in advanced prostate cancer it suppressed testosterone faster than injected leuprolide and was associated with fewer major cardiovascular events. It is the same shift the GLP-1 field is making with oral small molecules: the receptor reads the message, so the messenger does not have to be a peptide.",
  },
  {
    q: "Can kisspeptin be used for fertility treatment?",
    a: "It is an active research direction. The usual IVF ovulation trigger, an hCG bolus, is a strong and long-lasting LH-like signal that can push high responders into ovarian hyperstimulation syndrome. Kisspeptin instead asks the hypothalamus to release its own GnRH, producing a self-limiting LH surge. In trials a single dose of kisspeptin-54 matured eggs effectively, and in women at high risk of hyperstimulation it did so with a markedly safer profile. It is early-stage, but it works with the axis's own rhythm rather than overriding it.",
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
              <Link href="/families/reproductive-gonadal" className="text-accent-rose hover:text-ink">
                Reproductive &amp; gonadal
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
            <Section title="The axis that reads rhythm">
              <P>
                Most of the endocrine system speaks in amounts. A gland releases more
                or less of a hormone, a receptor reads the concentration, the response
                scales. The reproductive axis is the great exception. Its master
                signal,{" "}
                <Link href="/hormones/gnrh" className={LINK}>GnRH</Link>, carries its
                meaning not in how much arrives but in how often. The hypothalamus
                releases GnRH in discrete pulses, roughly one an hour in the
                reproductive state, and the pituitary below it decodes the beat.
              </P>
              <P>
                The axis is a three-storey cascade. GnRH from the hypothalamus drives
                the pituitary to release two gonadotropins,{" "}
                <Link href="/hormones/lh" className={LINK}>LH</Link> and{" "}
                <Link href="/hormones/fsh" className={LINK}>FSH</Link>; those travel to
                the gonads to make sex steroids and gametes; the steroids feed back to
                set the tempo. Everything about it (puberty, the menstrual cycle,
                fertility, and every drug that suppresses or restores them) turns on
                one counterintuitive rule: <Em>the pulse is the message.</Em> Read the
                rhythm, and the whole family, its strangest pharmacology included,
                falls into place.
              </P>
            </Section>

            <Section title="Knobil's switch">
              <P>
                The proof is one of the cleanest experiments in endocrinology. In the
                late 1970s, Ernst Knobil&rsquo;s group worked with monkeys whose own
                GnRH neurons had been destroyed, leaving the pituitary intact but
                silent. Infused with GnRH in hourly pulses, the animals&rsquo; LH and
                FSH returned to normal and the axis switched back on. Infused with the
                exact same GnRH continuously, at the same total dose, their
                gonadotropins collapsed (
                <a href={REF.knobil} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Belchetz and Knobil, Science, 1978
                </a>
                ). Same molecule, same amount, opposite outcome. The only variable was
                rhythm.
              </P>
              <P>
                The mechanism is receptor desensitization. A GnRH receptor that is
                pulsed recovers between beats and answers each one; a receptor bathed
                continuously downregulates, uncouples from its signaling, and goes
                quiet. Later work mapped how the beat itself is decoded downstream,
                with faster pulses biasing the pituitary toward LH and slower ones
                toward FSH, so the axis tunes its two outputs by frequency alone (
                <a href={REF.decode} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Stamatiades et&nbsp;al., 2018
                </a>
                ). The pituitary is not a volume meter. It is a frequency decoder.
              </P>
              <PulseDecoder />
            </Section>

            <Section title="The agonist that turns the system off">
              <P>
                Here the pharmacology gets strange, and rather beautiful. If continuous
                GnRH shuts the axis down, then a drug that mimics GnRH but never stops
                should be a suppressant, not a stimulant. That is exactly what a GnRH
                agonist is.{" "}
                <Link href="/hormones/leuprolide" className={LINK}>Leuprolide</Link>{" "}
                and{" "}
                <Link href="/hormones/goserelin" className={LINK}>goserelin</Link>{" "}
                are engineered GnRH analogs, more potent and longer-lasting than the
                native decapeptide, delivered as depots that hold a continuous high
                level for months. For the first days they genuinely stimulate: the{" "}
                <Em>flare</Em>, a surge of LH and sex steroids. Then the receptor
                desensitizes and the axis goes dark.
              </P>
              <P>
                A super-agonist used to switch a system off is a genuine oddity, and it
                is one of the most-used tricks in medicine. Continuous GnRH-agonist
                suppression is how prostate cancer is deprived of testosterone, how
                endometriosis and fibroids are starved of estrogen, how central
                precocious puberty is paused, and how an IVF cycle is downregulated
                before controlled stimulation. The flare is the catch: in advanced
                prostate cancer that first testosterone surge can briefly worsen the
                disease, which is why it is managed with care. The drug works by
                overwhelming the code the axis depends on. It shouts the ON signal so
                loudly, and so constantly, that the receptor stops listening.
              </P>
              <Callout label="The engineering read">
                Judge a GnRH agonist as a signal and the paradox dissolves. The axis
                responds to a pattern, not a level. Flood it with a constant maximal
                input and you have not sent a stronger ON; you have erased the pattern,
                which the pituitary reads as OFF. The flare is the system answering the
                first beat, before it registers that the beat never ends.
              </Callout>
            </Section>

            <Section title="The cleaner mirror: antagonists">
              <P>
                If the agonist reaches OFF by the scenic route (stimulate, flare, then
                desensitize), the antagonists take the direct one.{" "}
                <Link href="/hormones/cetrorelix" className={LINK}>Cetrorelix</Link>,
                ganirelix, degarelix and relugolix bind the GnRH receptor and block it,
                so gonadotropin release falls immediately, with no flare. The clinical
                value is precisely the absence of the surge: in IVF an antagonist
                prevents a premature LH surge without the downregulation lead-in, and
                in prostate cancer it drops testosterone without the initial spike.
              </P>
              <P>
                For decades that clean suppression still cost a needle, because the
                antagonists were peptides. The recent shift is that one of them is not.
                Relugolix is a small-molecule GnRH antagonist taken as a daily pill,
                and in a head-to-head trial against the agonist leuprolide it suppressed
                testosterone faster and was associated with fewer of the major
                cardiovascular events that shadow androgen deprivation (
                <a href={REF.hero} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Shore et&nbsp;al., NEJM, 2020
                </a>
                ). It is the same move the incretin field is making with{" "}
                <Link href="/insights/glp-1-in-a-pill" className={LINK}>oral GLP-1</Link>:
                a receptor reads the message, not the messenger, so the messenger can
                stop being a peptide.
              </P>
            </Section>

            <Section title="The gate above the pulse: kisspeptin">
              <P>
                For all its elegance, the pulse generator raised a harder question:
                what sets the beat? The answer arrived through a genetics puzzle.
                Families whose children never entered puberty, and who had low
                gonadotropins for no structural reason, turned out to share
                loss-of-function mutations in a receptor then called GPR54 (
                <a href={REF.deroux} target="_blank" rel="noopener noreferrer" className={LINK}>
                  de&nbsp;Roux et&nbsp;al., PNAS, 2003
                </a>
                ). Its ligand is{" "}
                <Link href="/hormones/kisspeptin" className={LINK}>kisspeptin</Link>, a
                hypothalamic peptide acting one storey above GnRH. Knock out its
                receptor and the GnRH pulse never starts; the axis is fully built, but
                never switched on.
              </P>
              <P>
                The mirror sealed it. A child carrying an <Em>activating</Em> mutation
                in the same receptor entered puberty extraordinarily early (
                <a href={REF.teles} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Teles et&nbsp;al., NEJM, 2008
                </a>
                ). Too little kisspeptin signaling and puberty fails to begin; too much
                and it begins too soon. Kisspeptin neurons sit at the hypothalamic KNDy
                hub and integrate the inputs that gate reproduction: sex-steroid
                feedback, and the metabolic signals that explain why energy balance and
                body fat move the reproductive axis at all. The pulse everyone had
                studied since Knobil had a gatekeeper, and it had been hiding in a
                broken gene.
              </P>
            </Section>

            <Section title="Working with the rhythm">
              <P>
                Kisspeptin also pointed toward a gentler kind of drug. The problem with
                triggering ovulation in IVF is the trigger itself: the standard{" "}
                <Link href="/hormones/hcg" className={LINK}>hCG</Link> bolus is a
                powerful, long-lasting LH-like jolt that can tip high responders into
                ovarian hyperstimulation syndrome. Kisspeptin does something the axis
                recognizes as physiological. It asks the hypothalamus to release its
                own GnRH, producing a self-limiting LH surge rather than an imposed
                one. In trials, a single dose of kisspeptin-54 matured eggs effectively
                (
                <a href={REF.jayasena} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jayasena et&nbsp;al., 2014
                </a>
                ), and in women at high risk of hyperstimulation it did so with a
                markedly safer profile (
                <a href={REF.abbara} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Abbara et&nbsp;al., 2015
                </a>
                ).
              </P>
              <P>
                That is the whole thesis turned into a strategy. The agonists and the
                hCG trigger overwhelm the system with a signal it cannot ignore;
                kisspeptin nudges the gate and lets the axis produce its own pulse.
                Working with the rhythm rather than against it is the newer, quieter
                frontier, and it runs the length of the family: pulsatile GnRH pumps
                that restore fertility by supplying the missing beat, antagonists that
                block without the surge, kisspeptin that triggers by asking rather than
                forcing.
              </P>
            </Section>

            <Section title="Frequency, not amount">
              <P>
                Step back and the reproductive axis is the clearest case in physiology
                of a signal that lives in time rather than in concentration. Its
                hormones are famous (testosterone, estrogen, the LH surge of ovulation),
                but the control layer above them is a rhythm, and almost every drug in
                the family is a way of writing to that rhythm or jamming it. Read the
                pulse and the paradoxes resolve: why a stimulant suppresses, why an
                antagonist is kinder than an agonist, why puberty waits on a single
                gene, and why the gentlest fertility trigger is the one that asks the
                hypothalamus to speak for itself.
              </P>
              <Bullets
                items={[
                  ["The signal is the rhythm, not the level", "GnRH is pulsatile, and the pituitary decodes frequency. Knobil's monkeys proved it: pulsed GnRH switches the axis on, the same GnRH given continuously switches it off."],
                  ["The agonist paradox", "Leuprolide and goserelin stimulate so constantly that the receptor desensitizes. After an initial flare they suppress the axis. A super-agonist used, deliberately, as an off switch."],
                  ["Antagonists are the clean mirror", "Cetrorelix and relugolix block the receptor for immediate, flare-free suppression. Relugolix is oral and beat injected leuprolide head-to-head, the small-molecule move the GLP-1 field is also making."],
                  ["Kisspeptin is the gate", "It sets the pulse one storey above GnRH. Genetics revealed it: lose the receptor and puberty never starts, over-activate it and puberty comes early."],
                  ["The frontier works with the rhythm", "Kisspeptin triggers ovulation by asking the hypothalamus for its own surge, maturing eggs with far less hyperstimulation risk than an hCG bolus. Speak the axis's language instead of shouting over it."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/gnrh" label="GnRH reference (the pulsatile driver)" />
                <CrossLink href="/hormones/kisspeptin" label="Kisspeptin reference (the pulse gate)" />
                <CrossLink href="/hormones/leuprolide" label="Leuprolide reference (the agonist that suppresses)" />
                <CrossLink href="/hormones/cetrorelix" label="Cetrorelix reference (the antagonist mirror)" />
                <CrossLink href="/families/reproductive-gonadal" label="The reproductive & gonadal family" />
                <CrossLink href="/insights/glp-1-in-a-pill" label="Oral GLP-1 — the same small-molecule move" />
                <CrossLink href="/research?q=Why%20does%20pulsatile%20GnRH%20stimulate%20the%20reproductive%20axis%20while%20continuous%20GnRH%20agonist%20exposure%20suppresses%20it%2C%20and%20how%20do%20GnRH%20antagonists%20and%20kisspeptin%20differ%3F" label="Ask the research agent about the pulse" />
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

/* ── One receptor, three GnRH inputs, three outcomes ── */
function PulseDecoder() {
  const W = 700;
  const H = 372;
  const PL = 190;
  const PR = 600;
  const spikes = Array.from({ length: 9 }, (_, k) => PL + 22 + (k * (PR - PL - 44)) / 8);

  // per-regime baselines: gi = GnRH input line, lo = LH/FSH output line
  const R = [
    { gi: 92, lo: 120 },
    { gi: 190, lo: 218 },
    { gi: 286, lo: 314 },
  ];

  const toPts = (pts: [number, number][]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  // Row 0 — pulsatile output: gaussian bumps under each spike
  const out0: [number, number][] = [];
  for (let x = PL; x <= PR; x += 6) {
    let bump = 0;
    for (const s of spikes) { const d = (x - s) / 13; bump = Math.max(bump, Math.exp(-d * d)); }
    out0.push([x, R[0].lo - 13 * bump]);
  }
  // Row 1 — continuous agonist: flare then suppression
  const out1: [number, number][] = [];
  const peakX = PL + 58;
  for (let x = PL; x <= PR; x += 6) {
    let y: number;
    if (x <= peakX) { const t = (x - PL) / (peakX - PL); y = R[1].lo - 24 * t; }
    else { const t = (x - peakX) / 70; y = R[1].lo - 3 - 21 * Math.exp(-t * t); }
    out1.push([x, y]);
  }
  // Row 2 — antagonist: immediate low, no flare
  const out2: [number, number][] = [];
  for (let x = PL; x <= PR; x += 6) { const t = (x - PL) / 32; out2.push([x, R[2].lo - 2 - 6 * Math.exp(-t * t)]); }

  const Spikes = ({ y, faded }: { y: number; faded?: boolean }) => (
    <g stroke="var(--accent-rose)" strokeOpacity={faded ? 0.4 : 0.85} strokeWidth={2} strokeLinecap="round">
      {spikes.map((x, i) => <line key={i} x1={x} y1={y} x2={x} y2={y - 16} />)}
    </g>
  );

  const Verdict = ({ cy, label, sub, on }: { cy: number; label: string; sub?: string; on?: boolean }) => (
    <g>
      <rect x={624} y={cy - 11} width={64} height={22} rx={11}
        fill={on ? "color-mix(in srgb, var(--accent-rose) 18%, transparent)" : "color-mix(in srgb, var(--color-ink) 8%, transparent)"}
        stroke={on ? "var(--accent-rose)" : "var(--color-ink)"} strokeOpacity={on ? 0.7 : 0.3} strokeWidth={1.1} />
      <text x={656} y={cy + 4} textAnchor="middle" fill={on ? "var(--accent-rose)" : "var(--color-ink)"} fillOpacity={on ? 1 : 0.6} fontSize="12" fontWeight="700">{label}</text>
      {sub && <text x={656} y={cy + 22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="9">{sub}</text>}
    </g>
  );

  const Label = ({ cy, name, sub }: { cy: number; name: string; sub: string }) => (
    <g fontFamily="var(--font-space-grotesk), sans-serif">
      <text x={20} y={cy - 4} fill="var(--color-ink)" fillOpacity={0.85} fontSize="13" fontWeight="600">{name}</text>
      <text x={20} y={cy + 13} fill="var(--color-ink)" fillOpacity={0.45} fontSize="11">{sub}</text>
    </g>
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="Three GnRH inputs to the same pituitary receptor and their outputs. Pulsatile GnRH (evenly spaced input pulses) produces a matching pulsatile LH/FSH output: the axis is ON. A continuous GnRH agonist (a constant input) produces an initial flare of LH/FSH that then decays to a low flat line as the receptor desensitizes: the axis is OFF after the flare. A GnRH antagonist blocks the receptor even though GnRH pulses are present, so output stays low immediately with no flare: OFF, no flare."
      >
        <text x={(PL + PR) / 2} y={22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          One receptor, three inputs, three outcomes
        </text>
        <text x={(PL + PR) / 2} y={40} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10.5">
          upper line = GnRH input · lower line = LH / FSH output
        </text>

        {/* faint output baselines */}
        {R.map((r, i) => <line key={i} x1={PL} y1={r.lo} x2={PR} y2={r.lo} stroke="var(--color-ink)" strokeOpacity={0.08} strokeWidth={1} />)}

        {/* Row 0 — pulsatile */}
        <Label cy={106} name="Pulsatile GnRH" sub="native rhythm" />
        <Spikes y={R[0].gi} />
        <polyline points={toPts(out0)} fill="none" stroke="var(--accent-rose)" strokeOpacity={0.85} strokeWidth={1.8} />
        <Verdict cy={R[0].lo} label="ON" on sub="axis active" />

        {/* Row 1 — continuous agonist */}
        <Label cy={204} name="Continuous agonist" sub="leuprolide · goserelin" />
        <text x={(PL + PR) / 2} y={169} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.45} fontSize="10">continuous exposure, no gaps</text>
        <rect x={PL} y={R[1].gi - 15} width={PR - PL} height={15} rx={4} fill="color-mix(in srgb, var(--accent-rose) 15%, transparent)" stroke="var(--accent-rose)" strokeOpacity={0.5} strokeWidth={1} />
        <polyline points={toPts(out1)} fill="none" stroke="var(--color-ink)" strokeOpacity={0.6} strokeWidth={1.8} />
        <text x={peakX + 8} y={R[1].lo - 22} fill="var(--accent-rose)" fillOpacity={0.9} fontSize="10" fontWeight="600">flare</text>
        <Verdict cy={R[1].lo} label="OFF" sub="after flare" />

        {/* Row 2 — antagonist */}
        <Label cy={300} name="Antagonist" sub="cetrorelix · relugolix" />
        <Spikes y={R[2].gi} faded />
        <text x={(PL + PR) / 2} y={R[2].gi + 12} textAnchor="middle" fill="var(--accent-blue)" fillOpacity={0.8} fontSize="9.5">GnRH present · receptor blocked</text>
        <polyline points={toPts(out2)} fill="none" stroke="var(--color-ink)" strokeOpacity={0.6} strokeWidth={1.8} />
        <Verdict cy={R[2].lo} label="OFF" sub="no flare" />

        {/* time axis */}
        <line x1={PL} y1={344} x2={PR} y2={344} stroke="var(--color-ink)" strokeOpacity={0.15} strokeWidth={1} />
        <text x={PR} y={358} textAnchor="end" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10">time →</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The same receptor, read three ways. Pulses switch the axis on; a constant agonist
        flares then desensitizes it off; an antagonist blocks it off immediately. Frequency,
        not amount, is the signal.
      </figcaption>
    </figure>
  );
}
