import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-other-pedal")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  splice: "https://pubmed.ncbi.nlm.nih.gov/10087355/",
  mgf: "https://pubmed.ncbi.nlm.nih.gov/20130113/",
  igfbp: "https://pubmed.ncbi.nlm.nih.gov/29255001/",
  igf1r: "https://pubmed.ncbi.nlm.nih.gov/27418865/",
  igf2r: "https://pubmed.ncbi.nlm.nih.gov/19251055/",
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
            <Section title="The half we skipped">
              <P>
                Read this site&rsquo;s coverage of muscle and you get one lever, pulled
                hard:{" "}
                <Link href="/hormones/myostatin" className={LINK}>myostatin</Link>, the{" "}
                <Link href="/families/muscle-tgfb" className={LINK}>TGF-&beta;</Link> brake, and
                the drugs racing to release it. That is a real and beautiful story &mdash; but
                it is only half the mechanism. Muscle mass is not set by a brake alone. It is
                set where a brake meets an <Em>accelerator</Em>, and the accelerator has a
                name of its own:{" "}
                <Link href="/hormones/igf-1" className={LINK}>IGF-1</Link>.
              </P>
              <P>
                The two arms are genuinely opposed. The brake &mdash; myostatin and{" "}
                <Link href="/hormones/activin-a" className={LINK}>activin&nbsp;A</Link> through
                the Smad2/3 pathway &mdash; tells a fibre to hold back. The accelerator &mdash;
                growth hormone working through IGF-1, and IGF-1 working through Akt and mTOR
                &mdash; tells it to build. Where they balance is how much muscle you carry. This
                piece is the accelerator: the systemic signal, the local pulse a worked muscle
                writes for itself, the research peptides built to push it from outside, and the
                honest reason that pushing is harder and riskier than letting the brake off.
              </P>
              <PedalDiagram />
            </Section>

            <Section title="Growth hormone&rsquo;s messenger">
              <P>
                <Link href="/hormones/growth-hormone" className={LINK}>Growth hormone</Link> gets
                the headline, but it does surprisingly little of the growing itself. It travels
                to the liver and instructs it to make IGF-1, and IGF-1 is what actually reaches
                tissue and drives it to grow. Most of what we credit to GH is really IGF-1
                carrying the message the last mile &mdash; the axis is a{" "}
                <Em>relay</Em>, not a broadcast.
              </P>
              <P>
                At the muscle cell, IGF-1 binds its receptor tyrosine kinase and lights up the
                PI3K&ndash;Akt&ndash;mTOR pathway &mdash; the master switch for protein
                synthesis. Turn it up and the cell builds; it is the same pathway a heavy set
                and a protein-rich meal converge on. IGF-1 even has a quieter sibling,{" "}
                <Link href="/hormones/igf-2" className={LINK}>IGF-2</Link>, the dominant growth
                factor before birth and, curiously, the one the body built an entire receptor
                simply to <a href={REF.igf2r} target="_blank" rel="noopener noreferrer" className={LINK}>clear away</a>.
                But in adult muscle, IGF-1 is the accelerator that matters.
              </P>
              <Callout label="Why the accelerator is the older lever">
                Long before anyone designed a myostatin antibody, bodybuilding and veterinary
                pharmacology were already trying to push the IGF-1 axis &mdash; because it is the
                growth signal the body itself uses to build tissue. Releasing the brake is the
                newer, cleaner idea. Leaning on the accelerator is the original one, and it
                comes with the original problem: a growth signal does not only grow muscle.
              </Callout>
            </Section>

            <Section title="The pulse a muscle writes for itself">
              <P>
                Systemic IGF-1 is a steady, whole-body tide. But muscle also makes IGF-1{" "}
                <Em>locally</Em>, and it does something clever with it: when a fibre is
                mechanically loaded or damaged, it changes how it{" "}
                <a href={REF.splice} target="_blank" rel="noopener noreferrer" className={LINK}>
                  splices the IGF-1 gene
                </a>
                , swapping in a different final exon. The product is the same IGF-1 core
                carried on a different C-terminal tail &mdash; the isoform called{" "}
                <Link href="/hormones/mgf" className={LINK}>MGF</Link>, mechano growth factor.
              </P>
              <SpliceDiagram />
              <P>
                What makes MGF interesting is that the distinct tail &mdash; its{" "}
                <Em>E-domain</Em> &mdash; appears to act on its own account, activating the
                satellite cells that repair and thicken a fibre, and it does so{" "}
                <a href={REF.mgf} target="_blank" rel="noopener noreferrer" className={LINK}>
                  even in cells lacking the IGF-1 receptor
                </a>
                . So it is not simply &ldquo;local IGF-1&rdquo; &mdash; it looks like a second
                message hidden in the same gene, one the muscle writes for itself in the moment
                it is worked. The catch, and it is a real one: the receptor for that E-domain
                has never been pinned down, and whether MGF is a genuinely distinct hormone is
                still argued. This is open biology, not settled fact.
              </P>
            </Section>

            <Section title="Supplying it from outside">
              <P>
                If the accelerator is IGF-1, the obvious move is to add more of it. The problem
                is that native IGF-1 is almost never free: it circulates{" "}
                <a href={REF.igfbp} target="_blank" rel="noopener noreferrer" className={LINK}>
                  bound to IGF-binding proteins
                </a>{" "}
                that buffer its activity and clear it within minutes. Inject plain IGF-1 and the
                binding proteins mop most of it up before it works. The research peptides in this
                corner are all, at heart, attempts to slip that leash.
              </P>
              <Bullets
                items={[
                  ["IGF-1 LR3 — the escape artist", "Long R3 IGF-1 adds two changes to the sequence — an arginine swap at position 3 and a 13-residue N-terminal extension — that between them cripple binding-protein capture. It stays free, hits the receptor far more fully, and outlasts free native IGF-1 in the dish, which is exactly why it is a standard cell-culture reagent — though, as its own deep-dive explains, staying free is not what lengthens its half-life."],
                  ["des(1-3)IGF-1 — the same idea, subtracted", "Its sister analog reaches the same end by deletion, dropping the first three residues so the binding proteins lose their grip. Two routes, one goal: an IGF-1 the buffer can't hold."],
                  ["MGF / PEG-MGF — the local pulse, bottled", "The synthetic MGF sold for research is the E-domain peptide itself. Native it lasts only minutes, so a pegylated form is offered to stretch it — an attempt to supply the mechano-pulse a muscle would otherwise have to earn under load."],
                ]}
              />
              <P>
                It is elegant engineering, and it rhymes with the trick the metabolic field
                used on GLP-1: the reach of a signal is set as much by what carries it as by
                what it says (more on that in{" "}
                <Link href="/insights/peptide-half-life-engineering" className={LINK}>
                  two minutes to seven days
                </Link>
                ). The moves run opposite, though: GLP-1 drugs bolt the peptide onto a
                long-lived carrier to stretch a two-minute signal into a weekly one, while LR3
                strips a carrier off. That buys reagent potency in a dish, not a longer
                half-life.
              </P>
            </Section>

            <Section title="Why the accelerator is the harder pedal">
              <P>
                Here is where the site&rsquo;s creed &mdash; bullish on the science, sceptical on
                the page &mdash; has to earn its keep. The IGF-1 route is real, potent, and
                genuinely riskier than releasing the brake, for one structural reason: a growth
                signal is not muscle-specific.
              </P>
              <Bullets
                items={[
                  ["Unbuffered means unselective", "The binding proteins that IGF-1 LR3 is built to dodge are not just a clearance nuisance — they are the body's way of rationing a mitogen. Sustained, systemic IGF-1-receptor activation is exactly the state epidemiology links to cancer risk. Strip the buffer everywhere and you push growth everywhere, not only in the worked muscle."],
                  ["The human muscle evidence is thin", "For all the reagent-grade potency in a dish, controlled human data showing these peptides build or preserve functional muscle is sparse to absent. What exists is largely preclinical, and the headline claims run well ahead of it."],
                  ["Which is why the clinic chose the brake", "The successful obesity-era programs don't push IGF-1 — they release myostatin, precisely because a targeted brake is easier to make safe than a systemic accelerator. The contrast is the lesson, not a footnote."],
                ]}
              />
              <P>
                None of that makes the accelerator uninteresting &mdash; it makes it the harder,
                more beautiful engineering problem. The frontier worth watching is{" "}
                <Em>local</Em>: a signal like MGF that the muscle only issues where it is
                actually worked hints at a version of this pedal that could be pressed in one
                fibre without flooding the whole body. Get the aim right and the accelerator
                stops being the dangerous pedal. Until then, the honest read is that the brake
                is the lever the evidence supports, and the accelerator is the one the science is
                still learning to steer.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/igf-1" label="IGF-1 reference (the accelerator itself)" />
                <CrossLink href="/hormones/mgf" label="MGF — the local, load-triggered pulse" />
                <CrossLink href="/hormones/igf-1-lr3" label="IGF-1 LR3 — engineered to slip the leash" />
                <CrossLink href="/hormones/igf-2" label="IGF-2 — the imprinted sibling" />
                <CrossLink href="/insights/igf-1-lr3" label="The half-life, backwards — the IGF-1 LR3 reference" />
                <CrossLink href="/insights/glp-1-muscle-preservation" label="The other pedal: releasing the brake" />
                <CrossLink href="/research?q=What%20does%20the%20human%20evidence%20show%20for%20IGF-1%20analogs%20like%20LR3%20or%20MGF%20building%20skeletal%20muscle%3F" label="Ask the research agent what the human data shows" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific literature
              and simplified in places. Not medical advice, dosing guidance, or a recommendation
              to use any compound. Specific compounds are named to explain the science; several
              claims here describe active, unsettled research &mdash; verify any of them against
              the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The two-pedal set-point: accelerator (IGF-1) vs brake (myostatin) ── */
