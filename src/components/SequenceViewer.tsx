import { sequenceFor, type SequenceMark } from "@/lib/sequences";

const KIND_COLOR: Record<SequenceMark["kind"], string> = {
  disulfide: "var(--accent-amber)",
  acylation: "var(--accent-teal)",
  terminus: "var(--accent)",
  modification: "var(--accent-blue)",
};

function hitsChain(mark: SequenceMark, chainId: string | undefined, pos: number): boolean {
  const here = mark.chain;
  if (Array.isArray(mark.at)) return here === chainId && mark.at.includes(pos);
  if (here === chainId && mark.at === pos) return true;
  return Boolean(mark.to && mark.to.chain === chainId && mark.to.at === pos);
}

function marksAt(marks: SequenceMark[], chainId: string | undefined, index: number): SequenceMark[] {
  const pos = index + 1;
  return marks.filter((m) => hitsChain(m, chainId, pos));
}

/** Amino-acid strip. Tooltips are native SVG titles, so they work without JavaScript. */
export function SequenceViewer({ slug }: { slug: string }) {
  const seq = sequenceFor(slug);
  if (!seq) return null;
  const chains = seq.chains ?? [{ id: "", name: "", residues: seq.residues ?? "" }];
  const cell = 28;
  const cols = 20;

  return (
    <figure className="mt-8 overflow-x-auto rounded-2xl border border-ink/10 bg-panel/30 p-5">
      <figcaption className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-display text-base font-semibold text-ink">Sequence</span>
        <span className="text-xs text-ink/45">{seq.form}</span>
      </figcaption>
      {chains.map((chain) => {
        const letters = chain.residues.split("");
        const usedCols = Math.min(cols, letters.length);
        const rows = Math.ceil(letters.length / usedCols);
        const width = usedCols * cell + 8;
        const height = rows * cell + 8;
        const chainId = chain.id || undefined;
        return (
          <div key={chain.id || "single"} className="mb-3">
            {chain.name && <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-ink/45">{chain.name}</p>}
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-3xl text-ink"
              role="img"
              aria-label={`${chain.name || seq.form}: ${letters.length} residues. ${seq.source}`}
            >
              {letters.map((aa, i) => {
                const hits = marksAt(seq.marks, chainId, i);
                const primary = hits.find((m) => m.kind !== "terminus") ?? hits[0];
                const x = (i % usedCols) * cell + 4;
                const y = Math.floor(i / usedCols) * cell + 4;
                const fill = primary ? `color-mix(in srgb, ${KIND_COLOR[primary.kind]} 28%, transparent)` : "transparent";
                const stroke = primary ? KIND_COLOR[primary.kind] : "var(--ink)";
                // Residues the reference annotates are focusable, so keyboard and
                // screen-reader users can reach each marked site; the label carries
                // every mark at that position. Plain residues stay decorative.
                const note = hits.length
                  ? `${chain.name ? chain.name + " " : ""}residue ${i + 1}, ${aa}${hits.map((m) => `; ${m.label}: ${m.detail}`).join("")}`
                  : undefined;
                return (
                  <g
                    key={i}
                    tabIndex={note ? 0 : undefined}
                    role={note ? "img" : undefined}
                    aria-label={note}
                    className={note ? "cursor-help outline-none [&:focus-visible>rect]:stroke-[2.5] [&:focus-visible>rect]:[stroke-opacity:1]" : undefined}
                  >
                    <rect x={x} y={y} width={cell - 4} height={cell - 4} rx={4} fill={fill} stroke={stroke} strokeOpacity={primary ? 0.8 : 0.15} />
                    <text x={x + (cell - 4) / 2} y={y + 16} textAnchor="middle" fontSize="12" fontFamily="ui-monospace, monospace" fill="currentColor">
                      {aa}
                    </text>
                    <title>
                      {`${chain.name ? chain.name + " " : ""}${i + 1} ${aa}`}
                      {hits.map((m) => ` — ${m.label}: ${m.detail}`).join("")}
                    </title>
                  </g>
                );
              })}
            </svg>
            <p className="mt-2 select-all break-all font-mono text-[11px] leading-5 text-ink/40" aria-hidden>
              {chain.residues}
            </p>
          </div>
        );
      })}
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
