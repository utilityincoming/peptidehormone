import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-complexity-ladder")!;

// Visible FAQ === FAQPage schema (same text), for long-tail query capture.
const FAQS: { q: string; a: string }[] = [
  {
    q: "Are research peptides reliable?",
    a: "For the short synthetic peptides most researchers actually source, reliability is close to a solved property. The compounds on the availability layer are all roughly 3 to 44 residues, made by mature solid-phase synthesis, and their identity and purity can be confirmed per lot by two standard instruments: RP-HPLC for purity and mass spectrometry for mass. Because no living host touches the process, the only impurities are chemical ones those instruments are built to catch. Combine that cheap verifiability with a competitive vendor market that would notice any drift, and purity becomes the enforceable norm rather than a gamble. It is at the folded-biologic frontier, not in commodity peptides, that reliability becomes a genuinely open question.",
  },
  {
    q: "Can you buy a myostatin inhibitor?",
    a: "Not the way you buy a research peptide. The myostatin and activin inhibitors — trevogrumab, apitegromab, garetosmab, bimagrumab — are recombinant monoclonal antibodies: roughly 150 kDa, multi-chain, disulfide-linked, glycosylated proteins grown in living cells and folded correctly, not built by solid-phase synthesis. A misfolded antibody can carry the exactly correct mass and still be biologically inert, so it cannot be self-verified with HPLC and mass spec; it takes a cell-based potency bioassay. That verification gap — plus thin research demand — is why they sit outside the commodity availability layer, not any fraud problem.",
  },
  {
    q: "Is apitegromab FDA-approved?",
    a: "As of 2026, no. Apitegromab (Scholar Rock) is a Phase-3-positive anti-myostatin antibody with a strong safety and efficacy profile, but it received a 2025 FDA Complete Response Letter — and notably, the letter raised no safety or efficacy concern at all. It was solely a third-party fill-finish manufacturing observation, with resubmission underway. A fully de-risked antibody gated by the accountability of its supply chain is the single clearest illustration of why the folded-biologic frontier differs from the commodity peptide tier.",
  },
  {
    q: "Is any myostatin- or activin-pathway drug FDA-approved?",
    a: "Yes — one. Sotatercept (Merck's Winrevair), an ActRII ligand trap that dampens activin signaling, was approved in 2024 for pulmonary arterial hypertension; it is the first-in-class, fully approved member of the axis. The rest remain investigational as of 2026: trevogrumab (Regeneron, in Phase 2 as a lean-mass-preserving add-on to GLP-1 agonists), apitegromab (2025 Complete Response Letter, resubmitting), garetosmab (under FDA review for fibrodysplasia ossificans progressiva), and bimagrumab (a Lilly obesity asset). All are complex recombinant biologics, not synthetic peptides.",
  },
  {
    q: "What is the difference between a peptide and a peptide-hormone antibody?",
    a: "A short synthetic peptide is a linear chain of amino acids, typically fifty residues or fewer, assembled chemically one residue at a time and defined essentially by its sequence — so two instruments can confirm what it is. A peptide-hormone antibody (or an Fc-fusion ligand trap) is a large, folded protein grown in living cells that acts on a peptide-hormone pathway; for it, correct means the right fold, the right disulfide bonds, the right glycosylation, and the right multi-chain assembly, none of which the sequence guarantees and none of which a benchtop instrument certifies. The upshot is the whole point of complexity as an axis: the peptide is a commodity a competitive market makes and a buyer verifies cheaply, while the antibody's correctness has to be imported from an accountable manufacturing process and confirmed by an expensive bioassay. That verification gap — not any fraud epidemic — is where trust and availability actually differentiate.",
  },
];

