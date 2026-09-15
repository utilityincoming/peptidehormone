import { LIVE_EVIDENCE, LIVE_EVIDENCE_RETRIEVED, type LiveEvidence } from "@/lib/evidence-live";
import { TierBadge } from "@/components/evidence";

// "In the literature" — the live-registry block on a monograph. Two counts,
// each a straight retrieval from a primary public registry (ClinicalTrials.gov,
// PubMed), stamped with the date it was pulled and linked to the exact query so
// the reader can re-run it. A count is a `reference` claim about a registry, not
// an empirical claim about the molecule: it says how much work exists, never how
// good it is. We deliberately do not roll these into a score.

export function liveEvidenceFor(slug: string): LiveEvidence | undefined {
  return LIVE_EVIDENCE[slug];
}

const RETRIEVED_ISO = `${LIVE_EVIDENCE_RETRIEVED}T00:00:00Z`;

const SCOPE_TRIALS =
  "Registered studies whose listed intervention matches this molecule's name or verified aliases. A registry count — it says how much work exists, not how it turned out.";
const SCOPE_PAPERS =
  "PubMed records with this molecule's name or verified aliases in the title or abstract. A search count, not a curated set — includes reviews, case reports, and animal work.";

const n = (x: number) => x.toLocaleString("en-US");

function PhaseBar({ t }: { t: LiveEvidence["trials"] }) {
  const phases = [
    ["1", t.phase1],
    ["2", t.phase2],
    ["3", t.phase3],
    ["4", t.phase4],
  ] as const;
  const max = Math.max(1, ...phases.map(([, c]) => c));
  return (
    <ul className="mt-4 grid grid-cols-4 gap-3" aria-label="Trials by phase">
      {phases.map(([p, c]) => (
        <li key={p} className="min-w-0">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.07]">
            <div
              className="h-full rounded-full bg-accent-teal/70"
              style={{ width: `${c ? Math.max(6, (c / max) * 100) : 0}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between text-[11px] tabular-nums">
            <span className="text-ink/40">Ph&nbsp;{p}</span>
            <span className="font-semibold text-ink/75">{n(c)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function LiveEvidenceBlock({ slug, label }: { slug: string; label: string }) {
  const d = liveEvidenceFor(slug);
  if (!d) return null;
  const recentShare = d.papers.total ? Math.round((d.papers.recent / d.papers.total) * 100) : 0;

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-2xl font-semibold">In the literature</h2>
        <span className="text-xs text-ink/40">
          Live registry counts · retrieved{" "}
          <time dateTime={LIVE_EVIDENCE_RETRIEVED} className="tabular-nums">
            {LIVE_EVIDENCE_RETRIEVED}
          </time>
        </span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <a
          href={d.urls.trials}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl border border-ink/10 bg-panel/30 p-5 transition-colors hover:border-accent/40"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium uppercase tracking-wide text-ink/40">Registered trials</span>
            <TierBadge tier="reference" scopeNote={SCOPE_TRIALS} retrievedAt={RETRIEVED_ISO} showDate={false} />
          </div>
          <div className="mt-1 font-display text-2xl font-semibold text-ink tabular-nums">
            {n(d.trials.total)}
            {d.trials.recruiting > 0 && (
              <span className="ml-2 text-sm font-medium text-ink/50">
                {n(d.trials.recruiting)} recruiting
              </span>
            )}
          </div>
          <PhaseBar t={d.trials} />
          <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent transition-transform group-hover:translate-x-0.5">
            Open on ClinicalTrials.gov <span aria-hidden>→</span>
          </span>
        </a>

        <a
          href={d.urls.papers}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl border border-ink/10 bg-panel/30 p-5 transition-colors hover:border-accent/40"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium uppercase tracking-wide text-ink/40">PubMed records</span>
            <TierBadge tier="reference" scopeNote={SCOPE_PAPERS} retrievedAt={RETRIEVED_ISO} showDate={false} />
          </div>
          <div className="mt-1 font-display text-2xl font-semibold text-ink tabular-nums">{n(d.papers.total)}</div>
          <div className="mt-4">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.07]" aria-hidden>
              <div className="h-full rounded-full bg-accent-teal/70" style={{ width: `${recentShare}%` }} />
            </div>
            <div className="mt-1.5 flex items-baseline justify-between text-[11px] tabular-nums">
              <span className="text-ink/40">Since {d.papers.recentSince}</span>
              <span className="font-medium text-ink/70">
                {n(d.papers.recent)} <span className="text-ink/40">· {recentShare}%</span>
              </span>
            </div>
          </div>
          <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent transition-transform group-hover:translate-x-0.5">
            Open on PubMed <span aria-hidden>→</span>
          </span>
        </a>
      </div>
      <p className="mt-3 text-xs leading-5 text-ink/40">
        Searched as {d.terms.map((t, i) => (
          <span key={t}>
            {i > 0 && ", "}
            <span className="font-mono text-ink/55">{t}</span>
          </span>
        ))}
        . Counts are search hits from the primary registries, not a curated set and not a
        grade – a measure of how much work exists on {label}, not how it turned out.
      </p>
    </section>
  );
}
