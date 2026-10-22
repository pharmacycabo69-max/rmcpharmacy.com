import { DEFAULT_LANG, type Lang } from "./site";

// Internal (English) route segments and their Spanish public equivalents.
export const ES_SEGMENTS: Record<string, string> = {
  locations: "ubicaciones",
  services: "servicios",
  pharmacy: "farmacia",
  delivery: "entrega",
  about: "nosotros",
  contact: "contacto",
  "iv-therapy": "terapia-iv",
  "doctor-consultation": "consulta-medica",
  "home-nursing": "enfermeria-a-domicilio",
};

const EN_FROM_ES = Object.fromEntries(Object.entries(ES_SEGMENTS).map(([en, es]) => [es, en]));

/** Public path for an internal English path, e.g. "/services/iv-therapy" + "es" -> "/es/servicios/terapia-iv". */
export function localizedPath(lang: Lang, enPath: string) {
  const segs = enPath.split("/").filter(Boolean);
  const out = lang === "es" ? segs.map((s) => ES_SEGMENTS[s] ?? s) : segs;
  const path = "/" + out.join("/");
  if (lang === DEFAULT_LANG) return path;
  return path === "/" ? "/es" : `/es${path}`;
}

/** Spanish public segments -> internal English segments (used by the proxy). */
export function toInternalSegments(segments: string[]) {
  return segments.map((s) => EN_FROM_ES[s] ?? s);
}

/** Given the public pathname currently shown, return the equivalent path in `target` language. */
export function switchLanguagePath(publicPath: string, target: Lang) {
  const segs = publicPath.split("/").filter(Boolean);
  // usePathname can report either the public path or the internal /en|/es rewrite target.
  const hasPrefix = segs[0] === "es" || segs[0] === "en";
  const internal = toInternalSegments(hasPrefix ? segs.slice(1) : segs);
  return localizedPath(target, "/" + internal.join("/"));
}
