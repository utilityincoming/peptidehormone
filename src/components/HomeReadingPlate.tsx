import type { ReactNode } from "react";

/* Homepage reading plates.
   One static diagram per curated article, in the same ink as the oxytocin
   specimen: deposited facts as solid marks, the rest labeled as schematic.
   These are editorial figures, not structures or quantitative plots. */

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

const INK = "#e2e7f4";
const MUTED = "#a8b7cf";
const LINE = "#8293b4";
const ACCENT = "#a5adff";
const GOLD = "#d3bb82";
const FILL = "#142037";

function Frame({ kicker, plate }: { kicker: string; plate: string }) {
  return (
    <g>
      <pattern id={`home-grid-${plate}`} width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M28 0H0V28" fill="none" stroke="#b5c5ec" strokeOpacity="0.05" />
      </pattern>
      <rect width="640" height="360" fill={`url(#home-grid-${plate})`} />
      <ellipse cx="460" cy="150" rx="240" ry="170" fill={ACCENT} opacity="0.07" />
      <g fill="none" stroke={LINE} strokeOpacity="0.45">
        <path d="M18 18h12M24 12v12M610 18h12M616 12v12M18 342h12M24 336v12M610 342h12M616 336v12" />
      </g>
      <text x="36" y="44" fill={ACCENT} fontSize="18" letterSpacing="1.6" fontFamily="ui-monospace, monospace">
        {kicker}
      </text>
      <text x="604" y="44" textAnchor="end" fill={MUTED} fontSize="16" letterSpacing="0.8" fontFamily="ui-monospace, monospace">
        {plate}
      </text>
      <path d="M36 56H604" fill="none" stroke={LINE} strokeOpacity="0.35" />
    </g>
  );
}

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
      <circle r="16" cx={x} cy={y} fill={marked ? "#303b62" : FILL} stroke={marked ? GOLD : "#717eaa"} />
      <text x={x} y={y + 5} textAnchor="middle" fill={INK} fontSize="14" fontFamily="ui-monospace, monospace">
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
      <Frame kicker="PLATE / TWO POSITIONS" plate="OXT · AVP" />
      <text x="36" y="92" fill={MUTED} fontSize="12" fontFamily="ui-monospace, monospace">
        OXYTOCIN
      </text>
      {oxt.map((aa, i) => (
        <Residue key={`o${i}`} x={118 + i * 52} y={128} letter={aa} marked={i === 2 || i === 7} />
      ))}
      <path d="M118 150 v12 H378 v-12" fill="none" stroke={GOLD} />
      <text x="248" y="178" textAnchor="middle" fill={GOLD} fontSize="11" fontFamily="ui-monospace, monospace">
        Cys1–Cys6
      </text>
      <text x="36" y="214" fill={MUTED} fontSize="12" fontFamily="ui-monospace, monospace">
        VASOPRESSIN
      </text>
      {avp.map((aa, i) => (
        <Residue key={`a${i}`} x={118 + i * 52} y={250} letter={aa} marked={i === 2 || i === 7} />
      ))}
      <path d="M118 272 v12 H378 v-12" fill="none" stroke={GOLD} />
      <text x="248" y="302" textAnchor="middle" fill={GOLD} fontSize="11" fontFamily="ui-monospace, monospace">
        Same ring · positions 3 and 8 differ
      </text>
      <text x="604" y="318" textAnchor="end" fill={MUTED} fontSize="11" fontFamily="ui-monospace, monospace">
        SCHEMATIC INDEX
      </text>
    </g>
  );
}

function FatHormone() {
  const bars = [168, 142, 118, 96, 78];
  return (
    <g>
      <Frame kicker="PLATE / INVERSE READOUT" plate="ADIPONECTIN" />
      <text x="70" y="92" fill={MUTED} fontSize="12" fontFamily="ui-monospace, monospace">
        ADIPOSE MASS
      </text>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={92 + i * 58} cy={168} r={28 + i * 10} fill={FILL} stroke={LINE} strokeOpacity={0.45 + i * 0.2} />
      ))}
      <path d="M70 230 H250" stroke={LINE} strokeOpacity="0.4" />
      <text x="400" y="92" fill={MUTED} fontSize="12" fontFamily="ui-monospace, monospace">
        CIRCULATING LEVEL
      </text>
      {bars.map((h, i) => (
        <rect key={i} x={360 + i * 42} y={250 - h} width="26" height={h} fill={ACCENT} opacity={0.35 + i * 0.02} />
      ))}
      <path d="M360 250 H570" stroke={LINE} strokeOpacity="0.45" />
      <g transform="translate(300 150)">
        {[0, 120, 240].map((a) => (
          <circle
            key={a}
            cx={18 * Math.cos((a * Math.PI) / 180)}
            cy={18 * Math.sin((a * Math.PI) / 180)}
            r="16"
            fill="#202e48"
            stroke={ACCENT}
          />
        ))}
      </g>
      <text x="300" y="210" textAnchor="middle" fill={INK} fontSize="12" fontFamily="ui-monospace, monospace">
        trimer
      </text>
      <text x="604" y="318" textAnchor="end" fill={MUTED} fontSize="11" fontFamily="ui-monospace, monospace">
        DIRECTIONAL SCHEMATIC
      </text>
    </g>
  );
}

