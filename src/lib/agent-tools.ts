// Grounding tools for the research agent. Each tool queries a free public
// database (no API key) so the model can verify factual claims instead of
// recalling them. Every executor has a hard timeout and truncates its output
// so a slow or oversized upstream response cannot stall the request or blow up
// model context / cost.

export interface AgentTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

// Descriptions are prescriptive about WHEN to call — recent models reach for
// tools conservatively, so the trigger condition lives in each description.
export const AGENT_TOOLS: AgentTool[] = [
  {
    name: "search_pubchem",
    description:
      "Look up a chemical compound or peptide in PubChem to confirm its identity and physicochemical properties (PubChem CID, molecular formula, molecular weight, IUPAC name, SMILES). Call this whenever the user asks about a specific named compound and you are about to state its formula, weight, or chemical identity — verify with this tool rather than recalling values from memory.",
    input_schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: 'Compound or peptide name to search, e.g. "semaglutide" or "oxytocin".',
        },
      },
      required: ["name"],
    },
  },
  {
    name: "search_clinical_trials",
    description:
      "Search ClinicalTrials.gov for registered human clinical trials by compound name or condition, including arm/intervention descriptions and eligibility/population. Call this before stating clinical-trial facts or describing studied dosing, routes, schedules, or populations. Report numeric doses only when explicitly present in returned source text, with the NCT citation and study population. Registry protocols are not proof of efficacy or treatment recommendations; missing or truncated details must not be inferred.",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search term: compound name, condition, or intervention.",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "search_pubmed",
    description:
      "Search PubMed for published literature with abstracts retrieved from matching Europe PMC PubMed records. Call this before asserting published evidence or describing studied dosing. Report numeric doses, routes, schedules, and populations only when explicitly present in returned source text, with the PMID citation; metadata alone cannot support dosing claims. Abstracts may retain source markup. Research regimens are not treatment recommendations. Missing, unavailable, or truncated abstracts are not evidence of no research, and missing details must not be inferred.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Literature search query." },
      },
      required: ["query"],
    },
  },
  {
    name: "search_uniprot",
    description:
      'Look up a PROTEIN or biologic in UniProt to confirm its identity, function, gene, organism, and amino-acid sequence/length. Use this for entities that have a protein record rather than a small-molecule PubChem CID: endogenous peptide hormones (insulin, GLP-1, oxytocin, GnRH), receptors, growth factors (EGF, FGF, IGF-1), and gene products. Prefer this over search_pubchem when the subject is a gene/protein/hormone/receptor, and prefer it over recalling a sequence, length, or molecular function from memory.',
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: 'Protein, gene, or biologic name, e.g. "proglucagon", "GLP-1 receptor", "oxytocin".',
        },
      },
      required: ["query"],
    },
  },
  {
    name: "search_drug_label",
    description:
      "Look up current US prescribing labels (FDA SPL via openFDA / DailyMed) for an approved drug by generic or brand name. Call this before stating that a product is approved or reporting label dosing, titration, route, indication, or boxed warnings. Report numeric doses only when explicitly present in the returned source text, with the set id and DailyMed link, and only for that named product, indication, and US label. A label is not a treatment recommendation. No matching label means approval and label dosing could not be verified — do not infer them.",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: 'Generic or brand name, e.g. "semaglutide" or "Wegovy".',
        },
      },
      required: ["query"],
    },
  },
];

const TOOL_TIMEOUT_MS = 8000;
const MAX_TOOL_RESULT_CHARS = 6000;

