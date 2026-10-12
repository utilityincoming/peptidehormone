import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-off-switch")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Somatostatin Analogs: Octreotide, Lanreotide, Pasireotide and SSTR Selectivity — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Off Switch: Somatostatin, Its Analogs, and Why Receptor Selectivity Is the Whole Game · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  brazeau: "https://doi.org/10.1126/science.179.4068.77", // Brazeau, Guillemin et al. 1973, Science — isolation of somatostatin (SRIF), the GH-inhibiting hypothalamic peptide
  clarinet: "https://doi.org/10.1056/NEJMoa1316158", // Caplin et al. 2014, NEJM — CLARINET: lanreotide prolongs PFS in enteropancreatic NETs
  cushings: "https://doi.org/10.1056/NEJMoa1105743", // Colao et al. 2012, NEJM — pasireotide in Cushing's disease, with high hyperglycemia rate
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is somatostatin?",
    a: "Somatostatin is an inhibitory peptide hormone — essentially the body's universal 'off' signal for secretion. Released from the hypothalamus, the pancreatic delta cells and the gut, it shuts down growth hormone and TSH from the pituitary, insulin and glucagon from the pancreas, and a long list of gut hormones and digestive secretions. In the growth-hormone axis it is the brake that opposes GHRH and ghrelin and carves the troughs between GH pulses. It acts through five receptor subtypes, SSTR1 through SSTR5.",
  },
  {
    q: "Why can't somatostatin itself be used as a drug?",
    a: "Two reasons. First, native somatostatin survives only about two minutes in the blood, so any effect ends almost as soon as the infusion stops — and stopping can trigger rebound hypersecretion. Second, it inhibits almost everything at once, which is exactly what you don't want in a targeted therapy. The drugs used in the clinic are engineered analogs — octreotide, lanreotide, pasireotide — redesigned to last for weeks and to grip only some of the five receptor subtypes.",
  },
  {
    q: "What is the difference between octreotide, lanreotide and pasireotide?",
    a: "Octreotide and lanreotide are close cousins: both preferentially engage SSTR2 (with some SSTR5), both come as long-acting depots dosed roughly monthly, and both are mainstays for acromegaly and neuroendocrine tumors. Pasireotide is the broad-spectrum one — it binds SSTR1, 2, 3 and 5. That wider reach, especially its stronger SSTR5 activity, lets it work in Cushing's disease where octreotide largely fails, but the same breadth is why it raises blood sugar in most patients.",
  },
  {
    q: "Why do somatostatin analogs cause high blood sugar — and why is pasireotide worse?",
    a: "Somatostatin normally suppresses insulin, so a long-acting analog can nudge blood glucose up. Pasireotide does it far more because of which receptor it grips: SSTR5 sits on the pancreatic beta cell, and pasireotide's strong SSTR5 engagement blunts insulin secretion markedly. In its Cushing's disease trial, most patients developed hyperglycemia. The breadth that makes pasireotide effective is the same breadth that disturbs glucose — a clean illustration that broader receptor coverage is not simply better.",
  },
  {
    q: "Do somatostatin analogs shrink tumors or just control symptoms?",
    a: "Both, to different degrees. They were first used to quiet hormone oversecretion — the growth hormone of acromegaly, the flushing and diarrhea of carcinoid syndrome. But they also slow tumor progression: in the CLARINET trial, lanreotide markedly prolonged progression-free survival in metastatic enteropancreatic neuroendocrine tumors versus placebo. The same SSTR2 receptor that acts as a secretion valve also serves as a growth brake, which is why these drugs are antiproliferative as well as anti-secretory — and why SSTR2 is used to image and target these tumors.",
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
            <Section title="The universal no">
              <P>
                Most hormones say a specific thing to a specific tissue.{" "}
                <Link href="/hormones/somatostatin" className={LINK}>Somatostatin</Link>{" "}
                says one thing to almost everything: <Em>stop</Em>. It shuts down growth
                hormone and TSH from the pituitary, insulin and glucagon from the
                pancreatic islet, and a long roster of gut hormones and digestive
                secretions besides. It was discovered in 1973 as the factor in
                hypothalamic extract that blocked growth-hormone release — first named
                somatotropin-release-inhibiting factor — and the surprise was how far its
                reach extended beyond that one job (
                <a href={REF.brazeau} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Brazeau, Guillemin et&nbsp;al., Science, 1973
                </a>
                ).
              </P>
              <P>
                In the growth-hormone axis, somatostatin is the brake. The companion to
                this piece walked the{" "}
                <Link href="/insights/two-ways-to-ask-for-growth" className={LINK}>
                  two accelerators that raise GH
                </Link>{" "}
                — GHRH and ghrelin — and noted that a GH pulse is what happens when those
                rise while somatostatin falls. This is the brake&rsquo;s own story, and it
                is an unusual one, because somatostatin is the rare hormone whose entire
                drug strategy is inverted: you do not supply it to boost a signal, you
                engineer a longer-lasting version to <Em>hold a system down</Em>. The
                whole art is in choosing how broadly it presses.
              </P>
            </Section>

            <Section title="Why you can't bottle the brake">
              <P>
                Native somatostatin is a hopeless drug, for the same reason{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> is: it vanishes.
                Its half-life in blood is about two minutes, so an infusion works only
                while it runs, and cutting it off can provoke a rebound surge of the very
                hormones it was suppressing. Add to that its indiscriminate reach — a
                molecule that silences GH, insulin, glucagon and gut secretion all at once
                is a blunt instrument — and the native peptide is useful for little but a
                short hospital infusion.
              </P>
              <P>
                The fix was the same one the incretin field would later reach for in the{" "}
                <Link href="/insights/peptide-half-life-engineering" className={LINK}>
                  half-life engineering
                </Link>{" "}
                of semaglutide: don&rsquo;t administer the fragile native hormone, build an
                analog that lasts.{" "}
                <Link href="/hormones/octreotide" className={LINK}>Octreotide</Link> and{" "}
                <Link href="/hormones/lanreotide" className={LINK}>lanreotide</Link> are
                small cyclic peptides that reproduce somatostatin&rsquo;s inhibition but
                survive long enough to matter, and in depot form they release over roughly
                a month — a single injection standing in for a hormone that natively lasts
                minutes. The drug is the brake, made durable.
              </P>
            </Section>

            <Section title="Selectivity is the whole game">
              <P>
                Here is the key move. Native somatostatin binds all five receptor subtypes,
                SSTR1 through SSTR5, which is exactly why it shuts down everything — and
                exactly why its breadth is a liability. The analogs narrow it. Octreotide
                and lanreotide preferentially grip <Em>SSTR2</Em> (with some SSTR5), and
                that narrower focus is what turns a universal off-switch into a targeted
                one: enough to silence growth hormone in acromegaly and the hormone
                oversecretion of neuroendocrine tumors, without flattening every other
                secretion in the body.
              </P>
              <P>
                So the question that decides what a somatostatin analog does is not
                &ldquo;how strong&rdquo; but &ldquo;which subtypes.&rdquo; SSTR2 governs the
                growth-hormone and most of the neuroendocrine-tumor story. SSTR5 matters in
                places SSTR2 does not reach — and, as the pancreas will show in a moment,
                carries a cost. Reading these drugs means reading their receptor profile,
                the same way reading an{" "}
                <Link href="/insights/the-gip-paradox" className={LINK}>incretin co-agonist</Link>{" "}
                means reading which receptors it touches and in which direction.
              </P>
              <SubtypeMatrix />
            </Section>

            <Section title="Two jobs: quiet the hormone, stop the tumor">
              <P>
                The first job was secretion. In acromegaly — a pituitary tumor pouring out
                growth hormone — an SSTR2-preferring analog suppresses GH and brings{" "}
                <Link href="/hormones/igf-1" className={LINK}>IGF-1</Link> down toward
                normal. In carcinoid syndrome, the flushing and diarrhea driven by a
                hormone-secreting tumor are calmed by the same mechanism. For years that was
                the whole indication: these were drugs that turned the volume down on a
                gland that would not stop talking.
              </P>
              <P>
                Then came the second discovery, which is more interesting. The analogs do
                not merely quiet secretion; they slow the tumor itself. In the CLARINET
                trial, lanreotide roughly doubled progression-free survival against placebo
                in metastatic enteropancreatic neuroendocrine tumors — the median was not
                even reached on the drug, versus 18 months on placebo (
                <a href={REF.clarinet} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Caplin et&nbsp;al., NEJM, 2014
                </a>
                ). The same SSTR2 that works as a secretion valve also acts as a growth
                brake on the tumor cell. That dual role is why SSTR2 is now used not only to
                treat these tumors but to <Em>find</Em> them — the receptor is the target for
                both imaging and radionuclide therapy.
              </P>
            </Section>

            <Section title="Pasireotide: broader is not simply better">
              <P>
                If narrowing to SSTR2 made the analogs useful, the obvious next idea is to
                cover more subtypes — and{" "}
                <Link href="/hormones/pasireotide" className={LINK}>pasireotide</Link> does,
                binding SSTR1, 2, 3 and 5. The payoff is real and specific. Cushing&rsquo;s
                disease — a corticotroph tumor driving excess ACTH and cortisol — runs
                largely through SSTR5, which octreotide barely touches, so octreotide
                mostly fails there. Pasireotide&rsquo;s strong SSTR5 engagement lets it
                succeed: in its phase 3 trial it lowered cortisol and controlled disease in
                a meaningful fraction of patients (
                <a href={REF.cushings} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Colao et&nbsp;al., NEJM, 2012
                </a>
                ).
              </P>
              <P>
                But breadth is never free, and pasireotide pays for it in the pancreas. SSTR5
                also sits on the insulin-secreting beta cell, so the same receptor activity
                that controls Cushing&rsquo;s also throttles insulin — and in that trial the
                <Em> majority</Em> of patients developed hyperglycemia, many frankly diabetic.
                It is the cleanest lesson in the whole family: the extra receptor that makes
                the drug work in one disease is the extra receptor that disturbs glucose in
                every patient. More coverage is a different drug, not a strictly better one —
                the same truth the{" "}
                <Link href="/insights/the-gip-paradox" className={LINK}>GIP paradox</Link>{" "}
                teaches from the agonist side.
              </P>
              <Callout label="The engineering read">
                A somatostatin analog is defined by its receptor fingerprint. Grip SSTR2 and
                you get the growth-hormone and neuroendocrine-tumor effects. Add SSTR5 and you
                unlock Cushing&rsquo;s — and acquire the hyperglycemia, because SSTR5 is on the
                beta cell too. There is no &ldquo;stronger&rdquo; here, only &ldquo;which
                subtypes, and what they cost.&rdquo;
              </Callout>
            </Section>

            <Section title="The brake, read as a signal">
              <P>
                Somatostatin is the inverse of almost everything else on this shelf. The
                incretins and the growth secretagogues are accelerators you supply; the
                natriuretic peptides are signals you{" "}
                <Link href="/insights/the-heart-is-a-gland" className={LINK}>protect rather than replace</Link>.
                Somatostatin is a brake you cannot usefully supply in native form, so medicine
                rebuilds it to last and then machines down which receptors it grips. Read that
                receptor fingerprint and the family resolves: why octreotide and lanreotide own
                acromegaly and neuroendocrine tumors, why pasireotide reaches Cushing&rsquo;s at
                the price of blood sugar, and why the most inhibitory hormone in the body became
                a precision tool only once it was made less universal.
              </P>
              <Bullets
                items={[
                  ["Somatostatin is the universal inhibitor", "It suppresses GH, TSH, insulin, glucagon and gut secretion through five receptor subtypes — the brake that opposes GHRH and ghrelin in the GH axis."],
                  ["The native hormone can't be a drug", "A ~2-minute half-life and rebound hypersecretion make it useless outside a short infusion. The analogs are engineered to last weeks — the brake made durable."],
                  ["Receptor selectivity is the whole story", "Native somatostatin hits all five SSTRs. Octreotide and lanreotide narrow to SSTR2 (+some 5), turning a universal off-switch into a targeted one."],
                  ["Anti-secretory and antiproliferative", "They quiet the hormone (acromegaly GH, carcinoid flushing) and slow the tumor — CLARINET showed lanreotide roughly doubling PFS in neuroendocrine tumors. SSTR2 is both valve and growth brake."],
                  ["Pasireotide shows breadth has a price", "Its broad profile (SSTR1/2/3/5) unlocks Cushing's via SSTR5 — but the same SSTR5 on the beta cell drives hyperglycemia in most patients. Broader is a different drug, not a better one."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/somatostatin" label="Somatostatin reference (the universal brake)" />
                <CrossLink href="/hormones/octreotide" label="Octreotide reference (the SSTR2 analog)" />
                <CrossLink href="/hormones/lanreotide" label="Lanreotide reference (the depot analog)" />
                <CrossLink href="/hormones/pasireotide" label="Pasireotide reference (the broad-spectrum analog)" />
                <CrossLink href="/insights/two-ways-to-ask-for-growth" label="Two ways to ask for growth — the accelerators this brake opposes" />
                <CrossLink href="/insights/peptide-half-life-engineering" label="Half-life engineering — the same durability problem" />
                <CrossLink href="/families/growth-repair" label="The growth & repair family" />
                <CrossLink href="/research?q=How%20does%20somatostatin-receptor%20subtype%20selectivity%20%28SSTR2%20vs%20SSTR5%29%20explain%20the%20different%20clinical%20profiles%20of%20octreotide%2C%20lanreotide%20and%20pasireotide%3F" label="Ask the research agent about SSTR selectivity" />
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

/* ── Which receptor subtypes each analog grips, and what they govern ── */
function SubtypeMatrix() {
  const cols = ["SSTR1", "SSTR2", "SSTR3", "SSTR4", "SSTR5"];
  // affinity grade 0..3 per drug across SSTR1-5
  const rows: { name: string; sub: string; a: number[] }[] = [
    { name: "Somatostatin", sub: "native — all five", a: [3, 3, 3, 3, 3] },
    { name: "Octreotide", sub: "SSTR2 ≫ 5", a: [0, 3, 1, 0, 1] },
    { name: "Lanreotide", sub: "SSTR2 ≫ 5", a: [0, 3, 1, 0, 1] },
    { name: "Pasireotide", sub: "broad: 1·2·3·5", a: [2, 3, 2, 0, 3] },
  ];

  const W = 700;
  const H = 316;
  const LX = 176; // left label column width
  const CW = (W - LX - 20) / cols.length; // column width
  const RY0 = 86; // first row y
  const RH = 46; // row height

  const shade = (g: number) =>
    g === 0
      ? "color-mix(in srgb, var(--color-ink) 5%, transparent)"
      : `color-mix(in srgb, var(--accent-blue) ${12 + g * 22}%, transparent)`;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A matrix of somatostatin-receptor affinity. Rows are native somatostatin, octreotide, lanreotide and pasireotide; columns are the five receptor subtypes SSTR1 to SSTR5, shaded by how strongly each drug binds. Native somatostatin binds all five strongly. Octreotide and lanreotide bind SSTR2 strongly with weak SSTR5 and SSTR3. Pasireotide binds SSTR1, 2, 3 and 5. SSTR2 drives growth hormone and neuroendocrine-tumor effects; SSTR5 drives the Cushing's-disease effect and, on the beta cell, hyperglycemia."
      >
        <text x={W / 2} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Which receptor each analog grips
        </text>
        <text x={W / 2} y={42} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10.5">
          darker = stronger binding
        </text>

        {/* column headers */}
        {cols.map((c, j) => {
          const cx = LX + j * CW + CW / 2;
          const key = c === "SSTR2" || c === "SSTR5";
          return (
            <text key={c} x={cx} y={74} textAnchor="middle" fill={key ? "var(--accent-blue)" : "var(--color-ink)"} fillOpacity={key ? 0.95 : 0.55} fontSize="11" fontWeight={key ? "700" : "600"} fontFamily="var(--font-space-grotesk), sans-serif">{c}</text>
          );
        })}

        {/* rows */}
        {rows.map((r, i) => {
          const y = RY0 + i * RH;
          return (
            <g key={r.name}>
              <text x={20} y={y + RH / 2 - 2} fill="var(--color-ink)" fillOpacity={0.85} fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{r.name}</text>
              <text x={20} y={y + RH / 2 + 13} fill="var(--color-ink)" fillOpacity={0.45} fontSize="9.5">{r.sub}</text>
              {r.a.map((g, j) => {
                const x = LX + j * CW;
                return (
                  <g key={j}>
                    <rect x={x + 3} y={y + 3} width={CW - 6} height={RH - 8} rx={6}
                      fill={shade(g)} stroke="var(--accent-blue)" strokeOpacity={g ? 0.25 : 0.08} strokeWidth={1} />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* footnote on the two load-bearing columns */}
        <text x={LX} y={H - 14} fill="var(--color-ink)" fillOpacity={0.5} fontSize="9.5">
          SSTR2 → growth hormone · neuroendocrine tumors
        </text>
        <text x={LX} y={H - 2} fill="var(--color-ink)" fillOpacity={0.5} fontSize="9.5">
          SSTR5 → Cushing&rsquo;s disease — and beta-cell hyperglycemia
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The whole clinical difference between these drugs is the shading of two columns.
        Narrow to SSTR2 for acromegaly and tumors; add SSTR5 for Cushing&rsquo;s, and inherit
        its effect on blood sugar.
      </figcaption>
    </figure>
  );
}
