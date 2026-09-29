import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";

const insight = getInsight("the-arm-that-points-at-the-liver")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
          />
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
            </Section>

            <Section title="The liver is the story, not the scale">
              <P>
                Survodutide can move the scale: in a phase 2 obesity trial the
                highest dose cut body weight by roughly 19% at 46 weeks, and the
                curve had not flattened by the end (Le Roux et al.,{" "}
                <Em>Lancet</Em> 2024). That is a strong number — but it is not what
                sets the molecule apart, because tirzepatide and retatrutide reach
                the same territory.
              </P>
              <P>
                The differentiator is the liver. In a phase 2 trial in{" "}
                <Em>MASH</Em> — metabolic dysfunction-associated steatohepatitis, the
                inflammatory, fibrosing form of fatty-liver disease — up to about
                83% of participants on survodutide had a histological improvement in
                MASH without worsening fibrosis, versus roughly 18% on placebo
                (Sanyal et al., <Em>NEJM</Em> 2024). That is a class-leading liver
                signal, and it is the reason the molecule carries an FDA{" "}
                <Em>Breakthrough Therapy</Em> designation in MASH — a status the
                pure incretin agonists have not matched on the liver endpoint.
              </P>
              <Bullets
                items={[
                  [
                    "Weight",
                    "≈19% at the top phase-2 dose over 46 weeks — competitive with the incretin co-agonists, not clearly ahead of them.",
                  ],
                  [
                    "Liver",
                    "the standout: MASH resolution without fibrosis worsening in the large majority of treated participants, the glucagon arm's signature contribution.",
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
                Survodutide is arriving on research-chemical shelves ahead of its
                phase 3 verdict — the SYNCHRONIZE obesity program and a phase 3 MASH
                trial are the readouts that will decide whether the phase 2 promise
                holds at scale, and they are not in yet.
              </P>
              <P>
                So a buyer reaching for grey-market survodutide today is reaching
                for a molecule whose case rests on phase 2, whose long-horizon
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
                <Em>Open:</Em> whether the ~19% weight loss and the MASH resolution
                survive phase 3 at scale and over longer horizons; how the glucagon
                arm&rsquo;s glucose and heart-rate effects behave across a broad
                population; and, for anyone reaching a grey-market vial, everything
                that sits between a promising trial molecule and a known quantity in
                a syringe. Survodutide is a wager, not yet a settled result.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/survodutide" label="Survodutide reference monograph" />
                <CrossLink href="/insights/the-triple-agonist" label="Retatrutide: the triple agonist" />
                <CrossLink href="/insights/is-there-a-glp-4" label="Why there is no GLP-4" />
                <CrossLink href="/insights/what-you-can-actually-get" label="Cataloged vs. reachable" />
                <CrossLink href="/compare/survodutide-vs-tirzepatide" label="Survodutide vs tirzepatide" />
                <CrossLink href="/research?q=What%20does%20adding%20glucagon-receptor%20agonism%20contribute%20in%20a%20GLP-1%2Fglucagon%20dual%20agonist%20like%20survodutide%3F" label="Ask the research agent for primary sources" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and trial evidence, summarized from
              public scientific literature and simplified in places. Not medical
              advice, dosing guidance, or a recommendation to use or source any
              compound. Survodutide is investigational and not approved for any use.
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
