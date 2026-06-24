import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site";
import ResearchAgent from "@/components/ResearchAgent";

export const metadata: Metadata = {
  title: "Research agent",
  description:
    "Ask the peptide hormone research agent — grounded answers with linked citations from PubChem, UniProt, ClinicalTrials.gov, and PubMed.",
};

export default function ResearchPage() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<div className="flex-1" />}>
        <ResearchAgent />
      </Suspense>
    </>
  );
}
