import type { Location } from "@/lib/locations";
import type { Lang } from "@/lib/site";

/** Lazy Google Maps embed (no API key, no cookies until it loads) centered on the store pin. */
export function MapEmbed({ location, lang }: { location: Location; lang: Lang }) {
  if (!location.geo) return null;
  const { lat, lng } = location.geo;
  const q = encodeURIComponent(`${location.gbpName}, ${location.addressLine}, Cabo San Lucas`);
  const src = `https://www.google.com/maps?q=${q}&ll=${lat},${lng}&z=17&hl=${lang}&output=embed`;
  return (
    <figure className="map-embed">
      <iframe
        src={src}
        title={lang === "en" ? `Map: ${location.gbpName}, ${location.placeLabel}` : `Mapa: ${location.gbpName}, ${location.placeLabel}`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </figure>
  );
}
