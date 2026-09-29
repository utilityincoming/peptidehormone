"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SEARCH_INDEX, searchRecords, type SearchKind } from "@/lib/search";

const KIND_LABEL: Record<SearchKind, string> = {
  Hormone: "Molecule",
  Insight: "Insight",
  Family: "Family",
  Term: "Glossary",
  Tool: "Page",
};

/**
 * Site-wide search: a header trigger plus a command-palette dialog. Opens on
 * click, on ⌘K / Ctrl-K, or on "/" (when not already typing). Full keyboard
 * navigation; results are the shared, dependency-free index so they match the
 * server-rendered /search page.
 */
export default function SearchDialog() {
  const [open, setOpen] = useState(false);

  // Global shortcuts to open the palette.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash =
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !isTypingTarget(e.target);
      if (cmdK || slash) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SearchTrigger onClick={() => setOpen(true)} />
      {open && <Palette onClose={() => setOpen(false)} />}
    </>
  );
}

function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search the reference"
      className="group flex items-center gap-2 rounded-full border border-ink/12 bg-panel/40 px-3 py-1.5 text-sm text-ink/50 transition-colors hover:border-ink/25 hover:text-ink/80"
    >
      <SearchIcon className="h-4 w-4" />
      <span className="hidden md:inline">Search</span>
      <kbd className="hidden rounded border border-ink/15 px-1.5 py-0.5 font-mono text-[10px] text-ink/40 md:inline">
        ⌘K
      </kbd>
    </button>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(
    () => searchRecords(query, SEARCH_INDEX, { limit: 24 }),
    [query],
  );

  // Reset the highlighted row whenever the result set changes.
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Focus the field on mount and lock background scroll while open.
  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const go = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const hit = results[active];
        if (hit) go(hit.href);
        else if (query.trim()) go(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [active, results, go, onClose, query],
  );

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const q = query.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-ink/12 bg-surface shadow-2xl"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-ink/[0.08] px-4">
          <SearchIcon className="h-5 w-5 shrink-0 text-ink/40" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search molecules, insights, families, terms…"
            aria-label="Search the reference"
            className="w-full bg-transparent py-4 text-[15px] text-ink outline-none placeholder:text-ink/35"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded border border-ink/12 px-1.5 py-0.5 font-mono text-[10px] text-ink/40 hover:text-ink/70"
          >
            Esc
          </button>
        </div>

        {q === "" ? (
          <p className="px-5 py-10 text-center text-sm text-ink/40">
            Start typing to search the reference.
          </p>
        ) : results.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-ink/45">
            No matches for “{q}”.
          </p>
        ) : (
          <ul ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
            {results.map((r, i) => (
              <li key={r.id} data-index={i}>
                <button
                  type="button"
                  onClick={() => go(r.href)}
                  onMouseMove={() => setActive(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === active ? "bg-panel" : "hover:bg-panel/50"
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-medium text-ink">
                      {r.title}
                    </span>
                    <span className="block truncate text-xs text-ink/45">{r.subtitle}</span>
                  </span>
                  <span className="shrink-0 rounded-full border border-ink/10 bg-panel/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink/40">
                    {KIND_LABEL[r.kind]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {q !== "" && (
          <div className="border-t border-ink/[0.08] px-4 py-2.5 text-right">
            <Link
              href={`/search?q=${encodeURIComponent(q)}`}
              onClick={onClose}
              className="text-xs font-medium text-accent hover:underline"
            >
              See all results for “{q}” →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
