import React from 'react';
import { motion } from 'framer-motion';
import { MarqueeRow } from './MarqueeRow';
import { StatusBar } from './StatusBar';

interface HeroSectionProps {
  isLoaded?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded = true }) => {
  return (
    <section className="relative w-screen h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden bg-white select-none">
      {/* Background Subtle Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-grain z-0" />

      {/* Layer 1: Background Marquee (Line 2 runs UNDER / BEHIND the photo) */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-10 z-10 text-[#0e0e0e] pointer-events-none">
        {/* Row 1 Spacer */}
        <div className="flex-1 pointer-events-none" />

        {/* Row 2: BACKEND DEVELOPER (Flows BEHIND the head & face, slows down on hover) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex items-center justify-center overflow-hidden pointer-events-auto"
        >
          <MarqueeRow 
            text="BACKEND DEVELOPER" 
            direction="right" 
            baseSpeed={3.4}
            slowSpeed={0.35}
            textColor="text-[#0e0e0e]"
          />
        </motion.div>

        {/* Row 3 Spacer */}
        <div className="flex-1 pointer-events-none" />
      </div>

      {/* Centered Editorial Portrait - Smooth Cinematic Landing after Curtains Drop */}
      <motion.div 
        initial={{ scale: 0.65, opacity: 0, y: 130, rotate: -3 }}
        animate={isLoaded ? { scale: 1, opacity: 1, y: 0, rotate: 0 } : { scale: 0.65, opacity: 0, y: 130, rotate: -3 }}
        transition={{ 
          type: "spring", 
          stiffness: 110, 
          damping: 16, 
          mass: 1.25,
          delay: 0.45 
        }}
        className="absolute top-[62%] md:top-[63%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
      >
        <div className="relative w-[285px] sm:w-[325px] md:w-[370px] lg:w-[405px] aspect-[2/3] overflow-hidden bg-[#8a8a8a] select-none [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]">
          {/* Main Portrait */}
          <img 
            src="/elias.jpg?v=12" 
            alt="Elias Binu"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
        </div>
      </motion.div>

      {/* Layer 2: Foreground Overlay Marquee (Line 1 & Line 3 run OVER the photo with mix-blend-difference) */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-10 z-30 mix-blend-difference text-white pointer-events-none">
        {/* Row 1: CREATIVE (Runs OVER top of photo, slows down on hover) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex items-center justify-center overflow-hidden pointer-events-auto"
        >
          <MarqueeRow 
            text="CREATIVE" 
            direction="left" 
            baseSpeed={3.0}
            slowSpeed={0.35}
            textColor="text-white"
          />
        </motion.div>

        {/* Row 2 Clean Spacer (No blocking elements) */}
        <div className="flex-1 pointer-events-none" />

        {/* Row 3: EDITORIAL HEAD (Runs OVER bottom/chest of photo, slows down on hover) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex items-center justify-center overflow-hidden pointer-events-auto"
        >
          <MarqueeRow 
            text="EDITORIAL HEAD" 
            direction="left" 
            baseSpeed={3.2}
            slowSpeed={0.35}
            textColor="text-white"
          />
        </motion.div>
      </div>

      {/* Hero Bottom Status Bar (Scrolls away with hero section) */}
      <StatusBar />
    </section>
  );
};
