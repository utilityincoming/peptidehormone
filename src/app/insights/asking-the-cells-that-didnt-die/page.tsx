import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { DocumentedRange } from "@/components/DocumentedRange";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("asking-the-cells-that-didnt-die")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  discovery: "https://pubmed.ncbi.nlm.nih.gov/11371646/", // Hashimoto et al., PNAS 2001 — the rescue-factor screen
  bax: "https://pubmed.ncbi.nlm.nih.gov/12732850/", // Guo et al., Nature 2003 — humanin interferes with Bax activation
  igfbp3: "https://www.pnas.org/doi/10.1073/pnas.2135111100", // Ikonen et al., PNAS 2003 — humanin/IGFBP-3
  receptor: "https://www.molbiolcell.org/doi/10.1091/mbc.e09-02-0168", // Hashimoto et al., Mol Biol Cell 2009 — CNTFR/WSX-1/gp130
  aging: "https://www.frontiersin.org/journals/endocrinology/articles/10.3389/fendo.2014.00210/full", // Yen/Cohen — humanin & age-related disease review
} as const;

// FAQ — surfaced as FAQPage JSON-LD and mirrored in the visible Q&A block.
const FAQS = [
  {
    q: "Is humanin a nuclear gene like other peptide hormones?",
    a: "No — and that is the headline fact. Humanin is encoded within the 16S ribosomal RNA region of mitochondrial DNA, not the nuclear genome. It belongs to the mitochondrial-derived peptide class alongside MOTS-c, which is why the two are so often mentioned together: both are short signals the powerhouse sends to the rest of the cell, an origin that would have seemed impossible for a signalling peptide a generation ago.",
  },
  {
    q: "How can one peptide both block Bax and act on a receptor?",
    a: "Because it is read in two locations. Inside the cell, humanin physically binds the pro-apoptotic protein Bax and keeps it from translocating to the mitochondrion, so the membrane is never permeabilised — a mechanical brake, no receptor involved. Secreted, the same sequence docks a three-part cytokine receptor (CNTFRα/WSX-1/gp130) and fires STAT3 as a conventional hormone would. Same word, two rooms.",
  },
  {
    q: "What is HNG (S14G-humanin)?",
    a: "A single-residue analog — serine 14 swapped for glycine — that is reported to be far more potent than native humanin in cell and rodent neuroprotection assays, on the order of a thousandfold in some readouts. It is the version most preclinical work actually uses because native humanin is short-lived and weak by comparison. It remains a research tool, not an approved drug.",
  },
  {
    q: "Does humanin have proven benefits in people?",
    a: "No. The human data is associative, not interventional: circulating humanin declines with age and tends to run higher in the long-lived and their offspring, and it tracks with markers of insulin sensitivity. Those are correlations. There are no controlled human trials establishing that giving humanin treats or prevents any disease. The mechanism is genuinely elegant; the clinical case does not yet exist.",
  },
];

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
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
              <Link href="/families/mitochondrial" className="text-accent-blue hover:text-ink">
                Mitochondrial-derived peptides
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
            <DocumentedRange id="humanin" />

            <Section title="Overheard, not designed">
              <P>
                Most peptides in this catalog were found by asking what a signal
                <Em> does</Em>. Humanin was found by asking a stranger question &mdash; not what
                kills a neuron, but what the neurons that <Em>didn&rsquo;t</Em> die were holding
                on to. In 2001 a Keio University lab took the occipital cortex of a patient who had
                died with Alzheimer&rsquo;s and screened the few surviving neurons for any gene
                that could rescue cells from the death triggered by familial-Alzheimer&rsquo;s
                mutations and amyloid-&beta;. One clone did it almost completely. It encoded a
                peptide just twenty-four residues long, and they named it{" "}
                <a href={REF.discovery} target="_blank" rel="noopener noreferrer" className={LINK}>
                  humanin
                </a>
                .
              </P>
              <P>
                Then came the part that made it strange. The sequence wasn&rsquo;t in the nuclear
                genome at all. It was written inside mitochondrial DNA &mdash; tucked within the
                16S ribosomal RNA gene, the region that otherwise codes for part of the
                mitochondrion&rsquo;s own protein-building machinery. A survival message, hiding in
                the powerhouse&rsquo;s rRNA, read out of the one genome nobody expected to be
                dictating peptide hormones.
              </P>
            </Section>

            <Section title="A message from the powerhouse">
              <P>
                That origin puts humanin in a small, recently opened club: the{" "}
                <Link href="/families/mitochondrial" className={LINK}>
                  mitochondrial-derived peptides
                </Link>{" "}
                (MDPs). Its better-known sibling{" "}
                <Link href="/hormones/mots-c" className={LINK}>MOTS-c</Link> is encoded a little
                further along the same mitochondrial genome and tilts toward metabolism and
                exercise; humanin is the family&rsquo;s cytoprotectant, the one whose single
                obsession is keeping cells alive under stress. The shared lesson is the one the
                field is still absorbing: the mitochondrion is not only a factory that answers to
                the nucleus. It writes back &mdash; short peptides that travel out to the rest of
                the cell, and into the blood, carrying news about the state of the engine room.
              </P>
              <Callout label="Why the origin matters">
                A signalling peptide encoded in mitochondrial DNA is a category violation by the
                textbook of a decade ago. It means the organelle that reports cellular energy and
                stress has its own voice in the conversation about whether a cell lives &mdash;
                and that a blood draw might, in principle, read that voice directly.
              </Callout>
            </Section>

            <Section title="The same word, spoken in two rooms">
              <P>
                What makes humanin worth a long look is that it is read in two different places,
                and does something different in each. It is at once an intracellular brake bolted
                directly onto the machinery of cell death and a secreted hormone that works a
                receptor from the outside. Neither reading depends on the other; the peptide simply
                means &ldquo;survive&rdquo; wherever it happens to be.
              </P>
              <TwoRoomsDiagram />
            </Section>

            <Section title="The brake it holds from inside">
              <P>
                Apoptosis &mdash; a cell&rsquo;s orderly suicide &mdash; usually runs through{" "}
                <Em>Bax</Em>, a protein that, when activated, moves from the cytosol to the
                mitochondrial outer membrane, punches it full of pores, and lets the death signals
                (cytochrome c and the rest) spill out. Once Bax reaches the membrane and
                oligomerises, the decision is effectively made.
              </P>
              <P>
                Humanin steps in before that. Working from inside the cell, it binds Bax directly
                and prevents its translocation to the mitochondrion &mdash; the pore never forms,
                the membrane stays sealed, the cascade never starts. The seminal demonstration was{" "}
                <a href={REF.bax} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Guo and colleagues in <Em>Nature</Em>
                </a>{" "}
                in 2003, showing humanin interferes with Bax activation itself. It reaches related
                triggers the same way &mdash; sequestering Bid and Bim, the proteins that would
                otherwise hand Bax its cue. It is less a drug acting on a pathway than a hand held
                over the trigger.
              </P>
              <P>
                A parallel intracellular partner sharpens the picture. Humanin binds{" "}
                <a href={REF.igfbp3} target="_blank" rel="noopener noreferrer" className={LINK}>
                  IGFBP-3
                </a>
                , an insulin-like-growth-factor binding protein with its own pro-apoptotic streak,
                and neutralises it &mdash; tying humanin&rsquo;s survival signal into the IGF axis
                that runs through so much of this catalog&rsquo;s growth and metabolic biology.
              </P>
            </Section>

            <Section title="The hormone, spoken outward">
              <P>
                Secreted, the identical peptide behaves like a proper hormone. It docks a
                three-part receptor assembled from{" "}
                <a href={REF.receptor} target="_blank" rel="noopener noreferrer" className={LINK}>
                  CNTFR&alpha;, WSX-1, and gp130
                </a>{" "}
                &mdash; a borrowed committee of cytokine-receptor subunits &mdash; and through it
                fires the JAK/STAT3 pathway, the same intracellular relay a dozen survival and
                anti-inflammatory signals converge on. A second route, through the formyl-peptide
                receptor FPR2/FPRL1, links it to inflammatory and vascular signalling. The outcome
                each time rhymes with the intracellular one: transcriptional programs that favour
                survival and dampen stress.
              </P>
              <P>
                So the peptide has, in effect, two independent ways to say the same thing. Inside,
                it is mechanical &mdash; grab Bax, hold the line. Outside, it is a message on a
                receptor &mdash; and, uniquely for this family, a message the cell can <Em>send</Em>,
                a genuine mitochondrial hormone circulating between tissues rather than a private
                note to self.
              </P>
            </Section>

            <Section title="What the blood level knows">
              <P>
                Because humanin travels in the circulation, it can be measured &mdash; and the
                measurements are the most human thing about the story so far. Circulating humanin{" "}
                <a href={REF.aging} target="_blank" rel="noopener noreferrer" className={LINK}>
                  falls with age
                </a>
                , declining across the decades in ways that track other markers of mitochondrial
                decline; it tends to run higher in the exceptionally long-lived and in the
                offspring of centenarians, and it moves with insulin sensitivity and metabolic
                health. The peptide reads, tantalisingly, like a dial on the engine room that
                someone might one day want to turn.
              </P>
              <P>
                The tool most preclinical work reaches for is not native humanin but{" "}
                <Em>HNG</Em> (S14G-humanin) &mdash; a one-residue swap reported to be roughly a
                thousand times more potent in neuroprotection assays, because the native peptide is
                short-lived and comparatively weak. It is the version behind most of the striking
                animal results, and it is worth keeping straight: much of what gets attributed to
                &ldquo;humanin&rdquo; is really the behaviour of an engineered analog.
              </P>
            </Section>

            <Section title="What the evidence will and won&rsquo;t support">
              <P>
                This is where the creed &mdash; bullish on the science, sceptical on the page
                &mdash; has to earn its keep, because the biology is easy to fall for. The
                mechanism is real and unusually well characterised for so young a molecule: the Bax
                brake, the IGFBP-3 tie-in, and the trimeric receptor are each grounded in primary
                work, and an effect that shows up through two independent routes is more likely a
                true property than an artefact of one assay.
              </P>
              <Bullets
                items={[
                  ["Established", "Humanin is encoded in mitochondrial DNA, is cytoprotective in cell and rodent models, binds Bax to block apoptosis, and signals through a CNTFRα/WSX-1/gp130 receptor to STAT3. This is the well-supported core."],
                  ["Associative in humans", "Blood levels fall with age and run higher in the long-lived and their offspring, and correlate with insulin sensitivity — real observations, but correlations, not proof that raising humanin changes outcomes."],
                  ["Not yet shown", "No controlled human trials establish that administering humanin (or HNG) treats or prevents Alzheimer's, diabetes, cardiac injury, or ageing itself. The clinical case is absent, not merely early."],
                ]}
              />
              <P>
                The gap between those three lines is the whole story. Humanin is one of the more
                remarkable ideas in the catalog &mdash; a survival hormone the mitochondrion writes
                in its own genome and speaks two ways at once &mdash; and one of the least tested in
                people. Both halves of that sentence are true, and the marketing that has begun to
                attach itself to the peptide tends to quote only the first. The honest summary is
                that we found humanin by asking the cells that survived what they were holding on
                to, and we are still, twenty-odd years later, working out whether we can hand it to
                the ones that didn&rsquo;t.
              </P>
            </Section>

            {/* FAQ */}
            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">
                Common questions
              </h2>
              <dl className="mt-6 space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/40 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/humanin" label="Humanin — the reference monograph" />
                <CrossLink href="/hormones/mots-c" label="MOTS-c — the metabolic sibling" />
                <CrossLink href="/families/mitochondrial" label="Mitochondrial-derived peptides — the family" />
                <CrossLink href="/insights/the-peptide-exercise-writes" label="The peptide exercise writes — MOTS-c and the mitochondrial signals" />
                <CrossLink href="/research?q=What%20controlled%20human%20evidence%20exists%20for%20humanin%20or%20its%20analog%20HNG%20beyond%20preclinical%20cytoprotection%20and%20associative%20blood-level%20studies%3F" label="Ask the research agent what the human data shows" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific literature and
              simplified in places. Not medical advice, dosing guidance, or a recommendation to use
              any compound. Humanin is an unapproved research peptide; the cytoprotective findings
              described here are preclinical &mdash; cell and animal models, often using the
              engineered analog HNG &mdash; and the human data is associative, not interventional.
              Verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── One peptide, two readings: intracellular Bax brake vs secreted receptor → STAT3 ── */
