import Stripe from "stripe";

// Server-side Stripe client. The API version carries the beta flag the
// embedded Checkout form (initCheckoutFormSdk) requires.
export const STRIPE_API_VERSION = "2026-03-25.dahlia; custom_checkout_payment_form_preview=v1";

let client: Stripe | null = null;

export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  if (!client) {
    client = new Stripe(key, {
      apiVersion: STRIPE_API_VERSION as Stripe.StripeConfig["apiVersion"],
    });
  }
  return client;
}
