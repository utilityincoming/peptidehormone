import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("how-to-reconstitute-peptides")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

const REF = {
  cdc: "https://www.cdc.gov/injection-safety/hcp/clinical-safety/index.html",
  fdaUnapproved: "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  fdaErrors: "https://www.fda.gov/drugs/human-drug-compounding/fda-alerts-health-care-providers-compounders-and-patients-dosing-errors-associated-compounded",
  egriftaSv: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/022505s018lbl.pdf",
  egriftaWr: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/022505s020lbl.pdf",
  glucagon: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e4be1c0e-0fe6-45a0-9229-5cde98434b84",
  aggregation: "https://pubmed.ncbi.nlm.nih.gov/29147559/",
} as const;

const FAQS = [
  {
    q: "What water should be used to reconstitute peptides?",
    a: "Use only the diluent named in the approved product label or supplied by the dispensing pharmacy. Sterile Water for Injection and Bacteriostatic Water for Injection are different products and are not automatically interchangeable.",
  },
  {
    q: "How much water should be added to a peptide vial?",
    a: "There is no universal volume. The correct volume is the one specified for that exact product, strength, and formulation. Adding a different volume changes concentration and therefore changes how much drug is present in every measured milliliter.",
  },
  {
    q: "Should a peptide vial be shaken after reconstitution?",
    a: "Follow the product-specific instructions. Many labels direct gentle rolling or swirling and explicitly say not to shake, but some products differ. The label outranks a universal internet rule.",
  },
  {
    q: "How long do reconstituted peptides last in the refrigerator?",
    a: "There is no class-wide answer. Some labeled peptide products must be used immediately; others permit a defined multi-day period, sometimes at room temperature rather than refrigerated. Use the product-specific storage condition and beyond-use date, not a generic peptide chart.",
  },
  {
    q: "Can a cloudy reconstituted peptide still be used?",
    a: "Not unless the product label specifically describes that appearance as normal. For products expected to be clear and colorless, cloudiness, discoloration, particles, a damaged vial, or questionable sterility are reasons not to use it and to contact the pharmacist or manufacturer.",
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
            <Section title="The vial is not a recipe">
              <P>
                Reconstitution means adding a specified liquid to a dry, usually
                lyophilized drug so it returns to solution. It sounds like making a drink
                from powder. It is closer to rebuilding the last stage of a pharmaceutical
                formulation: the liquid controls the final concentration, while the way it
                enters the vial can affect sterility and physical stability.
              </P>
              <P>
                That is why there is no responsible universal instruction that begins
                &ldquo;add this much bacteriostatic water to any peptide.&rdquo; A vial label
                has to answer four questions first: <Em>what molecule and formulation is
                this, what diluent is specified, what final concentration will result, and
                how long is that exact solution stable?</Em> If the vial, pharmacy label,
                and instructions do not answer them consistently, stop there. Do not use
                online arithmetic to repair missing product information.
              </P>
              <Callout label="The governing rule">
                For an approved or pharmacy-dispensed product, follow the instructions for
                that exact product, strength, and formulation. If it came with a diluent,
                use that diluent. If the instructions are absent or conflict, contact the
                dispensing pharmacist or manufacturer before mixing anything.
              </Callout>
            </Section>

            <Section title="Why the powder is dry in the first place">
              <P>
                Water makes injection possible, but it also gives molecules room to move,
                react, unfold, adsorb to surfaces, and associate with one another. Removing
                water by freeze-drying can slow many of those processes and extend shelf
                life. Reconstitution starts the solution-state clock again.
              </P>
              <P>
                Peptides are not one stability class. Sequence, concentration, pH, salts,
                excipients, temperature, interfaces, and agitation can all change the risk
                of aggregation. A review of therapeutic-peptide stability documents all of
                those variables and includes familiar molecules—GLP-1, glucagon, amylin,
                insulin, calcitonin—as examples of peptides that can aggregate under
                particular conditions (
                <a href={REF.aggregation} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Zapadka et al., 2017 · PMID 29147559
                </a>
                ). The point is not that every shake destroys every peptide. It is that
                formulation-specific evidence, not folklore, determines handling.
              </P>
            </Section>

            <Section title="Sterile water and bacteriostatic water are not synonyms">
              <P>
                <Em>Sterile Water for Injection</Em> is sterile water without an
                antimicrobial preservative. <Em>Bacteriostatic Water for Injection</Em>
                contains a preservative, commonly benzyl alcohol, and is packaged for
                repeated withdrawals under its labeling. A preservative can limit some
                bacterial growth; it does not sterilize a contaminated vial, protect
                against viruses, or make poor technique safe.
              </P>
              <P>
                The clearest proof that the two are not interchangeable comes from the same
                molecule. The FDA label for one tesamorelin formulation, EGRIFTA SV, specifies
                supplied Sterile Water, gentle rolling, immediate use, and disposal of the
                remainder (
                <a href={REF.egriftaSv} target="_blank" rel="noopener noreferrer" className={LINK}>
                  EGRIFTA SV prescribing information
                </a>
                ). A different tesamorelin formulation, EGRIFTA WR, specifies supplied
                Bacteriostatic Water, swirling, and use of the reconstituted vial for seven
                days at room temperature (
                <a href={REF.egriftaWr} target="_blank" rel="noopener noreferrer" className={LINK}>
                  EGRIFTA WR prescribing information
                </a>
                ). Same active peptide; different excipients, strengths, diluents,
                concentrations, handling, and storage. The label explicitly says the two
                formulations are not substitutable.
              </P>
              <Callout label="The useful lesson">
                The diluent is part of the formulation. Choosing one because it is common
                online is not a neutral swap; it can change preservative exposure, pH,
                compatibility, and the permitted storage period.
              </Callout>
            </Section>

            <Section title="A label-first reconstitution sequence">
              <P>
                This is the general safety sequence—not a substitute for the product&rsquo;s
                Instructions for Use and not a dosing protocol.
              </P>
              <Bullets
                items={[
                  ["Verify before opening", "Match the drug name, formulation, vial strength, prescribed directions, supplied diluent, expiration date, and storage condition. Do not proceed if the seal is damaged, the label is incomplete, or the identities do not match."],
                  ["Set up a clean field", "Wash and dry hands. Use a clean, dry preparation surface away from sinks, food, used sharps, and other contamination sources. Gather the exact diluent, new sterile syringe and needle, alcohol swabs, and a sharps container before starting."],
                  ["Use aseptic technique", "Disinfect the vial stoppers and let them dry. Do not touch the stopper after cleaning, the needle, or any sterile connection. Use a new sterile needle and syringe for every vial access unless the product's own single-procedure instructions explicitly direct otherwise."],
                  ["Transfer the labeled volume", "Draw and add only the volume specified for that exact vial. Direct the liquid as the product instructions show; do not improvise pressure, venting, or needle changes."],
                  ["Mix exactly as directed", "Roll, swirl, or gently agitate only as the label instructs. Do not assume that shaking is acceptable—or that it is forbidden—without checking the product-specific directions."],
                  ["Inspect the result", "Use only if its appearance matches the label. For a solution expected to be clear and colorless, do not use it if it remains cloudy, discolored, foamy beyond the stated settling time, or contains particles."],
                  ["Label the clock", "Write the date and time of reconstitution and the product-specific discard date. Store it exactly as directed; refrigeration is not a universal answer."],
                  ["Dispose safely", "Put used needles and syringes directly into an appropriate sharps container. Never leave a needle parked through the stopper between uses."],
                ]}
              />
              <P>
                CDC&rsquo;s injection-safety guidance makes the sterility logic explicit:
                prepare medication in a designated clean area, use aseptic technique, use
                a new sterile needle and syringe, prepare as close as possible to
                administration, and discard a vial whenever sterility is compromised or
                questionable (
                <a href={REF.cdc} target="_blank" rel="noopener noreferrer" className={LINK}>
                  CDC injection-safety guidance
                </a>
                ). Those are minimum controls, not evidence that an unknown powder is fit
                for injection.
              </P>
            </Section>

            <Section title="Concentration: the arithmetic that changes every draw">
              <P>
                Reconstitution does not change the nominal mass printed on the vial. It
                changes how densely that mass is distributed through liquid. The governing
                relationship is simple:
              </P>
              <ConcentrationDiagram />
              <P>
                If the same nominal vial is mixed with less liquid, each milliliter is more
                concentrated; with more liquid, each milliliter is less concentrated. That
                does <Em>not</Em> mean either choice is acceptable. The specified volume
                also has to satisfy the product&rsquo;s compatibility, solubility, measurement,
                and stability requirements.
              </P>
              <P>
                This is where &ldquo;units&rdquo; becomes dangerous language. Marks on an
                insulin syringe are volume graduations, not milligrams of every drug. The
                drug mass represented by a mark depends on the final concentration and the
                syringe calibration. FDA reports that patients using compounded semaglutide
                have drawn five to twenty times the intended amount, while some clinicians
                made five- to ten-fold errors converting among milligrams, milliliters, and
                syringe units (
                <a href={REF.fdaErrors} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA dosing-error alert
                </a>
                ). A pharmacist should confirm the concentration and demonstrate the exact
                prescribed volume on the exact syringe being supplied.
              </P>
            </Section>

            <Section title="There is no universal refrigerator rule">
              <P>
                Internet charts often assign every reconstituted peptide the same cold
                storage and discard window. Approved labels show why that cannot work.
                EGRIFTA SV says to use immediately and specifically says not to refrigerate
                the mixed solution. EGRIFTA WR permits seven days at controlled room
                temperature. A glucagon emergency kit directs use immediately after mixing
                and disposal of any unused portion (
                <a href={REF.glucagon} target="_blank" rel="noopener noreferrer" className={LINK}>
                  DailyMed glucagon label
                </a>
                ).
              </P>
              <P>
                A generic 28-day number is also commonly misapplied. CDC cites 28 days as
                the usual maximum after first puncture for a <Em>manufacturer-labeled
                multidose vial</Em>, unless its manufacturer specifies another period. It
                does not grant every home-reconstituted vial 28 days of chemical stability
                or sterility. The finished drug&rsquo;s labeled period can be much shorter.
              </P>
            </Section>

            <Section title="The clear vial fallacy">
              <P>
                A clear solution answers one narrow question: there is no obvious cloudiness,
                discoloration, or visible particulate matter under the conditions in which
                you looked. It does not prove identity, labeled mass, purity, potency,
                sterility, endotoxin control, or correct concentration. Microbial
                contamination can be invisible. So can a decimal-point error.
              </P>
              <P>
                That distinction matters most for products sold as &ldquo;research use
                only&rdquo; or &ldquo;not for human consumption.&rdquo; FDA says unapproved
                GLP-1 products do not undergo its premarket review for safety,
                effectiveness, or quality and warns consumers not to purchase products
                falsely sold under research labeling for human use (
                <a href={REF.fdaUnapproved} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA concerns with unapproved GLP-1 drugs
                </a>
                ). Adding sterile diluent to an unverified powder does not convert it into a
                sterile, approved, or pharmacy-dispensed medicine.
              </P>
              <Callout label="Stop and replace or ask">
                Do not use a preparation when the identity or concentration is uncertain;
                the vial or seal is damaged; the solution looks wrong for its label; the
                product arrived outside its required temperature range; sterility is in
                doubt; or the instructions conflict. Contact the dispensing pharmacist or
                manufacturer rather than troubleshooting an injectable by trial and error.
              </Callout>
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
                <CrossLink href="/insights/getting-the-molecule-in" label="Why are peptides injected? The delivery problem" />
                <CrossLink href="/insights/where-the-powder-comes-from" label="Where the powder comes from" />
                <CrossLink href="/insights/the-complexity-ladder" label="Where analytical trust starts to mean something" />
                <CrossLink href="/methodology" label="How Peptide Hormone grades evidence" />
                <CrossLink href="/research?q=How%20do%20diluent%2C%20pH%2C%20temperature%2C%20concentration%2C%20and%20agitation%20affect%20the%20stability%20of%20a%20specific%20lyophilized%20peptide%20after%20reconstitution%3F" label="Ask the research agent about formulation stability" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and regulatory guidance and simplified in places. Not medical
              advice, dosing guidance, or a recommendation to use or reconstitute any
              compound. Follow the approved product label and instructions from a licensed
              prescriber and dispensing pharmacist. Specific products are named to explain
              why formulations differ; verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

function ConcentrationDiagram() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5">
      <svg viewBox="0 0 640 210" className="mx-auto w-full max-w-xl" role="img" aria-label="Concentration equals the nominal mass in the vial divided by the final solution volume, so changing volume changes the mass contained in every milliliter">
        <rect x="30" y="45" width="170" height="92" rx="18" fill="var(--panel)" stroke="var(--accent-blue)" strokeOpacity="0.55" />
        <text x="115" y="80" textAnchor="middle" fill="var(--color-ink)" fontSize="17" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">vial mass</text>
        <text x="115" y="108" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="14">label claim</text>
        <text x="231" y="101" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="28">÷</text>
        <rect x="262" y="45" width="170" height="92" rx="18" fill="var(--panel)" stroke="var(--accent-teal)" strokeOpacity="0.55" />
        <text x="347" y="80" textAnchor="middle" fill="var(--color-ink)" fontSize="17" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">final volume</text>
        <text x="347" y="108" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="14">label instruction</text>
        <text x="463" y="101" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="28">=</text>
        <rect x="494" y="45" width="116" height="92" rx="18" fill="color-mix(in srgb, var(--accent-amber) 10%, transparent)" stroke="var(--accent-amber)" strokeOpacity="0.75" strokeWidth="2" />
        <text x="552" y="80" textAnchor="middle" fill="var(--color-ink)" fontSize="17" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">mg/mL</text>
        <text x="552" y="108" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="13">concentration</text>
        <path d="M 115 152 C 210 195, 455 195, 552 152" fill="none" stroke="var(--accent-amber)" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="6 6" />
        <text x="334" y="190" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="13">A different volume produces a different concentration.</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        This relationship checks concentration; it does not select a safe diluent,
        volume, dose, syringe, or storage period.
      </figcaption>
    </figure>
  );
}
