import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { statusNote } from "./status-note";

describe("statusNote", () => {
  it("writes the sentence from the table", () => {
    assert.equal(
      statusNote(["retatrutide"]),
      "Investigational, not approved: retatrutide. Status checked November 2026.",
    );
  });

  it("groups by status, unapproved first, and joins names", () => {
    const s = statusNote(["orforglipron", "cagrilintide", "amycretin", "retatrutide"]);
    assert.equal(
      s,
      "Investigational, not approved: cagrilintide, amycretin and retatrutide. Approved in the United States: orforglipron. Status checked November 2026.",
    );
  });

  it("keeps coded and brand-style names as written", () => {
    assert.match(statusNote(["bpc-157", "cagrisema"]), /CagriSema/);
    assert.match(statusNote(["bpc-157"]), /may not be compounded: BPC-157\./);
  });

  it("uses the oldest check among the rows it names", () => {
    assert.match(statusNote(["retatrutide", "humanin"]), /Status checked September 2026\.$/);
  });

  it("says nothing about a native hormone and throws on an unknown key", () => {
    assert.equal(statusNote(["glp-1"]), "");
    assert.throws(() => statusNote(["not-a-molecule"]), /no regulatory row/);
  });

  it("resolves every key used in an article", () => {
    const dir = join(process.cwd(), "src/app/insights");
    let seen = 0;
    for (const slug of readdirSync(dir)) {
      const file = join(dir, slug, "page.tsx");
      if (!existsSync(file)) continue;
      for (const m of readFileSync(file, "utf8").matchAll(/<StatusNote of=\{\[([^\]]*)\]\}/g)) {
        const keys = [...m[1].matchAll(/"([^"]+)"/g)].map((k) => k[1]);
        assert.ok(keys.length > 0, slug);
        assert.doesNotThrow(() => statusNote(keys), slug);
        seen += 1;
      }
    }
    assert.ok(seen >= 10, `expected the disclaimers to use StatusNote, found ${seen}`);
  });
});
