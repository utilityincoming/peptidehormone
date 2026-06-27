// Long-form editorial deep-dives — the "depth over benefits" layer. Metadata
// lives here for the index + cross-links; each article body is a hand-authored
// page under src/app/insights/[slug] for full control over diagrams and layout.

export interface Insight {
  slug: string;
  title: string;
  dek: string;
  /** Family slug this piece anchors to (for accent + cross-links). */
  family: string;
  readingMinutes: number;
  /** Human label; mechanisms are reviewed, not dated to a publish cycle. */
  reviewed: string;
}

export const INSIGHTS: Insight[] = [
  {
    slug: "melanocortin-system",
    title: "The melanocortin system: one peptide family, five receptors",
    dek: "Pigment, cortisol, appetite, sexual function — all from peptides cut out of a single precursor. The physiology isn't in the ligand; it's in which receptor, in which tissue, it happens to reach.",
    family: "melanocortins",
    readingMinutes: 9,
    reviewed: "July 2026",
  },
  {
    slug: "growth-hormone-axis",
    title: "The growth-hormone axis: why the body doses itself in pulses",
    dek: "GHRH and ghrelin push, somatostatin brakes, IGF-1 closes the loop. A tour of the axis — and why brief, low-amplitude signals, not sustained floods, are how the system is built to work.",
    family: "growth-repair",
    readingMinutes: 10,
    reviewed: "June 2026",
  },
  {
    slug: "from-insulin-to-glp-1",
    title: "From insulin to GLP-1: a short history of peptide medicine",
    dek: "A century in three acts — insulin proved a peptide could be a drug, fertility medicine learned to steer a whole hormonal axis, and GLP-1 shows what happens when you engineer the molecule itself.",
    family: "incretins-metabolic",
    readingMinutes: 11,
    reviewed: "June 2026",
  },
  {
    slug: "glp-1-signaling",
    title: "How GLP-1 actually works",
    dek: "From an intestinal cell to a closed potassium channel: the receptor, the second messenger, and why the whole system only fires when glucose is high.",
    family: "incretins-metabolic",
    readingMinutes: 9,
    reviewed: "June 2026",
  },
];

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}
