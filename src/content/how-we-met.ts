import { getHowWeMetPhoto, howWeMetPhotos, type GalleryPhoto } from "./photos";
import { weddingContent, type HowWeMetStoryChapter } from "./wedding";

export type ResolvedHowWeMetStoryChapter = Omit<
  HowWeMetStoryChapter,
  "photoIds"
> & {
  photos: readonly GalleryPhoto[];
};

function resolveHowWeMetStory(
  chapters: readonly HowWeMetStoryChapter[],
): ResolvedHowWeMetStoryChapter[] {
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

  const chapterIds = new Set<string>();
  const referencedPhotoIds = new Set<string>();
  const referencedPhotoOrder: string[] = [];

  const resolvedChapters = chapters.map((chapter, index) => {
    if (!chapter.id.trim()) {
      throw new Error("Un capítulo de Cómo nos conocimos no tiene id.");
    }

    if (chapterIds.has(chapter.id)) {
      throw new Error(`El capítulo "${chapter.id}" está repetido.`);
    }

    if (chapter.title !== undefined && !chapter.title.trim()) {
      throw new Error(`El capítulo "${chapter.id}" tiene un título vacío.`);
    }

    if (chapter.visible && !chapter.text.value.trim()) {
      throw new Error(`El capítulo "${chapter.id}" necesita texto visible.`);
    }

    if (
      chapter.text.pending &&
      chapter.text.value !== `Texto historia ${index + 1}`
    ) {
      throw new Error(
        `El placeholder del capítulo "${chapter.id}" no sigue la secuencia editorial.`,
      );
    }

    if (chapter.photoIds.length === 0) {
      throw new Error(`El capítulo "${chapter.id}" no contiene fotografías.`);
    }

    chapterIds.add(chapter.id);

    const photos = chapter.photoIds.map((photoId) => {
      if (referencedPhotoIds.has(photoId)) {
        throw new Error(
          `La fotografía "${photoId}" está asociada a más de un capítulo.`,
        );
      }

      const photo = getHowWeMetPhoto(photoId);
      referencedPhotoIds.add(photoId);
      referencedPhotoOrder.push(photoId);
      return photo;
    });

    return {
      id: chapter.id,
      ...(chapter.title ? { title: chapter.title } : {}),
      text: chapter.text,
      visible: chapter.visible,
      photos,
    };
  });

  const unreferencedPhotoIds = [...manifestIds].filter(
    (photoId) => !referencedPhotoIds.has(photoId),
  );

  if (unreferencedPhotoIds.length > 0) {
    throw new Error(
      `Las siguientes fotografías no tienen capítulo: ${unreferencedPhotoIds.join(", ")}.`,
    );
  }

  const manifestOrder = howWeMetPhotos.map(({ id }) => id);
  const misplacedPhotoId = referencedPhotoOrder.find(
    (photoId, index) => photoId !== manifestOrder[index],
  );

  if (misplacedPhotoId) {
    throw new Error(
      `La secuencia de capítulos no respeta el orden provisional en "${misplacedPhotoId}".`,
    );
  }

  return resolvedChapters;
}

export const howWeMetStoryChapters = resolveHowWeMetStory(
  weddingContent.howWeMet.storyChapters,
);
