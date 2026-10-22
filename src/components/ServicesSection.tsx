"use client";

import React, { useRef } from "react";
import {
  Compass,
  Palette,
  Laptop,
  Globe,
  Smartphone,
  Code2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    id: "strategy",
    title: "Brand Strategy",
    description:
      "We establish comprehensive product-market fit hypotheses, validate them, and visualise in the most creative ways.",
    icon: Compass,
    tag: "Positioning & Market Fit",
    previewType: "strategy",
  },
  {
    id: "visual",
    title: "Brand Visual",
    description:
      "We create brand materials that speak of your values non-verbally and complement your offering to the market.",
    icon: Palette,
    tag: "Identity & Typography",
    previewType: "visual",
  },
  {
    id: "platforms",
    title: "Platforms",
    description:
      "We think about the big picture and focus primarily on your app's business success. We research deeply, validate thoroughly, and launch confidently.",
    icon: Laptop,
    tag: "B2B SaaS & Dashboards",
    previewType: "platforms",
  },
  {
    id: "website",
    title: "Website",
    description:
      "We don’t just design websites. We build reliable sales & marketing tools that drive predictably good metrics.",
    icon: Globe,
    tag: "High-Converting Web",
    previewType: "website",
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    description:
      "We're masters of UX gamification and user engagement. In a world where any app competes with Instagram we make usable products that attract and retain.",
    icon: Smartphone,
    tag: "iOS & Android Engagement",
    previewType: "mobile",
  },
  {
    id: "development",
    title: "Development",
    description:
      "We can take care of your product’s implementation, assuring the most efficient usage of time & resources in every decision & each line of code while maintaining seamless operation.",
    icon: Code2,
    tag: "Next.js & Cloud Architecture",
    previewType: "development",
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".service-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <section
      id="services"
      className="relative py-32 bg-transparent text-white overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="hero-tag-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-red-400 mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complex Solutions</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Services
            </h2>
          </div>
          <p className="text-gray-400 text-base sm:text-lg max-w-md">
            Whether you need a full-scale IT partner to define the roadmap or a vendor
            for particular tasks, we got you.
          </p>
        </div>

        {/* Philosophy Callout */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 flex items-start gap-5">
          <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-red-500 to-rose-600 flex-shrink-0" />
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic max-w-4xl font-serif">
            “Instead of a request which sounds like <span className="text-white font-medium">‘I need a website’</span>,
            we embrace — <span className="text-red-400 font-medium">‘I want to market my product to get first organic users’</span>,
            where we can suggest what to do, and execute the approved plan from A to Z.”
          </p>
        </div>

        {/* 6 Spotlight Service Cards Grid */}
        <div
          ref={containerRef}
          onMouseMove={handleContainerMouseMove}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="service-card spotlight-card p-8 flex flex-col justify-between min-h-[380px] group transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-red-400 group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Interactive Preview element tailored to service */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  {service.previewType === "mobile" ? (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                      <video
                        playsInline
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        src="https://dl.dropboxusercontent.com/scl/fi/jy5cqifucxea6mo5tx2id/taxi-app-main-v2_XdXjXRKv.mp4?rlkey=7ibn8inbyq804uxjjmhhml5q4&st=tlh7klec&dl=0"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] text-gray-300">
                        Live UX Prototype
                      </div>
                    </div>
                  ) : service.previewType === "development" ? (
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-gray-400">
                      <div className="text-emerald-400 flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Ready for Production</span>
                      </div>
                      <div className="text-red-400">$ npm run deploy:scale</div>
                    </div>
                  ) : service.previewType === "visual" ? (
                    <div className="grid grid-cols-4 gap-2">
                      {["#DC2626", "#EA580C", "#F59E0B", "#EF4444"].map((color, i) => (
                        <div
                          key={i}
                          style={{ backgroundColor: color }}
                          className="h-8 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity hover:scale-105"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors">
                      <span className="font-medium">Discover deliverables</span>
                      <ArrowUpRight className="w-4 h-4 text-red-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
