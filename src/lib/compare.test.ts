import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  comparePairPath,
  parseComparePair,
  staticComparePairs,
  compareFaq,
} from "./compare";
import { HORMONES, getHormone } from "./hormones";

describe("comparePairPath", () => {
  it("builds a-vs-b from two slugs", () => {
    assert.equal(comparePairPath("semaglutide", "tirzepatide"), "semaglutide-vs-tirzepatide");
  });
});

describe("parseComparePair", () => {
  it("parses a pair slug into two catalog slugs", () => {
    assert.deepEqual(parseComparePair("semaglutide-vs-tirzepatide"), [
      "semaglutide",
      "tirzepatide",
    ]);
  });

  it("parses slugs that themselves contain hyphens", () => {
    assert.deepEqual(parseComparePair("maridebart-cafraglutide-vs-tirzepatide"), [
      "maridebart-cafraglutide",
      "tirzepatide",
    ]);
  });

  it("rejects unknown molecules", () => {
    assert.equal(parseComparePair("semaglutide-vs-unicorn"), null);
  });

  it("rejects comparing a molecule to itself", () => {
    assert.equal(parseComparePair("semaglutide-vs-semaglutide"), null);
  });

  it("rejects more than one vs separator", () => {
    assert.equal(parseComparePair("glp-1-vs-semaglutide-vs-tirzepatide"), null);
  });
});

describe("staticComparePairs", () => {
  const pairs = staticComparePairs();
  const catalog = new Set(HORMONES.map((h) => h.slug));
  const has = (a: string, b: string) =>
    pairs.some(([x, y]) => x === a && y === b);

  it("includes the high-intent semaglutide vs tirzepatide pair", () => {
    assert.ok(has("semaglutide", "tirzepatide"));
  });

  it("includes native vs analog lineage pairs", () => {
    assert.ok(has("glp-1", "semaglutide"));
  });

  it("includes sibling analog pairs in a lineage", () => {
    assert.ok(has("semaglutide", "liraglutide"));
  });

  it("includes cjc-1295 vs ipamorelin even though they have different parents", () => {
    assert.ok(has("cjc-1295", "ipamorelin"));
  });

  it("includes bpc-157 vs tb-500", () => {
    assert.ok(has("bpc-157", "tb-500"));
  });

  it("emits both directions of each pair", () => {
    assert.ok(has("tirzepatide", "semaglutide"));
    assert.ok(has("semaglutide", "glp-1"));
  });

  it("does not emit a pair of a molecule with itself", () => {
    for (const [a, b] of pairs) assert.notEqual(a, b);
  });

  it("only emits slugs that exist in the catalog", () => {
    for (const [a, b] of pairs) {
      assert.ok(catalog.has(a), a);
      assert.ok(catalog.has(b), b);
    }
  });
});

describe("compareFaq", () => {
  it("is composed only from each molecule's existing fields", () => {
    const a = getHormone("semaglutide");
    const b = getHormone("tirzepatide");
    assert.ok(a && b);
    const faqs = compareFaq(a, b);
    assert.ok(faqs.length >= 1);
    const blob = faqs.map((f) => f.a).join(" ");
    assert.match(blob, /semaglutide/i);
    assert.match(blob, /tirzepatide/i);
    assert.match(blob, new RegExp(a.receptor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  });
});
