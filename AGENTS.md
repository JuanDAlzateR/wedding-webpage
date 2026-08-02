# Instrucciones para Codex

## Propósito

Este repositorio contiene un sitio web estático de boda, móvil primero y únicamente en español. Debe conservar una estética romántica, sobria, cálida y accesible.

## Tecnología aprobada

- Astro con TypeScript estricto
- CSS propio
- pnpm; no usar npm ni Yarn
- Generación completamente estática
- Sin backend, autenticación, base de datos, analítica ni APIs de IA

## Directorios importantes

- `src/content/wedding.ts`: única fuente de información editable de la boda
- `src/content/invitations.ts`: tipos, rutas, metadatos y visibilidad por variante
- `src/content/photos.ts`: manifiestos, alt text y tratamiento de imágenes
- `photos/home/`: imágenes destacadas de la invitación y originales preservados
- `photos/gallery/`: originales de la galería final de la invitación
- `photos/history/`: selección activa de Cómo nos conocimos
- `photos/archive/how-we-met-previous/`: colección anterior preservada e inactiva
- `photos/engagement/`: originales de Cómo nos comprometimos
- `src/components/`: secciones visuales
- `src/styles/global.css`: sistema visual y responsive
- `docs/`: edición y despliegue

## Contenido

- No inventar nombres, fechas, lugares, historias, políticas, contactos ni enlaces.
- La invitación `mass_only` no puede incluir texto, metadatos, navegación, assets de texto ni referencias a la celebración posterior.
- La ruta no obvia de `mass_and_celebration` no debe copiarse en menús, pies, sitemaps o documentación general.
- Mantener placeholders centralizados y claramente marcados.
- Las secciones opcionales sin información confirmada deben permanecer ocultas.
- El sitio es solo en español; no añadir traducciones ni selector de idioma salvo petición explícita.
- Mantener `Eucaristía`, `Misa` y `Santa Misa` con iniciales mayúsculas; usar `liturgia` cuando se hable específicamente del acto religioso.
- El contenido confirmado del vestuario y sus muestras aproximadas se editan únicamente en `weddingContent.dressCode`; los nombres de los colores son la información autoritativa.
- El mensaje compartido de regalos se edita en `weddingContent.gifts.body` y la llave en `weddingContent.gifts.key`; no añadir entidades financieras, tipos de cuenta, QR ni instrucciones de pago.

## Navegación y citas

- El recorrido compartido es: Inicio, Eucaristía, código de vestimenta, regalos, Nuestra historia y galería; la invitación completa inserta la celebración posterior, incluida su confirmación, después de la Eucaristía.
- `#historia` es un acceso compartido a dos experiencias independientes: `/como-nos-conocimos/` y `/compromiso/`.
- Las etiquetas y el orden de navegación se mantienen en `src/content/invitations.ts`; la navegación final se filtra según las secciones realmente visibles.
- `navigationOrder` debe reproducir el orden renderizado y nunca incluir destinos ocultos.
- Todo enlace interno debe resolver a un ID existente. `Confirmación` y cualquier otro acceso relacionado con la celebración son exclusivos de `mass_and_celebration`.
- Los textos y referencias bíblicas se mantienen en `weddingContent.biblicalQuotes`; su marcado canónico es `BiblicalQuote.astro`.
- Conservar literalmente la puntuación y referencia de una cita confirmada. Las referencias se muestran sin paréntesis.

## Celebración posterior

- Introducción, aviso de acceso, URL de confirmación y fecha límite viven en `weddingContent.celebration`.
- Estos datos solo pueden pasarse al bloque de celebración de `mass_and_celebration`; deben permanecer ausentes del HTML, metadatos y assets de texto de `mass_only`.
- La confirmación continúa siendo un enlace externo. No crear formularios, almacenamiento ni backend.

## Relato del compromiso

- La fuente canónica del relato es `weddingContent.engagement.storyChapters` en `src/content/wedding.ts`.
- Cada capítulo tiene `id`, `title`, `dateLabel` y `entries`; el orden de ambos arreglos es el orden cronológico visible.
- Cada entrada usa `id`, `photoId`, `description` y `visible`; puede incluir `title` o `caption`.
- `photoId` debe coincidir con un ID de `engagementPhotos` en `src/content/photos.ts`. El build valida IDs, cobertura, textos y asociaciones.
- Para añadir una foto, registra primero su import, alt text, layout y position en `engagementPhotos`; después crea su entrada en el capítulo correcto.
- Para editar, ocultar o reordenar, cambia únicamente los datos. Una entrada con `description.pending: true` debe usar `visible: false`; los placeholders nunca se muestran.
- Para retirar un momento, elimina tanto la entrada como su elemento del manifiesto activo. Conserva el original cuando sea práctico.
- Las fotos de compromiso viven en `photos/engagement/` y no deben duplicarse en `homeGalleryPhotos` ni `howWeMetPhotos`.
- `/compromiso/` es compartida y privada por `noindex`; no debe nombrar ni enlazar la ruta completa ni serializar información exclusiva de la celebración.
- No inventar detalles personales ni inferir lugares o personas solo a partir de una imagen.

