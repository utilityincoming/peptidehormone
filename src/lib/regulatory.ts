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
//     or FDA list the status rests on, the month that row was last checked,
//     and (where a status can move) a link to the public record it can be
//     rechecked against, because this is the field most likely to go stale.
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

/** Month of the most recent review pass. Each row carries its own `verified` month. */
export const REGULATORY_AS_OF = "2026-11";

/** Rows not rechecked in the latest pass keep the month of the last full-table review. */
const BASELINE = "2026-09";

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
    clause: "an unapproved substance the FDA placed in Category 2 of its interim 503A bulk-substances policy, citing significant safety risks; the nomination was later withdrawn and it is still not on the 503A list, so it may not lawfully be compounded",
    hue: "amber",
  },
};

export interface RegulatorySource {
  /** Names the record, not the claim: "DailyMed: current US labels". */
  label: string;
  url: string;
}

interface RegulatoryRow {
  status: RegulatoryStatus;
  /** What the status rests on: product name, trial stage, FDA list. One line. */
  basis: string;
}

export interface RegulatoryEntry extends RegulatoryRow {
  /** Month (YYYY-MM) this row was last checked against the record in `source`. */
  verified: string;
  /**
   * The public record the row can be rechecked against. Present for every
   * approved, investigational and restricted row; absent where the status is
   * the absence of a product (endogenous, unapproved, withdrawn).
   */
  source?: RegulatorySource;
}

// Category 2 is history for every catalog row except kisspeptin-10. FDA's page
// "Certain Bulk Drug Substances for Use in Compounding that May Present
// Significant Safety Risks" (content current 22 April 2026) moves these
// substances to a "nominated but withdrawn" table: the nominators withdrew, so
// the interim-policy category no longer applies. Leaving Category 2 is not
// permission. None is on the 503A list, in Category 1, the subject of a USP
// monograph or a component of an approved drug, so none may be compounded.
const FDA_503A =
  "Placed in Category 2 of the FDA's interim 503A bulk-substances policy (substances that may present significant safety risks) in September 2023";

/** The nomination was withdrawn; FDA's withdrawn table gives no date for these. */
const WITHDRAWN = `${FDA_503A}; the nomination was later withdrawn and it is not on the 503A list, so it still may not be compounded.`;

/** One of the twelve peptides FDA removed from Category 2 in April 2026. */
const WITHDRAWN_2026 = `${FDA_503A}; removed in April 2026 after the nomination was withdrawn. It is not on the 503A list, so it still may not be compounded.`;

// 23–24 July 2026 Pharmacy Compounding Advisory Committee: six nominated
// peptides were recommended for the 503A list against the advice of FDA
// review staff. Tallies are from the webcast as recorded by McDermott Will &
// Emery and Luma Lex; FDA had not posted summary minutes as of October 2026. The vote is advisory; nothing changes until the agency
// completes notice-and-comment rulemaking, so every status below still
// reflects the pre-vote position. By the time of the vote none of the six was
// in Category 2 any longer (see above); FDA brought them to the committee on
// its own initiative.
const PCAC_2026 = (tally: string) =>
  `In July 2026 the Pharmacy Compounding Advisory Committee voted ${tally} to recommend adding it to the 503A list, against FDA staff advice; the vote is non-binding and nothing changes unless the agency completes rulemaking.`;

