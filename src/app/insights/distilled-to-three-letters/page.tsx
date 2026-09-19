import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("distilled-to-three-letters")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  lecture:
    "https://peptideproduct.com/upload/Scientific%20lecture_Peptides_in_complex_therapy_of_musculoskeletal_pathology_Linkova.pdf", // Linkova, "Peptides in complex therapy of musculoskeletal pathology" — source of the Sigumir/Cartalax experimental and clinical figures
  geneExpr: "https://link.springer.com/article/10.1007/s10517-016-3596-7", // Khavinson et al., Bull Exp Biol Med 2016 — short peptides enter the nucleus and bind DNA; AED assigned to an ACCT motif
  epigenetic: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6624906/", // Peptides as epigenetic modulators — independent review of the wider hypothesis
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
              <Link href="/families/calcium-bone" className="text-accent-blue hover:text-ink">
                Calcium &amp; bone
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
            <Section title="A whole tissue, and the fragment it came down to">
              <P>
                Start with the tissue, not the molecule. <Em>Sigumir</Em> is a peptide
                complex extracted from the cartilage and bone of young animals &mdash; a
                heterogeneous soup of fragments running from about 75 to 10,000 daltons,
                sold in Russia as a food supplement for aching joints. It is the kind of
                preparation modern pharmacology is trained to distrust: a crude extract
                doing something, with no single active ingredient named.
              </P>
              <P>
                So the St. Petersburg Institute of Bioregulation and Gerontology did the
                reductionist thing and asked the extract what, exactly, was doing the
                work. Run through MALDI mass spectrometry and liquid
                chromatography&ndash;mass spec, the cartilage complex gave up a recurring
                short sequence: a <Em>tripeptide</Em>, Ala&ndash;Glu&ndash;Asp &mdash;
                three letters, A&ndash;E&ndash;D. Synthesized on its own, that fragment
                reportedly carried much of the parent complex&rsquo;s activity. The
                isolated tripeptide is sold as <Em>Cartalax</Em>.
              </P>
              <DistillationDiagram />
              <P>
                If that shape of story feels familiar, it should. It is the same move that
                gave the melanocortin family its cleanest fragment &mdash; take a large,
                busy source, find the smallest piece that still does the interesting thing,
                and keep only that. Where{" "}
                <Link href="/insights/the-last-three-words" className={LINK}>KPV</Link> was
                cut from a single 13-residue hormone, Cartalax was distilled out of a whole
                tissue. The premise underneath is far bolder, and that is where the
                scepticism has to start.
              </P>
            </Section>

            <Section title="The switch it claims to throw">
              <P>
                Osteoarthritis is, at the cellular level, a demographics problem inside the
                cartilage. Chondrocytes &mdash; the only cells hyaline cartilage has &mdash;
                stop dividing and start dying. Oxidative stress from the inflamed joint
                pushes up <Em>p53</Em>, the tumour-suppressor that also serves as the
                trigger for programmed cell death, so more chondrocytes commit apoptosis.
                At the same time their proliferative reserve falls, and cartilage that
                cannot replace its own cells cannot repair its matrix.
              </P>
              <P>
                The claim for AED is that it reaches into that balance and moves both
                dials the right way at once. In cultured cartilage explants from rats,
                Cartalax and the parent Sigumir raised the <Em>area index</Em> &mdash; a
                measure of how far chondrocytes migrate and divide out from a cartilage
                fragment &mdash; by{" "}
                <a href={REF.lecture} target="_blank" rel="noopener noreferrer" className={LINK}>
                  18 to 38 percent
                </a>
                . Alongside that, the peptides raised PCNA, the proliferation marker that
                rides with DNA polymerase during cell division, and lowered p53. Less of
                the apoptosis trigger, more of the division machinery: chondrocytes that
                had gone quiet were reported to start dividing again.
              </P>
              <MechanismDiagram />
              <P>
                There is a second, separate line for bone. Cartalax was studied in rats
                whose bone density had been driven down &mdash; by ovariectomy in one model
                (an analogue of post-menopausal osteoporosis) and by removing the pineal
                gland in another. In the pineal model the tripeptide restored the number
                and function of the thyroid&rsquo;s calcitonin-producing C-cells &mdash;
                calcitonin being the hormone that opposes bone resorption. That is the
                thread tying this molecule to the{" "}
                <Link href="/families/calcium-bone" className={LINK}>calcium &amp; bone</Link>{" "}
                axis rather than to cartilage alone.
              </P>
              <Callout label="Read the ovariectomy result honestly">
                Even inside the source&rsquo;s own data, the effect is modest and
                temporary. Cartalax raised bone mineral density <Em>while it was being
                given</Em> and then let go &mdash; the gain did not persist after the
                course the way the whole-tissue Sigumir complex&rsquo;s did. The lecture
                turns that into an argument for taking it indefinitely. It reads just as
                easily as an effect that needs constant input to exist at all.
              </Callout>
            </Section>

            <Section title="The bioregulator hypothesis">
              <P>
                A tripeptide is far too small to fold into a lock-and-key ligand for a cell-
                surface receptor. So the Khavinson school proposes something else entirely,
                and it is the boldest mechanistic claim in peptide science: that these
                &ldquo;short peptide bioregulators&rdquo; pass through the cell and nuclear
                membranes, enter the nucleus, and bind <Em>DNA directly</Em> &mdash; each
                short sequence recognising a particular stretch of the double helix and
                nudging specific genes on or off. In this reading AED is assigned to an{" "}
                <a href={REF.geneExpr} target="_blank" rel="noopener noreferrer" className={LINK}>
                  ACCT motif
                </a>
                , and the p53/PCNA shift is downstream of that binding &mdash; the peptide
                acting as a tiny epigenetic dial rather than a hormone.
              </P>
              <P>
                It is a genuinely elegant idea, and it is not physically absurd &mdash;
                sequence-specific minor-groove binding by small molecules is real, and{" "}
                <a href={REF.epigenetic} target="_blank" rel="noopener noreferrer" className={LINK}>
                  peptides as epigenetic modulators
                </a>{" "}
                is a live research area. What should make a careful reader slow down is
                that almost the entire edifice &mdash; the sequences, the binding motifs,
                the tissue-specificity, the clinical results &mdash; comes from a single
                institute and its collaborators, published largely in one literature, and
                has not been reproduced at scale by independent groups. A mechanism this
                sweeping, resting this heavily on one source, is exactly the kind of claim
                the rest of the field is right to want replicated before it believes it.
              </P>
            </Section>

            <Section title="What the evidence will and won&rsquo;t support">
              <P>
                The mechanism is a pleasure to follow, which is exactly where the
                site&rsquo;s creed &mdash; bullish on the science, sceptical on the page
                &mdash; has to earn its keep. Cartalax is sold and studied as an oral
                capsule, and the human data behind it is thinner than the confident
                marketing implies.
              </P>
              <Bullets
                items={[
                  ["The trials are open-label add-ons", "In knee-osteoarthritis patients, Cartalax was given on top of conventional treatment and reduced pain in 55–63% of cases. There is no blinding, no placebo arm, and the endpoint is subjective pain — a design that cannot separate the peptide from the attention, the co-treatment, and expectancy."],
                  ["Nothing moved on the X-ray", "The relief, such as it was, showed up in how patients felt, mainly at the earliest disease stages. Radiological measures of the joint did not change over the study. A cartilage-regeneration claim wants a structural readout; this evidence does not have one."],
                  ["It has to survive being eaten", "A peptide swallowed is, chemically, food. A tripeptide is small enough to be a plausible substrate for the gut's PepT1 transporter rather than fully digested — the same loophole that lets KPV work orally — but whether an intact, meaningful dose of AED reaches cartilage or bone in a person is assumed here, not demonstrated."],
                ]}
              />
              <P>
                So both halves of the honest sentence are true at once. Cartalax sits on a
                mechanistic idea that is one of the most interesting in the field &mdash;
                distil a tissue to a tripeptide, and have that tripeptide tune the genes of
                the cells that build the tissue &mdash; and on a human evidence base that is
                open-label, subjective, and effectively single-source. The elegance is real;
                the proof, for now, is not. Treat the arresting mechanism as a reason to
                watch the independent literature, not as a result that has already come in.
              </P>
              <Callout label="One small tell">
                The source lecture even expands the sequence inconsistently &mdash; writing
                &ldquo;Alanine&ndash;Glutamine&ndash;Asparagine&rdquo; where the accepted
                reading of A&ndash;E&ndash;D is Alanine&ndash;Glutamic acid&ndash;Aspartic
                acid. A translation slip, not a scandal &mdash; but a reminder to verify
                even the primary claims against more than one source.
              </Callout>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/families/calcium-bone" label="Calcium & bone — the axis Cartalax's bone claim sits on" />
                <CrossLink href="/insights/the-last-three-words" label="KPV — the other 'smallest active fragment' story" />
                <CrossLink href="/insights/getting-the-molecule-in" label="Why peptides need the needle — and when a tripeptide escapes it" />
                <CrossLink href="/insights/the-complexity-ladder" label="The complexity ladder — how far you can shrink a peptide and keep a function" />
                <CrossLink href="/research?q=What%20independent%2C%20non-Khavinson-group%20evidence%20exists%20that%20the%20tripeptide%20AED%20%28Cartalax%29%20regulates%20chondrocyte%20gene%20expression%20or%20treats%20osteoarthritis%20in%20humans%3F" label="Ask the research agent what independent evidence exists" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing guidance, or
              a recommendation to use any compound. Cartalax (AED) is an unapproved research
              peptide sold abroad as a supplement; the cartilage and bone findings described
              here are largely preclinical and single-source, and the human results are
              open-label and use subjective endpoints. Verify any claim against the linked
              primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Distillation: a heterogeneous tissue complex resolved by mass spec down to one tripeptide ── */
