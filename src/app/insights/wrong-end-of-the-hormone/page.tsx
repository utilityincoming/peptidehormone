import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("wrong-end-of-the-hormone")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

const RECONNECT = "https://doi.org/10.1097/AOG.0000000000003500";
const LABEL = "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/210557s000lbl.pdf";

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
            <Section title="The claim, stated fairly">
              <P>
                Search for KPV alongside &ldquo;libido&rdquo; or &ldquo;HSDD&rdquo; and you will find
                it: vendor copy that lists sexual desire among the tripeptide&rsquo;s benefits,
                stack guides that pair it with PT-141 as if they were two strengths of the same
                thing, forum threads asking whether KPV is &ldquo;the gentler PT-141.&rdquo; None of
                it is malicious. It is a chain of reasonable-sounding steps that arrives somewhere
                false, and it is worth walking the chain rather than just declaring the conclusion
                wrong.
              </P>
              <P>
                Step one: <Em>hypoactive sexual desire disorder</Em> &ndash; persistent, distressing
                loss of sexual desire not explained by another condition, a relationship, or a drug
                &ndash; has exactly one approved on-demand treatment, and it is a peptide.{" "}
                <Link href="/hormones/pt-141" className={LINK}>Bremelanotide</Link>, sold as
                Vyleesi, was approved in June 2019 for premenopausal women with acquired,
                generalised HSDD. Step two: bremelanotide is a <Em>melanocortin</Em>, an analog of
                the pigment hormone{" "}
                <Link href="/hormones/alpha-msh" className={LINK}>&alpha;-MSH</Link>. Step three:{" "}
                <Link href="/hormones/kpv" className={LINK}>KPV</Link> is also a melanocortin, also
                derived from &alpha;-MSH, and its own catalog page will tell you so. Step four,
                unstated: molecules in the same family, from the same parent, do the same sort of
                thing.
              </P>
              <P>
                Steps one to three are true. Step four is where it breaks, and it breaks for a
                reason that is written into the two molecules&rsquo; sequences. They were not cut
                from the same part of the hormone. They were cut from opposite ends, and the end
                that KPV comes from was chosen <Em>because</Em> it does not do what bremelanotide
                does.
              </P>
            </Section>

            <Section title="Thirteen residues, two messages">
              <P>
                &alpha;-MSH is thirteen amino acids long, and pharmacologists have known since the
                1980s that it carries at least two separable messages. The first sits in the middle:
                residues six to nine, His-Phe-Arg-Trp, are the <Em>melanocortin pharmacophore</Em>,
                the four-residue motif that every one of the five melanocortin receptors recognises.
                Swap or delete those four and the peptide stops binding MC1R, stops binding MC4R,
                stops doing anything a receptor would notice. Everything the family is famous for
                &ndash; the pigment, the appetite suppression, the adrenal signal, the sexual
                effects &ndash; runs through that tetrapeptide docking into one receptor or another.
              </P>
              <P>
                The second message sits at the far end. Residues eleven to thirteen,
                Lys-Pro-Val, were identified in 1989 as the smallest fragment that still reproduced
                the parent hormone&rsquo;s anti-inflammatory effect &ndash; a fever-lowering,
                cytokine-quieting action that, awkwardly for the textbook, did not seem to need a
                melanocortin receptor at all. That fragment is KPV. It contains none of the
                pharmacophore. It cannot dock a melanocortin receptor because it does not carry the
                part of the molecule that does the docking. In binding and signalling assays it
                does not activate MC4R at any concentration a pharmacologist would take seriously;
                the residual argument in the literature is over whether it has a faint interaction
                with MC1R, the pigment receptor, not whether it touches the receptor that governs
                desire.
              </P>
              <SequenceMap />
              <P>
                This is not a subtle distinction the vendors missed. It is the whole point of the
                molecule. KPV exists as a research compound precisely because someone wanted the
                anti-inflammatory clause of &alpha;-MSH{" "}
                <Link href="/insights/the-last-three-words" className={LINK}>
                  without the receptor message
                </Link>{" "}
                &ndash; without the tanning, without the appetite effect, and without the sexual
                side-effects that the receptor message produces. Selling KPV for desire is selling
                it for the property it was engineered to lack.
              </P>
            </Section>

            <Section title="Where the desire story actually came from">
              <P>
                To see why the pharmacophore matters so much, follow the other fragment&rsquo;s
                history, because the HSDD drug was an accident. In the late 1980s Victor Hruby and
                Mac Hadley at the University of Arizona were trying to build a longer-lasting
                &alpha;-MSH for a sensible purpose: a tan without the sun, for people at risk of
                skin cancer. They kept the His-Phe-Arg-Trp core, swapped one residue for its mirror
                image to resist enzymes, and locked the middle of the peptide into a ring so it
                would hold its shape. The result, melanotan II, is essentially the pharmacophore
                and its scaffolding with everything else trimmed away &ndash; seven residues
                instead of thirteen, and the tail with KPV in it is gone entirely.
              </P>
              <P>
                In the first human tanning studies in the mid-1990s the men given melanotan II
                tanned, and several of them also reported spontaneous erections, hours of them,
                along with yawning and nausea. A follow-up crossover study in men with psychogenic
                erectile dysfunction confirmed that the effect was real and placebo-resistant. The
                peptide was reaching MC4 receptors in the hypothalamus, and MC4R, it turned out,
                sits on a circuit that gates sexual arousal in both sexes &ndash; in rats, agonists
                at that receptor produce erections in males and solicitation behaviour in females,
                and the effect vanishes in animals with the receptor knocked out.
              </P>
              <Callout label="The lineage in one sentence">
                Bremelanotide is melanotan II with its C-terminal amide replaced by a free acid
                &ndash; a metabolite of the tanning peptide, developed by Palatin Technologies first
                as a nasal spray for erectile dysfunction, dropped in 2008 when the FDA raised
                concerns about blood pressure, and revived as a subcutaneous autoinjector for women.
                Every step of that story runs through the four residues KPV does not have.
              </Callout>
            </Section>

            <Section title="What the approved drug actually does">
              <P>
                Having established that KPV is the wrong molecule, honesty requires saying how well
                the right one works, because the size of bremelanotide&rsquo;s reputation on the
                catalog page is part of why the rumour spread to its neighbours. The approval rests
                on two identical phase-3 trials,{" "}
                <a href={RECONNECT} className={LINK} target="_blank" rel="noopener noreferrer">
                  RECONNECT
                </a>
                , which together randomised about 1,250 premenopausal women with HSDD to
                bremelanotide 1.75&nbsp;mg or placebo, self-injected on demand at least 45 minutes
                before anticipated sex, for 24 weeks.
              </P>
              <Numbers />
              <P>
                Both co-primary endpoints were met, and both are small. On the desire domain of the
                Female Sexual Function Index, which runs from 1.2 to 6, the drug arm improved by
                roughly a third of a point more than placebo. On the distress item &ndash; how
                bothered you are by your low desire, scored 0 to 4 &ndash; the gap was about the
                same. The trials&rsquo; key secondary endpoint, the one the earlier HSDD drug
                flibanserin had been judged on, was the number of <Em>satisfying sexual
                events</Em> per month. Bremelanotide did not separate from placebo on it. The FDA
                had, before the trial, agreed that events were a poor measure for an on-demand drug
                &ndash; a woman decides when to inject &ndash; and accepted the desire and distress
                scores instead. That is a defensible regulatory position. It is also why the label
                describes a modest change in how women felt rather than a change in what happened.
              </P>
              <P>
                The other side of the ledger is not modest. Four in ten women on bremelanotide had
                nausea, against about one in a hundred on placebo, and roughly one in eight needed
                an anti-emetic. One in five flushed. Blood pressure rose by around six points
                systolic for a few hours after each dose, which is why the{" "}
                <a href={LABEL} className={LINK} target="_blank" rel="noopener noreferrer">label</a>{" "}
                caps use at one dose a day and eight a month and contraindicates the drug in
                uncontrolled hypertension. And in about one per cent of participants the pigment
                receptor did what the pigment receptor does: focal darkening of the face, gums, or
                breasts, more likely in darker skin and with more than eight doses a month, and not
                always reversible. The tanning peptide never entirely left the molecule.
              </P>
            </Section>

            <Section title="The record on KPV">
              <P>
                Against that there is, for KPV, nothing to weigh. Not a negative result &ndash;
                nothing. No published study in any species has tested KPV on sexual behaviour,
                erection, arousal, or desire. There is no clinical trial of KPV in humans for any
                indication, sexual or otherwise; its evidence base is cells and rodents, almost
                entirely in inflammation models, with colitis the best developed. The receptor
                pharmacology predicts that such a study, if run, would find nothing, because the
                molecule lacks the motif that engages the receptor the effect depends on. But the
                claim on the vendor page is not resting on a prediction. It is resting on a name.
              </P>
              <Ledger />
              <P>
                One more mechanism of confusion deserves naming, because this site is guilty of the
                raw material. Family-level descriptions of the melanocortins &ndash; ours included
                &ndash; list &ldquo;pigmentation, appetite, inflammation, and sexual function&rdquo;
                in a single breath. That is an accurate description of what the <Em>receptor
                family</Em> does. It is not a description of any one ligand, and the entire
                interest of the family is that its members split those jobs apart:
                setmelanotide takes appetite, afamelanotide takes pigment, bremelanotide takes
                desire and drags pigment along, KPV takes inflammation and nothing else. Reading a
                family property as a molecule property is the same mistake as assuming every
                steroid builds muscle.
              </P>
            </Section>

            <Section title="What&rsquo;s settled, and what isn&rsquo;t">
              <P>
                <Em>Settled:</Em> the sexual effects of the melanocortin system run through MC4R
                and require the His-Phe-Arg-Trp pharmacophore; KPV does not contain it and does not
                activate MC4R; no study has examined KPV and sexual function; bremelanotide is the
                melanocortin with an HSDD indication, and its measured benefit is a small shift on
                desire and distress scores with no demonstrated change in satisfying sexual events
                and a heavy nausea burden.
              </P>
              <P>
                <Em>Open:</Em> whether KPV&rsquo;s faint reported interaction with MC1R is real or
                an artefact, which matters for its anti-inflammatory mechanism and for nothing
                else; whether bremelanotide&rsquo;s desire effect would hold in postmenopausal
                women or men, where it has not been approved; whether an MC4R agonist can ever be
                built that leaves the pigment receptor alone. None of those open questions puts
                KPV anywhere near a bedroom. If the catalog page says otherwise, it has the
                hormone by the wrong end.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/kpv" label="KPV reference" />
                <CrossLink href="/hormones/pt-141" label="Bremelanotide (PT-141) reference" />
                <CrossLink href="/insights/the-last-three-words" label="What KPV actually does, and how" />
                <CrossLink href="/families/melanocortins" label="One family, five receptors, split jobs" />
                <CrossLink href="/hormones/alpha-msh" label="The parent hormone" />
                <CrossLink href="/research?q=Summarize%20the%20RECONNECT%20phase%203%20trials%20of%20bremelanotide%20for%20HSDD%20and%20any%20evidence%20on%20KPV%20and%20sexual%20function" label="Ask the research agent for primary sources" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference summarized from public scientific literature, trial reports,
              and regulatory documents, simplified in places. Not medical advice, dosing guidance,
              or a recommendation to use any compound. Hypoactive sexual desire disorder is a
              clinical diagnosis; anyone concerned about it should speak with a clinician, not a
              catalog.
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

