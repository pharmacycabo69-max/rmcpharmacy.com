type L = { en: string; es: string };

export type ZoneArtKind = "marina" | "beach" | "hills" | "golf" | "sunset" | "surf" | "town";

export type ZonePhoto = { src: string; width: number; height: number; alt: L };

export type Zone = {
  slug: string;
  name: L;
  area: "cabo-san-lucas" | "corridor" | "san-jose";
  /** Illustration used on the zone card until a real photo of the area is added. */
  art: ZoneArtKind;
  /** Real photo of the area. When present it replaces the illustration. */
  photo?: ZonePhoto;
  etaMin: number;
  etaMax: number;
  /** Reference hotels and developments in the zone. Orientative list: the owner extends it. */
  hotels: string[];
  /** Words people use for the place besides the name, for the hotel finder. */
  aliases: string[];
  blurb: L;
  notes: L;
  /** What guests there usually ask for (everyday over-the-counter categories only). */
  categories: { en: string[]; es: string[] };
};

export const AREA_LABEL: Record<Zone["area"], L> = {
  "cabo-san-lucas": { en: "Cabo San Lucas", es: "Cabo San Lucas" },
  corridor: { en: "Tourist Corridor", es: "Corredor Turístico" },
  "san-jose": { en: "San José del Cabo", es: "San José del Cabo" },
};

/** Until the owner says otherwise, every zone is served from this store. */
export const ZONE_PRIMARY_STORE = "plaza-gali";

