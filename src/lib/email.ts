// Transactional email for pass fulfilment. Resend's HTTP API over fetch — no
// SDK, no dependency. Disabled (returns { sent: false }) unless RESEND_API_KEY
// and PASS_EMAIL_FROM are set, so the webhook still succeeds without it and
// the code is left in the logs for manual delivery.

export interface EmailConfig {
  apiKey?: string;
  from?: string;
  replyTo?: string;
}

export function emailConfig(env: Record<string, string | undefined> = process.env): EmailConfig {
  return {
    apiKey: env.RESEND_API_KEY?.trim() || undefined,
    from: env.PASS_EMAIL_FROM?.trim() || undefined,
    replyTo: env.PASS_EMAIL_REPLY_TO?.trim() || undefined,
  };
}

export function emailEnabled(cfg: EmailConfig): cfg is EmailConfig & { apiKey: string; from: string } {
  return Boolean(cfg.apiKey && cfg.from);
}

export interface PassEmail {
  to: string;
  code: string;
  /** Absolute URL of the research agent, for the button. */
  researchUrl: string;
}

export function passEmailSubject(): string {
  return "Your PeptideHormone Research Pass code";
}

export function passEmailText({ code, researchUrl }: PassEmail): string {
  return [
    "Thanks for buying a Research Pass.",
    "",
    `Your access code: ${code}`,
    "",
    `Open ${researchUrl}, ask a question, and when the free allowance runs out enter`,
    "the code in the \"Have a code?\" box. The pass is stored on that device for a year.",
    "",
    "Educational reference only — not medical advice.",
    "",
    "PeptideHormone.com",
  ].join("\n");
}

export function passEmailHtml({ code, researchUrl }: PassEmail): string {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  return `<!doctype html>
<html><body style="margin:0;padding:32px 16px;background:#0b0c10;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#e7e7ea">
  <div style="max-width:520px;margin:0 auto">
    <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7c83ff;margin:0 0 12px">Research Pass</p>
    <h1 style="font-size:22px;margin:0 0 16px">Thanks for buying a Research Pass</h1>
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;color:#c9c9d1">Your access code:</p>
    <p style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:20px;letter-spacing:.06em;background:#15161c;border:1px solid #2a2b33;border-radius:10px;padding:14px 18px;margin:0 0 24px">${esc(code)}</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 24px;color:#c9c9d1">Open the research agent, ask a question, and when the free allowance runs out enter the code in the &ldquo;Have a code?&rdquo; box. The pass is stored on that device for a year.</p>
    <p style="margin:0 0 32px"><a href="${esc(researchUrl)}" style="display:inline-block;background:#7c83ff;color:#0b0c10;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:10px">Open the research agent</a></p>
    <p style="font-size:12px;line-height:1.6;color:#7d7e88;margin:0">Educational reference only &mdash; not medical advice.<br>PeptideHormone.com</p>
  </div>
</body></html>`;
}

/** Send the pass email. Throws on a non-2xx from Resend so the caller can log it. */
export async function sendPassEmail(msg: PassEmail, cfg: EmailConfig = emailConfig()): Promise<{ sent: boolean; id?: string }> {
  if (!emailEnabled(cfg)) return { sent: false };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: cfg.from,
      to: [msg.to],
      ...(cfg.replyTo ? { reply_to: cfg.replyTo } : {}),
      subject: passEmailSubject(),
      text: passEmailText(msg),
      html: passEmailHtml(msg),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const data = (await res.json()) as { id?: string };
  return { sent: true, id: data.id };
}
