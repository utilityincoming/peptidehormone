import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HORMONES, getHormone, hormonesByFamily, halfLifeForLink, hormoneFaq } from "@/lib/hormones";
import { hormoneMetaTitle, hormoneMetaDescription, aliasesFor } from "@/lib/aliases";
import { comparePairPath } from "@/lib/compare";
import { referencesFor } from "@/lib/references";
import { getFamily } from "@/lib/families";
import { insightsForHormone } from "@/lib/insights";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { hormoneLd } from "@/lib/jsonld";
import {
  carriedByAminoClub,
  AMINOCLUB_HOME,
  AMINOCLUB_CODE,
  AFFILIATE_REL,
} from "@/lib/affiliate";
import { melanocortinUrl } from "@/lib/network";
import { externalRefs } from "@/lib/identifiers";
import { compoundTierClasses, TierBadge, EvidenceFloor } from "@/components/evidence";
import { hormoneFigure } from "@/components/hormone-figures";
import { monographClaims, monographFloor } from "@/lib/hormone-evidence";

export function generateStaticParams() {
  return HORMONES.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = getHormone(slug);
  if (!h) return { title: "Not found" };
  const title = hormoneMetaTitle(h);
  const description = hormoneMetaDescription(h);
  return {
    title,
    description,
    alternates: { canonical: `/hormones/${h.slug}` },
    openGraph: { title: `${title} · Peptide Hormone`, description },
  };
}

