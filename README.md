This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Research Pass (metered research agent)

`/research` bills the Anthropic API per question, so it can be metered. Metering is
**off** unless `PASS_SECRET` is set; with it unset the agent behaves as before.

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Required for the research agent at all. |
| `PASS_SECRET` | HMAC key for the quota and pass cookies. Setting it turns metering on. |
| `PASS_FREE_DAILY` | Free questions per UTC day per device (default `5`). |
| `PASS_CODES` | Comma-separated access codes that unlock a pass for a year. |
| `PASS_CHECKOUT_URL` | Where "Get a Research Pass" sends readers, e.g. a Stripe Payment Link. |

Readers without a pass get a signed, HttpOnly quota cookie that rolls over at UTC
midnight; the chat route returns `402` with `code: "quota_exhausted"` once it is spent.
Redeeming a code at `POST /api/pass` sets the pass cookie. See `src/lib/pass.ts`.

Purchases go through Stripe embedded Checkout at `/research/pass`. On
`checkout.session.completed` the webhook mints a signed code from the session id
(retries re-send the same code) and emails it via Resend when `RESEND_API_KEY` and
`PASS_EMAIL_FROM` are set; otherwise the code is logged for manual delivery. Minted
codes verify by signature; with Vercel KV linked (`KV_REST_API_URL`/`KV_REST_API_TOKEN`)
each is redeemable exactly once. `STRIPE_INTEGRATION_TODO.md`
lists the remaining Stripe setup.
