import type { Post } from "./types";

export const post: Post = {
  slug: "how-hotel-lobby-delivery-works-cabo",
  date: "2027-01-20",
  title: {
    en: "How Hotel Lobby Delivery Works in Cabo",
    es: "Cómo funciona la entrega en el lobby del hotel en Cabo",
  },
  description: {
    en: "Step by step: what to send us, how we confirm your order, how long it takes and how to pay when we deliver to your hotel lobby in Los Cabos.",
    es: "Paso a paso: qué enviarnos, cómo confirmamos tu pedido, cuánto tarda y cómo pagar cuando entregamos en el lobby de tu hotel en Los Cabos.",
  },
  body: {
    en: [
      { p: "Delivery to your hotel should be simple. Here is exactly how it works with us, so there are no surprises." },
      { h: "1. Send us a message" },
      { p: "Write to us on WhatsApp in English or Spanish. Tell us what you need and the name of your hotel. If you can, add the name the reservation is under, so the front desk can hand you the order." },
      { h: "2. We confirm" },
      { p: "We reply with the total and an estimated arrival time. Times depend on your area, from about 15 minutes in the marina and Médano to up to 70 minutes at the far end of the Tourist Corridor and San José del Cabo. They are estimates." },
      { h: "3. We deliver to the lobby" },
      { p: "We bring your order to the lobby of your hotel. For a villa, we confirm with you where to meet." },
      { h: "4. You pay" },
      { p: "You pay by card with a secure payment link that we send in the same WhatsApp chat." },
      { h: "Good to know" },
      { ul: [
        "We deliver every day from 9 am to 6 pm.",
        "Delivery covers Cabo San Lucas, the Tourist Corridor and San José del Cabo.",
        "In our stores, you can pay in cash or by card, in pesos or US dollars.",
      ] },
      { p: "Check your zone on our delivery page for its estimated time. We have {stores} in Cabo San Lucas." },
    ],
    es: [
      { p: "La entrega en tu hotel debe ser sencilla. Así funciona exactamente con nosotros, para que no haya sorpresas." },
      { h: "1. Envíanos un mensaje" },
      { p: "Escríbenos por WhatsApp en inglés o español. Dinos qué necesitas y el nombre de tu hotel. Si puedes, agrega el nombre de la reservación, para que la recepción te entregue el pedido." },
      { h: "2. Confirmamos" },
      { p: "Te respondemos con el total y una hora estimada de llegada. Los tiempos dependen de tu zona, desde unos 15 minutos en la marina y Médano hasta 70 minutos en el extremo del Corredor Turístico y San José del Cabo. Son tiempos estimados." },
      { h: "3. Entregamos en el lobby" },
      { p: "Llevamos tu pedido al lobby de tu hotel. Si es una villa, confirmamos contigo dónde encontrarnos." },
      { h: "4. Pagas" },
      { p: "Pagas con tarjeta mediante un enlace de pago seguro que te enviamos en el mismo chat de WhatsApp." },
      { h: "Es bueno saber" },
      { ul: [
        "Entregamos todos los días de 9 am a 6 pm.",
        "La entrega cubre Cabo San Lucas, el Corredor Turístico y San José del Cabo.",
        "En nuestras tiendas puedes pagar en efectivo o con tarjeta, en pesos o dólares.",
      ] },
      { p: "Revisa tu zona en nuestra página de entrega para ver su tiempo estimado. Tenemos {stores} en Cabo San Lucas." },
    ],
  },
  related: [
    { path: "/delivery", label: { en: "Delivery zones", es: "Zonas de entrega" } },
  ],
  faqs: [
    {
      q: { en: "Do you deliver to my hotel room?", es: "¿Entregan en mi habitación?" },
      a: { en: "We deliver to the hotel lobby.", es: "Entregamos en el lobby del hotel." },
    },
    {
      q: { en: "How do I pay for delivery?", es: "¿Cómo pago la entrega?" },
      a: { en: "By card, with a secure payment link in the WhatsApp chat.", es: "Con tarjeta, mediante un enlace de pago seguro en el chat de WhatsApp." },
    },
    {
      q: { en: "What are your delivery hours?", es: "¿Cuál es el horario de entrega?" },
      a: { en: "Every day from 9 am to 6 pm.", es: "Todos los días de 9 am a 6 pm." },
    },
  ],
};
