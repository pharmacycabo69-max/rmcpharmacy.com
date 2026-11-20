import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaButtons } from "@/components/CtaButtons";
import { storeCountLabel } from "@/lib/locations";
import { buildMetadata } from "@/lib/metadata";
import { getReviews } from "@/lib/reviews";
import { localizedPath } from "@/lib/routes";
import { TEAM_PHOTOS } from "@/lib/team";
import { SITE, isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

const yearsOpen = () => new Date().getFullYear() - SITE.foundedYear;

/** The store whose Google rating backs up the "#1" claim on this page. */
const RATED_STORE = "plaza-embarcadero";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const years = yearsOpen();
  return buildMetadata({
    lang,
    enPath: "/about",
    title: lang === "en" ? `About Us: ${years} Years in Los Cabos` : `Nosotros: ${years} años en Los Cabos`,
    description:
      lang === "en"
        ? `For ${years} years, RMC Pharmacy has served Cabo San Lucas and Los Cabos: ${storeCountLabel("en")}, delivery to your hotel or villa, IV therapy and doctor consultations, in English and Spanish.`
        : `Desde hace ${years} años, RMC Pharmacy atiende Cabo San Lucas y Los Cabos: ${storeCountLabel("es")}, entrega a tu hotel o villa, terapia IV y consultas médicas, en inglés y español.`,
  });
}

export default async function About({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  const en = lang === "en";
  const years = yearsOpen();
  const rated = getReviews(RATED_STORE);
  const href = (p: string) => localizedPath(lang, p);

  const reasons = [
    en ? `${years} years serving locals and visitors in Los Cabos` : `${years} años atendiendo a locales y visitantes en Los Cabos`,
    en
      ? `${storeCountLabel("en")[0].toUpperCase() + storeCountLabel("en").slice(1)} in Cabo San Lucas`
      : `${storeCountLabel("es")[0].toUpperCase() + storeCountLabel("es").slice(1)} en Cabo San Lucas`,
    en ? `Delivery to your hotel lobby, villa or boat: ${SITE.deliveryHoursLabel.en.toLowerCase()}` : `Entrega en el lobby de tu hotel, villa o yate: ${SITE.deliveryHoursLabel.es.toLowerCase()}`,
    en ? "We attend in English and Spanish" : "Atendemos en inglés y español",
    en ? "Cash or card, in pesos or dollars" : "Efectivo o tarjeta, en pesos o dólares",
  ];

  const services = [
    { path: "/pharmacy", en: "Pharmacy and travel essentials", es: "Farmacia y esenciales de viaje", den: "Sun care, first aid, hydration, baby care and everyday items.", des: "Protección solar, primeros auxilios, hidratación, bebé y artículos del día a día." },
    { path: "/delivery", en: "Home delivery", es: "Servicio a domicilio", den: "We bring your order to your hotel or villa anywhere in Los Cabos.", des: "Llevamos tu pedido a tu hotel o villa en todo Los Cabos." },
    { path: "/services/iv-therapy", en: "IV therapy", es: "Terapia IV", den: "A nurse comes to your villa, hotel or boat.", des: "Una enfermera va a tu villa, hotel o yate." },
    { path: "/services/doctor-consultation", en: "Doctor consultation", es: "Consulta médica", den: "By video, in person, or a doctor visit at your villa or hotel.", des: "Por video, presencial o con visita del médico a tu villa u hotel." },
    { path: "/services/home-nursing", en: "Home nursing", es: "Enfermería a domicilio", den: "A nurse at your villa or hotel.", des: "Una enfermera en tu villa u hotel." },
  ];

  return (
    <div className="container section">
      <h1>{en ? "About RMC Pharmacy" : "Sobre RMC Pharmacy"}</h1>
      <p className="lead">
        {en
          ? `For ${years} years we have been the #1 pharmacy in Cabo San Lucas and Los Cabos for locals and visitors. We are a pharmacy and minimarket with ${storeCountLabel("en")}, we attend in English and Spanish, and we deliver to your hotel, villa or boat.`
          : `Desde hace ${years} años somos la farmacia número 1 de Cabo San Lucas y Los Cabos para locales y visitantes. Somos farmacia y minisúper con ${storeCountLabel("es")}, atendemos en inglés y español, y llevamos tu pedido a tu hotel, villa o yate.`}
      </p>
      {rated && (
        <p>
          <strong>
            {rated.ratingValue}★ {en ? "on Google" : "en Google"}
          </strong>{" "}
          {en ? `from ${rated.reviewCount}+ customers at our ` : `de más de ${rated.reviewCount} clientes en nuestra sucursal `}
          <Link href={href(`/locations/${RATED_STORE}`)}>Plaza Embarcadero</Link>.
        </p>
      )}
      <CtaButtons lang={lang} source="about-page" />

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <p className="eyebrow">{en ? "Why choose us" : "Por qué elegirnos"}</p>
          <h2>{en ? `${years} years taking care of Los Cabos` : `${years} años cuidando de Los Cabos`}</h2>
        </div>
        <ul className="checks">
          {reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <p className="eyebrow">{en ? "What we do" : "Qué hacemos"}</p>
          <h2>{en ? "Everything you need during your stay" : "Todo lo que necesitas durante tu estancia"}</h2>
        </div>
        <div className="cards">
          {services.map((s) => (
            <article key={s.path} className="card">
              <h3>
                <Link href={href(s.path)}>{en ? s.en : s.es}</Link>
              </h3>
              <p className="muted">{en ? s.den : s.des}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <p className="eyebrow">{en ? "Our team" : "Nuestro equipo"}</p>
          <h2>{en ? "The people who help you" : "Las personas que te atienden"}</h2>
        </div>
        <div className="team-grid">
          {TEAM_PHOTOS.map((t, i) => (
            <figure key={t.src} className="team-card">
              <Image src={t.src} alt={t.alt[lang]} width={t.width} height={t.height} sizes="(max-width: 720px) 100vw, 380px" priority={i < 2} />
              <figcaption>{t.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
