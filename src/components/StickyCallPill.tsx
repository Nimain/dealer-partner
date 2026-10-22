"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneCall, ArrowUpRight } from "lucide-react";

interface StickyCallPillProps {
  onOpenBookCall: () => void;
}

export default function StickyCallPill({ onOpenBookCall }: StickyCallPillProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:block animate-in fade-in slide-in-from-bottom-6 duration-700">
      <button
        onClick={onOpenBookCall}
        className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-[#181818]/90 hover:bg-[#202020] text-white border border-white/15 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:border-red-500/50 cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="text-xs font-bold tracking-wide">{t.nav.bookCall}</span>
        <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-red-600 flex items-center justify-center transition-colors">
          <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </button>
    </div>
  );
}
