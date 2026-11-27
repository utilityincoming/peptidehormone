import { test } from "node:test";
import assert from "node:assert/strict";
import { readBoundedJson, rateLimited } from "./rate-limit";

test("readBoundedJson rejects an oversized Content-Length before parsing", async () => {
  const req = new Request("https://peptidehormone.com/api/chat", {
    method: "POST",
    headers: { "content-length": "999999" },
    body: "{}",
  });
  const parsed = await readBoundedJson(req, 100);
  assert.deepEqual(parsed, { ok: false, status: 413 });
});

test("readBoundedJson returns parsed JSON under the cap", async () => {
  const req = new Request("https://peptidehormone.com/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages: [] }),
  });
  const parsed = await readBoundedJson(req, 1000);
  assert.equal(parsed.ok, true);
  if (parsed.ok) assert.deepEqual(parsed.value, { messages: [] });
});

test("memory limiter trips after the limit when no store is configured", async () => {
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  const ip = `mem-${Date.now()}`;
  for (let i = 0; i < 3; i++) assert.equal(await rateLimited("t", ip, 3, 60_000), false);
  assert.equal(await rateLimited("t", ip, 3, 60_000), true);
});
