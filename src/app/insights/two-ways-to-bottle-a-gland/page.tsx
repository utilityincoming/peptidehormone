import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("two-ways-to-bottle-a-gland")!;

export const metadata: Metadata = {
  title: insight.title,
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  ta1Review:
    "https://www.mdpi.com/1420-3049/28/8/3539", // King & Tuthill / Camerini-style review, "Thymosin α1 and Its Role in Viral Infectious Diseases: The Mechanism and Clinical Application", Molecules 2023 — TLR mechanism + clinical map
  ta1Pmc:
    "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10144173/", // same review, PMC mirror
  longevity:
    "https://khavinson.info/assets/files/skan/2003-khavinson_morozov1.pdf", // Khavinson & Morozov, "Peptides of pineal gland and thymus prolong human life", 2003 — the 266-patient mortality figures
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
            <Section title="The gland that dissolves itself">
              <P>
                Start with the organ, because both of these compounds are really arguments
                about one organ. The <Em>thymus</Em> is a small gland behind the breastbone
                whose job is finishing school for T-cells: immature lymphocytes arrive from
                the marrow, and the thymic environment teaches them what counts as self,
                kills the ones that get it wrong, and licenses the rest. Its peculiarity is
                that it does this work early and then leaves. From about puberty the thymus{" "}
                <Em>involutes</Em> &mdash; its working tissue is steadily replaced by fat,
                so that output of fresh, naive T-cells falls decade by decade. Much of what
                we call immune ageing is that shutdown.
              </P>
              <P>
                So there is an obvious, decades-old idea: if the thymus is what winds down,
                give the body back whatever the thymus was making. Two research programmes
                took that idea and arrived at almost opposite objects. One kept the whole
                extract and never fully opened it. The other opened it all the way, to a
                single sequence. The gap between them is the real subject here &mdash; not
                which molecule is stronger, but what it means to know what a drug <Em>is</Em>.
              </P>
              <TwoRoutesDiagram />
            </Section>

            <Section title="Thymalin: the extract that stayed a black box">
              <P>
                <Em>Thymalin</Em> (Russian <Em>Timalin</Em>) is a polypeptide fraction
                boiled out of the thymus of calves, developed in Leningrad in the 1970s by
                Vladimir Khavinson and Vyacheslav Morozov &mdash; the same St. Petersburg
                school behind the cartilage tripeptide{" "}
                <Link href="/insights/distilled-to-three-letters" className={LINK}>Cartalax</Link>{" "}
                and the pineal peptide Epithalamin. It has been in clinical use across the
                former Soviet Union for roughly four decades as an immunomodulator, given by
                injection for infections, burns, and the immune depression of age. And it is,
                chemically, still a <Em>complex</Em>: a heterogeneous mixture of peptides
                rather than one named molecule with one structure and one dose you can put
                on a certificate of analysis.
              </P>
              <P>
                The school did not leave it entirely uncharacterised. Over the following
                decades its programme proposed that the interesting activity in these tissue
                extracts distils down to very short peptides &mdash; and for the thymus line
                it named a dipeptide, <Em>Glu&ndash;Trp</Em> (marketed separately as thymogen),
                as a candidate active. But it matters that thymalin the product is not that
                dipeptide: it is the parent extract, sold as the extract, and the mechanistic
                story attached to it is the same sweeping <Em>bioregulator</Em> hypothesis
                the group applies to all its preparations &mdash; that short peptides enter
                the cell nucleus and tune gene expression directly. That idea is genuinely
                interesting and{" "}
                <Link href="/insights/distilled-to-three-letters" className={LINK}>
                  covered in full elsewhere on this site
                </Link>
                ; what matters for thymalin specifically is that its clinical reputation rests
                on one headline number.
              </P>
              <Callout label="The claim that has to carry the reputation">
                In a report titled <Em>&ldquo;Peptides of pineal gland and thymus prolong
                human life,&rdquo;</Em> the group followed{" "}
                <a href={REF.longevity} target="_blank" rel="noopener noreferrer" className={LINK}>
                  266 older people over six to eight years
                </a>
                . Thymalin, given as short courses in the first two to three years, was
                reported to lower mortality roughly two-fold versus controls; a subgroup
                given thymalin plus the pineal peptide every year for six years showed a
                figure near four-fold. Taken at face value, that is one of the largest
                longevity effects ever claimed for anything. The design is where the reading
                has to slow down.
              </Callout>
              <P>
                Read the study the way you would any other. It is open, not double-blind;
                its results come overwhelmingly from a single institute and its collaborators;
                the endpoint that produced the headline is all-cause mortality in a modest
                cohort followed with the assignment known. None of that makes the number
                false. It makes it <Em>unaudited</Em> &mdash; a large effect from one group,
                on a product that is itself a mixture, never reproduced at that scale by an
                independent lab under blinded conditions. That is exactly the profile a
                careful field files under &ldquo;interesting, unconfirmed,&rdquo; not under
                &ldquo;established.&rdquo;
              </P>
            </Section>

            <Section title="Thymosin α1: the same tissue, run down to one sequence">
              <P>
                Now the other route. In the West the thymus was worked on reductively. In
                1977 Allan Goldstein&rsquo;s group took a crude thymic preparation &mdash;
                <Em>thymosin fraction 5</Em>, a soup not unlike thymalin in spirit &mdash;
                and kept purifying until a single peptide fell out: <Em>thymosin α1</Em>, a
                28-amino-acid, N-terminally acetylated sequence that turns out to be the
                front end of a larger precursor protein, prothymosin α. It is fully defined:
                one sequence, one mass near 3,108 daltons, made now by chemical synthesis
                rather than pulled from tissue, so every vial is the same molecule.
              </P>
              <Callout label="A footnote worth keeping">
                The very same fraction 5 is where{" "}
                <Link href="/hormones/thymosin-beta-4" className={LINK}>thymosin β4</Link> was
                found &mdash; the actin-sequestering repair peptide whose fragment is sold as
                TB-500. The &ldquo;thymosins&rdquo; are a naming accident of that shared
                source, not a family with a shared mechanism: α1 talks to the immune system,
                β4 rearranges the cytoskeleton. Same extract, different jobs.
              </Callout>
              <P>
                Being defined is what let it become a drug. As <Em>thymalfasin</Em>, thymosin
                α1 is marketed as <Em>Zadaxin</Em> and approved in{" "}
                <a href={REF.ta1Review} target="_blank" rel="noopener noreferrer" className={LINK}>
                  more than thirty countries
                </a>
                , principally as an adjuvant in chronic hepatitis B and C, with a four-decade
                trail of clinical trials and a low adverse-event burden. It has been studied
                in sepsis &mdash; where the problem is precisely a collapsed, exhausted T-cell
                compartment &mdash; and was used during COVID-19 in China on the same
                rationale. Whatever one concludes about effect size, this is a molecule that
                has been through the machinery: named structure, defined dose, registered
                indication, published randomised trials.
              </P>
              <P>
                And it has a mechanism you can point at. Thymosin α1 acts largely as an
                agonist at <Em>Toll-like receptor 9</Em> (with reported activity at TLR2 and
                TLR4) on dendritic cells and other immune cells &mdash; the pattern-recognition
                receptors that read &ldquo;danger&rdquo; signals. Through them it drives the{" "}
                <a href={REF.ta1Pmc} target="_blank" rel="noopener noreferrer" className={LINK}>
                  IRF3 and NF-κB pathways
                </a>
                , pushing dendritic-cell maturation and a T-helper-1 program: more IL-2 and
                interferon-γ, restored T-cell maturation, sharper natural-killer activity.
                That is a defined surface receptor and a traceable signal &mdash; the thing
                the bioregulator hypothesis, for all its elegance, does not yet have.
              </P>
              <MechanismDiagram />
            </Section>

            <Section title="Black box, white box">
              <P>
                Lay the two side by side and the contrast is almost clinical. Both begin at
                the same gland and, in effect, the same crude extract. One programme stopped
                there and defended the mixture; the other kept cutting until it held a single
                sequence. Everything downstream &mdash; whether you get a drug label, a named
                receptor, an independent trial &mdash; follows from that one fork.
              </P>
              <Bullets
                items={[
                  ["Thymalin is a mixture; thymosin α1 is a molecule", "One is a polypeptide fraction of calf thymus with no single defined structure or standardised dose; the other is a synthesised 28-residue sequence identical vial to vial. You can write thymosin α1 on a certificate of analysis. You cannot do the same for an extract in the same way."],
                  ["One has a receptor, the other has a hypothesis", "Thymosin α1's effects trace to TLR9 on dendritic cells and a Th1 program you can measure. Thymalin's are attributed to the broad 'short peptide enters the nucleus and tunes genes' model that remains largely single-source and unreplicated."],
                  ["The evidence lives at different grades", "Thymosin α1 carries decades of randomised, published hepatitis-B and sepsis trials and a registered indication in dozens of countries. Thymalin's signature result is an open, single-institute mortality study — striking, but not the kind of evidence that earns a drug label anywhere it would have to be audited."],
                  ["Neither result is dismissed here", "The point isn't that the extract is fake and the peptide is proven. It's that a defined molecule can be interrogated — dose, receptor, blinded trial — and a mixture largely has to be taken on trust. Bullish on the science in both; sceptical, on the page, in proportion to what each can show."],
                ]}
              />
              <P>
                It is tempting to read this as West-beats-East, and that would be the wrong
                lesson. The Leningrad school&rsquo;s instinct &mdash; that a whole tissue
                encodes recoverable instructions, and that the smallest active fragment might
                carry them &mdash; is the <Em>same</Em> instinct that produced thymosin α1,
                just stopped one step earlier. What separates the two is not nation or era
                but how far each was willing to run the purification, and therefore how much
                of each can be checked. The defined peptide got a receptor and a label because
                someone finished distilling it. The extract kept its most extraordinary claim
                and its black box together.
              </P>
              <Callout label="How to hold both at once">
                Treat thymosin α1 as what it is: a real, approved immunomodulator with a
                traceable mechanism and a modest, well-mapped clinical role &mdash; not a
                longevity drug, whatever the surrounding marketing says. Treat thymalin&rsquo;s
                two-fold mortality figure as a hypothesis-generating result from one group,
                worth watching for independent replication and worth nothing as a purchase
                decision until it arrives. Same gland, two epistemics; keep them separate.
              </Callout>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/thymosin-beta-4" label="Thymosin β4 — the other peptide pulled from fraction 5" />
                <CrossLink href="/insights/distilled-to-three-letters" label="Cartalax — the same school's boldest 'short peptide tunes genes' claim, in full" />
                <CrossLink href="/families/repair" label="Repair & regenerative — where the biology meets the most-hyped corner of the field" />
                <CrossLink href="/insights/the-complexity-ladder" label="The complexity ladder — how far you can shrink a peptide and keep a function" />
                <CrossLink href="/research?q=What%20independent%2C%20non-Khavinson-group%20randomised%20evidence%20exists%20that%20thymalin%20%28thymus%20polypeptide%20extract%29%20reduces%20mortality%20or%20restores%20immune%20function%20in%20humans%3F" label="Ask the research agent what independent thymalin evidence exists" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and simplified in places. Not medical advice, dosing guidance, or a
              recommendation to use any compound. Thymosin α1 (thymalfasin/Zadaxin) is an
              approved drug in some countries and unapproved in others; thymalin is a thymic
              polypeptide extract used mainly in the former USSR and not approved as a drug in
              the US or EU. The longevity figures described here come from open, largely
              single-institute studies. Verify any claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Two routes: one thymic extract, stopped at a mixture (thymalin) vs run down to one 28-aa sequence (thymosin α1) ── */
function TwoRoutesDiagram() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 560 320"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="A crude thymic extract forks two ways. One route keeps it as thymalin, an uncharacterised polypeptide mixture with a broad bioregulator hypothesis. The other purifies it all the way to thymosin alpha-1, a single defined 28-amino-acid sequence with a TLR9 receptor and a drug label."
      >
        {/* source extract */}
        <rect x="18" y="120" width="132" height="80" rx="14" fill="var(--surface-deep)" stroke="var(--color-ink)" strokeOpacity="0.12" />
        <text x="84" y="108" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.55" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Thymic extract</text>
        {[
          [34, 138, 24], [80, 132, 34], [50, 158, 18], [96, 160, 26], [40, 176, 30], [78, 182, 20],
        ].map(([cx, cy, w], i) => (
          <rect key={i} x={cx} y={cy} width={w} height="8" rx="4" fill="color-mix(in srgb, var(--color-ink) 14%, transparent)" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="0.75" />
        ))}
        <text x="84" y="215" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.4" fontSize="10" fontFamily="var(--font-mono, monospace)">calf thymus</text>

        {/* fork */}
        <path d="M 152 150 C 178 150 180 78 206 78" fill="none" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M 200 73 L 206 78 L 200 83" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />
        <path d="M 152 170 C 178 170 180 244 206 244" fill="none" stroke="var(--accent-rose)" strokeOpacity="0.4" strokeWidth="2" />
        <path d="M 200 239 L 206 244 L 200 249" fill="none" stroke="var(--accent-rose)" strokeOpacity="0.6" strokeWidth="2" />

        {/* top route: thymalin (stays a mixture) */}
        <rect x="208" y="42" width="336" height="74" rx="14" fill="color-mix(in srgb, var(--color-ink) 5%, transparent)" stroke="var(--color-ink)" strokeOpacity="0.18" strokeDasharray="4 4" />
        <text x="228" y="66" fill="var(--color-ink)" fillOpacity="0.7" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Thymalin</text>
        <text x="228" y="84" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">kept as the mixture · no single structure</text>
        <text x="228" y="100" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5">mechanism: broad bioregulator hypothesis</text>
        <text x="524" y="58" textAnchor="end" fill="var(--color-ink)" fillOpacity="0.45" fontSize="9.5" fontFamily="var(--font-mono, monospace)" letterSpacing="0.06em">BLACK BOX</text>

        {/* bottom route: thymosin alpha1 (fully resolved) */}
        <rect x="208" y="208" width="336" height="86" rx="14" fill="color-mix(in srgb, var(--accent-rose) 10%, transparent)" stroke="var(--accent-rose)" strokeWidth="2" />
        <text x="228" y="232" fill="var(--color-ink)" fontSize="13" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Thymosin α1</text>
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={228 + i * 21} y="242" width="16" height="12" rx="3" fill="var(--surface)" stroke="var(--accent-rose)" strokeOpacity="0.7" strokeWidth="1" />
        ))}
        <text x="228" y="284" fill="var(--accent-rose)" fillOpacity="0.9" fontSize="10.5" fontFamily="var(--font-mono, monospace)">28 aa · defined · TLR9 · Zadaxin</text>
        <text x="524" y="224" textAnchor="end" fill="var(--accent-rose)" fontSize="9.5" fontFamily="var(--font-mono, monospace)" letterSpacing="0.06em">WHITE BOX</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Same gland, same crude starting extract. One route stops at a mixture you cannot fully
        audit; the other runs the purification to a single 28-residue sequence you can.
      </figcaption>
    </figure>
  );
}

