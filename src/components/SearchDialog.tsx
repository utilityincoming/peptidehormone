"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SEARCH_INDEX, searchRecords } from "@/lib/search";
import { SEARCH_EXAMPLES, SEARCH_EXAMPLE_CLASS, SEARCH_PLACEHOLDER, SearchIcon, SearchResult } from "@/components/SearchPresentation";

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
      <SearchTrigger open={open} onClick={() => setOpen(true)} />
      {open && <Palette onClose={() => setOpen(false)} />}
    </>
  );
}

function SearchTrigger({ onClick, open }: { onClick: () => void; open: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search the reference"
      aria-haspopup="dialog"
      aria-expanded={open}
      title="Search the reference (Ctrl+K or Command+K)"
      className="inline-flex h-10 items-center gap-2 rounded-md border border-ink/15 bg-panel/70 px-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:bg-panel aria-expanded:border-accent/50 min-[360px]:px-3 xl:min-w-36"
    >
      <SearchIcon className="h-4 w-4 shrink-0 text-accent" />
      <span className="hidden min-[360px]:inline">Search</span>
      <kbd aria-hidden className="ml-auto hidden rounded-sm border border-ink/15 bg-surface px-1.5 py-0.5 font-mono text-xs text-secondary lg:inline">/</kbd>
    </button>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(
    () => searchRecords(query, SEARCH_INDEX, { limit: 24 }),
    [query],
  );

  function changeQuery(value: string) {
    setQuery(value);
    setActive(0);
  }

  // The native modal keeps focus in the palette and restores it on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    onClose();
  }, [onClose]);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === "ArrowDown") {
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
    [active, results, go, query],
  );

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const q = query.trim();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="palette-title"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      className="fixed inset-x-0 top-3 mx-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-2xl overflow-hidden rounded-xl border border-ink/15 bg-surface text-ink shadow-xl shadow-ink/15 backdrop:bg-ink/25 backdrop:backdrop-blur-[2px] sm:top-[10dvh]"
    >
      <div className="flex max-h-[calc(100dvh-1.5rem)] flex-col sm:max-h-[80dvh]">
        <div className="flex items-center justify-between gap-3 px-4 py-2 sm:px-5">
          <h2 id="palette-title" className="font-display text-lg font-semibold">Search the reference</h2>
          <button type="button" onClick={close} aria-label="Close search" className="grid size-9 shrink-0 place-items-center rounded-md bg-panel text-secondary hover:bg-surface-deep">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="mx-4 mb-4 flex items-center gap-3 rounded-lg border border-ink/20 bg-surface px-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15 sm:mx-5">
          <SearchIcon className="size-5 shrink-0 text-accent" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={SEARCH_PLACEHOLDER}
            aria-label="Search the reference"
            className="search-field-input min-w-0 flex-1 bg-transparent py-3 text-base text-ink placeholder:text-muted"
          />
        </div>

        {q === "" ? (
          <div className="overflow-y-auto border-t border-ink/10 bg-panel/60 px-4 py-4 sm:px-5">
            <p className="mb-2 text-sm font-medium text-secondary">Try a search</p>
            <div className="flex flex-wrap gap-2">
              {SEARCH_EXAMPLES.map((example) => (
                <button key={example} type="button" className={SEARCH_EXAMPLE_CLASS} onClick={() => {
                  changeQuery(example);
                  inputRef.current?.focus();
                }}>{example}</button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p role="status" className="overflow-y-auto wrap-break-word border-t border-ink/10 px-4 py-5 text-sm text-secondary sm:px-5">
            No matches for “{q}”. Try a shorter term or a different spelling.
          </p>
        ) : (
          <ul ref={listRef} className="min-h-0 divide-y divide-ink/10 overflow-y-auto overscroll-contain border-t border-ink/10">
            {results.map((result, index) => (
              <li key={result.id} data-index={index}>
                <button
                  type="button"
                  onClick={() => go(result.href)}
                  onMouseMove={() => setActive(index)}
                  className={`flex w-full items-center gap-3 border-l-2 px-3.5 py-3 text-left focus-visible:outline-offset-[-2px] sm:px-[18px] ${index === active ? "border-accent bg-panel" : "border-transparent hover:bg-panel/50"}`}
                >
                  <SearchResult result={result} compact />
                </button>
              </li>
            ))}
          </ul>
        )}

        {q !== "" && (
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-ink/10 px-4 py-3 text-sm sm:px-5">
            <span className="hidden text-secondary sm:inline">↑ ↓ Navigate · Enter to open</span>
            <Link href={`/search?q=${encodeURIComponent(q)}`} onClick={close} className="font-semibold text-accent hover:underline">
              View all results <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </dialog>
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
