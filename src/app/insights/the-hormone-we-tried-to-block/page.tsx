import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-hormone-we-tried-to-block")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "What Does Glucagon Do? From Diabetes Villain to Weight-Loss Drug Target (Retatrutide, Survodutide) — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "What Does Glucagon Do? The Hormone Medicine Tried to Block · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  lefebvre: "https://pubmed.ncbi.nlm.nih.gov/21824250/", // Lefèbvre 2011, Diabetes Obes Metab — early milestones in glucagon research
  sutherland: "https://pubmed.ncbi.nlm.nih.gov/18880761/", // Sutherland & de Duve 1948, J Biol Chem — origin of the hyperglycemic-glycogenolytic factor
  unger: "https://pubmed.ncbi.nlm.nih.gov/46337/", // Unger & Orci 1975, Lancet — the essential role of glucagon in diabetes
  gelling: "https://pubmed.ncbi.nlm.nih.gov/12552113/", // Gelling et al. 2003, PNAS — glucagon receptor knockout mice
  lee: "https://pubmed.ncbi.nlm.nih.gov/21270251/", // Lee et al. 2011, Diabetes — glucagon receptor knockout prevents insulin-deficient diabetes in mice
  kazda: "https://pubmed.ncbi.nlm.nih.gov/26681715/", // Kazda et al. 2016, Diabetes Care — glucagon receptor antagonist LY2409021, phase 2
  guzman: "https://pubmed.ncbi.nlm.nih.gov/28371155/", // Guzman et al. 2017, Diabetes Obes Metab — LY2409021 increases liver fat
  solloway: "https://pubmed.ncbi.nlm.nih.gov/26166562/", // Solloway et al. 2015, Cell Rep — glucagon couples hepatic amino acid catabolism to alpha-cell mass
  nair: "https://pubmed.ncbi.nlm.nih.gov/2881943/", // Nair 1987, JCEM — hyperglucagonemia increases resting metabolic rate
  salem: "https://pubmed.ncbi.nlm.nih.gov/26434748/", // Salem et al. 2016, Diabetes Obes Metab — glucagon increases energy expenditure in humans
  capozzi: "https://pubmed.ncbi.nlm.nih.gov/31335319/", // Capozzi et al. 2019, JCI Insight — glucagon lowers glycemia when beta cells are active
  svendsen: "https://pubmed.ncbi.nlm.nih.gov/30380405/", // Svendsen et al. 2018, Cell Rep — insulin secretion depends on intra-islet glucagon signaling
  cohen: "https://pubmed.ncbi.nlm.nih.gov/14557443/", // Cohen et al. 2003, JCEM — oxyntomodulin reduces food intake in humans
  wynne: "https://pubmed.ncbi.nlm.nih.gov/16046306/", // Wynne et al. 2005, Diabetes — oxyntomodulin reduces body weight in overweight subjects
  day: "https://pubmed.ncbi.nlm.nih.gov/19597507/", // Day et al. 2009, Nat Chem Biol — glucagon/GLP-1 co-agonist eliminates obesity in rodents
  pocai: "https://pubmed.ncbi.nlm.nih.gov/19602537/", // Pocai et al. 2009, Diabetes — GLP-1/glucagon dual agonism reverses obesity in mice
  survodutide: "https://pubmed.ncbi.nlm.nih.gov/38847460/", // Sanyal et al. 2024, NEJM — survodutide phase 2 in MASH and fibrosis
  triumph: "https://pubmed.ncbi.nlm.nih.gov/42814954/", // Jastreboff et al. 2026, NEJM — retatrutide phase 3 in obesity (TRIUMPH-1)
  nasal: "https://pubmed.ncbi.nlm.nih.gov/26681725/", // Rickels et al. 2016, Diabetes Care — intranasal glucagon for insulin-induced hypoglycemia
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What does glucagon do?",
    a: "Glucagon is a 29-amino-acid hormone made by the alpha cells of the pancreas. Its best-known action is to raise blood glucose by telling the liver to release stored glucose and make new glucose, which is why it is the emergency treatment for severe low blood sugar. It also drives the liver to break down amino acids and burn fat, raises the body's energy expenditure, and in the fed state can stimulate insulin release.",
  },
  {
    q: "Is glucagon the opposite of insulin?",
    a: "Only partly. During fasting or low blood sugar, glucagon raises glucose while insulin would lower it, so the two oppose each other. But after a mixed meal both hormones rise together, and glucagon acts on the neighboring beta cells to boost insulin secretion. In mouse studies, glucagon given in the fed state lowered blood glucose. It is better described as insulin's partner in handling nutrients than as its mirror image.",
  },
  {
    q: "Why did glucagon blockers fail as diabetes drugs?",
    a: "They lowered blood sugar as intended, but blocking the receptor also stopped glucagon's other work in the liver. In a six-month trial of the glucagon receptor antagonist LY2409021, people with type 2 diabetes had better glucose control but more liver fat, higher liver enzymes, higher blood pressure, more body weight and higher cholesterol than those on placebo. The effects reversed on stopping the drug, but they ended the approach.",
  },
  {
    q: "Why add a hormone that raises blood sugar to a weight-loss drug?",
    a: "Because glucagon also increases energy expenditure and pushes the liver to burn fat, and the blood-sugar rise can be offset by pairing it with GLP-1 activity, which increases insulin release and reduces appetite. Dual and triple agonists such as survodutide and retatrutide are built on that trade: GLP-1 holds glucose down while the glucagon component adds calorie burning and liver-fat reduction.",
  },
  {
    q: "How much of retatrutide's effect comes from glucagon?",
    a: "That cannot be read from the trials. Retatrutide activates three receptors at once (GIP, GLP-1 and glucagon), and its phase 3 obesity trial compared the whole molecule with placebo, not with a version lacking the glucagon component. On the treatment-regimen analysis, weight fell 25.0% at the highest dose over 80 weeks against 3.9% on placebo. How much of that is owed to glucagon specifically is an inference from mechanism, not a measured result.",
  },
  {
    q: "Is glucagon itself used as a medicine?",
    a: "Yes, as a rescue drug. Injected or nasal glucagon is used to treat severe hypoglycemia in people with diabetes who cannot safely swallow sugar. A nasal powder that needs no mixing performed comparably to the traditional injection in a randomized crossover trial. It is also used in radiology to briefly relax the gut.",
  },
];

