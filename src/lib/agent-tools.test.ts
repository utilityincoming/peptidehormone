import assert from "node:assert/strict";
import test from "node:test";
import { AGENT_TOOLS, executeAgentTool } from "./agent-tools";

test("evidence tool descriptions require source-grounded dosing rather than recommendations", () => {
  for (const name of ["search_pubmed", "search_clinical_trials"]) {
    const description = AGENT_TOOLS.find((tool) => tool.name === name)!.description;
    assert.match(description, /dos(e|ing)/i);
    assert.match(description, /source text/i);
    assert.match(description, /not.*recommendation/i);
  }
});

const abstractText = "<h4>Methods</h4><p>Adults received 2.4 mg weekly for 68 weeks; n=100 &amp; placebo n=50.</p>";

function pubmedFetch(url: string | URL | Request) {
  const address = String(url);
  if (address.includes("esearch.fcgi")) return Response.json({ esearchresult: { idlist: ["123", "456"] } });
  if (address.includes("esummary.fcgi")) return Response.json({ result: {
    "123": { title: "Study A", source: "Journal A", pubdate: "2024", authors: [{ name: "A Author" }] },
    "456": { title: "Study B", source: "Journal B" },
  } });
  const endpoint = new URL(address);
  assert.equal(endpoint.origin, "https://www.ebi.ac.uk");
  assert.equal(endpoint.pathname, "/europepmc/webservices/rest/search");
  assert.equal(endpoint.searchParams.get("resultType"), "core");
  assert.equal(endpoint.searchParams.get("query"), "SRC:MED AND (EXT_ID:123 OR EXT_ID:456)");
  return Response.json({ resultList: { result: [
    { source: "MED", id: "456", abstractText: "A different study: no regimen reported." },
    { source: "PMC", id: "123", abstractText: "Wrong identifier namespace" },
    { source: "MED", id: "999", abstractText: "Unrequested study" },
    { source: "MED", id: "123", abstractText },
  ] } });
}

test("PubMed attaches source abstracts by exact PMID, not response order or namespace", async (t) => {
  t.mock.method(globalThis, "fetch", async (url: string | URL | Request) => pubmedFetch(url));
  const result = await executeAgentTool("search_pubmed", { query: "study drug" });
  assert.equal(result.isError, false);
  const data = JSON.parse(result.content);
  assert.equal(data.articles[0].abstract, abstractText);
  assert.equal(data.articles[0].abstractSource, "Europe PMC (PubMed record)");
  assert.equal(data.articles[0].abstractStatus, "available");
  assert.equal(data.articles[0].url, "https://pubmed.ncbi.nlm.nih.gov/123/");
  assert.equal(data.articles[1].abstract, "A different study: no regimen reported.");
  assert.equal(data.count, 2);
});

test("PubMed preserves metadata when the abstract provider fails", async (t) => {
  t.mock.method(globalThis, "fetch", async (url: string | URL | Request) => {
    if (String(url).includes("europepmc")) return new Response("unavailable", { status: 503 });
    return pubmedFetch(url);
  });
  const result = await executeAgentTool("search_pubmed", { query: "study drug" });
  assert.equal(result.isError, false);
  const data = JSON.parse(result.content);
  assert.equal(data.articles[0].title, "Study A");
  assert.equal(data.articles[0].abstract, null);
  assert.equal(data.articles[0].abstractStatus, "unavailable");
  assert.equal(data.articles[0].url, "https://pubmed.ncbi.nlm.nih.gov/123/");
});

test("oversized evidence stays bounded valid JSON with citations and accurate counts", async (t) => {
  const longAbstract = 'Participants received 2.4 mg weekly. "Quoted" evidence Ω. '.repeat(300);
  t.mock.method(globalThis, "fetch", async (url: string | URL | Request) => {
    if (String(url).includes("europepmc")) return Response.json({ resultList: { result: [
      { source: "MED", id: "123", abstractText: longAbstract },
      { source: "MED", id: "456", abstractText: longAbstract },
    ] } });
    return pubmedFetch(url);
  });
  const result = await executeAgentTool("search_pubmed", { query: "study drug" });
  assert.equal(result.isError, false);
  const data = JSON.parse(result.content);
  assert.ok(result.content.length <= 6000);
  assert.equal(data.truncated, true);
  assert.equal(data.count, data.articles.length);
  assert.equal(data.omittedResults, 1);
  assert.equal(data.articles[0].url, "https://pubmed.ncbi.nlm.nih.gov/123/");
  assert.ok(data.articles[0].abstract.startsWith("Participants received 2.4 mg weekly."));
  assert.match(data.articles[0].abstract, /\[truncated\]/);
  assert.match(data.warning, /consult.*source/i);
});

