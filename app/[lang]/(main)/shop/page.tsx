import type { Metadata } from "next";
import Link from "next/link";
import { CtaButtons } from "@/components/CtaButtons";
import { ProductCard } from "@/components/ProductCard";
import { buildMetadata } from "@/lib/metadata";
import { CATEGORIES, activeProducts, queryProducts } from "@/lib/products";
import { localizedPath } from "@/lib/routes";
import { isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<{ c?: string; q?: string; p?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { lang } = await params;
  const sp = await searchParams;
  if (!isLang(lang)) return {};
  const meta = buildMetadata({
    lang,
    enPath: "/shop",
    title: lang === "en" ? "Shop Pharmacy Essentials Online in Cabo" : "Tienda en línea de esenciales de farmacia en Cabo",
    description:
      lang === "en"
        ? "Order pharmacy and personal care essentials online, pay by card and get delivery to your hotel or villa in Los Cabos."
        : "Pide esenciales de farmacia y cuidado personal en línea, paga con tarjeta y recibe en tu hotel o villa en Los Cabos.",
  });
  return sp.c || sp.q || sp.p ? { ...meta, robots: { index: false, follow: true } } : meta;
}

export default async function Shop({ params, searchParams }: Props) {
  const { lang } = await params;
  const sp = await searchParams;
  if (!isLang(lang)) return null;
  const category = sp.c && CATEGORIES[sp.c] ? sp.c : undefined;
  const q = (sp.q ?? "").slice(0, 60);
  const result = queryProducts({ category, q, page: Number(sp.p) || 1 });
  const base = localizedPath(lang, "/shop");
  const href = (o: { c?: string; q?: string; p?: number }) => {
    const u = new URLSearchParams();
    if (o.c) u.set("c", o.c);
    if (o.q) u.set("q", o.q);
    if (o.p && o.p > 1) u.set("p", String(o.p));
    const s = u.toString();
    return s ? `${base}?${s}` : base;
  };
  const counts = new Map<string, number>();
  for (const p of activeProducts()) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  const cats = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const t = (en: string, es: string) => (lang === "en" ? en : es);

  return (
    <div className="container section">
      <h1>{t("Shop pharmacy essentials", "Tienda de esenciales de farmacia")}</h1>
      <p className="lead">
        {t("Pay by card and get your order delivered to your hotel or villa. Need something else? Ask us on WhatsApp.", "Paga con tarjeta y recibe tu pedido en tu hotel o villa. ¿Necesitas otra cosa? Pregúntanos por WhatsApp.")}
      </p>
      <form action={base} method="get" className="shop-search" role="search">
        {category && <input type="hidden" name="c" value={category} />}
        <input type="search" name="q" defaultValue={q} placeholder={t("Search products", "Buscar productos")} aria-label={t("Search products", "Buscar productos")} maxLength={60} />
        <button type="submit" className="btn btn-primary">{t("Search", "Buscar")}</button>
      </form>
      <nav className="shop-cats" aria-label={t("Categories", "Categorías")}>
        <Link href={href({ q })} aria-current={!category ? "true" : undefined}>{t("All", "Todo")}</Link>
        {cats.map(([slug, n]) => (
          <Link key={slug} href={href({ c: slug, q })} aria-current={category === slug ? "true" : undefined}>
            {CATEGORIES[slug][lang]} <span className="muted">({n})</span>
          </Link>
        ))}
      </nav>
      <p className="muted">
        {result.total} {t("products", "productos")}
      </p>
      {result.items.length ? (
        <ul className="shop-grid">
          {result.items.map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name[lang]} price={p.priceUsd} photo={p.photo!} category={CATEGORIES[p.category][lang]} lang={lang} />
          ))}
        </ul>
      ) : (
        <p>{t("No products found. Try another search or ask us on WhatsApp.", "No encontramos productos. Prueba otra búsqueda o pregúntanos por WhatsApp.")}</p>
      )}
      {result.pages > 1 && (
        <nav className="shop-pager" aria-label={t("Pages", "Páginas")}>
          {result.page > 1 && <Link href={href({ c: category, q, p: result.page - 1 })} rel="prev">← {t("Previous", "Anterior")}</Link>}
          <span>{result.page} / {result.pages}</span>
          {result.page < result.pages && <Link href={href({ c: category, q, p: result.page + 1 })} rel="next">{t("Next", "Siguiente")} →</Link>}
        </nav>
      )}
      <CtaButtons lang={lang} source="shop-page" />
    </div>
  );
}
