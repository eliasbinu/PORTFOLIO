import React from 'react';
import { ScrambleText } from './ScrambleText';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full min-h-screen bg-white text-[#0e0e0e] px-6 md:px-16 lg:px-24 pt-44 sm:pt-56 md:pt-72 lg:pt-80 pb-32 md:pb-48 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Partial Scramble Animation */}
        <div className="overflow-hidden pb-8 md:pb-12 text-left">
          <ScrambleText
            text="ABOUT ME"
            startIndex={3}
            className="font-['Oswald'] font-black text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-[0.84] tracking-tight uppercase text-[#0e0e0e] select-none text-left"
          />
        </div>

        {/* Lead Bio Statement */}
        <div className="pt-6 md:pt-10 text-left">
          <h3 className="font-sans font-light text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] tracking-tight leading-[1.28] text-[#0e0e0e] max-w-5xl text-left">
          im very tired today to think more
          


          </h3>
        </div>

      </div>
    </section>
  );
};
