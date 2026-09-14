"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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

export default function InsightsBrowser() {
  const [family, setFamily] = useState<string>("all");
  const [query, setQuery] = useState("");

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
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search deep-dives… (e.g. GLP-1, muscle, oral, half-life)"
          aria-label="Search deep-dives"
          className="w-full rounded-xl border border-ink/15 bg-panel/40 px-4 py-2.5 text-[15px] text-ink outline-none placeholder:text-ink/35 focus:border-accent/60"
        />
        <div className="flex flex-wrap gap-2">
          <Chip active={family === "all"} onClick={() => setFamily("all")}>
            All families
          </Chip>
          {PRESENT_FAMILIES.map((f) => (
            <Chip
              key={f.slug}
              active={family === f.slug}
              accent={f.accent}
              onClick={() => setFamily(f.slug)}
            >
              {f.name}
            </Chip>
          ))}
        </div>
      </div>

      {hasFilter ? (
        <>
          <p className="mt-7 text-sm text-ink/45" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "deep-dive" : "deep-dives"}
            {family !== "all" && ` in ${getFamily(family)?.name}`}
            {q && ` matching “${query}”`}
          </p>
          {filtered.length === 0 ? (
            <EmptyState
              onClear={() => {
                setFamily("all");
                setQuery("");
              }}
            />
          ) : (
            <ArchiveGrid items={filtered} className="mt-4" />
          )}
        </>
      ) : (
        <>
          <section className="mt-10">
            <SectionLabel>Featured — start here</SectionLabel>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

/* ── Cards ─────────────────────────────────────────────────────────────── */

function FeaturedCard({ post }: { post: Insight }) {
  const fam = getFamily(post.family);
  const accent = fam?.accent ?? "text-accent";
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-panel/40 p-7 transition-colors hover:border-accent/30 hover:bg-panel"
    >
      {/* Family colour bar — bg-current reads the family accent text colour. */}
      <span className={`absolute inset-x-0 top-0 h-[3px] bg-current ${accent}`} aria-hidden />
      <div className="flex items-center justify-between gap-4">
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

function Chip({
  active,
  accent,
  onClick,
  children,
}: {
  active: boolean;
  accent?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? `border-accent/50 bg-accent/15 ${accent ?? "text-accent"}`
          : "border-ink/12 bg-panel/40 text-ink/55 hover:text-ink/85"
      }`}
    >
      {children}
    </button>
  );
}
