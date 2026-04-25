import type { Notification } from '@/types';
import { mockUsers } from './users.mock';

export const mockNotifications: Notification[] = [
  { id: 'n-1', type: 'match', title: 'New match: 94% compatibility', body: `${mockUsers[0].name} teaches Python and wants to learn Design.`, avatar: mockUsers[0].avatar, createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(), read: false, actionUrl: '/profile/u-1' },
  { id: 'n-2', type: 'message', title: 'New message', body: `${mockUsers[2].name}: See you tomorrow at 6!`, avatar: mockUsers[2].avatar, createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false, actionUrl: '/messages/s-1' },
  { id: 'n-3', type: 'request', title: 'Swap request', body: `${mockUsers[3].name} wants to swap Guitar for UI/UX Design.`, avatar: mockUsers[3].avatar, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: false, actionUrl: '/connections' },
  { id: 'n-4', type: 'accepted', title: 'Swap accepted!', body: `${mockUsers[2].name} accepted your swap. Time to schedule.`, avatar: mockUsers[2].avatar, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), read: true, actionUrl: '/messages/s-1' },
  { id: 'n-5', type: 'review', title: 'New 5-star review', body: `${mockUsers[5].name} left you a glowing review. ✨`, avatar: mockUsers[5].avatar, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), read: true, actionUrl: '/profile/me' },
  { id: 'n-6', type: 'session', title: 'Session in 1 hour', body: 'Your session with Rhea Kapoor starts at 6:00 PM.', avatar: mockUsers[2].avatar, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), read: true },
  { id: 'n-7', type: 'system', title: 'Welcome to Zwap 🎉', body: 'Complete your profile to unlock perfect matches.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), read: true },
];
