// Meta-description composition. Catalog and family records keep a terse
// `summary` / `tagline` for cards and heroes; those same one-liners were being
// emitted verbatim as <meta name="description">, leaving many pages well under
// the ~150–160 characters search engines will render. This composer keeps the
// visible one-liner untouched and lengthens only the meta/OG description by
// appending whole sentences of the page's own hand-written prose (a hormone's
// mechanism, a family's overview), clamped to a search-friendly length.

/** Longest meta description we emit. Google renders ~155–160 chars. */
const MAX = 158;
/** Below this, a description is worth enriching from body prose. */
const ENRICH_BELOW = MAX - 20;

/** Split prose into whole sentences, keeping terminal punctuation. */
function sentences(text: string): string[] {
  const trimmed = text.trim();
  return trimmed.match(/[^.!?]+[.!?]+(?=\s|$)/g)?.map((s) => s.trim()) ?? [trimmed];
}

/** Clamp to `budget` at a word boundary, trimming a dangling connector.
 *  The result — ellipsis included — never exceeds `budget`. */
function clampWords(s: string, budget: number): string {
  if (s.length <= budget) return s;
  const room = budget - 1; // reserve one char for the ellipsis
  let cut = s.slice(0, room + 1);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  cut = cut.slice(0, room).replace(/[\s,;:—–-]+$/u, "");
  return `${cut}…`;
}

/**
 * Build a meta description from a lead one-liner plus optional body prose.
 *
 * - `base` is always kept in full (it is the card/hero copy).
 * - When `base` is short, whole sentences of `extra` are appended until the
 *   budget is reached; if even the first sentence overflows, it is word-clamped.
 * - `suffix` (e.g. " Also known as …") is reserved out of the budget so brand
 *   aliases are never truncated.
 */
export function composeMetaDescription(
  base: string,
  extra?: string,
  opts?: { suffix?: string; max?: number },
): string {
  const max = opts?.max ?? MAX;
  const suffix = opts?.suffix ?? "";
  const budget = max - suffix.length;
  let body = base.trim();

  if (extra && body.length < Math.min(ENRICH_BELOW, budget)) {
    for (const s of sentences(extra)) {
      const candidate = `${body} ${s}`.trim();
      if (candidate.length <= budget) {
        body = candidate;
      } else {
        // The next whole sentence overflows. If we are still short of the
        // target, word-clamp it in so we reach a useful length rather than
        // leaving a stub; if we have already filled out, stop cleanly.
        if (body.length < ENRICH_BELOW) body = clampWords(candidate, budget);
        break;
      }
    }
  }

  return body + suffix;
}
