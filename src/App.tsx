import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedWorks } from './components/FeaturedWorks';
import { ManifestoSection } from './components/ManifestoSection';
import { SkillsSection } from './components/SkillsSection';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Responsive, Tactile Inertia Scrolling (Snappy & Grounded)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85, // Snappier response (not overly floaty)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white text-[#0e0e0e] overflow-x-hidden font-sans">
      {/* Interactive Custom Pixel Square Cursor */}
      <CustomCursor />

      {/* Intro Shutter Curtain Animation */}
      <PageLoader onComplete={() => setIsLoaded(true)} />

      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main>
        <HeroSection isLoaded={isLoaded} />
        <AboutSection />
        <FeaturedWorks />
        <ManifestoSection />
        <SkillsSection />
      </main>
    </div>
  );
};

export default App;
