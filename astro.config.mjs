import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const site = process.env.SITE_URL;
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  output: "static",
  site,
  base,
  trailingSlash: "always",
  integrations: site ? [sitemap()] : [],
  build: {
    assets: "assets",
  },
});
