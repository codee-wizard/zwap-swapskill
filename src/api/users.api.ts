import { fakeDelay } from './client';
import { mockUsers, currentUser } from '@/mocks/users.mock';
import type { User } from '@/types';

export const getUsers = async (): Promise<User[]> => {
  await fakeDelay();
  return mockUsers;
};

export const getUserById = async (id: string): Promise<User | null> => {
  await fakeDelay();
  if (id === 'me' || id === currentUser.id) return currentUser;
  return mockUsers.find(u => u.id === id) ?? null;
};

export const updateUser = async (patch: Partial<User>): Promise<User> => {
  await fakeDelay();
  return { ...currentUser, ...patch };
};

export const searchUsers = async (query: string): Promise<User[]> => {
  await fakeDelay();
  const q = query.toLowerCase();
  return mockUsers.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.username.toLowerCase().includes(q) ||
    u.teachSkills.some(s => s.skill.name.toLowerCase().includes(q)) ||
    u.learnSkills.some(s => s.skill.name.toLowerCase().includes(q))
  );
};
