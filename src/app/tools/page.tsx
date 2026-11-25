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
    blurb: "Model how concentration changes over time and how repeated doses accumulate.",
    tag: "Pharmacokinetics",
    accent: "text-accent",
    preview: "half-life",
    action: "Model half-life",
  },
  {
    href: "/tools/compare",
    name: "Analog comparison",
    blurb: "Compare native hormones and their analogs by receptor, half-life, molecular weight, and evidence tier.",
    tag: "Structure–activity",
    accent: "text-accent-teal",
    preview: "compare",
    action: "Compare analogs",
  },
  {
    href: "/tools/cycle-planner",
    name: "Cycle planner",
    blurb: "Read a research timeline alongside each compound’s receptor, half-life evidence, and reference range.",
    tag: "Research timelines",
    accent: "text-accent-amber",
    preview: "cycle",
    action: "Open cycle planner",
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
                Model half-life, compare analogs, or explore a research timeline.
              </p>
            </div>
            <p className="max-w-xs border-l border-ink/15 pl-4 text-sm leading-6 text-secondary">
              Free browser tools for research and learning. No sign-up required.
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
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
