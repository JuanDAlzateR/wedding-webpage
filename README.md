# Sitio web de la boda

Sitio estático, móvil primero y exclusivamente en español. Está construido con Astro, TypeScript y CSS propio, sin backend, base de datos, autenticación ni servicios de pago.

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

`pnpm dev` inicia el sitio local. `pnpm validate` revisa formato, lint, TypeScript/Astro y producción. `pnpm preview` permite revisar el resultado generado después de `pnpm build`.

## Edición rápida

- Información de la boda: `src/content/wedding.ts`
- Fotografías y orden de galería: `src/content/photos.ts`
- Archivos originales: `photos/`
- Colores y estilos: `src/styles/global.css`
- Guía completa: `docs/CONTENT_EDITING.md`
- Despliegue: `docs/DEPLOYMENT.md`

La información todavía no confirmada aparece como pendiente. No reemplaces esos campos con contenido inventado.

## Estado actual

El diseño y todas las secciones solicitadas están implementados. Antes de publicar deben actualizarse los nombres, fecha, hora, lugar, dirección, mapa, dress code, historias, información adicional, metadatos y favicon. Consulta `docs/CONTENT_EDITING.md` para la lista completa.
