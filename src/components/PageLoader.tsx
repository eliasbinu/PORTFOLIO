import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  onComplete?: () => void;
}

const funPhrases = [
  'Creative developer crafting digital experiences with motion and craft.',
  'Architecting high-performance backend systems based in Kerala, India.',
  'Designing and engineering digital products with a focus on code & motion.',
  'Editorial design meets modern high-performance engineering.',
  'Transforming ideas into sleek, kinetic, interactive web experiences.',
  'Creative technologist building digital products for the modern web.',
];

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(30);
  const [selectedPhrase] = useState(() => {
    const randomIndex = Math.floor(Math.random() * funPhrases.length);
    return funPhrases[randomIndex];
  });
  const [showContent, setShowContent] = useState(true);
  const [showShutters, setShowShutters] = useState(true);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Ultra-fast countdown from 30% to 100% (~850ms)
  useEffect(() => {
    let isDone = false;
    const duration = 850;
    const intervalTime = 16;
    const step = (100 - 30) / (duration / intervalTime);

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= 100) {
          if (!isDone) {
            isDone = true;
            clearInterval(timer);
            setShowContent(false);
            // Start shutter columns lifting smoothly
            setShowShutters(false);
            if (onCompleteRef.current) onCompleteRef.current();
          }
          return 100;
        }
        return Math.floor(next);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const columns = Array.from({ length: 8 });

  return (
    <>
      {/* 8 Column Shutter Curtains (Independent exit animation) */}
      <AnimatePresence>
        {showShutters && (
          <div className="fixed inset-0 z-[90] flex pointer-events-none">
            {columns.map((_, i) => (
              <motion.div
                key={i}
                className="relative h-full flex-1 bg-[#0e0e0e] border-r border-white/5 last:border-none"
                initial={{ scaleY: 1 }}
                exit={{
                  scaleY: 0,
                  transition: {
                    duration: 0.85,
                    ease: [0.76, 0, 0.24, 1],
                    delay: i * 0.05,
                  },
                }}
                style={{ originY: 0 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Clean Intro Overlay: Bottom-Left Counter & Medium Randomized Sentence */}
      <AnimatePresence>
        {showContent && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[100] flex flex-col justify-end p-8 md:p-14 select-none pointer-events-none text-white"
          >
            {/* Bottom-Left: Live Counter + Medium Sentence Alongside */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-3 md:gap-8 max-w-4xl">
              <span className="font-display font-black text-7xl sm:text-8xl md:text-9xl leading-none text-white tabular-nums tracking-tight shrink-0">
                {count}%
              </span>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-base sm:text-lg md:text-xl font-medium tracking-tight text-white/85 leading-snug pb-1 md:pb-3 max-w-lg"
              >
                {selectedPhrase}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

