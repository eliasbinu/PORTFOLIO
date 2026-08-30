import React, { useState } from 'react';
import { X } from 'lucide-react';

interface HeaderProps {
  isDark?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isDark = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const textClass = isDark ? 'text-white' : 'text-[#0e0e0e]';
  const underlineBg = isDark ? 'bg-white' : 'bg-black';
  const borderClass = isDark ? 'border-white text-white' : 'border-black text-[#0e0e0e]';

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 pt-3 md:pt-4 pb-2 md:px-12 flex justify-between items-start pointer-events-auto transition-colors duration-500">
      {/* Brand / Logo - Extra Tall Towering Condensed Typography in Yellow */}
      <a 
        href="#" 
        className="group flex flex-col uppercase font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[0.78] tracking-tight text-[#eab308] select-none scale-y-125 origin-top"
      >
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">ELIAS</span>
        <span className="inline-block ml-6 md:ml-8 transition-transform duration-300 group-hover:translate-x-2">BINU</span>
      </a>

      {/* Desktop Navigation Links */}
      <nav className={`hidden md:flex items-center gap-8 text-sm font-medium tracking-wider uppercase ${textClass} transition-colors duration-500`}>
        <a 
          href="#about" 
          className="relative py-1 group overflow-hidden"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">About</span>
          <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full font-semibold">About</span>
          <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] ${underlineBg} transition-all duration-300 group-hover:w-full`}></span>
        </a>

        <a 
          href="#works" 
          className="relative py-1 group overflow-hidden"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Projects</span>
          <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full font-semibold">Projects</span>
          <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] ${underlineBg} transition-all duration-300 group-hover:w-full`}></span>
        </a>

        <a 
          href="#skills" 
          className="relative py-1 group overflow-hidden"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Skills</span>
          <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full font-semibold">Skills</span>
          <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] ${underlineBg} transition-all duration-300 group-hover:w-full`}></span>
        </a>

        <a 
          href="#contact" 
          className="relative py-1 group overflow-hidden"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Contact</span>
          <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full font-semibold">Contact</span>
          <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] ${underlineBg} transition-all duration-300 group-hover:w-full`}></span>
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden border ${borderClass} px-3.5 py-1.5 uppercase text-xs font-semibold tracking-wider hover:bg-black hover:text-white transition-colors`}
      >
        Menu
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#fcfcfc] z-40 flex flex-col justify-center items-center gap-8 md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 border border-black"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center gap-8 uppercase font-display text-5xl font-black">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:italic hover:tracking-widest transition-all"
            >
              01 About
            </a>
            <a 
              href="#works" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:italic hover:tracking-widest transition-all"
            >
              02 Projects
            </a>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:italic hover:tracking-widest transition-all"
            >
              03 Skills
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:italic hover:tracking-widest transition-all"
            >
              04 Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
