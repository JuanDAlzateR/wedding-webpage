import { getHowWeMetPhoto, howWeMetPhotos, type GalleryPhoto } from "./photos";
import { weddingContent, type HowWeMetStoryEntry } from "./wedding";

export type ResolvedHowWeMetStoryEntry = Omit<
  HowWeMetStoryEntry,
  "photoIds"
> & {
  photos: readonly GalleryPhoto[];
};

function resolveHowWeMetStory(
  entries: readonly HowWeMetStoryEntry[],
): ResolvedHowWeMetStoryEntry[] {
  const manifestIds = new Set<string>();
  const manifestSources = new Set<string>();

  for (const photo of howWeMetPhotos) {
    if (!photo.id.trim()) {
      throw new Error("Una fotografía de Cómo nos conocimos no tiene id.");
    }

    if (manifestIds.has(photo.id)) {
      throw new Error(`La fotografía "${photo.id}" está repetida.`);
    }

    if (!photo.alt.trim()) {
      throw new Error(`La fotografía "${photo.id}" no tiene alt.`);
    }

    if (manifestSources.has(photo.src.src)) {
      throw new Error(`La fotografía "${photo.id}" repite un archivo activo.`);
    }

    manifestIds.add(photo.id);
    manifestSources.add(photo.src.src);
  }

  const entryIds = new Set<string>();
  const referencedPhotoIds = new Set<string>();

  const resolvedEntries = entries.map((entry) => {
    if (!entry.id.trim()) {
      throw new Error("Una entrada de Cómo nos conocimos no tiene id.");
    }

    if (entryIds.has(entry.id)) {
      throw new Error(`La entrada "${entry.id}" está repetida.`);
    }

    if (entry.title !== undefined && !entry.title.trim()) {
      throw new Error(`La entrada "${entry.id}" tiene un título vacío.`);
    }

    if (entry.caption !== undefined && !entry.caption.trim()) {
      throw new Error(`La entrada "${entry.id}" tiene un caption vacío.`);
    }

    if (entry.visible && entry.description.pending) {
      throw new Error(
        `La entrada visible "${entry.id}" no puede tener texto pendiente.`,
      );
    }

    if (entry.visible && !entry.description.value.trim()) {
      throw new Error(`La entrada "${entry.id}" necesita texto visible.`);
    }

    if (entry.photoIds.length === 0) {
      throw new Error(`La entrada "${entry.id}" no contiene fotografías.`);
    }

    entryIds.add(entry.id);

    const photos = entry.photoIds.map((photoId) => {
      if (referencedPhotoIds.has(photoId)) {
        throw new Error(
          `La fotografía "${photoId}" está asociada a más de una entrada.`,
        );
      }

      const photo = getHowWeMetPhoto(photoId);
      referencedPhotoIds.add(photoId);
      return photo;
    });

    return {
      id: entry.id,
      ...(entry.title ? { title: entry.title } : {}),
      description: entry.description,
      composition: entry.composition,
      ...(entry.caption ? { caption: entry.caption } : {}),
      visible: entry.visible,
      photos,
    };
  });

  const unreferencedPhotoIds = [...manifestIds].filter(
    (photoId) => !referencedPhotoIds.has(photoId),
  );

  if (unreferencedPhotoIds.length > 0) {
    throw new Error(
      `Las siguientes fotografías no tienen entrada: ${unreferencedPhotoIds.join(", ")}.`,
    );
  }

  return resolvedEntries;
}

export const howWeMetStoryEntries = resolveHowWeMetStory(
  weddingContent.howWeMet.storyEntries,
);
