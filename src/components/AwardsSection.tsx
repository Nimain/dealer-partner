"use client";

import React, { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface AwardItem {
  id: string;
  organization: string;
  project: string;
  title: string;
  date: string;
  image: string;
}

const awards: AwardItem[] = [
  {
    id: "awwwards-fitonist",
    organization: "Awwwards",
    project: "Fitonist",
    title: "Site of the Day",
    date: "Aug 25, 2024",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66d6faa2963f467f6f335e32_2544e904898d400486be5930400d3149.webp",
  },
  {
    id: "thefwa-fitonist",
    organization: "TheFWA",
    project: "Fitonist",
    title: "FWA of the Day",
    date: "Jul 23, 2024",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66bf1bd4cd6a3ee4e33d1d59_Fitonist%20FOTD.webp",
  },
  {
    id: "awwwards-financeable",
    organization: "Awwwards",
    project: "FinanceAble",
    title: "Honorable Mention",
    date: "Mar 06, 2024",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66bf1bd56c4164cbdc412b3c_certificate-finance-able-hm.webp",
  },
  {
    id: "thefwa-deed",
    organization: "TheFWA",
    project: "Deed Delivery",
    title: "FWA of the Day",
    date: "Dec 30, 2023",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66bf1bd56f46a2e8ccd27fe3_FOTD%20Deed.webp",
  },
  {
    id: "cssda-eventbeds",
    organization: "CssDA",
    project: "EventBeds",
    title: "Website of the Day",
    date: "Dec 29, 2023",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66bf1bd5bc25c2a233ae8e23_Eventbeds%20cssda-wotd.webp",
  },
  {
    id: "awwwards-mota",
    organization: "Awwwards",
    project: "Mota",
    title: "Honorable Mention",
    date: "Nov 30, 2023",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66bf1bd55ee55250318c8ddb_certificate-mota-remote-platform-hm.webp",
  },
  {
    id: "cssda-dstafin",
    organization: "CssDA",
    project: "Dstafin",
    title: "Website of the Day",
    date: "Aug 18, 2023",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66bf1bd5ca25cc45810b2e1b_DSTAFIN-cssda-wotd.webp",
  },
  {
    id: "cssda-kmbch",
    organization: "CssDA",
    project: "KMBCH",
    title: "Website of the Day",
    date: "Feb 25, 2023",
    image:
      "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66bf1bd5fda0ce5d67566799_KMBCH-cssda-wotd.webp",
  },
];

export default function AwardsSection() {
  const [hoveredAward, setHoveredAward] = useState<AwardItem | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playHoverSound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("https://dl.dropboxusercontent.com/s/03lxlbaek2ye22m/click_min.mp3");
        audioRef.current.volume = 0.35;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // User may not have interacted yet; audio playback policy handled gracefully
      });
    } catch {
      // Audio autoplay policy fallback
    }
  };

  return (
    <section id="awards" className="relative py-32 bg-transparent text-white overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-950/20 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Awards List matching Holatractor Partner */}
        <div className="divide-y divide-white/10 border-y border-white/10 relative">
          {awards.map((award) => {
            const isHovered = hoveredAward?.id === award.id;

            return (
              <div
                key={award.id}
                onMouseEnter={() => {
                  setHoveredAward(award);
                  playHoverSound();
                }}
                onMouseLeave={() => setHoveredAward(null)}
                className="awards-list-item relative py-7 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all duration-300 group overflow-hidden"
              >
                {/* Background expansion fill on hover matching Holatractor Partner */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-transparent transition-transform duration-500 origin-left pointer-events-none ${
                    isHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                />

                <div className="flex items-center gap-6 md:w-1/3 relative z-10">
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {award.organization}
                  </h4>
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                    {award.project}
                  </span>
                </div>

                <div className="md:w-1/3 relative z-10 flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                    {award.title}
                  </span>

                  {/* Inline Award Certificate / Screenshot popup on hover */}
                  {isHovered && (
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -top-24 w-52 h-36 rounded-xl overflow-hidden shadow-2xl border border-white/25 z-40 bg-black pointer-events-none animate-in zoom-in-90 fade-in duration-300">
                      <img
                        src={award.image}
                        alt={award.project}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="md:w-1/3 flex items-center justify-between md:justify-end gap-6 text-xs text-gray-500 group-hover:text-gray-300 relative z-10">
                  <span className="font-mono">{award.date}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-amber-400 group-hover:border-amber-400 flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