function DistillationDiagram() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 560 300"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="The Sigumir cartilage complex is a mixture of peptides from about 75 to 10,000 daltons. Mass spectrometry resolves it into components, from which the tripeptide Ala-Glu-Asp is identified as the recurring active fragment and synthesized as Cartalax."
      >
        {/* source complex */}
        <rect x="18" y="70" width="150" height="160" rx="14" fill="var(--surface-deep)" stroke="var(--color-ink)" strokeOpacity="0.12" />
        <text x="93" y="58" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Sigumir</text>
        <text x="93" y="248" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily="var(--font-mono, monospace)">75–10,000 Da</text>
        {/* scattered fragments */}
        {[
          [46, 100, 26], [104, 92, 40], [70, 130, 18], [120, 132, 30], [40, 160, 34],
          [98, 168, 22], [132, 190, 16], [58, 200, 28], [110, 206, 20], [80, 108, 14],
        ].map(([cx, cy, w], i) => (
          <rect key={i} x={cx} y={cy} width={w} height="9" rx="4.5" fill="color-mix(in srgb, var(--accent-blue) 22%, transparent)" stroke="var(--accent-blue)" strokeOpacity="0.4" strokeWidth="0.75" />
        ))}

        {/* mass-spec stage */}
        <line x1="176" y1="150" x2="214" y2="150" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M 208 145 L 214 150 L 208 155" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />
        <rect x="216" y="120" width="128" height="60" rx="12" fill="var(--panel)" stroke="var(--color-ink)" strokeOpacity="0.16" />
        <text x="280" y="146" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">MALDI · HPLC-MS</text>
        <text x="280" y="164" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">resolve &amp; identify</text>
        <line x1="346" y1="150" x2="384" y2="150" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M 378 145 L 384 150 L 378 155" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />

        {/* the isolated tripeptide */}
        <rect x="388" y="112" width="156" height="76" rx="14" fill="color-mix(in srgb, var(--accent-blue) 12%, transparent)" stroke="var(--accent-blue)" strokeWidth="2" />
        {["Ala", "Glu", "Asp"].map((r, i) => (
          <g key={r}>
            <rect x={400 + i * 46} y="128" width="40" height="30" rx="8" fill="var(--surface)" stroke="var(--accent-blue)" strokeOpacity="0.7" strokeWidth="1.25" />
            <text x={420 + i * 46} y="148" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{r}</text>
          </g>
        ))}
        <text x="466" y="178" textAnchor="middle" fill="var(--accent-blue)" fontSize="11.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">AED — Cartalax</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The whole-cartilage complex is resolved by mass spec, and one recurring tripeptide
        &mdash; Ala&ndash;Glu&ndash;Asp &mdash; is pulled out and made on its own as Cartalax.
      </figcaption>
    </figure>
  );
}

