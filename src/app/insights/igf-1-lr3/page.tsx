import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("igf-1-lr3")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "IGF-1 LR3: Structure, Half-Life & Evidence — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each evidence grade stays checkable.
const REF = {
  // Manufacturer analytical characterization (structure/sequence only; the
  // datasheet's own half-life gloss is the shorthand this piece corrects).
  lr3struct: "https://resources.rndsystems.com/pdfs/datasheets/8335d-gmp.pdf",
  // IGFBP biology — the buffer that clears IGF-1 within minutes when unbound.
  igfbp: "https://pubmed.ncbi.nlm.nih.gov/29255001/",
  // Increlex (mecasermin) — FDA prescribing information.
  increlex: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/021839s033lbl.pdf",
  // Prostate cancer IGF-I individual-participant meta-analysis, Cancer Res 2016.
  prostate: "https://pubmed.ncbi.nlm.nih.gov/26921328/",
  // IGF-1 and morbidity/mortality, EPIC-Heidelberg, JCEM 2023.
  epic: "https://pubmed.ncbi.nlm.nih.gov/37066827/",
  // WADA Prohibited List (S2), current edition.
  wada: "https://www.wada-ama.org/en/prohibited-list",
} as const;

// FAQ — surfaced as FAQPage JSON-LD and mirrored in the visible Q&A block.
const FAQS = [
  {
    q: "Does IGF-1 LR3 last longer because it avoids the binding proteins?",
    a: "No — this is the most common error in write-ups. For native IGF-1, being bound to IGFBP-3 and the acid-labile subunit is exactly what extends its circulating half-life to roughly 12–16 hours; the small free fraction clears in about 10–15 minutes. LR3 was engineered to evade those binding proteins, so on that axis it should behave more like free IGF-1 — cleared quickly, not slowly. Whatever longer activity it shows is attributed to protease resistance from its N-terminal extension, not to being unbound. There is no published human pharmacokinetic study, so the specific '20–30 hour' or '56–72 hour' figures quoted online are not human measurements.",
  },
  {
    q: "What is the molecular weight of IGF-1 LR3, and why does it matter?",
    a: "About 9,100 Da (commonly cited as ~9,111 Da), versus roughly 7,649 Da for native IGF-1, because LR3 adds a 13-residue N-terminal extension plus one substitution to reach 83 amino acids. It matters for any mass-to-mole or reconstitution-concentration arithmetic: LR3 is heavier, so a given mass is fewer moles. Any calculation has to use ~9,100 Da, not IGF-1's ~7,649 Da.",
  },
  {
    q: "Is there human clinical evidence for IGF-1 LR3?",
    a: "There are no controlled human trials of IGF-1 LR3. The closest anchor is mecasermin (Increlex), FDA-approved recombinant human IGF-1 for severe primary IGF-1 deficiency — the same core molecule acting on the same receptor. Its label documents hypoglycemia, tonsillar/lymphoid hypertrophy, intracranial hypertension, systemic hypersensitivity, and a contraindication in active or suspected malignancy. That label is the best-characterized window we have into what sustained IGF-1R agonism does in humans.",
  },
  {
    q: "Is IGF-1 LR3 legal, or allowed in sport?",
    a: "It is sold as a research chemical — unapproved for human use, which is not the same as unregulated; distribution for human consumption is not lawful. In sport it is prohibited at all times under WADA category S2 (peptide hormones, growth factors and mimetics); IGF-1 and its analogs are named there, as is MGF, with no in- or out-of-competition distinction. The 2026 Prohibited List took effect January 1, 2026.",
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
            <Section title="A reference, tagged by evidence tier">
              <P>
                IGF-1 LR3 is a well-defined molecule with a poorly-defined human
                profile. This piece separates the two. It covers what the molecule is
                and how it behaves; it does <Em>not</Em> describe how to administer it,
                because there is no approved human dosing for any performance or
                body-composition use, and none is implied here.
              </P>
              <P>
                Every claim below is tagged by evidence tier, so you can see exactly
                where a statement comes from &ndash; settled biochemistry, human clinical
                data, animal or cell-culture work, or community report. The tiers grade{" "}
                <Em>provenance</Em>, not confidence: a well-replicated rodent study is
                still preclinical.
              </P>
              <GradeLegend />
            </Section>

            <Section title="What the molecule actually is">
              <P>
                IGF-1 LR3 is short for Long [Arg&sup3;] Insulin-like Growth Factor-1,
                and the full name is worth unpacking, because each half names a distinct
                modification. Native human{" "}
                <Link href="/hormones/igf-1" className={LINK}>IGF-1</Link> is a
                70-amino-acid single-chain protein of roughly 7,649 Da, folded and held
                together by three intramolecular disulfide bonds. LR3 makes two changes
                to it. <Grade g="reference" />
              </P>
              <Bullets
                items={[
                  ["The “R3” (Arg³)", "Glutamic acid at position 3 is replaced by arginine. Position 3 sits inside the region that contacts the IGF-binding proteins, so swapping an acidic residue for a basic one disrupts that interaction — cutting IGFBP affinity by roughly 100-fold while preserving high-affinity binding to the IGF-1 receptor (IGF-1R)."],
                  ["The “Long”", "A 13-residue extension is added to the N-terminus (a sequence derived from methionyl porcine growth hormone). It is the half of the name that most write-ups forget."],
                ]}
              />
              <StructureFigure />
              <P>
                The result is an 83-amino-acid protein of approximately 9,100 Da &ndash;
                commonly cited as ~9,111 Da, with some references giving ~9,117 Da
                depending on calculation method &ndash; with the native disulfide bridges
                preserved (
                <a href={REF.lr3struct} target="_blank" rel="noopener noreferrer" className={LINK}>
                  manufacturer characterization
                </a>
                ; the analog was first described by Francis and colleagues at GroPep).{" "}
                <Grade g="reference" />
              </P>
              <P>
                That molecular weight is not trivia &ndash; it is the number every unit
                conversion depends on. Because LR3 is heavier than native IGF-1, a given
                mass corresponds to fewer moles, and any microgram-to-nanomole or
                reconstitution-concentration calculation has to use ~9,100 Da, not
                IGF-1&rsquo;s ~7,649 Da. Our{" "}
                <Link href="/tools/half-life" className={LINK}>
                  half-life &amp; dosing calculator
                </Link>{" "}
                carries the correct molar mass for that arithmetic.
              </P>
              <Callout label="A common naming error">
                LR3 is sometimes described as differing from IGF-1 only by
                &ldquo;the R3 substitution.&rdquo; That accounts for one of the two
                modifications and omits the entire N-terminal extension &ndash; the part
                that gives the molecule its name, and much of its behavior.
              </Callout>
            </Section>

            <Section title="The half-life question, usually stated backwards">
              <P>
                This is where most write-ups go wrong, so it is worth walking carefully.
                In the body, the overwhelming majority of IGF-1 &ndash; on the order of
                97&ndash;99% &ndash; does not circulate freely. It is captured in a large
                ternary complex with IGFBP-3 and the acid-labile subunit (ALS). That
                complex is too big to leave the bloodstream easily, and it shields IGF-1
                from degradation and clearance. This is why endogenous IGF-1 has a
                circulating half-life measured in hours &ndash; roughly 12&ndash;16 h
                &ndash; while the small free fraction clears in about 10&ndash;15 minutes (
                <a href={REF.igfbp} target="_blank" rel="noopener noreferrer" className={LINK}>
                  IGFBP biology
                </a>
                ). <Grade g="reference" />
              </P>
              <P>
                So binding to the IGFBPs is the <Em>primary half-life&ndash;extending
                mechanism</Em> for IGF-1. Hold that thought, because it is the crux.
              </P>
              <HalfLifeFigure />
              <P>
                LR3 was engineered specifically to evade the IGFBPs. Taken on its own,
                that should make LR3 behave more like <Em>free</Em> IGF-1 &ndash; which
                is to say it should shorten circulating persistence, not lengthen it. The
                frequent claim that reduced IGFBP binding &ldquo;keeps more peptide free
                and therefore extends the half-life&rdquo; has the causation reversed:
                being free is the fast-clearance state, not the slow one.
              </P>
              <P>
                Whatever extended activity LR3 does show is better attributed to two
                things that are not a slower clearance: the N-terminal extension adds
                some resistance to proteases (against N-terminal aminopeptidases), and
                in the cell-culture assays most &ldquo;duration&rdquo; figures come from,
                simply evading the IGFBPs leaves more active peptide in play. Being
                unbound is not, by itself, a slow-clearance state. <Grade g="preclinical" />
              </P>
              <P>
                And the headline numbers deserve a hard flag. The widely repeated figures
                &ndash; a &ldquo;20&ndash;30 hour half-life,&rdquo; or the
                &ldquo;56&ndash;72 hours&rdquo; that appears on some reference pages
                &ndash; have no published human pharmacokinetic study behind them. They
                trace back to animal models and to how long the molecule stays bioactive
                in cell culture, then get repeated across vendor pages as if they were
                human PK. There is no human PK dataset for IGF-1 LR3.{" "}
                <Grade g="community" /> <Grade g="preclinical" />
              </P>
              <Callout label="The honest version">
                LR3 is more protease-stable than free native IGF-1, and it evades the
                binding proteins that normally sequester IGF-1. Its true human half-life
                is unknown, and the specific durations quoted online are not human
                measurements. If you take one correction from this piece: evading the
                binding proteins does not, by itself, lengthen IGF-1&rsquo;s half-life
                &mdash; it shortens it.
              </Callout>
            </Section>

            <Section title="The closest thing to clinical evidence: mecasermin">
              <P>
                There are no controlled human trials of IGF-1 LR3. But that is a fact
                about LR3 specifically, not about IGF-1 as a class &ndash; and the
                distinction is the single most useful anchor available. Recombinant human
                IGF-1 (mecasermin) is FDA-approved and marketed as Increlex, for severe
                primary IGF-1 deficiency. It has a real label, real trials, and a
                documented adverse-event profile. LR3 is a modified analog of the same
                core molecule acting on the same receptor, so mecasermin&rsquo;s label is
                the best-characterized window we have into what sustained IGF-1R agonism
                does in humans (
                <a href={REF.increlex} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Increlex prescribing information
                </a>
                ). <Grade g="clinical" />
              </P>
              <Bullets
                items={[
                  ["Hypoglycemia", "The most common and most immediate risk, given IGF-1's insulin-like activity. A reported acute-overdose case produced hypoglycemia that resolved with IV glucose."],
                  ["Tonsillar / lymphoid hypertrophy", "Enlargement of the tonsils and adenoids."],
                  ["Soft-tissue and skeletal effects", "Thickening of the soft tissues of the face is monitored during treatment; long-term overdosage is described as producing signs and symptoms of acromegaly. Intracranial hypertension and slipped capital femoral epiphysis are recognized in the pediatric IGF-1 literature."],
                  ["Systemic hypersensitivity", "Including anaphylaxis, generalized urticaria, and angioedema — post-marketing anaphylaxis frequency estimated around 0.3% — plus local injection-site reactions."],
                  ["A malignancy contraindication", "The label bars use in patients with active or suspected malignancy, or a history of it."],
                ]}
              />
              <P>
                That last point deserves emphasis, because it connects directly to the
                concern most write-ups hand-wave.
              </P>
            </Section>

            <Section title="The cancer question is not “theoretical”">
              <P>
                Calling IGF-1&rsquo;s cancer relationship &ldquo;theoretical&rdquo;
                understates it. There is a substantial body of prospective observational
                data linking higher circulating IGF-1 to cancer risk. A pooled
                individual-participant meta-analysis (up to ~10,554 cases) found IGF-1
                positively associated with prostate cancer risk &ndash; an odds ratio
                around 1.29 for the highest versus lowest fifth of IGF-1 in prospective
                studies (
                <a href={REF.prostate} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Cancer Research, 2016
                </a>
                ) &ndash; and associations have been reported for breast and colorectal
                cancers as well (
                <a href={REF.epic} target="_blank" rel="noopener noreferrer" className={LINK}>
                  EPIC-Heidelberg, JCEM 2023
                </a>
                ). <Grade g="clinical" />
              </P>
              <Callout label="The defensible framing">
                Elevated circulating IGF-1 is associated with increased risk of several
                cancers in observational human data, and the approved IGF-1 product
                carries a neoplasia contraindication; whether exogenous IGF-1
                administration <Em>causes</Em> cancer is not established. That is stronger
                than &ldquo;theoretical&rdquo; and more honest than a causal claim &ndash;
                and it is why a long-acting, systemically active IGF-1R agonist raises
                flags that a short local pulse would not.
              </Callout>
            </Section>

            <Section title="Why “site-specific growth” doesn’t hold up">
              <P>
                A persistent idea is that injecting LR3 near a target muscle concentrates
                its effect there. The pharmacology argues against it: the IGFBP-evading
                design and systemic distribution mean LR3 acts as a whole-body growth
                signal, not a local one. <Grade g="reference" /> <Grade g="preclinical" />
              </P>
              <P>
                The compound usually invoked for genuinely local action is{" "}
                <Link href="/hormones/mgf" className={LINK}>MGF</Link> (mechano growth
                factor) &ndash; but it is worth being precise about what MGF is and
                isn&rsquo;t. MGF is not a &ldquo;cousin&rdquo;; it is a splice variant of
                the same IGF-1 gene (the IGF-1Ec isoform), whose distinguishing E-domain
                peptide is what people mean by &ldquo;MGF.&rdquo; And its evidence base is
                weaker, not stronger: the E-domain peptide&rsquo;s receptor has not been
                definitively identified, and synthetic MGF is rapidly degraded in
                circulation. Pointing from a thin-evidence compound to a thinner-evidence
                one isn&rsquo;t an upgrade. The full accelerator story &ndash; systemic
                IGF-1, the local pulse, and the analogs built to push it &ndash; is in{" "}
                <Link href="/insights/the-other-pedal" className={LINK}>
                  the other pedal
                </Link>
                . <Grade g="reference" /> <Grade g="community" />
              </P>
            </Section>

            <Section title="Regulatory and anti-doping status">
              <Bullets
                items={[
                  ["Not approved for any performance or body-composition use", "IGF-1 LR3 is sold as a research chemical: unapproved for human use, which is different from unregulated. Distribution for human consumption is not lawful, and it is properly labeled for laboratory research use only."],
                  ["WADA-prohibited at all times", "IGF-1 and its analogs fall under category S2 (peptide hormones, growth factors, related substances and mimetics) of the WADA Prohibited List — banned both in- and out-of-competition, with no off-season window. MGF is named in the same category. The 2026 Prohibited List took effect January 1, 2026."],
                ]}
              />
              <P>
                Both points are settled regulatory fact (
                <a href={REF.wada} target="_blank" rel="noopener noreferrer" className={LINK}>
                  WADA Prohibited List
                </a>
                ). <Grade g="reference" />
              </P>
            </Section>

            <Section title="Sourcing: what a certificate of analysis has to prove">
              <P>
                Because this is an unregulated-for-purpose research compound, purity and
                identity can&rsquo;t be eyeballed &ndash; and for a folded,
                disulfide-bonded protein, the usual &ldquo;99% by HPLC&rdquo; line is
                necessary but not sufficient. The failure modes that matter here are
                specific, and they sit higher on the complexity ladder than a short
                synthetic peptide (
                <Link href="/insights/the-complexity-ladder" className={LINK}>
                  where trust starts to mean something
                </Link>
                ). <Grade g="reference" />
              </P>
              <Bullets
                items={[
                  ["Intact mass by ESI-MS", "Specifically to distinguish LR3 (~9,100 Da) from native IGF-1 (~7,649 Da) and from N-terminally truncated species. Substitution of a cheaper or truncated molecule is a real risk, and mass spec is what catches it."],
                  ["Correct disulfide folding", "LR3 carries three disulfide bonds, and misfolded disulfide isomers are mass-identical to correctly folded material — mass spec alone won't distinguish them, and RP-HPLC may or may not resolve them depending on method. The only assay that actually confirms the molecule is folded and functional is a cell-based bioactivity assay."],
                  ["Endotoxin (LAL)", "For anything intended for injection in a research setting, bacterial endotoxin is arguably more consequential than the purity percentage — and it is routinely omitted from vendor COAs."],
                  ["Chain of custody", "An accredited third-party lab, with a lot number on the COA that reconciles to the number on the vial."],
                ]}
              />
              <P>
                Two cautions worth stating plainly. First, water and residual-solvent
                content is a legitimate line item but a distant priority next to identity,
                folding, and endotoxin &ndash; don&rsquo;t let a tidy-looking moisture
                figure stand in for the assays that matter. Second, a vendor-supplied
                chromatogram is trivially fabricated; an unaccredited PDF with no
                reconcilable lot number is a marketing asset, not evidence. Provenance is
                the whole point &ndash; the same standard we apply across{" "}
                <Link href="/methodology" className={LINK}>the methodology</Link>.{" "}
                <Grade g="reference" />
              </P>
            </Section>

            <Section title="The bottom line">
              <P>
                IGF-1 LR3 is a well-defined molecule with a poorly-defined human profile.
                What&rsquo;s solid is the biochemistry: an 83-residue, ~9,100 Da IGF-1
                analog that evades the binding proteins and preserves IGF-1R activity.
                What&rsquo;s not solid is almost everything downstream in humans &ndash;
                its true half-life, its dose-response, its long-term safety &ndash; none
                of which has been established in controlled human study.
              </P>
              <P>
                The most reliable read on its likely effects comes from the approved IGF-1
                product&rsquo;s label and from the observational IGF-1/cancer literature,
                and both counsel caution rather than confidence. And the one correction to
                carry away is mechanical, not moral: evading the binding proteins does not,
                by itself, lengthen IGF-1&rsquo;s half-life &ndash; it shortens it. Any
                longer-lasting activity is a matter of protease resistance and in-vitro
                availability, not slower bloodstream clearance, and the specific
                hour-figures quoted online are not human data.
              </P>
            </Section>

            {/* FAQ */}
            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">
                Common questions
              </h2>
              <dl className="mt-6 space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/40 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/igf-1-lr3" label="IGF-1 LR3 reference (the compound itself)" />
                <CrossLink href="/hormones/igf-1" label="IGF-1 — the native growth factor" />
                <CrossLink href="/hormones/mgf" label="MGF — the local, load-triggered pulse" />
                <CrossLink href="/insights/the-other-pedal" label="The other pedal — the whole IGF-1 accelerator" />
                <CrossLink href="/tools/half-life" label="Half-life & dosing calculator (correct molar mass)" />
                <CrossLink href="/research?q=What%20does%20the%20human%20evidence%20actually%20show%20for%20IGF-1%20LR3%2C%20and%20what%20is%20its%20true%20half-life%3F" label="Ask the research agent what the human data shows" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference for research and laboratory contexts only. Not medical
              advice, and not a recommendation to use IGF-1 LR3 or any IGF-1 analog. IGF-1
              and its analogs are not approved for performance or body-composition use and
              are prohibited in sport at all times under WADA S2. Specific compounds,
              trials, and labels are named to explain the science &ndash; verify any claim
              against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Evidence-grade badges ──────────────────────────────────────────────────
   A lightweight, article-local grade tag. Distinct from lib/evidence's
   claim-level TierBadge (which is bound to per-value provenance records and is,
   by its own design note, never used as a legend key). Here the four grades sit
   at prose altitude, so this renders the human-readable label in the site's
   accent tokens, strongest → weakest by hue.                                   */
const GRADES = {
  reference: {
    label: "Reference",
    hue: "text-accent-teal bg-accent-teal/10 border-accent-teal/30",
    note: "Established biochemical, structural, or regulatory fact.",
  },
  clinical: {
    label: "Clinical",
    hue: "text-accent-blue bg-accent-blue/10 border-accent-blue/30",
    note: "Data from human trials or an approved drug label.",
  },
  preclinical: {
    label: "Preclinical",
    hue: "text-accent-amber bg-accent-amber/10 border-accent-amber/30",
    note: "Animal or cell-culture data; no human equivalent published.",
  },
  community: {
    label: "Community",
    hue: "text-ink/70 bg-ink/[0.06] border-ink/25",
    note: "Forum-reported and anecdotal — signal, not evidence.",
  },
} as const;

function Grade({ g }: { g: keyof typeof GRADES }) {
  const meta = GRADES[g];
  return (
    <span
      title={meta.note}
      className={`inline-flex items-center rounded-full border px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide ${meta.hue}`}
    >
      {meta.label}
    </span>
  );
}

function GradeLegend() {
  const order: (keyof typeof GRADES)[] = ["reference", "clinical", "preclinical", "community"];
  return (
    <dl className="grid gap-3 rounded-2xl border border-ink/10 bg-panel/40 p-5 sm:grid-cols-2">
      {order.map((g) => (
        <div key={g} className="flex items-baseline gap-2.5">
          <dt className="shrink-0">
            <Grade g={g} />
          </dt>
          <dd className="text-[13px] leading-5 text-ink/60">{GRADES[g].note}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Structure: two changes to a 70-aa protein ──────────────────────────────
   Native IGF-1 and LR3 drawn with their shared 70-aa body aligned, so the only
   visual differences are the prepended 13-aa "Long" extension and the residue-3
   swap that gives the "R3".                                                    */
function StructureFigure() {
  // Geometry: 70-aa body spans x=150..510 in both bars (1 aa ≈ 5.14 px).
  const bodyX = 150, bodyW = 360;
  const extW = Math.round((13 / 70) * bodyW); // 13-aa extension ≈ 67 px
  const pos3 = bodyX + Math.round((2.5 / 70) * bodyW); // residue 3 tick
  const nativeY = 66, lr3Y = 150;
  const barH = 30;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 560 250"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="Native IGF-1 is a 70-amino-acid protein of about 7,649 daltons with three disulfide bonds. IGF-1 LR3 shares that same 70-residue body but prepends a 13-amino-acid N-terminal extension (the 'Long') and swaps glutamic acid for arginine at position 3 (the 'R3'), giving an 83-residue protein of about 9,100 daltons with the same disulfide bonds."
      >
        {/* Native IGF-1 */}
        <text x={bodyX} y={nativeY - 12} fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Native IGF-1</text>
        <text x={bodyX + bodyW} y={nativeY - 12} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">70 aa · ~7,649 Da · 3 S–S</text>
        <rect x={bodyX} y={nativeY} width={bodyW} height={barH} rx={8} fill="var(--panel)" stroke="var(--accent-blue)" strokeOpacity="0.45" />
        {/* position-3 tick (Glu) */}
        <line x1={pos3} y1={nativeY - 4} x2={pos3} y2={nativeY + barH + 4} stroke="var(--accent-purple)" strokeOpacity="0.8" strokeWidth="2" />
        <text x={pos3} y={nativeY + barH + 18} textAnchor="middle" fill="var(--accent-purple)" fontSize="10.5" fontFamily="var(--font-mono, monospace)">Glu³</text>

        {/* IGF-1 LR3 */}
        <text x={bodyX - extW} y={lr3Y - 12} fill="var(--color-ink)" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">IGF-1 LR3</text>
        <text x={bodyX + bodyW} y={lr3Y - 12} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">83 aa · ~9,100 Da · same 3 S–S</text>
        {/* 13-aa extension (highlight) */}
        <rect x={bodyX - extW} y={lr3Y} width={extW} height={barH} rx={8} fill="color-mix(in srgb, var(--accent-teal) 16%, transparent)" stroke="var(--accent-teal)" strokeOpacity="0.75" strokeWidth="2" />
        {/* shared 70-aa body */}
        <rect x={bodyX} y={lr3Y} width={bodyW} height={barH} rx={8} fill="var(--panel)" stroke="var(--accent-blue)" strokeOpacity="0.45" />
        {/* position-3 tick (Arg, changed) */}
        <line x1={pos3} y1={lr3Y - 4} x2={pos3} y2={lr3Y + barH + 4} stroke="var(--accent-purple)" strokeOpacity="0.9" strokeWidth="2.5" />
        <text x={pos3} y={lr3Y + barH + 18} textAnchor="middle" fill="var(--accent-purple)" fontSize="10.5" fontFamily="var(--font-mono, monospace)">Arg³</text>

        {/* extension bracket label */}
        <text x={bodyX - extW / 2} y={lr3Y + barH + 18} textAnchor="middle" fill="var(--accent-teal)" fontSize="10" fontFamily="var(--font-mono, monospace)">+13 aa</text>

        {/* dashed connector between residue-3 positions */}
        <line x1={pos3} y1={nativeY + barH + 22} x2={pos3} y2={lr3Y - 22} stroke="var(--accent-purple)" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* legend row */}
        <g transform="translate(150, 214)">
          <rect x="0" y="0" width="12" height="12" rx="3" fill="color-mix(in srgb, var(--accent-teal) 16%, transparent)" stroke="var(--accent-teal)" strokeOpacity="0.75" />
          <text x="18" y="10" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11">&ldquo;Long&rdquo;: N-terminal extension</text>
          <line x1="228" y1="0" x2="228" y2="12" stroke="var(--accent-purple)" strokeOpacity="0.9" strokeWidth="2.5" />
          <text x="236" y="10" fill="var(--color-ink)" fillOpacity="0.6" fontSize="11">&ldquo;R3&rdquo;: Glu³ → Arg³</text>
        </g>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Same 70-residue core, aligned. LR3 adds the 13-aa &ldquo;Long&rdquo; extension
        and the position-3 swap &mdash; and between them they cut binding-protein
        capture by roughly 100-fold.
      </figcaption>
    </figure>
  );
}

/* ── Half-life, the right way round ─────────────────────────────────────────
   Persistence bars: bound native IGF-1 is the SLOW state (long bar), free is the
   FAST state (tiny bar), and LR3 sits near the fast end — a little longer for
   protease resistance, but with an uncertain, unmeasured tail in humans.
   Schematic, not to scale.                                                     */
function HalfLifeFigure() {
  const rows: {
    label: string;
    sub: string;
    barW: number;
    color: string;
    dashedTail?: number;
    highlight?: boolean;
  }[] = [
    { label: "Native IGF-1, bound", sub: "IGFBP-3 + ALS ternary complex · ~12–16 h", barW: 380, color: "var(--accent-blue)" },
    { label: "Native IGF-1, free", sub: "the 1–3% free fraction · ~10–15 min", barW: 26, color: "var(--accent-amber)" },
    { label: "IGF-1 LR3", sub: "evades the IGFBPs → clears fast; protease-resistant tail; human t½ unknown", barW: 66, color: "var(--accent-teal)", dashedTail: 46, highlight: true },
  ];
  const rowH = 64, top = 30, x0 = 168;
  const H = top + rows.length * rowH + 24;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 560 ${H}`}
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="A schematic of circulating persistence. Native IGF-1 bound in the IGFBP-3 and acid-labile-subunit ternary complex is the slow state, lasting about 12 to 16 hours. Free native IGF-1 is the fast state, cleared in about 10 to 15 minutes. IGF-1 LR3 evades the binding proteins, so it sits near the fast, free end rather than the slow, bound end; a protease-resistant N-terminal extension adds a little persistence, but the true human half-life is unknown. Being free is the fast-clearance state, not the slow one."
      >
        {/* axis label */}
        <text x={x0} y={18} fill="var(--color-ink)" fillOpacity="0.4" fontSize="10.5" fontFamily="var(--font-mono, monospace)">circulating persistence &rarr;</text>
        <line x1={x0} y1={top - 4} x2={x0} y2={top + rows.length * rowH - 8} stroke="var(--color-ink)" strokeOpacity="0.15" strokeWidth="1" />
        {rows.map((r, i) => {
          const y = top + i * rowH;
          return (
            <g key={r.label}>
              <text x={x0 - 12} y={y + 14} textAnchor="end" fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{r.label}</text>
              <rect
                x={x0}
                y={y + 22}
                width={r.barW}
                height={16}
                rx={5}
                fill={r.highlight ? "color-mix(in srgb, var(--accent-teal) 22%, transparent)" : `color-mix(in srgb, ${r.color} 22%, transparent)`}
                stroke={r.color}
                strokeOpacity={r.highlight ? 0.85 : 0.5}
                strokeWidth={r.highlight ? 2 : 1}
              />
              {r.dashedTail && (
                <>
                  <rect x={x0 + r.barW} y={y + 22} width={r.dashedTail} height={16} rx={5} fill="none" stroke={r.color} strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x={x0 + r.barW + r.dashedTail + 8} y={y + 34} fill="var(--color-ink)" fillOpacity="0.45" fontSize="13" fontWeight="700">?</text>
                </>
              )}
              <text x={x0} y={y + 54} fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">{r.sub}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Schematic, not to scale. The binding proteins are what make bound IGF-1 slow;
        strip them and you move <em>toward</em> the fast, free end &mdash; which is why
        LR3 sits down here, not up with the ternary complex.
      </figcaption>
    </figure>
  );
}
