import type { Lang } from "./site";

type L = Record<Lang, string>;

/**
 * Over-the-counter categories with their own indexable page under /pharmacy/<slug>.
 * House rules: generic categories only, never a product, brand or medicine name; no medical claims;
 * serious symptoms go to a doctor or 911. Availability is always confirmed on WhatsApp.
 */
export type Category = {
  slug: string;
  icon: "sun" | "drop" | "bandage" | "sparkle" | "heart" | "suitcase" | "wave" | "leaf" | "thermo" | "cloud";
  /** Shown on the home page tiles (first six). */
  featured: boolean;
  name: L;
  title: L;
  description: L;
  /** Short tile text. */
  blurb: L;
  /** Paragraphs separated by a blank line. */
  intro: L;
  /** What travelers usually look for in this category (generic items only). */
  items: { en: string[]; es: string[] };
  tips: { en: string[]; es: string[] };
  faq: { q: L; a: L }[];
  /** Prefilled WhatsApp message. */
  ask: L;
  /** Related pages. */
  related: string[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "sun-care",
    icon: "sun",
    featured: true,
    name: { en: "Sun care", es: "Protección solar" },
    title: { en: "Sunscreen and After-Sun in Cabo San Lucas | RMC Pharmacy", es: "Protector solar y after-sun en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Sunscreen, after-sun, lip balm and kids' sun care at RMC Pharmacy on the Cabo marina, or delivered to your hotel in 15 to 70 minutes.",
      es: "Protector solar, after-sun, bálsamo labial y protección para niños en RMC Pharmacy en la marina de Cabo, o entregado en tu hotel en 15 a 70 minutos.",
    },
    blurb: { en: "Sunscreen, after-sun and lip care for a day on the water.", es: "Protector solar, after-sun y cuidado de labios para un día en el agua." },
    intro: {
      en: "The Cabo sun is stronger than it feels, especially on the water and between 11 am and 4 pm. Most sunburns we see at the counter happen on day one, before anyone has adjusted.\n\nWe stock the sun care travelers actually ask for: broad-spectrum sunscreen in several strengths, water-resistant options for boat days and snorkeling, sticks and sprays for kids, after-sun gels and lip balm with SPF. If you forgot yours or the hotel shop price surprised you, message us and we will confirm what is on the shelf before you walk over or order delivery.",
      es: "El sol de Cabo pega más de lo que se siente, sobre todo en el agua y entre las 11 am y las 4 pm. La mayoría de las quemaduras que vemos en mostrador pasan el primer día, antes de que nadie se adapte.\n\nTenemos la protección solar que los viajeros realmente piden: protector de amplio espectro en varias intensidades, opciones resistentes al agua para días de lancha y snorkel, barras y sprays para niños, geles after-sun y bálsamo labial con FPS. Si olvidaste el tuyo o el precio de la tienda del hotel te sorprendió, escríbenos y confirmamos qué hay en el anaquel antes de que vengas o pidas entrega.",
    },
    items: {
      en: ["Broad-spectrum sunscreen, lotion and spray", "Water-resistant and sport formulas", "Kids' and sensitive-skin sunscreen", "After-sun gel and cooling lotion", "Lip balm with SPF", "Hats and basic rash guards when in stock"],
      es: ["Protector solar de amplio espectro, en loción y spray", "Fórmulas resistentes al agua y deportivas", "Protector para niños y piel sensible", "Gel after-sun y loción refrescante", "Bálsamo labial con FPS", "Gorras y playeras con protección cuando hay en existencia"],
    },
    tips: {
      en: ["Apply 15 minutes before the boat leaves and again after every swim.", "Reapply more often than the bottle says: sweat and towels take it off.", "If a burn blisters or you feel dizzy or feverish, see a doctor."],
      es: ["Aplícalo 15 minutos antes de que salga la lancha y después de cada nadada.", "Reaplica más seguido de lo que dice el frasco: el sudor y la toalla se lo llevan.", "Si una quemadura hace ampollas o sientes mareo o fiebre, acude a un médico."],
    },
    faq: [
      { q: { en: "Do you deliver sunscreen to hotels and villas?", es: "¿Entregan protector solar en hoteles y villas?" }, a: { en: "Yes. Delivery runs daily 9 am to 6 pm to Cabo San Lucas, the Tourist Corridor and San José del Cabo, usually in 15 to 70 minutes depending on the zone.", es: "Sí. Entregamos todos los días de 9 am a 6 pm en Cabo San Lucas, el Corredor Turístico y San José del Cabo, normalmente en 15 a 70 minutos según la zona." } },
      { q: { en: "Do you have reef-safe options?", es: "¿Tienen opciones reef-safe?" }, a: { en: "Usually, yes. Stock changes with the season, so ask on WhatsApp and we will tell you what is available today.", es: "Normalmente sí. El inventario cambia con la temporada; pregunta por WhatsApp y te decimos qué hay disponible hoy." } },
      { q: { en: "Can I pay in US dollars or by card?", es: "¿Puedo pagar en dólares o con tarjeta?" }, a: { en: "Yes, both. For delivery we send a secure card link before the courier leaves.", es: "Sí, ambos. Para entregas enviamos un enlace seguro de pago con tarjeta antes de que salga el repartidor." } },
    ],
    ask: { en: "Hi! Do you have sun care in stock?", es: "¡Hola! ¿Tienen productos de protección solar?" },
    related: ["/delivery/medano", "/delivery/marina-centro", "/pharmacy/hydration"],
  },
  {
    slug: "hydration",
    icon: "drop",
    featured: true,
    name: { en: "Hydration", es: "Hidratación" },
    title: { en: "Electrolytes and Hydration in Cabo San Lucas | RMC Pharmacy", es: "Electrolitos e hidratación en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Electrolyte drinks, oral rehydration sachets and water at RMC Pharmacy on the Cabo marina, with hotel delivery in 15 to 70 minutes.",
      es: "Bebidas con electrolitos, sobres de rehidratación oral y agua en RMC Pharmacy en la marina de Cabo, con entrega a hoteles en 15 a 70 minutos.",
    },
    blurb: { en: "Water and electrolyte drinks for hot days.", es: "Agua y bebidas con electrolitos para los días de calor." },
    intro: {
      en: "Heat, sun, salt water and a few cocktails add up fast in Cabo. A headache on the second morning is usually dehydration before it is anything else.\n\nWe keep electrolyte drinks, oral rehydration sachets you mix into water, coconut water and plain bottled water, in single servings and packs. Hotel delivery is the most common order we get in summer: a few bottles to the room so nobody has to leave the pool.",
      es: "Calor, sol, agua salada y unos cuantos cócteles suman rápido en Cabo. El dolor de cabeza de la segunda mañana casi siempre es deshidratación antes que otra cosa.\n\nTenemos bebidas con electrolitos, sobres de rehidratación oral para mezclar con agua, agua de coco y agua embotellada, en porciones individuales y paquetes. La entrega a hotel es el pedido más común en verano: unas botellas al cuarto para que nadie tenga que salir de la alberca.",
    },
    items: {
      en: ["Electrolyte drinks and powders", "Oral rehydration sachets", "Coconut water", "Bottled water, still and sparkling", "Cooling towels and misting sprays when in stock"],
      es: ["Bebidas y polvos con electrolitos", "Sobres de rehidratación oral", "Agua de coco", "Agua embotellada, natural y mineral", "Toallas refrescantes y sprays cuando hay en existencia"],
    },
    tips: {
      en: ["Alternate every drink with a glass of water, especially on boat days.", "Kids and older travelers dehydrate faster; pack a sachet for the beach bag.", "If someone cannot keep fluids down, is confused or stops sweating, get medical help."],
      es: ["Alterna cada bebida con un vaso de agua, sobre todo en días de lancha.", "Niños y adultos mayores se deshidratan más rápido; lleva un sobre en la bolsa de playa.", "Si alguien no retiene líquidos, está confundido o deja de sudar, busca atención médica."],
    },
    faq: [
      { q: { en: "How fast can you deliver water and electrolytes to my hotel?", es: "¿Qué tan rápido entregan agua y electrolitos en mi hotel?" }, a: { en: "Marina and Médano hotels in about 15 to 25 minutes; the Corridor and San José in up to 70 minutes. We confirm the time on WhatsApp when you order.", es: "En la marina y Médano en unos 15 a 25 minutos; el Corredor y San José hasta 70 minutos. Confirmamos el tiempo por WhatsApp al pedir." } },
      { q: { en: "Do you sell by the case?", es: "¿Venden por caja?" }, a: { en: "Yes, for water and most electrolyte drinks. Ask for a case price for villas and groups.", es: "Sí, para agua y la mayoría de las bebidas con electrolitos. Pregunta por precio de caja para villas y grupos." } },
    ],
    ask: { en: "Hi! Do you have electrolyte drinks in stock?", es: "¡Hola! ¿Tienen bebidas con electrolitos?" },
    related: ["/services/iv-therapy", "/pharmacy/stomach-and-digestion", "/delivery"],
  },
  {
    slug: "first-aid",
    icon: "bandage",
    featured: true,
    name: { en: "First aid", es: "Primeros auxilios" },
    title: { en: "First Aid Supplies in Cabo San Lucas | RMC Pharmacy", es: "Primeros auxilios en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Bandages, gauze, antiseptic, blister care and insect-bite relief at RMC Pharmacy on the Cabo marina, delivered to hotels and villas.",
      es: "Vendas, gasas, antiséptico, parches para ampollas y alivio para picaduras en RMC Pharmacy en la marina de Cabo, con entrega a hoteles y villas.",
    },
    blurb: { en: "Bandages, gauze and antiseptic wipes for small scrapes.", es: "Vendas, gasas y toallitas antisépticas para raspones." },
    intro: {
      en: "Scraped knees on the rocks at Lover's Beach, blisters from new sandals, a jellyfish brush, a cut from a shell: small things that can spoil a day if you have nothing in the bag.\n\nWe carry the basics for cleaning and covering a wound, blister pads, elastic bandages for a twisted ankle, antiseptic wipes and sprays, tweezers, instant cold packs and bite-relief products. Our team can tell you what you need for a small injury and when it is better to see the doctor at our walk-in clinic instead.",
      es: "Raspones en las rocas de Playa del Amor, ampollas por sandalias nuevas, un roce de medusa, una cortada con una concha: cosas pequeñas que arruinan un día si no traes nada en la bolsa.\n\nTenemos lo básico para limpiar y cubrir una herida, parches para ampollas, vendas elásticas para un tobillo torcido, toallitas y sprays antisépticos, pinzas, compresas frías instantáneas y productos para picaduras. Nuestro equipo te orienta sobre qué necesitas para una lesión menor y cuándo es mejor ver al médico de la clínica.",
    },
    items: {
      en: ["Adhesive bandages in all sizes, waterproof too", "Sterile gauze, tape and elastic bandages", "Antiseptic wipes and sprays", "Blister pads", "Instant cold packs", "Insect-bite and sting relief", "Tweezers, scissors and small kits"],
      es: ["Curitas de todos los tamaños, también impermeables", "Gasas estériles, cinta y vendas elásticas", "Toallitas y sprays antisépticos", "Parches para ampollas", "Compresas frías instantáneas", "Alivio para picaduras", "Pinzas, tijeras y botiquines pequeños"],
    },
    tips: {
      en: ["Rinse a scrape with clean water first; salt water is not enough.", "Keep a blister pad and two waterproof bandages in every beach bag.", "Deep cuts, animal bites, or anything that will not stop bleeding need a doctor, not a bandage."],
      es: ["Enjuaga el raspón primero con agua limpia; el agua de mar no basta.", "Lleva un parche para ampollas y dos curitas impermeables en cada bolsa de playa.", "Cortadas profundas, mordidas de animales o sangrado que no para necesitan médico, no curita."],
    },
    faq: [
      { q: { en: "Do you have a doctor if the injury is more than a scrape?", es: "¿Tienen médico si la lesión es más que un raspón?" }, a: { en: "Yes. Our doctor sees walk-ins for minor injuries, and for anything serious we will point you to the nearest emergency room right away.", es: "Sí. Nuestro médico atiende sin cita lesiones menores, y para algo serio te indicamos de inmediato la sala de urgencias más cercana." } },
      { q: { en: "Can you deliver a first-aid kit to a boat or marina slip?", es: "¿Pueden entregar un botiquín en una lancha o muelle?" }, a: { en: "Yes, we deliver to the marina docks and to charter offices. Message us with the dock or boat name.", es: "Sí, entregamos en los muelles de la marina y en oficinas de charters. Escríbenos con el nombre del muelle o la embarcación." } },
    ],
    ask: { en: "Hi! I need first aid supplies.", es: "¡Hola! Necesito artículos de primeros auxilios." },
    related: ["/services/doctor-consultation", "/delivery/marina-centro", "/blog/cabo-travel-first-aid-kit"],
  },
  {
    slug: "stomach-and-digestion",
    icon: "wave",
    featured: false,
    name: { en: "Stomach and digestion", es: "Estómago y digestión" },
    title: { en: "Upset Stomach Relief in Cabo San Lucas | RMC Pharmacy", es: "Malestar estomacal en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Over-the-counter help for traveler's stomach, heartburn, nausea and rehydration at RMC Pharmacy on the Cabo marina, with discreet hotel delivery.",
      es: "Opciones de venta libre para malestar estomacal del viajero, acidez, náusea y rehidratación en RMC Pharmacy en la marina de Cabo, con entrega discreta a hoteles.",
    },
    blurb: { en: "Over-the-counter options for traveler's stomach, heartburn and nausea.", es: "Opciones de venta libre para estómago del viajero, acidez y náusea." },
    intro: {
      en: "New food, more sun, more drinks and a different water supply: a rough stomach is the most common reason travelers message us. It is also the one people least want to walk into a shop and explain, which is why most of these orders go out as quiet hotel deliveries.\n\nWe stock over-the-counter options for diarrhea, nausea, heartburn, gas and motion sickness, along with the oral rehydration sachets that matter most. The pharmacist will ask a couple of questions on WhatsApp to point you to the right category, and will tell you plainly when the symptoms call for a doctor instead.",
      es: "Comida nueva, más sol, más tragos y otra agua: el estómago revuelto es la razón más común por la que nos escriben los viajeros. También es la que menos gente quiere ir a explicar a un mostrador, por eso la mayoría de estos pedidos salen como entregas discretas a hotel.\n\nTenemos opciones de venta libre para diarrea, náusea, acidez, gases y mareo por movimiento, junto con los sobres de rehidratación oral que son lo más importante. El farmacéutico te hace un par de preguntas por WhatsApp para orientarte a la categoría correcta, y te dice con claridad cuándo los síntomas ameritan médico.",
    },
    items: {
      en: ["Oral rehydration sachets", "Over-the-counter options for diarrhea", "Antacids and heartburn relief", "Nausea and motion-sickness options", "Probiotics", "Bland snacks, crackers and electrolyte drinks"],
      es: ["Sobres de rehidratación oral", "Opciones de venta libre para diarrea", "Antiácidos y alivio para acidez", "Opciones para náusea y mareo", "Probióticos", "Galletas saladas, snacks ligeros y bebidas con electrolitos"],
    },
    tips: {
      en: ["Rehydration first: small sips often, not one big bottle.", "Take motion-sickness products before the boat leaves, not after you feel ill.", "Blood in stool, fever over 38.5 °C, or symptoms lasting more than two days: see a doctor."],
      es: ["Primero rehidratar: sorbos pequeños y frecuentes, no una botella de golpe.", "Lo de mareo se toma antes de que salga la lancha, no cuando ya te sientes mal.", "Sangre en heces, fiebre mayor a 38.5 °C o síntomas de más de dos días: ve al médico."],
    },
    faq: [
      { q: { en: "Is the delivery discreet?", es: "¿La entrega es discreta?" }, a: { en: "Yes. Orders arrive in a plain bag at the lobby or your door, and the courier only confirms your name.", es: "Sí. El pedido llega en una bolsa sin marcas al lobby o a tu puerta, y el repartidor solo confirma tu nombre." } },
      { q: { en: "Can a doctor see me if it does not improve?", es: "¿Puede verme un médico si no mejoro?" }, a: { en: "Yes. We offer in-person consultation at the clinic and video consultation from your room, and a doctor can prescribe if needed.", es: "Sí. Ofrecemos consulta presencial en la clínica y por video desde tu cuarto, y el médico puede recetar si hace falta." } },
      { q: { en: "Do you have options for kids?", es: "¿Tienen opciones para niños?" }, a: { en: "Yes, including pediatric rehydration. Tell us the child's age on WhatsApp and the pharmacist will guide you.", es: "Sí, incluida rehidratación pediátrica. Dinos la edad del niño por WhatsApp y el farmacéutico te orienta." } },
    ],
    ask: { en: "Hi! I need something for an upset stomach.", es: "¡Hola! Necesito algo para malestar estomacal." },
    related: ["/pharmacy/hydration", "/services/doctor-consultation", "/blog/upset-stomach-on-vacation-cabo"],
  },
  {
    slug: "pain-and-fever",
    icon: "thermo",
    featured: false,
    name: { en: "Pain and fever", es: "Dolor y fiebre" },
    title: { en: "Pain and Fever Relief in Cabo San Lucas | RMC Pharmacy", es: "Alivio para dolor y fiebre en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Over-the-counter pain and fever relief, thermometers and muscle rubs at RMC Pharmacy on the Cabo marina, delivered to your hotel or villa.",
      es: "Analgésicos de venta libre, termómetros y geles musculares en RMC Pharmacy en la marina de Cabo, con entrega a tu hotel o villa.",
    },
    blurb: { en: "Over-the-counter relief for headaches, sore muscles and fever.", es: "Alivio de venta libre para dolor de cabeza, músculos y fiebre." },
    intro: {
      en: "A headache after a day in the sun, a sore back from the fishing chair, a child with a fever at 10 pm: these are the orders we take most evenings.\n\nWe carry over-the-counter pain and fever relief for adults and children in tablets, liquids and chewables, plus thermometers, heat and cold patches, and muscle rubs. If you take other medication or have a condition, tell the pharmacist on WhatsApp so we can point you to a suitable category, and ask our doctor if you are not sure.",
      es: "Dolor de cabeza después de un día de sol, espalda adolorida por la silla de pesca, un niño con fiebre a las 10 de la noche: son los pedidos que más tomamos por las tardes.\n\nTenemos analgésicos y antifebriles de venta libre para adultos y niños en tabletas, líquidos y masticables, además de termómetros, parches de calor y frío y geles musculares. Si tomas otros medicamentos o tienes alguna condición, dilo al farmacéutico por WhatsApp para orientarte a una categoría adecuada, y consulta a nuestro médico si tienes duda.",
    },
    items: {
      en: ["Over-the-counter pain and fever relief for adults", "Children's liquid and chewable options", "Digital thermometers", "Heat and cold patches", "Muscle rubs and sprays", "Sleep masks and earplugs for a better night"],
      es: ["Analgésicos y antifebriles de venta libre para adultos", "Opciones líquidas y masticables para niños", "Termómetros digitales", "Parches de calor y frío", "Geles y sprays musculares", "Antifaces y tapones para dormir mejor"],
    },
    tips: {
      en: ["Follow the package dose; more is not faster.", "For children, dosing depends on weight: have it ready when you message us.", "A fever with a stiff neck, rash, confusion or trouble breathing is an emergency: call 911."],
      es: ["Sigue la dosis del empaque; más no es más rápido.", "En niños la dosis depende del peso: tenlo a la mano cuando nos escribas.", "Fiebre con cuello rígido, sarpullido, confusión o dificultad para respirar es emergencia: llama al 911."],
    },
    faq: [
      { q: { en: "Can you deliver at night?", es: "¿Entregan de noche?" }, a: { en: "Delivery runs 9 am to 6 pm. Outside those hours, message us anyway: we will tell you the nearest option that is open.", es: "La entrega es de 9 am a 6 pm. Fuera de ese horario escríbenos de todos modos: te decimos la opción abierta más cercana." } },
      { q: { en: "Do I need a prescription?", es: "¿Necesito receta?" }, a: { en: "Not for the over-the-counter categories on this page. If you need something stronger, our doctor can evaluate you in person or by video.", es: "No para las categorías de venta libre de esta página. Si necesitas algo más fuerte, nuestro médico puede valorarte en persona o por video." } },
    ],
    ask: { en: "Hi! I need something for pain or fever.", es: "¡Hola! Necesito algo para dolor o fiebre." },
    related: ["/services/doctor-consultation", "/pharmacy/cold-and-flu", "/services/iv-therapy"],
  },
  {
    slug: "cold-and-flu",
    icon: "cloud",
    featured: false,
    name: { en: "Cold and flu", es: "Gripa y resfriado" },
    title: { en: "Cold and Flu Relief in Cabo San Lucas | RMC Pharmacy", es: "Gripa y resfriado en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Over-the-counter cold and flu relief, throat lozenges, decongestants and tissues at RMC Pharmacy on the Cabo marina, delivered to your room.",
      es: "Opciones de venta libre para gripa y resfriado, pastillas para la garganta, descongestionantes y pañuelos en RMC Pharmacy en la marina de Cabo, con entrega a tu cuarto.",
    },
    blurb: { en: "Lozenges, decongestants and night-time relief when a cold hits on vacation.", es: "Pastillas, descongestionantes y alivio nocturno cuando la gripa llega de vacaciones." },
    intro: {
      en: "Air conditioning, a long flight and a packed itinerary are a reliable recipe for a cold on day three. You do not have to spend it hunting for a pharmacy.\n\nWe stock over-the-counter relief for congestion, cough, sore throat and night-time symptoms, saline sprays, lozenges, tissues, honey and tea. For a fever that will not break, trouble breathing or symptoms in a young child, our doctor can see you the same day in the clinic or by video.",
      es: "Aire acondicionado, un vuelo largo y un itinerario apretado son receta segura para un resfriado al tercer día. No tienes que pasarlo buscando farmacia.\n\nTenemos opciones de venta libre para congestión, tos, dolor de garganta y síntomas nocturnos, sprays salinos, pastillas, pañuelos, miel y té. Para una fiebre que no cede, dificultad para respirar o síntomas en un niño pequeño, nuestro médico puede verte el mismo día en la clínica o por video.",
    },
    items: {
      en: ["Day and night cold relief", "Cough and sore-throat lozenges and syrups", "Nasal decongestants and saline sprays", "Tissues, honey, herbal teas", "Hand sanitizer and masks", "Children's options"],
      es: ["Alivio para gripa de día y de noche", "Pastillas y jarabes para tos y garganta", "Descongestionantes nasales y sprays salinos", "Pañuelos, miel, tés de hierbas", "Gel antibacterial y cubrebocas", "Opciones para niños"],
    },
    tips: {
      en: ["Rest and fluids do more than any product; order the electrolytes too.", "Do not combine several multi-symptom products at once; ask the pharmacist.", "Shortness of breath or chest pain means a doctor now, not tomorrow."],
      es: ["Descanso y líquidos hacen más que cualquier producto; pide también los electrolitos.", "No combines varios productos multisíntoma a la vez; pregunta al farmacéutico.", "Falta de aire o dolor en el pecho es médico ahora, no mañana."],
    },
    faq: [
      { q: { en: "Can the doctor come to my hotel room?", es: "¿El médico puede ir a mi cuarto de hotel?" }, a: { en: "Yes, we offer house calls and video consultations, and our walk-in clinic is on the marina.", es: "Sí, ofrecemos visitas a domicilio y consultas por video, y nuestra clínica sin cita está en la marina." } },
      { q: { en: "Do you sell COVID or flu tests?", es: "¿Venden pruebas de COVID o influenza?" }, a: { en: "Usually yes; availability varies, so ask on WhatsApp.", es: "Normalmente sí; la disponibilidad varía, pregunta por WhatsApp." } },
    ],
    ask: { en: "Hi! I need cold and flu relief.", es: "¡Hola! Necesito algo para la gripa." },
    related: ["/services/doctor-consultation", "/pharmacy/pain-and-fever", "/services/home-nursing"],
  },
  {
    slug: "allergy-relief",
    icon: "leaf",
    featured: false,
    name: { en: "Allergy relief", es: "Alergias" },
    title: { en: "Allergy Relief in Cabo San Lucas | RMC Pharmacy", es: "Alivio para alergias en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Over-the-counter allergy relief, eye drops, anti-itch creams and bite care at RMC Pharmacy on the Cabo marina, delivered to hotels and villas.",
      es: "Opciones de venta libre para alergias, gotas para ojos, cremas para comezón y picaduras en RMC Pharmacy en la marina de Cabo, con entrega a hoteles y villas.",
    },
    blurb: { en: "Sneezing, itchy eyes, bites and rashes: over-the-counter relief.", es: "Estornudos, ojos irritados, picaduras y ronchas: alivio de venta libre." },
    intro: {
      en: "Different pollen, sea spray, hotel laundry, mosquitoes at dusk: Cabo finds new ways to make some travelers itch and sneeze.\n\nWe carry over-the-counter allergy relief in daytime and non-drowsy forms, antihistamine creams for bites and rashes, soothing eye drops, saline rinses and insect repellent. Tell the pharmacist what is reacting and we will suggest a category. Swelling of the face or lips, or any trouble breathing, is an emergency: call 911 first.",
      es: "Otro polen, brisa marina, lavandería de hotel, mosquitos al atardecer: Cabo encuentra formas nuevas de hacer estornudar a algunos viajeros.\n\nTenemos opciones de venta libre para alergias en presentaciones de día y sin sueño, cremas antihistamínicas para picaduras y ronchas, gotas calmantes para ojos, enjuagues salinos y repelente. Dile al farmacéutico qué está reaccionando y te sugerimos una categoría. Hinchazón de cara o labios, o cualquier dificultad para respirar, es emergencia: primero llama al 911.",
    },
    items: {
      en: ["Over-the-counter allergy relief, drowsy and non-drowsy", "Anti-itch and antihistamine creams", "Soothing and lubricating eye drops", "Saline nasal rinses", "Insect repellent and after-bite care", "Fragrance-free body wash and lotion"],
      es: ["Opciones de venta libre para alergias, con y sin sueño", "Cremas antihistamínicas y para comezón", "Gotas calmantes y lubricantes para ojos", "Enjuagues nasales salinos", "Repelente de insectos y cuidado post-picadura", "Jabón y loción sin fragancia"],
    },
    tips: {
      en: ["Repellent at sunset: that is when the mosquitoes come out near the estuary and golf courses.", "Rinse eyes with saline after the ocean before reaching for drops.", "Carry your own epinephrine if you have a known severe allergy; we cannot replace it."],
      es: ["Repelente al atardecer: a esa hora salen los mosquitos cerca del estero y los campos de golf.", "Enjuaga los ojos con solución salina después del mar antes de usar gotas.", "Si tienes una alergia severa conocida, trae tu propia epinefrina; no podemos sustituirla."],
    },
    faq: [
      { q: { en: "Do you have non-drowsy options?", es: "¿Tienen opciones sin sueño?" }, a: { en: "Yes, in adult and children's forms. Ask on WhatsApp and we confirm what is on the shelf.", es: "Sí, para adultos y niños. Pregunta por WhatsApp y confirmamos qué hay en anaquel." } },
      { q: { en: "What about a reaction that is getting worse?", es: "¿Y si una reacción está empeorando?" }, a: { en: "Call 911 for breathing trouble or swelling. For a spreading rash or hives without breathing trouble, our doctor can see you right away.", es: "Llama al 911 si hay dificultad para respirar o hinchazón. Para ronchas que se extienden sin problema respiratorio, nuestro médico puede verte de inmediato." } },
    ],
    ask: { en: "Hi! I need allergy relief.", es: "¡Hola! Necesito algo para alergias." },
    related: ["/pharmacy/first-aid", "/services/doctor-consultation", "/delivery/zona-hotelera-san-jose"],
  },
  {
    slug: "personal-care",
    icon: "sparkle",
    featured: true,
    name: { en: "Personal care", es: "Cuidado personal" },
    title: { en: "Toiletries and Personal Care in Cabo San Lucas | RMC Pharmacy", es: "Artículos de aseo y cuidado personal en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Toothbrushes, razors, deodorant, feminine care, contact-lens solution and travel sizes at RMC Pharmacy on the Cabo marina, delivered to your hotel.",
      es: "Cepillos de dientes, rastrillos, desodorante, cuidado femenino, solución para lentes de contacto y tamaños de viaje en RMC Pharmacy en la marina de Cabo, con entrega a tu hotel.",
    },
    blurb: { en: "Hygiene, skin and hair basics when you forgot something at home.", es: "Higiene, piel y cabello cuando olvidaste algo en casa." },
    intro: {
      en: "The airline lost the bag, the hotel does not stock it, or you simply forgot: a toothbrush at 9 pm should not be a project.\n\nWe keep the full shelf of everyday personal care in travel and regular sizes: oral care, shaving, deodorant, feminine hygiene, contact-lens solution and cases, skin and hair basics, nail care and more. Most of it can be at your hotel lobby within the hour.",
      es: "La aerolínea perdió la maleta, el hotel no lo tiene o simplemente se te olvidó: un cepillo de dientes a las 9 pm no debería ser un proyecto.\n\nTenemos el anaquel completo de cuidado personal diario en tamaño de viaje y normal: higiene bucal, afeitado, desodorante, higiene femenina, solución y estuches para lentes de contacto, básicos de piel y cabello, cuidado de uñas y más. Casi todo puede estar en el lobby de tu hotel en menos de una hora.",
    },
    items: {
      en: ["Toothbrushes, toothpaste, floss, mouthwash", "Razors and shaving gel", "Deodorant", "Feminine hygiene products", "Contact-lens solution and cases", "Shampoo, conditioner, body wash, lotion", "Nail clippers, cotton pads, hair ties"],
      es: ["Cepillos, pasta, hilo dental, enjuague bucal", "Rastrillos y gel de afeitar", "Desodorante", "Productos de higiene femenina", "Solución y estuches para lentes de contacto", "Shampoo, acondicionador, jabón corporal, loción", "Cortaúñas, algodón, ligas para el cabello"],
    },
    tips: {
      en: ["Ask for travel sizes if you are flying carry-on only.", "Cabo water is hard; a small bottle of conditioner saves your hair on a long trip.", "We can bundle a 'lost luggage kit' in one order: ask for it by name."],
      es: ["Pide tamaños de viaje si solo llevas equipaje de mano.", "El agua de Cabo es dura; un acondicionador pequeño salva el cabello en un viaje largo.", "Podemos armar un 'kit de maleta perdida' en un solo pedido: pídelo así."],
    },
    faq: [
      { q: { en: "Can you deliver to a cruise ship passenger at the marina?", es: "¿Entregan a pasajeros de crucero en la marina?" }, a: { en: "Yes, to the tender dock area. Our Plaza Gali and Embarcadero stores are a short walk from it.", es: "Sí, en la zona del muelle de tenders. Nuestras tiendas de Plaza Gali y Embarcadero están a unos pasos." } },
    ],
    ask: { en: "Hi! Do you have personal care items?", es: "¡Hola! ¿Tienen artículos de cuidado personal?" },
    related: ["/locations/plaza-gali", "/pharmacy/travel-basics", "/delivery/marina-centro"],
  },
  {
    slug: "baby-and-family",
    icon: "heart",
    featured: true,
    name: { en: "Baby and family", es: "Bebé y familia" },
    title: { en: "Baby and Kids' Essentials in Cabo San Lucas | RMC Pharmacy", es: "Esenciales para bebé y niños en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Diapers, wipes, formula, kids' sunscreen, pediatric rehydration and thermometers at RMC Pharmacy on the Cabo marina, delivered to hotels and villas.",
      es: "Pañales, toallitas, fórmula, protector solar infantil, rehidratación pediátrica y termómetros en RMC Pharmacy en la marina de Cabo, con entrega a hoteles y villas.",
    },
    blurb: { en: "Everyday items for babies and kids traveling with you.", es: "Artículos de todos los días para bebés y niños que viajan contigo." },
    intro: {
      en: "Traveling with small kids means running out of something every single day. We stock diapers and wipes in the usual sizes, formula and baby food, kids' sunscreen and swim diapers, pediatric rehydration, digital thermometers, and the small things like pacifiers and sippy cups that vanish on vacation.\n\nParents message us most at nap time and bedtime; delivery to the room is the standard order, and the pharmacist is happy to talk through what is suitable for a child's age.",
      es: "Viajar con niños pequeños significa que algo se acaba cada día. Tenemos pañales y toallitas en las tallas comunes, fórmula y papillas, protector solar infantil y pañales para alberca, rehidratación pediátrica, termómetros digitales y las cosas pequeñas como chupones y vasos entrenadores que desaparecen en vacaciones.\n\nLos papás nos escriben más a la hora de la siesta y de dormir; la entrega al cuarto es el pedido estándar, y el farmacéutico con gusto te orienta sobre lo adecuado para la edad del niño.",
    },
    items: {
      en: ["Diapers and swim diapers", "Wipes and diaper cream", "Formula and baby food", "Kids' and baby sunscreen", "Pediatric rehydration", "Digital thermometers", "Pacifiers, bottles, sippy cups", "Children's over-the-counter options"],
      es: ["Pañales y pañales para alberca", "Toallitas y crema para rozaduras", "Fórmula y papillas", "Protector solar para niños y bebés", "Rehidratación pediátrica", "Termómetros digitales", "Chupones, biberones, vasos entrenadores", "Opciones de venta libre para niños"],
    },
    tips: {
      en: ["Send us a photo of the formula or diaper you use; we will tell you the closest match in stock.", "Shade and water matter more than any product for babies under six months.", "A child who is lethargic, not drinking, or has a high fever needs a doctor the same day."],
      es: ["Mándanos foto de la fórmula o pañal que usas; te decimos la opción más parecida en existencia.", "Para bebés menores de seis meses, sombra y agua importan más que cualquier producto.", "Un niño decaído, que no bebe o con fiebre alta necesita médico el mismo día."],
    },
    faq: [
      { q: { en: "Can a doctor see my child?", es: "¿Puede un médico ver a mi hijo?" }, a: { en: "Yes, in the clinic, by video or at your hotel. Tell us the child's age and symptoms on WhatsApp and we will arrange the fastest option.", es: "Sí, en la clínica, por video o en tu hotel. Dinos la edad y los síntomas por WhatsApp y coordinamos la opción más rápida." } },
      { q: { en: "Do you carry specific formula brands?", es: "¿Manejan marcas específicas de fórmula?" }, a: { en: "Stock varies. Message us with what you use and we will confirm or suggest the closest equivalent.", es: "El inventario varía. Escríbenos con la que usas y confirmamos o sugerimos la equivalente más cercana." } },
    ],
    ask: { en: "Hi! I need baby and family items.", es: "¡Hola! Necesito artículos para bebé y familia." },
    related: ["/pharmacy/sun-care", "/services/doctor-consultation", "/blog/traveling-with-kids-pharmacy-checklist-cabo"],
  },
  {
    slug: "travel-basics",
    icon: "suitcase",
    featured: true,
    name: { en: "Travel basics", es: "Básicos de viaje" },
    title: { en: "Travel Essentials and Minimarket in Cabo San Lucas | RMC Pharmacy", es: "Básicos de viaje y minisúper en Cabo San Lucas | RMC Pharmacy" },
    description: {
      en: "Snacks, chargers, adapters, motion-sickness bands, earplugs and the small things you forgot, at RMC Pharmacy on the Cabo marina with hotel delivery.",
      es: "Snacks, cargadores, adaptadores, bandas para mareo, tapones y las cosas pequeñas que olvidaste, en RMC Pharmacy en la marina de Cabo con entrega a hotel.",
    },
    blurb: { en: "Snacks and the small things you suddenly need on a trip.", es: "Snacks y esas cosas pequeñas que de repente hacen falta en un viaje." },
    intro: {
      en: "Half pharmacy, half minimarket: that is what a marina store has to be. Phone chargers, plug adapters, earplugs and sleep masks, motion-sickness bands for the boat, reusable water bottles, snacks and drinks, sewing kits, laundry sachets, umbrellas and the occasional phone case.\n\nIf you are not sure we have it, send a photo on WhatsApp. If we do not, we will usually know who does.",
      es: "Mitad farmacia, mitad minisúper: eso tiene que ser una tienda de marina. Cargadores, adaptadores, tapones y antifaces, bandas para el mareo en lancha, botellas reutilizables, snacks y bebidas, kits de costura, detergente en sobre, paraguas y de vez en cuando una funda de celular.\n\nSi no estás seguro de que lo tengamos, manda una foto por WhatsApp. Si no lo tenemos, casi siempre sabemos quién sí.",
    },
    items: {
      en: ["Phone chargers, cables and plug adapters", "Snacks, drinks and ice", "Earplugs, sleep masks, neck pillows", "Motion-sickness bands", "Sewing kits, laundry sachets, stain wipes", "Umbrellas, hats, flip-flops when in stock"],
      es: ["Cargadores, cables y adaptadores", "Snacks, bebidas y hielo", "Tapones, antifaces, almohadas de cuello", "Bandas para mareo", "Kits de costura, detergente en sobre, toallitas quitamanchas", "Paraguas, gorras, sandalias cuando hay en existencia"],
    },
    tips: {
      en: ["Mexico uses the same plugs as the US and Canada; most travelers only need a USB-C cable.", "Boat day? Pick up a dry bag and a motion-sickness band the evening before.", "We can deliver a 'villa welcome kit' of water, snacks and basics before you check in."],
      es: ["México usa los mismos enchufes que EE. UU. y Canadá; la mayoría solo necesita un cable USB-C.", "¿Día de lancha? Pasa por una bolsa seca y una banda para mareo la tarde anterior.", "Podemos entregar un 'kit de bienvenida' de agua, snacks y básicos en tu villa antes del check-in."],
    },
    faq: [
      { q: { en: "Can I pre-order a welcome kit for my villa?", es: "¿Puedo pre-ordenar un kit de bienvenida para mi villa?" }, a: { en: "Yes. Message us with the arrival date, the villa or hotel and what you want; we coordinate the drop-off with the concierge.", es: "Sí. Escríbenos con la fecha de llegada, la villa u hotel y lo que quieres; coordinamos la entrega con el concierge." } },
    ],
    ask: { en: "Hi! Do you have travel basics?", es: "¡Hola! ¿Tienen básicos de viaje?" },
    related: ["/delivery/pedregal", "/delivery/palmilla", "/pharmacy/personal-care"],
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export const ES_CATEGORY_SLUGS: Record<string, string> = {
  "sun-care": "proteccion-solar",
  hydration: "hidratacion",
  "first-aid": "primeros-auxilios",
  "stomach-and-digestion": "estomago-y-digestion",
  "pain-and-fever": "dolor-y-fiebre",
  "cold-and-flu": "gripa-y-resfriado",
  "allergy-relief": "alergias",
  "personal-care": "cuidado-personal",
  "baby-and-family": "bebe-y-familia",
  "travel-basics": "basicos-de-viaje",
};
