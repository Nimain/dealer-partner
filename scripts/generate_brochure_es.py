#!/usr/bin/env python3
"""
Holatractor - Folleto Oficial para Concesionarios y Guía de Plataforma (Generador PDF en Español)
Genera un folleto comercial de 12 páginas, con acabado ultra-premium e interactivo:
- Imágenes y capturas de pantalla 100% proporcionales sin deformación
- Cada una de las funciones requeridas para la gestión de concesionarios
- Términos y Condiciones Oficiales completos de 6 artículos con bloque de firma
- Canvas dinámico con encabezado, pie de página y numeración (Página X de Y)
- Tipografía ejecutiva limpia y paleta de colores corporativa
- Renderizado automático de vistas previas en PNG de las 12 páginas
"""

import os
import sys
from PIL import Image as PILImage
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image as RLImage,
    KeepTogether,
    PageBreak,
    HRFlowable,
)
from reportlab.pdfgen import canvas
import pymupdf


# Helper: Crear imagen con relación de aspecto matemáticamente exacta para evitar distorsión
def make_proportional_image(path, target_width=475, max_height=None):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Archivo de imagen no encontrado: {path}")
    with PILImage.open(path) as im:
        orig_w, orig_h = im.size
    aspect = orig_w / orig_h
    target_h = target_width / aspect
    if max_height and target_h > max_height:
        target_h = max_height
        target_width = target_h * aspect
    return RLImage(path, width=target_width, height=target_h)


# Canvas personalizado para encabezados y pies de página dinámicos en español
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        # Omitir encabezado y pie de página en la portada (Página 1)
        if self._pageNumber == 1:
            return

        self.saveState()

        # Encabezado superior
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#991B1B"))
        self.drawString(40, 756, "HOLATRACTOR")

        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawString(108, 756, "|  Folleto Oficial para Concesionarios y Guía de Plataforma (2026)")

        self.drawRightString(572, 756, "Red Comercial de Concesionarios")

        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.6)
        self.line(40, 748, 572, 748)

        # Pie de página inferior
        self.line(40, 42, 572, 42)

        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#94A3B8"))
        self.drawString(40, 30, "Confidencial • Holatractor Srl / Inc. • Todos los Derechos Reservados")

        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#334155"))
        self.drawRightString(572, 30, f"Página {self._pageNumber} de {page_count}")

        self.restoreState()


