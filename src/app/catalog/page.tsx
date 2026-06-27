import type { Metadata } from "next";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import CatalogBrowser from "@/components/CatalogBrowser";
import { JsonLd } from "@/components/JsonLd";
import { collectionLd } from "@/lib/jsonld";
import { HORMONES } from "@/lib/hormones";
import { FAMILIES } from "@/lib/families";

export const metadata: Metadata = {
  title: "Catalog — every peptide hormone, one index",
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
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(55% 55% at 75% 0%, rgba(124,131,255,0.14), transparent 70%)",
            }}
          />
          <Container className="relative py-16 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {HORMONES.length} molecules · {FAMILIES.length} families
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              The catalog
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
              Every peptide hormone in one index. Search by molecule, receptor,
              source, or class, filter by signaling family, and open any entry for
              the full reference — identity, mechanism, and the evidence behind it.
            </p>
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
