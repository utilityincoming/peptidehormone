"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  GOALS,
  PEPTIDES,
  LEVELS,
  WEEKS_MIN,
  WEEKS_MAX,
  MAX_PEPTIDES,
  EVIDENCE_LABEL,
  doseForLevel,
  supplyFor,
  weekFlags,
  courseLabel,
  summarizePlan,
  encodePlan,
  goalLabel,
  type PlanSnapshot,
  type PlanSummary,
  type Goal,
  type Level,
  type Peptide,
  type Evidence,
} from "@/lib/cycle-planner";

const ACCENT = "#E8B65A";

// Best-to-weakest, so the evidence snapshot reads top-down by strength.
const EVIDENCE_ORDER: Evidence[] = ["clinical", "emerging", "preclinical", "anecdotal"];

export interface PlannerInit {
  goal: string;
  weeks: number;
  level: Level;
  active: string[];
}

function clampWeeks(n: number): number {
  if (!Number.isFinite(n)) return WEEKS_MIN;
  return Math.min(WEEKS_MAX, Math.max(WEEKS_MIN, Math.round(n)));
}

function evidenceClass(e: string): string {
  switch (e) {
    case "clinical":
      return "border-accent-teal/40 bg-accent-teal/10 text-accent-teal";
    case "emerging":
      return "border-accent-blue/40 bg-accent-blue/10 text-accent-blue";
    case "preclinical":
      return "border-accent-purple/40 bg-accent-purple/10 text-accent-purple";
    default:
      return "border-accent-rose/40 bg-accent-rose/10 text-accent-rose";
  }
}

