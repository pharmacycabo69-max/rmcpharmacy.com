import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { POSTS } from "@/lib/posts";
import { localizedPath } from "@/lib/routes";
import { isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const meta = buildMetadata({
    lang,
    enPath: "/blog",
    title: lang === "en" ? "Cabo Travel Health Tips" : "Consejos de salud para viajar a Cabo",
    description:
      lang === "en"
        ? "Practical tips for staying well on vacation in Los Cabos."
        : "Consejos prácticos para cuidarte en tus vacaciones en Los Cabos.",
  });
  return POSTS.length === 0 ? { ...meta, robots: { index: false, follow: true } } : meta;
}

export default async function Blog({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  return (
    <div className="container section">
      <h1>Blog</h1>
      {POSTS.length === 0 ? (
        <p>{lang === "en" ? "Articles coming soon." : "Próximamente."}</p>
      ) : (
        <ul>
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link href={localizedPath(lang, `/blog/${p.slug}`)}>{p.title[lang]}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
