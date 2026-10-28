import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { LOCATIONS, fullAddress } from "@/lib/locations";
import { buildMetadata } from "@/lib/metadata";
import { SITE, isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return buildMetadata({
    lang,
    enPath: "/contact",
    title: lang === "en" ? "Contact RMC Pharmacy" : "Contacto RMC Pharmacy",
    description:
      lang === "en"
        ? "Message us on WhatsApp or call RMC Pharmacy in Cabo San Lucas. Open every day from 9 am to 6 pm."
        : "Escríbenos por WhatsApp o llama a RMC Pharmacy en Cabo San Lucas. Abierto todos los días de 9 am a 6 pm.",
  });
}

export default async function Contact({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  return (
    <div className="container section">
      <h1>{lang === "en" ? "Contact" : "Contacto"}</h1>
      <p className="lead">
        {SITE.phone} · {SITE.hoursLabel[lang]}
      </p>
      <CtaButtons lang={lang} source="contact-page" />
      <div className="cards">
        {LOCATIONS.map((l) => (
          <article key={l.slug} className="card">
            <h2>{l.gbpName}</h2>
            <address>{fullAddress(l)}</address>
            <CtaButtons lang={lang} source={`contact-${l.slug}`} location={l} showCall={false} />
          </article>
        ))}
      </div>
    </div>
  );
}
