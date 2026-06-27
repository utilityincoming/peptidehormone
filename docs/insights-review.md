# Insights — pre-publication review checklist

Purpose: give a subject-matter reviewer a fast, complete path to verifying and
revising the Insights articles (and the structured catalog data) before a July
2026 go-live. Every item below is a concrete claim, figure, date, or attribution
to confirm or correct. Check the box when verified; strike and annotate when a
correction is needed.

All four articles carry `reviewed: "July 2026"` and the standard educational
disclaimer ("not medical advice… verify any claim against primary sources").

**Highest-risk items are marked ⚠ — verify these first.** They are the claims most
likely to be challenged or to need softening.

---

## 1. From insulin to GLP-1 — a short history of peptide medicine
File: `src/app/insights/from-insulin-to-glp-1/page.tsx`

Dates & attributions:
- [ ] 1921 — pancreatic extract isolated in Toronto (Banting, Best, Macleod, Collip)
- [ ] Jan 1922 — Leonard Thompson, age 14, first patient treated
- [ ] 1923 — Nobel Prize (awarded to Banting & Macleod)
- [ ] ⚠ "Sanger, 1955, a second Nobel" — insulin **sequence** completed 1955, but Sanger's Nobel was **1958**. Reword so the date isn't read as the Nobel year.
- [ ] 1982 — recombinant insulin as the first recombinant-DNA medicine
- [ ] 1953 — du Vigneaud synthesized oxytocin ("first peptide hormone made in a lab"); his Nobel was Chemistry 1955 (not stated, but confirm the "first synthesized" claim)
- [ ] "1969–73" — Guillemin & Schally isolating TRH / GnRH / somatostatin; 1977 Nobel
- [ ] hMG (urinary gonadotropins) "late 1950s and 1960s"; hCG used to trigger final egg maturation
- [ ] 1978 — Louise Brown, first IVF birth; 2010 Nobel (Edwards)
- [ ] mid-1990s — recombinant FSH replaced urinary preparations
- [ ] "by the 1980s" — GLP-1 identified as proglucagon-derived incretin
- [ ] "early 1990s" — exendin-4 characterized from Gila monster venom (John Eng)
- [ ] 2005 — exenatide, first GLP-1 receptor agonist approved
- [ ] 2022 — tirzepatide, first GIP/GLP-1 "twincretin"

Mechanistic / framing claims:
- [ ] Native GLP-1 half-life "one to two minutes"; DPP-4 degradation
- [ ] Leuprolide flare-then-suppression; uses in IVF, endometriosis, prostate cancer
- [ ] Cetrorelix as a GnRH antagonist (immediate suppression, no flare)
- [ ] Liraglutide "~a day", semaglutide "~a week" half-life framing
- [ ] Retatrutide (triple agonist) described as "in trials" — confirm still accurate at publish time

---

## 2. The growth-hormone axis — why the body doses itself in pulses
File: `src/app/insights/growth-hormone-axis/page.tsx`

Mechanism:
- [ ] GHRH (+), ghrelin/GHS-R (+), somatostatin (−) control of pulsatile GH
- [ ] GH pulses "largest during deep sleep"
- [ ] IGF-1 as principal mediator of GH growth effects AND a negative-feedback signal
- [ ] IGF-1's long half-life attributed to IGF-binding-protein carriage (not size)

Duration ladder figure (representative native half-lives — confirm each):
- [ ] Somatostatin (14 aa) ~1–3 min
- [ ] GH (191 aa) ~10–20 min
- [ ] GHRH (44 aa) ~minutes–tens of min
- [ ] Ghrelin (28 aa) ~30 min
- [ ] IGF-1 (bound) ~12–16 h
- [ ] Caption states bars are illustrative / "~100-fold" minute-to-hour gap — confirm acceptable

Pattern-encoding parallels:
- [ ] Intermittent PTH anabolic vs continuous PTH catabolic
- [ ] Pulsatile GnRH stimulates vs continuous GnRH-agonist suppresses

⚠ Editorial framing (the requested "restraint / less is more" lean):
- [ ] ⚠ "Releasing the axis vs. overriding it" section — confirm the contrast between
      secretagogues (stay under feedback) and exogenous rHGH (bypasses feedback) is fair.
