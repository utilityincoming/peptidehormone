import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HORMONES, getHormone, hormonesByFamily } from "@/lib/hormones";
import { getFamily } from "@/lib/families";
import { Container, SiteHeader, SiteFooter } from "@/components/site";

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

  const identity = [
    { label: "Class", value: h.class },
    { label: "Source", value: h.source },
    { label: "Receptor", value: h.receptor },
  ];

  return (
    <>
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
