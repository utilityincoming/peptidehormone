import type { ReactNode } from "react";

/**
 * Family-level mechanism cartoons used when a molecule has no bespoke figure
 * in hormone-figures.tsx. Schematic on purpose: a peptide, a receptor, an effect.
 */
const FAMILY_COPY: Record<string, { alt: string; caption: string; arms: { receptor: string; effect: string; color: string }[] }> = {
  "incretins-metabolic": {
    alt: "A gut peptide reaches a class B receptor on the islet and the brain, amplifying insulin and satiety when glucose is high.",
    caption: "Nutrient sensing in the gut, then a class B receptor. The drawing is the axis, not a binding pose.",
    arms: [
      { receptor: "Islet receptor", effect: "Insulin, when glucose is high", color: "var(--accent)" },
      { receptor: "Brain / gut", effect: "Satiety, emptying", color: "var(--accent-teal)" },
    ],
  },
  "growth-repair": {
    alt: "A hypothalamic peptide signals the pituitary, which releases growth hormone toward liver and tissue.",
    caption: "Hypothalamus to pituitary to liver. Timing of the pulse is the pharmacology.",
    arms: [
      { receptor: "Pituitary", effect: "Growth hormone pulse", color: "var(--accent-blue)" },
      { receptor: "Liver", effect: "IGF-1", color: "var(--accent-teal)" },
    ],
  },
  neuropeptides: {
    alt: "A short cyclic peptide leaves the hypothalamus and binds a receptor that changes smooth muscle and social signaling.",
    caption: "A nine-residue ring and one receptor class. Residue swaps retune the same scaffold.",
    arms: [
      { receptor: "GPCR", effect: "Smooth muscle, behavior", color: "var(--accent)" },
    ],
  },
  "reproductive-gonadal": {
    alt: "A hypothalamic pulse drives the pituitary gonadotroph, which drives the gonad.",
    caption: "Pulse frequency is the message. Continuous exposure desensitizes the same receptor.",
    arms: [
      { receptor: "Pituitary", effect: "LH / FSH", color: "var(--accent-rose)" },
      { receptor: "Gonad", effect: "Steroid output", color: "var(--accent-amber)" },
    ],
  },
};

export function MechanismSchematic({ family }: { family?: string }): ReactNode {
  if (!family || !FAMILY_COPY[family]) return null;
  const spec = FAMILY_COPY[family];
  const height = 80 + spec.arms.length * 72;
  return (
    <figure className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-panel/30 p-6">
      <svg viewBox={`0 0 640 ${height}`} className="w-full" role="img" aria-label={spec.alt}>
        <circle cx="120" cy={height / 2} r="46" fill="color-mix(in srgb, var(--accent) 14%, transparent)" stroke="var(--accent)" />
        <text x="120" y={height / 2 + 4} textAnchor="middle" fontSize="13" fill="var(--ink)" fontFamily="var(--font-space-grotesk), sans-serif">
          Peptide
        </text>
        {spec.arms.map((arm, i) => {
          const y = 56 + i * 72;
          return (
            <g key={arm.receptor}>
              <path d={`M 166 ${height / 2} C 240 ${height / 2}, 280 ${y}, 360 ${y}`} fill="none" stroke={arm.color} strokeWidth="2" />
              <rect x="360" y={y - 22} width="240" height="44" rx="12" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke={arm.color} />
              <text x="380" y={y - 2} fontSize="13" fill="var(--ink)" fontFamily="var(--font-space-grotesk), sans-serif">
                {arm.receptor}
              </text>
              <text x="380" y={y + 14} fontSize="11" fill="var(--ink)" opacity="0.65">
                {arm.effect}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-4 border-t border-ink/[0.06] pt-4 text-sm leading-6 text-ink/55">{spec.caption}</figcaption>
    </figure>
  );
}
