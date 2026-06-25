"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HORMONES } from "@/lib/hormones";
import { FAMILIES } from "@/lib/families";

const FAMILY_MAP = Object.fromEntries(
  FAMILIES.map((f) => [f.slug, { name: f.name, accent: f.accent }]),
);

type Sort = "name" | "family";
const FAMILY_ORDER = Object.fromEntries(FAMILIES.map((f, i) => [f.slug, i]));

export default function CatalogBrowser() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("family");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = HORMONES.filter((h) => {
      if (family !== "all" && h.family !== family) return false;
      if (!q) return true;
      return [h.name, h.abbr ?? "", h.summary, h.class, h.source, h.receptor]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    return filtered.sort((a, b) => {
      if (sort === "family") {
        const fd = (FAMILY_ORDER[a.family] ?? 0) - (FAMILY_ORDER[b.family] ?? 0);
        if (fd !== 0) return fd;
      }
      return a.name.localeCompare(b.name);
    });
  }, [query, family, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search molecules, receptors, sources… (e.g. GPCR, pituitary, GLP-1)"
            className="flex-1 rounded-xl border border-ink/15 bg-panel/40 px-4 py-2.5 text-[15px] text-ink outline-none placeholder:text-ink/35 focus:border-accent/60"
          />
          <div className="flex shrink-0 overflow-hidden rounded-xl border border-ink/15 text-sm">
            {(["family", "name"] as Sort[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                className={`px-3.5 py-2.5 transition-colors ${
                  sort === s ? "bg-accent/20 text-accent" : "bg-panel/40 text-ink/50 hover:text-ink/80"
                }`}
              >
                {s === "family" ? "By family" : "A–Z"}
              </button>
            ))}
          </div>
        </div>

        {/* Family chips */}
        <div className="flex flex-wrap gap-2">
          <Chip active={family === "all"} onClick={() => setFamily("all")}>
            All
          </Chip>
          {FAMILIES.map((f) => (
            <Chip key={f.slug} active={family === f.slug} accent={f.accent} onClick={() => setFamily(f.slug)}>
              {f.name}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/45">
        {results.length} {results.length === 1 ? "molecule" : "molecules"}
        {family !== "all" && ` in ${FAMILY_MAP[family]?.name}`}
        {query && ` matching “${query}”`}
      </p>

      {/* Grid */}
      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-ink/10 bg-panel/30 p-10 text-center text-ink/50">
          No molecules match. Try a broader search or clear the filters.
        </div>
      ) : (
        <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((h) => {
            const fam = FAMILY_MAP[h.family];
            return (
              <Link
                key={h.slug}
                href={`/hormones/${h.slug}`}
                className="group flex flex-col bg-surface p-6 transition-colors hover:bg-panel"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`font-mono text-[11px] uppercase tracking-wide ${fam?.accent ?? "text-accent"}`}>
                    {fam?.name}
                  </span>
                  {h.abbr && <span className="font-mono text-[11px] text-ink/40">{h.abbr}</span>}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{h.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink/60">{h.summary}</p>
                <div className="mt-4 border-t border-ink/[0.06] pt-3 text-xs leading-5 text-ink/40">
                  {h.class}
                </div>
              </Link>
            );
          })}
        </div>
      )}
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
