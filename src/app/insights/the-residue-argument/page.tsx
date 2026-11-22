import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink, StatusNote } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-residue-argument")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title:
    "Peptide Drug Design: How One Amino-Acid Change Turns a Hormone Into a Drug · Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "The Residue Argument: One Amino Acid Separates a Hormone From a Drug · Peptide Hormone",
    description: insight.dek,
  },
};

// Primary sources — named inline so each structural claim stays checkable.
const REF = {
  holst: "https://pubmed.ncbi.nlm.nih.gov/17928588/", // Holst 2007, Physiol Rev — GLP-1 physiology, DPP-4 inactivation
  eng: "https://pubmed.ncbi.nlm.nih.gov/1313797/", // Eng et al. 1992, J Biol Chem — isolation of exendin-4 from Heloderma suspectum
  lau: "https://pubmed.ncbi.nlm.nih.gov/26308095/", // Lau et al. 2015, J Med Chem — discovery of semaglutide (Aib8, Arg34, Lys26 acylation)
  knudsen: "https://pubmed.ncbi.nlm.nih.gov/31031702/", // Knudsen & Lau 2019, Front Endocrinol — liraglutide + semaglutide design
  santen: "https://pubmed.ncbi.nlm.nih.gov/6420439/", // Santen et al. 1984, JCEM — D-Leu6-GnRH superagonist
  desmo: "https://pubmed.ncbi.nlm.nih.gov/32065484/", // Akagawa et al. 2020 — desmopressin (1-deamino-8-D-arginine vasopressin)
} as const;

// One row per family. `change` is the single residue-level edit; `from`/`to`
// is the native vs engineered position; `result` is what that one edit bought.
const MOVES: {
  drug: string;
  parent: string;
  change: string;
  position: string;
  result: string;
}[] = [
  {
    drug: "Exenatide",
    parent: "GLP-1",
    change: "His–Gly, not His–Ala",
    position: "residue 2",
    result: "DPP-4 can't trim the N-terminus; the venom peptide outlasts the human one",
  },
  {
    drug: "Semaglutide",
    parent: "GLP-1",
    change: "Ala → Aib",
    position: "residue 8",
    result: "a non-natural amino acid the protease doesn't recognize; survives with an acyl tail added",
  },
  {
    drug: "Leuprolide",
    parent: "GnRH",
    change: "L-Gly → D-Leu",
    position: "residue 6",
    result: "mirror-image residue resists breakdown and binds harder — a superagonist",
  },
  {
    drug: "Desmopressin",
    parent: "Vasopressin",
    change: "L-Arg → D-Arg, deaminated N-terminus",
    position: "residues 1 & 8",
    result: "water-holding kept, blood-pressure action stripped out",
  },
];

