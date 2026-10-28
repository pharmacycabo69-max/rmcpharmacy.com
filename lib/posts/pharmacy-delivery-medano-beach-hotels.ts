import type { Post } from "./types";

export const post: Post = {
  slug: "pharmacy-delivery-medano-beach-hotels",
  date: "2026-12-16",
  title: {
    en: "Pharmacy Delivery to Médano Beach Hotels",
    es: "Entrega de farmacia en hoteles de Playa Médano",
  },
  description: {
    en: "Staying on Médano Beach? How pharmacy delivery to your resort works, how long it takes and what guests there ask for most.",
    es: "¿Te hospedas en Playa Médano? Cómo funciona la entrega de farmacia a tu resort, cuánto tarda y qué suelen pedir los huéspedes.",
  },
  body: {
    en: [
      { p: "Médano Beach is the busiest stretch of Cabo San Lucas: resorts, beach clubs and restaurants right on the sand, a few minutes from the marina. It is also where a forgotten bottle of sunscreen is most likely to ruin a beach day." },
      { h: "How long does delivery take?" },
      { p: "Médano is one of our closest zones. Our estimated delivery time to Médano Beach is 15 to 25 minutes, and it can vary with traffic. We deliver every day from 9 am to 6 pm." },
      { h: "What guests on the beach ask for" },
      { ul: ["Sunscreen and after-sun", "Water and electrolyte drinks", "Basic first aid", "Small travel basics"] },
      { h: "How to order" },
      { ul: [
        "Message us on WhatsApp and tell us the name of your hotel in Médano.",
        "We confirm the total and the estimated arrival time.",
        "We bring your order to the hotel lobby, and you pay by card with a secure link.",
      ] },
      { h: "Hotels in the area" },
      { p: "We deliver to hotels and villas across Médano Beach, including places such as ME Cabo, Pueblo Bonito Rosé, Villa del Palmar, Riu Palace Cabo San Lucas and Riu Santa Fe. Not on the list? Send us the name of your hotel and we confirm." },
      { p: "We have {stores} in Cabo San Lucas, so someone is always close to the beach. We speak English and Spanish." },
    ],
    es: [
      { p: "Playa Médano es la zona más concurrida de Cabo San Lucas: resorts, beach clubs y restaurantes sobre la arena, a pocos minutos de la marina. También es donde olvidar el protector solar puede arruinar un día de playa." },
      { h: "¿Cuánto tarda la entrega?" },
      { p: "Médano es una de nuestras zonas más cercanas. El tiempo estimado de entrega a Playa Médano es de 15 a 25 minutos y puede variar con el tráfico. Entregamos todos los días de 9 am a 6 pm." },
      { h: "Lo que piden los huéspedes en la playa" },
      { ul: ["Protector solar y after-sun", "Agua y bebidas con electrolitos", "Primeros auxilios básicos", "Pequeños básicos de viaje"] },
      { h: "Cómo pedir" },
      { ul: [
        "Escríbenos por WhatsApp con el nombre de tu hotel en Médano.",
        "Confirmamos el total y la hora estimada de llegada.",
        "Llevamos tu pedido al lobby del hotel y pagas con tarjeta mediante un enlace seguro.",
      ] },
      { h: "Hoteles de la zona" },
      { p: "Entregamos en hoteles y villas de toda Playa Médano, entre ellos lugares como ME Cabo, Pueblo Bonito Rosé, Villa del Palmar, Riu Palace Cabo San Lucas y Riu Santa Fe. ¿No está tu hotel? Envíanos el nombre y lo confirmamos." },
      { p: "Tenemos {stores} en Cabo San Lucas, así que siempre hay una cerca de la playa. Hablamos inglés y español." },
    ],
  },
  related: [
    { path: "/delivery/medano", label: { en: "Delivery to Médano Beach", es: "Entrega en Playa Médano" } },
    { path: "/delivery", label: { en: "All delivery zones", es: "Todas las zonas de entrega" } },
  ],
};
