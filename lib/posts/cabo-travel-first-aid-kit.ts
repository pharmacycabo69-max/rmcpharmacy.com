import type { Post } from "./types";

export const post: Post = {
  slug: "cabo-travel-first-aid-kit",
  date: "2026-10-28",
  title: {
    en: "What to Pack in a Travel First-Aid Kit for Los Cabos",
    es: "Qué llevar en tu botiquín de viaje a Los Cabos",
  },
  description: {
    en: "A simple checklist for a travel first-aid kit for Los Cabos, and what you can pick up when you arrive.",
    es: "Una lista sencilla para tu botiquín de viaje a Los Cabos y qué puedes conseguir al llegar.",
  },
  body: {
    en: [
      { p: "Los Cabos is sun, water and activity. A small kit in your bag saves you a trip across town when something small goes wrong. Here is a simple list organized by category." },
      { h: "Sun and skin" },
      { ul: ["Broad-spectrum sunscreen and a lip balm with sun protection", "After-sun gel or lotion", "Insect repellent", "A hat and sunglasses"] },
      { h: "Cuts, blisters and bumps" },
      { ul: ["Adhesive bandages in several sizes", "Blister plasters, useful after a long day on the marina boardwalk", "Gauze and medical tape", "Antiseptic wipes", "Tweezers and small scissors"] },
      { h: "Hydration" },
      { ul: ["Electrolyte drink mixes", "A reusable water bottle", "Salty snacks for hot days"] },
      { h: "Personal care" },
      { ul: ["Hand sanitizer and wet wipes", "A thermometer", "Any personal items you use every day"] },
      { h: "Your own regular items" },
      { p: "Pack anything you use regularly in its original container, and bring more than you think you need. If you have a health condition, talk to your own doctor before you travel. We do not replace that advice." },
      { h: "What you can pick up here" },
      { p: "Sun care, first aid, hydration and personal care items are available at our three stores on the Cabo marina, open every day from 9 am to 6 pm. Send us a WhatsApp message to check availability, or ask for delivery to your villa or hotel." },
    ],
    es: [
      { p: "Los Cabos es sol, agua y actividad. Un botiquín pequeño en tu maleta te ahorra un viaje al otro lado de la ciudad cuando algo pequeño sale mal. Aquí tienes una lista sencilla por categorías." },
      { h: "Sol y piel" },
      { ul: ["Protector solar de amplio espectro y bálsamo labial con protección solar", "Gel o loción after-sun", "Repelente de insectos", "Sombrero y lentes de sol"] },
      { h: "Cortadas, ampollas y golpes" },
      { ul: ["Curitas de varios tamaños", "Parches para ampollas, útiles después de un día largo en el malecón de la marina", "Gasas y cinta médica", "Toallitas antisépticas", "Pinzas y tijeras pequeñas"] },
      { h: "Hidratación" },
      { ul: ["Mezclas de electrolitos", "Una botella de agua reutilizable", "Snacks salados para días de calor"] },
      { h: "Cuidado personal" },
      { ul: ["Gel antibacterial y toallitas húmedas", "Un termómetro", "Tus artículos personales de uso diario"] },
      { h: "Tus propios artículos de siempre" },
      { p: "Lleva lo que usas con regularidad en su envase original y más de lo que crees necesitar. Si tienes alguna condición de salud, consulta a tu propio médico antes de viajar. No sustituimos ese consejo." },
      { h: "Lo que puedes conseguir aquí" },
      { p: "Productos de protección solar, primeros auxilios, hidratación y cuidado personal están disponibles en nuestras tres sucursales en la marina de Cabo, abiertas todos los días de 9 am a 6 pm. Escríbenos por WhatsApp para revisar disponibilidad o pide entrega a tu villa u hotel." },
    ],
  },
  related: [
    { path: "/pharmacy", label: { en: "Pharmacy and minimarket", es: "Farmacia y minisúper" } },
    { path: "/locations", label: { en: "Our locations", es: "Nuestras sucursales" } },
  ],
};
