import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";
import { POSTS } from "@/lib/posts";
import { localizedPath } from "@/lib/routes";
import { SERVICES } from "@/lib/services";
import { LANGS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/locations",
    ...LOCATIONS.map((l) => `/locations/${l.slug}`),
    "/pharmacy",
    "/delivery",
    ...SERVICES.map((s) => `/services/${s.slug}`),
    "/about",
    "/contact",
    ...(POSTS.length ? ["/blog", ...POSTS.map((p) => `/blog/${p.slug}`)] : []),
  ];
  return paths.map((path) => ({
    url: SITE.url + localizedPath("en", path),
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, SITE.url + localizedPath(l, path)])) },
  }));
}
