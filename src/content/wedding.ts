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

/**
 * ÚNICO ARCHIVO PARA EDITAR LA INFORMACIÓN DE LA BODA.
 *
 * - Cambia `value` por el dato real y `pending` a `false`.
 * - Usa los interruptores de `sections` para mostrar u ocultar secciones.
 * - No agregues información que la pareja no haya confirmado.
 */
export const weddingContent = {
  couple: {
    partnerOne: "Nombre 1",
    partnerTwo: "Nombre 2",
    initials: "N + N",
  },
  seo: {
    title: "Nuestra boda | Nombre 1 & Nombre 2",
    description:
      "Sitio de nuestra boda. Muy pronto compartiremos todos los detalles para nuestros invitados.",
  },
  hero: {
    eyebrow: "Nos casamos",
    message:
      "Muy pronto compartiremos aquí todos los detalles para celebrar este día con las personas que queremos.",
    messagePending: true,
    callToAction: "Conocer los detalles",
  },
  event: {
    date: { value: "Fecha pendiente", pending: true } satisfies EditableText,
    time: { value: "Hora pendiente", pending: true } satisfies EditableText,
    venue: { value: "Lugar pendiente", pending: true } satisfies EditableText,
    address: {
      value: "Dirección pendiente",
      pending: true,
    } satisfies EditableText,
    mapUrl: "",
    arrivalNotes: {
      value: "Las indicaciones de llegada se publicarán próximamente.",
      pending: true,
    } satisfies EditableText,
  },
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
    details: true,
    dressCode: true,
    story: true,
    engagement: true,
    gallery: true,
    additionalInfo: false,
  },
} as const;
