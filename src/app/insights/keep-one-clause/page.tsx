import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("keep-one-clause")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Peptide Fragment Engineering: Cutting a Hormone Down to One Activity — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "Keep One Clause: The Fragment-Engineering Playbook, and Why It Succeeds or Fails · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources (reused anchors) — named inline so the grade stays checkable.
const REF = {
  neer: "https://pubmed.ncbi.nlm.nih.gov/11346808/", // Neer et al. 2001, NEJM — teriparatide, PTH(1-34), a fragment that became a drug
  brines: "https://pubmed.ncbi.nlm.nih.gov/18676614/", // Brines et al. 2008, PNAS — the 11-mer helix-B peptide (ARA-290), a clean split
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is peptide fragment engineering?",
    a: "It is a drug-design strategy: take a hormone that does several things at once, and cut it down to the short fragment that carries just the one activity you want — then armor that fragment against the enzymes that would destroy it. The goal is a molecule that does one of the parent hormone's jobs without the others. It works because a receptor often reads only a small patch of a hormone's surface, so a fragment can engage one receptor while losing affinity for the rest.",
  },
  {
    q: "Does cutting a hormone to one fragment actually give you just one effect?",
    a: "The subtraction is the reliable part — a well-chosen fragment really does drop the parent's other activities, and that's easy to verify (no IGF-1 rise, no cortisol, no red cells). What's not guaranteed is that the activity you kept still works, still matters, or holds up in humans. That second half is the hard, trial-dependent part, and it is where fragment drugs succeed or fail. A clean cut proves what you removed, not that what remains does anything.",
  },
  {
    q: "Which real drugs are hormone fragments?",
    a: "Several. Teriparatide is PTH(1-34), the active N-terminal fragment of parathyroid hormone, and it became the first bone-building osteoporosis drug. Tesamorelin and sermorelin are fragments of growth-hormone-releasing hormone. Cosyntropin, used in the ACTH stimulation test, is ACTH(1-24). Fragment engineering is behind approved medicine, not just research peptides.",
  },
  {
    q: "Why do some fragment peptides fail?",
    a: "Because the kept clause turns out to be empty in people. AOD-9604, the 'lipolytic fragment' of growth hormone, cleanly separated fat metabolism from GH's growth and glucose actions — but produced no significant weight loss in human obesity trials. The split succeeded and the prize evaporated. It is the clearest reminder that isolating a fragment is only worth it if the effect you wanted survives the isolation in a human being.",
  },
  {
    q: "How should I read a claim that a peptide has 'none of the side effects'?",
    a: "Carefully, because that phrase describes the subtraction, not the benefit. 'None of growth hormone's side effects' is a statement about what a fragment removed, which is the easy, verifiable half. It says nothing about whether the fragment delivers the effect it is sold for, which is the half that needs a controlled trial. Many fragment-peptide marketing claims rest entirely on the subtraction while implying the retention.",
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
              <Link href="/families/melanocortins" className="text-accent-amber hover:text-ink">
                Melanocortins
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
            <Section title="Hormones say several things at once">
              <P>
                A hormone is rarely a single instruction. Growth hormone grows tissue,
                raises IGF-1, pushes glucose up, and mobilizes fat. α-MSH colors the skin,
                curbs the appetite, and calms inflammation. Erythropoietin builds red cells
                and protects injured tissue. ACTH drives cortisol and is, separately,
                neuroactive. One molecule, several clauses — and most of the time you only
                want one of them. The side effects of a hormone drug are usually just its
                other clauses, firing when you didn&rsquo;t ask.
              </P>
              <P>
                So a recurring move in peptide design is to cut the hormone down to the
                fragment that carries the clause you want, and throw the rest away. This site
                has met that move again and again, always locally. Here it is as one playbook
                — the engineering recipe, the real drugs it has produced, and the honest
                reason the same smart design sometimes delivers a medicine and sometimes a
                molecule that does nothing. Bullish on the method, exact about the verdicts.
              </P>
            </Section>

            <Section title="Why a fragment can work">
              <P>
                The design rests on a fact about receptors: they often read only a small
                patch of a hormone&rsquo;s surface, not the whole molecule. The active face
                that triggers one receptor can be a handful of residues, and the parts that
                engage the hormone&rsquo;s <Em>other</Em> receptors can sit elsewhere on the
                chain. Cut out the active patch and you have a fragment that still speaks to
                one receptor while having lost its grip on the others — one clause, kept.
              </P>
              <P>
                There is a second, mechanical step. A naked fragment is usually destroyed in
                minutes, so the practical version of the trick adds a protecting group — a
                cap, a resistant residue, a tail the body&rsquo;s peptidases cannot cleave.
                The engineered result is a short, durable peptide that does one of the
                parent&rsquo;s jobs. That is the whole recipe: find the clause, cut it out,
                armor it. The interesting question is always what happens next.
              </P>
            </Section>

            <Section title="When it becomes a drug">
              <P>
                Done well, the playbook produces real medicine. The clearest case is{" "}
                <Link href="/insights/teriparatide-backwards" className={LINK}>teriparatide</Link>,
                which is simply PTH(1-34) — the active N-terminal fragment of parathyroid
                hormone, the part that fires the receptor — and which became the first drug
                that <Em>builds</Em> bone rather than merely slowing its loss (
                <a href={REF.neer} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Neer et&nbsp;al., NEJM, 2001
                </a>
                ). The{" "}
                <Link href="/insights/two-ways-to-ask-for-growth" className={LINK}>
                  growth-hormone-releasing hormone
                </Link>{" "}
                drugs tesamorelin and sermorelin are fragments of GRF, kept to its first 29
                residues. And cosyntropin, the synthetic ACTH(1-24) used in the{" "}
                <Link href="/insights/the-chain-of-command" className={LINK}>
                  adrenal stimulation test
                </Link>
                , is a fragment repurposed as a diagnostic.
              </P>
              <P>
                These are not research-peptide curiosities; they are approved, routine tools
                of endocrinology. The lesson they carry is that fragment engineering is a
                legitimate and productive strategy — when the kept clause is both real and
                clinically useful, cutting the hormone down to it is exactly the right thing
                to do.
              </P>
            </Section>

            <Section title="When the clause is real but unproven — or empty">
              <P>
                The same design, applied to the research-peptide frontier, fans out into very
                different verdicts, and reading which is which is the whole skill.{" "}
                <Link href="/insights/the-last-three-words" className={LINK}>KPV</Link>, the
                last three residues of α-MSH, keeps the hormone&rsquo;s anti-inflammatory
                clause and drops its pigment and appetite ones — a genuine, if still
                lightly-evidenced, retained activity.{" "}
                <Link href="/insights/epo-without-the-blood" className={LINK}>ARA-290</Link>,
                an 11-residue slice of erythropoietin&rsquo;s helix-B face, separates
                EPO&rsquo;s tissue protection from its red-cell effect as cleanly as the
                design ever manages (
                <a href={REF.brines} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Brines et&nbsp;al., PNAS, 2008
                </a>
                ) — elegant mechanism, but a thin, unproven clinic.{" "}
                <Link href="/insights/written-for-the-brain" className={LINK}>Semax</Link>
                {" "}keeps ACTH(4-10)&rsquo;s neuroactivity while shedding its
                cortisol-releasing role — registered and used in Russia, barely evidenced
                anywhere else.
              </P>
              <P>
                And then the cautionary one.{" "}
                <Link href="/insights/the-half-that-did-nothing" className={LINK}>AOD-9604</Link>,
                the lipolytic tail of growth hormone, executed the split perfectly: it drove
                fat metabolism in rodents with no IGF-1 rise and no glucose penalty. The
                separation succeeded completely — and the kept clause turned out to be empty
                in people, producing no significant weight loss in human obesity trials. Four
                molecules, one design, four different places on the spectrum from &ldquo;real
                drug&rdquo; to &ldquo;hollow fragment.&rdquo;
              </P>
              <OutcomeSpectrum />
            </Section>

            <Section title="What the split guarantees, and what it doesn't">
              <P>
                Line those cases up and a clean rule emerges. The fragment design has two
                halves, and they are not equally trustworthy. The <Em>subtraction</Em> — you
                dropped the parent&rsquo;s other activities — is the easy, verifiable half.
                You can measure it directly: no IGF-1, no cortisol, no rise in hematocrit. The{" "}
                <Em>retention</Em> — the clause you kept still works, still matters, still
                holds up in a human — is the hard half, and the only one that decides whether
                you have a drug. A clean cut proves what you removed. It proves nothing about
                what remains.
              </P>
              <P>
                That asymmetry is exactly what a marketplace exploits. &ldquo;None of growth
                hormone&rsquo;s side effects&rdquo; is a true and verifiable statement about
                the subtraction, deployed to imply a benefit the retention side never
                established. The honest reader&rsquo;s move is to ask which half a claim
                actually rests on: a fragment peptide that leads with everything it
                <Em> doesn&rsquo;t</Em> do is usually quiet about whether the one thing it is
                supposed to do has survived a trial.
              </P>
              <Callout label="The rule of the fragment">
                A fragment drug is only as good as its kept clause tested in people. The design
                reliably removes what you don&rsquo;t want; it does not promise that what you
                kept works. Judge these molecules on the retained effect&rsquo;s evidence, never
                on the elegance of the subtraction — teriparatide and AOD-9604 are the same
                move with opposite endings.
              </Callout>
            </Section>

            <Section title="One sentence, cut to a word">
              <P>
                Fragment engineering is one of the most elegant ideas in peptide medicine: a
                hormone is a sentence, and you can often keep just the word you need. When the
                word still carries meaning and that meaning is useful, you get teriparatide.
                When it doesn&rsquo;t, you get AOD-9604 — a grammatically perfect cut that says
                nothing. The method is sound across the whole spread; the verdicts are not, and
                they turn entirely on evidence for the piece you kept, not admiration for the
                piece you dropped.
              </P>
              <Bullets
                items={[
                  ["Hormones are pleiotropic; side effects are the other clauses", "GH, α-MSH, EPO and ACTH each do several things. Fragment engineering cuts the molecule to the one activity you want and discards the rest."],
                  ["Receptors read short motifs, so fragments work", "The active face is often a small patch; a fragment can engage one receptor while losing the others. Add a peptidase-resistant cap and you have a candidate."],
                  ["The playbook produces real drugs", "Teriparatide is PTH(1-34); tesamorelin and sermorelin are GRF fragments; cosyntropin is ACTH(1-24). Approved medicine, not just research peptides."],
                  ["The same design also fails", "KPV (real but light), ARA-290 (elegant, unproven), semax (registered abroad, thin), AOD-9604 (clean split, empty clause, failed trials) — one method, a spectrum of verdicts."],
                  ["Judge the retention, not the subtraction", "Dropping the other activities is easy and verifiable; keeping a useful effect is the trial-dependent hard part. 'None of the side effects' describes the easy half, not the benefit."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/the-last-three-words" label="The last three words — KPV, α-MSH's anti-inflammatory clause" />
                <CrossLink href="/insights/epo-without-the-blood" label="EPO without the blood — ARA-290, a clean split" />
                <CrossLink href="/insights/the-half-that-did-nothing" label="The half that did nothing — AOD-9604, the empty clause" />
                <CrossLink href="/insights/written-for-the-brain" label="Written for the brain — semax, ACTH's neuroactive fragment" />
                <CrossLink href="/insights/teriparatide-backwards" label="Teriparatide, backwards — PTH(1-34), a fragment that became a drug" />
                <CrossLink href="/families/melanocortins" label="The melanocortins family (POMC's many clauses)" />
                <CrossLink href="/research?q=How%20does%20peptide%20fragment%20engineering%20isolate%20one%20activity%20of%20a%20hormone%2C%20and%20why%20do%20some%20fragment%20drugs%20succeed%20while%20others%20fail%20in%20humans%3F" label="Ask the research agent about fragment engineering" />
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

/* ── One design, a spectrum of verdicts: did the kept clause deliver in humans? ── */
function OutcomeSpectrum() {
  const W = 700;
  const H = 230;
  const X0 = 70;
  const X1 = 630;
  const axisY = 150;

  // position 0 (empty) → 1 (approved drug)
  const items: { t: number; name: string; sub: string; tone: "good" | "mid" | "bad" }[] = [
    { t: 0.06, name: "AOD-9604", sub: "clean split, empty clause", tone: "bad" },
    { t: 0.42, name: "ARA-290", sub: "elegant, unproven", tone: "mid" },
    { t: 0.58, name: "semax", sub: "registered abroad, thin", tone: "mid" },
    { t: 0.74, name: "KPV", sub: "real but lightly evidenced", tone: "mid" },
    { t: 0.97, name: "teriparatide", sub: "approved drug", tone: "good" },
  ];
  const px = (t: number) => X0 + t * (X1 - X0);
  const color = (tone: string) =>
    tone === "good" ? "var(--accent-amber)" : tone === "bad" ? "var(--color-ink)" : "var(--accent-amber)";

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A spectrum line for fragment peptides, from 'kept clause is empty in humans' on the left to 'approved drug' on the right. AOD-9604 sits at the far left (clean split but no human benefit); ARA-290, semax and KPV sit in the middle (mechanism real, clinical evidence thin or unproven); teriparatide sits at the far right as an approved drug. All used the same fragment-engineering design."
      >
        <text x={W / 2} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          One design, a spectrum of verdicts
        </text>
        <text x={W / 2} y={42} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10.5">
          does the kept clause deliver in humans?
        </text>

        {/* axis */}
        <line x1={X0} y1={axisY} x2={X1} y2={axisY} stroke="var(--color-ink)" strokeOpacity={0.2} strokeWidth={2} />
        <text x={X0} y={axisY + 40} textAnchor="start" fill="var(--color-ink)" fillOpacity={0.45} fontSize="9.5">empty clause</text>
        <text x={X1} y={axisY + 40} textAnchor="end" fill="var(--accent-amber)" fillOpacity={0.9} fontSize="9.5" fontWeight="600">approved drug</text>

        {items.map((it, i) => {
          const up = i % 2 === 0;
          const ly = up ? axisY - 20 : axisY + 20;
          const ty = up ? axisY - 40 : axisY + 54;
          return (
            <g key={it.name}>
              <line x1={px(it.t)} y1={axisY} x2={px(it.t)} y2={ly} stroke="var(--color-ink)" strokeOpacity={0.22} strokeWidth={1} />
              <circle cx={px(it.t)} cy={axisY} r={5.5} fill={color(it.tone)} fillOpacity={it.tone === "bad" ? 0.4 : 0.85} stroke={color(it.tone)} strokeOpacity={0.8} strokeWidth={1.2} />
              <text x={px(it.t)} y={ty - 11} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.85} fontSize="11" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">{it.name}</text>
              <text x={px(it.t)} y={ty + 1} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="8.5">{it.sub}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The same &ldquo;keep one clause&rdquo; cut spans from teriparatide, an approved drug, to
        AOD-9604, a flawless split of an empty clause. The design doesn&rsquo;t set the verdict —
        the evidence for the kept effect does.
      </figcaption>
    </figure>
  );
}
