import { NextRequest, NextResponse } from "next/server";

// Per-request script nonce so script-src can omit 'unsafe-inline'.
// Next reads `x-nonce` and stamps its own runtime scripts. JSON-LD does the
// same in JsonLd. style-src stays 'unsafe-inline' because Tailwind and
// next/font emit inline style attributes. A nonce on the HTML means the
// document cannot be served from a fully static cache.

const STRIPE_JS = "https://js.stripe.com";

function csp(nonce: string, stripe: boolean): string {
  const script = [
    "'self'",
    `'nonce-${nonce}'`,
    "https://va.vercel-scripts.com",
    stripe ? STRIPE_JS : "",
  ]
    .filter(Boolean)
    .join(" ");
  const frame = stripe ? `${STRIPE_JS} https://hooks.stripe.com` : "'none'";
  const connect = [
    "'self'",
    "https://vitals.vercel-insights.com",
    "https://va.vercel-scripts.com",
    stripe
      ? "https://api.stripe.com https://merchant-ui-api.stripe.com https://r.stripe.com https://m.stripe.network https://m.stripe.com"
      : "",
  ]
    .filter(Boolean)
    .join(" ");
  const img = stripe ? "'self' data: https://*.stripe.com" : "'self' data:";
  const directives: Record<string, string> = {
    "default-src": "'self'",
    "base-uri": "'self'",
    "object-src": "'none'",
    "frame-ancestors": "'none'",
    "frame-src": frame,
    "form-action": "'self'",
    "script-src": script,
    "style-src": "'self' 'unsafe-inline'",
    "img-src": img,
    "font-src": "'self' data:",
    "connect-src": connect,
    "media-src": "'self'",
    "manifest-src": "'self'",
    "worker-src": "'self'",
    "upgrade-insecure-requests": "",
  };
  return Object.entries(directives)
    .map(([k, v]) => (v ? `${k} ${v}` : k))
    .join("; ");
}

export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const stripe = request.nextUrl.pathname === "/research/pass";
  const policy = csp(nonce, stripe);
  const requestHeaders = new Headers(request.headers);
  // Next stamps its own scripts from the nonce in this request header.
  requestHeaders.set("Content-Security-Policy", policy);
  requestHeaders.set("x-nonce", nonce);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", policy);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)"],
};
