export interface SkillItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
  proficiency: number; // 0 - 100
  color: string;
  iconType: string;
}

export interface SkillCategory {
  id: 'all' | 'frontend' | 'backend' | 'tools' | 'design';
  label: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: 'all', label: 'ALL SKILLS' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'tools', label: 'TOOLS & DEVOPS' },
  { id: 'design', label: 'DESIGN & UI' },
];

export const INITIAL_SKILLS: SkillItem[] = [
  { id: 'react', name: 'React.js', category: 'frontend', proficiency: 95, color: '#00d8ff', iconType: 'react' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', proficiency: 92, color: '#3178c6', iconType: 'typescript' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', proficiency: 96, color: '#f7df1e', iconType: 'javascript' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', proficiency: 90, color: '#0e0e0e', iconType: 'nextjs' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', proficiency: 96, color: '#38bdf8', iconType: 'tailwind' },
  { id: 'html', name: 'HTML5', category: 'frontend', proficiency: 98, color: '#e34f26', iconType: 'html' },
  { id: 'css', name: 'CSS3 / SASS', category: 'frontend', proficiency: 94, color: '#cc6699', iconType: 'sass' },
  
  { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 88, color: '#539e43', iconType: 'nodejs' },
  { id: 'supabase', name: 'Supabase', category: 'backend', proficiency: 90, color: '#3ecf8e', iconType: 'supabase' },
  { id: 'mongodb', name: 'MongoDB', category: 'backend', proficiency: 85, color: '#47a248', iconType: 'mongodb' },
  { id: 'firebase', name: 'Firebase', category: 'backend', proficiency: 86, color: '#ffca28', iconType: 'firebase' },
  
  { id: 'docker', name: 'Docker', category: 'tools', proficiency: 82, color: '#2496ed', iconType: 'docker' },
  { id: 'git', name: 'Git & GitHub', category: 'tools', proficiency: 94, color: '#f05032', iconType: 'github' },
  
  { id: 'figma', name: 'Figma & UI/UX', category: 'design', proficiency: 92, color: '#f24e1e', iconType: 'figma' },
  { id: 'motion', name: 'Framer Motion', category: 'design', proficiency: 90, color: '#ff0055', iconType: 'motion' },
];
