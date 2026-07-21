import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("glp-1-in-a-pill")!;

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
            <Section title="The needle was never a choice">
              <P>
                A peptide is, chemically,{" "}
                <Link href="/insights/getting-the-molecule-in" className={LINK}>food</Link>.
                Swallow one and the acid and enzymes of your gut treat it exactly like the
                protein in a meal — they take it apart for parts before it can act. That is
                why the{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> class has lived on
                the needle: injection isn&rsquo;t a marketing preference, it&rsquo;s a way
                around digestion. So the obvious dream — put it in a pill — runs straight
                into physics.
              </P>
              <P>
                And yet the pill is arriving. What&rsquo;s interesting is that the field
                found <Em>two</Em> ways through, and they are philosophical opposites. One
                keeps the peptide and forces it across the gut wall. The other gives up on
                the peptide entirely and rebuilds its message out of a completely different
                kind of molecule. Understanding why the second approach is the real
                revolution is the whole story.
              </P>
            </Section>

            <Section title="Route one: smuggle the peptide through">
              <P>
                The first oral GLP-1 to reach patients kept the peptide and cheated the gut.
                Oral{" "}
                <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link> is the
                same molecule as the injection, co-formulated with an absorption enhancer —
                a small helper compound (SNAC) that locally raises the pH and loosens the
                stomach lining just enough for a sliver of the dose to slip across before it
                is destroyed.
              </P>
              <P>
                &ldquo;A sliver&rdquo; is not an exaggeration: only on the order of{" "}
                <Em>one percent</Em> of an oral semaglutide dose actually makes it into the
                bloodstream. It works anyway, because the molecule is potent enough that you
                can dose around the enormous waste — swallow a large amount so that the
                surviving one percent is still a real dose. The catch is that the smuggling
                is fragile: it has to be taken fasting, with a sip of water and then nothing
                else for a while, because any food or extra fluid dilutes the trick and
                sends absorption toward zero. It is a genuine achievement, but it is the
                peptide <Em>forced</Em> across a wall built to stop it.
              </P>
            </Section>

            <Section title="Route two: stop being a peptide">
              <P>
                The second route asks a stranger question. What if you didn&rsquo;t need the
                peptide at all — only the <Em>effect</Em> of the peptide? A receptor is a
                lock. The peptide is one key that opens it. But a lock doesn&rsquo;t know or
                care what a key is made of; it only responds to the right shape turning in
                it. So: build a different key.
              </P>
              <SameLockTwoKeys />
              <P>
                That is what orforglipron is — a <Em>non-peptide small molecule</Em> that
                switches on the very same GLP-1 receptor, engineered from the ground up in a
                chemical class the gut has no machinery to digest. It isn&rsquo;t smuggled
                across the gut wall; it simply walks across, the way ordinary small-molecule
                pills always have, because there was never a peptide for the gut to attack.
                No absorption enhancer, no one-percent tax, and — as reported so far — none
                of oral semaglutide&rsquo;s strict food-and-water choreography. Same message
                delivered to the same receptor, in a body the gut ignores.
              </P>
            </Section>

            <Callout label="The real insight">
              A receptor reads the signal, not the sender. Once you accept that, the
              delivery problem stops being a problem to solve and becomes a premise to
              discard: you don&rsquo;t make the fragile peptide survive the gut — you write
              its message in a molecule that was never fragile to begin with. Route one
              beats the wall. Route two retires it.
            </Callout>

            <Section title="Why a small molecule is bigger than a pill">
              <P>
                The convenience of swallowing instead of injecting is the least of it. The
                deeper consequence is how the medicine gets <Em>made</Em>. Peptides are
                built by specialized synthesis or fermentation, kept cold, and delivered by
                injection — a supply chain with real limits on how many people it can reach,
                as the shortages of the injectable era made obvious. A small molecule is
                classical pharmaceutical chemistry: made in bulk in a reactor, stable at
                room temperature, pressed into a tablet, shipped anywhere a pill can go.
              </P>
              <Bullets
                items={[
                  [
                    "Scale",
                    "chemical synthesis of a small molecule can supply populations, not just patients — the manufacturing ceiling that constrained injectable peptides largely lifts",
                  ],
                  [
                    "Cost and cold chain",
                    "a room-temperature tablet strips out refrigeration, needles, and specialized fill-finish — the same hand-off-heavy logistics that dog lyophilized peptide",
                  ],
                  [
                    "Reach",
                    "a cheap, stable pill is the difference between a specialty drug and something a primary-care prescription can put nearly anywhere",
                  ],
                ]}
              />
              <P>
                This is where the two routes truly diverge. Oral semaglutide is a better
                <Em> format</Em> for the same peptide, and it still carries the peptide&rsquo;s
                manufacturing weight. A small molecule changes the{" "}
                <Link href="/insights/where-the-powder-comes-from" className={LINK}>economics of supply</Link>{" "}
                itself.
              </P>
            </Section>

            <Section title="Why this was supposed to be hard">
              <P>
                None of this was expected to work. The GLP-1 receptor is a class B GPCR — a
                receptor with a large extracellular domain that evolved to grab a long
                peptide by wrapping around it, like a hand closing over a rope. Small
                molecules are pebbles by comparison, and for years the conventional wisdom
                was that you could not get a pebble to flip a switch designed for a rope.
                Peptide-hormone receptors were, in the drug-hunter&rsquo;s phrase,
                &ldquo;undruggable&rdquo; by pills.
              </P>
              <P>
                That reputation is now falling, and not effortlessly — more than one
                small-molecule GLP-1 candidate has stumbled on tolerability or been dropped,
                a reminder that finding a pebble that turns the lock <Em>cleanly</Em> is
                genuinely hard. But the existence proof is in. A small molecule can activate
                a receptor built for a peptide, which quietly reopens a huge shelf of
                peptide-hormone targets — the{" "}
                <Link href="/insights/the-triple-agonist" className={LINK}>incretins and beyond</Link>{" "}
                — to the pill.
              </P>
            </Section>

            <Section title="The frontier grows a new dimension">
              <P>
                Step back to the map. The metabolic story is usually told as new receptors
                and new axes — dual and triple agonists, amylin,{" "}
                <Link href="/insights/is-there-a-glp-4" className={LINK}>the branches beyond a bigger number</Link>.
                Delivery is the axis that runs perpendicular to all of them:{" "}
                <Em>form factor</Em>. The same biology, freed from the needle and the cold
                chain, reaches a fundamentally larger world. When a medicine this effective
                becomes a cheap, stable tablet, it stops being a specialty drug and starts
                behaving like infrastructure — and that shift owes less to any new receptor
                than to a simple, radical idea: keep the message, change the messenger.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/getting-the-molecule-in" label="The delivery problem" />
                <CrossLink href="/hormones/semaglutide" label="Semaglutide — the peptide going oral" />
                <CrossLink href="/insights/is-there-a-glp-4" label="Is there a GLP-4?" />
                <CrossLink href="/insights/where-the-powder-comes-from" label="Where the powder comes from" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized
              and simplified from the public record. Not medical advice. Compounds are named
              to explain the science, not to endorse any use; oral semaglutide is approved,
              while orforglipron is investigational and not an approved treatment.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Same receptor, two very different keys: peptide vs small molecule ── */
function SameLockTwoKeys() {
  const W = 600, membraneY = 178, notchX = 300, notchY = 138;
  // Peptide: a short chain of residues docking from the upper-left.
  const chain = [
    [104, 58],
    [136, 74],
    [168, 58],
    [200, 74],
    [232, 60],
  ] as const;
  // Small molecule: a compact cluster docking from the upper-right.
  const mol = [
    [470, 58],
    [492, 70],
    [470, 82],
    [448, 70],
  ] as const;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} 250`} className="w-full" role="img" aria-label="A long peptide and a compact small molecule both dock the same GLP-1 receptor and switch it on — the receptor reads the signal, not the sender">
        {/* membrane */}
        <line x1="24" y1={membraneY} x2={W - 24} y2={membraneY} stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1.5" />
        <line x1="24" y1={membraneY + 8} x2={W - 24} y2={membraneY + 8} stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1.5" />

        {/* receptor with a V-notch binding site at the top */}
        <path
          d={`M${notchX - 46} ${membraneY + 28}
              L${notchX - 46} ${notchY + 6}
              L${notchX - 12} ${notchY}
              L${notchX} ${notchY + 16}
              L${notchX + 12} ${notchY}
              L${notchX + 46} ${notchY + 6}
              L${notchX + 46} ${membraneY + 28} Z`}
          fill="var(--accent)"
          fillOpacity="0.14"
          stroke="var(--accent)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <text x={notchX} y={membraneY + 20} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.85" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          GLP-1 receptor
        </text>

        {/* peptide key (left) */}
        {chain.map(([x, y], i) => (
          <g key={`p${i}`}>
            {i > 0 && (
              <line x1={chain[i - 1][0]} y1={chain[i - 1][1]} x2={x} y2={y} stroke="var(--accent-blue)" strokeWidth="2" strokeOpacity="0.6" />
            )}
            <circle cx={x} cy={y} r="7" fill="var(--accent-blue)" fillOpacity="0.9" />
          </g>
        ))}
        <line x1={chain[chain.length - 1][0]} y1={chain[chain.length - 1][1]} x2={notchX - 12} y2={notchY} stroke="var(--accent-blue)" strokeWidth="2" strokeOpacity="0.35" strokeDasharray="3 4" />
        <text x="104" y="38" fill="var(--accent-blue)" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Peptide</text>
        <text x="104" y="104" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11" fontFamily="var(--font-geist-mono), monospace">injected · or smuggled</text>

        {/* small-molecule key (right) */}
        {mol.map(([x, y], i) => (
          <g key={`m${i}`}>
            <line x1="470" y1="70" x2={x} y2={y} stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.5" />
            <circle cx={x} cy={y} r="6" fill="var(--accent)" />
          </g>
        ))}
        <line x1="470" y1="82" x2={notchX + 12} y2={notchY} stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.35" strokeDasharray="3 4" />
        <text x="496" y="38" textAnchor="end" fill="var(--accent)" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Small molecule</text>
        <text x="496" y="104" textAnchor="end" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11" fontFamily="var(--font-geist-mono), monospace">swallowed</text>

        {/* shared 'on' signal */}
        <text x={notchX} y={membraneY + 40} textAnchor="middle" fill="var(--accent-teal)" fontSize="11" fontWeight="600" fontFamily="var(--font-geist-mono), monospace">
          same &ldquo;on&rdquo; ↓
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two keys of completely different make — one a long peptide, one a rugged small molecule — turning the same lock.
      </figcaption>
    </figure>
  );
}
