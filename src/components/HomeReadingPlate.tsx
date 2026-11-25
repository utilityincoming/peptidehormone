import type { ReactNode } from "react";

/* Homepage reading plates.
   One diagram per essay. No shared frame, so the cards stay distinct at thumbnail size.
   Editorial figures: deposited differences are marked; the rest is labeled schematic. */

const HOME_PLATES = [
  "two-residues-apart",
  "the-fat-hormone-that-falls-as-fat-rises",
  "the-neuron-behind-the-hot-flash",
  "the-gene-the-parents-fight-over",
  "glp-1-signaling",
] as const;

export type HomePlateSlug = (typeof HOME_PLATES)[number];

export function hasHomeReadingPlate(slug: string): slug is HomePlateSlug {
  return (HOME_PLATES as readonly string[]).includes(slug);
}

const INK = "#182b37";
const MUTED = "#4a5964";
const LINE = "#596e77";
const ACCENT = "#34566A";
const GOLD = "#876332";
const FILL = "#f0f2ee";

function Residue({
  x,
  y,
  letter,
  marked,
}: {
  x: number;
  y: number;
  letter: string;
  marked?: boolean;
}) {
  return (
    <g>
      <circle r="18" cx={x} cy={y} fill={marked ? "#eee8db" : FILL} stroke={marked ? GOLD : LINE} strokeWidth={marked ? 2 : 1} />
      <text x={x} y={y + 5} textAnchor="middle" fill={marked ? GOLD : INK} fontSize="15" fontFamily="ui-monospace, monospace">
        {letter}
      </text>
    </g>
  );
}

function TwoResidues() {
  const oxt = "CYIQNCPLG".split("");
  const avp = "CYFQNCPRG".split("");
  return (
    <g>
      <text x="36" y="48" fill={MUTED} fontSize="13" fontFamily="ui-monospace, monospace">
        OXYTOCIN
      </text>
      {oxt.map((aa, i) => (
        <Residue key={`o${i}`} x={48 + i * 66} y={100} letter={aa} marked={i === 2 || i === 7} />
      ))}
      <text x="36" y="188" fill={MUTED} fontSize="13" fontFamily="ui-monospace, monospace">
        VASOPRESSIN
      </text>
      {avp.map((aa, i) => (
        <Residue key={`a${i}`} x={48 + i * 66} y={240} letter={aa} marked={i === 2 || i === 7} />
      ))}
      <text x="320" y="320" textAnchor="middle" fill={GOLD} fontSize="14" fontFamily="ui-monospace, monospace">
        Positions 3 and 8
      </text>
    </g>
  );
}

function FatHormone() {
  const fat = [48, 72, 100, 132, 168];
  const adipo = [210, 176, 142, 112, 84];
  const line = adipo.map((y, i) => `${80 + i * 110},${y}`).join(" ");
  return (
    <g>
      <text x="40" y="40" fill={MUTED} fontSize="13" fontFamily="ui-monospace, monospace">
        FAT MASS
      </text>
      <text x="600" y="40" textAnchor="end" fill={GOLD} fontSize="13" fontFamily="ui-monospace, monospace">
        ADIPONECTIN
      </text>
      {fat.map((h, i) => (
        <rect key={i} x={48 + i * 110} y={300 - h} width="36" height={h} fill={LINE} opacity="0.55" />
      ))}
      <path d="M40 300 H600" stroke={LINE} strokeOpacity="0.5" />
      <polyline points={line} fill="none" stroke={GOLD} strokeWidth="3" />
      {adipo.map((y, i) => (
        <circle key={i} cx={80 + i * 110} cy={y} r="5" fill={GOLD} />
      ))}
    </g>
  );
}

