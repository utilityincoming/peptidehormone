import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { callResearchModel, type ModelCallConfig } from "./research-llm";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of ["VENICE_API_KEY", "ANTHROPIC_API_KEY", "VENICE_MODEL", "VENICE_ANSWER_MODEL"]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});
const config: ModelCallConfig = {
  system: "Report sourced dosing evidence, not individual prescriptions.",
  tools: [], maxTokens: 1000, effort: "medium", timeoutMs: 1000,
};
const messages = [{ role: "user" as const, content: "What doses were studied?" }];
const success = () => Response.json({ choices: [{ message: { content: "Evidence summary" }, finish_reason: "stop" }] });
const rejectedBody = () => new Response(new ReadableStream({
  start(controller) { controller.error(new Error("test body stream failure")); },
}));

for (const failure of ["body stream", "null"] as const) {
  for (const outcome of ["kimi", "anthropic", "all-failed", "venice-only-failed"] as const) {
    test(`answer ${failure} failure returns a result: ${outcome}`, async () => {
      process.env.VENICE_API_KEY = "test-key";
      process.env.ANTHROPIC_API_KEY = "test-key";
      if (outcome === "venice-only-failed") delete process.env.ANTHROPIC_API_KEY;
      delete process.env.VENICE_ANSWER_MODEL;
      const models: string[] = [];
      globalThis.fetch = async (url, init) => {
        const body = JSON.parse(String(init?.body));
        models.push(body.model);
        if (String(url).includes("anthropic")) {
          assert.deepEqual(body.tool_choice, { type: "none" });
          return outcome === "anthropic"
            ? Response.json({ content: [{ type: "text", text: "Fallback evidence" }], stop_reason: "end_turn" })
            : rejectedBody();
        }
        assert.equal(body.tool_choice, "none");
        if (outcome === "kimi" && body.model === "kimi-k3") return success();
        return failure === "null" ? Response.json(null) : rejectedBody();
      };
      const result = await callResearchModel(messages, { ...config, forceText: true });
      const usesAnthropic = outcome === "anthropic" || outcome === "all-failed";
      assert.deepEqual(models, ["most_uncensored", "kimi-k3", ...(usesAnthropic ? ["claude-opus-4-8"] : [])]);
      assert.equal(result.provider, usesAnthropic ? "anthropic" : "venice");
      if (outcome === "kimi" || outcome === "anthropic") {
        assert.equal(result.ok, true);
        assert.deepEqual(result.data?.content, [{ type: "text", text: outcome === "kimi" ? "Evidence summary" : "Fallback evidence" }]);
      } else {
        const nullFailure = failure === "null" && !usesAnthropic;
        assert.equal(result.ok, false);
        assert.equal(result.status, nullFailure ? 502 : 0);
        assert.equal(result.errorText, nullFailure ? "Malformed Venice response" : "test body stream failure");
      }
    });
  }
}

test("an unavailable answer model falls back to the research model before Anthropic", async () => {
  process.env.VENICE_API_KEY = "test-key";
  delete process.env.ANTHROPIC_API_KEY;
  delete process.env.VENICE_ANSWER_MODEL;
  const models: string[] = [];
  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    models.push(body.model);
    assert.equal(body.tool_choice, "none");
    return models.length === 1 ? new Response("unavailable", { status: 503 }) : success();
  };
  const result = await callResearchModel(messages, { ...config, forceText: true });
  assert.equal(result.ok, true);
  assert.deepEqual(models, ["most_uncensored", "kimi-k3"]);
});

test("answer override is independent of the research model", async () => {
  process.env.VENICE_API_KEY = "test-key";
  process.env.VENICE_ANSWER_MODEL = " custom-answer-model ";
  delete process.env.ANTHROPIC_API_KEY;
  const models: string[] = [];
  globalThis.fetch = async (_url, init) => {
    models.push(JSON.parse(String(init?.body)).model);
    return success();
  };
  await callResearchModel(messages, config);
  await callResearchModel(messages, { ...config, forceText: true });
  assert.deepEqual(models, ["kimi-k3", "custom-answer-model"]);
});

for (const failure of ["network", "malformed", "empty", "http"] as const) {
  test(`answer ${failure} failure reaches Anthropic with the same policy`, async () => {
    process.env.VENICE_API_KEY = "test-key";
    process.env.ANTHROPIC_API_KEY = "test-key";
    delete process.env.VENICE_ANSWER_MODEL;
    let count = 0;
    globalThis.fetch = async (url, init) => {
      count++;
      const body = JSON.parse(String(init?.body));
      if (String(url).includes("anthropic")) {
        assert.equal(body.system[0].text, config.system);
        assert.deepEqual(body.tool_choice, { type: "none" });
        return Response.json({ content: [{ type: "text", text: "Fallback evidence" }], stop_reason: "end_turn" });
      }
      if (failure === "network") throw new Error("test network failure");
      if (failure === "malformed") return new Response("not json");
      if (failure === "empty") return Response.json({ choices: [] });
      return new Response("upstream down", { status: 503 });
    };
    const result = await callResearchModel(messages, { ...config, forceText: true });
    assert.equal(result.ok, true);
    assert.equal(result.provider, "anthropic");
    assert.equal(count, 3);
  });
}

test("answer stage uses most_uncensored and keeps the site's policy", async () => {
  process.env.VENICE_API_KEY = "test-key";
  delete process.env.VENICE_ANSWER_MODEL;
  delete process.env.ANTHROPIC_API_KEY;
  let body: Record<string, unknown> = {};
  globalThis.fetch = async (_url, init) => {
    body = JSON.parse(String(init?.body));
    return success();
  };
  const result = await callResearchModel(messages, { ...config, forceText: true });
  assert.equal(result.ok, true);
  assert.equal(body.model, "most_uncensored");
  assert.equal(body.tool_choice, "none");
  assert.deepEqual(body.messages, [{ role: "system", content: config.system }, ...messages]);
  assert.deepEqual(body.venice_parameters, { include_venice_system_prompt: false });
});
