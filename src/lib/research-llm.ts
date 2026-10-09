// Provider abstraction for the research agent's model calls.
//
// The conversation is kept in Anthropic's message/content-block format as the
// canonical representation. Venice (an OpenAI-compatible endpoint) is tried
// FIRST when configured; on any failure — misconfiguration, non-2xx, timeout,
// malformed body, or an empty completion — the call falls over to Anthropic.
// Because the canonical format is provider-neutral and tool-call ids round-trip
// through both adapters, failover can happen on any round of the agentic loop,
// even mid-tool-use.
//
// Guardrails are intentionally preserved across providers: the site's system
// prompt is sent verbatim to both, and Venice's own default system prompt is
// disabled (`include_venice_system_prompt: false`) so the educational,
// no-dosing positioning in route.ts stays authoritative.

import type { AgentTool } from "@/lib/agent-tools";

export type Msg = { role: "user" | "assistant"; content: unknown };

export interface ModelResult {
  ok: boolean;
  status: number;
  data?: { content: unknown[]; stop_reason?: string };
  errorText?: string;
  /** Which provider produced this result (for logging/debug). */
  provider?: string;
}

export interface ModelCallConfig {
  system: string;
  tools: AgentTool[];
  maxTokens: number;
  effort: string;
  timeoutMs: number;
  /** Forbid tool calls so the model must answer in text (final round). */
  forceText?: boolean;
  debug?: boolean;
}

const ANTHROPIC_MODEL = "claude-opus-4-8";
const VENICE_URL = "https://api.venice.ai/api/v1/chat/completions";
// Default to a Venice trait alias rather than a concrete id so the mapping
// tracks Venice's current catalog instead of pinning a model that may be
// retired. See GET /models/traits.
const VENICE_MODEL = process.env.VENICE_MODEL?.trim() || "default_reasoning";

// ── Anthropic provider ───────────────────────────────────────────────────────

async function callAnthropic(
  apiKey: string,
  messages: Msg[],
  cfg: ModelCallConfig,
): Promise<ModelResult> {
  let res: Response;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: cfg.maxTokens,
        thinking: { type: "adaptive" },
        output_config: { effort: cfg.effort },
        // Static system prompt sent as a cached block so reuse bills at ~0.1x.
        system: [{ type: "text", text: cfg.system, cache_control: { type: "ephemeral" } }],
        tools: cfg.tools,
        ...(cfg.forceText ? { tool_choice: { type: "none" } } : {}),
        messages,
      }),
      signal: AbortSignal.timeout(cfg.timeoutMs),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "network error";
    return { ok: false, status: 0, errorText: msg, provider: "anthropic" };
  }

  const text = await res.text();
  if (!res.ok) return { ok: false, status: res.status, errorText: text, provider: "anthropic" };
  try {
    return { ok: true, status: res.status, data: JSON.parse(text), provider: "anthropic" };
  } catch {
    return { ok: false, status: 502, errorText: "Malformed upstream response", provider: "anthropic" };
  }
}

// ── Venice provider (OpenAI-compatible) ──────────────────────────────────────

/** Anthropic tool schema → OpenAI function-tool schema. */
function toOpenAITools(tools: AgentTool[]) {
  return tools.map((t) => ({
    type: "function" as const,
    function: { name: t.name, description: t.description, parameters: t.input_schema },
  }));
}

/** Coerce an Anthropic tool_result's content into a plain string for OpenAI. */
function toolResultToString(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((b) =>
        b && typeof b === "object" && (b as { type?: string }).type === "text"
          ? (b as { text: string }).text
          : typeof b === "string"
            ? b
            : JSON.stringify(b),
      )
      .join("\n");
  }
  return JSON.stringify(content ?? "");
}

type OpenAIMessage =
  | { role: "system" | "user"; content: string }
  | {
      role: "assistant";
      content: string | null;
      tool_calls?: { id: string; type: "function"; function: { name: string; arguments: string } }[];
    }
  | { role: "tool"; tool_call_id: string; content: string };

