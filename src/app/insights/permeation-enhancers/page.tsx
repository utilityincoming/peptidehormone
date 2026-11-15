import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("permeation-enhancers")!;
export const metadata: Metadata = {
  title: "SNAC vs Sodium Caprate (C10): Oral Peptide Absorption and Gut Safety — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

const SOURCES = [
  { title: "Buckley et al., 2018 — primary gastric-absorption experiments", url: "https://pubmed.ncbi.nlm.nih.gov/30429357/" },
  { title: "Twarog et al., 2019 — SNAC/C10 comparative review", url: "https://www.mdpi.com/1999-4923/11/2/78" },
  { title: "McCartney et al., 2016 — safety, damage/repair and bystander review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4910835/" },
  { title: "Bohley and Leroux, 2024 — barriers and next-generation enhancer review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11434117/" },
  { title: "McGuire et al., 2025 — SOUL randomized cardiovascular-outcomes trial", url: "https://www.ovid.com/journals/nejm/fulltext/10.1056/nejmoa2501006~oral-semaglutide-and-cardiovascular-outcomes-in-high-risk" },
  { title: "FDA archived Rybelsus prescribing information, January 2024 — formulation-specific label", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/213051s018lbl.pdf" },
];
SOURCES.push(
  { title: "Halberg et al., 2019 — randomized phase 2 C10–oral insulin trial", url: "https://pubmed.ncbi.nlm.nih.gov/30679095/" },
  { title: "Halberg et al., 2019 — human food-effect study of C10–oral insulin", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6856260/" },
);
function Cite({ n }: { n: number }) {
  return <a href={SOURCES[n - 1].url} className={LINK} target="_blank" rel="noopener noreferrer">[{n}]</a>;
}
const FAQS = [
  { q: "Are SNAC and sodium caprate the same thing?", a: "No. SNAC is salcaprozate sodium, the enhancer co-formulated with oral semaglutide. Sodium caprate is the sodium salt of the ten-carbon fatty acid capric acid, abbreviated C10. Sodium caprylate is C8, a third compound used in the oral octreotide formulation. Their evidence is not interchangeable." },
  { q: "Does SNAC open tight junctions or cause leaky gut?", a: "Buckley's semaglutide experiments supported localized, transient transport through stomach epithelial cells, without evidence of an effect on tight junctions. That is not the same as opening the spaces between intestinal cells. It also does not establish that every SNAC formulation is harmless at every concentration. Persistent barrier disease cannot be inferred from an acute permeability experiment." },
  { q: "Can sodium caprate damage the intestinal lining?", a: "C10 can perturb cell membranes and affect tight-junction function; epithelial injury has been observed in experimental models at permeability-enhancing exposures. Recovery has also been observed. Concentration, contact time, formulation and model matter. These findings are not equivalent to proof of chronic intestinal disease in people." },
  { q: "Can bacteria or toxins cross with an oral peptide?", a: "Unintended bystander absorption is a legitimate safety question. Reviews have not established routine pathogen co-absorption as a clinical consequence of SNAC or C10 formulations. A drug, a bacterial fragment and a whole bacterium are different transport challenges; absence of a demonstrated clinical signal does not exclude every molecule or chronic scenario." },
  { q: "Does oral semaglutide prove all permeation enhancers are safe long term?", a: "No. SOUL provides multi-year randomized experience with one oral semaglutide product in people with high-risk type 2 diabetes. That is important reassurance about the product, not a dedicated test of every barrier mechanism or a safety certificate for C10, different peptides, untested combinations or decades of exposure." },
  { q: "Can adding SNAC or C10 make any peptide capsule work?", a: "No. Co-release, local concentration, stability, dissolution and the peptide's own properties determine exposure. Evidence for a named enhancer is not human pharmacokinetic evidence for a different finished product. Neither food-additive history nor an ingredient certificate demonstrates systemic delivery." },
];

export default function Article() {
  return <>
    <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
    <SiteHeader />
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <section className="border-b border-ink/[0.06]">
        <Container className="max-w-3xl py-16 md:py-20">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
            <Link href="/insights" className="hover:text-ink">Insights</Link><span aria-hidden>/</span>
            <Link href="/families/incretins-metabolic" className={LINK}>Incretins &amp; metabolic</Link>
          </nav>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">{insight.title}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">{insight.dek}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink/40">{insight.readingMinutes} min read · reviewed {insight.reviewed}</p>
        </Container>
      </section>
      <Container className="max-w-3xl py-14 md:py-18">
        <article className="space-y-12">
          <Section title="The question hidden behind the one-percent number">
            <P>A peptide gets into the blood after being swallowed. That is an engineering achievement. But the fraction absorbed is only the first question. <Em>What changed in the barrier, what else could cross, and does the barrier return to its previous state?</Em> Those are not anti-drug talking points. They are the safety questions that permeation-enhancer researchers themselves ask. The mistake is turning a question into either a diagnosis or a dismissal.<Cite n={3} /></P>
            <P>Our <Link href="/insights/glp-1-in-a-pill" className={LINK}>oral GLP-1 explainer</Link> describes why a pill matters; <Link href="/insights/getting-the-molecule-in" className={LINK}>the delivery overview</Link> explains why peptides usually need help. Here the helper is the subject. Two helpers in particular: salcaprozate sodium, or <Em>SNAC</Em>, and <Em>sodium caprate, C10</Em>. Shared job title, different chemicals, different formulation histories. Neither should be used as a synonym for the other.<Cite n={2} /></P>
          </Section>
          <Callout label="The short verdict">There is real evidence of permeability changes and experimental epithelial injury, especially for C10. There is also evidence of recovery and substantial human experience with a particular SNAC-containing medicine. What is not established is the sweeping claim that these products inevitably cause chronic “leaky gut,” or the opposite claim that every enhancer-containing capsule inherits the safety of an approved drug.</Callout>
          <Section title="Three names that should never be collapsed into one">
            <div className="overflow-x-auto rounded-2xl border border-ink/10">
              <table className="w-full min-w-[540px] text-left text-sm leading-6">
                <caption className="p-4 text-left text-ink/60">Chemical identity is not a clinical equivalence claim. Comparative context: <Cite n={2} /><Cite n={4} /></caption>
                <thead className="bg-panel/40"><tr>{["Enhancer", "What it is", "Evidence anchor"].map(x => <th key={x} scope="col" className="p-4 font-semibold">{x}</th>)}</tr></thead>
                <tbody className="text-ink/75">
                  <tr className="border-t border-ink/10"><th scope="row" className="p-4">SNAC</th><td className="p-4">Salcaprozate sodium; a salicylate-containing amino-fatty-acid derivative</td><td className="p-4">Co-formulated oral semaglutide; localized gastric absorption</td></tr>
                  <tr className="border-t border-ink/10"><th scope="row" className="p-4">C10</th><td className="p-4">Sodium caprate; salt of ten-carbon capric acid</td><td className="p-4">Intestinal delivery platforms and human peptide trials; membrane and junction effects</td></tr>
                  <tr className="border-t border-ink/10"><th scope="row" className="p-4">C8</th><td className="p-4">Sodium caprylate; salt of eight-carbon caprylic acid</td><td className="p-4">The lipidic oral octreotide formulation; not evidence that C10 is the same product</td></tr>
                </tbody>
              </table>
            </div>
            <P>SNAC’s chemical name contains an aminocaprylate element. That does not make it ordinary sodium caprylate. Likewise, two extra carbons distinguish caprate from caprylate, but “both are fatty acids” is not permission to transfer a clinical result. Enhancer, payload, release site and finished dosage form travel together as the unit of evidence.<Cite n={2} /><Cite n={4} /></P>
          </Section>
          <Section title="Before crossing: digestion, mucus and the wrong kind of cargo">
            <P>The gut is not a sheet of plastic with one hole-size setting. Proteases can destroy a peptide before it reaches the wall; mucus changes its access to the surface; epithelial membranes resist large polar molecules; junctions restrict travel between cells. An enteric coating can postpone release until the intestine without making the released peptide cross it. A protease inhibitor can preserve intact drug without solving permeability. An enhancer can improve crossing while leaving degradation as the limiting step.<Cite n={4} /></P>
            <P>Nor is all peptide absorption the same outcome. Absorbing amino acids or small dietary fragments is not equivalent to absorbing an intact receptor-active drug. Conversely, a peptide intended to act locally in the gastrointestinal tract need not achieve high systemic exposure to have a local effect. The relevant experiment must match the claim: intact circulating drug for a systemic claim, or appropriately demonstrated local pharmacology for a local one.<Cite n={4} /></P>
          </Section>
          <RouteFigure />
          <Section title="SNAC: a small patch of stomach, not a gut-wide opening">
            <P>Buckley and colleagues combined clinical and preclinical work to show something counterintuitive: co-formulated semaglutide was absorbed from the <Em>stomach</Em>, close to the tablet surface. SNAC buffered the local environment, protecting against enzymatic degradation, and transiently facilitated absorption. The reported route was <Em>transcellular</Em>—through epithelial cells—with no evidence of an effect on tight junctions in those experiments.<Cite n={1} /></P>
            <P>That is why “loosens the stomach lining” is an unhelpful shorthand. It sounds like the cells separate, or a large region loses its seal. The semaglutide evidence instead supports a localized, compound-specific process. Reviews describe reduced pepsin activity at the raised local pH, changes favoring semaglutide monomers rather than aggregates, and membrane interactions that help passage. Local buffering is not permanent suppression of acid production throughout the stomach.<Cite n={1} /><Cite n={2} /></P>
            <P>But “transcellular” is not a synonym for “risk-free.” At different concentrations and in intestinal cell models, SNAC can also alter membrane behavior and electrical resistance. A mechanism observed for semaglutide at the gastric tablet interface does not settle what a different SNAC formulation does elsewhere. It is equally wrong to import every intestinal injury finding into this gastric product and to assume the gastric mechanism absolves every SNAC experiment.<Cite n={2} /><Cite n={3} /></P>
          </Section>
          <Section title="C10: more than a tidy tight-junction switch">
            <P>Sodium caprate is often presented as a reversible opener of tight junctions, allowing <Em>paracellular</Em> transport between epithelial cells. That describes part of the literature, not a clean selective switch. C10 also interacts with cell membranes; membrane perturbation and downstream changes in cellular signaling and junction organization can coexist. The balance depends on concentration, exposure and model.<Cite n={2} /></P>
            <P>This matters because an increase in permeability is not automatically separable from injury. Experimental C10 work has observed epithelial damage alongside enhanced transport; protective interventions can reduce both. Calling every effect “gentle modulation” hides that result. Calling C10 an indiscriminate corrosive hides the recovery data and the importance of the exposure conditions. Researchers are trying to define a useful, recoverable window, not prove that a biologically inert ingredient somehow moves a macromolecule.<Cite n={3} /></P>
            <P>The comparison is therefore not “safe SNAC versus dangerous C10.” The comparative review found no convincing general superiority in human delivery performance, and challenged overly neat distinctions between their intestinal mechanisms at high concentrations. That review predates much of today’s semaglutide experience; its mechanistic caution remains useful, but its historical limits on long-term clinical evidence must not be repeated as if time stopped in 2019.<Cite n={2} /><Cite n={5} /></P>
          </Section>
          <Section title="C10 in humans: an insulin pill that worked, then stopped">
            <P>C10 is not supported only by cell experiments. In an eight-week randomized phase 2 trial, 50 people with type 2 diabetes received either oral I338, an engineered long-acting insulin analogue co-formulated with sodium caprate, or injected insulin glargine. Week-eight fasting glucose was 7.1 versus 6.8 mmol/L, with no statistically significant treatment difference. That is evidence of pharmacological delivery, not proof of equivalence from a small trial.<Cite n={7} /></P>
            <P>Adverse events were reported in 60% versus 68%; diarrhea occurred in 12% in each group. The investigators reported no severe adverse events or severe hypoglycemic episodes. Only 25 participants received oral I338, so these findings cannot settle chronic barrier safety. Crucially, the published reason development stopped was the commercially unviable quantity of insulin required—not demonstrated intestinal toxicity in this trial.<Cite n={7} /></P>
            <P>A separate crossover study in 44 healthy men demonstrated the formulation’s food sensitivity: eating immediately after dosing produced an exposure ratio of 0.36 relative to eating after 360 minutes. The study found no statistically significant exposure differences for meals at 30 or 60 minutes versus 360 minutes. This is human pharmacokinetic evidence for one engineered insulin tablet, not a general fasting rule for every C10 product.<Cite n={8} /></P>
          </Section>
          <Section title="What does ‘damage’ actually mean in a paper?">
            <P>One common readout is <Em>TEER</Em>, transepithelial electrical resistance. A fall means ions pass more easily across the tested cell layer. It does not, by itself, identify the route, prove cell death, show that bacteria crossed, or diagnose chronic disease. Researchers need complementary measures: transport of size-defined markers, membrane integrity, viability, microscopy or histology, and recovery after the enhancer is removed.<Cite n={3} /></P>
            <P>A cultured monolayer also lacks the full protective setting of a living gut: mucus, blood flow, dilution, movement and repair. An isolated intestinal segment exposed to a concentrated solution is not the same as a swallowed tablet moving through a person. These models are useful precisely because they isolate mechanisms; that isolation is also why their most dramatic images cannot be read as a clinical forecast without exposure matching.<Cite n={3} /><Cite n={4} /></P>
            <P>The reverse shortcut fails too. If a model is imperfect, an injury finding is not meaningless. Ask whether the tested local concentration and contact duration are plausible, whether the barrier recovers function as well as appearance, and whether repeated exposure changes the result. A negative viability assay does not erase altered transport; a recovered resistance value does not answer every inflammatory endpoint.<Cite n={3} /></P>
          </Section>
          <Section title="The bystander problem: drug-sized is not bacterium-sized">
            <P>The obvious concern is selectivity. If a formulation helps its peptide cross, could it also help bacterial products, food antigens or another medicine cross? Reviews explicitly discuss pathogens, lipopolysaccharide and toxins as potential bystanders. They also report that evidence for pathogen co-absorption is generally lacking—not that the concern has been demonstrated as a routine clinical outcome.<Cite n={3} /></P>
            <P>A whole bacterium, an endotoxin aggregate, a small toxin and a peptide are not interchangeable probes. Differences in size, charge, aggregation and location matter. So do geography and time: the potential passenger must encounter the altered patch while the absorption window exists. A local gastric process near a tablet and an intestinal enhancer exposure are not the same encounter with the same luminal contents.<Cite n={1} /><Cite n={3} /></P>
            <P>The defensible conclusion is narrower than either slogan: <Em>unintended transport is a legitimate endpoint to test, not an established explanation for every symptom after an oral peptide.</Em> Absence of demonstrated pathogen translocation does not prove zero transport of every smaller bacterial fragment. Conversely, a permeability-marker result does not prove systemic endotoxemia, autoimmune disease, or microbiome collapse in patients.<Cite n={3} /></P>
          </Section>
          <Section title="Recovery today is not the whole chronic-safety question">
            <P>The gut has considerable capacity for restitution and renewal. The safety review describes reversible permeability effects and repair across experimental systems, including recovery after C10 exposure. But the clinically important question is not merely whether one exposure reverses. It is whether repeated exposures leave adequate recovery, whether inflammation accumulates, and whether a previously inflamed or otherwise compromised barrier responds differently.<Cite n={3} /></P>
            <P>Those are evidence gaps, not grounds to declare that people with inflammatory bowel disease, celiac disease or other gastrointestinal disorders will necessarily be harmed. Nor should findings from a general trial population be treated as a dedicated barrier-safety study in each of those conditions. A useful chronic program would examine repeated-dose function, tissue effects and relevant inflammatory or translocation measures—not just whether participants reported abdominal pain.<Cite n={3} /><Cite n={4} /></P>
            <P>“Leaky gut” collapses all of this into one phrase. Increased intestinal permeability is a measurable biological phenomenon; a blanket diagnosis inferred from fatigue, bloating or the presence of an enhancer is not the same thing. Keep acute transport, epithelial injury, persistent dysfunction and clinical disease as four separate claims. Each needs its own evidence.<Cite n={3} /></P>
          </Section>
          <Section title="The strongest counterweight to the scare story: actual people">
            <P>It would be misleading to stop at cell layers and a 2016 safety review. The 2025 <Em>SOUL</Em> trial randomized 9,650 people with high-risk type 2 diabetes to oral semaglutide or placebo, with a median follow-up of 49.5 months. Serious adverse events occurred in 47.9% versus 50.3%, respectively; the trial also demonstrated fewer major cardiovascular events with oral semaglutide. This is substantial multi-year experience with the product, not merely a short absorption experiment.<Cite n={5} /></P>
            <P>Its boundaries matter. This was a clinical-outcomes trial, not a serial-biopsy or endotoxin-translocation study designed to isolate SNAC. Overall serious-event results cannot exclude every subtle barrier effect, rare outcome or risk over decades. They also cannot certify a C10 tablet or an untested oral research peptide. Still, a claim that the studied product inevitably produces major clinical harm must reckon with these randomized data rather than treating a proposed mechanism as the final verdict.<Cite n={5} /></P>
            <P>Likewise, nausea, vomiting, diarrhea and constipation are real adverse effects in oral semaglutide labeling. They are not diagnostic tests for enhancer-mediated injury: the active GLP-1 drug itself has gastrointestinal effects and delays gastric emptying. A combination product’s symptom reports alone cannot apportion causality between peptide, enhancer, formulation and their interaction.<Cite n={6} /><Cite n={3} /></P>
          </Section>
          <Section title="Food, water and other pills: the formulation is the mechanism">
            <P>The familiar “about one percent” belongs to a particular oral semaglutide formulation, not to the intrinsic oral absorbability of every peptide or every SNAC tablet. The archived January 2024 US Rybelsus label estimates absolute bioavailability at approximately 0.4–1%. It specifies an empty stomach, no more than four ounces of plain water, and at least 30 minutes before food, drink or other oral medicines. These are historical, product-specific labeling facts, not universal directions for future formulations.<Cite n={6} /></P>
            <P>Why the choreography? A local absorption environment depends on tablet disintegration, co-location, fluid volume, residence time and competing contents. Survival in a stability assay is not proof of crossing; a large improvement over almost no baseline absorption can still leave little absolute exposure. Both mean exposure and its variability matter, especially when a drug has little margin between too little and too much.<Cite n={2} /><Cite n={4} /></P>
            <P>Interaction claims need the same discipline. The archived label reports 33% greater total thyroxine exposure with levothyroxine co-administration and warns that delayed gastric emptying can affect oral medicines. That is a demonstrated product interaction; it does not prove that SNAC indiscriminately admits all nearby drugs through a damaged barrier. “Everything gets absorbed more” is not a substitute for drug-specific interaction testing.<Cite n={6} /></P>
          </Section>
          <Section title="‘It is in food’ and ‘it is an excipient’ are not safety endpoints">
            <P>C10 has food-related exposure history, and SNAC has a history in oral delivery products. Those facts are relevant starting points. They are not equivalent to demonstrating safety at the concentrated epithelial interface deliberately created by a pharmaceutical formulation. Amount swallowed, concentration at the tissue, contact time and repetition answer different questions. The word “inactive” on an ingredient list means it is not the therapeutic active ingredient—not that it has no biological action.<Cite n={2} /><Cite n={3} /></P>
            <P>Nor does a comparison with detergent settle the issue. Surfactant-like membrane interactions help explain both permeability and experimental toxicity; they do not tell you the outcome at a specific clinical exposure. Naturalness does not establish safety, and a frightening chemical analogy does not establish harm. Both bypass the formulation data the reader actually needs.<Cite n={2} /></P>
          </Section>
          <Section title="What an oral-peptide claim should have to show">
            <Bullets items={[
              ["Identity", "The exact peptide, enhancer, dosage form and release site—not an ingredient name borrowed from an approved product."],
              ["Human exposure", "A validated assay for intact drug, exposure over time, food effects and between-person and within-person variability; a claim of systemic action needs systemic evidence."],
              ["A fair comparator", "Absolute exposure or a clearly defined comparison, not only a fold increase from a nearly zero baseline."],
              ["Repeated-dose safety", "An account of mucosal effects and recovery appropriate to the intended exposure, plus adverse events and interactions in the population being treated."],
              ["Clinical relevance", "Evidence that delivered exposure produces the intended effect with an acceptable benefit–risk balance, rather than treating detectability as proof of efficacy."],
            ]} />
            <P>These are the translational problems emphasized in the comparative and contemporary reviews.<Cite n={2} /><Cite n={4} /> A certificate of analysis may help establish ingredient identity or purity; it cannot supply the missing human pharmacokinetics. “Contains SNAC” is not “works like oral semaglutide.” “Contains C10” is not “validated intestinal delivery.” And none of this licenses a home recipe: more enhancer is not a predictable way to obtain more useful exposure.</P>
          </Section>
          <Callout label="The actual bottom line">The achievement is not simply getting a peptide through a wall. It is delivering a useful, reproducible exposure while keeping the barrier’s disturbance acceptable and recoverable. SNAC-containing semaglutide shows that an enhancer-based oral peptide can become a clinically useful medicine. It does not turn permeation enhancement into a universally safe ingredient category—or prove that a transient transport effect is chronic gut disease.</Callout>
          <Section title="Questions readers actually ask">
            <dl className="space-y-6">{FAQS.map(({ q, a }) => <div key={q}><dt className="font-display text-lg font-semibold">{q}</dt><dd className="mt-2 text-[15px] leading-7 text-ink/75">{a}</dd></div>)}</dl>
          </Section>
          <Section title="Sources and evidence boundaries">
            <P>Primary mechanism experiments, a randomized clinical-outcomes trial and an archived regulatory label are distinguished from reviews above. The reviews organize experimental findings; they are not new randomized evidence. The archived label is cited to anchor the original formulation’s numbers, not presented as the latest prescribing instructions.</P>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-6 text-ink/70">{SOURCES.map(s => <li key={s.url}><a href={s.url} className={LINK} target="_blank" rel="noopener noreferrer">{s.title}</a></li>)}</ol>
          </Section>
          <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
            <h3 className="font-display text-base font-semibold">Keep going</h3>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <CrossLink href="/insights/glp-1-in-a-pill" label="Oral GLP-1: peptide tablets versus small molecules" />
              <CrossLink href="/insights/getting-the-molecule-in" label="Why peptides are injected: the delivery problem" />
              <CrossLink href="/hormones/semaglutide" label="Semaglutide — the molecule behind the formulation" />
              <CrossLink href="/methodology" label="How this reference grades evidence" />
            </ul>
          </div>
          <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">Educational reference on mechanism and the state of the evidence, summarized and simplified from the public record. Not individualized medical advice or a prescription. Where a dose or regimen appears it is reported from its source as research literacy — so you can read the evidence yourself — not an instruction to dose. Compounds and products are named to explain the science, not to endorse use or substitution.</p>
        </article>
      </Container>
    </main>
    <SiteFooter />
  </>;
}

/* ── Two helpers, two doors across the epithelium ── */
function RouteFigure() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 600 236"
        className="w-full"
        role="img"
        aria-label="SNAC carries semaglutide through a stomach epithelial cell (the transcellular route), while sodium caprate opens the junction between intestinal cells (the paracellular route)."
      >
        {/* lumen / blood framing */}
        <text x="300" y="22" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11" fontFamily="var(--font-geist-mono), monospace">LUMEN · swallowed peptide</text>
        <text x="300" y="228" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11" fontFamily="var(--font-geist-mono), monospace">BLOODSTREAM</text>
        <line x1="300" y1="42" x2="300" y2="196" stroke="var(--color-ink)" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3 4" />

        {/* ── LEFT: SNAC, transcellular ── */}
        <text x="150" y="50" textAnchor="middle" fill="var(--accent-blue)" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">SNAC</text>
        <rect x="105" y="92" width="90" height="72" rx="11" fill="var(--accent-blue)" fillOpacity="0.1" stroke="var(--accent-blue)" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="150" y1="60" x2="150" y2="182" stroke="var(--accent-blue)" strokeWidth="2.5" />
        <polygon points="150,192 143,178 157,178" fill="var(--accent-blue)" />
        <circle cx="150" cy="60" r="4.5" fill="var(--accent-blue)" />
        <text x="150" y="212" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11.5" fontFamily="var(--font-geist-mono), monospace">transcellular — through the cell</text>

        {/* ── RIGHT: C10, paracellular ── */}
        <text x="450" y="50" textAnchor="middle" fill="var(--accent-amber)" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Sodium caprate (C10)</text>
        <rect x="378" y="92" width="62" height="72" rx="11" fill="var(--accent-amber)" fillOpacity="0.08" stroke="var(--accent-amber)" strokeOpacity="0.35" strokeWidth="1.5" />
        <rect x="462" y="92" width="62" height="72" rx="11" fill="var(--accent-amber)" fillOpacity="0.08" stroke="var(--accent-amber)" strokeOpacity="0.35" strokeWidth="1.5" />
        {/* opened junction marks */}
        <line x1="445" y1="96" x2="457" y2="104" stroke="var(--accent-amber)" strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="457" y1="96" x2="445" y2="104" stroke="var(--accent-amber)" strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="451" y1="60" x2="451" y2="182" stroke="var(--accent-amber)" strokeWidth="2.5" />
        <polygon points="451,192 444,178 458,178" fill="var(--accent-amber)" />
        <circle cx="451" cy="60" r="4.5" fill="var(--accent-amber)" />
        <text x="451" y="212" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11.5" fontFamily="var(--font-geist-mono), monospace">paracellular — between the cells</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Same job title, different doors: SNAC ushers semaglutide through the stomach cell itself; C10 loosens the junction
        between intestinal cells. Different routes raise different safety questions — and neither result transfers to the other.
      </figcaption>
    </figure>
  );
}
