import Image from "next/image";
import Link from "next/link";
import { OpenStatus } from "./OpenStatus";
import type { Location } from "@/lib/locations";
import { localizedPath } from "@/lib/routes";
import type { Lang } from "@/lib/site";

export function StoreCard({ l, lang, priority = false }: { l: Location; lang: Lang; priority?: boolean }) {
  const photo = l.photos[0];
  return (
    <article className="store-card">
      <Link href={localizedPath(lang, `/locations/${l.slug}`)} className="store-photo" aria-label={`${l.gbpName}, ${l.addressLine}`}>
        {photo ? (
          <Image src={photo.src} alt={photo.alt[lang]} width={photo.width} height={photo.height} sizes="(max-width: 720px) 100vw, 320px" priority={priority} />
        ) : (
          <span className="photo-placeholder" aria-hidden="true" />
        )}
      </Link>
      <div className="store-body">
        <h3>
          <Link href={localizedPath(lang, `/locations/${l.slug}`)}>{l.gbpName}</Link>
        </h3>
        <p className="muted">{l.addressLine}</p>
        {l.hours && (
          <p>
            <OpenStatus hours={l.hours} lang={lang} />
          </p>
        )}
      </div>
    </article>
  );
}
