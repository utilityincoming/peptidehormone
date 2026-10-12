import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("two-ways-to-ask-for-growth")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "GHRH vs Ghrelin / GHRPs: How GH Secretagogues Release Growth Hormone — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "Two Ways to Ask for Growth: GHRH Analogs, GHRPs, and the Pulsatile GH Axis · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  bowers: "https://doi.org/10.1210/endo-128-4-2027", // Bowers et al. 1991, Endocrinology — GHRP dual hypothalamic/pituitary site, GHRH synergy not via somatostatin
  ionescu: "https://pubmed.ncbi.nlm.nih.gov/17018654/", // Ionescu & Frohman 2006, JCEM — single CJC-1295 injection preserves GH pulsatility, raises trough
  falutz: "https://pubmed.ncbi.nlm.nih.gov/18057338/", // Falutz et al. 2007, NEJM — tesamorelin reduces visceral adipose tissue in HIV lipodystrophy
  raun: "https://pubmed.ncbi.nlm.nih.gov/9849822/", // Raun et al. 1998, Eur J Endocrinol — ipamorelin, the first selective GH secretagogue (no ACTH/cortisol rise)
  nass: "https://doi.org/10.7326/0003-4819-149-9-200811040-00003", // Nass et al. 2008, Ann Intern Med — oral MK-677 raises GH/IGF-1 and fat-free mass, no strength gain, glucose rises
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is the difference between a GHRH analog and a GHRP?",
    a: "They push the same gland through two different receptors. GHRH analogs — sermorelin, tesamorelin, CJC-1295 — copy the hypothalamus's own releasing hormone and act on the pituitary GHRH receptor, the natural accelerator. GHRPs and related ghrelin mimetics — GHRP-6, GHRP-2, hexarelin, ipamorelin, and the oral small molecule MK-677 — act on a completely separate receptor, GHS-R1a, the one ghrelin uses. Because the two inputs are different receptors, giving them together releases more growth hormone than either alone — the basis of the popular CJC-1295-plus-ipamorelin pairing.",
  },
  {
    q: "Why use a GH secretagogue instead of just injecting growth hormone?",
    a: "The argument is pulsatility and feedback. The pituitary normally releases GH in bursts with near-zero troughs between them, and that pattern — not a steady level — is what the body reads. Injected GH flattens the rhythm into a plateau. A secretagogue asks the pituitary to fire its own pulse, so the pattern is preserved, and IGF-1 feedback stays intact, which caps how high the axis can be driven. That self-limiting loop is a genuine safety feature. Whether 'more physiological' translates into better outcomes than GH is largely unproven outside tesamorelin's one approved use.",
  },
  {
    q: "Does CJC-1295 preserve the natural GH pulse?",
    a: "It depends which version. The short-acting GHRH fragment (sometimes sold as 'mod GRF 1-29') clears quickly, and a single injection was shown to raise trough GH and 24-hour GH while leaving pulse frequency and amplitude intact. The long-acting 'CJC-1295 with DAC' form binds to albumin and persists for days — which keeps the GHRH signal switched on continuously and blunts the very pulsatility that was the selling point. The longer you stretch the half-life, the more a GHRH analog starts to look like the steady plateau it was supposed to avoid.",
  },
  {
    q: "Is any growth-hormone secretagogue actually FDA-approved?",
    a: "One, for one thing. Tesamorelin (Egrifta), a stabilized GHRH analog, is approved to reduce excess visceral abdominal fat in people with HIV-associated lipodystrophy, on the strength of a randomized trial in which visceral fat fell about 15% versus a rise on placebo. No GHRP and no ghrelin mimetic has an approval for body composition, recovery, or anti-aging; ipamorelin's one completed human efficacy trial (for post-operative ileus) failed, and MK-677 remains investigational. All of these compounds are prohibited in sport by WADA.",
  },
  {
    q: "What does MK-677 (ibutamoren) actually do in people?",
    a: "MK-677 is an oral, non-peptide ghrelin-receptor agonist, and it is the secretagogue with the longest controlled human data. Over a year in healthy older adults it raised GH and IGF-1 back toward young-adult levels and increased fat-free mass by roughly a kilogram — but strength and physical function did not improve, and fasting glucose rose. That split is the honest summary of the whole class: the surrogate markers (GH, IGF-1, lean mass on a scan) move reliably; the outcomes people actually want are either unproven or, where tested, did not follow.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(94,168,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/growth-repair" className="text-accent-blue hover:text-ink">
                Growth &amp; repair
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
            <Section title="Two buttons on one gland">
              <P>
                The pituitary releases{" "}
                <Link href="/hormones/growth-hormone" className={LINK}>growth hormone</Link>{" "}
                in bursts. Several times a day, most of them at night, the gland
                fires a pulse; between pulses the level drops close to nothing.
                That pattern is not an accident of plumbing. It is the signal, and
                the whole axis is built to read a rhythm rather than a
                concentration — the same principle that governs the{" "}
                <Link href="/insights/the-pulse-is-the-message" className={LINK}>
                  reproductive axis
                </Link>
                , running one gland over.
              </P>
              <P>
                Two hypothalamic signals set that rhythm, and they pull in opposite
                directions.{" "}
                <Link href="/hormones/ghrh" className={LINK}>GHRH</Link>{" "}
                — growth-hormone-releasing hormone — is the accelerator; somatostatin
                is the brake. A GH pulse is what you get when GHRH rises while
                somatostatin falls. And there is a second accelerator the body
                discovered later:{" "}
                <Link href="/hormones/ghrelin" className={LINK}>ghrelin</Link>, the
                stomach&rsquo;s hunger hormone, which turns out to drive GH through a
                receptor all its own. So there are exactly two buttons you can press
                to ask for more growth hormone without injecting the hormone itself —
                push GHRH, or press ghrelin&rsquo;s receptor — and the entire
                secretagogue shelf is one or the other, or both at once.
              </P>
              <Callout label="The thesis">
                The community&rsquo;s case for secretagogues over straight HGH is that
                they <Em>ask</Em> the gland to fire its own pulse instead of
                overriding it, and leave IGF-1 feedback intact so the loop
                self-limits. Both halves of that argument are real. Both also get
                complicated the moment you look at what the actual molecules do.
              </Callout>
            </Section>

            <Section title="Why not just inject growth hormone?">
              <P>
                The obvious alternative is to supply GH directly, and for genuine
                deficiency that is the treatment. But exogenous GH flattens the
                rhythm. A daily injection holds a broad, unphysiological plateau
                where the body expects sharp peaks over empty troughs, and it
                switches off the gland&rsquo;s own output through the feedback loop
                that normally governs it. The pattern the tissues are tuned to read
                is simply gone.
              </P>
              <P>
                A secretagogue works the other way. It raises the gland&rsquo;s own
                secretion, so whatever pulse structure the pituitary can still
                produce is preserved, and the downstream brake stays connected:{" "}
                <Link href="/hormones/igf-1" className={LINK}>IGF-1</Link>, made in
                the liver in response to GH, feeds back to restrain both GHRH and the
                pituitary. That feedback is why a secretagogue cannot drive GH without
                limit — the higher IGF-1 climbs, the harder the axis pushes back. It
                is the real mechanistic advantage of the approach, and it is also a
                ceiling: you are asking a gland that may already be near its output,
                not bypassing it.
              </P>
              <TwoButtons />
            </Section>

            <Section title="The first button: GHRH analogs">
              <P>
                Native GHRH is a 44-residue peptide, and its business end is the
                first 29 residues — GRF(1&ndash;29), the fragment that retains full
                activity. Nearly every GHRH drug is that fragment, re-engineered for
                survival in the blood.{" "}
                <Link href="/hormones/sermorelin" className={LINK}>Sermorelin</Link>{" "}
                is GRF(1&ndash;29) essentially unmodified; it was once an approved
                product (Geref) for diagnosing and treating childhood GH deficiency
                and was withdrawn from the US market for commercial, not safety,
                reasons. It works, but it clears in minutes.
              </P>
              <P>
                <Link href="/hormones/tesamorelin" className={LINK}>Tesamorelin</Link>{" "}
                is the same fragment with a stabilizing group on the N-terminus, and
                it is the one GHRH analog that carries a real outcome trial and an
                FDA label. In a randomized study of 412 people with HIV-associated
                abdominal fat accumulation, daily tesamorelin cut visceral adipose
                tissue by about 15% while placebo rose (
                <a href={REF.falutz} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Falutz et&nbsp;al., NEJM, 2007
                </a>
                ). That is the high-water mark for evidence in this entire family —
                one molecule, one population, one body-composition endpoint.
              </P>
              <P>
                <Link href="/hormones/cjc-1295" className={LINK}>CJC-1295</Link>{" "}
                is where the engineering gets interesting, and where the pulsatility
                argument starts to wobble. It comes in two forms. The short-acting
                fragment (often sold as &ldquo;mod GRF 1-29&rdquo;) clears fast; a
                single dose was shown to raise trough and 24-hour GH while leaving
                pulse frequency and amplitude intact (
                <a href={REF.ionescu} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ionescu &amp; Frohman, JCEM, 2006
                </a>
                ) — pulsatility genuinely preserved. The long-acting
                &ldquo;CJC-1295 with DAC&rdquo; form adds a group that binds albumin
                and keeps the molecule circulating for days. That is marketed as an
                advantage, and in half-life terms it is. But a GHRH signal that never
                switches off is, by definition, the continuous plateau the whole
                approach was supposed to avoid. Stretch the half-life far enough and
                the accelerator gets stuck down.
              </P>
            </Section>

            <Section title="The second button: ghrelin and the GHRPs">
              <P>
                The other accelerator came from an unexpected place. In the 1980s,
                synthetic peptides were found to release GH through a receptor that
                was not the GHRH receptor — the growth-hormone-releasing peptides, or
                GHRPs. For years the natural ligand of that receptor was a mystery;
                when it was finally found, in 1999, it was{" "}
                <Link href="/hormones/ghrelin" className={LINK}>ghrelin</Link>, a
                stomach hormone better known for driving hunger. The GHRPs had been
                mimicking a gut hormone all along, and the receptor is GHS-R1a, the
                ghrelin receptor.
              </P>
              <P>
                The early GHRPs — GHRP-6, GHRP-2, hexarelin — were effective but
                blunt: they also bumped cortisol and prolactin, because the ghrelin
                receptor sits near circuits that control them.{" "}
                <Link href="/hormones/ipamorelin" className={LINK}>Ipamorelin</Link>{" "}
                was the fix. Described in 1998 as &ldquo;the first selective growth
                hormone secretagogue,&rdquo; it releases GH with a potency close to
                GHRP-6 but does not raise ACTH or cortisol even at doses far above the
                GH-release threshold (
                <a href={REF.raun} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Raun et&nbsp;al., Eur&nbsp;J&nbsp;Endocrinol, 1998
                </a>
                ). Clean selectivity is why ipamorelin became the GHRP the community
                reaches for.
              </P>
              <P>
                And this receptor, like the GLP-1 receptor, does not insist on being
                addressed by a peptide.{" "}
                <Em>MK-677 (ibutamoren)</Em> is an orally active, non-peptide ghrelin
                mimetic — a daily pill that hits GHS-R1a. It is the same
                small-molecule move the incretin field is making with{" "}
                <Link href="/insights/glp-1-in-a-pill" className={LINK}>oral GLP-1</Link>:
                the receptor reads the message, so the messenger can stop being an
                injection. It is also, as it happens, the secretagogue with the
                longest controlled human record — which is where the sceptical reading
                begins.
              </P>
            </Section>

            <Section title="Why you would press both">
              <P>
                The reason the standard community stack pairs a GHRH analog with a
                GHRP — CJC-1295 with ipamorelin is the canonical example — is not
                marketing. It is one of the cleaner pharmacology results in the field.
                Because the two inputs land on different receptors, giving them
                together releases <Em>more</Em> GH than the sum of each alone. The
                synergy is not explained simply by the GHRP suppressing somatostatin;
                the peptides act at both hypothalamic and pituitary levels through a
                mechanism distinct from GHRH&rsquo;s (
                <a href={REF.bowers} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Bowers et&nbsp;al., Endocrinology, 1991
                </a>
                ).
              </P>
              <P>
                Read as signals, it makes sense: GHRH tells the somatotroph to
                release, a GHRP amplifies that release and lifts the somatostatin
                brake a little, and the pulse that results is larger than either lever
                could produce by itself. This is the genuinely elegant part of the
                story — two evolutionarily separate accelerators that happen to
                multiply. It is also the point where the biology is most settled and
                the human outcome data is thinnest.
              </P>
            </Section>

            <Section title="What the evidence actually supports">
              <P>
                Here the page turns sceptical. Everything above is real mechanism; the
                question is what it buys in a person. The honest pattern across the
                whole class is a split between <Em>surrogate markers</Em>, which move
                reliably, and <Em>outcomes</Em>, which mostly do not — or have not been
                tested. A secretagogue will raise your GH and IGF-1; that is easy to
                show and essentially guaranteed. Whether it makes you leaner, stronger,
                or better-recovered is a separate claim, and it is where the evidence
                runs out.
              </P>
              <P>
                MK-677 is the clearest window, because it was studied for a year. In
                healthy older adults it restored GH and IGF-1 toward young-adult levels
                and added about a kilogram of fat-free mass — and strength and physical
                function did not improve, while fasting glucose rose (
                <a href={REF.nass} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Nass et&nbsp;al., Ann&nbsp;Intern&nbsp;Med, 2008
                </a>
                ). The markers moved; the thing you actually wanted did not. Ipamorelin
                tells a similar story from the other direction: its one completed human
                efficacy trial, for post-operative ileus, failed. Tesamorelin keeps its
                label precisely because it cleared an outcome endpoint in a defined
                population — and even there the effect reverses when the drug stops.
              </P>
              <P>
                The self-limiting feedback that makes secretagogues attractive is also
                a cap: IGF-1 feedback means you are coaxing a gland, not commanding it,
                so an older or already-maximal axis has little room to give. And none
                of these compounds is a free lunch pharmacologically — the ghrelin
                mimetics can raise appetite, blood sugar, and fluid retention, exactly
                as a hunger hormone acting through its own receptor would predict.
                Every one of them is banned in sport by WADA. Bullish on the biology,
                which is excellent; sceptical on the page, which keeps promising the
                outcome and delivering the marker.
              </P>
              <Bullets
                items={[
                  ["Two receptors, one gland", "GHRH analogs (sermorelin, tesamorelin, CJC-1295) press the GHRH receptor; GHRPs and ghrelin mimetics (ipamorelin, MK-677) press GHS-R1a. Separate buttons, same pulse."],
                  ["Working with the rhythm is the point — and the catch", "Secretagogues ask the gland to fire its own pulse and leave IGF-1 feedback intact. But long-acting CJC-1295-with-DAC flattens the very pulsatility that was the argument."],
                  ["Synergy is more than additive", "Because the two inputs hit different receptors, GHRH + GHRP together release more GH than either alone — the basis of the CJC-1295 + ipamorelin stack, and the field's best-settled result."],
                  ["Selectivity was the real advance in GHRPs", "Older GHRP-6 and GHRP-2 also raised cortisol and prolactin; ipamorelin releases GH without them, which is why it won out."],
                  ["Markers move; outcomes mostly don't", "Tesamorelin has an approval and an outcome (visceral fat in HIV). MK-677 raised IGF-1 and lean mass for a year without improving strength, and nudged glucose up. Ipamorelin's one efficacy trial failed. All are WADA-banned."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/ghrh" label="GHRH reference (the accelerator)" />
                <CrossLink href="/hormones/ghrelin" label="Ghrelin reference (the second button)" />
                <CrossLink href="/hormones/tesamorelin" label="Tesamorelin reference (the one with a label)" />
                <CrossLink href="/hormones/ipamorelin" label="Ipamorelin reference (the selective GHRP)" />
                <CrossLink href="/hormones/cjc-1295" label="CJC-1295 reference (and the DAC trade-off)" />
                <CrossLink href="/families/growth-repair" label="The growth & repair family" />
                <CrossLink href="/insights/the-pulse-is-the-message" label="The pulse is the message — the same rhythm logic, one axis over" />
                <CrossLink href="/insights/the-other-pedal" label="The other pedal — the IGF-1 accelerator this axis feeds" />
                <CrossLink href="/research?q=How%20do%20GHRH%20analogs%20and%20ghrelin-receptor%20GHRPs%20differ%20in%20mechanism%2C%20and%20why%20are%20they%20synergistic%20when%20combined%3F" label="Ask the research agent about the two pathways" />
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

/* ── Two accelerators, one brake, one feedback loop, one pulse ── */
function TwoButtons() {
  const W = 720;
  const H = 384;

  // Pituitary node (center) and the pulse plot (right).
  const PIT = { x: 330, y: 192, r: 46 };
  const PLOT = { x0: 470, x1: 690, mid: 192, base: 300, top: 120 };

  // GH pulse waveform — sharp bursts over near-zero troughs.
  const peaks = [505, 560, 615, 668];
  const pulse: [number, number][] = [];
  for (let x = PLOT.x0; x <= PLOT.x1; x += 4) {
    let bump = 0;
    for (const p of peaks) { const d = (x - p) / 11; bump = Math.max(bump, Math.exp(-d * d)); }
    pulse.push([x, PLOT.base - (PLOT.base - PLOT.top) * bump]);
  }
  const pts = pulse.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  const Node = ({ x, y, r, name, sub, kind }: { x: number; y: number; r: number; name: string; sub: string; kind: "plus" | "minus" | "gland" }) => {
    const stroke = kind === "minus" ? "var(--color-ink)" : "var(--accent-blue)";
    const op = kind === "minus" ? 0.35 : 0.7;
    return (
      <g>
        <circle cx={x} cy={y} r={r}
          fill={kind === "gland" ? "color-mix(in srgb, var(--accent-blue) 12%, transparent)" : kind === "minus" ? "color-mix(in srgb, var(--color-ink) 7%, transparent)" : "color-mix(in srgb, var(--accent-blue) 10%, transparent)"}
          stroke={stroke} strokeOpacity={op} strokeWidth={1.4} />
        <text x={x} y={y - 2} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.85} fontSize="12.5" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">{name}</text>
        <text x={x} y={y + 14} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.45} fontSize="9.5">{sub}</text>
      </g>
    );
  };

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A signal-flow diagram of the growth-hormone axis. Two accelerators feed the pituitary somatotroph: GHRH (acting on the GHRH receptor) from the hypothalamus, and ghrelin or GHRPs (acting on the GHS-R1a receptor). Somatostatin applies a brake. The somatotroph fires growth hormone in sharp pulses over near-zero troughs. Liver IGF-1 feeds back to inhibit both the hypothalamus and the pituitary, so the loop self-limits."
      >
        <text x={W / 2} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Two accelerators, one brake, one pulse
        </text>
        <text x={W / 2} y={42} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10.5">
          blue = stimulate (+) · grey = inhibit (−)
        </text>

        {/* input arrows into the pituitary */}
        <defs>
          <marker id="ab-plus" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L7 4 L0 8 z" fill="var(--accent-blue)" fillOpacity="0.75" />
          </marker>
          <marker id="ab-minus" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 3.2 L7 3.2 L7 4.8 L0 4.8 z" fill="var(--color-ink)" fillOpacity="0.4" />
          </marker>
        </defs>

        {/* GHRH accelerator (top-left) */}
        <Node x={96} y={110} r={44} name="GHRH" sub="accelerator" kind="plus" />
        <line x1={140} y1={126} x2={PIT.x - PIT.r - 4} y2={PIT.y - 20} stroke="var(--accent-blue)" strokeOpacity={0.55} strokeWidth={1.6} markerEnd="url(#ab-plus)" />
        <text x={212} y={142} fill="var(--accent-blue)" fillOpacity={0.8} fontSize="9.5">GHRH receptor</text>

        {/* Ghrelin / GHRP accelerator (bottom-left) */}
        <Node x={96} y={286} r={44} name="Ghrelin" sub="GHRP · MK-677" kind="plus" />
        <line x1={140} y1={270} x2={PIT.x - PIT.r - 4} y2={PIT.y + 20} stroke="var(--accent-blue)" strokeOpacity={0.55} strokeWidth={1.6} markerEnd="url(#ab-plus)" />
        <text x={214} y={258} fill="var(--accent-blue)" fillOpacity={0.8} fontSize="9.5">GHS-R1a</text>

        {/* Somatostatin brake (top, dashed) */}
        <Node x={330} y={66} r={38} name="SST" sub="brake" kind="minus" />
        <line x1={330} y1={104} x2={330} y2={PIT.y - PIT.r - 4} stroke="var(--color-ink)" strokeOpacity={0.3} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#ab-minus)" />

        {/* Pituitary somatotroph */}
        <Node x={PIT.x} y={PIT.y} r={PIT.r} name="Somatotroph" sub="pituitary" kind="gland" />

        {/* pituitary → pulse output */}
        <line x1={PIT.x + PIT.r + 2} y1={PIT.y} x2={PLOT.x0 - 6} y2={PIT.y} stroke="var(--accent-blue)" strokeOpacity={0.55} strokeWidth={1.6} markerEnd="url(#ab-plus)" />

        {/* GH pulse plot */}
        <line x1={PLOT.x0} y1={PLOT.base} x2={PLOT.x1} y2={PLOT.base} stroke="var(--color-ink)" strokeOpacity={0.12} strokeWidth={1} />
        <polyline points={pts} fill="none" stroke="var(--accent-blue)" strokeOpacity={0.9} strokeWidth={1.8} />
        <text x={(PLOT.x0 + PLOT.x1) / 2} y={PLOT.top - 6} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.6} fontSize="11" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">GH pulses</text>
        <text x={PLOT.x1} y={PLOT.base + 15} textAnchor="end" fill="var(--color-ink)" fillOpacity={0.4} fontSize="9.5">time →</text>

        {/* IGF-1 feedback arc (liver → back up, inhibitory, dashed) */}
        <path d={`M ${(PLOT.x0 + PLOT.x1) / 2} ${PLOT.base + 34} C 360 364, 150 360, 110 158`} fill="none" stroke="var(--color-ink)" strokeOpacity={0.28} strokeWidth={1.4} strokeDasharray="4 3" markerEnd="url(#ab-minus)" />
        <text x={360} y={360} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="10">liver IGF-1 feedback (−) — the loop self-limits</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two separate receptors feed one gland, a brake holds it back, and IGF-1 feedback
        caps how hard it can be driven. A secretagogue presses a button; it does not
        replace the pulse.
      </figcaption>
    </figure>
  );
}
