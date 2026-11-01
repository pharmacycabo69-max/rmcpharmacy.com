import { toCents, type Product } from "./products.ts";
import type { Lang } from "./site.ts";

/** Form body for POST https://api.stripe.com/v1/checkout/sessions (one-time card payment, USD). */
export function buildCheckoutParams(lines: { product: Product; qty: number }[], lang: Lang, siteUrl: string) {
  const p = new URLSearchParams({
    mode: "payment",
    locale: lang,
    success_url: `${siteUrl}${lang === "es" ? "/es/tienda/gracias" : "/shop/thanks"}`,
    cancel_url: `${siteUrl}${lang === "es" ? "/es/tienda" : "/shop"}`,
    "phone_number_collection[enabled]": "true",
    "custom_fields[0][key]": "location",
    "custom_fields[0][label][type]": "custom",
    "custom_fields[0][label][custom]": lang === "es" ? "Hotel / villa y habitación o dirección" : "Hotel / villa and room or address",
    "custom_fields[0][type]": "text",
    "payment_intent_data[description]": "RMC Pharmacy online order",
    // Read back by the webhook email (Stripe metadata values are capped at 500 characters).
    "metadata[items]": lines.map(({ product, qty }) => `${product.name.en} x${qty}`).join("|").slice(0, 500),
  });
  lines.forEach(({ product, qty }, i) => {
    p.set(`line_items[${i}][quantity]`, String(qty));
    p.set(`line_items[${i}][price_data][currency]`, "usd");
    p.set(`line_items[${i}][price_data][unit_amount]`, String(toCents(product.priceUsd)));
    p.set(`line_items[${i}][price_data][product_data][name]`, product.name[lang]);
    p.set(`payment_intent_data[metadata][item_${i}]`, `${product.id} x${qty}`);
  });
  return p;
}
