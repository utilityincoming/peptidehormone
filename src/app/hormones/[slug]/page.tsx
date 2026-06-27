import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HORMONES, getHormone, hormonesByFamily, halfLifeForLink } from "@/lib/hormones";
import { getFamily } from "@/lib/families";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { hormoneLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return HORMONES.map((h) => ({ slug: h.slug }));
}

function evidenceClass(tier: string): string {
  switch (tier) {
    case "Established":
      return "border-accent-teal/40 bg-accent-teal/10 text-accent-teal";
    case "Clinical":
      return "border-accent-blue/40 bg-accent-blue/10 text-accent-blue";
    case "Investigational":
      return "border-accent-amber/40 bg-accent-amber/10 text-accent-amber";
    case "Preclinical":
      return "border-accent-purple/40 bg-accent-purple/10 text-accent-purple";
    default:
      return "border-accent-rose/40 bg-accent-rose/10 text-accent-rose";
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = getHormone(slug);
  if (!h) return { title: "Not found" };
  const title = h.abbr ? `${h.name} (${h.abbr})` : h.name;
  return {
    title,
    description: h.summary,
    openGraph: { title: `${title} · Peptide Hormone`, description: h.summary },
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

  const identity = [
    { label: "Class", value: h.class },
    { label: "Source", value: h.source },
    { label: "Receptor", value: h.receptor },
  ];

  return (
    <>
      <JsonLd data={hormoneLd(h, family)} />
      <SiteHeader />

      <main className="flex-1">
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
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs">
              <span className="rounded-full border border-ink/15 bg-panel/50 px-3 py-1 font-medium text-ink/65">
                {typeLabel}
              </span>
              <span className={`rounded-full border px-3 py-1 font-medium ${evidenceClass(evidence)}`}>
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
                <h2 className="font-display text-2xl font-semibold">Key properties</h2>
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
                    </div>
                  )}
                  {h.halfLife && (
                    <div className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                      <div className="text-xs font-medium uppercase tracking-wide text-ink/40">
                        Half-life (native)
                      </div>
                      <div className="mt-1 font-display text-xl font-semibold text-ink">{h.halfLife}</div>
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
                  Approximate values for the native hormone. Engineered analogs are
                  often deliberately larger and far longer-acting.
                </p>
              </section>
            )}

            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold">Mechanism</h2>
              <p className="mt-5 text-[15px] leading-7 text-ink/70">{h.mechanism}</p>
            </section>

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
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-8">
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
