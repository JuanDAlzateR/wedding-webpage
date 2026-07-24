import type { ImageMetadata } from "astro";

import heroImage from "../../photos/IMG_5961.JPG";
import socialImage from "../../photos/IMG_20240804_155455.jpg";
import storyImage from "../../photos/IMG_20241010_141503.jpg";
import engagementApril05Photo1 from "../../photos/engagement/april05-photo1.jpg";
import engagementApril05Photo2 from "../../photos/engagement/april05-photo2.jpg";
import engagementApril05Photo3 from "../../photos/engagement/april05-photo3.jpg";
import engagementApril05Photo4 from "../../photos/engagement/april05-photo4.jpg";
import engagementApril05Photo5 from "../../photos/engagement/april05-photo5.jpg";
import engagementApril12Photo1 from "../../photos/engagement/april12-photo1.jpg";
import engagementApril12Photo2 from "../../photos/engagement/april12-photo2.jpg";
import engagementApril12Photo3 from "../../photos/engagement/april12-photo3.jpg";
import engagementApril12Photo4 from "../../photos/engagement/april12-photo4.jpg";
import engagementApril12Photo5 from "../../photos/engagement/april12-photo5.jpg";
import engagementApril12Photo6 from "../../photos/engagement/april12-photo6.jpg";
import engagementApril19Photo1 from "../../photos/engagement/april19-photo1.jpg";
import engagementApril19Photo2 from "../../photos/engagement/april19-photo2.png";
import engagementApril19Photo3 from "../../photos/engagement/april19-photo3.png";
import engagementApril19Photo4 from "../../photos/engagement/april19-photo4.png";
import engagementApril19Photo5 from "../../photos/engagement/april19-photo5.jpg";
import engagementApril19Photo6 from "../../photos/engagement/april19-photo6.jpg";
import engagementApril19Photo7 from "../../photos/engagement/april19-photo7.jpg";
import engagementApril19Photo8 from "../../photos/engagement/april19-photo8.jpg";

export type PhotoLayout = "portrait" | "landscape" | "feature";

export type WeddingPhoto = {
  id: string;
  src: ImageMetadata;
  alt: string;
  caption?: string;
  layout: PhotoLayout;
  position: string;
};

export type GalleryPhoto = Pick<WeddingPhoto, "id" | "src" | "alt">;

const galleryImageModules = {
  ...import.meta.glob<{ default: ImageMetadata }>(
    "../../photos/gallery/*.{jpg,JPG,png,PNG}",
    { eager: true },
  ),
  ...import.meta.glob<{ default: ImageMetadata }>(
    "../../photos/gallery/web-compatible/*.jpg",
    { eager: true },
  ),
};

function loadGalleryImage(relativePath: string): ImageMetadata {
  const module = galleryImageModules[`../../photos/gallery/${relativePath}`];

  if (!module) {
    throw new Error(
      `No existe la fotografía de galería "photos/gallery/${relativePath}".`,
    );
  }

  return module.default;
}

export const featuredPhotos = {
  hero: {
    src: heroImage,
    alt: "La pareja sonriendo junta al aire libre.",
    position: "center 45%",
  },
  story: {
    src: storyImage,
    alt: "Un marco con varias fotografías de recuerdos de la pareja.",
    position: "center",
  },
  social: socialImage,
} as const;

export const engagementFeaturedPhoto = {
  src: engagementApril05Photo3,
  alt: "La pareja posa con varias tarjetas del juego.",
} as const;

/**
 * Biblioteca de fotografías del compromiso.
 * El orden narrativo se define en `weddingContent.engagement.storyChapters`.
 */
