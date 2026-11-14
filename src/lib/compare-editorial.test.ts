import assert from "node:assert/strict";
import { test } from "node:test";
import { getHormone } from "./hormones";
import { compareFaq, compareMetaTitle, compareMetaDescription } from "./compare";

const bpc = getHormone("bpc-157")!;
const tb = getHormone("tb-500")!;

test("BPC/TB comparison supplies evidence-specific FAQs and metadata in both directions", () => {
  for (const [a, b] of [[bpc, tb], [tb, bpc]]) {
    const faqs = compareFaq(a, b);
    assert.ok(faqs.some((f) => /stack|together/i.test(f.q)), "must address combination claims");
    assert.ok(faqs.some((f) => /thymosin/i.test(f.q)), "must distinguish fragment from parent");
    assert.ok(faqs.some((f) => /safer|side effects/i.test(f.q)), "must explain safety uncertainty");
    assert.ok(!faqs.some((f) => /signals at/.test(f.a)));
    assert.match(compareMetaTitle(a, b), /evidence/i);
    assert.match(compareMetaDescription(a, b), /human/i);
  }
  assert.deepEqual(compareFaq(bpc, tb), compareFaq(tb, bpc));
});

const sema = getHormone("semaglutide")!;
const tirz = getHormone("tirzepatide")!;

test("semaglutide/tirzepatide comparison supplies GI-specific FAQs and metadata in both directions", () => {
  for (const [a, b] of [[sema, tirz], [tirz, sema]]) {
    const faqs = compareFaq(a, b);
    assert.ok(faqs.some((f) => /digestion|stomach|gastric/i.test(f.q)), "must address gastric slowing");
    assert.ok(faqs.some((f) => /constipation|diarrhea/i.test(f.q)), "must address the bowel experience");
    assert.ok(faqs.some((f) => /GLP-3|retatrutide|next/i.test(f.q)), "must address the next generation");
    assert.ok(!faqs.some((f) => /signals at/.test(f.a)), "must not fall back to the generic FAQ");
    assert.match(compareMetaDescription(a, b), /gastric|gut/i);
  }
  assert.deepEqual(compareFaq(sema, tirz), compareFaq(tirz, sema));
});
