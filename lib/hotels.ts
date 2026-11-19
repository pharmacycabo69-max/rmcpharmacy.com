/**
 * Hotels and residential developments we deliver to, one page each at /delivery/<zone>/<slug>.
 *
 * - `name` must match the entry in that zone's `hotels` list in lib/zones.ts (the zone page links to it).
 * - `geo`: coordinates from OpenStreetMap (Nominatim), looked up 2026-11-19. null when no reliable match was found.
 * - `roadKm`: driving distance from our Plaza Gali store (OSRM, OpenStreetMap roads), 2026-11-19. Delivery times
 *   on the page still come from the zone's agreed estimate, not from this distance.
 * - `kind`: "development" is a residential area of villas and condos rather than a single hotel.
 */
export type Hotel = {
  slug: string;
  name: string;
  zone: string;
  kind: "hotel" | "development";
  geo: { lat: number; lng: number } | null;
  roadKm: number | null;
};

export const HOTELS: Hotel[] = [
  { slug: "hotel-tesoro-los-cabos", name: "Hotel Tesoro Los Cabos", zone: "marina-centro", kind: "hotel", geo: { lat: 22.880843, lng: -109.91206 }, roadKm: 0.7 },
  { slug: "marina-fiesta-resort-and-spa", name: "Marina Fiesta Resort & Spa", zone: "marina-centro", kind: "hotel", geo: { lat: 22.885442, lng: -109.90834 }, roadKm: 2.3 },
  { slug: "hotel-mar-de-cortez", name: "Hotel Mar de Cortez", zone: "marina-centro", kind: "hotel", geo: { lat: 22.884026, lng: -109.91356 }, roadKm: 1.3 },
  { slug: "siesta-suites-cabo-san-lucas", name: "Siesta Suites Cabo San Lucas", zone: "marina-centro", kind: "hotel", geo: { lat: 22.882168, lng: -109.91288 }, roadKm: 0.8 },
  { slug: "me-cabo", name: "ME Cabo", zone: "medano", kind: "hotel", geo: null, roadKm: null },
  { slug: "pueblo-bonito-rose", name: "Pueblo Bonito Rosé", zone: "medano", kind: "hotel", geo: { lat: 22.8907679, lng: -109.9028635 }, roadKm: 2.5 },
  { slug: "villa-del-palmar-beach-resort-and-spa", name: "Villa del Palmar Beach Resort & Spa", zone: "medano", kind: "hotel", geo: { lat: 22.8948724, lng: -109.8969129 }, roadKm: 3.2 },
  { slug: "riu-palace-cabo-san-lucas", name: "Riu Palace Cabo San Lucas", zone: "medano", kind: "hotel", geo: { lat: 22.897346, lng: -109.89072 }, roadKm: 4.6 },
  { slug: "riu-santa-fe", name: "Riu Santa Fe", zone: "medano", kind: "hotel", geo: { lat: 22.898071, lng: -109.89201 }, roadKm: 4.8 },
  { slug: "casa-dorada-los-cabos", name: "Casa Dorada Los Cabos", zone: "medano", kind: "hotel", geo: { lat: 22.8880216, lng: -109.9049157 }, roadKm: 2.3 },
  { slug: "waldorf-astoria-los-cabos-pedregal", name: "Waldorf Astoria Los Cabos Pedregal", zone: "pedregal", kind: "hotel", geo: { lat: 22.874993, lng: -109.91165 }, roadKm: 0.9 },
  { slug: "pueblo-bonito-pacifica-golf-and-spa-resort", name: "Pueblo Bonito Pacifica Golf & Spa Resort", zone: "pacifico-sunset", kind: "hotel", geo: { lat: 22.8738584, lng: -109.9388645 }, roadKm: 5.5 },
  { slug: "pueblo-bonito-sunset-beach-golf-and-spa-resort", name: "Pueblo Bonito Sunset Beach Golf & Spa Resort", zone: "pacifico-sunset", kind: "hotel", geo: null, roadKm: null },
  { slug: "playa-grande-resort", name: "Playa Grande Resort", zone: "pacifico-sunset", kind: "hotel", geo: { lat: 22.875567, lng: -109.90819 }, roadKm: 0.5 },
  { slug: "solmar-resort", name: "Solmar Resort", zone: "pacifico-sunset", kind: "hotel", geo: { lat: 22.876340, lng: -109.90436 }, roadKm: 0.6 },
  { slug: "diamante-cabo-san-lucas", name: "Diamante Cabo San Lucas", zone: "diamante-quivira", kind: "development", geo: { lat: 22.915486, lng: -109.97518 }, roadKm: 9.4 },
  { slug: "quivira-los-cabos", name: "Quivira Los Cabos", zone: "diamante-quivira", kind: "development", geo: { lat: 22.894260, lng: -109.95944 }, roadKm: 7.3 },
  { slug: "cabo-bello", name: "Cabo Bello", zone: "cabo-bello-misiones", kind: "development", geo: { lat: 22.907240, lng: -109.86146 }, roadKm: 7.3 },
  { slug: "misiones-del-cabo", name: "Misiones del Cabo", zone: "cabo-bello-misiones", kind: "development", geo: { lat: 22.900420, lng: -109.86695 }, roadKm: 7.1 },
  { slug: "esperanza-an-auberge-resort", name: "Esperanza, an Auberge Resort", zone: "cabo-bello-misiones", kind: "hotel", geo: { lat: 22.9020757, lng: -109.8531289 }, roadKm: 9.0 },
  { slug: "the-cape-a-thompson-hotel", name: "The Cape, a Thompson Hotel", zone: "cabo-bello-misiones", kind: "hotel", geo: { lat: 22.8986604, lng: -109.8695225 }, roadKm: 7.4 },
  { slug: "chileno-bay-resort-and-residences", name: "Chileno Bay Resort & Residences", zone: "corredor-chileno", kind: "hotel", geo: { lat: 22.9517681, lng: -109.8095893 }, roadKm: 15.7 },
  { slug: "cabo-del-sol", name: "Cabo del Sol", zone: "cabo-del-sol", kind: "development", geo: { lat: 22.914740, lng: -109.83879 }, roadKm: 11.9 },
  { slug: "one-and-only-palmilla", name: "One&Only Palmilla", zone: "palmilla", kind: "hotel", geo: { lat: 23.006683, lng: -109.71402 }, roadKm: 28.5 },
  { slug: "las-ventanas-al-paraiso", name: "Las Ventanas al Paraíso", zone: "palmilla", kind: "hotel", geo: { lat: 22.9775324, lng: -109.7692590 }, roadKm: 20.9 },
  { slug: "cabo-surf-hotel", name: "Cabo Surf Hotel", zone: "costa-azul", kind: "hotel", geo: { lat: 23.024072, lng: -109.71661 }, roadKm: 28.4 },
  { slug: "viceroy-los-cabos", name: "Viceroy Los Cabos", zone: "zona-hotelera-san-jose", kind: "hotel", geo: { lat: 23.044249, lng: -109.69809 }, roadKm: 31.9 },
  { slug: "holiday-inn-resort-los-cabos", name: "Holiday Inn Resort Los Cabos", zone: "zona-hotelera-san-jose", kind: "hotel", geo: { lat: 23.048055, lng: -109.69066 }, roadKm: 34.1 },
  { slug: "barcelo-grand-faro-los-cabos", name: "Barceló Grand Faro Los Cabos", zone: "zona-hotelera-san-jose", kind: "hotel", geo: null, roadKm: null },
  { slug: "posada-real-los-cabos", name: "Posada Real Los Cabos", zone: "zona-hotelera-san-jose", kind: "hotel", geo: { lat: 23.043029, lng: -109.69883 }, roadKm: 31.8 },
  { slug: "casa-natalia", name: "Casa Natalia", zone: "centro-san-jose", kind: "hotel", geo: null, roadKm: null },
  { slug: "tropicana-inn", name: "Tropicana Inn", zone: "centro-san-jose", kind: "hotel", geo: null, roadKm: null },
  { slug: "posada-terranova", name: "Posada Terranova", zone: "centro-san-jose", kind: "hotel", geo: { lat: 23.061460, lng: -109.69823 }, roadKm: 33.5 },
  { slug: "secrets-puerto-los-cabos", name: "Secrets Puerto Los Cabos", zone: "puerto-los-cabos", kind: "hotel", geo: { lat: 23.066004, lng: -109.65963 }, roadKm: 39.0 },
  { slug: "jw-marriott-los-cabos", name: "JW Marriott Los Cabos", zone: "puerto-los-cabos", kind: "hotel", geo: { lat: 23.065943, lng: -109.65478 }, roadKm: 39.2 },
  { slug: "el-ganzo", name: "El Ganzo", zone: "puerto-los-cabos", kind: "hotel", geo: { lat: 23.060213, lng: -109.67185 }, roadKm: 37.8 },
];

export function getHotel(zone: string, slug: string) {
  return HOTELS.find((h) => h.zone === zone && h.slug === slug);
}

export function hotelByName(name: string) {
  return HOTELS.find((h) => h.name === name);
}

export function hotelPath(h: Hotel) {
  return `/delivery/${h.zone}/${h.slug}`;
}

function km(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = (d: number) => (d * Math.PI) / 180;
  const dLat = r(b.lat - a.lat);
  const dLng = r(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(s));
}

/** Closest other hotels by straight-line distance; falls back to the same zone when there are no coordinates. */
export function nearbyHotels(h: Hotel, n = 3) {
  const others = HOTELS.filter((o) => o !== h);
  if (!h.geo) return others.filter((o) => o.zone === h.zone).slice(0, n);
  const here = h.geo;
  return others
    .filter((o): o is Hotel & { geo: { lat: number; lng: number } } => o.geo !== null)
    .sort((a, b) => km(here, a.geo) - km(here, b.geo))
    .slice(0, n);
}
