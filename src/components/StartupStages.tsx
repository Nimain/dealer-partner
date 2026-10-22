"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  Navigation,
  CalendarCheck,
  Users,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

interface OwnerModule {
  id: string;
  moduleName: string;
  tag: string;
  description: string;
  statHighlight?: string;
  statNote?: string;
  icon: React.ElementType;
  imageUrl: string;
  previewTag: string;
}

const ownerModules: OwnerModule[] = [
  {
    id: "assets",
    moduleName: "Asset Registry & Health Scorecard",
    tag: "Digital Garage & Machinery Health",
    description:
      "Centralized registry for your tractors, harvesters, and implements. Track live engine health, battery voltage, coolant levels, and get predictive 250-hour service reminders.",
    statHighlight: "-45%",
    statNote: "reduction in catastrophic engine & workshop breakdowns.",
    icon: ShieldCheck,
    imageUrl: "/images/owner/owner-asset-dashboard.jpg",
    previewTag: "Live Machinery Telemetry",
  },
  {
    id: "tracking",
    moduleName: "Real-Time GPS & Anti-Theft Telematics",
    tag: "Live Tracking & Fuel Security",
    description:
      "24/7 live satellite positioning with route playback, smart geofencing perimeter alerts, ultrasonic fuel anti-siphon monitoring, and one-tap remote ignition lock.",
    statHighlight: "100%",
    statNote: "visibility over remote field operations & financed machinery.",
    icon: Navigation,
    imageUrl: "/images/owner/owner-tracking-dashboard.jpg",
    previewTag: "Satellite Farm Radar",
  },
  {
    id: "rentals",
    moduleName: "Idle Tractor Booking & Monetization",
    tag: "Peer-to-Peer Rental Marketplace",
    description:
      "Monetize machine downtime. Broadcast your idle tractor to neighboring farmers, review incoming job requests with acreage and distance, and get guaranteed escrow payouts.",
    icon: CalendarCheck,
    imageUrl: "/images/owner/owner-booking-dashboard.jpg",
    previewTag: "Peer-to-Peer Booking Hub",
  },
  {
    id: "operators",
    moduleName: "Operator & Driver Crew Management",
    tag: "Workforce & Machine Safety Scores",
    description:
      "Digital operator check-in, real-time driving behavior scores, and automated per-acre or hourly wage calculations.",
    statHighlight: "+28%",
    statNote: "higher operator productivity with fewer machine repairs.",
    icon: Users,
    imageUrl: "/images/owner/owner-operators-dashboard.jpg",
    previewTag: "Driver Shift & Safety Ledger",
  },
  {
    id: "field-jobs",
    moduleName: "Field Jobs & Acreage Dispatch",
    tag: "GPS Acreage Meter & WhatsApp Billing",
    description:
      "Schedule plowing, seeding, and spraying jobs. Automatically calculate exact tilled acreage down to square meters using GPS telemetry and send instant WhatsApp invoices.",
    statHighlight: "Zero",
    statNote: "billing disputes with farmers through GPS-verified work logs.",
    icon: MapPin,
    imageUrl: "/images/owner/owner-fieldjobs-dashboard.jpg",
    previewTag: "Acreage Dispatch & Invoicing",
  },
];

export default function StartupStages() {
  const { t } = useLanguage();
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  const moduleIcons = [ShieldCheck, Navigation, CalendarCheck, Users, MapPin];
  const modules = t.owners.modules;

  return (
    <section id="stages" className="relative py-16 sm:py-32 bg-gradient-to-b from-[#FAFAFC] via-[#F4F4F8] to-[#EAEAEF] text-[#111111] overflow-hidden border-y border-gray-200/80">
      {/* Subtle background ambient warmth */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/[0.03] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-rose-500/[0.02] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight mb-4">
            {t.owners.sectionTitlePre}
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              {t.owners.sectionTitleHighlight}
            </span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
            {t.owners.sectionSubtitle}
          </p>
        </div>

        {/* 2-Column Interactive Section: Left Module Selector, Right 3D Real Dashboard Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Module Selector Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-3.5">
            {modules.map((module, idx) => {
              const isActive = activeModuleIndex === idx;
              const Icon = moduleIcons[idx] || ShieldCheck;

              return (
                <div
                  key={module.id}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 border relative ${
                    isActive
                      ? "bg-white border-2 border-red-500 shadow-[0_12px_32px_rgba(239,68,68,0.12)] -translate-y-0.5"
                      : "bg-white/80 hover:bg-white border-gray-200/90 hover:border-gray-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                          isActive
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-gray-100 text-gray-700 border border-gray-200/80"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base sm:text-xl font-bold text-[#111111] leading-snug">
                        {module.moduleName}
                      </h3>
                    </div>
                    {isActive && (
                      <span className="flex h-2 w-2 relative flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    {module.description}
                  </p>

                  {/* Impact Highlight */}
                  {module.statHighlight && (
                    <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border ${
                      isActive
                        ? "bg-red-50/70 border-red-200 text-gray-800"
                        : "bg-gray-50 border-gray-200/80 text-gray-600"
                    }`}>
                      <span className="font-bold text-red-600 text-sm">
                        {module.statHighlight}
                      </span>
                      <span className="text-[11px] text-gray-500">{module.statNote}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D-feeling Real Dashboard Deck */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full overflow-hidden sm:overflow-visible">
            {/* Subtle radial ambient warmth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/[0.06] blur-[140px] pointer-events-none rounded-full" />

            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-xl mx-auto">
              {modules.map((module, idx) => {
                const isActive = activeModuleIndex === idx;
                const offset = (idx - activeModuleIndex + modules.length) % modules.length;

                let transformStyle = "";
                let zIndex = 10;
                let opacity = 0.35;

                if (offset === 0) {
                  transformStyle = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
                  zIndex = 30;
                  opacity = 1;
                } else if (offset === 1) {
                  transformStyle = "translate3d(min(20px, 4vw), -12px, 0) scale(0.94) rotate(2.5deg)";
                  zIndex = 20;
                  opacity = 0.65;
                } else if (offset === 2) {
                  transformStyle = "translate3d(min(36px, 7vw), -24px, 0) scale(0.88) rotate(5deg)";
                  zIndex = 10;
                  opacity = 0.4;
                } else {
                  transformStyle = "translate3d(min(48px, 9vw), -32px, 0) scale(0.82) rotate(7deg)";
                  zIndex = 5;
                  opacity = 0;
                }

                return (
                  <div
                    key={module.id}
                    onClick={() => setActiveModuleIndex(idx)}
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity,
                    }}
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-300/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out cursor-pointer group"
                  >
                    <img
                      src={module.imageUrl}
                      alt={module.moduleName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay info badge on active card */}
                    {isActive && (
                      <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl flex items-center justify-between">
                        <div>
                          <div className="text-[10px] sm:text-xs uppercase font-mono text-red-600 font-bold">
                            {module.previewTag}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-[#111111] line-clamp-1">
                            {module.moduleName}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white bg-red-600 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md shadow-red-600/30 flex-shrink-0">
                          <span>Live Screen</span>
                          <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-2 mt-8">
              {modules.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeModuleIndex === idx ? "w-8 bg-red-600" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to module ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
