import { NextRequest } from "next/server";
import {
  PASS_COOKIE,
  PASS_MAX_AGE_S,
  QUOTA_COOKIE,
  cookieHeader,
  hasPass,
  issuePass,
  meteringEnabled,
  passConfig,
  readQuota,
  redeemCode,
  remaining,
} from "@/lib/pass";

// Research Pass status + redemption. See src/lib/pass.ts for the model.
//
//   GET  → { enabled, pass, remaining, limit, checkoutUrl }
//   POST { code } → sets the pass cookie on a valid code

export const dynamic = "force-dynamic";

// Redemption attempts are the one brute-forceable surface here; keep them
// rare per IP. In-memory and per-instance, same trade-off as the chat route.
const ATTEMPTS = new Map<string, number[]>();
function tooManyAttempts(ip: string, limit = 10, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const recent = (ATTEMPTS.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  ATTEMPTS.set(ip, recent);
  return recent.length > limit;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const cfg = passConfig();
  if (!meteringEnabled(cfg)) {
    return Response.json({ enabled: false, pass: false, remaining: null, limit: null, checkoutUrl: null });
  }
  const pass = hasPass(request.cookies.get(PASS_COOKIE)?.value, cfg.secret);
  const quota = readQuota(request.cookies.get(QUOTA_COOKIE)?.value, cfg.secret);
  return Response.json({
    enabled: true,
    pass,
    remaining: pass ? null : remaining(quota, cfg),
    limit: cfg.freeDaily,
    checkoutUrl: cfg.checkoutUrl ?? null,
  });
}

export async function POST(request: NextRequest) {
  const cfg = passConfig();
  if (!meteringEnabled(cfg)) {
    return Response.json({ error: "Passes are not enabled on this deployment." }, { status: 404 });
  }
  if (!sameOrigin(request)) {
    return Response.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooManyAttempts(ip)) {
    return Response.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  let code: unknown;
  try {
    code = (await request.json())?.code;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (typeof code !== "string" || code.length > 64 || !redeemCode(code, cfg)) {
    return Response.json({ error: "That code isn't valid." }, { status: 400 });
  }

  const headers = new Headers();
  headers.append("Set-Cookie", cookieHeader(PASS_COOKIE, issuePass(cfg.secret), PASS_MAX_AGE_S));
  return Response.json({ ok: true, pass: true }, { headers });
}
