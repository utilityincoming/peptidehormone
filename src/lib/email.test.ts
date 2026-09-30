import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { emailConfig, emailEnabled, passEmailHtml, passEmailText, sendPassEmail } from "./email";

describe("email config", () => {
  it("is off unless both key and sender are set", () => {
    assert.equal(emailEnabled(emailConfig({})), false);
    assert.equal(emailEnabled(emailConfig({ RESEND_API_KEY: "re_x" })), false);
    assert.equal(emailEnabled(emailConfig({ RESEND_API_KEY: "re_x", PASS_EMAIL_FROM: "a@b.c" })), true);
  });

  it("does not send when disabled", async () => {
    const r = await sendPassEmail({ to: "x@y.z", code: "PH-1", researchUrl: "https://e.x/research" }, emailConfig({}));
    assert.deepEqual(r, { sent: false });
  });
});

describe("pass email body", () => {
  const msg = { to: "x@y.z", code: "PH-AAAA-BBBB-CCCC-DDDDDDDD", researchUrl: "https://e.x/research" };
  it("carries the code and link in both parts", () => {
    assert.match(passEmailText(msg), /PH-AAAA-BBBB-CCCC-DDDDDDDD/);
    assert.match(passEmailText(msg), /https:\/\/e\.x\/research/);
    assert.match(passEmailHtml(msg), /PH-AAAA-BBBB-CCCC-DDDDDDDD/);
    assert.match(passEmailHtml(msg), /href="https:\/\/e\.x\/research"/);
  });
  it("escapes html in interpolated values", () => {
    assert.doesNotMatch(passEmailHtml({ ...msg, code: "<b>" }), /<b>/);
  });
});
