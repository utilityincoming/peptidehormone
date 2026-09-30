import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  bumpQuota,
  cookieHeader,
  hasPass,
  issuePass,
  meteringEnabled,
  mintCode,
  verifyMintedCode,
  passConfig,
  quotaCookieValue,
  readQuota,
  redeemCode,
  remaining,
  seal,
  unseal,
  utcDay,
} from "./pass";

const SECRET = "test-secret";
const T0 = Date.UTC(2026, 8, 30, 12, 0, 0); // 2026-09-30 noon UTC
const T_NEXT_DAY = T0 + 13 * 60 * 60 * 1000; // 2026-10-01 01:00 UTC

describe("passConfig", () => {
  it("is off with no env and on with a secret", () => {
    assert.equal(meteringEnabled(passConfig({})), false);
    assert.equal(meteringEnabled(passConfig({ PASS_SECRET: "  " })), false);
    assert.equal(meteringEnabled(passConfig({ PASS_SECRET: "x" })), true);
  });

  it("normalises codes and falls back on a bad free-daily value", () => {
    const cfg = passConfig({
      PASS_SECRET: "x",
      PASS_CODES: " abc-1 ,, def2 ",
      PASS_FREE_DAILY: "lots",
      PASS_CHECKOUT_URL: " https://buy.example/pass ",
    });
    assert.deepEqual(cfg.codes, ["ABC-1", "DEF2"]);
    assert.equal(cfg.freeDaily, 5);
    assert.equal(cfg.checkoutUrl, "https://buy.example/pass");
    assert.equal(passConfig({ PASS_FREE_DAILY: "0" }).freeDaily, 0);
    assert.equal(passConfig({ PASS_FREE_DAILY: "12" }).freeDaily, 12);
  });
});

describe("seal / unseal", () => {
  it("round-trips and rejects tampering", () => {
    const token = seal("hello", SECRET);
    assert.equal(unseal(token, SECRET), "hello");
    assert.equal(unseal(token, "other-secret"), null);
    assert.equal(unseal(token.replace("hello", "hellp"), SECRET), null);
    assert.equal(unseal(token.slice(0, -1), SECRET), null);
    assert.equal(unseal("", SECRET), null);
    assert.equal(unseal(undefined, SECRET), null);
    assert.equal(unseal("nodot", SECRET), null);
  });

  it("refuses payloads containing a dot", () => {
    assert.throws(() => seal("a.b", SECRET));
  });
});

describe("quota", () => {
  it("starts at zero, counts up, and serialises", () => {
    const q0 = readQuota(undefined, SECRET, T0);
    assert.deepEqual(q0, { day: "2026-09-30", used: 0 });
    const q1 = bumpQuota(q0, T0);
    const cookie = quotaCookieValue(q1, SECRET);
    assert.deepEqual(readQuota(cookie, SECRET, T0), { day: "2026-09-30", used: 1 });
  });

  it("rolls over at UTC midnight", () => {
    const q = bumpQuota(bumpQuota(readQuota(undefined, SECRET, T0), T0), T0);
    const cookie = quotaCookieValue(q, SECRET);
    assert.deepEqual(readQuota(cookie, SECRET, T_NEXT_DAY), { day: "2026-10-01", used: 0 });
    assert.deepEqual(bumpQuota(q, T_NEXT_DAY), { day: "2026-10-01", used: 1 });
  });

  it("resets on a forged or malformed cookie", () => {
    const forged = `${utcDay(T0)}:0.notasig`;
    assert.equal(readQuota(forged, SECRET, T0).used, 0);
    const negative = seal(`${utcDay(T0)}:-3`, SECRET);
    assert.equal(readQuota(negative, SECRET, T0).used, 0);
  });

  it("computes remaining against the configured allowance", () => {
    const cfg = passConfig({ PASS_SECRET: "x", PASS_FREE_DAILY: "3" });
    assert.equal(remaining({ day: "d", used: 0 }, cfg), 3);
    assert.equal(remaining({ day: "d", used: 3 }, cfg), 0);
    assert.equal(remaining({ day: "d", used: 9 }, cfg), 0);
  });
});

describe("pass", () => {
  it("issues a pass the same secret recognises", () => {
    const token = issuePass(SECRET, T0);
    assert.equal(hasPass(token, SECRET), true);
    assert.equal(hasPass(token, "other"), false);
    assert.equal(hasPass(undefined, SECRET), false);
    // A quota cookie is never a pass, even though it is validly signed.
    assert.equal(hasPass(quotaCookieValue({ day: "2026-09-30", used: 1 }, SECRET), SECRET), false);
  });

  it("redeems configured codes case- and whitespace-insensitively", () => {
    const cfg = passConfig({ PASS_SECRET: "x", PASS_CODES: "PH-ALPHA-2026,ph-beta" });
    assert.equal(redeemCode(" ph-alpha-2026 ", cfg), true);
    assert.equal(redeemCode("PH-BETA", cfg), true);
    assert.equal(redeemCode("PH-GAMMA", cfg), false);
    assert.equal(redeemCode("", cfg), false);
    assert.equal(redeemCode("PH-ALPHA-2026", passConfig({ PASS_SECRET: "x" })), false);
  });
});

describe("minted codes", () => {
  const cfg = passConfig({ PASS_SECRET: SECRET });

  it("is deterministic per seed and redeemable", () => {
    const a = mintCode(SECRET, "cs_test_123");
    assert.equal(a, mintCode(SECRET, "cs_test_123"));
    assert.notEqual(a, mintCode(SECRET, "cs_test_124"));
    assert.match(a, /^PH-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{8}$/);
    assert.equal(verifyMintedCode(a, SECRET), true);
    assert.equal(redeemCode(a.toLowerCase(), cfg), true);
  });

  it("rejects tampering, the wrong secret, and malformed input", () => {
    const a = mintCode(SECRET, "cs_test_123");
    assert.equal(verifyMintedCode(a, "other"), false);
    const flipped = a.slice(0, 3) + (a[3] === "A" ? "B" : "A") + a.slice(4);
    assert.equal(verifyMintedCode(flipped, SECRET), false);
    assert.equal(verifyMintedCode("PH-ABCD-EFGH", SECRET), false);
    assert.equal(verifyMintedCode("", SECRET), false);
    assert.equal(redeemCode(a, passConfig({})), false);
  });

  it("never uses ambiguous letters", () => {
    for (const seed of ["a", "b", "c", "d", "e"]) {
      assert.doesNotMatch(mintCode(SECRET, seed), /[ILOU]/);
    }
  });
});

describe("cookieHeader", () => {
  it("emits HttpOnly, Lax, and Secure only in production", () => {
    const dev = cookieHeader("ph_pass", "v", 60, false);
    assert.equal(dev, "ph_pass=v; Path=/; Max-Age=60; HttpOnly; SameSite=Lax");
    assert.match(cookieHeader("ph_pass", "v", 60, true), /; Secure$/);
  });
});
