import type { NextConfig } from "next";

// Security headers other than Content-Security-Policy. The script policy is a
// per-request nonce set in src/middleware.ts so script-src does not need
// 'unsafe-inline'. Checkout still widens Permissions-Policy for Stripe here.
const STRIPE_JS = "https://js.stripe.com";

const securityHeaders = [
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
  async redirects() {
    return [
      // A mistyped family slug that was linked and crawled.
      { source: "/families/reproductive", destination: "/families/reproductive-gonadal", permanent: true },
    ];
  },
  async headers() {
    const stripeHeaders = securityHeaders.map((h) =>
      h.key === "Permissions-Policy"
        ? { key: h.key, value: h.value.replace("payment=()", `payment=(self "${STRIPE_JS}")`) }
        : h,
    );
    return [
      { source: "/((?!research/pass$).*)", headers: securityHeaders },
      { source: "/research/pass", headers: stripeHeaders },
    ];
  },
};

export default nextConfig;