function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-2 border-accent-amber bg-accent-amber/[0.08] p-5">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-accent-amber">{label}</div>
      <p className="text-[15px] leading-7 text-ink/80">{children}</p>
    </div>
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

/* ── α-MSH: the receptor message in the middle, the anti-inflammatory tail at the end ── */
const RESIDUES = ["Ser", "Tyr", "Ser", "Met", "Glu", "His", "Phe", "Arg", "Trp", "Gly", "Lys", "Pro", "Val"];

function SequenceMap() {
  const W = 620, H = 230;
  const boxW = 40, gap = 4, x0 = 26, y0 = 78, boxH = 44;
  const xAt = (i: number) => x0 + i * (boxW + gap);
  const isCore = (i: number) => i >= 5 && i <= 8;
  const isTail = (i: number) => i >= 10;
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-xl"
        role="img"
        aria-label="The thirteen residues of alpha-MSH laid out in a row. Residues six to nine, His-Phe-Arg-Trp, are highlighted as the melanocortin receptor pharmacophore that bremelanotide keeps; residues eleven to thirteen, Lys-Pro-Val, are highlighted as KPV, the anti-inflammatory tail that binds no melanocortin receptor"
      >
        <text x={x0} y={30} fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          α-MSH · 13 residues
        </text>
        {/* bracket: receptor message */}
        <path d={`M ${xAt(5)} 62 v -8 h ${4 * boxW + 3 * gap} v 8`} fill="none" stroke="var(--accent-amber)" strokeWidth="1.5" />
        <text x={xAt(5) + (4 * boxW + 3 * gap) / 2} y={46} textAnchor="middle" fill="var(--accent-amber)" fontSize="11" fontWeight="600">
          receptor message · kept by bremelanotide
        </text>
        {/* bracket: tail */}
        <path d={`M ${xAt(10)} ${y0 + boxH + 10} v 8 h ${3 * boxW + 2 * gap} v -8`} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <text x={xAt(10) + (3 * boxW + 2 * gap) / 2} y={y0 + boxH + 34} textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="600">
          KPV · no receptor
        </text>
        {RESIDUES.map((r, i) => {
          const core = isCore(i), tail = isTail(i);
          const fill = core ? "var(--accent-amber)" : tail ? "var(--accent)" : "var(--color-ink)";
          const op = core || tail ? 0.9 : 0.08;
          const txt = core || tail ? "var(--surface)" : "var(--color-ink)";
          return (
            <g key={i} transform={`translate(${xAt(i)} ${y0})`}>
              <rect width={boxW} height={boxH} rx={8} fill={fill} fillOpacity={op} />
              <text x={boxW / 2} y={boxH / 2 + 4} textAnchor="middle" fill={txt} fillOpacity={core || tail ? 1 : 0.8} fontSize="12" fontWeight="600" fontFamily="var(--font-geist-mono), monospace">
                {r}
              </text>
              <text x={boxW / 2} y={-6} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="9">
                {i + 1}
              </text>
            </g>
          );
        })}
        <text x={x0} y={H - 42} fill="var(--color-ink)" fillOpacity="0.6" fontSize="11">
          MC1R · MC3R · MC4R · MC5R all recognise His-Phe-Arg-Trp. Desire runs through MC4R.
        </text>
        <text x={x0} y={H - 24} fill="var(--color-ink)" fillOpacity="0.6" fontSize="11">
          Lys-Pro-Val enters the cell via PepT1 and quiets NF-κB. It has no receptor to knock on.
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two fragments of one hormone, cut from opposite ends. Bremelanotide is a cyclised,
        seven-residue version of the middle; KPV is the last three residues on the right.
      </figcaption>
    </figure>
  );
}

