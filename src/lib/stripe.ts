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

const keyMode = (key: string | undefined) => key?.trim().match(/^[ps]k_(test|live)_/)?.[1];

/**
 * A Checkout Session is only visible to keys of the same mode as the one that
 * created it, so a live publishable key with a test secret key (or vice versa)
 * mounts an embedded form that never renders. Returns an actionable message
 * when the two keys disagree, else null.
 */
export function keyModeMismatch(publishable: string | undefined, secret: string | undefined): string | null {
  const pk = keyMode(publishable);
  const sk = keyMode(secret);
  if (!pk || !sk || pk === sk) return null;
  return `Stripe key mode mismatch: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is ${pk} but STRIPE_SECRET_KEY is ${sk}. Set both to the same mode (and STRIPE_PRICE_ID to a Price from that mode).`;
}
