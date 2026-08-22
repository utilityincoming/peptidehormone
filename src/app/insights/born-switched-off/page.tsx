import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("born-switched-off")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources - named inline so the evidence grade stays checkable.
const REF = {
  wolfman: "https://www.pnas.org/doi/10.1073/pnas.2534946100",
  proteolysis: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0001628",
  srk015: "https://www.jbc.org/article/S0021-9258(17)48558-9/fulltext",
  jci: "https://www.jci.org/articles/view/148372",
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
            <Section title="A brake shipped disabled">
              <P>
                <Link href="/hormones/myostatin" className={LINK}>Myostatin</Link> is the
                body&rsquo;s governor on skeletal muscle - the signal that holds growth
                below its genetic ceiling. Knock it out and the ceiling lifts: the
                famously muscular whippets, cattle, and the rare children born without
                working myostatin all tell the same story. A signal that powerful is
                dangerous to leave lying around switched on. So the body does something
                telling with it.
              </P>
              <P>
                It ships the brake disabled. Most of the myostatin in your blood is not
                active protein at all - it circulates as a{" "}
                <Em>latent complex</Em>, the finished signal folded shut inside a
                wrapper made from its own front half, inert and unable to touch its
                receptor. That is why its measured half-life reads as{" "}
                <Em>long</Em>: what is circulating is the safed, stored form, not the live
                one. The active molecule is manufactured, then immediately holstered.
              </P>
              <Callout label="The puzzle worth sitting with">
                Why build a brake and then disable it before it leaves the factory? Because
                a brake this strong is only useful if it can be released in the right place
                at the right moment - not broadcast everywhere at once. Latency is how the
                body keeps a loud signal on a short leash. Arming it is a separate,
                controlled act.
              </Callout>
            </Section>

            <Section title="Two cuts to arm it">
              <P>
                Turning latent myostatin into a live signal takes two cuts, by two
                different enzymes, in a fixed order. Neither one alone is enough - the
                sequence is the safety catch.
              </P>
              <ActivationDiagram />
              <P>
                The first cut is made by <Em>furin</Em>, a proprotein convertase, which
                snips the chain at a four-residue RXXR motif to separate the front{" "}
                <Em>prodomain</Em> from the business end, the mature growth factor. But
                separation is not release: the prodomain stays clamped over the mature
                dimer by non-covalent grip, shielding it from the receptor. This is the
                latent complex (
                <a href={REF.proteolysis} target="_blank" rel="noopener noreferrer" className={LINK}>
                  genetic analysis of myostatin proteolysis, PLOS One
                </a>
                ).
              </P>
              <P>
                The second cut is the one that actually arms it. A protease from the{" "}
                <Em>BMP-1/tolloid</Em> family cleaves the prodomain itself, at a single
                site just ahead of aspartate-76. That nick destabilizes the clamp, the
                wrapper falls away, and the mature myostatin dimer is finally free to bind
                its receptor and signal (
                <a href={REF.wolfman} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wolfman et&nbsp;al., PNAS 2003
                </a>
                ). Same molecule the whole time; what changed was permission.
              </P>
            </Section>

            <Section title="Why a pre-disabled brake is a gift to drug designers">
              <P>
                Here is where the biology becomes a strategy. If the live signal is only
                the last step of a cascade, then every step before it is a place to
                intervene - and the earlier you cut in, the more selective you can be. The
                muscle-preservation programs map exactly onto the states of this pathway:
              </P>
              <Bullets
                items={[
                  ["Catch it latent - apitegromab", "Scholar Rock's antibody (SRK-015) binds the pro and latent forms and blocks that second, arming cut - so myostatin never gets released in the first place. Because only myostatin is stored this way, going after the latent form is the most selective move available."],
                  ["Trap it once free - follistatin", "The body's own antagonist waits at the next altitude down, binding the mature ligand after release and neutralizing it. Raising follistatin is the endogenous way to mop up whatever does get armed."],
                  ["Block the dock - bimagrumab", "At the bottom of the pathway sits the receptor itself; an antibody there shuts out myostatin and its relatives together. Broadest effect, lowest selectivity."],
                ]}
              />
              <P>
                The elegance of the latent-form approach is that it exploits a feature the
                body built for its own reasons. A structural study of apitegromab&rsquo;s
                parent antibody showed it works by gripping the prodomain-shrouded
                precursor and jamming the activation step (
                <a href={REF.srk015} target="_blank" rel="noopener noreferrer" className={LINK}>
                  SRK-015 structural study, JBC
                </a>
                ) - a drug designed around a switch that was already there. For the
                human data on what this does during weight loss, see{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>
                  keeping the muscle on GLP-1
                </Link>
                .
              </P>
            </Section>

            <Section title="The logic of latency">
              <P>
                Myostatin did not invent this trick. Its whole family runs on it: classic{" "}
                <Link href="/families/muscle-tgfb" className={LINK}>TGF-&beta;</Link> is
                itself stored latent, wrapped by its prodomain and tethered in the tissue
                until a local signal frees it. Storing the finished molecule inert, then
                arming it on the spot with a proteolytic cut, lets the body pre-position a
                powerful signal and spend the energy of making it long before it needs the
                effect (
                <a href={REF.jci} target="_blank" rel="noopener noreferrer" className={LINK}>
                  myostatin pathway review, JCI
                </a>
                ).
              </P>
              <P>
                It is a recurring theme on this frontier: the body regulates its loudest
                signals not by how much it makes but by <Em>when it lets them speak</Em>.
                Native <Link href="/hormones/glp-1" className={LINK}>GLP-1</Link> is
                controlled by how fast it is destroyed; myostatin, by how deliberately it
                is switched on. Read the control system and the drug targets fall out of
                it - which is the whole reason the pro-form, not the active one, became the
                most selective way in.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/one-receptor-a-whole-family" label="One receptor, a whole family (the shared dock)" />
                <CrossLink href="/insights/glp-1-muscle-preservation" label="Keeping the muscle on GLP-1 (the trial data)" />
                <CrossLink href="/hormones/myostatin" label="Myostatin reference" />
                <CrossLink href="/hormones/follistatin" label="Follistatin - the endogenous trap" />
                <CrossLink href="/insights/the-complexity-ladder" label="Why you can't just buy a myostatin inhibitor" />
                <CrossLink href="/research?q=How%20is%20latent%20myostatin%20activated%20by%20furin%20and%20BMP-1%2Ftolloid%20proteases%3F" label="Ask the research agent about activation" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing guidance, or
              a recommendation to use any compound. Specific compounds are named to explain
              the science; verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The activation cascade: pro-myostatin → (furin) → latent → (tolloid) → active → receptor ── */
function ActivationDiagram() {
  const W = 760, H = 300;
  // Four states across the lane; two enzyme "gates" fall in the gaps between them.
  const boxW = 132, boxH = 76, boxY = 58;
  const cx = [86, 300, 514, 690];       // centres of the four state boxes
  const rW = [boxW, boxW, boxW, 116];   // receptor box a touch narrower
  const states = [
    { title: "Pro-myostatin", sub: "made, folded shut", color: "var(--accent-purple)" },
    { title: "Latent complex", sub: "prodomain still shields it", color: "var(--accent-blue)" },
    { title: "Active myostatin", sub: "free to signal", color: "var(--accent-teal)" },
    { title: "ActRIIB", sub: "the receptor", color: "var(--accent-rose)" },
  ];
  const gates = [
    { x: (cx[0] + boxW / 2 + cx[1] - boxW / 2) / 2, label: "furin", sub: "cuts RXXR" },
    { x: (cx[1] + boxW / 2 + cx[2] - boxW / 2) / 2, label: "BMP-1 / tolloid", sub: "cuts at Asp-76" },
  ];
  // Interception tags anchored under the state they act on.
  const tags = [
    { cx: cx[0] + 40, y: 200, text: "apitegromab locks it here", color: "var(--accent-purple)", to: cx[0] + 40 },
    { cx: cx[2], y: 236, text: "follistatin traps it here", color: "var(--accent-teal)", to: cx[2] },
    { cx: cx[3], y: 200, text: "bimagrumab blocks here", color: "var(--accent-rose)", to: cx[3] },
  ];
  const midY = boxY + boxH / 2;

  return (
    <figure className="my-2 overflow-x-auto rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full min-w-[560px] max-w-2xl"
        role="img"
        aria-label="Myostatin is made as an inactive pro-protein, cut by furin into a latent complex still shielded by its prodomain, then cut again by a BMP-1/tolloid protease at aspartate-76 to release the active signal that binds the ActRIIB receptor. Apitegromab acts on the latent form, follistatin traps the freed ligand, and bimagrumab blocks the receptor."
      >
        {/* connectors between states */}
        {cx.slice(0, -1).map((c, i) => {
          const x1 = c + rW[i] / 2;
          const x2 = cx[i + 1] - rW[i + 1] / 2;
          return (
            <g key={`c${i}`}>
              <line x1={x1} y1={midY} x2={x2 - 9} y2={midY} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
              <path d={`M ${x2 - 10} ${midY - 5} L ${x2 - 2} ${midY} L ${x2 - 10} ${midY + 5}`} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="2" />
            </g>
          );
        })}

        {/* enzyme gates (the two cuts) */}
        {gates.map((g) => (
          <g key={g.label}>
            <line x1={g.x} y1={midY - 22} x2={g.x} y2={midY + 22} stroke={states[0].color} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x={g.x} y={boxY - 20} textAnchor="middle" fontSize="16" aria-hidden>&#9986;</text>
            <text x={g.x} y={boxY - 4} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.75" fontSize="11.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{g.label}</text>
            <text x={g.x} y={midY + 38} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.45" fontSize="10.5">{g.sub}</text>
          </g>
        ))}

        {/* state boxes */}
        {states.map((s, i) => (
          <g key={s.title}>
            <rect
              x={cx[i] - rW[i] / 2}
              y={boxY}
              width={rW[i]}
              height={boxH}
              rx={14}
              fill={i === 3 ? "color-mix(in srgb, var(--accent-rose) 12%, transparent)" : "var(--panel)"}
              stroke={s.color}
              strokeOpacity={i === 3 ? 0.7 : 0.4}
              strokeWidth={i === 3 ? 2 : 1}
            />
            <text x={cx[i]} y={boxY + 32} textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{s.title}</text>
            <text x={cx[i]} y={boxY + 52} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11.5">{s.sub}</text>
          </g>
        ))}

        {/* interception tags */}
        {tags.map((t) => {
          const tagW = t.text.length * 6.1 + 20;
          // Keep the tag inside the viewBox even when its anchor sits near an edge;
          // the connector still points to the true anchor (t.to).
          const tcx = Math.max(tagW / 2 + 2, Math.min(t.cx, W - tagW / 2 - 2));
          return (
            <g key={t.text}>
              <line x1={t.to} y1={boxY + boxH} x2={t.to} y2={t.y - 12} stroke={t.color} strokeOpacity="0.5" strokeWidth="1.25" strokeDasharray="2 3" />
              <rect x={tcx - tagW / 2} y={t.y - 12} width={tagW} height={22} rx={11} fill="var(--surface)" stroke={t.color} strokeOpacity="0.55" strokeWidth="1" />
              <text x={tcx} y={t.y + 3} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif">{t.text}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two cuts in a fixed order arm the brake. Every state before the last is a place a
        drug can intercept - and the earlier the altitude, the more selective the block.
      </figcaption>
    </figure>
  );
}