export const metadata: Metadata = {
  title: "Are Research Peptides Reliable? Complexity, Not Fraud",
  description:
    "For commodity peptides, reliability is nearly solved by two instruments and a competitive market. Trust only becomes a real variable at the folded-biologic frontier.",
  alternates: { canonical: "/insights/the-complexity-ladder" },
  openGraph: { title: `${insight.title} · Peptide Hormone`, description: insight.dek },
};

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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(45,212,168,0.14), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/muscle-tgfb" className="text-accent hover:text-ink">
                Muscle &amp; TGF-β
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
            <Section title="A tell hiding in the stock list">
              <P>
                Look at what our{" "}
                <Link href="/available" className={LINK}>availability layer</Link> actually lists,
                and a pattern jumps out before any argument is made. Fifteen compounds are on it —{" "}
                <Link href="/hormones/bpc-157" className={LINK}>BPC-157</Link>,{" "}
                <Link href="/hormones/tb-500" className={LINK}>TB-500</Link>,{" "}
                <Link href="/hormones/ghk-cu" className={LINK}>GHK-Cu</Link>,{" "}
                <Link href="/hormones/mots-c" className={LINK}>MOTS-c</Link>,{" "}
                <Link href="/hormones/selank" className={LINK}>Selank</Link>,{" "}
                <Link href="/hormones/epitalon" className={LINK}>Epitalon</Link>, Tesamorelin,
                CJC-1295, Ipamorelin, PT-141, SS-31, KPV, DSIP, Semax, ARA-290 — and every single
                one is a short synthetic peptide, roughly three to forty-four residues, the kind an
                automated synthesizer builds routinely. Not one folded protein, not one antibody,
                not one ligand trap. That is not an editorial choice about what deserves attention;
                it is a physical fact about which molecules a competitive supply chain can reliably
                deliver and a buyer can independently check. The thing that sorts them is complexity.
              </P>
              <P>
                Understanding that axis explains both why these fifteen are commodities and why the
                far more interesting frontier compounds — the{" "}
                <Link href="/hormones/myostatin" className={LINK}>myostatin</Link> and activin
                inhibitors — are not, and will never be a self-verifiable synthetic commodity the way
                a short peptide is. This piece is the companion to{" "}
                <Link href="/insights/what-you-can-actually-get" className={LINK}>Cataloged vs. reachable</Link>:
                that one is about why reachability lags identity; this one is about the molecular
                reason it lags exactly where it does.
              </P>
            </Section>

            <Section title="The commodity case: two instruments close the question">
              <P>
                Solid-phase peptide synthesis builds a chain one residue at a time on a resin bead.
                Its economics are governed by compounding step-yield: each coupling runs better than
                99% efficient, but the errors accumulate, and every missed coupling leaves behind a
                near-identical deletion impurity one residue short. That arithmetic is why routine,
                good-yield synthesis tops out around fifty residues — a soft, process-dependent
                boundary, not a hard wall. Chemists who need to go longer don&rsquo;t stop; native
                chemical ligation stitches synthetic fragments into small proteins past a hundred
                residues.
              </P>
              <P>
                But the decisive commodity property isn&rsquo;t the length. It&rsquo;s{" "}
                <Em>verifiability</Em>. A linear short peptide&rsquo;s identity and purity can be
                pinned down per lot by two standard instruments: reversed-phase HPLC quantifies how
                much of the sample is the target versus impurities, and mass spectrometry confirms
                the exact mass. Because there is no living host anywhere in the process, the impurity
                classes are purely chemical — deletion and truncation fragments, incomplete
                deprotection, oxidation, residual synthesis reagents — precisely the failure modes
                HPLC and MS are built to catch. That cheap, near-complete self-verification is the
                quiet engine under the whole commodity tier. It is what lets a competitive market
                hold vendors accountable on a certificate of analysis, and it is why the tired
                &ldquo;is it even real&rdquo; panic is misplaced here. The identity question, for a
                linear short peptide, is genuinely close to solved by two machines.
              </P>
            </Section>

            <Section title="The honest caveat: short is not a synonym for pure">
              <P>
                It would be easy to overshoot into &ldquo;short equals automatically pure,&rdquo; and
                that is false — worth saying plainly, because the credibility of the whole argument
                depends on not overclaiming. Chain length only sets an upper bound on how tractable a
                synthesis is. &ldquo;Difficult sequences&rdquo; are a real, well-documented
                phenomenon: polyalanine runs and hydrophobic Leu/Ile/Val/Phe-rich stretches can
                aggregate on the resin even at ten or twelve residues, collapsing coupling efficiency
                and throwing deletion series and split HPLC peaks. Purity is a property of the
                sequence, the resin and chemistry, and the specific vendor&rsquo;s process — not a
                property of smallness. And mass spectrometry proves mass, not structure: it is silent
                to sequence order, to D/L epimerization, and to disulfide connectivity in cyclic
                peptides, which is why the strong-verification claim is scoped to linear short
                peptides checked by HPLC and MS together.
              </P>
              <P>
                The accurate line is the useful one: short peptides are reliably makeable and cheaply
                verifiable, so their purity is <Em>knowable and enforceable</Em> — not preordained.
                Reliability there is emergent from process maturity plus a real base of buying
                researchers who would notice drift, a point we made about supply geometry in{" "}
                <Link href="/insights/where-the-powder-comes-from" className={LINK}>
                  Where the powder comes from
                </Link>
                : the fewest hand-offs win on purity, and a thick market is what forces that
                discipline.
              </P>
            </Section>

            <Section title="The frontier case: when the process becomes the product">
              <P>
                Now cross to the other end of the axis. Antibodies, Fc-fusion ligand traps, and large
                glycoproteins cannot be built atom by atom. They must be grown in living cells — CHO
                or other mammalian lines, sometimes microbial hosts — which imports biology as an
                uncontrolled variable. The primary sequence is only the starting point. The molecule
                has to fold correctly, form the right disulfide bonds (a mispaired disulfide can be
                inert yet carry the identical intact mass), acquire the right glycosylation, and
                assemble its higher-order and quaternary structure — an IgG is two heavy and two light
                chains held together correctly or it is nothing. Glycosylation especially is
                process-coupled: the glycan distribution shifts with cell line, media, pH,
                oxygenation, culture density, and feed, so even tightly controlled monoclonal-antibody
                manufacturing shows lot-to-lot glycan heterogeneity. The right mental model is that
                the manufacturing process partly <Em>defines</Em> the product.
              </P>
              <P>
                Two consequences follow. First, contamination classes that solid-phase synthesis
                simply never generates: endotoxin from microbial hosts, residual host-cell proteins,
                residual DNA, and aggregates. Second, and this is the intellectual center of the whole
                piece, a <Em>verification asymmetry</Em>. A misfolded antibody can show the correct
                mass and still be biologically dead. Confirming one actually works requires an
                expensive orthogonal stack — higher-order-structure methods, glycan mapping, aggregate
                and size analysis, and, critically, cell-based potency bioassays. No benchtop pair of
                instruments closes that gap. A buyer cannot self-verify a folded biologic the way they
                can a short peptide; trust has to be imported from an accountable process. None of
                this makes these molecules unmakeable or the vendors dishonest — regulated makers
                control them superbly, at great cost. It makes them a different <Em>kind of thing</Em>{" "}
                to source.
              </P>
            </Section>

            <Section title="The real axis is folding, not length">
              <P>
                So sharpen the framing: the honest dividing line is not &ldquo;short versus
                long.&rdquo; It is &ldquo;foldingless and verifiable&rdquo; versus &ldquo;folding-,
                PTM-, and assembly-dependent and only bioassay-confirmable.&rdquo; Length is the
                proxy; verifiability is the real variable. The cleanest tell is{" "}
                <Link href="/hormones/insulin" className={LINK}>insulin</Link> — about fifty-one
                residues across two chains, small by any count, yet historically hard precisely
                because it needs three correct disulfide bonds and correct chain pairing, and is made
                recombinantly rather than by cheap synthesis. A &ldquo;small&rdquo; molecule that
                lives on the hard side because its function depends on folding.
              </P>
              <ComplexityLadder />
              <P>
                Run that lens down our own catalog and it splits the frontier into two honest halves.
                The complex-but-established proteins — insulin,{" "}
                <Link href="/hormones/growth-hormone" className={LINK}>growth hormone</Link>, the
                gonadotropins — are reliably available, but only because decades of clinical demand (a
                century, in insulin&rsquo;s case) built a competitive, accountable supply chain around
                them. That is the thesis&rsquo;s own mechanism working. The complex-and-unproven ones —{" "}
                <Link href="/hormones/follistatin" className={LINK}>follistatin</Link> and{" "}
                <Link href="/hormones/activin-a" className={LINK}>activin A</Link>, folded and
                disulfide-dependent proteins, and adiponectin, whose bioactivity depends on a
                high-molecular-weight multimer assembly that identity and purity testing cannot
                certify — are the genuine frontier: hard to make, hard to verify, and thin on the
                demand that would otherwise discipline their supply. The molecule may be exactly what
                it claims and still lack a proven, competitive, quality-accountable way to reach a
                bench.
              </P>
            </Section>

            <Section title="The myostatin frontier, made concrete">
              <P>
                This is exactly why the myostatin and activin inhibitors — the compounds where trust
                and availability finally start to mean something — sit categorically outside the
                commodity layer. They resolve into a clean taxonomy, and getting the mechanisms right
                is the point. <Em>Anti-myostatin monoclonal antibodies</Em>: trevogrumab (Regeneron, a
                fully human IgG4 that neutralizes mature GDF-8, in Phase 2 as a lean-mass-preserving
                add-on to GLP-1 agonists) and apitegromab (Scholar Rock, which binds the pro- and
                latent forms). <Em>Anti-activin and receptor-blocking antibodies</Em>: garetosmab
                (Regeneron, anti-activin-A, as of mid-2026 under FDA review for fibrodysplasia
                ossificans progressiva) and bimagrumab (a Lilly obesity asset that blocks the ActRII
                receptor itself — mechanistically distinct from the ligand-neutralizers, inhibiting
                myostatin and activin signaling at once). <Em>Fc-fusion ligand traps</Em>: sotatercept
                (Winrevair, Merck), the one fully approved, marketed member of the axis, cleared in
                2024 for pulmonary arterial hypertension. Every antibody here is a roughly 150 kDa,
                multi-chain, disulfide-linked, glycosylated recombinant protein — categorically
                outside synthesis and outside cheap self-verification.
              </P>
              <P>
                Two status notes prove the framing rather than complicate it. Apitegromab is
                Phase-3-positive and de-risked on biology, yet its 2025 FDA Complete Response Letter
                raised no safety or efficacy concern at all — it was solely a third-party fill-finish
                manufacturing observation. A fully validated antibody, gated by the accountability of
                its supply chain. And emugrobart (Chugai/Roche), a sophisticated latent-myostatin
                recycling antibody, was discontinued for SMA and FSHD in 2026 after showing target
                engagement but no functional benefit, even as its obesity program continued — the
                muscle indications, not the molecule, failed the bar. Even technically brilliant
                biologics can fall short of the proven-and-accountable mark in the indication where you
                actually want them. For why this axis matters at all, see{" "}
                <Link href="/insights/glp-1-muscle-preservation" className={LINK}>
                  GLP-1 and muscle preservation
                </Link>{" "}
                and the{" "}
                <Link href="/families/muscle-tgfb" className={LINK}>muscle &amp; TGF-β family</Link>.
              </P>
            </Section>

            <Section title="Reliability is a property of a market, not a molecule">
              <P>
                Step back and the mechanism is general. A compound does not arrive reliable.
                Reliability is what happens when enough researchers actually buy a molecule that its
                supply is forced to compete: multiple sources appear, price gets discovered, sellers
                accrue or lose reputation on reorders, and quality control becomes accountable because
                a real customer base would notice if it slipped. The fifteen peptides on{" "}
                <Link href="/available" className={LINK}>/available</Link> have spun that flywheel for
                years, helped enormously by the fact that they are both easy to make purely and easy
                to verify — demand and verifiability reinforcing each other.
              </P>
              <P>
                The frontier biologic is the opposite regime on both counts, and that yields two
                cleanly separable risks, both stated as market structure rather than danger. One is
                integrity: a folded biologic can be misfolded or misassembled in ways a
                synthetic-peptide certificate never had to certify, because misfolding is a failure
                mode that literally cannot exist for a fifteen-residue peptide. The other is unproven
                supply: a niche biologic can be exactly what it claims and still lack any competitive,
                price-disciplined, repeat-reputation supply, simply because too few labs buy it to turn
                the wheel. The second risk is about the market, not the molecule — and it is the
                honest, defensible core of the whole thing. This is the demand that the community
                itself once supplied, a story we told in{" "}
                <Link href="/insights/early-adopters-catalog" className={LINK}>
                  The community found it first
                </Link>
                : a real base of buying researchers is what turns a compound&rsquo;s supply into
                something accountable.
              </P>
            </Section>

            <Section title="Early is a position, not a verdict">
              <P>
                Which reframes the last idea worth carrying away. Trusting a thin-demand frontier
                biologic means accepting one of two positions, and neither is about intelligence. You
                may be <Em>early</Em> — standing ahead of the community of researchers whose collective
                purchasing and reordering would otherwise de-risk the compound. Or you may be reading
                the market with incomplete information about what is actually, competitively,
                verifiably obtainable right now. Both are informational positions, not intellectual
                failings, and the asymmetry is in the available information, not the person holding it.
              </P>
              <P>
                The commodity peptides are everywhere and easy to check, so trust there is nearly free
                and largely settled. Trust and availability only become live variables as you climb the
                complexity ladder into folded, expressed, assembled molecules — and at that altitude
                the question stops being &ldquo;is this real&rdquo; and becomes &ldquo;has a real,
                competitive, accountable supply chain formed around this yet.&rdquo; For the frontier
                compounds above, honestly, not yet — but &ldquo;not yet&rdquo; is not &ldquo;not
                ever&rdquo;: as demand builds, these can graduate into an accountable, catalogable
                supply the same way insulin and growth hormone did. That absence is not a warning
                label. It is the frontier, working exactly as a frontier does — and knowing precisely
                where it starts is the most useful thing a researcher can carry.
              </P>
            </Section>

            <Callout label="The real insight">
              Reliability isn&rsquo;t a property a molecule has; it&rsquo;s what a market does to a
              molecule it can both make and check. Short peptides clear both bars cheaply, so trust
              there is nearly free. Climb into folded biologics — where correctness lives in the fold
              and only a bioassay can confirm it — and both bars get expensive at once. That is where
              trust and availability finally start to mean something. <Em>Complexity, not fraud,</Em>{" "}
              is the axis.
            </Callout>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Follow the thread</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/insights/what-you-can-actually-get" label="Cataloged vs. reachable" />
                <CrossLink href="/available" label="What's verified in stock" />
                <CrossLink href="/insights/glp-1-muscle-preservation" label="Keeping the muscle on GLP-1" />
                <CrossLink href="/hormones/myostatin" label="Myostatin — the brake itself" />
              </ul>
            </div>

            {/* Selected sources — external, authoritative, for E-E-A-T */}
            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">Selected sources</h2>
              <p className="mt-3 text-sm leading-6 text-ink/55">
                The manufacturing, verification, and drug-status claims above, traced to primary and
                industry sources.
              </p>
              <ol className="mt-5 space-y-2.5 text-sm leading-6">
                {SOURCES.map((s, i) => (
                  <li key={s.url} className="flex gap-3 text-ink/75">
                    <span className="mt-0.5 shrink-0 font-mono text-xs text-ink/35">{i + 1}.</span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink transition-colors hover:text-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQ — mirrors the FAQPage schema for long-tail query capture */}
            <section>
              <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">Common questions</h2>
              <div className="mt-5 space-y-4">
                {FAQS.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                    <h3 className="font-display text-base font-semibold text-ink">{f.q}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational and strategic reference on peptide and protein manufacturing, verification,
              and supply. Regulatory status varies by jurisdiction; the compounds discussed range from
              approved drugs to investigational and discontinued research reagents, and are described
              as objects of study, not products to obtain. Not medical advice, and not an endorsement
              to obtain or use any compound.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

const SOURCES: { label: string; url: string }[] = [
  { label: "Bachem — Solid-Phase Peptide Synthesis: principles and practical limits", url: "https://www.bachem.com/knowledge-center/solid-phase-peptide-synthesis/" },
  { label: "Nature Communications — combined GDF-8 and activin A blockade with fully human IgG4 antibodies", url: "https://www.nature.com/articles/s41467-025-59485-9" },
  { label: "Scholar Rock — FDA issues Complete Response Letter for apitegromab (fill-finish only)", url: "https://investors.scholarrock.com/news-releases/news-release-details/fda-issues-complete-response-letter-crl-apitegromab-treatment" },
  { label: "Regeneron — garetosmab BLA accepted for FDA Priority Review (anti-activin A, FOP)", url: "https://investor.regeneron.com/news-releases/news-release-details/garetosmab-biologics-license-application-accepted-fda-priority" },
  { label: "Merck — FDA approves Winrevair (sotatercept), first-in-class activin-signaling inhibitor for PAH", url: "https://www.merck.com/news/fda-approves-mercks-winrevair-sotatercept-csrk-a-first-in-class-treatment-for-adults-with-pulmonary-arterial-hypertension-pah-who-group-1/" },
  { label: "FSHD Society — Roche discontinues GYM329 / emugrobart development (SMA, FSHD)", url: "https://www.fshdsociety.org/2026/03/19/roche-stops-gym329/" },
  { label: "PMC — controlling therapeutic antibody glycosylation in mAb manufacturing", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9310845/" },
];

/* ── The complexity ladder: complexity rises → verification gets harder and supply thins,
      crossing the ~50-aa SPPS ceiling where /available stops. ── */
function ComplexityLadder() {
  const W = 720;
  const H = 470;
  const waterY = 250;
  const teal = "var(--accent-teal)";
  const amber = "var(--accent-amber)";

  // rungs below (commodity, teal) and above (frontier, amber)
  const rungs = [
    { y: 425, color: teal, name: "TRH", note: "3 aa", glyph: "chain3" },
    { y: 360, color: teal, name: "BPC-157", note: "15 aa", glyph: "chain6" },
    { y: 300, color: teal, name: "Tesamorelin", note: "≈44 aa", glyph: "chain9" },
    { y: 200, color: amber, name: "Insulin", note: "51 aa · 3 disulfides, folded", glyph: "insulin" },
    { y: 135, color: amber, name: "Follistatin", note: "folded, glycosylated protein", glyph: "blob" },
    { y: 66, color: amber, name: "Myostatin antibody", note: "≈150 kDa · 4 chains", glyph: "antibody" },
  ];

  const gx = 150; // glyph centre x
  const lx = 210; // label start x

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
        aria-label="A complexity ladder: short synthetic peptides (TRH, BPC-157, tesamorelin) sit below a roughly fifty-residue solid-phase-synthesis ceiling where the availability layer stops; above it sit folded biologics (insulin, follistatin, a ~150 kDa antibody). As complexity rises, verification shifts from cheap HPLC and mass spectrometry to an expensive cell bioassay, and supply thins from a competitive market to little or none.">
        {/* complexity axis */}
        <text x="26" y="30" fill="var(--color-ink)" fillOpacity="0.4" fontSize="11" fontFamily="var(--font-geist-mono), monospace" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Molecular complexity ↑</text>

        {/* waterline */}
        <line x1="30" y1={waterY} x2={W - 30} y2={waterY} stroke="var(--color-ink)" strokeOpacity="0.28" strokeWidth="1.5" strokeDasharray="6 5" />
        <rect x="196" y={waterY - 15} width="328" height="30" rx="15" fill="var(--surface)" stroke="var(--color-ink)" strokeOpacity="0.18" />
        <text x="360" y={waterY} textAnchor="middle" dominantBaseline="central" fill="var(--color-ink)" fillOpacity="0.7" fontSize="12.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
          ≈ 50-aa SPPS ceiling — where /available stops
        </text>

        {/* side annotations */}
        <text x={W - 30} y="118" textAnchor="end" fill={amber} fontSize="11.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">verify: needs a cell bioassay</text>
        <text x={W - 30} y="134" textAnchor="end" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif">supply: thin, or none yet</text>
        <text x={W - 30} y="352" textAnchor="end" fill={teal} fontSize="11.5" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">verify: HPLC + MS, hours/lot</text>
        <text x={W - 30} y="368" textAnchor="end" fill="var(--color-ink)" fillOpacity="0.45" fontSize="11" fontFamily="var(--font-space-grotesk), sans-serif">supply: thick competitive market</text>

        {rungs.map((r) => (
          <g key={r.name}>
            <Glyph kind={r.glyph} cx={gx} cy={r.y} color={r.color} />
            <text x={lx} y={r.y - 3} fill="var(--color-ink)" fillOpacity="0.85" fontSize="14" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">{r.name}</text>
            <text x={lx} y={r.y + 14} fill="var(--color-ink)" fillOpacity="0.5" fontSize="11.5" fontFamily="var(--font-geist-mono), monospace">{r.note}</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Length is only a proxy. The real axis is <span className="text-ink/60">verifiability</span>:
        below the line, two instruments and a competitive market settle trust cheaply; above it,
        correctness lives in the fold and has to be imported from an accountable process.
      </figcaption>
    </figure>
  );
}

function Glyph({ kind, cx, cy, color }: { kind: string; cx: number; cy: number; color: string }) {
  const dot = (x: number, y: number, r = 3.2) => <circle cx={x} cy={y} r={r} fill={color} />;
  if (kind === "chain3" || kind === "chain6" || kind === "chain9") {
    const n = kind === "chain3" ? 3 : kind === "chain6" ? 6 : 9;
    const step = 9;
    const x0 = cx - ((n - 1) * step) / 2;
    return (
      <g>
        <line x1={x0} y1={cy} x2={x0 + (n - 1) * step} y2={cy} stroke={color} strokeOpacity="0.5" strokeWidth="1.6" />
        {Array.from({ length: n }, (_, i) => <circle key={i} cx={x0 + i * step} cy={cy} r="3" fill={color} />)}
      </g>
    );
  }
  if (kind === "insulin") {
    // two short chains with cross-bridges (disulfides)
    return (
      <g>
        <line x1={cx - 22} y1={cy - 6} x2={cx + 22} y2={cy - 6} stroke={color} strokeOpacity="0.55" strokeWidth="1.6" />
        <line x1={cx - 16} y1={cy + 7} x2={cx + 18} y2={cy + 7} stroke={color} strokeOpacity="0.55" strokeWidth="1.6" />
        {dot(cx - 22, cy - 6)}{dot(cx + 22, cy - 6)}{dot(cx - 16, cy + 7)}{dot(cx + 18, cy + 7)}
        <line x1={cx - 10} y1={cy - 6} x2={cx - 6} y2={cy + 7} stroke={color} strokeWidth="1.3" />
        <line x1={cx + 8} y1={cy - 6} x2={cx + 12} y2={cy + 7} stroke={color} strokeWidth="1.3" />
      </g>
    );
  }
  if (kind === "blob") {
    return <path d={`M ${cx - 20} ${cy} q 2 -14 14 -13 q 8 -8 16 0 q 12 -1 12 12 q 6 8 -2 14 q -2 12 -14 9 q -8 6 -16 -1 q -12 2 -12 -12 q -4 -8 2 -13 z`} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.4" />;
  }
  if (kind === "antibody") {
    // Y-shaped IgG
    return (
      <g stroke={color} strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d={`M ${cx} ${cy + 12} L ${cx} ${cy - 2}`} />
        <path d={`M ${cx} ${cy - 2} L ${cx - 14} ${cy - 16}`} />
        <path d={`M ${cx} ${cy - 2} L ${cx + 14} ${cy - 16}`} />
        <circle cx={cx - 14} cy={cy - 16} r="2.6" fill={color} stroke="none" />
        <circle cx={cx + 14} cy={cy - 16} r="2.6" fill={color} stroke="none" />
      </g>
    );
  }
  return null;
}
