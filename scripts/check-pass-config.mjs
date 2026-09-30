#!/usr/bin/env node
/**
 * Research Pass / Stripe configuration check.
 *
 *   npm run check:pass
 *
 * Reads .env.local (and .env) the way Next.js does, then reports whether each
 * subsystem is on and, where it can, whether the credentials actually work:
 * Stripe key + Price ID, Resend key + sender, KV reachability. Never prints a
 * secret — only its prefix and length.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const env = { ...process.env };
for (const f of [".env", ".env.local"]) {
  const p = resolve(root, f);
  if (!existsSync(p)) continue;
  for (const raw of readFileSync(p, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const k = line.slice(0, eq).trim();
    let v = line.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    env[k] = v;
  }
}

const ok = (m) => console.log(`  ✔ ${m}`);
const warn = (m) => console.log(`  ▲ ${m}`);
const bad = (m) => { console.log(`  ✖ ${m}`); process.exitCode = 1; };
const mask = (v) => (v ? `${v.slice(0, 8)}… (${v.length} chars)` : "(unset)");
const has = (k) => Boolean(env[k]?.trim());
const placeholder = (v) => !v || /\.\.\.$|^price_\.\.\.$|^(pk|sk|whsec|re)_(test|live)?_?\.\.\.$/.test(v);

console.log(`\nResearch Pass config check — ${existsSync(resolve(root, ".env.local")) ? ".env.local found" : "no .env.local (using process env only)"}\n`);

// ── Research agent ──
console.log("Research agent");
void (has("ANTHROPIC_API_KEY") ? ok(`ANTHROPIC_API_KEY ${mask(env.ANTHROPIC_API_KEY)}`) : bad("ANTHROPIC_API_KEY unset — /api/chat returns 500"));

// ── Metering ──
console.log("\nMetering (Research Pass)");
if (!has("PASS_SECRET")) {
  warn("PASS_SECRET unset — metering is OFF; no quota, no 402, no upgrade panel, webhook cannot mint codes");
} else {
  void (env.PASS_SECRET.length < 16 ? warn(`PASS_SECRET is short (${env.PASS_SECRET.length} chars) — use 32+ random chars`) : ok(`PASS_SECRET ${mask(env.PASS_SECRET)}`));
  const fd = env.PASS_FREE_DAILY;
  void (fd === undefined ? ok("PASS_FREE_DAILY unset — default 5") : Number.isInteger(Number(fd)) && Number(fd) >= 0 ? ok(`PASS_FREE_DAILY = ${fd}`) : warn(`PASS_FREE_DAILY "${fd}" is not a whole number — default 5 applies`));
  const codes = (env.PASS_CODES ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  void (codes.length ? ok(`PASS_CODES: ${codes.length} admin code(s)`) : ok("PASS_CODES unset — only purchased codes will redeem"));
  const cu = env.PASS_CHECKOUT_URL;
  void (!cu ? warn("PASS_CHECKOUT_URL unset — the 402 panel shows the code box only, no 'Get a Research Pass' button") : cu === "/research/pass" || /^https?:\/\//.test(cu) ? ok(`PASS_CHECKOUT_URL = ${cu}`) : warn(`PASS_CHECKOUT_URL "${cu}" is neither /research/pass nor an absolute URL`));
}

// ── Stripe ──
console.log("\nStripe");
const pk = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, sk = env.STRIPE_SECRET_KEY, wh = env.STRIPE_WEBHOOK_SECRET;
if (has("STRIPE_PUBLISHABLE_KEY") && !pk) bad("Found STRIPE_PUBLISHABLE_KEY but the code reads NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY — rename it");
void (placeholder(pk) ? bad(`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ${mask(pk)} — set the pk_ key; without it /research/pass shows "Checkout is not configured."`) : /^pk_(test|live)_/.test(pk) ? ok(`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ${mask(pk)}`) : bad(`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY doesn't start with pk_test_/pk_live_`));
void (placeholder(sk) ? bad(`STRIPE_SECRET_KEY ${mask(sk)} — set the sk_ key; /api/create-checkout-session returns 500 without it`) : /^sk_(test|live)_/.test(sk) ? ok(`STRIPE_SECRET_KEY ${mask(sk)}`) : bad("STRIPE_SECRET_KEY doesn't start with sk_test_/sk_live_"));
if (pk && sk && /^pk_(test|live)_/.test(pk) && /^sk_(test|live)_/.test(sk) && pk.split("_")[1] !== sk.split("_")[1]) bad(`Key mode mismatch: publishable is ${pk.split("_")[1]}, secret is ${sk.split("_")[1]}`);
void (placeholder(wh) ? warn(`STRIPE_WEBHOOK_SECRET ${mask(wh)} — webhook accepts UNSIGNED events (fine locally, not in production)`) : ok(`STRIPE_WEBHOOK_SECRET ${mask(wh)}`));

const routeSrc = readFileSync(resolve(root, "src/app/api/create-checkout-session/route.ts"), "utf8");
const priceMatch = routeSrc.match(/price:\s*"([^"]+)"/);
const priceId = priceMatch?.[1];
void (placeholder(priceId) ? bad(`Price ID in src/app/api/create-checkout-session/route.ts is still "${priceId}" — paste your real price_… id`) : ok(`Price ID in route: ${priceId}`));

if (sk && /^sk_(test|live)_/.test(sk) && priceId && !placeholder(priceId)) {
  try {
    const r = await fetch(`https://api.stripe.com/v1/prices/${priceId}`, { headers: { Authorization: `Bearer ${sk}` } });
    const j = await r.json();
    if (r.ok) {
      const mode = j.type === "recurring" ? "recurring" : "one_time";
      ok(`Stripe accepted the key; price ${priceId} is ${mode}, ${j.unit_amount / 100} ${j.currency?.toUpperCase()}, active=${j.active}`);
      if (mode === "recurring") bad('Price is recurring but the route uses mode "payment" — change mode to "subscription"');
      if (!j.active) bad("Price is archived/inactive");
    } else bad(`Stripe rejected: ${j.error?.message ?? r.status} (wrong key, wrong mode, or price from a different account/mode)`);
  } catch (e) { warn(`Could not reach Stripe: ${e.message}`); }
}

// ── Email ──
console.log("\nFulfilment email (Resend)");
const rk = env.RESEND_API_KEY, from = env.PASS_EMAIL_FROM;
if (!rk && !from) warn("RESEND_API_KEY / PASS_EMAIL_FROM unset — purchased codes are LOGGED, not emailed");
else {
  void (!rk ? bad("PASS_EMAIL_FROM set but RESEND_API_KEY missing") : ok(`RESEND_API_KEY ${mask(rk)}`));
  void (!from ? bad("RESEND_API_KEY set but PASS_EMAIL_FROM missing") : /@/.test(from) ? ok(`PASS_EMAIL_FROM = ${from}`) : bad(`PASS_EMAIL_FROM "${from}" is not an email address`));
  if (rk && from) {
    try {
      const r = await fetch("https://api.resend.com/domains", { headers: { Authorization: `Bearer ${rk}` } });
      const j = await r.json();
      if (!r.ok) bad(`Resend rejected the key: ${j.message ?? r.status}`);
      else {
        const domain = from.match(/@([^>\s]+)/)?.[1];
        const d = (j.data ?? []).find((x) => x.name === domain);
        void (!d ? bad(`Domain ${domain} is not added in Resend — emails from it will be rejected`) : d.status === "verified" ? ok(`Resend key valid; ${domain} verified`) : bad(`Resend domain ${domain} status is "${d.status}" — finish DNS verification`));
      }
    } catch (e) { warn(`Could not reach Resend: ${e.message}`); }
  }
}

// ── KV ──
console.log("\nSingle-use codes (KV)");
const kvUrl = env.KV_REST_API_URL ?? env.UPSTASH_REDIS_REST_URL, kvTok = env.KV_REST_API_TOKEN ?? env.UPSTASH_REDIS_REST_TOKEN;
if (!kvUrl && !kvTok) warn("KV unset — purchased codes are REUSABLE until you link Vercel KV");
else if (!kvUrl || !kvTok) bad("KV needs both URL and TOKEN");
else {
  try {
    const r = await fetch(kvUrl, { method: "POST", headers: { Authorization: `Bearer ${kvTok}`, "Content-Type": "application/json" }, body: JSON.stringify(["PING"]) });
    const j = await r.json();
    void (r.ok && j.result === "PONG" ? ok(`KV reachable at ${new URL(kvUrl).host}`) : bad(`KV responded ${r.status}: ${JSON.stringify(j).slice(0, 120)}`));
  } catch (e) { bad(`KV unreachable: ${e.message}`); }
}

console.log(`\n${process.exitCode ? "Fix the ✖ items above, then restart the dev server (env changes need a restart)." : "No blocking problems found. Restart the dev server if you just changed .env.local."}\n`);
