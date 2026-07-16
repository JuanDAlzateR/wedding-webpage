import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".astro/**", ".pnpm-store/**", "dist/**", "node_modules/**"],
  },
  {
    files: ["*.config.mjs", "astro.config.mjs"],
    languageOptions: {
      globals: { process: "readonly" },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs["flat/recommended"],
];