// The mirror: what happened when the receptor was blocked vs. activated alongside GLP-1.
const MIRROR: { row: string; block: string; activate: string }[] = [
  { row: "Blood glucose", block: "Lower", activate: "Held down by the GLP-1 component" },
  { row: "Liver fat", block: "Higher", activate: "Lower" },
  { row: "Body weight", block: "Higher", activate: "Lower" },
  { row: "Outcome", block: "Programs stopped", activate: "Phase 3 and beyond" },
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
            <Section title="Born as a contaminant">
              <P>
                <Link href="/hormones/glucagon" className={LINK}>Glucagon</Link> entered
                medicine as a nuisance. The first insulin extracts of the early 1920s
                had an annoying habit: before blood sugar fell, it briefly went{" "}
                <Em>up</Em>. In 1923 Charles Kimball and John Murlin traced the rise to
                a second substance in the pancreatic extract and named it for what it
                did, the glucose agonist, glucagon (
                <a href={REF.lefebvre} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lef&egrave;bvre, 2011
                </a>
                ). For the next quarter-century it was treated mainly as something to
                purify out of{" "}
                <Link href="/hormones/insulin" className={LINK}>insulin</Link>. Only in
                1948 was it pinned to its source, the alpha cells of the pancreatic
                islets (
                <a href={REF.sutherland} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sutherland &amp; de&nbsp;Duve, 1948
                </a>
                ).
              </P>
              <P>
                So from its first day glucagon was defined against insulin: the
                impurity that did the opposite. That framing lasted a hundred years,
                shaped a generation of drug programs, and turned out to be about half
                right.
              </P>
            </Section>

            <Section title="The case for the prosecution">
              <P>
                Once glucagon could be measured in blood, the opposition looked like
                more than a curiosity. People with diabetes did not just lack insulin
                action. They had too much glucagon, and it stayed high after meals when
                it should have fallen. In 1975 Roger Unger and Lelio Orci made the
                argument explicit: diabetes is a disease of two hormones, and the high
                blood sugar comes largely from glucagon driving the liver to pour out
                glucose that insulin can no longer restrain (
                <a href={REF.unger} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Unger &amp; Orci, Lancet, 1975
                </a>
                ).
              </P>
              <P>
                The genetics seemed to agree. Mice engineered without the glucagon
                receptor had lower blood glucose than normal (
                <a href={REF.gelling} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Gelling et&nbsp;al., 2003
                </a>
                ). More dramatically, when Unger&rsquo;s group destroyed the
                insulin-producing cells of such mice, the animals did not develop
                diabetes at all. No insulin, no glucagon signal, and blood sugar stayed
                normal (
                <a href={REF.lee} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lee et&nbsp;al., 2011
                </a>
                ). The conclusion wrote itself. Block the glucagon receptor and you
                have a diabetes drug.
              </P>
            </Section>

            <Section title="The blockers worked, and that was the problem">
              <P>
                Several companies made glucagon receptor antagonists, and on the
                measure they were designed for, they delivered. In phase 2, the oral
                antagonist LY2409021 lowered blood glucose and HbA1c in people with
                type 2 diabetes over 12 and 24 weeks (
                <a href={REF.kazda} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kazda et&nbsp;al., 2016
                </a>
                ).
              </P>
              <P>
                Then a six-month study looked at the liver directly, by MRI. Compared
                with placebo, people on the antagonist ended with about 4.4 percentage
                points more fat in their livers. Their liver enzymes rose. So did their
                systolic blood pressure, by about 4 mmHg, along with body weight and
                total cholesterol (
                <a href={REF.guzman} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Guzman et&nbsp;al., 2017
                </a>
                ). Everything reversed when the drug was stopped, but a diabetes pill
                that fattens the liver and raises blood pressure and weight is treating
                the number while worsening the patient. The approach did not survive.
              </P>
              <P>
                The mouse had been warning about this all along. The same knockout
                animals with the enviable blood sugar also had swollen islets packed
                with extra alpha cells and enormous levels of circulating glucagon (
                <a href={REF.gelling} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Gelling et&nbsp;al., 2003
                </a>
                ). Something in the body was pushing hard against the loss of the
                signal. That is rarely a sign the signal was unimportant.
              </P>
            </Section>

            <Section title="What glucagon was doing all along">
              <P>
                The explanation is that raising blood sugar is one part of
                glucagon&rsquo;s job. Its real brief is to tell the liver what to do
                with fuel when food is not coming in, and that brief has at least three
                other lines.
              </P>
              <P>
                <Em>It clears amino acids.</Em> Glucagon drives the liver to break down
                amino acids, and amino acids in turn stimulate the alpha cell. It is a
                feedback loop between the two organs. Block the glucagon receptor and
                the liver stops clearing amino acids, their blood levels climb, and the
                excess drives alpha cells to multiply, which is exactly the islet
                overgrowth seen in the knockout mice (
                <a href={REF.solloway} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Solloway et&nbsp;al., 2015
                </a>
                ). After a steak, with no carbohydrate in sight, glucagon rises so the
                liver can process the protein without blood sugar falling.
              </P>
              <P>
                <Em>It burns fat in the liver.</Em> The same signal that releases
                glucose also shifts the liver toward oxidizing fat. Take the signal
                away and fat accumulates, which is what the MRI scans showed.
              </P>
              <P>
                <Em>It raises energy expenditure.</Em> This had been on record since
                the 1980s, when raising glucagon in insulin-deficient volunteers
                increased their resting metabolic rate (
                <a href={REF.nair} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Nair, 1987
                </a>
                ). A later study measured it cleanly: a glucagon infusion raised energy
                expenditure by 15% in healthy men, about as much as cold exposure did,
                and without recruiting brown fat to do it (
                <a href={REF.salem} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Salem et&nbsp;al., 2016
                </a>
                ).
              </P>
              <P>
                Even the opposition to insulin turned out to be conditional. After a
                mixed meal, glucagon and insulin rise together, and glucagon acts on
                the neighboring beta cells to <Em>increase</Em> insulin release (
                <a href={REF.svendsen} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Svendsen et&nbsp;al., 2018
                </a>
                ). In fed mice, giving glucagon lowered blood glucose, an effect that
                vanished when the beta cells could not sense it (
                <a href={REF.capozzi} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Capozzi et&nbsp;al., 2019
                </a>
                ). Those are animal data, but they are hard to square with a hormone
                whose only purpose is to undo insulin.
              </P>
              <Callout label="The reframe">
                Glucagon is not the anti-insulin. It is the liver&rsquo;s fasting
                instruction: release glucose, clear amino acids, burn fat, spend
                energy. Blocking the receptor silenced all four lines to mute one.
              </Callout>
            </Section>

            <Section title="The turn: use it instead">
              <P>
                If glucagon burns fat and raises energy expenditure, the question flips.
                Could you <Em>use</Em> it, and deal with the blood sugar some other way?
              </P>
              <P>
                Nature had already run the experiment. The gut makes a hormone called
                oxyntomodulin, cut from the same precursor as glucagon and{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link>, that
                activates both of their receptors at once. Given to people, it reduced
                food intake (
                <a href={REF.cohen} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Cohen et&nbsp;al., 2003
                </a>
                ) and, over four weeks of injections, body weight (
                <a href={REF.wynne} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wynne et&nbsp;al., 2005
                </a>
                ). GLP-1 activity supplies exactly what glucagon lacks: it raises
                insulin when glucose is high and suppresses appetite. Put the two in
                one molecule and each covers the other&rsquo;s weakness.
              </P>
              <P>
                In 2009 two groups published engineered versions of that idea within
                weeks of each other, single peptides that hit both receptors and
                reversed obesity in mice more effectively than GLP-1 activity alone (
                <a href={REF.day} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Day et&nbsp;al., 2009
                </a>
                ;{" "}
                <a href={REF.pocai} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Pocai et&nbsp;al., 2009
                </a>
                ). The hormone that programs had spent years trying to block was now
                being designed in.
              </P>
              <MirrorTable />
            </Section>

            <Section title="Where that leaves the evidence">
              <P>
                Two of those designs are now far along.{" "}
                <Link href="/hormones/survodutide" className={LINK}>Survodutide</Link>,
                a glucagon and GLP-1 dual agonist, improved liver disease in a phase 2
                trial in people with MASH and fibrosis (
                <a href={REF.survodutide} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sanyal et&nbsp;al., NEJM, 2024
                </a>
                ), the liver being exactly where a glucagon component should show
                itself; that case is made in{" "}
                <Link href="/insights/the-arm-that-points-at-the-liver" className={LINK}>
                  the arm that points at the liver
                </Link>
                .{" "}
                <Link href="/hormones/retatrutide" className={LINK}>Retatrutide</Link>{" "}
                adds a third receptor, GIP. In its phase 3 obesity trial, 2,339 adults
                without diabetes were followed for 80 weeks, and mean body weight fell
                by 25.0% on the highest dose against 3.9% on placebo, on the
                treatment-regimen analysis that counts everyone randomized (
                <a href={REF.triumph} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jastreboff et&nbsp;al., NEJM, 2026
                </a>
                ). The design logic is laid out in{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>
                  the triple agonist explained
                </Link>
                .
              </P>
              <P>
                It is worth being exact about what those results do and do not show.
                They show that molecules containing glucagon activity can be given for
                over a year, at scale, with large weight loss and without the blood
                sugar problem the old framing predicted. They do not isolate
                glucagon&rsquo;s share. No arm of these trials tested the same molecule
                with the glucagon component removed, so the claim that glucagon is what
                pushes these drugs past their predecessors rests on mechanism and on
                comparisons across different trials. That is the bottom of{" "}
                <Link href="/insights/mechanism-is-not-proof" className={LINK}>
                  the evidence ladder
                </Link>
                , however good the story.
              </P>
              <P>
                The costs of the glucagon component are also still being counted.
                Glucagon speeds the heart, and it breaks down amino acids, which raises
                a fair question about lean mass during rapid weight loss, a concern
                taken up in{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>
                  muscle loss on GLP-1 drugs
                </Link>
                . Meanwhile the hormone&rsquo;s oldest job has not gone anywhere. As a
                rescue for severe low blood sugar, glucagon is now available as a nasal
                powder that needs no mixing and worked about as well as the injection
                in a head-to-head crossover trial (
                <a href={REF.nasal} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Rickels et&nbsp;al., 2016
                </a>
                ).
              </P>
            </Section>

            <Section title="A hundred years to read one hormone">
              <P>
                Glucagon was discovered as the thing in the vial that worked against
                insulin, and for most of a century it was understood that way. The
                framing was strong enough to launch drugs, and the drugs were good
                enough to show the framing was incomplete.
              </P>
              <Bullets
                items={[
                  ["Found as an impurity", "Glucagon was identified in 1923 as the contaminant in insulin extracts that briefly raised blood sugar, and defined from then on as insulin's opposite."],
                  ["Blamed for diabetes", "People with diabetes have too much glucagon, and mice without its receptor resist diabetes. That made blocking the receptor an obvious drug strategy."],
                  ["The blockers lowered glucose and raised liver fat", "A glucagon receptor antagonist improved blood sugar but increased liver fat, liver enzymes, blood pressure, weight and cholesterol. The approach was dropped."],
                  ["It was doing four jobs", "Glucagon releases glucose, clears amino acids, burns liver fat and raises energy expenditure. In the fed state it also boosts insulin release."],
                  ["Now it is designed in", "Paired with GLP-1 activity to hold glucose down, glucagon agonism is part of survodutide and retatrutide. The trials show the combinations work; they do not yet isolate glucagon's contribution."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/glucagon" label="Glucagon reference (receptor, source, mechanism)" />
                <CrossLink href="/insights/the-triple-agonist" label="What is retatrutide? The triple agonist explained" />
                <CrossLink href="/insights/the-arm-that-points-at-the-liver" label="The arm that points at the liver — survodutide and MASH" />
                <CrossLink href="/insights/insulin-to-the-peptide-boom" label="From insulin to the peptide boom — the century this story sits in" />
                <CrossLink href="/insights/is-there-a-glp-4" label="Is there a GLP-4? — the proglucagon family tree" />
                <CrossLink href="/insights/glp-3-bull-case" label="The GLP-3 bull case — glucagon as the third axis" />
                <CrossLink href="/research?q=Why%20did%20glucagon%20receptor%20antagonists%20increase%20liver%20fat%2C%20and%20what%20does%20glucagon%20agonism%20add%20to%20retatrutide%20and%20survodutide%3F" label="Ask the research agent about glucagon" />
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

/* ── The mirror: blocking the glucagon receptor vs. activating it alongside GLP-1 ── */
function MirrorTable() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[13px] leading-5">
          <caption className="sr-only">
            What was observed when the glucagon receptor was blocked, compared with when it was activated together with the GLP-1 receptor.
          </caption>
          <thead>
            <tr className="border-b border-ink/10 font-mono text-[11px] uppercase tracking-wide text-ink/45">
              <th scope="col" className="px-4 py-3 font-normal"><span className="sr-only">Measure</span></th>
              <th scope="col" className="px-4 py-3 font-normal">Block the receptor</th>
              <th scope="col" className="px-4 py-3 font-normal text-accent">Activate it, with GLP-1</th>
            </tr>
          </thead>
          <tbody>
            {MIRROR.map((m) => (
              <tr key={m.row} className="border-b border-ink/[0.06] align-top last:border-0">
                <th scope="row" className="px-4 py-3 font-semibold text-ink">{m.row}</th>
                <td className="px-4 py-3 text-ink/65">{m.block}</td>
                <td className="px-4 py-3 text-ink/80">{m.activate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="border-t border-ink/[0.06] px-4 py-3 text-center text-xs text-ink/40">
        Antagonist column: LY2409021 in type 2 diabetes and receptor-knockout mice. Agonist
        column: dual and triple agonist trials, where the effect of the glucagon component
        is inferred from the whole molecule.
      </figcaption>
    </figure>
  );
}
