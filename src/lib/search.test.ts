import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildSearchIndex,
  searchRecords,
  SEARCH_INDEX,
  type SearchRecord,
} from "./search";

describe("buildSearchIndex", () => {
  it("indexes every content source", () => {
    const kinds = new Set(SEARCH_INDEX.map((r) => r.kind));
    for (const kind of ["Hormone", "Insight", "Family", "Term", "Tool"]) {
      assert.ok(kinds.has(kind as SearchRecord["kind"]), `missing kind ${kind}`);
    }
  });

  it("gives every record a unique id and an internal href", () => {
    const ids = new Set<string>();
    for (const r of SEARCH_INDEX) {
      assert.ok(!ids.has(r.id), `duplicate id ${r.id}`);
      ids.add(r.id);
      assert.ok(r.href.startsWith("/"), `href not internal: ${r.href}`);
      assert.ok(r.title.length > 0);
    }
  });

  it("is deterministic", () => {
    assert.equal(buildSearchIndex().length, SEARCH_INDEX.length);
  });
});

describe("searchRecords", () => {
  it("returns nothing for a blank query", () => {
    assert.deepEqual(searchRecords(""), []);
    assert.deepEqual(searchRecords("   "), []);
  });

  it("finds a molecule by name", () => {
    const results = searchRecords("semaglutide");
    assert.ok(results.length > 0);
    assert.equal(results[0].kind, "Hormone");
    assert.match(results[0].href, /^\/hormones\//);
    assert.match(results[0].title.toLowerCase(), /semaglutide/);
  });

  it("matches an abbreviation held only in keywords", () => {
    const results = searchRecords("GLP-1");
    assert.ok(results.some((r) => r.href === "/hormones/glp-1"));
  });

  it("requires every token to match (AND semantics)", () => {
    const results = searchRecords("semaglutide zzzznotaword");
    assert.equal(results.length, 0);
  });

  it("ranks an exact title hit above a subtitle-only hit", () => {
    const index: SearchRecord[] = [
      {
        id: "a",
        kind: "Term",
        title: "unrelated",
        subtitle: "mentions insulin in passing",
        href: "/a",
        keywords: "",
        weight: 2,
      },
      {
        id: "b",
        kind: "Hormone",
        title: "insulin",
        subtitle: "the anabolic master switch",
        href: "/b",
        keywords: "",
        weight: 5,
      },
    ];
    const results = searchRecords("insulin", index);
    assert.equal(results[0].id, "b");
  });

  it("honours the limit option", () => {
    const results = searchRecords("the", SEARCH_INDEX, { limit: 3 });
    assert.ok(results.length <= 3);
  });
});
