import { hoursSummary } from "./hours";
import type { Location } from "./locations";
import type { Lang } from "./site";

export function locationTitle(l: Location, lang: Lang) {
  if (l.kind === "clinic") return `${l.gbpName} | Cabo San Lucas`;
  const tail = l.delivers ? (lang === "en" ? "Pharmacy & Delivery" : "Farmacia y entrega") : lang === "en" ? "Pharmacy" : "Farmacia";
  return `${l.gbpName} – ${l.placeLabel}, Cabo San Lucas | ${tail}`;
}

// Each description differs per store through its plaza/street, address and phone.
export function locationDescription(l: Location, lang: Lang) {
  const hours = l.hours ? hoursSummary(l.hours, lang) : "";
  if (l.kind === "clinic") {
    return lang === "en"
      ? `${l.gbpName}, ${l.addressLine}, ${l.neighborhood}. ${hours}. Walk-ins welcome. Call ${l.phone}.`
      : `${l.gbpName}, ${l.addressLine}, ${l.neighborhood}. ${hours}. Sin cita. Llama al ${l.phone}.`;
  }
  if (lang === "en") {
    return `${l.gbpName}, ${l.addressLine}. ${hours}. Call ${l.phone}.${l.delivers ? " Delivery to hotels and villas, estimated up to 70 minutes." : ""}`;
  }
  return `${l.gbpName}, ${l.addressLine}. ${hours}. Llama al ${l.phone}.${l.delivers ? " Entrega en hoteles y villas, estimada de hasta 70 minutos." : ""}`;
}
