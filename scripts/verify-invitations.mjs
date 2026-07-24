import assert from "node:assert/strict";
import { log } from "node:console";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { cwd } from "node:process";

const projectRoot = cwd();
const distDirectory = join(projectRoot, "dist");
const invitationsDirectory = join(distDirectory, "invitacion");
const massDirectory = join(invitationsDirectory, "misa");
const rootHtmlPath = join(distDirectory, "index.html");
const engagementHtmlPath = join(distDirectory, "compromiso", "index.html");
const gallerySourceDirectory = join(projectRoot, "photos", "gallery");

assert.ok(
  existsSync(distDirectory),
  "Falta dist/. Ejecuta pnpm build primero.",
);
assert.ok(
  existsSync(join(massDirectory, "index.html")),
  "No se generó la ruta pública de la Eucaristía.",
);
assert.ok(
  existsSync(engagementHtmlPath),
  "No se generó la experiencia de compromiso.",
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
const engagementHtml = readFileSync(engagementHtmlPath, "utf8");

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
    `La invitación de Eucaristía no contiene: ${text}`,
  );
  assert.ok(rootHtml.includes(text), `La raíz no contiene: ${text}`);
  assert.ok(
    completeHtml.includes(text),
    `La invitación completa no contiene: ${text}`,
  );
}

const sharedInvitationText = [
  "Celebración Litúrgica",
  "Cerca de Viva Envigado",
  "Ef 5:31–32",
  "Tobías 8:9",
  "Ten misericordia de nosotros, oh Señor",
  "Cant 2:16",
  "Cant 1:2, 15–17",
  "Cant 2:10–11",
  "Cant 4:9–10",
  "Galería de nuestro amor",
  "Nuestra historia",
  "Código de vestimenta",
  "Cóctel clásico",
  "vestido midi o largo, o conjunto de pantalón de corte amplio.",
  "traje o blazer con pantalón de vestir.",
  "Por respeto al carácter sagrado de la celebración, elige atuendos sin escotes.",
  "El código de vestimenta hace parte de los detalles que hemos elegido cuidadosamente para este día, por lo que apreciamos su cumplimiento.",
  "Naranja tigre",
  "Albaricoque",
  "Azul hielo",
  "Azul bebé",
  "Azul cielo",
  "Gracias por acompañarnos y por respetar este deseo en una ocasión tan especial para nosotros.",
  "La celebración dará inicio puntualmente a las 10:00 a. m. Te invitamos a llegar con anticipación para disponernos juntos a vivir la Santa Misa desde el comienzo.",
  "Un detalle para nosotros",
  "Su presencia y compañía son nuestro mejor regalo",
  "lluvia de sobres",
  "Descubrir nuestra historia",
  'href="/compromiso/"',
];

for (const text of sharedInvitationText) {
  assert.ok(
    massHtml.includes(text),
    `La invitación de Eucaristía no contiene el contenido compartido: ${text}`,
  );
  assert.ok(
    rootHtml.includes(text),
    `La raíz no contiene el contenido compartido: ${text}`,
  );
  assert.ok(
    completeHtml.includes(text),
    `La invitación completa no contiene el contenido compartido: ${text}`,
  );
}

const completeOnlyText = [
  "Celebración posterior",
  "Ocupas un lugar muy especial en nuestro corazón y en nuestra historia.",
  "Te invitamos a compartir con nosotros el almuerzo",
  "12:30 p. m.",
  "6:00 p. m.",
  "2026-10-12T12:30:00-05:00",
  "2026-10-12T18:00:00-05:00",
  "Noviciado Hermanas Oblatas de San Francisco de Sales",
  "Carrera 32 #71 Sur-240, Poblado del Sur, Sabaneta, Antioquia",
  "Cerca de la Parroquia San Felipe Apóstol",
  "Ver ubicación de la celebración en Google Maps",
  "Noviciado%20Hermanas%20Oblatas%20de%20San%20Francisco%20de%20Sales",
  "Agradeceremos tu pronta confirmación",
  "https://forms.gle/ubKwM6ez5RWDWNKy8",
  "Por favor, hazlo antes del 12 de septiembre.",
  "Recuerda llevar contigo la tarjeta de invitación color naranja con tu nombre.",
  'href="#encuentro"',
  'href="#confirmacion"',
];

for (const text of completeOnlyText) {
  assert.ok(
    !massHtml.includes(text),
    `La invitación de Eucaristía expone contenido exclusivo: ${text}`,
  );
  assert.ok(
    !rootHtml.includes(text),
    `La raíz expone contenido exclusivo: ${text}`,
  );
  assert.ok(
    completeHtml.includes(text),
    `La invitación completa no contiene: ${text}`,
  );
  assert.ok(
    !engagementHtml.includes(text),
    `La experiencia de compromiso expone contenido exclusivo: ${text}`,
  );
}

const engagementText = [
  "Cómo nos comprometimos",
  "Durante tres domingos, un juego de pistas",
  "El juego comienza",
  "La aventura continúa",
  "El destino final",
  "Domingo de Resurrección · 5 de abril de 2026",
  "Juan David le pidió que fuera su esposa",
];

