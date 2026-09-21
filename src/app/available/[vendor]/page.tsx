import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { collectionLd } from "@/lib/jsonld";
import { getHormone } from "@/lib/hormones";
import { getFamily } from "@/lib/families";
import { VENDORS, getVendor, productUrl, SOURCING_STANDARD } from "@/lib/affiliate";
import { AffiliateLink, CopyCode } from "@/components/AffiliateLink";
import { CTA_PILL, Disclosure } from "@/components/Sourcing";

// One page per network vendor: what we can see about the source, what of this
// catalog it carries (each row a deep-link to the product), the code where there
// is one, and the questions a reader actually types before they buy. The page is
// the reference's answer to "is <vendor> legit / is there a code" — captured via
// metadata + FAQ schema, never as the H1.

export function generateStaticParams() {
  return VENDORS.map((v) => ({ vendor: v.key }));
}

type Props = { params: Promise<{ vendor: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vendor } = await params;
  const v = getVendor(vendor);
  if (!v) return {};
  const codeBit = v.code ? ` Reader code ${v.code}.` : "";
  return {
    title: `${v.name} — what the network sources there`,
    description: `${v.name} through the American Peptide network: ${v.carries.size} molecules from this catalog, research-use-only, each linked to its product page.${codeBit} What's visible about their testing and shipping, and how we pick.`,
    alternates: { canonical: `/available/${v.key}` },
    openGraph: {
      title: `${v.name} · Peptide Hormone`,
      description: `The ${v.carries.size} peptides this catalog can point you to at ${v.name}, research-use-only.${codeBit}`,
    },
  };
}

function faqsFor(v: (typeof VENDORS)[number]) {
  const faqs: { q: string; a: string }[] = [];
  faqs.push({
    q: `Is there a ${v.name} discount code?`,
    a: v.code
      ? `Yes — the network reader code is ${v.code}. It rides in every ${v.name} link on this site, and you can also enter it at checkout.`
      : `${v.name} doesn't run a reader code through the network; our link carries attribution only, at no extra cost to you. ${v.name} may run its own first-order offer on its storefront.`,
  });
  faqs.push({
    q: `What does ${v.name} carry from this catalog?`,
    a: `${v.carries.size} molecules as of our last check, listed on this page with a link to each product. Their shelf is authoritative for stock; ours is a hint, not a guarantee.`,
  });
  faqs.push({
    q: `Does ${v.name} publish a COA?`,
    a: `${v.name} ${v.coa}. That is their stated policy as visible from the outside; we do not verify each lot.`,
  });
  faqs.push({
    q: `Is ${v.name} sold for human use?`,
    a: `No. ${v.name} sells research-use-only material${v.gate ? ` behind ${v.gate}` : ""}. Nothing here is medical advice or an endorsement to obtain or use any compound; regulatory status varies by jurisdiction.`,
  });
  return faqs;
}

