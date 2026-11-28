import { NextResponse } from "next/server";
import { addContact, isValidEmail, newsletterConfig, newsletterEnabled } from "@/lib/newsletter";

export const runtime = "nodejs";

// Opt-in newsletter capture. No accounts, no cookies: validate an email and hand
// it to the Resend audience. Blocked from crawling by robots.ts (/api/*).
export async function POST(req: Request): Promise<NextResponse> {
  let email = "";
  let honeypot = "";
  try {
    const body = (await req.json()) as { email?: unknown; company?: unknown };
    email = String(body?.email ?? "").trim().toLowerCase();
    honeypot = String(body?.company ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  // Hidden honeypot field: real users leave it empty. Pretend success for bots.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 });
  }

  const cfg = newsletterConfig();
  if (!newsletterEnabled(cfg)) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }

  try {
    await addContact(email, cfg);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("newsletter subscribe failed:", err);
    return NextResponse.json({ ok: false, error: "failed" }, { status: 502 });
  }
}
