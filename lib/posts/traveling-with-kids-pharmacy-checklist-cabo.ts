import type { Post } from "./types";

export const post: Post = {
  slug: "traveling-with-kids-pharmacy-checklist-cabo",
  date: "2027-01-13",
  title: {
    en: "Traveling to Cabo with Kids: A Pharmacy Checklist",
    es: "Viajar a Cabo con niños: lista de farmacia",
  },
  description: {
    en: "A practical checklist for a family trip to Cabo San Lucas: sun protection, hydration, first aid and where to get what you forgot.",
    es: "Una lista práctica para un viaje en familia a Cabo San Lucas: protección solar, hidratación, primeros auxilios y dónde conseguir lo que olvidaste.",
  },
  body: {
    en: [
      { p: "Travel with kids means more bags, more snacks and more things that can be forgotten. This list covers the pharmacy basics so you can enjoy the trip." },
      { h: "Sun and heat" },
      { ul: [
        "Sunscreen made for children, and a lot of it",
        "Hats, sunglasses and rash guards or light long sleeves",
        "Shade breaks and plenty of water through the day",
      ] },
      { h: "First aid" },
      { ul: [
        "Bandages in several sizes and antiseptic wipes",
        "A thermometer",
        "Gauze and medical tape",
      ] },
      { h: "Everyday care" },
      { ul: [
        "Items for babies and little ones, such as wipes and diaper-area care",
        "Hand sanitizer and wet wipes",
        "Insect repellent",
      ] },
      { h: "Bring what your family already uses" },
      { p: "Pack any treatment your child takes regularly in its original container and bring more than you think you need. Before you travel, talk to your own pediatrician about your trip." },
      { h: "If someone gets sick on vacation" },
      { p: "You do not have to leave the hotel: we can set up a doctor consultation by video for $59 USD, in English or Spanish. For severe symptoms such as trouble breathing, high fever that does not go down or fainting, call 911 or go to the nearest emergency room." },
      { p: "Forgot something? We have {stores} in Cabo San Lucas and we can deliver to your hotel lobby." },
    ],
    es: [
      { p: "Viajar con niños significa más maletas, más snacks y más cosas que se pueden olvidar. Esta lista cubre lo básico de farmacia para que disfrutes el viaje." },
      { h: "Sol y calor" },
      { ul: [
        "Protector solar hecho para niños, y bastante",
        "Sombreros, lentes de sol y licras o mangas largas ligeras",
        "Pausas en la sombra y mucha agua durante el día",
      ] },
      { h: "Primeros auxilios" },
      { ul: [
        "Vendas de varios tamaños y toallitas antisépticas",
        "Un termómetro",
        "Gasas y cinta médica",
      ] },
      { h: "Cuidado de todos los días" },
      { ul: [
        "Artículos para bebés y pequeños, como toallitas y cuidado de la zona del pañal",
        "Gel antibacterial y toallitas húmedas",
        "Repelente de insectos",
      ] },
      { h: "Lleva lo que tu familia ya usa" },
      { p: "Empaca en su envase original cualquier tratamiento que tu hijo tome con regularidad y lleva más de lo que crees necesitar. Antes de viajar, habla con tu propio pediatra sobre tu viaje." },
      { h: "Si alguien se enferma de vacaciones" },
      { p: "No tienes que salir del hotel: podemos agendar una consulta médica por videollamada por $59 USD, en inglés o español. Ante síntomas graves como dificultad para respirar, fiebre alta que no baja o desmayo, llama al 911 o acude a urgencias." },
      { p: "¿Olvidaste algo? Tenemos {stores} en Cabo San Lucas y podemos entregar en el lobby de tu hotel." },
    ],
  },
  related: [
    { path: "/pharmacy", label: { en: "Pharmacy and minimarket", es: "Farmacia y minisúper" } },
    { path: "/services/doctor-consultation", label: { en: "Doctor consultation", es: "Consulta médica" } },
  ],
};
