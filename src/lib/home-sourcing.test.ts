import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getVendor, AFFILIATE_REL } from "./affiliate";

const home = readFileSync("src/app/page.tsx", "utf8");

test("homepage omits the AminoClub affiliate promotion", () => {
  assert.doesNotMatch(home, /aminoclub|home-sourcing-title|<AffiliateLink/i);
});

test("AminoClub storefront retains the affiliate parameters and link attributes", () => {
  const vendor = getVendor("aminoclub")!;
  const url = new URL(vendor.home);
  assert.equal(url.hostname, "aminoclub.com");
  assert.equal(url.searchParams.get("code"), vendor.code);
  assert.equal(url.searchParams.get("utm_source"), "affiliate_marketing");
  for (const rel of ["sponsored", "nofollow", "noopener", "noreferrer"]) assert.ok(AFFILIATE_REL.split(" ").includes(rel));
});