export default async function HormonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = getHormone(slug);
  if (!h) notFound();

  const family = getFamily(h.family);
  const accent = family?.accent ?? "text-accent";
  const related = hormonesByFamily(h.family).filter((x) => x.slug !== h.slug);
  const parent = h.parent ? getHormone(h.parent) : undefined;
  const typeLabel = h.type === "analog" ? "Analog" : h.type === "research" ? "Research peptide" : "Endogenous";
  const evidence = h.evidence ?? "Established";

  // Lineage = the native hormone plus every analog engineered from it. Show a
  // comparison deep-link whenever this molecule sits in such a lineage.
  const lineageRoot = h.parent ?? (HORMONES.some((x) => x.parent === h.slug) ? h.slug : undefined);
  const lineageSlugs = lineageRoot
    ? [lineageRoot, ...HORMONES.filter((x) => x.parent === lineageRoot).map((x) => x.slug)]
    : [];

  const references = referencesFor(h.slug);
  const extRefs = externalRefs(h.slug);
  const faqs = hormoneFaq(h);
  const mcUrl = melanocortinUrl(h.slug);

  // Long-form insights that treat this molecule directly — surfaced only when
  // one applies, so the cross-link stays a signal rather than boilerplate.
  const deepDives = insightsForHormone(h.slug).slice(0, 3);

  // Per-claim provenance tiers for the quantitative properties, and the computed
  // page-level floor - the Standard, surfaced where the claims actually sit.
  const claimByField = Object.fromEntries(monographClaims(h).map((c) => [c.field, c]));
  const evidenceFloor = monographFloor(h);

  const figure = hormoneFigure(h.slug);

  const identity = [
    { label: "Class", value: h.class },
    { label: "Source", value: h.source },
    { label: "Receptor", value: h.receptor },
  ];

  return (
    <>
      <JsonLd data={hormoneLd(h, family)} />
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(55% 55% at 80% 0%, rgba(124,131,255,0.13), transparent 70%)",
            }}
          />
          <Container className="relative py-14 md:py-18">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/#families" className="hover:text-ink">Families</Link>
              <span aria-hidden>/</span>
              {family ? (
                <Link href={`/families/${family.slug}`} className={`hover:text-ink ${accent}`}>
                  {family.name}
                </Link>
              ) : (
                <span>Hormone</span>
              )}
              <span aria-hidden>/</span>
              <span className="text-ink/70">{h.abbr ?? h.name}</span>
            </nav>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {h.name}
              {h.abbr && <span className={`ml-3 text-2xl font-medium ${accent}`}>{h.abbr}</span>}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">{h.summary}</p>
            {aliasesFor(h.slug).length > 0 && (
              <p className="mt-3 text-sm text-ink/45">
                Also known as {aliasesFor(h.slug).join(", ")}.
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs">
              <span className="rounded-full border border-ink/15 bg-panel/50 px-3 py-1 font-medium text-ink/65">
                {typeLabel}
              </span>
              <span className={`rounded-full border px-3 py-1 font-medium ${compoundTierClasses(evidence)}`}>
                {evidence}
              </span>
              {parent && (
                <span className="text-ink/50">
                  Based on{" "}
                  <Link href={`/hormones/${parent.slug}`} className="text-accent hover:underline">
                    {parent.name}
                  </Link>
                </span>
              )}
              {parent && (
                <Link
                  href={`/compare/${comparePairPath(parent.slug, h.slug)}`}
                  className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-panel/50 px-3 py-1 font-medium text-ink/70 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Compare with {parent.abbr ?? parent.name} <span aria-hidden>→</span>
                </Link>
              )}
              {lineageSlugs.length > 1 && (
                <Link
                  href={`/tools/compare?ids=${lineageSlugs.join(",")}`}
                  className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-panel/50 px-3 py-1 font-medium text-ink/70 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Compare lineage <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </Container>
        </section>

        <Container className="grid gap-16 py-14 md:grid-cols-[1.6fr_1fr] md:py-18">
          {/* ── Main column ── */}
          <div className="min-w-0">
            {h.thread && (
              <p className="mb-12 border-l-2 border-accent/50 pl-5 text-lg leading-8 text-ink/60">
                {h.thread}
              </p>
            )}
            <section>
              <h2 className="font-display text-2xl font-semibold">Identity</h2>
              <dl className="mt-5 overflow-hidden rounded-2xl border border-ink/10">
                {identity.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex flex-col gap-1 p-5 sm:flex-row sm:gap-6 ${
                      i > 0 ? "border-t border-ink/[0.06]" : ""
                    }`}
                  >
                    <dt className="shrink-0 text-xs font-medium uppercase tracking-wide text-ink/40 sm:w-28 sm:pt-0.5">
                      {row.label}
                    </dt>
                    <dd className="text-sm leading-6 text-ink/75">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {(h.mw || h.halfLife) && (
              <section className="mt-12">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <h2 className="font-display text-2xl font-semibold">Key properties</h2>
                  {evidenceFloor && <EvidenceFloor floor={evidenceFloor} />}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {h.mw && (
                    <div className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                      <div className="text-xs font-medium uppercase tracking-wide text-ink/40">
                        Molecular weight
                      </div>
                      <div className="mt-1 font-display text-2xl font-semibold text-ink">
                        {h.mwApprox ? "≈ " : "~"}
                        {h.mw.toLocaleString()} <span className="text-base font-medium text-ink/50">Da</span>
                      </div>
                      {claimByField["molecular_weight"] && (
                        <div className="mt-2.5">
                          <TierBadge
                            tier={claimByField["molecular_weight"].tier}
                            scopeNote={claimByField["molecular_weight"].scopeNote}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {h.halfLife && (
                    <div className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                      <div className="text-xs font-medium uppercase tracking-wide text-ink/40">
                        Half-life (native)
                      </div>
                      <div className="mt-1 font-display text-xl font-semibold text-ink">{h.halfLife}</div>
                      {claimByField["half_life"] && (
                        <div className="mt-2.5">
                          <TierBadge
                            tier={claimByField["half_life"].tier}
                            scopeNote={claimByField["half_life"].scopeNote}
                          />
                        </div>
                      )}
                      {h.halfLifeMin != null &&
                        (() => {
                          const { value, unit } = halfLifeForLink(h.halfLifeMin);
                          return (
                            <Link
                              href={`/tools/half-life?t12=${value}&unit=${unit}`}
                              className="mt-3 inline-flex items-center gap-1 text-sm text-accent transition-transform hover:translate-x-0.5"
                            >
                              Model dosing <span aria-hidden>→</span>
                            </Link>
                          );
                        })()}
                    </div>
                  )}
                </div>
                <p className="mt-3 text-xs leading-5 text-ink/40">
                  Approximate values for the native hormone; engineered analogs are
                  often deliberately larger and far longer-acting. Each figure carries
                  its own provenance tier, and the floor is the weakest of them - the{" "}
                  <Link
                    href="/methodology"
                    className="text-ink/60 underline decoration-ink/20 underline-offset-2 hover:text-accent"
                  >
                    Standard
                  </Link>
                  .
                </p>
              </section>
            )}

            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold">Mechanism</h2>
              <p className="mt-5 text-[15px] leading-7 text-ink/70">{h.mechanism}</p>
              {figure && (
                <figure className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-panel/30 p-6">
                  {figure.svg}
                  <figcaption className="mt-4 border-t border-ink/[0.06] pt-4 text-sm leading-6 text-ink/55">
                    {figure.caption}
                  </figcaption>
                </figure>
              )}
            </section>

            {h.narrative && h.narrative.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-semibold">In depth</h2>
                <div className="mt-5 space-y-5">
                  {h.narrative.map((para, i) => (
                    <p key={i} className="text-[15px] leading-7 text-ink/70">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold">Reference notes</h2>
              <ul className="mt-5 space-y-3">
                {h.facts.map((f, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-7 text-ink/70">
                    <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${accent}`} aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-semibold">Common questions</h2>
                <dl className="mt-5 space-y-3">
                  {faqs.map((f) => (
                    <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                      <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                      <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {references.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-semibold">Selected literature</h2>
                <p className="mt-3 text-sm leading-6 text-ink/55">
                  Curated peer-reviewed reviews, sourced from PubMed. Selected for
                  relevance, not exhaustive — open any entry on PubMed for the full
                  record and its primary citations.
                </p>
                <ol className="mt-5 space-y-3">
                  {references.map((r, i) => (
                    <li key={r.pmid} className="flex gap-3 text-[15px] leading-7 text-ink/75">
                      <span className="mt-0.5 shrink-0 font-mono text-xs text-ink/35">{i + 1}.</span>
                      <span>
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink transition-colors hover:text-accent"
                        >
                          {r.title}
                        </a>
                        <span className="text-ink/45">
                          {" "}· <span className="italic">{r.source}</span>
                          {r.year ? `, ${r.year}` : ""} · PMID{" "}
                          <span className="font-mono text-xs">{r.pmid}</span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {extRefs.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-semibold">External references</h2>
                <p className="mt-3 text-sm leading-6 text-ink/55">
                  {h.abbr ?? h.name} in the public knowledge graph — the same entity
                  resolved across the authoritative chemistry and protein databases.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {extRefs.map((r) => (
                    <li key={r.key}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-panel/40 px-3 py-1.5 text-sm text-ink/70 transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        <span className="font-medium">{r.label}</span>
                        <span className="font-mono text-xs text-ink/40">{r.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-8">
            {carriedByAminoClub(h.slug) && (
              <div className="rounded-2xl border border-accent/25 bg-accent/[0.04] p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-base font-semibold">Availability</h3>
                  <span className="rounded-full border border-accent-teal/40 bg-accent-teal/10 px-2.5 py-0.5 text-xs font-medium text-accent-teal">
                    Via AminoClub
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink/60">
                  Research-grade {h.abbr ?? h.name}, sourced through the American Peptide
                  network via{" "}
                  <span className="font-medium text-ink/80">AminoClub</span> — a research-use-only
                  supplier, sold with provenance you can reason about. Use code{" "}
                  <span className="font-mono text-ink/80">{AMINOCLUB_CODE}</span>.
                </p>
                <a
                  href={AMINOCLUB_HOME}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="mt-4 flex items-center justify-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/15"
                >
                  View at AminoClub <span aria-hidden>→</span>
                </a>
                <p className="mt-3 text-[11px] leading-4 text-ink/40">
                  Affiliate link across our network — supports this reference at no cost to
                  you, and buys not one word of the catalog.{" "}
                  <Link
                    href="/methodology"
                    className="text-ink/60 underline decoration-ink/20 underline-offset-2 hover:text-accent"
                  >
                    How we pick
                  </Link>
                </p>
              </div>
            )}

            {deepDives.length > 0 && (
              <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
                <span className={`font-mono text-[11px] uppercase tracking-wide ${accent}`}>
                  {deepDives.length > 1 ? "Deep-dives" : "Deep-dive"}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold">
                  Go deeper on {h.abbr ?? h.name}
                </h3>
                <ul className="mt-4 space-y-4">
                  {deepDives.map((ins) => (
                    <li key={ins.slug}>
                      <Link href={`/insights/${ins.slug}`} className="group block">
                        <span className="font-display text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
                          {ins.title}
                        </span>
                        <span className="mt-1 flex items-center gap-1.5 text-[13px] leading-5 text-ink/45">
                          {ins.readingMinutes} min read
                          <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                            →
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Ask the research agent</h3>
              <p className="mt-2 text-sm leading-6 text-ink/55">
                Grounded answers with citations from PubChem, UniProt,
                ClinicalTrials.gov, and PubMed.
              </p>
              <ul className="mt-4 space-y-2">
                {h.questions.map((q) => (
                  <li key={q}>
                    <Link
                      href={`/research?q=${encodeURIComponent(q)}`}
                      className="group flex items-start gap-2 text-sm leading-6 text-ink/75 transition-colors hover:text-accent"
                    >
                      <span className="mt-0.5 text-ink/30 transition-colors group-hover:text-accent" aria-hidden>→</span>
                      <span>{q}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {related.length > 0 && family && (
              <div className="rounded-2xl border border-ink/10 p-6">
                <h3 className="font-display text-base font-semibold">
                  More in <span className={accent}>{family.name}</span>
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/hormones/${r.slug}`} className="text-ink/75 transition-colors hover:text-ink">
                        {r.name}
                        {r.abbr && <span className="text-ink/40"> · {r.abbr}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {mcUrl && (
              <div className="rounded-2xl border border-ink/10 p-6">
                <h3 className="font-display text-base font-semibold">The receptor science</h3>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  {h.abbr ?? h.name} set in the melanocortin system: which
                  receptors it hits and why, at our sister site melanocortin.com.
                </p>
                <a
                  href={mcUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:translate-x-0.5"
                >
                  View on melanocortin.com <span aria-hidden>→</span>
                </a>
              </div>
            )}

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference only. Not medical advice, diagnosis, or
              treatment. Mechanisms are summarized from public scientific
              literature and may simplify active areas of research.
            </p>
          </aside>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
