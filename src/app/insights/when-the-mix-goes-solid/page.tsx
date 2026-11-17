import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("when-the-mix-goes-solid")!;

export const metadata: Metadata = {
  title: "When the Mix Goes Solid: Peptide Bricking, Gelling, and Degradation — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

const REF = {
  zapadka: "https://pubmed.ncbi.nlm.nih.gov/29147559/",
  robinson: "https://pubmed.ncbi.nlm.nih.gov/11172027/",
  westermark: "https://pubmed.ncbi.nlm.nih.gov/21742788/",
  brange: "https://pubmed.ncbi.nlm.nih.gov/8257962/",
  nagy: "https://pubmed.ncbi.nlm.nih.gov/23121320/",
  fdaImm: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/immunogenicity-assessment-therapeutic-protein-products",
  lantus: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d5e07a0c-7e14-4756-9152-9fea485d654a",
  symlin: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4aea30ff-eb0d-45c1-b114-3127966328ff",
  glucagon: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e4be1c0e-0fe6-45a0-9229-5cde98434b84",
} as const;

const FAQS = [
  {
    q: "What is peptide “bricking” or gelling?",
    a: "Both words describe the same physical failure: peptide that was supposed to stay dissolved has become an insoluble aggregate. A brick is a plug or a cloudy crash, often from opposite charges locking two peptides into a complex, or from a peptide driven to its isoelectric point. A gel is usually a network of β-sheet fibrils, the failure glucagon and amylin are famous for. Either way the solid is no longer a measured liquid dose.",
  },
  {
    q: "Why do two peptides that each dissolve on their own crash when combined?",
    a: "Each peptide’s net charge depends on the pH it is sitting in. A basic sequence and an acidic sequence at the same pH carry opposite signs and attract. That polyelectrolyte complex can phase-separate in seconds. Separately, a shared pH that is fine for one sequence can sit on the isoelectric point of the other, where repulsion disappears and the peptide self-associates.",
  },
  {
    q: "If I can still see liquid, did the molecule survive?",
    a: "Clarity only says nothing large enough to scatter light has formed. Deamidation, oxidation, and disulfide scrambling rewrite a peptide while it stays invisible. The receptor reads the edited chain, not the fact that the vial looked clear.",
  },
  {
    q: "Can a bricked vial be rescued by warming, shaking, filtering, or adding acid?",
    a: "No. Those maneuvers do not restore the original monomers, the original concentration, or the original chemical identity, and they add shear, new pH, and new surfaces. A preparation that has left solution, or whose diluent and partners were never on its label, is a failed formulation. The labeled instruction is to discard it, not to repair it.",
  },
  {
    q: "Is an accidental precipitate the same thing as a long-acting insulin depot?",
    a: "No. Insulin glargine is engineered so that a pH shift after injection precipitates a depot with a studied release profile, and its label forbids mixing precisely because another liquid would change that profile. An accidental brick precipitates before injection, at an unknown particle size, with no measured release and a higher chance of being seen by the immune system as a repetitive particle.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.18), transparent 70%)" }}
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
            <Section title="The solid is a different object">
              <P>
                People who combine peptides in one syringe have a vocabulary for the
                failure: the vial <Em>bricked</Em>, <Em>crashed</Em>, <Em>gelled</Em>,
                went stringy, threw a snowstorm. The words sound like texture. They are
                phase changes. A hormone that was a population of dissolved monomers has
                become an insoluble aggregate, and the receptor never sees an aggregate
                the way it sees a monomer. Whatever is left in the liquid is a depleted,
                still-reacting remainder.
              </P>
              <P>
                This is not an exotic research-chemical quirk. It is ordinary peptide
                physical chemistry, documented for the molecules pharmacies already
                handle. Glucagon gels. Amylin fibrillates. Insulin glargine is
                deliberately insoluble at tissue pH, and is forbidden from sharing a
                syringe for that reason. A review of therapeutic-peptide stability
                walks through exactly these liabilities — pH, net charge, concentration,
                interfaces, and sequence — for glucagon, amylin, insulin, calcitonin,
                and GLP-1 (
                <a href={REF.zapadka} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Zapadka et al., 2017 · PMID 29147559
                </a>
                ). Blending two of them, or blending either with a basic repair peptide,
                is how you ask that chemistry to happen on a kitchen counter.
              </P>
              <Callout label="The governing fact">
                Solubility and chemical identity are set by pH, partners, and time.
                A shared diluent does not give two peptides a shared formulation. The
                moment they occupy one solution they share one pH, one ionic strength,
                and one clock.
              </Callout>
            </Section>

            <Section title="Charge is the first incompatibility">
              <P>
                A peptide is a chain of acids and bases. Aspartate and glutamate are
                negative once deprotonated. Lysine, arginine, and the N-terminus are
                positive once protonated. Histidine flips across the physiologic window.
                Add those up and you get a net charge that is a function of pH, and a
                pH — the isoelectric point, pI — where the sum is zero.
              </P>
              <P>
                Two consequences follow, and they fail on different clocks.
              </P>
              <Bullets
                items={[
                  ["Opposite signs attract", "At any pH between their isoelectric points, an acidic peptide and a basic peptide carry opposite net charge. Polycation plus polyanion is a polyelectrolyte complex. The complex can phase-separate as a cloudy suspension, a stringy coacervate, or a plug — the brick — in seconds to minutes, long before a covalent bond has broken. Each peptide may have been perfectly soluble in its own vial, because each vial was holding it on the safe side of its own charge."],
                  ["Zero net charge stops the repulsion", "Like-charged monomers repel, which is a large part of what keeps them in solution. Near its pI that repulsion collapses and solubility usually bottoms out. A diluent chosen because it dissolved peptide A can sit directly on the pI of peptide B. Self-association then does not need a partner."],
                  ["Hydrophobic patches finish the job", "Charge gets the chains close. Sticky side chains — and any sequence that can donate a strand to a β-sheet — lock them there. That second step is why some crashes redissolve if you change pH immediately and others never do: the electrostatic complex is reversible in principle; the hydrogen-bonded fibril often is not."],
                ]}
              />
              <ChargeWindow />
              <P>
                The window in that figure is why “both of them dissolve in bacteriostatic
                water” is not a compatibility test. Water is not a pH. The acidic
                peptide’s formulation and the basic peptide’s formulation were each a
                compromise between solubility, chemical stability, and the preservative.
                Averaging them is a third condition nobody studied.
              </P>
            </Section>

            <Section title="Three medicines already ran the experiment">
              <P>
                <Em>Glucagon</Em> is the textbook gel. In aqueous solution near neutral
                pH it assembles into amyloid-like fibrils and the liquid sets. That is
                why the older emergency kits are lyophilized and the label says to use
                the mixed solution immediately and discard the rest (
                <a href={REF.glucagon} target="_blank" rel="noopener noreferrer" className={LINK}>
                  DailyMed glucagon labeling
                </a>
                ). The newer products exist because the native sequence could not be
                left in water. Putting glucagon into a neutral blend and waiting is
                how you repeat the problem the kits were built to avoid.
              </P>
              <P>
                <Em>Amylin</Em> is worse. It is one of the most amyloidogenic peptides
                the body makes; its fibrils are the islet amyloid of type 2 diabetes (
                <a href={REF.westermark} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Westermark et al., 2011 · PMID 21742788
                </a>
                ). The drug version, pramlintide, is formulated acidic so it stays
                monomeric, and the label is unambiguous about partners: pramlintide
                and insulin are always separate injections and must never be mixed.
                Premixing them changed pramlintide’s peak concentration by as much
                as 40 percent and shifted exposure for both drugs (
                <a href={REF.symlin} target="_blank" rel="noopener noreferrer" className={LINK}>
                  SYMLIN prescribing information
                </a>
                ). The incompatibility is not a style preference. Raise the pH of an
                amylin-family peptide toward the insulin vial and you hand it the
                condition it fibrillates in.
              </P>
              <P>
                <Em>Insulin glargine</Em> is the case that separates a designed
                precipitate from a mistake. Two extra arginines shift its isoelectric
                point so the analog is soluble in its acidic vial and insoluble at
                tissue pH. The precipitate <Em>is</Em> the long-acting depot. The
                label therefore forbids diluting it or mixing it with any other insulin
                or solution: another liquid changes the pH trajectory and the
                time-action profile the depot was qualified at (
                <a href={REF.lantus} target="_blank" rel="noopener noreferrer" className={LINK}>
                  LANTUS prescribing information
                </a>
                ). An accidental brick in a blended vial has already precipitated, at
                an uncharacterized particle size, before tissue ever buffers it. There
                is no pharmacokinetic study of that solid. There is only the word
                “cloudy.”
              </P>
            </Section>

            <Section title="Two clocks, and only one of them you can see">
              <P>
                Physical collapse and chemical rewrite run together, and people notice
                only the first. Cloudiness is light scattering off objects hundreds of
                nanometers across. A deamidated side chain is a dalton-scale edit. The
                vial can look perfect while the hormone is already a different molecule.
              </P>
              <TwoClocks />
              <P>
                Read the figure as two failure modes with different biologic meanings.
              </P>
              <P>
                On the fast clock, opposite charge or a near-pI condition removes
                monomer from the liquid. What you draw is some unknown fraction of the
                intended concentration, plus particles. The receptor does not bind a
                fibril productively. Dose becomes a guess, biased low, and biased
                differently every time the aggregation has progressed a little further.
                For glucagon-type and amylin-type sequences the fibril, once nucleated,
                templates more fibril — a little gel makes the rest of the vial catch
                up. That is why “it was only slightly cloudy yesterday” is not a stable
                state.
              </P>
              <P>
                On the slow clock, the chains that remain dissolved keep reacting.
                Three edits matter most for what a receptor can still do, and all three
                accelerate when a blend forces the wrong pH.
              </P>
            </Section>

            <Section title="Deamidation rewrites the backbone">
              <P>
                Asparagine, especially in Asn–Gly, deamidates through a succinimide
                ring. The ring reopens two ways: ordinary aspartate, or isoaspartate,
                in which the backbone itself runs through the side-chain carbon. The
                peptide gains one extra methylene in the main chain and a new negative
                charge, at a site that used to be neutral. Half-times for unstructured
                Asn–Gly can be on the order of a day under warm, neutral-to-alkaline
                conditions and much longer in the cold or in a folded protein; other
                sequences take months or years. Sequence and pH are the whole clock (
                <a href={REF.robinson} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Robinson &amp; Robinson, 2001 · PMID 11172027
                </a>
                ).
              </P>
              <P>
                A receptor does not bind “a peptide of about the right weight.” It
                reads a surface: a precise spacing of charges and backbone hydrogen
                bonds. Isoaspartate changes both. Depending on whether that asparagine
                sat in a contact, the edited chain can lose affinity, become a weaker
                partial agonist, or — if the contact was not important — keep most of
                its activity while presenting a new epitope. You cannot see which of
                those you have. Insulin’s own pharmaceutical history is this reaction:
                deamidation at specific A- and B-chain asparagines is a primary
                solution-state pathway, pH-dependent, and one reason insulin
                formulations are buffered where they are rather than where a second
                peptide might prefer (
                <a href={REF.brange} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Brange &amp; Langkjær, 1993 · PMID 8257962
                </a>
                ).
              </P>
            </Section>

            <Section title="Oxidation and scrambled disulfides change the message">
              <P>
                Methionine, tryptophan, histidine, and cysteine oxidize. The classic
                product, methionine sulfoxide, is bulkier and more polar than
                methionine. If that methionine was a receptor contact or a structural
                staple, potency drops; if it was not, the molecule can keep working
                and still fail a purity specification. Trace metals, light, and
                dissolved oxygen drive it. A second peptide’s vial is a fine way to
                import all three — another stopper, another excipient, another history
                of air.
              </P>
              <P>
                Disulfides fail differently, and pH is the switch. Thiol–disulfide
                exchange is carried by the thiolate anion, so the rate climbs sharply
                as pH approaches the cysteine pKa, near 8, and is effectively frozen
                under the acidic conditions many peptides are deliberately stored at (
                <a href={REF.nagy} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Nagy, 2013 · PMID 23121320
                </a>
                ). Mix two cysteine-containing peptides, or a free-thiol peptide with a
                disulfide peptide, and push the blend toward neutral or alkaline pH,
                and the bridges reshuffle. Insulin is two chains and three disulfides;
                the wrong pairing is not insulin. Oxytocin and vasopressin are
                single disulfides whose ring <Em>is</Em> the pharmacophore. A scrambled
                ring is a different instruction, or no instruction, delivered at the
                same nominal milligram.
              </P>
              <P>
                Hydrolysis is the slowest of the common cuts and the one that most
                resembles the design trick this site keeps meeting: a hormone broken
                into clauses. Asp–Pro bonds and a few other sequences cleave, and the
                piece that remains can still occupy part of a receptor. That fragment
                is not “a weaker version of the drug.” It is an untested molecule that
                may activate, partially activate, or sit in the site and block the
                intact peptide — an accidental antagonist made out of the agonist.
                The{" "}
                <Link href="/insights/keep-one-clause" className={LINK}>
                  keep-one-clause
                </Link>{" "}
                move is hard when a chemist does it on purpose and checks the clause
                in a trial. Done by a bad pH in a vial, nobody checks.
              </P>
              <ReceptorReadout />
            </Section>

            <Section title="What the body does with the wreckage">
              <P>
                Once the liquid is injected, tissue buffer pulls the pH to about 7.4
                within moments. Protonation state in the syringe is not the binding
                event. The binding event is whatever species already exist: remaining
                monomer, chemical edits, and particles. Four outcomes follow, and they
                are not mutually exclusive.
              </P>
              <Bullets
                items={[
                  ["A missing dose", "Precipitated peptide is not in the volume you measured. The pharmacologic effect, if the monomer was the active species, is smaller than the label arithmetic by an unknown amount. Chasing a weak effect with a larger draw the next day compounds the error, because the vial has also had another day of both clocks."],
                  ["An undesigned depot", "Some of the solid may redissolve slowly in tissue, the way glargine is meant to. Unlike glargine, the particle size, the local pH path, and the release rate were never measured. The time course stops being the one in any protocol and becomes a property of that particular crash."],
                  ["A better immune stimulus", "A repetitive aggregate is easier for the immune system to see than a soluble monomer. Regulators treat aggregates and subvisible particles as immunogenicity risk factors for therapeutic proteins for that reason (FDA immunogenicity guidance). Neutralizing antibodies do not only cancel the injected molecule. For a hormone, they can cross-react with the endogenous copy — the failure mode that made protein aggregates a clinical, not just a pharmaceutical, problem. Most research peptides have no such surveillance at all. Absence of a case report is not a clean bill."],
                  ["A local irritant", "A gel or a crystalline crash injected into subcutaneous tissue is a foreign particle load. Inflammation at the site is a biologic response to the physical form, independent of whether any monomer still binds its receptor."],
                ]}
              />
              <P>
                None of this is fixed by the solution looking acceptable an hour later.
                Fibrils and chemical edits do not reliably reverse because a vial sat
                on the counter and “cleared a bit.” Warming, vigorous shaking, forcing
                the plug through a needle, or dripping in acid or extra water changes
                shear, pH, and concentration again. It does not assay identity. The
                reconstitution rule still holds: if the product was supposed to be
                clear and it is not, you do not use it (
                <Link href="/insights/how-to-reconstitute-peptides" className={LINK}>
                  the vial is not a recipe
                </Link>
                ).
              </P>
              <Callout label="What the brick is telling you">
                The crash is the formulation’s assay, and it already reported. The
                molecules that left solution are not the dose. The molecules that
                stayed behind have been held at a pH and next to a partner their
                chemistry was not qualified for. Discard it. Do not titrate a rescue.
              </Callout>
            </Section>

            <Section title="Why “it worked for them” survives the gel">
              <P>
                A blend can brick halfway, leave a fraction of intact monomer, and
                still do something. That something gets reported as evidence that the
                combination is fine. It is evidence that some monomer survived long
                enough to bind, which is the least surprising result in pharmacology.
                It says nothing about the particles, the isoaspartate, the scrambled
                disulfides, or the dose the next vial will actually deliver after a
                different dwell time.
              </P>
              <P>
                Pharmaceutical combinations that do share a container — a few premixed
                insulins, a co-formulated incretin — earned that container with
                compatibility studies at a defined pH, with defined excipients, for a
                defined hold time. The studies are the product. Two powders and a
                bottle of bacteriostatic water are not a study. They are the conditions
                under which charge, β-sheet, and the slow chemical clock are free to
                write a new molecule and then hide most of it in a solid the syringe
                cannot measure.
              </P>
            </Section>

            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">Common questions</h2>
              <dl className="mt-6 space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/40 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/how-to-reconstitute-peptides" label="How to reconstitute peptides — the vial is not a recipe" />
                <CrossLink href="/insights/how-to-read-a-peptide-coa" label="How to read a peptide COA — what a clear result still cannot prove" />
                <CrossLink href="/insights/keep-one-clause" label="Keep one clause — why a fragment is a different drug" />
                <CrossLink href="/insights/peptide-half-life-engineering" label="How a peptide is kept intact on purpose" />
                <CrossLink href="/hormones/glucagon" label="Glucagon — the hormone that gels" />
                <CrossLink href="/hormones/pramlintide" label="Pramlintide — formulated so it does not fibrillate" />
                <CrossLink href="/hormones/insulin" label="Insulin — including the analog that precipitates by design" />
                <CrossLink href="/research?q=How%20do%20pH%2C%20net%20charge%2C%20and%20a%20second%20peptide%20change%20aggregation%20and%20deamidation%20of%20a%20therapeutic%20peptide%3F" label="Ask the research agent about aggregation and deamidation" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and product labeling and simplified in places. Not
              individualized medical advice or a prescription. Nothing here is a
              mixing procedure, a rescue procedure, or a dosing instruction. Follow
              the approved product label and the dispensing pharmacist. Specific
              products are named because their labels already document the
              incompatibility; verify any claim against the linked sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

function ChargeWindow() {
  // Qualitative charge curves, not measured data. Acidic peptide pI ~4.5,
  // basic peptide pI ~10. Opposite-sign window sits between them.
  const W = 680;
  const H = 320;
  const x0 = 56;
  const x1 = 640;
  const base = 168;
  const phToX = (ph: number) => x0 + ((ph - 2) / 10) * (x1 - x0);
  const acidic = [3, 2.2, 1.2, 0.15, -0.7, -1.3, -1.7, -1.9, -2];
  const basic = [2, 2, 1.95, 1.85, 1.7, 1.45, 1.05, 0.45, -0.35];
  const phs = [2, 3, 4, 5, 6, 7, 8, 9, 12];
  const toPoints = (ys: number[]) =>
    ys.map((y, i) => `${phToX(phs[i])},${base - y * 52}`).join(" ");

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Net charge versus pH for an acidic peptide and a basic peptide. Between their isoelectric points they carry opposite signs, which is the window where they can crash out together.">
        <text x={x0} y={22} fill="var(--color-ink)" fillOpacity="0.45" fontSize="12">net charge, qualitative</text>
        <rect x={phToX(5.2)} y={48} width={phToX(10.2) - phToX(5.2)} height={200} fill="var(--accent-rose)" fillOpacity="0.08" />
        <line x1={x0} y1={base} x2={x1} y2={base} stroke="var(--color-ink)" strokeOpacity="0.25" />
        <text x={x0 - 8} y={base + 4} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.4" fontSize="11">0</text>
        <text x={x0 - 8} y={base - 52 + 4} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.4" fontSize="11">+</text>
        <text x={x0 - 8} y={base + 52 + 4} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.4" fontSize="11">−</text>
        {[2, 4, 6, 7.4, 9, 11].map((ph) => (
          <g key={ph}>
            <line x1={phToX(ph)} y1={base - 4} x2={phToX(ph)} y2={base + 4} stroke="var(--color-ink)" strokeOpacity="0.3" />
            <text x={phToX(ph)} y={base + 22} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11">{ph === 7.4 ? "7.4" : ph}</text>
          </g>
        ))}
        <text x={(x0 + x1) / 2} y={base + 42} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="12">pH of the shared solution</text>
        <polyline fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" points={toPoints(acidic)} />
        <polyline fill="none" stroke="var(--accent-amber)" strokeWidth="2.5" points={toPoints(basic)} />
        <circle cx={phToX(5.2)} cy={base} r="4" fill="var(--accent-blue)" />
        <circle cx={phToX(10.2)} cy={base} r="4" fill="var(--accent-amber)" />
        <text x={phToX(3.3)} y={78} fill="var(--accent-blue)" fontSize="12" fontFamily="var(--font-space-grotesk), sans-serif">acidic peptide</text>
        <text x={phToX(6.3)} y={70} fill="var(--accent-amber)" fontSize="12" fontFamily="var(--font-space-grotesk), sans-serif">basic peptide</text>
        <text x={phToX(5.2)} y={292} textAnchor="middle" fill="var(--accent-blue)" fontSize="11">pI</text>
        <text x={phToX(10.2)} y={292} textAnchor="middle" fill="var(--accent-amber)" fontSize="11">pI</text>
        <text x={(phToX(5.2) + phToX(10.2)) / 2} y={268} textAnchor="middle" fill="var(--accent-rose)" fontSize="12" fontFamily="var(--font-space-grotesk), sans-serif">opposite signs — the crash window</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Schematic, not a measured titration. Between the two isoelectric points the
        peptides attract. At each pI, that peptide’s own repulsion is gone and its
        solubility is usually worst.
      </figcaption>
    </figure>
  );
}

