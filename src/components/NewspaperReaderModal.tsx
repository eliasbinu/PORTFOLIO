import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BookOpen, Users } from 'lucide-react';

const READER_PAGES = [
  { id: 1, src: '/tribune-1.png', thumb: '/tribune-thumb-1.png', title: 'Cover & Senate Speaks', subtitle: 'May 2024 • Issue 4' },
  { id: 2, src: '/tribune-2.png', thumb: '/tribune-thumb-2.png', title: 'Alumni Pavilion (Part 1)', subtitle: 'Dr. Shal Kakkattil Spotlight' },
  { id: 3, src: '/tribune-3.png', thumb: '/tribune-thumb-3.png', title: 'Interview & Q&A (Part 2)', subtitle: 'Life Lessons & School Memories' },
  { id: 4, src: '/tribune-4.png', thumb: '/tribune-thumb-4.png', title: 'Special Articles & Poetry', subtitle: 'Malayalam Tribute' },
  { id: 5, src: '/tribune-5.png', thumb: '/tribune-thumb-5.png', title: 'PARASPARAM Alumni Meet', subtitle: 'Annual Alumni Re-unite Photo Archive' },
  { id: 6, src: '/tribune-6.png', thumb: '/tribune-thumb-6.png', title: 'Special Articles (Part 1)', subtitle: 'Making Waves — Meenakshi Subi' },
  { id: 7, src: '/tribune-7.png', thumb: '/tribune-thumb-7.png', title: 'Journey From Senator to Student', subtitle: 'Special Articles (Part 2)' },
  { id: 8, src: '/tribune-8.png', thumb: '/tribune-thumb-8.png', title: 'Editorial Poem', subtitle: 'Poem by Sarah Paul' },
  { id: 9, src: '/tribune-9.png', thumb: '/tribune-thumb-9.png', title: 'Interschool Achievements (1)', subtitle: 'FRESCO, VISTA & CROSSROADS 2023' },
  { id: 10, src: '/tribune-10.png', thumb: '/tribune-thumb-10.png', title: 'Interschool Achievements (2)', subtitle: 'FABULA, TARANG & CHOICE CUP 2023' },
  { id: 11, src: '/tribune-editorial-board.png', thumb: '/tribune-thumb-11.png', title: 'Student Editorial Board', subtitle: '2023–24 Editorial Team' },
];

interface NewspaperReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewspaperReaderModal: React.FC<NewspaperReaderModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

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

  // Preload adjacent pages for instant zero-lag switching
  useEffect(() => {
    if (!isOpen) return;
    const nextIdx = (currentPage + 1) % READER_PAGES.length;
    const prevIdx = (currentPage - 1 + READER_PAGES.length) % READER_PAGES.length;
    
    const imgNext = new Image();
    imgNext.src = READER_PAGES[nextIdx].src;
    const imgPrev = new Image();
    imgPrev.src = READER_PAGES[prevIdx].src;
  }, [currentPage, isOpen]);

  // Keyboard Navigation (Arrow Keys + Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Space') {
        setCurrentPage((prev) => (prev < READER_PAGES.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const nextPage = () => setCurrentPage((prev) => (prev < READER_PAGES.length - 1 ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black/92 backdrop-blur-md text-white select-none p-3 sm:p-5 pt-3 sm:pt-5"
        onClick={onClose}
      >
          {/* TOP BAR */}
          <div 
            className="w-full max-w-7xl flex items-center justify-between z-50 py-1.5 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title & Issue Details */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>THE PETERIAN TRIBUNE</span>
              </div>
              <span className="hidden sm:inline text-xs font-mono text-white/60 tracking-wider">
                {READER_PAGES[currentPage].title} ({READER_PAGES[currentPage].subtitle})
              </span>
            </div>

            {/* Controls: Page Count & Close Button */}
            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-3.5 py-1 rounded-full text-xs font-mono text-white/80 tracking-widest uppercase">
                PAGE {currentPage + 1} OF {READER_PAGES.length}
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                title="Close Reader (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CENTER READER STAGE */}
          <div 
            className="relative w-full flex-1 flex items-center justify-center py-2 overflow-hidden max-h-[82vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Page Button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`absolute left-2 sm:left-6 md:left-12 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all shadow-2xl cursor-pointer ${
                currentPage === 0
                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white text-white hover:text-black active:scale-95'
              }`}
              title="Previous Page (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* High-Resolution Document Canvas */}
            <div className="relative h-full aspect-[724/1024] max-w-[92vw] sm:max-w-[70vw] md:max-w-[55vw] lg:max-w-[42vw] shadow-[0_15px_50px_rgba(0,0,0,0.9)] rounded-xs overflow-hidden bg-white">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="w-full h-full bg-white flex items-center justify-center relative select-none [transform:translateZ(0)] will-change-transform"
                >
                  <img
                    src={READER_PAGES[currentPage].src}
                    alt={READER_PAGES[currentPage].title}
                    className="w-full h-full object-contain block"
                    style={{
                      imageRendering: 'auto',
                      WebkitFontSmoothing: 'subpixel-antialiased',
                    }}
                    loading="eager"
                  />

                  {/* Gentle Paper Edge Spine Gradient */}
                  <div className="absolute top-0 bottom-0 left-0 w-3.5 bg-gradient-to-r from-black/8 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Page Button */}
            <button
              onClick={nextPage}
              disabled={currentPage === READER_PAGES.length - 1}
              className={`absolute right-2 sm:right-6 md:right-12 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all shadow-2xl cursor-pointer ${
                currentPage === READER_PAGES.length - 1
                  ? 'bg-white/5 text-white/20 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white text-white hover:text-black active:scale-95'
              }`}
              title="Next Page (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* BOTTOM THUMBNAIL NAVIGATOR & SHORTCUTS */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between gap-4 z-50 pt-2 border-t border-white/10 overflow-x-auto pb-1"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Keyboard hint */}
            <span className="hidden lg:inline text-[11px] font-mono text-white/40 uppercase tracking-widest shrink-0">
              [←] [→] KEYS • [ESC] CLOSE
            </span>

            {/* Optimized Lightweight Thumbnails */}
            <div className="flex items-center gap-1.5 sm:gap-2 mx-auto lg:mx-0 overflow-x-auto py-1">
              {READER_PAGES.map((page, idx) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(idx)}
                  className={`relative w-8 h-11 sm:w-9 sm:h-12 rounded-xs overflow-hidden transition-transform border cursor-pointer shrink-0 ${
                    currentPage === idx
                      ? 'border-emerald-400 scale-105 shadow-md ring-2 ring-emerald-400/50'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                  title={`Go to Page ${idx + 1}: ${page.title}`}
                >
                  <img
                    src={page.thumb}
                    alt={page.title}
                    width={72}
                    height={96}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </button>
              ))}
            </div>

            {/* Quick jump to Editorial Board */}
            <button
              onClick={() => setCurrentPage(10)}
              className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white text-white hover:text-black px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Editorial Board</span>
            </button>
          </div>

        </motion.div>
    </AnimatePresence>,
    document.body
  );
};
