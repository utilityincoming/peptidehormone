import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("one-receptor-a-whole-family")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources - named inline so the evidence grade stays checkable.
const REF = {
  bimagrumab: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3911487/",
  homology: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8080601/",
  quant: "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(16)30245-5",
  rejuv: "https://www.aging-us.com/article/202881/text",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(181,140,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/muscle-tgfb" className="text-accent-purple hover:text-ink">
                Muscle &amp; TGF-&beta;
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
            <Section title="The brake has a backup">
              <P>
                It is tempting to treat{" "}
                <Link href="/hormones/myostatin" className={LINK}>myostatin</Link> as the
                muscle brake - singular, the one switch to block. It is not. Myostatin is
                one member of a small committee, and the others push in the same direction
                through the very same hardware. Knocking out myostatin alone lifts the
                ceiling on muscle, but not as far as you would expect from a sole
                regulator, because when it goes quiet its relatives keep signaling.
              </P>
              <P>
                That redundancy is not a footnote. It is the single fact that decides how
                every muscle-preservation drug is designed - which molecule to hit, at what
                altitude, and what you unavoidably drag along with it.
              </P>
            </Section>

            <Section title="One dock, many ligands">
              <P>
                All of these signals converge on a shared entry point: the{" "}
                <Em>activin type&nbsp;II receptors</Em>, ActRIIA and ActRIIB. A ligand
                docks there, the receptor recruits a type&nbsp;I partner (the kinases ALK4
                or ALK5), and that pair switches on{" "}
                <Link href="/hormones/activin-a" className={LINK}>Smad2/3</Link> inside the
                cell, which travels to the nucleus and tells the muscle to hold back. The
                receptor is the chokepoint - a{" "}
                <Em>major regulatory node</Em> where several ligands read out to one
                pathway.
              </P>
              <ConvergenceDiagram />
              <P>
                Myostatin is joined there by{" "}
                <Link href="/hormones/activin-a" className={LINK}>activin&nbsp;A</Link> -
                which has its own broad portfolio in fibrosis, inflammation, and
                reproduction - and by GDF-11, a growth factor so close to myostatin that
                it is worth a section of its own. Block the receptor and you silence the
                committee at once. Block a single ligand and the others still get through
                the door.
              </P>
            </Section>

            <Section title="Ninety percent identical">
              <P>
                GDF-11 and myostatin are, in the part that matters, almost the same
                molecule: their mature signaling domains are about{" "}
                <Em>90% identical</Em>, differing by only eleven amino acids (
                <a href={REF.homology} target="_blank" rel="noopener noreferrer" className={LINK}>
                  GDF11 vs myostatin, review
                </a>
                ). That near-twinhood produced one of the most instructive controversies
                in recent aging science.
              </P>
              <P>
                In 2013 and 2014, headline parabiosis studies cast GDF-11 as a{" "}
                <Em>rejuvenation factor</Em>: reported to fall with age and, when restored,
                to reverse age-related heart enlargement, revive muscle stem cells, and
                spur new neurons in old mice. It was a beautiful story. Then independent
                groups pointed out a problem underneath it: the antibodies used could not
                cleanly separate GDF-11 from myostatin, so what was being measured - and
                even which direction it moved with age - was in doubt. Sharper assays found
                GDF-11 may <Em>rise</Em>, not fall, with age, and that too much of it{" "}
                <Em>impairs</Em> muscle regeneration rather than restoring it (
                <a href={REF.quant} target="_blank" rel="noopener noreferrer" className={LINK}>
                  quantifying GDF11 in aging, Cell Metabolism
                </a>
                ).
              </P>
              <Callout label="Why this is the honest part">
                When two molecules are 90% identical, the assay is the science. The
                rejuvenation claim did not collapse because the biology was fantastical -
                it stalled because the measurement could not tell two near-twins apart. The
                field&rsquo;s fix was not louder claims but a mass-spec method precise
                enough to resolve them. That is the whole creed of this site: bullish on
                the mechanism, sceptical on the readout until it is clean (
                <a href={REF.rejuv} target="_blank" rel="noopener noreferrer" className={LINK}>
                  GDF-11 in aging, review
                </a>
                ).
              </Callout>
            </Section>

            <Section title="Why redundancy sets the strategy">
              <P>
                Return to the drugs with the committee in mind, and the whole design
                spectrum from{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>
                  the muscle-preservation programs
                </Link>{" "}
                snaps into focus. It is a trade between precision and reach:
              </P>
              <Bullets
                items={[
                  ["Hit one ligand - precise, but leaky", "An antibody against myostatin alone is the cleanest intervention, with the least collateral. But activin A and GDF-11 still signal through the open receptor, so a single-ligand block leaves part of the brake engaged."],
                  ["Hit the receptor - powerful, but broad", "Bimagrumab blocks the type II receptor itself, shutting the whole committee out together - which is why it produces the strongest hypertrophy and can build muscle even on its own (Lach-Trifilieff et al.). The cost is reach: activin does real jobs elsewhere, and the receptor cannot tell muscle's business from the body's."],
                  ["Layer the ligands - tune the net", "Between the two extremes, pairing a myostatin blocker with an activin blocker widens the net one ligand at a time - trading a little selectivity for more effect without going all the way to the receptor."],
                ]}
              />
              <P>
                So the redundancy the body built for robustness becomes the dial a designer
                turns. Cut at the ligand for a scalpel; cut at the receptor for a sledge (
                <a href={REF.bimagrumab} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lach-Trifilieff et&nbsp;al., MCB
                </a>
                ). And the reason there is a dial to turn at all is the fact this whole
                piece turns on: the muscle brake was never one molecule. It was always a
                family sharing a door.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/born-switched-off" label="Born switched off (how one ligand is armed)" />
                <CrossLink href="/insights/glp-1-muscle-preservation" label="Keeping the muscle on GLP-1 (the trial data)" />
                <CrossLink href="/hormones/activin-a" label="Activin A reference" />
                <CrossLink href="/hormones/follistatin" label="Follistatin - the shared trap" />
                <CrossLink href="/families/muscle-tgfb" label="The muscle & TGF-β family" />
                <CrossLink href="/research?q=Which%20ligands%20signal%20through%20the%20activin%20type%20II%20receptors%2C%20and%20how%20does%20GDF-11%20differ%20from%20myostatin%3F" label="Ask the research agent about the receptor" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not
              medical advice, dosing guidance, or a recommendation to use any compound.
              Specific compounds and trials are named to explain the science; verify any
              claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The convergence hub: many ligands → one receptor → type I / Smad2/3 → muscle restraint ── */
function ConvergenceDiagram() {
  const W = 720, H = 330;
  const ligands = [
    { title: "Myostatin", sub: "GDF-8 · the muscle brake", color: "var(--accent-purple)" },
    { title: "Activin A", sub: "wasting · fibrosis · fertility", color: "var(--accent-blue)" },
    { title: "GDF-11", sub: "~90% identical to myostatin", color: "var(--accent-teal)" },
    { title: "Nodal, and others", sub: "same receptor family", color: "var(--color-ink)", muted: true },
  ];
  const lx = 14, lw = 188, lh = 52, lgap = 16;
  const lyAt = (i: number) => 20 + i * (lh + lgap);
  const lRight = lx + lw;

  // Receptor hub (the chokepoint).
  const rx = 268, rw = 188, rh = 128, ry = (H - rh) / 2 - 8;
  const rcx = rx + rw / 2, rcy = ry + rh / 2;

  // Downstream: type I + Smad, then the outcome.
  const dx = 520, dw = 186, dh = 56;
  const d1y = 74, d2y = 174;

  return (
    <figure className="my-2 overflow-x-auto rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full min-w-[560px] max-w-2xl"
        role="img"
        aria-label="Myostatin, activin A, GDF-11, and related ligands all converge on the shared activin type II receptors (ActRIIA/ActRIIB), which recruit a type I receptor (ALK4 or ALK5) to switch on Smad2/3 and restrain muscle growth. Blocking one ligand leaves the others signaling; blocking the receptor silences all of them together."
      >
        {/* convergence lines: each ligand → receptor left edge */}
        {ligands.map((lg, i) => {
          const y1 = lyAt(i) + lh / 2;
          return (
            <path
              key={`p${i}`}
              d={`M ${lRight} ${y1} C ${(lRight + rx) / 2} ${y1}, ${(lRight + rx) / 2} ${rcy}, ${rx - 2} ${rcy}`}
              fill="none"
              stroke={lg.muted ? "var(--color-ink)" : lg.color}
              strokeOpacity={lg.muted ? 0.2 : 0.4}
              strokeWidth="1.75"
            />
          );
        })}

        {/* ligand nodes */}
        {ligands.map((lg, i) => (
          <g key={lg.title}>
            <rect x={lx} y={lyAt(i)} width={lw} height={lh} rx={12} fill="var(--panel)" stroke={lg.muted ? "var(--color-ink)" : lg.color} strokeOpacity={lg.muted ? 0.2 : 0.4} strokeWidth="1" />
            <text x={lx + 16} y={lyAt(i) + 22} fill="var(--color-ink)" fillOpacity={lg.muted ? 0.55 : 1} fontSize="14.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{lg.title}</text>
            <text x={lx + 16} y={lyAt(i) + 39} fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">{lg.sub}</text>
          </g>
        ))}

        {/* receptor hub */}
        <rect x={rx} y={ry} width={rw} height={rh} rx={16} fill="color-mix(in srgb, var(--accent-blue) 10%, transparent)" stroke="var(--accent-blue)" strokeOpacity="0.7" strokeWidth="2" />
        <text x={rcx} y={ry + 42} textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Activin type II</text>
        <text x={rcx} y={ry + 62} textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">receptor</text>
        <text x={rcx} y={ry + 84} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11.5">ActRIIA / ActRIIB</text>
        <text x={rcx} y={ry + 102} textAnchor="middle" fill="var(--accent-blue)" fontSize="11" fontStyle="italic">one dock, many ligands</text>

        {/* receptor → downstream */}
        <line x1={rx + rw} y1={rcy} x2={dx - 10} y2={rcy} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
        <path d={`M ${dx - 11} ${rcy - 5} L ${dx - 3} ${rcy} L ${dx - 11} ${rcy + 5}`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />

        {/* downstream nodes */}
        <g>
          <rect x={dx} y={d1y} width={dw} height={dh} rx={12} fill="var(--panel)" stroke="var(--accent-blue)" strokeOpacity="0.35" strokeWidth="1" />
          <text x={dx + dw / 2} y={d1y + 24} textAnchor="middle" fill="var(--color-ink)" fontSize="13.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Type I: ALK4 / ALK5</text>
          <text x={dx + dw / 2} y={d1y + 42} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">switches on Smad2/3</text>
        </g>
        {/* arrow down */}
        <line x1={dx + dw / 2} y1={d1y + dh} x2={dx + dw / 2} y2={d2y - 8} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
        <path d={`M ${dx + dw / 2 - 5} ${d2y - 9} L ${dx + dw / 2} ${d2y - 1} L ${dx + dw / 2 + 5} ${d2y - 9}`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
        <g>
          <rect x={dx} y={d2y} width={dw} height={dh} rx={12} fill="color-mix(in srgb, var(--accent-rose) 12%, transparent)" stroke="var(--accent-rose)" strokeOpacity="0.7" strokeWidth="2" />
          <text x={dx + dw / 2} y={d2y + 24} textAnchor="middle" fill="var(--color-ink)" fontSize="13.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Muscle growth</text>
          <text x={dx + dw / 2} y={d2y + 42} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11.5">held in check</text>
        </g>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Several ligands, one shared receptor. Block a single ligand and the rest still
        signal; block the receptor and the whole family is shut out at once.
      </figcaption>
    </figure>
  );
}