export const engagementPhotos = [
  {
    id: "april05-photo1",
    src: engagementApril05Photo1,
    alt: "Una persona completa una actividad impresa sobre una mesa.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april05-photo2",
    src: engagementApril05Photo2,
    alt: "Una persona sostiene un celular y una tarjeta con código QR.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april05-photo3",
    src: engagementApril05Photo3,
    alt: "La pareja posa con varias tarjetas del juego.",
    layout: "feature",
    position: "center",
  },
  {
    id: "april05-photo4",
    src: engagementApril05Photo4,
    alt: "Una persona muestra el celular frente a una parroquia iluminada.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april05-photo5",
    src: engagementApril05Photo5,
    alt: "La pareja se toma una fotografía sentada al final del día.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "april12-photo1",
    src: engagementApril12Photo1,
    alt: "Una persona resuelve una actividad frente a la Universidad Nacional.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april12-photo2",
    src: engagementApril12Photo2,
    alt: "La pareja sostiene una caja decorada.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "april12-photo3",
    src: engagementApril12Photo3,
    alt: "La pareja sonríe dentro de una iglesia.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april12-photo4",
    src: engagementApril12Photo4,
    alt: "Una persona abre una caja decorada sobre una mesa.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april12-photo5",
    src: engagementApril12Photo5,
    alt: "La pareja sonríe frente al letrero del Jardín Botánico.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "april12-photo6",
    src: engagementApril12Photo6,
    alt: "La pareja sonríe frente a una edificación iluminada de noche.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "april19-photo1",
    src: engagementApril19Photo1,
    alt: "La pareja se abraza sentada entre vegetación.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "april19-photo2",
    src: engagementApril19Photo2,
    alt: "Una persona sostiene un vaso junto a las cartas del juego.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april19-photo3",
    src: engagementApril19Photo3,
    alt: "Una persona con casco y ropa para la lluvia sostiene varias cartas.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april19-photo4",
    src: engagementApril19Photo4,
    alt: "Una persona con casco consulta el celular junto a las cartas del juego.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april19-photo5",
    src: engagementApril19Photo5,
    alt: "Una persona se arrodilla frente a su pareja y sostiene una caja.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "april19-photo6",
    src: engagementApril19Photo6,
    alt: "Dos anillos descansan sobre una flor decorativa roja.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april19-photo7",
    src: engagementApril19Photo7,
    alt: "Una mano muestra dos anillos y una manilla.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "april19-photo8",
    src: engagementApril19Photo8,
    alt: "La pareja sonríe con ropa abrigada.",
    layout: "portrait",
    position: "center",
  },
] as const satisfies readonly WeddingPhoto[];

export type EngagementPhotoId = (typeof engagementPhotos)[number]["id"];

export function getEngagementPhoto(id: EngagementPhotoId): WeddingPhoto {
  const photo = engagementPhotos.find((candidate) => candidate.id === id);

  if (!photo) {
    throw new Error(`No existe la fotografía de compromiso "${id}".`);
  }

  return photo;
}

/**
 * El orden de este arreglo es el recorrido visual de la galería.
 * Los HEIC conservan su original y usan un derivado JPG en `web-compatible/`.
 */
