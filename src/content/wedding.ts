import type {
  EngagementPhotoId,
  HomeGalleryPhotoId,
  HowWeMetPhotoId,
} from "./photos";

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

export type EngagementStoryEntry = {
  id: string;
  photoId: EngagementPhotoId;
  description: EditableText;
  title?: string;
  caption?: string;
  visible: boolean;
};

export type EngagementStoryChapter = {
  id: string;
  title: string;
  dateLabel: string;
  entries: EngagementStoryEntry[];
};

export type HowWeMetStoryChapter = {
  id: string;
  title?: string;
  text: EditableText;
  photoIds: readonly HowWeMetPhotoId[];
  visible: boolean;
};

export type BiblicalQuoteLine = {
  speaker?: "Ella" | "Él";
  text: string;
};

export type BiblicalQuote = {
  id: string;
  lines: readonly BiblicalQuoteLine[];
  reference: string;
};

export type GalleryEditorialQuote = BiblicalQuote & {
  afterPhotoId: HomeGalleryPhotoId;
};

export type DressCodeGuidance = {
  id: "women" | "men";
  label: string;
  description: string;
};

export type DressCodeRestrictedColor = {
  id: string;
  name: string;
  swatch: `#${string}`;
};

export type DressCodeContent = {
  title: string;
  style: string;
  guidance: readonly DressCodeGuidance[];
  decorum: string;
  complianceNote: string;
  restrictedColorsLabel: string;
  restrictedColors: readonly DressCodeRestrictedColor[];
  closingMessage: string;
  pending: boolean;
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
  mapUrl: string;
  mapLabel: string;
  arrivalNotes?: EditableText;
};

export type CelebrationDetailsContent = Omit<
  EventDetailsContent,
  "date" | "dateIso"
