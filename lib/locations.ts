import { DAYS, everyDay, type Hours } from "./hours.ts";

export { DAYS };
export type { Day, DayHours, Hours } from "./hours.ts";

// Single source of truth for NAP. Page content, JSON-LD, footer and sitemap all read from here.
// A published store must have phone, hours and addressLine (see validateLocations); unpublished stores
// may keep unknown fields as null and are invisible everywhere on the site.
type L = { en: string; es: string };

export type Photo = { src: string; alt: L; width: number; height: number };
export type Faq = { q: L; a: L };

export type Location = {
  slug: string;
  kind: "pharmacy";
  /** Exact Google Business Profile name. H1, title, schema and contact blocks use this verbatim. */
  gbpName: string;
  brand: string;
  neighborhood: string;
  /** Plaza or street used as the title qualifier, e.g. "Plaza Gali". */
  placeLabel: string;
  addressLine: string;
  postalCode: string;
  city: string;
  region: string;
  phone: string | null;
  hours: Hours | null;
  geo: { lat: number; lng: number } | null;
  mapsUrl: string | null;
  reviewUrl: string | null;
  photos: Photo[];
  /** Slugs of /services/* pages. */
  services: string[];
  delivers: boolean;
  /** Paragraphs separated by a blank line. */
  intro: L | null;
  faq: Faq[];
  isPublished: boolean;
  /** Published, but some data still needs the owner's confirmation. Listed in the final report; does not block the build. */
  needsReview: boolean;
};

const BRAND_PHONE = "+52 624 226 1023";
const RMC_HOURS = everyDay("09:00", "18:00");
const COMMON = { postalCode: "23450", city: "Cabo San Lucas", region: "B.C.S." };

const RMC_FAQ: Faq[] = [
  {
    q: { en: "Do you deliver to hotels?", es: "¿Entregan en hoteles?" },
    a: {
      en: "Yes, to hotels and villas in Cabo San Lucas and San José del Cabo. Estimated delivery up to 70 minutes.",
      es: "Sí, en hoteles y villas de Cabo San Lucas y San José del Cabo. Entrega estimada de hasta 70 minutos.",
    },
  },
  {
    q: { en: "Can you deliver to the hotel lobby?", es: "¿Pueden entregar en el lobby del hotel?" },
    a: {
      en: "Yes, we deliver to the lobby of your hotel. Send us the hotel name on WhatsApp.",
      es: "Sí, entregamos en el lobby de tu hotel. Envíanos el nombre del hotel por WhatsApp.",
    },
  },
  {
    q: { en: "Do you speak English?", es: "¿Hablan inglés?" },
    a: { en: "Yes, English and Spanish.", es: "Sí, inglés y español." },
  },
  {
    q: { en: "Do I need an appointment?", es: "¿Necesito cita?" },
    a: {
      en: "No, you can walk in. We attend without an appointment.",
      es: "No, puedes pasar directamente. Atendemos sin cita.",
    },
  },
  {
    q: { en: "What payment methods do you accept in the store?", es: "¿Qué formas de pago aceptan en la tienda?" },
    a: {
      en: "Cash or card, in Mexican pesos or US dollars.",
      es: "Efectivo o tarjeta, en pesos mexicanos o en dólares.",
    },
  },
  {
    q: { en: "How do I pay for a delivery?", es: "¿Cómo pago una entrega?" },
    a: {
      en: "You pay by card through a secure payment link in the WhatsApp chat where you place your order.",
      es: "Pagas con tarjeta mediante un enlace de pago seguro en el chat de WhatsApp donde haces tu pedido.",
    },
  },
];

const RMC_SERVICES = ["iv-therapy", "doctor-consultation", "home-nursing"];

const RMC_BASE = {
  kind: "pharmacy" as const,
  brand: "RMC",
  gbpName: "RMC Pharmacy",
  neighborhood: "Centro, Marina",
  ...COMMON,
  phone: BRAND_PHONE,
  hours: RMC_HOURS,
  reviewUrl: null,
  photos: [] as Photo[],
  services: RMC_SERVICES,
  delivers: true,
  faq: RMC_FAQ,
  isPublished: true,
  needsReview: false,
};

