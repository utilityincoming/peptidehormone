import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// Stripe webhook receiver. Verifies the signature against STRIPE_WEBHOOK_SECRET
// and handles checkout.session.completed — the point at which a Research Pass
// should be fulfilled (see STRIPE_INTEGRATION_TODO.md).

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
      // TODO: fulfil the Research Pass — e.g. email session.customer_details?.email
      // one of the codes in PASS_CODES, or mint a pass with issuePass() from
      // src/lib/pass.ts and deliver it.
      if (session.consent?.terms_of_service === "accepted") {
        console.log("Customer accepted terms of service");
      }
      if (session.consent?.promotions === "opt_in") {
        console.log("Customer opted in for promotional emails:", session.customer_details?.email);
      }
      break;
    }
    default:
      console.log("Unhandled event type:", event.type);
  }

  return new Response(null, { status: 200 });
}
