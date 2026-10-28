import { DAYS, type Location } from "./locations";
import { localizedPath } from "./routes";
import type { ServiceItem } from "./services";
import { SITE, type Lang } from "./site";

export function locationSchema(l: Location, lang: Lang) {
  // One opening-hours specification per distinct schedule, so identical days are grouped.
  const groups = new Map<string, { days: string[]; opens: string; closes: string }>();
  if (l.hours) {
    for (const day of DAYS) {
      const h = l.hours[day];
      if (!h) continue;
      const key = `${h.opens}-${h.closes}`;
      const g = groups.get(key) ?? { days: [], opens: h.opens, closes: h.closes };
      g.days.push(day[0].toUpperCase() + day.slice(1));
      groups.set(key, g);
    }
  }
  const image = l.photos[0] ? (l.photos[0].src.startsWith("http") ? l.photos[0].src : SITE.url + l.photos[0].src) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": `${SITE.url}/locations/${l.slug}#pharmacy`,
    name: l.gbpName,
    url: SITE.url + localizedPath(lang, `/locations/${l.slug}`),
    ...(l.phone ? { telephone: l.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: l.addressLine,
      addressLocality: l.city,
      addressRegion: l.region,
      postalCode: l.postalCode,
      addressCountry: "MX",
    },
    ...(l.geo ? { geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng } } : {}),
    ...(groups.size
      ? {
          openingHoursSpecification: [...groups.values()].map((g) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: g.days,
            opens: g.opens,
            closes: g.closes,
          })),
        }
      : {}),
    ...(image ? { image } : {}),
    ...(l.mapsUrl ? { hasMap: l.mapsUrl, sameAs: [l.mapsUrl] } : {}),
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

