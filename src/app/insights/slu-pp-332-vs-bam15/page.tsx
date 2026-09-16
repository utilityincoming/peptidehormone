import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("slu-pp-332-vs-bam15")!;
const description = "SLU-PP-332 vs BAM15: ERR agonism, mitochondrial uncoupling, mouse results, missing human evidence, and why an untested stack is not exercise in a pill.";
export const metadata: Metadata = {
  title: "SLU-PP-332 vs BAM15: mechanisms, evidence and safety",
  description,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: insight.title, description },
};
const REF = {
  exercise: "https://pubmed.ncbi.nlm.nih.gov/36988910/",
  metabolic: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10801787/",
  bam15: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7224297/",
  hu6liver: "https://pubmed.ncbi.nlm.nih.gov/37806314/",
  hu6heart: "https://pubmed.ncbi.nlm.nih.gov/40072462/",
};
const FAQS = [
  { q: "What is the difference between SLU-PP-332 and BAM15?", a: "SLU-PP-332 activates estrogen-related receptors, changing an exercise-associated gene program. BAM15 is a mitochondrial protonophore that reduces the coupling of fuel oxidation to ATP production. Both can increase fuel use in experimental systems, but they do so through different mechanisms." },
  { q: "Are SLU-PP-332 and BAM15 peptides?", a: "No. Both are synthetic small molecules, not amino-acid-chain peptides. They are covered here as a comparison with mitochondrial peptide biology, not as members of the mitochondrial-derived peptide family." },
  { q: "Have SLU-PP-332 or BAM15 been tested in human clinical trials?", a: "Our September 15, 2026 literature and ClinicalTrials.gov searches identified no published human intervention studies or registered trials for these exact names, including BAM-15. This does not exclude unpublished work or trials under other identifiers. Human trials of HU6 concern a different compound and cannot establish BAM15 safety." },
  { q: "Can SLU-PP-332 replace exercise?", a: "It induced an exercise-associated gene program and improved endurance in mice. Those results do not establish human exercise replacement. Selected metabolic or endurance outcomes are not evidence that a drug reproduces the full effects of training." },
  { q: "Is BAM15 a safe version of DNP?", a: "That description goes beyond the evidence. BAM15 is structurally different from DNP and showed encouraging tolerability in mouse experiments, including no detected rise in body temperature under the tested conditions. A human therapeutic window and long-term safety have not been established." },
  { q: "Can you stack SLU-PP-332 with BAM15?", a: "No controlled evidence validating the combination was identified in this review. Different mechanisms do not demonstrate synergy, compatibility, or safety. There is no evidence-based human stack, dose, or timing schedule to recommend." },
];
function Cite({ source, children }: { source: keyof typeof REF; children: React.ReactNode }) {
  return <a href={REF[source]} target="_blank" rel="noopener noreferrer" className={LINK}>{children}</a>;
}

