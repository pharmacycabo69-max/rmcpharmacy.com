import type { Post } from "./types";

export const post: Post = {
  slug: "heat-and-sun-safety-cabo",
  date: "2026-11-11",
  title: {
    en: "Sun and Heat Safety on Your Cabo Vacation",
    es: "Cuidado del sol y el calor en tus vacaciones en Cabo",
  },
  description: {
    en: "Simple habits to enjoy the Cabo sun without ruining your trip: hydration, shade, sunscreen and warning signs to watch for.",
    es: "Hábitos sencillos para disfrutar el sol de Cabo sin arruinar tu viaje: hidratación, sombra, protector solar y señales de alerta.",
  },
  body: {
    en: [
      { p: "The sun in Cabo is strong all year, and the combination of heat, water and a few drinks catches many visitors off guard on day one. A few habits make a big difference." },
      { h: "Everyday habits" },
      { ul: [
        "Apply broad-spectrum sunscreen before you go out and reapply at least every two hours, and after swimming.",
        "Drink water through the day, not only when you feel thirsty. Electrolyte drinks help on hot days.",
        "Look for shade between 11 am and 3 pm.",
        "Wear a hat and sunglasses, and light, loose clothes.",
        "Alternate alcoholic drinks with water.",
      ] },
      { h: "If you already got too much sun" },
      { p: "Cool the skin with a lukewarm shower, use an after-sun gel or lotion, drink plenty of water and stay out of the sun for a day. Avoid breaking blisters." },
      { h: "Warning signs" },
      { p: "Heat can become serious. If you or someone with you has confusion, fainting, a very high body temperature, hot and dry skin, or strong vomiting, call 911 or go to the nearest emergency room right away. Do not wait." },
      { h: "Hydration support" },
      { p: "If you feel worn out after a day in the sun, rest, drink fluids and take it easy. Some travelers also book IV therapy at their villa or hotel. It is a service, not an emergency treatment, and it does not replace medical care." },
      { h: "What you can get here" },
      { p: "Sun care, after-sun and hydration items are available at our three stores on the Cabo marina, open every day from 9 am to 6 pm, or delivered to your villa or hotel." },
    ],
    es: [
      { p: "El sol en Cabo es fuerte todo el año, y la combinación de calor, agua y unos tragos sorprende a muchos visitantes desde el primer día. Unos cuantos hábitos hacen una gran diferencia." },
      { h: "Hábitos de todos los días" },
      { ul: [
        "Aplica protector solar de amplio espectro antes de salir y vuelve a aplicarlo al menos cada dos horas, y después de nadar.",
        "Toma agua durante el día, no solo cuando tengas sed. Las bebidas con electrolitos ayudan en días de calor.",
        "Busca sombra entre las 11 am y las 3 pm.",
        "Usa sombrero, lentes de sol y ropa ligera y holgada.",
        "Alterna las bebidas con alcohol con agua.",
      ] },
      { h: "Si ya te pasaste de sol" },
      { p: "Enfría la piel con una ducha tibia, usa gel o loción after-sun, toma mucha agua y evita el sol por un día. No revientes las ampollas." },
      { h: "Señales de alerta" },
      { p: "El calor puede volverse grave. Si tú o alguien contigo tiene confusión, desmayo, temperatura corporal muy alta, piel caliente y seca, o vómito fuerte, llama al 911 o acude a urgencias de inmediato. No esperes." },
      { h: "Apoyo de hidratación" },
      { p: "Si te sientes agotado después de un día de sol, descansa, toma líquidos y ve con calma. Algunos viajeros también reservan terapia IV en su villa u hotel. Es un servicio, no un tratamiento de emergencia, y no sustituye la atención médica." },
      { h: "Lo que puedes conseguir aquí" },
      { p: "Productos de protección solar, after-sun e hidratación están disponibles en nuestras tres sucursales en la marina de Cabo, abiertas todos los días de 9 am a 6 pm, o entregados en tu villa u hotel." },
    ],
  },
  related: [
    { path: "/pharmacy", label: { en: "Pharmacy and minimarket", es: "Farmacia y minisúper" } },
    { path: "/services/iv-therapy", label: { en: "IV therapy at your door", es: "Terapia IV a domicilio" } },
  ],
};
