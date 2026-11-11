"use client";

import { useCallback, useId, useRef, useState } from "react";
import Link from "next/link";

/* ── Hero timeline ───────────────────────────────────────────────────────────
   The homepage's lead figure: how much of a single dose is still circulating,
   day by day, for native GLP-1 and the three molecules engineered from it. The
   reader scrubs time (slider, keyboard, or drag on the plot) and each card
   reports what is left. Every card carries its evidence grade and regulatory
   standing, because the newest molecule on the chart is not an approved drug.

   Data is resolved on the server (src/app/page.tsx) from the catalog and the
   regulatory table and passed in as plain props, so this file holds no facts
   of its own — only the drawing and the arithmetic.

   The curves are first-order elimination from one dose, fraction = ½^(t/t½).
   That is a deliberate simplification (no absorption phase, no accumulation)
   and the figure says so in its footnote. */

export interface TimelineSeries {
  slug: string;
  name: string;
  /** Market nickname, shown quoted (e.g. "GLP-3"). */
  alias?: string;
  /** Representative half-life in minutes. */
  halfLifeMin: number;
  /** Short display half-life, e.g. "~6 days". */
  halfLifeLabel: string;
  /** Receptors engaged, in order. */
  receptors: string[];
  /** CSS colour for the curve and swatch. */
  color: string;
  /** Emphasised series (drawn heavier). */
  lead?: boolean;
  /** Evidence-tier chip: label + classes. Absent for native hormones. */
  tier?: { label: string; classes: string };
  /** Regulatory chip: label + classes. */
  regulatory: { label: string; classes: string };
}

const DAYS = 14;
const DAY_MIN = 1440;
// Plot box in SVG units. The SVG stretches (preserveAspectRatio="none") and
// strokes are non-scaling, so these are just a coordinate system.
const W = 1000;
const H = 300;

function fraction(halfLifeMin: number, day: number): number {
  return Math.pow(0.5, (day * DAY_MIN) / halfLifeMin);
}

