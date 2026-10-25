# Decisiones del proyecto

Estado: **Fase 0, borrador pendiente de aprobación.**
Las decisiones marcadas (propuesta) se asumen por defecto hasta que se confirmen.

## Reglas duras (fijas)
1. Sin licencias, permisos, certificaciones ni autoridades sanitarias en ningún texto, schema, meta o perfil.
2. Sin medicamentos de receta; solo categorías OTC genéricas.
3. Sin keyword stuffing en títulos ni nombres de negocio.
4. NAP idéntico en sitio, schema y los 3 perfiles de GBP.
5. Landings de Ads (servicios) sin mención de venta de medicamentos.

## Decisiones
| # | Decisión | Estado |
|---|----------|--------|
| D1 | Dominio principal: rmcpharmacy.com; cabopharmacy.com y pharmacycabo.com hacen 301 | confirmada |
| D2 | Stack: Next.js (App Router) en Vercel, i18n con hreflang, EN por defecto | propuesta (sin objeción) |
| D3 | Catálogo WooCommerce fuera del sitio SEO; 301 de sus URLs a /delivery | confirmada |
| D4 | Pedidos por bot de WhatsApp (Stripe); CTA principal = WhatsApp click-to-chat | dada |
| D5 | Teléfono de la marca y del bot: 624 226 1023 | confirmada |
| D6 | Horario por defecto: lunes a domingo, 9:00 a 18:00 (a confirmar por sucursal) | confirmada para Plaza Gali |

## Datos NAP (fuente única)
Ver [phase0-proposal.md](phase0-proposal.md), sección NAP.
| D7 | Categorías GBP: Farmacia y Minisúper | confirmada |
| D8 | Precios: IV a domicilio desde USD 129; consulta por video USD 59 | confirmada |
| D9 | Por ahora son 3 sucursales, todas con nombre RMC Pharmacy | confirmada |
| D10 | Nombre público: **RMC Pharmacy** (los 3 perfiles de GBP se renombran desde "Pharmacy RMC" antes del lanzamiento) | confirmada |

## Fase 1 (implementación)
| # | Decisión |
|---|----------|
| F1 | Next.js 16 (App Router). Todas las páginas viven en `app/[lang]`; `proxy.ts` sirve EN sin prefijo y ES bajo `/es`, traduciendo los segmentos (`/es/servicios/terapia-iv`). |
| F2 | Rutas y slugs en `lib/routes.ts`; NAP en `lib/locations.ts`; servicios en `lib/services.ts`. Fuente única para páginas y JSON-LD. |
| F3 | Páginas de servicios (Ads) usan el layout `(landing)`: cabecera mínima sin enlaces a `/pharmacy` ni `/delivery`, y sin menciones a medicamentos. |
| F4 | WhatsApp: `wa.me` ignora UTM, así que el origen del clic va como `(ref: <source>)` en el mensaje y como `data-source` en el botón para que GTM lo lea en la Fase 2. |
| F5 | Schema: Pharmacy por sucursal (geo solo donde hay coordenadas), Service + FAQPage en servicios, FAQPage en /delivery, Organization global. |
| F6 | Blog: estructura lista, sin artículos hasta la Fase 3; el índice vacío va `noindex`. |

## Pendiente antes de lanzar
- Fotos reales y texto de /about (equipo, historia).
- Coordenadas de Plaza Embarcadero y Mercado Marina, y URLs de sus perfiles de GBP (`sameAs`).
- Precios de consulta presencial y enfermería.
- Imágenes optimizadas con `next/image` cuando existan las fotos.
- Mapa de 301 desde cabopharmacy.com y pharmacycabo.com (`docs/redirects.csv`).

