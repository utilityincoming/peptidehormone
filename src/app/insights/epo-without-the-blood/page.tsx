import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("epo-without-the-blood")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "ARA-290 (Cibinetide): EPO's Tissue Protection Without the Red Cells — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title:
      "EPO Without the Blood: ARA-290, the Innate Repair Receptor, and an Honest Evidence Read · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  heteroreceptor: "https://doi.org/10.1073/pnas.0406491101", // Brines et al. 2004, PNAS — EPO tissue protection via EPOR/β-common heteroreceptor
  peptide: "https://pubmed.ncbi.nlm.nih.gov/18676614/", // Brines et al. 2008, PNAS — nonerythropoietic helix-B and 11-mer tissue-protective peptides
  sarcoid: "https://pubmed.ncbi.nlm.nih.gov/23168581/", // Heij et al. 2012, Mol Med — ARA-290 in sarcoidosis small-fiber neuropathy pilot
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd().
const FAQS = [
  {
    q: "What is ARA-290 (cibinetide)?",
    a: "ARA-290, also called cibinetide, is an 11-amino-acid synthetic peptide modeled on one face of erythropoietin (EPO) — the hormone that raises red blood cells. It reproduces EPO's separate tissue-protective, anti-inflammatory signaling without raising the blood count at all. It does this by engaging a different receptor from the one that makes red cells: the 'innate repair receptor.' It is investigational, studied mainly in small-fiber neuropathy, and not an approved drug.",
  },
  {
    q: "How can a peptide have EPO's protective effect but not raise red cells?",
    a: "Because EPO actually signals through two different receptors. The classic one — a pair of EPO receptors — drives red-cell production. A second, the innate repair receptor (an EPO-receptor/β-common-chain heteromer), appears on injured and inflamed tissue and carries EPO's protective, anti-inflammatory signal. ARA-290 is built from the part of EPO that engages the second receptor but not the first, so it delivers the tissue protection while leaving the blood count untouched.",
  },
  {
    q: "What is ARA-290 studied for?",
    a: "Mainly small-fiber neuropathy — damage to the thin nerve fibers that carry pain and autonomic signals — especially the painful neuropathy of sarcoidosis, and related work in diabetic neuropathy. In a small randomized pilot, ARA-290 improved neuropathic symptom scores versus placebo, and later work reported increases in corneal nerve-fiber measures. The data are early and come largely from a single research group, so the honest grade is promising but preliminary.",
  },
  {
    q: "Is ARA-290 related to EPO doping?",
    a: "They share a parent molecule but not the effect athletes misuse. EPO itself is doped precisely because it raises red-cell mass and oxygen delivery. ARA-290 was engineered to remove exactly that property — it does not raise hematocrit — so it is not an oxygen-carrying performance enhancer. It isolates EPO's other, quieter job: protecting and repairing tissue.",
  },
  {
    q: "Is ARA-290 an approved drug?",
    a: "No. It is investigational. The clinical evidence is limited to small, mostly single-center trials, and no large phase 3 program has confirmed the early signals; development stalled after its sponsor wound down. The receptor biology is genuinely elegant and the pilot results are encouraging, but 'encouraging and unreplicated at scale' is the accurate description, not 'proven.'",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(244,114,182,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/repair" className="text-accent-rose hover:text-ink">
                Repair &amp; regenerative
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
            <Section title="The hormone with a second job">
              <P>
                Erythropoietin — EPO — is famous for one thing: it makes red blood cells. The
                kidney releases it when oxygen runs low, the marrow answers by building more
                red cells, and the same property is why EPO is the archetypal blood-doping
                agent. But across the 2000s a strange observation kept recurring in the lab:
                EPO protected tissue — brain, heart, nerve — from injury in ways that had
                nothing obvious to do with red cells, and often at the wrong doses and
                timescales for the blood effect to explain it.
              </P>
              <P>
                The resolution turned out to be that EPO does two jobs through two different
                receptors, and{" "}
                <Link href="/hormones/ara-290" className={LINK}>ARA-290</Link> is what you get
                when you keep the second job and discard the first. It is an eleven-amino-acid
                peptide carrying EPO&rsquo;s tissue-protective signal with none of its
                blood-building effect — EPO without the blood. The receptor story is a genuine
                pleasure; the clinical evidence is early and thin. Both halves are true.
                Bullish on the science, sceptical on the page.
              </P>
            </Section>

            <Section title="Two receptors, one hormone">
              <P>
                The red-cell effect runs through a pair of EPO receptors clasped together — a
                homodimer — on red-cell precursors. The protective effect runs through
                something else: an <Em>innate repair receptor</Em>, a heteromer built from one
                EPO receptor joined to the β-common chain (CD131), a signaling subunit shared
                with some immune cytokines. Crucially, this second receptor is not sitting
                everywhere. It appears on tissue that is injured or inflamed — it is, in
                effect, a receptor the body puts out when damage is present (
                <a href={REF.heteroreceptor} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Brines et&nbsp;al., PNAS, 2004
                </a>
                ). That is why EPO&rsquo;s protective action shows up where there is harm to
                repair and not in healthy tissue.
              </P>
              <P>
                Once you know there are two receptors, a drug design follows. Find the part of
                the EPO molecule that engages the repair receptor but not the red-cell one, and
                you can split the hormone in half. That is exactly what was done: short peptides
                modeled on one surface of EPO — its helix-B face — reproduced the tissue
                protection in models of stroke, kidney injury and nerve trauma, and an
                eleven-residue version worked too, with neither peptide raising red cells at all
                (
                <a href={REF.peptide} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Brines et&nbsp;al., PNAS, 2008
                </a>
                ). That eleven-mer is ARA-290.
              </P>
              <SplitDiagram />
            </Section>

            <Section title="Why splitting the hormone matters">
              <P>
                The split is not a technicality — it is the whole value. EPO&rsquo;s red-cell
                effect is a liability when you only want the protection: raising the blood count
                thickens the blood and carries real cardiovascular risk, which is precisely why
                EPO is dangerous as a doping agent and carefully dosed as an anemia drug. A
                protective signal that leaves hematocrit untouched removes that liability.
                ARA-290 is a clean demonstration of a move this site keeps meeting — take a
                hormone that does several things and keep only the clause you want, as{" "}
                <Link href="/insights/the-last-three-words" className={LINK}>KPV</Link> does with
                α-MSH&rsquo;s anti-inflammatory clause.
              </P>
              <P>
                It also reframes what EPO <Em>is</Em>. The blood effect is the famous one, but
                the tissue-protective, anti-inflammatory signaling may be the older and broader
                job — a general &ldquo;limit the collateral damage of injury&rdquo; instruction
                that the red-cell role was layered on top of. ARA-290 is the tool that let
                researchers study that instruction on its own.
              </P>
            </Section>

            <Section title="The evidence, read honestly">
              <P>
                Here the page turns sceptical, because the clinical record is much thinner than
                the mechanism. The most-cited human result is a small randomized, placebo-
                controlled pilot in sarcoidosis-associated small-fiber neuropathy — damage to the
                thin nerves that carry pain and autonomic signals — in which four weeks of
                ARA-290 improved neuropathic symptom scores versus placebo in 22 patients (
                <a href={REF.sarcoid} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Heij et&nbsp;al., Mol&nbsp;Med, 2012
                </a>
                ). Later work from the same line reported gains in corneal nerve-fiber measures,
                a marker of small-fiber regeneration, and related study extended to diabetic
                neuropathy.
              </P>
              <P>
                Those are real, encouraging signals — and they are also small, early, and drawn
                largely from a single research group, with no large phase 3 program to confirm
                them before development stalled when the sponsor wound down. &ldquo;Elegant
                mechanism, promising pilot data, not yet proven at scale&rdquo; is the accurate
                grade. The innate repair receptor is a genuine discovery; ARA-290 is a genuine
                tool for probing it; and the leap from a 22-patient symptom score to an
                established therapy is exactly the leap the evidence has not yet made.
              </P>
              <Callout label="How to hold it">
                Separate the three claims. That EPO protects tissue through a distinct receptor:
                well-supported. That an 11-mer can carry that signal without raising red cells:
                shown in animals and early human work. That ARA-290 treats a human disease:
                suggested by small pilots, not established. The mechanism is the strong part; the
                clinic is the unfinished part.
              </Callout>
            </Section>

            <Section title="The quiet half of a famous molecule">
              <P>
                EPO is one of the most consequential hormones in modern medicine and sport, and
                almost all of that fame is about red cells and oxygen. ARA-290 is the argument
                that the molecule&rsquo;s other half — a damage-sensing, tissue-protecting,
                anti-inflammatory signal that only shows up where there is injury — might be the
                more interesting one, and the one worth building a drug around. Whether it
                becomes a therapy is unsettled. That it cleanly separates EPO&rsquo;s two jobs,
                and gives the quiet one a molecule of its own, is not.
              </P>
              <Bullets
                items={[
                  ["EPO does two jobs through two receptors", "A homodimeric EPO receptor builds red cells; a separate innate repair receptor (EPOR/β-common) carries a tissue-protective, anti-inflammatory signal that appears on injured tissue."],
                  ["ARA-290 keeps the second, drops the first", "An 11-residue peptide modeled on EPO's helix-B face engages the repair receptor but not the red-cell one — EPO's protection with no rise in hematocrit."],
                  ["Splitting removes the liability", "EPO's red-cell effect thickens blood and carries cardiovascular risk (the doping danger). A protective signal without it is the whole point — a 'keep one clause' design like KPV."],
                  ["The human evidence is early and thin", "A 22-patient sarcoidosis small-fiber-neuropathy pilot improved symptoms; corneal nerve-fiber gains followed. Small, mostly single-group, no phase 3 — promising, not proven."],
                  ["Not EPO doping", "ARA-290 was engineered to remove the red-cell, oxygen-carrying effect entirely; it isolates EPO's tissue-repair job, not its performance one."],
                ]}
              />
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/ara-290" label="ARA-290 / cibinetide reference (the helix-B peptide)" />
                <CrossLink href="/insights/the-last-three-words" label="The last three words — KPV, another 'keep one clause' peptide" />
                <CrossLink href="/insights/a-switch-not-a-supply" label="A switch, not a supply — repair signaling, honestly graded" />
                <CrossLink href="/families/repair" label="The repair & regenerative family" />
                <CrossLink href="/methodology" label="How this site grades evidence" />
                <CrossLink href="/research?q=How%20does%20ARA-290%20%28cibinetide%29%20separate%20erythropoietin%27s%20tissue-protective%20signaling%20from%20its%20red-cell%20effect%2C%20and%20what%20does%20the%20clinical%20evidence%20actually%20show%3F" label="Ask the research agent about ARA-290" />
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

/* ── One hormone, two receptors: ARA-290 keeps only the repair arm ── */
function SplitDiagram() {
  const W = 700;
  const H = 300;

  const Box = ({ x, y, w, title, sub, color, op }: { x: number; y: number; w: number; title: string; sub: string; color: string; op: number }) => (
    <g>
      <rect x={x} y={y} width={w} height={52} rx={10} fill={`color-mix(in srgb, ${color} ${op}%, transparent)`} stroke={color} strokeOpacity={0.6} strokeWidth={1.3} />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.88} fontSize="12" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">{title}</text>
      <text x={x + w / 2} y={y + 38} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="9.5">{sub}</text>
    </g>
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="Erythropoietin signals through two receptors. The EPO receptor homodimer drives red blood cell production. The innate repair receptor — an EPO-receptor plus beta-common-chain heteromer that appears on injured tissue — drives tissue protection and anti-inflammatory signaling. ARA-290 engages only the innate repair receptor, so it delivers tissue protection with no red-cell effect. The red-cell arm is shown greyed out for ARA-290."
      >
        <text x={W / 2} y={24} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.55} fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          One hormone, two receptors — ARA-290 keeps one
        </text>

        {/* EPO source */}
        <Box x={270} y={48} w={160} title="Erythropoietin" sub="full hormone" color="var(--accent-rose)" op={14} />
        {/* branch lines */}
        <line x1={320} y1={100} x2={170} y2={150} stroke="var(--color-ink)" strokeOpacity={0.35} strokeWidth={1.5} />
        <line x1={380} y1={100} x2={530} y2={150} stroke="var(--accent-rose)" strokeOpacity={0.6} strokeWidth={1.8} />

        {/* left: red-cell receptor */}
        <Box x={60} y={150} w={220} title="EPO-receptor homodimer" sub="red blood cell production" color="var(--color-ink)" op={6} />
        <text x={170} y={232} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.5} fontSize="10">↑ hematocrit · oxygen · doping risk</text>

        {/* right: innate repair receptor */}
        <Box x={420} y={150} w={220} title="Innate repair receptor" sub="EPOR / β-common (CD131)" color="var(--accent-rose)" op={16} />
        <text x={530} y={232} textAnchor="middle" fill="var(--accent-rose)" fillOpacity={0.9} fontSize="10">tissue protection · anti-inflammatory</text>

        {/* ARA-290 callout */}
        <rect x={420} y={250} width={220} height={34} rx={9} fill="color-mix(in srgb, var(--accent-rose) 20%, transparent)" stroke="var(--accent-rose)" strokeOpacity={0.75} strokeWidth={1.4} />
        <text x={530} y={271} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.9} fontSize="11" fontWeight="700" fontFamily="var(--font-space-grotesk), sans-serif">ARA-290 binds only this one</text>

        {/* greyed X over the left arm for ARA-290 */}
        <text x={170} y={258} textAnchor="middle" fill="var(--color-ink)" fillOpacity={0.4} fontSize="10">ARA-290: no effect here</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        EPO branches to two receptors. ARA-290 is built to engage only the injury-induced repair
        receptor — the tissue protection, without the red cells.
      </figcaption>
    </figure>
  );
}
