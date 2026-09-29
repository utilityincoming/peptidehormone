"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * The search field on the /search page. Submits to /search?q=… so results are
 * server-rendered and shareable; a short debounce keeps the URL in step while
 * typing without a request per keystroke.
 */
export default function SearchPageInput({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

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
      onSubmit={(e) => {
        e.preventDefault();
        const next = value.trim();
        router.replace(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
      }}
    >
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        placeholder="Search molecules, insights, families, terms…"
        aria-label="Search the reference"
        className="w-full rounded-xl border border-ink/15 bg-panel/40 px-4 py-3 text-[15px] text-ink outline-none placeholder:text-ink/35 focus:border-accent/60"
      />
    </form>
  );
}
