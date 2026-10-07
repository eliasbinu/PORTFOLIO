import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleText } from './ScrambleText';
import { 
  Plus, 
  X, 
  Check, 
  Trash2, 
  RotateCcw,
  Code2,
  Edit3
} from 'lucide-react';

export interface SkillLogoItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
  iconType: string;
  color?: string;
}

export const DEFAULT_SKILLS: SkillLogoItem[] = [
  { id: 'html', name: 'HTML', category: 'frontend', iconType: 'html', color: '#e44d26' },
  { id: 'css', name: 'CSS', category: 'frontend', iconType: 'css', color: '#0288d1' },
  { id: 'sass', name: 'SASS', category: 'frontend', iconType: 'sass', color: '#cf649a' },
  { id: 'javascript', name: 'JAVASCRIPT', category: 'frontend', iconType: 'javascript', color: '#f7df1e' },
  { id: 'react', name: 'REACT JS', category: 'frontend', iconType: 'react', color: '#00d8ff' },
  { id: 'nextjs', name: 'NEXT.JS', category: 'frontend', iconType: 'nextjs', color: '#111111' },
  { id: 'typescript', name: 'TYPESCRIPT', category: 'frontend', iconType: 'typescript', color: '#3178c6' },
  { id: 'tailwind', name: 'TAILWIND', category: 'frontend', iconType: 'tailwind', color: '#38bdf8' },
  
  { id: 'github', name: 'GITHUB', category: 'tools', iconType: 'github', color: '#24292f' },
  { id: 'nodejs', name: 'NODE JS', category: 'backend', iconType: 'nodejs', color: '#68a063' },
  { id: 'firebase', name: 'FIREBASE', category: 'backend', iconType: 'firebase', color: '#ffa000' },
  { id: 'mongodb', name: 'MONGODB', category: 'backend', iconType: 'mongodb', color: '#47a248' },
  { id: 'supabase', name: 'SUPABASE', category: 'backend', iconType: 'supabase', color: '#3ecf8e' },
  { id: 'docker', name: 'DOCKERS', category: 'tools', iconType: 'docker', color: '#2496ed' },
  { id: 'figma', name: 'FIGMA', category: 'design', iconType: 'figma', color: '#f24e1e' },
];

const DEFAULT_STATEMENT = 
  "Moreover, beyond technical tools, what truly sets me apart is my leadership, strong communication, and radical honesty in execution.";

/* -------------------------------------------------------------
   Dynamic Exact Brand Color Resolver
   ------------------------------------------------------------- */
const getBrandColor = (type: string, fallback?: string): string => {
  switch (type) {
    case 'html': return '#e44d26';
    case 'css': return '#0288d1';
    case 'sass': return '#cf649a';
    case 'javascript': return '#eab308';
    case 'react': return '#00d8ff';
    case 'nextjs': return '#000000';
    case 'typescript': return '#3178c6';
    case 'tailwind': return '#38bdf8';
    case 'github': return '#24292f';
    case 'nodejs': return '#68a063';
    case 'firebase': return '#ffa000';
    case 'mongodb': return '#47a248';
    case 'supabase': return '#3ecf8e';
    case 'docker': return '#2496ed';
    case 'figma': return '#f24e1e';
    default: return fallback || '#eab308';
  }
};

/* -------------------------------------------------------------
   Clean, Standout Official Brand Logos with Motion Classes
   ------------------------------------------------------------- */
