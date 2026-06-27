import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { getInsight } from "@/lib/insights";

const insight = getInsight("growth-hormone-axis")!;

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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(94,168,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/growth-repair" className="text-accent-blue hover:text-ink">
                Growth &amp; repair
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
            <Section title="Three signals, one rhythm">
              <P>
                Growth hormone is not released in a steady stream. It comes out of
                the pituitary in <Em>pulses</Em> — sharp bursts, largest during
                deep sleep, separated by long quiet troughs. That pattern is not an
                accident of biology; it <Em>is</Em> the signal. Understanding the
                growth-hormone axis means understanding what sets the pulse, what
                silences it between bursts, and why the whole arrangement is built
                around brevity and restraint rather than sustained output.
              </P>
              <P>
                Three short peptides from the hypothalamus and gut set the rhythm,
                and a fourth, longer-lived molecule from the liver reports the
                result back:
              </P>
              <Bullets
                items={[
                  ["GHRH (+)", "Growth-hormone-releasing hormone from the hypothalamus tells pituitary somatotrophs to synthesize and release GH. It is the accelerator."],
                  ["Ghrelin / GHS-R (+)", "Ghrelin from the stomach acts on a separate receptor (GHS-R) to amplify GH pulses — a second, independent push that is synergistic with GHRH."],
                  ["Somatostatin (−)", "Somatostatin is the brake; it suppresses GH release and, by rising and falling out of phase with GHRH, carves the continuous drive into discrete pulses."],
                  ["IGF-1 (the readout)", "GH drives the liver to make IGF-1, which carries out much of GH's growth effect — and feeds back to restrain the axis, closing the loop."],
                ]}
              />
              <AxisDiagram />
            </Section>

            <Section title="Brief by design: the half-life tells the story">
              <P>
                The signaling peptides of this axis share a striking property: they
                are gone almost as soon as they appear. Their brevity is not a bug
                to be engineered away — it is what makes a <Em>pulse</Em> possible.
                A signal that lingered could not switch cleanly on and off.
              </P>
              <DurationLadder />
              <P>
                There is a general rule hiding in those numbers. Small, exposed
                peptides — <Link href="/hormones/somatostatin" className={LINK}>somatostatin</Link>,{" "}
                <Link href="/hormones/ghrh" className={LINK}>GHRH</Link>,{" "}
                <Link href="/hormones/ghrelin" className={LINK}>ghrelin</Link> — are
                cleared by proteases and the kidney within minutes. Larger
                polypeptides and proteins tend to last longer, and the molecules
                that persist for <Em>hours</Em> usually do so for a specific reason:
                they ride a carrier.{" "}
                <Link href="/hormones/igf-1" className={LINK}>IGF-1</Link> circulates
                for many hours not because it is large but because it travels bound
                to IGF-binding proteins that shield it from clearance.
              </P>
              <Callout>
                Size, structure, and carrier-binding are the three levers that buy a
                peptide time. The smaller and more exposed it is, the briefer its
                action; the larger or more protected, the longer it lingers. This is
                the same principle that drug designers exploit deliberately — adding
                a fatty-acid chain to bind albumin, as the long-acting GLP-1 analogs
                do — but in the GH axis nature runs it the other way, keeping the
                releasing signals deliberately short so the rhythm stays crisp.
              </Callout>
            </Section>

            <Section title="Why pulses, not plateaus">
              <P>
                The axis goes to real trouble to keep its output intermittent. Two
                feedback mechanisms enforce it: rising IGF-1 restrains GHRH and
                GH release, and somatostatin tone surges between pulses to hold the
                pituitary quiet. The system is engineered to return to baseline,
                not to sit at a high level.
              </P>
              <P>
                That matters because, for several peptide hormones, the body reads
                the <Em>pattern</Em> of exposure, not just the amount. The clearest
                parallels are elsewhere in this catalog and make the principle
                concrete:
              </P>
              <Bullets
                items={[
                  ["Intermittent builds, continuous breaks down", "Intermittent parathyroid hormone is anabolic for bone, while continuous PTH is catabolic — the same molecule, opposite effects, decided by timing."],
                  ["Pulsatile drives, continuous suppresses", "Pulsatile GnRH stimulates the reproductive axis, but continuous GnRH-agonist exposure desensitizes the receptor and shuts it down."],
                ]}
              />
              <P>
                Growth hormone belongs to this family of pattern-encoded signals.
                Receptors and downstream pathways exposed to a sustained high level
                tend to desensitize and counter-regulate; the same total signal
                delivered as brief pulses against a low baseline keeps the system
                responsive. The physiology favors low-amplitude, recurring signals
                held in check by feedback — not a flat, elevated plateau.
              </P>
            </Section>

            <Section title="Releasing the axis vs. overriding it">
              <P>
                That design principle separates two fundamentally different ways to
                act on the axis. You can work <Em>with</Em> the pulse, or you can
                bypass it.
              </P>
              <Bullets
                items={[
                  ["Work with the pulse", "GHRH-pathway analogs and the ghrelin-mimetic secretagogues amplify the body's own GH release. Because the GH still comes from the pituitary, it remains pulsatile and stays under IGF-1 and somatostatin feedback — the loop can still say 'enough'."],
                  ["Override the pulse", "Exogenous recombinant GH (rHGH) is delivered directly, bypassing the hypothalamus entirely. It does not pulse and it does not answer to the upstream brakes; the dose sets the exposure, and feedback can no longer modulate it."],
                ]}
              />
              <P>
                This is where the axis&rsquo;s own logic carries a quiet lesson.
                Everything about the system — the minutes-long releasing signals,
                the somatostatin brake, the IGF-1 feedback — is built to keep GH
                exposure <Em>modest and intermittent</Em>. Sustained, supraphysiologic
                GH is precisely the state the feedback machinery exists to prevent,
                and it is the state associated with the harms of GH excess: insulin
                resistance, fluid retention, soft-tissue and skeletal overgrowth.
                The further a signal departs from the body&rsquo;s low-amplitude,
                feedback-respecting rhythm, the more the system pushes back and the
                less durable the effect.
              </P>
              <P>
                Read the other way: an input that stays close to physiology — low,
                pulsatile, and left under the axis&rsquo;s own regulation — works{" "}
                <Em>with</Em> a system tuned over evolutionary time to run on small,
                recurring signals rather than floods. That is the mechanistic reason
                restraint tends to be more sustainable here than excess; it is a
                statement about how the axis is wired, not a dosing recommendation.
              </P>
            </Section>

            <Section title="What's established, and what's still open">
              <P>
                <Em>Established:</Em> the GHRH / ghrelin / somatostatin control of
                pulsatile GH; IGF-1 as the principal mediator of GH&rsquo;s growth
                effects and as a negative-feedback signal; the role of binding
                proteins in extending IGF-1&rsquo;s half-life; and the recognized
                consequences of sustained GH excess.
              </P>
              <P>
                <Em>Open:</Em> how closely any secretagogue strategy reproduces a
                truly physiologic pulse profile; the long-horizon trade-offs of
                manipulating the axis in healthy adults; and how much the
                growth-versus-longevity tension in GH/IGF-1 biology should temper
                the assumption that more signaling is better. On these questions the
                honest answer is that the evidence is still being written — read the{" "}
                <Link href="/hormones/growth-hormone" className={LINK}>references</Link>{" "}
                and the primary literature, not the marketing.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/families/growth-repair" label="The growth & repair family" />
                <CrossLink href="/hormones/growth-hormone" label="Growth hormone reference (MW, half-life)" />
                <CrossLink href="/hormones/igf-1" label="IGF-1: the carrier-bound readout" />
                <CrossLink href="/hormones/somatostatin" label="Somatostatin: the brake" />
                <CrossLink href="/tools/half-life" label="Model how half-life shapes exposure" />
                <CrossLink href="/research?q=How%20do%20GHRH%20analogs%20and%20ghrelin-mimetic%20secretagogues%20differ%20from%20exogenous%20GH%3F" label="Ask the research agent about secretagogues" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing
              guidance, or a recommendation to use any compound. Specific
              compounds are named to explain the science; verify any claim against
              primary sources.
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-2 border-accent-blue bg-accent-blue/[0.07] p-5">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-accent-blue">Key insight</div>
      <p className="text-[15px] leading-7 text-ink/80">{children}</p>
    </div>
  );
}

