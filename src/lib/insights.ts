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
    slug: "the-gip-paradox",
    title: "The GIP paradox",
    dek: "Tirzepatide turns the GIP receptor on. Maridebart cafraglutide turns the same receptor off. Both drive weight loss. That should be impossible under a \"more signal is better\" model of pharmacology — and the fact that it isn't is one of the most revealing puzzles on the metabolic frontier. How a receptor can be pushed either way and land in the same place.",
    family: "incretins-metabolic",
    readingMinutes: 9,
    reviewed: "July 2026",
  },
  {
    slug: "glp-1-in-a-pill",
    title: "Putting GLP-1 in a pill",
    dek: "A peptide is food — swallow it and your gut digests it before it works, which is why this class has lived on the needle. Yet the pill is arriving, by two philosophically opposite routes: smuggle the fragile peptide across the gut wall, or stop using a peptide at all and rebuild the signal from a rugged small molecule. The second one is the real revolution, and it comes down to a quiet truth about receptors — they read the message, not the messenger.",
    family: "incretins-metabolic",
    readingMinutes: 9,
    reviewed: "July 2026",
  },
  {
    slug: "insulins-forgotten-twin",
    title: "Insulin's forgotten twin",
    dek: "Every time the pancreas releases insulin, it releases a second hormone from the same granule — amylin. For a century insulin took all the credit while its partner went unnamed. Amylin runs a receptor it borrowed rather than built, sabotages itself by clumping into the amyloid that scars a diabetic pancreas, and is now the metabolic frontier's newest axis. The story of the twin the body never forgot.",
    family: "incretins-metabolic",
    readingMinutes: 10,
    reviewed: "July 2026",
  },
  {
    slug: "is-there-a-glp-4",
    title: "Is there a GLP-4?",
    dek: "Single agonist, then dual, then triple — so the next breakthrough must be a bigger number, right? There is no GLP-4. GLP-1's \"1\" was never a version number, and seeing why reveals where the field is actually going: not up the same axis, but sideways — into amylin, into GIP antagonism, into the pill and the quality of the weight you keep.",
    family: "incretins-metabolic",
    readingMinutes: 9,
    reviewed: "July 2026",
  },
  {
    slug: "getting-the-molecule-in",
    title: "The delivery problem",
    dek: "A peptide is, chemically, food — swallow it and your gut digests it; rub it on your skin and it never gets past the surface. The needle isn't a preference, it's physics. Inside the barriers that block every other route, why most \"oral\" peptide claims are marketing, and the narrow cases where a nasal spray genuinely works.",
    family: "incretins-metabolic",
    readingMinutes: 9,
    reviewed: "July 2026",
  },
  {
    slug: "where-the-powder-comes-from",
    title: "Where the powder comes from",
    dek: "Most of the world's finished, lyophilized peptide traces back to a handful of Chinese manufacturing lines — and China's 2026 drug law just pushed that supply chain toward real traceability. The strategic read: \"American made\" often marks more hand-offs, not fewer, and in lyophilized peptide every hand-off is an irreversible chance to lose purity. Fewest transfers, finished direct, wins.",
    family: "incretins-metabolic",
    readingMinutes: 9,
    reviewed: "July 2026",
  },
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
