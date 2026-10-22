# Convención de UTMs

Reglas: minúsculas, sin espacios (usa guiones), sin acentos. Un valor = un significado.

## Perfiles de Google Business Profile
El enlace "sitio web" de cada perfil (y el de "citas/pedidos" si existe) lleva UTMs fijos:

| Parámetro | Valor |
|---|---|
| `utm_source` | `google` |
| `utm_medium` | `organic` |
| `utm_campaign` | `gbp-<sucursal>` → `gbp-plaza-gali`, `gbp-plaza-embarcadero`, `gbp-mercado-marina` |
| `utm_content` | `website` (enlace del sitio) · `order` (enlace de pedidos) · `post` (publicaciones) |

Ejemplo: `https://rmcpharmacy.com/locations/plaza-gali?utm_source=google&utm_medium=organic&utm_campaign=gbp-plaza-gali&utm_content=website`

La página de destino de cada perfil es su página de sucursal.

## Campañas pagadas (solo servicios)
| Parámetro | Valor |
|---|---|
| `utm_source` | `google` (Ads) · `meta` |
| `utm_medium` | `cpc` · `paid-social` |
| `utm_campaign` | `<servicio>-<mes>` → `iv-therapy-2026-11`, `consultation-2026-11`, `nursing-2026-11` |
| `utm_content` | variante del anuncio, p. ej. `video-a`, `text-b` |
| `utm_term` | palabra clave (solo búsqueda) |

Destinos permitidos: `/services/*` y `/es/servicios/*`. Nunca `/pharmacy` ni `/delivery`.

## Otras fuentes
| Fuente | `utm_source` / `utm_medium` / `utm_campaign` |
|---|---|
| Código QR en tienda | `qr` / `offline` / `qr-<sucursal>` |
| Tarjetas en hoteles | `hotel-<nombre>` / `referral` / `partners` |
| Redes (bio) | `instagram` / `social` / `bio` |

## Cómo se usan en el sitio
- `CtaTracker` guarda los UTMs de la visita en `sessionStorage` y los incluye en cada evento de clic (WhatsApp, llamada, direcciones), aunque el visitante cambie de página.
- Cada botón también envía `cta_source` (p. ej. `service-iv-therapy-hero`) para saber qué botón se tocó.
- Los mensajes de WhatsApp llevan `(ref: <cta_source>)` porque `wa.me` no transmite UTMs; sirve para atribuir el chat al botón.
