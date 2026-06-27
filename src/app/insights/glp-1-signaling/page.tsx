import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("glp-1-signaling")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/incretins-metabolic" className="text-accent hover:text-ink">
                Incretins &amp; metabolic
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
            <Section title="The incretin effect: a clue hidden in plain sight">
              <P>
                Swallow a dose of glucose and your pancreas releases far more insulin
                than if the same glucose were dripped straight into a vein. The
                difference — the <Em>incretin effect</Em> — is the gut signaling the
                pancreas that food has arrived, before blood sugar has even fully
                risen. The chemical carrying most of that message is{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link>, glucagon-like
                peptide-1, released from intestinal L-cells after a meal.
              </P>
              <P>
                In type 2 diabetes this incretin effect is blunted. That single
                observation — a gut-to-pancreas signal that weakens in disease — is
                what turned GLP-1 from a piece of physiology into one of the most
                consequential drug targets in modern medicine.
              </P>
            </Section>

            <Section title="One receptor, one second messenger">
              <P>
                GLP-1 binds the <Em>GLP-1 receptor</Em> (GLP-1R), a class B
                G-protein-coupled receptor on the pancreatic beta cell. The receptor
                couples to G&alpha;s, which switches on adenylyl cyclase, which raises
                the cell&rsquo;s level of the second messenger <Em>cAMP</Em>. Elevated
                cAMP acts through two effectors — protein kinase A (PKA) and Epac2 —
                and the net result is to potentiate insulin secretion.
              </P>
              <PathwayDiagram />
              <P>
                Nothing in that cascade is exotic; it is textbook GPCR signaling. What
                makes GLP-1 remarkable is not the machinery but its <Em>condition</Em>.
              </P>
            </Section>

            <Section title="Why “glucose-dependent” is the whole game">
              <P>
                The cAMP arm does not, by itself, fling insulin granules out of the
                cell. Exocytosis is triggered by the beta cell&rsquo;s own glucose
                sensing: glucose metabolism raises ATP, ATP-sensitive potassium
                (K<sub>ATP</sub>) channels close, the membrane depolarizes,
                voltage-gated calcium channels open, and the calcium influx drives
                granule release. GLP-1&rsquo;s cAMP/PKA/Epac2 signal <Em>amplifies</Em>{" "}
                that calcium-dependent step — it turns up the gain on a process the
                glucose signal has already started.
              </P>
              <Callout>
                This is the safety crux of the entire drug class. Because GLP-1 only
                amplifies secretion when glucose is already elevated, receptor agonism
                carries low intrinsic risk of hypoglycemia — unlike sulfonylureas or
                insulin, which force secretion regardless of blood sugar. The pathway
                has a built-in &ldquo;only when needed&rdquo; gate.
              </Callout>
            </Section>

            <Section title="Beyond the beta cell">
              <P>GLP-1R signaling reaches well past insulin release:</P>
              <Bullets
                items={[
                  ["Glucagon suppression", "It restrains glucagon release from pancreatic alpha cells — again glucose-dependently — reducing hepatic glucose output."],
                  ["Slowed gastric emptying", "It delays the stomach's release of contents, blunting the post-meal glucose spike and prolonging fullness."],
                  ["Central satiety", "GLP-1 receptors in the hypothalamus and area postrema reduce food intake — a major contributor to the weight effects seen with receptor agonists."],
                  ["Beta-cell trophic effects", "In rodents, GLP-1R signaling supports beta-cell proliferation and survival; how far this translates to humans is less established."],
                ]}
              />
            </Section>

            <Section title="The two-minute problem">
              <P>
                Native GLP-1 is almost useless as a drug in its raw form: its
                circulating half-life is roughly{" "}
                <Link href="/tools/half-life?t12=1.5&unit=min" className={LINK}>one to two minutes</Link>.
                The enzyme DPP-4 clips its N-terminus (at the His7&ndash;Ala8 bond) into
                an inactive fragment within minutes, and the kidney clears the rest.
                Pharmacology solves this two ways:
              </P>
              <Bullets
                items={[
                  ["Block the enzyme", "DPP-4 inhibitors slow the degradation of the GLP-1 (and GIP) your own gut already makes, raising endogenous incretin tone."],
                  ["Build a resistant agonist", "Exendin-4 — a peptide from Gila monster venom — is naturally DPP-4-resistant. Attaching a fatty-acid chain (acylation) lets engineered analogs bind albumin and evade clearance, stretching the half-life from minutes to days."],
                ]}
              />
              <P>
                That half-life engineering is exactly what the{" "}
                <Link href="/tools/half-life" className={LINK}>dosing calculator</Link>{" "}
                makes tangible: push a 1.5-minute half-life out to several days and the
                whole accumulation and steady-state picture changes.
              </P>
            </Section>

            <Section title="The co-agonism frontier">
              <P>
                GLP-1 is no longer pursued alone. Because the{" "}
                <Link href="/hormones/gip" className={LINK}>GIP</Link> and{" "}
                <Link href="/hormones/glucagon" className={LINK}>glucagon</Link>{" "}
                receptors add complementary metabolic effects, engineered peptides now
                deliberately hit more than one receptor at once: GLP-1/GIP dual
                agonists, and GLP-1/GIP/glucagon tri-agonists in trials. The logic is
                additive physiology — recruiting several arms of the{" "}
                <Link href="/families/incretins-metabolic" className={LINK}>metabolic system</Link>{" "}
                — rather than simply a bigger dose of one signal.
              </P>
            </Section>

            <Section title="What's established, and what's still open">
              <P>
                <Em>Established:</Em> glucose-dependent insulin secretion, glucagon
                suppression, slowed gastric emptying, and central appetite reduction
                through this pathway, with substantial weight and glycemic effects and
                cardiovascular and renal outcome signals in large trials.
              </P>
              <P>
                <Em>Open:</Em> the precise split between gastric, central, and other
                mechanisms behind weight loss; long-horizon effects; whether GIP
                agonism or antagonism is preferable; and muscle preservation during
                rapid weight loss — the question driving interest in adjacent
                myostatin/activin pathways.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/glp-1" label="GLP-1 reference (identity, MW, half-life)" />
                <CrossLink href="/families/incretins-metabolic" label="The incretins & metabolic family" />
                <CrossLink href="/tools/half-life?t12=1.5&unit=min" label="Model GLP-1's half-life & dosing" />
                <CrossLink href="/research?q=What%20does%20the%20clinical%20trial%20evidence%20show%20for%20GLP-1%2FGIP%20co-agonism%3F" label="Ask the research agent for current trials" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing
              guidance, or a recommendation to use any compound. Specific
              compounds are named to explain the science; verify any claim against
              primary sources.
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

/* ── Signaling cascade diagram ── */
function PathwayDiagram() {
  const nodes: { label: string; sub: string; color: string; highlight?: boolean }[] = [
    { label: "GLP-1 → GLP-1R", sub: "class B GPCR on the β-cell", color: "var(--accent)" },
    { label: "Gαs → adenylyl cyclase", sub: "the receptor couples to Gs", color: "var(--accent-blue)" },
    { label: "cAMP ↑", sub: "the second messenger", color: "var(--accent-teal)" },
    { label: "PKA + Epac2", sub: "two cAMP effectors", color: "var(--accent-purple)" },
    { label: "Insulin granule exocytosis ↑", sub: "potentiated — only when glucose is high", color: "var(--accent)", highlight: true },
  ];
  const W = 520, nodeH = 62, gap = 30, x = 70, w = 380;
  const H = nodes.length * nodeH + (nodes.length - 1) * gap + 20;
  const yAt = (i: number) => 10 + i * (nodeH + gap);

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img" aria-label="GLP-1 signaling cascade in the pancreatic beta cell">
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
              fill={n.highlight ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--panel)"}
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
        The GLP-1 cascade amplifies a calcium-dependent step the glucose signal has already triggered.
      </figcaption>
    </figure>
  );
}
