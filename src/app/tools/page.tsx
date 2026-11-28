import type { Metadata } from "next";
import Link from "next/link";
import { Container, SiteHeader, SiteFooter } from "@/components/site";
import { JsonLd } from "@/components/JsonLd";
import { ToolPreview, type ToolPreviewKind } from "@/components/home";
import { collectionLd } from "@/lib/jsonld";

const DESCRIPTION =
  "Explore free peptide research tools for modeling half-life, comparing hormone analogs, and reviewing research timelines.";

export const metadata: Metadata = {
  title: "Research tools & calculators",
  alternates: { canonical: "/tools" },
  description: DESCRIPTION,
};

const TOOLS: {
  href: string;
  name: string;
  blurb: string;
  tag: string;
  accent: string;
  preview: ToolPreviewKind;
  action: string;
}[] = [
  {
    href: "/tools/half-life",
    name: "Half-life & dosing calculator",
    blurb: "Model elimination from a half-life and dose interval, and watch repeated doses accumulate. An estimate of concentration over time — not of how long an effect lasts.",
    tag: "Pharmacokinetics",
    accent: "text-accent",
    preview: "half-life",
    action: "Model half-life",
  },
  {
    href: "/tools/compare",
    name: "Analog comparison",
    blurb: "Put a native hormone beside the analogs engineered from it — receptor, half-life, molecular weight, and evidence tier on one axis.",
    tag: "Structure–activity",
    accent: "text-accent-teal",
    preview: "compare",
    action: "Compare analogs",
  },
  {
    href: "/tools/cycle-planner",
    name: "Cycle planner",
    blurb: "Lay a research timeline beside each compound’s receptor, half-life evidence, and reference range. A reading aid, not a recommendation.",
    tag: "Research timelines",
    accent: "text-accent-amber",
    preview: "cycle",
    action: "Open cycle planner",
  },
];

// Questions a reader (or an answer engine) asks before opening a tool. Rendered
// visibly below the grid AND emitted as FAQPage structured data from the same
// source, so the two never drift — the house rule for FAQ markup on this site.
const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need an account, and is anything stored?",
    a: "No account, no sign-up. Every tool runs entirely in your browser; the values you enter are not sent to a server or saved.",
  },
  {
    q: "What does the half-life calculator actually model?",
    a: "First-order elimination from a half-life and a dose interval, including how repeated doses accumulate. It estimates concentration over time — not how long an effect lasts, which depends on receptor biology a single number cannot capture.",
  },
  {
    q: "Where do the receptor, half-life, and evidence-tier values come from?",
    a: "The same catalog the hormone monographs draw on, with each figure traced to primary literature. The methodology page explains how evidence is graded and molecules are classified.",
  },
];

export default function ToolsIndex() {
  return (
    <>
      <JsonLd
        data={collectionLd({
          path: "/tools",
          name: "Research tools & calculators",
          description: DESCRIPTION,
          items: TOOLS.map((tool) => ({ name: tool.name, path: tool.href })),
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ],
          faqs: FAQS,
        })}
      />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <section className="border-b border-ink/10 bg-panel/55" aria-labelledby="tools-title">
          <Container className="flex flex-col gap-5 py-10 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div>
              <h1 id="tools-title" className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Research tools &amp; calculators
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-secondary sm:text-lg">
                Model how peptide hormone concentrations change over time, compare
                analogs, and explore research timelines alongside catalog data.
              </p>
            </div>
            <p className="max-w-xs border-l border-ink/15 pl-4 text-sm leading-6 text-secondary">
              Free to use in your browser. No account needed.
            </p>
          </Container>
        </section>

        <Container className="py-8 sm:py-10 lg:py-14">
          <ul className="grid gap-4 lg:grid-cols-3 lg:gap-5">
            {TOOLS.map((tool) => (
              <li key={tool.href} className="min-w-0">
                <Link
                  href={tool.href}
                  className="group grid h-full min-w-0 gap-4 rounded-xl border border-ink/15 bg-surface p-4 transition-colors hover:border-accent/45 hover:bg-panel/40 sm:grid-cols-2 sm:items-center sm:p-5 lg:flex lg:flex-col lg:items-stretch lg:gap-5"
                >
                  <div className="min-w-0 lg:flex-1">
                    <p className={`text-sm font-medium ${tool.accent}`}>{tool.tag}</p>
                    <h2 className="mt-1.5 font-display text-xl font-semibold leading-snug">
                      {tool.name}
                    </h2>
                    <p className="mt-2 max-w-prose text-sm leading-6 text-secondary">{tool.blurb}</p>
                  </div>
                  <div className="min-w-0">
                    <ToolPreview kind={tool.preview} />
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-ink/10 pt-3 text-sm font-semibold text-accent sm:col-span-2">
                    <span>{tool.action}</span>
                    <span aria-hidden className="motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-prose text-sm leading-6 text-secondary">
            Every receptor, half-life, and evidence tier these tools draw on is explained in the{" "}
            <Link href="/methodology" className="font-medium text-accent hover:underline">
              methodology
            </Link>
            . To look a molecule up directly, start from the{" "}
            <Link href="/" className="font-medium text-accent hover:underline">
              hormone monographs
            </Link>{" "}
            or the{" "}
            <Link href="/compare" className="font-medium text-accent hover:underline">
              analog comparisons
            </Link>
            .
          </p>
        </Container>

        <section className="border-t border-ink/10 bg-panel/40" aria-labelledby="tools-faq-title">
          <Container className="py-10 sm:py-14">
            <h2 id="tools-faq-title" className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
              Before you start
            </h2>
            <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {FAQS.map((faq) => (
                <div key={faq.q} className="min-w-0">
                  <dt className="font-display text-base font-semibold leading-snug">{faq.q}</dt>
                  <dd className="mt-2 max-w-prose text-sm leading-6 text-secondary">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
