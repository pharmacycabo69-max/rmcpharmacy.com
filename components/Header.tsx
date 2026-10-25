import Link from "next/link";
import { UI, t } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { SITE, type Lang } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ lang }: { lang: Lang }) {
  const p = (path: string) => localizedPath(lang, path);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={p("/")} className="brand">
          {SITE.name}
        </Link>
        <nav aria-label="Main" className="nav">
          <Link href={p("/pharmacy")}>{t(lang, UI.nav.pharmacy)}</Link>
          <Link href={p("/delivery")}>{t(lang, UI.nav.delivery)}</Link>
          <details className="menu">
            <summary>{lang === "en" ? "Services" : "Servicios"}</summary>
            <div className="menu-panel">
              <Link href={p("/services/iv-therapy")}>{t(lang, UI.nav.ivTherapy)}</Link>
              <Link href={p("/services/iv-therapy/groups")} className="menu-sub">
                {lang === "en" ? "Group IV Therapy" : "Terapia IV grupal"}
              </Link>
              <Link href={p("/services/doctor-consultation")}>{t(lang, UI.nav.doctor)}</Link>
              <Link href={p("/services/home-nursing")}>{t(lang, UI.nav.nursing)}</Link>
            </div>
          </details>
          <Link href={p("/locations")}>{t(lang, UI.nav.locations)}</Link>
          <Link href={p("/contact")}>{t(lang, UI.nav.contact)}</Link>
        </nav>
        <LanguageSwitcher lang={lang} />
      </div>
    </header>
  );
}
