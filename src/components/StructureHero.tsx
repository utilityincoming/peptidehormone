import figure from "@/lib/structures/retatrutide-receptors.json";

/* ── Structure hero ──────────────────────────────────────────────────────────
   Retatrutide seated in each of its three receptors, drawn from deposited
   cryo-EM coordinates (PDB 8YW3 / 8YW4 / 8YW5). Nothing here is illustrated by
   hand: scripts/build-structure-figure.mjs downloads the entries from RCSB,
   takes the alpha-carbon traces, puts all three complexes in one peptide-
   defined frame and projects them. This component only paints the result.

   Receptor strands are grouped by depth and painted far → near; each group is
   laid over a background-coloured halo so nearer strands occlude farther ones
   and the bundle reads as tubes rather than a tangle. The peptide is the one
   saturated element. Server component — no client JS. */

const NEAR = figure.structures[0].receptorPaths.length - 1;

function peptidePath(points: number[][]): string {
  return `M${points.map((p) => `${p[0]} ${p[1]}`).join("L")}`;
}

export function StructureHero() {
  const { width, height, structures } = figure;
  const paper = structures[0];
  const counts = structures.map((s) => s.peptideResiduesModelled);
  const lo = Math.min(...counts);
  const hi = Math.max(...counts);

  return (
    <figure>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {structures.map((s) => {
          const pep = peptidePath(s.peptide);
          const nTerm = s.peptide[0];
          return (
            <div key={s.id} className="flex flex-col">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full"
                role="img"
                aria-label={`Retatrutide bound to the ${s.receptor}: backbone trace of the receptor with the peptide inserted from above, from PDB entry ${s.id}.`}
              >
                {s.receptorPaths.map((d, i) => (
                  <g key={i}>
                    <path
                      d={d}
                      fill="none"
                      stroke="var(--surface)"
                      strokeWidth="10.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke="var(--ink)"
                      strokeOpacity={0.2 + (i / NEAR) * 0.5}
                      strokeWidth="6.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                ))}
                {/* the peptide: halo, glow, body, N-terminus */}
                <path
                  d={pep}
                  fill="none"
                  stroke="var(--surface)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={pep}
                  className="structure-glow"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={pep}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={nTerm[0]} cy={nTerm[1]} r="6.5" fill="var(--ink)" />
                <circle cx={nTerm[0]} cy={nTerm[1]} r="3" fill="var(--accent)" />
              </svg>
              <p className="mt-2 text-center font-display text-sm font-semibold sm:text-base">
                <span className="sm:hidden">{s.short}</span>
                <span className="hidden sm:inline">{s.receptor}</span>
              </p>
              <a
                href={`https://www.rcsb.org/structure/${s.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 text-center font-mono text-[11px] text-ink/60 underline decoration-ink/25 underline-offset-2 transition-colors hover:text-accent"
              >
                PDB {s.id} · {s.resolution.toFixed(1)} Å
              </a>
            </div>
          );
        })}
      </div>

      <figcaption className="mt-5 text-xs leading-5 text-ink/60">
        <span className="font-medium text-ink/85">
          One molecule, three receptors — from the deposited coordinates.
        </span>{" "}
        Retatrutide <span className="text-accent">(violet)</span> seated in each
        receptor it activates; the dot marks its N-terminus, deepest in the
        receptor core. Backbone traces of cryo-EM models, lightly smoothed. Only
        resolved residues are drawn — the first {lo === hi ? hi : `${lo}–${hi}`} of
        the peptide, without its fatty-acid side chain; the G protein and
        nanobody that stabilise each complex are omitted.{" "}
        {paper.doi && (
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/85 underline decoration-ink/30 underline-offset-2 transition-colors hover:text-accent"
          >
            {paper.journal} {paper.year}
          </a>
        )}
      </figcaption>
    </figure>
  );
}
