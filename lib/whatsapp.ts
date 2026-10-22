import { SITE, type Lang } from "./site";

const GREETING: Record<Lang, string> = {
  en: "Hi! I'd like some help from RMC Pharmacy.",
  es: "¡Hola! Me gustaría recibir ayuda de RMC Pharmacy.",
};

/**
 * Click-to-chat link. `source` identifies the page/button (e.g. "plaza-gali-hero") and is appended to the
 * prefilled message as a ref code, since wa.me ignores UTM parameters. The same value is exposed in
 * data attributes so GTM can read it (Phase 2).
 */
export function whatsappUrl(lang: Lang, source: string, message?: string) {
  const text = `${message ?? GREETING[lang]} (ref: ${source})`;
  return `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(text)}`;
}

export function telUrl() {
  return `tel:${SITE.phone.replace(/\s/g, "")}`;
}
