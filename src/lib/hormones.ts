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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    mw: 4731.4,
    halfLife: "~6 days",
    halfLifeMin: 8640,
  },

  // ── Growth & repair ────────────────────────────────────────────────────
  {
    slug: "growth-hormone",
    name: "Growth hormone",
    abbr: "GH",
    family: "growth-repair",
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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
    type: "endogenous",
    evidence: "Established",
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

  // ── Adipokines & energy balance ─────────────────────────────────────────
  {
    slug: "leptin",
    name: "Leptin",
    family: "adipokines",
    type: "endogenous",
    evidence: "Established",
    summary: "The adipocyte hormone that reports fat-store size and restrains appetite.",
    class: "Adipokine (167 aa, four-helix-bundle cytokine fold)",
    source: "Adipocytes (white adipose tissue)",
    receptor: "Leptin receptor (LepR / ObR; JAK2-STAT3 signaling)",
    mechanism:
      "Leptin is secreted from fat in proportion to fat mass and acts on hypothalamic neurons to suppress appetite and permit energy expenditure — a signal of energy sufficiency. In common obesity the signal is high but the response is blunted (leptin resistance), so more leptin does not restore appetite control.",
    facts: [
      "Leptin is a satiety signal of plenty, not of hunger — low leptin (starvation) drives the strongest behavioral response.",
      "Leptin resistance, not deficiency, characterizes common obesity; rare congenital deficiency responds dramatically to replacement.",
      "It links adipose tissue to the same hypothalamic circuits that the melanocortin and incretin systems act on.",
    ],
    questions: [
      "What is leptin resistance, and why doesn't more leptin fix common obesity?",
      "How does leptin signal energy sufficiency to the hypothalamus?",
    ],
    mw: 16026,
    mwApprox: true,
    halfLife: "~25–30 min",
    halfLifeMin: 27,
  },
  {
    slug: "adiponectin",
    name: "Adiponectin",
    family: "adipokines",
    type: "endogenous",
    evidence: "Established",
    summary: "An adipokine that improves insulin sensitivity — and falls as fat rises.",
    class: "Adipokine (circulates as trimers, hexamers, and HMW multimers)",
    source: "Adipocytes",
    receptor: "Adiponectin receptors AdipoR1 and AdipoR2",
    mechanism:
      "Adiponectin enhances insulin sensitivity and fatty-acid oxidation, acting in part through AMPK. Unusually among adipokines, its circulating level is inversely related to fat mass — it falls in obesity and rises with metabolic improvement.",
    facts: [
      "Its inverse relationship to fat mass is the opposite of leptin's.",
      "It circulates as several multimer sizes; the high-molecular-weight form is considered the most metabolically active.",
      "Higher adiponectin generally tracks with better insulin sensitivity.",
    ],
    questions: [
      "Why does adiponectin fall as fat mass rises?",
      "How does adiponectin improve insulin sensitivity?",
    ],
    mw: 30000,
    mwApprox: true,
    halfLife: "~hours (estimates vary widely)",
  },

  // ── Calcium & bone ──────────────────────────────────────────────────────
  {
    slug: "pth",
    name: "Parathyroid hormone",
    abbr: "PTH",
    family: "calcium-bone",
    type: "endogenous",
    evidence: "Established",
    summary: "The fast-acting hormone that raises blood calcium.",
    class: "Peptide hormone (84 aa)",
    source: "Parathyroid glands",
    receptor: "PTH1 receptor (PTH1R), a class B GPCR",
    mechanism:
      "Released within minutes of a fall in blood calcium, PTH acts on bone and kidney to raise it — mobilizing calcium from bone, increasing renal reabsorption, and stimulating activation of vitamin D. Its effect on bone is paradoxically dual: continuous exposure is catabolic, but intermittent exposure is anabolic.",
    facts: [
      "PTH is the body's fastest defense against low blood calcium.",
      "Intermittent PTH builds bone; continuous PTH breaks it down — a striking pulsatility effect.",
      "It raises calcium partly by activating vitamin D in the kidney.",
    ],
    questions: [
      "Why does intermittent vs continuous PTH have opposite effects on bone?",
      "How does PTH coordinate bone, kidney, and vitamin D to raise calcium?",
    ],
    mw: 9425,
    halfLife: "~2–4 min",
    halfLifeMin: 3,
  },
  {
    slug: "calcitonin",
    name: "Calcitonin",
    family: "calcium-bone",
    type: "endogenous",
    evidence: "Established",
    summary: "The calcium-lowering counterpart to PTH.",
    class: "Peptide hormone (32 aa)",
    source: "Thyroid parafollicular (C) cells",
    receptor: "Calcitonin receptor, a class B GPCR",
    mechanism:
      "Calcitonin lowers blood calcium chiefly by inhibiting osteoclast-mediated bone resorption, opposing PTH. Its physiological role in adult humans is comparatively modest, but the pathway is pharmacologically useful.",
    facts: [
      "Calcitonin opposes PTH — lowering rather than raising calcium.",
      "It works mainly by restraining osteoclasts (the bone-resorbing cells).",
      "Its everyday role in human calcium balance is smaller than PTH's.",
    ],
    questions: [
      "How does calcitonin lower blood calcium?",
      "Why is calcitonin's physiological role smaller than PTH's in humans?",
    ],
    mw: 3417.9,
    halfLife: "~10 min",
    halfLifeMin: 10,
  },
  {
    slug: "pthrp",
    name: "Parathyroid-hormone-related protein",
    abbr: "PTHrP",
    family: "calcium-bone",
    type: "endogenous",
    evidence: "Established",
    summary: "A PTH-receptor ligand central to development — and to cancer hypercalcemia.",
    class: "Peptide hormone (multiple isoforms, ~139–173 aa)",
    source: "Many tissues (paracrine); some tumors",
    receptor: "PTH1 receptor (PTH1R) — shared with PTH",
    mechanism:
      "PTHrP shares PTH's N-terminus and acts on the same PTH1 receptor, but functions largely as a local (paracrine) signal in development — notably in cartilage and bone growth. When tumors secrete it systemically, it drives the most common form of malignancy-associated hypercalcemia.",
    facts: [
      "PTHrP and PTH act on the same receptor but in different contexts — development vs minute-to-minute calcium control.",
      "Tumor secretion of PTHrP is the leading cause of hypercalcemia of malignancy.",
      "It is essential to normal endochondral bone growth.",
    ],
    questions: [
      "How can PTHrP and PTH share a receptor yet do different jobs?",
      "Why does PTHrP cause hypercalcemia in some cancers?",
    ],
    mw: 16000,
    mwApprox: true,
    halfLife: "~minutes (rapidly cleared)",
    halfLifeMin: 5,
  },

  // ── Cardiovascular & natriuretic ────────────────────────────────────────
  {
    slug: "anp",
    name: "Atrial natriuretic peptide",
    abbr: "ANP",
    family: "cardiovascular",
    type: "endogenous",
    evidence: "Established",
    summary: "Released when the atria stretch; promotes salt and water excretion.",
    class: "Natriuretic peptide (28 aa, ring-structured)",
    source: "Atrial cardiomyocytes",
    receptor: "Natriuretic peptide receptor A (NPR-A, a guanylyl cyclase)",
    mechanism:
      "Atrial stretch from volume overload releases ANP, which binds NPR-A to raise cGMP, promoting sodium and water excretion and vasodilation — reducing the blood volume and pressure that triggered it. It is a direct negative-feedback brake on cardiac load.",
    facts: [
      "ANP signals through a membrane guanylyl-cyclase receptor (cGMP), not a GPCR — a different second-messenger system from most of this catalog.",
      "Its trigger is mechanical: atrial wall stretch.",
      "It opposes the renin-angiotensin system's salt-and-water retention.",
    ],
    questions: [
      "How does ANP reduce the cardiac load that releases it?",
      "Why do natriuretic peptides use cGMP rather than cAMP?",
    ],
    mw: 3080.5,
    halfLife: "~2–3 min",
    halfLifeMin: 2.5,
  },
  {
    slug: "bnp",
    name: "B-type natriuretic peptide",
    abbr: "BNP",
    family: "cardiovascular",
    type: "endogenous",
    evidence: "Established",
    summary: "A ventricular natriuretic peptide — and a routine heart-failure marker.",
    class: "Natriuretic peptide (32 aa)",
    source: "Ventricular cardiomyocytes",
    receptor: "Natriuretic peptide receptor A (NPR-A)",
    mechanism:
      "BNP is released from the ventricles under pressure or volume load and, like ANP, raises cGMP via NPR-A to promote natriuresis and vasodilation. Because its level rises with ventricular wall stress, BNP (and its NT-proBNP fragment) is widely measured to assess heart failure.",
    facts: [
      "BNP and NT-proBNP are standard blood biomarkers of heart failure.",
      "It is ventricular in origin, in contrast to ANP's atrial source.",
      "It shares the NPR-A receptor and cGMP mechanism with ANP.",
    ],
    questions: [
      "Why does BNP rise in heart failure?",
      "How do ANP and BNP differ in source and use?",
    ],
    mw: 3464,
    halfLife: "~20 min",
    halfLifeMin: 20,
  },
  {
    slug: "cnp",
    name: "C-type natriuretic peptide",
    abbr: "CNP",
    family: "cardiovascular",
    type: "endogenous",
    evidence: "Established",
    summary: "The vascular and bone-growth member of the natriuretic family.",
    class: "Natriuretic peptide (22 aa, CNP-22)",
    source: "Vascular endothelium, CNS, and growth plate",
    receptor: "Natriuretic peptide receptor B (NPR-B)",
    mechanism:
      "Unlike ANP and BNP, CNP acts mainly locally through NPR-B, influencing vascular tone and — importantly — endochondral bone growth at the growth plate, where its pathway is a target in some skeletal disorders.",
    facts: [
      "CNP signals through NPR-B, a different receptor from ANP/BNP's NPR-A.",
      "It is a key regulator of long-bone growth at the growth plate.",
      "Its role is more paracrine (local) than systemic.",
    ],
    questions: [
      "How does CNP differ from ANP and BNP in receptor and role?",
      "Why is CNP important for bone growth?",
    ],
    mw: 2197,
    halfLife: "~2–3 min",
    halfLifeMin: 2.5,
  },

  // ── Muscle & TGF-β signaling ────────────────────────────────────────────
  {
    slug: "myostatin",
    name: "Myostatin",
    abbr: "GDF-8",
    family: "muscle-tgfb",
    type: "endogenous",
    evidence: "Established",
    summary: "The TGF-β-family brake that limits skeletal muscle mass.",
    class: "TGF-β superfamily growth/differentiation factor (secreted dimer)",
    source: "Skeletal muscle",
    receptor: "Activin type II receptors (ActRIIB) → Smad2/3",
    mechanism:
      "Myostatin signals through activin type II receptors and the Smad2/3 pathway to restrain muscle growth — a negative regulator. Animals and rare humans lacking functional myostatin develop pronounced muscle hypertrophy, which is why blocking it is pursued therapeutically.",
    facts: [
      "Loss of myostatin causes dramatic muscle overgrowth across species — the clearest evidence of its braking role.",
      "It signals through activin type II receptors and Smad2/3, not a GPCR.",
      "Blocking myostatin is a leading strategy for muscle preservation, including during incretin-driven weight loss.",
    ],
    questions: [
      "How does myostatin restrain muscle growth at the molecular level?",
      "What happens when myostatin signaling is lost?",
    ],
    mw: 25000,
    mwApprox: true,
    halfLife: "long-lived in the latent serum complex; free form not well defined",
  },
  {
    slug: "activin-a",
    name: "Activin A",
    family: "muscle-tgfb",
    type: "endogenous",
    evidence: "Established",
    summary: "A TGF-β-family signal sharing myostatin's receptors, with broader roles.",
    class: "TGF-β superfamily dimer (βA–βA)",
    source: "Many tissues (gonads, muscle, immune cells)",
    receptor: "Activin type II receptors (ActRIIA/B) → Smad2/3",
    mechanism:
      "Activin A signals through the same activin type II receptors as myostatin, contributing to muscle wasting, fibrosis, inflammation, and reproductive signaling depending on context. Its overlap with myostatin is why receptor-level blockade affects both.",
    facts: [
      "Activin A and myostatin converge on the same activin type II receptors.",
      "It has wide-ranging roles beyond muscle, including in reproduction and fibrosis.",
      "Receptor-level (ActRII) blockade affects activin and myostatin together.",
    ],
    questions: [
      "How does activin A overlap with myostatin signaling?",
      "Why does blocking activin type II receptors affect multiple ligands?",
    ],
    mw: 26000,
    mwApprox: true,
    halfLife: "minutes when free; longer when protein-bound",
  },
  {
    slug: "follistatin",
    name: "Follistatin",
    family: "muscle-tgfb",
    type: "endogenous",
    evidence: "Established",
    summary: "The endogenous antagonist that neutralizes myostatin and activin.",
    class: "Secreted glycoprotein (multiple isoforms)",
    source: "Many tissues",
    receptor: "Ligand trap — binds activin/myostatin, no signaling receptor of its own",
    mechanism:
      "Follistatin does not signal through a receptor; it binds activin and myostatin directly and neutralizes them. By removing the brake, raising follistatin increases muscle mass — making it a focus of gene-therapy and muscle-disease research.",
    facts: [
      "Follistatin is a ligand trap, not a receptor agonist — it works by sequestering activin and myostatin.",
      "Increasing follistatin raises muscle mass by relieving the myostatin/activin brake.",
      "It is studied in muscular dystrophy and muscle-wasting research.",
    ],
    questions: [
      "How does follistatin increase muscle without a receptor of its own?",
      "Why is follistatin studied for muscle-wasting conditions?",
    ],
    mw: 35000,
    mwApprox: true,
    halfLife: "minutes to hours, isoform-dependent (FS-288 vs FS-315)",
  },

  // ── Repair & regenerative ───────────────────────────────────────────────
  {
    slug: "thymosin-beta-4",
    name: "Thymosin β4",
    abbr: "Tβ4",
    family: "repair",
    type: "endogenous",
    evidence: "Established",
    summary: "An endogenous actin-sequestering peptide involved in wound healing.",
    class: "Actin-binding peptide (43 aa)",
    source: "Widespread; abundant intracellularly",
    receptor: "No classical receptor; sequesters monomeric (G-)actin",
    mechanism:
      "Thymosin β4 is the major intracellular store of monomeric actin, buffering the actin available for cytoskeletal remodeling. Through effects on cell migration, angiogenesis, and inflammation it supports tissue repair, which underlies its study in wound healing and the existence of fragment-based research compounds.",
    facts: [
      "Tβ4 works by binding monomeric actin, not by activating a surface receptor.",
      "Its repair effects come from modulating cell migration, angiogenesis, and inflammation.",
      "It is the endogenous molecule that the research compound TB-500 is derived from — they are not identical.",
    ],
    questions: [
      "How does actin sequestration translate into wound-healing effects?",
      "How does thymosin β4 differ from the marketed TB-500?",
    ],
    mw: 4963.4,
    halfLife: "not well characterized in humans",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    family: "repair",
    type: "endogenous",
    evidence: "Limited",
    summary: "An endogenous copper-binding tripeptide studied mainly in skin biology.",
    class: "Copper-binding tripeptide (Gly-His-Lys, with Cu²⁺)",
    source: "Endogenous; declines with age in plasma",
    receptor: "No classical receptor; acts via copper delivery and gene-expression effects",
    mechanism:
      "GHK is a naturally occurring tripeptide that avidly binds copper. The GHK-Cu complex influences skin remodeling, collagen synthesis, and antioxidant gene expression, giving it a real role in dermatology — though many broader, systemic claims rest on limited human evidence.",
    facts: [
      "GHK is endogenous and its plasma level declines with age.",
      "It acts substantially through copper delivery and gene-expression effects, not a single receptor.",
      "Topical/dermatological evidence is the strongest; broader systemic claims are not well established.",
    ],
    questions: [
      "What is actually established about GHK-Cu in skin versus broader claims?",
      "How does copper binding relate to GHK's effects?",
    ],
    mw: 340.4,
    mwApprox: true,
    halfLife: "~minutes (small peptide; rapidly metabolized)",
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    family: "repair",
    type: "research",
    evidence: "Preclinical",
    summary: "A synthetic peptide with broad preclinical repair claims and little human data.",
    class: "Synthetic pentadecapeptide (15 aa)",
    source: "Synthetic; sequence derived from a gastric protein",
    receptor: "No established receptor; proposed effects on angiogenesis and growth-factor pathways",
    mechanism:
      "BPC-157 is a stable synthetic peptide whose sequence comes from a fragment of a gastric protein. Animal studies report effects on angiogenesis, tendon and gut healing, and nitric-oxide pathways, but its mechanism is not well defined and rigorous human clinical evidence is largely absent.",
    facts: [
      "The evidence base is predominantly preclinical (rodent); robust human trials are lacking.",
      "Its molecular mechanism is proposed rather than firmly established.",
      "It is widely marketed in the 'research peptide' space — a context where claims often outrun data.",
    ],
    questions: [
      "What does the actual evidence show for BPC-157, and what is only claimed?",
      "Why is BPC-157's mechanism considered poorly defined?",
    ],
    mw: 1419.5,
    halfLife: "~minutes in plasma (human data lacking)",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    family: "repair",
    type: "research",
    evidence: "Preclinical",
    parent: "thymosin-beta-4",
    summary: "A synthetic thymosin β4 fragment marketed for recovery; preclinical evidence.",
    class: "Synthetic thymosin β4 fragment / analog",
    source: "Synthetic; based on thymosin β4",
    receptor: "Same actin-related biology as thymosin β4 (not receptor-mediated)",
    mechanism:
      "TB-500 is a synthetic product based on thymosin β4 — often a specific active fragment — promoted for recovery and healing. Its rationale borrows from thymosin β4's actin and angiogenesis biology, but human clinical evidence specific to TB-500 is limited and preclinical.",
    facts: [
      "TB-500 is derived from thymosin β4 but is not identical to the full endogenous peptide.",
      "Its claims lean on thymosin β4 biology; direct human evidence for TB-500 is limited.",
      "It is a 'research peptide' product — read the evidence honestly.",
    ],
    questions: [
      "How does TB-500 relate to endogenous thymosin β4?",
      "What is genuinely known about TB-500 in humans?",
    ],
    mw: 4963.4,
    mwApprox: true,
    halfLife: "not characterized in humans",
  },

  // ── GnRH analogs ────────────────────────────────────────────────────────
  {
    slug: "leuprolide",
    name: "Leuprolide",
    family: "reproductive-gonadal",
    type: "analog",
    evidence: "Established",
    parent: "gnrh",
    summary: "A GnRH agonist that suppresses the axis through continuous stimulation.",
    class: "GnRH receptor agonist (nonapeptide analog)",
    source: "Synthetic analog of GnRH",
    receptor: "GnRH receptor (GnRHR)",
    mechanism:
      "Leuprolide is a long-acting GnRH agonist. Because GnRH normally signals in pulses, continuous agonist exposure first causes a transient surge ('flare') and then desensitizes the receptor — paradoxically shutting the axis down. Depot formulations exploit this to maintain chronic suppression.",
    facts: [
      "It suppresses the reproductive axis by overriding GnRH's required pulsatility — continuous stimulation desensitizes the receptor.",
      "An initial hormonal 'flare' precedes suppression — a direct consequence of the agonist mechanism.",
      "Depot formulations release the drug over months to sustain the effect.",
    ],
    questions: [
      "Why does a GnRH agonist suppress, rather than stimulate, the axis?",
      "What causes the initial flare with leuprolide?",
    ],
    mw: 1209.4,
    halfLife: "~3 h (depot formulations act for months)",
    halfLifeMin: 180,
  },
  {
    slug: "goserelin",
    name: "Goserelin",
    family: "reproductive-gonadal",
    type: "analog",
    evidence: "Established",
    parent: "gnrh",
    summary: "A depot GnRH agonist; same flare-then-suppression mechanism as leuprolide.",
    class: "GnRH receptor agonist (decapeptide analog)",
    source: "Synthetic analog of GnRH",
    receptor: "GnRH receptor (GnRHR)",
    mechanism:
      "Goserelin is a GnRH agonist delivered as a slow-release implant. Like other agonists, continuous exposure desensitizes the GnRH receptor after an initial flare, producing sustained suppression of the gonadotropins and downstream sex steroids.",
    facts: [
      "Delivered as a subcutaneous depot implant for steady, long-term exposure.",
      "Shares the agonist flare-then-desensitization mechanism with leuprolide.",
      "Illustrates the pulsatility principle: continuous GnRH signaling suppresses the axis.",
    ],
    questions: [
      "How does continuous goserelin exposure differ from natural pulsatile GnRH?",
    ],
    mw: 1269.4,
    halfLife: "~4–5 h (implant depot)",
    halfLifeMin: 270,
  },
  {
    slug: "cetrorelix",
    name: "Cetrorelix",
    family: "reproductive-gonadal",
    type: "analog",
    evidence: "Established",
    parent: "gnrh",
    summary: "A GnRH antagonist — immediate suppression with no flare.",
    class: "GnRH receptor antagonist (decapeptide)",
    source: "Synthetic GnRH antagonist",
    receptor: "GnRH receptor (GnRHR) — competitive antagonist",
    mechanism:
      "Cetrorelix blocks the GnRH receptor directly, so it suppresses gonadotropin release immediately and without the initial flare that agonists cause. This clean, rapid suppression is the key mechanistic contrast with agonists like leuprolide.",
    facts: [
      "As an antagonist, it produces immediate suppression — no agonist flare.",
      "It is the mechanistic mirror image of GnRH agonists at the same receptor.",
      "The flare-vs-no-flare difference is a clear teaching case in receptor pharmacology.",
    ],
    questions: [
      "Why does a GnRH antagonist avoid the flare that agonists cause?",
      "How do cetrorelix and leuprolide differ at the same receptor?",
    ],
    mw: 1431.0,
    halfLife: "~5 h (immediate-release)",
    halfLifeMin: 300,
  },

  // ── Somatostatin analogs ────────────────────────────────────────────────
  {
    slug: "octreotide",
    name: "Octreotide",
    family: "growth-repair",
    type: "analog",
    evidence: "Established",
    parent: "somatostatin",
    summary: "A long-acting somatostatin analog used to suppress GH and other hormones.",
    class: "Somatostatin analog (cyclic octapeptide)",
    source: "Synthetic analog of somatostatin",
    receptor: "Somatostatin receptors (SSTR2 and SSTR5 preferential)",
    mechanism:
      "Octreotide reproduces somatostatin's inhibitory action but with a far longer half-life than the native peptide's ~2 minutes. By preferentially engaging SSTR2/SSTR5 it suppresses growth hormone and several gut hormones, which is why it is used in acromegaly and neuroendocrine tumors.",
    facts: [
      "Native somatostatin is too short-lived to be a practical drug; octreotide solves the half-life problem.",
      "It is receptor-subtype-selective (SSTR2/5), unlike native somatostatin's broad SSTR coverage.",
      "Long-acting (LAR) depot formulations act over roughly a month.",
    ],
    questions: [
      "How does octreotide overcome somatostatin's very short half-life?",
      "Why does receptor-subtype selectivity matter for somatostatin analogs?",
    ],
    mw: 1019.2,
    halfLife: "~1.5 h (subcutaneous; LAR depot ~monthly)",
    halfLifeMin: 90,
  },
  {
    slug: "lanreotide",
    name: "Lanreotide",
    family: "growth-repair",
    type: "analog",
    evidence: "Established",
    parent: "somatostatin",
    summary: "A depot somatostatin analog, similar in action to octreotide.",
    class: "Somatostatin analog (cyclic octapeptide)",
    source: "Synthetic analog of somatostatin",
    receptor: "Somatostatin receptors (SSTR2 and SSTR5 preferential)",
    mechanism:
      "Lanreotide is a somatostatin analog formulated as a long-acting depot (autogel) that releases over weeks, suppressing growth hormone and neuroendocrine secretion much like octreotide. Its prolonged depot kinetics are the practical contrast with the native peptide's minutes-long half-life.",
    facts: [
      "Delivered as an extended-release depot acting over weeks.",
      "Shares octreotide's SSTR2/5-preferential profile.",
      "Used in acromegaly and neuroendocrine tumors.",
    ],
    questions: [
      "How does lanreotide's depot delivery change somatostatin pharmacology?",
    ],
    mw: 1096.3,
    halfLife: "depot-dominant (autogel acts over weeks)",
  },
  {
    slug: "pasireotide",
    name: "Pasireotide",
    family: "growth-repair",
    type: "analog",
    evidence: "Established",
    parent: "somatostatin",
    summary: "A broader-spectrum somatostatin analog hitting more receptor subtypes.",
    class: "Somatostatin analog (cyclic hexapeptide)",
    source: "Synthetic analog of somatostatin",
    receptor: "Somatostatin receptors (SSTR1, 2, 3, and 5)",
    mechanism:
      "Pasireotide binds a wider range of somatostatin receptor subtypes than octreotide — including SSTR1, 2, 3, and 5 — giving it a different activity profile, notably more SSTR5 engagement that underlies its use in conditions octreotide addresses less well.",
    facts: [
      "Its broader SSTR-subtype coverage is the key distinction from octreotide and lanreotide.",
      "Greater SSTR5 affinity drives a different clinical profile.",
      "Illustrates how analog receptor-selectivity engineering changes effects.",
    ],
    questions: [
      "How does pasireotide's broader receptor profile differ from octreotide's?",
    ],
    mw: 1047.2,
    halfLife: "~12 h",
    halfLifeMin: 720,
  },

  // ── Mitochondrial-derived peptides ──────────────────────────────────────
  {
    slug: "mots-c",
    name: "MOTS-c",
    family: "mitochondrial",
    type: "endogenous",
    evidence: "Preclinical",
    summary: "A mitochondrial-encoded peptide linked to metabolism and exercise biology.",
    class: "Mitochondrial-derived peptide (16 aa, encoded in 12S rRNA)",
    source: "Encoded in mitochondrial DNA",
    receptor: "No classical receptor; acts via AMPK and metabolic signaling",
    mechanism:
      "MOTS-c is a short peptide encoded within mitochondrial DNA that signals to the rest of the cell, acting partly through AMPK to influence glucose metabolism and insulin sensitivity. In animal studies it behaves as an exercise-mimetic, though human evidence remains early.",
    facts: [
      "It is encoded in mitochondrial — not nuclear — DNA, an unusual origin for a signaling peptide.",
      "It acts substantially through AMPK and metabolic-stress pathways rather than a single surface receptor.",
      "Evidence is largely preclinical; human metabolic roles are still being mapped.",
    ],
    questions: [
      "What makes mitochondrial-derived peptides like MOTS-c unusual?",
      "How does MOTS-c relate to metabolism and exercise?",
    ],
    mw: 2174.6,
    halfLife: "not well characterized in humans",
  },
  {
    slug: "humanin",
    name: "Humanin",
    family: "mitochondrial",
    type: "endogenous",
    evidence: "Preclinical",
    summary: "A cytoprotective mitochondrial-derived peptide studied in stress and ageing.",
    class: "Mitochondrial-derived peptide (24 aa, encoded in 16S rRNA)",
    source: "Encoded in mitochondrial DNA",
    receptor: "Proposed receptors incl. a trimeric receptor and intracellular targets",
    mechanism:
      "Humanin is a mitochondrial-encoded peptide with broad cytoprotective and anti-apoptotic effects, studied in neuroprotection, metabolic stress, and ageing. Several signaling routes have been proposed, but its full mechanism and human physiology are still being characterized.",
    facts: [
      "Like MOTS-c, it is encoded in mitochondrial DNA — part of the emerging mitochondrial-derived-peptide class.",
      "Its hallmark is cytoprotection — limiting cell death under stress.",
      "The evidence base is mostly preclinical; human roles remain under study.",
    ],
    questions: [
      "What is humanin's cytoprotective role?",
      "How do humanin and MOTS-c compare as mitochondrial-derived peptides?",
    ],
    mw: 2687.1,
    halfLife: "not well characterized in humans",
  },

  // ── Additional research peptides ────────────────────────────────────────
  {
    slug: "epitalon",
    name: "Epitalon",
    family: "repair",
    type: "research",
    evidence: "Limited",
    summary: "A synthetic tetrapeptide promoted for longevity; limited independent evidence.",
    class: "Synthetic tetrapeptide (Ala-Glu-Asp-Gly)",
    source: "Synthetic; modeled on a pineal peptide preparation",
    receptor: "No established receptor; proposed effects on telomerase and pineal signaling",
    mechanism:
      "Epitalon is a synthetic tetrapeptide promoted for anti-ageing effects, with proposed influence on telomerase activity and pineal/melatonin signaling. Much of the supporting work comes from a small number of research groups, and rigorous, independent human evidence is limited.",
    facts: [
      "Its claims (telomerase, longevity) rest on limited and largely single-source evidence.",
      "No well-established receptor or mechanism in humans.",
      "A clear case for reading the evidence badge rather than the marketing.",
    ],
    questions: [
      "What is actually established about epitalon versus what is claimed?",
      "Why is the longevity evidence for epitalon considered limited?",
    ],
    mw: 390.4,
    halfLife: "~minutes (small peptide; human data limited)",
  },
  {
    slug: "selank",
    name: "Selank",
    family: "neuropeptides",
    type: "research",
    evidence: "Limited",
    summary: "A synthetic anxiolytic/nootropic peptide derived from tuftsin.",
    class: "Synthetic heptapeptide (tuftsin analog)",
    source: "Synthetic; based on the immunopeptide tuftsin",
    receptor: "No single established receptor; effects on GABA/serotonin and immune signaling proposed",
    mechanism:
      "Selank is a synthetic heptapeptide based on the immune-active fragment tuftsin, developed (largely in Russia) as an anxiolytic and nootropic. Proposed effects touch GABAergic, serotonergic, and immune signaling, but well-controlled independent human evidence is limited.",
    facts: [
      "Derived from tuftsin, an endogenous immunomodulatory peptide fragment.",
      "Developed primarily outside large international trial programs; independent evidence is limited.",
      "Mechanism is proposed across several systems rather than firmly established.",
    ],
    questions: [
      "What does the evidence actually show for selank?",
      "How does selank relate to the endogenous peptide tuftsin?",
    ],
    mw: 751.9,
    mwApprox: true,
    halfLife: "~minutes (rapidly degraded)",
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
