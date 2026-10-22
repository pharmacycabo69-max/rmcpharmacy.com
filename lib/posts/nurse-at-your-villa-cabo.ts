import type { Post } from "./types";

export const post: Post = {
  slug: "nurse-at-your-villa-cabo",
  date: "2026-10-21",
  title: {
    en: "When a Nurse Visit at Your Villa Makes Sense",
    es: "Cuándo conviene una enfermera en tu villa",
  },
  description: {
    en: "Home nursing in Cabo San Lucas: common situations where a nurse at your villa or hotel helps, and how to arrange a visit.",
    es: "Enfermería a domicilio en Cabo San Lucas: situaciones comunes en las que ayuda una enfermera en tu villa u hotel y cómo coordinar una visita.",
  },
  body: {
    en: [
      { p: "Sometimes the easiest way to get care on vacation is to have someone come to you. Home nursing brings a nurse to your villa, hotel or boat, so you can stay comfortable and keep your trip on track." },
      { h: "Common situations" },
      { ul: [
        "A traveler who feels unwell and prefers not to leave the villa",
        "Families with young children or older relatives who need extra attention during the trip",
        "Follow-up care that was started at home and needs to continue while you travel, as directed by your own doctor",
        "A group that wants support during a long stay",
      ] },
      { h: "How it works" },
      { ul: [
        "Message us on WhatsApp with your location and what you need.",
        "We confirm the price and the arrival time.",
        "The nurse arrives at your door.",
      ] },
      { p: "Home nursing is provided together with our sister brand, Cabo Nurse. The price depends on what you need, and we confirm it on WhatsApp before we come." },
      { h: "Language" },
      { p: "We attend in English and Spanish." },
      { h: "Not for emergencies" },
      { p: "If someone has chest pain, trouble breathing, severe bleeding, fainting or confusion, call 911 or go to the nearest emergency room." },
    ],
    es: [
      { p: "A veces la forma más fácil de recibir atención en vacaciones es que alguien llegue a ti. La enfermería a domicilio lleva una enfermera a tu villa, hotel o yate, para que estés cómodo y tu viaje siga su curso." },
      { h: "Situaciones comunes" },
      { ul: [
        "Un viajero que no se siente bien y prefiere no salir de la villa",
        "Familias con niños pequeños o familiares mayores que necesitan atención extra durante el viaje",
        "Cuidados de seguimiento iniciados en casa que deben continuar durante el viaje, según indique tu propio médico",
        "Un grupo que quiere apoyo durante una estancia larga",
      ] },
      { h: "Cómo funciona" },
      { ul: [
        "Escríbenos por WhatsApp con tu ubicación y lo que necesitas.",
        "Confirmamos el precio y la hora de llegada.",
        "La enfermera llega a tu puerta.",
      ] },
      { p: "La enfermería a domicilio se ofrece junto con nuestra marca hermana, Cabo Nurse. El precio depende de lo que necesites y lo confirmamos por WhatsApp antes de ir." },
      { h: "Idioma" },
      { p: "Atendemos en inglés y español." },
      { h: "No es para emergencias" },
      { p: "Si alguien tiene dolor de pecho, dificultad para respirar, sangrado intenso, desmayo o confusión, llama al 911 o acude a urgencias." },
    ],
  },
  related: [
    { path: "/services/home-nursing", label: { en: "Home nursing", es: "Enfermería a domicilio" } },
  ],
};
