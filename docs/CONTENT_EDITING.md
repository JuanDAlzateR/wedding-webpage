# Guía para editar el contenido

No es necesario modificar los componentes visuales para cambiar los datos de la boda.

## Información de la boda

Abre `src/content/wedding.ts`. Este archivo contiene nombres, fecha, hora, lugar, dirección, mapa, mensajes, dress code, historias, información adicional y visibilidad de secciones.

Los campos con esta forma están pendientes:

```ts
date: { value: "Fecha pendiente", pending: true }
```

Reemplázalos así:

```ts
date: { value: "Sábado, 20 de junio de 2027", pending: false }
```

Para ocultar o mostrar una sección, cambia su valor en `sections` entre `false` y `true`.

## Fotografías

Los originales se conservan en `photos/`. La página genera automáticamente copias responsivas optimizadas durante el build.

### Reemplazar el hero

1. Copia la nueva fotografía dentro de `photos/` en JPG, PNG, WebP o AVIF.
2. En `src/content/photos.ts`, cambia la importación asignada a `heroImage`.
3. Actualiza el `alt` y, si hace falta, `position` dentro de `featuredPhotos.hero`.

### Añadir una fotografía a la galería

1. Copia el archivo dentro de `photos/`.
2. Impórtalo al inicio de `src/content/photos.ts`.
3. Agrega un elemento a `galleryPhotos` con `id`, `src`, `alt`, `layout` y `position`.

`layout` puede ser `portrait`, `landscape` o `feature`. `position` controla el punto focal del recorte; por ejemplo, `center 35%` desplaza el enfoque hacia arriba.

### Eliminar o reordenar

- Para eliminar una foto, retira su elemento de `galleryPhotos`.
- Para cambiar el orden, mueve el elemento dentro del arreglo.
- Conserva el archivo original si todavía puede ser útil; elimínalo solo cuando exista una copia segura.

### Archivos HEIC

Los navegadores no manejan HEIC de forma consistente. Convierte estos archivos a JPG, WebP o AVIF antes de agregarlos al manifiesto. Los dos archivos `.HEIC` actuales no se publican.

## Textos alternativos y captions

- `alt` debe describir objetivamente lo visible y no inventar nombres, lugares o acontecimientos.
- `caption` es opcional y aparece visualmente sobre la fotografía.
- Una imagen meramente decorativa debe usar `alt: ""`, pero las fotos de la galería deben conservar una descripción útil.

## Información pendiente antes de publicar

- Nombres e iniciales reales.
- Fecha, hora, lugar, dirección y enlace del mapa.
- Mensaje de bienvenida.
- Código de vestuario.
- Historia de la pareja.
- Historia del compromiso; debe seguir pendiente hasta recibir el relato real.
- Indicaciones de llegada.
- Transporte, regalos, política de niños y contacto, si aplican.
- Título y descripción para buscadores y WhatsApp.
- URL final en `SITE_URL`.
- Favicon final.

Después de editar, ejecuta `pnpm validate` y revisa el sitio en teléfono y escritorio.
