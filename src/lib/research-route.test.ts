import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../app/api/chat/route";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of ["VENICE_API_KEY", "ANTHROPIC_API_KEY", "VENICE_ANSWER_MODEL", "PASS_SECRET"]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});
function request() {
  return new NextRequest("https://peptidehormone.com/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": "test-research" },
    body: JSON.stringify({ messages: [{ role: "user", content: "What doses were studied in humans?" }] }),
  });
}

test("research route hands the research draft to most_uncensored for final synthesis", async () => {
  process.env.VENICE_API_KEY = "test-key";
  delete process.env.VENICE_ANSWER_MODEL;
  delete process.env.ANTHROPIC_API_KEY;
  delete process.env.PASS_SECRET;
  const calls: Record<string, unknown>[] = [];
  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    calls.push(body);
    return Response.json({ choices: [{
      message: { content: calls.length === 1 ? "No verified dose in the retrieved evidence." : "Final evidence answer" },
      finish_reason: "stop",
    }] });
  };
  const response = await POST(request());
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].model, "most_uncensored");
  assert.equal(calls[1].tool_choice, "none");
  assert.equal(body.content, "Final evidence answer");
  assert.match(JSON.stringify(calls[1].messages), /No verified dose/);
  assert.match(JSON.stringify(calls[1].messages), /Do not invent doses/);
});

test("source tool results reach final synthesis with their call IDs intact", async () => {
  process.env.VENICE_API_KEY = "test-key";
  delete process.env.VENICE_ANSWER_MODEL;
  delete process.env.ANTHROPIC_API_KEY;
  delete process.env.PASS_SECRET;
  let modelCalls = 0;
  globalThis.fetch = async (url, init) => {
    if (String(url).includes("clinicaltrials.gov")) {
      return Response.json({ studies: [{ protocolSection: {
        identificationModule: { nctId: "NCT00000001", briefTitle: "Synthetic test fixture" },
        armsInterventionsModule: { armGroups: [{ label: "Test arm", description: "Source fixture dosing text" }] },
      } }] });
    }
    const body = JSON.parse(String(init?.body));
    modelCalls++;
    if (modelCalls === 1) return Response.json({ choices: [{ message: { tool_calls: [{
      id: "evidence-call", type: "function", function: { name: "search_clinical_trials", arguments: '{"query":"test fixture"}' },
    }] }, finish_reason: "tool_calls" }] });
    if (body.model === "most_uncensored") {
      const evidence = body.messages.find((m: { role: string }) => m.role === "tool");
      assert.equal(evidence.tool_call_id, "evidence-call");
      assert.match(evidence.content, /Source fixture dosing text/);
      assert.match(evidence.content, /https:\/\/clinicaltrials.gov\/study\/NCT00000001/);
    }
    return Response.json({ choices: [{ message: { content: "Test answer" }, finish_reason: "stop" }] });
  };
  assert.equal((await POST(request())).status, 200);
  assert.equal(modelCalls, 3);
});

test("exhausting the research rounds still forwards evidence for one final answer", async () => {
  process.env.VENICE_API_KEY = "test-key";
  delete process.env.VENICE_ANSWER_MODEL;
  delete process.env.ANTHROPIC_API_KEY;
  delete process.env.PASS_SECRET;
  let modelCalls = 0;
  globalThis.fetch = async (url, init) => {
    if (String(url).includes("clinicaltrials.gov")) return Response.json({ studies: [] });
    const body = JSON.parse(String(init?.body));
    modelCalls++;
    if (body.model === "most_uncensored") {
      assert.equal(body.tool_choice, "none");
      assert.equal(body.messages.filter((m: { role: string }) => m.role === "tool").length, 5);
      return Response.json({ choices: [{ message: { content: "Insufficient verified evidence" }, finish_reason: "stop" }] });
    }
    return Response.json({ choices: [{ message: { tool_calls: [{
      id: `round-${modelCalls}`, type: "function", function: { name: "search_clinical_trials", arguments: '{"query":"test fixture"}' },
    }] }, finish_reason: "tool_calls" }] });
  };
  const response = await POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).content, "Insufficient verified evidence");
  assert.equal(modelCalls, 6);
});

test("a failed final answer returns 502 without charging the reader's quota", async () => {
  process.env.VENICE_API_KEY = "test-key";
  process.env.PASS_SECRET = "synthetic-test-secret-not-a-real-credential";
  delete process.env.ANTHROPIC_API_KEY;
  delete process.env.VENICE_ANSWER_MODEL;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return calls === 1
      ? Response.json({ choices: [{ message: { content: "Research draft" }, finish_reason: "stop" }] })
      : new Response("unavailable", { status: 503 });
  };
  const response = await POST(request());
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("set-cookie"), null);
});
