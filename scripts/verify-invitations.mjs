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
const redirectsSourcePath = join(projectRoot, "public", "_redirects");
const redirectsBuildPath = join(distDirectory, "_redirects");
const engagementHtmlPath = join(distDirectory, "compromiso", "index.html");
const howWeMetHtmlPath = join(
  distDirectory,
  "como-nos-conocimos",
  "index.html",
);
const gallerySourceDirectory = join(projectRoot, "photos", "gallery");
const howWeMetSourceDirectory = join(projectRoot, "photos", "history");
const howWeMetArchiveDirectory = join(
  projectRoot,
  "photos",
  "archive",
  "how-we-met-previous",
);

assert.ok(
  existsSync(distDirectory),
  "Falta dist/. Ejecuta pnpm build primero.",
);
assert.ok(
  existsSync(redirectsSourcePath),
  "Falta public/_redirects con el alias público de la Recepción.",
);
assert.ok(
  existsSync(redirectsBuildPath),
  "El build no copió public/_redirects a dist/.",
);
assert.ok(
  existsSync(join(massDirectory, "index.html")),
  "No se generó la ruta pública de la Eucaristía.",
);
assert.ok(
  existsSync(engagementHtmlPath),
  "No se generó la experiencia de compromiso.",
);
assert.ok(
  existsSync(howWeMetHtmlPath),
  "No se generó la experiencia Cómo nos conocimos.",
);
assert.ok(
  existsSync(howWeMetArchiveDirectory),
  "No se conservó el archivo de la colección anterior de Cómo nos conocimos.",
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

const completeInvitationDestination = `/invitacion/${completeSlug}/`;
const expectedReceptionRedirects = [
  `/recepcion ${completeInvitationDestination} 302`,
  `/recepcion/ ${completeInvitationDestination} 302`,
];

function getRedirectRules(filePath) {
  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

assert.deepEqual(
  getRedirectRules(redirectsSourcePath),
  expectedReceptionRedirects,
  "public/_redirects no define exactamente el alias público esperado.",
);
assert.deepEqual(
  getRedirectRules(redirectsBuildPath),
  expectedReceptionRedirects,
  "dist/_redirects no conserva el destino y estado del alias público.",
);
assert.ok(
  !existsSync(join(distDirectory, "recepcion")),
  "El build generó una página duplicada en /recepcion en lugar de un alias.",
);

const massHtml = readFileSync(join(massDirectory, "index.html"), "utf8");
const rootHtml = readFileSync(rootHtmlPath, "utf8");
const completeHtml = readFileSync(
  join(invitationsDirectory, completeSlug, "index.html"),
  "utf8",
);
const engagementHtml = readFileSync(engagementHtmlPath, "utf8");
const howWeMetHtml = readFileSync(howWeMetHtmlPath, "utf8");

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
  [engagementHtml, "la experiencia de compromiso"],
  [howWeMetHtml, "Cómo nos conocimos"],
]) {
  assert.doesNotMatch(
    html,
    /href=["']\/recepcion\/?(?:["'#?])/,
    `${routeLabel} enlaza el alias público de la Recepción.`,
  );
}

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
  "Dos capítulos de nuestra historia",
  "Cómo nos conocimos",
  "Cómo nos comprometimos",
  "Código de vestimenta",
  "Cóctel clásico",
  "Vestido midi o largo, o conjunto de pantalón de corte amplio.",
  "Traje o blazer con pantalón de vestir.",
  "Por respeto al carácter sagrado de la celebración,",
  "<strong>elige atuendos sin escotes.</strong>",
  "El código de vestimenta hace parte de los detalles que hemos elegido cuidadosamente para este día, por lo que apreciamos su cumplimiento.",
  "Naranja tigre",
  "Albaricoque",
  "Azul hielo",
  "Azul bebé",
  "Azul cielo",
  "Azul marino",
  "Azul navy",
  "Gracias por acompañarnos y por respetar este deseo en una ocasión tan especial para nosotros.",
  "La Celebración dará inicio puntualmente a las 10:00 a. m. Te invitamos a llegar con anticipación para disponernos juntos a vivir la Santa Misa desde el comienzo.",
  "Nuestro regalo",
  "Lo más valioso para nosotros será contar con sus oraciones; de verdad, las necesitamos.",
  "Su presencia en este día tan especial es un don que agradecemos de corazón.",
  "Si, además, desean tener un detalle con nosotros, lo recibiremos con mucho cariño.",
  "Puedes elegir la opción que te resulte más cómoda.",
  "lluvia de sobres",
  "Cuenta de Ahorros Bancolombia",
  "331-561467-61",
  "Si durante la transferencia aparece la opción de concepto o categoría, puedes seleccionar «Regalo».",
  "Llave",
  "@Alzate6073",
  "Descubrir nuestra historia",
  'href="/compromiso/"',
  'href="/como-nos-conocimos/"',
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
  "Recepción",
  "Ocupas un lugar muy especial en nuestro corazón y en nuestra historia.",
  "Celebración del Sacramento",
  "Te invitamos a compartir con nosotros el almuerzo",
  "una tarde de juegos, música, fiesta y alegría.",
  "12:30 p. m.",
  "6:30 p. m.",
  "2026-10-12T12:30:00-05:00",
  "2026-10-12T18:30:00-05:00",
  "Noviciado Hermanas Oblatas de San Francisco de Sales",
  "Carrera 32 #71 Sur-240, Poblado del Sur, Sabaneta, Antioquia",
  "Cerca de la Parroquia San Felipe Apóstol",
  "Ver ubicación de la Recepción en Google Maps",
  "Noviciado%20Hermanas%20Oblatas%20de%20San%20Francisco%20de%20Sales",
  "Agradeceremos tu pronta confirmación",
  "https://forms.gle/ubKwM6ez5RWDWNKy8",
  "Por favor, hazlo antes del 1 de septiembre.",
  "Recuerda llevar contigo la tarjeta de invitación color naranja con tu nombre.",
  "el acceso se realizará conforme a la lista de invitados confirmados.",
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
  assert.ok(
    !howWeMetHtml.includes(text),
    `La experiencia Cómo nos conocimos expone contenido exclusivo: ${text}`,
  );
}

