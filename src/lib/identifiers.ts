// External identifiers for catalog molecules — the knowledge-graph anchor layer.
// Each molecule's ChemicalSubstance JSON-LD emits these as `sameAs` (authoritative
// entity URLs) and `identifier` (typed PropertyValues), so answer engines and
// Google's Knowledge Graph can resolve a page's subject to a known entity and cite
// it — the semantic-search grounding behind "sourced, not asserted."
//
// GENERATED, then hand-verified. `node scripts/fetch-identifiers.mjs --audit`
// proposes matches from Wikidata + PubChem; `--build <audit.json>` applies the
// verified corrections in that script and rewrites this file. Every id was checked
// against PubChem CID->title and UniProt organism so nothing links to the wrong
// entity or species (a wrong sameAs is worse than none). Molecules with no reliable
// public record are intentionally absent. Guard: `--check` HEADs every URL here.
// Nothing in this file is fabricated.
export interface ExternalIds {
  /** English Wikipedia article title. */
  wikipedia?: string;
  /** Wikidata entity id (Q-number). */
  wikidata?: string;
  /** PubChem Compound id (CID). */
  pubchem?: string;
  /** DrugBank accession. */
  drugbank?: string;
  /** ChEBI numeric id. */
  chebi?: string;
  /** UniProt accession (human, reviewed). */
  uniprot?: string;
  /** ChEMBL id. */
  chembl?: string;
  /** CAS Registry Number. */
  cas?: string;
}

