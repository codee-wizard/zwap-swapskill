import { fakeDelay } from './client';
import { mockNotifications } from '@/mocks/notifications.mock';
import type { Notification } from '@/types';

export const getNotifications = async (): Promise<Notification[]> => {
  await fakeDelay();
  return mockNotifications;
};

export const markRead = async (_id: string): Promise<{ ok: true }> => {
  await fakeDelay(100);
  return { ok: true };
};

export const markAllRead = async (): Promise<{ ok: true }> => {
  await fakeDelay(100);
  return { ok: true };
};
