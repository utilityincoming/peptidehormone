import Link from "next/link";
import { getHormone, halfLifeForLink } from "@/lib/hormones";

/* ── Homepage graphics ───────────────────────────────────────────────────────
   Server-rendered SVG + HTML, no client JS. Numbers come from the catalog data
   (lib/hormones) wherever a figure is quoted, so the landing page cannot drift
   from the monographs it links to. */

/** Compact half-life label from minutes: "~2 min", "~13 h", "~7 days". */
function shortHalfLife(min: number): string {
  if (min < 90) return `~${Math.round(min)} min`;
  const h = min / 60;
  if (h < 48) return `~${Math.round(h)} h`;
  return `~${Math.round(h / 24)} days`;
}

/* ── Hero: one molecule's story ──
   Native GLP-1 is cleared in about two minutes; semaglutide — the same signal
   at the receptor — lasts about a week. The chain shows where the three edits
   sit on the 31-residue peptide (GLP-1 numbering 7–37), the bars show what they
   bought, and the links hand the reader to the monograph, the deep-dive, and
   the calculator. Labels live in HTML so they stay legible at phone width. */

const CHAIN = Array.from({ length: 31 }, (_, i) => ({
  x: 15 + i * 11,
  y: Math.round((50 + 10 * Math.sin(i * 0.5)) * 10) / 10,
}));

// Index into CHAIN = GLP-1 position − 7.
const EDITS = [
  {
    n: 1,
    i: 1,
    color: "var(--accent-teal)",
    text: "text-accent-teal",
    title: "Aib at position 8",
    body: "the enzyme DPP-4 can no longer clip the chain.",
  },
  {
    n: 2,
    i: 19,
    color: "var(--accent-amber)",
    text: "text-accent-amber",
    title: "A C18 fatty diacid on Lys26",
    body: "it latches onto albumin, so the kidney cannot flush it.",
  },
  {
    n: 3,
    i: 27,
    color: "var(--accent-purple)",
    text: "text-accent-purple",
    title: "Arg at position 34",
    body: "leaves one lysine, so the fatty chain attaches at a single site.",
  },
];

export function HeroStory() {
  const native = getHormone("glp-1");
  const analog = getHormone("semaglutide");
  const nativeMin = native?.halfLifeMin ?? 2;
  const analogMin = analog?.halfLifeMin ?? 9900;
  const link = halfLifeForLink(analogMin);
  const lys = CHAIN[19];

  // The fatty-diacid tail: a zigzag from Lys26 down to albumin.
  const tail = Array.from({ length: 9 }, (_, k) => {
    const x = lys.x + (k % 2 === 0 ? -4 : 4);
    const y = lys.y + 8 + k * 6.5;
    return `${x} ${y}`;
  }).join(" L");

  const rows = [
    {
      name: "Native GLP-1",
      value: shortHalfLife(nativeMin),
      // Linear scale: the native bar is honestly a sliver.
      width: `max(3px, ${((nativeMin / analogMin) * 100).toFixed(3)}%)`,
      bar: "bg-accent-amber",
      text: "text-accent-amber",
      grow: false,
    },
    {
      name: "Semaglutide",
      value: shortHalfLife(analogMin),
      width: "100%",
      bar: "bg-accent",
      text: "text-accent",
      grow: true,
    },
  ];

  return (
    <figure className="rounded-2xl border border-ink/10 bg-panel/60 p-5 sm:p-6">
      <figcaption>
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink/60">
          One molecule, three edits
        </p>
        <p className="mt-1.5 font-display text-xl font-semibold leading-snug">
          How a two-minute hormone became a weekly drug
        </p>
      </figcaption>

      <svg
        viewBox="0 0 360 172"
        className="mt-3 w-full"
        role="img"
        aria-label="The 31-residue semaglutide chain with its three edits marked: position 8 near the start, a fatty chain on lysine 26 reaching down to albumin, and position 34 near the end."
      >
        {/* albumin, with the fatty tail hitched to it */}
        <ellipse
          cx={lys.x}
          cy="138"
          rx="64"
          ry="24"
          fill="var(--accent)"
          fillOpacity="0.1"
          stroke="var(--accent)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <text
          x={lys.x}
          y="143"
          textAnchor="middle"
          fontSize="12"
          fill="var(--ink)"
          fillOpacity="0.7"
          fontFamily="var(--font-geist-mono), monospace"
        >
          albumin
        </text>
        <path
          d={`M${lys.x} ${lys.y} L${tail} L${lys.x} 115`}
          fill="none"
          stroke="var(--accent-amber)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* backbone */}
        <path
          d={`M${CHAIN.map((p) => `${p.x} ${p.y}`).join(" L")}`}
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        {/* residues */}
        {CHAIN.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3.6"
            fill="var(--panel)"
            stroke="var(--ink)"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />
        ))}
        {/* the three edits */}
        {EDITS.map((e) => {
          const p = CHAIN[e.i];
          return (
            <g key={e.n}>
              <circle cx={p.x} cy={p.y} r="9" fill={e.color} opacity="0.18" />
              <circle cx={p.x} cy={p.y} r="5" fill={e.color} />
              <circle cx={p.x} cy={p.y - 22} r="8" fill={e.color} />
              <text
                x={p.x}
                y={p.y - 18.2}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fill="var(--surface-deep)"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {e.n}
              </text>
            </g>
          );
        })}
      </svg>

      <ol className="mt-2 space-y-1.5 text-sm leading-6 text-ink/65">
        {EDITS.map((e) => (
          <li key={e.n} className="flex gap-2.5">
            <span className={`font-mono text-xs font-bold leading-6 ${e.text}`}>{e.n}</span>
            <span>
              <span className="font-medium text-ink/90">{e.title}</span> — {e.body}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-5 border-t border-ink/10 pt-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink/60">
          Half-life in circulation
        </p>
        <dl className="mt-3 space-y-2.5">
          {rows.map((r) => (
            <div key={r.name} className="grid grid-cols-[7.5rem_1fr_4.5rem] items-center gap-3">
              <dt className="text-sm text-ink/75">{r.name}</dt>
              <dd className="h-2.5 rounded-full bg-ink/[0.07]">
                <div
                  className={`h-full rounded-full ${r.bar} ${r.grow ? "signal-bar" : ""}`}
                  style={{ width: r.width }}
                />
              </dd>
              <dd className={`text-right font-mono text-sm font-semibold ${r.text}`}>
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs leading-5 text-ink/60">
          About 5,000× longer — and at the receptor, the same signal.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {[
          { href: "/hormones/semaglutide", label: "The molecule" },
          { href: "/insights/peptide-half-life-engineering", label: "The full story" },
          {
            href: `/tools/half-life?t12=${link.value}&unit=${link.unit}`,
            label: "Model it yourself",
          },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-sm text-ink/85 transition-colors hover:border-accent hover:text-accent"
          >
            {l.label}
            <span aria-hidden>→</span>
          </Link>
        ))}
      </div>
    </figure>
  );
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
