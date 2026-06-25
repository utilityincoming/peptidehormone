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
