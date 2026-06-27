import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { getInsight } from "@/lib/insights";

const insight = getInsight("from-insulin-to-glp-1")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

export default function Article() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
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
              <span className="text-accent">History of peptide medicine</span>
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
            <Section title="A class of medicine, not a single drug">
              <P>
                Peptide hormones are short chains of amino acids that the body uses
                as signals — insulin telling cells to take up glucose, a gut peptide
                reporting that a meal has arrived, a pituitary hormone timing
                ovulation. For most of medical history none of them could be used as
                drugs, because we could neither isolate them in quantity nor keep
                them intact in the body. The story of how that changed runs in three
                acts, roughly a century long, and the same engineering problems
                recur in each.
              </P>
              <P>
                <Em>Insulin</Em> proved a peptide could be a therapy at all.{" "}
                <Em>Fertility medicine</Em> showed you could steer an entire
                hormonal axis rather than just replace one molecule. And{" "}
                <Em>GLP-1</Em> is what happens when you stop merely supplying a
                hormone and start re-engineering the molecule itself.
              </P>
              <Timeline />
            </Section>

            <Section title="Act I — Insulin: a peptide becomes a drug (1921–22)">
              <P>
                In the summer of 1921, in a Toronto laboratory, Frederick Banting
                and Charles Best — with J.J.R. Macleod and the biochemist James
                Collip — extracted a pancreatic substance that lowered blood sugar
                in diabetic dogs. In January 1922 a purified extract was given to
                Leonard Thompson, a 14-year-old dying of type 1 diabetes. His blood
                glucose fell and he recovered. A disease that had been a death
                sentence became, almost overnight, a manageable condition. The 1923
                Nobel Prize followed within two years.
              </P>
              <P>
                The significance went beyond diabetes.{" "}
                <Link href="/hormones/insulin" className={LINK}>Insulin</Link> was the
                first peptide hormone deployed as a medicine, and it set the
                template the whole field still follows: identify a signaling peptide
                the body is missing or under-producing, supply it from outside, and
                a disease driven by a broken signal becomes treatable. It also
                introduced, immediately, the problems that would define peptide
                pharmacology — purity, supply, and a molecule that the body clears
                in minutes.
              </P>
              <Callout>
                Insulin keeps setting firsts. It was the first protein to have its
                full amino-acid sequence read — Frederick Sanger, 1955, a second
                Nobel — and the first drug made by recombinant DNA, in 1982, when
                engineered bacteria replaced animal pancreases as the source. Each
                first became a tool the rest of peptide medicine would reuse.
              </Callout>
            </Section>

            <Section title="The enabling decades: reading and building the molecules">
              <P>
                Between insulin&rsquo;s discovery and its modern descendants sat two
                problems that had to be solved before peptides could be designed
                rather than merely extracted: could you <Em>read</Em> a peptide
                hormone&rsquo;s structure, and could you <Em>build</Em> one from
                scratch?
              </P>
              <Bullets
                items={[
                  ["Synthesis (1953)", "Vincent du Vigneaud chemically synthesized oxytocin — the first peptide hormone made in a lab — proving these molecules could be manufactured, not just harvested. See the oxytocin reference for how two amino acids separate it from vasopressin."],
                  ["The releasing hormones (1969–73)", "Roger Guillemin and Andrew Schally isolated the tiny hypothalamic peptides that command the pituitary — TRH, GnRH, and somatostatin — work that won the 1977 Nobel and exposed the control layer above hormones like LH, FSH, and growth hormone."],
                ]}
              />
              <P>
                That second discovery matters enormously for Act II. Once you knew
                that one small peptide,{" "}
                <Link href="/hormones/gnrh" className={LINK}>GnRH</Link>, sat at the
                top of the reproductive axis, you could think about manipulating the
                whole system — not just topping up a single hormone.
              </P>
            </Section>

            <Section title="Act II — Fertility medicine: steering an axis">
              <P>
                Reproduction is governed by a cascade of peptide signals: GnRH from
                the hypothalamus drives the pituitary to release the gonadotropins{" "}
                <Link href="/hormones/lh" className={LINK}>LH</Link> and{" "}
                <Link href="/hormones/fsh" className={LINK}>FSH</Link>, which act on
                the ovary or testis. Fertility medicine is, in essence, the art of
                operating that cascade from the outside — and it taught the field
                lessons no single-hormone replacement could.
              </P>
              <P>
                The first tools were the hormones themselves. In the late 1950s and
                1960s, gonadotropins purified from the urine of postmenopausal women
                (human menopausal gonadotropin) were used to stimulate the ovaries,
                with{" "}
                <Link href="/hormones/hcg" className={LINK}>hCG</Link> — which acts on
                the same receptor as LH — used to trigger final egg maturation. That
                pharmacology made controlled ovarian stimulation possible, and in
                1978 it culminated in the birth of Louise Brown, the first child
                conceived by IVF (a line of work later recognized with the 2010
                Nobel Prize).
              </P>
              <P>
                Then GnRH itself became the instrument — and revealed a principle
                that still surprises people:
              </P>
              <Bullets
                items={[
                  ["Pulses, not levels, carry the signal", "Natural GnRH is released in pulses. Deliver a GnRH agonist continuously and the receptor desensitizes, paradoxically shutting the axis down after a brief flare — the mechanism behind leuprolide, used to suppress reproductive hormones in IVF protocols, endometriosis, and prostate cancer."],
                  ["Antagonists flip the switch cleanly", "A GnRH antagonist such as cetrorelix blocks the receptor directly, suppressing a premature LH surge immediately and without the flare — a precise on/off contrast that became central to modern IVF cycles."],
                  ["Recombinant purity", "By the mid-1990s, recombinant FSH replaced urine-derived preparations, echoing insulin's move to recombinant manufacturing a decade earlier — the same lesson about consistency and supply, learned again."],
                ]}
              />
              <P>
                The throughline of Act II is conceptual: you do not have to replace
                a hormone to treat a condition. You can <Em>drive</Em> an axis,{" "}
                <Em>suppress</Em> it, or <Em>time</Em> it — agonist or antagonist,
                pulsed or continuous — once you understand the signaling logic. The
                pulsatility insight learned here is the same one that makes{" "}
                <Link href="/hormones/leuprolide" className={LINK}>GnRH agonists</Link>{" "}
                behave so counterintuitively.
              </P>
            </Section>

            <Section title="Act III — GLP-1: engineering the molecule">
              <P>
                The modern act begins with a long-known curiosity: oral glucose
                triggers far more insulin than the same glucose given intravenously.
                The gut, it turned out, sends an anticipatory signal — the{" "}
                <Em>incretin effect</Em>. By the 1980s the main messenger was
                identified as{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link>, a fragment
                of the proglucagon precursor released from intestinal L-cells. It
                amplified insulin secretion only when glucose was high, and it was
                blunted in type 2 diabetes. A near-perfect drug target — with one
                fatal flaw.
              </P>
              <P>
                Native GLP-1 has a half-life of{" "}
                <Link href="/tools/half-life?t12=1.5&unit=min" className={LINK}>one to
                two minutes</Link>; the enzyme DPP-4 destroys it almost as fast as
                the gut makes it. Act III is the story of solving that, and it is
                pure molecular engineering rather than extraction or replacement:
              </P>
              <Bullets
                items={[
                  ["Borrow from venom (early 1990s)", "Exendin-4, a peptide in Gila monster venom, activates the GLP-1 receptor but is naturally resistant to DPP-4. Synthesized as exenatide, it became the first GLP-1 receptor agonist approved (2005)."],
                  ["Acylate for durability", "Attaching a fatty-acid chain lets an analog bind albumin and evade clearance, stretching the half-life from minutes to roughly a day (liraglutide) and then a week (semaglutide) — turning a transient gut signal into a once-weekly therapy."],
                  ["Hit more than one receptor", "Tirzepatide adds GIP-receptor agonism to GLP-1 in a single peptide (the first 'twincretin', 2022), and triple GIP/GLP-1/glucagon agonists such as retatrutide are now in trials — recruiting several arms of the metabolic system at once."],
                ]}
              />
              <P>
                The result reached far beyond glucose control. The same pathway
                slows gastric emptying and signals satiety in the brain, which is
                why this class reshaped the treatment of obesity as much as
                diabetes — the subject of its own{" "}
                <Link href="/insights/glp-1-signaling" className={LINK}>mechanistic
                deep-dive</Link>.
              </P>
            </Section>

            <Section title="What recurs across the century">
              <P>
                Read end to end, the three acts are variations on a small set of
                problems that every peptide therapy has to solve:
              </P>
              <Bullets
                items={[
                  ["Half-life", "Peptides are cleared in minutes. Insulin needed reformulation; GnRH needed depots; GLP-1 needed venom-derived resistance and acylation. The half-life problem never goes away — only the solutions get more sophisticated."],
                  ["Supply and purity", "From animal pancreases to urine-derived gonadotropins to recombinant insulin and FSH, every era eventually moves to engineered, consistent manufacturing."],
                  ["Signaling logic", "The biggest leaps came from understanding the system, not just the molecule — pulsatile GnRH, glucose-dependence, multi-receptor co-agonism."],
                  ["Selectivity", "From GnRH agonist-versus-antagonist to GIP/GLP-1/glucagon tuning, controlling which receptors a peptide engages — and how — is the modern design frontier."],
                ]}
              />
              <P>
                Insulin supplied a missing signal; fertility medicine learned to
                steer an axis; GLP-1 re-engineered the messenger. Each act kept the
                lessons of the last and added one of its own — which is why a
                two-minute gut peptide could become a once-weekly medicine, and why
                the next chapter will almost certainly be written in the same
                grammar.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/insulin" label="Insulin reference (the template)" />
                <CrossLink href="/families/reproductive-gonadal" label="The reproductive & gonadal family" />
                <CrossLink href="/insights/glp-1-signaling" label="How GLP-1 actually works" />
                <CrossLink href="/hormones/semaglutide" label="Semaglutide: the engineered analog" />
                <CrossLink href="/tools/half-life?t12=1.5&unit=min" label="Model the two-minute half-life problem" />
                <CrossLink href="/research?q=How%20did%20GLP-1%20receptor%20agonists%20evolve%20from%20exendin-4%20to%20today%27s%20analogs%3F" label="Ask the research agent to trace the lineage" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational history of the science, summarized from public sources and
              simplified in places; dates and attributions reflect the broad
              scholarly record. Not medical advice, dosing guidance, or a
              recommendation to use any compound. Specific compounds are named to
              tell the story; verify any claim against primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

const LINK = "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-7 text-ink/75">{children}</p>;
}

