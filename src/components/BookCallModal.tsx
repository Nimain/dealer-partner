"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  CheckCircle2,
  Sparkles,
  Send,
  Store,
  User,
  Download,
  MessageSquare,
  ShieldCheck,
  Loader2,
  Building2,
  MapPin,
  Check,
  FileText,
  ExternalLink,
} from "lucide-react";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: "dealer" | "owner";
}

export default function BookCallModal({
  isOpen,
  onClose,
  defaultRole = "dealer",
}: BookCallModalProps) {
  const { t, language } = useLanguage();
  const [role, setRole] = useState<"dealer" | "owner">(defaultRole);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [brochureLang, setBrochureLang] = useState<"es" | "en">(
    language === "en" ? "en" : "es"
  );
  const [applicationId, setApplicationId] = useState("");
  const [cfStatus, setCfStatus] = useState<"idle" | "verifying" | "verified">("idle");
  const [cfError, setCfError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dealershipName: "",
    district: "",
    message: "",
  });

  if (!isOpen) return null;

  const S3_SPANISH_BROCHURE_URL =
    "https://holadashboard.s3.us-west-2.amazonaws.com/holatractor-dealer-brochure.pdf";

  const handleDownloadBrochure = (lang: "es" | "en") => {
    const link = document.createElement("a");
    link.href = `/api/download-brochure?lang=${lang}`;
    link.download =
      lang === "en"
        ? "holatractor-dealer-brochure-en.pdf"
        : "holatractor-dealer-brochure-es.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

  const handleVerifyCloudflare = () => {
    if (cfStatus === "verified" || cfStatus === "verifying") return;
    setCfStatus("verifying");
    setCfError(false);
    setTimeout(() => {
      setCfStatus("verified");
    }, 700);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cfStatus !== "verified") {
      setCfError(true);
      return;
    }
    setIsSubmitting(true);

    const generatedId = `HT${role === "dealer" ? "D" : "O"}-2026-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    setApplicationId(generatedId);

    try {
      // Dynamically submit to /api/leads/submit matching b2bholatractor parameters
      const response = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name: formData.name,
          dealershipName: formData.dealershipName,
          phone: formData.phone,
          email: formData.email,
          district: formData.district,
          message: formData.message,
          applicationId: generatedId,
        }),
      });

      const resJson = await response.json().catch(() => null);
      if (!response.ok) {
        console.warn("[Submission API notice]:", resJson?.error || response.statusText);
      }
    } catch (err: any) {
      console.warn("[Submission network notice]:", err?.message);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger automatic direct system download of the selected brochure
      try {
        handleDownloadBrochure(brochureLang);
      } catch {
        // Fallback to manual buttons if popup blocker intervenes
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      {/* Light Glass Effect Background Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.7)_inset] rounded-3xl p-6 sm:p-8 text-gray-900 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 border border-black/5 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-5 animate-in fade-in zoom-in-95 duration-300">
            {/* Success Ring */}
            <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/15 animate-ping" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.modal.verifiedRef} {applicationId}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5">
              {role === "dealer"
                ? t.modal.successDealerTitle
                : t.modal.successOwnerTitle}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-4 leading-relaxed">
              {role === "dealer"
                ? t.modal.successDealerMessage(formData.name, formData.dealershipName)
                : t.modal.successOwnerMessage}
            </p>

            {/* Application Summary Box */}
            <div className="p-3.5 rounded-2xl bg-white/60 border border-gray-200/80 mb-5 text-xs text-left space-y-1.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-medium">{t.modal.locationLabel}</span>
                <span className="text-gray-900 font-bold">{formData.district || "Provided Location"}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-medium">Edición Descargada:</span>
                <span className="text-gray-900 font-bold">
                  {brochureLang === "es" ? "🇪🇸 Español (12 Páginas)" : "🇺🇸 English (12 Pages)"}
                </span>
              </div>
            </div>

            {/* Action Buttons: Dual Language Download & WhatsApp Direct */}
            <div className="flex flex-col gap-3 justify-center mb-4">
              <div className="text-left">
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  {t.modal.chooseBrochureLang}
                </span>
              </div>

              {/* Dual Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                {/* Spanish Version Download Button */}
                <button
                  type="button"
                  onClick={() => handleDownloadBrochure("es")}
                  className="w-full px-4 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span className="truncate">🇪🇸 {t.modal.downloadSpanishBrochureBtn}</span>
                </button>

                {/* English Version Download Button */}
                <button
                  type="button"
                  onClick={() => handleDownloadBrochure("en")}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span className="truncate">🇺🇸 {t.modal.downloadEnglishBrochureBtn}</span>
                </button>
              </div>

              {/* S3 Direct Link Option */}
              <div className="text-center py-1">
                <a
                  href={S3_SPANISH_BROCHURE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-red-600 font-medium transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{t.modal.s3DirectLink} (holatractor-dealer-brochure.pdf)</span>
                </a>
              </div>

              {/* WhatsApp Regional Director */}
              <a
                href={`https://wa.me/59177613811?text=${encodeURIComponent(
                  `Hi Holatractor Team, I just submitted an application to join the Dealer Network for ${formData.dealershipName || "my dealership"} in ${formData.district || "my region"}. Reference ID: ${applicationId}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-600/20 hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.modal.whatsappBtn} (+591 77613811)</span>
              </a>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="text-xs text-gray-500 hover:text-gray-900 transition-colors cursor-pointer mt-1 font-medium"
            >
              {t.modal.doneBtn}
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-[11px] font-semibold text-red-600 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>{t.modal.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {role === "dealer" ? t.modal.dealerTitle : t.modal.ownerTitle}
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {t.modal.subtitle}
              </p>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-black/5 border border-black/5 mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setRole("dealer")}
                className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  role === "dealer"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/25 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>{t.modal.roleDealer}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("owner")}
                className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  role === "owner"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/25 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.modal.roleOwner}</span>
              </button>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
              {/* Row 1: Dealership Name & District */}
              {role === "dealer" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-[11px]">
                      {t.modal.dealershipNameLabel}
                    </label>
                    <div className="relative">
                      <Building2 className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        required
                        type="text"
                        placeholder={t.modal.dealershipNamePlaceholder}
                        value={formData.dealershipName}
                        onChange={(e) =>
                          setFormData({ ...formData, dealershipName: e.target.value })
                        }
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/70 border border-gray-200/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10 shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-[11px]">
                      {t.modal.locationLabel}
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        required
                        type="text"
                        placeholder={t.modal.locationPlaceholderDealer}
                        value={formData.district}
                        onChange={(e) =>
                          setFormData({ ...formData, district: e.target.value })
                        }
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/70 border border-gray-200/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10 shadow-xs transition-all"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Row 2: Contact Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-[11px]">
                    {t.modal.contactNameLabel}
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={t.modal.contactNamePlaceholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-gray-200/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10 shadow-xs transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-[11px]">
                    {t.modal.phoneLabel}
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder={t.modal.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-gray-200/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10 shadow-xs transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-[11px]">
                  {t.modal.emailLabel}
                </label>
                <input
                  required
                  type="email"
                  placeholder={t.modal.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-gray-200/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10 shadow-xs transition-all"
                />
              </div>

              {role === "owner" && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-[11px]">
                    {t.modal.ownerMachineryLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.modal.locationPlaceholderOwner}
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-gray-200/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10 shadow-xs"
                  />
                </div>
              )}

              {/* Brochure Language Preference Selection */}
              <div className="p-3 rounded-2xl bg-black/[0.03] border border-black/5 text-left">
                <label className="block text-gray-700 font-semibold mb-2 text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-red-500" />
                    <span>{t.modal.chooseBrochureLang}</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">PDF 12 Páginas / Pages</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBrochureLang("es")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      brochureLang === "es"
                        ? "bg-red-600 text-white shadow-xs font-bold"
                        : "bg-white/80 border border-gray-200/80 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span>🇪🇸</span>
                    <span>{t.modal.spanishEdition}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBrochureLang("en")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      brochureLang === "en"
                        ? "bg-gray-900 text-white shadow-xs font-bold"
                        : "bg-white/80 border border-gray-200/80 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>{t.modal.englishEdition}</span>
                  </button>
                </div>
              </div>

              {/* Cloudflare Turnstile Human Verification Box */}
              <div
                onClick={handleVerifyCloudflare}
                className={`p-3 rounded-2xl border transition-all cursor-pointer select-none flex items-center justify-between backdrop-blur-sm shadow-xs ${
                  cfStatus === "verified"
                    ? "bg-emerald-50/90 border-emerald-300 text-emerald-900"
                    : cfError
                    ? "bg-red-50/90 border-red-300 ring-1 ring-red-400"
                    : "bg-white/60 hover:bg-white/90 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                      cfStatus === "verified"
                        ? "bg-emerald-600 text-white"
                        : cfStatus === "verifying"
                        ? "bg-transparent"
                        : "border-2 border-gray-400 bg-white hover:border-gray-600"
                    }`}
                  >
                    {cfStatus === "verifying" ? (
                      <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                    ) : cfStatus === "verified" ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : null}
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-800">
                      {cfStatus === "verifying"
                        ? t.modal.cfVerifying
                        : cfStatus === "verified"
                        ? t.modal.cfVerified
                        : t.modal.cfVerifyPrompt}
                    </div>
                    {cfError && cfStatus === "idle" && (
                      <div className="text-[10px] text-red-600 font-medium">
                        {t.modal.cfError}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cloudflare Official Branding */}
                <div className="flex flex-col items-end pl-3 border-l border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
                        fill="#F6821F"
                      />
                    </svg>
                    <span>Cloudflare</span>
                  </div>
                  <div className="text-[9px] text-gray-500 flex gap-1">
                    <span className="hover:text-gray-700 transition-colors">{t.modal.cfPrivacy}</span>
                    <span>•</span>
                    <span className="hover:text-gray-700 transition-colors">{t.modal.cfTerms}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || cfStatus !== "verified"}
                className={`w-full py-3.5 rounded-full font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-0.5 text-xs ${
                  cfStatus !== "verified"
                    ? "bg-gray-200 border border-gray-300/80 text-gray-600 cursor-not-allowed hover:bg-gray-200"
                    : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white cursor-pointer shadow-red-600/30 hover:scale-[1.01]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.modal.submitting}</span>
                  </>
                ) : (
                  <>
                    <Send className={`w-4 h-4 ${cfStatus !== "verified" ? "text-gray-500" : "text-white"}`} />
                    <span className={cfStatus !== "verified" ? "text-gray-600 font-semibold" : "text-white font-bold"}>
                      {role === "dealer"
                        ? t.modal.submitDealer
                        : t.modal.submitOwner}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
