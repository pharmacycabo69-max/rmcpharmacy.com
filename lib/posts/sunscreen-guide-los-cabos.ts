import type { Post } from "./types";

export const post: Post = {
  slug: "sunscreen-guide-los-cabos",
  date: "2026-12-30",
  title: {
    en: "How to Choose Sunscreen for Los Cabos",
    es: "Cómo elegir protector solar para Los Cabos",
  },
  description: {
    en: "A simple guide to choosing and using sunscreen on a Los Cabos vacation: what to look for on the label, how often to reapply and what to bring for kids.",
    es: "Una guía sencilla para elegir y usar protector solar en tus vacaciones en Los Cabos: qué buscar en la etiqueta, cada cuánto reaplicar y qué llevar para niños.",
  },
  body: {
    en: [
      { p: "Los Cabos is sunny almost every day, and the water and the white sand reflect even more light. A good sunscreen is the single most useful thing to have in your beach bag." },
      { h: "What to look for on the label" },
      { ul: [
        "Broad-spectrum protection, which covers both kinds of UV rays",
        "A high SPF, commonly 30 or more, and higher for fair skin",
        "Water resistant, if you will swim, snorkel or sweat",
        "A formula you actually like using, because the one you apply is the one that works",
      ] },
      { h: "How to use it" },
      { ul: [
        "Apply it before you leave the room, not when you reach the beach.",
        "Use enough: most people apply too little.",
        "Reapply at least every two hours, and after swimming or toweling off.",
        "Do not forget ears, feet, the back of the neck and the part in your hair.",
        "Add a hat, sunglasses and shade between 11 am and 3 pm.",
      ] },
      { h: "Kids and sensitive skin" },
      { p: "Look for sunscreens made for children and keep babies in the shade. If skin is very sensitive or you have questions about a product, talk to a doctor. We can set up a video consultation for $59 USD." },
      { h: "After the sun" },
      { p: "A cool shower, an after-sun gel or lotion and plenty of water help after a long day outside. If someone feels confused, faint or very ill from the heat, call 911 or go to the nearest emergency room." },
      { p: "We have sun care at our {stores} in Cabo San Lucas, and we can bring it to your hotel or villa." },
    ],
    es: [
      { p: "En Los Cabos hay sol casi todos los días, y el agua y la arena blanca reflejan aún más luz. Un buen protector solar es lo más útil que puedes llevar en tu bolsa de playa." },
      { h: "Qué buscar en la etiqueta" },
      { ul: [
        "Protección de amplio espectro, que cubre los dos tipos de rayos UV",
        "Un FPS alto, normalmente de 30 o más, y mayor para piel clara",
        "Resistente al agua, si vas a nadar, hacer snorkel o sudar",
        "Una fórmula que te guste usar, porque el que te pones es el que funciona",
      ] },
      { h: "Cómo usarlo" },
      { ul: [
        "Aplícalo antes de salir de la habitación, no cuando llegues a la playa.",
        "Usa suficiente: la mayoría se pone muy poco.",
        "Reaplica al menos cada dos horas, y después de nadar o secarte con toalla.",
        "No olvides orejas, pies, la nuca y la parte del cabello.",
        "Suma sombrero, lentes de sol y sombra entre las 11 am y las 3 pm.",
      ] },
      { h: "Niños y piel sensible" },
      { p: "Busca protectores hechos para niños y mantén a los bebés en la sombra. Si la piel es muy sensible o tienes dudas sobre un producto, consulta a un médico. Podemos agendar una consulta por videollamada por $59 USD." },
      { h: "Después del sol" },
      { p: "Una ducha fresca, un gel o loción after-sun y mucha agua ayudan después de un día largo afuera. Si alguien se siente confundido, mareado o muy mal por el calor, llama al 911 o acude a urgencias." },
      { p: "Tenemos productos de protección solar en nuestras {stores} en Cabo San Lucas, y podemos llevarlos a tu hotel o villa." },
    ],
  },
  related: [
    { path: "/pharmacy", label: { en: "Pharmacy and minimarket", es: "Farmacia y minisúper" } },
    { path: "/services/doctor-consultation", label: { en: "Doctor consultation", es: "Consulta médica" } },
  ],
};
