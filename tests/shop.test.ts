import assert from "node:assert/strict";
import { test } from "node:test";
import { CATEGORIES } from "../lib/categories.ts";
import { buildCheckoutParams, parseDelivery } from "../lib/checkout.ts";
import { MAX_QTY, PRODUCTS, resolveCart, type Product } from "../lib/products.ts";

const sample: Product = { id: "t", category: "sun-care", name: { en: "Sunscreen", es: "Protector" }, detail: { en: "8 oz", es: "240 ml" }, priceUsd: 12.5, active: true };

test("catalog has the 50 starter products", () => assert.equal(PRODUCTS.length, 50));

test("catalog products use known categories, unique ids and positive prices", () => {
  const ids = new Set<string>();
  for (const p of PRODUCTS) {
    assert.ok(CATEGORIES.some((c) => c.slug === p.category), `${p.id}: unknown category`);
    assert.ok(!ids.has(p.id), `${p.id}: duplicate id`);
    ids.add(p.id);
    assert.ok(!p.active || p.priceUsd > 0, `${p.id}: active products need a price`);
    assert.ok(p.name.en && p.name.es, `${p.id}: both languages`);
  }
});

test("resolveCart rejects empty, unknown, duplicate and out-of-range lines", () => {
  assert.equal(resolveCart([]).ok, false);
  assert.equal(resolveCart("x").ok, false);
  assert.equal(resolveCart([{ id: "nope", qty: 1 }]).ok, false);
  PRODUCTS.push(sample);
  try {
    assert.equal(resolveCart([{ id: "t", qty: 0 }]).ok, false);
    assert.equal(resolveCart([{ id: "t", qty: MAX_QTY + 1 }]).ok, false);
    assert.equal(resolveCart([{ id: "t", qty: 1.5 }]).ok, false);
    assert.equal(resolveCart([{ id: "t", qty: 1 }, { id: "t", qty: 1 }]).ok, false);
    assert.equal(resolveCart([{ id: "t", qty: 2, price: 0 }]).ok, true);
  } finally {
    PRODUCTS.pop();
  }
});

test("checkout params use server prices in cents and localized urls", () => {
  const p = buildCheckoutParams([{ product: sample, qty: 2 }], "es", "https://x.test", { name: "Ana", email: "ana@x.com", phone: "+52 624 111 2222", place: "Hotel X", room: "204", notes: "" });
  assert.equal(p.get("line_items[0][price_data][unit_amount]"), "1250");
  assert.equal(p.get("line_items[0][quantity]"), "2");
  assert.equal(p.get("line_items[0][price_data][product_data][name]"), "Protector");
  assert.equal(p.get("success_url"), "https://x.test/es/tienda/gracias");
  assert.equal(p.get("mode"), "payment");
  assert.equal(p.get("metadata[location]"), "Hotel X, 204");
  assert.equal(p.get("metadata[customer_name]"), "Ana");
  assert.equal(p.get("customer_email"), "ana@x.com");
  assert.match(p.get("custom_text[submit][message]")!, /Hotel X, 204/);
  assert.equal(p.get("line_items[0][price_data][product_data][description]"), "240 ml");
});

test("webhook verifies signatures and only confirms paid sessions", async () => {
  const { createHmac } = await import("node:crypto");
  const { verifyStripeSignature, isConfirmedPayment, composeOrderEmail } = await import("../lib/stripeWebhook.ts");
  const body = '{"a":1}';
  const t = 1_800_000_000;
  const sig = createHmac("sha256", "whsec_x").update(`${t}.${body}`).digest("hex");
  assert.equal(verifyStripeSignature(body, `t=${t},v1=${sig}`, "whsec_x", t), true);
  assert.equal(verifyStripeSignature(body, `t=${t},v1=${sig}`, "whsec_y", t), false);
  assert.equal(verifyStripeSignature(body, `t=${t},v1=${sig}`, "whsec_x", t + 1000), false);
  assert.equal(verifyStripeSignature(body, null, "whsec_x", t), false);
  assert.equal(isConfirmedPayment({ type: "checkout.session.completed", data: { object: { payment_status: "unpaid" } } }), false);
  assert.equal(isConfirmedPayment({ type: "checkout.session.completed", data: { object: { payment_status: "paid" } } }), true);
  const mail = composeOrderEmail({ amount_total: 2500, metadata: { items: "Sunscreen x2|Wipes x1" }, custom_fields: [{ key: "location", text: { value: "Hotel X 204" } }] }, "RMC");
  assert.match(mail.text, /Hotel X 204/);
  assert.match(mail.text, /Sunscreen x2/);
  assert.match(mail.subject, /\$25\.00/);
});

test("parseDelivery requires name, place and a valid phone, and caps lengths", () => {
  const ok = { name: " Ana ", email: "", phone: "624 111 2222", place: "Hotel X", room: "", notes: "" };
  const r = parseDelivery(ok);
  assert.ok(r.ok && r.delivery.name === "Ana");
  assert.equal(parseDelivery({ ...ok, name: "" }).ok, false);
  assert.equal(parseDelivery({ ...ok, place: "" }).ok, false);
  assert.equal(parseDelivery({ ...ok, phone: "123" }).ok, false);
  assert.equal(parseDelivery({ ...ok, notes: "x".repeat(201) }).ok, false);
  assert.equal(parseDelivery({ ...ok, email: "nope" }).ok, false);
  assert.equal(parseDelivery(null).ok, false);
});
