export interface Message {
  id: string;
  swapId: string;
  senderId: string;
  text: string;
  createdAt: string;
  read: boolean;
  type?: 'text' | 'system' | 'schedule';
}

export interface Conversation {
  swapId: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  online?: boolean;
}
