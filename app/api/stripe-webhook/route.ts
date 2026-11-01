import { composeOrderEmail, isConfirmedPayment, verifyStripeSignature } from "@/lib/stripeWebhook";

// POST /api/stripe-webhook
// Stripe calls this when a Checkout payment is confirmed. It verifies the signature and emails the owner
// one message with the order. Nothing is stored; Stripe is the record.
// Env: STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, NOTIFY_EMAIL (required); NOTIFY_FROM, BUSINESS_NAME (optional).
// Subscribe the endpoint to checkout.session.completed and checkout.session.async_payment_succeeded.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const resend = process.env.RESEND_API_KEY;
  const notify = process.env.NOTIFY_EMAIL;
  if (!secret || !resend || !notify) {
    console.error("Webhook not configured: set STRIPE_WEBHOOK_SECRET, RESEND_API_KEY and NOTIFY_EMAIL");
    return new Response("Webhook not configured", { status: 500 });
  }

  const raw = await request.text();
  if (!verifyStripeSignature(raw, request.headers.get("stripe-signature"), secret)) {
    console.error("Invalid Stripe signature");
    return new Response("Invalid signature", { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  if (!isConfirmedPayment(event)) return new Response("ignored", { status: 200 });

  const msg = composeOrderEmail(event.data.object, process.env.BUSINESS_NAME);
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resend}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM || "Orders <onboarding@resend.dev>",
      to: notify.split(",").map((s) => s.trim()).filter(Boolean),
      subject: msg.subject,
      text: msg.text,
    }),
  });
  if (!r.ok) {
    console.error("notify failed:", r.status);
    return new Response("notify failed", { status: 500 }); // Stripe retries
  }
  return new Response("ok", { status: 200 });
}
