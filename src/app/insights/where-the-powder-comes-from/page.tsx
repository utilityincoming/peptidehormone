import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("where-the-powder-comes-from")!;

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
            <Section title="The map most people don't have">
              <P>
                The center of gravity of the peptide world isn&rsquo;t where the
                marketing points. Solid-phase peptide synthesis at scale, the protected
                amino-acid building blocks that feed it, and a large share of the
                fill-and-finish that turns crude peptide into a clean{" "}
                <Em>lyophilized</Em> cake — most of that capacity sits in China. This is
                not a peptide anomaly; it mirrors small-molecule{" "}
                <Link href="/hormones/semaglutide" className={LINK}>drug</Link> ingredients
                broadly, where a handful of Chinese and Indian plants supply the world.
                When a vial holds a peptide, the odds are high that the molecule — or the
                intermediates that built it — traced through a Chinese manufacturing line
                at some point on the way.
              </P>
              <P>
                Say that plainly, because the instinct is to flinch: this is industrial{" "}
                <Em>maturity</Em>, not a red flag. Those facilities run the scale and the
                chemistry that make research-grade material available and affordable at
                all. The interesting question was never &ldquo;is it from China&rdquo; —
                it almost always is, somewhere upstream. The question is how many hands
                touched it after it was made.
              </P>
            </Section>

            <Section title="What 2026 changed">
              <P>
                On <Em>May 15, 2026</Em>, China&rsquo;s State Council put revised{" "}
                <a
                  href="https://www.morganlewis.com/pubs/2026/02/navigating-chinas-new-2026-implementing-regulations-of-the-drug-administration-law"
                  className={LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Implementing Regulations of the Drug Administration Law
                </a>{" "}
                into effect — consolidating a patchwork of rules into one binding
                framework across the entire drug lifecycle. Three provisions matter for
                anyone thinking about where a peptide comes from:
              </P>
              <Bullets
                items={[
                  [
                    "Segmented production is now formal",
                    "different manufacturing stages can legally happen at separate licensed facilities for innovative or urgently-needed drugs — which legitimizes the marketing-holder-plus-contract-manufacturer model the industry already runs on",
                  ],
                  [
                    "Real quality accountability",
                    "authorization holders must operate independent quality units with named responsible personnel, validated change control, and functioning pharmacovigilance — not a paper program",
                  ],
                  [
                    "Named liability",
                    "a foreign marketing-authorization holder has to appoint a China-based entity carrying joint-and-several liability for the product's quality and safety",
                  ],
                ]}
              />
              <P>
                The net effect points one way: the Chinese manufacturing base is being
                pushed toward <Em>more</Em> traceability and clearer accountability, not
                less. One honest caveat — this law governs approved drugs and the
                authorization-holder system; peptides sold as non-drug research reagents
                sit outside it. But they ride the same industrial base, and a base that
                is professionalizing raises the whole floor. The useful takeaway isn&rsquo;t
                &ldquo;avoid China.&rdquo; It&rsquo;s that Chinese-origin material is
                becoming more <Em>auditable</Em> — which turns demanding real provenance
                from a fantasy into a reasonable ask.
              </P>
            </Section>

            <Section title="The &ldquo;American made&rdquo; illusion">
              <P>
                Here is where the strategy turns. Because so much upstream peptide is
                Chinese-origin, a &ldquo;made in USA&rdquo; claim very often describes the{" "}
                <Em>last step</Em> of the journey, not the whole of it. The common shape:
                import bulk peptide, reconstitute or re-handle it domestically,
                re-lyophilize, vial, label — then stamp the flag on the box. None of that
                is illegal, or even necessarily bad. But notice what it did. It did not
                remove the Chinese origin. It <Em>added steps on top of it</Em>. A
                molecule that could have shipped as one sealed vial straight from the
                finishing line instead took a longer road — more borders, more benches,
                more hands — to arrive wearing a domestic label.
              </P>
              <P>
                The flag, in other words, can mark <Em>more</Em> friction, not less. And
                in lyophilized peptide, friction has a specific, physical cost.
              </P>
            </Section>

            <Section title="Why hand-offs cost purity">
              <P>
                A lyophilized peptide is at its most stable the instant it&rsquo;s sealed.
                Capped under vacuum or inert gas, dry and cold, it is about as inert as it
                will ever be. Everything after that is entropy working against you:
              </P>
              <Bullets
                items={[
                  [
                    "Moisture is the enemy",
                    "open the cake to ambient humidity and you invite hydrolysis and deamidation — the slow chemical drift that quietly turns one sequence into a slightly different one",
                  ],
                  [
                    "Oxygen and light do their own damage",
                    "methionine and cysteine oxidize; some sequences aggregate — changes you don't see in a clear solution but that show up on a mass spec",
                  ],
                  [
                    "Every re-lyophilization is a fresh roll of the dice",
                    "each reconstitute-and-re-dry cycle reopens all of the above, and adds adsorptive losses to glass, filters, and tubing on top",
                  ],
                ]}
              />
              <P>
                And here is the asymmetry that makes this decisive: degradation is{" "}
                <Em>monotonic</Em>. You can filter, you can re-dry, but you cannot
                un-deamidate a peptide or un-oxidize a residue. Purity only moves one
                direction down the chain — never back up. So the path with the fewest
                transfers between synthesis and the sealed vial in your hand isn&rsquo;t
                merely more convenient. On the chemistry alone, it is the path most likely
                to preserve what was actually made.
              </P>
              <HandoffPaths />
            </Section>

            <Callout label="The real insight">
              &ldquo;Least friction wins&rdquo; isn&rsquo;t a slogan about convenience.
              Each hand-off in a lyophilized peptide&rsquo;s life is an{" "}
              <Em>irreversible</Em> chance to shed purity — and nothing downstream adds it
              back. The shortest path from a GMP finishing line to a sealed vial is, on the
              chemistry, the highest-purity path. Provenance you can trace beats a flag you
              can&rsquo;t.
            </Callout>

            <Section title="So what actually to look for">
              <P>
                If the flag isn&rsquo;t the signal, what is? Three things, in order of how
                much they tell you:
              </P>
              <Bullets
                items={[
                  [
                    "Provenance you can trace",
                    "where was it synthesized, where was it finished, and how many transfers sat in between? Fewer is better — and a seller who can answer is worth more than one who waves a flag",
                  ],
                  [
                    "A real certificate of analysis",
                    "third-party HPLC for purity and mass spec for identity, tied to the specific lot — not a generic template. This is the actual measurement of what all those hand-offs did or didn't do",
                  ],
                  [
                    "Finishing you can reason about",
                    "sealed, properly lyophilized, cold-chain where it matters. As of 2026, GMP-grade Chinese material is more auditable than ever — so “I can't tell you where it came from” is now a choice, not a limitation",
                  ],
                ]}
              />
            </Section>

            <Section title="The bigger shift">
              <P>
                The category is growing up. In the early, gray-market years, the flag on
                the box was a proxy for trust because nothing better was on offer — the
                same era when the{" "}
                <Link href="/insights/early-adopters-catalog" className={LINK}>
                  community was the field&rsquo;s informal R&amp;D
                </Link>
                . That era is ending. The supply chain is consolidating and — as of 2026 —
                being regulated toward traceability, and the winning position is no longer
                flag-waving. It&rsquo;s honesty about the map: name the origin, minimize
                the hand-offs, prove the purity. Finished product, direct, with the least
                friction between the finishing line and the vial. On the chemistry and on
                the logistics both, the shortest path wins.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/early-adopters-catalog" label="The community found it first" />
                <CrossLink href="/families/incretins-metabolic" label="The incretins & metabolic family" />
                <CrossLink href="/hormones/semaglutide" label="Semaglutide — the volume driver" />
                <CrossLink href="/insights/insulin-to-the-peptide-boom" label="From insulin to the peptide boom" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Strategic and educational reference on peptide manufacturing, provenance,
              and lyophilization chemistry, summarized from the public record — including
              the Morgan Lewis analysis of China&rsquo;s 2026 Implementing Regulations.
              Not medical advice, and not an endorsement of any purchase; regulatory
              status varies by jurisdiction and by whether a compound is sold as an
              approved drug or a research reagent.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Two paths from synthesis to your vial: fewer transfers vs more ── */
function HandoffPaths() {
  const paths = [
    {
      title: "Finished, direct",
      transfers: "2 transfers",
      color: "var(--accent)",
      y: 74,
      nodes: ["Manufacture + lyo", "Sealed vial", "You"],
    },
    {
      title: "Bulk, then relabeled",
      transfers: "4 transfers",
      color: "var(--accent-amber)",
      y: 184,
      nodes: ["Bulk (CN)", "Import", "Re-lyo + fill", "Distributor", "You"],
    },
  ];
  const W = 600;
  const x0 = 60,
    x1 = 540;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} 250`} className="w-full" role="img" aria-label="Two supply paths from synthesis to your vial: a short direct path with two transfers, and a longer relabeled path with four transfers">
        {paths.map((path) => {
          const n = path.nodes.length;
          const xs = path.nodes.map((_, i) => (n === 1 ? x0 : x0 + ((x1 - x0) * i) / (n - 1)));
          const titleY = path.y - 34;
          return (
            <g key={path.title}>
              {/* title + transfer count */}
              <text x={16} y={titleY} fill="var(--color-ink)" fillOpacity="0.4" fontSize="12" fontFamily="var(--font-geist-mono), monospace" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {path.title}
              </text>
              <text x={W - 16} y={titleY} textAnchor="end" fill={path.color} fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
                {path.transfers}
              </text>
              {/* connecting line */}
              <line x1={xs[0]} y1={path.y} x2={xs[n - 1]} y2={path.y} stroke={path.color} strokeOpacity="0.35" strokeWidth="2" />
              {/* nodes */}
              {path.nodes.map((label, i) => {
                const last = i === n - 1;
                return (
                  <g key={label}>
                    {last ? (
                      <circle cx={xs[i]} cy={path.y} r="9" fill="none" stroke={path.color} strokeWidth="2" />
                    ) : (
                      <circle cx={xs[i]} cy={path.y} r="9" fill={path.color} />
                    )}
                    <text x={xs[i]} y={path.y + 26} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.75" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif">
                      {label}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Every transfer is a chance for moisture, oxidation, and identity drift — and you
        can&rsquo;t un-degrade a peptide. Fewer hands, purer powder.
      </figcaption>
    </figure>
  );
}
