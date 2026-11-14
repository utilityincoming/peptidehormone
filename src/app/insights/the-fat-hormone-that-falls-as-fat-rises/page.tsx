import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-fat-hormone-that-falls-as-fat-rises")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "What Is Adiponectin? Why It Falls in Obesity, the Adiponectin Paradox, and Why There Is No Adiponectin Drug — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "What Is Adiponectin? The Fat Hormone That Falls as Fat Rises · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  scherer: "https://pubmed.ncbi.nlm.nih.gov/7592907/", // Scherer et al. 1995, J Biol Chem — Acrp30, a serum protein made exclusively in adipocytes
  hu: "https://pubmed.ncbi.nlm.nih.gov/8631877/", // Hu, Liang & Spiegelman 1996, J Biol Chem — AdipoQ, dysregulated in obesity
  maeda: "https://pubmed.ncbi.nlm.nih.gov/8619847/", // Maeda et al. 1996, BBRC — apM1, adipose most abundant gene transcript
  arita: "https://pubmed.ncbi.nlm.nih.gov/10092513/", // Arita et al. 1999, BBRC — paradoxical decrease of adiponectin in obesity
  lindsay: "https://pubmed.ncbi.nlm.nih.gov/12114044/", // Lindsay et al. 2002, Lancet — adiponectin and later type 2 diabetes in the Pima population
  li: "https://pubmed.ncbi.nlm.nih.gov/19584347/", // Li et al. 2009, JAMA — adiponectin and type 2 diabetes risk, meta-analysis
  yamauchi01: "https://pubmed.ncbi.nlm.nih.gov/11479627/", // Yamauchi et al. 2001, Nat Med — adiponectin reverses insulin resistance in mice
  berg: "https://pubmed.ncbi.nlm.nih.gov/11479628/", // Berg et al. 2001, Nat Med — Acrp30 enhances hepatic insulin action
  receptors: "https://pubmed.ncbi.nlm.nih.gov/12802337/", // Yamauchi et al. 2003, Nature — cloning of AdipoR1 and AdipoR2
  kim: "https://pubmed.ncbi.nlm.nih.gov/17717599/", // Kim et al. 2007, J Clin Invest — adiponectin-overexpressing ob/ob mice
  yu: "https://pubmed.ncbi.nlm.nih.gov/12351435/", // Yu et al. 2002, Diabetes — thiazolidinediones raise plasma adiponectin
  review: "https://pubmed.ncbi.nlm.nih.gov/26993047/", // Wang & Scherer 2016, J Mol Cell Biol — adiponectin, the past two decades
  mr: "https://pubmed.ncbi.nlm.nih.gov/23835345/", // Yaghootkar et al. 2013, Diabetes — Mendelian randomization of adiponectin and type 2 diabetes
  kistorp: "https://pubmed.ncbi.nlm.nih.gov/16157772/", // Kistorp et al. 2005, Circulation — adiponectin and mortality in chronic heart failure
  scarale: "https://pubmed.ncbi.nlm.nih.gov/30388239/", // Scarale et al. 2018, JCEM — adiponectin and mortality, meta-analysis
  adiporon: "https://pubmed.ncbi.nlm.nih.gov/24172895/", // Okada-Iwabu et al. 2013, Nature — a small-molecule AdipoR agonist
  antibody: "https://pubmed.ncbi.nlm.nih.gov/37948516/", // Asahara et al. 2023, Sci Adv — an AdipoR-activating monoclonal antibody
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is adiponectin?",
    a: "Adiponectin is a protein hormone made almost exclusively by fat cells. It circulates at unusually high concentrations, in assemblies of three, six or more copies, and in animal studies it makes the liver and muscle more responsive to insulin and shifts fat storage toward fat tissue and away from other organs. Its blood level is one of the most consistent markers of metabolic health.",
  },
  {
    q: "Why does adiponectin go down when body fat goes up?",
    a: "Because its production depends on the condition of fat cells, not their number. Small, well-functioning fat cells secrete a lot of it. As fat tissue expands, becomes inflamed and resistant to insulin, each cell makes less. So more fat tissue ends up producing less adiponectin in total, the reverse of leptin, which rises in step with fat mass.",
  },
  {
    q: "What is the adiponectin paradox?",
    a: "The term is used for two findings. The first is that a hormone made only by fat is lower in people with more fat. The second is that although high adiponectin goes with better metabolic health, in older people and in those with heart failure or kidney disease, higher adiponectin is associated with a higher risk of death. The likely explanation for the second is that illness and weight loss raise adiponectin, so it marks the disease instead of causing harm.",
  },
  {
    q: "Does low adiponectin cause type 2 diabetes?",
    a: "It predicts it, but the genetic evidence does not show that it causes it. Low adiponectin reliably precedes type 2 diabetes in population studies. But a large Mendelian randomization study found that people who inherit gene variants giving them lifelong lower adiponectin are not more insulin resistant or more prone to diabetes. That points to adiponectin being largely a marker of unhealthy fat tissue.",
  },
  {
    q: "Is there an adiponectin drug or supplement?",
    a: "No approved one. Adiponectin itself is a large protein that must be assembled into multi-copy complexes by living cells and would be needed in very large amounts, which makes it impractical to manufacture and inject. Researchers have instead made compounds that activate its receptors, a small molecule called AdipoRon and an antibody, but the published results are in mice. Products sold as raising adiponectin have no comparable evidence.",
  },
  {
    q: "What raises adiponectin naturally?",
    a: "Losing fat raises it, and so do the thiazolidinedione class of diabetes drugs, which roughly doubled adiponectin in one three-month study. Both also improve insulin sensitivity. Whether the rise in adiponectin is responsible for that improvement or simply accompanies it is the unresolved question at the center of this hormone's story.",
  },
];

