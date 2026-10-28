import { hoursSummary } from "./hours.ts";
import { IV_PRODUCTS } from "./ivProducts.ts";
import { LOCATIONS } from "./locations.ts";
import { localizedPath } from "./routes.ts";
import type { Lang } from "./site.ts";
import { whatsappUrl } from "./whatsapp.ts";

export type BotTopic = {
  id: string;
  label: string;
  /** Paragraphs of the preloaded answer. */
  answer: string[];
  /** WhatsApp link with a prefilled message and a ref code (bot-<id>). */
  waUrl: string;
  link?: { label: string; href: string };
};

export type BotConfig = {
  greeting: string;
  pickTopic: string;
  topics: BotTopic[];
  directUrl: string;
  ui: {
    launcher: string;
    title: string;
    subtitle: string;
    notice: string;
    close: string;
    toWhatsApp: string;
    back: string;
    talkToPerson: string;
  };
};

const min = (xs: number[]) => Math.min(...xs);

// Every answer uses only facts the owner confirmed. Anything not confirmed is routed to WhatsApp.
export function buildBot(lang: Lang): BotConfig {
  const en = lang === "en";
  const p = (path: string) => localizedPath(lang, path);
  const wa = (id: string, message: string) => whatsappUrl(lang, `bot-${id}`, message);

  const ivHome = min(IV_PRODUCTS.map((x) => x.home));
  const ivOffice = min(IV_PRODUCTS.map((x) => x.office));
  const hours = LOCATIONS[0]?.hours ? hoursSummary(LOCATIONS[0].hours, lang) : "";

  const topics: BotTopic[] = [
    {
      id: "delivery",
      label: en ? "Delivery to my hotel" : "Entrega en mi hotel",
      answer: en
        ? [
            "We deliver to hotels and villas in all of Cabo San Lucas and San José del Cabo, to the hotel lobby.",
            "Estimated delivery: up to 70 minutes. Delivery hours: every day, 9 am to 6 pm.",
            "You order on WhatsApp and pay by card with a secure link.",
          ]
        : [
            "Entregamos en hoteles y villas de todo Cabo San Lucas y San José del Cabo, en el lobby del hotel.",
            "Entrega estimada: hasta 70 minutos. Horario de entrega: todos los días, de 9 am a 6 pm.",
            "Pides por WhatsApp y pagas con tarjeta mediante un enlace seguro.",
          ],
      waUrl: wa("delivery", en ? "Hi! I'd like to order delivery to my hotel." : "¡Hola! Me gustaría pedir entrega en mi hotel."),
      link: { label: en ? "More about delivery" : "Más sobre la entrega", href: p("/delivery") },
    },
    {
      id: "stores",
      label: en ? "Stores and hours" : "Tiendas y horarios",
      answer: [
        en ? `We are open: ${hours}. Walk-ins welcome, no appointment needed.` : `Abrimos: ${hours}. Atendemos sin cita.`,
        ...LOCATIONS.map((l) => `${l.gbpName} · ${l.addressLine}`),
      ],
      waUrl: wa("stores", en ? "Hi! Which store is closest to me?" : "¡Hola! ¿Qué tienda me queda más cerca?"),
      link: { label: en ? "See all locations" : "Ver todas las sucursales", href: p("/locations") },
    },
    {
      id: "iv",
      label: en ? "IV therapy" : "Terapia IV",
      answer: en
        ? [
            `IV therapy at your villa, hotel or boat starts at $${ivHome} USD. In office it starts at $${ivOffice} USD.`,
            `Options: ${IV_PRODUCTS.map((x) => x.name.en).join(", ")}.`,
            `Groups of 3 or more: from $139 USD per person.`,
          ]
        : [
            `La terapia IV en tu villa, hotel o yate comienza en $${ivHome} USD. En consultorio comienza en $${ivOffice} USD.`,
            `Opciones: ${IV_PRODUCTS.map((x) => x.name.es).join(", ")}.`,
            `Grupos de 3 o más: desde $139 USD por persona.`,
          ],
      waUrl: wa("iv", en ? "Hi, I'd like to book IV therapy in Cabo." : "Hola, me gustaría reservar terapia IV en Cabo."),
      link: { label: en ? "See IV options" : "Ver opciones de IV", href: p("/services/iv-therapy") },
    },
    {
      id: "doctor",
      label: en ? "See a doctor" : "Ver a un médico",
      answer: en
        ? [
            "Video consultation: $59 USD. In-person consultation: $99 USD (30 minutes). A doctor at your villa or hotel: $200 USD.",
            "We attend in English and Spanish.",
            "For severe symptoms such as chest pain, trouble breathing or heavy bleeding, call 911 or go to the nearest emergency room.",
          ]
        : [
            "Consulta por videollamada: $59 USD. Consulta presencial: $99 USD (30 minutos). Médico en tu villa u hotel: $200 USD.",
            "Atendemos en inglés y español.",
            "Ante síntomas graves como dolor de pecho, dificultad para respirar o sangrado intenso, llama al 911 o acude a urgencias.",
          ],
      waUrl: wa("doctor", en ? "Hi, I'd like to see a doctor." : "Hola, me gustaría ver a un médico."),
      link: { label: en ? "Doctor consultation" : "Consulta médica", href: p("/services/doctor-consultation") },
    },
    {
      id: "nursing",
      label: en ? "Home nursing" : "Enfermería a domicilio",
      answer: en
        ? ["A nurse can visit your villa or hotel through our sister brand Cabo Nurse.", "The price depends on what you need, and we confirm it on WhatsApp before we come."]
        : ["Una enfermera puede visitar tu villa u hotel con nuestra marca hermana Cabo Nurse.", "El precio depende de lo que necesites y lo confirmamos por WhatsApp antes de ir."],
      waUrl: wa("nursing", en ? "Hi, I'd like a nurse at my villa or hotel." : "Hola, me gustaría una enfermera en mi villa u hotel."),
      link: { label: en ? "Home nursing" : "Enfermería a domicilio", href: p("/services/home-nursing") },
    },
    {
      id: "payments",
      label: en ? "Payments and languages" : "Pagos e idiomas",
      answer: en
        ? [
            "In the store: cash or card, in Mexican pesos or US dollars.",
            "Delivery: card, with a secure payment link in the WhatsApp chat.",
            "We speak English and Spanish.",
          ]
        : [
            "En tienda: efectivo o tarjeta, en pesos mexicanos o dólares.",
            "Entrega: tarjeta, con un enlace de pago seguro en el chat de WhatsApp.",
            "Hablamos inglés y español.",
          ],
      waUrl: wa("payments", en ? "Hi! I have a question about payments." : "¡Hola! Tengo una pregunta sobre pagos."),
    },
  ];

  return {
    greeting: en
      ? "Hi! I'm RMC's automated assistant. I can answer common questions right away, and you can continue with our team on WhatsApp."
      : "¡Hola! Soy el asistente automático de RMC. Puedo responder las preguntas comunes al instante, y puedes continuar con nuestro equipo por WhatsApp.",
    pickTopic: en ? "What do you need?" : "¿Qué necesitas?",
    topics,
    directUrl: wa("direct", en ? "Hi! I'd like some help from RMC Pharmacy." : "¡Hola! Me gustaría recibir ayuda de RMC Pharmacy."),
    ui: {
      launcher: en ? "Quick answers" : "Respuestas rápidas",
      title: "RMC Pharmacy",
      subtitle: en ? "Automated assistant" : "Asistente automático",
      notice: en ? "Automated answers. A person replies on WhatsApp." : "Respuestas automáticas. Una persona responde por WhatsApp.",
      close: en ? "Close chat" : "Cerrar chat",
      toWhatsApp: en ? "Continue on WhatsApp" : "Continuar en WhatsApp",
      back: en ? "Other questions" : "Otras preguntas",
      talkToPerson: en ? "Talk to a person on WhatsApp" : "Hablar con una persona por WhatsApp",
    },
  };
}
