import { BandageIcon, DropIcon, HeartIcon, SparkleIcon, SuitcaseIcon, SunIcon } from "./Icons";
import { ESSENTIALS } from "@/lib/essentials";
import type { Lang } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

const ICONS = { sun: SunIcon, drop: DropIcon, bandage: BandageIcon, sparkle: SparkleIcon, heart: HeartIcon, suitcase: SuitcaseIcon };

// Each tile is a link: it opens WhatsApp with a message that asks about that category.
export function EssentialsGrid({ lang }: { lang: Lang }) {
  const cta = lang === "en" ? "Ask on WhatsApp" : "Preguntar por WhatsApp";
  return (
    <ul className="essentials">
      {ESSENTIALS.map((e, i) => {
        const Icon = ICONS[e.icon];
        return (
          <li key={e.id} data-reveal="" style={{ "--i": i } as React.CSSProperties}>
            <a
              className="essential"
              href={whatsappUrl(lang, `essentials-${e.id}`, e.ask[lang])}
              target="_blank"
              rel="noopener"
              data-cta="whatsapp"
              data-source={`essentials-${e.id}`}
            >
              <span className="service-icon">
                <Icon />
              </span>
              <strong>{e.name[lang]}</strong>
              <span className="muted">{e.text[lang]}</span>
              <span className="essential-cta">{cta}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
