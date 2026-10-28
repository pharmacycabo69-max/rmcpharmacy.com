import Image from "next/image";
import type { Photo } from "@/lib/locations";
import type { Lang } from "@/lib/site";

// Real photos only. With none uploaded yet, a neutral placeholder keeps the layout stable.
export function Gallery({ photos, lang }: { photos: Photo[]; lang: Lang }) {
  if (photos.length === 0) return <div className="photo-placeholder" aria-hidden="true" />;
  return (
    <div className="gallery">
      {photos.map((p, i) => (
        <Image key={p.src} src={p.src} alt={p.alt[lang]} width={p.width} height={p.height} priority={i === 0} sizes={i === 0 ? "(max-width: 720px) 100vw, 960px" : "(max-width: 720px) 100vw, 320px"} className={i === 0 ? "g-main" : undefined} />
      ))}
    </div>
  );
}
