import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface FraudGuardModalProps {
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

const MODAL_SLIDES = [
  { src: '/fraudguard-1.png', title: 'UPI Telemetry & Account Baseline Profile' },
  { src: '/fraudguard-2.png', title: 'Explainable Risk Forensics Scoring Engine' },
  { src: '/fraudguard-3.png', title: 'Adaptive Step-Up Verification Challenge' },
  { src: '/fraudguard-4.png', title: 'SMS One-Time Passcode Clearance' },
  { src: '/fraudguard-5.png', title: 'Biometric Face ID & Hardware Passkey Scan' },
];

export const FraudGuardModal: React.FC<FraudGuardModalProps> = ({
  isOpen,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);

  const SLIDE_DURATION = 3000;

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsPlaying(true);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll and set modal-open class
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Keyboard navigation & ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // 3-Second Automatic Delay Slideshow Timer in Modal
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MODAL_SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(slideTimer);
    };
  }, [isOpen, isPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MODAL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MODAL_SLIDES.length) % MODAL_SLIDES.length);
  };

  if (!isOpen || typeof document === 'undefined') return null;

  const currentSlide = MODAL_SLIDES[currentIndex];

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none"
        onClick={onClose}
      >
        {/* Top Header Bar */}
        <div 
          className="w-full max-w-7xl mx-auto flex items-center justify-between z-20 pt-2 sm:pt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
            <h2 className="font-['Oswald'] font-bold text-lg sm:text-2xl uppercase tracking-wider text-white">
              FRAUDGUARD CORE INDIA
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="px-3.5 py-1.5 rounded-xs bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase flex items-center gap-2 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#eab308]" />}
              <span>{isPlaying ? 'PAUSE (3s)' : 'PLAY (3s)'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              title="Close Fullscreen (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Main Stage */}
        <div 
          className="relative w-full max-w-7xl mx-auto my-auto flex-1 flex items-center justify-center py-4 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] w-full flex items-center justify-center"
            >
              <img
                src={currentSlide.src}
                alt={currentSlide.title}
                className="max-h-[85vh] max-w-full object-contain rounded-xs shadow-2xl border border-white/10 [image-rendering:-webkit-optimize-contrast]"
                decoding="async"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 hover:bg-black text-white hover:text-[#eab308] flex items-center justify-center backdrop-blur-md border border-white/20 transition-transform hover:scale-110 shadow-2xl cursor-pointer"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6 -ml-0.5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 hover:bg-black text-white hover:text-[#eab308] flex items-center justify-center backdrop-blur-md border border-white/20 transition-transform hover:scale-110 shadow-2xl cursor-pointer"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6 -mr-0.5" />
          </button>
        </div>

      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
