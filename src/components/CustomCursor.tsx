import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-lightweight, razor-sharp 1-to-1 responsive spring (zero sluggish heaviness)
  const springX = useSpring(mouseX, { stiffness: 4500, damping: 100, mass: 0.005 });
  const springY = useSpring(mouseY, { stiffness: 4500, damping: 100, mass: 0.005 });

  useEffect(() => {
    // Only enable on desktop fine pointer devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible || typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      aria-hidden="true"
      animate={{
        scale: isClicking ? 0.75 : 1,
      }}
      transition={{ duration: 0.08, ease: 'easeOut' }}
      className="fixed top-0 left-0 pointer-events-none z-[99999999] will-change-transform"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div className="relative w-3.5 h-3.5">
        {/* Primary Pixel Square with mix-blend-difference */}
        <div className="w-full h-full bg-white mix-blend-difference" />
        {/* High-contrast border ring guaranteeing visibility across all fullscreen image tiles & midtones */}
        <div className="absolute inset-0 border border-black/60 shadow-[0_0_1px_rgba(255,255,255,0.95)] pointer-events-none" />
      </div>
    </motion.div>,
    document.body
  );
};
