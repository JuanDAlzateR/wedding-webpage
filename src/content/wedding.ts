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

export type HowWeMetStoryComposition =
  "single" | "stack-left" | "pair-below" | "split-stacks";

export type HowWeMetStoryEntry = {
  id: string;
  title?: string;
  description: EditableText;
  photoIds: readonly HowWeMetPhotoId[];
  composition: HowWeMetStoryComposition;
  caption?: string;
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
  decorum: {
    body: string;
    emphasis: string;
  };
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
  eyebrow: string;
  title: string;
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
    emphasis: string;
  };
};

export type GiftContent = {
  eyebrow: string;
  title: string;
  paragraphs: readonly [string, string];
  keyParagraph: string;
  key: string;
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
        afterPhotoId: "9363abd4-99b9-4e0d-a271-5db9c23aa80d",
      },
      {
        id: "song-spring",
        lines: [
          {
            text: "«Levántate, amada mía, hermosa mía, y ven. Mira que ya ha pasado el invierno, han cesado las lluvias. Brotan las flores, es el tiempo de las canciones, se oye el arrullo de la tórtola en nuestra tierra.»",
          },
        ],
        reference: "Cant 2:10–11",
        afterPhotoId: "IMG_20260518_154633",
      },
      {
        id: "song-heart",
        lines: [
          {
            text: "«Me robaste el corazón, hermana y novia mía, me robaste el corazón con una sola mirada, con una sola perla del collar. ¡Qué hermosos tus amores, hermana mía y novia mía! ¡Tus amores son más sabrosos que el vino!»",
          },
        ],
        reference: "Cant 4:9–10",
        afterPhotoId: "IMG_20251225_000451",
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
        "La Celebración dará inicio puntualmente a las 10:00 a. m. Te invitamos a llegar con anticipación para disponernos juntos a vivir la Santa Misa desde el comienzo.",
      pending: false,
    } satisfies EditableText,
  } satisfies EventDetailsContent,
  celebration: {
    eyebrow: "Después de la Eucaristía",
    title: "Recepción",
    time: { value: "12:30 p. m.", pending: false } satisfies EditableText,
    dateTimeIso: "2026-10-12T12:30:00-05:00",
    endTime: { value: "6:30 p. m.", pending: false } satisfies EditableText,
    endDateTimeIso: "2026-10-12T18:30:00-05:00",
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
      "Ocupas un lugar muy especial en nuestro corazón y en nuestra historia. Por eso, hemos reservado un lugar para que nos acompañes en la prolongación de la alegría de la Celebración del Sacramento.",
      "Te invitamos a compartir con nosotros el almuerzo y a continuar la celebración con una tarde de juegos, música, fiesta y alegría.",
    ],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Noviciado%20Hermanas%20Oblatas%20de%20San%20Francisco%20de%20Sales%2C%20Carrera%2032%20%2371%20Sur-240%2C%20Poblado%20del%20Sur%2C%20Sabaneta%2C%20Antioquia",
    mapLabel: "Ver ubicación de la Recepción en Google Maps",
    confirmation: {
      title: "Confirmación",
      body: "Agradeceremos tu pronta confirmación para preparar cada detalle con cariño y, en caso de que no puedas acompañarnos, brindar la oportunidad a otro ser querido de compartir este día con nosotros.",
      callToAction: "Confirmar asistencia",
      url: "https://forms.gle/ubKwM6ez5RWDWNKy8",
      deadline: "Por favor, hazlo antes del 1 de septiembre.",
    },
    accessNotice: {
      label: "Importante",
      body: "Recuerda llevar contigo la tarjeta de invitación color naranja con tu nombre. Tu puesto ha sido reservado especialmente para ti y",
      emphasis:
        "el acceso se realizará conforme a la lista de invitados confirmados. Favor confirmar la asistencia antes del 1 de septiembre.",
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
          "Vestido midi o largo, o conjunto de pantalón de corte amplio.",
      },
      {
        id: "men",
        label: "Hombres",
        description: "Traje o blazer con pantalón de vestir.",
      },
    ],
    decorum: {
      body: "Por respeto al carácter sagrado de la celebración,",
      emphasis: "elige atuendos sin escotes.",
    },
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
      {
        id: "marine-blue",
        name: "Azul marino",
        swatch: "#243B5A",
      },
      {
        id: "navy-blue",
        name: "Azul navy",
        swatch: "#172554",
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
      "Un recorrido por los encuentros, las oraciones y los detalles con los que Dios fue tejiendo nuestra historia.",
    callToAction: "Conocer este capítulo",
    pageTitle: "Cómo nos conocimos | Juan David y Melisa",
    pageDescription:
      "La historia de Juan David y Melisa, contada a través de los encuentros, detalles y fotografías que marcaron su noviazgo.",
    storyEyebrow: "Nuestra historia, momento a momento",
    storyTitle: "Un sí de confianza que nos trajo hasta aquí",
    /**
     * El orden de `storyEntries` y de cada arreglo `photoIds` es el orden visible.
     * El manifiesto fotográfico funciona únicamente como biblioteca.
     */
    storyEntries: [
      {
        id: "a-fiat-of-trust",
        description: {
          value:
            "Si esta imagen puede considerarse el inicio de nuestra historia, habría que decir que comenzó hace más de diez años. Creo que, de alguna manera, las decisiones individuales de cada uno nos llevaron hasta aquel momento y, después, hasta aquí. Ya quedan solo unos meses para que Juan David y yo seamos esposos, y Dios ha estado presente desde el principio. Como ven en esta imagen, ese principio se remonta mucho más atrás que el 24 de febrero de 2024, el primer día en que nos vimos. Ese día me encontraba en Medellín dando una plática muy peculiar: en realidad, transmitía una reflexión que había tocado profundamente mi corazón solo unos días antes y que he tenido que recordarme constantemente desde entonces: debo confiar en Dios y en su plan, soltar los míos y perseverar con excelencia. Sí, esta historia comienza con un sí de confianza, después de años de guardarme para mí misma. Aún hoy sigo luchando por confiar, pero vuelvo la mirada y veo lo que el Señor ha hecho con uno solo de mis Fiat; no deja de sorprenderme mi pequeñez por no confiar más. Solo confía.",
          pending: false,
        },
        photoIds: ["history-01"],
        composition: "single",
        visible: true,
      },
      {
        id: "the-day-we-met",
        description: {
          value:
            "Así es: nos conocimos el 24 de febrero en el CP, el Centro Pastoral del Sodalicio de Vida Cristiana, un día en que ninguno de los dos debía estar allí. Ese mismo día comimos perritos, que se convertirían en nuestro plato favorito, y fuimos al cine juntos. ¿Quién diría que dos años después estaríamos en una carrera por coleccionar visitas al cine? El 25 de febrero fuimos juntos al Ave María. También es el lugar donde casi terminamos y el escenario de nuestra primera foto juntos: esa que ven a un lado, de los dos junto a la cruz. Una foto arriesgada, de dos incautos que sintieron el llamado a tomarse una foto con alguien que era prácticamente un desconocido. Pero Dios no se queda con nada: vivimos alegrías, tristezas, retos y triunfos en ese mismo lugar, y todo ha sido su amorosa respuesta a un pedido de amor.",
          pending: false,
        },
        photoIds: ["history-02"],
        composition: "single",
        visible: true,
      },
      {
        id: "saint-joseph",
        description: {
          value:
            "El Ave María es un convento en Guarne. Allí fui en 2021 buscando escuchar a Dios. Fueron tres semanas en el cielo; lloré por los hijos que no tenía porque estuve casi convencida de que Él me llamaba a ser su esposa en la tierra, pero, claro, tenía otros planes. Volví tres años después con una petición y, sin saberlo, con la respuesta a mi lado. Esta vez recurrí a un aliado infalible: el glorioso San José. Acudí a él, mi padre del cielo, para que intercediera por mí ante el mismísimo Padre de todos los hombres. ¿Cómo no oiría Dios a este varón prudente a quien Él mismo encargó a su Hijo, frágil e indefenso? Le hice una petición inocente y, lo admito, un tanto desesperada: «Oh, glorioso San José, si es voluntad de Dios que conozca a un varón que quiera ser santo…». Y no me quedé ahí; debo admitir, con un poco de vergüenza, que añadí: «P. D.: que sea pronto». Hermanos míos, tengan cuidado con lo que piden y con cómo disponen su corazón, porque cuando un cristiano se dispone y pide que se haga en su vida la voluntad del Padre, el Dios misericordioso no desoye esa súplica. Aquí estamos, entonces, a un par de meses de que este pobre abismo de nulidad, llamado Melisa, se una en matrimonio a un varón que de veras desea ser santo. ¡Cuán inmerecido don me ha dado Dios en mi novio! Oren por mí para que pueda acoger su corazón como él ha custodiado el mío.",
          pending: false,
        },
        photoIds: ["history-03"],
        composition: "single",
        visible: true,
      },
      {
        id: "flowers-and-details",
        description: {
          value:
            "Estas florecitas que ven por todos lados fueron solo una de las ingeniosas formas en que cautivó mi corazón. Me envió flores un 8 de marzo y consiguió él mismo la dirección de mi casa después de que lo reté a hacerlo. Los lirios naranjas los envió a mi puerta el mismo día en que culminamos la novena a San José, once días después de las primeras flores. Pero, queridos lectores, no fueron solo flores: este muchacho ya se había ofrecido a llevarme al aeropuerto aquel fin de semana de febrero que estuve en Medellín; ofreció sus oraciones y el sacrificio de la Eucaristía por mí desde ese día, y me lo hizo saber. Durante el rezo de la novena me desveló hablándome de toda clase de temas interesantes, me escribió poemas y reflexiones cada mañana y, el día que no lo hizo, fue para decirme que quería recordarme que siempre estaría ahí para mí.",
          pending: false,
        },
        photoIds: ["history-04", "history-05", "history-06", "history-07"],
        composition: "stack-left",
        visible: true,
      },
      {
        id: "our-first-date",
        description: {
          value:
            "Esta foto es de nuestra primera cita, el Domingo de Resurrección de 2024. Este varón de Dios me invitó a comer. Nos encontramos en Medellín después de no haber hablado durante una semana; cuando nos vimos, llevaba una enorme maleta. Debo confesar que tenía miedo: muchas dudas en el corazón se habían resuelto con la meditación de la primera estación del viacrucis de Hakuna, mientras otras iban y venían con las porras de mi querido Andrés Hernández durante el descenso hacia el Valle de Aburrá. Muchachos, en esa maleta había otro ramo y una carta por cada día que no habíamos hablado. Todas confirmaban un mensaje que me había mandado la primera vez que le dije «Te quiero»; me respondió: «Meli, yo te quiero, me gustas y me gustas para Dios». Más tarde, ese mismo día, no resistí abrazarlo mientras Laurita fue a su cuarto a traer algo. Esperábamos a más amigos para inaugurar una de nuestras actividades favoritas juntos: los juegos de mesa con amigos.",
          pending: false,
        },
        photoIds: ["history-08"],
        composition: "single",
        visible: true,
      },
      {
        id: "we-became-a-couple",
        description: {
          value:
            "Nos hicimos novios el 13 de mayo de 2024, tras completar la renovación de nuestra consagración a Jesús por María a la luz de las reflexiones que el buen Javi Lariguet enviaba cada día. Era de esperarse que sucediera en esa fecha; el misterio era cuándo. Una semana antes, mi buen novio me dijo que me preparara para la última semana soltera de mi vida. Aproveché el congreso de Somos Suyos para escribir frente al Santísimo una carta de respuesta, que le entregué justo cuando me hizo esa pregunta tan esperada. Esa semana también recibí otros obsequios: diferentes elementos del entonces beato Carlo Acutis, un rosario de medallas de San Benito, una estatuita de San José y algunos más que resultaron ser más de mi gusto que del suyo —stickers—, pero así pasa cuando apenas se está abriendo el corazón. Lo ignorábamos en ese momento, pero los lunes festivos se volverían especiales; San Carlo Acutis nos acogería en su día, y el 12 de octubre, fecha en que años atrás Juan David se consagró por primera vez a Jesús por medio de María, se convertiría en el día de nuestra boda. Que no se me olvide contarles: el 13 de mayo de 2024 resolví por primera vez un sudoku muy especial y, cuando desencripté su mensaje, pude entregar mi carta. Ese día también recibí un corazón de Jesús azul celeste y otros regalos, pero ese corazón anticipaba, además, una gran aventura.",
          pending: false,
        },
        photoIds: ["history-09"],
        composition: "single",
        visible: true,
      },
      {
        id: "our-colors",
        description: {
          value:
            "El naranja y el azul celeste se convirtieron rápidamente en nuestros colores. Los encontrábamos en el cielo cuando tomábamos un avión para ir hacia el otro en la distancia: de Medellín a Bogotá y de Bogotá a Medellín. El cielo era una prueba de que la complementariedad de nuestros colores favoritos, inscrita por Dios en la creación, hablaba también de la complementariedad de nuestros corazones.",
          pending: false,
        },
        photoIds: ["history-10", "history-11"],
        composition: "pair-below",
        visible: true,
      },
      {
        id: "shared-moments",
        description: {
          value:
            "Los detalles no han parado, como este picnic que ni la lluvia arruinó; el servicio mano a mano en apostolados, como los retiros de Teología del Cuerpo; y la compañía en la enfermedad, cuando pensé que me estaban dando un cuarto VIP, pero en realidad me estaban aislando. Ese día me dije: «Si he de parir algún día, que sea de la mano de este hombre». Hemos pasado noches en vela jugando, días de lluvia varados en la moto y salidas con amigos para mostrarles la ciudad, como aquella foto en las luces de Navidad, cortesía de mi incondicional Rivera San. También hemos compartido caminatas por las montañas antioqueñas; días de sol, como el del cambuche que hicimos para ver el desfile de silleteros, siempre animados por nuestra gran amiga Laurita; y primeros sábados firmes junto a Santi en el rosario de Hombres. Hemos compartido mucho y nos hemos conocido en retiros, peleas, horas santas, debates, canciones, siestas, reflexiones, oración, perdón, charlas, proyectos, angustia, terapia, ansiedad y felicidad.",
          pending: false,
        },
        photoIds: [
          "history-12",
          "history-13",
          "history-14",
          "history-15",
          "history-16",
          "history-17",
        ],
        composition: "split-stacks",
        visible: true,
      },
      {
        id: "marriage-retreat",
        description: {
          value:
            "Hace un par de semanas, mientras despedíamos nuestro noviazgo, recibimos un regalo especial —uno de tantos y tan inmerecidos— de mis papás, quienes me recuerdan cada día cómo luce el amor incondicional. Nos uniformaron con la frase que marcó nuestro noviazgo: «El amor me lo explicó todo», del buen Juan Pablo II, otro de nuestros amigos del cielo. Era necesario casarnos en su mes. Salimos uniformados y llenos de amor del retiro de matrimonios de Lazos de Amor Mariano. Gracias a todos los que nos enviaron cartas y me hicieron llorar de alegría durante toda la noche. Ese retiro fue para nosotros una confirmación de la voluntad de Dios. Ahora oren por nosotros para que se haga en nuestra familia la obra de la Gracia y podamos responder con nuestra pequeñez a los dones tan grandes que hemos recibido. Gracias por hacer parte de nuestra historia.",
          pending: false,
        },
        photoIds: ["history-18"],
        composition: "single",
        visible: true,
      },
      {
        id: "engagement-blessing",
        description: {
          value:
            "Los dejo con esta última foto del lunes festivo 13 de julio, en el que, con un abrazo filial de nuestro padre Domingo García, sellamos nuestro compromiso con la bendición de Dios.",
          pending: false,
        },
        photoIds: ["history-19"],
        composition: "single",
        visible: true,
      },
    ] satisfies readonly HowWeMetStoryEntry[],
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
                "En el Ave María, con las Hijas del Fiat, llegamos al mismo lugar donde Melisa le había escrito una carta a San José dos años antes. Allí, pedí a Melisa que fuera mi esposa.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april19-photo6",
            photoId: "april19-photo6",
            description: {
              value:
                "No conseguí el anillo más costoso ni el más lujoso, pero si busqué entregarlo con mucho amor.",
              pending: false,
            },
            visible: true,
          },
          {
            id: "april19-photo7",
            photoId: "april19-photo7",
            description: {
              value:
                "El anillo se añadió a otros regalos llenos de significado: la manilla de nuestro primer aniversario y el anillo con los corazones de la Sagrada Familia, entregado en octubre de 2025 como promesa de una futura propuesta de matrimonio.",
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
    title: "Nuestro regalo",
    paragraphs: [
      "Lo más valioso para nosotros será contar con sus oraciones; de verdad, las necesitamos.",
      "Su presencia en este día tan especial es un don que agradecemos de corazón.",
    ],
    keyParagraph:
      "Si, además, desean tener un detalle con nosotros, recibiremos con mucho cariño su lluvia de sobres. Si les resulta más cómodo, también podrán enviar su obsequio a nuestra llave",
    key: "@Alzate6073",
  } satisfies GiftContent,
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
