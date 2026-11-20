import type { Location } from "@/lib/locations";
import type { Lang } from "@/lib/site";
import { MapFacade } from "./MapFacade";

/** Google Maps embed centered on the store pin, loaded only when the visitor taps it (see MapFacade). */
export function MapEmbed({ location, lang }: { location: Location; lang: Lang }) {
  if (!location.geo) return null;
  const { lat, lng } = location.geo;
  const q = encodeURIComponent(`${location.gbpName}, ${location.addressLine}, Cabo San Lucas`);
  return (
    <MapFacade
      src={`https://www.google.com/maps?q=${q}&ll=${lat},${lng}&z=17&hl=${lang}&output=embed`}
      openUrl={location.mapsUrl ?? `https://www.google.com/maps?q=${lat},${lng}`}
      title={lang === "en" ? `Map: ${location.gbpName}, ${location.placeLabel}` : `Mapa: ${location.gbpName}, ${location.placeLabel}`}
      showLabel={lang === "en" ? "Show map" : "Ver mapa"}
      openLabel={lang === "en" ? "Open in Google Maps" : "Abrir en Google Maps"}
    />
  );
}