/* ── RECONNECT, pooled, as reported ── */
function Numbers() {
  const rows: { measure: string; drug: string; placebo: string; note: string }[] = [
    { measure: "FSFI desire domain (1.2–6), change", drug: "≈ +0.3 to +0.4", placebo: "≈ +0.1 to +0.2", note: "co-primary · met" },
    { measure: "Distress about low desire (0–4), change", drug: "≈ −0.7", placebo: "≈ −0.4", note: "co-primary · met" },
    { measure: "Satisfying sexual events / month", drug: "no separation", placebo: "—", note: "key secondary · not met" },
    { measure: "Nausea", drug: "≈ 40%", placebo: "≈ 1%", note: "≈ 13% needed an anti-emetic" },
    { measure: "Flushing", drug: "≈ 20%", placebo: "≈ 0.3%", note: "" },
    { measure: "Focal hyperpigmentation", drug: "≈ 1%", placebo: "0%", note: "more with > 8 doses/month; not always reversible" },
    { measure: "Discontinued for adverse events", drug: "≈ 18%", placebo: "≈ 2%", note: "" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-ink/10 text-ink/50">
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">RECONNECT, 24 weeks</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">Bremelanotide</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">Placebo</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide"><span className="sr-only">Note</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.measure} className="border-b border-ink/[0.06] last:border-0">
              <td className="px-4 py-3 text-ink/80">{r.measure}</td>
              <td className="px-4 py-3 font-mono text-ink/80">{r.drug}</td>
              <td className="px-4 py-3 font-mono text-ink/60">{r.placebo}</td>
              <td className="px-4 py-3 text-xs text-ink/45">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="px-4 py-3 text-xs text-ink/40">
        Rounded from the pooled phase-3 publication and the FDA label; the two trials differed
        slightly and are given here as ranges. Every efficacy row is a questionnaire score.
      </figcaption>
    </figure>
  );
}

