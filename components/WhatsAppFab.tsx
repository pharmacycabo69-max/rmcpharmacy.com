import { WhatsAppGlyph } from "./Icons";
import type { Lang } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

// Floating chat button. It is a plain link, so it works without JavaScript; GTM reads data-cta/data-source.
export function WhatsAppFab({ lang }: { lang: Lang }) {
  const label = lang === "en" ? "Order on WhatsApp" : "Pide por WhatsApp";
  return (
    <a className="fab" href={whatsappUrl(lang, "floating-button")} target="_blank" rel="noopener" data-cta="whatsapp" data-source="floating-button" aria-label={label}>
      <WhatsAppGlyph />
      <span className="fab-label">{label}</span>
    </a>
  );
}
