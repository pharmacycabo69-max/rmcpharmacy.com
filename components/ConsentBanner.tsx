"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/site";

/**
 * Google Consent Mode v2. The default (denied) is set inline in <AnalyticsHead> before GTM loads;
 * this banner records the visitor's choice and sends the update. With consent denied, Google tags
 * only send cookieless pings, so GA4 keeps working in modeled form.
 */
export const CONSENT_KEY = "rmc_consent_v1";
type Choice = "granted" | "denied";

type GtagWindow = Window & { dataLayer?: unknown[] };

function consentUpdate(choice: Choice) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer ?? [];
  // GTM's gtag shim pushes `arguments` objects, not arrays; `apply` with a plain function reproduces that.
  function gtag() {
    (window as GtagWindow).dataLayer!.push(arguments);
  }
  (gtag as unknown as (...a: unknown[]) => void)("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

function apply(choice: Choice) {
  consentUpdate(choice);
  (window as GtagWindow).dataLayer?.push({ event: "consent_update", consent_choice: choice });
}

const T = {
  en: {
    text: "We use cookies for anonymous visit statistics so we can improve delivery zones and service pages. No ads, no sale of data.",
    accept: "Accept",
    decline: "Only essential",
  },
  es: {
    text: "Usamos cookies para estadísticas anónimas de visitas y así mejorar las zonas de entrega y las páginas de servicios. Sin anuncios ni venta de datos.",
    accept: "Aceptar",
    decline: "Solo esenciales",
  },
};

export function ConsentBanner({ lang, enabled }: { lang: Lang; enabled: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    try {
      const saved = localStorage.getItem(CONSENT_KEY) as Choice | null;
      if (saved === "granted" || saved === "denied") {
        apply(saved);
        return;
      }
    } catch {
      /* storage unavailable: show the banner each visit */
    }
    setOpen(true);
  }, [enabled]);

  if (!enabled || !open) return null;
  const t = T[lang];

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* ignore */
    }
    apply(choice);
    setOpen(false);
  };

  return (
    <div className="consent" role="dialog" aria-live="polite" aria-label={lang === "en" ? "Cookie preferences" : "Preferencias de cookies"}>
      <p>{t.text}</p>
      <div className="consent-actions">
        <button type="button" className="btn btn-secondary" onClick={() => choose("denied")}>
          {t.decline}
        </button>
        <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}
