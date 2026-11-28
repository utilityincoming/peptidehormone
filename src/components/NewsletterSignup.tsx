"use client";

import { useState } from "react";

type State = "idle" | "loading" | "ok" | "error";

/**
 * Non-intrusive opt-in for new molecules & insights. Posts to /api/subscribe
 * (no accounts, no cookies). Degrades to a clear message when the backend
 * audience isn't configured. Progressive: the input/label work without JS, and
 * JS turns the submit into a fetch so the page never reloads.
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (data.ok) {
        setState("ok");
        setMessage("You're on the list — thanks.");
        setEmail("");
      } else {
        setState("error");
        setMessage(
          data.error === "invalid-email"
            ? "Please enter a valid email address."
            : data.error === "not-configured"
              ? "Sign-up isn't available right now — check back soon."
              : "Something went wrong. Please try again.",
        );
      }
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <p className="font-display text-sm font-semibold text-ink">New molecules &amp; insights</p>
      <p className="mt-1 text-xs leading-5 text-ink/50">
        An occasional note when the catalog or the deep-dives grow. No accounts, unsubscribe anytime.
      </p>
      {state === "ok" ? (
        <p className="mt-3 text-sm text-accent-teal">{message}</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-3 flex flex-wrap gap-2" noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            className="min-w-0 flex-1 rounded-full border border-ink/15 bg-surface px-4 py-2 text-sm text-ink placeholder:text-ink/35 focus:border-accent/50 focus:outline-none"
          />
          {/* Honeypot: hidden from users, catches bots. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20 disabled:opacity-60"
          >
            {state === "loading" ? "…" : "Notify me"}
          </button>
        </form>
      )}
      {state === "error" && <p className="mt-2 text-xs text-ink/50">{message}</p>}
    </div>
  );
}
