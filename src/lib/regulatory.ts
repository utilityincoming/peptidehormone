// lib/regulatory — the REGULATORY STATUS axis for the catalog.
// ---------------------------------------------------------------------------
// A third axis beside molecule type (endogenous / analog / research) and the
// evidence tier. Type says what a molecule IS, the tier says how well it is
// UNDERSTOOD, and this says where it STANDS with the regulator: approved as a
// medicine, still in trials, withdrawn, barred from compounding, or simply sold
// outside the drug system as "research use only".
//
// Scope is deliberately narrow and honest:
//   • United States (FDA) unless the basis line says otherwise. Other
//     jurisdictions are mentioned only where they change the picture (e.g. a
//     Russian approval for selank).
//   • A status describes the MOLECULE as a drug substance. A native hormone
//     whose synthetic form is an approved product (insulin, oxytocin) reads
//     "approved"; a native hormone with no product of its own but approved
//     analogs (GLP-1, GHRH) reads "endogenous" with the analogs named.
//   • Every entry carries a one-line `basis` naming the product, trial stage
//     or FDA list the status rests on — sourced, not asserted — and the whole
//     table carries one review date, because this is the field most likely to
//     go stale.
//
// Palette follows §6 of the Standard: never red. "Restricted" is the closest
// thing to a warning here and it takes amber, the same hue the evidence ladder
// gives its weakest tier — a disclosure, not an error.

import type { Hormone } from "@/lib/hormones";

export const REGULATORY_STATUSES = [
  "approved",
  "investigational",
  "withdrawn",
  "endogenous",
  "unapproved",
  "restricted",
] as const;

export type RegulatoryStatus = (typeof REGULATORY_STATUSES)[number];

/** Month the table was last reviewed against the public record. */
export const REGULATORY_AS_OF = "2026-09";

export type RegulatoryHue = "teal" | "blue" | "purple" | "slate" | "amber";

export interface RegulatoryStatusMeta {
  /** Chip label. */
  label: string;
  /** One clause, for the FAQ and tooltips. Reads after "…is". */
  clause: string;
  hue: RegulatoryHue;
}

export const REGULATORY_META: Record<RegulatoryStatus, RegulatoryStatusMeta> = {
  approved: {
    label: "FDA-approved",
    clause: "an approved prescription medicine in the United States",
    hue: "teal",
  },
  investigational: {
    label: "Investigational",
    clause: "in registered human trials but not approved for any indication",
    hue: "blue",
  },
  withdrawn: {
    label: "Withdrawn",
    clause: "a formerly approved product that is no longer marketed",
    hue: "purple",
  },
  endogenous: {
    label: "Endogenous signal",
    clause: "a native hormone with no drug product of its own, though engineered analogs may be approved",
    hue: "slate",
  },
  unapproved: {
    label: "Unapproved",
    clause: "sold outside the approved-drug system as research-use-only material, with no FDA approval for human use",
    hue: "slate",
  },
  restricted: {
    label: "Compounding restricted",
    clause: "an unapproved substance the FDA has placed in Category 2 of its 503A bulk-substances list, citing significant safety risks, so it may not lawfully be compounded",
    hue: "amber",
  },
};

export interface RegulatoryEntry {
  status: RegulatoryStatus;
  /** What the status rests on: product name, trial stage, FDA list. One line. */
  basis: string;
}

const FDA_503A =
  "FDA 503A bulk-substances list, Category 2 (substances that may present significant safety risks)";

// 23–24 July 2026 Pharmacy Compounding Advisory Committee: six nominated
// peptides were recommended for the 503A list against the advice of FDA
// review staff. Tallies are from the webcast as recorded by McDermott Will &
// Emery and Luma Lex; FDA had not posted summary minutes as of October 2026. The vote is advisory; nothing changes until the agency
// completes notice-and-comment rulemaking, so every status below still
// reflects the pre-vote position.
const PCAC_2026 = (tally: string) =>
  `In July 2026 the Pharmacy Compounding Advisory Committee voted ${tally} to recommend adding it to the 503A list, against FDA staff advice; the vote is non-binding and the status stands pending rulemaking.`;

