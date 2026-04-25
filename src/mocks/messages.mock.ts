import type { Conversation, Message } from '@/types';
import { mockUsers } from './users.mock';

export const mockConversations: Conversation[] = [
  { swapId: 's-1', participantId: 'u-3', participantName: mockUsers[2].name, participantAvatar: mockUsers[2].avatar, lastMessage: 'See you tomorrow at 6!', lastMessageAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), unread: 2, online: true },
  { swapId: 's-2', participantId: 'u-1', participantName: mockUsers[0].name, participantAvatar: mockUsers[0].avatar, lastMessage: 'I sent the notes from session 3 ✨', lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), unread: 0, online: true },
  { swapId: 's-3', participantId: 'u-4', participantName: mockUsers[3].name, participantAvatar: mockUsers[3].avatar, lastMessage: 'Try practicing G → C transition', lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(), unread: 0, online: false },
  { swapId: 's-4', participantId: 'u-6', participantName: mockUsers[5].name, participantAvatar: mockUsers[5].avatar, lastMessage: '¡Excelente trabajo!', lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), unread: 1, online: true },
];

export const mockMessages: Record<string, Message[]> = {
  's-1': [
    { id: 'msg-1', swapId: 's-1', senderId: 'u-3', text: 'Hey! Excited to start our swap 🎨', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true },
    { id: 'msg-2', swapId: 's-1', senderId: 'u-me', text: 'Same here! Let\'s do Tues 6pm?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), read: true },
    { id: 'msg-3', swapId: 's-1', senderId: 'u-3', text: 'Perfect. I\'ll prep a portfolio review template.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), read: true },
    { id: 'msg-4', swapId: 's-1', senderId: 'u-me', text: 'Amazing. I\'ll have my Figma file ready.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), read: true },
    { id: 'msg-5', swapId: 's-1', senderId: 'u-3', text: 'See you tomorrow at 6!', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false },
  ],
  's-2': [
    { id: 'msg-6', swapId: 's-2', senderId: 'u-1', text: 'I sent the notes from session 3 ✨', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: true },
  ],
  's-3': [
    { id: 'msg-7', swapId: 's-3', senderId: 'u-4', text: 'Try practicing G → C transition', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(), read: true },
  ],
  's-4': [
    { id: 'msg-8', swapId: 's-4', senderId: 'u-6', text: '¡Excelente trabajo!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), read: false },
  ],
};
