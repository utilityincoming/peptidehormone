import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-guts-full-report")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "Gut Hormones and Appetite: How PYY, CCK, GLP-1 and the Satiety Signals Work — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "Gut Hormones and Appetite: PYY, CCK, GLP-1 and the Satiety Signals · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  batterham: "https://pubmed.ncbi.nlm.nih.gov/12167864/", // Batterham et al. 2002, Nature — PYY3-36 physiologically inhibits food intake
  moran: "https://pubmed.ncbi.nlm.nih.gov/19363513/", // Moran & Dailey 2009, Int J Obes — gut peptides in the control of food intake
  ilealbrake: "https://pubmed.ncbi.nlm.nih.gov/18081667/", // Maljaars et al. 2007, Aliment Pharmacol Ther — GI neuroendocrine regulation of satiety
  bypass06: "https://pubmed.ncbi.nlm.nih.gov/16371744/", // le Roux et al. 2006, Ann Surg — gut hormone profiles after bariatric surgery favor anorexia
  bypass07: "https://pubmed.ncbi.nlm.nih.gov/17968169/", // le Roux et al. 2007, Ann Surg — gut hormones mediate appetite/weight loss after RYGB
  gop: "https://pubmed.ncbi.nlm.nih.gov/31177183/", // Behary et al. 2019, Diabetes Care — combined GLP-1 + oxyntomodulin + PYY infusion
  medbypass: "https://pubmed.ncbi.nlm.nih.gov/33551994/", // Dischinger et al. 2020, Front Endocrinol — liraglutide + PYY(3-36) "medical gastric bypass"
  secretinRct: "https://pubmed.ncbi.nlm.nih.gov/10588965/", // Sandler et al. 1999, NEJM — no benefit of single-dose secretin in autism
  secretinReview: "https://pubmed.ncbi.nlm.nih.gov/15590241/", // Sturmey 2005, Res Dev Disabil — secretin ineffective across 15 double-blind trials
  motilin: "https://pubmed.ncbi.nlm.nih.gov/30789939/", // Kato et al. 2019, PLoS One — human motilin and erythromycin gastric motility
  sanger: "https://pubmed.ncbi.nlm.nih.gov/24438586/", // Sanger et al. 2014, Neurogastroenterol Motil — ghrelin & motilin receptor agonists
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What are the main gut hormones that control appetite?",
    a: "The appetite-relevant gut peptides are released on a schedule around a meal. CCK comes first, within minutes of fat and protein reaching the duodenum, contracting the gallbladder and signaling early satiety. GLP-1 and PYY are released together further down the intestine, from L-cells, and produce the fuller, longer satiety signal plus the slowing of gastric emptying known as the ileal brake. Secretin handles acid rather than appetite, and motilin runs between-meal motility. Appetite is answered by the whole sequence, not by any single 'fullness hormone.'",
  },
  {
    q: "Are GLP-1 and PYY related?",
    a: "They come from the same cell. The intestinal L-cell co-secretes GLP-1 and PYY after a meal. They are read differently: GLP-1 acts through its own class B receptor, while circulating PYY is trimmed to PYY3-36 and acts at Y2 receptors on the hypothalamic appetite circuits. The blockbuster incretin drugs copied GLP-1; PYY reduces appetite through a second, independent pathway, which is why combining them is an active drug-development strategy rather than a redundancy.",
  },
  {
    q: "Why does bariatric surgery cause weight loss beyond restriction?",
    a: "Much of it is hormonal, not mechanical. Gastric bypass and sleeve gastrectomy deliver nutrients to the L-cell-rich distal gut faster and in greater quantity, and the post-meal release of GLP-1 and PYY rises several-fold, meal after meal. Blocking those gut hormones after surgery attenuates the appetite suppression. Surgery does not add a drug; it amplifies the gut's own enteroendocrine report to a volume ordinary meals never reach.",
  },
  {
    q: "Can combining gut hormones work better than GLP-1 alone?",
    a: "That is the leading hypothesis of the field, and early data support it. A controlled infusion of GLP-1, oxyntomodulin and PYY together, designed to mimic the post-bypass hormone profile, improved body weight and glycemia. Preclinical and early-clinical programs pair a GLP-1 agonist with a PYY3-36 analog under an explicit 'medical gastric bypass' banner. The direction is well-founded in mechanism, but the finished multi-peptide medicines are still in development, and single-hormone limitations such as nausea and short half-life have to be solved.",
  },
  {
    q: "What does CCK do, and why isn't it a weight-loss drug?",
    a: "CCK couples the arrival of food to digestion: it contracts the gallbladder, triggers pancreatic enzyme release, and signals early satiety through the vagus nerve. It was one of the first gut peptides tied to meal-ending fullness, so on paper it looks like an appetite drug. In practice native CCK lasts only minutes, and sustained CCK-receptor stimulation runs into tachyphylaxis and gallbladder effects. It is the family's clearest lesson that a real satiety signal is not automatically a usable drug.",
  },
  {
    q: "Why is secretin famous, and why did secretin for autism fail?",
    a: "Secretin was the first hormone ever discovered, in 1902, and it gave the word 'hormone' its meaning. Its trigger is duodenal acid, which it answers by calling for pancreatic bicarbonate. In the late 1990s it became a sensation as a proposed autism treatment on the strength of a few anecdotes; when tested properly, a string of randomized, double-blind trials found no benefit at all. It is a clean parable for evidence-grading: the molecule was real, the mechanism was misapplied, and only the controlled test could tell the difference.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(45,212,168,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/gut-appetite" className="text-accent-teal hover:text-ink">
                Gut &amp; appetite
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
            <Section title="The largest endocrine organ never looks like one">
              <P>
                The pancreas gets the credit and the brain gets the headlines, but
                the largest endocrine organ in the body is the one that never looks
                like a gland: the gut. Scattered through its lining are
                enteroendocrine cells, each a chemical sensor that tastes what you
                ate and answers in peptides. Together they outnumber every classical
                endocrine gland combined. After a meal, that lining files a report.
                It says what arrived, in what order, how far along digestion has run,
                and how hard the brain should push back on the next bite.
              </P>
              <P>
                For a decade the world has been reading one line of that report very
                closely.{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link>, released
                from the gut after eating, became the molecule behind the era&rsquo;s
                defining metabolic drugs. But GLP-1 was never a soloist. It is one
                voice in a coordinated chorus, co-released with others, timed against
                the meal, and answered by the brain as a whole. What follows is a
                reference read of the rest of the report: the family of gut and
                appetite peptides the incretin era only partly borrowed.
              </P>
            </Section>

            <Section title="A report sent on a schedule">
              <P>
                The gut&rsquo;s signals are not a single &ldquo;full&rdquo; alarm.
                They are sequenced, each tied to a stage of the meal.{" "}
                <Link href="/hormones/cck" className={LINK}>CCK</Link> goes first.
                Within minutes of fat and protein reaching the duodenum, I-cells
                release it, and it does three jobs at once: it contracts the
                gallbladder, triggers pancreatic enzyme secretion, and signals early
                satiety through the vagus nerve (
                <a href={REF.moran} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Moran &amp; Dailey, Int. J. Obes., 2009
                </a>
                ). CCK is the peptide that couples the arrival of food to the
                machinery that digests it.
              </P>
              <P>
                Acid gets its own messenger. As the stomach&rsquo;s contents turn the
                duodenum acidic,{" "}
                <Link href="/hormones/secretin" className={LINK}>secretin</Link>{" "}
                is released from S-cells and calls for bicarbonate from the pancreas
                and bile ducts, neutralizing the acid and setting the pH that
                digestive enzymes need. Then, further along the intestine, the meal
                reaches the L-cells, and this is where the report&rsquo;s most
                consequential lines are written. As nutrients arrive in the distal
                gut, L-cells release GLP-1 and{" "}
                <Link href="/hormones/pyy" className={LINK}>PYY</Link> together,
                slowing everything upstream and reporting fullness. Physiologists
                call the effect the <Em>ileal brake</Em>: nutrients reaching the far
                intestine feed back to slow proximal transit and curb further eating
                (
                <a href={REF.ilealbrake} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Maljaars et&nbsp;al., 2007
                </a>
                ).
              </P>
              <P>
                One peptide runs on the opposite schedule.{" "}
                <Link href="/hormones/motilin" className={LINK}>Motilin</Link> fires
                between meals, in the fasted state, pacing the migrating motor
                complex: the rhythmic housekeeping wave that sweeps residue through
                the gut once digestion is done. It is the report&rsquo;s timekeeper
                rather than its satiety signal, and it is the reason an empty gut is
                not a quiet one.
              </P>
              <ReportTimeline />
            </Section>

            <Section title="The same cell, two messages">
              <P>
                Here is the fact the blockbuster era quietly rests on:{" "}
                <Em>GLP-1 and PYY come from the same cell.</Em> The intestinal L-cell
                co-secretes both after a meal, the incretin the drugs copied and a
                satiety peptide the drugs mostly left behind. They are released
                together but read differently. GLP-1 acts through its own class B
                receptor. Circulating PYY is trimmed by the same DPP-4 enzyme that
                degrades GLP-1 into its active PYY3-36 form, which acts at Y2
                receptors on the appetite circuits of the hypothalamus, a different
                receptor on a different arm of the same system.
              </P>
              <P>
                That difference is the whole point. When Batterham and colleagues
                infused PYY3-36 into people at levels the body reaches after a meal,
                it reduced food intake at the next meal by roughly a third, a genuine
                physiological satiety signal working independently of GLP-1 (
                <a href={REF.batterham} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Batterham et&nbsp;al., Nature, 2002
                </a>
                ). Two messages, one cell, two separate doors into satiety. The drug
                industry walked confidently through the GLP-1 door and, for years,
                left the PYY one mostly shut.
              </P>
              <Callout label="The engineering read">
                A molecule that suppresses appetite through a second, independent
                receptor is not redundant with GLP-1. It is stackable. Two satiety
                signals that converge on the same outcome by different routes can, in
                principle, add rather than overlap. That single observation is the
                seed of most of the frontier below.
              </Callout>
            </Section>

            <Section title="The proof was surgery all along">
              <P>
                If the chorus theory needed a proof of concept, it already had one,
                and it came from the operating room rather than the lab. Bariatric
                surgery produces weight loss far beyond what mechanical restriction
                can explain, and the mechanism turned out to be largely hormonal. By
                rerouting or reshaping the gut, surgery delivers nutrients to the
                L-cell-rich distal intestine faster and in far greater quantity, and
                the post-meal chorus rises dramatically: GLP-1 and PYY together,
                several-fold, meal after meal (
                <a href={REF.bypass06} target="_blank" rel="noopener noreferrer" className={LINK}>
                  le&nbsp;Roux et&nbsp;al., Ann. Surg., 2006
                </a>
                ;{" "}
                <a href={REF.bypass07} target="_blank" rel="noopener noreferrer" className={LINK}>
                  2007
                </a>
                ).
              </P>
              <P>
                The elegant confirmation is the subtraction experiment: block those
                gut hormones after surgery and the appetite suppression eases. The
                weight loss that once looked purely mechanical is, in substantial
                part, the body running its own enteroendocrine report at a volume it
                never reaches on an ordinary plate. Surgery does not add a drug. It
                turns up the chorus.
              </P>
              <Callout label="The benchmark">
                Read the incretin drugs against that standard and the ambition comes
                into focus. A once-weekly GLP-1 agonist is a chemical attempt to
                reproduce, with a single peptide, what surgery does with the whole
                report. It works, which is genuinely remarkable, but it is playing
                one line of a score the gut performs in full.
              </Callout>
            </Section>

            <Section title="Rebuilding the chorus in a vial">
              <P>
                So the real frontier is not &ldquo;a better GLP-1.&rdquo; It is adding
                the other voices back. The cleanest demonstration is a controlled
                infusion: give people GLP-1, oxyntomodulin and PYY together, the
                combination built to mimic the post-bypass hormone profile, and body
                weight and glycemia improve in a way modeled on surgery rather than on
                any one receptor (
                <a href={REF.gop} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Behary et&nbsp;al., Diabetes Care, 2019
                </a>
                ). It is direct evidence that the combination, not any single hormone,
                is the lever.
              </P>
              <P>
                The translational versions follow the same logic. Preclinical and
                early-clinical work pairs a GLP-1 agonist with a PYY3-36 analog under
                an explicit banner, a &ldquo;medical gastric bypass,&rdquo; aiming to
                reconstruct the two-peptide L-cell signal pharmacologically (
                <a href={REF.medbypass} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Dischinger et&nbsp;al., 2020
                </a>
                ). It sits alongside the amylin story this reference has told before:{" "}
                <Link href="/insights/insulins-forgotten-twin" className={LINK}>
                  pramlintide and cagrilintide
                </Link>{" "}
                reach satiety through the area postrema, a different door again, which
                is why amylin-plus-GLP-1 combinations stack rather than duplicate.
                Every one of these programs is the same move: restore a signal the gut
                sends for free that a single-agonist drug leaves out (see also{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>the triple agonist</Link>{" "}
                and{" "}
                <Link href="/insights/is-there-a-glp-4" className={LINK}>is there a GLP-4?</Link>
                ).
              </P>
              <P>
                The scepticism the page owes: none of this is a solved combination
                yet, and the gut&rsquo;s report has resisted bottling for good reasons.
                PYY analogs have struggled with nausea and with the same short
                half-life that limited the native peptide. &ldquo;Mimics bariatric
                surgery&rdquo; is a mechanism claim, not an outcome guarantee, and the
                infusion studies are small and short. The honest statement is that the
                direction is well-founded, because the chorus is real, surgery proves
                it, and the biology says the voices should add, while the finished
                multi-peptide drugs are still being written.
              </P>
            </Section>

            <Section title="CCK, secretin, motilin: the rest of the report">
              <P>
                The three peptides the drug frontier has mostly passed over are worth
                reading on their own, because each teaches something the GLP-1 story
                does not.{" "}
                <Link href="/hormones/cck" className={LINK}>CCK</Link> was the first
                gut peptide tied to meal-ending satiety, and on paper it looks like an
                appetite drug waiting to happen. It never became one: native CCK lasts
                only minutes, and sustained CCK-receptor stimulation runs into
                tachyphylaxis and gallbladder effects. Its lesson is the one the whole
                family keeps repeating, that a real satiety signal is not
                automatically a usable drug.
              </P>
              <P>
                <Link href="/hormones/secretin" className={LINK}>Secretin</Link>{" "}
                carries the field&rsquo;s founding story. It was the first hormone ever
                discovered, the molecule that gave &ldquo;hormone&rdquo; its meaning
                when Bayliss and Starling showed in 1902 that a chemical messenger
                carried in the blood, not a nerve, drove the pancreas to answer
                duodenal acid. It also carries a cautionary one. In the late 1990s
                secretin became a sensation as a proposed autism treatment on the
                strength of a few anecdotes; when it was finally tested properly, a
                string of randomized, double-blind trials found no benefit at all (
                <a href={REF.secretinRct} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sandler et&nbsp;al., NEJM, 1999
                </a>
                ;{" "}
                <a href={REF.secretinReview} target="_blank" rel="noopener noreferrer" className={LINK}>
                  reviewed across fifteen controlled trials, 2005
                </a>
                ). The molecule was real, the mechanism was misapplied, and only the
                controlled test could tell the difference.
              </P>
              <P>
                <Link href="/hormones/motilin" className={LINK}>Motilin</Link>, finally,
                is the one that never touches satiety at all, and yet it is quietly the
                most &ldquo;drugged&rdquo; of the three, by accident. Certain macrolide
                antibiotics, erythromycin chief among them, happen to be
                motilin-receptor agonists, which is why a dose of erythromycin can
                jump-start a stalled stomach and why it is used off-label for
                gastroparesis (
                <a href={REF.motilin} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kato et&nbsp;al., 2019
                </a>
                ;{" "}
                <a href={REF.sanger} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sanger et&nbsp;al., 2014
                </a>
                ). The between-meal timekeeper turned out to carry a pharmacology no
                one designed.
              </P>
            </Section>

            <Section title="Reading the whole sentence">
              <P>
                Step back and the gut looks less like plumbing and more like a sensory
                organ that writes to the brain in a language of peptides. It reports on
                every meal, what arrived and how acidic and how far along, in a
                vocabulary the body coordinates in time. The incretin era&rsquo;s
                achievement was to read one word of that language clearly enough to
                build a medicine on it. The next era&rsquo;s ambition, visible in the
                surgery data and the combination programs, is to read the sentence.
              </P>
              <Bullets
                items={[
                  ["The gut is an endocrine organ, and it sends a timed report", "CCK at the start of the meal, secretin for acid, GLP-1 and PYY from the distal L-cells for satiety and the ileal brake, motilin between meals. Appetite is answered by the whole sequence, not one signal."],
                  ["GLP-1 and PYY share a cell but not a receptor", "The L-cell co-secretes both; the drugs copied GLP-1 and left PYY, which suppresses appetite through the independent Y2 pathway. A second, stackable door into satiety."],
                  ["Surgery is the proof that the chorus, not the solo, drives appetite", "Gastric bypass raises the whole post-meal peptide profile several-fold, and blocking those hormones eases the effect. A single-agonist drug reproduces one line of what surgery performs in full."],
                  ["The frontier is rebuilding the report, not perfecting one peptide", "GLP-1-plus-PYY 'medical bypass' pairs, tri-hormone GOP infusions, amylin stacks: each adds back a signal the gut sends for free. Well-founded in mechanism, not yet finished as medicine."],
                  ["A real satiety signal is not automatically a drug", "CCK's short life and tachyphylaxis, PYY's nausea, secretin's famous null trials in autism. The family is a catalog of why the gut's own report is hard to bottle, and why the controlled test is the only arbiter."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/pyy" label="Peptide YY reference (the co-secreted satiety signal)" />
                <CrossLink href="/hormones/cck" label="Cholecystokinin reference (the first responder)" />
                <CrossLink href="/hormones/secretin" label="Secretin reference (the first hormone discovered)" />
                <CrossLink href="/hormones/motilin" label="Motilin reference (the between-meal timekeeper)" />
                <CrossLink href="/families/gut-appetite" label="The gut & appetite family" />
                <CrossLink href="/hormones/glp-1" label="GLP-1 reference (the line the drugs read)" />
                <CrossLink href="/insights/insulins-forgotten-twin" label="Amylin — a different door into satiety" />
                <CrossLink href="/research?q=How%20do%20GLP-1%20and%20PYY%20co-secreted%20from%20intestinal%20L-cells%20work%20together%2C%20and%20what%20is%20the%20evidence%20for%20combination%20gut-hormone%20therapy%20mimicking%20bariatric%20surgery%3F" label="Ask the research agent about the gut-hormone chorus" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not
              medical advice, dosing guidance, or a recommendation to use any compound.
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

/* ── The enteroendocrine report, sequenced against one meal ── */
function ReportTimeline() {
  const W = 660;
  const H = 320;
  const plotL = 150;
  const plotR = 630;
  const mealX = 210;
  const fastBackX = 500;
  const axisY = 272;
  const barH = 22;
  // row centers (top of each bar)
  const row = [64, 108, 152, 196, 240];

  const gutter = (y: number, label: string) => (
    <text x={138} y={y + barH / 2 + 4} textAnchor="end" fill="var(--color-ink)" fillOpacity={0.85} fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
      {label}
    </text>
  );

  const bar = (x1: number, x2: number, y: number, kind: "teal" | "blue" | "bluedim" | "mute") => {
    const map = {
      teal: { fill: "color-mix(in srgb, var(--accent-teal) 22%, transparent)", stroke: "var(--accent-teal)", so: 0.7 },
      blue: { fill: "color-mix(in srgb, var(--accent-blue) 20%, transparent)", stroke: "var(--accent-blue)", so: 0.65 },
      bluedim: { fill: "color-mix(in srgb, var(--accent-blue) 12%, transparent)", stroke: "var(--accent-blue)", so: 0.45 },
      mute: { fill: "color-mix(in srgb, var(--color-ink) 7%, transparent)", stroke: "var(--color-ink)", so: 0.28 },
    }[kind];
    return <rect x={x1} y={y} width={x2 - x1} height={barH} rx={7} fill={map.fill} stroke={map.stroke} strokeOpacity={map.so} strokeWidth={1.1} />;
  };

  const role = (x: number, y: number, text: string) => (
    <text x={x} y={y + barH / 2 + 4} fill="var(--color-ink)" fillOpacity={0.55} fontSize="11.5">
      {text}
    </text>
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A timeline of the gut's peptides relative to one meal. Motilin is active only between meals, sweeping the fasted gut. At the meal, CCK fires first from the duodenum for gallbladder, enzymes and early satiety, and secretin answers acid with bicarbonate. Later, GLP-1 and PYY are released together from the same distal L-cells, producing satiety and slowed gastric emptying, the ileal brake. The incretin drugs amplify one line of this report."
      >
        <text x={(plotL + plotR) / 2} y={26} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          When each signal fires, relative to a meal
        </text>

        {/* meal marker + fasting-return marker */}
        <line x1={mealX} y1={44} x2={mealX} y2={axisY} stroke="var(--color-ink)" strokeOpacity={0.28} strokeWidth={1.4} strokeDasharray="4 4" />
        <text x={mealX} y={40} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.6} fontSize="11" fontWeight="700" letterSpacing="0.06em">
          MEAL
        </text>
        <line x1={fastBackX} y1={52} x2={fastBackX} y2={axisY} stroke="var(--color-ink)" strokeOpacity={0.14} strokeWidth={1.2} strokeDasharray="3 5" />

        {/* rows */}
        {gutter(row[0], "Motilin")}
        {bar(plotL, 205, row[0], "mute")}
        {bar(fastBackX + 5, plotR, row[0], "mute")}
        {role(320, row[0], "between-meal sweep (MMC)")}

        {gutter(row[1], "CCK")}
        {bar(214, 272, row[1], "blue")}
        {role(282, row[1], "gallbladder · enzymes · early satiety")}

        {gutter(row[2], "Secretin")}
        {bar(214, 264, row[2], "bluedim")}
        {role(274, row[2], "acid in → bicarbonate out")}

        {gutter(row[3], "GLP-1")}
        {bar(246, 430, row[3], "teal")}

        {gutter(row[4], "PYY")}
        {bar(246, 430, row[4], "teal")}

        {/* bracket grouping GLP-1 + PYY as the same L-cell */}
        <path
          d={`M 438 ${row[3] + 2} h 7 V ${row[4] + barH - 2} h -7`}
          fill="none"
          stroke="var(--accent-teal)"
          strokeOpacity={0.7}
          strokeWidth={1.3}
        />
        <text x={452} y={row[3] + barH / 2 + 2} fill="var(--accent-teal)" fontSize="11.5" fontWeight="600">
          the same L-cells
        </text>
        <text x={452} y={row[4] + barH / 2 + 2} fill="var(--color-ink)" fillOpacity={0.55} fontSize="11.5">
          satiety + slowed emptying
        </text>

        {/* axis + phase labels */}
        <line x1={plotL} y1={axisY} x2={plotR} y2={axisY} stroke="var(--color-ink)" strokeOpacity={0.2} strokeWidth={1} />
        <text x={180} y={292} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="11">fasting</text>
        <text x={355} y={292} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="11">after the meal →</text>
        <text x={565} y={292} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="11">fasting</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The gut&rsquo;s peptides are sequenced against the meal: CCK and secretin at the
        start, GLP-1 and PYY together from the distal L-cells, motilin between meals. The
        drugs of the incretin era amplify one line of this report.
      </figcaption>
    </figure>
  );
}
