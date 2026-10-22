"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  Store,
  Wrench,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  HelpCircle,
  Percent,
  Layers,
  ChevronRight,
  Sliders,
  Globe,
} from "lucide-react";
import BookCallModal from "@/components/BookCallModal";

export default function DealerRevenuePage() {
  const { language, setLanguage, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculator inputs
  const [tractorVolume, setTractorVolume] = useState<number>(35);
  const [serviceBays, setServiceBays] = useState<number>(4);
  const [conversionRate, setConversionRate] = useState<number>(35); // percentage
  const [renewalRate, setRenewalRate] = useState<number>(90); // percentage

  const volumeSliderId = useId();
  const baysSliderId = useId();

  // Dynamic Financial Calculations (in INR)
  // 1. Hardware Margin: ~₹4,500 profit per telematics hardware unit
  const hardwareMarginPerUnit = 4500;
  const annualHardwareRevenue = tractorVolume * hardwareMarginPerUnit;

  // 2. Predictive Workshop Diagnostics: Each connected tractor generates an avg of 3 service visits/year
  // Average service ticket profit = ₹3,200. Conversion boost from predictive DTC alerts
  const serviceVisitsPerTractorYear = 3;
  const avgProfitPerService = 3200;
  const predictiveWorkshopRevenue = Math.round(
    tractorVolume * serviceVisitsPerTractorYear * (conversionRate / 100) * avgProfitPerService
  );

  // 3. Recurring Software Commission: 20% commission on annual telematics fee (₹4,000/yr per machine)
  const annualSubFeePerUnit = 4000;
  const commissionRate = 0.20;
  const recurringCommissionRevenue = Math.round(
    tractorVolume * annualSubFeePerUnit * commissionRate * (renewalRate / 100)
  );

  // 4. Incremental Genuine Parts Turnover
  const avgPartsProfitPerTractor = 2400;
  const incrementalPartsRevenue = Math.round(
    tractorVolume * avgPartsProfitPerTractor * (conversionRate / 100)
  );

  // Total Annual Revenue Boost
  const totalAnnualBoost =
    annualHardwareRevenue +
    predictiveWorkshopRevenue +
    recurringCommissionRevenue +
    incrementalPartsRevenue;

  const monthlyAverage = Math.round(totalAnnualBoost / 12);

  // Formatter for Indian Currency
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Convert to Lakhs notation for display
  const formatLakhs = (val: number) => {
    const inLakhs = val / 100000;
    return `+₹${inLakhs.toFixed(1)} Lakhs / yr`;
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] selection:bg-red-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d0d0f]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t.dealerRevenue.backHome}</span>
          </Link>
          <div className="h-4 w-px bg-white/15 hidden sm:block" />
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/holatractor-logo.svg"
              alt="Holatractor Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="font-extrabold tracking-tight text-base sm:text-lg text-white">
              Holatractor<span className="text-red-500">.</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Language selector toggle */}
          <div className="flex items-center p-0.5 rounded-full bg-white/5 border border-white/10 text-xs">
            <Globe className="w-3.5 h-3.5 text-gray-400 ml-2 mr-1" />
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                language === "es"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-red-600/25 flex items-center gap-1.5 cursor-pointer flex-shrink-0"
          >
            <Store className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.dealers.applyPartnerButton}</span>
            <span className="sm:hidden">{language === "es" ? "Postular" : "Apply"}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4 tracking-wide uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.dealerRevenue.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {t.dealerRevenue.title}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {t.dealerRevenue.subtitle}
          </p>
        </div>

        {/* 2-Column Grid: Left Controls, Right Dynamic Financial Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Interactive Parameters */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#141416] via-[#101012] to-[#0c0c0e] border border-white/10 shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-red-400" />
                <h2 className="text-base font-bold text-white">
                  Dealership Operating Parameters
                </h2>
              </div>
              <span className="text-[11px] text-gray-400">Live Simulation</span>
            </div>

            {/* Input 1: Annual Tractor Volume */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={volumeSliderId} className="text-xs font-semibold text-gray-300">
                  Annual Tractors Sold / Financed
                </label>
                <span className="text-sm font-extrabold text-red-400 bg-red-950/40 px-2.5 py-0.5 rounded-md border border-red-500/30">
                  {tractorVolume} Tractors
                </span>
              </div>
              <input
                id={volumeSliderId}
                type="range"
                min={5}
                max={150}
                step={5}
                value={tractorVolume}
                onChange={(e) => setTractorVolume(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
              {/* Quick Presets */}
              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-[10px] text-gray-500">Presets:</span>
                {[15, 35, 75, 120].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTractorVolume(preset)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                      tractorVolume === preset
                        ? "bg-red-600 text-white"
                        : "bg-white/5 hover:bg-white/10 text-gray-400"
                    }`}
                  >
                    {preset} units
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Workshop Bays */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={baysSliderId} className="text-xs font-semibold text-gray-300">
                  Workshop Service Bays
                </label>
                <span className="text-sm font-extrabold text-white bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                  {serviceBays} Bays
                </span>
              </div>
              <input
                id={baysSliderId}
                type="range"
                min={1}
                max={12}
                step={1}
                value={serviceBays}
                onChange={(e) => setServiceBays(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>

            {/* Input 3: Predictive DTC Alert Conversion Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-300">
                  Predictive Alert Conversion Rate
                </label>
                <span className="text-xs font-bold text-gray-200">
                  {conversionRate}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { rate: 25, label: "Conservative (25%)" },
                  { rate: 35, label: "Standard (35%)" },
                  { rate: 50, label: "Aggressive (50%)" },
                ].map((item) => (
                  <button
                    key={item.rate}
                    type="button"
                    onClick={() => setConversionRate(item.rate)}
                    className={`p-2 rounded-xl border text-center transition-all text-xs cursor-pointer ${
                      conversionRate === item.rate
                        ? "bg-red-600/25 border-red-500 text-white font-bold"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5 leading-normal">
                Percentage of farmers who book workshop maintenance when preventative DTC fault codes are detected.
              </p>
            </div>

            {/* Input 4: Annual Telematics Renewal Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-300">
                  Annual Telematics Renewal Rate
                </label>
                <span className="text-xs font-bold text-gray-200">
                  {renewalRate}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[85, 90, 95].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setRenewalRate(rate)}
                    className={`p-2 rounded-xl border text-center transition-all text-xs cursor-pointer ${
                      renewalRate === rate
                        ? "bg-red-600/25 border-red-500 text-white font-bold"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {rate}% Renewal
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero KPI & Revenue Streams Breakdown */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Big Hero Projected Revenue Card */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-950/60 via-[#181113] to-[#0c0c0e] border border-red-500/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[80px] pointer-events-none rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs uppercase font-bold text-red-400 tracking-wider">
                    Total Projected Revenue Boost
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Net Dealership Upside
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                  {formatLakhs(totalAnnualBoost)}
                </div>

                <div className="text-xs text-gray-400 flex items-center gap-4 mb-6">
                  <span>Exact: {formatINR(totalAnnualBoost)}</span>
                  <span>•</span>
                  <span>Monthly Average: {formatINR(monthlyAverage)} / mo</span>
                </div>

                {/* Micro Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-[10px] uppercase text-gray-400 font-semibold mb-0.5">
                      Payback Period
                    </div>
                    <div className="text-lg font-bold text-white">&lt; 30 Days</div>
                    <div className="text-[10px] text-gray-500">Hardware &amp; tool investment</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-[10px] uppercase text-gray-400 font-semibold mb-0.5">
                      Recurring Share
                    </div>
                    <div className="text-lg font-bold text-emerald-400">20% Annual</div>
                    <div className="text-[10px] text-gray-500">Telematics renewal commission</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Revenue Streams Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Stream 1 */}
              <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 hover:border-red-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    {formatINR(annualHardwareRevenue)}
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-200">
                  IoT Hardware Sales Margin
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  38% margin on {tractorVolume} OBD/CAN-bus devices sold or installed.
                </div>
              </div>

              {/* Stream 2 */}
              <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 hover:border-red-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    {formatINR(predictiveWorkshopRevenue)}
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-200">
                  Predictive Workshop Billables
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  Preventative repair workorders triggered automatically by DTC error codes.
                </div>
              </div>

              {/* Stream 3 */}
              <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 hover:border-red-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center">
                    <Percent className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    {formatINR(recurringCommissionRevenue)}
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-200">
                  Annual Renewal Commissions
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  20% recurring annual commission on farm connectivity renewals.
                </div>
              </div>

              {/* Stream 4 */}
              <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 hover:border-red-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 flex items-center justify-center">
                    <Store className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    {formatINR(incrementalPartsRevenue)}
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-200">
                  Genuine Spare Parts Sales
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  Turnover on filters, lubricants, hydraulics, and wear parts.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison: Traditional vs Holatractor Dealership */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Traditional vs. Holatractor Connected Dealership
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Why leading agri machinery dealers in India and Latin America are modernizing with Holatractor.
            </p>
          </div>

          <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-[620px] text-left text-xs sm:text-sm border-collapse rounded-2xl overflow-hidden border border-white/10">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 sm:p-5 font-bold text-gray-400">Performance Metric</th>
                  <th className="p-4 sm:p-5 font-bold text-gray-400">Traditional Tractor Dealership</th>
                  <th className="p-4 sm:p-5 font-bold text-red-400 bg-red-950/20">
                    Holatractor Connected Dealership
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-[#101012]">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Workshop Service Bookings</td>
                  <td className="p-4 sm:p-5 text-gray-400">Reactive (Farmers visit only after complete breakdown)</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-red-950/10">
                    +35% increase via automated engine DTC fault code dispatch
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">After-Sale Customer Retention</td>
                  <td className="p-4 sm:p-5 text-gray-400">Falls below 30% after OEM warranty expires</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-red-950/10">
                    Over 82% retention through mobile operator &amp; health telemetry
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Financed Tractor Asset Security</td>
                  <td className="p-4 sm:p-5 text-gray-400">High risk of non-performing asset or cross-border asset removal</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-red-950/10">
                    100% real-time GPS tracking &amp; remote engine immobilizer safeguard
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Software Revenue Stream</td>
                  <td className="p-4 sm:p-5 text-gray-400">₹0 (One-time machine retail sale only)</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-red-950/10">
                    20% recurring annual commissions on software renewals
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Lead Generation &amp; Discovery</td>
                  <td className="p-4 sm:p-5 text-gray-400">Manual showroom footfalls and paper pamphlets</td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-red-950/10">
                    Inbound farmer leads routed exclusively to your pincode
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-12 bg-gradient-to-r from-red-950/50 via-[#181113] to-[#121214] border border-red-500/30 text-center overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
              Ready to Activate Your Territory?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
              District dealership quotas are limited to protect territorial margins for partner showrooms. Submit your application to receive the official partner packet and starter hardware.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 font-bold text-white text-xs shadow-lg shadow-red-600/30 transition-all cursor-pointer hover:scale-105"
              >
                {t.dealerRevenue.ctaButton}
              </button>
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all text-center"
              >
                {language === "es" ? "Contactar al Equipo Comercial" : "Contact Sales Team"}
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-8 text-center text-xs text-gray-500">
        <div>Copyright © 2026 Holatractor Srl. {t.footer.rights}</div>
      </footer>

      {/* Interactive Modal */}
      <BookCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultRole="dealer"
      />
    </div>
  );
}
