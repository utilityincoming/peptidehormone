// A glossary of peptide-science vocabulary — the concepts the monographs and
// insights lean on, defined once in plain language. It doubles as a semantic
// surface: each term is emitted as a schema.org DefinedTerm (see glossaryLd in
// lib/jsonld.ts), and every term that maps cleanly to a public concept carries a
// verified `sameAs` anchor into Wikipedia + Wikidata — the same knowledge-graph
// grounding the molecule monographs use (see lib/identifiers.ts).
//
// The Wikipedia titles + Wikidata QIDs here were verified to resolve to real,
// non-disambiguation articles (scripts note: en.wikipedia API, redirects
// followed). Definitions are ours — precise first, in the site's register — and
// describe concepts, not molecules (molecules live in the catalog).

export interface GlossaryTerm {
  /** Anchor id — the term is reachable at /glossary#<slug>. */
  slug: string;
  term: string;
  /** Short form / symbol, emitted as the DefinedTerm termCode. */
  abbr?: string;
  /** Synonyms a reader might search for. */
  aka?: string[];
  /** The definition. One to three sentences: accurate, then characterizing. */
  def: string;
  /** Verified English Wikipedia article title (for sameAs). */
  wikipedia?: string;
  /** Verified Wikidata entity id (for sameAs). */
  wikidata?: string;
  /** Where the concept lives on this site — one or two internal links. */
  see?: { label: string; href: string }[];
}

export interface GlossaryGroup {
  name: string;
  blurb: string;
  terms: GlossaryTerm[];
}

