import type { Location } from "@/lib/locations";
import { directionsUrl } from "@/lib/locations";
import { UI, t } from "@/lib/i18n";
import type { Lang } from "@/lib/site";
import { telUrl, whatsappUrl } from "@/lib/whatsapp";

type Props = {
  lang: Lang;
  source: string;
  location?: Location;
  message?: string;
  showCall?: boolean;
};

// data-cta values are read by GTM in Phase 2 (whatsapp_click, call_click, directions_click).
export function CtaButtons({ lang, source, location, message, showCall = true }: Props) {
  return (
    <div className="cta-row">
      <a
        className="btn btn-primary"
        href={whatsappUrl(lang, source, message)}
        target="_blank"
        rel="noopener"
        data-cta="whatsapp"
        data-source={source}
      >
        {t(lang, UI.cta.whatsapp)}
      </a>
      {showCall && (
        <a className="btn btn-secondary" href={telUrl()} data-cta="call" data-source={source}>
          {t(lang, UI.cta.call)}
        </a>
      )}
      {location && (
        <a
          className="btn btn-secondary"
          href={directionsUrl(location)}
          target="_blank"
          rel="noopener"
          data-cta="directions"
          data-source={source}
        >
          {t(lang, UI.cta.directions)}
        </a>
      )}
    </div>
  );
}
