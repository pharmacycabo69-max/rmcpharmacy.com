import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";
import { getPublishedPosts } from "@/lib/posts";
import { localizedPath } from "@/lib/routes";
import { SERVICES } from "@/lib/services";
import { ZONES } from "@/lib/zones";
import { LANGS, SITE } from "@/lib/site";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/locations",
    ...LOCATIONS.map((l) => `/locations/${l.slug}`),
    "/pharmacy",
    "/delivery",
    ...ZONES.map((z) => `/delivery/${z.slug}`),
    ...SERVICES.map((s) => `/services/${s.slug}`),
    "/services/iv-therapy/groups",
    "/about",
    "/contact",
    ...(getPublishedPosts().length ? ["/blog", ...getPublishedPosts().map((p) => `/blog/${p.slug}`)] : []),
  ];
  return paths.map((path) => ({
    url: SITE.url + localizedPath("en", path),
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, SITE.url + localizedPath(l, path)])) },
  }));
}
