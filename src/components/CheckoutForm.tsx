"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Embedded Stripe Checkout form for the Research Pass. Stripe.js is loaded
// from js.stripe.com (never bundled — PCI requirement); the `dahlia` build
// provides initCheckoutFormSdk.

const APPEARANCE = {
  theme: "stripe",
  labels: "auto",
  inputs: "spaced",
  variables: {
    borderRadius: "4px",
    colorBackground: "#ffffff",
    colorDanger: "#df1b41",
    colorPrimary: "#0570de",
    colorSuccess: "#00c853",
    colorText: "#30313d",
    fontFamily: "default",
    fontSizeBase: "16px",
    spacingUnit: "4px",
  },
};

/* Minimal typing for the beta Checkout Form SDK surface we use. */
interface CheckoutForm {
  mount(selector: string): void;
  on(event: "confirm", handler: (event: unknown) => void): void;
}
interface CheckoutSdk {
  createForm(opts: { layout: "expanded" }): CheckoutForm;
  loadActions(): Promise<
    | { type: "success"; actions: { confirm(opts: { formConfirmEvent: unknown }): Promise<unknown> } }
    | { type: "error"; error: unknown }
  >;
}
interface StripeJs {
  initCheckoutFormSdk(opts: { clientSecret: Promise<string>; appearance: typeof APPEARANCE }): CheckoutSdk;
}
declare global {
  interface Window {
    Stripe?: (key: string, opts?: { betas?: string[] }) => StripeJs;
  }
}

export default function CheckoutForm() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ready || started.current) return;
    started.current = true;

    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key || !window.Stripe) {
      setError("Checkout is not configured.");
      return;
    }

    const stripe = window.Stripe(key, { betas: ["custom_checkout_payment_form_1"] });

    const clientSecret = fetch("/api/create-checkout-session", { method: "POST" })
      .then((r) => r.json())
      .then((json) => {
        if (!json.client_secret) {
          // Include Stripe's own diagnosis when the route forwards one.
          const detail = json.stripe?.message ? ` (${json.stripe.message})` : "";
          throw new Error(`${json.error ?? "No client secret"}${detail}`);
        }
        return json.client_secret as string;
      });
    // Stripe.js consumes the promise itself and swallows a rejection, so the
    // form would simply stay blank. Surface the server's message as well.
    clientSecret.catch((err: Error) => setError(err.message));

    (async () => {
      try {
        const checkout = stripe.initCheckoutFormSdk({ clientSecret, appearance: APPEARANCE });
        const form = checkout.createForm({ layout: "expanded" });
        form.mount("#checkout-form");

        const loadActionsResult = await checkout.loadActions();
        if (loadActionsResult.type === "success") {
          form.on("confirm", async (event) => {
            try {
              await loadActionsResult.actions.confirm({ formConfirmEvent: event });
            } catch (err) {
              console.error("Payment confirmation error:", err);
            }
          });
        }
      } catch (err) {
        console.error(err);
        setError("Could not start checkout. Please try again.");
      }
    })();
  }, [ready]);

  return (
    <>
      <Script src="https://js.stripe.com/dahlia/stripe.js" strategy="afterInteractive" onLoad={() => setReady(true)} />
      <div id="checkout-form" className="rounded-2xl bg-white p-4" />
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </>
  );
}
