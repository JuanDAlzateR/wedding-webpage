# Guía para editar el contenido

No es necesario modificar los componentes visuales para cambiar los datos de la boda.

## Tipos de invitación

`src/content/invitations.ts` define los identificadores `mass_only` y `mass_and_celebration`, sus rutas, metadatos, texto de introducción, orden de navegación y secciones visibles. Las etiquetas de los enlaces viven una sola vez en `invitationNavigationItems`; `navigationOrder` establece el orden de cada variante y `getInvitationNavigation` retira automáticamente los destinos que no se renderizan.

La variante de Eucaristía nunca renderiza la Recepción, su confirmación ni la información adicional. El código de vestimenta es contenido confirmado y compartido por ambas variantes. No añadas un selector ni enlaces entre variantes.

El orden visible compartido es Eucaristía, código de vestimenta, regalos, Nuestra historia y galería. La invitación completa inserta la Recepción, con su confirmación, después de la Eucaristía. `navigationOrder` debe mantener ese mismo recorrido y omitir automáticamente cualquier sección no renderizada. Nuestra historia enlaza dos páginas compartidas distintas: Cómo nos conocimos y Cómo nos comprometimos.

Para cambiar la ruta no obvia de la invitación completa:

1. Edita únicamente `invitationRoutes.massAndCelebration`.
2. Mantén el formato `/invitacion/slug-no-obvio/`.
3. Ejecuta `pnpm validate`.
4. Actualiza los enlaces que se compartan de forma privada fuera del repositorio.

No copies el slug en menús, pies de página o documentación general. Ocultarlo reduce descubrimientos accidentales, pero no constituye control de acceso.

## Información de la boda

Abre `src/content/wedding.ts`. Este archivo contiene nombres, datos compartidos de la Eucaristía, datos exclusivos de la Recepción, dress code, historias, información adicional y visibilidad de secciones.

- `ceremony`: fecha, hora, lugar, dirección, mapa e indicaciones compartidos por ambas invitaciones.
- `celebration`: identificador interno para el horario, lugar, dirección, introducción, referencia, mapa, confirmación y aviso de acceso de la Recepción, que solo puede renderizar la invitación completa.
- `dressCode`: título, estilo, orientaciones, notas, colores restringidos y mensaje final compartidos.
- `biblicalQuotes`: texto, referencia y posición editorial de todas las citas bíblicas.
- `stories`: textos del acceso compartido a los dos capítulos.
- `howWeMet`: resumen, metadatos y momentos tipados de Cómo nos conocimos.
- `engagement`: resumen, metadatos, relato y textos de la página de compromiso.
- `gifts`: encabezado, párrafos y opciones compartidas para regalos.
- `sections`: disponibilidad global de cada sección. La configuración de cada variante puede ocultarla adicionalmente.

## Convención editorial

En todo texto visible para invitados, metadatos y etiquetas de accesibilidad:

- Escribe siempre `Eucaristía`, `Misa` y `Santa Misa` con las iniciales indicadas, incluso en medio de una oración.
- Usa `liturgia` en lugar de `ceremonia` cuando se haga referencia al acto religioso de la boda.
- Conserva identificadores internos como `ceremony`, `mass_only` y la ruta `/invitacion/misa/`; esta convención no requiere renombrar código ni rutas.

Para ocultar o mostrar una sección, cambia su valor en `sections` entre `false` y `true`. Una sección aparece solo cuando está habilitada tanto en `wedding.ts` como en la variante correspondiente de `invitations.ts`.

## Código de vestimenta

Edita toda la guía en `weddingContent.dressCode`. `title` y `style` controlan la jerarquía principal; `guidance` contiene las categorías de Mujeres y Hombres; `decorum`, `complianceNote` y `closingMessage` conservan los mensajes editoriales.

`restrictedColors` es la lista visible y ordenada. Cada elemento tiene un `id` estable, un `name` autoritativo y un `swatch` hexadecimal aproximado:

```ts
{
  id: "ice-blue",
  name: "Azul hielo",
  swatch: "#DDEBF2",
}
```

Para añadir, retirar o reordenar un color, modifica el arreglo completo. La muestra solo ayuda a reconocer la familia visual: nunca reemplaza el nombre escrito ni debe presentarse como una especificación exacta. Comprueba contraste, lectura sin color y disposición en móvil después de ajustar cualquier valor.

## Citas bíblicas

Edita el texto y la referencia únicamente en `weddingContent.biblicalQuotes`. `BiblicalQuote.astro` proporciona el marcado y los estilos compartidos; no copies su estructura en otros componentes.

