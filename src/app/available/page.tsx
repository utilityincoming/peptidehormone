import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { collectionLd } from "@/lib/jsonld";
import { getHormone } from "@/lib/hormones";
import { getFamily } from "@/lib/families";
import {
  stockedSlugs,
  stockedLink,
  SOURCING_STANDARD,
  ABSIM_HOME,
  ABSIM_CODE,
  ABSIM_DISCOUNT,
  AFFILIATE_REL,
} from "@/lib/affiliate";

export const metadata: Metadata = {
  title: "Availability — what's verified in stock",
  description:
    "The peptide hormones available at research grade right now — each verified against a fixed sourcing standard before it earns a listing. What you can actually get, not just what exists.",
  alternates: { canonical: "/available" },
  openGraph: {
    title: "Availability · Peptide Hormone",
    description:
      "Research-grade peptides available right now, verified against a fixed sourcing standard.",
  },
};

export default function AvailablePage() {
  const items = stockedSlugs()
    .map((slug) => getHormone(slug))
    .filter((h): h is NonNullable<typeof h> => Boolean(h))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <JsonLd
        data={collectionLd({
          path: "/available",
          name: "Availability — what's verified in stock",
          description:
            "Peptide hormones available at research grade right now, verified against a fixed sourcing standard.",
          items: items.map((h) => ({ name: h.name, path: `/hormones/${h.slug}` })),
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Availability", path: "/available" },
          ],
        })}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 75% 0%, rgba(124,131,255,0.14), transparent 70%)" }}
          />
          <Container className="relative py-16 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-panel/60 px-3 py-1 text-xs font-medium text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Availability
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              What&rsquo;s actually reachable
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
              Every reference tells you what a molecule <span className="font-medium text-ink/80">is</span>.
              This is the one that tells you whether you can get it — the compounds our
              network stocks at research grade right now, each verified against a fixed
              sourcing standard before it earns a place here.
            </p>
            <p className="mt-6 text-sm leading-6 text-ink/55">
              Sourced through the American Peptide network to{" "}
              <a href={ABSIM_HOME} target="_blank" rel={AFFILIATE_REL} className="text-accent hover:underline">
                ABSIM Peptides
              </a>
              . Researchers get {ABSIM_DISCOUNT} off with code{" "}
              <span className="font-mono text-ink/80">{ABSIM_CODE}</span>.
            </p>
          </Container>
        </section>

        {/* ── The standard ── */}
        <section className="border-b border-ink/[0.06]">
          <Container className="py-12 md:py-14">
            <h2 className="font-display text-sm font-medium uppercase tracking-wide text-ink/40">
              How a listing is earned
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {SOURCING_STANDARD.map((c) => (
                <div key={c.title} className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                  <h3 className="font-display text-base font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/60">{c.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-ink/50">
              Listings are editorial: a compound appears because it meets the standard and our
              network actually stocks it, never because it was paid for. Absence means &ldquo;not
              currently stocked to the standard&rdquo; — it is not a judgment on the molecule.
            </p>
          </Container>
        </section>

        {/* ── The index ── */}
        <Container className="py-14 md:py-18">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-ink/10 bg-panel/30 p-10 text-center">
              <h2 className="font-display text-xl font-semibold">Curation in progress</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/55">
                The availability layer is being verified against the sourcing standard and will
                list here shortly. In the meantime, explore the{" "}
                <Link href="/catalog" className="text-accent hover:underline">full catalog</Link>.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
                {items.map((h) => {
                  const fam = getFamily(h.family);
                  return (
                    <div
                      key={h.slug}
                      className="flex flex-col gap-4 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <Link
                            href={`/hormones/${h.slug}`}
                            className="font-display text-lg font-semibold leading-snug transition-colors hover:text-accent"
                          >
                            {h.name}
                            {h.abbr && <span className="text-ink/40"> · {h.abbr}</span>}
                          </Link>
                          <span className="shrink-0 rounded-full border border-accent-teal/40 bg-accent-teal/10 px-2 py-0.5 text-[11px] font-medium text-accent-teal">
                            In stock
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-ink/55">
                          <span className={fam?.accent ?? "text-accent"}>{fam?.name ?? "Peptide"}</span>
                          <span className="text-ink/30"> · </span>
                          {h.summary}
                        </p>
                      </div>
                      <a
                        href={stockedLink(h.slug) ?? ABSIM_HOME}
                        target="_blank"
                        rel={AFFILIATE_REL}
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/15"
                      >
                        View at ABSIM <span aria-hidden>→</span>
                      </a>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 text-xs leading-5 text-ink/40">
                Affiliate links across the American Peptide network — a purchase supports this
                reference at no additional cost to you, and buys not one word of the catalog.
                Stock is checked against ABSIM&rsquo;s live listing; the seller&rsquo;s page is
                authoritative. {ABSIM_DISCOUNT} off with code{" "}
                <span className="font-mono text-ink/60">{ABSIM_CODE}</span>. Not medical advice or
                an endorsement to obtain or use any compound — regulatory status varies by
                jurisdiction. See{" "}
                <Link href="/methodology" className="underline decoration-ink/20 underline-offset-2 hover:text-ink/60">
                  how we pick
                </Link>
                .
              </p>
            </>
          )}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
