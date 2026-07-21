export type InvitationType = "mass_only" | "mass_and_celebration";

export type InvitationSection =
  | "ceremony"
  | "celebration"
  | "dressCode"
  | "story"
  | "engagement"
  | "gallery"
  | "additionalInfo";

export type InvitationNavigationItem = {
  href: `#${string}`;
  label: string;
};

export interface InvitationVariant {
  type: InvitationType;
  path: `/invitacion/${string}/`;
  pageTitle: string;
  pageDescription: string;
  heroMessage: string;
  robots: "noindex, nofollow";
  sections: Record<InvitationSection, boolean>;
  navigation: readonly InvitationNavigationItem[];
}

export const invitationRoutes = {
  massOnly: "/invitacion/misa/",
  massAndCelebration: "/invitacion/c7N4pQ2x/",
} as const satisfies Record<string, InvitationVariant["path"]>;

export const invitationVariants = {
  mass_only: {
    type: "mass_only",
    path: invitationRoutes.massOnly,
    pageTitle: "Eucaristía de Juan David y Melisa | 12 de octubre de 2026",
    pageDescription:
      "Acompaña a Juan David y Melisa en la Eucaristía de su matrimonio el 12 de octubre de 2026 en la Parroquia El Portal de Jesús, en Envigado.",
    heroMessage:
      "Con mucha alegría, queremos invitarte a acompañarnos en la Eucaristía de nuestro matrimonio.",
    robots: "noindex, nofollow",
    sections: {
      ceremony: true,
      celebration: false,
      dressCode: false,
      story: true,
      engagement: true,
      gallery: true,
      additionalInfo: false,
    },
    navigation: [
      { href: "#eucaristia", label: "Eucaristía" },
      { href: "#historia", label: "Historia" },
      { href: "#fotos", label: "Fotos" },
    ],
  },
  mass_and_celebration: {
    type: "mass_and_celebration",
    path: invitationRoutes.massAndCelebration,
    pageTitle: "Boda de Juan David y Melisa | 12 de octubre de 2026",
    pageDescription:
      "Acompaña a Juan David y Melisa en la Eucaristía de su matrimonio y en la celebración posterior el 12 de octubre de 2026.",
    heroMessage:
      "Con mucha alegría, queremos invitarte a acompañarnos en la Eucaristía de nuestro matrimonio y a compartir la celebración posterior.",
    robots: "noindex, nofollow",
    sections: {
      ceremony: true,
      celebration: true,
      dressCode: true,
      story: true,
      engagement: true,
      gallery: true,
      additionalInfo: false,
    },
    navigation: [
      { href: "#eucaristia", label: "Eucaristía" },
      { href: "#encuentro", label: "Celebración" },
      { href: "#fotos", label: "Fotos" },
    ],
  },
} as const satisfies Record<InvitationType, InvitationVariant>;

export function getInvitationVariant(type: InvitationType): InvitationVariant {
  return invitationVariants[type];
}

export function getInvitationSlug(variant: InvitationVariant): string {
  const segments = variant.path.split("/").filter(Boolean);
  return segments.at(-1) ?? "";
}
