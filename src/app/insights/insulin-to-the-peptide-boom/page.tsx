import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, CrossLink } from "@/components/insight";
import { getInsight } from "@/lib/insights";

const insight = getInsight("insulin-to-the-peptide-boom")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

export default function Article() {
  return (
    <>
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
              <span className="text-accent">A century of peptide medicine</span>
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
            <Section title="The first miracle">
              <P>
                In the summer of 1921, in a hot Toronto laboratory, Frederick Banting
                and Charles Best extracted a substance from dogs&rsquo; pancreases that
                could lower blood sugar. By January 1922 a refined version, purified by
                James Collip, was injected into a fourteen-year-old boy named Leonard
                Thompson who was dying of type 1 diabetes. His blood sugar fell. He
                lived. On wards full of children in diabetic comas, doctors went
                bed to bed with the new extract; the story goes that some were waking
                before the team had finished the round.
              </P>
              <P>
                The substance was <Link href="/hormones/insulin" className={LINK}>insulin</Link> —
                the first peptide hormone ever isolated and used to treat disease. The
                discoverers sold the patent to the University of Toronto for one dollar.
                Insulin was not just a drug; it was the proof of a then-radical idea —
                that the body runs on chemical messengers, and that if you can supply a
                missing one, you can rewrite a death sentence.
              </P>
              <Callout label="The template">
                Almost everything that followed — fertility medicine, the diabetes
                revolution, today&rsquo;s weight-loss phenomenon — runs on the pattern
                insulin established: identify the body&rsquo;s own peptide signal, then
                supply it, block it, or re-engineer it.
              </Callout>
            </Section>

            <Section title="A hundred-year arc">
              <Timeline />
            </Section>

            <Section title="Scaling the miracle">
              <P>
                For sixty years, insulin came from animals — extracted from the
                pancreases of millions of cattle and pigs. Then in 1982 came{" "}
                <Em>recombinant human insulin</Em>: the gene for human insulin inserted
                into bacteria, which then brewed the hormone in stainless-steel tanks.
                It was the first medicine ever made by recombinant DNA — the moment
                peptide hormones became something you could manufacture to spec rather
                than harvest.
              </P>
              <P>
                That shift mattered enormously. A hormone you can synthesize is a
                hormone you can <Em>redesign</Em> — swap an amino acid, add a chain,
                change how long it lasts. Every modern peptide drug descends from that
                capability.
              </P>
            </Section>

            <Section title="The families it built: fertility medicine">
              <P>
                While diabetes care matured, the same logic was quietly building
                another field. Reproductive medicine runs on the{" "}
                <Link href="/families/reproductive-gonadal" className={LINK}>gonadotropins</Link> —
                the pituitary peptides{" "}
                <Link href="/hormones/lh" className={LINK}>LH</Link> and{" "}
                <Link href="/hormones/fsh" className={LINK}>FSH</Link> — and on{" "}
                <Link href="/hormones/gnrh" className={LINK}>GnRH</Link>, the pulse
                generator above them.
              </P>
              <P>
                The first fertility drugs were peptide hormones purified from human
                urine — gonadotropins collected, famously, from postmenopausal women by
                the literal barrel. They made ovarian stimulation possible, and in 1978
                the first child was born through in-vitro fertilization. Later came
                recombinant FSH and the{" "}
                <Link href="/hormones/gnrh" className={LINK}>GnRH</Link> analogs —{" "}
                <Link href="/hormones/leuprolide" className={LINK}>agonists</Link> and{" "}
                <Link href="/hormones/cetrorelix" className={LINK}>antagonists</Link> —
                that let clinicians switch the reproductive axis off and on at will.
                An entire branch of medicine, built on tuning a handful of peptides.
              </P>
            </Section>

            <Section title="The pivot: from replacing hormones to engineering signals">
              <P>
                Diabetes care kept advancing, and somewhere along the way the strategy
                changed. The first century was about <Em>replacement</Em> — give back
                the insulin a body could not make. The next idea was subtler: instead of
                replacing a missing hormone, <Em>amplify a working one</Em>.
              </P>
              <P>
                The breakthrough came from an unlikely place. In the 1990s a researcher
                studying Gila monster venom found a peptide,{" "}
                <Link href="/hormones/exenatide" className={LINK}>exendin-4</Link>, that
                activated the human{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> receptor but —
                unlike the body&rsquo;s own GLP-1 — resisted rapid breakdown. Approved in
                2005, it was the first of the incretin drugs: not a replacement hormone,
                but a re-engineered <Em>signal</Em>. Acylation — bolting a fatty-acid
                chain onto the peptide so it clings to albumin — then stretched the
                two-minute half-life of native GLP-1 into the week-long action of{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link>.{" "}
                <span className="text-ink/55">(For the receptor-level story, see{" "}
                <Link href="/insights/glp-1-signaling" className={LINK}>how GLP-1 actually works</Link>.)</span>
              </P>
            </Section>

            <Section title="2026: the peptide goes pop">
              <P>
                And then the molecules that had spent a century in clinics walked into
                the culture. The GLP-1 drugs —{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link>,{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link>{" "}
                and their successors — became a genuine phenomenon: a weight-loss story
                big enough to reshape food companies&rsquo; forecasts, fill talk-show
                segments, and trigger global supply shortages. For the first time, a
                peptide hormone was a household word.
              </P>
              <P>
                In their wake came a second, scrappier wave. A whole online culture of{" "}
                <Em>research peptides</Em> — compounds like{" "}
                <Link href="/hormones/bpc-157" className={LINK}>BPC-157</Link> and{" "}
                <Link href="/hormones/tb-500" className={LINK}>TB-500</Link> — moved from
                obscure forums into mainstream wellness and biohacking, promoted for
                recovery, longevity, and performance. By 2026, &ldquo;peptides&rdquo; had
                become a lifestyle category, sold and discussed with a confidence that
                often ran far ahead of the evidence.
              </P>
              <Callout label="Signal vs noise">
                Here is the tension this whole site exists for. A century of peptide
                medicine earned its credibility through rigorous evidence — Leonard
                Thompson&rsquo;s falling blood sugar, decades of trials. The 2026 moment
                mixes that genuine science with a great deal of hype. The same word,
                &ldquo;peptide,&rdquo; now covers both a Nobel-grade breakthrough and a
                forum rumor.
              </Callout>
            </Section>

            <Section title="Telling them apart">
              <P>
                That is the whole job, for a reader in 2026: separating the molecule
                from the marketing. It is why every entry in this{" "}
                <Link href="/catalog" className={LINK}>catalog</Link> carries an honest
                evidence badge — <Em>Established</Em> for the insulin-grade science,{" "}
                <Em>Preclinical</Em> or <Em>Limited</Em> for the compounds whose claims
                outrun their data — and why the biology comes before the benefits. The
                history is genuinely miraculous. The trick is not to let the hype borrow
                its credibility.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/insulin" label="Insulin — where it all began" />
                <CrossLink href="/insights/glp-1-signaling" label="How GLP-1 actually works (the mechanism)" />
                <CrossLink href="/families/reproductive-gonadal" label="The gonadotropins behind fertility medicine" />
                <CrossLink href="/catalog" label="See the evidence-graded catalog" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              An editorial history, summarized and simplified from the public record.
              Not medical advice or a recommendation to use any compound. Specific
              drugs and brands are named to tell the story, not to endorse them.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── A century in seven beats ── */
function Timeline() {
  const items: { year: string; label: string; color: string; highlight?: boolean }[] = [
    { year: "1922", label: "Insulin saves its first patient", color: "var(--accent)" },
    { year: "1960s", label: "Gonadotropins build fertility medicine", color: "var(--accent-blue)" },
    { year: "1978", label: "The first IVF birth", color: "var(--accent-teal)" },
    { year: "1982", label: "Recombinant insulin — the first rDNA drug", color: "var(--accent-purple)" },
    { year: "2005", label: "Exenatide — a diabetes drug from venom", color: "var(--accent-amber)" },
    { year: "2017", label: "Semaglutide re-engineers the GLP-1 signal", color: "var(--accent-rose)" },
    { year: "2026", label: "Peptides go pop", color: "var(--accent)", highlight: true },
  ];
  const W = 560, row = 60, padTop = 18, railX = 132;
  const H = items.length * row + padTop;
  const yAt = (i: number) => padTop + i * row;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Timeline of peptide medicine from 1922 to 2026">
        <line x1={railX} y1={yAt(0)} x2={railX} y2={yAt(items.length - 1)} stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="2" />
        {items.map((it, i) => (
          <g key={it.year}>
            <text x={railX - 22} y={yAt(i) + 5} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.55" fontSize="15" fontFamily="var(--font-geist-mono), monospace">
              {it.year}
            </text>
            <circle cx={railX} cy={yAt(i)} r={it.highlight ? 7 : 5} fill={it.color} opacity={it.highlight ? 1 : 0.85} />
            {it.highlight && <circle cx={railX} cy={yAt(i)} r="12" fill={it.color} opacity="0.18" />}
            <text x={railX + 22} y={yAt(i) + 5} fill="var(--color-ink)" fillOpacity={it.highlight ? 0.95 : 0.75} fontSize="15.5" fontWeight={it.highlight ? 600 : 400} fontFamily="var(--font-space-grotesk), sans-serif">
              {it.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
