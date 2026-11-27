import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("a-mechanism-in-search-of-a-disease")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What Is Elamipretide (SS-31)? The Cardiolipin-Stabilizing Peptide, Its Failed Trials, and Barth Syndrome — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each evidence grade stays checkable.
const REF = {
  mechanism: "https://pubmed.ncbi.nlm.nih.gov/30381054/", // Szeto — Protein Pept Lett 2018: stealth peptides target cardiolipin, improve ETC
  binding: "https://pubmed.ncbi.nlm.nih.gov/32273339/", // Mitchell et al. — J Biol Chem 2020: SS-31 binds lipid bilayers, mechanism of action
  mmpower3: "https://pubmed.ncbi.nlm.nih.gov/37268435/", // Karaa et al. — Neurology 2023: MMPOWER-3, did not meet primary endpoints
  reclaim2: "https://pubmed.ncbi.nlm.nih.gov/39605874/", // Ehlers et al. — Ophthalmol Sci 2025: ReCLAIM-2, primary endpoints not met
  tazpower: "https://pubmed.ncbi.nlm.nih.gov/38602181/", // Thompson et al. — Genet Med 2024: TAZPOWER 168-week open-label extension, Barth syndrome
  barthBio: "https://pubmed.ncbi.nlm.nih.gov/34626131/", // Ji & Greenberg — J Inherit Metab Dis 2022: TAZ/cardiolipin and Barth syndrome
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd() and mirrored in the visible block.
const FAQS = [
  {
    q: "What is elamipretide (SS-31)?",
    a: "Elamipretide, also called SS-31, is a synthetic four-amino-acid 'Szeto-Schiller' peptide that concentrates in the inner membrane of mitochondria and binds cardiolipin — the lipid that organizes the folded cristae where cells make energy. By stabilizing cardiolipin it is thought to help the electron transport chain run more efficiently. It is a mitochondria-targeting peptide, not a mitochondrial-derived hormone.",
  },
  {
    q: "Did elamipretide work for mitochondrial myopathy?",
    a: "No, not in its pivotal trial. The phase 3 MMPOWER-3 trial in primary mitochondrial myopathy did not meet its primary endpoints: there was essentially no difference from placebo in six-minute walk distance (about -3 metres) or in fatigue over 24 weeks. A strong mechanism did not translate into a measurable benefit in that broad indication.",
  },
  {
    q: "What is elamipretide approved for?",
    a: "For Barth syndrome, a rare inherited disorder. Barth is caused by mutations in the TAZ gene that disrupt cardiolipin remodeling — so it is, at the molecular level, a cardiolipin disease, which is precisely the lipid elamipretide stabilizes. Its broader trials in mitochondrial myopathy and dry age-related macular degeneration did not meet their primary endpoints.",
  },
  {
    q: "How strong is the evidence in Barth syndrome?",
    a: "It is promising but limited and mechanism-weighted. The most cited supportive data is a 168-week open-label extension in ten patients, showing sustained improvement in walking distance and in the cardiolipin ratio — but open-label, without a concurrent placebo group. Barth is rare enough that a large controlled trial is extremely hard to run, so the approval rests heavily on mechanistic fit plus uncontrolled improvement.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(94,168,250,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/mitochondrial" className="text-accent-blue hover:text-ink">
                Mitochondrial biology · targeted peptides
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
            <Section title="An almost too-elegant mechanism">
              <P>
                <Link href="/hormones/ss-31" className={LINK}>Elamipretide</Link> — also known
                as SS-31 — is a synthetic peptide only four residues long, from the
                Szeto-Schiller family of mitochondria-targeting compounds. It does something
                unusual for so small a molecule: it concentrates in the <Em>inner membrane</Em>
                of the mitochondrion and binds <Em>cardiolipin</Em>, the distinctive lipid that
                shapes the tightly folded cristae where the electron transport chain is packed.
                By stabilizing cardiolipin it is thought to keep that machinery organized and
                running, so the cell makes ATP more efficiently (
                <a href={REF.mechanism} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Szeto, Protein&nbsp;Pept&nbsp;Lett, 2018
                </a>
                ;{" "}
                <a href={REF.binding} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Mitchell et&nbsp;al., J&nbsp;Biol&nbsp;Chem, 2020
                </a>
                ).
              </P>
              <P>
                It is the kind of mechanism that makes a molecule look unstoppable on paper.
                Cardiolipin sits at the heart of mitochondrial energy production; mitochondrial
                dysfunction turns up in a sprawling list of diseases, from rare genetic
                myopathies to heart failure to the aging eye. A drug that props up the power
                plant should, the reasoning goes, help wherever the power plant is failing. In
                preclinical models it did exactly the encouraging things — repairing damaged
                mitochondria across a range of injuries. The trouble, as this reference keeps
                finding, is that <Link href="/insights/mechanism-is-not-proof" className={LINK}>
                a mechanism is not a result
                </Link>
                .
              </P>
            </Section>

            <Section title="So they tried it almost everywhere">
              <P>
                And for about a decade, elamipretide was carried from indication to indication
                on the strength of that mechanism. The two biggest controlled tests did not
                cooperate. In <Em>primary mitochondrial myopathy</Em> — the disease class where
                a mitochondrial drug has the most obvious rationale — the phase 3 MMPOWER-3 trial
                enrolled 218 patients and came back flat: no significant difference from placebo
                in six-minute walk distance (a difference of about −3&nbsp;metres) or in fatigue
                over 24 weeks. The trial <Em>did not meet its primary endpoints</Em> (
                <a href={REF.mmpower3} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Karaa et&nbsp;al., Neurology, 2023
                </a>
                ).
              </P>
              <P>
                In <Em>dry age-related macular degeneration</Em> — the retina being one of the
                most energy-hungry tissues in the body — the phase 2 ReCLAIM-2 trial likewise{" "}
                <Em>did not meet its primary endpoints</Em> (
                <a href={REF.reclaim2} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ehlers et&nbsp;al., Ophthalmol&nbsp;Sci, 2025
                </a>
                ), though it left a secondary signal — a slowing of ellipsoid-zone
                degeneration — that its developers carried forward as the endpoint for a later
                program. The pattern was the same each time: a broad-spectrum mitochondrial
                fixer that did not, in a rigorous trial, fix the broad indication.
              </P>
              <IndicationFigure />
            </Section>

            <Section title="The disease shaped like the drug">
              <P>
                Where elamipretide finally found a foothold is the one place its mechanism stops
                being a general hope and becomes a precise match. <Em>Barth syndrome</Em> is a
                rare, X-linked disorder caused by mutations in the <Em>TAZ</Em> (tafazzin) gene —
                and tafazzin&rsquo;s job is to <Em>remodel cardiolipin</Em>. Break it and the
                cell&rsquo;s cardiolipin is abnormal and unstable, which is why Barth is, at the
                molecular level, a cardiolipin disease (
                <a href={REF.barthBio} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Ji &amp; Greenberg, J&nbsp;Inherit&nbsp;Metab&nbsp;Dis, 2022
                </a>
                ).
              </P>
              <P>
                Line that up with the drug and the fit is almost uncanny: elamipretide is a{" "}
                <Em>cardiolipin stabilizer</Em>, and Barth is a <Em>cardiolipin defect</Em>.
                The same mechanism that was a vague promise across myopathy and the retina is,
                here, aimed directly at the molecule the disease gets wrong. Of all the doors it
                tried, the one it fit was the lock cut to its exact shape.
              </P>
            </Section>

            <Section title="And the evidence is the honest part">
              <P>
                This is where the story earns its keep. The supportive data in Barth is real but
                <Em> mechanism-weighted</Em>, not trial-weighted. The most-cited result is a
                168-week <Em>open-label extension</Em> of the TAZPOWER study in just ten
                patients: sustained improvement in six-minute walk distance (a cumulative gain of
                about 96&nbsp;metres), lower fatigue, improving cardiac measures, and a better
                monolysocardiolipin-to-cardiolipin ratio — the biochemical fingerprint of the
                disease (
                <a href={REF.tazpower} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Thompson et&nbsp;al., Genet&nbsp;Med, 2024
                </a>
                ). Encouraging — but open-label, with no concurrent placebo group, in a handful
                of people.
              </P>
              <P>
                That is not a knock; it is the nature of the disease. Barth is rare enough that
                the large, clean, placebo-controlled trial you would want is nearly impossible to
                run. So elamipretide reached <Em>approval for Barth syndrome</Em> on an evidence
                base that is as much about mechanistic fit and uncontrolled improvement as about
                a decisive controlled win — a legitimate but different bar, and one worth naming
                plainly rather than rounding up to &ldquo;proven.&rdquo;
              </P>
              <Callout label="The shape of the lesson">
                A mechanism this clean reads like a guarantee, and for a decade it was treated as
                one. The molecule didn&rsquo;t fail because the biology was wrong — the biology is
                lovely. It narrowed because efficacy, not elegance, is the test, and it passed
                that test only where the disease&rsquo;s defect <Em>was</Em> its mechanism. Even
                there, the evidence is honest about what it is.
              </Callout>
              <Bullets
                items={[
                  [
                    "The mechanism",
                    "A four-residue peptide that binds and stabilizes cardiolipin in the inner mitochondrial membrane — elegant, and preclinically broad.",
                  ],
                  [
                    "The failures",
                    "Primary mitochondrial myopathy (MMPOWER-3) and dry AMD (ReCLAIM-2) both missed their primary endpoints.",
                  ],
                  [
                    "The fit",
                    "Barth syndrome is a cardiolipin-remodeling defect (TAZ) — the one disease whose molecular problem is exactly what the drug targets.",
                  ],
                  [
                    "The evidence",
                    "Approval rests largely on a ten-patient open-label extension plus mechanistic fit — promising, uncontrolled, and rare-disease-constrained.",
                  ],
                ]}
              />
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
                <CrossLink href="/hormones/ss-31" label="Elamipretide (SS-31) — in the catalog" />
                <CrossLink href="/insights/slu-pp-332-vs-bam15" label="SLU-PP-332 vs BAM15 — other mitochondrial bets" />
                <CrossLink href="/insights/the-peptide-exercise-writes" label="The peptide exercise writes — MOTS-c" />
                <CrossLink href="/insights/asking-the-cells-that-didnt-die" label="Asking the cells that didn't die — humanin" />
                <CrossLink href="/insights/mechanism-is-not-proof" label="Mechanism is not proof — the evidence ladder" />
                <CrossLink href="/families/mitochondrial" label="The mitochondrial-biology family" />
                <CrossLink
                  href="/research?q=How%20does%20elamipretide%20(SS-31)%20stabilize%20cardiolipin%2C%20why%20did%20MMPOWER-3%20and%20ReCLAIM-2%20miss%20their%20primary%20endpoints%2C%20and%20how%20strong%20is%20the%20evidence%20in%20Barth%20syndrome%3F"
                  label="Ask the research agent about elamipretide"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized and
              simplified from the public record. Not individualized medical advice or a
              prescription. Regulatory status varies by jurisdiction; elamipretide&rsquo;s
              approval is for Barth syndrome, and its trials in other indications did not meet
              their primary endpoints. Verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── One mechanism, many doors, one fit ── */
function IndicationFigure() {
  const rows: { label: string; sub: string; verdict: "miss" | "fit" }[] = [
    { label: "Primary mitochondrial myopathy", sub: "MMPOWER-3 · phase 3", verdict: "miss" },
    { label: "Dry AMD / geographic atrophy", sub: "ReCLAIM-2 · phase 2", verdict: "miss" },
    { label: "Barth syndrome", sub: "a cardiolipin (TAZ) defect", verdict: "fit" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5">
      <div className="text-center font-mono text-[11px] uppercase tracking-wide text-ink/45">
        One mechanism: stabilize cardiolipin
      </div>
      <div className="mx-auto mt-1 h-4 w-px bg-ink/15" aria-hidden />
      <ul className="space-y-2.5">
        {rows.map((r) => {
          const fit = r.verdict === "fit";
          return (
            <li
              key={r.label}
              className={
                "flex items-center gap-3 rounded-xl border px-4 py-3 " +
                (fit
                  ? "border-accent-teal/40 bg-accent-teal/[0.07]"
                  : "border-ink/10 bg-panel/30")
              }
            >
              <span
                className={
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[13px] font-semibold " +
                  (fit ? "bg-accent-teal/15 text-accent-teal" : "bg-ink/[0.06] text-ink/40")
                }
                aria-hidden
              >
                {fit ? "✓" : "✕"}
              </span>
              <span className="min-w-0">
                <span className={"font-display text-[15px] font-semibold " + (fit ? "text-ink" : "text-ink/70")}>
                  {r.label}
                </span>
                <span className="block font-mono text-[11px] text-ink/45">{r.sub}</span>
              </span>
              <span className={"ml-auto shrink-0 text-xs " + (fit ? "text-accent-teal" : "text-ink/40")}>
                {fit ? "the mechanistic match" : "primary endpoint not met"}
              </span>
            </li>
          );
        })}
      </ul>
      <figcaption className="mt-3 text-center text-xs text-ink/40">
        A broad mitochondrial mechanism that missed its two big controlled trials, and found its foothold in the one disease
        whose molecular defect is cardiolipin itself — the lipid the drug stabilizes.
      </figcaption>
    </figure>
  );
}
