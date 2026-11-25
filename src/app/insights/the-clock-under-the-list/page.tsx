import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-clock-under-the-list")!;

export const metadata: Metadata = {
  title:
    "How to Read a Peptide Stack: Half-Life, Shared Receptors, and Seller Timing — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Clock Under the List: Half-Life Is What a Peptide Stack Actually Is · Peptide Hormone",
    description: insight.dek,
  },
};

const REF = {
  teichman: "https://pubmed.ncbi.nlm.nih.gov/16352683/", // Teichman et al. 2006, JCEM — CJC-1295 terminal half-life ~6–8 days
  ionescu: "https://pubmed.ncbi.nlm.nih.gov/17018654/", // Ionescu & Frohman 2006, JCEM — GH pulses persist under continuous CJC-1295; trough rises
  bowers: "https://doi.org/10.1210/endo-128-4-2027", // Bowers et al. 1991, Endocrinology — GHRH + GHRP synergy
} as const;

const FAQS = [
  {
    q: "What does half-life tell you about a peptide stack?",
    a: "Half-life is how fast the concentration falls, and the dosing interval is how often the next dose arrives. Together they decide the shape the receptor sees: a brief pulse, or a level that never returns to baseline. A list that says morning, bedtime, or post-workout is asserting that shape. If no human half-life has been published, the assertion has nothing under it.",
  },
  {
    q: "Why is CJC-1295 with DAC a different clock from CJC-1295 without it?",
    a: "The drug-affinity complex lets the peptide bind albumin, and in people that stretches the terminal half-life to roughly six to eight days, with IGF-1 still elevated days later. The short GHRH fragment clears in minutes. A single name, CJC-1295, is printed on both. Ionescu and Frohman showed that growth-hormone pulses still occur during the long exposure, while the trough rises — so the long form does not delete the pulse, but it does stop the axis from returning to silence between doses.",
  },
  {
    q: "Does adding tesamorelin to CJC-1295 and ipamorelin add a third effect?",
    a: "No. Tesamorelin and CJC-1295 are both agonists at the GHRH receptor. Ipamorelin is an agonist at the ghrelin receptor, GHS-R1a, which is a second input, and the two receptors together release more growth hormone than either alone. A third name on the first receptor is the same signal again. Menus that list all three as a muscle stack are counting vials, not clocks.",
  },
  {
    q: "Can BPC-157 be timed to the morning because that is when recovery peptides work?",
    a: "A morning instruction is a pharmacokinetic claim, and BPC-157 does not have a published human half-life to support one. The human record is a handful of uncontrolled reports; the first randomized trial that could speak to benefit has not reported. Scheduling a molecule whose concentration-over-time has not been measured is how a catalog turns a wish into a protocol.",
  },
];

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/growth-repair" className="text-accent hover:text-ink">
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
            <Section title="The list is a menu. The clock is the pharmacology.">
              <P>
                Performance catalogs are organized the way a person shops. Energy. Recovery.
                A top five. Under each heading the names arrive with a time of day attached,
                as if the hour were part of the molecule. It is not. A time of day is a claim
                about <Em>pharmacokinetics</Em>: how fast the concentration rises, how fast it
                falls, and whether the next dose arrives before the last one is gone.
              </P>
              <P>
                That claim is checkable, and checking it is how a stack comes apart. Three
                questions cover almost every list. Has a human half-life been measured? Does
                that half-life, set against the interval, make a pulse or a plateau? Do the
                names hit one receptor or two? The{" "}
                <Link href="/insights/mechanism-is-not-proof" className={LINK}>
                  evidence rung
                </Link>{" "}
                is the fourth question, and it does not move because the calendar looks tidy.
              </P>
            </Section>

            <Section title="One name, two clocks">
              <P>
                <Link href="/hormones/cjc-1295" className={LINK}>CJC-1295</Link> is printed
                as if it were one compound. The short GHRH fragment — the form sold as
                &ldquo;no DAC,&rdquo; sometimes as mod GRF 1-29 — is built to be gone. Native
                GHRH itself lasts minutes in plasma; the fragment was made so a person could
                ask the pituitary for a pulse and then get out of the way. The other form
                wears a drug-affinity complex that sticks the peptide to albumin. In the human
                study that measured it, the terminal half-life was on the order of{" "}
                <Em>six to eight days</Em>, and IGF-1 was still up long after the injection (
                <a href={REF.teichman} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Teichman et&nbsp;al., JCEM, 2006
                </a>
                ).
              </P>
              <P>
                The long form does not delete the pulse. A second paper, in the same journal
                the same year, sampled growth hormone often enough to show that bursts
                continued while the trough and the mean sat higher (
                <a href={REF.ionescu} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ionescu &amp; Frohman, JCEM, 2006
                </a>
                ). What the albumin hitch changes is the silence between bursts. A secretagogue
                was supposed to leave that silence intact — that is the whole argument against
                injecting growth hormone itself, which replaces the rhythm with a plateau.
                Stretch the half-life across a week and the axis never quite returns to the
                quiet the sales page is promising.{" "}
                <Link href="/insights/two-ways-to-ask-for-growth" className={LINK}>
                  Two ways to ask for growth
                </Link>{" "}
                is the receptor story. The clock is why the receptor story can be undone by
                a suffix on the vial.
              </P>
              <ClockCompare />
              <Callout label="The suffix is the dose shape">
                &ldquo;CJC-1295&rdquo; without the words &ldquo;with DAC&rdquo; or
                &ldquo;without DAC&rdquo; is not a specification. One clears in minutes. The
                other is still present days later. A stack that uses the bare name has not
                chosen a clock.
              </Callout>
            </Section>

            <Section title="Two names on one button">
              <P>
                The muscle list that shows up everywhere is{" "}
                <Link href="/hormones/cjc-1295" className={LINK}>CJC-1295</Link>,{" "}
                <Link href="/hormones/ipamorelin" className={LINK}>ipamorelin</Link>, and{" "}
                <Link href="/hormones/tesamorelin" className={LINK}>tesamorelin</Link>.
                Counted as products, that is three. Counted as signals, it is two.
              </P>
              <P>
                Tesamorelin and CJC-1295 are both agonists at the GHRH receptor — the
                accelerator the hypothalamus already uses. Ipamorelin is an agonist at a
                different receptor, GHS-R1a, the one ghrelin uses. Giving a GHRH-receptor
                agonist together with a ghrelin-receptor agonist releases more growth hormone
                than either alone; that synergy was shown decades ago and it is the one part
                of the folklore that is actually a result (
                <a href={REF.bowers} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Bowers et&nbsp;al., Endocrinology, 1991
                </a>
                ). Putting tesamorelin on top of CJC-1295 does not open a third path. It
                presses the first button again. The only GHRH analog in that trio with an
                approved outcome — visceral fat, in HIV lipodystrophy — is tesamorelin, and
                that label does not transfer to the other two names because they share a
                receptor.
              </P>
              <P>
                The same arithmetic catches the opposite error, the one that treats a weekly
                incretin as if it lived on the secretagogue&rsquo;s clock.{" "}
                <Link href="/hormones/semaglutide" className={LINK}>Semaglutide</Link> is
                engineered to a half-life of about a week; late in that week the level is
                still about half of what it was the day after the injection, which is the
                point of{" "}
                <Link href="/insights/the-week-is-not-flat" className={LINK}>
                  the week is not flat
                </Link>
                . A short GHRH fragment dosed at night is gone by morning. Drawing both on
                one twelve-week bar, as a &ldquo;recomp stack,&rdquo; hides two exposures
                that barely share an hour. How albumin binding and protease resistance buy
                that week is{" "}
                <Link href="/insights/peptide-half-life-engineering" className={LINK}>
                  half-life engineering
                </Link>
                . The{" "}
                <Link href="/tools/half-life" className={LINK}>calculator</Link> will draw
                the curve once you have a real half-life to give it.
              </P>
            </Section>

            <Section title="A clock you are not allowed to invent">
              <P>
                Recovery lists fail the first question, which makes the other two moot.
                BPC-157, TB-500, and the copper peptide GHK-Cu are grouped because they are
                sold for the same wish — tissue that heals faster — and then assigned
                mornings, as if the hour were known. A morning is a statement that the
                concentration peaks then and matters then. For{" "}
                <Link href="/hormones/bpc-157" className={LINK}>BPC-157</Link> there is no
                published human half-life to be early or late relative to. The human record
                is uncontrolled clinic series; the randomized trial that could speak to
                benefit has not reported. That audit is{" "}
                <Link href="/insights/the-trial-that-hasnt-reported" className={LINK}>
                  the trial that hasn&rsquo;t reported
                </Link>
                .
              </P>
              <P>
                This is the move the long ebooks make, and it is worth naming because it
                sounds like caution. They tell you to journal energy, to take the repair
                peptide in the morning and the growth peptide at bedtime, to cycle so you
                do not build tolerance. The journal is fine. The schedule is a story about
                concentration over time, and a story about concentration requires a
                measurement. Where the measurement exists — tesamorelin&rsquo;s daily GHRH
                pulse, semaglutide&rsquo;s week, CJC-1295&rsquo;s albumin-bound days — use
                it, and notice when two lines on the menu are the same line. Where it does
                not exist, the honest sentence is shorter than a protocol: the clock has
                not been measured, so the hour on the page is decoration.
              </P>
              <Bullets
                items={[
                  ["Ask for the half-life first", "A time of day, a cycle, or a “loading week” is a claim that concentration has a shape. No published human half-life, no shape."],
                  ["Compare the half-life to the interval", "Much shorter than the interval is a pulse. On the order of the interval is a level that is still there at the next dose. The long CJC-1295 raises the trough; it does not have to abolish pulses to stop being the silence it was sold as."],
                  ["Count receptors, not vials", "CJC-1295 and tesamorelin are one GHRH-receptor signal. Ipamorelin is the second receptor, and that pair is the synergy. A third vial on the first receptor is not a third effect."],
                  ["Then read the rung", "Synergy of GHRH plus a GHRP on growth-hormone release is a human result. A twelve-week muscle outcome for the gray-market list is not. Mechanism and a tidy calendar do not promote the rung."],
                ]}
              />
            </Section>

            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/tools/cycle-planner" label="Cycle planner — the same lists, with the clock written under each goal" />
                <CrossLink href="/insights/two-ways-to-ask-for-growth" label="Two ways to ask for growth — GHRH versus the ghrelin receptor" />
                <CrossLink href="/insights/peptide-half-life-engineering" label="Half-life engineering — how a minutes-long hormone is made to last a week" />
                <CrossLink href="/insights/the-week-is-not-flat" label="The week is not flat — what a seven-day half-life feels like" />
                <CrossLink href="/insights/the-trial-that-hasnt-reported" label="The trial that hasn't reported — BPC-157's human record" />
                <CrossLink href="/insights/mechanism-is-not-proof" label="Mechanism is not proof — the rung under any of these claims" />
                <CrossLink href="/tools/half-life" label="Half-life calculator — pulse versus plateau, once a half-life is real" />
                <CrossLink href="/insights/how-to-read-peptide-dosing" label="How to read a peptide dose — four kinds of milligram" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on how to read pharmacokinetic claims in peptide marketing,
              drawn from public literature. Not a dosing schedule, a stack, or medical advice.
              Half-lives are cited from the papers named above; a catalog&rsquo;s morning or
              bedtime label is described as a claim, not endorsed. Verify the numbers against
              the linked sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

