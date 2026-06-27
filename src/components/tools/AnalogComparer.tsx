"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HORMONES, getHormone, halfLifeForLink, type Hormone } from "@/lib/hormones";
import { FAMILIES } from "@/lib/families";

const FAMILY_MAP = Object.fromEntries(
  FAMILIES.map((f) => [f.slug, { name: f.name, accent: f.accent }]),
);

function evidenceClass(tier: string): string {
  switch (tier) {
    case "Established":
      return "border-accent-teal/40 bg-accent-teal/10 text-accent-teal";
    case "Clinical":
      return "border-accent-blue/40 bg-accent-blue/10 text-accent-blue";
    case "Investigational":
      return "border-accent-amber/40 bg-accent-amber/10 text-accent-amber";
    case "Preclinical":
      return "border-accent-purple/40 bg-accent-purple/10 text-accent-purple";
    default:
      return "border-accent-rose/40 bg-accent-rose/10 text-accent-rose";
  }
}

function typeLabel(t?: Hormone["type"]): string {
  return t === "analog" ? "Analog" : t === "research" ? "Research" : "Endogenous";
}

// Lineage presets, derived from the data: every endogenous hormone that has at
// least one engineered analog, shown native-first so the contrast reads left→right.
const LINEAGES = HORMONES.filter((h) => h.type !== "analog" && h.type !== "research")
  .map((parent) => {
    const analogs = HORMONES.filter((h) => h.parent === parent.slug);
    return { parent, slugs: [parent.slug, ...analogs.map((a) => a.slug)] };
  })
  .filter((l) => l.slugs.length > 1)
  .sort((a, b) => b.slugs.length - a.slugs.length);

const MAX = 4;

// log scale, so a 1.5-min native and a 9,900-min weekly analog both stay legible.
function logBar(min: number, lo: number, hi: number): number {
  if (hi <= lo) return 1;
  const f = (Math.log10(min) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo));
  return 0.06 + 0.94 * Math.max(0, Math.min(1, f));
}

