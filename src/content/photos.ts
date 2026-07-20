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
