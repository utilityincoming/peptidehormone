// Minimal key-value store for the one thing that needs shared state across
// serverless instances: marking a minted Research Pass code as used.
//
// Speaks the Upstash Redis REST protocol over fetch — the API Vercel KV and
// Upstash both expose — so there is no client dependency. Configured by
// KV_REST_API_URL / KV_REST_API_TOKEN (Vercel KV's names) or
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN. Unset → storeEnabled()
// is false and callers decide how to degrade.

export interface StoreConfig {
  url?: string;
  token?: string;
}

export function storeConfig(env: Record<string, string | undefined> = process.env): StoreConfig {
  return {
    url: (env.KV_REST_API_URL ?? env.UPSTASH_REDIS_REST_URL)?.trim().replace(/\/$/, "") || undefined,
    token: (env.KV_REST_API_TOKEN ?? env.UPSTASH_REDIS_REST_TOKEN)?.trim() || undefined,
  };
}

export function storeEnabled(cfg: StoreConfig): cfg is StoreConfig & { url: string; token: string } {
  return Boolean(cfg.url && cfg.token);
}

type Fetch = typeof fetch;

async function command(cfg: StoreConfig & { url: string; token: string }, args: (string | number)[], f: Fetch): Promise<unknown> {
  const res = await f(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`store ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { result?: unknown; error?: string };
  if (data.error) throw new Error(`store: ${data.error}`);
  return data.result;
}

/**
 * Atomically claim `key` for `ttlS` seconds. True if this call set it, false
 * if it already existed (SET NX). Throws if the store is unreachable.
 */
export async function claimOnce(
  key: string,
  ttlS: number,
  cfg: StoreConfig = storeConfig(),
  f: Fetch = fetch,
): Promise<boolean> {
  if (!storeEnabled(cfg)) throw new Error("store is not configured");
  const result = await command(cfg, ["SET", key, String(Date.now()), "NX", "EX", ttlS], f);
  return result === "OK";
}
