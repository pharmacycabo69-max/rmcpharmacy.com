import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { Gallery } from "@/components/Gallery";
import { FaqList } from "@/components/ServiceFaqList";
import { GROUPS as G } from "@/lib/groups";
import { buildMetadata } from "@/lib/metadata";
import { IV_SESSION_PHOTOS } from "@/lib/sessionPhotos";
import { localizedPath } from "@/lib/routes";
import { faqSchema } from "@/lib/schema";
import { LANGS, SITE, isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

const PATH = "/services/iv-therapy/groups";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return buildMetadata({ lang, enPath: PATH, title: G.metaTitle[lang], description: G.metaDescription[lang] });
}

export default async function GroupIvPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: G.metaTitle[lang],
    description: G.metaDescription[lang],
    url: SITE.url + localizedPath(lang, PATH),
    areaServed: { "@type": "City", name: "Cabo San Lucas" },
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone },
  };
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={faqSchema(G.faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))} />
      <section className="hero">
        <div className="container">
          <h1>{G.h1[lang]}</h1>
          <p className="lead">{G.intro[lang]}</p>
          <CtaButtons lang={lang} source="group-iv-hero" message={G.whatsapp[lang]} />
        </div>
      </section>

      <section className="container section">
        <Gallery photos={IV_SESSION_PHOTOS} lang={lang} />
      </section>

      <section className="container section">
        <h2>{G.packagesTitle[lang]}</h2>
        <div className="cards">
          {G.packages.map((pk) => (
            <article key={pk.name.en} className="card">
              <h3>{pk.name[lang]}</h3>
              <p>{pk.text[lang]}</p>
              <p className="muted">{G.price[lang]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2>{G.stepsTitle[lang]}</h2>
        <ol className="steps">
          {G.steps.map((s) => (
            <li key={s.en}>{s[lang]}</li>
          ))}
        </ol>
        <h2>{G.zonesTitle[lang]}</h2>
        <ul className="checks">
          {G.zones.map((z) => (
            <li key={z.en}>{z[lang]}</li>
          ))}
        </ul>
        <CtaButtons lang={lang} source="group-iv-steps" message={G.whatsapp[lang]} showCall={false} />
      </section>

      <section className="container section">
        <h2>{G.faqTitle[lang]}</h2>
        <FaqList lang={lang} items={G.faqs} />
        <p className="muted">{G.note[lang]}</p>
      </section>
    </>
  );
}
