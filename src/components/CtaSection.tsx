"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, PhoneCall, Mail, Sparkles } from "lucide-react";

interface CtaSectionProps {
  onOpenBookCall: () => void;
}

export default function CtaSection({ onOpenBookCall }: CtaSectionProps) {
  const { t, language } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const target = e.currentTarget;
    const glow = target.querySelector(".explode-glow") as HTMLElement | null;
    if (glow) {
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-28 bg-transparent text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-14 bg-gradient-to-br from-[#181818] via-[#121212] to-[#0d0d0d] border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Ambient Inner Glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-red-600/25 via-rose-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />

          {/* Left Text & CTA Buttons */}
          <div className="lg:w-1/2 relative z-10 w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-red-400 mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.cta.tagBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">
              {t.cta.heading}
            </h2>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
              {t.cta.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href={`/api/download-brochure?lang=${language}`}
                download={`holatractor-dealer-brochure-${language}.pdf`}
                onMouseMove={handleMouseMove}
                className="explode-btn relative px-7 py-3.5 rounded-full font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto text-center"
              >
                <div className="explode-glow bg-radial from-white/40 to-transparent" />
                <Mail className="w-4 h-4" />
                <span className="relative z-10">{t.cta.brochureBtn}</span>
              </a>

              <button
                onClick={onOpenBookCall}
                onMouseMove={handleMouseMove}
                className="explode-btn relative px-7 py-3.5 rounded-full font-bold text-xs bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg hover:shadow-red-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <div className="explode-glow" />
                <PhoneCall className="w-4 h-4" />
                <span className="relative z-10">{t.cta.applyBtn}</span>
              </button>
            </div>
          </div>

          {/* Right Graphical Dashboard Mockup */}
          <div className="lg:w-1/2 flex items-center justify-center relative z-10 w-full">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden p-4 bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl group hover:border-red-500/40 transition-colors">
              <img
                src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66bf047f8e12e9868e4c8f45_dashboard-cta.svg"
                alt="Product Dashboard Preview"
                className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
