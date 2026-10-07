import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const STATEMENT = `"Software is everywhere, and most of it is built to grab attention, not to help anyone. I want to build the opposite: things that solve real problems for real people and still feel good to use. I'm early, a first-year CS student still learning, but I care about how things work underneath and how they feel on top. If you've got a problem worth solving, let's build something."`;

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const [start] = range;
  
  // All words are always 100% visible in crisp grey,
  // transitioning sharply to deep black right as the scroll reaches each word.
  const color = useTransform(
    progress,
    [start - 0.02, start],
    ['#c8c8cc', '#0e0e0e']
  );

  return (
    <span className="relative inline-block mr-[0.20em] my-[0.02em] select-none">
      <motion.span 
        style={{ color }}
        className="transition-colors duration-100 inline-block font-sans font-medium tracking-tighter opacity-100"
      >
        {children}
      </motion.span>
    </span>
  );
};

export const ManifestoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Quicker, snappier scroll-linked illumination range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'center 0.35'],
  });

  const words = STATEMENT.split(' ');

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[65vh] py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-16 bg-white flex flex-col items-center justify-center border-t border-black/5 select-none"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
       
        {/* Scroll-Driven Kinetic Word Scrubber (Expanded to 74.5rem Width) */}
        <p className="w-full max-w-[74.5rem] text-xl sm:text-2xl md:text-3xl lg:text-[2.35rem] xl:text-[2.65rem] leading-[1.30] md:leading-[1.24] tracking-tight font-sans font-medium text-center mx-auto">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word 
                key={i} 
                progress={scrollYProgress} 
                range={[start, end]}
              >
                {word}
              </Word>
            );
          })}
        </p>

      </div>
    </section>
  );
};
