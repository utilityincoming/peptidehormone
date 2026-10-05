import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-note-without-the-incretin")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "Eloralintide Explained: How Lilly's Selective Amylin Agonist Is Built, and What the Trials Show",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each evidence grade stays checkable.
const REF = {
  // Discovery paper: receptor selectivity, rat taste-aversion, single-ascending-dose phase 1.
  discovery: "https://pubmed.ncbi.nlm.nih.gov/41109426/",
  // 12-week multiple-ascending-dose phase 1 with the pharmacokinetics.
  phase1: "https://pubmed.ncbi.nlm.nih.gov/41559929/",
  // 48-week phase 2 monotherapy trial in obesity without diabetes.
  phase2: "https://pubmed.ncbi.nlm.nih.gov/41207310/",
  phase2Registry: "https://clinicaltrials.gov/study/NCT06230523",
  // EloraTZP phase 2b in obesity with type 2 diabetes — press release and registry; not yet in a journal.
  eloraTzp:
    "https://www.prnewswire.com/news-releases/lillys-eloratzp-combination-of-eloralintide-and-tirzepatide-delivered-greater-weight-loss-and-a1c-reduction-vs-tirzepatide-15-mg-in-adults-with-obesity-and-type-2-diabetes-302894480.html",
  eloraTzpRegistry: "https://clinicaltrials.gov/study/NCT06603571",
  // The chemistry: the public registry record from which the structural reading below is taken.
  pubchem: "https://pubchem.ncbi.nlm.nih.gov/compound/175663130",
  // Cagrilintide's own 26-week phase 2, for the one cross-trial comparison the piece makes.
  cagri: "https://pubmed.ncbi.nlm.nih.gov/34798060/",
} as const;

