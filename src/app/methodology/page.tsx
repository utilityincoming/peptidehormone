import type { Metadata } from "next";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { methodologyLd } from "@/lib/jsonld";
import { HORMONES } from "@/lib/hormones";
import { FAMILIES } from "@/lib/families";
import { REFERENCES } from "@/lib/references";
import { TierBadge, EvidenceFloor } from "@/components/evidence";
import { TIERS as TIER_META, TIER_ORDER, type Claim, type Tier } from "@/lib/evidence/types";
import { COMPOUND_TIERS, type CompoundTier } from "@/lib/evidence/compound";

const MOLECULES = HORMONES.length;
const FAMILY_COUNT = FAMILIES.length;
const REFERENCE_COUNT = Object.values(REFERENCES).reduce((n, list) => n + list.length, 0);

export const metadata: Metadata = {
  title: "Methodology & standards",
  alternates: { canonical: "/methodology" },
  description:
    "How Peptide Hormone sources references, grades evidence, classifies molecules, and bounds its scope — the standard behind an editorially independent, research-grade reference.",
  openGraph: {
    title: "Methodology & standards · Peptide Hormone",
    description:
      "The standard behind the catalog: how we source references, grade evidence, classify molecules, and bound our scope.",
  },
};

/* What each rung of the compound ladder means. Keyed by CompoundTier and
   rendered in COMPOUND_TIERS order, so the page cannot drift out of sync with
   the ladder: a renamed rung fails the build, and a new one fails to compile
   until it is described here. */
const TIER_BODY: Record<CompoundTier, string> = {
  Established:
    "Mechanism and core effects are settled across the peer-reviewed literature — typically endogenous hormones or approved drugs with decades of study behind them.",
  Clinical:
    "Supported by human clinical trials, but still maturing, narrower in scope, or newer than the settled canon.",
  Investigational:
    "Under active human investigation. The signal is promising, but the picture is not yet settled.",
  Preclinical:
    "Evidence is largely animal or in-vitro. Human data is thin or absent — read the mechanism as a hypothesis, not a conclusion.",
  Limited:
    "Sparse, older, or mostly community-reported evidence. These carry the loudest claims and the least data — treat them with the most caution.",
};

const TIERS = COMPOUND_TIERS.map((name) => ({ name, body: TIER_BODY[name] }));

const TYPES: [string, string][] = [
  ["Endogenous", "a signal the body produces itself — the native biology the rest of the catalog is measured against"],
  ["Analog", "an engineered molecule built on an endogenous hormone, tuned for potency, half-life, or receptor selectivity"],
  ["Research", 'a community "research peptide" that sits outside the approved-drug system — where the evidence is often thinnest and the claims loudest'],
];

