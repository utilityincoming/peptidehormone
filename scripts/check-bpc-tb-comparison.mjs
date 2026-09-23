// Run against a built local server or a deployment: node scripts/check-bpc-tb-comparison.mjs http://localhost:PORT
import assert from "node:assert/strict";
const base = process.argv[2] ?? "http://localhost:3000";
for (const pair of ["bpc-157-vs-tb-500", "tb-500-vs-bpc-157"]) {
  const response = await fetch(`${base}/compare/${pair}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  for (const heading of ["The identity problem", "What the human studies actually show", "Does stacking them improve recovery?", "Safety, product quality, and unknowns", "Sources and scope"]) {
    assert.ok(visible.includes(heading), `Missing editorial section: ${heading}`);
  }
  assert.ok(!visible.includes("Native hormone"), "Synthetic BPC-157 must not be called native");
  assert.ok(!visible.includes("Same actin-related biology"), "Do not equate fragment and parent biology");
  assert.ok(!visible.includes("Half-life bars are on a logarithmic scale"), "No bars exist for unknown half-lives");
  assert.ok(visible.includes("Ac-LKKTETQ"));
  assert.ok(visible.includes("2026-09-20"));
  assert.match(html, /<title>[^<]*Evidence[^<]*Safety/);
  assert.ok(html.includes(`rel="canonical" href="https://peptidehormone.com/compare/${pair}"`));
  const graphs = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((m) => { const data = JSON.parse(m[1]); return data["@graph"] ?? [data]; });
  const faqs = graphs.filter((n) => n["@type"] === "FAQPage");
  assert.equal(faqs.length, 1);
  assert.equal(faqs[0].mainEntity.length, 6);
  const decode = (s) => s.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  const text = decode(visible.replace(/<[^>]+>/g, ""));
  for (const faq of faqs[0].mainEntity) {
    assert.ok(text.includes(faq.name), `Missing visible FAQ: ${faq.name}`);
    assert.ok(text.includes(faq.acceptedAnswer.text), `Schema differs from visible answer: ${faq.name}`);
  }
  for (const source of ["34324435", "40131143", "PMC12313605", "/media/193343/download", "/media/193349/download", "2026list_en_final"]) {
    assert.ok(visible.includes(source), `Missing visible source ${source}`);
  }
  console.log(`PASS ${pair}: HTTP 200, editorial sections, identity corrections, metadata, canonical, six visible/schema-matched FAQs, sources`);
}
