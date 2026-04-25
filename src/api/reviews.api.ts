import { fakeDelay } from './client';
import { mockReviews } from '@/mocks/reviews.mock';
import type { Review } from '@/types';

export const getReviewsForUser = async (userId: string): Promise<Review[]> => {
  await fakeDelay();
  return mockReviews.filter(r => r.toUserId === userId);
};

export const createReview = async (data: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
  await fakeDelay();
  const r: Review = { ...data, id: `r-${Date.now()}`, createdAt: new Date().toISOString() };
  mockReviews.unshift(r);
  return r;
};
