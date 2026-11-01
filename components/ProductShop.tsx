"use client";

import { useRef, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { MAX_QTY, type Product } from "@/lib/products";
import type { Lang } from "@/lib/site";
import { ZONES } from "@/lib/zones";

const HOTELS = [...new Set(ZONES.flatMap((z) => z.hotels))].sort();
const usd = (n: number) => `$${n.toFixed(2)} USD`;

export function ProductShop({ lang, products, fallback }: { lang: Lang; products: Product[]; fallback: string }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const t = (en: string, es: string) => (lang === "en" ? en : es);

  const lines = products.filter((p) => qty[p.id] > 0);
  const total = lines.reduce((sum, p) => sum + p.priceUsd * qty[p.id], 0);
  const change = (id: string, d: number) => setQty((q) => ({ ...q, [id]: Math.min(MAX_QTY, Math.max(0, (q[id] ?? 0) + d)) }));

  async function pay(form: HTMLFormElement) {
    const f = new FormData(form);
    const delivery = Object.fromEntries(["name", "email", "phone", "place", "room", "notes"].map((k) => [k, String(f.get(k) ?? "")]));
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, items: lines.map((p) => ({ id: p.id, qty: qty[p.id] })), delivery }),
      });
      const data = await r.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (r.status === 400) {
        setError(t("Please check your delivery details.", "Revisa tus datos de entrega."));
        setBusy(false);
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
        <button type="button" className="btn btn-primary" onClick={() => dialog.current?.showModal()} disabled={!lines.length || busy} data-source="shop-pay">
          {t("Pay by card", "Pagar con tarjeta")}
        </button>
        {error && (
          <p role="alert">
            {error} <a href={fallback}>WhatsApp</a>
          </p>
        )}
        <p className="muted">{t("Secure checkout by Stripe. We confirm delivery time on WhatsApp.", "Pago seguro con Stripe. Confirmamos la hora de entrega por WhatsApp.")}</p>
      </div>
      <dialog ref={dialog} className="shop-dialog" aria-labelledby="delivery-title">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            pay(e.currentTarget);
          }}
        >
          <h2 id="delivery-title">{t("Where do we deliver?", "¿Dónde entregamos?")}</h2>
          <label>{t("Your name", "Tu nombre")}<input name="name" required maxLength={80} autoComplete="name" /></label>
          <label>{t("Email (for your receipt)", "Correo (para tu recibo)")}<input name="email" type="email" maxLength={120} autoComplete="email" /></label>
          <label>{t("Phone / WhatsApp", "Teléfono / WhatsApp")}<input name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder="+1 555 123 4567" /></label>
          <label>{t("Hotel, resort or villa", "Hotel, resort o villa")}<input name="place" required maxLength={100} list="shop-hotels" /></label>
          <datalist id="shop-hotels">{HOTELS.map((h) => <option key={h} value={h} />)}</datalist>
          <label>{t("Room number or address", "Número de habitación o dirección")}<input name="room" maxLength={80} /></label>
          <label>{t("Notes for the driver (optional)", "Notas para el repartidor (opcional)")}<textarea name="notes" maxLength={200} rows={2} /></label>
          <p className="muted">{t("Total", "Total")}: {usd(total)}</p>
          {error && <p role="alert">{error}</p>}
          <div className="shop-dialog-actions">
            <button type="button" className="btn btn-secondary" onClick={() => dialog.current?.close()}>{t("Cancel", "Cancelar")}</button>
            <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? t("Opening secure checkout…", "Abriendo pago seguro…") : t("Continue to payment", "Continuar al pago")}</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
