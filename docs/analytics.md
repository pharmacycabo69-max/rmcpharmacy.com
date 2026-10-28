# Medición: GTM + GA4

## Activación
1. Crear el contenedor web en GTM y copiar el ID (`GTM-XXXXXXX`).
2. En Vercel (y en `.env.local` para desarrollo): `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`. Sin ID no se carga nada.
3. En GTM, crear la etiqueta **Google tag / GA4 Configuration** con el ID de medición de GA4 (disparador: All Pages).

## Eventos que envía el sitio (dataLayer)
| Evento | Cuándo | Parámetros |
|---|---|---|
| `whatsapp_click` | clic en cualquier botón de WhatsApp | `cta_source`, `page_path`, `page_language`, `utm_*` |
| `call_click` | clic en "Llamar" | igual |
| `directions_click` | clic en "Cómo llegar" | igual |
| `bot_open` | se abre el asistente de respuestas rápidas | `page_path` |
| `bot_topic` | se elige un tema en el asistente | `bot_topic` (delivery, stores, iv, doctor, nursing, payments), `page_path` |
| `form_submit` | formulario de contacto (pendiente: se agrega cuando exista el formulario) | — |

## Configuración en GTM
Por cada evento:
1. Variables de capa de datos: `cta_source`, `page_language`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
2. Disparador: Evento personalizado con el nombre exacto del evento.
3. Etiqueta: GA4 Event con el mismo nombre y los parámetros anteriores.

En GA4: marcar `whatsapp_click`, `call_click`, `directions_click` (y `form_submit`) como **eventos clave**, y registrar `cta_source` y `page_language` como dimensiones personalizadas de evento.

## Consentimiento
Se cargó GTM sin banner de consentimiento. Antes de lanzar, decidir si se requiere uno para tu audiencia (visitantes de EE.UU. y México) y configurar Consent Mode en GTM si es el caso.

## Prueba
GTM → Vista previa con la URL del sitio, hacer clic en los botones y comprobar los eventos y sus parámetros; luego revisar GA4 → DebugView.

## Asistente de respuestas rápidas
El asistente (`components/ChatBot.tsx`, contenido en `lib/botFlows.ts`) responde con textos precargados, sin escritura libre ni llamadas a servidor. Cada tema termina en un botón de WhatsApp con `data-cta="whatsapp"` y `data-source="bot-<tema>"`, así que cuenta como `whatsapp_click` con `cta_source` = `bot-delivery`, `bot-iv`, etc. Para agregar un tema o cambiar una respuesta, edita `lib/botFlows.ts` (en inglés y español); el test comprueba que no haya palabras prohibidas y que los precios coincidan con las páginas.
