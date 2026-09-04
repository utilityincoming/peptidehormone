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

/** Brenipatide: the same two incretin receptors tirzepatide plays — GLP-1R and
 *  GIPR, both live — but the signal is routed forward to the brain's reward
 *  circuitry rather than to metabolic tissue. A left-to-right flow (peptide →
 *  two receptors → reward node) makes the destination, not the receptor pair,
 *  the point. The reward node is amber — the "new place this class is pointed",
 *  echoing how amber marks what's added elsewhere in the set. */
function BrenipatideRewardArm(): ReactNode {
  const pepX = 88;
  const pepY = 150;
  // mid column: the two incretin receptor chips
  const chipX = 214;
  const chipW = 132;
  const chipRight = chipX + chipW; // 346
  const glpY = 121;
  const gipY = 179;
  // right column: the brain reward node
  const rewX = 402;
  const rewW = 214;

  return (
    <svg
      viewBox="0 0 640 300"
      className="w-full"
      role="img"
      aria-label="Brenipatide agonizes the same two incretin receptors as tirzepatide — GLP-1R and GIPR, both engaged — but its signal is routed forward to the brain's reward circuitry, the dopamine pathways behind craving and mood, rather than to metabolic tissue"
    >
      {/* peptide → each receptor chip */}
      {[
        { y: glpY, color: "var(--accent)" },
        { y: gipY, color: "var(--accent-blue)" },
      ].map((a) => (
        <g key={a.y}>
          <path
            d={`M ${pepX + 50} ${pepY} C ${pepX + 100} ${pepY}, ${chipX - 40} ${a.y}, ${chipX - 6} ${a.y}`}
            fill="none"
            stroke={a.color}
            strokeOpacity="0.55"
            strokeWidth="2"
          />
          <circle cx={chipX - 6} cy={a.y} r="3" fill={a.color} />
        </g>
      ))}

      {/* each receptor chip → the reward node (amber: the shared destination) */}
      {[glpY, gipY].map((y) => (
        <g key={`fwd-${y}`}>
          <path
            d={`M ${chipRight} ${y} C ${chipRight + 30} ${y}, ${rewX - 30} 150, ${rewX - 6} 150`}
            fill="none"
            stroke="var(--accent-amber)"
            strokeOpacity="0.5"
            strokeWidth="2"
          />
          <circle cx={rewX - 6} cy={150} r="3" fill="var(--accent-amber)" />
        </g>
      ))}

      {/* the single peptide */}
      <g>
        <circle
          cx={pepX}
          cy={pepY}
          r="50"
          fill="color-mix(in srgb, var(--accent) 12%, transparent)"
          stroke="var(--accent)"
          strokeOpacity="0.65"
          strokeWidth="2"
        />
        <text x={pepX} y={pepY - 5} textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Brenipatide
        </text>
        <text x={pepX} y={pepY + 14} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">
          once-monthly
        </text>
      </g>

      {/* the two incretin receptor chips */}
      {[
        { y: glpY, label: "GLP-1R", color: "var(--accent)" },
        { y: gipY, label: "GIPR", color: "var(--accent-blue)" },
      ].map((c) => (
        <g key={c.label}>
          <rect x={chipX} y={c.y - 22} width={chipW} height={44} rx={11} fill="var(--panel)" stroke={c.color} strokeOpacity="0.5" strokeWidth="1.5" />
          <text x={chipX + 14} y={c.y - 1} fill="var(--color-ink)" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
            {c.label}
          </text>
          <text x={chipX + 14} y={c.y + 15} fill="var(--color-ink)" fillOpacity="0.55" fontSize="11">
            agonist
          </text>
        </g>
      ))}

      {/* the brain reward node — the destination that sets brenipatide apart */}
      <g>
        <rect x={rewX} y={94} width={rewW} height={112} rx={16} fill="color-mix(in srgb, var(--accent-amber) 9%, var(--panel))" stroke="var(--accent-amber)" strokeOpacity="0.55" strokeWidth="1.5" />
        <text x={rewX + 20} y={136} fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Reward circuitry
        </text>
        <text x={rewX + 20} y={160} fill="var(--color-ink)" fillOpacity="0.6" fontSize="12">
          dopamine pathways
        </text>
        <text x={rewX + 20} y={178} fill="var(--color-ink)" fillOpacity="0.6" fontSize="12">
          craving · mood
        </text>
      </g>
    </svg>
  );
}