// One entry per catalog slug. Missing an entry is a test failure, not a silent
// blank — a monograph without a status would look like an oversight rather
// than a disclosure.
const ROWS: Record<string, RegulatoryRow> = {
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
    basis: "Ozempic (2017), Rybelsus (2019) and Wegovy (2021) approved for type 2 diabetes and chronic weight management; a once-daily Wegovy tablet followed in December 2025.",
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
    basis: "Phase 3 obesity and diabetes results published (TRIUMPH-1, TRIUMPH-2). Lilly has said it plans a U.S. BLA in Q1 2027. Not approved.",
  },
  survodutide: {
    status: "investigational",
    basis: "Phase 3 SYNCHRONIZE obesity program (Boehringer Ingelheim / Zealand) read out during 2026, ending with the cardiovascular safety trial in November. Boehringer says it is preparing regulatory submissions. Not approved.",
  },
  brenipatide: {
    status: "investigational",
    basis: "Phase 3 RENEW program (Eli Lilly) in alcohol use disorder and major depressive disorder; Phase 2 across psychiatric, addiction, gut and airway indications. No approval.",
  },
  pramlintide: {
    status: "approved",
    basis: "Symlin (2005) approved as an adjunct to mealtime insulin in type 1 and type 2 diabetes.",
  },
  cagrilintide: {
    status: "investigational",
    basis: "Novo Nordisk submitted the fixed combination with semaglutide (CagriSema) to the FDA in December 2025 on the phase 3 REDEFINE program; no decision had been announced when checked. Not approved alone or in combination.",
  },
  eloralintide: {
    status: "investigational",
    basis: "Phase 3 program (Eli Lilly) in obesity, alone and co-formulated with tirzepatide as EloraTZP; no approval.",
  },
  amycretin: {
    status: "investigational",
    basis: "Phase 3 AMAZE program (Novo Nordisk) under way; no approval.",
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
    status: "withdrawn",
    basis: "Gonadorelin (Factrel) was approved as a human diagnostic and is no longer marketed for people; the gonadorelin labels current in the US are veterinary. Clinical use is via analogs such as leuprolide.",
  },
  lh: {
    status: "withdrawn",
    basis: "Lutropin alfa (Luveris) was approved for ovarian stimulation but has no current US label; LH activity is now supplied via hCG or menotropins (Menopur).",
  },
  fsh: {
    status: "approved",
    basis: "Follitropin alfa and beta (Gonal-f, Follistim) approved for infertility treatment.",
  },
  kisspeptin: {
    status: "investigational",
    basis: "Kisspeptin-54 and -10 are in human trials for reproductive and metabolic indications; kisspeptin-10 remains in Category 2 of the FDA's interim 503A policy and may not be compounded.",
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
    status: "withdrawn",
    basis: "Nesiritide (Natrecor, 2001) was approved for acute decompensated heart failure and later discontinued; it has no current US label.",
  },
  cnp: {
    status: "endogenous",
    basis: "No CNP product; its analog vosoritide (Voxzogo, 2021) is approved for achondroplasia.",
  },
  apelin: {
    status: "endogenous",
    basis: "No approved apelin product. Human evidence is from short intravenous infusions; the small-molecule agonist AMG 986 reached phase 1 without a clinically meaningful cardiac effect.",
  },
  elabela: {
    status: "endogenous",
    basis: "No elabela product. It is the second endogenous ligand of the apelin receptor, studied for development and cardiovascular effects, with no approved drug.",
  },

  // ── Muscle & TGF-β ──
  myostatin: {
    status: "endogenous",
    basis: "Not a drug itself; the anti-myostatin antibody apitegromab (Isembyld) was approved in September 2026 for spinal muscular atrophy.",
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
    basis: "Used in cosmetics; no drug approval and no registered human drug trials. Injectable GHK-Cu was in Category 2 of the FDA's interim 503A policy until April 2026, when the nomination was withdrawn; it still may not be compounded.",
  },
  "bpc-157": {
    status: "restricted",
    basis: `${WITHDRAWN_2026} ${PCAC_2026("8–6 with one abstention")}`,
  },
  "tb-500": {
    status: "restricted",
    basis: `A synthetic Tβ4 fragment with no drug development history. ${WITHDRAWN_2026} ${PCAC_2026("8–6 with one abstention")}`,
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
    basis: WITHDRAWN,
  },
  sermorelin: {
    status: "withdrawn",
    basis: "Geref was approved as a diagnostic and for paediatric GH deficiency, then discontinued in 2008; now compounded under 503A nomination.",
  },
  ipamorelin: {
    status: "restricted",
    basis: WITHDRAWN,
  },

  // ── Melanocortin analog ──
  "pt-141": {
    status: "approved",
    basis: "Bremelanotide (Vyleesi, 2019) approved for hypoactive sexual desire disorder in premenopausal women.",
  },

  // ── Mitochondrial ──
  "mots-c": {
    status: "restricted",
    basis: `${WITHDRAWN_2026} ${PCAC_2026("7–5 with two abstentions")}`,
  },
  humanin: {
    status: "unapproved",
    basis: "No drug product and no registered human trials; preclinical only.",
  },

  // ── Neuro & longevity peptides ──
  epitalon: {
    status: "restricted",
    basis: `${WITHDRAWN_2026} ${PCAC_2026("7–4 with one abstention")}`,
  },
  selank: {
    status: "restricted",
    basis: `Approved as an anxiolytic in Russia; no FDA approval or US trials. ${WITHDRAWN}`,
  },
  "ss-31": {
    status: "approved",
    basis: "Elamipretide (Forzinity) received FDA accelerated approval for Barth syndrome in September 2025.",
  },
  "aod-9604": {
    status: "restricted",
    basis: WITHDRAWN,
  },
  kpv: {
    status: "restricted",
    basis: `${WITHDRAWN_2026} ${PCAC_2026("8–6 with one abstention")}`,
  },
  dsip: {
    status: "restricted",
    basis: `${WITHDRAWN_2026} In July 2026 the Pharmacy Compounding Advisory Committee declined to recommend it for the 503A list.`,
  },
  semax: {
    status: "restricted",
    basis: `Approved as a nootropic in Russia; no FDA approval or US trials. ${WITHDRAWN_2026} ${PCAC_2026("8–5 with one abstention")}`,
  },
  "ara-290": {
    status: "investigational",
    basis: "Cibinetide has completed Phase 2 trials in sarcoidosis-associated neuropathy; no approval.",
  },
};

