import type { Listing } from '@/types';
import { mockUsers } from './users.mock';
import { MASTER_SKILLS } from '@/constants/skills';

const sk = (id: string) => MASTER_SKILLS.find(s => s.id === id)!;

export const mockListings: Listing[] = [
  {
    id: 'l-1', type: 'offer', title: 'Teach you Python in 30 days',
    description: 'I\'ll guide you through Python fundamentals with daily 30-min sessions and real projects.',
    skill: sk('sk-1'), level: 'Beginner', author: mockUsers[0],
    wantsInReturn: [sk('sk-2')], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), responses: 12,
  },
  {
    id: 'l-2', type: 'request', title: 'Looking for a UI/UX mentor',
    description: 'Junior designer wanting weekly portfolio reviews and industry advice.',
    skill: sk('sk-2'), level: 'Intermediate', author: mockUsers[1],
    wantsInReturn: [sk('sk-11'), sk('sk-1')], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), responses: 7,
  },
  {
    id: 'l-3', type: 'offer', title: 'Guitar lessons (acoustic, beginner-friendly)',
    description: 'From your first chord to your first song. We\'ll go at your pace.',
    skill: sk('sk-7'), level: 'Beginner', author: mockUsers[3],
    wantsInReturn: [sk('sk-1')], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), responses: 18,
  },
  {
    id: 'l-4', type: 'offer', title: 'Conversational Spanish — daily practice',
    description: 'Native speaker offering 20-min daily conversation sessions.',
    skill: sk('sk-12'), level: 'All Levels', author: mockUsers[5],
    wantsInReturn: [sk('sk-11')], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(), responses: 23,
  },
  {
    id: 'l-5', type: 'request', title: 'Need help with data science fundamentals',
    description: 'Career switcher learning ML. Looking for someone patient.',
    skill: sk('sk-15'), level: 'Beginner', author: mockUsers[7],
    wantsInReturn: [sk('sk-17'), sk('sk-13')], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(), responses: 4,
  },
  {
    id: 'l-6', type: 'offer', title: 'Photography fundamentals: composition & light',
    description: 'Weekly photo walks (virtual). Bring your camera or phone.',
    skill: sk('sk-6'), level: 'Beginner', author: mockUsers[6],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), responses: 31,
  },
  {
    id: 'l-7', type: 'offer', title: 'React + TypeScript for designers',
    description: 'Bridge from Figma to working app. 4-week guided sprint.',
    skill: sk('sk-11'), level: 'Beginner', author: mockUsers[1],
    wantsInReturn: [sk('sk-2')], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), responses: 14,
  },
  {
    id: 'l-8', type: 'request', title: 'Public speaking practice partner',
    description: 'Preparing for a conference talk. Need weekly practice rounds.',
    skill: sk('sk-5'), level: 'Intermediate', author: mockUsers[4],
    wantsInReturn: [sk('sk-15')], createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(), responses: 6,
  },
];
