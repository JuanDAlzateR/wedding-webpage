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
import engagementActivity from "../../photos/engagement/IMG_20260405_120048.jpg";
import engagementQr from "../../photos/engagement/IMG_20260405_135257.jpg";
import engagementClueCards from "../../photos/engagement/IMG_20260405_135515.jpg";
import engagementSeatedSelfie from "../../photos/engagement/IMG_20260405_214807.jpg";
import engagementDecoratedBox from "../../photos/engagement/IMG_20260412_114243.jpg";
import engagementOpeningBox from "../../photos/engagement/IMG_20260412_151959.jpg";
import engagementNightBuilding from "../../photos/engagement/IMG_20260412_213547.jpg";
import engagementGardenEmbrace from "../../photos/engagement/IMG_20260419_134249.jpg";
import engagementProposal from "../../photos/engagement/SNOW_20260422_134757_793.jpg";
import engagementRingsOnHand from "../../photos/engagement/IMG_20260419_183821.jpg";
import engagementRingFlower from "../../photos/engagement/IMG_20260419_184112.jpg";
import engagementWarmSelfie from "../../photos/engagement/IMG_20260419_195944.jpg";

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
  src: engagementProposal,
  alt: "Una persona se arrodilla frente a su pareja y sostiene una caja.",
} as const;

/**
 * Biblioteca de fotografías del compromiso.
 * El orden narrativo se define en `weddingContent.engagement.storyEntries`.
 */
export const engagementPhotos = [
  {
    id: "printed-activity",
    src: engagementActivity,
    alt: "Una persona completa una actividad impresa sobre una mesa.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "qr-clue",
    src: engagementQr,
    alt: "Una persona sostiene un celular y una tarjeta con código QR.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "clue-cards",
    src: engagementClueCards,
    alt: "La pareja posa con varias tarjetas de pistas.",
    layout: "feature",
    position: "center",
  },
  {
    id: "seated-selfie",
    src: engagementSeatedSelfie,
    alt: "La pareja se toma una fotografía sentada.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "decorated-box",
    src: engagementDecoratedBox,
    alt: "La pareja sostiene una caja decorada.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "opening-box",
    src: engagementOpeningBox,
    alt: "Una persona abre una caja decorada sobre una mesa.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "night-building",
    src: engagementNightBuilding,
    alt: "La pareja sonríe frente a una edificación iluminada.",
    layout: "landscape",
    position: "center",
  },
  {
    id: "garden-embrace",
    src: engagementGardenEmbrace,
    alt: "La pareja se abraza sentada entre vegetación.",
    layout: "feature",
    position: "center",
  },
  {
    id: "proposal",
    src: engagementProposal,
    alt: "Una persona se arrodilla frente a su pareja y sostiene una caja.",
    layout: "feature",
    position: "center",
  },
  {
    id: "rings-on-hand",
    src: engagementRingsOnHand,
    alt: "Una mano muestra dos anillos.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "ring-flower",
    src: engagementRingFlower,
    alt: "Dos anillos descansan sobre una flor decorativa roja.",
    layout: "portrait",
    position: "center",
  },
  {
    id: "warm-selfie",
    src: engagementWarmSelfie,
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