// FAQ — surfaced as FAQPage JSON-LD via insightLd() and mirrored below.
const FAQS = [
  {
    q: "How can a drug differ from a natural hormone by only one amino acid?",
    a: "Because a single residue often decides how long a peptide survives in the body or which receptor it prefers. Natural GLP-1 is cut apart by an enzyme called DPP-4 within about two minutes of release. The enzyme recognizes the eighth residue; change that one residue to something it doesn't recognize and the peptide survives far longer, while still folding into nearly the same shape and hitting the same receptor. The rest of the chain can be identical.",
  },
  {
    q: "Why is the changed residue usually at position two or eight?",
    a: "Because that is where the main clearance enzyme cuts. DPP-4 removes the first two residues from the N-terminus of many hormones, so the residue it reads — position 8 in the GLP-1 numbering, position 2 counting from the active peptide's start — is the one worth protecting. Exendin-4 has a naturally unrecognized residue there; semaglutide installs a synthetic one. Both defeat the same enzyme at the same spot.",
  },
  {
    q: "What does a D-amino acid do in a peptide drug?",
    a: "A D-amino acid is the mirror image of the normal L form. Most body enzymes are shaped to cut L-residues, so swapping in a D-residue at a cut site blocks the enzyme and extends the peptide's life. Leuprolide swaps a D-leucine into GnRH at position six; desmopressin swaps a D-arginine into vasopressin at position eight. The atoms are the same; only the handedness changes.",
  },
  {
    q: "Does one changed residue make it a different molecule from the hormone?",
    a: "Yes. A label that lists a different residue count, a substitution, a D-amino acid or an attached fatty acid is describing a distinct molecule with its own half-life, potency and receptor profile — not the endogenous hormone. \"Same sequence as the natural peptide\" and \"one residue off\" are not interchangeable claims, and the one-residue version can behave completely differently in the body.",
  },
  {
    q: "Is extending half-life the same as changing a residue?",
    a: "Not quite — they are two different levers. A residue substitution blocks the enzyme that cuts the peptide. Attaching a fatty-acid chain, as semaglutide and liraglutide do, makes the peptide cling to albumin so the kidney clears it slowly. Modern long-acting drugs use both: a protected residue so it isn't cut, plus an acyl tail so it isn't filtered out.",
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
            <Section title="One letter of difference">
              <P>
                Natural GLP-1, the gut hormone behind the best-selling drugs in
                this catalog, is destroyed about two minutes after the intestine
                releases it. An enzyme called DPP-4 reaches in and clips off the
                first two residues, and the clipped peptide no longer works (
                <a href={REF.holst} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Holst, Physiol Rev, 2007
                </a>
                ). For decades that two-minute lifespan was the whole problem:
                everyone knew what GLP-1 did, and nobody could keep it around long
                enough to use.
              </P>
              <P>
                The solution, in the end, was one residue. DPP-4 only cuts when
                it recognizes the amino acid at the eighth position. Change that
                one residue to something the enzyme can&rsquo;t read, and the
                peptide survives — still folded into almost the same shape, still
                binding the same receptor, still carrying the same message.{" "}
                <Link href="/hormones/semaglutide" className={LINK}>Semaglutide</Link>{" "}
                does exactly this: it differs from human GLP-1 by two substitutions
                (one of them that protective residue) and an attached fatty acid,
                and it lasts a week instead of two minutes (
                <a href={REF.lau} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lau et&nbsp;al., J Med Chem, 2015
                </a>
                ).
              </P>
              <Callout label="The argument">
                The interesting thing is not that it worked once. It is that the
                same move — change one residue at the spot where the body&rsquo;s
                enzymes cut — keeps working, in hormone families that have nothing
                to do with each other. That recurrence is the real lesson of
                peptide drug design: a hormone and a drug can be one letter apart.
              </Callout>
            </Section>

            <Section title="The lizard found the residue first">
              <P>
                Before any chemist installed a protective residue, an animal had
                one for free. In 1992 a 39-residue peptide called exendin-4 was
                pulled out of the venom of the Gila monster,{" "}
                <Em>Heloderma suspectum</Em> (
                <a href={REF.eng} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Eng et&nbsp;al., J Biol Chem, 1992
                </a>
                ). It is only about half a sequence match for human GLP-1, yet it
                begins His&ndash;Gly where GLP-1 begins His&ndash;Ala. That single
                different residue at position two is enough: DPP-4 reads the
                glycine, finds nothing it can cut, and leaves the peptide intact.
              </P>
              <P>
                That lizard peptide became{" "}
                <Link href="/hormones/exenatide" className={LINK}>exenatide</Link>, the
                first GLP-1 drug, and it proved the principle the synthetic
                versions would copy. The full story of how a venom became a drug
                class is its own piece —{" "}
                <Link href="/insights/the-lizard-that-ate-twice-a-year" className={LINK}>
                  the lizard that ate twice a year
                </Link>{" "}
                — and how the two-minute hormone was stretched to a weekly dose is{" "}
                <Link href="/insights/peptide-half-life-engineering" className={LINK}>
                  a separate engineering story
                </Link>
                . What matters here is narrower: nature and the lab arrived at the
                same answer to the same enzyme, and the answer was one residue.
              </P>
            </Section>

            <Section title="The same move, four unrelated families">
              <P>
                Line up four drugs that share no therapeutic area — diabetes,
                obesity, prostate cancer, bed-wetting — and the design trick is
                the same shape every time: find the residue the body&rsquo;s
                enzymes act on, and change just that one.
              </P>
              <ResidueTable />
              <P>
                Two of these use a <Em>D-amino acid</Em>: the mirror image of the
                normal form. Body enzymes are built to cut the ordinary L-residues,
                so a D-residue dropped at a cut site is invisible to them.{" "}
                <Link href="/hormones/leuprolide" className={LINK}>Leuprolide</Link>{" "}
                puts a D-leucine into GnRH at position six and becomes a
                long-acting superagonist (
                <a href={REF.santen} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Santen et&nbsp;al., JCEM, 1984
                </a>
                ). Desmopressin puts a D-arginine into{" "}
                <Link href="/hormones/vasopressin" className={LINK}>vasopressin</Link>{" "}
                at position eight and removes the N-terminal amine, which keeps
                the water-retaining action while stripping out the
                blood-pressure action — the reason it is safe as a nasal spray for
                children (
                <a href={REF.desmo} target="_blank" rel="noopener noreferrer" className={LINK}>
                  1-deamino-8-D-arginine vasopressin
                </a>
                ).
              </P>
            </Section>

            <Section title="Why position two, or position eight">
              <P>
                The changed residue is rarely random. It sits where the main
                clearance enzyme does its work. DPP-4 strips two residues off the
                N-terminus of a whole set of hormones, so the residue it reads — the
                eighth in GLP-1&rsquo;s numbering, the second counting from the
                active peptide&rsquo;s start — is the one worth defending. Exendin-4
                has a residue there the enzyme can&rsquo;t touch; semaglutide
                installs a synthetic one called Aib (
                <a href={REF.knudsen} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Knudsen &amp; Lau, Front Endocrinol, 2019
                </a>
                ). Same enzyme, same position, two different fixes.
              </P>
              <P>
                This is also why residue substitution and half-life extension are
                two different levers, not one. Blocking the cut keeps the peptide
                from being chopped; it does nothing about the kidney quietly
                filtering it out. So the weekly drugs do both — a protected residue
                so it isn&rsquo;t cut, and a fatty-acid chain that makes it cling to
                the blood protein albumin so it isn&rsquo;t filtered. The residue
                buys survival against the protease; the acyl tail buys survival
                against the kidney.
              </P>
            </Section>

            <Section title="Why this changes how you read a label">
              <P>
                The residue argument has a practical edge. If one changed residue
                can turn a two-minute hormone into a weekly drug, or strip a whole
                action out of a peptide, then <Em>one changed residue means a
                different molecule</Em> — with its own half-life, its own potency,
                its own receptor profile.
              </P>
              <Bullets
                items={[
                  [
                    "A residue count is a fingerprint",
                    "Human GLP-1 and exendin-4 are different lengths; semaglutide carries substitutions GLP-1 does not. A product that lists a different count or a substitution is not the endogenous hormone, whatever the name on the vial suggests",
                  ],
                  [
                    "\"Same sequence\" and \"one residue off\" are different claims",
                    "They sound alike and behave nothing alike. The one-residue version can resist an enzyme the natural peptide cannot, which is the entire point of making it",
                  ],
                  [
                    "A D in the name is doing work",
                    "D-Leu, D-Arg, D-Trp — the mirror-image letter is usually there to block a protease or sharpen receptor binding, not decoration. It marks a molecule engineered to outlast its parent",
                  ],
                  [
                    "An attached chain is a second mechanism",
                    "A fatty acid or linker on a lysine is the half-life lever, separate from the residue swap. Reading a modern peptide means reading both",
                  ],
                ]}
              />
              <P>
                None of this is a reason to fear a changed residue — it is the
                reason the drugs work at all. It is a reason to read the structure,
                not the marketing: the difference between a hormone you make and a
                drug you inject can come down to a single letter, and that letter
                is doing something specific.
              </P>
            </Section>

            <Section title="The short version">
              <Bullets
                items={[
                  ["Natural GLP-1 dies in two minutes", "DPP-4 clips its N-terminus; the cut peptide stops working."],
                  ["One residue defeats the enzyme", "Change the residue DPP-4 reads and the peptide survives, same shape, same receptor."],
                  ["The move generalizes", "Exenatide, semaglutide, leuprolide and desmopressin all turn on a single residue-level edit."],
                  ["Position isn't random", "The changed residue sits where the clearance enzyme cuts — usually the second or eighth."],
                  ["One residue = different molecule", "A substitution, a D-amino acid, a different count: distinct half-life, potency and receptor profile."],
                ]}
              />
            </Section>

            {/* Visible FAQ block */}
            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">Common questions</h2>
              <dl className="mt-6 space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/40 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/the-lizard-that-ate-twice-a-year" label="The lizard that ate twice a year — the venom behind the whole class" />
                <CrossLink href="/insights/peptide-half-life-engineering" label="How long does semaglutide last? Two minutes to seven days" />
                <CrossLink href="/insights/the-triple-agonist" label="What is retatrutide? The triple agonist explained" />
                <CrossLink href="/insights/how-to-read-peptide-dosing" label="How to read a peptide dose: four kinds of milligram" />
                <CrossLink href="/hormones/semaglutide" label="Semaglutide — the monograph" />
                <CrossLink href="/research?q=Why%20does%20changing%20one%20amino%20acid%20extend%20a%20peptide%27s%20half-life%3F" label="Ask the research agent about residue engineering" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on how peptide drugs are engineered from their
              parent hormones, summarized and simplified from the public record.
              Not individualized medical advice or a prescription. Where a dose or
              regimen appears it is reported from its source as research literacy —
              so you can read the evidence yourself — not an instruction to dose.
              Structures are quoted to explain the chemistry, not to rank or
              endorse any drug.{" "}
              <StatusNote of={["semaglutide", "exenatide", "leuprolide", "vasopressin"]} />
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Residue table: the single-residue edit across four unrelated families ───
   One row per drug: the parent hormone, the one residue-level change, where it
   sits, and what that change bought. The point of the figure is the recurrence
   of a single-letter edit, so the "change" column is the emphasis.            */
function ResidueTable() {
  const font = "var(--font-space-grotesk), sans-serif";
  return (
    <figure className="my-2 overflow-x-auto rounded-2xl border border-ink/10 bg-surface p-4">
      <table className="w-full border-collapse text-left text-[13px]">
        <caption className="sr-only">
          Four peptide drugs and the single residue-level change that separates each from its parent
          hormone: exenatide from GLP-1 (His-Gly not His-Ala at residue 2), semaglutide from GLP-1
          (alanine to Aib at residue 8), leuprolide from GnRH (L-glycine to D-leucine at residue 6),
          and desmopressin from vasopressin (L-arginine to D-arginine plus a deaminated N-terminus).
        </caption>
        <thead>
          <tr
            className="font-mono text-[10.5px] uppercase tracking-wide text-ink/45"
            style={{ fontFamily: font }}
          >
            <th scope="col" className="py-2 pr-3 font-medium">Drug</th>
            <th scope="col" className="py-2 pr-3 font-medium">Parent</th>
            <th scope="col" className="py-2 pr-3 font-medium">The one change</th>
            <th scope="col" className="py-2 pr-3 font-medium">Where</th>
            <th scope="col" className="py-2 font-medium">What it bought</th>
          </tr>
        </thead>
        <tbody className="align-top">
          {MOVES.map((m) => (
            <tr key={m.drug} className="border-t border-ink/[0.08]">
              <th
                scope="row"
                className="py-3 pr-3 font-semibold text-ink"
                style={{ fontFamily: font }}
              >
                {m.drug}
              </th>
              <td className="py-3 pr-3 text-ink/55">{m.parent}</td>
              <td className="py-3 pr-3 font-medium text-accent">{m.change}</td>
              <td className="py-3 pr-3 whitespace-nowrap text-ink/55">{m.position}</td>
              <td className="py-3 text-ink/70">{m.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-3 text-center text-xs text-ink/40">
        Four drugs, four therapeutic areas, one design move: change the residue the body&rsquo;s
        enzymes act on, and leave the rest of the chain alone.
      </figcaption>
    </figure>
  );
}
