import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { aliasesFor, hormoneMetaTitle, hormoneMetaDescription } from "./aliases";
import { getHormone, hormoneFaq } from "./hormones";

describe("aliasesFor", () => {
  it("returns verified brand names for semaglutide", () => {
    assert.deepEqual(aliasesFor("semaglutide"), ["Ozempic", "Wegovy", "Rybelsus"]);
  });

  it("returns verified brand names for tirzepatide", () => {
    assert.deepEqual(aliasesFor("tirzepatide"), ["Mounjaro", "Zepbound"]);
  });

  it("returns empty for endogenous GLP-1 (no brand)", () => {
    assert.deepEqual(aliasesFor("glp-1"), []);
  });

  it("never invents aliases for unknown slugs", () => {
    assert.deepEqual(aliasesFor("not-a-molecule"), []);
  });
});

describe("hormoneMetaTitle", () => {
  it("puts brand names in the title for semaglutide", () => {
    const h = getHormone("semaglutide");
    assert.ok(h);
    const title = hormoneMetaTitle(h);
    assert.match(title, /Semaglutide/);
    assert.match(title, /Ozempic/);
    assert.match(title, /Wegovy/);
    assert.match(title, /Rybelsus/);
  });

  it("keeps the existing name (abbr) title when there are no aliases", () => {
    const h = getHormone("glp-1");
    assert.ok(h);
    assert.equal(hormoneMetaTitle(h), "Glucagon-like peptide-1 (GLP-1)");
  });
});

describe("hormoneMetaDescription", () => {
  it("appends brand names to the summary for analog pages", () => {
    const h = getHormone("semaglutide");
    assert.ok(h);
    const desc = hormoneMetaDescription(h);
    assert.match(desc, /Ozempic/);
    assert.ok(desc.startsWith(h.summary));
  });

  it("is just the summary when there are no aliases", () => {
    const h = getHormone("glp-1");
    assert.ok(h);
    assert.equal(hormoneMetaDescription(h), h.summary);
  });
});

describe("hormoneFaq brand question", () => {
  it("adds an 'also known as' question when aliases exist", () => {
    const h = getHormone("semaglutide");
    assert.ok(h);
    const qs = hormoneFaq(h).map((f) => f.q);
    assert.ok(qs.some((q) => /Ozempic|Wegovy|Rybelsus/.test(q)));
  });

  it("does not add a brand question when there are no aliases", () => {
    const h = getHormone("glp-1");
    assert.ok(h);
    const qs = hormoneFaq(h).map((f) => f.q);
    assert.equal(qs.some((q) => /also known as|brand name/i.test(q)), false);
  });
});
