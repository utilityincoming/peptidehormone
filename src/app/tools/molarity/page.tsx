import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import MolarityCalculator from "@/components/tools/MolarityCalculator";

export const metadata: Metadata = {
  title: "Peptide molarity calculator",
  description:
    "Convert peptide mass, molecular weight, and solvent volume into molar concentration (mM, µM, nM) for assay preparation. Free, in-browser, educational only.",
};

export default async function MolarityPage({
  searchParams,
}: {
  searchParams: Promise<{ mw?: string }>;
}) {
  const { mw } = await searchParams;
  const initialMw = mw && Number.isFinite(parseFloat(mw)) && parseFloat(mw) > 0 ? mw : undefined;
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-ink/45">
            <Link href="/tools" className="hover:text-ink">Tools</Link>
            <span aria-hidden>/</span>
            <span className="text-ink/70">Molarity</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Peptide molarity calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/65">
            For assay and binding work you usually need a molar concentration, not
            a mass concentration. Enter the peptide mass, its molecular weight in
            daltons, and the solvent volume to get the concentration in millimolar,
            micromolar, and nanomolar.
          </p>

          <div className="mt-10">
            <MolarityCalculator initialMw={initialMw} />
          </div>

          <section className="mt-16 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold">How the math works</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/70">
              <p>
                Molarity is moles per liter. Moles = mass ÷ molecular weight, so a
                peptide&rsquo;s molar concentration depends on its size: the same
                mass of a small peptide contains more molecules — and therefore a
                higher molarity — than a large one.
              </p>
              <p>
                <strong className="text-ink">Molarity (M)</strong> = (mass in g ÷
                molecular weight in g/mol) ÷ volume in litres. The calculator
                scales the result into mM, µM, and nM for convenience.
              </p>
              <p>
                Not sure of the molecular weight? Find it on the certificate of
                analysis, or ask the{" "}
                <Link href="/research" className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent">
                  research agent
                </Link>
                , which can look it up in PubChem or UniProt.
              </p>
            </div>
            <p className="mt-6 rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              This tool performs concentration arithmetic for laboratory use and
              is educational only. It is not medical advice or dosing guidance.
              Verify the molecular weight and all figures against the certificate
              of analysis.
            </p>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
