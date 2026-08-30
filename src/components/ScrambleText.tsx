import React, { useEffect, useState, useRef, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnScroll?: boolean;
  startIndex?: number;
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@/.-';

export const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = '',
  triggerOnScroll = true,
  startIndex = 0
}) => {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const originalText = text;
    const length = originalText.length;
    const scrambleLength = Math.max(1, length - startIndex);
    let iteration = 0;
    const totalIterations = scrambleLength * 5.5;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            // If part of the fixed static prefix (e.g. "ABO")
            if (index < startIndex) {
              return originalText[index];
            }
            // If already resolved in the scrambled portion
            const scrambleIndex = index - startIndex;
            if (scrambleIndex < Math.floor(iteration / 5.5)) {
              return originalText[index];
            }
            // Rearranging character with @ symbol included
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration > totalIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        isAnimating.current = false;
      }
    }, 36);
  }, [text, startIndex]);

  useEffect(() => {
    if (!triggerOnScroll) {
      scramble();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          scramble();
        } else if (!entry.isIntersecting) {
          // Reset so it re-triggers when scrolling back into view
          hasAnimated.current = false;
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [scramble, triggerOnScroll]);

  return (
    <h2
      ref={containerRef}
      className={`select-none ${className}`}
      aria-label={text}
    >
      {displayText}
    </h2>
  );
};
