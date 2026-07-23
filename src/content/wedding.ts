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

export type VisibleParagraph = {
  id: string;
  text: string;
  visible: boolean;
};

export type EventDetailsContent = {
  date: EditableText;
  dateIso: string;
  time: EditableText;
  dateTimeIso: string;
  endTime?: EditableText;
  endDateTimeIso?: string;
  timeZone?: string;
  venue: EditableText;
  address: EditableText;
  locationReference: string;
  description: string;
  mapUrl: string;
  mapLabel: string;
  arrivalNotes?: EditableText;
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
      "Nuestra liturgia se celebrará en la Parroquia El Portal de Jesús, ubicada en la Calle 33B Sur #46A-11, Envigado, Antioquia, a dos cuadras de Viva Envigado.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Parroquia%20El%20Portal%20de%20Jes%C3%BAs%2C%20Calle%2033B%20Sur%20%2346A-11%2C%20Envigado%2C%20Antioquia",
    mapLabel: "Ver ubicación de la Parroquia El Portal de Jesús en Google Maps",
    arrivalNotes: {
      value:
        "La liturgia comienza puntualmente a las 10:00 a. m. Te invitamos a llegar con anticipación para que puedas acompañarnos desde el inicio de la Misa.",
      pending: false,
    } satisfies EditableText,
  } satisfies EventDetailsContent,
  celebration: {
    time: { value: "12:30 p. m.", pending: false } satisfies EditableText,
    dateTimeIso: "2026-10-12T12:30:00-05:00",
    endTime: { value: "6:00 p. m.", pending: false } satisfies EditableText,
    endDateTimeIso: "2026-10-12T18:00:00-05:00",
    venue: {
      value: "Noviciado Hermanas Oblatas de San Francisco de Sales",
      pending: false,
    } satisfies EditableText,
    address: {
      value: "Carrera 32 #71 Sur-240, Poblado del Sur, Sabaneta, Antioquia",
      pending: false,
    } satisfies EditableText,
    locationReference: "Cerca de la Parroquia San Felipe Apóstol",
    description:
      "Después de la Eucaristía, celebraremos juntos en el Noviciado Hermanas Oblatas de San Francisco de Sales.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Noviciado%20Hermanas%20Oblatas%20de%20San%20Francisco%20de%20Sales%2C%20Carrera%2032%20%2371%20Sur-240%2C%20Poblado%20del%20Sur%2C%20Sabaneta%2C%20Antioquia",
    mapLabel: "Ver ubicación de la celebración en Google Maps",
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
    eyebrow: "Nuestra aventura",
    title: "Cómo nos comprometimos",
    summary:
      "Una historia de juegos, códigos QR y pistas que nos condujeron al comienzo de una nueva etapa.",
    callToAction: "Descubrir nuestra historia",
    pageTitle: "Cómo nos comprometimos | Juan David y Melisa",
    pageDescription:
      "La historia de una aventura entre juegos, códigos QR y pistas que condujo a la propuesta de matrimonio de Juan David y Melisa.",
    storyEyebrow: "Pista a pista",
    storyTitle: "Una aventura con un destino especial",
    galleryEyebrow: "Recuerdos del recorrido",
    galleryTitle: "Nuestra aventura en imágenes",
    paragraphs: [
      {
        id: "adventure",
        text: "Nuestro compromiso nació de una aventura preparada con mucho cariño. Todo comenzó con una actividad que combinaba una carrera de observación, juegos de mesa y una aplicación en el celular para leer códigos QR.",
        visible: true,
      },
      {
        id: "clues",
        text: "Cada código revelaba una nueva pista y nos guiaba hacia el siguiente paso. Entre preguntas, retos y momentos compartidos, fuimos avanzando poco a poco hasta llegar al destino final.",
        visible: true,
      },
      {
        id: "proposal",
        text: "Allí nos esperaba el momento más importante de la aventura: la propuesta de matrimonio que abrió una nueva etapa en nuestra historia.",
        visible: true,
      },
      {
        id: "new-chapter",
        text: "Fue una experiencia especial, divertida y llena de significado. Cada pista nos acercó no solo al final del recorrido, sino también al comienzo del camino que hoy nos lleva hacia nuestro matrimonio.",
        visible: true,
      },
    ] satisfies VisibleParagraph[],
    editorialNotes: [
      "[Texto pendiente: agregar cómo comenzó la actividad.]",
      "[Texto pendiente: describir una pista o momento especial del recorrido.]",
      "[Texto pendiente: agregar cómo ocurrió la propuesta y cómo vivimos ese momento.]",
    ],
  },
  gifts: {
    eyebrow: "Con cariño",
    title: "Un detalle para nosotros",
    body: "Su presencia y compañía son nuestro mejor regalo. Si desean tener un detalle con nosotros, recibiremos con mucho cariño lluvia de sobres.",
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
    dressCode: false,
    story: false,
    engagement: true,
    gallery: true,
    gifts: true,
    additionalInfo: false,
  },
} as const;
