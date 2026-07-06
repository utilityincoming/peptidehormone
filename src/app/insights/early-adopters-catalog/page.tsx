import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("early-adopters-catalog")!;

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
            <Section title="The users were the R&D">
              <P>
                Every technology has a fringe that arrives early, tinkers hard, and turns
                out — often enough — to have been pointed in the right direction. For
                peptide hormones, that fringe was the performance and longevity
                community: bodybuilders first, then the anti-aging and hormone-optimization
                clinics that grew up alongside them. Decades before{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> drugs became a
                household word, these were the people already running{" "}
                <Link href="/hormones/growth-hormone" className={LINK}>growth hormone</Link>,{" "}
                <Link href="/hormones/igf-1" className={LINK}>IGF-1</Link>, the GH
                secretagogues, and hormonal support protocols — reading the primary
                literature, comparing notes, and iterating faster than any formal program
                could.
              </P>
              <P>
                It is easy to be dismissive about that history. The better read is the
                generous one: an intensely motivated user base was functioning as the
                field&rsquo;s informal, distributed R&amp;D. They surfaced compounds,
                stacked them, and mapped rough dose-response by trial and error — and a
                striking amount of what they gravitated toward is exactly what
                well-funded biotech is now studying, formalizing, and improving.
              </P>
            </Section>

            <Section title="How demand wrote the catalog">
              <P>
                That early demand did something lasting: it shaped <Em>supply</Em>. The
                menu of peptides you can browse today — across research-chemical synthesis
                companies and compounding pharmacies alike — carries the fingerprints of
                what that community asked for first.
              </P>
              <Bullets
                items={[
                  ["The growth axis, productized", "Sustained interest in the somatotropic axis pulled GH-releasing peptides and secretagogues — the ghrelin-mimetic GHRPs and the GHRH analogs — into catalogs long before mainstream medicine paid attention to them."],
                  ["Compounding met the demand", "Compounding pharmacies and hormone-optimization clinics built entire menus around hormone replacement and peptide adjuncts, normalizing the idea that these molecules could be personalized rather than one-size-fits-all."],
                  ["A vocabulary of stacks", "The community's habit of thinking in combinations — a base plus goal-specific additions — prefigured exactly the combination-therapy logic biotech now runs in trials."],
                ]}
              />
              <P>
                In other words, the modern peptide catalog didn&rsquo;t appear top-down
                from pharma. A big part of it grew bottom-up, from a user base that knew
                what it wanted and created the market that made those molecules
                available. The{" "}
                <Link href="/families/growth-repair" className={LINK}>growth &amp; repair family</Link>{" "}
                is, in many ways, that history written into the reference.
              </P>
            </Section>

            <Section title="Foundation first">
              <P>
                Underneath all the compound-chasing, the community converged on a
                principle that has aged remarkably well: <Em>get the foundation right
                first</Em>. Before layering on goal-specific peptides, optimize the
                hormonal base — thyroid, the sex-hormone axis (testosterone and broader
                HRT), the GH/IGF-1 axis, and above all metabolic control:{" "}
                <Link href="/hormones/insulin" className={LINK}>insulin</Link> sensitivity
                and glucose regulation.
              </P>
              <StackDiagram />
              <P>
                The logic is genuinely good biology. Peptide signals{" "}
                <Em>amplify a system</Em>; they work best when the system underneath them
                is well-regulated. A GH secretagogue does more for someone whose sleep,
                thyroid, and insulin sensitivity are dialed in than for someone whose
                foundation is a mess. The community&rsquo;s instinct — that the safest,
                highest-return move is to fix the base before reaching for the exotic —
                is the same instinct good clinical medicine applies when it treats the
                metabolic groundwork before the fine-tuning.
              </P>
            </Section>

            <Section title="The metabolic era proved the instinct">
              <P>
                Here is the satisfying part. The single biggest medical story of the
                decade — the{" "}
                <Link href="/families/incretins-metabolic" className={LINK}>incretin drugs</Link>,{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link> and{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link> —
                is, at its core, a rigorous, randomized-trial vindication of{" "}
                <Em>metabolic control as the foundation</Em>. Get glucose and insulin
                signaling working right, and a cascade of health benefits follows. That
                was the community&rsquo;s bet all along; the difference now is that it has
                outcome data behind it.
              </P>
              <P>
                And the frontier keeps rhyming with the old wisdom. The push to pair GLP-1
                drugs with{" "}
                <Link href="/hormones/myostatin" className={LINK}>myostatin</Link>{" "}
                inhibition to{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>preserve
                muscle through weight loss</Link>{" "}
                is the foundation-first, think-in-stacks mindset — a base therapy plus a
                complementary signal — arriving in phase-2 trials. The community was
                stacking for body composition years ago; biotech is now doing it with a
                control arm.
              </P>
            </Section>

            <Section title="From anecdote to evidence — and that's the win">
              <P>
                None of this is an argument that the early adopters were right about
                everything, or that forum experience substitutes for a trial. It is the
                opposite, and better: the exciting arc is <Em>anecdote maturing into
                evidence</Em>. The directional hunches that the community surfaced are
                being run through real pharmacology, real safety work, and real trials —
                which is how you keep the signal, drop the noise, and make the whole thing
                safer and more effective than the first generation ever was.
              </P>
              <Callout label="The through-line">
                The best-ROI idea the early adopters had — foundation first, then layer
                deliberately — turns out to be exactly right, and it is finally getting
                the rigor it deserves. That is the optimistic center of this whole field:
                a motivated community pointed at the right targets, and the science is now
                catching up and doing it properly. This{" "}
                <Link href="/catalog" className={LINK}>catalog</Link> exists to hold both
                at once — the history that got us here, and the evidence grade that tells
                you where each compound actually stands today.
              </Callout>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/insulin-to-the-peptide-boom" label="From insulin to the peptide boom (the century-long arc)" />
                <CrossLink href="/insights/glp-1-muscle-preservation" label="Keeping the muscle on GLP-1 (foundation + stack, in trials)" />
                <CrossLink href="/families/growth-repair" label="The growth & repair family" />
                <CrossLink href="/catalog" label="See the evidence-graded catalog" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              An editorial history, summarized and simplified from the public record. Not
              medical advice or a recommendation to use any compound or hormone; hormonal
              optimization belongs with a qualified clinician and appropriate monitoring.
              Compounds and categories are named to tell the story, not to endorse them.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Foundation-first stack: base regulated → signals layered on top ── */
function StackDiagram() {
  // Ordered top → bottom; the base (last) is the highlighted foundation.
  const layers: { label: string; sub: string; color: string; highlight?: boolean }[] = [
    { label: "Goal-specific peptides", sub: "GH secretagogues · repair signals · incretins", color: "var(--accent-blue)" },
    { label: "Metabolic control", sub: "insulin sensitivity · glucose regulation", color: "var(--accent-teal)" },
    { label: "Hormonal foundation", sub: "thyroid · testosterone / HRT · GH–IGF-1 axis", color: "var(--accent-amber)", highlight: true },
  ];
  const W = 520, layerH = 66, gap = 12, x = 92, w = 360, padTop = 14;
  const H = layers.length * layerH + (layers.length - 1) * gap + padTop * 2;
  const yAt = (i: number) => padTop + i * (layerH + gap);

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img" aria-label="The foundation-first stack: a regulated hormonal and metabolic base, with goal-specific peptides layered on top">
        {/* build-order arrow: base upward */}
        <g>
          <line x1={46} y1={yAt(layers.length - 1) + layerH - 6} x2={46} y2={yAt(0) + 10} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
          <path d={`M ${46 - 5} ${yAt(0) + 12} L ${46} ${yAt(0) + 3} L ${46 + 5} ${yAt(0) + 12}`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
          <text x={46} y={yAt(layers.length - 1) + layerH + 8} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily="var(--font-geist-mono), monospace">
            build up
          </text>
        </g>
        {layers.map((n, i) => (
          <g key={n.label}>
            <rect
              x={x}
              y={yAt(i)}
              width={w}
              height={layerH}
              rx={14}
              fill={n.highlight ? "color-mix(in srgb, var(--accent-amber) 12%, transparent)" : "var(--panel)"}
              stroke={n.color}
              strokeOpacity={n.highlight ? 0.7 : 0.35}
              strokeWidth={n.highlight ? 2 : 1}
            />
            <text x={W / 2 + 46} y={yAt(i) + 28} textAnchor="middle" fill="var(--color-ink)" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              {n.label}
            </text>
            <text x={W / 2 + 46} y={yAt(i) + 48} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11.5">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The community&rsquo;s rule of thumb, now the mainstream instinct: get the base
        regulated, and everything layered above it works better — and safer.
      </figcaption>
    </figure>
  );
}
