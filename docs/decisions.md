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
