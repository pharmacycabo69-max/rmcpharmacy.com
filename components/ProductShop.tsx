"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { MAX_QTY, type Product } from "@/lib/products";
import type { Lang } from "@/lib/site";

const usd = (n: number) => `$${n.toFixed(2)} USD`;

export function ProductShop({ lang, products, fallback }: { lang: Lang; products: Product[]; fallback: string }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const t = (en: string, es: string) => (lang === "en" ? en : es);

  const lines = products.filter((p) => qty[p.id] > 0);
  const total = lines.reduce((sum, p) => sum + p.priceUsd * qty[p.id], 0);
  const change = (id: string, d: number) => setQty((q) => ({ ...q, [id]: Math.min(MAX_QTY, Math.max(0, (q[id] ?? 0) + d)) }));

  async function pay() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, items: lines.map((p) => ({ id: p.id, qty: qty[p.id] })) }),
      });
      const data = await r.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(t("Card payment is unavailable right now. Order on WhatsApp instead.", "El pago con tarjeta no está disponible ahora. Pide por WhatsApp."));
    } catch {
      setError(t("Something went wrong. Order on WhatsApp instead.", "Algo salió mal. Pide por WhatsApp."));
    }
    setBusy(false);
  }

  return (
    <div className="shop">
      {CATEGORIES.map((c) => {
        const items = products.filter((p) => p.category === c.slug);
        if (!items.length) return null;
        return (
          <section key={c.slug} aria-labelledby={`shop-${c.slug}`}>
            <h2 id={`shop-${c.slug}`}>{c.name[lang]}</h2>
            <ul className="shop-grid">
              {items.map((p) => (
                <li key={p.id} className="shop-item">
                  <strong>{p.name[lang]}</strong>
                  <span className="muted">{p.detail[lang]}</span>
                  <span className="shop-price">{usd(p.priceUsd)}</span>
                  <span className="shop-qty">
                    <button type="button" onClick={() => change(p.id, -1)} aria-label={t("Remove one", "Quitar uno")} disabled={!qty[p.id]}>−</button>
                    <output aria-live="polite">{qty[p.id] ?? 0}</output>
                    <button type="button" onClick={() => change(p.id, 1)} aria-label={t("Add one", "Agregar uno")}>+</button>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <div className="shop-cart" role="region" aria-label={t("Your order", "Tu pedido")}>
        <strong>{t("Total", "Total")}: {usd(total)}</strong>
        <button type="button" className="btn" onClick={pay} disabled={!lines.length || busy} data-source="shop-pay">
          {busy ? t("Opening secure checkout…", "Abriendo pago seguro…") : t("Pay by card", "Pagar con tarjeta")}
        </button>
        {error && (
          <p role="alert">
            {error} <a href={fallback}>WhatsApp</a>
          </p>
        )}
        <p className="muted">{t("Secure checkout by Stripe. Enter your hotel or villa at checkout; we confirm delivery time on WhatsApp.", "Pago seguro con Stripe. Indica tu hotel o villa al pagar; confirmamos la hora de entrega por WhatsApp.")}</p>
      </div>
    </div>
  );
}
