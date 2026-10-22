"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, Radio, Store, Download, ShieldCheck, Activity, MapPin, Gauge, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HeroProps {
  onOpenBookCall: () => void;
}

export default function Hero({ onOpenBookCall }: HeroProps) {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the hero section
      const scrolled = -rect.top;
      // Start zoom after hero text is scrolled (~100px), reach full window smoothly
      const zoomStart = 80;
      const zoomEnd = heroHeight - windowHeight - 150;
      
      const scrollFraction = Math.min(Math.max((scrolled - zoomStart) / Math.max(zoomEnd - zoomStart, 1), 0), 1);
      setScrollProgress(scrollFraction);

      // Trigger video play on scroll
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    };

    // Initial check to ensure video plays
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Holatractor Partner exact showreel scaling: starts at 50vw and smoothly expands to cover full window (100vw x 100vh)
  const videoWidth = 48 + scrollProgress * 52; // 48vw -> 100vw
  const videoHeight = 56 + scrollProgress * 44; // 56vh -> 100vh
  const borderRadius = Math.max(1.7 - scrollProgress * 1.7, 0); // 1.7vw -> 0vw
  const stickyTop = Math.max(0, (1 - scrollProgress * 1.3) * 80); // 80px -> 0px
  const videoScale = 1 + scrollProgress * 0.15;

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
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
    <section
      ref={heroRef}
      className="relative min-h-[250vh] pt-36 pb-0 overflow-x-clip flex flex-col items-center bg-[#080808]"
    >
      {/* Holatractor Partner Signature Hero Background Studio Lighting */}
      <div className="hero-studio-lighting" />

      {/* Atmospheric Luminous Studio Beam Pulses with Rich Red Ambient Combination */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-gradient-to-b from-white/[0.22] via-rose-500/[0.14] to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-36 left-1/2 -translate-x-1/2 w-[750px] h-[520px] bg-red-600/[0.18] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-80 left-8 w-[460px] h-[460px] bg-rose-500/[0.10] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-72 right-8 w-[480px] h-[480px] bg-red-500/[0.10] blur-[150px] pointer-events-none rounded-full" />

      {/* Floating Parallax Agricultural Badges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 hidden md:block">
        <div className="absolute top-36 left-[8%] flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-md shadow-2xl animate-bounce [animation-duration:6s]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs font-semibold text-white">{t.hero.badges.telematicsActive}</span>
        </div>

        <div className="absolute top-52 right-[8%] flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-md shadow-2xl animate-bounce [animation-duration:7s]">
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-semibold text-white">{t.hero.badges.geofenceOn}</span>
        </div>

        <div className="absolute top-[520px] left-[5%] flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/10 text-xs text-gray-300">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.hero.badges.predictiveService}</span>
        </div>

        <div className="absolute top-[560px] right-[6%] flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/10 text-xs text-gray-300">
          <Store className="w-3.5 h-3.5 text-rose-400" />
          <span>{t.hero.badges.automatedLeads}</span>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-20 flex flex-col items-center text-center">
        {/* Holatractor Partner Hero Tag with Illuminated Aura */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="stats-card-gradient hero-home" />
          <div className="hero-tag-badge relative z-10 inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 shadow-lg animate-in fade-in duration-700">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs tracking-wider uppercase font-semibold text-gray-200">
              {t.hero.tagBadge}
            </span>
          </div>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8">
          {t.hero.headlinePart1}
          <span className="bg-gradient-to-r from-red-500 via-rose-300 to-white bg-clip-text text-transparent">
            {t.hero.headlineHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal px-2">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none px-4 sm:px-0">
          <button
            onClick={onOpenBookCall}
            onMouseMove={handleButtonMouseMove}
            className="explode-btn relative w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white shadow-2xl hover:shadow-red-500/35 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <div className="explode-glow" />
            <Store className="w-4 h-4 text-white relative z-10" />
            <span className="relative z-10">{t.hero.joinDealer}</span>
          </button>

          <button
            onClick={onOpenBookCall}
            onMouseMove={handleButtonMouseMove}
            className="explode-btn relative w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm bg-white text-black shadow-2xl hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <div className="explode-glow" />
            <Download className="w-4 h-4 text-rose-600 relative z-10" />
            <span className="relative z-10">{t.hero.downloadBrochure}</span>
          </button>

          <a
            href="#dealers"
            onMouseMove={handleButtonMouseMove}
            className="explode-btn relative w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full font-medium text-xs sm:text-sm bg-[#161616] text-white border border-white/15 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <div className="explode-glow" />
            <span className="relative z-10">{t.hero.exploreFeatures}</span>
            <ArrowDown className="w-4 h-4 text-gray-400 relative z-10" />
          </a>
        </div>

        {/* Key Operational Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-6 w-full max-w-4xl mb-12 text-left">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-extrabold text-white">{t.hero.stats.tractorsCount}</div>
            <div className="text-xs text-gray-400 mt-0.5">{t.hero.stats.tractorsLabel}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-extrabold text-red-500">{t.hero.stats.revenueBoost}</div>
            <div className="text-xs text-gray-400 mt-0.5">{t.hero.stats.revenueLabel}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-extrabold text-red-400">{t.hero.stats.gpsSafety}</div>
            <div className="text-xs text-gray-400 mt-0.5">{t.hero.stats.gpsLabel}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-extrabold text-amber-400">{t.hero.stats.zeroDowntime}</div>
            <div className="text-xs text-gray-400 mt-0.5">{t.hero.stats.zeroLabel}</div>
          </div>
        </div>
      </div>

      {/* Dynamic Expanding Showreel Frame with Holatractor Partner Studio Lighting Halo */}
      <div
        className="w-screen flex justify-center sticky z-20 transition-all duration-100 ease-out"
        style={{
          top: `${stickyTop}px`,
        }}
      >
        <div className="relative flex justify-center w-full items-center">
          {/* Holatractor Partner Signature Hero Halo Light emanating from behind video */}
          <div
            style={{
              width: `${Math.min(videoWidth * 1.4, 150)}vw`,
              opacity: (1 - scrollProgress) * 0.85,
            }}
            className="stats-card-gradient hero-gradient transition-all duration-150 pointer-events-none"
          />

          {/* Showreel Container: Zooms and scales on scroll like Holatractor Partner */}
          <div
            style={{
              width: `${videoWidth}vw`,
              height: `${videoHeight}vh`,
              borderRadius: `${borderRadius}vw`,
              transition: "width 0.1s linear, height 0.1s linear, border-radius 0.1s linear",
            }}
            className={`group relative z-10 overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] bg-black will-change-transform ${
              scrollProgress > 0.95 ? "border-0 shadow-none" : "border border-white/15"
            }`}
          >
            {/* 4K Looping Video with Holatractor Partner inner scale zoom on scroll */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              style={{
                transform: `scale(${videoScale})`,
                transition: "transform 0.1s linear",
              }}
              className="w-full h-full object-cover will-change-transform"
              src="https://holadashboard.s3.us-west-2.amazonaws.com/gemini_generated_video_117d6fdd.mp4"
            />

            {/* Subtle Mute / Unmute Sound Toggle (hover only, zero clutter) */}
            <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
                aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-gray-300" /> : <Volume2 className="w-4 h-4 text-red-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