/* ── Mechanism: in the osteoarthritic chondrocyte, AED is claimed to lower p53 and raise PCNA ── */
function MechanismDiagram() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 560 260"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="In an osteoarthritic chondrocyte, p53 is high and PCNA is low, so the cell tends toward apoptosis. The AED tripeptide is claimed to lower p53 and raise PCNA, shifting the cell toward proliferation and a higher cartilage area index of 18 to 38 percent."
      >
        {/* OA state */}
        <rect x="18" y="30" width="176" height="200" rx="14" fill="var(--surface-deep)" stroke="var(--color-ink)" strokeOpacity="0.12" />
        <text x="106" y="52" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11" fontFamily="var(--font-mono, monospace)" letterSpacing="0.08em">OA CHONDROCYTE</text>
        <rect x="40" y="70" width="132" height="40" rx="10" fill="color-mix(in srgb, var(--color-ink) 6%, transparent)" stroke="var(--color-ink)" strokeOpacity="0.18" />
        <text x="106" y="88" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">p53 high ↑</text>
        <text x="106" y="103" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10">apoptosis trigger</text>
        <rect x="40" y="120" width="132" height="40" rx="10" fill="color-mix(in srgb, var(--color-ink) 6%, transparent)" stroke="var(--color-ink)" strokeOpacity="0.18" />
        <text x="106" y="138" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">PCNA low ↓</text>
        <text x="106" y="153" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10">division stalls</text>
        <text x="106" y="192" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">→ apoptosis</text>
        <text x="106" y="210" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="10.5">cartilage cannot repair</text>

        {/* AED arrow */}
        <line x1="200" y1="130" x2="356" y2="130" stroke="var(--accent-blue)" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M 349 124 L 356 130 L 349 136" fill="none" stroke="var(--accent-blue)" strokeOpacity="0.7" strokeWidth="2" />
        <rect x="238" y="106" width="80" height="26" rx="13" fill="color-mix(in srgb, var(--accent-blue) 16%, transparent)" stroke="var(--accent-blue)" strokeWidth="1.5" />
        <text x="278" y="123" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">AED</text>
        <text x="278" y="150" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10">claimed via DNA binding</text>

        {/* treated state */}
        <rect x="362" y="30" width="180" height="200" rx="14" fill="color-mix(in srgb, var(--accent-blue) 8%, transparent)" stroke="var(--accent-blue)" strokeOpacity="0.4" />
        <text x="452" y="52" textAnchor="middle" fill="var(--accent-blue)" fontSize="11" fontFamily="var(--font-mono, monospace)" letterSpacing="0.08em">WITH AED</text>
        <rect x="384" y="70" width="136" height="40" rx="10" fill="var(--surface)" stroke="var(--accent-blue)" strokeOpacity="0.5" />
        <text x="452" y="88" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">p53 down ↓</text>
        <text x="452" y="103" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10">apoptosis eased</text>
        <rect x="384" y="120" width="136" height="40" rx="10" fill="var(--surface)" stroke="var(--accent-blue)" strokeOpacity="0.5" />
        <text x="452" y="138" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">PCNA up ↑</text>
        <text x="452" y="153" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10">division resumes</text>
        <text x="452" y="192" textAnchor="middle" fill="var(--accent-blue)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">→ proliferation</text>
        <text x="452" y="210" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">area index +18–38%</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The reported effect, and its claimed route: lower the apoptosis trigger p53, raise
        the proliferation marker PCNA, and quiet chondrocytes divide again. The mechanism
        arrow is the part that still needs independent confirmation.
      </figcaption>
    </figure>
  );
}
