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
  adipokines: {
    alt: "Fat tissue reports its size to the hypothalamus. Leptin rises with stores; adiponectin falls.",
    caption: "Adipose tissue as the sender. The arrows are the report, not a dosing scheme.",
    arms: [
      { receptor: "Hypothalamus", effect: "Leptin restrains appetite", color: "var(--accent-amber)" },
      { receptor: "Liver and muscle", effect: "Adiponectin and insulin sensitivity", color: "var(--accent-teal)" },
    ],
  },
  "calcium-bone": {
    alt: "Parathyroid hormone raises blood calcium through bone and kidney. Calcitonin opposes it.",
    caption: "A fast loop around blood calcium. Intermittent and continuous PTH are not the same signal.",
    arms: [
      { receptor: "Bone and kidney", effect: "PTH raises calcium", color: "var(--accent-blue)" },
      { receptor: "Bone", effect: "Calcitonin lowers calcium", color: "var(--accent-teal)" },
    ],
  },
  cardiovascular: {
    alt: "A stretched heart releases natriuretic peptide, which sheds salt and relaxes vessels.",
    caption: "The heart as a gland. Natriuretic peptides use a guanylyl-cyclase receptor, not the usual GPCR.",
    arms: [
      { receptor: "Kidney and vessels", effect: "Salt loss, vasodilation", color: "var(--accent-teal)" },
      { receptor: "APJ", effect: "Apelin: stronger beat, lower pressure", color: "var(--accent)" },
    ],
  },
  "muscle-tgfb": {
    alt: "Myostatin and activin hold muscle growth down through activin receptors. Follistatin blocks that brake.",
    caption: "A brake and its antagonist. This is TGF-β receptor signaling, not a GPCR.",
    arms: [
      { receptor: "Activin receptor", effect: "Myostatin limits muscle", color: "var(--accent-purple)" },
      { receptor: "The same receptor", effect: "Follistatin takes the brake off", color: "var(--accent-teal)" },
    ],
  },
  repair: {
    alt: "Local peptides are drawn next to cytoskeleton, vessels, and inflammation. The evidence grade is not in the drawing.",
    caption: "A local repair sketch. Read the evidence badge on the molecule; the cartoon does not grade it.",
    arms: [
      { receptor: "Cytoskeleton", effect: "Actin and cell movement", color: "var(--accent-rose)" },
      { receptor: "Wound edge", effect: "Vessels and inflammation", color: "var(--accent-amber)" },
    ],
  },
  mitochondrial: {
    alt: "A short peptide encoded in mitochondrial DNA leaves the organelle and signals to the rest of the cell.",
    caption: "The sender is the mitochondrion, not a gland. Most of this evidence is still preclinical.",
    arms: [
      { receptor: "Cell metabolism", effect: "MOTS-c and AMPK", color: "var(--accent-blue)" },
      { receptor: "Stressed cell", effect: "Humanin, cytoprotection", color: "var(--accent-teal)" },
    ],
  },
  melanocortins: {
    alt: "POMC is cut into melanocortin peptides that share a receptor family and diverge by which receptor they prefer.",
    caption: "One precursor, several receptors. Receptor choice is the pharmacology.",
    arms: [
      { receptor: "MC4R", effect: "Appetite and energy", color: "var(--accent-purple)" },
      { receptor: "MC1R", effect: "Pigment", color: "var(--accent-amber)" },
    ],
  },
  "gut-appetite": {
    alt: "A gut peptide reaches the vagus and the brainstem and changes appetite and motility.",
    caption: "The gut reporting a meal. The brainstem is the reader in this sketch.",
    arms: [
      { receptor: "Vagus and brainstem", effect: "Appetite and motility", color: "var(--accent-teal)" },
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
      <figcaption className="figure-caption">{spec.caption}</figcaption>
    </figure>
  );
}
