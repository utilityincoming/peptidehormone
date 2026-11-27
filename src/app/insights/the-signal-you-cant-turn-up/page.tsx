import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-signal-you-cant-turn-up")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What Is Leptin Resistance? Why More Leptin Doesn't Treat Obesity — and Where It Does Work — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each claim stays checkable.
const REF = {
  physiology: "https://pubmed.ncbi.nlm.nih.gov/9796811/", // Friedman & Halaas — Nature 1998: leptin and the regulation of body weight
  trial: "https://pubmed.ncbi.nlm.nih.gov/10546697/", // Heymsfield et al. — JAMA 1999: recombinant leptin for weight loss, dose-escalation RCT
  transport: "https://pubmed.ncbi.nlm.nih.gov/8684156/", // Caro et al. — Lancet 1996: decreased CSF/serum leptin ratio in obesity
  socs3: "https://pubmed.ncbi.nlm.nih.gov/9660946/", // Bjorbaek et al. — Mol Cell 1998: SOCS-3 as a mediator of central leptin resistance
  lipodystrophy: "https://pubmed.ncbi.nlm.nih.gov/11856796/", // Oral et al. — NEJM 2002: leptin-replacement therapy for lipodystrophy
  reducedWeight: "https://pubmed.ncbi.nlm.nih.gov/16322796/", // Rosenbaum et al. — J Clin Invest 2005: low-dose leptin reverses reduced-weight adaptations
  amylin: "https://pubmed.ncbi.nlm.nih.gov/18458326/", // Roth et al. — PNAS 2008: leptin responsiveness restored by amylin agonism
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd() and mirrored in the visible block.
const FAQS = [
  {
    q: "What is leptin resistance?",
    a: "Leptin resistance is the state, typical of common obesity, in which blood leptin is high but the brain responds poorly to it — so appetite isn't suppressed and giving still more leptin does little. It is not usually a broken receptor; it reflects a saturable blood-to-brain transport step and built-in feedback brakes inside leptin-sensing neurons.",
  },
  {
    q: "Why doesn't taking more leptin treat obesity?",
    a: "Because the signal is already turned up and the brain has stopped listening. In a randomized dose-escalation trial, recombinant leptin produced only modest and variable weight loss in ordinary obese adults. The transport of leptin into the brain saturates, and negative-feedback molecules like SOCS-3 blunt the response, so adding leptin to an already-high level changes little.",
  },
  {
    q: "Does leptin ever work as a treatment?",
    a: "Yes — where leptin is genuinely missing. In lipodystrophy, in which the body lacks fat and therefore lacks leptin, leptin replacement dramatically improves metabolism. And in the weight-reduced state after dieting, when leptin has fallen, a low dose can reverse the metabolic slowdown that drives weight regain. Leptin's power is at the low end of its range, not the high end.",
  },
  {
    q: "Can leptin resistance be reversed?",
    a: "Re-sensitizing the brain to leptin is a more promising strategy than adding more leptin. The clearest example is amylin: in animal and early human work, amylin agonism restored leptin responsiveness and the combination produced more weight loss than either alone. This 'leptin re-sensitization' idea is part of why amylin has become a focus of modern obesity drug development.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(197,146,74,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/adipokines" className="text-accent-amber hover:text-ink">
                Adipokines &amp; energy balance
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
            <Section title="The drug that should have been obvious">
              <P>
                The logic was airtight on paper.{" "}
                <Link href="/hormones/leptin" className={LINK}>Leptin</Link> is made by fat in
                proportion to how much fat there is; it acts on the brain to suppress appetite
                and permit energy expenditure; it is, in short, the body&rsquo;s report that the
                tank is full (
                <a href={REF.physiology} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Friedman &amp; Halaas, Nature, 1998
                </a>
                ). Give an obese person more of the full-tank signal and appetite should fall.
                When leptin was discovered, it looked like the obesity drug the field had been
                waiting a century for.
              </P>
              <P>
                It wasn&rsquo;t. In a randomized, dose-escalation trial, recombinant leptin
                produced only modest and highly variable weight loss in ordinary obese adults —
                nothing like the cure the mechanism promised (
                <a href={REF.trial} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Heymsfield et&nbsp;al., JAMA, 1999
                </a>
                ). This piece is about <Em>why</Em> — and the answer is not that the hormone is
                weak. It is that it is a signal you can&rsquo;t turn up. (The full arc of
                leptin&rsquo;s discovery and its two readings is told in{" "}
                <Link href="/insights/the-hormone-discovered-twice" className={LINK}>
                  the hormone discovered twice
                </Link>
                ; this is the mechanism underneath it.)
              </P>
            </Section>

            <Section title="Two reasons the brain stops listening">
              <P>
                &ldquo;Leptin resistance&rdquo; sounds like a broken receptor. It usually
                isn&rsquo;t. Two quieter mechanisms do the work. The first is a{" "}
                <Em>transport ceiling</Em>: leptin has to be carried from the blood into the
                brain across the blood–brain barrier, and that carriage is saturable. Obese
                people have very high blood leptin but a disproportionately low level in the
                cerebrospinal fluid — the ratio falls as blood leptin climbs, so past a point,
                more leptin in the blood delivers no more signal to the brain (
                <a href={REF.transport} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Caro et&nbsp;al., Lancet, 1996
                </a>
                ).
              </P>
              <LeptinCeilingFigure />
              <P>
                The second is a brake <Em>inside</Em> the neuron. When leptin activates its
                receptor, it also switches on feedback inhibitors — most famously{" "}
                <Em>SOCS-3</Em> — that damp the very next leptin signal (
                <a href={REF.socs3} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Bjørbaek et&nbsp;al., Mol&nbsp;Cell, 1998
                </a>
                ). A cell bathed chronically in high leptin turns its own gain down. Between a
                saturating door and a self-dimming receiver, a body that already has plenty of
                leptin is nearly deaf to more of it.
              </P>
              <Callout label="Resistance is a feature, not a bug">
                None of this is the system failing. Leptin evolved to defend against{" "}
                <Em>starvation</Em> — to notice when fuel runs low — not to defend against
                abundance. A ceiling on the &ldquo;too much&rdquo; signal and a floor it guards
                fiercely is exactly what you&rsquo;d build for an animal whose real danger was
                famine. Common obesity runs into a brake evolution installed on purpose.
              </Callout>
            </Section>

            <Section title="Which is why its power is at the low end">
              <P>
                If leptin is deaf at the top of its range, it is acutely sensitive at the
                bottom — and that is where it genuinely works as a medicine. In{" "}
                <Em>lipodystrophy</Em>, where the body lacks fat and therefore lacks leptin,
                replacing it is transformative: it corrects the severe insulin resistance,
                fatty liver and lipid abnormalities these patients suffer (
                <a href={REF.lipodystrophy} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Oral et&nbsp;al., NEJM, 2002
                </a>
                ). Give leptin to someone who has almost none and you get a dramatic answer;
                give it to someone already saturated and you get a shrug. Same hormone, opposite
                results, decided entirely by where on the curve the patient sits.
              </P>
              <P>
                The subtlest version of this is the one that matters for every dieter. When you
                lose weight, leptin falls faster than fat does, and the brain reads the drop as a
                famine alarm — slowing metabolism, raising hunger, defending the lost weight. In
                people held at a reduced weight, a <Em>low dose</Em> of leptin — just enough to
                refill the fallen signal — reverses those adaptations: the skeletal-muscle,
                autonomic and neuroendocrine slowdown that otherwise drags weight back on (
                <a href={REF.reducedWeight} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Rosenbaum et&nbsp;al., J&nbsp;Clin&nbsp;Invest, 2005
                </a>
                ). The lever that did nothing in the obese state does a great deal in the
                reduced-weight state. It is a floor signal, not a ceiling one.
              </P>
            </Section>

            <Section title="The way forward was never more leptin">
              <P>
                Put the pieces together and the drug strategy inverts. If the problem is a brain
                that has stopped listening, the answer isn&rsquo;t to shout louder — it&rsquo;s
                to make the brain <Em>sensitive</Em> again. The clearest example is{" "}
                <Link href="/hormones/amylin" className={LINK}>amylin</Link>: in animal and early
                human studies, amylin agonism restored leptin responsiveness, and amylin plus
                leptin together produced more weight loss than either alone (
                <a href={REF.amylin} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Roth et&nbsp;al., PNAS, 2008
                </a>
                ). Leptin re-sensitization is a large part of why amylin has become such a focus
                of modern obesity pharmacology — the thread that runs straight into{" "}
                <Link href="/insights/the-molecule-that-is-both-halves" className={LINK}>
                  the amylin-based drugs
                </Link>{" "}
                this reference keeps meeting.
              </P>
              <Bullets
                items={[
                  [
                    "The transport ceiling",
                    "Leptin's entry into the brain is saturable — high blood leptin, disproportionately low brain leptin, so more delivers no more signal.",
                  ],
                  [
                    "The internal brake",
                    "Leptin switches on its own feedback inhibitors (SOCS-3), so chronic high leptin turns the neuron's gain down.",
                  ],
                  [
                    "Where it works",
                    "At the low end — leptin replacement in lipodystrophy, and low-dose leptin to reverse the weight-regain defense after dieting.",
                  ],
                  [
                    "The real fix",
                    "Not more leptin but re-sensitization — amylin restores leptin responsiveness, a foundation of the modern amylin drugs.",
                  ],
                ]}
              />
            </Section>

            {/* Visible Q&A — mirrors the FAQPage JSON-LD */}
            <Section title="Questions readers actually ask">
              <dl className="space-y-6">
                {FAQS.map(({ q, a }) => (
                  <div key={q}>
                    <dt className="font-display text-lg font-semibold">{q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/75">{a}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/leptin" label="Leptin — the hormone, in the catalog" />
                <CrossLink href="/insights/the-hormone-discovered-twice" label="The hormone discovered twice — leptin's full arc" />
                <CrossLink href="/insights/the-fat-hormone-that-falls-as-fat-rises" label="The fat hormone that falls as fat rises — adiponectin" />
                <CrossLink href="/insights/the-molecule-that-is-both-halves" label="The molecule that is both halves — the amylin drugs" />
                <CrossLink href="/insights/insulins-forgotten-twin" label="Insulin's forgotten twin — what amylin does" />
                <CrossLink href="/families/adipokines" label="The adipokines & energy-balance family" />
                <CrossLink
                  href="/research?q=What%20are%20the%20mechanisms%20of%20leptin%20resistance%20%E2%80%94%20saturable%20blood-brain-barrier%20transport%20and%20SOCS-3%20feedback%20%E2%80%94%20and%20how%20does%20amylin%20restore%20leptin%20sensitivity%3F"
                  label="Ask the research agent about leptin resistance"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized and
              simplified from the public record. Not individualized medical advice or a
              prescription. Leptin replacement (metreleptin) is approved only for specific
              conditions such as generalized lipodystrophy, not for common obesity; the
              reduced-weight and amylin findings are research results. Verify any claim against
              the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The transport ceiling: blood leptin climbs, the brain's share plateaus ── */
function LeptinCeilingFigure() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 600 246"
        className="w-full"
        role="img"
        aria-label="As fat mass and blood leptin rise, leptin in the blood keeps climbing, but the signal reaching the brain plateaus because transport across the blood-brain barrier is saturable — so more leptin delivers no more message."
      >
        {/* axes */}
        <line x1="66" y1="196" x2="556" y2="196" stroke="var(--color-ink)" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="66" y1="40" x2="66" y2="196" stroke="var(--color-ink)" strokeOpacity="0.2" strokeWidth="1" />
        <text x="311" y="226" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11" fontFamily="var(--font-geist-mono), monospace">blood leptin — rises with fat mass →</text>

        {/* resistance zone shading (high blood leptin, flat brain signal) */}
        <rect x="396" y="40" width="160" height="156" fill="var(--accent-amber)" fillOpacity="0.06" />

        {/* blood leptin: keeps climbing */}
        <path d="M66,188 L556,58" fill="none" stroke="var(--accent-amber)" strokeWidth="2.5" />
        <text x="486" y="66" fill="var(--accent-amber)" fontSize="11" fontWeight="600" fontFamily="var(--font-geist-mono), monospace">leptin in blood</text>

        {/* brain signal: rises then plateaus */}
        <path d="M66,188 C130,96 180,82 240,80 C360,76 470,78 556,78" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        <text x="300" y="70" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="600" fontFamily="var(--font-geist-mono), monospace">signal to the brain</text>

        {/* low-end marker: steep part */}
        <circle cx="120" cy="120" r="3.5" fill="var(--accent)" />
        <text x="132" y="142" fill="var(--color-ink)" fillOpacity="0.55" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">here, a little leptin</text>
        <text x="132" y="156" fill="var(--color-ink)" fillOpacity="0.55" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">moves a lot</text>

        {/* resistance annotation */}
        <text x="476" y="176" textAnchor="middle" fill="var(--accent-amber)" fontSize="11" fontWeight="600" fontFamily="var(--font-geist-mono), monospace">resistance:</text>
        <text x="476" y="190" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">more leptin, no more message</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Transport into the brain saturates: as fat and blood leptin climb, the signal the brain actually receives flattens out.
        That gap is leptin resistance — and it is why adding leptin to an already-high level does so little.
      </figcaption>
    </figure>
  );
}
