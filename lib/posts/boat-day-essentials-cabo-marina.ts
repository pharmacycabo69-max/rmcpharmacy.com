import type { Post } from "./types";

export const post: Post = {
  slug: "boat-day-essentials-cabo-marina",
  date: "2027-01-06",
  title: {
    en: "Boat Day Essentials from the Cabo Marina",
    es: "Esenciales para un día en barco desde la marina de Cabo",
  },
  description: {
    en: "Heading out on a boat, yacht or fishing trip from the Cabo San Lucas marina? A short checklist of what to bring and where to get it nearby.",
    es: "¿Vas a salir en barco, yate o pesca desde la marina de Cabo San Lucas? Una lista corta de qué llevar y dónde conseguirlo cerca.",
  },
  body: {
    en: [
      { p: "Most boat tours, charters and fishing trips in Cabo leave from the marina. Once you are on the water there is no store, so what you pack is what you have." },
      { h: "Pack this" },
      { ul: [
        "Sunscreen and lip balm with sun protection, and plenty of both",
        "A hat, sunglasses and a light long-sleeve layer",
        "Water, and an electrolyte drink or two",
        "Small bandages and antiseptic wipes",
        "A towel and a bag you do not mind getting wet",
      ] },
      { h: "If you tend to feel queasy on the water" },
      { p: "Eat lightly before you go and stay hydrated. If you want to know which options are available at the store, ask our team and we will point you to them." },
      { h: "Last-minute? We are on the marina" },
      { p: "Our stores are on Paseo de la Marina, close to the docks. We are open every day from 9 am to 6 pm, in English and Spanish. If your boat leaves early, order the night before and pick up on your way, or ask for delivery to your hotel." },
      { p: "We have {stores} in Cabo San Lucas. Check the one nearest to you." },
    ],
    es: [
      { p: "La mayoría de los tours en barco, charters y viajes de pesca en Cabo salen de la marina. Ya en el agua no hay tienda, así que lo que empacas es lo que tienes." },
      { h: "Empaca esto" },
      { ul: [
        "Protector solar y bálsamo labial con protección solar, y bastante de ambos",
        "Sombrero, lentes de sol y una prenda ligera de manga larga",
        "Agua y una o dos bebidas con electrolitos",
        "Vendas pequeñas y toallitas antisépticas",
        "Una toalla y una bolsa que no te importe mojar",
      ] },
      { h: "Si sueles marearte en el agua" },
      { p: "Come ligero antes de salir y mantente hidratado. Si quieres saber qué opciones hay en la tienda, pregunta a nuestro equipo y te las mostramos." },
      { h: "¿A última hora? Estamos en la marina" },
      { p: "Nuestras tiendas están sobre Paseo de la Marina, cerca de los muelles. Abrimos todos los días de 9 am a 6 pm, en inglés y español. Si tu barco sale temprano, pide la noche anterior y recoge de camino, o solicita entrega en tu hotel." },
      { p: "Tenemos {stores} en Cabo San Lucas. Revisa la más cercana a ti." },
    ],
  },
  related: [
    { path: "/locations", label: { en: "Our locations", es: "Nuestras sucursales" } },
    { path: "/pharmacy", label: { en: "Pharmacy and minimarket", es: "Farmacia y minisúper" } },
  ],
};
