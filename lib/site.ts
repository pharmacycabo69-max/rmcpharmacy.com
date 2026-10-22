export const SITE = {
  name: "RMC Pharmacy",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rmcpharmacy.com",
  phone: "+52 624 226 1023",
  phoneDigits: "526242261023",
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "18:00" },
  hoursLabel: { en: "Every day, 9 am to 6 pm", es: "Todos los días, 9 am a 6 pm" },
} as const;

export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}
