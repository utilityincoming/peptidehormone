import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { searchRecords } from "@/lib/search";
import { SEARCH_EXAMPLES, SEARCH_EXAMPLE_CLASS, SearchResult } from "@/components/SearchPresentation";
import SearchPageInput from "@/components/SearchPageInput";

export const metadata: Metadata = {
  title: "Search",
  alternates: { canonical: "/search" },
  description:
    "Search the peptide hormone reference — molecules, insights, families, and glossary terms.",
  robots: { index: false, follow: true },
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
        <Container className="max-w-4xl py-10 md:py-16">
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Search
          </h1>
          <p className="mt-3 max-w-2xl text-ink/60">
            Find molecules, Insights articles, signaling families, and glossary terms.
          </p>

          <div className="mt-6">
            <SearchPageInput initialQuery={query} />
          </div>

          {query === "" ? (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-secondary">Try a search</p>
              <div className="flex flex-wrap gap-2">
                {SEARCH_EXAMPLES.map((example) => (
                  <Link key={example} href={`/search?q=${encodeURIComponent(example)}`} className={SEARCH_EXAMPLE_CLASS}>
                    {example}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="mt-7 wrap-break-word text-sm text-secondary" aria-live="polite">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
              </p>
              {results.length === 0 ? (
                <div className="mt-4 rounded-lg border border-ink/10 bg-panel/40 px-4 py-5 text-sm text-secondary">
                  Nothing matched. Check the spelling, or browse the{" "}
                  <Link href="/catalog" className="font-medium text-accent hover:underline">
                    full catalog
                  </Link>
                  .
                </div>
              ) : (
                <ul className="mt-4 divide-y divide-ink/10 overflow-hidden rounded-lg border border-ink/10">
                  {results.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={r.href}
                        className="flex items-center gap-4 bg-surface px-4 py-4 transition-colors hover:bg-panel focus-visible:outline-offset-[-2px] sm:px-5"
                      >
                        <SearchResult result={r} />
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
