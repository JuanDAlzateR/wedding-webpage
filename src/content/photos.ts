import type { ImageMetadata } from "astro";

import featuredHeroImage from "../../photos/home/IMG_5961.JPG";
import featuredSocialImage from "../../photos/home/IMG_20240804_155455.jpg";
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

const galleryImageModules = import.meta.glob<{ default: ImageMetadata }>(
  "../../photos/gallery/*.{jpg,JPG,jpeg,JPEG,png,PNG}",
  { eager: true },
);

const howWeMetImageModules = {
  ...import.meta.glob<{ default: ImageMetadata }>(
    "../../photos/history/*.{jpg,JPG,png,PNG}",
    { eager: true },
  ),
  ...import.meta.glob<{ default: ImageMetadata }>(
    "../../photos/history/web-compatible/*.jpg",
    { eager: true },
  ),
};

function loadGalleryImage(fileName: string): ImageMetadata {
  const module = galleryImageModules[`../../photos/gallery/${fileName}`];

  if (!module) {
    throw new Error(
      `No existe la fotografía de la galería "photos/gallery/${fileName}".`,
    );
  }

  return module.default;
}

function loadHowWeMetImage(relativePath: string): ImageMetadata {
  const module = howWeMetImageModules[`../../photos/history/${relativePath}`];

  if (!module) {
    throw new Error(
      `No existe la fotografía de nuestra historia "photos/history/${relativePath}".`,
    );
  }

  return module.default;
}

