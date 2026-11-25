"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_PLACEHOLDER, SearchIcon } from "@/components/SearchPresentation";

/**
 * The search field on the /search page. Submits to /search?q=… so results are
 * server-rendered and shareable; a short debounce keeps the URL in step while
 * typing without a request per keystroke.
 */
export default function SearchPageInput({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  // Keep the field in sync when navigation changes the query (back/forward,
  // suggestion links).
  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const next = value.trim();
    if (next === initialQuery.trim()) return;
    const id = setTimeout(() => {
      router.replace(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
    }, 220);
    return () => clearTimeout(id);
  }, [value, initialQuery, router]);

  return (
    <form
      role="search"
      action="/search"
      className="flex items-center gap-3 rounded-lg border border-ink/20 bg-surface px-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15 sm:px-4"
      onSubmit={(e) => {
        e.preventDefault();
        const next = value.trim();
        router.replace(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
      }}
    >
      <SearchIcon className="size-5 shrink-0 text-accent" />
      <input
        name="q"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={SEARCH_PLACEHOLDER}
        aria-label="Search the reference"
        className="search-field-input min-w-0 flex-1 bg-transparent py-3 text-base text-ink placeholder:text-muted"
      />
    </form>
  );
}
