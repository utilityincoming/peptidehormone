"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchIcon } from "@/components/SearchPresentation";
import { INSIGHTS, featuredInsights, type Insight } from "@/lib/insights";
import { FAMILIES, getFamily } from "@/lib/families";

const FEATURED = featuredInsights();
const FEATURED_SLUGS = new Set(FEATURED.map((i) => i.slug));

// Only the families that actually carry a deep-dive, in canonical FAMILIES order,
// so the filter never offers an empty bucket.
const PRESENT_FAMILIES = FAMILIES.filter((f) =>
  INSIGHTS.some((i) => i.family === f.slug),
);

// Unfiltered view lists the featured picks in their own band; the archive grid
// holds everything else so nothing is shown twice.
const ARCHIVE = INSIGHTS.filter((i) => !FEATURED_SLUGS.has(i.slug));

const FILTERS_CHANGED = "insights-filters-changed";

function subscribeToFilters(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(FILTERS_CHANGED, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(FILTERS_CHANGED, onChange);
  };
}

function getFilterSnapshot() {
  return window.location.search;
}

export default function InsightsBrowser() {
  const routeParams = useSearchParams();
  // Read browser edits synchronously so fast typing does not wait for a router transition.
  const search = useSyncExternalStore(subscribeToFilters, getFilterSnapshot, () => routeParams.toString());
  const params = new URLSearchParams(search);
  const requestedFamily = params.get("family");
  const family = PRESENT_FAMILIES.find((item) => item.slug === requestedFamily)?.slug ?? "all";
  const query = params.get("q") ?? "";

  const q = query.trim().toLowerCase();
  const hasFilter = family !== "all" || q !== "";

  const filtered = useMemo(() => {
    return INSIGHTS.filter((i) => {
      if (family !== "all" && i.family !== family) return false;
      if (!q) return true;
      return `${i.title} ${i.dek}`.toLowerCase().includes(q);
    });
  }, [family, q]);

  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_minmax(13rem,auto)]">
        <div className="flex items-center gap-3 rounded-lg border border-ink/20 bg-surface px-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15">
          <SearchIcon className="size-5 shrink-0 text-accent" />
          <input
            type="search"
            value={query}
            onChange={(event) => updateFilters({ q: event.target.value })}
            placeholder="Search Insights"
            aria-label="Search deep-dives"
            className="search-field-input min-w-0 flex-1 bg-transparent py-2.5 text-base text-ink placeholder:text-muted"
          />
        </div>
        <select
          value={family}
          onChange={(event) => updateFilters({ family: event.target.value === "all" ? "" : event.target.value })}
          aria-label="Filter by signaling family"
          className="w-full min-w-0 rounded-lg border border-ink/20 bg-surface px-3 py-2.5 text-base text-ink"
        >
          <option value="all">All signaling families</option>
          {PRESENT_FAMILIES.map((item) => (
            <option key={item.slug} value={item.slug}>{item.name}</option>
          ))}
        </select>
      </div>

      {hasFilter ? (
        <>
          <p className="mt-5 wrap-break-word text-sm text-ink/45" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "deep-dive" : "deep-dives"}
            {family !== "all" && ` in ${getFamily(family)?.name}`}
            {q && ` matching “${query}”`}
          </p>
          {filtered.length === 0 ? (
            <EmptyState onClear={() => updateFilters({ q: "", family: "" })} />
          ) : (
            <ArchiveGrid items={filtered} className="mt-4" />
          )}
        </>
      ) : (
        <>
          <section className="mt-6">
            <SectionLabel>Featured — start here</SectionLabel>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {FEATURED.map((post) => (
                <FeaturedCard key={post.slug} post={post} />
              ))}
            </div>
          </section>

          <section className="mt-14">
            <SectionLabel>More deep-dives</SectionLabel>
            <ArchiveGrid items={ARCHIVE} className="mt-4" />
          </section>
        </>
      )}
    </div>
  );
}

function updateFilters(filters: Partial<Record<"q" | "family", string>>) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(filters)) {
    if (value === "") url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }

  // Keep the filtered URL for Back from an article without adding a step per keystroke.
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(FILTERS_CHANGED));
}

/* ── Cards ─────────────────────────────────────────────────────────────── */

function FeaturedCard({ post }: { post: Insight }) {
  const fam = getFamily(post.family);
  const accent = fam?.accent ?? "text-accent";
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-panel/40 p-5 transition-colors sm:p-6 hover:border-accent/30 hover:bg-panel"
    >
      {/* Family colour bar — bg-current reads the family accent text colour. */}
      <span className={`absolute inset-x-0 top-0 h-[3px] bg-current ${accent}`} aria-hidden />
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <FamilyLabel accent={accent}>{fam?.name ?? "Peptide science"}</FamilyLabel>
        <Meta post={post} />
      </div>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-snug">{post.title}</h3>
      <p className="mt-2.5 line-clamp-3 text-[15px] leading-7 text-ink/60">{post.dek}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform group-hover:translate-x-0.5">
        Read the deep-dive <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

function ArchiveGrid({ items, className = "" }: { items: Insight[]; className?: string }) {
  return (
    <div
      className={`grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {items.map((post) => (
        <ArchiveCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

function ArchiveCard({ post }: { post: Insight }) {
  const fam = getFamily(post.family);
  const accent = fam?.accent ?? "text-accent";
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex flex-col bg-surface p-6 transition-colors hover:bg-panel"
    >
      <FamilyLabel accent={accent} dot>
        {fam?.name ?? "Peptide science"}
      </FamilyLabel>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{post.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-ink/60">{post.dek}</p>
      <div className="mt-4 flex items-center justify-between border-t border-ink/[0.06] pt-3">
        <Meta post={post} />
        <span
          className="text-accent opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        >
          →
        </span>
      </div>
    </Link>
  );
}

/* ── Bits ──────────────────────────────────────────────────────────────── */

function FamilyLabel({
  accent,
  dot = false,
  children,
}: {
  accent: string;
  dot?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide ${accent}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}

function Meta({ post }: { post: Insight }) {
  return (
    <span className="shrink-0 font-mono text-[11px] text-ink/40">
      {post.readingMinutes} min · {post.reviewed}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink/40">
      {children}
    </h2>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-6 rounded-2xl border border-ink/10 bg-panel/30 p-10 text-center text-ink/55">
      No deep-dives match that filter.{" "}
      <button type="button" onClick={onClear} className="font-medium text-accent hover:underline">
        Clear filters
      </button>
    </div>
  );
}
