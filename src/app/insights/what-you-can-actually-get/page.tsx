import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("what-you-can-actually-get")!;

// Visible FAQ === FAQPage schema (same text), for long-tail query capture.
const FAQS: { q: string; a: string }[] = [
  {
    q: "Why isn't every catalogued peptide actually available?",
    a: "A compound can be well characterised in the literature yet not synthesised at research grade, finished, or in stock anywhere. Being catalogued describes what is known about a molecule; availability describes whether you can obtain it right now, in a form you can trust — two different maps.",
  },
  {
    q: "What does research-grade availability mean here?",
    a: "That a molecule is currently stocked in finished, lyophilised form by a source meeting a fixed sourcing standard: a lot-specific certificate of analysis, primary literature cited on the page, and research-use-only framing. A listing is verified, never paid for.",
  },
  {
    q: "How often does peptide availability change?",
    a: "Constantly. Unlike a sequence or a receptor, reachability moves — candidates cross from clinical trials into research-grade supply, and manufacturing consolidates. That is why availability is tracked as living data rather than stated once.",
  },
];

export const metadata: Metadata = {
  title: "Cataloged vs. reachable: which research peptides you can actually source",
  description:
    "Every catalogue lists what peptides exist. Here's what's actually reachable at research grade now — and why availability, not identity, is the real bottleneck.",
  alternates: { canonical: "/insights/what-you-can-actually-get" },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

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
            <Section title="The field you can read, and the field you can reach">
              <P>
                A good reference is exhaustive about identity. It will give you a
                peptide&rsquo;s sequence, its receptor, the second messenger it trips, the
                half-life the native form is stuck with and the trick an analog uses to
                escape it. That is the field you can <Em>read</Em>. It is complete, it is
                stable, and — this is the quiet part — it is the same today as it was last
                quarter.
              </P>
              <P>
                The field you can <Em>reach</Em> is a different map, and almost nobody
                publishes it. Of everything in a catalog, only a fraction is actually
                obtainable at research grade right now, in a form you&rsquo;d trust, from a
                seller who can tell you where it came from. That fraction is the operative
                one — it&rsquo;s the difference between reading about a molecule and being
                able to work with it — and it&rsquo;s the one the neutral references leave
                blank.
              </P>
            </Section>

            <Section title="Availability is a filter, not a footnote">
              <P>
                Think of it as a funnel. Everything in the literature sits at the top. Each
                step down removes what you can&rsquo;t actually act on — until what&rsquo;s
                left is the short list you could hold in a vial this month.
              </P>
              <ReachableFunnel />
              <P>
                Nothing about that narrowing is a knock on the molecules that don&rsquo;t
                make it through. A compound can be brilliant on paper and simply not be
                synthesized at scale yet — that&rsquo;s the frontier working exactly as it
                should. The point is that the last tier is <Em>information</Em>, and it&rsquo;s
                information no spec sheet carries.
              </P>
            </Section>

            <Section title="And unlike a sequence, it moves">
              <P>
                A receptor doesn&rsquo;t change. Reachability does — constantly. A candidate
                that lived only in{" "}
                <a
                  href="https://clinicaltrials.gov/"
                  className={LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clinical-trial data
                </a>{" "}
                crosses over into research-grade powder. A supply line consolidates and a form
                that was scarce becomes routine. This is the same consolidation the{" "}
                <Link href="/insights/where-the-powder-comes-from" className={LINK}>
                  supply chain
                </Link>{" "}
                is going through as it professionalizes under{" "}
                <a
                  href="https://www.morganlewis.com/pubs/2026/02/navigating-chinas-new-2026-implementing-regulations-of-the-drug-administration-law"
                  className={LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  China&rsquo;s 2026 drug-law reforms
                </a>{" "}
                — and the community running protocols
                has always{" "}
                <Link href="/insights/early-adopters-catalog" className={LINK}>
                  felt those shifts first
                </Link>
                .
              </P>
              <P>
                Which is why availability reads like a frontier dispatch rather than a price
                tag. Watching what&rsquo;s newly reachable tells you where the field&rsquo;s
                manufacturing edge actually is this month — which is often a step ahead of
                where the reviews have caught up to.
              </P>
            </Section>

            <Section title="How a reference publishes this without becoming a store">
              <P>
                The obvious objection: the moment a reference tells you where to buy, hasn&rsquo;t
                it stopped being a reference? Only if the buying decides the writing. Keep those
                two apart and availability becomes just another honest data field. Three rules
                hold the line:
              </P>
              <Bullets
                items={[
                  [
                    "Listed is earned, not paid",
                    "a compound appears in the availability layer only when it clears a fixed sourcing standard — a lot-specific COA, primary literature cited on the page, sold research-use-only. Payment can buy a link; it can't buy a listing",
                  ],
                  [
                    "Absence claims nothing",
                    "not being listed means \"not currently stocked to the standard,\" never \"inferior.\" The layer only ever makes a positive statement, so it can't be used to bury a rival",
                  ],
                  [
                    "The wall is real",
                    "the commercial layer lives in its own module and the monographs can't import it. No mechanism, fact, or evidence grade can be bent by who's selling what",
                  ],
                ]}
              />
              <P>
                Do that, and the disclosure isn&rsquo;t a confession — it&rsquo;s the feature.
                Every link is marked, the one sourcing relationship is named on the{" "}
                <Link href="/methodology" className={LINK}>methodology page</Link>, and the
                reader gets the one fact the rest of the internet makes them go digging for.
              </P>
            </Section>

            <Callout label="The real insight">
              The highest-value fact on a reference page usually isn&rsquo;t another spec —
              it&rsquo;s whether you can act on the ones already there. Identity is settled and
              everywhere. <Em>Reachability</Em> is scarce, it moves, and serving it — verified,
              disclosed, walled off from the writing — is how a reference earns its place at the
              exact moment a reader has stopped reading and started deciding.
            </Callout>

            <div className="rounded-2xl border border-accent/25 bg-accent/[0.05] p-6 sm:p-7">
              <h3 className="font-display text-lg font-semibold">See what&rsquo;s reachable now</h3>
              <p className="mt-2 text-[15px] leading-7 text-ink/70">
                The current availability layer — every compound verified against the sourcing
                standard before it earns a listing.
              </p>
              <Link
                href="/available"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/15"
              >
                Open the availability index <span aria-hidden>→</span>
              </Link>
            </div>

            {/* FAQ — mirrors the FAQPage schema for long-tail query capture */}
            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">Common questions</h2>
              <div className="mt-5 space-y-4">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                    <h3 className="font-display text-base font-semibold text-ink">{f.q}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/the-complexity-ladder" label="Where trust starts to mean something" />
                <CrossLink href="/insights/where-the-powder-comes-from" label="Where the powder comes from" />
                <CrossLink href="/insights/early-adopters-catalog" label="The community found it first" />
                <CrossLink href="/methodology" label="Methodology & standards" />
                <CrossLink href="/catalog" label="Browse the full catalog" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational and strategic reference on peptide availability and sourcing. The
              availability layer contains disclosed affiliate links to a single sourcing
              partner; it does not influence any monograph, mechanism, or evidence grade. Not
              medical advice and not an endorsement to obtain or use any compound — regulatory
              status varies by jurisdiction and by whether a compound is handled as an approved
              drug or a research reagent.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── From the whole literature down to what you can hold this month ── */
function ReachableFunnel() {
  const tiers = [
    { label: "In the literature", w: 520, color: "var(--color-ink)", fillOp: 0.06, strokeOp: 0.18, textOp: 0.55 },
    { label: "Synthesized at research grade", w: 404, color: "var(--accent-blue)", fillOp: 0.12, strokeOp: 0.4, textOp: 0.85 },
    { label: "Finished & COA-verified", w: 288, color: "var(--accent)", fillOp: 0.14, strokeOp: 0.45, textOp: 0.9 },
    { label: "Reachable this month", w: 176, color: "var(--accent-teal)", fillOp: 0.18, strokeOp: 0.55, textOp: 1 },
  ];
  const W = 600;
  const cx = W / 2;
  const barH = 46;
  const gap = 11;
  const y0 = 14;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${y0 * 2 + tiers.length * barH + (tiers.length - 1) * gap}`}
        className="w-full"
        role="img"
        aria-label="A funnel narrowing from everything in the literature, to what's synthesized at research grade, to what's finished and COA-verified, down to the short list reachable this month"
      >
        {tiers.map((t, i) => {
          const y = y0 + i * (barH + gap);
          const x = cx - t.w / 2;
          return (
            <g key={t.label}>
              <rect
                x={x}
                y={y}
                width={t.w}
                height={barH}
                rx={10}
                fill={t.color}
                fillOpacity={t.fillOp}
                stroke={t.color}
                strokeOpacity={t.strokeOp}
                strokeWidth={1.5}
              />
              <text
                x={cx}
                y={y + barH / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill={t.color}
                fillOpacity={t.textOp}
                fontSize="14"
                fontWeight="600"
                fontFamily="var(--font-space-grotesk), sans-serif"
              >
                {t.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Identity is the whole top of the funnel. Availability is only the bottom — and it&rsquo;s
        the tier you actually act on.
      </figcaption>
    </figure>
  );
}
