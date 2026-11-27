"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export interface GlanceRow {
  slug: string;
  name: string;
  abbr?: string;
  receptor: string;
  evidence: string;
  evidenceClass: string;
  mw?: number;
  mwApprox?: boolean;
  halfLife?: string;
  halfLifeMin?: number;
}

type Key = "name" | "mw" | "halflife" | "evidence";

export function GlanceTable({ rows }: { rows: GlanceRow[] }) {
  const [sort, setSort] = useState<Key>("name");
  const ordered = useMemo(() => {
    return [...rows].sort((a, b) => {
      if (sort === "mw") return (a.mw ?? Infinity) - (b.mw ?? Infinity);
      if (sort === "halflife") return (a.halfLifeMin ?? Infinity) - (b.halfLifeMin ?? Infinity);
      if (sort === "evidence") return a.evidence.localeCompare(b.evidence);
      return a.name.localeCompare(b.name);
    });
  }, [rows, sort]);

  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/40">
            <Th onClick={() => setSort("name")} active={sort === "name"}>Molecule</Th>
            <th className="p-3 font-medium">Receptor</th>
            <Th onClick={() => setSort("evidence")} active={sort === "evidence"}>Evidence</Th>
            <Th onClick={() => setSort("mw")} active={sort === "mw"}>MW</Th>
            <Th onClick={() => setSort("halflife")} active={sort === "halflife"}>Half-life</Th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((row) => (
            <tr key={row.slug} className="border-t border-ink/[0.06]">
              <td className="p-3">
                <Link href={`/hormones/${row.slug}`} className="font-medium text-ink hover:text-accent">
                  {row.name}
                </Link>
                {row.abbr && <span className="ml-2 font-mono text-xs text-ink/40">{row.abbr}</span>}
              </td>
              <td className="max-w-xs p-3 text-ink/65">{row.receptor}</td>
              <td className="p-3">
                <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${row.evidenceClass}`}>{row.evidence}</span>
              </td>
              <td className="p-3 font-mono text-xs text-ink/70">
                {row.mw ? `${row.mwApprox ? "≈" : "~"}${row.mw.toLocaleString()}` : "—"}
              </td>
              <td className="p-3 text-ink/70">{row.halfLife ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, onClick, active }: { children: string; onClick: () => void; active: boolean }) {
  return (
    <th className="p-3 font-medium">
      <button type="button" onClick={onClick} className={active ? "text-accent" : "hover:text-ink"}>
        {children}
      </button>
    </th>
  );
}
