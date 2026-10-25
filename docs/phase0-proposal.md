# Fase 0: arquitectura, dominios y mapa de keywords (borrador)

## 1. NAP confirmado

Marca: RMC Pharmacy (las 3 sucursales llevan el mismo nombre en GBP; se distinguen por dirección). Teléfono y WhatsApp (marca y bot): 624 226 1023 (+52 624 226 1023). Horario: lunes a domingo, 9:00 a 18:00 (confirmado para Plaza Gali; asumido igual en las demás hasta que digas otra cosa). Categorías GBP: Farmacia y Minisúper.

| Sucursal | Slug | Dirección |
|---|---|---|
| Plaza Gali | `plaza-gali` | Blvd. Paseo de la Marina Loc 47, Centro, Marina, 23450 Cabo San Lucas, B.C.S. |
| Plaza Embarcadero | `plaza-embarcadero` | Blvd. Paseo de la Marina S/N, Local 15 Plaza Embarcadero, Centro, Marina, 23450 Cabo San Lucas, B.C.S. |
| Mercado Marina | `mercado-marina` | Mercado Marina 11, Centro, Marina, 23450 Cabo San Lucas, B.C.S. |

Coordenadas de Plaza Gali: 22.8783056, -109.9089587. Faltan las de las demás. Regla: un solo archivo `data/locations.ts` alimenta página, schema y pie de página.

## 2. Consolidación de dominios (propuesta)

| Dominio | Acción |
|---|---|
| rmcpharmacy.com | **Principal.** Sitio nuevo en Next.js |
| cabopharmacy.com | 301 uno a uno hacia rutas equivalentes; el resto a `/`. Su WordPress/WooCommerce se retira del SEO |
| pharmacycabo.com | 301 uno a uno hacia rutas equivalentes; el resto a `/` |
| cabonurse.com | Se mantiene como marca hermana. `/services/home-nursing` enlaza a él y él enlaza de vuelta. Opcional a futuro: 301 si se unifica |
| URLs WooCommerce | 301 a `/delivery` (nunca a páginas de Ads) |

Antes de apagar WordPress: inventario de URLs con tráfico (Search Console), mapa 301 en `docs/redirects.csv`, y mantener el dominio viejo con 301 al menos 12 meses.

## 3. Arquitectura de URLs

EN sin prefijo; ES bajo `/es`. Cada página lleva hreflang `en`, `es` y `x-default`.

| Página | EN | ES | Uso |
|---|---|---|---|
| Home | `/` | `/es` | orgánico |
| Sucursales (índice) | `/locations` | `/es/ubicaciones` | orgánico |
| Sucursal | `/locations/plaza-gali` (+ `plaza-embarcadero`, `mercado-marina`) | `/es/ubicaciones/plaza-gali` | orgánico, GBP |
| Farmacia / OTC genérico | `/pharmacy` | `/es/farmacia` | **solo orgánico** |
| Entrega | `/delivery` | `/es/entrega` | **solo orgánico** |
| Terapia IV | `/services/iv-therapy` | `/es/servicios/terapia-iv` | Ads permitido |
| Consulta médica | `/services/doctor-consultation` | `/es/servicios/consulta-medica` | Ads permitido |
| Enfermería a domicilio | `/services/home-nursing` | `/es/servicios/enfermeria-a-domicilio` | Ads permitido |
| Nosotros | `/about` | `/es/nosotros` | confianza (fotos, equipo) |
| Contacto | `/contact` | `/es/contacto` | |
| Blog | `/blog/[slug]` | `/es/blog/[slug]` | orgánico |

Regla 5: las 3 páginas de servicios no enlazan a `/pharmacy` ni a `/delivery` en su contenido principal ni usan la palabra "medicine/medicamentos". Su CTA es WhatsApp con un UTM propio. El menú global puede enlazarlas, pero las URLs de Ads deben ir a una versión sin ese menú (layout `landing`) para cumplir la regla.

## 4. Mapa de keywords

| Página | Keyword principal EN | Secundarias EN | Principal ES |
|---|---|---|---|
| Home | pharmacy Cabo San Lucas | English speaking pharmacy Cabo, pharmacy near marina Cabo | farmacia en Cabo San Lucas |
| Plaza Gali | pharmacy Plaza Gali Cabo | pharmacy near marina Cabo, pharmacy Paseo de la Marina | farmacia Plaza Gali Cabo |
| Mercado Marina | pharmacy Mercado Marina Cabo | pharmacy near the marina, open 7 days | farmacia Mercado Marina Cabo |
| Plaza Embarcadero | pharmacy Embarcadero Cabo | pharmacy near Puerto Paraiso/marina | farmacia Embarcadero Cabo |
| /pharmacy | over the counter pharmacy Cabo | pharmacy essentials for tourists, sunscreen, first aid | farmacia de venta libre Cabo |
| /delivery | pharmacy delivery Cabo | delivery to villa Cabo, hotel delivery Cabo, marina delivery | entrega a hotel y villa Cabo |
| IV therapy | IV therapy Cabo San Lucas | hangover IV Cabo, hydration IV Cabo, IV drip Cabo | terapia intravenosa Cabo |
| Consulta | doctor Cabo San Lucas English speaking | telemedicine Cabo, doctor video consult | médico que habla inglés Cabo |
| Enfermería | home nursing Cabo | nurse visit villa Cabo, nurse hotel Cabo | enfermera a domicilio Cabo |
| About | RMC Pharmacy Cabo | | RMC Pharmacy Cabo |

Nota de intención: las páginas de sucursal compiten por búsquedas "near me"/mapa, donde pesa más el perfil de GBP que el sitio. El sitio refuerza con NAP idéntico, schema y reseñas visibles.

## 5. Riesgos a señalar (no bloquean)
- **Google Ads y IV therapy / consulta:** Google puede aplicar políticas de salud a esos anuncios y pedir verificaciones a la cuenta de Ads, independientemente del contenido del sitio. Conviene probar con una campaña pequeña. No lo resuelvo agregando claims en el sitio (regla 1).
- **Sin claims regulatorios:** la confianza se apoya en fotos reales, equipo, reseñas, precios y horarios. Esto exige conseguir ese material.
- **IV therapy:** el texto debe evitar promesas médicas ("cura", "trata"); describir el servicio, duración y precio.

## 6. Precios (para páginas de servicio)
- Terapia IV a domicilio: desde USD 159. En consultorio: desde USD 129.
- Consulta médica por videoconferencia: USD 59.
- Consulta presencial y enfermería: precio pendiente.

## 7. Pendientes para aprobar la Fase 0
2. Horario y servicios por sucursal (se asume 9 a 18 todos los días y todos los servicios en todas).
3. Stack actual de pharmacycabo.com.
4. Precio de consulta presencial y enfermería a domicilio.
5. Confirmar que rmcpharmacy.com está registrado y bajo tu control.
