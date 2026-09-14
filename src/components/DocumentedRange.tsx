import Link from "next/link";
import { PEPTIDES, EVIDENCE_LABEL } from "@/lib/cycle-planner";
import { compoundTierClasses } from "@/components/evidence";
import type { CompoundTier } from "@/lib/evidence/compound";

// "Documented range" — a compact block for insight pages that reports the
// community/published reference range for a molecule, *labelled by provenance*,
// instead of leaving the reader to find an unsourced number elsewhere.
//
// This is the report-not-prescribe line made visible: the figure is reported as
// a convention with its evidence tier attached, never as a recommendation. The
// single source of truth is cycle-planner.ts — the range shown here is the same
// number the dosing tool and cycle planner already carry, so the three surfaces
// can never disagree.
//
// The planner grades its reference peptides on a four-step ladder (clinical →
// anecdotal); map to the shared compound-tier palette so one colour system holds
// site-wide, mirroring CyclePlanner.tsx.

const TIER: Record<string, CompoundTier> = {
  clinical: "Clinical",
  emerging: "Investigational",
  preclinical: "Preclinical",
  anecdotal: "Limited",
};

export function DocumentedRange({ id }: { id: string }) {
  const p = PEPTIDES[id];
  if (!p) return null;
  const range =
    p.doseLow === p.doseHigh ? `${p.doseLow}` : `${p.doseLow}–${p.doseHigh}`;

  return (
    <aside className="rounded-2xl border border-ink/10 bg-panel/40 p-5">
      <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
        Documented range — reported, not recommended
      </p>

      <p className="mt-2 font-display text-lg font-semibold text-ink">
        {range} mcg
        <span className="font-mono text-sm font-normal text-ink/50">
          {" "}
          · {p.route} · {p.perWeek}×/wk
        </span>
      </p>

      <p className="mt-2 text-[13px] leading-6 text-ink/55">
        A reference range reported in the community literature — not a prescription
        and not an approved human dose. {p.name} has no controlled human trials, so
        this figure is community convention, passed between research and bodybuilding
        communities, rather than clinical evidence of what is safe or effective.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${compoundTierClasses(
            TIER[p.evidence],
          )}`}
        >
          {EVIDENCE_LABEL[p.evidence]}
        </span>
        <Link
          href={`/tools/dosing?q=${encodeURIComponent(p.name)}`}
          className="text-xs text-accent-blue underline underline-offset-2 hover:text-ink"
        >
          Full dosing reference →
        </Link>
      </div>
    </aside>
  );
}
