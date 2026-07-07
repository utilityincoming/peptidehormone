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
    slug: "the-triple-agonist",
    title: "The triple agonist",
    dek: "The newest metabolic peptides don't mimic one hormone — they play three at once. Why the field moved from a single signal to a chord, and why glucagon, of all things, earns a seat.",
    family: "incretins-metabolic",
    readingMinutes: 8,
    reviewed: "July 2026",
  },
  {
    slug: "early-adopters-catalog",
    title: "The community found it first",
    dek: "Long before GLP-1 went mainstream, the community running peptide protocols was the field's informal R&D — and their demand shaped the catalogs of synthesis companies and compounding pharmacies. Their core instinct, foundation first, is exactly what the metabolic era is proving right.",
    family: "growth-repair",
    readingMinutes: 9,
    reviewed: "July 2026",
  },
  {
    slug: "glp-1-muscle-preservation",
    title: "Keeping the muscle on GLP-1",
    dek: "The next leap in weight loss isn't losing more — it's losing better. Pair a GLP-1 drug with myostatin inhibition and you can strip fat while sparing, even building, muscle. Inside the TGF-β biology and the combination therapies engineering it.",
    family: "muscle-tgfb",
    readingMinutes: 10,
    reviewed: "July 2026",
  },
  {
    slug: "insulin-to-the-peptide-boom",
    title: "From insulin to the peptide boom",
    dek: "A hundred years of peptide medicine — the first miracle, the families it built, and how the molecules quietly running your body became a 2026 cultural phenomenon.",
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
