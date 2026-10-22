import { addressLine, type Location } from "./locations";
import { localizedPath } from "./routes";
import type { ServiceItem } from "./services";
import { SITE, type Lang } from "./site";

export function locationSchema(l: Location, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": `${SITE.url}/locations/${l.slug}#pharmacy`,
    name: l.name,
    url: SITE.url + localizedPath(lang, `/locations/${l.slug}`),
    telephone: SITE.phone,
    description: l.blurb[lang],
    address: {
      "@type": "PostalAddress",
      streetAddress: l.street,
      addressLocality: l.city,
      addressRegion: l.region,
      postalCode: l.postalCode,
      addressCountry: "MX",
    },
    ...(l.geo ? { geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng } } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SITE.hours.days,
        opens: SITE.hours.opens,
        closes: SITE.hours.closes,
      },
    ],
    ...(l.mapsUrl ? { sameAs: [l.mapsUrl], hasMap: l.mapsUrl } : {}),
  };
}

export function serviceSchema(s: ServiceItem, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name[lang],
    description: s.metaDescription[lang],
    url: SITE.url + localizedPath(lang, `/services/${s.slug}`),
    areaServed: { "@type": "City", name: "Cabo San Lucas" },
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
  };
}

export { addressLine };
