import type { Metadata } from "next";
import Link from "next/link";
import { OpenStatus } from "@/components/OpenStatus";
import { LOCATIONS, storeCountLabel } from "@/lib/locations";
import { UI, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";
import { isLang } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const count = storeCountLabel(lang);
  return buildMetadata({
    lang,
    enPath: "/locations",
    title: lang === "en" ? "Pharmacy Locations in Cabo San Lucas" : "Sucursales en Cabo San Lucas",
    description:
      lang === "en"
        ? `Our ${count} in Cabo San Lucas. Find the address, opening hours and directions for each one.`
        : `Nuestras ${count} en Cabo San Lucas. Encuentra la dirección, el horario y cómo llegar a cada una.`,
  });
}

export default async function Locations({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  return (
    <div className="container section">
      <h1>{t(lang, UI.nav.locations)}</h1>
      <ul className="rows">
        {LOCATIONS.map((l) => (
          <li key={l.slug}>
            <span>
              <Link href={localizedPath(lang, `/locations/${l.slug}`)}>{l.gbpName}</Link>
              <br />
              <span className="muted">{l.addressLine}</span>
            </span>
            {l.hours && <OpenStatus hours={l.hours} lang={lang} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
