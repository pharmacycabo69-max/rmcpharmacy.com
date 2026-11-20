import type { Metadata } from "next";
import { localizedPath } from "./routes";
import { LANGS, SITE, type Lang } from "./site";

/** Google shows about 60–65 characters of a title and 155–160 of a description on most screens. */
export const TITLE_MAX = 65;
export const DESCRIPTION_MAX = 160;

const BRAND_SUFFIX = ` | ${SITE.name}`;

/**
 * Shorten a full title until it fits, dropping the least useful parts first:
 * the brand suffix, then trailing " | …" segments (ETA, "Pharmacy & Delivery"), then a trailing ", area".
 */
export function fitTitle(full: string, max = TITLE_MAX) {
  let t = full;
  if (t.length <= max) return t;
  if (t.endsWith(BRAND_SUFFIX)) t = t.slice(0, -BRAND_SUFFIX.length);
  while (t.length > max && t.includes(" | ")) t = t.slice(0, t.lastIndexOf(" | "));
  if (t.length > max && t.includes(", ")) t = t.slice(0, t.lastIndexOf(", "));
  return t;
}

/** Cut a description at the last full sentence that fits; fall back to a word boundary. */
export function fitDescription(d: string, max = DESCRIPTION_MAX) {
  if (d.length <= max) return d;
  const head = d.slice(0, max);
  const end = Math.max(head.lastIndexOf(". "), head.endsWith(".") ? head.length - 1 : -1);
  if (end >= 70) return head.slice(0, end + 1);
  return head.slice(0, head.lastIndexOf(" ")).replace(/[,;:]$/, "") + "…";
}

export function buildMetadata(opts: {
  lang: Lang;
  enPath: string;
  title: string;
  description: string;
  /** Use the title as-is, without the "| RMC Pharmacy" suffix from the layout template. */
  absoluteTitle?: boolean;
  image?: string;
}): Metadata {
  const { lang, enPath, absoluteTitle, image } = opts;
  const title = fitTitle(absoluteTitle ? opts.title : opts.title + BRAND_SUFFIX);
  const description = fitDescription(opts.description);
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = SITE.url + localizedPath(l, enPath);
  languages["x-default"] = SITE.url + localizedPath("en", enPath);
  return {
    // Always absolute: the brand suffix is already in `title` when it fits.
    title: { absolute: title },
    description,
    alternates: { canonical: SITE.url + localizedPath(lang, enPath), languages },
    openGraph: {
      title,
      description,
      url: SITE.url + localizedPath(lang, enPath),
      siteName: SITE.name,
      locale: lang === "es" ? "es_MX" : "en_US",
      type: "website",
      images: [{ url: (image ?? "/og-default.jpg").startsWith("http") ? (image ?? "/og-default.jpg") : SITE.url + (image ?? "/og-default.jpg") }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
