import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-last-three-words")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  pept1: "https://pubmed.ncbi.nlm.nih.gov/18061177/", // Dalmasso et al., Gastroenterology 2008 — PepT1 uptake, nanomolar, DSS/TNBS
  ibd: "https://pubmed.ncbi.nlm.nih.gov/18092346/", // KPV in murine IBD models, Inflamm Bowel Dis 2008
  cornea: "https://pubmed.ncbi.nlm.nih.gov/16965771/", // α-MSH(11-13) corneal epithelial wound healing, role of NO, 2006
  tbi: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0071056", // α-MSH(11-13) attenuates brain injury, PLoS One 2013
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(245,181,68,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/melanocortins" className="text-accent-amber hover:text-ink">
                Melanocortins
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
            <Section title="A hormone that says too much">
              <P>
                <Link href="/hormones/alpha-msh" className={LINK}>&alpha;-MSH</Link> is thirteen
                residues cleaved from POMC, and it is unusually busy for its size. Reach a
                melanocyte&rsquo;s MC1R and it darkens skin; reach the hypothalamus&rsquo;s MC4R
                and it curbs appetite; and beyond the receptors it quietens inflammation almost
                everywhere it travels. One short peptide, several meanings, sorted by whichever{" "}
                <Link href="/families/melanocortins" className={LINK}>melanocortin receptor</Link>{" "}
                happens to be listening.
              </P>
              <P>
                That versatility is also the problem. The anti-inflammatory action is the prize
                &mdash; a native brake on the very pathways that drive colitis, dermatitis,
                uveitis &mdash; but you cannot ask &alpha;-MSH for it in isolation. Hand the whole
                peptide to an inflamed gut and you hand it the machinery for pigment and appetite
                as well. The molecule means too much to be a clean drug.
              </P>
              <P>
                The elegant escape isn&rsquo;t to redesign &alpha;-MSH. It is to <Em>cut</Em> it
                &mdash; and to find that most of the anti-inflammatory meaning survives in a
                fragment small enough to count on one hand.
              </P>
            </Section>

            <Section title="Cut to the clause">
              <P>
                The melanocortin <Em>message</Em> &mdash; the part the receptors actually read
                &mdash; sits in the middle of the peptide, four residues written
                His&ndash;Phe&ndash;Arg&ndash;Trp. That is the pharmacophore: keep it and you
                have a melanocortin agonist, pigment and appetite included.{" "}
                <Link href="/hormones/kpv" className={LINK}>KPV</Link> is not that. It is the
                other end &mdash; Lys&ndash;Pro&ndash;Val, residues 11 to 13, the C-terminal tail
                that sits <Em>outside</Em> the pharmacophore entirely.
              </P>
              <SequenceDiagram />
              <P>
                Because it lacks the receptor-reading core, KPV cannot work a melanocortin
                receptor, and so it does none of the things the receptors do: no darkening, no
                appetite signal. What it keeps is the calm &mdash; an anti-inflammatory action
                that, it turns out, never depended on the receptor core in the first place. The
                fragment is the parent&rsquo;s soothing clause, excerpted and stripped of
                everything else it was bound to.
              </P>
            </Section>

            <Section title="The rule it breaks">
              <P>
                Here is the genuinely strange part. The textbook peptide-hormone story is a knock
                at the door: the peptide stays outside the cell, binds a surface receptor, and
                lets a second messenger carry the news inward. KPV largely skips that. It is taken
                up <Em>into</Em> the cell and acts from the inside, stepping into the NF-&kappa;B
                activation pathway and stopping it before it starts.
              </P>
              <P>
                Mechanistically, nanomolar KPV blunts the I&kappa;B-kinase step, so the inhibitor
                I&kappa;B keeps its grip and NF-&kappa;B &mdash; the master transcription factor
                for inflammatory genes &mdash; never reaches the nucleus; the MAP-kinase arm is
                damped in{" "}
                <a href={REF.pept1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  parallel
                </a>
                . The readout downstream is fewer pro-inflammatory cytokines &mdash; TNF-&alpha;,
                IL-1&beta;, IL-6 all fall. It is the result a surface anti-inflammatory receptor
                would give you, reached by walking in the back door instead of ringing the front.
              </P>
              <Callout label="The question KPV refuses">
                Receptor selectivity &mdash; which of MC1R through MC5R a ligand prefers &mdash;
                is the central design problem for every other melanocortin. KPV opts out of it.
                With no pharmacophore to be selective <Em>with</Em>, it can&rsquo;t be a selective
                agonist at all; it simply enters the cell and quiets the pathway. The
                family&rsquo;s hardest question doesn&rsquo;t apply to its smallest member.
              </Callout>
            </Section>

            <Section title="The door that opens where it&rsquo;s needed">
              <P>
                If KPV works from inside the cell, it needs a way in &mdash; and in the gut it has
                a dedicated one. <Em>PepT1</Em> (SLC15A1) is the small intestine&rsquo;s di- and
                tripeptide transporter, the carrier that hauls the two- and three-residue scraps
                of digested protein across the epithelial wall. A tripeptide is exactly its
                cargo, so KPV rides across intact rather than being broken down to loose amino
                acids first.
              </P>
              <P>
                Two things make this more than a delivery detail. First, PepT1 is barely present
                in the healthy colon &mdash; but it is <Em>induced</Em> there during inflammation,
                in IBD. The transporter KPV needs appears precisely in the tissue that needs KPV:
                the door opens where the fire is. Second, because a tripeptide survives the gut
                and has its own carrier, KPV is that rare peptide you can put in drinking water
                and still have work locally &mdash; in mouse colitis, both the DSS and TNBS
                models, oral KPV lowered inflammation and cytokine expression at{" "}
                <a href={REF.pept1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  nanomolar reach
                </a>
                .
              </P>
              <TransportDiagram />
              <P>
                This is the exception that proves the site&rsquo;s own rule. Peptides are,
                chemically, food &mdash; swallow one and the gut usually digests it before it can
                work, which is why the class lives on the needle (the{" "}
                <Link href="/insights/getting-the-molecule-in" className={LINK}>
                  delivery problem
                </Link>
                ). KPV escapes on a technicality of size: too short to be worth digesting, short
                enough to be a transporter&rsquo;s substrate. Brevity isn&rsquo;t only what makes
                it selective &mdash; it is what makes it deliverable.
              </P>
            </Section>

            <Section title="What the evidence will and won&rsquo;t support">
              <P>
                The biology is a pleasure to follow, which is exactly where the site&rsquo;s creed
                &mdash; bullish on the science, sceptical on the page &mdash; has to earn its
                keep. The anti-inflammatory effect is real, and tellingly it turns up in models
                that share nothing but the mechanism.
              </P>
              <Bullets
                items={[
                  ["The gut", "In DSS- and TNBS-induced colitis, oral KPV taken up by PepT1 reduces inflammation and pro-inflammatory cytokine expression — the most developed line of evidence."],
                  ["The eye", "The same C-terminal tripeptide accelerates corneal epithelial wound healing, an effect tied in part to nitric-oxide signalling rather than any melanocortin receptor."],
                  ["The brain", "A single dose of α-MSH(11–13) blunted microglial activation and neuronal apoptosis in a mouse model of traumatic brain injury — inflammation quieted far from the gut."],
                ]}
              />
              <P>
                An effect that generalizes across tissues this different is more likely a genuine,
                receptor-independent property than a quirk of one assay. What does <Em>not</Em>{" "}
                yet exist is the part that would matter to a person: controlled human trials.
                Every result above is preclinical &mdash; cells and rodents. The &ldquo;KPV
                cream&rdquo; and &ldquo;gut-healing peptide&rdquo; marketing has sprinted well
                past the data, which describes a promising, mechanistically coherent molecule and
                stops there. KPV is at once one of the more elegant ideas in the melanocortin
                catalog and one of the least proven in humans; both halves of that sentence are
                true.
              </P>
              <P>
                &alpha;-MSH has now been taken apart in two opposite directions, and the contrast
                is the lesson. Bremelanotide &mdash;{" "}
                <Link href="/hormones/pt-141" className={LINK}>PT-141</Link> &mdash; sharpened the
                receptor message until it hit a single receptor&rsquo;s job, and won an approval
                for desire. KPV threw the receptor message away and kept the one effect that never
                needed a receptor at all. Two ways to get a single, usable meaning out of a
                molecule that said too much: focus the sentence, or keep only its last three
                words.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/kpv" label="KPV — the reference monograph" />
                <CrossLink href="/hormones/alpha-msh" label="α-MSH — the thirteen-residue parent" />
                <CrossLink href="/families/melanocortins" label="Melanocortins — one ligand set, five receptors" />
                <CrossLink href="/hormones/pt-141" label="Bremelanotide — the parent dissected the other way" />
                <CrossLink href="/insights/getting-the-molecule-in" label="The delivery problem — why KPV's oral route is the exception" />
                <CrossLink href="/research?q=What%20controlled%20human%20evidence%20exists%20for%20KPV%20%28alpha-MSH%2011-13%29%20beyond%20preclinical%20colitis%20and%20wound-healing%20models%3F" label="Ask the research agent what the human data shows" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific literature and
              simplified in places. Not medical advice, dosing guidance, or a recommendation to
              use any compound. KPV is an unapproved research peptide; the anti-inflammatory
              findings described here are preclinical &mdash; cell and animal models &mdash; and
              have not been confirmed in controlled human trials. Verify any claim against the
              linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── One sentence, read two ways: the receptor pharmacophore (6–9) vs the KPV tail (11–13) ── */
function SequenceDiagram() {
  const residues = [
    "Ser", "Tyr", "Ser", "Met", "Glu", "His", "Phe", "Arg", "Trp", "Gly", "Lys", "Pro", "Val",
  ];
  const kind = (i: number) =>
    i >= 5 && i <= 8 ? "core" : i >= 10 ? "kpv" : "context"; // 0-indexed: 5–8 = His-Phe-Arg-Trp, 10–12 = Lys-Pro-Val
  const x = (i: number) => 14 + i * 44;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 600 156"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="The thirteen residues of alpha-MSH in a row. Residues 6 to 9, His-Phe-Arg-Trp, are the receptor pharmacophore that produces pigmentation and appetite effects. Residues 11 to 13, Lys-Pro-Val, are KPV — the C-terminal tail outside the pharmacophore, which keeps the anti-inflammatory action and is receptor-independent."
      >
        {residues.map((r, i) => {
          const k = kind(i);
          const fill =
            k === "kpv"
              ? "color-mix(in srgb, var(--accent-amber) 15%, transparent)"
              : k === "core"
                ? "color-mix(in srgb, var(--accent-blue) 12%, transparent)"
                : "var(--surface)";
          const stroke =
            k === "kpv" ? "var(--accent-amber)" : k === "core" ? "var(--accent-blue)" : "var(--color-ink)";
          const strokeOpacity = k === "context" ? 0.14 : 0.7;
          return (
            <g key={i}>
              <text x={x(i) + 20} y="40" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.35" fontSize="10" fontFamily="var(--font-mono, monospace)">{i + 1}</text>
              <rect x={x(i)} y="48" width="40" height="44" rx="8" fill={fill} stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth={k === "kpv" ? 2 : 1} />
              <text x={x(i) + 20} y="75" textAnchor="middle" fill="var(--color-ink)" fillOpacity={k === "context" ? 0.45 : 0.9} fontSize="12.5" fontWeight={k === "context" ? 400 : 600} fontFamily="var(--font-space-grotesk), sans-serif">{r}</text>
            </g>
          );
        })}

        {/* pharmacophore bracket under residues 6–9 */}
        <path d="M 234 104 L 234 110 L 406 110 L 406 104" fill="none" stroke="var(--accent-blue)" strokeOpacity="0.5" strokeWidth="1.5" />
        <text x="320" y="126" textAnchor="middle" fill="var(--accent-blue)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">His-Phe-Arg-Trp</text>
        <text x="320" y="141" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">the receptor message</text>

        {/* KPV bracket under residues 11–13 */}
        <path d="M 454 104 L 454 110 L 582 110 L 582 104" fill="none" stroke="var(--accent-amber)" strokeOpacity="0.75" strokeWidth="1.5" />
        <text x="518" y="126" textAnchor="middle" fill="var(--accent-amber)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Lys-Pro-Val — KPV</text>
        <text x="518" y="141" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">the tail, kept</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        α-MSH keeps its receptor message in residues 6&ndash;9. KPV is residues 11&ndash;13 — the
        tail, outside the pharmacophore — which is why it neither pigments nor curbs appetite, yet
        keeps the calm.
      </figcaption>
    </figure>
  );
}

/* ── Gut delivery: PepT1 (induced in inflammation) carries KPV in, where it blocks NF-κB from within ── */
function TransportDiagram() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 520 372"
        className="mx-auto w-full max-w-md"
        role="img"
        aria-label="In the inflamed gut, the tripeptide KPV crosses the epithelial membrane through the PepT1 transporter, which is induced in inflammation. Inside the cell KPV inhibits IκB kinase, so NF-κB is held in the cytoplasm and inflammatory genes stay off, lowering TNF-alpha, IL-1-beta and IL-6."
      >
        {/* lumen */}
        <rect x="20" y="12" width="480" height="44" rx="10" fill="var(--surface-deep)" stroke="var(--color-ink)" strokeOpacity="0.1" />
        <text x="36" y="39" fill="var(--color-ink)" fillOpacity="0.42" fontSize="10.5" fontFamily="var(--font-mono, monospace)" letterSpacing="0.12em">GUT LUMEN · INFLAMED</text>
        <rect x="226" y="21" width="68" height="24" rx="12" fill="color-mix(in srgb, var(--accent-amber) 16%, transparent)" stroke="var(--accent-amber)" strokeWidth="1.5" />
        <text x="260" y="38" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">KPV</text>

        {/* membrane leaflets + PepT1 channel */}
        <line x1="20" y1="68" x2="500" y2="68" stroke="var(--color-ink)" strokeOpacity="0.18" strokeWidth="2.5" />
        <line x1="20" y1="82" x2="500" y2="82" stroke="var(--color-ink)" strokeOpacity="0.18" strokeWidth="2.5" />
        <rect x="232" y="60" width="56" height="30" rx="8" fill="color-mix(in srgb, var(--accent-amber) 14%, transparent)" stroke="var(--accent-amber)" strokeWidth="2" />
        <text x="260" y="79" textAnchor="middle" fill="var(--color-ink)" fontSize="11" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">PepT1</text>
        <text x="300" y="79" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10" fontFamily="var(--font-mono, monospace)">← induced in the inflamed colon</text>

        {/* transport arrow through the channel */}
        <line x1="260" y1="45" x2="260" y2="60" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
        <line x1="260" y1="90" x2="260" y2="106" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M 255 98 L 260 106 L 265 98" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />

        {/* cell body */}
        <rect x="20" y="96" width="480" height="264" rx="14" fill="var(--panel)" stroke="var(--color-ink)" strokeOpacity="0.1" />
        <text x="36" y="119" fill="var(--color-ink)" fillOpacity="0.35" fontSize="10" fontFamily="var(--font-mono, monospace)" letterSpacing="0.12em">EPITHELIAL CELL · CYTOPLASM</text>

        {/* KPV, entered */}
        <rect x="226" y="132" width="68" height="26" rx="13" fill="color-mix(in srgb, var(--accent-amber) 16%, transparent)" stroke="var(--accent-amber)" strokeWidth="1.5" />
        <text x="260" y="150" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">KPV</text>

        {/* inhibition tee KPV ⊣ IKK */}
        <line x1="260" y1="158" x2="260" y2="172" stroke="var(--accent-amber)" strokeOpacity="0.85" strokeWidth="2" />
        <line x1="246" y1="172" x2="274" y2="172" stroke="var(--accent-amber)" strokeOpacity="0.85" strokeWidth="2.5" />

        {/* IKK node */}
        <rect x="168" y="176" width="184" height="46" rx="12" fill="var(--surface)" stroke="var(--color-ink)" strokeOpacity="0.2" />
        <text x="260" y="198" textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">IκB kinase (IKK)</text>
        <text x="260" y="214" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">phosphorylation blocked</text>

        {/* arrow → NF-κB */}
        <line x1="260" y1="222" x2="260" y2="238" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M 255 230 L 260 238 L 265 230" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />

        {/* NF-κB node */}
        <rect x="150" y="240" width="220" height="44" rx="12" fill="var(--surface)" stroke="var(--color-ink)" strokeOpacity="0.2" />
        <text x="260" y="267" textAnchor="middle" fill="var(--color-ink)" fontSize="13.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">NF-κB held in the cytoplasm</text>

        {/* arrow → nucleus */}
        <line x1="260" y1="284" x2="260" y2="300" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M 255 292 L 260 300 L 265 292" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />

        {/* nucleus */}
        <rect x="118" y="302" width="284" height="52" rx="24" fill="var(--surface-deep)" stroke="var(--color-ink)" strokeOpacity="0.22" strokeWidth="1.5" />
        <text x="260" y="324" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Nucleus — inflammatory genes stay off</text>
        <text x="260" y="343" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="11.5">TNF-α · IL-1β · IL-6 ↓</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        KPV rides PepT1 — a transporter the inflamed colon makes more of — into the cell, then
        works from the inside: block IκB kinase, and NF-κB never reaches the nucleus to switch
        inflammation on.
      </figcaption>
    </figure>
  );
}
