"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button'], input, textarea, .service-card, .awards-list-item");
      setIsHoveringClickable(!!clickable);

      if (target.closest(".service-card")) {
        setCursorText("Explore");
      } else if (target.closest(".awards-list-item")) {
        setCursorText("View");
      } else if (target.closest(".swiper-slide")) {
        setCursorText("Drag");
      } else {
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    let animId: number;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            cursorText ? "w-0 h-0 opacity-0" : "w-1.5 h-1.5 opacity-90 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          }`}
        />
      </div>

      {/* Trailing Fluid Follower Ring / Badge */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99998] transition-all duration-75 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorText ? (
          <div className="px-3.5 py-1.5 rounded-full bg-red-600/95 text-white text-[11px] font-bold tracking-wider uppercase border border-red-400/40 backdrop-blur-md shadow-xl shadow-red-950/50 animate-in zoom-in-75 duration-200 flex items-center justify-center">
            {cursorText}
          </div>
        ) : (
          <div
            className={`rounded-full border transition-all duration-300 ${
              isHoveringClickable
                ? "w-12 h-12 border-red-500/80 bg-red-500/10 scale-125"
                : "w-8 h-8 border-white/20 bg-transparent scale-100"
            }`}
          />
        )}
      </div>
    </>
  );
}
