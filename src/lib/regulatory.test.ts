import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { HORMONES, getHormone, hormoneFaq } from "./hormones";
import {
  REGULATORY,
  REGULATORY_STATUSES,
  REGULATORY_AS_OF,
  regulatoryFor,
  regulatoryFaq,
  uncoveredSlugs,
  formatAsOf,
} from "./regulatory";

describe("regulatory table", () => {
  it("covers every molecule in the catalog", () => {
    assert.deepEqual(uncoveredSlugs(HORMONES), []);
  });

  it("has no rows for slugs that are not in the catalog", () => {
    const slugs = new Set(HORMONES.map((h) => h.slug));
    const orphans = Object.keys(REGULATORY).filter((s) => !slugs.has(s));
    assert.deepEqual(orphans, []);
  });

  it("uses only known statuses and gives every row a basis", () => {
    for (const [slug, row] of Object.entries(REGULATORY)) {
      assert.ok(REGULATORY_STATUSES.includes(row.status), `${slug}: ${row.status}`);
      assert.ok(row.basis.trim().length > 20, `${slug}: basis too short`);
    }
  });

  it("carries a review month in YYYY-MM form", () => {
    assert.match(REGULATORY_AS_OF, /^\d{4}-(0[1-9]|1[0-2])$/);
    assert.match(formatAsOf(REGULATORY_AS_OF), /^[A-Z][a-z]+ \d{4}$/);
  });

  it("grades approved analogs and restricted research peptides as expected", () => {
    assert.equal(regulatoryFor("semaglutide")?.status, "approved");
    assert.equal(regulatoryFor("bpc-157")?.status, "restricted");
    assert.equal(regulatoryFor("glp-1")?.status, "endogenous");
    assert.equal(regulatoryFor("not-a-molecule"), undefined);
  });
});

describe("regulatoryFaq", () => {
  it("answers yes for an approved product and names the basis", () => {
    const h = getHormone("semaglutide");
    assert.ok(h);
    const f = regulatoryFaq(h);
    assert.ok(f);
    assert.equal(f.q, "Is Semaglutide FDA-approved?");
    assert.match(f.a, /^Yes/);
    assert.match(f.a, /Wegovy/);
  });

  it("answers no for a compounding-restricted peptide", () => {
    const h = getHormone("bpc-157");
    assert.ok(h);
    const f = regulatoryFaq(h);
    assert.ok(f);
    assert.match(f.a, /^No/);
    assert.match(f.a, /Category 2/);
  });

  it("is included in the monograph FAQ before the brand question", () => {
    const h = getHormone("semaglutide");
    assert.ok(h);
    const qs = hormoneFaq(h).map((f) => f.q);
    const reg = qs.findIndex((q) => q.startsWith("Is Semaglutide FDA-approved"));
    assert.ok(reg >= 0);
    assert.equal(qs.indexOf("What is the half-life of Semaglutide?") < reg, true);
  });
});
