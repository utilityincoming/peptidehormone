import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getVendor, AFFILIATE_REL } from "./affiliate";

const home = readFileSync("src/app/page.tsx", "utf8");

test("homepage labels the AminoClub paid affiliate link before the CTA", () => {
  const card = home.slice(home.indexOf('aria-labelledby="home-sourcing-title"'));
  assert.match(card, /\{sourcingVendor.name\} research catalog/);
  assert.match(card, /Our research supply partner/);
  assert.doesNotMatch(card, /American Peptide network/i);
  assert.match(card, /Research use only\./);
  assert.match(card, /Paid affiliate link/);
  assert.doesNotMatch(card, /We may earn a commission/);
  assert.ok(card.indexOf('id="home-sourcing-disclosure"') < card.indexOf("<AffiliateLink"));
  assert.match(card, /describedBy="home-sourcing-disclosure"/);
  assert.match(card, /href=\{sourcingVendor.home\}/);
  assert.match(card, /surface="home"/);
  assert.match(card, /Checkout code/);
  assert.match(card, /<CopyCode code=\{sourcingVendor.code\} className=\{styles.sourcingCodeButton\}/);
  assert.ok(home.indexOf('aria-labelledby="home-sourcing-title"') > home.indexOf('id="approach"'));
});

test("AminoClub storefront retains the affiliate parameters and link attributes", () => {
  const vendor = getVendor("aminoclub")!;
  const url = new URL(vendor.home);
  assert.equal(url.hostname, "aminoclub.com");
  assert.equal(url.searchParams.get("code"), vendor.code);
  assert.equal(url.searchParams.get("utm_source"), "affiliate_marketing");
  for (const rel of ["sponsored", "nofollow", "noopener", "noreferrer"]) assert.ok(AFFILIATE_REL.split(" ").includes(rel));
});