> & {
  description: readonly string[];
  confirmation: {
    title: string;
    body: string;
    callToAction: string;
    url: string;
    deadline: string;
  };
  accessNotice: {
    label: string;
    body: string;
  };
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
  biblicalQuotes: {
    hero: {
      id: "ephesians-unity",
      lines: [
        {
          text: "«La Escritura dice: “A causa de esto dejará el hombre a su padre y a su madre, y se adherirá a su mujer, y los dos serán una sola carne”. Este es un misterio muy grande, pues hace referencia a Cristo y a la Iglesia.»",
        },
      ],
      reference: "Ef 5:31–32",
    } satisfies BiblicalQuote,
    galleryIntroduction: {
      id: "song-belonging",
      lines: [
        {
          text: "Mi amado es para mí, y yo soy para mi amado: él pastorea entre los lirios.",
        },
      ],
      reference: "Cant 2:16",
    } satisfies BiblicalQuote,
    ceremony: {
      id: "tobit-prayer",
      lines: [
        {
          text: "«Oró: “Ten misericordia de nosotros, oh Señor, ten misericordia de nosotros, para que podamos llegar juntos a la vejez”. Dijeron a coro: “Amén, amén.” Y se acostaron para pasar la noche.»",
        },
      ],
      reference: "Tobías 8:9",
    } satisfies BiblicalQuote,
    galleryInterludes: [
      {
        id: "song-beauty",
        lines: [
          {
            speaker: "Ella",
            text: "«¡Que me bese con los besos de su boca! Mejores son que el vino tus amores; el olor de tu perfume es exquisito, tu nombre es esencia penetrante.»",
          },
          {
            speaker: "Él",
            text: "«¡Qué bella eres, amada mía! ¡Qué bella eres! ¡Palomas son tus ojos!»",
          },
        ],
        reference: "Cant 1:2, 15–17",
        afterPhotoId: "IMG_20240513_140005",
      },
      {
        id: "song-spring",
        lines: [
          {
            text: "«Levántate, amada mía, hermosa mía, y ven. Mira que ya ha pasado el invierno, han cesado las lluvias. Brotan las flores, es el tiempo de las canciones, se oye el arrullo de la tórtola en nuestra tierra.»",
          },
        ],
        reference: "Cant 2:10–11",
        afterPhotoId: "IMG_20240804_155455",
      },
      {
        id: "song-heart",
        lines: [
          {
            text: "«Me robaste el corazón, hermana y novia mía, me robaste el corazón con una sola mirada, con una sola perla del collar. ¡Qué hermosos tus amores, hermana mía y novia mía! ¡Tus amores son más sabrosos que el vino!»",
          },
        ],
        reference: "Cant 4:9–10",
        afterPhotoId: "IMG_6218",
      },
    ] satisfies readonly GalleryEditorialQuote[],
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
    locationReference: "Cerca de Viva Envigado",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Parroquia%20El%20Portal%20de%20Jes%C3%BAs%2C%20Calle%2033B%20Sur%20%2346A-11%2C%20Envigado%2C%20Antioquia",
    mapLabel: "Ver ubicación de la Parroquia El Portal de Jesús en Google Maps",
    arrivalNotes: {
      value:
        "La celebración dará inicio puntualmente a las 10:00 a. m. Te invitamos a llegar con anticipación para disponernos juntos a vivir la Santa Misa desde el comienzo.",
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
    description: [
      "Ocupas un lugar muy especial en nuestro corazón y en nuestra historia. Por eso, hemos reservado un lugar para que nos acompañes en la prolongación de la alegría de la celebración del sacramento.",
      "Te invitamos a compartir con nosotros el almuerzo y a continuar la celebración con una tarde de juegos, música, alegría y fiesta.",
    ],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Noviciado%20Hermanas%20Oblatas%20de%20San%20Francisco%20de%20Sales%2C%20Carrera%2032%20%2371%20Sur-240%2C%20Poblado%20del%20Sur%2C%20Sabaneta%2C%20Antioquia",
    mapLabel: "Ver ubicación de la celebración en Google Maps",
    confirmation: {
      title: "Confirmación",
      body: "Agradeceremos tu pronta confirmación para preparar cada detalle con cariño y, en caso de que no puedas acompañarnos, brindar la oportunidad a otro ser querido de compartir este día con nosotros.",
      callToAction: "Confirmar asistencia",
      url: "https://forms.gle/ubKwM6ez5RWDWNKy8",
      deadline: "Por favor, hazlo antes del 12 de septiembre.",
    },
    accessNotice: {
      label: "Importante",
      body: "Recuerda llevar contigo la tarjeta de invitación color naranja con tu nombre. Tu puesto ha sido reservado especialmente para ti y el acceso se realizará conforme a la lista de invitados confirmados.",
    },
  } satisfies CelebrationDetailsContent,
  dressCode: {
    title: "Código de vestimenta",
    style: "Cóctel clásico",
    guidance: [
      {
        id: "women",
        label: "Mujeres",
        description:
          "vestido midi o largo, o conjunto de pantalón de corte amplio.",
      },
      {
        id: "men",
        label: "Hombres",
        description: "traje o blazer con pantalón de vestir.",
      },
    ],
    decorum:
      "Por respeto al carácter sagrado de la celebración, elige atuendos sin escotes.",
    complianceNote:
      "El código de vestimenta hace parte de los detalles que hemos elegido cuidadosamente para este día, por lo que apreciamos su cumplimiento.",
    restrictedColorsLabel: "Evita los siguientes colores en el vestuario:",
    restrictedColors: [
      {
        id: "tiger-orange",
        name: "Naranja tigre",
        swatch: "#E8752E",
      },
      {
        id: "apricot",
        name: "Albaricoque",
        swatch: "#F2B27B",
      },
      {
        id: "ice-blue",
        name: "Azul hielo",
        swatch: "#DDEBF2",
      },
      {
        id: "baby-blue",
        name: "Azul bebé",
        swatch: "#AFCDE6",
      },
      {
        id: "sky-blue",
        name: "Azul cielo",
        swatch: "#79BCE8",
      },
    ],
    closingMessage:
      "Gracias por acompañarnos y por respetar este deseo en una ocasión tan especial para nosotros.",
    pending: false,
  } satisfies DressCodeContent,
  stories: {
    eyebrow: "Nuestra historia",
    title: "Dos capítulos de nuestra historia",
    introduction:
      "Dos recorridos distintos para recordar cómo comenzó nuestro camino y cómo decidimos dar el siguiente paso.",
    callToAction: "Leer este capítulo",
  },
  howWeMet: {
    eyebrow: "Nuestra historia",
    title: "Cómo nos conocimos",
    summary:
      "Una página preparada para contar, capítulo a capítulo, cómo comenzó nuestra historia.",
    callToAction: "Conocer este capítulo",
    pageTitle: "Cómo nos conocimos | Juan David y Melisa",
    pageDescription:
      "Un recorrido visual por el comienzo de la historia de Juan David y Melisa.",
    /**
     * El orden de los capítulos y de `photoIds` es la secuencia visible.
     * Es una organización provisional y no afirma una cronología confirmada.
     */
    storyChapters: [
      {
        id: "story-01",
        text: { value: "Texto historia 1", pending: true },
        photoIds: [
          "IMG_9996",
          "5588f2a1-6469-411b-94a6-70688f3f0728",
          "IMG_9332",
          "IMG_9371",
          "2bb7d1e6-1461-46f2-ba79-bd53f6b50d4b",
          "5d10a1e1-f1ca-4c7c-9954-99742fd30bb8",
          "a7c192de-c45e-4ffe-be17-3ea6e2a57f40",
          "IMG_0029",
        ],
        visible: true,
      },
      {
        id: "story-02",
        text: { value: "Texto historia 2", pending: true },
        photoIds: [
          "IMG_20240331_152546",
          "IMG_20240401_174155",
          "IMG_20240512_072059",
          "IMG_20240512_102640",
          "IMG_20240512_131842",
          "IMG_1396",
          "49f3432f-d0e1-4960-966d-18bd72d04577",
          "IMG_20240513_135421",
          "IMG_20240513_140005",
        ],
        visible: true,
      },
      {
        id: "story-03",
        text: { value: "Texto historia 3", pending: true },
        photoIds: [
          "IMG_20240513_140552",
          "d9637739-6758-4784-9aad-04845ed16c91",
          "IMG_1421",
          "9363abd4-99b9-4e0d-a271-5db9c23aa80d",
          "IMG_1437",
          "IMG_1487",
          "IMG_1502",
          "IMG_1503",
          "IMG_20240603_084353",
        ],
        visible: true,
      },
      {
        id: "story-04",
        text: { value: "Texto historia 4", pending: true },
        photoIds: [
          "IMG_3104_Original",
          "IMG_3201",
          "IMG_3286",
          "IMG_3327",
          "IMG_3556",
          "IMG_3673",
          "IMG_3682",
          "IMG_20240822_193157",
        ],
        visible: true,
      },
      {
        id: "story-05",
        text: { value: "Texto historia 5", pending: true },
        photoIds: [
          "bdf16d49-276f-45ec-aea9-417c2af45b21",
          "7577fcc5-cabe-4dca-8c0d-cdd730712317",
          "d945c198-686b-4a9e-bc10-ccbd1147c8dd",
          "IMG_20240908_155243",
          "IMG_20240916_025857",
          "IMG_20240928_003343",
          "IMG_4198",
          "IMG_20241006_214437",
          "IMG_20241010_141506",
        ],
        visible: true,
      },
      {
        id: "story-06",
        text: { value: "Texto historia 6", pending: true },
        photoIds: [
          "IMG_20241114_192336",
          "IMG_20241117_152645",
          "IMG_20241206_173739",
          "IMG_20241206_195832",
          "IMG_4780",
          "IMG_5636",
          "IMG_20250301_125321",
          "IMG_6218",
        ],
        visible: true,
      },
      {
        id: "story-07",
        text: { value: "Texto historia 7", pending: true },
        photoIds: [
          "IMG_6220",
          "IMG_6259",
          "IMG_6722",
          "IMG_20250814_171807",
          "IMG_20250913_112648",
          "IMG_20251004_193605",
          "IMG_1130",
          "IMG_20251013_124142",
          "IMG_1710",
        ],
        visible: true,
      },
      {
        id: "story-08",
        text: { value: "Texto historia 8", pending: true },
        photoIds: [
          "IMG_20251225_000451",
          "IMG_20251226_212606",
          "IMG_20260105_224015",
          "IMG_2223",
          "IMG_20260503_112317",
          "IMG_20260606_213322",
          "IMG_20260615_214420",
          "IMG_20260629_163753",
        ],
        visible: true,
      },
    ] satisfies readonly HowWeMetStoryChapter[],
  },
  engagement: {
    eyebrow: "Nuestra aventura",
    title: "Cómo nos comprometimos",
    summary:
      "Durante tres domingos, un juego de pistas, cartas y lugares especiales nos fue acercando al comienzo de una nueva etapa.",
    callToAction: "Descubrir nuestra historia",
    pageTitle: "Cómo nos comprometimos | Juan David y Melisa",
    pageDescription:
      "La historia del compromiso de Juan David y Melisa, contada a través de tres domingos de juegos, pistas y momentos compartidos.",
    storyEyebrow: "Tres domingos, una historia",
    storyTitle: "Pista a pista, hasta el destino final",
    /**
     * El orden de `storyChapters` y de cada arreglo `entries` es el orden visible.
     *
     * `visible` oculta o muestra la entrada completa.
     * `description.pending` conserva el borrador sin publicarlo.
     */
    storyChapters: [
      {
        id: "april-05",
        title: "El juego comienza",
        dateLabel: "Domingo de Resurrección · 5 de abril de 2026",
        entries: [
          {
            id: "april05-photo1",
            photoId: "april05-photo1",
            description: {
              value:
                "El Domingo de Resurrección, 5 de abril de 2026, después de Misa, comenzamos nuestra aventura con un primer reto: Melisa debía resolver un sudoku. Al completarlo, recibió las seis cartas que formarían su mazo inicial.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april05-photo2",
            photoId: "april05-photo2",
            description: {
              value:
                "Cada turno nos llevaba a descubrir un lugar a partir de una pista. Para avanzar, Melisa jugaba las cartas, aplicaba sus efectos al escanear códigos QR con el celular y administraba cuatro recursos: amor, fe, dinero y tiempo.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april05-photo3",
            photoId: "april05-photo3",
            description: {
              value:
                "En cada lugar, Melisa ganaba una nueva carta. Así, poco a poco, fue fortaleciendo su mazo y afinando la estrategia para continuar el recorrido.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april05-photo4",
            photoId: "april05-photo4",
            description: {
              value:
                "La ruta nos llevó por restaurantes, centros comerciales, parroquias y otros espacios. Cada lugar, conocido o nuevo, se convirtió en un turno distinto: un reto, una aventura y una sorpresa más.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april05-photo5",
            photoId: "april05-photo5",
            description: {
              value:
                "Terminamos el primer día contentos y muy cansados. Antes de guardar el juego para retomarlo después, agradecimos a Dios con una oración.",
              pending: false,
            },
            visible: true,
          },
        ],
      },
      {
        id: "april-12",
        title: "La aventura continúa",
        dateLabel: "12 de abril de 2026",
        entries: [
          {
            id: "april12-photo1",
            photoId: "april12-photo1",
            description: {
              value:
                "El domingo siguiente retomamos la aventura en la Universidad Nacional. Allí, Melisa debía resolver una ecuación cuadrática para poder avanzar.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april12-photo2",
            photoId: "april12-photo2",
            description: {
              value:
                "Después de resolver el reto, Melisa obtuvo la carta «Mapa, parte A», una pieza que más adelante tendría un papel importante en el juego.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april12-photo3",
            photoId: "april12-photo3",
            description: {
              value:
                "Luego fuimos a Misa y continuamos el recorrido de la mano de María, caminando hacia Jesús.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april12-photo4",
            photoId: "april12-photo4",
            description: {
              value:
                "Más tarde almorzamos en Parques del Río. La aventura también nos regaló un espacio para hablar, compartir y reflexionar sobre nuestro noviazgo.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april12-photo5",
            photoId: "april12-photo5",
            description: {
              value:
                "Después continuamos el recorrido en el Jardín Botánico, sumando un nuevo lugar a esta aventura.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april12-photo6",
            photoId: "april12-photo6",
            description: {
              value:
                "Terminamos el día ya entrada la noche, haciendo una breve visita a Jesús. Luego Melisa obtuvo la carta «Mapa, parte B» y, al jugar ambas partes en el mismo turno, desbloqueó el mapa del juego: una guía con las bases y las rutas posibles que le ayudó a orientarse.",
              pending: false,
            },
            visible: true,
          },
        ],
      },
      {
        id: "april-19",
        title: "El destino final",
        dateLabel: "19 de abril de 2026",
        entries: [
          {
            id: "april19-photo1",
            photoId: "april19-photo1",
            description: {
              value:
                "El tercer domingo, después de Misa, regresamos a Parques del Río. El juego permitía volver a lugares anteriores, aunque esta vez no se obtenían cartas nuevas.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april19-photo2",
            photoId: "april19-photo2",
            description: {
              value:
                "A medida que avanzábamos, los turnos se hacían más complejos y estratégicos. Cada uno consumía un punto de amor, así que la regla más importante era no permitir que ese recurso se agotara.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april19-photo3",
            photoId: "april19-photo3",
            description: {
              value:
                "Entonces comenzó la segunda fase del juego, que nos llevaría a recorrer varios lugares fuera de Medellín.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april19-photo4",
            photoId: "april19-photo4",
            description: {
              value:
                "Ni la lluvia ni el frío nos impidieron continuar. Seguimos jugando hasta llegar al destino final.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april19-photo5",
            photoId: "april19-photo5",
            description: {
              value:
                "En el Ave María, con las Hijas del Fiat, llegamos al mismo lugar donde Melisa le había escrito una carta a San José dos años antes. Allí, Juan David le pidió que fuera su esposa.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april19-photo6",
            photoId: "april19-photo6",
            description: {
              value:
                "El anillo no fue elegido por ser el más costoso ni el más lujoso, sino por haber sido escogido y entregado con mucho amor.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april19-photo7",
            photoId: "april19-photo7",
            description: {
              value:
                "Junto al anillo de compromiso estaban otros regalos llenos de significado: la manilla de nuestro primer aniversario y el anillo con los corazones de la Sagrada Familia, entregado en octubre de 2025 como promesa de una futura propuesta de matrimonio.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april19-photo8",
            photoId: "april19-photo8",
            description: {
              value:
                "Después de las dificultades y los obstáculos, tanto en el juego como durante nuestro noviazgo, llegamos a este momento: nos comprometimos y comenzamos una nueva etapa, felices y agradecidos con Dios, María y San José.",
              pending: false,
            },
            visible: true,
          },
        ],
      },
    ] satisfies EngagementStoryChapter[],
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
    dressCode: true,
    stories: true,
    gallery: true,
    gifts: true,
    additionalInfo: false,
  },
} as const;
