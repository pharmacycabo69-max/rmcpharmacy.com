import { createHmac, timingSafeEqual } from "node:crypto";

const TOLERANCE_SECONDS = 300;

/** Verifies a Stripe-Signature header ("t=<ts>,v1=<hmac>,...") against the raw request body. */
export function verifyStripeSignature(raw: string, header: string | null, secret: string, now = Date.now() / 1000) {
  if (!header) return false;
  const pairs = header.split(",").map((p) => p.trim().split("="));
  const t = pairs.find((p) => p[0] === "t")?.[1];
  const sigs = pairs.filter((p) => p[0] === "v1").map((p) => p[1]);
  if (!t || !sigs.length || Math.abs(now - Number(t)) > TOLERANCE_SECONDS) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${t}.${raw}`).digest("hex"));
  return sigs.some((s) => {
    const b = Buffer.from(s);
    return b.length === expected.length && timingSafeEqual(expected, b);
  });
}

type Session = {
  amount_total?: number;
  currency?: string;
  payment_intent?: string;
  payment_status?: string;
  metadata?: Record<string, string>;
  customer_details?: { name?: string; email?: string; phone?: string };
  custom_fields?: { key: string; text?: { value?: string } }[];
};

/** True only when money has actually been collected. */
export function isConfirmedPayment(event: { type?: string; data?: { object?: Session } }) {
  return (
    event.type === "checkout.session.async_payment_succeeded" ||
    (event.type === "checkout.session.completed" && event.data?.object?.payment_status === "paid")
  );
}

export function composeOrderEmail(session: Session, businessName = "") {
  const m = session.metadata ?? {};
  const cd = session.customer_details ?? {};
  const location = session.custom_fields?.find((f) => f.key === "location")?.text?.value ?? "";
  const paid = ((session.amount_total ?? 0) / 100).toFixed(2);
  const lines = [
    "New paid order",
    `Customer: ${cd.name || "-"}`,
    `Phone: ${cd.phone || "-"}`,
    `Email: ${cd.email || "-"}`,
    `Deliver to: ${location || "-"}`,
    "Items:",
    ...(m.items ? m.items.split("|").map((i) => `  - ${i}`) : ["  - (not recorded)"]),
    `Paid: $${paid} ${(session.currency ?? "usd").toUpperCase()}`,
  ];
  if (session.payment_intent) lines.push(`Stripe: https://dashboard.stripe.com/payments/${session.payment_intent}`);
  const prefix = businessName ? `${businessName} — ` : "";
  return { subject: `${prefix}Paid order $${paid}`, text: lines.join("\n") };
}