// One entry per catalog slug. Missing an entry is a test failure, not a silent
// blank — a monograph without a status would look like an oversight rather
// than a disclosure.
export const REGULATORY: Record<string, RegulatoryEntry> = {
  // ── Incretins & metabolic ──
  "glp-1": {
    status: "endogenous",
    basis: "Native GLP-1 is not a product; its agonists (semaglutide, liraglutide, exenatide) are approved.",
  },
  gip: {
    status: "endogenous",
    basis: "No GIP product exists; GIPR agonism reaches patients only inside tirzepatide.",
  },
  glucagon: {
    status: "approved",
    basis: "Recombinant glucagon (GlucaGen, Gvoke, Baqsimi) approved for severe hypoglycemia.",
  },
  amylin: {
    status: "endogenous",
    basis: "Native amylin aggregates; the approved product is its analog pramlintide.",
  },
  insulin: {
    status: "approved",
    basis: "Recombinant human insulin and its analogs are approved across all diabetes indications.",
  },
  semaglutide: {
    status: "approved",
    basis: "Ozempic (2017), Rybelsus (2019) and Wegovy (2021) approved for type 2 diabetes and chronic weight management.",
  },
  tirzepatide: {
    status: "approved",
    basis: "Mounjaro (2022) and Zepbound (2023) approved for type 2 diabetes, obesity and obstructive sleep apnea.",
  },
  liraglutide: {
    status: "approved",
    basis: "Victoza (2010) and Saxenda (2014) approved; generic liraglutide followed in 2024.",
  },
  exenatide: {
    status: "approved",
    basis: "Byetta (2005) and Bydureon (2012) approved for type 2 diabetes; Byetta has since been discontinued commercially.",
  },
  retatrutide: {
    status: "investigational",
    basis: "Phase 3 TRIUMPH program (Lilly) reporting; no approval as of the review date.",
  },
  survodutide: {
    status: "investigational",
    basis: "Phase 3 SYNCHRONIZE program (Boehringer Ingelheim / Zealand) in obesity and MASH.",
  },
  brenipatide: {
    status: "investigational",
    basis: "Registered human trials; not approved for any indication.",
  },
  pramlintide: {
    status: "approved",
    basis: "Symlin (2005) approved as an adjunct to mealtime insulin in type 1 and type 2 diabetes.",
  },
  cagrilintide: {
    status: "investigational",
    basis: "Phase 3 REDEFINE program with semaglutide (CagriSema, Novo Nordisk); not approved alone.",
  },
  eloralintide: {
    status: "investigational",
    basis: "Phase 3 program (Eli Lilly) in obesity, alone and co-formulated with tirzepatide as EloraTZP; no approval.",
  },
  amycretin: {
    status: "investigational",
    basis: "Phase 2–3 trials (Novo Nordisk) in obesity; no approval.",
  },
  "maridebart-cafraglutide": {
    status: "investigational",
    basis: "Phase 3 MARITIME program (Amgen, MariTide); no approval.",
  },

  // ── Growth & somatotropic ──
  "growth-hormone": {
    status: "approved",
    basis: "Recombinant somatropin approved since 1985 for growth-hormone deficiency and related indications.",
  },
  "igf-1": {
    status: "approved",
    basis: "Mecasermin (Increlex, 2005) approved for severe primary IGF-1 deficiency.",
  },
  "igf-2": {
    status: "endogenous",
    basis: "No IGF-2 drug product; interest is diagnostic (IGF-2-secreting tumours) rather than therapeutic.",
  },
  mgf: {
    status: "unapproved",
    basis: "No approved product and no registered human trials; sold research-use-only.",
  },
  "igf-1-lr3": {
    status: "unapproved",
    basis: "A laboratory reagent with no human drug development; sold research-use-only.",
  },
  ghrh: {
    status: "endogenous",
    basis: "Native GHRH is not a product; its analogs tesamorelin (approved) and sermorelin (withdrawn) are.",
  },
  ghrelin: {
    status: "endogenous",
    basis: "No ghrelin product; the receptor agonist macimorelin (Macrilen) is approved as a diagnostic.",
  },
  somatostatin: {
    status: "endogenous",
    basis: "Native somatostatin is too short-lived to market; octreotide, lanreotide and pasireotide are the approved analogs.",
  },

  // ── Melanocortin & stress axis ──
  "alpha-msh": {
    status: "endogenous",
    basis: "No α-MSH product; the analog afamelanotide (Scenesse, 2019) is approved for erythropoietic protoporphyria.",
  },
  acth: {
    status: "approved",
    basis: "Repository corticotropin (Acthar Gel) and cosyntropin (Cortrosyn) are approved products.",
  },
  oxytocin: {
    status: "approved",
    basis: "Synthetic oxytocin (Pitocin) approved for labour induction and postpartum haemorrhage.",
  },
  vasopressin: {
    status: "approved",
    basis: "Vasopressin injection (Vasostrict) approved for vasodilatory shock; desmopressin is an approved analog.",
  },
  crh: {
    status: "approved",
    basis: "Corticorelin ovine (Acthrel) approved as a diagnostic for Cushing's syndrome; commercially discontinued.",
  },
  trh: {
    status: "withdrawn",
    basis: "Protirelin (Thyrel TRH) was approved as a diagnostic and later discontinued in the US.",
  },

  // ── Gut & appetite ──
  pyy: {
    status: "endogenous",
    basis: "No PYY product; PYY analogs have reached early-phase trials in obesity.",
  },
  cck: {
    status: "approved",
    basis: "Sincalide (Kinevac), the CCK-8 fragment, approved as a diagnostic for gallbladder and pancreatic function.",
  },
  secretin: {
    status: "approved",
    basis: "Human secretin (ChiRhoStim) approved as a diagnostic for pancreatic function and gastrinoma.",
  },
  motilin: {
    status: "endogenous",
    basis: "No motilin product; erythromycin is used off-label as a motilin-receptor agonist.",
  },

  // ── Reproductive & gonadal ──
  gnrh: {
    status: "approved",
    basis: "Gonadorelin (Factrel) was approved as a diagnostic; supply is limited and most clinical use is via analogs.",
  },
  lh: {
    status: "approved",
    basis: "Lutropin alfa (Luveris) approved for ovarian stimulation; LH activity is now mostly supplied via hCG or menotropins.",
  },
  fsh: {
    status: "approved",
    basis: "Follitropin alfa and beta (Gonal-f, Follistim) approved for infertility treatment.",
  },
  kisspeptin: {
    status: "investigational",
    basis: "Kisspeptin-54 and -10 are in human trials for reproductive and metabolic indications; kisspeptin-10 also sits on the FDA 503A Category 2 list.",
  },
  hcg: {
    status: "approved",
    basis: "Urinary hCG (Novarel, Pregnyl) and choriogonadotropin alfa (Ovidrel) are approved fertility products.",
  },
  leuprolide: {
    status: "approved",
    basis: "Lupron and its depot formulations approved for prostate cancer, endometriosis and central precocious puberty.",
  },
  goserelin: {
    status: "approved",
    basis: "Zoladex implant approved for prostate and breast cancer and endometriosis.",
  },
  cetrorelix: {
    status: "approved",
    basis: "Cetrotide approved to prevent premature LH surges in controlled ovarian stimulation.",
  },

  // ── Adipokines ──
  leptin: {
    status: "approved",
    basis: "Metreleptin (Myalept, 2014) approved for generalised lipodystrophy.",
  },
  adiponectin: {
    status: "endogenous",
    basis: "No adiponectin product; small-molecule receptor agonists remain preclinical.",
  },

  // ── Calcium & bone ──
  pth: {
    status: "approved",
    basis: "Teriparatide (Forteo, PTH 1-34) approved for osteoporosis; palopegteriparatide (Yorvipath) for hypoparathyroidism.",
  },
  calcitonin: {
    status: "approved",
    basis: "Salmon calcitonin (Miacalcin) approved for Paget's disease, hypercalcaemia and osteoporosis.",
  },
  pthrp: {
    status: "endogenous",
    basis: "No PTHrP product; its analog abaloparatide (Tymlos, 2017) is approved for osteoporosis.",
  },

  // ── Cardiovascular ──
  anp: {
    status: "endogenous",
    basis: "Carperitide (recombinant ANP) is approved in Japan, not the US.",
  },
  bnp: {
    status: "approved",
    basis: "Nesiritide (Natrecor, 2001) approved for acute decompensated heart failure; commercially discontinued.",
  },
  cnp: {
    status: "endogenous",
    basis: "No CNP product; its analog vosoritide (Voxzogo, 2021) is approved for achondroplasia.",
  },

  // ── Muscle & TGF-β ──
  myostatin: {
    status: "endogenous",
    basis: "Not a drug itself; myostatin-pathway inhibitors (e.g. apitegromab) are in late-stage trials.",
  },
  "activin-a": {
    status: "endogenous",
    basis: "Not a drug itself; the activin ligand trap sotatercept (Winrevair, 2024) is approved for pulmonary arterial hypertension.",
  },
  follistatin: {
    status: "endogenous",
    basis: "No follistatin product; gene-therapy delivery has reached early human trials only.",
  },

  // ── Repair & tissue ──
  "thymosin-beta-4": {
    status: "unapproved",
    basis: "No approved product; RGN-259 (Tβ4 eye drops) has completed Phase 3 trials in dry eye without approval.",
  },
  "ghk-cu": {
    status: "unapproved",
    basis: "Used in cosmetics; no drug approval and no registered human drug trials.",
  },
  "bpc-157": {
    status: "restricted",
    basis: `${FDA_503A}, September 2023. ${PCAC_2026("8–6 with one abstention")}`,
  },
  "tb-500": {
    status: "unapproved",
    basis: `A synthetic Tβ4 fragment with no drug development history; sold research-use-only. ${PCAC_2026("8–6 with one abstention")}`,
  },

  // ── Analogs: somatostatin & GHRH ──
  octreotide: {
    status: "approved",
    basis: "Sandostatin (1988) and its LAR depot approved for acromegaly and neuroendocrine tumours.",
  },
  lanreotide: {
    status: "approved",
    basis: "Somatuline Depot approved for acromegaly and gastroenteropancreatic neuroendocrine tumours.",
  },
  pasireotide: {
    status: "approved",
    basis: "Signifor (2012) and Signifor LAR approved for Cushing's disease and acromegaly.",
  },
  tesamorelin: {
    status: "approved",
    basis: "Egrifta (2010) approved for HIV-associated lipodystrophy.",
  },
  "cjc-1295": {
    status: "restricted",
    basis: `${FDA_503A}, September 2023.`,
  },
  sermorelin: {
    status: "withdrawn",
    basis: "Geref was approved as a diagnostic and for paediatric GH deficiency, then discontinued in 2008; now compounded under 503A nomination.",
  },
  ipamorelin: {
    status: "restricted",
    basis: `${FDA_503A}, September 2023.`,
  },

  // ── Melanocortin analog ──
  "pt-141": {
    status: "approved",
    basis: "Bremelanotide (Vyleesi, 2019) approved for hypoactive sexual desire disorder in premenopausal women.",
  },

  // ── Mitochondrial ──
  "mots-c": {
    status: "restricted",
    basis: `${FDA_503A}, September 2023. ${PCAC_2026("7–5 with two abstentions")}`,
  },
  humanin: {
    status: "unapproved",
    basis: "No drug product and no registered human trials; preclinical only.",
  },

  // ── Neuro & longevity peptides ──
  epitalon: {
    status: "restricted",
    basis: `${FDA_503A}, September 2023. ${PCAC_2026("7–4 with one abstention")}`,
  },
  selank: {
    status: "unapproved",
    basis: "Approved as an anxiolytic in Russia; no FDA approval or US trials.",
  },
  "ss-31": {
    status: "approved",
    basis: "Elamipretide (Forzinity) received FDA accelerated approval for Barth syndrome in September 2025.",
  },
  "aod-9604": {
    status: "restricted",
    basis: `${FDA_503A}, September 2023.`,
  },
  kpv: {
    status: "restricted",
    basis: `${FDA_503A}, September 2023. ${PCAC_2026("8–6 with one abstention")}`,
  },
  dsip: {
    status: "restricted",
    basis: `${FDA_503A}, September 2023.`,
  },
  semax: {
    status: "unapproved",
    basis: `Approved as a nootropic in Russia; no FDA approval or US trials. ${PCAC_2026("8–5 with one abstention")}`,
  },
  "ara-290": {
    status: "investigational",
    basis: "Cibinetide has completed Phase 2 trials in sarcoidosis-associated neuropathy; no approval.",
  },
};

