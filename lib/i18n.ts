import type { Lang } from "./site";

export type L = Record<Lang, string>;

export const t = (lang: Lang, v: L) => v[lang];

export const UI = {
  nav: {
    locations: { en: "Locations", es: "Sucursales" },
    pharmacy: { en: "Pharmacy", es: "Farmacia" },
    delivery: { en: "Delivery", es: "Entrega" },
    ivTherapy: { en: "IV Therapy", es: "Terapia IV" },
    doctor: { en: "Doctor", es: "Médico" },
    nursing: { en: "Nursing", es: "Enfermería" },
    about: { en: "About", es: "Nosotros" },
    contact: { en: "Contact", es: "Contacto" },
    blog: { en: "Blog", es: "Blog" },
  },
  cta: {
    whatsapp: { en: "Message us on WhatsApp", es: "Escríbenos por WhatsApp" },
    call: { en: "Call", es: "Llamar" },
    directions: { en: "Get directions", es: "Cómo llegar" },
    viewLocation: { en: "View location", es: "Ver sucursal" },
  },
  footer: {
    hours: { en: "Hours", es: "Horario" },
    rights: { en: "All rights reserved.", es: "Todos los derechos reservados." },
  },
  skip: { en: "Skip to content", es: "Saltar al contenido" },
  langSwitch: { en: "Español", es: "English" },
} satisfies Record<string, unknown>;