export const ALL_LOCATIONS: Location[] = [
  {
    ...RMC_BASE,
    slug: "plaza-gali",
    reviewUrl: "https://g.page/r/Cd-qhz6zjhAaEAI/review",
    placeLabel: "Plaza Gali",
    photos: [
      { src: "/locations/plaza-gali/01-storefront.jpg", width: 1600, height: 1069, alt: { en: "Storefront of RMC Pharmacy at Plaza Gali", es: "Fachada de RMC Pharmacy en Plaza Gali" } },
      { src: "/locations/plaza-gali/02-street-view.jpg", width: 1600, height: 1200, alt: { en: "RMC Pharmacy seen from the walkway at Plaza Gali", es: "RMC Pharmacy vista desde el pasillo de Plaza Gali" } },
      { src: "/locations/plaza-gali/03-interior-entrance.jpg", width: 1600, height: 1200, alt: { en: "Inside RMC Pharmacy at Plaza Gali, looking toward the entrance", es: "Interior de RMC Pharmacy en Plaza Gali, mirando hacia la entrada" } },
      { src: "/locations/plaza-gali/04-interior-shelves.jpg", width: 1600, height: 1069, alt: { en: "Shelves with personal care and sun care products inside RMC Pharmacy at Plaza Gali", es: "Estantes con productos de cuidado personal y protección solar dentro de RMC Pharmacy en Plaza Gali" } },
      { src: "/locations/plaza-gali/05-counter-team.jpg", width: 1600, height: 1069, alt: { en: "Team member at the counter of RMC Pharmacy at Plaza Gali", es: "Integrante del equipo en el mostrador de RMC Pharmacy en Plaza Gali" } },
      { src: "/locations/plaza-gali/06-sun-care.jpg", width: 1600, height: 1069, alt: { en: "Sun care products on the shelves at RMC Pharmacy, Plaza Gali", es: "Productos de protección solar en los estantes de RMC Pharmacy, Plaza Gali" } },
      { src: "/locations/plaza-gali/07-counter-service.jpg", width: 1600, height: 1069, alt: { en: "Team member serving at the counter of RMC Pharmacy, Plaza Gali", es: "Integrante del equipo atendiendo en el mostrador de RMC Pharmacy, Plaza Gali" } },
    ],
    addressLine: "Plaza Gali, Blvd. Paseo de la Marina, Loc 47",
    geo: { lat: 22.8783056, lng: -109.9089587 },
    mapsUrl: "https://maps.app.goo.gl/hiNCXGKqXwE5JRv2A",
    intro: {
      en: `RMC Pharmacy at Plaza Gali is a pharmacy and minimarket on Blvd. Paseo de la Marina, in the Centro and Marina area of Cabo San Lucas. You will find us at Loc 47, open every day from 9 am to 6 pm. Our team speaks English and Spanish, so you can ask for what you need in the language you prefer.

Come in for everyday essentials such as sun care, first aid, hydration and personal care, or message us on WhatsApp at +52 624 226 1023 to check what we have before you walk over.

If you would rather stay where you are, we deliver to hotels and villas in Cabo San Lucas and San José del Cabo, with estimated delivery of up to 70 minutes. You place the order in a WhatsApp chat and pay by card through a secure link.

This store also connects you with our services: IV therapy at your villa or hotel from $159 USD, doctor consultations by video for $59 USD, and home nursing with our sister brand Cabo Nurse.`,
      es: `RMC Pharmacy en Plaza Gali es una farmacia y minisúper sobre Blvd. Paseo de la Marina, en la zona Centro y Marina de Cabo San Lucas. Nos encuentras en el Loc 47, abiertos todos los días de 9 am a 6 pm. Nuestro equipo habla inglés y español, así que puedes pedir lo que necesitas en el idioma que prefieras.

Pasa por esenciales de todos los días como protección solar, primeros auxilios, hidratación y cuidado personal, o escríbenos por WhatsApp al +52 624 226 1023 para revisar qué tenemos antes de venir.

Si prefieres quedarte donde estás, entregamos en hoteles y villas de Cabo San Lucas y San José del Cabo, con entrega estimada de hasta 70 minutos. Haces el pedido en un chat de WhatsApp y pagas con tarjeta mediante un enlace seguro.

Esta sucursal también te conecta con nuestros servicios: terapia IV en tu villa u hotel desde $159 USD, consultas médicas por video por $59 USD y enfermería a domicilio con nuestra marca hermana Cabo Nurse.`,
    },
  },
  {
    ...RMC_BASE,
    slug: "plaza-embarcadero",
    reviewUrl: "https://g.page/r/CYk7bBeziXGqEAI/review",
    placeLabel: "Plaza Embarcadero",
    needsReview: true, // owner to confirm whether the GBP listing is "Boulevard Marina local 36"
    photos: [
      { src: "/locations/plaza-embarcadero/01-storefront.jpg", width: 1360, height: 1020, alt: { en: "Storefront of RMC Pharmacy at Plaza Embarcadero", es: "Fachada de RMC Pharmacy en Plaza Embarcadero" } },
      { src: "/locations/plaza-embarcadero/02-interior-entrance.jpg", width: 1360, height: 1018, alt: { en: "Inside RMC Pharmacy at Plaza Embarcadero, looking toward the entrance", es: "Interior de RMC Pharmacy en Plaza Embarcadero, mirando hacia la entrada" } },
      { src: "/locations/plaza-embarcadero/03-display-shelves.jpg", width: 765, height: 1020, alt: { en: "Display shelves inside RMC Pharmacy at Plaza Embarcadero", es: "Estantes de exhibición dentro de RMC Pharmacy en Plaza Embarcadero" } },
      { src: "/locations/plaza-embarcadero/04-entrance.jpg", width: 1360, height: 909, alt: { en: "Entrance of RMC Pharmacy at Plaza Embarcadero", es: "Entrada de RMC Pharmacy en Plaza Embarcadero" } },
    ],
    addressLine: "Blvd. Paseo de la Marina S/N, Local 15 Plaza Embarcadero",
    geo: { lat: 22.8786485, lng: -109.908936 },
    mapsUrl: "https://maps.app.goo.gl/vTE4irdJb2eLEKju6",
    intro: {
      en: `Our Plaza Embarcadero store is RMC Pharmacy at Local 15, on Blvd. Paseo de la Marina in Cabo San Lucas. It is a pharmacy and minimarket open every day from 9 am to 6 pm, with service in English and Spanish.

Visit us for everyday essentials, including sun care, first aid, hydration and personal care. If you are not sure we carry something, send a message to +52 624 226 1023 on WhatsApp and we will tell you before you make the trip.

Not in the mood to go out? Order delivery to your hotel or villa anywhere in Cabo San Lucas and San José del Cabo. Estimated delivery is up to 70 minutes. The whole order happens in WhatsApp, and you pay by card with a secure payment link.

Besides the store, you can book IV therapy at your door from $159 USD, a video consultation with a doctor for $59 USD, or a nurse visit through our sister brand Cabo Nurse. Ask us on WhatsApp and we arrange it for the day and place that suit you.`,
      es: `Nuestra sucursal en Plaza Embarcadero es RMC Pharmacy en el Local 15, sobre Blvd. Paseo de la Marina en Cabo San Lucas. Es una farmacia y minisúper abierta todos los días de 9 am a 6 pm, con atención en inglés y español.

Visítanos por esenciales de todos los días, entre ellos protección solar, primeros auxilios, hidratación y cuidado personal. Si no estás seguro de que tengamos algo, escríbenos al +52 624 226 1023 por WhatsApp y te avisamos antes de que hagas el viaje.

¿No quieres salir? Pide entrega en tu hotel o villa en cualquier punto de Cabo San Lucas y San José del Cabo. La entrega estimada es de hasta 70 minutos. Todo el pedido se hace por WhatsApp y pagas con tarjeta mediante un enlace de pago seguro.

Además de la tienda, puedes reservar terapia IV en tu puerta desde $159 USD, una consulta por video con un médico por $59 USD o la visita de una enfermera con nuestra marca hermana Cabo Nurse. Pregúntanos por WhatsApp y lo coordinamos para el día y el lugar que te convengan.`,
    },
  },
  {
    ...RMC_BASE,
    slug: "mercado-marina",
    reviewUrl: "https://g.page/r/CXz8ZpnRA7MbEAI/review",
    placeLabel: "Mercado Marina",
    photos: [
      { src: "/locations/mercado-marina/01-storefront.jpg", width: 1600, height: 1500, alt: { en: "Storefront of RMC Pharmacy at Mercado Marina", es: "Fachada de RMC Pharmacy en Mercado Marina" } },
      { src: "/locations/mercado-marina/02-counter-service.jpg", width: 1600, height: 1069, alt: { en: "Team member at the counter of RMC Pharmacy at Mercado Marina", es: "Integrante del equipo en el mostrador de RMC Pharmacy en Mercado Marina" } },
      { src: "/locations/mercado-marina/03-team.jpg", width: 1600, height: 1069, alt: { en: "Team member behind the counter at RMC Pharmacy, Mercado Marina", es: "Integrante del equipo detrás del mostrador en RMC Pharmacy, Mercado Marina" } },
      { src: "/locations/mercado-marina/04-counter-overview.jpg", width: 1600, height: 1276, alt: { en: "Service counter and shelves at RMC Pharmacy, Mercado Marina", es: "Mostrador y estantes en RMC Pharmacy, Mercado Marina" } },
      { src: "/locations/mercado-marina/05-shelves.jpg", width: 1600, height: 1069, alt: { en: "Shelves with personal care and everyday products at RMC Pharmacy, Mercado Marina", es: "Estantes con productos de cuidado personal y de uso diario en RMC Pharmacy, Mercado Marina" } },
      { src: "/locations/mercado-marina/06-interior.jpg", width: 1200, height: 1600, alt: { en: "Store interior with shelves and a drinks cooler at RMC Pharmacy, Mercado Marina", es: "Interior de la tienda con estantes y un refrigerador de bebidas en RMC Pharmacy, Mercado Marina" } },
    ],
    addressLine: "Mercado Marina 11",
    geo: { lat: 22.8790589, lng: -109.9078648 },
    mapsUrl: "https://maps.app.goo.gl/hC9a9RiRt451juuG6",
    intro: {
      en: `RMC Pharmacy at Mercado Marina 11 is one of our stores in the Centro and Marina area of Cabo San Lucas. We are a pharmacy and minimarket, open every day from 9 am to 6 pm, and we attend in English and Spanish.

Stop by for the everyday things travelers run out of: sun care, first aid, hydration and personal care. You can also write to us on WhatsApp at +52 624 226 1023 and ask about availability before you come.

We bring the store to you as well. Delivery goes to hotels and villas in Cabo San Lucas and San José del Cabo, with an estimated delivery time of up to 70 minutes. You order in a WhatsApp chat and pay by card through a secure link.

If you need more than a product, ask about our services: IV therapy at your hotel or villa from $159 USD, video consultations with a doctor for $59 USD, and home nursing with our sister brand Cabo Nurse. Message us and tell us where you are staying.`,
      es: `RMC Pharmacy en Mercado Marina 11 es una de nuestras sucursales en la zona Centro y Marina de Cabo San Lucas. Somos una farmacia y minisúper, abiertos todos los días de 9 am a 6 pm, y atendemos en inglés y español.

Pasa por lo que suele faltarle a los viajeros: protección solar, primeros auxilios, hidratación y cuidado personal. También puedes escribirnos por WhatsApp al +52 624 226 1023 y preguntar por disponibilidad antes de venir.

También llevamos la tienda hasta ti. La entrega llega a hoteles y villas de Cabo San Lucas y San José del Cabo, con un tiempo estimado de hasta 70 minutos. Pides en un chat de WhatsApp y pagas con tarjeta mediante un enlace seguro.

Si necesitas algo más que un producto, pregunta por nuestros servicios: terapia IV en tu hotel o villa desde $159 USD, consultas por video con un médico por $59 USD y enfermería a domicilio con nuestra marca hermana Cabo Nurse. Escríbenos y dinos dónde te hospedas.`,
    },
  },
  // Other brands. Unknown fields stay null and the store stays unpublished until the owner confirms them.
  {
    slug: "celeste",
    kind: "pharmacy",
    gbpName: "Celeste Pharmacy",
    brand: "Celeste",
    neighborhood: "Downtown, Centro",
    placeLabel: "Blvd. Lázaro Cárdenas",
    addressLine: "Blvd. Lázaro Cárdenas, Dep 17",
    ...COMMON,
    phone: BRAND_PHONE,
    hours: RMC_HOURS,
    geo: { lat: 22.8859589, lng: -109.9123647 },
    mapsUrl: "https://maps.app.goo.gl/oKHoed9RCi8RvGTV8",
    reviewUrl: "https://g.page/r/CSfj98p78gqZEAI/review",
    photos: [
      { src: "/locations/celeste/01-storefront.jpg", width: 1600, height: 1069, alt: { en: "Storefront of Celeste Pharmacy", es: "Fachada de Celeste Pharmacy" } },
      { src: "/locations/celeste/02-sign.jpg", width: 1600, height: 900, alt: { en: "Celeste Pharmacy sign above the entrance", es: "Letrero de Celeste Pharmacy sobre la entrada" } },
      { src: "/locations/celeste/03-interior-counter.jpg", width: 1600, height: 1069, alt: { en: "Counter and display cases inside Celeste Pharmacy", es: "Mostrador y vitrinas dentro de Celeste Pharmacy" } },
      { src: "/locations/celeste/04-personal-care.jpg", width: 1600, height: 1069, alt: { en: "Personal care products on display at Celeste Pharmacy", es: "Productos de cuidado personal en exhibición en Celeste Pharmacy" } },
      { src: "/locations/celeste/05-interior-wide.jpg", width: 1600, height: 1200, alt: { en: "Inside Celeste Pharmacy", es: "Interior de Celeste Pharmacy" } },
    ],
    services: RMC_SERVICES,
    delivers: true,
    intro: {
      en: `Celeste Pharmacy is a pharmacy and minimarket on Blvd. Lázaro Cárdenas, Dep 17, in the downtown (Centro) area of Cabo San Lucas. We are open every day from 9 am to 6 pm and we attend in English and Spanish.

Visit us for everyday essentials, including personal care, sun care, first aid and hydration. If you would like to check what we have before you come, send a message on WhatsApp to +52 624 226 1023.

We also bring the pharmacy to you. Delivery goes to hotels and villas in Cabo San Lucas and San José del Cabo, with an estimated delivery time of up to 70 minutes. You place your order in a WhatsApp chat and pay by card through a secure payment link.

Our services are available from this store as well: IV therapy at your villa or hotel, doctor consultations by video, and home nursing. Message us on WhatsApp, tell us where you are staying and we arrange it with you.`,
      es: `Celeste Pharmacy es una farmacia y minisúper en Blvd. Lázaro Cárdenas, Dep 17, en la zona Centro de Cabo San Lucas. Abrimos todos los días de 9 am a 6 pm y atendemos en inglés y español.

Visítanos por esenciales de todos los días, entre ellos cuidado personal, protección solar, primeros auxilios e hidratación. Si quieres revisar qué tenemos antes de venir, escríbenos por WhatsApp al +52 624 226 1023.

También llevamos la farmacia hasta ti. La entrega llega a hoteles y villas de Cabo San Lucas y San José del Cabo, con un tiempo estimado de hasta 70 minutos. Haces tu pedido en un chat de WhatsApp y pagas con tarjeta mediante un enlace de pago seguro.

Nuestros servicios también están disponibles desde esta sucursal: terapia IV en tu villa u hotel, consultas médicas por video y enfermería a domicilio. Escríbenos por WhatsApp, dinos dónde te hospedas y lo coordinamos contigo.`,
    },
    faq: RMC_FAQ,
    isPublished: true,
    needsReview: false,
  },
  {
    slug: "ocean",
    kind: "pharmacy",
    gbpName: "Ocean Pharmacy",
    brand: "Ocean",
    neighborhood: "Marina",
    placeLabel: "Paseo de la Marina",
    addressLine: "Blvd. Paseo de la Marina 103, Andador Módulo 103",
    ...COMMON,
    phone: BRAND_PHONE,
    hours: RMC_HOURS,
    geo: { lat: 22.8792611, lng: -109.9088094 },
    mapsUrl: "https://maps.app.goo.gl/hUKii4Xvy8FG1Sg78",
    reviewUrl: "https://g.page/r/CYFBh9X3v9bqEAI/review",
    photos: [
      { src: "/locations/ocean/01-kiosk-marina.jpg", width: 1600, height: 1069, alt: { en: "Ocean Pharmacy module on Paseo de la Marina", es: "Módulo de Ocean Pharmacy sobre Paseo de la Marina" } },
      { src: "/locations/ocean/02-kiosk-front.jpg", width: 1200, height: 1600, alt: { en: "Front of the Ocean Pharmacy module with open shelves", es: "Frente del módulo de Ocean Pharmacy con estantes abiertos" } },
      { src: "/locations/ocean/03-team-service.jpg", width: 1600, height: 1069, alt: { en: "Team member serving at the Ocean Pharmacy counter", es: "Integrante del equipo atendiendo en el mostrador de Ocean Pharmacy" } },
      { src: "/locations/ocean/04-counter-overview.jpg", width: 1600, height: 1200, alt: { en: "Counter and shelves at Ocean Pharmacy", es: "Mostrador y estantes en Ocean Pharmacy" } },
      { src: "/locations/ocean/05-sun-care-shelves.jpg", width: 1600, height: 1069, alt: { en: "Sun care and everyday products on the shelves at Ocean Pharmacy", es: "Protección solar y productos de uso diario en los estantes de Ocean Pharmacy" } },
      { src: "/locations/ocean/06-counter-team.jpg", width: 1600, height: 1068, alt: { en: "Team member at the Ocean Pharmacy counter", es: "Integrante del equipo en el mostrador de Ocean Pharmacy" } },
    ],
    services: RMC_SERVICES,
    delivers: true,
    intro: {
      en: `Ocean Pharmacy is a pharmacy and minimarket in a module on Paseo de la Marina, at Andador Módulo 103, in the marina area of Cabo San Lucas. We are open every day from 9 am to 6 pm and we attend in English and Spanish.

Stop by for everyday things travelers look for near the marina, such as sun care, first aid, hydration and personal care. You can also write to us on WhatsApp at +52 624 226 1023 and ask about availability before you walk over.

If you would rather stay on your boat, at your hotel or in your villa, we deliver in Cabo San Lucas and San José del Cabo, with an estimated delivery time of up to 70 minutes. The order happens in a WhatsApp chat, and you pay by card through a secure payment link.

From this store you can also book our services: IV therapy at your villa or hotel, doctor consultations by video, and home nursing. Message us and tell us where you are.`,
      es: `Ocean Pharmacy es una farmacia y minisúper en un módulo sobre Paseo de la Marina, en Andador Módulo 103, en la zona de la marina de Cabo San Lucas. Abrimos todos los días de 9 am a 6 pm y atendemos en inglés y español.

Pasa por lo que suelen buscar los viajeros cerca de la marina, como protección solar, primeros auxilios, hidratación y cuidado personal. También puedes escribirnos por WhatsApp al +52 624 226 1023 y preguntar por disponibilidad antes de venir.

Si prefieres quedarte en tu yate, en tu hotel o en tu villa, entregamos en Cabo San Lucas y San José del Cabo, con un tiempo estimado de hasta 70 minutos. El pedido se hace en un chat de WhatsApp y pagas con tarjeta mediante un enlace de pago seguro.

Desde esta sucursal también puedes reservar nuestros servicios: terapia IV en tu villa u hotel, consultas médicas por video y enfermería a domicilio. Escríbenos y dinos dónde estás.`,
    },
    faq: RMC_FAQ,
    isPublished: true,
    needsReview: false,
  },
];

