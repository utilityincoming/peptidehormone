import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("bigger-not-stronger")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  ace083: "https://onlinelibrary.wiley.com/doi/full/10.1002/mus.27558",
  ace031: "https://onlinelibrary.wiley.com/doi/abs/10.1002/mus.25268",
  sapphire:
    "https://investors.scholarrock.com/news-releases/news-release-details/scholar-rock-reports-apitegromab-meets-primary-endpoint-phase-3",
  crl: "https://investors.scholarrock.com/news-releases/news-release-details/fda-issues-complete-response-letter-crl-apitegromab-treatment",
  pdufa:
    "https://www.managedhealthcareexecutive.com/view/fda-delays-apitegromab-approval-cites-facility-concerns",
} as const;

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family))} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Header ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(181,140,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/muscle-tgfb" className="text-accent-purple hover:text-ink">
                Muscle &amp; TGF-&beta;
              </Link>
            </nav>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {insight.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">{insight.dek}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink/40">
              {insight.readingMinutes} min read · reviewed {insight.reviewed}
            </p>
          </Container>
        </section>

        <Container className="max-w-3xl py-14 md:py-18">
          <article className="space-y-12">
            <Section title="The strangest way for a drug to fail">
              <P>
                Most drugs that fail do nothing. The muscle drugs built on releasing the
                body&rsquo;s brake failed a stranger way: they worked. You could see the
                muscle grow on the scan. The trouble was that the person carrying it was
                no stronger than before. For roughly fifteen years that gap — between a
                muscle you can measure and a muscle you can use — was the defining problem
                of the whole field, and two molecules from one company, ACE-083 and
                ACE-031, are the cleanest way to understand it.
              </P>
              <P>
                Both aimed at the same elegant target this site keeps returning to: the{" "}
                <Link href="/hormones/myostatin" className={LINK}>myostatin</Link> and{" "}
                <Link href="/hormones/activin-a" className={LINK}>activin</Link> pathway
                that actively restrains how much muscle you keep (the mechanics are in{" "}
                <Link href="/insights/born-switched-off" className={LINK}>Born switched off</Link>).
                Release that brake and muscle grows. Both drugs proved it did. Neither
                turned that growth into function — and the reason they couldn&rsquo;t is
                the most useful thing on this page.
              </P>
            </Section>

            <Section title="ACE-083: muscle you could measure but not use">
              <P>
                ACE-083 was the purest possible test of the idea. It was built from{" "}
                <Link href="/hormones/follistatin" className={LINK}>follistatin</Link>, the
                body&rsquo;s own myostatin antagonist, and engineered to stay where it was
                put — injected <Em>directly into a target muscle</Em> so the effect would
                be local and the rest of the body left alone. Acceleron ran it in
                facioscapulohumeral muscular dystrophy (FSHD) and Charcot-Marie-Tooth
                disease, both conditions where specific muscles waste.
              </P>
              <P>
                On its own terms, it succeeded. In the phase 2 FSHD trial the injected
                muscles grew by double digits — a robust, statistically significant
                increase in total muscle volume on MRI (
                <a href={REF.ace083} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Statland et&nbsp;al., 2022
                </a>
                ). Then the secondary endpoints came in. The functional tests — the
                measures of whether patients could actually <Em>do</Em> more — showed no
                statistically significant improvement. Bigger muscle, unchanged function.
                Acceleron stopped the FSHD program.
              </P>
              <SizeVsFunction />
              <P>
                It is hard to overstate how counterintuitive that result felt at the time.
                The intuition everyone brings to muscle — bigger is stronger — is right
                for a healthy body under load. It is not a law of biology. ACE-083 had
                separated the two variables cleanly, and shown that you can move one
                without the other.
              </P>
            </Section>

            <Section title="ACE-031: the other way to overshoot">
              <P>
                Its sibling failed from the opposite direction. ACE-031 (ramatercept) was
                a <Em>systemic</Em> drug: a soluble decoy receptor, the business end of
                the activin type&nbsp;II receptor fused to an antibody stalk, floating in
                the blood to soak up myostatin before it could reach muscle anywhere in
                the body. Acceleron took it into Duchenne muscular dystrophy, and the
                early signs were encouraging — trends toward more lean mass, denser bone,
                less fat, even a hint of held walking distance (
                <a href={REF.ace031} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Campbell et&nbsp;al., 2017
                </a>
                ).
              </P>
              <P>
                Then boys started getting nosebleeds and bleeding from the gums, and small
                dilated blood vessels — telangiectasias — appeared on the skin. The trial
                was halted after the second dosing regimen. The cause was baked into the
                design: that decoy receptor is not selective. It binds myostatin, but it
                also traps BMP-9 and BMP-10, two related signals the body uses to keep
                blood vessels sealed and stable. Cut the muscle brake with a wide enough
                blade and you cut the vascular wiring alongside it.
              </P>
              <Callout label="Two failure modes, one map">
                Between them the ACE prototypes bracketed the problem. ACE-083 was so
                local it could only ever inflate a muscle, never improve the system around
                it. ACE-031 reached the whole body and hit signals that had nothing to do
                with muscle. Too narrow to matter, or too broad to be safe — and both of
                them growing tissue that didn&rsquo;t translate into capability.
              </Callout>
            </Section>

            <Section title="The platform that lost in muscle and won everywhere else">
              <P>
                Here is the turn that makes this a story about science working rather than
                failing. Acceleron&rsquo;s ligand-trap platform — the same molecular idea
                behind ACE-031 — did not die. It was pointed at the parts of the biology
                that the muscle programs had treated as side effects, and it produced two
                approved drugs.
              </P>
              <PlatformFates />
              <P>
                Trapping this family of signals nudges red-blood-cell production, so a
                close relative of ACE-031 became{" "}
                <Em>luspatercept</Em> (Reblozyl), approved in 2019 for the anemias of
                myelodysplastic syndrome and beta-thalassemia. Trapping a slightly
                different member calms the overgrowth of small blood vessels in the lung,
                so another became <Em>sotatercept</Em> (Winrevair), approved in 2024 for
                pulmonary arterial hypertension. The molecules that reached the market were
                the non-muscle ones. The &ldquo;off-target&rdquo; biology that sank the
                muscle trials was, somewhere else in the body, the entire point.
              </P>
            </Section>

            <Section title="What “bigger but not stronger” actually means">
              <P>
                So why doesn&rsquo;t added muscle simply work? The answer is the load-
                bearing idea of this piece: releasing the brake tells a muscle fiber to
                grow, but a fiber only does useful work when the rest of the system is
                intact — the motor nerve wired to it, the fiber&rsquo;s own internal
                machinery sound, real mechanical demand asking it to contract. Growth
                supplies mass. It does not supply any of those.
              </P>
              <P>
                That reframes both failures at once. In FSHD, the muscle ACE-083 inflated
                was still genetically diseased on the inside; a larger volume of
                compromised tissue is still compromised. In a body under no particular
                training load, extra mass has no reason to become extra strength. The
                drugs weren&rsquo;t weak. They were answering a question — how do I make
                this muscle bigger? — that turned out not to be the question that mattered.
                The one that mattered was: is this muscle able to do work in the first
                place?
              </P>
            </Section>

            <Section title="How apitegromab finally moved function">
              <P>
                In 2026 a drug on this exact pathway cleared the bar that had stood for
                fifteen years. <Em>Apitegromab</Em>, from Scholar Rock, is the sharpened
                version of the idea: instead of a wide decoy, it binds only the inactive
                precursor of myostatin, disarming the brake before it is ever switched on,
                and touching little else (why that selectivity is possible is the subject
                of{" "}
                <Link href="/insights/one-receptor-a-whole-family" className={LINK}>
                  One receptor, a whole family
                </Link>
                ). In the phase 3 SAPPHIRE trial in spinal muscular atrophy, it did what
                ACE-083 could not: it improved a <Em>functional</Em> motor score, not just
                a scan (
                <a href={REF.sapphire} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Scholar Rock, 2024/25
                </a>
                ).
              </P>
              <P>
                The reason it worked is the whole thesis in one experiment. Apitegromab
                was added <Em>on top of</Em> the SMA drugs that repair the underlying
                fault — the SMN-restoring therapies that get the motor neuron talking to
                the muscle again. Fix the wiring, then release the brake, and the extra
                muscle has something to connect to and something to do. The mass finally
                lands on a system able to use it. Same pathway that failed as ACE-083;
                this time pointed at a muscle that could answer.
              </P>
              <FunctionScorecard />
              <P>
                The regulatory path has been its own small drama, and worth stating
                plainly rather than dressing up: the FDA issued a complete response letter
                in September 2025 (
                <a href={REF.crl} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Scholar Rock, 2025
                </a>
                ) — but the letter was about a third-party fill-finish facility, with no
                question raised about the drug&rsquo;s safety or how well it worked. After
                a resubmission, the decision date now sits at{" "}
                <a href={REF.pdufa} target="_blank" rel="noopener noreferrer" className={LINK}>
                  September&nbsp;30,&nbsp;2026
                </a>
                . Manufacturing, not mechanism, is the last gate.
              </P>
            </Section>

            <Section title="The lesson the GLP-1 era is about to relearn">
              <P>
                This history is not a museum piece. The hottest use of muscle-brake drugs
                right now is preserving muscle during{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> weight loss —
                pairing them with{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link> or{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link> so
                the scale drops fat and spares lean mass. The early readouts are genuinely
                exciting, and this site has covered them in{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>
                  Muscle loss on GLP-1
                </Link>
                . But nearly every headline number so far is a body-composition figure —
                kilograms of lean mass on a DEXA scan. That is a <Em>size</Em> readout.
                It is exactly the measurement ACE-083 aced on its way to being shelved.
              </P>
              <P>
                Here is the honest, and quietly optimistic, distinction. A person losing
                weight is not a person with dystrophic muscle. Their fibers are healthy,
                wired, and — if they are moving at all — under load. That is precisely the
                intact system in which preserved mass has every reason to become preserved
                strength. The biology is finally lined up in the drug&rsquo;s favor. What
                remains is to <Em>prove</Em> it, by wiring strength, mobility and physical
                function into the trials rather than trusting the scan to speak for them.
                Apitegromab showed the pathway can deliver function when the setup is
                right. The task now is to ask it to — and to keep the difference between
                bigger and stronger in view every time a new lean-mass number lands.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/glp-1-muscle-preservation" label="Muscle loss on GLP-1 — the same size-vs-strength question, live" />
                <CrossLink href="/insights/born-switched-off" label="Born switched off — how the muscle brake is armed" />
                <CrossLink href="/insights/one-receptor-a-whole-family" label="One receptor, a whole family — why selectivity is hard" />
                <CrossLink href="/insights/the-complexity-ladder" label="Why you can't just buy a myostatin inhibitor" />
                <CrossLink href="/hormones/follistatin" label="Follistatin reference (what ACE-083 was built from)" />
                <CrossLink href="/research?q=What%20does%20apitegromab%27s%20phase%203%20SAPPHIRE%20trial%20show%20for%20motor%20function%20in%20spinal%20muscular%20atrophy%3F" label="Ask the research agent about apitegromab's SMA data" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not
              medical advice, dosing guidance, or a recommendation to use any compound.
              Specific compounds and trials are named to explain the science; verify any
              claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── ACE-083 in FSHD: muscle volume moved, function didn't ── */
function SizeVsFunction() {
  const W = 520, H = 300;
  const baseY = 232, top = 44, zeroX = 96, maxW = 360;
  // Two measures, drawn from the same zero baseline.
  const bars = [
    { label: "Muscle volume", sub: "MRI, treated muscle", pct: 12, frac: 0.82, filled: true },
    { label: "Function", sub: "timed / strength tests", pct: 0, frac: 0.015, filled: false },
  ];
  const rowY = (i: number) => top + 30 + i * 96;
  const barH = 46;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img" aria-label="ACE-083 in facioscapulohumeral dystrophy produced a large, significant increase in muscle volume on MRI but no significant improvement in functional tests.">
        <text x={zeroX} y={top} fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          ACE-083 · phase 2 FSHD
        </text>
        {/* zero baseline */}
        <line x1={zeroX} y1={top + 10} x2={zeroX} y2={baseY} stroke="var(--color-ink)" strokeOpacity="0.2" strokeWidth="1.5" />
        {bars.map((b, i) => {
          const y = rowY(i);
          const w = Math.max(6, b.frac * maxW);
          return (
            <g key={b.label}>
              <text x={zeroX - 12} y={y + barH / 2 - 4} textAnchor="end" fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
                {b.label}
              </text>
              <text x={zeroX - 12} y={y + barH / 2 + 13} textAnchor="end" fill="var(--color-ink)" fillOpacity="0.45" fontSize="10.5">
                {b.sub}
              </text>
              <rect
                x={zeroX}
                y={y}
                width={w}
                height={barH}
                rx={8}
                fill={b.filled ? "color-mix(in srgb, var(--accent-purple) 26%, transparent)" : "transparent"}
                stroke="var(--accent-purple)"
                strokeOpacity={b.filled ? 0.8 : 0.4}
                strokeWidth={b.filled ? 0 : 1.5}
                strokeDasharray={b.filled ? undefined : "5 4"}
              />
              <text x={zeroX + w + 12} y={y + barH / 2 + 5} fill="var(--color-ink)" fillOpacity={b.filled ? 0.9 : 0.5} fontSize="15" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">
                {b.filled ? `+${b.pct}%` : "n.s."}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The drug hit its primary endpoint — a large, significant gain in muscle volume —
        and missed the functional secondary endpoints. Same molecule, two answers.
      </figcaption>
    </figure>
  );
}

/* ── One trap platform, four fates: the muscle ones failed, the others were approved ── */
function PlatformFates() {
  const rows: { code: string; where: string; fate: string; won: boolean }[] = [
    { code: "Sotatercept", where: "Pulmonary arterial hypertension", fate: "Approved 2024", won: true },
    { code: "Luspatercept", where: "Anemia (MDS, β-thalassemia)", fate: "Approved 2019", won: true },
    { code: "ACE-031", where: "Duchenne muscular dystrophy", fate: "Halted — vascular safety", won: false },
    { code: "ACE-083", where: "FSHD (follistatin-based)", fate: "Dropped — no function gain", won: false },
  ];
  const W = 560, rowH = 52, gap = 12, padY = 16;
  const H = rows.length * rowH + (rows.length - 1) * gap + padY * 2;
  const hubX = 118, leafX = 210, leafW = 330;
  const cy = H / 2;
  const yAt = (i: number) => padY + i * (rowH + gap);
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-lg" role="img" aria-label="Acceleron's ligand-trap platform yielded four molecules: sotatercept and luspatercept were approved for non-muscle diseases, while the muscle programs ACE-031 and ACE-083 were halted.">
        {/* hub */}
        <rect x={12} y={cy - 34} width={hubX - 24} height={68} rx={12} fill="var(--panel)" stroke="var(--accent-purple)" strokeOpacity="0.4" />
        <text x={(hubX - 12) / 2 + 6} y={cy - 6} textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          Ligand-trap
        </text>
        <text x={(hubX - 12) / 2 + 6} y={cy + 12} textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          platform
        </text>
        {rows.map((r, i) => {
          const y = yAt(i);
          const my = y + rowH / 2;
          const accent = r.won ? "var(--accent-teal)" : "var(--accent-rose)";
          return (
            <g key={r.code}>
              <path d={`M ${hubX} ${cy} C ${hubX + 40} ${cy}, ${leafX - 40} ${my}, ${leafX} ${my}`} fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1.5" />
              <rect x={leafX} y={y} width={leafW} height={rowH} rx={10} fill={r.won ? "color-mix(in srgb, var(--accent-teal) 9%, transparent)" : "color-mix(in srgb, var(--accent-rose) 9%, transparent)"} stroke={accent} strokeOpacity="0.5" />
              <text x={leafX + 14} y={y + 21} fill="var(--color-ink)" fontSize="13" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">
                {r.code}
              </text>
              <text x={leafX + 14} y={y + 38} fill="var(--color-ink)" fillOpacity="0.5" fontSize="11">
                {r.where}
              </text>
              <text x={leafX + leafW - 12} y={y + rowH / 2 + 4} textAnchor="end" fill={accent} fillOpacity="0.95" fontSize="11" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
                {r.fate}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        One platform, four molecules. The two aimed at muscle were pulled; the two aimed
        at what looked like side effects — blood and the lung — reached the market.
      </figcaption>
    </figure>
  );
}

/* ── Size vs. function, scored across the pivotal readouts ── */
function FunctionScorecard() {
  const rows: { drug: string; setting: string; size: string; fn: string; won: boolean }[] = [
    { drug: "ACE-083", setting: "FSHD (phase 2)", size: "+12% muscle volume", fn: "No significant gain", won: false },
    { drug: "ACE-031", setting: "Duchenne (phase 2)", size: "↑ lean mass trend", fn: "Halted for safety", won: false },
    { drug: "Apitegromab", setting: "SMA (phase 3, on SMN therapy)", size: "Muscle preserved", fn: "Motor score improved", won: true },
  ];
  return (
    <figure className="my-2 overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          Muscle-brake drugs scored on whether they moved muscle size versus muscle function
        </caption>
        <thead className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
          <tr className="border-b border-ink/10">
            <th scope="col" className="p-3 font-medium">Drug · setting</th>
            <th scope="col" className="p-3 font-medium">Muscle size</th>
            <th scope="col" className="p-3 font-medium">Function</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.drug} className="border-b border-ink/[0.06] align-top last:border-0">
              <th scope="row" className="p-3 font-normal">
                <span className="block font-semibold text-ink">{r.drug}</span>
                <span className="mt-0.5 block text-xs text-ink/45">{r.setting}</span>
              </th>
              <td className="p-3 text-ink/70">{r.size}</td>
              <td className="p-3">
                <span className={r.won ? "font-semibold text-accent-teal" : "text-ink/55"}>
                  {r.won ? "✓ " : "— "}{r.fn}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="border-t border-ink/10 p-3 text-center text-xs text-ink/40">
        The first two moved size and not function. Apitegromab moved function — added on
        top of therapy that had already repaired the nerve-to-muscle connection.
      </figcaption>
    </figure>
  );
}
