import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Callout, Bullets, CrossLink, StatusNote } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("eloratzp")!;

export const metadata: Metadata = {
  title: "What is EloraTZP? Eloralintide + Tirzepatide Weight Loss vs Tirzepatide Alone — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

const REF = {
  eloraTzp:
    "https://investor.lilly.com/news-releases/news-release-details/lillys-eloratzp-combination-eloralintide-and-tirzepatide",
  eloraTzpPr:
    "https://www.prnewswire.com/news-releases/lillys-eloratzp-combination-of-eloralintide-and-tirzepatide-delivered-greater-weight-loss-and-a1c-reduction-vs-tirzepatide-15-mg-in-adults-with-obesity-and-type-2-diabetes-302894480.html",
  eloraTzpRegistry: "https://clinicaltrials.gov/study/NCT06603571",
  phase2: "https://pubmed.ncbi.nlm.nih.gov/41207310/",
} as const;

const FAQS = [
  {
    q: "What is EloraTZP?",
    a: "EloraTZP is Eli Lilly's investigational combination of eloralintide, a once-weekly selective amylin receptor agonist, and tirzepatide, a dual GIP and GLP-1 receptor agonist (the active ingredient in Mounjaro and Zepbound). In the phase 2b trial the two drugs were given as separate weekly injections; Lilly plans phase 3 of a single co-formulated product by the end of 2026. Neither the combination nor eloralintide is approved.",
  },
  {
    q: "How much weight did people lose on EloraTZP vs tirzepatide?",
    a: "In a 48-week phase 2b trial of 367 adults with obesity and type 2 diabetes, reported at EASD on 30 September 2026, eloralintide 9 mg plus tirzepatide 15 mg produced a mean 23.3% weight loss (about 54.1 lb) and a 2.9-point A1C reduction, versus 14.8% and 2.4 points on tirzepatide 15 mg alone. Eloralintide 6 mg plus tirzepatide 10 mg reached 19.9%. Eloralintide alone in this diabetic population reached at most 12.3% (6 mg). The result is a sponsor release and conference presentation; the paper has not been published.",
  },
  {
    q: "When does EloraTZP enter phase 3?",
    a: "Lilly said, based on this 48-week phase 2b, it will initiate phase 3 trials of an EloraTZP co-formulation in Q4 2026, using an optimized escalation schedule. Eloralintide monotherapy is already in phase 3 for obesity (the ENLIGHTEN program). A press-release timeline is not enrollment; check ClinicalTrials.gov for the combination studies when they post.",
  },
  {
    q: "Is EloraTZP the same as CagriSema or amycretin?",
    a: "No. CagriSema is Novo's two-pen stack of cagrilintide (a dual amylin/calcitonin agonist) plus semaglutide. Amycretin is Novo's unimolecular GLP-1-plus-amylin peptide. EloraTZP is Lilly's two-molecule stack of a selective amylin agonist plus tirzepatide (GIP/GLP-1), intended as one co-formulated injection. Three answers to the same question — two satiety families — with different chemistry, different incretin half, and no head-to-head.",
  },
  {
    q: "Why did so many people discontinue EloraTZP?",
    a: "Treatment discontinuation for adverse events was 10.8% to 27.0% across EloraTZP arms, versus 2.9% on tirzepatide 15 mg, 0% to 10.8% on eloralintide alone, and 16.7% on placebo. Gastrointestinal events were the most common and were more frequent on the combination. The release attributes this to the escalation used in the trial and promises a different schedule for phase 3. A 27% arm is the number to watch when the paper appears; placebo discontinuation being higher than most active arms is unexplained in the release.",
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
            <Section title="The name is a stack, not a molecule">
              <P>
                EloraTZP is not a new peptide. It is Lilly&rsquo;s label for{" "}
                <Link href="/hormones/eloralintide" className={LINK}>eloralintide</Link>
                {" "}given together with{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link>
                : a selective amylin receptor agonist stacked on a dual GIP and GLP-1
                receptor agonist. In the phase 2b study the two drugs were separate
                once-weekly injections. The product Lilly says it will take into phase 3
                is a co-formulation — one syringe, two molecules, each keeping its own
                pharmacokinetics.
              </P>
              <P>
                That design is the point.{" "}
                <Link href="/insights/the-molecule-that-is-both-halves" className={LINK}>
                  Amycretin
                </Link>{" "}
                welds GLP-1 and amylin into one chain and fixes the ratio. CagriSema is
                two pens of cagrilintide plus semaglutide. EloraTZP is the third answer:
                two satiety families, independently engineered, mixed rather than fused.
                A two-week amylin analog and a five-day dual incretin in the same
                injection is a mixture, not a molecule.
              </P>
              <Callout label="The reframe">
                The 23% headline is not &ldquo;amylin beat tirzepatide.&rdquo; It is
                tirzepatide plus a second receptor family, in the harder population —
                obesity with type 2 diabetes — where every class loses less weight.
              </Callout>
            </Section>

            <Section title="What the 48-week readout actually said">
              <P>
                Lilly randomised 367 adults with obesity and type 2 diabetes across ten
                arms for 48 weeks and reported at EASD in Milan on 30 September 2026. It
                is a press release and a conference presentation; the paper has not been
                published (
                <a href={REF.eloraTzp} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, 30 September 2026
                </a>
                ,{" "}
                <a href={REF.eloraTzpPr} target="_blank" rel="noopener noreferrer" className={LINK}>
                  PR Newswire
                </a>
                ,{" "}
                <a href={REF.eloraTzpRegistry} target="_blank" rel="noopener noreferrer" className={LINK}>
                  NCT06603571
                </a>
                ). Combination arms started at eloralintide 1 or 3 mg plus tirzepatide
                2.5 mg and escalated every four weeks to target.
              </P>
              <EloraTzpFigure />
              <Bullets
                items={[
                  [
                    "The headline",
                    "Eloralintide 9 mg plus tirzepatide 15 mg: −23.3% body weight (~54.1 lb) and −2.9 A1C points. Tirzepatide 15 mg alone: −14.8% and −2.4. Eloralintide 6 mg plus tirzepatide 10 mg: −19.9%. Placebo: −3.0%.",
                  ],
                  [
                    "Eloralintide alone, this population",
                    "In people with type 2 diabetes, weekly eloralintide reached −8.2% at 3 mg, −12.3% at 6 mg, −11.1% at 9 mg. That is not the 20% from the obesity-without-diabetes monotherapy trial (The Lancet, December 2025; PMID 41207310). Diabetes is the harder room.",
                  ],
                  [
                    "The arithmetic",
                    "The top combination beat tirzepatide 15 mg by 8.5 points of weight. Eloralintide alone contributed about 11 to 12 points here. Less than fully additive — two satiety signals converging on overlapping hindbrain circuits would predict that — and still the largest number reported in this population to date. Do not rank it against retatrutide: there is no head-to-head.",
                  ],
                  [
                    "The cost",
                    "Discontinuation for adverse events ran 10.8% to 27.0% on combination arms, against 2.9% on tirzepatide alone and 0% to 10.8% on eloralintide alone. Gastrointestinal events were more frequent on the stack. Lilly attributes this to escalation and promises an optimised schedule for phase 3.",
                  ],
                  [
                    "The odd placebo",
                    "Placebo discontinuation was 16.7%, higher than most active arms, and placebo weight loss was 3.0%. Neither is explained in the release.",
                  ],
                ]}
              />
              <P>
                The 20% monotherapy figure that gets compared in passing is a different
                trial, a different population, and a published paper (
                <a href={REF.phase2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  PMID 41207310
                </a>
                ). EloraTZP&rsquo;s 23.3% is still a release.
              </P>
            </Section>

            <Section title="Three ways to put amylin next to an incretin">
              <P>
                The field is not short of combination ideas. It is short of a ranking
                among them.
              </P>
              <Bullets
                items={[
                  [
                    "CagriSema — two pens",
                    "Cagrilintide (dual amylin and calcitonin receptor agonist) plus semaglutide. Ratio can, in principle, be tuned. Two injections, two manufacturing paths.",
                  ],
                  [
                    "Amycretin — one chain",
                    "GLP-1 and amylin agonism welded into a single peptide. One pharmacokinetic profile, one titration — and a GLP-1-to-amylin ratio that cannot be dialled.",
                  ],
                  [
                    "EloraTZP — one syringe, two molecules",
                    "Selective amylin agonist plus tirzepatide (GIP/GLP-1). Co-formulation keeps each half-life; phase 2b still used two pens. The incretin half is already the dual agonist, not semaglutide.",
                  ],
                ]}
              />
              <P>
                Eloralintide&rsquo;s monotherapy case — 20% at 48 weeks with no GLP-1
                receptor in the molecule — is told in{" "}
                <Link href="/insights/the-note-without-the-incretin" className={LINK}>
                  The note without the incretin
                </Link>
                . This page is the stack: whether that amylin note is worth adding to
                the best incretin Lilly already sells.
              </P>
            </Section>

            <Section title="What phase 3 has to survive">
              <P>
                Lilly says phase 3 of a co-formulated EloraTZP begins in Q4 2026. Until
                those trials enroll, report, and publish, the honest label is a
                conference topline in 367 people.
              </P>
              <Bullets
                items={[
                  [
                    "Tolerability at scale",
                    "A 27% discontinuation arm is not a rounding error. An 'optimised escalation' is a hypothesis, not a result.",
                  ],
                  [
                    "The paper",
                    "Estimands, missing-data handling, which arm hit 27%, and whether the 8.5-point gap survives the primary analysis — none of that is in a press release.",
                  ],
                  [
                    "Co-formulation is not two pens",
                    "Phase 2b mixed two injections. Phase 3 of one product has to show the mixture still behaves when the two peptides share a vial.",
                  ],
                  [
                    "No league table",
                    "23.3% in type 2 diabetes is not a ranking against retatrutide, CagriSema, or amycretin. Different populations, different durations, no shared control.",
                  ],
                ]}
              />
              <Callout label="Until then">
                EloraTZP has shown that stacking a selective amylin agonist on
                tirzepatide can move weight and A1C past tirzepatide 15 mg in type 2
                diabetes. It has not shown that the stack is livable, publishable, or
                better than the other two ways of putting amylin next to an incretin.
              </Callout>
            </Section>

            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">
                Common questions
              </h2>
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
                <CrossLink href="/insights/the-note-without-the-incretin" label="The note without the incretin — eloralintide alone" />
                <CrossLink href="/hormones/eloralintide" label="Eloralintide — the catalog entry" />
                <CrossLink href="/hormones/tirzepatide" label="Tirzepatide — the incretin half" />
                <CrossLink href="/insights/not-two-drugs-in-one" label="Why tirzepatide isn't two drugs in one" />
                <CrossLink href="/insights/the-molecule-that-is-both-halves" label="Amycretin — the unimolecular rival" />
                <CrossLink href="/compare/eloralintide-vs-tirzepatide" label="Eloralintide vs tirzepatide, side by side" />
                <CrossLink href="/insights/glp-3-bull-case" label="The GLP-3 bull case — the other large number" />
                <CrossLink
                  href="/research?q=What%20did%20the%20EloraTZP%20phase%202b%20trial%20show%20versus%20tirzepatide%20alone%3F"
                  label="Ask the research agent about EloraTZP"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not individualized medical advice or a prescription. Where a dose or regimen appears it is reported from its source as research literacy — so you can read the evidence yourself — not an instruction to dose.
              {" "}<StatusNote of={["eloralintide", "eloratzp", "tirzepatide"]} />{" "}
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

function EloraTzpFigure() {
  const W = 520;
  const H = 220;
  const rows: [string, number, string][] = [
    ["Placebo", 3.0, "var(--color-ink)"],
    ["Elora 9 mg", 11.1, "var(--accent)"],
    ["TZP 15 mg", 14.8, "var(--accent-blue)"],
    ["Elora 6 + TZP 10", 19.9, "var(--accent-teal)"],
    ["Elora 9 + TZP 15", 23.3, "var(--accent-teal)"],
  ];
  const max = 26;
  const barH = 22;
  const gap = 12;
  const left = 168;
  const right = 500;
  const top = 16;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Mean percent weight change at 48 weeks in the EloraTZP phase 2b trial in obesity with type 2 diabetes: placebo −3.0%, eloralintide 9 mg −11.1%, tirzepatide 15 mg −14.8%, eloralintide 6 mg plus tirzepatide 10 mg −19.9%, eloralintide 9 mg plus tirzepatide 15 mg −23.3%"
      >
        {rows.map(([label, val, color], i) => {
          const y = top + i * (barH + gap);
          const w = ((right - left) * val) / max;
          return (
            <g key={label}>
              <text
                x={left - 12}
                y={y + barH / 2 + 4}
                textAnchor="end"
                fontSize="11"
                fill="var(--color-ink)"
                fillOpacity="0.55"
                fontFamily="var(--font-space-grotesk), sans-serif"
              >
                {label}
              </text>
              <rect x={left} y={y} width={w} height={barH} rx="4" fill={color} fillOpacity="0.35" />
              <text
                x={left + w + 8}
                y={y + barH / 2 + 4}
                fontSize="12"
                fill="var(--color-ink)"
                fontFamily="var(--font-space-grotesk), sans-serif"
              >
                −{val}%
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Mean percent body-weight change at 48 weeks, EloraTZP phase 2b (Lilly release, EASD 2026). Not a published primary analysis.
      </figcaption>
    </figure>
  );
}
