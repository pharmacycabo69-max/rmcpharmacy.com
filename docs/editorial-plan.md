# Plan editorial del blog (8 artículos)

Público: turista norteamericano en la zona de la marina y hoteles. Inglés primero, español como versión paralela (misma estructura, traducción natural).

## Reglas de redacción
- Sin licencias, permisos, certificaciones ni autoridades sanitarias.
- Sin nombres de medicamentos, ni de receta ni de venta libre; se habla de **categorías** ("pain relievers", "antacids", "oral rehydration") para no rozar la regla 2.
- Sin promesas médicas ("cura", "trata", "previene"). Informar y orientar; ante síntomas serios, decir que llamen al **911** o acudan a urgencias.
- Cada artículo cierra con un CTA de WhatsApp (`cta_source` = `blog-<slug>`) y enlaza a la página de servicio o sucursal relevante.
- Los artículos que enlazan a `/pharmacy` o `/delivery` son orgánicos; los de servicios enlazan solo a `/services/*`.
- Fotos reales de la tienda y el equipo en cada artículo.

## Artículos

| # | Slug | Título EN | Título ES | Keyword principal | Enlaza a |
|---|---|---|---|---|---|
| 1 | `cabo-travel-first-aid-kit` | What to Pack in a Travel First-Aid Kit for Los Cabos | Qué llevar en tu botiquín de viaje a Los Cabos | travel first aid kit Cabo | `/pharmacy`, `/locations` |
| 2 | `pharmacy-delivery-villa-hotel-cabo` | How to Get Pharmacy Delivery to Your Villa or Hotel in Cabo | Cómo pedir entrega de farmacia a tu villa u hotel en Cabo | pharmacy delivery Cabo villa | `/delivery` |
| 3 | `otc-mexico-vs-us-guide` | Over-the-Counter in Mexico vs. the US: A Traveler's Guide | Venta libre en México vs. EE.UU.: guía para viajeros | over the counter Mexico vs US | `/pharmacy` |
| 4 | `heat-and-sun-safety-cabo` | Sun and Heat Safety on Your Cabo Vacation | Cuidado del sol y el calor en tus vacaciones en Cabo | sunburn heat Cabo vacation | `/pharmacy`, `/services/iv-therapy` |
| 5 | `upset-stomach-on-vacation-cabo` | Upset Stomach on Vacation: What to Do in Cabo | Malestar estomacal en vacaciones: qué hacer en Cabo | upset stomach vacation Mexico | `/services/doctor-consultation` |
| 6 | `iv-therapy-cabo-guide` | IV Therapy in Cabo: What to Expect and How It Works | Terapia IV en Cabo: qué esperar y cómo funciona | IV therapy Cabo San Lucas | `/services/iv-therapy` |
| 7 | `see-a-doctor-in-cabo-on-vacation` | How to See a Doctor in Cabo While on Vacation | Cómo ver a un médico en Cabo durante tus vacaciones | doctor Cabo San Lucas English speaking | `/services/doctor-consultation` |
| 8 | `nurse-at-your-villa-cabo` | When a Nurse Visit at Your Villa Makes Sense | Cuándo conviene una enfermera en tu villa | home nursing Cabo | `/services/home-nursing` |

## Guion por artículo

1. **Botiquín de viaje.** Lista por categorías: protección solar y after-sun, primeros auxilios, hidratación y electrolitos, repelente, cuidado de pies. Qué conseguir ya en destino (con dirección y horario de cada sucursal). CTA: preguntar disponibilidad por WhatsApp.
2. **Entrega a villa u hotel.** Paso a paso: mensaje por WhatsApp, ubicación, confirmación de total y hora, pago con enlace seguro. Zonas atendidas, tips para villas con acceso controlado. FAQ (con schema FAQPage).
3. **Venta libre México vs. EE.UU.** Por categorías, no por marcas ni ingredientes. Cómo leer etiquetas en español, diferencias de presentación y unidades (mg/ml, tabletas), cuándo preguntar en mostrador. Evitar listas de "equivalencias" por producto.
4. **Sol y calor.** Reglas simples: hidratar, sombra, reaplicar protector, horas pico. Señales de alerta (confusión, desmayo, piel muy caliente y seca): llamar al 911. IV therapy como opción de hidratación, sin afirmar resultados médicos.
5. **Malestar estomacal.** Hidratación, comida ligera, cuándo consultar (fiebre alta, sangre, más de 48 h, deshidratación). Opción de consulta por video ($59 USD). Sin nombrar medicamentos.
6. **Guía de terapia IV.** Qué es, cómo se agenda, cuánto dura, qué pasa en tu villa, precio desde $129 USD, preguntas frecuentes. Sin promesas de efectos; describir el servicio, no tratar condiciones.
7. **Ver a un médico.** Video vs. presencial, qué preparar, idioma, precio ($59 video). Cuándo ir directo a urgencias.
8. **Enfermera en tu villa.** Casos típicos de visita (seguimiento, apoyo a un viajero, personas mayores o niños), cómo se coordina con Cabo Nurse, precio por WhatsApp.

## Calendario sugerido
Un artículo por semana, en este orden: 2, 1, 6, 4, 5, 7, 3, 8 (primero los que capturan intención de compra y servicio). Publicar EN y ES el mismo día.

## Medición
Cada artículo se evalúa por: clics de WhatsApp (`cta_source = blog-<slug>`), visitas orgánicas y consultas en Search Console. Revisar a los 60 días y reescribir los de bajo desempeño.

## Implementación
`lib/posts.ts` ya está listo para recibir artículos (título, descripción, fecha, cuerpo EN/ES). Al publicar el primero el índice del blog deja de ser `noindex` y se agrega al sitemap.
