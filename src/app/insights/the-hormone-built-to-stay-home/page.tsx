import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-hormone-built-to-stay-home")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "What Is PTHrP? The Developmental Hormone Behind the Growth Plate — and Cancer Hypercalcemia — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so each claim stays checkable.
const REF = {
  discovery: "https://pubmed.ncbi.nlm.nih.gov/3616618/", // Suva et al. — Science 1987: PTHrP cloned as the malignant-hypercalcemia factor
  loop: "https://pubmed.ncbi.nlm.nih.gov/8662546/", // Vortkamp et al. — Science 1996: Indian hedgehog and PTHrP regulate cartilage differentiation
  growthPlate: "https://pubmed.ncbi.nlm.nih.gov/12748651/", // Kronenberg — Nature 2003: developmental regulation of the growth plate
  essential: "https://pubmed.ncbi.nlm.nih.gov/8662561/", // Lanske et al. — Science 1996: PTH/PTHrP receptor in Ihh-regulated bone growth
  abaloparatide: "https://pubmed.ncbi.nlm.nih.gov/27533157/", // Miller et al. — JAMA 2016: ACTIVE, abaloparatide reduces fractures
  selectivity: "https://pubmed.ncbi.nlm.nih.gov/26562265/", // Hattersley et al. — Endocrinology 2016: abaloparatide PTH1R conformation selectivity
} as const;