const engagementText = [
  "Cómo nos comprometimos",
  "Durante tres domingos, un juego de pistas",
  "El juego comienza",
  "La aventura continúa",
  "El destino final",
  "Domingo de Resurrección · 5 de abril de 2026",
  "pedí a Melisa que fuera mi esposa",
];

for (const text of engagementText) {
  assert.ok(
    engagementHtml.includes(text),
    `La experiencia de compromiso no contiene: ${text}`,
  );
}

const howWeMetText = [
  "Cómo nos conocimos",
  "Un recorrido por los encuentros, las oraciones y los detalles",
  "Un sí de confianza que nos trajo hasta aquí",
  "24 de febrero de 2024",
  "Solo confía.",
  "sellamos nuestro compromiso, con la bendición de Dios",
  "El 25 de febrero fuimos juntos al Ave María. También es el lugar donde casi terminamos",
];

for (const text of howWeMetText) {
  assert.ok(
    howWeMetHtml.includes(text),
    `La experiencia Cómo nos conocimos no contiene: ${text}`,
  );
}

const howWeMetEntrySizes = [
  ...howWeMetHtml.matchAll(
    /<article[^>]*data-story-entry="[^"]+"[\s\S]*?<\/article>/g,
  ),
].map(
  (match) => [...match[0].matchAll(/data-how-we-met-photo-id="[^"]+"/g)].length,
);
assert.deepEqual(
  howWeMetEntrySizes,
  [1, 1, 1, 4, 1, 1, 2, 6, 1, 1],
  "Cómo nos conocimos no conserva las asociaciones editoriales del relato.",
);
assert.doesNotMatch(
  howWeMetHtml,
  /Texto provisional|Texto historia \d+/,
  "Cómo nos conocimos expone placeholders editoriales.",
);
assert.ok(
  !howWeMetHtml.includes(
    ", sí, spoiler alert: dos años después fue en ese lugar donde nos comprometimos.",
  ),
  "Cómo nos conocimos conserva la cláusula retirada del spoiler.",
);

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
  assert.ok(
    !howWeMetHtml.includes(marker),
    `Cómo nos conocimos carga una foto de compromiso: ${marker}`,
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
  "Su presencia y compañía son nuestro mejor regalo. Si desean tener un detalle con nosotros, recibiremos con mucho cariño lluvia de sobres.",
  "Celebración posterior",
  "celebración posterior",
  "celebración del sacramento",
  "una tarde de juegos, música, alegría y fiesta.",
  "Por favor, hazlo antes del 12 de septiembre.",
  "6:00 p. m.",
  "2026-10-12T18:00:00-05:00",
  "Un detalle para nosotros",
  "1032485387",
  "Si, además, desean tener un detalle con nosotros, recibiremos con mucho cariño su lluvia de sobres. Si les resulta más cómodo, también podrán enviar su obsequio a nuestra llave",
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

const expectedGiftOptionMarkers = [
  'data-gift-option-id="envelope"',
  'data-gift-option-id="bank-account"',
  'data-gift-option-id="key"',
];

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
]) {
  const giftSection =
    html.match(/<section[^>]*\bid="regalos"[^>]*>[\s\S]*?<\/section>/)?.[0] ??
    "";

  assert.ok(giftSection, `No se encontró Nuestro regalo en ${routeLabel}.`);

  const strongMatches = [
    ...giftSection.matchAll(/<strong\b[^>]*>([\s\S]*?)<\/strong>/g),
  ];
  assert.equal(
    strongMatches.length,
    1,
    `Nuestro regalo debe contener un único <strong> en ${routeLabel}.`,
  );
  assert.equal(
    strongMatches[0]?.[1],
    "lluvia de sobres",
    `El énfasis de Nuestro regalo no contiene únicamente lluvia de sobres en ${routeLabel}.`,
  );

  let previousOptionIndex = -1;
  for (const marker of expectedGiftOptionMarkers) {
    const optionIndex = giftSection.indexOf(marker);
    assert.ok(
      optionIndex > previousOptionIndex,
      `Las opciones de Nuestro regalo no conservan su orden en ${routeLabel}.`,
    );
    previousOptionIndex = optionIndex;
  }

  assert.equal(
    [...giftSection.matchAll(/\sdata-gift-copy(?:=|\s|>)/g)].length,
    2,
    `Nuestro regalo no contiene exactamente dos controles de copiado en ${routeLabel}.`,
  );
  assert.ok(
    giftSection.includes('data-copy-value="331-561467-61"'),
    `La cuenta de Bancolombia no está asociada a su control de copiado en ${routeLabel}.`,
  );
  assert.ok(
    giftSection.includes('data-copy-value="@Alzate6073"'),
    `La llave no está asociada a su control de copiado en ${routeLabel}.`,
  );
  assert.ok(
    giftSection.includes('aria-live="polite"'),
    `Nuestro regalo no anuncia el resultado del copiado en ${routeLabel}.`,
  );
}

