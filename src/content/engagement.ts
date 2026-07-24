import {
  engagementPhotos,
  getEngagementPhoto,
  type WeddingPhoto,
} from "./photos";
import {
  weddingContent,
  type EngagementStoryChapter,
  type EngagementStoryEntry,
} from "./wedding";

export type ResolvedEngagementStoryEntry = EngagementStoryEntry & {
  photo: WeddingPhoto;
};

export type ResolvedEngagementStoryChapter = Omit<
  EngagementStoryChapter,
  "entries"
> & {
  entries: ResolvedEngagementStoryEntry[];
};

function resolveEngagementStory(
  chapters: readonly EngagementStoryChapter[],
): ResolvedEngagementStoryChapter[] {
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

  const chapterIds = new Set<string>();
  const entryIds = new Set<string>();
  const referencedPhotoIds = new Set<string>();

  const resolvedChapters = chapters.map((chapter) => {
    if (!chapter.id.trim()) {
      throw new Error("Un capítulo de la historia del compromiso no tiene id.");
    }

    if (chapterIds.has(chapter.id)) {
      throw new Error(
        `El id de capítulo del compromiso "${chapter.id}" está duplicado.`,
      );
    }

    if (!chapter.title.trim() || !chapter.dateLabel.trim()) {
      throw new Error(
        `El capítulo "${chapter.id}" necesita título y fecha visible.`,
      );
    }

    chapterIds.add(chapter.id);

    const entries = chapter.entries.map((entry) => {
      if (!entry.id.trim()) {
        throw new Error(
          "Una entrada de la historia del compromiso no tiene id.",
        );
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

      if (entry.visible && entry.description.pending) {
        throw new Error(
          `La entrada visible "${entry.id}" no puede tener texto pendiente.`,
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

    return {
      ...chapter,
      entries,
    };
  });

  const unreferencedPhotoIds = [...photoManifestIds].filter(
    (photoId) => !referencedPhotoIds.has(photoId),
  );

  if (unreferencedPhotoIds.length > 0) {
    throw new Error(
      `Las siguientes fotografías de compromiso no tienen entrada: ${unreferencedPhotoIds.join(", ")}.`,
    );
  }

  return resolvedChapters;
}

export const engagementStoryChapters = resolveEngagementStory(
  weddingContent.engagement.storyChapters,
);
