import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import ReconstitutionCalculator from "@/components/tools/ReconstitutionCalculator";

export const metadata: Metadata = {
  title: "Peptide reconstitution calculator",
  description:
    "Calculate peptide concentration, volume per dose, insulin-syringe units, and doses per vial from vial mass, water volume, and target dose. Free, in-browser, educational only.",
};

export default function ReconstitutionPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-ink/45">
            <Link href="/tools" className="hover:text-ink">Tools</Link>
            <span aria-hidden>/</span>
            <span className="text-ink/70">Reconstitution</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Reconstitution calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/65">
            Reconstituting a lyophilized peptide is a concentration problem: mass
            of peptide divided by the volume of solvent you add. Enter the three
            values below to get the concentration, the volume each dose occupies,
            the equivalent marks on a U-100 insulin syringe, and how many doses a
            vial holds.
          </p>

          <div className="mt-10">
            <ReconstitutionCalculator />
          </div>

          <section className="mt-16 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold">How the math works</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/70">
              <p>
                <strong className="text-ink">Concentration</strong> = peptide mass
                ÷ solvent volume. 5&nbsp;mg of peptide in 2&nbsp;mL of
                bacteriostatic water gives 2.5&nbsp;mg/mL (2,500&nbsp;mcg/mL).
              </p>
              <p>
                <strong className="text-ink">Volume per dose</strong> = dose ÷
                concentration. On a U-100 insulin syringe, 1&nbsp;mL equals
                100&nbsp;&ldquo;units,&rdquo; so the volume converts directly to
                syringe marks — the practical readout most people want.
              </p>
              <p>
                <strong className="text-ink">Doses per vial</strong> = total
                peptide mass ÷ dose. It tells you how long a vial lasts at a given
                amount per dose.
              </p>
            </div>
            <p className="mt-6 rounded-2xl border border-ink/[0.06] bg-surface-deep p-5 text-xs leading-5 text-ink/40">
              This tool performs concentration arithmetic for laboratory
              reconstitution and is educational only. It is not medical advice,
              dosing guidance, or a recommendation to use any substance. Always
              verify figures independently.
            </p>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
