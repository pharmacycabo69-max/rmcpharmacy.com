import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
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
        ? "RMC Pharmacy: three stores on the Cabo San Lucas marina, open every day, in English and Spanish."
        : "RMC Pharmacy: tres sucursales en la marina de Cabo San Lucas, abiertas todos los días, en inglés y español.",
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
          ? "We are a pharmacy and minimarket with three stores on the Cabo San Lucas marina. We are open every day from 9 am to 6 pm and we attend in English and Spanish."
          : "Somos una farmacia y minisúper con tres sucursales en la marina de Cabo San Lucas. Abrimos todos los días de 9 am a 6 pm y atendemos en inglés y español."}
      </p>
      <CtaButtons lang={lang} source="about-page" />
    </div>
  );
}
