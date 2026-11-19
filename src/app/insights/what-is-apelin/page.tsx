import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("what-is-apelin")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "What is Apelin? The APJ Peptide, Its Forms, Elabela, and the Heart-Failure Infusions — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "What is Apelin? One Receptor, a Stronger Beat, a Lower Pressure · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  odowd: "https://pubmed.ncbi.nlm.nih.gov/8294032/", // O'Dowd et al. 1993, Gene — APJ, an orphan receptor related to the angiotensin receptor
  tatemoto: "https://pubmed.ncbi.nlm.nih.gov/9792798/", // Tatemoto et al. 1998, BBRC — apelin isolated from bovine stomach
  chng: "https://pubmed.ncbi.nlm.nih.gov/24316148/", // Chng et al. 2013, Dev Cell — ELABELA, a second APJ ligand required in zebrafish
  pauli: "https://pubmed.ncbi.nlm.nih.gov/24407481/", // Pauli et al. 2014, Science — Toddler, the same peptide, found independently
  demota: "https://pubmed.ncbi.nlm.nih.gov/15231996/", // De Mota et al. 2004, PNAS — apelin opposes vasopressin
  japp: "https://pubmed.ncbi.nlm.nih.gov/20385929/", // Japp et al. 2010, Circulation — acute apelin infusion in healthy humans
  barnes: "https://pubmed.ncbi.nlm.nih.gov/23519586/", // Barnes et al. 2013, Circ Heart Fail — sustained APJ agonism in heart failure
  vinel: "https://pubmed.ncbi.nlm.nih.gov/30061698/", // Vinel et al. 2018, Nat Med — apelin and age-associated muscle loss
  amg: "https://pubmed.ncbi.nlm.nih.gov/35460392/", // Winkle et al. 2022, Clin Transl Sci — AMG 986 first-in-human
} as const;

