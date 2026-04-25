import type { User, Availability } from '@/types';
import { MASTER_SKILLS } from '@/constants/skills';

const allTrue = (): Availability => ({
  mon: { morning: true, afternoon: false, evening: true },
  tue: { morning: false, afternoon: true, evening: true },
  wed: { morning: true, afternoon: true, evening: false },
  thu: { morning: false, afternoon: false, evening: true },
  fri: { morning: true, afternoon: false, evening: false },
  sat: { morning: true, afternoon: true, evening: true },
  sun: { morning: false, afternoon: true, evening: true },
});

const empty = (): Availability => ({
  mon: { morning: false, afternoon: false, evening: false },
  tue: { morning: false, afternoon: false, evening: false },
  wed: { morning: false, afternoon: false, evening: false },
  thu: { morning: false, afternoon: false, evening: false },
  fri: { morning: false, afternoon: false, evening: false },
  sat: { morning: false, afternoon: false, evening: false },
  sun: { morning: false, afternoon: false, evening: false },
});

const sk = (id: string) => MASTER_SKILLS.find(s => s.id === id)!;

// Pixel-style avatar generator using DiceBear pixel-art (free, no auth)
const av = (seed: string) => `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}&backgroundColor=7c3aed,6d28d9,14b8a6,22c55e&backgroundType=gradientLinear`;

export const currentUser: User = {
  id: 'u-me',
  name: 'Alex Rivera',
  username: 'alexr',
  email: 'alex@zwap.app',
  avatar: av('alex-rivera'),
  bio: 'Designer by day, guitar player by night. Always learning.',
  location: 'San Francisco, CA',
  timezone: 'PST',
  role: 'both',
  teachSkills: [
    { skill: sk('sk-2'), level: 'Advanced', type: 'teach' },
    { skill: sk('sk-10'), level: 'Intermediate', type: 'teach' },
  ],
  learnSkills: [
    { skill: sk('sk-1'), level: 'Beginner', type: 'learn' },
    { skill: sk('sk-7'), level: 'Beginner', type: 'learn' },
  ],
  availability: allTrue(),
  rating: 4.9,
  swapsCompleted: 12,
  joinedAt: '2024-08-15',
  isOnline: true,
  badges: ['Top Teacher', 'Early Adopter'],
};

