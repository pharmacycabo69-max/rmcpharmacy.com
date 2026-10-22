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
    enPath: "/pharmacy",
    title: lang === "en" ? "Pharmacy and Travel Essentials in Cabo" : "Farmacia y esenciales de viaje en Cabo",
    description:
      lang === "en"
        ? "Everyday over-the-counter essentials, sun care, first aid and travel basics at RMC Pharmacy on the Cabo marina."
        : "Esenciales de venta libre, protección solar, primeros auxilios y básicos de viaje en RMC Pharmacy, en la marina de Cabo.",
  });
}

const CATEGORIES = {
  en: ["Sun care and after-sun", "First aid and bandages", "Hydration and electrolytes", "Personal care and hygiene", "Travel basics and snacks", "Baby and family care"],
  es: ["Protector solar y after-sun", "Primeros auxilios y vendajes", "Hidratación y electrolitos", "Cuidado personal e higiene", "Básicos de viaje y snacks", "Cuidado de bebé y familia"],
};

export default async function Pharmacy({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  return (
    <div className="container section">
      <h1>{lang === "en" ? "Pharmacy and minimarket" : "Farmacia y minisúper"}</h1>
      <p className="lead">
        {lang === "en"
          ? "Everyday essentials for your trip, in English and Spanish. Ask us on WhatsApp if you want to check availability before you walk over."
          : "Esenciales de todos los días para tu viaje, en inglés y español. Pregúntanos por WhatsApp para revisar disponibilidad antes de venir."}
      </p>
      <ul className="checks">
        {CATEGORIES[lang].map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <CtaButtons lang={lang} source="pharmacy-page" />
    </div>
  );
}
