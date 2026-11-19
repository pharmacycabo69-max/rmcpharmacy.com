export const SITE = {
  name: "RMC Pharmacy",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rmcpharmacy.com",
  phone: "+52 624 226 1023",
  phoneDigits: "526242261023",
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "18:00" },
  hoursLabel: { en: "Every day, 9 am to 6 pm", es: "Todos los días, 9 am a 6 pm" },
  /** Delivery runs longer than the stores are open. */
  deliveryHours: { opens: "07:00", closes: "23:00" },
  deliveryHoursLabel: { en: "Every day, 7 am to 11 pm", es: "Todos los días, 7 am a 11 pm" },
  /** Public social/profile URLs for Organization.sameAs. Leave empty until the profiles exist. */
  social: [] as string[],
} as const;

export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}
