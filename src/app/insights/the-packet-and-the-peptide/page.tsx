import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Callout, Bullets, CrossLink, StatusNote } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-packet-and-the-peptide")!;

export const metadata: Metadata = {
  title:
    "Epitalon and the 503A Nomination: What the Packet, the Literature, and the Vote Each Decided — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Packet and the Peptide: Epitalon’s Nomination, Its Literature, and a 7–4 Vote · Peptide Hormone",
    description: insight.dek,
  },
};

const REF = {
  meeting:
    "https://www.mcdermottlaw.com/insights/bulk-list-bound-pcac-backs-majority-of-peptides-in-two-day-public-meeting/",
  telomerase: "https://pubmed.ncbi.nlm.nih.gov/12937682/",
  mice: "https://doi.org/10.1023/A:1025114230714",
  human: "https://pubmed.ncbi.nlm.nih.gov/14523363/",
  bulks:
    "https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding-under-section-503a-fdc-act",
} as const;

const FAQS = [
  {
    q: "Did the FDA approve Epitalon in 2026?",
    a: "No. On 23–24 July 2026 the Pharmacy Compounding Advisory Committee recommended adding Epitalon free base to the 503A bulk-substances list, 7–4 with one abstention, against the recommendation of FDA review staff. A committee recommends. Rulemaking decides. Until a final rule lists the substance, a pharmacy may not compound it from bulk on the strength of that vote.",
  },
  {
    q: "Why did FDA’s Epitalon review focus on insomnia?",
    a: "The nominations named several uses — insomnia, circadian disorders, longevity, stress response, cellular ageing — and the agency said the packet did not contain enough supporting information to evaluate the uses other than insomnia. The human study discussed in the briefing gave Epitalon sublingually for 20 days to 75 women and measured a urinary melatonin metabolite, not sleep, and not by the subcutaneous route the nomination proposed.",
  },
  {
    q: "Does a 7–4 vote mean the longevity evidence was good enough?",
    a: "It means a majority thought the four factors that govern the 503A bulks list were close enough to recommend inclusion, under a standard members described as lower than an investigational-new-drug application or a marketing approval. That is a decision about whether a prescriber and a pharmacist may weigh uncertainty for one patient. It is not a finding that telomerase activation, lifespan extension, or insomnia treatment has been shown.",
  },
  {
    q: "What was FDA’s safety concern about Epitalon?",
    a: "The principal theoretical concern was telomerase. The same activity that might preserve telomeres is a property of most cancers. Animal studies in the briefing did not show tumor promotion and some reported fewer spontaneous tumors, at limited doses and durations. Neither those studies nor the intermittent courses described in public comment are a carcinogenicity evaluation of higher or continuous exposure.",
  },
  {
    q: "Do large numbers of compounded doses prove Epitalon is safe?",
    a: "Retrospective counts — thousands of vials, hundreds of thousands of doses, few or no reported complaints — are real-world data. FDA’s point at the meeting was that data become evidence only when the population, indication, dose, duration, product source, and adverse-event collection are knowable. A reporting system that was never built does not produce a numerator of zero.",
  },
];

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/repair" className="text-accent-rose hover:text-ink">
                Repair &amp; regenerative
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
            <Section title="Three objects, one afternoon">
              <P>
                On 23–24 July 2026 the Pharmacy Compounding Advisory Committee spent part
                of a two-day meeting on{" "}
                <Link href="/hormones/epitalon" className={LINK}>Epitalon</Link>, the
                pineal tetrapeptide Ala-Glu-Asp-Gly. The committee recommended adding the
                free base to the 503A bulk-substances list, 7–4 with one abstention. FDA
                review staff had recommended against it. Accounts of the day, including{" "}
                <a href="https://americanpeptide.co/blogs/blog/epitalon-nomination-did-not-capture-full-record" className={LINK}>
                  a widely circulated meeting report
                </a>
                , landed on a sentence a supporter had offered from the floor: this was a
                nomination-quality problem, not a substance-quality problem.
              </P>
              <P>
                That sentence explains why the slides felt smaller than the comment file.
                It does not explain what anyone decided. A nomination is a packet. A
                literature is a set of experiments. A vote is a recommendation under a
                statute. Epitalon’s afternoon treated them as interchangeable, and the
                tidy line preserves the confusion. The useful reading separates them.
              </P>
              <Callout label="The real split">
                Filling in the packet would have given the committee a fuller file. It
                would not have converted a melatonin-metabolite study into an insomnia
                trial, or a theoretical telomerase concern into either a clearance or a
                conviction. The vote can be reasonable under the bulks standard while the
                science stays{" "}
                <Link href="/insights/the-clock-you-cant-audit" className={LINK}>
                  unaudited
                </Link>
                .
              </Callout>
            </Section>

            <Section title="What the packet actually put in front of FDA">
              <P>
                Nominations for Epitalon named several proposed uses: insomnia, circadian
                disorders, longevity, age-related disease, stress response, cellular
                ageing. FDA’s briefing evaluated insomnia. The agency’s reason, stated in
                the meeting, was procedural and specific: the nomination did not include
                enough information to evaluate the other uses. A use you name and do not
                document is not a use the statute asks the committee to grade.
              </P>
              <P>
                The human study the briefing did discuss is easy to mis-file as the
                missing insomnia trial. Seventy-five women received Epitalon under the
                tongue for twenty days. The measured endpoint was a urinary metabolite of
                melatonin, which rose. During questioning, FDA confirmed that the paper
                also reported improvement in psycho-emotional and physical condition in
                about 83 percent of the Epitalon group and 25 percent of the placebo
                group, and said the publication did not explain how those outcomes were
                measured. The route was sublingual. The nomination’s product was
                subcutaneous. A study can be clinical and still answer a different
                question from the one on the form.
              </P>
              <P>
                Commenters were right about a process fact. Translated material on human
                exposure, melatonin regulation, and ageing markers had been submitted, and
                FDA said characterization data had received a preliminary review. Members
                were asked to vote on a public file the agency’s slides had not fully
                absorbed. That is a real defect in how the day was run. It is also a
                defect with a boundary: an unread paper does not become stronger because
                it arrived late. The{" "}
                <a href={REF.telomerase} className={LINK}>telomerase result in human fibroblasts</a>,
                the{" "}
                <a href={REF.mice} className={LINK}>mouse lifespan paper</a>, and the{" "}
                <a href={REF.human} className={LINK}>266-person mortality report</a>{" "}
                were already public, already graded on this site, and already limited in
                the ways a fuller slide deck would still have had to say.
              </P>
              <MismatchDiagram />
            </Section>

            <Section title="The literature answers questions the form did not ask">
              <P>
                The record commenters wanted read into the meeting is the St. Petersburg
                pineal program: epithalamin distilled to a tetrapeptide, a cell-culture
                experiment in which Epitalon induced telomerase and was associated with
                longer telomeres in fetal fibroblasts, mouse work in which mean lifespan
                did not change and maximum lifespan rose by about twelve percent with
                fewer of some tumors, and a non-randomized human series on pineal and
                thymic extracts. Almost all of it comes from one research network. None of
                the lifespan findings has an independent replication.
              </P>
              <P>
                Put that record next to the nomination and the mismatch is the insight.
                The papers ask whether a short peptide can move a melatonin metabolite,
                a telomere assay, or the tail of a survival curve. A 503A nomination has
                to support a bulk substance a pharmacy could compound: a defined salt, a
                route, a dose, a duration, and a safety picture for the exposure that
                implies. Foreign-language studies of a different preparation, by a
                different route, on a different endpoint, are evidence of a research
                tradition. They are not a substitute dossier for the product that was
                nominated. Calling the gap a failure to “capture the full record” flatters
                both sides. The record is full of a different subject.
              </P>
            </Section>

            <Section title="Telomerase is one event with two readings">
              <P>
                FDA’s main safety question was the mechanism the brochure treats as the
                benefit. Telomerase rebuilds chromosome ends. It is also how many cancer
                cells keep dividing. The agency asked what prolonged or continuous
                exposure could do. The animal studies in the review did not show tumor
                promotion; some reported fewer or smaller spontaneous tumors and longer
                life, at limited doses and limited time. Public comment answered with the
                pattern of use people actually describe — short courses, then a stop — and
                with the phrase “theoretical rather than demonstrated.”
              </P>
              <P>
                Both descriptions can be true, and neither is a study. “Theoretical” means
                the carcinogenic experiment at the relevant dose and duration has not been
                done. “Not demonstrated in these animals” means the experiments that were
                done, at the exposures they used, did not promote tumors. An intermittent
                course is a hypothesis about exposure. It is not a carcinogenicity design.
                The disagreement worth having is which uncertainty a 503A factor analysis
                is allowed to leave with a prescriber. The disagreement the floor kept
                scoring — benefit wins, or hazard wins — needs data the meeting did not
                have on either side.
              </P>
            </Section>

            <Section title="Exposure counts are not a safety study">
              <P>
                Several speakers brought retrospective pharmacy numbers. One described
                more than 14,000 source-identified vials and a single complaint, a cloudy
                vial, which is a quality observation. Others cited records covering more
                than 200,000 doses with no reported adverse event and no reported
                immunogenicity reaction. FDA’s reply was the distinction the phrase
                “real-world evidence” keeps swallowing: a pile of doses is data, and data
                become evidence when you can say who received them, for what, at what
                dose, for how long, from which product, and whether anyone was looking for
                harm. Absence from a system that does not collect events is not a measured
                rate of zero.
              </P>
              <P>
                The same hour produced the opposite quality story, and it is the one the
                nomination debate usually drops. A domestic manufacturer reported testing
                research-market Epitalon: samples missing potency, purity under 80 percent
                in some of them, residual trifluoroacetic acid as high as 14 milligrams
                per gram. That is an argument about unregulated supply. It is not an
                argument that the tetrapeptide is toxic, and it is not an argument that
                listing the substance creates a single clean manufacturer. FDA’s line on
                that last point was blunt, and it is the structural one: once a substance
                is on the bulks list, the agency cannot confine it to one firm, one route
                of synthesis, or one certificate of analysis. A capable analytical method
                — four amino acids, mass spectrometry, chromatography — shows the molecule
                can be specified. The statute, after a listing, does not require that
                every compounder meet the best specification in the room.
              </P>
              <P>
                The nominations were also inconsistent about which substance they had
                named, free base or acetate, and the certificates of analysis did not line
                up cleanly with either. Missing impurity, aggregation, bioburden,
                endotoxin, and injectable-quality information is a characterization gap.
                It sits under a different factor from “does the peptide lengthen
                telomeres.” A meeting that argues only the second factor will always feel,
                to people holding the first, like the wrong trial.
              </P>
            </Section>

            <Section title="What 7–4 is allowed to mean">
              <P>
                Members who voted yes described the standard they thought they were
                applying. The bulks list is governed by four factors — chemistry,
                safety, evidence of effectiveness for the proposed use, and historical
                use — under{" "}
                <a href={REF.bulks} className={LINK}>section 503A</a>. Several said the
                room kept sliding toward the burden of an investigational new drug
                application. Pharmacist members talked about a patient-specific
                prescription and a named pharmacist, which is the compounding model, as
                against a product made for an unnamed market. One yes vote said outright
                that the file in front of the committee and the file in the slides were
                not the same file. The National Association of Boards of Pharmacy
                abstained, its usual position of neither supporting nor opposing peptide
                additions.
              </P>
              <P>
                The no votes named characterization, the telomerase question, and the
                absence of a dose and a frequency a prescriber could actually use. One
                member called it a significant lack of information both to evaluate the
                product and to know how to prescribe it. That objection is not a demand
                for Phase 3. It is a demand that “patient-specific” still have a regimen
                to be specific about.
              </P>
              <P>
                Hold the tally next to the{" "}
                <Link href="/insights/the-door-swings-both-ways" className={LINK}>
                  rest of that July meeting
                </Link>
                . Six peptides were recommended; a seventh was not; staff opposed the
                set; nothing on the list changed, because a committee advises and a rule
                decides. Epitalon’s 7–4 is one cell in that table. Read as a forecast of
                rulemaking, it is a signal. Read as a verdict that the longevity claim
                survived contact with evidence, it is the wrong document.
              </P>
              <Bullets
                items={[
                  ["The packet", "Nominated uses included insomnia and longevity. FDA could review insomnia. The human study in the briefing was sublingual, measured a melatonin metabolite, and did not establish a sleep outcome."],
                  ["The literature", "Telomerase in fibroblasts, a mouse maximum-lifespan nudge, a non-randomized mortality series — mostly one research network, answering different questions from a bulks dossier."],
                  ["The hazard", "Telomerase activation is the proposed benefit and the theoretical cancer concern. Limited animal studies did not show promotion. They also did not test continuous exposure."],
                  ["The exposure counts", "Thousands of vials and hundreds of thousands of doses are real-world data. Without a population, a dose, and active follow-up they are not a safety rate."],
                  ["The vote", "7–4 with one abstention recommended the free base for the 503A list, against staff, under a standard below drug approval. The recommendation is not a listing, and it is not an audit of the science."],
                ]}
              />
            </Section>

            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/epitalon" label="Epitalon reference" />
                <CrossLink href="/insights/the-clock-you-cant-audit" label="The clock you can't audit — the science, graded" />
                <CrossLink href="/insights/the-door-swings-both-ways" label="The door swings both ways — the July 2026 votes" />
                <CrossLink href="/insights/how-peptide-compounding-rules-work" label="How the compounding rules actually work" />
                <CrossLink href="/insights/what-you-can-actually-get" label="What you can actually get — vote versus status" />
                <CrossLink
                  href="/research?q=What%20did%20the%20July%202026%20PCAC%20vote%20on%20epitalon%20decide%2C%20and%20what%20did%20it%20leave%20unresolved%3F"
                  label="Ask the research agent about the Epitalon vote"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on a public advisory-committee meeting and the
              evidence discussed in it, summarized from the meeting record as reported and
              from the scientific literature, and simplified in places. Not legal advice,
              not individualized medical advice, and not a prescription. <StatusNote of={["epitalon"]} />{" "}
              A committee recommendation is not a change in regulatory status. The vote
              tally is taken from the 23–24 July 2026 webcast as recorded by{" "}
              <a href={REF.meeting} className={LINK}>McDermott Will &amp; Emery</a>.
              Meeting details of FDA’s briefing and public comment follow contemporaneous
              accounts of that session; verify them against the official transcript when
              you need a quotation.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

function MismatchDiagram() {
  const cols: { h: string; rows: string[] }[] = [
    {
      h: "What the packet asked",
      rows: ["Insomnia, subcutaneous", "A defined bulk substance", "A dose and a course", "Safety at that exposure"],
    },
    {
      h: "What the literature has",
      rows: ["A melatonin metabolite, sublingual", "Telomerase, in a dish", "Max lifespan, in mice", "One research network"],
    },
    {
      h: "What 7–4 decided",
      rows: ["Recommend the free base", "Under the four factors", "Against FDA staff", "Not a listing, not an audit"],
    },
  ];

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <figcaption className="mb-3 text-center font-display text-[13px] font-semibold text-ink/70">
        Three columns that do not answer each other
      </figcaption>
      <div className="grid gap-3 sm:grid-cols-3">
        {cols.map((c) => (
          <div key={c.h} className="rounded-xl border border-ink/10 bg-panel/50 p-3">
            <div className="font-mono text-[10px] uppercase tracking-wide text-accent-rose">{c.h}</div>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-5 text-ink/75">
              {c.rows.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  );
}
