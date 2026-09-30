import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { meteringEnabled, mintCode, passConfig } from "@/lib/pass";
import { emailConfig, emailEnabled, sendPassEmail } from "@/lib/email";

// Stripe webhook receiver. Verifies the signature against STRIPE_WEBHOOK_SECRET
// and fulfils checkout.session.completed: mint a Research Pass code from the
// session id (deterministic, so a retried event re-sends the same code) and
// email it to the buyer. If email isn't configured the code is logged for
// manual delivery and the event is still acknowledged.

const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://peptidehormone.com";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  const raw = await request.text();

  let event: Stripe.Event;
  try {
    if (secret) {
      if (!signature) return new Response("Missing signature", { status: 400 });
      event = stripe().webhooks.constructEvent(raw, signature, secret);
    } else {
      event = JSON.parse(raw) as Stripe.Event;
    }
  } catch (err) {
    console.log("Webhook signature verification failed.", (err as Error).message);
    return new Response("Bad signature", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("Checkout completed:", session.id);

      // Only fulfil paid sessions; async payment methods complete later via
      // checkout.session.async_payment_succeeded, which falls through below.
      if (session.payment_status !== "paid") break;
      await fulfil(session);
      break;
    }
    case "checkout.session.async_payment_succeeded": {
      await fulfil(event.data.object);
      break;
    }
    default:
      console.log("Unhandled event type:", event.type);
  }

  return new Response(null, { status: 200 });
}

async function fulfil(session: Stripe.Checkout.Session) {
  const pass = passConfig();
  if (!meteringEnabled(pass)) {
    console.error(`[stripe] ${session.id}: PASS_SECRET is unset — cannot mint a code.`);
    return;
  }
  const email = session.customer_details?.email ?? session.customer_email;
  const code = mintCode(pass.secret, session.id);

  if (!email) {
    console.error(`[stripe] ${session.id}: no customer email on session; code ${code} needs manual delivery.`);
    return;
  }

  const mail = emailConfig();
  if (!emailEnabled(mail)) {
    console.warn(`[stripe] ${session.id}: email not configured; send ${code} to ${email} manually.`);
    return;
  }

  try {
    const r = await sendPassEmail({ to: email, code, researchUrl: `${SITE}/research` }, mail);
    console.log(`[stripe] ${session.id}: pass code emailed to ${email} (${r.id ?? "no id"})`);
  } catch (err) {
    // Log with the code so a failed send can be fulfilled by hand; return 200
    // regardless — Stripe retrying would re-mint the same code and re-send.
    console.error(`[stripe] ${session.id}: email failed; send ${code} to ${email} manually.`, err);
  }
}
