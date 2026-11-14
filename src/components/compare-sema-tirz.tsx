import Link from "next/link";
import type { ReactNode } from "react";
import { Section, P, Em, Callout, LINK } from "@/components/insight";
import { SEMA_TIRZ_COMPARISON, SEMA_TIRZ_SOURCES } from "@/lib/compare-editorials";

function Source({ id, children }: { id: keyof typeof SEMA_TIRZ_SOURCES; children: ReactNode }) {
  return (
    <a href={SEMA_TIRZ_SOURCES[id].url} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
    </a>
  );
}

export function SemaTirzComparison() {
  return (
    <div className="mt-12 max-w-3xl space-y-12">
      <div>
        <p className="text-xs leading-6 text-ink/50">
          Evidence synthesis:{" "}
          <time dateTime={SEMA_TIRZ_COMPARISON.updated}>2026-11-14</time> · Editorial,
          not a clinical guideline or dosing advice.
        </p>
        <nav aria-label="On this comparison" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a className={LINK} href="#same-brake">The same brake</a>
          <a className={LINK} href="#bowel">The bowel experience</a>
          <a className={LINK} href="#fades">Why it fades</a>
          <a className={LINK} href="#gip">What GIP may add</a>
          <a className={LINK} href="#next">The next molecules</a>
          <a className={LINK} href="#sources">Sources</a>
        </nav>
      </div>

      <Callout label="Bottom line">
        On weight, tirzepatide beat semaglutide head-to-head. On the gut, the two are
        close cousins: both work partly by <Em>slowing the stomach</Em>, which is why
        the early nausea and the changed bowel habits feel so similar. The slowing
        fades over weeks while the appetite effect stays — and that gap is exactly what
        the next generation of molecules is trying to widen.
      </Callout>

      <div id="same-brake" className="scroll-mt-24">
        <Section title="Two drugs, one brake on the gut">
          <P>
            It is easy to read{" "}
            <Link href="/hormones/semaglutide" className={LINK}>semaglutide</Link> and{" "}
            <Link href="/hormones/tirzepatide" className={LINK}>tirzepatide</Link> as a
            one-receptor drug versus a two-receptor drug, and on weight that framing has
            a clear answer: in the open-label{" "}
            <Source id="surmount5">SURMOUNT-5 trial</Source>, tirzepatide produced a mean
            weight reduction of 20.2% at 72 weeks against 13.7% for semaglutide. But the
            effect a person notices in week one is not on the scale. It is in the
            stomach, and there the two drugs are far more alike.
          </P>
          <P>
            Both slow <Em>gastric emptying</Em> — the rate at which the stomach releases
            its contents into the intestine. Semaglutide delays it most sharply in the
            first hour after a meal (
            <Source id="semaGe">Hjerpsted et&nbsp;al., 2018</Source>; oral semaglutide
            cut first-hour emptying by about a third in{" "}
            <Source id="oralSemaGe">Dahl et&nbsp;al., 2021</Source>). Tirzepatide, for
            all its extra receptor, delays emptying to a degree{" "}
            <Em>comparable</Em> to a selective GLP-1 drug (
            <Source id="tirzGe">Urva et&nbsp;al., 2020</Source>). The GIP receptor is
            doing other work; the brake on the stomach is largely the GLP-1 arm in both
            molecules.
          </P>
          <P>
            That brake is not a side effect that happens to come along. It is part of
            how the drugs work: a stomach that empties slowly keeps you full for longer
            and flattens the glucose spike after eating. The trouble is that the same
            slowed gut is what you feel as nausea, fullness and bloating.
          </P>
        </Section>
      </div>

      <div id="bowel" className="scroll-mt-24">
        <Section title="The bowel experience">
          <P>
            Because the drugs slow motility along the whole upper gut rather than the
            stomach alone, the lived experience is a package. Food sits longer. A normal
            portion now arrives against a stomach that is already full, so the first
            mouthfuls satisfy and the last ones turn you off — useful for eating less,
            unpleasant when it tips into nausea. Transit through the small bowel slows
            too, which tends toward <Em>constipation and bloating</Em>, though some
            people get diarrhea instead, and vomiting is common in the opening weeks (
            <Source id="clinical">Jalleh et&nbsp;al., 2024</Source>).
          </P>
          <P>
            Most of this is mild to moderate and settles, but the slowing has
            consequences worth naming plainly. A stomach that empties slowly can still
            hold food after an overnight fast, which matters before procedures: retained
            gastric contents are seen more often in people on these drugs at the time of
            endoscopy or anesthesia (
            <Source id="clinical">Jalleh et&nbsp;al., 2024</Source>). It is the reason
            anesthesia and endoscopy teams now ask whether a patient is taking one.
          </P>
          <Callout label="The honest comparison">
            There is no clean winner on tolerability. Tirzepatide slows the stomach much
            like a GLP-1 drug, so the fullness mechanism is shared. For both, the
            gastrointestinal effects cluster during <Em>dose escalation</Em> and ease
            afterwards — which is the clue to why they happen at all.
          </Callout>
        </Section>
      </div>

      <div id="fades" className="scroll-mt-24">
        <Section title="Why the gut adapts and the appetite doesn't">
          <P>
            Here is the fact that reorganizes the whole picture: the gastric slowing{" "}
            <Em>fades</Em>. The delay in emptying measured after a single dose undergoes
            tachyphylaxis — the gut adapts to it. In tirzepatide&rsquo;s own emptying
            study, the acute delay seen in mice was essentially gone after two weeks of
            continued treatment, and in people the effect diminished with repeated doses
            (
            <Source id="tirzGe">Urva et&nbsp;al., 2020</Source>). The same waning was
            seen with liraglutide, where a clear delay at five weeks had attenuated by
            sixteen (
            <Source id="liraTachy">Halawi et&nbsp;al., 2017</Source>).
          </P>
          <P>
            The appetite suppression does not fade on the same schedule. So the two
            effects come apart over time: the gut-slowing that drives the nausea is
            largely an <Em>early</Em> phenomenon, while the central brake on hunger — the
            part doing the durable work — persists. That single dissociation explains
            the standard advice. Slow dose escalation is not timidity; it is giving the
            stomach time to adapt to each step before the dose rises again, so the
            nausea never gets far ahead of the tolerance.
          </P>
        </Section>
      </div>

      <div id="gip" className="scroll-mt-24">
        <Section title="What the GIP receptor may add">
          <P>
            If tirzepatide slows the stomach about as much as semaglutide, does its
            second receptor help the gut at all? There is a mechanistic reason it might.
            In animal models, activating the <Em>GIP receptor</Em> blunted the nausea
            and vomiting caused by GLP-1 receptor agonism (
            <Source id="giNausea">Borner et&nbsp;al., 2021</Source>), acting in the
            hindbrain areas that process both appetite and the signal to vomit. On that
            logic, a molecule that hits GIP alongside GLP-1 could carry more anti-obesity
            punch for a given amount of nausea.
          </P>
          <P>
            The honest caveat is that this is a preclinical argument, and it has not been
            cleanly shown to translate into fewer symptoms for people in a way that
            separates it from dose and titration. It belongs in the same ledger as the
            rest of tirzepatide&rsquo;s{" "}
            <Link href="/insights/not-two-drugs-in-one" className={LINK}>
              imbalanced, biased pharmacology
            </Link>
            : a real and interesting mechanism whose clinical size is still being
            measured. But it is the first concrete hint that the gut side of these drugs
            is a <Em>tunable</Em> parameter, not a fixed tax on the weight loss.
          </P>
        </Section>
      </div>

      <div id="next" className="scroll-mt-24">
        <Section title="Where the next molecules are headed">
          <P>
            Tie the threads together and a design brief appears. The useful part of the
            gut effect — early fullness, blunted glucose — overlaps with the unpleasant
            part, but they are not the same thing, and the gastric brake fades while the
            appetite brake lasts. The goal of the next generation is to widen that gap:
            keep the durable appetite effect, shrink the early gut punishment.
          </P>
          <P>
            Three levers are already visible. The first is simply <Em>titration</Em>,
            now taken seriously as part of the drug rather than an afterthought. The
            second is the GIP receptor&rsquo;s apparent anti-nausea contribution. The
            third is biased signaling — building molecules that favor the pathways tied
            to benefit over those tied to nausea, the logic behind tirzepatide&rsquo;s
            reshaped GLP-1 activity.
          </P>
          <P>
            <Link href="/hormones/retatrutide" className={LINK}>Retatrutide</Link>, the
            triple agonist that adds the glucagon receptor, is the current far edge of
            this. It is worth being precise about it, because it is often called a
            &ldquo;GLP-3,&rdquo; which is not a real thing — there is no GLP-3 receptor.
            It is a three-receptor agonist (GIP, GLP-1 and glucagon), the next step in
            the one-, two-, three-receptor sequence, and its story is told in{" "}
            <Link href="/insights/the-triple-agonist" className={LINK}>
              the triple agonist explained
            </Link>
            . On the gut, retatrutide is not yet the gentle drug the design brief is
            reaching for: gastrointestinal events were still its most common adverse
            effects in both its{" "}
            <Source id="reta2">phase 2</Source> and{" "}
            <Source id="reta3">phase 3</Source> trials, dose-related and partly mitigated
            by starting at a low dose — the same escalation story, at a higher ceiling of
            efficacy.
          </P>
          <P>
            Whether adding glucagon, or tuning the signaling further, can genuinely
            <Em> decouple</Em> strong weight loss from a slowed gut is the open question
            the field is now testing. The honest reading of semaglutide versus
            tirzepatide is that they are two points on that same curve, closer on the gut
            than on the scale — and the interesting molecules are the ones trying to bend
            the curve, not just climb it. That distinction between a mechanism and a
            proven, better-tolerated outcome is the recurring caution of{" "}
            <Link href="/insights/mechanism-is-not-proof" className={LINK}>
              mechanism is not proof
            </Link>
            .
          </P>
        </Section>
      </div>

      <div id="sources" className="scroll-mt-24">
        <Section title="Sources">
          <ul className="space-y-3 text-sm leading-6 text-ink/60">
            {(Object.keys(SEMA_TIRZ_SOURCES) as (keyof typeof SEMA_TIRZ_SOURCES)[]).map((id) => (
              <li key={id}>
                <a href={SEMA_TIRZ_SOURCES[id].url} target="_blank" rel="noopener noreferrer" className={LINK}>
                  {SEMA_TIRZ_SOURCES[id].title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-5 text-ink/40">
            Educational synthesis of public scientific literature and clinical-trial
            disclosures, simplified in places. Not individualized medical advice or a
            prescription, and not a statement that any product is safe or effective for
            you. Gastrointestinal effects, dosing and escalation are individual and
            belong with a prescriber. Verify any claim against the linked primary
            sources.
          </p>
        </Section>
      </div>
    </div>
  );
}
