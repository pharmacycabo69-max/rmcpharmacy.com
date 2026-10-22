# Checklist de auditoría de perfiles de Google Business Profile

Revisar los 3 perfiles (Plaza Gali, Plaza Embarcadero, Mercado Marina) al lanzar y luego cada mes.

## 1. NAP (idéntico al sitio y al schema)
- [ ] Nombre exactamente **RMC Pharmacy**, sin palabras extra (ni "Cabo", ni "Marina", ni servicios).
- [ ] Dirección igual a `lib/locations.ts`:
  - Plaza Gali: Blvd. Paseo de la Marina Loc 47, Centro, Marina, 23450 Cabo San Lucas, B.C.S.
  - Plaza Embarcadero: Blvd. Paseo de la Marina S/N, Local 15 Plaza Embarcadero, Centro, Marina, 23450 Cabo San Lucas, B.C.S.
  - Mercado Marina: Mercado Marina 11, Centro, Marina, 23450 Cabo San Lucas, B.C.S.
- [ ] Teléfono principal: +52 624 226 1023.
- [ ] Pin del mapa en la puerta de la tienda.

## 2. Información básica
- [ ] Categoría principal: Farmacia. Secundaria: Minisúper.
- [ ] Horario lunes a domingo 9:00 a 18:00. Horarios especiales para festivos.
- [ ] Sitio web con UTMs del perfil (`docs/utm-convention.md`), apuntando a su página de sucursal.
- [ ] Descripción de `docs/gbp-content.md` (máx. 750 caracteres).
- [ ] Atributos: habla inglés, entrega a domicilio, abierto todos los días.
- [ ] Servicios cargados (lista en `docs/gbp-content.md`), con precios donde aplica.
- [ ] Área de servicio de entrega definida (marina, hoteles, villas).

## 3. Contenido que genera confianza
- [ ] Al menos 10 fotos reales: fachada, interior, equipo, entrega, mostrador.
- [ ] Foto de logotipo y de portada.
- [ ] Una publicación por semana (servicio, consejo o novedad) con botón y UTM `utm_content=post`.
- [ ] Preguntas y respuestas con las dudas más comunes (horario, entrega, idioma, pago).
- [ ] Mensajes habilitados si se atienden; si no, desactivarlos.

## 4. Reglas duras
- [ ] Ninguna mención de licencias, permisos, certificaciones ni autoridades sanitarias en descripción, servicios, publicaciones, Q&A ni respuestas a reseñas.
- [ ] Ningún nombre de medicamento (receta ni venta libre) en publicaciones, servicios o respuestas.
- [ ] Sin promesas médicas ("cura", "trata", "garantiza").
- [ ] Sin keyword stuffing en nombre, servicios ni descripción.

## 5. Reseñas
- [ ] Todas las reseñas de los últimos 30 días tienen respuesta (plantillas abajo).
- [ ] Enlace corto para pedir reseña a clientes, con un código QR en mostrador.
- [ ] No se ofrecen incentivos por reseñas ni se filtra a quién se le pide.
- [ ] Reseñas falsas o que violan políticas: reportar desde el perfil.

## 6. Salud técnica
- [ ] Sin perfiles duplicados (buscar el nombre y las direcciones).
- [ ] Todos los perfiles verificados.
- [ ] Revisar sugerencias de edición de usuarios y rechazar las incorrectas.
- [ ] Insights: llamadas, rutas, clics al sitio y mensajes; compararlos con `call_click`, `directions_click` y `whatsapp_click` en GA4.

## 7. Registro de auditoría
| Fecha | Perfil | Revisó | Hallazgos | Acciones |
|---|---|---|---|---|
| | | | | |
