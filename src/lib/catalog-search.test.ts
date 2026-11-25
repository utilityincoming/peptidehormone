import assert from "node:assert/strict";
import test from "node:test";
import { catalogNameMatch } from "./catalog-search";
import { getHormone } from "./hormones";

test("catalog search recognizes exact aliases, codes, and vendor labels", () => {
  assert.equal(catalogNameMatch(getHormone("semaglutide")!, " Wegovy ")?.label, "Wegovy");
  assert.equal(catalogNameMatch(getHormone("retatrutide")!, "ly 3437943")?.label, "LY3437943");
  assert.deepEqual(catalogNameMatch(getHormone("retatrutide")!, "AP–RTA–3™"), {
    label: "AP-RTA-3",
    note: "Vendor label",
  });
  assert.equal(catalogNameMatch(getHormone("survodutide")!, "bi456906")?.label, "BI 456906");
  assert.equal(catalogNameMatch(getHormone("retatrutide")!, "AP-RTA"), undefined);
});

test("catalog search preserves the distinction between CJC-1295 variants", () => {
  const hormone = getHormone("cjc-1295")!;
  assert.equal(catalogNameMatch(hormone, "CJC1295")?.label, "CJC-1295");
  assert.equal(catalogNameMatch(hormone, "CJC-1295 (no-DAC)")?.note, "Non-DAC variant covered in this entry");
  assert.equal(catalogNameMatch(hormone, "CJC-1295 with DAC")?.note, "DAC variant covered in this entry");
  assert.equal(catalogNameMatch(hormone, "CJC-1295 unknown variant"), undefined);
});
