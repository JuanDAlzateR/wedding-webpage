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
- `src/content/photos.ts`: manifiesto, orden, alt text y punto focal de imágenes
- `photos/`: originales de fotografías
- `src/components/`: secciones visuales
- `src/styles/global.css`: sistema visual y responsive
- `docs/`: edición y despliegue

## Contenido

- No inventar nombres, fechas, lugares, historias, políticas, contactos ni enlaces.
- Mantener placeholders centralizados y claramente marcados.
- La historia del compromiso debe permanecer pendiente hasta recibir el texto real.
- Las secciones opcionales sin información confirmada deben permanecer ocultas.
- El sitio es solo en español; no añadir traducciones ni selector de idioma salvo petición explícita.

## Fotografías

- Conservar originales cuando sea práctico.
- Registrar rutas, orden, alt text y captions únicamente en `src/content/photos.ts`.
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

`pnpm test` ejecuta la comprobación estructural de Astro; no existe actualmente una suite de pruebas unitarias porque el sitio no contiene lógica de negocio.

## Validación obligatoria

Después de un cambio relevante:

1. Ejecutar `pnpm format:check`.
2. Ejecutar `pnpm lint`.
3. Ejecutar `pnpm check`.
4. Ejecutar `pnpm build`.
5. Revisar móvil y escritorio cuando cambie la interfaz.
6. Verificar imágenes, enlaces, placeholders, foco y reduced motion.

No afirmar que un comando pasó si no se ejecutó exitosamente.

## Despliegue

- Salida: `dist/`
- Cloudflare Pages: opción principal
- GitHub Pages: soportado mediante `SITE_URL` y `BASE_PATH`
- No inventar la URL final; configurar `SITE_URL` solo cuando sea conocida
- No incluir secretos en el repositorio ni en archivos públicos
