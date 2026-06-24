"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What is the incretin effect, and why is it blunted in type 2 diabetes?",
  "How do oxytocin and vasopressin differ despite near-identical sequences?",
  "Why does pulsatile vs continuous GnRH exposure have opposite effects?",
  "What does UniProt list as the molecular function of proglucagon?",
];

export default function ResearchAgent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentInitial = useRef(false);

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
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.content }]);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const empty = messages.length === 0;

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
                the state of the evidence. Answers are grounded in PubChem,
                UniProt, ClinicalTrials.gov, and PubMed, with linked citations.
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
            disabled={loading || !input.trim()}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-accent px-5 font-medium text-surface-deep transition-opacity disabled:opacity-40"
          >
            Ask
          </button>
        </form>
      </div>
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
