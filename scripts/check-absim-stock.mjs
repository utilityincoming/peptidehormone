#!/usr/bin/env node
/**
 * Guard against STOCKED drift in src/lib/affiliate.ts.
 *
 * The sourcing note is data-gated on the STOCKED map — a hand-maintained mirror of
 * ABSIM's live inventory. This keeps that promise ("never link a dead shelf")
 * enforceable instead of relying on someone remembering. It fetches the live shop
 * and reports:
 *
 *   A. STOCKED entries now out of stock / delisted  -> a dead-shelf link  (EXIT 1)
 *   B. "pending" entries (commented in affiliate.ts) back in stock -> restore them
 *   C. in-stock ABSIM products not mapped and not deliberately skipped -> coverage
 *
 * No dependencies. Node 18+ (global fetch). Run: node scripts/check-absim-stock.mjs
 * Exits 1 on any Check-A dead-shelf link, 2 if ABSIM can't be reached/parsed, else 0.
 *
 * Note: sets process.exitCode rather than calling process.exit(), which on Windows
 * can trip a libuv assertion while fetch's keep-alive socket is still tearing down.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SHOP = "https://absimpeptides.com/shop/";
// ABSIM sits behind bot protection that 403s a bare fetch; a real browser UA passes.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

// ABSIM products we've deliberately chosen NOT to catalog — blends/stacks, a
// non-peptide coenzyme, a reconstitution supply, and obscure compounds. Listing them
// keeps Check C quiet about known-skips so it only surfaces genuinely new coverage.
const IGNORE = new Set([
  "glow-70mg",
  "klow-80mg",
  "cjc-no-dac-ipamorelin-blend-5mg",
  "bpc-157-with-thymosin-beta-4-10mg", // blends / stacks, not single molecules
  "nad-500mg", // a coenzyme, not a peptide hormone
  "bacteriostatic-water", // reconstitution supply
  "asp-2p-60mg",
  "asp-3p", // obscure / thin literature
]);

const productPath = (url) => (url.match(/\/product\/([a-z0-9-]+)\//) || [])[1] || null;

const section = (title, items) => {
  if (!items.length) return console.log(`✓ ${title}: none`);
  console.log(`• ${title}:`);
  for (const i of items) console.log(`    ${i}`);
};

async function main() {
  // ── Source of truth: parse STOCKED (+ commented "pending") from affiliate.ts ──
  const affiliateSrc = readFileSync(join(ROOT, "src/lib/affiliate.ts"), "utf8");
  const STOCKED = {}; // catalogSlug -> ABSIM product path (active link)
  const PENDING = {}; // catalogSlug -> ABSIM product path (commented, awaiting restock)
  for (const line of affiliateSrc.split("\n")) {
    const m = line.match(/^(\s*\/\/\s*)?\s*"([a-z0-9-]+)":\s*`([^`]+)`/);
    if (!m) continue;
    const path = productPath(m[3]);
    if (path) (m[1] ? PENDING : STOCKED)[m[2]] = path;
  }

  // Catalog slugs — used only to hint at which molecule an unmapped product might be.
  const catalog = new Set(
    [...readFileSync(join(ROOT, "src/lib/hormones.ts"), "utf8").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map(
      (m) => m[1],
    ),
  );

  // ── Live shop ──
  let html;
  try {
    const res = await fetch(SHOP, { headers: { "user-agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
  } catch (e) {
    console.error(`✗ Could not reach ABSIM shop (${e.message}). Not treating as drift.`);
    return 2;
  }

  const live = {}; // ABSIM product path -> "instock" | "outofstock"
  for (const m of html.matchAll(/<li[^>]*\b(instock|outofstock)\b[^>]*>[\s\S]{0,700}?\/product\/([a-z0-9-]+)\//g)) {
    if (!(m[2] in live)) live[m[2]] = m[1];
  }
  if (Object.keys(live).length === 0) {
    console.error("✗ Parsed 0 products from ABSIM — the shop markup likely changed. Update the parser.");
    return 2;
  }

  // ── Checks ──
  const dead = []; // A: STOCKED but not buyable  (fails the run)
  const restocked = []; // B: pending item back in stock
  const opportunities = []; // C: in-stock, unmapped, not deliberately skipped

  for (const [slug, path] of Object.entries(STOCKED)) {
    const s = live[path];
    if (s === undefined) dead.push(`${slug}  →  ${path}   (delisted from ABSIM — remove from STOCKED)`);
    else if (s === "outofstock") dead.push(`${slug}  →  ${path}   (OUT OF STOCK — move to a commented "pending" line)`);
  }
  for (const [slug, path] of Object.entries(PENDING)) {
    if (live[path] === "instock") restocked.push(`${slug}  →  ${path}   (back IN STOCK — restore its STOCKED line)`);
  }
  const mapped = new Set([...Object.values(STOCKED), ...Object.values(PENDING)]);
  for (const [path, s] of Object.entries(live)) {
    if (s !== "instock" || mapped.has(path) || IGNORE.has(path)) continue;
    const hint = [...catalog].find((c) => path.includes(c));
    opportunities.push(`${path}${hint ? `   (matches catalog "${hint}" — consider linking)` : "   (no catalog monograph yet)"}`);
  }

  // ── Report ──
  console.log(
    `ABSIM stock check — ${Object.keys(live).length} live products · ${Object.keys(STOCKED).length} stocked · ${Object.keys(PENDING).length} pending\n`,
  );
  section("Dead-shelf links (STOCKED but not buyable)", dead);
  section("Restocked pending items", restocked);
  section("Unmapped in-stock products", opportunities);
  console.log("");

  if (dead.length) {
    console.log(`RESULT: ${dead.length} dead-shelf link(s) — fix STOCKED in src/lib/affiliate.ts.`);
    return 1;
  }
  console.log("RESULT: STOCKED is consistent with ABSIM's live stock.");
  return 0;
}

process.exitCode = await main();
