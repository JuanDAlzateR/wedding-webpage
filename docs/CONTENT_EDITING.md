# Guía para editar el contenido

No es necesario modificar los componentes visuales para cambiar los datos de la boda.

## Tipos de invitación

`src/content/invitations.ts` define los identificadores `mass_only` y `mass_and_celebration`, sus rutas, metadatos, texto de introducción, navegación y secciones visibles.

La variante de Eucaristía nunca renderiza la celebración posterior, el código de vestuario ni la información adicional. No añadas un selector ni enlaces entre variantes.

Para cambiar la ruta no obvia de la invitación completa:

1. Edita únicamente `invitationRoutes.massAndCelebration`.
2. Mantén el formato `/invitacion/slug-no-obvio/`.
3. Ejecuta `pnpm validate`.
4. Actualiza los enlaces que se compartan de forma privada fuera del repositorio.

No copies el slug en menús, pies de página o documentación general. Ocultarlo reduce descubrimientos accidentales, pero no constituye control de acceso.

## Información de la boda

Abre `src/content/wedding.ts`. Este archivo contiene nombres, datos compartidos de la Eucaristía, datos exclusivos de la celebración posterior, dress code, historias, información adicional y visibilidad de secciones.

- `ceremony`: fecha, hora, lugar, dirección, mapa e indicaciones compartidos por ambas invitaciones.
- `celebration`: horario, lugar, dirección, referencia y mapa que solo puede renderizar la invitación completa.
- `sections`: disponibilidad global de cada sección. La configuración de cada variante puede ocultarla adicionalmente.

## Convención editorial

En todo texto visible para invitados, metadatos y etiquetas de accesibilidad:

- Escribe siempre `Eucaristía` y `Misa` con inicial mayúscula, incluso en medio de una oración.
- Usa `liturgia` en lugar de `ceremonia` cuando se haga referencia al acto religioso de la boda.
- Conserva identificadores internos como `ceremony`, `mass_only` y la ruta `/invitacion/misa/`; esta convención no requiere renombrar código ni rutas.

Los campos todavía no confirmados conservan esta forma:

```ts
dressCode: {
  title: "Código de vestuario pendiente",
  pending: true
}
```

Cuando recibas la información real, reemplázala y cambia `pending` a `false`:

```ts
dressCode: {
  title: "Código de vestuario confirmado",
  pending: false
}
```

Para ocultar o mostrar una sección, cambia su valor en `sections` entre `false` y `true`. Una sección aparece solo cuando está habilitada tanto en `wedding.ts` como en la variante correspondiente de `invitations.ts`.

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

- Código de vestuario.
- Historia de la pareja.
- Historia del compromiso; debe seguir pendiente hasta recibir el relato real.
- Transporte, regalos, política de niños y contacto, si aplican.
- URL final en `SITE_URL`.
- Favicon final.

Después de editar, ejecuta `pnpm validate` y revisa ambas rutas en teléfono y escritorio.

La verificación automática comprueba el HTML generado, los metadatos, las anclas y los assets de texto cargados por la invitación de Eucaristía. Si agregas información exclusiva, inclúyela también en `scripts/verify-invitations.mjs` para que una filtración provoque un fallo.
