// Per-hormone reference monographs. Keyed by slug; each backreferences its
// signaling family. Content is reference-grade and intentionally concise —
// educational, not medical advice. Mechanisms summarize public scientific
// literature and may simplify active research.

export interface Hormone {
  slug: string;
  name: string;
  abbr?: string;
  /** Family slug (see lib/families.ts). */
  family: string;
  /** One-line identity for cards and meta descriptions. */
  summary: string;
  /** Structural class. */
  class: string;
  /** Where it is produced. */
  source: string;
  /** Primary receptor target(s). */
  receptor: string;
  /** 2–3 sentence mechanism. */
  mechanism: string;
  /** Reference notes — settled facts, studied uses, open questions. */
  facts: string[];
  /** Seed questions for the research agent. */
  questions: string[];
  /** Average molecular weight in daltons (approximate). */
  mw?: number;
  /** True when MW is a rough figure (glycoproteins, multiple active forms). */
  mwApprox?: boolean;
  /** Human-readable native circulating half-life. */
  halfLife?: string;
  /** Representative half-life in minutes, for sorting + calculator deep-links. */
  halfLifeMin?: number;
  /** Endogenous hormone, engineered analog, or community "research peptide". */
  type?: "endogenous" | "analog" | "research";
  /** Evidence tier — drives a filterable rigor badge. */
  evidence?: "Established" | "Clinical" | "Investigational" | "Preclinical" | "Limited";
  /** For analogs: slug of the endogenous hormone it is based on. */
  parent?: string;
}

export const EVIDENCE_TIERS = [
  "Established",
  "Clinical",
  "Investigational",
  "Preclinical",
  "Limited",
] as const;