function TwoClocks() {
  const rows: { t: string; title: string; lines: string[]; tone: string }[] = [
    {
      t: "seconds",
      title: "Opposite charge locks",
      lines: ["Cloud, strings, or a plug.", "Monomer concentration collapses.", "The receptor sees less hormone."],
      tone: "var(--accent-rose)",
    },
    {
      t: "minutes–hours",
      title: "β-sheet takes over",
      lines: ["Glucagon- and amylin-type sequences gel.", "A nucleus recruits the rest of the vial.", "The solid is not a ligand."],
      tone: "var(--accent-amber)",
    },
    {
      t: "hours–days",
      title: "The quiet rewrite",
      lines: ["isoAsp, scrambled disulfides, oxidation.", "The liquid stays clear.", "The message does not."],
      tone: "var(--accent)",
    },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox="0 0 680 340" className="w-full" role="img" aria-label="Two clocks after an incompatible mix: charge-driven precipitation in seconds, fibril gels over minutes to hours, and invisible chemical edits over hours to days.">
        <text x="64" y="28" fill="var(--color-ink)" fontSize="13" fontFamily="var(--font-space-grotesk), sans-serif" fontWeight="600">What you can see</text>
        <text x="300" y="28" fill="var(--color-ink)" fontSize="13" fontFamily="var(--font-space-grotesk), sans-serif" fontWeight="600">What the receptor still reads</text>
        <line x1="36" y1="46" x2="36" y2="312" stroke="var(--color-ink)" strokeOpacity="0.2" />
        {rows.map((r, i) => {
          const y = 58 + i * 96;
          return (
            <g key={r.t}>
              <circle cx="36" cy={y + 28} r="6" fill={r.tone} />
              {i < rows.length - 1 && (
                <line x1="36" y1={y + 36} x2="36" y2={y + 96} stroke="var(--color-ink)" strokeOpacity="0.15" />
              )}
              <text x="64" y={y + 16} fill={r.tone} fontSize="12" fontFamily="ui-monospace, monospace">{r.t}</text>
              <text x="64" y={y + 40} fill="var(--color-ink)" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{r.title}</text>
              {r.lines.map((line, j) => (
                <text key={line} x="300" y={y + 16 + j * 18} fill="var(--color-ink)" fillOpacity="0.72" fontSize="13">{line}</text>
              ))}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Physical failure scatters light. Chemical failure does not. Both change the
        dose the receptor can respond to. Times are order-of-magnitude, and they
        shorten as concentration, temperature, and a bad pH go up.
      </figcaption>
    </figure>
  );
}

function ReceptorReadout() {
  const cols = [
    { h: "Intact monomer", s: "The surface the receptor was built for. Full agonist: the second messenger fires.", c: "var(--accent-teal)" },
    { h: "isoAsp or sulfoxide", s: "Same nominal mass, wrong spacing or a bulkier side chain. Weaker binding, partial agonism, or a new epitope.", c: "var(--accent-amber)" },
    { h: "Scramble or fragment", s: "Wrong disulfide, or a clipped clause. Can be silent — or can occupy the site and block the intact hormone.", c: "var(--accent)" },
    { h: "Aggregate", s: "Not a ligand. Missing dose, undesigned depot, and a repetitive particle the immune system is better at seeing.", c: "var(--accent-rose)" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {cols.map((col) => (
          <div key={col.h} className="rounded-xl border border-ink/10 bg-panel/50 p-4">
            <div className="font-mono text-[11px] uppercase tracking-wide" style={{ color: col.c }}>{col.h}</div>
            <p className="mt-2 text-[14px] leading-6 text-ink/75">{col.s}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink/40">
        Four species one blend can hand the body. Only the first is the molecule
        the label, the protocol, or the receptor pharmacology was about.
      </figcaption>
    </figure>
  );
}