export const galleryPhotos = [
  {
    id: "IMG_9996",
    src: loadGalleryImage("IMG_9996.PNG"),
    alt: "Captura de pantalla de una coincidencia en una aplicación de citas.",
  },
  {
    id: "5588f2a1-6469-411b-94a6-70688f3f0728",
    src: loadGalleryImage("5588f2a1-6469-411b-94a6-70688f3f0728.jpg"),
    alt: "Afiche ilustrado de una charla sobre la confianza en Dios.",
  },
  {
    id: "IMG_9332",
    src: loadGalleryImage("web-compatible/IMG_9332.jpg"),
    alt: "Una mano sostiene un celular con una funda de figuras religiosas.",
  },
  {
    id: "IMG_9371",
    src: loadGalleryImage("IMG_9371.JPG"),
    alt: "La pareja se toma una selfie junto a una cruz al aire libre.",
  },
  {
    id: "2bb7d1e6-1461-46f2-ba79-bd53f6b50d4b",
    src: loadGalleryImage("2bb7d1e6-1461-46f2-ba79-bd53f6b50d4b.jpg"),
    alt: "La pareja se toma una selfie afectuosa dentro de una iglesia.",
  },
  {
    id: "5d10a1e1-f1ca-4c7c-9954-99742fd30bb8",
    src: loadGalleryImage("5d10a1e1-f1ca-4c7c-9954-99742fd30bb8.jpg"),
    alt: "Las manos de la pareja unidas junto a un rosario y un estuche.",
  },
  {
    id: "a7c192de-c45e-4ffe-be17-3ea6e2a57f40",
    src: loadGalleryImage("a7c192de-c45e-4ffe-be17-3ea6e2a57f40.jpg"),
    alt: "La pareja sonríe vestida de blanco frente a una iglesia.",
  },
  {
    id: "IMG_0029",
    src: loadGalleryImage("web-compatible/IMG_0029.jpg"),
    alt: "Atardecer naranja visto desde la ventana de un avión.",
  },
  {
    id: "IMG_20240331_152546",
    src: loadGalleryImage("IMG_20240331_152546.jpg"),
    alt: "La pareja sonríe junta durante una visita en casa.",
  },
  {
    id: "IMG_20240401_174155",
    src: loadGalleryImage("IMG_20240401_174155.jpg"),
    alt: "La pareja se toma una selfie al aire libre con chaquetas.",
  },
  {
    id: "IMG_20240512_072059",
    src: loadGalleryImage("IMG_20240512_072059.jpg"),
    alt: "La pareja sonríe sentada dentro de un automóvil.",
  },
  {
    id: "IMG_20240512_102640",
    src: loadGalleryImage("IMG_20240512_102640.jpg"),
    alt: "Nota escrita a mano con un mensaje de cariño para Juan David.",
  },
  {
    id: "IMG_20240512_131842",
    src: loadGalleryImage("IMG_20240512_131842.jpg"),
    alt: "Ramo de flores naranjas y azules sobre una mesa.",
  },
  {
    id: "IMG_1396",
    src: loadGalleryImage("web-compatible/IMG_1396.jpg"),
    alt: "Detalle de un ramo de flores naranjas y azules.",
  },
  {
    id: "49f3432f-d0e1-4960-966d-18bd72d04577",
    src: loadGalleryImage("49f3432f-d0e1-4960-966d-18bd72d04577.jpg"),
    alt: "Las manos de la pareja sostienen un rosario frente a un altar.",
  },
  {
    id: "IMG_20240513_135421",
    src: loadGalleryImage("IMG_20240513_135421.jpg"),
    alt: "La pareja se mira de pie en un parque arbolado.",
  },
  {
    id: "IMG_20240513_140005",
    src: loadGalleryImage("IMG_20240513_140005.jpg"),
    alt: "La pareja comparte un beso en un parque.",
  },
  {
    id: "IMG_20240513_140552",
    src: loadGalleryImage("IMG_20240513_140552.jpg"),
    alt: "La pareja conversa sentada sobre el césped.",
  },
  {
    id: "d9637739-6758-4784-9aad-04845ed16c91",
    src: loadGalleryImage("d9637739-6758-4784-9aad-04845ed16c91.jpg"),
    alt: "La pareja se mira mientras descansa sobre el césped.",
  },
  {
    id: "IMG_1421",
    src: loadGalleryImage("IMG_1421.JPG"),
    alt: "La pareja se acerca para besarse en un parque.",
  },
  {
    id: "9363abd4-99b9-4e0d-a271-5db9c23aa80d",
    src: loadGalleryImage("9363abd4-99b9-4e0d-a271-5db9c23aa80d.jpg"),
    alt: "La pareja comparte un beso junto a una ventana.",
  },
  {
    id: "IMG_1437",
    src: loadGalleryImage("IMG_1437.JPG"),
    alt: "Melisa sonríe mientras sostiene un pequeño objeto tejido.",
  },
  {
    id: "IMG_1487",
    src: loadGalleryImage("IMG_1487.PNG"),
    alt: "Captura de pantalla de una videollamada de la pareja.",
  },
  {
    id: "IMG_1502",
    src: loadGalleryImage("IMG_1502.PNG"),
    alt: "Captura de pantalla de mensajes de cariño entre la pareja.",
  },
  {
    id: "IMG_1503",
    src: loadGalleryImage("IMG_1503.PNG"),
    alt: "Captura de pantalla de una conversación afectuosa de la pareja.",
  },
  {
    id: "IMG_20240603_084353",
    src: loadGalleryImage("IMG_20240603_084353.jpg"),
    alt: "La pareja se abraza durante una reunión en una iglesia.",
  },
  {
    id: "IMG_3104_Original",
    src: loadGalleryImage("IMG_3104_Original.JPG"),
    alt: "La pareja posa en un mirador rodeado de montañas.",
  },
  {
    id: "IMG_3201",
    src: loadGalleryImage("web-compatible/IMG_3201.jpg"),
    alt: "La pareja sostiene una imagen religiosa enmarcada.",
  },
  {
    id: "IMG_3286",
    src: loadGalleryImage("IMG_3286.JPG"),
    alt: "La pareja comparte un beso mientras está sentada a una mesa.",
  },
  {
    id: "IMG_3327",
    src: loadGalleryImage("web-compatible/IMG_3327.jpg"),
    alt: "La pareja se toma una selfie junto a figuras religiosas.",
  },
  {
    id: "IMG_3556",
    src: loadGalleryImage("web-compatible/IMG_3556.jpg"),
    alt: "La pareja conversa sentada durante una actividad al aire libre.",
  },
  {
    id: "IMG_3673",
    src: loadGalleryImage("web-compatible/IMG_3673.jpg"),
    alt: "La pareja posa de forma divertida durante una comida.",
  },
  {
    id: "IMG_3682",
    src: loadGalleryImage("web-compatible/IMG_3682.jpg"),
    alt: "Juan David besa a Melisa mientras ella sostiene un ramo.",
  },
  {
    id: "IMG_20240822_193157",
    src: loadGalleryImage("IMG_20240822_193157.jpg"),
    alt: "La pareja sonríe durante un encuentro con música en vivo.",
  },
  {
    id: "bdf16d49-276f-45ec-aea9-417c2af45b21",
    src: loadGalleryImage("bdf16d49-276f-45ec-aea9-417c2af45b21.jpg"),
    alt: "La pareja se toma una selfie frente a una pantalla de concierto.",
  },
  {
    id: "7577fcc5-cabe-4dca-8c0d-cdd730712317",
    src: loadGalleryImage("7577fcc5-cabe-4dca-8c0d-cdd730712317.jpg"),
    alt: "La pareja sonríe durante un evento nocturno al aire libre.",
  },
  {
    id: "d945c198-686b-4a9e-bc10-ccbd1147c8dd",
    src: loadGalleryImage("d945c198-686b-4a9e-bc10-ccbd1147c8dd.jpg"),
    alt: "La pareja canta junta sobre un escenario.",
  },
  {
    id: "IMG_20240908_155243",
    src: loadGalleryImage("IMG_20240908_155243.jpg"),
    alt: "La pareja sonríe durante un recorrido al aire libre.",
  },
  {
    id: "IMG_20240916_025857",
    src: loadGalleryImage("IMG_20240916_025857.jpg"),
    alt: "La pareja posa durante una visita a un centro médico.",
  },
  {
    id: "IMG_20240928_003343",
    src: loadGalleryImage("IMG_20240928_003343.jpg"),
    alt: "La pareja comparte un beso junto a una decoración de cumpleaños.",
  },
  {
    id: "IMG_4198",
    src: loadGalleryImage("web-compatible/IMG_4198.jpg"),
    alt: "La pareja se toma una selfie en un paisaje montañoso.",
  },
  {
    id: "IMG_20241006_214437",
    src: loadGalleryImage("IMG_20241006_214437.jpg"),
    alt: "La pareja comparte un beso mientras lee junta.",
  },
  {
    id: "IMG_20241010_141506",
    src: loadGalleryImage("IMG_20241010_141506.jpg"),
    alt: "Marco de madera con varias fotografías de la pareja.",
  },
  {
    id: "IMG_20241114_192336",
    src: loadGalleryImage("IMG_20241114_192336.jpg"),
    alt: "La pareja sonríe junto a un postre con velas.",
  },
  {
    id: "IMG_20241117_152645",
    src: loadGalleryImage("IMG_20241117_152645.jpg"),
    alt: "La pareja comparte una celebración con flores y un mantel a cuadros.",
  },
  {
    id: "IMG_20241206_173739",
    src: loadGalleryImage("IMG_20241206_173739.jpg"),
    alt: "La pareja se toma una selfie frente a luces navideñas.",
  },
  {
    id: "IMG_20241206_195832",
    src: loadGalleryImage("IMG_20241206_195832.jpg"),
    alt: "La pareja enciende una vela durante una celebración nocturna.",
  },
  {
    id: "IMG_4780",
    src: loadGalleryImage("IMG_4780.JPG"),
    alt: "La pareja sonríe durante una caminata en la montaña.",
  },
  {
    id: "IMG_5636",
    src: loadGalleryImage("IMG_5636.JPG"),
    alt: "La pareja comparte un beso en una salida nocturna.",
  },
  {
    id: "IMG_20250301_125321",
    src: loadGalleryImage("IMG_20250301_125321.jpg"),
    alt: "La pareja posa junto a un cartel durante una visita.",
  },
  {
    id: "IMG_6218",
    src: loadGalleryImage("web-compatible/IMG_6218.jpg"),
    alt: "La pareja sonríe junto a un juego de mesa.",
  },
  {
    id: "IMG_6220",
    src: loadGalleryImage("web-compatible/IMG_6220.jpg"),
    alt: "Juan David besa a Melisa junto a un juego de mesa.",
  },
  {
    id: "IMG_6259",
    src: loadGalleryImage("web-compatible/IMG_6259.jpg"),
    alt: "Un computador muestra una videollamada junto a figuras religiosas.",
  },
  {
    id: "IMG_6722",
    src: loadGalleryImage("web-compatible/IMG_6722.jpg"),
    alt: "Tarjeta de cumpleaños y recuerdos ilustrados sobre una mesa.",
  },
  {
    id: "IMG_20250814_171807",
    src: loadGalleryImage("IMG_20250814_171807.jpg"),
    alt: "La pareja se toma una selfie frente a un avión.",
  },
  {
    id: "IMG_20250913_112648",
    src: loadGalleryImage("IMG_20250913_112648.jpg"),
    alt: "La pareja sonríe en un mirador de montaña.",
  },
  {
    id: "IMG_20251004_193605",
    src: loadGalleryImage("IMG_20251004_193605.jpg"),
    alt: "La pareja se toma una selfie con gorros festivos.",
  },
  {
    id: "IMG_1130",
    src: loadGalleryImage("IMG_1130.JPG"),
    alt: "La pareja se toma una selfie mientras sostiene varias notas.",
  },
  {
    id: "IMG_20251013_124142",
    src: loadGalleryImage("IMG_20251013_124142.jpg"),
    alt: "La pareja se abraza durante una caminata entre montañas.",
  },
  {
    id: "IMG_1710",
    src: loadGalleryImage("web-compatible/IMG_1710.jpg"),
    alt: "La pareja sonríe junto a una figura decorativa.",
  },
  {
    id: "IMG_20251225_000451",
    src: loadGalleryImage("IMG_20251225_000451.jpg"),
    alt: "La pareja sonríe con gorros navideños junto a una vela.",
  },
  {
    id: "IMG_20251226_212606",
    src: loadGalleryImage("IMG_20251226_212606.jpg"),
    alt: "La pareja posa frente a luces navideñas.",
  },
  {
    id: "IMG_20260105_224015",
    src: loadGalleryImage("IMG_20260105_224015.jpg"),
    alt: "La pareja se abraza bajo una estructura iluminada.",
  },
  {
    id: "IMG_2223",
    src: loadGalleryImage("web-compatible/IMG_2223.jpg"),
    alt: "La pareja comparte bebidas de colores en un restaurante.",
  },
  {
    id: "IMG_20260503_112317",
    src: loadGalleryImage("IMG_20260503_112317.jpg"),
    alt: "Juan David escribe una nota en un espacio de oración.",
  },
  {
    id: "IMG_20260606_213322",
    src: loadGalleryImage("IMG_20260606_213322.jpg"),
    alt: "La pareja sonríe durante una reunión en casa.",
  },
  {
    id: "IMG_20260615_214420",
    src: loadGalleryImage("IMG_20260615_214420.jpg"),
    alt: "La pareja hace gestos divertidos durante una salida nocturna.",
  },
  {
    id: "IMG_20260629_163753",
    src: loadGalleryImage("IMG_20260629_163753.jpg"),
    alt: "La pareja sonríe junta durante una visita.",
  },
] as const satisfies readonly GalleryPhoto[];

export type GalleryPhotoId = (typeof galleryPhotos)[number]["id"];
