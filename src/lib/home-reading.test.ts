import test from "node:test";
import assert from "node:assert/strict";
import { homeReading } from "./home-reading";
import { INSIGHTS } from "./insights";
import { getFamily } from "./families";

test("homepage reading opens beyond incretins with five distinct registry families", () => {
  const reading = homeReading();
  assert.equal(reading.length, 5);
  assert.equal(new Set(reading.map((post) => post.family)).size, 5);
  assert.notEqual(reading[0].family, "incretins-metabolic");
  for (const post of reading) {
    assert.ok(INSIGHTS.includes(post));
    assert.ok(getFamily(post.family));
  }
});
