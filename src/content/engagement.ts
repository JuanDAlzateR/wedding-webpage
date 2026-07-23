import {
  engagementPhotos,
  getEngagementPhoto,
  type WeddingPhoto,
} from "./photos";
import { weddingContent, type EngagementStoryEntry } from "./wedding";

export type ResolvedEngagementStoryEntry = EngagementStoryEntry & {
  photo: WeddingPhoto;
};

function resolveEngagementStory(
  entries: readonly EngagementStoryEntry[],
): ResolvedEngagementStoryEntry[] {
  const photoManifestIds = new Set<string>();

  for (const photo of engagementPhotos) {
    if (!photo.id.trim()) {
      throw new Error("Una fotografía de compromiso no tiene id.");
    }

    if (photoManifestIds.has(photo.id)) {
      throw new Error(
        `El id de fotografía de compromiso "${photo.id}" está duplicado.`,
      );
    }

    photoManifestIds.add(photo.id);
  }

  const entryIds = new Set<string>();
  const referencedPhotoIds = new Set<string>();

  return entries.map((entry) => {
    if (!entry.id.trim()) {
      throw new Error("Una entrada de la historia del compromiso no tiene id.");
    }

    if (entryIds.has(entry.id)) {
      throw new Error(
        `El id de historia del compromiso "${entry.id}" está duplicado.`,
      );
    }

    if (referencedPhotoIds.has(entry.photoId)) {
      throw new Error(
        `La fotografía de compromiso "${entry.photoId}" está asociada a más de una entrada.`,
      );
    }

    if (entry.visible && !entry.description.value.trim()) {
      throw new Error(
        `La entrada visible "${entry.id}" necesita una descripción editable.`,
      );
    }

    const photo = getEngagementPhoto(entry.photoId);

    if (entry.visible && !photo.alt.trim()) {
      throw new Error(
        `La fotografía visible de la entrada "${entry.id}" necesita texto alternativo.`,
      );
    }

    entryIds.add(entry.id);
    referencedPhotoIds.add(entry.photoId);

    return {
      ...entry,
      photo,
    };
  });
}

export const engagementStoryEntries = resolveEngagementStory(
  weddingContent.engagement.storyEntries,
);
