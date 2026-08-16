import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { aboutPageLd } from "@/lib/jsonld";
import { HORMONES, getHormone } from "@/lib/hormones";
import { FAMILIES } from "@/lib/families";

const MOLECULES = HORMONES.length;
const FAMILY_COUNT = FAMILIES.length;

const DESCRIPTION =
  "The body already speaks in peptides — short chains of amino acids that carry almost every instruction worth giving. This is why PeptideHormone exists: to map that language, and the engineering now rewriting it, with equal parts wonder and rigor.";

export const metadata: Metadata = {
  title: "Why peptides",
  alternates: { canonical: "/why-peptides" },
  description: DESCRIPTION,
  openGraph: {
    title: "Why peptides · Peptide Hormone",
    description:
      "Why this reference exists: the body's own signaling language, the engineering rewriting it, and the discipline of saying only what the evidence will bear.",
  },
};

export default function WhyPeptides() {
  return (
    <>
      <JsonLd
        data={aboutPageLd({
          path: "/why-peptides",
          name: "Why peptides",
          crumb: "Why peptides",
          description: DESCRIPTION,
        })}
      />
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Header ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <p className="font-mono text-xs uppercase tracking-wide text-accent">Why this exists</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Why peptides
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">{DESCRIPTION}</p>
          </Container>
        </section>

        <Container className="max-w-3xl py-14 md:py-18">
          <article className="space-y-12">
            <Section title="The body's shortest sentences">
              <P>
                Before there were drugs, there was the signal. Strip away the machinery
                and almost every instruction the body gives itself is a short chain of
                amino acids — a dozen residues, sometimes three, carrying a message
                between cells that have no other way to talk. <Em>Eat.</Em>{" "}
                <Em>Stop eating.</Em> <Em>Grow.</Em> <Em>Heal this.</Em>{" "}
                <Em>Sleep now.</Em> The vocabulary is tiny and the reach is enormous, and
                that disproportion is the single most interesting fact in the field.
              </P>
              <P>
                Brevity is not a limitation here; it is the design. A hormone is a
                sentence, and a sentence that never ends stops carrying information. So
                the body writes short and destroys fast — most of these molecules are
                taken apart within minutes of being made, on purpose, so the next
                instruction can mean something different from the last.
              </P>
              <SignalLadder />
            </Section>

            <Section title="Then medicine learned the grammar">
              <P>
                For most of a century that was the end of the story: a beautiful
                signaling language nobody could write in. The very properties that make
                peptides good messengers — small, fragile, gone in minutes — make them
                terrible drugs. You cannot swallow one, and injecting one buys you a few
                minutes of effect.
              </P>
              <P>
                Then, in the span of about fifteen years, the field learned to write.
                Native <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> survives
                roughly two minutes;{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link>{" "}
                carries the same message to the same receptor for about a week. That is a
                five-thousand-fold gap, and it was not won by making the molecule tougher
                — it was won by attaching it to something the body had already decided to
                keep. The same inversion is now producing pills where only needles worked,
                molecules that hit two receptors at once, and cadences stretching toward
                monthly.
              </P>
              <Callout label="The thesis">
                The interesting frontier is not any single molecule. It is that a
                signaling language the body has used for hundreds of millions of years
                turned out to be <Em>writable</Em> — and we are early enough in that
                turn that most of what will be built has not been built yet.
              </Callout>
            </Section>

            <Section title="What a reference owes you">
              <P>
                That is a genuinely thrilling place to be standing, and it is exactly the
                condition under which people get sold things. A frontier is loud. The gap
                between what a molecule has been shown to do and what it is described as
                doing is widest precisely where the science is newest — and a reader
                arriving with a real question deserves better than to be marketed at.
              </P>
              <P>
                So the discipline is the other half of the work, not a disclaimer bolted
                onto it. {MOLECULES} molecules across {FAMILY_COUNT} signaling families,
                every mechanism traced to primary literature and cited by PMID, every
                compound carrying a visible rigor grade from <Em>Established</Em> down to{" "}
                <Em>Limited</Em> so you can calibrate before you read. Where the evidence
                is thin, the page says thin. Where a figure comes from a rodent, it says
                rodent. Downgrading a claim is free here; upgrading one requires a source.
              </P>
              <P>
                We host no storefront. One affiliate relationship is disclosed in full on{" "}
                <Link href="/methodology" className={LINK}>the methodology page</Link> and
                gated on data — the sourcing note appears only where a molecule is
                genuinely stocked, never as a blanket pitch — because the incentive that
                should shape a catalog is to be correct, not to sell. And because
                cataloged is not the same as reachable, we publish{" "}
                <Link href="/available" className={LINK}>what you can actually get</Link>{" "}
                as data rather than pretending the question does not exist.
              </P>
            </Section>

            <Section title="The two truths">
              <P>
                So every page holds two things at once. We are <Em>bullish on the
                science</Em> — a signaling system this old, this economical, and this
                suddenly writable has earned real enthusiasm, and pretending otherwise
                would be its own kind of dishonesty. And we are <Em>sceptical on the
                page</Em> — because enthusiasm that outruns its citations is just
                marketing with better vocabulary.
              </P>
              <P>
                Where the science is settled, we say so plainly. Where it is unsettled, we
                call it the frontier rather than a sure thing, and we tell you which one
                you are reading. The wonder is real. It is also earned, page by page,
                citation by citation.
              </P>
              <ul className="space-y-2.5 text-[15px] leading-7">
                <CrossLink href="/catalog" label="Browse the catalog — every molecule, graded and cross-linked" />
                <CrossLink href="/insights/peptide-half-life-engineering" label="Two minutes to seven days — how a disposable hormone became a weekly drug" />
                <CrossLink href="/methodology" label="Methodology & standards — how we source, grade, and bound this reference" />
              </ul>
            </Section>

            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <p className="font-display text-base font-semibold">Education, not a protocol</p>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                This page explains why the peptide hormone system matters and why this
                reference is built the way it is. It is not medical advice, and it is not
                a protocol — nothing here is a recommendation to take anything. For how
                the reference is built and where it stops, see{" "}
                <Link href="/methodology" className="text-accent hover:underline">
                  methodology &amp; standards
                </Link>
                .
              </p>
            </div>
          </article>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}

/* ── The same signal, said three ways ──────────────────────────────────────
   The site's thesis in one figure: the same message to the same receptor, at
   three wildly different durations. Every row reads its half-life from the
   catalog (lib/hormones) rather than carrying its own copy, so the figure
   cannot drift from the monographs it links to.

   The bars are genuinely logarithmic — log10(minutes) normalized to the
   longest-acting row. A linear axis would render native GLP-1 as a fraction of
   one pixel beside semaglutide, which is the point being made, so the scale is
   stated rather than quietly chosen. */
const LADDER = [
  { slug: "glp-1", label: "Native GLP-1", sub: "the body's own sentence", color: "var(--accent-teal)" },
  { slug: "liraglutide", label: "Liraglutide", sub: "acylated — holds onto albumin", color: "var(--accent-blue)" },
  { slug: "semaglutide", label: "Semaglutide", sub: "re-engineered to hold on far longer", color: "var(--accent)" },
] as const;

/**
 * The catalog's half-life strings carry a qualifying parenthetical for the
 * monograph ("~1–2 min (native; DPP-4 cleaved)"). In the figure that detail is
 * already carried by the row's own caption and wraps to two lines on a phone,
 * so the headline figure is shown here and the full string stays one click away
 * on the linked monograph.
 */
function headlineDuration(halfLife: string): string {
  return halfLife.split(" (")[0].trim();
}

function SignalLadder() {
  const rows = LADDER.map((row) => {
    const h = getHormone(row.slug);
    return { ...row, halfLife: h?.halfLife, minutes: h?.halfLifeMin };
  }).filter((r): r is typeof r & { halfLife: string; minutes: number } =>
    Boolean(r.halfLife && r.minutes),
  );
  if (rows.length === 0) return null;

  const maxLog = Math.max(...rows.map((r) => Math.log10(r.minutes)));

  return (
    <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-surface-deep/60 p-6">
      <figcaption className="font-mono text-[11px] uppercase tracking-wide text-ink/40">
        One signal, three ways to say it
      </figcaption>
      <ul className="mt-5 space-y-4">
        {rows.map((r, i) => (
          <li key={r.slug}>
            <div className="flex items-baseline justify-between gap-4">
              <Link
                href={`/hormones/${r.slug}`}
                className="text-sm font-medium text-ink/85 transition-colors hover:text-accent"
              >
                {r.label}
              </Link>
              <span
                title={r.halfLife}
                className="font-mono text-xs tabular-nums text-ink/55"
              >
                {headlineDuration(r.halfLife)}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.07]">
              <div
                className="signal-bar h-full rounded-full"
                style={{
                  width: `${Math.max((Math.log10(r.minutes) / maxLog) * 100, 2)}%`,
                  background: r.color,
                  animationDelay: `${i * 0.14}s`,
                }}
              />
            </div>
            <p className="mt-1 text-xs leading-5 text-ink/45">{r.sub}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs leading-5 text-ink/40">
        Circulating half-life on a logarithmic scale, read from the catalog. On a linear
        axis the native peptide would be a fraction of a pixel beside semaglutide — which
        is precisely the gap the engineering had to close. A fourth route drops the
        peptide altogether:{" "}
        <Link href="/insights/glp-1-in-a-pill" className="text-ink/60 underline decoration-ink/20 underline-offset-2 hover:text-accent">
          small molecules that trip the same receptor
        </Link>{" "}
        answer to a different clock entirely.
      </p>
    </figure>
  );
}
