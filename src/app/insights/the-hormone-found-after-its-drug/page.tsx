import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-hormone-found-after-its-drug")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "Ghrelin, the Hunger Hormone: How It Was Discovered, Why It Needs a Fatty Acid, and Why Blocking It Failed — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "Ghrelin: The Hunger Hormone Found After Its Drug · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  bowers: "https://pubmed.ncbi.nlm.nih.gov/6714155/", // Bowers et al. 1984, Endocrinology — synthetic hexapeptide (GHRP-6) releases GH
  howard: "https://pubmed.ncbi.nlm.nih.gov/8688086/", // Howard et al. 1996, Science — cloning of the GH secretagogue receptor
  kojima: "https://pubmed.ncbi.nlm.nih.gov/10604470/", // Kojima et al. 1999, Nature — ghrelin, an acylated peptide from stomach
  tschop: "https://pubmed.ncbi.nlm.nih.gov/11057670/", // Tschöp et al. 2000, Nature — ghrelin induces adiposity in rodents
  wren: "https://pubmed.ncbi.nlm.nih.gov/11739476/", // Wren et al. 2001, JCEM — ghrelin increases food intake in humans
  preprandial: "https://pubmed.ncbi.nlm.nih.gov/11473029/", // Cummings et al. 2001, Diabetes — preprandial rise in plasma ghrelin
  bypass: "https://pubmed.ncbi.nlm.nih.gov/12023994/", // Cummings et al. 2002, NEJM — ghrelin after diet-induced weight loss or gastric bypass
  obesity: "https://pubmed.ncbi.nlm.nih.gov/11289032/", // Tschöp et al. 2001, Diabetes — circulating ghrelin is decreased in human obesity
  pws: "https://pubmed.ncbi.nlm.nih.gov/12091883/", // Cummings et al. 2002, Nat Med — elevated ghrelin in Prader-Willi syndrome
  sun: "https://pubmed.ncbi.nlm.nih.gov/14585959/", // Sun, Ahmed & Smith 2003, Mol Cell Biol — ghrelin deletion impairs neither growth nor appetite
  yang: "https://pubmed.ncbi.nlm.nih.gov/18267071/", // Yang et al. 2008, Cell — identification of GOAT
  gutierrez: "https://pubmed.ncbi.nlm.nih.gov/18443287/", // Gutierrez et al. 2008, PNAS — ghrelin octanoylation by an orphan lipid transferase
  nishi: "https://pubmed.ncbi.nlm.nih.gov/15677766/", // Nishi et al. 2005, Endocrinology — ingested medium-chain fatty acids acylate ghrelin
  zhao: "https://pubmed.ncbi.nlm.nih.gov/20231469/", // Zhao et al. 2010, PNAS — GOAT essential for survival of calorie-restricted mice
  leap2: "https://pubmed.ncbi.nlm.nih.gov/29233536/", // Ge et al. 2018, Cell Metab — LEAP2 is an endogenous antagonist of the ghrelin receptor
  leap2human: "https://pubmed.ncbi.nlm.nih.gov/35492241/", // Hagemann et al. 2022, Cell Rep Med — LEAP2 reduces food intake in healthy men
  romana: "https://pubmed.ncbi.nlm.nih.gov/26906526/", // Temel et al. 2016, Lancet Oncol — anamorelin in cancer cachexia (ROMANA 1 and 2)
  macimorelin: "https://pubmed.ncbi.nlm.nih.gov/29860473/", // Garcia et al. 2018, JCEM — macimorelin as a diagnostic test for adult GH deficiency
  macrilen: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/205598s000lbl.pdf", // FDA label — Macrilen (macimorelin), 2017
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is ghrelin?",
    a: "Ghrelin is a 28-amino-acid peptide hormone made mainly by endocrine cells in the stomach. It rises before meals and falls after them, acts on the brain to increase hunger and food intake, and also stimulates the pituitary to release growth hormone. It is the best-established circulating hormone that makes people eat more, which is why it is often called the hunger hormone.",
  },
  {
    q: "Why is ghrelin called the hormone found after its drug?",
    a: "Because the order of discovery ran backwards. Synthetic growth-hormone-releasing peptides were made in the laboratory from the late 1970s and reported in 1984. The receptor they acted on was cloned in 1996 and had no known natural partner. Only in 1999 was the body's own activator of that receptor purified, from stomach tissue, and named ghrelin. The drugs existed for fifteen years before anyone knew what they were imitating.",
  },
  {
    q: "Why does ghrelin need a fatty acid?",
    a: "Ghrelin only activates its receptor when an eight-carbon fatty acid, octanoate, is attached to the third amino acid in its chain. The enzyme that attaches it, ghrelin O-acyltransferase (GOAT), was identified in 2008. Ghrelin without the fatty acid circulates in larger amounts but does not activate the receptor. Some of the fatty acid used comes directly from medium-chain fats in the diet.",
  },
  {
    q: "Do people with obesity have high ghrelin?",
    a: "No, the opposite. Fasting ghrelin is lower in people with obesity than in lean people. The notable exception is Prader-Willi syndrome, a genetic condition marked by insatiable hunger, in which ghrelin is markedly elevated. Ghrelin rises when people lose weight by dieting, which may be one reason lost weight is hard to keep off.",
  },
  {
    q: "Why is there no ghrelin-blocking weight-loss drug?",
    a: "Because the body does not depend on ghrelin to eat. Mice engineered to lack ghrelin entirely grow, eat and gain weight normally, and common obesity is a low-ghrelin state to begin with. Ghrelin appears to matter most as a defense against starvation, not as the everyday driver of appetite, so removing it changes little when food is plentiful. No ghrelin blocker has been approved for obesity.",
  },
  {
    q: "Are there approved drugs that act on the ghrelin receptor?",
    a: "Yes, and they are activators, not blockers. Macimorelin, an oral ghrelin-receptor agonist, is approved in the United States as a diagnostic test for adult growth hormone deficiency. Anamorelin, another oral agonist, increased lean body mass in people with cancer cachexia in phase 3 trials and has been approved in Japan for that use.",
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
            <Section title="A drug in search of a hormone">
              <P>
                The usual order is hormone first, drug second. Someone finds a signal
                the body makes, works out what it does, and chemists then build
                something that imitates or blocks it. Insulin, GLP-1 and oxytocin all
                went that way.{" "}
                <Link href="/hormones/ghrelin" className={LINK}>Ghrelin</Link> went the
                other way round, and the detour took fifteen years.
              </P>
              <P>
                It started with a small synthetic peptide. Working from fragments of
                the opioid peptide enkephalin, Cyril Bowers and colleagues arrived at a
                six-residue molecule that made the pituitary release growth hormone,
                and did so specifically, without touching the other pituitary hormones
                (
                <a href={REF.bowers} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Bowers et&nbsp;al., 1984
                </a>
                ). It was not a copy of anything known. The body&rsquo;s own
                growth-hormone-releasing hormone had been isolated only two years
                earlier, and this peptide did not work through its receptor. Whatever
                it was pressing, nobody had a name for it.
              </P>
              <P>
                Drug companies followed the pharmacology anyway and built a family of
                growth hormone secretagogues, including the oral compound MK-677. In
                1996 a team at Merck used one of them as bait and cloned the receptor
                it bound: a G-protein-coupled receptor in the pituitary and
                hypothalamus with no known natural activator (
                <a href={REF.howard} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Howard et&nbsp;al., Science, 1996
                </a>
                ). An orphan. The field now had drugs and a receptor, and a
                hormone-shaped hole between them.
              </P>
            </Section>

            <Section title="Found in the stomach">
              <P>
                Everyone expected the missing hormone to come from the brain, where the
                receptor was. Masayasu Kojima and Kenji Kangawa found it in the
                stomach. Screening tissue extracts for anything that would activate the
                orphan receptor, they purified a 28-amino-acid peptide from rat stomach
                and named it ghrelin, from an ancient root meaning &ldquo;to
                grow&rdquo; (
                <a href={REF.kojima} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kojima et&nbsp;al., Nature, 1999
                </a>
                ).
              </P>
              <P>
                A growth hormone signal made by the gut was strange enough. The
                peptide&rsquo;s structure was stranger. The purified hormone carried an
                eight-carbon fatty acid, octanoate, bolted onto its third amino acid,
                and without that fatty acid it did nothing at the receptor. A synthetic
                copy of the bare sequence was inert. Ghrelin remains the only hormone
                known to need this particular modification, and that oddity is why the
                search had been so hard: you cannot find a peptide by its sequence
                alone when the sequence alone does not work.
              </P>
              <DiscoveryTimeline />
            </Section>

            <Section title="The signal that says eat">
              <P>
                Within a year the story changed subject. Given to rodents, ghrelin made
                them fatter, and not through growth hormone: it increased food intake
                and shifted the body toward storing fat (
                <a href={REF.tschop} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Tsch&ouml;p et&nbsp;al., Nature, 2000
                </a>
                ). In people the effect was immediate. Nine healthy volunteers given an
                intravenous infusion of ghrelin ate 28% more from a buffet than they
                did on saline, and every one of them ate more (
                <a href={REF.wren} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wren et&nbsp;al., 2001
                </a>
                ). The authors called it the first circulating hormone shown to
                stimulate eating in humans.
              </P>
              <P>
                Its natural rhythm fit the role. Ghrelin in the blood climbs before
                each meal and drops soon after (
                <a href={REF.preprandial} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Cummings et&nbsp;al., 2001
                </a>
                ). Almost every other signal in{" "}
                <Link href="/insights/the-guts-full-report" className={LINK}>
                  the gut&rsquo;s report to the brain
                </Link>{" "}
                says the same thing in different words: stop, there is food here.{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link>,{" "}
                <Link href="/hormones/pyy" className={LINK}>PYY</Link> and{" "}
                <Link href="/hormones/cck" className={LINK}>CCK</Link> are all brakes.
                Ghrelin is the one clear voice on the other side, rising when the
                stomach is empty.
              </P>
              <P>
                It also explained something dieters already knew. In a study of people
                who lost 17% of their body weight by dieting, the day-long ghrelin
                profile rose by 24%. In people who had lost even more weight after
                gastric bypass surgery, it was 77% lower than in normal-weight controls,
                and the mealtime peaks had vanished (
                <a href={REF.bypass} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Cummings et&nbsp;al., NEJM, 2002
                </a>
                ). Dieting turned the hunger signal up. Surgery, somehow, had turned it
                off.
              </P>
              <Callout label="Why this looked like a drug target">
                A hormone that makes people eat, that rises when they diet, and that
                falls after the most effective obesity treatment then known. Block it,
                the reasoning went, and you have a weight-loss drug.
              </Callout>
            </Section>

            <Section title="Why blocking it never worked">
              <P>
                The reasoning had two problems, and both were visible early.
              </P>
              <P>
                The first is that common obesity is not a high-ghrelin state. Fasting
                ghrelin is <Em>lower</Em> in people with obesity than in lean people (
                <a href={REF.obesity} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Tsch&ouml;p et&nbsp;al., 2001
                </a>
                ). The body had already turned the signal down, and people were hungry
                anyway. The striking exception is Prader-Willi syndrome, a genetic
                condition defined by relentless hunger, in which ghrelin runs
                several-fold high (
                <a href={REF.pws} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Cummings et&nbsp;al., 2002
                </a>
                ). That is a real lead for one rare disease and no help for the common
                one.
              </P>
              <P>
                The second problem is that animals do not need ghrelin to eat. When
                Roy Smith&rsquo;s group deleted the ghrelin gene in mice, the animals
                were, in the paper&rsquo;s words, not anorexic dwarfs. They grew
                normally, ate normally and got fat on a high-fat diet just like their
                littermates. The authors drew the conclusion in their abstract:
                ghrelin antagonists were unlikely to be broadly useful against obesity
                (
                <a href={REF.sun} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sun et&nbsp;al., 2003
                </a>
                ). Appetite is held up by many overlapping signals. Take one away and
                the others carry on.
              </P>
              <P>
                Two decades later that prediction has held. No ghrelin blocker has been
                approved for obesity, while drugs that amplify the brake signals have
                reshaped the field. This is the pattern laid out in{" "}
                <Link href="/insights/mechanism-is-not-proof" className={LINK}>
                  mechanism is not proof
                </Link>
                : a signal can do exactly what the experiments say when you add it, and
                still not be the thing holding the system up when you remove it.
              </P>
            </Section>

            <Section title="The fat on the hormone">
              <P>
                The fatty acid took another nine years to explain. In 2008 two groups
                independently identified the enzyme that attaches it, a previously
                uncharacterized member of a family of membrane-bound acyltransferases,
                and named it ghrelin O-acyltransferase, or GOAT (
                <a href={REF.yang} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Yang et&nbsp;al., Cell, 2008
                </a>
                ;{" "}
                <a href={REF.gutierrez} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Gutierrez et&nbsp;al., PNAS, 2008
                </a>
                ). As far as anyone has found, ghrelin is the only thing it works on:
                one enzyme, one substrate.
              </P>
              <P>
                The raw material turned out to come partly from dinner. When mice were
                fed medium-chain fats, the fatty acids on their newly made ghrelin
                matched the chain length of what they had eaten, down to an unnatural
                seven-carbon version when they were fed a seven-carbon fat (
                <a href={REF.nishi} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Nishi et&nbsp;al., 2005
                </a>
                ). The hunger hormone is assembled, in part, from the food it asks for.
              </P>
              <P>
                The enzyme also gave the clearest answer yet to what ghrelin is{" "}
                <Em>for</Em>. Mice lacking GOAT, and so lacking all active ghrelin,
                looked normal on ordinary or high-fat food. Put on severe calorie
                restriction, they could not hold their blood sugar: by day seven it had
                collapsed and the animals were near death, while normal mice on the
                same rations stayed active. Infusing either ghrelin or growth hormone
                rescued them (
                <a href={REF.zhao} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Zhao et&nbsp;al., PNAS, 2010
                </a>
                ). On that reading the two halves of ghrelin&rsquo;s history are one
                job. It raises growth hormone and drives hunger for the same reason: to
                keep an animal alive through famine.
              </P>
              <Callout label="The reframe">
                Ghrelin looks less like a hunger switch than a starvation defense. That
                is why removing it changes little when food is plentiful, and why it
                made a poor target for a disease of plenty.
              </Callout>
            </Section>

            <Section title="The body's own blocker, and the drugs that did arrive">
              <P>
                The receptor had one more surprise. In 2018 a liver- and gut-derived
                peptide called LEAP2, filed away years earlier as a minor antimicrobial,
                was shown to be a natural antagonist of the ghrelin receptor. It rises
                with feeding and falls with fasting, the mirror image of ghrelin (
                <a href={REF.leap2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ge et&nbsp;al., Cell Metab, 2018
                </a>
                ). Infused into healthy men, it lowered food intake at a free meal and
                blunted the rise in blood sugar afterwards (
                <a href={REF.leap2human} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Hagemann et&nbsp;al., 2022
                </a>
                ). So the body runs the receptor with two hormones, an accelerator from
                the stomach and a brake from the liver, and what matters may be their
                ratio. Whether that can be turned into a therapy is an open, early
                question.
              </P>
              <P>
                The drugs that did reach patients push the receptor the original way.
                Macimorelin, an oral ghrelin-receptor agonist, is approved as a
                diagnostic: a single dose provokes a growth hormone surge, and a weak
                response identifies adult growth hormone deficiency about as well as
                the older, riskier insulin test (
                <a href={REF.macimorelin} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Garcia et&nbsp;al., 2018
                </a>
                ;{" "}
                <a href={REF.macrilen} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA label
                </a>
                ). Anamorelin went after appetite. In two phase 3 trials in people with
                lung cancer and cachexia it increased lean body mass over twelve weeks
                but did not improve handgrip strength, the other primary endpoint (
                <a href={REF.romana} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Temel et&nbsp;al., Lancet Oncol, 2016
                </a>
                ). It has been approved in Japan. More mass without more strength is a
                result this catalog has{" "}
                <Link href="/insights/bigger-not-stronger" className={LINK}>
                  met before
                </Link>
                .
              </P>
              <P>
                And the secretagogues that started it all are still here.{" "}
                <Link href="/hormones/ipamorelin" className={LINK}>Ipamorelin</Link>{" "}
                and its relatives are descendants of that 1984 hexapeptide, pressing
                the same receptor for its growth hormone effect. How they compare with
                the GHRH route is the subject of{" "}
                <Link href="/insights/two-ways-to-ask-for-growth" className={LINK}>
                  two ways to ask for growth
                </Link>
                . It is worth remembering, reading about them, that the receptor they
                act on is the hunger receptor too.
              </P>
            </Section>

            <Section title="What the detour teaches">
              <P>
                Ghrelin&rsquo;s history is a run of reversed expectations. The drug
                came before the hormone. The growth signal came from the stomach. The
                peptide needed a fat. The hunger hormone was low in obesity. And the
                obvious drug, a blocker, was the one that never worked.
              </P>
              <Bullets
                items={[
                  ["Discovered backwards", "Synthetic growth hormone secretagogues (1984) led to an orphan receptor (1996), which led to the hormone itself (1999). The pharmacology was fifteen years ahead of the physiology."],
                  ["A peptide that needs a fatty acid", "Ghrelin is inactive until the enzyme GOAT attaches an eight-carbon fatty acid, some of it taken straight from dietary fat. No other hormone is known to require it."],
                  ["The one clear hunger signal", "Ghrelin rises before meals, rises with dieting, and makes people eat more when infused. Most other gut hormones tell the brain to stop."],
                  ["Not the cause of obesity", "Ghrelin is low in common obesity, and mice without it eat and grow normally. Its essential role appears to be protecting blood sugar during starvation."],
                  ["The useful drugs activate it", "A ghrelin-receptor agonist is an approved diagnostic for growth hormone deficiency, and another adds lean mass in cancer cachexia. Blocking the receptor has produced no approved drug."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/ghrelin" label="Ghrelin reference (receptor, source, mechanism)" />
                <CrossLink href="/insights/two-ways-to-ask-for-growth" label="Two ways to ask for growth — the secretagogues as growth hormone drugs" />
                <CrossLink href="/insights/the-guts-full-report" label="The gut's full report — the satiety signals on the other side" />
                <CrossLink href="/insights/the-hormone-discovered-twice" label="The hormone discovered twice — leptin, the long-term counterpart" />
                <CrossLink href="/families/gut-appetite" label="The gut & appetite family" />
                <CrossLink href="/research?q=Why%20does%20ghrelin%20require%20octanoylation%20by%20GOAT%2C%20and%20why%20have%20ghrelin%20antagonists%20failed%20as%20obesity%20drugs%3F" label="Ask the research agent about ghrelin" />
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

/* ── The reversed order of discovery: drug → receptor → hormone → enzyme → antagonist ── */
function DiscoveryTimeline() {
  const W = 720;
  const H = 190;
  const lineY = 78;
  const steps = [
    { year: "1984", name: "The drug", sub: "synthetic GH-releasing", sub2: "hexapeptide", hot: false },
    { year: "1996", name: "The receptor", sub: "cloned, with no", sub2: "known activator", hot: false },
    { year: "1999", name: "The hormone", sub: "ghrelin, purified", sub2: "from stomach", hot: true },
    { year: "2008", name: "The enzyme", sub: "GOAT attaches", sub2: "the fatty acid", hot: false },
    { year: "2018", name: "The brake", sub: "LEAP2, a natural", sub2: "antagonist", hot: false },
  ];
  const x0 = 76;
  const gap = (W - 2 * x0) / (steps.length - 1);

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="Timeline of the ghrelin system's discovery, which ran in reverse. 1984: a synthetic growth-hormone-releasing hexapeptide. 1996: its receptor is cloned with no known natural activator. 1999: the hormone ghrelin is purified from stomach. 2008: the enzyme GOAT, which attaches ghrelin's fatty acid, is identified. 2018: LEAP2 is shown to be a natural antagonist of the same receptor."
      >
        <line x1={x0} y1={lineY} x2={W - x0} y2={lineY} stroke="var(--color-ink)" strokeOpacity={0.25} strokeWidth={1.5} />
        {steps.map((s, i) => {
          const x = x0 + i * gap;
          return (
            <g key={s.year}>
              <text x={x} y={lineY - 34} textAnchor="middle" fill={s.hot ? "var(--accent-teal)" : "var(--color-ink)"} fillOpacity={s.hot ? 1 : 0.55} fontSize="13" fontWeight="600" fontFamily="var(--font-geist-mono), monospace">{s.year}</text>
              <line x1={x} y1={lineY - 24} x2={x} y2={lineY - 9} stroke="var(--color-ink)" strokeOpacity={0.2} strokeWidth={1} />
              <circle cx={x} cy={lineY} r={s.hot ? 8 : 6}
                fill={s.hot ? "var(--accent-teal)" : "var(--surface)"}
                stroke={s.hot ? "var(--accent-teal)" : "var(--color-ink)"} strokeOpacity={s.hot ? 1 : 0.45} strokeWidth={1.5} />
              <text x={x} y={lineY + 32} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.9} fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{s.name}</text>
              <text x={x} y={lineY + 50} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="10.5">{s.sub}</text>
              <text x={x} y={lineY + 64} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="10.5">{s.sub2}</text>
            </g>
          );
        })}
        <text x={W / 2} y={H - 8} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="11">fifteen years of drugs before the hormone they imitate had a name</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The usual order is hormone, receptor, drug. For ghrelin it ran drug, receptor,
        hormone, and the enzyme and the natural antagonist came later still.
      </figcaption>
    </figure>
  );
}