const renderOfficialLogo = (type: string) => {
  switch (type) {
    case 'html':
      return (
        <svg viewBox="0 0 512 512" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105" fill="none">
          <path d="M71 460L35 60h442l-36 400-185 52z" fill="#E44D26"/>
          <path d="M256 472l149-41 30-335H256v376z" fill="#F16529"/>
          <path d="M256 176h-66l-5-53h71V71H131l13 147h112v-42zm0 148h-67l-4-48h-52l8 97h115v-49z" fill="#EBEBEB"/>
          <path d="M256 384l-71-19-5-53h-52l7 96 121 34v-58zm0-261v52h67l-6 71h-61v52h66l-10 111-56 15v59l112-31 15-172 2-25 3-38 3-44H256z" fill="#fff"/>
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 512 512" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" fill="none">
          <path d="M71 460L35 60h442l-36 400-185 52z" fill="#0277BD"/>
          <path d="M256 472l149-41 30-335H256v376z" fill="#0288D1"/>
          <path d="M256 176h-66l-5-53h71V71H131l13 147h112v-42zm0 148h-67l-4-48h-52l8 97h115v-49z" fill="#EBEBEB"/>
          <path d="M256 384l-71-19-5-53h-52l7 96 121 34v-58zm0-261v52h67l-6 71h-61v52h66l-10 111-56 15v59l112-31 15-172 2-25 3-38 3-44H256z" fill="#fff"/>
        </svg>
      );
    case 'sass':
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" fill="none">
          <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm18.8 45.4c-1.3 1.1-2.9 2-4.9 2.7-2 .7-4.2 1-6.6 1-1.8 0-3.4-.2-4.7-.6-1.3-.4-2.4-.9-3.2-1.6-.8-.7-1.4-1.5-1.7-2.4-.3-.9-.4-2-.4-3.1 0-1.7.4-3.1 1.2-4.3.8-1.2 1.9-2.2 3.3-3 1.4-.8 3-1.4 4.8-1.8 1.8-.4 3.7-.7 5.6-.8l4.4-.3v-1.8c0-1.6-.4-2.8-1.3-3.6-.9-.8-2.2-1.2-4.1-1.2-1.6 0-2.9.3-3.9 1-.9.7-1.5 1.7-1.7 3.1h-6.8c.2-2.7 1.3-4.9 3.2-6.5 1.9-1.6 4.6-2.4 8.2-2.4 4.3 0 7.5 1 9.6 3 2.1 2 3.1 5 3.1 8.9v17.5h-6.1v-3.8zm-6.2-7.8c-1.5.1-2.9.3-4.1.6-1.2.3-2.1.8-2.8 1.4-.7.6-1 1.4-1 2.3 0 1.2.5 2.1 1.4 2.8.9.7 2.2 1 3.9 1 1.6 0 3-.3 4.2-.8 1.2-.5 2.1-1.2 2.8-2v-4.8l-4.4-.5z" fill="#CF649A"/>
        </svg>
      );
    case 'javascript':
      return (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xs bg-[#f7df1e] flex flex-col justify-end items-end p-1.5 shadow-sm select-none transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <span className="font-sans font-black text-black text-xl sm:text-2xl leading-none tracking-tighter">
            JS
          </span>
        </div>
      );
    case 'typescript':
      return (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xs bg-[#3178c6] flex flex-col justify-end items-end p-1.5 shadow-sm select-none transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
          <span className="font-sans font-black text-white text-xl sm:text-2xl leading-none tracking-tighter">
            TS
          </span>
        </div>
      );
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-700 ease-out group-hover:rotate-180 group-hover:scale-115" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
          <g stroke="#00d8ff" strokeWidth="1.2" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'nextjs':
      return (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black text-white flex items-center justify-center shadow-md select-none font-sans font-black text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110">
          N
        </div>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 48 48" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-115" fill="none">
          <path d="M24 10C16 10 11 15 9 25C12 21 16 19.5 21 21C24 21.8 26.2 24.1 28.5 26.6C32.3 30.6 37 35.5 45 35.5C53 35.5 58 30.5 60 20.5C57 24.5 53 26 48 24.5C45 23.7 42.8 21.4 40.5 18.9C36.7 14.9 32 10 24 10ZM3 24.5C-5 24.5 -10 29.5 -12 39.5C-9 35.5 -5 34 0 35.5C3 36.3 5.2 38.6 7.5 41.1C11.3 45.1 16 50 24 50C32 50 37 45 39 35C36 39 32 40.5 27 39C24 38.2 21.8 35.9 19.5 33.4C15.7 29.4 11 24.5 3 24.5Z" fill="#38bdf8" />
        </svg>
      );
    case 'github':
      return (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#121212] text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>
      );
    case 'nodejs':
      return (
        <svg viewBox="0 0 32 32" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-115" fill="none">
          <path d="M16 2.5l12.1 7v14l-12.1 7-12.1-7v-14l12.1-7z" fill="#fff" stroke="#68a063" strokeWidth="1.5"/>
          <path d="M16 8l8 4.6v9.2l-8 4.6-8-4.6v-9.2l8-4.6z" fill="#68a063"/>
        </svg>
      );
    case 'firebase':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110" fill="none">
          <path d="M4 17.5L7.5 3L11 9L4 17.5Z" fill="#FFA000" />
          <path d="M11 9L14 3.5L20 17.5L11 9Z" fill="#F57C00" />
          <path d="M4 17.5L12 22L20 17.5L12 13L4 17.5Z" fill="#FFCA28" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-115" fill="none">
          <path d="M12 2C12 2 4 8.5 4 14.5C4 18.5 7.5 22 12 22C16.5 22 20 18.5 20 14.5C20 8.5 12 2 12 2Z" fill="#47A248" />
          <path d="M12 2V22C12.5 22 13 21.9 13.5 21.8C15 21.2 16.5 20 17.5 18.5C19 16 19.5 13.5 19.5 12C19.5 7.5 15 4 12 2Z" fill="#3FA037" />
        </svg>
      );
    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-3" fill="none">
          <path d="M21.362 9.354H12V.343a.343.343 0 0 0-.585-.243L.586 11.029a.857.857 0 0 0 .606 1.463H12v9.011a.343.343 0 0 0 .585.243l10.829-10.929a.857.857 0 0 0-.052-1.463z" fill="#3ECF8E" />
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110" fill="none">
          <path d="M13 10.5h1.8v1.8H13v-1.8zm-2.4 0h1.8v1.8h-1.8v-1.8zm-2.4 0H10v1.8H8.2v-1.8zm-2.4 0h1.8v1.8H5.8v-1.8zm-2.4 0h1.8v1.8H3.4v-1.8zm7.2-2.4h1.8v1.8h-1.8V8.1zm-2.4 0H10v1.8H8.2V8.1zm-2.4 0h1.8v1.8H5.8V8.1zm4.8-2.4h1.8v1.8h-1.8V5.7zM22.5 12c-.4-.3-1.3-.4-2-.2-.2-.8-.7-1.4-1.5-1.8l-.5-.3-.3.5c-.3.7-.4 1.5-.2 2.3-.6.4-1.5.5-2.6.5H2v1.5c0 4.1 3.4 7.5 7.5 7.5 5.5 0 10-3.3 11.7-8.1.7 0 1.5-.1 2-.5l.4-.4-.7-.5h-.4z" fill="#2496ED"/>
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 38 57" className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-3" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
        </svg>
      );
    default:
      return <Code2 className="w-12 h-12 text-[#eab308]" />;
  }
};

