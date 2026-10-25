import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-door-swings-both-ways")!;

export const metadata: Metadata = {
  title:
    "Compounded GLP-1 and Research-Peptide Rules in 2026: What Actually Changed — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Door Swings Both Ways: 2026's Two Opposite Moves in Peptide Availability · Peptide Hormone",
    description: insight.dek,
  },
};

// External sources — regulatory primaries and explainers, named inline.
const REF = {
  compounding: "https://www.fda.gov/drugs/human-drug-compounding", // FDA — human drug compounding, 503A/503B framework
  docket: "https://www.regulations.gov/docket/FDA-2025-N-6895", // FDA-2025-N-6895 — 503A bulk drug substances nominated (PCAC July 2026)
  china: "https://www.morganlewis.com/pubs/2026/02/navigating-chinas-new-2026-implementing-regulations-of-the-drug-administration-law", // China 2026 Drug Administration Law implementing regs
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "Can compounding pharmacies still make semaglutide or tirzepatide in 2026?",
    a: "Essentially no, not as a routine copy of the branded drug. Both came off the FDA shortage list — tirzepatide in December 2024, semaglutide in February 2025 — and the enforcement grace periods for 503A pharmacies and 503B outsourcing facilities expired in spring 2025. In April 2026 the FDA went further and proposed excluding semaglutide, tirzepatide and liraglutide from the 503B bulks list, which would close the outsourcing-facility route too. Narrow patient-specific exceptions exist, but the shortage-era free-for-all is over.",
  },
  {
    q: "Did the FDA approve BPC-157, TB-500, KPV, MOTS-c, epitalon or semax in 2026?",
    a: "No. On 23–24 July 2026 the Pharmacy Compounding Advisory Committee voted — narrowly, 8–6, and against the FDA's own review staff — to recommend adding six of those peptides to the 503A bulk-substances list; a seventh, emideltide, was rejected. A committee recommendation is advice, not a rule. The FDA still has to act through notice-and-comment rulemaking, which has not concluded, so nothing a patient or researcher can actually obtain changed because of the vote.",
  },
  {
    q: "What is the difference between 503A and 503B compounding?",
    a: "503A refers to traditional pharmacy compounding of a patient-specific preparation against an individual prescription. 503B refers to registered 'outsourcing facilities' that can compound larger batches under tighter manufacturing standards. The two tracks have separate lists of which bulk substances may be used, and in 2026 both lists are the battleground: the GLP-1 drugs are being pushed off them while a set of research peptides is being considered for the 503A list.",
  },
  {
    q: "Why is a committee vote not the same as a drug being available?",
    a: "Because availability is set by rules, not recommendations. The advisory committee only advises; the FDA decides, and it does so through a formal rulemaking process with public comment that takes time and can land differently from the committee's vote. Between a recommendation and a final rule sits an indefinite gap in which the legal status of a substance has not actually moved. Reading a vote as a verdict is the single most common error in this space.",
  },
  {
    q: "How does China's 2026 drug law affect peptide availability?",
    a: "Most finished peptide ultimately traces to a concentrated set of Chinese manufacturing lines, and China's 2026 implementing regulations of its Drug Administration Law push that supply chain toward real traceability and tighter manufacturing oversight. It is the upstream counterpart to the US compounding fights: while regulators in the US argue over which peptides may be compounded and by whom, the origin of the powder itself is acquiring a paper trail it did not have before.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
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
            <Section title="Availability is weather, not climate">
              <P>
                A molecule&rsquo;s biology is climate: its sequence, its receptor, its
                half-life don&rsquo;t change from one quarter to the next.{" "}
                <Link href="/insights/what-you-can-actually-get" className={LINK}>
                  What you can actually get
                </Link>{" "}
                is weather — it moves, sometimes fast, and almost nobody charts it. For most
                of this field the weather is set by two forces: who is allowed to compound a
                molecule, and where the raw powder{" "}
                <Link href="/insights/where-the-powder-comes-from" className={LINK}>
                  comes from
                </Link>
                . In 2026 both moved at once, and here is the part worth slowing down for:
                they moved in <Em>opposite directions</Em>.
              </P>
              <P>
                One door swung shut and another cracked open in the same year. The approved
                blockbusters — semaglutide, tirzepatide — were walled off from the
                compounding that the shortage years had made routine. Meanwhile a set of
                research peptides that had been pushed <Em>out</Em> of compounding reach got
                a federal committee&rsquo;s nod to come partway back in. Reading the
                availability map now means reading both doors — and not mistaking a vote for
                a rule. Bullish on the science, sceptical on the paperwork.
              </P>
            </Section>

            <Section title="Door one: the GLP-1 compounding door closes">
              <P>
                For two years, a quirk of drug-shortage law put the biggest molecules in
                medicine within reach of compounders. When a drug is on the FDA shortage
                list, pharmacies may compound a version of it; semaglutide and tirzepatide
                were both in shortage as demand outran supply, and a large grey-market
                compounding industry grew in the gap. That window is now shut. Tirzepatide
                came off the shortage list in December 2024 and semaglutide in February 2025,
                and the enforcement grace periods for both the{" "}
                <a href={REF.compounding} target="_blank" rel="noopener noreferrer" className={LINK}>
                  503A pharmacies and 503B outsourcing facilities
                </a>{" "}
                expired through spring 2025.
              </P>
              <P>
                Then the FDA pressed further. In April 2026 it proposed excluding
                semaglutide, tirzepatide and liraglutide from the 503B bulks list outright —
                the step that would close even the outsourcing-facility route, on the
                reasoning that there is no clinical need to compound these from bulk when the
                approved product is available. Narrow patient-specific exceptions survive,
                but the direction is unambiguous: the approved GLP-1 drugs are being pushed
                out of compounding and back behind the pharmacy counter. For a buyer, the
                effect this has already had on the availability layer is real and
                subtractive — the easy compounded supply is going away.
              </P>
            </Section>

            <Section title="Door two: the research-peptide door cracks open">
              <P>
                The opposite motion runs through a different set of molecules. In 2023 the
                FDA placed several popular research peptides — BPC-157, KPV, MOTS-c, epitalon
                among them — into its Category 2, the bin for substances it judged to raise
                significant safety concerns, which in effect barred them from compounding.
                Compounders and prescribers pushed back; a lawsuit over the opacity of that
                process settled in 2024; and the settlement forced the agency to actually
                convene its advisory committee and hear the nominations.
              </P>
              <P>
                That hearing was the 23&ndash;24 July 2026 meeting of the Pharmacy Compounding
                Advisory Committee, and it did not go the way the FDA&rsquo;s own scientists
                asked. The committee voted — by a narrow 8&ndash;6, against the recommendation
                of FDA review staff — to recommend adding six peptides (BPC-157, KPV, TB-500,
                MOTS-c, epitalon and semax) to the 503A bulk-substances list; a seventh,
                emideltide, was rejected (
                <a href={REF.docket} target="_blank" rel="noopener noreferrer" className={LINK}>
                  docket FDA-2025-N-6895
                </a>
                ). Read quickly, that sounds like six peptides just became legal to compound.
                Read correctly, almost nothing happened yet — and the difference is the whole
                point.
              </P>
              <RegulatoryTimeline />
            </Section>

            <Section title="What a vote is, and isn't">
              <P>
                A Pharmacy Compounding Advisory Committee recommendation is <Em>advice</Em>.
                It is one step in a longer machine: the committee votes, the FDA weighs that
                vote against its own review, and any actual change to the 503A list happens
                through notice-and-comment rulemaking that is slow, public, and free to land
                differently from the committee. Between the July vote and a final rule sits an
                indefinite gap in which the legal status of these peptides has not moved at
                all. The four that were in Category 2 still may not be compounded; the two
                that were never categorized remain research-use-only material.
              </P>
              <P>
                This is the same discipline the{" "}
                <Link href="/insights/the-trial-that-hasnt-reported" className={LINK}>
                  &ldquo;first human trial&rdquo; headlines
                </Link>{" "}
                demand: a committee that votes 8&ndash;6 on access grounds, with — as the
                record shows — no new safety data in the room, is expressing a preference, not
                delivering a verdict. &ldquo;FDA panel backs BPC-157&rdquo; is a true sentence
                that most readers will complete incorrectly in their heads. What the vote
                actually changed on the availability layer, as of this writing, is nothing.
                What it changed about the <Em>odds</Em> is real, and worth watching — which is
                exactly why availability is tracked as living data rather than announced once.
              </P>
              <Callout label="How to read it">
                A shortage delisting is a fact that has already bitten. A proposed rule is a
                strong signal that has not. A committee vote is a forecast. Three different
                tenses, three different weights — and the common mistake is to read all of
                them in the present tense, as though the door had finished moving.
              </Callout>
            </Section>

            <Section title="The upstream tightens too">
              <P>
                While the US argues over who may compound what, the source of the powder is
                changing under its own regulator. Most finished, lyophilized peptide still
                traces back to a concentrated set of Chinese manufacturing lines, and{" "}
                <a href={REF.china} target="_blank" rel="noopener noreferrer" className={LINK}>
                  China&rsquo;s 2026 implementing regulations of its Drug Administration Law
                </a>{" "}
                push that supply chain toward real traceability and tighter oversight. It is
                the upstream counterpart to the compounding fight: the origin of the material
                is acquiring a paper trail it did not have before.
              </P>
              <P>
                So all three layers of the availability map moved in a single year. The
                approved drugs were pushed out of compounding; a slate of research peptides
                was pushed, by one vote, toward the edge of coming back in; and the
                manufacturing source began to professionalize. None of these is finished. A
                proposed rule can be revised, a recommendation can die in rulemaking, a
                traceability regime takes years to bind. The map is being redrawn in pencil,
                in three places at once.
              </P>
            </Section>

            <Section title="Reading the weather">
              <P>
                The through-line of this whole series is that reachability is information the
                spec sheets omit, and that it changes while the biology stays still. 2026 is
                the year that point became impossible to miss: the peptide world is being
                sorted, in public, into two legal regimes pulling apart — the approved
                incretins herded toward pharmacy-only dispensing, the research peptides
                contested at the 503A line, and the whole supply chain audited from the
                source. A reference can publish that as data without becoming a store. What it
                cannot do is pretend the door has stopped moving, because in 2026 it is moving
                both ways at once.
              </P>
              <Bullets
                items={[
                  ["Availability moved in two opposite directions in 2026", "The approved GLP-1 compounding door closed; the research-peptide 503A door cracked open. Same year, opposite motions."],
                  ["GLP-1 compounding is winding down", "Tirzepatide (Dec 2024) and semaglutide (Feb 2025) came off shortage; 503A/503B grace periods expired in spring 2025; April 2026 brought a proposal to drop all three from the 503B bulks list."],
                  ["The July 2026 PCAC vote was a recommendation, not a rule", "8–6, against FDA staff, to add six peptides to the 503A bulk list (emideltide rejected). Rulemaking hasn't concluded; nothing reachable changed yet."],
                  ["A vote, a proposed rule and a delisting are three different tenses", "A forecast, a strong unfired signal, and a fact that already bit. Reading all three in the present tense is the field's most common error."],
                  ["The upstream is tightening in parallel", "China's 2026 drug-law reforms push the manufacturing source toward traceability — the origin of the powder getting a paper trail while the US fights over compounding."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/what-you-can-actually-get" label="Cataloged vs. reachable — the availability thesis" />
                <CrossLink href="/insights/where-the-powder-comes-from" label="Where the powder comes from — the supply chain" />
                <CrossLink href="/insights/the-trial-that-hasnt-reported" label="The trial that hasn't reported — how to read the headline" />
                <CrossLink href="/insights/early-adopters-catalog" label="The community found it first — who feels these shifts first" />
                <CrossLink href="/families/incretins-metabolic" label="The incretins & metabolic family" />
                <CrossLink href="/research?q=What%20did%20the%20July%202026%20FDA%20compounding%20advisory%20vote%20and%20the%20GLP-1%20shortage%20delisting%20actually%20change%20about%20peptide%20availability%3F" label="Ask the research agent about the 2026 rule changes" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on the regulatory and supply context around peptides,
              summarized from public agency actions, dockets and reporting and simplified in
              places. Regulatory status changes; dates and decisions are described to explain
              how availability moves, not as legal or medical advice. Verify any current
              status against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Two regulatory tracks diverging through 2024–2027 ── */
function RegulatoryTimeline() {
  const W = 700;
  const H = 300;
  const X0 = 60;
  const X1 = 648;
  const yTop = 104; // GLP-1 lane
  const yBot = 214; // research-peptide lane

  // normalized positions across the time axis (2024 → 2027)
  const px = (t: number) => X0 + t * (X1 - X0);

  const glp1: { t: number; label: string }[] = [
    { t: 0.08, label: "Dec 2024\nshortage ends" },
    { t: 0.4, label: "Spring 2025\ngrace ends" },
    { t: 0.76, label: "Apr 2026\n503B bulks\nexclusion proposed" },
  ];
  const research: { t: number; label: string }[] = [
    { t: 0.02, label: "2023\nCategory 2" },
    { t: 0.26, label: "2024\nsettlement" },
    { t: 0.66, label: "Jul 2026\nPCAC 8–6\nrecommends" },
    { t: 0.95, label: "rulemaking\npending" },
  ];

  const Dot = ({ x, y, hollow }: { x: number; y: number; hollow?: boolean }) => (
    <circle cx={x} cy={y} r={4.5} fill={hollow ? "var(--surface)" : "var(--accent)"} stroke="var(--accent)" strokeOpacity={0.8} strokeWidth={1.4} />
  );

  const multiline = (x: number, y: number, label: string, anchor: "above" | "below") => {
    const lines = label.split("\n");
    const dy = anchor === "above" ? -1 : 1;
    const start = anchor === "above" ? y - 12 - (lines.length - 1) * 11 : y + 16;
    return (
      <g>
        {lines.map((ln, i) => (
          <text key={i} x={x} y={start + i * 11} textAnchor="middle" fill="var(--color-ink)" fillOpacity={i === 0 ? 0.7 : 0.5} fontSize="9" fontWeight={i === 0 ? "600" : "400"}>{ln}</text>
        ))}
        <line x1={x} y1={anchor === "above" ? y - 8 : y + 6} x2={x} y2={y + dy * 2} stroke="var(--color-ink)" strokeOpacity={0.2} strokeWidth={1} />
      </g>
    );
  };

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A two-lane regulatory timeline running 2024 to 2027. The upper lane, GLP-1 compounding, closes: shortages end in December 2024, enforcement grace periods end in spring 2025, and in April 2026 the FDA proposes removing semaglutide, tirzepatide and liraglutide from the 503B bulks list. The lower lane, research peptides, moves the other way: Category 2 restriction in 2023, a 2024 settlement, a July 2026 advisory-committee 8 to 6 recommendation to add six peptides to the 503A list, and rulemaking still pending. The two lanes diverge — one closing, one cracking open."
      >
        <text x={W / 2} y={22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Two doors, one year, opposite directions
        </text>

        {/* lane labels */}
        <text x={X0} y={yTop - 40} fill="var(--color-ink)" fillOpacity={0.6} fontSize="10.5" fontWeight="600">GLP-1 compounding →  closing</text>
        <text x={X0} y={yBot + 46} fill="var(--accent)" fillOpacity={0.9} fontSize="10.5" fontWeight="600">Research peptides (503A) →  cracking open</text>

        {/* GLP-1 lane: solid, fading to a closed cap */}
        <line x1={X0} y1={yTop} x2={X1 - 40} y2={yTop} stroke="var(--color-ink)" strokeOpacity={0.4} strokeWidth={2} />
        <line x1={X1 - 40} y1={yTop} x2={X1} y2={yTop} stroke="var(--color-ink)" strokeOpacity={0.4} strokeWidth={2} strokeDasharray="3 3" />
        <line x1={X1} y1={yTop - 10} x2={X1} y2={yTop + 10} stroke="var(--color-ink)" strokeOpacity={0.5} strokeWidth={2} />
        {glp1.map((m, i) => <g key={i}><Dot x={px(m.t)} y={yTop} />{multiline(px(m.t), yTop, m.label, "above")}</g>)}

        {/* Research lane: accent, opening to an arrow */}
        <line x1={X0} y1={yBot} x2={px(0.66)} y2={yBot} stroke="var(--accent)" strokeOpacity={0.55} strokeWidth={2} />
        <line x1={px(0.66)} y1={yBot} x2={X1} y2={yBot} stroke="var(--accent)" strokeOpacity={0.55} strokeWidth={2} strokeDasharray="4 3" />
        <path d={`M ${X1 - 8} ${yBot - 5} L ${X1 + 2} ${yBot} L ${X1 - 8} ${yBot + 5}`} fill="none" stroke="var(--accent)" strokeOpacity={0.7} strokeWidth={1.6} />
        {research.map((m, i) => <g key={i}><Dot x={px(m.t)} y={yBot} hollow={m.t > 0.9} />{multiline(px(m.t), yBot, m.label, "below")}</g>)}

        {/* time axis ticks */}
        {["2024", "2025", "2026", "2027"].map((yr, i) => (
          <text key={yr} x={px(i / 3)} y={H - 6} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.35} fontSize="9">{yr}</text>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        One lane closing, one cracking open, in the same year. The hollow dot is the step that
        has not happened yet — a recommendation still waiting on a rule.
      </figcaption>
    </figure>
  );
}
