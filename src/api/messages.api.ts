import { fakeDelay } from './client';
import { mockConversations, mockMessages } from '@/mocks/messages.mock';
import type { Conversation, Message } from '@/types';

export const getConversations = async (): Promise<Conversation[]> => {
  await fakeDelay();
  return mockConversations;
};

export const getMessages = async (swapId: string): Promise<Message[]> => {
  await fakeDelay(250);
  return mockMessages[swapId] ?? [];
};

export const sendMessage = async (swapId: string, text: string): Promise<Message> => {
  await fakeDelay(150);
  const m: Message = {
    id: `msg-${Date.now()}`, swapId, senderId: 'u-me', text,
    createdAt: new Date().toISOString(), read: true,
  };
  if (!mockMessages[swapId]) mockMessages[swapId] = [];
  mockMessages[swapId].push(m);
  return m;
};
