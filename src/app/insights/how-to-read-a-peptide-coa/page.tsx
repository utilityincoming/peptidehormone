import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("how-to-read-a-peptide-coa")!;

export const metadata: Metadata = {
  title: "How to Read a Peptide COA: HPLC Purity, Mass Spec, Net Peptide Content & Endotoxin — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each claim stays checkable.
const REF = {
  dhondt: "https://pubmed.ncbi.nlm.nih.gov/25044089/", // D'Hondt et al. 2014, J Pharm Biomed Anal — related impurities in peptide medicines (review)
  janvier: "https://pubmed.ncbi.nlm.nih.gov/30029448/", // Janvier et al. 2018, Talanta — impurity profiling of falsified polypeptide drugs (Belgian market)
  ashraf: "https://pubmed.ncbi.nlm.nih.gov/39093567/", // Ashraf et al. 2024, JAMA Netw Open — no-prescription online semaglutide purchases
  cornish: "https://pubmed.ncbi.nlm.nih.gov/10567002/", // Cornish et al. 1999, Am J Physiol — trifluoroacetate inhibits osteoblast and chondrocyte proliferation
  q6a: "https://database.ich.org/sites/default/files/Q6A%20Guideline.pdf", // ICH Q6A — specifications: test procedures and acceptance criteria
  q3d: "https://database.ich.org/sites/default/files/Q3D-R2_Guideline_Step4_2022_0308.pdf", // ICH Q3D(R2) — elemental impurities
  endotoxin: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-pyrogen-and-endotoxins-testing-questions-and-answers", // FDA — pyrogen and endotoxins testing Q&A
  fdaGlp1: "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss", // FDA — concerns with unapproved GLP-1 drugs
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is a peptide COA?",
    a: "A certificate of analysis is a document reporting the results of tests run on a sample from one manufacturing lot: typically identity by mass spectrometry and purity by HPLC, sometimes with peptide content, water, counterion, endotoxin and sterility results. It describes the sample that was tested, on the day it was tested. It is evidence about a lot, not a guarantee about the vial in your hand.",
  },
  {
    q: "What does 99% purity on a peptide COA mean?",
    a: "It usually means that in an HPLC run, the main peak accounted for 99% of the total peak area detected by ultraviolet absorbance. It is a relative figure among the things the detector can see. It does not count water, salts or counterions, it can miss impurities that elute together with the main peak, and it says nothing about how many milligrams of peptide are in the vial or whether the vial is sterile.",
  },
  {
    q: "Is HPLC purity the same as peptide content?",
    a: "No. Purity asks what share of the peptide-like material is the intended peptide. Content asks what share of the powder's weight is peptide at all. A lyophilized peptide carries counterions (often acetate or trifluoroacetate) and residual water, so a powder can be 99% pure by HPLC and still be substantially less than 99% peptide by weight. Content is measured separately, for example by amino acid analysis or nitrogen determination.",
  },
  {
    q: "Does a mass spec result prove the peptide is the right one?",
    a: "It proves the molecular weight matches, which is strong evidence but not complete proof. Mass spectrometry cannot by itself distinguish a peptide from a version with the same atoms arranged differently: a swapped pair of residues, or a mirror-image (D-) amino acid produced by racemization during synthesis. Those share the same mass. Confirming sequence needs fragmentation (MS/MS) or other methods that most routine COAs do not include.",
  },
  {
    q: "Does a COA show a peptide is sterile and safe to inject?",
    a: "Not unless it reports sterility and bacterial endotoxin testing, and even then only for the units sampled. HPLC purity and mass spectrometry are chemical tests and are blind to bacteria and endotoxin. For medicines, sterility is assured mainly by a validated manufacturing process rather than by testing a few vials afterwards, which is why a document cannot stand in for a regulated supply chain. Material sold for research use is not made or released to that standard.",
  },
  {
    q: "How can you tell if a COA is fake or reused?",
    a: "Check that the lot number on the certificate matches the lot number on the vial, that the test date makes sense for that lot, that a named laboratory and method are given, and that the chromatogram and spectrum are shown rather than just summarized. Some laboratories offer a way to verify a report number directly with them. None of this proves the vial came from the tested lot; it only removes the easy failures.",
  },
];