function Em({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-2 border-accent bg-accent/[0.06] p-5">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-accent">Key insight</div>
      <p className="text-[15px] leading-7 text-ink/80">{children}</p>
    </div>
  );
}

function Bullets({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-3">
      {items.map(([head, body]) => (
        <li key={head} className="flex gap-3 text-[15px] leading-7 text-ink/75">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>
            <strong className="font-semibold text-ink">{head}.</strong> {body}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CrossLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="group flex items-start gap-2 text-ink/75 transition-colors hover:text-accent">
        <span className="mt-0.5 text-ink/30 transition-colors group-hover:text-accent" aria-hidden>→</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

/* ── Century timeline ── */
function Timeline() {
  const events: { year: string; label: string; color: string }[] = [
    { year: "1922", label: "Insulin first treats a patient — a peptide becomes a drug", color: "var(--accent)" },
    { year: "1953", label: "Oxytocin synthesized — peptides can be built, not just harvested", color: "var(--accent-blue)" },
    { year: "1977", label: "Hypothalamic releasing hormones (GnRH, TRH, somatostatin) isolated", color: "var(--accent-teal)" },
    { year: "1978", label: "First IVF birth — steering the reproductive axis with peptide signals", color: "var(--accent-purple)" },
    { year: "1982", label: "Recombinant insulin — the first engineered-DNA medicine", color: "var(--accent-amber)" },
    { year: "2005", label: "Exenatide — the first GLP-1 receptor agonist", color: "var(--accent-blue)" },
    { year: "2022", label: "Tirzepatide — a single peptide hitting two incretin receptors", color: "var(--accent)" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-6">
      <ol className="relative space-y-5 pl-6">
        <span className="absolute left-[5px] top-1 bottom-1 w-px bg-ink/15" aria-hidden />
        {events.map((e) => (
          <li key={e.year} className="relative flex gap-4">
            <span
              className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full ring-4 ring-surface"
              style={{ backgroundColor: e.color }}
              aria-hidden
            />
            <span className="w-12 shrink-0 font-mono text-sm font-semibold text-ink/80">{e.year}</span>
            <span className="text-[15px] leading-7 text-ink/70">{e.label}</span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-center text-xs text-ink/40">
        A century of peptide medicine, in seven steps — replace, then steer, then engineer.
      </figcaption>
    </figure>
  );
}
