import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-rest-of-the-cascade")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  coviello: "https://pubmed.ncbi.nlm.nih.gov/15713727/", // Coviello et al., J Clin Endocrinol Metab 2005 — low-dose hCG maintains intratesticular testosterone during T-induced gonadotropin suppression; ITT fell ~94% on T alone, restored dose-dependently by hCG
  finkelstein: "https://www.nejm.org/doi/full/10.1056/NEJMoa1206168", // Finkelstein et al., N Engl J Med 2013 — aromatase blockade in men on controlled testosterone reduced sexual desire and erectile function: an independent estradiol effect
  neurosteroids: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8477036/", // Review: brexanolone (a formulation of allopregnanolone), a GABA-A positive allosteric modulator, FDA-approved for postpartum depression — proof a progesterone-derived neurosteroid moves mood
  lijesen: "https://pubmed.ncbi.nlm.nih.gov/8527285/", // Lijesen et al., Br J Clin Pharmacol 1995 — criteria-based meta-analysis: hCG ineffective for weight, fat distribution, hunger, or "feeling of well-being"
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(244,114,182,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/reproductive-gonadal" className="text-accent-rose hover:text-ink">
                Reproductive &amp; gonadal
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
            <Section title="Feeling better than the number">
              <P>
                A man on testosterone therapy can have textbook labs and still feel
                like he is chasing something. Testosterone mid-range, estradiol in the
                window, everything the chart asks for. He adds hCG, and a few weeks
                later reports what the chart never promised: a steadier mood, a clearer
                head, drive and motivation the testosterone reading alone hadn&rsquo;t
                restored. It is a common enough account in clinic and in the
                communities around testosterone use to deserve a mechanism rather than a
                shrug. It is also an odd one, because hCG is, in the clinic, a fertility
                drug. Why would relighting the testicle change how a man feels?
              </P>
              <P>
                The honest answer runs through what replacement quietly costs. Topping
                up one hormone silences the gland that used to make it, and some of what
                that gland made was doing work no testosterone panel ever shows. What
                these men describe is, in the most defensible reading, what it feels
                like to get part of that back.
              </P>
            </Section>

            <Section title="Replacement has a blind spot">
              <P>
                Testosterone therapy raises the level in your blood to target. The
                hypothalamus and pituitary read that high level and do what they are
                built to do: they stop sending the release signals. GnRH falls, the
                pituitary&rsquo;s{" "}
                <Link href="/hormones/lh" className={LINK}>LH</Link> and FSH fall with
                it, and the Leydig cells of the testis lose the drive that keeps them
                working. Serum testosterone looks perfect on the draw. Inside the
                testis, the lights go out.
              </P>
              <P>
                The scale of that is easy to underestimate. In a randomized study,
                giving men testosterone dropped their{" "}
                <a href={REF.coviello} target="_blank" rel="noopener noreferrer" className={LINK}>
                  intratesticular testosterone by about 94 percent
                </a>{" "}
                (Coviello et al., <Em>J. Clin. Endocrinol. Metab.</Em> 2005); adding a
                low dose of hCG, 250 IU every other day, held it in the normal range,
                and did so in a clean dose-response. Concentration is the reason it
                matters: a working testis runs at something like 50 to 100 times the
                testosterone level found in blood, and it uses that gradient to do far
                more than top up the circulation. A serum number is blind to all of it.
              </P>
              <P>
                <Link href="/hormones/hcg" className={LINK}>hCG</Link> is what lets you
                light the testis back up without waiting on the pituitary. It binds the
                same receptor LH does &ndash; the LH/choriogonadotropin receptor &ndash;
                so to a Leydig cell it reads as an LH signal. Nothing is added from
                outside. The cell is simply told to switch on again.
              </P>
            </Section>

            <Section title="A testis makes more than testosterone">
              <P>
                A Leydig cell is a small steroid factory, and testosterone is its final
                product, not its only one. The line runs from cholesterol through
                pregnenolone, into progesterone and 17-hydroxyprogesterone, on to
                androstenedione, then testosterone, and finally to estradiol by way of
                the aromatase enzyme. Drive the cell with LH or hCG and the whole line
                runs.
              </P>
              <CascadeFigure />
              <P>
                Exogenous testosterone delivers the last box on that line and nothing
                above it. Your body will still aromatize some of that testosterone into
                estradiol out in the periphery, so you are not left with none. But the
                pregnenolone and progesterone the testis used to make, and the estradiol
                it produced locally, all go missing while the factory is dark. The
                phrase in the title is meant literally. The rest of the cascade is a
                specific list of molecules, and several of them are active in the brain.
              </P>
            </Section>

            <Section title="Some of those are neurosteroids">
              <P>
                Pregnenolone and progesterone are the feedstock for a family of
                neuroactive steroids. The best known is allopregnanolone, a metabolite
                of progesterone that acts as a positive allosteric modulator of the
                GABA-A receptor, the brain&rsquo;s main inhibitory channel. Its
                signature is calm: anxiolytic, settling, mood-steadying. This is
                well-trodden pharmacology, not a fringe claim. Allopregnanolone is the
                active principle of{" "}
                <a href={REF.neurosteroids} target="_blank" rel="noopener noreferrer" className={LINK}>
                  brexanolone and zuranolone
                </a>, the two neurosteroids the FDA approved for postpartum depression,
                which is direct proof that a progesterone-derived steroid can move mood,
                and move it fast, through GABA-A.
              </P>
              <P>
                From there the chain from testis to mood is coherent: restore
                Leydig-cell output, put more of the upstream steroid substrate back into
                circulation, and you supply more raw material for the neuroactive
                steroids that a dose of testosterone never touches.
              </P>
              <Callout label="Plausible is not proven">
                Every link in that chain is real on its own. The substrates are real,
                the neurosteroid pharmacology is real, the GABA-A effect is real. What
                nobody has shown is the whole chain running in these men &mdash; that
                hCG added to testosterone raises brain neurosteroids enough to lift
                mood, and that this, rather than something simpler, is what they are
                feeling. It is a good hypothesis. It should be carried as one, not as a
                finding.
              </Callout>
            </Section>

            <Section title="The estradiol you can actually measure">
              <P>
                The least speculative part of the story is estradiol. In men it is not a
                hormone to be merely tolerated; it is required for libido, erectile
                function, mood, and bone. The cleanest demonstration came from a
                controlled study that pried the two hormones apart: when men on fixed
                testosterone had aromatase blocked so estradiol couldn&rsquo;t form,{" "}
                <a href={REF.finkelstein} target="_blank" rel="noopener noreferrer" className={LINK}>
                  sexual desire and erectile function fell
                </a>{" "}
                (Finkelstein et al., <Em>N. Engl. J. Med.</Em> 2013), an effect the
                authors traced to the missing estradiol rather than to testosterone.
              </P>
              <P>
                Estradiol is a frequent casualty of the way therapy gets run. An
                over-eager aromatase inhibitor, or simply the loss of the testis&rsquo;s
                own estrogen production, can leave a man with plenty of testosterone and
                too little estradiol: flat, low on libido, achy in the joints, low in
                mood. hCG restores aromatization inside the testis and brings estradiol,
                and the testosterone-to-estradiol balance, back up with it. A large
                share of &ldquo;hCG made me feel human again&rdquo; is probably this
                &ndash; and unlike the neurosteroid account, you can watch it happen on
                a lab draw.
              </P>
            </Section>

            <Section title="Which hormone lights which cell">
              <P>
                Everything so far has been the Leydig cell&rsquo;s story. The testis
                runs on two signals, though, not one, and they wake two different cells.{" "}
                <Link href="/hormones/lh" className={LINK}>LH</Link> drives the Leydig
                cell and its steroid cascade.{" "}
                <Link href="/hormones/fsh" className={LINK}>FSH</Link> drives the Sertoli
                cell, the nurse cell of sperm production, which also makes inhibin B and
                runs its own aromatase inside the seminiferous tubule.
              </P>
              <TwoArmFigure />
              <P>
                hCG stands in for LH, and only for LH. It relights the Leydig arm &ndash;
                the intratesticular testosterone, the steroid cascade, the estradiol
                &ndash; and leaves the Sertoli arm dark. That is why hCG keeps the testes
                full-sized and holds some sperm production, while a man who wants full
                fertility back, especially after a long shutdown, usually needs FSH as
                well.
              </P>
              <P>
                That is where hMG earns its place. Human menopausal gonadotropin, or
                menotropin, is purified from urine and carries both LH and FSH activity in
                roughly equal measure &ndash; and in some modern preparations the LH half
                is literally supplied by added hCG. Recombinant FSH does the Sertoli job
                on its own. So the hormones sort cleanly by the cell they wake: hCG and LH
                light the Leydig, steroid-making arm; hMG and FSH light the Sertoli,
                fertility arm.{" "}
                <Link href="/hormones/gnrh" className={LINK}>GnRH</Link> and the
                estrogen-blocking SERMs sit higher up and wake both, by working through the
                pituitary rather than the testis.
              </P>
              <Callout label="Where the feeling lives">
                Most of the mood and wellbeing story sits on the Leydig arm &ndash; the
                steroids and estradiol &ndash; which is the arm hCG addresses directly. The
                FSH arm is mostly about fertility and a sense of completeness, less about
                the day-to-day baseline. So the rest of the cascade honestly includes a
                whole second axis that hCG alone never touches, even if that axis is not
                where a man usually notices his mood.
              </Callout>
            </Section>

            <Section title="From replacement to restart">
              <P>
                Line the options up and they form a ladder, rung by rung, by how much of
                the system stays awake. What men describe as they climb it is less a
                matter of more testosterone than of more gland.
              </P>
              <Bullets
                items={[
                  ["Testosterone alone", "The floor. Both arms dark, the testes idle, the axis silent. The serum number is right, and men still often describe a flatness, a sense of being switched off, sometimes a testicular emptiness or ache. Everything upstream of the injection goes unmade."],
                  ["Testosterone with hCG", "The Leydig arm back on: intratesticular testosterone and the steroid cascade restored, the testes full. This is where the 'switched on again' reports cluster, from libido to drive to a steadier baseline. The catch is estradiol. hCG revives the testis's own aromatization, so some men swing high and have to manage it; the hormone that helps is also the one that can overshoot."],
                  ["hCG plus hMG or FSH", "Both arms awake. Added mostly when fertility is the goal: sperm production, inhibin B, the fuller testicular ecosystem. What men report here is less a mood shift than a sense of completeness, the gland doing its whole job again rather than the steroid half alone."],
                  ["A SERM instead, enclomiphene or clomiphene", "Skip the injections and lift the whole axis from the top by taking estrogen's brake off the pituitary: your own LH and FSH, pulsatile, fertility preserved. It works only if the pituitary is intact, and older clomiphene carries a long-lived estrogenic isomer that can bring its own mood and visual side effects. Enclomiphene is the cleaner cut."],
                  ["Pulsatile GnRH", "The most faithful copy of physiology, restoring both gonadotropins in rhythm rather than as a steady dose. It needs a pump and an intact pituitary, so it stays largely a specialist tool, but it is the reference standard the rest of the ladder is only approximating."],
                ]}
              />
              <P>
                The throughline is the one the piece keeps arriving at. Replacement hands
                you the hormone; each rung above it hands back more of the gland, and for
                some men more of the way they used to feel. Which rung fits is a clinical
                decision with real trade-offs at every step. None of this is a protocol,
                only the reasoning under one.
              </P>
            </Section>

            <Section title="The part that isn't chemistry">
              <P>
                Not all of the reported benefit needs a steroid to explain it, and the
                sceptical reading is part of the honest one.
              </P>
              <Bullets
                items={[
                  ["Reassurance", "hCG keeps the testes full-sized and fertility on the table. Men on testosterone alone often describe feeling switched off; men who add hCG describe feeling switched on. Some of that is mood following self-image rather than serum chemistry, which makes it no less real to the person living in it."],
                  ["Expectancy", "hCG is usually added by a motivated man hoping for exactly this result, with no blinding and no control arm. Subjective wellbeing is the single endpoint most easily moved by anticipation."],
                  ["A bad setup, corrected", "Some of the credit belongs to undoing an error — a crashed estradiol, an over-suppressed axis — rather than to anything hCG adds that is new. The improvement is genuine; the story a man tells about why can still be wrong."],
                ]}
              />
              <Callout label="This molecule has overpromised before">
                &ldquo;hCG makes you feel great&rdquo; has been sold before. The Simeons
                protocol paired hCG injections with near-starvation and promised
                effortless weight loss and a sense of wellbeing, and it sold for
                decades. Put to controlled test, a{" "}
                <a href={REF.lijesen} target="_blank" rel="noopener noreferrer" className={LINK}>
                  criteria-based meta-analysis
                </a>{" "}
                found hCG did nothing for weight, for fat distribution, for hunger, or
                &ndash; the phrase is in the paper &ndash; for &ldquo;feeling of
                well-being&rdquo; beyond the diet alone (Lijesen et al., 1995). The
                lesson isn&rsquo;t that hCG is inert. It is that this exact molecule has
                a long record of subjective-benefit claims that dissolved the moment
                anyone controlled for expectation.
              </Callout>
            </Section>

            <Section title="What the evidence actually supports">
              <P>
                The site&rsquo;s creed &ndash; bullish on the science, sceptical on the
                page &ndash; sorts this cleanly. Graded by what the data will bear:
              </P>
              <Bullets
                items={[
                  ["Well established", "hCG maintains intratesticular testosterone and testicular function while exogenous testosterone suppresses the axis, preserving testis size and fertility. This rests on randomized, dose-response human data (Coviello 2005)."],
                  ["Settled, for fertility", "Beyond maintaining intratesticular testosterone, adding FSH activity (as hMG or recombinant FSH) restores spermatogenesis, most clearly in hypogonadotropic hypogonadism. The division of labor between the LH and FSH arms is standard reproductive endocrinology, not conjecture."],
                  ["Well grounded", "Estradiol is independently necessary for male libido, erectile function, and mood; restoring the testis's own estrogen output is a real, measurable route to feeling better (Finkelstein 2013)."],
                  ["Plausible, not proven", "A broader circulating steroid milieu — pregnenolone, progesterone, and the neuroactive steroids they feed — as a path to a steadier baseline. The biology is sound; no controlled trial has tested hCG-on-TRT against a mood endpoint."],
                  ["Confounded", "The subjective 'mental benefit' reports are unblinded and uncontrolled, and they mix chemistry with reassurance, expectancy, and the quiet correction of bad protocols."],
                  ["Overclaimed before", "hCG sold for wellbeing and weight loss was tested and came back negative (Lijesen 1995). The mood claim on TRT deserves the same standard, not a pass."],
                ]}
              />
            </Section>

            <Section title="Where to believe it">
              <P>
                Set against all that, the reports make sense without any magic.
                Testosterone therapy hands you the one molecule the lab measures. hCG
                asks the gland to make the others again, and the brain had been quietly
                using some of them. Where the effect shows up on a chart, in estradiol
                and the balance around it, believe it. Where it doesn&rsquo;t, in the
                neurosteroid milieu, hold both the curiosity and the scepticism: the
                mechanism is genuinely promising and genuinely unproven, and those are
                allowed to be true at once.
              </P>
              <P>
                None of this is a recommendation. hCG and testosterone are prescription
                decisions with real trade-offs, and what you have just read is an
                account of mechanism, not a protocol.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/hcg" label="hCG — the reference monograph" />
                <CrossLink href="/hormones/lh" label="LH — the signal hCG imitates" />
                <CrossLink href="/hormones/fsh" label="FSH — the Sertoli arm hCG leaves dark" />
                <CrossLink href="/families/reproductive-gonadal" label="Reproductive & gonadal — the HPG axis, end to end" />
                <CrossLink href="/insights/the-pulse-is-the-message" label="The pulse is the message — how rhythm, not level, runs the axis" />
                <CrossLink href="/insights/a-switch-not-a-supply" label="A switch, not a supply — the replace-versus-restore distinction, on repair biology" />
                <CrossLink href="/research?q=Is%20there%20any%20controlled%20human%20evidence%20that%20adding%20hCG%20to%20testosterone%20therapy%20improves%20mood%20or%20wellbeing%2C%20or%20is%20the%20reported%20benefit%20better%20explained%20by%20estradiol%20and%20expectancy%3F" label="Ask the research agent what the human data shows" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing guidance,
              or a recommendation to use any compound. The strongest evidence here
              concerns hCG&rsquo;s maintenance of intratesticular testosterone and
              estradiol&rsquo;s role in male physiology; the neurosteroid account of a
              mood benefit is mechanistic and has not been established by controlled
              trials in this setting. On testosterone therapy, estradiol is present only
              through peripheral aromatization, not the testis&rsquo;s own output.
              Verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The Leydig-cell steroid cascade. Under an LH or hCG signal the whole
      chain runs (rose); exogenous testosterone supplies only the end product
      and, peripherally, some estradiol (the ink bracket). Several upstream
      steroids feed brain-active neurosteroids (✦). ── */
function CascadeFigure() {
  const NODES: { y: number; label: string; kind: "rose" | "substrate"; star?: boolean }[] = [
    { y: 46, label: "Cholesterol", kind: "substrate" },
    { y: 114, label: "Pregnenolone", kind: "rose", star: true },
    { y: 182, label: "Progesterone", kind: "rose", star: true },
    { y: 250, label: "17-OH-progesterone", kind: "rose" },
    { y: 318, label: "Androstenedione", kind: "rose" },
    { y: 386, label: "Testosterone", kind: "rose" },
    { y: 454, label: "Estradiol", kind: "rose", star: true },
  ];
  const CX = 300;
  const W = 186;
  const H = 40;

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 640 508"
        className="mx-auto w-full max-w-xl"
        role="img"
        aria-label="A diagram of the steroid cascade inside a Leydig cell, drawn as a vertical chain of seven boxes. From the top: cholesterol (the raw material), then pregnenolone, progesterone, 17-hydroxyprogesterone, androstenedione, testosterone, and finally estradiol. The step from cholesterol to pregnenolone is labelled as the StAR, LH-controlled step. The step from testosterone to estradiol is labelled aromatase. A rose bracket down the left spans pregnenolone through estradiol, marked as the full cascade that runs when the cell is driven by LH or by hCG. An ink bracket on the right spans only testosterone and estradiol, marked as what testosterone replacement supplies. Pregnenolone, progesterone, and estradiol are flagged as precursors to brain-active neurosteroids; progesterone is annotated as feeding allopregnanolone, a GABA-A modulator."
      >
        <defs>
          <marker id="casc-arw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-ink)" fillOpacity="0.35" />
          </marker>
        </defs>

        {/* connecting arrows */}
        {NODES.slice(0, -1).map((n, i) => (
          <line
            key={`arw-${i}`}
            x1={CX}
            y1={n.y + H / 2}
            x2={CX}
            y2={NODES[i + 1].y - H / 2}
            stroke="var(--color-ink)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            markerEnd="url(#casc-arw)"
          />
        ))}

        {/* enzyme / control labels on the two steps that matter */}
        <text x={CX + 16} y={90} fill="var(--accent-rose)" fillOpacity="0.85" fontSize="10.5" fontFamily="var(--font-mono, monospace)">StAR · the LH-controlled step</text>
        <text x={CX + 16} y={430} fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-mono, monospace)">aromatase</text>

        {/* nodes */}
        {NODES.map((n) => {
          const rose = n.kind === "rose";
          return (
            <g key={n.label}>
              <rect
                x={CX - W / 2}
                y={n.y - H / 2}
                width={W}
                height={H}
                rx={11}
                fill={rose ? "var(--accent-rose)" : "var(--color-ink)"}
                fillOpacity={rose ? 0.1 : 0.04}
                stroke={rose ? "var(--accent-rose)" : "var(--color-ink)"}
                strokeOpacity={rose ? 0.55 : 0.25}
                strokeWidth="1.5"
              />
              {n.star && (
                <text x={CX - W / 2 + 13} y={n.y + 5} fill="var(--accent-rose)" fontSize="12.5">✦</text>
              )}
              <text
                x={CX + (n.star ? 8 : 0)}
                y={n.y + 5}
                textAnchor="middle"
                fill="var(--color-ink)"
                fillOpacity="0.85"
                fontSize="13"
                fontFamily="var(--font-space-grotesk), sans-serif"
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* right-side annotations */}
        <text x={CX + W / 2 + 12} y={50} fill="var(--color-ink)" fillOpacity="0.42" fontSize="10" fontFamily="var(--font-space-grotesk), sans-serif">raw material</text>
        <text x={CX + W / 2 + 12} y={178} fill="var(--accent-rose)" fillOpacity="0.9" fontSize="10.5" fontFamily="var(--font-space-grotesk), sans-serif">→ allopregnanolone</text>
        <text x={CX + W / 2 + 12} y={191} fill="var(--color-ink)" fillOpacity="0.45" fontSize="9.5" fontFamily="var(--font-space-grotesk), sans-serif">a GABA-A modulator</text>

        {/* left rose brace: the full LH/hCG-driven cascade (pregnenolone → estradiol) */}
        <path
          d={`M 158 ${114 - H / 2} L 150 ${114 - H / 2} L 150 ${454 + H / 2} L 158 ${454 + H / 2}`}
          fill="none"
          stroke="var(--accent-rose)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <text
          x={132}
          y={284}
          textAnchor="middle"
          fill="var(--accent-rose)"
          fillOpacity="0.95"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font-space-grotesk), sans-serif"
          transform="rotate(-90 132 284)"
        >
          the full cascade · LH- or hCG-driven
        </text>

        {/* right ink bracket: what TRT supplies (testosterone + peripheral estradiol) */}
        <path
          d={`M 442 ${386 - H / 2} L 450 ${386 - H / 2} L 450 ${454 + H / 2} L 442 ${454 + H / 2}`}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <text x={458} y={416} fill="var(--color-ink)" fillOpacity="0.6" fontSize="11" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">what</text>
        <text x={458} y={430} fill="var(--color-ink)" fillOpacity="0.6" fontSize="11" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">TRT</text>
        <text x={458} y={444} fill="var(--color-ink)" fillOpacity="0.6" fontSize="11" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">supplies</text>

        {/* legend */}
        <text x={40} y={494} fill="var(--accent-rose)" fontSize="11">✦</text>
        <text x={54} y={494} fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-space-grotesk), sans-serif">precursor to a brain-active neurosteroid</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Under an LH or hCG signal, the Leydig cell runs the whole chain (rose). Exogenous
        testosterone supplies only the end product and, out in the periphery, some
        estradiol (ink bracket) &ndash; leaving the upstream steroids, and the testis&rsquo;s
        own estradiol, unmade. Illustrative pathway, not to scale.
      </figcaption>
    </figure>
  );
}

/* ── Two signals, two cells. LH (and its stand-in hCG) drive the Leydig cell
      and the steroid/mood arm; FSH (and hMG or recombinant FSH) drive the
      Sertoli cell and the fertility arm. hMG carries both; SERMs and pulsatile
      GnRH act higher, at the pituitary. ── */
function TwoArmFigure() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 640 352"
        className="mx-auto w-full max-w-xl"
        role="img"
        aria-label="A branching diagram of the two-signal control of the testis. At the top, a box labelled Pituitary, annotated that SERMs and GnRH act at this level. Two arrows branch down from it: to LH on the left and FSH on the right. LH points down to the Leydig cell, whose outputs are testosterone, the steroid cascade, and estradiol via aromatase — labelled the steroid and mood arm; a note says hCG acts as LH. FSH points down to the Sertoli cell, whose outputs are sperm, inhibin B, and intratubular aromatase — labelled the fertility arm; a note says hMG or recombinant FSH act as FSH. A bracket beneath both columns notes that hMG carries both arms."
      >
        <defs>
          <marker id="arm-arw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-ink)" fillOpacity="0.35" />
          </marker>
        </defs>

        {/* pituitary */}
        <rect x="235" y="22" width="170" height="40" rx="11" fill="var(--color-ink)" fillOpacity="0.05" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="1.5" />
        <text x="320" y="47" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.85" fontSize="13" fontFamily="var(--font-space-grotesk), sans-serif">Pituitary</text>
        <text x="414" y="38" fill="var(--color-ink)" fillOpacity="0.5" fontSize="9.5" fontFamily="var(--font-space-grotesk), sans-serif">SERMs &amp; GnRH</text>
        <text x="414" y="50" fill="var(--color-ink)" fillOpacity="0.45" fontSize="9.5" fontFamily="var(--font-space-grotesk), sans-serif">act at this level</text>

        {/* branch arrows to LH / FSH */}
        <line x1="320" y1="62" x2="176" y2="114" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="1.5" markerEnd="url(#arm-arw)" />
        <line x1="320" y1="62" x2="464" y2="114" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="1.5" markerEnd="url(#arm-arw)" />

        {/* LH node + hCG tag */}
        <rect x="124" y="116" width="92" height="32" rx="9" fill="var(--accent-rose)" fillOpacity="0.1" stroke="var(--accent-rose)" strokeOpacity="0.55" strokeWidth="1.5" />
        <text x="170" y="136" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.85" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">LH</text>
        <text x="18" y="128" fill="var(--accent-rose)" fillOpacity="0.95" fontSize="10" fontFamily="var(--font-space-grotesk), sans-serif">hCG acts</text>
        <text x="18" y="140" fill="var(--accent-rose)" fillOpacity="0.7" fontSize="10" fontFamily="var(--font-space-grotesk), sans-serif">as LH</text>

        {/* FSH node + hMG tag */}
        <rect x="424" y="116" width="92" height="32" rx="9" fill="var(--accent-blue)" fillOpacity="0.1" stroke="var(--accent-blue)" strokeOpacity="0.55" strokeWidth="1.5" />
        <text x="470" y="136" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.85" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">FSH</text>
        <text x="548" y="128" fill="var(--accent-blue)" fillOpacity="0.95" fontSize="10" fontFamily="var(--font-space-grotesk), sans-serif">hMG / rFSH</text>
        <text x="548" y="140" fill="var(--accent-blue)" fillOpacity="0.7" fontSize="10" fontFamily="var(--font-space-grotesk), sans-serif">act as FSH</text>

        {/* down arrows to cells */}
        <line x1="170" y1="148" x2="170" y2="190" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="1.5" markerEnd="url(#arm-arw)" />
        <line x1="470" y1="148" x2="470" y2="190" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="1.5" markerEnd="url(#arm-arw)" />

        {/* Leydig cell */}
        <rect x="95" y="192" width="150" height="40" rx="11" fill="var(--accent-rose)" fillOpacity="0.1" stroke="var(--accent-rose)" strokeOpacity="0.55" strokeWidth="1.5" />
        <text x="170" y="217" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.85" fontSize="13" fontFamily="var(--font-space-grotesk), sans-serif">Leydig cell</text>

        {/* Sertoli cell */}
        <rect x="395" y="192" width="150" height="40" rx="11" fill="var(--accent-blue)" fillOpacity="0.1" stroke="var(--accent-blue)" strokeOpacity="0.55" strokeWidth="1.5" />
        <text x="470" y="217" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.85" fontSize="13" fontFamily="var(--font-space-grotesk), sans-serif">Sertoli cell</text>

        {/* output ticks */}
        <line x1="170" y1="232" x2="170" y2="248" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="1.5" markerEnd="url(#arm-arw)" />
        <line x1="470" y1="232" x2="470" y2="248" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="1.5" markerEnd="url(#arm-arw)" />

        {/* Leydig outputs */}
        <text x="170" y="264" textAnchor="middle" fill="var(--accent-rose)" fillOpacity="0.9" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif">testosterone + steroids</text>
        <text x="170" y="278" textAnchor="middle" fill="var(--accent-rose)" fillOpacity="0.6" fontSize="10" fontFamily="var(--font-space-grotesk), sans-serif">→ estradiol (aromatase)</text>
        <text x="170" y="298" textAnchor="middle" fill="var(--accent-rose)" fillOpacity="0.95" fontSize="10.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">the steroid / mood arm</text>

        {/* Sertoli outputs */}
        <text x="470" y="264" textAnchor="middle" fill="var(--accent-blue)" fillOpacity="0.9" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif">sperm · inhibin B</text>
        <text x="470" y="278" textAnchor="middle" fill="var(--accent-blue)" fillOpacity="0.6" fontSize="10" fontFamily="var(--font-space-grotesk), sans-serif">+ intratubular aromatase</text>
        <text x="470" y="298" textAnchor="middle" fill="var(--accent-blue)" fillOpacity="0.95" fontSize="10.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">the fertility arm</text>

        {/* hMG-carries-both bracket */}
        <path d="M 170 312 L 170 318 L 470 318 L 470 312" fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" />
        <text x="320" y="335" textAnchor="middle" fill="var(--accent)" fillOpacity="0.9" fontSize="10.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">hMG carries both arms</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two signals, two cells. LH (and its stand-in hCG) drive the Leydig cell and the
        steroid arm where most of the mood story lives; FSH (and hMG or recombinant FSH)
        drive the Sertoli cell and fertility. hMG carries both; SERMs and pulsatile GnRH
        act higher, at the pituitary. Schematic, not to scale.
      </figcaption>
    </figure>
  );
}
