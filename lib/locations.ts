// Single source of truth for NAP. Page content, JSON-LD and footer all read from here.
export type Location = {
  slug: string;
  name: string;
  street: string;
  area: string;
  postalCode: string;
  city: string;
  region: string;
  geo?: { lat: number; lng: number };
  mapsUrl?: string;
  blurb: { en: string; es: string };
};

const COMMON = { area: "Centro, Marina", postalCode: "23450", city: "Cabo San Lucas", region: "B.C.S." };

export const LOCATIONS: Location[] = [
  {
    slug: "plaza-gali",
    name: "RMC Pharmacy",
    street: "Blvd. Paseo de la Marina Loc 47",
    ...COMMON,
    geo: { lat: 22.8783056, lng: -109.9089587 },
    mapsUrl: "https://maps.app.goo.gl/hiNCXGKqXwE5JRv2A",
    blurb: {
      en: "Our Plaza Gali store on Paseo de la Marina, a short walk from the marina.",
      es: "Nuestra sucursal en Plaza Gali sobre Paseo de la Marina, a pocos pasos de la marina.",
    },
  },
  {
    slug: "plaza-embarcadero",
    name: "RMC Pharmacy",
    street: "Blvd. Paseo de la Marina S/N, Local 15 Plaza Embarcadero",
    ...COMMON,
    blurb: {
      en: "Our Plaza Embarcadero store, Local 15, on Paseo de la Marina.",
      es: "Nuestra sucursal en Plaza Embarcadero, Local 15, sobre Paseo de la Marina.",
    },
  },
  {
    slug: "mercado-marina",
    name: "RMC Pharmacy",
    street: "Mercado Marina 11",
    ...COMMON,
    blurb: {
      en: "Our store at Mercado Marina, local 11, in the marina area.",
      es: "Nuestra sucursal en Mercado Marina, local 11, en la zona de la marina.",
    },
  },
];

export function getLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function addressLine(l: Location) {
  return `${l.street}, ${l.area}, ${l.postalCode} ${l.city}, ${l.region}`;
}

export function directionsUrl(l: Location) {
  if (l.geo) return `https://www.google.com/maps/dir/?api=1&destination=${l.geo.lat},${l.geo.lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${l.name} ${addressLine(l)}`)}`;
}
