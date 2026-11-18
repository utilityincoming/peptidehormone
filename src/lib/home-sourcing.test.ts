import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getVendor, AFFILIATE_REL } from "./affiliate";

const home = readFileSync("src/app/page.tsx", "utf8");

test("homepage offers a separate, disclosed research sourcing card using the shared referral controls", () => {
  assert.match(home, /aria-labelledby="home-sourcing-title"/);
  assert.match(home, /id="home-sourcing-title"[^>]*>A supplier we link to, disclosed\./);
  assert.match(home, /Browse the supplier’s catalog and review product details at the source\. Copy the code first if you want it applied at checkout\./);
  assert.match(home, /We may earn a commission on purchases through this link\./);
  assert.match(home, /Research-use-only\. Not for human use\./);
  assert.match(home, /Paste at checkout/);
  assert.match(home, /href=\{sourcingVendor.home\}/);
  assert.match(home, /vendor=\{sourcingVendor.key\}/);
  assert.match(home, /surface="line"/);
  assert.match(home, /<CopyCode code=\{sourcingVendor.code\} size="comfortable"/);
  assert.doesNotMatch(home, /<SourcingLine/);
  assert.ok(home.indexOf('aria-labelledby="home-sourcing-title"') > home.indexOf('id="approach"'));
  const vendor = getVendor("aminoclub")!;
  const url = new URL(vendor.home);
  assert.equal(url.hostname, "aminoclub.com");
  assert.equal(url.searchParams.get("code"), vendor.code);
  assert.equal(url.searchParams.get("utm_source"), "affiliate_marketing");
  for (const rel of ["sponsored", "nofollow", "noopener", "noreferrer"]) assert.ok(AFFILIATE_REL.split(" ").includes(rel));
});
