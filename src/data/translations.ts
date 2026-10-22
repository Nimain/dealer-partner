export type Language = "es" | "en";

export interface Translations {
  nav: {
    dealers: string;
    owners: string;
    aboutUs: string;
    faq: string;
    bookCall: string;
    contact: string;
    bookIntroCall: string;
    translateOption: string;
  };
  hero: {
    tagBadge: string;
    headlinePart1: string;
    headlineHighlight: string;
    subtitle: string;
    joinDealer: string;
    downloadBrochure: string;
    exploreFeatures: string;
    badges: {
      telematicsActive: string;
      geofenceOn: string;
      predictiveService: string;
      automatedLeads: string;
    };
    stats: {
      tractorsCount: string;
      tractorsLabel: string;
      revenueBoost: string;
      revenueLabel: string;
      gpsSafety: string;
      gpsLabel: string;
      zeroDowntime: string;
      zeroLabel: string;
    };
  };
  stats: {
    headlineWords: Array<{ text: string; highlight: boolean }>;
    cards: Array<{
      id: string;
      targetNumber: number;
      prefix?: string;
      suffix?: string;
      decimals?: number;
      startNumber?: number;
      label: string;
      subtext: string;
      badge: string;
    }>;
  };
  dealers: {
    sectionTag: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    pillars: Array<{
      number: string;
      tag: string;
      title: string;
      desc: string;
      stat: string;
      statLabel: string;
      image: string;
      alt: string;
      animation: string;
    }>;
    joinPillarsBadge: string;
    joinPillarsTitle: string;
    joinPillarsSub: string;
    applyPartnerButton: string;
    calcRevenueButton: string;
    featuresHeading: string;
    quote: {
      text1: string;
      highlight1: string;
      text2: string;
      highlight2: string;
      text3: string;
    };
    features: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  owners: {
    sectionTitlePre: string;
    sectionTitleHighlight: string;
    sectionSubtitle: string;
    modules: Array<{
      id: string;
      moduleName: string;
      tag: string;
      description: string;
      statHighlight?: string;
      statNote?: string;
      previewTag: string;
      imageUrl: string;
    }>;
  };
  faq: {
    sectionTag: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    categories: {
      all: string;
      dealers: string;
      owners: string;
      hardware: string;
    };
    items: Array<{
      id: string;
      category: "dealers" | "owners" | "hardware";
      tag: string;
      question: string;
      answer: string;
    }>;
  };
  cta: {
    tagBadge: string;
    heading: string;
    description: string;
    brochureBtn: string;
    applyBtn: string;
  };
  footer: {
    description: string;
    dealersColTitle: string;
    dealersLinks: Array<{ name: string; href: string }>;
    ownersColTitle: string;
    ownersLinks: Array<{ name: string; href: string }>;
    aboutColTitle: string;
    aboutLinks: Array<{ name: string; href: string }>;
    rights: string;
    madeFor: string;
    privacy: string;
    terms: string;
  };
  modal: {
    badge: string;
    dealerTitle: string;
    ownerTitle: string;
    subtitle: string;
    roleDealer: string;
    roleOwner: string;
    dealershipNameLabel: string;
    dealershipNamePlaceholder: string;
    locationLabel: string;
    locationPlaceholderDealer: string;
    locationPlaceholderOwner: string;
    contactNameLabel: string;
    contactNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    ownerMachineryLabel: string;
    cfVerifying: string;
    cfVerified: string;
    cfVerifyPrompt: string;
    cfError: string;
    cfTerms: string;
    cfPrivacy: string;
    submitDealer: string;
    submitOwner: string;
    submitting: string;
    successDealerTitle: string;
    successOwnerTitle: string;
    successDealerMessage: (name: string, dealer: string) => string;
    successOwnerMessage: string;
    verifiedRef: string;
    downloadBrochureBtn: string;
    downloadSpanishBrochureBtn: string;
    downloadEnglishBrochureBtn: string;
    chooseBrochureLang: string;
    spanishEdition: string;
    englishEdition: string;
    s3DirectLink: string;
    downloadedBtn: string;
    whatsappBtn: string;
    doneBtn: string;
  };
  stickyPill: {
    badge: string;
    title: string;
    cta: string;
  };
  dealerRevenue: {
    tag: string;
    title: string;
    subtitle: string;
    annualVolumeLabel: string;
    averageMarginLabel: string;
    renewalRateLabel: string;
    projectedRevenueTitle: string;
    projectedPerYear: string;
    hardwareMarginLabel: string;
    renewalCommissionsLabel: string;
    workshopSparesLabel: string;
    ctaButton: string;
    backHome: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      dealers: "Concesionarios",
      owners: "Propietarios",
      aboutUs: "Sobre nosotros",
      faq: "Preguntas Frecuentes",
      bookCall: "Agendar llamada",
      contact: "Contacto",
      bookIntroCall: "Agendar Llamada Introductoria",
      translateOption: "Idioma",
    },
    hero: {
      tagBadge: "AGRICULTURA INTELIGENTE Y TELEMETRÍA DE TRACTORES",
      headlinePart1: "Maquinaria Conectada e Inteligencia de Flota para ",
      headlineHighlight: "Concesionarios y Agricultores",
      subtitle:
        "Telemetría GPS en tiempo real, diagnósticos de mantenimiento predictivo y el ecosistema líder en Latinoamérica para distribuidores agrícolas y dueños de maquinaria.",
      joinDealer: "Unirse como Concesionario",
      downloadBrochure: "Descargar Dossier Comercial",
      exploreFeatures: "Explorar Funciones",
      badges: {
        telematicsActive: "Telemetría en Vivo Activa",
        geofenceOn: "Cerca Antirrobo Activada",
        predictiveService: "Alertas de Taller Predictivas",
        automatedLeads: "Leads de Agricultores Automatizados",
      },
      stats: {
        tractorsCount: "200+",
        tractorsLabel: "Tractores Conectados",
        revenueBoost: "+35%",
        revenueLabel: "Facturación en Taller",
        gpsSafety: "24/7",
        gpsLabel: "Seguridad GPS y Geocercas",
        zeroDowntime: "Cero",
        zeroLabel: "Paradas No Programadas",
      },
    },
    stats: {
      headlineWords: [
        { text: "Conectamos,", highlight: false },
        { text: "monitoreamos,", highlight: false },
        { text: "protegemos", highlight: false },
        { text: "y", highlight: false },
        { text: "potenciamos", highlight: false },
        { text: "su", highlight: false },
        { text: "maquinaria", highlight: false },
        { text: "agrícola", highlight: false },
        { text: "con", highlight: false },
        { text: "precisión", highlight: true },
        { text: "absoluta", highlight: true },
        { text: "y", highlight: false },
        { text: "eficiencia", highlight: false },
        { text: "operativa", highlight: false },
        { text: "en", highlight: false },
        { text: "su", highlight: false },
        { text: "núcleo.", highlight: false },
      ],
      cards: [
        {
          id: "tractors",
          targetNumber: 200,
          suffix: "+",
          label: "Tractores y maquinaria operando activamente en Latinoamérica",
          subtext: "Compatible con John Deere, New Holland, Massey Ferguson y más",
          badge: "Flota Conectada",
        },
        {
          id: "revenue",
          targetNumber: 35,
          prefix: "+",
          suffix: "%",
          label: "Aumento promedio en facturación de taller para concesionarios",
          subtext: "Alertas predictivas enviadas antes de una rotura mecánica",
          badge: "Crecimiento Comercial",
        },
        {
          id: "hours",
          targetNumber: 2.5,
          suffix: "M+",
          decimals: 1,
          label: "Horas de motor analizadas y optimizadas en consumo de diésel",
          subtext: "RPM en vivo, voltaje de batería y hectáreas cosechadas",
          badge: "Datos de Telemetría",
        },
        {
          id: "uptime",
          targetNumber: 99.8,
          suffix: "%",
          decimals: 1,
          startNumber: 88,
          label: "Disponibilidad garantizada durante siembra y cosecha crítica",
          subtext: "Cero retrasos en campo cuando el agricultor más lo necesita",
          badge: "Fiabilidad Máxima",
        },
      ],
    },
    dealers: {
      sectionTag: "RED OFICIAL DE DISTRIBUIDORES",
      titleMain: "Potencie su Concesionario con ",
      titleHighlight: "Tecnología Telemática",
      subtitle:
        "Multiplique la venta de maquinaria, fidelice a los agricultores de su región y asegure el cobro y servicio continuo de sus flotas.",
      pillars: [
        {
          number: "01",
          tag: "Canal de Productores",
          title: "Flujo Directo de Agricultores Regionales",
          desc: "Exhiba su inventario de tractores e implementos directamente a miles de agricultores activos en su departamento o provincia.",
          stat: "+40%",
          statLabel: "Aumento en consultas comerciales calificadas en 60 días",
          image: "/images/dealers/lead-radar-3d.png",
          alt: "Radar 3D de Productores Regionales",
          animation: "animate-float-3d",
        },
        {
          number: "02",
          tag: "Taller Predictivo",
          title: "Monetización de Mantenimiento Predictivo",
          desc: "Detecte códigos de falla y desgaste de motor antes de que ocurran roturas. Convierta la telemetría en ingresos recurrentes para su taller.",
          stat: "+35%",
          statLabel: "Mayor facturación en repuestos genuinos y mano de obra",
          image: "/images/dealers/diagnostics-gear-3d.png",
          alt: "Núcleo de Diagnóstico de Motor 3D",
          animation: "animate-float-reverse-3d",
        },
        {
          number: "03",
          tag: "Seguridad de Activos",
          title: "Seguridad Financiera y Cero Riesgo",
          desc: "Proteja tractores entregados a crédito o financiamiento. El rastreo GPS en tiempo real y el inmovilizador remoto blindan su capital 24/7.",
          stat: "100%",
          statLabel: "Visibilidad total sobre maquinaria financiada y vendida",
          image: "/images/dealers/fleet-shield-3d.png",
          alt: "Escudo 3D de Seguridad de Flota",
          animation: "animate-float-3d",
        },
        {
          number: "04",
          tag: "Plataforma Integral",
          title: "Centro Digital para Concesionarios",
          desc: "Olvídese de planillas manuales. Gestione inventario, despacho de mecánicos a campo y clientes desde un solo portal unificado.",
          stat: "24 hrs",
          statLabel: "Activación inmediata e instalación rápida de hardware",
          image: "/images/dealers/dealer-os-3d.png",
          alt: "Centro Digital 3D Holatractor",
          animation: "animate-float-reverse-3d",
        },
      ],
      joinPillarsBadge: "VENTAJAS DE SOCIEDAD OFICIAL",
      joinPillarsTitle: "¿Por qué unirse a la Red Holatractor?",
      joinPillarsSub:
        "Margen garantizado en hardware IoT, comisiones recurrentes por suscripción de plataforma y derivación exclusiva de agricultores de su zona.",
      applyPartnerButton: "Postular como Concesionario Oficial",
      calcRevenueButton: "Calcular Proyección de Ganancias",
      featuresHeading: "Funciones Avanzadas del Panel de Concesionario",
      quote: {
        text1: "En lugar de limitarse a 'vender un tractor', impulsamos — ",
        highlight1: "‘Construir una relación permanente con el productor para maximizar cada cosecha’",
        text2: ", donde Holatractor le ayuda a detectar oportunidades, ",
        highlight2: "automatizar el taller mecánico",
        text3: " y fidelizar a sus clientes de por vida.",
      },
      features: [
        {
          id: "inventory",
          title: "Portal de Inventario y Maquinaria",
          description:
            "Exhiba sus tractores, cosechadoras e implementos disponibles con fichas técnicas de alta resolución. Sincronice inventario y precios en tiempo real con miles de agricultores de su zona para acelerar la rotación de unidades.",
        },
        {
          id: "ai-agent",
          title: "Flujo Autónomo con Agentes de IA",
          description:
            "Agente inteligente que atiende WhatsApp 24/7, califica el interés de compra de los agricultores, consulta disponibilidad en inventario y programa visitas de campo o revisiones en taller sin demoras humanas.",
        },
        {
          id: "repair",
          title: "Despacho de Taller y Reparaciones",
          description:
            "Convierta las averías en campo en ingresos recurrentes y de alto margen. Monitoree códigos de falla (DTC) en tiempo real, automatice cronogramas de mantenimiento preventivo y guíe a sus mecánicos directamente al lote.",
        },
        {
          id: "telemetry",
          title: "Flota IoT y Telemetría Satelital",
          description:
            "Monitoreo telemático integral: horas de motor, consumo de combustible, uso de toma de fuerza (TDF) y batería. Geocercas virtuales para proteger maquinaria financiada o en alquiler contra traslados no autorizados.",
        },
        {
          id: "marketing",
          title: "Agro-Marketing Regional Segmentado",
          description:
            "Envíe difusiones automáticas por WhatsApp y SMS sincronizadas con el calendario de siembra y cosecha. Promocione implementos estacionales, descuentos en repuestos y servicios post-cosecha con retorno de inversión medible.",
        },
      ],
    },
    owners: {
      sectionTitlePre: "Para ",
      sectionTitleHighlight: "Propietarios y Agricultores",
      sectionSubtitle:
        "Transforme su tractor en una máquina inteligente. Control satelital, protección contra robo de diésel y gestión de trabajos de campo.",
      modules: [
        {
          id: "assets",
          moduleName: "Registro y Estado de Salud del Tractor",
          tag: "Garaje Digital y Mantenimiento",
          description:
            "Historial centralizado de sus tractores, cosechadoras e implementos. Monitoree temperatura, batería, horas de uso y reciba alertas para servicio de 250 horas.",
          statHighlight: "-45%",
          statNote: "reducción en roturas mayores de motor y gastos de taller.",
          previewTag: "Telemetría en Vivo de Motor",
          imageUrl: "/images/owner/owner-asset-dashboard.jpg",
        },
        {
          id: "tracking",
          moduleName: "GPS en Tiempo Real y Bloqueo Antirrobo",
          tag: "Rastreo Satelital y Diésel",
          description:
            "Posicionamiento 24/7 vía satélite con historial de recorridos, alertas de salida de lote o comunidad y apagado remoto de motor desde el celular.",
          statHighlight: "100%",
          statNote: "control sobre el tractor en labores lejanas y resguardo contra robos.",
          previewTag: "Radar Satelital de Campo",
          imageUrl: "/images/owner/owner-tracking-dashboard.jpg",
        },
        {
          id: "rentals",
          moduleName: "Renta de Maquinaria y Trabajo a Terceros",
          tag: "Mercado de Contratistas",
          description:
            "Rentabilice los días que su tractor no opera. Reciba solicitudes de siembra o arado de parcelas vecinas con hectáreas y distancia confirmada.",
          previewTag: "Portal de Trabajos y Renta",
          imageUrl: "/images/owner/owner-booking-dashboard.jpg",
        },
        {
          id: "operators",
          moduleName: "Control de Maquinistas y Rendimiento",
          tag: "Seguridad y Puntuación de Conducción",
          description:
            "Registro de turnos, velocidad de trabajo en parcela y cálculo automático de jornales o hectáreas trabajadas por maquinista.",
          statHighlight: "+28%",
          statNote: "mayor productividad y menor desgaste de fierros.",
          previewTag: "Control de Operadores",
          imageUrl: "/images/owner/owner-operators-dashboard.jpg",
        },
        {
          id: "field-jobs",
          moduleName: "Registro de Hectáreas y Liquidación",
          tag: "Medición GPS de Lote y Facturación",
          description:
            "Programe labores de roturación, rastra o siembra. Calcule las hectáreas exactas trabajadas por satélite y envíe recibos automáticos por WhatsApp.",
          statHighlight: "Cero",
          statNote: "conflictos de cobro gracias a reportes satelitales certificados.",
          previewTag: "Medición de Hectáreas GPS",
          imageUrl: "/images/owner/owner-fieldjobs-dashboard.jpg",
        },
      ],
    },
    faq: {
      sectionTag: "PREGUNTAS FRECUENTES",
      titleMain: "Todo lo que Necesita Saber sobre ",
      titleHighlight: "Holatractor",
      subtitle:
        "Respuestas claras sobre la instalación telemática, compatibilidad con tractores y beneficios para concesionarios.",
      categories: {
        all: "Todas las Consultas",
        dealers: "Para Concesionarios",
        owners: "Para Propietarios de Tractores",
        hardware: "Hardware y Telemetría",
      },
      items: [
        {
          id: "dealer-leads",
          category: "dealers",
          tag: "Prospectos de Agricultores",
          question: "¿Cómo genera Holatractor clientes calificados para nuestro concesionario?",
          answer:
            "Holatractor canaliza la demanda de maquinaria y solicitudes de compra de agricultores en su departamento o región. Verificamos la superficie agrícola y necesidad de potencia antes de derivar al comprador directamente a su panel.",
        },
        {
          id: "dealer-inventory",
          category: "dealers",
          tag: "Gestión de Inventario",
          question: "¿Puede nuestro concesionario gestionar stock de tractores, implementos y precios en vivo?",
          answer:
            "Sí. El portal de inventario permite exhibir maquinaria disponible, implementos agrícolas y repuestos con precios y fotos sincronizadas en tiempo real.",
        },
        {
          id: "owner-compatibility",
          category: "owners",
          tag: "Compatibilidad de Maquinaria",
          question: "¿Qué marcas y modelos de tractores son compatibles con Holatractor?",
          answer:
            "Holatractor es compatible con el 98% de la maquinaria agrícola, incluyendo John Deere, New Holland, Massey Ferguson, Case IH, Valtra, Mahindra y Kubota. Instalación rápida sin anular garantías de fábrica.",
        },
        {
          id: "owner-antitheft",
          category: "owners",
          tag: "Seguridad y Antirrobo",
          question: "¿Cómo funciona el rastreo GPS en vivo y el inmovilizador remoto?",
          answer:
            "Puede definir geocercas satelitales en su lote o estancia. Si el tractor sale del perímetro en horarios no autorizados o hay encendido sospechoso, recibe alertas instantáneas por WhatsApp y puede bloquear el encendido desde el celular.",
        },
        {
          id: "owner-fuel",
          category: "owners",
          tag: "Control de Diésel y Hectáreas",
          question: "¿Puedo controlar el consumo de diésel y las horas efectivas de motor?",
          answer:
            "Sí. Registra horas efectivas con toma de fuerza (TDF), tiempo en ralentí y litros consumidos por hectárea trabajada, evitando el desvío de combustible durante trabajos con maquinistas.",
        },
        {
          id: "owner-breakdown",
          category: "owners",
          tag: "Asistencia en Campo",
          question: "¿Cómo solicito auxilio mecánico o repuestos en caso de avería en plena parcela?",
          answer:
            "Desde la app móvil de Holatractor, presione 'Solicitar Servicio Mecánico'. El sistema comparte las coordenadas GPS exactas y el código de falla, enviando al técnico autorizado más cercano con los repuestos indicados.",
        },
        {
          id: "owner-resale",
          category: "owners",
          tag: "Valor de Reventa",
          question: "¿La telemetría de Holatractor incrementa el valor de reventa de mi tractor?",
          answer:
            "Sí. Mantiene un pasaporte digital inalterable de servicios y horas verificadas de motor, aumentando el valor de tasación entre un 12% y 18% para ventas o créditos bancarios.",
        },
        {
          id: "hardware-battery",
          category: "hardware",
          tag: "Consumo de Batería",
          question: "¿El dispositivo telemático descarga la batería del tractor si queda parado semanas?",
          answer:
            "No. Cuenta con modo ultra-bajo consumo de menos de 2mA con contacto apagado e incluye batería de respaldo interna con autonomía de hasta 7 días si se desconecta la alimentación.",
        },
        {
          id: "hardware-offline",
          category: "hardware",
          tag: "Zonas sin Señal Celular",
          question: "¿Qué sucede si el tractor trabaja en zonas rurales sin cobertura de telefonía?",
          answer:
            "El hardware almacena hasta 30 días de trayectorias, horas de motor y alertas en su memoria interna. En cuanto detecta señal móvil, sincroniza toda la información automáticamente a la nube.",
        },
      ],
    },
    cta: {
      tagBadge: "ÚNASE A LA RED AUTORIZADA",
      heading: "Haga Crecer su Negocio de Maquinaria Agrícola",
      description:
        "Conecte su concesionario a la red telemática líder. Conquiste agricultores en su región, multiplique los servicios de taller y proteja sus activos financiados.",
      brochureBtn: "Solicitar Dossier Informativo",
      applyBtn: "Postular como Concesionario",
    },
    footer: {
      description:
        "Ecosistema de telemetría y gestión de maquinaria agrícola conectando concesionarios, contratistas y agricultores en Latinoamérica.",
      dealersColTitle: "Concesionarios",
      dealersLinks: [
        { name: "Telemetría para Distribuidores", href: "#dealers" },
        { name: "Monitoreo de Flotas", href: "#dealers" },
        { name: "Proyección de Ganancias", href: "/dealer-revenue" },
        { name: "API de Integración", href: "#dealers" },
      ],
      ownersColTitle: "Propietarios",
      ownersLinks: [
        { name: "Rastreo Satelital de Tractores", href: "#stages" },
        { name: "Telemetría y Control de Diésel", href: "#stages" },
        { name: "Geocercas y Bloqueo Antirrobo", href: "#stages" },
        { name: "App Móvil de Operaciones", href: "#stages" },
        { name: "Medición GPS de Hectáreas", href: "#stages" },
      ],
      aboutColTitle: "Compañía",
      aboutLinks: [
        { name: "Sobre Holatractor", href: "https://holatractor.com" },
        { name: "Nuestra Misión", href: "#stages" },
        { name: "Tecnología y Hardware", href: "#dealers" },
        { name: "Preguntas Frecuentes", href: "#faq" },
        { name: "Contacto Comercial", href: "#dealers" },
      ],
      rights: "Todos los derechos reservados.",
      madeFor: "Desarrollado para la agricultura moderna en Bolivia y Latinoamérica.",
      privacy: "Privacidad",
      terms: "Términos de Servicio",
    },
    modal: {
      badge: "Alianza Oficial Holatractor",
      dealerTitle: "Unirse a la Red de Concesionarios",
      ownerTitle: "Agendar Consulta de Maquinaria",
      subtitle:
        "Conecte su concesionario con agricultores de su región, telemetría preventiva de taller y hardware IoT de alto margen.",
      roleDealer: "Concesionario de Maquinaria",
      roleOwner: "Propietario / Flota de Campo",
      dealershipNameLabel: "Nombre del Concesionario / Agencia *",
      dealershipNamePlaceholder: "ej. Maquinaria Agrícola del Oriente",
      locationLabel: "Ubicación *",
      locationPlaceholderDealer: "ej. Bolivia, Lima...",
      locationPlaceholderOwner: "ej. 2 Tractores en Bolivia, Lima...",
      contactNameLabel: "Nombre de Contacto *",
      contactNamePlaceholder: "ej. Carlos Mendoza",
      phoneLabel: "Teléfono / WhatsApp *",
      phonePlaceholder: "+591 XXXXXXXX",
      emailLabel: "Correo Electrónico Laboral *",
      emailPlaceholder: "contacto@agencia.com",
      ownerMachineryLabel: "Maquinaria y Ubicación de Campo",
      cfVerifying: "Verificando conexión segura...",
      cfVerified: "¡Verificación humana completada con éxito!",
      cfVerifyPrompt: "Verificar que eres humano",
      cfError: "Por favor complete la verificación de seguridad para continuar",
      cfTerms: "Términos",
      cfPrivacy: "Privacidad",
      submitDealer: "Enviar Solicitud y Recibir Dossier Inmediato",
      submitOwner: "Confirmar Solicitud de Consulta",
      submitting: "Verificando territorio y generando kit...",
      successDealerTitle: "¡Bienvenido a la Red Holatractor!",
      successOwnerTitle: "¡Solicitud de Consulta Confirmada!",
      successDealerMessage: (name: string, dealer: string) =>
        `¡Gracias, ${name || "Socio"}! El perfil de territorio para ${dealer || "su empresa"} ha sido registrado prioritariamente. Nuestro director regional le contactará en menos de 24 horas.`,
      successOwnerMessage:
        "¡Muchas gracias! Nuestro especialista en telemetría agrícola se comunicará a la brevedad para coordinar la demostración en campo.",
      verifiedRef: "Solicitud Verificada • Referencia",
      downloadBrochureBtn: "Descargar Folleto Comercial (PDF)",
      downloadSpanishBrochureBtn: "Descargar Folleto en Español (PDF)",
      downloadEnglishBrochureBtn: "Download Brochure in English (PDF)",
      chooseBrochureLang: "Idioma del folleto:",
      spanishEdition: "Edición Español",
      englishEdition: "English Edition",
      s3DirectLink: "Enlace directo S3 (Nube)",
      downloadedBtn: "Folleto Descargado ✓",
      whatsappBtn: "Chatear con Director Regional",
      doneBtn: "Finalizar y Volver a la Página",
    },
    stickyPill: {
      badge: "Soporte Regional",
      title: "Asesoría en Maquinaria",
      cta: "Hablar con un Especialista",
    },
    dealerRevenue: {
      tag: "MODELO FINANCIERO Y RENTABILIDAD",
      title: "Calculadora de Ingresos para Concesionarios",
      subtitle:
        "Proyecte las ganancias anuales adicionales que su concesionario generará integrando telemetría, venta de hardware y servicios de taller recurrentes.",
      annualVolumeLabel: "Volumen Anual de Maquinaria Vendida o Atendida",
      averageMarginLabel: "Margen Promedio por Dispositivo IoT",
      renewalRateLabel: "Comisión Anual por Renovación de Plataforma",
      projectedRevenueTitle: "Aumento Anual de Ingresos Proyectado",
      projectedPerYear: "por año",
      hardwareMarginLabel: "Margen Directo de Venta Hardware",
      renewalCommissionsLabel: "Comisiones Recurrentes de Suscripción",
      workshopSparesLabel: "Servicios de Taller y Repuestos Adicionales",
      ctaButton: "Postular para Distribución Exclusiva",
      backHome: "Volver a la Página Principal",
    },
  },
  en: {
    nav: {
      dealers: "Dealers",
      owners: "Owners",
      aboutUs: "About us",
      faq: "FAQ",
      bookCall: "Book a call",
      contact: "Contact",
      bookIntroCall: "Book an Introductory Call",
      translateOption: "Language",
    },
    hero: {
      tagBadge: "SMART AGRICULTURE & TRACTOR TELEMATICS",
      headlinePart1: "Connected Machinery & Fleet Intelligence for ",
      headlineHighlight: "Dealers & Tractor Owners",
      subtitle:
        "Real-time GPS telemetry, predictive maintenance diagnostics, and Latin America's leading machinery ecosystem for agricultural dealerships, fleet distributors, and farmers.",
      joinDealer: "Join as Dealer Partner",
      downloadBrochure: "Download Dealer Brochure",
      exploreFeatures: "Explore Features",
      badges: {
        telematicsActive: "Live Telematics Active",
        geofenceOn: "Anti-Theft Geofence ON",
        predictiveService: "Predictive Service Alerts",
        automatedLeads: "Automated Dealer Leads",
      },
      stats: {
        tractorsCount: "200+",
        tractorsLabel: "Tractors Connected",
        revenueBoost: "+35%",
        revenueLabel: "Workshop Service Billings",
        gpsSafety: "24/7",
        gpsLabel: "GPS & Geofence Safety",
        zeroDowntime: "Zero",
        zeroLabel: "Unscheduled Downtime",
      },
    },
    stats: {
      headlineWords: [
        { text: "We", highlight: false },
        { text: "connect,", highlight: false },
        { text: "monitor,", highlight: false },
        { text: "protect,", highlight: false },
        { text: "and", highlight: false },
        { text: "empower", highlight: false },
        { text: "your", highlight: false },
        { text: "agricultural", highlight: false },
        { text: "machinery", highlight: false },
        { text: "with", highlight: false },
        { text: "absolute", highlight: true },
        { text: "precision", highlight: true },
        { text: "and", highlight: false },
        { text: "operational", highlight: false },
        { text: "efficiency", highlight: false },
        { text: "at", highlight: false },
        { text: "its", highlight: false },
        { text: "core.", highlight: false },
      ],
      cards: [
        {
          id: "tractors",
          targetNumber: 200,
          suffix: "+",
          label: "Tractors and farm machines actively connected across Latin America",
          subtext: "Compatible with John Deere, New Holland, Massey Ferguson & more",
          badge: "Connected Fleet",
        },
        {
          id: "revenue",
          targetNumber: 35,
          prefix: "+",
          suffix: "%",
          label: "Average increase in workshop service billings for dealer partners",
          subtext: "Predictive maintenance alerts sent before mechanical breakdown",
          badge: "Dealer Growth",
        },
        {
          id: "hours",
          targetNumber: 2.5,
          suffix: "M+",
          decimals: 1,
          label: "Engine operational hours monitored and optimized for fuel economy",
          subtext: "Live RPM, battery voltage, and acreage tilled analytics",
          badge: "Telemetry Data",
        },
        {
          id: "uptime",
          targetNumber: 99.8,
          suffix: "%",
          decimals: 1,
          startNumber: 88,
          label: "Machinery uptime delivered during critical sowing & harvest seasons",
          subtext: "Zero unscheduled delays when farmers need equipment most",
          badge: "Reliability",
        },
      ],
    },
    dealers: {
      sectionTag: "OFFICIAL DEALERSHIP NETWORK",
      titleMain: "Empower Your Dealership with ",
      titleHighlight: "Smart Telematics",
      subtitle:
        "Multiply machine sales, build lasting loyalty with regional farmers, and secure continuous service and maintenance contracts.",
      pillars: [
        {
          number: "01",
          tag: "Farmer Pipeline",
          title: "Direct Regional Farmer Pipeline",
          desc: "Put your showroom inventory directly in front of thousands of active farmers seeking tractors and implements in your district.",
          stat: "+40%",
          statLabel: "Increase in qualified inquiries within 60 days",
          image: "/images/dealers/lead-radar-3d.png",
          alt: "3D Regional Farmer Pipeline Radar",
          animation: "animate-float-3d",
        },
        {
          number: "02",
          tag: "Predictive Service",
          title: "Predictive Service Monetization",
          desc: "Detect engine wear and fault codes before breakdowns occur. Automatically convert telematics diagnostics into workshop revenue.",
          stat: "+35%",
          statLabel: "Higher aftermarket parts & workshop service revenue",
          image: "/images/dealers/diagnostics-gear-3d.png",
          alt: "3D Engine Diagnostics Core",
          animation: "animate-float-reverse-3d",
        },
        {
          number: "03",
          tag: "Asset Security",
          title: "Zero-Risk Asset Security",
          desc: "Protect tractors sold on credit, financing, or lease. Real-time GPS tracking and remote immobilization safeguard your capital 24/7.",
          stat: "100%",
          statLabel: "Fleet visibility over sold & financed machinery",
          image: "/images/dealers/fleet-shield-3d.png",
          alt: "3D Biometric Fleet Security Shield",
          animation: "animate-float-3d",
        },
        {
          number: "04",
          tag: "Dealership Platform",
          title: "Turnkey Digital Dealership Hub",
          desc: "Say goodbye to paper ledgers. Manage inventory, mechanic dispatch, customer profiles, and seasonal promotions from one unified hub.",
          stat: "24 hrs",
          statLabel: "Rapid dealer onboarding & hardware installation turnaround",
          image: "/images/dealers/dealer-os-3d.png",
          alt: "3D Dealership Platform Hub",
          animation: "animate-float-reverse-3d",
        },
      ],
      joinPillarsBadge: "AUTHORIZED PARTNERSHIP ADVANTAGES",
      joinPillarsTitle: "Why Join the Holatractor Network?",
      joinPillarsSub:
        "Guaranteed 38% upfront margins on IoT hardware, 20% recurring annual commission on platform renewals, and exclusive inbound farmer leads.",
      applyPartnerButton: "Apply for Authorized Dealership",
      calcRevenueButton: "Calculate Dealership Projected Revenue Boost",
      featuresHeading: "Next-Gen Dealer Dashboard Features",
      quote: {
        text1: "Instead of a request which sounds like ",
        highlight1: "‘I need a website’",
        text2: ", we embrace — ",
        highlight2: "‘I want to market my product to get first organic users’",
        text3: ", where we can suggest what to do, and execute the approved plan from A to Z.",
      },
      features: [
        {
          id: "inventory",
          title: "Store & Inventory Hub",
          description:
            "Showcase your in-stock tractors, harvesters, rotavators, and implements with high-definition specs. Synchronize real-time inventory and pricing across thousands of verified farmers in your district to accelerate unit turnarounds.",
        },
        {
          id: "ai-agent",
          title: "Autonomous AI Agent Workflow",
          description:
            "Self-operating AI workflow agent that autonomously qualifies inbound farmer WhatsApp inquiries, checks showroom inventory in real time, validates credit eligibility, and schedules certified mechanic visits 24/7 without manual delays.",
        },
        {
          id: "repair",
          title: "Repair & Service Dispatch",
          description:
            "Convert breakdown emergencies into high-margin recurring workshop revenue. Monitor diagnostic trouble codes (DTC) in real time, automate preventative maintenance schedules, and route field service mechanics directly to farm coordinates.",
        },
        {
          id: "telemetry",
          title: "IoT Fleet & Telematics",
          description:
            "Full-spectrum telematics tracking engine running hours, fuel burn rate, PTO activity, and battery status. Automated geofence boundaries protect funded or leased machinery against unauthorized movement or cross-border theft.",
        },
        {
          id: "marketing",
          title: "Targeted Agri-Marketing",
          description:
            "Launch localized WhatsApp and SMS promotional broadcasts synchronized with regional crop planting and harvest cycles. Push seasonal implement packages, disc harrow discounts, and post-harvest service specials with verified ROI.",
        },
      ],
    },
    owners: {
      sectionTitlePre: "For ",
      sectionTitleHighlight: "Tractor Owners & Fleets",
      sectionSubtitle:
        "Turn your tractor into a smart connected machine. Satellite GPS, anti-theft fuel defense, and acreage job management.",
      modules: [
        {
          id: "assets",
          moduleName: "Asset Registry & Health Scorecard",
          tag: "Digital Garage & Machinery Health",
          description:
            "Centralized registry for your tractors, harvesters, and implements. Track live engine health, battery voltage, coolant levels, and get predictive 250-hour service reminders.",
          statHighlight: "-45%",
          statNote: "reduction in catastrophic engine & workshop breakdowns.",
          previewTag: "Live Machinery Telemetry",
          imageUrl: "/images/owner/owner-asset-dashboard.jpg",
        },
        {
          id: "tracking",
          moduleName: "Real-Time GPS & Anti-Theft Telematics",
          tag: "Live Tracking & Fuel Security",
          description:
            "24/7 live satellite positioning with route playback, smart geofencing perimeter alerts, ultrasonic fuel anti-siphon monitoring, and one-tap remote ignition lock.",
          statHighlight: "100%",
          statNote: "visibility over remote field operations & financed machinery.",
          previewTag: "Satellite Farm Radar",
          imageUrl: "/images/owner/owner-tracking-dashboard.jpg",
        },
        {
          id: "rentals",
          moduleName: "Idle Tractor Booking & Monetization",
          tag: "Peer-to-Peer Rental Marketplace",
          description:
            "Monetize machine downtime. Broadcast your idle tractor to neighboring farmers, review incoming job requests with acreage and distance, and get guaranteed escrow payouts.",
          previewTag: "Peer-to-Peer Booking Hub",
          imageUrl: "/images/owner/owner-booking-dashboard.jpg",
        },
        {
          id: "operators",
          moduleName: "Operator & Driver Crew Management",
          tag: "Workforce & Machine Safety Scores",
          description:
            "Digital operator check-in, real-time driving behavior scores, and automated per-acre or hourly wage calculations.",
          statHighlight: "+28%",
          statNote: "higher operator productivity with fewer machine repairs.",
          previewTag: "Driver Shift & Safety Ledger",
          imageUrl: "/images/owner/owner-operators-dashboard.jpg",
        },
        {
          id: "field-jobs",
          moduleName: "Field Jobs & Acreage Dispatch",
          tag: "GPS Acreage Meter & WhatsApp Billing",
          description:
            "Schedule plowing, seeding, and spraying jobs. Automatically calculate exact tilled acreage down to square meters using GPS telemetry and send instant WhatsApp invoices.",
          statHighlight: "Zero",
          statNote: "billing disputes with farmers through GPS-verified work logs.",
          previewTag: "Acreage Dispatch & Invoicing",
          imageUrl: "/images/owner/owner-fieldjobs-dashboard.jpg",
        },
      ],
    },
    faq: {
      sectionTag: "FREQUENTLY ASKED QUESTIONS",
      titleMain: "Everything You Need to Know About ",
      titleHighlight: "Holatractor",
      subtitle:
        "Clear answers on telematics installation, machinery compatibility, and partner dealership benefits.",
      categories: {
        all: "All Questions",
        dealers: "For Tractor Dealerships",
        owners: "For Machinery Owners",
        hardware: "Hardware & Telematics",
      },
      items: [
        {
          id: "dealer-leads",
          category: "dealers",
          tag: "Farmer Inquiries",
          question: "How does Holatractor generate qualified tractor buyer leads for our dealership?",
          answer:
            "Holatractor captures regional agricultural demand and farmer digital purchase inquiries across your assigned district. Our autonomous AI pipeline verifies farmer land acreage, tractor HP requirements, and financing eligibility before routing high-intent buyers directly into your Dealer Dashboard.",
        },
        {
          id: "dealer-inventory",
          category: "dealers",
          tag: "Inventory Hub",
          question: "Can our dealership manage showroom inventory, implements, and pricing in real time?",
          answer:
            "Yes. The Store & Inventory Hub allows your dealership to showcase in-stock tractors, harvesters, rotavators, and implements with live pricing, photos, and spec sheets. Inventory levels synchronize automatically when units are booked, scheduled for farm demos, or sold.",
        },
        {
          id: "owner-compatibility",
          category: "owners",
          tag: "Machinery Compatibility",
          question: "Which tractor brands and machinery models are compatible with Holatractor IoT?",
          answer:
            "Holatractor supports 98% of agricultural machinery, including John Deere, New Holland, Massey Ferguson, Case IH, Valtra, Mahindra, and Kubota. Quick 15-minute plug-and-play installation without voiding OEM manufacturer warranties.",
        },
        {
          id: "owner-antitheft",
          category: "owners",
          tag: "Asset Protection",
          question: "How does the real-time anti-theft tracking and remote immobilizer work?",
          answer:
            "You can set virtual GPS boundaries (Geofences) around your village or farmland. If your tractor crosses the perimeter outside approved hours or experiences unauthorized engine ignition, you receive instant WhatsApp alerts and can remotely disable the engine safely via the Holatractor app.",
        },
        {
          id: "owner-fuel",
          category: "owners",
          tag: "Diesel & Acreage",
          question: "Can I track diesel consumption, acreage covered, and engine running hours?",
          answer:
            "Yes. The high-precision telemetry device records exact engine runtime, active PTO hours, idling duration, and diesel consumption per acre ploughed. This prevents fuel pilferage during custom hiring and gives you clear operating costs for every farming season.",
        },
        {
          id: "owner-breakdown",
          category: "owners",
          tag: "Field Mechanic Dispatch",
          question: "How do I book authorized mechanics or genuine spare parts during a field breakdown?",
          answer:
            "Through the Holatractor Farmer App, tap 'Request Field Service'. Our system detects your exact farm GPS coordinates and diagnostic fault code, automatically dispatching the nearest authorized dealership technician with the correct replacement parts.",
        },
        {
          id: "owner-resale",
          category: "owners",
          tag: "Resale Value",
          question: "Does Holatractor telemetry increase my tractor's resale and financing value?",
          answer:
            "Yes. Holatractor maintains a tamper-proof digital service log and engine health passport. Certified maintenance records and verified engine hours boost tractor resale value by 12–18% and enable faster loan approvals from rural banks.",
        },
        {
          id: "hardware-battery",
          category: "hardware",
          tag: "Power & Battery",
          question: "Does the telemetry device drain the tractor battery when parked for weeks?",
          answer:
            "No. Holatractor IoT units feature intelligent ultra-low-power sleep modes drawing less than 2mA when the ignition is off. The device also includes an internal rechargeable backup battery that lasts up to 7 days if external power is disconnected.",
        },
        {
          id: "hardware-offline",
          category: "hardware",
          tag: "Offline Caching",
          question: "What happens if the tractor operates in remote farmland with weak cellular coverage?",
          answer:
            "The hardware is equipped with industrial-grade onboard flash memory capable of caching up to 30 days of offline GPS tracks, engine telemetry, and diagnostic alerts. All stored data synchronizes automatically the moment a mobile network signal is detected.",
        },
      ],
    },
    cta: {
      tagBadge: "JOIN AUTHORIZED NETWORK",
      heading: "Grow Your Dealership with Holatractor",
      description:
        "Join the connected smart tractor network. Acquire regional farmer buyers, monetize preventative workshop servicing, and secure your machinery with real-time telematics.",
      brochureBtn: "Get Dealer Brochure",
      applyBtn: "Apply for Dealership",
    },
    footer: {
      description:
        "Agricultural telematics and fleet management ecosystem connecting dealerships, contractors, and farmers across Latin America.",
      dealersColTitle: "Dealerships",
      dealersLinks: [
        { name: "Dealer Telematics", href: "#dealers" },
        { name: "Fleet Monitoring", href: "#dealers" },
        { name: "Projected Revenue Boost", href: "/dealer-revenue" },
        { name: "Integration APIs", href: "#dealers" },
      ],
      ownersColTitle: "Machinery Owners",
      ownersLinks: [
        { name: "Smart Tractor Tracking", href: "#stages" },
        { name: "Fuel & Engine Analytics", href: "#stages" },
        { name: "Geofencing & Security", href: "#stages" },
        { name: "Mobile Operations App", href: "#stages" },
        { name: "Farm Yield Insights", href: "#stages" },
      ],
      aboutColTitle: "Company",
      aboutLinks: [
        { name: "About Holatractor", href: "https://holatractor.com" },
        { name: "Our Mission", href: "#stages" },
        { name: "Platform Overview", href: "#dealers" },
        { name: "FAQ & Support", href: "#faq" },
        { name: "Dealer Inquiry", href: "#dealers" },
      ],
      rights: "All rights reserved.",
      madeFor: "Engineered for modern agriculture across Bolivia & Latin America.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    modal: {
      badge: "Authorized Holatractor Partnership",
      dealerTitle: "Join Holatractor Dealer Network",
      ownerTitle: "Schedule Tractor Consultation",
      subtitle:
        "Connect your dealership with regional farmer leads, preventative workshop telematics, and high-margin smart IoT hardware.",
      roleDealer: "Machinery Dealership",
      roleOwner: "Tractor Owner / Fleet",
      dealershipNameLabel: "Dealership / Agency Name *",
      dealershipNamePlaceholder: "e.g. Kisan Agro Tractors",
      locationLabel: "Location *",
      locationPlaceholderDealer: "e.g. Bolivia, Lima...",
      locationPlaceholderOwner: "e.g. 2 Tractors in Bolivia, Lima...",
      contactNameLabel: "Contact Name *",
      contactNamePlaceholder: "e.g. Carlos Mendoza",
      phoneLabel: "Phone / WhatsApp *",
      phonePlaceholder: "+591 XXXXXXXX",
      emailLabel: "Work Email (To receive official brochure) *",
      emailPlaceholder: "partner@dealership.com",
      ownerMachineryLabel: "Machinery Owned & Farm Location",
      cfVerifying: "Verifying connection...",
      cfVerified: "Success! Human verification complete",
      cfVerifyPrompt: "Verify you are human",
      cfError: "Please check the box to complete verification",
      cfTerms: "Terms",
      cfPrivacy: "Privacy",
      submitDealer: "Submit Dealership Application & Get Instant Brochure",
      submitOwner: "Confirm Consultation Request",
      submitting: "Verifying Territory & Generating Packet...",
      successDealerTitle: "Welcome to Holatractor Network!",
      successOwnerTitle: "Consultation Request Confirmed!",
      successDealerMessage: (name: string, dealer: string) =>
        `Thank you, ${name || "Partner"}! Your dealership territory profile for ${dealer || "your agency"} has been prioritized. Our regional director will call you within 24 hours.`,
      successOwnerMessage:
        "Thank you! Our agricultural telematics specialist will confirm your field consultation shortly.",
      verifiedRef: "Application Verified • Reference",
      downloadBrochureBtn: "Download Dealer Brochure (PDF)",
      downloadSpanishBrochureBtn: "Descargar Folleto en Español (PDF)",
      downloadEnglishBrochureBtn: "Download Brochure in English (PDF)",
      chooseBrochureLang: "Brochure Edition:",
      spanishEdition: "Spanish Edition",
      englishEdition: "English Edition",
      s3DirectLink: "Direct S3 Cloud Link",
      downloadedBtn: "Brochure Downloaded ✓",
      whatsappBtn: "Chat with Regional Director",
      doneBtn: "Done & Return to Page",
    },
    stickyPill: {
      badge: "Regional Advisory",
      title: "Machinery Telematics",
      cta: "Speak with an Advisor",
    },
    dealerRevenue: {
      tag: "FINANCIAL MODEL & ROI",
      title: "Dealership Revenue Boost Calculator",
      subtitle:
        "Project the additional annual revenue your dealership generates by bundling smart IoT telematics, hardware margins, and workshop service retention.",
      annualVolumeLabel: "Annual Tractor / Machinery Volume Handled",
      averageMarginLabel: "Average Margin Per Installed IoT Kit",
      renewalRateLabel: "Annual Recurring Commission on Renewals",
      projectedRevenueTitle: "Projected Annual Revenue Boost",
      projectedPerYear: "per year",
      hardwareMarginLabel: "Hardware Upfront Gross Margin",
      renewalCommissionsLabel: "Recurring Software Subscriptions",
      workshopSparesLabel: "Preventative Workshop Spares & Service",
      ctaButton: "Apply for Exclusive Territory Dealership",
      backHome: "Back to Home",
    },
  },
};
