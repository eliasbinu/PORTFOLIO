import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const SLIDES = [
  {
    src: '/finterra-1.png',
    title: 'Finterra Satellite CV Underwriting Splash',
  },
  {
    src: '/finterra-2.png',
    title: 'Cadastral Parcel GIS & Boundary Verification',
  },
  {
    src: '/finterra-3.png',
    title: 'Distributed Multi-Spectral Telemetry Ingestion',
  },
  {
    src: '/finterra-4.png',
    title: 'Python Underwriting Engine & Collateral Scoring',
  },
  {
    src: '/finterra-5.png',
    title: 'Geospatial Regional Pilot Telemetry Map',
  },
];

interface FinterraPreviewProps {
  isHovered?: boolean;
  isPlaying?: boolean;
  onTogglePlay?: (playing: boolean) => void;
  onOpenFullscreen?: (index: number) => void;
  onCloseCover?: () => void;
}

export const FinterraPreview: React.FC<FinterraPreviewProps> = ({
  isPlaying = true,
  onTogglePlay,
  onOpenFullscreen,
  onCloseCover,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(isPlaying);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const SLIDE_DURATION = 3000; // 3 seconds per slide

  // Preload all 5 high-res slides in the background for zero-delay instant switching
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  // Sync external playing state
  useEffect(() => {
    setAutoPlay(isPlaying);
  }, [isPlaying]);

  // Handle auto-advance with 3-second interval
  useEffect(() => {
    if (!autoPlay) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, autoPlay]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !autoPlay;
    setAutoPlay(nextState);
    if (onTogglePlay) onTogglePlay(nextState);
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div className="relative w-full aspect-[16/10] bg-[#f4f7f5] text-[#0e2a1e] rounded-xs overflow-hidden flex flex-col justify-between select-none shadow-2xl border border-black/5 group/player">
      
      {/* 1. Top Minimal Controls */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-3 bg-gradient-to-b from-white/95 via-white/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#0e2a1e] font-bold">
            FINTERRA // SATELLITE CV ENGINE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className="w-7 h-7 rounded-xs bg-white hover:bg-[#16a34a] text-[#0e2a1e] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-black/10 shadow-xs backdrop-blur-md"
            title={autoPlay ? 'Pause' : 'Play'}
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-[#16a34a]" />}
          </button>

          {onOpenFullscreen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenFullscreen(currentIndex);
              }}
              className="w-7 h-7 rounded-xs bg-white hover:bg-[#16a34a] text-[#0e2a1e] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-black/10 shadow-xs backdrop-blur-md"
              title="Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}

          {onCloseCover && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseCover();
              }}
              className="bg-white/85 hover:bg-white px-2.5 py-1 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer font-mono text-xs text-black/80 hover:text-black backdrop-blur-md border border-black/10 shadow-sm"
              title="Close Cover"
            >
              <X className="w-3.5 h-3.5" />
              <span>CLOSE COVER</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Main High-Res Dashboard Screenshot Stage with Seamless White/Light Background */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f4f7f5] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center p-1 sm:p-2"
          >
            <img
              src={currentSlide.src}
              alt={currentSlide.title}
              className="w-full h-full object-contain rounded-xs shadow-md [image-rendering:-webkit-optimize-contrast]"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Interactive Floating Navigation Arrows (On Hover) */}
      <div className="absolute inset-y-0 left-2 right-2 z-20 flex items-center justify-between pointer-events-none opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrev}
          className="pointer-events-auto w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#0e2a1e] hover:text-[#16a34a] flex items-center justify-center backdrop-blur-md border border-black/10 transition-transform hover:scale-110 shadow-xl cursor-pointer"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5" />
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#0e2a1e] hover:text-[#16a34a] flex items-center justify-center backdrop-blur-md border border-black/10 transition-transform hover:scale-110 shadow-xl cursor-pointer"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5 -mr-0.5" />
        </button>
      </div>

    </div>
  );
};
