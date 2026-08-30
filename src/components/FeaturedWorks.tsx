import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleText } from './ScrambleText';
import { BookFlipPreview } from './BookFlipPreview';
import { CampusRelayPreview } from './CampusRelayPreview';
import { CampusRelayModal } from './CampusRelayModal';
import { NewspaperReaderModal } from './NewspaperReaderModal';
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
    id: 'nexus',
    number: '03',
    title: 'NEXUS SOUND LABS',
    subtitle: 'Spatial Audio & Procedural Synthesizer',
    year: '2024',
    description: 'An interactive browser-based spatial sound synthesizer powered by Web Audio API and WebGL shader visualizers, translating kinetic pointer motion into ambient generative soundscapes.',
    align: 'left',
    bgGradient: 'from-[#dedede] via-[#c8c8c8] to-[#9e9e9e]',
    accentColor: '#8b5cf6',
    tags: ['GLSL SHADERS', 'AUDIO API', 'CREATIVE CODE', 'VITE'],
  },
];

export const FeaturedWorks: React.FC = () => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false);
  const [isTribuneRevealed, setIsTribuneRevealed] = useState<boolean>(false);
  const [isCampusRelayRevealed, setIsCampusRelayRevealed] = useState<boolean>(false);
  const [isCampusRelayModalOpen, setIsCampusRelayModalOpen] = useState<boolean>(false);
  const [selectedScreenIdx, setSelectedScreenIdx] = useState<number>(0);

  return (
    <section id="works" className="relative w-full min-h-screen bg-white text-[#0e0e0e] select-none pt-16 md:pt-24 pb-44 border-t border-black/5">
      <NewspaperReaderModal isOpen={isReaderOpen} onClose={() => setIsReaderOpen(false)} />
      <CampusRelayModal
        isOpen={isCampusRelayModalOpen}
        initialIndex={selectedScreenIdx}
        onClose={() => setIsCampusRelayModalOpen(false)}
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
                      if (!project.isBook && !project.isApp) {
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

                        {/* Smooth Cover Overlay (Poppy High-Energy Design with Clean Bold Logotype) */}
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
                              {/* Background Kinetic Runner Motion Blur & Radial Shimmer Texture */}
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

                              {/* Center Bold Emblem & Logotype (Hero Logo Hierarchy) */}
                              <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10">
                                
                                {/* Hero Symmetrical 8-Wing Kinetic Relay Starburst Emblem */}
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

                                {/* Refined Logotype */}
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

                        {/* Smooth Cover Overlay (Vibrant Electric Cobalt Editorial Design) */}
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
                              {/* Background Archival Editorial Grid & Cyan Shimmer Mesh Texture */}
                              <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
                                <div className="absolute -left-12 -top-12 w-96 h-96 rounded-full bg-cyan-400/40 blur-3xl animate-pulse" />
                                <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-white/25 via-transparent to-transparent blur-xl transform -skew-x-12" />
                              </div>

                              {/* Top Bar inside Cover with Matching #02 Pill Badge */}
                              <div className="flex justify-between items-start text-white relative z-10">
                                <span className="font-mono text-xs tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1">
                                  #{project.number}
                                </span>
                                <div className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-500 shadow-sm">
                                  <ArrowUpRight className="w-4 h-4" />
                                </div>
                              </div>

                              {/* Center Pure Gothic Blackletter Masthead (Clean, Bold, No Middle Logo) */}
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
                    ) : (
                      /* PROJECT 03: Standard Card */
                      <motion.div
                        whileHover={{ scale: 1.015 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative aspect-[16/10] w-full p-8 md:p-12 shadow-2xl bg-gradient-to-br ${project.bgGradient} overflow-hidden flex flex-col justify-between cursor-pointer will-change-transform rounded-xs`}
                      >
                        {/* Top Bar inside Card */}
                        <div className="flex justify-between items-start text-white">
                          <span className="font-mono text-xs tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1">
                            #{project.number}
                          </span>
                          <div className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Center Monogram / Graphic */}
                        <div className="flex items-center justify-center my-6">
                          <span className="font-['Oswald'] font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white/95 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] text-center">
                            {project.title.split(' ')[0]}
                          </span>
                        </div>

                        {/* Yellow "VIEW PROJECT" Floating Pill */}
                        <div className="flex justify-center items-center">
                          <div className="bg-[#eab308] text-black font-mono text-xs uppercase font-medium tracking-widest px-6 py-2.5 shadow-xl flex items-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 group-hover:-translate-y-1.5">
                            <span>VIEW PROJECT</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </motion.div>
                    )}
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
                            className="text-[10px] font-mono uppercase bg-black/[0.04] text-black/75 px-3 py-1.5 rounded-xs"
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
