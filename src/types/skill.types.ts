export type SkillCategory =
  | 'Technology'
  | 'Design'
  | 'Business'
  | 'Lifestyle'
  | 'Languages'
  | 'Music'
  | 'Academic'
  | 'Creative';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon?: string;
  learners?: number;
  description?: string;
  level?: SkillLevel;
}

export type SkillType = 'teach' | 'learn' | 'neutral';
