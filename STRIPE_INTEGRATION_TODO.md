# Stripe Integration — Remaining Steps

This file is the single source of truth for finishing the Research Pass checkout.
The integration uses Stripe's **embedded Checkout form** (`ui_mode: "form"`) rendered
at `/research/pass`, with a Next.js App Router route creating the Checkout Session.

## Values to Replace

The following values are placeholders and must be updated before going live.

**Files containing placeholders:**
- [src/app/api/create-checkout-session/route.ts](src/app/api/create-checkout-session/route.ts)
- [.env.example](.env.example)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| mode | payment | Keep `"payment"` for a one-off annual pass. Set to `"subscription"` if the pass becomes recurring (the route then adds `payment_method_collection: "always"` automatically). |
| line_items[].price | price_... | Your actual Stripe Price ID for the Research Pass from the Dashboard (https://dashboard.stripe.com/prices) or API. |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | pk_test_... | Publishable key from https://dashboard.stripe.com/test/apikeys. |
| STRIPE_SECRET_KEY | sk_test_... | Secret key from https://dashboard.stripe.com/test/apikeys. Server only. |
| STRIPE_WEBHOOK_SECRET | whsec_... | Signing secret for the `/api/stripe-webhook` endpoint from https://dashboard.stripe.com/workbench/webhooks. |
| RESEND_API_KEY | (empty) | API key from https://resend.com/api-keys. Without it the webhook logs the code instead of emailing it. |
| PASS_EMAIL_FROM | pass@peptidehormone.com | A sender on a domain verified in Resend. |

## Configured Parameters

These parameters were configured in Checkout Studio and are already set correctly.

**Files containing these parameters:**
- [src/app/api/create-checkout-session/route.ts](src/app/api/create-checkout-session/route.ts)

| Parameter | Value |
|-----------|-------|
| ui_mode | form (Stripe SDK 22.6.2 ≥ 21.0.0; use `custom` if you downgrade below 21) |
| billing_address_collection | auto |
| phone_number_collection | { enabled: false } |
| automatic_tax | { enabled: false } |
| submit_type | auto |
| integration_identifier | custom_embedded_web_0001 |
| payment_method_collection | always — only sent when `mode` is `"subscription"` |

The server client is initialised with API version
`2026-03-25.dahlia; custom_checkout_payment_form_preview=v1` in
[src/lib/stripe.ts](src/lib/stripe.ts); the browser loads Stripe.js from
`https://js.stripe.com/dahlia/stripe.js` with the `custom_checkout_payment_form_1` beta
in [src/components/CheckoutForm.tsx](src/components/CheckoutForm.tsx). Both are required
for the embedded form.

## Setup

1. Copy `.env.example` to `.env.local` and fill in the three Stripe values above
   (plus `ANTHROPIC_API_KEY` and the `PASS_*` values for the research agent).
   On Vercel, add the same variables under Project → Settings → Environment Variables.
2. Create a Product and one-time Price for the Research Pass in the Dashboard and paste
   the Price ID into `line_items` in the checkout route.
3. Register a webhook endpoint at `https://peptidehormone.com/api/stripe-webhook`
   listening for `checkout.session.completed` and
   `checkout.session.async_payment_succeeded`, and copy its signing secret into
   `STRIPE_WEBHOOK_SECRET`. For local testing:
   `stripe listen --forward-to localhost:3000/api/stripe-webhook`.
4. Set `PASS_CHECKOUT_URL=/research/pass` so the "Get a Research Pass" buttons on
   `/research` point at the embedded checkout.
5. Verify your sending domain in Resend, then set `RESEND_API_KEY` and
   `PASS_EMAIL_FROM`. `PASS_SECRET` must be set too — minted codes are signed with it.

Dependency added: `stripe@^22.6.2` (already in `package.json`). No client-side package
is needed; Stripe.js is loaded from Stripe's CDN as PCI requires.

## New files

```
src/lib/stripe.ts                              server-side Stripe client (pinned API version)
src/app/api/create-checkout-session/route.ts   POST → { client_secret }
src/app/api/stripe-webhook/route.ts            POST ← Stripe events; mints + emails the code
src/lib/email.ts                               Resend transport + the pass email
src/components/CheckoutForm.tsx                embedded form (client component)
src/app/research/pass/page.tsx                 the checkout page
.env.example                                   variable names used by the code
```

## How it works

1. A reader opens `/research/pass`. `CheckoutForm` loads Stripe.js, then POSTs to
   `/api/create-checkout-session`.
2. The route creates a Checkout Session with the parameters above and returns its
   `client_secret` as JSON.
3. The browser calls `stripe.initCheckoutFormSdk({ clientSecret, appearance })`, creates
   an expanded-layout form, mounts it in `#checkout-form`, and on the form's `confirm`
   event calls `actions.confirm(...)`.
4. Stripe sends `checkout.session.completed` to `/api/stripe-webhook`. If the session is
   paid, the handler mints a code (`mintCode(PASS_SECRET, session.id)` — deterministic,
   so a retry re-sends the same code) and emails it to `customer_details.email`. The
   buyer enters it on `/research`; `/api/pass` verifies the signature and sets the pass
   cookie. No database is involved.

## Testing

Use test-mode keys. Test cards (any future expiry, any CVC, any postcode):

| Card | Result |
|------|--------|
| 4242 4242 4242 4242 | Succeeds |
| 4000 0025 0000 3155 | Requires 3D Secure authentication |
| 4000 0000 0000 9995 | Declined (insufficient funds) |

More at https://docs.stripe.com/testing.

## Next steps

- **Single-use codes.** Minted codes verify by signature and are not tracked, so one
  could be shared. Add a datastore keyed on the code (or session id) if that matters.
- **Email failures.** A failed send is logged with the code and the buyer's address so
  it can be fulfilled by hand; the webhook still returns 200. Check the Vercel logs for
  `[stripe]` lines after launch.
- **Return URL / confirmation.** Add a success message on `/research/pass` after
  confirmation telling the buyer the code is on its way.
- **Order tracking.** If you later want a record of purchases, persist `session.id`,
  the customer email and `payment_intent` from the webhook. The repo has no datastore
  today, so this was deliberately left out.
- **Stripe review.** Keep the public product description clear that this is educational
  software access, not a physical product, and link terms and a refund policy from the
  checkout page.

## Resources

- https://support.stripe.com
- https://docs.stripe.com/mcp
- https://docs.stripe.com/payments/checkout
