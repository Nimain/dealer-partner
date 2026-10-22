"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import StartupStages from "@/components/StartupStages";
import DealersSection from "@/components/DealersSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import BookCallModal from "@/components/BookCallModal";
import StickyCallPill from "@/components/StickyCallPill";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#080808] text-[#f5f5f5] selection:bg-red-600 selection:text-white relative cursor-default">
        {/* Custom Interactive Trailing Cursor */}
        <CustomCursor />

        {/* Dynamic Morphing Navbar */}
        <Navbar onOpenBookCall={() => setIsBookCallOpen(true)} />

        {/* Main Landing Sections Flow */}
        <main>
          <Hero onOpenBookCall={() => setIsBookCallOpen(true)} />
          
          {/* Continuous Full-Website Gradient Experience After Hero */}
          <div className="relative bg-gradient-to-b from-[#0c0c0e] via-[#1a0b0d] via-[#120809] via-[#220c0f] via-[#140709] via-[#1b090c] to-[#080808] overflow-hidden">
            {/* Ambient atmospheric red lighting layers traversing the page */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent pointer-events-none" />
            <div className="absolute top-[5%] left-[-150px] w-[750px] h-[750px] bg-red-700/15 blur-[180px] pointer-events-none rounded-full" />
            <div className="absolute top-[20%] right-[-150px] w-[800px] h-[800px] bg-rose-700/12 blur-[200px] pointer-events-none rounded-full" />
            <div className="absolute top-[40%] left-[5%] w-[750px] h-[750px] bg-red-600/12 blur-[190px] pointer-events-none rounded-full" />
            <div className="absolute top-[60%] right-[5%] w-[700px] h-[700px] bg-rose-900/18 blur-[180px] pointer-events-none rounded-full" />
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-red-600/[0.08] blur-[220px] pointer-events-none rounded-full" />

            <div className="relative z-10">
              <StatsSection />
              
              {/* Dealers Section: 3D Pillars & Next-Gen Dashboard Showcase */}
              <DealersSection onOpenDealerModal={() => setIsBookCallOpen(true)} />

              {/* Owners & Machinery Stages */}
              <StartupStages />

              {/* Frequently Asked Questions */}
              <FaqSection />

              {/* Final Call to Action */}
              <CtaSection onOpenBookCall={() => setIsBookCallOpen(true)} />

              {/* Footer */}
              <Footer />
            </div>
          </div>
        </main>

        {/* Persistent Floating Consultation Pill */}
        <StickyCallPill onOpenBookCall={() => setIsBookCallOpen(true)} />

        {/* Interactive Booking & Dealership Application Modal */}
        <BookCallModal
          isOpen={isBookCallOpen}
          onClose={() => setIsBookCallOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}
