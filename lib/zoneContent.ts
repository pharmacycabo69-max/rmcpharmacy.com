import { hoursSummary } from "./hours.ts";
import { getLocation } from "./locations.ts";
import { localizedPath } from "./routes.ts";
import type { Lang } from "./site.ts";
import { AREA_LABEL, ZONE_PRIMARY_STORE, type Zone } from "./zones.ts";

export type ZoneContent = {
  h1: string;
  title: string;
  description: string;
  etaLabel: string;
  leadBefore: string;
  storeName: string;
  storeHref: string;
  leadAfter: string;
  aboutTitle: string;
  blurb: string;
  notes: string;
  hotelsTitle: string;
  hotelsIntro: string;
  hotels: string[];
  categoriesTitle: string;
  categories: string[];
  howTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  otherZonesTitle: string;
  whatsapp: string;
  words: number;
};

export function zoneContent(z: Zone, lang: Lang): ZoneContent {
  const en = lang === "en";
  const name = z.name[lang];
  const area = AREA_LABEL[z.area][lang];
  const eta = `${z.etaMin}–${z.etaMax}`;
  const store = getLocation(ZONE_PRIMARY_STORE);
  const hours = store?.hours ? hoursSummary(store.hours, lang) : "";
  const featured = z.hotels.find((h) => !/^Private/i.test(h)) ?? z.hotels[0];

  const c: ZoneContent = {
    h1: en ? `Pharmacy delivery to ${name}` : `Entrega de farmacia en ${name}`,
    title: en
      ? `Pharmacy Delivery to ${name}, ${area} | ${eta} min | RMC Pharmacy`
      : `Entrega de farmacia en ${name}, ${area} | ${eta} min | RMC Pharmacy`,
    description: en
      ? `Everyday pharmacy essentials delivered to ${name}, ${area}. Estimated delivery ${eta} minutes, to your hotel lobby. Order on WhatsApp.`
      : `Esenciales de farmacia entregados en ${name}, ${area}. Entrega estimada de ${eta} minutos, en el lobby de tu hotel. Pide por WhatsApp.`,
    etaLabel: en ? `Estimated ${eta} min` : `Estimado ${eta} min`,
    leadBefore: en
      ? `Estimated delivery to ${name}: ${eta} minutes. We deliver from `
      : `Entrega estimada en ${name}: ${eta} minutos. Entregamos desde `,
    storeName: store ? `${store.gbpName}, ${store.placeLabel}` : "RMC Pharmacy",
    storeHref: localizedPath(lang, `/locations/${ZONE_PRIMARY_STORE}`),
    leadAfter: en ? `, open ${hours.toLowerCase()}.` : `, abierta ${hours.toLowerCase()}.`,
    aboutTitle: en ? `About ${name}` : `Sobre ${name}`,
    blurb: z.blurb[lang],
    notes: z.notes[lang],
    hotelsTitle: en ? `Hotels and developments in ${name}` : `Hoteles y desarrollos en ${name}`,
    hotelsIntro: en
      ? `We deliver to hotels and villas across ${name}. Some of the places in the area:`
      : `Entregamos en hoteles y villas de ${name}. Algunos de los lugares de la zona:`,
    hotels: z.hotels,
    categoriesTitle: en ? "What guests usually ask for here" : "Lo que suelen pedir aquí",
    categories: z.categories[lang],
    howTitle: en ? "How delivery works" : "Cómo funciona la entrega",
    steps: en
      ? [
          `Message us on WhatsApp with the name of your hotel or villa in ${name}.`,
          `We confirm the total and an estimated arrival time of ${eta} minutes.`,
          "We bring your order to the hotel lobby, and you pay by card with a secure payment link.",
        ]
      : [
          `Escríbenos por WhatsApp con el nombre de tu hotel o villa en ${name}.`,
          `Confirmamos el total y una hora estimada de llegada de ${eta} minutos.`,
          "Llevamos tu pedido al lobby del hotel y pagas con tarjeta mediante un enlace de pago seguro.",
        ],
    faqTitle: en ? "Frequently asked questions" : "Preguntas frecuentes",
    faqs: en
      ? [
          { q: `Do you deliver to ${featured}?`, a: `Yes. We deliver to hotels and villas across ${name}, with an estimated delivery time of ${eta} minutes. Send us the name of your hotel on WhatsApp.` },
          { q: "Can you deliver to the lobby or my room?", a: "We deliver to the hotel lobby. For a villa, we confirm with you where to meet." },
          { q: "Do you accept USD and cards?", a: "For delivery you pay by card with a secure payment link in the WhatsApp chat. In our stores we accept cash or card, in Mexican pesos or US dollars." },
          { q: "Do you speak English?", a: "Yes, we attend in English and Spanish." },
          { q: `How long does delivery to ${name} take?`, a: `The estimated time is ${eta} minutes, and it can vary with traffic and distance. Delivery hours are ${hours.toLowerCase()}.` },
        ]
      : [
          { q: `¿Entregan en ${featured}?`, a: `Sí. Entregamos en hoteles y villas de ${name}, con un tiempo estimado de ${eta} minutos. Envíanos el nombre de tu hotel por WhatsApp.` },
          { q: "¿Pueden entregar en el lobby o en mi habitación?", a: "Entregamos en el lobby del hotel. Si es una villa, confirmamos contigo dónde encontrarnos." },
          { q: "¿Aceptan dólares y tarjetas?", a: "En entregas pagas con tarjeta mediante un enlace de pago seguro en el chat de WhatsApp. En nuestras tiendas aceptamos efectivo o tarjeta, en pesos mexicanos o dólares." },
          { q: "¿Hablan inglés?", a: "Sí, atendemos en inglés y español." },
          { q: `¿Cuánto tarda la entrega en ${name}?`, a: `El tiempo estimado es de ${eta} minutos y puede variar con el tráfico y la distancia. El horario de entrega es ${hours.toLowerCase()}.` },
        ],
    otherZonesTitle: en ? "Other delivery zones" : "Otras zonas de entrega",
    whatsapp: en
      ? `Hi! I'm staying at [hotel name] (${name}). I'd like to order delivery. ref: zone-${z.slug}`
      : `¡Hola! Me hospedo en [nombre del hotel] (${name}). Me gustaría pedir entrega. ref: zone-${z.slug}`,
    words: 0,
  };
  const text = [
    c.h1, c.leadBefore, c.storeName, c.leadAfter, c.aboutTitle, c.blurb, c.notes, c.hotelsTitle, c.hotelsIntro, ...c.hotels,
    c.categoriesTitle, ...c.categories, c.howTitle, ...c.steps, c.faqTitle, ...c.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  c.words = text.split(/\s+/).filter(Boolean).length;
  return c;
}
