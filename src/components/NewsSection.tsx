"use client";

import React from "react";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";

const articles = [
  {
    id: "b2b-saas-ux",
    title: "From Confusing UX to Market Traction: Redesigning a Complex B2B SaaS",
    category: "Case Study & Product Strategy",
    readTime: "7 min read",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f3d/6abb90753969c5085e0ce8ab_356.jpg",
    featured: true,
    excerpt:
      "How simplifying hierarchical data visualization helped our client increase self-serve activation by 43% and secure Series B funding.",
  },
  {
    id: "brand-recognition",
    title: "How to Make Your B2B SaaS Brand Visually Recognizable",
    category: "Brand Design",
    readTime: "5 min read",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f3d/6ab77404af1c61b16dc35c9f_1_46hKGhht6pljgKrlQfhLHQ.webp",
    featured: false,
    excerpt:
      "Key visual anchor patterns that differentiate enterprise software in crowded commodity markets.",
  },
  {
    id: "crypto-ai-design",
    title: "Crypto product design in the AI era: How to build trust before users connect a wallet",
    category: "Web3 & AI Interface",
    readTime: "6 min read",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f3d/6a6864514d34e986c096facf_7344.png",
    featured: false,
    excerpt:
      "Designing security transparency, transaction simulations, and conversational AI guidance for decentralized protocols.",
  },
];

export default function NewsSection() {
  const featuredArticle = articles.find((a) => a.featured)!;
  const secondaryArticles = articles.filter((a) => !a.featured);

  return (
    <section id="news" className="relative py-32 bg-transparent text-white overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-red-400 mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Insights &amp; Research</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Our News
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-sm">
            Insights on SaaS UI/UX, product acceleration, branding strategy, and design systems.
          </p>
        </div>

        {/* News Grid: 1 Big Featured Card + 2 Stacked Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Featured Article */}
          <div className="lg:col-span-7 group cursor-pointer">
            <div className="spotlight-card h-full p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-[#161616] border border-white/10">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono font-semibold text-red-300 border border-white/10">
                  {featuredArticle.category}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime}
                  </span>
                  <span>•</span>
                  <span className="text-red-400 font-semibold">Featured Strategy</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-red-300 transition-colors">
                  {featuredArticle.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-red-400 font-semibold">
                <span>Read Full Case Article</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>

          {/* Secondary Stacked Articles */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryArticles.map((article) => (
              <div
                key={article.id}
                className="spotlight-card p-6 flex flex-col justify-between group cursor-pointer flex-1"
              >
                <div className="flex gap-4 items-start mb-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#161616] flex-shrink-0 border border-white/10">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-red-400 font-medium mb-1">
                      {article.category}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-red-300 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/5">
                  <span>{article.readTime}</span>
                  <ArrowUpRight className="w-4 h-4 text-red-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <span>View All Insights on Medium &amp; Substack</span>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
