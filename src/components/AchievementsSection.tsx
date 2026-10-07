import React, { useState, useEffect } from 'react';
import { ScrambleText } from './ScrambleText';
import { X, Maximize2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
}

export interface TrophyItem {
  id: string;
  title: string;
  cutout: string;
  original: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'iso',
    title: '3× ISO Zonal Rank 1',
    description: 'Secured 1st Rank across the entire Zone in the International Science Olympiad across 3 separate editions.',
  },
  {
    id: 'imo',
    title: 'IMO Zonal Rank 1',
    description: 'Clinched 1st Rank across the Zone in the International Mathematics Olympiad.',
  },
  {
    id: 'editor',
    title: 'Student Editor — Magazine & Newsletter',
    description: 'Led a creative team of 5 to conceptualize, write, edit, and publish the school magazine and newsletter.',
  },
  {
    id: 'ryla',
    title: 'RYLA Popular Camper Award',
    description: 'Awarded the Popular Camper honor at the Interschool Rotary Youth Leadership Awards (RYLA) camp.',
  },
  {
    id: 'cbse10',
    title: 'Centum in English (100/100) — CBSE Class 10',
    description: 'Achieved a perfect score of 100/100 (Centum) in English in the CBSE Class 10 Board Examinations.',
  },
  {
    id: 'cbse12',
    title: 'Full A1 Across All Subjects — CBSE Class 12',
    description: 'Scored top-tier A1 grades across every enrolled subject in the CBSE Class 12 Board Examinations.',
  },
  {
    id: 'president',
    title: 'Student President — Biology Board (Class 12)',
    description: 'Appointed as the Student President of the senior Biology Board, coordinating scientific symposiums and academic initiatives.',
  },
  {
    id: 'elocution',
    title: 'English Elocution — 1st Prize Winner',
    description: 'Won 1st prize in English Elocution at Sylvan Symphony (School Arts Festival) under competitive inter-house judging.',
  },
  {
    id: 'drawing',
    title: 'District Prize Winner — REEFA Drawing',
    description: 'Recognized with district-level awards in competitive drawing and fine arts organized by REEFA.',
  },
];

const TROPHIES: TrophyItem[] = [
  {
    id: 'trophy-1',
    title: 'RYLA 2023 — Popular Camper',
    cutout: '/trophies/trophy-1-cutout.png?v=2',
    original: '/trophies/trophy-1.jpg?v=2',
  },
  {
    id: 'trophy-2',
    title: 'CBSE 12th Academic Honor',
    cutout: '/trophies/trophy-2-cutout.png?v=2',
    original: '/trophies/trophy-2.jpg?v=2',
  },
  {
    id: 'trophy-3',
    title: 'RYLA All-Kerala Memento',
    cutout: '/trophies/trophy-3-cutout.png?v=2',
    original: '/trophies/trophy-3.jpg?v=2',
  },
  {
    id: 'trophy-4',
    title: 'Plus 2 All A+ Honor',
    cutout: '/trophies/trophy-4-cutout.png?v=2',
    original: '/trophies/trophy-4.jpg?v=2',
  },
  {
    id: 'trophy-5',
    title: 'CBSE 10th Excellence Memento',
    cutout: '/trophies/trophy-5-cutout.png?v=2',
    original: '/trophies/trophy-5.jpg?v=2',
  },
  {
    id: 'trophy-6',
    title: "St. Peter's English Centum Award",
    cutout: '/trophies/trophy-6-cutout.png?v=2',
    original: '/trophies/trophy-6.jpg?v=2',
  },
  {
    id: 'trophy-7',
    title: "St. Peter's Academic Excellence Plate",
    cutout: '/trophies/trophy-7-cutout.png?v=2',
    original: '/trophies/trophy-7.jpg?v=2',
  },
  {
    id: 'trophy-8',
    title: 'MES Builders Merit Award 2025',
    cutout: '/trophies/trophy-8-cutout.png?v=2',
    original: '/trophies/trophy-8.jpg?v=2',
  },
  {
    id: 'trophy-9',
    title: 'The August Plus 2 A1 Memento',
    cutout: '/trophies/trophy-9-cutout.png?v=2',
    original: '/trophies/trophy-9.jpg?v=2',
  },
  {
    id: 'trophy-10',
    title: 'MBA Merit Award — CBSE 10th',
    cutout: '/trophies/trophy-10-cutout.png?v=2',
    original: '/trophies/trophy-10.jpg?v=2',
  },
];

