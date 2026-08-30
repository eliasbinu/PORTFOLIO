import React, { useRef, useState, useEffect } from 'react';

interface MarqueeRowProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
  textColor?: string;
  baseSpeed?: number;
  slowSpeed?: number;
}

export const MarqueeRow: React.FC<MarqueeRowProps> = ({
  text,
  direction = 'left',
  className = '',
  textColor = 'text-inherit',
  baseSpeed = 1.3,
  slowSpeed = 0.28,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(direction === 'left' ? -baseSpeed : baseSpeed);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const targetSpeed = isHovered 
        ? (direction === 'left' ? -slowSpeed : slowSpeed) 
        : (direction === 'left' ? -baseSpeed : baseSpeed);

      // Smooth physics-based lerp for seamless speed transitions without jumps
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.06;

      offsetRef.current += currentSpeedRef.current;

      if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (halfWidth > 0) {
          if (offsetRef.current <= -halfWidth) {
            offsetRef.current += halfWidth;
          } else if (offsetRef.current >= 0) {
            offsetRef.current -= halfWidth;
          }
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, direction, baseSpeed, slowSpeed]);

  const repetitions = Array.from({ length: 8 });

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`marquee-container relative w-full overflow-hidden whitespace-nowrap flex select-none py-1 md:py-2 pointer-events-auto cursor-pointer ${className}`}
    >
      <div 
        ref={trackRef}
        className="flex shrink-0 will-change-transform"
      >
        <div className="flex shrink-0">
          {repetitions.map((_, i) => (
            <span
              key={i}
              className={`font-display font-black uppercase text-[19vh] md:text-[23vh] lg:text-[26vh] leading-[0.80] tracking-tight inline-block pr-6 md:pr-10 ${textColor} transition-colors duration-300`}
            >
              {text}
            </span>
          ))}
        </div>
        <div aria-hidden="true" className="flex shrink-0">
          {repetitions.map((_, i) => (
            <span
              key={i}
              className={`font-display font-black uppercase text-[19vh] md:text-[23vh] lg:text-[26vh] leading-[0.80] tracking-tight inline-block pr-6 md:pr-10 ${textColor} transition-colors duration-300`}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

