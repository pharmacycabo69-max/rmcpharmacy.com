import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Product } from "./products.ts";

/** Server only. A product shows its photo when public/products/<id>.jpg exists; drop the file in and it appears. */
export function withPhotos<T extends Product>(products: T[]): T[] {
  return products.map((p) => (existsSync(join(process.cwd(), "public/products", `${p.id}.jpg`)) ? { ...p, photo: `/products/${p.id}.jpg` } : p));
}
