import Link from "next/link";
import { ZoneArt } from "./ZoneArt";
import { localizedPath } from "@/lib/routes";
import type { Lang } from "@/lib/site";
import type { Zone } from "@/lib/zones";

export function ZoneCard({ zone, lang }: { zone: Zone; lang: Lang }) {
  return (
    <Link href={localizedPath(lang, `/delivery/${zone.slug}`)} className="zone-card">
      <span className="zone-art">
        <ZoneArt kind={zone.art} />
      </span>
      <span className="zone-info">
        <strong>{zone.name[lang]}</strong>
        <span className="zone-eta">
          {zone.etaMin}–{zone.etaMax} min
        </span>
      </span>
    </Link>
  );
}