test("PubMed validates, deduplicates and bounds upstream PMIDs before secondary requests", async (t) => {
  const calls: URL[] = [];
  t.mock.method(globalThis, "fetch", async (url: string | URL | Request) => {
    const endpoint = new URL(String(url));
    calls.push(endpoint);
    if (endpoint.pathname.endsWith("esearch.fcgi")) return Response.json({ esearchresult: { idlist: ["123&evil=1", "123", "123", null, "456", "789", "101", "102", "103"] } });
    if (endpoint.pathname.endsWith("esummary.fcgi")) return Response.json({ result: {} });
    return Response.json({ resultList: { result: [] } });
  });
  const result = await executeAgentTool("search_pubmed", { query: "study drug" });
  const data = JSON.parse(result.content);
  assert.equal(calls[1].searchParams.get("id"), "123,456,789,101,102");
  assert.deepEqual(data.articles.map((article: { pmid: string }) => article.pmid), ["123", "456", "789", "101", "102"]);
  assert.equal(data.count, 5);
  assert.ok(data.articles.every((article: { abstract: unknown; abstractStatus: string }) => article.abstract === null && article.abstractStatus === "not_found"));
});

test("trials enforce the five-result limit even if upstream ignores pageSize", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({ studies: Array.from({ length: 8 }, (_, i) => ({
    protocolSection: { identificationModule: { nctId: `NCT0000000${i}` } },
  })) }));
  const result = await executeAgentTool("search_clinical_trials", { query: "example" });
  const data = JSON.parse(result.content);
  assert.equal(data.count, 5);
  assert.equal(data.studies.length, 5);
  assert.deepEqual(data.studies[0].armGroups, []);
  assert.deepEqual(data.studies[0].interventions, []);
  assert.equal(data.studies[0].eligibility, null);
  assert.doesNotMatch(result.content, /\d+\s*mg/);
});

// Only the external HTTP boundary is mocked; exercise the public executor.
test("trials include verbatim arm/intervention evidence and population with a citation", async (t) => {
  const arms = [{ label: "Active", type: "EXPERIMENTAL", description: "Participants receive 2.4 mg subcutaneously once weekly.", interventionNames: ["Drug: study drug"] }];
  const interventions = [{ type: "DRUG", name: "study drug", description: "Escalation from 0.25 mg weekly over 16 weeks.", armGroupLabels: ["Active"] }];
  const eligibility = { eligibilityCriteria: "Adults with obesity; excludes pregnancy.", healthyVolunteers: false, sex: "ALL", minimumAge: "18 Years", maximumAge: "75 Years", studyPopulation: "Adults with obesity", samplingMethod: "NON_PROBABILITY_SAMPLE" };
  t.mock.method(globalThis, "fetch", async () => Response.json({ studies: [{ protocolSection: {
    identificationModule: { nctId: "NCT00000001", briefTitle: "Example trial" },
    armsInterventionsModule: { armGroups: arms, interventions },
    eligibilityModule: eligibility,
    designModule: { studyType: "INTERVENTIONAL", phases: ["PHASE3"], enrollmentInfo: { count: 120, type: "ACTUAL" } },
  } }] }));
  const result = await executeAgentTool("search_clinical_trials", { query: "study drug" });
  assert.equal(result.isError, false);
  const study = JSON.parse(result.content).studies[0];
  assert.deepEqual(study.armGroups, arms);
  assert.deepEqual(study.interventions, interventions);
  assert.deepEqual(study.eligibility, eligibility);
  assert.deepEqual(study.enrollment, { count: 120, type: "ACTUAL" });
  assert.equal(study.studyType, "INTERVENTIONAL");
  assert.equal(study.url, "https://clinicaltrials.gov/study/NCT00000001");
});

