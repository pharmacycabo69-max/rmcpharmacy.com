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

// Starter list of 50 generic OTC items. Each stays inactive (not sold, shop hidden) until the owner sets a real price
// and flips active to true. While none is active, /shop shows a WhatsApp prompt and stays out of the sitemap.
export const PRODUCTS: Product[] = [
  { id: "sunscreen-spf50-lotion", category: "sun-care", name: { en: "Sunscreen lotion SPF 50", es: "Protector solar en loción FPS 50" }, detail: { en: "125 ml", es: "125 ml" }, priceUsd: 15, active: true },
  { id: "sunscreen-spf50-spray", category: "sun-care", name: { en: "Sunscreen spray SPF 50", es: "Protector solar en spray FPS 50" }, detail: { en: "Water resistant", es: "Resistente al agua" }, priceUsd: 0, active: false },
  { id: "sunscreen-kids", category: "sun-care", name: { en: "Kids sunscreen SPF 50", es: "Protector solar para niños FPS 50" }, detail: { en: "Sensitive skin", es: "Piel sensible" }, priceUsd: 0, active: false },
  { id: "aftersun-gel", category: "sun-care", name: { en: "After-sun gel", es: "Gel after-sun" }, detail: { en: "240 g", es: "240 g" }, priceUsd: 0, active: false },
  { id: "lip-balm-spf", category: "sun-care", name: { en: "Lip balm with SPF", es: "Bálsamo labial con FPS" }, detail: { en: "Single stick", es: "Barra individual" }, priceUsd: 0, active: false },
  { id: "electrolyte-powder", category: "hydration", name: { en: "Electrolyte drink powder", es: "Polvo para bebida con electrolitos" }, detail: { en: "Pack of 6 sachets", es: "Paquete de 6 sobres" }, priceUsd: 0, active: false },
  { id: "electrolyte-drink", category: "hydration", name: { en: "Electrolyte drink", es: "Bebida con electrolitos" }, detail: { en: "600 ml", es: "600 ml" }, priceUsd: 0, active: false },
  { id: "coconut-water", category: "hydration", name: { en: "Coconut water", es: "Agua de coco" }, detail: { en: "330 ml", es: "330 ml" }, priceUsd: 0, active: false },
  { id: "water-bottle", category: "hydration", name: { en: "Bottled water", es: "Agua embotellada" }, detail: { en: "1.5 L", es: "1.5 L" }, priceUsd: 0, active: false },
  { id: "cooling-towel", category: "hydration", name: { en: "Cooling towel", es: "Toalla refrescante" }, detail: { en: "Reusable", es: "Reutilizable" }, priceUsd: 0, active: false },
  { id: "bandages-assorted", category: "first-aid", name: { en: "Adhesive bandages, assorted", es: "Curitas surtidas" }, detail: { en: "Box of 20", es: "Caja de 20" }, priceUsd: 0, active: false },
  { id: "bandages-waterproof", category: "first-aid", name: { en: "Waterproof bandages", es: "Curitas impermeables" }, detail: { en: "Box of 20", es: "Caja de 20" }, priceUsd: 0, active: false },
  { id: "gauze-sterile", category: "first-aid", name: { en: "Sterile gauze pads", es: "Gasas estériles" }, detail: { en: "Pack of 10", es: "Paquete de 10" }, priceUsd: 0, active: false },
  { id: "antiseptic-wipes", category: "first-aid", name: { en: "Antiseptic wipes", es: "Toallitas antisépticas" }, detail: { en: "Pack of 20", es: "Paquete de 20" }, priceUsd: 0, active: false },
  { id: "blister-pads", category: "first-aid", name: { en: "Blister pads", es: "Parches para ampollas" }, detail: { en: "Pack of 6", es: "Paquete de 6" }, priceUsd: 0, active: false },
  { id: "oral-rehydration", category: "stomach-and-digestion", name: { en: "Oral rehydration sachets", es: "Sobres de rehidratación oral" }, detail: { en: "Pack of 4", es: "Paquete de 4" }, priceUsd: 0, active: false },
  { id: "crackers", category: "stomach-and-digestion", name: { en: "Plain crackers", es: "Galletas saladas" }, detail: { en: "Single pack", es: "Paquete individual" }, priceUsd: 0, active: false },
  { id: "probiotic-drink", category: "stomach-and-digestion", name: { en: "Probiotic drink", es: "Bebida probiótica" }, detail: { en: "Single bottle", es: "Botella individual" }, priceUsd: 0, active: false },
  { id: "ginger-candies", category: "stomach-and-digestion", name: { en: "Ginger chews", es: "Dulces de jengibre" }, detail: { en: "Single bag", es: "Bolsa individual" }, priceUsd: 0, active: false },
  { id: "herbal-tea-digest", category: "stomach-and-digestion", name: { en: "Herbal digestive tea", es: "Té de hierbas digestivo" }, detail: { en: "Box of 20", es: "Caja de 20" }, priceUsd: 0, active: false },
  { id: "thermometer-digital", category: "pain-and-fever", name: { en: "Digital thermometer", es: "Termómetro digital" }, detail: { en: "Each", es: "Pieza" }, priceUsd: 0, active: false },
  { id: "heat-patches", category: "pain-and-fever", name: { en: "Heat patches", es: "Parches de calor" }, detail: { en: "Pack of 4", es: "Paquete de 4" }, priceUsd: 0, active: false },
  { id: "cold-patches", category: "pain-and-fever", name: { en: "Cold gel patches", es: "Parches de gel frío" }, detail: { en: "Pack of 4", es: "Paquete de 4" }, priceUsd: 0, active: false },
  { id: "sleep-mask", category: "pain-and-fever", name: { en: "Sleep mask", es: "Antifaz para dormir" }, detail: { en: "Each", es: "Pieza" }, priceUsd: 0, active: false },
  { id: "earplugs", category: "pain-and-fever", name: { en: "Earplugs", es: "Tapones para oídos" }, detail: { en: "Pack of 6 pairs", es: "Paquete de 6 pares" }, priceUsd: 0, active: false },
  { id: "tissues", category: "cold-and-flu", name: { en: "Tissues", es: "Pañuelos desechables" }, detail: { en: "Pack of 3", es: "Paquete de 3" }, priceUsd: 0, active: false },
  { id: "hand-sanitizer", category: "cold-and-flu", name: { en: "Hand sanitizer gel", es: "Gel antibacterial" }, detail: { en: "250 ml", es: "250 ml" }, priceUsd: 0, active: false },
  { id: "face-masks", category: "cold-and-flu", name: { en: "Face masks", es: "Cubrebocas" }, detail: { en: "Pack of 10", es: "Paquete de 10" }, priceUsd: 0, active: false },
  { id: "honey", category: "cold-and-flu", name: { en: "Honey", es: "Miel" }, detail: { en: "340 g", es: "340 g" }, priceUsd: 0, active: false },
  { id: "herbal-tea-cold", category: "cold-and-flu", name: { en: "Herbal tea", es: "Té de hierbas" }, detail: { en: "Box of 20", es: "Caja de 20" }, priceUsd: 0, active: false },
  { id: "repellent-spray", category: "allergy-relief", name: { en: "Insect repellent spray", es: "Repelente de insectos en spray" }, detail: { en: "170 ml", es: "170 ml" }, priceUsd: 0, active: false },
  { id: "repellent-lotion", category: "allergy-relief", name: { en: "Insect repellent lotion", es: "Repelente de insectos en loción" }, detail: { en: "120 ml", es: "120 ml" }, priceUsd: 0, active: false },
  { id: "saline-nasal", category: "allergy-relief", name: { en: "Saline nasal spray", es: "Spray nasal salino" }, detail: { en: "30 ml", es: "30 ml" }, priceUsd: 0, active: false },
  { id: "body-wash-fragrance-free", category: "allergy-relief", name: { en: "Fragrance-free body wash", es: "Jabón corporal sin fragancia" }, detail: { en: "400 ml", es: "400 ml" }, priceUsd: 0, active: false },
  { id: "lotion-fragrance-free", category: "allergy-relief", name: { en: "Fragrance-free lotion", es: "Loción sin fragancia" }, detail: { en: "400 ml", es: "400 ml" }, priceUsd: 0, active: false },
  { id: "toothbrush", category: "personal-care", name: { en: "Toothbrush", es: "Cepillo dental" }, detail: { en: "Soft, each", es: "Suave, pieza" }, priceUsd: 0, active: false },
  { id: "toothpaste", category: "personal-care", name: { en: "Toothpaste", es: "Pasta dental" }, detail: { en: "100 ml", es: "100 ml" }, priceUsd: 0, active: false },
  { id: "mouthwash", category: "personal-care", name: { en: "Mouthwash", es: "Enjuague bucal" }, detail: { en: "250 ml", es: "250 ml" }, priceUsd: 0, active: false },
  { id: "deodorant-roll-on", category: "personal-care", name: { en: "Roll-on deodorant", es: "Desodorante roll-on" }, detail: { en: "50 ml", es: "50 ml" }, priceUsd: 0, active: false },
  { id: "razors", category: "personal-care", name: { en: "Disposable razors", es: "Rastrillos desechables" }, detail: { en: "Pack of 3", es: "Paquete de 3" }, priceUsd: 0, active: false },
  { id: "baby-wipes", category: "baby-and-family", name: { en: "Baby wipes", es: "Toallitas húmedas para bebé" }, detail: { en: "Pack of 50", es: "Paquete de 50" }, priceUsd: 0, active: false },
  { id: "diapers-swim", category: "baby-and-family", name: { en: "Swim diapers", es: "Pañales para alberca" }, detail: { en: "Pack of 11", es: "Paquete de 11" }, priceUsd: 0, active: false },
  { id: "diaper-cream", category: "baby-and-family", name: { en: "Diaper rash cream", es: "Crema para rozaduras" }, detail: { en: "60 g", es: "60 g" }, priceUsd: 0, active: false },
  { id: "baby-sunscreen", category: "baby-and-family", name: { en: "Baby sunscreen SPF 50", es: "Protector solar para bebé FPS 50" }, detail: { en: "125 ml", es: "125 ml" }, priceUsd: 0, active: false },
  { id: "sippy-cup", category: "baby-and-family", name: { en: "Sippy cup", es: "Vaso entrenador" }, detail: { en: "Each", es: "Pieza" }, priceUsd: 0, active: false },
  { id: "plug-adapter", category: "travel-basics", name: { en: "Plug adapter", es: "Adaptador de corriente" }, detail: { en: "Each", es: "Pieza" }, priceUsd: 0, active: false },
  { id: "phone-charger", category: "travel-basics", name: { en: "Phone charger cable", es: "Cable cargador para teléfono" }, detail: { en: "1 m", es: "1 m" }, priceUsd: 0, active: false },
  { id: "neck-pillow", category: "travel-basics", name: { en: "Neck pillow", es: "Almohada de cuello" }, detail: { en: "Each", es: "Pieza" }, priceUsd: 0, active: false },
  { id: "motion-bands", category: "travel-basics", name: { en: "Motion-sickness bands", es: "Bandas para mareo" }, detail: { en: "Pair", es: "Par" }, priceUsd: 0, active: false },
  { id: "stain-wipes", category: "travel-basics", name: { en: "Stain remover wipes", es: "Toallitas quitamanchas" }, detail: { en: "Pack of 12", es: "Paquete de 12" }, priceUsd: 0, active: false },
];

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
