export type EditableText = {
  value: string;
  pending: boolean;
};

export type AdditionalInfoItem = {
  id: string;
  title: string;
  body: string;
  visible: boolean;
};

export type EventDetailsContent = {
  date: EditableText;
  dateIso: string;
  time: EditableText;
  dateTimeIso: string;
  timeZone?: string;
  venue: EditableText;
  address: EditableText;
  locationReference: string;
  description: string;
  mapUrl: string;
  mapLabel: string;
  arrivalNotes: EditableText;
};

/**
 * ÚNICO ARCHIVO PARA EDITAR LA INFORMACIÓN DE LA BODA.
 *
 * - Cambia `value` por el dato real y `pending` a `false`.
 * - Usa los interruptores de `sections` para mostrar u ocultar secciones.
 * - No agregues información que la pareja no haya confirmado.
 */
export const weddingContent = {
  couple: {
    partnerOne: "Juan David",
    partnerTwo: "Melisa",
    initials: "J + M",
  },
  hero: {
    eyebrow: "Nos casamos",
    callToAction: "Conocer los detalles",
  },
  ceremony: {
    date: {
      value: "12 de octubre de 2026",
      pending: false,
    } satisfies EditableText,
    dateIso: "2026-10-12",
    time: { value: "10:00 a. m.", pending: false } satisfies EditableText,
    dateTimeIso: "2026-10-12T10:00:00-05:00",
    timeZone: "America/Bogota",
    venue: {
      value: "Parroquia El Portal de Jesús",
      pending: false,
    } satisfies EditableText,
    address: {
      value: "Calle 33B Sur #46A-11, Envigado, Antioquia",
      pending: false,
    } satisfies EditableText,
    locationReference: "A dos cuadras de Viva Envigado",
    description:
      "Nuestra ceremonia se celebrará en la Parroquia El Portal de Jesús, ubicada en la Calle 33B Sur #46A-11, Envigado, Antioquia, a dos cuadras de Viva Envigado.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Parroquia%20El%20Portal%20de%20Jes%C3%BAs%2C%20Calle%2033B%20Sur%20%2346A-11%2C%20Envigado%2C%20Antioquia",
    mapLabel: "Ver ubicación de la Parroquia El Portal de Jesús en Google Maps",
    arrivalNotes: {
      value:
        "La ceremonia comienza puntualmente a las 10:00 a. m. Te invitamos a llegar con anticipación para que puedas acompañarnos desde el inicio de la misa.",
      pending: false,
    } satisfies EditableText,
  } satisfies EventDetailsContent,
  celebration: {
    time: { value: "Hora pendiente", pending: true } satisfies EditableText,
    dateTimeIso: "",
    venue: { value: "Lugar pendiente", pending: true } satisfies EditableText,
    address: {
      value: "Dirección pendiente",
      pending: true,
    } satisfies EditableText,
    locationReference: "",
    description:
      "Los datos de la celebración posterior se publicarán cuando estén confirmados.",
    mapUrl: "",
    mapLabel: "",
    arrivalNotes: {
      value: "Indicaciones pendientes.",
      pending: true,
    } satisfies EditableText,
  } satisfies Omit<EventDetailsContent, "date" | "dateIso">,
  dressCode: {
    title: "Código de vestuario pendiente",
    description: "Publicaremos la guía de vestuario cuando esté confirmada.",
    pending: true,
  },
  story: {
    paragraphs: [
      "La historia de la pareja se agregará aquí cuando el texto esté listo.",
    ],
    pending: true,
  },
  engagement: {
    title: "Cómo nos comprometimos",
    placeholder:
      "Esta historia todavía está en construcción. La compartiremos cuando esté lista, sin inventar ningún detalle.",
  },
  additionalInfo: {
    intro:
      "Aquí podremos publicar recomendaciones y respuestas útiles para los invitados.",
    items: [
      {
        id: "transport",
        title: "Transporte y parqueadero",
        body: "Información pendiente.",
        visible: false,
      },
      {
        id: "gifts",
        title: "Regalos",
        body: "Información pendiente.",
        visible: false,
      },
      {
        id: "children",
        title: "Niños",
        body: "Información pendiente.",
        visible: false,
      },
      {
        id: "contact",
        title: "Contacto",
        body: "Información pendiente.",
        visible: false,
      },
    ] satisfies AdditionalInfoItem[],
  },
  footer: {
    closing: "Gracias por acompañarnos en este camino.",
    closingPending: true,
  },
  sections: {
    ceremony: true,
    celebration: true,
    dressCode: true,
    story: true,
    engagement: true,
    gallery: true,
    additionalInfo: false,
  },
} as const;
