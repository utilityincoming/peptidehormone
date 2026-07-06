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
