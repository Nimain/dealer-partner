"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const reviews = [
  {
    name: "Artem Khardin",
    role: "CEO",
    company: "Productivity SaaS",
    quote: "We are really happy that our paths crossed with Holatractor.",
    rating: "5.0",
  },
  {
    name: "Jonathan Hughes",
    role: "CEO",
    company: "HealthTech AI",
    quote: "They became a valuable team member.",
    rating: "5.0",
  },
  {
    name: "Angel Marinov",
    role: "CEO",
    company: "Fintech Platform",
    quote: "We were pleased with their attention to detail.",
    rating: "5.0",
  },
  {
    name: "Magnus Sigurbjornsson",
    role: "COO",
    company: "Global Logistics",
    quote: "The company was very professional.",
    rating: "5.0",
  },
  {
    name: "Perry Skoutelas",
    role: "CEO & Co-Founder",
    company: "Creator Economy",
    quote: "We enjoyed working with the team, liked their approach and designs.",
    rating: "5.0",
  },
  {
    name: "Andrew Gross",
    role: "CEO & Co-Founder",
    company: "B2B Workflow",
    quote: "I was really impressed with their speed and how quickly things moved.",
    rating: "5.0",
  },
];

export default function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const prev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 2));
  };

  const next = () => {
    setStartIndex((prev) => (prev < reviews.length - 2 ? prev + 1 : 0));
  };

  return (
    <section id="clutch" className="relative py-28 bg-transparent text-white overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Multi-card Carousel with Signature Hover Invert Animation */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(startIndex, startIndex + 3).map((review, i) => (
              <div
                key={i}
                className="swiper-slide p-8 rounded-3xl bg-white/[0.04] backdrop-blur-md text-white border border-white/10 shadow-xl transition-all duration-500 ease-out flex flex-col justify-between min-h-[290px] cursor-grab hover:bg-white/[0.08] hover:border-red-500/40 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        {review.name}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">
                        {review.role}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">{review.rating}</span>
                      <img
                        src="https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/667d7493097816a7e1c772a3_stars.svg"
                        alt="5 stars"
                        className="h-3.5 object-contain"
                      />
                    </div>
                  </div>

                  <blockquote className="text-xl font-serif italic leading-relaxed text-gray-200 group-hover:text-white transition-colors mt-6">
                    {review.quote}
                  </blockquote>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono">Verified Clutch Review</span>
                  <ArrowUpRight className="w-4 h-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-red-500 flex items-center justify-center transition-colors bg-white/5 hover:bg-red-600 text-gray-300 hover:text-white shadow-sm cursor-pointer"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-red-500 flex items-center justify-center transition-colors bg-white/5 hover:bg-red-600 text-gray-300 hover:text-white shadow-sm cursor-pointer"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Partner Reviews CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.holatractor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold hover:bg-red-600 hover:border-red-600 transition-all duration-300 shadow-md hover:scale-105"
          >
            <span>View all Holatractor Partner reviews</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
