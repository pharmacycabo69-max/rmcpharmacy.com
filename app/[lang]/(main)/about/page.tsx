import type { Metadata } from "next";
import Image from "next/image";
import { CtaButtons } from "@/components/CtaButtons";
import { storeCountLabel } from "@/lib/locations";
import { buildMetadata } from "@/lib/metadata";
import { TEAM_PHOTOS } from "@/lib/team";
import { isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return buildMetadata({
    lang,
    enPath: "/about",
    title: lang === "en" ? "About RMC Pharmacy" : "Sobre RMC Pharmacy",
    description:
      lang === "en"
        ? `RMC Pharmacy: ${storeCountLabel("en")} in Cabo San Lucas, in English and Spanish.`
        : `RMC Pharmacy: ${storeCountLabel("es")} en Cabo San Lucas, en inglés y español.`,
  });
}

// TODO(content): add the real story of the business.
export default async function About({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  return (
    <div className="container section">
      <h1>{lang === "en" ? "About RMC Pharmacy" : "Sobre RMC Pharmacy"}</h1>
      <p className="lead">
        {lang === "en"
          ? `We are a pharmacy and minimarket with ${storeCountLabel("en")} in Cabo San Lucas. We attend in English and Spanish. Find the hours of each store on its page.`
          : `Somos una farmacia y minisúper con ${storeCountLabel("es")} en Cabo San Lucas. Atendemos en inglés y español. Encuentra el horario de cada una en su página.`}
      </p>
      <CtaButtons lang={lang} source="about-page" />

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <p className="eyebrow">{lang === "en" ? "Our team" : "Nuestro equipo"}</p>
          <h2>{lang === "en" ? "The people who help you" : "Las personas que te atienden"}</h2>
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
