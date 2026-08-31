import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { LINK, Section, P, Em, Callout, Bullets, CrossLink } from "@/components/insight";
import { JsonLd } from "@/components/JsonLd";
import { insightLd } from "@/lib/jsonld";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

const insight = getInsight("the-touch-deficit")!;

export const metadata: Metadata = {
  // Editorial H1 lives in `insight.title`; the browser/SERP title carries the
  // descriptive, keyword-first phrasing per the site's headline convention.
  title: "Oxytocin for Couples Bonding: Delivery, Evidence & Why Sprays Fall Short — Reference Guide",
  description: insight.dek,
  alternates: { canonical: `/insights/${insight.slug}` },
  openGraph: {
    title: "Oxytocin for Couples Bonding: Delivery, Evidence & Why Sprays Fall Short · Peptide Hormone",
    description: insight.dek,
  },
};

// External primary sources — named inline so the evidence grade stays checkable.
const REF = {
  trust: "https://pubmed.ncbi.nlm.nih.gov/15931222/", // Kosfeld et al. 2005, Nature
  pairbond: "https://pubmed.ncbi.nlm.nih.gov/15452576/", // Young & Wang 2004, Nat Neurosci
  csf: "https://pubmed.ncbi.nlm.nih.gov/23574490/", // Kagerbauer et al. 2013, J Neuroendocrinol
  myths: "https://pubmed.ncbi.nlm.nih.gov/26049207/", // Leng & Ludwig 2016, Biol Psychiatry
  walum: "https://pubmed.ncbi.nlm.nih.gov/26210057/", // Walum et al. 2016, Biol Psychiatry
  envelope: "https://pubmed.ncbi.nlm.nih.gov/26368396/", // Lane et al. 2015, PLoS ONE
  advances: "https://www.nature.com/articles/s41380-020-00864-7", // Quintana et al. 2020 review, Mol Psychiatry
  sexdiff: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7235226/", // Lieberz et al. 2020, Neuropsychopharmacology
  hugs: "https://pubmed.ncbi.nlm.nih.gov/15740822/", // Light et al. 2005, Biol Psychol
  reconnect: "https://pubmed.ncbi.nlm.nih.gov/31599840/", // Kingsberg et al. 2019, RECONNECT trials
  vyleesiLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/210557s002lbl.pdf",
  firstApproval: "https://pubmed.ncbi.nlm.nih.gov/31429064/", // Bremelanotide: First Approval, Drugs 2019
  pt141men: "https://pubmed.ncbi.nlm.nih.gov/12851303/", // Wessells et al. 2003, Ann NY Acad Sci
  pt141women: "https://pubmed.ncbi.nlm.nih.gov/16839319/", // Diamond et al. 2006, Fertil Steril
  labeledcsf: "https://pubmed.ncbi.nlm.nih.gov/28289281/", // Lee et al. 2018, Mol Psychiatry (labeled IN reaches CSF/brain)
  breathpowered: "https://pubmed.ncbi.nlm.nih.gov/27107209/", // Quintana et al. 2016, Transl Psychiatry
  aerosol: "https://pubmed.ncbi.nlm.nih.gov/24845176/", // Modi et al. 2014, Psychoneuroendocrinology
  kinetics: "https://pubmed.ncbi.nlm.nih.gov/28629540/", // Spengler et al. 2017, Biol Psychiatry
  rage: "https://pubmed.ncbi.nlm.nih.gov/30820471/", // Yamamoto et al. 2019, Commun Biol
  bales: "https://pubmed.ncbi.nlm.nih.gov/23079235/", // Bales et al. 2013, Biol Psychiatry (chronic IN impairs partner preference)
} as const;

