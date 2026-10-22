import type { Metadata } from "next";
import Link from "next/link";
import { CtaButtons } from "@/components/CtaButtons";
import { LOCATIONS, addressLine } from "@/lib/locations";
import { UI, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";
import { SITE, isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return buildMetadata({
    lang,
    enPath: "/locations",
    title: lang === "en" ? "Pharmacy Locations in Cabo Marina" : "Sucursales en la Marina de Cabo",
    description:
      lang === "en"
        ? "Three RMC Pharmacy stores on the Cabo San Lucas marina, open every day from 9 am to 6 pm."
        : "Tres sucursales de RMC Pharmacy en la marina de Cabo San Lucas, abiertas todos los días de 9 am a 6 pm.",
  });
}

export default async function Locations({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  return (
    <div className="container section">
      <h1>{t(lang, UI.nav.locations)}</h1>
      <p className="lead">{SITE.hoursLabel[lang]}</p>
      <div className="cards">
        {LOCATIONS.map((l) => (
          <article key={l.slug} className="card">
            <h2>
              <Link href={localizedPath(lang, `/locations/${l.slug}`)}>{l.name}</Link>
            </h2>
            <address>{addressLine(l)}</address>
            <CtaButtons lang={lang} source={`locations-${l.slug}`} location={l} />
          </article>
        ))}
      </div>
    </div>
  );
}
