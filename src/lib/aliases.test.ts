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

  it("returns the documented media nickname for retatrutide", () => {
    assert.deepEqual(aliasesFor("retatrutide"), ["GLP-3"]);
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

  it("puts GLP-3 in the title for retatrutide", () => {
    const h = getHormone("retatrutide");
    assert.ok(h);
    assert.equal(hormoneMetaTitle(h), "Retatrutide (GLP-3)");
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

  it("leads with the summary and enriches from mechanism when there are no aliases", () => {
    const h = getHormone("glp-1");
    assert.ok(h);
    const desc = hormoneMetaDescription(h);
    assert.ok(desc.startsWith(h.summary), "must lead with the card summary");
    assert.ok(desc.length > h.summary.length, "short summary should be enriched");
    assert.ok(desc.length <= 158, `meta description too long: ${desc.length}`);
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

  it("explains the GLP-3 nickname instead of calling it a brand", () => {
    const h = getHormone("retatrutide");
    assert.ok(h);
    const faqs = hormoneFaq(h);
    const glp3 = faqs.find((f) => /GLP-3/.test(f.q));
    assert.ok(glp3, "expected a GLP-3 FAQ");
    assert.match(glp3.q, /Why is retatrutide called GLP-3/);
    assert.match(glp3.a, /media nickname/i);
    assert.equal(/brand name/i.test(glp3.a), false);
  });
});

describe("hormoneFaq brenipatide code-name queries", () => {
  it("answers What is LY3537031 and the clinical-trials question from existing facts", () => {
    const h = getHormone("brenipatide");
    assert.ok(h);
    const faqs = hormoneFaq(h);
    const code = faqs.find((f) => f.q === "What is LY3537031?");
    assert.ok(code, "expected a LY3537031 FAQ");
    assert.match(code.a, /brenipatide/i);
    assert.match(code.a, /not an amylin analog/i);
    const trials = faqs.find((f) => /clinical trials/i.test(f.q));
    assert.ok(trials, "expected a clinical-trials FAQ");
    assert.match(trials.a, /RENEW/);
    assert.match(trials.a, /asthma/);
    assert.match(trials.a, /not approved/i);
  });
});
