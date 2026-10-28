import type { Lang } from "./site";

type L = Record<Lang, string>;

export type Essential = {
  id: string;
  icon: "sun" | "drop" | "bandage" | "sparkle" | "heart" | "suitcase";
  name: L;
  text: L;
  /** Prefilled WhatsApp message to check availability. */
  ask: L;
};

// Everyday over-the-counter categories only. No prices: availability is confirmed on WhatsApp.
export const ESSENTIALS: Essential[] = [
  {
    id: "sun-care",
    icon: "sun",
    name: { en: "Sun care", es: "Protección solar" },
    text: { en: "Sunscreen, after-sun and lip care for a day on the water.", es: "Protector solar, after-sun y cuidado de labios para un día en el agua." },
    ask: { en: "Hi! Do you have sun care in stock?", es: "¡Hola! ¿Tienen productos de protección solar?" },
  },
  {
    id: "hydration",
    icon: "drop",
    name: { en: "Hydration", es: "Hidratación" },
    text: { en: "Water and electrolyte drinks for hot days.", es: "Agua y bebidas con electrolitos para los días de calor." },
    ask: { en: "Hi! Do you have electrolyte drinks in stock?", es: "¡Hola! ¿Tienen bebidas con electrolitos?" },
  },
  {
    id: "first-aid",
    icon: "bandage",
    name: { en: "First aid", es: "Primeros auxilios" },
    text: { en: "Bandages, gauze and antiseptic wipes for small scrapes.", es: "Vendas, gasas y toallitas antisépticas para raspones." },
    ask: { en: "Hi! I need first aid supplies.", es: "¡Hola! Necesito artículos de primeros auxilios." },
  },
  {
    id: "personal-care",
    icon: "sparkle",
    name: { en: "Personal care", es: "Cuidado personal" },
    text: { en: "Hygiene, skin and hair basics when you forgot something at home.", es: "Higiene, piel y cabello cuando olvidaste algo en casa." },
    ask: { en: "Hi! Do you have personal care items?", es: "¡Hola! ¿Tienen artículos de cuidado personal?" },
  },
  {
    id: "baby-family",
    icon: "heart",
    name: { en: "Baby and family", es: "Bebé y familia" },
    text: { en: "Everyday items for babies and kids traveling with you.", es: "Artículos de todos los días para bebés y niños que viajan contigo." },
    ask: { en: "Hi! I need baby and family items.", es: "¡Hola! Necesito artículos para bebé y familia." },
  },
  {
    id: "travel-basics",
    icon: "suitcase",
    name: { en: "Travel basics", es: "Básicos de viaje" },
    text: { en: "Snacks and the small things you suddenly need on a trip.", es: "Snacks y esas cosas pequeñas que de repente hacen falta en un viaje." },
    ask: { en: "Hi! Do you have travel basics?", es: "¡Hola! ¿Tienen básicos de viaje?" },
  },
];
