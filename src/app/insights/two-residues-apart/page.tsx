import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("two-residues-apart")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Vasopressin (ADH): Water Balance, V1/V2 Receptors, Desmopressin and the Vaptans — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "Two Residues Apart: Vasopressin, Oxytocin's Quieter and More Useful Twin · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  vole: "https://pubmed.ncbi.nlm.nih.gov/15201909/", // Lim et al. 2004, Nature — V1aR gene transfer increases partner preference in meadow vole
  salt: "https://pubmed.ncbi.nlm.nih.gov/17105757/", // Schrier et al. 2006, NEJM — SALT: tolvaptan (V2 antagonist) corrects hyponatremia
  vasst: "https://pubmed.ncbi.nlm.nih.gov/18305265/", // Russell et al. 2008, NEJM — VASST: vasopressin vs norepinephrine in septic shock
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is vasopressin?",
    a: "Vasopressin, also called antidiuretic hormone (ADH), is a nine-amino-acid hormone made in the hypothalamus and released from the posterior pituitary. Its main job is water balance: when the blood becomes too concentrated, vasopressin tells the kidney to reabsorb water, producing concentrated urine. It also constricts blood vessels. It is the body's primary minute-to-minute regulator of how much water the body keeps.",
  },
  {
    q: "How are vasopressin and oxytocin related?",
    a: "They are near-twins. Both are nine-residue cyclic peptides released from the posterior pituitary, and they differ by only two amino acids — at positions 3 and 8. Yet those two substitutions send them to different receptors and completely different physiology: oxytocin drives labor, milk let-down and social bonding, while vasopressin runs water balance and vascular tone. They are the textbook case that in peptides, specificity is encoded by small sequence differences, not size.",
  },
  {
    q: "What do the V1 and V2 receptors do?",
    a: "Vasopressin's actions split cleanly by receptor. V2 receptors on the kidney drive water reabsorption by inserting aquaporin water channels — the antidiuretic effect. V1a receptors on blood vessels cause vasoconstriction, raising blood pressure. V1b receptors on the pituitary help drive ACTH release in stress. Most of vasopressin's drugs are built to engage just one of these: desmopressin is V2-selective (water, no pressor effect), while the 'vaptan' drugs block V2 to shed water.",
  },
  {
    q: "What is desmopressin used for?",
    a: "Desmopressin (DDAVP) is a V2-selective vasopressin analog, longer-acting than the natural hormone and without its blood-pressure effect. That single receptor focus explains three very different-looking uses: central diabetes insipidus (replacing missing ADH), bedwetting and nocturnal enuresis (reducing overnight urine), and, surprisingly, von Willebrand disease and mild hemophilia A — because V2 activation also triggers the release of clotting factors (von Willebrand factor and factor VIII) from the vessel wall.",
  },
  {
    q: "Is vasopressin involved in bonding like oxytocin?",
    a: "In animals, yes — and the evidence is striking. In prairie voles, the vasopressin V1a receptor is central to male pair-bonding, and transferring the V1aR gene into a promiscuous vole species increased partner preference. Vasopressin shapes social, territorial and aggressive behavior across species. But the same honesty the oxytocin story requires applies here: a vole is not a person, and human behavioral therapeutics built on this are still thin. Vasopressin's proven drugs act on the kidney and the blood vessel, not on behavior.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(181,140,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/neuropeptides" className="text-accent-purple hover:text-ink">
                Neuropeptides
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
            <Section title="Two residues apart">
              <P>
                In 1953 Vincent du Vigneaud synthesized{" "}
                <Link href="/hormones/oxytocin" className={LINK}>oxytocin</Link> — the first
                peptide hormone ever made in a lab, the work that won a Nobel Prize — and
                then did the same for{" "}
                <Link href="/hormones/vasopressin" className={LINK}>vasopressin</Link>. The
                two molecules turned out to be almost the same object: nine amino acids
                each, the same disulfide ring, both released from the posterior pituitary.
                They differ at exactly two positions, the third residue and the eighth. Two
                substitutions out of nine.
              </P>
              <P>
                And yet they share almost nothing in what they do. Oxytocin drives labor,
                milk let-down, and the social-bonding story this site has{" "}
                <Link href="/insights/the-touch-deficit" className={LINK}>told elsewhere</Link>.
                Vasopressin runs water balance and blood pressure. Same scaffold, two swapped
                residues, and the result is two hormones on opposite sides of physiology —
                the cleanest demonstration in the body that peptide specificity is written in
                small sequence differences, not in size. This is the quieter twin&rsquo;s
                story, and the twist is that the quieter one became by far the more useful
                drug. Bullish on the science, sceptical on the page.
              </P>
              <TwinDiagram />
            </Section>

            <Section title="What vasopressin actually does">
              <P>
                Vasopressin is the body&rsquo;s water manager. Specialized osmoreceptors in
                the hypothalamus sense when the blood is becoming too concentrated, and
                vasopressin is released in response. Its effects then split cleanly by
                receptor. At <Em>V2</Em> receptors on the kidney&rsquo;s collecting ducts, it
                inserts aquaporin water channels into the cell membrane, so water is
                reabsorbed and the urine turns concentrated — the antidiuretic effect that
                gives the hormone its other name, ADH. At <Em>V1a</Em> receptors on blood
                vessels, it causes constriction, raising blood pressure. A third subtype,
                <Em> V1b</Em>, sits on the pituitary and contributes to the stress response.
              </P>
              <P>
                That receptor split is the whole key to the pharmacology. One hormone with
                three jobs — hold water, tighten vessels, assist the stress axis — means a
                drug can be built to pick just one of them. Nearly every vasopressin medicine
                is exactly that: a molecule tuned to a single receptor subtype, so it does one
                of the hormone&rsquo;s jobs without the others.
              </P>
            </Section>

            <Section title="The disease mirror: too little, too much">
              <P>
                The axis is easiest to read through its two failures. Too little effective
                vasopressin, and the kidney cannot hold water: this is diabetes insipidus,
                which has nothing to do with sugar and everything to do with torrents of
                dilute urine and relentless thirst — whether because the pituitary makes too
                little hormone (central) or the kidney cannot hear it (nephrogenic). Too much
                vasopressin, and the opposite happens: the body retains water it should shed,
                diluting the blood&rsquo;s sodium. That is the syndrome of inappropriate ADH,
                SIADH, and its danger is hyponatremia.
              </P>
              <P>
                Those two poles — water lost, water trapped — are exactly the handles the
                drugs grab. Replace the missing signal at one end; block the excess at the
                other. Where oxytocin&rsquo;s therapeutic story is mostly a single difficult
                idea, vasopressin&rsquo;s is a whole shelf.
              </P>
            </Section>

            <Section title="The drugs the quiet twin became">
              <P>
                <Em>Desmopressin</Em> (DDAVP) is vasopressin rebuilt to hit V2 and little
                else — longer-acting than the natural hormone, and stripped of the
                pressor effect. That single-receptor focus explains a startling spread of
                uses. It replaces the missing hormone in central diabetes insipidus. It
                curbs overnight urine in bedwetting. And — the surprise — it treats von
                Willebrand disease and mild hemophilia A, because V2 activation also
                releases clotting factors (von Willebrand factor and factor VIII) stored in
                the vessel wall. Three unrelated-looking indications, one receptor
                underneath.
              </P>
              <P>
                The <Em>vaptans</Em> run the opposite way: tolvaptan and conivaptan
                <Em> block</Em> V2, so the kidney dumps free water without dumping
                electrolytes — &ldquo;aquaretics.&rdquo; In the SALT trials, the oral V2
                antagonist tolvaptan corrected the low sodium of hyponatremia (
                <a href={REF.salt} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Schrier et&nbsp;al., NEJM, 2006
                </a>
                ), and the same drug later found a second life slowing polycystic kidney
                disease. And vasopressin itself, used for its <Em>V1a</Em> arm, is a
                vasopressor in the ICU — though the honest record keeps it modest: in
                septic shock it did not beat standard norepinephrine on mortality (
                <a href={REF.vasst} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Russell et&nbsp;al., NEJM, 2008
                </a>
                ). Replace the signal, block the signal, or borrow its pressor arm — three
                receptor strategies, one hormone.
              </P>
              <Callout label="The engineering read">
                Vasopressin became a pharmacopoeia for the same reason oxytocin did not: its
                receptors sit on the kidney and the blood vessel, where the effect is a number
                you can measure — urine volume, serum sodium, blood pressure. A drug with a
                hard endpoint gets built and approved. A drug aimed at a feeling fights the
                replication record instead.
              </Callout>
            </Section>

            <Section title="The behavior arm, honestly">
              <P>
                Vasopressin does have a brain life, and in animals it is genuinely dramatic.
                In prairie voles — a rare monogamous rodent — the V1a receptor is central to
                male pair-bonding, and in a landmark experiment, transferring the V1aR gene
                into the ventral forebrain of a <Em>promiscuous</Em> vole species increased
                its preference for a familiar partner (
                <a href={REF.vole} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lim et&nbsp;al., Nature, 2004
                </a>
                ). Across species, vasopressin shapes social recognition, territoriality and
                aggression, often as the more male-weighted counterpart to oxytocin.
              </P>
              <P>
                But this is exactly where the{" "}
                <Link href="/insights/the-touch-deficit" className={LINK}>
                  discipline the oxytocin story demands
                </Link>{" "}
                has to carry over. A vole is not a person; a bonding effect in a rodent
                forebrain is not a human therapy; and the human behavioral pharmacology built
                on this remains thin and inconsistent. Vasopressin&rsquo;s proven drugs act on
                the nephron and the arteriole, not on affiliation. The behavior arm is real
                biology and, so far, a poor drug target — the same shape of honest verdict the
                love-hormone hype earned.
              </P>
            </Section>

            <Section title="The useful twin">
              <P>
                Put the two side by side and the lesson is almost literary. Oxytocin got the
                fame, the nickname, and the sprays that mostly didn&rsquo;t work. Vasopressin,
                its two-residue sibling, got the quiet shelf of medicines that do — a
                water-balance pharmacopoeia spun out of a single nine-amino-acid hormone by
                choosing, each time, which receptor to grip. Two swapped residues decided
                which twin became a legend and which became a drug cabinet, and the one that
                reads less romantic is the one you are far more likely to actually be
                prescribed.
              </P>
              <Bullets
                items={[
                  ["Two residues, opposite physiology", "Vasopressin and oxytocin are nine-residue twins differing at positions 3 and 8. Those two swaps route them to different receptors — water and vessels vs labor and bonding."],
                  ["The receptor split is the pharmacology", "V2 (kidney, water), V1a (vessels, pressor), V1b (pituitary, stress). Nearly every vasopressin drug grips just one subtype."],
                  ["Read the axis through its failures", "Too little effective ADH → diabetes insipidus (dilute urine, thirst); too much → SIADH and hyponatremia. The drugs grab exactly those handles."],
                  ["A whole shelf of real drugs", "Desmopressin (V2: diabetes insipidus, bedwetting, and — via clotting-factor release — von Willebrand disease); the vaptans (V2 block: hyponatremia, ADPKD); vasopressin itself (V1a pressor in shock, though it didn't beat norepinephrine)."],
                  ["The behavior arm is real but a poor drug target", "V1a drives vole pair-bonding and social behavior, but human behavioral therapeutics stay thin — the same honest verdict the oxytocin hype earned."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/vasopressin" label="Vasopressin reference (ADH, the water hormone)" />
                <CrossLink href="/hormones/oxytocin" label="Oxytocin reference (the other twin)" />
                <CrossLink href="/insights/the-touch-deficit" label="The touch deficit — oxytocin and its replication problem" />
                <CrossLink href="/insights/the-pulse-is-the-message" label="The pulse is the message — another posterior/pituitary axis" />
                <CrossLink href="/families/neuropeptides" label="The neuropeptides family" />
                <CrossLink href="/research?q=How%20do%20vasopressin%20and%20oxytocin%20differ%20by%20only%20two%20residues%20yet%20produce%20different%20physiology%2C%20and%20how%20do%20the%20V1%20and%20V2%20receptors%20split%20vasopressin%27s%20actions%3F" label="Ask the research agent about the twin hormones" />
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

/* ── Two near-identical nonapeptides, two swapped residues, different receptors ── */
function TwinDiagram() {
  const W = 700;
  const H = 300;

  // 9-residue sequences; highlight the two differing positions (3 and 8, 1-indexed)
  const avp = ["Cys", "Tyr", "Phe", "Gln", "Asn", "Cys", "Pro", "Arg", "Gly"];
  const oxt = ["Cys", "Tyr", "Ile", "Gln", "Asn", "Cys", "Pro", "Leu", "Gly"];
  const diff = new Set([2, 7]); // 0-indexed positions 3 and 8

  const chip = (seq: string[], y: number, color: string) => {
    const x0 = 150;
    const cw = 40;
    return (
      <g>
        {seq.map((aa, i) => {
          const x = x0 + i * cw;
          const hot = diff.has(i);
          return (
            <g key={i}>
              <rect x={x} y={y} width={cw - 5} height={26} rx={5}
                fill={hot ? `color-mix(in srgb, ${color} 26%, transparent)` : "color-mix(in srgb, var(--color-ink) 6%, transparent)"}
                stroke={hot ? color : "var(--color-ink)"} strokeOpacity={hot ? 0.8 : 0.18} strokeWidth={hot ? 1.5 : 1} />
              <text x={x + (cw - 5) / 2} y={y + 17} textAnchor="middle" fill="var(--color-ink)" fillOpacity={hot ? 0.95 : 0.55} fontSize="9.5" fontWeight={hot ? "700" : "500"} fontFamily="var(--font-space-grotesk), sans-serif">{aa}</text>
              {hot && <text x={x + (cw - 5) / 2} y={y - 5} textAnchor="middle" fill={color} fillOpacity={0.9} fontSize="8.5" fontWeight="700">{i + 1}</text>}
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="The nine-residue sequences of vasopressin and oxytocin shown as chips. They are identical except at position 3 (phenylalanine vs isoleucine) and position 8 (arginine vs leucine), which are highlighted. Vasopressin's two differing residues route it to the V1a, V1b and V2 receptors, giving vasoconstriction, stress-axis support and kidney water reabsorption. Oxytocin's route it to the oxytocin receptor, giving labor, milk let-down and bonding."
      >
        <text x={W / 2} y={22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Nine residues, two differences, two hormones
        </text>

        {/* vasopressin row */}
        <text x={20} y={70} fill="var(--accent-purple)" fillOpacity={0.95} fontSize="11.5" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">Vasopressin</text>
        <text x={20} y={84} fill="var(--color-ink)" fillOpacity={0.45} fontSize="9">ADH</text>
        {chip(avp, 58, "var(--accent-purple)")}

        {/* oxytocin row */}
        <text x={20} y={140} fill="var(--color-ink)" fillOpacity={0.7} fontSize="11.5" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">Oxytocin</text>
        {chip(oxt, 128, "var(--color-ink)")}

        {/* outcomes */}
        <line x1={150} y1={178} x2={550} y2={178} stroke="var(--color-ink)" strokeOpacity={0.1} strokeWidth={1} />

        <g fontFamily="var(--font-space-grotesk), sans-serif">
          <text x={150} y={210} fill="var(--accent-purple)" fillOpacity={0.95} fontSize="10.5" fontWeight="700">→ V1a · V1b · V2</text>
          <text x={150} y={228} fill="var(--color-ink)" fillOpacity={0.6} fontSize="10">vessels · stress · kidney water</text>
          <text x={150} y={244} fill="var(--color-ink)" fillOpacity={0.5} fontSize="9.5">water balance &amp; blood pressure</text>

          <text x={150} y={274} fill="var(--color-ink)" fillOpacity={0.75} fontSize="10.5" fontWeight="700">→ oxytocin receptor</text>
          <text x={150} y={292} fill="var(--color-ink)" fillOpacity={0.5} fontSize="10">labor · milk let-down · bonding</text>
        </g>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The only differences are positions 3 and 8. Those two residues send the two peptides to
        different receptors — and to opposite ends of physiology.
      </figcaption>
    </figure>
  );
}
