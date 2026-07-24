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
- `photos/`: originales de fotografías
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

## Relato del compromiso

- La fuente canónica del relato es `weddingContent.engagement.storyChapters` en `src/content/wedding.ts`.
- Cada capítulo tiene `id`, `title`, `dateLabel` y `entries`; el orden de ambos arreglos es el orden cronológico visible.
- Cada entrada usa `id`, `photoId`, `description` y `visible`; puede incluir `title` o `caption`.
- `photoId` debe coincidir con un ID de `engagementPhotos` en `src/content/photos.ts`. El build valida IDs, cobertura, textos y asociaciones.
- Para añadir una foto, registra primero su import, alt text, layout y position en `engagementPhotos`; después crea su entrada en el capítulo correcto.
- Para editar, ocultar o reordenar, cambia únicamente los datos. Una entrada con `description.pending: true` debe usar `visible: false`; los placeholders nunca se muestran.
- Para retirar un momento, elimina tanto la entrada como su elemento del manifiesto activo. Conserva el original cuando sea práctico.
- Las fotos de compromiso viven en `photos/engagement/` y no deben duplicarse en `galleryPhotos`.
- `/compromiso/` es compartida y privada por `noindex`; no debe nombrar ni enlazar la ruta completa ni serializar información exclusiva de la celebración.
- No inventar detalles personales ni inferir lugares o personas solo a partir de una imagen.

## Fotografías

- Conservar originales cuando sea práctico.
- Registrar rutas, alt text, captions y tratamiento visual únicamente en `src/content/photos.ts`; el orden del relato se mantiene en `storyChapters`.
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

No afirmar que un comando pasó si no se ejecutó exitosamente.

## Despliegue

- Salida: `dist/`
- Cloudflare Pages: opción principal
- GitHub Pages: soportado mediante `SITE_URL` y `BASE_PATH`
- No inventar la URL final; configurar `SITE_URL` solo cuando sea conocida
- No incluir secretos en el repositorio ni en archivos públicos