const dressColorOrder = [
  "Naranja tigre",
  "Albaricoque",
  "Azul hielo",
  "Azul bebé",
  "Azul cielo",
  "Azul marino",
  "Azul navy",
];

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
]) {
  assertOrderedMarkers(
    html,
    dressColorOrder,
    routeLabel,
    "colores restringidos",
  );
  assert.equal(
    [...html.matchAll(/class="dress-colors__swatch"/g)].length,
    dressColorOrder.length,
    `${routeLabel} no contiene exactamente siete muestras de color.`,
  );
}

const accessNotice =
  completeHtml.match(/<aside class="editorial-notice"[\s\S]*?<\/aside>/)?.[0] ??
  "";
const emphasizedAccessRequirement =
  "el acceso se realizará conforme a la lista de invitados confirmados. Favor confirmar la asistencia antes del 1 de septiembre.";

assert.ok(
  accessNotice,
  "La invitación completa no contiene el aviso de acceso.",
);
assert.equal(
  [...accessNotice.matchAll(/<strong>/g)].length,
  1,
  "El aviso de acceso debe contener exactamente un énfasis semántico.",
);
assert.ok(
  accessNotice.includes(`<strong>${emphasizedAccessRequirement}</strong>`),
  "El aviso de acceso no enfatiza exactamente el requisito confirmado.",
);

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

