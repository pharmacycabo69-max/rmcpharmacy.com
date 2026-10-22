import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { POSTS, getPost } from "@/lib/posts";
import { LANGS, isLang } from "@/lib/site";

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
  return (
    <article className="container section prose">
      <h1>{post.title[lang]}</h1>
      {post.body[lang].map((para) => (
        <p key={para}>{para}</p>
      ))}
    </article>
  );
}