/* -------------------------------------------------------------
   Skills Section with Leadership & Core Intangibles Statement
   ------------------------------------------------------------- */
export const SkillsSection: React.FC = () => {
  const [skillsList, setSkillsList] = useState<SkillLogoItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_pure_minimal_skills_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_SKILLS;
  });

  const [statement, setStatement] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('portfolio_leadership_statement');
      if (saved) return saved;
    } catch (e) {}
    return DEFAULT_STATEMENT;
  });

  const [isEditingStatement, setIsEditingStatement] = useState(false);
  const [statementInput, setStatementInput] = useState(statement);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_pure_minimal_skills_v2', JSON.stringify(skillsList));
    } catch (e) {}
  }, [skillsList]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_leadership_statement', statement);
    } catch (e) {}
  }, [statement]);

  useEffect(() => {
    if (isAddModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isAddModalOpen]);

  const handleSaveStatement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statementInput.trim()) return;
    setStatement(statementInput.trim());
    setIsEditingStatement(false);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: SkillLogoItem = {
      id: `custom-${Date.now()}`,
      name: newSkillName.trim().toUpperCase(),
      category: 'frontend',
      iconType: 'custom',
      color: '#eab308',
    };

    setSkillsList([...skillsList, newSkill]);
    setNewSkillName('');
    setIsAddModalOpen(false);
  };

  const handleDeleteSkill = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSkillsList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset skills and statement to original?')) {
      setSkillsList(DEFAULT_SKILLS);
      setStatement(DEFAULT_STATEMENT);
      setStatementInput(DEFAULT_STATEMENT);
      try {
        localStorage.removeItem('portfolio_pure_minimal_skills_v2');
        localStorage.removeItem('portfolio_leadership_statement');
      } catch (e) {}
    }
  };

  return (
    <section id="skills" className="relative w-full bg-transparent text-[#0e0e0e] select-none pt-24 sm:pt-32 md:pt-40 pb-28 md:pb-44 border-t border-black/5">
      
      {/* ----------------- Quick Add Custom Skill Modal ----------------- */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
              onClick={() => setIsAddModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.94, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm bg-white rounded-xs p-6 shadow-2xl border border-black/10 text-left text-[#0e0e0e]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center pb-3 border-b border-black/10">
                  <h3 className="font-['Oswald'] font-black text-lg uppercase tracking-tight">
                    ADD NEW SKILL
                  </h3>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center cursor-pointer text-black"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <form onSubmit={handleAddSkill} className="space-y-3.5 pt-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-black/60 mb-1">
                      Skill Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PYTHON, GRAPHQL..."
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="w-full px-3 py-2 bg-black/[0.03] border border-black/20 rounded-xs font-sans text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-3 py-1.5 text-xs font-mono uppercase text-black/60 hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-black hover:bg-[#eab308] hover:text-black text-white font-mono text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-xs flex items-center gap-1 shadow-md cursor-pointer transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Full-Scale Signature Section Header */}
        <div className="overflow-hidden pb-4 md:pb-6 text-left border-b border-black/10 mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <ScrambleText
              text="SKILLS"
              startIndex={2}
              className="font-['Oswald'] font-black text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-[0.84] tracking-tight uppercase text-[#0e0e0e] select-none text-left"
            />
          </div>

          {/* Quick Edit Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDefaults}
              className="bg-black/5 hover:bg-black/10 text-black/70 hover:text-black font-mono text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
              title="Reset skills & statement"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-black hover:bg-[#eab308] hover:text-black text-white font-mono text-xs uppercase font-bold tracking-widest px-4.5 py-2.5 rounded-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD SKILL</span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------
           PURE MINIMALIST SKILLS GRID WITH STANDOUT HOVER ANIMATIONS
           ------------------------------------------------------------- */}
        <div className="w-full mb-10 sm:mb-12">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-y-10 sm:gap-y-12 md:gap-y-14 gap-x-4 sm:gap-x-6 md:gap-x-8 items-center justify-items-center">
            <AnimatePresence mode="popLayout">
              {skillsList.map((skill, index) => {
                const brandColor = getBrandColor(skill.iconType, skill.color);
                
                return (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, delay: index * 0.015, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.15,
                      transition: { type: 'spring', stiffness: 450, damping: 18 } 
                    }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => {
                      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
                    }}
                    className="relative flex flex-col items-center justify-center text-center group cursor-pointer w-full py-2 select-none"
                  >
                    {/* Delete Button (Visible on hover) */}
                    <button
                      onClick={(e) => handleDeleteSkill(skill.id, e)}
                      className="absolute -top-3 right-0 sm:right-1 z-20 w-6 h-6 rounded-full bg-red-50 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all duration-150 opacity-0 group-hover:opacity-100 shadow-sm cursor-pointer border border-red-200"
                      title={`Delete ${skill.name}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Brand-Colored Radial Halo Backlight on Hover */}
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-all duration-300 pointer-events-none scale-75 group-hover:scale-110"
                      style={{ backgroundColor: brandColor }}
                    />

                    {/* Official Brand Logo with Ambient Brand-Tinted Shadow */}
                    <div 
                      className="relative z-10 h-14 sm:h-16 flex items-center justify-center transition-all duration-300 filter drop-shadow-sm group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                    >
                      {renderOfficialLogo(skill.iconType)}
                    </div>

                    {/* Bold Uppercase Typography with Brand Glow Indicator */}
                    <span 
                      className="relative z-10 font-['Oswald'] font-bold text-xs sm:text-[13px] uppercase tracking-wider text-[#0e0e0e]/75 group-hover:text-black group-hover:tracking-widest transition-all duration-200 mt-2.5 select-none"
                    >
                      {skill.name}
                    </span>

                    {/* Dynamic Brand-Colored Underline Flare */}
                    <span 
                      className="w-0 h-[2px] group-hover:w-6 transition-all duration-300 mt-1 rounded-full shadow-xs"
                      style={{ backgroundColor: brandColor }}
                    />
                  </motion.div>
                );
              })}

              {/* Seamless Add Skill Option */}
              <motion.div
                whileHover={{ 
                  scale: 1.12, 
                  y: -6,
                  transition: { type: 'spring', stiffness: 450, damping: 18 } 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddModalOpen(true)}
                className="flex flex-col items-center justify-center text-center cursor-pointer group w-full py-2"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-black/20 group-hover:border-black bg-black/[0.02] group-hover:bg-black group-hover:text-white text-black/60 flex items-center justify-center transition-all duration-300 shadow-xs">
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </div>
                <span className="font-['Oswald'] font-bold text-xs sm:text-[13px] uppercase tracking-wider text-black/50 group-hover:text-black transition-colors mt-2.5">
                  ADD MORE
                </span>
                <span className="w-0 h-[2px] bg-black group-hover:w-6 transition-all duration-300 mt-1 rounded-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* -------------------------------------------------------------
           CONNECTED SUBPART: LARGE LIGHTWEIGHT EDITABLE STATEMENT
           ------------------------------------------------------------- */}
        <div className="pt-6 sm:pt-8 border-t border-black/10 text-left">
          {isEditingStatement ? (
            <form onSubmit={handleSaveStatement} className="w-full max-w-5xl space-y-3">
              <textarea
                value={statementInput}
                onChange={(e) => setStatementInput(e.target.value)}
                rows={2}
                className="w-full p-4 border border-black/20 rounded-xs font-sans font-light text-xl sm:text-2xl md:text-3xl tracking-tight text-black bg-black/[0.02] focus:outline-none focus:border-black resize-none"
                placeholder="Type your note here..."
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-black hover:bg-[#eab308] hover:text-black text-white font-mono text-xs uppercase font-bold tracking-widest px-4 py-2 rounded-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingStatement(false)}
                  className="px-3.5 py-2 font-mono text-xs uppercase text-black/60 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div 
              onClick={() => {
                setStatementInput(statement);
                setIsEditingStatement(true);
              }}
              className="group cursor-pointer max-w-6xl flex items-baseline gap-3"
              title="Click to edit statement"
            >
              <p className="font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] leading-[1.35] tracking-tight text-black/85 group-hover:text-black transition-colors select-none">
                {statement}
              </p>
              
              <Edit3 className="w-4 h-4 text-black/20 group-hover:text-black shrink-0 transition-colors" />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
