"use client";

import { useMemo, useState } from "react";

type Unit = "min" | "h" | "d";
const UNIT_LABEL: Record<Unit, string> = { min: "minutes", h: "hours", d: "days" };
const LN2 = Math.LN2;

// Illustrative presets — generic, educational ranges, NOT dosing advice.
const PRESETS: { label: string; halfLife: string; interval: string; unit: Unit }[] = [
  { label: "Native peptide · t½ ~3 min", halfLife: "3", interval: "60", unit: "min" },
  { label: "Short-acting · t½ 6 h, daily", halfLife: "6", interval: "24", unit: "h" },
  { label: "Long-acting · t½ 5 d, weekly", halfLife: "5", interval: "7", unit: "d" },
  { label: "Long-acting · t½ 5 d, daily", halfLife: "5", interval: "1", unit: "d" },
];

function num(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : NaN;
}

function fmt(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  if (n !== 0 && Math.abs(n) < 0.01) return n.toExponential(1);
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}

// Format a duration given in `unit` into a readable string, promoting units.
function dur(value: number, unit: Unit): string {
  if (!Number.isFinite(value)) return "—";
  const mins = unit === "min" ? value : unit === "h" ? value * 60 : value * 1440;
  if (mins < 90) return `${fmt(mins, 1)} min`;
  const hrs = mins / 60;
  if (hrs < 48) return `${fmt(hrs, 1)} h`;
  const days = hrs / 24;
  if (days < 21) return `${fmt(days, 1)} d`;
  return `${fmt(days / 7, 1)} wk`;
}

// A catalogued compound with its native half-life pre-resolved to value+unit.
export type CompoundPreset = {
  slug: string;
  label: string;
  value: string;
  unit: Unit;
  group: string;
};

const DEFAULT_INTERVAL: Record<Unit, string> = { min: "60", h: "24", d: "1" };

