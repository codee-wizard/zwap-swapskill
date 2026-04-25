import type { Review } from '@/types';
import { mockUsers } from './users.mock';

export const mockReviews: Review[] = [
  { id: 'r-1', fromUserId: 'u-1', fromUserName: mockUsers[0].name, fromUserAvatar: mockUsers[0].avatar, toUserId: 'u-me', rating: 5, comment: 'Alex is an incredible design mentor. Patient, clear, and full of practical advice.', skill: 'UI/UX Design', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() },
  { id: 'r-2', fromUserId: 'u-3', fromUserName: mockUsers[2].name, fromUserAvatar: mockUsers[2].avatar, toUserId: 'u-me', rating: 5, comment: 'Best swap I\'ve done on Zwap. We finished my portfolio together!', skill: 'Illustration', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString() },
  { id: 'r-3', fromUserId: 'u-5', fromUserName: mockUsers[4].name, fromUserAvatar: mockUsers[4].avatar, toUserId: 'u-me', rating: 4, comment: 'Great teacher, super helpful with feedback rounds.', skill: 'UI/UX Design', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString() },
  { id: 'r-4', fromUserId: 'u-me', fromUserName: 'Alex Rivera', fromUserAvatar: mockUsers[0].avatar, toUserId: 'u-1', rating: 5, comment: 'Meera made Python click for me. 10/10.', skill: 'Python', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString() },
];
