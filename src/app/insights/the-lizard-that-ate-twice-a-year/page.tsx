import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-lizard-that-ate-twice-a-year")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

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
            <Section title="A signal that arrives before the sugar does">
              <P>
                Swallow glucose and your pancreas releases far more insulin than if the
                identical amount were dripped into a vein. The gap is the{" "}
                <Em>incretin effect</Em>: the gut telling the pancreas that food has
                landed, before blood sugar has fully risen. The idea is older than the
                hormone. In 1902 Bayliss and Starling named the first hormone of any
                kind — <Em>secretin</Em>, a gut factor — and coined the word{" "}
                <Em>hormone</Em> for it. By 1906 a London physician was feeding
                duodenal extract to diabetics on the hunch that the intestine carried a
                pancreas-stimulating messenger. In 1932 the Belgian physiologist Jean
                La Barre gave that messenger a name — <Em>incretin</Em> — for a gut
                factor that lowered blood glucose. Then the trail went cold for four
                decades. The chemistry to isolate a peptide present in vanishing
                quantities simply did not exist yet.
              </P>
              <P>
                What broke the logjam was a measuring tool, not a molecule. Rosalyn
                Yalow and Solomon Berson&rsquo;s <Em>radioimmunoassay</Em>, developed at
                the Bronx VA in the late 1950s, could finally detect hormones at
                picomolar concentrations. Hold that address — the Bronx VA — because
                the same building returns to this story in a way nobody planned.
              </P>
            </Section>

            <Section title="Two incretins, and a gene read the wrong way round">
              <P>
                The first incretin fell out in the early 1970s: John Brown&rsquo;s{" "}
                <Link href="/hormones/gip" className={LINK}>GIP</Link>, at first
                &ldquo;gastric inhibitory polypeptide,&rdquo; later rebadged{" "}
                <Em>glucose-dependent insulinotropic polypeptide</Em> when its real job
                turned out to be prodding insulin rather than quieting the stomach. But
                blocking GIP only partly abolished the incretin effect, which meant a
                second messenger had to exist.
              </P>
              <P>
                It arrived by inference before it arrived by isolation. When the
                proglucagon gene was cloned in the early 1980s, Graeme Bell&rsquo;s
                group found the sequence encoded not just{" "}
                <Link href="/hormones/glucagon" className={LINK}>glucagon</Link> but two
                more glucagon-<Em>like</Em> peptides tucked into the same precursor —{" "}
                GLP-1 and GLP-2. The &ldquo;1&rdquo; was never a version number; it was a
                position in a gene. (This is the detail behind{" "}
                <Link href="/insights/is-there-a-glp-4" className={LINK}>why there is no GLP-4</Link>.)
                The catch: full-length GLP-1 barely worked. Svetlana Mojsov, working
                with Joel Habener at Massachusetts General, showed the body clips off
                the first six residues, and that the truncated form —{" "}
                <Em>GLP-1(7&ndash;37)</Em> — was the potent one. Daniel Drucker then
                demonstrated it actually stimulated insulin in a glucose-dependent way.
                By the late 1980s the physiology was gorgeous and the drug was
                hopeless.
              </P>
              <Callout>
                Native{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link>&rsquo;s
                circulating half-life is roughly{" "}
                <Link href="/tools/half-life?t12=1.5&unit=min" className={LINK}>one to two minutes</Link>.
                The enzyme DPP-4 severs it at the His7&ndash;Ala8 bond within minutes;
                the kidney mops up the rest. A hormone this good and this short-lived
                is a pharmacology problem disguised as a discovery.
              </Callout>
            </Section>

            <Section title="The lizard that ate twice a year">
              <P>
                Enter the second character at that Bronx VA. John Eng, an
                endocrinologist trained in the Yalow tradition of assay-building, had a
                sideline habit: screening animal venoms for peptides that lit up
                mammalian receptors. In 1990 a report noted that Gila monster venom
                caused inflammation of the pancreas — which, to an endocrinologist,
                reads as: something in there is talking to the exocrine pancreas.
              </P>
              <P>
                The animal itself is the clue. The Gila monster (<Em>Heloderma
                suspectum</Em>) is a desert lizard that eats only a handful of enormous
                meals a year and fasts, sometimes for months, between them. A pancreas
                that swings from gorging to starving and back is exactly where you would
                expect to find an unusually durable metabolic signal. In 1992 Eng
                isolated it: <Em>exendin-4</Em>, a 39-residue peptide from the
                lizard&rsquo;s salivary venom, about 53% identical to human GLP-1 — close
                enough to activate the human GLP-1 receptor, foreign enough to behave
                differently.
              </P>
              <P>
                The difference that mattered was a single amino acid. Human GLP-1 has
                alanine at position 2, the residue DPP-4 grabs. Exendin-4 has{" "}
                <Em>glycine</Em> there. DPP-4 cannot get a grip, so the lizard peptide
                survives in circulation for hours rather than minutes. Evolution had
                already solved the exact problem that had defeated the drug developers —
                in a venom gland, for reasons that have nothing to do with diabetes.
              </P>
              <LineageDiagram />
              <P>
                Then the part of the story that gets left out of the press releases: Eng
                could not get his employer interested. He paid for the patent himself,
                and only later licensed it to a small California biotech, Amylin
                Pharmaceuticals. Synthetic exendin-4 — <Em>exenatide</Em> — became{" "}
                <Link href="/hormones/exenatide" className={LINK}>Byetta</Link>, and in
                April 2005 the FDA approved it: the first GLP-1 receptor agonist to
                reach patients. It was a twice-daily injection with a two-and-a-half hour
                half-life. Modest by today&rsquo;s standards, and yet the entire
                blockbuster class descends from it.
              </P>
            </Section>

            <Section title="The other pedal: engineering the half-life a different way">
              <P>
                The lizard&rsquo;s trick was resistance to the enzyme. The competing
                idea was to keep a near-human peptide and simply stop the body from
                clearing it. Novo Nordisk took that road with{" "}
                <Link href="/hormones/liraglutide" className={LINK}>liraglutide</Link>{" "}
                (Victoza, 2010): attach a C16 fatty-acid chain so the molecule binds
                albumin, hides in plasma, and dribbles off slowly — a once-daily shot.
                This is <Link href="/insights/peptide-half-life-engineering" className={LINK}>acylation</Link>,
                and it is the second of the two great half-life strategies, alongside
                DPP-4 resistance.
              </P>
              <P>
                <Link href="/hormones/semaglutide" className={LINK}>Semaglutide</Link>{" "}
                (Ozempic 2017; Wegovy 2021) is what happens when you use{" "}
                <Em>both</Em> pedals at once: a longer C18 di-acid tether with a spacer
                for tighter, more durable albumin binding, plus an Aib substitution at
                position 2 to lock out DPP-4 — the same vulnerability the Gila monster
                had closed with glycine, now closed again with a synthetic residue. The
                result is a once-<Em>weekly</Em> drug, and eventually a{" "}
                <Link href="/insights/glp-1-in-a-pill" className={LINK}>pill</Link>. A
                two-minute molecule became a seven-day one; the{" "}
                <Link href="/tools/half-life?t12=1.5&unit=min" className={LINK}>half-life calculator</Link>{" "}
                makes the size of that leap concrete.
              </P>
              <P>
                A tangent worth naming, because it was a real fork in the road: instead
                of building a resistant agonist, you can just <Em>block the enzyme</Em>{" "}
                and let the GLP-1 your own gut already makes last longer. That is the
                DPP-4 inhibitor class — the &ldquo;gliptins.&rdquo; They work, they are
                convenient pills, and they are also modest, because raising endogenous
                incretin tone a little is not the same as flooding the receptor with a
                long-acting agonist. The gliptins are the road-not-taken that still got
                paved; they explain why &ldquo;more GLP-1 signal&rdquo; and &ldquo;a bit
                less GLP-1 breakdown&rdquo; are not interchangeable.
              </P>
            </Section>

            <Section title="Adding receptors instead of dose">
              <P>
                Once one receptor was conquered, the field went sideways rather than
                up. The proglucagon family has three sibling receptors — GLP-1, GIP,
                glucagon — with complementary metabolic jobs, so the next moves were
                peptides that hit more than one at once.{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>Tirzepatide</Link>{" "}
                (Mounjaro 2022; Zepbound) is a GIP/GLP-1 dual agonist built on that
                logic. Curiously, whether you turn the GIP receptor <Em>on</Em>{" "}
                (tirzepatide) or <Em>off</Em> (
                <Link href="/hormones/maridebart-cafraglutide" className={LINK}>maridebart cafraglutide</Link>),
                you still get weight loss — the paradox unpacked in{" "}
                <Link href="/insights/the-gip-paradox" className={LINK}>the GIP paradox</Link>.
              </P>
              <P>
                <Link href="/hormones/retatrutide" className={LINK}>Retatrutide</Link>{" "}
                adds the third receptor — glucagon — for a{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>triple agonist</Link>{" "}
                whose glucagon arm raises energy expenditure on top of the appetite and
                insulin arms. And a fourth idea sits alongside the incretins entirely:{" "}
                <Link href="/hormones/cagrilintide" className={LINK}>cagrilintide</Link>{" "}
                is a long-acting analog of{" "}
                <Link href="/hormones/amylin" className={LINK}>amylin</Link>, the
                other post-meal satiety hormone, paired with semaglutide as CagriSema.
                None of this is a bigger number on the same axis; it is more of the gut&rsquo;s
                own report card, recruited at once — the theme of{" "}
                <Link href="/insights/the-guts-full-report" className={LINK}>the gut&rsquo;s full report</Link>.
              </P>
            </Section>

            <Section title="Where the lineage lands: the shelf">
              <P>
                Follow the arrows all the way down and they end somewhere concrete: a
                research-vendor catalog, where the top sellers are coded so plainly the
                genealogy is almost visible. On the network&rsquo;s sources,{" "}
                <Em>GLP-1</Em> is semaglutide, <Em>GLP-2</Em> is tirzepatide, and{" "}
                <Em>GLP-3</Em> is retatrutide — a single-, double-, triple-receptor
                stack sold as a numbered ladder. Every one of them is a great-great-
                descendant of a lizard&rsquo;s meal schedule, refined through a fatty
                acid, a swapped residue, an added receptor.
              </P>
              <BestSellers />
              <P>
                That vendor shorthand is a convenience, not a chemistry lesson — the
                &ldquo;numbers&rdquo; are receptor counts, not GLP versions, and the real
                identities matter when you read a{" "}
                <Link href="/methodology" className={LINK}>COA or a label</Link>. What
                you can and can&rsquo;t actually source, and how the community got to
                these molecules ahead of the clinics, are their own stories in{" "}
                <Link href="/insights/what-you-can-actually-get" className={LINK}>what you can actually get</Link>{" "}
                and{" "}
                <Link href="/insights/early-adopters-catalog" className={LINK}>the community found it first</Link>.
              </P>
            </Section>

            <Section title="What&rsquo;s settled, and what the lizard didn&rsquo;t answer">
              <P>
                <Em>Settled:</Em> the incretin effect is real, GLP-1 receptor agonism
                lowers glucose and body weight substantially, the glucose-dependence of
                the insulin effect keeps intrinsic hypoglycemia risk low, and large
                trials show cardiovascular and renal benefit for the leading agents. The
                venom-to-blockbuster arc is one of the cleanest &ldquo;basic biology
                pays off decades later&rdquo; stories in modern medicine.
              </P>
              <P>
                <Em>Open:</Em> the exact split between gut, brain, and slowed emptying
                behind the weight loss; long-horizon safety on a population scale;
                whether GIP is best agonized or antagonized; and the quality of the
                weight lost — specifically{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>muscle preservation</Link>{" "}
                during rapid loss, the question now driving interest in adjacent
                pathways. The Gila monster handed the field a durable agonist. It did
                not hand over the answers to what a lifetime on one does.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/glp-1-signaling" label="How GLP-1 actually works, step by step" />
                <CrossLink href="/hormones/exenatide" label="Exenatide reference (the venom peptide)" />
                <CrossLink href="/insights/the-triple-agonist" label="Retatrutide: the triple agonist" />
                <CrossLink href="/insights/is-there-a-glp-4" label="Why there is no GLP-4" />
                <CrossLink href="/tools/half-life?t12=1.5&unit=min" label="Model the two-minute-to-a-week leap" />
                <CrossLink href="/research?q=Trace%20the%20discovery%20history%20of%20GLP-1%20receptor%20agonists%20from%20exendin-4%20to%20retatrutide" label="Ask the research agent for primary sources" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on discovery history and mechanism, summarized
              from public scientific literature and simplified in places. Not medical
              advice, dosing guidance, or a recommendation to use any compound.
              Specific compounds are named to explain the science; verify any claim
              against primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

const LINK = "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-7 text-ink/75">{children}</p>;
}

function Em({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-2 border-accent bg-accent/[0.06] p-5">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-accent">The two-minute problem</div>
      <p className="text-[15px] leading-7 text-ink/80">{children}</p>
    </div>
  );
}

function CrossLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="group flex items-start gap-2 text-ink/75 transition-colors hover:text-accent">
        <span className="mt-0.5 text-ink/30 transition-colors group-hover:text-accent" aria-hidden>→</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

/* ── Lineage: one substitution → the whole class ── */
function LineageDiagram() {
  const steps: { label: string; sub: string; color: string; highlight?: boolean }[] = [
    { label: "Human GLP-1", sub: "Ala at position 2 · half-life ~2 min", color: "var(--accent-blue)" },
    { label: "DPP-4 clips it", sub: "His7–Ala8 bond severed in minutes", color: "var(--accent-purple)" },
    { label: "Exendin-4 (Gila monster)", sub: "Gly at position 2 → enzyme can't grip", color: "var(--accent)", highlight: true },
    { label: "Exenatide · Byetta 2005", sub: "first GLP-1 drug — half-life in hours", color: "var(--accent-teal)" },
    { label: "The modern class", sub: "acylation + engineered residues → days", color: "var(--accent)" },
  ];
  const W = 520, nodeH = 62, gap = 30, x = 40, w = 440;
  const H = steps.length * nodeH + (steps.length - 1) * gap + 20;
  const yAt = (i: number) => 10 + i * (nodeH + gap);

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img" aria-label="From human GLP-1's fatal weakness to the modern drug class, via a single amino-acid substitution in Gila monster venom">
        {steps.slice(0, -1).map((_, i) => {
          const y1 = yAt(i) + nodeH;
          const y2 = yAt(i + 1);
          return (
            <g key={i}>
              <line x1={W / 2} y1={y1} x2={W / 2} y2={y2 - 8} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
              <path d={`M ${W / 2 - 5} ${y2 - 9} L ${W / 2} ${y2 - 1} L ${W / 2 + 5} ${y2 - 9}`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          );
        })}
        {steps.map((n, i) => (
          <g key={n.label}>
            <rect
              x={x}
              y={yAt(i)}
              width={w}
              height={nodeH}
              rx={14}
              fill={n.highlight ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--panel)"}
              stroke={n.color}
              strokeOpacity={n.highlight ? 0.7 : 0.35}
              strokeWidth={n.highlight ? 2 : 1}
            />
            <text x={W / 2} y={yAt(i) + 26} textAnchor="middle" fill="var(--color-ink)" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              {n.label}
            </text>
            <text x={W / 2} y={yAt(i) + 46} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="12">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        One residue the enzyme couldn&rsquo;t grip turned an unusable hormone into a drug class.
      </figcaption>
    </figure>
  );
}

/* ── The catalog's coded top-sellers ── */
function BestSellers() {
  const rows: { code: string; molecule: string; slug: string; note: string }[] = [
    { code: "GLP-1", molecule: "Semaglutide", slug: "semaglutide", note: "single receptor · acylated + Aib · weekly" },
    { code: "GLP-2", molecule: "Tirzepatide", slug: "tirzepatide", note: "GIP + GLP-1 dual agonist" },
    { code: "GLP-3", molecule: "Retatrutide", slug: "retatrutide", note: "GIP + GLP-1 + glucagon triple" },
    { code: "—", molecule: "Cagrilintide", slug: "cagrilintide", note: "amylin analog · paired as CagriSema" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-ink/10 text-ink/50">
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">Shelf code</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">Actually</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">Design move</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.molecule} className="border-b border-ink/[0.06] last:border-0">
              <td className="px-4 py-3 font-mono text-ink/80">{r.code}</td>
              <td className="px-4 py-3">
                <Link href={`/hormones/${r.slug}`} className={LINK}>{r.molecule}</Link>
              </td>
              <td className="px-4 py-3 text-ink/60">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="px-4 py-3 text-xs text-ink/40">
        Vendor shorthand: the &ldquo;number&rdquo; is a receptor count, not a GLP
        version. Names are used to explain the science, not to endorse a source.
      </figcaption>
    </figure>
  );
}
