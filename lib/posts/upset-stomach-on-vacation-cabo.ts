import type { Post } from "./types";

export const post: Post = {
  slug: "upset-stomach-on-vacation-cabo",
  date: "2026-10-21",
  title: {
    en: "Upset Stomach on Vacation: What to Do in Cabo",
    es: "Malestar estomacal en vacaciones: qué hacer en Cabo",
  },
  description: {
    en: "An upset stomach can happen on any trip. Simple steps to feel better, when to see a doctor and how to do it from your villa or hotel.",
    es: "El malestar estomacal puede pasar en cualquier viaje. Pasos sencillos para sentirte mejor, cuándo ver a un médico y cómo hacerlo desde tu villa u hotel.",
  },
  body: {
    en: [
      { p: "A new climate, new food and long days can upset anyone's stomach. Most cases are mild. Here is what usually helps and when to get checked." },
      { h: "Simple steps at home" },
      { ul: [
        "Rest, and drink small sips of water or an electrolyte drink often.",
        "Choose light, plain foods when you feel ready to eat.",
        "Avoid alcohol, very greasy food and sugary drinks until you feel better.",
        "Wash your hands often and keep your drinking water sealed.",
      ] },
      { h: "When to see a doctor" },
      { ul: [
        "High fever",
        "Blood in vomit or stool",
        "Symptoms that last more than 48 hours",
        "Signs of dehydration: very dark urine, dizziness, extreme thirst, very dry mouth",
        "Children, older adults or people with a health condition who are getting worse",
      ] },
      { p: "If you feel severe pain, faint or cannot keep any fluids down, call 911 or go to the nearest emergency room." },
      { h: "See a doctor from your villa" },
      { p: "You do not need to leave your room. We can set up a doctor consultation by video for $59 USD, in English or Spanish. Message us on WhatsApp and we schedule it." },
      { h: "Essentials near the marina" },
      { p: "Hydration items and personal care essentials are available at our stores on the Cabo marina, open every day from 9 am to 6 pm, and we can deliver to your hotel or villa." },
    ],
    es: [
      { p: "Un clima nuevo, comida distinta y días largos pueden alterar el estómago de cualquiera. La mayoría de los casos son leves. Esto es lo que suele ayudar y cuándo conviene revisarse." },
      { h: "Pasos sencillos en casa" },
      { ul: [
        "Descansa y toma sorbos pequeños de agua o de una bebida con electrolitos con frecuencia.",
        "Elige comidas ligeras y sencillas cuando tengas ganas de comer.",
        "Evita el alcohol, la comida muy grasosa y las bebidas azucaradas hasta que te sientas mejor.",
        "Lávate las manos seguido y toma agua de envases sellados.",
      ] },
      { h: "Cuándo ver a un médico" },
      { ul: [
        "Fiebre alta",
        "Sangre en el vómito o las heces",
        "Síntomas que duran más de 48 horas",
        "Señales de deshidratación: orina muy oscura, mareo, sed extrema, boca muy seca",
        "Niños, adultos mayores o personas con una condición de salud que empeoran",
      ] },
      { p: "Si sientes dolor intenso, te desmayas o no puedes retener líquidos, llama al 911 o acude a urgencias." },
      { h: "Ve a un médico desde tu villa" },
      { p: "No necesitas salir de tu habitación. Podemos agendar una consulta médica por videollamada por $59 USD, en inglés o español. Escríbenos por WhatsApp y la programamos." },
      { h: "Esenciales cerca de la marina" },
      { p: "Productos de hidratación y cuidado personal están disponibles en nuestras sucursales en la marina de Cabo, abiertas todos los días de 9 am a 6 pm, y podemos entregarlos en tu hotel o villa." },
    ],
  },
  related: [
    { path: "/services/doctor-consultation", label: { en: "Doctor consultation by video", es: "Consulta médica por videollamada" } },
    { path: "/delivery", label: { en: "Delivery in Cabo", es: "Entrega en Cabo" } },
  ],
};
