import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const read = (path: string) => readFileSync(path, "utf8");
test("oxytocin plate declares chemical identity, coordinate provenance and conceptual limits", () => {
  assert.ok(existsSync("src/lib/structures/oxytocin-signal.json"), "deposited oxytocin projection is required");
  const data = JSON.parse(read("src/lib/structures/oxytocin-signal.json"));
  assert.equal(data.pdb, "7RYC");
  assert.equal(data.sequence, "CYIQNCPLG");
  assert.equal(data.peptide.length, 9);
  assert.deepEqual(data.disulfide, [1, 6]);
  assert.equal(data.receptorResidues, 285);
  assert.match(data.sourceSha256, /^[a-f0-9]{64}$/);
  const component = read("src/components/SequenceSignalHero.tsx");
  for (const term of ["Cys1–Cys6", "Gly9", "precursor", "schematic", "not a folding trajectory", "miniG", "aria-describedby", "<details", "<summary"]) assert.ok(component.includes(term), term);
  assert.doesNotMatch(component, /use client|useEffect|setInterval/);
});
test("homepage replaces the hero subject without losing the sourced retatrutide component", () => {
  const home = read("src/app/page.tsx");
  const hero = home.slice(home.indexOf('{/* ── Hero'), home.indexOf('{/* ── At a glance'));
  assert.match(hero, /SequenceSignalHero/);
  assert.doesNotMatch(hero, /Retatrutide|retatrutide|StructureHero/);
  assert.ok(existsSync("src/components/StructureHero.tsx"));
  assert.match(home, /Retatrutide is not an approved medicine/);
});
