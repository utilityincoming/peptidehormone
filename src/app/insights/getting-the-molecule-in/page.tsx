import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("getting-the-molecule-in")!;

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
            <Section title="A peptide is, chemically, food">
              <P>
                The most common question a newcomer asks about this whole field is the
                simplest one: <Em>why the needle?</Em> The answer is not preference or
                convention — it is physics and biochemistry, and it starts with what a
                peptide actually is. A peptide is a short chain of amino acids joined by{" "}
                <Em>peptide bonds</Em>. That bond is the exact chemical linkage your
                digestive system exists to take apart. Swallow a peptide and you are
                feeding it to a machine purpose-built to destroy it.
              </P>
              <P>
                The teardown is sequential and redundant. Stomach acid (around pH 1&ndash;2)
                unfolds the molecule and begins hydrolysis; pepsin starts cleaving it.
                In the small intestine the pancreatic proteases — trypsin, chymotrypsin,
                the carboxypeptidases — cut it into fragments, and brush-border
                peptidases on the intestinal wall finish the job. What began as a
                signaling molecule is absorbed as its constituent amino acids: nutrition,
                not medicine. The body cannot tell your{" "}
                <Link href="/hormones/semaglutide" className={LINK}>research peptide</Link>{" "}
                apart from a mouthful of egg white.
              </P>
            </Section>

            <Section title="Even intact, it can't cross">
              <P>
                Suppose a fragment survives the gauntlet of the gut lumen. It still has
                to cross the intestinal wall to reach the bloodstream, and here peptides
                fail on a second, independent count: they are the wrong <Em>shape</Em> to
                pass a cell membrane. Most peptides are large, water-loving, often
                electrically charged, and studded with hydrogen-bond donors and
                acceptors. Medicinal chemists call this territory{" "}
                <Em>&ldquo;beyond the rule of five&rdquo;</Em> — peptides violate the
                classic drug-likeness guidelines on nearly every axis.
              </P>
              <P>
                The wall offers two ways through and blocks both. The gaps{" "}
                <Em>between</Em> cells (the paracellular route) are sealed by tight
                junctions with angstrom-scale pores — far too small. The route{" "}
                <Em>through</Em> a cell (transcellular) means crossing a lipid bilayer
                that actively repels polar, charged molecules. The result is brutal:
                unmodified peptides typically show oral bioavailability{" "}
                <Em>under 1&ndash;2%</Em>, and for larger ones it rounds to zero.
              </P>
              <RoutesDiagram />
            </Section>

            <Section title="Skin is a wall too — the 500-dalton rule">
              <P>
                If the gut is out, why not rub it on? Because skin is a barrier
                engineered by evolution to keep the outside world out. Its outer layer,
                the <Em>stratum corneum</Em>, is a &ldquo;brick and mortar&rdquo; lattice
                of dead cells in lipid — and it passively admits only small, fat-soluble
                molecules. The rough cutoff is famous enough to have a name: the{" "}
                <Em>500-dalton rule</Em>. Molecules much heavier than that do not
                meaningfully permeate intact skin.
              </P>
              <Callout>
                This is the quiet truth behind &ldquo;peptide&rdquo; skincare. Most
                cosmetic peptides are several times the 500-dalton limit, so they act at
                or near the surface — they do not reliably reach the living dermis, let
                alone the circulation. Delivering a peptide <Em>through</Em> skin to the
                bloodstream takes an active assist: microneedles that physically bypass
                the stratum corneum, or a current (iontophoresis) to push charged
                molecules across.
              </Callout>
            </Section>

            <Section title="And it doesn't last long">
              <P>
                Even placed directly into the blood, a native peptide is often gone in
                minutes. Native{" "}
                <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> has a
                circulating half-life of roughly{" "}
                <Link href="/tools/half-life?t12=1.5&unit=min" className={LINK}>one to two minutes</Link>{" "}
                — the enzyme DPP-4 clips it and the kidney clears the rest. This is why
                the drugs are not the raw hormones but <Em>engineered analogs</Em>:
                DPP-4-resistant substitutions, and fatty-acid chains (acylation) that let
                the molecule hitch a ride on albumin and evade clearance, stretching a
                two-minute signal into a multi-day one. That single trick is what turned
                a fragile gut hormone into a once-weekly therapy — the story told in{" "}
                <Link href="/insights/glp-1-signaling" className={LINK}>how GLP-1 actually works</Link>.
              </P>
            </Section>

            <Section title="The oral peptide problem — read the claims skeptically">
              <P>
                &ldquo;Oral&rdquo; peptides are the most oversold idea in this space, and
                the barriers above are exactly why. Making a peptide survive the gut{" "}
                <Em>and</Em> cross the wall <Em>and</Em> do so reproducibly is one of the
                hardest problems in drug delivery — not a formulation you can achieve by
                putting powder in a capsule, dissolving it under the tongue, or calling
                it &ldquo;liposomal.&rdquo; When a product makes an oral or sublingual
                claim without rigorous, molecule-specific pharmacokinetic data behind it,
                the safe assumption is that <Em>most of the dose never reaches your
                bloodstream at all.</Em>
              </P>
              <P>
                Consider the one true success story, precisely because it shows how much
                machinery is required. Oral semaglutide reaches the market only by being
                co-formulated with a permeation enhancer, SNAC, that locally buffers
                stomach acid and briefly loosens the gastric lining to let a sliver of
                drug slip through. Even then, bioavailability is around <Em>1%</Em> — so
                the tablet must carry many times more drug than the injection to
                compensate. And it is fragile: it works only taken on an empty stomach
                under strict water and timing constraints, and absorption still varies
                widely from person to person and day to day. That is the state of the art
                for oral peptides — an enormous engineering effort to claw back a single
                percent, under conditions most real-world users won&rsquo;t hold to.
              </P>
              <Callout label="Buyer beware">
                A permeation enhancer or protease inhibitor validated for one peptide in
                one formulation does <Em>not</Em> transfer to another. &ldquo;Enhanced
                absorption&rdquo; demonstrated for semaglutide tells you nothing about an
                oral BPC-157 capsule or a sublingual growth-hormone-secretagogue tab.
                Absent PK data for <Em>that specific molecule in that specific product</Em>,
                treat oral and sublingual peptide claims as marketing, not pharmacology.
                Much of what is sold this way is, functionally, an expensive way to
                digest a peptide.
              </Callout>
              <P>
                None of this means oral peptides are impossible — enteric coatings,
                protease inhibitors, self-emulsifying systems (SEDDS), and ingestible
                microinjectors are all real research. But proof-of-concept in a lab is
                not the same as a product that works in your hand, and the gap between
                those two things is where most of the overselling lives.
              </P>
            </Section>

            <Section title="When a nasal spray actually works">
              <P>
                The nose is the one needle-free route with a genuine, established track
                record — but only within strict limits, and understanding those limits is
                the whole point. The nasal mucosa is thin, richly vascularized, has real
                surface area across the turbinates, and drains straight into the
                bloodstream, <Em>skipping first-pass metabolism by the liver</Em>. That
                makes it attractive. It becomes <Em>efficacious</Em> only when three
                conditions line up at once:
              </P>
              <Bullets
                items={[
                  ["Small", "Roughly under ~1 kDa crosses the mucosa reasonably; larger peptides need absorption enhancers and pay for size with lower, more variable uptake."],
                  ["Potent", "Nasal bioavailability is often only single-digit-to-low-double-digit percent, so the route only works when the small fraction that does get in is still a therapeutic amount."],
                  ["Fast, or brain-bound", "The nose suits molecules where rapid onset matters — and the olfactory and trigeminal pathways offer a partial 'nose-to-brain' shortcut that can sidestep the blood-brain barrier."],
                ]}
              />
              <P>
                The proof is in what already ships nasally. <Em>Desmopressin</Em> (a
                small vasopressin analog) and the GnRH analogs{" "}
                <Link href="/families/reproductive" className={LINK}>nafarelin and buserelin</Link>{" "}
                are routine nasal sprays. Salmon{" "}
                <Link href="/hormones/calcitonin" className={LINK}>calcitonin</Link> is
                delivered nasally despite being larger than the ideal cutoff — it gets
                away with it because it is extraordinarily potent. Oxytocin has a long
                nasal history, and the melanocortin agonist{" "}
                <Link href="/families/melanocortins" className={LINK}>bremelanotide (PT-141)</Link>{" "}
                began life as an intranasal formulation before its delivery route changed.
              </P>
              <P>
                The limits teach as much as the successes. Mucociliary clearance sweeps
                the spray toward the throat in roughly fifteen to twenty minutes, so the
                absorption window is short; the mucosa has its own enzymes; a head cold
                can tank uptake; and you can only instill a few microliters per nostril.
                The honest summary: the nose works for <Em>small, potent</Em> molecules
                where a low and somewhat variable absorbed fraction is still enough. It
                is a real route — but a narrow one, not a general escape from the needle.
              </P>
            </Section>

            <Section title="The delivery frontier">
              <P>
                This is a problem the field is actively, and cleverly, chipping away at.
                The most promising fronts:
              </P>
              <Bullets
                items={[
                  ["Designed-in permeability", "Cyclic and bicyclic peptides, N-methylation, and 'stapled' peptides aim to build molecules that are protease-resistant and membrane-permeable from the start, rather than bolting on an enhancer."],
                  ["Ingestible devices", "Capsule-scale robotic applicators (the self-orienting SOMA family) that inject a payload into the gut wall from inside the GI tract — sidestepping the absorption problem mechanically."],
                  ["Microneedle patches", "Dissolving arrays that place a peptide just past the stratum corneum, painlessly, without a syringe."],
                  ["Smarter depots", "Microsphere and in-situ-gel long-actings — already used for octreotide and leuprolide — that turn one injection into weeks or months of steady release."],
                ]}
              />
              <P>
                The through-line is worth holding onto: the needle dominates not because
                the field lacks imagination, but because every alternative route is a
                fight against barriers that evolution spent a very long time perfecting.
                The winners will be the molecules and devices engineered specifically to
                beat one barrier at a time.
              </P>
            </Section>

            <Section title="What's established, and what's still open">
              <P>
                <Em>Established:</Em> the gut digests and blocks unmodified peptides
                (oral bioavailability typically under 1&ndash;2%); intact skin excludes
                molecules much above ~500 Da; native peptide half-lives are on the order
                of minutes; and injection remains the reliable default. A small set of
                small, potent peptides work nasally.
              </P>
              <P>
                <Em>Open:</Em> whether permeability can be reliably designed into larger
                peptides; how far ingestible-device and microneedle delivery scale beyond
                early products; and — the reader&rsquo;s practical question — which, if
                any, of the oral and sublingual products now sold actually deliver drug,
                a question only molecule-specific pharmacokinetic data can answer.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/glp-1-signaling" label="How half-life engineering rescued GLP-1" />
                <CrossLink href="/tools/half-life" label="Model a peptide's half-life & duration" />
                <CrossLink href="/hormones/calcitonin" label="Calcitonin — the potent nasal exception" />
                <CrossLink href="/research?q=What%20pharmacokinetic%20evidence%20exists%20for%20oral%20or%20nasal%20peptide%20bioavailability%3F" label="Ask the research agent about delivery routes" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on delivery science, summarized from public
              scientific literature and simplified in places. Not medical advice, dosing
              guidance, or a recommendation to use any compound or product. Specific
              compounds and products are named to explain the science; verify any claim
              against primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

