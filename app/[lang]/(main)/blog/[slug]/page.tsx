import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/ServiceFaqList";
import { buildMetadata } from "@/lib/metadata";
import { POSTS, getPost } from "@/lib/posts";
import { localizedPath } from "@/lib/routes";
import { faqSchema } from "@/lib/schema";
import { LANGS, SITE, isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => POSTS.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLang(lang) || !post) return {};
  return buildMetadata({ lang, enPath: `/blog/${slug}`, title: post.title[lang], description: post.description[lang] });
}

export default async function Post({ params }: Props) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLang(lang) || !post) notFound();
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[lang],
    description: post.description[lang],
    datePublished: post.date,
    inLanguage: lang,
    mainEntityOfPage: SITE.url + localizedPath(lang, `/blog/${slug}`),
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
  return (
    <article className="container section prose">
      <JsonLd data={article} />
      {post.faqs && <JsonLd data={faqSchema(post.faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))} />}
      <h1>{post.title[lang]}</h1>
      {post.body[lang].map((b, i) => {
        if ("h" in b) return <h2 key={i}>{b.h}</h2>;
        if ("ul" in b)
          return (
            <ul key={i} className="checks">
              {b.ul.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          );
        return <p key={i}>{b.p}</p>;
      })}
      {post.faqs && (
        <>
          <h2>{lang === "en" ? "Frequently asked questions" : "Preguntas frecuentes"}</h2>
          <FaqList lang={lang} items={post.faqs} />
        </>
      )}
      <CtaButtons lang={lang} source={`blog-${post.slug}`} />
      <p>
        {post.related.map((r, i) => (
          <span key={r.path}>
            {i > 0 && " · "}
            <Link href={localizedPath(lang, r.path)}>{r.label[lang]}</Link>
          </span>
        ))}
      </p>
    </article>
  );
}
