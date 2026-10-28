import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { Gallery } from "@/components/Gallery";
import { FaqList } from "@/components/ServiceFaqList";
import { buildMetadata } from "@/lib/metadata";
import { IV_PRODUCTS, ivBookingMessage } from "@/lib/ivProducts";
import { DOCTOR_PHOTOS, IV_SESSION_PHOTOS, NURSING_PHOTOS } from "@/lib/sessionPhotos";
import { DropIcon } from "@/components/Icons";
import { whatsappUrl } from "@/lib/whatsapp";
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
      {(slug === "iv-therapy" || slug === "home-nursing" || slug === "doctor-consultation") && (
        <section className="container section">
          <Gallery photos={slug === "iv-therapy" ? IV_SESSION_PHOTOS : slug === "home-nursing" ? NURSING_PHOTOS : DOCTOR_PHOTOS} lang={lang} />
        </section>
      )}
      {slug === "iv-therapy" && (
        <section className="container section">
          <h2>{lang === "en" ? "Choose your IV" : "Elige tu IV"}</h2>
          <div className="product-grid">
            {IV_PRODUCTS.map((p) => (
              <article key={p.slug} className="product-card">
                <span className="service-icon">
                  <DropIcon />
                </span>
                <h3>{p.name[lang]}</h3>
                <p className="muted">
                  {p.description[lang]} {p.minutes} min
                </p>
                <dl className="prices">
                  <div>
                    <dt>{lang === "en" ? "At your villa or hotel" : "En tu villa u hotel"}</dt>
                    <dd>
                      {lang === "en" ? "From" : "Desde"} <strong>${p.home}</strong> USD
                    </dd>
                  </div>
                  <div>
                    <dt>{lang === "en" ? "In office" : "En consultorio"}</dt>
                    <dd>
                      {lang === "en" ? "From" : "Desde"} <strong>${p.office}</strong> USD
                    </dd>
                  </div>
                </dl>
                <a
                  className="btn btn-primary"
                  href={whatsappUrl(lang, `iv-product-${p.slug}`, ivBookingMessage(p, lang))}
                  target="_blank"
                  rel="noopener"
                  data-cta="whatsapp"
                  data-source={`iv-product-${p.slug}`}
                >
                  {lang === "en" ? "Book on WhatsApp" : "Reservar por WhatsApp"}
                </a>
              </article>
            ))}
          </div>
        </section>
      )}
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
