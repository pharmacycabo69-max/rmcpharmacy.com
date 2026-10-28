import type { Lang } from "./site";

type L = Record<Lang, string>;

// Group IV landing page content. The group price ($139 pp, 3+) was set by the owner's delegation; single home sessions start at $159.
export const GROUPS = {
  metaTitle: { en: "Group IV Therapy in Cabo San Lucas", es: "Terapia IV grupal en Cabo San Lucas" } as L,
  metaDescription: {
    en: "Group IV therapy for bachelorette parties, weddings and retreats in Cabo San Lucas. We come to your villa, hotel or yacht. Book on WhatsApp.",
    es: "Terapia IV grupal para despedidas, bodas y retiros en Cabo San Lucas. Vamos a tu villa, hotel o yate. Reserva por WhatsApp.",
  } as L,
  h1: {
    en: "Group IV Therapy for Bachelorette Parties, Weddings & Retreats in Cabo",
    es: "Terapia IV grupal para despedidas, bodas y retiros en Cabo",
  } as L,
  intro: {
    en: "Planning a group trip to Cabo? Our nurses come to your villa, hotel or yacht and set up sessions for the whole group, so everyone can relax together and stay on schedule.",
    es: "¿Organizas un viaje en grupo a Cabo? Nuestras enfermeras van a tu villa, hotel o yate y preparan sesiones para todo el grupo, para que todos descansen juntos y sigan el plan del viaje.",
  } as L,
  price: { en: "From $139 USD per person, groups of 3+", es: "Desde $139 USD por persona, grupos de 3 o más" } as L,
  packagesTitle: { en: "Packages", es: "Paquetes" } as L,
  packages: [
    { name: { en: "Bachelorette / Bachelor", es: "Despedida de soltera / soltero" } as L, text: { en: "Sessions for the whole party at your villa, hotel or yacht.", es: "Sesiones para todo el grupo en tu villa, hotel o yate." } as L },
    { name: { en: "Wedding Party", es: "Fiesta de boda" } as L, text: { en: "For the wedding party and guests, scheduled around your events.", es: "Para el cortejo y los invitados, programadas según tus eventos." } as L },
    { name: { en: "Corporate Retreat", es: "Retiro corporativo" } as L, text: { en: "Group sessions for teams on retreat, at your hotel or villa.", es: "Sesiones grupales para equipos en retiro, en tu hotel o villa." } as L },
  ],
  stepsTitle: { en: "How it works", es: "Cómo funciona" } as L,
  steps: [
    { en: "Message us on WhatsApp with your dates, group size and location.", es: "Escríbenos por WhatsApp con tus fechas, el tamaño del grupo y la ubicación." } as L,
    { en: "We confirm the price and the schedule for your group.", es: "Confirmamos el precio y el horario para tu grupo." } as L,
    { en: "Our nurses arrive at your door and set up the sessions.", es: "Nuestras enfermeras llegan a tu puerta y preparan las sesiones." } as L,
  ],
  zonesTitle: { en: "Where we go", es: "A dónde vamos" } as L,
  zones: [
    { en: "Villas", es: "Villas" } as L,
    { en: "Hotels", es: "Hoteles" } as L,
    { en: "Yachts", es: "Yates" } as L,
  ],
  faqTitle: { en: "Frequently asked questions", es: "Preguntas frecuentes" } as L,
  faqs: [
    {
      q: { en: "How far in advance should we book?", es: "¿Con cuánta anticipación debemos reservar?" } as L,
      a: { en: "Message us as soon as you have your dates. Last-minute requests depend on availability.", es: "Escríbenos en cuanto tengas tus fechas. Las solicitudes de último momento dependen de la disponibilidad." } as L,
    },
    {
      q: { en: "What is the minimum group size?", es: "¿Cuál es el tamaño mínimo del grupo?" } as L,
      a: { en: "Group pricing is for groups of 3 or more.", es: "El precio grupal es para grupos de 3 o más personas." } as L,
    },
    {
      q: { en: "Can you come to our villa or yacht?", es: "¿Pueden ir a nuestra villa o yate?" } as L,
      a: { en: "Yes. We come to villas, hotels and yachts around Cabo San Lucas.", es: "Sí. Vamos a villas, hoteles y yates en Cabo San Lucas." } as L,
    },
    {
      q: { en: "How do we pay?", es: "¿Cómo pagamos?" } as L,
      a: { en: "We send a secure payment link in the WhatsApp chat once the price is confirmed.", es: "Te enviamos un enlace de pago seguro en el chat de WhatsApp cuando el precio esté confirmado." } as L,
    },
  ],
  note: {
    en: "A nurse performs a brief health screening before each session. Not for emergencies.",
    es: "Una enfermera hace una breve evaluación de salud antes de cada sesión. No es para emergencias.",
  } as L,
  whatsapp: {
    en: "Hi, I'd like to book group IV therapy in Cabo for [date]",
    es: "Hola, me gustaría reservar terapia IV grupal en Cabo para el [fecha]",
  } as L,
};
