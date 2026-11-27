import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-brake-and-the-alarm")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What Is Cholecystokinin (CCK)? The Satiety Hormone That Also Triggers Panic — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each claim stays checkable.
const REF = {
  satiety: "https://pubmed.ncbi.nlm.nih.gov/23317788/", // Sayegh — Prog Mol Biol Transl Sci 2013: CCK receptors in short-term control of food intake
  receptors: "https://pubmed.ncbi.nlm.nih.gov/16816139/", // Dufresne, Seva & Fourmy — Physiol Rev 2006: cholecystokinin and gastrin receptors
  obesity: "https://pubmed.ncbi.nlm.nih.gov/17597711/", // Jordan et al. — Clin Pharmacol Ther 2008: GI181771X does not cause weight loss
  panic: "https://pubmed.ncbi.nlm.nih.gov/2730276/", // de Montigny — Arch Gen Psychiatry 1989: CCK-4 induces panic-like attacks in healthy volunteers
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd() and mirrored in the visible block.
const FAQS = [
  {
    q: "What is cholecystokinin (CCK)?",
    a: "CCK is a gut peptide hormone released by I-cells of the duodenum when fat and protein arrive from a meal. It contracts the gallbladder, stimulates pancreatic digestive enzymes, and signals satiety — the feeling of having eaten enough — largely through CCK-1 receptors on the vagus nerve. It is one of the earliest-identified satiety signals.",
  },
  {
    q: "Does CCK make you feel full, and can it be used for weight loss?",
    a: "CCK does promote short-term satiety, which made it an obvious anti-obesity target. But a CCK-1 receptor agonist (GI181771X) taken into a clinical trial produced no weight loss. The satiety signal is brief and easily compensated for, so turning it on pharmacologically has not translated into durable weight loss.",
  },
  {
    q: "Can cholecystokinin cause panic attacks?",
    a: "Yes — its brain-active fragment can. CCK-4, the four-amino-acid C-terminal tail of CCK, is one of the most reliable chemical triggers of panic in research: injected into healthy volunteers it provokes short, genuine panic-like attacks within seconds, acting through the CCK-2 receptor in the brain. The same molecule that signals fullness in the gut is a panic trigger in the head.",
  },
  {
    q: "Why are there two different CCK effects?",
    a: "Because CCK acts on two distinct receptors. CCK-1 (CCK-A) is concentrated in the periphery — gallbladder, pancreas and vagal afferents — and carries the digestive and satiety actions. CCK-2 (CCK-B) is abundant in the brain and mediates the anxiety/panic effects. One peptide, two receptors, two very different jobs.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(74,183,152,0.14), transparent 70%)" }}
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
            <Section title="The brake on the meal">
              <P>
                <Link href="/hormones/cck" className={LINK}>Cholecystokinin</Link> — CCK — is a
                gut hormone with a clear first job. When a meal&rsquo;s fat and protein reach the
                duodenum, the <Em>I-cells</Em> of the lining release it, and it does three
                things at once: it contracts the gallbladder to deliver bile, it calls out the
                pancreas&rsquo;s digestive enzymes, and it signals <Em>satiety</Em> — the sense
                of having eaten enough. That last action runs largely through its{" "}
                <Em>CCK-1</Em> receptor on the vagus nerve, a direct gut-to-brain line reporting
                that food has arrived (
                <a href={REF.satiety} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sayegh, Prog&nbsp;Mol&nbsp;Biol&nbsp;Transl&nbsp;Sci, 2013
                </a>
                ). CCK is, in short, one of the body&rsquo;s original &ldquo;stop eating&rdquo;
                signals — the brake on the meal.
              </P>
              <P>
                That made it an irresistible obesity target. The logic is almost too clean:
                satiety is the feeling that ends a meal, CCK produces satiety, so a CCK drug
                should end meals sooner and shrink intake. For a hormone whose whole job is to
                say &ldquo;enough,&rdquo; turning it into a weight-loss drug looked like a
                formality.
              </P>
            </Section>

            <Section title="The brake that wouldn't hold">
              <P>
                It wasn&rsquo;t. A <Em>CCK-1 receptor agonist</Em>, GI181771X, was taken into a
                clinical trial in overweight and obese patients and produced <Em>no weight
                loss</Em> — no effect on body weight, waist circumference or cardiometabolic
                markers (
                <a href={REF.obesity} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Jordan et&nbsp;al., Clin&nbsp;Pharmacol&nbsp;Ther, 2008
                </a>
                ). The satiety signal is real, but it is a <Em>short-term</Em> one — it ends a
                given meal, and the body compensates at the next. A brake that taps for a few
                minutes and releases is not a brake you can lean on to hold a person&rsquo;s
                weight down for months.
              </P>
              <Callout label="Short-term is the key word">
                CCK answers the question &ldquo;should this meal end?&rdquo;, not &ldquo;how much
                fat should the body carry?&rdquo; The long-run defended-weight machinery — the
                world of <Link href="/insights/the-signal-you-cant-turn-up" className={LINK}>leptin</Link>{" "}
                and the incretins — sits above it. Pushing a meal-ending signal harder doesn&rsquo;t
                move the set-point it was never in charge of.
              </Callout>
            </Section>

            <Section title="The same peptide, a second receptor, a very different effect">
              <P>
                Here is where CCK stops being an ordinary gut hormone. It acts on <Em>two</Em>
                receptors, not one. <Em>CCK-1</Em> (CCK-A) is a peripheral receptor — gallbladder,
                pancreas, vagus — and carries the digestive and satiety actions. <Em>CCK-2</Em>
                (CCK-B) is abundant in the <Em>brain</Em> (
                <a href={REF.receptors} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Dufresne et&nbsp;al., Physiol&nbsp;Rev, 2006
                </a>
                ). And through that central receptor, the very same molecule does something that
                could not feel more unlike &ldquo;you&rsquo;re comfortably full.&rdquo;
              </P>
              <ForkFigure />
              <P>
                The brain-active fragment of CCK is its four-residue C-terminal tail, <Em>CCK-4</Em>.
                Given to healthy volunteers, it is one of the most reliable chemical triggers of{" "}
                <Em>panic</Em> known to psychiatry: in an early human study, CCK-4 provoked
                short-lasting panic-like attacks within seconds of injection (
                <a href={REF.panic} target="_blank" rel="noopener noreferrer" className={LINK}>
                  de&nbsp;Montigny, Arch&nbsp;Gen&nbsp;Psychiatry, 1989
                </a>
                ). It became, and remains, a standard experimental way to <Em>induce</Em> a
                panic attack in the lab. The hormone that tells you the meal is over is, through
                its other receptor, a switch for raw fear.
              </P>
            </Section>

            <Section title="Two faces, and a drug at neither">
              <P>
                The two-receptor split is not just a curiosity; it is the reason CCK frustrated
                drug developers coming and going. Agonists aimed at the <Em>satiety</Em> side
                (CCK-1) fizzled in obesity, as GI181771X showed. Antagonists aimed at the{" "}
                <Em>panic</Em> side (CCK-2) — blocking the receptor to treat anxiety — were an
                obvious idea given how cleanly CCK-4 induces panic, yet they never became
                approved anxiety medicines either. A hormone with two vivid, opposite-feeling
                biologies turned out to be hard to turn into a medicine at <Em>either</Em> end.
              </P>
              <Bullets
                items={[
                  [
                    "CCK-1, in the gut",
                    "Gallbladder, pancreatic enzymes, vagal satiety — the meal's brake. Agonists for obesity (GI181771X) produced no weight loss.",
                  ],
                  [
                    "CCK-2, in the brain",
                    "The panic receptor. CCK-4 reliably induces panic attacks in humans — a lab tool for anxiety, not a condition you'd add to.",
                  ],
                  [
                    "The drug problem",
                    "Two receptors, two tissues, two timescales — a short meal-ending brake and a fast fear switch, neither of which became a durable drug.",
                  ],
                ]}
              />
              <P>
                CCK is the kind of molecule this reference likes best: biology so vivid you can
                feel both ends of it — the quiet &ldquo;enough&rdquo; at the table and the jolt of
                fear in a lab — and a pharmacology that, for all that vividness, politely refused
                to cooperate. Vivid biology, uncooperative pharmacology.
              </P>
            </Section>

            {/* Visible Q&A — mirrors the FAQPage JSON-LD */}
            <Section title="Questions readers actually ask">
              <dl className="space-y-6">
                {FAQS.map(({ q, a }) => (
                  <div key={q}>
                    <dt className="font-display text-lg font-semibold">{q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/75">{a}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/cck" label="Cholecystokinin — the hormone, in the catalog" />
                <CrossLink href="/insights/the-guts-full-report" label="The gut's full report — the other meal hormones" />
                <CrossLink href="/insights/the-hormone-found-after-its-drug" label="The hormone found after its drug — ghrelin, the opposite signal" />
                <CrossLink href="/insights/the-first-word" label="The first word — secretin, the other gut founder" />
                <CrossLink href="/insights/the-signal-you-cant-turn-up" label="The signal you can't turn up — leptin and the set-point" />
                <CrossLink href="/families/gut-appetite" label="The gut & appetite family" />
                <CrossLink
                  href="/research?q=How%20does%20cholecystokinin%20signal%20satiety%20through%20the%20CCK-1%20receptor%20and%20the%20vagus%2C%20why%20did%20CCK-1%20agonists%20fail%20for%20obesity%2C%20and%20why%20does%20CCK-4%20induce%20panic%20through%20the%20CCK-2%20receptor%3F"
                  label="Ask the research agent about CCK"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized and
              simplified from the public record. Not individualized medical advice or a
              prescription. CCK-4&rsquo;s panic-inducing effect is described from experimental
              human studies; it is a research probe, not a treatment, and nothing here is a
              suggestion to use any compound. Verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── One peptide, two receptors, two worlds ── */
function ForkFigure() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 600 214"
        className="w-full"
        role="img"
        aria-label="Cholecystokinin acts on two receptors: CCK-1 in the gut and vagus produces satiety, while CCK-2 in the brain, via the CCK-4 fragment, triggers panic."
      >
        {/* source peptide */}
        <rect x="246" y="22" width="108" height="34" rx="17" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x="300" y="44" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">CCK</text>

        {/* branches */}
        <path d="M278,56 C230,86 180,92 150,110" fill="none" stroke="var(--accent-teal)" strokeWidth="2.5" />
        <polygon points="144,114 158,110 153,122" fill="var(--accent-teal)" />
        <path d="M322,56 C370,86 420,92 450,110" fill="none" stroke="var(--accent-amber)" strokeWidth="2.5" />
        <polygon points="456,114 442,110 447,122" fill="var(--accent-amber)" />

        {/* left: CCK-1 gut */}
        <rect x="70" y="116" width="160" height="38" rx="12" fill="var(--accent-teal)" fillOpacity="0.1" stroke="var(--accent-teal)" strokeOpacity="0.4" strokeWidth="1.5" />
        <text x="150" y="134" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">CCK-1 · gut &amp; vagus</text>
        <text x="150" y="149" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">gallbladder · pancreas</text>
        <text x="150" y="182" textAnchor="middle" fill="var(--accent-teal)" fontSize="13" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">satiety — &ldquo;enough&rdquo;</text>
        <text x="150" y="200" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">agonists failed for obesity</text>

        {/* right: CCK-2 brain */}
        <rect x="370" y="116" width="160" height="38" rx="12" fill="var(--accent-amber)" fillOpacity="0.1" stroke="var(--accent-amber)" strokeOpacity="0.4" strokeWidth="1.5" />
        <text x="450" y="134" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">CCK-2 · brain</text>
        <text x="450" y="149" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">via the CCK-4 fragment</text>
        <text x="450" y="182" textAnchor="middle" fill="var(--accent-amber)" fontSize="13" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">panic — the alarm</text>
        <text x="450" y="200" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">a lab trigger for panic</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        One peptide, two receptors, two worlds: through CCK-1 in the gut it is the meal&rsquo;s satiety brake; through CCK-2 in
        the brain its CCK-4 fragment is a reliable panic trigger. The same molecule says &ldquo;enough&rdquo; and sets off the alarm.
      </figcaption>
    </figure>
  );
}
