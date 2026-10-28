import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CtaButtons } from "@/components/CtaButtons";
import { BagIcon, ChatIcon, ClockIcon, DropIcon, GlobeIcon, PulseIcon, UserIcon } from "@/components/Icons";
import { StoreCard } from "@/components/StoreCard";
import { LOCATIONS, getLocation } from "@/lib/locations";
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

  // Hero mosaic: real photos of the RMC stores, picked by file name so a reorder never swaps them.
  const photoOf = (slug: string, file: string) => getLocation(slug)?.photos.find((x) => x.src.endsWith(file));
  const mosaic = [
    photoOf("plaza-gali", "06-sun-care.jpg"),
    photoOf("mercado-marina", "02-counter-service.jpg"),
    photoOf("plaza-gali", "04-interior-shelves.jpg"),
  ].filter((x): x is NonNullable<typeof x> => Boolean(x));

  const chips = [
    { icon: <ClockIcon />, text: SITE.hoursLabel[lang] },
    { icon: <GlobeIcon />, text: lang === "en" ? "English & Spanish" : "Inglés y español" },
    { icon: <BagIcon />, text: lang === "en" ? "Delivery to your hotel · estimated up to 70 min" : "Entrega en tu hotel · estimada hasta 70 min" },
  ];

  const steps = [
    {
      title: lang === "en" ? "Message us" : "Escríbenos",
      text: lang === "en" ? "Tell us what you need and the name of your hotel on WhatsApp." : "Dinos qué necesitas y el nombre de tu hotel por WhatsApp.",
    },
    {
      title: lang === "en" ? "We confirm" : "Confirmamos",
      text: lang === "en" ? "We send the total and an estimated arrival time of up to 70 minutes." : "Te enviamos el total y una hora estimada de llegada de hasta 70 minutos.",
    },
    {
      title: lang === "en" ? "We deliver" : "Entregamos",
      text: lang === "en" ? "We bring it to your hotel lobby. You pay by card with a secure link." : "Lo llevamos al lobby de tu hotel. Pagas con tarjeta mediante un enlace seguro.",
    },
  ];

  const serviceIcon: Record<string, React.ReactNode> = {
    "iv-therapy": <DropIcon />,
    "doctor-consultation": <PulseIcon />,
    "home-nursing": <UserIcon />,
  };

  return (
    <>
      <section className="hero hero-home">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">{lang === "en" ? "Cabo San Lucas" : "Cabo San Lucas"}</p>
            <h1>{lang === "en" ? "Your pharmacy on the Cabo marina" : "Tu farmacia en la marina de Cabo"}</h1>
            <p className="lead">
              {lang === "en"
                ? "Pharmacy and minimarket near the marina. We speak English and Spanish, and we deliver to your hotel, villa or boat."
                : "Farmacia y minisúper cerca de la marina. Hablamos inglés y español, y entregamos en tu hotel, villa o yate."}
            </p>
            <CtaButtons lang={lang} source="home-hero" />
            <ul className="chips">
              {chips.map((c) => (
                <li key={c.text}>
                  {c.icon}
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
          {mosaic.length === 3 && (
            <div className="mosaic">
              <Image className="m1" src={mosaic[0].src} alt={mosaic[0].alt[lang]} width={mosaic[0].width} height={mosaic[0].height} priority sizes="(max-width: 900px) 100vw, 520px" />
              <Image className="m2" src={mosaic[1].src} alt={mosaic[1].alt[lang]} width={mosaic[1].width} height={mosaic[1].height} sizes="(max-width: 900px) 50vw, 260px" />
              <Image className="m3" src={mosaic[2].src} alt={mosaic[2].alt[lang]} width={mosaic[2].width} height={mosaic[2].height} sizes="(max-width: 900px) 50vw, 260px" />
            </div>
          )}
        </div>
      </section>

      <section className="container section">
        <h2>{lang === "en" ? "Delivery to your hotel in 3 steps" : "Entrega en tu hotel en 3 pasos"}</h2>
        <ol className="steps-grid">
          {steps.map((st, i) => (
            <li key={st.title} className="step">
              <span className="step-num">{i + 1}</span>
              <h3>{st.title}</h3>
              <p className="muted">{st.text}</p>
            </li>
          ))}
        </ol>
        <p>
          <Link href={p("/delivery")}>{lang === "en" ? "More about delivery" : "Más sobre la entrega"}</Link>
        </p>
      </section>

      <section className="container section">
        <h2>{lang === "en" ? "Services" : "Servicios"}</h2>
        <div className="service-grid">
          {SERVICES.map((s) => (
            <Link key={s.slug} href={p(`/services/${s.slug}`)} className="service-card">
              <span className="service-icon">{serviceIcon[s.slug] ?? <ChatIcon />}</span>
              <h3>{s.name[lang]}</h3>
              <p className="muted">{s.price[lang]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2>{t(lang, UI.nav.locations)}</h2>
        <div className="store-grid">
          {LOCATIONS.map((l) => (
            <StoreCard key={l.slug} l={l} lang={lang} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="cta-band">
          <h2>{lang === "en" ? "Need something now?" : "¿Necesitas algo ahora?"}</h2>
          <p>{lang === "en" ? "Message us on WhatsApp. We reply in English or Spanish." : "Escríbenos por WhatsApp. Respondemos en inglés o español."}</p>
          <CtaButtons lang={lang} source="home-final-cta" />
        </div>
      </section>
    </>
  );
}