/* ── What an HSDD claim needs vs what each molecule has ── */
function Ledger() {
  const rows: { need: string; brem: string; kpv: string }[] = [
    { need: "Contains the melanocortin pharmacophore", brem: "Yes — cyclised His-D-Phe-Arg-Trp core", kpv: "No — residues 11–13 only" },
    { need: "Activates MC4R", brem: "Nanomolar agonist (also MC1R, MC3R, MC5R)", kpv: "Not at any tested concentration" },
    { need: "Sexual behaviour in animals", brem: "Erections in male rats; solicitation in females; lost in MC4R knockouts", kpv: "Never studied" },
    { need: "Human sexual-function data", brem: "Two phase-3 trials, ≈ 1,250 women", kpv: "None, in any indication" },
    { need: "Regulatory indication", brem: "Vyleesi, HSDD, premenopausal women, 2019", kpv: "None" },
    { need: "What it does have", brem: "A small desire effect and the pigment receptor along for the ride", kpv: "Preclinical anti-inflammatory activity, receptor-independent" },
  ];
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-ink/10 text-ink/50">
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide">An HSDD claim needs</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide text-accent-amber">Bremelanotide</th>
            <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wide text-accent">KPV</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.need} className="border-b border-ink/[0.06] last:border-0 align-top">
              <td className="px-4 py-3 text-ink/80">{r.need}</td>
              <td className="px-4 py-3 text-ink/60">{r.brem}</td>
              <td className="px-4 py-3 text-ink/60">{r.kpv}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="px-4 py-3 text-xs text-ink/40">
        Same parent hormone, opposite ends, no overlap on any row that matters for desire.
      </figcaption>
    </figure>
  );
}
