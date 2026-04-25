import type { Match } from '@/types';
import { mockUsers } from './users.mock';
import { MASTER_SKILLS } from '@/constants/skills';

const sk = (id: string) => MASTER_SKILLS.find(s => s.id === id)!;

export const mockMatches: Match[] = [
  {
    id: 'm-1', userId: 'u-me', user: mockUsers[0], compatibility: 94,
    theyTeach: [sk('sk-1'), sk('sk-15')], youTeach: [sk('sk-2')],
    sharedAvailability: 8, status: 'suggested', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'm-2', userId: 'u-me', user: mockUsers[3], compatibility: 88,
    theyTeach: [sk('sk-7'), sk('sk-14')], youTeach: [sk('sk-2')],
    sharedAvailability: 6, status: 'suggested', createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'm-3', userId: 'u-me', user: mockUsers[2], compatibility: 91,
    theyTeach: [sk('sk-2'), sk('sk-10')], youTeach: [sk('sk-10')],
    sharedAvailability: 5, status: 'connected', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'm-4', userId: 'u-me', user: mockUsers[4], compatibility: 86,
    theyTeach: [sk('sk-15'), sk('sk-1')], youTeach: [sk('sk-2')],
    sharedAvailability: 4, status: 'pending', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'm-5', userId: 'u-me', user: mockUsers[5], compatibility: 82,
    theyTeach: [sk('sk-12'), sk('sk-5')], youTeach: [sk('sk-2')],
    sharedAvailability: 3, status: 'suggested', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: 'm-6', userId: 'u-me', user: mockUsers[1], compatibility: 79,
    theyTeach: [sk('sk-11')], youTeach: [sk('sk-2')],
    sharedAvailability: 7, status: 'suggested', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];
