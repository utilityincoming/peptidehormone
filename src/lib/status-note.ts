// lib/status-note — the one sentence an article is allowed to say about
// regulatory status in its disclaimer.
// ---------------------------------------------------------------------------
// Articles used to write "X is investigational and not an approved treatment"
// by hand. Those sentences are how the site went stale: orforglipron and
// apitegromab were approved while disclaimers still called them
// investigational. A disclaimer now names the molecules and this module writes
// the sentence from the regulatory table, so correcting a row corrects every
// article that mentions it.

import { getHormone } from "@/lib/hormones";
import { REGULATORY, WATCHED, formatAsOf, type RegulatoryEntry, type RegulatoryStatus } from "@/lib/regulatory";

/** How each status reads in a disclaimer. Endogenous hormones are not drugs and say nothing. */
const PHRASE: Record<RegulatoryStatus, string | null> = {
  approved: "Approved in the United States",
  investigational: "Investigational, not approved",
  restricted: "Not approved, and may not be compounded",
  unapproved: "Not approved for human use",
  withdrawn: "Formerly approved, no longer marketed in the United States",
  endogenous: null,
};

const ORDER: RegulatoryStatus[] = ["investigational", "restricted", "unapproved", "withdrawn", "approved"];

function lookup(key: string): { name: string; entry: RegulatoryEntry } {
  const watched = WATCHED[key];
  if (watched) return { name: watched.name, entry: watched };
  const entry = REGULATORY[key];
  const hormone = getHormone(key);
  if (!entry || !hormone) throw new Error(`status-note: no regulatory row for "${key}"`);
  // Generic drug names are lower case in running text; brand-like and coded
  // names (BPC-157, CagriSema, GLP-1) keep their own capitals.
  const name = /^[A-Z][a-z]+( [a-z]+)*$/.test(hormone.name) ? hormone.name.toLowerCase() : hormone.name;
  return { name, entry };
}

function list(names: string[]): string {
  if (names.length < 3) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/**
 * "Investigational, not approved: cagrilintide and retatrutide. Approved in the
 * United States: orforglipron. Status checked November 2026."
 *
 * `keys` are catalog slugs or WATCHED keys. An unknown key throws, so a typo
 * fails the build rather than printing a disclaimer with a molecule missing.
 */
export function statusNote(keys: string[]): string {
  const rows = keys.map(lookup);
  const parts = ORDER.flatMap((status) => {
    const names = rows.filter((r) => r.entry.status === status).map((r) => r.name);
    return names.length && PHRASE[status] ? [`${PHRASE[status]}: ${list(names)}.`] : [];
  });
  if (!parts.length) return "";
  // The oldest check among the rows named: the sentence is only as fresh as that.
  const checked = rows.map((r) => r.entry.verified).sort()[0];
  return `${parts.join(" ")} Status checked ${formatAsOf(checked)}.`;
}
