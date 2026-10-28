# Prompts para los 301 desde los dominios viejos

Cada prompt se pega en la sesión que tiene acceso a ese sitio. Destino único: `https://www.rmcpharmacy.com`.

## Mapa de destinos (común a los dos)

| Contenido viejo | Destino EN | Destino ES |
|---|---|---|
| Inicio | `/` | `/es` |
| Nosotros / about | `/about` | `/es/nosotros` |
| Contacto | `/contact` | `/es/contacto` |
| Sucursales / ubicaciones | `/locations` | `/es/ubicaciones` |
| Terapia IV | `/services/iv-therapy` | `/es/servicios/terapia-iv` |
| Consulta médica | `/services/doctor-consultation` | `/es/servicios/consulta-medica` |
| Enfermería a domicilio | `/services/home-nursing` | `/es/servicios/enfermeria-a-domicilio` |
| Entrega / delivery | `/delivery` | `/es/entrega` |
| Tienda, productos, categorías, carrito | `/delivery` | `/es/entrega` |
| Blog y artículos | `/blog` | `/es/blog` |
| Cualquier otra URL sin equivalente | `/` | `/es` |

## Prompt 1: cabopharmacy.com (WordPress, Elementor, WooCommerce)

```
Trabajas en cabopharmacy.com (WordPress + Elementor + WooCommerce). El sitio se retira
y todo su tráfico pasa a https://www.rmcpharmacy.com con redirecciones 301. No cambies
el contenido ni borres nada hasta que las redirecciones estén verificadas.

1. Inventario. Exporta a un CSV (url_vieja, tipo, idioma, clics_90d, impresiones_90d) todas las
   URLs públicas: páginas, entradas del blog, productos y categorías de WooCommerce, y las URLs
   con tráfico en Search Console. Guarda también una copia de los productos de WooCommerce.
2. Mapa. Para cada URL asigna destino con esta tabla (inglés / español):
   inicio / -> /es ; about -> /about, /es/nosotros ; contacto -> /contact, /es/contacto ;
   sucursales -> /locations, /es/ubicaciones ; terapia IV -> /services/iv-therapy,
   /es/servicios/terapia-iv ; consulta médica -> /services/doctor-consultation,
   /es/servicios/consulta-medica ; enfermería -> /services/home-nursing,
   /es/servicios/enfermeria-a-domicilio ; entrega -> /delivery, /es/entrega ;
   tienda, productos, categorías, carrito -> /delivery, /es/entrega ; blog -> /blog, /es/blog ;
   cualquier otra -> / o /es. Si una página tiene versión en español, usa el destino /es.
3. Implementación. Redirecciones 301 permanentes a nivel de servidor (.htaccess o nginx) o con el
   plugin Redirection. Una sola salto: http y https, con y sin www, todos van directo a
   https://www.rmcpharmacy.com/... sin cadenas. Conserva la ruta cuando exista equivalente.
4. Verificación. Con curl -I comprueba cada URL del CSV: debe dar 301 y un solo salto hacia el
   destino correcto, y el destino debe responder 200. Entrega una tabla con los resultados.
5. Después. Mantén el dominio registrado y las redirecciones al menos 12 meses. En Search Console
   agrega la propiedad de rmcpharmacy.com y usa la herramienta de cambio de dirección si aplica.

Reglas: no publiques ni agregues texto nuevo; no menciones licencias, permisos, certificaciones ni
autoridades sanitarias; no anuncies medicamentos de receta; no cambies nada de cabonurse.com.
Al terminar entrega el CSV final con la columna destino y el resultado de cada prueba.
```

## Prompt 2: pharmacycabo.com (stack por identificar)

```
Trabajas en pharmacycabo.com. Primero identifica el stack (cabeceras HTTP, código fuente,
hosting, repositorio) y dime cuál es antes de tocar nada. El sitio se retira y todo su tráfico
pasa a https://www.rmcpharmacy.com con redirecciones 301. No borres contenido hasta que las
redirecciones estén verificadas.

1. Inventario. Exporta a un CSV (url_vieja, tipo, idioma, clics_90d, impresiones_90d) todas las
   URLs públicas y las que tengan tráfico en Search Console. Haz una copia de seguridad del sitio.
2. Mapa. Asigna cada URL a su destino con esta tabla (inglés / español):
   inicio -> / , /es ; about -> /about, /es/nosotros ; contacto -> /contact, /es/contacto ;
   sucursales -> /locations, /es/ubicaciones ; terapia IV -> /services/iv-therapy,
   /es/servicios/terapia-iv ; consulta médica -> /services/doctor-consultation,
   /es/servicios/consulta-medica ; enfermería -> /services/home-nursing,
   /es/servicios/enfermeria-a-domicilio ; entrega, tienda, productos, categorías y carrito ->
   /delivery, /es/entrega ; blog -> /blog, /es/blog ; cualquier otra -> / o /es.
3. Implementación según el stack: next.config redirects, vercel.json, middleware, .htaccess, nginx
   o el panel del hosting. Redirecciones 301 permanentes, un solo salto, http/https y con/sin www
   directo a https://www.rmcpharmacy.com/... sin cadenas. Conserva la ruta cuando haya equivalente.
4. Verificación. Con curl -I comprueba cada URL del CSV: 301 con un solo salto, y el destino debe
   dar 200. Entrega una tabla con los resultados.
5. Después. Mantén el dominio y las redirecciones al menos 12 meses y agrégalo a Search Console
   para vigilar errores.

Reglas: no publiques texto nuevo; no menciones licencias, permisos, certificaciones ni autoridades
sanitarias; no anuncies medicamentos de receta; no cambies cabonurse.com ni rmcpharmacy.com.
Al terminar entrega el CSV final con destino y el resultado de cada prueba.
```
