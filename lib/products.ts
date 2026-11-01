import { CVU_CATEGORIES, CVU_ROWS } from "./cvuProducts.ts";
import type { Lang } from "./site.ts";

type L = Record<Lang, string>;

/**
 * Products sold online through Stripe Checkout, imported from the cvupharmacy catalog (scripts/import-cvu.py).
 * Prices live here (server side) and the client only sends product ids and quantities.
 */
export type Product = {
  id: string;
  /** Category slug, a key of CATEGORIES. */
  category: string;
  name: L;
  /** One short line shown on the Stripe page. */
  detail: L;
  priceUsd: number;
  photo?: string;
  active: boolean;
};

export const CATEGORIES: Record<string, L> = Object.fromEntries(Object.entries(CVU_CATEGORIES).map(([slug, [en, es]]) => [slug, { en, es }]));

export const PRODUCTS: Product[] = CVU_ROWS.map(([id, name, category, cents]) => ({
  id: String(id),
  category,
  name: { en: name, es: name },
  detail: CATEGORIES[category] ?? { en: "", es: "" },
  priceUsd: cents / 100,
  photo: `/products/cvu/${id}.jpg`,
  active: true,
}));

const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

export const MAX_QTY = 10;
export const MAX_LINES = 20;

export function activeProducts() {
  return PRODUCTS.filter((p) => p.active);
}

export function getProduct(id: string) {
  const p = BY_ID.get(id);
  return p?.active ? p : undefined;
}

export function toCents(priceUsd: number) {
  return Math.round(priceUsd * 100);
}

export const PAGE_SIZE = 24;

/** Filters by category and a free-text query (every word must appear in the name), then paginates. */
export function queryProducts(opts: { category?: string; q?: string; page?: number }) {
  const words = (opts.q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const list = activeProducts().filter((p) => (!opts.category || p.category === opts.category) && words.every((w) => p.name.en.toLowerCase().includes(w)));
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, opts.page ?? 1));
  return { total: list.length, pages, page, items: list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) };
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