/** Maridebart cafraglutide (MariTide): the inverted-arm twist. Same two-arm
 *  layout as tirzepatide, but the GIP arm is turned OFF rather than on — the
 *  antibody scaffold carries a live GLP-1R agonist arm and a blocked GIPR arm,
 *  the mirror image of tirzepatide's live blue GIPR. Left node is an antibody
 *  conjugate, not a bare peptide, which is what buys the monthly half-life. */
function MaridebartInvertedArm(): ReactNode {
  const startX = 196;
  const startY = 150;
  const recX = 372;
  const glpY = 100;
  const gipY = 200;
  // where the blocked arm stops short of the receptor — the stop-bar sits here
  const stopX = recX - 34;

  return (
    <svg
      viewBox="0 0 640 300"
      className="w-full"
      role="img"
      aria-label="Maridebart cafraglutide is a peptide–antibody conjugate whose GLP-1 receptor arm is a live agonist while its GIP receptor arm is an antagonist — the GIPR is blocked, the mirror image of tirzepatide which activates the same receptor"
    >
      {/* live GLP-1R agonist arm — brand accent, same as the trilogy */}
      <path
        d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${recX - 60} ${glpY}, ${recX - 6} ${glpY}`}
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
      <circle cx={recX - 6} cy={glpY} r="3" fill="var(--accent)" />

      {/* GIP antagonist arm — blue like tirzepatide's GIPR, but capped by a
          stop-bar short of the receptor: the signal is delivered to block, not
          to activate */}
      <path
        d={`M ${startX} ${startY} C ${startX + 60} ${startY}, ${stopX - 40} ${gipY}, ${stopX} ${gipY}`}
        fill="none"
        stroke="var(--accent-blue)"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      {/* the ⊣ stop-bar — antagonism, drawn as a blockade cap */}
      <line
        x1={stopX}
        y1={gipY - 11}
        x2={stopX}
        y2={gipY + 11}
        stroke="var(--accent-blue)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* the antibody conjugate — deliberately NOT the trilogy's "one peptide"
          circle: a rounded scaffold, because the antibody is what it is */}
      <g>
        <rect
          x={startX - 150}
          y={startY - 40}
          width={108}
          height={80}
          rx={20}
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
          MariTide
        </text>
        <text
          x={startX - 96}
          y={startY + 14}
          textAnchor="middle"
          fill="var(--color-ink)"
          fillOpacity="0.5"
          fontSize="11"
        >
          antibody conjugate
        </text>
      </g>

      {/* live GLP-1R */}
      <g>
        <rect x={recX} y={glpY - 26} width={244} height={52} rx={12} fill="var(--panel)" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" />
        <text x={recX + 16} y={glpY - 4} fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          GLP-1R
        </text>
        <text x={recX + 16} y={glpY + 15} fill="var(--color-ink)" fillOpacity="0.55" fontSize="12">
          Agonist · satiety · insulin
        </text>
      </g>

      {/* blocked GIPR — blue outline, but a "blocked" note; the twist */}
      <g>
        <rect x={recX} y={gipY - 26} width={244} height={52} rx={12} fill="var(--panel)" stroke="var(--accent-blue)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="6 4" />
        <text x={recX + 16} y={gipY - 4} fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          GIPR
        </text>
        <text x={recX + 16} y={gipY + 15} fill="var(--color-ink)" fillOpacity="0.55" fontSize="12">
          Antagonist · receptor blocked
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
  brenipatide: {
    alt: "Brenipatide agonizing GLP-1R and GIPR with the signal routed to the brain's reward circuitry",
    caption: (
      <>
        The same two receptors tirzepatide plays — but read the arrows to the
        right. The signal is pointed at the brain&rsquo;s reward circuitry, not
        the pancreas and fat; the bet is that an incretin duo can quiet{" "}
        <em>craving</em>, not just appetite.
      </>
    ),
    svg: <BrenipatideRewardArm />,
  },
  "maridebart-cafraglutide": {
    alt: "Maridebart cafraglutide's antibody conjugate agonizing GLP-1R while blocking GIPR",
    caption: (
      <>
        The same two arms as tirzepatide, one of them inverted. GLP-1R is
        switched <em>on</em>; the GIP arm reaches its receptor only to switch it{" "}
        <em>off</em>. That both directions on the same receptor reduce weight is
        the paradox the design leans into.
      </>
    ),
    svg: <MaridebartInvertedArm />,
  },
};

export function hormoneFigure(slug: string): HormoneFigure | undefined {
  return FIGURES[slug];
}
