import { fakeDelay } from './client';
import { currentUser } from '@/mocks/users.mock';
import type { User } from '@/types';

export const login = async (_email: string, _password: string): Promise<{ user: User; token: string }> => {
  await fakeDelay();
  return { user: currentUser, token: 'mock-token-zwap' };
};

export const signup = async (data: Partial<User> & { email: string }): Promise<{ user: User; token: string }> => {
  await fakeDelay();
  return { user: { ...currentUser, ...data }, token: 'mock-token-zwap' };
};

export const logout = async (): Promise<void> => {
  await fakeDelay(150);
};

export const getCurrentUser = async (): Promise<User> => {
  await fakeDelay(200);
  return currentUser;
};
