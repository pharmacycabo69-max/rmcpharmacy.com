import type { Lang } from "./site";

type L = Record<Lang, string>;

export type ServiceFaq = { q: L; a: L };

export type ServiceItem = {
  slug: string;
  name: L;
  metaTitle: L;
  metaDescription: L;
  headline: L;
  intro: L;
  price: L;
  points: L[];
  steps: L[];
  faqs: ServiceFaq[];
  external?: { url: string; label: L };
};

// Service pages are Ads landing pages: they must never mention selling or delivering medicines.
export const SERVICES: ServiceItem[] = [
  {
    slug: "iv-therapy",
    name: { en: "IV therapy at your villa or hotel", es: "Terapia IV en tu villa u hotel" },
    metaTitle: { en: "IV Therapy in Cabo San Lucas", es: "Terapia IV en Cabo San Lucas" },
    metaDescription: {
      en: "IV therapy delivered to your villa, hotel or boat in Cabo San Lucas. From $129 USD. Book on WhatsApp.",
      es: "Terapia IV a tu villa, hotel o yate en Cabo San Lucas. Desde $129 USD. Reserva por WhatsApp.",
    },
    headline: { en: "IV therapy in Cabo, where you are staying", es: "Terapia IV en Cabo, donde te hospedas" },
    intro: {
      en: "Skip the trip. A nurse comes to your villa, hotel room or boat with everything needed for your session while you relax.",
      es: "Sin salir de donde estás. Una enfermera llega a tu villa, habitación de hotel o yate con todo lo necesario para tu sesión.",
    },
    price: { en: "From $129 USD at home", es: "Desde $129 USD a domicilio" },
    points: [
      { en: "We come to you: villas, hotels, marina and boats", es: "Vamos a ti: villas, hoteles, marina y yates" },
      { en: "Book by WhatsApp in English or Spanish", es: "Reserva por WhatsApp en inglés o español" },
      { en: "Clear price before you confirm", es: "Precio claro antes de confirmar" },
    ],
    steps: [
      { en: "Message us on WhatsApp with your location and the time you prefer.", es: "Escríbenos por WhatsApp con tu ubicación y el horario que prefieres." },
      { en: "We confirm the price and the arrival time.", es: "Confirmamos el precio y la hora de llegada." },
      { en: "Our nurse arrives at your door and sets up your session.", es: "Nuestra enfermera llega a tu puerta y prepara tu sesión." },
    ],
    faqs: [
      {
        q: { en: "How much does IV therapy cost in Cabo?", es: "¿Cuánto cuesta la terapia IV en Cabo?" },
        a: { en: "Sessions at your villa or hotel start at $129 USD. Send us a message and we confirm the final price before we come.", es: "Las sesiones en tu villa u hotel comienzan en $129 USD. Escríbenos y confirmamos el precio final antes de ir." },
      },
      {
        q: { en: "Do you come to hotels and villas?", es: "¿Van a hoteles y villas?" },
        a: { en: "Yes. We serve hotels, villas, the marina and boats around Cabo San Lucas.", es: "Sí. Atendemos hoteles, villas, la marina y yates en Cabo San Lucas." },
      },
      {
        q: { en: "How do I book?", es: "¿Cómo reservo?" },
        a: { en: "Tap the WhatsApp button, tell us where you are staying and when you would like us to come.", es: "Toca el botón de WhatsApp, dinos dónde te hospedas y a qué hora quieres que vayamos." },
      },
    ],
  },
  {
    slug: "doctor-consultation",
    name: { en: "Doctor consultation", es: "Consulta médica" },
    metaTitle: { en: "Doctor Consultation in Cabo San Lucas", es: "Consulta médica en Cabo San Lucas" },
    metaDescription: {
      en: "See a doctor by video call from your hotel or villa in Cabo San Lucas, $59 USD. In-person visits also available.",
      es: "Consulta médica por videollamada desde tu hotel o villa en Cabo San Lucas, $59 USD. También presencial.",
    },
    headline: { en: "See a doctor without leaving your vacation", es: "Consulta con un médico sin salir de tus vacaciones" },
    intro: {
      en: "Talk to a doctor by video from wherever you are staying, or visit in person. Service in English and Spanish.",
      es: "Habla con un médico por videollamada desde donde te hospedas, o acude en persona. Atención en inglés y español.",
    },
    price: { en: "Video consultation $59 USD", es: "Consulta por videollamada $59 USD" },
    points: [
      { en: "Video consultation for $59 USD", es: "Consulta por videollamada por $59 USD" },
      { en: "In-person visits also available", es: "También consultas presenciales" },
      { en: "English and Spanish", es: "Inglés y español" },
    ],
    steps: [
      { en: "Message us on WhatsApp and tell us what is going on.", es: "Escríbenos por WhatsApp y cuéntanos qué sucede." },
      { en: "We schedule your video call or in-person visit.", es: "Agendamos tu videollamada o visita presencial." },
      { en: "You talk with the doctor and get your next steps.", es: "Hablas con el médico y recibes tus siguientes pasos." },
    ],
    faqs: [
      {
        q: { en: "How much is a video consultation?", es: "¿Cuánto cuesta la consulta por video?" },
        a: { en: "A video consultation is $59 USD.", es: "La consulta por videollamada cuesta $59 USD." },
      },
      {
        q: { en: "Can I be seen in person?", es: "¿Puedo ser atendido en persona?" },
        a: { en: "Yes. Message us on WhatsApp for in-person availability and price.", es: "Sí. Escríbenos por WhatsApp para disponibilidad y precio de la consulta presencial." },
      },
      {
        q: { en: "Do you speak English?", es: "¿Hablan inglés?" },
        a: { en: "Yes, we attend in English and Spanish.", es: "Sí, atendemos en inglés y español." },
      },
    ],
  },
  {
    slug: "home-nursing",
    name: { en: "Home nursing", es: "Enfermería a domicilio" },
    metaTitle: { en: "Home Nursing in Cabo San Lucas", es: "Enfermería a domicilio en Cabo San Lucas" },
    metaDescription: {
      en: "A nurse at your villa or hotel in Cabo San Lucas. Home nursing with our sister brand Cabo Nurse. Book on WhatsApp.",
      es: "Una enfermera en tu villa u hotel en Cabo San Lucas. Enfermería a domicilio con nuestra marca hermana Cabo Nurse.",
    },
    headline: { en: "A nurse at your villa or hotel", es: "Una enfermera en tu villa u hotel" },
    intro: {
      en: "Home nursing in Cabo San Lucas through our sister brand Cabo Nurse. Tell us what you need and we arrange the visit.",
      es: "Enfermería a domicilio en Cabo San Lucas con nuestra marca hermana Cabo Nurse. Cuéntanos qué necesitas y organizamos la visita.",
    },
    price: { en: "Price confirmed on WhatsApp", es: "Precio confirmado por WhatsApp" },
    points: [
      { en: "Nurse visits to villas, hotels and boats", es: "Visitas de enfermería a villas, hoteles y yates" },
      { en: "English and Spanish", es: "Inglés y español" },
      { en: "Price confirmed before we come", es: "Precio confirmado antes de ir" },
    ],
    steps: [
      { en: "Message us on WhatsApp with your location and what you need.", es: "Escríbenos por WhatsApp con tu ubicación y lo que necesitas." },
      { en: "We confirm the price and the arrival time.", es: "Confirmamos el precio y la hora de llegada." },
      { en: "The nurse arrives at your door.", es: "La enfermera llega a tu puerta." },
    ],
    faqs: [
      {
        q: { en: "Where do you provide home nursing?", es: "¿Dónde ofrecen enfermería a domicilio?" },
        a: { en: "At villas, hotels and boats around Cabo San Lucas.", es: "En villas, hoteles y yates en Cabo San Lucas." },
      },
      {
        q: { en: "How do I request a nurse?", es: "¿Cómo solicito una enfermera?" },
        a: { en: "Tap the WhatsApp button and tell us where you are and what you need.", es: "Toca el botón de WhatsApp y dinos dónde estás y qué necesitas." },
      },
    ],
    external: { url: "https://cabonurse.com", label: { en: "Visit Cabo Nurse", es: "Visitar Cabo Nurse" } },
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
