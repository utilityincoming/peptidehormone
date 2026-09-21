import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { collectionLd } from "@/lib/jsonld";
import { getHormone } from "@/lib/hormones";
import { getFamily } from "@/lib/families";
import { sourcedSlugs, vendorsFor, VENDORS, SOURCING_STANDARD, productUrl } from "@/lib/affiliate";
import { AffiliateLink, CopyCode } from "@/components/AffiliateLink";
import { CTA_PILL, Disclosure } from "@/components/Sourcing";

export const metadata: Metadata = {
  title: "Availability — what the network sources",
  description:
    "The peptide hormones this catalog can point you to at research grade — sourced through the American Peptide network via AminoClub and ElyriaBio, research-use-only. What you can actually get, not just what exists.",
  alternates: { canonical: "/available" },
  openGraph: {
    title: "Availability · Peptide Hormone",
    description:
      "Research-grade peptides you can actually reach, sourced through the network via AminoClub and ElyriaBio.",
  },
};

export default function AvailablePage() {
  const items = sourcedSlugs()
    .map((slug) => getHormone(slug))
    .filter((h): h is NonNullable<typeof h> => Boolean(h))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <JsonLd
        data={collectionLd({
          path: "/available",
          name: "Availability — what the network sources",
          description:
            "Peptide hormones you can reach at research grade, sourced through the American Peptide network via AminoClub and ElyriaBio.",
          items: items.map((h) => ({ name: h.name, path: `/hormones/${h.slug}` })),
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Availability", path: "/available" },
          ],
        })}
      />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
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
              network can point you to at research grade, sourced research-use-only rather
              than left as an open question.
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-ink/55">
              Sourced through the American Peptide network from {VENDORS.length} research-use-only sources —{" "}
              {VENDORS.map((v, i) => (
                <span key={v.key}>
                  <Link href={`/available/${v.key}`} className="text-accent hover:underline">
                    {v.name}
                  </Link>
                  {i < VENDORS.length - 2 ? ", " : i === VENDORS.length - 2 ? " and " : ""}
                </span>
              ))}
              . Every button below lands on the product itself, research-use-only.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {VENDORS.map((v) => (
                <div
                  key={v.key}
                  className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-ink/10 bg-panel/40 px-4 py-3"
                >
                  <AffiliateLink href={v.home} vendor={v.key} surface="available" className={CTA_PILL}>
                    Browse {v.name} <span aria-hidden>→</span>
                  </AffiliateLink>
                  {v.code ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink/50">
                      code <CopyCode code={v.code} />
                    </span>
                  ) : (
                    <span className="text-xs text-ink/45">{v.carries.size} from this catalog</span>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── The standard ── */}
        <section id="standard" className="scroll-mt-20 border-b border-ink/[0.06]">
          <Container className="py-12 md:py-14">
            <h2 className="font-display text-sm font-medium uppercase tracking-wide text-ink/40">
              What we look for in a source
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
              Listings are editorial: a compound appears because our network sources it
              research-use-only and it fits the picture above, never because it was paid for.
              Each button opens the vendor&rsquo;s own product page, which is authoritative for
              stock and lot detail; we point you to a vetted source, we don&rsquo;t verify each
              lot for you. Absence isn&rsquo;t a judgment on the molecule.{" "}
              <Link href="/insights/what-you-can-actually-get" className="text-accent hover:underline">
                Why availability, not identity, is the real bottleneck →
              </Link>{" "}
              <Link href="/insights/the-complexity-ladder" className="text-accent hover:underline">
                Why complexity, not fraud, sorts the shelf →
              </Link>
            </p>
          </Container>
        </section>

        {/* ── The index ── */}
        <Container className="py-14 md:py-18">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-ink/10 bg-panel/30 p-10 text-center">
              <h2 className="font-display text-xl font-semibold">Curation in progress</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/55">
                The availability layer is being matched against the network&rsquo;s sources and
                will list here shortly. In the meantime, explore the{" "}
                <Link href="/catalog" className="text-accent hover:underline">full catalog</Link>.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
                {items.map((h) => {
                  const fam = getFamily(h.family);
                  const carriers = vendorsFor(h.slug);
                  return (
                    <div
                      key={h.slug}
                      className="flex flex-col gap-4 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <Link
                            href={`/hormones/${h.slug}`}
                            className="font-display text-lg font-semibold leading-snug transition-colors hover:text-accent"
                          >
                            {h.name}
                            {h.abbr && <span className="text-ink/40"> · {h.abbr}</span>}
                          </Link>
                          {carriers.map((v) => (
                            <Link
                              key={v.key}
                              href={`/available/${v.key}`}
                              className="shrink-0 rounded-full border border-accent-teal/40 bg-accent-teal/10 px-2 py-0.5 text-[11px] font-medium text-accent-teal hover:bg-accent-teal/20"
                            >
                              {v.name}
                            </Link>
                          ))}
                        </div>
                        <p className="mt-1.5 text-sm text-ink/55">
                          <span className={fam?.accent ?? "text-accent"}>{fam?.name ?? "Peptide"}</span>
                          <span className="text-ink/30"> · </span>
                          {h.summary}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                        {carriers.map((v) => (
                          <AffiliateLink
                            key={v.key}
                            href={productUrl(v, h.slug)}
                            vendor={v.key}
                            slug={h.slug}
                            surface="available"
                            className={`${CTA_PILL} shrink-0`}
                          >
                            Get {h.abbr ?? h.name} at {v.name} <span aria-hidden>→</span>
                          </AffiliateLink>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Disclosure className="mt-6" />
              <p className="mt-2 text-xs leading-5 text-ink/40">
                Not medical advice or an endorsement to obtain or use any compound — regulatory
                status varies by jurisdiction.
              </p>
            </>
          )}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