def build_brochure_pdf(output_path="public/holatractor-dealer-brochure.pdf"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Configuración del documento: Tamaño Carta (612 x 792 pt), márgenes: izq/der=40, sup/inf=46
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=46,
        bottomMargin=46,
        title="Holatractor - Folleto de Plataforma para Concesionarios 2026",
        author="Holatractor Srl",
        subject="Guía de Plataforma Oficial para Concesionarios y Términos Comerciales",
        keywords="Holatractor, Telemetría Agrícola, Concesionarios Conectados, Flota de Tractores, Agritech, Bolivia",
    )

    # Paleta de colores corporativa
    PRIMARY_RED = colors.HexColor("#DC2626")
    DARK_RED = colors.HexColor("#991B1B")
    DEEP_MAROON = colors.HexColor("#7F1D1D")
    SLATE_DARK = colors.HexColor("#0F172A")
    SLATE_BODY = colors.HexColor("#334155")
    SLATE_MUTED = colors.HexColor("#64748B")
    BG_LIGHT = colors.HexColor("#F8FAFC")
    BG_CARD = colors.HexColor("#F1F5F9")
    EMERALD_GREEN = colors.HexColor("#059669")
    BORDER_LIGHT = colors.HexColor("#E2E8F0")

    # Estilos tipográficos
    body_style = ParagraphStyle(
        "StandardBody",
        fontName="Helvetica",
        fontSize=8.5,
        leading=12.5,
        textColor=SLATE_BODY,
        spaceAfter=6,
    )

    body_bold = ParagraphStyle(
        "StandardBodyBold",
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=12.5,
        textColor=SLATE_DARK,
        spaceAfter=6,
    )

    caption_style = ParagraphStyle(
        "FigureCaption",
        fontName="Helvetica-Oblique",
        fontSize=7.5,
        leading=10,
        textColor=SLATE_MUTED,
        alignment=1, # Centrado
        spaceAfter=8,
    )

    section_heading = ParagraphStyle(
        "SectionHeading",
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=17,
        textColor=DARK_RED,
        spaceBefore=4,
        spaceAfter=5,
    )

    sub_heading = ParagraphStyle(
        "SubHeading",
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        textColor=SLATE_DARK,
        spaceBefore=5,
        spaceAfter=4,
    )

    table_header_style = ParagraphStyle(
        "TableHeader",
        fontName="Helvetica-Bold",
        fontSize=7.5,
        leading=9.5,
        textColor=colors.white,
        alignment=0,
    )

    table_cell_style = ParagraphStyle(
        "TableCell",
        fontName="Helvetica",
        fontSize=7.5,
        leading=10,
        textColor=SLATE_BODY,
    )

    table_cell_bold = ParagraphStyle(
        "TableCellBold",
        fontName="Helvetica-Bold",
        fontSize=7.5,
        leading=10,
        textColor=SLATE_DARK,
    )

    tc_article_heading = ParagraphStyle(
        "TCArticleHeading",
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=12,
        textColor=DARK_RED,
        spaceBefore=6,
        spaceAfter=2,
    )

    tc_clause_text = ParagraphStyle(
        "TCClauseText",
        fontName="Helvetica",
        fontSize=7.5,
        leading=10.5,
        textColor=SLATE_BODY,
        spaceAfter=4,
    )

    story = []

    # =========================================================================
    # PÁGINA 1: PORTADA EJECUTIVA Y VISIÓN GENERAL COMERCIAL
    # =========================================================================
    logo_color_path = "public/images/brochure/holatractor_logo_color.png"
    proportional_cover_logo = make_proportional_image(logo_color_path, target_width=135)

    cover_banner_data = [
        [
            proportional_cover_logo,
            Paragraph(
                "<font size=8.5 color='#FECACA'><b>PROGRAMA COMERCIAL DE CONCESIONARIOS</b></font><br/>"
                "<font size=7.5 color='#E2E8F0'>Santa Cruz de la Sierra • Bolivia y Latinoamérica</font><br/>"
                "<font size=7.5 color='#FFFFFF'><u><a href='https://holatractor.com' color='#FFFFFF'>www.holatractor.com</a></u></font>",
                ParagraphStyle("CoverRight", fontName="Helvetica", alignment=2, leading=11)
            )
        ]
    ]
    t_cover_banner = Table(cover_banner_data, colWidths=[200, 332])
    t_cover_banner.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), DEEP_MAROON),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_cover_banner)
    story.append(Spacer(1, 14))

    # Bloque de Título Principal
    hero_title_style = ParagraphStyle(
        "HeroTitle",
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=SLATE_DARK,
        spaceAfter=6,
    )
    story.append(Paragraph("Plataforma de Concesionarios Conectados y Guía para Socios", hero_title_style))
    story.append(Paragraph(
        "<b>Holatractor Srl / Inc.</b> es el sistema operativo líder en maquinaria agrícola de América Latina. "
        "Unimos a fabricantes de tractores, concesionarios oficiales, talleres de implementos y productores agropecuarios "
        "en un único ecosistema digital potenciado por telemetría. Incremente la rentabilidad de su concesionario, reduzca "
        "el riesgo crediticio con inmovilización remota de motor por GPS, automatice el inventario de repuestos y despache "
        "mecánicos de forma autónoma con inteligencia artificial.",
        body_style
    ))
    story.append(Spacer(1, 8))

    # Métricas de Valor para Socios (4 columnas)
    metric_box_style = ParagraphStyle("MetricBox", fontName="Helvetica-Bold", fontSize=15, leading=17, alignment=1)
    metric_sub_style = ParagraphStyle("MetricSub", fontName="Helvetica", fontSize=7, leading=8.5, alignment=1, textColor=SLATE_MUTED)

    metrics_data = [
        [
            Paragraph("<font color='#DC2626'><b>38%</b></font>", metric_box_style),
            Paragraph("<font color='#DC2626'><b>4.2x</b></font>", metric_box_style),
            Paragraph("<font color='#DC2626'><b>99.9%</b></font>", metric_box_style),
            Paragraph("<font color='#DC2626'><b>24/7</b></font>", metric_box_style),
        ],
        [
            Paragraph("Margen en Hardware y Telemetría", metric_sub_style),
            Paragraph("Velocidad de Conversión de Leads", metric_sub_style),
            Paragraph("SLA de Uptime Satelital y Servidores", metric_sub_style),
            Paragraph("Agentes IA de Diagnóstico Autónomo", metric_sub_style),
        ]
    ]
    t_metrics = Table(metrics_data, colWidths=[133, 133, 133, 133])
    t_metrics.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_metrics)
    story.append(Spacer(1, 10))

    # Perfil Corporativo
    story.append(Paragraph("Resumen del Socio Concesionario y Verificación Corporativa", sub_heading))
    corp_data = [
        [Paragraph("<b>Entidad Corporativa</b>", table_cell_bold), Paragraph("Holatractor Srl / Holatractor Inc. (Agri-Technologies Latinoamérica)", table_cell_style)],
        [Paragraph("<b>Sede Regional</b>", table_cell_bold), Paragraph("Av. San Martín 1550, Equipetrol Norte, Santa Cruz de la Sierra, Bolivia", table_cell_style)],
        [Paragraph("<b>Alcance de la Plataforma</b>", table_cell_bold), Paragraph("Operaciones de Tienda, GPS de Flotas, CRM Agrícola, Leads, Agentes IA, Mantenimiento y Repuestos", table_cell_style)],
        [Paragraph("<b>Contacto Comercial</b>", table_cell_bold), Paragraph("<a href='mailto:dealers@holatractor.com' color='#DC2626'>dealers@holatractor.com</a> | Tel: +591 3 345-8900 | WhatsApp: +591 77613811", table_cell_style)],
        [Paragraph("<b>Portal de Socios</b>", table_cell_bold), Paragraph("<a href='https://holatractor.com/dealers' color='#DC2626'>https://holatractor.com/dealers</a> — Verificación Inmediata de Concesionarios", table_cell_style)],
    ]
    t_corp = Table(corp_data, colWidths=[130, 402])
    t_corp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_corp)
    story.append(Spacer(1, 10))

    # Índice de Módulos (Directorio de 12 funciones)
    story.append(Paragraph("Directorio Integral de Funcionalidades de la Plataforma", sub_heading))
    toc_data = [
        [
            Paragraph("<b>1. Gestión de Tiendas y Sucursales</b><br/><font color='#64748B'>Ubicaciones, salas de exhibición y horarios</font>", table_cell_style),
            Paragraph("<b>7. Campañas de Marketing Omnicanal</b><br/><font color='#64748B'>Anuncios Meta, WhatsApp masivo y días de campo</font>", table_cell_style),
        ],
        [
            Paragraph("<b>2. Agregar Tractores e Implementos</b><br/><font color='#64748B'>Catalogación, balizas BLE y especificaciones</font>", table_cell_style),
            Paragraph("<b>8. Flujos de Trabajo con Agentes IA</b><br/><font color='#64748B'>Diagnóstico autónomo 24/7 y coordinación</font>", table_cell_style),
        ],
        [
            Paragraph("<b>3. Flota Satelital en Tiempo Real</b><br/><font color='#64748B'>Mapa en vivo, geocercas y bloqueo de motor</font>", table_cell_style),
            Paragraph("<b>9. Notificaciones y Alarmas DTC</b><br/><font color='#64748B'>Alertas inmediatas de fallas por niveles</font>", table_cell_style),
        ],
        [
            Paragraph("<b>4. Directorio de Clientes y Productores</b><br/><font color='#64748B'>Registro de tierras, historial de maquinaria</font>", table_cell_style),
            Paragraph("<b>10. Inventario de Repuestos y Mantenimiento</b><br/><font color='#64748B'>Consumibles, intervalos 250h-1000h y código QR</font>", table_cell_style),
        ],
        [
            Paragraph("<b>5. Soporte y Retroalimentación</b><br/><font color='#64748B'>Mesa de ayuda SLA, valoraciones y custodia</font>", table_cell_style),
            Paragraph("<b>11. Gestión de Mecánicos y Talleres</b><br/><font color='#64748B'>Técnicos de campo, certificaciones y rutas GPS</font>", table_cell_style),
        ],
        [
            Paragraph("<b>6. Gestión de Prospectos y Embudo</b><br/><font color='#64748B'>Velocidad de venta, scoring crediticio y cierres</font>", table_cell_style),
            Paragraph("<b>12. Integración API REST y Términos Oficiales</b><br/><font color='#64748B'>Sincronización ERP, webhooks, SLA y contrato</font>", table_cell_style),
        ],
    ]
    t_toc = Table(toc_data, colWidths=[266, 266])
    t_toc.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_toc)
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 2: VISIÓN GENERAL EJECUTIVA DEL PANEL DEL CONCESIONARIO
    # =========================================================================
    story.append(Paragraph("Visión General Ejecutiva: El Panel del Concesionario Conectado", section_heading))
    story.append(Paragraph(
        "La comercialización moderna de maquinaria agrícola exige un centro de comando unificado. El panel principal de "
        "concesionarios de Holatractor integra registros de clientes, contratos de financiamiento, embudos de ventas y "
        "telemetría de talleres en una interfaz intuitiva en tiempo real. Los gerentes supervisan horas de operación, "
        "progreso de clientes y órdenes de servicio pendientes sin recurrir a múltiples bases de datos obsoletas.",
        body_style
    ))
    story.append(Spacer(1, 6))

    img_dashboard = "public/images/brochure/dealer_dashboard_overview.png"
    story.append(make_proportional_image(img_dashboard, target_width=475))
    story.append(Paragraph("Figura 2.1: Panel en Vivo del Concesionario — Métricas en tiempo real de clientes, contratos, operaciones y ventas vía API.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Módulos Operativos Centrales en un Vistazo", sub_heading))
    dash_modules_data = [
        [Paragraph("Módulo de Comando", table_header_style), Paragraph("Alimentación de Telemetría en Vivo", table_header_style), Paragraph("Impacto Comercial para Concesionarios", table_header_style)],
        [
            Paragraph("<b>Registro de Clientes en Vivo</b>", table_cell_bold),
            Paragraph("Total de cuentas activas, conteo de tractores por productor, obligaciones de financiamiento pendientes.", table_cell_style),
            Paragraph("Cero riesgo de mora crediticia; conciliación automatizada de pagos.", table_cell_style),
        ],
        [
            Paragraph("<b>Telemetría de Horas Trabajadas</b>", table_cell_bold),
            Paragraph("Promedio de duración operativa en tiempo real (ej., 05:37:32), tendencia diaria de +1.2%.", table_cell_style),
            Paragraph("Verificación rigurosa del uso de maquinaria y prevención de sobrecargas.", table_cell_style),
        ],
        [
            Paragraph("<b>Embudo Semanal de Ventas</b>", table_cell_bold),
            Paragraph("Leads comerciales consolidados mediante API en un ciclo semanal continuo de 7 días.", table_cell_style),
            Paragraph("Planificación predictiva para reabastecimiento de maquinaria en stock.", table_cell_style),
        ],
    ]
    t_dash_modules = Table(dash_modules_data, colWidths=[130, 240, 162])
    t_dash_modules.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_dash_modules)
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 3: 1. GESTIÓN DE TIENDAS Y SUCURSALES REGIONALES
    # =========================================================================
    story.append(Paragraph("1. Gestión de Tiendas y Sucursales Regionales", section_heading))
    story.append(Paragraph(
        "Holatractor permite a los grupos concesionarios coordinar múltiples salas de exhibición, distribuir el stock "
        "de maquinaria y sincronizar horarios de atención desde un único panel en la nube. Ya sea que opere un local principal "
        "en Santa Cruz o múltiples centros de distribución en Montero, Cuatro Cañadas o San Ignacio, el módulo de Gestión "
        "de Tiendas garantiza control operativo absoluto y visibilidad de existencias en todo momento.",
        body_style
    ))
    story.append(Spacer(1, 6))

    img_stores = "public/images/brochure/store_management_locations.png"
    story.append(make_proportional_image(img_stores, target_width=475))
    story.append(Paragraph("Figura 3.1: Administrador de Sucursales — 6 salas de exhibición activas, 23 unidades de flota y ciclos de demanda a 10 días.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Capacidades de Orquestación de Sucursales Regionales", sub_heading))
    store_capabilities_data = [
        [Paragraph("Función de Sucursal", table_header_style), Paragraph("Operatividad del Sistema", table_header_style), Paragraph("Cobertura Regional", table_header_style)],
        [
            Paragraph("<b>Inventario Multi-Ubicación</b>", table_cell_bold),
            Paragraph("Rastreo exacto de qué sucursal posee modelos específicos (Kioti PX, Farmall, John Deere 6M).", table_cell_style),
            Paragraph("Santa Cruz, Montero, San Ignacio, Cuatro Cañadas", table_cell_style),
        ],
        [
            Paragraph("<b>Horarios y Turnos Operativos</b>", table_cell_bold),
            Paragraph("Configuración de horarios de atención (ej., 8:00 AM - 6:00 PM) y guardias técnicas de emergencia nocturnas.", table_cell_style),
            Paragraph("Sincronizado con la aplicación móvil de los agricultores", table_cell_style),
        ],
        [
            Paragraph("<b>Coordinación de Flota Interna</b>", table_cell_bold),
            Paragraph("Inicio de traslados internos de maquinaria entre sucursales con emisión automática de guías de despacho.", table_cell_style),
            Paragraph("Reasignación inmediata de baliza BLE al arribar a destino", table_cell_style),
        ],
    ]
    t_store_cap = Table(store_capabilities_data, colWidths=[140, 232, 160])
    t_store_cap.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_store_cap)
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 4: 2. AGREGAR TRACTORES E IMPLEMENTOS EN TIENDA
    # =========================================================================
    story.append(Paragraph("2. Agregar Tractores e Implementos en Tienda", section_heading))
    story.append(Paragraph(
        "Los concesionarios pueden catalogar y publicar tractores nuevos y usados certificados, cosechadoras e implementos "
        "especializados en menos de 3 minutos. Cada equipo se registra con su número de chasis (VIN), potencia nominal en HP, "
        "especificaciones hidráulicas y baliza Bluetooth Low Energy (BLE) emparejada. Los productores que buscan maquinaria por "
        "municipio pueden verificar disponibilidad al instante, agendar demostraciones o solicitar financiamiento directo.",
        body_style
    ))
    story.append(Spacer(1, 6))

    implements_data = [
        [
            Paragraph("Categoría de Maquinaria", table_header_style),
            Paragraph("Modelos y Equipamiento Típico", table_header_style),
            Paragraph("Telemetría y Emparejamiento BLE", table_header_style),
            Paragraph("Modelo de Ingreso del Concesionario", table_header_style),
        ],
        [
            Paragraph("<b>Tractores 4WD Alta Potencia</b>", table_cell_bold),
            Paragraph("Serie Kioti PX (93-110 HP), John Deere 6M, Case IH Farmall", table_cell_style),
            Paragraph("Telemetría cableada a CAN-bus (OBD-II / J1939 + GPS)", table_cell_style),
            Paragraph("Venta de unidad + Contrato de servicio telemático por 3 años", table_cell_style),
        ],
        [
            Paragraph("<b>Implementos de Suelo y Siembra</b>", table_cell_bold),
            Paragraph("Arados de discos pesados, subsoladores, sembradoras neumáticas", table_cell_style),
            Paragraph("Baliza solar BLE (Contador de hectáreas y surcos trabajados)", table_cell_style),
            Paragraph("Margen por paquete de implemento + Repuestos de desgaste", table_cell_style),
        ],
        [
            Paragraph("<b>Protección de Cultivo y Fumigación</b>", table_cell_bold),
            Paragraph("Pulverizadoras autopropulsadas y equipos de arrastre con botalón", table_cell_style),
            Paragraph("Sensores de caudal en boquillas + Trazado GPS de pasadas", table_cell_style),
            Paragraph("Suscripción de compatibilidad química y boquillas de recambio", table_cell_style),
        ],
        [
            Paragraph("<b>Equipos de Cosecha y Recolección</b>", table_cell_bold),
            Paragraph("Cosechadoras combinadas, tolvas autodescargables y cabezales", table_cell_style),
            Paragraph("Telemetría de carga de motor + Sensor de pérdida de grano", table_cell_style),
            Paragraph("Comisión por alquiler estacional + Asistencia de campo prioritaria", table_cell_style),
        ],
    ]
    t_implements = Table(implements_data, colWidths=[110, 150, 142, 130])
    t_implements.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_implements)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Protocolo de Alta para Inventario de Concesionarios", sub_heading))
    story.append(Paragraph(
        "1. <b>Registro Digital del Activo:</b> El técnico del concesionario ingresa el VIN, número de serie y ficha técnica en el portal.<br/>"
        "2. <b>Activación de Hardware:</b> Se conecta el módulo de telemetría CAN-bus de Holatractor al conector de diagnóstico de la máquina. La unidad ejecuta una auto-prueba y se vincula en menos de 60 segundos.<br/>"
        "3. <b>Emparejamiento de Implementos:</b> Se fija una baliza BLE estanca a arados, rastras y sembradoras. La baliza se asocia automáticamente al tractor al ser enganchado.<br/>"
        "4. <b>Publicación Inmediata en el Mercado:</b> Con un solo clic, la máquina queda visible para la red regional de compradores de Holatractor, con stock en vivo y opciones de financiamiento.",
        body_style
    ))
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 5: 3. GESTIÓN DE FLOTAS EN TIEMPO REAL Y RASTREO SATELITAL GPS
    # =========================================================================
    story.append(Paragraph("3. Gestión de Flotas en Tiempo Real y Rastreo Satelital GPS", section_heading))
    story.append(Paragraph(
        "Los tractores entregados bajo crédito, financiamiento o arrendamiento representan una exposición de capital "
        "significativa. El Rastreador Satelital de Flotas de Holatractor otorga a los concesionarios visibilidad satelital continua "
        "y en tiempo real sobre cada máquina conectada. Los concesionarios supervisan horas de motor encendido, voltaje de "
        "batería, estado operativo (óptimo vs falla) y el historial de trayectorias. Ante un cruce no autorizado de frontera, "
        "incumplimiento de pago o mora severa, el concesionario puede activar de manera remota y segura la inmovilización del motor.",
        body_style
    ))
    story.append(Spacer(1, 6))

    img_fleet = "public/images/brochure/fleet_map_tracker.png"
    story.append(make_proportional_image(img_fleet, target_width=475))
    story.append(Paragraph("Figura 5.1: Rastreador Satelital de Flotas en Vivo — Unidad Kioti PX 93-110 HP operando en Santa Cruz de la Sierra.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Protección de Activos y Especificaciones Telemáticas", sub_heading))
    fleet_specs_data = [
        [Paragraph("Función Telemática", table_header_style), Paragraph("Especificación Técnica", table_header_style), Paragraph("Beneficio de Seguridad para el Concesionario", table_header_style)],
        [
            Paragraph("<b>Geocercas Satelitales</b>", table_cell_bold),
            Paragraph("Límites virtuales poligonales configurados según las coordenadas de cada parcela agrícola.", table_cell_style),
            Paragraph("Alerta instantánea si la maquinaria abandona la zona productiva autorizada en el contrato.", table_cell_style),
        ],
        [
            Paragraph("<b>Inmovilización Remota de Motor</b>", table_cell_bold),
            Paragraph("Señal encriptada al relevador de encendido de la ECU para un apagado seguro y controlado.", table_cell_style),
            Paragraph("Eliminación de pérdidas por morosidad; máxima garantía en procesos de recuperación.", table_cell_style),
        ],
        [
            Paragraph("<b>Monitoreo de Batería y Diésel</b>", table_cell_bold),
            Paragraph("Muestreo continuo de voltaje (óptimo >12.4V) y tasa de consumo horario de combustible.", table_cell_style),
            Paragraph("Detección inmediata de descarga de acumulador y robo de combustible en campo.", table_cell_style),
        ],
    ]
    t_fleet_specs = Table(fleet_specs_data, colWidths=[130, 240, 162])
    t_fleet_specs.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_fleet_specs)
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 6: 4. GESTIÓN DE CLIENTES, SOPORTE Y RETROALIMENTACIÓN
    # =========================================================================
    story.append(Paragraph("4. Gestión de Clientes, Soporte y Motor de Retroalimentación", section_heading))
    story.append(Paragraph(
        "En el agronegocio moderno, la rentabilidad a largo plazo de la maquinaria depende de la retención del cliente y "
        "de la excelencia en el servicio posventa. El módulo de Inteligencia de Clientes de Holatractor permite a los "
        "concesionarios crear perfiles integrales de 360 grados para cada agricultor, registrando superficie cultivada, historial "
        "de maquinaria adquirida, puntaje crediticio y registro histórico de asistencias técnicas.",
        body_style
    ))
    story.append(Spacer(1, 6))

    crm_features_data = [
        [
            Paragraph("<b>Directorio de Clientes y KYC</b>", table_header_style),
            Paragraph("<b>Mesa de Ayuda Omnicanal</b>", table_header_style),
            Paragraph("<b>Calificaciones y NPS Automático</b>", table_header_style),
        ],
        [
            Paragraph(
                "• Ficha unificada con NIT y razón social<br/>"
                "• Mapeo GPS de parcelas del agricultor<br/>"
                "• Estado de maquinaria por cuenta en vivo<br/>"
                "• Calificación financiera y scoring crediticio",
                table_cell_style
            ),
            Paragraph(
                "• Tickets directos por WhatsApp y App móvil<br/>"
                "• Derivación automática al técnico asignado<br/>"
                "• Monitoreo de respuesta SLA menor a 15 min<br/>"
                "• Adjuntos fotográficos y audios de diagnóstico",
                table_cell_style
            ),
            Paragraph(
                "• Encuestas de satisfacción post-servicio (1-5★)<br/>"
                "• Tableros de desempeño por mecánico<br/>"
                "• Análisis de sentimiento con IA en mensajes<br/>"
                "• Soporte para arbitraje y garantía en custodia",
                table_cell_style
            ),
        ]
    ]
    t_crm_features = Table(crm_features_data, colWidths=[177, 177, 178])
    t_crm_features.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BACKGROUND', (0,1), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_crm_features)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Acuerdos de Nivel de Servicio (SLA) para Concesionarios", sub_heading))
    sla_data = [
        [Paragraph("Indicador de Servicio", table_header_style), Paragraph("Nivel Estándar", table_header_style), Paragraph("Nivel Concesionario Prioritario", table_header_style), Paragraph("Garantía de la Plataforma", table_header_style)],
        [Paragraph("Avería Crítica en Campo", table_cell_bold), Paragraph("Dentro de 4 horas hábiles", table_cell_style), Paragraph("Menor a 90 minutos en sitio", table_cell_style), Paragraph("Despacho automatizado con Agente IA", table_cell_style)],
        [Paragraph("Alarma Telemática de Motor", table_cell_bold), Paragraph("Notificación por correo", table_cell_style), Paragraph("SMS + WhatsApp + Alarma sonora", table_cell_style), Paragraph("< 60 segundos tras el evento ECU", table_cell_style)],
        [Paragraph("Entrega de Repuestos a Parcela", table_cell_bold), Paragraph("24 a 48 horas", table_cell_style), Paragraph("Envío express el mismo día", table_cell_style), Paragraph("Pre-ordenado según desgaste predictivo", table_cell_style)],
        [Paragraph("Auditoría de Satisfacción", table_cell_bold), Paragraph("Revisión mensual", table_cell_style), Paragraph("WhatsApp automático post-trabajo", table_cell_style), Paragraph("Umbral mínimo garantizado de 4.5/5.0", table_cell_style)],
    ]
    t_sla = Table(sla_data, colWidths=[140, 115, 137, 140])
    t_sla.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), SLATE_DARK),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_sla)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Ciclo de Vida del Cliente y Retención Automatizada", sub_heading))
    story.append(Paragraph(
        "Analizando el uso telemático real, Holatractor programa de manera autónoma revisiones de garantía a las 50 horas, "
        "alertas de mantenimiento a las 250 y 500 horas, y evaluaciones para renovación de maquinaria al alcanzar las 3,000 "
        "horas de trabajo. Los concesionarios reciben recordatorios directos para contactar a sus clientes en el momento exacto "
        "en que su propensión de compra es más alta, multiplicando las ventas repetidas y el valor de por vida del cliente (LTV).",
        body_style
    ))
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 7: 5. GESTIÓN DE PROSPECTOS (LEADS) Y EMBUDO DE CONVERSIÓN
    # =========================================================================
    story.append(Paragraph("5. Gestión de Prospectos (Leads) y Embudo de Conversión", section_heading))
    story.append(Paragraph(
        "No permita que ningún comprador potencial quede sin atender. Las consultas agrícolas capturadas en el marketplace "
        "central de Holatractor y en las campañas promocionales son dirigidas de forma exclusiva al concesionario autorizado en ese "
        "municipio. Los concesionarios monitorean la velocidad comercial, las etapas del embudo y los ingresos ganados en tiempo real.",
        body_style
    ))
    story.append(Spacer(1, 6))

    img_leads = "public/images/brochure/leads_conversion_analytics.png"
    story.append(make_proportional_image(img_leads, target_width=475))
    story.append(Paragraph("Figura 7.1: Analítica del Embudo de Conversión — 20% tasa de conversión, 11 días de ciclo de venta y $223k USD generados.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Hitos de las 5 Etapas del Embudo y Velocidad Comercial", sub_heading))
    funnel_data = [
        [Paragraph("Etapa del Embudo", table_header_style), Paragraph("Hito Comercial Alcanzado", table_header_style), Paragraph("Protocolo de Prevención de Caída", table_header_style)],
        [
            Paragraph("<b>Etapa 1: Lead Recibido</b>", table_cell_bold),
            Paragraph("Consulta captada desde marketplace web, WhatsApp o demostración de campo.", table_cell_style),
            Paragraph("El Agente IA valida inmediatamente el teléfono y precalifica el crédito del agricultor.", table_cell_style),
        ],
        [
            Paragraph("<b>Etapa 2: Contacto Iniciado</b>", table_cell_bold),
            Paragraph("Tasa de contacto del 80%; el asesor comercial llama en menos de 15 minutos.", table_cell_style),
            Paragraph("Envío automático por WhatsApp de ficha técnica en PDF personalizada del tractor.", table_cell_style),
        ],
        [
            Paragraph("<b>Etapa 3: Prueba / Demo</b>", table_cell_bold),
            Paragraph("53.3% avanza a prueba de manejo o demostración operativa en la parcela del cliente.", table_cell_style),
            Paragraph("Unidad de prueba agendada con permiso de telemetría GPS temporal.", table_cell_style),
        ],
        [
            Paragraph("<b>Etapa 4: Cotización Formal</b>", table_cell_bold),
            Paragraph("33.3% avanza a cotización formal de financiamiento o propuesta de compra al contado.", table_cell_style),
            Paragraph("Simulador financiero integrado que genera planes de pago y cuotas estacionales.", table_cell_style),
        ],
        [
            Paragraph("<b>Etapa 5: Cierre y Entrega</b>", table_cell_bold),
            Paragraph("20% de tasa global de conversión; $223,800 USD en ingresos ganados en 7 operaciones.", table_cell_style),
            Paragraph("Inspección de entrega registrada en la App; activación inmediata de garantía telemática.", table_cell_style),
        ],
    ]
    t_funnel = Table(funnel_data, colWidths=[130, 212, 190])
    t_funnel.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_funnel)
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 8: 6. CAMPAÑAS DE MARKETING OMNICANAL Y PROMOCIONES
    # =========================================================================
    story.append(Paragraph("6. Campañas de Marketing Omnicanal y Promociones Estacionales", section_heading))
    story.append(Paragraph(
        "Genere una demanda estacional predecible para tractores e implementos. Holatractor proporciona a los concesionarios "
        "campañas publicitarias pre-configuradas a través de Meta (Facebook e Instagram), Difusiones de WhatsApp, Google Local "
        "y jornadas técnicas con agrónomos en campo. Monitoree el retorno de la inversión publicitaria en tiempo real.",
        body_style
    ))
    story.append(Spacer(1, 6))

    img_marketing = "public/images/brochure/marketing_campaigns.png"
    story.append(make_proportional_image(img_marketing, target_width=475))
    story.append(Paragraph("Figura 8.1: Campañas de Marketing para Concesionarios — Control de presupuesto ($79,750 USD), 227 consultas y 297.9% de ROI.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Canales de Campaña y Plantillas de Promoción Llave en Mano", sub_heading))
    campaign_data = [
        [Paragraph("Canal / Táctica", table_header_style), Paragraph("Estrategia de Campaña y Formato Creativo", table_header_style), Paragraph("Rendimiento de Conversión", table_header_style)],
        [
            Paragraph("<b>Anuncios Meta (FB e IG)</b>", table_cell_bold),
            Paragraph("Carruseles dirigidos a productores de soya, caña de azúcar y maíz en un radio de 150 km.", table_cell_style),
            Paragraph("13,150 clics; costo de $3.50 USD por lead calificado", table_cell_style),
        ],
        [
            Paragraph("<b>Difusiones WhatsApp</b>", table_cell_bold),
            Paragraph("Comunicaciones de temporada: bonos de pre-campaña, financiamiento al 0% por 12 meses.", table_cell_style),
            Paragraph("74% de tasa de apertura dentro de las 2 horas del envío", table_cell_style),
        ],
        [
            Paragraph("<b>Campañas de Siembra</b>", table_cell_bold),
            Paragraph("Incentivos de entrega garantizada para tractores utilitarios de 45HP-55HP con seguro gratis.", table_cell_style),
            Paragraph("4 campañas activas generando $1,028k USD en ventas", table_cell_style),
        ],
    ]
    t_camp = Table(campaign_data, colWidths=[130, 240, 162])
    t_camp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_camp)
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 9: 7. AGENTES IA Y 8. NOTIFICACIONES TELEMÁTICAS
    # =========================================================================
    story.append(Paragraph("7. Flujos de Trabajo con Agentes IA y Despacho Autónomo", section_heading))
    story.append(Paragraph(
        "Holatractor integra Agentes de Inteligencia Artificial especializados en el sector agropecuario que operan 24/7 "
        "en beneficio de su concesionario. Estos agentes conectan los sensores telemáticos con las consultas de WhatsApp de los "
        "agricultores y la agenda del taller. Ante un código de falla en un motor, el Agente IA realiza el prediagnóstico, comprueba "
        "el stock de repuestos, calcula distancias y sugiere la orden de trabajo al jefe de taller.",
        body_style
    ))
    story.append(Spacer(1, 6))

    img_ai = "public/images/brochure/ai_mechanic_dispatch_3d.jpg"
    story.append(make_proportional_image(img_ai, target_width=475))
    story.append(Paragraph("Figura 9.1: Taller Autónomo con IA y Despacho de Mecánicos — Escaneo holográfico de fallas, coordinación dinámica y análisis de telemetría.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("8. Notificaciones Telemáticas en Tiempo Real y Alarmas Críticas", section_heading))
    story.append(Paragraph(
        "Cada tractor con módulo telemático Holatractor transmite datos por redes celulares e Iridium satelital. "
        "El motor de eventos procesa más de 1,400 registros por segundo, clasificando las situaciones en una matriz de cuatro niveles:",
        body_style
    ))
    story.append(Spacer(1, 4))

    notif_data = [
        [Paragraph("Nivel de Alarma", table_header_style), Paragraph("Condición Desencadenante", table_header_style), Paragraph("Canal de Notificación", table_header_style), Paragraph("Protocolo de Acción del Concesionario", table_header_style)],
        [
            Paragraph("<font color='#DC2626'><b>CRÍTICA (Rojo)</b></font>", table_cell_bold),
            Paragraph("Sobrecalentamiento (>105°C), caída de presión hidráulica (<12 bar), violación de geocerca.", table_cell_style),
            Paragraph("Push inmediato + SMS + Alarma sonora + WhatsApp al Gerente de Concesionario.", table_cell_style),
            Paragraph("El concesionario puede activar aviso de 30 min de gracia o inmovilización de motor.", table_cell_style),
        ],
        [
            Paragraph("<font color='#D97706'><b>ADVERTENCIA (Naranja)</b></font>", table_cell_bold),
            Paragraph("Filtro de aire saturado, batería baja (<11.8V), ralentí anormal excesivo (>45 min).", table_cell_style),
            Paragraph("Aviso en panel de control + Resumen técnico diario por correo electrónico.", table_cell_style),
            Paragraph("El Agente IA genera ficha de mantenimiento preventivo para el mecánico asignado.", table_cell_style),
        ],
        [
            Paragraph("<font color='#2563EB'><b>OPERACIONAL (Azul)</b></font>", table_cell_bold),
            Paragraph("Encendido/apagado de motor, entrada o salida de parcela, carga de combustible +50L.", table_cell_style),
            Paragraph("Actualización en vivo del pin en mapa + Registro histórico en bitácora del vehículo.", table_cell_style),
            Paragraph("Asentado en el expediente del equipo para cálculo de garantías e historial.", table_cell_style),
        ],
        [
            Paragraph("<font color='#059669'><b>COMERCIAL (Verde)</b></font>", table_cell_bold),
            Paragraph("Nueva consulta de financiamiento de tractor, solicitud de repuesto o cotización.", table_cell_style),
            Paragraph("WhatsApp al asesor comercial + Alta automática en cola de leads del CRM.", table_cell_style),
            Paragraph("El representante comercial recibe alerta para llamar al cliente en menos de 15 min.", table_cell_style),
        ],
    ]
    t_notif = Table(notif_data, colWidths=[90, 160, 142, 140])
    t_notif.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_notif)
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 10: 9. REPUESTOS, 10. MANTENIMIENTO Y 11. MECÁNICOS
    # =========================================================================
    story.append(Paragraph("9. Inventario de Repuestos de Tractores y Control de Stock", section_heading))
    story.append(Paragraph(
        "Evite la falta de insumos durante los periodos críticos de siembra y cosecha. El sistema inteligente de "
        "inventario de Holatractor supervisa piezas de alta rotación (filtros de aceite, fluidos hidráulicos, correas, cuchillas) "
        "y genera reposiciones automáticas calculando las horas de telemetría trabajadas en su región. Lectores de código de barras "
        "y códigos QR facilitan la recepción de mercadería y su imputación directa a órdenes de trabajo abiertas.",
        body_style
    ))
    story.append(Spacer(1, 6))

    img_parts = "public/images/brochure/parts_inventory_api_3d.jpg"
    story.append(make_proportional_image(img_parts, target_width=475))
    story.append(Paragraph("Figura 10.1: Inventario Automatizado de Repuestos y Conexión ERP en la Nube — Trazabilidad RFID / QR, alertas de reposición y sincronización API.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("10. Mantenimiento Programado de Tractores y Niveles de Servicio", section_heading))
    story.append(Paragraph(
        "Los motores diésel Common-Rail modernos exigen un cumplimiento riguroso de sus planes de mantenimiento. Holatractor "
        "registra las horas de trabajo exactas desde la ECU, eliminando anotaciones manuales erróneas. Los concesionarios gestionan "
        "tres intervalos estandarizados de atención técnica:",
        body_style
    ))
    story.append(Spacer(1, 4))

    service_data = [
        [Paragraph("Intervalo de Servicio", table_header_style), Paragraph("Inspección de Componentes y Recambio", table_header_style), Paragraph("Automatización Telemática", table_header_style), Paragraph("Ingreso Estimado Concesionario", table_header_style)],
        [
            Paragraph("<b>Nivel 1: 250 Horas</b><br/><font color='#64748B'>Asentamiento Inicial</font>", table_cell_bold),
            Paragraph("Cambio de aceite de motor y filtro, purga de separador de combustible, tensión de correas, engrase general de eje delantero.", table_cell_style),
            Paragraph("Alerta telemática a las 230 hrs; propuesta automática de cita al productor vía WhatsApp.", table_cell_style),
            Paragraph("$180 - $260 USD<br/>(Repuestos + 2.0h Mano de Obra)", table_cell_style),
        ],
        [
            Paragraph("<b>Nivel 2: 500 Horas</b><br/><font color='#64748B'>Servicio de Media Estación</font>", table_cell_bold),
            Paragraph("Reemplazo de filtro hidráulico, limpieza de malla de transmisión, filtro de aire primario y prueba de estanqueidad de refrigeración.", table_cell_style),
            Paragraph("Comparación de curvas de eficiencia de inyección contra valores de fábrica.", table_cell_style),
            Paragraph("$390 - $550 USD<br/>(Repuestos + 4.5h Mano de Obra)", table_cell_style),
        ],
        [
            Paragraph("<b>Nivel 3: 1,000 Horas</b><br/><font color='#64748B'>Mantenimiento Integral Anual</font>", table_cell_bold),
            Paragraph("Sustitución de todos los fluidos (hidráulico + diferencial), calibración de inyectores, holgura de turbo y reglaje de válvulas.", table_cell_style),
            Paragraph("Emisión de Certificado de Salud Técnica en PDF para revalorización del activo.", table_cell_style),
            Paragraph("$850 - $1,250 USD<br/>(Paquete Integral de Taller)", table_cell_style),
        ],
    ]
    t_service = Table(service_data, colWidths=[100, 192, 130, 110])
    t_service.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_service)
    story.append(Spacer(1, 6))

    story.append(Paragraph("11. Gestión de Mecánicos y Bahías de Taller", sub_heading))
    story.append(Paragraph(
        "Supervise tanto a los técnicos en taller como a las brigadas de auxilio mecánico móvil en campo. Asigne órdenes de trabajo, "
        "monitoree la ubicación GPS de las camionetas de servicio, verifique certificaciones y compare horas presupuestadas contra "
        "horas reales. Los mecánicos utilizan la App Móvil Holatractor para fotografiar componentes averiados, registrar la firma "
        "del productor y facturar repuestos directamente a la cuenta del cliente.",
        body_style
    ))
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 11: 12. INTEGRACIÓN API Y CONECTIVIDAD EMPRESARIAL
    # =========================================================================
    story.append(Paragraph("12. Integración API Personalizada y Conectividad Empresarial", section_heading))
    story.append(Paragraph(
        "Holatractor se asienta sobre una arquitectura corporativa abierta, permitiendo a las redes de concesionarios e "
        "importadores sincronizarse con sus sistemas ERP, CRM y de facturación actuales sin duplicar tareas administrativas. "
        "Nuestras APIs RESTful de alto rendimiento y arquitectura de Webhooks garantizan una integración fluida con SAP, "
        "Oracle NetSuite, Microsoft Dynamics, Salesforce y sistemas contables locales.",
        body_style
    ))
    story.append(Spacer(1, 6))

    api_data = [
        [Paragraph("Ruta de Endpoint", table_header_style), Paragraph("HTTP", table_header_style), Paragraph("Función y Carga de Datos", table_header_style), Paragraph("Dirección de Sincronización", table_header_style)],
        [
            Paragraph("<code>/v1/dealers/vehicles</code>", table_cell_bold),
            Paragraph("<b>GET / POST</b>", table_cell_style),
            Paragraph("Obtener flota activa o registrar nueva maquinaria con VIN, baliza BLE y número de serie telemático.", table_cell_style),
            Paragraph("Bidireccional (ERP <-> Holatractor)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/telematics/live-stream</code>", table_cell_bold),
            Paragraph("<b>WSS / GET</b>", table_cell_style),
            Paragraph("Flujo de telemetría en tiempo real: coordenadas GPS, velocidad, RPM, temperatura y nivel de diésel.", table_cell_style),
            Paragraph("Saliente (Holatractor -> Concesionario)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/vehicles/{id}/immobilize</code>", table_cell_bold),
            Paragraph("<b>POST</b>", table_cell_style),
            Paragraph("Endpoint de seguridad para activar inmovilización de motor mediante token criptográfico autorizado.", table_cell_style),
            Paragraph("Entrante (Titular de Concesionario)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/customers/crm-sync</code>", table_cell_bold),
            Paragraph("<b>POST / PUT</b>", table_cell_style),
            Paragraph("Sincronización de límites de crédito, NIT, contratos vigentes y flota de maquinaria por productor.", table_cell_style),
            Paragraph("Bidireccional (Salesforce / HubSpot)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/inventory/parts-reorder</code>", table_cell_bold),
            Paragraph("<b>POST</b>", table_cell_style),
            Paragraph("Emisión automática de órdenes de compra a fábrica cuando el stock de seguridad es superado.", table_cell_style),
            Paragraph("Saliente (Holatractor -> Fábrica OEM)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/webhooks/dtc-fault</code>", table_cell_bold),
            Paragraph("<b>EVENTO</b>", table_cell_style),
            Paragraph("Disparo inmediato de webhook cuando la ECU arroja un código de falla J1939 con captura de parámetros.", table_cell_style),
            Paragraph("Envío por Evento (Webhook JSON)", table_cell_style),
        ],
    ]
    t_api = Table(api_data, colWidths=[130, 60, 222, 120])
    t_api.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DARK_RED),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_api)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Especificaciones de Integración para Desarrolladores Corporativos", sub_heading))
    dev_spec_data = [
        [Paragraph("Protocolo de Seguridad", table_cell_bold), Paragraph("OAuth 2.0 con Mutual TLS (mTLS), cifrado AES de 256 bits en reposo y en tránsito.", table_cell_style)],
        [Paragraph("Límites de Peticiones", table_cell_bold), Paragraph("10,000 llamadas API/minuto por licencia de concesionario, ampliable a 25,000 en periodos de cosecha.", table_cell_style)],
        [Paragraph("Confiabilidad de Webhooks", table_cell_bold), Paragraph("Reintentos automáticos con retroceso exponencial (persistencia de 24 horas) y verificación HMAC.", table_cell_style)],
        [Paragraph("Disponibilidad de SDKs", table_cell_bold), Paragraph("Bibliotecas cliente oficiales para Python, Node.js, Go, Java y C# (.NET Core).", table_cell_style)],
        [Paragraph("Portal para Desarrolladores", table_cell_bold), Paragraph("<a href='https://api.holatractor.com/v1/docs' color='#DC2626'>https://api.holatractor.com/v1/docs</a> — Documentación interactiva Swagger / OpenAPI 3.1.", table_cell_style)],
    ]
    t_dev_spec = Table(dev_spec_data, colWidths=[130, 402])
    t_dev_spec.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_dev_spec)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Marca Blanca y Subdominios Propios para Concesionarios", sub_heading))
    story.append(Paragraph(
        "Los concesionarios autorizados pueden desplegar el Portal de Clientes de Holatractor bajo su propio dominio corporativo "
        "(ej., <code>portal.suconcesionario.com</code>) con su identidad visual, logotipo y condiciones de financiamiento adaptadas. "
        "Sus clientes disfrutan de una experiencia digital de primera línea mientras su concesionario afianza su liderazgo en la región.",
        body_style
    ))
    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 12: TÉRMINOS Y CONDICIONES OFICIALES (T&C) Y BLOQUE DE FIRMA
    # =========================================================================
    story.append(Paragraph("Términos y Condiciones Oficiales para Socios Concesionarios", section_heading))
    story.append(Paragraph(
        "Los presentes Términos y Condiciones constituyen el acuerdo comercial vinculante entre <b>Holatractor Srl / Inc.</b> "
        "('Holatractor') y el Socio Concesionario Autorizado ('Concesionario'). La firma o aceptación formal confirma la plena "
        "conformidad con nuestros estándares comerciales, operativos y de seguridad de datos.",
        body_style
    ))
    story.append(Spacer(1, 3))

    story.append(Paragraph("Artículo 1: Exclusividad Territorial y Alcance del Concesionario", tc_article_heading))
    story.append(Paragraph(
        "1.1. Holatractor otorga al Concesionario el derecho comercial (con exclusividad regional protegida al cumplir metas de volumen Nivel 1) "
        "para la comercialización, arrendamiento, servicio técnico y monitoreo telemático de maquinaria agrícola dentro de su territorio asignado.<br/>"
        "1.2. El Concesionario se compromete a disponer de salas de exhibición activas, técnicos certificados y un inventario de repuestos "
        "originales conforme a los Estándares de Calidad Holatractor.<br/>"
        "1.3. Las solicitudes comerciales y consultas de agricultores originadas en los códigos postales o límites municipales del territorio "
        "designado serán asignadas con exclusividad a la bandeja de oportunidades del Concesionario.",
        tc_clause_text
    ))

    story.append(Paragraph("Artículo 2: Márgenes Comerciales, Comisiones y Distribución de Ingresos", tc_article_heading))
    story.append(Paragraph(
        "2.1. <b>Margen en Hardware y Telemetría:</b> El Concesionario accede a un margen mayorista del 38% sobre los dispositivos telemáticos, "
        "módulos IoT y balizas satelitales comercializados.<br/>"
        "2.2. <b>Comisiones Recurrentes SaaS:</b> El Concesionario percibe un 20% anual recurrente sobre las renovaciones de suscripciones "
        "de software y telemetría satelital de los clientes dados de alta por su concesión.<br/>"
        "2.3. <b>Bonificación por Financiamiento:</b> En operaciones canalizadas mediante Holatractor Financial Services, el Concesionario "
        "recibe un 2.5% sobre el capital financiado, liquidable a los 14 días calendario de la firma del contrato.",
        tc_clause_text
    ))

    story.append(Paragraph("Artículo 3: Hardware Telemático, Instalación y Acuerdos de Nivel de Servicio (SLAs)", tc_article_heading))
    story.append(Paragraph(
        "3.1. Los equipos telemáticos deben ser instalados por personal certificado por Holatractor siguiendo estrictamente los esquemas "
        "del fabricante. Conexiones indebidas al bus CAN que provoquen desperfectos serán de exclusiva responsabilidad del taller instalador.<br/>"
        "3.2. Holatractor garantiza un SLA del 99.9% en disponibilidad de plataforma y telemetría satelital, salvo labores de mantenimiento "
        "programadas comunicadas con al menos 48 horas de anticipación.<br/>"
        "3.3. Los comandos de inmovilización remota de motor requieren autenticación multifactor y deben ejecutarse resguardando la seguridad "
        "operativa en campo (maquinaria detenida o desacelerada de forma segura).",
        tc_clause_text
    ))

    story.append(Paragraph("Artículo 4: Privacidad de Datos, Propiedad de Maquinaria y Seguridad Agronómica", tc_article_heading))
    story.append(Paragraph(
        "4.1. Toda la información agronómica y de rendimiento de parcelas pertenece de manera exclusiva al agricultor propietario. "
        "El Concesionario y Holatractor cuentan con licencia de uso limitada exclusivamente a labores de diagnóstico, soporte y garantía.<br/>"
        "4.2. Holatractor se compromete a no divulgar, comercializar ni compartir las nóminas de clientes ni listas de precios del Concesionario "
        "con terceras partes o concesionarios competidores sin autorización expresa por escrito.",
        tc_clause_text
    ))

    story.append(Paragraph("Artículo 5: Custodia en Garantía (Escrow), Facturación y Liquidaciones", tc_article_heading))
    story.append(Paragraph(
        "5.1. Los anticipos, pagos de reservas y cuotas de arrendamiento recibidos a través de la plataforma se resguardan en cuentas bancarias "
        "en custodia (escrow) y se liquidan al Concesionario en ciclos quincenales (días 1 y 15 de cada mes).<br/>"
        "5.2. Las transferencias se realizan en moneda de curso legal (Bolivianos - BOB o Dólares Americanos - USD) mediante giro bancario directo.",
        tc_clause_text
    ))

    story.append(Paragraph("Artículo 6: Vigencia, Auditorías de Desempeño y Rescisión", tc_article_heading))
    story.append(Paragraph(
        "6.1. El presente contrato rige por un plazo inicial de 24 meses, renovable automáticamente por periodos sucesivos de 12 meses salvo "
        "notificación de no renovación con 60 días de anticipación.<br/>"
        "6.2. Holatractor se reserva el derecho de rescisión en caso de calificaciones continuas de servicio inferiores a 3.8/5.0 estrellas o "
        "incumplimientos de garantía no subsanados dentro de los 30 días posteriores a la notificación formal.",
        tc_clause_text
    ))
    story.append(Spacer(1, 6))

    # Bloque de Firmas y Legalización
    sig_data = [
        [
            Paragraph("<b>POR HOLATRACTOR SRL / INC.</b><br/><br/>"
                      "Representante Autorizado: _______________________<br/>"
                      "Cargo: Vicepresidente de Operaciones Regionales<br/>"
                      "Fecha: ________________________ [Sello Oficial]", table_cell_style),
            Paragraph("<b>POR EL CONCESIONARIO AUTORIZADO</b><br/><br/>"
                      "Razón Social: _________________________________<br/>"
                      "Firma del Titular: ____________________________<br/>"
                      "Fecha: ________________________ [Sello Comercial]", table_cell_style)
        ]
    ]
    t_sig = Table(sig_data, colWidths=[266, 266])
    t_sig.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
        ('BOX', (0,0), (-1,-1), 1, DARK_RED),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_sig)

    # Construir Documento con NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Folleto en español generado exitosamente en: {output_path}")

    # Renderizar vistas previas PNG de alta resolución para la plataforma web
    try:
        render_previews(output_path, "public/images/brochure/previews")
    except Exception as e:
        print(f"Aviso al renderizar vistas previas: {e}")


def render_previews(pdf_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    pdf_doc = pymupdf.open(pdf_path)
    print(f"Renderizando {len(pdf_doc)} páginas a {output_dir}...")
    for idx, page in enumerate(pdf_doc):
        # Render a 150 DPI para nitidez cristalina en pantalla
        pix = page.get_pixmap(dpi=150)
        out_file = os.path.join(output_dir, f"page_{idx + 1}.png")
        pix.save(out_file)
        print(f"  Página {idx + 1} guardada: {out_file}")
    print("Todas las vistas previas han sido actualizadas.")


if __name__ == "__main__":
    build_brochure_pdf()