function truncate(s: string, max = MAX_TOOL_RESULT_CHARS): string {
  if (s.length <= max) return s;
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(s);
  } catch {
    return s.slice(0, max - 13) + "…[truncated]";
  }
  // Remove whole lower-ranked results before clipping evidence. Never slice
  // serialized JSON: escaping and closing delimiters must remain intact.
  data.truncated = true;
  data.warning = "Partial evidence: records or text omitted. Consult the cited source for the complete regimen and population; do not extrapolate missing details.";
  const resultKey = ["studies", "articles", "entries", "labels"].find((key) => Array.isArray(data[key]));
  if (resultKey) {
    const results = data[resultKey] as unknown[];
    const originalCount = results.length;
    data.omittedResults = 0;
    while (results.length > 1 && JSON.stringify(data).length > max) {
      results.pop();
      data.count = results.length;
      data.omittedResults = originalCount - results.length;
    }
  }
  if (JSON.stringify(data).length <= max) return JSON.stringify(data);

  function clip(value: unknown, textLimit: number, arrayLimit: number, key = ""): unknown {
    if (typeof value === "string") {
      // Citation identifiers/URLs must not be rewritten into broken references.
      if (["url", "pmid", "nctId", "accession", "setId", "source", "warning"].includes(key) || value.length <= textLimit) return value;
      const prefix = value.slice(0, textLimit);
      // Prefer complete sentences, avoiding a cut in a decimal dose or unit.
      const sentenceEnd = [...prefix.matchAll(/[.!?](?=\s)/g)].at(-1)?.index;
      return prefix.slice(0, sentenceEnd === undefined ? (prefix.lastIndexOf(" ") > 0 ? prefix.lastIndexOf(" ") : 0) : sentenceEnd + 1) + " …[truncated]";
    }
    if (Array.isArray(value)) return value.slice(0, arrayLimit).map((item) => clip(item, textLimit, arrayLimit));
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, clip(v, textLimit, arrayLimit, k)]));
    }
    return value;
  }
  for (const [textLimit, arrayLimit] of [[2000, 8], [1000, 4], [500, 2], [250, 1], [100, 1]]) {
    const bounded = JSON.stringify(clip(data, textLimit, arrayLimit));
    if (bounded.length <= max) return bounded;
  }
  // Defensive fallback for malformed upstream objects with excessive keys.
  return JSON.stringify({ truncated: true, warning: "Upstream evidence too large to return safely. Narrow the search or consult the source directly." });
}

async function fetchJson(url: string): Promise<unknown> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TOOL_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Narrow helper: read a nested path defensively from an unknown JSON value.
function pick(obj: unknown, ...keys: (string | number)[]): unknown {
  let cur: unknown = obj;
  for (const k of keys) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string | number, unknown>)[k];
  }
  return cur;
}

async function searchPubchem(name: string): Promise<string> {
  const enc = encodeURIComponent(name);
  const cidData = await fetchJson(
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${enc}/cids/JSON`,
  );
  const cid = pick(cidData, "IdentifierList", "CID", 0);
  if (cid == null) return `No PubChem compound found for "${name}".`;
  const props = await fetchJson(
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/MolecularFormula,MolecularWeight,IUPACName,CanonicalSMILES/JSON`,
  );
  const p = pick(props, "PropertyTable", "Properties", 0) as Record<string, unknown> | undefined;
  return JSON.stringify({
    source: "PubChem",
    cid,
    molecularFormula: p?.MolecularFormula ?? null,
    molecularWeight: p?.MolecularWeight ?? null,
    iupacName: p?.IUPACName ?? null,
    smiles: p?.CanonicalSMILES ?? null,
    url: `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`,
  });
}

async function searchTrials(query: string): Promise<string> {
  const enc = encodeURIComponent(query);
  const data = await fetchJson(
    `https://clinicaltrials.gov/api/v2/studies?query.term=${enc}&pageSize=5`,
  );
  const raw = pick(data, "studies");
  const studies = Array.isArray(raw)
    ? raw.slice(0, 5).map((s) => {
        const nctId = (pick(s, "protocolSection", "identificationModule", "nctId") as string) ?? null;
        return {
          nctId,
          title: pick(s, "protocolSection", "identificationModule", "briefTitle") ?? null,
          status: pick(s, "protocolSection", "statusModule", "overallStatus") ?? null,
          phases: pick(s, "protocolSection", "designModule", "phases") ?? null,
          conditions: pick(s, "protocolSection", "conditionsModule", "conditions") ?? null,
          studyType: pick(s, "protocolSection", "designModule", "studyType") ?? null,
          enrollment: pick(s, "protocolSection", "designModule", "enrollmentInfo") ?? null,
          // Source descriptions, not inferred doses or treatment recommendations.
          armGroups: pick(s, "protocolSection", "armsInterventionsModule", "armGroups") ?? [],
          interventions: pick(s, "protocolSection", "armsInterventionsModule", "interventions") ?? [],
          eligibility: pick(s, "protocolSection", "eligibilityModule") ?? null,
          // Canonical link, for parity with the PubChem/PubMed tools — gives the
          // model a verifiable URL to cite so it surfaces the NCT id, not just a title.
          url: nctId ? `https://clinicaltrials.gov/study/${nctId}` : null,
        };
      })
    : [];
  if (studies.length === 0) return `No ClinicalTrials.gov studies found for "${query}".`;
  return JSON.stringify({ source: "ClinicalTrials.gov", count: studies.length, studies });
}

