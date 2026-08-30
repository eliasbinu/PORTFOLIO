import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PAGES = [
  { id: 1, src: '/tribune-1.png' },
  { id: 2, src: '/tribune-2.png' },
  { id: 3, src: '/tribune-3.png' },
  { id: 4, src: '/tribune-4.png' },
  { id: 5, src: '/tribune-5.png' },
  { id: 6, src: '/tribune-6.png' },
  { id: 7, src: '/tribune-7.png' },
  { id: 8, src: '/tribune-8.png' },
  { id: 9, src: '/tribune-9.png' },
  { id: 10, src: '/tribune-10.png' },
];

interface BookFlipPreviewProps {
  isHovered: boolean;
}

export const BookFlipPreview: React.FC<BookFlipPreviewProps> = ({ isHovered }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Auto flip pages every 5 seconds when hovered
  useEffect(() => {
    if (!isHovered) {
      const timeout = setTimeout(() => setCurrentPage(0), 400);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % PAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="relative w-full grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 select-none bg-[#eaeaea] items-center justify-center">
      
      {/* LEFT HALF: 3D Interactive Flipping Magazine Book */}
      <div className="relative w-full [perspective:1400px] flex items-center justify-center">
        
        {/* Book Container with Subtle Soft Paper Depth */}
        <div className="relative w-full aspect-[724/1024] [transform-style:preserve-3d]">
          
          {/* Layered Physical Page Edges on Right */}
          <div 
            className="absolute inset-0 bg-[#dedee2] rounded-r-xs shadow-[3px_3px_8px_rgba(0,0,0,0.06)] translate-x-2 translate-y-1 opacity-90 pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute inset-0 bg-[#d0d0d5] rounded-r-xs shadow-[2px_2px_6px_rgba(0,0,0,0.04)] translate-x-1 translate-y-0.5 opacity-75 pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Book Spine Shadow on Left */}
          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/10 via-black/5 to-transparent z-40 pointer-events-none" />

          {/* Dynamic Page Flip with Soft Book Shadow */}
          <div className="relative w-full h-full bg-white shadow-[0_4px_18px_rgba(0,0,0,0.06)] [backface-visibility:hidden]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, rotateY: -14, scale: 0.985 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 18, scale: 1.015 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full bg-white flex flex-col justify-between origin-left [backface-visibility:hidden] [transform:translateZ(0)]"
              >
                <img
                  src={PAGES[currentPage].src}
                  alt={`Peterian Tribune Page ${currentPage + 1}`}
                  className="w-full h-full object-contain block"
                  style={{ 
                    imageRendering: 'auto',
                    WebkitFontSmoothing: 'subpixel-antialiased',
                    transform: 'translateZ(0)',
                  }}
                  loading="eager"
                  decoding="sync"
                />

                {/* Subtle Realistic Paper Shading */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/4 via-transparent to-black/2 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* RIGHT HALF: Student Editorial Board 2023-24 */}
      <div className="relative w-full flex items-center justify-center">
        
        {/* High-Resolution Board Image Card with Soft Book Shadow */}
        <div className="relative w-full aspect-[724/1024] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.06)] [backface-visibility:hidden] [transform:translateZ(0)]">
          <img
            src="/tribune-editorial-board.png"
            alt="Student Editorial Board 2023-24"
            className="w-full h-full object-contain block"
            style={{ 
              imageRendering: 'auto',
              WebkitFontSmoothing: 'subpixel-antialiased',
              transform: 'translateZ(0)',
            }}
            loading="eager"
            decoding="sync"
          />

          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/3 via-transparent to-black/3 pointer-events-none" />
        </div>

      </div>

    </div>
  );
};
