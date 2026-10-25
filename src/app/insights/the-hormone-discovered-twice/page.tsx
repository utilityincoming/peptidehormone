import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-hormone-discovered-twice")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What is Leptin? The Fat Hormone, Leptin Resistance, and Why It Wasn't the Cure — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Hormone Discovered Twice: Leptin, the Fat Signal That Wasn't a Weight-Loss Drug · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  zhang: "https://doi.org/10.1038/372425a0", // Zhang et al. 1994, Nature — positional cloning of the mouse ob gene and its human homolog
  halaas: "https://pubmed.ncbi.nlm.nih.gov/7624777/", // Halaas et al. 1995, Science — recombinant leptin reduces body weight in ob/ob mice
  farooqi: "https://pubmed.ncbi.nlm.nih.gov/10486419/", // Farooqi et al. 1999, NEJM — leptin therapy in a child with congenital leptin deficiency
  heymsfield: "https://doi.org/10.1001/jama.282.16.1568", // Heymsfield et al. 1999, JAMA — recombinant leptin in obese and lean adults, modest/variable loss
  roth: "https://doi.org/10.1073/pnas.0706473105", // Roth et al. 2008, PNAS — amylin restores leptin responsiveness; pramlintide+metreleptin 12.7% loss
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is leptin?",
    a: "Leptin is a hormone secreted by fat tissue in proportion to how much fat you carry. It travels to the hypothalamus and signals energy sufficiency — enough fuel in the tank — which restrains appetite and permits normal energy expenditure. Its discovery in 1994 proved that adipose tissue is an endocrine organ, not inert storage. Crucially, leptin is a signal of plenty whose most powerful effects appear in its absence: when fat stores and leptin fall, the body mounts a hunger-and-conservation response, which is why starvation, not overfeeding, is where leptin speaks loudest.",
  },
  {
    q: "If leptin controls appetite, why isn't it a weight-loss drug?",
    a: "Because almost everyone with common obesity is already leptin-resistant. They have high leptin — more fat makes more of it — but the hypothalamus no longer responds to it, so adding still more leptin does little. The 1999 human trial showed exactly this: large, variable doses produced only modest, inconsistent weight loss. Leptin turned out to be a hormone that defends against weight loss far more strongly than it defends against weight gain, which is the opposite of what a slimming drug needs.",
  },
  {
    q: "What is leptin resistance?",
    a: "Leptin resistance is the state in which circulating leptin is high but the brain's response to it is blunted — the signal is loud, but the receiver has turned the volume down. It is the hallmark of common obesity and is distinct from rare congenital leptin deficiency, where there is almost no leptin at all. The distinction matters clinically: deficiency responds dramatically to leptin replacement, while resistance barely responds, because the problem is downstream of the hormone itself.",
  },
  {
    q: "When does giving leptin actually work?",
    a: "In the rare cases where leptin is genuinely missing or ineffective. Children with congenital leptin deficiency — who are relentlessly hungry and severely obese from infancy — respond to recombinant leptin almost miraculously, normalizing appetite and losing weight. The engineered analog metreleptin is also approved for generalized lipodystrophy, a condition in which people lack the fat tissue that makes leptin. In both, you are replacing a missing signal, not shouting a louder one at a deaf receptor.",
  },
  {
    q: "Is leptin connected to the GLP-1 and amylin weight-loss drugs?",
    a: "Through the circuitry it acts on, yes. Leptin, the melanocortin system and the incretin pathways all converge on the same hypothalamic appetite centers. And leptin had a notable second act alongside amylin: in leptin-resistant obese rats, the amylin analog pramlintide partially restored the brain's responsiveness to leptin, and a human study combining pramlintide with recombinant leptin produced about 12.7% weight loss — more than either alone. The idea that one drug can re-sensitize the brain to another is part of why the amylin axis is being revisited now.",
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
            <Section title="The gene the fat mouse was missing">
              <P>
                For decades there was a strain of mouse that ate without stopping and
                grew to three times a normal weight — the <Em>ob/ob</Em> mouse,
                obese from a single recessive mutation nobody could name. A classic
                experiment hinted at what it meant: stitch an <Em>ob/ob</Em> mouse
                into the circulation of a normal one, and the obese mouse ate less and
                lost weight. Something in normal blood was missing from the fat mouse —
                a circulating factor that told the brain the body had enough fat. For
                years it had no name because it had no sequence.
              </P>
              <P>
                In 1994 Jeffrey Friedman&rsquo;s lab found the gene by positional
                cloning and, with it, the hormone (
                <a href={REF.zhang} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Zhang et&nbsp;al., Nature, 1994
                </a>
                ). They called it{" "}
                <Link href="/hormones/leptin" className={LINK}>leptin</Link>, from the
                Greek for thin. The <Em>ob/ob</Em> mouse made a broken version and
                never heard the signal, so it behaved as though permanently starving.
                The finding settled a century-old question: fat is not inert ballast.
                It is an{" "}
                <Link href="/families/adipokines" className={LINK}>endocrine organ</Link>,
                and leptin is the hormone it uses to report its own size to the brain.
              </P>
            </Section>

            <Section title="The cure everyone expected">
              <P>
                The logic was irresistible. Here was a hormone that reported fat mass
                and suppressed appetite; give an animal more of it and it lost weight.
                Within a year, recombinant leptin was shown to melt fat off <Em>ob/ob</Em>{" "}
                mice, which had none of their own (
                <a href={REF.halaas} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Halaas et&nbsp;al., Science, 1995
                </a>
                ). The gene was licensed for a fortune. The expectation, stated plainly
                at the time, was that leptin would be the hormone that cured human
                obesity.
              </P>
              <P>
                It was not. When recombinant leptin was given to ordinary obese adults
                in a careful dose-escalation trial, the weight loss was modest, highly
                variable, and bought only at large doses that raised injection-site
                reactions (
                <a href={REF.heymsfield} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Heymsfield et&nbsp;al., JAMA, 1999
                </a>
                ). The drug that emptied the fat mouse barely moved the fat human. The
                reason is the single most important fact about leptin, and it is why the
                hormone had to be understood a second time.
              </P>
            </Section>

            <Section title="A signal of plenty, loudest when it's gone">
              <P>
                Common obesity is not a state of <Em>low</Em> leptin. It is a state of
                high leptin that the brain has stopped listening to — leptin
                resistance. More fat makes more leptin; the hypothalamus turns its
                sensitivity down; and pouring in still more of a signal the receiver is
                already ignoring does almost nothing. Leptin is not a dial you can turn
                up past its own saturation.
              </P>
              <P>
                The deeper asymmetry is what reframed the hormone. Evolution never
                needed a strong brake on getting fat; it needed a powerful alarm for
                getting <Em>thin</Em>. So leptin&rsquo;s most forceful action is in its
                absence: when stores fall and leptin drops, the body reads famine and
                mounts the full defense — ravenous hunger, a quieted metabolism,
                suppressed reproduction. Leptin is a signal of sufficiency whose loudest
                message is its own disappearance. That is exactly backwards from what a
                weight-loss drug needs, and it is the same wall the modern{" "}
                <Link href="/insights/when-the-drug-works-too-well" className={LINK}>
                  GLP-1 drugs run into when people stop them
                </Link>
                : a body that defends the fat it has.
              </P>
              <LeptinCurve />
            </Section>

            <Section title="Where replacing it works">
              <P>
                Leptin&rsquo;s real triumph came in the mirror-image condition — the one
                place the hormone is genuinely missing. A handful of children carry
                loss-of-function mutations in the leptin gene itself: no working leptin
                at all, relentless hunger, severe obesity from infancy. Give them
                recombinant leptin and the effect is close to miraculous — appetite
                normalizes, weight falls, puberty proceeds (
                <a href={REF.farooqi} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Farooqi et&nbsp;al., NEJM, 1999
                </a>
                ). The same logic extends to generalized lipodystrophy, where people
                lack the fat tissue that makes leptin; the engineered analog metreleptin
                is approved for it.
              </P>
              <Callout label="Deficiency versus resistance">
                Leptin replacement works when leptin is absent and fails when leptin is
                merely unheard. Congenital deficiency and lipodystrophy are missing-signal
                problems, and a missing signal can be supplied. Common obesity is a
                deaf-receiver problem, and you cannot fix a deaf receiver by shouting. The
                entire clinical story of leptin is that one distinction.
              </Callout>
            </Section>

            <Section title="The second act: re-sensitizing the brain">
              <P>
                If the wall is resistance, the interesting question becomes whether the
                brain can be made to listen again — and that is where leptin found an
                unexpected partner. In leptin-resistant obese rats, the{" "}
                <Link href="/hormones/amylin" className={LINK}>amylin</Link> analog{" "}
                <Link href="/hormones/pramlintide" className={LINK}>pramlintide</Link>{" "}
                partially restored the hypothalamus&rsquo;s responsiveness to leptin, and
                in a human study the combination of pramlintide and recombinant leptin
                produced about 12.7% weight loss — more than either agent alone (
                <a href={REF.roth} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Roth et&nbsp;al., PNAS, 2008
                </a>
                ). One hormone re-opening the ear for another is a genuinely different
                idea from simply pushing harder on one receptor.
              </P>
              <P>
                That program did not become a product, but the thread runs straight into
                the present. Amylin is{" "}
                <Link href="/insights/insulins-forgotten-twin" className={LINK}>
                  insulin&rsquo;s forgotten twin
                </Link>
                , now the busiest axis on the metabolic frontier, and the notion that it
                can change how the brain reads other satiety signals is part of why.
                Leptin itself sits one step upstream of the melanocortin appetite
                circuit that the{" "}
                <Link href="/families/incretins-metabolic" className={LINK}>incretin drugs</Link>{" "}
                also act through — the same wiring, approached from a different door.
              </P>
            </Section>

            <Section title="Why the twice-told story matters">
              <P>
                Leptin is the cleanest cautionary tale in metabolic medicine. A hormone
                can be real, its biology landmark-grade, its discovery worth a Nobel-tier
                place in the textbooks — and still not be a drug, because physiology is
                arranged to resist exactly the thing you want it to do. The first telling
                made leptin the cure for obesity. The second telling made it the hormone
                that explains why obesity is so hard to reverse: a body that treats fat
                loss as an emergency and leptin as the alarm it learns to ignore.
              </P>
              <Bullets
                items={[
                  ["Leptin proved fat is an endocrine organ", "Positional cloning of the ob gene in 1994 identified the circulating factor the obese ob/ob mouse was missing — fat tissue reporting its own size to the brain."],
                  ["It was expected to cure obesity, and didn't", "Recombinant leptin emptied the fat mouse but barely moved ordinary obese humans in trials — the gap that forced a second understanding of the hormone."],
                  ["Resistance, not deficiency, defines common obesity", "Obesity runs on high leptin the brain ignores. Adding more of an unheard signal does little; the problem is downstream of the hormone."],
                  ["It's a starvation alarm more than a satiety brake", "Leptin's strongest effects appear when it falls — driving hunger and conservation. That asymmetry is the opposite of what a weight-loss drug needs."],
                  ["Replacement works only where leptin is truly absent", "Congenital leptin deficiency and lipodystrophy respond dramatically to leptin/metreleptin. And amylin can partially re-sensitize the brain to it — the thread into the modern amylin era."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/leptin" label="Leptin reference (the fat-store signal)" />
                <CrossLink href="/hormones/adiponectin" label="Adiponectin reference (the adipokine that falls as fat rises)" />
                <CrossLink href="/hormones/amylin" label="Amylin reference (the re-sensitizing partner)" />
                <CrossLink href="/insights/insulins-forgotten-twin" label="Insulin's forgotten twin — the amylin axis" />
                <CrossLink href="/insights/when-the-drug-works-too-well" label="When the drug works too well — the body defends its fat" />
                <CrossLink href="/families/adipokines" label="The adipokines & energy-balance family" />
                <CrossLink href="/research?q=Why%20did%20recombinant%20leptin%20fail%20as%20an%20obesity%20drug%20despite%20leptin%27s%20central%20role%20in%20appetite%2C%20and%20what%20is%20leptin%20resistance%3F" label="Ask the research agent about leptin resistance" />
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

/* ── Leptin vs fat mass: the signal rises, the response saturates ── */
function LeptinCurve() {
  const W = 700;
  const H = 320;
  const X0 = 90;
  const X1 = 650;
  const Y0 = 262; // baseline
  const YT = 70; // top

  // leptin level — rises roughly linearly with fat mass
  const lx = (t: number) => X0 + t * (X1 - X0);
  const leptin: [number, number][] = [];
  for (let t = 0; t <= 1.0001; t += 0.04) leptin.push([lx(t), Y0 - (Y0 - YT) * (0.08 + 0.9 * t)]);

  // brain response — rises then saturates (diminishing), flat at high fat mass
  const response: [number, number][] = [];
  for (let t = 0; t <= 1.0001; t += 0.04) {
    const r = 1 - Math.exp(-3.2 * t); // saturating
    response.push([lx(t), Y0 - (Y0 - YT) * (0.06 + 0.62 * r)]);
  }

  const toPts = (pts: [number, number][]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A graph against fat mass on the horizontal axis. The leptin level (amber) rises steadily as fat mass increases. The brain's response to leptin (grey) rises at first but then saturates and flattens at higher fat mass — the gap between the two curves at the right is leptin resistance: the signal keeps climbing while the response has stopped."
      >
        <text x={W / 2} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          More fat makes more leptin — but the brain stops answering
        </text>

        {/* axes */}
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="var(--color-ink)" strokeOpacity={0.18} strokeWidth={1} />
        <line x1={X0} y1={Y0} x2={X0} y2={YT - 6} stroke="var(--color-ink)" strokeOpacity={0.18} strokeWidth={1} />
        <text x={X1} y={Y0 + 18} textAnchor="end" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10">fat mass →</text>

        {/* response curve (grey, saturating) */}
        <polyline points={toPts(response)} fill="none" stroke="var(--color-ink)" strokeOpacity={0.5} strokeWidth={1.8} />
        <text x={X1 - 4} y={response[response.length - 1][1] + 16} textAnchor="end" fill="var(--color-ink)" fillOpacity={0.55} fontSize="10.5" fontWeight="600">brain response (saturates)</text>

        {/* leptin curve (amber, rising) */}
        <polyline points={toPts(leptin)} fill="none" stroke="var(--accent-amber)" strokeOpacity={0.9} strokeWidth={2} />
        <text x={X1 - 4} y={leptin[leptin.length - 1][1] - 8} textAnchor="end" fill="var(--accent-amber)" fillOpacity={0.95} fontSize="10.5" fontWeight="700">leptin level (keeps rising)</text>

        {/* resistance gap bracket on the right */}
        <line x1={X1 - 40} y1={leptin[leptin.length - 1][1]} x2={X1 - 40} y2={response[response.length - 1][1]} stroke="var(--accent-amber)" strokeOpacity={0.6} strokeWidth={1.2} strokeDasharray="3 3" />
        <text x={X1 - 34} y={(leptin[leptin.length - 1][1] + response[response.length - 1][1]) / 2 + 4} fill="var(--color-ink)" fillOpacity={0.6} fontSize="9.5">resistance</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        In common obesity the amber line is already high — so adding more leptin pushes
        on a response that has flattened. The gap between signal and response is leptin
        resistance.
      </figcaption>
    </figure>
  );
}
