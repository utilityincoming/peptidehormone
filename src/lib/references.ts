// Selected peer-reviewed references per monograph — curated review articles,
// not exhaustive per-claim citations. Every entry was sourced live from PubMed
// (NCBI E-utilities) and vetted for topical relevance; titles, journals, and
// years are as returned by PubMed. PMIDs resolve at pubmed.ncbi.nlm.nih.gov.

export interface Reference {
  /** PubMed identifier. */
  pmid: string;
  title: string;
  /** Journal (full name). */
  source: string;
  year: string;
}

export const REFERENCES: Record<string, Reference[]> = {
  "glp-1": [
    { pmid: "29617641", title: "Mechanisms of Action and Therapeutic Application of Glucagon-like Peptide-1", source: "Cell metabolism", year: "2018" },
    { pmid: "17928588", title: "The physiology of glucagon-like peptide 1", source: "Physiological reviews", year: "2007" },
    { pmid: "39289339", title: "Glucagon-like peptide-1 receptor: mechanisms and advances in therapy", source: "Signal transduction and targeted therapy", year: "2024" },
  ],
  gip: [
    { pmid: "40024571", title: "Glucose-dependent insulinotropic polypeptide (GIP)", source: "Molecular metabolism", year: "2025" },
    { pmid: "39114288", title: "Mechanisms of action and therapeutic applications of GLP-1 and dual GIP/GLP-1 receptor agonists", source: "Frontiers in endocrinology", year: "2024" },
  ],
  glucagon: [
    { pmid: "28275047", title: "The New Biology and Pharmacology of Glucagon", source: "Physiological reviews", year: "2017" },
    { pmid: "37367959", title: "100 years of glucagon and 100 more", source: "Diabetologia", year: "2023" },
    { pmid: "12626323", title: "Glucagon and regulation of glucose metabolism", source: "American journal of physiology. Endocrinology and metabolism", year: "2003" },
  ],
  amylin: [
    { pmid: "26071095", title: "Amylin: Pharmacology, Physiology, and Clinical Potential", source: "Pharmacological reviews", year: "2015" },
    { pmid: "40360789", title: "Amylin: emergent therapeutic opportunities in overweight, obesity and diabetes mellitus", source: "Nature reviews. Endocrinology", year: "2025" },
  ],
  insulin: [
    { pmid: "34267380", title: "100 years of insulin: celebrating the past, present and future of diabetes therapy", source: "Nature medicine", year: "2021" },
    { pmid: "35066003", title: "Insulin: The master regulator of glucose metabolism", source: "Metabolism: clinical and experimental", year: "2022" },
  ],
  semaglutide: [
    { pmid: "36578889", title: "Efficacy and Safety of Semaglutide for Weight Loss in Obesity Without Diabetes: A Systematic Review and Meta-Analysis", source: "Journal of the ASEAN Federation of Endocrine Societies", year: "2022" },
    { pmid: "31031702", title: "The Discovery and Development of Liraglutide and Semaglutide", source: "Frontiers in endocrinology", year: "2019" },
  ],
  tirzepatide: [
    { pmid: "39632534", title: "Tirzepatide for overweight and obesity management", source: "Expert opinion on pharmacotherapy", year: "2025" },
    { pmid: "38613667", title: "Subcutaneously administered tirzepatide vs semaglutide for adults with type 2 diabetes: a systematic review and network meta-analysis of randomised controlled trials", source: "Diabetologia", year: "2024" },
  ],
  liraglutide: [
    { pmid: "34626851", title: "GLP-1 physiology informs the pharmacotherapy of obesity", source: "Molecular metabolism", year: "2022" },
    { pmid: "39037780", title: "Medications for Obesity: A Review", source: "JAMA", year: "2024" },
  ],
  exenatide: [
    { pmid: "33068776", title: "GLP-1 receptor agonists in the treatment of type 2 diabetes - state-of-the-art", source: "Molecular metabolism", year: "2021" },
    { pmid: "37445623", title: "Emerging Role of GLP-1 Agonists in Obesity: A Comprehensive Review of Randomised Controlled Trials", source: "International journal of molecular sciences", year: "2023" },
  ],
  retatrutide: [
    { pmid: "39318607", title: "Effects of once-weekly subcutaneous retatrutide on weight and metabolic markers: A systematic review and meta-analysis of randomized controlled trials", source: "Metabolism open", year: "2024" },
    { pmid: "38843460", title: "Efficacy and Safety of GLP-1 Medicines for Type 2 Diabetes and Obesity", source: "Diabetes care", year: "2024" },
  ],
  "growth-hormone": [
    { pmid: "33029711", title: "Growth hormone deficiency and replacement in children", source: "Reviews in endocrine & metabolic disorders", year: "2021" },
    { pmid: "36948778", title: "Growth Hormone and Aging", source: "Endocrinology and metabolism clinics of North America", year: "2023" },
  ],
  "igf-1": [
    { pmid: "39930003", title: "Regulation and function of insulin and insulin-like growth factor receptor signalling", source: "Nature reviews. Molecular cell biology", year: "2025" },
    { pmid: "29163145", title: "Insulin-Like Growth Factor-1 and Neuroinflammation", source: "Frontiers in aging neuroscience", year: "2017" },
  ],
  ghrh: [
    { pmid: "2874984", title: "Growth hormone-releasing hormone", source: "Endocrine reviews", year: "1986" },
    { pmid: "39422787", title: "Growth hormone-releasing hormone and cancer", source: "Reviews in endocrine & metabolic disorders", year: "2025" },
  ],
  ghrelin: [
    { pmid: "29576534", title: "The Homeostatic Force of Ghrelin", source: "Cell metabolism", year: "2018" },
    { pmid: "17212793", title: "The role of leptin and ghrelin in the regulation of food intake and body weight in humans: a review", source: "Obesity reviews : an official journal of the International Association for the Study of Obesity", year: "2007" },
  ],
  somatostatin: [
    { pmid: "39116368", title: "Structure and Function of Somatostatin and Its Receptors in Endocrinology", source: "Endocrine reviews", year: "2025" },
    { pmid: "6139753", title: "Somatostatin", source: "The New England journal of medicine", year: "1983" },
  ],
  "alpha-msh": [
    { pmid: "36291616", title: "Ligands for Melanocortin Receptors: Beyond Melanocyte-Stimulating Hormones and Adrenocorticotropin", source: "Biomolecules", year: "2022" },
    { pmid: "6294567", title: "Alpha-melanocyte-stimulating hormone and behavior", source: "Neuroscience and biobehavioral reviews", year: "1982" },
  ],
  acth: [
    { pmid: "32060528", title: "Dynamics of ACTH and Cortisol Secretion and Implications for Disease", source: "Endocrine reviews", year: "2020" },
    { pmid: "27547198", title: "ACTH Antagonists", source: "Frontiers in endocrinology", year: "2016" },
  ],
  oxytocin: [
    { pmid: "38462255", title: "The physiology and pharmacology of oxytocin in labor and in the peripartum period", source: "American journal of obstetrics and gynecology", year: "2024" },
    { pmid: "33823654", title: "Oxytocin, Neural Plasticity, and Social Behavior", source: "Annual review of neuroscience", year: "2021" },
  ],
  vasopressin: [
    { pmid: "11091117", title: "Vasopressin receptors", source: "Trends in endocrinology and metabolism: TEM", year: "2000" },
    { pmid: "29999710", title: "Vasopressin", source: "", year: "2006" },
  ],
  crh: [
    { pmid: "3292914", title: "Corticotropin-releasing hormone", source: "The New England journal of medicine", year: "1988" },
    { pmid: "29719288", title: "The Hypothalamic-Pituitary-Adrenal Axis: A Brief History", source: "Hormone research in paediatrics", year: "2018" },
  ],
  trh: [
    { pmid: "16472189", title: "Thyrotropin-releasing hormone analogs", source: "Mini reviews in medicinal chemistry", year: "2006" },
    { pmid: "6798440", title: "Thyrotropin-releasing hormone", source: "The New England journal of medicine", year: "1982" },
  ],
  pyy: [
    { pmid: "29364588", title: "Incretin hormones: Their role in health and disease", source: "Diabetes, obesity & metabolism", year: "2018" },
    { pmid: "38511400", title: "Gut hormones and appetite regulation", source: "Current opinion in endocrinology, diabetes, and obesity", year: "2024" },
  ],
  cck: [
    { pmid: "35152916", title: "Role of cholecystokinin in satiation: a systematic review and meta-analysis", source: "The British journal of nutrition", year: "2023" },
    { pmid: "17940422", title: "Cholecystokinin", source: "Current opinion in endocrinology, diabetes, and obesity", year: "2007" },
  ],
  secretin: [
    { pmid: "14673718", title: "Secretin, 100 years later", source: "Journal of gastroenterology", year: "2003" },
    { pmid: "38221598", title: "Secretin: a hormone for HCO(3)(-) homeostasis", source: "Pflugers Archiv : European journal of physiology", year: "2024" },
  ],
  motilin: [
    { pmid: "9210180", title: "Motilin and clinical application", source: "Peptides", year: "1997" },
    { pmid: "34153172", title: "The gastrointestinal tract in hunger and satiety signalling", source: "United European gastroenterology journal", year: "2021" },
  ],
  gnrh: [
    { pmid: "17940457", title: "The role of gonadotropin releasing hormone in normal and pathologic endocrine processes", source: "Current opinion in endocrinology, diabetes, and obesity", year: "2007" },
    { pmid: "16650469", title: "Gonadotropin-releasing hormone (GnRH) and its natural analogues: a review", source: "Theriogenology", year: "2006" },
  ],
  lh: [
    { pmid: "34884539", title: "The Roles of Luteinizing Hormone, Follicle-Stimulating Hormone and Testosterone in Spermatogenesis and Folliculogenesis Revisited", source: "International journal of molecular sciences", year: "2021" },
    { pmid: "40247783", title: "A Comprehensive Review of Estradiol, Progesterone, Luteinizing Hormone, and Follicle-Stimulating Hormone in the Context of Laboratory Medicine to Support Women's Health", source: "Clinical chemistry", year: "2025" },
  ],
  fsh: [
    { pmid: "31127275", title: "Follicle-Stimulating Hormone Glycobiology", source: "Endocrinology", year: "2019" },
    { pmid: "34884539", title: "The Roles of Luteinizing Hormone, Follicle-Stimulating Hormone and Testosterone in Spermatogenesis and Folliculogenesis Revisited", source: "International journal of molecular sciences", year: "2021" },
  ],
  kisspeptin: [
    { pmid: "35837314", title: "The Role of Kisspeptin in the Control of the Hypothalamic-Pituitary-Gonadal Axis and Reproduction", source: "Frontiers in endocrinology", year: "2022" },
    { pmid: "26852256", title: "Pubertal development and regulation", source: "The lancet. Diabetes & endocrinology", year: "2016" },
  ],
  hcg: [
    { pmid: "35163303", title: "Human Chorionic Gonadotropin and Early Embryogenesis: Review", source: "International journal of molecular sciences", year: "2022" },
    { pmid: "37572838", title: "The association between human chorionic gonadotropin and adverse pregnancy outcomes: a systematic review and meta-analysis", source: "American journal of obstetrics and gynecology", year: "2024" },
  ],
  leptin: [
    { pmid: "34084149", title: "Leptin and Obesity: Role and Clinical Implication", source: "Frontiers in endocrinology", year: "2021" },
    { pmid: "29357132", title: "Leptin Function and Regulation", source: "Comprehensive Physiology", year: "2017" },
  ],
  adiponectin: [
    { pmid: "29978896", title: "Adiponectin Regulation and Function", source: "Comprehensive Physiology", year: "2018" },
    { pmid: "33411633", title: "Adiponectin, Leptin and Cardiovascular Disorders", source: "Circulation research", year: "2021" },
  ],
  pth: [
    { pmid: "34224692", title: "Parathyroid hormone and its related peptides in bone metabolism", source: "Biochemical pharmacology", year: "2021" },
    { pmid: "16423810", title: "Parathyroid hormone: past and present", source: "The Journal of endocrinology", year: "2005" },
  ],
  calcitonin: [
    { pmid: "29999768", title: "Calcitonin", source: "", year: "2006" },
    { pmid: "10519914", title: "Calcitonin", source: "Current medicinal chemistry", year: "1999" },
  ],
  pthrp: [
    { pmid: "35953108", title: "Parathyroid hormone-related protein (PTHrP) and malignancy", source: "Vitamins and hormones", year: "2022" },
    { pmid: "7495499", title: "Parathyroid hormone-related protein", source: "Critical reviews in clinical laboratory sciences", year: "1995" },
  ],
  anp: [
    { pmid: "33530911", title: "Atrial Natriuretic Peptide: Structure, Function, and Physiological Effects: A Narrative Review", source: "Current cardiology reviews", year: "2021" },
    { pmid: "32444692", title: "Cardiac natriuretic peptides", source: "Nature reviews. Cardiology", year: "2020" },
  ],
  bnp: [
    { pmid: "15948107", title: "NT-ProBNP: the mechanism behind the marker", source: "Journal of cardiac failure", year: "2005" },
    { pmid: "32444692", title: "Cardiac natriuretic peptides", source: "Nature reviews. Cardiology", year: "2020" },
  ],
  cnp: [
    { pmid: "8959763", title: "C-type natriuretic peptide", source: "Peptides", year: "1996" },
    { pmid: "33894277", title: "The natriuretic peptide system in heart failure: Diagnostic and therapeutic implications", source: "Pharmacology & therapeutics", year: "2021" },
  ],
  myostatin: [
    { pmid: "23517348", title: "Mechanisms regulating skeletal muscle growth and atrophy", source: "The FEBS journal", year: "2013" },
    { pmid: "34520530", title: "Myostatin/Activin Receptor Ligands in Muscle and the Development Status of Attenuating Drugs", source: "Endocrine reviews", year: "2022" },
  ],
  "activin-a": [
    { pmid: "33933900", title: "Principles of the activin receptor signaling pathway and its inhibition", source: "Cytokine & growth factor reviews", year: "2021" },
    { pmid: "34520530", title: "Myostatin/Activin Receptor Ligands in Muscle and the Development Status of Attenuating Drugs", source: "Endocrine reviews", year: "2022" },
  ],
  follistatin: [
    { pmid: "9785474", title: "Follistatin", source: "The international journal of biochemistry & cell biology", year: "1998" },
    { pmid: "37739334", title: "Follistatin and follistatin-like 3 in metabolic disorders", source: "Prostaglandins & other lipid mediators", year: "2023" },
  ],
  "thymosin-beta-4": [
    { pmid: "17468232", title: "beta-Thymosins", source: "Annals of the New York Academy of Sciences", year: "2007" },
    { pmid: "38994967", title: "Thymosin β(4) and β(10) Expression in Human Organs during Development: A Review", source: "Cells", year: "2024" },
  ],
  "ghk-cu": [
    { pmid: "29986520", title: "Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data", source: "International journal of molecular sciences", year: "2018" },
    { pmid: "39963574", title: "Topically applied GHK as an anti-wrinkle peptide: Advantages, problems and prospective", source: "BioImpacts : BI", year: "2025" },
  ],
  "bpc-157": [
    { pmid: "40005999", title: "Multifunctionality and Possible Medical Application of the BPC 157 Peptide-Literature and Patent Review", source: "Pharmaceuticals (Basel, Switzerland)", year: "2025" },
    { pmid: "30915550", title: "Gastric pentadecapeptide body protection compound BPC 157 and its role in accelerating musculoskeletal soft tissue healing", source: "Cell and tissue research", year: "2019" },
  ],
  "tb-500": [
    { pmid: "41966639", title: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance", source: "Sports medicine (Auckland, N.Z.)", year: "2026" },
    { pmid: "41476424", title: "Injectable Peptide Therapy: A Primer for Orthopaedic and Sports Medicine Physicians", source: "The American journal of sports medicine", year: "2026" },
  ],
  leuprolide: [
    { pmid: "1794035", title: "Leuprorelin. A review of its pharmacology and therapeutic use in prostatic disorders", source: "Drugs & aging", year: "1991" },
    { pmid: "12083977", title: "Clinical pharmacokinetics of depot leuprorelin", source: "Clinical pharmacokinetics", year: "2002" },
  ],
  goserelin: [
    { pmid: "31644049", title: "Goserelin", source: "", year: "2012" },
    { pmid: "35123662", title: "Aromatase inhibitors versus tamoxifen in premenopausal women with oestrogen receptor-positive early-stage breast cancer treated with ovarian suppression: a patient-level meta-analysis of 7030 women from four randomised trials", source: "The Lancet. Oncology", year: "2022" },
  ],
  cetrorelix: [
    { pmid: "10972520", title: "The LHRH antagonist cetrorelix: a review", source: "Human reproduction update", year: "2000" },
    { pmid: "9760679", title: "LHRH antagonists", source: "Pharmaceutical biotechnology", year: "1998" },
  ],
  octreotide: [
    { pmid: "37211679", title: "Octreotide and Octreotide-derived delivery systems", source: "Journal of drug targeting", year: "2023" },
    { pmid: "32121432", title: "Somatostatin Analogs in Clinical Practice: a Review", source: "International journal of molecular sciences", year: "2020" },
  ],
  lanreotide: [
    { pmid: "30899019", title: "Acromegaly", source: "Nature reviews. Disease primers", year: "2019" },
    { pmid: "32121432", title: "Somatostatin Analogs in Clinical Practice: a Review", source: "International journal of molecular sciences", year: "2020" },
  ],
  pasireotide: [
    { pmid: "28170483", title: "Diagnosis and Treatment of Pituitary Adenomas: A Review", source: "JAMA", year: "2017" },
    { pmid: "30899019", title: "Acromegaly", source: "Nature reviews. Disease primers", year: "2019" },
  ],
  "mots-c": [
    { pmid: "36761202", title: "MOTS-c: A promising mitochondrial-derived peptide for therapeutic exploitation", source: "Frontiers in endocrinology", year: "2023" },
    { pmid: "36233287", title: "MOTS-c, the Most Recent Mitochondrial Derived Peptide in Human Aging and Age-Related Diseases", source: "International journal of molecular sciences", year: "2022" },
  ],
  humanin: [
    { pmid: "37106758", title: "Humanin and Its Pathophysiological Roles in Aging: A Systematic Review", source: "Biology", year: "2023" },
    { pmid: "35432758", title: "Humanin and diabetes mellitus: A review of in vitro and in vivo studies", source: "World journal of diabetes", year: "2022" },
  ],
  epitalon: [
    { pmid: "40141333", title: "Overview of Epitalon-Highly Bioactive Pineal Tetrapeptide with Promising Properties", source: "International journal of molecular sciences", year: "2025" },
    { pmid: "12374906", title: "Peptides and Ageing", source: "Neuro endocrinology letters", year: "2002" },
  ],
  selank: [
    { pmid: "28745220", title: "Tuftsin - Properties and Analogs", source: "Current medicinal chemistry", year: "2017" },
  ],
};

export function referencesFor(slug: string): Reference[] {
  return REFERENCES[slug] ?? [];
}
