"use client";

import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Store,
  Wrench,
  Radio,
  Megaphone,
  ArrowUpRight,
  Sparkles,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DealersSectionProps {
  onOpenDealerModal: () => void;
}

// 4 Clean, Ultra-Premium 3D Pillars (AICM / Dribbble Inspired)
const whyJoinPillars = [
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
];

// Interactive 3D Tilt Card Component
function Tilt3DCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)"
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) translateY(-8px)`
    );
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovered
          ? "transform 0.1s ease-out, border-color 0.3s ease"
          : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease",
      }}
      className={`spotlight-card preserve-3d will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

const dealerFeatures = [
  {
    id: "inventory",
    title: "Store & Inventory Hub",
    icon: Store,
    description:
      "Showcase your in-stock tractors, harvesters, rotavators, and implements with high-definition specs. Synchronize real-time inventory and pricing across thousands of verified farmers in your district to accelerate unit turnarounds.",
    previewType: "video",
  },
  {
    id: "ai-agent",
    title: "Autonomous AI Agent Workflow",
    icon: Cpu,
    description:
      "Self-operating AI workflow agent that autonomously qualifies inbound farmer WhatsApp inquiries, checks showroom inventory in real time, validates credit eligibility, and schedules certified mechanic visits 24/7 without manual delays.",
    previewType: "ai-agent",
  },
  {
    id: "repair",
    title: "Repair & Service Dispatch",
    icon: Wrench,
    description:
      "Convert breakdown emergencies into high-margin recurring workshop revenue. Monitor diagnostic trouble codes (DTC) in real time, automate preventative maintenance schedules, and route field service mechanics directly to farm coordinates.",
    previewType: "visual",
  },
  {
    id: "telemetry",
    title: "IoT Fleet & Telematics",
    icon: Radio,
    description:
      "Full-spectrum telematics tracking engine running hours, fuel burn rate, PTO activity, and battery status. Automated geofence boundaries protect funded or leased machinery against unauthorized movement or cross-border theft.",
    previewType: "terminal",
  },
  {
    id: "marketing",
    title: "Targeted Agri-Marketing",
    icon: Megaphone,
    description:
      "Launch localized WhatsApp and SMS promotional broadcasts synchronized with regional crop planting and harvest cycles. Push seasonal implement packages, disc harrow discounts, and post-harvest service specials with verified ROI.",
    previewType: "deliverables",
  },
];

