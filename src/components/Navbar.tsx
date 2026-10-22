"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, PhoneCall, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onOpenBookCall: () => void;
}

export default function Navbar({ onOpenBookCall }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isLightSection, setIsLightSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 80) {
        setScrolled(true);
        if (currentScrollY > lastScrollY.current) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
      } else {
        setScrolled(false);
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;

      // Check if current scroll is within the light sections (clients/testimonials)
      const clientsSection = document.getElementById("clients");
      if (clientsSection) {
        const rect = clientsSection.getBoundingClientRect();
        // If navbar is over the light section
        if (rect.top <= 80 && rect.bottom >= 80) {
          setIsLightSection(true);
        } else {
          setIsLightSection(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Button explode hover tracking
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
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

  const navLinks = [
    { name: t.nav.dealers, href: "#dealers" },
    { name: t.nav.owners, href: "#stages" },
    { name: t.nav.aboutUs, href: "https://holatractor.com" },
  ];

  return (
    <>
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          scrolled && scrollDirection === "down"
            ? "w-[94%] md:w-[480px]"
            : "w-[94%] max-w-[800px]"
        }`}
      >
        <nav
          className={`flex items-center justify-between px-3 sm:px-3.5 py-2 rounded-[14px] transition-all duration-500 shadow-2xl border ${
            isLightSection
              ? "bg-[#FAFAFA]/95 text-[#080808] border-black/10 backdrop-blur-md"
              : "bg-[#191919]/95 text-white border-white/10 backdrop-blur-md"
          }`}
        >
          {/* Holatractor Logo */}
          <Link href="/" className="flex items-center gap-2 group pl-1 pr-2 flex-shrink-0 whitespace-nowrap">
            <div className="w-7 h-7 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
              <img
                src="/holatractor-logo.svg"
                alt="Holatractor Logo"
                className={`w-6 h-6 object-contain transition-all duration-300 ${
                  isLightSection ? "invert" : ""
                }`}
              />
            </div>
            <span className="font-extrabold tracking-tight text-base sm:text-lg text-inherit">
              Holatractor<span className="text-red-500">.</span>
            </span>
          </Link>

          {/* Navigation Links with Signature Text-Flip Hover */}
          <div
            className={`hidden md:flex items-center transition-all duration-500 ease-out overflow-hidden ${
              scrolled && scrollDirection === "down"
                ? "opacity-0 max-w-0 pointer-events-none scale-90 gap-0"
                : "opacity-100 max-w-[380px] scale-100 gap-5"
            }`}
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flip-text-wrap text-sm font-medium tracking-wide py-1 text-inherit opacity-85 hover:opacity-100 transition-opacity flex-shrink-0 whitespace-nowrap"
              >
                <span className="flip-text-inner h-5">
                  <span className="h-5 flex items-center">{item.name}</span>
                  <span className="h-5 flex items-center text-red-400 font-semibold">{item.name}</span>
                </span>
              </a>
            ))}
          </div>

          {/* Action Buttons: Book a Call + Translator Option (in place of contact button) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={onOpenBookCall}
              onMouseMove={handleButtonMouseMove}
              className={`explode-btn relative hidden sm:inline-flex h-9 px-3.5 rounded-[9px] text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer items-center justify-center flex-shrink-0 whitespace-nowrap ${
                isLightSection
                  ? "bg-[#EAEAEA] text-[#080808] hover:bg-[#DFDFDF]"
                  : "bg-[#262626] text-white hover:bg-[#303030]"
              }`}
            >
              <div className="explode-glow" />
              <span className="relative z-10 flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3 text-red-500" />
                <span>{t.nav.bookCall}</span>
              </span>
            </button>

            {/* Translator Option in place of contact button */}
            <div
              className={`flex items-center rounded-[9px] p-0.5 border text-xs font-semibold transition-all h-9 ${
                isLightSection
                  ? "bg-black/5 border-black/10 text-gray-700"
                  : "bg-white/10 border-white/10 text-gray-300"
              }`}
            >
              <Globe className="w-3.5 h-3.5 ml-1.5 mr-1 opacity-70" />
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`px-2 py-1 rounded-[6px] transition-all cursor-pointer text-[11px] ${
                  language === "es"
                    ? "bg-red-600 text-white font-bold shadow-xs"
                    : "opacity-75 hover:opacity-100 hover:text-white"
                }`}
                title="Español (Predeterminado)"
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-[6px] transition-all cursor-pointer text-[11px] ${
                  language === "en"
                    ? "bg-red-600 text-white font-bold shadow-xs"
                    : "opacity-75 hover:opacity-100 hover:text-white"
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-[8px] hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 md:hidden animate-in fade-in duration-200">
          <div>
            {/* Mobile Language Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                <Globe className="w-4 h-4 text-red-500" />
                <span>{t.nav.translateOption}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setLanguage("es")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    language === "es"
                      ? "bg-red-600 text-white font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Español (ES)
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    language === "en"
                      ? "bg-red-600 text-white font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  English (EN)
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 text-2xl font-semibold">
              {[
                { name: t.nav.dealers, href: "#dealers" },
                { name: t.nav.owners, href: "#stages" },
                { name: t.nav.aboutUs, href: "https://holatractor.com" },
                { name: t.nav.faq, href: "#faq" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-red-400 transition-colors flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <span>{item.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-gray-500" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookCall();
              }}
              className="w-full py-3.5 rounded-[10px] bg-red-600 hover:bg-red-700 text-white font-semibold text-center transition-colors shadow-lg cursor-pointer"
            >
              {t.nav.bookIntroCall}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
