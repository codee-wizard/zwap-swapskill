import { create } from 'zustand';
import type { Notification } from '@/types';
import { mockNotifications } from '@/mocks/notifications.mock';

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  load: () => void;
  add: (n: Notification) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,
  load: () => set({ notifications: mockNotifications, unreadCount: mockNotifications.filter(n => !n.read).length }),
  add: (n) => set((s) => ({ notifications: [n, ...s.notifications], unreadCount: s.unreadCount + 1 })),
  markRead: (id) => set((s) => {
    const next = s.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    return { notifications: next, unreadCount: next.filter(n => !n.read).length };
  }),
  markAllRead: () => set((s) => ({ notifications: s.notifications.map(n => ({ ...n, read: true })), unreadCount: 0 })),
}));