// slug -> verified external identifiers. Catalog order. 72 of 73 molecules.
export const IDENTIFIERS: Record<string, ExternalIds> = {
  "glp-1": { wikipedia: "Glucagon-like peptide-1", wikidata: "Q424611", pubchem: "16133831", chebi: "80270" },
  "gip": { wikipedia: "Gastric inhibitory polypeptide", wikidata: "Q22677256", uniprot: "P09681" },
  "glucagon": { wikipedia: "Glucagon", wikidata: "Q170617", pubchem: "16186314", drugbank: "DB00040", chebi: "5391", chembl: "CHEMBL266481", cas: "9007-92-5" },
  "amylin": { wikipedia: "Amylin", wikidata: "Q424643", pubchem: "16132430", uniprot: "P10997" },
  "insulin": { wikipedia: "Insulin", wikidata: "Q50265665", pubchem: "118984375", drugbank: "DB00030", chebi: "5931", cas: "11061-68-0" },
  "semaglutide": { wikipedia: "Semaglutide", wikidata: "Q27261089", pubchem: "56843331", drugbank: "DB13928", chebi: "167574", chembl: "CHEMBL3616752", cas: "910463-68-2" },
  "tirzepatide": { wikipedia: "Tirzepatide", wikidata: "Q108324770", pubchem: "156588324", drugbank: "DB15171", chembl: "CHEMBL4297839", cas: "2023788-19-2" },
  "liraglutide": { wikipedia: "Liraglutide", wikidata: "Q2526479", pubchem: "16134956", drugbank: "DB06655", chebi: "71193", chembl: "CHEMBL1201866", cas: "204656-20-2" },
  "exenatide": { wikipedia: "Exenatide", wikidata: "Q417762", pubchem: "45588096", drugbank: "DB01276", chebi: "64073", chembl: "CHEMBL414357", cas: "141758-74-9" },
  "retatrutide": { wikipedia: "Retatrutide", wikidata: "Q120468350", chembl: "CHEMBL5095485", cas: "2381089-83-2" },
  "pramlintide": { wikipedia: "Pramlintide", wikidata: "Q2062094", pubchem: "70691388", drugbank: "DB01278", chebi: "135922", chembl: "CHEMBL2103758", cas: "151126-32-8" },
  "cagrilintide": { wikipedia: "Cagrilintide", wikidata: "Q123428019", pubchem: "171397054", cas: "1415456-99-3" },
  "amycretin": { wikipedia: "Amycretin", wikidata: "Q124767680" },
  "maridebart-cafraglutide": { wikipedia: "Maridebart cafraglutide", wikidata: "Q123448921", cas: "2760218-55-9" },
  "growth-hormone": { wikipedia: "Growth hormone", wikidata: "Q29956617", pubchem: "170907453", chebi: "37845", cas: "9002-72-6" },
  "igf-1": { wikipedia: "Insulin-like growth factor 1", wikidata: "Q12791246", uniprot: "P05019" },
  "igf-2": { wikipedia: "Insulin-like growth factor 2", wikidata: "Q14874349", uniprot: "P01344" },
  "mgf": { wikipedia: "Mechano growth factor", wikidata: "Q3853485" },
  "igf-1-lr3": { wikipedia: "IGF-1 LR3", wikidata: "Q20707573", cas: "946870-92-4" },
  "ghrh": { wikipedia: "Growth hormone–releasing hormone", wikidata: "Q409489", pubchem: "44134750", uniprot: "P01286" },
  "ghrelin": { wikipedia: "Ghrelin", wikidata: "Q422269", pubchem: "16133832", chebi: "75431", chembl: "CHEMBL425281", cas: "304853-26-7" },
  "somatostatin": { wikidata: "Q22075835", pubchem: "16129706", drugbank: "DB09099", chebi: "64628", chembl: "CHEMBL1823872", cas: "38916-34-6" },
  "alpha-msh": { wikipedia: "Α-Melanocyte-stimulating hormone", wikidata: "Q4063639", pubchem: "44273719", chebi: "195325", chembl: "CHEMBL214332", cas: "581-05-5" },
  "acth": { wikipedia: "Adrenocorticotropic hormone", wikidata: "Q185690", pubchem: "16132265", drugbank: "DB01285", chebi: "3892", chembl: "CHEMBL1201610", cas: "12427-33-7" },
  "oxytocin": { wikipedia: "Oxytocin", wikidata: "Q169960", pubchem: "439302", chebi: "7872", chembl: "CHEMBL395429", cas: "50-56-6" },
  "vasopressin": { wikipedia: "Vasopressin", wikidata: "Q21124841", pubchem: "644077", chebi: "34543", uniprot: "P01185" },
  "crh": { wikipedia: "Corticotropin-releasing hormone", wikidata: "Q386664", uniprot: "P06850", cas: "9015-71-8" },
  "trh": { wikipedia: "Thyrotropin-releasing hormone", wikidata: "Q12910980", pubchem: "638678", drugbank: "DB09421", chebi: "35940", chembl: "CHEMBL1472", cas: "24305-27-9" },
  "pyy": { wikipedia: "Peptide YY", wikidata: "Q290293", pubchem: "56841989", uniprot: "P10082" },
  "cck": { wikipedia: "Cholecystokinin", wikidata: "Q60315441", pubchem: "16129670", uniprot: "P06307" },
  "secretin": { wikipedia: "Secretin", wikidata: "Q422301", pubchem: "71306891", drugbank: "DB00021", chebi: "135913", chembl: "CHEMBL1201488", cas: "108153-74-8" },
  "motilin": { wikipedia: "Motilin", wikidata: "Q126440", pubchem: "16136567", chembl: "CHEMBL525634", cas: "52906-92-0" },
  "gnrh": { wikidata: "Q27077828", pubchem: "16132914" },
  "lh": { wikipedia: "Luteinizing hormone", wikidata: "Q50265477", drugbank: "DB14741", chebi: "81568", cas: "9002-67-9" },
  "fsh": { wikipedia: "Follicle-stimulating hormone", wikidata: "Q200774", chebi: "81569", cas: "9002-68-0" },
  "kisspeptin": { wikipedia: "Kisspeptin", wikidata: "Q909371", pubchem: "71306396", uniprot: "Q15726" },
  "hcg": { wikipedia: "Human chorionic gonadotropin", wikidata: "Q407172", drugbank: "DB09126", chebi: "81570", chembl: "CHEMBL1201464", cas: "9002-61-3" },
  "leptin": { wikipedia: "Leptin", wikidata: "Q223739", pubchem: "157010069", uniprot: "P41159" },
  "adiponectin": { wikipedia: "Adiponectin", wikidata: "Q357439", uniprot: "Q15848" },
  "pth": { wikipedia: "Parathyroid hormone", wikidata: "Q202476", uniprot: "P01270" },
  "calcitonin": { wikipedia: "Calcitonin", wikidata: "Q315860", chebi: "3306", chembl: "CHEMBL1201614", cas: "9007-12-9" },
  "pthrp": { wikipedia: "Parathyroid hormone-related protein", wikidata: "Q2007821", uniprot: "P12272" },
  "anp": { wikipedia: "Atrial natriuretic peptide", wikidata: "Q78185357", drugbank: "DB15591", chebi: "80233", chembl: "CHEMBL2104386", cas: "85637-73-6" },
  "bnp": { wikipedia: "Brain natriuretic peptide 32", wikidata: "Q66360952", chebi: "80234", chembl: "CHEMBL1201668", cas: "114471-18-0" },
  "cnp": { wikidata: "Q78190979", pubchem: "16179407", chebi: "80235", cas: "127869-51-6" },
  "myostatin": { wikipedia: "Myostatin", wikidata: "Q29630", uniprot: "O14793" },
  "activin-a": { wikidata: "Q21107468", uniprot: "P08476" },
  "follistatin": { wikipedia: "Follistatin", wikidata: "Q408122", uniprot: "P19883" },
  "thymosin-beta-4": { wikipedia: "Thymosin beta-4", wikidata: "Q7799643", uniprot: "P62328" },
  "ghk-cu": { wikipedia: "Copper peptide GHK-Cu", wikidata: "Q5168796", pubchem: "71587328", drugbank: "DB14683", cas: "49557-75-7" },
  "bpc-157": { wikipedia: "BPC-157", wikidata: "Q27270252", pubchem: "9941957", drugbank: "DB11882", cas: "137525-51-0" },
  "tb-500": { wikipedia: "TB-500", wikidata: "Q137400007", pubchem: "62707662" },
  "leuprolide": { wikipedia: "Leuprorelin", wikidata: "Q907160", pubchem: "657181", drugbank: "DB00007", chebi: "6427", chembl: "CHEMBL1201199", cas: "53714-56-0" },
  "goserelin": { wikipedia: "Goserelin", wikidata: "Q1992653", pubchem: "5311128", drugbank: "DB00014", chebi: "5523", chembl: "CHEMBL1201247", cas: "65807-02-5" },
  "cetrorelix": { wikipedia: "Cetrorelix", wikidata: "Q5065704", pubchem: "25074887", drugbank: "DB00050", chebi: "59224", chembl: "CHEMBL1200490", cas: "120287-85-6" },
  "octreotide": { wikipedia: "Octreotide", wikidata: "Q419935", pubchem: "448601", drugbank: "DB00104", chebi: "7726", cas: "83150-76-9" },
  "lanreotide": { wikipedia: "Lanreotide", wikidata: "Q1707877", pubchem: "6918011", drugbank: "DB06791", chembl: "CHEMBL1201185", cas: "108736-35-2" },
  "pasireotide": { wikipedia: "Pasireotide", wikidata: "Q3896970", pubchem: "9941444", drugbank: "DB06663", chebi: "72312", chembl: "CHEMBL3349607", cas: "396091-73-9" },
  "tesamorelin": { wikipedia: "Tesamorelin", wikidata: "Q7705415", pubchem: "16137828", drugbank: "DB08869", chebi: "63626", chembl: "CHEMBL1237026", cas: "218949-48-5" },
  "cjc-1295": { wikipedia: "CJC-1295", wikidata: "Q5012018", pubchem: "56841945", cas: "863288-34-0" },
  "sermorelin": { wikipedia: "Sermorelin", wikidata: "Q7455005", pubchem: "16132413", chebi: "9118", chembl: "CHEMBL428135", cas: "86168-78-7" },
  "ipamorelin": { wikipedia: "Ipamorelin", wikidata: "Q20707829", pubchem: "20754357", drugbank: "DB12370", cas: "170851-70-4" },
  "pt-141": { wikipedia: "Bremelanotide", wikidata: "Q415353", pubchem: "9941379", drugbank: "DB11653", chebi: "177849", chembl: "CHEMBL2070241", cas: "189691-06-3" },
  "mots-c": { wikipedia: "MOTS-c", wikidata: "Q56377357", pubchem: "146675088" },
  "humanin": { wikidata: "Q27077999", pubchem: "16131438", cas: "330936-69-1" },
  "epitalon": { wikipedia: "Epitalon", wikidata: "Q27285389", pubchem: "219042", drugbank: "DB17882", chebi: "230091", cas: "307297-39-8" },
  "selank": { wikipedia: "Selank", wikidata: "Q5810370", pubchem: "11765600" },
  "ss-31": { wikipedia: "Elamipretide", wikidata: "Q27269822", pubchem: "11764719", drugbank: "DB11981", chebi: "233331", cas: "736992-21-5" },
  "aod-9604": { wikidata: "Q72443552", pubchem: "71300630", drugbank: "DB06388", cas: "221231-10-3" },
  "dsip": { wikipedia: "Delta-sleep-inducing peptide", wikidata: "Q5254800", pubchem: "68816" },
  "semax": { wikipedia: "Semax", wikidata: "Q4415058", pubchem: "122178", cas: "80714-61-0" },
  "ara-290": { wikipedia: "Cibinetide", wikidata: "Q27273306", pubchem: "91810664", drugbank: "DB13006", chembl: "CHEMBL3545305", cas: "1208243-50-8" },
};

