import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("a-switch-not-a-supply")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  mmp2: "https://pubmed.ncbi.nlm.nih.gov/11045606/", // Siméon et al., Life Sciences 2000 — GHK-Cu stimulates MMP-2 expression in fibroblast cultures
  mmpWound: "https://pubmed.ncbi.nlm.nih.gov/10383745/", // Siméon et al., J Invest Dermatol 1999 — MMP expression/activation in wounds modulated by GHK-Cu
} as const;

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family))} />
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
              <Link href="/families/repair" className="text-accent-rose hover:text-ink">
                Repair &amp; regenerative
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
            <Section title="A switch, not a supply">
              <P>
                The instinct with most things you inject is arithmetic: a level drops, you top it
                back up, and more-often is more-restored. That model fits a nutrient or a
                hormone you are replacing.{" "}
                <Link href="/hormones/ghk-cu" className={LINK}>GHK-Cu</Link> does not work that
                way. It is a copper-carrying tripeptide &mdash; Gly-His-Lys with a Cu&sup2;&#8314;
                ion &mdash; and what it does when it reaches a fibroblast is not feed the cell but{" "}
                <Em>instruct</Em> it: flip a transcriptional program on. The dose is a switch
                thrown, not a reservoir refilled.
              </P>
              <P>
                That single distinction reframes the whole question of how often to use it. A
                supply you keep topped up. A program you let <Em>run</Em> &mdash; and the program
                GHK-Cu starts is one your body already owns and already knows how to finish.
              </P>
            </Section>

            <Section title="The program has phases">
              <P>
                The sequence GHK-Cu launches is the wound-repair program, and its defining
                feature is that it is <Em>phased</Em> &mdash; it builds, then remodels, then
                stops. First activation: fibroblasts switch into repair mode. Then synthesis:
                collagen, elastin, and the glycosaminoglycan ground substance are laid down.
                Then the phase that matters most for this argument &mdash; remodeling, run by
                the matrix metalloproteinases, the enzymes that cut, reorganize, and let newly
                deposited matrix cross-link and mature into something with the right architecture.
                Then resolution: enzyme levels fall back, activation quiets, the tissue settles.
              </P>
              <P>
                GHK-Cu sits directly on the remodeling machinery. It{" "}
                <a href={REF.mmp2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  stimulates MMP-2 expression
                </a>{" "}
                in dermal fibroblast cultures (Siméon et al., <Em>Life Sciences</Em> 2000), and it{" "}
                <a href={REF.mmpWound} target="_blank" rel="noopener noreferrer" className={LINK}>
                  modulates MMP expression and activation
                </a>{" "}
                in wounds (Siméon et al., <Em>J. Invest. Dermatol.</Em> 1999). Those two findings
                are the well-cited core of the mechanism, and they are what make the phasing
                consequential: the drug does not just start construction, it turns up the crew
                that tears down and rebuilds. A crew you never send home is not the same as a
                finished building.
              </P>
              <ProgramCurve />
            </Section>

            <Section title="Why continuous dosing pins the program open">
              <P>
                Dose GHK-Cu every day, indefinitely, and the switch is never released. The tissue
                is held in a standing build-and-remodel state: MMP turnover that keeps churning,
                matrix that is perpetually being reorganized rather than allowed to settle,
                cross-link, and mature. Low-grade activation becomes the resting condition instead
                of a passing phase. That is not more repair &mdash; it is repair that never
                reaches its own conclusion.
              </P>
              <P>
                A break is what lets the last phase happen. During the off-weeks the program runs
                to resolution: enzymes fall back to baseline, new matrix finishes maturing, the
                tissue returns to homeostasis. When the next cycle starts, the fresh signal lands
                on <Em>rested</Em> tissue and can drive the full sequence again &mdash; which is
                the mechanistic reason cyclers tend to report a consistent effect cycle over
                cycle, where continuous users more often describe the effect plateauing or
                thinning out. The win isn&rsquo;t dosing more; it&rsquo;s letting each program
                finish before starting the next.
              </P>
              <Callout label="Not the tolerance story">
                This is a different mechanism from the receptor-desensitization logic behind the
                growth-axis peptides, where you cycle to keep a receptor from going numb to a
                signal it&rsquo;s hearing too constantly. GHK-Cu&rsquo;s effect is dose-triggered
                transcriptional programming, not a receptor waiting to fatigue. So the reason to
                break isn&rsquo;t to <Em>prevent desensitization</Em> &mdash; it&rsquo;s to let a
                phased program reach the phase that makes the work permanent.
              </Callout>
            </Section>

            <Section title="What a cycle looks like — and how firm that is">
              <P>
                A schedule you will see repeated across the research-peptide literature is roughly{" "}
                <Em>six to eight weeks on, two to four weeks off</Em>, then resume. It is worth
                being precise about where that comes from, because the site&rsquo;s creed &mdash;
                bullish on the science, sceptical on the page &mdash; applies most exactly here.
                Those week counts are <Em>not</Em> the output of a randomized head-to-head of
                intermittent versus continuous dosing in humans. That trial does not exist. The
                numbers are the mechanism above plus observed practice &mdash; a reasonable range,
                not a settled law. Treat the <Em>logic of cycling</Em> as well-grounded and the{" "}
                <Em>specific numbers</Em> as a convention.
              </P>
              <Bullets
                items={[
                  ["The MMP mechanism", "Well cited — GHK-Cu up-regulating and modulating matrix metalloproteinases in fibroblasts and wounds rests on named primary literature you can check above."],
                  ["The phasing", "Well established — wound healing runs build → remodel → resolve as a matter of basic tissue biology, independent of GHK-Cu."],
                  ["The exact weeks-on / weeks-off", "A convention, not a finding — no controlled human trial has compared schedules. The range is inference from mechanism plus practice."],
                ]}
              />
              <P>
                One more distinction the mechanism forces. A cosmetic topical at surface
                concentrations tolerates near-continuous use far better: the exposure is low and
                it decays across the depth of the dermis, so the signal reaching any given
                fibroblast is a fraction of the applied dose. An injectable &mdash; or a
                high-concentration topical &mdash; delivers the full signaling dose straight into
                tissue. The stronger and more direct the signal, the more the program is at risk
                of being pinned open, and the more the break earns its place. The break matters in
                proportion to how loudly you are throwing the switch.
              </P>
              <P>
                None of this is a dosing prescription &mdash; it is the reasoning under one. If
                you want to see how a cycle segments a course in practice, the{" "}
                <Link href="/tools/cycle-planner" className={LINK}>cycle planner</Link> renders
                on-and-off weeks against a supply estimate; and the{" "}
                <Link href="/hormones/ghk-cu" className={LINK}>GHK-Cu monograph</Link> holds the
                reference detail on structure, copper delivery, and where the skin evidence is
                strong versus where the systemic claims outrun it. The practical takeaway is the
                one the mechanism keeps pointing at: cycle it, and let each remodeling program run
                to completion.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/ghk-cu" label="GHK-Cu — the reference monograph" />
                <CrossLink href="/families/repair" label="Repair & regenerative — the family, graded honestly" />
                <CrossLink href="/tools/cycle-planner" label="Cycle planner — on/off weeks against a supply estimate" />
                <CrossLink href="/insights/when-the-drug-works-too-well" label="Time off, the other way — why GLP-1 breaks are hard for the opposite reason" />
                <CrossLink href="/research?q=Is%20there%20any%20controlled%20human%20evidence%20comparing%20intermittent%20versus%20continuous%20GHK-Cu%20dosing%2C%20or%20is%20the%20cycling%20rationale%20purely%20mechanistic%3F" label="Ask the research agent what the human data shows" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific literature and
              simplified in places. Not medical advice, dosing guidance, or a recommendation to
              use any compound. GHK-Cu&rsquo;s remodeling biology is best evidenced in skin; the
              cycling rationale here is mechanistic, and the specific weeks-on / weeks-off schedule
              is a convention from observed practice, not a conclusion from controlled human
              trials. Verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Matrix-turnover activity over time: cycled pulses each reach resolution and reset,
      vs a continuous signal held in perpetual, never-resolving remodel. ── */
function ProgramCurve() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 640 340"
        className="mx-auto w-full max-w-xl"
        role="img"
        aria-label="A chart of matrix-remodeling activity over time. The cycled schedule rises during on-weeks and falls back to baseline resolution during off-weeks, repeating at equal peak height across three cycles. The continuous schedule rises once to an elevated plateau and stays there, never returning to baseline — perpetual build-and-remodel that never resolves."
      >
        {/* axes */}
        <line x1="66" y1="60" x2="66" y2="258" stroke="var(--color-ink)" strokeOpacity="0.2" strokeWidth="1.5" />
        <line x1="66" y1="258" x2="606" y2="258" stroke="var(--color-ink)" strokeOpacity="0.2" strokeWidth="1.5" />

        {/* baseline / resolution guide */}
        <line x1="66" y1="258" x2="606" y2="258" stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1" />
        <text x="66" y="278" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10.5" fontFamily="var(--font-mono, monospace)" letterSpacing="0.04em">RESOLVED · HOMEOSTASIS</text>

        {/* y-axis title */}
        <text x="20" y="160" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif" transform="rotate(-90 20 160)" textAnchor="middle">matrix turnover · MMP activity →</text>
        <text x="336" y="300" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif">time →</text>

        {/* continuous: rise once, plateau elevated, never returns to baseline (subtle thinning drift) */}
        <path
          d="M 66 258 C 96 258, 118 168, 150 158 C 200 143, 320 152, 606 168"
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x="470" y="150" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">continuous</text>
        <text x="470" y="166" fill="var(--color-ink)" fillOpacity="0.42" fontSize="10.5" fontFamily="var(--font-space-grotesk), sans-serif">never resolves</text>

        {/* cycled: three humps, each returning to baseline (resolution) between cycles */}
        <path
          d="M 66 258 C 96 258, 120 78, 158 78 C 196 78, 214 258, 246 258 C 276 258, 298 78, 336 78 C 374 78, 392 258, 424 258 C 452 258, 474 78, 512 78 C 550 78, 566 258, 596 258"
          fill="none"
          stroke="var(--accent-rose)"
          strokeOpacity="0.9"
          strokeWidth="2.5"
        />
        {/* peak markers to signal equal height cycle over cycle */}
        <circle cx="158" cy="78" r="3" fill="var(--accent-rose)" />
        <circle cx="336" cy="78" r="3" fill="var(--accent-rose)" />
        <circle cx="512" cy="78" r="3" fill="var(--accent-rose)" />
        <text x="158" y="64" textAnchor="middle" fill="var(--accent-rose)" fontSize="10.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">cycled</text>

        {/* off-week resolution valleys, annotated */}
        <text x="246" y="250" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="9.5" fontFamily="var(--font-mono, monospace)">off</text>
        <text x="424" y="250" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="9.5" fontFamily="var(--font-mono, monospace)">off</text>

        {/* on-phase labels along the top of each hump base */}
        <text x="158" y="326" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="9.5" fontFamily="var(--font-mono, monospace)">on</text>
        <text x="336" y="326" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="9.5" fontFamily="var(--font-mono, monospace)">on</text>
        <text x="512" y="326" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="9.5" fontFamily="var(--font-mono, monospace)">on</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Cycled dosing (rose) lets each remodeling program reach resolution during the off-weeks
        and reset, so every cycle starts on rested tissue at full effect. A continuous signal
        (dashed) holds the tissue in perpetual build-and-remodel that never returns to baseline.
        Illustrative shape, not measured data.
      </figcaption>
    </figure>
  );
}
