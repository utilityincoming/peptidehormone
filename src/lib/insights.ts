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
    slug: "the-last-three-words",
    title: "The last three words",
    dek: "α-MSH is a thirteen-residue hormone that says several things at once — colour the skin, curb the appetite, calm the inflammation. Cut it down to its final three residues and you get KPV, which still says exactly one of them: enough. It keeps the anti-inflammatory clause, drops the pigment and the appetite, and — stranger still — delivers it by breaking the rule that a peptide has to knock on a receptor from the outside. The shortest sentence in the melanocortin system, and why it still parses.",
    family: "melanocortins",
    readingMinutes: 8,
    reviewed: "August 2026",
  },
  {
    slug: "the-other-pedal",
    title: "The other pedal",
    dek: "Muscle mass is set by two opposing forces, and this site has only told half the story — the brake, myostatin. The other half is the accelerator: the IGF-1 axis growth hormone works through, the local repair pulse a worked muscle splices for itself, and the research peptides — IGF-1 LR3, MGF — built to push it from outside. Why the accelerator is the older, stronger lever, why it's also the harder and riskier one to pull, and what the honest evidence actually supports.",
    family: "growth-repair",
    readingMinutes: 9,
    reviewed: "August 2026",
  },
  {
    slug: "when-the-drug-works-too-well",
    title: "When the drug works too well",
    dek: "The people who struggle most to come off a GLP-1 are usually the ones it helped most - and that is not weakness, it is physiology doing exactly what it evolved to do. The body defends the weight it has lost, the drug holds that defense at bay, and stopping lets it back in. What the withdrawal trials actually show, why 'chronic' is the honest word for obesity, and how to think about time off: maintenance, tapering, and an off-ramp with a return ticket.",
    family: "incretins-metabolic",
    readingMinutes: 11,
    reviewed: "August 2026",
  },
  {
    slug: "born-switched-off",
    title: "Born switched off",
    dek: "Myostatin, the body's brake on muscle, is manufactured pre-disabled: folded shut around its own off-switch and released into the blood inert. Arming it takes two molecular cuts by two different enzymes. That safety-catch design isn't a quirk - it's the exact vulnerability the most selective muscle drugs are built to exploit.",
    family: "muscle-tgfb",
    readingMinutes: 8,
    reviewed: "August 2026",
  },
  {
    slug: "one-receptor-a-whole-family",
    title: "One receptor, a whole family",
    dek: "Myostatin isn't the only brake on muscle. Activin A and GDF-11 sign in through the very same receptor - and GDF-11 is so nearly identical to myostatin that a famous \"rejuvenation\" claim couldn't reliably tell the two apart. Why the muscle brake has a built-in backup, and why that redundancy, not any single molecule, decides how you drug it.",
    family: "muscle-tgfb",
    readingMinutes: 8,
    reviewed: "August 2026",
  },
  {
    slug: "the-complexity-ladder",
    title: "Where trust starts to mean something",
    dek: "Short synthetic peptides are cheap to make and, more to the point, cheap to verify — reversed-phase HPLC and a mass spec settle what they are in an afternoon, and a competitive market keeps them honest. Trust and availability only become live variables higher up the complexity ladder, at the folded biologics — antibodies, ligand traps, the myostatin inhibitors — where correctness lives in the fold, not the sequence, and only a bioassay can confirm it. Why complexity, not fraud, governs what you can actually source.",
    family: "muscle-tgfb",
    readingMinutes: 8,
    reviewed: "August 2026",
  },
  {
    slug: "what-you-can-actually-get",
    title: "Cataloged vs. reachable",
    dek: "A reference will tell you what a molecule is down to the receptor. None of them tell you the thing you actually act on: whether you can get it, in what form, this month. Availability is the frontier's real bottleneck — and unlike a sequence, it moves. Why what's reachable is itself information, and how a reference can publish it as data without becoming a store.",
    family: "incretins-metabolic",
    readingMinutes: 7,
    reviewed: "August 2026",
  },
  {
    slug: "peptide-half-life-engineering",
    title: "Two minutes to seven days",
    dek: "Natural GLP-1 is destroyed about two minutes after the gut releases it. Semaglutide — the same signal, essentially the same shape — survives a week. That gap is a five-thousand-fold engineering feat, and it wasn't achieved by making the peptide tougher. It was achieved by attaching it to something the body has already decided to keep. Inside the three tricks that turned a disposable hormone into a weekly drug, and why the next cadence is monthly.",
    family: "incretins-metabolic",
    readingMinutes: 10,
    reviewed: "July 2026",
  },
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
