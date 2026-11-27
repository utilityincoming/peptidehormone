import { clientIp, rateLimited } from "@/lib/rate-limit";

// Stub list signup. Validates the address and acknowledges it. Wire a provider
// later; do not log the full address.

export async function POST(request: Request) {
  if (await rateLimited("newsletter", clientIp(request), 5, 60_000)) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }
  let email = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim();
  } catch {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return Response.json({ error: "Enter a valid email." }, { status: 400 });
  }
  console.log(`[newsletter] signup accepted, domain ${email.split("@")[1]}`);
  return Response.json({ ok: true });
}
