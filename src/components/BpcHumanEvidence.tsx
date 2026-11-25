import Link from "next/link";

const studies = [
  {
    label: "Knee pain (2021)",
    href: "https://pubmed.ncbi.nlm.nih.gov/34324435/",
    summary: "Retrospective series of 16 patients. Published outcomes relied on self-reported pain, with several participants also receiving thymosin β4.",
  },
  {
    label: "Interstitial cystitis (2024)",
    href: "https://pubmed.ncbi.nlm.nih.gov/39325560/",
    summary: "Open-label pilot in 12 women. Published symptom ratings had no control group for comparison.",
  },
  {
    label: "Short-term safety (2025)",
    href: "https://pubmed.ncbi.nlm.nih.gov/40131143/",
    summary: "Two previously exposed adults. The published report describes short-term lab measures and side effects, with too few participants to estimate uncommon harms.",
  },
  {
    label: "Acute hamstring strain (NCT07437547)",
    href: "https://clinicaltrials.gov/study/NCT07437547",
    summary: "Registered randomized, placebo-controlled study targeting 120 participants. Planned outcomes include return to sport and MRI injury volume. Results were pending at the time of review.",
  },
];

export function BpcHumanEvidence() {
  return (
    <section id="human-evidence" className="mt-12 scroll-mt-24" aria-labelledby="human-evidence-heading">
      <h2 id="human-evidence-heading" className="font-display text-2xl font-semibold">
        Human evidence
      </h2>
      <p className="mt-3 text-sm text-ink/60">
        Evidence snapshot from <time dateTime="2026-10">October 2026</time>
      </p>
      <ul className="mt-4 divide-y divide-ink/10 rounded-xl border border-ink/10 bg-panel/30">
        {studies.map((study) => (
          <li key={study.href} className="px-4 py-3 text-sm leading-6 text-ink/70">
            <a href={study.href} className="font-medium text-accent hover:underline">
              {study.label}
            </a>
            <p>{study.summary}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-6 text-ink/70">
        Controlled evidence of benefit and longer-term safety remained unresolved at this review.{" "}
        <Link href="/insights/the-trial-that-hasnt-reported" className="text-accent hover:underline">
          Read the full review and trial history
        </Link>
        .
      </p>
    </section>
  );
}
