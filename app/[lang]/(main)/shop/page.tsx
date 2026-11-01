import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { ProductShop } from "@/components/ProductShop";
import { buildMetadata } from "@/lib/metadata";
import { withPhotos } from "@/lib/productPhotos";
import { activeProducts } from "@/lib/products";
import { isLang } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const meta = buildMetadata({
    lang,
    enPath: "/shop",
    title: lang === "en" ? "Shop Pharmacy Essentials Online in Cabo" : "Tienda en línea de esenciales de farmacia en Cabo",
    description:
      lang === "en"
        ? "Order over-the-counter essentials and personal care online, pay by card and get delivery to your hotel or villa in Los Cabos."
        : "Pide esenciales de venta libre y cuidado personal en línea, paga con tarjeta y recibe en tu hotel o villa en Los Cabos.",
  });
  return activeProducts().length ? meta : { ...meta, robots: { index: false, follow: true } };
}

export default async function Shop({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  const products = withPhotos(activeProducts());
  const fallback = whatsappUrl(lang, "shop-page", lang === "en" ? "Hi! I'd like to place an order." : "¡Hola! Quiero hacer un pedido.");
  return (
    <div className="container section">
      <h1>{lang === "en" ? "Shop pharmacy essentials" : "Tienda de esenciales de farmacia"}</h1>
      <p className="lead">
        {lang === "en"
          ? "Over-the-counter essentials and personal care, paid by card and delivered to your hotel or villa. Need something else? Ask us on WhatsApp."
          : "Esenciales de venta libre y cuidado personal, pagados con tarjeta y entregados en tu hotel o villa. ¿Necesitas otra cosa? Pregúntanos por WhatsApp."}
      </p>
      {products.length ? (
        <ProductShop lang={lang} products={products} fallback={fallback} />
      ) : (
        <p>{lang === "en" ? "Our online catalog is coming soon. Order now on WhatsApp." : "Nuestro catálogo en línea llegará pronto. Pide ahora por WhatsApp."}</p>
      )}
      <CtaButtons lang={lang} source="shop-page" />
    </div>
  );
}
