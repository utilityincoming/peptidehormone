import type { Metadata } from "next";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Research Pass",
  alternates: { canonical: "/research/pass" },
  description:
    "One year of unlimited access to the PeptideHormone research assistant — cited answers grounded in PubMed, ClinicalTrials.gov, UniProt and PubChem. Educational reference only.",
  robots: { index: false },
};

export default function ResearchPassPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Container className="py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Research Pass
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Unlimited research questions
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
            One year of unlimited access to the research assistant: cited answers grounded in
            PubMed, ClinicalTrials.gov, UniProt and PubChem, with no daily limit. Educational
            reference only, not medical advice. You&rsquo;ll receive your access code by email
            after payment.
          </p>
          <div className="mt-10 max-w-xl">
            <CheckoutForm />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
