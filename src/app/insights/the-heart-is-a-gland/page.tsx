import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-heart-is-a-gland")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "Natriuretic Peptides (ANP, BNP, CNP): The Heart as an Endocrine Organ, BNP Testing and Entresto — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "Natriuretic Peptides: The Heart as an Endocrine Organ (ANP, BNP, CNP) · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  debold: "https://pubmed.ncbi.nlm.nih.gov/7219045/", // de Bold et al. 1981, Life Sci — atrial extract causes natriuresis
  maisel: "https://pubmed.ncbi.nlm.nih.gov/12124404/", // Maisel et al. 2002, NEJM — BNP in emergency diagnosis of heart failure
  ascend: "https://pubmed.ncbi.nlm.nih.gov/21732835/", // O'Connor et al. 2011, NEJM — nesiritide in acute decompensated HF (ASCEND-HF)
  octave: "https://pubmed.ncbi.nlm.nih.gov/14751650/", // Kostis et al. 2004, Am J Hypertens — omapatrilat angioedema (OCTAVE)
  paradigm: "https://pubmed.ncbi.nlm.nih.gov/25176015/", // McMurray et al. 2014, NEJM — sacubitril/valsartan vs enalapril (PARADIGM-HF)
  vosoritide: "https://pubmed.ncbi.nlm.nih.gov/32891212/", // Savarirayan et al. 2020, Lancet — vosoritide in achondroplasia (phase 3)
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "Is the heart an endocrine organ?",
    a: "Yes. Beyond pumping, the heart secretes hormones. When the heart wall is stretched by extra blood volume or pressure, cardiac muscle releases natriuretic peptides, ANP from the atria and BNP from the ventricles. They act on the kidney and blood vessels to shed salt and water and lower pressure, reducing the load that triggered them. The discovery came in 1981, when injecting atrial tissue extract into rats produced a rapid flush of sodium and water.",
  },
  {
    q: "What is the difference between ANP, BNP and CNP?",
    a: "They are the three natriuretic peptides. ANP is made in the atria and BNP in the ventricles; both act systemically through the NPR-A receptor to promote salt and water loss and vasodilation. CNP is different: it is made mainly by blood-vessel lining and the bone growth plate, acts locally through a separate receptor (NPR-B), and its standout role is driving long-bone growth rather than fluid balance. All three raise the second messenger cGMP, unlike most hormones in this catalog, which use cAMP.",
  },
  {
    q: "Why is BNP measured in heart failure?",
    a: "Because its blood level reports on ventricular wall stress. As a failing heart stretches under load, the ventricles release more BNP, so the amount in the blood tracks the severity of heart failure. Measuring BNP (or its companion fragment NT-proBNP) is a standard way to diagnose heart failure in someone who is short of breath and to follow it over time. It is a case of a hormone doubling as a diagnostic readout.",
  },
  {
    q: "How does Entresto (sacubitril/valsartan) work?",
    a: "It protects the body's own natriuretic peptides rather than supplying more. Sacubitril blocks neprilysin, the enzyme that degrades ANP and BNP, so those beneficial peptides last longer. Because neprilysin also breaks down angiotensin II (which raises blood pressure and retains fluid), blocking it alone would let angiotensin II rise, so sacubitril is paired with the angiotensin-receptor blocker valsartan. In the PARADIGM-HF trial the combination outperformed the previous standard, enalapril.",
  },
  {
    q: "Why didn't giving BNP as a drug (nesiritide) work well?",
    a: "Recombinant BNP (nesiritide) seemed obvious for acute heart failure, but the native peptide is cleared within minutes, and in decompensated heart failure the natriuretic system is already elevated and partly resistant. In a large trial the drug did not meaningfully improve outcomes. Supplying a short-lived hormone against a system that is already saturated turned out to be a losing strategy, which is why the field pivoted to protecting the body's own peptides instead.",
  },
  {
    q: "Why is a natriuretic peptide used to treat dwarfism?",
    a: "The third family member, CNP, drives bone growth at the growth plate through the NPR-B receptor. Achondroplasia, the most common form of short-limbed dwarfism, is caused by overactive FGFR3 signaling that suppresses that growth. A CNP analog, vosoritide, pushes back on it, and in trials increased growth velocity in affected children. It is a striking example of a cardiovascular-family peptide finding a completely unrelated therapeutic home in the skeleton.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(45,212,168,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/cardiovascular" className="text-accent-teal hover:text-ink">
                Cardiovascular &amp; natriuretic
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
            <Section title="The pump that turned out to be a gland">
              <P>
                For most of the history of physiology the heart had one job: move
                blood. Then, in 1981, a deceptively simple experiment reassigned it. An
                extract of atrial muscle, injected into rats, produced a rapid and
                powerful flush of sodium and water from the kidney (
                <a href={REF.debold} target="_blank" rel="noopener noreferrer" className={LINK}>
                  de&nbsp;Bold et&nbsp;al., 1981
                </a>
                ). Something inside heart tissue was a hormone. The heart, it turned
                out, is also a gland.
              </P>
              <P>
                What it secretes are the <Em>natriuretic peptides</Em>. When the heart
                wall is stretched, by the extra volume or pressure of a body carrying
                too much fluid, cardiac muscle releases them into the blood:{" "}
                <Link href="/hormones/anp" className={LINK}>ANP</Link> from the atria,{" "}
                <Link href="/hormones/bnp" className={LINK}>BNP</Link> from the
                ventricles. Their instruction to the rest of the body is, in effect,
                <Em> shed the load.</Em> And because the load they relieve is the same
                stretch that released them, the heart is not just sensing its own strain.
                It is doing something about it.
              </P>
            </Section>

            <Section title="A thermostat for blood volume">
              <P>
                Read as a control system, the natriuretic peptides are a negative
                feedback loop, a thermostat for the circulation. Stretch releases the
                peptide; the peptide binds a receptor called NPR-A and raises the second
                messenger cGMP; cGMP drives the kidney to excrete sodium and water and
                the vessels to relax; blood volume and pressure fall; and the fall
                relieves the stretch that started it. The loop closes on itself. (The
                cGMP detail is worth a beat: most hormones in this catalog work through
                cAMP and a G-protein-coupled receptor, but the natriuretic receptors are
                themselves enzymes, guanylyl cyclases, a genuinely different signaling
                family.)
              </P>
              <P>
                The loop does not run alone. It is the standing opposition to the{" "}
                <Em>renin-angiotensin-aldosterone system</Em>, the body&rsquo;s dominant
                fluid-retaining axis: where angiotensin II and aldosterone constrict
                vessels and hold on to salt and water, the natriuretic peptides dilate
                and release them. Most of cardiovascular medicine is a negotiation
                between these two forces. The heart&rsquo;s own hormone is the counter-weight.
              </P>
              <NatriureticLoop />
            </Section>

            <Section title="The hormone that became a blood test">
              <P>
                Because BNP rises in direct proportion to how hard the ventricle is
                being stretched, its level in the blood carries a clean diagnostic
                signal: a heart under strain announces itself. That turned a hormone
                into one of the most useful tests in medicine. In a landmark study,
                measuring BNP in people arriving at the emergency department short of
                breath sharply improved the diagnosis of heart failure, separating it
                from lung disease that looks similar at the bedside (
                <a href={REF.maisel} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Maisel et&nbsp;al., NEJM, 2002
                </a>
                ). BNP and its companion fragment NT-proBNP are now routine: a number
                on a lab report that reads out, quite literally, how stretched the heart
                is.
              </P>
              <Callout label="The elegant part">
                The same property that makes BNP a hormone makes it a test. Its whole
                job is to encode ventricular wall stress, so its concentration is that
                stress, measured off a vein. The heart files a report on its own
                condition, and the lab simply reads it.
              </Callout>
            </Section>

            <Section title="Why you cannot just add more">
              <P>
                Here is the twist that shapes the whole drug story. In heart failure,
                the natriuretic system is not absent, it is <Em>overwhelmed.</Em> BNP
                levels are high precisely because the heart is straining, yet fluid
                still accumulates: the system is elevated and partly resistant, shouting
                into a room that has stopped listening. So the obvious move, give more
                of the peptide, runs into two walls at once. The native peptide is
                cleared from the blood within minutes, and the target system is already
                saturated.
              </P>
              <P>
                The obvious move was tried. Nesiritide, a recombinant form of human BNP,
                was given for acute decompensated heart failure on exactly this logic.
                In a large, careful trial it did not meaningfully improve the outcomes
                that matter (
                <a href={REF.ascend} target="_blank" rel="noopener noreferrer" className={LINK}>
                  O&rsquo;Connor et&nbsp;al., NEJM, 2011
                </a>
                ). Supplying a short-lived hormone against a resistant system is a
                losing hand. The peptide was right; delivering more of it was not the way.
              </P>
            </Section>

            <Section title="The winning move: protect the signal">
              <P>
                If you cannot usefully add the hormone, protect the hormone you already
                make. Natriuretic peptides are destroyed by an enzyme called{" "}
                <Em>neprilysin</Em>. Block neprilysin, and the body&rsquo;s own ANP and
                BNP linger and act for longer, amplifying the brake without infusing
                anything. That is the mechanism behind sacubitril, and in combination
                (sacubitril/valsartan) it beat the previous standard of care in a major
                heart-failure trial (
                <a href={REF.paradigm} target="_blank" rel="noopener noreferrer" className={LINK}>
                  McMurray et&nbsp;al., NEJM, 2014
                </a>
                ). It is the same principle this catalog keeps meeting from the other
                direction, in{" "}
                <Link href="/insights/peptide-half-life-engineering" className={LINK}>
                  peptide half-life engineering
                </Link>
                : do not fight the body&rsquo;s clearance by dosing harder, work with
                the salvage system instead.
              </P>
              <P>
                The combination is not an accident, and its history is a caution.
                Neprilysin does not only clear natriuretic peptides; it also degrades
                angiotensin II, so blocking neprilysin alone would let that
                pressure-raising peptide build up. The fix is to pair it with an
                angiotensin-receptor blocker, valsartan, which is why the drug is a
                deliberate two-part design. An earlier attempt to combine neprilysin
                inhibition with an ACE inhibitor, omapatrilat, hit a dangerous rate of
                angioedema, because that pairing also spared bradykinin, and the program
                did not survive it (
                <a href={REF.octave} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kostis et&nbsp;al., 2004
                </a>
                ). Protecting a signal means knowing everything else the same enzyme was
                quietly clearing.
              </P>
              <Callout label="The engineering read">
                The natriuretic family inverts the usual drug instinct. The peptide is
                too short-lived to supply and too useful to ignore, so the winning move
                was never to replace the signal but to stop the body from erasing it,
                while accounting for the other messages the same eraser was removing.
              </Callout>
            </Section>

            <Section title="The cousin that grows bones">
              <P>
                The family has a third member that barely touches blood pressure at
                all.{" "}
                <Link href="/hormones/cnp" className={LINK}>CNP</Link> is made mostly by
                the lining of blood vessels and, tellingly, by the growth plate of
                bones. It signals through a different receptor, NPR-B, and acts locally
                rather than as a circulating hormone. Its standout job is not fluid
                balance but <Em>endochondral bone growth</Em>, the lengthening of long
                bones at the growth plate.
              </P>
              <P>
                That sent the family somewhere no one would have predicted from a
                heart-and-kidney story. Achondroplasia, the most common form of
                short-limbed dwarfism, is driven by an overactive FGFR3 pathway that
                brakes growth-plate expansion, and CNP signaling pushes the other way.
                A CNP analog engineered to last, vosoritide, increased growth velocity
                in affected children in phase 3 trials (
                <a href={REF.vosoritide} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Savarirayan et&nbsp;al., Lancet, 2020
                </a>
                ). A peptide filed under the cardiovascular system turned out to be a
                lever on human height, which is the kind of branch a family tree grows
                only when the underlying biology is older and broader than the label on
                the drawer.
              </P>
            </Section>

            <Section title="Protecting the signal">
              <P>
                Put it together and the cardiovascular peptides read as one coherent
                idea with an unexpected offshoot. The heart is a gland with a
                thermostat: it senses its own stretch and secretes a hormone that
                relieves it, in standing opposition to the systems that would retain
                fluid. That hormone is so faithful a report of cardiac strain that its
                blood level became a diagnosis, and so short-lived that the way to turn
                it into a drug was never to add it but to defend it from the enzyme that
                clears it. And one member of the family slipped the cardiovascular
                story entirely and became a treatment for how tall a child grows.
              </P>
              <Bullets
                items={[
                  ["The heart is an endocrine organ", "Stretched by volume or pressure, cardiac muscle secretes ANP (atria) and BNP (ventricles), hormones that unload the heart by shedding salt and water and relaxing vessels. A pump that also senses and signals."],
                  ["It is a thermostat and a counter-regulator", "Through NPR-A and cGMP, the natriuretic peptides oppose the renin-angiotensin-aldosterone system's fluid retention. The feedback loop relieves the stretch that triggered it."],
                  ["The hormone is also the test", "BNP and NT-proBNP rise with ventricular wall stress, so their blood level is how heart failure is diagnosed and tracked. A signal read straight off a vein."],
                  ["Protect the signal, do not replace it", "Supplying recombinant BNP (nesiritide) underwhelmed; the peptide is cleared in minutes. Blocking neprilysin, the enzyme that destroys it, made the body's own peptides last and beat the old standard, paired with an ARB because neprilysin also clears angiotensin II."],
                  ["One cousin grows bones", "CNP acts locally through NPR-B and drives growth-plate bone formation. Its analog, vosoritide, treats achondroplasia. A cardiovascular peptide that became a height drug."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/anp" label="ANP reference (the atrial peptide)" />
                <CrossLink href="/hormones/bnp" label="BNP reference (the ventricular peptide and biomarker)" />
                <CrossLink href="/hormones/cnp" label="CNP reference (the vascular and bone-growth peptide)" />
                <CrossLink href="/families/cardiovascular" label="The cardiovascular & natriuretic family" />
                <CrossLink href="/insights/peptide-half-life-engineering" label="Half-life engineering — the other side of protecting a peptide" />
                <CrossLink href="/research?q=How%20do%20the%20natriuretic%20peptides%20ANP%2C%20BNP%20and%20CNP%20differ%2C%20and%20why%20does%20neprilysin%20inhibition%20(sacubitril)%20work%20better%20than%20giving%20recombinant%20BNP%3F" label="Ask the research agent about the natriuretic peptides" />
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

/* ── The heart's negative-feedback loop: stretch → peptide → unload → less stretch ── */
function NatriureticLoop() {
  const W = 720;
  const H = 210;
  const boxY = 52;
  const boxH = 54;
  const cy = boxY + boxH / 2; // 79
  const bot = boxY + boxH; // 106

  const boxes = [
    { x: 18, w: 150, name: "Cardiac stretch", sub: "volume · pressure load", hot: false },
    { x: 194, w: 156, name: "ANP · BNP", sub: "atria · ventricles", hot: true },
    { x: 376, w: 140, name: "NPR-A → cGMP", sub: "guanylyl cyclase", hot: false },
    { x: 542, w: 160, name: "Unload the heart", sub: "salt + water out · dilate", hot: false },
  ];
  const cxOf = (i: number) => boxes[i].x + boxes[i].w / 2;
  const rightOf = (i: number) => boxes[i].x + boxes[i].w;

  const Box = ({ x, w, name, sub, hot }: { x: number; w: number; name: string; sub: string; hot: boolean }) => (
    <g>
      <rect x={x} y={boxY} width={w} height={boxH} rx={12}
        fill={hot ? "color-mix(in srgb, var(--accent-teal) 13%, transparent)" : "var(--panel)"}
        stroke={hot ? "var(--accent-teal)" : "var(--color-ink)"} strokeOpacity={hot ? 0.6 : 0.22} strokeWidth={1.2} />
      <text x={x + w / 2} y={cy - 4} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.9} fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{name}</text>
      <text x={x + w / 2} y={cy + 14} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="10.5">{sub}</text>
    </g>
  );

  const Arrow = ({ x1, x2 }: { x1: number; x2: number }) => (
    <g stroke="var(--color-ink)" strokeOpacity={0.4}>
      <line x1={x1} y1={cy} x2={x2 - 5} y2={cy} strokeWidth={1.6} />
      <path d={`M ${x2} ${cy} l -7 -4 v 8 z`} fill="var(--color-ink)" fillOpacity={0.4} stroke="none" />
    </g>
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="The heart's natriuretic feedback loop. Cardiac stretch from volume or pressure load makes the atria and ventricles release ANP and BNP; these bind NPR-A and raise cGMP, which unloads the heart by excreting salt and water and dilating vessels; the resulting fall in blood volume and pressure reduces the stretch, closing the loop. BNP's blood level is read as the heart-failure test, and neprilysin clears the peptides quickly, which the drug sacubitril blocks to make the signal last."
      >
        {/* biomarker tag above the peptide box */}
        <text x={cxOf(1)} y={32} textAnchor="middle" fill="var(--accent-teal)" fontSize="10.5" fontWeight="600">BNP blood level = the heart-failure test</text>
        <line x1={cxOf(1)} y1={37} x2={cxOf(1)} y2={boxY} stroke="var(--accent-teal)" strokeOpacity={0.5} strokeWidth={1} strokeDasharray="2 3" />

        {/* the cascade */}
        {boxes.map((b, i) => <Box key={i} {...b} />)}
        <Arrow x1={rightOf(0)} x2={boxes[1].x} />
        <Arrow x1={rightOf(1)} x2={boxes[2].x} />
        <Arrow x1={rightOf(2)} x2={boxes[3].x} />

        {/* neprilysin / drug note under the peptide→receptor step */}
        <line x1={363} y1={bot} x2={363} y2={122} stroke="var(--accent-blue)" strokeOpacity={0.45} strokeWidth={1} strokeDasharray="2 3" />
        <text x={360} y={134} textAnchor="middle" fill="var(--accent-blue)" fillOpacity={0.85} fontSize="10.5">neprilysin clears it fast · sacubitril (Entresto) blocks that to protect the signal</text>

        {/* feedback loop back to stretch */}
        <path d={`M ${cxOf(3)} ${bot} V 168 H ${cxOf(0)} V ${bot + 2}`} fill="none" stroke="var(--accent-teal)" strokeOpacity={0.65} strokeWidth={1.6} />
        <path d={`M ${cxOf(0)} ${bot} l -4 7 h 8 z`} fill="var(--accent-teal)" fillOpacity={0.65} stroke="none" />
        <text x={(cxOf(0) + cxOf(3)) / 2} y={186} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="11">↓ blood volume + pressure → less cardiac stretch (the loop closes)</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        A thermostat for the circulation: stretch releases the peptide, the peptide unloads
        the heart, and the unloading relieves the stretch. BNP&rsquo;s level is the clinical
        readout; sacubitril works by protecting the peptide from neprilysin rather than adding more.
      </figcaption>
    </figure>
  );
}
