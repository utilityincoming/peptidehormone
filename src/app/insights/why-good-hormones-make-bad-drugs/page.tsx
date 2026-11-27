import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("why-good-hormones-make-bad-drugs")!;

export const metadata: Metadata = {
  title:
    "Why Good Hormones Make Bad Drugs: The Four Recurring Reasons Physiology Resists Pharmacology — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — the headline failures; each example's full
// citations live in its own linked deep-dive.
const REF = {
  cck: "https://pubmed.ncbi.nlm.nih.gov/17597711/", // Jordan et al. — Clin Pharmacol Ther 2008: CCK agonist, no weight loss
  leptin: "https://pubmed.ncbi.nlm.nih.gov/10546697/", // Heymsfield et al. — JAMA 1999: recombinant leptin, modest/variable
  deficiency: "https://pubmed.ncbi.nlm.nih.gov/11856796/", // Oral et al. — NEJM 2002: leptin replacement in lipodystrophy
  elamipretide: "https://pubmed.ncbi.nlm.nih.gov/37268435/", // Karaa et al. — Neurology 2023: MMPOWER-3, primary endpoints not met
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
            <Section title="A pattern that keeps repeating">
              <P>
                Read enough of these deep-dives and the same shape appears in every family. A
                hormone with a <Em>vivid, unmistakable</Em> physiological effect — the kind you
                can feel or measure in minutes — turns out to be nearly impossible to turn into a
                drug.{" "}
                <Link href="/insights/the-brake-and-the-alarm" className={LINK}>Cholecystokinin</Link>{" "}
                ends your meal, yet a CCK agonist in trials produced no weight loss (
                <a href={REF.cck} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jordan et&nbsp;al., 2008
                </a>
                ).{" "}
                <Link href="/insights/the-signal-you-cant-turn-up" className={LINK}>Leptin</Link>{" "}
                tells the brain the fat stores are full, yet giving more barely moves common
                obesity (
                <a href={REF.leptin} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Heymsfield et&nbsp;al., 1999
                </a>
                ).{" "}
                <Link href="/insights/the-receptor-outlived-the-drug" className={LINK}>Calcitonin</Link>{" "}
                lowers calcium cleanly, yet its drug faded.{" "}
                <Link href="/insights/the-antibiotic-that-kept-time" className={LINK}>Motilin</Link>{" "}
                empties the stomach, yet a durable prokinetic never arrived.
              </P>
              <P>
                The biology is real every time. What refuses is the pharmacology. This is not bad
                luck repeated; it is a small number of <Em>recurring reasons</Em> that a good
                hormone makes a bad drug — and naming them is more useful than being surprised
                each time. It is also the companion to{" "}
                <Link href="/insights/mechanism-is-not-proof" className={LINK}>mechanism is not proof</Link>:
                that piece is about how to <Em>grade</Em> evidence; this one is about the
                mechanisms that keep the evidence from ever arriving.
              </P>
              <FailureModeFigure />
            </Section>

            <Section title="1. Homeostasis compensates">
              <P>
                Many hormones carry a <Em>short-term</Em> message — &ldquo;this meal can end,&rdquo;
                &ldquo;calcium is a little high right now&rdquo; — and the body answers short-term
                signals by adjusting around them. CCK is the clean example: it genuinely produces
                satiety, but satiety ends <Em>a</Em> meal, and the next meal starts from the
                set-point the body actually defends. Push the meal-ending signal harder with a
                drug and intake at the next meal quietly compensates. A brake that taps and
                releases cannot hold a weight down for months.
              </P>
              <P>
                This is why the durable obesity drugs act on the slow, set-point machinery rather
                than the fast &ldquo;stop&rdquo; signals — and why{" "}
                <Link href="/insights/the-signal-you-cant-turn-up" className={LINK}>leptin&rsquo;s
                defended set-point</Link>{" "}
                is so hard to overrule. You cannot win a negotiation with homeostasis by shouting
                one of its inputs.
              </P>
            </Section>

            <Section title="2. Continuous exposure desensitizes">
              <P>
                The second reason is built into the most common receptor type in the body. Flood a
                receptor with a constant high signal and it <Em>turns its own gain down</Em> —
                internalizing, recruiting feedback inhibitors, going quiet. So &ldquo;more&rdquo;
                stops meaning &ldquo;louder.&rdquo; It is exactly why{" "}
                <Link href="/insights/the-signal-you-cant-turn-up" className={LINK}>adding leptin to an
                already-high level does almost nothing</Link>, and it is the same physics that
                makes the body write its master controls in{" "}
                <Link href="/insights/the-body-keeps-time" className={LINK}>pulses rather than
                amounts</Link>
                : continuous GnRH switches the reproductive axis off, continuous PTH dissolves the
                bone that brief daily PTH builds.
              </P>
              <P>
                For a drug designer this is a trap with a narrow exit. A continuously present
                agonist — the easy thing to formulate — is often the surest way to silence the
                target. The successful hormone drugs tend to respect the rhythm, not override it.
              </P>
            </Section>

            <Section title="3. The lever only works in deficiency">
              <P>
                A third pattern is subtler and catches whole programmes off guard: some hormones
                do a great deal when they are <Em>missing</Em> and almost nothing when they are
                merely being augmented. Leptin is transformative where the body genuinely lacks
                it — in the lipodystrophies (
                <a href={REF.deficiency} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Oral et&nbsp;al., 2002
                </a>
                ) — and inert in the common obesity where leptin is already high.{" "}
                <Link href="/insights/the-receptor-outlived-the-drug" className={LINK}>Calcitonin</Link>{" "}
                tells a similar story: a modest drug, outlived by the blood test and by its own
                receptor&rsquo;s second life.
              </P>
              <P>
                Replacement and augmentation are different businesses. A hormone that corrects a
                deficiency state is a genuine medicine for the people who lack it, and a
                disappointment the moment it is marketed to everyone else — a distinction that
                looks obvious in hindsight and is missed with striking regularity.
              </P>
            </Section>

            <Section title="4. A real mechanism, aimed at the wrong disease">
              <P>
                The last pattern is the cruelest, because the mechanism is not merely real —
                it&rsquo;s beautiful. A molecule with an elegant, broad mechanism gets carried from
                indication to indication, failing each big controlled trial, until it reaches the
                one disease its mechanism was practically cut for.{" "}
                <Link href="/insights/a-mechanism-in-search-of-a-disease" className={LINK}>Elamipretide</Link>{" "}
                is the case in point: it stabilizes cardiolipin and looked applicable anywhere
                mitochondria fail, yet it missed its primary endpoints in mitochondrial myopathy (
                <a href={REF.elamipretide} target="_blank" rel="noopener noreferrer" className={LINK}>
                  MMPOWER-3, 2023
                </a>
                ) and in dry macular degeneration, and found a foothold only in Barth syndrome — a
                cardiolipin disease.
              </P>
              <P>
                The inverse failure is worth naming too, because it looks identical from a
                distance: a mechanism that is real but produces no benefit <Em>anywhere</Em>, sold
                on the strength of the story alone — the{" "}
                <Link href="/insights/the-first-word" className={LINK}>secretin-for-autism</Link>{" "}
                episode, dismantled by trial after trial. The first case is a mechanism waiting for
                the right disease; the second is a mechanism mistaken for a result. Telling them
                apart is the whole job.
              </P>
              <Callout label="The through-line">
                Physiology is not a bank of knobs you can turn up. It compensates, it desensitizes,
                it guards a floor more fiercely than a ceiling, and it answers only where there is a
                real gap to fill. A clear mechanism is the <Em>start</Em> of a drug programme, not
                the end of one — which is why this reference stays bullish on the biology and
                careful about the pill. Vivid biology, uncooperative pharmacology.
              </Callout>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/mechanism-is-not-proof" label="Mechanism is not proof — the evidence ladder" />
                <CrossLink href="/insights/the-signal-you-cant-turn-up" label="The signal you can't turn up — leptin resistance" />
                <CrossLink href="/insights/the-brake-and-the-alarm" label="The brake and the alarm — CCK" />
                <CrossLink href="/insights/a-mechanism-in-search-of-a-disease" label="A mechanism in search of a disease — elamipretide" />
                <CrossLink href="/insights/the-body-keeps-time" label="The body keeps time — pulsatility and desensitization" />
                <CrossLink href="/insights/four-ways-to-hear-a-hormone" label="Four ways to hear a hormone — the receptor classes" />
                <CrossLink
                  href="/research?q=What%20are%20the%20recurring%20mechanistic%20reasons%20that%20physiologically%20important%20hormones%20fail%20to%20become%20useful%20drugs%20%E2%80%94%20homeostatic%20compensation%2C%20receptor%20desensitization%2C%20deficiency-only%20efficacy%2C%20and%20indication%20mismatch%3F"
                  label="Ask the research agent about druggability"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational synthesis of themes drawn from the linked deep-dives, summarized from the
              public record. Not individualized medical advice. Each example&rsquo;s primary
              citations live in its own article; the named trials are linked above. Verify any
              claim against those sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Four recurring reasons a good hormone makes a bad drug ── */
function FailureModeFigure() {
  const rows: { n: string; mode: string; example: string }[] = [
    { n: "1", mode: "Homeostasis compensates", example: "CCK satiety — the next meal adjusts" },
    { n: "2", mode: "Continuous exposure desensitizes", example: "leptin resistance; continuous vs. pulsed" },
    { n: "3", mode: "The lever only works in deficiency", example: "leptin in lipodystrophy, not obesity" },
    { n: "4", mode: "A real mechanism, wrong disease", example: "elamipretide: failed broad, fit Barth" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5">
      <div className="text-center font-mono text-[11px] uppercase tracking-wide text-ink/45">
        Vivid biology → uncooperative pharmacology
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.n} className="flex items-center gap-3 rounded-xl border border-ink/10 bg-panel/30 px-4 py-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/12 font-display text-sm font-semibold text-accent" aria-hidden>
              {r.n}
            </span>
            <span className="min-w-0">
              <span className="font-display text-[15px] font-semibold text-ink/80">{r.mode}</span>
              <span className="block font-mono text-[11px] text-ink/45">{r.example}</span>
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-center text-xs text-ink/40">
        Four recurring ways a physiologically real hormone resists becoming a drug — a taxonomy of the gap between knowing how
        a signal works and being able to use it.
      </figcaption>
    </figure>
  );
}
