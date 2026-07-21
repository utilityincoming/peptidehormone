import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("insulins-forgotten-twin")!;

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
            <Section title="Two hormones, one granule">
              <P>
                Ask anyone to name what the pancreas secretes to control blood sugar and
                the answer is <Link href="/hormones/insulin" className={LINK}>insulin</Link>.
                It is one of the most famous molecules in medicine — a hundred-year-old{" "}
                <Link href="/insights/insulin-to-the-peptide-boom" className={LINK}>first miracle</Link>{" "}
                of peptide therapy. What almost no one names is the hormone packed into the
                very same storage granules, released in the same pulse, from the same beta
                cells:{" "}
                <Link href="/hormones/amylin" className={LINK}>amylin</Link>.
              </P>
              <P>
                They are not neighbors who happen to fire together. Insulin and amylin are
                <Em> co-packaged and co-secreted</Em> — a built-in partnership, roughly a
                single hormonal system with two chemically distinct signals. Yet amylin
                wasn&rsquo;t even isolated until 1987, and it was found not in a hunt for a
                new hormone but in the wrong place entirely: buried in the{" "}
                <Em>amyloid</Em> — the pathological protein clumps — that scar the islets of
                a diabetic pancreas. Its formal name still carries that origin: islet
                amyloid polypeptide, IAPP. The twin was discovered as debris.
              </P>
            </Section>

            <Section title="A receptor borrowed, not built">
              <P>
                Here is the first genuinely elegant thing about amylin: it has no receptor
                of its own. There is no gene that codes for a dedicated &ldquo;amylin
                receptor.&rdquo; Instead, amylin hijacks a receptor that already exists for
                another hormone — the{" "}
                <Link href="/hormones/calcitonin" className={LINK}>calcitonin</Link> receptor
                — and changes what it listens for by adding a single accessory protein.
              </P>
              <AmylinReceptor />
              <P>
                That accessory is a <Em>RAMP</Em> — a receptor activity-modifying protein.
                On its own, the calcitonin receptor responds to calcitonin. Clamp a RAMP
                onto it and the same core receptor is re-tuned: now it prefers amylin. Swap
                which RAMP (there are three) and you get the family of amylin receptors. The
                body didn&rsquo;t evolve a whole new receptor for its second beta-cell
                hormone; it took one it already had and gave it a different hat. It is
                molecular economy — reuse the machine, change the adapter — and it is why
                amylin&rsquo;s pharmacology is knitted into the same calcitonin family that
                governs bone and calcium.
              </P>
            </Section>

            <Section title="What the twin actually does">
              <P>
                If insulin&rsquo;s job is to <Em>put nutrients away</Em> — pulling glucose
                into cells after a meal — amylin&rsquo;s job is to govern how fast those
                nutrients arrive and when the body decides it has had enough. It pulls three
                distinct brakes:
              </P>
              <Bullets
                items={[
                  [
                    "It slows gastric emptying",
                    "food leaves the stomach more gradually, so glucose enters the blood as a gentle rise rather than a spike insulin then has to chase",
                  ],
                  [
                    "It suppresses inappropriate glucagon",
                    "it silences the counter-regulatory signal that would otherwise tell the liver to add its own glucose on top of the meal",
                  ],
                  [
                    "It promotes satiety centrally",
                    "it acts on the area postrema, a hindbrain outpost that sits outside the blood-brain barrier and reads circulating signals, to produce the sense of fullness",
                  ],
                ]}
              />
              <P>
                Read those together and amylin is the <Em>rate-and-enough</Em> hormone to
                insulin&rsquo;s <Em>storage</Em> hormone. They aren&rsquo;t redundant — they
                cover different halves of the same post-meal problem, which is exactly why
                evolution ships them in the same granule.
              </P>
            </Section>

            <Section title="The self-sabotage: amyloid">
              <P>
                Now the twist that hid amylin for so long. Human amylin is chemically
                <Em> sticky</Em>. Its native sequence is prone to misfolding and
                aggregating into amyloid fibrils — the same broad class of pathological
                protein clumping seen in other amyloid diseases. In the type 2 diabetic
                pancreas, that aggregated amylin deposits in the islets and is toxic to the
                very beta cells that made it, part of the slow attrition of insulin-producing
                capacity. The hormone meant to partner insulin can, misfolded, help kill the
                cells that produce both.
              </P>
              <P>
                That same stickiness made native human amylin nearly undruggable — you
                cannot bottle a peptide that clumps in the vial. The fix was engineering.
                The approved analog pramlintide borrows a trick from rodent amylin, whose
                sequence resists aggregation, substituting a few proline residues to break
                the misfolding-prone stretch while keeping the biology. Newer long-acting
                analogs like cagrilintide extend that idea for once-weekly dosing. The
                &ldquo;amylin drugs&rdquo; are, in a real sense, amylin with its
                self-destruct sequence edited out.
              </P>
              <Callout label="The real insight">
                Amylin is a hormone defined by borrowing and breaking: it borrows the
                calcitonin receptor to be heard, and it breaks itself into the amyloid that
                names it. Making it into medicine meant keeping the first trick and undoing
                the second — a stabilized peptide that signals like amylin but refuses to
                clump.
              </Callout>
            </Section>

            <Section title="Why amylin is the frontier's new axis">
              <P>
                So why is a hormone discovered in 1987 suddenly one of the hottest bets in
                metabolic medicine? Because it does its work through a{" "}
                <Em>different door</Em> than the incretins. GLP-1 drives satiety through the
                GLP-1 receptor; amylin drives it through amylin receptors in the area
                postrema. Two separate pathways converging on the same goal means their
                effects <Em>stack</Em> rather than overlap — the appetite suppression adds
                up instead of hitting one receptor&rsquo;s ceiling twice.
              </P>
              <P>
                That is the logic behind the current wave: cagrilintide paired with{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link> (an
                amylin analog plus a GLP-1 analog in one regimen), and amycretin, a single
                molecule engineered to be both a GLP-1 <Em>and</Em> an amylin agonist at
                once. It is the same move the{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>triple agonist</Link>{" "}
                made with glucagon — recruit another arm of the body&rsquo;s own machinery
                into the chord — except the arm here isn&rsquo;t a third incretin. It&rsquo;s
                insulin&rsquo;s original partner, brought back into the fold. When we ask{" "}
                <Link href="/insights/is-there-a-glp-4" className={LINK}>what comes after the triple agonist</Link>,
                amylin is the clearest answer: not a bigger number, but a hormone the body
                was already using all along.
              </P>
              <P>
                All of this remains an <Em>active</Em> story — cagrilintide and amycretin are
                investigational, and the durable head-to-head evidence is still being
                written. But the biology underneath is a century old and hiding in plain
                sight. The most modern idea in the field turns out to be the pancreas&rsquo;s
                oldest one: never released insulin without its twin.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/amylin" label="Amylin — the catalog entry" />
                <CrossLink href="/hormones/insulin" label="Insulin — the twin that got famous" />
                <CrossLink href="/insights/is-there-a-glp-4" label="Is there a GLP-4?" />
                <CrossLink href="/insights/the-triple-agonist" label="The triple agonist" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized
              and simplified from the public record. Not medical advice. Compounds are named
              to explain the science, not to endorse any use; pramlintide is an approved
              amylin analog, while cagrilintide and amycretin are investigational and not
              approved treatments.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Same core receptor, different accessory → different hormone ── */
function AmylinReceptor() {
  const W = 600, membraneY = 150;
  // Two panels: calcitonin receptor (CTR alone) vs amylin receptor (CTR + RAMP).
  const panels = [
    {
      cx: 165,
      label: "Calcitonin receptor",
      ligand: "Calcitonin",
      ligandColor: "var(--accent-blue)",
      ramp: false,
    },
    {
      cx: 435,
      label: "Amylin receptor",
      ligand: "Amylin",
      ligandColor: "var(--accent)",
      ramp: true,
    },
  ];

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} 250`} className="w-full" role="img" aria-label="The calcitonin receptor alone responds to calcitonin; adding a RAMP accessory protein re-tunes the same receptor to respond to amylin">
        {/* membrane */}
        <line x1="24" y1={membraneY} x2={W - 24} y2={membraneY} stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1.5" />
        <line x1="24" y1={membraneY + 8} x2={W - 24} y2={membraneY + 8} stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1.5" />
        <text x={W - 24} y={membraneY + 26} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.3" fontSize="10" fontFamily="var(--font-geist-mono), monospace" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          cell membrane
        </text>

        {/* divider */}
        <line x1={W / 2} y1="24" x2={W / 2} y2="210" stroke="var(--color-ink)" strokeOpacity="0.06" strokeDasharray="4 5" />

        {panels.map((p) => (
          <g key={p.label}>
            {/* CTR core receptor straddling the membrane */}
            <rect x={p.cx - 20} y={membraneY - 34} width="40" height="66" rx="9" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" />
            <text x={p.cx} y={membraneY + 4} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.85" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              CTR
            </text>

            {/* RAMP accessory clamped alongside, only on the amylin panel */}
            {p.ramp && (
              <>
                <rect x={p.cx + 20} y={membraneY - 22} width="20" height="54" rx="6" fill="var(--accent-teal)" fillOpacity="0.22" stroke="var(--accent-teal)" strokeOpacity="0.6" strokeWidth="1.5" />
                <text x={p.cx + 30} y={membraneY + 46} textAnchor="middle" fill="var(--accent-teal)" fontSize="11" fontWeight="600" fontFamily="var(--font-geist-mono), monospace">
                  RAMP
                </text>
              </>
            )}

            {/* ligand docking on top */}
            <circle cx={p.cx} cy={membraneY - 58} r="12" fill={p.ligandColor} />
            <line x1={p.cx} y1={membraneY - 46} x2={p.cx} y2={membraneY - 34} stroke={p.ligandColor} strokeWidth="2" strokeOpacity="0.5" />
            <text x={p.cx} y={membraneY - 74} textAnchor="middle" fill={p.ligandColor} fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              {p.ligand}
            </text>

            {/* panel caption */}
            <text x={p.cx + (p.ramp ? 10 : 0)} y="204" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="12" fontFamily="var(--font-geist-mono), monospace">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        One core receptor. Add a RAMP accessory and it stops listening for calcitonin and starts listening for amylin.
      </figcaption>
    </figure>
  );
}
