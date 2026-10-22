"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Radio,
  Activity,
  ShieldCheck,
  TrendingUp,
  Users,
  Store,
  Wrench,
  Megaphone,
  Gauge,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Search,
  Bell,
  Globe,
  Filter,
  Plus,
  Compass,
  Zap,
  Check,
  Calendar,
  Sparkles,
} from "lucide-react";

interface DealerShowreelProps {
  className?: string;
}

export default function DealerShowreel({ className = "" }: DealerShowreelProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 25 seconds
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const TOTAL_DURATION = 25; // 25 seconds total loop

  const scenes = [
    {
      id: "overview",
      name: "01 Command Center",
      label: "Dealer KPIs & Runtime",
      icon: Activity,
      duration: 5,
    },
    {
      id: "telematics",
      name: "02 GPS Telematics",
      label: "Live Map & Geofencing",
      icon: Compass,
      duration: 5,
    },
    {
      id: "leads",
      name: "03 Leads & CRM",
      label: "Farmer Conversion Pipeline",
      icon: TrendingUp,
      duration: 5,
    },
    {
      id: "workshop",
      name: "04 Diagnostics & Repairs",
      label: "Predictive DTC & Mechanics",
      icon: Wrench,
      duration: 5,
    },
    {
      id: "marketing",
      name: "05 Marketing & Store",
      label: "Campaign Analytics & Inventory",
      icon: Megaphone,
      duration: 5,
    },
  ];

  // Playback loop timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const nextTime = prev + 0.1;
        if (nextTime >= TOTAL_DURATION) {
          return 0; // loop back to start
        }
        return nextTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Sync active scene with time
  useEffect(() => {
    const sceneIdx = Math.min(
      Math.floor(currentTime / 5),
      scenes.length - 1
    );
    if (sceneIdx !== activeSceneIndex) {
      setActiveSceneIndex(sceneIdx);
    }
  }, [currentTime, scenes.length, activeSceneIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const restart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const jumpToScene = (index: number) => {
    setCurrentTime(index * 5);
    setActiveSceneIndex(index);
    setIsPlaying(true);
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clamped = Math.min(Math.max(pos, 0), 1);
    setCurrentTime(clamped * TOTAL_DURATION);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Format time display MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = (currentTime / TOTAL_DURATION) * 100;
  const sceneProgress = ((currentTime % 5) / 5) * 100;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full bg-[#0a0a0c] text-white select-none overflow-hidden flex flex-col justify-between font-sans group ${className}`}
    >
      {/* 4K Top Showreel Status Banner */}
      <div className="relative z-30 flex items-center justify-between px-3 sm:px-6 py-2.5 bg-black/60 backdrop-blur-md border-b border-white/10 text-xs font-mono">
        {/* Left: REC indicator & Reel Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 font-bold tracking-wider text-[11px]">
            <span className={`w-2 h-2 rounded-full bg-red-500 ${isPlaying ? "animate-ping" : ""}`} />
            <span>{isPlaying ? "REC • LIVE 4K SHOWREEL" : "PAUSED"}</span>
          </div>
          <span className="hidden md:inline-block text-gray-400">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-gray-300 font-semibold tracking-wide">
            <span className="text-white font-bold">HOLATRACTOR</span>
            <span className="text-gray-500">/</span>
            <span>DEALERSHIP OS &amp; TELEMETRY</span>
          </span>
        </div>

        {/* Center: Interactive Scene Jump Pills */}
        <div className="hidden lg:flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/10">
          {scenes.map((scene, idx) => {
            const Icon = scene.icon;
            const isActive = idx === activeSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => jumpToScene(idx)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-600/30 font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{scene.name.split(" ")[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Resolution & Timecode */}
        <div className="flex items-center gap-3">
          <div className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
            60 FPS ULTRA-HD
          </div>
          <div className="text-gray-300 font-mono text-[11px] font-semibold bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
            {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
          </div>
        </div>
      </div>

      {/* Main Dynamic Viewport Stage */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center p-2 sm:p-4">
        {/* Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-600/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-600/15 blur-[120px] pointer-events-none rounded-full" />

        {/* Animated Simulated Cursor performing interactions */}
        <div
          className={`absolute pointer-events-none z-40 transition-all duration-700 ease-out hidden sm:block ${
            activeSceneIndex === 0
              ? "top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
              : activeSceneIndex === 1
              ? "top-1/2 left-[55%]"
              : activeSceneIndex === 2
              ? "top-[40%] left-[65%]"
              : activeSceneIndex === 3
              ? "top-[60%] left-[45%]"
              : "top-[45%] left-[35%]"
          }`}
        >
          <div className="relative">
            {/* Pulsing Click Ripple */}
            <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-red-400/40 animate-ping" />
            {/* SVG Cursor Pointer */}
            <svg
              className="w-6 h-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] fill-white"
              viewBox="0 0 24 24"
            >
              <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.231v-20.352z" />
            </svg>
            {/* Cursor Action Pill */}
            <div className="absolute left-6 top-3 px-2 py-0.5 rounded-full bg-black/80 border border-white/20 text-[9px] font-mono text-emerald-400 whitespace-nowrap backdrop-blur-sm shadow-lg">
              {activeSceneIndex === 0 && "Inspecting Runtime"}
              {activeSceneIndex === 1 && "Pinging John Deere 5310"}
              {activeSceneIndex === 2 && "Filtering Latin America Hubs"}
              {activeSceneIndex === 3 && "Dispatched Field Mechanic"}
              {activeSceneIndex === 4 && "Regional Campaign Analytics"}
            </div>
          </div>
        </div>

        {/* SCENE 1: Dealer Command Center Overview */}
        {activeSceneIndex === 0 && (
          <div className="w-full h-full max-w-[1220px] mx-auto flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500">
            {/* Top Bar Mockup */}
            <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#4A0000] border border-white/10 shadow-lg text-xs mb-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-black text-white text-xs">
                  HT
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Dealer Command Center</div>
                  <div className="text-[10px] text-white/70">Live telemetry from 200+ connected tractors</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Real-Time Shift Active</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-red-700 font-bold text-[11px] shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online • API Connected</span>
                </div>
              </div>
            </div>

            {/* 4 Core KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 flex-1 mb-3">
              {/* Card 1: Total Customers */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#A10A0C] to-[#3B0404] border border-white/10 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Total Customers</span>
                  <div className="p-1.5 rounded-full bg-white/20">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">1,482</div>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>+14.2% live growth</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full" />
                </div>
              </div>

              {/* Card 2: Total Active Leases */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#A10A0C] to-[#3B0404] border border-white/10 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Active Machinery Lease</span>
                  <div className="p-1.5 rounded-full bg-white/20">
                    <Store className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">438</div>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Rotavators &amp; Harvesters</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />
                </div>
              </div>

              {/* Card 3: Avg Time Worked */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#A10A0C] to-[#3B0404] border border-white/10 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Avg Equipment Runtime</span>
                  <div className="p-1.5 rounded-full bg-white/20">
                    <Gauge className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="my-1">
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-white">05:37:32</div>
                  <div className="text-[11px] text-emerald-300 font-semibold">+1.2% than yesterday</div>
                </div>
                {/* Dynamic SVG Sparkline */}
                <div className="h-10 w-full bg-white/10 rounded-lg p-1 flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d="M0 24 Q 15 10, 30 18 T 60 8 T 85 14 T 100 4"
                      fill="none"
                      stroke="#F91F1F"
                      strokeWidth="3"
                    />
                    <path
                      d="M0 24 Q 15 10, 30 18 T 60 8 T 85 14 T 100 4 L 100 30 L 0 30 Z"
                      fill="rgba(249, 31, 31, 0.2)"
                    />
                  </svg>
                </div>
              </div>

              {/* Card 4: Leads by Sales Peak Chart */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#A10A0C] to-[#3B0404] border border-white/10 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Leads by Sales Week</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Peak: Fri</span>
                </div>
                {/* Weekday Bars */}
                <div className="flex items-end justify-between h-20 pt-2 gap-1.5">
                  {[
                    { day: "Sun", val: 35, peak: false },
                    { day: "Mon", val: 55, peak: false },
                    { day: "Tue", val: 45, peak: false },
                    { day: "Wed", val: 70, peak: false },
                    { day: "Thu", val: 60, peak: false },
                    { day: "Fri", val: 95, peak: true },
                    { day: "Sat", val: 50, peak: false },
                  ].map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        style={{ height: `${d.val}%` }}
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          d.peak
                            ? "bg-gradient-to-t from-orange-600 to-amber-400 shadow-lg shadow-orange-500/50"
                            : "bg-white/30"
                        }`}
                      />
                      <span className="text-[9px] text-white/70 font-mono">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Live Customer Roster Stream */}
            <div className="rounded-xl bg-gradient-to-r from-[#8B0000]/90 to-[#4A0000]/90 border border-white/10 p-3 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-amber-300" />
                  Live Farmer Machine Dispatches &amp; Verification
                </span>
                <span className="text-[11px] text-white/70">Showing active Latin America &amp; regional deployments</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { name: "Carlos Mendoza", tractor: "John Deere 5310", hours: "6.4 hrs", progress: 85, status: "Active Field Work" },
                  { name: "Alejandro Silva", tractor: "New Holland T6", hours: "4.8 hrs", progress: 65, status: "Tilling Valley Sector" },
                  { name: "Mateo Fernandez", tractor: "Massey Ferguson 4707", hours: "8.1 hrs", progress: 92, status: "Precision Seeding" },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-gray-300">{item.tractor} • {item.hours}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {item.status}
                      </div>
                      <div className="text-[10px] text-white/60 font-mono">{item.progress}% duty</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCENE 2: Live GPS Telematics & Fleet Radar */}
        {activeSceneIndex === 1 && (
          <div className="w-full h-full max-w-[1220px] mx-auto flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500 relative">
            {/* Dark Tactical Map Simulation Canvas */}
            <div className="relative flex-1 rounded-2xl bg-[#090d16] border border-cyan-500/20 overflow-hidden shadow-2xl p-4 flex flex-col justify-between">
              {/* Grid Background Lines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#06b6d4 1px, transparent 1px), linear-gradient(to right, #06b6d410 1px, transparent 1px), linear-gradient(to bottom, #06b6d410 1px, transparent 1px)",
                  backgroundSize: "24px 24px, 48px 48px, 48px 48px",
                }}
              />

              {/* Sweeping Radar Line */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-cyan-500/30 pointer-events-none animate-spin [animation-duration:12s]">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/20 to-transparent origin-bottom-right" />
              </div>

              {/* Top HUD Telematics Status Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>FLEET GPS RADAR &amp; ANTI-THEFT GEOFENCE</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                        32 TRACTORS IN REGION
                      </span>
                    </div>
                    <div className="text-[11px] text-cyan-300 font-mono">
                      LAT: 20.6597° N • LON: 103.3496° W (Jalisco Agricultural Valley)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>GEOFENCE ARMED</span>
                  </div>
                </div>
              </div>

              {/* Interactive Tractor Nodes on Map */}
              <div className="relative flex-1 my-4 flex items-center justify-around">
                {/* Node 1: John Deere 5310 */}
                <div className="relative p-3 rounded-xl bg-black/80 border border-cyan-400/50 backdrop-blur-md shadow-2xl flex items-center gap-3 animate-pulse [animation-duration:3s]">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-green-900 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    JD53
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>John Deere 5310</span>
                      <span className="text-[10px] text-emerald-400 font-mono">18.4 km/h</span>
                    </div>
                    <div className="text-[10px] text-gray-300 font-mono">2,150 RPM • Fuel 84% • Plowing</div>
                    <div className="text-[9px] text-cyan-400 font-mono">Jalisco Field Plot #14</div>
                  </div>
                </div>

                {/* Node 2: New Holland T6 */}
                <div className="relative p-3 rounded-xl bg-black/80 border border-blue-400/50 backdrop-blur-md shadow-2xl flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    NHT6
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>New Holland T6</span>
                      <span className="text-[10px] text-emerald-400 font-mono">26.2 km/h</span>
                    </div>
                    <div className="text-[10px] text-gray-300 font-mono">2,380 RPM • Fuel 68% • Hauling</div>
                    <div className="text-[9px] text-blue-400 font-mono">Bajío Highway Transit</div>
                  </div>
                </div>

                {/* Node 3: Massey Ferguson 4707 */}
                <div className="relative p-3 rounded-xl bg-black/80 border border-red-400/50 backdrop-blur-md shadow-2xl flex items-center gap-3 hidden sm:flex">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    MF47
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Massey Ferguson 4707</span>
                      <span className="text-[10px] text-amber-400 font-mono">0.0 km/h</span>
                    </div>
                    <div className="text-[10px] text-gray-300 font-mono">Engine Off • Geofence Locked</div>
                    <div className="text-[9px] text-amber-400 font-mono">Dealer Barn Yard Security</div>
                  </div>
                </div>
              </div>

              {/* Bottom Live Telemetry Gauges Bar */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-cyan-500/20 text-xs font-mono">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-[10px] text-gray-400">Average Speed</div>
                    <div className="text-sm font-bold text-white">21.4 km/h</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-gray-400">Total Run Hours</div>
                    <div className="text-sm font-bold text-emerald-400">4,280 hrs</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-[10px] text-gray-400">Fuel Efficiency</div>
                    <div className="text-sm font-bold text-amber-400">4.2 L/hr Avg</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  <div>
                    <div className="text-[10px] text-gray-400">Theft Breaches</div>
                    <div className="text-sm font-bold text-white">0 (Zero Incidents)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 3: Leads CRM & Farmer Conversion Pipeline */}
        {activeSceneIndex === 2 && (
          <div className="w-full h-full max-w-[1220px] mx-auto flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500">
            {/* Top Pipeline Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-950/70 to-[#181111] border border-red-500/30 text-xs mb-3 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-red-500/20 text-red-300">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Dealer Leads CRM &amp; Conversion Pipeline</div>
                  <div className="text-[10px] text-red-300">Automated farmer inquiry routing across Latin America dealer hubs</div>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px]">
                  32% CONVERSION RATE (+6.4%)
                </span>
              </div>
            </div>

            {/* Leads Split & Funnel Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 mb-3">
              {/* Funnel Stage 1: New Regional Inquiries */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#111116] border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300 uppercase">Incoming Inquiries</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold">
                    84 Today
                  </span>
                </div>
                <div className="space-y-2 my-2">
                  {[
                    { farmer: "Carlos Mendoza", loc: "Jalisco Ag Hub", req: "John Deere 5310 (Sales)", time: "3m ago" },
                    { farmer: "Roberto Gomez", loc: "Sinaloa Valley", req: "Precision Planter 8-Row", time: "12m ago" },
                    { farmer: "Santiago Morales", loc: "Bajío Central", req: "Rotavator 7ft Lease", time: "25m ago" },
                  ].map((lead, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{lead.farmer}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{lead.time}</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-medium">{lead.req}</div>
                      <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-red-400" />
                        <span>{lead.loc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-center text-blue-400 font-mono bg-blue-500/10 py-1.5 rounded-lg border border-blue-500/20">
                  Auto-synced via WhatsApp Agri-Bot
                </div>
              </div>

              {/* Funnel Stage 2: Qualified & Field Demos */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#111116] border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300 uppercase">Field Demo Bookings</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
                    42 Scheduled
                  </span>
                </div>
                <div className="space-y-2 my-2">
                  {[
                    { farmer: "Eduardo Ramos", date: "Today 3:30 PM", mach: "John Deere 5310 4WD", rep: "Dealer Field Rep" },
                    { farmer: "Gabriel Torres", date: "Tomorrow 10 AM", mach: "Heavy Disc Harrow", rep: "Guadalajara Hub" },
                    { farmer: "Lucas Vargas", date: "Tomorrow 2 PM", mach: "Precision Harvester", rep: "Demonstration Van" },
                  ].map((demo, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{demo.farmer}</span>
                        <span className="text-[10px] text-amber-400 font-mono font-semibold">{demo.date}</span>
                      </div>
                      <div className="text-[11px] text-gray-200">{demo.mach}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Assigned: {demo.rep}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-center text-amber-400 font-mono bg-amber-500/10 py-1.5 rounded-lg border border-amber-500/20">
                  Demo completion rate: 94%
                </div>
              </div>

              {/* Funnel Stage 3: Closed & Financed Machinery */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#111116] border border-emerald-500/30 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase">Closed &amp; Financed</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    $1.85M Disbursed
                  </span>
                </div>
                <div className="space-y-2 my-2">
                  {[
                    { farmer: "Diego Herrera", val: "$34,500", item: "John Deere 5310 (Direct Delivery)", bank: "Santander Agri Credit" },
                    { farmer: "Andres Castillo", val: "$6,800", item: "Rotavator (Seasonal Lease)", bank: "Pre-approved Holatractor" },
                    { farmer: "Javier Morales", val: "$48,000", item: "New Holland T6 4WD", bank: "BBVA Agro Finance" },
                  ].map((closed, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{closed.farmer}</span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">{closed.val}</span>
                      </div>
                      <div className="text-[11px] text-gray-300">{closed.item}</div>
                      <div className="text-[10px] text-emerald-300/80 mt-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Financed: {closed.bank}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-center text-emerald-400 font-mono bg-emerald-500/10 py-1.5 rounded-lg border border-emerald-500/20">
                  Average Deal Cycle: 4.2 Days
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 4: Workshop Diagnostic Codes & Repair Queue */}
        {activeSceneIndex === 3 && (
          <div className="w-full h-full max-w-[1220px] mx-auto flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500">
            {/* Top Diagnostics Status */}
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-950/80 to-red-950/80 border border-amber-500/30 text-xs mb-3 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Workshop Predictive Maintenance &amp; Diagnostic Codes (DTC)</div>
                  <div className="text-[10px] text-amber-300">Continuous ECU sensor analytics detecting breakdowns before they occur</div>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px]">
                  0 UNSCHEDULED BREAKDOWNS
                </span>
              </div>
            </div>

            {/* Split Repair Grid: DTC Alerts & Active Mechanics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 mb-3">
              {/* Left Column: Live DTC Alert Engine */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#121014] border border-red-500/30 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    Predictive DTC Fault Codes Detected
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-mono text-[10px] font-bold">
                    3 Pending Service
                  </span>
                </div>
                <div className="space-y-2.5 my-2">
                  <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-red-400">DTC P0087 • Fuel Rail Pressure Alert</span>
                      <span className="text-[10px] font-bold text-white bg-red-600 px-2 py-0.5 rounded-full">Urgent</span>
                    </div>
                    <div className="text-xs text-white font-medium mt-1">John Deere 5310 (MX-10-AB-4921)</div>
                    <div className="text-[11px] text-gray-300 mt-0.5">Sensor triggered drop at 2,200 RPM. Recommended: High-pressure fuel filter swap.</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-1">Parts in stock at dealer warehouse: 8 units available</div>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400">DTC P0113 • Air Intake Temp Sensor Drift</span>
                      <span className="text-[10px] font-bold text-white bg-amber-600 px-2 py-0.5 rounded-full">Routine</span>
                    </div>
                    <div className="text-xs text-white font-medium mt-1">New Holland T6 (MX-03-CD-8190)</div>
                    <div className="text-[11px] text-gray-300 mt-0.5">Scheduled for routine 250-hour engine service bundle.</div>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">Average Repair Turnaround</span>
                  <span className="font-bold text-emerald-400">2.4 Hours (Field Service Van)</span>
                </div>
              </div>

              {/* Right Column: Mechanics & Parts Inventory */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#101216] border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300 uppercase">Mechanic Roster &amp; Spare Parts</span>
                  <span className="text-[11px] text-emerald-400 font-mono">3 Techs Dispatched</span>
                </div>
                <div className="space-y-2 my-2">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Mateo Ramirez (Master Tech)</div>
                      <div className="text-[10px] text-gray-300">Assigned: Fuel Pump Overhaul - Jalisco</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                      On-Site (Jalisco)
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Vikram Rathore (Diagnostics)</div>
                      <div className="text-[10px] text-gray-300">Assigned: ECU Firmware Telematics Upgrade</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-mono">
                      In Transit
                    </span>
                  </div>

                  {/* Parts Inventory Gauge */}
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-300">Rotavator Blade Sets (Boron Steel)</span>
                      <span className="text-emerald-400 font-bold">142 In Stock</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[75%] h-full bg-emerald-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[11px] pt-1">
                      <span className="text-gray-300">Hydraulic Oil Filter 10-Micron</span>
                      <span className="text-amber-400 font-bold">18 Left (Reorder Triggered)</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[30%] h-full bg-amber-500 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-center text-gray-400 font-mono bg-white/5 py-1.5 rounded-lg">
                  Automated ERP parts replenishment synced with OEM distributors
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 5: Marketing & Machinery Storefront Analytics */}
        {activeSceneIndex === 4 && (
          <div className="w-full h-full max-w-[1220px] mx-auto flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500">
            {/* Top Marketing Banner */}
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-900 to-amber-900 border border-white/10 text-xs mb-3 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-white/20 text-white">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Dealer Agri-Marketing &amp; Machinery Store Analytics</div>
                  <div className="text-[10px] text-white/80">Regional broadcast campaigns &amp; online equipment inventory showcase</div>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="px-3 py-1 rounded-full bg-white text-red-700 font-bold text-[11px] shadow-sm">
                  +42% ONLINE INQUIRY UPLIFT
                </span>
              </div>
            </div>

            {/* Marketing Metrics Cards (from actual Holatractor Marketing Module) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 flex-1 mb-3">
              <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-red-700 to-red-900 border border-white/10 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Active Popups &amp; Banners</span>
                  <div className="p-1.5 rounded-lg bg-orange-500 text-white">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-4xl font-extrabold text-white">50</div>
                  <div className="text-[11px] text-white/80 mt-1">Active Mandi Geo-promos</div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-6 h-6 rounded bg-gray-400/40" />
                  <div className="w-6 h-6 rounded bg-orange-500" />
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-red-700 to-red-900 border border-white/10 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Farmer Impressions</span>
                  <div className="p-1.5 rounded-lg bg-orange-500 text-white">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-4xl font-extrabold text-white">49,677</div>
                  <div className="text-[11px] text-emerald-300 mt-1">+24.5% this month</div>
                </div>
                <div className="h-6 w-full bg-white/10 rounded p-0.5">
                  <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 L 20 12 L 40 16 L 60 8 L 80 11 L 100 3" fill="none" stroke="#f97316" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-red-700 to-red-900 border border-white/10 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Conversions</span>
                  <div className="p-1.5 rounded-lg bg-orange-500 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-4xl font-extrabold text-white">514</div>
                  <div className="text-[11px] text-white/80 mt-1">Verified machinery bookings</div>
                </div>
                <div className="h-6 w-full bg-white/10 rounded p-0.5">
                  <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 18 L 25 14 L 50 8 L 75 11 L 100 2" fill="none" stroke="#22c55e" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-red-700 to-red-900 border border-white/10 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Conversion Rate</span>
                  <div className="p-1.5 rounded-lg bg-orange-500 text-white">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="my-2">
                  <div className="text-2xl sm:text-4xl font-extrabold text-white">32%</div>
                  <div className="text-[11px] text-amber-300 mt-1">High Intent Mandi Leads</div>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-[32%] h-full bg-amber-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Machinery Store Inventory Spotlight */}
            <div className="rounded-xl bg-[#141216] border border-white/10 p-3 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Store className="w-3.5 h-3.5 text-orange-400" />
                  Dealer Storefront Stock &amp; Machinery Catalog
                </span>
                <span className="text-[11px] text-gray-400">24 Units Ready for Delivery</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">John Deere 5310 4WD</div>
                    <div className="text-[10px] text-emerald-400 font-mono">$24,500 • Available on Lease</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold">
                    Lease Ready
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Shaktiman Heavy Rotavator 7ft</div>
                    <div className="text-[10px] text-emerald-400 font-mono">$3,200 • 6 Units in Stock</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Fast Moving
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">New Holland T6 140HP Agro</div>
                    <div className="text-[10px] text-emerald-400 font-mono">$42,000 • In Stock</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Cinematic Control & Scrubber Bar */}
      <div
        className={`relative z-30 px-3 sm:px-6 py-3 bg-black/80 backdrop-blur-xl border-t border-white/10 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-95 translate-y-0"
        }`}
      >
        {/* Interactive Scrub Bar with Scene Marks */}
        <div
          onClick={handleScrubberClick}
          className="relative w-full h-2 bg-white/15 hover:h-3 rounded-full cursor-pointer mb-3 transition-all overflow-hidden group/bar"
        >
          {/* Progress fill */}
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-400 rounded-full transition-all duration-100 relative"
          >
            {/* Scrubber head */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/bar:scale-100 transition-transform" />
          </div>

          {/* Scene tick marks (every 20%) */}
          {[0, 20, 40, 60, 80].map((pos) => (
            <div
              key={pos}
              style={{ left: `${pos}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-black/50 pointer-events-none"
            />
          ))}
        </div>

        {/* Video Player Controls */}
        <div className="flex items-center justify-between">
          {/* Play/Pause & Restart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={togglePlay}
              className="p-2 sm:p-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-md"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
            </button>

            <button
              onClick={restart}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Restart Showreel"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Time Stamp */}
            <div className="text-xs font-mono text-gray-300 ml-1">
              <span className="font-bold text-white">{formatTime(currentTime)}</span>
              <span className="text-gray-500 mx-1">/</span>
              <span className="text-gray-400">{formatTime(TOTAL_DURATION)}</span>
            </div>
          </div>

          {/* Scene Title in Focus */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-white">{scenes[activeSceneIndex].name}:</span>
            <span className="text-gray-400">{scenes[activeSceneIndex].label}</span>
          </div>

          {/* Right Controls: Audio & Fullscreen */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