Cada cita contiene `id`, `lines` y `reference`. Una línea puede añadir `speaker: "Ella"` o `speaker: "Él"`. Las citas intercaladas de la galería también incluyen `afterPhotoId`, que indica después de qué fotografía deben aparecer. Para mover una cita, cambia solo ese ID por otro existente en `homeGalleryPhotos`. La cita de `ceremony` se muestra como introducción de Nuestro Matrimonio mediante la variante de sección del mismo componente.

Las referencias se escriben sin paréntesis y el texto confirmado se conserva literalmente.

## Confirmación de la Recepción

La tarjeta de confirmación se edita en `weddingContent.celebration.confirmation`: `body`, `callToAction`, `url` y `deadline`. El aviso de la tarjeta naranja vive en `weddingContent.celebration.accessNotice`: `body` contiene la parte normal y `emphasis` únicamente la oración que recibe `<strong>`.

Ambos bloques son exclusivos de la invitación completa. Si cambias alguno de sus textos, agrega o actualiza su marcador en `scripts/verify-invitations.mjs` para que una filtración en la invitación de Eucaristía falle durante la validación.

## Nuestro regalo

El encabezado y el mensaje se editan únicamente en `weddingContent.gifts`. `prayerMessage.emphasis` contiene solo el fragmento que recibe `<strong>` y `prayerMessage.remainder` conserva el final normal de la oración; `presenceMessage` y `optionalGiftMessage` contienen los otros mensajes introductorios.

`transferIntroduction` se muestra fuera de las tarjetas, después de la opción de sobres y antes de las dos transferencias electrónicas. `options` contiene las tres opciones visibles en su orden editorial; no muevas la introducción a `options.envelope.note`.

Cada opción tiene `id` y `label`; las opciones electrónicas también usan `value` y pueden incluir `note`. La cuenta `331-561467-61` y la llave `@Alzate6073` deben cambiarse solo en ese arreglo: el componente genera tanto el texto visible como el valor copiado desde la misma fuente. Mantén `lluvia de sobres` como la primera opción y con énfasis semántico exclusivo.

Esta sección aparece en las dos invitaciones. No añadas titulares, identificaciones, correos, teléfonos, códigos QR, enlaces bancarios, instrucciones no confirmadas ni información exclusiva de la Recepción.

Para ocultarla temporalmente, cambia `weddingContent.sections.gifts` a `false`. Si se modifica su visibilidad por variante, debe conservarse habilitada o deshabilitada de la misma forma en las dos invitaciones.

## Cómo nos conocimos

La invitación enlaza a `/como-nos-conocimos/` desde el bloque Nuestra historia. Esta experiencia es compartida, usa `noindex` y conserva el retorno contextual a la invitación desde la cual llegó el visitante.

La fuente canónica es `weddingContent.howWeMet.storyEntries` en `src/content/wedding.ts`. `photos/history/description.md` fue el borrador de migración y ahora solo dirige a las fuentes canónicas. Cada entrada representa un momento y contiene:

- `id`: identificador único y estable.
- `description.value`: relato editable.
- `description.pending`: indica que el texto sigue siendo un borrador.
- `photoIds`: IDs de `howWeMetPhotos` en el orden visible.
- `composition`: composición editorial tipada para una foto o un grupo.
- `visible`: permite ocultar el momento completo.
- `title` y `caption`: campos opcionales.

El orden de `storyEntries` y el orden interno de cada `photoIds` son la única secuencia visible. El manifiesto fotográfico funciona como biblioteca y no controla la narración. Las 19 fotos activas están asociadas una sola vez a diez momentos, incluidos los grupos intencionales de cuatro, dos y seis imágenes.

Ejemplo:

```ts
{
  id: "our-colors",
  description: {
    value: "Texto confirmado del momento.",
    pending: false,
  },
  photoIds: ["history-10", "history-11"],
  composition: "pair-below",
  visible: true,
}
```

Para editar un texto, cambia `description.value`. Para reordenar, mueve la entrada completa o los IDs de su grupo. Para conservar un borrador, usa `description.pending: true` junto con `visible: false`; una entrada visible nunca puede tener texto pendiente. Para cambiar una foto sin alterar su relato ni posición, conserva el ID y actualiza su archivo y alt text en el manifiesto.

El resolutor falla si encuentra IDs duplicados, archivos ausentes, alt text vacío, referencias repetidas, entradas visibles sin texto terminado o fotografías sin asociación. No sustituyas una referencia faltante por una imagen parecida ni inventes descripciones.

La presentación es un scrapbook editorial con composiciones agrupadas. Es deliberadamente distinta del patrón alternado de momentos individuales de la página de compromiso.

## Historia del compromiso

