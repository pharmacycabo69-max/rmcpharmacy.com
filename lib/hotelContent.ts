import type { Hotel } from "./hotels.ts";
import { getLocation } from "./locations.ts";
import { localizedPath } from "./routes.ts";
import { SITE, type Lang } from "./site.ts";
import { AREA_LABEL, ZONE_PRIMARY_STORE, type Zone } from "./zones.ts";

export type HotelContent = {
  title: string;
  description: string;
  h1: string;
  lead: string;
  howTitle: string;
  steps: string[];
  whereTitle: string;
  where: string[];
  storeHref: string;
  storeName: string;
  categoriesTitle: string;
  categories: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  nearbyTitle: string;
  zoneLinkLabel: string;
  whatsapp: string;
};

const km = (n: number, lang: Lang) => (lang === "en" ? n.toFixed(1) : n.toFixed(1).replace(".", ","));

// Keep the brand in the title unless it would push it past what Google usually shows.
const withBrand = (t: string) => (t.length + 15 <= 75 ? `${t} | RMC Pharmacy` : t);

/** Copy for one hotel page. Times are the zone's agreed estimates; distance is real road distance when known. */
export function hotelContent(h: Hotel, z: Zone, lang: Lang): HotelContent {
  const en = lang === "en";
  const name = h.name;
  const zoneName = z.name[lang];
  const area = AREA_LABEL[z.area][lang];
  const eta = `${z.etaMin}–${z.etaMax}`;
  const hours = SITE.deliveryHoursLabel[lang].toLowerCase();
  const store = getLocation(ZONE_PRIMARY_STORE);
  const storeName = store ? `${store.gbpName} ${store.placeLabel}` : SITE.name;
  const storeHref = localizedPath(lang, store ? `/locations/${store.slug}` : "/locations");
  const isHotel = h.kind === "hotel";

  const dist =
    h.roadKm === null
      ? ""
      : en
        ? ` It is about ${km(h.roadKm, lang)} km by road from our ${storeName} store on the marina.`
        : ` Está a unos ${km(h.roadKm, lang)} km por carretera de nuestra sucursal ${storeName} en la marina.`;

  if (en) {
    return {
      title: withBrand(`Pharmacy Delivery to ${name} | ${eta} min`),
      description: `Pharmacy essentials delivered to ${name}, ${zoneName}. Estimated ${eta} min, ${hours}. Order on WhatsApp and pay by card.`,
      h1: `Pharmacy delivery to ${name}`,
      lead: isHotel
        ? `Staying at ${name}? We bring everyday pharmacy essentials to the hotel lobby. Estimated delivery is ${eta} minutes, ${hours}.`
        : `Staying in a villa or condo in ${name}? We bring everyday pharmacy essentials to where you are staying. Estimated delivery is ${eta} minutes, ${hours}.`,
      howTitle: `How delivery to ${name} works`,
      steps: [
        isHotel
          ? `Message us on WhatsApp. The message already says you are at ${name}; add what you need.`
          : `Message us on WhatsApp with the name or address of your villa in ${name} and what you need.`,
        "We confirm the total and an estimated arrival time.",
        isHotel
          ? `We bring your order to the ${name} lobby, and you pay by card with a secure payment link.`
          : "We confirm with you where to meet, at your door or the entrance you tell us, and you pay by card with a secure payment link.",
      ],
      whereTitle: `Where ${name} is`,
      where: [
        `${name} is in ${zoneName}, ${area}.${dist}`,
        `If you prefer to stop by, the nearest store is ${storeName}, open ${SITE.hoursLabel.en.toLowerCase()}.`,
      ],
      storeHref,
      storeName,
      categoriesTitle: `What guests in ${zoneName} usually ask for`,
      categories: z.categories.en,
      faqTitle: "Frequently asked questions",
      faqs: [
        {
          q: `Do you deliver to ${name}?`,
          a: isHotel
            ? `Yes. We deliver to the lobby of ${name}, with an estimated delivery time of ${eta} minutes. Send us your order on WhatsApp.`
            : `Yes. We deliver to villas and condos in ${name}, with an estimated delivery time of ${eta} minutes. Send us your order and the name or address of your villa on WhatsApp.`,
        },
        {
          q: `How long does delivery to ${name} take?`,
          a: `The estimated time is ${eta} minutes, and it can vary with traffic.${dist}`,
        },
        {
          q: isHotel ? "Can you deliver to my room?" : "Where do you hand over the order?",
          a: isHotel ? "We deliver to the hotel lobby." : "We confirm with you where to meet: your door or the entrance you tell us.",
        },
        { q: "What are your delivery hours?", a: `We deliver ${hours}. Our stores are open ${SITE.hoursLabel.en.toLowerCase()}.` },
        {
          q: "How do I pay?",
          a: "For delivery you pay by card with a secure payment link in the WhatsApp chat. In our stores we accept cash or card, in Mexican pesos or US dollars.",
        },
      ],
      nearbyTitle: `Hotels near ${name}`,
      zoneLinkLabel: `All of ${zoneName}`,
      whatsapp: `Hi! I'm staying at ${name}. I'd like to order delivery. ref: hotel-${h.slug}`,
    };
  }

  return {
    title: withBrand(`Entrega de farmacia en ${name} | ${eta} min`),
    description: `Esenciales de farmacia entregados en ${name}, ${zoneName}. Estimado de ${eta} min, ${hours}. Pide por WhatsApp y paga con tarjeta.`,
    h1: `Entrega de farmacia en ${name}`,
    lead: isHotel
      ? `¿Te hospedas en ${name}? Llevamos esenciales de farmacia al lobby del hotel. La entrega estimada es de ${eta} minutos, ${hours}.`
      : `¿Te hospedas en una villa o condominio en ${name}? Llevamos esenciales de farmacia a donde te hospedas. La entrega estimada es de ${eta} minutos, ${hours}.`,
    howTitle: `Cómo funciona la entrega en ${name}`,
    steps: [
      isHotel
        ? `Escríbenos por WhatsApp. El mensaje ya dice que estás en ${name}; agrega lo que necesitas.`
        : `Escríbenos por WhatsApp con el nombre o la dirección de tu villa en ${name} y lo que necesitas.`,
      "Confirmamos el total y una hora estimada de llegada.",
      isHotel
        ? `Llevamos tu pedido al lobby de ${name} y pagas con tarjeta mediante un enlace de pago seguro.`
        : "Confirmamos contigo dónde encontrarnos, en tu puerta o en la entrada que nos indiques, y pagas con tarjeta mediante un enlace de pago seguro.",
    ],
    whereTitle: `Dónde está ${name}`,
    where: [
      `${name} está en ${zoneName}, ${area}.${dist}`,
      `Si prefieres pasar, la sucursal más cercana es ${storeName}, abierta ${SITE.hoursLabel.es.toLowerCase()}.`,
    ],
    storeHref,
    storeName,
    categoriesTitle: `Lo que suelen pedir los huéspedes en ${zoneName}`,
    categories: z.categories.es,
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: `¿Entregan en ${name}?`,
        a: isHotel
          ? `Sí. Entregamos en el lobby de ${name}, con un tiempo estimado de ${eta} minutos. Envíanos tu pedido por WhatsApp.`
          : `Sí. Entregamos en villas y condominios de ${name}, con un tiempo estimado de ${eta} minutos. Envíanos tu pedido y el nombre o la dirección de tu villa por WhatsApp.`,
      },
      {
        q: `¿Cuánto tarda la entrega en ${name}?`,
        a: `El tiempo estimado es de ${eta} minutos y puede variar con el tráfico.${dist}`,
      },
      {
        q: isHotel ? "¿Pueden entregar en mi habitación?" : "¿Dónde entregan el pedido?",
        a: isHotel ? "Entregamos en el lobby del hotel." : "Confirmamos contigo dónde encontrarnos: tu puerta o la entrada que nos indiques.",
      },
      { q: "¿Cuál es el horario de entrega?", a: `Entregamos ${hours}. Nuestras sucursales abren ${SITE.hoursLabel.es.toLowerCase()}.` },
      {
        q: "¿Cómo pago?",
        a: "Para la entrega pagas con tarjeta mediante un enlace de pago seguro en el chat de WhatsApp. En nuestras sucursales aceptamos efectivo o tarjeta, en pesos o dólares.",
      },
    ],
    nearbyTitle: `Hoteles cerca de ${name}`,
    zoneLinkLabel: `Todo ${zoneName}`,
    whatsapp: `¡Hola! Me hospedo en ${name}. Me gustaría pedir entrega. ref: hotel-${h.slug}`,
  };
}