function getExpectedPhotoIds(sourceDirectory) {
  return readdirSync(sourceDirectory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        galleryImageExtensions.has(extname(entry.name).toLowerCase()),
    )
    .map((entry) => basename(entry.name, extname(entry.name)))
    .sort();
}

const archivedFileCount = readdirSync(howWeMetArchiveDirectory, {
  withFileTypes: true,
  recursive: true,
}).filter((entry) => entry.isFile()).length;
assert.equal(
  archivedFileCount,
  89,
  "El archivo anterior de Cómo nos conocimos no conserva sus 89 archivos.",
);

function assertPhotoCoverage(html, routeLabel, sourceDirectory, dataAttribute) {
  const expectedPhotoIds = getExpectedPhotoIds(sourceDirectory);
  const attributePattern = new RegExp(`${dataAttribute}="([^"]+)"`, "g");
  const renderedPhotoIds = [...html.matchAll(attributePattern)]
    .map((match) => match[1])
    .sort();

  assert.equal(
    renderedPhotoIds.length,
    expectedPhotoIds.length,
    `${routeLabel} no cubre todas las imágenes fuente.`,
  );
  assert.deepEqual(
    renderedPhotoIds,
    expectedPhotoIds,
    `${routeLabel} no cubre exactamente su colección.`,
  );
  assert.equal(
    new Set(renderedPhotoIds).size,
    renderedPhotoIds.length,
    `${routeLabel} repite fotografías.`,
  );

  const figurePattern = new RegExp(
    `<figure[^>]*${dataAttribute}="[^"]+"[^>]*>[\\s\\S]*?<\\/figure>`,
    "g",
  );
  const photoFigures = [...html.matchAll(figurePattern)].map(
    (match) => match[0],
  );

  assert.equal(
    photoFigures.length,
    expectedPhotoIds.length,
    `${routeLabel} no genera una figura por fotografía.`,
  );

  for (const figure of photoFigures) {
    const source = figure.match(
      /\ssrc="([^"]+\.(?:webp|avif|png|jpe?g))"/,
    )?.[1];
    assert.ok(source, `Una fotografía de ${routeLabel} no genera src.`);

    const relativeSource = decodeURIComponent(source)
      .replace(/^https?:\/\/[^/]+/, "")
      .replace(/^\/+/, "");
    assert.ok(
      existsSync(join(distDirectory, relativeSource)),
      `No existe el asset "${source}" en ${routeLabel}.`,
    );
  }
}

assertPhotoCoverage(
  massHtml,
  "la galería de la invitación de Eucaristía",
  gallerySourceDirectory,
  "data-home-gallery-photo-id",
);
assertPhotoCoverage(
  rootHtml,
  "la galería de la raíz",
  gallerySourceDirectory,
  "data-home-gallery-photo-id",
);
assertPhotoCoverage(
  completeHtml,
  "la galería de la invitación completa",
  gallerySourceDirectory,
  "data-home-gallery-photo-id",
);
assertPhotoCoverage(
  howWeMetHtml,
  "Cómo nos conocimos",
  howWeMetSourceDirectory,
  "data-how-we-met-photo-id",
);

const archivedPhotoMarkers = getExpectedPhotoIds(howWeMetArchiveDirectory);
assert.equal(
  archivedPhotoMarkers.length,
  69,
  "El archivo anterior no conserva sus 69 fotografías fuente.",
);
for (const marker of archivedPhotoMarkers) {
  assert.ok(
    !howWeMetHtml.includes(marker),
    `Cómo nos conocimos todavía carga una fotografía archivada: ${marker}`,
  );
}
assert.ok(
  !howWeMetHtml.includes("how-we-met-previous"),
  "Cómo nos conocimos expone la ruta interna del archivo fotográfico.",
);

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
]) {
  assert.doesNotMatch(
    html,
    /data-how-we-met-photo-id=/,
    `${routeLabel} carga fotografías de Cómo nos conocimos.`,
  );
}

