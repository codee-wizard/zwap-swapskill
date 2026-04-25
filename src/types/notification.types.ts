export type NotificationType =
  | 'match'
  | 'message'
  | 'request'
  | 'accepted'
  | 'review'
  | 'session'
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  avatar?: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}