async function searchPubmed(query: string): Promise<string> {
  const enc = encodeURIComponent(query);
  const search = await fetchJson(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${enc}&retmax=5&retmode=json`,
  );
  const idsRaw = pick(search, "esearchresult", "idlist");
  const ids = Array.isArray(idsRaw)
    ? [...new Set(idsRaw.filter((id): id is string => typeof id === "string" && /^[1-9]\d{0,9}$/.test(id)))].slice(0, 5)
    : [];
  if (ids.length === 0) return `No PubMed results for "${query}".`;
  const sum = await fetchJson(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`,
  );
  // Europe PMC's JSON core records carry PubMed abstracts without an XML
  // dependency. Match both source namespace and PMID; result order can differ.
  // Keep upstream markup/entities verbatim as evidence (never render as HTML).
  const abstractQuery = `SRC:MED AND (${ids.map((id) => `EXT_ID:${id}`).join(" OR ")})`;
  let records: unknown;
  let abstractsUnavailable = false;
  try {
    const abstracts = await fetchJson(
      `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(abstractQuery)}&resultType=core&format=json&pageSize=5`,
    );
    records = pick(abstracts, "resultList", "result");
    abstractsUnavailable = !Array.isArray(records);
  } catch {
    // The secondary provider must not discard already-fetched PubMed citations.
    abstractsUnavailable = true;
  }
  const articles = ids.map((id) => {
    const record = Array.isArray(records)
      ? records.find((r) => pick(r, "source") === "MED" && pick(r, "id") === id)
      : undefined;
    const rawAbstract = pick(record, "abstractText");
    const abstract = typeof rawAbstract === "string" && rawAbstract.trim() ? rawAbstract : null;
    const r = pick(sum, "result", id) as Record<string, unknown> | undefined;
    const authors = pick(r, "authors");
    return {
      pmid: id,
      abstract,
      abstractSource: "Europe PMC (PubMed record)",
      abstractStatus: abstract ? "available" : abstractsUnavailable ? "unavailable" : "not_found",
      title: r?.title ?? null,
      source: r?.source ?? null,
      pubdate: r?.pubdate ?? null,
      authors: Array.isArray(authors)
        ? authors.slice(0, 4).map((a) => (a as Record<string, unknown>).name)
        : null,
      url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
    };
  });
  return JSON.stringify({ source: "PubMed", count: articles.length, articles });
}

// UniProt grounding for proteins/biologics — the identity layer PubChem can't
// provide (endogenous hormones, receptors, growth factors). Restricted to
// reviewed (Swiss-Prot) entries to avoid unreviewed TrEMBL noise.
async function searchUniprot(query: string): Promise<string> {
  const enc = encodeURIComponent(`${query} AND reviewed:true`);
  const data = await fetchJson(
    `https://rest.uniprot.org/uniprotkb/search?query=${enc}&format=json&size=3&fields=accession,id,protein_name,gene_primary,organism_name,length,cc_function,sequence`,
  );
  const results = pick(data, "results");
  const entries = Array.isArray(results)
    ? results.slice(0, 3).map((r) => {
        const acc = pick(r, "primaryAccession") as string | undefined;
        let functionText: string | null = null;
        const comments = pick(r, "comments");
        if (Array.isArray(comments)) {
          const fn = comments.find((c) => pick(c, "commentType") === "FUNCTION");
          const t = pick(fn, "texts", 0, "value");
          if (typeof t === "string") functionText = t.slice(0, 400);
        }
        const seq = pick(r, "sequence", "value");
        return {
          accession: acc ?? null,
          name:
            (pick(r, "proteinDescription", "recommendedName", "fullName", "value") as string) ??
            (pick(r, "uniProtkbId") as string) ??
            null,
          gene: pick(r, "genes", 0, "geneName", "value") ?? null,
          organism: pick(r, "organism", "scientificName") ?? null,
          length: pick(r, "sequence", "length") ?? null,
          function: functionText,
          sequence: typeof seq === "string" ? (seq.length > 120 ? seq.slice(0, 120) + "…" : seq) : null,
          url: acc ? `https://www.uniprot.org/uniprotkb/${acc}` : null,
        };
      })
    : [];
  if (entries.length === 0) return `No reviewed UniProt entry found for "${query}".`;
  return JSON.stringify({ source: "UniProt", count: entries.length, entries });
}