export default function AnalogComparer({ initialSlugs }: { initialSlugs?: string[] }) {
  const validInitial = (initialSlugs ?? []).filter((s) => getHormone(s)).slice(0, MAX);
  const defaultLineage = LINEAGES[0]?.slugs.slice(0, MAX) ?? [];
  const [slugs, setSlugs] = useState<string[]>(
    validInitial.length >= 2 ? validInitial : defaultLineage,
  );

  const selected = slugs.map((s) => getHormone(s)).filter(Boolean) as Hormone[];

  const addable = useMemo(
    () =>
      HORMONES.filter((h) => !slugs.includes(h.slug)).sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [slugs],
  );

  // half-life range across the current selection, for the comparison bars
  const hlValues = selected.map((h) => h.halfLifeMin).filter((v): v is number => v != null);
  const hlLo = hlValues.length ? Math.min(...hlValues) : 1;
  const hlHi = hlValues.length ? Math.max(...hlValues) : 1;

  const add = (slug: string) => {
    if (slug && slugs.length < MAX && !slugs.includes(slug)) setSlugs([...slugs, slug]);
  };
  const remove = (slug: string) => setSlugs(slugs.filter((s) => s !== slug));

  const rows: { label: string; render: (h: Hormone) => React.ReactNode }[] = [
    {
      label: "Type",
      render: (h) => (
        <span className="rounded-full border border-ink/15 bg-panel/50 px-2.5 py-0.5 text-xs font-medium text-ink/70">
          {typeLabel(h.type)}
        </span>
      ),
    },
    {
      label: "Evidence",
      render: (h) => (
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${evidenceClass(h.evidence ?? "Established")}`}>
          {h.evidence ?? "Established"}
        </span>
      ),
    },
    {
      label: "Family",
      render: (h) => (
        <Link href={`/families/${h.family}`} className={`text-sm hover:underline ${FAMILY_MAP[h.family]?.accent ?? "text-accent"}`}>
          {FAMILY_MAP[h.family]?.name ?? h.family}
        </Link>
      ),
    },
    { label: "Class", render: (h) => <span className="text-sm leading-6 text-ink/75">{h.class}</span> },
    { label: "Receptor", render: (h) => <span className="text-sm leading-6 text-ink/75">{h.receptor}</span> },
    {
      label: "Molecular weight",
      render: (h) =>
        h.mw ? (
          <span className="font-mono text-sm text-ink/80">
            {h.mwApprox ? "≈" : "~"}
            {h.mw.toLocaleString()} Da
          </span>
        ) : (
          <span className="text-sm text-ink/30">—</span>
        ),
    },
    {
      label: "Half-life",
      render: (h) =>
        h.halfLifeMin != null ? (
          <div>
            <div className="font-mono text-sm text-ink/85">{h.halfLife}</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${logBar(h.halfLifeMin, hlLo, hlHi) * 100}%` }}
              />
            </div>
            {(() => {
              const { value, unit } = halfLifeForLink(h.halfLifeMin);
              return (
                <Link
                  href={`/tools/half-life?t12=${value}&unit=${unit}`}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-accent transition-transform hover:translate-x-0.5"
                >
                  Model dosing <span aria-hidden>→</span>
                </Link>
              );
            })()}
          </div>
        ) : (
          <span className="text-sm text-ink/30">{h.halfLife ?? "—"}</span>
        ),
    },
    {
      label: "Based on",
      render: (h) => {
        const parent = h.parent ? getHormone(h.parent) : undefined;
        return parent ? (
          <Link href={`/hormones/${parent.slug}`} className="text-sm text-accent hover:underline">
            {parent.name}
          </Link>
        ) : (
          <span className="text-sm text-ink/40">Native hormone</span>
        );
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Lineage presets */}
      <div>
        <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink/35">
          Lineages — a native hormone and the analogs engineered from it
        </span>
        <div className="flex flex-wrap gap-2">
          {LINEAGES.map((l) => (
            <button
              key={l.parent.slug}
              type="button"
              onClick={() => setSlugs(l.slugs.slice(0, MAX))}
              className="rounded-full border border-ink/12 bg-panel/40 px-3 py-1.5 text-xs text-ink/65 transition-colors hover:border-accent/50 hover:text-ink"
            >
              {l.parent.abbr ?? l.parent.name}
              <span className="ml-1.5 text-ink/35">+{l.slugs.length - 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add / picker */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-ink/55">
          Add molecule
          <select
            value=""
            onChange={(e) => add(e.target.value)}
            disabled={slugs.length >= MAX}
            className="ml-2 rounded-xl border border-ink/15 bg-panel/40 px-3 py-2 text-sm text-ink outline-none focus:border-accent/60 disabled:opacity-40"
          >
            <option value="" disabled>
              {slugs.length >= MAX ? `Max ${MAX} reached` : "Choose…"}
            </option>
            {addable.map((h) => (
              <option key={h.slug} value={h.slug}>
                {h.name}
                {h.abbr ? ` (${h.abbr})` : ""}
              </option>
            ))}
          </select>
        </label>
        <span className="text-xs text-ink/35">
          {selected.length} of {MAX} selected
        </span>
      </div>

      {/* Comparison table */}
      {selected.length < 2 ? (
        <div className="rounded-2xl border border-ink/10 bg-panel/30 p-10 text-center text-ink/50">
          Pick a lineage above, or add at least two molecules to compare.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ink/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-32 bg-surface p-4 align-bottom" />
                {selected.map((h) => (
                  <th key={h.slug} className="min-w-[200px] border-l border-ink/[0.06] bg-surface p-4 align-bottom">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/hormones/${h.slug}`} className="group">
                        <div className="font-display text-base font-semibold leading-snug text-ink group-hover:text-accent">
                          {h.name}
                        </div>
                        {h.abbr && <div className="font-mono text-xs text-ink/40">{h.abbr}</div>}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(h.slug)}
                        aria-label={`Remove ${h.name}`}
                        className="shrink-0 rounded-full px-1.5 text-ink/30 transition-colors hover:text-accent-rose"
                      >
                        ✕
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-ink/[0.06]">
                  <th className="sticky left-0 z-10 bg-surface p-4 align-top text-xs font-medium uppercase tracking-wide text-ink/40">
                    {row.label}
                  </th>
                  {selected.map((h) => (
                    <td key={h.slug} className="border-l border-ink/[0.06] p-4 align-top">
                      {row.render(h)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs leading-5 text-ink/40">
        Half-life bars are on a logarithmic scale across the molecules shown, so a
        minutes-long native peptide and a once-weekly analog stay legible together.
        Reference values for the native or representative form — educational only,
        not medical or dosing advice.
      </p>
    </div>
  );
}
