import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { claimOnce, storeConfig, storeEnabled } from "./store";

function fakeFetch(result: unknown, status = 200) {
  const calls: { url: string; body: unknown; auth: string | null }[] = [];
  const f = (async (url: string | URL | Request, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    calls.push({ url: String(url), body: JSON.parse(String(init?.body)), auth: headers.get("authorization") });
    return new Response(JSON.stringify({ result }), { status });
  }) as typeof fetch;
  return { f, calls };
}

describe("storeConfig", () => {
  it("accepts Vercel KV or Upstash names and trims a trailing slash", () => {
    assert.equal(storeEnabled(storeConfig({})), false);
    const kv = storeConfig({ KV_REST_API_URL: "https://kv.example/", KV_REST_API_TOKEN: "t" });
    assert.equal(storeEnabled(kv), true);
    assert.equal(kv.url, "https://kv.example");
    const up = storeConfig({ UPSTASH_REDIS_REST_URL: "https://u.example", UPSTASH_REDIS_REST_TOKEN: "t" });
    assert.equal(storeEnabled(up), true);
  });
});

describe("claimOnce", () => {
  const cfg = storeConfig({ KV_REST_API_URL: "https://kv.example", KV_REST_API_TOKEN: "tok" });

  it("issues SET NX EX and reports a fresh claim", async () => {
    const { f, calls } = fakeFetch("OK");
    assert.equal(await claimOnce("redeemed:PH-1", 60, cfg, f), true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://kv.example");
    assert.equal(calls[0].auth, "Bearer tok");
    const body = calls[0].body as unknown[];
    assert.equal(body[0], "SET");
    assert.equal(body[1], "redeemed:PH-1");
    assert.deepEqual(body.slice(3), ["NX", "EX", 60]);
  });

  it("reports an existing key as not claimed", async () => {
    const { f } = fakeFetch(null);
    assert.equal(await claimOnce("k", 60, cfg, f), false);
  });

  it("throws when unconfigured or on an HTTP error", async () => {
    await assert.rejects(() => claimOnce("k", 60, storeConfig({})));
    const { f } = fakeFetch(null, 500);
    await assert.rejects(() => claimOnce("k", 60, cfg, f));
  });
});
