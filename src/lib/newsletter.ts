// Newsletter opt-in capture via Resend Audiences (HTTP API over fetch — no SDK,
// no dependency). Disabled (returns { stored: false }) unless RESEND_API_KEY and
// NEWSLETTER_AUDIENCE_ID are set, so the signup form degrades gracefully instead
// of collecting addresses with nowhere to send them. No accounts, no passwords.

export interface NewsletterConfig {
  apiKey?: string;
  audienceId?: string;
}

export function newsletterConfig(env: Record<string, string | undefined> = process.env): NewsletterConfig {
  return {
    apiKey: env.RESEND_API_KEY?.trim() || undefined,
    audienceId: env.NEWSLETTER_AUDIENCE_ID?.trim() || undefined,
  };
}

export function newsletterEnabled(cfg: NewsletterConfig): cfg is NewsletterConfig & { apiKey: string; audienceId: string } {
  return Boolean(cfg.apiKey && cfg.audienceId);
}

// Deliberately conservative: one @, a dot in the domain, no spaces, length-capped.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return email.length >= 3 && email.length <= 254 && EMAIL_RE.test(email);
}

/** Add a contact to the Resend audience. Throws on a non-2xx so the caller can log it. */
export async function addContact(email: string, cfg: NewsletterConfig = newsletterConfig()): Promise<{ stored: boolean }> {
  if (!newsletterEnabled(cfg)) return { stored: false };
  const res = await fetch(`https://api.resend.com/audiences/${cfg.audienceId}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return { stored: true };
}
