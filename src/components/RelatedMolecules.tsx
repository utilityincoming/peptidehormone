import Link from "next/link";
import type { Hormone } from "@/lib/hormones";
import { getFamily } from "@/lib/families";
import { compoundTierClasses } from "@/components/evidence";

export function RelatedMolecules({ items }: { items: Hormone[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold">Commonly researched with</h2>
      <p className="mt-3 text-sm leading-6 text-ink/55">
        The same family or the same design lineage. These are neighbors in the catalog, not a regimen.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const family = getFamily(item.family);
          return (
            <li key={item.slug}>
              <Link
                href={`/hormones/${item.slug}`}
                className="block h-full rounded-2xl border border-ink/10 bg-panel/30 p-4 transition-colors hover:border-accent/40"
              >
                <span className={`font-mono text-[11px] uppercase tracking-wide ${family?.accent ?? "text-accent"}`}>
                  {family?.name}
                </span>
                <span className="mt-2 block font-display text-base font-semibold text-ink">
                  {item.name}
                  {item.abbr && <span className="ml-2 font-mono text-xs font-normal text-ink/40">{item.abbr}</span>}
                </span>
                <span className="mt-2 block text-sm leading-6 text-ink/60">{item.summary}</span>
                {(item.evidence || item.halfLife || item.mw) && (
                  <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-ink/45">
                    {item.evidence && (
                      <span className={`rounded-full border px-2 py-0.5 font-medium ${compoundTierClasses(item.evidence)}`}>
                        {item.evidence}
                      </span>
                    )}
                    {item.halfLife && <span>t½ {item.halfLife}</span>}
                    {item.mw && <span>{item.mwApprox ? "≈" : "~"}{item.mw.toLocaleString()} Da</span>}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
