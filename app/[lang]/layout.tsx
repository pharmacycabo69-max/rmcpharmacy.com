import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { LANGS, SITE, isLang } from "@/lib/site";
import "../globals.css";

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
    <html lang={lang}>
      <body>
        <JsonLd data={organizationSchema()} />
        {children}
      </body>
    </html>
  );
}
