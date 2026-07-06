import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("glp-1-muscle-preservation")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  believe: "https://www.nature.com/articles/s41591-026-04204-0",
  neeland: "https://dom-pubs.onlinelibrary.wiley.com/doi/10.1111/dom.15728",
  courage: "https://clinicaltrials.gov/study/NCT06299098",
  embraze: "https://clinicaltrials.gov/study/NCT06445075",
} as const;

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family))} />
      <SiteHeader />
      <main className="flex-1">
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
              <Link href="/families/muscle-tgfb" className="text-accent-purple hover:text-ink">
                Muscle &amp; TGF-&beta;
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
            <Section title="Weight loss just became a design problem">
              <P>
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> drugs pulled off
                something genuinely historic: fifteen, twenty, sometimes more than twenty
                percent of body weight, routinely, from a weekly injection. That fight is
                essentially won. The exciting part is what comes next — the frontier
                moving from <Em>how much</Em> weight comes off to <Em>what kind</Em>.
                Because weight isn&rsquo;t only fat; when the scale drops, some of what
                leaves is skeletal muscle.
              </P>
              <P>
                In the body-composition analysis of{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link>&rsquo;s
                pivotal STEP&nbsp;1 trial, lean mass made up close to{" "}
                <Em>40% of the total weight lost</Em>; across the wider literature the
                figure runs from about a quarter to nearly half (
                <a href={REF.neeland} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Neeland et&nbsp;al., 2024, review
                </a>
                ). Read that not as a warning but as an opening: it turns body
                composition into the next thing we get to <Em>engineer</Em>.
              </P>
              <Callout label="Why this is the fun part">
                Muscle is metabolic gold. It is the body&rsquo;s largest site of glucose
                disposal, a major driver of resting metabolic rate, and the tissue behind
                strength, balance, and staying capable for decades. Protect it through
                weight loss and you&rsquo;re not just keeping tone — you&rsquo;re
                preserving the engine that makes the results last. That is a feature
                waiting to be built in, and the tools to build it have just arrived.
              </Callout>
            </Section>

            <Section title="Why a deficit takes muscle too">
              <P>
                First, the reassuring part: this isn&rsquo;t GLP-1 agonists being toxic to
                muscle. They aren&rsquo;t. It&rsquo;s simply the arithmetic of an{" "}
                <Em>energy deficit</Em> — the same arithmetic behind muscle loss in any
                diet or fast. Three forces stack up:
              </P>
              <Bullets
                items={[
                  ["The deficit itself", "When intake falls well below expenditure, the body catabolizes protein alongside fat for fuel and to spare amino acids for other needs. Muscle is a reservoir the body will draw down."],
                  ["Less load, less signal", "Muscle mass is maintained by demand. Eat less and often move less, and the mechanical and nutritional signals that tell muscle to rebuild itself weaken."],
                  ["Protein undershoot", "The appetite suppression that makes these drugs work also cuts total food — and protein — intake, removing the substrate muscle protein synthesis needs most."],
                ]}
              />
              <P>
                That reframing matters, because it tells you where a solution has to
                act. You cannot make the deficit disappear — the deficit is the point.
                So the pharmacological question becomes narrower and sharper:{" "}
                <Em>during</Em> a large energy deficit, can you bias the body to give up
                fat and hold on to muscle? To do that, you have to find the switch that
                sets how much muscle the body is willing to keep.
              </P>
            </Section>

            <Section title="The brake on muscle">
              <P>
                Skeletal muscle mass is not a free-running maximum — it is actively
                restrained. The chief brake is{" "}
                <Link href="/hormones/myostatin" className={LINK}>myostatin</Link> (also
                called GDF-8), a member of the{" "}
                <Link href="/families/muscle-tgfb" className={LINK}>TGF-&beta; superfamily</Link>.
                Myostatin, and its close relative{" "}
                <Link href="/hormones/activin-a" className={LINK}>activin&nbsp;A</Link>,
                signal through the <Em>activin type&nbsp;II receptors</Em> (ActRIIA/B)
                on the muscle cell, which activate the intracellular Smad2/3 pathway to
                hold muscle growth in check.
              </P>
              <BrakeDiagram />
              <P>
                The proof that this brake is real, and releasable, is dramatic: animals
                and rare humans born without functional myostatin develop pronounced
                muscle hypertrophy. The body&rsquo;s natural antagonist,{" "}
                <Link href="/hormones/follistatin" className={LINK}>follistatin</Link>,
                binds and neutralizes both myostatin and activin — the endogenous way of
                lifting the brake. That is the biology a new class of drugs is trying to
                borrow: block this pathway during GLP-1 weight loss, and the muscle the
                deficit would have taken is, in principle, protected.
              </P>
            </Section>

            <Section title="Releasing the brake, three ways">
              <P>
                The programs racing into this space differ in one decisive way:{" "}
                <Em>how far up the pathway they cut in</Em>. Block a single ligand and
                you get precision; block the shared receptor and you catch everything
                signaling through it for a bigger effect. Three antibodies, paired with a
                GLP-1 drug, map that spectrum from most selective to broadest — each a
                different bet on the same elegant target.
              </P>
              <Bullets
                items={[
                  ["Ligand-selective — apitegromab", "Scholar Rock's antibody binds only the inactive precursor of myostatin, blocking its activation and nothing else. It is the scalpel of the group."],
                  ["Ligand, then two — trevogrumab (± garetosmab)", "Regeneron's trevogrumab neutralizes myostatin; adding garetosmab layers on activin-A blockade, widening the net one ligand at a time."],
                  ["Receptor-level — bimagrumab", "Lilly's antibody blocks the activin type II receptor itself, so myostatin and activin A (and their relatives) are shut out together. The broadest lever — and the only one that visibly builds muscle on its own."],
                ]}
              />
              <P>
                The clean way to see it: apitegromab and trevogrumab work at the{" "}
                <Em>ligand</Em>, bimagrumab at the <Em>receptor</Em>. Same pathway,
                different altitude — and, as the trials show, different magnitude.
              </P>
            </Section>

            <Section title="What the trials are showing">
              <P>
                This is where it gets fun, because the human data is already landing —
                and it points the same way every time: add the muscle-sparing antibody
                and a dramatically larger share of the weight lost comes from fat. Three
                phase-2 obesity programs, one peer-reviewed and two reported as
                topline/interim readouts, tell a strikingly consistent story.
              </P>
              <TrialTable />
              <P>
                Read together, these are a genuine proof of concept: the myostatin/
                activin brake is druggable in humans, and releasing it during GLP-1
                weight loss shifts body composition toward fat loss. Bimagrumab&rsquo;s
                receptor-level block is the standout — it does not merely{" "}
                <Em>preserve</Em> lean mass but adds it, even used alone.
              </P>
            </Section>

            <Section title="The frontier from here">
              <P>
                The proof of concept is in hand — the brake is druggable in humans, and
                releasing it reshapes weight loss toward fat. That&rsquo;s the hard part
                done. What&rsquo;s ahead is the genuinely exciting engineering: turning
                these body-composition wins into proven strength and function, and
                building the muscle-sparing arm into the therapy from day one.
                Where it&rsquo;s heading:
              </P>
              <Bullets
                items={[
                  ["From scan to strength", "Today's headline numbers are DEXA lean mass; the next wave of trials is wiring in direct strength, mobility, and physical-function endpoints — the readouts that turn 'kept the kilogram' into 'kept the capability.'"],
                  ["A whole selectivity dial to tune", "Ligand-selective, receptor-level, single-target or layered — and beyond antibodies, next-generation candidates like Scholar Rock's SRK-439 aim for more convenient dosing. It's a rich design space where breadth and precision can be tuned to the person."],
                  ["Muscle-sparing as the default", "The natural endpoint is a GLP-1 that arrives paired with a muscle-preserving agent by design, so high-quality body recomposition is simply how weight loss works — not an add-on you have to chase."],
                ]}
              />
              <P>
                It&rsquo;s a beautiful example of this site&rsquo;s whole premise: an
                elegant, real mechanism — the TGF-&beta; brake — meeting a great problem
                at exactly the right moment. The biology is understood, the early human
                data is strong, and the trajectory points somewhere genuinely good:
                weight loss that spares, and sometimes builds, the muscle underneath.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/myostatin" label="Myostatin reference (the brake itself)" />
                <CrossLink href="/families/muscle-tgfb" label="The muscle & TGF-β family" />
                <CrossLink href="/insights/glp-1-signaling" label="How GLP-1 actually works" />
                <CrossLink href="/research?q=What%20does%20the%20clinical%20trial%20evidence%20show%20for%20myostatin%20inhibitors%20preserving%20lean%20mass%20during%20GLP-1%20weight%20loss%3F" label="Ask the research agent for current trials" />
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

/* ── The TGF-β brake: ligands → receptor → Smad → muscle restraint ── */
function BrakeDiagram() {
  const nodes: { label: string; sub: string; color: string; highlight?: boolean }[] = [
    { label: "Myostatin · Activin A", sub: "TGF-β ligands that restrain muscle", color: "var(--accent-purple)" },
    { label: "Activin type II receptor", sub: "ActRIIA/B on the muscle cell", color: "var(--accent-blue)" },
    { label: "Smad2/3", sub: "the intracellular signal", color: "var(--accent-teal)" },
    { label: "Muscle protein synthesis ↓", sub: "the brake — growth held in check", color: "var(--accent-rose)", highlight: true },
  ];
  const W = 520, nodeH = 62, gap = 30, x = 70, w = 380;
  const H = nodes.length * nodeH + (nodes.length - 1) * gap + 20;
  const yAt = (i: number) => 10 + i * (nodeH + gap);

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img" aria-label="The myostatin and activin pathway that restrains skeletal muscle, from ligand to receptor to Smad2/3 to reduced muscle growth">
        {nodes.slice(0, -1).map((_, i) => {
          const y1 = yAt(i) + nodeH;
          const y2 = yAt(i + 1);
          return (
            <g key={i}>
              <line x1={W / 2} y1={y1} x2={W / 2} y2={y2 - 8} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
              <path d={`M ${W / 2 - 5} ${y2 - 9} L ${W / 2} ${y2 - 1} L ${W / 2 + 5} ${y2 - 9}`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <rect
              x={x}
              y={yAt(i)}
              width={w}
              height={nodeH}
              rx={14}
              fill={n.highlight ? "color-mix(in srgb, var(--accent-rose) 12%, transparent)" : "var(--panel)"}
              stroke={n.color}
              strokeOpacity={n.highlight ? 0.7 : 0.35}
              strokeWidth={n.highlight ? 2 : 1}
            />
            <text x={W / 2} y={yAt(i) + 26} textAnchor="middle" fill="var(--color-ink)" fontSize="16" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              {n.label}
            </text>
            <text x={W / 2} y={yAt(i) + 46} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="12">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Block this pathway at any level and the brake releases. Ligand-level drugs cut
        at the top; receptor-level drugs cut one step down, catching more at once.
      </figcaption>
    </figure>
  );
}

/* ── Evidence-graded comparison of the three phase-2 programs ── */
function TrialTable() {
  const rows: { drug: string; sponsor: string; target: string; trial: React.ReactNode; result: string }[] = [
    {
      drug: "Apitegromab",
      sponsor: "Scholar Rock",
      target: "Latent myostatin (most selective)",
      trial: (
        <a href={REF.embraze} target="_blank" rel="noopener noreferrer" className={LINK}>
          EMBRAZE · ph 2 topline
        </a>
      ),
      result: "With tirzepatide, preserved ~55% more lean mass vs tirzepatide alone; quality of loss 85% fat / 15% lean vs 70% / 30%.",
    },
    {
      drug: "Trevogrumab ± garetosmab",
      sponsor: "Regeneron",
      target: "Myostatin, ± activin A",
      trial: (
        <a href={REF.courage} target="_blank" rel="noopener noreferrer" className={LINK}>
          COURAGE · ph 2 interim
        </a>
      ),
      result: "With semaglutide, preserved ~50–80% of lean mass; the triplet held >80% but discontinued more often for tolerability.",
    },
    {
      drug: "Bimagrumab",
      sponsor: "Eli Lilly",
      target: "Activin type II receptor (broadest)",
      trial: (
        <a href={REF.believe} target="_blank" rel="noopener noreferrer" className={LINK}>
          BELIEVE · ph 2b, peer-reviewed
        </a>
      ),
      result: "Alone, ~100% of weight lost was fat plus a ~2.5% lean-mass gain; with semaglutide, ~93% of loss came from fat.",
    },
  ];

  return (
    <figure className="my-2 overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          Phase-2 obesity trials of myostatin/activin-pathway antibodies combined with GLP-1 drugs
        </caption>
        <thead className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
          <tr className="border-b border-ink/10">
            <th scope="col" className="p-3 font-medium">Drug</th>
            <th scope="col" className="p-3 font-medium">Pathway target</th>
            <th scope="col" className="p-3 font-medium">Trial</th>
            <th scope="col" className="p-3 font-medium">Headline result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.drug} className="border-b border-ink/[0.06] align-top last:border-0">
              <th scope="row" className="p-3 font-normal">
                <span className="block font-semibold text-ink">{r.drug}</span>
                <span className="mt-0.5 block text-xs text-ink/45">{r.sponsor}</span>
              </th>
              <td className="p-3 text-ink/70">{r.target}</td>
              <td className="p-3 whitespace-nowrap">{r.trial}</td>
              <td className="p-3 text-ink/70">{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="border-t border-ink/10 p-3 text-center text-xs text-ink/40">
        Phase-2 data as of mid-2026. Evidence grade varies — one peer-reviewed, two
        topline/interim. All are body-composition, not yet functional-outcome, results.
      </figcaption>
    </figure>
  );
}