for (const text of engagementText) {
  assert.ok(
    engagementHtml.includes(text),
    `La experiencia de compromiso no contiene: ${text}`,
  );
}

const engagementPhotoMarkers = [
  "april05-photo1",
  "april05-photo2",
  "april05-photo3",
  "april05-photo4",
  "april05-photo5",
  "april12-photo1",
  "april12-photo2",
  "april12-photo3",
  "april12-photo4",
  "april12-photo5",
  "april12-photo6",
  "april19-photo1",
  "april19-photo2",
  "april19-photo3",
  "april19-photo4",
  "april19-photo5",
  "april19-photo6",
  "april19-photo7",
  "april19-photo8",
];

for (const marker of engagementPhotoMarkers) {
  assert.ok(
    engagementHtml.includes(marker),
    `La experiencia de compromiso no contiene la foto: ${marker}`,
  );
  assert.ok(
    !massHtml.includes(marker) && !rootHtml.includes(marker),
    `La invitación de Eucaristía carga una foto de compromiso: ${marker}`,
  );
  assert.ok(
    !completeHtml.includes(marker),
    `La invitación completa carga una foto de compromiso: ${marker}`,
  );
}

const removedCelebrationPlaceholders = [
  "Hora pendiente",
  "Lugar pendiente",
  "Dirección pendiente",
  "Indicaciones pendientes",
  "Ubicación pendiente",
  "Los datos de la celebración posterior se publicarán",
];

for (const text of removedCelebrationPlaceholders) {
  assert.ok(
    !completeHtml.includes(text),
    `La invitación completa conserva un placeholder reemplazado: ${text}`,
  );
}

const removedInvitationText = [
  "Una vida, una historia, un sí.",
  "Nuestra liturgia",
  "A dos cuadras de Viva Envigado",
  "Instantes compartidos",
  "La liturgia comienza puntualmente a las 10:00 a. m.",
  "La liturgia se celebrará en la Parroquia El Portal de Jesús",
  "Código de vestuario pendiente",
  "Publicaremos la guía de vestuario cuando esté confirmada.",
  "Cóctel elegante",
  'href="#fotos"',
  ">Fotos<",
];

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
]) {
  for (const text of removedInvitationText) {
    assert.ok(
      !html.includes(text),
      `Permanece texto reemplazado en ${routeLabel}: ${text}`,
    );
  }
}

const biblicalQuoteIds = [
  "ephesians-unity",
  "tobit-prayer",
  "song-belonging",
  "song-beauty",
  "song-spring",
  "song-heart",
];

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
]) {
  for (const quoteId of biblicalQuoteIds) {
    assert.ok(
      html.includes(`data-biblical-quote-id="${quoteId}"`),
      `Falta la cita bíblica "${quoteId}" en ${routeLabel}.`,
    );
  }
}

const galleryImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".heic",
  ".webp",
  ".avif",
]);
const expectedGalleryPhotoIds = readdirSync(gallerySourceDirectory, {
  withFileTypes: true,
})
  .filter(
    (entry) =>
      entry.isFile() &&
      galleryImageExtensions.has(extname(entry.name).toLowerCase()),
  )
  .map((entry) => basename(entry.name, extname(entry.name)))
  .sort();

function assertGalleryCoverage(html, routeLabel) {
  const galleryPhotoIds = [...html.matchAll(/data-gallery-photo-id="([^"]+)"/g)]
    .map((match) => match[1])
    .sort();

  assert.equal(
    galleryPhotoIds.length,
    expectedGalleryPhotoIds.length,
    `La galería de ${routeLabel} no cubre todas las imágenes fuente.`,
  );
  assert.deepEqual(
    galleryPhotoIds,
    expectedGalleryPhotoIds,
    `La galería de ${routeLabel} no cubre exactamente photos/gallery.`,
  );
  assert.equal(
    new Set(galleryPhotoIds).size,
    galleryPhotoIds.length,
    `La galería de ${routeLabel} repite fotografías.`,
  );

  const gallerySection =
    html.match(/<section[^>]*id="galeria"[\s\S]*?<\/section>/)?.[0] ?? "";
  const imageSources = [
    ...gallerySection.matchAll(/\ssrc="([^"]+\.(?:webp|avif|png|jpe?g))"/g),
  ].map((match) => match[1]);

  assert.equal(
    imageSources.length,
    expectedGalleryPhotoIds.length,
    `La galería de ${routeLabel} no genera un src por fotografía.`,
  );

  for (const source of imageSources) {
    const relativeSource = decodeURIComponent(source)
      .replace(/^https?:\/\/[^/]+/, "")
      .replace(/^\/+/, "");
    assert.ok(
      existsSync(join(distDirectory, relativeSource)),
      `No existe el asset de galería "${source}" en ${routeLabel}.`,
    );
  }
}

assertGalleryCoverage(massHtml, "la invitación de Eucaristía");
assertGalleryCoverage(rootHtml, "la raíz");
assertGalleryCoverage(completeHtml, "la invitación completa");
assert.doesNotMatch(
  engagementHtml,
  /data-gallery-photo-id=/,
  "La experiencia de compromiso carga la galería general.",
);

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
  [engagementHtml, "la experiencia de compromiso"],
]) {
  assert.ok(
    !html.includes("photos.app.goo.gl"),
    `${routeLabel} conserva el enlace obsoleto de Google Photos.`,
  );
}

