import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { collectionLd } from "@/lib/jsonld";
import { getHormone } from "@/lib/hormones";
import { uniqueComparePairs, comparePairPath } from "@/lib/compare";
import { aliasesFor } from "@/lib/aliases";

export const metadata: Metadata = {
  title: "Peptide comparisons",
  alternates: { canonical: "/compare" },
  description:
    "Static side-by-side comparisons of peptide hormones and their engineered analogs — receptor, half-life, evidence tier, and molecular weight. Educational only.",
};

function pairLabel(slug: string): string {
  const h = getHormone(slug);
  if (!h) return slug;
  const brand = aliasesFor(h.slug)[0];
  if (brand) return `${h.name} (${brand})`;
  return h.abbr ? `${h.name} (${h.abbr})` : h.name;
}

export default function CompareIndex() {
  const pairs = uniqueComparePairs();
  const items = pairs.map(([a, b]) => ({
    name: `${pairLabel(a)} vs ${pairLabel(b)}`,
    path: `/compare/${comparePairPath(a, b)}`,
    a,
    b,
  }));

  return (
    <>
      <JsonLd
        data={collectionLd({
          path: "/compare",
          name: "Peptide comparisons",
          description:
            "Static side-by-side comparisons of peptide hormones and their engineered analogs.",
          items: items.map((it) => ({ name: it.name, path: it.path })),
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Comparisons", path: "/compare" },
          ],
        })}
      />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Container className="py-12 md:py-16">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">Comparisons</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
            Native hormone next to the analog engineered from it, or two analogs
            that share a receptor. Every page is generated from the catalog — no
            new claims. For a custom lineup, use the{" "}
            <Link href="/tools/compare" className="text-accent hover:underline">
              interactive tool
            </Link>
            .
          </p>
          <ul className="mt-10 columns-1 gap-x-10 sm:columns-2">
            {items.map((it) => (
              <li key={it.path} className="mb-2 break-inside-avoid">
                <Link href={it.path} className="text-[15px] text-ink/80 hover:text-accent">
                  {it.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