// Leptin and adiponectin: the two signals from fat, side by side.
const COMPARE: { row: string; leptin: string; adipo: string }[] = [
  { row: "Made by", leptin: "Fat cells", adipo: "Fat cells" },
  { row: "As fat mass rises", leptin: "Rises", adipo: "Falls" },
  { row: "What it reports", leptin: "How much fat is stored", adipo: "How well the fat tissue is working" },
  { row: "Level in blood", leptin: "Low, like most hormones", adipo: "Very high for a hormone" },
  { row: "Human genetics", leptin: "Losing the gene causes severe obesity", adipo: "Low-adiponectin variants do not raise diabetes risk" },
  { row: "As a drug", leptin: "Approved for rare deficiency states", adipo: "Never tested as a therapy in people" },
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(245,181,68,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/adipokines" className="text-accent-amber hover:text-ink">
                Adipokines &amp; energy balance
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
            <Section title="Found four times in two years">
              <P>
                In the mid-1990s, several laboratories went looking for what fat cells
                make, and kept finding the same thing. One group cloned a protein
                secreted only by fat cells and called it Acrp30 (
                <a href={REF.scherer} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Scherer et&nbsp;al., 1995
                </a>
                ). Another found a fat-specific gene and called it AdipoQ (
                <a href={REF.hu} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Hu et&nbsp;al., 1996
                </a>
                ). A third sequenced the messages in human fat tissue and found that
                one outnumbered all the others, so they named it apM1, for adipose most
                abundant gene transcript (
                <a href={REF.maeda} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Maeda et&nbsp;al., 1996
                </a>
                ). A fourth pulled the protein out of blood plasma. It was one
                molecule, and it eventually got one name:{" "}
                <Link href="/hormones/adiponectin" className={LINK}>adiponectin</Link>.
              </P>
              <P>
                Two things about it stood out immediately. Fat tissue was pouring
                effort into making it, and the blood was full of it. Adiponectin
                circulates at concentrations of micrograms per millilitre, far above
                the level of nearly every other hormone in this catalog. Whatever it
                was for, the body treated it as important. Nobody yet knew what it did.
              </P>
            </Section>

            <Section title="The first paradox">
              <P>
                The obvious prediction was simple. A protein made only by fat should be
                higher in people with more fat. That is how{" "}
                <Link href="/hormones/leptin" className={LINK}>leptin</Link> behaves,
                the fat hormone discovered a year earlier: more fat, more leptin, in a
                nearly straight line.
              </P>
              <P>
                When a reliable blood test for adiponectin was finally built, it showed
                the reverse. People with obesity had <Em>less</Em> adiponectin than
                lean people, a result the authors put in the title of their paper as a
                &ldquo;paradoxical decrease&rdquo; (
                <a href={REF.arita} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Arita et&nbsp;al., 1999
                </a>
                ). More of the tissue, less of its product.
              </P>
              <P>
                The low level turned out to mean something. Among Pima adults matched
                for body size, those with lower adiponectin were more likely to develop
                type 2 diabetes later (
                <a href={REF.lindsay} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lindsay et&nbsp;al., Lancet, 2002
                </a>
                ). Across thirteen prospective studies and more than fourteen thousand
                people, the pattern held in every ethnic group examined: the higher the
                adiponectin, the lower the risk of diabetes (
                <a href={REF.li} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Li et&nbsp;al., JAMA, 2009
                </a>
                ). Few blood markers track metabolic health as consistently.
              </P>
              <FatSignals />
            </Section>

            <Section title="The case that it protects">
              <P>
                In mice, adiponectin looked like much more than a marker. Giving it to
                obese, insulin-resistant animals lowered the fat content of their liver
                and muscle and restored their response to insulin (
                <a href={REF.yamauchi01} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Yamauchi et&nbsp;al., 2001
                </a>
                ), and it made the liver more sensitive to insulin&rsquo;s signal to
                stop releasing glucose (
                <a href={REF.berg} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Berg et&nbsp;al., 2001
                </a>
                ). Two years later its receptors were cloned, AdipoR1 and AdipoR2,
                giving the hormone a proper signaling pathway (
                <a href={REF.receptors} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Yamauchi et&nbsp;al., Nature, 2003
                </a>
                ).
              </P>
              <P>
                The most striking experiment took mice that lack leptin, which eat
                without limit and become obese and diabetic, and engineered them to
                make a little extra adiponectin. The animals got even fatter. They were
                also metabolically healthy: normal glucose, normal insulin, less
                inflammation in their fat (
                <a href={REF.kim} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kim et&nbsp;al., 2007
                </a>
                ). The extra fat had gone into fat tissue, where it is stored safely,
                and stayed out of the liver and muscle, where it does damage.
              </P>
              <Callout label="The idea this suggests">
                The harm in obesity may come less from how much fat there is than from
                where it ends up. On this reading adiponectin is the signal that keeps
                fat tissue expanding and accepting storage, so the overflow does not
                land in other organs.
              </Callout>
              <P>
                It also explains the first paradox. Adiponectin output depends on the
                state of fat cells, not their count. Small, healthy, insulin-responsive
                fat cells secrete it freely. Overfilled, inflamed ones make less (
                <a href={REF.review} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wang &amp; Scherer, 2016
                </a>
                ). Leptin reports how much fat is stored. Adiponectin reports how well
                the storage is working.
              </P>
            </Section>

            <Section title="Marker or cause?">
              <P>
                So low adiponectin predicts diabetes in people, and adding adiponectin
                fixes insulin resistance in mice. It is tempting to join those two
                facts and conclude that low adiponectin causes diabetes in people.
                There is a way to test that, and the test did not support it.
              </P>
              <P>
                Some people inherit variants of the adiponectin gene that give them
                lower levels for life. If adiponectin protects against diabetes, those
                people should be more insulin resistant and get more diabetes. A study
                pooling genetic data from tens of thousands of people looked for
                exactly that. In ordinary observational analysis, lower adiponectin
                went with worse insulin sensitivity, as expected. But the genetic
                variants that lower adiponectin did not carry the predicted increase in
                insulin resistance or diabetes. The authors concluded their data did
                not support a causal role (
                <a href={REF.mr} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Yaghootkar et&nbsp;al., 2013
                </a>
                ).
              </P>
              <P>
                That leaves the simplest reading of the human data: unhealthy fat
                tissue causes both things, low adiponectin and diabetes, and the two
                travel together without one producing the other. The mouse experiments
                are real, but they add far more adiponectin than a gene variant takes
                away, and a mouse is not a person. This is the gap described in{" "}
                <Link href="/insights/mechanism-is-not-proof" className={LINK}>
                  mechanism is not proof
                </Link>
                , in an unusually clean form.
              </P>
              <P>
                The drug evidence has the same ambiguity. The thiazolidinediones, a
                class of diabetes drugs that act on fat cells, raise adiponectin
                sharply. In one study three months of treatment roughly doubled it,
                alongside improved insulin sensitivity (
                <a href={REF.yu} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Yu et&nbsp;al., 2002
                </a>
                ). But those drugs remodel fat tissue in many ways at once. The rise in
                adiponectin may be how they work or may just be a sign that the fat is
                healthier.
              </P>
            </Section>

            <Section title="The second paradox">
              <P>
                If high adiponectin marks good metabolic health, people with high
                levels should live longer. In some groups the opposite is seen. Among
                195 patients with chronic heart failure, those with higher adiponectin
                were about three times as likely to die over the following years as
                those in the lowest third (
                <a href={REF.kistorp} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kistorp et&nbsp;al., 2005
                </a>
                ). A later analysis pooling 55 studies found the same direction across
                the board: each step up in adiponectin went with a higher death rate (
                <a href={REF.scarale} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Scarale et&nbsp;al., 2018
                </a>
                ).
              </P>
              <P>
                The explanation again seems to be that adiponectin is reporting on
                something else. Illness and wasting raise it. So do the natriuretic
                peptides that{" "}
                <Link href="/insights/the-heart-is-a-gland" className={LINK}>
                  a failing heart releases
                </Link>
                , and when the pooled analysis accounted for those, a good part of the
                association went away. A sick, thin, older person has high adiponectin
                for the same reason a lean, healthy young one does, which is that there
                is little overfilled fat. The number is the same and the meaning is
                different.
              </P>
              <Callout label="Reading the number">
                Adiponectin is a faithful marker with a context problem. High is good
                news in a healthy forty-year-old and a warning sign in an
                eighty-year-old with heart failure. A blood level on its own does not
                say which.
              </Callout>
            </Section>

            <Section title="Why there is no adiponectin drug">
              <P>
                Even setting the causality question aside, adiponectin is a hard
                molecule to turn into a medicine, for reasons that say something about
                the limits of the peptide playbook.
              </P>
              <P>
                Most hormones in this catalog are short chains that a machine can
                build. Adiponectin is a full-sized protein that cells chemically modify
                and then assemble into groups of three, six, or a dozen and more, and
                the largest assemblies appear to be the most active (
                <a href={REF.review} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wang &amp; Scherer, 2016
                </a>
                ). That assembly needs living mammalian cells and is hard to control.
                And because the natural level in blood is so high, a replacement dose
                would be enormous compared with any hormone given today. It sits at the
                far end of{" "}
                <Link href="/insights/the-complexity-ladder" className={LINK}>
                  the complexity ladder
                </Link>
                .
              </P>
              <P>
                So the field went around the protein and aimed at its receptors. A
                small molecule taken by mouth, AdipoRon, activated both adiponectin
                receptors and improved insulin resistance in obese mice (
                <a href={REF.adiporon} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Okada-Iwabu et&nbsp;al., Nature, 2013
                </a>
                ). A decade later the same group reported an antibody that switches the
                receptors on and might be dosed monthly (
                <a href={REF.antibody} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Asahara et&nbsp;al., 2023
                </a>
                ). Both results are in mice. No adiponectin-based therapy has been
                shown to help people, and given the genetic evidence, it is an open
                question whether one would.
              </P>
            </Section>

            <Section title="What the hormone is telling us">
              <P>
                Adiponectin is one of the best-studied hormones never to become a drug.
                Its story is a useful counterweight to the rest of this catalog, where
                the usual arc runs from mechanism to molecule to trial.
              </P>
              <Bullets
                items={[
                  ["Made by fat, lower with more fat", "Adiponectin comes almost entirely from fat cells and circulates at very high levels, yet it falls as fat mass rises. Its output tracks the health of fat tissue, not its amount."],
                  ["A strong predictor", "Low adiponectin precedes type 2 diabetes across populations. In mice, adding it reverses insulin resistance and steers fat into safe storage."],
                  ["Probably not the cause", "People who inherit lower adiponectin are not more prone to diabetes. In humans it looks more like a readout of unhealthy fat than a driver of disease."],
                  ["High is not always good", "In heart failure and old age, higher adiponectin goes with higher mortality, because illness and wasting raise it too."],
                  ["No drug, for two reasons", "The protein is too large, complex and abundant to replace, and receptor activators have only been shown to work in mice."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/adiponectin" label="Adiponectin reference (receptors, multimers, mechanism)" />
                <CrossLink href="/insights/the-hormone-discovered-twice" label="The hormone discovered twice — leptin, the other signal from fat" />
                <CrossLink href="/insights/mechanism-is-not-proof" label="Mechanism is not proof — the evidence ladder this story tests" />
                <CrossLink href="/insights/the-heart-is-a-gland" label="The heart is a gland — the natriuretic peptides behind the second paradox" />
                <CrossLink href="/families/adipokines" label="The adipokines & energy balance family" />
                <CrossLink href="/research?q=Why%20does%20adiponectin%20fall%20in%20obesity%2C%20and%20what%20does%20Mendelian%20randomization%20say%20about%20whether%20low%20adiponectin%20causes%20type%202%20diabetes%3F" label="Ask the research agent about adiponectin" />
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

/* ── The two signals from fat, side by side ── */
function FatSignals() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[13px] leading-5">
          <caption className="sr-only">
            Leptin and adiponectin compared: both are made by fat cells, but they respond in opposite directions as fat mass rises and report different things.
          </caption>
          <thead>
            <tr className="border-b border-ink/10 font-mono text-[11px] uppercase tracking-wide text-ink/45">
              <th scope="col" className="px-4 py-3 font-normal"><span className="sr-only">Property</span></th>
              <th scope="col" className="px-4 py-3 font-normal">Leptin</th>
              <th scope="col" className="px-4 py-3 font-normal text-accent-amber">Adiponectin</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((c) => (
              <tr key={c.row} className="border-b border-ink/[0.06] align-top last:border-0">
                <th scope="row" className="px-4 py-3 font-semibold text-ink">{c.row}</th>
                <td className="px-4 py-3 text-ink/65">{c.leptin}</td>
                <td className="px-4 py-3 text-ink/80">{c.adipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="border-t border-ink/[0.06] px-4 py-3 text-center text-xs text-ink/40">
        Two hormones from the same cell, moving in opposite directions. Leptin measures
        the size of the fat store; adiponectin tracks its condition.
      </figcaption>
    </figure>
  );
}
