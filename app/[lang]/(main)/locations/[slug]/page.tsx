import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/CtaButtons";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { OpenStatus } from "@/components/OpenStatus";
import { FaqList } from "@/components/ServiceFaqList";
import { DAYS, DAY_LABEL, formatRange } from "@/lib/hours";
import { LOCATIONS, fullAddress, getLocation, locationH1 } from "@/lib/locations";
import { locationDescription, locationTitle } from "@/lib/locationMeta";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";
import { faqSchema, locationSchema } from "@/lib/schema";
import { getService } from "@/lib/services";
import { LANGS, SITE, isLang } from "@/lib/site";
import { telUrl } from "@/lib/whatsapp";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => LOCATIONS.map((l) => ({ lang, slug: l.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = getLocation(slug);
  if (!isLang(lang) || !l) return {};
  return buildMetadata({
    lang,
    enPath: `/locations/${slug}`,
    title: locationTitle(l, lang),
    description: locationDescription(l, lang),
    absoluteTitle: true,
    image: l.photos[0]?.src,
  });
}

export default async function LocationPage({ params }: Props) {
  const { lang, slug } = await params;
  const l = getLocation(slug);
  if (!isLang(lang) || !l || !l.hours || !l.phone || !l.intro) notFound();

  const rawMessage =
    lang === "en"
      ? `Hi! I'm near ${l.gbpName} (${l.neighborhood}). ref: branch-${l.slug}`
      : `¡Hola! Estoy cerca de ${l.gbpName} (${l.neighborhood}). ref: branch-${l.slug}`;
  const others = LOCATIONS.filter((o) => o.slug !== l.slug);
  const services = l.services.map((s) => ({ slug: s, service: getService(s) })).filter((s) => s.service);

  return (
    <div className="container section">
      <JsonLd data={locationSchema(l, lang)} />
      <JsonLd data={faqSchema(l.faq.map((f) => ({ q: f.q[lang], a: f.a[lang] })))} />

      <h1>{locationH1(l)}</h1>
      <p className="subtitle">{l.neighborhood}, Cabo San Lucas</p>

      <address>
        {fullAddress(l)}
        <br />
        <a href={telUrl()}>{l.phone}</a>
      </address>
      <ul className="hours-list">
        {DAYS.map((d) => (
          <li key={d}>
            <span>{DAY_LABEL[d][lang]}</span>
            <span>{formatRange(l.hours![d], lang)}</span>
          </li>
        ))}
      </ul>
      <p>
        <OpenStatus hours={l.hours} lang={lang} />
      </p>

      <CtaButtons lang={lang} source={`branch-${l.slug}`} location={l} rawMessage={rawMessage} />

      <section className="section">
        <Gallery photos={l.photos} lang={lang} />
      </section>

      <section>
        {l.intro[lang].split("\n\n").map((para) => (
          <p key={para}>{para}</p>
        ))}
      </section>

      {services.length > 0 && (
        <section className="section">
          <h2>{lang === "en" ? "Services" : "Servicios"}</h2>
          <ul className="checks">
            {services.map(({ slug: s, service }) => (
              <li key={s}>
                <Link href={localizedPath(lang, `/services/${s}`)}>{service!.name[lang]}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <h2>{lang === "en" ? "Frequently asked questions" : "Preguntas frecuentes"}</h2>
        <FaqList lang={lang} items={l.faq} />
      </section>

      {l.reviewUrl && (
        <p>
          <a className="btn btn-secondary" href={l.reviewUrl} target="_blank" rel="noopener">
            {lang === "en" ? "Leave a review" : "Deja una reseña"}
          </a>
        </p>
      )}

      {others.length > 0 && (
        <section className="section">
          <h2>{lang === "en" ? "Other stores" : "Otras sucursales"}</h2>
          <ul className="other-stores">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={localizedPath(lang, `/locations/${o.slug}`)}>
                  {o.gbpName} · {o.addressLine}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