// The anatomy table: each line of a typical COA, what it measures, and its blind spot.
const LINES: { line: string; example: string; measures: string; blind: string }[] = [
  {
    line: "Lot / batch number",
    example: "Lot 2611-A",
    measures: "Which production run the tested sample came from.",
    blind: "Whether your vial came from that run. Only a matching number on the vial links the two, and a number is easy to print.",
  },
  {
    line: "Identity (MS)",
    example: "Observed mass matches theoretical",
    measures: "That the molecular weight is right.",
    blind: "Same-mass errors: transposed residues, D-amino acids from racemization.",
  },
  {
    line: "Purity (HPLC)",
    example: "99.1% at 220 nm",
    measures: "The main peak's share of everything the UV detector saw.",
    blind: "Water, salts, counterions; impurities hiding under the main peak; anything biological.",
  },
  {
    line: "Peptide content",
    example: "Often absent",
    measures: "How much of the powder's weight is actually peptide.",
    blind: "Nothing about what else the peptide fraction contains. Read it together with purity.",
  },
  {
    line: "Endotoxin (LAL)",
    example: "Often absent",
    measures: "Bacterial endotoxin in the tested sample, in endotoxin units.",
    blind: "Live organisms, and any vial that was not sampled.",
  },
  {
    line: "Sterility",
    example: "Usually absent",
    measures: "Whether the sampled units grew anything.",
    blind: "The rest of the lot. Sterility comes from the process, not the test.",
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
              <Link href="/methodology" className="text-accent-blue hover:text-ink">
                Sourcing &amp; quality
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
            <Section title="The document everyone asks for">
              <P>
                Ask how to judge a peptide source and the answer arrives in three
                letters: check the COA. This site says it too. The{" "}
                <Link href="/insights/what-you-can-actually-get" className={LINK}>
                  availability layer
                </Link>{" "}
                only lists a compound when it comes with a lot-specific certificate of
                analysis. But a requirement to <Em>have</Em> the document is not the
                same as knowing how to <Em>read</Em> it, and the gap between those two
                is where most of the false comfort lives.
              </P>
              <P>
                A certificate of analysis is a report on a sample: someone took
                material from one manufacturing lot, ran a set of tests, and wrote down
                the results. In regulated manufacturing, the list of tests and the
                limits each must meet are fixed in advance as the product&rsquo;s
                specification (
                <a href={REF.q6a} target="_blank" rel="noopener noreferrer" className={LINK}>
                  ICH Q6A
                </a>
                ), and the certificate is the record that a lot met it. Outside that
                system, a COA is whatever the seller chose to test and chose to show.
                Reading one well means asking three questions of every line: what did
                this test actually measure, what is it blind to, and does it describe
                the vial in front of me?
              </P>
            </Section>

            <Section title="Start at the top: is this about your vial?">
              <P>
                Before any number, read the header. A certificate should name the
                peptide, the <Em>lot or batch number</Em>, the date of testing, the
                laboratory that did the work, and the methods used. The lot number is
                the only thread connecting the paper to the powder: if the number on
                the certificate is not the number on the vial, the document is about
                some other material. A certificate with no lot number, or one shared
                across every order for months, is a brochure.
              </P>
              <P>
                Then ask who ran the tests. A manufacturer&rsquo;s own certificate and
                an independent laboratory&rsquo;s report are different kinds of
                evidence, and the stronger packets include both. Look for the raw
                output, too: the chromatogram trace and the mass spectrum, not only a
                table that summarizes them. A summary can be typed; a trace with its
                baseline noise, retention times and integration marks is harder to
                invent and far easier to sanity-check.
              </P>
              <Callout label="Hold on to this">
                Even a genuine, matching certificate describes the sample that was
                tested on the day it was tested. It cannot describe what happened to
                your vial afterwards: the fill, the shipping, the weeks in a warehouse.
              </Callout>
            </Section>

            <Section title="Purity: one peak's share of the light">
              <P>
                The headline number is almost always HPLC purity. The sample is pushed
                through a column that separates its components, and a detector measures
                how much ultraviolet light each one absorbs as it comes out, usually at
                a wavelength where the peptide bond itself absorbs. &ldquo;99%
                pure&rdquo; means the main peak made up 99% of the total peak area on
                that trace. It is an <Em>area percentage</Em>: a share of what the
                detector saw.
              </P>
              <P>
                That definition has consequences. Things that do not absorb at that
                wavelength are invisible, which includes water, salts and the
                counterions left over from synthesis. And things that leave the column
                at the same moment as the main peak are counted <Em>as</Em> the main
                peak. Solid-phase synthesis reliably produces close relatives of the
                intended molecule: sequences missing one amino acid, sequences with an
                extra one, residues flipped to their mirror-image form, oxidized or
                still-protected side chains (
                <a href={REF.dhondt} target="_blank" rel="noopener noreferrer" className={LINK}>
                  D&rsquo;Hondt et&nbsp;al., 2014
                </a>
                ). Some of those separate cleanly. Some sit under the main peak unless
                the method was built to pull them apart. The same powder can read 99%
                on a short, generic gradient and noticeably lower on a slower one
                designed for that peptide.
              </P>
              <P>
                So the purity figure is real information with a narrow meaning. It
                tells you the synthesis and purification were not a disaster. It does
                not tell you how much peptide is in the vial, and it does not tell you
                the vial is clean in any biological sense.
              </P>
            </Section>

            <Section title="Identity: the mass matches, the sequence might">
              <P>
                The second standard line is mass spectrometry. The instrument weighs
                the molecule, and the certificate compares the observed mass with the
                one calculated from the intended sequence. A match is strong evidence
                you have the right compound and not a different peptide altogether,
                which is a failure that genuinely happens in unregulated supply.
              </P>
              <P>
                What a single mass cannot do is tell apart molecules built from the
                same atoms. Two residues in swapped positions weigh the same. So does a
                peptide in which one amino acid has racemized to its D-form during
                synthesis, a known side reaction (
                <a href={REF.dhondt} target="_blank" rel="noopener noreferrer" className={LINK}>
                  D&rsquo;Hondt et&nbsp;al., 2014
                </a>
                ) that can change how the molecule fits its receptor. Confirming the
                order of residues takes fragmentation data (MS/MS) or other methods
                that routine certificates rarely include. Identity by mass means
                &ldquo;the right weight&rdquo;, which is most of the way to &ldquo;the
                right molecule&rdquo; and not all of it.
              </P>
            </Section>

            <Section title="Content: why a 10 mg vial is not 10 mg of peptide">
              <P>
                Here is the line most certificates leave out, and the one that matters
                most for anyone doing arithmetic. Purity asks what share of the
                peptide-like material is the intended peptide. <Em>Content</Em> asks
                what share of the powder is peptide at all.
              </P>
              <P>
                A lyophilized peptide is a salt. Its basic groups are paired with
                counterions, commonly acetate or the trifluoroacetate left by
                purification, and the dried cake holds on to some water. None of that
                shows on the HPLC trace. A powder can therefore be 99% pure and still
                be meaningfully less than 99% peptide by weight, and a vial labeled by
                the gross weight of powder holds less active molecule than the label
                suggests. Content is measured separately, by amino acid analysis or
                nitrogen determination, and reported as net peptide content when it is
                reported at all.
              </P>
              <P>
                The counterion is not just dead weight. Trifluoroacetate at very low
                concentrations inhibited the proliferation of bone and cartilage cells
                in culture (
                <a href={REF.cornish} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Cornish et&nbsp;al., 1999
                </a>
                ), enough to distort experiments that blamed or credited the peptide
                for what its salt was doing. A certificate that names the salt form is
                telling you something useful.
              </P>
              <P>
                Then there is the simplest content question of all: how much went into
                the vial. A certificate tests the bulk lot, not the fill. When Belgian
                regulators profiled the falsified peptide products they seized most
                often, they found wide variation in the amount per unit alongside low
                purity (
                <a href={REF.janvier} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Janvier et&nbsp;al., 2018
                </a>
                ). This is the quiet reason the{" "}
                <Link href="/insights/how-to-reconstitute-peptides" className={LINK}>
                  reconstitution arithmetic
                </Link>{" "}
                people rely on can be precise and still wrong: the calculation starts
                from a number on a label that nobody verified.
              </P>
              <CoaAnatomy />
            </Section>

            <Section title="The lines that are usually missing">
              <P>
                HPLC and mass spectrometry are chemistry. They are blind to biology.
                A vial can be chemically immaculate and carry bacteria, or carry{" "}
                <Em>endotoxin</Em>, the fragments of bacterial cell wall that cause
                fever and worse when injected and that survive the death of the
                bacteria that made them. Endotoxin has its own test, the limulus
                amebocyte lysate assay, with results in endotoxin units and limits set
                by dose and route (
                <a href={REF.endotoxin} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA pyrogen and endotoxin guidance
                </a>
                ). If a certificate does not report it, it was not shown to be absent.
              </P>
              <P>
                Sterility is harder still, because it cannot really be tested into a
                product. A sterility test destroys the vials it examines and samples
                only a handful from a lot, so it can catch gross contamination and
                little else. In licensed manufacturing, sterility is assured by the
                process: validated filtration, aseptic filling, environmental
                monitoring. A sterility line on a certificate is welcome, but it is a
                statement about a few sampled units.
              </P>
              <P>
                The same seized-product survey found something no purity figure would
                reveal: arsenic and lead, with several samples carrying levels up to
                ten times the limit set for injectable medicines (
                <a href={REF.janvier} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Janvier et&nbsp;al., 2018
                </a>
                ;{" "}
                <a href={REF.q3d} target="_blank" rel="noopener noreferrer" className={LINK}>
                  ICH Q3D
                </a>
                ). Elemental impurities and residual solvents each need their own
                assay. A two-line certificate has simply not looked.
              </P>
            </Section>

            <Section title="What no PDF can prove">
              <P>
                Suppose the certificate is complete: matching lot, named laboratory,
                traces attached, content, endotoxin and sterility all reported. It is
                still a document, and three things sit outside any document.
              </P>
              <P>
                The first is the link to your vial. Nothing on the page can show that
                the powder you hold came from the lot that was tested. When researchers
                bought semaglutide from websites selling it without a prescription and
                had it analyzed, the products&rsquo; measured purity fell far short of
                the figure on their labels, the vials held more semaglutide than
                declared, and endotoxin was detectable (
                <a href={REF.ashraf} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ashraf et&nbsp;al., JAMA Netw Open, 2024
                </a>
                ). Paperwork and contents had come apart.
              </P>
              <P>
                The second is time. Peptides degrade: they deamidate, oxidize and
                aggregate, faster with heat and moisture. A result from the day of
                testing does not follow the vial through a summer in transit.
              </P>
              <P>
                The third is the system around the test. A medicine&rsquo;s certificate
                is the last page of a controlled process that regulators inspect.
                Material sold for research use is not made, filled or released under
                that process, which is the substance of the FDA&rsquo;s warnings about
                unapproved versions of GLP-1 drugs (
                <a href={REF.fdaGlp1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA
                </a>
                ). A good certificate narrows the uncertainty. It does not convert one
                kind of product into the other, a distinction{" "}
                <Link href="/insights/where-the-powder-comes-from" className={LINK}>
                  the supply chain itself
                </Link>{" "}
                makes hard to see.
              </P>
              <Callout label="The honest summary">
                A certificate of analysis is best at ruling things out. It can show
                that a lot was not the wrong molecule and not grossly impure. It gets
                weaker with every step between that tested sample and the liquid in a
                syringe.
              </Callout>
            </Section>

            <Section title="Reading order">
              <P>
                Put together, a certificate is read from the outside in: first whether
                it applies, then what was measured, then what was never measured.
              </P>
              <Bullets
                items={[
                  ["Match the lot", "The lot number on the certificate must be the one on the vial, with a test date, a named laboratory and stated methods. No match, no information."],
                  ["Read purity as a share of the trace", "HPLC purity is the main peak's percentage of UV-visible material on one method. It is blind to water, salt and counterions, and to impurities that co-elute."],
                  ["Read identity as a weight", "A matching mass rules out the wrong peptide. It does not rule out a same-mass variant such as a swapped or mirror-image residue."],
                  ["Look for content", "Net peptide content, the salt form and water tell you how much of the powder is peptide. Without them, the milligrams on the label are the weight of the cake."],
                  ["Check what is missing", "Endotoxin, sterility, elemental impurities and residual solvents each need their own test. An absent line is an untested property."],
                  ["Remember what paper cannot do", "No certificate proves your vial came from the tested lot, survived shipping unchanged, or was made under a process built for injection."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/how-to-reconstitute-peptides" label="How to reconstitute peptides — what happens after the vial is opened" />
                <CrossLink href="/insights/how-to-read-peptide-dosing" label="How to read a peptide dose — four kinds of milligram" />
                <CrossLink href="/insights/where-the-powder-comes-from" label="Where the powder comes from — the supply chain behind the certificate" />
                <CrossLink href="/insights/what-you-can-actually-get" label="Cataloged vs. reachable — the sourcing standard this site applies" />
                <CrossLink href="/insights/the-complexity-ladder" label="The complexity ladder — why longer peptides are harder to make cleanly" />
                <CrossLink href="/methodology" label="Methodology — how this reference grades evidence and sources" />
                <CrossLink href="/research?q=What%20can%20and%20can%27t%20a%20peptide%20certificate%20of%20analysis%20show%2C%20and%20how%20do%20HPLC%20purity%20and%20net%20peptide%20content%20differ%3F" label="Ask the research agent about peptide quality testing" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on analytical quality testing, summarized from public
              scientific literature and regulatory guidance and simplified in places. Not
              individualized medical advice, and not an endorsement of using research-grade
              material in people. Specific studies and guidance documents are named to
              explain the science; verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Anatomy of a certificate: each line, what it measures, and what it cannot see ── */
function CoaAnatomy() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-[13px] leading-5">
          <caption className="sr-only">
            The lines of a typical peptide certificate of analysis, what each one measures, and what each one cannot detect.
          </caption>
          <thead>
            <tr className="border-b border-ink/10 font-mono text-[11px] uppercase tracking-wide text-ink/45">
              <th scope="col" className="px-4 py-3 font-normal">Line on the COA</th>
              <th scope="col" className="px-4 py-3 font-normal">What it measures</th>
              <th scope="col" className="px-4 py-3 font-normal">What it cannot see</th>
            </tr>
          </thead>
          <tbody>
            {LINES.map((l) => (
              <tr key={l.line} className="border-b border-ink/[0.06] align-top last:border-0">
                <th scope="row" className="px-4 py-3 font-normal">
                  <div className="font-semibold text-ink">{l.line}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-accent-blue">{l.example}</div>
                </th>
                <td className="px-4 py-3 text-ink/75">{l.measures}</td>
                <td className="px-4 py-3 text-ink/60">{l.blind}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="border-t border-ink/[0.06] px-4 py-3 text-center text-xs text-ink/40">
        Every line answers one narrow question. The right-hand column is the part the
        headline purity figure leaves out.
      </figcaption>
    </figure>
  );
}
