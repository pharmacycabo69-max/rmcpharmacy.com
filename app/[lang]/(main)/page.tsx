import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CtaButtons } from "@/components/CtaButtons";
import { BagIcon, CardIcon, ChatIcon, ClockIcon, DropIcon, GlobeIcon, PulseIcon, UserIcon } from "@/components/Icons";
import { OpenStatus } from "@/components/OpenStatus";
import { EssentialsGrid } from "@/components/EssentialsGrid";
import { JsonLd } from "@/components/JsonLd";
import { websiteSchema } from "@/lib/schema";
import { HotelFinder, type HotelOption } from "@/components/HotelFinder";
import { StoreCard } from "@/components/StoreCard";
import { ZoneCard } from "@/components/ZoneCard";
import { LOCATIONS, getLocation, storeCountLabel } from "@/lib/locations";
import { UI, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";
import { SERVICES } from "@/lib/services";
import { SERVICE_CARD_PHOTO } from "@/lib/sessionPhotos";
import { TEAM_PHOTOS } from "@/lib/team";
import { SITE, isLang } from "@/lib/site";
import { AREA_LABEL, ZONES } from "@/lib/zones";

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
  const en = lang === "en";
  const p = (path: string) => localizedPath(lang, path);
  const rv = (i = 0) => ({ "data-reveal": "", style: { "--i": i } as React.CSSProperties });

  // Hero photos: real pictures of the RMC stores, picked by file name so a reorder never swaps them.
  const photoOf = (slug: string, file: string) => getLocation(slug)?.photos.find((x) => x.src.endsWith(file));
  const bento = [
    TEAM_PHOTOS.find((x) => x.src.endsWith("plaza-gali/05-counter-team.jpg")),
    TEAM_PHOTOS.find((x) => x.src.endsWith("ocean/03-team-service.jpg")),
    TEAM_PHOTOS.find((x) => x.src.endsWith("ocean/06-counter-team.jpg")),
  ].filter((x): x is NonNullable<typeof x> => Boolean(x));
  const hoursStore = getLocation("plaza-gali");

  const trust = [
    { icon: <ClockIcon />, title: en ? "Open every day" : "Abierto todos los días", text: SITE.hoursLabel[lang].replace(/^[^,]+,\s*/, "") },
    { icon: <GlobeIcon />, title: en ? "English & Spanish" : "Inglés y español", text: en ? "We speak both" : "Atendemos en ambos" },
    { icon: <CardIcon />, title: en ? "Cash or card" : "Efectivo o tarjeta", text: en ? "Pesos or US dollars" : "Pesos o dólares" },
    { icon: <BagIcon />, title: en ? "Delivery to your hotel" : "Entrega en tu hotel", text: en ? "Estimated up to 70 min" : "Estimada hasta 70 min" },
  ];

  const steps = [
    {
      title: en ? "Message us" : "Escríbenos",
      text: en ? "Tell us what you need and the name of your hotel on WhatsApp." : "Dinos qué necesitas y el nombre de tu hotel por WhatsApp.",
    },
    {
      title: en ? "We confirm" : "Confirmamos",
      text: en ? "We send the total and an estimated arrival time of up to 70 minutes." : "Te enviamos el total y una hora estimada de llegada de hasta 70 minutos.",
    },
    {
      title: en ? "We deliver" : "Entregamos",
      text: en ? "We bring it to your hotel lobby. You pay by card with a secure link." : "Lo llevamos al lobby de tu hotel. Pagas con tarjeta mediante un enlace seguro.",
    },
  ];

  const hotelOptions: HotelOption[] = ZONES.flatMap((z) => {
    const base = { zoneName: z.name[lang], zoneSlug: z.slug, etaMin: z.etaMin, etaMax: z.etaMax, href: p(`/delivery/${z.slug}`) };
    return [
      ...z.hotels.map((h) => ({ ...base, name: h, aliases: z.aliases })),
      { ...base, name: z.name[lang], aliases: z.aliases },
    ];
  });

  const serviceIcon: Record<string, React.ReactNode> = {
    "iv-therapy": <DropIcon />,
    "doctor-consultation": <PulseIcon />,
    "home-nursing": <UserIcon />,
  };

  return (
    <>
      <JsonLd data={websiteSchema(lang)} />
      <section className="hero-home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Cabo San Lucas · San José del Cabo</p>
            <h1>
              {en ? (
                <>
                  Your pharmacy on the <em>Cabo marina</em>
                </>
              ) : (
                <>
                  Tu farmacia en la <em>marina de Cabo</em>
                </>
              )}
            </h1>
            <p className="lead">
              {en
                ? "Pharmacy and minimarket near the marina. We speak English and Spanish, and we deliver to your hotel, villa or boat."
                : "Farmacia y minisúper cerca de la marina. Hablamos inglés y español, y entregamos en tu hotel, villa o yate."}
            </p>
            <HotelFinder
              lang={lang}
              options={hotelOptions}
              waNumber={SITE.phoneDigits}
              strings={{
                label: en ? "Where are you staying?" : "¿Dónde te hospedas?",
                placeholder: en ? "Hotel, villa or area" : "Hotel, villa o zona",
                button: en ? "Order on WhatsApp" : "Pedir por WhatsApp",
                eta: en ? "Estimated delivery" : "Entrega estimada",
                zonePage: en ? "See this zone" : "Ver esta zona",
              }}
            />
            <CtaButtons lang={lang} source="home-hero" />
          </div>

          {bento.length === 3 && (
            <div className="hero-visual">
              <div className="bento">
                <figure className="b1">
                  <Image src={bento[0].src} alt={bento[0].alt[lang]} width={bento[0].width} height={bento[0].height} priority sizes="(max-width: 960px) 60vw, 360px" style={{ objectPosition: "68% 40%" }} />
                </figure>
                <figure>
                  <Image src={bento[1].src} alt={bento[1].alt[lang]} width={bento[1].width} height={bento[1].height} sizes="(max-width: 960px) 40vw, 300px" />
                </figure>
                <figure>
                  <Image src={bento[2].src} alt={bento[2].alt[lang]} width={bento[2].width} height={bento[2].height} sizes="(max-width: 960px) 40vw, 300px" />
                </figure>
              </div>
              {hoursStore?.hours && (
                <div className="float-card float-a">
                  <strong>{hoursStore.gbpName}</strong>
                  <OpenStatus hours={hoursStore.hours} lang={lang} />
                </div>
              )}
              <div className="float-card float-b">
                <strong>{en ? "Delivery to your hotel" : "Entrega en tu hotel"}</strong>
                <span className="muted">{en ? "Estimated up to 70 min" : "Estimada hasta 70 min"}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="trust" aria-label={en ? "Why choose us" : "Por qué elegirnos"}>
        <ul className="container trust-grid">
          {trust.map((t, i) => (
            <li key={t.title} className="trust-item" {...rv(i)}>
              <span className="ico">{t.icon}</span>
              <div>
                <strong>{t.title}</strong>
                <span>{t.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section">
        <div className="section-head" {...rv()}>
          <p className="eyebrow">{en ? "Our team" : "Nuestro equipo"}</p>
          <h2>{en ? "The people who help you" : "Las personas que te atienden"}</h2>
        </div>
        <div className="team-grid">
          {TEAM_PHOTOS.slice(0, 4).map((tp, i) => (
            <figure key={tp.src} className="team-card" {...rv(i)}>
              <Image src={tp.src} alt={tp.alt[lang]} width={tp.width} height={tp.height} sizes="(max-width: 720px) 100vw, 280px" />
              <figcaption>{tp.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p style={{ marginTop: 24 }}>
          <Link className="text-link" href={p("/about")}>
            {en ? "Meet the whole team" : "Conoce a todo el equipo"}
          </Link>
        </p>
      </section>

      <section className="container section">
        <div className="section-head" {...rv()}>
          <p className="eyebrow">{en ? "Delivery" : "Entrega"}</p>
          <h2>{en ? "Delivery to your hotel in 3 steps" : "Entrega en tu hotel en 3 pasos"}</h2>
        </div>
        <ol className="steps-grid">
          {steps.map((st, i) => (
            <li key={st.title} className="step" {...rv(i)}>
              <span className="step-num">{i + 1}</span>
              <h3>{st.title}</h3>
              <p className="muted">{st.text}</p>
            </li>
          ))}
        </ol>
        <p style={{ marginTop: 24 }}>
          <Link className="text-link" href={p("/delivery")}>
            {en ? "More about delivery" : "Más sobre la entrega"}
          </Link>
        </p>
      </section>

      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="section-head" {...rv()}>
          <h2>{en ? "Delivery zones" : "Zonas de entrega"}</h2>
          <p className="muted">
            {en ? "Pick your area to see the estimated delivery time. All times are estimates." : "Elige tu zona para ver el tiempo estimado. Todos los tiempos son estimados."}
          </p>
        </div>
        {(Object.keys(AREA_LABEL) as (keyof typeof AREA_LABEL)[]).map((area, ai) => (
          <div key={area} className="zone-group" {...rv(ai)}>
            <h3>{AREA_LABEL[area][lang]}</h3>
            <ul className="zone-grid">
              {ZONES.filter((z) => z.area === area).map((z) => (
                <li key={z.slug}>
                  <ZoneCard zone={z} lang={lang} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="section-head" {...rv()}>
          <p className="eyebrow">{en ? "Pharmacy and minimarket" : "Farmacia y minisúper"}</p>
          <h2>{en ? "Everyday essentials" : "Esenciales de todos los días"}</h2>
          <p className="muted">
            {en ? "Tap a category to check availability on WhatsApp. We confirm before you walk over or order delivery." : "Toca una categoría para revisar disponibilidad por WhatsApp. Confirmamos antes de que vengas o pidas entrega."}
          </p>
        </div>
        <EssentialsGrid lang={lang} />
      </section>

      <section className="container section">
        <div className="section-head" {...rv()}>
          <p className="eyebrow">{en ? "Care that comes to you" : "Atención que llega a ti"}</p>
          <h2>{en ? "Services" : "Servicios"}</h2>
        </div>
        <div className="service-grid">
          {SERVICES.map((s, i) => {
            const photo = SERVICE_CARD_PHOTO[s.slug];
            return (
              <Link key={s.slug} href={p(`/services/${s.slug}`)} className="service-card" {...rv(i)}>
                <span className="service-media">
                  {photo ? (
                    <Image src={photo.src} alt={photo.alt[lang]} width={photo.width} height={photo.height} sizes="(max-width: 960px) 100vw, 380px" />
                  ) : (
                    <span className="service-media-icon">{serviceIcon[s.slug] ?? <ChatIcon />}</span>
                  )}
                </span>
                <span className="service-body">
                  <h3>{s.name[lang]}</h3>
                  <p className="muted">{s.price[lang]}</p>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container section">
        <div className="section-head" {...rv()}>
          <p className="eyebrow">{t(lang, UI.nav.locations)}</p>
          <h2>{en ? `Find us: ${storeCountLabel(lang)}` : `Encuéntranos: ${storeCountLabel(lang)}`}</h2>
        </div>
        <div className="store-grid">
          {LOCATIONS.map((l, i) => (
            <div key={l.slug} {...rv(i)}>
              <StoreCard l={l} lang={lang} />
            </div>
          ))}
        </div>
      </section>

      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="cta-band" {...rv()}>
          <h2>{en ? "Need something now?" : "¿Necesitas algo ahora?"}</h2>
          <p>{en ? "Message us on WhatsApp. We reply in English or Spanish." : "Escríbenos por WhatsApp. Respondemos en inglés o español."}</p>
          <CtaButtons lang={lang} source="home-final-cta" />
        </div>
      </section>
    </>
  );
}