/** Status record for a slug, or undefined when the table has no row. */
export function regulatoryFor(slug: string): RegulatoryEntry | undefined {
  return REGULATORY[slug];
}

/** Meta (label, clause, hue) for a status, falling to "unapproved" for unknown labels. */
export function regulatoryMeta(status: string): RegulatoryStatusMeta {
  return REGULATORY_META[status as RegulatoryStatus] ?? REGULATORY_META.unapproved;
}

/** Catalog slugs the table does not cover — used by the test and by nothing else. */
export function uncoveredSlugs(hormones: Hormone[]): string[] {
  return hormones.map((h) => h.slug).filter((s) => !(s in REGULATORY));
}

/**
 * FAQ row derived entirely from the table — "Is X FDA-approved?" is one of the
 * commonest queries a monograph gets, and the answer here is only ever the
 * status clause plus its basis line, never a new claim.
 */
export function regulatoryFaq(h: Hormone): { q: string; a: string } | undefined {
  const entry = REGULATORY[h.slug];
  if (!entry) return undefined;
  const label = h.abbr ?? h.name;
  const meta = REGULATORY_META[entry.status];
  const yes = entry.status === "approved";
  return {
    q: `Is ${label} FDA-approved?`,
    a: `${yes ? "Yes" : "No"} — as of ${formatAsOf(REGULATORY_AS_OF)}, ${label} is ${meta.clause}. ${entry.basis} Status is US-centric and can change; check the FDA record for the current position.`,
  };
}

/** "2026-09" → "September 2026". */
export function formatAsOf(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  if (!y || !m) return ym;
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