function curvePath(halfLifeMin: number): string {
  const pts: string[] = [];
  const steps = 140;
  for (let s = 0; s <= steps; s++) {
    // Sample densely near t=0 so a minutes-long half-life reads as a cliff.
    const day = DAYS * Math.pow(s / steps, 2.2);
    const x = (day / DAYS) * W;
    const y = H - fraction(halfLifeMin, day) * H;
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${pts.join(" L")}`;
}

function percent(f: number): string {
  if (f >= 0.995) return "100%";
  if (f < 0.001) return "<0.1%";
  if (f < 0.1) return `${(f * 100).toFixed(1)}%`;
  return `${Math.round(f * 100)}%`;
}

function dayLabel(day: number): string {
  if (day === 0) return "The moment of dosing";
  if (day < 1) return `${Math.round(day * 24)} hours after one dose`;
  return `Day ${Number.isInteger(day) ? day : day.toFixed(1)} after one dose`;
}

export default function HeroTimeline({ series }: { series: TimelineSeries[] }) {
  const [day, setDay] = useState(7);
  const plotRef = useRef<HTMLDivElement>(null);
  const sliderId = useId();

  const scrubTo = useCallback((clientX: number) => {
    const box = plotRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    const raw = ((clientX - box.left) / box.width) * DAYS;
    setDay(Math.min(DAYS, Math.max(0, Math.round(raw * 4) / 4)));
  }, []);

  const cursorPct = (day / DAYS) * 100;
  // The shortest-lived series is the cliff at the left edge.
  const native = series.reduce<TimelineSeries | undefined>(
    (m, s) => (!m || s.halfLifeMin < m.halfLifeMin ? s : m),
    undefined,
  );

  return (
    <div>
      {/* ── Plot ── */}
      <div className="relative pl-9 sm:pl-11">
        <div
          ref={plotRef}
          className="relative h-52 cursor-ew-resize touch-pan-y select-none sm:h-72"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            scrubTo(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1 || e.pointerType === "touch") scrubTo(e.clientX);
          }}
        >
          {/* y-axis labels, hung in the left gutter of the plot itself */}
          <div
            className="pointer-events-none absolute inset-y-0 right-full w-9 font-mono text-[11px] text-ink/60 sm:w-11"
            aria-hidden
          >
            <span className="absolute right-2 top-0 -translate-y-1/2">100%</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2">50%</span>
            <span className="absolute bottom-0 right-2 translate-y-1/2">0</span>
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="curve-reveal absolute inset-0 h-full w-full overflow-visible"
            role="img"
            aria-label={`Fraction of a single dose still circulating over ${DAYS} days. Native GLP-1 falls to nothing within the first hour; the engineered analogs take about a week to fall by half.`}
          >
            {/* frame + gridlines */}
            {[0, 0.5, 1].map((f) => (
              <line
                key={f}
                x1="0"
                x2={W}
                y1={H - f * H}
                y2={H - f * H}
                stroke="var(--ink)"
                strokeOpacity={f === 0.5 ? 0.22 : 0.1}
                strokeDasharray={f === 0.5 ? "4 6" : undefined}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {Array.from({ length: DAYS + 1 }, (_, d) => (
              <line
                key={d}
                x1={(d / DAYS) * W}
                x2={(d / DAYS) * W}
                y1="0"
                y2={H}
                stroke="var(--ink)"
                strokeOpacity={d % 7 === 0 ? 0.12 : 0.05}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {/* curves — lead series last so it sits on top */}
            {[...series]
              .sort((a, b) => Number(a.lead ?? false) - Number(b.lead ?? false))
              .map((s) => (
                <path
                  key={s.slug}
                  d={curvePath(s.halfLifeMin)}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={s.lead ? 3.5 : 2.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
          </svg>

          {/* the cliff, named — otherwise the native curve reads as an axis */}
          {native && (
            <p
              className="pointer-events-none absolute left-3 top-[58%] max-w-[9.5rem] text-xs leading-4 sm:left-4 sm:max-w-none sm:text-sm"
              style={{ color: native.color }}
            >
              ← {native.name}: gone within the hour
            </p>
          )}

          {/* cursor + points (HTML, so dots stay round when the SVG stretches) */}
          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-ink/50"
            style={{ left: `${cursorPct}%` }}
            aria-hidden
          />
          {series.map((s) => (
            <span
              key={s.slug}
              className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-surface"
              style={{
                left: `${cursorPct}%`,
                top: `${(1 - fraction(s.halfLifeMin, day)) * 100}%`,
                backgroundColor: s.color,
              }}
              aria-hidden
            />
          ))}
        </div>

        {/* x-axis labels */}
        <div className="relative mt-2 h-4 font-mono text-[11px] text-ink/60" aria-hidden>
          <span className="absolute left-0">dose</span>
          <span className="absolute left-1/2 -translate-x-1/2">day 7</span>
          <span className="absolute right-0">day 14</span>
        </div>

        {/* scrubber */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <label htmlFor={sliderId} className="shrink-0 text-sm font-medium text-ink/90 sm:w-56">
            {dayLabel(day)}
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={DAYS}
            step={0.25}
            value={day}
            onChange={(e) => setDay(parseFloat(e.target.value))}
            aria-valuetext={dayLabel(day)}
            className="hero-range w-full"
          />
        </div>
      </div>

      {/* ── What is left, molecule by molecule ── */}
      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {series.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/hormones/${s.slug}`}
              className={`group flex h-full flex-col rounded-2xl border p-4 transition-colors hover:bg-panel ${
                s.lead ? "border-accent/50 bg-panel/70" : "border-ink/10 bg-surface/70"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="flex items-center gap-2 font-display text-base font-semibold">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                    aria-hidden
                  />
                  {s.name}
                </span>
                <span
                  className="font-mono text-lg font-semibold tabular-nums"
                  style={{ color: s.color }}
                >
                  {percent(fraction(s.halfLifeMin, day))}
                </span>
              </div>

              <p className="mt-1 text-xs text-ink/60">
                {s.alias ? <>Sold informally as &ldquo;{s.alias}&rdquo; · </> : null}
                half-life {s.halfLifeLabel}
              </p>

              <p className="mt-3 flex items-center gap-2 text-xs text-ink/75">
                <span className="flex gap-1" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full border"
                      style={{
                        borderColor: s.color,
                        backgroundColor: i < s.receptors.length ? s.color : "transparent",
                        opacity: i < s.receptors.length ? 1 : 0.35,
                      }}
                    />
                  ))}
                </span>
                {s.receptors.join(" + ")}
              </p>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {s.tier && (
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.tier.classes}`}
                  >
                    {s.tier.label}
                  </span>
                )}
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.regulatory.classes}`}
                >
                  {s.regulatory.label}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
