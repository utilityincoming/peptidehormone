import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink, StatusNote } from "@/components/insight";
import { DocumentedRange } from "@/components/DocumentedRange";

const insight = getInsight("the-arm-that-points-at-the-liver")!;

// External primary sources — named inline so each trial claim stays checkable.
const REF = {
  leroux: "https://pubmed.ncbi.nlm.nih.gov/38330987/", // le Roux et al. 2024, Lancet Diabetes Endocrinol — survodutide phase 2 obesity
  sanyal: "https://doi.org/10.1056/NEJMoa2401755", // Sanyal et al. 2024, NEJM — survodutide phase 2 in MASH and fibrosis
} as const;

const FAQS = [
  {
    q: "What doses of survodutide were studied in obesity?",
    a: "The phase 2 dose-finding trial assigned 0.6, 2.4, 3.6, or 4.8 mg subcutaneously once weekly for 46 weeks, of which 20 weeks were escalation and 26 were maintenance (le Roux et al., 2024). The documented-range box on this page is the 2.4–4.8 mg target span, not the 0.6 mg start. The drug is not approved.",
  },
  {
    q: "How much weight did survodutide lose in phase 2?",
    a: "On the primary planned-treatment analysis, mean weight change at week 46 was −6.2% at 0.6 mg, −12.5% at 2.4 mg, −13.2% at 3.6 mg, and −14.9% at 4.8 mg, against −2.8% on placebo. The ~19% figure that travels with the molecule is the actual-treatment reading of the same trial, not a second study.",
  },
  {
    q: "Why does survodutide have to be titrated?",
    a: "The glucagon arm can raise glucose and lift heart rate. The GLP-1 arm is the counterweight, but the balance only holds if the dose is walked up. Phase 2 spent 20 of 46 weeks escalating. Starting at the 4.8 mg target is the mistake that schedule exists to prevent.",
  },
];