function PedalDiagram() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 560 372"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="Skeletal muscle mass sits at the balance of two opposing inputs: an accelerator arm — GH to IGF-1 to the IGF-1 receptor and Akt/mTOR, raising muscle protein synthesis — and a brake arm — myostatin and activin A through ActRIIB and Smad2/3, lowering it."
      >
        {/* headers */}
        <rect x="40" y="8" width="220" height="30" rx="8" fill="color-mix(in srgb, var(--accent-teal) 12%, transparent)" stroke="var(--accent-teal)" strokeOpacity="0.5" />
        <text x="150" y="28" textAnchor="middle" fill="var(--accent-teal)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif" letterSpacing="0.08em">ACCELERATOR</text>
        <rect x="300" y="8" width="220" height="30" rx="8" fill="color-mix(in srgb, var(--accent-purple) 12%, transparent)" stroke="var(--accent-purple)" strokeOpacity="0.5" />
        <text x="410" y="28" textAnchor="middle" fill="var(--accent-purple)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif" letterSpacing="0.08em">BRAKE</text>

        {/* accelerator nodes */}
        {[
          { y: 54, a: "GH → IGF-1", b: "the systemic growth signal" },
          { y: 138, a: "IGF-1R → Akt / mTOR", b: "muscle protein synthesis ↑" },
        ].map((n) => (
          <g key={`a-${n.y}`}>
            <rect x="40" y={n.y} width="220" height="58" rx="12" fill="var(--panel)" stroke="var(--accent-teal)" strokeOpacity="0.4" />
            <text x="150" y={n.y + 25} textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{n.a}</text>
            <text x="150" y={n.y + 44} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11.5">{n.b}</text>
          </g>
        ))}
        {/* brake nodes */}
        {[
          { y: 54, a: "Myostatin · Activin A", b: "TGF-β brake ligands" },
          { y: 138, a: "ActRIIB → Smad2/3", b: "muscle protein synthesis ↓" },
        ].map((n) => (
          <g key={`b-${n.y}`}>
            <rect x="300" y={n.y} width="220" height="58" rx="12" fill="var(--panel)" stroke="var(--accent-purple)" strokeOpacity="0.4" />
            <text x="410" y={n.y + 25} textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{n.a}</text>
            <text x="410" y={n.y + 44} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11.5">{n.b}</text>
          </g>
        ))}

        {/* vertical connectors within each column */}
        {[150, 410].map((x) => (
          <g key={`c-${x}`}>
            <line x1={x} y1="112" x2={x} y2="136" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
            <path d={`M ${x - 5} 129 L ${x} 137 L ${x + 5} 129`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
          </g>
        ))}

        {/* converging lines into the set-point, with push glyphs */}
        <line x1="150" y1="198" x2="248" y2="286" stroke="var(--accent-teal)" strokeOpacity="0.55" strokeWidth="2" />
        <line x1="410" y1="198" x2="312" y2="286" stroke="var(--accent-purple)" strokeOpacity="0.55" strokeWidth="2" />
        <text x="182" y="250" textAnchor="middle" fill="var(--accent-teal)" fontSize="22" fontWeight="700">+</text>
        <text x="378" y="250" textAnchor="middle" fill="var(--accent-purple)" fontSize="22" fontWeight="700">−</text>

        {/* set-point node */}
        <rect x="110" y="290" width="340" height="66" rx="16" fill="var(--surface-deep)" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1.5" />
        <text x="280" y="320" textAnchor="middle" fill="var(--color-ink)" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Skeletal muscle mass</text>
        <text x="280" y="340" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11.5">the number where the two pedals balance</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two opposing inputs set the same number. Myostatin drugs work by easing the brake; the
        IGF-1 peptides work by leaning on the accelerator.
      </figcaption>
    </figure>
  );
}