export const mockUsers: User[] = [
  {
    id: 'u-1', name: 'Meera Sharma', username: 'meera_code', avatar: av('meera-sharma'),
    bio: 'Python dev who loves teaching beginners. Coffee enthusiast.',
    location: 'Mumbai, India', timezone: 'IST', role: 'both',
    teachSkills: [
      { skill: sk('sk-1'), level: 'Advanced', type: 'teach' },
      { skill: sk('sk-15'), level: 'Intermediate', type: 'teach' },
    ],
    learnSkills: [{ skill: sk('sk-2'), level: 'Beginner', type: 'learn' }],
    availability: allTrue(), rating: 4.9, swapsCompleted: 24,
    joinedAt: '2024-03-12', isOnline: true, badges: ['Top Contributor'],
  },
  {
    id: 'u-2', name: 'Arjun Verma', username: 'arjun_dev', avatar: av('arjun-verma'),
    bio: 'Full-stack engineer. Teaching React, learning UI design.',
    location: 'Bangalore, India', timezone: 'IST', role: 'both',
    teachSkills: [
      { skill: sk('sk-11'), level: 'Advanced', type: 'teach' },
      { skill: sk('sk-1'), level: 'Intermediate', type: 'teach' },
    ],
    learnSkills: [{ skill: sk('sk-2'), level: 'Beginner', type: 'learn' }],
    availability: allTrue(), rating: 4.8, swapsCompleted: 18,
    joinedAt: '2024-05-04', isOnline: false,
  },
  {
    id: 'u-3', name: 'Rhea Kapoor', username: 'rhea_designs', avatar: av('rhea-kapoor'),
    bio: 'Product designer at a startup. Sharing design wisdom.',
    location: 'Delhi, India', timezone: 'IST', role: 'both',
    teachSkills: [
      { skill: sk('sk-2'), level: 'Advanced', type: 'teach' },
      { skill: sk('sk-10'), level: 'Advanced', type: 'teach' },
    ],
    learnSkills: [{ skill: sk('sk-11'), level: 'Beginner', type: 'learn' }],
    availability: allTrue(), rating: 5.0, swapsCompleted: 31,
    joinedAt: '2024-01-20', isOnline: true, badges: ['Top Teacher'],
  },
  {
    id: 'u-4', name: 'Kabir Singh', username: 'kabir_py', avatar: av('kabir-singh'),
    bio: 'Music producer & guitarist. Will trade riffs for code.',
    location: 'Toronto, Canada', timezone: 'EST', role: 'both',
    teachSkills: [
      { skill: sk('sk-7'), level: 'Advanced', type: 'teach' },
      { skill: sk('sk-14'), level: 'Intermediate', type: 'teach' },
    ],
    learnSkills: [{ skill: sk('sk-1'), level: 'Beginner', type: 'learn' }],
    availability: allTrue(), rating: 4.7, swapsCompleted: 9,
    joinedAt: '2024-07-11', isOnline: true,
  },
  {
    id: 'u-5', name: 'Ayesha Khan', username: 'ayesha_ml', avatar: av('ayesha-khan'),
    bio: 'ML engineer. Teaching data science, learning languages.',
    location: 'Berlin, Germany', timezone: 'CET', role: 'both',
    teachSkills: [
      { skill: sk('sk-15'), level: 'Advanced', type: 'teach' },
      { skill: sk('sk-1'), level: 'Advanced', type: 'teach' },
    ],
    learnSkills: [{ skill: sk('sk-12'), level: 'Beginner', type: 'learn' }],
    availability: allTrue(), rating: 4.9, swapsCompleted: 15,
    joinedAt: '2024-04-22', isOnline: false,
  },
  {
    id: 'u-6', name: 'Diego Martinez', username: 'diego_speaks', avatar: av('diego-martinez'),
    bio: 'Native Spanish speaker, public speaking coach.',
    location: 'Mexico City, Mexico', timezone: 'CST', role: 'both',
    teachSkills: [
      { skill: sk('sk-12'), level: 'Advanced', type: 'teach' },
      { skill: sk('sk-5'), level: 'Advanced', type: 'teach' },
    ],
    learnSkills: [{ skill: sk('sk-11'), level: 'Beginner', type: 'learn' }],
    availability: allTrue(), rating: 4.8, swapsCompleted: 22,
    joinedAt: '2024-02-14', isOnline: true,
  },
  {
    id: 'u-7', name: 'Yuki Tanaka', username: 'yuki_lens', avatar: av('yuki-tanaka'),
    bio: 'Photographer & filmmaker. Teaching the craft.',
    location: 'Tokyo, Japan', timezone: 'JST', role: 'teacher',
    teachSkills: [
      { skill: sk('sk-6'), level: 'Advanced', type: 'teach' },
      { skill: sk('sk-3'), level: 'Advanced', type: 'teach' },
    ],
    learnSkills: [],
    availability: allTrue(), rating: 4.9, swapsCompleted: 28,
    joinedAt: '2024-03-30', isOnline: false, badges: ['Verified'],
  },
  {
    id: 'u-8', name: 'Nora Ahmed', username: 'nora_writes', avatar: av('nora-ahmed'),
    bio: 'Writer, illustrator, and yoga teacher.',
    location: 'Cairo, Egypt', timezone: 'EET', role: 'both',
    teachSkills: [
      { skill: sk('sk-17'), level: 'Advanced', type: 'teach' },
      { skill: sk('sk-13'), level: 'Intermediate', type: 'teach' },
    ],
    learnSkills: [{ skill: sk('sk-2'), level: 'Beginner', type: 'learn' }],
    availability: allTrue(), rating: 4.7, swapsCompleted: 11,
    joinedAt: '2024-06-08', isOnline: true,
  },
];

export { av as avatarFor, allTrue, empty };
