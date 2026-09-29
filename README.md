# PeptideHormone.com

An editorially independent, research-grade reference on the peptide hormone
system — mechanisms, pharmacokinetics, bench calculators, and long-form
deep-dives, with every entry graded by source quality. Educational only; not
medical advice.

Built with [Next.js](https://nextjs.org) (App Router), React 19, TypeScript,
and Tailwind CSS v4. Content is authored as typed data in `src/lib` and
statically rendered.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Requires Node 20+.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack). |
| `npm run build` | Production build (Turbopack). |
| `npm run start` | Serve the production build. |
| `npm run lint` | ESLint (flat config, `eslint-config-next`). |
| `npm test` | Unit tests — runs every `src/lib/*.test.ts` under `tsx --test`. |
| `npm run check:identifiers` | Verify external-identifier data is resolvable (see below). |
| `npm run evidence:refresh` | Refresh live trial/literature counts (see below). |

Before pushing, the pre-flight is: `npm test`, `npm run lint`, `npx tsc --noEmit`,
`npm run build`.

## Project layout

```
src/
  app/                      App Router routes
    page.tsx                Home
    catalog/                Molecule catalog (filterable)
    hormones/[slug]/        Per-molecule monographs
    families/[slug]/        Signaling-family hubs
    insights/<slug>/        Hand-authored long-form deep-dives (one dir each)
    compare/[pair]/         Pairwise analog comparisons
    tools/                  Half-life calculator, comparison, cycle planner
    available/[vendor]/     Sourcing / availability
    glossary/               Glossary of peptide-science terms
    search/                 Site-wide search results page
    api/chat/               Research-agent endpoint (server-side Anthropic key)
    sitemap.ts, robots.ts, llms.txt/  Machine-readable surfaces
  components/               Shared UI (site chrome, browsers, figures, search)
  lib/                      Typed content + domain logic (see below)
scripts/                    Data-refresh + verification scripts (node .mjs)
public/                     Static assets
```

## Content model

All content lives as typed data in `src/lib`, so pages are derived rather than
hand-maintained per route:

- `hormones.ts` — the molecule monographs (~70+), each keyed by slug and
  backreferencing its family. The `Hormone` interface documents every field.
- `families.ts` — the signaling families that group the catalog.
- `insights.ts` — deep-dive **metadata + cross-links**; each article *body* is a
  hand-authored page under `src/app/insights/<slug>/` for full control over
  diagrams and layout.
- `glossary.ts` — glossary terms, emitted as schema.org `DefinedTerm`s with
  verified Wikipedia/Wikidata anchors.
- `aliases.ts` — search/alias synonyms per molecule.
- `evidence/`, `evidence-live.ts`, `hormone-evidence.ts`, `adverse-live.ts` —
  the evidence-grading model and the live-count blocks.
- `compare*.ts`, `cycle-planner.ts` — logic behind the tools.
- `search.ts` — the site-wide search index and ranking (see below).
- `jsonld.ts`, `meta.ts`, `og.tsx`, `identifiers.ts`, `references.ts` — SEO,
  structured data, OG images, and knowledge-graph grounding.

Unit tests sit next to the modules they cover (`*.test.ts`) and run in CI-style
via `npm test`.

### Adding a molecule

Add an entry to the `BASE` array in `src/lib/hormones.ts` (fill the fields the
`Hormone` interface documents) and give it a `family` that exists in
`families.ts`. Its monograph, catalog card, sitemap entry, and search record are
derived automatically. Run `npm run check:identifiers` and, if it maps to a
public entity, add its external identifiers so the JSON-LD can cite it.

### Adding an insight

Register metadata in `src/lib/insights.ts` (newest-first) and author the body at
`src/app/insights/<slug>/page.tsx`. Set `hormones` so the piece surfaces in each
molecule's "Go deeper" sidebar.

## Search

Site-wide search is a single flat index assembled at module load from every
content source (molecules, insights, families, glossary terms, tools, pages) and
scored by a small dependency-free ranker in `src/lib/search.ts`. The same index
and scorer back both surfaces, so results match with or without JavaScript:

- the header **command palette** (`⌘K` / `Ctrl-K`, or `/`), and
- the server-rendered **`/search`** results page (shareable `?q=` URLs).

New catalog entries are indexed automatically — nothing to wire up.

## Live evidence data

Two aspects of each monograph are *retrieval-stamped* rather than asserted:

- `npm run evidence:refresh` (`scripts/fetch-evidence.mjs`) pulls current
  registered-trial and literature counts from public registries.
- `scripts/fetch-adverse-events.mjs` pulls FAERS pharmacovigilance counts from
  openFDA.

These are **search hits, not curated verdicts** — a count says how much work
exists, not how good it is. See `/methodology`. `scripts/fetch-identifiers.mjs`
(`--check` via `npm run check:identifiers`) resolves authoritative external
identifiers (Wikidata, PubChem, DrugBank, ChEBI, UniProt, ChEMBL, CAS) so pages
can carry `sameAs` links; nothing is guessed.

## Research agent

`/api/chat` runs a small, hardened agentic loop over domain tools
(`src/lib/agent-tools.ts`). The Anthropic key stays server-side; the client
calls the same-origin route. Effort and debug are controlled by `AGENT_EFFORT`
and `AGENT_DEBUG` env vars.

## Security

`next.config.ts` sets a strict Content-Security-Policy and the usual security
headers (HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`,
`Referrer-Policy`, COOP, a locked-down `Permissions-Policy`). Fonts are
self-hosted via `next/font`; no remote images, iframes, or `unsafe-eval`.

## Deployment

Deployed on Vercel. Any push builds; `main` is production.
