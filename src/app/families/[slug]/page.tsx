import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAMILIES, getFamily } from "@/lib/families";
import { hormonesByFamily, type Hormone } from "@/lib/hormones";
import { Container, SiteHeader, SiteFooter } from "@/components/site";

// Resolve a family signal label to its hormone detail page, if one exists.
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
function hormoneSlugFor(signalName: string, fam: Hormone[]): string | undefined {
  const n = norm(signalName);
  if (n.length < 2) return undefined;
  // Exact match on abbreviation or name wins first, so a signal like "Glucagon"
  // does not get captured by "Glucagon-like peptide-1" via the prefix fallback.
  const exact = fam.find((h) => (h.abbr && norm(h.abbr) === n) || norm(h.name) === n);
  if (exact) return exact.slug;
  if (n.length >= 4) {
    const prefix = fam.find((h) => norm(h.name).startsWith(n));
    if (prefix) return prefix.slug;
  }
  return undefined;
}

export function generateStaticParams() {
  return FAMILIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const family = getFamily(slug);
  if (!family) return { title: "Not found" };
  return {
    title: family.name,
    description: family.tagline,
    openGraph: { title: `${family.name} · Peptide Hormone`, description: family.tagline },
  };
}

export default async function FamilyHub({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const family = getFamily(slug);
  if (!family) notFound();

  const others = FAMILIES.filter((f) => f.slug !== family.slug);
  const famHormones = hormonesByFamily(family.slug);

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ── Hub hero ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(55% 55% at 80% 0%, rgba(124,131,255,0.14), transparent 70%)",
            }}
          />
          <Container className="relative py-16 md:py-20">
            <nav className="flex items-center gap-2 text-sm text-ink/45">
              <Link href="/#families" className="hover:text-ink">Families</Link>
              <span aria-hidden>/</span>
              <span className={family.accent}>{family.name}</span>
            </nav>
            <h1 className={`mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl ${family.accent}`}>
              {family.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
              {family.tagline}
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-wide text-ink/40">
              {family.examples}
            </p>
          </Container>
        </section>

        <Container className="grid gap-16 py-16 md:grid-cols-[1.6fr_1fr] md:py-20">
          {/* ── Main column ── */}
          <div className="min-w-0">
            <section>
              <h2 className="font-display text-2xl font-semibold">Overview</h2>
              <div className="mt-5 space-y-4">
                {family.overview.map((p, i) => (
                  <p key={i} className="text-[15px] leading-7 text-ink/70">{p}</p>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold">Key signals</h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10">
                {family.signals.map((s, i) => {
                  const slug = hormoneSlugFor(s.name, famHormones);
                  return (
                    <div
                      key={s.name}
                      className={`flex flex-col gap-1 p-5 sm:flex-row sm:gap-6 ${
                        i > 0 ? "border-t border-ink/[0.06]" : ""
                      }`}
                    >
                      <div className={`shrink-0 font-mono text-sm font-medium sm:w-44 ${family.accent}`}>
                        {slug ? (
                          <Link href={`/hormones/${slug}`} className="underline decoration-current/30 underline-offset-4 hover:decoration-current">
                            {s.name}
                          </Link>
                        ) : (
                          s.name
                        )}
                      </div>
                      <p className="text-sm leading-6 text-ink/65">{s.role}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold">Reference notes</h2>
              <ul className="mt-5 space-y-3">
                {family.notes.map((n, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-7 text-ink/70">
                    <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${family.accent}`} aria-hidden />
                    <span>{n}</span>
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
                {family.questions.map((q) => (
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

            <div className="rounded-2xl border border-ink/10 p-6">
              <h3 className="font-display text-base font-semibold">Other families</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {others.map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/families/${f.slug}`}
                      className={`transition-colors hover:text-ink ${f.accent}`}
                    >
                      {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

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
