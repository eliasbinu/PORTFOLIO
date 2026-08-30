import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Smartphone, CheckCircle } from 'lucide-react';

const SCREENS = [
  { id: 1, src: '/campusrelay-1.png', thumb: '/campusrelay-thumb-1.png', title: 'Student Authentication', subtitle: 'VIT University Institute Single Sign-On' },
  { id: 2, src: '/campusrelay-2.png', thumb: '/campusrelay-thumb-2.png', title: 'Delivery Hub & Categories', subtitle: 'Parcel, Scheduled Food & Instant Lanes' },
  { id: 3, src: '/campusrelay-3.png', thumb: '/campusrelay-thumb-3.png', title: 'Instant Runner Dispatch', subtitle: 'Real-Time Match with Active Gate Runners' },
  { id: 4, src: '/campusrelay-4.png', thumb: '/campusrelay-thumb-4.png', title: 'Scheduled Food Gate ETA', subtitle: 'Zomato / Swiggy Restaurant ETA Matching' },
  { id: 5, src: '/campusrelay-5.png', thumb: '/campusrelay-thumb-5.png', title: 'Batched Window Routing', subtitle: 'Standard Multi-Order Campus Batching' },
];

interface CampusRelayModalProps {
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

export const CampusRelayModal: React.FC<CampusRelayModalProps> = ({ isOpen, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen) return;
    const nextIdx = (currentIndex + 1) % SCREENS.length;
    const prevIdx = (currentIndex - 1 + SCREENS.length) % SCREENS.length;
    const img1 = new Image();
    img1.src = SCREENS[nextIdx].src;
    const img2 = new Image();
    img2.src = SCREENS[prevIdx].src;
  }, [currentIndex, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Space') {
        setCurrentIndex((prev) => (prev < SCREENS.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : SCREENS.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const next = () => setCurrentIndex((prev) => (prev < SCREENS.length - 1 ? prev + 1 : 0));
  const prev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : SCREENS.length - 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/92 backdrop-blur-md text-white select-none p-3 sm:p-5"
          onClick={onClose}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-7xl flex items-center justify-between z-50 py-1.5 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>CAMPUSRELAY</span>
              </div>
              <span className="hidden sm:inline text-xs font-mono text-white/60 tracking-wider">
                {SCREENS[currentIndex].title} — {SCREENS[currentIndex].subtitle}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-3.5 py-1 rounded-full text-xs font-mono text-white/80 tracking-widest uppercase">
                SCREEN {currentIndex + 1} OF {SCREENS.length}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Stage: High-Resolution Phone Mockup */}
          <div
            className="relative w-full flex-1 flex items-center justify-center py-2 overflow-hidden max-h-[82vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Arrow */}
            <button
              onClick={prev}
              className="absolute left-2 sm:left-6 md:left-12 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all shadow-2xl cursor-pointer"
              title="Previous Screen (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Centered Phone Screen */}
            <div className="relative h-full aspect-[988/2048] max-h-[78vh] rounded-[2.5rem] overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.9)] border-[6px] border-[#1e1e24] bg-black [transform:translateZ(0)] will-change-transform">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="w-full h-full relative"
                >
                  <img
                    src={SCREENS[currentIndex].src}
                    alt={SCREENS[currentIndex].title}
                    className="w-full h-full object-cover block"
                    loading="eager"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Arrow */}
            <button
              onClick={next}
              className="absolute right-2 sm:right-6 md:right-12 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all shadow-2xl cursor-pointer"
              title="Next Screen (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div
            className="w-full max-w-4xl flex items-center justify-between gap-4 z-50 pt-2 border-t border-white/10 overflow-x-auto pb-1"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hidden lg:inline text-[11px] font-mono text-white/40 uppercase tracking-widest shrink-0">
              [←] [→] KEYS • [ESC] CLOSE
            </span>

            <div className="flex items-center gap-2 mx-auto lg:mx-0 overflow-x-auto py-1">
              {SCREENS.map((screen, idx) => (
                <button
                  key={screen.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-8 h-14 sm:w-10 sm:h-16 rounded-md overflow-hidden transition-all border cursor-pointer shrink-0 ${
                    currentIndex === idx
                      ? 'border-emerald-400 scale-105 shadow-md ring-2 ring-emerald-400/50'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                  title={screen.title}
                >
                  <img
                    src={screen.thumb}
                    alt={screen.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider shrink-0">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>LIVE DEMO SCREENS</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