export const metadata: Metadata = {
  title: "What is Survodutide? The GLP-1/Glucagon Dual Agonist for the Liver — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family), FAQS)} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Header ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/incretins-metabolic" className="text-accent hover:text-ink">
                Incretins &amp; metabolic
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
            <Section title="Not a bigger number — a different pair">
              <P>
                The metabolic story is usually told as a count. A{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> agonist
                plays one receptor;{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link>{" "}
                plays two, adding <Link href="/hormones/gip" className={LINK}>GIP</Link>;{" "}
                <Link href="/hormones/retatrutide" className={LINK}>retatrutide</Link>{" "}
                plays three, adding glucagon on top. It is tempting to read the
                field as a ladder where each rung is one more receptor —{" "}
                <Link href="/insights/is-there-a-glp-4" className={LINK}>but there is no GLP-4</Link>,
                and the more interesting move is sideways, not up.
              </P>
              <P>
                <Link href="/hormones/survodutide" className={LINK}>Survodutide</Link>{" "}
                (Boehringer Ingelheim&rsquo;s BI 456906, developed with Zealand
                Pharma) is the sideways move. It is a dual agonist like
                tirzepatide — one acylated, once-weekly peptide, two receptor arms
                — but it keeps GLP-1 and drops GIP, pairing GLP-1 with the{" "}
                <Link href="/hormones/glucagon" className={LINK}>glucagon</Link>{" "}
                receptor instead. The molecule is a wager that of the two receptors
                you might add to GLP-1, glucagon is the one that earns its seat.
              </P>
              <ArmSwapFigure />
              <P>
                That choice is odd on its face. Glucagon is insulin&rsquo;s opposite
                number — the hormone that <Em>raises</Em> blood glucose. Putting a
                glucagon agonist inside a drug meant to lower it sounds like
                sabotage. The reason it works is that glucagon has a second job the
                diabetes framing ignores.
              </P>
            </Section>

            <Section title="Why glucagon earns a seat">
              <P>
                Glucagon does two things at once. It tells the liver to release
                glucose — the effect a diabetes drug fears — but it also raises the
                body&rsquo;s resting energy expenditure and, crucially, pushes the
                liver to oxidize its own stored fat. Those last two are exactly what
                a weight and liver drug wants. The design problem is to recruit the
                energy-burning and fat-mobilizing arms while neutralizing the
                glucose-raising one.
              </P>
              <P>
                The GLP-1 arm is the counterweight. GLP-1 drives{" "}
                <Link href="/insights/glp-1-signaling" className={LINK}>glucose-dependent insulin</Link>{" "}
                and quiets appetite; run it alongside glucagon and, if the ratio is
                right, the insulin arm holds blood sugar in check while the glucagon
                arm spends energy and empties the liver. Balance the two and you
                recruit weight loss from both sides of the ledger — less taken in,
                more spent — with the liver getting a benefit neither incretin arm
                delivers on its own.
              </P>
              <Callout label="The trade-off to respect">
                The glucagon arm is double-edged by construction. Because glucagon
                can raise glucose and lift heart rate, the balance only holds if the
                dose is <Em>titrated up slowly</Em> rather than started at target —
                the reason this whole class is escalated over weeks. It is a
                molecule built around a tension, not a free lunch.
              </Callout>
              <DocumentedRange id="survodutide" />
              <P>
                The box is the 2.4–4.8&nbsp;mg once-weekly target span from that
                phase 2 protocol, not the 0.6&nbsp;mg start and not a dose to pick.
                How the four kinds of milligram come apart is{" "}
                <Link href="/insights/how-to-read-peptide-dosing" className={LINK}>
                  how to read a peptide dose
                </Link>
                .
              </P>
            </Section>

            <Section title="The liver is the story, not the scale">
              <P>
                Survodutide can move the scale: in a phase 2 obesity trial the
                assigned arms were 0.6, 2.4, 3.6, or 4.8&nbsp;mg once weekly for 46
                weeks, with 20 weeks of escalation. On the primary planned-treatment
                analysis, mean weight change at the 4.8&nbsp;mg target was 14.9%
                against 2.8% on placebo (
                <a href={REF.leroux} target="_blank" rel="noopener noreferrer" className={LINK}>
                  le&nbsp;Roux et&nbsp;al., Lancet&nbsp;Diabetes&nbsp;Endocrinol, 2024
                </a>
                ). The ~19% figure that travels with the molecule is the
                actual-treatment reading of the same trial, not a second study. That
                is a strong number — but it is not what sets the molecule apart,
                because tirzepatide and retatrutide reach the same territory.
              </P>
              <P>
                The differentiator is the liver. In a phase 2 trial in{" "}
                <Em>MASH</Em> — metabolic dysfunction-associated steatohepatitis, the
                inflammatory, fibrosing form of fatty-liver disease — up to about
                62% of participants on survodutide had a histological improvement in
                MASH without worsening fibrosis, versus 14% on placebo (
                <a href={REF.sanyal} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Sanyal et&nbsp;al., NEJM, 2024
                </a>
                ). That is a class-leading liver
                signal, and it is the reason the molecule carries an FDA{" "}
                <Em>Breakthrough Therapy</Em> designation in MASH — a status the
                pure incretin agonists have not matched on the liver endpoint.
              </P>
              <Bullets
                items={[
                  [
                    "Weight",
                    "Primary planned-treatment analysis: 14.9% at 4.8 mg over 46 weeks vs 2.8% placebo. The ~19% headline is the actual-treatment figure from the same trial — competitive with the incretin co-agonists, not clearly ahead of them.",
                  ],
                  [
                    "Liver",
                    "the standout: MASH improvement without fibrosis worsening in the majority of treated participants at the best dose, the glucagon arm's signature contribution.",
                  ],
                  [
                    "Mechanism tell",
                    "the liver result tracks the glucagon receptor, not GLP-1 — direct evidence that which receptor you add changes what the drug is for.",
                  ],
                ]}
              />
              <P>
                Read against its siblings, survodutide is the cleanest natural
                experiment for the claim that co-agonism is about <Em>which</Em>{" "}
                signals you combine, not just how many. The{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>triple agonist</Link>{" "}
                folds glucagon into a three-receptor chord; survodutide isolates the
                GLP-1-plus-glucagon pairing and points it at a disease the incretin
                duo does not reach as well.
              </P>
            </Section>

            <Section title="What the near-future buyer is actually reaching for">
              <P>
                All of that is the science, and the science is genuinely
                promising. The marketplace read is more sober, and it is the same
                one this site keeps returning to: <Em>cataloged is not proven</Em>,
                and <Link href="/insights/what-you-can-actually-get" className={LINK}>reachable is not the same as ready</Link>.
                Survodutide reached research-chemical shelves ahead of its phase 3
                verdict. That verdict has since started to arrive: the SYNCHRONIZE
                obesity trials reported during 2026, ending with the cardiovascular
                safety trial in November, and Boehringer says it is preparing
                regulatory submissions. The phase 3 MASH readout, the one this
                article&rsquo;s liver thesis rests on, had not reported when this page
                was checked in November 2026, and no regulator has approved the drug.
              </P>
              <P>
                So a buyer reaching for grey-market survodutide today is reaching
                for a molecule that no regulator has reviewed, whose long-horizon
                safety has simply not been measured, and whose glucagon arm makes
                the <Em>dose</Em> matter more than usual — start-at-target is exactly
                the mistake the titration schedule exists to prevent. Stack on top of
                that the unknowns that attach to any unapproved, self-sourced peptide
                — identity, purity, and actual content of the vial, the concerns
                behind reading a <Link href="/methodology" className={LINK}>COA</Link> and
                understanding <Link href="/insights/where-the-powder-comes-from" className={LINK}>where the powder comes from</Link> —
                and the honest summary writes itself.
              </P>
              <Callout label="The frontier's real bottleneck">
                Availability moves faster than evidence. That a molecule is{" "}
                <Em>reachable this month</Em> is real information — it just is not the
                same information as what it does over years. Survodutide is a good
                bet on the biology and an open question on the page. Bullish on one,
                sceptical on the other.
              </Callout>
            </Section>

            <Section title="What&rsquo;s settled, and what phase 3 still has to answer">
              <P>
                <Em>Settled:</Em> GLP-1/glucagon co-agonism is a real and distinct
                design, the glucagon arm demonstrably recruits hepatic fat oxidation
                and energy expenditure, and survodutide&rsquo;s phase 2 liver data are
                the strongest in the metabolic class so far. The mechanism — pair the
                energy-spending hormone with an insulin-sparing one and let them
                cancel each other&rsquo;s downside — is elegant and well supported.
              </P>
              <P>
                <Em>Open:</Em> whether the MASH resolution survives phase 3; how the
                phase 3 obesity results, once published in full, compare with the
                14.9% planned-treatment phase 2 figure (and its ~19% actual-treatment
                twin); how the glucagon
                arm&rsquo;s glucose and heart-rate effects behave across a broad
                population; and, for anyone reaching a grey-market vial, everything
                that sits between a promising trial molecule and a known quantity in
                a syringe. Survodutide is a wager, not yet a settled result.
              </P>
            </Section>

            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">Common questions</h2>
              <dl className="mt-6 space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/40 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/survodutide" label="Survodutide reference monograph" />
                <CrossLink href="/insights/the-triple-agonist" label="Retatrutide: the triple agonist" />
                <CrossLink href="/insights/how-to-read-peptide-dosing" label="How to read a peptide dose — four kinds of milligram" />
                <CrossLink href="/insights/is-there-a-glp-4" label="Why there is no GLP-4" />
                <CrossLink href="/insights/what-you-can-actually-get" label="Cataloged vs. reachable" />
                <CrossLink href="/compare/survodutide-vs-tirzepatide" label="Survodutide vs tirzepatide" />
                <CrossLink href="/insights/the-hormone-we-tried-to-block" label="The hormone we tried to block — why glucagon blockers fattened the liver" />
                <CrossLink href="/research?q=What%20does%20adding%20glucagon-receptor%20agonism%20contribute%20in%20a%20GLP-1%2Fglucagon%20dual%20agonist%20like%20survodutide%3F" label="Ask the research agent for primary sources" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and trial evidence, summarized from
              public scientific literature and simplified in places. Not individualized medical advice or a prescription. Where a dose or regimen appears it is reported from its source as research literacy — so you can read the evidence yourself — not an instruction to dose. <StatusNote of={["survodutide"]} />{" "}
              Specific compounds and trials are named to explain the science; verify
              any claim against primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The one swapped arm: GLP-1 kept, GIP dropped, glucagon added ── */
function ArmSwapFigure() {
  const rows: { molecule: string; slug?: string; glp1: boolean; gip: "on" | "off" | null; gcgr: boolean; note: string }[] = [
    { molecule: "Semaglutide", slug: "semaglutide", glp1: true, gip: null, gcgr: false, note: "one note" },
    { molecule: "Tirzepatide", slug: "tirzepatide", glp1: true, gip: "on", gcgr: false, note: "GLP-1 + GIP" },
    { molecule: "Survodutide", slug: "survodutide", glp1: true, gip: null, gcgr: true, note: "GLP-1 + glucagon" },
    { molecule: "Retatrutide", slug: "retatrutide", glp1: true, gip: "on", gcgr: true, note: "all three" },
  ];
  const dot = (on: boolean, tone: string) => (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full"
      style={{ background: on ? tone : "transparent", boxShadow: on ? "none" : "inset 0 0 0 1px color-mix(in srgb, var(--color-ink) 18%, transparent)" }}
      aria-hidden
    />
  );
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-ink/10 text-ink/50">
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">Molecule</th>
            <th className="px-3 py-3 text-center font-mono text-[11px] font-medium uppercase tracking-wide">GLP-1R</th>
            <th className="px-3 py-3 text-center font-mono text-[11px] font-medium uppercase tracking-wide">GIPR</th>
            <th className="px-3 py-3 text-center font-mono text-[11px] font-medium uppercase tracking-wide">GCGR</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">Pairing</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.molecule} className="border-b border-ink/[0.06] last:border-0">
              <td className="px-4 py-3">
                {r.slug ? (
                  <Link href={`/hormones/${r.slug}`} className={LINK}>{r.molecule}</Link>
                ) : (
                  r.molecule
                )}
              </td>
              <td className="px-3 py-3 text-center">{dot(r.glp1, "var(--accent)")}</td>
              <td className="px-3 py-3 text-center">{dot(r.gip === "on", "var(--accent-blue)")}</td>
              <td className="px-3 py-3 text-center">{dot(r.gcgr, "var(--accent-amber)")}</td>
              <td className="px-4 py-3 text-ink/60">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="px-4 py-3 text-xs text-ink/40">
        Survodutide keeps GLP-1 and adds glucagon (amber) where tirzepatide adds
        GIP (blue) — the swapped arm, not a bigger count, is the whole idea.
      </figcaption>
    </figure>
  );
}
