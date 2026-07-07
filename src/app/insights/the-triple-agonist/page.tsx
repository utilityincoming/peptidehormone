import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, CrossLink } from "@/components/insight";
import { getInsight } from "@/lib/insights";

const insight = getInsight("the-triple-agonist")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

export default function Article() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
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
            <Section title="From one signal to a chord">
              <P>
                The first metabolic peptides played a single note. A{" "}
                <Link href="/hormones/semaglutide" className={LINK}>GLP-1</Link> agonist
                activates one receptor — the{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> receptor — and
                works through the cascade behind{" "}
                <Link href="/insights/glp-1-signaling" className={LINK}>a single hormone&rsquo;s biology</Link>.
                Then came the two-note version:{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link>{" "}
                engages both the GLP-1 and{" "}
                <Link href="/hormones/gip" className={LINK}>GIP</Link> receptors from one
                molecule. The newest step adds a third:{" "}
                <Link href="/hormones/retatrutide" className={LINK}>retatrutide</Link>, an
                investigational peptide that activates GLP-1, GIP, and — the surprising
                one — the{" "}
                <Link href="/hormones/glucagon" className={LINK}>glucagon</Link> receptor,
                all at once.
              </P>
              <AgonismMatrix />
              <P>
                The organizing idea is <Em>combination as physiology</Em>. Rather than
                push one pathway harder, these molecules recruit several arms of the
                metabolic system so their effects add up — a chord instead of a louder
                single note.
              </P>
            </Section>

            <Section title="The glucagon paradox">
              <P>
                Glucagon is the hormone that <Em>raises</Em> blood sugar. It is
                insulin&rsquo;s counterweight — released in fasting to pull glucose out
                of the liver. So putting a glucagon-receptor agonist into a drug meant to
                improve metabolic health looks, at first glance, exactly backwards.
              </P>
              <P>
                The resolution is that glucagon does more than one thing. Alongside its
                effect on blood sugar, glucagon-receptor activation increases{" "}
                <Em>energy expenditure</Em> — the body burns more fuel. On its own, that
                comes packaged with the unwanted glucose-raising effect. But paired with
                two incretins that drive glucose-dependent insulin release and appetite
                reduction, the glucose-raising arm is held in check while the
                energy-expenditure arm is recruited. The incretins cover glucagon&rsquo;s
                downside; glucagon adds a lever the incretins don&rsquo;t have.
              </P>
              <Callout label="The real insight">
                A hormone&rsquo;s effect isn&rsquo;t fixed — it depends on the company it
                keeps. Glucagon in isolation raises blood sugar; glucagon alongside GLP-1
                and GIP becomes a fat-burning ally whose liability is neutralized by its
                partners. The meaning of a signal is set by the whole chord, not the note.
              </Callout>
            </Section>

            <Section title="Why more receptors isn't automatically better">
              <P>
                Adding receptors is not simply stacking benefits. Each pathway carries its
                own effects and its own liabilities, and the three receptors have to be
                engaged in the right <Em>proportion</Em>. A tri-agonist is tuned so that
                its potency at GLP-1, GIP, and glucagon sits in a deliberate ratio — enough
                glucagon signal to raise energy expenditure, enough incretin signal to keep
                glucose in line. Get the balance wrong and the glucose-raising arm wins.
                The engineering challenge isn&rsquo;t hitting three targets; it&rsquo;s
                <Em> balancing</Em> them.
              </P>
            </Section>

            <Section title="The body has to catch up">
              <P>
                Amplifying incretin signaling all at once is a large physiological change,
                and the body does not absorb it instantly. The same slowed-stomach-emptying
                mechanism that helps these molecules work is, early on, felt as nausea; the
                gut and its receptors need time to acclimate before the effect settles.
              </P>
              <P>
                That is why these peptides are introduced gradually rather than at full
                strength — not an arbitrary rule but a reflection of real{" "}
                <Em>receptor adaptation</Em>. Signaling systems down-regulate and
                recalibrate when flooded; easing the system in lets that adaptation happen
                without overwhelming it. The ramp-up is biology, not bureaucracy.
              </P>
            </Section>

            <Section title="What the evidence shows so far">
              <P>
                Retatrutide is <Em>investigational</Em> — under study, not approved. In a
                mid-stage (phase 2) trial, the reductions in body weight were among the
                largest reported for this class, reaching roughly a quarter of body weight
                by 48 weeks in the most-exposed group. A large phase 3 program (TRIUMPH),
                enrolling thousands of participants over a longer horizon, is running now,
                with results anticipated around 2026.
              </P>
              <P>
                Until those read out, the honest label is <Em>promising but unproven at
                scale</Em> — which is exactly why its entry in the{" "}
                <Link href="/hormones/retatrutide" className={LINK}>catalog</Link> carries
                an <Em>Investigational</Em> badge rather than an established one.
              </P>
            </Section>

            <Section title="The bigger shift">
              <P>
                Step back and the trajectory is clear. Peptide medicine began by{" "}
                <Em>replacing</Em> a missing hormone, moved to{" "}
                <Em>re-engineering</Em> a single signal for durability, and has now
                arrived at <Em>composing</Em> several signals into one molecule. The
                frontier is no longer a stronger agonist — it&rsquo;s the right
                combination, in the right ratio, of the hormones the body already uses.
                The instrument didn&rsquo;t get louder. It learned to play chords.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/retatrutide" label="Retatrutide — the triple agonist" />
                <CrossLink href="/hormones/glucagon" label="Glucagon — the counter-regulatory hormone" />
                <CrossLink href="/insights/glp-1-signaling" label="How GLP-1 actually works" />
                <CrossLink href="/families/incretins-metabolic" label="The incretins & metabolic family" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence,
              summarized and simplified from the public record. Not medical advice.
              Compounds are named to explain the science; retatrutide is investigational
              and not an approved treatment.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── One / two / three receptors ── */
function AgonismMatrix() {
  const receptors = [
    { name: "GLP-1", color: "var(--accent)" },
    { name: "GIP", color: "var(--accent-blue)" },
    { name: "Glucagon", color: "var(--accent-amber)" },
  ];
  const rows: { drug: string; active: boolean[] }[] = [
    { drug: "Semaglutide", active: [true, false, false] },
    { drug: "Tirzepatide", active: [true, true, false] },
    { drug: "Retatrutide", active: [true, true, true] },
  ];
  const W = 560, colX = [300, 400, 500], headerY = 34, rowY = [90, 140, 190];

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} 220`} className="w-full" role="img" aria-label="Receptor activation of single, dual, and triple agonists">
        {/* receptor headers */}
        {receptors.map((r, c) => (
          <text key={r.name} x={colX[c]} y={headerY} textAnchor="middle" fill={r.color} fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
            {r.name}
          </text>
        ))}
        <text x={24} y={headerY} fill="var(--color-ink)" fillOpacity="0.4" fontSize="12" fontFamily="var(--font-geist-mono), monospace" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Receptor →
        </text>
        {rows.map((row, ri) => (
          <g key={row.drug}>
            {ri > 0 && <line x1={24} y1={rowY[ri] - 25} x2={W - 24} y2={rowY[ri] - 25} stroke="var(--color-ink)" strokeOpacity="0.06" />}
            <text x={24} y={rowY[ri] + 5} fill="var(--color-ink)" fillOpacity="0.85" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              {row.drug}
            </text>
            {receptors.map((r, c) => (
              <g key={c}>
                {row.active[c] ? (
                  <circle cx={colX[c]} cy={rowY[ri]} r="11" fill={r.color} />
                ) : (
                  <circle cx={colX[c]} cy={rowY[ri]} r="10" fill="none" stroke="var(--color-ink)" strokeOpacity="0.15" strokeWidth="1.5" />
                )}
              </g>
            ))}
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Single, dual, and triple: the same drug class, one receptor at a time.
      </figcaption>
    </figure>
  );
}
