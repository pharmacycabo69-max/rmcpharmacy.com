import { DAYS, LOCATIONS, type Location } from "./locations";
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
    priceRange: "$$",
    currenciesAccepted: "MXN, USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    parentOrganization: { "@id": `${SITE.url}/#organization` },
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
  const main = LOCATIONS.find((l) => l.isPublished) ?? LOCATIONS[0];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.png`,
    telephone: SITE.phone,
    ...(main
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: main.addressLine,
            addressLocality: main.city,
            addressRegion: main.region,
            postalCode: main.postalCode,
            addressCountry: "MX",
          },
        }
      : {}),
    areaServed: [
      { "@type": "City", name: "Cabo San Lucas" },
      { "@type": "City", name: "San José del Cabo" },
    ],
    ...(SITE.social.length ? { sameAs: [...SITE.social] } : {}),
    contactPoint: { "@type": "ContactPoint", telephone: SITE.phone, contactType: "customer service", availableLanguage: ["English", "Spanish"] },
  };
}

export function websiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url + localizedPath(lang, "/"),
    inLanguage: lang,
  };
}

/** items: [{ name, enPath }] from the home page down to the current page. */
export function breadcrumbSchema(lang: Lang, items: { name: string; enPath: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE.url + localizedPath(lang, it.enPath),
    })),
  };
}
