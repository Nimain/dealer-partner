"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  dealers: [
    { name: "Dealer Telematics", href: "#dealers" },
    { name: "Fleet Monitoring", href: "#dealers" },
    { name: "Projected Revenue Boost", href: "/dealer-revenue" },
    { name: "Integration APIs", href: "#dealers" },
  ],
  owners: [
    { name: "Smart Tractor Tracking", href: "#stages" },
    { name: "Fuel & Engine Analytics", href: "#stages" },
    { name: "Geofencing & Security", href: "#stages" },
    { name: "Mobile Operations App", href: "#stages" },
    { name: "Farm Yield Insights", href: "#stages" },
  ],
  about: [
    { name: "About Holatractor", href: "https://holatractor.com" },
    { name: "Our Mission", href: "#stages" },
    { name: "Platform Overview", href: "#dealers" },
    { name: "FAQ & Support", href: "#faq" },
    { name: "Dealer Inquiry", href: "#dealers" },
  ],
};

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/holatractor",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/holatractor",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/holatractor",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@holatractor",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/holatractor",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
  };

  return (
    <footer className="relative bg-transparent text-white pt-20 pb-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Direct Email */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                <div className="w-9 h-9 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <img
                    src="/holatractor-logo.svg"
                    alt="Holatractor Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="font-extrabold tracking-tight text-2xl text-white">
                  Holatractor<span className="text-red-500">.</span>
                </span>
              </Link>
              <p className="text-sm text-gray-400 max-w-sm mb-6 leading-relaxed">
                {t.footer.description}
              </p>
            </div>
          </div>

          {/* Nav Columns with Flip Hover Effect */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Dealers Column */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4 font-semibold">
                {t.footer.dealersColTitle}
              </div>
              <ul className="flex flex-col gap-3">
                {t.footer.dealersLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flip-text-wrap text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="flip-text-inner h-5">
                        <span className="h-5 flex items-center">{link.name}</span>
                        <span className="h-5 flex items-center text-red-400 font-medium">
                          {link.name}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Owners Column */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4 font-semibold">
                {t.footer.ownersColTitle}
              </div>
              <ul className="flex flex-col gap-3">
                {t.footer.ownersLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flip-text-wrap text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="flip-text-inner h-5">
                        <span className="h-5 flex items-center">{link.name}</span>
                        <span className="h-5 flex items-center text-red-400 font-medium">
                          {link.name}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Column */}
            <div className="col-span-2 sm:col-span-1">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4 font-semibold">
                {t.footer.aboutColTitle}
              </div>
              <ul className="flex flex-col gap-3">
                {t.footer.aboutLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flip-text-wrap text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="flip-text-inner h-5">
                        <span className="h-5 flex items-center">{link.name}</span>
                        <span className="h-5 flex items-center text-red-400 font-medium">
                          {link.name}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Magnetic Socials & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs text-gray-500">
            Copyright © 2026 Holatractor Srl. {t.footer.rights}
          </div>

          {/* Magnetic Social Icons */}
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="w-10 h-10 rounded-full bg-[#18181b] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:border-red-500/50 hover:bg-red-950/40 hover:scale-105"
                aria-label={social.name}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
