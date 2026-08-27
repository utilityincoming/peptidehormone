import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { CompareTable } from "@/components/tools/CompareTable";
import { getHormone } from "@/lib/hormones";
import {
  comparePairPath,
  parseComparePair,
  staticComparePairs,
  compareFaq,
  compareMetaTitle,
  compareMetaDescription,
} from "@/lib/compare";
import { compareLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return staticComparePairs().map(([a, b]) => ({ pair: comparePairPath(a, b) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parseComparePair(pair);
  if (!parsed) return { title: "Not found" };
  const a = getHormone(parsed[0]);
  const b = getHormone(parsed[1]);
  if (!a || !b) return { title: "Not found" };
  const title = compareMetaTitle(a, b);
  const description = compareMetaDescription(a, b);
  return {
    title,
    description,
    alternates: { canonical: `/compare/${pair}` },
    openGraph: { title: `${title} · Peptide Hormone`, description },
  };
}

export default async function ComparePairPage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const parsed = parseComparePair(pair);
  if (!parsed) notFound();
  const a = getHormone(parsed[0]);
  const b = getHormone(parsed[1]);
  if (!a || !b) notFound();

  const faqs = compareFaq(a, b);
  const reverse = comparePairPath(b.slug, a.slug);

  return (
    <>
      <JsonLd data={compareLd(a, b, pair, faqs)} />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Container className="py-12 md:py-16">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
            <Link href="/compare" className="hover:text-ink">
              Comparisons
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink/70">
              {a.abbr ?? a.name} vs {b.abbr ?? b.name}
            </span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            {a.name} vs {b.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/65">
            {a.summary} {b.summary} Side by side: type, evidence tier, receptor,
            molecular weight, and half-life — the same fields as each monograph,
            rearranged so the engineering difference is visible.
          </p>

          <div className="mt-10">
            <CompareTable hormones={[a, b]} />
          </div>

          <p className="mt-4 text-xs leading-5 text-ink/40">
            Half-life bars are on a logarithmic scale across the molecules shown.
            Reference values for the native or representative form — educational
            only, not medical or dosing advice.
          </p>

          {faqs.length > 0 && (
            <section className="mt-14 max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">Common questions</h2>
              <dl className="mt-5 space-y-3">
                {faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                    <dt className="font-display text-base font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-ink/70">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <p className="mt-10 text-sm text-ink/50">
            Prefer the other order?{" "}
            <Link href={`/compare/${reverse}`} className="text-accent hover:underline">
              {b.name} vs {a.name}
            </Link>
            . Or open the{" "}
            <Link
              href={`/tools/compare?ids=${a.slug},${b.slug}`}
              className="text-accent hover:underline"
            >
              interactive comparison tool
            </Link>{" "}
            to add more molecules.
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
