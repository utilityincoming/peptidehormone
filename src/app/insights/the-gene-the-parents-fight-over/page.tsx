import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-gene-the-parents-fight-over")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What is IGF-2? Genomic Imprinting, the Fetal Growth Factor, and Its Three Receptors — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Gene the Parents Fight Over: IGF-2, Imprinting, and a Receptor That Only Destroys · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  haig: "https://doi.org/10.1016/0168-9525(91)90230-N", // Moore & Haig 1991, Trends Genet — the parental tug-of-war theory of imprinting
  dechiara: "https://pubmed.ncbi.nlm.nih.gov/1997210/", // DeChiara et al. 1991, Cell — parental imprinting of the mouse Igf2 gene
  nicth: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10897872/", // 2024 systematic review — IGF-2-mediated hypoglycaemia in non-islet cell tumours
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is IGF-2?",
    a: "IGF-2 (insulin-like growth factor 2) is IGF-1's close sibling and the principal driver of growth before birth. It is actually the more abundant of the two IGFs in adult human blood, but it gets far less attention. Three things make it strange: it is an imprinted gene, expressed almost only from the copy inherited from the father; it can signal growth through the insulin receptor, not just the IGF-1 receptor; and it has a dedicated receptor whose job is to destroy it rather than relay its message.",
  },
  {
    q: "What does it mean that IGF-2 is imprinted?",
    a: "Most genes are expressed from both the maternal and paternal copies. IGF2 is not: in most tissues only the paternally inherited copy is active, and the maternal copy is silenced — a mark laid down depending on which parent it came from. That was proven in mice, where knocking out the father's copy stunts growth but knocking out the mother's (already-silent) copy does nothing. Imprinting is why a single faulty parental copy can have outsized effects.",
  },
  {
    q: "Why would evolution silence one parent's copy of a growth gene?",
    a: "The leading explanation is a genetic conflict of interest between the parents, the 'parental tug-of-war.' A father's genes benefit from a larger, more demanding offspring that draws maximally on the mother; a mother's genes benefit from restraining any one pregnancy to preserve her for future offspring. IGF2 is a paternally expressed growth accelerator, and — strikingly — its clearance receptor is maternally expressed, a brake. The opposing interests are written into two oppositely imprinted genes.",
  },
  {
    q: "How can a receptor regulate a hormone by degrading it?",
    a: "IGF-2 has three receptors. Two of them signal growth: the IGF-1 receptor, and — distinctively — the A isoform of the insulin receptor, a growth route that bypasses IGF-1R entirely. The third, the IGF-2/mannose-6-phosphate receptor, does not signal at all. It binds IGF-2 and routes it to be broken down, acting as a sink that sets how much IGF-2 is available. It regulates the hormone not by passing its message on, but by removing it.",
  },
  {
    q: "What is non-islet-cell tumor hypoglycemia?",
    a: "It is a rare syndrome in which a tumor — often a fibrous tumor — secretes an incompletely processed form of IGF-2 ('big IGF-2') in such quantity that it overwhelms the body's buffering and acts on insulin receptors, dropping blood sugar. The tell is a low insulin and low IGF-1 with a raised IGF-2/IGF-1 ratio. It is the adult clinical face of IGF-2's insulin-like power: the fetal growth factor, unleashed, reads out as a crashing glucose.",
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
            <Section title="The sibling that grew first">
              <P>
                This reference has told the{" "}
                <Link href="/hormones/igf-1" className={LINK}>IGF-1</Link> story several
                ways — as the{" "}
                <Link href="/insights/the-other-pedal" className={LINK}>accelerator</Link>{" "}
                the growth-hormone axis works through, and as the molecule whose{" "}
                <Link href="/insights/igf-1-lr3" className={LINK}>half-life the vendor pages
                get backwards</Link>. IGF-1 has a sibling, nearly identical in shape and
                name:{" "}
                <Link href="/hormones/igf-2" className={LINK}>IGF-2</Link>. It is, by most
                measures, the stranger and in some ways the more important of the two — the
                dominant growth factor <Em>before</Em> birth, and the more abundant IGF in
                adult human blood. Yet it is rarely discussed, because it plays by rules
                that have nothing to do with the growth-hormone axis.
              </P>
              <P>
                IGF-2 is governed by something far older and odder: a genetic tug-of-war
                between the two parents, written into the gene itself. It is expressed from
                only one parent&rsquo;s copy, buffered by a receptor whose only job is to
                destroy it, and capable of signaling growth through the insulin receptor.
                Three unusual facts, and each one is a window into how growth is controlled
                before the familiar hormones ever take over. Bullish on the science, which
                here is genuinely strange.
              </P>
            </Section>

            <Section title="Written from the father">
              <P>
                Start with the strangest fact. Almost every gene you carry is expressed from
                both copies — the one from your mother and the one from your father. IGF2 is
                not. In most tissues, only the <Em>paternally</Em> inherited copy is switched
                on; the copy from the mother is chemically silenced, marked according to which
                parent it came from. This is <Em>genomic imprinting</Em>, and IGF-2 is its
                textbook example.
              </P>
              <P>
                The proof is clean and comes from mice. Knock out the father&rsquo;s copy of
                Igf2 and the pups are born small, because the active copy is gone; knock out
                the mother&rsquo;s copy and nothing changes, because it was silent anyway (
                <a href={REF.dechiara} target="_blank" rel="noopener noreferrer" className={LINK}>
                  DeChiara et&nbsp;al., Cell, 1991
                </a>
                ). Same gene, same mutation, opposite consequences, decided entirely by which
                parent it was inherited from. That asymmetry is not a quirk. It is a clue to a
                conflict.
              </P>
            </Section>

            <Section title="The tug-of-war">
              <P>
                Why would evolution ever silence one parent&rsquo;s copy of a growth gene? The
                most compelling answer is that the two parents&rsquo; genetic interests do not
                align over how much a fetus should draw from its mother (
                <a href={REF.haig} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Moore &amp; Haig, Trends&nbsp;Genet, 1991
                </a>
                ). A father&rsquo;s genes benefit from a larger, more demanding offspring that
                extracts maximal resources now — he may not be the father of the mother&rsquo;s
                next child. The mother&rsquo;s genes benefit from restraint, rationing any single
                pregnancy to preserve her for the ones to come. Growth before birth becomes a
                negotiation between those two interests.
              </P>
              <P>
                And IGF-2 is where the negotiation is written down. The paternally expressed{" "}
                <Em>IGF2</Em> gene is the accelerator — push for growth. Its main clearance
                receptor, the IGF-2/mannose-6-phosphate receptor, is <Em>maternally</Em>{" "}
                expressed — the brake that removes IGF-2 from circulation. The father&rsquo;s
                allele makes the growth signal; the mother&rsquo;s allele makes the thing that
                destroys it. The parental conflict is not a metaphor laid over the biology; it
                is literally encoded as two oppositely imprinted genes pulling in opposite
                directions on the same axis.
              </P>
              <TugOfWar />
            </Section>

            <Section title="Three receptors, and one that only destroys">
              <P>
                That clearance receptor is worth dwelling on, because it breaks the usual rule
                that a receptor exists to pass a message along. IGF-2 has three. Two of them
                signal growth: the IGF-1 receptor, and — distinctively — the A isoform of the{" "}
                <Link href="/hormones/insulin" className={LINK}>insulin</Link> receptor, which
                gives IGF-2 a route to growth signaling that bypasses IGF-1R entirely. This is
                why IGF-2 carries an insulin-like punch that IGF-1 does not.
              </P>
              <P>
                The third, the IGF-2/mannose-6-phosphate receptor, signals nothing. It binds
                IGF-2 and routes it for degradation — a non-signaling sink that sets how much
                hormone is available by removing the excess. A receptor that regulates its
                ligand by destroying it is a genuine rarity, and it is no accident that this is
                the one the mother&rsquo;s genome keeps switched on. The brake in the tug-of-war
                is a molecular trash chute, and the whole system&rsquo;s balance is the
                difference between how fast the accelerator makes IGF-2 and how fast the chute
                clears it.
              </P>
            </Section>

            <Section title="When the balance breaks">
              <P>
                A system held in tension by opposing imprinted genes fails in both directions,
                and the failures are instructive. Tip it toward too much IGF-2 — by losing the
                imprinting that silences the maternal copy, so both copies fire — and you get
                overgrowth: Beckwith-Wiedemann syndrome, with its oversized babies and raised
                tumor risk. Tip it the other way, toward too little, and you get the growth
                restriction of Silver-Russell syndrome. The same dial, read from both ends. Loss
                of IGF2 imprinting is also common in cancer, where reactivating a silenced growth
                signal is exactly the wrong thing to do.
              </P>
              <P>
                The adult clinical face is stranger still. Some tumors secrete an incompletely
                processed form of IGF-2 — &ldquo;big IGF-2&rdquo; — in enough quantity to
                overwhelm the buffering system and spill onto insulin receptors, dropping blood
                sugar. The result is non-islet-cell tumor hypoglycemia, recognizable by a low
                insulin and low IGF-1 alongside a raised IGF-2/IGF-1 ratio (
                <a href={REF.nicth} target="_blank" rel="noopener noreferrer" className={LINK}>
                  systematic review, 2024
                </a>
                ). It is the fetal growth factor&rsquo;s insulin-like power, unleashed in an
                adult, reading out not as growth but as a crashing glucose.
              </P>
              <Callout label="The mechanism read">
                IGF-2 is controlled less by how much is made than by the balance between a
                paternally driven accelerator and a maternally driven clearance brake. Every
                disorder of it — overgrowth, growth restriction, tumor hypoglycemia — is that
                balance tipping. The hormone that looks like a minor sibling of IGF-1 is actually
                the clearest case in the body of growth governed by genetic conflict.
              </Callout>
            </Section>

            <Section title="Completing the picture">
              <P>
                Set the two insulin-like growth factors side by side and the division of labor
                is almost poetic. IGF-1 is the postnatal growth factor, obedient to the
                growth-hormone axis, the one the muscle and anti-aging stories are built on.
                IGF-2 is the prenatal one, deaf to growth hormone and answerable instead to a
                parental tug-of-war older than the endocrine system itself — signaling through a
                borrowed insulin receptor and buffered by a receptor that only destroys. The
                sibling that grew first turns out to be the one that reveals how strange the
                control of growth really is.
              </P>
              <Bullets
                items={[
                  ["IGF-2 is the prenatal growth factor", "The dominant IGF before birth and the more abundant one in adult blood — but governed by imprinting, not the GH axis that runs IGF-1."],
                  ["It is expressed from only the father's copy", "Genomic imprinting silences the maternal allele. Mouse knockouts prove it: lose the paternal copy and growth fails; lose the (silent) maternal copy and nothing happens."],
                  ["The imprinting encodes a parental tug-of-war", "Paternal genes favor a bigger offspring; maternal genes favor restraint. IGF2 (paternal) is the accelerator; its clearance receptor IGF2R (maternal) is the brake — conflict written as two genes."],
                  ["Three receptors — one only destroys", "IGF-2 signals growth through IGF-1R and insulin receptor isoform A (bypassing IGF-1R), while the IGF-2/M6P receptor is a non-signaling sink that clears it."],
                  ["The balance breaks both ways", "Too much (loss of imprinting) → overgrowth (Beckwith-Wiedemann) and cancer; too little → Silver-Russell; tumor-secreted 'big IGF-2' → hypoglycemia. Every disorder is the dial tipping."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/igf-2" label="IGF-2 reference (the imprinted sibling)" />
                <CrossLink href="/hormones/igf-1" label="IGF-1 reference (the postnatal growth factor)" />
                <CrossLink href="/hormones/insulin" label="Insulin reference (the receptor IGF-2 borrows)" />
                <CrossLink href="/insights/the-other-pedal" label="The other pedal — the IGF-1 accelerator" />
                <CrossLink href="/insights/igf-1-lr3" label="The half-life, backwards — IGF-1 LR3" />
                <CrossLink href="/families/growth-repair" label="The growth & repair family" />
                <CrossLink href="/research?q=Why%20is%20IGF-2%20genomically%20imprinted%2C%20how%20does%20the%20parental%20tug-of-war%20theory%20explain%20it%2C%20and%20how%20does%20the%20IGF-2%2FM6P%20receptor%20regulate%20it%20by%20degradation%3F" label="Ask the research agent about IGF-2 imprinting" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not
              medical advice, dosing guidance, or a recommendation to use any compound.
              Specific conditions are named to explain the science; verify any claim against
              the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The parental tug-of-war: paternal IGF2 pushes growth, maternal IGF2R clears it ── */
function TugOfWar() {
  const W = 700;
  const H = 288;
  const midX = W / 2;
  const axisY = 150;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A tug-of-war diagram over fetal growth. On the left, the paternally expressed IGF2 gene pulls toward more growth — it is the accelerator. On the right, the maternally expressed IGF2/mannose-6-phosphate receptor pulls toward restraint by clearing IGF-2 — it is the brake. Fetal growth sits in the middle as the balance point between the two opposing, oppositely imprinted genes."
      >
        <text x={midX} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Fetal growth, pulled from both sides
        </text>

        {/* central axis / rope */}
        <line x1={120} y1={axisY} x2={580} y2={axisY} stroke="var(--color-ink)" strokeOpacity={0.2} strokeWidth={2} />

        {/* paternal side (accelerator) */}
        <g>
          <rect x={60} y={axisY - 44} width={200} height={88} rx={14}
            fill="color-mix(in srgb, var(--accent-blue) 13%, transparent)" stroke="var(--accent-blue)" strokeOpacity={0.6} strokeWidth={1.4} />
          <text x={160} y={axisY - 18} textAnchor="middle" fill="var(--accent-blue)" fillOpacity={0.95} fontSize="11.5" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">PATERNAL</text>
          <text x={160} y={axisY + 2} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.85} fontSize="13" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">IGF2 gene</text>
          <text x={160} y={axisY + 22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="10">accelerator · make the signal</text>
        </g>
        {/* pull arrow toward growth (right→left? paternal pushes growth UP) */}
        <path d={`M 264 ${axisY} L 300 ${axisY}`} stroke="var(--accent-blue)" strokeOpacity={0.6} strokeWidth={2} markerEnd="url(#tow-r)" />

        {/* maternal side (brake) */}
        <g>
          <rect x={440} y={axisY - 44} width={200} height={88} rx={14}
            fill="color-mix(in srgb, var(--color-ink) 6%, transparent)" stroke="var(--color-ink)" strokeOpacity={0.3} strokeWidth={1.4} />
          <text x={540} y={axisY - 18} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.6} fontSize="11.5" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">MATERNAL</text>
          <text x={540} y={axisY + 2} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.85} fontSize="13" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">IGF2R receptor</text>
          <text x={540} y={axisY + 22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="10">brake · clear the signal</text>
        </g>
        <path d={`M 436 ${axisY} L 400 ${axisY}`} stroke="var(--color-ink)" strokeOpacity={0.4} strokeWidth={2} markerEnd="url(#tow-l)" />

        {/* center balance knot */}
        <circle cx={midX} cy={axisY} r={13} fill="color-mix(in srgb, var(--accent-blue) 20%, transparent)" stroke="var(--accent-blue)" strokeOpacity={0.7} strokeWidth={1.5} />
        <text x={midX} y={axisY + 44} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.7} fontSize="11" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">how much IGF-2 is available</text>
        <text x={midX} y={axisY + 60} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.45} fontSize="9.5">= fetal growth setpoint</text>

        <defs>
          <marker id="tow-r" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto"><path d="M0 0 L7 4.5 L0 9 z" fill="var(--accent-blue)" fillOpacity="0.7" /></marker>
          <marker id="tow-l" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto"><path d="M0 0 L7 4.5 L0 9 z" fill="var(--color-ink)" fillOpacity="0.45" /></marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The conflict is encoded as two oppositely imprinted genes: the father&rsquo;s IGF2 makes
        the growth signal, the mother&rsquo;s IGF2R clears it. Growth is where they balance.
      </figcaption>
    </figure>
  );
}
