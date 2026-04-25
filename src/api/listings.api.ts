import { fakeDelay } from './client';
import { mockListings } from '@/mocks/listings.mock';
import type { Listing, ListingType } from '@/types';

export const getListings = async (filter?: { type?: ListingType; query?: string; category?: string }): Promise<Listing[]> => {
  await fakeDelay();
  let list = [...mockListings];
  if (filter?.type) list = list.filter(l => l.type === filter.type);
  if (filter?.category && filter.category !== 'All') list = list.filter(l => l.skill.category === filter.category);
  if (filter?.query) {
    const q = filter.query.toLowerCase();
    list = list.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.skill.name.toLowerCase().includes(q)
    );
  }
  return list;
};

export const createListing = async (data: Partial<Listing>): Promise<Listing> => {
  await fakeDelay();
  const created = { ...mockListings[0], ...data, id: `l-${Date.now()}`, createdAt: new Date().toISOString(), responses: 0 } as Listing;
  mockListings.unshift(created);
  return created;
};
