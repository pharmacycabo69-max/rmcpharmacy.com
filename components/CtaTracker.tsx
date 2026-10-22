"use client";

import { useEffect } from "react";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

const EVENTS: Record<string, string> = {
  whatsapp: "whatsapp_click",
  call: "call_click",
  directions: "directions_click",
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const STORAGE_KEY = "rmc_utm";

function readUtm(): Record<string, string> {
  const fromUrl: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) fromUrl[k] = v;
  }
  try {
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return fromUrl;
  }
}

// One delegated listener turns every [data-cta] click into a dataLayer event for GTM.
export function CtaTracker() {
  useEffect(() => {
    readUtm();
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cta]");
      if (!el) return;
      const event = EVENTS[el.dataset.cta ?? ""];
      if (!event) return;
      const w = window as DataLayerWindow;
      (w.dataLayer = w.dataLayer ?? []).push({
        event,
        cta_source: el.dataset.source,
        page_path: window.location.pathname,
        page_language: document.documentElement.lang,
        ...readUtm(),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
