"use client";

import { useEffect, useRef, useState, type ComponentProps, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

/** What /api/pass reports: whether metering is on, and where this reader stands. */
interface PassStatus {
  enabled: boolean;
  pass: boolean;
  remaining: number | null;
  limit: number | null;
  checkoutUrl: string | null;
}

const SUGGESTIONS = [
  "What is the incretin effect, and why is it blunted in type 2 diabetes?",
  "How do oxytocin and vasopressin differ despite near-identical sequences?",
  "Why does pulsatile vs continuous GnRH exposure have opposite effects?",
  "What doses of semaglutide were studied in STEP 1, and what were the risks?",
];

export default function ResearchAgent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<PassStatus | null>(null);
  const [exhausted, setExhausted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentInitial = useRef(false);

  // Research Pass status — drives the allowance line and the upgrade panel.
  // A failed fetch leaves it null and the UI degrades to the unmetered look.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/pass")
      .then((r) => (r.ok ? r.json() : null))
      .then((s: PassStatus | null) => {
        if (!cancelled && s) setStatus(s);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Prefill / auto-send from a ?q= seed (used by the family hub pages).
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !sentInitial.current) {
      sentInitial.current = true;
      void send(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    setInput("");

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (res.status === 402) {
        // Out of free questions — drop the unsent turn and show the panel.
        setMessages(messages);
        setInput(trimmed);
        setExhausted(true);
        setStatus((s) => (s ? { ...s, remaining: 0 } : s));
      } else if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.content }]);
        if (data.quota && typeof data.quota.remaining === "number") {
          setStatus((s) => (s ? { ...s, remaining: data.quota.remaining } : s));
        }
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const empty = messages.length === 0;
  const metered = Boolean(status?.enabled && !status.pass);

  function onRedeemed() {
    setExhausted(false);
    setStatus((s) => (s ? { ...s, pass: true, remaining: null } : s));
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-6 py-10">
          {empty && !loading ? (
            <div className="pt-6">
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                Research agent
              </h1>
              <p className="mt-4 max-w-xl text-ink/60">
                Ask about any peptide hormone — mechanism, identity, receptors, or
                the state of the evidence, including published dosing regimens.
                The agent checks PubChem, UniProt, ClinicalTrials.gov, and PubMed
                and links its sources. Study doses are not personal prescriptions.
              </p>
              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-xl border border-ink/10 bg-panel/40 p-4 text-left text-sm leading-6 text-ink/75 transition-colors hover:border-accent/50 hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-8 text-xs leading-5 text-ink/40">
                Educational reference only — not medical advice. The agent can be
                wrong; verify against the cited sources.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-accent/15 px-4 py-3 text-[15px] leading-7 text-ink/90">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="prose-agent text-[15px] leading-7 text-ink/80">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD}>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                ),
              )}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-ink/45">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                  Researching — checking sources…
                </div>
              )}
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}
            </div>
          )}
          {exhausted && status && (
            <PassPanel status={status} onRedeemed={onRedeemed} className="mt-8" />
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-ink/[0.06] bg-surface/80 backdrop-blur">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="mx-auto flex w-full max-w-3xl items-end gap-3 px-6 py-4"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder="Ask about a peptide hormone…"
            className="max-h-40 min-h-[2.75rem] flex-1 resize-none rounded-xl border border-ink/15 bg-panel/40 px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus:border-accent/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || exhausted}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-accent px-5 font-medium text-surface-deep transition-opacity disabled:opacity-40"
          >
            Ask
          </button>
        </form>
        {metered && status && typeof status.remaining === "number" && (
          <p className="mx-auto w-full max-w-3xl px-6 pb-3 text-xs leading-5 text-ink/40">
            {status.remaining} of {status.limit} free questions left today
            {status.checkoutUrl && (
              <>
                {" · "}
                <a href={status.checkoutUrl} className="text-accent/80 hover:underline">
                  Get a Research Pass
                </a>
              </>
            )}
          </p>
        )}
        {status?.enabled && status.pass && (
          <p className="mx-auto w-full max-w-3xl px-6 pb-3 text-xs leading-5 text-ink/40">
            Research Pass active — no daily limit.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Shown once the day's free questions are spent. Two ways forward, both
 * optional at the deploy level: a checkout link (Stripe Payment Link or
 * similar) and an access-code box that unlocks the pass cookie via /api/pass.
 */
function PassPanel({
  status,
  onRedeemed,
  className = "",
}: {
  status: PassStatus;
  onRedeemed: () => void;
  className?: string;
}) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function redeem(e: FormEvent) {
    e.preventDefault();
    if (!code.trim() || busy) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (res.ok) onRedeemed();
      else setErr(data?.error ?? "That code isn't valid.");
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 ${className}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-accent/80">Research Pass</p>
      <h2 className="mt-2 font-display text-xl font-semibold text-ink">
        You&rsquo;ve used today&rsquo;s {status.limit} free questions
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-ink/65">
        Every answer here runs live lookups against PubChem, UniProt, ClinicalTrials.gov
        and PubMed, which is what a Research Pass pays for. Your free allowance resets at
        midnight UTC. A pass removes the limit on this device.
      </p>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start">
        {status.checkoutUrl && (
          <a
            href={status.checkoutUrl}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-5 font-medium text-surface-deep"
          >
            Get a Research Pass
          </a>
        )}
        <form onSubmit={redeem} className="flex flex-1 items-center gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Have a code? Enter it here"
            aria-label="Research Pass code"
            autoComplete="off"
            spellCheck={false}
            className="h-11 min-w-0 flex-1 rounded-xl border border-ink/15 bg-panel/40 px-4 text-sm text-ink placeholder:text-ink/35 focus:border-accent/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || !code.trim()}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-accent/50 px-4 text-sm font-medium text-accent transition-opacity disabled:opacity-40"
          >
            Unlock
          </button>
        </form>
      </div>
      {err && <p className="mt-3 text-sm text-red-300">{err}</p>}
    </div>
  );
}

/* Markdown renderers tuned for the dark reference theme. */
const MD = {
  a: (props: ComponentProps<"a">) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
    />
  ),
  p: (props: ComponentProps<"p">) => <p {...props} className="mb-4 last:mb-0" />,
  ul: (props: ComponentProps<"ul">) => <ul {...props} className="mb-4 list-disc space-y-1 pl-5" />,
  ol: (props: ComponentProps<"ol">) => <ol {...props} className="mb-4 list-decimal space-y-1 pl-5" />,
  li: (props: ComponentProps<"li">) => <li {...props} className="leading-7" />,
  strong: (props: ComponentProps<"strong">) => <strong {...props} className="font-semibold text-ink" />,
  h1: (props: ComponentProps<"h1">) => <h2 {...props} className="mb-3 mt-6 font-display text-xl font-semibold text-ink" />,
  h2: (props: ComponentProps<"h2">) => <h2 {...props} className="mb-3 mt-6 font-display text-xl font-semibold text-ink" />,
  h3: (props: ComponentProps<"h3">) => <h3 {...props} className="mb-2 mt-5 font-display text-lg font-semibold text-ink" />,
  code: (props: ComponentProps<"code">) => (
    <code {...props} className="rounded bg-ink/10 px-1.5 py-0.5 font-mono text-[13px]" />
  ),
};
