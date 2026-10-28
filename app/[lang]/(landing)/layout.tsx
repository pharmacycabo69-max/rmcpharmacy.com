import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LandingHeader } from "@/components/LandingHeader";
import { ChatBot } from "@/components/ChatBot";
import { buildBot } from "@/lib/botFlows";
import { UI } from "@/lib/i18n";
import { SITE, isLang } from "@/lib/site";
import { telUrl } from "@/lib/whatsapp";

// Ads landing layout: no links to the pharmacy catalog or delivery pages.
export default async function LandingLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <>
      <a className="skip" href="#main">
        {UI.skip[lang]}
      </a>
      <LandingHeader lang={lang} />
      <main id="main">{children}</main>
      <ChatBot config={buildBot(lang)} />
      <footer className="site-footer">
        <div className="container footer-bottom">
          <small>
            © {new Date().getFullYear()} {SITE.name} · <a href={telUrl()}>{SITE.phone}</a> · {SITE.hoursLabel[lang]}
          </small>
        </div>
      </footer>
    </>
  );
}
