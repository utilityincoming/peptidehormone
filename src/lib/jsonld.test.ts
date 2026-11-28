import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hormoneLd } from "./jsonld";
import { HORMONES, getHormone } from "./hormones";
import { getFamily } from "./families";

type Node = Record<string, unknown>;

function graphOf(data: unknown): Node[] {
  const g = (data as { "@graph"?: Node[] })["@graph"];
  assert.ok(Array.isArray(g), "expected an @graph array");
  return g;
}

function substanceOf(data: unknown): Node {
  const node = graphOf(data).find((n) => n["@type"] === "ChemicalSubstance");
  assert.ok(node, "expected a ChemicalSubstance node");
  return node!;
}

function props(node: Node): Node[] {
  const p = node.additionalProperty;
  return Array.isArray(p) ? (p as Node[]) : [];
}

describe("hormoneLd: evidence tier", () => {
  it("carries the explicit tier as a text PropertyValue", () => {
    const h = HORMONES.find((x) => x.evidence)!;
    const sub = substanceOf(hormoneLd(h, getFamily(h.family)));
    const tier = props(sub).find((p) => p.name === "evidence tier");
    assert.ok(tier, "expected an 'evidence tier' property");
    assert.equal(tier!.value, h.evidence);
    assert.equal(typeof tier!.description, "string");
  });

  it("gives every catalog molecule a tier property matching its displayed grade", () => {
    for (const h of HORMONES) {
      const sub = substanceOf(hormoneLd(h, getFamily(h.family)));
      const tier = props(sub).find((p) => p.name === "evidence tier");
      assert.ok(tier, `${h.slug} is missing an 'evidence tier' property`);
      // The page shows `h.evidence ?? "Established"`; JSON-LD must mirror it.
      assert.equal(tier!.value, h.evidence ?? "Established");
    }
  });
});

describe("hormoneLd: quantitative properties", () => {
  it("emits molecular weight and half-life when present", () => {
    const h = getHormone("semaglutide")!;
    const sub = substanceOf(hormoneLd(h, getFamily(h.family)));
    const names = props(sub).map((p) => p.name);
    if (h.mw) assert.ok(names.includes("molecular weight"));
    if (h.halfLife) assert.ok(names.includes("half-life"));
  });
});

describe("hormoneLd: scope", () => {
  it("never emits Product or Offer schema (educational, not commercial)", () => {
    for (const h of HORMONES) {
      const json = JSON.stringify(hormoneLd(h, getFamily(h.family)));
      assert.ok(!json.includes('"Product"'), `${h.slug} must not carry Product schema`);
      assert.ok(!json.includes('"Offer"'), `${h.slug} must not carry Offer schema`);
    }
  });
});