export const AchievementsSection: React.FC = () => {
  const [selectedTrophyIndex, setSelectedTrophyIndex] = useState<number | null>(null);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedTrophyIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTrophyIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedTrophyIndex((prev) => (prev !== null ? (prev + 1) % TROPHIES.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedTrophyIndex((prev) => (prev !== null ? (prev - 1 + TROPHIES.length) % TROPHIES.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTrophyIndex]);

  return (
    <section 
      id="achievements"
      className="relative w-full py-20 sm:py-28 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#fcfcfc] text-[#0e0e0e] select-none overflow-hidden border-t border-black/10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Intro: ACHIEVEMENTS with Signature Scramble Animation */}
        <div className="overflow-hidden pb-6 md:pb-8 text-left border-b border-black/10 mb-10 md:mb-14">
          <ScrambleText
            text="ACHIEVEMENTS"
            startIndex={3}
            className="font-['Oswald'] font-black text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] leading-[0.84] tracking-tight uppercase text-[#0e0e0e] select-none text-left"
          />
          <div className="flex items-center gap-2 mt-3 text-xs font-mono text-black/40 uppercase tracking-widest">
            <span>[SELECTED ACADEMIC, OLYMPIAD &amp; LEADERSHIP MILESTONES]</span>
          </div>
        </div>

        {/* 3-Column Rounded Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-black/10 hover:border-[#eab308] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(234,179,8,0.22),0_0_24px_rgba(234,179,8,0.2)] transition-all duration-500 ease-out hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Ambient Golden Glow on Hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#facc15]/15 via-transparent to-[#eab308]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Title in Character-rich Gold Serif Typography */}
                <h3 className="font-['Lora',serif] font-bold text-[#b48316] text-lg sm:text-[1.18rem] leading-snug tracking-tight mb-2.5 group-hover:text-[#996515] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Body Text in Pure Black */}
                <p className="font-sans text-sm sm:text-[0.92rem] text-black font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* -------------------------------------------------------------
            Trophies Gallery View Directly Under Achievements
            ------------------------------------------------------------- */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-black/10">
          {/* Trophy Cards Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {TROPHIES.map((trophy, index) => (
              <div
                key={trophy.id}
                onClick={() => {
                  setSelectedTrophyIndex(index);
                  setShowOriginal(false);
                }}
                className="group/trophy relative bg-white rounded-2xl border border-black/10 hover:border-[#eab308] p-4 flex flex-col items-center justify-between aspect-[3/4] overflow-hidden cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_40px_rgba(234,179,8,0.22),0_0_24px_rgba(234,179,8,0.15)] transition-all duration-500 hover:-translate-y-2 select-none"
              >
                {/* Soft ambient backlight pedestal on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/60 via-white to-amber-50/20 group-hover/trophy:from-white group-hover/trophy:to-amber-100/35 transition-colors duration-500 pointer-events-none" />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-16 bg-[#eab308]/20 blur-xl opacity-0 group-hover/trophy:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Inspect button badge */}
                <div className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-black/5 group-hover/trophy:bg-black group-hover/trophy:text-white flex items-center justify-center transition-all duration-300 opacity-60 group-hover/trophy:opacity-100 group-hover/trophy:scale-105">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Trophy Cutout Image */}
                <div className="relative z-10 w-full h-[78%] flex items-center justify-center p-2">
                  <img
                    src={trophy.cutout}
                    alt={trophy.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)] group-hover/trophy:drop-shadow-[0_16px_28px_rgba(0,0,0,0.24)] group-hover/trophy:scale-108 transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Clean, minimalist title - no long description */}
                <div className="relative z-10 w-full text-center pt-2 border-t border-black/5">
                  <span className="font-['Lora',serif] font-bold text-xs sm:text-[13px] text-[#0e0e0e] group-hover/trophy:text-[#b48316] transition-colors duration-300 block truncate">
                    {trophy.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal with Zoom & Next/Prev navigation */}
      {selectedTrophyIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedTrophyIndex(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl p-6 sm:p-8 text-black shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#eab308]" />
                <h4 className="font-['Lora',serif] text-base sm:text-lg font-bold text-black">
                  {TROPHIES[selectedTrophyIndex].title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                {/* Toggle Cutout vs Original */}
                <button
                  onClick={() => setShowOriginal(!showOriginal)}
                  className="font-mono text-xs px-2.5 py-1 bg-black/5 hover:bg-black hover:text-white rounded-md transition-colors"
                >
                  {showOriginal ? 'Cutout View' : 'Original Photo'}
                </button>

                <button
                  onClick={() => setSelectedTrophyIndex(null)}
                  className="w-8 h-8 rounded-full bg-black/5 hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Image Stage */}
            <div className="relative w-full aspect-[4/3] bg-neutral-50 rounded-xl flex items-center justify-center p-4 sm:p-6 overflow-hidden border border-black/5">
              <img
                src={showOriginal ? TROPHIES[selectedTrophyIndex].original : TROPHIES[selectedTrophyIndex].cutout}
                alt={TROPHIES[selectedTrophyIndex].title}
                className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTrophyIndex((prev) => (prev !== null ? (prev - 1 + TROPHIES.length) % TROPHIES.length : null));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-black hover:text-white shadow-md flex items-center justify-center transition-colors border border-black/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTrophyIndex((prev) => (prev !== null ? (prev + 1) % TROPHIES.length : null));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-black hover:text-white shadow-md flex items-center justify-center transition-colors border border-black/10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 mt-3 text-xs font-mono text-black/50">
              <span>Use arrow keys (← →) or swipe to navigate</span>
              <span>{selectedTrophyIndex + 1} / {TROPHIES.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