La introducción se muestra en ambas invitaciones y enlaza a `/compromiso/`. La fuente canónica del relato completo es `weddingContent.engagement.storyChapters`, dentro de `src/content/wedding.ts`. `photos/engagement/photo_description.md` fue el borrador de migración y ahora solo dirige a estas fuentes.

### Secuencia de fotos y texto

El relato contiene capítulos y cada capítulo contiene un arreglo `entries`. El orden de `storyChapters` determina el orden de los días; el orden de cada `entries` determina el orden de los momentos. No se usan números de orden, nombres de archivo ni metadatos para ordenar.

Cada entrada representa un momento. `photoId` la relaciona con una fotografía del mismo identificador en `engagementPhotos`, dentro de `src/content/photos.ts`. El build valida que los capítulos e IDs sean únicos, que cada foto esté asociada una sola vez, que ninguna foto activa quede sin entrada y que todo elemento visible tenga descripción terminada y alt text.

Ejemplo con el esquema real:

```ts
{
  id: "april-05",
  title: "El juego comienza",
  dateLabel: "Domingo de Resurrección · 5 de abril de 2026",
  entries: [
    {
      id: "april05-photo1",
      photoId: "april05-photo1",
      description: {
        value: "Texto confirmado del momento.",
        pending: false,
      },
      visible: true,
    },
  ],
}
```

Campos obligatorios del capítulo:

- `id`: identificador único y estable.
- `title`: encabezado visible.
- `dateLabel`: fecha confirmada que se muestra al visitante.
- `entries`: momentos del capítulo en orden cronológico.

Campos obligatorios de una entrada:

- `id`: identificador único y estable de la entrada.
- `photoId`: identificador de una foto existente en `engagementPhotos`.
- `description.value`: texto editable o placeholder interno mientras está pendiente.
- `description.pending`: indica si el texto sigue siendo un borrador.
- `visible`: `false` oculta la entrada completa, incluida la fotografía.

Campos opcionales:

- `title`: encabezado visible del momento.
- `caption`: nota breve visible bajo la descripción.

Para editar el texto de una foto, cambia `description.value`. Usa `pending: false` solo cuando esté confirmado. Si todavía está pendiente, conserva un recordatorio claro en `value`, marca `pending: true` y usa obligatoriamente `visible: false`; la validación rechaza borradores visibles y el placeholder nunca llega a los invitados.

Para reordenar, mueve la entrada completa dentro de su capítulo o entre capítulos. Para ocultarla temporalmente, cambia `visible` a `false`. Para retirar un momento, elimina la entrada y su foto del manifiesto activo; el validador avisa si queda solo uno de los dos.

Las 19 asociaciones actuales proceden de `photo_description.md` y su secuencia confirmada de los días 5, 12 y 19 de abril de 2026.

La página de compromiso es contenido compartido: no debe incluir el slug, horarios, lugares, mapas ni otros datos exclusivos de la invitación completa.

## Fotografías

Los originales se separan por experiencia dentro de `photos/`. La página genera automáticamente copias responsivas optimizadas durante el build.

### Reemplazar el hero

1. Copia la nueva fotografía dentro de `photos/home/` en JPG, PNG, WebP o AVIF.
2. En `src/content/photos.ts`, cambia la importación asignada a `featuredHeroImage`.
3. Actualiza el `alt` y, si hace falta, `position` dentro de `featuredPhotos.hero`.

### Galería de la invitación

La selección fuente vive exclusivamente en `photos/gallery/`. `homeGalleryPhotos`, dentro de `src/content/photos.ts`, es el único manifiesto activo y su orden es el orden editorial, no una cronología confirmada. Las imágenes se muestran con su proporción natural; por eso cada entrada necesita únicamente `id`, `src` y `alt`.

`photos/home/` conserva las imágenes destacadas y originales anteriores, pero no alimenta esta galería. No copies fotografías de `history` ni `engagement` dentro del manifiesto.

Para añadir una fotografía:

1. Copia el original en el nivel superior de `photos/gallery/` en JPG, PNG, WebP o AVIF.
2. Si el original es HEIC, consérvalo fuera de la selección publicada y crea primero una copia web compatible.
3. Agrega una entrada a `homeGalleryPhotos` en la posición deseada con ID estable, `loadGalleryImage(...)` y alt text objetivo.
4. Si una cita debe cambiar de lugar, actualiza su `afterPhotoId` en `weddingContent.biblicalQuotes.galleryInterludes`.
5. Ejecuta `pnpm validate`; la verificación compara el manifiesto renderizado con todos los archivos fotográficos del nivel superior.

