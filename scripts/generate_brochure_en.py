#!/usr/bin/env python3
"""
Holatractor Official Dealership Partner Brochure & Platform Guide (PDF Generator)
Generates an ultra-premium, interactive 12-page commercial brochure with:
- 100% proportional, un-stretched official logos and high-res screenshots
- Every single dealer feature requested by the user
- Complete 6-article Dealership Terms & Conditions with execution block
- Dynamic NumberedCanvas (Page X of Y, running headers and footers)
- Clean, executive typography and harmonious color tokens
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


# Helper: Create an Image with mathematically exact aspect ratio to prevent ANY stretching
def make_proportional_image(path, target_width=475, max_height=None):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Image file not found: {path}")
    with PILImage.open(path) as im:
        orig_w, orig_h = im.size
    aspect = orig_w / orig_h
    target_h = target_width / aspect
    if max_height and target_h > max_height:
        target_h = max_height
        target_width = target_h * aspect
    return RLImage(path, width=target_width, height=target_h)


# Define Canvas for dynamic running headers, footers and page numbering
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
        # Omit header and footer on cover page (Page 1)
        if self._pageNumber == 1:
            return

        self.saveState()

        # Running Top Header
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#991B1B"))
        self.drawString(40, 756, "HOLATRACTOR")

        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawString(108, 756, "|  Official Dealership Partner Brochure & Platform Guide (2026)")

        self.drawRightString(572, 756, "Commercial Dealership Network")

        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.6)
        self.line(40, 748, 572, 748)

        # Running Bottom Footer
        self.line(40, 42, 572, 42)

        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#94A3B8"))
        self.drawString(40, 30, "Confidential • Holatractor Srl / Inc. • All Rights Reserved")

        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#334155"))
        self.drawRightString(572, 30, f"Page {self._pageNumber} of {page_count}")

        self.restoreState()


def build_brochure_pdf(output_path="public/holatractor-dealer-brochure.pdf"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Document setup: Letter size (612 x 792 pt), margins: left/right=40, top/bottom=46
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=46,
        bottomMargin=46,
        title="Holatractor Dealership Platform Brochure 2026",
        author="Holatractor Srl",
        subject="Official Dealership Partner Platform Guide & Terms",
        keywords="Holatractor, Agricultural Telematics, Connected Dealership, Tractor Fleet, Agritech",
    )

    # Custom Color Palette
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

    # Typography & Paragraph Styles
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
        alignment=1, # Center
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
    # PAGE 1: EXECUTIVE COVER & COMMERCIAL OVERVIEW
    # =========================================================================
    logo_color_path = "public/images/brochure/holatractor_logo_color.png"
    # Logo original is 210x78 (ratio 2.692).
    # Width 135 pt -> Height exactly 50.15 pt (ZERO distortion!)
    proportional_cover_logo = make_proportional_image(logo_color_path, target_width=135)

    cover_banner_data = [
        [
            proportional_cover_logo,
            Paragraph(
                "<font size=8.5 color='#FECACA'><b>COMMERCIAL DEALERSHIP PROGRAM</b></font><br/>"
                "<font size=7.5 color='#E2E8F0'>Santa Cruz de la Sierra • Bolivia & LATAM</font><br/>"
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

    # Hero Title Block
    hero_title_style = ParagraphStyle(
        "HeroTitle",
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=SLATE_DARK,
        spaceAfter=6,
    )
    story.append(Paragraph("Connected Agri-Dealership Platform & Partner Guide", hero_title_style))
    story.append(Paragraph(
        "<b>Holatractor Srl / Inc.</b> is the premier Latin American agricultural machinery operating system. "
        "We unite tractor manufacturers, regional franchise dealerships, implement workshops, and commercial farmers "
        "into a single telematics-powered digital ecosystem. Scale dealership revenue, reduce credit risk with remote GPS "
        "ignition immobilization, automate parts inventory, and dispatch mechanics autonomously.",
        body_style
    ))
    story.append(Spacer(1, 8))

    # Key Partner Value Metrics (4-column cards)
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
            Paragraph("Hardware & Telematics Margin", metric_sub_style),
            Paragraph("Inbound Lead Conversion Speed", metric_sub_style),
            Paragraph("Satellite Telemetry Uptime SLA", metric_sub_style),
            Paragraph("Autonomous AI Diagnostic Agents", metric_sub_style),
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

    # Corporate Profile Table
    story.append(Paragraph("Dealership Partner Summary & Corporate Verification", sub_heading))
    corp_data = [
        [Paragraph("<b>Company Entity</b>", table_cell_bold), Paragraph("Holatractor Srl / Holatractor Inc. (Agri-Technologies Latin America)", table_cell_style)],
        [Paragraph("<b>Regional Headquarters</b>", table_cell_bold), Paragraph("Av. San Martín 1550, Equipetrol Norte, Santa Cruz de la Sierra, Bolivia", table_cell_style)],
        [Paragraph("<b>Platform Scope</b>", table_cell_bold), Paragraph("Store Operations, Fleet GPS, Farmer CRM, Leads, AI Agents, Maintenance & Parts", table_cell_style)],
        [Paragraph("<b>Direct Contact</b>", table_cell_bold), Paragraph("<a href='mailto:dealers@holatractor.com' color='#DC2626'>dealers@holatractor.com</a> | Tel: +591 3 345-8900 | WhatsApp: +591 77613811", table_cell_style)],
        [Paragraph("<b>Online Partner Portal</b>", table_cell_bold), Paragraph("<a href='https://holatractor.com/dealers' color='#DC2626'>https://holatractor.com/dealers</a> — Instant Dealership Verification", table_cell_style)],
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

    # Table of Contents Directory (2 columns, nicely styled)
    story.append(Paragraph("Comprehensive Platform Feature Directory & Roadmap", sub_heading))
    toc_data = [
        [
            Paragraph("<b>1. Store & Multi-Branch Management</b><br/><font color='#64748B'>Locations, showrooms & operating hours</font>", table_cell_style),
            Paragraph("<b>7. Omnichannel Marketing Campaigns</b><br/><font color='#64748B'>Meta ads, WhatsApp broadcasts & field camps</font>", table_cell_style),
        ],
        [
            Paragraph("<b>2. Add Tractors & Implements in Store</b><br/><font color='#64748B'>Cataloging, BLE tagging & specs matching</font>", table_cell_style),
            Paragraph("<b>8. AI Agent Workflows & Auto Dispatch</b><br/><font color='#64748B'>24/7 autonomous diagnostics & scheduling</font>", table_cell_style),
        ],
        [
            Paragraph("<b>3. Real-Time Fleet & Satellite GPS</b><br/><font color='#64748B'>Live map, geofencing & ignition lock</font>", table_cell_style),
            Paragraph("<b>9. Telematics Notifications & DTC Alarms</b><br/><font color='#64748B'>Instant multi-tier fault alerts & thresholds</font>", table_cell_style),
        ],
        [
            Paragraph("<b>4. Farmer Customer Directory & Profiles</b><br/><font color='#64748B'>Land records, machinery ledger & history</font>", table_cell_style),
            Paragraph("<b>10. Parts Inventory & Scheduled Maintenance</b><br/><font color='#64748B'>Consumables, 250h-1000h tiers & barcode QR</font>", table_cell_style),
        ],
        [
            Paragraph("<b>5. Customer Support & Feedback Loop</b><br/><font color='#64748B'>SLA ticketing, ratings & dispute escrow</font>", table_cell_style),
            Paragraph("<b>11. Mechanics & Workshop Bay Tracking</b><br/><font color='#64748B'>Field technicians, certifications & GPS routes</font>", table_cell_style),
        ],
        [
            Paragraph("<b>6. Inbound Lead & Conversion Funnels</b><br/><font color='#64748B'>Sales velocity, lease scoring & win analytics</font>", table_cell_style),
            Paragraph("<b>12. Custom REST API & Terms and Conditions</b><br/><font color='#64748B'>ERP sync, webhooks, SLAs & partner contract</font>", table_cell_style),
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
    # PAGE 2: EXECUTIVE DASHBOARD OVERVIEW
    # =========================================================================
    story.append(Paragraph("Executive Overview: The Connected Dealership Dashboard", section_heading))
    story.append(Paragraph(
        "Modern agricultural equipment retail requires an all-in-one command center. Holatractor's flagship Dealer "
        "Dashboard unifies customer records, machinery leases, sales lead funnels, and workshop telemetry into an "
        "intuitive, real-time interface. Dealership managers monitor working hours, customer progress, and pending "
        "support tickets without navigating disparate legacy databases.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Proportional screenshot (1024x581 -> ratio 1.762 -> 475 x 269.5 pt, exactly proportional)
    img_dashboard = "public/images/brochure/dealer_dashboard_overview.png"
    story.append(make_proportional_image(img_dashboard, target_width=475))
    story.append(Paragraph("Figure 2.1: Live Dealer Dashboard — Real-time metrics from live Customer, Lease, Operations & Sales APIs.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Core Operational Modules at a Glance", sub_heading))
    dash_modules_data = [
        [Paragraph("Command Module", table_header_style), Paragraph("Real-Time Telemetry Feed", table_header_style), Paragraph("Business Impact for Dealers", table_header_style)],
        [
            Paragraph("<b>Live Customer Roster</b>", table_cell_bold),
            Paragraph("Total active accounts, tractor count per farmer, outstanding lease obligations.", table_cell_style),
            Paragraph("Zero default risk; automated payment reconciliation.", table_cell_style),
        ],
        [
            Paragraph("<b>Working Hours Telemetry</b>", table_cell_bold),
            Paragraph("Real-time average working duration (e.g., 05:37:32), +1.2% daily trend.", table_cell_style),
            Paragraph("Verify equipment lease utilization & prevent abuse.", table_cell_style),
        ],
        [
            Paragraph("<b>Weekly Sales Lead Funnel</b>", table_cell_bold),
            Paragraph("Aggregated API sales leads across 7-day cyclical calendar.", table_cell_style),
            Paragraph("Predictive machinery inventory restocking.", table_cell_style),
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
    # PAGE 3: FEATURE 1: STORE & MULTI-BRANCH DEALERSHIP MANAGEMENT
    # =========================================================================
    story.append(Paragraph("1. Store & Multi-Branch Dealership Management", section_heading))
    story.append(Paragraph(
        "Holatractor enables dealership groups to coordinate multiple regional branch showrooms, allocate machinery "
        "inventory, and synchronize operating schedules from one unified cloud dashboard. Whether you operate a single "
        "flagship showroom in Santa Cruz or multiple regional distribution hubs across the state, the Store Management "
        "engine guarantees complete operational control and inventory visibility.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Proportional screenshot (1024x581 -> ratio 1.762 -> 475 x 269.5 pt, exactly proportional)
    img_stores = "public/images/brochure/store_management_locations.png"
    story.append(make_proportional_image(img_stores, target_width=475))
    story.append(Paragraph("Figure 3.1: Dealership Branch Manager — 6 active showrooms, 23 fleet units, and 10-day demand cycles.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Regional Showroom Orchestration Capabilities", sub_heading))
    store_capabilities_data = [
        [Paragraph("Branch Management Feature", table_header_style), Paragraph("System Functionality", table_header_style), Paragraph("Regional Coverage", table_header_style)],
        [
            Paragraph("<b>Multi-Location Inventory</b>", table_cell_bold),
            Paragraph("Track which showroom currently holds specific tractor models (Kioti PX, Farmall, 6M).", table_cell_style),
            Paragraph("Santa Cruz, Montero, San Ignacio, Cuatro Cañadas", table_cell_style),
        ],
        [
            Paragraph("<b>Operating Schedules & Shifts</b>", table_cell_bold),
            Paragraph("Configure localized showroom hours (e.g., 8:00 AM - 6:00 PM) and emergency night-shift coverage.", table_cell_style),
            Paragraph("Synchronized with farmer mobile app directory", table_cell_style),
        ],
        [
            Paragraph("<b>Fleet Transfer Coordination</b>", table_cell_bold),
            Paragraph("Initiate internal asset transfers between branches with automated bill of lading generation.", table_cell_style),
            Paragraph("Instant BLE tag reassignment upon arrival", table_cell_style),
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
    # PAGE 4: FEATURE 2: ADD TRACTORS & IMPLEMENTS IN STORE
    # =========================================================================
    story.append(Paragraph("2. Add Tractors & Implements in Store", section_heading))
    story.append(Paragraph(
        "Dealerships can catalog and publish new and certified pre-owned tractors, harvesters, and specialized implements "
        "in under 3 minutes. Each asset is registered with its VIN, horsepower rating, hydraulic specifications, and "
        "paired Bluetooth Low Energy (BLE) asset beacon. Farmers searching by municipality can immediately inspect "
        "availability, schedule field demonstrations, or apply for in-house dealership financing.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Comprehensive Table of Implements & Tractor specifications
    implements_data = [
        [
            Paragraph("Asset Category", table_header_style),
            Paragraph("Typical Machinery & Models", table_header_style),
            Paragraph("Telematics & Beacon Pairing", table_header_style),
            Paragraph("Dealership Revenue Model", table_header_style),
        ],
        [
            Paragraph("<b>4WD High-HP Tractors</b>", table_cell_bold),
            Paragraph("Kioti PX Series (93-110 HP), John Deere 6M, Case IH Farmall", table_cell_style),
            Paragraph("CAN-bus Hardwired Telematics (OBD-II / J1939 + GPS)", table_cell_style),
            Paragraph("Unit Sale + 3-Year Telematics Service Contract", table_cell_style),
        ],
        [
            Paragraph("<b>Soil Implements & Seeders</b>", table_cell_bold),
            Paragraph("Heavy Disc Plows, Subsoilers, Pneumatic Planters", table_cell_style),
            Paragraph("Solar BLE Beacon (Acreage & Hectares Counter)", table_cell_style),
            Paragraph("Implement Bundle Margin + Wear Part Replacement", table_cell_style),
        ],
        [
            Paragraph("<b>Crop Protection & Sprayers</b>", table_cell_bold),
            Paragraph("Self-propelled & Trailed Boom Sprayers", table_cell_style),
            Paragraph("Nozzle Flow Sensors + GPS Swath Tracking", table_cell_style),
            Paragraph("Chemical Compatibility Subscription & Spares", table_cell_style),
        ],
        [
            Paragraph("<b>Harvesting Equipment</b>", table_cell_bold),
            Paragraph("Combine Harvesters, Grain Carts & Headers", table_cell_style),
            Paragraph("Engine Load Telemetry + Grain Loss Sensor Kit", table_cell_style),
            Paragraph("Seasonal Lease Commission + Emergency Field SLA", table_cell_style),
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

    story.append(Paragraph("Onboarding Protocol for Dealership Inventory", sub_heading))
    story.append(Paragraph(
        "1. <b>Digital Asset Registration:</b> The dealership technician inputs the tractor VIN, serial number, and factory specifications into the portal.<br/>"
        "2. <b>Hardware Activation:</b> Connect the Holatractor CAN-bus telematics gateway to the vehicle's diagnostic harness. The unit runs a self-test and pairs in under 60 seconds.<br/>"
        "3. <b>Implement Pairing:</b> Attach a weather-sealed BLE beacon to plows, harrows, and seeders. The beacon automatically links to the tractor when hitched.<br/>"
        "4. <b>Instant Marketplace Publishing:</b> With one click, the asset appears on the Holatractor regional buyer network with live showroom availability and financing estimates.",
        body_style
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 5: FEATURE 3: REAL-TIME FLEET MANAGEMENT & GPS TRACKING
    # =========================================================================
    story.append(Paragraph("3. Real-Time Fleet Management & Satellite GPS Tracking", section_heading))
    story.append(Paragraph(
        "Tractors sold on credit, financing, or operational lease represent substantial capital exposure. The Holatractor "
        "Fleet Map Tracker gives dealerships continuous real-time satellite visibility over every machine in their network. "
        "Dealers monitor engine run hours, battery voltage, operational status (optimal vs breakdown), and geographic breadcrumbs. "
        "In the event of unauthorized cross-border movement, breach of contract, or severe default, dealerships can safely "
        "trigger remote engine immobilization directly from the dealer console.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Proportional screenshot (1024x581 -> ratio 1.762 -> 475 x 269.5 pt, exactly proportional)
    img_fleet = "public/images/brochure/fleet_map_tracker.png"
    story.append(make_proportional_image(img_fleet, target_width=475))
    story.append(Paragraph("Figure 5.1: Live Satellite Fleet Tracker — Kioti PX 93-110 HP live unit in Santa Cruz de la Sierra.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Asset Protection & Telematics Specifications", sub_heading))
    fleet_specs_data = [
        [Paragraph("Telematics Feature", table_header_style), Paragraph("Technical Specification", table_header_style), Paragraph("Dealer Protection Benefit", table_header_style)],
        [
            Paragraph("<b>Satellite Geofencing</b>", table_cell_bold),
            Paragraph("Polygon virtual boundaries defined down to individual farm parcel coordinates.", table_cell_style),
            Paragraph("Instant breach alert if machinery leaves contracted agricultural zone.", table_cell_style),
        ],
        [
            Paragraph("<b>Remote Engine Lock</b>", table_cell_bold),
            Paragraph("Encrypted relay signal to ECU ignition control; triggers safe shutdown.", table_cell_style),
            Paragraph("Zero loan default write-offs; total asset repossession security.", table_cell_style),
        ],
        [
            Paragraph("<b>Battery & Fuel Monitoring</b>", table_cell_bold),
            Paragraph("Continuous voltage sampling (optimal >12.4V) and fuel consumption rate.", table_cell_style),
            Paragraph("Detect battery draining and siphoning before equipment dispatch.", table_cell_style),
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
    # PAGE 6: FEATURES 4, 5, 6: CUSTOMER MANAGEMENT, SUPPORT & FEEDBACK
    # =========================================================================
    story.append(Paragraph("4. Customer Management, Support & Feedback Engine", section_heading))
    story.append(Paragraph(
        "In modern agribusiness, long-term equipment profitability hinges on customer retention and post-sale service "
        "satisfaction. Holatractor's Customer Intelligence module allows dealerships to build exhaustive 360-degree profiles "
        "of every farming client, tracking total cultivated land acreage, machinery ownership history, credit score, and "
        "historical maintenance tickets.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # 3 Column Feature Breakdown Card
    crm_features_data = [
        [
            Paragraph("<b>Customer Directory & KYC</b>", table_header_style),
            Paragraph("<b>Omnichannel Support Desk</b>", table_header_style),
            Paragraph("<b>Automated Feedback & NPS</b>", table_header_style),
        ],
        [
            Paragraph(
                "• Unified farmer ledger with NIT/Tax ID<br/>"
                "• GPS parcel mapping of client farm<br/>"
                "• Real-time equipment status per account<br/>"
                "• Financial creditworthiness scoring",
                table_cell_style
            ),
            Paragraph(
                "• Direct WhatsApp & in-app ticketing<br/>"
                "• Automatic routing to assigned technician<br/>"
                "• Response SLA monitoring under 15 mins<br/>"
                "• Photo & audio diagnostic attachments",
                table_cell_style
            ),
            Paragraph(
                "• Post-service 5-star rating surveys<br/>"
                "• Mechanic performance scorecards<br/>"
                "• AI sentiment analysis on farmer chats<br/>"
                "• Escrow dispute arbitration support",
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

    story.append(Paragraph("Dealership Customer Support & Service SLA Commitments", sub_heading))
    sla_data = [
        [Paragraph("Service Level Indicator", table_header_style), Paragraph("Standard Tier", table_header_style), Paragraph("Priority Dealership Tier", table_header_style), Paragraph("Platform Guarantee", table_header_style)],
        [Paragraph("Emergency Field Breakdown", table_cell_bold), Paragraph("Within 4 business hours", table_cell_style), Paragraph("Under 90 minutes (On-site)", table_cell_style), Paragraph("AI Automated Mechanic Dispatch", table_cell_style)],
        [Paragraph("Critical Telematics Alarm", table_cell_bold), Paragraph("Email notification", table_cell_style), Paragraph("Instant SMS + WhatsApp + Alarm", table_cell_style), Paragraph("< 60 seconds from ECU trigger", table_cell_style)],
        [Paragraph("Parts Delivery to Farm", table_cell_bold), Paragraph("24 to 48 hours", table_cell_style), Paragraph("Same-day express delivery", table_cell_style), Paragraph("Pre-ordered via predictive wear", table_cell_style)],
        [Paragraph("Customer Satisfaction Review", table_cell_bold), Paragraph("Monthly audit", table_cell_style), Paragraph("Automated post-job WhatsApp", table_cell_style), Paragraph("Minimum 4.5/5.0 dealer threshold", table_cell_style)],
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

    story.append(Paragraph("Automated Customer Lifecycle & Retention Workflows", sub_heading))
    story.append(Paragraph(
        "By analyzing telematics usage curves, Holatractor automatically schedules warranty check-ins at 50 hours, "
        "routine maintenance alerts at 250 and 500 hours, and trade-in upgrade evaluations when a machine reaches 3,000 "
        "operating hours. Dealers receive push reminders to contact customers exactly when their replacement propensity "
        "is highest, multiplying equipment repurchases and long-term customer lifetime value (LTV).",
        body_style
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 7: FEATURE 5: INBOUND LEAD MANAGEMENT & CONVERSION FUNNELS
    # =========================================================================
    story.append(Paragraph("5. Inbound Lead Management, Scoring & Conversion Funnels", section_heading))
    story.append(Paragraph(
        "Never let an interested tractor buyer slip through the cracks. Inbound farmer inquiries from Holatractor's "
        "central marketplace and partner campaigns are routed exclusively to the authorized dealer in that municipality. "
        "Dealers track lead velocities, stage drop-offs, and won revenue through a real-time conversion funnel.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Proportional screenshot (1024x581 -> ratio 1.762 -> 475 x 269.5 pt, exactly proportional)
    img_leads = "public/images/brochure/leads_conversion_analytics.png"
    story.append(make_proportional_image(img_leads, target_width=475))
    story.append(Paragraph("Figure 7.1: Live Conversion Funnel Analytics — 20% conversion benchmark, 11-day sales velocity, and $223k won revenue.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("5-Stage Lead Conversion Milestones & Velocity", sub_heading))
    funnel_data = [
        [Paragraph("Funnel Stage", table_header_style), Paragraph("Conversion Milestone", table_header_style), Paragraph("Drop-off Protection Protocol", table_header_style)],
        [
            Paragraph("<b>Stage 1: Lead Received</b>", table_cell_bold),
            Paragraph("Inquiry captured from web marketplace, WhatsApp, or field demo.", table_cell_style),
            Paragraph("AI Agent immediately validates farmer phone and credit pre-score.", table_cell_style),
        ],
        [
            Paragraph("<b>Stage 2: Engaged & Contacted</b>", table_cell_bold),
            Paragraph("80% benchmark engagement rate; dealer rep dials within 15 minutes.", table_cell_style),
            Paragraph("Automated WhatsApp intro with customized PDF tractor spec sheet.", table_cell_style),
        ],
        [
            Paragraph("<b>Stage 3: Test Drive / Demo</b>", table_cell_bold),
            Paragraph("53.3% progress to physical test drive or on-farm demonstration.", table_cell_style),
            Paragraph("Demo tractor booked with temporary GPS test permit.", table_cell_style),
        ],
        [
            Paragraph("<b>Stage 4: Quotation & Negotiation</b>", table_cell_bold),
            Paragraph("33.3% advance to formal financing or cash purchase quotation.", table_cell_style),
            Paragraph("In-house financial calculator auto-generates payment plans.", table_cell_style),
        ],
        [
            Paragraph("<b>Stage 5: Closed Won & Handover</b>", table_cell_bold),
            Paragraph("20% overall conversion rate; $223,800 won revenue from 7 purchases.", table_cell_style),
            Paragraph("Handover inspection logged via app; warranty telematics starts.", table_cell_style),
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
    # PAGE 8: FEATURE 6: OMNICHANNEL MARKETING CAMPAIGNS
    # =========================================================================
    story.append(Paragraph("6. Omnichannel Marketing Campaigns & Seasonal Promotions", section_heading))
    story.append(Paragraph(
        "Generate predictable seasonal demand for tractors and implements. Holatractor equips dealership teams with "
        "pre-configured multi-channel ad campaigns across Meta (Facebook & Instagram), WhatsApp Broadcasts, Google Local, "
        "and on-ground agronomist field days. Track ad spend against tractor bookings in real time.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Proportional screenshot (1024x581 -> ratio 1.762 -> 475 x 269.5 pt, exactly proportional)
    img_marketing = "public/images/brochure/marketing_campaigns.png"
    story.append(make_proportional_image(img_marketing, target_width=475))
    story.append(Paragraph("Figure 8.1: Dealership Marketing & Ad Campaigns — Campaign budget tracking ($79,750 spent), 227 qualified inquiries, and 297.9% ROI.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Campaign Channels & Turnkey Promotion Templates", sub_heading))
    campaign_data = [
        [Paragraph("Channel / Tactic", table_header_style), Paragraph("Campaign Strategy & Creative Format", table_header_style), Paragraph("Conversion Performance", table_header_style)],
        [
            Paragraph("<b>Meta Ads (FB & IG)</b>", table_cell_bold),
            Paragraph("Targeted tractor carousel ads for soybean, sugarcane, and corn growers within a 150 km radius.", table_cell_style),
            Paragraph("13,150 ad clicks; $3.50 cost per qualified lead", table_cell_style),
        ],
        [
            Paragraph("<b>WhatsApp Broadcasts</b>", table_cell_bold),
            Paragraph("Opt-in seasonal announcements: pre-season discount codes, 0% financing for 12 months.", table_cell_style),
            Paragraph("74% open rate within 2 hours of broadcast", table_cell_style),
        ],
        [
            Paragraph("<b>Winter Rabi Campaigns</b>", table_cell_bold),
            Paragraph("Guaranteed pre-sowing delivery incentives for 45HP-55HP utility tractors with free insurance.", table_cell_style),
            Paragraph("4 active campaigns yielding $1,028k sales revenue", table_cell_style),
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
    # PAGE 9: FEATURES 7 & 8: AI AGENTS & NOTIFICATIONS
    # =========================================================================
    story.append(Paragraph("7. AI Agent Workflows & Autonomous Agronomy Dispatch", section_heading))
    story.append(Paragraph(
        "Holatractor integrates proprietary Agritech AI Agents that operate 24/7 on behalf of your dealership. "
        "These intelligent agents bridge the gap between telematics sensors, farmer WhatsApp inquiries, and workshop mechanics. "
        "When an engine throws a fault code, the AI Agent diagnoses the issue, checks parts availability in your warehouse, "
        "calculates travel time, and suggests a dispatch schedule to your service manager.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Proportional 3D visual (1376x768 -> ratio 1.792 -> 475 x 265.1 pt, exactly proportional)
    img_ai = "public/images/brochure/ai_mechanic_dispatch_3d.jpg"
    story.append(make_proportional_image(img_ai, target_width=475))
    story.append(Paragraph("Figure 9.1: AI Autonomous Workshop & Mechanic Dispatch — Holographic diagnostics scanner, dynamic mechanic dispatch, and telemetry engine analysis.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("8. Real-Time Telematics Notifications & Critical Alarms", section_heading))
    story.append(Paragraph(
        "Every tractor operating with a Holatractor telematics unit broadcasts sub-second telemetry across cellular "
        "and Iridium satellite networks. The notification engine processes over 1,400 sensor frames per second, instantly "
        "categorizing events into a four-level priority matrix.",
        body_style
    ))
    story.append(Spacer(1, 4))

    # Notification Priority Matrix Table
    notif_data = [
        [Paragraph("Alarm Level", table_header_style), Paragraph("Trigger Condition", table_header_style), Paragraph("Delivery Channel", table_header_style), Paragraph("Dealership Action Protocol", table_header_style)],
        [
            Paragraph("<font color='#DC2626'><b>CRITICAL (Red)</b></font>", table_cell_bold),
            Paragraph("Engine overheating (>105°C), hydraulic pressure drop (<12 bar), geofence breach.", table_cell_style),
            Paragraph("Immediate Push Notification + SMS + Audio Alarm + WhatsApp to Dealer Principal.", table_cell_style),
            Paragraph("Dealer can remotely trigger 30-minute shutdown grace period or remote engine lock.", table_cell_style),
        ],
        [
            Paragraph("<font color='#D97706'><b>WARNING (Orange)</b></font>", table_cell_bold),
            Paragraph("Air filter restriction, battery voltage < 11.8V, abnormal idle (>45 min).", table_cell_style),
            Paragraph("Dashboard notification badge + Daily technical digest email.", table_cell_style),
            Paragraph("AI Agent suggests preventative maintenance card to lead mechanic.", table_cell_style),
        ],
        [
            Paragraph("<font color='#2563EB'><b>OPERATIONAL (Blue)</b></font>", table_cell_bold),
            Paragraph("Tractor ignition ON/OFF, field parcel entered/exited, refueled +50L.", table_cell_style),
            Paragraph("Live Fleet Map visual pin update + Event log entry.", table_cell_style),
            Paragraph("Logged in vehicle history ledger for warranty calculation.", table_cell_style),
        ],
        [
            Paragraph("<font color='#059669'><b>COMMERCIAL (Green)</b></font>", table_cell_bold),
            Paragraph("New inbound tractor lease inquiry, seasonal promotion opt-in, parts reorder.", table_cell_style),
            Paragraph("Sales Rep WhatsApp notification + CRM Lead Queue assignment.", table_cell_style),
            Paragraph("Sales representative prompted for phone follow-up within 15 minutes.", table_cell_style),
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
    # PAGE 10: FEATURES 9, 10, 11: PARTS INVENTORY, MAINTENANCE & MECHANICS
    # =========================================================================
    story.append(Paragraph("9. Tractor Parts Inventory & Stock Control", section_heading))
    story.append(Paragraph(
        "Prevent parts stockouts during peak plowing and harvesting seasons. Holatractor's smart inventory engine tracks "
        "fast-moving consumables (oil filters, hydraulic fluid, fan belts, cutting blades) and triggers automated "
        "reorders based on active regional telematics hours. Barcode & QR scanners allow warehouse technicians to check in "
        "deliveries and allocate parts directly to open repair work orders.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Proportional 3D visual (1376x768 -> ratio 1.792 -> 475 x 265.1 pt, exactly proportional)
    img_parts = "public/images/brochure/parts_inventory_api_3d.jpg"
    story.append(make_proportional_image(img_parts, target_width=475))
    story.append(Paragraph("Figure 10.1: Automated Parts Inventory & Cloud ERP Connectivity — RFID / Barcode bin tracking, live restock alerts, and API data exchange.", caption_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("10. Tractor Scheduled Maintenance & Service Tiers", section_heading))
    story.append(Paragraph(
        "Modern Common-Rail Diesel tractor engines require strict adherence to maintenance cycles. Holatractor calculates "
        "exact operating hours directly from the engine ECU, eliminating human reporting errors. Dealerships schedule and "
        "track three standardized service tiers:",
        body_style
    ))
    story.append(Spacer(1, 4))

    # Maintenance Service Tiers Table
    service_data = [
        [Paragraph("Service Interval", table_header_style), Paragraph("Component Inspections & Replacement", table_header_style), Paragraph("Telemetry Automation", table_header_style), Paragraph("Dealer Revenue", table_header_style)],
        [
            Paragraph("<b>Tier 1: 250 Hours</b><br/><font color='#64748B'>Initial Break-In</font>", table_cell_bold),
            Paragraph("Engine oil & filter renewal, primary fuel filter separator drainage, fan belt tension check, front axle pivot greasing.", table_cell_style),
            Paragraph("Telematics alert at 230 hrs; auto-proposes booking date to farmer via WhatsApp.", table_cell_style),
            Paragraph("$180 - $260 USD<br/>(Parts + 2.0h Labor)", table_cell_style),
        ],
        [
            Paragraph("<b>Tier 2: 500 Hours</b><br/><font color='#64748B'>Mid-Season Service</font>", table_cell_bold),
            Paragraph("Full hydraulic filter replacement, transmission oil screen clean, air intake cartridge swap, cooling system pressure test.", table_cell_style),
            Paragraph("ECU fuel efficiency curve comparison against factory baseline.", table_cell_style),
            Paragraph("$390 - $550 USD<br/>(Parts + 4.5h Labor)", table_cell_style),
        ],
        [
            Paragraph("<b>Tier 3: 1,000 Hours</b><br/><font color='#64748B'>Annual Major Overhaul</font>", table_cell_bold),
            Paragraph("Complete fluid flush (hydraulic + differential), fuel injector calibration, turbocharger clearance check, valve lash adjustment.", table_cell_style),
            Paragraph("Full health diagnostic PDF certificate generated for resale valuation.", table_cell_style),
            Paragraph("$850 - $1,250 USD<br/>(Comprehensive Pack)", table_cell_style),
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

    story.append(Paragraph("11. Mechanics & Workshop Bay Management", sub_heading))
    story.append(Paragraph(
        "Manage both in-house workshop technicians and mobile field-service mechanics. Dealerships assign work orders, "
        "monitor mobile truck GPS locations, verify tool certifications, and track actual vs estimated labor hours. "
        "Mechanics use the Holatractor Mobile App to capture photos of worn parts, log customer signatures, and "
        "instantly bill parts to the customer account.",
        body_style
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 11: FEATURE 12: CUSTOM API INTEGRATION & DEVELOPER ARCHITECTURE
    # =========================================================================
    story.append(Paragraph("12. Custom API Integration & Enterprise Developer Connectivity", section_heading))
    story.append(Paragraph(
        "Holatractor is built on open enterprise architecture, allowing large dealership networks and machinery "
        "manufacturers to synchronize with their existing ERP, CRM, and accounting infrastructure without double data entry. "
        "Our high-throughput RESTful API and real-time Webhook infrastructure ensure instant synchronization with SAP, "
        "Oracle NetSuite, Microsoft Dynamics, Salesforce, and regional billing systems.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # API Endpoint Reference Table
    api_data = [
        [Paragraph("Endpoint Route", table_header_style), Paragraph("HTTP", table_header_style), Paragraph("Function & Payload Description", table_header_style), Paragraph("Sync Direction", table_header_style)],
        [
            Paragraph("<code>/v1/dealers/vehicles</code>", table_cell_bold),
            Paragraph("<b>GET / POST</b>", table_cell_style),
            Paragraph("Fetch all active tractors or register new inventory with VIN, BLE tag, and telemetry unit ID.", table_cell_style),
            Paragraph("Bidirectional (ERP <-> Holatractor)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/telematics/live-stream</code>", table_cell_bold),
            Paragraph("<b>WSS / GET</b>", table_cell_style),
            Paragraph("Real-time telemetry stream: GPS coordinates, speed, engine RPM, coolant temp, fuel level.", table_cell_style),
            Paragraph("Outbound (Holatractor -> Dealership)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/vehicles/{id}/immobilize</code>", table_cell_bold),
            Paragraph("<b>POST</b>", table_cell_style),
            Paragraph("Security endpoint to safely trigger engine ignition lock with encrypted cryptographic token.", table_cell_style),
            Paragraph("Inbound (Authorized Dealer Principal)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/customers/crm-sync</code>", table_cell_bold),
            Paragraph("<b>POST / PUT</b>", table_cell_style),
            Paragraph("Synchronize farmer credit limits, tax identifiers, contract statuses, and machinery ownership.", table_cell_style),
            Paragraph("Bidirectional (Salesforce / HubSpot)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/inventory/parts-reorder</code>", table_cell_bold),
            Paragraph("<b>POST</b>", table_cell_style),
            Paragraph("Automated dispatch of spare parts purchase orders to OEM manufacturer when safety stock breached.", table_cell_style),
            Paragraph("Outbound (Holatractor -> OEM Supplier)", table_cell_style),
        ],
        [
            Paragraph("<code>/v1/webhooks/dtc-fault</code>", table_cell_bold),
            Paragraph("<b>EVENT</b>", table_cell_style),
            Paragraph("Immediate webhook trigger when tractor ECU throws critical J1939 fault code with freeze-frame data.", table_cell_style),
            Paragraph("Event Push (JSON Webhook)", table_cell_style),
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

    story.append(Paragraph("Enterprise Developer Integration Specifications", sub_heading))
    dev_spec_data = [
        [Paragraph("Security Protocol", table_cell_bold), Paragraph("OAuth 2.0 with Mutual TLS (mTLS), 256-bit AES encryption at rest and in transit.", table_cell_style)],
        [Paragraph("Rate Limits & Quota", table_cell_bold), Paragraph("10,000 API requests/minute per dealership license, burstable to 25,000 during harvest peaks.", table_cell_style)],
        [Paragraph("Webhook Reliability", table_cell_bold), Paragraph("Automated retries with exponential backoff (24-hour persistence) and HMAC signature verification.", table_cell_style)],
        [Paragraph("SDK Availability", table_cell_bold), Paragraph("Official client libraries in Python, Node.js, Go, Java, and C# (.NET Core).", table_cell_style)],
        [Paragraph("Developer Portal", table_cell_bold), Paragraph("<a href='https://api.holatractor.com/v1/docs' color='#DC2626'>https://api.holatractor.com/v1/docs</a> — Interactive Swagger / OpenAPI 3.1 Specs.", table_cell_style)],
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

    story.append(Paragraph("Dealership White-Labeling & Custom Subdomains", sub_heading))
    story.append(Paragraph(
        "Authorized dealerships can deploy the Holatractor Customer Portal under their own custom domain "
        "(e.g., <code>portal.yourdealership.com</code>) with customized brand colors, dealership logos, and localized "
        "financing terms. Your farming customers enjoy a world-class branded telematics experience while you maintain "
        "complete client relationship ownership.",
        body_style
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 12: OFFICIAL TERMS AND CONDITIONS (T&Cs) & SIGN-OFF BLOCK
    # =========================================================================
    story.append(Paragraph("Official Dealership Partner Terms & Conditions", section_heading))
    story.append(Paragraph(
        "These Terms & Conditions constitute the binding commercial agreement between <b>Holatractor Srl / Inc.</b> "
        "('Holatractor') and the Authorized Dealership Partner ('Dealer'). Acceptance or signature indicates full "
        "compliance with our commercial, operational, and data governance standards.",
        body_style
    ))
    story.append(Spacer(1, 3))

    # All 6 Articles of Terms & Conditions
    story.append(Paragraph("Article 1: Territorial Exclusivity & Dealership Scope", tc_article_heading))
    story.append(Paragraph(
        "1.1. Holatractor grants the Dealer a non-exclusive (or protected regional exclusive upon meeting Tier-1 volume quotas) "
        "right to retail, lease, service, and monitor agricultural machinery equipped with Holatractor telematics units within "
        "their designated administrative territory.<br/>"
        "1.2. The Dealer agrees to maintain active showroom inventory, designated trained service technicians, and an authorized "
        "parts warehouse compliant with Holatractor Dealership Quality Standards.<br/>"
        "1.3. Inbound farmer inquiries and marketplace leads originating within the Dealer's designated postal codes or municipal "
        "boundaries will be routed exclusively to the Dealer's lead queue.",
        tc_clause_text
    ))

    story.append(Paragraph("Article 2: Commercial Margins, Commission Schedules & Revenue Split", tc_article_heading))
    story.append(Paragraph(
        "2.1. <b>Hardware & Telematics Margins:</b> The Dealer is entitled to a 38% gross wholesale margin on all proprietary Holatractor "
        "telematics control units, IoT gateways, and BLE asset beacons retailed.<br/>"
        "2.2. <b>Recurring SaaS Commissions:</b> The Dealer receives an ongoing 20% recurring annual commission on all active software and "
        "satellite connectivity subscriptions renewed by customers originally onboarded by the Dealer.<br/>"
        "2.3. <b>Financing & Lease Referral Bonus:</b> On tractors leased through Holatractor Financial Services, the Dealer earns a 2.5% "
        "origination fee calculated on total financed machinery principal, paid within 14 calendar days of lease signing.",
        tc_clause_text
    ))

    story.append(Paragraph("Article 3: Telematics Hardware, Installation & Service Level Agreements (SLAs)", tc_article_heading))
    story.append(Paragraph(
        "3.1. Telematics devices must be installed by Holatractor-certified technicians in strict accordance with OEM wiring harnesses. "
        "Improper CAN-bus tapping causing vehicle malfunction remains the liability of the installing workshop.<br/>"
        "3.2. Holatractor guarantees a 99.9% platform availability and satellite telemetry uptime SLA, excluding scheduled maintenance "
        "announced with at least 48 hours advance notice.<br/>"
        "3.3. Remote engine immobilization commands are protected by multi-factor cryptographic authentication and must comply with "
        "applicable regional safety protocols (e.g., machinery must be stationary or decelerated safely before ignition cut).",
        tc_clause_text
    ))

    story.append(Paragraph("Article 4: Data Privacy, Machinery Ownership & Agronomic Security", tc_article_heading))
    story.append(Paragraph(
        "4.1. All machine agronomic telemetry (yield data, soil moisture readings, field boundary coordinates) remains the exclusive "
        "property of the farmer machinery owner. The Dealer and Holatractor are granted a limited license to process telemetry "
        "solely for diagnostic, maintenance, anti-theft, and warranty compliance purposes.<br/>"
        "4.2. Holatractor agrees never to commercialize, sell, or disclose proprietary dealership client rosters or pricing lists "
        "to competing dealerships or third-party brokers without explicit written consent.",
        tc_clause_text
    ))

    story.append(Paragraph("Article 5: Escrow Clearing, Invoicing & Settlement Cycles", tc_article_heading))
    story.append(Paragraph(
        "5.1. Customer online bookings, deposit escrows, and lease down-payments collected through the Holatractor platform are held "
        "in a segregated banking escrow account and disbursed to the Dealer on a bi-weekly cycle (1st and 15th of each month).<br/>"
        "5.2. Settlements are issued in official currency (Bolivianos - BOB or United States Dollars - USD) via direct electronic transfer.",
        tc_clause_text
    ))

    story.append(Paragraph("Article 6: Term, Performance Audits & Termination", tc_article_heading))
    story.append(Paragraph(
        "6.1. This agreement remains in effect for an initial period of 24 months, automatically renewing for successive 12-month periods "
        "unless either party provides 60 days advance written notice of non-renewal.<br/>"
        "6.2. Holatractor reserves the right to suspend platform access if customer satisfaction ratings fall below 3.8/5.0 stars or "
        "unremedied warranty breaches persist beyond 30 calendar days.",
        tc_clause_text
    ))
    story.append(Spacer(1, 6))

    # Dealership Authorization Sign-Off Block
    sig_data = [
        [
            Paragraph("<b>FOR HOLATRACTOR SRL / INC.</b><br/><br/>"
                      "Authorized Officer: __________________________<br/>"
                      "Title: VP of Global Dealership Operations<br/>"
                      "Date: ________________________ [Seal]", table_cell_style),
            Paragraph("<b>FOR AUTHORIZED DEALERSHIP PARTNER</b><br/><br/>"
                      "Dealership Name: ____________________________<br/>"
                      "Principal Signature: _________________________<br/>"
                      "Date: ________________________ [Stamp]", table_cell_style)
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

    # Build Document with NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Brochure successfully generated at: {output_path}")


if __name__ == "__main__":
    build_brochure_pdf()
