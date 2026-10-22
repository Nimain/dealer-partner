"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, Translations, translations } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  t: translations.es,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Spanish by default as requested: "By default it will be spanish."
  const [language, setLanguageState] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("holatractor_lang") as Language | null;
    if (stored === "es" || stored === "en") {
      setLanguageState(stored);
    } else {
      setLanguageState("es");
      localStorage.setItem("holatractor_lang", "es");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("holatractor_lang", lang);
      document.documentElement.lang = lang;
    }
  };

  const t = translations[language] || translations.es;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
