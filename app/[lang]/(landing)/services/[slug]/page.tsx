import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/ServiceFaqList";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { SERVICES, getService } from "@/lib/services";
import { LANGS, isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => SERVICES.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!isLang(lang) || !s) return {};
  return buildMetadata({ lang, enPath: `/services/${slug}`, title: s.metaTitle[lang], description: s.metaDescription[lang] });
}

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!isLang(lang) || !s) notFound();
  const source = `service-${slug}`;
  const stepsTitle = lang === "en" ? "How it works" : "Cómo funciona";
  const faqTitle = lang === "en" ? "Frequently asked questions" : "Preguntas frecuentes";
  return (
    <>
      <JsonLd data={serviceSchema(s, lang)} />
      <JsonLd data={faqSchema(s.faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))} />
      <section className="hero">
        <div className="container">
          <p className="eyebrow">{s.price[lang]}</p>
          <h1>{s.headline[lang]}</h1>
          <p className="lead">{s.intro[lang]}</p>
          <CtaButtons lang={lang} source={`${source}-hero`} />
        </div>
      </section>
      <section className="container section">
        <ul className="checks">
          {s.points.map((p) => (
            <li key={p.en}>{p[lang]}</li>
          ))}
        </ul>
      </section>
      <section className="container section">
        <h2>{stepsTitle}</h2>
        <ol className="steps">
          {s.steps.map((st) => (
            <li key={st.en}>{st[lang]}</li>
          ))}
        </ol>
        <CtaButtons lang={lang} source={`${source}-steps`} showCall={false} />
      </section>
      <section className="container section">
        <h2>{faqTitle}</h2>
        <FaqList lang={lang} items={s.faqs} />
        {s.external && (
          <p>
            <a href={s.external.url} rel="noopener">
              {s.external.label[lang]}
            </a>
          </p>
        )}
      </section>
    </>
  );
}