export default function CyclePlanner({
  init,
  compareInit = null,
}: {
  init: PlannerInit;
  compareInit?: PlanSnapshot | null;
}) {
  const [goal, setGoal] = useState<string>(init.goal);
  const [weeks, setWeeks] = useState<number>(clampWeeks(init.weeks));
  const [level, setLevel] = useState<Level>(init.level);
  const [active, setActive] = useState<string[]>(
    init.active.filter((id) => PEPTIDES[id]).slice(0, MAX_PEPTIDES),
  );
  const [saved, setSaved] = useState<PlanSnapshot | null>(compareInit);
  const [toast, setToast] = useState<string | null>(null);
  const [adderOpen, setAdderOpen] = useState(false);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const peptides = useMemo(
    () => active.map((id) => PEPTIDES[id]).filter(Boolean) as Peptide[],
    [active],
  );

  // ── URL state (g,w,l,p), with a try-catch fallback so a locked-down
  // sandbox that forbids history access never breaks the planner. ──
  useEffect(() => {
    try {
      const params = new URLSearchParams();
      params.set("g", goal);
      params.set("w", String(weeks));
      params.set("l", level);
      if (active.length) params.set("p", active.join(","));
      if (saved) params.set("c", encodePlan(saved));
      const url = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", url);
    } catch {
      /* history unavailable — plan still works, just not shareable */
    }
  }, [goal, weeks, level, active, saved]);

  const announce = useCallback((msg: string) => {
    if (liveRef.current) liveRef.current.textContent = msg;
  }, []);

  const applyGoal = (g: Goal) => {
    setGoal(g.id);
    setActive(g.stack.slice(0, MAX_PEPTIDES));
    announce(`${g.label} stack loaded: ${g.stack.length} peptides over ${weeks} weeks.`);
  };

  const addPeptide = (id: string) => {
    if (!PEPTIDES[id] || active.includes(id) || active.length >= MAX_PEPTIDES) return;
    setActive([...active, id]);
    setGoal("custom");
    setAdderOpen(false);
    announce(`${PEPTIDES[id].name} added.`);
  };

  const removePeptide = (id: string) => {
    setActive(active.filter((x) => x !== id));
    setGoal("custom");
    announce(`${PEPTIDES[id]?.name ?? "Peptide"} removed.`);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3200);
  };

  const addable = useMemo(
    () =>
      Object.values(PEPTIDES)
        .filter((p) => !active.includes(p.id))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [active],
  );

  const supply = useMemo(
    () => peptides.map((p) => supplyFor(p, level, weeks)),
    [peptides, level, weeks],
  );
  const totalVials = supply.reduce((s, l) => s + l.vials, 0);

  // Evidence composition of the current stack — powers the review snapshot.
  const evidenceBreakdown = useMemo(() => {
    const counts = new Map<Evidence, number>();
    for (const p of peptides) counts.set(p.evidence, (counts.get(p.evidence) ?? 0) + 1);
    return EVIDENCE_ORDER.filter((tier) => counts.has(tier)).map((tier) => ({
      tier,
      label: EVIDENCE_LABEL[tier],
      count: counts.get(tier) as number,
    }));
  }, [peptides]);

  const weekCols = Array.from({ length: weeks }, (_, i) => i + 1);
  const goalMeta = GOALS.find((g) => g.id === goal);

  // ── Save / compare ──
  const current: PlanSnapshot = useMemo(
    () => ({ goal, weeks, level, active }),
    [goal, weeks, level, active],
  );
  const savePlan = () => {
    setSaved(current);
    announce(`Saved ${goalLabel(goal)} as a comparison baseline.`);
    showToast("Plan saved — edit freely and compare below.");
  };
  const clearSaved = () => {
    setSaved(null);
    announce("Comparison cleared.");
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Shareable link copied — the URL carries the full protocol.");
    } catch {
      showToast("Couldn't copy automatically — copy the URL from your address bar.");
    }
  };
  const loadSaved = () => {
    if (!saved) return;
    setGoal(saved.goal);
    setWeeks(saved.weeks);
    setLevel(saved.level);
    setActive(saved.active);
    announce("Loaded the saved plan into the editor.");
  };
  const savedSummary = saved ? summarizePlan(saved) : null;
  const currentSummary = summarizePlan(current);

  return (
    <div className="space-y-10">
      {/* Print-only protocol header — populates the exported PDF */}
      <div className="cp-print-only border-b border-ink/20 pb-4">
        <p className="font-[family-name:var(--font-plex-mono)] text-xs uppercase tracking-wide text-ink/50">
          Protocol summary
        </p>
        <p className="mt-1 text-sm text-ink/80">
          {goalMeta ? goalMeta.label : "Custom stack"} · {weeks}-week cycle · {level} level ·{" "}
          {peptides.length} peptide{peptides.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* ── Quick-add goal stacks ── */}
      <section aria-labelledby="goals-h" className="cp-no-print">
        <h2 id="goals-h" className="mb-3 text-xs font-medium uppercase tracking-wide text-ink/40">
          Quick-add a goal stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g) => {
            const on = goal === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => applyGoal(g)}
                aria-pressed={on}
                title={g.blurb}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-amber)] ${
                  on
                    ? "border-transparent text-ink"
                    : "border-ink/12 bg-panel/40 text-ink/65 hover:border-[var(--accent-amber)]/50 hover:text-ink"
                }`}
                style={on ? { backgroundColor: `${ACCENT}26`, borderColor: `${ACCENT}80` } : undefined}
              >
                {g.label}
              </button>
            );
          })}
        </div>
        {goalMeta && (
          <p className="mt-3 text-sm text-ink/50">{goalMeta.blurb}</p>
        )}
      </section>

      {/* ── Cycle controls ── */}
      <section className="cp-no-print grid gap-5 rounded-2xl border border-ink/10 bg-surface p-6 sm:grid-cols-[1fr_1fr_auto]">
        <div>
          <label htmlFor="weeks" className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink/70">
            <span>Cycle length</span>
            <span className="font-[family-name:var(--font-plex-mono)] text-[var(--accent-amber)]">{weeks} wk</span>
          </label>
          <input
            id="weeks"
            type="range"
            min={WEEKS_MIN}
            max={WEEKS_MAX}
            step={1}
            value={weeks}
            onChange={(e) => setWeeks(clampWeeks(Number(e.target.value)))}
            className="w-full accent-[var(--accent-amber)]"
          />
          <div className="mt-1 flex justify-between font-[family-name:var(--font-plex-mono)] text-[10px] text-ink/30">
            <span>{WEEKS_MIN}</span>
            <span>{WEEKS_MAX}</span>
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink/70">Experience level</span>
          <div className="flex overflow-hidden rounded-xl border border-ink/15">
            {LEVELS.map((lv) => (
              <button
                key={lv}
                type="button"
                onClick={() => setLevel(lv)}
                aria-pressed={level === lv}
                className={`flex-1 px-2 py-2 text-sm capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent-amber)] ${
                  level === lv ? "text-ink" : "bg-panel/40 text-ink/50 hover:text-ink/80"
                }`}
                style={level === lv ? { backgroundColor: `${ACCENT}26` } : undefined}
              >
                {lv}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-ink/40">Sets where in each reference range doses land.</p>
        </div>

        <div className="flex items-end">
          <span className="font-[family-name:var(--font-plex-mono)] text-xs text-ink/45">
            {peptides.length}/{MAX_PEPTIDES} peptides
          </span>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section aria-labelledby="timeline-h">
        <h2 id="timeline-h" className="mb-4 font-display text-xl font-semibold">
          Week timeline
        </h2>
        {peptides.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 bg-panel/20 p-10 text-center text-ink/45">
            Pick a goal stack above, or add a peptide to start a protocol.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-surface p-5">
            <div className="min-w-[560px]">
              {/* Week header */}
              <div
                className="grid items-center gap-x-3 pb-2"
                style={{ gridTemplateColumns: `180px 1fr` }}
              >
                <span />
                <div
                  className="grid font-[family-name:var(--font-plex-mono)] text-[10px] uppercase tracking-wide text-ink/35"
                  style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}
                >
                  {weekCols.map((w) => (
                    <span key={w} className="text-center">W{w}</span>
                  ))}
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-2.5">
                {peptides.map((p, i) => (
                  <div
                    key={p.id}
                    className="grid items-center gap-x-3"
                    style={{ gridTemplateColumns: `180px 1fr` }}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: p.hue }} />
                        <span className="truncate text-sm text-ink/80">{p.name}</span>
                      </div>
                      <span className="ml-[18px] mt-0.5 block font-[family-name:var(--font-plex-mono)] text-[10px] text-ink/40">
                        {p.timing}{courseLabel(p) ? ` · ${courseLabel(p)}` : ""}
                      </span>
                    </div>
                    {(() => {
                      const flags = weekFlags(p, weeks);
                      return (
                        <div className="relative h-8 overflow-hidden rounded-md border border-ink/[0.06]">
                          {/* the signature scaleX grow track — one cell per week,
                              filled only on dosed weeks so short courses read as segments */}
                          <div
                            className="cp-bar absolute inset-0 grid"
                            style={{
                              gridTemplateColumns: `repeat(${weeks}, 1fr)`,
                              animationDelay: `${i * 70}ms`,
                            }}
                          >
                            {flags.map((on, w) => {
                              const runStart = on && (w === 0 || !flags[w - 1]);
                              return (
                                <span
                                  key={w}
                                  className="h-full border-l border-ink/[0.05] first:border-l-0"
                                  style={
                                    on
                                      ? {
                                          backgroundColor: `${p.hue}26`,
                                          borderLeft: runStart ? `3px solid ${p.hue}` : undefined,
                                        }
                                      : undefined
                                  }
                                />
                              );
                            })}
                          </div>
                          <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center font-[family-name:var(--font-plex-mono)] text-[11px] text-ink/75">
                            {p.perWeek}×/wk · {p.route}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add peptide */}
        {peptides.length < MAX_PEPTIDES && (
          <div className="cp-no-print mt-4">
            {!adderOpen ? (
              <button
                type="button"
                onClick={() => setAdderOpen(true)}
                className="rounded-full border border-ink/15 bg-panel/40 px-4 py-1.5 text-sm text-ink/70 transition-colors hover:border-[var(--accent-amber)]/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-amber)]"
              >
                + Add peptide
              </button>
            ) : (
              <label className="inline-flex items-center gap-2 text-sm text-ink/55">
                Add peptide
                <select
                  autoFocus
                  value=""
                  onChange={(e) => addPeptide(e.target.value)}
                  className="rounded-xl border border-ink/15 bg-panel/40 px-3 py-2 text-sm text-ink outline-none focus:border-[var(--accent-amber)]/60"
                >
                  <option value="" disabled>Choose a peptide…</option>
                  {addable.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </label>
            )}
          </div>
        )}
      </section>

      {/* ── Reference dosing table ── */}
      {peptides.length > 0 && (
        <section aria-labelledby="dosing-h">
          <h2 id="dosing-h" className="mb-4 font-display text-xl font-semibold">
            Reference dosing
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-ink/10">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Reference dosing ranges for the selected peptides</caption>
              <thead className="font-[family-name:var(--font-plex-mono)] text-[10px] uppercase tracking-wide text-ink/40">
                <tr className="border-b border-ink/10">
                  <th scope="col" className="p-3 font-medium">Peptide</th>
                  <th scope="col" className="p-3 font-medium">Reference dose</th>
                  <th scope="col" className="p-3 font-medium">This plan</th>
                  <th scope="col" className="p-3 font-medium">Frequency</th>
                  <th scope="col" className="p-3 font-medium">Route</th>
                  <th scope="col" className="p-3 font-medium">Timing</th>
                  <th scope="col" className="p-3 font-medium">Evidence</th>
                  <th scope="col" className="p-3" />
                </tr>
              </thead>
              <tbody>
                {peptides.map((p) => {
                  const dose = doseForLevel(p, level);
                  return (
                    <tr key={p.id} className="border-b border-ink/[0.06] last:border-0 align-top">
                      <th scope="row" className="p-3 font-normal">
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: p.hue }} />
                          <span className="text-ink/90">{p.name}</span>
                        </span>
                        <span className="mt-1 block max-w-[26ch] text-xs leading-5 text-ink/45">{p.note}</span>
                      </th>
                      <td className="p-3 font-[family-name:var(--font-plex-mono)] text-ink/70">
                        {p.doseLow === p.doseHigh ? `${p.doseLow}` : `${p.doseLow}–${p.doseHigh}`} mcg
                      </td>
                      <td className="p-3 font-[family-name:var(--font-plex-mono)] text-[var(--accent-amber)]">{dose} mcg</td>
                      <td className="p-3 font-[family-name:var(--font-plex-mono)] text-ink/70">
                        {p.perWeek}×/wk
                        {courseLabel(p) && (
                          <span className="mt-1 block text-[11px] text-[var(--accent-amber)]">{courseLabel(p)}</span>
                        )}
                      </td>
                      <td className="p-3 text-ink/70">{p.route}</td>
                      <td className="p-3 text-ink/70">
                        {p.timing ?? "—"}
                        {p.withFood && p.withFood !== "Any" && (
                          <span className="mt-1 block text-xs text-ink/40">{p.withFood}</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${evidenceClass(p.evidence)}`}>
                          {EVIDENCE_LABEL[p.evidence]}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        {p.catalogSlug && (
                          <Link href={`/hormones/${p.catalogSlug}`} className="text-xs text-[var(--accent-amber)] hover:underline">
                            Monograph →
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => removePeptide(p.id)}
                          aria-label={`Remove ${p.name}`}
                          className="cp-no-print ml-3 rounded-full px-1.5 text-ink/30 transition-colors hover:text-accent-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-rose"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Supply list + evidence snapshot ── */}
      {peptides.length > 0 && (
        <section className="grid gap-5 lg:grid-cols-[1fr_1.05fr]">
          <div className="rounded-2xl border border-ink/10 bg-surface p-6">
            <h2 className="mb-4 font-display text-xl font-semibold">Supply list</h2>
            <ul className="space-y-2.5">
              {supply.map((l) => (
                <li key={l.peptide.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-ink/75">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: l.peptide.hue }} />
                    {l.peptide.name}
                  </span>
                  <span className="font-[family-name:var(--font-plex-mono)] text-ink/55">
                    {l.vials} × {l.peptide.vialMg}mg vial
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="font-[family-name:var(--font-plex-mono)] text-xs uppercase tracking-wide text-ink/40">
                Vials needed
              </span>
              <span className="font-display text-2xl font-semibold text-[var(--accent-amber)]">
                {totalVials} vials
              </span>
            </div>
            <p className="mt-3 font-[family-name:var(--font-plex-mono)] text-[10px] leading-4 text-ink/35">
              Vial counts are estimates from typical sizes; reconstitution, waste, and titration
              change the real quantities.
            </p>
          </div>

          {/* Evidence snapshot — reviews the stack's support instead of selling it */}
          <div className="cp-no-print flex flex-col justify-between rounded-2xl border border-ink/10 bg-surface p-6">
            <div>
              <p className="font-[family-name:var(--font-plex-mono)] text-[10px] uppercase tracking-wide text-ink/40">
                Review this protocol
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">
                Evidence snapshot
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                How well-supported this {peptides.length}-compound, {weeks}-week stack is. Open any
                compound&apos;s monograph for the underlying studies before you rely on it.
              </p>
              <ul className="mt-4 space-y-2">
                {evidenceBreakdown.map(({ tier, label, count }) => (
                  <li key={tier} className="flex items-center justify-between gap-3 text-sm">
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${evidenceClass(tier)}`}>
                      {label}
                    </span>
                    <span className="font-[family-name:var(--font-plex-mono)] text-ink/55">
                      {count} compound{count === 1 ? "" : "s"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <button
                  type="button"
                  onClick={savePlan}
                  className="text-ink/55 underline decoration-ink/20 underline-offset-2 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-amber)]"
                >
                  {saved ? "Update saved plan" : "Save to compare"}
                </button>
                <button
                  type="button"
                  onClick={copyLink}
                  className="text-ink/55 underline decoration-ink/20 underline-offset-2 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-amber)]"
                >
                  Copy shareable link
                </button>
                <button
                  type="button"
                  onClick={() => { try { window.print(); } catch { showToast("Printing isn't available here."); } }}
                  className="text-ink/55 underline decoration-ink/20 underline-offset-2 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-amber)]"
                >
                  Export protocol PDF
                </button>
              </div>
              <p className="mt-4 border-t border-ink/10 pt-3 text-[11px] leading-4 text-ink/40">
                Educational reference only — not medical advice, and not a sourcing service. Verify
                legality and third-party testing in your region, and review any protocol with a
                qualified clinician.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Save / compare panel ── */}
      {saved && savedSummary && (
        <section aria-labelledby="compare-h" className="cp-no-print">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="compare-h" className="font-display text-xl font-semibold">Compare plans</h2>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={loadSaved}
                className="rounded-full border border-ink/15 px-3 py-1 text-ink/65 transition-colors hover:border-[var(--accent-amber)]/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-amber)]"
              >
                Load saved
              </button>
              <button
                type="button"
                onClick={clearSaved}
                className="rounded-full border border-ink/15 px-3 py-1 text-ink/45 transition-colors hover:text-accent-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-rose"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <PlanColumn tag="A · Saved" snapshot={saved} summary={savedSummary} />
            <PlanColumn
              tag="B · Current"
              snapshot={current}
              summary={currentSummary}
              accent
              vialDelta={currentSummary.totalVials - savedSummary.totalVials}
            />
          </div>
          <p className="mt-3 font-[family-name:var(--font-plex-mono)] text-[10px] text-ink/35">
            Each plan keeps its own length and level. This comparison is encoded in the URL — copy
            the address to share both side by side.
          </p>
        </section>
      )}

      {/* ── Research-use disclaimer (load-bearing — do not remove) ── */}
      <aside
        role="note"
        className="rounded-2xl border border-accent-amber/25 bg-accent-amber/[0.06] p-5"
      >
        <p className="font-[family-name:var(--font-plex-mono)] text-[11px] font-semibold uppercase tracking-wide text-[var(--accent-amber)]">
          ⚠ Research use only
        </p>
        <p className="mt-2 text-[13px] leading-6 text-ink/55">
          Not FDA-approved for human use. Educational only — not medical advice, a prescription, or a
          recommendation to acquire or use any substance. Most peptides listed here are research
          compounds with limited or no human safety data. Dosing figures are illustrative reference
          ranges from the published and community literature, not protocols. Consult a licensed
          clinician and verify the legal status of any compound in your jurisdiction.
        </p>
      </aside>

      {/* a11y: status region + toast */}
      <p ref={liveRef} className="sr-only" aria-live="polite" />
      {toast && (
        <div
          role="status"
          className="cp-no-print fixed inset-x-0 bottom-6 z-50 mx-auto w-fit max-w-[90vw] rounded-full border border-ink/15 bg-panel px-5 py-2.5 text-sm text-ink/85 shadow-lg"
        >
          {toast}
        </div>
      )}

      <style>{`
        @keyframes cpGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .cp-bar { transform-origin: left center; animation: cpGrow 620ms cubic-bezier(0.22,1,0.36,1) both; }
        .cp-print-only { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .cp-bar { animation: none; transform: none; }
        }
        @media print {
          /* A clean protocol sheet: drop site chrome and interactive controls,
             keep the timeline, dosing, supply, and the load-bearing disclaimer. */
          header, footer, .cp-no-print { display: none !important; }
          .cp-print-only { display: block !important; }
          .cp-bar { animation: none !important; transform: none !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}

function delta(n: number, money = false): string {
  const v = Math.abs(n).toLocaleString();
  if (n === 0) return "±0";
  return `${n > 0 ? "+" : "−"}${money ? "$" : ""}${v}`;
}

function PlanColumn({
  tag,
  snapshot,
  summary,
  accent,
  vialDelta,
}: {
  tag: string;
  snapshot: PlanSnapshot;
  summary: PlanSummary;
  accent?: boolean;
  vialDelta?: number;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-[var(--accent-amber)]/40 bg-[var(--accent-amber)]/[0.05]" : "border-ink/10 bg-panel/20"}`}>
      <p className="font-[family-name:var(--font-plex-mono)] text-[10px] uppercase tracking-wide text-ink/40">{tag}</p>
      <p className="mt-1 font-display text-lg font-semibold text-ink">{goalLabel(snapshot.goal)}</p>
      <p className="font-[family-name:var(--font-plex-mono)] text-xs text-ink/50">
        {snapshot.weeks} wk · {snapshot.level} · {summary.count} peptide{summary.count === 1 ? "" : "s"}
      </p>

      <div className="mt-4 flex items-end justify-between border-t border-ink/10 pt-4">
        <span className="font-[family-name:var(--font-plex-mono)] text-xs uppercase tracking-wide text-ink/40">
          Vials
        </span>
        <div className="text-right">
          <div className={`font-display text-2xl font-semibold ${accent ? "text-[var(--accent-amber)]" : "text-ink"}`}>
            {summary.totalVials} vials
          </div>
          {vialDelta !== undefined && vialDelta !== 0 && (
            <div className={`font-[family-name:var(--font-plex-mono)] text-[11px] ${vialDelta > 0 ? "text-accent-rose" : "text-accent-teal"}`}>
              {delta(vialDelta)} vs A
            </div>
          )}
        </div>
      </div>

      <ul className="mt-4 space-y-1.5">
        {summary.lines.map((l) => (
          <li key={l.peptide.id} className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-2 text-ink/70">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: l.peptide.hue }} />
              {l.peptide.name}
            </span>
            <span className="font-[family-name:var(--font-plex-mono)] text-ink/45">{l.vials} × {l.peptide.vialMg}mg</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
