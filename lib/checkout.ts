import { toCents, type Product } from "./products.ts";
import type { Lang } from "./site.ts";

export type Delivery = { name: string; email: string; phone: string; place: string; room: string; notes: string };

const LIMITS: Record<keyof Delivery, number> = { name: 80, email: 120, phone: 30, place: 100, room: 80, notes: 200 };

/** Validates and trims the delivery details sent by the client. Name, phone and place are required. */
export function parseDelivery(raw: unknown): { ok: true; delivery: Delivery } | { ok: false; error: string } {
  const src = (raw ?? {}) as Record<string, unknown>;
  const out = {} as Delivery;
  for (const key of Object.keys(LIMITS) as (keyof Delivery)[]) {
    const v = typeof src[key] === "string" ? (src[key] as string).trim() : "";
    if (v.length > LIMITS[key]) return { ok: false, error: `${key} too long` };
    out[key] = v;
  }
  if (!out.name || !out.place) return { ok: false, error: "name and place are required" };
  if (out.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email)) return { ok: false, error: "invalid email" };
  if (out.phone.replace(/\D/g, "").length < 7) return { ok: false, error: "valid phone required" };
  return { ok: true, delivery: out };
}

/** Form body for POST https://api.stripe.com/v1/checkout/sessions (one-time card payment, USD). */
export function buildCheckoutParams(lines: { product: Product; qty: number }[], lang: Lang, siteUrl: string, delivery: Delivery) {
  const p = new URLSearchParams({
    mode: "payment",
    locale: lang,
    success_url: `${siteUrl}${lang === "es" ? "/es/tienda/gracias" : "/shop/thanks"}`,
    cancel_url: `${siteUrl}${lang === "es" ? "/es/tienda" : "/shop"}`,
    "custom_text[submit][message]": (lang === "es" ? "Entrega a: " : "Deliver to: ") + [delivery.name, [delivery.place, delivery.room].filter(Boolean).join(", "), delivery.phone].join(" · "),
    "metadata[customer_name]": delivery.name,
    "metadata[customer_phone]": delivery.phone,
    "metadata[location]": [delivery.place, delivery.room].filter(Boolean).join(", "),
    "metadata[notes]": delivery.notes,
    "payment_intent_data[description]": "RMC Pharmacy online order",
    // Read back by the webhook email (Stripe metadata values are capped at 500 characters).
    "metadata[items]": lines.map(({ product, qty }) => `${product.name.en} x${qty}`).join("|").slice(0, 500),
  });
  if (delivery.email) p.set("customer_email", delivery.email);
  lines.forEach(({ product, qty }, i) => {
    p.set(`line_items[${i}][quantity]`, String(qty));
    p.set(`line_items[${i}][price_data][currency]`, "usd");
    p.set(`line_items[${i}][price_data][unit_amount]`, String(toCents(product.priceUsd)));
    p.set(`line_items[${i}][price_data][product_data][name]`, product.name[lang]);
    p.set(`line_items[${i}][price_data][product_data][description]`, product.detail[lang]);
    if (product.photo) p.set(`line_items[${i}][price_data][product_data][images][0]`, `${siteUrl}${product.photo}`);
    p.set(`payment_intent_data[metadata][item_${i}]`, `${product.id} x${qty}`);
  });
  return p;
}
