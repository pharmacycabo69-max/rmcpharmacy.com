"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

export type HotelOption = { name: string; zoneName: string; zoneSlug: string; etaMin: number; etaMax: number; aliases: string[]; href: string };

type Props = {
  lang: "en" | "es";
  options: HotelOption[];
  waNumber: string;
  strings: { label: string; placeholder: string; button: string; eta: string; zonePage: string };
};

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

// Native datalist autocomplete over hotels and zone names. The button is a plain WhatsApp link.
export function HotelFinder({ lang, options, waNumber, strings }: Props) {
  const [value, setValue] = useState("");
  const id = useId();
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

  const match = useMemo(() => {
    const q = norm(value);
    if (q.length < 3) return undefined;
    return options.find((o) => norm(o.name) === q) ?? options.find((o) => norm(o.name).includes(q) || o.aliases.some((a) => norm(a) === q || norm(a).includes(q)));
  }, [value, options]);

  const hotel = value.trim() || (lang === "en" ? "[hotel name]" : "[nombre del hotel]");
  const where = match ? ` (${match.zoneName})` : "";
  const text =
    lang === "en"
      ? `Hi! I'm staying at ${hotel}${where}. I'd like to order delivery. ref: home-hotel`
      : `¡Hola! Me hospedo en ${hotel}${where}. Me gustaría pedir entrega. ref: home-hotel`;
  const href = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  return (
    <div className="finder">
      <label htmlFor={id}>{strings.label}</label>
      <div className="finder-row">
        <input
          id={id}
          list={`${id}-list`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            if (match) {
              const w = window as DataLayerWindow;
              (w.dataLayer = w.dataLayer ?? []).push({ event: "hotel_selected", zone: match.zoneSlug });
            }
          }}
          placeholder={strings.placeholder}
          autoComplete="off"
        />
        <a className="btn btn-primary" href={href} target="_blank" rel="noopener" data-cta="whatsapp" data-source="home-hotel">
          {strings.button}
        </a>
      </div>
      <datalist id={`${id}-list`}>
        {options.map((o) => (
          <option key={`${o.zoneSlug}-${o.name}`} value={o.name}>
            {o.zoneName}
          </option>
        ))}
      </datalist>
      {match && (
        <p className="finder-result">
          {strings.eta} {match.etaMin}–{match.etaMax} min · {match.zoneName}.{" "}
          <Link href={match.href}>{strings.zonePage}</Link>
        </p>
      )}
    </div>
  );
}
