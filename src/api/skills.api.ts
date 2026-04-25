import { fakeDelay } from './client';
import { MASTER_SKILLS } from '@/constants/skills';
import type { Skill, SkillCategory } from '@/types';

export const getSkills = async (category?: SkillCategory | 'All'): Promise<Skill[]> => {
  await fakeDelay();
  if (!category || category === 'All') return MASTER_SKILLS;
  return MASTER_SKILLS.filter(s => s.category === category);
};

export const searchSkills = async (query: string): Promise<Skill[]> => {
  await fakeDelay(200);
  const q = query.toLowerCase().trim();
  if (!q) return MASTER_SKILLS;
  return MASTER_SKILLS.filter(s => s.name.toLowerCase().includes(q));
};
