import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// Creates an embedded-form Checkout Session for the Research Pass and returns
// its client secret to the page at /research/pass. Parameters marked
// fixed_by_ui were configured in Checkout Studio; see STRIPE_INTEGRATION_TODO.md
// for the placeholders that still need real values.

export const dynamic = "force-dynamic";

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  // TODO: set to "subscription" if the Research Pass becomes recurring.
  const mode: Stripe.Checkout.SessionCreateParams.Mode = "payment";

  const params: Stripe.Checkout.SessionCreateParams = {
    ui_mode: "form",
    mode,
    billing_address_collection: "auto",
    phone_number_collection: { enabled: false },
    automatic_tax: { enabled: false },
    submit_type: "auto",
    integration_identifier: "custom_embedded_web_0001",
    // Research Pass — one-time price (see STRIPE_INTEGRATION_TODO.md).
    line_items: [{ price: "price_1ULVcYCzcXl8qKy3Sn3oKwy9", quantity: 1 }],
  };

  if (mode === "subscription") {
    params.payment_method_collection = "always";
  }

  try {
    const session = await stripe().checkout.sessions.create(params);
    return Response.json({ client_secret: session.client_secret });
  } catch (err) {
    console.error("[stripe] checkout session error", err);
    return Response.json({ error: "Could not start checkout." }, { status: 502 });
  }
}