// FAQ — surfaced as FAQPage JSON-LD AND mirrored in a visible <dl> block.
const FAQS = [
  {
    q: "Does an oxytocin spray or injection improve bonding or intimacy in couples?",
    a: "There is no clinical evidence that it does. Injected oxytocin stays almost entirely in the bloodstream — a 1,007-Da peptide crosses the blood-brain barrier only in traces — and is degraded in about 1–6 minutes. Nasal sprays are the better route: labeled studies in primates show a small fraction reaches the cerebrospinal fluid and brain, and improved devices can produce measurable central effects. But no delivery strategy has shown bonding or intimacy benefit in a registered trial, and the behavioral studies behind the sprays have repeatedly failed to replicate. The bonding circuit is supplied most reliably by oxytocin released directly inside the brain, which only behavior provides.",
  },
  {
    q: "Are there strategies that make oxytocin delivery to the brain more efficient?",
    a: "Yes — and the field is pursuing them. Breath Powered low-dose nasal devices (8 IU, delivered on exhalation against closed nostrils) produced central amygdala effects with peripheral controls in place; aerosolized formulations raise CSF oxytocin more reliably than liquid sprays; and timing matters, because central effects peak hours after dosing and differ between women and men. The barrier also has inward transport — the RAGE transporter carries blood oxytocin into the brain and is required for maternal bonding in mice. All of this improves central reach, but none has yet produced trial evidence of better bonding or relationship outcomes, and chronic intranasal dosing impaired partner-preference formation in prairie voles — a caution against assuming more is better.",
  },
  {
    q: "What actually releases oxytocin in couples?",
    a: "Physical contact and interaction: hugs, warm partner contact, sex, and affectionate touch. In a well-known study, women reporting more frequent partner hugs had higher baseline oxytocin levels and lower blood pressure and heart rate. The hormone is released centrally during these behaviors — which is exactly the route no product can mimic.",
  },
  {
    q: "How long does oxytocin last in the bloodstream?",
    a: "Minutes. Plasma half-life is roughly 1–6 minutes, set by enzymatic breakdown (leucyl/cystinyl aminopeptidase) plus liver and kidney clearance. That brevity is fine for its peripheral jobs — uterine contraction, milk ejection — but it makes a blood-borne bolus a poor tool for any lasting effect, central or otherwise.",
  },
  {
    q: "Why is oxytocin called the 'love hormone' if the evidence is weak?",
    a: "Because its role in attachment is real — in mammals generally, and in the brain, where dendritically released oxytocin in the nucleus accumbens and amygdala helps form pair-bonds (work done largely in prairie voles). The overreach is in assuming a bottle or needle can reach that circuit. The legend describes a central release process; the products deliver a peripheral one.",
  },
  {
    q: "Is bremelanotide approved for men as well as women?",
    a: "Its approval (Vyleesi, FDA 2019) covers premenopausal women with acquired, generalized hypoactive sexual desire disorder, based on the phase-3 RECONNECT trials. Earlier PT-141 studies showed pro-erectile and desire effects in men, but bremelanotide is not approved for male sexual dysfunction. For men the approved peptide-adjacent options for erection remain the PDE5 inhibitors, which work through vasculature rather than brain.",
  },
  {
    q: "Can couples use oxytocin together with bremelanotide?",
    a: "No clinical trial has tested the combination. Mechanistically they address different halves of the intimacy circuit — bremelanotide stimulates melanocortin (MC4R) pathways tied to sexual desire and arousal, while oxytocin's bonding effects depend on central release that only behavior delivers. Anyone considering any peptide hormone therapy should do so under clinician supervision, not as a do-it-yourself stack.",
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
            style={{ background: "radial-gradient(55% 55% at 78% 0%, rgba(181,140,250,0.16), transparent 70%)" }}
          />
          <Container className="relative max-w-3xl py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/insights" className="hover:text-ink">Insights</Link>
              <span aria-hidden>/</span>
              <Link href="/families/neuropeptides" className="text-accent-purple hover:text-ink">
                Neuropeptides
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
            <Section title="The molecule the legend outran">
              <P>
                In 2005, a single study made{" "}
                <Link href="/hormones/oxytocin" className={LINK}>oxytocin</Link> famous.
                Volunteers who sniffed the peptide in a trust game put more money in the
                hands of strangers (
                <a href={REF.trust} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kosfeld et&nbsp;al., Nature, 2005
                </a>
                ). Within a decade the &ldquo;love hormone&rdquo; was everywhere —
                sprays for couples, add-ons for intimacy, a whole industry built on a
                nine-residue molecule. The marketing was effortless because the animal
                biology behind it is genuinely profound: oxytocin released in the brain
                is central to pair-bond formation in socially monogamous mammals (
                <a href={REF.pairbond} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Young &amp; Wang, Nature Neuroscience, 2004
                </a>
                ).
              </P>
              <P>
                The problem is the distance between those two facts. The animal work
                describes oxytocin <Em>released inside the brain</Em>, exactly where the
                bond is written. The products describe oxytocin{" "}
                <Em>delivered from outside</Em> — sprayed up the nose or injected under
                the skin — and asked to reach the same place. Twenty years of
                pharmacology says it mostly doesn&rsquo;t. What follows is the honest
                accounting of that gap, and of the two halves of an intimacy strategy —
                one that holds up under evidence, and one that doesn&rsquo;t.
              </P>
            </Section>

            <Section title="Two oxytocins: the one in the blood, the one in the brain">
              <P>
                Oxytocin is made in the hypothalamus — the paraventricular and
                supraoptic nuclei — but it reaches the rest of the body by two separate
                doors. The first is the posterior pituitary, which pours oxytocin into
                the bloodstream to do its famous peripheral jobs: uterine contraction in
                labor, milk ejection in lactation, and quieter effects on the heart and
                vasculature. The second is less famous and more important for everything
                called &ldquo;bonding&rdquo;: the very same hypothalamic neurons release
                oxytocin <Em>directly into the brain</Em>, from their dendrites, into
                regions like the nucleus accumbens and amygdala, where it tunes reward,
                social memory, and attachment.
              </P>
              <P>
                The two pools barely mix. A peptide of 1,007&nbsp;Da does not cross the
                blood-brain barrier in meaningful amounts, and the direct test confirms
                it: in neurosurgical patients, plasma oxytocin concentrations did not
                predict cerebrospinal fluid concentrations at all (
                <a href={REF.csf} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kagerbauer et&nbsp;al., 2013
                </a>
                ). Your blood oxytocin and your brain oxytocin are, in practical terms,
                separate systems — and only one of them writes bonds.
              </P>
              <TwoPoolsDiagram />
            </Section>

            <Section title="Why the injection misses">
              <P>
                This is the efficiency problem, stated plainly: an injected oxytocin
                bolus lands in the bloodstream, where it is chewed up by aminopeptidases
                and cleared by liver and kidney with a plasma half-life of roughly{" "}
                <Em>1–6 minutes</Em>. In those minutes it acts on peripheral oxytocin
                receptors — a real pharmacology, with measurable uterine and vascular
                effects — but the bonding circuit in the nucleus accumbens and amygdala
                sits on the other side of a barrier it effectively cannot cross. The
                delivery is efficient at reaching the blood. The blood is simply not
                where bonding happens.
              </P>
              <P>
                The nasal spray was supposed to be the loophole — a direct line up the
                olfactory and trigeminal nerves, around the barrier. And it is a better
                route than the needle: when macaques were given labeled oxytocin
                intranasally, the label appeared in the cerebrospinal fluid and in
                brain regions fed by those nerves while blood levels barely moved —
                direct proof of nose-to-brain transport (
                <a href={REF.labeledcsf} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lee et&nbsp;al., Molecular Psychiatry, 2018
                </a>
                ). The catch is efficiency: rodent pharmacokinetics put nasal
                bioavailability at roughly <Em>2%</Em>, and only a tiny fraction of an
                applied dose reaches the brain. Leading physiologists still caution
                that the &ldquo;wish to believe&rdquo; in spray effects must be guarded
                against with scepticism and rigor (
                <a href={REF.myths} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Leng &amp; Ludwig, Biological Psychiatry, 2016
                </a>
                ). The field now broadly accepts that some sprayed oxytocin reaches
                central tissue — the unresolved question is whether that trickle
                reliably changes bonding behavior, and the replication record so far
                says it does not.
              </P>
              <Callout label="The engineering read">
                Judged as a drug-delivery problem, injected oxytocin scores poorly by
                design: wrong compartment (blood, not brain), wrong duration (minutes),
                and only traces across the barrier. The nasal route improves the
                compartment but not the dose — and neither route has produced a
                registered trial showing couples-bonding benefit.
              </Callout>
            </Section>

            <Section title="The studies that built the legend — and the ones that couldn't repeat them">
              <P>
                The behavioral evidence has its own problems, independent of delivery.
                The original trust finding did not survive contact with replication: a
                direct re-test using the envelope task found no effect of intranasal
                oxytocin on trust (
                <a href={REF.envelope} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lane et&nbsp;al., PLoS ONE, 2015
                </a>
                ). A statistical autopsy of the whole literature concluded that
                intranasal-oxytocin studies are generally underpowered and that there is
                a high probability most published findings do not represent true effects
                (
                <a href={REF.walum} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Walum et&nbsp;al., Biological Psychiatry, 2016
                </a>
                ). A later review found the field cleaning up its act — larger samples,
                pre-registration, more published null results — while confirming the
                early headline effects on trust and &ldquo;mind reading&rdquo; failed to
                replicate (
                <a href={REF.advances} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Quintana et&nbsp;al., Molecular Psychiatry, 2020
                </a>
                ).
              </P>
              <P>
                There is one more complication for the &ldquo;couples dose&rdquo; idea:
                the response is not the same in both partners. The kinetics of
                oxytocin&rsquo;s effects on the amygdala and striatum differ between
                women and men — the same dose peaks at different times and may bend
                neural reactivity in different directions (
                <a href={REF.sexdiff} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Lieberz et&nbsp;al., Neuropsychopharmacology, 2020
                </a>
                ). Even if a spray worked, a shared-dose protocol for two people is
                assuming away one of the field&rsquo;s few consistent findings.
              </P>
            </Section>

            <Section title="Can better delivery fix it?">
              <P>
                This is the fair question — if the route is the failure, the route is
                the fix — and the field is genuinely working on it. The clearest win so
                far is delivery hardware. The Breath Powered device pushes a low dose
                (8&nbsp;IU) deep into the upper nasal cavity on exhalation; in an fMRI
                trial that controlled for peripheral effects, it dampened amygdala
                reactivity without raising blood oxytocin — evidence of a genuinely
                central action at a dose a standard spray never delivers centrally (
                <a href={REF.breathpowered} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Quintana et&nbsp;al., Translational Psychiatry, 2016
                </a>
                ). Aerosolized formulations, in turn, raise CSF oxytocin more reliably
                than liquid drops in macaques (
                <a href={REF.aerosol} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Modi et&nbsp;al., 2014
                </a>
                ).
              </P>
              <P>
                Timing matters as much as hardware. Oxytocin&rsquo;s central effects
                are dose-dependent and slow to peak — amygdala modulation runs on a
                multi-hour time course rather than the minutes of the plasma peak, and
                the optimal window differs between women and men (
                <a href={REF.kinetics} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Spengler et&nbsp;al., Biological Psychiatry, 2017
                </a>
                ). And the barrier is not a perfect wall: a vascular transporter called
                RAGE carries blood oxytocin into the brain, and in mice it is required
                for maternal bonding behavior itself (
                <a href={REF.rage} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Yamamoto et&nbsp;al., Communications Biology, 2019
                </a>
                ) — exactly the kind of route a future engineered analog could exploit.
              </P>
              <P>
                So the honest verdict is not flat failure: delivery is improvable, and
                a well-controlled spray can move the amygdala. But look at what that
                evidence actually is — neural reactivity to emotional faces, in
                single-dose lab sessions. The step from &ldquo;the amygdala
                responds&rdquo; to &ldquo;couples feel more bonded&rdquo; is precisely
                the step that keeps failing replication, and no registered trial has
                shown any delivery strategy improving relationship outcomes. The animal
                record even carries a warning: <Em>chronic</Em> intranasal oxytocin
                impaired, rather than helped, partner-preference formation in male
                prairie voles (
                <a href={REF.bales} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Bales et&nbsp;al., Biological Psychiatry, 2013
                </a>
                ). Efficiency can be bought; reliability, so far, cannot.
              </P>
            </Section>

            <Section title="The release that actually works: touch">
              <P>
                Here is the twist that makes the whole story useful. The oxytocin system
                of couples is not silent — it is just not druggable from the outside.
                It is <Em>behaviorally drivable</Em>. Physical contact is the most
                reliable oxytocin releaser human physiology knows: sex, warm partner
                contact, and above all the humble hug. In a frequently cited study,
                premenopausal women who reported more frequent partner hugs had higher
                baseline oxytocin levels and lower blood pressure and heart rate, with
                oxytocin mediating part of the blood-pressure difference (
                <a href={REF.hugs} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Light et&nbsp;al., Biological Psychology, 2005
                </a>
                ).
              </P>
              <P>
                Read that carefully: the measurable, replicable cardiovascular benefit
                attributed to oxytocin in couples came from the body&rsquo;s{" "}
                <Em>own</Em> release, triggered by behavior — not from a product. That
                inverts the commercial premise. The bottle is trying to supply what the
                behavior already provides, and doing it worse, because only the
                behavioral route releases the peptide where bonding happens: inside the
                brain.
              </P>
              <Callout label="The reframe">
                For couples, the evidence-based oxytocin intervention is not a compound
                at all — it is the contact itself: sustained hugs, skin-to-skin closeness,
                affectionate touch, sex. The hormone is the mechanism; the behavior is
                the dose. Nothing you can buy replicates the route.
              </Callout>
            </Section>

            <Section title="The half with clinical evidence: bremelanotide">
              <P>
                Intimacy has two halves, and they sit in different receptor systems.
                Oxytocin is the attachment half. The drive half — desire and arousal —
                runs substantially through the{" "}
                <Link href="/families/melanocortins" className={LINK}>melanocortin system</Link>,
                and it has something oxytocin lacks: an approved drug with phase-3
                evidence.{" "}
                <Link href="/hormones/pt-141" className={LINK}>Bremelanotide</Link>{" "}
                (PT-141, brand name Vyleesi) is a cyclic heptapeptide agonist of
                melanocortin receptors — principally MC4R, in the potency order MC1R &gt;
                MC4R &gt; MC3R &gt; MC5R &gt; MC2R per the FDA label — acting{" "}
                <Em>centrally</Em> on desire pathways rather than on vasculature, which
                is what separates it from the PDE5 inhibitors (
                <a href={REF.vyleesiLabel} target="_blank" rel="noopener noreferrer" className={LINK}>
                  FDA label
                </a>
                ).
              </P>
              <P>
                The pivotal evidence is solid where oxytocin&rsquo;s is not. In the two
                identical phase-3 RECONNECT trials in premenopausal women with
                hypoactive sexual desire disorder (HSDD), as-needed subcutaneous
                bremelanotide produced statistically significant increases in sexual
                desire and reductions in desire-related distress versus placebo (
                <a href={REF.reconnect} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Kingsberg et&nbsp;al., 2019
                </a>
                ;{" "}
                <a href={REF.firstApproval} target="_blank" rel="noopener noreferrer" className={LINK}>
                  approval review, Drugs, 2019
                </a>
                ). The trade-off is tolerability — nausea, flushing, and headache were
                common — and a modest effect size, honestly reported. But this is the
                rare case in intimacy pharmacology where the endpoint moved in
                well-powered, registered trials.
              </P>
              <P>
                For men, the record is earlier and thinner: the original PT-141 studies
                showed rapid, dose-dependent erectile responses in healthy men and in
                men with erectile dysfunction — a central mechanism, since PDE5
                non-responders were among those who responded (
                <a href={REF.pt141men} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Wessells et&nbsp;al., 2003
                </a>
                ) — and a parallel study showed a subjective arousal effect in women
                with arousal disorder (
                <a href={REF.pt141women} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Diamond et&nbsp;al., 2006
                </a>
                ). But bremelanotide&rsquo;s approval is specifically for premenopausal
                women with HSDD; the male indication was never developed. For a couple,
                that asymmetry matters: the partner for whom the drug is approved and
                studied is the woman, while for the man the same molecule remains
                interesting-but-unapproved.
              </P>
            </Section>

            <Section title="A couples strategy, honestly stated">
              <P>
                Put the two halves together and a sensible strategy for couples emerges —
                one that uses the evidence rather than the legend. The drive half has a
                clinically validated lever; the bonding half has a behavioral one. Each
                works through the mechanism it claims:
              </P>
              <Bullets
                items={[
                  ["Behavior first, because it is the real oxytocin route", "Sustained touch — hugs measured in tens of seconds, skin-to-skin closeness, sex — releases oxytocin centrally, where bonding happens. This is the only intervention with a plausible mechanism and actual human data (the Light hug study), and it costs nothing."],
                  ["Where desire is the bottleneck, that is the druggable half", "Bremelanotide is the approved, phase-3-backed option for premenopausal women with distressing low desire, acting centrally through MC4R. It addresses drive and arousal — the precondition under which bonding behaviors happen at all."],
                  ["Skip the bonding sprays and injections sold for couples", "Injected oxytocin lasts minutes and reaches the bonding circuit only in traces. Better nasal devices genuinely improve central delivery — but none has shown bonding or relationship benefit in a trial, and the behavioral studies that launched the category keep failing replication. Marketing-grade bonding sprays buy unproven pharmacology, not closeness."],
                  ["Expect sex differences, in both directions", "Oxytocin's central effects differ between women and men in timing and direction; bremelanotide's evidence base exists in women, not men. A shared protocol should not assume two identical pharmacologies — because they aren't."],
                  ["A prescription conversation, not a stack", "Anyone considering peptide hormones for intimacy belongs under clinician supervision. The reasonable question for a couple is not 'which peptides do we add?' but 'is the limiting factor drive, stress, health, or the relationship itself?' — a question a clinician can actually help answer."],
                ]}
              />
              <P>
                That is the whole picture, minus the legend. Oxytocin is real, its
                bonding role is real, and its release is controllable — by behavior, not
                by bottle. Delivery science is genuinely advancing — smarter devices,
                tuned timing, transporters like RAGE that a future analog might ride —
                but none of it has produced bonding evidence yet. The only peptide
                hormone in this space with phase-3 clinical evidence sits in the
                melanocortin system, works on desire, and is approved for the woman in
                the room. Couples get the honest version of the science: touch for the
                bond, and if desire is the missing piece, medicine that has actually
                been tested.
              </P>
            </Section>

            {/* Cross-links */}
            <div className="rounded-2xl border border-ink/10 bg-panel/40 p-6">
              <h3 className="font-display text-base font-semibold">Keep going</h3>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <CrossLink href="/hormones/oxytocin" label="Oxytocin reference (the monograph)" />
                <CrossLink href="/hormones/pt-141" label="Bremelanotide reference (MC4R, Vyleesi)" />
                <CrossLink href="/insights/getting-the-molecule-in" label="The delivery problem — why peptides need the needle" />
                <CrossLink href="/families/neuropeptides" label="The neuropeptide family" />
                <CrossLink href="/families/melanocortins" label="The melanocortin family (drive half of the circuit)" />
                <CrossLink href="/research?q=What%20evidence%20supports%20behavioral%20oxytocin%20release%20(touch%2C%20hugs)%20for%20couples%2C%20and%20how%20does%20bremelanotide%20compare%20for%20desire%3F" label="Ask the research agent for current evidence" />
              </ul>
            </div>

            <p className="rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Educational reference on mechanism, summarized from public scientific
              literature and clinical-trial disclosures and simplified in places. Not
              medical advice, dosing guidance, or a recommendation to use any compound.
              Specific compounds and trials are named to explain the science; verify any
              claim against the linked primary sources.
            </p>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Two release routes, two jobs: peripheral blood vs. central bonding ── */
function TwoPoolsDiagram() {
  const W = 560;
  const H = 372;
  const boxW = 230;
  const leftX = 20;
  const rightX = W - leftX - boxW;
  const topY = 12;
  const midY = 118;
  const botY = 244;

  const Box = ({ x, y, w, label, sub, stroke, fill }: { x: number; y: number; w: number; label: string; sub: string; stroke: string; fill?: string }) => (
    <g>
      <rect x={x} y={y} width={w} height={82} rx={14} fill={fill ?? "var(--panel)"} stroke={stroke} strokeOpacity={0.4} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + 32} textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600" fontFamily="var(--font-space-grotesk), sans-serif">
        {label}
      </text>
      <text x={x + w / 2} y={y + 56} textAnchor="middle" fill="var(--color-ink)" fillOpacity="0.5" fontSize="11.5">
        {sub}
      </text>
    </g>
  );

  return (
    <figure className="my-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-lg" role="img" aria-label="Oxytocin is made in the hypothalamus but released by two separate routes: from the posterior pituitary into the bloodstream for peripheral jobs like uterine contraction, and directly into the brain's bonding circuit; injected oxytocin enters the blood pool and cannot meaningfully cross the blood-brain barrier to reach the bonding circuit">
        {/* connectors from top box to the two routes */}
        <line x1={W / 2 - 60} y1={topY + 82} x2={leftX + boxW / 2} y2={midY - 4} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
        <line x1={W / 2 + 60} y1={topY + 82} x2={rightX + boxW / 2} y2={midY - 4} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
        {/* connectors down to targets */}
        <line x1={leftX + boxW / 2} y1={midY + 82} x2={leftX + boxW / 2} y2={botY - 4} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />
        <line x1={rightX + boxW / 2} y1={midY + 82} x2={rightX + boxW / 2} y2={botY - 4} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="2" />

        {/* the blocked bridge: injection in blood tries to reach the brain pool */}
        <path d={`M ${leftX + boxW} ${botY + 30} C ${W / 2} ${botY - 40}, ${W / 2} ${midY + 40}, ${rightX} ${midY + 52}`} fill="none" stroke="var(--accent-rose)" strokeOpacity="0.55" strokeWidth="1.8" strokeDasharray="5 5" />
        <text x={W / 2} y={botY - 6} textAnchor="middle" fill="var(--accent-rose)" fontSize="11.5" fontWeight="600">
          injected oxytocin: only traces cross →
        </text>
        <g transform={`translate(${W / 2 - 10}, ${midY + 22})`}>
          <line x1={0} y1={0} x2={20} y2={20} stroke="var(--accent-rose)" strokeWidth="3" />
          <line x1={20} y1={0} x2={0} y2={20} stroke="var(--accent-rose)" strokeWidth="3" />
        </g>

        <Box x={W / 2 - boxW / 2} y={topY} w={boxW} label="Hypothalamus (PVN / SON)" sub="all oxytocin is made here" stroke="var(--accent-purple)" fill="color-mix(in srgb, var(--accent-purple) 12%, transparent)" />
        <Box x={leftX} y={midY} w={boxW} label="Posterior pituitary → blood" sub="plasma half-life ~1–6 min" stroke="var(--accent-blue)" />
        <Box x={rightX} y={midY} w={boxW} label="Direct release into the brain" sub="dendritic release, no blood step" stroke="var(--accent-teal)" fill="color-mix(in srgb, var(--accent-teal) 12%, transparent)" />
        <Box x={leftX} y={botY} w={boxW} label="Uterus, breast, vasculature" sub="labor, milk ejection, tone" stroke="var(--color-ink)" />
        <Box x={rightX} y={botY} w={boxW} label="Nucleus accumbens, amygdala" sub="the bonding circuit" stroke="var(--accent-teal)" fill="color-mix(in srgb, var(--accent-teal) 12%, transparent)" />
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink/40">
        Two release routes from one source. Injected oxytocin enters the left column and
        stays there — the bonding circuit is supplied by the right one.
      </figcaption>
    </figure>
  );
}