// FAQ — surfaced as FAQPage JSON-LD via insightLd() and mirrored in the visible block.
const FAQS = [
  {
    q: "What is PTHrP (parathyroid-hormone-related protein)?",
    a: "PTHrP is a peptide that shares the active N-terminus of parathyroid hormone (PTH) and acts on the same PTH1 receptor — but in normal physiology it is not a calcium hormone. It is a local, paracrine signal with major roles in development, most famously in the growth plate that lengthens bones. It becomes a calcium problem mainly when a tumor secretes it into the blood.",
  },
  {
    q: "How is PTHrP different from PTH?",
    a: "They share a receptor and a mechanism, but live opposite lives. PTH is a circulating endocrine hormone that regulates blood calcium minute to minute. PTHrP normally acts locally, cell to cell, in tissues like cartilage, breast and placenta, and does not circulate at meaningful levels. Same lock, very different keys and settings.",
  },
  {
    q: "What does PTHrP do in the growth plate?",
    a: "It paces bone lengthening. In the cartilage growth plate, PTHrP keeps chondrocytes (cartilage cells) proliferating; cells that escape its influence mature into hypertrophic cells and release Indian Hedgehog, which signals back to increase PTHrP. That PTHrP–Indian Hedgehog feedback loop sets the tempo of endochondral bone formation, and disrupting the pathway causes severe skeletal defects.",
  },
  {
    q: "What is humoral hypercalcemia of malignancy?",
    a: "It is dangerously high blood calcium caused by a cancer secreting PTHrP into the circulation, where it acts like PTH on bone and kidney. This is the setting in which PTHrP was discovered. It is the exception that proves the rule: PTHrP causes this calcium disease precisely because the tumor forces a normally local signal to travel the bloodstream.",
  },
  {
    q: "Is PTHrP used as a drug?",
    a: "Yes, as an analog. Abaloparatide is a synthetic PTHrP(1-34) analog used for osteoporosis: given as a brief daily injection it is anabolic — it builds bone and reduced fractures in its phase 3 trial. Like teriparatide (a PTH fragment), it obeys the rule that intermittent dosing builds bone while continuous exposure dissolves it.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(94,168,250,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/calcium-bone" className="text-accent-blue hover:text-ink">
                Calcium &amp; bone
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
            <Section title="A twin that isn't a twin">
              <P>
                <Link href="/hormones/pthrp" className={LINK}>PTH-related protein</Link> looks,
                at its business end, almost exactly like{" "}
                <Link href="/hormones/pth" className={LINK}>parathyroid hormone</Link>. It shares
                PTH&rsquo;s active N-terminus and signals through the very same receptor, the
                PTH1 receptor. By the logic of most of endocrinology that should make it a second
                calcium hormone. It isn&rsquo;t. In normal life PTHrP barely circulates and plays
                almost no part in minute-to-minute blood calcium. It is a different kind of
                molecule wearing a familiar key.
              </P>
              <P>
                What it is, instead, is a <Em>paracrine</Em> hormone — one built to act locally,
                whispering to the cell next door rather than broadcasting through the blood. Its
                real work is in <Em>development</Em>: in cartilage, in the breast, in the placenta,
                in smooth muscle. The most beautiful of those jobs, and the one that shows what
                PTHrP is really for, is the growth plate that lengthens a child&rsquo;s bones.
              </P>
            </Section>

            <Section title="The clock in the growth plate">
              <P>
                A long bone grows at its <Em>growth plate</Em>, a disc of cartilage where
                chondrocytes line up, divide, then mature into large &ldquo;hypertrophic&rdquo;
                cells that are replaced by bone. The speed of that assembly line decides how long
                the bone gets — and PTHrP is its pacemaker. It runs a feedback loop with a second
                signal, <Em>Indian Hedgehog</Em> (Ihh): PTHrP, made near the ends of the plate,
                keeps chondrocytes <Em>proliferating</Em> and holds off their maturation; cells
                that drift out of PTHrP&rsquo;s reach mature and release Ihh; and Ihh signals back
                to increase PTHrP (
                <a href={REF.loop} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Vortkamp et&nbsp;al., Science, 1996
                </a>
                ;{" "}
                <a href={REF.growthPlate} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kronenberg, Nature, 2003
                </a>
                ).
              </P>
              <GrowthPlateLoop />
              <P>
                That loop is, in effect, the clock that times bone growth — a self-correcting
                circuit that sets how fast cartilage becomes bone. It is not a minor detail of
                development: delete the PTH/PTHrP receptor and Ihh-regulated bone growth is
                severely deranged (
                <a href={REF.essential} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lanske et&nbsp;al., Science, 1996
                </a>
                ). The hormone that looks like a spare calcium regulator is, in its day job, a
                master timer of the skeleton.
              </P>
            </Section>

            <Section title="Trouble only at a distance">
              <P>
                So how did a local developmental signal become famous as a cause of lethal high
                calcium? By leaving home. The one setting where PTHrP reliably causes disease is{" "}
                <Em>humoral hypercalcemia of malignancy</Em>: certain tumors secrete PTHrP into
                the bloodstream, and there — finally circulating like PTH — it drives calcium out
                of bone and up in the blood to dangerous levels. In fact that is exactly how PTHrP
                was discovered, in the hunt for the factor behind cancer-associated hypercalcemia (
                <a href={REF.discovery} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Suva et&nbsp;al., Science, 1987
                </a>
                ).
              </P>
              <Callout label="The pathology is a geography problem">
                PTHrP isn&rsquo;t dangerous because of what it does — it does the same thing PTH
                does at the PTH1 receptor. It is dangerous because of <Em>where</Em> it does it. A
                paracrine signal built to stay within a tissue becomes a poison only when a tumor
                forces it to circulate. Change nothing about the molecule and everything about its
                address, and a developmental timer becomes a metabolic emergency.
              </Callout>
            </Section>

            <Section title="And, dosed on purpose, a bone drug">
              <P>
                The same double-edged quality makes PTHrP a medicine when it is controlled.{" "}
                <Em>Abaloparatide</Em> is a synthetic PTHrP(1-34) analog given for osteoporosis,
                and — exactly like teriparatide, the PTH fragment — a brief daily injection is{" "}
                <Em>anabolic</Em>: it builds bone and cut new vertebral and nonvertebral fractures
                in its phase 3 trial (
                <a href={REF.abaloparatide} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Miller et&nbsp;al., JAMA, 2016
                </a>
                ). It was even engineered to favor a particular shape of the PTH1 receptor, aiming
                for more bone-building and less bone-dissolving signaling (
                <a href={REF.selectivity} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Hattersley et&nbsp;al., Endocrinology, 2016
                </a>
                ).
              </P>
              <P>
                The schedule is the catch, and it is the same law{" "}
                <Link href="/insights/teriparatide-backwards" className={LINK}>teriparatide obeys</Link>:
                intermittent PTHrP builds bone, continuous PTHrP dissolves it — which is why the
                drug is a daily pulse and the tumor&rsquo;s steady leak is a disease. One sequence,
                read three completely different ways depending on where it acts and for how long.
              </P>
              <Bullets
                items={[
                  [
                    "At home (paracrine)",
                    "A developmental signal — the PTHrP–Indian Hedgehog loop that paces the growth plate, plus roles in breast and placenta.",
                  ],
                  [
                    "Away (circulating)",
                    "A tumor that secretes PTHrP into the blood causes humoral hypercalcemia of malignancy — the same receptor, now systemic.",
                  ],
                  [
                    "On a schedule (a drug)",
                    "Abaloparatide, a PTHrP(1-34) analog, pulsed daily, builds bone and reduced fractures — intermittent is anabolic, continuous is not.",
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
                <CrossLink href="/hormones/pthrp" label="PTHrP — the hormone, in the catalog" />
                <CrossLink href="/hormones/pth" label="PTH — the circulating calcium hormone" />
                <CrossLink href="/insights/teriparatide-backwards" label="Teriparatide, backwards — the intermittent-vs-continuous law" />
                <CrossLink href="/insights/the-body-keeps-time" label="The body keeps time — why timing changes the message" />
                <CrossLink href="/insights/the-receptor-outlived-the-drug" label="The receptor outlived the drug — calcitonin, the calcium counterpart" />
                <CrossLink href="/families/calcium-bone" label="The calcium & bone family" />
                <CrossLink
                  href="/research?q=How%20does%20the%20PTHrP%E2%80%93Indian%20Hedgehog%20feedback%20loop%20pace%20the%20growth%20plate%2C%20and%20why%20does%20the%20same%20PTHrP%20cause%20humoral%20hypercalcemia%20of%20malignancy%20when%20tumors%20secrete%20it%3F"
                  label="Ask the research agent about PTHrP"
                />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism and the state of the evidence, summarized and
              simplified from the public record. Not individualized medical advice or a
              prescription. Abaloparatide is an approved osteoporosis drug used under medical
              supervision; it is named here to explain the biology, not to recommend use. Verify
              any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── The PTHrP–Indian Hedgehog loop that paces the growth plate ── */
function GrowthPlateLoop() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 600 214"
        className="w-full"
        role="img"
        aria-label="In the growth plate, PTHrP keeps cartilage cells dividing; cells that mature release Indian Hedgehog, which signals back to make more PTHrP — a feedback loop that paces bone growth."
      >
        {/* top node: PTHrP */}
        <rect x="190" y="22" width="220" height="42" rx="14" fill="var(--accent-blue)" fillOpacity="0.1" stroke="var(--accent-blue)" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x="300" y="42" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">PTHrP</text>
        <text x="300" y="58" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">keeps chondrocytes dividing</text>

        {/* bottom node: Ihh */}
        <rect x="190" y="150" width="220" height="42" rx="14" fill="var(--accent-amber)" fillOpacity="0.1" stroke="var(--accent-amber)" strokeOpacity="0.45" strokeWidth="1.5" />
        <text x="300" y="170" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.8" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Indian Hedgehog</text>
        <text x="300" y="186" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">released as cells mature</text>

        {/* left arrow: PTHrP delays maturation (down) */}
        <path d="M196,66 C150,92 150,122 196,148" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" />
        <polygon points="196,150 183,143 189,132" fill="var(--accent-blue)" />
        <text x="118" y="111" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">delays</text>
        <text x="118" y="125" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">maturation</text>

        {/* right arrow: Ihh raises PTHrP (up) */}
        <path d="M404,148 C450,122 450,92 404,66" fill="none" stroke="var(--accent-amber)" strokeWidth="2.5" />
        <polygon points="404,64 417,71 411,82" fill="var(--accent-amber)" />
        <text x="482" y="111" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">→ more</text>
        <text x="482" y="125" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="10.5" fontFamily="var(--font-geist-mono), monospace">PTHrP</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        A self-correcting loop: PTHrP keeps cartilage cells dividing, maturing cells release Indian Hedgehog, and Indian
        Hedgehog raises PTHrP. Its tempo sets how long a bone grows — PTHrP&rsquo;s real day job, far from blood calcium.
      </figcaption>
    </figure>
  );
}
