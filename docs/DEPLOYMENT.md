# Despliegue

El sitio genera archivos estáticos en `dist/`. No necesita servidor, base de datos ni credenciales en el navegador.

## Cloudflare Pages — recomendado

1. Publica este proyecto en un repositorio de GitHub o GitLab.
2. En Cloudflare, crea un proyecto de Pages conectado al repositorio.
3. Configura:
   - Comando de instalación: `pnpm install --frozen-lockfile`
   - Comando de build: `pnpm build`
   - Directorio de salida: `dist`
   - Node.js: 24
4. Agrega `SITE_URL` con la URL real, sin barra final, para habilitar canonical, sitemap y la imagen social absoluta.
5. No configures `BASE_PATH` para un dominio normal o una dirección `pages.dev`.

## GitHub Pages

Para `https://usuario.github.io/repositorio/` define durante el build:

```text
SITE_URL=https://usuario.github.io
BASE_PATH=/repositorio
```

Después ejecuta `pnpm build` y publica `dist/` mediante GitHub Actions. Las variables deben usar la URL y el nombre reales; no se incluye un workflow todavía porque este directorio no está asociado a un repositorio ni a una URL definitiva.

Si el repositorio se llama `usuario.github.io` o se usa un dominio propio, omite `BASE_PATH`.

## Verificación previa

```bash
pnpm install --frozen-lockfile
pnpm validate
pnpm preview
```

Comprueba la URL final compartiéndola en WhatsApp. La imagen social solo se publica como URL absoluta cuando `SITE_URL` está configurada.