function TwoRoomsDiagram() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 620 372"
        className="mx-auto w-full max-w-xl"
        role="img"
        aria-label="Humanin, a 24-residue peptide encoded in mitochondrial DNA, acts two ways. Read inside the cell, it binds the pro-apoptotic protein Bax and prevents it from reaching the mitochondrion, so the outer membrane is not permeabilised and apoptosis does not start. Secreted from the cell, the same peptide binds a trimeric receptor made of CNTFR-alpha, WSX-1 and gp130, activating STAT3 and pro-survival gene expression."
      >
        {/* origin badge */}
        <rect x="228" y="10" width="164" height="30" rx="15" fill="color-mix(in srgb, var(--accent-blue) 14%, transparent)" stroke="var(--accent-blue)" strokeWidth="1.5" />
        <text x="310" y="30" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Humanin · 24 aa · mtDNA</text>

        {/* split arrows */}
        <path d="M 270 42 L 150 66" fill="none" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M 350 42 L 470 66" fill="none" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />

        {/* ── LEFT: intracellular ── */}
        <rect x="20" y="70" width="270" height="284" rx="14" fill="var(--panel)" stroke="var(--color-ink)" strokeOpacity="0.1" />
        <text x="36" y="92" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily="var(--font-mono, monospace)" letterSpacing="0.1em">READ INSIDE · THE BRAKE</text>

        <rect x="96" y="104" width="118" height="26" rx="13" fill="color-mix(in srgb, var(--accent-blue) 16%, transparent)" stroke="var(--accent-blue)" strokeWidth="1.5" />
        <text x="155" y="122" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Humanin</text>

        {/* inhibition tee → Bax */}
        <line x1="155" y1="130" x2="155" y2="146" stroke="var(--accent-blue)" strokeOpacity="0.85" strokeWidth="2" />
        <line x1="141" y1="146" x2="169" y2="146" stroke="var(--accent-blue)" strokeOpacity="0.85" strokeWidth="2.5" />

        <rect x="96" y="150" width="118" height="42" rx="10" fill="var(--surface)" stroke="var(--color-ink)" strokeOpacity="0.2" />
        <text x="155" y="169" textAnchor="middle" fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Bax</text>
        <text x="155" y="184" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">translocation blocked</text>

        {/* dashed (blocked) route to mito */}
        <line x1="155" y1="192" x2="155" y2="212" stroke="var(--color-ink)" strokeOpacity="0.28" strokeWidth="2" strokeDasharray="4 4" />

        <rect x="66" y="216" width="178" height="52" rx="14" fill="var(--surface-deep)" stroke="var(--color-ink)" strokeOpacity="0.22" strokeWidth="1.5" />
        <text x="155" y="238" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Mitochondrion</text>
        <text x="155" y="255" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="11">membrane stays sealed</text>

        <text x="155" y="300" textAnchor="middle" fill="var(--accent-blue)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">No apoptosis</text>
        <text x="155" y="318" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">also binds Bid · Bim · IGFBP-3</text>

        {/* ── RIGHT: secreted ── */}
        <rect x="330" y="70" width="270" height="284" rx="14" fill="var(--panel)" stroke="var(--color-ink)" strokeOpacity="0.1" />
        <text x="346" y="92" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily="var(--font-mono, monospace)" letterSpacing="0.1em">SECRETED · THE HORMONE</text>

        <rect x="406" y="104" width="118" height="26" rx="13" fill="color-mix(in srgb, var(--accent-blue) 16%, transparent)" stroke="var(--accent-blue)" strokeWidth="1.5" />
        <text x="465" y="122" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Humanin</text>

        <line x1="465" y1="130" x2="465" y2="146" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M 460 138 L 465 146 L 470 138" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />

        {/* trimeric receptor: three subunits */}
        <g>
          <rect x="398" y="150" width="42" height="40" rx="8" fill="var(--surface)" stroke="var(--accent-blue)" strokeOpacity="0.6" strokeWidth="1.5" />
          <rect x="444" y="150" width="42" height="40" rx="8" fill="var(--surface)" stroke="var(--accent-blue)" strokeOpacity="0.6" strokeWidth="1.5" />
          <rect x="490" y="150" width="42" height="40" rx="8" fill="var(--surface)" stroke="var(--accent-blue)" strokeOpacity="0.6" strokeWidth="1.5" />
          <text x="419" y="174" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.75" fontSize="8.5" fontFamily="var(--font-mono, monospace)">CNTFR</text>
          <text x="465" y="174" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.75" fontSize="8.5" fontFamily="var(--font-mono, monospace)">WSX-1</text>
          <text x="511" y="174" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.75" fontSize="8.5" fontFamily="var(--font-mono, monospace)">gp130</text>
        </g>
        <text x="465" y="205" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">trimeric receptor</text>

        <line x1="465" y1="212" x2="465" y2="228" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M 460 220 L 465 228 L 470 220" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />

        <rect x="396" y="232" width="138" height="42" rx="10" fill="var(--surface)" stroke="var(--color-ink)" strokeOpacity="0.2" />
        <text x="465" y="251" textAnchor="middle" fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">JAK / STAT3</text>
        <text x="465" y="266" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">activated</text>

        <line x1="465" y1="274" x2="465" y2="290" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M 460 282 L 465 290 L 470 282" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />

        <text x="465" y="308" textAnchor="middle" fill="var(--accent-blue)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Pro-survival genes</text>
        <text x="465" y="326" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">also via FPR2 / FPRL1</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        One peptide, two readings. Kept inside, humanin clamps the apoptosis trigger Bax before it
        reaches the mitochondrion. Secreted, it works a borrowed three-part cytokine receptor into
        STAT3 &mdash; a genuine mitochondrial hormone. Both endings read &ldquo;survive.&rdquo;
      </figcaption>
    </figure>
  );
}