function Bullets({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-3">
      {items.map(([head, body]) => (
        <li key={head} className="flex gap-3 text-[15px] leading-7 text-ink/75">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" aria-hidden />
          <span>
            <strong className="font-semibold text-ink">{head}.</strong> {body}
          </span>
        </li>
      ))}
    </ul>
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

/* ── Duration ladder: half-life of the axis players ── */
function DurationLadder() {
  // Representative native half-lives (see each hormone reference). Bar widths are
  // illustrative on a compressed scale — minutes vs. hours differ by ~100×.
  const rows: { name: string; size: string; hl: string; w: number; color: string }[] = [
    { name: "Somatostatin", size: "14 aa", hl: "~1–3 min", w: 8, color: "var(--accent-rose)" },
    { name: "GH", size: "191 aa protein", hl: "~10–20 min", w: 20, color: "var(--accent)" },
    { name: "GHRH", size: "44 aa", hl: "~minutes–tens of min", w: 26, color: "var(--accent-teal)" },
    { name: "Ghrelin", size: "28 aa", hl: "~30 min", w: 34, color: "var(--accent-purple)" },
    { name: "IGF-1 (bound)", size: "70 aa + IGFBPs", hl: "~12–16 h", w: 100, color: "var(--accent-blue)" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-6">
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <div className="w-32 shrink-0">
              <div className="text-sm font-semibold text-ink">{r.name}</div>
              <div className="font-mono text-[10px] uppercase tracking-wide text-ink/40">{r.size}</div>
            </div>
            <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-ink/[0.06]">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${r.w}%`, backgroundColor: r.color, opacity: 0.55 }}
              />
            </div>
            <div className="w-32 shrink-0 text-right font-mono text-[11px] text-ink/55">{r.hl}</div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink/40">
        The releasing signals last minutes; only carrier-bound IGF-1 lasts hours. Bars are
        illustrative — the minute-to-hour gap is roughly 100-fold.
      </figcaption>
    </figure>
  );
}

/* ── GH axis diagram ── */
function AxisDiagram() {
  const W = 560;
  const boxW = 260;
  const x = (W - boxW) / 2; // centered column
  const cx = W / 2;
  const nodeH = 64;
  const gap = 48;
  const nodes: { label: string; sub: string; color: string }[] = [
    { label: "Hypothalamus", sub: "GHRH (+)  ·  somatostatin (−)", color: "var(--accent-teal)" },
    { label: "Pituitary", sub: "GH — released in pulses", color: "var(--accent)" },
    { label: "Liver & tissues", sub: "IGF-1 → growth", color: "var(--accent-blue)" },
  ];
  const yAt = (i: number) => 20 + i * (nodeH + gap);
  const H = nodes.length * nodeH + (nodes.length - 1) * gap + 40;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-lg" role="img" aria-label="The growth-hormone axis: hypothalamus to pituitary to liver, with ghrelin input and IGF-1 feedback">
        {/* downward arrows between nodes */}
        {nodes.slice(0, -1).map((_, i) => {
          const y1 = yAt(i) + nodeH;
          const y2 = yAt(i + 1);
          return (
            <g key={i}>
              <line x1={cx} y1={y1} x2={cx} y2={y2 - 8} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
              <path d={`M ${cx - 5} ${y2 - 9} L ${cx} ${y2 - 1} L ${cx + 5} ${y2 - 9}`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          );
        })}

        {/* ghrelin side input into the pituitary */}
        <g>
          <text x={x - 8} y={yAt(1) + 26} textAnchor="end" fill="var(--accent-purple)" fontSize="13" fontWeight="600">
            ghrelin (+)
          </text>
          <text x={x - 8} y={yAt(1) + 43} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11">
            via GHS-R
          </text>
          <line x1={x - 70} y1={yAt(1) + 30} x2={x - 4} y2={yAt(1) + 30} stroke="var(--accent-purple)" strokeOpacity="0.5" strokeWidth="2" />
          <path d={`M ${x - 12} ${yAt(1) + 26} L ${x - 4} ${yAt(1) + 30} L ${x - 12} ${yAt(1) + 34}`} fill="none" stroke="var(--accent-purple)" strokeOpacity="0.7" strokeWidth="2" />
        </g>

        {/* IGF-1 negative feedback loop on the right */}
        <g>
          <path
            d={`M ${x + boxW} ${yAt(2) + nodeH / 2} C ${W - 18} ${yAt(2) + nodeH / 2}, ${W - 18} ${yAt(0) + nodeH / 2}, ${x + boxW} ${yAt(0) + nodeH / 2}`}
            fill="none"
            stroke="var(--accent-blue)"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <path d={`M ${x + boxW + 9} ${yAt(0) + nodeH / 2 - 5} L ${x + boxW + 1} ${yAt(0) + nodeH / 2} L ${x + boxW + 9} ${yAt(0) + nodeH / 2 + 5}`} fill="none" stroke="var(--accent-blue)" strokeOpacity="0.7" strokeWidth="2" />
          <text x={W - 14} y={(yAt(0) + yAt(2)) / 2 + nodeH / 2} textAnchor="middle" fill="var(--accent-blue)" fontSize="12" fontWeight="600" transform={`rotate(90 ${W - 14} ${(yAt(0) + yAt(2)) / 2 + nodeH / 2})`}>
            IGF-1 feedback (−)
          </text>
        </g>

        {/* node boxes */}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <rect x={x} y={yAt(i)} width={boxW} height={nodeH} rx={14} fill="var(--panel)" stroke={n.color} strokeOpacity={0.45} strokeWidth={1.5} />
            <text x={cx} y={yAt(i) + 27} textAnchor="middle" fill="var(--color-ink)" fontSize="17" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              {n.label}
            </text>
            <text x={cx} y={yAt(i) + 47} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="12.5">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        GHRH and ghrelin push, somatostatin brakes; GH drives hepatic IGF-1, which feeds back to restrain the axis.
      </figcaption>
    </figure>
  );
}
