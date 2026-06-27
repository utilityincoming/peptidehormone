import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import AnalogComparer from "@/components/tools/AnalogComparer";
import { JsonLd } from "@/components/JsonLd";
import { toolLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Analog comparison tool",
  description:
    "Compare peptide hormones and their engineered analogs side by side — type, evidence tier, receptor, molecular weight, and half-life on one log-scaled axis. See how an analog's half-life jumps from minutes to days versus its native hormone. Educational only.",
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const initialSlugs = ids ? ids.split(",").map((s) => s.trim()).filter(Boolean) : undefined;

  return (
    <>
      <JsonLd
        data={toolLd({
          path: "/tools/compare",
          name: "Analog comparison",
          description:
            "Compare peptide hormones and their engineered analogs side by side — type, evidence tier, receptor, molecular weight, and half-life on one log-scaled axis.",
        })}
      />
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-ink/45">
            <Link href="/tools" className="hover:text-ink">Tools</Link>
            <span aria-hidden>/</span>
            <span className="text-ink/70">Analog comparison</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Analog comparison
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/65">
            Put a native hormone next to the analogs engineered from it — or compare
            any molecules in the catalog. The same receptor, a different half-life:
            see how protease resistance and acylation stretch a peptide&rsquo;s
            duration from minutes to days while the underlying mechanism stays the
            same.
          </p>

          <div className="mt-10">
            <AnalogComparer initialSlugs={initialSlugs} />
          </div>

          <section className="mt-16 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold">How to read a lineage</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/70">
              <p>
                Most engineered peptides are not new mechanisms — they are durability
                solutions. An analog usually binds the{" "}
                <strong className="text-ink">same receptor</strong> as its native
                hormone; what changes is how long it survives in circulation. Native
                GLP-1 is cleared by DPP-4 in a minute or two, while its acylated
                analogs bind albumin and persist for days.
              </p>
              <p>
                Reading left to right along a lineage, watch three columns:{" "}
                <strong className="text-ink">receptor</strong> (often identical —
                the mechanism is conserved), <strong className="text-ink">molecular
                weight</strong> (analogs are deliberately larger, carrying fatty-acid
                chains), and <strong className="text-ink">half-life</strong> (the
                payoff — the engineering target).
              </p>
              <p>
                Want the dosing consequences of those half-lives? Each molecule links
                straight into the{" "}
                <Link href="/tools/half-life" className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
                  half-life &amp; dosing calculator
                </Link>
                .
              </p>
            </div>
            <p className="mt-6 rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              Reference-grade approximations for the native or representative form of
              each molecule. Engineered formulations (depots, extended-release) differ
              substantially. Educational only — not medical advice, dosing guidance,
              or a recommendation to use any substance.
            </p>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
