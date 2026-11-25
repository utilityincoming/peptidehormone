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

function PreviewFrame({
  children,
  label,
  note,
}: {
  children: React.ReactNode;
  label: string;
  note: string;
}) {
  return (
    <div className="grid min-w-0 grid-rows-[auto_7rem_1fr] gap-3 rounded-lg border border-ink/10 bg-panel/55 p-3">
      <p className="text-xs font-semibold text-secondary">{label}</p>
      <div className="flex min-w-0 items-center">{children}</div>
      <p className="border-t border-ink/10 pt-2 text-xs leading-5 text-secondary">{note}</p>
    </div>
  );
}

/** Relative concentration in a first-order model with equally spaced pulses. */
function AccumulationPreview() {
  const width = 256;
  const height = 102;
  const left = 24;
  const right = 250;
  const pulses = 6;
  const xFor = (interval: number) => left + (interval / pulses) * (right - left);
  const yFor = (amount: number) => 78 - amount * 32;
  const points = [`${left} ${yFor(0)}`];
  let peak = 1;
  for (let pulse = 0; pulse < pulses; pulse++) {
    for (let step = 0; step <= 12; step++) {
      const fraction = step / 12;
      points.push(`${xFor(pulse + fraction).toFixed(2)} ${yFor(peak * 0.5 ** fraction).toFixed(2)}`);
    }
    peak = 1 + peak / 2;
  }
  const line = `M${points.join(" L")}`;

  return (
    <PreviewFrame label="Relative concentration" note="The modeled peaks approach a plateau as repeated doses accumulate.">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" aria-hidden>
        {[0, 1, 2].map((amount) => (
          <g key={amount}>
            <line x1={left} x2={right} y1={yFor(amount)} y2={yFor(amount)}
              stroke="currentColor" strokeOpacity={amount === 0 ? .25 : .16}
              strokeDasharray={amount === 0 ? undefined : "3 4"} />
            <text x="1" y={yFor(amount) + 4} fill="var(--text-secondary)" fontSize="11">
              {amount === 0 ? "0" : `${amount}×`}
            </text>
          </g>
        ))}
        <path d={`${line} L${right} ${yFor(0)} Z`} fill="var(--accent)" fillOpacity=".09" />
        <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinejoin="round" />
        <text x={right} y="97" textAnchor="end" fill="var(--text-secondary)" fontSize="11">Time →</text>
      </svg>
    </PreviewFrame>
  );
}

const HALF_LIFE_TICKS = [
  { min: 1, label: "1 min" },
  { min: 60, label: "1 h" },
  { min: 1440, label: "1 d" },
  { min: 10080, label: "7 d" },
];

/** Catalog values plotted as points so position carries the log-scaled value. */
function AnalogPreview() {
  const rows = ["glp-1", "liraglutide", "semaglutide"].flatMap((slug) => {
    const hormone = getHormone(slug);
    return hormone?.halfLifeMin
      ? [{ name: hormone.abbr ?? hormone.name, min: hormone.halfLifeMin }]
      : [];
  });
  const max = Math.max(10080, ...rows.map((row) => row.min));
  const position = (minutes: number) => 3 + (Math.log10(Math.max(minutes, 1)) / Math.log10(max)) * 94;

  return (
    <PreviewFrame label="Half-life · log scale" note="Native GLP-1 compared with two longer-acting analogs.">
      <div className="grid w-full grid-cols-[minmax(0,auto)_minmax(0,1fr)] gap-x-2 gap-y-2 text-[11px] leading-tight text-secondary">
        {rows.map((row) => (
          <div key={row.name} className="contents">
            <span className="font-medium text-ink">{row.name}</span>
            <div aria-hidden className="relative self-center border-t border-ink/15">
              <span className="absolute top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-surface bg-accent-teal"
                style={{ left: `${position(row.min)}%` }} />
            </div>
            <span className="sr-only">{shortHalfLife(row.min)}</span>
          </div>
        ))}
        <div aria-hidden className="relative col-start-2 mt-1 h-4 border-t border-ink/20">
          {HALF_LIFE_TICKS.map(({ min, label }, index) => (
            <span key={min} className={`absolute top-1 whitespace-nowrap text-[10px] ${index === 0 ? "" : index === HALF_LIFE_TICKS.length - 1 ? "-translate-x-full" : "-translate-x-1/2"}`}
              style={{ left: `${position(min)}%` }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

/** Illustrative timeline with anonymous rows and no compound or dose data. */
function CyclePreview() {
  const blocks = [
    { start: 0, end: 12 },
    { start: 2, end: 10 },
    { start: 6, end: 10 },
  ];
  const xFor = (week: number) => 20 + week * 18.5;

  return (
    <PreviewFrame label="Example timeline" note="Three example rows show how the planner displays start and stop weeks.">
      <svg viewBox="0 0 256 102" className="h-full w-full" aria-hidden>
        {[0, 4, 8, 12].map((week) => (
          <g key={week}>
            <line x1={xFor(week)} x2={xFor(week)} y1="8" y2="74" stroke="currentColor" strokeOpacity=".15" />
            <text x={xFor(week)} y="91" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">W{week}</text>
          </g>
        ))}
        {blocks.map(({ start, end }, index) => (
          <rect key={start} x={xFor(start)} y={13 + index * 20} width={xFor(end) - xFor(start)}
            height="9" rx="2" fill="var(--accent-amber)" opacity={1 - index * .19} />
        ))}
      </svg>
    </PreviewFrame>
  );
}
