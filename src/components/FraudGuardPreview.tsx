import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const SLIDES = [
  {
    src: '/fraudguard-1.png',
    title: 'UPI Telemetry & Baseline Geofence',
  },
  {
    src: '/fraudguard-2.png',
    title: 'Explainable Risk Forensics',
  },
  {
    src: '/fraudguard-3.png',
    title: 'Adaptive Step-Up Verification',
  },
  {
    src: '/fraudguard-4.png',
    title: 'One-Time Passcode Clearance',
  },
  {
    src: '/fraudguard-5.png',
    title: 'Biometric Face ID & Passkey Scan',
  },
];

interface FraudGuardPreviewProps {
  isHovered?: boolean;
  isPlaying?: boolean;
  onTogglePlay?: (playing: boolean) => void;
  onOpenFullscreen?: (index: number) => void;
}

export const FraudGuardPreview: React.FC<FraudGuardPreviewProps> = ({
  isPlaying = true,
  onTogglePlay,
  onOpenFullscreen,
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
    <div className="relative w-full aspect-[16/10] bg-[#070709] text-white rounded-xs overflow-hidden flex flex-col justify-between select-none shadow-2xl group/player">
      
      {/* 1. Top Minimal Controls (Visible on hover) */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-3 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/80 font-bold">
            FRAUDGUARD CORE
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleTogglePlay}
            className="w-7 h-7 rounded-xs bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 backdrop-blur-md"
            title={autoPlay ? 'Pause' : 'Play'}
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-[#eab308]" />}
          </button>

          {onOpenFullscreen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenFullscreen(currentIndex);
              }}
              className="w-7 h-7 rounded-xs bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 backdrop-blur-md"
              title="Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Main High-Res Dashboard Screenshot Stage */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#070709] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center p-2 sm:p-3"
          >
            <img
              src={currentSlide.src}
              alt={currentSlide.title}
              className="w-full h-full object-contain rounded-xs shadow-2xl filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] [image-rendering:-webkit-optimize-contrast]"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Interactive Floating Navigation Arrows (On Hover) */}
      <div className="absolute inset-y-0 left-2 right-2 z-20 flex items-center justify-between pointer-events-none opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrev}
          className="pointer-events-auto w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white hover:text-[#eab308] flex items-center justify-center backdrop-blur-md border border-white/15 transition-transform hover:scale-110 shadow-lg cursor-pointer"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5" />
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white hover:text-[#eab308] flex items-center justify-center backdrop-blur-md border border-white/15 transition-transform hover:scale-110 shadow-lg cursor-pointer"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5 -mr-0.5" />
        </button>
      </div>

    </div>
  );
};
