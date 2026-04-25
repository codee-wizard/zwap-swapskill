import type { User } from './user.types';
import type { Skill } from './skill.types';

export interface Match {
  id: string;
  userId: string;       // current user
  user: User;           // matched user
  compatibility: number; // 0..100
  theyTeach: Skill[];
  youTeach: Skill[];
  sharedAvailability: number;
  status: 'suggested' | 'pending' | 'connected' | 'declined';
  createdAt: string;
}
