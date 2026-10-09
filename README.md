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

`/research` bills a model provider per question, so it can be metered. Metering is
**off** unless `PASS_SECRET` is set; with it unset the agent behaves as before.

The research agent calls **Venice first, then fails over to Anthropic** on any
upstream failure (misconfiguration, non-2xx, timeout, malformed or empty
completion). Configuring at least one provider is required; configuring both
gives primary + failover. Venice's own default system prompt is disabled so the
site's educational, no-dosing system prompt stays authoritative on both.

| Variable | Purpose |
| --- | --- |
| `VENICE_API_KEY` | Primary research-agent provider (OpenAI-compatible). When set, used first. |
| `VENICE_MODEL` | Venice model id or trait alias (default `default_reasoning`). |
| `ANTHROPIC_API_KEY` | Failover provider; used when Venice is unset or fails. One of this or `VENICE_API_KEY` is required for the agent to run. |
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

## Search Console and indexing

Crawl surface is defined in `src/app/robots.ts` (allows everything but `/api/`) and
`src/app/sitemap.ts` (hubs, vendors, families, insights, molecules, tools, and one
direction of each comparison pair). Every indexable page sets its own canonical URL;
`/search` and `/research/pass` are `noindex`. Comparison pages render in both orders
(`a-vs-b` and `b-vs-a`) but canonicalise to one — parent/native molecule first, otherwise
alphabetical (`canonicalComparePair` in `src/lib/compare.ts`) — so Search Console does not
report them as duplicates.

| Variable | Purpose |
| --- | --- |
| `GOOGLE_SITE_VERIFICATION` | Content value of the Search Console HTML-tag verification. Emits `<meta name="google-site-verification">` site-wide; leave unset if the property is verified via DNS or Vercel. |

After deploying, submit `https://peptidehormone.com/sitemap.xml` once under *Sitemaps* in
Search Console; it is regenerated on every build.
