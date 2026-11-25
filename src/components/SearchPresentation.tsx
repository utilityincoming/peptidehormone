import type { SearchKind, SearchRecord } from "@/lib/search";

const KIND_LABEL: Record<SearchKind, string> = {
  Hormone: "Molecule",
  Insight: "Insight",
  Family: "Family",
  Term: "Glossary",
  Tool: "Page",
};

export const SEARCH_EXAMPLES = ["GLP-1", "half-life", "melanocortin"];
export const SEARCH_PLACEHOLDER = "Search molecules, topics, and terms";
export const SEARCH_EXAMPLE_CLASS = "inline-flex min-h-8 items-center rounded-md border border-ink/15 bg-surface px-3 text-sm text-accent hover:bg-panel";

export function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" strokeLinecap="round" />
    </svg>
  );
}

export function SearchResult({ result, compact = false }: { result: SearchRecord; compact?: boolean }) {
  return (
    <>
      <span className="grid min-w-0 flex-1 grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-[minmax(0,1fr)_auto]">
        <span className="min-w-0">
          <span className="block wrap-break-word text-[15px] font-semibold leading-snug text-ink">
            {result.title}
          </span>
          <span className={`mt-1 block wrap-break-word text-sm leading-snug text-secondary ${compact ? "line-clamp-2" : ""}`}>
            {result.subtitle}
          </span>
        </span>
        <span className="w-fit self-start rounded-sm bg-surface-deep px-2 py-0.5 text-xs font-medium text-secondary">
          {KIND_LABEL[result.kind]}
        </span>
      </span>
      <span className="shrink-0 self-center text-accent" aria-hidden>→</span>
    </>
  );
}
