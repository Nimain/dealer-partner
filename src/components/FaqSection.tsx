"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Plus, HelpCircle, Store, Wrench, Cpu, Layers } from "lucide-react";

export default function FaqSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>("dealer-leads");

  const categories = [
    { id: "all", label: t.faq.categories.all, icon: Layers },
    { id: "dealers", label: t.faq.categories.dealers, icon: Store },
    { id: "owners", label: t.faq.categories.owners, icon: Wrench },
    { id: "hardware", label: t.faq.categories.hardware, icon: Cpu },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? t.faq.items
      : t.faq.items.filter((faq) => faq.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-32 bg-transparent text-white overflow-hidden border-t border-white/5">
      {/* Background ambient red glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/[0.04] blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="hero-tag-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-red-400 mb-4 border border-white/10 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.faq.titleMain}{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-300 to-white bg-clip-text text-transparent">
              {t.faq.titleHighlight}
            </span>
          </h2>
          <p className="text-xs sm:text-base text-gray-400 max-w-xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenId(null);
                }}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  isActive
                    ? "bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] scale-105"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-white/10 bg-[#111111] hover:border-red-500/30 overflow-hidden transition-all duration-300 shadow-lg"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-3 sm:gap-4 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col gap-2">
                    <span className="self-start text-[10px] font-mono uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
                      {faq.tag}
                    </span>
                    <span className="text-sm sm:text-lg font-bold text-white group-hover:text-red-300 transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-1 ${
                      isOpen
                        ? "rotate-45 bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                        : "bg-white/5 text-gray-400 group-hover:border-red-500/30 group-hover:text-white"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 text-xs sm:text-base text-gray-400 leading-relaxed border-t border-white/5 animate-in fade-in duration-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
