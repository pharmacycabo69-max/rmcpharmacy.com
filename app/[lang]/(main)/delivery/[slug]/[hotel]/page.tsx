import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/ServiceFaqList";
import { hotelContent } from "@/lib/hotelContent";
import { HOTELS, getHotel, hotelPath, nearbyHotels } from "@/lib/hotels";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { LANGS, SITE, isLang } from "@/lib/site";
import { getZone } from "@/lib/zones";

type Props = { params: Promise<{ lang: string; slug: string; hotel: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => HOTELS.map((h) => ({ lang, slug: h.zone, hotel: h.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug, hotel } = await params;
  const h = getHotel(slug, hotel);
  const z = getZone(slug);
  if (!isLang(lang) || !h || !z) return {};
  const c = hotelContent(h, z, lang);
  return buildMetadata({ lang, enPath: hotelPath(h), title: c.title, description: c.description, absoluteTitle: true });
}

export default async function HotelPage({ params }: Props) {
  const { lang, slug, hotel } = await params;
  const h = getHotel(slug, hotel);
  const z = getZone(slug);
  if (!isLang(lang) || !h || !z) notFound();
  const c = hotelContent(h, z, lang);
  const en = lang === "en";
  const nearby = nearbyHotels(h, 4);

  const waTarget = `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(c.whatsapp)}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: SITE.name,
    url: SITE.url + localizedPath(lang, hotelPath(h)),
    telephone: SITE.phone,
    areaServed: {
      "@type": "Place",
      name: h.name,
      ...(h.geo ? { geo: { "@type": "GeoCoordinates", latitude: h.geo.lat, longitude: h.geo.lng } } : {}),
    },
    potentialAction: {
      "@type": "OrderAction",
      target: { "@type": "EntryPoint", urlTemplate: waTarget, actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] },
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    },
    parentOrganization: { "@id": `${SITE.url}/#organization` },
  };

  return (
    <div className="container section">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(c.faqs)} />
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: en ? "Home" : "Inicio", enPath: "/" },
          { name: en ? "Delivery" : "Entrega", enPath: "/delivery" },
          { name: z.name[lang], enPath: `/delivery/${z.slug}` },
          { name: h.name, enPath: hotelPath(h) },
        ])}
      />
      <nav aria-label={en ? "Breadcrumb" : "Ruta"} className="muted">
        <small>
          <Link href={localizedPath(lang, "/delivery")}>{en ? "Delivery" : "Entrega"}</Link>
          {" / "}
          <Link href={localizedPath(lang, `/delivery/${z.slug}`)}>{z.name[lang]}</Link>
        </small>
      </nav>
      <h1>{c.h1}</h1>
      <p className="lead">{c.lead}</p>
      <CtaButtons lang={lang} source={`hotel-${h.slug}`} rawMessage={c.whatsapp} />

      <section className="section">
        <h2>{c.howTitle}</h2>
        <ol className="steps">
          {c.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2>{c.whereTitle}</h2>
        <p>{c.where[0]}</p>
        <p>
          {c.where[1].split(c.storeName)[0]}
          <Link href={c.storeHref}>{c.storeName}</Link>
          {c.where[1].split(c.storeName).slice(1).join(c.storeName)}
        </p>
        {h.geo && (
          <figure className="map-embed">
            <iframe
              src={`https://www.google.com/maps?q=${h.geo.lat},${h.geo.lng}&z=15&hl=${lang}&output=embed`}
              title={en ? `Map: ${h.name}` : `Mapa: ${h.name}`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </figure>
        )}
      </section>

      <section className="section">
        <h2>{c.categoriesTitle}</h2>
        <ul className="checks">
          {c.categories.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p>
          <Link href={localizedPath(lang, "/pharmacy")}>{en ? "See what we carry" : "Ver lo que tenemos"}</Link>
        </p>
      </section>

      <section>
        <h2>{c.faqTitle}</h2>
        <FaqList lang={lang} items={c.faqs.map((f) => ({ q: { en: f.q, es: f.q }, a: { en: f.a, es: f.a } }))} />
      </section>

      <section className="section">
        <h2>{c.nearbyTitle}</h2>
        <ul className="other-stores">
          {nearby.map((o) => (
            <li key={o.slug}>
              <Link href={localizedPath(lang, hotelPath(o))}>{o.name}</Link>
            </li>
          ))}
          <li>
            <Link href={localizedPath(lang, `/delivery/${z.slug}`)}>{c.zoneLinkLabel}</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
