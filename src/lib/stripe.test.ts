import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { keyModeMismatch } from "./stripe";

describe("keyModeMismatch", () => {
  it("is null when both keys are test", () => {
    assert.equal(keyModeMismatch("pk_test_abc", "sk_test_abc"), null);
  });
  it("is null when both keys are live", () => {
    assert.equal(keyModeMismatch("pk_live_abc", "sk_live_abc"), null);
  });
  it("is null when either key is missing or unrecognised", () => {
    assert.equal(keyModeMismatch(undefined, "sk_test_abc"), null);
    assert.equal(keyModeMismatch("pk_test_abc", undefined), null);
    assert.equal(keyModeMismatch("nonsense", "sk_test_abc"), null);
  });
  it("names both modes when they differ", () => {
    const msg = keyModeMismatch(" pk_live_abc ", "sk_test_abc");
    assert.match(msg ?? "", /PUBLISHABLE_KEY is live/);
    assert.match(msg ?? "", /SECRET_KEY is test/);
  });
});
