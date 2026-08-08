// Single source of truth for the peptide-hormone signaling families.
// The landing grid renders the summary fields; each /families/[slug] hub
// renders the full record. Keep content reference-grade and accurate —
// educational, not medical advice.

export interface Signal {
  name: string;
  role: string;
}

export interface Family {
  slug: string;
  name: string;
  /** Tailwind text-color class for the accent (from globals.css tokens). */
  accent: string;
  /** One-line summary for the landing card. */
  blurb: string;
  /** Compact example list for the landing card. */
  examples: string;
  /** Hub hero subtitle. */
  tagline: string;
  /** 2–3 short paragraphs of orientation. */
  overview: string[];
  /** Key hormones / receptors with a one-line role each. */
  signals: Signal[];
  /** Reference-grade notes — what's settled, what's studied, what's open. */
  notes: string[];
  /** Seed questions to hand the research agent. */
  questions: string[];
}

export const FAMILIES: Family[] = [
  {
    slug: "incretins-metabolic",
    name: "Incretins & metabolic",
    accent: "text-accent",
    blurb: "Glucose-dependent signaling that reshaped obesity and diabetes care.",
    examples: "GLP-1 · GIP · glucagon · amylin · insulin",
    tagline: "The glucose-sensing peptides behind the modern metabolic toolkit.",
    overview: [
      "Incretin hormones are released from the gut in response to a meal and amplify insulin secretion in a glucose-dependent way — the so-called incretin effect, where oral glucose triggers far more insulin than the same load given intravenously.",
      "The two dominant incretins are GLP-1 (glucagon-like peptide-1) and GIP (glucose-dependent insulinotropic polypeptide). Pharmacological agonism of their receptors — singly, or as GLP-1/GIP co-agonists — underpins the current generation of metabolic therapeutics studied for type 2 diabetes and weight regulation.",
      "Surrounding the incretins sit the other metabolic peptides that set glucose tone: insulin and glucagon from the pancreatic islet, and amylin, co-secreted with insulin, which slows gastric emptying and modulates satiety.",
    ],
    signals: [
      { name: "GLP-1", role: "Incretin; glucose-dependent insulin release, slowed gastric emptying, central satiety." },
      { name: "GIP", role: "Incretin; insulinotropic, with distinct adipose and CNS actions studied in co-agonism." },
      { name: "Glucagon", role: "Counter-regulatory; raises hepatic glucose output, increases energy expenditure." },
      { name: "Amylin", role: "Co-secreted with insulin; slows gastric emptying, suppresses glucagon, promotes satiety." },
      { name: "Insulin", role: "Anabolic master switch for glucose uptake and storage." },
    ],
    notes: [
      "The incretin effect is blunted in type 2 diabetes, which motivated receptor-agonist pharmacology rather than incretin replacement.",
      "Receptor agonists are engineered for protease resistance and long half-life; native GLP-1 is degraded by DPP-4 within minutes.",
      "Dual and triple agonism (GLP-1/GIP, GLP-1/GIP/glucagon) is an active design frontier — the rationale is additive metabolic effects, not a single pathway.",
      "Muscle preservation during rapid weight loss is an open question driving interest in adjacent myostatin/activin pathways.",
    ],
    questions: [
      "How do GLP-1 and GIP receptor agonists differ mechanistically?",
      "What does the clinical trial evidence show for GLP-1/GIP co-agonism in weight regulation?",
      "Why is amylin co-secreted with insulin, and what does it add?",
    ],
  },
  {
    slug: "growth-repair",
    name: "Growth & repair",
    accent: "text-accent-blue",
    blurb: "The somatotropic axis and the secretagogues that pulse it.",
    examples: "GH · IGF-1 · GHRH · ghrelin · GHRPs",
    tagline: "How the body times growth signals — and the peptides that release them.",
    overview: [
      "Growth hormone (GH) is released from the anterior pituitary in pulses, set by the opposing hypothalamic signals GHRH (stimulatory) and somatostatin (inhibitory). Much of GH's downstream effect is mediated by IGF-1, produced largely in the liver.",
      "A separate axis — ghrelin and the synthetic growth-hormone secretagogues (GHRPs, and small-molecule ghrelin-receptor agonists) — acts on the GHS-R receptor to amplify GH pulses, distinct from the GHRH pathway.",
      "Because the axis is pulsatile and feedback-regulated, the pharmacology of releasing peptides differs fundamentally from administering GH directly — the former works with the body's own rhythm, the latter overrides it.",
    ],
    signals: [
      { name: "GH", role: "Pulsatile anterior-pituitary hormone; drives growth and metabolism, largely via IGF-1." },
      { name: "IGF-1", role: "Hepatic mediator of GH; promotes tissue growth and provides negative feedback." },
      { name: "GHRH", role: "Hypothalamic releasing hormone; stimulates GH synthesis and secretion." },
      { name: "Ghrelin", role: "Stomach-derived; GHS-R agonist that amplifies GH pulses and signals hunger." },
      { name: "GHRPs", role: "Synthetic GH secretagogues acting at GHS-R, separate from the GHRH receptor." },
    ],
    notes: [
      "GHRH-pathway and ghrelin-pathway secretagogues are synergistic because they act on different receptors.",
      "Somatostatin is the brake on the axis — any account of GH timing has to include it.",
      "IGF-1 feedback means sustained secretagogue exposure does not produce unbounded GH; the loop self-limits.",
      "Distinguish endogenous-releasing approaches from exogenous GH — the safety and regulatory profiles are not the same.",
    ],
    questions: [
      "How do GHRH analogs and GHRPs differ in mechanism?",
      "What is the role of somatostatin in shaping GH pulses?",
      "How does IGF-1 feedback regulate the somatotropic axis?",
    ],
  },
  {
    slug: "melanocortins",
    name: "Melanocortins",
    accent: "text-accent-amber",
    blurb: "Pigmentation, appetite, inflammation, and sexual function from one receptor family.",
    examples: "α-MSH · MC1R–MC5R · setmelanotide",
    tagline: "One peptide family, five receptors, strikingly different physiology.",
    overview: [
      "The melanocortin system is built from peptides cleaved from pro-opiomelanocortin (POMC) — α-, β-, and γ-MSH and ACTH — acting on five G-protein-coupled receptors, MC1R through MC5R, each with its own tissue distribution and physiology.",
      "The same ligand family touches pigmentation (MC1R on melanocytes), adrenal steroidogenesis (MC2R/ACTH), energy balance and appetite (MC4R in the hypothalamus), and exocrine and immune functions (MC5R). This receptor-level divergence is what makes the family so biologically broad.",
      "MC4R agonism is the basis of approved therapy for specific genetic obesity, while MC1R pharmacology underlies pigmentation research — the receptors are related but the clinical stories are separate.",
    ],
    signals: [
      { name: "α-MSH", role: "Core melanocortin ligand; pigmentation, appetite, and anti-inflammatory signaling." },
      { name: "MC1R", role: "Melanocyte receptor; governs eumelanin vs pheomelanin synthesis." },
      { name: "MC4R", role: "Hypothalamic receptor; central regulator of appetite and energy balance." },
      { name: "ACTH", role: "Acts at MC2R to drive adrenal cortisol synthesis — the endocrine arm of the family." },
      { name: "Setmelanotide", role: "MC4R agonist studied in specific genetic obesity syndromes." },
    ],
    notes: [
      "POMC is a single precursor cleaved tissue-specifically into multiple active peptides — context determines the product.",
      "Receptor selectivity is the whole game: an MC4R-driven appetite effect and an MC1R-driven pigment effect come from overlapping ligands on different receptors.",
      "MC4R loss-of-function is one of the most common monogenic causes of obesity, which is why targeted agonism is therapeutically interesting.",
      "Agonist selectivity across MC1R–MC5R is the key safety and specificity question for any candidate.",
    ],
    questions: [
      "How does receptor selectivity across MC1R–MC5R determine a melanocortin agonist's effects?",
      "What is the mechanism of MC4R agonism in genetic obesity?",
      "How is POMC processed differently across tissues?",
    ],
  },
  {
    slug: "neuropeptides",
    name: "Neuropeptides",
    accent: "text-accent-purple",
    blurb: "Hypothalamic and posterior-pituitary signals that tune behavior and fluid balance.",
    examples: "oxytocin · vasopressin · CRH · TRH",
    tagline: "Short peptides that set physiology and behavior from the brain outward.",
    overview: [
      "The posterior pituitary releases two closely related nonapeptides — oxytocin and vasopressin (ADH) — synthesized in the hypothalamus and differing by only two amino acids, yet governing very different physiology: social bonding and parturition versus water retention and vascular tone.",
      "The hypothalamic releasing hormones — CRH, TRH, GnRH — sit at the top of the major endocrine axes, each triggering a specific anterior-pituitary output (ACTH, TSH, and the gonadotropins respectively).",
      "Neuropeptides illustrate how small sequence differences and receptor distribution, not size, encode specificity — a recurring theme across the peptide-hormone system.",
    ],
    signals: [
      { name: "Oxytocin", role: "Parturition, lactation, and social/affiliative behavior." },
      { name: "Vasopressin", role: "Also called ADH; renal water retention and vasoconstriction; osmotic control." },
      { name: "CRH", role: "Apex of the HPA stress axis; drives pituitary ACTH release." },
      { name: "TRH", role: "Drives pituitary TSH release; sets thyroid-axis tone." },
    ],
    notes: [
      "Oxytocin and vasopressin differ by two residues yet act on distinct receptor families — a textbook case of sequence-level specificity.",
      "Releasing hormones are pulsatile; continuous (non-pulsatile) exposure can desensitize the downstream axis (notably GnRH).",
      "Central versus peripheral receptor distribution explains why these peptides have both behavioral and physiological roles.",
    ],
    questions: [
      "Why do oxytocin and vasopressin have such different effects despite near-identical sequences?",
      "How does CRH sit atop the HPA axis?",
      "Why does pulsatile vs continuous releasing-hormone exposure matter?",
    ],
  },
  {
    slug: "gut-appetite",
    name: "Gut & appetite",
    accent: "text-accent-teal",
    blurb: "The enteroendocrine peptides that report on the meal you just ate.",
    examples: "PYY · CCK · secretin · motilin",
    tagline: "The gut's hormonal report on digestion, satiety, and motility.",
    overview: [
      "The gut is the body's largest endocrine organ. Enteroendocrine cells lining the GI tract release peptides in response to nutrients, coordinating digestion, motility, and the satiety signals that reach the brain.",
      "PYY and (from the same L-cells) GLP-1 are released after meals and promote satiety; CCK triggers gallbladder contraction and pancreatic enzyme release; secretin regulates bicarbonate; motilin paces the migrating motor complex between meals.",
      "Because several of these peptides converge on appetite and gastric emptying, the gut–brain axis is central to understanding both normal satiety and metabolic pharmacology.",
    ],
    signals: [
      { name: "PYY", role: "Post-meal satiety signal from intestinal L-cells." },
      { name: "CCK", role: "Triggers gallbladder contraction, pancreatic enzymes, and satiety." },
      { name: "Secretin", role: "Stimulates pancreatic bicarbonate; neutralizes gastric acid in the duodenum." },
      { name: "Motilin", role: "Paces the migrating motor complex — gut housekeeping between meals." },
    ],
    notes: [
      "L-cells co-secrete GLP-1 and PYY, linking this family directly to the incretin/metabolic axis.",
      "Satiety is multi-signal: no single gut peptide is the 'fullness hormone' — they act in concert.",
      "Motilin's between-meal role is distinct from the post-meal satiety peptides — timing is the differentiator.",
    ],
    questions: [
      "How do PYY and CCK contribute to satiety, and how do they differ?",
      "What is the migrating motor complex and how does motilin pace it?",
      "How does the gut–brain axis regulate appetite?",
    ],
  },
  {
    slug: "reproductive-gonadal",
    name: "Reproductive & gonadal",
    accent: "text-accent-rose",
    blurb: "Pulsatile control of the reproductive axis, from hypothalamus to gonad.",
    examples: "GnRH · LH · FSH · kisspeptin · hCG",
    tagline: "The pulsatile cascade that governs the reproductive axis.",
    overview: [
      "The hypothalamic–pituitary–gonadal (HPG) axis runs on rhythm. GnRH is released from the hypothalamus in pulses, driving the anterior pituitary to secrete the gonadotropins LH and FSH, which in turn act on the gonads to produce sex steroids and gametes.",
      "Upstream of GnRH, kisspeptin is the key gatekeeper that gates pulse generation — a comparatively recent addition to the model of how the axis is switched on. hCG, structurally similar to LH, sustains the corpus luteum in early pregnancy.",
      "The defining feature of this axis is pulse frequency: the same hormone, delivered in pulses versus continuously, produces opposite downstream effects — the basis for both stimulation and suppression strategies.",
    ],
    signals: [
      { name: "GnRH", role: "Pulsatile hypothalamic driver of the gonadotropins." },
      { name: "LH", role: "Triggers ovulation and gonadal steroidogenesis." },
      { name: "FSH", role: "Drives follicular development and spermatogenesis." },
      { name: "Kisspeptin", role: "Upstream gatekeeper that gates GnRH pulse generation." },
      { name: "hCG", role: "LH-like; sustains the corpus luteum in early pregnancy." },
    ],
    notes: [
      "Pulsatile GnRH stimulates the axis; continuous GnRH-agonist exposure paradoxically suppresses it via receptor desensitization.",
      "Kisspeptin reframed the model of how puberty and the reproductive axis are switched on.",
      "LH and hCG share receptor activity, which is why hCG can substitute for an LH signal in some contexts.",
    ],
    questions: [
      "Why does pulsatile vs continuous GnRH exposure have opposite effects?",
      "What role does kisspeptin play in gating the reproductive axis?",
      "How do LH and FSH divide the work at the gonad?",
    ],
  },
  {
    slug: "adipokines",
    name: "Adipokines & energy balance",
    accent: "text-accent-amber",
    blurb: "The hormones fat tissue uses to report energy reserves to the brain.",
    examples: "leptin · adiponectin",
    tagline: "Adipose tissue as an endocrine organ — reporting how much fuel is in the tank.",
    overview: [
      "Adipose tissue is not inert storage. It is an endocrine organ that secretes peptide hormones — the adipokines — which report the size of the body's energy reserves to the brain and tune whole-body metabolism.",
      "Leptin signals the size of fat stores and restrains appetite; adiponectin tracks metabolic health and improves insulin sensitivity. Their dysregulation sits at the center of obesity and metabolic disease, which is why this family connects directly to the incretin and appetite pathways.",
    ],
    signals: [
      { name: "Leptin", role: "Reports fat-store size to the hypothalamus; restrains appetite." },
      { name: "Adiponectin", role: "Improves insulin sensitivity; rises as fat mass falls — the inverse of leptin." },
    ],
    notes: [
      "Leptin resistance — high leptin with a blunted response — is a hallmark of common obesity, distinct from rare leptin deficiency.",
      "Adiponectin is unusual: its levels fall as fat mass rises, the opposite of leptin.",
      "These adipokines tie this family directly to the incretin and appetite-regulating systems.",
    ],
    questions: [
      "Why does leptin rise with fat mass while adiponectin falls?",
      "What is leptin resistance, and how does it differ from leptin deficiency?",
    ],
  },
  {
    slug: "calcium-bone",
    name: "Calcium & bone",
    accent: "text-accent-blue",
    blurb: "The peptide hormones that hold blood calcium in a tight range.",
    examples: "PTH · calcitonin · PTHrP",
    tagline: "A fast hormonal loop that keeps blood calcium within a narrow band.",
    overview: [
      "Blood calcium is held within a narrow range by a fast-acting hormonal loop. Parathyroid hormone raises it; calcitonin opposes it; vitamin D (a steroid, not a peptide) supplies the slower arm.",
      "These signals act on bone, kidney, and gut to move calcium in and out of the blood. The same PTH receptor is also engaged by PTH-related protein in development — and pathologically in some cancers.",
    ],
    signals: [
      { name: "PTH", role: "Raises blood calcium via bone, kidney, and (indirectly) gut." },
      { name: "Calcitonin", role: "Lowers blood calcium; opposes PTH." },
      { name: "PTHrP", role: "Shares the PTH1 receptor; key in development and in hypercalcemia of malignancy." },
    ],
    notes: [
      "PTH and calcitonin are a classic opposing pair — raise versus lower calcium.",
      "Intermittent PTH exposure builds bone while continuous exposure breaks it down — a pulsatility effect echoing other axes.",
      "PTHrP shares the PTH1 receptor, which is why it can drive hypercalcemia in malignancy.",
    ],
    questions: [
      "Why does intermittent vs continuous PTH have opposite effects on bone?",
      "How do PTH and calcitonin oppose each other?",
    ],
  },
  {
    slug: "cardiovascular",
    name: "Cardiovascular & natriuretic",
    accent: "text-accent-teal",
    blurb: "Peptides the heart and vessels use to manage pressure and fluid.",
    examples: "ANP · BNP · CNP",
    tagline: "The heart as an endocrine organ — releasing peptides to shed the load that stretches it.",
    overview: [
      "The heart is also an endocrine organ. When its chambers stretch under volume or pressure load, cardiac myocytes release natriuretic peptides that promote sodium and water excretion and relax blood vessels — lowering the load that triggered them.",
      "ANP and BNP act through a guanylyl-cyclase-linked receptor to raise cGMP; BNP's blood level is a routine clinical marker of heart failure. Alongside them sit the vasoactive peptides angiotensin II and endothelin-1, which push the other way.",
    ],
    signals: [
      { name: "ANP", role: "Atrial peptide; promotes natriuresis and vasodilation." },
      { name: "BNP", role: "Ventricular peptide; a widely used heart-failure biomarker." },
      { name: "CNP", role: "Endothelial/CNS peptide; vascular tone and endochondral bone growth." },
    ],
    notes: [
      "Natriuretic peptides signal through membrane guanylyl-cyclase receptors (NPR-A/B), raising cGMP — a different second messenger from the cAMP/GPCR families.",
      "BNP and its NT-proBNP fragment are standard heart-failure biomarkers.",
      "Angiotensin II and endothelin-1 are the opposing vasoconstrictor peptides in this system.",
    ],
    questions: [
      "How do natriuretic peptides lower cardiac load?",
      "Why is BNP used as a heart-failure biomarker?",
    ],
  },
  {
    slug: "muscle-tgfb",
    name: "Muscle & TGF-β signaling",
    accent: "text-accent-purple",
    blurb: "The signals that cap muscle growth — and the targets for releasing the brake.",
    examples: "myostatin · activin A · follistatin",
    tagline: "The brake on muscle mass, and the antagonists that let it off.",
    overview: [
      "Skeletal muscle mass is actively restrained. Myostatin, a member of the TGF-β superfamily, is a negative regulator: it signals through activin type II receptors and Smad2/3 to limit muscle growth. Disable it and muscle mass increases markedly.",
      "Activin A signals through the same receptors with broader roles, and follistatin is the natural antagonist that binds and neutralizes both — raising muscle. This system is a drug-development frontier, especially for preserving muscle during the rapid weight loss seen with incretin therapies.",
    ],
    signals: [
      { name: "Myostatin", role: "TGF-β-family negative regulator of skeletal muscle mass." },
      { name: "Activin A", role: "Signals through activin type II receptors; muscle, fibrosis, and more." },
      { name: "Follistatin", role: "Endogenous antagonist that neutralizes myostatin and activin." },
    ],
    notes: [
      "Myostatin and activin signal through activin type II receptors (ActRIIA/B) and Smad2/3 — distinct from the GPCR families.",
      "Follistatin is the endogenous antagonist; blocking myostatin/activin is the basis of investigational muscle-preserving therapeutics.",
      "This is the muscle-preservation frontier flagged by the GLP-1 weight-loss story.",
    ],
    questions: [
      "How does myostatin limit muscle growth?",
      "Why is the myostatin/activin pathway targeted for muscle preservation during weight loss?",
    ],
  },
  {
    slug: "repair",
    name: "Repair & regenerative",
    accent: "text-accent-rose",
    blurb: "Endogenous repair signals — and the community 'research peptides' that target them.",
    examples: "thymosin β4 · GHK-Cu · BPC-157 · TB-500",
    tagline: "Where tissue-repair biology meets the most-hyped corner of the peptide world — graded honestly.",
    overview: [
      "Tissue repair is coordinated by peptide signals that regulate the cytoskeleton, angiogenesis, and inflammation. Thymosin β4 sequesters actin and supports wound healing; the copper-binding tripeptide GHK influences skin remodeling.",
      "This family is also where the popular 'research peptides' cluster — compounds like BPC-157 and TB-500 that are widely discussed but, in most cases, supported predominantly by preclinical (animal) data. Each entry carries an explicit evidence badge so the biology stays separated from the marketing.",
    ],
    signals: [
      { name: "Thymosin β4", role: "Endogenous actin-sequestering peptide; wound healing and angiogenesis." },
      { name: "GHK-Cu", role: "Endogenous copper-binding tripeptide; skin remodeling and repair signaling." },
      { name: "BPC-157", role: "Synthetic peptide with broad preclinical repair claims; limited human data." },
      { name: "TB-500", role: "Synthetic thymosin β4 fragment marketed for recovery; preclinical evidence." },
    ],
    notes: [
      "Several entries here are synthetic 'research peptides' with limited or preclinical human evidence — read the evidence badge on each.",
      "Thymosin β4 (endogenous) and its fragment TB-500 are frequently conflated in the community; they are not the same thing.",
      "Honest evidence grading is the point: real biology, clearly separated from claims.",
    ],
    questions: [
      "What is actually established about BPC-157 versus what is merely claimed?",
      "How does thymosin β4 support wound healing?",
    ],
  },
  {
    slug: "mitochondrial",
    name: "Mitochondrial-derived peptides",
    accent: "text-accent-blue",
    blurb: "Short peptides encoded inside the mitochondrial genome that signal to the cell.",
    examples: "MOTS-c · humanin",
    tagline: "Signals from the cell's powerhouses — a recently discovered layer of peptide biology.",
    overview: [
      "Beyond the nuclear genome, the mitochondria's own small circular DNA encodes a handful of short peptides — the mitochondrial-derived peptides (MDPs). Discovered only recently, they act as signals from the cell's powerhouses to the rest of the body, influencing metabolism and stress resistance.",
      "MOTS-c and humanin are the best-characterized. MOTS-c links to metabolic homeostasis and exercise biology; humanin is broadly cytoprotective. The field is young and much of the evidence is preclinical — but it represents a genuinely new layer of peptide signaling.",
    ],
    signals: [
      { name: "MOTS-c", role: "Metabolic regulator (AMPK); described as an exercise-mimetic in animal studies." },
      { name: "Humanin", role: "Broadly cytoprotective and anti-apoptotic; neuroprotective roles studied." },
    ],
    notes: [
      "MDPs are encoded in mitochondrial DNA, not the nuclear genome — an unusual origin for a signaling peptide.",
      "MOTS-c acts partly through AMPK and is described as an exercise-mimetic in animal studies.",
      "An emerging area: most evidence is preclinical, and the human roles are still being mapped.",
    ],
    questions: [
      "What are mitochondrial-derived peptides, and why are they unusual?",
      "How does MOTS-c relate to metabolism and exercise?",
    ],
  },
];

export function getFamily(slug: string): Family | undefined {
  return FAMILIES.find((f) => f.slug === slug);
}