/** Canonical Anthropic-format messages → OpenAI chat messages. */
function toOpenAIMessages(system: string, messages: Msg[]): OpenAIMessage[] {
  const out: OpenAIMessage[] = [{ role: "system", content: system }];

  for (const m of messages) {
    // String content: a plain user or assistant turn.
    if (typeof m.content === "string") {
      out.push({ role: m.role, content: m.content } as OpenAIMessage);
      continue;
    }

    const blocks = Array.isArray(m.content) ? (m.content as Record<string, unknown>[]) : [];

    if (m.role === "assistant") {
      const text = blocks
        .filter((b) => b.type === "text")
        .map((b) => b.text as string)
        .join("\n");
      const toolCalls = blocks
        .filter((b) => b.type === "tool_use")
        .map((b) => ({
          id: b.id as string,
          type: "function" as const,
          function: { name: b.name as string, arguments: JSON.stringify(b.input ?? {}) },
        }));
      out.push({
        role: "assistant",
        content: text || null,
        ...(toolCalls.length ? { tool_calls: toolCalls } : {}),
      });
      continue;
    }

    // User role carrying tool_result blocks → one OpenAI `tool` message each.
    const toolResults = blocks.filter((b) => b.type === "tool_result");
    if (toolResults.length) {
      for (const tr of toolResults) {
        out.push({
          role: "tool",
          tool_call_id: tr.tool_use_id as string,
          content: toolResultToString(tr.content),
        });
      }
      continue;
    }

    // Any other user content: collapse text blocks to a string.
    const text = blocks
      .filter((b) => b.type === "text")
      .map((b) => b.text as string)
      .join("\n");
    out.push({ role: "user", content: text });
  }

  return out;
}

/** OpenAI finish_reason → Anthropic stop_reason. */
function toStopReason(finish: string | undefined, hasToolCalls: boolean): string {
  if (hasToolCalls) return "tool_use";
  switch (finish) {
    case "length":
      return "max_tokens";
    case "content_filter":
      return "refusal";
    default:
      return "end_turn";
  }
}

async function callVenice(
  apiKey: string,
  messages: Msg[],
  cfg: ModelCallConfig,
): Promise<ModelResult> {
  let res: Response;
  try {
    res = await fetch(VENICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: VENICE_MODEL,
        max_tokens: cfg.maxTokens,
        messages: toOpenAIMessages(cfg.system, messages),
        tools: toOpenAITools(cfg.tools),
        tool_choice: cfg.forceText ? "none" : "auto",
        // Keep OUR guardrails authoritative; don't prepend Venice's own prompt.
        venice_parameters: { include_venice_system_prompt: false },
      }),
      signal: AbortSignal.timeout(cfg.timeoutMs),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "network error";
    return { ok: false, status: 0, errorText: msg, provider: "venice" };
  }

  const text = await res.text();
  if (!res.ok) return { ok: false, status: res.status, errorText: text, provider: "venice" };

  let parsed: {
    choices?: {
      finish_reason?: string;
      message?: {
        content?: string | null;
        tool_calls?: { id: string; function: { name: string; arguments: string } }[];
      };
    }[];
  };
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, status: 502, errorText: "Malformed Venice response", provider: "venice" };
  }

  const choice = parsed.choices?.[0];
  const message = choice?.message;
  if (!message) {
    return { ok: false, status: 502, errorText: "Empty Venice completion", provider: "venice" };
  }

  // Normalize OpenAI message → Anthropic content blocks.
  const content: unknown[] = [];
  if (message.content) content.push({ type: "text", text: message.content });
  const toolCalls = message.tool_calls ?? [];
  for (const tc of toolCalls) {
    let input: Record<string, unknown> = {};
    try {
      input = tc.function.arguments ? JSON.parse(tc.function.arguments) : {};
    } catch {
      input = {};
    }
    content.push({ type: "tool_use", id: tc.id, name: tc.function.name, input });
  }

  // A completion with neither text nor tool calls is useless — fail over.
  if (content.length === 0) {
    return { ok: false, status: 502, errorText: "Empty Venice completion", provider: "venice" };
  }

  const stop_reason = toStopReason(choice?.finish_reason, toolCalls.length > 0);
  return { ok: true, status: 200, data: { content, stop_reason }, provider: "venice" };
}

// ── Failover dispatcher ──────────────────────────────────────────────────────

/** True when at least one provider is configured. */
export function researchModelConfigured(): boolean {
  return !!(process.env.VENICE_API_KEY || process.env.ANTHROPIC_API_KEY);
}

/**
 * Call the research model with Venice-primary, Anthropic-failover ordering.
 * Returns the first successful provider result; if every configured provider
 * fails, returns the last failure.
 */
export async function callResearchModel(messages: Msg[], cfg: ModelCallConfig): Promise<ModelResult> {
  const veniceKey = process.env.VENICE_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  const providers: (() => Promise<ModelResult>)[] = [];
  if (veniceKey) providers.push(() => callVenice(veniceKey, messages, cfg));
  if (anthropicKey) providers.push(() => callAnthropic(anthropicKey, messages, cfg));

  let last: ModelResult = {
    ok: false,
    status: 500,
    errorText: "No model provider configured (set VENICE_API_KEY and/or ANTHROPIC_API_KEY).",
  };

  for (const run of providers) {
    const result = await run();
    if (result.ok) return result;
    last = result;
    if (cfg.debug) {
      console.error(
        `[chat] provider ${result.provider} failed (${result.status}): ${result.errorText?.slice(0, 300)}`,
      );
    }
  }

  return last;
}