const BASE: Hormone[] = [
  // ── Incretins & metabolic ──────────────────────────────────────────────
  {
    slug: "glp-1",
    name: "Glucagon-like peptide-1",
    abbr: "GLP-1",
    family: "incretins-metabolic",
    summary: "The incretin that anchors the modern metabolic toolkit.",
    class: "Proglucagon-derived peptide (~30–31 aa)",
    source: "Intestinal L-cells (and some CNS neurons)",
    receptor: "GLP-1 receptor (GLP-1R), a class B GPCR",
    mechanism:
      "Released from gut L-cells in response to nutrients, GLP-1 binds GLP-1R on pancreatic beta cells to amplify glucose-dependent insulin secretion. It also slows gastric emptying and signals satiety centrally. Native GLP-1 is degraded within minutes by DPP-4, which is why long-acting receptor agonists are engineered for protease resistance.",
    facts: [
      "Glucose-dependence is the safety crux: GLP-1 augments insulin only when glucose is elevated, limiting hypoglycemia risk relative to insulin secretagogues.",
      "Co-agonism with GIP (and, in some candidates, glucagon) is an active design strategy aimed at additive metabolic effects.",
      "The very short native half-life is the central pharmacological problem its agonists are built to solve.",
    ],
    questions: [
      "How does GLP-1 receptor agonism produce weight loss beyond glucose control?",
      "Why is DPP-4 resistance central to GLP-1 drug design?",
    ],
  },
  {
    slug: "gip",
    name: "Glucose-dependent insulinotropic polypeptide",
    abbr: "GIP",
    family: "incretins-metabolic",
    summary: "The second incretin, with distinct adipose and CNS biology.",
    class: "Incretin peptide (42 aa)",
    source: "Intestinal K-cells (duodenum/jejunum)",
    receptor: "GIP receptor (GIPR), a class B GPCR",
    mechanism:
      "GIP is secreted from K-cells after a meal and, like GLP-1, potentiates glucose-dependent insulin release. Beyond the islet it has actions on adipose tissue and the CNS that differ from GLP-1, which is why GIP/GLP-1 co-agonism is studied for effects neither achieves alone.",
    facts: [
      "GIP's adipose and central actions are an area of active investigation and debate.",
      "The incretin effect — far more insulin from oral than IV glucose — reflects combined GLP-1 and GIP signaling.",
      "Whether GIPR agonism or antagonism is metabolically preferable is not fully settled.",
    ],
    questions: [
      "Why is GIP/GLP-1 co-agonism studied rather than GLP-1 alone?",
      "What does the evidence say about GIP receptor agonism vs antagonism?",
    ],
  },
  {
    slug: "glucagon",
    name: "Glucagon",
    family: "incretins-metabolic",
    summary: "The counter-regulatory hormone that raises blood glucose.",
    class: "Proglucagon-derived peptide (29 aa)",
    source: "Pancreatic islet alpha cells",
    receptor: "Glucagon receptor (GCGR), a class B GPCR",
    mechanism:
      "Glucagon opposes insulin: in fasting or hypoglycemia it drives hepatic glycogenolysis and gluconeogenesis to raise blood glucose. It also increases energy expenditure, which is why glucagon agonism is explored as a component of triple co-agonists.",
    facts: [
      "Glucagon and GLP-1 are both cleaved from the same proglucagon precursor, tissue-specifically.",
      "Its energy-expenditure effect is the rationale for including controlled glucagon agonism in some metabolic candidates.",
      "Counter-regulation makes glucagon central to understanding hypoglycemia.",
    ],
    questions: [
      "Why include glucagon agonism in a triple incretin co-agonist?",
      "How is proglucagon processed differently in the gut vs the pancreas?",
    ],
  },
  {
    slug: "amylin",
    name: "Amylin",
    abbr: "IAPP",
    family: "incretins-metabolic",
    summary: "Co-secreted with insulin; the satiety and gastric-emptying partner.",
    class: "Islet amyloid polypeptide (37 aa)",
    source: "Pancreatic islet beta cells (with insulin)",
    receptor: "Amylin receptors (calcitonin receptor + RAMP complexes)",
    mechanism:
      "Amylin is released alongside insulin and complements it: it slows gastric emptying, suppresses inappropriate glucagon secretion, and promotes satiety. Together with insulin it shapes the post-meal glucose excursion.",
    facts: [
      "Amylin and insulin are co-packaged and co-secreted — a built-in partnership.",
      "Amylin-pathway agonism is studied as an adjunct to incretin therapy for added satiety.",
      "Native human amylin aggregates readily, which shaped the design of stabilized analogs.",
    ],
    questions: [
      "What does amylin add to insulin in post-meal glucose control?",
      "Why is amylin co-agonism studied alongside GLP-1 pathways?",
    ],
  },
  {
    slug: "insulin",
    name: "Insulin",
    family: "incretins-metabolic",
    summary: "The anabolic master switch for glucose uptake and storage.",
    class: "Two-chain peptide hormone (51 aa, A+B chains)",
    source: "Pancreatic islet beta cells",
    receptor: "Insulin receptor (a receptor tyrosine kinase)",
    mechanism:
      "Secreted in response to rising glucose, insulin binds its receptor tyrosine kinase to drive glucose uptake in muscle and fat (via GLUT4) and storage as glycogen and lipid. It is the dominant anabolic signal of the fed state.",
    facts: [
      "Insulin's receptor is a tyrosine kinase, unlike the GPCRs used by most peptide hormones here.",
      "The incretins act upstream — they amplify glucose-stimulated insulin secretion rather than replacing insulin.",
      "It was the first peptide hormone sequenced and the first produced by recombinant DNA.",
    ],
    questions: [
      "How does insulin signaling differ mechanistically from GPCR-based hormones?",
      "How do incretins amplify glucose-stimulated insulin secretion?",
    ],
  },

  // ── Incretin analogs & therapeutics ─────────────────────────────────────
  {
    slug: "semaglutide",
    name: "Semaglutide",
    family: "incretins-metabolic",
    type: "analog",
    evidence: "Established",
    parent: "glp-1",
    summary: "A long-acting GLP-1 receptor agonist engineered for once-weekly dosing.",
    class: "GLP-1 receptor agonist (acylated peptide, 31 aa)",
    source: "Synthetic analog of human GLP-1",
    receptor: "GLP-1 receptor (GLP-1R)",
    mechanism:
      "Semaglutide is a GLP-1 analog modified to resist DPP-4 and to bind albumin via a C18 fatty-diacid chain, stretching its half-life from GLP-1's ~2 minutes to roughly a week. At the receptor it is the same molecule as native GLP-1 — driving glucose-dependent insulin secretion, slowed gastric emptying, and central satiety. The engineering is entirely about durability and delivery, not a new mechanism.",
    facts: [
      "Two amino-acid substitutions plus fatty-acid acylation give albumin binding and DPP-4 resistance — the basis of weekly dosing.",
      "Approved for type 2 diabetes and chronic weight management; studied in cardiovascular and renal outcomes.",
      "Mechanistically identical at the receptor to native GLP-1 — see the GLP-1 reference for the underlying cascade.",
    ],
    questions: [
      "How does semaglutide's acylation extend its half-life versus native GLP-1?",
      "What does the clinical trial evidence show for semaglutide in weight management?",
    ],
    mw: 4113.6,
    halfLife: "~7 days (~165 h)",
    halfLifeMin: 9900,
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    family: "incretins-metabolic",
    type: "analog",
    evidence: "Established",
    parent: "gip",
    summary: "A dual GIP and GLP-1 receptor agonist — the first of the co-agonists.",
    class: "Dual GIP/GLP-1 receptor agonist (39 aa, acylated)",
    source: "Synthetic; engineered on a GIP backbone",
    receptor: "GIP receptor + GLP-1 receptor",
    mechanism:
      "Tirzepatide activates both the GIP and GLP-1 receptors from a single GIP-based, acylated peptide, with a half-life of about five days. Engaging two incretin pathways at once is studied for metabolic effects beyond either alone — the rationale behind incretin co-agonism.",
    facts: [
      "The first approved 'twincretin' — one molecule with dual GIP/GLP-1 agonism.",
      "Built on a GIP backbone with fatty-acid acylation for once-weekly dosing.",
      "Its dual mechanism is why it is studied head-to-head against single GLP-1 agonists.",
    ],
    questions: [
      "Why does dual GIP/GLP-1 agonism differ from a GLP-1 agonist alone?",
      "What does the evidence show for tirzepatide versus single-incretin agonists?",
    ],
    mw: 4813.5,
    halfLife: "~5 days (~120 h)",
    halfLifeMin: 7200,
  },
  {
    slug: "liraglutide",
    name: "Liraglutide",
    family: "incretins-metabolic",
    type: "analog",
    evidence: "Established",
    parent: "glp-1",
    summary: "A once-daily GLP-1 receptor agonist; an earlier acylated analog.",
    class: "GLP-1 receptor agonist (acylated, 31 aa)",
    source: "Synthetic analog of human GLP-1",
    receptor: "GLP-1 receptor (GLP-1R)",
    mechanism:
      "Liraglutide is a GLP-1 analog with a C16 fatty-acid acylation that promotes albumin binding and self-association, giving a ~13-hour half-life suited to once-daily dosing. It signals through the same GLP-1R cascade as native GLP-1.",
    facts: [
      "About 97% sequence identity to native GLP-1, with one substitution and a fatty-acid chain.",
      "Once-daily — an intermediate step between native GLP-1 and the weekly analogs.",
      "Approved for type 2 diabetes and weight management.",
    ],
    questions: [
      "How does liraglutide's half-life compare to native GLP-1 and to weekly analogs?",
    ],
    mw: 3751.2,
    halfLife: "~13 h",
    halfLifeMin: 780,
  },
  {
    slug: "exenatide",
    name: "Exenatide",
    family: "incretins-metabolic",
    type: "analog",
    evidence: "Established",
    parent: "glp-1",
    summary: "A GLP-1 receptor agonist derived from Gila monster venom (exendin-4).",
    class: "GLP-1 receptor agonist (exendin-4, 39 aa)",
    source: "Synthetic exendin-4; originally from Gila monster venom",
    receptor: "GLP-1 receptor (GLP-1R)",
    mechanism:
      "Exenatide is the synthetic form of exendin-4, a peptide from Gila monster venom that fully activates GLP-1R but — unlike human GLP-1 — is naturally resistant to DPP-4. That built-in resistance gives a far longer half-life than native GLP-1 without any acylation.",
    facts: [
      "Exendin-4's natural DPP-4 resistance is the discovery that made long-acting GLP-1 therapy feasible.",
      "Shares only ~53% identity with human GLP-1 yet fully activates the receptor.",
      "Available in immediate-release and extended-release (microsphere) formulations.",
    ],
    questions: [
      "Why is exendin-4 resistant to DPP-4 when native GLP-1 is not?",
    ],
    mw: 4186.6,
    halfLife: "~2.4 h (immediate-release)",
    halfLifeMin: 144,
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    family: "incretins-metabolic",
    type: "analog",
    evidence: "Investigational",
    parent: "glp-1",
    summary: "An investigational GIP/GLP-1/glucagon triple receptor agonist.",
    class: "GIP/GLP-1/glucagon triple agonist (acylated peptide)",
    source: "Synthetic; engineered tri-agonist",
    receptor: "GIP + GLP-1 + glucagon receptors",
    mechanism:
      "Retatrutide engages three receptors — GIP, GLP-1, and glucagon — from a single acylated peptide. Adding glucagon-receptor agonism recruits an energy-expenditure arm alongside the incretin effects. It is in clinical trials and not approved.",
    facts: [
      "A 'triple agonist' — incretin co-agonism extended to a third receptor.",
      "Glucagon-receptor agonism adds an energy-expenditure arm to the GLP-1/GIP effects.",
      "Investigational — under clinical study, not approved.",
    ],
    questions: [
      "What does adding glucagon agonism contribute in a tri-agonist?",
      "What is the current clinical trial status of retatrutide?",
    ],
    halfLife: "~6 days",
    halfLifeMin: 8640,
  },

  // ── Growth & repair ────────────────────────────────────────────────────
  {
    slug: "growth-hormone",
    name: "Growth hormone",
    abbr: "GH",
    family: "growth-repair",
    summary: "The pulsatile pituitary driver of growth and metabolism.",
    class: "Single-chain protein hormone (191 aa)",
    source: "Anterior pituitary somatotrophs",
    receptor: "Growth hormone receptor (GHR, JAK2/STAT signaling)",
    mechanism:
      "GH is released in pulses set by the balance of hypothalamic GHRH (stimulatory) and somatostatin (inhibitory). Much of its anabolic effect is indirect, mediated by IGF-1 produced in the liver, while it also exerts direct metabolic actions such as lipolysis.",
    facts: [
      "The axis is pulsatile and feedback-regulated — timing matters as much as amount.",
      "Releasing-peptide approaches (GHRH analogs, secretagogues) work with the body's own pulse; exogenous GH overrides it.",
      "IGF-1 provides negative feedback that limits unbounded GH output.",
    ],
    questions: [
      "How do GHRH and somatostatin together shape GH pulses?",
      "How does endogenous GH release differ from administering GH directly?",
    ],
  },
  {
    slug: "igf-1",
    name: "Insulin-like growth factor 1",
    abbr: "IGF-1",
    family: "growth-repair",
    summary: "The hepatic mediator of growth hormone's anabolic effects.",
    class: "Single-chain growth factor (70 aa)",
    source: "Liver (GH-stimulated) and local tissues",
    receptor: "IGF-1 receptor (IGF-1R, a receptor tyrosine kinase)",
    mechanism:
      "GH stimulates hepatic IGF-1, which carries out much of GH's tissue-growth effect and feeds back negatively on the pituitary and hypothalamus to restrain further GH release. IGF-1 circulates bound to IGF-binding proteins that modulate its availability.",
    facts: [
      "IGF-1 is the principal effector of GH's growth-promoting actions.",
      "Its negative feedback is why sustained secretagogue exposure does not produce limitless GH.",
      "IGF-binding proteins are a key layer controlling how much IGF-1 is bioavailable.",
    ],
    questions: [
      "How does IGF-1 feedback regulate the somatotropic axis?",
      "What role do IGF-binding proteins play in IGF-1 availability?",
    ],
  },
  {
    slug: "ghrh",
    name: "Growth-hormone-releasing hormone",
    abbr: "GHRH",
    family: "growth-repair",
    summary: "The hypothalamic signal that tells the pituitary to release GH.",
    class: "Hypothalamic releasing peptide (44 aa)",
    source: "Hypothalamus (arcuate nucleus)",
    receptor: "GHRH receptor (GHRHR), a class B GPCR",
    mechanism:
      "GHRH from the hypothalamus stimulates pituitary somatotrophs to synthesize and secrete GH, opposed by somatostatin. GHRH analogs are studied as a way to amplify endogenous, still-pulsatile GH rather than supplying GH exogenously.",
    facts: [
      "GHRH and the ghrelin/GHS-R pathway act on different receptors and are synergistic.",
      "Because GHRH works through the pituitary, the resulting GH retains feedback regulation.",
      "Somatostatin opposition is essential to the pulsatile pattern.",
    ],
    questions: [
      "How do GHRH analogs differ from GHRPs in mechanism?",
      "Why does GHRH-driven GH release stay feedback-regulated?",
    ],
  },
  {
    slug: "ghrelin",
    name: "Ghrelin",
    family: "growth-repair",
    summary: "Stomach-derived hunger signal that also amplifies GH pulses.",
    class: "Acylated peptide hormone (28 aa)",
    source: "Stomach (X/A-like cells)",
    receptor: "Growth hormone secretagogue receptor (GHS-R1a)",
    mechanism:
      "Ghrelin acts at GHS-R1a — a different receptor from GHRH — to amplify GH secretion, and centrally to drive appetite. Its activity depends on a unique acyl modification, making the acylating enzyme GOAT part of its biology.",
    facts: [
      "Ghrelin is the endogenous ligand for the receptor that synthetic GH secretagogues (GHRPs) target.",
      "It is one of the few clearly orexigenic (hunger-promoting) circulating hormones.",
      "Its acyl modification is required for GHS-R1a activity — an unusual structural requirement.",
    ],
    questions: [
      "How does ghrelin signaling differ from the GHRH pathway?",
      "Why does ghrelin require acylation to be active?",
    ],
  },
  {
    slug: "somatostatin",
    name: "Somatostatin",
    abbr: "SST",
    family: "growth-repair",
    summary: "The brake on the growth-hormone axis — and much else.",
    class: "Cyclic peptide (14 and 28 aa forms)",
    source: "Hypothalamus, pancreatic delta cells, GI tract",
    receptor: "Somatostatin receptors SSTR1–SSTR5",
    mechanism:
      "Somatostatin inhibits GH (and TSH) release from the pituitary and broadly suppresses endocrine and exocrine secretion across the GI tract and pancreas. It is the inhibitory counterweight that, opposing GHRH, sculpts GH pulses.",
    facts: [
      "Any account of GH timing has to include somatostatin — it sets the troughs between pulses.",
      "Its broad inhibitory reach extends well beyond GH, into gut and pancreatic secretion.",
      "Stable somatostatin analogs are long-established tools in endocrinology.",
    ],
    questions: [
      "How does somatostatin shape the pulsatile pattern of GH?",
      "Why does somatostatin suppress such a broad range of secretions?",
    ],
  },

  // ── Melanocortins ──────────────────────────────────────────────────────
  {
    slug: "alpha-msh",
    name: "Alpha-melanocyte-stimulating hormone",
    abbr: "α-MSH",
    family: "melanocortins",
    summary: "The core melanocortin ligand — pigment, appetite, inflammation.",
    class: "POMC-derived peptide (13 aa)",
    source: "Pituitary and hypothalamic POMC neurons; skin",
    receptor: "Melanocortin receptors MC1R, MC3R, MC4R, MC5R",
    mechanism:
      "Cleaved from pro-opiomelanocortin (POMC), α-MSH activates several melanocortin receptors with strikingly different physiology by tissue: pigmentation via MC1R on melanocytes, energy balance via hypothalamic MC4R, and anti-inflammatory signaling more broadly.",
    facts: [
      "The same ligand family produces different effects purely by which receptor it reaches.",
      "POMC is processed tissue-specifically into α-MSH, ACTH, and other active peptides.",
      "Receptor selectivity across MC1R–MC5R is the central design question for any melanocortin agonist.",
    ],
    questions: [
      "How does receptor selectivity determine a melanocortin agonist's effects?",
      "How is POMC processed differently across tissues?",
    ],
  },
  {
    slug: "acth",
    name: "Adrenocorticotropic hormone",
    abbr: "ACTH",
    family: "melanocortins",
    summary: "The melanocortin that drives adrenal cortisol synthesis.",
    class: "POMC-derived peptide (39 aa)",
    source: "Anterior pituitary corticotrophs",
    receptor: "Melanocortin-2 receptor (MC2R)",
    mechanism:
      "ACTH, another POMC product, acts selectively at MC2R on the adrenal cortex to stimulate cortisol synthesis — the endocrine arm of the melanocortin family and the output of the HPA stress axis below CRH.",
    facts: [
      "MC2R is unusual in responding essentially only to ACTH, not the MSH peptides.",
      "ACTH ties the melanocortin family directly into the HPA stress axis.",
      "It shares the POMC precursor with α-MSH but has a distinct receptor and role.",
    ],
    questions: [
      "Why does MC2R respond to ACTH but not to MSH peptides?",
      "How does ACTH connect the melanocortin family to the HPA axis?",
    ],
  },

  // ── Neuropeptides ──────────────────────────────────────────────────────
  {
    slug: "oxytocin",
    name: "Oxytocin",
    family: "neuropeptides",
    summary: "Parturition, lactation, and social bonding from a 9-residue peptide.",
    class: "Cyclic nonapeptide (9 aa)",
    source: "Hypothalamus (PVN/SON); released from the posterior pituitary",
    receptor: "Oxytocin receptor (OXTR), a class A GPCR",
    mechanism:
      "Synthesized in the hypothalamus and released from the posterior pituitary, oxytocin drives uterine contraction in labor and milk ejection in lactation, and acts centrally in social and affiliative behavior. It differs from vasopressin by only two amino acids.",
    facts: [
      "Oxytocin and vasopressin differ by just two residues yet act on distinct receptor families.",
      "Its central (behavioral) and peripheral (reproductive) roles reflect receptor distribution, not different ligands.",
      "It is a textbook example of how small sequence differences encode large functional ones.",
    ],
    questions: [
      "Why do oxytocin and vasopressin differ so much despite near-identical sequences?",
      "How do oxytocin's central and peripheral roles relate?",
    ],
  },
  {
    slug: "vasopressin",
    name: "Vasopressin (antidiuretic hormone)",
    abbr: "ADH",
    family: "neuropeptides",
    summary: "Water retention and vascular tone — osmotic control.",
    class: "Cyclic nonapeptide (9 aa)",
    source: "Hypothalamus; released from the posterior pituitary",
    receptor: "V1a, V1b, and V2 receptors",
    mechanism:
      "Released in response to rising plasma osmolality, vasopressin acts at renal V2 receptors to promote water reabsorption and at V1 receptors to cause vasoconstriction. It is the primary hormonal regulator of water balance.",
    facts: [
      "V2 (renal) and V1 (vascular) actions explain its dual role in water balance and blood pressure.",
      "It differs from oxytocin by two residues, illustrating sequence-level specificity.",
      "Osmoreceptor-driven release ties it tightly to plasma osmolality.",
    ],
    questions: [
      "How do V1 and V2 receptors split vasopressin's actions?",
      "How does plasma osmolality control vasopressin release?",
    ],
  },
  {
    slug: "crh",
    name: "Corticotropin-releasing hormone",
    abbr: "CRH",
    family: "neuropeptides",
    summary: "The apex of the HPA stress axis.",
    class: "Hypothalamic releasing peptide (41 aa)",
    source: "Hypothalamus (paraventricular nucleus)",
    receptor: "CRH receptors CRHR1 and CRHR2",
    mechanism:
      "CRH from the hypothalamus drives pituitary release of ACTH, which in turn stimulates adrenal cortisol — making CRH the top of the hypothalamic–pituitary–adrenal (HPA) stress axis. Cortisol feeds back to restrain CRH and ACTH.",
    facts: [
      "CRH sits one step above ACTH in the HPA cascade.",
      "Glucocorticoid negative feedback closes the loop on CRH output.",
      "It links neural stress signals to systemic endocrine responses.",
    ],
    questions: [
      "How does CRH sit atop the HPA axis?",
      "How does cortisol feedback regulate CRH?",
    ],
  },
  {
    slug: "trh",
    name: "Thyrotropin-releasing hormone",
    abbr: "TRH",
    family: "neuropeptides",
    summary: "The hypothalamic trigger for the thyroid axis.",
    class: "Tripeptide (3 aa) — the smallest peptide hormone here",
    source: "Hypothalamus",
    receptor: "TRH receptor (TRHR), a class A GPCR",
    mechanism:
      "TRH stimulates the anterior pituitary to release TSH (and prolactin), setting the tone of the thyroid axis. At just three residues it is among the smallest peptide hormones, showing that potency does not require length.",
    facts: [
      "TRH is only three amino acids — minimal size, full hormonal activity.",
      "It drives both TSH and prolactin secretion.",
      "It sits atop the hypothalamic–pituitary–thyroid axis.",
    ],
    questions: [
      "How does TRH set thyroid-axis tone?",
      "Why can such a small peptide be a potent hormone?",
    ],
  },

  // ── Gut & appetite ─────────────────────────────────────────────────────
  {
    slug: "pyy",
    name: "Peptide YY",
    abbr: "PYY",
    family: "gut-appetite",
    summary: "A post-meal satiety signal from intestinal L-cells.",
    class: "PP-fold peptide (36 aa); active PYY3-36 form",
    source: "Intestinal L-cells (with GLP-1)",
    receptor: "Y2 receptor (for the circulating PYY3-36 form)",
    mechanism:
      "Released after meals from the same L-cells that produce GLP-1, PYY (as PYY3-36) acts at Y2 receptors to reduce appetite. It is one of several converging gut signals that report fullness to the brain.",
    facts: [
      "PYY and GLP-1 are co-secreted, directly linking this family to the incretin axis.",
      "The truncated PYY3-36 form is the physiologically relevant circulating species.",
      "Satiety is multi-signal — PYY is one contributor, not the single 'fullness hormone'.",
    ],
    questions: [
      "How does PYY3-36 reduce appetite via the Y2 receptor?",
      "How do PYY and GLP-1 work together after a meal?",
    ],
  },
  {
    slug: "cck",
    name: "Cholecystokinin",
    abbr: "CCK",
    family: "gut-appetite",
    summary: "Triggers gallbladder contraction, pancreatic enzymes, and satiety.",
    class: "Gut peptide (multiple active lengths, e.g. CCK-8)",
    source: "Duodenal I-cells (and CNS neurons)",
    receptor: "CCK1 (gut) and CCK2 (CNS) receptors",
    mechanism:
      "Released in response to dietary fat and protein, CCK stimulates gallbladder contraction and pancreatic enzyme secretion and signals satiety. Its peripheral (CCK1) and central (CCK2) receptors separate its digestive and neural roles.",
    facts: [
      "CCK couples nutrient sensing to the mechanics of digestion (bile and enzymes).",
      "CCK1 vs CCK2 distribution splits its digestive and central effects.",
      "It was one of the earliest gut peptides linked to meal-ending satiety.",
    ],
    questions: [
      "How does CCK coordinate gallbladder and pancreatic responses to a meal?",
      "How do CCK1 and CCK2 receptors differ in role?",
    ],
  },
  {
    slug: "secretin",
    name: "Secretin",
    family: "gut-appetite",
    summary: "Stimulates pancreatic bicarbonate to neutralize gastric acid.",
    class: "Secretin-family peptide (27 aa)",
    source: "Duodenal S-cells",
    receptor: "Secretin receptor (a class B GPCR)",
    mechanism:
      "When acidic chyme enters the duodenum, S-cells release secretin, which stimulates the pancreas and bile ducts to secrete bicarbonate-rich fluid, neutralizing acid to protect the mucosa and create the pH range digestive enzymes need.",
    facts: [
      "Secretin was the first hormone ever discovered, giving the field its name.",
      "Its trigger is duodenal acidity — a direct chemical feedback loop.",
      "It is the prototype of the secretin/glucagon peptide superfamily.",
    ],
    questions: [
      "How does duodenal acidity trigger secretin release?",
      "Why is secretin considered the founding example of a hormone?",
    ],
  },
  {
    slug: "motilin",
    name: "Motilin",
    family: "gut-appetite",
    summary: "Paces the migrating motor complex between meals.",
    class: "Gut peptide (22 aa)",
    source: "Endocrine cells of the small intestine",
    receptor: "Motilin receptor (a class A GPCR)",
    mechanism:
      "Motilin is released cyclically in the fasting state and drives the migrating motor complex — the rhythmic 'housekeeping' contractions that sweep residual contents through the gut between meals. Its role is timing, distinct from the post-meal satiety peptides.",
    facts: [
      "Motilin governs the fasting (interdigestive) motility pattern, not the fed state.",
      "Certain macrolide antibiotics act as motilin-receptor agonists — an off-target pharmacology.",
      "Its between-meal role distinguishes it from the post-meal gut peptides.",
    ],
    questions: [
      "What is the migrating motor complex and how does motilin pace it?",
      "Why do some antibiotics act on the motilin receptor?",
    ],
  },

  // ── Reproductive & gonadal ─────────────────────────────────────────────
  {
    slug: "gnrh",
    name: "Gonadotropin-releasing hormone",
    abbr: "GnRH",
    family: "reproductive-gonadal",
    summary: "The pulsatile hypothalamic driver of the reproductive axis.",
    class: "Decapeptide (10 aa)",
    source: "Hypothalamus (GnRH neurons)",
    receptor: "GnRH receptor (GnRHR), a class A GPCR",
    mechanism:
      "GnRH is released in pulses that drive the anterior pituitary to secrete LH and FSH. Pulse frequency encodes the signal: pulsatile delivery stimulates the axis, while continuous exposure desensitizes the receptor and paradoxically suppresses it.",
    facts: [
      "Pulse frequency, not just amount, is the information GnRH carries.",
      "Continuous GnRH-agonist exposure suppresses the axis via receptor desensitization — the basis of agonist 'down-regulation'.",
      "It sits at the top of the hypothalamic–pituitary–gonadal (HPG) axis.",
    ],
    questions: [
      "Why does pulsatile vs continuous GnRH exposure have opposite effects?",
      "How does GnRH frequency encode different downstream signals?",
    ],
  },
  {
    slug: "lh",
    name: "Luteinizing hormone",
    abbr: "LH",
    family: "reproductive-gonadal",
    summary: "Triggers ovulation and gonadal steroidogenesis.",
    class: "Glycoprotein hormone (α/β heterodimer)",
    source: "Anterior pituitary gonadotrophs",
    receptor: "LH/choriogonadotropin receptor (LHCGR)",
    mechanism:
      "Driven by GnRH pulses, LH triggers ovulation in females and stimulates gonadal steroid (testosterone, estrogen) production in both sexes. It shares an alpha subunit with FSH, TSH, and hCG; its beta subunit confers specificity.",
    facts: [
      "LH and hCG act on the same receptor (LHCGR), so hCG can substitute for an LH signal.",
      "The glycoprotein hormones share an alpha subunit; the beta subunit sets identity.",
      "The mid-cycle LH surge is the immediate trigger for ovulation.",
    ],
    questions: [
      "How do LH and FSH divide the work at the gonad?",
      "Why can hCG substitute for an LH signal?",
    ],
  },
  {
    slug: "fsh",
    name: "Follicle-stimulating hormone",
    abbr: "FSH",
    family: "reproductive-gonadal",
    summary: "Drives follicular development and spermatogenesis.",
    class: "Glycoprotein hormone (α/β heterodimer)",
    source: "Anterior pituitary gonadotrophs",
    receptor: "FSH receptor (FSHR)",
    mechanism:
      "FSH promotes ovarian follicle maturation in females and supports spermatogenesis via Sertoli cells in males. With LH it forms the two-gonadotropin output of the pituitary under pulsatile GnRH control.",
    facts: [
      "FSH and LH are co-secreted but act on different gonadal targets.",
      "GnRH pulse frequency biases the relative output of FSH vs LH.",
      "It shares the common glycoprotein alpha subunit with LH, hCG, and TSH.",
    ],
    questions: [
      "How does GnRH pulse frequency bias FSH vs LH secretion?",
      "What is FSH's distinct role at the gonad compared with LH?",
    ],
  },
  {
    slug: "kisspeptin",
    name: "Kisspeptin",
    family: "reproductive-gonadal",
    summary: "The upstream gatekeeper that gates GnRH pulse generation.",
    class: "RF-amide peptide (KISS1 products, e.g. kisspeptin-54/10)",
    source: "Hypothalamus (KNDy and AVPV neurons)",
    receptor: "KISS1R (formerly GPR54)",
    mechanism:
      "Kisspeptin neurons act upstream of GnRH, providing the excitatory drive that gates GnRH pulse generation. Their discovery reframed how the reproductive axis is switched on at puberty and tuned across the cycle.",
    facts: [
      "Loss-of-function in KISS1R causes failure to enter puberty — the finding that revealed the pathway.",
      "Kisspeptin is now seen as a key gatekeeper sitting above GnRH.",
      "It integrates metabolic and steroid-feedback signals into the reproductive axis.",
    ],
    questions: [
      "How did kisspeptin reshape the model of how puberty is switched on?",
      "How does kisspeptin gate GnRH pulse generation?",
    ],
  },
  {
    slug: "hcg",
    name: "Human chorionic gonadotropin",
    abbr: "hCG",
    family: "reproductive-gonadal",
    summary: "LH-like hormone that sustains the corpus luteum in early pregnancy.",
    class: "Glycoprotein hormone (α/β heterodimer)",
    source: "Placental syncytiotrophoblast",
    receptor: "LH/choriogonadotropin receptor (LHCGR)",
    mechanism:
      "Produced by the placenta in early pregnancy, hCG acts on the same LHCGR receptor as LH to maintain the corpus luteum and its progesterone output until the placenta takes over. Its presence is the basis of pregnancy testing.",
    facts: [
      "hCG and LH share the LHCGR receptor — functionally hCG provides an LH-like signal.",
      "Its longer half-life than LH suits the sustained support the corpus luteum needs.",
      "Detection of the hCG beta subunit underlies pregnancy tests.",
    ],
    questions: [
      "How does hCG sustain the corpus luteum in early pregnancy?",
      "Why does hCG act like LH at the receptor level?",
    ],
  },
];

