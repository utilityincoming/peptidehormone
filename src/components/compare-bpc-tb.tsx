import Link from "next/link";
import type { ReactNode } from "react";
import { Section, P, Em, Callout, LINK, CrossLink } from "@/components/insight";
import { BPC_TB_COMPARISON, BPC_TB_SOURCES } from "@/lib/compare-editorials";

function Source({ id, children }: { id: keyof typeof BPC_TB_SOURCES; children: ReactNode }) {
  return <a href={BPC_TB_SOURCES[id].url} className={LINK}>{children}</a>;
}

export function BpcTbComparison() {
  return (
    <div className="mt-12 max-w-3xl space-y-12">
      <div>
        <p className="text-xs leading-6 text-ink/50">
          Evidence update: <time dateTime={BPC_TB_COMPARISON.updated}>2026-09-20</time> · Editorial synthesis, not a clinical guideline.
        </p>
        <nav aria-label="On this comparison" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a className={LINK} href="#identity">Identity</a>
          <a className={LINK} href="#human-evidence">Human evidence</a>
          <a className={LINK} href="#stacking">Stacking</a>
          <a className={LINK} href="#safety">Safety</a>
          <a className={LINK} href="#sources">Sources</a>
        </nav>
      </div>

      <Callout label="Bottom line">
        <Em>More research is not the same as a proven treatment.</Em> BPC-157 has the larger direct repair literature, but that does not make it a demonstrated winner. For TB-500, even the identity of the molecule in a claim must be checked before asking whether the claim is true.
      </Callout>

      <div id="identity" className="scroll-mt-24">
        <Section title="The identity problem">
          <P>
            <Link href="/hormones/bpc-157" className={LINK}>BPC-157</Link> is a synthetic 15-amino-acid peptide. It is not an established endogenous peptide hormone merely because its origin story refers to gastric proteins. Its molecular targets and mechanism remain poorly defined in <Source id="fdaBpc">FDA’s 2026 assessment</Source>.
          </P>
          <P>
            <Link href="/hormones/thymosin-beta-4" className={LINK}>Thymosin β4</Link> is a 43-amino-acid endogenous peptide involved in actin biology. <Link href="/hormones/tb-500" className={LINK}>TB-500</Link>, as described in <Source id="fdaTb">FDA’s 2026 evaluation</Source>, is the N-acetylated seven-amino-acid fragment <Em>Ac-LKKTETQ</Em>, corresponding to residues 17–23. FDA also found different salts, derivatives, and active moieties sold under the same common name. “TB-500” on a label is therefore not enough to establish chemical identity.
          </P>
          <P>
            There are three separate evidence buckets: full-length thymosin β4, the unacetylated fragment LKKTETQ, and the acetylated fragment called TB-500. They must not be pooled. FDA notes that acetylation can alter peptide properties and that it is uncertain whether actin binding explains the fragment’s reported activities. <Em>Sharing a sequence does not establish identical pharmacology, exposure, or clinical effects.</Em> Trials of the parent peptide cannot simply be credited to the fragment.
          </P>
        </Section>
      </div>

      <Section title="Mechanisms: plausible repair biology, not a clinical ranking">
        <P>
          BPC-157 research reports effects on growth-factor signaling, blood-vessel formation, nitric-oxide pathways, and cell migration in experimental systems. A <Source id="review">2025 orthopaedic systematic review</Source> found favorable structural, functional, or biomechanical outcomes in several animal injury models. That is a rationale for trials, not evidence that a person’s torn tendon will heal faster.
        </P>
        <P>
          TB-500’s story is usually borrowed from thymosin β4 and shorter-fragment experiments involving cell movement and wound closure. The transfer is not automatic: <Source id="fdaTb">FDA’s evaluation</Source> identified a cell-culture scratch-wound experiment in which the tested TB-500 did not induce wound healing, and distinguished it from positive mouse experiments using the unacetylated fragment. One negative assay does not prove universal ineffectiveness; the positive neighboring studies do not prove the marketed fragment works either.
        </P>
        <P>
          The familiar split — “BPC-157 works locally; TB-500 works systemically” — is not an established human comparative finding in these sources. Neither a proposed pathway nor an injection location establishes clinical tissue selectivity. There is also no basis here for ranking the pair as “tendons versus muscles.”
        </P>
      </Section>

      <Section title="The 2026 rat comparison: promising, but not a human winner">
        <P>
          A <Source id="rat">2026 Achilles-tendon study</Source> directly compared BPC-157, a commercial product labeled TB-500, their combination, and control in 32 rats after tendon transection and repair. Only four tendons per group underwent biomechanical testing. TB-500 reached statistical significance versus control for maximum load to failure; BPC-157 did not. Crucially, the paper reported no other significant biomechanical pairwise comparisons.
        </P>
        <P>
          <Em>“Significant versus control” in one group and “not significant” in another does not establish a significant difference between the two treatments.</Em> Histology also favored some treated groups, but the combination did not demonstrate added benefit. This is useful exploratory animal evidence, not a human trial or proof that TB-500 is superior. The methods name a commercial supplier but do not report the TB-500 sequence or analytical identity confirmation, so this result cannot securely be assigned to Ac-LKKTETQ.
        </P>
      </Section>

      <div id="human-evidence" className="scroll-mt-24">
        <Section title="What the human studies actually show">
          <P>
            The evidence badge above describes the predominantly preclinical repair evidence; it does <Em>not</Em> mean that no human BPC-157 reports exist. Study design and outcome matter more than the badge.
          </P>
          <div className="space-y-5">
            <div className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
              <h3 className="font-display text-lg font-semibold">BPC-157: a small knee-pain signal, not proof of tissue repair</h3>
              <P>
                In <Source id="knee">Lee and Padgett’s 2021 retrospective report</Source>, 16 of 17 patients were reached by telephone. Twelve had received BPC-157 alone; four had received BPC-157 plus a product described as TB4. Eleven of the twelve in the BPC-157-only group and three of the four in the combination group reported significant pain improvement.
              </P>
              <P>
                There was no randomized assignment, placebo group, or standardized functional outcome instrument. Diagnoses and follow-up varied. Pain relief was not imaging-confirmed tendon or cartilage regeneration. Natural recovery, other care, expectations, and selection bias cannot be separated from a drug effect. The different response proportions do not establish that either regimen is better.
              </P>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
              <h3 className="font-display text-lg font-semibold">BPC-157: two infusion participants cannot establish safety</h3>
              <P>
                A <Source id="pilot">2025 pilot</Source> followed two adults across a short infusion and laboratory-assessment schedule. Both had previously received intravenous BPC-157. No side effects or measured biomarker changes were reported. That is a limited observation in previously exposed participants, not evidence that repeated use is safe, and not an injury-healing trial.
              </P>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
              <h3 className="font-display text-lg font-semibold">TB-500: keep exact-molecule evidence separate</h3>
              <P>
                In its <Source id="fdaTb">2026 compounding evaluation</Source>, FDA reported finding no clinical studies or human exposure data for the defined TB-500 substances. This is a dated finding from that review, not a claim that a trial could never be registered later. It also is not a finding about every formulation of full-length thymosin β4.
              </P>
            </div>
          </div>
          <P>
            A useful check on scope: the <Source id="review">2025 orthopaedic review</Source> included 35 preclinical studies and one clinical study, but its search ended on June 3, 2024. Its “no clinical safety data” statement must not be repeated as though it included the later infusion pilot. Conversely, adding that tiny pilot does not resolve the safety gap.
          </P>
          <P>
            Nor is “BPC-157 has never had a randomized human study” accurate. <Source id="fdaBpc">FDA reviewed a 2005 meeting abstract</Source> describing a 53-participant placebo-controlled enema study in ulcerative colitis. The reported between-group confidence interval crossed zero, and FDA judged the sparse reporting inadequate to support effectiveness. A different disease, formulation, and route cannot establish tendon repair or injectable recovery benefits. The problem is not a literal absence of any human research; it is the absence of convincing, applicable evidence for the advertised use.
          </P>
        </Section>
      </div>

      <Section title="New trial registrations are not new efficacy results">
        <P>
          ClinicalTrials.gov now lists a BPC-157 <Source id="hamstring">hamstring-strain study, NCT07437547</Source>, and a planned <Source id="shoulder">rotator-cuff-repair study, NCT07803250</Source>. Neither had posted results when checked on September 20, 2026. These are sponsor-submitted plans, not demonstrated recovery benefits or independent confirmation of recruitment. Some record fields are inconsistent, so detailed design and enrollment claims need confirmation before being treated as settled facts.
        </P>
        <P>
          A particularly important caveat concerns <Source id="tbRegistry">TB-500 record NCT07487363</Source>: although its status field says recruiting, its own API summary calls it a “fictional study” and an example record. It also concerns cardiovascular biomarkers, not injury repair, and has no posted results. We do not count it as verified evidence of an active clinical trial. A registry identifier is a place to inspect evidence, not a substitute for that inspection.
        </P>
      </Section>

      <div id="stacking" className="scroll-mt-24">
        <Section title="Does stacking them improve recovery?">
          <P>
            The “Wolverine stack” is a marketing nickname, not a validated combination therapy. Different proposed mechanisms do not demonstrate synergy. A useful trial would compare each chemically defined peptide alone, the combination, and an appropriate control, with the same rehabilitation plan and prespecified healing and functional outcomes.
          </P>
          <P>
            The <Source id="knee">four-person combination subgroup</Source> in the knee report cannot answer that question. There was no TB4-only group, no randomization, and no basis for assuming the reported TB4 product was the defined Ac-LKKTETQ fragment. It supplies neither a reliable estimate of added benefit nor a combination safety profile. More ingredients also make it harder to identify which exposure caused an adverse reaction.
          </P>
        </Section>
      </div>

      <div id="safety" className="scroll-mt-24">
        <Section title="Safety, product quality, and unknowns">
          <P>
            <Source id="fdaSafety">FDA flags</Source> potential immune reactions and peptide-related impurities for BPC-157 and the thymosin β4 fragment, with inadequate information to determine human safety. Its detailed 2026 reviews add concerns about identity, characterization, and aggregation. These are not a quantified side-effect rate, but they directly contradict a blanket “no known risks” reassurance.
          </P>
          <P>
            There are two different uncertainties: <Em>what a correctly manufactured molecule might do</Em>, and <Em>what an actual product contains and how it was made</Em>. A research-use label or a purity percentage does not establish clinical suitability, sterility, endotoxin control, or the safety of repeated administration. FDA’s quality review of BPC-157 nomination materials specifically identified missing testing information for some of these attributes.
          </P>
          <P>
            Cancer claims need the same restraint. Angiogenesis findings are not proof that either peptide causes cancer in humans. They are also not proof of cancer safety. FDA identified no carcinogenicity studies for the evaluated BPC-157 or TB-500 substances; long-term risk cannot be settled by a short animal experiment, a two-person pilot, or testimonials. See the <Source id="fdaBpc">BPC-157</Source> and <Source id="fdaTb">TB-500</Source> assessments for the actual gaps.
          </P>
          <Callout label="What this means for a recovery decision">
            This evidence does not support replacing diagnosis, rehabilitation, or established treatment with either peptide. Persistent or worsening pain needs an assessment of the injury, not a choice between two unvalidated recovery claims. Neither compound has a dependable comparative safety advantage established here.
          </Callout>
        </Section>
      </div>

      <Section title="Half-life, dosing claims, and route of administration">
        <P>
          Human pharmacokinetics are too poorly characterized for a defensible half-life ranking. The often-quoted short BPC-157 half-life comes from animal work discussed in the <Source id="review">orthopaedic review</Source>; it should not be relabeled as a validated human value. A detection window is not an elimination half-life, and a parent peptide’s kinetics are not automatically those of its fragment.
        </P>
        <P>
          Oral, subcutaneous, intravenous, and intra-articular administration also are not interchangeable evidence categories. A small study using one route does not validate another route or establish systemic availability. The <Source id="fdaBpc">FDA BPC-157 review</Source> describes substantial route-specific data gaps. There is no established injury-recovery dose, cycle, or stacking ratio to derive from the evidence summarized here; this page therefore does not turn experimental exposures into a treatment schedule.
        </P>
      </Section>

      <Section title="FDA status and competitive sport">
        <P>
          Neither compound is an FDA-approved injury-recovery treatment. The July 2026 FDA documents are advisory-committee briefing evaluations about bulk substances for compounding, <Em>not drug approvals or final rulemaking</Em>. A nomination, committee discussion, or change in a compounding category does not demonstrate efficacy, approve a marketed product, or settle every legal question about supply.
        </P>
        <P>
          Under the <Source id="wada">2026 WADA Prohibited List</Source>, BPC-157 is listed under S0 (non-approved substances); thymosin β4 and its derivatives, including TB-500, are listed under S2.3. Both are prohibited at all times, in and out of competition. Athletes should check applicable rules with their anti-doping organization rather than treating clinic availability as permission.
        </P>
      </Section>

      <Section title="What would change the comparison?">
        <P>
          The useful next evidence is not another recovery testimonial. It is replicated human research using a characterized molecule and controlled manufacturing, a defined injury, randomized comparators, prespecified pain and function measures, objective repair outcomes where appropriate, and enough follow-up to assess harm. A combination needs its own evidence. Until then, the honest conclusion is asymmetric research depth, not a clinical winner.
        </P>
      </Section>

      <div id="sources" className="scroll-mt-24">
        <Section title="Sources and scope">
          <P>
            This is an editorial synthesis of the linked primary reports, systematic review, regulator assessments, and sport rules, checked on September 20, 2026. It is not an exhaustive systematic review or a claim of independent medical review. Negative evidence statements are limited to the sources and uses described. FDA briefing conclusions are attributed to their evaluation date; regulatory status can change.
          </P>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-6 text-ink/70">
            {Object.entries(BPC_TB_SOURCES).map(([id, source]) => (
              <li key={id}><a className={LINK} href={source.url}>{source.title}</a></li>
            ))}
          </ol>
        </Section>
      </div>

      <Section title="Read the underlying biology">
        <ul className="space-y-3 text-sm leading-6">
          <CrossLink href="/hormones/bpc-157" label="BPC-157 — mechanism, evidence tier, and monograph" />
          <CrossLink href="/hormones/tb-500" label="TB-500 — fragment identity and evidence limits" />
          <CrossLink href="/hormones/thymosin-beta-4" label="Thymosin β4 — the full-length endogenous peptide" />
          <CrossLink href="/families/repair" label="Repair & regenerative — the wider research family" />
          <CrossLink href="/methodology" label="Methodology — how to read evidence tiers" />
        </ul>
      </Section>
      <p className="border-t border-ink/10 pt-6 text-xs leading-6 text-ink/45">
        Educational reference only — not medical or dosing advice. Nothing here recommends self-administration of investigational or unapproved peptides. Clinical decisions belong with a qualified healthcare professional.
      </p>
    </div>
  );
}
