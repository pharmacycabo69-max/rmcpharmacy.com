import type { Lang } from "./site.ts";

type L = Record<Lang, string>;

export type IvProduct = {
  slug: string;
  name: L;
  /** Only what the booking system states about the product; no health claims. */
  description: L;
  minutes: number;
  /** USD, taxes not included. */
  home: number;
  office: number;
};

// Prices come from the booking system (QuickTurno). Formulas that name prescription drugs are not listed.
export const IV_PRODUCTS: IvProduct[] = [
  {
    slug: "recovery",
    name: { en: "Recovery IV", es: "IV Recovery" },
    description: { en: "Our Recovery infusion.", es: "Nuestra infusión Recovery." },
    minutes: 60,
    home: 159,
    office: 129,
  },
  {
    slug: "multivitamin",
    name: { en: "Multivitamin IV", es: "IV Multivitamínico" },
    description: { en: "Multivitamin infusion.", es: "Infusión multivitamínica." },
    minutes: 60,
    home: 189,
    office: 154,
  },
  {
    slug: "nad-plus",
    name: { en: "NAD+ IV", es: "IV NAD+" },
    description: { en: "NAD+ infusion.", es: "Infusión de NAD+." },
    minutes: 60,
    home: 299,
    office: 269,
  },
];

export function ivBookingMessage(p: IvProduct, lang: Lang) {
  return lang === "en"
    ? `Hi, I'd like to book the ${p.name.en} in Cabo`
    : `Hola, me gustaría reservar el ${p.name.es} en Cabo`;
}
