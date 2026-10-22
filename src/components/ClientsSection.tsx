"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";

const brandLogos = [
  "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66f4fafa6da01e9c086c507e_brand-5.svg",
  "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66f4fafae2de07e06d1f1bb1_brand-4.svg",
  "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66f4fafa8f80679c4ae3e71c_brand-1.svg",
  "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66f4fafa294921d7ae181afc_brand-2.svg",
  "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66f4fb01c905e0766236e231_brand-3.svg",
];

const caseStudies = [
  {
    name: "Brainforest",
    category: "AI & Productivity",
    desc: "Holatractor partnered with Brainforest, an AI-powered productivity platform for students. Our comprehensive brand identity work and intuitive UX/UI design transformed the platform, significantly improving user retention and attracting new investments.",
    link: "https://www.brainforest.io/",
    metrics: "+42% Daily Active Retention",
  },
  {
    name: "Fitonist",
    category: "Fitness & Mobile UX",
    desc: "Our team assisted Fitonist, a gym workout mobile app, with a cohesive brand identity and an intuitive design across their website and mobile application. Our strategic approach enhanced user engagement and significant growth in new sign-ups.",
    link: "https://fitonist-app.webflow.io/",
    metrics: "Awwwards Site of the Day Winner",
  },
  {
    name: "Cybervergent",
    category: "Cybersecurity Enterprise",
    desc: "Cybervergent's strategic website redesign simplified offerings, showcased their full range of products, and positioned them as a leading cybersecurity solutions provider, resulting in increased digital trust and market expansion.",
    link: "https://www.cybervergent.com/",
    metrics: "3.2x Enterprise Inquiries",
  },
  {
    name: "Nopan",
    category: "Fintech & Payments",
    desc: "We created a full branding package for Nopan, including a logo, brand guide, and an investor-focused pitch deck, along with a dynamic landing page to highlight their innovative account-to-account payment offer.",
    link: "https://nopan.webflow.io/",
    metrics: "$4.5M Seed Round Closed",
  },
  {
    name: "Financeable",
    category: "EdTech & Financial Modeling",
    desc: "Holatractor transformed Finance|able into a user-centric learning platform, driving significant growth in student enrollment through intuitive design and engaging content.",
    link: "https://finance-able.com/",
    metrics: "+180% Enrollment Velocity",
  },
  {
    name: "Stable0x",
    category: "DeFi & Web3",
    desc: "Holatractor has partnered with Stable0x, a cross-chain stablecoin startup. Our branding and website design helped them quickly establish credibility in competitive DeFi, attracting early adopters and setting the stage for rapid growth.",
    link: "https://stable0x.com/",
    metrics: "$120M+ TVL at Launch",
  },
];

export default function ClientsSection() {
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);

  return (
    <section id="clients" className="relative py-32 bg-transparent text-white overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Big Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mb-24">
          {brandLogos.map((logo, index) => (
            <div
              key={index}
              className="h-28 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center p-6 hover:shadow-xl hover:border-red-500/40 hover:bg-white/10 transition-all duration-300 group"
            >
              <img
                src={logo}
                alt={`Enterprise partner ${index + 1}`}
                className="max-h-10 max-w-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Startup Case Studies List */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {caseStudies.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredCase(item.name)}
              onMouseLeave={() => setHoveredCase(null)}
              className="py-10 group transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="lg:w-1/4">
                <span className="text-xs font-mono text-red-400 font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
                <h4 className="text-3xl font-extrabold text-white mt-1 group-hover:text-red-400 transition-colors">
                  {item.name}
                </h4>
                <div className="mt-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 inline-block px-2.5 py-1 rounded-md">
                  {item.metrics}
                </div>
              </div>

              <div className="lg:w-1/2">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="lg:w-1/4 flex lg:justify-end">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-300 shadow-sm hover:shadow-lg group-hover:scale-105"
                >
                  <span>Case study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
