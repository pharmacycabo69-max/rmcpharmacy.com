import type { Lang } from "./site.ts";

type L = Record<Lang, string>;

/**
 * Over-the-counter products sold online through Stripe Checkout.
 * House rules: generic OTC and personal-care items only; no prescription medicines, no medical claims.
 * Prices live here (server side) and the client only sends product ids and quantities.
 */
export type Product = {
  id: string;
  /** Category slug from lib/categories.ts. */
  category: string;
  name: L;
  /** One short line: size, pack or use. */
  detail: L;
  priceUsd: number;
  /** Optional photo path under /public. */
  photo?: string;
  active: boolean;
};

// Filled from the owner's catalog (CSV). While empty, /shop shows a WhatsApp prompt and stays out of the sitemap.
export const PRODUCTS: Product[] = [];

export const MAX_QTY = 10;
export const MAX_LINES = 20;

export function activeProducts() {
  return PRODUCTS.filter((p) => p.active);
}

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id && p.active);
}

export function toCents(priceUsd: number) {
  return Math.round(priceUsd * 100);
}

export type CartLine = { id: string; qty: number };

/** Validates a cart sent by the client against the server catalog. Returns lines with product data or an error. */
export function resolveCart(raw: unknown): { ok: true; lines: { product: Product; qty: number }[] } | { ok: false; error: string } {
  if (!Array.isArray(raw) || raw.length === 0) return { ok: false, error: "empty cart" };
  if (raw.length > MAX_LINES) return { ok: false, error: "too many items" };
  const seen = new Set<string>();
  const lines: { product: Product; qty: number }[] = [];
  for (const item of raw) {
    const id = typeof item?.id === "string" ? item.id : "";
    const qty = Number(item?.qty);
    const product = getProduct(id);
    if (!product) return { ok: false, error: `unknown product ${id}` };
    if (seen.has(id)) return { ok: false, error: `duplicate product ${id}` };
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return { ok: false, error: `bad quantity for ${id}` };
    seen.add(id);
    lines.push({ product, qty });
  }
  return { ok: true, lines };
}
