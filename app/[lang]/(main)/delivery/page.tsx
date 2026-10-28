import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/ServiceFaqList";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import { isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

const FAQS = [
  {
    q: { en: "Where do you deliver?", es: "¿Dónde entregan?" },
    a: {
      en: "Hotels, villas, the marina and boats around Cabo San Lucas. Send us your location on WhatsApp.",
      es: "Hoteles, villas, la marina y yates en Cabo San Lucas. Envíanos tu ubicación por WhatsApp.",
    },
  },
  {
    q: { en: "Can you deliver to the hotel lobby?", es: "¿Pueden entregar en el lobby del hotel?" },
    a: {
      en: "Yes, we deliver to the lobby of your hotel.",
      es: "Sí, entregamos en el lobby de tu hotel.",
    },
  },
  {
    q: { en: "How do I order?", es: "¿Cómo hago un pedido?" },
    a: {
      en: "Message us on WhatsApp, tell us what you need and where you are staying, and we confirm the total and the arrival time.",
      es: "Escríbenos por WhatsApp, dinos qué necesitas y dónde te hospedas, y confirmamos el total y la hora de llegada.",
    },
  },
  {
    q: { en: "How do I pay?", es: "¿Cómo pago?" },
    a: {
      en: "You receive a secure payment link in the chat.",
      es: "Recibes un enlace de pago seguro en el chat.",
    },
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return buildMetadata({
    lang,
    enPath: "/delivery",
    title: lang === "en" ? "Delivery to Your Villa or Hotel in Cabo" : "Entrega a tu villa u hotel en Cabo",
    description:
      lang === "en"
        ? "Order everyday essentials on WhatsApp and get them at your hotel, villa or boat in Cabo San Lucas."
        : "Pide esenciales por WhatsApp y recíbelos en tu hotel, villa o yate en Cabo San Lucas.",
  });
}

export default async function Delivery({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  return (
    <div className="container section">
      <JsonLd data={faqSchema(FAQS.map((f) => ({ q: f.q[lang], a: f.a[lang] })))} />
      <h1>{lang === "en" ? "Delivery to your villa, hotel or boat" : "Entrega en tu villa, hotel o yate"}</h1>
      <p className="lead">
        {lang === "en"
          ? "Order on WhatsApp and we bring everyday essentials to where you are staying."
          : "Pide por WhatsApp y llevamos esenciales de todos los días a donde te hospedas."}
      </p>
      <CtaButtons lang={lang} source="delivery-hero" />
      <h2>{lang === "en" ? "Frequently asked questions" : "Preguntas frecuentes"}</h2>
      <FaqList lang={lang} items={FAQS} />
    </div>
  );
}
