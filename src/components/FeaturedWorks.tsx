import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleText } from './ScrambleText';
import { BookFlipPreview } from './BookFlipPreview';
import { CampusRelayPreview } from './CampusRelayPreview';
import { CampusRelayModal } from './CampusRelayModal';
import { NewspaperReaderModal } from './NewspaperReaderModal';
import { FraudGuardPreview } from './FraudGuardPreview';
import { FraudGuardModal } from './FraudGuardModal';
import { FinterraPreview } from './FinterraPreview';
import { FinterraModal } from './FinterraModal';
import { ArrowUpRight, X } from 'lucide-react';

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  align: 'left' | 'right';
  bgGradient: string;
  accentColor: string;
  tags: string[];
  isBook?: boolean;
  isApp?: boolean;
  isFraudGuard?: boolean;
  isFinterra?: boolean;
  sideImage?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'campusrelay',
    number: '01',
    title: 'CAMPUSRELAY',
    subtitle: 'Peer-to-Peer Campus Logistics & Delivery Platform',
    year: '2025',
    description: 'An on-demand campus delivery ecosystem built for university students, featuring multi-lane order batching, gate-to-hostel peer routing, live runner dispatch, and credit-based micropayments.',
    align: 'left',
    bgGradient: 'from-[#dfdfdf] via-[#cecece] to-[#a8a8a8]',
    accentColor: '#0e0e0e',
    tags: ['REACT NATIVE', 'EXPO', 'SUPABASE', 'LOGISTICS ENGINE', 'UI/UX DESIGN'],
    isApp: true,
  },
  {
    id: 'tribune',
    number: '02',
    title: 'THE PETERIAN TRIBUNE',
    subtitle: 'Editorial Publication & Archival Newsletter',
    year: '2024',
    description: 'Designed and published the official school newsletter and magazine publication, structuring multi-column editorial spreads, alumni spotlight interviews, cultural poetry, and commemorative photo archives.',
    align: 'right',
    bgGradient: 'from-[#eaeaea] via-[#eaeaea] to-[#eaeaea]',
    accentColor: '#0e0e0e',
    tags: ['EDITORIAL DESIGN', 'TYPESETTING', 'NEWSLETTER', 'PUBLICATION ARCHIVE'],
    isBook: true,
  },
  {
    id: 'fraudguard',
    number: '03',
    title: 'FRAUDGUARD CORE',
    subtitle: 'Real-Time UPI Telemetry & Account Risk Profiling',
    year: '2025',
    description: 'An autonomous fintech security engine designed for real-time UPI transaction monitoring. Features explainable risk forensics scoring, dynamic contextual anomaly dampeners, baseline geofence tracking, and adaptive step-up multi-factor 2FA with biometric face scans and simulated SMS challenges.',
    align: 'left',
    bgGradient: 'from-[#09090b] via-[#121217] to-[#040405]',
    accentColor: '#22c55e',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'FINTECH TELEMETRY', 'UPI RISK ENGINE', 'BIOMETRIC 2FA', 'TAILWIND CSS'],
    isFraudGuard: true,
  },
  {
    id: 'finterra',
    number: '04',
    title: 'FINTERRA',
    subtitle: 'Satellite Computer Vision & Agritech Underwriting Engine',
    year: '2025',
    description: 'Flagship autonomous agricultural underwriting platform that leverages ESA Sentinel-2 multispectral satellite imagery, ISRIC SoilGrids geochemistry, and cadastral GIS boundaries to calculate crop vitality (NDVI), assess collateral quality, and automate institutional loan sanctions.',
    align: 'right',
    bgGradient: 'from-[#07132c] via-[#091a26] to-[#030d12]',
    accentColor: '#22c55e',
    tags: ['FLAGSHIP PROJECT', 'SATELLITE COMPUTER VISION', 'PYTHON UNDERWRITING', 'GIS TELEMETRY', 'SENTINEL-2 NDVI', 'NEXT.JS', 'TAILWIND CSS'],
    isFinterra: true,
  },
];