function labelExcerpt(value: unknown, max = 1400): string | null {
  const text = Array.isArray(value)
    ? value.filter((part): part is string => typeof part === "string").join("\n")
    : typeof value === "string"
      ? value
      : "";
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (!trimmed) return null;
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed;
}

// Current US Structured Product Labeling. openFDA returns HTTP 404 when the
// search matches nothing; that is "no label", not a failed tool.
async function searchDrugLabel(query: string): Promise<string> {
  const term = query.trim().replace(/[^\p{L}\p{N} .+'-]/gu, " ").replace(/\s+/g, " ").slice(0, 80);
  if (!term) return "No drug name provided for a label search.";
  const quoted = `"${term}"`;
  const search = [
    `openfda.generic_name:${quoted}`,
    `openfda.brand_name:${quoted}`,
    `openfda.substance_name:${quoted}`,
  ].join(" OR ");
  let data: unknown;
  try {
    data = await fetchJson(
      `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(search)}&limit=5`,
    );
  } catch (err) {
    if (err instanceof Error && err.message === "HTTP 404") {
      return `No current US prescribing label found for "${term}". Absence of a label is not evidence about non-US products or unapproved substances.`;
    }
    throw err;
  }
  const raw = pick(data, "results");
  const labels = Array.isArray(raw)
    ? raw
        .map((row) => {
          const setId = pick(row, "set_id");
          const id = typeof setId === "string" ? setId : null;
          const brands = pick(row, "openfda", "brand_name");
          const generics = pick(row, "openfda", "generic_name");
          const original = pick(row, "openfda", "is_original_packager");
          return {
            setId: id,
            brand: Array.isArray(brands) ? brands.slice(0, 4) : null,
            generic: Array.isArray(generics) ? generics.slice(0, 2) : null,
            manufacturer: Array.isArray(pick(row, "openfda", "manufacturer_name"))
              ? (pick(row, "openfda", "manufacturer_name") as unknown[]).slice(0, 1)
              : null,
            route: pick(row, "openfda", "route") ?? null,
            effectiveTime: pick(row, "effective_time") ?? null,
            originalPackager: original === true,
            indications: labelExcerpt(pick(row, "indications_and_usage"), 700),
            dosage: labelExcerpt(pick(row, "dosage_and_administration")),
            boxedWarning: labelExcerpt(pick(row, "boxed_warning"), 500),
            url: id ? `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${id}` : null,
          };
        })
        .sort((a, b) => Number(b.originalPackager) - Number(a.originalPackager))
        .slice(0, 2)
    : [];
  if (labels.length === 0) {
    return `No current US prescribing label found for "${term}". Absence of a label is not evidence about non-US products or unapproved substances.`;
  }
  return JSON.stringify({
    source: "openFDA drug labels (US SPL)",
    warning:
      "Excerpt of a current US label for the named product only. It is not a personal dosing recommendation and does not cover other products, indications, or jurisdictions.",
    count: labels.length,
    labels,
  });
}

export async function executeAgentTool(
  name: string,
  input: Record<string, unknown>,
): Promise<{ content: string; isError: boolean }> {
  try {
    let out: string;
    switch (name) {
      case "search_pubchem":
        out = await searchPubchem(String(input.name ?? ""));
        break;
      case "search_clinical_trials":
        out = await searchTrials(String(input.query ?? ""));
        break;
      case "search_pubmed":
        out = await searchPubmed(String(input.query ?? ""));
        break;
      case "search_uniprot":
        out = await searchUniprot(String(input.query ?? ""));
        break;
      case "search_drug_label":
        out = await searchDrugLabel(String(input.query ?? ""));
        break;
      default:
        return { content: `Unknown tool: ${name}`, isError: true };
    }
    return { content: truncate(out), isError: false };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "tool execution failed";
    return { content: `Tool "${name}" failed: ${msg}`, isError: true };
  }
}
