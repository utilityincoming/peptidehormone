import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { searchRecords, type SearchKind } from "@/lib/search";
import SearchPageInput from "@/components/SearchPageInput";

export const metadata: Metadata = {
  title: "Search",
  alternates: { canonical: "/search" },
  description:
    "Search the peptide hormone reference — molecules, insights, families, and glossary terms.",
  robots: { index: false, follow: true },
};

const KIND_LABEL: Record<SearchKind, string> = {
  Hormone: "Molecule",
  Insight: "Insight",
  Family: "Family",
  Term: "Glossary",
  Tool: "Page",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = (raw ?? "").trim();
  const results = query ? searchRecords(query, undefined, { limit: 50 }) : [];

  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Container className="py-14 md:py-20">
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Search
          </h1>
          <p className="mt-3 max-w-2xl text-ink/60">
            Molecules, insights, families, and glossary terms — one search across the
            whole reference.
          </p>

          <div className="mt-8 max-w-xl">
            <SearchPageInput initialQuery={query} />
          </div>

          {query === "" ? (
            <p className="mt-10 text-sm text-ink/45">
              Type a molecule, mechanism, or term to begin — try{" "}
              <SuggestLink q="GLP-1" />, <SuggestLink q="half-life" />, or{" "}
              <SuggestLink q="melanocortin" />.
            </p>
          ) : (
            <>
              <p className="mt-8 text-sm text-ink/45" aria-live="polite">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
              </p>
              {results.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-ink/10 bg-panel/30 p-10 text-center text-ink/55">
                  Nothing matched. Check the spelling, or browse the{" "}
                  <Link href="/catalog" className="font-medium text-accent hover:underline">
                    full catalog
                  </Link>
                  .
                </div>
              ) : (
                <ul className="mt-5 divide-y divide-ink/[0.06] overflow-hidden rounded-2xl border border-ink/10">
                  {results.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={r.href}
                        className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors hover:bg-panel"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-medium text-ink">
                            {r.title}
                          </span>
                          <span className="mt-0.5 block truncate text-sm text-ink/55">
                            {r.subtitle}
                          </span>
                        </span>
                        <span className="shrink-0 rounded-full border border-ink/10 bg-panel/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink/45">
                          {KIND_LABEL[r.kind]}
                        </span>
                        <span
                          className="shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

function SuggestLink({ q }: { q: string }) {
  return (
    <Link
      href={`/search?q=${encodeURIComponent(q)}`}
      className="font-medium text-accent hover:underline"
    >
      {q}
    </Link>
  );
}
