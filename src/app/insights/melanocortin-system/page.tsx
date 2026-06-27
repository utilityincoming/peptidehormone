import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { getInsight } from "@/lib/insights";

const insight = getInsight("melanocortin-system")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

export default function Article() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* ── Header ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(245,181,68,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/melanocortins" className="text-accent-amber hover:text-ink">
                Melanocortins
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
            <Section title="One precursor, many messages">
              <P>
                Few corners of endocrinology are as economical as the melanocortin
                system. A single gene encodes one large precursor protein,{" "}
                <Em>pro-opiomelanocortin</Em> (POMC), and the body cuts different
                active peptides out of it depending on which tissue is doing the
                cutting. The same starting material becomes a stress hormone in the
                pituitary, a pigment signal in the skin, and an appetite signal in
                the brain.
              </P>
              <P>
                Processing enzymes (the prohormone convertases) carve POMC into{" "}
                <Link href="/hormones/acth" className={LINK}>ACTH</Link>,{" "}
                <Link href="/hormones/alpha-msh" className={LINK}>α-MSH</Link>, β- and
                γ-MSH, and β-endorphin, among others. Which fragments appear, and in
                what proportion, is tissue-specific — the corticotrophs of the
                anterior pituitary mostly make ACTH, while the skin and parts of the
                hypothalamus favor the MSH peptides.
              </P>
              <Callout>
                The melanocortins are the clearest illustration of a principle that
                runs through this whole catalog: the biology is not in the ligand,
                it is in the <Em>receptor</Em>. Nearly identical peptides produce
                wildly different effects depending only on which of five receptors,
                in which tissue, they happen to reach.
              </Callout>
            </Section>

            <Section title="Five receptors, five jobs">
              <P>
                All five melanocortin receptors are G-protein-coupled receptors that
                signal mainly through Gα<sub>s</sub> and cAMP — the same machinery —
                yet their physiology could hardly be more different, because each is
                expressed in a different place:
              </P>
              <ReceptorMap />
              <P>
                Read that table and the family&rsquo;s breadth stops being
                surprising. Pigmentation, the stress axis, body weight, and gland
                secretion are not four separate systems that happen to share a name;
                they are one ligand family sorted by receptor address.
              </P>
            </Section>

            <Section title="The adrenal exception: ACTH and MC2R">
              <P>
                MC2R is the odd one out, and instructively so. Unlike the other four
                receptors, it responds to <Em>ACTH alone</Em> — the MSH peptides
                barely touch it. It also cannot work by itself: it needs an
                accessory protein, MRAP, to traffic to the cell surface and
                function. Through MC2R on the adrenal cortex, ACTH drives cortisol
                synthesis, making this receptor the business end of the{" "}
                <Em>HPA stress axis</Em> — CRH to ACTH to cortisol.
              </P>
              <P>
                That one receptor reads only one ligand, while the others are
                relatively promiscuous, is a reminder that &ldquo;selectivity&rdquo;
                in this family is a property of the receptor as much as the peptide.
              </P>
            </Section>

            <Section title="The tug-of-war that sets appetite">
              <P>
                The most consequential melanocortin story is energy balance, and it
                is unusual because the receptor has both an accelerator and a brake —
                two endogenous ligands pulling in opposite directions at the same
                site:
              </P>
              <Bullets
                items={[
                  ["α-MSH (agonist)", "Released by hypothalamic POMC neurons, it activates MC4R to suppress appetite — the satiety push."],
                  ["AgRP (antagonist / inverse agonist)", "Agouti-related peptide from a neighboring neuron population blocks MC4R, driving hunger — the opposing pull."],
                  ["Leptin sits upstream", "The fat-derived hormone leptin tips this balance: it stimulates the POMC (α-MSH) neurons and restrains the AgRP neurons, which is how a signal of energy stores reaches the appetite circuit."],
                ]}
              />
              <P>
                The clinical weight of MC4R is hard to overstate:
                loss-of-function mutations in <Em>MC4R</Em> are the most common
                single-gene cause of severe obesity. The receptor isn&rsquo;t a
                bystander in body-weight regulation — it is one of its central
                switches, and it connects directly to the{" "}
                <Link href="/hormones/leptin" className={LINK}>leptin</Link> signaling
                that reports how much fat the body is carrying.
              </P>
            </Section>

            <Section title="Selectivity is the whole game">
              <P>
                Because effect follows receptor, every melanocortin drug is really a
                bet on subtype selectivity — hit the intended receptor, spare the
                others. That framing sorts the therapeutics cleanly:
              </P>
              <Bullets
                items={[
                  ["Setmelanotide (MC4R agonist)", "Approved for specific genetic obesity syndromes — POMC deficiency, LEPR deficiency, Bardet–Biedl syndrome — where the melanocortin pathway upstream of MC4R is broken and the receptor can be engaged directly downstream of the defect."],
                  ["Bremelanotide (MC4R-centric)", "A melanocortin agonist used for sexual function, exploiting central melanocortin signaling rather than the vascular pathways older drugs target."],
                  ["The pigmentation angle (MC1R)", "MC1R agonism drives eumelanin production — the basis of legitimate photoprotection research and, separately, of the unregulated 'tanning peptide' market."],
                ]}
              />
              <Callout>
                The tanning peptides are a cautionary case the rest of this site
                keeps returning to. Marketed melanocortin analogs sold for cosmetic
                tanning are largely unregulated, of uncertain purity, and act on a
                receptor family with reach into appetite, blood pressure, and immune
                signaling — not a tidy, single-tissue effect. The honest reading is
                the same one the evidence badges encode: judge these by the data,
                not the marketing.
              </Callout>
            </Section>

            <Section title="What's established, and what's still open">
              <P>
                <Em>Established:</Em> POMC as the shared precursor; the five-receptor
                map and their principal tissues; MC2R&rsquo;s ACTH-only response and
                MRAP dependence; the α-MSH / AgRP control of MC4R and its central
                role in human body weight; and MC4R agonism as approved therapy for
                defined genetic obesity.
              </P>
              <P>
                <Em>Open:</Em> how cleanly any agonist can confine its action to one
                receptor subtype in practice; the long-term profile of central
                melanocortin agonism beyond rare-disease populations; and the full
                physiological roles of MC3R and MC5R, which remain less mapped than
                their better-studied siblings. As always, the{" "}
                <Link href="/families/melanocortins" className={LINK}>family reference</Link>{" "}
                and primary literature are where to check the edges.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/families/melanocortins" label="The melanocortins family" />
                <CrossLink href="/hormones/alpha-msh" label="α-MSH reference (the core ligand)" />
                <CrossLink href="/hormones/acth" label="ACTH: the adrenal exception" />
                <CrossLink href="/hormones/leptin" label="Leptin: the upstream signal" />
                <CrossLink href="/research?q=How%20does%20MC4R%20agonism%20treat%20genetic%20obesity%2C%20and%20what%20are%20its%20limits%3F" label="Ask the research agent about MC4R therapy" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing
              guidance, or a recommendation to use any compound. Specific
              compounds are named to explain the science; verify any claim against
              primary sources.
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-2 border-accent-amber bg-accent-amber/[0.08] p-5">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-accent-amber">Key insight</div>
      <p className="text-[15px] leading-7 text-ink/80">{children}</p>
    </div>
  );
}

