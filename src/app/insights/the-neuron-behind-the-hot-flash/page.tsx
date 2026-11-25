import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-neuron-behind-the-hot-flash")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "What Causes Hot Flashes? KNDy Neurons, Kisspeptin, Neurokinin B and the NK3 Blockers (Fezolinetant, Elinzanetant) — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "What Causes Hot Flashes? Kisspeptin, Neurokinin B and the KNDy Neuron · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  casper: "https://pubmed.ncbi.nlm.nih.gov/462193/", // Casper, Yen & Wilkes 1979, Science — menopausal flushes linked to pulsatile LH secretion
  kiss1: "https://pubmed.ncbi.nlm.nih.gov/8944003/", // Lee et al. 1996, J Natl Cancer Inst — KiSS-1, a melanoma metastasis-suppressor gene
  ohtaki: "https://pubmed.ncbi.nlm.nih.gov/11385580/", // Ohtaki et al. 2001, Nature — KiSS-1 encodes the peptide ligand of GPR54
  seminara: "https://pubmed.ncbi.nlm.nih.gov/14573733/", // Seminara et al. 2003, NEJM — GPR54 as a regulator of puberty
  topaloglu: "https://pubmed.ncbi.nlm.nih.gov/19079066/", // Topaloglu et al. 2009, Nat Genet — TAC3/TACR3 mutations in hypogonadotropic hypogonadism
  lehman: "https://pubmed.ncbi.nlm.nih.gov/20501670/", // Lehman, Coolen & Goodman 2010, Endocrinology — KNDy cells of the arcuate nucleus
  rance91: "https://pubmed.ncbi.nlm.nih.gov/1708331/", // Rance & Young 1991, Endocrinology — hypertrophied neurokinin B neurons in postmenopausal women
  rance13: "https://pubmed.ncbi.nlm.nih.gov/23872331/", // Rance et al. 2013, Front Neuroendocrinol — KNDy neurons and the mechanism of hot flushes
  freedman: "https://pubmed.ncbi.nlm.nih.gov/24012626/", // Freedman 2014, J Steroid Biochem Mol Biol — hot flashes: mechanisms, endocrinology, treatment
  jayasena: "https://pubmed.ncbi.nlm.nih.gov/25683060/", // Jayasena et al. 2015, Sci Rep — neurokinin B infusion induces hot flushes in women
  prague: "https://pubmed.ncbi.nlm.nih.gov/28385352/", // Prague et al. 2017, Lancet — NK3 receptor antagonist MLE4901 for hot flushes (phase 2)
  skylight: "https://pubmed.ncbi.nlm.nih.gov/36924778/", // Lederman et al. 2023, Lancet — fezolinetant phase 3 (SKYLIGHT 1)
  veozahLiver: "https://www.fda.gov/drugs/drug-safety-and-availability/fda-adds-warning-about-rare-occurrence-serious-liver-injury-use-veozah-fezolinetant-hot-flashes-due", // FDA drug safety communication — liver injury with fezolinetant
  oasis: "https://pubmed.ncbi.nlm.nih.gov/39172446/", // Pinkerton et al. 2024, JAMA — elinzanetant phase 3 (OASIS 1 and 2)
  lynkuet: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/219469s000lbl.pdf", // FDA label — Lynkuet (elinzanetant), 2025
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What causes hot flashes in menopause?",
    a: "The leading explanation is overactivity of a small group of hypothalamic neurons called KNDy neurons, which make kisspeptin, neurokinin B and dynorphin. Estrogen normally restrains them. When estrogen falls at menopause they enlarge and fire more, and because they also connect to the brain's temperature-control center, their bursts trigger inappropriate heat-loss responses: skin flushing, sweating and a sense of heat.",
  },
  {
    q: "What are KNDy neurons?",
    a: "KNDy (pronounced 'candy') neurons are cells in the arcuate, or infundibular, nucleus of the hypothalamus that produce three peptides: kisspeptin, neurokinin B and dynorphin. They are thought to act as the pulse generator for the reproductive axis. Neurokinin B starts each synchronized burst, dynorphin ends it, and kisspeptin carries the output to GnRH neurons, which then drive pulses of LH from the pituitary.",
  },
  {
    q: "What does kisspeptin have to do with hot flashes?",
    a: "Kisspeptin is made by the same neurons that appear to trigger hot flashes, and it was the discovery of kisspeptin's role in puberty that led researchers to those neurons. But kisspeptin is the cell's output to the reproductive axis. The signal that reaches the brain's thermostat, and the one current drugs block, is neurokinin B, the peptide the same neurons use to excite one another.",
  },
  {
    q: "How do fezolinetant and elinzanetant work?",
    a: "Both are oral, non-hormonal drugs that block the neurokinin 3 receptor, the receptor for neurokinin B. Blocking it quiets the overactive KNDy signal to the temperature-control center. Elinzanetant also blocks the neurokinin 1 receptor. In phase 3 trials each reduced the number of moderate-to-severe hot flashes by roughly two to three more per day than placebo. Neither contains or acts like estrogen.",
  },
  {
    q: "Are neurokinin 3 blockers safe for the liver?",
    a: "Liver enzyme elevations have appeared across this drug class, starting with the first phase 2 compound. The FDA has warned of rare cases of serious liver injury with fezolinetant, and the labels for these drugs call for blood tests of liver function before and during treatment. Anyone considering them should discuss liver monitoring with a prescriber.",
  },
  {
    q: "Why do hot flashes happen at the same time as LH pulses?",
    a: "Because both are driven by the same upstream neurons. A 1979 study found that hot flashes coincide with pulses of luteinizing hormone, yet women without a functioning pituitary still have them, so LH cannot be the cause. The KNDy model explains this: one burst of activity sends kisspeptin toward GnRH neurons, producing the LH pulse, and neurokinin B toward the thermoregulatory center, producing the flash.",
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
              <Link href="/families/reproductive-gonadal" className="text-accent-rose hover:text-ink">
                Reproductive &amp; gonadal
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
            <Section title="A clue that sat for thirty years">
              <P>
                In 1979 a group in San Diego wired menopausal women to skin-temperature
                sensors, drew blood every few minutes, and noticed something odd. Each
                hot flash arrived together with a pulse of luteinizing hormone. The two
                kept the same clock (
                <a href={REF.casper} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Casper et&nbsp;al., Science, 1979
                </a>
                ).
              </P>
              <P>
                The obvious reading, that{" "}
                <Link href="/hormones/lh" className={LINK}>LH</Link> causes the flash,
                was wrong, and people knew it quickly: women whose pituitary had been
                removed, and who therefore made no LH at all, still had hot flashes.
                So the flash and the pulse were not cause and effect. They were two
                outputs of something upstream, something in the brain that ticked, and
                that nobody could yet name. The clue sat there for three decades, until
                a peptide found in a cancer lab led back to it.
              </P>
            </Section>

            <Section title="Named after a chocolate">
              <P>
                In 1996 a team in Hershey, Pennsylvania, found a gene that stopped
                melanoma cells from spreading. They named it <Em>KiSS-1</Em>: SS for
                suppressor sequence, and the rest for the town&rsquo;s most famous
                product (
                <a href={REF.kiss1} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lee et&nbsp;al., 1996
                </a>
                ). Five years later its peptide product was matched to an orphan
                receptor, GPR54 (
                <a href={REF.ohtaki} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ohtaki et&nbsp;al., Nature, 2001
                </a>
                ). It looked like a cancer story.
              </P>
              <P>
                Then, in 2003, families whose children never entered puberty were found
                to carry broken copies of that receptor (
                <a href={REF.seminara} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Seminara et&nbsp;al., NEJM, 2003
                </a>
                ).{" "}
                <Link href="/hormones/kisspeptin" className={LINK}>Kisspeptin</Link>{" "}
                turned out to be the signal that switches on{" "}
                <Link href="/hormones/gnrh" className={LINK}>GnRH</Link> and with it the
                whole reproductive axis, a story told in{" "}
                <Link href="/insights/the-pulse-is-the-message" className={LINK}>
                  the pulse is the message
                </Link>
                . The same genetic approach soon turned up a second peptide. Other
                families with the same failure of puberty had intact kisspeptin
                signaling but carried mutations in <Em>neurokinin B</Em> or its
                receptor, NK3R (
                <a href={REF.topaloglu} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Topaloglu et&nbsp;al., Nat Genet, 2009
                </a>
                ). Two different peptides, one identical disease. They had to be
                working in the same place.
              </P>
            </Section>

            <Section title="One cell, three peptides">
              <P>
                They were working in the same cell. In the arcuate nucleus of the
                hypothalamus (called the infundibular nucleus in humans) sits a
                population of neurons that make kisspeptin, neurokinin B and a third
                peptide, the opioid dynorphin. In 2010 they were given a name built
                from the three initials: <Em>KNDy</Em> neurons, pronounced
                &ldquo;candy&rdquo; (
                <a href={REF.lehman} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lehman et&nbsp;al., 2010
                </a>
                ).
              </P>
              <P>
                The working model gives each peptide a job. The neurons are wired to
                one another, and neurokinin B is how they excite their neighbors: a
                little activity spreads and the whole population fires together.
                Dynorphin is the delayed brake that shuts the burst down. And
                kisspeptin is the output, released onto GnRH neurons with each burst.
                Start, stop, send. The result is a pulse roughly every hour or so, the
                rhythm that the pituitary reads as an instruction to release LH. The
                thing upstream that ticked had been found.
              </P>
              <P>
                Estrogen sits on top of this as the restraint. KNDy neurons carry
                estrogen receptors, and circulating estrogen holds their activity down.
                That is negative feedback: the ovary telling the brain it has heard
                enough.
              </P>
            </Section>

            <Section title="What happens when the brake comes off">
              <P>
                At menopause the ovaries stop making estrogen, and the restraint is
                gone. A pathologist, Naomi Rance, had seen the consequence years before
                anyone had the vocabulary for it. In the hypothalami of postmenopausal
                women, a specific set of neurons was physically enlarged. They were
                the ones containing neurokinin B, their cross-sectional area was nearly
                double that seen in premenopausal women, and their neurokinin B gene
                expression was sharply up (
                <a href={REF.rance91} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Rance &amp; Young, 1991
                </a>
                ). These were KNDy neurons, running without a brake.
              </P>
              <P>
                The link to temperature came from anatomy. KNDy neurons do not only
                project to GnRH neurons. They also send fibers to the preoptic area,
                the brain&rsquo;s thermostat, where cells carry the neurokinin B
                receptor. Rance proposed that the overactive neurons were driving that
                thermostat with every burst, triggering the body&rsquo;s heat-dumping
                responses when there was no heat to dump (
                <a href={REF.rance13} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Rance et&nbsp;al., 2013
                </a>
                ). That fit the physiology. Women with hot flashes have an unusually
                narrow thermoneutral zone, so a tiny rise in core temperature that
                would normally go unnoticed sets off flushing and sweating (
                <a href={REF.freedman} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Freedman, 2014
                </a>
                ).
              </P>
              <P>
                It also explained 1979. One burst from one population of cells goes two
                ways: kisspeptin toward the GnRH neuron, which becomes an LH pulse, and
                neurokinin B toward the thermostat, which becomes a flash. Same clock,
                because it is the same cell.
              </P>
              <KndyDiagram />
            </Section>

            <Section title="Testing it in both directions">
              <P>
                A hypothesis like that makes two predictions, and both were tested in
                people. If neurokinin B triggers the flash, then giving it to someone
                who does not have hot flashes should produce one. In a small
                double-blind crossover study, ten healthy premenopausal women received
                a thirty-minute infusion of neurokinin B and, on another day, an
                inactive one. Eight of the ten flushed during neurokinin B, with the
                rise in heart rate and skin temperature typical of a menopausal flash.
                None did on the inactive infusion (
                <a href={REF.jayasena} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jayasena et&nbsp;al., 2015
                </a>
                ).
              </P>
              <P>
                And if neurokinin B triggers the flash, blocking its receptor should
                stop it. The same London group gave 37 menopausal women, each having
                seven or more flashes a day, four weeks of an oral NK3 receptor
                antagonist and four weeks of placebo in random order. The drug cut the
                weekly number of hot flashes by 45 percentage points more than placebo
                (
                <a href={REF.prague} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Prague et&nbsp;al., Lancet, 2017
                </a>
                ). Three participants had a temporary rise in liver enzymes. That
                detail would matter later.
              </P>
              <Callout label="Why this is strong evidence">
                Adding the peptide produced the symptom in people who did not have it.
                Blocking its receptor removed the symptom in people who did. Most
                mechanisms in this catalog never get tested in both directions, in
                humans, with a placebo.
              </Callout>
            </Section>

            <Section title="The drugs, and their cost">
              <P>
                The first NK3 blocker to reach the market was fezolinetant. In its
                phase 3 trial, women averaging seven or more moderate-to-severe flashes
                a day had about two and a half fewer per day on the higher dose than on
                placebo by week twelve, with an effect visible in the first weeks (
                <a href={REF.skylight} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lederman et&nbsp;al., Lancet, 2023
                </a>
                ). It was approved in the United States in 2023 as the first
                non-hormonal drug aimed at the mechanism of hot flashes. A second
                compound, elinzanetant, blocks both the NK3 receptor and the related
                NK1 receptor. In two phase 3 trials it reduced flashes by about three
                more per day than placebo at twelve weeks and improved sleep (
                <a href={REF.oasis} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Pinkerton et&nbsp;al., JAMA, 2024
                </a>
                ), and it was approved in 2025 (
                <a href={REF.lynkuet} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA label
                </a>
                ).
              </P>
              <P>
                The liver signal from the first small trial did not go away. In 2024
                the FDA warned of rare cases of serious liver injury with fezolinetant (
                <a href={REF.veozahLiver} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA safety communication
                </a>
                ), and the labels for the class call for liver blood tests before and
                during treatment. The effect size deserves a sober reading too. These
                drugs reduce hot flashes; in the trials they did not abolish them, and
                the placebo groups improved substantially as well. Estrogen remains the
                most effective treatment for those who can take it. What the NK3
                blockers changed is that there is now a targeted option for those who
                cannot.
              </P>
            </Section>

            <Section title="The peptide was the map, not the medicine">
              <P>
                There is a twist worth noticing in a reference about peptide hormones.
                Neither of these drugs is a peptide. They are small molecules, taken by
                mouth, that block a peptide&rsquo;s receptor. And the peptide whose
                discovery opened the whole field, kisspeptin, is not their target at
                all. Its own clinical use is elsewhere, as an experimental trigger for
                egg maturation in IVF, where the aim is to add a signal rather than
                remove one.
              </P>
              <P>
                The pattern is the mirror of what usually happens here. Most stories in
                this catalog are about supplying a peptide: making it last, getting it
                in, engineering its half-life. This one is about silencing one, and for
                that job a pill that sits in the receptor is the better tool. The
                peptides did the scientific work. They marked the cell, the circuit and
                the receptor. The drug that resulted contains none of them.
              </P>
              <Bullets
                items={[
                  ["Hot flashes and LH pulses share a clock", "They coincide, but LH does not cause the flash. Both are outputs of the same hypothalamic pulse generator."],
                  ["The generator is the KNDy neuron", "One cell type makes kisspeptin, neurokinin B and dynorphin. Neurokinin B starts each synchronized burst, dynorphin stops it, and kisspeptin carries it to GnRH neurons."],
                  ["Estrogen is the brake", "When estrogen falls at menopause these neurons enlarge and overfire. Their neurokinin B output also reaches the brain's thermostat and triggers heat-loss responses."],
                  ["Tested both ways in people", "Infusing neurokinin B caused flashes in women who did not have them. Blocking its receptor reduced flashes in women who did."],
                  ["The drugs are not peptides", "Fezolinetant and elinzanetant are oral small molecules that block the neurokinin receptor. They reduce flashes by a few per day beyond placebo and carry a liver-monitoring requirement."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/kisspeptin" label="Kisspeptin reference (the gatekeeper above GnRH)" />
                <CrossLink href="/insights/the-pulse-is-the-message" label="The pulse is the message — how the pituitary reads GnRH rhythm" />
                <CrossLink href="/insights/the-rest-of-the-cascade" label="The rest of the cascade — LH, FSH and hCG downstream" />
                <CrossLink href="/insights/the-body-keeps-time" label="The body keeps time — pulsatility across the hormone systems" />
                <CrossLink href="/families/reproductive-gonadal" label="The reproductive & gonadal family" />
                <CrossLink href="/research?q=How%20do%20KNDy%20neurons%20and%20neurokinin%20B%20cause%20menopausal%20hot%20flashes%2C%20and%20what%20did%20the%20fezolinetant%20and%20elinzanetant%20trials%20show%3F" label="Ask the research agent about KNDy neurons and hot flashes" />
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

/* ── One KNDy burst, two destinations: the LH pulse and the hot flash ── */
function KndyDiagram() {
  const W = 720;
  const H = 300;
  const ROSE = "var(--accent-rose)";
  const INK = "var(--color-ink)";

  const Box = ({ x, y, w, h, name, sub, hot = false }: { x: number; y: number; w: number; h: number; name: string; sub: string; hot?: boolean }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12}
        fill={hot ? "color-mix(in srgb, var(--accent-rose) 13%, transparent)" : "var(--panel)"}
        stroke={hot ? ROSE : INK} strokeOpacity={hot ? 0.6 : 0.22} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + h / 2 - 3} textAnchor="middle" fill={INK} fillOpacity={0.9} fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{name}</text>
      <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fill={INK} fillOpacity={0.5} fontSize="10.5">{sub}</text>
    </g>
  );

  const Head = ({ x, y }: { x: number; y: number }) => (
    <path d={`M ${x} ${y} l -7 -4 v 8 z`} fill={INK} fillOpacity={0.45} />
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="How one KNDy neuron burst produces both an LH pulse and a hot flash. Estrogen normally restrains the KNDy neuron; at menopause that restraint is lost. The neuron sends kisspeptin to the GnRH neuron, producing an LH pulse from the pituitary, and sends neurokinin B to the brain's thermostat in the preoptic area via the NK3 receptor, producing flushing and sweating. NK3 receptor antagonists such as fezolinetant and elinzanetant block the second path."
      >
        {/* estrogen brake */}
        <Box x={36} y={22} w={170} h={50} name="Estrogen" sub="lost at menopause" />
        <line x1={121} y1={72} x2={121} y2={112} stroke={INK} strokeOpacity={0.4} strokeWidth={1.6} />
        <line x1={109} y1={112} x2={133} y2={112} stroke={INK} strokeOpacity={0.55} strokeWidth={2.4} />
        <text x={142} y={98} fill={INK} fillOpacity={0.5} fontSize="10.5">restrains</text>

        {/* the KNDy neuron */}
        <Box x={36} y={122} w={170} h={64} name="KNDy neuron" sub="arcuate nucleus" hot />
        <text x={121} y={206} textAnchor="middle" fill={INK} fillOpacity={0.5} fontSize="10.5">neurokinin B starts the burst,</text>
        <text x={121} y={220} textAnchor="middle" fill={INK} fillOpacity={0.5} fontSize="10.5">dynorphin stops it</text>

        {/* upper path: kisspeptin → GnRH → LH pulse */}
        <path d="M 206 142 H 250 V 62 H 331" fill="none" stroke={INK} strokeOpacity={0.4} strokeWidth={1.6} />
        <Head x={338} y={62} />
        <text x={292} y={52} textAnchor="middle" fill={ROSE} fontSize="11" fontWeight="600">kisspeptin</text>
        <Box x={340} y={36} w={140} h={52} name="GnRH neuron" sub="one pulse per burst" />
        <line x1={480} y1={62} x2={531} y2={62} stroke={INK} strokeOpacity={0.4} strokeWidth={1.6} />
        <Head x={538} y={62} />
        <Box x={540} y={36} w={146} h={52} name="LH pulse" sub="from the pituitary" />

        {/* lower path: neurokinin B → thermostat → hot flash */}
        <path d="M 206 166 H 250 V 246 H 331" fill="none" stroke={INK} strokeOpacity={0.4} strokeWidth={1.6} />
        <Head x={338} y={246} />
        <text x={292} y={272} textAnchor="middle" fill={ROSE} fontSize="11" fontWeight="600">neurokinin B</text>
        <Box x={340} y={220} w={140} h={52} name="Thermostat" sub="preoptic area · NK3R" />
        <line x1={480} y1={246} x2={531} y2={246} stroke={INK} strokeOpacity={0.4} strokeWidth={1.6} />
        <Head x={538} y={246} />
        <Box x={540} y={220} w={146} h={52} name="Hot flash" sub="flushing · sweating" hot />

        {/* drug block on the lower path */}
        <line x1={292} y1={235} x2={292} y2={257} stroke="var(--accent-blue)" strokeWidth={2.6} />
        <line x1={292} y1={233} x2={292} y2={190} stroke="var(--accent-blue)" strokeOpacity={0.5} strokeWidth={1} strokeDasharray="2 3" />
        <text x={270} y={168} fill="var(--accent-blue)" fillOpacity={0.9} fontSize="10.5">NK3 receptor blockers act here</text>
        <text x={270} y={182} fill="var(--accent-blue)" fillOpacity={0.9} fontSize="10.5">(fezolinetant, elinzanetant)</text>

        {/* same clock note */}
        <text x={613} y={150} textAnchor="middle" fill={INK} fillOpacity={0.5} fontSize="10.5">same burst,</text>
        <text x={613} y={164} textAnchor="middle" fill={INK} fillOpacity={0.5} fontSize="10.5">same clock</text>
        <line x1={613} y1={92} x2={613} y2={136} stroke={INK} strokeOpacity={0.25} strokeWidth={1} strokeDasharray="2 3" />
        <line x1={613} y1={172} x2={613} y2={216} stroke={INK} strokeOpacity={0.25} strokeWidth={1} strokeDasharray="2 3" />
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        One population of neurons has two outputs. Kisspeptin drives the reproductive
        pulse; neurokinin B reaches the thermostat. Without estrogen to restrain the
        cell, the second output becomes a hot flash.
      </figcaption>
    </figure>
  );
}
