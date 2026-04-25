import type { User } from './user.types';
import type { Skill } from './skill.types';

export type SwapStatus = 'pending' | 'active' | 'completed' | 'declined';

export interface Swap {
  id: string;
  participants: [User, User];
  skillA: Skill;
  skillB: Skill;
  status: SwapStatus;
  startedAt: string;
  completedAt?: string;
  sessionsCompleted: number;
  totalSessions: number;
}
