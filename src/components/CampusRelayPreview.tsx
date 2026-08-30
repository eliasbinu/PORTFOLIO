import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const SCREENS = [
  { id: 1, src: '/campusrelay-1.png', title: 'Student Authentication' },
  { id: 2, src: '/campusrelay-2.png', title: 'Delivery Hub & Categories' },
  { id: 3, src: '/campusrelay-3.png', title: 'Instant Runner Dispatch' },
  { id: 4, src: '/campusrelay-4.png', title: 'Scheduled Food Gate ETA' },
  { id: 5, src: '/campusrelay-5.png', title: 'Batched Window Routing' },
];

interface CampusRelayPreviewProps {
  isHovered: boolean;
  onOpenFullscreen?: (index: number) => void;
}

export const CampusRelayPreview: React.FC<CampusRelayPreviewProps> = ({ isHovered, onOpenFullscreen }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Auto cycle screens on hover every 4.5 seconds
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SCREENS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % SCREENS.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + SCREENS.length) % SCREENS.length);
  };

  const prevIdx = (currentIdx - 1 + SCREENS.length) % SCREENS.length;
  const nextIdx = (currentIdx + 1) % SCREENS.length;

  return (
    <div className="relative w-full aspect-[16/10] bg-[#111116] text-white flex items-center justify-center p-2 sm:p-4 select-none overflow-hidden rounded-xs">
      
      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-md"
        title="Previous Screen"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-2 sm:right-4 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-md"
        title="Next Screen"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 3 Phone Display Cards (Maximized Height & Perfectly Centered) */}
      <div className="relative flex items-center justify-center gap-3 sm:gap-6 md:gap-8 h-full w-full py-1">
        
        {/* Left Preview Screen (Previous) */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIdx(prevIdx);
          }}
          className="hidden sm:block relative h-[84%] aspect-[988/2048] rounded-[1.8rem] overflow-hidden shadow-xl border border-white/10 opacity-35 hover:opacity-75 transition-all duration-500 cursor-pointer scale-95 -rotate-2 [transform:translateZ(0)]"
          title={`View ${SCREENS[prevIdx].title}`}
        >
          <img
            src={SCREENS[prevIdx].src}
            alt={SCREENS[prevIdx].title}
            className="w-full h-full object-cover block"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Main Hero Phone (CENTERED & LARGE) - Click to Open Fullscreen */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onOpenFullscreen?.(currentIdx);
          }}
          className="relative h-[94%] aspect-[988/2048] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-2 border-white/25 bg-black cursor-pointer group/phone [transform:translateZ(0)] will-change-transform z-20 hover:scale-[1.02] transition-transform duration-300"
          title="Click to expand full screen"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <img
                src={SCREENS[currentIdx].src}
                alt={SCREENS[currentIdx].title}
                className="w-full h-full object-cover block"
                loading="eager"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/phone:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white text-black text-xs font-mono px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl font-medium">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>FULL VIEW</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Preview Screen (Next) */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIdx(nextIdx);
          }}
          className="hidden sm:block relative h-[84%] aspect-[988/2048] rounded-[1.8rem] overflow-hidden shadow-xl border border-white/10 opacity-35 hover:opacity-75 transition-all duration-500 cursor-pointer scale-95 rotate-2 [transform:translateZ(0)]"
          title={`View ${SCREENS[nextIdx].title}`}
        >
          <img
            src={SCREENS[nextIdx].src}
            alt={SCREENS[nextIdx].title}
            className="w-full h-full object-cover block"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

      </div>

    </div>
  );
};
