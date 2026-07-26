import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("peptide-half-life-engineering")!;

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
            <Section title="A hormone built to disappear">
              <P>
                When an intestinal L-cell releases{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> after a meal, the
                molecule has roughly <Em>two minutes</Em> to do its job. Then it is gone —
                not diluted, not slowly excreted, but actively taken apart. Compare that to{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link>, which
                carries the same message to the same receptor and lingers for about a{" "}
                <Em>week</Em>. Same signal, same basic shape, five thousand times the
                staying power.
              </P>
              <P>
                It is tempting to read that gap as chemistry brute-forced — a sturdier
                molecule, harder to break. It isn&rsquo;t. Nearly every long-acting peptide
                on the market is still perfectly destructible; it simply spends most of its
                life attached to something the body has already committed to protecting.
                Understanding that inversion explains the entire modern injectable class,
                why the cadence keeps stretching from daily to weekly to monthly, and why
                these molecules are far harder to manufacture than their sequences suggest.
              </P>
              <HalfLifeLadder />
            </Section>

            <Section title="Two ways the body throws a peptide away">
              <P>
                A short half-life is not a design flaw. A hormone is a sentence, and a
                sentence that never ends stops carrying information — the body needs
                signals it can switch off as fast as it switches them on. So it runs two
                disposal systems in parallel, and any peptide drug has to survive both.
              </P>
              <Bullets
                items={[
                  [
                    "Proteases cut it",
                    "the enzyme DPP-4 patrols the bloodstream and the capillary walls of the gut, and it snips two amino acids off the front end of anything presenting the right pattern. GLP-1 presents exactly that pattern. The clipped product still exists — it just no longer fits its receptor, which is a more elegant off switch than destruction",
                  ],
                  [
                    "The kidney filters it out",
                    "the glomerulus works like a sieve with a size cutoff in the tens of kilodaltons. GLP-1 weighs about 3.3 kDa. It passes straight through into urine, essentially unopposed. Even a completely protease-proof version of the hormone would still vanish within hours on this route alone",
                  ],
                ]}
              />
              <P>
                That pairing is why early attempts at long-acting peptides kept
                disappointing. Defeat the enzyme and the kidney takes what&rsquo;s left;
                defeat the kidney and the enzyme gets there first. Each trick below buys
                roughly an order of magnitude, and the weekly drugs are what you get when
                you stack them.
              </P>
            </Section>

            <Section title="Trick one: change the letter the enzyme reads">
              <P>
                DPP-4 is precise about what it cuts, which means it can be fooled by a
                single substitution near the N-terminus. Nature demonstrated this before
                any pharmacologist did.{" "}
                <Link href="/hormones/exenatide" className={LINK}>Exenatide</Link> is
                synthetic exendin-4, a peptide from Gila monster venom that happens to
                activate the human GLP-1 receptor while carrying a different amino acid at
                the position DPP-4 checks. The lizard peptide is not a cleverer drug than
                GLP-1 — it just isn&rsquo;t legible to the enzyme, and that alone stretches
                two minutes into a couple of hours.
              </P>
              <P>
                Semaglutide does the same thing deliberately, swapping in an unnatural
                amino acid at that position so the protease finds nothing to grip. Useful,
                and necessary — but on its own it is worth hours, not days. The kidney is
                still waiting.
              </P>
            </Section>

            <Section title="Trick two: hitch a ride on albumin">
              <P>
                The second trick is the one that changed the field. Attach a{" "}
                <Em>fatty acid chain</Em> to the peptide, and the fatty acid does what
                fatty acids do in blood: it binds albumin, the most abundant protein in
                plasma. The peptide is now, most of the time, a passenger on a 66 kDa
                carrier — far too large for the kidney&rsquo;s sieve, and largely shielded
                from circulating enzymes while docked.
              </P>
              <P>
                Crucially the binding is <Em>reversible</Em>. At any moment a small
                fraction rides free, active and available to the receptor, while the bulk
                sits in reserve. Albumin becomes a circulating depot that meters the drug
                out continuously — the reason a weekly injection produces a fairly steady
                exposure rather than a spike followed by nothing.
              </P>
              <P>
                The evolution of that chain is the story of the class in miniature.{" "}
                <Link href="/hormones/liraglutide" className={LINK}>Liraglutide</Link>{" "}
                carries a 16-carbon chain on a short spacer and reaches about thirteen
                hours: once daily. Semaglutide lengthens the chain to an 18-carbon diacid
                and adds a longer, more flexible spacer between peptide and fat, which
                tightens albumin binding considerably — about a week.{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>Tirzepatide</Link>{" "}
                pushes to twenty carbons. Three drugs, one idea, refined by a few atoms at
                a time.
              </P>
            </Section>

            <Section title="Why albumin, of all things">
              <P>
                Here is the part that turns a collection of tricks into a single principle.
                Albumin is not merely large — it is <Em>rescued</Em>. Cells constantly
                sample plasma proteins into internal compartments bound for degradation,
                and a receptor called FcRn reaches into those compartments, grabs albumin
                and antibodies specifically, and carries them back out to the bloodstream
                before they can be broken down. It is a salvage system, and it is the
                reason albumin and IgG survive for around three weeks while a naked peptide
                of the same journey lasts minutes.
              </P>
              <P>
                So a fatty-acid chain is not really armor. It is a boarding pass. The
                peptide doesn&rsquo;t out-engineer clearance; it attaches itself to a
                molecule the body has already decided is worth recycling, and inherits that
                decision.
              </P>
              <P>
                Seen that way, the newer scaffolds are the same move with a bigger vehicle.
                Fuse a GLP-1 analog directly to an antibody fragment and you skip the
                middleman, boarding the recycling system yourself — that is how dulaglutide
                reaches several days without any fatty acid at all. Push further and you
                get{" "}
                <Link href="/hormones/maridebart-cafraglutide" className={LINK}>maridebart cafraglutide</Link>,
                a full antibody carrying GLP-1 peptides as cargo, with a half-life measured
                in weeks and a dosing cadence measured in months. The same logic scaled up:
                the drug lasts as long as the thing it is riding.
              </P>
              <Callout label="The real insight">
                None of these tricks made the peptide tougher. Every one of them is a way
                of attaching a disposable molecule to something the body has already
                committed to keeping — albumin, an antibody, the FcRn salvage system that
                rescues both. Long-acting peptide design is less materials science than
                stowaway logistics.
              </Callout>
            </Section>

            <Section title="Trick three: slow the release instead">
              <P>
                There is a third lever that has nothing to do with the molecule at all.
                Instead of slowing how fast a drug is cleared, slow how fast it{" "}
                <Em>arrives</Em>. Deposit it under the skin in a form that dissolves
                grudgingly — microspheres, a gel, an implant — and the reservoir, not the
                kidney, sets the duration.
              </P>
              <P>
                <Link href="/hormones/leuprolide" className={LINK}>Leuprolide</Link> is the
                classic case: the peptide itself clears in hours, yet depot formulations
                cover one to six months, because the polymer matrix releases it a fragment
                at a time.{" "}
                <Link href="/hormones/lanreotide" className={LINK}>Lanreotide</Link> uses a
                self-assembling gel to the same end. The peptide was never made durable —
                only slow to leave the injection site. The fatty-acid drugs quietly borrow
                this too: they aggregate at the injection site and dissolve gradually, so
                absorption and albumin binding stretch the curve together.
              </P>
              <P>
                This produces a genuinely confusing consequence. When absorption is slower
                than elimination, the half-life you observe is really the release rate
                wearing elimination&rsquo;s clothes — the number describes the depot, not
                the drug. It is worth knowing before comparing two half-lives as though
                they measure the same thing. Our{" "}
                <Link href="/tools/half-life" className={LINK}>half-life calculator</Link>{" "}
                makes the downstream consequences visible: how many doses until
                concentrations plateau, how high the accumulation runs at steady state, and
                how far the peak-to-trough swing travels between injections.
              </P>
            </Section>

            <Section title="What a week actually buys">
              <P>
                Stretching a half-life is not simply a convenience upgrade. It changes the
                shape of the exposure curve, and with it the character of the drug. Short
                half-lives mean tall peaks and deep troughs; a long one flattens the ride,
                which for this class matters directly, since the peaks are where much of
                the nausea lives and the troughs are where the effect fades. Smoother is
                not just gentler — it is what allows the effective range to be reached at
                all.
              </P>
              <P>
                It also explains a cost structure that surprises people. A fatty acid on a
                precise side chain, joined by a purpose-built spacer, is not a step you
                append to a synthesis — it is extra chemistry followed by extra
                purification, on a molecule whose value depends entirely on what{" "}
                <Link href="/insights/where-the-powder-comes-from" className={LINK}>survives the process</Link>.
                The sequence of semaglutide is public. The reason it is hard to make well
                has never been the sequence.
              </P>
              <P>
                And it sets up the next frontier cleanly. Once you accept that duration
                comes from the vehicle rather than the peptide, the roadmap writes itself:
                bigger vehicles for monthly cadence, and vehicles rugged enough to survive
                a different route entirely — which is the thread running through{" "}
                <Link href="/insights/glp-1-in-a-pill" className={LINK}>the oral pill</Link>{" "}
                and through{" "}
                <Link href="/insights/is-there-a-glp-4" className={LINK}>every sideways move</Link>{" "}
                this field has made instead of counting upward. The receptor was solved
                years ago. Almost everything since has been a delivery problem wearing a
                pharmacology costume.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/tools/half-life" label="Half-life calculator — see accumulation and swing" />
                <CrossLink href="/insights/getting-the-molecule-in" label="The delivery problem" />
                <CrossLink href="/hormones/semaglutide" label="Semaglutide — the week-long analog" />
                <CrossLink href="/hormones/maridebart-cafraglutide" label="Maridebart cafraglutide — the monthly scaffold" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and pharmacokinetics, summarized and
              simplified from the public record; half-life figures are approximate
              population averages that vary by individual and by study. Nothing here is
              dosing guidance or medical advice. Compounds are named to explain the
              science; maridebart cafraglutide is investigational and not an approved
              treatment.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Half-life on a log scale: each trick buys roughly an order of magnitude ── */
function HalfLifeLadder() {
  const W = 600;
  // log10(minutes) mapped onto x. 1 minute sits at the axis origin.
  const X0 = 92, SPAN = 468, MAX = 4.7;
  const x = (minutes: number) => X0 + (Math.log10(minutes) / MAX) * SPAN;

  const ticks: [string, number][] = [
    ["1 min", 1],
    ["1 hr", 60],
    ["1 day", 1440],
    ["1 wk", 10080],
    ["1 mo", 43200],
  ];

  const rows: { name: string; trick: string; minutes: number; label: string; accent: string }[] = [
    { name: "GLP-1", trick: "native — nothing added", minutes: 2, label: "~2 min", accent: "var(--color-ink)" },
    { name: "Exenatide", trick: "one amino acid the protease can't read", minutes: 144, label: "~2.4 hr", accent: "var(--accent-teal)" },
    { name: "Liraglutide", trick: "+ C16 fatty acid → rides albumin", minutes: 780, label: "~13 hr", accent: "var(--accent-teal)" },
    { name: "Semaglutide", trick: "+ C18 diacid, longer spacer → holds tighter", minutes: 10080, label: "~1 wk", accent: "var(--accent)" },
    { name: "Maridebart", trick: "+ antibody scaffold → rides the antibody itself", minutes: 30240, label: "~3 wk", accent: "var(--accent-amber)" },
  ];

  const TOP = 44, ROW = 42, H = TOP + rows.length * ROW + 8;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Half-life on a logarithmic scale: native GLP-1 about two minutes, exenatide about 2.4 hours, liraglutide about 13 hours, semaglutide about one week, maridebart cafraglutide about three weeks"
      >
        {/* time gridlines */}
        {ticks.map(([label, minutes]) => (
          <g key={label}>
            <line
              x1={x(minutes)} y1={TOP - 14} x2={x(minutes)} y2={H - 14}
              stroke="var(--color-ink)" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 4"
            />
            <text
              x={x(minutes)} y={TOP - 22} textAnchor="middle"
              fill="var(--color-ink)" fillOpacity="0.35" fontSize="10"
              fontFamily="var(--font-geist-mono), monospace"
            >
              {label}
            </text>
          </g>
        ))}

        {rows.map((r, i) => {
          const yc = TOP + i * ROW + 10;
          const end = x(r.minutes);
          return (
            <g key={r.name}>
              {/* molecule name, right-aligned in the left gutter */}
              <text
                x={X0 - 10} y={yc + 4} textAnchor="end"
                fill="var(--color-ink)" fillOpacity="0.8" fontSize="11.5" fontWeight="600"
                fontFamily="var(--font-space-grotesk), sans-serif"
              >
                {r.name}
              </text>
              {/* what bought the extra time, tucked under the bar */}
              <text
                x={X0 + 2} y={yc + 21}
                fill="var(--color-ink)" fillOpacity="0.38" fontSize="8.5"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {r.trick}
              </text>

              {/* duration bar */}
              <rect
                x={X0} y={yc - 7} width={Math.max(end - X0, 3)} height="14" rx="7"
                fill={r.accent} fillOpacity={r.accent === "var(--color-ink)" ? 0.22 : 0.28}
                stroke={r.accent} strokeOpacity="0.55" strokeWidth="1"
              />
              <text
                x={end + 9} y={yc + 4}
                fill={r.accent} fillOpacity={r.accent === "var(--color-ink)" ? 0.6 : 1}
                fontSize="11" fontWeight="600"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {r.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Logarithmic scale — each step right is ten times longer. Every rung above the first
        is a way of borrowing something the body keeps.
      </figcaption>
    </figure>
  );
}
