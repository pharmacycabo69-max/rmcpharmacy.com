import type { Post } from "./types";

export const post: Post = {
  slug: "pharmacy-delivery-san-jose-del-cabo-corridor",
  date: "2026-12-23",
  title: {
    en: "Pharmacy Delivery to San José del Cabo and the Tourist Corridor",
    es: "Entrega de farmacia en San José del Cabo y el Corredor Turístico",
  },
  description: {
    en: "Staying between Cabo San Lucas and San José del Cabo? What to expect from pharmacy delivery along the Tourist Corridor, with estimated times by area.",
    es: "¿Te hospedas entre Cabo San Lucas y San José del Cabo? Qué esperar de la entrega de farmacia en el Corredor Turístico, con tiempos estimados por zona.",
  },
  body: {
    en: [
      { p: "The Tourist Corridor is the coastal highway that links Cabo San Lucas with San José del Cabo. Many of the best resorts and villas are along it, which also means they are farther from town." },
      { h: "Estimated times by area" },
      { ul: [
        "Cabo Bello and Misiones: 20 to 35 minutes",
        "Chileno Bay and Cabo del Sol: 30 to 45 minutes",
        "Palmilla: 40 to 55 minutes",
        "Costa Azul: 45 to 60 minutes",
        "San José del Cabo hotel zone and downtown: 50 to 65 minutes",
        "Puerto Los Cabos: 55 to 70 minutes",
      ] },
      { p: "These are estimates, and they can change with traffic. 70 minutes is the longest we quote." },
      { h: "Plan ahead if you are far from town" },
      { ul: [
        "Order earlier in the day: we deliver every day from 9 am to 6 pm.",
        "Bundle what the whole group needs into one order.",
        "Tell us your hotel or villa name, and the gate or guard-house details for private communities.",
      ] },
      { h: "How it works" },
      { p: "Message us on WhatsApp, we confirm the total and the estimated time, and we bring your order to the hotel lobby. You pay by card with a secure link. For a villa, we confirm with you where to meet." },
      { p: "Find your area on our delivery page to see its estimated time." },
    ],
    es: [
      { p: "El Corredor Turístico es la carretera costera que une Cabo San Lucas con San José del Cabo. Muchos de los mejores resorts y villas están sobre ella, lo que también significa que quedan más lejos del centro." },
      { h: "Tiempos estimados por zona" },
      { ul: [
        "Cabo Bello y Misiones: de 20 a 35 minutos",
        "Bahía Chileno y Cabo del Sol: de 30 a 45 minutos",
        "Palmilla: de 40 a 55 minutos",
        "Costa Azul: de 45 a 60 minutos",
        "Zona hotelera y centro de San José del Cabo: de 50 a 65 minutos",
        "Puerto Los Cabos: de 55 a 70 minutos",
      ] },
      { p: "Son tiempos estimados y pueden cambiar con el tráfico. 70 minutos es lo máximo que ofrecemos." },
      { h: "Planea con anticipación si estás lejos del centro" },
      { ul: [
        "Pide temprano: entregamos todos los días de 9 am a 6 pm.",
        "Junta lo que necesita todo el grupo en un solo pedido.",
        "Dinos el nombre de tu hotel o villa y los datos de la caseta si es una comunidad privada.",
      ] },
      { h: "Cómo funciona" },
      { p: "Escríbenos por WhatsApp, confirmamos el total y el tiempo estimado, y llevamos tu pedido al lobby del hotel. Pagas con tarjeta mediante un enlace seguro. Si es una villa, confirmamos contigo dónde encontrarnos." },
      { p: "Encuentra tu zona en nuestra página de entrega para ver su tiempo estimado." },
    ],
  },
  related: [
    { path: "/delivery/zona-hotelera-san-jose", label: { en: "San José del Cabo hotel zone", es: "Zona hotelera de San José del Cabo" } },
    { path: "/delivery", label: { en: "All delivery zones", es: "Todas las zonas de entrega" } },
  ],
};