function ClockCompare() {
  const rows = [
    { name: "GHRH fragment (no DAC)", clock: "Minutes", shape: "A pulse, then silence", tone: 0.35 },
    { name: "CJC-1295 with DAC", clock: "About 6–8 days", shape: "Pulses continue; the trough stays up", tone: 0.7 },
    { name: "Injected growth hormone", clock: "The dose sets a level", shape: "A plateau in place of the rhythm", tone: 0.95 },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <figcaption className="border-b border-ink/10 px-5 py-4">
        <div className="font-display text-sm font-semibold text-ink/80">Same wish, three clocks</div>
        <p className="mt-1 text-xs leading-5 text-ink/45">
          Asking for growth hormone is not one exposure. The half-life is the exposure.
        </p>
      </figcaption>
      <ul className="divide-y divide-ink/[0.06]">
        {rows.map((r) => (
          <li key={r.name} className="grid gap-1 px-5 py-4 sm:grid-cols-[1.2fr_0.8fr_1.2fr] sm:items-center sm:gap-4">
            <span className="text-sm font-medium text-ink/85">{r.name}</span>
            <span className="font-mono text-xs text-accent">{r.clock}</span>
            <span className="flex items-center gap-3 text-sm text-ink/60">
              <span
                className="h-1.5 flex-1 rounded-full bg-accent/20"
                aria-hidden
              >
                <span
                  className="block h-1.5 rounded-full bg-accent"
                  style={{ width: `${r.tone * 100}%` }}
                />
              </span>
              <span className="w-44 shrink-0 text-xs leading-5">{r.shape}</span>
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
