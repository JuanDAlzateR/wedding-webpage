# Despliegue

El sitio genera archivos estáticos en `dist/`. No necesita servidor, base de datos ni credenciales en el navegador. Las dos variantes y las páginas compartidas `/compromiso/` y `/como-nos-conocimos/` se generan como directorios con `index.html`, por lo que el acceso directo y la recarga funcionan en Cloudflare Pages.

## Cloudflare Pages — recomendado

1. Publica este proyecto en un repositorio de GitHub o GitLab.
2. En Cloudflare, crea un proyecto de Pages conectado al repositorio.
3. Configura:
   - Comando de instalación: `pnpm install --frozen-lockfile`
   - Comando de build: `pnpm build`
   - Directorio de salida: `dist`
   - Node.js: 24
4. Agrega `SITE_URL` con la URL real, sin barra final, para habilitar canonical y la imagen social absoluta.
5. No configures `BASE_PATH` para un dominio normal o una dirección `pages.dev`.

El alias público `/recepcion` se mantiene en `public/_redirects`. Astro copia ese archivo a `dist/_redirects` y Cloudflare Pages responde tanto a `/recepcion` como a `/recepcion/` con un `302` hacia `/invitacion/c7N4pQ2x/`. No existe una segunda página ni una segunda fuente de contenido.

## GitHub Pages

Para `https://usuario.github.io/repositorio/` define durante el build:

```text
SITE_URL=https://usuario.github.io
BASE_PATH=/repositorio
```

Después ejecuta `pnpm build` y publica `dist/` mediante GitHub Actions. Las variables deben usar la URL y el nombre reales; no se incluye un workflow todavía porque este directorio no está asociado a un repositorio ni a una URL definitiva.

Si el repositorio se llama `usuario.github.io` o se usa un dominio propio, omite `BASE_PATH`.

GitHub Pages no procesa el archivo `_redirects`; el alias `/recepcion` es específico del despliegue principal en Cloudflare Pages. Las rutas Astro generadas continúan funcionando en ambos proveedores.

## Verificación previa

```bash
pnpm install --frozen-lockfile
pnpm validate
pnpm preview
```

Comprueba la URL final compartiéndola en WhatsApp. Abre y recarga directamente ambas invitaciones, `/recepcion`, `/compromiso/` y `/como-nos-conocimos/`. En Cloudflare, confirma que `/recepcion` responde `302` con destino `/invitacion/c7N4pQ2x/`; `pnpm preview` no interpreta `_redirects`. La imagen social solo se publica como URL absoluta cuando `SITE_URL` está configurada.

## Privacidad de las invitaciones

Ambas variantes declaran `noindex, nofollow`, `robots.txt` bloquea el rastreo completo y no se genera sitemap. La variante completa no está enlazada desde páginas públicas, aunque se puede abrir intencionalmente mediante `/recepcion`. Estas medidas reducen descubrimientos accidentales, pero una URL estática no es autenticación ni confidencialidad.

La raíz `/` renderiza la variante de Eucaristía. Las rutas canónicas se definen en `src/content/invitations.ts` y el alias de Cloudflare en `public/_redirects`; evita añadir cualquiera de ellas a listados destinados a invitados salvo petición explícita.