export default function Methodology() {
  return (
    <>
      <JsonLd data={methodologyLd()} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Header ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              The standard behind the catalog
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Methodology &amp; standards
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">
              PeptideHormone claims to be <Em>sourced, not asserted</Em>. This page is
              the receipt: how every monograph is referenced, how evidence is graded,
              how molecules are classified, and exactly where the reference stops and a
              clinician begins.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink/40">
              {MOLECULES} molecules · {FAMILY_COUNT} signaling families · {REFERENCE_COUNT} peer-reviewed references
            </p>
          </Container>
        </section>

        <Container className="max-w-3xl py-14 md:py-18">
          <article className="space-y-12">
            <Section title="What this is">
              <P>
                PeptideHormone is an editorially independent, research-grade reference on the
                peptide hormone system — the endogenous signals that run the body and the
                engineered molecules redrawing the edge of research. It is a{" "}
                <Em>reference</Em>, not a store and not a clinic: no products, no
                storefront, no sponsored conclusions. The whole point of the project is to
                be the calm, checkable layer in a category that is loud with marketing and
                thin on rigor.
              </P>
              <P>
                That only means something if the rigor is visible. Everything below is the
                method you can hold the rest of the site to.
              </P>
            </Section>

            <Section title="How we source">
              <P>
                Every monograph&rsquo;s reference list was pulled live from{" "}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/"
                  className={LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PubMed
                </a>{" "}
                through the NCBI E-utilities API, then vetted by hand for topical
                relevance. We lead with review articles and consensus statements rather
                than single primary studies — the goal is the settled center of a
                literature, not the most exciting outlier in it. Titles, journals, and
                years are carried through as PubMed returns them, and every citation
                exposes its <Em>PMID</Em>, which resolves at pubmed.ncbi.nlm.nih.gov. A
                claim you can&rsquo;t click through to isn&rsquo;t a claim we make.
              </P>
              <P>
                One honest limit: monograph mechanisms <Em>summarize</Em> public
                literature, and summary means simplification. Active research is compressed
                into a few sentences; where a field is genuinely unsettled, we say so
                rather than manufacture a verdict.
              </P>
            </Section>

            <Section title="The evidence ladder">
              <P>
                Not all &ldquo;peptide&rdquo; claims are backed by the same weight of data,
                so we don&rsquo;t present them as if they are. Every molecule carries an
                evidence tier — a filterable rigor badge — placing it on a five-rung ladder
                from settled science to sparse anecdote. The tier grades the{" "}
                <Em>strength of the evidence</Em>, not how interesting or promising the
                molecule is.
              </P>
              <EvidenceLadder />
            </Section>

            <Section title="Tiering the claim, not the compound">
              <P>
                The ladder above grades a whole molecule at a glance — useful, but coarse.
                A single entry mixes claims of very different weight: a molecular weight you
                can compute exactly, a half-life measured only in rats, a dose that lives in
                forum lore. Grading all three as one number would flatter the weakest of them.
              </P>
              <P>
                So underneath the catalog badge sits a finer standard, shared with our sister
                property: every individual claim carries its own tier, describing{" "}
                <Em>where the number came from</Em> — its provenance — not how confident or
                promising it is. A well-replicated rodent study is still <Em>preclinical</Em>.
                Downgrading is free; upgrading requires a source.
              </P>
              <ClaimTierStandard />
            </Section>

            <Section title="How molecules are classified">
              <P>
                Alongside the evidence tier, each entry is tagged by what kind of molecule
                it actually is — because &ldquo;peptide&rdquo; spans everything from a
                hormone your gut secretes to a compound that has never seen a registered
                trial:
              </P>
              <ul className="space-y-3">
                {TYPES.map(([head, body]) => (
                  <li key={head} className="flex gap-3 text-[15px] leading-7 text-ink/75">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>
                      <strong className="font-semibold text-ink">{head}</strong> — {body}.
                    </span>
                  </li>
                ))}
              </ul>
              <P>
                Reading the two tags together is the point. An <Em>endogenous</Em> molecule
                graded <Em>Established</Em> and a <Em>research</Em> molecule graded{" "}
                <Em>Limited</Em> are both in the catalog — the labels tell you, at a glance,
                how far to trust what follows.
              </P>
            </Section>

            <Callout label="The standard, in one line">
              A page here earns its place by citation and by honest grading — not by
              confident tone. Where the evidence is thin, the badge says so; where the
              science is unsettled, the text says so. That is the whole difference between
              a reference and a sales page.
            </Callout>

            <Section title="Research-grade, not medical">
              <P>
                This is reference material for understanding biology. It is{" "}
                <Em>not</Em> medical advice, not dosing guidance, not a diagnosis, and not
                a recommendation to obtain or use any compound. Nothing here substitutes
                for a licensed clinician who knows your situation. Regulatory status varies
                by jurisdiction and by whether a given compound is handled as an approved
                drug or a research reagent — a distinction that is your responsibility to
                check, not ours to wave away.
              </P>
              <P>
                We hold this line deliberately. The moment a reference starts telling you
                what to take, it has stopped being a reference.
              </P>
            </Section>

            <Section title="Independence &amp; funding">
              <P>
                PeptideHormone hosts no storefront and sells no peptides — but it isn&rsquo;t
                pretending to be a lone island, either. It is part of the{" "}
                <Em>American Peptide</Em> network, and that network holds an affiliate
                relationship with ABSIM Peptides: buy through a sourcing link here and we may
                earn a commission, at no extra cost to you. We&rsquo;re open about the
                connection because hiding it would be the actual betrayal.
              </P>
              <P>
                What stays walled off is the science. No evidence tier, no molecule&rsquo;s
                grading, and no line of mechanism is ever softened, promoted, or reordered to
                move product — and a sourcing note only appears on molecules the vendor
                actually stocks, never as a blanket pitch. The relationship pays for the link;
                it does not buy a conclusion. The network shares a cause — an honest, checkable
                map of this field — not a sales quota. The day a conclusion bends to a seller
                is the day this project stops being worth reading.
              </P>
            </Section>

            <Section title="Corrections &amp; contact">
              <P>
                A reference is only as good as its willingness to be wrong in public. If
                you find an error — a misread mechanism, a stale reference, a mis-graded
                tier — tell us and we will fix it or show our work.
              </P>
              <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
                <p className="text-[15px] leading-7 text-ink/75">
                  Corrections and questions:{" "}
                  <a href="mailto:corrections@peptidehormone.com" className={LINK}>
                    corrections@peptidehormone.com
                  </a>
                </p>
                <p className="mt-2 text-sm leading-6 text-ink/50">
                  Include the molecule or page and, where you can, a PMID or link — it gets
                  the fix out faster.
                </p>
              </div>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">See the standard at work</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/catalog" label="Browse the full catalog" />
                <CrossLink href="/hormones/glp-1" label="A monograph, with its references" />
                <CrossLink href="/insights" label="Insights — the longer arguments" />
                <CrossLink href="/tools" label="Tools & calculators" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference only — not medical advice, diagnosis, or treatment, and
              not an endorsement of any purchase or use. Evidence tiers and molecule classes
              are editorial judgments about the public literature and can change as the
              science does.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Evidence ladder: five rungs, strongest at the top ── */
function EvidenceLadder() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <ol className="divide-y divide-ink/[0.06]">
        {TIERS.map((tier, i) => {
          // Fade the accent rail from full (Established) to faint (Limited).
          const opacity = 1 - i * 0.17;
          return (
            <li key={tier.name} className="flex gap-4 p-5">
              <div className="flex flex-col items-center pt-0.5">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-accent"
                  style={{ opacity }}
                  aria-hidden
                />
                {i < TIERS.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-ink/10" aria-hidden />
                )}
              </div>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-wide text-accent" style={{ opacity: Math.max(opacity, 0.55) }}>
                  {tier.name}
                </h3>
                <p className="mt-1.5 text-[15px] leading-7 text-ink/75">{tier.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <figcaption className="border-t border-ink/[0.06] px-5 py-3 text-center text-xs text-ink/40">
        The badge grades the weight of the evidence — not how promising the molecule is.
      </figcaption>
    </figure>
  );
}

/* ── The claim-level standard: six provenance tiers, rendered with the live badges ── */
const CLAIM_TIER_GLOSS: Record<Tier, string> = {
  reference:
    "Deterministic lookup or computation — molecular weight, sequence, a unit conversion. Not an empirical claim.",
  clinical: "Peer-reviewed human data, or a registered trial with posted results.",
  preclinical:
    "Peer-reviewed non-human or in-vitro data — rodent PK, receptor-binding assays, cell culture.",
  third_party: "An independent lab's measurement, methods disclosed, not peer reviewed.",
  vendor_reported:
    "A supplier's own claim about its own product — a COA or spec sheet, reproduced as reported.",
  community:
    "Aggregated user-reported signal — protocol conventions, subjective effects, dosing folklore.",
};

function demoClaim(field: string, tier: Tier, kind: Claim["estimate_kind"]): Claim {
  return {
    field,
    value: "—",
    tier,
    freshness: "current",
    estimate_kind: kind,
    scope_note: "Illustrative record, for rendering the standard.",
    provenance: {
      source_type: "aggregate",
      source_name: "illustrative",
      retrieved_at: "2026-08-04T00:00:00Z",
      schema_version: "0.1.0",
    },
  };
}

// A make-believe page mixing a computed identity fact, a rodent assay, and forum
// lore — the floor lands on the weakest of them (community), exactly as intended.
const DEMO_CLAIMS: Claim[] = [
  demoClaim("molecular_weight", "reference", "identity"),
  demoClaim("receptor_affinity", "preclinical", "pharmacodynamic"),
  demoClaim("reported_dose_range", "community", "dose_convention"),
];

function ClaimTierStandard() {
  return (
    <figure className="space-y-6 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-6">
      {/* Legend — the six provenance tiers, strongest first */}
      <ul className="space-y-3">
        {TIER_ORDER.map((tier) => (
          <li key={tier} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:flex-nowrap">
            <span className="inline-flex w-16 shrink-0 items-baseline">
              <TierBadge tier={tier} />
            </span>
            <span className="w-28 shrink-0 text-sm font-semibold text-ink">
              {TIER_META[tier].label}
            </span>
            <span className="basis-full text-[13px] leading-6 text-ink/55 sm:basis-0 sm:flex-1">
              {CLAIM_TIER_GLOSS[tier]}
            </span>
          </li>
        ))}
      </ul>

      {/* Freshness (orthogonal) + the computed page-level rollup */}
      <div className="flex flex-col gap-5 border-t border-ink/[0.06] pt-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-ink/40">Freshness is orthogonal</p>
          <div className="flex items-center gap-5">
            <TierBadge tier="third_party" freshness="current" retrievedAt="2026-06-01T00:00:00Z" showDate />
            <TierBadge tier="third_party" freshness="stale" retrievedAt="2024-01-01T00:00:00Z" showDate />
          </div>
          <p className="text-xs leading-5 text-ink/40">
            Same tier — the stale assay desaturates and its date turns amber.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-ink/40">Page-level rollup</p>
          <EvidenceFloor claims={DEMO_CLAIMS} />
        </div>
      </div>

      <figcaption className="border-t border-ink/[0.06] pt-4 text-xs leading-5 text-ink/40">
        Illustrative — a rendering of the standard, not claims about any one molecule. The
        floor is computed from the per-claim tiers: a page is only as strong as its weakest
        load-bearing claim. The catalog&rsquo;s single badge is that floor, surfaced up front.
      </figcaption>
    </figure>
  );
}
