import type { Metadata } from "next";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import CatalogBrowser from "@/components/CatalogBrowser";
import { SourcingLine } from "@/components/Sourcing";
import { JsonLd } from "@/components/JsonLd";
import { collectionLd } from "@/lib/jsonld";
import { HORMONES } from "@/lib/hormones";
import { FAMILIES } from "@/lib/families";

export const metadata: Metadata = {
  title: "Catalog — every peptide hormone, one index",
  alternates: { canonical: "/catalog" },
  description: `Browse and search the full catalog of ${HORMONES.length} peptide hormones across ${FAMILIES.length} signaling families — by molecule, receptor, source, or class. Research-grade and independent.`,
};

export default function CatalogPage() {
  return (
    <>
      <JsonLd
        data={collectionLd({
          path: "/catalog",
          name: "The catalog — every peptide hormone",
          description: `The full catalog of ${HORMONES.length} peptide hormones across ${FAMILIES.length} signaling families.`,
          items: HORMONES.map((h) => ({ name: h.name, path: `/hormones/${h.slug}` })),
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Catalog", path: "/catalog" },
          ],
        })}
      />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <Container className="page-intro">
            <h1 className="page-title">
              The catalog
            </h1>
            <p className="page-summary">
              Browse {HORMONES.length} molecules across {FAMILIES.length} signaling families. Search by molecule, receptor,
              source, class, alias, or development code, filter by signaling family, and open any entry for
              the full reference — identity, mechanism, and the evidence behind it.
            </p>
            <div className="mt-6">
              <SourcingLine />
            </div>
          </Container>
        </section>

        <Container className="py-12 md:py-16">
          <CatalogBrowser />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