## Fase 2 (medición)
| # | Decisión |
|---|----------|
| M1 | GTM se carga solo si existe `NEXT_PUBLIC_GTM_ID`; GA4 se configura dentro del contenedor (docs/analytics.md). |
| M2 | Un único listener delegado (`CtaTracker`) lee `data-cta`/`data-source` y publica `whatsapp_click`, `call_click`, `directions_click` en el dataLayer. |
| M3 | Los UTMs de la visita se guardan en `sessionStorage` y viajan con cada evento. Convención en docs/utm-convention.md. |
| M4 | `form_submit` queda pendiente hasta que exista el formulario de contacto (necesita backend, p. ej. Supabase). |
| M5 | Sin banner de consentimiento por ahora; decidir antes de lanzar. |

## Fase 3 (contenido)
| # | Decisión |
|---|----------|
| C1 | Descripciones de GBP de 396-450 caracteres (límite 750), una por sucursal en EN y ES, con el mismo nombre "RMC Pharmacy" (docs/gbp-content.md). |
| C2 | Los 8 artículos hablan de categorías, nunca de nombres de medicamentos (ni de venta libre), para respetar la regla 2. La nota de equivalencias OTC se hace por categoría. |
| C3 | Ante síntomas serios los artículos remiten al 911; la terapia IV se describe como servicio, sin promesas médicas. |
| C4 | Plantillas de reseñas en docs/review-replies.md; checklist en docs/gbp-checklist.md. |

## Artículos del blog
| # | Decisión |
|---|----------|
| B1 | Los 8 artículos del plan están escritos en EN y ES en `lib/posts/` (un archivo por artículo, bloques de título, párrafo y lista). Todos con fecha 2026-10-21. |
| B2 | Cada artículo cierra con CTA de WhatsApp (`cta_source = blog-<slug>`) y enlaces relacionados; el de entrega incluye FAQPage y todos llevan schema Article. |
| B3 | Con artículos publicados, el índice del blog ya no va `noindex` y entra al sitemap. Blog agregado al menú. |
| B4 | Pendiente: escalonar las fechas de publicación (uno por semana) o publicar todo junto; hoy salen todos a la vez. |

## Calendario de publicación
Un artículo por semana, en el orden del plan. Cada uno sale en su fecha (`date` en `lib/posts/<slug>.ts`, UTC); antes de esa fecha su URL devuelve 404 y no entra al sitemap. Las páginas del blog y el sitemap se revalidan cada hora, así que no hace falta redesplegar (en Vercel funciona por ISR).

| Fecha | Artículo |
|---|---|
| 2026-10-21 | pharmacy-delivery-villa-hotel-cabo |
| 2026-10-28 | cabo-travel-first-aid-kit |
| 2026-11-04 | iv-therapy-cabo-guide |
| 2026-11-11 | heat-and-sun-safety-cabo |
| 2026-11-18 | upset-stomach-on-vacation-cabo |
| 2026-11-25 | see-a-doctor-in-cabo-on-vacation |
| 2026-12-02 | otc-mexico-vs-us-guide |
| 2026-12-09 | nurse-at-your-villa-cabo |

Nota: si el lanzamiento del sitio es después del 2026-10-21, mover las fechas para que el primero salga el día del lanzamiento.

## Terapia IV grupal y dominio www
| # | Decisión |
|---|----------|
| G1 | Nueva página `/services/iv-therapy/groups` (ES: `/es/servicios/terapia-iv/grupos`) en el layout de landing (sin enlaces a farmacia ni entrega). Contenido en `lib/groups.ts`. Precios con placeholder `$___` hasta confirmarlos. |
| G2 | La nota de evaluación de salud se redactó sin la palabra "Licensed" (regla 1). |
| G3 | Bloque de licencia en el footer (COFEPRIS, licencia sanitaria, responsable sanitario) **no implementado**: choca con la regla 1. Pendiente de decisión del cliente. |
| G4 | URL canónica del sitio: `https://www.rmcpharmacy.com`. Canonical, og:url, hreflang, sitemap y schema salen de `SITE.url`. En Vercel, `NEXT_PUBLIC_SITE_URL` debe valer lo mismo o estar sin definir, y el dominio sin www debe redirigir (308) al www. |
