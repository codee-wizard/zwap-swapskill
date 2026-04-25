import { fakeDelay } from './client';
import { mockMatches } from '@/mocks/matches.mock';
import type { Match } from '@/types';

export const getMatches = async (userId: string): Promise<Match[]> => {
  await fakeDelay();
  return mockMatches.filter(m => m.userId === userId);
};

export const sendMatchRequest = async (_matchId: string): Promise<{ ok: true }> => {
  await fakeDelay(300);
  return { ok: true };
};

export const dismissMatch = async (_matchId: string): Promise<{ ok: true }> => {
  await fakeDelay(150);
  return { ok: true };
};