- [ ] ⚠ Harms of sustained/supraphysiologic GH listed as "insulin resistance, fluid
      retention, soft-tissue and skeletal overgrowth" — confirm wording.
- [ ] ⚠ The closing claim — that physiology-respecting (low, pulsatile, feedback-
      regulated) signaling is "more sustainable than excess" — is framed explicitly as
      "a statement about how the axis is wired, not a dosing recommendation." Confirm the
      lean lands where you want and stays on the educational side of the line. **This is
      the one paragraph most worth a deliberate editorial decision before publishing.**

---

## 3. The melanocortin system — one peptide family, five receptors
File: `src/app/insights/melanocortin-system/page.tsx`

- [ ] POMC cleaved (by prohormone convertases) into ACTH, α/β/γ-MSH, β-endorphin; tissue-specific
- [ ] All five receptors are GPCRs signaling mainly via Gαs/cAMP
- [ ] Receptor map (the figure):
  - [ ] MC1R — melanocytes; eumelanin/pigmentation; immune signaling
  - [ ] MC2R — adrenal cortex; cortisol; **ACTH-only; requires MRAP**
  - [ ] MC3R — hypothalamus/periphery; energy homeostasis; roles less mapped
  - [ ] MC4R — hypothalamus; appetite & body weight
  - [ ] MC5R — exocrine glands; sebum
- [ ] HPA framing: CRH → ACTH → cortisol
- [ ] α-MSH (agonist) vs AgRP (antagonist/inverse agonist) at MC4R
- [ ] Leptin stimulates POMC neurons, restrains AgRP neurons
- [ ] ⚠ "MC4R loss-of-function is the most common single-gene cause of severe obesity" — confirm phrasing
- [ ] Setmelanotide approved for POMC deficiency, LEPR deficiency, Bardet–Biedl syndrome
- [ ] Bremelanotide as a melanocortin agonist for sexual function
- [ ] ⚠ Tanning-peptide caution (MC1R agonists "largely unregulated, uncertain purity") — confirm tone is defensible

---

## 4. How GLP-1 actually works (pre-existing — re-confirm in this pass)
File: `src/app/insights/glp-1-signaling/page.tsx`

- [ ] GLP-1R class B GPCR → Gαs → adenylyl cyclase → cAMP → PKA + Epac2
- [ ] Amplifies the glucose-triggered K_ATP → depolarization → Ca²⁺ → exocytosis step
- [ ] DPP-4 cleaves at the His7–Ala8 bond
- [ ] Glucose-dependence as the hypoglycemia-safety crux

---

## 5. Catalog structured-field backfill (verify the numbers I added)
File: `src/lib/hormones.ts` (commit "Backfill structured fields across all 55 monographs")

Evidence/type tags:
- [ ] 25 foundational endogenous hormones tagged `type: "endogenous"`, `evidence: "Established"` — confirm "Established" is the right tier for each (vs. an unused "Clinical" tier)

Molecular weights added (⚠ = marked approximate / most worth checking):
- [ ] Retatrutide 4731.4
- [ ] ⚠ Adiponectin 30000 (monomer; circulates as multimers)
- [ ] ⚠ PTHrP 16000 (isoform-dependent)
- [ ] ⚠ Myostatin 25000 (mature dimer)
- [ ] ⚠ Activin A 26000 (mature dimer)
- [ ] ⚠ Follistatin 35000 (isoform/glycosylation-dependent)
- [ ] ⚠ TB-500 4963.4 (set equal to thymosin β4 on the assumption marketed TB-500 is the full sequence — confirm or split out the active fragment)
- [ ] MOTS-c 2174.6
- [ ] Humanin 2687.1

Half-life strings added (13 entries): confirm the honest descriptive strings
(e.g. TB-500 "not characterized in humans", myostatin "long-lived in the latent
serum complex…") are acceptable, and that no fabricated numbers slipped in.

---

## Sign-off
- [ ] All ⚠ items resolved
- [ ] Dates standardized (all four insights read "July 2026")
- [ ] `npm run build` and `npm run lint` pass after any edits
- [ ] Disclaimers intact on all four articles
