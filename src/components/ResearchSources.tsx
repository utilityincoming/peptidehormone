import Link from "next/link";

const CRITERIA = [
  { title: "Lot-specific COA", body: "A certificate that names the lot in hand, not a generic spec sheet." },
  { title: "Identity tests", body: "Third-party HPLC plus mass spectrometry, read against the claimed sequence." },
  { title: "Research-use framing", body: "Labeled for research, not as a drug, a supplement, or a personal protocol." },
];

/** Editorial handoff. Stays on this site. Vendor buttons live only on /available. */
export function ResearchSources({ slug, name, listed }: { slug: string; name: string; listed: boolean }) {
  return (
    <section className="rounded-2xl border border-accent/25 bg-accent/[0.04] p-6">
      <h2 className="font-display text-base font-semibold">Where {name} is reachable</h2>
      <p className="mt-3 text-sm leading-6 text-ink/60">
        {listed
          ? `${name} appears on this site’s availability index. The index is a list of research-use sources the editors track, not a store and not a recommendation to use the molecule.`
          : `${name} is not on the availability index. That is a sourcing note, not a judgment of the biology.`}
      </p>
      <ul className="mt-4 space-y-3">
        {CRITERIA.map((item) => (
          <li key={item.title}>
            <p className="text-sm font-medium text-ink">{item.title}</p>
            <p className="text-sm leading-6 text-ink/55">{item.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-2 text-sm">
        <Link href={listed ? `/available#${slug}` : "/available"} className="text-accent hover:underline">
          {listed ? `Open ${name} on the availability index` : "Read the availability index"} →
        </Link>
        <Link href="/insights/how-to-read-a-peptide-coa" className="text-ink/60 hover:text-accent">
          How to read a certificate of analysis
        </Link>
        <Link href="/glossary#evidence-tier" className="text-ink/60 hover:text-accent">
          What an evidence tier means
        </Link>
      </div>
    </section>
  );
}
