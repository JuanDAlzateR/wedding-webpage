import assert from "node:assert/strict";
import { log } from "node:console";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const projectRoot = cwd();
const distDirectory = join(projectRoot, "dist");
const invitationsDirectory = join(distDirectory, "invitacion");
const massDirectory = join(invitationsDirectory, "misa");
const rootHtmlPath = join(distDirectory, "index.html");

assert.ok(
  existsSync(distDirectory),
  "Falta dist/. Ejecuta pnpm build primero.",
);
assert.ok(
  existsSync(join(massDirectory, "index.html")),
  "No se generó la ruta pública de la eucaristía.",
);

const generatedInvitationDirectories = readdirSync(invitationsDirectory, {
  withFileTypes: true,
})
  .filter(
    (entry) =>
      entry.isDirectory() &&
      existsSync(join(invitationsDirectory, entry.name, "index.html")),
  )
  .map((entry) => entry.name);

assert.equal(
  generatedInvitationDirectories.length,
  2,
  "Deben generarse exactamente dos variantes bajo /invitacion/.",
);

const completeSlug = generatedInvitationDirectories.find(
  (directory) => directory !== "misa",
);
assert.ok(completeSlug, "No se generó la invitación completa.");

const massHtml = readFileSync(join(massDirectory, "index.html"), "utf8");
const rootHtml = readFileSync(rootHtmlPath, "utf8");
const completeHtml = readFileSync(
  join(invitationsDirectory, completeSlug, "index.html"),
  "utf8",
);

const sharedCeremonyText = [
  "Juan David",
  "Melisa",
  "12 de octubre de 2026",
  "10:00 a. m.",
  "Parroquia El Portal de Jesús",
  "Calle 33B Sur #46A-11, Envigado, Antioquia",
];

for (const text of sharedCeremonyText) {
  assert.ok(
    massHtml.includes(text),
    `La invitación de eucaristía no contiene: ${text}`,
  );
  assert.ok(rootHtml.includes(text), `La raíz no contiene: ${text}`);
  assert.ok(
    completeHtml.includes(text),
    `La invitación completa no contiene: ${text}`,
  );
}

const completeOnlyText = [
  "Celebración posterior",
  "Los datos de la celebración posterior",
  "Hora pendiente",
  "Lugar pendiente",
  "Dirección pendiente",
  "Indicaciones pendientes",
  "Ubicación pendiente",
  "Código de vestuario",
  'href="#encuentro"',
];

for (const text of completeOnlyText) {
  assert.ok(
    !massHtml.includes(text),
    `La invitación de eucaristía expone contenido exclusivo: ${text}`,
  );
  assert.ok(
    !rootHtml.includes(text),
    `La raíz expone contenido exclusivo: ${text}`,
  );
  assert.ok(
    completeHtml.includes(text),
    `La invitación completa no contiene: ${text}`,
  );
}

assert.ok(
  !massHtml.includes(completeSlug),
  "La invitación de eucaristía expone la ruta completa.",
);
assert.ok(!rootHtml.includes(completeSlug), "La raíz expone la ruta completa.");
assert.match(
  massHtml,
  /<meta name="robots" content="noindex, nofollow">/,
  "Falta noindex, nofollow en la invitación de eucaristía.",
);
assert.match(
  completeHtml,
  /<meta name="robots" content="noindex, nofollow">/,
  "Falta noindex, nofollow en la invitación completa.",
);
assert.match(
  rootHtml,
  /<meta name="robots" content="noindex, nofollow">/,
  "Falta noindex, nofollow en la raíz.",
);

const massHead = massHtml.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
for (const text of completeOnlyText) {
  assert.ok(
    !massHead.includes(text),
    `Los metadatos de eucaristía exponen contenido exclusivo: ${text}`,
  );
}

function assertHashLinksResolve(html, routeLabel) {
  const ids = new Set(
    [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]),
  );
  const targets = [...html.matchAll(/\shref="#([^"]+)"/g)].map(
    (match) => match[1],
  );

  for (const target of targets) {
    assert.ok(
      ids.has(target),
      `El enlace #${target} no tiene destino en ${routeLabel}.`,
    );
  }
}

assertHashLinksResolve(massHtml, "la invitación de eucaristía");
assertHashLinksResolve(rootHtml, "la raíz");
assertHashLinksResolve(completeHtml, "la invitación completa");

assert.ok(
  !existsSync(join(distDirectory, "sitemap-index.xml")) &&
    !existsSync(join(distDirectory, "sitemap-0.xml")),
  "No debe generarse un sitemap para las invitaciones.",
);
assert.match(
  readFileSync(join(distDirectory, "robots.txt"), "utf8"),
  /Disallow:\s*\/\s*$/m,
  "robots.txt debe bloquear el rastreo.",
);

const referencedTextAssets = [
  ...massHtml.matchAll(
    /(?:href|src)="\/assets\/([^"]+\.(?:css|js|json|map))"/g,
  ),
].map((match) => join(distDirectory, "assets", match[1]));

for (const assetPath of referencedTextAssets) {
  const asset = readFileSync(assetPath, "utf8");
  for (const text of completeOnlyText) {
    assert.ok(
      !asset.includes(text),
      `Un asset cargado por la invitación de eucaristía expone: ${text}`,
    );
  }
}

log(
  "Verificación de invitaciones superada: dos rutas, contenido aislado, metadatos privados y anclas válidas.",
);
