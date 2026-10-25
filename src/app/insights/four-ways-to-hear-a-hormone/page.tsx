import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("four-ways-to-hear-a-hormone")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "The Four Peptide Hormone Receptor Families: GPCR, Tyrosine Kinase, Cytokine & Guanylyl Cyclase — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "Four Ways to Hear a Hormone: How One Receptor Class Decides a Peptide's Speed, Failure Mode and Druggability · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the mechanism stays checkable.
const REF = {
  gpcr: "https://www.nobelprize.org/prizes/chemistry/2012/summary/", // Lefkowitz & Kobilka 2012 — GPCRs
  insr: "https://pubmed.ncbi.nlm.nih.gov/8276809/", // insulin receptor autophosphorylation / signalling
  jak: "https://pubmed.ncbi.nlm.nih.gov/8232552/", // GH receptor activates JAK2
  npr: "https://pubmed.ncbi.nlm.nih.gov/1672777/", // natriuretic peptide receptor guanylyl cyclase
  adipo: "https://pubmed.ncbi.nlm.nih.gov/12802337/", // AdipoR1/R2 cloning — 7TM, not GPCR
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "How many receptor types do peptide hormones use?",
    a: "Almost the entire peptide-hormone catalog uses just four receptor classes. The overwhelming majority act through G-protein-coupled receptors (GPCRs) — a seven-pass membrane protein that switches on an internal G-protein and a second messenger such as cAMP or calcium. The three exceptions are receptor tyrosine kinases (insulin and the IGFs), cytokine receptors that borrow a JAK kinase and a STAT (growth hormone, leptin, EPO), and membrane guanylyl cyclases that make cGMP directly (the natriuretic peptides). Knowing which class a hormone uses predicts its speed, its failure mode, and how easy it is to drug.",
  },
  {
    q: "Why do most peptide hormones use GPCRs?",
    a: "A G-protein-coupled receptor is a fast, amplifying, re-usable switch. A single bound peptide activates many G-proteins, each generating a burst of second messenger, so a few molecules outside the cell produce a large signal inside it within seconds — ideal for the rapid, reversible, moment-to-moment control most hormones need. GPCRs are also the most druggable target class in all of pharmacology, which is why the incretin drugs, somatostatin analogs, GnRH agonists and melanocortin agonists are all GPCR-targeted.",
  },
  {
    q: "What makes insulin and IGF-1 different from the rest?",
    a: "Insulin, IGF-1 and IGF-2 are not heard by GPCRs. Their receptors are receptor tyrosine kinases — the receptor is itself an enzyme. When the hormone binds, the receptor phosphorylates itself and builds a signalling scaffold that recruits the PI3K/Akt and MAPK pathways. That is a growth-and-metabolism machine, not a cAMP switch, which is one reason insulin and IGF biology sits apart from the hormone families around it.",
  },
  {
    q: "Why does the receptor class matter for how a drug behaves?",
    a: "Because the class sets the rules. GPCRs act in seconds and desensitize when over-stimulated — which is exactly why pulsatile dosing works and continuous maximal dosing can silence a system. Cytokine receptors run through STATs to the nucleus, so their effects are gene-expression effects that take hours. Receptor tyrosine kinases drive growth programmes. And druggability tracks the class too: a GPCR is the easiest target in pharmacology, while an intracellular receptor is barely a target at all.",
  },
  {
    q: "Does knowing the receptor tell you whether a peptide works?",
    a: "No. A receptor and a second messenger are the bottom rung of the evidence ladder — they establish that a molecule can be heard, not that it produces a benefit in a person. Receptor-level mechanism is abundant and only loosely predictive of outcome. Knowing precisely how a hormone is heard is genuinely clarifying biology, but it is a separate and much weaker claim than proof that a given compound helps.",
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
              <Link href="/methodology" className="text-accent hover:text-ink">
                Methodology
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
            <Section title="Seventy molecules, four listeners">
              <P>
                The molecules in this reference look unrelated to the point of chaos. A gut
                peptide that times the stomach, a hormone that builds bone, a signal from fat
                that reports how much of it there is, a pituitary burst that orders puberty —
                nothing in the list seems to belong with anything else. But hormones do not act
                by existing; they act by being <Em>heard</Em>, and the machinery that hears them
                is not chaotic at all. Almost the entire catalog collapses into four ways a cell
                can receive a peptide. Learn the four and the field reorganizes along lines the
                molecule names hide.
              </P>
              <P>
                The claim worth holding onto is stronger than &ldquo;there are four
                receptors.&rdquo; It is that the <Em>receptor class tells you more about how a
                hormone behaves than the hormone&rsquo;s own identity does</Em> — its speed, the
                way it breaks, and whether anyone can build a drug against it. Two peptides that
                share a receptor class behave like cousins even when they do unrelated jobs; two
                that do similar jobs through different classes behave like strangers. So the
                right first question about any peptide on this site is not what it does, but how
                it is heard.
              </P>
              <ReceptorClasses />
            </Section>

            <Section title="The default: a G-protein-coupled receptor">
              <P>
                The overwhelming majority of the catalog is heard the same way — by a{" "}
                <Em>G-protein-coupled receptor</Em>, a single protein chain that threads back and
                forth through the membrane seven times. When the peptide docks on its outer face,
                the coil shifts and, on the inside, switches on a G-protein, which in turn fires a{" "}
                <Em>second messenger</Em>: usually cAMP (through a Gs protein) or a pulse of
                calcium (through Gq). The list is enormous —{" "}
                <Link href="/insights/glp-1-signaling" className={LINK}>GLP-1</Link> and glucagon,{" "}
                <Link href="/insights/teriparatide-backwards" className={LINK}>PTH</Link>,{" "}
                the <Link href="/insights/keep-one-clause" className={LINK}>melanocortins</Link>,{" "}
                <Link href="/insights/two-residues-apart" className={LINK}>oxytocin and
                vasopressin</Link>, the reproductive axis from{" "}
                <Link href="/insights/the-pulse-is-the-message" className={LINK}>GnRH</Link> down,{" "}
                <Link href="/insights/the-off-switch" className={LINK}>somatostatin</Link>,
                ghrelin, the gut peptides, amylin&rsquo;s receptor built from a calcitonin core.
                If you pick a peptide hormone at random, the smart bet is that a GPCR hears it (
                <a href={REF.gpcr} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lefkowitz &amp; Kobilka, Nobel Prize, 2012
                </a>
                ).
              </P>
              <P>
                The reason this one design dominates is that it is a fast, amplifying, re-usable
                switch. One bound peptide turns on many G-proteins, each spilling a burst of
                second messenger, so a handful of molecules outside the cell become a loud signal
                inside it — in seconds, and reversibly. That suits the moment-to-moment control
                most hormones are for. It also carries the family&rsquo;s signature weakness:
                over-stimulate a GPCR and it <Em>desensitizes</Em> — pulled off the surface and
                quieted. That single fact is the engine behind an idea this reference meets again
                and again, that{" "}
                <Link href="/insights/the-body-keeps-time" className={LINK}>the body keeps
                time</Link>: a pulsed signal lets the receptor recover between beats, while a
                continuous maximal one erases the pattern and reads as <Em>off</Em>. Pulsatility
                is not a quirk of a few hormones; it is what a desensitizing receptor forces on
                any system that wants to keep listening.
              </P>
            </Section>

            <Section title="The enzyme that is its own receptor">
              <P>
                The first great exception is small in number and huge in consequence:{" "}
                <Link href="/insights/insulin-to-the-peptide-boom" className={LINK}>insulin</Link>{" "}
                and the two <Link href="/insights/the-gene-the-parents-fight-over" className={LINK}>
                IGFs</Link>. Their receptors are not switches that borrow an enzyme — they{" "}
                <Em>are</Em> the enzyme. A receptor tyrosine kinase sits as a pre-formed pair; the
                hormone binds across it, the two halves phosphorylate each other, and the
                receptor&rsquo;s own newly active tail becomes a docking scaffold that recruits
                the PI3K/Akt and MAPK pathways (
                <a href={REF.insr} target="_blank" rel="noopener noreferrer" className={LINK}>
                  receptor autophosphorylation, 1994
                </a>
                ). No G-protein, no cAMP — a different machine entirely, built for growth and
                fuel storage rather than a quick reversible nudge.
              </P>
              <P>
                This is why insulin and IGF biology always sits a little apart from the hormones
                around it, and why the family has its own idiosyncrasies: a decoy{" "}
                <Link href="/insights/the-gene-the-parents-fight-over" className={LINK}>IGF-2
                receptor</Link> that signals nothing and exists only to clear the hormone, and
                engineered analogs like{" "}
                <Link href="/insights/igf-1-lr3" className={LINK}>IGF-1 LR3</Link> that win their
                potency by dodging the binding proteins rather than by hitting the receptor
                harder. Same receptor class, same logic — a self-activating kinase — running
                underneath all of it.
              </P>
            </Section>

            <Section title="The receptor that walks to the nucleus">
              <P>
                The third way is the <Em>cytokine receptor</Em>, and it is the one that produces
                the most counter-intuitive behavior. This receptor owns no enzyme of its own.
                Binding simply clamps two receptor halves together, which brings two tethered{" "}
                <Em>JAK</Em> kinases into contact; they activate, phosphorylate the receptor, and
                recruit a <Em>STAT</Em> protein that — once tagged — detaches, travels into the
                nucleus, and turns genes on directly (
                <a href={REF.jak} target="_blank" rel="noopener noreferrer" className={LINK}>
                  GH receptor activates JAK2, 1993
                </a>
                ). The signal&rsquo;s destination is the genome, so its effects are
                gene-expression effects, and they take <Em>hours</Em>, not seconds.
              </P>
              <P>
                Three catalog hormones you would never group by function are siblings here:{" "}
                <Link href="/insights/two-ways-to-ask-for-growth" className={LINK}>growth
                hormone</Link> (JAK2/STAT5, driving IGF-1 transcription in the liver),{" "}
                <Link href="/insights/the-hormone-discovered-twice" className={LINK}>leptin</Link>{" "}
                (JAK2/STAT3 in the hypothalamus), and the erythropoietin whose tissue-protective
                fragment became{" "}
                <Link href="/insights/epo-without-the-blood" className={LINK}>ARA-290</Link>. The
                shared receptor class explains the shared feel — slow, transcriptional, built to
                change what a cell is making rather than to flip it on and off. It even clarifies
                an exception-to-the-exception:{" "}
                <Link href="/insights/the-hormone-discovered-twice" className={LINK}>adiponectin</Link>&rsquo;s
                receptor looks like a GPCR&rsquo;s seven-pass coil but is wired backwards and
                signals as a membrane enzyme instead (
                <a href={REF.adipo} target="_blank" rel="noopener noreferrer" className={LINK}>
                  AdipoR1/R2 cloning, 2003
                </a>
                ) — a reminder that the shape of a receptor is not the same as its class.
              </P>
            </Section>

            <Section title="The receptor that makes its own signal">
              <P>
                The fourth way is the rarest and the tidiest. Here the receptor is a{" "}
                <Em>guanylyl cyclase</Em>: the peptide binds the outer face and the receptor&rsquo;s
                inner face directly manufactures cGMP, collapsing the whole relay into a single
                protein — no G-protein, no borrowed kinase, no second cast member (
                <a href={REF.npr} target="_blank" rel="noopener noreferrer" className={LINK}>
                  natriuretic peptide receptor-A, 1991
                </a>
                ). In this catalog that design belongs almost entirely to one family: the{" "}
                <Link href="/insights/the-heart-is-a-gland" className={LINK}>natriuretic
                peptides</Link> — ANP, BNP and CNP — through which{" "}
                <Link href="/insights/the-heart-is-a-gland" className={LINK}>the heart acts as a
                gland</Link>, telling the kidney and vessels to shed salt and relax. cGMP as the
                vasodilation messenger is the through-line that links these peptides to nitric
                oxide and to the drugs that work on the same cGMP axis.
              </P>
              <Callout label="Why the class is the clue">
                The receptor class predicts three things the hormone&rsquo;s name does not. Speed:
                a GPCR&rsquo;s second messenger acts in seconds; a cytokine receptor&rsquo;s STAT
                takes hours. Failure mode: GPCRs desensitize, which is why schedule and
                pulsatility matter and continuous maximal dosing can silence a system. Druggability:
                a GPCR is the most tractable target in pharmacology, which is why the incretins,
                somatostatin analogs and GnRH drugs exist — while a purely intracellular receptor
                is barely a target at all.
              </Callout>
            </Section>

            <Section title="What the receptor cannot tell you">
              <P>
                There is a line this clarity keeps tempting the page to cross. Knowing exactly how
                a hormone is heard — the coil, the kinase, the second messenger — feels like
                knowing what it does. It is not. A receptor and a second messenger are the{" "}
                <Link href="/insights/mechanism-is-not-proof" className={LINK}>bottom rung of the
                evidence ladder</Link>: they establish that a molecule <Em>can</Em> be heard, which
                is abundant and cheap, and only loosely tied to whether the molecule helps a
                person, which is rare and expensive. &ldquo;It binds the GLP-1 receptor&rdquo; and
                &ldquo;it produces the outcome you wanted&rdquo; are different claims on different
                rungs, and the receptor story only ever buys you the first.
              </P>
              <P>
                So the four listeners are a map of the mechanism, not a verdict on the molecules.
                That is exactly the right use of them, and a genuinely powerful one: the class
                tells you how a hormone will move, how it will break, and whether it can be
                drugged — the whole grammar of how the catalog signals — while leaving the
                question of benefit where it belongs, with the trials. Bullish on the science;
                the science here is how a cell listens.
              </P>
              <Bullets
                items={[
                  ["Almost everything is a GPCR", "A seven-pass receptor that switches on a G-protein and a second messenger (cAMP or calcium) — GLP-1, PTH, melanocortins, oxytocin/vasopressin, GnRH, somatostatin, ghrelin, the gut peptides, amylin. Fast, amplifying, and the most druggable class there is."],
                  ["Insulin and the IGFs are receptor tyrosine kinases", "The receptor is its own enzyme: it phosphorylates itself into a scaffold for the PI3K/Akt and MAPK pathways. A growth-and-metabolism machine, not a cAMP switch."],
                  ["GH, leptin and EPO are cytokine receptors", "No enzyme of their own — they borrow a JAK kinase and send a STAT to the nucleus. Gene-expression effects that take hours, not seconds."],
                  ["The natriuretic peptides are guanylyl cyclases", "The receptor makes cGMP directly, collapsing the relay into one protein. The heart's salt-and-vessel signal runs on the same messenger as nitric oxide."],
                  ["The class predicts behavior; it does not prove benefit", "Receptor class sets speed, desensitization and druggability — but a receptor is the bottom rung of the evidence ladder. How a hormone is heard is not whether a molecule works."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/glp-1-signaling" label="What does GLP-1 do — the GPCR archetype, step by step" />
                <CrossLink href="/insights/the-body-keeps-time" label="The body keeps time — why GPCR desensitization makes pulsatility matter" />
                <CrossLink href="/insights/the-hormone-discovered-twice" label="The hormone discovered twice — leptin's JAK-STAT, adiponectin's exception" />
                <CrossLink href="/insights/the-heart-is-a-gland" label="The heart is a gland — the guanylyl-cyclase natriuretic peptides" />
                <CrossLink href="/insights/mechanism-is-not-proof" label="Mechanism is not proof — why a receptor is the bottom rung" />
                <CrossLink href="/research?q=Which%20receptor%20class%20does%20this%20peptide%20signal%20through%2C%20and%20what%20does%20that%20predict%20about%20its%20speed%20and%20druggability%3F" label="Ask the research agent about a receptor" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on receptor signaling, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing guidance, or a
              recommendation to use any compound. Receptor classifications are named to explain
              mechanism; verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The four receptor classes almost the entire catalog collapses into ── */
function ReceptorClasses() {
  const W = 720;
  const H = 300;
  const cols = [
    {
      name: "GPCR",
      sub: "seven-pass switch",
      msg: "→ cAMP / Ca²⁺",
      speed: "seconds",
      eg: "GLP-1 · PTH · GnRH · oxytocin",
      share: "most of the catalog",
    },
    {
      name: "Receptor tyrosine kinase",
      sub: "the receptor is the enzyme",
      msg: "→ PI3K / Akt",
      speed: "min–hrs",
      eg: "insulin · IGF-1 · IGF-2",
      share: "growth & metabolism",
    },
    {
      name: "Cytokine receptor",
      sub: "borrows a JAK, sends a STAT",
      msg: "→ gene transcription",
      speed: "hours",
      eg: "GH · leptin · EPO",
      share: "gene-expression hormones",
    },
    {
      name: "Guanylyl cyclase",
      sub: "makes its own messenger",
      msg: "→ cGMP",
      speed: "seconds",
      eg: "ANP · BNP · CNP",
      share: "the heart's salt signal",
    },
  ];
  const n = cols.length;
  const pad = 16;
  const gutter = 12;
  const cw = (W - pad * 2 - gutter * (n - 1)) / n;
  const top = 58;
  const colH = H - top - 20;
  const memY = top + 70; // membrane line within each card

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="The four receptor classes almost the entire peptide-hormone catalog collapses into. First, G-protein-coupled receptors — a seven-pass membrane switch that produces cAMP or calcium in seconds; most of the catalog, including GLP-1, PTH, GnRH and oxytocin. Second, receptor tyrosine kinases, where the receptor is itself the enzyme and signals through PI3K/Akt over minutes to hours; insulin, IGF-1 and IGF-2. Third, cytokine receptors, which borrow a JAK kinase and send a STAT to the nucleus to change gene transcription over hours; growth hormone, leptin and EPO. Fourth, guanylyl-cyclase receptors, which make cGMP directly in seconds; the natriuretic peptides ANP, BNP and CNP. The receptor class predicts a hormone's speed, failure mode and druggability."
      >
        <text x={W / 2} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Four ways a cell hears a peptide
        </text>
        <text x={W / 2} y={42} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10.5">
          ligand outside · machinery in the membrane · messenger inside
        </text>

        {cols.map((c, i) => {
          const x = pad + i * (cw + gutter);
          const cx = x + cw / 2;
          return (
            <g key={c.name}>
              {/* card */}
              <rect x={x} y={top} width={cw} height={colH} rx={10}
                fill="color-mix(in srgb, var(--accent) 5%, transparent)"
                stroke="var(--accent)" strokeOpacity={0.3} strokeWidth={1.1} />

              {/* name + sub */}
              <text x={cx} y={top + 18} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.9} fontSize="10.5" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">{c.name}</text>
              <text x={cx} y={top + 32} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="8">{c.sub}</text>

              {/* ligand */}
              <circle cx={cx} cy={top + 50} r={5} fill="var(--accent)" fillOpacity={0.85} />

              {/* membrane band */}
              <rect x={x + 8} y={memY} width={cw - 16} height={12} rx={3} fill="var(--color-ink)" fillOpacity={0.09} />
              {/* arrow through membrane */}
              <line x1={cx} y1={top + 56} x2={cx} y2={memY + 24} stroke="var(--accent)" strokeOpacity={0.55} strokeWidth={1.3} markerEnd={`url(#rc-arrow)`} />

              {/* second messenger */}
              <text x={cx} y={memY + 42} textAnchor="middle" fill="var(--accent)" fillOpacity={0.9} fontSize="9.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{c.msg}</text>
              <text x={cx} y={memY + 58} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.45} fontSize="8">{c.speed}</text>

              {/* examples + share pinned near the bottom */}
              <text x={cx} y={top + colH - 24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.7} fontSize="7.5" fontFamily="var(--font-space-grotesk), sans-serif">{c.eg}</text>
              <text x={cx} y={top + colH - 11} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="7.5" fontStyle="italic">{c.share}</text>
            </g>
          );
        })}

        <defs>
          <marker id="rc-arrow" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto"><path d="M1 1 L4 6 L7 1" fill="none" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1.3" /></marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The hormone&rsquo;s name tells you its job; the receptor class tells you its speed, how it
        breaks, and whether it can be drugged.
      </figcaption>
    </figure>
  );
}