// Physical properties, merged onto the base records. Values are reference-grade
// approximations for the NATIVE/endogenous hormone — average MW in daltons and a
// representative circulating half-life. Engineered analogs differ substantially.
// Glycoprotein MWs vary with glycosylation (mwApprox).
const PROPS: Record<string, Pick<Hormone, "mw" | "mwApprox" | "halfLife" | "halfLifeMin">> = {
  "glp-1": { mw: 3297.7, halfLife: "~1–2 min (native; DPP-4 cleaved)", halfLifeMin: 1.5 },
  gip: { mw: 4983.6, halfLife: "~5–7 min (native; DPP-4)", halfLifeMin: 6 },
  glucagon: { mw: 3482.8, halfLife: "~3–6 min", halfLifeMin: 5 },
  amylin: { mw: 3903.3, halfLife: "~13 min (native)", halfLifeMin: 13 },
  insulin: { mw: 5807.6, halfLife: "~4–6 min", halfLifeMin: 5 },
  "growth-hormone": { mw: 22124, mwApprox: true, halfLife: "~10–20 min", halfLifeMin: 15 },
  "igf-1": { mw: 7649, halfLife: "~12–16 h bound to IGFBPs (~10 min free)", halfLifeMin: 720 },
  ghrh: { mw: 5039.6, halfLife: "~7–50 min", halfLifeMin: 10 },
  ghrelin: { mw: 3370.9, halfLife: "~30 min (acyl-ghrelin)", halfLifeMin: 30 },
  somatostatin: { mw: 1637.9, halfLife: "~1–3 min (very short)", halfLifeMin: 2 },
  "alpha-msh": { mw: 1664.9, halfLife: "~minutes (very short)", halfLifeMin: 5 },
  acth: { mw: 4541.1, halfLife: "~10–20 min", halfLifeMin: 15 },
  oxytocin: { mw: 1007.2, halfLife: "~1–6 min", halfLifeMin: 3 },
  vasopressin: { mw: 1084.2, halfLife: "~15–30 min", halfLifeMin: 20 },
  crh: { mw: 4757.5, halfLife: "~minutes (biphasic clearance)", halfLifeMin: 30 },
  trh: { mw: 362.4, halfLife: "~2–5 min", halfLifeMin: 4 },
  pyy: { mw: 4309.7, mwApprox: true, halfLife: "~minutes", halfLifeMin: 8 },
  cck: { mw: 1143.3, mwApprox: true, halfLife: "~1–2.5 min", halfLifeMin: 2 },
  secretin: { mw: 3039.5, halfLife: "~4 min", halfLifeMin: 4 },
  motilin: { mw: 2698.1, halfLife: "~4–5 min", halfLifeMin: 5 },
  gnrh: { mw: 1182.3, halfLife: "~2–4 min", halfLifeMin: 3 },
  lh: { mw: 30000, mwApprox: true, halfLife: "~20 min", halfLifeMin: 20 },
  fsh: { mw: 35500, mwApprox: true, halfLife: "~3–4 h", halfLifeMin: 210 },
  kisspeptin: { mw: 1302.5, mwApprox: true, halfLife: "~4–30 min (by fragment)", halfLifeMin: 20 },
  hcg: { mw: 36700, mwApprox: true, halfLife: "~24–36 h", halfLifeMin: 1800 },
};

export const HORMONES: Hormone[] = BASE.map((h) => ({ ...h, ...(PROPS[h.slug] ?? {}) }));

// Convert a half-life in minutes to a value + unit for the calculator deep-link.
export function halfLifeForLink(min: number): { value: number; unit: "min" | "h" | "d" } {
  if (min < 90) return { value: Math.round(min * 100) / 100, unit: "min" };
  const h = min / 60;
  if (h < 48) return { value: Math.round(h * 10) / 10, unit: "h" };
  return { value: Math.round((h / 24) * 10) / 10, unit: "d" };
}

export function getHormone(slug: string): Hormone | undefined {
  return HORMONES.find((h) => h.slug === slug);
}

export function hormonesByFamily(familySlug: string): Hormone[] {
  return HORMONES.filter((h) => h.family === familySlug);
}
