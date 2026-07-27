# Sitio web de la boda

Sitio estático, móvil primero y exclusivamente en español. Está construido con Astro, TypeScript y CSS propio, sin backend, base de datos, autenticación ni servicios de pago.

El mismo diseño genera dos invitaciones independientes:

- Eucaristía solamente.
- Eucaristía y celebración posterior.

La raíz `/` muestra la variante de Eucaristía. Las rutas y la configuración de ambas variantes se mantienen en `src/content/invitations.ts`; la ruta no obvia de la invitación completa no se copia en esta documentación.

## Requisitos

- Node.js 24 o superior
- pnpm 11 o superior

## Comandos

```bash
pnpm install
pnpm dev
pnpm validate
pnpm preview
```

`pnpm dev` inicia el sitio local. Revisa la variante de Eucaristía en `/invitacion/misa/` y consulta `src/content/invitations.ts` para abrir localmente la variante completa. `pnpm validate` revisa formato, lint, TypeScript/Astro, producción y el aislamiento entre invitaciones. `pnpm preview` permite revisar el resultado generado después de `pnpm build`.

## Edición rápida

- Información de la boda: `src/content/wedding.ts`
- Tipos de invitación, rutas, metadatos y secciones: `src/content/invitations.ts`
- Código de vestimenta y muestras de color: `weddingContent.dressCode` en `src/content/wedding.ts`
- Galería de la invitación: originales en `photos/home/`, orden y alt text en `homeGalleryPhotos` dentro de `src/content/photos.ts`
- Citas bíblicas y posiciones editoriales de galería: `weddingContent.biblicalQuotes` en `src/content/wedding.ts`
- Momentos, textos, asociaciones, orden y visibilidad de Cómo nos conocimos: `weddingContent.howWeMet.storyEntries` en `src/content/wedding.ts`
- Fotografías activas y alt text de Cómo nos conocimos: originales en `photos/history/` y manifiesto `howWeMetPhotos` en `src/content/photos.ts`
- Página generada de Cómo nos conocimos: `/como-nos-conocimos/`
- Capítulos, texto, orden y visibilidad del compromiso: `weddingContent.engagement.storyChapters` en `src/content/wedding.ts`
- Fotografías y alt text del compromiso: `engagementPhotos` en `src/content/photos.ts`
- Página generada del compromiso: `/compromiso/`
- Archivos originales: `photos/`
- Colores y estilos: `src/styles/global.css`
- Guía completa: `docs/CONTENT_EDITING.md`
- Despliegue: `docs/DEPLOYMENT.md`

La información todavía no confirmada aparece como pendiente. No reemplaces esos campos con contenido inventado.

## Estado actual

Los nombres, la fecha, los horarios, los lugares, las direcciones, las referencias de ubicación, los mapas, el código de vestimenta, las dos historias y la información de regalos contienen la información confirmada. También están pendientes la información adicional, la URL final y el favicon. Consulta `docs/CONTENT_EDITING.md` para la lista completa.

Ambas variantes usan `noindex, nofollow` y `robots.txt` bloquea el rastreo. La ruta no obvia reduce el descubrimiento accidental, pero no autentica a los invitados ni protege el contenido frente a quien conozca o adivine la URL.
