import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-gip-paradox")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

export default function Article() {
  return (
    <>
      <JsonLd data={insightLd(insight, getFamily(insight.family))} />
      <SiteHeader />
      <main className="flex-1">
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
            <Section title="Two drugs, one receptor, opposite directions">
              <P>
                Here is a fact that should not sit comfortably together.{" "}
                <Link href="/hormones/tirzepatide" className={LINK}>Tirzepatide</Link>, the
                dual agonist behind some of the largest weight-loss numbers in medicine,
                works partly by <Em>activating</Em> the{" "}
                <Link href="/hormones/gip" className={LINK}>GIP</Link> receptor. And{" "}
                <Link href="/hormones/maridebart-cafraglutide" className={LINK}>maridebart cafraglutide</Link>,
                one of the most watched next-generation candidates, works partly by{" "}
                <Em>blocking</Em> the very same receptor. Agonist and antagonist, the same
                target — and both produce substantial weight loss.
              </P>
              <GipBothWays />
              <P>
                Under the intuition that a receptor is a volume knob — more signal, more
                effect — this is a contradiction. One of them should be turning the effect
                up and the other turning it down. Instead they point the same way on the
                scale. Resolving that is a small master class in how receptors actually
                behave, and it quietly dismantles the idea that drug design is just a matter
                of pushing harder.
              </P>
            </Section>

            <Section title="What GIP normally does">
              <P>
                GIP — glucose-dependent insulinotropic polypeptide — is the{" "}
                <Em>other</Em> incretin, released from gut K-cells after a meal. Like GLP-1,
                it potentiates glucose-dependent insulin release, which is the
                straightforward part. Its role in body weight and fat, though, has always
                been the murkier one: older work tied GIP signaling to fat storage, while
                more recent work points to central actions on appetite and, intriguingly, on
                the nausea that limits incretin therapy. GIP is not a hormone with one clean
                job — and that ambiguity is exactly the room the paradox lives in.
              </P>
            </Section>

            <Section title="The case for turning it on">
              <P>
                In tirzepatide, GIP agonism rides alongside GLP-1 agonism, and the pairing
                clearly outperforms GLP-1 alone. The leading explanations are that GIP-receptor
                activation adds a complementary appetite signal through the brain, and that it
                may <Em>blunt the nausea</Em> of GLP-1 agonism — letting the GLP-1 arm be
                pushed further before tolerability caps it. On this view GIP is a genuine
                second lever, and switching it on is additive.
              </P>
            </Section>

            <Section title="The case for turning it off">
              <P>
                Maridebart takes the opposite tack — an anti-GIP-receptor antibody carrying
                GLP-1 peptides, so it agonizes GLP-1 while <Em>antagonizing</Em> GIP — and it
                too drives large weight loss. The rationale draws on GIP&rsquo;s older
                association with fat storage (block it, and you remove a pro-storage signal)
                and on a subtler receptor argument we will come to. The antibody scaffold is
                its own payoff: a long half-life that supports{" "}
                <Em>once-monthly</Em> dosing, a cadence injectable peptides can&rsquo;t
                easily reach.
              </P>
            </Section>

            <Section title="How can both be true?">
              <P>
                Three resolutions are on the table, and they aren&rsquo;t mutually exclusive:
              </P>
              <Bullets
                items={[
                  [
                    "Sustained agonism becomes functional antagonism",
                    "flood a receptor continuously and it desensitizes and internalizes — down-regulating until it barely responds. A long-acting GIP agonist may end up chronically silencing the receptor, arriving at nearly the same downstream state as an outright blocker. Push it hard enough and blocking it start to rhyme",
                  ],
                  [
                    "GIP does different things in different tissues",
                    "its actions in the brain, the pancreas, and adipose aren't the same, so agonism and antagonism can each pick out a different, beneficial subset of effects rather than being simple opposites",
                  ],
                  [
                    "It isn't settled yet",
                    "the honest answer is that the field does not fully agree on GIP's contribution, and the two strategies are, in part, a live experiment being run at scale to find out",
                  ],
                ]}
              />
              <P>
                The first is the most striking, because it means agonist and antagonist need
                not be enemies at all. If continuous activation ends in a quiet receptor,
                then the two drugs may be taking different roads to the{" "}
                <Em>same downstream destination</Em> — reduced net GIP signaling — one by
                exhausting the receptor, the other by capping it directly.
              </P>
            </Section>

            <Callout label="The real insight">
              A receptor is not a volume knob; it&rsquo;s a system with feedback. Sustained
              agonism and outright antagonism can land in the same place because the receptor
              fights back against constant stimulation. &ldquo;On&rdquo; held long enough
              starts to behave like &ldquo;off&rdquo; — which is why you cannot read a drug&rsquo;s
              effect from the direction of its arrow alone.
            </Callout>

            <Section title="Why the paradox matters">
              <P>
                Step back and the GIP puzzle is the cleanest possible refutation of the{" "}
                <Link href="/insights/is-there-a-glp-4" className={LINK}>&ldquo;bigger number&rdquo; model</Link>{" "}
                of this field. If two molecules can hit the same receptor in opposite
                directions and both win, then &ldquo;more agonism&rdquo; was never the axis of
                progress. What matters is <Em>net signaling</Em> in the right tissues over the
                right timescale — a far more interesting design target than raw potency, and
                one that rewards cleverness like maridebart&rsquo;s antibody trick over brute
                force.
              </P>
              <P>
                It also reframes GIP itself. Far from a settled &ldquo;second incretin,&rdquo;
                it is an open question the industry is probing from both ends at once — the
                same spirit in which the{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>triple agonist</Link>{" "}
                found a use for glucagon, the hormone that raises blood sugar. The frontier
                keeps making the same point in new costumes: a hormone&rsquo;s meaning
                isn&rsquo;t fixed by its label. It depends on the dose, the duration, the
                tissue, and the company it keeps — and the molecules that read that nuance
                best are the ones redrawing the edge.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/maridebart-cafraglutide" label="Maridebart cafraglutide — GLP-1 on, GIP off" />
                <CrossLink href="/hormones/gip" label="GIP — the other incretin" />
                <CrossLink href="/insights/is-there-a-glp-4" label="Is there a GLP-4?" />
                <CrossLink href="/insights/the-triple-agonist" label="The triple agonist" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized
              and simplified from the public record; the mechanisms behind GIP agonism versus
              antagonism are an area of active, unsettled research. Not medical advice.
              Compounds are named to explain the science; maridebart cafraglutide is
              investigational and not an approved treatment.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Opposite inputs at one receptor, same output ── */
function GipBothWays() {
  const W = 600;
  const left = { x: 130, y: 62 }, right = { x: 470, y: 62 };
  const receptor = { x: 300, y: 126 };
  const outcome = { x: 300, y: 208 };

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} 250`} className="w-full" role="img" aria-label="Tirzepatide activates the GIP receptor and maridebart blocks it, yet both routes lead to weight loss">
        {/* converging paths */}
        <line x1={left.x} y1={left.y + 22} x2={outcome.x - 10} y2={outcome.y - 18} stroke="var(--accent-blue)" strokeWidth="2" strokeOpacity="0.5" />
        <line x1={right.x} y1={right.y + 22} x2={outcome.x + 10} y2={outcome.y - 18} stroke="var(--accent-amber)" strokeWidth="2" strokeOpacity="0.5" />

        {/* sign tokens on each path */}
        <g>
          <circle cx="214" cy="132" r="12" fill="var(--surface)" stroke="var(--accent-blue)" strokeWidth="1.5" />
          <text x="214" y="137" textAnchor="middle" fill="var(--accent-blue)" fontSize="15" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">+</text>
        </g>
        <g>
          <circle cx="386" cy="132" r="12" fill="var(--surface)" stroke="var(--accent-amber)" strokeWidth="1.5" />
          <text x="386" y="138" textAnchor="middle" fill="var(--accent-amber)" fontSize="15" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">–</text>
        </g>

        {/* left drug */}
        <text x={left.x} y={left.y - 8} textAnchor="middle" fill="var(--accent-blue)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Tirzepatide</text>
        <text x={left.x} y={left.y + 12} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="11" fontFamily="var(--font-geist-mono), monospace">turns GIP ON</text>

        {/* right drug */}
        <text x={right.x} y={right.y - 8} textAnchor="middle" fill="var(--accent-amber)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Maridebart</text>
        <text x={right.x} y={right.y + 12} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="11" fontFamily="var(--font-geist-mono), monospace">turns GIP OFF</text>

        {/* receptor pill (behind the crossing) */}
        <rect x={receptor.x - 62} y={receptor.y - 15} width="124" height="30" rx="15" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x={receptor.x} y={receptor.y + 4} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">GIP receptor</text>

        {/* outcome */}
        <text x={outcome.x} y={outcome.y + 3} textAnchor="middle" fill="var(--accent-teal)" fontSize="16" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">↓ weight loss</text>
        <text x={outcome.x} y={outcome.y + 22} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11" fontFamily="var(--font-geist-mono), monospace">either direction</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Activate the receptor or block it — the two roads meet at the same outcome.
      </figcaption>
    </figure>
  );
}