function HotFlash() {
  const cells = [
    { x: 120, label: "Kisspeptin" },
    { x: 320, label: "Neurokinin B" },
    { x: 520, label: "Dynorphin" },
  ];
  return (
    <g>
      {cells.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy="118" r="36" fill={FILL} stroke={ACCENT} strokeWidth="1.5" />
          <text x={c.x} y="178" textAnchor="middle" fill={INK} fontSize="14" fontFamily="ui-monospace, monospace">
            {c.label}
          </text>
          <path d={`M${c.x} 190 V236`} fill="none" stroke={ACCENT} strokeDasharray="4 5" />
        </g>
      ))}
      <rect x="150" y="246" width="340" height="56" fill="#eee8db" stroke={GOLD} />
      <text x="320" y="280" textAnchor="middle" fill={GOLD} fontSize="16" fontFamily="ui-monospace, monospace">
        Temperature
      </text>
    </g>
  );
}

function ImprintedGene() {
  return (
    <g>
      <text x="170" y="70" textAnchor="middle" fill={MUTED} fontSize="14" fontFamily="ui-monospace, monospace">
        PATERNAL
      </text>
      <text x="470" y="70" textAnchor="middle" fill={MUTED} fontSize="14" fontFamily="ui-monospace, monospace">
        MATERNAL
      </text>
      <rect x="70" y="120" width="200" height="28" rx="2" fill={ACCENT} />
      <text x="170" y="140" textAnchor="middle" fill="#f8fafc" fontSize="14" fontFamily="ui-monospace, monospace">
        IGF2 on
      </text>
      <rect x="370" y="120" width="200" height="28" rx="2" fill={FILL} stroke={LINE} />
      <path d="M370 120 L570 148" stroke={GOLD} strokeWidth="2" />
      <text x="470" y="180" textAnchor="middle" fill={GOLD} fontSize="14" fontFamily="ui-monospace, monospace">
        IGF2 silenced
      </text>
      <text x="170" y="210" textAnchor="middle" fill={ACCENT} fontSize="13" fontFamily="ui-monospace, monospace">
        expressed
      </text>
      <rect x="70" y="250" width="200" height="16" fill={LINE} opacity="0.35" />
      <rect x="370" y="250" width="200" height="16" fill={ACCENT} opacity="0.85" />
      <text x="170" y="300" textAnchor="middle" fill={MUTED} fontSize="13" fontFamily="ui-monospace, monospace">
        IGF2R off
      </text>
      <text x="470" y="300" textAnchor="middle" fill={INK} fontSize="13" fontFamily="ui-monospace, monospace">
        IGF2R on
      </text>
    </g>
  );
}

function GlpSignal() {
  const steps = [
    { x: 90, t: "Meal" },
    { x: 250, t: "GLP-1" },
    { x: 410, t: "Receptor" },
    { x: 560, t: "Insulin" },
  ];
  return (
    <g>
      {steps.map((s, i) => (
        <g key={s.t}>
          {i < steps.length - 1 && (
            <path d={`M${s.x + 54} 168 H${steps[i + 1].x - 54}`} stroke={ACCENT} strokeWidth="2" />
          )}
          <circle cx={s.x} cy="168" r="48" fill={i === 1 ? "#e0e9e8" : FILL} stroke={i === steps.length - 1 ? GOLD : ACCENT} strokeWidth="1.5" />
          <text x={s.x} y="174" textAnchor="middle" fill={i === steps.length - 1 ? GOLD : INK} fontSize="15" fontFamily="ui-monospace, monospace">
            {s.t}
          </text>
        </g>
      ))}
      <text x="320" y="280" textAnchor="middle" fill={MUTED} fontSize="14" fontFamily="ui-monospace, monospace">
        Glucose still has to be high
      </text>
    </g>
  );
}

const DRAWINGS: Record<HomePlateSlug, () => ReactNode> = {
  "two-residues-apart": TwoResidues,
  "the-fat-hormone-that-falls-as-fat-rises": FatHormone,
  "the-neuron-behind-the-hot-flash": HotFlash,
  "the-gene-the-parents-fight-over": ImprintedGene,
  "glp-1-signaling": GlpSignal,
};

export function HomeReadingPlate({ slug, className = "" }: { slug: string; className?: string }) {
  if (!hasHomeReadingPlate(slug)) return null;
  const Draw = DRAWINGS[slug];
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid meet" className="h-full w-full" aria-hidden>
        <Draw />
      </svg>
    </div>
  );
}
