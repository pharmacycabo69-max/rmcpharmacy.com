import type { Post } from "./types";

export const post: Post = {
  slug: "see-a-doctor-in-cabo-on-vacation",
  date: "2026-11-25",
  title: {
    en: "How to See a Doctor in Cabo While on Vacation",
    es: "Cómo ver a un médico en Cabo durante tus vacaciones",
  },
  description: {
    en: "Video or in-person: how to see a doctor in Cabo San Lucas as a visitor, what to prepare and what it costs.",
    es: "Por video o en persona: cómo ver a un médico en Cabo San Lucas como visitante, qué preparar y cuánto cuesta.",
  },
  body: {
    en: [
      { p: "Getting sick on vacation is stressful. You do not know the city, the language may be a barrier, and you do not want to lose a day of your trip. Here is a simple way to get a doctor's help in Cabo." },
      { h: "Video or in person?" },
      { ul: [
        "Video consultation: you talk to a doctor from your villa or hotel. It costs $59 USD.",
        "In person: available too. Message us on WhatsApp for availability and price.",
      ] },
      { h: "How to book" },
      { ul: [
        "Message us on WhatsApp at +52 624 226 1023 and tell us what is going on.",
        "We schedule your video call or visit.",
        "You talk with the doctor and get your next steps.",
      ] },
      { h: "What to prepare" },
      { ul: [
        "A stable internet connection and your phone or laptop charged",
        "A list of your symptoms and when they started",
        "The names of any treatments you currently take and your allergies",
        "Your travel insurance information, in case you need it",
      ] },
      { h: "Language" },
      { p: "We attend in English and Spanish." },
      { h: "When to go straight to the ER" },
      { p: "For chest pain, trouble breathing, severe bleeding, fainting, confusion or a serious injury, call 911 or go to the nearest emergency room. A consultation is not a substitute for emergency care." },
    ],
    es: [
      { p: "Enfermarte de vacaciones es estresante. No conoces la ciudad, el idioma puede ser una barrera y no quieres perder un día de tu viaje. Esta es una forma sencilla de recibir ayuda médica en Cabo." },
      { h: "¿Por video o en persona?" },
      { ul: [
        "Consulta por videollamada: hablas con un médico desde tu villa u hotel. Cuesta $59 USD.",
        "En persona: también disponible. Escríbenos por WhatsApp para disponibilidad y precio.",
      ] },
      { h: "Cómo reservar" },
      { ul: [
        "Escríbenos por WhatsApp al +52 624 226 1023 y cuéntanos qué sucede.",
        "Agendamos tu videollamada o visita.",
        "Hablas con el médico y recibes tus siguientes pasos.",
      ] },
      { h: "Qué preparar" },
      { ul: [
        "Una conexión a internet estable y tu teléfono o laptop cargados",
        "Una lista de tus síntomas y cuándo comenzaron",
        "Los nombres de los tratamientos que tomas actualmente y tus alergias",
        "Los datos de tu seguro de viaje, por si los necesitas",
      ] },
      { h: "Idioma" },
      { p: "Atendemos en inglés y español." },
      { h: "Cuándo ir directo a urgencias" },
      { p: "Ante dolor de pecho, dificultad para respirar, sangrado intenso, desmayo, confusión o una lesión grave, llama al 911 o acude a urgencias. Una consulta no sustituye la atención de emergencia." },
    ],
  },
  related: [
    { path: "/services/doctor-consultation", label: { en: "Doctor consultation", es: "Consulta médica" } },
  ],
};
