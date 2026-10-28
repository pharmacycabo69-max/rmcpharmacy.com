import Image from "next/image";
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
          <Image src="/logo-mark.png" alt="" width={34} height={34} className="brand-mark" />
          <span>{SITE.name}</span>
        </Link>
        <LanguageSwitcher lang={lang} />
      </div>
    </header>
  );
}