function HotFlash() {
  const outs = [
    { x: 150, label: "Kisspeptin", note: "GnRH pulse" },
    { x: 320, label: "Neurokinin B", note: "heat defense" },
    { x: 490, label: "Dynorphin", note: "brake" },
  ];
  return (
    <g>
      <Frame kicker="PLATE / ONE CELL, THREE PEPTIDES" plate="KNDy" />
      <circle cx="320" cy="248" r="36" fill="#202e48" stroke={ACCENT} />
      <text x="320" y="244" textAnchor="middle" fill={INK} fontSize="14" fontFamily="ui-monospace, monospace">
        KNDy
      </text>
      <text x="320" y="262" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="ui-monospace, monospace">
        neuron
      </text>
      {outs.map((o) => (
        <g key={o.label}>
          <path d={`M320 214 C320 176 ${o.x} 164 ${o.x} 132`} fill="none" stroke={ACCENT} strokeDasharray="3 5" />
          <rect x={o.x - 64} y="84" width="128" height="48" rx="4" fill={FILL} stroke={LINE} />
          <text x={o.x} y="104" textAnchor="middle" fill={INK} fontSize="13" fontFamily="ui-monospace, monospace">
            {o.label}
          </text>
          <text x={o.x} y="122" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="ui-monospace, monospace">
            {o.note}
          </text>
        </g>
      ))}
      <text x="320" y="310" textAnchor="middle" fill={GOLD} fontSize="12" fontFamily="ui-monospace, monospace">
        estrogen is the brake on this cell
      </text>
      <text x="604" y="318" textAnchor="end" fill={MUTED} fontSize="11" fontFamily="ui-monospace, monospace">
        SCHEMATIC
      </text>
    </g>
  );
}

function ImprintedGene() {
  return (
    <g>
      <Frame kicker="PLATE / PARENTAL COPIES" plate="IGF2" />
      <text x="150" y="100" textAnchor="middle" fill={MUTED} fontSize="12" fontFamily="ui-monospace, monospace">
        PATERNAL
      </text>
      <text x="470" y="100" textAnchor="middle" fill={MUTED} fontSize="12" fontFamily="ui-monospace, monospace">
        MATERNAL
      </text>
      <path d="M90 150 H210" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
      <path d="M410 150 H530" stroke={LINE} strokeWidth="6" strokeLinecap="round" opacity="0.45" />
      <rect x="118" y="132" width="64" height="36" fill="#202e48" stroke={ACCENT} />
      <text x="150" y="155" textAnchor="middle" fill={INK} fontSize="13" fontFamily="ui-monospace, monospace">
        IGF2
      </text>
      <rect x="438" y="132" width="64" height="36" fill={FILL} stroke={LINE} />
      <text x="470" y="155" textAnchor="middle" fill={MUTED} fontSize="13" fontFamily="ui-monospace, monospace">
        IGF2
      </text>
      <path d="M438 132 L502 168" stroke={GOLD} />
      <text x="150" y="200" textAnchor="middle" fill={ACCENT} fontSize="12" fontFamily="ui-monospace, monospace">
        expressed
      </text>
      <text x="470" y="200" textAnchor="middle" fill={GOLD} fontSize="12" fontFamily="ui-monospace, monospace">
        silenced
      </text>
      <path d="M90 250 H210" stroke={LINE} strokeWidth="6" strokeLinecap="round" opacity="0.45" />
      <path d="M410 250 H530" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
      <text x="150" y="246" textAnchor="middle" fill={MUTED} fontSize="12" fontFamily="ui-monospace, monospace">
        IGF2R off
      </text>
      <text x="470" y="246" textAnchor="middle" fill={INK} fontSize="12" fontFamily="ui-monospace, monospace">
        IGF2R on · clearance
      </text>
      <text x="320" y="310" textAnchor="middle" fill={MUTED} fontSize="12" fontFamily="ui-monospace, monospace">
        Imprint pattern, not a karyotype
      </text>
    </g>
  );
}

function GlpSignal() {
  const steps = [
    { x: 70, t: "Meal" },
    { x: 190, t: "L cell" },
    { x: 320, t: "GLP-1" },
    { x: 460, t: "GLP-1R" },
    { x: 580, t: "cAMP" },
  ];
  return (
    <g>
      <Frame kicker="PLATE / GLUCOSE-GATED" plate="GLP-1" />
      {steps.map((s, i) => (
        <g key={s.t}>
          {i < steps.length - 1 && (
            <path d={`M${s.x + 28} 150 H${steps[i + 1].x - 28}`} stroke={ACCENT} strokeDasharray="3 5" />
          )}
          <circle cx={s.x} cy="150" r="26" fill={i === 2 ? "#202e48" : FILL} stroke={i === 2 ? ACCENT : LINE} />
          <text x={s.x} y="155" textAnchor="middle" fill={INK} fontSize="12" fontFamily="ui-monospace, monospace">
            {s.t}
          </text>
        </g>
      ))}
      <rect x="150" y="220" width="340" height="64" fill={FILL} stroke={LINE} />
      <text x="170" y="248" fill={MUTED} fontSize="12" fontFamily="ui-monospace, monospace">
        K+ channel closes
      </text>
      <text x="170" y="268" fill={GOLD} fontSize="12" fontFamily="ui-monospace, monospace">
        only while glucose is high
      </text>
      <circle cx="450" cy="252" r="16" fill="none" stroke={GOLD} />
      <text x="450" y="256" textAnchor="middle" fill={GOLD} fontSize="11" fontFamily="ui-monospace, monospace">
        Glc
      </text>
      <text x="604" y="318" textAnchor="end" fill={MUTED} fontSize="11" fontFamily="ui-monospace, monospace">
        SCHEMATIC
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
    <div className={`relative overflow-hidden bg-[#0d1525] ${className}`}>
      <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        <Draw />
      </svg>
    </div>
  );
}
