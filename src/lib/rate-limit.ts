// Shared request limiter for the billed routes (research chat, checkout).
// Uses the Upstash/Vercel KV REST store when configured so the window is the
// same on every serverless instance. With no store (local dev) it falls back
// to process memory.

import { incrWindow, storeConfig, storeEnabled } from "@/lib/store";

const HITS = new Map<string, number[]>();

function memoryLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (HITS.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  HITS.set(key, recent);
  return recent.length > limit;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
  return ip.slice(0, 80).replace(/[^\w.:]/g, "_");
}

/** True when this caller is over `limit` hits per `windowMs`. */
export async function rateLimited(bucket: string, ip: string, limit: number, windowMs: number): Promise<boolean> {
  const key = `${bucket}:${ip}`;
  const cfg = storeConfig();
  if (storeEnabled(cfg)) {
    const n = await incrWindow(`rl:${key}`, Math.max(1, Math.ceil(windowMs / 1000)), cfg);
    return n > limit;
  }
  return memoryLimited(key, limit, windowMs);
}

/**
 * Read a JSON body only after it is within `maxChars`. A declared
 * Content-Length over the cap is rejected before the body is buffered.
 */
export async function readBoundedJson(
  request: Request,
  maxChars: number,
): Promise<{ ok: true; value: unknown } | { ok: false; status: 400 | 413 }> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxChars) return { ok: false, status: 413 };
  const text = await request.text();
  if (text.length > maxChars) return { ok: false, status: 413 };
  try {
    return { ok: true, value: text ? JSON.parse(text) : null };
  } catch {
    return { ok: false, status: 400 };
  }
}