assert.ok(
  !massHtml.includes(completeSlug),
  "La invitación de Eucaristía expone la ruta completa.",
);
assert.ok(!rootHtml.includes(completeSlug), "La raíz expone la ruta completa.");
assert.ok(
  !engagementHtml.includes(completeSlug),
  "La experiencia de compromiso expone la ruta completa.",
);
assert.match(
  massHtml,
  /<meta name="robots" content="noindex, nofollow">/,
  "Falta noindex, nofollow en la invitación de Eucaristía.",
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
assert.match(
  engagementHtml,
  /<meta name="robots" content="noindex, nofollow">/,
  "Falta noindex, nofollow en la experiencia de compromiso.",
);

const massHead = massHtml.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
for (const text of completeOnlyText) {
  assert.ok(
    !massHead.includes(text),
    `Los metadatos de Eucaristía exponen contenido exclusivo: ${text}`,
  );
}

const engagementHead =
  engagementHtml.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
for (const text of completeOnlyText) {
  assert.ok(
    !engagementHead.includes(text),
    `Los metadatos de compromiso exponen contenido exclusivo: ${text}`,
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

assertHashLinksResolve(massHtml, "la invitación de Eucaristía");
assertHashLinksResolve(rootHtml, "la raíz");
assertHashLinksResolve(completeHtml, "la invitación completa");
assertHashLinksResolve(engagementHtml, "la experiencia de compromiso");

function assertOrderedMarkers(html, markers, routeLabel, markerKind) {
  let previousIndex = -1;

  for (const marker of markers) {
    const currentIndex = html.indexOf(marker);
    assert.ok(
      currentIndex >= 0,
      `Falta ${markerKind} "${marker}" en ${routeLabel}.`,
    );
    assert.ok(
      currentIndex > previousIndex,
      `El orden de ${markerKind} no coincide en ${routeLabel}: ${marker}.`,
    );
    previousIndex = currentIndex;
  }
}

const sharedSectionOrder = [
  'id="inicio"',
  'id="eucaristia"',
  'id="vestuario"',
  'id="regalos"',
  'id="historia"',
  'id="galeria"',
];
const completeSectionOrder = [
  'id="inicio"',
  'id="eucaristia"',
  'id="encuentro"',
  'id="confirmacion"',
  'id="vestuario"',
  'id="regalos"',
  'id="historia"',
  'id="galeria"',
];

assertOrderedMarkers(
  massHtml,
  sharedSectionOrder,
  "la invitación de Eucaristía",
  "secciones",
);
assertOrderedMarkers(rootHtml, sharedSectionOrder, "la raíz", "secciones");
assertOrderedMarkers(
  completeHtml,
  completeSectionOrder,
  "la invitación completa",
  "secciones",
);

function assertDesktopNavigationOrder(html, expectedLinks, routeLabel) {
  const navigation =
    html.match(
      /<nav class="site-header__nav site-header__nav--desktop"[\s\S]*?<\/nav>/,
    )?.[0] ?? "";

  assert.ok(navigation, `Falta la navegación de escritorio en ${routeLabel}.`);
  assertOrderedMarkers(
    navigation,
    expectedLinks.map((href) => `href="${href}"`),
    routeLabel,
    "enlaces de navegación",
  );
}

const sharedNavigationOrder = [
  "#inicio",
  "#eucaristia",
  "#vestuario",
  "#regalos",
  "#historia",
  "#galeria",
];
const completeNavigationOrder = [
  "#inicio",
  "#eucaristia",
  "#encuentro",
  "#confirmacion",
  "#vestuario",
  "#regalos",
  "#historia",
  "#galeria",
];

assertDesktopNavigationOrder(
  massHtml,
  sharedNavigationOrder,
  "la invitación de Eucaristía",
);
assertDesktopNavigationOrder(rootHtml, sharedNavigationOrder, "la raíz");
assertDesktopNavigationOrder(
  completeHtml,
  completeNavigationOrder,
  "la invitación completa",
);

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
  [engagementHtml, "la experiencia de compromiso"],
]) {
  assert.doesNotMatch(
    html,
    /\[Texto pendiente:/,
    `Se publicó una nota editorial en ${routeLabel}.`,
  );

  for (const placeholder of [
    "Historia pendiente",
    "La historia de la pareja se agregará aquí cuando el texto esté listo.",
    "Código de vestuario pendiente",
    "Publicaremos la guía de vestuario cuando esté confirmada.",
  ]) {
    assert.ok(
      !html.includes(placeholder),
      `Se publicó un placeholder editorial en ${routeLabel}: ${placeholder}`,
    );
  }
}

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
      `Un asset cargado por la invitación de Eucaristía expone: ${text}`,
    );
  }
}

log(
  "Verificación superada: invitaciones aisladas, contenido compartido, compromiso privado, fotos y anclas válidas.",
);
