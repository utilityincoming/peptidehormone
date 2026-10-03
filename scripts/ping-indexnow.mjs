#!/usr/bin/env node
/**
 * IndexNow ping.
 *
 *   npm run indexnow:ping
 *   npm run indexnow:ping -- --dry-run
 *
 * Fetches the live sitemap, extracts every <loc>, and submits the list to
 * api.indexnow.org so Bing, Yandex, Naver, Seznam and Yep recrawl promptly.
 * Runs after each production deploy (see .github/workflows/indexnow.yml).
 *
 * The key is public by design: IndexNow verifies ownership by fetching
 * https://<host>/<key>.txt, which lives in public/. Override with INDEXNOW_KEY
 * or SITE_URL if either ever changes.
 */

const SITE_URL = (process.env.SITE_URL ?? "https://peptidehormone.com").replace(/\/+$/, "");
const KEY = process.env.INDEXNOW_KEY ?? "19dc04ce072747bd87d8ae51743928f5";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH = 10_000; // protocol maximum per POST
const DRY_RUN = process.argv.includes("--dry-run");

const host = new URL(SITE_URL).host;

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": "peptidehormone-indexnow/1.0" } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

/** Collect <loc> values, following sitemap index files one level deep. */
async function sitemapUrls(url) {
  const xml = await fetchText(url);
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (/<sitemapindex[\s>]/.test(xml)) {
    const nested = await Promise.all(locs.map(sitemapUrls));
    return nested.flat();
  }
  return locs;
}

async function main() {
  // Confirm the key file is live before submitting; a mismatch makes every
  // submission silently worthless.
  const keyUrl = `${SITE_URL}/${KEY}.txt`;
  const served = (await fetchText(keyUrl)).trim();
  if (served !== KEY) throw new Error(`Key file at ${keyUrl} does not match INDEXNOW_KEY`);

  const all = await sitemapUrls(`${SITE_URL}/sitemap.xml`);
  const urls = [...new Set(all)].filter((u) => {
    try { return new URL(u).host === host; } catch { return false; }
  });
  if (urls.length === 0) throw new Error("Sitemap yielded no URLs for this host");
  console.log(`Sitemap: ${urls.length} URLs on ${host}`);

  if (DRY_RUN) {
    console.log("Dry run — not submitting. First few:");
    for (const u of urls.slice(0, 5)) console.log(`  ${u}`);
    return;
  }

  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: KEY, keyLocation: keyUrl, urlList }),
    });
    // 200 = ok, 202 = accepted pending key validation. Anything else is a problem.
    const label = `batch ${i / BATCH + 1} (${urlList.length} URLs)`;
    if (res.status === 200 || res.status === 202) {
      console.log(`  ✔ ${label}: HTTP ${res.status}`);
    } else {
      const body = (await res.text()).slice(0, 300);
      throw new Error(`${label}: HTTP ${res.status} ${body}`);
    }
  }
}

main().catch((err) => {
  console.error(`✖ IndexNow ping failed: ${err.message}`);
  process.exit(1);
});
