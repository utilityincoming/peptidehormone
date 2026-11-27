import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/stripe-webhook/route";

test("unsigned webhook is refused when STRIPE_WEBHOOK_SECRET is unset", async () => {
  const previous = process.env.STRIPE_WEBHOOK_SECRET;
  delete process.env.STRIPE_WEBHOOK_SECRET;
  try {
    const res = await POST(
      new Request("https://peptidehormone.com/api/stripe-webhook", {
        method: "POST",
        body: JSON.stringify({ type: "checkout.session.completed" }),
      }),
    );
    assert.equal(res.status, 500);
  } finally {
    if (previous === undefined) delete process.env.STRIPE_WEBHOOK_SECRET;
    else process.env.STRIPE_WEBHOOK_SECRET = previous;
  }
});
