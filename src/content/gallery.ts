import {
  galleryPhotos,
  type GalleryPhoto,
  type GalleryPhotoId,
} from "./photos";
import { weddingContent, type GalleryEditorialQuote } from "./wedding";

export type GallerySegment = {
  photos: readonly GalleryPhoto[];
  quote?: GalleryEditorialQuote;
};

function validateGallery(): void {
  const photoIds = new Set<string>();
  const imageSources = new Set<string>();

  for (const photo of galleryPhotos) {
    if (photoIds.has(photo.id)) {
      throw new Error(`La fotografía de galería "${photo.id}" está repetida.`);
    }

    if (!photo.alt.trim()) {
      throw new Error(`La fotografía de galería "${photo.id}" no tiene alt.`);
    }

    if (imageSources.has(photo.src.src)) {
      throw new Error(
        `La fotografía de galería "${photo.id}" repite un archivo activo.`,
      );
    }

    photoIds.add(photo.id);
    imageSources.add(photo.src.src);
  }

  const quoteIds = new Set<string>();
  const quotePositions = new Set<number>();
  let previousQuotePosition = 0;

  weddingContent.biblicalQuotes.galleryInterludes.forEach((quote) => {
    if (quoteIds.has(quote.id)) {
      throw new Error(`La cita editorial "${quote.id}" está repetida.`);
    }

    if (
      !quote.reference.trim() ||
      quote.lines.some(({ text }) => !text.trim())
    ) {
      throw new Error(`La cita editorial "${quote.id}" está incompleta.`);
    }

    const photoIndex = galleryPhotos.findIndex(
      ({ id }) => id === quote.afterPhotoId,
    );
    const position = photoIndex + 1;

    if (photoIndex < 0) {
      throw new Error(
        `La cita editorial "${quote.id}" referencia una foto inexistente.`,
      );
    }

    if (position <= previousQuotePosition || position >= galleryPhotos.length) {
      throw new Error(
        `La cita editorial "${quote.id}" no respeta el orden interno de la galería.`,
      );
    }

    if (quotePositions.has(position)) {
      throw new Error(
        `Más de una cita editorial ocupa la posición ${position}.`,
      );
    }

    quoteIds.add(quote.id);
    quotePositions.add(position);
    previousQuotePosition = position;
  });
}

validateGallery();

export function getGallerySegments(): readonly GallerySegment[] {
  const quotesByPhotoId = new Map<GalleryPhotoId, GalleryEditorialQuote>(
    weddingContent.biblicalQuotes.galleryInterludes.map((quote) => [
      quote.afterPhotoId,
      quote,
    ]),
  );
  const segments: GallerySegment[] = [];
  let startIndex = 0;

  galleryPhotos.forEach((photo, index) => {
    const quote = quotesByPhotoId.get(photo.id);

    if (quote) {
      segments.push({
        photos: galleryPhotos.slice(startIndex, index + 1),
        quote,
      });
      startIndex = index + 1;
    }
  });

  segments.push({ photos: galleryPhotos.slice(startIndex) });

  return segments;
}