export const FeaturedWorks: React.FC = () => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false);
  const [isTribuneRevealed, setIsTribuneRevealed] = useState<boolean>(false);
  const [isCampusRelayRevealed, setIsCampusRelayRevealed] = useState<boolean>(false);
  const [isCampusRelayModalOpen, setIsCampusRelayModalOpen] = useState<boolean>(false);
  const [selectedScreenIdx, setSelectedScreenIdx] = useState<number>(0);

  // FraudGuard Interactive State
  const [isFraudGuardRevealed, setIsFraudGuardRevealed] = useState<boolean>(false);
  const [isFraudGuardModalOpen, setIsFraudGuardModalOpen] = useState<boolean>(false);
  const [selectedFraudGuardSlide, setSelectedFraudGuardSlide] = useState<number>(0);

  // Finterra Flagship Interactive State
  const [isFinterraRevealed, setIsFinterraRevealed] = useState<boolean>(false);
  const [isFinterraModalOpen, setIsFinterraModalOpen] = useState<boolean>(false);
  const [selectedFinterraSlide, setSelectedFinterraSlide] = useState<number>(0);

  return (
    <section id="works" className="relative w-full min-h-screen bg-white text-[#0e0e0e] select-none pt-16 md:pt-24 pb-44 border-t border-black/5">
      {/* Fullscreen Modals */}
      <NewspaperReaderModal isOpen={isReaderOpen} onClose={() => setIsReaderOpen(false)} />
      <CampusRelayModal
        isOpen={isCampusRelayModalOpen}
        initialIndex={selectedScreenIdx}
        onClose={() => setIsCampusRelayModalOpen(false)}
      />
      <FraudGuardModal
        isOpen={isFraudGuardModalOpen}
        initialIndex={selectedFraudGuardSlide}
        onClose={() => setIsFraudGuardModalOpen(false)}
      />
      <FinterraModal
        isOpen={isFinterraModalOpen}
        initialIndex={selectedFinterraSlide}
        onClose={() => setIsFinterraModalOpen(false)}
      />

      <div className="w-full max-w-[94rem] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        
        {/* Section Intro: FEATURED WORK with Scramble Animation */}
        <div className="overflow-hidden pb-6 md:pb-8 text-left border-b border-black/10 mb-8 md:mb-12">
          <ScrambleText
            text="FEATURED WORK"
            startIndex={3}
            className="font-['Oswald'] font-black text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] leading-[0.84] tracking-tight uppercase text-[#0e0e0e] select-none text-left"
          />
          <div className="flex items-center gap-2 mt-3 text-xs font-mono text-black/40 uppercase tracking-widest">
            <span>[HOVER OVER TILES TO REVEAL DETAILS • CLICK TO VIEW LIVE APPS & PUBLICATIONS]</span>
          </div>
        </div>

        {/* Alternating Project Cards Stack with Extreme Left/Right Alignment */}
        <div className="space-y-32 md:space-y-40">
          {PROJECTS.map((project) => {
            const isLeft = project.align === 'left';
            const isHovered = hoveredProjectId === project.id;

            return (
              <div 
                key={project.id} 
                className="group relative w-full"
              >
                {/* 1. Main Project Heading Above the Block */}
                <div 
                  className={`transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] mb-10 md:mb-14 lg:mb-16 text-left will-change-transform ${
                    isHovered 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 -translate-y-8 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-black/40 mb-3">
                    <span>({project.number})</span>
                    <span>•</span>
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.subtitle}</span>
                  </div>
                  <h3 className="font-['Oswald'] font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.8rem] leading-[0.84] tracking-tight uppercase text-[#0e0e0e]">
                    {project.title}
                  </h3>
                </div>

                {/* 2. Extreme Left / Right Split Row */}
                <div 
                  className={`flex flex-col ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center justify-between gap-10 md:gap-16 lg:gap-24 w-full`}
                >
                  {/* Visual Block Card */}
                  <div 
                    className={`w-full ${project.isBook ? (isTribuneRevealed ? 'lg:w-[60%]' : 'lg:w-[56%]') : 'lg:w-[56%]'} shrink-0`}
                    onMouseEnter={() => {
                      setHoveredProjectId(project.id);
                      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(8);
                    }}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    onClick={() => {
                      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
                      if (!project.isBook && !project.isApp && !project.isFraudGuard && !project.isFinterra) {
                        setHoveredProjectId((prev) => (prev === project.id ? null : project.id));
                      }
                    }}
                  >
                    {project.isApp ? (
                      /* PROJECT 01: CAMPUSRELAY (Persistent Interactive Mobile Showcase with Smooth Cover) */
                      <div className="relative w-full rounded-xs overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-[#111116]">
                        
                        {/* Revealed Mobile Screen Showcase (Maximized Visual Stage) */}
                        <motion.div 
                          animate={{ 
                            scale: isCampusRelayRevealed ? 1 : 0.98,
                            opacity: isCampusRelayRevealed ? 1 : 0.8,
                          }}
                          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full relative [transform:translateZ(0)] will-change-transform"
                        >
                          {/* Floating Close Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCampusRelayRevealed(false);
                            }}
                            className="absolute top-3 right-3 z-40 hover:text-white bg-black/60 hover:bg-black/90 px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer font-mono text-xs text-white/80 backdrop-blur-md border border-white/10 shadow-lg"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>CLOSE COVER</span>
                          </button>

                          <CampusRelayPreview
                            isHovered={isHovered}
                            onOpenFullscreen={(idx) => {
                              setSelectedScreenIdx(idx);
                              setIsCampusRelayModalOpen(true);
                            }}
                          />
                        </motion.div>

                        {/* Smooth Cover Overlay */}
                        <AnimatePresence>
                          {!isCampusRelayRevealed && (
                            <motion.div
                              key="campusrelay-cover"
                              initial={{ y: 0, opacity: 1 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ 
                                y: '-102%',
                                opacity: 0.98,
                                transition: { 
                                  duration: 1.1, 
                                  ease: [0.16, 1, 0.3, 1],
                                } 
                              }}
                              style={{
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                              }}
                              className="absolute inset-0 z-30 w-full h-full bg-gradient-to-br from-[#ff4500] via-[#ff6200] to-[#e63800] shadow-2xl p-8 md:p-12 flex flex-col justify-between cursor-pointer group/cover select-none aspect-[16/10] overflow-hidden"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                                setIsCampusRelayRevealed(true);
                              }}
                            >
                              {/* Background Texture */}
                              <div className="absolute inset-0 pointer-events-none opacity-35 mix-blend-overlay">
                                <div className="absolute -right-12 -top-12 w-96 h-96 rounded-full bg-white/40 blur-3xl animate-pulse" />
                                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/30 via-transparent to-transparent blur-xl transform skew-x-12" />
                              </div>

                              {/* Top Bar inside Cover with Matching #01 Pill Badge */}
                              <div className="flex justify-between items-start text-white relative z-10">
                                <span className="font-mono text-xs tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1">
                                  #{project.number}
                                </span>
                                <div className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-500 shadow-sm">
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>

                              {/* Center Bold Emblem & Logotype */}
                              <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10">
                                
                                <div className="w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-3 sm:mb-4 text-[#0e0e0e] group-hover/cover:rotate-45 group-hover/cover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-md">
                                  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                                    <g transform="translate(50,50)">
                                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                        <path
                                          key={angle}
                                          transform={`rotate(${angle})`}
                                          d="M-5.5,-40 L5.5,-40 L5.5,-18 C5.5,-13 2.5,-10 0,-10 C-2.5,-10 -5.5,-13 -5.5,-18 Z"
                                        />
                                      ))}
                                    </g>
                                  </svg>
                                </div>

                                <div className="font-['Oswald'] font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4.4rem] leading-[0.88] uppercase tracking-tight text-[#0e0e0e] drop-shadow-sm group-hover/cover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-start justify-center">
                                  <span>CAMPUSRELAY</span>
                                  <span className="text-base sm:text-lg md:text-xl font-bold font-sans ml-1 text-[#0e0e0e] select-none -translate-y-1 sm:-translate-y-1.5">
                                    ®
                                  </span>
                                </div>
                              </div>

                              {/* Yellow "VIEW PROJECT" Floating Pill */}
                              <div className="flex justify-center items-center relative z-10">
                                <div className="bg-[#eab308] group-hover/cover:bg-[#facc15] text-black font-mono text-xs uppercase font-medium tracking-widest px-8 py-3.5 shadow-2xl flex items-center gap-2 transition-all duration-500 group-hover/cover:scale-105 group-hover/cover:-translate-y-1">
                                  <span>VIEW PROJECT</span>
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    ) : project.isBook ? (
                      /* PROJECT 02: THE PETERIAN TRIBUNE (Persistent Interactive Book with Smooth Cover) */
                      <div className="relative w-full rounded-xs overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-[#eaeaea] p-3.5 sm:p-4.5 md:p-5">
                        
                        {/* Revealed Newspaper Book */}
                        <motion.div 
                          animate={{ 
                            scale: isTribuneRevealed ? 1 : 0.98,
                            opacity: isTribuneRevealed ? 1 : 0.8,
                          }}
                          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full flex flex-col justify-between [transform:translateZ(0)] will-change-transform"
                        >
                          {/* Top Control Bar */}
                          <div className="flex justify-between items-center mb-3 px-1 text-black/50 text-[11px] font-mono tracking-widest uppercase">
                            <span className="text-black/70">
                              CLICK PAGES TO READ FULLSCREEN
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsTribuneRevealed(false);
                              }}
                              className="hover:text-black bg-black/5 hover:bg-black/10 px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1 cursor-pointer font-mono"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>CLOSE COVER</span>
                            </button>
                          </div>

                          <div onClick={() => setIsReaderOpen(true)} className="cursor-pointer">
                            <BookFlipPreview isHovered={isHovered} />
                          </div>
                        </motion.div>

                        {/* Smooth Cover Overlay */}
                        <AnimatePresence>
                          {!isTribuneRevealed && (
                            <motion.div
                              key="cover-overlay"
                              initial={{ y: 0, opacity: 1 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ 
                                y: '-102%',
                                opacity: 0.98,
                                transition: { 
                                  duration: 1.1, 
                                  ease: [0.16, 1, 0.3, 1],
                                } 
                              }}
                              style={{
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                              }}
                              className="absolute inset-0 z-30 w-full h-full bg-gradient-to-br from-[#002b9e] via-[#001f78] to-[#001048] shadow-2xl p-8 md:p-12 flex flex-col justify-between cursor-pointer group/cover select-none aspect-[16/10] overflow-hidden"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                                setIsTribuneRevealed(true);
                              }}
                            >
                              {/* Background Texture */}
                              <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
                                <div className="absolute -left-12 -top-12 w-96 h-96 rounded-full bg-cyan-400/40 blur-3xl animate-pulse" />
                                <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-white/25 via-transparent to-transparent blur-xl transform -skew-x-12" />
                              </div>

                              {/* Top Bar inside Cover */}
                              <div className="flex justify-between items-start text-white relative z-10">
                                <span className="font-mono text-xs tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1">
                                  #{project.number}
                                </span>
                                <div className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-500 shadow-sm">
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>

                              {/* Center Pure Gothic Blackletter Masthead */}
                              <div className="flex flex-col items-center justify-center my-auto py-6 px-4 relative z-10 text-center w-full">
                                <h2 className="font-['UnifrakturMaguntia',serif] text-5xl sm:text-6xl md:text-7xl lg:text-[6.6rem] leading-[0.92] text-white drop-shadow-[0_8px_25px_rgba(0,0,0,0.45)] group-hover/cover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-normal select-none">
                                  Peterian Tribune
                                </h2>
                              </div>

                              {/* Yellow "VIEW PUBLICATION" Floating Pill */}
                              <div className="flex justify-center items-center relative z-10">
                                <div className="bg-[#eab308] group-hover/cover:bg-[#facc15] text-black font-mono text-xs uppercase font-medium tracking-widest px-8 py-3.5 shadow-2xl flex items-center gap-2 transition-all duration-500 group-hover/cover:scale-105 group-hover/cover:-translate-y-1">
                                  <span>VIEW PUBLICATION</span>
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    ) : project.isFraudGuard ? (
                      /* PROJECT 03: FRAUDGUARD CORE (Interactive 3-Second Delay Slideshow with Smooth Cover) */
                      <div className="relative w-full rounded-xs overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-[#09090b]">
                        
                        {/* Revealed 3-Second Automatic Delay Slideshow */}
                        <motion.div 
                          animate={{ 
                            scale: isFraudGuardRevealed ? 1 : 0.98,
                            opacity: isFraudGuardRevealed ? 1 : 0.8,
                          }}
                          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full relative [transform:translateZ(0)] will-change-transform"
                        >
                          {/* Floating Close Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsFraudGuardRevealed(false);
                            }}
                            className="absolute top-3 right-16 z-40 hover:text-white bg-black/70 hover:bg-black px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer font-mono text-xs text-white/80 backdrop-blur-md border border-white/10 shadow-lg"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>CLOSE COVER</span>
                          </button>

                          <FraudGuardPreview
                            isHovered={isHovered}
                            isPlaying={isFraudGuardRevealed}
                            onOpenFullscreen={(idx) => {
                              setSelectedFraudGuardSlide(idx);
                              setIsFraudGuardModalOpen(true);
                            }}
                          />
                        </motion.div>

                        {/* Smooth Cover Overlay */}
                        <AnimatePresence>
                          {!isFraudGuardRevealed && (
                            <motion.div
                              key="fraudguard-cover"
                              initial={{ y: 0, opacity: 1 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ 
                                y: '-102%',
                                opacity: 0.98,
                                transition: { 
                                  duration: 1.1, 
                                  ease: [0.16, 1, 0.3, 1],
                                } 
                              }}
                              style={{
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                              }}
                              className="absolute inset-0 z-30 w-full h-full bg-gradient-to-br from-[#0c0d12] via-[#08090d] to-[#040406] shadow-2xl p-8 md:p-12 flex flex-col justify-between cursor-pointer group/cover select-none aspect-[16/10] overflow-hidden border border-white/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                                setIsFraudGuardRevealed(true);
                              }}
                            >
                              {/* Background Texture */}
                              <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
                                <div className="absolute -right-16 -top-16 w-[28rem] h-[28rem] rounded-full bg-[#22c55e]/15 blur-3xl animate-pulse" />
                                <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-[#3b82f6]/10 blur-3xl" />
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
                              </div>

                              {/* Top Bar inside Cover */}
                              <div className="flex justify-between items-start text-white relative z-10">
                                <span className="font-mono text-xs tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                                  #{project.number}
                                </span>
                                <div className="w-9 h-9 rounded-full bg-white/10 group-hover/cover:bg-[#eab308] text-white group-hover/cover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-500 shadow-sm">
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>

                              {/* Center Bold Shield Emblem & Title */}
                              <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10 text-center">
                                
                                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 text-[#22c55e] group-hover/cover:scale-110 group-hover/cover:text-[#eab308] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-full h-full">
                                    <path d="M50 10 L85 24 V52 C85 72 50 90 50 90 C50 90 15 72 15 52 V24 Z" stroke="currentColor" fill="currentColor" fillOpacity="0.08" />
                                    <path d="M50 22 L75 32 V52 C75 66 50 80 50 80 C50 80 25 66 25 52 V32 Z" stroke="currentColor" strokeDasharray="3 3" />
                                    <circle cx="50" cy="50" r="12" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
                                    <path d="M50 42 V58 M42 50 H58" stroke="currentColor" strokeWidth="2.5" />
                                  </svg>
                                </div>

                                <div className="font-['Oswald'] font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[0.88] uppercase tracking-tight text-white drop-shadow-md group-hover/cover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                  <span>FRAUDGUARD CORE</span>
                                </div>
                              </div>

                              {/* Yellow "VIEW PROJECT" Floating Pill */}
                              <div className="flex justify-center items-center relative z-10">
                                <div className="bg-[#eab308] group-hover/cover:bg-[#facc15] text-black font-mono text-xs uppercase font-medium tracking-widest px-8 py-3.5 shadow-2xl flex items-center gap-2 transition-all duration-500 group-hover/cover:scale-105 group-hover/cover:-translate-y-1">
                                  <span>VIEW PROJECT</span>
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    ) : project.isFinterra ? (
                      /* PROJECT 04: FINTERRA (Flagship Satellite Computer Vision & Agritech Underwriting Engine) */
                      <div className="relative w-full rounded-xs overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-[#f4f7f5]">
                        
                        {/* Revealed 3-Second Delay Slideshow Stage */}
                        <motion.div 
                          animate={{ 
                            scale: isFinterraRevealed ? 1 : 0.98,
                            opacity: isFinterraRevealed ? 1 : 0.8,
                          }}
                          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full relative [transform:translateZ(0)] will-change-transform"
                        >
                          {/* Floating Close Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsFinterraRevealed(false);
                            }}
                            className="absolute top-3 right-16 z-40 hover:text-black bg-white/80 hover:bg-white px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer font-mono text-xs text-black/80 backdrop-blur-md border border-black/10 shadow-sm"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>CLOSE COVER</span>
                          </button>

                          <FinterraPreview
                            isHovered={isHovered}
                            isPlaying={isFinterraRevealed}
                            onOpenFullscreen={(idx) => {
                              setSelectedFinterraSlide(idx);
                              setIsFinterraModalOpen(true);
                            }}
                          />
                        </motion.div>

                        {/* Smooth Cover Overlay (Darker Rich Forest & Agritech Green with Two-Tone Logotype) */}
                        <AnimatePresence>
                          {!isFinterraRevealed && (
                            <motion.div
                              key="finterra-cover"
                              initial={{ y: 0, opacity: 1 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ 
                                y: '-102%',
                                opacity: 0.98,
                                transition: { 
                                  duration: 1.1, 
                                  ease: [0.16, 1, 0.3, 1],
                                } 
                              }}
                              style={{
                                willChange: 'transform',
                                transform: 'translateZ(0)',
                              }}
                              className="absolute inset-0 z-30 w-full h-full bg-gradient-to-br from-[#0e281a] via-[#091b11] to-[#040e08] shadow-2xl p-6 sm:p-8 md:p-12 flex flex-col justify-between cursor-pointer group/cover select-none aspect-[16/10] overflow-hidden border border-emerald-500/25"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                                setIsFinterraRevealed(true);
                              }}
                            >
                              {/* Background Organic Satellite & Polygonal Mesh Glow */}
                              <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
                                <div className="absolute -right-16 -top-16 w-[30rem] h-[30rem] rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
                                <div className="absolute -left-16 -bottom-16 w-96 h-96 rounded-full bg-green-500/10 blur-3xl" />
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:28px_28px]" />
                              </div>

                              {/* Top Bar inside Cover with Matching #04 Pill Badge */}
                              <div className="flex justify-between items-start text-white relative z-10">
                                <span className="font-mono text-xs tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                                  #{project.number}
                                </span>
                                <div className="w-9 h-9 rounded-full bg-white/15 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-500 shadow-sm">
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>

                              {/* Center Official Logo & Two-Tone Logotype */}
                              <div className="relative flex flex-col items-center justify-center my-auto py-2 z-10 text-center w-full">
                                {/* Official Finterra Circular Logo with Ambient Emerald Glow */}
                                <div className="relative mb-3 sm:mb-4 group-hover/cover:scale-110 group-hover/cover:rotate-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                  <div className="absolute inset-0 rounded-full bg-emerald-400/25 blur-2xl group-hover/cover:bg-emerald-400/40 transition-all duration-700 pointer-events-none" />
                                  <img 
                                    src="/finterra-logo-circle.png" 
                                    alt="FINTERRA Logo" 
                                    className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] [image-rendering:-webkit-optimize-contrast]"
                                    loading="eager"
                                  />
                                </div>

                                {/* Two-Tone Bold FINTERRA Heading */}
                                <div className="font-['Oswald'] font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] leading-[0.85] uppercase tracking-tight drop-shadow-[0_6px_25px_rgba(0,0,0,0.9)] group-hover/cover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center select-none">
                                  <span className="text-white">FIN</span>
                                  <span className="text-[#22c55e]">TERRA</span>
                                </div>
                              </div>

                              {/* Yellow "VIEW PROJECT" Floating Pill */}
                              <div className="flex justify-center items-center relative z-10">
                                <div className="bg-[#eab308] group-hover/cover:bg-[#facc15] text-black font-mono text-xs uppercase font-medium tracking-widest px-8 py-3.5 shadow-2xl flex items-center gap-2 transition-all duration-500 group-hover/cover:scale-105 group-hover/cover:-translate-y-1">
                                  <span>VIEW PROJECT</span>
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    ) : null}
                  </div>

                  {/* Text Description on Opposite Side */}
                  <div className="w-full lg:w-[38%] min-h-[160px] flex flex-col justify-center text-left relative">
                    <div
                      className={`transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                        isHovered 
                          ? 'opacity-100 translate-y-0 pointer-events-auto delay-75' 
                          : 'opacity-0 translate-y-8 pointer-events-none'
                      }`}
                    >
                      <p className="text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed text-black/85">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-black/10">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-mono uppercase px-3 py-1.5 rounded-xs ${
                              tag === 'FLAGSHIP PROJECT'
                                ? 'bg-[#eab308] text-black font-bold'
                                : 'bg-black/[0.04] text-black/75'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Idle state subtle watermark */}
                    <div 
                      className={`absolute inset-0 flex items-center transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                        isHovered ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
                      }`}
                    >
                      <span className="hidden lg:block text-black/20 font-mono text-xs tracking-widest uppercase">
                        [HOVER TILE TO REVEAL STORY]
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
