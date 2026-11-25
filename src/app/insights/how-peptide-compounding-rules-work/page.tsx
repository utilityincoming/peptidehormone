import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("how-peptide-compounding-rules-work")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Peptide Compounding Rules Explained: 503A, 503B, Category 2 and the Shortage List · Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "Can a Pharmacy Compound It? How the Peptide Rules Work · Peptide Hormone",
    description: insight.dek,
  },
};

// Primary sources: the statute and FDA's own pages, named inline.
const REF = {
  s503a: "https://www.law.cornell.edu/uscode/text/21/353a", // 21 U.S.C. 353a — FD&C Act section 503A, pharmacy compounding
  s503b: "https://www.law.cornell.edu/uscode/text/21/353b", // 21 U.S.C. 353b — FD&C Act section 503B, outsourcing facilities
  bulks: "https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding-under-section-503a-fdc-act", // FDA — 503A bulks list and interim categories
  risks: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks", // FDA — Category 2 and the nominated-but-withdrawn table
  docket: "https://www.regulations.gov/docket/FDA-2025-N-6895", // FDA-2025-N-6895 — July 2026 PCAC
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is the difference between 503A and 503B compounding?",
    a: "They are two sections of the same federal law, covering two kinds of compounder. Section 503A covers a licensed pharmacist or physician making a preparation for one identified patient against a prescription. Section 503B covers registered outsourcing facilities, which can make larger batches without a patient-specific prescription but must follow manufacturing-grade quality rules and register with the FDA. Each section has its own list of ingredients that may be used.",
  },
  {
    q: "What makes an ingredient legal to compound under 503A?",
    a: "One of three things. The ingredient has a United States Pharmacopeia or National Formulary monograph, or it is a component of a drug the FDA has approved, or it appears on the 503A bulk-substances list the FDA sets by regulation. An ingredient that meets none of the three may not be used, whatever a prescriber writes.",
  },
  {
    q: "Does removal from Category 2 mean a peptide can now be compounded?",
    a: "No. Category 2 was part of an interim enforcement policy, a holding place for nominated substances the FDA judged to carry significant safety risks. Leaving it, as BPC-157 and eleven other peptides did in April 2026 when their nominations were withdrawn, does not put a substance on the 503A list. It still meets none of the three ingredient tests, so it still may not be compounded.",
  },
  {
    q: "Why could pharmacies compound semaglutide and tirzepatide, and why did that stop?",
    a: "Both are components of approved drugs, so the ingredient test was never the obstacle. The obstacle is the rule against making copies of a commercially available drug. A drug on the FDA shortage list is not treated as commercially available, so while semaglutide and tirzepatide were in shortage the copy rule did not bite. Tirzepatide came off the list in December 2024 and semaglutide in February 2025, and the rule applied again.",
  },
  {
    q: "Does an advisory committee vote change what can be compounded?",
    a: "Not on its own. The Pharmacy Compounding Advisory Committee recommends; the FDA decides, and it can only add a substance to the 503A list through notice-and-comment rulemaking. The July 2026 votes in favour of six peptides were recommendations made against the advice of FDA review staff. Until a final rule is published, nothing a pharmacy may lawfully do has changed.",
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
            <Section title="The question under every headline">
              <P>
                &ldquo;FDA panel backs BPC-157.&rdquo; &ldquo;Peptides removed from the
                do-not-compound list.&rdquo; &ldquo;Compounded semaglutide is over.&rdquo;
                Headlines like these arrive every few months, and each one leaves a
                reader to guess at the same thing: can a pharmacy lawfully make this for a patient
                today, yes or no?
              </P>
              <P>
                The answer is never in the headline, because it does not depend on the
                news event. It depends on a short series of tests written into federal
                law, and a molecule has to pass all of them. A compounded drug is, by
                definition, one that has not been through FDA approval. It is legal only
                because the law carves out an exemption, and the exemption has
                conditions. Learn the conditions once and most of the headlines answer
                themselves. This piece is the standing explainer;{" "}
                <Link href="/insights/the-door-swings-both-ways" className={LINK}>
                  the door swings both ways
                </Link>{" "}
                covers what moved in 2026.
              </P>
            </Section>

            <Section title="Two kinds of compounder, two sections of law">
              <P>
                The exemptions live in two sections of the Federal Food, Drug, and
                Cosmetic Act, and the first thing to ask of any claim is which one it is
                about.
              </P>
              <Bullets
                items={[
                  [
                    "Section 503A: the pharmacy",
                    "a licensed pharmacist or physician making a preparation for one identified patient, against a valid prescription. This is traditional compounding. It is regulated mainly by state pharmacy boards, and it is exempt from new-drug approval and from manufacturing-grade quality rules",
                  ],
                  [
                    "Section 503B: the outsourcing facility",
                    "a registered facility that may make larger batches and need not hold a prescription for each patient. In exchange it registers with the FDA, is inspected by it, and must meet manufacturing-grade quality rules. The category was created in 2013",
                  ],
                ]}
              />
              <P>
                The two have separate ingredient lists and separate copy rules (
                <a href={REF.s503a} target="_blank" rel="noopener noreferrer" className={LINK}>
                  21 U.S.C. 353a
                </a>
                ,{" "}
                <a href={REF.s503b} target="_blank" rel="noopener noreferrer" className={LINK}>
                  353b
                </a>
                ). A statement that is true of one is often false of the other, which is
                why &ldquo;it can be compounded&rdquo; with no section attached tells you
                very little. Most of the peptide argument is a 503A argument, so that is
                the path traced here.
              </P>
            </Section>

            <Section title="The four gates">
              <P>
                For a peptide to be lawfully compounded by a pharmacy, it has to get
                through four gates in turn. Failing any one is enough.
              </P>
              <FourGates />
              <P>
                The gates are worth taking one at a time, because the two molecules most
                people ask about fail at <Em>different</Em> ones. BPC-157 stops at the
                ingredient gate. Semaglutide clears that gate easily and stops at the
                copy gate. Treating the two as the same story is the most common way to
                misread the news.
              </P>
            </Section>

            <Section title="Gate one: is it small enough to be a drug at all?">
              <P>
                Federal law draws a line between drugs and biological products, and
                since 2020 the FDA has drawn it for amino-acid chains by length. A chain
                with a defined sequence of more than 40 amino acids is a protein, and a
                protein is a biological product. Neither compounding exemption covers
                biological products.
              </P>
              <P>
                That one rule removes a whole shelf from the discussion. Human chorionic
                gonadotropin, growth hormone and insulin are all on the far side of the
                line. Most of the molecules in the research-peptide conversation are
                short enough to stay on the drug side, which is why the argument about
                them is fought at the next gate instead.
              </P>
            </Section>

            <Section title="Gate two: does the ingredient qualify?">
              <P>
                A pharmacy compounds from a bulk substance, the raw active ingredient.
                Under 503A that substance has to qualify in one of three ways:
              </P>
              <Bullets
                items={[
                  [
                    "It has a monograph",
                    "an official quality standard in the United States Pharmacopeia or the National Formulary",
                  ],
                  [
                    "It is a component of an approved drug",
                    "the same active ingredient that sits inside a product the FDA has approved",
                  ],
                  [
                    "It is on the 503A bulks list",
                    "a list the FDA builds by regulation, after consulting its advisory committee and the Pharmacopeia",
                  ],
                ]}
              />
              <P>
                Semaglutide and tirzepatide get through on the second route.
                BPC-157, TB-500, MOTS-c, epitalon and the rest of the research shelf have
                no monograph and sit inside no approved drug, so their only way in is the
                third: the list.
              </P>
              <P>
                The list is short and it moves slowly. The first final rule, in 2019,
                placed six substances on it (
                <a href={REF.bulks} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA
                </a>
                ). Many more had been nominated, and reviewing them one at a time
                through rulemaking takes years. So the agency set up an interim policy
                to say what it would and would not act against while the queue was
                worked through. That interim policy is where the categories come from.
              </P>
            </Section>

            <Section title="What the categories were, and what they were not">
              <P>
                Under the interim policy, a nominated substance was sorted into one of
                three bins while it waited:
              </P>
              <Bullets
                items={[
                  [
                    "Category 1",
                    "nominated with enough information to evaluate, and no safety concern identified so far. The FDA said it did not intend to act against pharmacies compounding with these while review continued",
                  ],
                  [
                    "Category 2",
                    "nominated with enough information, but the FDA identified significant safety risks. No tolerance: the agency said it would consider action against compounding with these",
                  ],
                  [
                    "Category 3",
                    "nominated without enough information to evaluate. No tolerance either",
                  ],
                ]}
              />
              <P>
                In September 2023 the FDA moved a group of popular peptides, BPC-157
                among them, into Category 2. That is the event usually described as the
                peptides being &ldquo;banned.&rdquo;
              </P>
              <Callout label="The distinction that matters">
                A category was never a legal status. It described how the FDA intended
                to use its enforcement discretion toward a substance that was{" "}
                <Em>already</Em> not on the list. Only Category 1 offered any shelter.
                Being in Category 2, being in Category 3 and being in no category at all
                have the same practical meaning: the ingredient does not qualify, and a
                pharmacy that uses it has no protection.
              </Callout>
              <P>
                This is why April 2026 changed less than it appeared to. The nominators
                of twelve Category 2 peptides withdrew their nominations, and the FDA
                took those peptides out of the category (
                <a href={REF.risks} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA
                </a>
                ). Many reports called this removal from the &ldquo;do-not-compound
                list.&rdquo; But a substance that leaves Category 2 does not land in
                Category 1, and it does not land on the bulks list. It lands nowhere. It
                still fails gate two. The FDA has also said it will not sort new
                nominations into categories at all, so the interim bins are winding
                down, and the only question left for any substance is the real one: is
                it on the list?
              </P>
            </Section>

            <Section title="How something gets onto the list">
              <P>
                There is one route, and it has fixed steps. The FDA reviews the
                substance against criteria that include how well it is chemically
                characterised, what is known about its safety, what evidence exists that
                it works, and how long it has been used in compounding. It consults the
                Pharmacopeia and its Pharmacy Compounding Advisory Committee. It
                publishes a proposed rule. The public comments. It publishes a final
                rule. Only the last step changes what a pharmacy may do.
              </P>
              <P>
                The July 2026 committee meeting was the consultation step. The committee
                recommended six peptides for the list, by narrow margins and against the
                advice of the FDA&rsquo;s own reviewers, and declined a seventh (
                <a href={REF.docket} target="_blank" rel="noopener noreferrer" className={LINK}>
                  docket FDA-2025-N-6895
                </a>
                ). The agency is free to follow the recommendation, reject it, or take
                its time. For the molecule with the most riding on it, the evidence the
                reviewers were weighing is laid out in{" "}
                <Link href="/insights/the-trial-that-hasnt-reported" className={LINK}>
                  the trial that hasn&rsquo;t reported
                </Link>
                .
              </P>
            </Section>

            <Section title="Gate three: is it a copy of something already sold?">
              <P>
                An ingredient that qualifies can still be stopped here. A pharmacy may
                not compound, regularly or in inordinate amounts, what is essentially a
                copy of a commercially available drug. The reasoning is simple: the
                exemption exists for patients whose needs an approved product cannot
                meet, not as a second supply of the approved product itself. Outsourcing
                facilities face a stricter version of the same rule.
              </P>
              <P>
                The rule has a switch built into it. A drug on the FDA&rsquo;s shortage
                list is not treated as commercially available, so a copy of it is not a
                prohibited copy. When demand for semaglutide and tirzepatide outran
                supply, both went on the shortage list, the copy gate swung open, and a
                large compounding industry formed in the gap. Tirzepatide came off the
                list in December 2024 and semaglutide in February 2025. After short
                grace periods the gate closed again.
              </P>
              <P>
                Nothing about the molecules changed, and nothing about their safety was
                decided. The legal basis was the shortage, and the shortage ended. What
                survives is the narrow case the rule always allowed: a preparation that
                differs from the approved product in a way that matters for a particular
                patient, as their prescriber determines. In April 2026 the FDA also
                proposed keeping semaglutide, tirzepatide and liraglutide off the
                outsourcing-facility ingredient list, which would close the 503B route
                separately.
              </P>
            </Section>

            <Section title="Gate four: is there a patient and a prescription?">
              <P>
                The last gate is the oldest. Pharmacy compounding is for an identified
                individual, on a valid prescription, by a licensed pharmacist or
                physician. This is the gate that the phrase &ldquo;research use
                only&rdquo; is written to avoid. Material sold under that label is not
                claiming to be a compounded drug at all. It is sold as a laboratory
                chemical, outside the pharmacy system, with no prescriber, no pharmacist
                and none of the quality obligations either section imposes. That is a
                different legal position from a compounded preparation, and a weaker one
                for the buyer: see{" "}
                <Link href="/insights/what-you-can-actually-get" className={LINK}>
                  cataloged vs. reachable
                </Link>{" "}
                and{" "}
                <Link href="/insights/how-to-read-a-peptide-coa" className={LINK}>
                  how to read a certificate of analysis
                </Link>
                .
              </P>
            </Section>

            <Section title="Four questions for the next headline">
              <P>
                With the gates in hand, any compounding story can be sorted in under a
                minute.
              </P>
              <Bullets
                items={[
                  [
                    "Which section?",
                    "A change to the outsourcing-facility list says nothing about what a neighbourhood compounding pharmacy may do, and the reverse",
                  ],
                  [
                    "Which gate?",
                    "An ingredient story (lists, categories, committee votes) and a copy story (shortages, grace periods) are different problems with different fixes",
                  ],
                  [
                    "Advice, proposal or final rule?",
                    "A committee vote is advice. A proposed rule is an invitation to comment. Only a final rule, published and in effect, moves a gate",
                  ],
                  [
                    "Did the substance arrive anywhere?",
                    "Leaving a restricted bin is not the same as joining the permitted list. Ask where it is now, not where it used to be",
                  ],
                ]}
              />
              <P>
                Run 2026 through those four and the year reads plainly. The semaglutide
                story was a copy-gate story, settled when the shortage ended. The
                research-peptide story is an ingredient-gate story, and it is not
                settled: the peptides left Category 2, drew a favourable advisory vote,
                and when this page was reviewed still sat on no list. Each
                molecule&rsquo;s current standing is on its monograph, with the date it
                was last checked and a link to the record it was checked against.
              </P>
            </Section>

            <Section title="The short version">
              <Bullets
                items={[
                  ["A compounded drug is an unapproved drug with a legal exemption", "The exemption has conditions, and every one of them has to be met."],
                  ["Four gates", "Small enough to be a drug rather than a biologic; an ingredient that qualifies; not a copy of a marketed product; a real patient and prescription."],
                  ["Three ways for an ingredient to qualify", "A pharmacopeia monograph, a place inside an approved drug, or the 503A bulks list."],
                  ["Categories were enforcement posture, not law", "Only Category 1 gave shelter. Leaving Category 2 put a substance nowhere."],
                  ["The shortage list is a switch on the copy gate", "It opened GLP-1 compounding and, when the shortages ended, closed it."],
                  ["Only a final rule moves a gate", "Votes and proposals are steps toward one."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/the-door-swings-both-ways" label="The door swings both ways — what moved in 2026" />
                <CrossLink href="/insights/what-you-can-actually-get" label="Cataloged vs. reachable" />
                <CrossLink href="/insights/the-trial-that-hasnt-reported" label="The trial that hasn't reported — BPC-157's human record" />
                <CrossLink href="/insights/how-to-read-a-peptide-coa" label="How to read a peptide COA" />
                <CrossLink href="/insights/where-the-powder-comes-from" label="Where the powder comes from" />
                <CrossLink href="/hormones/bpc-157" label="BPC-157 — current regulatory status" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on how United States federal compounding law is
              structured, summarized and simplified from the statute and FDA&rsquo;s public
              pages. It is not legal or medical advice, state law adds its own
              requirements, and the rules change; check the linked primary sources for the
              current position. Compounds are named to explain the rules, not to endorse
              obtaining or using any of them.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The four gates a peptide must pass to be compounded under 503A ──────────
   Each row is one test, with the molecule that stops there on the right. The
   figure is the article's argument: BPC-157 and semaglutide fail at different
   gates, so they are different stories.                                        */
function FourGates() {
  const W = 620;
  const ROW = 64;
  const TOP = 14;
  const gates: { q: string; sub: string; stop: string }[] = [
    { q: "40 amino acids or fewer?", sub: "longer chains are biologics", stop: "hCG, growth hormone" },
    { q: "Does the ingredient qualify?", sub: "monograph · approved drug · 503A list", stop: "BPC-157, TB-500" },
    { q: "Not a copy of a marketed drug?", sub: "unless that drug is in shortage", stop: "semaglutide, tirzepatide" },
    { q: "A patient and a prescription?", sub: "licensed pharmacist or physician", stop: "research-use-only sales" },
  ];
  const H = TOP + gates.length * ROW + 56;
  const railX = 34;
  const font = "var(--font-space-grotesk), sans-serif";
  const mono = "var(--font-geist-mono), monospace";

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Four gates a peptide must pass, in order, to be lawfully compounded by a pharmacy under section 503A. Gate one: is it 40 amino acids or fewer; hCG and growth hormone stop here as biologics. Gate two: does the ingredient qualify by monograph, approved drug or the 503A list; BPC-157 and TB-500 stop here. Gate three: is it not a copy of a marketed drug, unless that drug is in shortage; semaglutide and tirzepatide stop here. Gate four: is there a patient and a prescription; research-use-only sales stop here. Only a molecule that passes all four may be compounded."
      >
        {/* the path down through the gates */}
        <line
          x1={railX}
          y1={TOP + 18}
          x2={railX}
          y2={TOP + gates.length * ROW + 14}
          stroke="var(--accent)"
          strokeOpacity="0.45"
          strokeWidth="2"
        />
        {gates.map((g, i) => {
          const y = TOP + i * ROW + 24;
          return (
            <g key={g.q}>
              <circle cx={railX} cy={y} r="11" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.6" />
              <text x={railX} y={y + 4} textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="600" fontFamily={mono}>
                {i + 1}
              </text>
              <text x={railX + 26} y={y - 2} fill="var(--color-ink)" fillOpacity="0.9" fontSize="14" fontWeight="600" fontFamily={font}>
                {g.q}
              </text>
              <text x={railX + 26} y={y + 16} fill="var(--color-ink)" fillOpacity="0.5" fontSize="11" fontFamily={mono}>
                {g.sub}
              </text>
              {/* the exit: who stops at this gate */}
              <line x1={330} y1={y} x2={392} y2={y} stroke="var(--accent-amber)" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="3 4" />
              <text x={400} y={y - 2} fill="var(--accent-amber)" fontSize="10.5" fontWeight="600" fontFamily={mono}>
                STOPS HERE
              </text>
              <text x={400} y={y + 15} fill="var(--color-ink)" fillOpacity="0.75" fontSize="12.5" fontFamily={font}>
                {g.stop}
              </text>
            </g>
          );
        })}
        {/* the end of the path */}
        <circle cx={railX} cy={TOP + gates.length * ROW + 26} r="11" fill="var(--accent-teal)" fillOpacity="0.9" />
        <text x={railX + 26} y={TOP + gates.length * ROW + 31} fill="var(--accent-teal)" fontSize="14" fontWeight="600" fontFamily={font}>
          May be compounded for that patient
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The pharmacy (503A) path. A molecule must clear every gate; the names on the right are
        where each one stops today.
      </figcaption>
    </figure>
  );
}
