"use client";

import { useState } from "react";

/** Email capture for new molecules and insights. No account. */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? "ok" : "err");
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 max-w-sm">
      <p className="text-sm font-medium text-ink">New molecules and insights</p>
      <p className="mt-1 text-xs leading-5 text-muted">
        Occasional notes when a monograph or essay is added. No account.
      </p>
      <div className="mt-3 flex gap-2">
        <label className="sr-only" htmlFor="newsletter-email">Email</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@lab.edu"
          className="min-w-0 flex-1 rounded-xl border border-ink/15 bg-surface px-3 py-2 text-sm text-ink"
        />
        <button type="submit" className="rounded-xl bg-accent px-3 py-2 text-sm text-surface">
          Send
        </button>
      </div>
      {status === "ok" && <p className="mt-2 text-xs text-accent-teal">Saved. We’ll use this only for that list.</p>}
      {status === "err" && <p className="mt-2 text-xs text-accent-rose">Could not save that address. Try again later.</p>}
    </form>
  );
}
