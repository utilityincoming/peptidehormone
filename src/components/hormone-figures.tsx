import type { ReactNode } from "react";

/**
 * Per-monograph figures. Keyed by hormone slug; each is an original,
 * theme-aware inline SVG that carries part of the molecule's story the prose
 * can only gesture at. Optional by design — a slug with no figure simply
 * renders none. Colors come from the shared token set (var(--accent…)) so the
 * art tracks the site theme rather than hard-coding hex.
 */
export interface HormoneFigure {
  /** Accessible one-line description of what the figure shows. */
  alt: string;
  /** Short caption rendered under the frame. */
  caption: ReactNode;
  /** The SVG itself. */
  svg: ReactNode;
}

/** Retatrutide: one acylated peptide, three receptor arms, three effects. */
function RetatrutideTriAgonist(): ReactNode {
  // Three arms fan from a single peptide to three receptors, each carrying a
  // distinct physiological contribution. GLP-1 = brand accent, GIP = blue,
  // glucagon = amber (the energy-expenditure arm the tri-agonist adds).
  const arms = [
    {
      color: "var(--accent)",
      receptor: "GLP-1R",
      effect: "Satiety · insulin",
      y: 60,
    },
    {
      color: "var(--accent-blue)",
      receptor: "GIPR",
      effect: "Insulin · adipose",
      y: 150,
    },
    {
      color: "var(--accent-amber)",
      receptor: "GCGR",
      effect: "Energy expenditure",
      y: 240,
    },
  ];
  const startX = 196;
  const startY = 150;
  const recX = 372;

  return (
    <svg
      viewBox="0 0 640 300"
      className="w-full"
      role="img"
      aria-label="Retatrutide is a single acylated peptide whose signal fans out to three receptors — GLP-1R, GIPR and the glucagon receptor — each adding a distinct metabolic effect"
    >
      {/* connecting arms */}
      {arms.map((a) => {
        const c1x = startX + 60;
        return (
          <g key={a.receptor}>
            <path
              d={`M ${startX} ${startY} C ${c1x} ${startY}, ${recX - 60} ${a.y}, ${recX - 6} ${a.y}`}
              fill="none"
              stroke={a.color}
              strokeOpacity="0.55"
              strokeWidth="2"
            />
            <circle cx={recX - 6} cy={a.y} r="3" fill={a.color} />
          </g>
        );
      })}

      {/* the single peptide */}
      <g>
        <circle
          cx={startX - 96}
          cy={startY}
          r="54"
          fill="color-mix(in srgb, var(--accent) 12%, transparent)"
          stroke="var(--accent)"
          strokeOpacity="0.65"
          strokeWidth="2"
        />
        <text
          x={startX - 96}
          y={startY - 6}
          textAnchor="middle"
          fill="var(--color-ink)"
          fontSize="15"
          fontWeight="600"
          fontFamily="var(--font-space-grotesk), sans-serif"
        >
          Retatrutide
        </text>
        <text
          x={startX - 96}
          y={startY + 14}
          textAnchor="middle"
          fill="var(--color-ink)"
          fillOpacity="0.5"
          fontSize="11"
        >
          one peptide
        </text>
      </g>

      {/* receptors + effects */}
      {arms.map((a) => (
        <g key={a.receptor}>
          <rect
            x={recX}
            y={a.y - 26}
            width={244}
            height={52}
            rx={12}
            fill="var(--panel)"
            stroke={a.color}
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <text
            x={recX + 16}
            y={a.y - 4}
            fill="var(--color-ink)"
            fontSize="15"
            fontWeight="600"
            fontFamily="var(--font-space-grotesk), sans-serif"
          >
            {a.receptor}
          </text>
          <text x={recX + 16} y={a.y + 15} fill="var(--color-ink)" fillOpacity="0.55" fontSize="12">
            {a.effect}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Tirzepatide: one peptide, two receptor arms — the incretin chord before
 *  the third note. Deliberately shares retatrutide's layout and colors so the
 *  two figures read as a set: the amber glucagon arm is visibly what's added. */
function TirzepatideDualAgonist(): ReactNode {
  const arms = [
    { color: "var(--accent)", receptor: "GLP-1R", effect: "Satiety · insulin", y: 100 },
    { color: "var(--accent-blue)", receptor: "GIPR", effect: "Insulin · adipose", y: 200 },
  ];
  const startX = 196;
  const startY = 150;
  const recX = 372;

  return (
    <svg
      viewBox="0 0 640 300"
      className="w-full"
      role="img"
      aria-label="Tirzepatide is a single acylated peptide whose signal fans out to two incretin receptors — GLP-1R and GIPR — the dual-agonist chord that retatrutide later extends with a third receptor"
    >
      {arms.map((a) => (
        <g key={a.receptor}>
          <path
            d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${recX - 60} ${a.y}, ${recX - 6} ${a.y}`}
            fill="none"
            stroke={a.color}
            strokeOpacity="0.55"
            strokeWidth="2"
          />
          <circle cx={recX - 6} cy={a.y} r="3" fill={a.color} />
        </g>
      ))}

      {/* the ghost of the third arm — the glucagon note tirzepatide does not play */}
      <g>
        <path
          d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${recX - 60} 262, ${recX - 6} 262`}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.14"
          strokeWidth="2"
          strokeDasharray="2 6"
        />
        <rect
          x={recX}
          y={236}
          width={244}
          height={48}
          rx={12}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.14"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        <text x={recX + 16} y={258} fill="var(--color-ink)" fillOpacity="0.3" fontSize="13" fontFamily="var(--font-space-grotesk), sans-serif">
          GCGR
        </text>
        <text x={recX + 16} y={274} fill="var(--color-ink)" fillOpacity="0.3" fontSize="11">
          not engaged
        </text>
      </g>

      {/* the single peptide */}
      <g>
        <circle
          cx={startX - 96}
          cy={startY}
          r="54"
          fill="color-mix(in srgb, var(--accent) 12%, transparent)"
          stroke="var(--accent)"
          strokeOpacity="0.65"
          strokeWidth="2"
        />
        <text x={startX - 96} y={startY - 6} textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Tirzepatide
        </text>
        <text x={startX - 96} y={startY + 14} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">
          one peptide
        </text>
      </g>

      {arms.map((a) => (
        <g key={a.receptor}>
          <rect x={recX} y={a.y - 26} width={244} height={52} rx={12} fill="var(--panel)" stroke={a.color} strokeOpacity="0.5" strokeWidth="1.5" />
          <text x={recX + 16} y={a.y - 4} fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
            {a.receptor}
          </text>
          <text x={recX + 16} y={a.y + 15} fill="var(--color-ink)" fillOpacity="0.55" fontSize="12">
            {a.effect}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Semaglutide: one peptide, one receptor arm — the single note the whole
 *  incretin chord is built out from. Two dashed ghost slots (GIPR, GCGR) mark
 *  the notes the co-agonists later add, closing the trilogy visually. */
function SemaglutideSingleAgonist(): ReactNode {
  const startX = 196;
  const startY = 150;
  const recX = 372;
  const ghosts = [
    { receptor: "GIPR", note: "added by tirzepatide", y: 196 },
    { receptor: "GCGR", note: "added by retatrutide", y: 250 },
  ];

  return (
    <svg
      viewBox="0 0 640 300"
      className="w-full"
      role="img"
      aria-label="Semaglutide is a single acylated peptide signalling through one receptor, the GLP-1 receptor — the single incretin note that tirzepatide and retatrutide later build into a chord"
    >
      {/* the one live arm */}
      <path
        d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${recX - 60} 100, ${recX - 6} 100`}
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
      <circle cx={recX - 6} cy={100} r="3" fill="var(--accent)" />

      {/* the two notes semaglutide does not play */}
      {ghosts.map((g) => (
        <g key={g.receptor}>
          <path
            d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${recX - 60} ${g.y + 14}, ${recX - 6} ${g.y + 14}`}
            fill="none"
            stroke="var(--color-ink)"
            strokeOpacity="0.14"
            strokeWidth="2"
            strokeDasharray="2 6"
          />
          <rect
            x={recX}
            y={g.y}
            width={244}
            height={40}
            rx={12}
            fill="none"
            stroke="var(--color-ink)"
            strokeOpacity="0.14"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          <text x={recX + 16} y={g.y + 18} fill="var(--color-ink)" fillOpacity="0.32" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
            {g.receptor}
          </text>
          <text x={recX + 16} y={g.y + 33} fill="var(--color-ink)" fillOpacity="0.28" fontSize="11">
            {g.note}
          </text>
        </g>
      ))}

      {/* the single peptide */}
      <g>
        <circle
          cx={startX - 96}
          cy={startY}
          r="54"
          fill="color-mix(in srgb, var(--accent) 12%, transparent)"
          stroke="var(--accent)"
          strokeOpacity="0.65"
          strokeWidth="2"
        />
        <text x={startX - 96} y={startY - 6} textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Semaglutide
        </text>
        <text x={startX - 96} y={startY + 14} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">
          one peptide
        </text>
      </g>

      {/* the live receptor */}
      <g>
        <rect x={recX} y={74} width={244} height={52} rx={12} fill="var(--panel)" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" />
        <text x={recX + 16} y={96} fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          GLP-1R
        </text>
        <text x={recX + 16} y={115} fill="var(--color-ink)" fillOpacity="0.55" fontSize="12">
          Satiety · insulin
        </text>
      </g>
    </svg>
  );
}

const FIGURES: Record<string, HormoneFigure> = {
  semaglutide: {
    alt: "Semaglutide's single peptide signalling through one incretin receptor",
    caption: (
      <>
        One peptide, one receptor — the single note. Everything else on this
        page is engineering to make that note <em>last</em>: the GIP and
        glucagon slots stay empty until the co-agonists arrive.
      </>
    ),
    svg: <SemaglutideSingleAgonist />,
  },
  retatrutide: {
    alt: "Retatrutide's single peptide signalling through three receptors",
    caption: (
      <>
        One acylated peptide, three receptor arms. The GLP-1 and GIP arms are
        the familiar incretin chord; the glucagon arm is the third note — an
        energy-expenditure lever the earlier dual agonists never pulled.
      </>
    ),
    svg: <RetatrutideTriAgonist />,
  },
  tirzepatide: {
    alt: "Tirzepatide's single peptide signalling through two incretin receptors",
    caption: (
      <>
        One peptide, two receptor arms — the incretin chord. The glucagon slot
        sits empty by design; playing that third note is exactly the step{" "}
        retatrutide takes.
      </>
    ),
    svg: <TirzepatideDualAgonist />,
  },
};

export function hormoneFigure(slug: string): HormoneFigure | undefined {
  return FIGURES[slug];
}