/* ── Mechanism: thymosin α1 as a TLR9 agonist on the dendritic cell, driving a Th1 program ── */
function MechanismDiagram() {
  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg
        viewBox="0 0 560 250"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label="Thymosin alpha-1 acts as an agonist at Toll-like receptor 9 on a dendritic cell, driving IRF3 and NF-kappaB signalling, which matures the dendritic cell and pushes a T-helper-1 program: more interferon-gamma and interleukin-2, sharper natural-killer activity."
      >
        {/* ligand */}
        <rect x="16" y="98" width="96" height="54" rx="12" fill="color-mix(in srgb, var(--accent-rose) 14%, transparent)" stroke="var(--accent-rose)" strokeWidth="2" />
        <text x="64" y="120" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">Thymosin α1</text>
        <text x="64" y="136" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10">28-aa agonist</text>

        <line x1="114" y1="125" x2="150" y2="125" stroke="var(--accent-rose)" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M 144 120 L 150 125 L 144 130" fill="none" stroke="var(--accent-rose)" strokeOpacity="0.7" strokeWidth="2" />

        {/* dendritic cell */}
        <rect x="152" y="40" width="200" height="170" rx="18" fill="var(--surface-deep)" stroke="var(--color-ink)" strokeOpacity="0.12" />
        <text x="252" y="62" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="10.5" fontFamily="var(--font-mono, monospace)" letterSpacing="0.07em">DENDRITIC CELL</text>
        {/* TLR9 */}
        <rect x="176" y="104" width="72" height="42" rx="10" fill="var(--surface)" stroke="var(--accent-rose)" strokeOpacity="0.6" strokeWidth="1.5" />
        <text x="212" y="123" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">TLR9</text>
        <text x="212" y="138" textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="9">(TLR2 / TLR4)</text>
        {/* signal */}
        <line x1="250" y1="125" x2="286" y2="125" stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M 280 120 L 286 125 L 280 130" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="2" />
        <rect x="288" y="102" width="52" height="46" rx="10" fill="color-mix(in srgb, var(--color-ink) 6%, transparent)" stroke="var(--color-ink)" strokeOpacity="0.18" />
        <text x="314" y="120" textAnchor="middle" fill="var(--color-ink)" fontSize="10.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">IRF3</text>
        <text x="314" y="136" textAnchor="middle" fill="var(--color-ink)" fontSize="10.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">NF-κB</text>

        {/* output arrow */}
        <line x1="354" y1="125" x2="392" y2="125" stroke="var(--accent-rose)" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M 386 120 L 392 125 L 386 130" fill="none" stroke="var(--accent-rose)" strokeOpacity="0.7" strokeWidth="2" />

        {/* Th1 outcomes */}
        <rect x="394" y="52" width="152" height="146" rx="14" fill="color-mix(in srgb, var(--accent-rose) 8%, transparent)" stroke="var(--accent-rose)" strokeOpacity="0.4" />
        <text x="470" y="74" textAnchor="middle" fill="var(--accent-rose)" fontSize="10.5" fontFamily="var(--font-mono, monospace)" letterSpacing="0.07em">Th1 PROGRAM</text>
        {[
          ["DC maturation", 96],
          ["IFN-γ ↑ · IL-2 ↑", 122],
          ["T-cell maturation ↑", 148],
          ["NK activity ↑", 174],
        ].map(([label, y]) => (
          <text key={label as string} x="470" y={y as number} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.75" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif">{label}</text>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        The defined peptide&rsquo;s advantage in one picture: a named surface receptor (TLR9)
        and a traceable signal out to a measurable T-helper-1 response &mdash; the part the
        extract&rsquo;s story is still missing.
      </figcaption>
    </figure>
  );
}