test("nested oversized trial evidence retains its citation and explicit truncation warning", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({ studies: [{ protocolSection: {
    identificationModule: { nctId: "NCT00000001" },
    armsInterventionsModule: {
      armGroups: Array.from({ length: 30 }, () => ({ label: "Active", description: "Adults received 0.25 mg weekly. ".repeat(400) })),
      interventions: [{ name: "Drug", description: "Subcutaneous administration. ".repeat(400) }],
    },
    eligibilityModule: { eligibilityCriteria: "Adults only. ".repeat(800) },
  } }] }));
  const result = await executeAgentTool("search_clinical_trials", { query: "example" });
  assert.equal(result.isError, false);
  const data = JSON.parse(result.content);
  assert.ok(result.content.length <= 6000);
  assert.equal(data.truncated, true);
  assert.equal(data.count, data.studies.length);
  assert.equal(data.studies[0].url, "https://clinicaltrials.gov/study/NCT00000001");
  assert.match(data.studies[0].armGroups[0].description, /^Adults received 0\.25 mg weekly\./);
});

test("empty PubMed search does not trigger secondary requests", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => Response.json({ esearchresult: { idlist: [] } }));
  const result = await executeAgentTool("search_pubmed", { query: "no results" });
  assert.equal(result.isError, false);
  assert.match(result.content, /No PubMed results/);
  assert.equal(fetchMock.mock.callCount(), 1);
});

test("missing and malformed abstracts are explicit rather than invented", async (t) => {
  let records: unknown[] = [];
  t.mock.method(globalThis, "fetch", async (url: string | URL | Request) => {
    if (String(url).includes("europepmc")) return Response.json({ resultList: { result: records } });
    return pubmedFetch(url);
  });
  for (const fixture of [[], [{ source: "MED", id: "123", abstractText: "  " }], [{ source: "MED", id: "123", abstractText: { dose: "invalid" } }]]) {
    records = fixture;
    const result = await executeAgentTool("search_pubmed", { query: "study drug" });
    const data = JSON.parse(result.content);
    assert.equal(data.articles[0].abstract, null);
    assert.equal(data.articles[0].abstractStatus, "not_found");
  }
});

test("HTTP failures remain tool errors", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("limited", { status: 429 }));
  const result = await executeAgentTool("search_clinical_trials", { query: "example" });
  assert.equal(result.isError, true);
  assert.match(result.content, /HTTP 429/);
});

test("each fetch retains the eight-second abort timeout and fixed provider origin", async (t) => {
  const originalSetTimeout = globalThis.setTimeout;
  const delays: number[] = [];
  t.mock.method(globalThis, "setTimeout", (callback: () => void, delay: number) => {
    delays.push(delay);
    return originalSetTimeout(callback, 1);
  });
  t.mock.method(globalThis, "fetch", async (url: string | URL | Request, init?: RequestInit) => {
    assert.equal(new URL(String(url)).origin, "https://clinicaltrials.gov");
    assert.ok(init?.signal instanceof AbortSignal);
    return new Promise<Response>((_resolve, reject) => {
      init!.signal!.addEventListener("abort", () => reject(new Error("request aborted")), { once: true });
    });
  });
  const result = await executeAgentTool("search_clinical_trials", { query: "https://arbitrary.invalid/path?dose=7" });
  assert.equal(result.isError, true);
  assert.match(result.content, /aborted/);
  assert.deepEqual(delays, [8000]);
});

// Opt-in only: exercise actual source APIs without introducing network flakiness
// into the normal suite. PH_LIVE_TOOL_SMOKE=1 npx tsx --test ...
test("live source smoke returns published and registered dosing evidence", { skip: process.env.PH_LIVE_TOOL_SMOKE !== "1" }, async () => {
  for (const [name, query] of [["search_pubmed", "33567185[PMID]"], ["search_clinical_trials", "NCT03548935"]]) {
    const result = await executeAgentTool(name, { query });
    assert.equal(result.isError, false, result.content);
    const data = JSON.parse(result.content);
    assert.ok(result.content.length <= 6000);
    const record = data.articles?.[0] ?? data.studies?.[0];
    assert.ok(record?.url);
    const sourceText = name === "search_pubmed" ? record.abstract : JSON.stringify(record.interventions);
    assert.match(sourceText, /\d+(?:\.\d+)?\s*mg/i);
    console.log(JSON.stringify({ liveSmoke: name, citation: record.url, chars: result.content.length, truncated: data.truncated ?? false, evidence: sourceText }));
  }
});
