import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { toolLd } from "@/lib/jsonld";
import CyclePlanner, { type PlannerInit } from "@/components/tools/CyclePlanner";
import {
  GOALS,
  PEPTIDES,
  LEVELS,
  WEEKS_DEFAULT,
  WEEKS_MIN,
  WEEKS_MAX,
  MAX_PEPTIDES,
  type Level,
} from "@/lib/cycle-planner";

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

const DESCRIPTION =
  "Plan a peptide research cycle — quick-add goal stacks, an animated week-by-week timeline, reference dosing, and a vial-and-cost estimate. Shareable via URL. Research-use only, not medical advice.";

export const metadata: Metadata = {
  title: "Peptide cycle planner",
  description: DESCRIPTION,
  alternates: { canonical: "/tools/cycle-planner" },
  openGraph: {
    title: "Peptide cycle planner",
    description: DESCRIPTION,
    url: "/tools/cycle-planner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide cycle planner",
    description: DESCRIPTION,
  },
};

// Seed planner state from the query string (g,w,l,p) so a shared link renders
// the right plan server-side — crawlable, no client round-trip to populate.
function seedFromParams(sp: Record<string, string | string[] | undefined>): PlannerInit {
  const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const g = str(sp.g);
  const goal = g && (g === "custom" || GOALS.some((x) => x.id === g)) ? g : "injury";

  const wRaw = parseInt(str(sp.w) ?? "", 10);
  const weeks = Number.isFinite(wRaw) ? Math.min(WEEKS_MAX, Math.max(WEEKS_MIN, wRaw)) : WEEKS_DEFAULT;

  const l = str(sp.l);
  const level: Level = (LEVELS as readonly string[]).includes(l ?? "") ? (l as Level) : "beginner";

  const pRaw = str(sp.p);
  let active: string[];
  if (pRaw != null) {
    active = pRaw.split(",").map((s) => s.trim()).filter((id) => PEPTIDES[id]);
  } else if (goal !== "custom") {
    active = GOALS.find((x) => x.id === goal)?.stack ?? [];
  } else {
    active = [];
  }
  active = Array.from(new Set(active)).slice(0, MAX_PEPTIDES);

  return { goal, weeks, level, active };
}

export default async function CyclePlannerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const init = seedFromParams(await searchParams);

  return (
    <div className={plexMono.variable}>
      <JsonLd
        data={toolLd({
          path: "/tools/cycle-planner",
          name: "Peptide cycle planner",
          description:
            "Plan a peptide research cycle — goal stacks, a week-by-week timeline, reference dosing, and a supply-and-cost estimate. Educational, not medical advice.",
        })}
      />
      <a
        href="#planner"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-panel focus:px-4 focus:py-2 focus:text-sm focus:text-ink focus:ring-2 focus:ring-[var(--accent-amber)]"
      >
        Skip to planner
      </a>
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-ink/45">
            <Link href="/tools" className="hover:text-ink">Tools</Link>
            <span aria-hidden>/</span>
            <span className="text-ink/70">Cycle planner</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Peptide cycle planner
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/65">
            Sketch a research cycle from a goal stack or build your own: pick a length and
            experience level, see the week-by-week schedule, reference dosing, and a rough
            supply-and-cost estimate. Every plan is encoded in the URL, so it&rsquo;s shareable.
            Educational only — most listed compounds are research-use, not approved for human use.
          </p>

          <div id="planner" className="mt-10 scroll-mt-20">
            <CyclePlanner init={init} />
          </div>

          <section className="mt-16 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold">How to read this</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/70">
              <p>
                A <strong className="text-ink">goal stack</strong> is a starting point, not a
                prescription — a common grouping of compounds studied for a given aim. Adjust the
                length and level, add or remove peptides, and the timeline, dosing table, and supply
                estimate update together.
              </p>
              <p>
                The <strong className="text-ink">experience level</strong> only moves doses within
                each compound&rsquo;s published reference range — beginner sits at the low end,
                advanced at the high end. It is a presentation choice, not an endorsement of higher
                doses.
              </p>
              <p>
                Curious about the biology behind a compound? Several link to their{" "}
                <Link href="/catalog" className="text-[var(--accent-amber)] underline decoration-[var(--accent-amber)]/40 underline-offset-2 hover:decoration-[var(--accent-amber)]">
                  catalog monographs
                </Link>
                , and you can model any half-life in the{" "}
                <Link href="/tools/half-life" className="text-[var(--accent-amber)] underline decoration-[var(--accent-amber)]/40 underline-offset-2 hover:decoration-[var(--accent-amber)]">
                  dosing calculator
                </Link>
                .
              </p>
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}
