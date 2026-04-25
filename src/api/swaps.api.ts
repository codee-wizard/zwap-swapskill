import { fakeDelay } from './client';
import { mockMatches } from '@/mocks/matches.mock';
import { mockUsers, currentUser } from '@/mocks/users.mock';
import { MASTER_SKILLS } from '@/constants/skills';
import type { Swap } from '@/types';

const sk = (id: string) => MASTER_SKILLS.find(s => s.id === id)!;

const swaps: Swap[] = [
  {
    id: 's-1', participants: [currentUser, mockUsers[2]],
    skillA: sk('sk-2'), skillB: sk('sk-10'),
    status: 'active', startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    sessionsCompleted: 3, totalSessions: 6,
  },
  {
    id: 's-2', participants: [currentUser, mockUsers[0]],
    skillA: sk('sk-2'), skillB: sk('sk-1'),
    status: 'active', startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    sessionsCompleted: 5, totalSessions: 8,
  },
  {
    id: 's-3', participants: [currentUser, mockUsers[3]],
    skillA: sk('sk-2'), skillB: sk('sk-7'),
    status: 'active', startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    sessionsCompleted: 1, totalSessions: 4,
  },
  {
    id: 's-4', participants: [currentUser, mockUsers[5]],
    skillA: sk('sk-2'), skillB: sk('sk-12'),
    status: 'completed', startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    sessionsCompleted: 8, totalSessions: 8,
  },
];

export const getSwaps = async (): Promise<Swap[]> => {
  await fakeDelay();
  return swaps;
};

export const getPendingSwaps = async (): Promise<Swap[]> => {
  await fakeDelay();
  return mockMatches.filter(m => m.status === 'pending').map((m, i) => ({
    id: `pending-${i}`, participants: [currentUser, m.user],
    skillA: m.youTeach[0], skillB: m.theyTeach[0],
    status: 'pending', startedAt: m.createdAt,
    sessionsCompleted: 0, totalSessions: 4,
  }));
};

export const getSwapById = async (id: string): Promise<Swap | null> => {
  await fakeDelay();
  return swaps.find(s => s.id === id) ?? null;
};

export const completeSwap = async (_id: string): Promise<{ ok: true }> => {
  await fakeDelay(400);
  return { ok: true };
};
