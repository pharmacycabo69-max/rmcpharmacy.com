import type { Metadata } from "next";
import { localizedPath } from "./routes";
import { LANGS, SITE, type Lang } from "./site";

export function buildMetadata(opts: { lang: Lang; enPath: string; title: string; description: string }): Metadata {
  const { lang, enPath, title, description } = opts;
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = SITE.url + localizedPath(l, enPath);
  languages["x-default"] = SITE.url + localizedPath("en", enPath);
  return {
    title,
    description,
    alternates: { canonical: SITE.url + localizedPath(lang, enPath), languages },
    openGraph: {
      title,
      description,
      url: SITE.url + localizedPath(lang, enPath),
      siteName: SITE.name,
      locale: lang === "es" ? "es_MX" : "en_US",
      type: "website",
    },
  };
}
