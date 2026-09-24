import { test } from "node:test";
import assert from "node:assert/strict";
import { composeMetaDescription } from "./meta";

const MECH =
  "CRH from the hypothalamus drives pituitary release of ACTH, which stimulates adrenal cortisol. Cortisol feeds back to restrain CRH and ACTH.";

test("short base is enriched toward the target length", () => {
  const d = composeMetaDescription("The apex of the HPA stress axis.", MECH);
  assert.ok(d.length > 120, `too short: ${d.length}`);
  assert.ok(d.length <= 158, `too long: ${d.length}`);
  assert.ok(d.startsWith("The apex of the HPA stress axis."));
});

test("never truncates mid-word", () => {
  const d = composeMetaDescription("The apex of the HPA stress axis.", MECH);
  const bare = d.replace(/…$/, "");
  assert.ok(!/\S…/.test(d) || bare.split(" ").pop()!.length > 0);
  // no dangling connector before an ellipsis
  assert.ok(!/[,;:—–-]…$/.test(d));
});

test("suffix (aliases) is reserved and never dropped or cut", () => {
  const suffix = " Also known as Ozempic, Wegovy, and Rybelsus.";
  const d = composeMetaDescription(
    "A long-acting GLP-1 receptor agonist engineered for once-weekly dosing.",
    "It resists DPP-4 degradation and is dosed once weekly by subcutaneous injection for glycemic control and weight management.",
    { suffix },
  );
  assert.ok(d.endsWith(suffix), "alias suffix must survive intact");
  assert.ok(d.length <= 158, `too long: ${d.length}`);
});

test("already-long base is returned untouched (plus suffix)", () => {
  const base =
    "A dual GIP and GLP-1 receptor agonist and the first of the co-agonists to reach the clinic, now studied well beyond glycemic control for metabolic disease.";
  const d = composeMetaDescription(base, MECH);
  assert.equal(d, base);
});

test("no extra prose leaves base unchanged", () => {
  assert.equal(composeMetaDescription("Just a stub.", undefined), "Just a stub.");
});
