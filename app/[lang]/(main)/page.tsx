import type { Metadata } from "next";
import Link from "next/link";
import { CtaButtons } from "@/components/CtaButtons";
import { hoursSummary } from "@/lib/hours";
import { LOCATIONS } from "@/lib/locations";
import { UI, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";
import { SERVICES } from "@/lib/services";
import { SITE, isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return buildMetadata({
    lang,
    enPath: "/",
    title: lang === "en" ? "Pharmacy in Cabo San Lucas Marina" : "Farmacia en la Marina de Cabo San Lucas",
    description:
      lang === "en"
        ? "RMC Pharmacy and minimarket on the Cabo San Lucas marina. English and Spanish, open every day, with delivery to your hotel or villa."
        : "RMC Pharmacy, farmacia y minisúper en la marina de Cabo San Lucas. Inglés y español, abierto todos los días, con entrega a tu hotel o villa.",
  });
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  const p = (path: string) => localizedPath(lang, path);
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">{SITE.hoursLabel[lang]}</p>
          <h1>{lang === "en" ? "Your pharmacy on the Cabo marina" : "Tu farmacia en la marina de Cabo"}</h1>
          <p className="lead">
            {lang === "en"
              ? "Pharmacy and minimarket near the marina. We speak English and Spanish, and we deliver to your hotel, villa or boat."
              : "Farmacia y minisúper cerca de la marina. Hablamos inglés y español, y entregamos en tu hotel, villa o yate."}
          </p>
          <CtaButtons lang={lang} source="home-hero" />
        </div>
      </section>

      <section className="container section">
        <h2>{lang === "en" ? "Services" : "Servicios"}</h2>
        <ul className="rows">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link href={p(`/services/${s.slug}`)}>{s.name[lang]}</Link>
              <span className="muted">{s.price[lang]}</span>
            </li>
          ))}
          <li>
            <Link href={p("/delivery")}>{lang === "en" ? "Delivery to your villa or hotel" : "Entrega a tu villa u hotel"}</Link>
            <span className="muted">{lang === "en" ? "Marina, hotels and villas" : "Marina, hoteles y villas"}</span>
          </li>
        </ul>
      </section>

      <section className="container section">
        <h2>{t(lang, UI.nav.locations)}</h2>
        <ul className="rows">
          {LOCATIONS.map((l) => (
            <li key={l.slug}>
              <Link href={p(`/locations/${l.slug}`)}>{l.addressLine}</Link>
              <span className="muted">{l.hours ? hoursSummary(l.hours, lang) : ""}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
