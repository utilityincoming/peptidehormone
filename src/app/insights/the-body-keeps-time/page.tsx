import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-body-keeps-time")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Pulsatile Hormones: Why Timing, Not Amount, Is the Signal Across the Endocrine System — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Body Keeps Time: Pulsatility as a Code Across GnRH, GH, PTH, Cortisol and Insulin · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  knobil: "https://pubmed.ncbi.nlm.nih.gov/100883/", // Belchetz & Knobil 1978, Science — pulsatile vs continuous GnRH in monkeys
  insulin: "https://pubmed.ncbi.nlm.nih.gov/22688333/", // Matveyenko et al. 2012, Diabetes — pulsatile portal insulin and hepatic action
  hpa: "https://pubmed.ncbi.nlm.nih.gov/32060528/", // Lightman, Birnie & Conway-Campbell 2020, Endocr Rev — HPA ultradian pulsatility
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What does it mean that a hormone is pulsatile?",
    a: "It means the hormone is released not as a steady level but as discrete bursts separated by near-empty troughs, and that the pattern of those bursts — how often they come, how tall they are, whether they ever stop — carries information the body reads. For a large part of the endocrine system, the timing is a signal in its own right, separate from the total amount released. The same molecule can mean opposite things depending on its rhythm.",
  },
  {
    q: "Why does continuous exposure to a hormone often do the opposite of pulses?",
    a: "Because receptors read time through desensitization. A receptor pulsed with gaps recovers between beats and responds to each one; a receptor bathed in a continuous high level downregulates, uncouples from its signaling, and goes quiet. So a steady maximal input is not a stronger 'on' — it erases the pattern the receptor is tuned to, which many systems read as 'off.' That single mechanism explains why a GnRH agonist suppresses the reproductive axis and why continuous PTH dissolves bone that intermittent PTH builds.",
  },
  {
    q: "Which hormones are controlled by their rhythm?",
    a: "Many of the master signals are. GnRH drives the reproductive axis by pulse frequency; growth hormone is released in sharp nightly bursts; parathyroid hormone builds or destroys bone depending on whether exposure is intermittent or continuous; cortisol runs on an ultradian pulse riding a daily rhythm; and insulin is secreted in roughly five-minute bursts into the portal vein. In each, the temporal pattern — not just the concentration — is part of the message.",
  },
  {
    q: "Why would the body encode information in timing rather than amount?",
    a: "Timing is a richer and more robust channel. A frequency resists the drift and noise that blur an absolute level, it lets one hormone address two different outputs (GnRH pulse frequency tunes LH versus FSH), and it is hard to spoof — a receptor that demands a rhythm cannot be fooled by simply flooding it. Encoding in time gives the endocrine system a second, high-information channel on top of 'how much.'",
  },
  {
    q: "How do drugs use hormone pulsatility?",
    a: "Deliberately, in both directions. Pulsatile GnRH pumps restore fertility by supplying the missing beat, while continuous GnRH-agonist depots suppress the same axis by never stopping. Teriparatide builds bone precisely because it is given as a once-daily pulse rather than a steady level. Growth-hormone secretagogues aim to preserve the natural pulse that injected GH flattens. In these systems the drug is often less a molecule than a schedule — and the same axes are diagnosed by deliberately perturbing their clocks.",
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
            <Section title="A system that reads clocks">
              <P>
                Most of physiology speaks in amounts. A gland releases more or less of a
                hormone, a receptor reads the concentration, the response scales. It is
                the obvious way to build a signaling system, and much of the body works
                exactly like that. But a surprising share of the endocrine system — and
                nearly all of its master controls — speaks in a second language the amount
                model misses entirely: <Em>time</Em>. The same molecule, at the same total
                dose, means different and sometimes opposite things depending on its rhythm.
              </P>
              <P>
                This reference has run into that fact four separate times, each in its own
                corner, each framed as a local curiosity. Here it is as one principle. Read
                the clock and a whole cluster of endocrine paradoxes resolves at once: why a
                stimulant can suppress, why the same hormone builds a tissue or dissolves it,
                why injecting a hormone can be worse than coaxing the gland to make its own.
                The body keeps time, and timing is a signal. Bullish on the science; this
                is biology over benefits at its clearest.
              </P>
            </Section>

            <Section title="Why a receptor can read time">
              <P>
                For timing to carry meaning, something downstream has to be able to tell a
                pulse from a plateau. That something is receptor <Em>desensitization</Em>,
                and it is the shared machinery under every case that follows. A receptor
                pulsed with gaps recovers between beats and answers each one cleanly. The
                same receptor bathed in a continuous, high level downregulates — it uncouples
                from its signaling and falls silent. So a steady maximal input is not a
                louder &ldquo;on.&rdquo; It is the <Em>erasure</Em> of the pattern the
                receptor is tuned to, which many systems read as &ldquo;off.&rdquo;
              </P>
              <P>
                That one mechanism is why &ldquo;how often&rdquo; and &ldquo;pulse versus
                plateau&rdquo; become real inputs, not just &ldquo;how much.&rdquo; Give the
                receptor a rhythm and it responds; take the gaps away and it stops listening.
                Everything else in this piece is that principle playing out in a different
                gland.
              </P>
              <TimeReader />
            </Section>

            <Section title="The clocks">
              <P>
                Start where the rule was proved. In the{" "}
                <Link href="/insights/the-pulse-is-the-message" className={LINK}>
                  reproductive axis
                </Link>
                , Ernst Knobil&rsquo;s monkeys showed it cleanly: GnRH delivered in hourly
                pulses switched the axis on, while the <Em>same</Em> GnRH infused
                continuously switched it off (
                <a href={REF.knobil} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Belchetz &amp; Knobil, Science, 1978
                </a>
                ). Frequency even splits the output: faster pulses favor LH, slower ones FSH,
                so one hormone addresses two downstream signals by rhythm alone.
              </P>
              <P>
                The pattern repeats across the body.{" "}
                <Link href="/insights/two-ways-to-ask-for-growth" className={LINK}>
                  Growth hormone
                </Link>{" "}
                is released in sharp nightly bursts over near-zero troughs, and it is the
                burst pattern, not the average level, the tissues read — which is why
                injected GH, a flat plateau, is a worse signal than a secretagogue that lets
                the gland fire its own pulse.{" "}
                <Link href="/insights/teriparatide-backwards" className={LINK}>
                  Parathyroid hormone
                </Link>{" "}
                is starker still: a brief daily spike builds bone while a continuously high
                level dissolves it — same receptor, opposite outcome, decided purely by
                duration. Even{" "}
                <Link href="/insights/the-chain-of-command" className={LINK}>cortisol</Link>,
                famous for its daily rhythm, actually runs on faster <Em>ultradian</Em>
                pulses riding that slower cycle, and only the pulse peaks reach its
                low-affinity receptor — so flattening the pulses, not just the day-night
                swing, changes the signal (
                <a href={REF.hpa} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lightman et&nbsp;al., Endocr&nbsp;Rev, 2020
                </a>
                ).
              </P>
              <P>
                The pancreas keeps time too. Insulin is not dribbled out steadily; it is
                secreted in discrete bursts, roughly every five minutes, into the portal vein,
                and that pulsatile pattern turns out to matter for how effectively the liver
                responds — a pattern that degrades in type 2 diabetes (
                <a href={REF.insulin} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Matveyenko et&nbsp;al., Diabetes, 2012
                </a>
                ). Reproduction, growth, bone, stress, metabolism: five different glands, one
                shared trick.
              </P>
            </Section>

            <Section title="Why evolution encodes in time">
              <P>
                Why build it this way, when amount is simpler? Because a temporal code is the
                richer and sturdier channel. An absolute concentration drifts — it is blurred
                by how fast the hormone is cleared, how much binding protein is around, how
                well the assay of the moment reads it. A <Em>frequency</Em> is far harder to
                corrupt; the beat survives noise that would wash out a level. Timing also
                multiplies the message: one hormone can carry two instructions on one line,
                as GnRH does when its pulse rate dials LH against FSH. And it is hard to
                spoof — a receptor that demands a rhythm cannot be fooled by simply flooding
                it, which is a feature when the signal governs something as consequential as
                fertility or calcium.
              </P>
              <P>
                So the endocrine system runs two channels at once: <Em>how much</Em>, the
                obvious one, and <Em>in what pattern</Em>, the one the spec sheets omit. The
                second channel is where a surprising amount of the real control lives, and it
                is invisible to any account that measures only a single blood level at a
                single moment.
              </P>
            </Section>

            <Section title="The drugs that write to the clock">
              <P>
                The practical payoff is that modern endocrinology has learned to <Em>write</Em>
                to the clock, deliberately and in both directions. The reproductive axis is
                the showcase: a pulsatile GnRH pump restores fertility by supplying the beat
                the hypothalamus is missing, while a continuous GnRH-agonist depot like
                leuprolide suppresses the very same axis by never stopping — two drugs, one
                receptor, opposite outcomes, separated only by schedule. Bone tells the same
                story: teriparatide builds it precisely because it is given as a once-daily
                spike, not a steady level. And growth-hormone secretagogues are an attempt to
                keep the natural pulse that injected GH erases.
              </P>
              <P>
                The diagnostic mirror is just as direct. Because these axes read timing, you
                test them by perturbing their clocks — a dexamethasone pulse to probe the
                stress feedback, a stimulation test to push a single tier. In a system that
                encodes in time, the schedule is simultaneously the disease mechanism, the
                drug, and the test. That is the thread that runs through every pulsatile axis
                on this site, and it is worth carrying back to each of them: when a hormone
                behaves paradoxically, ask first what its rhythm is doing.
              </P>
              <Callout label="The unifying rule">
                Where a hormone is pulsatile, read the pattern before the level. Pulses with
                gaps keep a receptor responsive; a continuous plateau desensitizes it. &ldquo;More
                signal&rdquo; and &ldquo;constant signal&rdquo; are not the same thing — and in
                these systems the second one often means the opposite of what the first intends.
              </Callout>
            </Section>

            <Section title="Reading the clock">
              <P>
                The endocrine system is usually taught as a set of levels — this hormone high,
                that one low. That picture is real but incomplete. Laid over it is a layer of
                rhythm, and for the master controls the rhythm is not decoration; it is the
                message. Once you see it, the paradoxes stop being paradoxes: the stimulant
                that suppresses, the hormone that both builds and destroys, the injection that
                underperforms the gland&rsquo;s own output. All of them are what happens when a
                clock is read as a level, or a level is mistaken for a clock. The body keeps
                time, and so, increasingly, do the drugs that work with it.
              </P>
              <Bullets
                items={[
                  ["Timing is a second signaling channel", "Across the endocrine master controls, the pattern of release — frequency, pulse vs plateau, phase — carries information separate from the total amount."],
                  ["Receptor desensitization makes a clock a code", "Pulsed with gaps, a receptor recovers and answers each beat; held at a continuous high level, it downregulates and goes silent. That is why continuous exposure often inverts the effect."],
                  ["The same trick runs across five glands", "GnRH (frequency), growth hormone (nightly bursts), PTH (intermittent vs continuous), cortisol (ultradian pulses), insulin (~5-min portal bursts) — all encode in time."],
                  ["Evolution uses timing because it's robust", "A frequency resists noise an absolute level can't, lets one hormone address two outputs, and can't be spoofed by flooding — a high-information channel on top of 'how much.'"],
                  ["The drug is often the schedule", "Pulsatile GnRH restores fertility; continuous GnRH-agonist suppresses; teriparatide's daily spike builds bone; secretagogues preserve the GH pulse. Write to the rhythm, or jam it."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/the-pulse-is-the-message" label="The pulse is the message — GnRH and the reproductive axis" />
                <CrossLink href="/insights/teriparatide-backwards" label="Teriparatide, backwards — intermittent vs continuous PTH" />
                <CrossLink href="/insights/two-ways-to-ask-for-growth" label="Two ways to ask for growth — preserving the GH pulse" />
                <CrossLink href="/insights/the-chain-of-command" label="The chain of command — the cortisol axis and its tests" />
                <CrossLink href="/hormones/gnrh" label="GnRH reference (the frequency signal)" />
                <CrossLink href="/hormones/insulin" label="Insulin reference (the ~5-minute pulse)" />
                <CrossLink href="/research?q=Why%20does%20the%20endocrine%20system%20encode%20information%20in%20the%20timing%20of%20hormone%20release%20%28pulsatility%29%20rather%20than%20concentration%2C%20and%20how%20does%20receptor%20desensitization%20make%20it%20work%3F" label="Ask the research agent about pulsatility" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing guidance, or a
              recommendation to use any compound. Specific hormones and drugs are named to
              explain the science; verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Why a receptor reads time: pulses recover and respond; a plateau desensitizes ── */
function TimeReader() {
  const W = 700;
  const H = 300;
  const PL = 150;
  const PR = 600;

  const toPts = (pts: [number, number][]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  // Row baselines: in = input line, out = response line
  const R = [
    { in: 92, out: 150 }, // pulsatile
    { in: 212, out: 270 }, // continuous
  ];

  // Row 0 — pulsatile input: spikes; response tracks each beat (gaussian bumps)
  const spikes = Array.from({ length: 6 }, (_, k) => PL + 26 + (k * (PR - PL - 52)) / 5);
  const out0: [number, number][] = [];
  for (let x = PL; x <= PR; x += 5) {
    let bump = 0;
    for (const s of spikes) { const d = (x - s) / 12; bump = Math.max(bump, Math.exp(-d * d)); }
    out0.push([x, R[0].out - 20 * bump]);
  }
  // Row 1 — continuous input: plateau; response rises then desensitizes to near-silent
  const out1: [number, number][] = [];
  const peakX = PL + 48;
  for (let x = PL; x <= PR; x += 5) {
    let y: number;
    if (x <= peakX) { const t = (x - PL) / (peakX - PL); y = R[1].out - 22 * t; }
    else { const t = (x - peakX) / 60; y = R[1].out - 3 - 19 * Math.exp(-t * t); }
    out1.push([x, y]);
  }

  const Spikes = ({ y }: { y: number }) => (
    <g stroke="var(--accent-rose)" strokeOpacity={0.85} strokeWidth={2} strokeLinecap="round">
      {spikes.map((x, i) => <line key={i} x1={x} y1={y} x2={x} y2={y - 20} />)}
    </g>
  );

  const Verdict = ({ cy, label, on }: { cy: number; label: string; on: boolean }) => (
    <g>
      <rect x={616} y={cy - 11} width={74} height={22} rx={11}
        fill={on ? "color-mix(in srgb, var(--accent-rose) 18%, transparent)" : "color-mix(in srgb, var(--color-ink) 8%, transparent)"}
        stroke={on ? "var(--accent-rose)" : "var(--color-ink)"} strokeOpacity={on ? 0.7 : 0.3} strokeWidth={1.1} />
      <text x={653} y={cy + 4} textAnchor="middle" fill={on ? "var(--accent-rose)" : "var(--color-ink)"} fillOpacity={on ? 1 : 0.6} fontSize="10" fontWeight="700">{label}</text>
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
        aria-label="Two rows showing how one receptor reads timing. In the top row, a pulsatile input arrives as spaced spikes and the response line answers each beat with a matching bump — the receptor stays responsive, ON. In the bottom row, a continuous input is a flat plateau; the response rises briefly then decays to near-silent as the receptor desensitizes — OFF. Same molecule, same total amount, opposite outcome decided by pattern."
      >
        <text x={(PL + PR) / 2} y={22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          One receptor, two patterns, opposite response
        </text>
        <text x={(PL + PR) / 2} y={40} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10.5">
          upper line = hormone input · lower line = receptor response
        </text>

        {R.map((r, i) => <line key={i} x1={PL} y1={r.out} x2={PR} y2={r.out} stroke="var(--color-ink)" strokeOpacity={0.08} strokeWidth={1} />)}

        {/* Row 0 — pulsatile */}
        <Label cy={132} name="Pulses, with gaps" sub="receptor recovers between beats" />
        <Spikes y={R[0].in} />
        <polyline points={toPts(out0)} fill="none" stroke="var(--accent-rose)" strokeOpacity={0.9} strokeWidth={1.9} />
        <Verdict cy={R[0].out} label="ON" on />

        {/* Row 1 — continuous */}
        <Label cy={252} name="Continuous plateau" sub="receptor desensitizes" />
        <rect x={PL} y={R[1].in - 15} width={PR - PL} height={15} rx={4} fill="color-mix(in srgb, var(--accent-rose) 14%, transparent)" stroke="var(--accent-rose)" strokeOpacity={0.45} strokeWidth={1} />
        <polyline points={toPts(out1)} fill="none" stroke="var(--color-ink)" strokeOpacity={0.6} strokeWidth={1.9} />
        <Verdict cy={R[1].out} label="OFF" on={false} />

        <line x1={PL} y1={288} x2={PR} y2={288} stroke="var(--color-ink)" strokeOpacity={0.15} strokeWidth={1} />
        <text x={PR} y={300} textAnchor="end" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10">time →</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The gaps are the signal. Spaced pulses let the receptor recover and answer each beat; a
        continuous level erases the pattern and the receptor goes quiet — the shared mechanism
        under every pulsatile axis.
      </figcaption>
    </figure>
  );
}
