import type { ReactNode } from "react";
import Link from "next/link";

// Shared presentational components for /insights long-form articles.

export const LINK =
  "text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold sm:text-[1.7rem]">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-7 text-ink/75">{children}</p>;
}

export function Em({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

export function Callout({ label = "Key insight", children }: { label?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border-l-2 border-accent bg-accent/[0.06] p-5">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-wide text-accent">{label}</div>
      <p className="text-[15px] leading-7 text-ink/80">{children}</p>
    </div>
  );
}

export function Bullets({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-3">
      {items.map(([head, body]) => (
        <li key={head} className="flex gap-3 text-[15px] leading-7 text-ink/75">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>
            <strong className="font-semibold text-ink">{head}.</strong> {body}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CrossLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="group flex items-start gap-2 text-ink/75 transition-colors hover:text-accent">
        <span className="mt-0.5 text-ink/30 transition-colors group-hover:text-accent" aria-hidden>→</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}
