"use client";

import React, { useState, useEffect, useRef } from "react";
import { Radio, Wrench, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const iconMap = [Radio, Wrench, Clock, ShieldCheck];
const badgeColorMap = [
  "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "bg-red-500/20 text-red-400 border-red-500/30",
  "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "bg-red-500/20 text-rose-300 border-red-500/30",
];

export default function StatsSection() {
  const { t } = useLanguage();
  const headlineWords = t.stats.headlineWords;
  const stats = t.stats.cards.map((card, idx) => ({
    ...card,
    icon: iconMap[idx] || Radio,
    badgeColor: badgeColorMap[idx] || "bg-red-500/20 text-red-400 border-red-500/30",
  }));

  const [scrollProgress, setScrollProgress] = useState(0);
  const [cardsInView, setCardsInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 88]);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Text scroll-scrub illumination calculation (matching Holatractor Partner SplitType + GSAP scrub)
      if (headlineRef.current) {
        const rect = headlineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Start illuminating when top enters at 85% of viewport, finish by 35%
        const start = windowHeight * 0.85;
        const end = windowHeight * 0.35;
        const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
        setScrollProgress(progress);
      }

      // 2. Cards entrance trigger
      if (cardsRef.current) {
        const rect = cardsRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.88) {
          setCardsInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth number count-up when cards enter viewport
  useEffect(() => {
    if (!cardsInView) return;

    const startTime = performance.now();
    const duration = 1600; // ms

    const animateNumbers = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentValues = stats.map((stat) => {
        const start = stat.startNumber ?? 0;
        return start + (stat.targetNumber - start) * easeProgress;
      });

      setAnimatedValues(currentValues);

      if (progress < 1) {
        requestAnimationFrame(animateNumbers);
      }
    };

    const animFrame = requestAnimationFrame(animateNumbers);
    return () => cancelAnimationFrame(animFrame);
  }, [cardsInView, t]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="relative py-28 sm:py-36 bg-transparent text-white overflow-hidden border-t border-white/5">
      {/* Background glow lines & ambient red backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-950/20 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Headline with Holatractor Partner Scroll-Driven Word Illumination */}
        <div className="max-w-4xl mb-20 sm:mb-24">
          <h2
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.18] select-none"
          >
            {headlineWords.map((word, i) => {
              // Word illumination threshold based on its position in the sentence
              const wordStart = i / headlineWords.length;
              const wordEnd = (i + 1.2) / headlineWords.length;
              const wordActiveProgress = Math.min(
                Math.max((scrollProgress - wordStart) / (wordEnd - wordStart), 0),
                1
              );

              // Smoothly transition from dim 0.18 to fully illuminated 1
              const opacity = 0.18 + wordActiveProgress * 0.82;
              const translateY = (1 - wordActiveProgress) * 7;
              const blur = (1 - wordActiveProgress) * 3;

              return (
                <span
                  key={i}
                  style={{
                    opacity,
                    transform: `translate3d(0, ${translateY}px, 0)`,
                    filter: blur > 0.3 ? `blur(${blur}px)` : "none",
                  }}
                  className={`inline-block mr-[0.28em] will-change-transform transition-all duration-150 ease-out ${
                    word.highlight
                      ? "bg-gradient-to-r from-red-500 via-rose-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.35)]"
                      : "text-white"
                  }`}
                >
                  {word.text}
                </span>
              );
            })}
          </h2>
        </div>

        {/* 4 Spotlight Metric Cards with Holatractor Partner Staggered Scroll Animation */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const formattedValue = animatedValues[idx]
              ? animatedValues[idx].toFixed(stat.decimals)
              : (stat.startNumber ?? 0).toFixed(stat.decimals);

            return (
              <div
                key={stat.id}
                onMouseMove={handleMouseMove}
                style={{
                  transitionDelay: `${idx * 130}ms`,
                }}
                className={`spotlight-card p-6 sm:p-8 rounded-[24px] sm:rounded-3xl flex flex-col justify-between min-h-[280px] sm:min-h-[300px] group cursor-pointer transition-all duration-700 ease-out ${
                  cardsInView
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-16 scale-95 pointer-events-none"
                } hover:-translate-y-2 hover:border-red-500/40`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <span
                      className={`text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full border ${stat.badgeColor}`}
                    >
                      {stat.badge}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-red-500/10 group-hover:border-red-500/30 group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Animated Metric Number */}
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3 sm:mb-4 group-hover:text-red-400 transition-colors font-mono">
                    {stat.prefix}
                    {formattedValue}
                    {stat.suffix}
                  </div>

                  <p className="text-sm font-medium text-gray-300 leading-snug mb-3">
                    {stat.label}
                  </p>
                </div>

                <div className="text-xs text-gray-500 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span>{stat.subtext}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

