import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AnalyticsHead, AnalyticsNoscript } from "@/components/Analytics";
import { CtaTracker } from "@/components/CtaTracker";
import { JsonLd } from "@/components/JsonLd";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { organizationSchema } from "@/lib/schema";
import { LANGS, SITE, isLang } from "@/lib/site";
import "../globals.css";

const font = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
};

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={font.variable}>
      <body>
        <AnalyticsNoscript />
        <AnalyticsHead />
        <CtaTracker />
        <RevealOnScroll />
        <JsonLd data={organizationSchema()} />
        {children}
      </body>
    </html>
  );
}
