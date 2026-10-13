import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-half-that-did-nothing")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What is AOD-9604? The GH 'Lipolytic Fragment' and Why Its Obesity Trials Failed — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "The Half That Did Nothing: AOD-9604, the GH Fragment Whose Fat-Loss Claim Failed in Humans · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary source — named inline so the evidence grade stays checkable.
const REF = {
  heffernan: "https://pubmed.ncbi.nlm.nih.gov/11713213/", // Heffernan et al. 2001, Endocrinology — AOD9604 lipolysis via β3-AR in obese and β3-AR-KO mice
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is AOD-9604?",
    a: "AOD-9604 is a synthetic fragment of human growth hormone — its C-terminal tail, residues 176–191, with an added tyrosine. It was designed on the theory that GH's fat-burning (lipolytic) activity lives in that fragment and can be separated from GH's growth, IGF-1 and glucose effects. The goal was a clean fat-loss drug with none of growth hormone's baggage. The design idea was sound; the human results were not.",
  },
  {
    q: "Does AOD-9604 actually cause fat loss?",
    a: "In rodents, it did: AOD-9604 reduced weight gain and increased lipolysis and fat oxidation, apparently through the β3-adrenergic pathway, without raising IGF-1 or harming insulin sensitivity the way whole growth hormone does. In humans, controlled obesity trials did not show significant weight loss versus placebo, and development as a weight-loss drug was discontinued. The effect that worked in mice did not translate to people.",
  },
  {
    q: "Why did AOD-9604's obesity trials fail?",
    a: "The honest answer is that nobody fully knows, but the pattern is familiar: a lipolytic effect robust in rodent fat cells simply did not produce meaningful weight loss in human trials. The separation of fat metabolism from GH's other actions succeeded — AOD-9604 genuinely doesn't raise IGF-1 — but the fat-loss benefit it was built to deliver wasn't there in people. A clean fragment of a fat-burning hormone is not the same as a fat-burning drug.",
  },
  {
    q: "Is AOD-9604 approved or proven for weight loss?",
    a: "No. It was never approved as a weight-loss drug, and its pivotal obesity development was halted after the trials failed to show benefit. It persists in the research-peptide and cosmetic markets on the strength of its mechanism story and rodent data — claims that run ahead of the controlled human evidence, which is negative for the thing it is sold to do.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(94,168,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/growth-repair" className="text-accent-blue hover:text-ink">
                Growth &amp; repair
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
            <Section title="A fragment with a clean idea">
              <P>
                <Link href="/hormones/growth-hormone" className={LINK}>Growth hormone</Link>{" "}
                does several different things at once: it grows tissue, it raises{" "}
                <Link href="/hormones/igf-1" className={LINK}>IGF-1</Link>, it pushes glucose
                up, and — the part this molecule cares about — it mobilizes fat.{" "}
                <Link href="/hormones/aod-9604" className={LINK}>AOD-9604</Link> is the tail
                end of that hormone, the C-terminal fragment hGH(176-191), isolated on a clean
                and appealing theory: that the fat-burning lives in this fragment, and can be
                cut away from everything else GH does. A fat-loss drug with none of growth
                hormone&rsquo;s growth, no IGF-1 rise, no glucose problem.
              </P>
              <P>
                That is a move this reference admires elsewhere. It is exactly what{" "}
                <Link href="/insights/the-last-three-words" className={LINK}>KPV</Link> does
                with α-MSH&rsquo;s anti-inflammatory clause, and what{" "}
                <Link href="/insights/epo-without-the-blood" className={LINK}>ARA-290</Link>{" "}
                does with erythropoietin&rsquo;s tissue-protective one: keep the clause you
                want, drop the rest. AOD-9604 is the same design — and the instructive case
                where it did not pay off. Bullish on the method, sceptical on this result.
              </P>
            </Section>

            <Section title="The separation worked">
              <P>
                In the narrow technical sense, the split succeeded. In obese mice, AOD-9604
                induced weight loss and raised lipolytic activity, apparently by engaging the
                β3-adrenergic pathway — the main fat-burning receptor on the fat cell — and the
                effect tracked with β3-adrenergic receptor expression (
                <a href={REF.heffernan} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Heffernan et&nbsp;al., Endocrinology, 2001
                </a>
                ). Just as importantly, it did <Em>not</Em> carry growth hormone&rsquo;s
                liabilities: no IGF-1 rise, and none of the insulin-sensitivity harm chronic GH
                can cause.
              </P>
              <P>
                So the engineering brief was met. The fragment really had been separated from
                the rest of GH biology — you could give it and not get growth signaling or a
                glucose penalty. On the strength of that, and real rodent fat-loss data, it
                looked like a genuine candidate. The question was whether the kept clause would
                still say something in a human being.
              </P>
            </Section>

            <Section title="But the clause was empty in people">
              <P>
                It did not. In controlled human obesity trials, AOD-9604 failed to produce
                significant weight loss over placebo, and its development as a weight-loss drug
                was discontinued. The lipolysis that was robust in a mouse&rsquo;s fat cells
                simply did not translate into meaningful fat loss in a person. The separation
                had worked and the kept half turned out to do nothing useful — you had cleanly
                isolated a clause that, in humans, said almost nothing.
              </P>
              <Callout label="The lesson in the failure">
                Splitting a hormone to keep one of its actions is only worth it if that action
                survives the split <em>in people</em>. AOD-9604 proves the separation can
                succeed while the prize evaporates: no IGF-1, no glucose penalty — and no weight
                loss either. &ldquo;A fragment of a fat-burning hormone&rdquo; is not the same
                sentence as &ldquo;a drug that burns your fat.&rdquo;
              </Callout>
            </Section>

            <Section title="Why it still sells">
              <P>
                And yet AOD-9604 did not disappear. It lives on in the research-peptide and
                cosmetic markets, marketed for fat loss on exactly the lipolytic story its own
                pivotal trial failed to support — the rodent mechanism and the appealing
                &ldquo;GH fat fragment&rdquo; framing doing the work that the human data
                won&rsquo;t. It is the cleanest small example of the gap this site keeps
                flagging between a molecule&rsquo;s <Em>mechanism</Em> and its{" "}
                <Em>proven effect</Em>: the first can be real and the second absent, and a
                marketplace will happily sell the first as if it were the second.
              </P>
              <P>
                Set it beside its successful cousins and the contrast is the whole point. KPV
                kept a clause that still works; ARA-290 kept one whose mechanism is elegant and
                whose clinic is merely unproven. AOD-9604 kept a clause that, when finally
                tested properly in humans, was hollow. Three applications of the same smart
                design, three different verdicts — and only this one has a negative trial
                sitting under the claim.
              </P>
              <Bullets
                items={[
                  ["AOD-9604 is GH's lipolytic fragment", "The C-terminal hGH(176-191) tail, isolated to keep growth hormone's fat-burning while dropping its growth, IGF-1 and glucose actions — a 'keep one clause' design."],
                  ["The separation genuinely worked", "In mice it drove lipolysis via the β3-adrenergic pathway, with no IGF-1 rise and no insulin-sensitivity harm. The fat-metabolism clause was cut cleanly from the rest."],
                  ["But human obesity trials failed", "Controlled trials showed no significant weight loss over placebo; development as a weight-loss drug was discontinued. The rodent effect didn't translate."],
                  ["Mechanism is not proof", "A clean fragment of a fat-burning hormone is not a fat-burning drug. The separation succeeded and the kept half did nothing useful in people."],
                  ["It persists on claims the data don't support", "AOD-9604 is still sold for fat loss on its mechanism story — the sharpest small case of marketing running ahead of a negative trial."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/aod-9604" label="AOD-9604 reference (the lipolytic fragment)" />
                <CrossLink href="/hormones/growth-hormone" label="Growth hormone reference (the parent molecule)" />
                <CrossLink href="/insights/epo-without-the-blood" label="EPO without the blood — a 'keep one clause' split that's elegant but unproven" />
                <CrossLink href="/insights/the-last-three-words" label="The last three words — KPV, a split that kept a real effect" />
                <CrossLink href="/insights/two-ways-to-ask-for-growth" label="Two ways to ask for growth — the GH axis AOD-9604 comes from" />
                <CrossLink href="/families/growth-repair" label="The growth & repair family" />
                <CrossLink href="/research?q=What%20is%20AOD-9604%27s%20proposed%20lipolytic%20mechanism%2C%20and%20why%20did%20its%20human%20obesity%20trials%20fail%20to%20show%20weight%20loss%3F" label="Ask the research agent about AOD-9604" />
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
