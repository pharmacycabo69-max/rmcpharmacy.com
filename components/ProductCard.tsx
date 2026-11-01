"use client";

import Image from "next/image";
import { useCart } from "./Cart";
import type { Lang } from "@/lib/site";

export function ProductCard({ id, name, price, photo, category, lang }: { id: string; name: string; price: number; photo: string; category: string; lang: Lang }) {
  const { items, add, change } = useCart();
  const qty = items.find((i) => i.id === id)?.qty ?? 0;
  return (
    <li className="shop-item">
      <Image className="shop-photo" src={photo} alt={name} width={480} height={360} sizes="(max-width: 720px) 50vw, 240px" loading="lazy" />
      <span className="muted shop-cat">{category}</span>
      <strong className="shop-name">{name}</strong>
      <span className="shop-price">${price.toFixed(2)} USD</span>
      {qty === 0 ? (
        <button type="button" className="btn btn-secondary shop-add" onClick={() => add({ id, name, price, photo })}>
          {lang === "en" ? "Add to order" : "Agregar al pedido"}
        </button>
      ) : (
        <span className="shop-qty">
          <button type="button" onClick={() => change(id, -1)} aria-label={lang === "en" ? "Remove one" : "Quitar uno"}>−</button>
          <output aria-live="polite">{qty}</output>
          <button type="button" onClick={() => add({ id, name, price, photo })} aria-label={lang === "en" ? "Add one" : "Agregar uno"}>+</button>
        </span>
      )}
    </li>
  );
}
