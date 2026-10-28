import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { storeCountLabel } from "@/lib/locations";
import { buildMetadata } from "@/lib/metadata";
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

// TODO(content): add real story, team and store photos before launch.
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
    </div>
  );
}
