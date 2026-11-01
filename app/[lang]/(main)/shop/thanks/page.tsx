import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Thanks({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  return (
    <div className="container section">
      <h1>{lang === "en" ? "Thank you, your payment was received" : "Gracias, recibimos tu pago"}</h1>
      <p className="lead">
        {lang === "en"
          ? "We will message you on WhatsApp to confirm your order and the delivery time to your hotel or villa."
          : "Te escribiremos por WhatsApp para confirmar tu pedido y la hora de entrega en tu hotel o villa."}
      </p>
      <CtaButtons lang={lang} source="shop-thanks" />
    </div>
  );
}
