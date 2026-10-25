import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-chain-of-command")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "CRH, ACTH and TRH: The HPA and Thyroid Axes, Feedback and the Stim Tests — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Chain of Command: The Stress and Thyroid Axes, and Why You Test Them From the Top · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary source — named inline so the evidence grade stays checkable.
const REF = {
  vale: "https://pubmed.ncbi.nlm.nih.gov/6267699/", // Vale et al. 1981, Science — characterization of the 41-residue CRF
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What are the releasing hormones?",
    a: "They are short hypothalamic peptides that command the body's slow endocrine glands indirectly, through the pituitary. Each one triggers one pituitary 'tropic' hormone, which then drives a peripheral gland. GnRH runs the reproductive axis and GHRH the growth axis; the other two are CRH, which drives ACTH and then adrenal cortisol (the stress axis), and TRH, which drives TSH and then the thyroid. A handful of tiny peptides, each addressing one axis.",
  },
  {
    q: "What is the HPA axis?",
    a: "The hypothalamic–pituitary–adrenal axis is the body's stress cascade. CRH from the hypothalamus tells the pituitary to release ACTH; ACTH tells the adrenal cortex to make cortisol; and cortisol feeds back to shut CRH and ACTH down. It is a three-tier chain of command with a report line running back up — the output hormone silences its own commanders, which keeps the system from running away.",
  },
  {
    q: "Why is such a small peptide as TRH a potent hormone?",
    a: "TRH is just three amino acids — the smallest peptide hormone in this reference — yet it sets the entire thyroid axis in motion, driving TSH (and prolactin) from the pituitary. Its isolation, alongside the other releasing hormones, won a Nobel Prize. It is the clearest proof that hormonal potency is about fitting a receptor, not about size: three residues, full authority.",
  },
  {
    q: "What is the dexamethasone suppression test?",
    a: "It is a way to interrogate the stress axis from the top. Dexamethasone is a synthetic cortisol; give it, and a healthy HPA axis reads the feedback signal and shuts off its own ACTH and cortisol. If cortisol fails to suppress, the feedback is broken — a clue to Cushing's syndrome. It is the diagnostic logic that follows directly from the cascade: because the chain reports back, you can test it by sending a false signal down from above.",
  },
  {
    q: "How are the stress and thyroid axes tested clinically?",
    a: "By provoking them at a chosen tier. The cosyntropin (ACTH) stimulation test gives synthetic ACTH and checks whether the adrenal responds with cortisol — probing the bottom of the HPA axis for adrenal insufficiency. The dexamethasone suppression test probes the feedback at the top. TSH, read against thyroid hormone, reads the whole thyroid axis at once. Because these are feedback cascades, each tier can be isolated by stimulating or suppressing from the level above it.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(181,140,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/neuropeptides" className="text-accent-purple hover:text-ink">
                Neuropeptides
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
            <Section title="Command through a chain">
              <P>
                The hypothalamus does not run the body&rsquo;s slow glands by wire. It runs
                them through a chain of command. A tiny hypothalamic peptide — a releasing
                hormone — tells the pituitary to release a second hormone, a tropic hormone,
                which then travels to a peripheral gland and tells it to do its work. Three
                tiers, each commanding the next. This site has already walked two of them:
                the{" "}
                <Link href="/insights/the-pulse-is-the-message" className={LINK}>
                  reproductive axis
                </Link>{" "}
                run by GnRH, and the{" "}
                <Link href="/insights/two-ways-to-ask-for-growth" className={LINK}>
                  growth axis
                </Link>{" "}
                run by GHRH.
              </P>
              <P>
                Here are the other two, and they complete the set. The stress axis:{" "}
                <Link href="/hormones/crh" className={LINK}>CRH</Link> drives{" "}
                <Link href="/hormones/acth" className={LINK}>ACTH</Link> drives adrenal
                cortisol. The thyroid axis:{" "}
                <Link href="/hormones/trh" className={LINK}>TRH</Link> drives TSH drives the
                thyroid. Same architecture, different glands. And the architecture itself —
                a chain that amplifies on the way down and reports back on the way up — is
                the thing worth understanding, because it explains both how the body governs
                these hormones and how doctors read them. Bullish on the science, plainly
                told.
              </P>
            </Section>

            <Section title="Why a chain, not a wire">
              <P>
                A direct wire would be simpler. The chain earns its complexity two ways.
                First, <Em>amplification</Em>: a faint hypothalamic signal, a few molecules
                of CRH, becomes a pulse of ACTH, which becomes a far larger flood of cortisol
                from the adrenal. Each tier multiplies the one above it, so a whisper at the
                top becomes a shout at the bottom. Second, <Em>control</Em>: every tier is a
                separate place to regulate, and — the crucial part — the bottom reports back
                to the top. Cortisol feeds back to silence CRH and ACTH; thyroid hormone
                feeds back to silence TRH and TSH. The output hormone switches off its own
                commanders.
              </P>
              <P>
                That feedback loop is the governor. It is why these systems hold a setpoint
                rather than running away, and it is why the single most useful thyroid lab is
                not thyroid hormone but TSH: the pituitary&rsquo;s tropic signal already
                integrates the feedback, so reading it reads the whole axis at once. A chain
                that reports back is a chain you can both govern and diagnose from either end.
              </P>
              <CascadeDiagram />
            </Section>

            <Section title="CRH and ACTH: the stress chain, cut from a bigger word">
              <P>
                The top of the stress axis is{" "}
                <Link href="/hormones/crh" className={LINK}>CRH</Link>, a 41-residue peptide
                that was purified and sequenced from sheep hypothalamus by Wylie Vale&rsquo;s
                group in 1981 (
                <a href={REF.vale} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Vale et&nbsp;al., Science, 1981
                </a>
                ) — the molecule that put a defined chemical at the head of the stress
                response. It drives the pituitary to release{" "}
                <Link href="/hormones/acth" className={LINK}>ACTH</Link>, and ACTH is itself
                a telling object. It is not made from scratch; it is cut from POMC, the same
                precursor protein that yields{" "}
                <Link href="/insights/the-last-three-words" className={LINK}>α-MSH</Link> and
                the fragment that became the nootropic{" "}
                <Link href="/insights/written-for-the-brain" className={LINK}>semax</Link>.
              </P>
              <P>
                One precursor, cleaved tissue-specifically into different products — a pigment
                signal here, a stress signal there. ACTH&rsquo;s own receptor, MC2R on the
                adrenal, is unusual in responding essentially only to ACTH and not to the
                MSH peptides it shares a parent with, which is how the melanocortin family
                keeps a pigment hormone and a cortisol hormone from being confused. The
                stress chain, in other words, is a branch of the same POMC tree the{" "}
                <Link href="/families/melanocortins" className={LINK}>melanocortin family</Link>{" "}
                grows from.
              </P>
            </Section>

            <Section title="TRH: three residues, full authority">
              <P>
                The thyroid chain opens with the smallest hormone in this entire reference.{" "}
                <Link href="/hormones/trh" className={LINK}>TRH</Link> is a tripeptide — three
                amino acids — and it is enough to set the whole thyroid axis in motion,
                driving TSH (and prolactin) from the pituitary. Its isolation, alongside the
                other hypothalamic releasing hormones, was hard enough to win a Nobel Prize,
                because pulling a three-residue signal out of tons of hypothalamic tissue was
                a heroic piece of chemistry. The lesson it taught is one the whole peptide
                world rests on: potency is about fitting a receptor, not about length. Three
                residues, full authority.
              </P>
              <P>
                Below TRH, TSH drives the thyroid to make the hormones that set the
                body&rsquo;s metabolic rate, and those hormones feed back to restrain TRH and
                TSH — the same governor as the stress axis, a different gland. It is the
                cleanest thermostat in endocrinology, which is exactly why a single TSH value
                tells a clinician whether the thermostat is set too high or too low.
              </P>
            </Section>

            <Section title="You test a chain by pulling it from the top">
              <P>
                The most practical consequence of this architecture is diagnostic. Because
                each axis is a feedback cascade, you can interrogate it by perturbing one
                tier and watching whether the rest responds correctly. Send a false signal
                down from above: the <Em>dexamethasone suppression test</Em> gives a synthetic
                cortisol, and a healthy axis reads the feedback and shuts its own ACTH and
                cortisol off — a failure to suppress points toward Cushing&rsquo;s. Push from
                a tier below instead: the <Em>cosyntropin test</Em> gives synthetic ACTH and
                checks whether the adrenal answers with cortisol — a flat response points
                toward adrenal insufficiency, Addison&rsquo;s disease.
              </P>
              <P>
                This is the quiet second career of the releasing and tropic hormones: not
                just signals the body uses, but reagents medicine uses to localize a break in
                the chain. Give CRH, give TRH, give ACTH, and see which tier fails to pass the
                message along — hypothalamus, pituitary, or gland. The same cascade that was a
                puzzle to map became a diagnostic instrument, and it is why disorders of these
                axes, from Cushing&rsquo;s (which the broad somatostatin analog{" "}
                <Link href="/insights/the-off-switch" className={LINK}>pasireotide</Link> was
                built to reach) to thyroid disease, are among the most precisely localizable
                in all of medicine.
              </P>
              <Callout label="The architecture read">
                A three-tier cascade with feedback is not bureaucratic clutter — it is what
                lets a faint signal become a large, governed response that can be read and
                corrected at any level. Amplify on the way down, report on the way up, and you
                get a system you can both regulate automatically and diagnose deliberately.
              </Callout>
            </Section>

            <Section title="The architecture, complete">
              <P>
                Set the four hypothalamic releasing hormones side by side — GnRH for
                reproduction, GHRH for growth, CRH for stress, TRH for the thyroid — and the
                hypothalamus turns out to command the body with a small vocabulary of short
                peptides, each addressing one axis through the same three-tier chain. Two of
                those axes run on rhythm, as the{" "}
                <Link href="/insights/the-pulse-is-the-message" className={LINK}>pulse</Link>{" "}
                stories showed; all four run on the cascade-and-feedback architecture this one
                does. Potency without size, control by chain of command, and diagnosis by
                provocation — the design that lets a few molecules at the top of the brain set
                the tone of the whole slow body.
              </P>
              <Bullets
                items={[
                  ["The hypothalamus commands through a chain", "A releasing hormone drives a pituitary tropic hormone, which drives a peripheral gland. CRH→ACTH→cortisol (stress); TRH→TSH→thyroid. Same architecture as the GnRH and GHRH axes."],
                  ["The chain amplifies and reports back", "Each tier multiplies the one above it, and the output hormone feeds back to silence its own commanders — the governor that holds a setpoint. It's why TSH alone reads the thyroid axis."],
                  ["ACTH is a POMC fragment", "Cut from the same precursor as α-MSH, with its own adrenal receptor MC2R that answers only ACTH — the stress chain is a branch of the melanocortin tree."],
                  ["TRH proves potency isn't size", "A three-residue tripeptide runs the entire thyroid axis. Its isolation won a Nobel; the lesson is that fitting a receptor, not length, is what matters."],
                  ["You test the axis by perturbing the top", "Dexamethasone suppression (false feedback) flags Cushing's; cosyntropin stimulation flags adrenal insufficiency. The releasing/tropic hormones became diagnostic reagents."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/crh" label="CRH reference (apex of the stress axis)" />
                <CrossLink href="/hormones/acth" label="ACTH reference (the POMC-derived tropic hormone)" />
                <CrossLink href="/hormones/trh" label="TRH reference (the three-residue thyroid trigger)" />
                <CrossLink href="/insights/the-pulse-is-the-message" label="The pulse is the message — the reproductive releasing hormone" />
                <CrossLink href="/insights/two-ways-to-ask-for-growth" label="Two ways to ask for growth — the growth releasing hormone" />
                <CrossLink href="/insights/the-off-switch" label="The off switch — somatostatin and pasireotide in Cushing's" />
                <CrossLink href="/families/neuropeptides" label="The neuropeptides family" />
                <CrossLink href="/research?q=How%20do%20the%20HPA%20and%20thyroid%20axes%20work%20as%20three-tier%20feedback%20cascades%2C%20and%20why%20are%20they%20tested%20with%20dexamethasone%20suppression%20and%20stimulation%20tests%3F" label="Ask the research agent about the axes" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not
              medical advice, dosing guidance, or a recommendation to use any compound.
              Specific compounds and tests are named to explain the science; verify any
              claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Two parallel three-tier cascades with feedback up the chain ── */
function CascadeDiagram() {
  const W = 700;
  const H = 318;
  const colX = [196, 504]; // HPA, HPT column centers
  const tierY = [92, 162, 232];

  const Tier = ({ cx, cy, name, sub }: { cx: number; cy: number; name: string; sub: string }) => (
    <g>
      <rect x={cx - 92} y={cy - 22} width={184} height={44} rx={10}
        fill="color-mix(in srgb, var(--accent-purple) 10%, transparent)" stroke="var(--accent-purple)" strokeOpacity={0.5} strokeWidth={1.3} />
      <text x={cx} y={cy - 2} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.88} fontSize="12.5" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">{name}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="9.5">{sub}</text>
    </g>
  );

  const Column = ({ cx, tiers, label }: { cx: number; tiers: [string, string][]; label: string }) => (
    <g>
      <text x={cx} y={48} textAnchor="middle" fill="var(--accent-purple)" fillOpacity={0.9} fontSize="11" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">{label}</text>
      {/* down arrows (command) */}
      {tierY.slice(0, 2).map((y, i) => (
        <line key={i} x1={cx - 24} y1={y + 22} x2={cx - 24} y2={tierY[i + 1] - 22} stroke="var(--accent-purple)" strokeOpacity={0.6} strokeWidth={1.6} markerEnd="url(#coc-down)" />
      ))}
      {/* feedback arrow (report back, inhibitory) from bottom to top on the right side */}
      <path d={`M ${cx + 40} ${tierY[2] - 22} C ${cx + 112} ${tierY[2] - 40}, ${cx + 112} ${tierY[0] + 40}, ${cx + 40} ${tierY[0] + 22}`}
        fill="none" stroke="var(--color-ink)" strokeOpacity={0.35} strokeWidth={1.3} strokeDasharray="4 3" markerEnd="url(#coc-stop)" />
      <text x={cx + 104} y={(tierY[0] + tierY[2]) / 2 + 4} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.45} fontSize="8.5" transform={`rotate(90 ${cx + 104} ${(tierY[0] + tierY[2]) / 2 + 4})`}>negative feedback</text>
      {tiers.map(([n, s], i) => <Tier key={i} cx={cx} cy={tierY[i]} name={n} sub={s} />)}
    </g>
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="Two parallel three-tier endocrine cascades. The stress axis runs CRH from the hypothalamus down to ACTH from the pituitary down to cortisol from the adrenal. The thyroid axis runs TRH to TSH to thyroid hormone. In each, downward arrows carry the command and a dashed arrow runs back up from the bottom tier to the top, representing negative feedback in which the output hormone restrains its own commanders."
      >
        <defs>
          <marker id="coc-down" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
            <path d="M1 1 L4 6 L7 1" fill="none" stroke="var(--accent-purple)" strokeOpacity="0.7" strokeWidth="1.4" />
          </marker>
          <marker id="coc-stop" markerWidth="10" markerHeight="8" refX="5" refY="4" orient="auto">
            <line x1="1" y1="1" x2="9" y2="1" stroke="var(--color-ink)" strokeOpacity="0.5" strokeWidth="1.4" />
          </marker>
        </defs>
        <text x={W / 2} y={22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Hypothalamus → pituitary → gland, with a report line back
        </text>
        <Column cx={colX[0]} label="STRESS · HPA" tiers={[["CRH", "hypothalamus"], ["ACTH", "pituitary"], ["Cortisol", "adrenal cortex"]]} />
        <Column cx={colX[1]} label="THYROID · HPT" tiers={[["TRH", "hypothalamus"], ["TSH", "pituitary"], ["Thyroid hormone", "thyroid"]]} />
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two axes, one architecture: the command amplifies on the way down, and the output
        hormone feeds back to restrain its own commanders on the way up.
      </figcaption>
    </figure>
  );
}
