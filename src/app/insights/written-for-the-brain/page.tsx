import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("written-for-the-brain")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Semax and Selank: The Russian Nootropic Peptides, BDNF, and the Evidence — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "Written for the Brain: Semax, Selank, and a Different Regulatory World's Evidence · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  dolotov: "https://pubmed.ncbi.nlm.nih.gov/16996037/", // Dolotov et al. 2006, Brain Res — Semax regulates BDNF and trkB expression in rat hippocampus
  zozulya: "https://pubmed.ncbi.nlm.nih.gov/18454096/", // Zozulya et al. 2008 — selank in GAD/neurasthenia, comparable to medazepam (Russian RCT)
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What are semax and selank?",
    a: "They are two short synthetic peptides developed and registered as drugs in Russia, each engineered from an endogenous human peptide. Semax is built from ACTH(4-10), a fragment of the stress hormone ACTH, and is used for cognitive and neuroprotective indications. Selank is built from tuftsin, an immune-active peptide fragment, and is used as an anxiolytic. Both are given intranasally, both are registered and prescribed in Russia, and both have very little independent, Western-standard trial evidence behind them.",
  },
  {
    q: "How does semax work?",
    a: "Semax is a fragment of ACTH(4-10) with the hormone's cortisol-releasing activity stripped out and a Pro-Gly-Pro tail added to resist the enzymes that would otherwise destroy it. Rather than acting as a melanocortin hormone, it appears to raise brain-derived neurotrophic factor (BDNF) and its receptor TrkB and to shift dopamine and serotonin tone. In rat hippocampus a single dose increased BDNF and trkB expression — a plausible mechanism for a nootropic, demonstrated in animals rather than in controlled human trials.",
  },
  {
    q: "Is selank as effective as a benzodiazepine?",
    a: "A Russian randomized trial in generalized anxiety disorder and neurasthenia reported that selank's anxiolytic effect was comparable to the benzodiazepine medazepam, without the sedation and dependence that limit benzodiazepines. That is a genuinely interesting result and the strongest single piece of selank evidence — but it is one modest trial from the drug's country of origin, not the replicated, independently run evidence base a Western regulator would require.",
  },
  {
    q: "Why aren't semax and selank approved in the US or Europe?",
    a: "Because approval turns on a particular kind of evidence — large, randomized, independently conducted and replicated trials — and that evidence does not exist for either peptide outside Russia. These drugs grew up in a different regulatory world with a different evidentiary tradition, and their clinical records largely stayed inside it. The mechanisms are plausible and the domestic use is real; what is missing is the external audit, which is exactly what Western approval is built to demand.",
  },
  {
    q: "What is DSIP, and why is it a cautionary tale here?",
    a: "Delta sleep-inducing peptide (DSIP) was isolated in the 1970s from the blood of sleeping rabbits and named for the deep-sleep brain waves it seemed to induce. Decades later it is still, in its own review literature, an 'unresolved riddle': genuinely endogenous, but with no established receptor, no defined pathway, and a namesake sleep effect that has been very hard to reproduce. It is the reminder that a brain peptide can be real, named, and studied for fifty years and still not have a confirmed job — which is the risk every under-audited neuropeptide carries.",
  },
];

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
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
              <Link href="/families/neuropeptides" className="text-accent-purple hover:text-ink">
                Neuropeptides
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
            <Section title="Two drugs you've probably never seen prescribed">
              <P>
                <Link href="/hormones/semax" className={LINK}>Semax</Link> and{" "}
                <Link href="/hormones/selank" className={LINK}>selank</Link> are real
                registered medicines — just not where most readers live. Both were
                developed in Russia, both are prescribed there, and both are near-unknown
                to Western medicine. Semax is used for cognitive and neuroprotective
                indications; selank as an anti-anxiety agent. They arrive in the
                English-language peptide world as &ldquo;nootropics,&rdquo; which flattens
                something more interesting: these are drugs with a national clinical
                history, sitting in an evidentiary tradition that never fully connected to
                the one that produces FDA labels.
              </P>
              <P>
                That gap is the subject here. The biology is plausible and in places
                genuinely elegant; the domestic use is decades deep; and the independent,
                Western-standard evidence is thin to absent. Holding all three at once — real
                mechanism, real use, missing audit — is the honest way to read a peptide
                from a different regulatory world. Bullish on the science, sceptical on the
                page.
              </P>
            </Section>

            <Section title="Cut from a hormone, kept for one clause">
              <P>
                Both peptides share a design philosophy this site keeps running into: take
                an endogenous human peptide, cut out the fragment that does the one thing
                you want, and armor it against the enzymes that would destroy it. Semax is
                a fragment of <Link href="/hormones/acth" className={LINK}>ACTH</Link>(4-10)
                — the stress hormone&rsquo;s sequence — with its cortisol-releasing activity
                stripped away and a Pro-Gly-Pro tail bolted on to resist peptidase
                cleavage. It keeps the neuroactive clause of its parent and sheds the
                endocrine one.
              </P>
              <P>
                That is exactly the move behind{" "}
                <Link href="/insights/the-last-three-words" className={LINK}>KPV</Link>, the
                anti-inflammatory tail cut from the melanocortin hormone α-MSH. Selank runs
                the same play on a different parent: it is a modified fragment of tuftsin,
                an immune-active peptide, re-pointed toward anxiety. In both cases the
                engineering is the believable part — a short, peptidase-resistant fragment
                that reaches the brain is a reasonable thing to build. What the fragment
                then <Em>does</Em> in a person is the part that needs evidence, not just a
                lineage.
              </P>
            </Section>

            <Section title="The mechanism that has animal support">
              <P>
                Semax has the more worked-out mechanism. Rather than acting as a
                melanocortin hormone, it appears to raise{" "}
                <Em>brain-derived neurotrophic factor</Em> (BDNF) — the growth factor
                behind synaptic plasticity and neuronal survival — and its receptor TrkB. In
                rat hippocampus, a single dose of semax increased BDNF and trkB expression (
                <a href={REF.dolotov} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Dolotov et&nbsp;al., Brain&nbsp;Res, 2006
                </a>
                ). A peptide that nudges the BDNF/TrkB system is a coherent story for a
                nootropic or a neuroprotectant, and it is consistent with the stroke and
                cognition indications semax carries in Russia.
              </P>
              <P>
                The honest caveat is the altitude of that evidence. &ldquo;Increases BDNF in
                rat hippocampus&rdquo; is a mechanism in an animal, not a demonstrated
                clinical benefit in people. The leap from a neurotrophin bump in a rodent to
                a measurable cognitive or neuroprotective effect in a human is the same leap
                the whole nootropic field keeps gesturing past — and for semax, the
                controlled human trials that would close it are mostly unavailable outside
                their country of origin.
              </P>
            </Section>

            <Section title="Selank's one good trial">
              <P>
                Selank&rsquo;s strongest evidence is a single, genuinely interesting result.
                In a Russian randomized trial in generalized anxiety disorder and
                neurasthenia, selank&rsquo;s anxiolytic effect was reported as comparable to
                the benzodiazepine medazepam — but without the sedation, and without the
                dependence that is the benzodiazepines&rsquo; defining liability (
                <a href={REF.zozulya} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Zozulya et&nbsp;al., 2008
                </a>
                ). An anxiolytic that matches a benzodiazepine without the downsides would
                be a real advance if it held up.
              </P>
              <P>
                &ldquo;If it held up&rdquo; is carrying the sentence. This is one modest
                trial, conducted in the drug&rsquo;s home system, not an independently run,
                replicated program. In anxiety research especially — where placebo response
                is large and expectancy effects are strong — a single positive study from
                the originating tradition is a promising signal, not a settled conclusion.
                The result is good enough to make selank worth taking seriously and thin
                enough that taking it seriously means asking for the replication that
                does not yet exist.
              </P>
              <Callout label="Where the evidence lives">
                The recurring issue with both peptides is not a damning trial — it is the
                absence of the external trials that would make a verdict possible. A drug
                used for decades in one country, with plausible mechanisms and little
                independent replication, is neither vindicated nor debunked. It is
                under-audited, and the right response is to say so plainly rather than round
                it up to &ldquo;proven&rdquo; or down to &ldquo;fake.&rdquo;
              </Callout>
            </Section>

            <Section title="The cautionary coda: DSIP">
              <P>
                The neuropeptide shelf holds a standing warning about how long a brain
                peptide can stay unresolved.{" "}
                <Link href="/hormones/dsip" className={LINK}>Delta sleep-inducing peptide</Link>{" "}
                was pulled from the blood of sleeping rabbits in the 1970s and named for the
                deep-sleep waves it appeared to produce. Half a century on it is, in the
                words of its own review literature, an &ldquo;unresolved riddle&rdquo;:
                unambiguously endogenous, yet with no established receptor, no defined
                pathway, and a namesake sleep effect that has proven stubbornly hard to
                reproduce.
              </P>
              <P>
                DSIP is the reminder that being real, named, and studied for fifty years
                does not add up to having a confirmed job. It is the failure mode every
                under-audited neuropeptide risks — a plausible story and a memorable name
                that outran the evidence and never got caught up with. Semax and selank are
                better supported than DSIP; the point is that &ldquo;better than the peptide
                nobody could pin down&rdquo; is not the same as established, and the
                direction they travel from here depends entirely on evidence that would have
                to come from outside the room that produced them.
              </P>
              <Bullets
                items={[
                  ["Registered drugs from a different system", "Semax (cognition/neuroprotection) and selank (anxiety) are prescribed in Russia and nearly unknown to Western medicine — real clinical use, little external evidence."],
                  ["Engineered from endogenous fragments", "Semax is ACTH(4-10) with the hormone activity removed and a peptidase-resistant tail added; selank is a modified tuftsin fragment — the same 'keep one clause' move as KPV."],
                  ["Semax's BDNF mechanism is animal-grade", "A single dose raised BDNF and trkB in rat hippocampus — a coherent nootropic mechanism, but a rodent result, not a demonstrated human benefit."],
                  ["Selank has one promising trial", "A Russian RCT found it comparable to a benzodiazepine without sedation — strong if replicated, but single and home-grown."],
                  ["DSIP is the warning label", "An endogenous peptide named for a sleep effect that never reliably replicated. Real and memorable is not the same as established — the risk every under-audited neuropeptide carries."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/semax" label="Semax reference (the ACTH-derived nootropic)" />
                <CrossLink href="/hormones/selank" label="Selank reference (the tuftsin-derived anxiolytic)" />
                <CrossLink href="/hormones/dsip" label="DSIP reference (the unresolved riddle)" />
                <CrossLink href="/insights/the-last-three-words" label="The last three words — KPV, a fragment kept for one clause" />
                <CrossLink href="/insights/the-touch-deficit" label="The touch deficit — a neuropeptide and its replication problem" />
                <CrossLink href="/families/neuropeptides" label="The neuropeptides family" />
                <CrossLink href="/research?q=What%20does%20the%20independent%20evidence%20actually%20show%20for%20semax%20and%20selank%2C%20and%20why%20are%20they%20registered%20in%20Russia%20but%20not%20the%20US%20or%20Europe%3F" label="Ask the research agent about semax and selank" />
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
