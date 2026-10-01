import Stripe from "stripe";
import { stripe, keyModeMismatch } from "@/lib/stripe";

// Creates an embedded-form Checkout Session for the Research Pass and returns
// its client secret to the page at /research/pass. Parameters marked
// fixed_by_ui were configured in Checkout Studio; see STRIPE_INTEGRATION_TODO.md
// for the placeholders that still need real values.

export const dynamic = "force-dynamic";

export async function POST() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return Response.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  // Stripe.js initialises the embedded form with the *publishable* key, and a
  // Checkout Session is only visible to keys of the same mode. A pk_live with
  // an sk_test (or vice versa) yields a session the browser cannot load — the
  // form mounts, then Stripe's init call 404s with "a similar object exists in
  // test mode, but a live mode key was used" and nothing renders. Refuse up
  // front with a message that says what to change.
  const mismatch = keyModeMismatch(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, secretKey);
  if (mismatch) {
    // Non-secret facts about *this* deployment so a stale or shadowed env var
    // can be told apart from a stale deployment. The account prefix is the
    // same one the publishable key exposes in the browser bundle.
    const diagnostics = {
      secretKeyPrefix: secretKey.trim().slice(0, 12) + "…",
      secretKeyLength: secretKey.trim().length,
      vercelEnv: process.env.VERCEL_ENV ?? null,
      deploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
      branch: process.env.VERCEL_GIT_COMMIT_REF ?? null,
    };
    console.error("[stripe]", mismatch, diagnostics);
    return Response.json({ error: mismatch, diagnostics }, { status: 500 });
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
    // Research Pass — one-time price. Price IDs are mode-specific, so
    // STRIPE_PRICE_ID overrides per environment (test key → test price);
    // the fallback is the live-mode Price.
    line_items: [{ price: process.env.STRIPE_PRICE_ID?.trim() || "price_1ULVcYCzcXl8qKy3Sn3oKwy9", quantity: 1 }],
  };

  if (mode === "subscription") {
    params.payment_method_collection = "always";
  }

  try {
    const session = await stripe().checkout.sessions.create(params);
    return Response.json({ client_secret: session.client_secret });
  } catch (err) {
    console.error("[stripe] checkout session error", err);
    // Surface Stripe's own diagnosis (type/code/message — never the key) so a
    // misconfigured Price or API version is visible without reading logs.
    const e = err as Partial<Stripe.errors.StripeError>;
    return Response.json(
      {
        error: "Could not start checkout.",
        stripe: { type: e.type ?? null, code: e.code ?? null, message: e.message ?? null, param: e.param ?? null },
      },
      { status: 502 },
    );
  }
}