const FAQS = [
  {
    q: "What is apelin?",
    a: "Apelin is a peptide hormone made from a 77-amino-acid precursor and cut into several active lengths, of which the 13-amino-acid form with a pyroglutamate cap is the main one in human blood and heart. It binds a G-protein-coupled receptor called the apelin receptor (APJ, gene APLNR). Its clearest effect on the circulation is to strengthen cardiac contraction while widening blood vessels, so the heart pumps more blood at a lower pressure.",
  },
  {
    q: "What does apelin do?",
    a: "In people, infusing the stable 13-amino-acid form raises cardiac output and lowers blood pressure and peripheral resistance, and a six-hour infusion did the same in patients with chronic heart failure. In the brain it is made in the same neurons as vasopressin and pushes fluid balance the other way, increasing water loss. It is also released by fat and by contracting muscle; in aging mice, restoring the signal improved muscle function. Those last effects are established in animals and associations in people, not as an approved treatment.",
  },
  {
    q: "What is the difference between apelin-13 and apelin-36?",
    a: "They are pieces of the same precursor. Apelin-13 (and its pyroglutamate form) is shorter, more potent at switching the receptor on through its G protein, and the predominant form in plasma and heart. Apelin-36 is longer, less potent at that immediate signal, and better at recruiting β-arrestin, which pulls the receptor inside the cell and can silence it. Same receptor, different emphasis: a quick instruction versus a longer occupation that also turns the receiver down.",
  },
  {
    q: "What is elabela, and how is it related to apelin?",
    a: "Elabela (also called Toddler, gene APELA) is a second natural peptide that activates the same receptor. It was found twice, in 2013 and 2014, in a stretch of genome that had been filed as non-coding. It shares little sequence with apelin. In the embryo it is required for heart development at a stage when apelin itself is not yet doing that job. In adults both peptides can dilate vessels and support cardiac contraction.",
  },
  {
    q: "Is there an apelin drug?",
    a: "No apelin-receptor drug is approved. The native peptide is cleared within minutes, so the human evidence is from intravenous infusions. A long-acting small-molecule agonist, AMG 986, was well tolerated in a first-in-human study of healthy volunteers and people with heart failure, and over that short exposure it did not produce a clinically meaningful change in heart function. The biology that makes the infusion interesting is real; a medicine that holds the effect has not been shown.",
  },
];

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(45,212,168,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/cardiovascular" className="text-accent-teal hover:text-ink">
                Cardiovascular &amp; natriuretic
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
            <Section title="The short answer">
              <P>
                Apelin is a peptide hormone. A 77-amino-acid precursor is cut into
                active pieces, and the piece that dominates in human blood and heart
                is thirteen amino acids long, capped by a pyroglutamate so enzymes
                nibble it more slowly. It binds one receptor, a class A
                G-protein-coupled receptor called the apelin receptor. The gene is
                still often called <Em>APJ</Em>; the recommended name is <Em>APLNR</Em>.
                When the peptide binds, the receptor couples mainly through
                G<sub>i</sub>, which lowers cAMP inside the cell, and it can also
                recruit β-arrestin, which takes the receptor off the membrane.
              </P>
              <P>
                The instruction that matters for the circulation is unusual. Apelin
                makes the heart contract more forcefully and, at the same time, relaxes
                blood vessels. Output goes up. Pressure goes down. Most drugs that
                strengthen a beat also raise the pressure the heart has to push
                against. Apelin loosens that load while it asks for a stronger stroke.
              </P>
            </Section>

            <Section title="A receptor that waited five years for its peptide">
              <P>
                The order of discovery runs the same way as{" "}
                <Link href="/insights/the-hormone-found-after-its-drug" className={LINK}>
                  ghrelin&rsquo;s
                </Link>
                . In 1993 a human gene was cloned because its sequence looked like the
                angiotensin II receptor. The protein, named APJ, sat in the membrane
                with seven passes and ignored angiotensin. With no partner, it was
                filed as an orphan (
                <a href={REF.odowd} target="_blank" rel="noopener noreferrer" className={LINK}>
                  O&rsquo;Dowd et&nbsp;al., 1993
                </a>
                ).
              </P>
              <P>
                In 1998 the partner was pulled out of bovine stomach extracts by the
                same laboratory method that had found several other peptide hormones:
                grind the tissue, fractionate, and test each fraction on cells
                expressing the orphan receptor. The active peptide was named apelin,
                for <Em>APJ endogenous ligand</Em> (
                <a href={REF.tatemoto} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Tatemoto et&nbsp;al., 1998
                </a>
                ). The resemblance to angiotensin was a family resemblance of the
                receiver, not of the message. Apelin does not bind the angiotensin
                receptor, and angiotensin does not bind APJ. In the circulation the
                two systems push in opposite directions: angiotensin tightens vessels
                and holds fluid; apelin loosens vessels and, in the hypothalamus,
                opposes vasopressin.
              </P>
            </Section>

            <Section title="One precursor, several peptides">
              <P>
                Calling it &ldquo;apelin&rdquo; hides a set. The precursor has paired
                basic residues that proteases read as cut sites, so the body can
                release the C-terminal 36, 17, or 13 amino acids, among other lengths.
                All of them activate the receptor. They do not activate it the same way.
                In cell assays the short forms are several-fold to tens-fold more
                potent than apelin-36 at the immediate G-protein signal. Apelin-36 is
                the one that holds β-arrestin on the receptor and drives internalization,
                which is a way of turning the receiver down after the message arrives.
              </P>
              <P>
                The form that actually circulates is mostly{" "}
                <Em>[Pyr<sup>1</sup>]apelin-13</Em>: apelin-13 whose first glutamine
                has cyclized to pyroglutamate. That cap is why this is the durable
                species in plasma and in cardiac tissue. &ldquo;Apelin&rdquo; on a
                blood test, a vial, or a paper may mean any of these. The length
                changes both the strength of the signal and how fast the receptor
                disappears from the cell surface.
              </P>
              <IsoformLadder />
            </Section>

            <Section title="The same receptor has a second ligand">
              <P>
                For fifteen years APJ had one known partner. Then a second peptide
                turned up in a region of the genome annotated as non-coding. One group
                named it elabela, from a zebrafish phenotype in which the embryo&rsquo;s
                endoderm is late (
                <a href={REF.chng} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Chng et&nbsp;al., 2013
                </a>
                ). Another named it Toddler, because without it embryonic cells fail
                to move (
                <a href={REF.pauli} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Pauli et&nbsp;al., 2014
                </a>
                ). It is one peptide, gene <Em>APELA</Em>, cleaved to a mature chain
                of about 32 amino acids and to shorter pieces that also activate APJ.
                Sequence identity with apelin is low, on the order of a quarter of the
                residues. The receptor reads a shape, not a shared sentence.
              </P>
              <P>
                The developmental job belongs to elabela. In the fish, losing it
                wrecks heart formation at a stage when apelin is dispensable for that
                step. In adult mammals both ligands can dilate vessels and support
                contraction. A paper that says &ldquo;the apelin receptor&rdquo; is
                therefore ambiguous about which peptide was speaking. IUPHAR&rsquo;s
                recommendation is to treat elabela as a second endogenous ligand and
                to call the receptor the apelin receptor anyway, after the ligand
                found first.
              </P>
            </Section>

            <Section title="What the infusion does in a person">
              <P>
                The human evidence is infusion evidence, because the peptide is gone
                in minutes. In healthy volunteers, intravenous [Pyr<sup>1</sup>]apelin-13
                raised cardiac output and lowered blood pressure and peripheral
                resistance (
                <a href={REF.japp} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Japp et&nbsp;al., 2010
                </a>
                ). The combination is the point. A pure inotrope that also
                vasoconstricts makes the heart work harder against a tighter circuit.
                Apelin asks for more stroke volume while it reduces the resistance
                downstream.
              </P>
              <P>
                That effect survived the situations where a vasodilator often quits.
                During sodium depletion, and during a co-infusion of angiotensin II,
                the dilatation held. In twelve patients with chronic stable heart
                failure, a six-hour infusion kept cardiac index up and raised left
                ventricular ejection fraction for the length of the infusion (
                <a href={REF.barnes} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Barnes et&nbsp;al., 2013
                </a>
                ). Twelve patients and six hours is a pharmacological demonstration,
                not an outcomes trial. Nobody counted hospitalizations. The result
                says the receptor still answers in a failing heart, including while
                the renin-angiotensin system is switched on, which is the background
                of modern heart-failure treatment.
              </P>
              <P>
                The same peptide has a second, older job in fluid balance. Apelin and
                vasopressin are made in the same magnocellular neurons of the
                hypothalamus. Vasopressin tells the kidney to keep water. Apelin
                inhibits those neurons, lowers vasopressin release, and increases
                urine output (
                <a href={REF.demota} target="_blank" rel="noopener noreferrer" className={LINK}>
                  De&nbsp;Mota et&nbsp;al., 2004
                </a>
                ). Water deprivation pushes the pair in opposite directions: vasopressin
                out into the blood, apelin held back in the cell. It is a push-pull
                pair inside one neuron, analogous to the way the{" "}
                <Link href="/insights/the-heart-is-a-gland" className={LINK}>
                  natriuretic peptides
                </Link>{" "}
                oppose aldosterone from a different gland. The receptor class is
                different — APJ is an ordinary GPCR, the natriuretic receptors are
                guanylyl cyclases — and the peptide is different. The logic, shed the
                fluid, rhymes.{" "}
                <Link href="/insights/four-ways-to-hear-a-hormone" className={LINK}>
                  Which receptor class
                </Link>{" "}
                a hormone uses still predicts the speed: a GPCR second messenger
                answers in seconds, which is why an apelin infusion is felt as
                hemodynamics and gone when the drip stops.
              </P>
            </Section>

            <Section title="Fat, muscle, and the claim to be careful with">
              <P>
                Apelin is also an adipokine and a contraction-induced muscle signal.
                Circulating levels track with insulin sensitivity in observational
                work, and in rodents apelin improves glucose handling. The result that
                travels furthest outside cardiology is newer: apelin production in
                muscle falls with age in people and in rodents, mice lacking the
                peptide or the receptor lose muscle function as they age, and putting
                the signal back in old mice improved strength through mitochondrial
                biogenesis, autophagy, and muscle stem cells (
                <a href={REF.vinel} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Vinel et&nbsp;al., 2018
                </a>
                ).
              </P>
              <P>
                That is a strong animal paper plus a human association with exercise.
                It is not a trial of apelin as a treatment for sarcopenia. The page
                this site keeps separate from the mechanism applies here in full:
                a receptor story, even a clean one, is the bottom of the evidence
                ladder until someone measures the outcome in people and someone else
                repeats it.
              </P>
            </Section>

            <Section title="Why the infusion is not a medicine">
              <P>
                Native apelin is cleared within minutes, by peptidases that include
                ACE2, which clips the C-terminal phenylalanine the receptor needs.
                An infusion can hold a level. A drug has to survive a dose interval.
                The field&rsquo;s answer has been the usual peptide playbook — stabilize
                the chain, bias it toward G protein and away from the arrestin that
                internalizes the receptor — and, in parallel, small molecules that
                occupy APJ without being peptides at all.
              </P>
              <P>
                The small molecule that reached people first is AMG 986, a long-acting
                APJ agonist that activates both G<sub>i</sub> and β-arrestin. In a
                phase 1b study, 182 participants in total, short courses were tolerated
                up to high daily doses in healthy volunteers and in a smaller heart-failure
                group. Ejection fraction and stroke volume ticked in a favorable
                direction on one imaging method and not cleanly on another. The
                investigators&rsquo; own summary was that clinically meaningful
                pharmacodynamic effects were not observed (
                <a href={REF.amg} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Winkle et&nbsp;al., 2022
                </a>
                ). A first-in-human study is built to ask whether a dose is survivable
                and whether a signal appears. The signal did not appear at a size
                anyone would treat on.
              </P>
              <P>
                So the state of the art is easy to state and easy to overread. The
                peptide is real, the receptor is real, and a controlled infusion
                changes human hemodynamics in the direction heart-failure physiology
                wants. No approved drug captures that. The gap is the half-life, the
                receptor&rsquo;s habit of leaving the membrane, and the absence of an
                outcomes trial. Bullish on the physiology. The medicine is still a
                hypothesis.
              </P>
              <Bullets
                items={[
                  ["One receptor, found first", "APJ was cloned in 1993 as an angiotensin-receptor lookalike that did not bind angiotensin. Apelin, its ligand, was isolated in 1998."],
                  ["Several lengths, one name", "[Pyr1]apelin-13 is the main circulating form and the stronger G-protein agonist. Apelin-36 lasts on the receptor and internalizes it."],
                  ["A second ligand", "Elabela (Toddler) activates the same receptor, shares little sequence, and carries the embryonic heart-development job."],
                  ["The human effect is an infusion", "In volunteers and in twelve heart-failure patients, apelin-13 raised cardiac output while pressure and resistance fell. The drip is the experiment."],
                  ["No approved drug", "AMG 986 was tolerated and, over a short exposure, did not move heart function enough to matter. Mechanism is ahead of the page."],
                ]}
              />
            </Section>

            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/families/cardiovascular" label="Cardiovascular & natriuretic peptides" />
                <CrossLink href="/insights/the-heart-is-a-gland" label="The heart is a gland — ANP, BNP, and CNP" />
                <CrossLink href="/insights/four-ways-to-hear-a-hormone" label="Four ways a cell hears a peptide" />
                <CrossLink href="/insights/the-hormone-found-after-its-drug" label="The hormone found after its drug — ghrelin" />
                <CrossLink href="/insights/mechanism-is-not-proof" label="Mechanism is not proof" />
                <CrossLink href="/hormones/vasopressin" label="Vasopressin reference (the peptide apelin opposes)" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not individualized medical advice or a prescription. Where a dose or regimen appears it is reported from its source as research literacy — so you can read the evidence yourself — not an instruction to dose.
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

/** Precursor cut into lengths that differ in potency and receptor residence. */
function IsoformLadder() {
  const rows = [
    { name: "Preproapelin", width: 500 },
    { name: "Apelin-36", width: 300 },
    { name: "Apelin-17", width: 210 },
    { name: "[Pyr1]apelin-13", width: 150 },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox="0 0 700 250" className="mx-auto w-full max-w-2xl" role="img" aria-label="Four horizontal bars, longest at the top. Preproapelin is the full precursor. Apelin-36, apelin-17, and pyroglutamyl apelin-13 are successively shorter C-terminal pieces. The shortest bar is marked as the form that dominates in blood and gives the strongest immediate signal.">
        <text x="350" y="22" textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          One chain, cut shorter as it becomes the signal
        </text>
        {rows.map((r, i) => {
          const y = 46 + i * 48;
          return (
            <g key={r.name}>
              <text x="16" y={y + 18} fill="var(--color-ink)" fontSize="11" fontWeight="700">{r.name}</text>
              <rect x="168" y={y} width={r.width} height="26" rx="6" fill="#2DD4A8" fillOpacity={0.18 + i * 0.16} stroke="#2DD4A8" strokeOpacity={0.75} />
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Shorter is more potent at the immediate signal. Longer occupies the receptor
        and pulls it inside. The pyroglutamate cap is what lets the 13-residue form
        persist in blood.
      </figcaption>
    </figure>
  );
}
