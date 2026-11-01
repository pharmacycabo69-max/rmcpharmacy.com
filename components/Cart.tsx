"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MAX_LINES, MAX_QTY } from "@/lib/products";
import type { Lang } from "@/lib/site";
import { ZONES } from "@/lib/zones";

type Item = { id: string; name: string; price: number; photo: string; qty: number };
type CartApi = { items: Item[]; add: (i: Omit<Item, "qty">) => void; change: (id: string, d: number) => void; count: number; total: number };

const CartContext = createContext<CartApi | null>(null);
const KEY = "rmc-cart";
const HOTELS = [...new Set(ZONES.flatMap((z) => z.hotels))].sort();
const usd = (n: number) => `$${n.toFixed(2)} USD`;

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}

export function CartProvider({ lang, fallback, children }: { lang: Lang; fallback: string; children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setItems(saved.slice(0, MAX_LINES));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((i: Omit<Item, "qty">) => setItems((cur) => {
    const found = cur.find((x) => x.id === i.id);
    if (found) return cur.map((x) => (x.id === i.id ? { ...x, qty: Math.min(MAX_QTY, x.qty + 1) } : x));
    return cur.length >= MAX_LINES ? cur : [...cur, { ...i, qty: 1 }];
  }), []);
  const change = useCallback((id: string, d: number) => setItems((cur) => cur.map((x) => (x.id === id ? { ...x, qty: Math.min(MAX_QTY, x.qty + d) } : x)).filter((x) => x.qty > 0)), []);

  const api = useMemo<CartApi>(() => ({ items, add, change, count: items.reduce((n, i) => n + i.qty, 0), total: items.reduce((n, i) => n + i.qty * i.price, 0) }), [items, add, change]);
  return (
    <CartContext.Provider value={api}>
      {children}
      <CartBar lang={lang} fallback={fallback} />
    </CartContext.Provider>
  );
}

function CartBar({ lang, fallback }: { lang: Lang; fallback: string }) {
  const { items, change, count, total } = useCart();
  const dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const t = (en: string, es: string) => (lang === "en" ? en : es);

  async function pay(form: HTMLFormElement) {
    const f = new FormData(form);
    const delivery = Object.fromEntries(["name", "email", "phone", "place", "room", "notes"].map((k) => [k, String(f.get(k) ?? "")]));
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, items: items.map((i) => ({ id: i.id, qty: i.qty })), delivery }),
      });
      const data = await r.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(r.status === 400 ? t("Please check your delivery details and cart.", "Revisa tus datos de entrega y tu carrito.") : t("Card payment is unavailable right now. Order on WhatsApp instead.", "El pago con tarjeta no está disponible ahora. Pide por WhatsApp."));
    } catch {
      setError(t("Something went wrong. Order on WhatsApp instead.", "Algo salió mal. Pide por WhatsApp."));
    }
    setBusy(false);
  }

  return (
    <>
      {count > 0 && (
        <div className="shop-cart" role="region" aria-label={t("Your order", "Tu pedido")}>
          <strong>
            {count} {t(count === 1 ? "item" : "items", count === 1 ? "producto" : "productos")} · {usd(total)}
          </strong>
          <button type="button" className="btn btn-primary" onClick={() => dialog.current?.showModal()} data-source="shop-open-cart">
            {t("Review and pay", "Revisar y pagar")}
          </button>
        </div>
      )}
      <dialog ref={dialog} className="shop-dialog" aria-labelledby="delivery-title">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            pay(e.currentTarget);
          }}
        >
          <h2 id="delivery-title">{t("Your order", "Tu pedido")}</h2>
          <ul className="cart-lines">
            {items.map((i) => (
              <li key={i.id}>
                <Image src={i.photo} alt="" width={48} height={36} />
                <span>{i.name}</span>
                <span className="shop-qty">
                  <button type="button" onClick={() => change(i.id, -1)} aria-label={t("Remove one", "Quitar uno")}>−</button>
                  <output>{i.qty}</output>
                  <button type="button" onClick={() => change(i.id, 1)} aria-label={t("Add one", "Agregar uno")} disabled={i.qty >= MAX_QTY}>+</button>
                </span>
              </li>
            ))}
          </ul>
          <h3>{t("Where do we deliver?", "¿Dónde entregamos?")}</h3>
          <label>{t("Your name", "Tu nombre")}<input name="name" required maxLength={80} autoComplete="name" /></label>
          <label>{t("Email (for your receipt)", "Correo (para tu recibo)")}<input name="email" type="email" maxLength={120} autoComplete="email" /></label>
          <label>{t("Phone / WhatsApp", "Teléfono / WhatsApp")}<input name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder="+1 555 123 4567" /></label>
          <label>{t("Hotel, resort or villa", "Hotel, resort o villa")}<input name="place" required maxLength={100} list="shop-hotels" /></label>
          <datalist id="shop-hotels">{HOTELS.map((h) => <option key={h} value={h} />)}</datalist>
          <label>{t("Room number or address", "Número de habitación o dirección")}<input name="room" maxLength={80} /></label>
          <label>{t("Notes for the driver (optional)", "Notas para el repartidor (opcional)")}<textarea name="notes" maxLength={200} rows={2} /></label>
          <p><strong>{t("Total", "Total")}: {usd(total)}</strong></p>
          {error && (
            <p role="alert">
              {error} <a href={fallback}>WhatsApp</a>
            </p>
          )}
          <div className="shop-dialog-actions">
            <button type="button" className="btn btn-secondary" onClick={() => dialog.current?.close()}>{t("Keep shopping", "Seguir comprando")}</button>
            <button type="submit" className="btn btn-primary" disabled={busy || !items.length}>{busy ? t("Opening secure checkout…", "Abriendo pago seguro…") : t("Continue to payment", "Continuar al pago")}</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
