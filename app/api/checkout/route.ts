import { NextResponse } from "next/server";
import { buildCheckoutParams, parseDelivery } from "@/lib/checkout";
import { resolveCart } from "@/lib/products";
import { isLang, SITE } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

// POST /api/checkout  { items: [{ id, qty }], lang, delivery: { name, phone, place, room, notes } }
// Prices come from lib/products.ts, never from the client. Requires env STRIPE_SECRET_KEY.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const lang = isLang(body?.lang) ? body.lang : "en";
  const cart = resolveCart(body?.items);
  if (!cart.ok) return NextResponse.json({ error: cart.error }, { status: 400 });

  const delivery = parseDelivery(body?.delivery);
  if (!delivery.ok) return NextResponse.json({ error: delivery.error }, { status: 400 });

  const fallback = whatsappUrl(lang, "shop-checkout-fallback", lang === "en" ? "Hi! I'd like to place an order." : "¡Hola! Quiero hacer un pedido.");
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    console.error("STRIPE_SECRET_KEY is not set");
    return NextResponse.json({ error: "payments unavailable", fallback }, { status: 503 });
  }

  try {
    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: buildCheckoutParams(cart.lines, lang, SITE.url, delivery.delivery),
    });
    const data = await r.json();
    if (!r.ok || !data.url) {
      console.error("Stripe error", r.status, data?.error);
      return NextResponse.json({ error: "payments unavailable", fallback }, { status: 502 });
    }
    return NextResponse.json({ url: data.url });
  } catch (err) {
    console.error("Checkout failed", err);
    return NextResponse.json({ error: "payments unavailable", fallback }, { status: 502 });
  }
}
