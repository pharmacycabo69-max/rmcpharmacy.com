import type { Metadata } from "next";
import { localizedPath } from "./routes";
import { LANGS, SITE, type Lang } from "./site";

export function buildMetadata(opts: {
  lang: Lang;
  enPath: string;
  title: string;
  description: string;
  /** Use the title as-is, without the "| RMC Pharmacy" suffix from the layout template. */
  absoluteTitle?: boolean;
  image?: string;
}): Metadata {
  const { lang, enPath, title, description, absoluteTitle, image } = opts;
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = SITE.url + localizedPath(l, enPath);
  languages["x-default"] = SITE.url + localizedPath("en", enPath);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: SITE.url + localizedPath(lang, enPath), languages },
    openGraph: {
      title,
      description,
      url: SITE.url + localizedPath(lang, enPath),
      siteName: SITE.name,
      locale: lang === "es" ? "es_MX" : "en_US",
      type: "website",
      ...(image ? { images: [{ url: image.startsWith("http") ? image : SITE.url + image }] } : {}),
    },
  };
}