export default async function VendorPage({ params }: Props) {
  const { vendor } = await params;
  const v = getVendor(vendor);
  if (!v) notFound();

  const items = [...v.carries]
    .map((slug) => getHormone(slug))
    .filter((h): h is NonNullable<typeof h> => Boolean(h))
    .sort((a, b) => a.name.localeCompare(b.name));
  const others = VENDORS.filter((o) => o.key !== v.key);
  const faqs = faqsFor(v);

  const facts: { label: string; value: string }[] = [
    { label: "Testing, as stated", value: v.coa },
    { label: "Shipping, as stated", value: v.shipping },
    ...(v.gate ? [{ label: "Before the shelf", value: v.gate }] : []),
    {
      label: "Network attribution",
      value: v.code
        ? `reader code ${v.code} rides in every link and can be entered at checkout`
        : "referral link carries attribution only — no code, no markup",
    },
  ];

  return (
    <>
      <JsonLd
        data={collectionLd({
          path: `/available/${v.key}`,
          name: `${v.name} — what the network sources there`,
          description: `The ${items.length} peptides this catalog can point you to at ${v.name}, research-use-only.`,
          items: items.map((h) => ({ name: h.name, path: `/hormones/${h.slug}` })),
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Availability", path: "/available" },
            { name: v.name, path: `/available/${v.key}` },
          ],
          faqs,
        })}
      />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-ink/[0.06]">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(55% 55% at 75% 0%, rgba(45,212,168,0.12), transparent 70%)" }}
          />
          <Container className="relative py-16 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/45">
              <Link href="/available" className="hover:text-ink">Availability</Link>
              <span aria-hidden>/</span>
              <span className="text-ink/70">{v.name}</span>
            </nav>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {v.name}, through the network
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
              {v.name} is {v.blurb} — one of the {VENDORS.length} sources our sister project
              American Peptide vetted. Below: the {items.length} molecules in this catalog it
              carries, each linked straight to the product, and what we can see about how
              it operates.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <AffiliateLink href={v.home} vendor={v.key} surface="vendor" className={CTA_PILL}>
                Browse {v.name} <span aria-hidden>→</span>
              </AffiliateLink>
              {v.code && (
                <span className="inline-flex items-center gap-1.5 text-sm text-ink/55">
                  reader code <CopyCode code={v.code} />
                </span>
              )}
            </div>
          </Container>
        </section>

        {/* ── What's visible ── */}
        <section className="border-b border-ink/[0.06]">
          <Container className="py-12 md:py-14">
            <h2 className="font-display text-sm font-medium uppercase tracking-wide text-ink/40">
              What&rsquo;s visible from the outside
            </h2>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-ink/10 bg-panel/30 p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-wide text-ink/40">{f.label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-ink/70">{f.value}.</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-ink/50">
              Described by what their storefront states, checked September 2026 — not
              a lot-by-lot audit. The bar every listing clears is the same three-part{" "}
              <Link href="/available#standard" className="text-accent hover:underline">
                sourcing standard
              </Link>
              : {SOURCING_STANDARD.map((s) => s.title).join(" · ")}.
            </p>
          </Container>
        </section>

        {/* ── The shelf ── */}
        <Container className="py-14 md:py-18">
          <h2 className="font-display text-2xl font-semibold">
            From this catalog, at {v.name}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/55">
            Every row opens the product page{v.code ? ` with the ${v.code} code already applied` : " with network attribution"}.
            Read the monograph first if you haven&rsquo;t — that&rsquo;s the whole point of the site.
          </p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
            {items.map((h) => {
              const fam = getFamily(h.family);
              const label = h.abbr ?? h.name;
              return (
                <div
                  key={h.slug}
                  className="flex flex-col gap-4 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/hormones/${h.slug}`}
                      className="font-display text-lg font-semibold leading-snug transition-colors hover:text-accent"
                    >
                      {h.name}
                      {h.abbr && <span className="text-ink/40"> · {h.abbr}</span>}
                    </Link>
                    <p className="mt-1.5 text-sm text-ink/55">
                      <span className={fam?.accent ?? "text-accent"}>{fam?.name ?? "Peptide"}</span>
                      <span className="text-ink/30"> · </span>
                      {h.summary}
                    </p>
                  </div>
                  <AffiliateLink
                    href={productUrl(v, h.slug)}
                    vendor={v.key}
                    slug={h.slug}
                    surface="vendor"
                    className={`${CTA_PILL} shrink-0`}
                  >
                    Get {label} <span aria-hidden>→</span>
                  </AffiliateLink>
                </div>
              );
            })}
          </div>
          <Disclosure className="mt-6" />
        </Container>

        {/* ── FAQ ── */}
        <section className="border-t border-ink/[0.06]">
          <Container className="py-14 md:py-18">
            <h2 className="font-display text-2xl font-semibold">Before you click through</h2>
            <dl className="mt-8 grid gap-6 md:grid-cols-2">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-ink/10 bg-panel/30 p-6">
                  <dt className="font-display text-base font-semibold">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-6 text-ink/65">{f.a}</dd>
                </div>
              ))}
            </dl>
            {others.length > 0 && (
              <p className="mt-8 text-sm leading-6 text-ink/55">
                The network&rsquo;s other source{others.length > 1 ? "s" : ""}:{" "}
                {others.map((o, i) => (
                  <span key={o.key}>
                    <Link href={`/available/${o.key}`} className="text-accent hover:underline">
                      {o.name}
                    </Link>
                    {i < others.length - 1 ? ", " : ""}
                  </span>
                ))}
                . Or the whole index —{" "}
                <Link href="/available" className="text-accent hover:underline">
                  what&rsquo;s actually reachable
                </Link>
                .
              </p>
            )}
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