const LINK = "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-7 text-ink/75">{children}</p>;
}

function Em({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

function Callout({ label = "Key insight", children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-2 border-accent bg-accent/[0.06] p-5">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-accent">{label}</div>
      <p className="text-[15px] leading-7 text-ink/80">{children}</p>
    </div>
  );
}

function Bullets({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-3">
      {items.map(([head, body]) => (
        <li key={head} className="flex gap-3 text-[15px] leading-7 text-ink/75">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>
            <strong className="font-semibold text-ink">{head}.</strong> {body}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CrossLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="group flex items-start gap-2 text-ink/75 transition-colors hover:text-accent">
        <span className="mt-0.5 text-ink/30 transition-colors group-hover:text-accent" aria-hidden>→</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

/* ── Routes-of-entry diagram ── */
function RoutesDiagram() {
  const routes: {
    route: string;
    barrier: string;
    verdict: "no" | "maybe" | "yes";
    color: string;
    mark: string;
  }[] = [
    { route: "Oral (swallowed)", barrier: "Acid + proteases, then an impermeable gut wall", verdict: "no", color: "var(--accent-purple)", mark: "✕" },
    { route: "Topical (skin)", barrier: "The stratum corneum — the ~500-dalton wall", verdict: "no", color: "var(--accent-purple)", mark: "✕" },
    { route: "Nasal (spray)", barrier: "Thin, vascular mucosa — but only if small + potent", verdict: "maybe", color: "var(--accent-blue)", mark: "~" },
    { route: "Subcutaneous (injection)", barrier: "Under the skin, straight toward circulation", verdict: "yes", color: "var(--accent-teal)", mark: "✓" },
  ];
  const W = 560, rowH = 66, gap = 14, x = 12, w = W - 24;
  const H = routes.length * rowH + (routes.length - 1) * gap + 20;
  const yAt = (i: number) => 10 + i * (rowH + gap);

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-lg" role="img" aria-label="Four routes a peptide can take into the body and whether each one works">
        {routes.map((r, i) => (
          <g key={r.route}>
            <rect
              x={x}
              y={yAt(i)}
              width={w}
              height={rowH}
              rx={14}
              fill={r.verdict === "yes" ? "color-mix(in srgb, var(--accent-teal) 12%, transparent)" : "var(--panel)"}
              stroke={r.color}
              strokeOpacity={r.verdict === "yes" ? 0.7 : r.verdict === "maybe" ? 0.5 : 0.3}
              strokeWidth={r.verdict === "yes" ? 2 : 1}
            />
            {/* verdict badge */}
            <circle cx={x + 34} cy={yAt(i) + rowH / 2} r={17} fill={r.color} fillOpacity={0.16} stroke={r.color} strokeOpacity={0.6} strokeWidth={1.5} />
            <text x={x + 34} y={yAt(i) + rowH / 2 + 6} textAnchor="middle" fill={r.color} fontSize="18" fontWeight="700">
              {r.mark}
            </text>
            {/* labels */}
            <text x={x + 66} y={yAt(i) + 27} fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
              {r.route}
            </text>
            <text x={x + 66} y={yAt(i) + 47} fill="var(--color-ink)" fillOpacity="0.5" fontSize="12">
              {r.barrier}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Four ways in. Two are blocked outright, one is conditional, and one just works —
        which is why the needle is still the default.
      </figcaption>
    </figure>
  );
}
