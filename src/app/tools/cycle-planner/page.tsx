import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { toolLd } from "@/lib/jsonld";
import CyclePlanner, { type PlannerInit } from "@/components/tools/CyclePlanner";
import { SourcingNote } from "@/components/Sourcing";
import {
  GOALS,
  PEPTIDES,
  LEVELS,
  WEEKS_DEFAULT,
  WEEKS_MIN,
  WEEKS_MAX,
  MAX_PEPTIDES,
  decodePlan,
  type Level,
} from "@/lib/cycle-planner";

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

const DESCRIPTION =
  "The peptide lists sellers group by goal, read as clocks: which names share a receptor, which half-lives are actually measured, and which morning or bedtime labels are convention. Reference ranges and a supply estimate. Research-use only, not medical advice.";

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
  const gValid = g && (g === "custom" || GOALS.some((x) => x.id === g)) ? g : null;

  const wRaw = parseInt(str(sp.w) ?? "", 10);
  const weeks = Number.isFinite(wRaw) ? Math.min(WEEKS_MAX, Math.max(WEEKS_MIN, wRaw)) : WEEKS_DEFAULT;

  const l = str(sp.l);
  const level: Level = (LEVELS as readonly string[]).includes(l ?? "") ? (l as Level) : "beginner";

  // An explicit peptide list (p) is a hand-edited stack: it claims no named goal
  // unless the link also carried a valid g, so a ?p=-only link doesn't light up
  // the default goal pill. Without p, seed the chosen goal's stack (default injury).
  const pRaw = str(sp.p);
  let goal: string;
  let active: string[];
  if (pRaw != null) {
    active = pRaw.split(",").map((s) => s.trim()).filter((id) => PEPTIDES[id]);
    goal = gValid ?? "custom";
  } else {
    goal = gValid ?? "injury";
    active = goal === "custom" ? [] : GOALS.find((x) => x.id === goal)?.stack ?? [];
  }
  active = Array.from(new Set(active)).slice(0, MAX_PEPTIDES);

  return { goal, weeks, level, active };
}

export default async function CyclePlannerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const init = seedFromParams(sp);
  const compareInit = decodePlan(Array.isArray(sp.c) ? sp.c[0] : sp.c);

  return (
    <div className={plexMono.variable}>
      <JsonLd
        data={toolLd({
          path: "/tools/cycle-planner",
          name: "Peptide cycle planner",
          description:
            "Seller goal lists read as pharmacokinetics: shared receptors, measured half-lives, and timing labels that are convention. Educational, not medical advice.",
        })}
      />
      <a
        href="#planner"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-panel focus:px-4 focus:py-2 focus:text-sm focus:text-ink focus:ring-2 focus:ring-[var(--accent-amber)]"
      >
        Skip to planner
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Container className="py-12 md:py-16">
          <nav className="cp-no-print flex items-center gap-2 text-sm text-ink/45">
            <Link href="/tools" className="hover:text-ink">Tools</Link>
            <span aria-hidden>/</span>
            <span className="text-ink/70">Cycle planner</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Peptide cycle planner
          </h1>
          <p className="cp-no-print mt-4 max-w-2xl text-lg leading-8 text-ink/65">
            These are the lists a catalog groups by the job you want. Open one and read the
            clock under it: two names on one receptor are one signal, a weekly drug is still
            present on day six, and a morning label with no published human half-life is
            convention. Length, reference range, and a supply estimate update together.
            The URL holds the list. Educational only — most of these compounds are
            research-use, not approved for human use.
          </p>

          <div id="planner" className="mt-10 scroll-mt-20">
            <CyclePlanner init={init} compareInit={compareInit} />
          </div>

          <section className="cp-no-print mt-16 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold">How to read this</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/70">
              <p>
                A <strong className="text-ink">goal list</strong> is how a seller page is
                organized, not a finding that the names belong together. The line under each
                button says what the pharmacokinetics actually are: a shared receptor, mismatched
                half-lives, or a clock nobody has measured. The{" "}
                <Link href="/insights/the-clock-under-the-list" className="text-[var(--accent-amber)] underline decoration-[var(--accent-amber)]/40 underline-offset-2 hover:decoration-[var(--accent-amber)]">
                  essay on reading a list by its clock
                </Link>{" "}
                is the argument; this page is the same test with the names filled in.
              </p>
              <p>
                Cells marked <strong className="text-ink">timing</strong> are the hours catalogs
                repeat — morning, pre-sleep, post-workout. They are not a measured time to peak.
                Where a human half-life exists you can put it in the{" "}
                <Link href="/tools/half-life" className="text-[var(--accent-amber)] underline decoration-[var(--accent-amber)]/40 underline-offset-2 hover:decoration-[var(--accent-amber)]">
                  half-life calculator
                </Link>{" "}
                and see whether the interval makes a pulse or a plateau. Where it does not, the
                word on the calendar cannot invent one.
              </p>
              <p>
                The <strong className="text-ink">experience level</strong> only slides a number
                inside the reference span printed for that compound. It does not promote a dose,
                and it does not make two compounds on the same receptor into two effects.
                Monographs, where we have them, sit on the{" "}
                <Link href="/catalog" className="text-[var(--accent-amber)] underline decoration-[var(--accent-amber)]/40 underline-offset-2 hover:decoration-[var(--accent-amber)]">
                  catalog
                </Link>
                .
              </p>
            </div>
          </section>

          <div className="cp-no-print mt-12 max-w-2xl">
            <SourcingNote />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}
