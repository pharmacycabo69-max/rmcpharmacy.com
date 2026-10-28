import type { Photo } from "./locations";

// Real IV therapy sessions at villas. Shown on the IV therapy and group pages.
export const IV_SESSION_PHOTOS: Photo[] = [
  { src: "/services/iv-sessions/01-session-terrace.jpg", width: 765, height: 1020, alt: { en: "IV therapy session on a villa terrace in Cabo San Lucas", es: "Sesión de terapia IV en la terraza de una villa en Cabo San Lucas" } },
  { src: "/services/iv-sessions/02-session-pool.jpg", width: 765, height: 1020, alt: { en: "Group IV therapy session by a villa pool in Cabo San Lucas", es: "Sesión grupal de terapia IV junto a la alberca de una villa en Cabo San Lucas" } },
  { src: "/services/iv-sessions/03-session-living-room.jpg", width: 765, height: 1020, alt: { en: "Group IV therapy session in a villa living room in Cabo San Lucas", es: "Sesión grupal de terapia IV en la sala de una villa en Cabo San Lucas" } },
];

// The same real sessions, described for the home nursing page (a nurse attending a guest at a villa).
export const NURSING_PHOTOS: Photo[] = [
  { src: "/services/iv-sessions/01-session-terrace.jpg", width: 765, height: 1020, alt: { en: "A nurse attends a guest on a villa terrace in Cabo San Lucas", es: "Una enfermera atiende a un huésped en la terraza de una villa en Cabo San Lucas" } },
  { src: "/services/iv-sessions/02-session-pool.jpg", width: 765, height: 1020, alt: { en: "A nurse visit by the pool of a villa in Cabo San Lucas", es: "Una visita de enfermería junto a la alberca de una villa en Cabo San Lucas" } },
];

// A medical visit at a villa. Used on the doctor consultation page and card.
export const DOCTOR_PHOTOS: Photo[] = [
  { src: "/services/medical-visits/01-villa-terrace.jpg", width: 765, height: 1020, alt: { en: "A medical team member attends guests on a villa terrace in Cabo San Lucas", es: "Una integrante del equipo médico atiende a huéspedes en la terraza de una villa en Cabo San Lucas" } },
];

/** Photo shown on each service card on the home page. Services without a real photo yet show the icon panel. */
export const SERVICE_CARD_PHOTO: Record<string, Photo | undefined> = {
  "iv-therapy": IV_SESSION_PHOTOS[2],
  "home-nursing": NURSING_PHOTOS[0],
  "doctor-consultation": DOCTOR_PHOTOS[0],
};
