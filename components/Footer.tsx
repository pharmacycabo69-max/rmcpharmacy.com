import Link from "next/link";
import { LOCATIONS, fullAddress } from "@/lib/locations";
import { UI, t } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { SITE, type Lang } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { ZONES } from "@/lib/zones";
import { telUrl } from "@/lib/whatsapp";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {LOCATIONS.map((l) => (
          <div key={l.slug}>
            <h2 className="footer-title">
              <Link href={localizedPath(lang, `/locations/${l.slug}`)}>{l.gbpName}</Link>
            </h2>
            <address>{fullAddress(l)}</address>
          </div>
        ))}
        <div>
          <h2 className="footer-title">{t(lang, UI.footer.hours)}</h2>
          <p>{SITE.hoursLabel[lang]}</p>
          <p>
            <a href={telUrl()}>{SITE.phone}</a>
          </p>
        </div>
      </div>
      <div className="container footer-lists">
        <div>
          <h2 className="footer-title">{lang === "en" ? "Delivery zones" : "Zonas de entrega"}</h2>
          <ul>
            {ZONES.map((z) => (
              <li key={z.slug}>
                <Link href={localizedPath(lang, `/delivery/${z.slug}`)}>{z.name[lang]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-title">{lang === "en" ? "Services" : "Servicios"}</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={localizedPath(lang, `/services/${s.slug}`)}>{s.name[lang]}</Link>
              </li>
            ))}
            <li>
              <Link href={localizedPath(lang, "/services/iv-therapy/groups")}>{lang === "en" ? "Group IV therapy" : "Terapia IV grupal"}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-links">
        <Link href={localizedPath(lang, "/about")}>{t(lang, UI.nav.about)}</Link>
        <Link href={localizedPath(lang, "/blog")}>{t(lang, UI.nav.blog)}</Link>
      </div>
      <div className="container footer-bottom">
        <small>
          © {new Date().getFullYear()} {SITE.name}. {t(lang, UI.footer.rights)}
        </small>
      </div>
    </footer>
  );
}