// ── Where each row can be rechecked ──────────────────────────────────────────
// Three records cover every status that can move. An approved row points at
// DailyMed, where a current US label either exists or does not. A trial-stage
// row points at the ClinicalTrials.gov records for the molecule. A restricted
// row points at FDA's page on bulk substances that may present safety risks.

const dailymed = (drug: string): RegulatorySource => ({
  label: "DailyMed: current US labels",
  url: `https://dailymed.nlm.nih.gov/dailymed/search.cfm?labeltype=all&query=${encodeURIComponent(drug)}`,
});

const trials = (term: string): RegulatorySource => ({
  label: "ClinicalTrials.gov records",
  url: `https://clinicaltrials.gov/search?intr=${encodeURIComponent(term)}`,
});

const FDA_SAFETY_RISKS: RegulatorySource = {
  label: "FDA: bulk substances that may present significant safety risks",
  url: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
};

/** Search term per row, where the catalog slug is not the name the record uses. */
const LABEL_NAME: Record<string, string> = {
  insulin: "insulin human",
  "growth-hormone": "somatropin",
  "igf-1": "mecasermin",
  acth: "corticotropin",
  crh: "corticorelin",
  cck: "sincalide",
  secretin: "human secretin",
  gnrh: "gonadorelin",
  fsh: "follitropin",
  hcg: "chorionic gonadotropin",
  leptin: "metreleptin",
  pth: "teriparatide",
  "pt-141": "bremelanotide",
  "ss-31": "elamipretide",
};

const TRIAL_TERM: Record<string, string> = {
  amycretin: "amycretin OR NNC0487-0111",
  "maridebart-cafraglutide": "maridebart cafraglutide",
  "ara-290": 'cibinetide OR "ARA 290"',
};

/** Rows whose source is not the default for their status. */
const SOURCE_OVERRIDE: Record<string, RegulatorySource> = {
  myostatin: dailymed("apitegromab"),
  "ghk-cu": FDA_SAFETY_RISKS,
};

function sourceFor(slug: string, status: RegulatoryStatus): RegulatorySource | undefined {
  if (SOURCE_OVERRIDE[slug]) return SOURCE_OVERRIDE[slug];
  if (status === "approved") return dailymed(LABEL_NAME[slug] ?? slug);
  if (status === "investigational") return trials(TRIAL_TERM[slug] ?? slug);
  if (status === "restricted") return FDA_SAFETY_RISKS;
  return undefined;
}

// November 2026 pass. Every approved row was checked for a current label on
// DailyMed, every investigational row for registered trials and the absence of
// a label, every restricted row against FDA's safety-risks page, and the four
// withdrawn rows for the absence of a label. Endogenous and unapproved rows
// were not rechecked, apart from the two named here, and keep the baseline.
const RECHECKED_STATUSES: RegulatoryStatus[] = ["approved", "investigational", "restricted", "withdrawn"];
const RECHECKED_ROWS = new Set(["myostatin", "ghk-cu"]);