export default function HalfLifeCalculator({
  initialHalfLife,
  initialUnit,
  compounds = [],
}: {
  initialHalfLife?: string;
  initialUnit?: Unit;
  compounds?: CompoundPreset[];
}) {
  const [unit, setUnit] = useState<Unit>(initialUnit ?? "h");
  const [halfLife, setHalfLife] = useState(initialHalfLife ?? "6");
  const [dose, setDose] = useState("100");
  const [interval, setInterval] = useState(initialUnit === "d" ? "1" : initialUnit === "min" ? "60" : "24");

  // Group the catalog compounds for the <optgroup> picker, preserving order.
  const compoundGroups = useMemo(() => {
    const groups: { group: string; items: CompoundPreset[] }[] = [];
    for (const c of compounds) {
      let g = groups.find((x) => x.group === c.group);
      if (!g) {
        g = { group: c.group, items: [] };
        groups.push(g);
      }
      g.items.push(c);
    }
    return groups;
  }, [compounds]);

  const loadCompound = (slug: string) => {
    const c = compounds.find((x) => x.slug === slug);
    if (!c) return;
    setUnit(c.unit);
    setHalfLife(c.value);
    setInterval(DEFAULT_INTERVAL[c.unit]);
  };

  const t12 = num(halfLife);
  const d = num(dose);
  const tau = num(interval);
  const ready = Number.isFinite(t12) && Number.isFinite(tau) && Number.isFinite(d);

  const k = LN2 / t12;

  // ── Single-dose duration of activity ──
  // fraction remaining = 0.5^(t / t½); time to fraction f = t½ · log2(1/f)
  const timeToFraction = (f: number) => t12 * Math.log2(1 / f);
  const durationRows = [
    { pct: "50%", t: timeToFraction(0.5) },
    { pct: "25%", t: timeToFraction(0.25) },
    { pct: "10%", t: timeToFraction(0.1) },
    { pct: "1% (≈ cleared)", t: timeToFraction(0.01) },
  ];

  // ── Repeated dosing → steady state ──
  const accumulation = 1 / (1 - Math.exp(-k * tau)); // peak multiple vs one dose
  const fluctuation = Math.exp(k * tau); // peak / trough at steady state
  const timeToSteady = t12 * Math.log2(20); // ~95% of steady state (~4.3 × t½)
  const peakSS = d * accumulation;
  const troughSS = peakSS / fluctuation;

  // ── Concentration-vs-time simulation (superposition of doses) ──
  const chart = useMemo(() => {
    if (!ready) return null;
    const nDoses = 8;
    const T = nDoses * tau;
    const N = 300;
    const single: number[] = [];
    const multi: number[] = [];
    let yMax = 0;
    for (let i = 0; i <= N; i++) {
      const t = (T * i) / N;
      const s = d * Math.pow(0.5, t / t12);
      let m = 0;
      for (let j = 0; j < nDoses; j++) {
        const td = j * tau;
        if (td <= t) m += d * Math.pow(0.5, (t - td) / t12);
      }
      single.push(s);
      multi.push(m);
      if (m > yMax) yMax = m;
    }
    const W = 600, H = 240, padX = 8, padTop = 16, padBottom = 8;
    const x = (i: number) => padX + ((W - 2 * padX) * i) / N;
    const y = (v: number) => padTop + (H - padTop - padBottom) * (1 - v / (yMax || 1));
    const toPath = (arr: number[]) =>
      arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
    const doseMarks = Array.from({ length: nDoses }, (_, j) => x((j * tau) / T * N));
    return { W, H, multiPath: toPath(multi), singlePath: toPath(single), doseMarks, ssY: y(peakSS) };
  }, [ready, d, t12, tau, peakSS]);

  return (
    <div className="space-y-8">
      {/* Load a real compound's native half-life from the catalog */}
      {compoundGroups.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-ink/55">
            Load from catalog
            <select
              value=""
              onChange={(e) => loadCompound(e.target.value)}
              className="ml-2 rounded-xl border border-ink/15 bg-panel/40 px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
            >
              <option value="" disabled>
                Choose a compound…
              </option>
              {compoundGroups.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.items.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <span className="text-xs text-ink/35">
            loads its reference half-life — then tune the interval below
          </span>
        </div>
      )}

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setUnit(p.unit);
              setHalfLife(p.halfLife);
              setInterval(p.interval);
            }}
            className="rounded-full border border-ink/12 bg-panel/40 px-3 py-1.5 text-xs text-ink/65 transition-colors hover:border-accent/50 hover:text-ink"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Inputs */}
        <div className="space-y-5 rounded-2xl border border-ink/10 bg-surface p-6">
          <div>
            <span className="mb-1.5 block text-sm font-medium text-ink/70">Time unit</span>
            <div className="flex overflow-hidden rounded-xl border border-ink/15">
              {(["min", "h", "d"] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`flex-1 px-3 py-2 text-sm transition-colors ${
                    unit === u ? "bg-accent/20 text-accent" : "bg-panel/40 text-ink/50 hover:text-ink/80"
                  }`}
                >
                  {UNIT_LABEL[u]}
                </button>
              ))}
            </div>
          </div>
          <NumberField label={`Half-life (t½), in ${UNIT_LABEL[unit]}`} value={halfLife} onChange={setHalfLife} />
          <NumberField label="Dose (relative units)" value={dose} onChange={setDose} />
          <NumberField label={`Dosing interval, in ${UNIT_LABEL[unit]}`} value={interval} onChange={setInterval} />
          <p className="text-xs leading-5 text-ink/40">
            A one-compartment, first-order model. &ldquo;Dose&rdquo; is relative —
            results scale with whatever amount you enter. Find a compound&rsquo;s
            half-life via the research agent or the literature.
          </p>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {/* Single-dose duration */}
          <div className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
            <h3 className="text-xs font-medium uppercase tracking-wide text-ink/45">
              How long one dose stays active
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
              {durationRows.map((r) => (
                <div key={r.pct}>
                  <div className="font-display text-lg font-semibold text-ink">{dur(r.t, unit)}</div>
                  <div className="text-xs text-ink/45">to {r.pct}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Steady state */}
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Accumulation" value={ready ? `${fmt(accumulation, 2)}×` : "—"} sub="peak vs a single dose" highlight />
            <Stat label="Peak : trough swing" value={ready ? `${fmt(fluctuation, 2)}×` : "—"} sub="fluctuation at steady state" />
            <Stat label="Time to steady state" value={dur(timeToSteady, unit)} sub="≈ 95% (4.3 × t½)" />
            <Stat label="Steady-state range" value={ready ? `${fmt(troughSS, 0)}–${fmt(peakSS, 0)}` : "—"} sub="trough → peak (your units)" />
          </div>
        </div>
      </div>

      {/* Chart */}
      {chart && (
        <div className="rounded-2xl border border-ink/10 bg-surface p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-base font-semibold">Bioactivity over the schedule</h3>
            <div className="flex items-center gap-4 text-xs text-ink/55">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)" }} /> your schedule
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-0 w-4 border-t-2 border-dashed" style={{ borderColor: "var(--accent-teal)" }} /> one dose
              </span>
            </div>
          </div>
          <svg viewBox={`0 0 ${chart.W} ${chart.H}`} className="w-full" role="img" aria-label="Plasma bioactivity over time across repeated doses">
            <line x1="0" y1={chart.ssY} x2={chart.W} y2={chart.ssY} stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
            {chart.doseMarks.map((mx, i) => (
              <line key={i} x1={mx} y1="0" x2={mx} y2={chart.H} stroke="var(--color-ink)" strokeOpacity="0.06" strokeWidth="1" />
            ))}
            <path d={chart.singlePath} fill="none" stroke="var(--accent-teal)" strokeWidth="2" strokeDasharray="5 5" opacity="0.7" />
            <path d={chart.multiPath} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
          </svg>
          <p className="mt-3 text-xs leading-5 text-ink/40">
            Tighter intervals relative to half-life accumulate higher and fluctuate
            less; wide intervals barely accumulate and swing more. Concentration
            math only — not medical or dosing advice.
          </p>
        </div>
      )}
    </div>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/70">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min="0"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/15 bg-panel/40 px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-accent/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
    </label>
  );
}

function Stat({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${highlight ? "border-accent/40 bg-accent/[0.07]" : "border-ink/10 bg-panel/30"}`}>
      <div className="text-xs font-medium uppercase tracking-wide text-ink/45">{label}</div>
      <div className={`mt-1 font-display text-2xl font-semibold ${highlight ? "text-accent" : "text-ink"}`}>{value}</div>
      <div className="mt-1 text-xs text-ink/45">{sub}</div>
    </div>
  );
}