export default function Article() {
  return <>
    <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
    <SiteHeader />
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <section className="relative overflow-hidden border-b border-ink/[0.06]">
        <Container className="relative max-w-3xl py-16 md:py-20">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
            <Link href="/insights" className="hover:text-ink">Insights</Link><span aria-hidden>/</span>
            <Link href="/families/mitochondrial" className="text-accent-blue hover:text-ink">Mitochondrial biology · adjacent mechanisms</Link>
          </nav>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">{insight.title}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">{insight.dek}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink/40">{insight.readingMinutes} min read · reviewed September 15, 2026</p>
        </Container>
      </section>
      <Container className="max-w-3xl py-14 md:py-18">
        <article className="space-y-12">
          <Callout label="Evidence grade: preclinical for both compounds">
            Real mechanisms. Meaningful animal results. No published human intervention evidence identified for either exact compound. Human uncoupler trials discussed below used HU6, not BAM15. Neither compound is a peptide.
          </Callout>
          <Section title="The shortcut has two different engines">
            <P>The phrase &ldquo;exercise in a pill&rdquo; makes two promises sound like one: spend more energy, and become a fitter organism. SLU-PP-332 and BAM15 are interesting precisely because they force those promises apart. One changes the instructions the cell reads. The other changes how efficiently the mitochondrion turns fuel into usable energy.</P>
            <P>These are not imaginary effects built entirely from testimonials. SLU-PP-332 has mouse endurance data, not just a colorful pathway diagram. BAM15 has mouse body-composition and insulin-sensitivity results, not just a test tube consuming oxygen. The mistake is not taking the science seriously. It is treating the next steps in drug development as if they have already happened.</P>
            <P>They belong beside this site&rsquo;s <Link href="/families/mitochondrial" className={LINK}>mitochondrial peptide coverage</Link>{" "}as a contrast, not a classification. Neither is a peptide hormone or a mitochondrial-derived peptide. A shared destination in energy metabolism does not make small molecules, endogenous signals, and membrane-targeting peptides interchangeable.</P>
          </Section>
          <Section title="SLU-PP-332: change the program">
            <P>SLU-PP-332 is a synthetic agonist of the estrogen-related receptors ERRα, ERRβ, and ERRγ, with the greatest potency at ERRα in the reported assays. These are nuclear receptors involved in regulating metabolic gene expression. The name is misleading if you read it as estrogen therapy: estrogen-related receptors are not the classical estrogen receptors and do not share their estrogen-binding behavior. The <Cite source="metabolic">Billon metabolic study</Cite>{" "}explains that distinction.</P>
            <P>The attractive idea is to activate part of the transcriptional machinery recruited by aerobic exercise: genes involved in oxidative metabolism and the capacity to use fuel. In <Cite source="exercise">Billon and colleagues&rsquo; 2023 ACS Chemical Biology paper</Cite>, SLU-PP-332 increased oxidative muscle fibers and enhanced endurance in mice. ERRα was necessary for the reported endurance effect. That is stronger evidence than saying a compound merely &ldquo;supports mitochondria.&rdquo;</P>
            <P>But the demonstrated claim is specific: pharmacological activation produced an exercise-associated program and selected functional effects in mice. It did not establish that a human taking the compound gains the integrated adaptations of training, or that more receptor activation is always better. A pathway can participate in exercise without containing everything exercise does.</P>
            <Callout label="A useful distinction">An exercise mimetic reproduces selected features of an exercise response. An exercise replacement would have to reproduce the outcomes that matter across the person. The first description is a research result; the second remains a much larger claim.</Callout>
          </Section>
          <Section title="The metabolic paper is less tidy than the headline">
            <P>The follow-up <Cite source="metabolic">metabolic-syndrome paper, published online in 2023 and in the February 2024 journal issue</Cite>, reported increased energy expenditure and fatty-acid oxidation, with reduced fat accumulation and beneficial metabolic changes in mouse obesity models. The appetite-independent angle is part of what makes the work worth following.</P>
            <P>Read past the abstract, though. Chow-fed mice did not show improved glucose metabolism. In diet-induced obesity, the investigators acknowledged conflicting insulin-sensitivity findings: favorable fasting measures did not come with an improvement in the insulin-tolerance test. The discussion also notes that ERRα deletion and some inverse agonists have produced favorable metabolic phenotypes in other experiments. &ldquo;Turn ERR up, fix metabolism&rdquo; is not a universal rule.</P>
            <P>The experiments used small groups of male mice over short periods. Less fat gained in one model and reversal of existing obesity in another are different outcomes. Neither tells us what happens in a trained human, across years of exposure, or alongside other metabolic drugs. These limitations do not erase the positive results. They define what the next study must resolve.</P>
          </Section>
          <Section title="BAM15: change the energy accounting">
            <P>Mitochondria use fuel oxidation to build a proton gradient across their inner membrane. ATP synthase uses that gradient to make ATP, the cell&rsquo;s immediately usable energy currency. A protonophore provides another route for protons to cross the membrane. Some of the energy that could support ATP synthesis is dissipated instead, so maintaining ATP production can require more fuel oxidation.</P>
            <P>That is mitochondrial uncoupling. BAM15 is a synthetic small-molecule protonophore, not an ERR agonist. In plain language: SLU-PP-332 changes part of the metabolic program; BAM15 makes energy conversion less tightly coupled. Calling both &ldquo;mitochondrial boosters&rdquo; hides the most important difference.</P>
            <P>In <Cite source="bam15">Alexopoulos and colleagues&rsquo; 2020 Nature Communications study</Cite>, BAM15 reduced adiposity in mice without reducing food intake or lean mass under the tested conditions. Liver fat improved, and hyperinsulinemic-euglycemic clamp experiments supported improved insulin sensitivity in multiple tissues. Those clamp measurements are a substantive physiological result, not a marketing synonym for feeling more energetic.</P>
            <P>The same paper reported no detected increase in body temperature or adverse changes in selected blood markers under its experimental conditions. That is encouraging preclinical tolerability. It is not a demonstrated human therapeutic window, and it does not mean arbitrarily high exposure is harmless. Solubility and formulation constrained the upper-exposure experiments; transient lethargy at the upper end could not be clearly separated from the thick preparation used for administration.</P>
          </Section>
          <MechanismTable />
          <Section title="BAM15 is not DNP. That does not make it proven safe.">
            <P>DNP, or 2,4-dinitrophenol, is the historical warning attached to uncoupling: a drug can increase energy expenditure and still have a dangerously narrow separation between desired and toxic effects. The <Cite source="bam15">BAM15 paper</Cite>{" "}explicitly addresses that drug-development problem and describes BAM15 as structurally unrelated to DNP.</P>
            <P>Two easy conclusions are wrong. &ldquo;All uncouplers are exactly DNP&rdquo; ignores chemistry, distribution, and exposure. &ldquo;BAM15 is DNP without the danger&rdquo; converts a mouse comparison into a human safety claim. The credible position is more demanding: newer compounds may improve the therapeutic window, but that window must be measured for each molecule and formulation.</P>
            <P>Normal temperature in a mouse experiment cannot rule out all cardiac, hepatic, reproductive, or chronic risks in humans. Nor would a normal reading on a home thermometer or wearable certify safety. Absence of a particular toxicity signal is not the same as a complete safety profile.</P>
          </Section>
          <Section title="The human evidence exists next door, not in these bottles">
            <P>A blanket dismissal of uncoupling would miss a real clinical development: HU6, a different compound metabolized to DNP, has entered randomized human studies. In a <Cite source="hu6liver">phase 2a study in adults with fatty liver disease and high BMI</Cite>, it reduced MRI-measured liver fat. Flushing, diarrhea, and palpitations were reported; no serious treatment-emergent adverse events were reported in that study. This was human proof of concept for that strategy, not a trial of BAM15.</P>
            <P>The more revealing result for the exercise claim came from the <Cite source="hu6heart">2025 HuMAIN-HFpEF trial</Cite>{" "}in people with obesity-related heart failure with preserved ejection fraction. HU6 reduced weight and fat mass without significant muscle-mass loss, but did not significantly improve peak oxygen consumption, six-minute walking distance, or the quality-of-life score. Serious adverse events occurred in both groups, including one death; investigators judged them unrelated to treatment.</P>
            <P>That small trial does not prove uncoupling can never improve function. The investigators called for larger, longer studies. It does demonstrate why fat loss and fitness need separate endpoints. It is also not a negative trial of SLU-PP-332: a different molecule, mechanism, and patient population cannot settle its prospects.</P>
            <Callout label="Do not transfer the evidence">HU6 human data do not make BAM15 clinically tested. SLU-PP-332 mouse endurance data do not make BAM15 an endurance drug. A promising class does not lend every product in the category its clinical record.</Callout>
          </Section>
          <Section title="Two mechanisms do not establish a stack">
            <P>The combination pitch practically writes itself: switch on the machinery with SLU-PP-332, then increase fuel expenditure with BAM15. It is an intelligible hypothesis. It is not demonstrated synergy. A stack would need to outperform each compound alone on a defined endpoint, with exposure, interaction, and safety measurements collected in the same experiment.</P>
            <P>This review identified no controlled primary study validating that combination. Whether the effects are additive, redundant, counterproductive, or intolerable cannot be decided by drawing two arrows toward &ldquo;fat burning.&rdquo; A mechanism diagram also cannot establish compatibility with a GLP-1 drug, a stimulant, or strenuous training.</P>
            <P>There is consequently no evidence-based human dose, cycle, or timing schedule to offer for either compound or their combination. Converting a mouse exposure into a human-looking number would not fill the missing pharmacokinetic and toxicology work. A vendor purity certificate, even if accurate about chemical identity, would not fill it either.</P>
          </Section>
          <Section title="What would actually move the evidence forward?">
            <Bullets items={[
              ["Exact-compound human exposure data", "A characterized formulation, measured pharmacokinetics, and monitored tolerability, rather than assuming an online product behaves like laboratory material."],
              ["Endpoints that match the promise", "Body composition and insulin sensitivity for metabolic claims; measured exercise capacity and patient function for fitness claims. One is not a substitute for the other."],
              ["Enough follow-up to see the trade-offs", "Durability, discontinuation, organ safety, and adverse events across a broader population, not just a favorable short experiment."],
              ["Actual combination experiments", "Comparison with each agent alone before claiming a stack is synergistic, let alone safe for people."],
            ]} />
            <P>The strongest case for these molecules is not that the gym has become obsolete. It is that researchers may be able to treat aspects of metabolic disease through pathways distinct from appetite suppression. That remains worth investigating even if no compound ever replaces a workout.</P>
            <P>If you have already used an unapproved product, tell your clinician the exact name, source, other substances, and timing rather than calling it a peptide supplement. Seek emergency care for severe symptoms such as chest pain, collapse, confusion, or overheating. Those are general emergency warning signs, not a validated BAM15 or SLU-PP-332 toxicity checklist; feeling fine does not establish safety.</P>
            <P>The conclusion is neither &ldquo;miracle&rdquo; nor &ldquo;fake.&rdquo; <Em>These are genuine preclinical tools with unanswered clinical questions.</Em>{" "}Spending more fuel is one biological achievement. Becoming fitter, and doing either safely in a human, are separate achievements still to prove.</P>
          </Section>
          <Section title="Common questions">
            <dl className="space-y-5">{FAQS.map(f => <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/40 p-5"><dt className="font-display text-base font-semibold">{f.q}</dt><dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd></div>)}</dl>
          </Section>
          <Section title="Sources and review scope">
            <ul className="space-y-3 text-sm leading-6">
              <li><Cite source="exercise">Billon et al. Synthetic ERRα/β/γ agonist and exercise capacity. ACS Chemical Biology (2023).</Cite></li>
              <li><Cite source="metabolic">Billon et al. A Synthetic ERR Agonist Alleviates Metabolic Syndrome. JPET (2024 issue; online 2023).</Cite></li>
              <li><Cite source="bam15">Alexopoulos et al. BAM15 reverses diet-induced obesity and insulin resistance in mice. Nature Communications (2020).</Cite></li>
              <li><Cite source="hu6liver">Noureddin et al. HU6 in fatty liver disease and high BMI. Lancet Gastroenterology &amp; Hepatology (2023).</Cite></li>
              <li><Cite source="hu6heart">Pandey et al. HuMAIN-HFpEF randomized clinical trial. JAMA Cardiology (2025).</Cite></li>
            </ul>
            <P>Literature and ClinicalTrials.gov checked September 15, 2026. Exact-name searches for <a className={LINK} href="https://clinicaltrials.gov/search?term=%22SLU-PP-332%22">SLU-PP-332</a>{" "}and <a className={LINK} href="https://clinicaltrials.gov/search?term=%22BAM15%22">BAM15</a>{" "}(also BAM-15) identified no registrations. No published human intervention studies for either exact compound were identified. This is not an exhaustive audit of every international registry and cannot exclude unpublished studies or other identifiers.</P>
            <P>No retraction or expression-of-concern notice was identified for the foundational Billon and Alexopoulos papers in the publication records checked. That is a publication-status check, not independent validation of the raw data. The studies include disclosed commercial interests: ERR-therapeutic company equity in the SLU work, biotechnology interests in the BAM15 work, and industry funding or relationships in the HU6 studies. These disclosures warrant attention, not automatic dismissal.</P>
          </Section>
          <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
            <h3 className="font-display text-base font-semibold">Keep going</h3>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <CrossLink href="/insights/the-peptide-exercise-writes" label="MOTS-c: the peptide exercise writes" />
              <CrossLink href="/families/mitochondrial" label="Mitochondrial-derived peptides: the actual family" />
              <CrossLink href="/insights/bigger-not-stronger" label="Bigger, but not stronger: another endpoint trap" />
              <CrossLink href="/methodology" label="How this reference grades evidence" />
            </ul>
          </div>
          <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">Educational reference on mechanism, summarized from public scientific literature and simplified in places. Not medical advice, dosing guidance, or a recommendation to use any compound. SLU-PP-332 and BAM15 evidence discussed here is preclinical; human HU6 trials concern a different molecule. Specific compounds and trials are named to explain the science; verify any claim against the linked primary sources.</p>
        </article>
      </Container>
    </main>
    <SiteFooter />
  </>;
}

function MechanismTable() {
  const rows = [
    ["Chemical category", "Synthetic small molecule; not a peptide", "Synthetic small molecule; not a peptide"],
    ["Primary mechanism", "ERRα/β/γ agonism and altered gene expression", "Proton transport across the inner mitochondrial membrane"],
    ["Energy logic", "Activate an oxidative, exercise-associated program", "Reduce coupling efficiency so fuel demand can increase"],
    ["Meaningful evidence", "Mouse endurance, muscle-fiber and metabolic findings", "Mouse adiposity, liver-fat and insulin-sensitivity findings"],
    ["Human evidence", "No published intervention study identified", "No published intervention study identified"],
    ["Unproven leap", "Exercise replacement in humans", "A safe human fat-loss or fitness drug"],
  ];
  return <section aria-labelledby="comparison-title">
    <h2 id="comparison-title" className="font-display text-2xl font-semibold">SLU-PP-332 vs BAM15 at a glance</h2>
    <div className="mt-5 overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full min-w-[560px] text-left text-sm leading-6">
        <caption className="sr-only">Mechanism and evidence comparison, not a head-to-head trial</caption>
        <thead className="bg-panel/60"><tr>{["Question", "SLU-PP-332", "BAM15"].map(h => <th key={h} scope="col" className="p-4 font-semibold">{h}</th>)}</tr></thead>
        <tbody>{rows.map(([label, slu, bam]) => <tr key={label} className="border-t border-ink/10"><th scope="row" className="p-4 font-medium">{label}</th><td className="p-4 text-ink/70">{slu}</td><td className="p-4 text-ink/70">{bam}</td></tr>)}</tbody>
      </table>
    </div>
    <p className="mt-3 text-xs leading-5 text-ink/45">Comparison of separate research programs. No head-to-head or combination efficacy is implied. Sources: Billon 2023/2024 and Alexopoulos 2020, linked above.</p>
  </section>;
}