function Bullets({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-3">
      {items.map(([head, body]) => (
        <li key={head} className="flex gap-3 text-[15px] leading-7 text-ink/75">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-amber" aria-hidden />
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

/* ── MC1R–MC5R receptor map ── */
function ReceptorMap() {
  const rows: { r: string; tissue: string; effect: string; color: string }[] = [
    { r: "MC1R", tissue: "Melanocytes (skin, hair)", effect: "Pigmentation — eumelanin synthesis; also immune signaling", color: "var(--accent-amber)" },
    { r: "MC2R", tissue: "Adrenal cortex", effect: "Cortisol synthesis — responds to ACTH only, needs MRAP", color: "var(--accent-rose)" },
    { r: "MC3R", tissue: "Hypothalamus, periphery", effect: "Energy homeostasis; roles still being mapped", color: "var(--accent-teal)" },
    { r: "MC4R", tissue: "Hypothalamus (CNS)", effect: "Appetite & body weight — the central obesity switch", color: "var(--accent)" },
    { r: "MC5R", tissue: "Exocrine glands", effect: "Sebum and exocrine secretion", color: "var(--accent-blue)" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <div className="divide-y divide-ink/[0.07]">
        {rows.map((row) => (
          <div key={row.r} className="flex items-start gap-4 p-4">
            <span
              className="mt-0.5 inline-flex w-16 shrink-0 justify-center rounded-md px-2 py-1 font-mono text-xs font-semibold"
              style={{ color: row.color, backgroundColor: "color-mix(in srgb, currentColor 12%, transparent)" }}
            >
              {row.r}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-ink">{row.tissue}</div>
              <div className="mt-0.5 text-[13px] leading-6 text-ink/60">{row.effect}</div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="border-t border-ink/[0.07] p-3 text-center text-xs text-ink/40">
        Same ligand family, same cAMP signaling — sorted into different physiology by receptor and tissue.
      </figcaption>
    </figure>
  );
}