export const GLOSSARY: GlossaryGroup[] = [
  {
    name: "The molecules",
    blurb: "What these signals are made of.",
    terms: [
      {
        slug: "peptide",
        term: "Peptide",
        def: "A short chain of amino acids joined by peptide bonds — larger than a single amino acid, smaller than a full protein. Peptides are the body's signaling shorthand, and the molecules this reference is built around.",
        wikipedia: "Peptide",
        wikidata: "Q172847",
      },
      {
        slug: "peptide-hormone",
        term: "Peptide hormone",
        def: "A hormone that happens to be a peptide: a secreted amino-acid chain that carries a signal through the bloodstream from the tissue that makes it to the tissue that reads it.",
        wikipedia: "Peptide hormone",
        wikidata: "Q416997",
        see: [{ label: "Why peptides", href: "/why-peptides" }],
      },
      {
        slug: "amino-acid",
        term: "Amino acid",
        def: "The building block of every peptide and protein. Twenty standard amino acids, strung in a specific order, encode a peptide's identity, its fold, and what it does.",
        wikipedia: "Amino acid",
        wikidata: "Q8066",
      },
      {
        slug: "molecular-weight",
        term: "Molecular weight",
        abbr: "Da",
        aka: ["molar mass", "dalton"],
        def: "A molecule's mass, measured in daltons (Da). It quietly sorts this field: small signaling peptides run a few thousand daltons, glycoprotein hormones tens of thousands.",
        wikipedia: "Molecular mass",
        wikidata: "Q182854",
        see: [{ label: "Compare molecules", href: "/tools/compare" }],
      },
      {
        slug: "prohormone",
        term: "Prohormone",
        aka: ["preprohormone", "precursor"],
        def: "The larger, inactive precursor a peptide hormone is minted as, then cleaved from. Proglucagon is cut into GLP-1 and glucagon; POMC into α-MSH and ACTH.",
        wikipedia: "Prohormone",
        wikidata: "Q419119",
        see: [{ label: "GLP-1", href: "/hormones/glp-1" }],
      },
    ],
  },
  {
    name: "Families in this catalog",
    blurb: "The signaling groups the reference is organized around.",
    terms: [
      {
        slug: "incretin",
        term: "Incretin",
        def: "A gut hormone released after a meal that amplifies glucose-dependent insulin release — GLP-1 and GIP are the two. The name fuses intestine and insulin.",
        wikipedia: "Incretin",
        wikidata: "Q1420402",
        see: [{ label: "Incretins & metabolic", href: "/families/incretins-metabolic" }],
      },
      {
        slug: "neuropeptide",
        term: "Neuropeptide",
        def: "A peptide that neurons use to signal — as a neurotransmitter or a slower-acting neuromodulator. Oxytocin and vasopressin are the classic examples.",
        wikipedia: "Neuropeptide",
        wikidata: "Q419968",
        see: [{ label: "Neuropeptides", href: "/families/neuropeptides" }],
      },
      {
        slug: "melanocortin",
        term: "Melanocortin",
        def: "A family of peptides cleaved from the POMC precursor — α-MSH and ACTH among them — that act at melanocortin receptors to govern pigmentation, appetite, and the stress axis.",
        wikipedia: "Melanocortin",
        wikidata: "Q6591465",
        see: [{ label: "Melanocortins", href: "/families/melanocortins" }],
      },
      {
        slug: "natriuretic-peptide",
        term: "Natriuretic peptide",
        def: "Heart- and vessel-derived peptides (ANP, BNP, CNP) that lower blood pressure by driving sodium and water excretion — the body's counter to fluid overload.",
        wikipedia: "Natriuretic peptide",
        wikidata: "Q1571529",
        see: [{ label: "Cardiovascular & natriuretic", href: "/families/cardiovascular" }],
      },
    ],
  },
  {
    name: "Receptors & signaling",
    blurb: "How a peptide's message is received and relayed inside the cell.",
    terms: [
      {
        slug: "receptor",
        term: "Receptor",
        def: "A protein — usually anchored in the cell membrane — that recognizes one specific signaling molecule and converts its arrival into an action inside the cell. A hormone is only as specific as the receptor that reads it.",
        wikipedia: "Receptor (biochemistry)",
        wikidata: "Q208467",
      },
      {
        slug: "ligand",
        term: "Ligand",
        def: "Any molecule that binds a receptor: the key to its lock. A native hormone, a drug, and a blocker can all be ligands for the same receptor.",
        wikipedia: "Ligand (biochemistry)",
        wikidata: "Q899107",
      },
      {
        slug: "gpcr",
        term: "G protein-coupled receptor",
        abbr: "GPCR",
        def: "The largest family of cell-surface receptors and the target of most peptide hormones: a seven-pass membrane protein that, on binding its ligand, activates an intracellular G protein to relay the message.",
        wikipedia: "G protein-coupled receptor",
        wikidata: "Q38173",
      },
      {
        slug: "class-b-gpcr",
        term: "Class B GPCR",
        aka: ["secretin-family receptor"],
        def: "The GPCR branch most peptide hormones dock into. A large extracellular domain grips the peptide like a catcher's mitt — the feature that long made these receptors hard to switch on with a small-molecule pill.",
        wikipedia: "Secretin receptor family",
        wikidata: "Q7444439",
        see: [{ label: "Putting GLP-1 in a pill", href: "/insights/glp-1-in-a-pill" }],
      },
      {
        slug: "second-messenger",
        term: "Second messenger",
        def: "An intracellular signal generated the moment a receptor fires, carrying the message from the membrane inward to the machinery that acts on it.",
        wikipedia: "Second messenger system",
        wikidata: "Q899814",
      },
      {
        slug: "cyclic-amp",
        term: "Cyclic AMP",
        abbr: "cAMP",
        def: "The prototypical second messenger — a small molecule that surges inside a cell when a stimulatory GPCR switches on, activating the kinases that carry out the response.",
        wikipedia: "Cyclic adenosine monophosphate",
        wikidata: "Q210041",
        see: [{ label: "GLP-1 signaling", href: "/insights/glp-1-signaling" }],
      },
      {
        slug: "desensitization",
        term: "Desensitization",
        def: "The tuning-out that follows sustained stimulation: the receptor is uncoupled or pulled inside the cell, so the same signal yields a smaller response. Why continuous agonism can, in time, resemble blockade.",
        wikipedia: "Desensitization (medicine)",
        wikidata: "Q3493547",
        see: [{ label: "The GIP paradox", href: "/insights/the-gip-paradox" }],
      },
      {
        slug: "biased-agonism",
        term: "Biased agonism",
        aka: ["functional selectivity"],
        def: "When a ligand switches a receptor on toward some downstream pathways but not others — the same receptor, a selectively edited message.",
        wikipedia: "Functional selectivity",
        wikidata: "Q1258877",
      },
    ],
  },
  {
    name: "How a molecule acts",
    blurb: "The pharmacology of switching a receptor on, off, or part-way.",
    terms: [
      {
        slug: "agonist",
        term: "Agonist",
        def: "A molecule that binds a receptor and switches it on — pharmacology's active voice, standing in for the body's own signal. Most peptide therapeutics here are receptor agonists.",
        wikipedia: "Agonist",
        wikidata: "Q389934",
      },
      {
        slug: "antagonist",
        term: "Antagonist",
        def: "A molecule that occupies a receptor and blocks it, muting the signal rather than sending it.",
        wikipedia: "Receptor antagonist",
        wikidata: "Q410943",
      },
      {
        slug: "partial-agonist",
        term: "Partial agonist",
        def: "A ligand that turns a receptor on only part-way, even when every receptor is occupied — a deliberately quieter signal than a full agonist's.",
        wikipedia: "Partial agonist",
        wikidata: "Q770260",
      },
      {
        slug: "co-agonist",
        term: "Co-agonist",
        aka: ["dual agonist", "multi-agonist"],
        def: "A single engineered molecule that activates two or more receptors at once — the design behind tirzepatide (GIP + GLP-1) and the triple agonists.",
        see: [
          { label: "The triple agonist", href: "/insights/the-triple-agonist" },
          { label: "Tirzepatide", href: "/hormones/tirzepatide" },
        ],
      },
      {
        slug: "secretagogue",
        term: "Secretagogue",
        def: "A compound that prompts a gland to secrete. A growth-hormone secretagogue, for instance, makes the pituitary release its own GH rather than supplying it from outside.",
        wikipedia: "Secretagogue",
        wikidata: "Q3510429",
        see: [{ label: "Ipamorelin", href: "/hormones/ipamorelin" }],
      },
      {
        slug: "receptor-selectivity",
        term: "Receptor selectivity",
        def: "How narrowly a molecule acts on its intended receptor versus its close relatives. Leaky selectivity is why blocking one TGF-β ligand can spill onto its cousins.",
        see: [{ label: "One receptor, a whole family", href: "/insights/one-receptor-a-whole-family" }],
      },
    ],
  },
  {
    name: "How long it lasts",
    blurb: "Pharmacokinetics — the clock every engineered analog is fighting.",
    terms: [
      {
        slug: "pharmacokinetics",
        term: "Pharmacokinetics",
        abbr: "PK",
        def: "What the body does to a molecule over time — absorption, distribution, and clearance — as distinct from what the molecule does to the body.",
        wikipedia: "Pharmacokinetics",
        wikidata: "Q323936",
        see: [{ label: "Half-life calculator", href: "/tools/half-life" }],
      },
      {
        slug: "half-life",
        term: "Half-life",
        abbr: "t½",
        def: "The time for the amount of a molecule in the body to fall by half. Native peptide hormones are often measured in minutes; engineered analogs stretch that to days.",
        wikipedia: "Biological half-life",
        wikidata: "Q686886",
        see: [
          { label: "Half-life calculator", href: "/tools/half-life" },
          { label: "Two minutes to seven days", href: "/insights/peptide-half-life-engineering" },
        ],
      },
      {
        slug: "dpp-4",
        term: "DPP-4",
        aka: ["dipeptidyl peptidase-4"],
        def: "The enzyme that clips and inactivates incretins like GLP-1 within minutes — the clearance route that protease-resistant analogs are built to evade.",
        wikipedia: "Dipeptidyl peptidase-4",
        wikidata: "Q412214",
        see: [{ label: "GLP-1", href: "/hormones/glp-1" }],
      },
      {
        slug: "bioavailability",
        term: "Bioavailability",
        def: "The fraction of an administered dose that actually reaches circulation intact. Oral peptides fare famously badly — around 1% for oral semaglutide — which is why most are injected.",
        wikipedia: "Bioavailability",
        wikidata: "Q461809",
        see: [{ label: "Putting GLP-1 in a pill", href: "/insights/glp-1-in-a-pill" }],
      },
      {
        slug: "steady-state",
        term: "Steady state",
        def: "The plateau reached when each dose replaces roughly what has cleared since the last, so peaks and troughs stop drifting upward.",
        see: [{ label: "Half-life calculator", href: "/tools/half-life" }],
      },
      {
        slug: "acylation",
        term: "Acylation",
        aka: ["lipidation", "fatty-acid acylation"],
        def: "Attaching a fatty-acid chain to a peptide so it clings to albumin in the blood — turning a molecule cleared in minutes into one that lasts days. The trick behind liraglutide and semaglutide.",
        see: [{ label: "Two minutes to seven days", href: "/insights/peptide-half-life-engineering" }],
      },
      {
        slug: "albumin",
        term: "Albumin",
        def: "The most abundant protein in blood plasma. The body reclaims it slowly, so a drug engineered to grip albumin borrows that long life.",
        wikipedia: "Serum albumin",
        wikidata: "Q424232",
      },
      {
        slug: "protease-resistance",
        term: "Protease resistance",
        def: "An engineered peptide's ability to withstand the enzymes that chop peptides apart — usually bought by substituting unnatural amino acids at the cleavage sites.",
        see: [{ label: "Two minutes to seven days", href: "/insights/peptide-half-life-engineering" }],
      },
      {
        slug: "subcutaneous",
        term: "Subcutaneous",
        abbr: "SC",
        def: "Beneath the skin — the injection route most peptide therapeutics take, into the fat layer they then absorb from steadily.",
        wikipedia: "Subcutaneous administration",
        wikidata: "Q2035485",
      },
    ],
  },
  {
    name: "Reading this reference",
    blurb: "The labels the catalog uses, and what they promise.",
    terms: [
      {
        slug: "endogenous",
        term: "Endogenous",
        def: "Produced within the body itself. Here, the native hormones against which every engineered analog is measured.",
        see: [{ label: "Methodology", href: "/methodology" }],
      },
      {
        slug: "analog",
        term: "Analog",
        aka: ["analogue"],
        def: "An engineered molecule built on an endogenous hormone and tuned for potency, half-life, or receptor selectivity. Semaglutide is a GLP-1 analog.",
        see: [{ label: "Methodology", href: "/methodology" }],
      },
      {
        slug: "research-peptide",
        term: "Research peptide",
        def: "A community-circulated peptide outside the approved-drug system, where the evidence is often thinnest and the claims loudest. This reference grades them, and says so.",
        see: [{ label: "Methodology", href: "/methodology" }],
      },
      {
        slug: "evidence-tier",
        term: "Evidence tier",
        aka: ["the Standard"],
        def: "This reference's rigor badge — a five-rung grade from Established to Limited marking the weight of evidence behind a molecule, kept separate from how promising it is.",
        see: [{ label: "The Standard", href: "/methodology" }],
      },
    ],
  },
];

/** Flat list of every term, in group order. */
export const ALL_TERMS: GlossaryTerm[] = GLOSSARY.flatMap((g) => g.terms);

/** Authoritative entity URLs for a term's sameAs (Wikipedia + Wikidata), verified. */
export function termSameAs(t: GlossaryTerm): string[] {
  const out: string[] = [];
  if (t.wikipedia) out.push(`https://en.wikipedia.org/wiki/${encodeURIComponent(t.wikipedia.replace(/ /g, "_"))}`);
  if (t.wikidata) out.push(`https://www.wikidata.org/wiki/${t.wikidata}`);
  return out;
}
