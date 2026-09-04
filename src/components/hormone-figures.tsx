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

const FIGURES: Record<string, HormoneFigure> = {
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
};

export function hormoneFigure(slug: string): HormoneFigure | undefined {
  return FIGURES[slug];
}
