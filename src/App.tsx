import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedWorks } from './components/FeaturedWorks';
import { AchievementsSection } from './components/AchievementsSection';
import { ManifestoSection } from './components/ManifestoSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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

  // High-Performance IntersectionObserver for Dark Mode Transition (Zero CPU reflow)
  useEffect(() => {
    const contactEl = document.getElementById('contact');
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkTheme(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '0px 0px -15% 0px' }
    );

    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#fcfcfc] text-[#0e0e0e] overflow-x-hidden font-sans">
      {/* Hardware-Accelerated GPU Dark Transition Layer (Silky 60-120fps) */}
      <div 
        className="fixed inset-0 bg-[#0a0a0c] pointer-events-none z-0 transition-opacity duration-1000 ease-in-out will-change-[opacity]"
        style={{ opacity: isDarkTheme ? 1 : 0 }}
      />

      {/* Interactive Custom Pixel Square Cursor */}
      <CustomCursor />

      {/* Intro Shutter Curtain Animation */}
      <PageLoader onComplete={() => setIsLoaded(true)} />

      {/* Fixed Header with Smooth Dynamic Invert */}
      <Header isDark={isDarkTheme} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection isLoaded={isLoaded} />
        <AboutSection />
        <FeaturedWorks />
        <AchievementsSection />
        <ManifestoSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default App;
