import { CartProvider } from "@/components/Cart";
import { isLang } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export default async function ShopLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  const fallback = whatsappUrl(lang, "shop-checkout-fallback", lang === "en" ? "Hi! I'd like to place an order." : "¡Hola! Quiero hacer un pedido.");
  return (
    <CartProvider lang={lang} fallback={fallback}>
      {children}
    </CartProvider>
  );
}
