"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UI } from "@/lib/i18n";
import { switchLanguagePath } from "@/lib/routes";
import type { Lang } from "@/lib/site";

export function LanguageSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const target: Lang = lang === "en" ? "es" : "en";
  return (
    <Link href={switchLanguagePath(pathname, target)} hrefLang={target} lang={target} className="lang-switch">
      {UI.langSwitch[lang]}
    </Link>
  );
}