/* ── One gene, two products: alternative splicing of IGF-1 → systemic Ea vs local MGF ── */
function SpliceDiagram() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 560 236"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="The IGF-1 gene is alternatively spliced into two isoforms: IGF-1Ea, the steady systemic endocrine IGF-1, and — on mechanical load — IGF-1Ec, called MGF, a local repair pulse. Both share the IGF-1 core and differ only in the C-terminal E-domain."
      >
        {/* gene node */}
        <rect x="205" y="10" width="150" height="48" rx="12" fill="var(--panel)" stroke="var(--accent-blue)" strokeOpacity="0.5" />
        <text x="280" y="32" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">IGF-1 gene</text>
        <text x="280" y="49" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11.5">one coding sequence</text>

        {/* split branches */}
        <line x1="280" y1="58" x2="280" y2="78" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
        <line x1="280" y1="78" x2="150" y2="104" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
        <line x1="280" y1="78" x2="410" y2="104" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
        <text x="196" y="96" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10.5" fontFamily="var(--font-mono, monospace)">default splice</text>
        <text x="372" y="96" textAnchor="middle" fill="var(--accent-teal)" fontSize="10.5" fontFamily="var(--font-mono, monospace)">on mechanical load</text>

        {/* IGF-1Ea node */}
        <rect x="40" y="112" width="220" height="80" rx="12" fill="var(--panel)" stroke="var(--accent-blue)" strokeOpacity="0.4" />
        <text x="150" y="140" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">IGF-1Ea</text>
        <text x="150" y="160" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="11.5">systemic · liver · steady</text>
        <text x="150" y="177" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11.5">the endocrine IGF-1</text>

        {/* IGF-1Ec / MGF node (highlight) */}
        <rect x="300" y="112" width="220" height="80" rx="12" fill="color-mix(in srgb, var(--accent-teal) 12%, transparent)" stroke="var(--accent-teal)" strokeOpacity="0.7" strokeWidth="2" />
        <text x="410" y="140" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">IGF-1Ec — “MGF”</text>
        <text x="410" y="160" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="11.5">local · load-triggered</text>
        <text x="410" y="177" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11.5">a repair pulse</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Same IGF-1 core, different C-terminal E-domain. The synthetic &ldquo;MGF&rdquo; peptide
        is that E-domain &mdash; the part the fibre only makes when it is worked.
      </figcaption>
    </figure>
  );
}
