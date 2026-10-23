import Link from "next/link";
import { LOCATIONS, addressLine } from "@/lib/locations";
import { UI, t } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { SITE, type Lang } from "@/lib/site";
import { telUrl } from "@/lib/whatsapp";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {LOCATIONS.map((l) => (
          <div key={l.slug}>
            <h2 className="footer-title">
              <Link href={localizedPath(lang, `/locations/${l.slug}`)}>{l.name}</Link>
            </h2>
            <address>{addressLine(l)}</address>
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