export default function DealersSection({ onOpenDealerModal }: DealersSectionProps) {
  const { t } = useLanguage();
  const dashboardContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const featureIcons = [Store, Cpu, Wrench, Radio, Megaphone];
  const featurePreviewTypes = ["video", "ai-agent", "visual", "terminal", "deliverables"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDashboardVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const target = dashboardContainerRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  const checkScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  const handleSliderScroll = () => {
    checkScrollState();
  };

  const scrollPrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -420, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: 420, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleDashboardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dashboardContainerRef.current) return;
    const cards = dashboardContainerRef.current.querySelectorAll<HTMLElement>(".service-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <section id="dealers" className="relative pt-16 sm:pt-32 pb-0 bg-transparent text-white overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-red-900/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-rose-900/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/[0.03] blur-[200px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-16 sm:mb-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="hero-tag-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-red-400 mb-4 border border-white/10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.dealers.sectionTag}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t.dealers.titleMain}{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-300 to-white bg-clip-text text-transparent">
                {t.dealers.titleHighlight}
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
            {t.dealers.subtitle}
          </p>
        </div>

        {/* 4 CLEAN 3D CARDS WITH TRANSPARENT ICONS & MINIMALIST CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.dealers.pillars.map((pillar) => (
            <Tilt3DCard
              key={pillar.number}
              className="p-7 sm:p-8 rounded-[28px] bg-gradient-to-b from-[#141414] via-[#101010] to-[#0c0c0c] border border-white/10 hover:border-red-500/40 flex flex-col justify-between group shadow-2xl relative overflow-hidden transition-all duration-300"
            >
              {/* Subtle ambient red background highlight */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] pointer-events-none group-hover:bg-red-600/20 transition-all duration-500" />

              <div>
                {/* 3D FLOATING ICON (Transparent background, no box) */}
                <div className="relative w-full h-48 sm:h-52 flex items-center justify-center my-2 group/icon">
                  {/* Soft Radial Ambient Spotlight Behind the 3D Icon */}
                  <div className="absolute w-32 h-32 rounded-full bg-red-600/15 blur-2xl pointer-events-none group-hover:bg-red-600/25 transition-all duration-500" />

                  {/* Floating 3D PNG Icon with Transparent Background */}
                  <div className={`relative z-10 w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center ${pillar.animation}`}>
                    <img
                      src={pillar.image}
                      alt={pillar.alt}
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(239,68,68,0.25)] transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-red-300 transition-colors leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  {pillar.desc}
                </p>
              </div>

              {/* Bottom Stat & Action */}
              <div className="pt-4 border-t border-white/5 flex items-end justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-red-400 transition-colors">
                    {pillar.stat}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                    {pillar.statLabel}
                  </div>
                </div>
                <button
                  onClick={onOpenDealerModal}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:border-red-500/40 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center text-gray-400 transition-all cursor-pointer flex-shrink-0 ml-3"
                  aria-label="Learn more"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>

      {/* Next-Gen Dealer Dashboard Features - Integrated Seamless Gradient Theme */}
      <div
        ref={dashboardContainerRef}
        onMouseMove={handleDashboardMouseMove}
        className="relative py-16 sm:py-28 bg-transparent text-white border-t border-white/5 overflow-hidden"
      >
        {/* Subtle radial ambient warmth */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/[0.04] blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-rose-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header & Slider Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t.dealers.featuresHeading}
              </h2>
            </div>

            {/* Prev / Next Slider Navigation Buttons */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
              <button
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all flex items-center justify-center shadow-sm disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous features"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollRight}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all flex items-center justify-center shadow-sm disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next features"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Philosophy Callout */}
          <div className="mb-10 sm:mb-12 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-xl flex items-start gap-4 sm:gap-5">
            <div className="w-1.5 h-14 sm:h-16 rounded-full bg-gradient-to-b from-red-500 to-rose-600 flex-shrink-0" />
            <p className="text-gray-300 text-xs sm:text-base leading-relaxed italic max-w-4xl font-serif">
              “{t.dealers.quote.text1}
              <span className="text-white font-semibold">{t.dealers.quote.highlight1}</span>
              {t.dealers.quote.text2}
              <span className="text-red-400 font-semibold">{t.dealers.quote.highlight2}</span>
              {t.dealers.quote.text3}”
            </p>
          </div>

          {/* Progress Indicator Bar */}
          <div className="flex justify-end mb-6 px-1">
            <div className="w-40 sm:w-56 h-1.5 rounded-full bg-white/10 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(16, scrollProgress)}%` }}
              />
            </div>
          </div>

          {/* Interactive Horizontal Slider Strip */}
          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1 cursor-grab active:cursor-grabbing select-none"
          >
            {t.dealers.features.map((feature, idx) => {
              const Icon = featureIcons[idx] || Store;
              const previewType = featurePreviewTypes[idx] || "video";

              return (
                <div
                  key={feature.id}
                  style={{
                    transitionDelay: isDashboardVisible ? `${idx * 110}ms` : "0ms",
                  }}
                  className={`swiper-slide service-card snap-start flex-shrink-0 w-[82vw] max-w-[340px] sm:w-[370px] lg:w-[410px] p-6 sm:p-8 flex flex-col justify-between min-h-[420px] sm:min-h-[440px] group transition-all duration-700 ease-out hover:-translate-y-2 rounded-2xl sm:rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-2xl hover:border-red-500/40 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] relative overflow-hidden ${
                    isDashboardVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-10 scale-[0.98]"
                  }`}
                >
                  {/* Subtle red cursor spotlight */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(239, 68, 68, 0.12), transparent 60%)",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                        {feature.title}
                      </h3>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300 shadow-sm flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <p className="text-[15px] sm:text-base text-gray-300 leading-relaxed mb-6 font-normal">
                      {feature.description}
                    </p>
                  </div>

                  {/* Interactive Preview element tailored to service / Holatractor Partner style */}
                  <div className="relative z-10 mt-auto pt-4 border-t border-white/10">
                    {previewType === "video" ? (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center shadow-inner">
                        <video
                          playsInline
                          autoPlay
                          loop
                          muted
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          src="https://dl.dropboxusercontent.com/scl/fi/jy5cqifucxea6mo5tx2id/taxi-app-main-v2_XdXjXRKv.mp4?rlkey=7ibn8inbyq804uxjjmhhml5q4&st=tlh7klec&dl=0"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[10px] text-gray-200">
                          Live UX Prototype
                        </div>
                      </div>
                    ) : previewType === "ai-agent" ? (
                      <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-gray-300 shadow-sm">
                        <div className="text-emerald-400 flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-semibold text-[10px] uppercase tracking-wider">AI Agent Workflow Active</span>
                          </div>
                          <span className="text-[10px] text-gray-400">Autonomous</span>
                        </div>
                        <div className="text-red-400 text-[10px] truncate">$ agent.dispatch("Inquiry #F-892")</div>
                        <div className="text-gray-300 text-[10px] mt-1 flex items-center gap-1.5">
                          <span className="text-emerald-400">✓</span> Auto-qualified • WhatsApp reply sent
                        </div>
                      </div>
                    ) : previewType === "visual" ? (
                      <div className="grid grid-cols-4 gap-2">
                        {["#DC2626", "#EA580C", "#F59E0B", "#EF4444"].map((color, i) => (
                          <div
                            key={i}
                            style={{ backgroundColor: color }}
                            className="h-8 rounded-lg opacity-85 group-hover:opacity-100 transition-all hover:scale-105 shadow-sm"
                          />
                        ))}
                      </div>
                    ) : previewType === "terminal" ? (
                      <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-gray-300 shadow-sm">
                        <div className="text-emerald-400 flex items-center gap-1.5 mb-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Ready for Production</span>
                        </div>
                        <div className="text-red-400">$ npm run deploy:scale</div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-gray-300 group-hover:text-white transition-colors">
                        <span className="font-semibold">Discover deliverables</span>
                        <ArrowUpRight className="w-4 h-4 text-red-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
