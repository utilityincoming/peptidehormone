import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-peptide-exercise-writes")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  lee2015: "https://pubmed.ncbi.nlm.nih.gov/25738459/",
  kim2018: "https://pubmed.ncbi.nlm.nih.gov/29983246/",
  reynolds2021: "https://www.nature.com/articles/s41467-020-20790-0",
  mmpower3: "https://pubmed.ncbi.nlm.nih.gov/37268435/",
  wada: "https://www.wada-ama.org/en/prohibited-list",
} as const;

// FAQ — surfaced as FAQPage JSON-LD and mirrored in the visible Q&A block.
const FAQS = [
  {
    q: "Is MOTS-c a pre-workout you take before training?",
    a: "No. MOTS-c is an exercise-induced peptide — hard training raises the body's own MOTS-c, rather than MOTS-c being something the muscle needs supplied before it can work. In the Reynolds 2021 study, endogenous MOTS-c in human skeletal muscle rose roughly 12-fold after a bout of exercise. The stimulus comes first and the peptide follows, which is why framing it as a pre-workout misreads the biology.",
  },
  {
    q: "When is the optimal time to take MOTS-c around training?",
    a: "There is no established human timing protocol. MOTS-c is preclinical for performance use, has no published human dose-response, and — because it works downstream of the same AMPK/energy-stress signal that exercise itself triggers — the training and lifestyle that generate that signal are the real variable, not the clock time of an injection. This article explains the mechanism; it is not dosing guidance.",
  },
  {
    q: "How is SS-31 different from MOTS-c?",
    a: "They only share a neighbourhood — the mitochondrion. MOTS-c is a signal encoded in mitochondrial DNA that changes gene expression via AMPK. SS-31 (elamipretide) is a synthetic molecule that physically concentrates in the inner mitochondrial membrane and binds cardiolipin to preserve cristae structure and reduce reactive-oxygen damage. One is a message; the other is structural maintenance. SS-31's evidence base is clinical and disease-focused, not exercise-timing.",
  },
  {
    q: "Is MOTS-c allowed in competitive sport?",
    a: "No. MOTS-c is on the WADA Prohibited List, prohibited at all times, in the metabolic-modulator class — an explicit acknowledgment that an AMPK-activating 'exercise mimetic' is a performance shortcut. Athletes subject to anti-doping testing cannot use it.",
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
              <Link href="/families/mitochondrial" className="text-accent-blue hover:text-ink">
                Mitochondrial-derived peptides
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
            <Section title="The peptide is the receipt, not the order">
              <P>
                Search for MOTS-c and you will find it sold as a pre-workout — a vial
                you inject to unlock an exercise you have not done yet. That framing has
                the arrow pointing the wrong way. In the human data,{" "}
                <Link href="/hormones/mots-c" className={LINK}>MOTS-c</Link> is something
                the working muscle <Em>writes</Em>, not something it waits to receive.
                When researchers biopsied skeletal muscle before and after a hard bout of
                exercise, endogenous MOTS-c rose nearly{" "}
                <Em>twelve-fold</Em> and stayed elevated hours into recovery (
                <a href={REF.reynolds2021} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Reynolds et&nbsp;al., 2021, Nat&nbsp;Commun
                </a>
                ). Circulating levels climbed during the session and drifted back to
                baseline within about four hours.
              </P>
              <P>
                That single fact reorganizes the entire &ldquo;optimal timing&rdquo;
                question. MOTS-c is not the pre-workout; it is closer to the{" "}
                <Em>receipt</Em> the cell prints once the work is done. The stimulus is
                the order. If you want more of the peptide, the lever the biology actually
                responds to is the training and the metabolic state around it — not the
                clock time of a syringe.
              </P>
              <Callout label="The reframe">
                Most timing advice treats a peptide as an input you schedule before the
                event. MOTS-c is an <Em>output</Em> of the event. Get the reframe right
                and the practical questions change from &ldquo;when do I dose&rdquo; to
                &ldquo;what kind of training and recovery writes the most of it.&rdquo;
              </Callout>
            </Section>

            <Section title="What MOTS-c actually is">
              <P>
                MOTS-c is a 16-amino-acid peptide with an unusual return address: it is
                encoded not in the nuclear genome but inside a short open reading frame of
                the mitochondrial <Em>12S rRNA</Em> gene — a message written by the
                cell&rsquo;s own power plants (
                <a href={REF.lee2015} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lee et&nbsp;al., 2015, Cell&nbsp;Metab
                </a>
                ). It belongs to a young class, the{" "}
                <Link href="/families/mitochondrial" className={LINK}>
                  mitochondrial-derived peptides
                </Link>
                , whose founding member was{" "}
                <Link href="/hormones/humanin" className={LINK}>humanin</Link>.
              </P>
              <P>
                Its mechanism is the reason exercise and MOTS-c rhyme. MOTS-c acts on the
                folate&ndash;methionine one-carbon cycle, which backs up the intermediate{" "}
                <Em>AICAR</Em> — a direct activator of{" "}
                <Em>AMPK</Em>, the cell&rsquo;s low-energy sensor. AMPK is the same master
                switch a hard workout throws: when fuel runs short, AMPK flips the cell
                from storing to burning, and pushes mitochondrial biogenesis. Under
                metabolic stress, MOTS-c does something stranger still — it{" "}
                <Em>translocates into the nucleus</Em>, in an AMPK-dependent way, and binds
                stress-response transcription factors like NRF2 to switch on
                antioxidant and metabolic genes (
                <a href={REF.kim2018} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kim et&nbsp;al., 2018, Cell&nbsp;Metab
                </a>
                ). A peptide from the mitochondrial genome, reaching into the nuclear one,
                to help the cell adapt to exactly the kind of energy crunch that training
                imposes.
              </P>
              <SignalFlow />
              <P>
                So the &ldquo;exercise-mimetic&rdquo; label is earned honestly: MOTS-c sits
                on the AMPK adaptation pathway that exercise recruits. But note the
                dependency in that diagram — the peptide is a <Em>relay</Em> in a signal
                the energy stress starts. That is what makes it induced by training rather
                than a substitute for it.
              </P>
            </Section>

            <Section title="Why lifestyle is the real dose">
              <P>
                If MOTS-c is downstream of AMPK and energy stress, then the interventions
                that reliably raise it are the ones that create energy stress — and those
                are lifestyle, not pharmacology. This is the part the vendor framing skips,
                and it is the part with the strongest evidence behind it.
              </P>
              <Bullets
                items={[
                  ["Train in a way that actually stresses fuel", "The MOTS-c spike in the human data followed a genuine exercise bout, not a stroll. Endurance work and high-intensity intervals both drain cellular energy charge and drive AMPK — the upstream trigger. Intensity and duration that meaningfully deplete the cell are the stimulus; token movement is not."],
                  ["Let the recovery window do its job", "MOTS-c stayed elevated in muscle hours after the session and only then returned to baseline. The adaptation is written during and just after training, which is a reminder that the recovery period is part of the dose, not dead time — sleep and rest are when the gene program the peptide helped switch on gets executed."],
                  ["Respect the energy-availability context", "MOTS-c improved insulin sensitivity and blunted diet-induced obesity in mice precisely in the setting of metabolic stress. A body chronically over-fed and under-moved gives AMPK little reason to fire. Periods of genuine energy demand — training, and not eating around the clock — are the physiological context this peptide evolved to answer."],
                  ["Don't out-supplement the signal", "Because MOTS-c works through AMPK, it lives in the same lane as metformin and AICAR. The lesson from that lane is that the signal is context-dependent: it does the most where there is real metabolic stress to correct, and comparatively little on top of an already well-trained, energy-flexible physiology."],
                ]}
              />
              <Callout label="The honest version of 'timing'">
                The best-supported way to raise MOTS-c on a schedule is to schedule the
                training and the recovery. The peptide tracks the stimulus; build the
                stimulus and the endogenous signal follows on its own clock.
              </Callout>
            </Section>

            <Section title="Where an injected protocol would even fit">
              <P>
                Suppose you set the endogenous story aside and ask the vendor&rsquo;s
                question directly: if someone injects MOTS-c, when around training would it
                make mechanistic sense? The honest answer starts with a caveat that
                swallows most of it — there is <Em>no published human dose-response for
                native MOTS-c</Em>, the performance evidence is preclinical, and the
                circulating peptide is cleared quickly. Any timing scheme is therefore
                reasoning from mechanism, not from human trials, and this reference does
                not give dosing guidance.
              </P>
              <P>
                On mechanism alone, two logics pull in opposite directions, which is itself
                the point. One says pair exogenous MOTS-c <Em>with</Em> the training window,
                to stack an AMPK activator on top of the AMPK stress the workout already
                creates. The other says that stacking a mimetic on the real thing may blunt
                the adaptation you train for — the same worry raised about taking
                antioxidants around exercise, where damping the stress signal damps the
                response to it. The field has not resolved which logic wins in humans,
                and that unresolved tension is the current honest state of the art.
              </P>
              <Callout label="And then sport settled part of it">
                Whatever the physiology, the governance is already decided. MOTS-c is on
                the{" "}
                <a href={REF.wada} target="_blank" rel="noopener noreferrer" className={LINK}>
                  WADA Prohibited List
                </a>
                , prohibited at all times, in the metabolic-modulator class. Anti-doping
                authorities classified an AMPK-activating &ldquo;exercise mimetic&rdquo; as
                exactly that — a shortcut around training — and banned it for tested
                athletes. That regulatory judgment is itself information about how the
                peptide is understood.
              </Callout>
            </Section>

            <Section title="The other mitochondrial peptides play a different game">
              <P>
                MOTS-c is often lumped with two other peptides that share the mitochondrial
                address — the mitochondria-targeting drug{" "}
                <Link href="/hormones/ss-31" className={LINK}>SS-31 (elamipretide)</Link>{" "}
                and the mitochondrial-encoded{" "}
                <Link href="/hormones/humanin" className={LINK}>humanin</Link>. The lumping
                obscures more than it reveals: they answer completely different questions,
                and only one of them is about the training-timing story at all.
              </P>
              <MitoTable />
              <P>
                SS-31 is the clearest contrast. It is not a signal and it does not touch
                AMPK. It is a small synthetic molecule that <Em>physically concentrates</Em>
                {" "}in the inner mitochondrial membrane and binds{" "}
                <Em>cardiolipin</Em> — the signature lipid that shapes the cristae where the
                electron-transport chain lives — helping preserve that architecture and
                cutting reactive-oxygen leakage. It is structural maintenance, not a message.
                And its evidence lives in a different world: real clinical trials in
                mitochondrial disease, including the{" "}
                <a href={REF.mmpower3} target="_blank" rel="noopener noreferrer" className={LINK}>
                  MMPOWER-3 primary-mitochondrial-myopathy trial
                </a>
                , and a first regulatory approval — as elamipretide, for Barth syndrome. If
                MOTS-c is the receipt the working muscle prints, SS-31 is closer to a
                repair crew for power plants that are failing for reasons that have nothing
                to do with your last workout.
              </P>
              <P>
                Humanin is different again — the family&rsquo;s cytoprotectant, studied for
                keeping stressed cells alive rather than for tuning metabolism or
                performance. Three peptides, one organelle, three unrelated jobs. Only
                MOTS-c is meaningfully part of a conversation about training.
              </P>
            </Section>

            <Section title="The frontier from here">
              <P>
                The interesting future for MOTS-c is not a better injection schedule; it is
                finishing the human science the mouse work opened. A phase-2 trial of
                subcutaneous MOTS-c in prediabetes and obesity is the kind of readout that
                would turn a compelling exercise-induction story into an actual clinical
                one. Until it reports, the strongest evidence-backed claim remains the
                humble one: the training does the work, and the peptide is the body&rsquo;s
                own record that it happened.
              </P>
              <P>
                That is the whole premise of this site in miniature. A genuinely elegant
                mechanism — a peptide the mitochondrial genome writes to help the cell
                survive an energy crisis — is more interesting, and more honest, than the
                shortcut it gets marketed as. Understand the arrow, and the timing question
                answers itself: build the stimulus, and let the cell keep its own receipts.
              </P>
            </Section>

            {/* FAQ */}
            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">
                Common questions
              </h2>
              <dl className="mt-6 space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/40 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/mots-c" label="MOTS-c reference (the peptide itself)" />
                <CrossLink href="/hormones/ss-31" label="SS-31 / elamipretide — the cardiolipin protector" />
                <CrossLink href="/hormones/humanin" label="Humanin — the family's cytoprotectant" />
                <CrossLink href="/families/mitochondrial" label="The mitochondrial-derived peptide family" />
                <CrossLink href="/insights/the-other-pedal" label="The IGF-1 accelerator on muscle" />
                <CrossLink href="/research?q=What%20does%20the%20human%20evidence%20show%20for%20MOTS-c%20as%20an%20exercise%20mimetic%2C%20and%20how%20does%20its%20timing%20around%20training%20work%3F" label="Ask the research agent what the human data shows" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing guidance, or
              a recommendation to use any compound. MOTS-c performance claims are largely
              preclinical, and the peptide is prohibited in tested sport; specific
              compounds and trials are named to explain the science — verify any claim
              against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Signal flow: energy stress → AMPK → MOTS-c relay → adaptive gene program ── */
function SignalFlow() {
  const nodes: { label: string; sub: string; color: string; highlight?: boolean }[] = [
    { label: "Training · energy stress", sub: "fuel drops, AMP/ADP rise", color: "var(--accent-teal)" },
    { label: "AMPK activated", sub: "the low-energy master switch", color: "var(--accent-blue)" },
    { label: "MOTS-c written · nuclear entry", sub: "the mitochondrial peptide relays the signal", color: "var(--accent-blue)", highlight: true },
    { label: "NRF2 / ARE gene program", sub: "antioxidant + metabolic adaptation", color: "var(--accent-purple)" },
  ];
  const W = 520, nodeH = 62, gap = 30, x = 60, w = 400;
  const H = nodes.length * nodeH + (nodes.length - 1) * gap + 20;
  const yAt = (i: number) => 10 + i * (nodeH + gap);

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img" aria-label="Signal flow: training and energy stress activate AMPK, which drives MOTS-c expression and its AMPK-dependent entry into the nucleus, switching on an NRF2 and antioxidant-response-element adaptive gene program. The peptide is a relay downstream of the exercise stimulus.">
        {nodes.slice(0, -1).map((_, i) => {
          const y1 = yAt(i) + nodeH;
          const y2 = yAt(i + 1);
          return (
            <g key={i}>
              <line x1={W / 2} y1={y1} x2={W / 2} y2={y2 - 8} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
              <path d={`M ${W / 2 - 5} ${y2 - 9} L ${W / 2} ${y2 - 1} L ${W / 2 + 5} ${y2 - 9}`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <rect
              x={x}
              y={yAt(i)}
              width={w}
              height={nodeH}
              rx={14}
              fill={n.highlight ? "color-mix(in srgb, var(--accent-blue) 12%, transparent)" : "var(--panel)"}
              stroke={n.color}
              strokeOpacity={n.highlight ? 0.7 : 0.35}
              strokeWidth={n.highlight ? 2 : 1}
            />
            <text x={W / 2} y={yAt(i) + 26} textAnchor="middle" fill="var(--color-ink)" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              {n.label}
            </text>
            <text x={W / 2} y={yAt(i) + 46} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="12">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The stimulus is at the top. MOTS-c is a relay in the middle — which is why it is
        induced by training, not a substitute for the input that starts the chain.
      </figcaption>
    </figure>
  );
}

/* ── Three peptides, one organelle, three unrelated jobs ── */
function MitoTable() {
  const rows: { name: string; origin: string; target: string; job: string; timing: string }[] = [
    {
      name: "MOTS-c",
      origin: "Encoded in mitochondrial DNA (12S rRNA)",
      target: "AMPK / nuclear gene expression",
      job: "Metabolic signal; exercise-induced adaptation",
      timing: "The one that's about training",
    },
    {
      name: "SS-31 (elamipretide)",
      origin: "Synthetic Szeto-Schiller tetrapeptide",
      target: "Cardiolipin, inner mitochondrial membrane",
      job: "Preserves cristae structure, cuts ROS leak",
      timing: "Disease repair — not exercise timing",
    },
    {
      name: "Humanin",
      origin: "Encoded in mitochondrial DNA (16S rRNA)",
      target: "Proposed cytoprotective receptors",
      job: "Keeps stressed cells alive (anti-apoptotic)",
      timing: "Cell survival — not performance",
    },
  ];

  return (
    <figure className="my-2 overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          Comparison of three mitochondria-associated peptides — MOTS-c, SS-31/elamipretide, and humanin — by origin, molecular target, function, and relevance to exercise timing
        </caption>
        <thead className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
          <tr className="border-b border-ink/10">
            <th scope="col" className="p-3 font-medium">Peptide</th>
            <th scope="col" className="p-3 font-medium">Origin</th>
            <th scope="col" className="p-3 font-medium">Molecular target</th>
            <th scope="col" className="p-3 font-medium">What it does</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-ink/[0.06] align-top last:border-0">
              <th scope="row" className="p-3 font-normal">
                <span className="block font-semibold text-ink">{r.name}</span>
                <span className="mt-0.5 block text-xs text-accent-blue">{r.timing}</span>
              </th>
              <td className="p-3 text-ink/70">{r.origin}</td>
              <td className="p-3 text-ink/70">{r.target}</td>
              <td className="p-3 text-ink/70">{r.job}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="border-t border-ink/10 p-3 text-center text-xs text-ink/40">
        Same organelle, three different games. Only MOTS-c is a metabolic signal tied to
        exercise; SS-31 is structural maintenance and humanin is cell survival.
      </figcaption>
    </figure>
  );
}