/** Fails loudly (build and dev) when a published store is missing data. */
export function validateLocations(list: Location[]): void {
  const problems: string[] = [];
  for (const l of list.filter((x) => x.isPublished)) {
    const missing: string[] = [];
    if (!l.phone) missing.push("phone");
    if (!l.hours) missing.push("hours");
    if (!l.addressLine) missing.push("addressLine");
    if (!l.intro) missing.push("intro");
    if (l.faq.length < 2) missing.push("faq (at least 2)");
    if (missing.length) problems.push(`"${l.slug}" is published but is missing: ${missing.join(", ")}`);
  }
  if (problems.length) {
    throw new Error(
      `Cannot build: ${problems.join("; ")}. Fill the missing fields in lib/locations.ts or set isPublished: false.`,
    );
  }
}

validateLocations(ALL_LOCATIONS);

/** Published stores only. Everything on the site reads this. */
export const LOCATIONS: Location[] = ALL_LOCATIONS.filter((l) => l.isPublished);

export const PHARMACIES: Location[] = LOCATIONS;


export function getLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug);
}

/** The H1 is always the exact Google Business Profile name. */
export function locationH1(l: Location) {
  return l.gbpName;
}

export function fullAddress(l: Location) {
  return `${l.addressLine}, ${l.neighborhood}, ${l.postalCode} ${l.city}, ${l.region}`;
}

export function directionsUrl(l: Location) {
  if (l.mapsUrl) return l.mapsUrl;
  if (l.geo) return `https://www.google.com/maps/dir/?api=1&destination=${l.geo.lat},${l.geo.lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${l.gbpName} ${fullAddress(l)}`)}`;
}

const NUMBER_WORDS = {
  en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
  es: ["cero", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez"],
};

/** "three stores" / "tres sucursales", computed from the published array. */
export function storeCountLabel(lang: "en" | "es", n: number = PHARMACIES.length) {
  const word = n <= 10 ? NUMBER_WORDS[lang][n] : String(n);
  if (lang === "en") return `${word} ${n === 1 ? "store" : "stores"}`;
  return `${word} ${n === 1 ? "sucursal" : "sucursales"}`;
}