export const featuredPhotos = {
  hero: {
    src: featuredHeroImage,
    alt: "La pareja sonriendo junta al aire libre.",
    position: "center 45%",
  },
  social: featuredSocialImage,
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
 * Galería compartida por las dos invitaciones.
 * El orden es editorial y no representa una cronología confirmada.
 */
export const homeGalleryPhotos = [
  {
    id: "a7c192de-c45e-4ffe-be17-3ea6e2a57f40",
    src: loadGalleryImage("a7c192de-c45e-4ffe-be17-3ea6e2a57f40.jpg"),
    alt: "La pareja sonríe vestida de blanco frente a la entrada de una iglesia.",
  },
  {
    id: "IMG_4780",
    src: loadGalleryImage("IMG_4780.JPG"),
    alt: "La pareja sonríe en una selfie al aire libre; una de las personas sostiene un rosario.",
  },
  {
    id: "IMG_1421",
    src: loadGalleryImage("IMG_1421.JPG"),
    alt: "La pareja se mira sentada sobre el césped en un parque.",
  },
  {
    id: "9363abd4-99b9-4e0d-a271-5db9c23aa80d",
    src: loadGalleryImage("9363abd4-99b9-4e0d-a271-5db9c23aa80d.jpg"),
    alt: "La pareja se abraza junto a una ventana.",
  },
  {
    id: "IMG_20260517_215026",
    src: loadGalleryImage("IMG_20260517_215026.jpg"),
    alt: "La pareja se mira sentada frente a una fogata durante la noche.",
  },
  {
    id: "IMG_20260518_154633",
    src: loadGalleryImage("IMG_20260518_154633.jpg"),
    alt: "La pareja baila sobre el césped, con montañas y vegetación al fondo.",
  },
  {
    id: "IMG_20240928_003343",
    src: loadGalleryImage("IMG_20240928_003343.jpg"),
    alt: "La pareja se mira junto a una mesa con pastel y decoración de cumpleaños.",
  },
  {
    id: "IMG_20251225_000451",
    src: loadGalleryImage("IMG_20251225_000451.jpg"),
    alt: "La pareja sonríe con gorros navideños y sostiene una vela y una figura tejida.",
  },
  {
    id: "IMG_20251226_212606",
    src: loadGalleryImage("IMG_20251226_212606.jpg"),
    alt: "La pareja sonríe frente a árboles y luces navideñas.",
  },
  {
    id: "IMG_3104_Original",
    src: loadGalleryImage("IMG_3104_Original.JPG"),
    alt: "La pareja posa junto a una imagen de la Virgen, con montañas al fondo.",
  },
] as const satisfies readonly GalleryPhoto[];

export type HomeGalleryPhotoId = (typeof homeGalleryPhotos)[number]["id"];

/**
 * Biblioteca fotográfica de Cómo nos conocimos.
 * La secuencia narrativa se define en `weddingContent.howWeMet.storyEntries`.
 * Los HEIC conservan su original y usan una copia JPG en `web-compatible/`.
 */
export const howWeMetPhotos = [
  {
    id: "history-01",
    src: loadHowWeMetImage("history-01.jpg"),
    alt: "Afiche ilustrado de una charla sobre la confianza en el plan de Dios.",
  },
  {
    id: "history-02",
    src: loadHowWeMetImage("history-02.jpg"),
    alt: "La pareja se toma una selfie junto a una cruz de madera al aire libre.",
  },
  {
    id: "history-03",
    src: loadHowWeMetImage("web-compatible/history-03.jpg"),
    alt: "La pareja sonríe junto a varias figuras religiosas.",
  },
  {
    id: "history-04",
    src: loadHowWeMetImage("web-compatible/history-04.jpg"),
    alt: "Ramo de flores naranjas y azules visto de cerca.",
  },
  {
    id: "history-05",
    src: loadHowWeMetImage("history-05.jpg"),
    alt: "Una mano sostiene un ramo de rosas rosadas junto a un crucifijo.",
  },
  {
    id: "history-06",
    src: loadHowWeMetImage("web-compatible/history-06.jpg"),
    alt: "La pareja comparte un beso entre flores y regalos.",
  },
  {
    id: "history-07",
    src: loadHowWeMetImage("history-07.jpg"),
    alt: "Un florero con lirios naranjas y varios objetos sobre una mesa.",
  },
  {
    id: "history-08",
    src: loadHowWeMetImage("history-08.jpg"),
    alt: "La pareja sonríe sentada junta en un espacio interior.",
  },
  {
    id: "history-09",
    src: loadHowWeMetImage("history-09.jpg"),
    alt: "La pareja conversa sentada sobre el césped.",
  },
  {
    id: "history-10",
    src: loadHowWeMetImage("web-compatible/history-10.jpg"),
    alt: "Atardecer naranja visto desde la ventana de un avión.",
  },
  {
    id: "history-11",
    src: loadHowWeMetImage("history-11.jpg"),
    alt: "La pareja sonríe frente a un avión en una pista.",
  },
  {
    id: "history-12",
    src: loadHowWeMetImage("history-12.jpg"),
    alt: "La pareja comparte un picnic con flores y un mantel a cuadros.",
  },
  {
    id: "history-13",
    src: loadHowWeMetImage("history-13.jpg"),
    alt: "La pareja posa junto a un cartel en un espacio interior.",
  },
  {
    id: "history-14",
    src: loadHowWeMetImage("history-14.jpg"),
    alt: "La pareja posa dentro de una habitación de atención médica.",
  },
  {
    id: "history-15",
    src: loadHowWeMetImage("web-compatible/history-15.jpg"),
    alt: "La pareja se toma una selfie junto a un juego de mesa.",
  },
  {
    id: "history-16",
    src: loadHowWeMetImage("history-16.jpg"),
    alt: "La pareja se abraza bajo una estructura iluminada en un parque.",
  },
  {
    id: "history-17",
    src: loadHowWeMetImage("web-compatible/history-17.jpg"),
    alt: "La pareja conversa sentada bajo una cubierta de colores al aire libre.",
  },
  {
    id: "history-18",
    src: loadHowWeMetImage("history-18.jpg"),
    alt: "La pareja sonríe junta durante una visita.",
  },
  {
    id: "history-19",
    src: loadHowWeMetImage("history-19.jpg"),
    alt: "La pareja abraza a un hombre de cabello canoso en un espacio interior.",
  },
] as const satisfies readonly GalleryPhoto[];

export type HowWeMetPhotoId = (typeof howWeMetPhotos)[number]["id"];

export function getHowWeMetPhoto(id: HowWeMetPhotoId): GalleryPhoto {
  const photo = howWeMetPhotos.find((candidate) => candidate.id === id);

  if (!photo) {
    throw new Error(`No existe la fotografía de nuestra historia "${id}".`);
  }

  return photo;
}

export const howWeMetFeaturedPhoto = getHowWeMetPhoto("history-02");
