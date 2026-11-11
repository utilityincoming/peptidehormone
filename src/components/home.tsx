import { getHormone } from "@/lib/hormones";

/* ── Homepage graphics ───────────────────────────────────────────────────────
   Server-rendered SVG + HTML, no client JS. Numbers come from the catalog data
   (lib/hormones) wherever a figure is quoted, so the landing page cannot drift
   from the monographs it links to. */

/** Compact half-life label from minutes: "~2 min", "~13 h", "~7 days". */
export function shortHalfLife(min: number): string {
  if (min < 90) return `~${Math.round(min)} min`;
  const h = min / 60;
  if (h < 48) return `~${Math.round(h)} h`;
  return `~${Math.round(h / 24)} days`;
}

/* ── Tool previews ──
   One small picture per tool card, each showing what the tool actually draws. */

export type ToolPreviewKind = "half-life" | "compare" | "cycle";

export function ToolPreview({ kind }: { kind: ToolPreviewKind }) {
  if (kind === "half-life") return <AccumulationPreview />;
  if (kind === "compare") return <AnalogPreview />;
  return <CyclePreview />;
}

function PreviewFrame({ children, note }: { children: React.ReactNode; note: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-surface-deep/60 p-4">
      <div className="flex h-24 flex-col justify-center">{children}</div>
      <p className="mt-3 font-mono text-[11px] leading-4 text-ink/60">{note}</p>
    </div>
  );
}

/** Repeat dosing at an interval equal to the half-life: peaks settle at 2×. */
function AccumulationPreview() {
  const W = 240;
  const H = 96;
  const doses = 6;
  const yFor = (c: number) => H - 8 - (c / 2.15) * (H - 16);
  // Start on the axis so the first dose reads as a rise, like the rest.
  const pts: string[] = [`0 ${yFor(0).toFixed(1)}`];
  for (let s = 0; s <= doses * 24; s++) {
    const t = s / 24;
    let c = 0;
    for (let k = 0; k <= Math.floor(t) && k < doses; k++) c += Math.pow(0.5, t - k);
    const x = (t / doses) * W;
    // Draw the vertical jump at each dose.
    if (s % 24 === 0 && s > 0 && s < doses * 24) {
      pts.push(`${x.toFixed(1)} ${yFor(c - 1).toFixed(1)}`);
    }
    pts.push(`${x.toFixed(1)} ${yFor(c).toFixed(1)}`);
  }
  return (
    <PreviewFrame note="Dose every half-life → peaks settle at 2× the first dose">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden>
        <line
          x1="0"
          x2={W}
          y1={yFor(2)}
          y2={yFor(2)}
          stroke="var(--ink)"
          strokeOpacity="0.3"
          strokeDasharray="3 4"
        />
        <path
          d={`M${pts.join(" L")}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </PreviewFrame>
  );
}

/** Native hormone beside two analogs engineered from it, on a log axis. */
function AnalogPreview() {
  const rows = ["glp-1", "liraglutide", "semaglutide"]
    .map((slug) => getHormone(slug))
    .filter((h) => h?.halfLifeMin != null)
    .map((h) => ({ name: h!.abbr ?? h!.name, min: h!.halfLifeMin! }));
  const max = Math.max(...rows.map((r) => r.min), 10);
  return (
    <PreviewFrame note="Half-life, log scale — native GLP-1 vs two analogs">
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-[5.5rem_1fr_3.75rem] items-center gap-2">
            <span className="truncate text-xs text-ink/75">{r.name}</span>
            <span className="h-2 rounded-full bg-ink/[0.07]">
              <span
                className="block h-full rounded-full bg-accent-teal"
                style={{
                  width: `${Math.max(4, (Math.log10(Math.max(r.min, 1)) / Math.log10(max)) * 100).toFixed(1)}%`,
                }}
              />
            </span>
            <span className="text-right font-mono text-[11px] text-ink/75">
              {shortHalfLife(r.min)}
            </span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

/** A week-by-week timeline: staggered blocks across a 12-week grid. */
function CyclePreview() {
  const weeks = 12;
  const bars = [
    { start: 0, len: 12, opacity: 1 },
    { start: 2, len: 8, opacity: 0.7 },
    { start: 6, len: 4, opacity: 0.45 },
  ];
  return (
    <PreviewFrame note="12 weeks, three compounds — staggered start and stop">
      <svg viewBox="0 0 240 96" className="h-full w-full" aria-hidden>
        {Array.from({ length: weeks + 1 }, (_, w) => (
          <line
            key={w}
            x1={w * 20}
            x2={w * 20}
            y1="6"
            y2="90"
            stroke="var(--ink)"
            strokeOpacity={w % 4 === 0 ? 0.22 : 0.08}
          />
        ))}
        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.start * 20 + 2}
            y={16 + i * 26}
            width={b.len * 20 - 4}
            height="14"
            rx="7"
            fill="var(--accent-amber)"
            opacity={b.opacity}
          />
        ))}
      </svg>
    </PreviewFrame>
  );
}
