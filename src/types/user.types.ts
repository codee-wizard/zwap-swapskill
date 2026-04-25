import type { Skill, SkillLevel } from './skill.types';

export type UserRole = 'learner' | 'teacher' | 'both';

export interface UserSkill {
  skill: Skill;
  level: SkillLevel;
  type: 'teach' | 'learn';
}

export type AvailabilitySlot = 'morning' | 'afternoon' | 'evening';
export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type Availability = Record<DayKey, Record<AvailabilitySlot, boolean>>;

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatar: string;
  bio?: string;
  location?: string;
  timezone?: string;
  role: UserRole;
  teachSkills: UserSkill[];
  learnSkills: UserSkill[];
  availability: Availability;
  rating: number;
  swapsCompleted: number;
  joinedAt: string;
  isOnline?: boolean;
  badges?: string[];
}