Para reordenar, mueve la entrada completa dentro de `homeGalleryPhotos`. Para retirar una foto, elimina su entrada y saca el original del nivel superior de `photos/gallery/`; conserva una copia fuera de la selección activa si todavía puede ser útil. Revisa siempre las tres posiciones `afterPhotoId`: las citas deben quedar en orden y ninguna puede aparecer al final sin fotografías posteriores.

### Fotografías de Cómo nos conocimos

Los 19 originales activos están en `photos/history/` y su manifiesto es `howWeMetPhotos` dentro de `src/content/photos.ts`. La colección anterior de 69 fotografías y cinco videos se conserva sin publicarse en `photos/archive/how-we-met-previous/`. Los originales HEIC usan copias JPG homónimas en `photos/history/web-compatible/`.

Para añadir una foto:

1. Copia el original en `photos/history/` con un ID estable `history-NN`.
2. Crea su copia JPG homónima en `web-compatible/` si el original es HEIC.
3. Agrega la entrada a `howWeMetPhotos` con ID y alt text objetivos.
4. Agrega el mismo ID al arreglo `photoIds` de una entrada existente o crea un nuevo elemento en `storyEntries` con descripción confirmada.
5. Ejecuta `pnpm validate` y comprueba `/como-nos-conocimos/` en móvil y escritorio.

Para retirar una foto, elimina tanto su entrada del manifiesto como su ID narrativo y conserva el original en el archivo si sigue siendo útil. Para reordenarla o cambiarla de grupo, mueve únicamente su ID dentro de `storyEntries`; no es necesario reordenar `howWeMetPhotos`. No copies estas fotos a `homeGalleryPhotos` ni a `engagementPhotos`.

### Fotografías del compromiso

Los originales están en `photos/engagement/` y su manifiesto independiente es `engagementPhotos` dentro de `src/content/photos.ts`. No agregues estas imágenes a `homeGalleryPhotos` ni a `howWeMetPhotos`. Los imports estáticos permiten que Astro valide la existencia de los archivos y genere versiones responsivas. Los archivos `april…` forman la selección editorial activa; los nombres antiguos duplicados se conservan como originales sin registrarlos por segunda vez.

Para añadir una foto:

1. Copia el JPG, PNG, WebP o AVIF en `photos/engagement/`.
2. Impórtalo en `src/content/photos.ts`.
3. Agrega un elemento a `engagementPhotos` con `id`, `src`, `alt`, `layout` y `position`.
4. Agrega su entrada asociada al capítulo correcto en `weddingContent.engagement.storyChapters`, usando el mismo `id` como `photoId`.
5. Ejecuta `pnpm validate` y comprueba `/compromiso/` en móvil y escritorio.

Para cambiar una foto sin alterar su texto ni su posición narrativa, cambia únicamente el import asignado a `src` en el elemento correspondiente de `engagementPhotos`. Después revisa `alt`, `layout` y `position`.

El orden de `engagementPhotos` no controla la historia. El orden visible se mantiene únicamente en los arreglos de `storyChapters`.

### Archivos HEIC

Los navegadores no manejan HEIC de forma consistente. `home` y `history` conservan originales HEIC cuando corresponde, pero los elementos publicados referencian copias JPG homónimas. Las fotos de `gallery` y de otras secciones deben convertirse a JPG, WebP o AVIF antes de publicarse.

## Textos alternativos y captions

- `alt` debe describir objetivamente lo visible y no inventar nombres, lugares o acontecimientos.
- Para una foto informativa, menciona los elementos relevantes que una persona no puede percibir sin verla; evita repetir literalmente `description`.
- `caption` es opcional y acompaña visualmente a la fotografía.
- Una imagen meramente decorativa debe usar `alt: ""`, pero las fotos de la galería deben conservar una descripción útil.

## Información pendiente antes de publicar

- Transporte, política de niños y contacto, si aplican.
- URL final en `SITE_URL`.
- Favicon final.

## Colores

La paleta se mantiene al inicio de `src/styles/global.css`. Edita los tokens `--color-primary`, `--color-primary-dark`, `--color-accent`, `--color-accent-soft`, `--color-background`, `--color-background-alt`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-focus` y `--color-on-primary` en lugar de agregar colores a componentes individuales.

Después de cambiar colores, verifica el contraste de texto, botones, enlaces y foco visible en fondos claros y oscuros.

Después de editar, ejecuta `pnpm validate` y revisa ambas rutas en teléfono y escritorio.

La verificación automática comprueba el HTML generado, los metadatos, las anclas y los assets de texto cargados por la invitación de Eucaristía. Si agregas información exclusiva, inclúyela también en `scripts/verify-invitations.mjs` para que una filtración provoque un fallo.
