import { sequenceFor, type SequenceMark } from "@/lib/sequences";

const KIND_COLOR: Record<SequenceMark["kind"], string> = {
  disulfide: "var(--accent-amber)",
  acylation: "var(--accent-teal)",
  terminus: "var(--accent)",
  modification: "var(--accent-blue)",
};

function marksAt(marks: SequenceMark[], index: number): SequenceMark[] {
  const pos = index + 1;
  return marks.filter((m) => (Array.isArray(m.at) ? m.at.includes(pos) : m.at === pos));
}

/** Amino-acid strip. Tooltips are native SVG titles, so they work without JavaScript. */
export function SequenceViewer({ slug }: { slug: string }) {
  const seq = sequenceFor(slug);
  if (!seq) return null;
  const letters = seq.residues.split("");
  const cell = 28;
  const cols = Math.min(20, letters.length);
  const rows = Math.ceil(letters.length / cols);
  const width = cols * cell + 8;
  const height = rows * cell + 28;

  return (
    <figure className="mt-8 overflow-x-auto rounded-2xl border border-ink/10 bg-panel/30 p-5">
      <figcaption className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-display text-base font-semibold text-ink">Sequence</span>
        <span className="text-xs text-ink/45">{seq.form}</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-3xl text-ink"
        role="img"
        aria-label={`${seq.form}: ${letters.length} residues. ${seq.source}`}
      >
        {letters.map((aa, i) => {
          const hits = marksAt(seq.marks, i);
          const primary = hits.find((m) => m.kind !== "terminus") ?? hits[0];
          const x = (i % cols) * cell + 4;
          const y = Math.floor(i / cols) * cell + 4;
          const fill = primary ? `color-mix(in srgb, ${KIND_COLOR[primary.kind]} 28%, transparent)` : "transparent";
          const stroke = primary ? KIND_COLOR[primary.kind] : "var(--ink)";
          return (
            <g key={i}>
              <rect x={x} y={y} width={cell - 4} height={cell - 4} rx={4} fill={fill} stroke={stroke} strokeOpacity={primary ? 0.8 : 0.15} />
              <text x={x + (cell - 4) / 2} y={y + 16} textAnchor="middle" fontSize="12" fontFamily="ui-monospace, monospace" fill="currentColor">
                {aa}
              </text>
              <title>
                {`${i + 1} ${aa}`}
                {hits.map((m) => ` — ${m.label}: ${m.detail}`).join("")}
              </title>
            </g>
          );
        })}
      </svg>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/55">
        {seq.marks
          .filter((m) => m.kind !== "terminus")
          .map((m) => (
            <li key={m.label}>
              <span style={{ color: KIND_COLOR[m.kind] }}>{m.label}</span>
              <span className="text-ink/40"> · {m.detail}</span>
            </li>
          ))}
      </ul>
      <p className="mt-3 text-xs leading-5 text-ink/40">
        {seq.source}. One-letter code. Highlighted sites are the modifications this reference tracks, not a full structural map.
      </p>
    </figure>
  );
}
