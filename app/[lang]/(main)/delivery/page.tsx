import type { Metadata } from "next";
import Link from "next/link";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/ServiceFaqList";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import { localizedPath } from "@/lib/routes";
import { isLang } from "@/lib/site";
import { AREA_LABEL, ZONES, type Zone } from "@/lib/zones";

type Props = { params: Promise<{ lang: string }> };

const FAQS = [
  {
    q: { en: "Where do you deliver?", es: "¿Dónde entregan?" },
    a: {
      en: "Hotels, villas, the marina and boats across Cabo San Lucas, the Tourist Corridor and San José del Cabo. Send us your location on WhatsApp.",
      es: "Hoteles, villas, la marina y yates en Cabo San Lucas, el Corredor Turístico y San José del Cabo. Envíanos tu ubicación por WhatsApp.",
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
      <h2>{lang === "en" ? "Delivery zones" : "Zonas de entrega"}</h2>
      <p className="muted">
        {lang === "en"
          ? "Pick your area to see the estimated delivery time. All times are estimates."
          : "Elige tu zona para ver el tiempo estimado de entrega. Todos los tiempos son estimados."}
      </p>
      {(Object.keys(AREA_LABEL) as Zone["area"][]).map((area) => (
        <div key={area} className="zone-group">
          <h3>{AREA_LABEL[area][lang]}</h3>
          <ul className="zone-grid">
            {ZONES.filter((z) => z.area === area).map((z) => (
              <li key={z.slug}>
                <Link href={localizedPath(lang, `/delivery/${z.slug}`)} className="zone-card">
                  <strong>{z.name[lang]}</strong>
                  <span className="muted">
                    {lang === "en" ? "Estimated" : "Estimado"} {z.etaMin}–{z.etaMax} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2>{lang === "en" ? "Frequently asked questions" : "Preguntas frecuentes"}</h2>
      <FaqList lang={lang} items={FAQS} />
    </div>
  );
}
