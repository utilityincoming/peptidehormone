import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("mechanism-is-not-proof")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Mechanism Is Not Proof: The Evidence Ladder for Reading Any Peptide Claim — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "Mechanism Is Not Proof: How to Read a Peptide Claim by Its Rung on the Evidence Ladder · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  cast: "https://pubmed.ncbi.nlm.nih.gov/1900101/", // Echt et al. 1991, NEJM — CAST: antiarrhythmics suppressed the surrogate, raised mortality
  nass: "https://doi.org/10.7326/0003-4819-149-9-200811040-00003", // Nass et al. 2008, Ann Intern Med — MK-677 raised IGF-1/lean mass, no strength gain
  fleming: "https://doi.org/10.7326/0003-4819-125-7-199610010-00011", // Fleming & DeMets 1996, Ann Intern Med — the canonical surrogate-endpoint critique
  ioannidis: "https://doi.org/10.1371/journal.pmed.0020124", // Ioannidis 2005, PLoS Med — Why Most Published Research Findings Are False
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What does 'the mechanism is real but it's not proven' mean?",
    a: "It means the molecule genuinely does what the biology says — there is a receptor, a pathway, a plausible chain of cause and effect — but that is a different and much weaker claim than 'it produces the benefit people want.' Mechanism sits near the bottom of the evidence ladder: it is abundant, cheap to establish, and only loosely predictive of whether a drug helps a person. Proof of benefit sits near the top, and it takes controlled human trials that most peptide claims have never had.",
  },
  {
    q: "What is a surrogate marker, and why is it a trap?",
    a: "A surrogate marker is something measurable that stands in for the outcome you actually care about — IGF-1 or lean mass on a scan instead of strength, a biomarker instead of survival. It is a trap because a surrogate can move impressively while the real outcome doesn't follow, or even worsens. The classic warning is the CAST trial, where drugs that suppressed heart arrhythmias — the surrogate — increased deaths. A moving marker is a promise the outcome must still keep.",
  },
  {
    q: "Why can't you compare weight-loss percentages between different trials?",
    a: "Because numbers from separate trials aren't measured on the same ruler. Different participants, durations, doses and analysis methods make a 24% in one early-phase study and a 20% in a large phase 3 non-interchangeable. Lining them up as a league table is one of the most common errors in reading this field. A trial result tells you about that trial's population; it does not let you rank a drug against others tested elsewhere.",
  },
  {
    q: "Why does independent replication matter so much?",
    a: "Because replication is the audit. A striking result produced by one lab, and never reproduced by an unrelated group, is not proven — it is unaudited, which is a different and more honest word than either 'true' or 'false.' A claim is only as trustworthy as the number of independent people who can check it and get the same answer. When the finding and the people who produced it occupy the same room, the strongest-sounding claims deserve the most caution.",
  },
  {
    q: "If the evidence is weak, why cover these molecules at all?",
    a: "Because low-rung evidence is still real science, and often genuinely exciting — mechanism and animal data are where discovery lives and the frontier works as it should. The problem is never having early evidence; it is selling early evidence as if it were proof. Grading a claim by its true rung, plainly, lets a reader stay excited about the biology while staying honest about the benefit. Downgrading a claim is free; upgrading it requires a source.",
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
            <Section title="Bullish on the science, sceptical on the page">
              <P>
                Every deep-dive on this site ends the same way: <Em>bullish on the science,
                sceptical on the page.</Em> It is not a hedge. It is a claim that two things
                people routinely merge are actually separate and graded on different evidence.
                &ldquo;The science&rdquo; is the mechanism — the receptor, the pathway, the
                plausible chain of cause and effect. &ldquo;The page&rdquo; is the benefit —
                the thing the molecule is sold to do in an actual person. A compound can have
                landmark-grade science and an empty page, and most of the peptide world lives
                in exactly that gap.
              </P>
              <P>
                This piece is the map of the gap: the ladder the whole reference grades
                against, told as an argument rather than a{" "}
                <Link href="/methodology" className={LINK}>standard</Link>. Learn to read the
                rung a claim actually sits on and the field reorganizes itself — the genuinely
                proven separates from the merely promising, and the sentence &ldquo;it
                works&rdquo; splits into the several very different things it can mean.
              </P>
            </Section>

            <Section title="The ladder">
              <P>
                Evidence is not one thing. It comes in rungs, and each rung up is dramatically
                harder to reach, rarer, and more predictive of whether a drug helps a person.
                At the bottom sits a <Em>plausible mechanism</Em> — a receptor and a story —
                which is cheap, abundant, and only loosely tied to benefit. Above it,{" "}
                <Em>cell data</Em>, then <Em>animal efficacy</Em>: real results, but a mouse
                is not a person, and the graveyard of drugs that cured rodents and failed
                humans is enormous. Higher still, <Em>human surrogate markers</Em> — a number
                in the blood or on a scan moves. Near the top, the rung that actually matters:
                a <Em>controlled human outcome</Em>, the thing you wanted, measured against
                placebo. And at the summit, <Em>independent replication</Em> and approval — the
                result confirmed by people with no stake in it.
              </P>
              <P>
                The trouble is that a claim&rsquo;s confidence should be set by its{" "}
                <Em>highest</Em> rung of real evidence, and the market sets it by its most
                flattering sentence. A molecule with nothing but a receptor and a rodent study
                gets described in the language of the top rung. Reading well is mostly the
                discipline of asking, every time: what is the best evidence here, and which
                rung is it actually on?
              </P>
              <EvidenceLadder />
            </Section>

            <Section title="The surrogate trap">
              <P>
                The most seductive error on the ladder is mistaking a surrogate for an
                outcome — a marker that moves for the benefit you actually want. It is
                seductive because the marker is real and the graph looks like success. The
                definitive warning comes from outside the peptide world: in the CAST trial,
                drugs that suppressed the heart arrhythmias thought to cause sudden death —
                the surrogate moved beautifully — <Em>increased</Em> mortality (
                <a href={REF.cast} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Echt et&nbsp;al., NEJM, 1991
                </a>
                ). The thing everyone was sure the marker predicted went the opposite way.
              </P>
              <P>
                The peptide field&rsquo;s own version is quieter but identical in shape.{" "}
                <Link href="/insights/two-ways-to-ask-for-growth" className={LINK}>MK-677</Link>{" "}
                raised IGF-1 and added lean mass on the scan for a full year — surrogates
                moving exactly as promised — while strength and physical function, the
                outcomes anyone actually wanted, did not improve, and glucose drifted up (
                <a href={REF.nass} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Nass et&nbsp;al., Ann&nbsp;Intern&nbsp;Med, 2008
                </a>
                ). The same split shadows the whole field: GH secretagogues that raise IGF-1,
                incretins measured by{" "}
                <Link href="/insights/read-by-the-brain" className={LINK}>craving scores</Link>,
                fragments judged by a marker in a mouse. A surrogate is a promissory note. The
                outcome is the only thing that pays it, and sometimes it bounces.
              </P>
              <P>
                This is not a fringe caution; it is the settled view of the people who design
                trials for a living. The canonical statement is Fleming and DeMets&rsquo;s —
                a surrogate is trustworthy only if the treatment&rsquo;s effect on the marker
                reliably predicts its effect on the outcome, a condition that fails far more
                often than intuition expects (
                <a href={REF.fleming} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Fleming &amp; DeMets, Ann&nbsp;Intern&nbsp;Med, 1996
                </a>
                ). Their line has outlived the paper: a correlate does not a surrogate make.
              </P>
              <Callout label="The surrogate rule">
                A moving marker is a hypothesis, not a result. Whenever a claim rests on a
                biomarker — IGF-1, lean mass, a lab value — ask what happened to the outcome the
                marker is standing in for. If the outcome wasn&rsquo;t measured, the claim is one
                rung lower than it sounds; if it was measured and didn&rsquo;t follow, the claim
                is refuted, however good the marker looked.
              </Callout>
            </Section>

            <Section title="The cross-trial trap, and the replication rung">
              <P>
                Two more failures live high on the ladder, where the evidence looks strong. The
                first is the <Em>cross-trial comparison</Em>. Even a solid controlled result
                cannot be ranked against a result from a different trial — different people,
                durations, doses and analyses mean the numbers aren&rsquo;t on the same ruler.
                When{" "}
                <Link href="/insights/the-molecule-that-is-both-halves" className={LINK}>
                  amycretin&rsquo;s
                </Link>{" "}
                early 24% weight loss gets lined up against other drugs&rsquo; phase-3 figures,
                the comparison is exactly the one the data cannot support. A trial tells you
                about its own population; it does not hand you a league table.
              </P>
              <P>
                The second is the top rung itself: <Em>independent replication</Em>. A striking
                finding produced by a single group and never reproduced by anyone else is not
                proven — it is <Em>unaudited</Em>, which is a more honest word than true or
                false. The reasons a lone result tends to be wrong — small studies, small
                effects, flexible analysis, and a stake in the answer — are the ones Ioannidis
                laid out in the most-cited argument for why most published findings don&rsquo;t
                hold up (
                <a href={REF.ioannidis} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ioannidis, PLoS&nbsp;Med, 2005
                </a>
                ).{" "}
                <Link href="/insights/the-clock-you-cant-audit" className={LINK}>
                  Epitalon&rsquo;s
                </Link>{" "}
                telomerase and longevity claims are the clean example: elegant, bold, and
                almost entirely confined to the network that produced them. And a rung below
                even that is the one the{" "}
                <Link href="/insights/the-trial-that-hasnt-reported" className={LINK}>
                  headlines
                </Link>{" "}
                keep failing — the difference between a trial that has <Em>enrolled</Em> and a
                trial that has <Em>reported</Em>. A protocol is not a result, and a committee
                vote is not a rule.
              </P>
            </Section>

            <Section title="Why the low rungs are still worth telling">
              <P>
                None of this is a counsel of dismissal, and that is the half that keeps the
                site bullish. Mechanism, cell data, animal efficacy — these are real science,
                frequently beautiful, and they are where discovery actually happens. A molecule
                sitting on a low rung is not a fraud; it is the frontier working as it should,
                a candidate that has earned attention and not yet earned a verdict. The sin is
                never possessing early-stage evidence. The sin is <Em>presenting</Em> it as if
                it were proof — dressing a rodent study in the language of a clinical outcome,
                selling a receptor as a result.
              </P>
              <P>
                So the discipline is not scepticism for its own sake; it is calibration. Say
                which rung a claim sits on, plainly, and a reader can be genuinely excited about
                the biology while staying honest about the benefit. The standard the whole
                catalog runs on captures it in one line: downgrading a claim is free, but
                upgrading it requires a source.
              </P>
            </Section>

            <Section title="Reading the rung">
              <P>
                Almost every confusing peptide claim resolves into a question about rungs. The
                molecule with a brilliant mechanism and no human data; the trial whose marker
                soared while its outcome sat still; the breakthrough nobody outside one lab has
                reproduced; the phase 3 that has started but not finished — each is a low rung
                wearing a high rung&rsquo;s clothes. There is one question that cuts through all
                of them, and it is worth carrying to every page on this site and every claim
                off it: <Em>what is the best evidence, and which rung is it on?</Em> Answer that
                honestly and the rest follows.
              </P>
              <Bullets
                items={[
                  ["Science and benefit are graded separately", "'Bullish on the science, sceptical on the page' means the mechanism can be real while the proof of benefit is absent — different claims, different evidence."],
                  ["Evidence comes in rungs", "Plausible mechanism → cell data → animal efficacy → human surrogate markers → controlled human outcome → independent replication. Each rung up is rarer and more predictive; confidence should track the highest real rung."],
                  ["The surrogate trap", "A marker can move while the outcome doesn't follow or worsens — CAST (arrhythmia suppression, more deaths); MK-677 (IGF-1 and lean mass up, strength flat). A moving marker is a promissory note."],
                  ["The cross-trial and replication traps", "You can't rank numbers across separate trials (amycretin), and a result no independent lab has reproduced is unaudited, not proven (epitalon). Enrolled is not reported."],
                  ["Low rungs are real science — just label them", "Mechanism and animal data are where discovery lives; the error is selling them as proof. Grade the rung plainly: downgrade is free, upgrade needs a source."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/methodology" label="Methodology & standards — the evidence ladder as a standard" />
                <CrossLink href="/insights/two-ways-to-ask-for-growth" label="Two ways to ask for growth — the surrogate/outcome split (MK-677)" />
                <CrossLink href="/insights/the-molecule-that-is-both-halves" label="The molecule that is both halves — the cross-trial trap (amycretin)" />
                <CrossLink href="/insights/the-clock-you-cant-audit" label="The clock you can't audit — the replication rung (epitalon)" />
                <CrossLink href="/insights/the-trial-that-hasnt-reported" label="The trial that hasn't reported — enrolled is not reported" />
                <CrossLink href="/research?q=How%20should%20I%20weigh%20mechanistic%2C%20animal%2C%20surrogate-marker%20and%20controlled-outcome%20evidence%20when%20judging%20whether%20a%20peptide%20actually%20works%3F" label="Ask the research agent to grade a claim" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on how clinical evidence is weighed, summarized from public
              scientific literature and simplified in places. Not medical advice, dosing
              guidance, or a recommendation to use any compound. Specific trials are named to
              explain the standard; verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The evidence ladder: abundant/weak at the bottom, rare/predictive at the top ── */
function EvidenceLadder() {
  const W = 700;
  const H = 360;
  const LX = 150; // left edge of rungs
  const RX = 540; // right edge of rungs
  const rungs = [
    { label: "Independent replication / approval", note: "the audit — confirmed by outsiders", eg: "tesamorelin · semaglutide", top: true },
    { label: "Controlled human outcome", note: "the thing you wanted, vs placebo", eg: "" },
    { label: "Human surrogate marker", note: "a number moves (IGF-1, a scan)", eg: "MK-677" },
    { label: "Animal efficacy", note: "real, but a mouse is not a person", eg: "AOD-9604 · BPC-157" },
    { label: "Cell / in-vitro data", note: "a dish, not a body", eg: "epitalon" },
    { label: "Plausible mechanism", note: "a receptor and a story", eg: "most claims start here" },
  ];
  const n = rungs.length;
  const y0 = 64;
  const gap = (H - y0 - 24) / n;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A ladder of evidence from bottom to top. Bottom rung: plausible mechanism (a receptor and a story) — where most claims start. Then cell or in-vitro data (example epitalon), animal efficacy (AOD-9604, BPC-157), human surrogate markers (MK-677), controlled human outcome, and at the top independent replication or approval (tesamorelin, semaglutide). Each rung up is rarer and more predictive of real benefit; a claim's confidence should be set by its highest rung, not its most flattering sentence."
      >
        <text x={W / 2} y={26} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          The evidence ladder
        </text>
        <text x={W / 2} y={44} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10.5">
          abundant &amp; weak at the bottom · rare &amp; predictive at the top
        </text>

        {/* vertical arrow on the left showing "more predictive ↑" */}
        <line x1={LX - 26} y1={y0 + gap * n - 8} x2={LX - 26} y2={y0 + 4} stroke="var(--accent)" strokeOpacity={0.5} strokeWidth={1.4} markerEnd="url(#lad-up)" />
        <defs>
          <marker id="lad-up" markerWidth="8" markerHeight="8" refX="4" refY="2" orient="auto"><path d="M1 7 L4 1 L7 7" fill="none" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1.4" /></marker>
        </defs>
        <text x={LX - 32} y={y0 + gap * n / 2} fill="var(--color-ink)" fillOpacity={0.4} fontSize="9" transform={`rotate(-90 ${LX - 32} ${y0 + gap * n / 2})`} textAnchor="middle">more predictive of real benefit</text>

        {rungs.map((r, i) => {
          const y = y0 + i * gap;
          const strength = (n - i) / n; // top rungs stronger
          return (
            <g key={i}>
              <rect x={LX} y={y} width={RX - LX} height={gap - 8} rx={8}
                fill={`color-mix(in srgb, var(--accent) ${6 + strength * 20}%, transparent)`}
                stroke="var(--accent)" strokeOpacity={0.25 + strength * 0.4} strokeWidth={1.2} />
              <text x={LX + 14} y={y + (gap - 8) / 2 - 2} fill="var(--color-ink)" fillOpacity={0.88} fontSize="11.5" fontWeight={r.top ? "700" : "600"} fontFamily="var(--font-space-grotesk), sans-serif">{r.label}</text>
              <text x={LX + 14} y={y + (gap - 8) / 2 + 13} fill="var(--color-ink)" fillOpacity={0.5} fontSize="9">{r.note}</text>
              {r.eg && <text x={RX + 10} y={y + (gap - 8) / 2 + 3} fill="var(--accent)" fillOpacity={0.8} fontSize="8.5" fontFamily="var(--font-space-grotesk), sans-serif">{r.eg}</text>}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Set a claim&rsquo;s confidence by its highest rung of real evidence — not its most
        flattering sentence. Most of the peptide world sells a low rung in the language of a
        high one.
      </figcaption>
    </figure>
  );
}
