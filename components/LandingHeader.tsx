import Link from "next/link";
import { localizedPath } from "@/lib/routes";
import { SITE, type Lang } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Minimal header for Ads landing pages: no navigation to other sections.
export function LandingHeader({ lang }: { lang: Lang }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={localizedPath(lang, "/")} className="brand">
          {SITE.name}
        </Link>
        <LanguageSwitcher lang={lang} />
      </div>
    </header>
  );
}
