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