// FAQ — surfaced as FAQPage JSON-LD and mirrored in the visible Q&A block.
const FAQS = [
  {
    q: "What is eloralintide?",
    a: "Eloralintide (LY3841136) is an investigational once-weekly amylin analog from Eli Lilly. It is a 37-residue peptide built on the human amylin scaffold, with the native disulfide ring replaced by a more stable methylene-thioacetal bridge, several non-coded residues, and a C20 fatty-diacid chain that binds albumin to give a half-life of roughly two weeks. It activates amylin receptors and was engineered to prefer the amylin-1 receptor over the bare calcitonin receptor. It does not act on the GLP-1 receptor at all.",
  },
  {
    q: "How much weight did people lose on eloralintide in phase 2?",
    a: "In the 48-week phase 2 trial published in The Lancet in December 2025 (263 adults with obesity or overweight, no diabetes), mean weight change was −9% at 1 mg, −12% at 3 mg, −18% at 6 mg and −20% at 9 mg weekly, against −0.4% on placebo. Escalation arms reached −16% to −20%. The most common side effects were nausea (up to 64% in the 6 mg arm that started at full dose) and fatigue (up to 46%). Phase 3 trials are under way; the drug is not approved.",
  },
  {
    q: "What is EloraTZP?",
    a: "EloraTZP is Lilly's name for eloralintide given together with tirzepatide. In a 48-week phase 2b trial of 367 adults with obesity and type 2 diabetes, reported at EASD in September 2026, the top combination (eloralintide 9 mg plus tirzepatide 15 mg) produced a mean 23.3% weight loss and a 2.9-point A1C reduction, versus 14.8% and 2.4 points on tirzepatide 15 mg alone. Discontinuation for adverse events on the combination arms ranged from about 11% to 27%. Lilly plans phase 3 trials of a single co-formulated product starting by the end of 2026. The result is a press release and conference presentation; the paper has not yet been published.",
  },
  {
    q: "How is eloralintide different from cagrilintide?",
    a: "Both are long-acting, fatty-acid-acylated amylin analogs dosed once a week. Cagrilintide activates the calcitonin receptor as well as the amylin receptors (it is often called a dual amylin and calcitonin receptor agonist). Eloralintide was engineered to prefer the amylin-1 receptor, with about 12-fold selectivity over the human calcitonin receptor in cell assays, and it produced less conditioned taste aversion than cagrilintide in rats. Whether that translates into better tolerability in people has not been tested head-to-head; the two drugs have never been compared in the same trial.",
  },
  {
    q: "Is eloralintide a GLP-1 drug?",
    a: "No. Eloralintide has no activity at the GLP-1 receptor. It works through the amylin receptor, a complex of the calcitonin receptor and an accessory RAMP protein, and signals satiety largely through the hindbrain's area postrema. Its phase 2 weight loss is in the same range as semaglutide and tirzepatide, which is why it is discussed alongside them, but it reaches that range by a different receptor family entirely.",
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
            <Section title="The number, and what is missing from it">
              <P>
                Every large weight-loss result of the last decade has had a GLP-1 receptor
                somewhere in it. <Link href="/hormones/semaglutide" className={LINK}>Semaglutide</Link>{" "}
                is GLP-1 alone; <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link>{" "}
                adds GIP; <Link href="/hormones/retatrutide" className={LINK}>retatrutide</Link>{" "}
                adds glucagon on top. Even the amylin combinations that followed kept a
                GLP-1 agonist in the regimen. In December 2025 <em>The Lancet</em> published a
                48-week trial in which the top dose of a once-weekly injection took off a
                mean 20% of body weight, and the GLP-1 receptor was nowhere in the molecule (
                <a href={REF.phase2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lancet 2025
                </a>
                ). <Grade g="clinical" />
              </P>
              <P>
                The drug is <Link href="/hormones/eloralintide" className={LINK}>eloralintide</Link>,
                an analog of <Link href="/hormones/amylin" className={LINK}>amylin</Link>, the
                hormone the beta cell releases in the same granule as insulin and that{" "}
                <Link href="/insights/insulins-forgotten-twin" className={LINK}>almost nobody names</Link>.
                This piece is about how the molecule is built, because the engineering is
                the argument: each edit to the 37-residue chain answers a specific failure
                of the native hormone, and one of those edits, receptor selectivity, is the
                reason the result is read as a verdict on amylin rather than on a blend.
                The trials come after, with their caveats intact.
              </P>
              <Phase2Figure />
              <P>
                Every claim is tagged by where it comes from: a public registry or
                regulatory record, human trial data, or animal and cell work. The tags grade{" "}
                <Em>provenance</Em>, not confidence.
              </P>
              <GradeLegend />
            </Section>

            <Section title="A receptor assembled from parts">
              <P>
                Amylin has no receptor gene of its own. It signals through the{" "}
                <Link href="/hormones/calcitonin" className={LINK}>calcitonin</Link> receptor,
                CTR, after that receptor has been clamped to one of three accessory
                proteins, the RAMPs. CTR with RAMP1 is the amylin-1 receptor, AMY1; with
                RAMP2, AMY2; with RAMP3, AMY3. The same core protein, dressed three ways,
                listens to amylin; undressed, it listens to calcitonin, the thyroid hormone
                that tells osteoclasts to stop resorbing bone. <Grade g="reference" />
              </P>
              <ReceptorSelectivityFigure />
              <P>
                That is the design problem in one sentence. A peptide shaped like amylin
                will fit the dressed receptor, but the undressed one is built from the same
                protein, so it will usually fit that too. The first long-acting amylin
                analog, <Link href="/hormones/cagrilintide" className={LINK}>cagrilintide</Link>,
                does: it is routinely described as a dual amylin and calcitonin receptor
                agonist. Eloralintide was engineered to tell the two apart. In cell lines
                expressing one receptor at a time, it was about 12-fold more potent at human
                AMY1 than at human CTR, and about 11-fold more potent at AMY1 than at AMY3 (
                <a href={REF.discovery} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Briere et al., Mol Metab 2025
                </a>
                ). Albumin binding, which the fatty-acid tail below exists to provide, did
                not erase that preference. <Grade g="preclinical" />
              </P>
              <P>
                Why spend a discovery programme on selectivity? Two reasons, and the honest
                one is less tidy. The tidy reason is pharmacology: CTR is expressed in bone,
                kidney and parts of the brain where an amylin drug has no business, and a
                molecule that leaves it alone has fewer places to cause trouble. The
                evidence reason is an aversion assay. Rats learn to avoid a flavour paired
                with a drug that makes them feel unwell, and eloralintide produced
                significantly less of that conditioned taste avoidance than cagrilintide at
                matched exposure. That is the entire experimental basis, so far, for the
                hope that a selective amylin agonist will be a gentler one. It is a rat
                result. <Grade g="preclinical" />
              </P>
              <Callout label="A translation caveat the paper itself raises">
                The selectivity numbers above are human receptors in human cell lines. In
                rat receptors, eloralintide activated AMY1 <Em>and</Em> AMY3 more potently
                than CTR, a different profile. The taste-avoidance advantage over
                cagrilintide was measured in rats, with rat receptors. Whether a 12-fold
                preference in a dish becomes a tolerability difference in a person is a
                question only a head-to-head trial can answer, and none has been run.
              </Callout>
            </Section>

            <Section title="Reading the molecule off its registry record">
              <P>
                Lilly has not published a labelled structure of eloralintide in the
                clinical papers. The public chemistry registry has one. PubChem&rsquo;s
                record gives the formula C<sub>201</sub>H<sub>319</sub>N<sub>49</sub>O<sub>65</sub>S<sub>2</sub>,
                a molecular weight of about 4,526 daltons, and a systematic name long enough
                to read the whole peptide from end to end (
                <a href={REF.pubchem} target="_blank" rel="noopener noreferrer" className={LINK}>
                  PubChem CID 175663130
                </a>
                ). Four things in that name are not in native amylin, and together they are
                the drug. <Grade g="reference" />
              </P>
              <ChainEditsFigure />
              <Bullets
                items={[
                  [
                    "A ring that cannot be opened",
                    "Native amylin begins with a disulfide bond between cysteines 2 and 7, a six-residue loop that the receptor needs to see. Disulfides are fragile: they reduce, scramble and swap partners in a formulation and in plasma. Eloralintide keeps the loop but replaces the sulfur–sulfur bond with a methylene-thioacetal, S–CH₂–S, one carbon inserted between the two sulfurs. The registry name shows it as a 1,3-dithia ring. The loop keeps its shape and loses its chemistry.",
                  ],
                  [
                    "Three residues the ribosome cannot make",
                    "The name contains an α-methyl-phenylalanine, a phenylalanine with an extra methyl on the backbone carbon, and an N-methylated amide in the chain. Both are standard moves against the two things that kill a peptide: proteases, which cannot cut a backbone they cannot bind, and aggregation, which native human amylin is famous for. An extra methyl at the right position stiffens the local conformation and blocks the hydrogen bond a fibril would need.",
                  ],
                  [
                    "A lysine with a tail",
                    "A lysine side chain carries, through two γ-glutamate spacers, an icosanedioic acid: a C20 chain with a carboxylic acid at each end. The Lilly papers place the acylation at position 26, which is an isoleucine in the native sequence, so the lysine was introduced to hold the tail. The free acid on the far end is what albumin binds.",
                  ],
                  [
                    "The rest left alone",
                    "The ring, the methyls and the tail are edits to a scaffold that is still recognisably amylin: 37 residues, the same amidated tyrosine at the C-terminus the receptor requires, and the sequence motifs that give the AMY1 preference. Selectivity was not bolted on; it was found in the sequence and then protected by the chemistry around it.",
                  ],
                ]}
              />
              <P>
                Compare the two earlier amylin drugs. <Link href="/hormones/pramlintide" className={LINK}>Pramlintide</Link>{" "}
                made exactly three substitutions, prolines borrowed from rat amylin, to stop
                the fibrils, and changed nothing else: it lasts about 48 minutes and is
                injected at every meal. Cagrilintide added a C20 diacid for albumin binding
                and reached a week. Eloralintide is the first to rebuild the disulfide,
                methylate the backbone and acylate the chain all at once, and the
                pharmacokinetics are where that shows. <Grade g="reference" />
              </P>
            </Section>

            <Section title="What a C20 diacid buys: two weeks">
              <P>
                The 12-week phase 1 study is the one with the numbers. Dosed once a week
                without escalation, eloralintide reached peak plasma concentration three to
                five and a half days after injection and had a terminal half-life of 310 to
                366 hours, which is 13 to 15 days. Exposure rose in proportion to dose, with
                dose-normalised ratios of 1.1 for area under the curve and 1.0 for peak
                concentration, which is what you want from a drug that will be titrated (
                <a href={REF.phase1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Bhattachar et al., Diabetes Obes Metab 2026
                </a>
                ). <Grade g="clinical" />
              </P>
              <HalfLifeLadder />
              <P>
                Two consequences follow from a half-life longer than the dosing interval.
                First, the drug accumulates: a weekly dose of something that lasts two weeks
                reaches steady state only after about five half-lives, roughly ten weeks,
                which is why every trial escalates slowly and why a &ldquo;fast
                start&rdquo; arm is a real pharmacological experiment rather than a
                convenience. Second, the signal never switches off between doses. Native
                amylin is a pulse released with each meal; eloralintide is a plateau. The
                hormone the body uses to say <Em>enough</Em> after eating is being delivered
                as a constant, and the trials below are, in part, a test of what a constant
                amylin signal does to a system built for pulses. <Grade g="reference" />
              </P>
            </Section>

            <Section title="The trials, in the order they were run">
              <P>
                There are three human studies of eloralintide alone and one of the
                combination. Taken in order, they read as a dose-finding programme that
                got the answer it was looking for, with two side effects it may not have
                expected. <Grade g="clinical" />
              </P>
              <Bullets
                items={[
                  [
                    "Single ascending dose, 48 healthy volunteers",
                    "Doses from 0.04 to 12 mg, once. Four weeks after a single 4 mg or 12 mg injection, mean weight was down 2.5% and 4.4%, against +0.6% on placebo. Sixteen adverse events in nine participants, fifteen of them mild. Two participants reported four gastrointestinal events between them. A single dose of a two-week drug producing measurable weight loss a month later is the half-life made visible.",
                  ],
                  [
                    "Twelve weeks of weekly dosing, 100 adults with obesity or overweight",
                    "Five dose cohorts, no escalation. Weight loss ranged from 2.6% to 11.3% at week 12. The most common events were decreased appetite (19%), headache (12%) and fatigue (11%); diarrhoea 10%, nausea 8%, vomiting 4%. One serious adverse event, judged unrelated. Only 29% of participants were women.",
                  ],
                  [
                    "Forty-eight weeks, 263 adults, phase 2",
                    "Seven arms: placebo, four fixed doses from 1 to 9 mg, and two escalation schedules. Mean weight change −9%, −12%, −18% and −20% at 1, 3, 6 and 9 mg; −20% and −16% on the 6→9 and 3→9 escalations; −0.4% on placebo. Baseline weight 109 kg, mean BMI 39, 78% female, 46 US centres, no diabetes. The paper's stated conclusion is 'clinically meaningful, dose-dependent reductions in bodyweight' and 'generally well tolerated'.",
                  ],
                ]}
              />
              <P>
                Now the side-effect table, which is where the tolerability story gets more
                interesting than the press release. Nausea in the phase 2 trial was 11% at
                1 mg and 13% at 3 mg, close to placebo&rsquo;s 14%, but <Em>64%</Em> in the
                arm that started at 6 mg with no escalation, 33% at 9 mg, and 54% on the
                6→9 schedule. Fatigue, barely mentioned in the GLP-1 literature, was 29% at
                6 mg, 43% at 9 mg and 46% on 6→9, against 12% on placebo (
                <a href={REF.phase2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lancet 2025
                </a>
                ). <Grade g="clinical" />
              </P>
              <Callout label="What 'favourable tolerability' rests on">
                The phase 2 trial had no GLP-1 arm. The claim that eloralintide is gentler
                on the gut than semaglutide or tirzepatide is a comparison across different
                trials, with different populations, durations and escalation schedules, and
                it is strongest at the low doses that also lose the least weight. At 6 mg
                started flat, two in three participants were nauseated. The amylin field&rsquo;s
                bet on tolerability is not refuted by that number, but it is not yet
                demonstrated by one either, and fatigue is a signal that needs its own
                explanation.
              </Callout>
              <P>
                One more comparison is worth making carefully, because it is the one
                everyone makes carelessly. Cagrilintide&rsquo;s own phase 2, in 2021, produced
                10.8% weight loss at its top dose after 26 weeks (
                <a href={REF.cagri} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lau et al., Lancet 2021
                </a>
                ). Eloralintide&rsquo;s 20% came at 48 weeks, in a heavier population, with a
                different escalation. The two numbers are not a ranking of two drugs. They
                are evidence that the amylin axis, played alone, keeps delivering past the
                26-week mark, which until 2025 was an open question. <Grade g="clinical" />
              </P>
            </Section>

            <Section title="Two receptor families, one syringe: EloraTZP">
              <P>
                If a selective amylin agonist loses 20% on its own, the obvious experiment
                is to add it to the best incretin. Lilly ran it in the harder population,
                adults with obesity <Em>and</Em> type 2 diabetes, where every class loses
                less weight. The phase 2b trial randomised 367 people across ten arms for 48
                weeks and reported at EASD in Milan on 30 September 2026. It is a press
                release and a conference presentation; the paper has not been published (
                <a href={REF.eloraTzp} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lilly, September 2026
                </a>
                ,{" "}
                <a href={REF.eloraTzpRegistry} target="_blank" rel="noopener noreferrer" className={LINK}>
                  NCT06603571
                </a>
                ). <Grade g="clinical" />
              </P>
              <EloraTzpFigure />
              <Bullets
                items={[
                  [
                    "The headline",
                    "Eloralintide 9 mg plus tirzepatide 15 mg: −23.3% body weight and −2.9 A1C points from a baseline of 8.1%. Tirzepatide 15 mg alone: −14.8% and −2.4. Eloralintide alone: −8.2%, −12.3% and −11.1% at 3, 6 and 9 mg. Placebo: −3.0%.",
                  ],
                  [
                    "The arithmetic",
                    "The combination beat tirzepatide by 8.5 points of weight, and eloralintide alone contributed 11 to 12 points in this population. Less than fully additive, which is what two satiety signals converging on the same hindbrain circuits would predict, and still the largest number reported in people with type 2 diabetes to date.",
                  ],
                  [
                    "The cost",
                    "Discontinuation for adverse events ran from 10.8% to 27.0% across the combination arms, against 2.9% on tirzepatide alone and 0% to 10.8% on eloralintide alone. The release attributes the events to escalation and promises an optimised schedule for phase 3. A quarter of an arm leaving a trial is the number to watch when the paper appears.",
                  ],
                  [
                    "The odd placebo",
                    "Placebo discontinuation was 16.7%, higher than most active arms, and placebo weight loss was 3.0%. Both are unusual and neither is explained in the release.",
                  ],
                ]}
              />
              <P>
                The design language matters here. Cagrilintide with semaglutide, the
                combination called CagriSema, is two pens;{" "}
                <Link href="/hormones/amycretin" className={LINK}>amycretin</Link> is the
                attempt to write GLP-1 and amylin into one peptide. EloraTZP is a third
                answer: two separate molecules, co-formulated into one injection, each free
                to keep its own pharmacokinetics. A two-week amylin agonist and a five-day
                dual incretin in the same syringe is a mixture, not a molecule, and Lilly
                says phase 3 of that co-formulation begins by the end of 2026.{" "}
                <Grade g="reference" />
              </P>
            </Section>

            <Section title="What selectivity has and has not proved">
              <P>
                It is worth separating the claims, because they are being sold as one.
              </P>
              <Bullets
                items={[
                  [
                    "Proved: the amylin axis can carry GLP-1-class weight loss alone",
                    "A 20% mean reduction at 48 weeks from a molecule with no incretin activity is the cleanest demonstration yet that satiety has more than one door. That was the question the amylin renaissance was built on, and it is now answered in 263 people.",
                  ],
                  [
                    "Proved: the chemistry holds",
                    "A thioacetal ring, backbone methylation and a C20 diacid on a 37-residue amylin scaffold give a two-week half-life with dose-proportional exposure and no loss of receptor preference. The molecule does what the registry record says it should.",
                  ],
                  [
                    "Not proved: that selectivity is why it is tolerable",
                    "The only comparison with a non-selective amylin agonist is a rat taste-aversion assay. The phase 2 nausea rates at flat 6 mg are not low. Fatigue is a new, dose-dependent signal with no mechanism offered.",
                  ],
                  [
                    "Not proved: durability, safety, and the pulse question",
                    "Forty-eight weeks is the longest exposure published. Amylin's native receptor family runs bone and calcium through calcitonin, and a drug 12-fold selective is not a drug that never touches CTR. Nothing in the record yet says what a years-long constant amylin signal does to a system that evolved for meal-sized pulses.",
                  ],
                ]}
              />
              <Callout label="Bullish on the science, sceptical on the page">
                The molecule is a genuine piece of engineering and the monotherapy number is
                real, peer-reviewed and placebo-controlled. The combination number is a
                press release with a discontinuation rate attached. Phase 3 will decide
                whether a selective amylin agonist is the field&rsquo;s second pillar or its
                best adjuvant. Until then, eloralintide is a drug that has proved the
                amylin note can be played alone, and has not yet proved it plays more
                sweetly.
              </Callout>
            </Section>

            {/* FAQ */}
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

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/eloralintide" label="Eloralintide — the catalog entry" />
                <CrossLink href="/hormones/cagrilintide" label="Cagrilintide — the non-selective predecessor" />
                <CrossLink href="/compare/eloralintide-vs-tirzepatide" label="Eloralintide vs tirzepatide, side by side" />
                <CrossLink href="/insights/insulins-forgotten-twin" label="What is amylin? Insulin's forgotten twin" />
                <CrossLink href="/insights/peptide-half-life-engineering" label="How a peptide is made to last" />
                <CrossLink href="/insights/is-there-a-glp-4" label="Is there a GLP-4?" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized
              and simplified from the public record. The structural reading above is taken
              from the public registry record and the Lilly discovery paper; residue
              positions are as reported there. Not medical advice. Compounds are named to
              explain the science, not to endorse any use; eloralintide and the
              eloralintide–tirzepatide combination are investigational and not approved
              treatments.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Evidence grades ───────────────────────────────────────────────────────
   Same four-step ladder as the site's Validation Tier Schema, rendered at
   prose altitude in the accent tokens, strongest → weakest by hue.          */
const GRADES = {
  reference: {
    label: "Reference",
    hue: "text-accent-teal bg-accent-teal/10 border-accent-teal/30",
    note: "A public registry record, regulatory fact, or the molecule's own chemistry.",
  },
  clinical: {
    label: "Clinical",
    hue: "text-accent-blue bg-accent-blue/10 border-accent-blue/30",
    note: "Data from human participants — randomized and placebo-controlled unless stated.",
  },
  preclinical: {
    label: "Preclinical",
    hue: "text-accent-amber bg-accent-amber/10 border-accent-amber/30",
    note: "Animal or cell-culture data; no human equivalent published.",
  },
  community: {
    label: "Community",
    hue: "text-ink/70 bg-ink/[0.06] border-ink/25",
    note: "Forum-reported and anecdotal — signal, not evidence.",
  },
} as const;

function Grade({ g }: { g: keyof typeof GRADES }) {
  const meta = GRADES[g];
  return (
    <span
      title={meta.note}
      className={`inline-flex items-center rounded-full border px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide ${meta.hue}`}
    >
      {meta.label}
    </span>
  );
}

function GradeLegend() {
  const order: (keyof typeof GRADES)[] = ["reference", "clinical", "preclinical", "community"];
  return (
    <dl className="grid gap-3 rounded-2xl border border-ink/10 bg-panel/40 p-5 sm:grid-cols-2">
      {order.map((g) => (
        <div key={g} className="flex items-baseline gap-2.5">
          <dt className="shrink-0">
            <Grade g={g} />
          </dt>
          <dd className="text-[13px] leading-5 text-ink/60">{GRADES[g].note}</dd>
        </div>
      ))}
    </dl>
  );
}

const MONO = "var(--font-geist-mono), monospace";
const SANS = "var(--font-space-grotesk), sans-serif";

/* ── Phase 2, 48 weeks: every arm as a bar ─────────────────────────────────
   The efficacy-estimand means from the Lancet paper, placebo first. The
   figure's point is the dose–response and the size of the top bar relative
   to a GLP-1 receptor that is not in the molecule.                          */
function Phase2Figure() {
  const arms: [string, number][] = [
    ["Placebo", 0.4],
    ["1 mg", 9],
    ["3 mg", 12],
    ["3→9 mg", 16],
    ["6 mg", 18],
    ["6→9 mg", 20],
    ["9 mg", 20],
  ];
  const W = 600, H = 250, left = 92, top = 24, rowH = 28, maxPct = 22, barW = W - left - 70;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Mean percent body-weight change at 48 weeks in the eloralintide phase 2 trial: placebo −0.4%, 1 mg −9%, 3 mg −12%, 3 to 9 mg escalation −16%, 6 mg −18%, 6 to 9 mg escalation −20%, 9 mg −20%">
        {arms.map(([label, pct], i) => {
          const y = top + i * rowH;
          const w = (pct / maxPct) * barW;
          const placebo = i === 0;
          return (
            <g key={label}>
              <text x={left - 10} y={y + 15} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.7" fontSize="12" fontFamily={MONO}>{label}</text>
              <rect x={left} y={y + 3} width={Math.max(w, 2)} height="18" rx="4" fill={placebo ? "var(--color-ink)" : "var(--accent)"} fillOpacity={placebo ? 0.18 : 0.75} />
              <text x={left + Math.max(w, 2) + 8} y={y + 16} fill="var(--color-ink)" fillOpacity="0.8" fontSize="12" fontWeight="600" fontFamily={MONO}>−{pct}%</text>
            </g>
          );
        })}
        <text x={left} y={H - 10} fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily={MONO} style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          mean weight change · week 48 · n=263 · no GLP-1 receptor activity
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Eloralintide phase 2, efficacy estimand. The two 20% bars are the number the field noticed.
      </figcaption>
    </figure>
  );
}

/* ── CTR dressed three ways, and where eloralintide prefers to bind ───────
   One core receptor (CTR) shown bare and clamped to RAMP1/2/3. The bars
   under each give the drug's relative potency from the discovery paper:
   AMY1 is the target, CTR and AMY3 are ~12× and ~11× weaker.               */
function ReceptorSelectivityFigure() {
  const W = 600, membraneY = 118;
  const panels = [
    { cx: 90, label: "CTR alone", sub: "calcitonin receptor", ramp: null as string | null, rel: 1 / 12, hue: "var(--accent-blue)" },
    { cx: 232, label: "AMY1", sub: "CTR + RAMP1", ramp: "RAMP1", rel: 1, hue: "var(--accent)" },
    { cx: 374, label: "AMY2", sub: "CTR + RAMP2", ramp: "RAMP2", rel: null as number | null, hue: "var(--accent-teal)" },
    { cx: 516, label: "AMY3", sub: "CTR + RAMP3", ramp: "RAMP3", rel: 1 / 11, hue: "var(--accent-teal)" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} 250`} className="w-full" role="img" aria-label="The calcitonin receptor alone, and clamped to RAMP1, RAMP2 or RAMP3 to form the amylin-1, amylin-2 and amylin-3 receptors. Eloralintide is about twelve times more potent at the amylin-1 receptor than at the bare calcitonin receptor and about eleven times more potent than at the amylin-3 receptor; the amylin-2 figure was not reported.">
        <line x1="20" y1={membraneY} x2={W - 20} y2={membraneY} stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1.5" />
        <line x1="20" y1={membraneY + 8} x2={W - 20} y2={membraneY + 8} stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1.5" />
        {panels.map((p) => (
          <g key={p.label}>
            <rect x={p.cx - 18} y={membraneY - 30} width="36" height="60" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5" />
            <text x={p.cx} y={membraneY + 4} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="11" fontWeight="600" fontFamily={SANS}>CTR</text>
            {p.ramp && (
              <>
                <rect x={p.cx + 18} y={membraneY - 20} width="18" height="50" rx="5" fill={p.hue} fillOpacity="0.22" stroke={p.hue} strokeOpacity="0.6" strokeWidth="1.5" />
                <text x={p.cx + 27} y={membraneY + 44} textAnchor="middle" fill={p.hue} fontSize="9" fontWeight="600" fontFamily={MONO}>{p.ramp}</text>
              </>
            )}
            <text x={p.cx} y="34" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.9" fontSize="14" fontWeight="600" fontFamily={SANS}>{p.label}</text>
            <text x={p.cx} y="50" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="10" fontFamily={MONO}>{p.sub}</text>
            {/* relative potency bar */}
            <rect x={p.cx - 40} y="196" width="80" height="8" rx="4" fill="var(--color-ink)" fillOpacity="0.06" />
            {p.rel != null ? (
              <rect x={p.cx - 40} y="196" width={Math.max(80 * p.rel, 4)} height="8" rx="4" fill={p.hue} fillOpacity="0.85" />
            ) : null}
            <text x={p.cx} y="222" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="10" fontFamily={MONO}>
              {p.rel == null ? "not reported" : p.rel === 1 ? "target · 1×" : `~${Math.round(1 / p.rel)}× weaker`}
            </text>
          </g>
        ))}
        <text x="20" y="178" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily={MONO} style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          eloralintide potency · human receptors · cAMP assay
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        One receptor protein, three accessory hats. Eloralintide was tuned to the first hat.
      </figcaption>
    </figure>
  );
}

/* ── The 37-residue chain and its four engineered edits ───────────────────
   Schematic, not a sequence map: beads for residues, the N-terminal loop
   drawn closed, and the three chemical interventions called out where the
   registry record and the discovery paper place them.                       */
function ChainEditsFigure() {
  const W = 600, y = 120, x0 = 40, step = 14, n = 37;
  const beads = Array.from({ length: n }, (_, i) => ({ i: i + 1, x: x0 + i * step }));
  const bx = (i: number) => x0 + (i - 1) * step;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} 250`} className="w-full" role="img" aria-label="Schematic of eloralintide's 37-residue chain: a closed loop between residues 2 and 7 held by a methylene-thioacetal bridge instead of a disulfide, backbone-methylated residues in the middle of the chain, a C20 fatty-diacid tail on a lysine at position 26 via two gamma-glutamate spacers, and an amidated tyrosine at the C-terminus">
        {/* backbone */}
        <line x1={bx(1)} y1={y} x2={bx(n)} y2={y} stroke="var(--color-ink)" strokeOpacity="0.2" strokeWidth="2" />
        {/* loop 2–7 */}
        <path d={`M ${bx(2)} ${y} Q ${(bx(2) + bx(7)) / 2} ${y - 48} ${bx(7)} ${y}`} fill="none" stroke="var(--accent-amber)" strokeWidth="2" strokeOpacity="0.8" />
        <rect x={(bx(2) + bx(7)) / 2 - 22} y={y - 36} width="44" height="16" rx="8" fill="var(--surface)" stroke="var(--accent-amber)" strokeOpacity="0.6" strokeWidth="1" />
        <text x={(bx(2) + bx(7)) / 2} y={y - 24} textAnchor="middle" fill="var(--accent-amber)" fontSize="9" fontWeight="700" fontFamily={MONO}>S–CH₂–S</text>
        <text x={(bx(2) + bx(7)) / 2} y={y - 58} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="10" fontFamily={MONO}>thioacetal, not disulfide</text>
        {/* beads */}
        {beads.map((b) => {
          const special = b.i === 26 ? "var(--accent)" : b.i === 2 || b.i === 7 ? "var(--accent-amber)" : b.i === 37 ? "var(--accent-teal)" : null;
          return <circle key={b.i} cx={b.x} cy={y} r={special ? 5.5 : 4} fill={special ?? "var(--color-ink)"} fillOpacity={special ? 0.9 : 0.25} />;
        })}
        {/* backbone methyls — positions are schematic */}
        {[15, 20].map((i) => (
          <g key={i}>
            <line x1={bx(i)} y1={y - 6} x2={bx(i)} y2={y - 22} stroke="var(--accent-blue)" strokeWidth="1.5" strokeOpacity="0.8" />
            <text x={bx(i)} y={y - 27} textAnchor="middle" fill="var(--accent-blue)" fontSize="9" fontWeight="700" fontFamily={MONO}>CH₃</text>
          </g>
        ))}
        <text x={bx(17)} y={y - 44} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.6" fontSize="10" fontFamily={MONO}>non-coded, methylated residues</text>
        {/* fatty diacid on Lys26 */}
        <line x1={bx(26)} y1={y + 6} x2={bx(26)} y2={y + 36} stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.8" />
        <circle cx={bx(26)} cy={y + 44} r="5" fill="var(--accent)" fillOpacity="0.5" />
        <circle cx={bx(26)} cy={y + 58} r="5" fill="var(--accent)" fillOpacity="0.5" />
        <text x={bx(26) + 10} y={y + 55} fill="var(--color-ink)" fillOpacity="0.55" fontSize="9" fontFamily={MONO}>2 × γGlu</text>
        <path d={`M ${bx(26)} ${y + 64} q 8 10 0 20 q -8 10 0 20 q 8 10 0 20`} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeOpacity="0.85" strokeLinecap="round" />
        <text x={bx(26) + 12} y={y + 100} fill="var(--accent)" fontSize="10" fontWeight="700" fontFamily={MONO}>C20 diacid → albumin</text>
        <text x={bx(26)} y={y + 20} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.6" fontSize="10" fontFamily={MONO} dx="-8">Lys26</text>
        {/* C-term */}
        <text x={bx(37)} y={y + 22} textAnchor="middle" fill="var(--accent-teal)" fontSize="9" fontWeight="700" fontFamily={MONO}>Tyr-NH₂</text>
        <text x={bx(1)} y={y + 22} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="9" fontFamily={MONO}>N</text>
        <text x={20} y={240} textAnchor="start" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily={MONO} style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          37 aa · C201H319N49O65S2 · ~4,526 Da
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Amylin&rsquo;s chain with the drug&rsquo;s four edits. Methyl positions are schematic; the ring, the tail and the terminus are as the registry record reads.
      </figcaption>
    </figure>
  );
}

/* ── Half-life ladder: the amylin axis from minutes to a fortnight ────────
   Log scale, so native amylin and eloralintide fit on one rail.             */
function HalfLifeLadder() {
  const rungs: [string, number, string][] = [
    ["Native amylin", 13, "~13 min"],
    ["Pramlintide", 48, "~48 min"],
    ["Cagrilintide", 177 * 60, "~7 days"],
    ["Eloralintide", 338 * 60, "~14 days"],
  ];
  const W = 600, H = 190, left = 110, right = 70, railY = 108;
  const lo = Math.log10(5), hi = Math.log10(60 * 24 * 20);
  const X = (min: number) => left + ((Math.log10(min) - lo) / (hi - lo)) * (W - left - right);
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Circulating half-life of the amylin axis on a logarithmic scale: native amylin about 13 minutes, pramlintide about 48 minutes, cagrilintide about 7 days, eloralintide about 14 days">
        <line x1={left} y1={railY} x2={W - right} y2={railY} stroke="var(--color-ink)" strokeOpacity="0.15" strokeWidth="2" />
        {[["10 min", 10], ["1 h", 60], ["1 day", 1440], ["1 week", 10080]].map(([l, m]) => (
          <g key={l as string}>
            <line x1={X(m as number)} y1={railY - 5} x2={X(m as number)} y2={railY + 5} stroke="var(--color-ink)" strokeOpacity="0.25" />
            <text x={X(m as number)} y={railY - 12} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily={MONO}>{l}</text>
          </g>
        ))}
        {rungs.map(([name, min, label], i) => {
          const x = X(min), up = i % 2 === 0, ty = up ? railY - 40 : railY + 52;
          const lit = name === "Eloralintide";
          return (
            <g key={name}>
              <line x1={x} y1={railY} x2={x} y2={up ? ty + 14 : ty - 24} stroke={lit ? "var(--accent)" : "var(--color-ink)"} strokeOpacity={lit ? 0.7 : 0.25} />
              <circle cx={x} cy={railY} r={lit ? 7 : 5} fill={lit ? "var(--accent)" : "var(--color-ink)"} fillOpacity={lit ? 0.9 : 0.35} />
              <text x={x} y={ty} textAnchor="middle" fill={lit ? "var(--accent)" : "var(--color-ink)"} fillOpacity={lit ? 1 : 0.8} fontSize="12" fontWeight="600" fontFamily={SANS}>{name}</text>
              <text x={x} y={ty + (up ? -14 : 14)} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10" fontFamily={MONO}>{label}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The amylin axis on a log scale. Three prolines bought nothing in time; one fatty acid bought a week; the full rebuild bought two.
      </figcaption>
    </figure>
  );
}

/* ── EloraTZP phase 2b: the arms that make the arithmetic ─────────────────
   Four bars from the press release: tirzepatide alone, eloralintide alone
   at the dose used in the top combination, and the combination. Placebo
   for scale.                                                                */
function EloraTzpFigure() {
  const arms: [string, number, string][] = [
    ["Placebo", 3.0, "var(--color-ink)"],
    ["Eloralintide 9 mg", 11.1, "var(--accent)"],
    ["Tirzepatide 15 mg", 14.8, "var(--accent-blue)"],
    ["Elora 6 + TZP 10", 19.9, "var(--accent-teal)"],
    ["Elora 9 + TZP 15", 23.3, "var(--accent-teal)"],
  ];
  const W = 600, H = 210, left = 150, top = 22, rowH = 30, maxPct = 26, barW = W - left - 80;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Mean percent weight change at 48 weeks in the EloraTZP phase 2b trial in obesity with type 2 diabetes: placebo −3.0%, eloralintide 9 mg −11.1%, tirzepatide 15 mg −14.8%, eloralintide 6 mg plus tirzepatide 10 mg −19.9%, eloralintide 9 mg plus tirzepatide 15 mg −23.3%">
        {arms.map(([label, pct, hue], i) => {
          const y = top + i * rowH, w = (pct / maxPct) * barW, placebo = i === 0;
          return (
            <g key={label}>
              <text x={left - 10} y={y + 15} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.7" fontSize="12" fontFamily={MONO}>{label}</text>
              <rect x={left} y={y + 3} width={w} height="18" rx="4" fill={hue} fillOpacity={placebo ? 0.18 : 0.75} />
              <text x={left + w + 8} y={y + 16} fill="var(--color-ink)" fillOpacity="0.8" fontSize="12" fontWeight="600" fontFamily={MONO}>−{pct}%</text>
            </g>
          );
        })}
        <text x={left} y={H - 10} fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily={MONO} style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          week 48 · obesity + type 2 diabetes · n=367 · press release, unpublished
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two receptor families, less than fully additive, and still the largest number yet in type 2 diabetes.
      </figcaption>
    </figure>
  );
}
