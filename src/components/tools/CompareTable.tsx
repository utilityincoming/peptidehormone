import Link from "next/link";
import type { ReactNode } from "react";
import { getHormone, halfLifeForLink, type Hormone } from "@/lib/hormones";
import { FAMILIES } from "@/lib/families";
import { compoundTierClasses } from "@/components/evidence";
import { aliasesFor } from "@/lib/aliases";

const FAMILY_MAP = Object.fromEntries(
  FAMILIES.map((f) => [f.slug, { name: f.name, accent: f.accent }]),
);

function typeLabel(t?: Hormone["type"]): string {
  return t === "analog" ? "Analog" : t === "research" ? "Research" : "Endogenous";
}

function logBar(min: number, lo: number, hi: number): number {
  if (hi <= lo) return 1;
  const f = (Math.log10(min) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo));
  return 0.06 + 0.94 * Math.max(0, Math.min(1, f));
}

export function CompareTable({ hormones }: { hormones: Hormone[] }) {
  const hlValues = hormones.map((h) => h.halfLifeMin).filter((v): v is number => v != null);
  const hlLo = hlValues.length ? Math.min(...hlValues) : 1;
  const hlHi = hlValues.length ? Math.max(...hlValues) : 1;

  const rows: { label: string; render: (h: Hormone) => ReactNode }[] = [
    {
      label: "Also known as",
      render: (h) => {
        const aliases = aliasesFor(h.slug);
        return aliases.length ? (
          <span className="text-sm leading-6 text-ink/75">{aliases.join(", ")}</span>
        ) : (
          <span className="text-sm text-ink/30">—</span>
        );
      },
    },
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
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${compoundTierClasses(h.evidence ?? "Established")}`}>
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
    <div className="overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 w-32 bg-surface p-4 align-bottom" />
            {hormones.map((h) => (
              <th key={h.slug} className="min-w-[200px] border-l border-ink/[0.06] bg-surface p-4 align-bottom">
                <Link href={`/hormones/${h.slug}`} className="group">
                  <div className="font-display text-base font-semibold leading-snug text-ink group-hover:text-accent">
                    {h.name}
                  </div>
                  {h.abbr && <div className="font-mono text-xs text-ink/40">{h.abbr}</div>}
                </Link>
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
              {hormones.map((h) => (
                <td key={h.slug} className="border-l border-ink/[0.06] p-4 align-top">
                  {row.render(h)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
