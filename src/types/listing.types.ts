import type { Skill, SkillLevel } from './skill.types';
import type { User } from './user.types';

export type ListingType = 'offer' | 'request';

export interface Listing {
  id: string;
  type: ListingType;
  title: string;
  description: string;
  skill: Skill;
  level: SkillLevel;
  author: User;
  wantsInReturn?: Skill[];
  createdAt: string;
  responses: number;
}
