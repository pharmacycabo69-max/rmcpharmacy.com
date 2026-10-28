import Image from "next/image";
import Link from "next/link";
import { ZoneArt } from "./ZoneArt";
import { localizedPath } from "@/lib/routes";
import type { Lang } from "@/lib/site";
import type { Zone } from "@/lib/zones";

export function ZoneCard({ zone, lang }: { zone: Zone; lang: Lang }) {
  return (
    <Link href={localizedPath(lang, `/delivery/${zone.slug}`)} className="zone-card">
      <span className="zone-art">
        {zone.photo ? (
          <Image src={zone.photo.src} alt={zone.photo.alt[lang]} width={zone.photo.width} height={zone.photo.height} sizes="(max-width: 720px) 100vw, 280px" />
        ) : (
          <ZoneArt kind={zone.art} />
        )}
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
