import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("is-there-a-glp-4")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family))} />
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
            <Section title="The obvious question">
              <P>
                The story so far reads like a version history. First a single agonist —{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link>,
                one receptor. Then a dual —{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link>, two.
                Then{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>a triple</Link> —{" "}
                <Link href="/hormones/retatrutide" className={LINK}>retatrutide</Link>, three
                receptors from one molecule. One, two, three. So the next leap is obvious,
                isn&rsquo;t it? A bigger number. A GLP-4.
              </P>
              <P>
                Except there is no GLP-4. There is no GLP-3 either. And the reason that
                sounds surprising is the reason this whole essay exists: the intuition that
                progress means a higher number is exactly the intuition the field is leaving
                behind.
              </P>
            </Section>

            <Section title="The number that was never a version">
              <P>
                Start with what GLP-1 actually is. The &ldquo;1&rdquo; does not mean
                &ldquo;first generation.&rdquo; It is an accident of anatomy. The body makes
                a large precursor protein called <Em>proglucagon</Em>, then cuts it into
                pieces — and depending on which cell does the cutting, you get{" "}
                <Link href="/hormones/glucagon" className={LINK}>glucagon</Link>,
                glucagon-like peptide-<Em>1</Em>, and glucagon-like peptide-<Em>2</Em>,
                plus a few others. GLP-1 and GLP-2 are simply the first and second
                GLP-shaped fragments researchers named as they mapped the precursor. The
                number is a <Em>catalog index</Em>, not a performance tier.
              </P>
              <P>
                And GLP-2 — the one number that does exist beyond GLP-1 — proves the point,
                because it isn&rsquo;t a stronger metabolic drug at all. GLP-2 grows
                intestinal lining. Its analog, teduglutide, is used for short bowel
                syndrome, a gut-repair problem with nothing to do with appetite or blood
                sugar. If &ldquo;GLP-2&rdquo; meant &ldquo;GLP-1 but more,&rdquo; it would
                act on metabolism harder. Instead it does something else entirely. The
                sequence of numbers was never a ladder of power; it was a list of what fell
                out of one prohormone.
              </P>
              <Callout label="The category error">
                &ldquo;GLP-4&rdquo; asks for the next rung on a ladder that isn&rsquo;t a
                ladder. GLP-1&rsquo;s &ldquo;1&rdquo; is which fragment got cut from
                proglucagon — not which version of a drug. Waiting for a higher number is
                waiting for the wrong kind of progress.
              </Callout>
            </Section>

            <Section title="Progress branches, it doesn't count up">
              <P>
                So if not a bigger number, what? Look at what is actually in development and
                a different shape appears. The frontier isn&rsquo;t one axis pushed further
                — it&rsquo;s several new axes opening at once, some of them pulling in
                directions the &ldquo;more agonism&rdquo; story would call backwards.
              </P>
              <AxesOfAdvance />
              <P>
                Four moves, none of which is &ldquo;the same thing, stronger.&rdquo; Take
                them one at a time.
              </P>
            </Section>

            <Section title="Move 1 — a new hormone in the chord: amylin">
              <P>
                The triple agonist recruited GIP and glucagon alongside GLP-1. The next
                recruit isn&rsquo;t another incretin at all — it&rsquo;s{" "}
                <Link href="/hormones/amylin" className={LINK}>amylin</Link>, a hormone
                co-secreted with insulin that curbs appetite through a{" "}
                <Em>separate</Em> brainstem circuit. Because it works through a different
                door than the incretins, its effect stacks rather than overlaps.
                Cagrilintide (a long-acting amylin analog), the cagrilintide-plus-semaglutide
                combination, and amycretin (a single molecule that is both a GLP-1 and an
                amylin agonist) are all investigational bets on exactly that: not a fourth
                GLP, but a whole new signaling axis added to the mix.
              </P>
            </Section>

            <Section title="Move 2 — flip the sign: GIP, backwards">
              <P>
                Here is the move that breaks the intuition cleanly.{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>Tirzepatide</Link> is a
                GIP <Em>agonist</Em> — it turns the{" "}
                <Link href="/hormones/gip" className={LINK}>GIP</Link> receptor on. Yet one
                of the most closely watched next-generation molecules, maridebart cafraglutide,
                pairs GLP-1 agonism with GIP receptor <Em>antagonism</Em> — it turns the
                same receptor <Em>off</Em>. Two drugs, opposite actions at the very same
                target, and both drive weight loss in trials.
              </P>
              <P>
                That should be impossible under a &ldquo;more activation is better&rdquo;
                model, and it is the strongest evidence that the model is wrong. The GIP
                system can be tuned productively from either direction depending on what the
                rest of the molecule is doing. When the field can&rsquo;t even agree on the{" "}
                <Em>sign</Em> of a receptor&rsquo;s contribution, &ldquo;just crank it to
                4&rdquo; stops meaning anything.
              </P>
            </Section>

            <Section title="Move 3 — change the route, not the target: the pill">
              <P>
                A different frontier ignores receptors entirely and attacks{" "}
                <Link href="/insights/getting-the-molecule-in" className={LINK}>the delivery problem</Link>.
                Peptides are, chemically, food — swallow one and your gut digests it before
                it works, which is why this class has lived on the needle. Getting the same
                biology into a tablet is its own kind of breakthrough, and it&rsquo;s
                arriving two ways: oral formulations of existing peptides, and non-peptide
                small molecules like orforglipron that hit the GLP-1 receptor but survive
                the stomach because they were never peptides to begin with. A once-daily
                pill — or a once-monthly injection, another active direction — changes who
                will actually use these drugs far more than a marginal bump in receptor
                count ever could.
              </P>
            </Section>

            <Section title="Move 4 — better, not more: keep the muscle">
              <P>
                The last move redefines the goal. The first era chased a single number on
                the scale. But weight lost is a mix of fat and lean tissue, and stripping
                muscle alongside fat is not a win. So the frontier turns to the{" "}
                <Em>quality</Em> of the loss:{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>
                  pairing an incretin with myostatin inhibition
                </Link>{" "}
                to burn fat while sparing — even building — muscle. That is a{" "}
                <Link href="/hormones/myostatin" className={LINK}>myostatin</Link>-pathway
                drug bolted onto a metabolic one: a completely different mechanism recruited
                to make the same weight loss <Em>better</Em>, not larger. No amount of
                GLP-agonism, at any number, does that.
              </P>
            </Section>

            <Section title="Why 'more agonism' hit its ceiling">
              <P>
                None of this is an accident of naming — there are hard reasons the field
                stopped chasing a bigger single number:
              </P>
              <Bullets
                items={[
                  [
                    "Receptors adapt",
                    "flood a signaling system and it down-regulates; past a point, more agonism buys less and less real effect",
                  ],
                  [
                    "Tolerability is the true ceiling",
                    "the nausea that shadows this class limits how hard any one axis can be pushed — so you add new axes at moderate strength instead of maxing one out",
                  ],
                  [
                    "More weight isn't strictly better",
                    "once loss is dramatic, its composition — fat versus muscle — matters more than its size, and that's a quality problem, not a potency one",
                  ],
                ]}
              />
              <P>
                Push a single lever hard enough and you meet diminishing returns, a nausea
                wall, and a quality problem all at once. Adding a lever sidesteps all three.
                That is why the map fans out instead of marching up.
              </P>
            </Section>

            <Section title="So what actually comes next">
              <P>
                The honest near-term answer: amylin combinations and oral delivery reaching
                the clinic, the GIP agonism-versus-antagonism question getting settled by
                data rather than theory, and metabolic drugs increasingly judged by the
                muscle they keep, not just the fat they shed. Every one of these is{" "}
                <Em>investigational</Em> — promising, not proven — which is why the ones
                already in the{" "}
                <Link href="/hormones/retatrutide" className={LINK}>catalog</Link> wear
                honest evidence badges rather than settled ones.
              </P>
              <P>
                But the shape of the future is already clear, and it isn&rsquo;t a number.
                The instrument that learned to play{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>chords</Link>{" "}
                isn&rsquo;t about to play a higher note — it&rsquo;s growing new strings,
                learning to bend them the other way, and finding out it can be played
                without the needle. That&rsquo;s a richer frontier than GLP-4 ever
                promised. The best part of this field is that the interesting direction
                turned out to be sideways.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/the-triple-agonist" label="The triple agonist — one, two, three" />
                <CrossLink href="/hormones/amylin" label="Amylin — the next axis in the chord" />
                <CrossLink href="/insights/glp-1-muscle-preservation" label="Keeping the muscle on GLP-1" />
                <CrossLink href="/insights/getting-the-molecule-in" label="The delivery problem" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized
              and simplified from the public record. Not medical advice. Compounds and
              investigational candidates are named to explain the science, not to endorse
              any use; cagrilintide, amycretin, maridebart cafraglutide, orforglipron, and
              retatrutide are investigational and not approved treatments.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The frontier fans out: four axes of advance from GLP-1 today ── */
function AxesOfAdvance() {
  const cx = 300, cy = 175;
  const axes = [
    { label: "More axes", ex: "+ Amylin", x: 96, y: 66, color: "var(--accent-teal)", anchor: "start" as const },
    { label: "Flip the sign", ex: "GIP antagonism", x: 504, y: 66, color: "var(--accent-amber)", anchor: "end" as const },
    { label: "New route", ex: "Oral · monthly", x: 96, y: 284, color: "var(--accent-blue)", anchor: "start" as const },
    { label: "Better outcome", ex: "Muscle-sparing", x: 504, y: 284, color: "var(--accent-purple)", anchor: "end" as const },
  ];
  // A point on the center→endpoint ray, `gap` px in from the endpoint.
  const along = (x: number, y: number, gapFromCenter: number, gapFromEnd: number) => {
    const dx = x - cx, dy = y - cy;
    const len = Math.hypot(dx, dy);
    return {
      sx: cx + (dx / len) * gapFromCenter,
      sy: cy + (dy / len) * gapFromCenter,
      ex: x - (dx / len) * gapFromEnd,
      ey: y - (dy / len) * gapFromEnd,
    };
  };

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox="0 0 600 350" className="w-full" role="img" aria-label="Four axes of advance branching out from GLP-1: adding new hormone axes like amylin, GIP antagonism, oral or monthly delivery, and muscle-sparing outcomes">
        {axes.map((a) => {
          const r = along(a.x, a.y, 44, 12); // start past the center node, stop before the dot
          return (
            <g key={a.label}>
              <line x1={r.sx} y1={r.sy} x2={r.ex} y2={r.ey} stroke={a.color} strokeWidth="2" strokeOpacity="0.55" />
              <circle cx={a.x} cy={a.y} r="5" fill={a.color} />
              <text
                x={a.anchor === "start" ? a.x - 8 : a.x + 8}
                y={a.y - 6}
                textAnchor={a.anchor}
                fill={a.color}
                fontSize="14"
                fontWeight="600"
                fontFamily="var(--font-space-grotesk), sans-serif"
              >
                {a.label}
              </text>
              <text
                x={a.anchor === "start" ? a.x - 8 : a.x + 8}
                y={a.y + 12}
                textAnchor={a.anchor}
                fill="var(--color-ink)"
                fillOpacity="0.55"
                fontSize="12"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {a.ex}
              </text>
            </g>
          );
        })}
        {/* center node */}
        <circle cx={cx} cy={cy} r="40" fill="var(--accent)" fillOpacity="0.12" />
        <circle cx={cx} cy={cy} r="40" fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" />
        <text x={cx} y={cy - 2} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.9" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          GLP-1
        </text>
        <text x={cx} y={cy + 15} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11" fontFamily="var(--font-geist-mono), monospace">
          today
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The next step isn&rsquo;t a higher number on one axis — it&rsquo;s four different axes at once.
      </figcaption>
    </figure>
  );
}
