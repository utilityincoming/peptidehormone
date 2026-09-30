// Research Pass — the metered tier behind /research.
//
// The research agent bills the Anthropic API on every question, so it is the
// one page on the site with a real marginal cost. This module gives it a
// free daily allowance and a paid unlock without adding a dependency, a
// database, or an account system:
//
//   • Quota rides in a signed, HttpOnly cookie: `<day>.<used>.<sig>`. It rolls
//     over at UTC midnight. Tampering fails the signature and resets to zero
//     used, which is the safe failure for a soft limit (the IP rate limiter in
//     the chat route is the hard one).
//   • A Pass is a second signed cookie, issued when a reader redeems an access
//     code. Codes live in PASS_CODES (comma-separated) and are compared in
//     constant time; the checkout that sells them is whatever URL sits in
//     PASS_CHECKOUT_URL (a Stripe Payment Link works with zero integration —
//     fulfil by emailing the code).
//   • Nothing is enforced unless PASS_SECRET is set, so a deploy without the
//     env vars behaves exactly as before.
//
// Everything here is pure and Node-only (node:crypto) — the route handlers are
// the only callers, and the tests exercise this file directly.

import { createHmac, timingSafeEqual } from "node:crypto";

export const PASS_COOKIE = "ph_pass";
export const QUOTA_COOKIE = "ph_quota";
export const DEFAULT_FREE_DAILY = 5;
/** Pass cookie lifetime — a year, renewed on every successful redeem. */
export const PASS_MAX_AGE_S = 365 * 24 * 60 * 60;
/** Quota cookie lifetime — two days is enough to span a rollover. */
export const QUOTA_MAX_AGE_S = 2 * 24 * 60 * 60;

export interface PassConfig {
  /** HMAC key for both cookies. Unset → metering is off. */
  secret?: string;
  /** Redeemable access codes, normalised (trimmed, upper-cased). */
  codes: string[];
  /** Free questions per UTC day for readers without a pass. */
  freeDaily: number;
  /** Where "Get a pass" sends the reader. Unset → the panel offers codes only. */
  checkoutUrl?: string;
}

export function passConfig(env: Record<string, string | undefined> = process.env): PassConfig {
  const secret = env.PASS_SECRET?.trim() || undefined;
  const codes = (env.PASS_CODES ?? "")
    .split(",")
    .map(normaliseCode)
    .filter(Boolean);
  const parsed = Number(env.PASS_FREE_DAILY);
  const freeDaily = Number.isInteger(parsed) && parsed >= 0 ? parsed : DEFAULT_FREE_DAILY;
  const checkoutUrl = env.PASS_CHECKOUT_URL?.trim() || undefined;
  return { secret, codes, freeDaily, checkoutUrl };
}

export function meteringEnabled(cfg: PassConfig): cfg is PassConfig & { secret: string } {
  return typeof cfg.secret === "string" && cfg.secret.length > 0;
}

export function normaliseCode(raw: string): string {
  return raw.trim().toUpperCase();
}

// ── Signing ──────────────────────────────────────────────────────────────────

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** `payload.signature` — payload must not itself contain a dot. */
export function seal(payload: string, secret: string): string {
  if (payload.includes(".")) throw new Error("seal: payload may not contain '.'");
  return `${payload}.${sign(payload, secret)}`;
}

/** Verify a sealed token in constant time; null on any failure. */
export function unseal(token: string | undefined | null, secret: string): string | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const given = Buffer.from(token.slice(dot + 1));
  const expected = Buffer.from(sign(payload, secret));
  if (given.length !== expected.length) return null;
  return timingSafeEqual(given, expected) ? payload : null;
}

// ── Quota ────────────────────────────────────────────────────────────────────

export interface Quota {
  /** UTC calendar day, YYYY-MM-DD. */
  day: string;
  used: number;
}

export function utcDay(now: number = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10);
}

/**
 * Read the quota cookie. A missing, forged, or malformed cookie — or one from
 * an earlier day — yields a fresh zero for today.
 */
export function readQuota(
  cookie: string | undefined | null,
  secret: string,
  now: number = Date.now(),
): Quota {
  const today = utcDay(now);
  const payload = unseal(cookie, secret);
  if (!payload) return { day: today, used: 0 };
  const [day, usedRaw] = payload.split(":");
  const used = Number(usedRaw);
  if (day !== today || !Number.isInteger(used) || used < 0) return { day: today, used: 0 };
  return { day, used };
}

export function bumpQuota(q: Quota, now: number = Date.now()): Quota {
  const today = utcDay(now);
  return q.day === today ? { day: today, used: q.used + 1 } : { day: today, used: 1 };
}

export function quotaCookieValue(q: Quota, secret: string): string {
  return seal(`${q.day}:${q.used}`, secret);
}

export function remaining(q: Quota, cfg: PassConfig): number {
  return Math.max(0, cfg.freeDaily - q.used);
}

// ── Pass ─────────────────────────────────────────────────────────────────────

const PASS_PAYLOAD_PREFIX = "pass-v1-";

export function issuePass(secret: string, now: number = Date.now()): string {
  return seal(`${PASS_PAYLOAD_PREFIX}${utcDay(now).replace(/-/g, "")}`, secret);
}

export function hasPass(cookie: string | undefined | null, secret: string): boolean {
  const payload = unseal(cookie, secret);
  return payload !== null && payload.startsWith(PASS_PAYLOAD_PREFIX);
}

/** Constant-time membership check against the configured codes. */
export function redeemCode(raw: string, cfg: PassConfig): boolean {
  const code = Buffer.from(normaliseCode(raw));
  if (code.length === 0) return false;
  let ok = false;
  for (const c of cfg.codes) {
    const want = Buffer.from(c);
    if (want.length === code.length && timingSafeEqual(want, code)) ok = true;
  }
  return ok;
}

// ── Cookies ──────────────────────────────────────────────────────────────────

/** Serialise a Set-Cookie header value for one of the pass cookies. */
export function cookieHeader(
  name: string,
  value: string,
  maxAgeS: number,
  secure: boolean = process.env.NODE_ENV === "production",
): string {
  return [
    `${name}=${value}`,
    "Path=/",
    `Max-Age=${maxAgeS}`,
    "HttpOnly",
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}