const LABELS: Record<keyof ExternalIds, string> = {
  wikipedia: "Wikipedia",
  wikidata: "Wikidata",
  pubchem: "PubChem",
  drugbank: "DrugBank",
  chebi: "ChEBI",
  uniprot: "UniProt",
  chembl: "ChEMBL",
  cas: "CAS",
};

// schema.org identifier propertyID for the typed `identifier` PropertyValue nodes.
const PROPERTY_ID: Partial<Record<keyof ExternalIds, string>> = {
  pubchem: "PubChem CID",
  drugbank: "DrugBank",
  chebi: "ChEBI",
  uniprot: "UniProt",
  chembl: "ChEMBL",
  cas: "CAS Registry Number",
};

function urlFor(key: keyof ExternalIds, value: string): string {
  switch (key) {
    case "wikipedia":
      return `https://en.wikipedia.org/wiki/${encodeURIComponent(value.replace(/ /g, "_"))}`;
    case "wikidata":
      return `https://www.wikidata.org/wiki/${value}`;
    case "pubchem":
      return `https://pubchem.ncbi.nlm.nih.gov/compound/${value}`;
    case "drugbank":
      return `https://go.drugbank.com/drugs/${value}`;
    case "chebi":
      return `https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:${value}`;
    case "uniprot":
      return `https://www.uniprot.org/uniprotkb/${value}`;
    case "chembl":
      return `https://www.ebi.ac.uk/chembl/compound_report_card/${value}/`;
    case "cas":
      return `https://commonchemistry.cas.org/detail?cas_rn=${value}`;
  }
}

export interface ExternalRef {
  key: keyof ExternalIds;
  label: string;
  value: string;
  url: string;
}

/** All external references for a molecule, in display order (for the visible UI). */
export function externalRefs(slug: string): ExternalRef[] {
  const ids = IDENTIFIERS[slug];
  if (!ids) return [];
  return (Object.keys(LABELS) as (keyof ExternalIds)[])
    .filter((k) => ids[k])
    .map((k) => ({ key: k, label: LABELS[k], value: ids[k]!, url: urlFor(k, ids[k]!) }));
}

/** Authoritative entity URLs for JSON-LD `sameAs` — every reference is a canonical page. */
export function sameAsUrls(slug: string): string[] {
  return externalRefs(slug).map((r) => r.url);
}

/** Typed identifiers for JSON-LD `identifier` (schema.org PropertyValue). */
export function identifierProps(slug: string): { "@type": "PropertyValue"; propertyID: string; value: string }[] {
  const ids = IDENTIFIERS[slug];
  if (!ids) return [];
  return (Object.keys(PROPERTY_ID) as (keyof ExternalIds)[])
    .filter((k) => ids[k])
    .map((k) => ({ "@type": "PropertyValue" as const, propertyID: PROPERTY_ID[k]!, value: ids[k]! }));
}
