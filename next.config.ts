import type { NextConfig } from "next";

// Content Security Policy.
// - Next.js hydration + JSON-LD blocks are inline scripts, so 'unsafe-inline' is
//   required for script-src without a nonce (a nonce would force dynamic rendering
//   and defeat static prerendering). 'unsafe-eval' is deliberately NOT allowed.
// - Fonts are self-hosted via next/font, so no external font origins.
// - Vercel Analytics loads from va.vercel-scripts.com and posts to
//   vitals.vercel-insights.com.
// - The research agent is called from the client via the same-origin /api/chat
//   route (the Anthropic key stays server-side), so connect-src 'self' covers it.
// - No iframes, remote images, blobs, or workers are used — except on
//   /research/pass, where Stripe's embedded Checkout form needs its script,
//   iframe, API and telemetry origins. That page gets its own, wider policy
//   (see stripeCsp); everywhere else stays locked down.
const cspDirectives = {
  "default-src": "'self'",
  "base-uri": "'self'",
  "object-src": "'none'",
  "frame-ancestors": "'none'",
  "frame-src": "'none'",
  "form-action": "'self'",
  "script-src": "'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src": "'self' 'unsafe-inline'",
  "img-src": "'self' data:",
  "font-src": "'self' data:",
  "connect-src": "'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "media-src": "'self'",
  "manifest-src": "'self'",
  "worker-src": "'self'",
  "upgrade-insecure-requests": "",
};

const STRIPE_JS = "https://js.stripe.com";
const stripeCspDirectives = {
  ...cspDirectives,
  "script-src": `${cspDirectives["script-src"]} ${STRIPE_JS}`,
  "frame-src": `${STRIPE_JS} https://hooks.stripe.com`,
  "connect-src": `${cspDirectives["connect-src"]} https://api.stripe.com https://merchant-ui-api.stripe.com https://r.stripe.com https://m.stripe.network https://m.stripe.com`,
  "img-src": `${cspDirectives["img-src"]} https://*.stripe.com`,
};

const joinCsp = (d: Record<string, string>) =>
  Object.entries(d).map(([k, v]) => (v ? `${k} ${v}` : k)).join("; ");

const csp = joinCsp(cspDirectives);
const stripeCsp = joinCsp(stripeCspDirectives);

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // No remote images are used; keep the optimizer closed to third-party hosts.
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },
  async headers() {
    const stripeHeaders = securityHeaders.map((h) =>
      h.key === "Content-Security-Policy"
        ? { key: h.key, value: stripeCsp }
        : h.key === "Permissions-Policy"
          ? { key: h.key, value: h.value.replace("payment=()", `payment=(self "${STRIPE_JS}")`) }
          : h,
    );
    return [
      // Everything except the checkout page: the strict policy.
      { source: "/((?!research/pass$).*)", headers: securityHeaders },
      // The checkout page: same headers, with Stripe's origins admitted.
      { source: "/research/pass", headers: stripeHeaders },
    ];
  },
};

export default nextConfig;