## Cómo nos conocimos

- La fuente canónica del relato es `weddingContent.howWeMet.storyEntries` en `src/content/wedding.ts`; `photos/history/description.md` solo dirige a esa fuente.
- Cada entrada usa `id`, `description`, `photoIds`, `composition` y `visible`; puede incluir `title` o `caption`. El orden del arreglo y de cada `photoIds` es el único orden visible.
- `photoIds` debe cubrir una sola vez todos los IDs de `howWeMetPhotos` en `src/content/photos.ts`. El build valida IDs, archivos, cobertura, alt text, textos y asociaciones.
- Una entrada visible requiere texto confirmado. Para conservar un borrador, usa `description.pending: true` y `visible: false`; nunca publiques placeholders.
- Las fotos activas viven en `photos/history/`; los HEIC usan JPG homónimos en `photos/history/web-compatible/`. La colección archivada no se importa ni se publica.
- Para añadir un momento, registra la foto y su alt text en `howWeMetPhotos` y crea la entrada asociada. Para reemplazar una foto sin alterar el relato, conserva su ID y cambia únicamente su archivo y alt text.
- Para editar, ocultar o reordenar, modifica la entrada completa. Una referencia ausente, duplicada o sin descripción debe fallar durante el build, no sustituirse por otra foto.
- `/como-nos-conocimos/` es compartida y privada por `noindex`; no debe nombrar ni enlazar la ruta completa ni serializar información exclusiva de la celebración.
- Su diseño es un scrapbook editorial por grupos; no copiar el patrón alternado de una foto y un texto usado en `/compromiso/`.

## Fotografías

- Conservar originales cuando sea práctico.
- Registrar rutas, alt text, captions y tratamiento visual únicamente en `src/content/photos.ts`; el orden narrativo se mantiene en los datos de cada relato.
- La galería de la invitación usa exclusivamente `photos/gallery/` y el orden explícito de `homeGalleryPhotos`.
- `photos/home/` se reserva para imágenes destacadas y originales preservados; no usarlo como fuente de la galería.
- Las posiciones de las citas intercaladas se cambian mediante `afterPhotoId` en `weddingContent.biblicalQuotes.galleryInterludes`.
- Cómo nos conocimos usa exclusivamente `photos/history/` y `howWeMetPhotos`; no reutilizarlo como galería de la invitación.
- No mezclar `photos/gallery/`, `photos/home/`, `photos/history/` ni `photos/engagement/`; sus manifiestos y experiencias son independientes.
- Para añadir o retirar una foto de la galería, cambia el archivo en `photos/gallery/` y su entrada en `homeGalleryPhotos`; para reordenar, mueve la entrada completa y revisa los `afterPhotoId` de las citas.
- Para añadir o retirar una foto de Cómo nos conocimos, cambia `howWeMetPhotos` y el arreglo `photoIds` de su entrada; para reordenar, mueve la entrada o sus IDs sin reordenar el manifiesto.
- La galería de la invitación usa columnas adaptativas por tramo en escritorio: tres desde seis fotos, dos para tramos de dos a cinco y una para una foto. Mantener esta regla basada en cantidades y evitar excepciones por nombre de archivo.
- Usar descripciones objetivas y no identificar personas o lugares sin confirmación.
- Ajustar `position` antes de aceptar un recorte que pueda ocultar sujetos importantes.
- No publicar HEIC directamente; convertirlo a un formato web compatible.

## Diseño y calidad

- Preservar la paleta cálida, jerarquía editorial, espacios generosos y tipografía legible.
- Evitar ornamentos excesivos, animaciones intensas, audio automático y dependencias pesadas.
- Mantener HTML semántico, navegación por teclado, foco visible, contraste suficiente y soporte para `prefers-reduced-motion`.
- Probar primero en móvil y después en escritorio.
- No realizar refactors no relacionados.

## Comandos

```bash
pnpm install
pnpm dev
pnpm format
pnpm format:check
pnpm lint
pnpm check
pnpm test
pnpm build
pnpm validate
```

`pnpm test` ejecuta la comprobación estructural, el build y la verificación enfocada de las dos invitaciones.

## Validación obligatoria

Después de un cambio relevante:

1. Ejecutar `pnpm format:check`.
2. Ejecutar `pnpm lint`.
3. Ejecutar `pnpm check`.
4. Ejecutar `pnpm build`.
5. Ejecutar `pnpm verify:invitations`.
6. Revisar ambas variantes en móvil y escritorio cuando cambie la interfaz.
7. Verificar imágenes, enlaces, placeholders, foco y reduced motion.
8. Después de mover fotos, confirmar cantidades, hashes, cobertura de manifiestos y ausencia de rutas antiguas.

No afirmar que un comando pasó si no se ejecutó exitosamente.

## Despliegue

- Salida: `dist/`
- Cloudflare Pages: opción principal
- GitHub Pages: soportado mediante `SITE_URL` y `BASE_PATH`
- No inventar la URL final; configurar `SITE_URL` solo cuando sea conocida
- No incluir secretos en el repositorio ni en archivos públicos
