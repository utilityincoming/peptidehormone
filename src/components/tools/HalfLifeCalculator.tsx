"use client";

import { useMemo, useState } from "react";

type Unit = "min" | "h" | "d";
const UNIT_LABEL: Record<Unit, string> = { min: "minutes", h: "hours", d: "days" };
const LN2 = Math.LN2;
const AXIS_NUMBER = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

function axisNumber(value: number): string {
  return value > 0 && value < 0.1 ? value.toExponential(1) : AXIS_NUMBER.format(value);
}

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
    if (!Number.isFinite(T)) return null;
    const N = 300;
    const single: number[] = [];
    const multi: number[] = [];
    let yMax = 0;
    for (let i = 0; i <= N; i++) {
      const t = T * (i / N);
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
    if (!Number.isFinite(yMax)) return null;
    const W = 600;
    const H = 240;
    const upper = Math.min(Number.MAX_VALUE, yMax * 1.12);
    const x = (progress: number) => W * progress;
    const y = (value: number) => H * (1 - value / upper);
    const toPath = (values: number[]) =>
      values.map((value, i) => `${i === 0 ? "M" : "L"} ${x(i / N).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");
    const doseMarks = Array.from({ length: nDoses }, (_, j) => x(j / nDoses));
    const steadyPeak = Number.isFinite(peakSS) && peakSS <= upper ? y(peakSS) : null;
    return {
      W, H, multiPath: toPath(multi), singlePath: toPath(single), doseMarks, steadyPeak,
      amountTicks: [upper, upper / 2, 0],
      timeTicks: [0, T / 2, T],
    };
  }, [ready, d, t12, tau, peakSS]);

  return (
    <div className="space-y-8">
      {/* Load a real compound's native half-life from the catalog */}
      {compoundGroups.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex max-w-full flex-col gap-2 text-sm text-ink/55 sm:flex-row sm:items-center">
            <span className="shrink-0">Load from catalog</span>
            <select
              value=""
              onChange={(e) => loadCompound(e.target.value)}
              className="min-w-0 max-w-full rounded-xl border border-ink/15 bg-panel/40 px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
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
        <figure className="rounded-xl border border-ink/15 bg-surface p-4 sm:p-6">
          <h3 className="font-display text-lg font-semibold">Modeled concentration over time</h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-secondary">
            <li className="flex items-center gap-2">
              <span aria-hidden className="w-5 border-t-2 border-accent" /> Repeated doses
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="w-5 border-t-2 border-dashed border-accent-teal" /> Single dose
            </li>
            {chart.steadyPeak !== null && (
              <li className="flex items-center gap-2">
                <span aria-hidden className="w-5 border-t-2 border-dotted border-accent/55" /> Steady-state peak
              </li>
            )}
          </ul>

          <div className="mt-5 rounded-lg border border-ink/10 bg-panel/55 px-3 py-4 sm:px-4">
            <p className="mb-3 text-xs font-medium text-secondary">Concentration (your units)</p>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 text-xs tabular-nums text-secondary sm:gap-x-3">
              <div className="flex flex-col justify-between text-right" aria-hidden>
                {chart.amountTicks.map((value, index) => <span key={index}>{axisNumber(value)}</span>)}
              </div>
              <svg
                viewBox={`0 0 ${chart.W} ${chart.H}`}
                preserveAspectRatio="none"
                className="h-44 w-full overflow-visible sm:h-64"
                role="img"
                aria-label={`Modeled concentration for repeated and single doses over ${axisNumber(chart.timeTicks[2])} ${UNIT_LABEL[unit]}. Concentration scale runs from 0 to ${axisNumber(chart.amountTicks[0])} in your units.`}
              >
                {[0, chart.H / 2, chart.H].map((y) => (
                  <line key={y} x1="0" y1={y} x2={chart.W} y2={y} stroke="currentColor" strokeOpacity=".22" />
                ))}
                {chart.doseMarks.map((x, index) => (
                  <line key={index} x1={x} x2={x} y1="0" y2={chart.H} stroke="currentColor" strokeOpacity=".1" />
                ))}
                {chart.steadyPeak !== null && (
                  <line x1="0" x2={chart.W} y1={chart.steadyPeak} y2={chart.steadyPeak}
                    stroke="var(--accent)" strokeDasharray="2 4" strokeOpacity=".55" vectorEffect="non-scaling-stroke" />
                )}
                <path d={`${chart.multiPath} L${chart.W} ${chart.H} L0 ${chart.H} Z`} fill="var(--accent)" fillOpacity=".07" />
                <path d={chart.singlePath} fill="none" stroke="var(--accent-teal)" strokeWidth="1.75"
                  strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                <path d={chart.multiPath} fill="none" stroke="var(--accent)" strokeWidth="2.25"
                  strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="col-start-2 mt-2 grid grid-cols-3 [&>:last-child]:text-right [&>:nth-child(2)]:text-center" aria-hidden>
                {chart.timeTicks.map((value, index) => <span key={index}>{axisNumber(value)}</span>)}
              </div>
              <p className="col-start-2 mt-2 text-center font-medium">Time ({UNIT_LABEL[unit]})</p>
            </div>
          </div>
          <figcaption className="mt-3 text-xs leading-5 text-secondary">
            The plot compares a single dose with the same amount repeated at the modeled interval.
            Educational concentration model only, not medical or dosing advice.
          </figcaption>
        </figure>
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
