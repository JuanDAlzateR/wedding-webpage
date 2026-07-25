export type InvitationType = "mass_only" | "mass_and_celebration";

export type InvitationSection =
  | "ceremony"
  | "celebration"
  | "dressCode"
  | "stories"
  | "gallery"
  | "gifts"
  | "additionalInfo";

export type InvitationNavigationItem = {
  href: `#${string}`;
  label: string;
};

export type InvitationNavigationKey =
  | "home"
  | "ceremony"
  | "celebration"
  | "confirmation"
  | "stories"
  | "gallery"
  | "dressCode"
  | "gifts"
  | "additionalInfo";

export interface InvitationVariant {
  type: InvitationType;
  path: `/invitacion/${string}/`;
  pageTitle: string;
  pageDescription: string;
  heroMessage: string;
  robots: "noindex, nofollow";
  sections: Record<InvitationSection, boolean>;
  navigationOrder: readonly InvitationNavigationKey[];
}

export const invitationRoutes = {
  massOnly: "/invitacion/misa/",
  massAndCelebration: "/invitacion/c7N4pQ2x/",
} as const satisfies Record<string, InvitationVariant["path"]>;

export const invitationNavigationItems = {
  home: { href: "#inicio", label: "Inicio" },
  ceremony: { href: "#eucaristia", label: "Celebración Litúrgica" },
  celebration: { href: "#encuentro", label: "Celebración posterior" },
  confirmation: { href: "#confirmacion", label: "Confirmación" },
  stories: { href: "#historia", label: "Nuestra historia" },
  gallery: { href: "#galeria", label: "Galería de nuestro amor" },
  dressCode: { href: "#vestuario", label: "Código de vestimenta" },
  gifts: { href: "#regalos", label: "Un detalle para nosotros" },
  additionalInfo: { href: "#informacion", label: "Información adicional" },
} as const satisfies Record<InvitationNavigationKey, InvitationNavigationItem>;

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
      dressCode: true,
      stories: true,
      gallery: true,
      gifts: true,
      additionalInfo: false,
    },
    navigationOrder: [
      "home",
      "ceremony",
      "dressCode",
      "gifts",
      "stories",
      "gallery",
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
      stories: true,
      gallery: true,
      gifts: true,
      additionalInfo: false,
    },
    navigationOrder: [
      "home",
      "ceremony",
      "celebration",
      "confirmation",
      "dressCode",
      "gifts",
      "stories",
      "gallery",
    ],
  },
} as const satisfies Record<InvitationType, InvitationVariant>;

export function getInvitationVariant(type: InvitationType): InvitationVariant {
  return invitationVariants[type];
}

export function getInvitationNavigation(
  variant: InvitationVariant,
  visibleSections: Record<InvitationSection, boolean>,
): readonly InvitationNavigationItem[] {
  return variant.navigationOrder
    .filter((key) => {
      if (key === "home") {
        return true;
      }

      if (key === "confirmation") {
        return visibleSections.celebration;
      }

      return visibleSections[key];
    })
    .map((key) => invitationNavigationItems[key]);
}

export function getInvitationSlug(variant: InvitationVariant): string {
  const segments = variant.path.split("/").filter(Boolean);
  return segments.at(-1) ?? "";
}
