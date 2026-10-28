import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/ServiceFaqList";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";
import { faqSchema } from "@/lib/schema";
import { LANGS, SITE, isLang } from "@/lib/site";
import { zoneContent } from "@/lib/zoneContent";
import { AREA_LABEL, ZONES, getZone } from "@/lib/zones";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => ZONES.map((z) => ({ lang, slug: z.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const z = getZone(slug);
  if (!isLang(lang) || !z) return {};
  const c = zoneContent(z, lang);
  return buildMetadata({ lang, enPath: `/delivery/${slug}`, title: c.title, description: c.description, absoluteTitle: true });
}

export default async function ZonePage({ params }: Props) {
  const { lang, slug } = await params;
  const z = getZone(slug);
  if (!isLang(lang) || !z) notFound();
  const c = zoneContent(z, lang);
  const others = ZONES.filter((o) => o.slug !== z.slug);

  const waTarget = `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(c.whatsapp)}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: SITE.name,
    url: SITE.url + localizedPath(lang, `/delivery/${z.slug}`),
    telephone: SITE.phone,
    areaServed: { "@type": "Place", name: `${z.name[lang]}, ${AREA_LABEL[z.area][lang]}` },
    potentialAction: {
      "@type": "OrderAction",
      target: { "@type": "EntryPoint", urlTemplate: waTarget, actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] },
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    },
  };

  return (
    <div className="container section">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(c.faqs)} />
      <h1>{c.h1}</h1>
      <p className="lead">
        {c.leadBefore}
        <Link href={c.storeHref}>{c.storeName}</Link>
        {c.leadAfter}
      </p>
      <CtaButtons lang={lang} source={`zone-${z.slug}`} rawMessage={c.whatsapp} />

      {z.photo && (
        <figure className="zone-hero">
          <Image src={z.photo.src} alt={z.photo.alt[lang]} width={z.photo.width} height={z.photo.height} sizes="(max-width: 1200px) 100vw, 1100px" priority />
        </figure>
      )}

      <section className="section">
        <h2>{c.aboutTitle}</h2>
        <p>{c.blurb}</p>
        <p>{c.notes}</p>
      </section>

      <section>
        <h2>{c.hotelsTitle}</h2>
        <p>{c.hotelsIntro}</p>
        <ul className="checks">
          {c.hotels.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>{c.categoriesTitle}</h2>
        <ul className="checks">
          {c.categories.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{c.howTitle}</h2>
        <ol className="steps">
          {c.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2>{c.faqTitle}</h2>
        <FaqList lang={lang} items={c.faqs.map((f) => ({ q: { en: f.q, es: f.q }, a: { en: f.a, es: f.a } }))} />
      </section>

      <section>
        <h2>{c.otherZonesTitle}</h2>
        <ul className="other-stores">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={localizedPath(lang, `/delivery/${o.slug}`)}>{o.name[lang]}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
