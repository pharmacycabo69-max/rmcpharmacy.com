import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { LOCATIONS, addressLine, getLocation } from "@/lib/locations";
import { buildMetadata } from "@/lib/metadata";
import { locationSchema } from "@/lib/schema";
import { LANGS, SITE, isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => LOCATIONS.map((l) => ({ lang, slug: l.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = getLocation(slug);
  if (!isLang(lang) || !l) return {};
  const where = l.slug === "plaza-gali" ? "Plaza Gali" : l.slug === "plaza-embarcadero" ? "Plaza Embarcadero" : "Mercado Marina";
  return buildMetadata({
    lang,
    enPath: `/locations/${slug}`,
    title: lang === "en" ? `Pharmacy at ${where}, Cabo San Lucas` : `Farmacia en ${where}, Cabo San Lucas`,
    description: `${l.blurb[lang]} ${SITE.hoursLabel[lang]}.`,
  });
}

export default async function LocationPage({ params }: Props) {
  const { lang, slug } = await params;
  const l = getLocation(slug);
  if (!isLang(lang) || !l) notFound();
  return (
    <>
      <JsonLd data={locationSchema(l, lang)} />
      <section className="hero">
        <div className="container">
          <h1>
            {l.name} · {l.street.includes("Embarcadero") ? "Plaza Embarcadero" : l.street.startsWith("Mercado") ? "Mercado Marina" : "Plaza Gali"}
          </h1>
          <p className="lead">{l.blurb[lang]}</p>
          <CtaButtons lang={lang} source={`location-${l.slug}-hero`} location={l} />
        </div>
      </section>
      <section className="container section">
        <h2>{lang === "en" ? "Address and hours" : "Dirección y horario"}</h2>
        <address>{addressLine(l)}</address>
        <p>{SITE.hoursLabel[lang]}</p>
        <p>
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
        </p>
      </section>
    </>
  );
}
