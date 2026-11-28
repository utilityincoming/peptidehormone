import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { addContact, isValidEmail, newsletterConfig, newsletterEnabled } from "./newsletter";

describe("newsletter config", () => {
  it("is off unless both key and audience are set", () => {
    assert.equal(newsletterEnabled(newsletterConfig({})), false);
    assert.equal(newsletterEnabled(newsletterConfig({ RESEND_API_KEY: "re_x" })), false);
    assert.equal(newsletterEnabled(newsletterConfig({ NEWSLETTER_AUDIENCE_ID: "aud" })), false);
    assert.equal(
      newsletterEnabled(newsletterConfig({ RESEND_API_KEY: "re_x", NEWSLETTER_AUDIENCE_ID: "aud" })),
      true,
    );
  });

  it("does not store when disabled", async () => {
    const r = await addContact("x@y.z", newsletterConfig({}));
    assert.deepEqual(r, { stored: false });
  });
});

describe("email validation", () => {
  it("accepts a plausible address", () => {
    assert.equal(isValidEmail("a@b.co"), true);
  });
  it("rejects malformed and over-long addresses", () => {
    assert.equal(isValidEmail("nope"), false);
    assert.equal(isValidEmail("a@b"), false);
    assert.equal(isValidEmail("a b@c.d"), false);
    assert.equal(isValidEmail(""), false);
    assert.equal(isValidEmail(`${"a".repeat(250)}@b.co`), false);
  });
});
