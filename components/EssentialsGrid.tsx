import Link from "next/link";
import { BandageIcon, CloudIcon, DropIcon, HeartIcon, LeafIcon, SparkleIcon, SuitcaseIcon, SunIcon, ThermoIcon, WaveIcon } from "./Icons";
import { CATEGORIES } from "@/lib/categories";
import { localizedPath } from "@/lib/routes";
import type { Lang } from "@/lib/site";

const ICONS = { sun: SunIcon, drop: DropIcon, bandage: BandageIcon, sparkle: SparkleIcon, heart: HeartIcon, suitcase: SuitcaseIcon, wave: WaveIcon, leaf: LeafIcon, thermo: ThermoIcon, cloud: CloudIcon };

/** Category tiles. Each links to its own page, where the WhatsApp CTA lives. `featured` shows only the home-page six. */
export function EssentialsGrid({ lang, featured = false }: { lang: Lang; featured?: boolean }) {
  const cta = lang === "en" ? "See what we carry" : "Ver qué tenemos";
  const list = featured ? CATEGORIES.filter((c) => c.featured) : CATEGORIES;
  return (
    <ul className="essentials">
      {list.map((c, i) => {
        const Icon = ICONS[c.icon];
        return (
          <li key={c.slug} data-reveal="" style={{ "--i": i } as React.CSSProperties}>
            <Link className="essential" href={localizedPath(lang, `/pharmacy/${c.slug}`)} data-source={`essentials-${c.slug}`}>
              <span className="service-icon">
                <Icon />
              </span>
              <strong>{c.name[lang]}</strong>
              <span className="muted">{c.blurb[lang]}</span>
              <span className="essential-cta">{cta}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