export const ZONES: Zone[] = [
  {
    slug: "marina-centro",
    name: { en: "Marina & Downtown Cabo", es: "Marina y Centro de Cabo" },
    area: "cabo-san-lucas",
    art: "marina",
    photo: { src: "/zones/marina-centro.jpg", width: 1600, height: 900, alt: { en: "Aerial view of the marina in Cabo San Lucas", es: "Vista aérea de la marina de Cabo San Lucas" } },
    etaMin: 15,
    etaMax: 25,
    hotels: ["Hotel Tesoro Los Cabos", "Marina Fiesta Resort & Spa", "Hotel Mar de Cortez", "Siesta Suites Cabo San Lucas"],
    aliases: ["marina", "downtown", "centro", "paseo de la marina"],
    blurb: {
      en: "The marina and downtown area is the heart of Cabo San Lucas: the harbor promenade, restaurants, shops and the streets around Paseo de la Marina. Many visitors stay in hotels, condos and short-term rentals within walking distance of the water.",
      es: "La marina y el centro son el corazón de Cabo San Lucas: el malecón del puerto, restaurantes, tiendas y las calles alrededor de Paseo de la Marina. Muchos visitantes se hospedan en hoteles, condominios y rentas cortas a poca distancia del agua.",
    },
    notes: {
      en: "Our stores are on Paseo de la Marina, so this is our closest zone and the one with the shortest estimated time. Guests here often ask for sun care, hydration, first aid and personal care after a day on the water or a night out.",
      es: "Nuestras tiendas están sobre Paseo de la Marina, así que esta es nuestra zona más cercana y la de menor tiempo estimado. Aquí suelen pedir protección solar, hidratación, primeros auxilios y cuidado personal después de un día en el agua o una noche de salida.",
    },
    categories: {
      en: ["Sun care and after-sun", "Hydration and electrolytes", "First aid", "Personal care"],
      es: ["Protección solar y after-sun", "Hidratación y electrolitos", "Primeros auxilios", "Cuidado personal"],
    },
  },
  {
    slug: "medano",
    name: { en: "Médano Beach", es: "Playa Médano" },
    area: "cabo-san-lucas",
    art: "beach",
    etaMin: 15,
    etaMax: 25,
    hotels: ["ME Cabo", "Pueblo Bonito Rosé", "Villa del Palmar Beach Resort & Spa", "Riu Palace Cabo San Lucas", "Riu Santa Fe", "Casa Dorada Los Cabos"],
    aliases: ["medano", "médano beach", "medano beach"],
    blurb: {
      en: "Médano Beach is the main swimming beach of Cabo San Lucas, lined with resorts, beach clubs and restaurants, with the famous arch a short boat ride away. It is one of the busiest places to stay in the city.",
      es: "Playa Médano es la principal playa para nadar de Cabo San Lucas, rodeada de resorts, beach clubs y restaurantes, con el famoso arco a un corto paseo en lancha. Es de los lugares más concurridos para hospedarse en la ciudad.",
    },
    notes: {
      en: "Resorts here are close to the marina, so delivery is quick. People on the beach usually ask for sunscreen, after-sun, water and electrolyte drinks, and basic first aid for a day in the sun.",
      es: "Los resorts de aquí están cerca de la marina, así que la entrega es rápida. En la playa suelen pedir protector solar, after-sun, agua y bebidas con electrolitos, y primeros auxilios básicos para un día de sol.",
    },
    categories: {
      en: ["Sunscreen and after-sun", "Water and electrolyte drinks", "Basic first aid", "Travel basics"],
      es: ["Protector solar y after-sun", "Agua y bebidas con electrolitos", "Primeros auxilios básicos", "Básicos de viaje"],
    },
  },
  {
    slug: "pedregal",
    name: { en: "Pedregal", es: "Pedregal" },
    area: "cabo-san-lucas",
    art: "hills",
    etaMin: 20,
    etaMax: 30,
    hotels: ["Waldorf Astoria Los Cabos Pedregal", "Private villas in Pedregal"],
    aliases: ["el pedregal", "waldorf"],
    blurb: {
      en: "Pedregal is a gated hillside community above the Pacific side of Cabo San Lucas, known for private villas and sea views. Most visitors here stay in villas or at the resort rather than in the downtown hotels.",
      es: "Pedregal es una comunidad residencial cerrada en la ladera sobre el lado del Pacífico de Cabo San Lucas, conocida por sus villas privadas y vistas al mar. La mayoría de los visitantes se hospeda en villas o en el resort, más que en los hoteles del centro.",
    },
    notes: {
      en: "Because many guests stay in villas, we ask for the villa name or number and the gate or guard-house details when you order. Typical requests include sun care, first aid, hydration and baby or personal care items.",
      es: "Como muchos huéspedes se hospedan en villas, al hacer el pedido te pedimos el nombre o número de la villa y los datos de la caseta. Lo que más piden: protección solar, primeros auxilios, hidratación y artículos de bebé o cuidado personal.",
    },
    categories: {
      en: ["Sun care", "First aid", "Hydration", "Baby and personal care"],
      es: ["Protección solar", "Primeros auxilios", "Hidratación", "Bebé y cuidado personal"],
    },
  },
  {
    slug: "pacifico-sunset",
    name: { en: "Pacific Side & Sunset", es: "Lado Pacífico y Sunset" },
    area: "cabo-san-lucas",
    art: "sunset",
    etaMin: 20,
    etaMax: 35,
    hotels: ["Pueblo Bonito Pacifica Golf & Spa Resort", "Pueblo Bonito Sunset Beach Golf & Spa Resort", "Playa Grande Resort", "Solmar Resort"],
    aliases: ["pacific side", "sunset", "sunset point", "pacifico", "pacífico"],
    blurb: {
      en: "The Pacific side of Cabo San Lucas, toward Sunset Point and Land's End, is a quieter stretch with resorts, golf and ocean views instead of the harbor bustle. The beaches here face open water.",
      es: "El lado del Pacífico de Cabo San Lucas, hacia Sunset Point y el Fin de la Tierra, es una zona más tranquila con resorts, golf y vistas al mar en lugar del ajetreo del puerto. Las playas de aquí dan al mar abierto.",
    },
    notes: {
      en: "Guests here usually travel by car, so ordering on WhatsApp saves a trip. Common requests are sun care, hydration, first aid and personal care, and we bring them to the hotel lobby.",
      es: "Los huéspedes de aquí suelen moverse en auto, así que pedir por WhatsApp les ahorra un viaje. Lo más común es protección solar, hidratación, primeros auxilios y cuidado personal, y lo llevamos al lobby del hotel.",
    },
    categories: {
      en: ["Sun care", "Hydration and electrolytes", "First aid", "Personal care"],
      es: ["Protección solar", "Hidratación y electrolitos", "Primeros auxilios", "Cuidado personal"],
    },
  },
  {
    slug: "diamante-quivira",
    name: { en: "Diamante & Quivira", es: "Diamante y Quivira" },
    area: "cabo-san-lucas",
    art: "golf",
    etaMin: 25,
    etaMax: 40,
    hotels: ["Diamante Cabo San Lucas", "Quivira Los Cabos"],
    aliases: ["diamante", "quivira", "the dunes"],
    blurb: {
      en: "Diamante and Quivira are golf and residential communities along the Pacific coast north of Cabo San Lucas, with private villas, beach clubs and championship courses. They are among the more exclusive places to stay in the area.",
      es: "Diamante y Quivira son comunidades de golf y residenciales sobre la costa del Pacífico, al norte de Cabo San Lucas, con villas privadas, beach clubs y campos de campeonato. Están entre los lugares más exclusivos para hospedarse en la zona.",
    },
    notes: {
      en: "These communities are farther from town, so our estimated times are longer. Villa guests here often place larger orders for the whole group, such as sun care, hydration and first aid essentials.",
      es: "Estas comunidades están más lejos del centro, así que nuestros tiempos estimados son mayores. Los huéspedes de villas suelen hacer pedidos más grandes para todo el grupo, como protección solar, hidratación y primeros auxilios.",
    },
    categories: {
      en: ["Sun care for groups", "Hydration", "First aid essentials", "Personal care"],
      es: ["Protección solar para grupos", "Hidratación", "Primeros auxilios", "Cuidado personal"],
    },
  },
  {
    slug: "cabo-bello-misiones",
    name: { en: "Cabo Bello & Misiones", es: "Cabo Bello y Misiones" },
    area: "corridor",
    art: "hills",
    etaMin: 20,
    etaMax: 35,
    hotels: ["Cabo Bello", "Misiones del Cabo", "Esperanza, an Auberge Resort"],
    aliases: ["cabo bello", "misiones del cabo", "punta ballena", "esperanza"],
    blurb: {
      en: "Cabo Bello and Misiones del Cabo sit at the start of the Tourist Corridor, the coastal highway that links Cabo San Lucas with San José del Cabo, with villas and hillside residences facing the Sea of Cortez.",
      es: "Cabo Bello y Misiones del Cabo están al inicio del Corredor Turístico, la carretera costera que une Cabo San Lucas con San José del Cabo, con villas y residencias en la ladera frente al Mar de Cortés.",
    },
    notes: {
      en: "Visitors staying here are close to the Cabo San Lucas end of the corridor, so delivery is relatively quick. Common requests: sunscreen, after-sun, hydration, first aid and personal care.",
      es: "Quienes se hospedan aquí están cerca del extremo de Cabo San Lucas del corredor, así que la entrega es relativamente rápida. Lo más pedido: protector solar, after-sun, hidratación, primeros auxilios y cuidado personal.",
    },
    categories: {
      en: ["Sunscreen and after-sun", "Hydration", "First aid", "Personal care"],
      es: ["Protector solar y after-sun", "Hidratación", "Primeros auxilios", "Cuidado personal"],
    },
  },
  {
    slug: "corredor-chileno",
    name: { en: "Chileno Bay", es: "Bahía Chileno" },
    area: "corridor",
    art: "beach",
    etaMin: 30,
    etaMax: 45,
    hotels: ["Viceroy Los Cabos", "Chileno Bay Resort & Residences"],
    aliases: ["chileno", "chileno bay", "bahía chileno"],
    blurb: {
      en: "Chileno Bay is one of the calm swimming and snorkeling coves on the Tourist Corridor, surrounded by luxury resorts and residences. It is a favorite for beach days away from the city.",
      es: "Bahía Chileno es una de las bahías tranquilas para nadar y hacer snorkel en el Corredor Turístico, rodeada de resorts y residencias de lujo. Es una favorita para pasar el día de playa lejos de la ciudad.",
    },
    notes: {
      en: "Because it is farther along the corridor, we give a longer estimated time. Guests here commonly ask for sun care, hydration, first aid and basics for the beach day.",
      es: "Como está más adelante en el corredor, damos un tiempo estimado mayor. Aquí suelen pedir protección solar, hidratación, primeros auxilios y básicos para el día de playa.",
    },
    categories: {
      en: ["Sun care", "Hydration", "First aid", "Beach-day basics"],
      es: ["Protección solar", "Hidratación", "Primeros auxilios", "Básicos para la playa"],
    },
  },
  {
    slug: "cabo-del-sol",
    name: { en: "Cabo del Sol", es: "Cabo del Sol" },
    area: "corridor",
    art: "golf",
    etaMin: 30,
    etaMax: 45,
    hotels: ["Cabo del Sol"],
    aliases: ["cabo del sol"],
    blurb: {
      en: "Cabo del Sol is a resort and golf community on the Tourist Corridor, with oceanfront residences and beaches facing the Sea of Cortez. Many guests here stay in private homes for a week or longer.",
      es: "Cabo del Sol es una comunidad de resorts y golf en el Corredor Turístico, con residencias frente al mar y playas que dan al Mar de Cortés. Muchos huéspedes se hospedan en casas privadas por una semana o más.",
    },
    notes: {
      en: "Delivery from our marina stores takes a bit longer here. People staying in villas often order sun care, hydration, first aid and personal care for the whole group.",
      es: "La entrega desde nuestras tiendas de la marina tarda un poco más aquí. Quienes se hospedan en villas suelen pedir protección solar, hidratación, primeros auxilios y cuidado personal para todo el grupo.",
    },
    categories: {
      en: ["Sun care", "Hydration", "First aid", "Personal care for groups"],
      es: ["Protección solar", "Hidratación", "Primeros auxilios", "Cuidado personal para grupos"],
    },
  },
  {
    slug: "palmilla",
    name: { en: "Palmilla", es: "Palmilla" },
    area: "san-jose",
    art: "beach",
    etaMin: 40,
    etaMax: 55,
    hotels: ["One&Only Palmilla", "Las Ventanas al Paraíso"],
    aliases: ["one and only", "one&only", "las ventanas"],
    blurb: {
      en: "Palmilla is one of the best-known areas of the corridor, with a sheltered beach, a marina and some of the region's most established resorts. It sits roughly between Cabo San Lucas and San José del Cabo.",
      es: "Palmilla es una de las zonas más conocidas del corredor, con una playa protegida, una marina y algunos de los resorts más establecidos de la región. Queda más o menos a medio camino entre Cabo San Lucas y San José del Cabo.",
    },
    notes: {
      en: "Because it is about halfway between the two cities, delivery takes longer than in town. Guests often ask for sun care, hydration, first aid and personal care.",
      es: "Como está a medio camino entre las dos ciudades, la entrega tarda más que en el centro. Los huéspedes suelen pedir protección solar, hidratación, primeros auxilios y cuidado personal.",
    },
    categories: {
      en: ["Sun care", "Hydration", "First aid", "Personal care"],
      es: ["Protección solar", "Hidratación", "Primeros auxilios", "Cuidado personal"],
    },
  },
  {
    slug: "costa-azul",
    name: { en: "Costa Azul", es: "Costa Azul" },
    area: "san-jose",
    art: "surf",
    etaMin: 45,
    etaMax: 60,
    hotels: ["The Cape, a Thompson Hotel", "Cabo Surf Hotel"],
    aliases: ["zippers", "the cape", "acapulquito"],
    blurb: {
      en: "Costa Azul is the surf area just west of San José del Cabo, known for its beach breaks and relaxed hotels and rentals. It has a more laid-back feel than the resort strips.",
      es: "Costa Azul es la zona de surf justo al oeste de San José del Cabo, conocida por sus olas y por sus hoteles y rentas relajados. Tiene un ambiente más tranquilo que las zonas de resorts.",
    },
    notes: {
      en: "Surfers and beachgoers here usually ask for sun care, after-sun, hydration, first aid and personal care. Estimated times are longer because of the distance from our stores.",
      es: "Quienes surfean o van a la playa aquí suelen pedir protección solar, after-sun, hidratación, primeros auxilios y cuidado personal. Los tiempos estimados son mayores por la distancia desde nuestras tiendas.",
    },
    categories: {
      en: ["Sun care and after-sun", "Hydration", "First aid", "Personal care"],
      es: ["Protección solar y after-sun", "Hidratación", "Primeros auxilios", "Cuidado personal"],
    },
  },
  {
    slug: "zona-hotelera-san-jose",
    name: { en: "San José del Cabo Hotel Zone", es: "Zona Hotelera de San José del Cabo" },
    area: "san-jose",
    art: "beach",
    etaMin: 50,
    etaMax: 65,
    hotels: ["Holiday Inn Resort Los Cabos", "Barceló Grand Faro Los Cabos", "Posada Real Los Cabos"],
    aliases: ["hotel zone", "san jose hotel zone", "zona hotelera"],
    blurb: {
      en: "The San José del Cabo hotel zone is a beachfront strip of resorts west of downtown, with wide beaches and a quieter pace than Cabo San Lucas. Many visitors stay all-inclusive and rarely leave the resort.",
      es: "La zona hotelera de San José del Cabo es una franja de resorts frente a la playa al oeste del centro, con playas amplias y un ritmo más tranquilo que Cabo San Lucas. Muchos visitantes se hospedan todo incluido y casi no salen del resort.",
    },
    notes: {
      en: "Delivery to this area takes longer because of the distance, so we give a wider estimated range. Guests commonly ask for sun care, hydration, first aid and personal care.",
      es: "La entrega a esta zona tarda más por la distancia, así que damos un rango estimado más amplio. Los huéspedes suelen pedir protección solar, hidratación, primeros auxilios y cuidado personal.",
    },
    categories: {
      en: ["Sun care", "Hydration and electrolytes", "First aid", "Personal care"],
      es: ["Protección solar", "Hidratación y electrolitos", "Primeros auxilios", "Cuidado personal"],
    },
  },
  {
    slug: "centro-san-jose",
    name: { en: "Downtown San José del Cabo", es: "Centro de San José del Cabo" },
    area: "san-jose",
    art: "town",
    etaMin: 50,
    etaMax: 65,
    hotels: ["Casa Natalia", "Tropicana Inn", "Posada Terranova"],
    aliases: ["san jose downtown", "centro historico", "plaza mijares"],
    blurb: {
      en: "Downtown San José del Cabo is the historic center, with its plaza, galleries, restaurants and boutique hotels in colonial-style buildings. It is a walkable area popular with visitors who like a slower pace.",
      es: "El centro de San José del Cabo es la zona histórica, con su plaza, galerías, restaurantes y hoteles boutique en edificios de estilo colonial. Es una zona caminable, popular entre quienes prefieren un ritmo más tranquilo.",
    },
    notes: {
      en: "Visitors staying in the center often want items brought to the hotel lobby, and that is how we deliver. Common requests: sun care, hydration, first aid and personal care.",
      es: "Quienes se hospedan en el centro suelen preferir que se lo lleven al lobby del hotel, y así entregamos. Lo más pedido: protección solar, hidratación, primeros auxilios y cuidado personal.",
    },
    categories: {
      en: ["Sun care", "Hydration", "First aid", "Personal care"],
      es: ["Protección solar", "Hidratación", "Primeros auxilios", "Cuidado personal"],
    },
  },
  {
    slug: "puerto-los-cabos",
    name: { en: "Puerto Los Cabos", es: "Puerto Los Cabos" },
    area: "san-jose",
    art: "marina",
    etaMin: 55,
    etaMax: 70,
    hotels: ["Secrets Puerto Los Cabos", "JW Marriott Los Cabos", "El Ganzo"],
    aliases: ["secrets", "jw marriott", "el ganzo", "marina puerto los cabos"],
    blurb: {
      en: "Puerto Los Cabos is a marina and golf community on the east side of San José del Cabo, with resorts, a harbor and residential neighborhoods. It is the far end of our delivery area.",
      es: "Puerto Los Cabos es una comunidad de marina y golf en el lado este de San José del Cabo, con resorts, un puerto y zonas residenciales. Es el extremo de nuestra zona de entrega.",
    },
    notes: {
      en: "This is our farthest zone, with the longest estimated time of up to 70 minutes. Guests here commonly ask for sun care, hydration, first aid and personal care.",
      es: "Esta es nuestra zona más lejana, con el mayor tiempo estimado de hasta 70 minutos. Aquí suelen pedir protección solar, hidratación, primeros auxilios y cuidado personal.",
    },
    categories: {
      en: ["Sun care", "Hydration", "First aid", "Personal care"],
      es: ["Protección solar", "Hidratación", "Primeros auxilios", "Cuidado personal"],
    },
  },
];

export function getZone(slug: string) {
  return ZONES.find((z) => z.slug === slug);
}
