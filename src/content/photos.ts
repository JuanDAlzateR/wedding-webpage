import type { ImageMetadata } from "astro";

import galleryChurch from "../../photos/a7c192de-c45e-4ffe-be17-3ea6e2a57f40.jpg";
import galleryFirstDate from "../../photos/IMG_20241010_141503.jpg";
import galleryGardenPortrait from "../../photos/IMG_20240513_135421.jpg";
import galleryKiss from "../../photos/IMG_20240513_140005.jpg";
import galleryPicnic from "../../photos/IMG_20241117_152645.jpg";
import galleryScenic from "../../photos/IMG_3104_Original.JPG";
import gallerySeated from "../../photos/IMG_20240513_140533.jpg";
import gallerySelfie from "../../photos/IMG_20240401_174155.jpg";
import galleryWinter from "../../photos/IMG_20251225_000451.jpg";
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
 * El orden de este arreglo es el orden visual de la galería.
 * `position` controla el punto focal cuando una imagen se recorta.
 */
export const galleryPhotos: WeddingPhoto[] = [
  {
    id: "garden-portrait",
    src: galleryGardenPortrait,
    alt: "La pareja frente a frente en un jardín.",
    layout: "portrait",
    position: "center 42%",
  },
  {
    id: "outdoor-selfie",
    src: gallerySelfie,
    alt: "La pareja sonriendo al aire libre.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "affectionate-portrait",
    src: galleryKiss,
    alt: "La pareja compartiendo un momento afectuoso en un parque.",
    layout: "portrait",
    position: "center 38%",
  },
  {
    id: "photo-memories",
    src: galleryFirstDate,
    alt: "Un marco con una colección de fotografías de la pareja.",
    caption: "Pequeños recuerdos de nuestra historia",
    layout: "feature",
    position: "center",
  },
  {
    id: "church-portrait",
    src: galleryChurch,
    alt: "La pareja sonriendo frente a la entrada de una iglesia.",
    layout: "portrait",
    position: "center 30%",
  },
  {
    id: "seated-in-park",
    src: gallerySeated,
    alt: "La pareja sentada junta sobre el césped.",
    layout: "portrait",
    position: "center 38%",
  },
  {
    id: "home-picnic",
    src: galleryPicnic,
    alt: "La pareja compartiendo una tarde en casa.",
    layout: "landscape",
    position: "center 42%",
  },
  {
    id: "scenic-portrait",
    src: galleryScenic,
    alt: "La pareja posando en un mirador rodeado de montañas.",
    layout: "portrait",
    position: "center 38%",
  },
  {
    id: "winter-moment",
    src: galleryWinter,
    alt: "La pareja riendo frente a un árbol iluminado.",
    layout: "portrait",
    position: "center",
  },
];
