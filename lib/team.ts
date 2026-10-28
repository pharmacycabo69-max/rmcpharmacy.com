import type { Photo } from "./locations";

export type TeamPhoto = Photo & { caption: string };

// Real photos of the people who attend customers. Used on the About page.
export const TEAM_PHOTOS: TeamPhoto[] = [
  { src: "/team/team-sun-care.jpg", width: 1600, height: 1069, caption: "RMC Pharmacy", alt: { en: "A team member shows sun care products on a store shelf", es: "Una integrante del equipo muestra productos de protección solar en un estante" } },
  { src: "/team/team-shelf.jpg", width: 1600, height: 1069, caption: "RMC Pharmacy", alt: { en: "A team member reaches for a product on the shelf", es: "Una integrante del equipo toma un producto del estante" } },
  { src: "/locations/plaza-gali/05-counter-team.jpg", width: 1600, height: 1069, caption: "Plaza Gali", alt: { en: "A team member at the counter of RMC Pharmacy, Plaza Gali", es: "Una integrante del equipo en el mostrador de RMC Pharmacy, Plaza Gali" } },
  { src: "/locations/plaza-gali/07-counter-service.jpg", width: 1600, height: 1069, caption: "Plaza Gali", alt: { en: "A team member serving at the counter of RMC Pharmacy, Plaza Gali", es: "Un integrante del equipo atendiendo en el mostrador de RMC Pharmacy, Plaza Gali" } },
  { src: "/locations/mercado-marina/02-counter-service.jpg", width: 1600, height: 1069, caption: "Mercado Marina", alt: { en: "A team member at the counter of RMC Pharmacy, Mercado Marina", es: "Un integrante del equipo en el mostrador de RMC Pharmacy, Mercado Marina" } },
  { src: "/locations/mercado-marina/03-team.jpg", width: 1600, height: 1069, caption: "Mercado Marina", alt: { en: "A team member behind the counter at RMC Pharmacy, Mercado Marina", es: "Un integrante del equipo detrás del mostrador en RMC Pharmacy, Mercado Marina" } },
  { src: "/locations/ocean/03-team-service.jpg", width: 1600, height: 1069, caption: "Ocean Pharmacy", alt: { en: "A team member serving at the Ocean Pharmacy counter", es: "Una integrante del equipo atendiendo en el mostrador de Ocean Pharmacy" } },
  { src: "/locations/ocean/06-counter-team.jpg", width: 1600, height: 1068, caption: "Ocean Pharmacy", alt: { en: "A team member at the Ocean Pharmacy counter", es: "Una integrante del equipo en el mostrador de Ocean Pharmacy" } },
];
