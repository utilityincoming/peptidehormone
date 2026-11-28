import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ALL_TERMS, termBySlug } from "./glossary";

describe("termBySlug", () => {
  it("resolves every term by its own slug", () => {
    for (const t of ALL_TERMS) {
      assert.equal(termBySlug(t.slug), t, `expected ${t.slug} to resolve to itself`);
    }
  });

  it("returns undefined for an unknown slug", () => {
    assert.equal(termBySlug("not-a-real-term"), undefined);
  });

  it("covers the terms the monograph links inline", () => {
    for (const slug of ["prohormone", "acylation", "evidence-tier", "research-use-only"]) {
      assert.ok(termBySlug(slug), `monograph term "${slug}" must exist in the glossary`);
    }
  });
});