assert.doesNotMatch(
  engagementHtml,
  /data-(?:home-gallery|how-we-met)-photo-id=/,
  "La experiencia de compromiso mezcla otra colección fotográfica.",
);
assert.doesNotMatch(
  howWeMetHtml,
  /data-home-gallery-photo-id=/,
  "Cómo nos conocimos carga la galería de la invitación.",
);

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
  [engagementHtml, "la experiencia de compromiso"],
  [howWeMetHtml, "Cómo nos conocimos"],
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
assert.ok(
  !howWeMetHtml.includes(completeSlug),
  "Cómo nos conocimos expone la ruta completa.",
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
assert.match(
  howWeMetHtml,
  /<meta name="robots" content="noindex, nofollow">/,
  "Falta noindex, nofollow en Cómo nos conocimos.",
);
assert.match(
  howWeMetHtml,
  /data-return-link/,
  "Cómo nos conocimos no conserva los enlaces de retorno contextual.",
);
assert.match(
  howWeMetHtml,
  /window\.history\.back\(\)/,
  "Cómo nos conocimos no conserva history.back() para volver a la invitación.",
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

const howWeMetHead = howWeMetHtml.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
for (const text of completeOnlyText) {
  assert.ok(
    !howWeMetHead.includes(text),
    `Los metadatos de Cómo nos conocimos exponen contenido exclusivo: ${text}`,
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
assertHashLinksResolve(howWeMetHtml, "Cómo nos conocimos");

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

const homeGalleryEditorialOrder = [
  'data-biblical-quote-id="song-belonging"',
  'data-home-gallery-photo-id="a7c192de-c45e-4ffe-be17-3ea6e2a57f40"',
  'data-home-gallery-photo-id="IMG_4780"',
  'data-home-gallery-photo-id="IMG_1421"',
  'data-home-gallery-photo-id="9363abd4-99b9-4e0d-a271-5db9c23aa80d"',
  'data-biblical-quote-id="song-beauty"',
  'data-home-gallery-photo-id="IMG_20260517_215026"',
  'data-home-gallery-photo-id="IMG_20260518_154633"',
  'data-biblical-quote-id="song-spring"',
  'data-home-gallery-photo-id="IMG_20240928_003343"',
  'data-home-gallery-photo-id="IMG_20251225_000451"',
  'data-biblical-quote-id="song-heart"',
  'data-home-gallery-photo-id="IMG_20251226_212606"',
  'data-home-gallery-photo-id="IMG_3104_Original"',
];

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
]) {
  assertOrderedMarkers(
    html,
    homeGalleryEditorialOrder,
    routeLabel,
    "secuencia editorial de galería",
  );
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

function assertMobileNavigationOrder(html, expectedLinks, routeLabel) {
  const navigation =
    html.match(
      /<details class="site-header__menu">[\s\S]*?<nav aria-label="Navegación principal en móvil">[\s\S]*?<\/nav>[\s\S]*?<\/details>/,
    )?.[0] ?? "";

  assert.ok(navigation, `Falta la navegación móvil en ${routeLabel}.`);
  assertOrderedMarkers(
    navigation,
    expectedLinks.map((href) => `href="${href}"`),
    routeLabel,
    "enlaces de navegación móvil",
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
assertMobileNavigationOrder(
  massHtml,
  sharedNavigationOrder,
  "la invitación de Eucaristía",
);
assertMobileNavigationOrder(rootHtml, sharedNavigationOrder, "la raíz");
assertMobileNavigationOrder(
  completeHtml,
  completeNavigationOrder,
  "la invitación completa",
);

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
  [engagementHtml, "la experiencia de compromiso"],
  [howWeMetHtml, "Cómo nos conocimos"],
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

for (const [html, routeLabel] of [
  [massHtml, "la invitación de Eucaristía"],
  [rootHtml, "la raíz"],
  [completeHtml, "la invitación completa"],
  [engagementHtml, "la experiencia de compromiso"],
]) {
  assert.doesNotMatch(
    html,
    /Texto historia \d+/,
    `Los placeholders de Cómo nos conocimos aparecen en ${routeLabel}.`,
  );
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
  "Verificación superada: alias público, invitaciones aisladas, historias privadas, colecciones fotográficas y anclas válidas.",
);
