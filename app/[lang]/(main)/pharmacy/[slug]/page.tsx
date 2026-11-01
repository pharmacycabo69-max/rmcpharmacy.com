import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/ServiceFaqList";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { LOCATIONS } from "@/lib/locations";
import { buildMetadata } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/posts";
import { localizedPath } from "@/lib/routes";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getService } from "@/lib/services";
import { LANGS, SITE, isLang, type Lang } from "@/lib/site";
import { getZone } from "@/lib/zones";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => CATEGORIES.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = getCategory(slug);
  if (!isLang(lang) || !c) return {};
  return buildMetadata({ lang, enPath: `/pharmacy/${slug}`, title: c.title[lang], description: c.description[lang], absoluteTitle: true });
}

/** Human label for a related internal path, or null if the target does not exist (e.g. an unpublished post). */
function relatedLabel(path: string, lang: Lang): string | null {
  const [, section, slug] = path.split("/");
  if (section === "pharmacy" && slug) return getCategory(slug)?.name[lang] ?? null;
  if (section === "services" && slug) return getService(slug)?.name[lang] ?? null;
  if (section === "delivery" && slug) {
    const z = getZone(slug);
    return z ? (lang === "en" ? `Delivery to ${z.name[lang]}` : `Entrega en ${z.name[lang]}`) : null;
  }
  if (section === "delivery") return lang === "en" ? "Pharmacy delivery" : "Entrega a domicilio";
  if (section === "blog" && slug) {
    const p = getPublishedPosts().find((x) => x.slug === slug);
    return p ? p.title[lang] : null;
  }
  if (section === "locations" && slug) {
    const l = LOCATIONS.find((x) => x.slug === slug);
    return l ? `${l.gbpName} · ${l.placeLabel}` : null;
  }
  return null;
}

export default async function CategoryPage({ params }: Props) {
  const { lang, slug } = await params;
  const c = getCategory(slug);
  if (!isLang(lang) || !c) notFound();
  const en = lang === "en";
  const related = c.related.map((p) => ({ href: localizedPath(lang, p), label: relatedLabel(p, lang) })).filter((r) => r.label);
  const others = CATEGORIES.filter((o) => o.slug !== c.slug);
  const faqs = c.faq.map((f) => ({ q: f.q[lang], a: f.a[lang] }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: c.title[lang],
    description: c.description[lang],
    url: SITE.url + localizedPath(lang, `/pharmacy/${c.slug}`),
    inLanguage: lang,
    about: { "@type": "Thing", name: c.name.en },
    isPartOf: { "@id": `${SITE.url}/#organization` },
  };

  return (
    <div className="container section">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: en ? "Home" : "Inicio", enPath: "/" },
          { name: en ? "Pharmacy" : "Farmacia", enPath: "/pharmacy" },
          { name: c.name[lang], enPath: `/pharmacy/${c.slug}` },
        ])}
      />

      <p className="eyebrow">{en ? "Pharmacy and minimarket" : "Farmacia y minisúper"}</p>
      <h1>{c.name[lang]}</h1>
      <p className="lead">{c.blurb[lang]}</p>
      <CtaButtons lang={lang} source={`category-${c.slug}`} message={c.ask[lang]} />

      <section className="section prose">
        {c.intro[lang].split("\n\n").map((para) => (
          <p key={para}>{para}</p>
        ))}
      </section>

      <section className="section">
        <h2>{en ? "What we usually carry" : "Lo que normalmente tenemos"}</h2>
        <ul className="checks">
          {c.items[lang].map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
        <p className="muted">
          <small>{en ? "Stock changes daily. We confirm availability and price on WhatsApp before you come or order delivery." : "El inventario cambia a diario. Confirmamos disponibilidad y precio por WhatsApp antes de que vengas o pidas entrega."}</small>
        </p>
      </section>

      <section className="section">
        <h2>{en ? "Good to know" : "Bueno saberlo"}</h2>
        <ul className="checks">
          {c.tips[lang].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>{en ? "Frequently asked questions" : "Preguntas frecuentes"}</h2>
        <FaqList lang={lang} items={c.faq} />
      </section>

      <CtaButtons lang={lang} source={`category-${c.slug}-bottom`} message={c.ask[lang]} />

      {related.length > 0 && (
        <section className="section">
          <h2>{en ? "Related" : "Relacionado"}</h2>
          <ul className="checks">
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href}>{r.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <h2>{en ? "Other categories" : "Otras categorías"}</h2>
        <ul className="other-stores">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={localizedPath(lang, `/pharmacy/${o.slug}`)}>{o.name[lang]}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