// One entry per catalog slug: the row above plus its check month and source.
export const REGULATORY: Record<string, RegulatoryEntry> = Object.fromEntries(
  Object.entries(ROWS).map(([slug, row]) => [
    slug,
    {
      ...row,
      verified:
        RECHECKED_STATUSES.includes(row.status) || RECHECKED_ROWS.has(slug) ? REGULATORY_AS_OF : BASELINE,
      source: sourceFor(slug, row.status),
    },
  ]),
);
// ── Molecules the insights discuss that are not in the catalog ───────────────
// The catalog test guarantees a row for every monograph, but articles also make
// status claims about drugs that have no monograph. Those claims went stale
// unnoticed (orforglipron and apitegromab were both approved while articles
// still called them investigational), so they are tracked here on the same
// terms: a status, a basis, a check month and a record to recheck against.
// regulatory.test.ts reads this list to catch prose that contradicts it.
export interface WatchedEntry extends RegulatoryEntry {
  /** Name as the articles write it. */
  name: string;
}

export const WATCHED: Record<string, WatchedEntry> = {
  orforglipron: {
    name: "orforglipron",
    status: "approved",
    basis: "Foundayo approved in April 2026 for chronic weight management.",
    verified: "2026-11",
    source: dailymed("orforglipron"),
  },
  apitegromab: {
    name: "apitegromab",
    status: "approved",
    basis: "Isembyld approved in September 2026 for spinal muscular atrophy.",
    verified: "2026-11",
    source: dailymed("apitegromab"),
  },
  garetosmab: {
    name: "garetosmab",
    status: "approved",
    basis: "Pasatru has a current US label; the application was for fibrodysplasia ossificans progressiva.",
    verified: "2026-11",
    source: dailymed("garetosmab"),
  },
  sotatercept: {
    name: "sotatercept",
    status: "approved",
    basis: "Winrevair approved in 2024 for pulmonary arterial hypertension.",
    verified: "2026-11",
    source: dailymed("sotatercept"),
  },
  fezolinetant: {
    name: "fezolinetant",
    status: "approved",
    basis: "Veozah has a current US label.",
    verified: "2026-11",
    source: dailymed("fezolinetant"),
  },
  elinzanetant: {
    name: "elinzanetant",
    status: "approved",
    basis: "Lynkuet has a current US label.",
    verified: "2026-11",
    source: dailymed("elinzanetant"),
  },
  eloratzp: {
    name: "EloraTZP",
    status: "investigational",
    basis: "Eloralintide given with tirzepatide (Eli Lilly); phase 2b reported in 2026, with no label for either the combination or eloralintide when checked.",
    verified: "2026-11",
    source: trials("eloralintide"),
  },
  cagrisema: {
    name: "CagriSema",
    status: "investigational",
    basis: "Submitted to the FDA in December 2025; no cagrilintide label existed when checked.",
    verified: "2026-11",
    source: trials("cagrilintide"),
  },
  bimagrumab: {
    name: "bimagrumab",
    status: "investigational",
    basis: "No US label when checked; in trials for obesity.",
    verified: "2026-11",
    source: trials("bimagrumab"),
  },
  trevogrumab: {
    name: "trevogrumab",
    status: "investigational",
    basis: "No US label when checked; in trials as an add-on to GLP-1 agonists.",
    verified: "2026-11",
    source: trials("trevogrumab"),
  },
};

/**
 * Sentences that call `name` investigational, in already-flattened article
 * text. Two shapes are caught: "X is investigational" and a list such as
 * "X, Y and Z are investigational" with the name anywhere in it. Used to find prose that an approval has
 * overtaken.
 */
export function investigationalClaims(text: string, name: string): string[] {
  const n = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const single = new RegExp(`\\b${n}\\b( \\([^)]*\\))? (is|remains|is still) (an )?investigational[^.]*`, "gi");
  const list = new RegExp(`\\b${n}\\b(,| and | or )[\\w\\s,-]{0,90}\\bare investigational[^.]*|\\b${n} are investigational[^.]*`, "gi");
  return [...(text.match(single) ?? []), ...(text.match(list) ?? [])];
}

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
    a: `${yes ? "Yes" : "No"} — as of ${formatAsOf(entry.verified)}, ${label} is ${meta.clause}. ${entry.basis} Status is US-centric and can change; check the FDA record for the current position.`,
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
