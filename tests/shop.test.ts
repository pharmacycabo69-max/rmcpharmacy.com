import assert from "node:assert/strict";
import { test } from "node:test";
import { CATEGORIES } from "../lib/categories.ts";
import { buildCheckoutParams } from "../lib/checkout.ts";
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
  const p = buildCheckoutParams([{ product: sample, qty: 2 }], "es", "https://x.test");
  assert.equal(p.get("line_items[0][price_data][unit_amount]"), "1250");
  assert.equal(p.get("line_items[0][quantity]"), "2");
  assert.equal(p.get("line_items[0][price_data][product_data][name]"), "Protector");
  assert.equal(p.get("success_url"), "https://x.test/es/tienda/gracias");
  assert.equal(p.get("mode"), "payment");
});
