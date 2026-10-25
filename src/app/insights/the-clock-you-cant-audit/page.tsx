import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-clock-you-cant-audit")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What is Epitalon? The Telomerase & Longevity Claims, and the Evidence — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Clock You Can't Audit: Epitalon, Telomerase, and Single-Source Longevity Evidence · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  telomerase: "https://pubmed.ncbi.nlm.nih.gov/12937682/", // Khavinson et al. 2003, Bull Exp Biol Med — epitalon induces telomerase and telomere elongation in human fetal fibroblasts
  mice: "https://doi.org/10.1023/A:1025114230714", // Anisimov et al. 2003, Biogerontology — epitalon in SHR mice: no mean lifespan change, +max lifespan, fewer lymphomas
  human: "https://pubmed.ncbi.nlm.nih.gov/14523363/", // Khavinson & Morozov 2003, Neuroendocrinol Lett — 266 elderly, thymalin/epithalamin, lower mortality (non-randomized)
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is epitalon?",
    a: "Epitalon (also spelled epithalon) is a synthetic tetrapeptide — just four amino acids, Ala-Glu-Asp-Gly — promoted as an anti-ageing compound. It is the distilled, defined version of epithalamin, a crude peptide extract of the pineal gland developed by a St. Petersburg research school. The headline claim is unusually bold for so small a molecule: that it activates telomerase, the enzyme that rebuilds the protective caps on chromosomes, and thereby slows aspects of ageing. The mechanism is a pleasure to follow; the human evidence is thin and almost entirely single-source.",
  },
  {
    q: "Does epitalon actually lengthen telomeres?",
    a: "In a cell-culture study from the group that developed it, epitalon induced expression of telomerase's catalytic subunit, produced measurable telomerase activity, and was associated with telomere elongation in human fetal fibroblasts — cells that then kept dividing past the point where untreated controls stopped. That is a real in-vitro result. What it is not is proof that swallowing or injecting epitalon switches on telomerase systemically in a living person, or that doing so would be safe or beneficial. Telomerase activation is also a double-edged property: it is a feature of most cancers.",
  },
  {
    q: "Is there evidence epitalon extends lifespan?",
    a: "The lifespan data is almost entirely from one research network and is more modest than the marketing implies. In female mice, epitalon did not change mean lifespan; it raised maximum lifespan by about 12% and reduced the incidence of certain tumors. A human report followed 266 elderly people given pineal and thymic peptide extracts over several years and claimed lower mortality — but it was not a randomized, blinded, independently run trial, and no laboratory outside the originating school has replicated the lifespan findings.",
  },
  {
    q: "Why is the evidence for epitalon considered weak?",
    a: "Not because the mechanism is implausible, but because almost all of it comes from a single institute, the studies are mostly open-label or non-randomized, and the striking results have not been reproduced by independent groups. That is the structural problem: a claim is only as strong as the number of unrelated people who can check it. Epitalon's claims are large and the external audit is nearly absent — the opposite of a settled finding.",
  },
  {
    q: "How is epitalon related to cartalax and thymalin?",
    a: "They come from the same tradition — a St. Petersburg school that takes a tissue extract and tries to distill it to a short, defined peptide. Cartalax (from cartilage) and epitalon (from the pineal) are both that move: a 'white box' peptide pulled from a 'black box' extract. The pattern is consistent and the mechanistic stories are elegant, but so is the limitation: the supporting evidence tends to stay inside the network that produced it, which is exactly why each one needs the evidence read rather than the brochure.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(244,114,182,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/repair" className="text-accent-rose hover:text-ink">
                Repair &amp; regenerative
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
            <Section title="Four letters from the pineal gland">
              <P>
                <Link href="/hormones/epitalon" className={LINK}>Epitalon</Link> is four
                amino acids — Ala-Glu-Asp-Gly — and it carries one of the largest claims
                in peptide science: that so small a molecule can reach into a cell, switch
                on the enzyme that rebuilds the ends of its chromosomes, and bend the
                trajectory of ageing. It did not start as a designed drug. It started as
                epithalamin, a crude extract of the pineal gland — the brain&rsquo;s
                melatonin clock — boiled out of tissue by a St. Petersburg research school,
                then run down to a single defined tetrapeptide said to be the active core.
              </P>
              <P>
                That move should feel familiar. It is the same one behind{" "}
                <Link href="/insights/distilled-to-three-letters" className={LINK}>cartalax</Link>,
                a tripeptide distilled from cartilage, and it sits beside{" "}
                <Link href="/insights/two-ways-to-bottle-a-gland" className={LINK}>
                  thymalin and thymosin&nbsp;α1
                </Link>
                : take a tissue extract, find the shortest sequence that seems to do the
                work, and call it the signal. Epitalon is the pineal entry in that
                catalogue. The mechanism is a genuine pleasure to trace. The evidence is a
                room with one door, and that is the whole story. Bullish on the science,
                sceptical on the page.
              </P>
            </Section>

            <Section title="The claim: a tetrapeptide that winds the clock">
              <P>
                Every time a cell divides, the protective caps on its chromosomes — the
                telomeres — get a little shorter, and when they wear down the cell stops
                dividing. Telomerase is the enzyme that rebuilds them, and in most adult
                tissue it is switched off. The epitalon claim is that the peptide turns it
                back on. In a cell-culture study from the originating group, epitalon
                induced expression of telomerase&rsquo;s catalytic subunit, produced
                detectable enzyme activity, and lengthened telomeres in human fetal
                fibroblasts — cells that then kept dividing well past the passage where
                untreated controls gave out (
                <a href={REF.telomerase} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Khavinson et&nbsp;al., Bull&nbsp;Exp&nbsp;Biol&nbsp;Med, 2003
                </a>
                ).
              </P>
              <P>
                Read carefully, that is a real in-vitro result and a legitimately
                interesting one. Read as the marketing reads it, it becomes something the
                experiment never showed: that injecting four amino acids re-lengthens the
                telomeres of a living human being. The gap between &ldquo;induces
                telomerase in a fibroblast dish&rdquo; and &ldquo;slows your ageing&rdquo;
                is most of the distance that matters, and nothing in the cell study closes
                it. Telomerase activation is also not an unambiguously good thing to wish
                for — unregulated telomerase is one of the hallmarks of cancer, which is
                precisely why the body keeps the enzyme switched off in most tissues.
              </P>
            </Section>

            <Section title="The lifespan data, read honestly">
              <P>
                The animal evidence is where the claim meets a measurable endpoint, and it
                is more modest than the brochure. In female mice, epitalon did <Em>not</Em>{" "}
                change mean lifespan. It raised <Em>maximum</Em> lifespan by about 12% and
                lowered the incidence of certain tumors (
                <a href={REF.mice} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Anisimov et&nbsp;al., Biogerontology, 2003
                </a>
                ). Those are not nothing — a shift in maximum lifespan and a drop in
                malignancy is a result worth having — but &ldquo;did not change how long
                the average animal lived&rdquo; is not the sentence the longevity pages
                quote.
              </P>
              <P>
                The human claim is bolder and the evidence underneath it is softer. A
                report followed 266 elderly people given pineal and thymic peptide
                preparations over six to eight years and described mortality roughly
                1.6&ndash;1.8 times lower in the epithalamin group, and lower still in
                those given it together with the thymic extract (
                <a href={REF.human} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Khavinson &amp; Morozov, Neuroendocrinol&nbsp;Lett, 2003
                </a>
                ). A halving of mortality would be extraordinary if it held. But the study
                was not a randomized, blinded, independently run trial, and — the decisive
                point — no laboratory outside the originating network has reproduced the
                lifespan results at all.
              </P>
              <Callout label="Maximum is not mean">
                Watch which lifespan number a longevity claim is quoting. &ldquo;Lived
                longer&rdquo; usually means the average animal lived longer (mean lifespan).
                Epitalon&rsquo;s mouse data moved the <em>maximum</em> — the tail — while
                leaving the mean flat. A tail effect plus fewer tumors is a real, narrow
                finding. It is not the sweeping anti-ageing result the word &ldquo;lifespan&rdquo;
                is doing the work of implying.
              </Callout>
            </Section>

            <Section title="The structural problem: one door in">
              <P>
                The weakness here is not that the mechanism is absurd — telomere biology is
                real, and a small peptide influencing gene expression is not fantasy. The
                weakness is structural. Almost every result, from the telomerase dish to
                the mouse tumors to the human mortality curve, traces back to a single
                research school and its collaborators. The studies tend to be open-label or
                non-randomized. And the striking findings have not been independently
                replicated by groups with no stake in the outcome.
              </P>
              <P>
                A scientific claim is only as trustworthy as the number of unrelated people
                who can check it and get the same answer. That is the entire point of
                replication: it is the audit. Epitalon&rsquo;s claims are large and the
                external audit is close to absent — the findings and the people who
                produced them occupy the same room. That does not make the results false.
                It makes them <Em>unaudited</Em>, which is a different and more honest word
                than either &ldquo;proven&rdquo; or &ldquo;debunked.&rdquo;
              </P>
              <AuditDiagram />
            </Section>

            <Section title="How to hold it">
              <P>
                Epitalon is best understood as a sincere, elegant hypothesis that has not
                been allowed out of its own building. The pineal-extract lineage is a real
                scientific tradition with real peptides in it; the telomerase result is a
                real experiment; the mouse tumor data is a real, narrow effect. Stacked
                against that is the absence of the one thing that turns an interesting
                claim into a reliable one — independent replication — plus a mechanism
                (telomerase induction) whose upside and its most feared downside are the
                same molecular event.
              </P>
              <Bullets
                items={[
                  ["A defined peptide from a tissue extract", "Epitalon (Ala-Glu-Asp-Gly) is the distilled version of epithalamin, a crude pineal extract — the same 'white box from a black box' move as cartalax and thymalin."],
                  ["The telomerase result is real but in vitro", "It induced telomerase and lengthened telomeres in cultured human fibroblasts. That does not establish systemic telomerase activation in people — and telomerase is also a hallmark of cancer."],
                  ["The mouse data moved maximum, not mean, lifespan", "Epitalon left average lifespan unchanged in mice; it raised maximum lifespan ~12% and cut some tumors. A narrow effect, not the sweeping claim."],
                  ["The human mortality claim is non-randomized and single-source", "The 266-person report is not a blinded, independently run trial, and no outside lab has replicated the lifespan findings."],
                  ["Unaudited, not proven or debunked", "The honest verdict: an elegant mechanism and bold claims that have never left the network that produced them. Read the evidence grade, not the brochure."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/epitalon" label="Epitalon reference (the pineal tetrapeptide)" />
                <CrossLink href="/insights/distilled-to-three-letters" label="Distilled to three letters — cartalax, the same lineage" />
                <CrossLink href="/insights/two-ways-to-bottle-a-gland" label="Two ways to bottle a gland — thymalin vs thymosin α1" />
                <CrossLink href="/families/repair" label="The repair & regenerative family" />
                <CrossLink href="/methodology" label="How this site grades evidence" />
                <CrossLink href="/research?q=What%20is%20actually%20established%20about%20epitalon%27s%20telomerase%20and%20longevity%20claims%2C%20and%20how%20much%20of%20the%20evidence%20is%20independently%20replicated%3F" label="Ask the research agent about epitalon's evidence" />
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

/* ── Claim size vs independent audit — where epitalon sits ── */
function AuditDiagram() {
  const W = 700;
  const H = 300;
  const X0 = 96;
  const X1 = 650;
  const Y0 = 250;
  const YT = 60;

  const px = (t: number) => X0 + t * (X1 - X0);
  const py = (t: number) => Y0 - t * (Y0 - YT);

  // Reference points: [independentAudit (x), claimSize (y), label, highlight]
  const pts: [number, number, string, boolean][] = [
    [0.12, 0.9, "epitalon", true],
    [0.82, 0.86, "telomerase (established field)", false],
    [0.9, 0.45, "metreleptin", false],
    [0.3, 0.3, "cartalax", false],
  ];

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="A scatter plot. The horizontal axis is how much independent replication a claim has, from little on the left to extensive on the right. The vertical axis is how large the claim is, from modest at the bottom to sweeping at the top. Epitalon sits at the top left: a sweeping claim with little independent audit. Established telomere biology sits top right: a large, well-replicated body of work. The danger zone is the top-left corner where big claims meet thin external checking."
      >
        <text x={W / 2} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Size of the claim vs. independent audit
        </text>

        {/* danger-zone shading: top-left */}
        <rect x={X0} y={YT} width={(X1 - X0) * 0.42} height={(Y0 - YT) * 0.5} fill="color-mix(in srgb, var(--accent-rose) 9%, transparent)" />
        <text x={X0 + 10} y={YT + 18} fill="var(--accent-rose)" fillOpacity={0.75} fontSize="9.5" fontWeight="600">big claim · little external check</text>

        {/* axes */}
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="var(--color-ink)" strokeOpacity={0.18} strokeWidth={1} />
        <line x1={X0} y1={Y0} x2={X0} y2={YT - 4} stroke="var(--color-ink)" strokeOpacity={0.18} strokeWidth={1} />
        <text x={X1} y={Y0 + 18} textAnchor="end" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10">independent replication →</text>
        <text x={X0 - 8} y={YT - 8} textAnchor="start" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10">↑ size of claim</text>

        {pts.map(([x, y, label, hl], i) => (
          <g key={i}>
            <circle cx={px(x)} cy={py(y)} r={hl ? 7 : 5}
              fill={hl ? "var(--accent-rose)" : "color-mix(in srgb, var(--color-ink) 30%, transparent)"}
              stroke={hl ? "var(--accent-rose)" : "var(--color-ink)"} strokeOpacity={hl ? 0.9 : 0.3} strokeWidth={1.2} />
            <text x={px(x) + (x > 0.6 ? -10 : 12)} y={py(y) + 4} textAnchor={x > 0.6 ? "end" : "start"}
              fill={hl ? "var(--color-ink)" : "var(--color-ink)"} fillOpacity={hl ? 0.9 : 0.5}
              fontSize={hl ? "11.5" : "10"} fontWeight={hl ? "700" : "500"}>{label}</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Epitalon&rsquo;s problem isn&rsquo;t the size of its claim — it&rsquo;s that the
        claim lives in the corner where little of it has been checked by anyone outside the
        group that made it.
      </figcaption>
    </figure>
  );
}
