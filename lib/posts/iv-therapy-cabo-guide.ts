import type { Post } from "./types";

export const post: Post = {
  slug: "iv-therapy-cabo-guide",
  date: "2026-11-04",
  title: {
    en: "IV Therapy in Cabo: What to Expect and How It Works",
    es: "Terapia IV en Cabo: qué esperar y cómo funciona",
  },
  description: {
    en: "How IV therapy at your villa or hotel in Cabo San Lucas works: booking, what happens during the visit and price from $159 USD at home.",
    es: "Cómo funciona la terapia IV en tu villa u hotel en Cabo San Lucas: reserva, cómo es la visita y precio desde $159 USD a domicilio.",
  },
  body: {
    en: [
      { p: "IV therapy is a service where a nurse gives you fluids through an IV drip. Many travelers in Cabo choose it for the convenience of having a session at their villa, hotel or boat instead of going to a clinic. This guide explains how our service works." },
      { h: "How booking works" },
      { ul: [
        "Message us on WhatsApp with your location and the time you prefer.",
        "We confirm the price and the arrival time before we come.",
        "A nurse arrives at your door and sets up your session.",
      ] },
      { h: "What the visit looks like" },
      { p: "You relax on a bed or couch while the session runs. The nurse stays with you, explains each step and answers your questions. You do not need to go anywhere. Most people plan the session around a quiet part of the day." },
      { h: "Price" },
      { p: "IV therapy at your home or hotel starts at $159 USD, and in-office sessions at $129 USD. We confirm the final price on WhatsApp before we come, so there are no surprises." },
      { h: "Who it is not for" },
      { p: "IV therapy is not an emergency service. If you have severe symptoms such as chest pain, trouble breathing, confusion or fainting, call 911 or go to the nearest emergency room. If you have a health condition or take regular treatment, ask your own doctor before booking. We can also set up a doctor consultation by video for $59 USD." },
      { h: "Where we go" },
      { p: "Villas, hotels, the marina and boats around Cabo San Lucas." },
    ],
    es: [
      { p: "La terapia IV es un servicio en el que una enfermera te administra líquidos por goteo intravenoso. Muchos viajeros en Cabo la eligen por la comodidad de tener la sesión en su villa, hotel o yate, en lugar de ir a una clínica. Esta guía explica cómo funciona nuestro servicio." },
      { h: "Cómo se reserva" },
      { ul: [
        "Escríbenos por WhatsApp con tu ubicación y el horario que prefieres.",
        "Confirmamos el precio y la hora de llegada antes de ir.",
        "Una enfermera llega a tu puerta y prepara tu sesión.",
      ] },
      { h: "Cómo es la visita" },
      { p: "Te relajas en una cama o sillón mientras dura la sesión. La enfermera se queda contigo, te explica cada paso y responde tus preguntas. No tienes que ir a ningún lado. Muchas personas programan la sesión en un momento tranquilo del día." },
      { h: "Precio" },
      { p: "La terapia IV a domicilio u hotel comienza en $159 USD, y las de consultorio en $129 USD. Confirmamos el precio final por WhatsApp antes de ir, sin sorpresas." },
      { h: "Para quién no es" },
      { p: "La terapia IV no es un servicio de emergencia. Si tienes síntomas graves como dolor de pecho, dificultad para respirar, confusión o desmayo, llama al 911 o acude a urgencias. Si tienes una condición de salud o sigues un tratamiento, consulta antes a tu médico. También podemos agendar una consulta médica por videollamada por $59 USD." },
      { h: "A dónde vamos" },
      { p: "Villas, hoteles, la marina y yates en Cabo San Lucas." },
    ],
  },
  related: [
    { path: "/services/iv-therapy", label: { en: "IV therapy at your door", es: "Terapia IV a domicilio" } },
    { path: "/services/doctor-consultation", label: { en: "Doctor consultation", es: "Consulta médica" } },
  ],
};
