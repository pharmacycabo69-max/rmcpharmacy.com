import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { UI } from "@/lib/i18n";
import { isLang } from "@/lib/site";

export default async function MainLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <>
      <a className="skip" href="#main">
        {UI.skip[lang]}
      </a>
      <Header lang={lang} />
      <main id="main">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
