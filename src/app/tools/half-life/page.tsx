import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import HalfLifeCalculator, { type CompoundPreset } from "@/components/tools/HalfLifeCalculator";
import { JsonLd } from "@/components/JsonLd";
import { toolLd } from "@/lib/jsonld";
import { HORMONES, halfLifeForLink } from "@/lib/hormones";

export const metadata: Metadata = {
  title: "Peptide half-life & dosing calculator",
  description:
    "Model how long a peptide stays bioactive, and how dose frequency vs half-life builds to steady state — accumulation, peak-to-trough swing, time to steady state, and a concentration-over-time chart. Educational only.",
};

export default async function HalfLifePage({
  searchParams,
}: {
  searchParams: Promise<{ t12?: string; unit?: string }>;
}) {
  const { t12, unit } = await searchParams;
  const initialHalfLife =
    t12 && Number.isFinite(parseFloat(t12)) && parseFloat(t12) > 0 ? t12 : undefined;
  const initialUnit = unit === "min" || unit === "h" || unit === "d" ? unit : undefined;

  // Catalog-driven presets: every compound with a representative half-life,
  // grouped native → analog → research so the picker mirrors the catalog.
  const GROUP_LABEL: Record<string, string> = {
    endogenous: "Native hormones",
    analog: "Engineered analogs",
    research: "Research peptides",
  };
  const GROUP_ORDER = ["endogenous", "analog", "research"];
  const compounds: CompoundPreset[] = HORMONES.filter((h) => h.halfLifeMin != null)
    .slice()
    .sort((a, b) => {
      const ga = GROUP_ORDER.indexOf(a.type ?? "endogenous");
      const gb = GROUP_ORDER.indexOf(b.type ?? "endogenous");
      if (ga !== gb) return ga - gb;
      return a.name.localeCompare(b.name);
    })
    .map((h) => {
      const { value, unit: u } = halfLifeForLink(h.halfLifeMin!);
      return {
        slug: h.slug,
        label: h.abbr ? `${h.name} (${h.abbr})` : h.name,
        value: String(value),
        unit: u,
        group: GROUP_LABEL[h.type ?? "endogenous"] ?? "Other",
      };
    });
  return (
    <>
      <JsonLd
        data={toolLd({
          path: "/tools/half-life",
          name: "Half-life & dosing calculator",
          description:
            "Model how long a peptide stays bioactive and how dose frequency versus half-life builds to steady state — accumulation, peak-to-trough swing, and a concentration-over-time chart.",
        })}
      />
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-ink/45">
            <Link href="/tools" className="hover:text-ink">Tools</Link>
            <span aria-hidden>/</span>
            <span className="text-ink/70">Half-life &amp; dosing</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Half-life &amp; dosing calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/65">
            How long a peptide stays bioactive is governed by its half-life — and
            how repeated doses build up depends on how the dosing interval compares
            to that half-life. Enter a half-life and an interval to see how long a
            single dose persists, how much repeated dosing accumulates, and how the
            concentration rises and falls over a schedule.
          </p>

          <div className="mt-10">
            <HalfLifeCalculator
              initialHalfLife={initialHalfLife}
              initialUnit={initialUnit}
              compounds={compounds}
            />
          </div>

          <section className="mt-16 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold">The pharmacokinetics</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/70">
              <p>
                <strong className="text-ink">Half-life (t½)</strong> is the time for
                the amount in the body to fall by half. After one half-life 50%
                remains, after two 25%, and after about five half-lives roughly 97%
                is gone — the common rule of thumb for when a single dose is
                effectively cleared.
              </p>
              <p>
                <strong className="text-ink">Accumulation</strong> happens when the
                next dose arrives before the last is gone. The ratio of the dosing
                interval to the half-life sets everything: dose often relative to
                the half-life and levels climb to a high, stable plateau with little
                swing; dose rarely, so each dose largely clears before the next, and
                levels barely accumulate but fluctuate widely.
              </p>
              <p>
                <strong className="text-ink">Steady state</strong> — where input
                balances elimination — is reached after roughly four to five
                half-lives regardless of how often you dose. Dosing more frequently
                raises the plateau; it does not arrive sooner.
              </p>
              <p>
                Not sure of a compound&rsquo;s half-life? Ask the{" "}
                <Link href="/research" className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
                  research agent
                </Link>
                , which can surface values and trials from the literature.
              </p>
            </div>
            <p className="mt-6 rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              A simplified one-compartment model for understanding pharmacokinetic
              behavior. Real compounds have absorption phases, multi-compartment
              distribution, and nonlinear clearance this does not capture. Educational
              only — not medical advice, dosing guidance, or a recommendation to use
              any substance.
            </p>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
