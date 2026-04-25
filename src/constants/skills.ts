import type { Skill } from '@/types';

export const SKILL_CATEGORIES = [
  'Technology', 'Design', 'Business', 'Lifestyle',
  'Languages', 'Music', 'Academic', 'Creative',
] as const;

export const MASTER_SKILLS: Skill[] = [
  { id: 'sk-1', name: 'Python', category: 'Technology', icon: 'Code2', learners: 12400, description: 'Learn Python programming from basics to advanced.', level: 'Intermediate' },
  { id: 'sk-2', name: 'UI/UX Design', category: 'Design', icon: 'Palette', learners: 8700, description: 'Design beautiful and usable interfaces.', level: 'Beginner' },
  { id: 'sk-3', name: 'Video Editing', category: 'Creative', icon: 'Video', learners: 6200, description: 'Edit videos like a pro using industry-leading tools.', level: 'Intermediate' },
  { id: 'sk-4', name: 'Digital Marketing', category: 'Business', icon: 'TrendingUp', learners: 5100, description: 'Grow brands and create impactful campaigns.', level: 'Beginner' },
  { id: 'sk-5', name: 'Public Speaking', category: 'Lifestyle', icon: 'Mic', learners: 4800, description: 'Speak with confidence and inspire any audience.', level: 'All Levels' },
  { id: 'sk-6', name: 'Photography', category: 'Creative', icon: 'Camera', learners: 4300, description: 'Capture moments and tell stories through photos.', level: 'Beginner' },
  { id: 'sk-7', name: 'Guitar', category: 'Music', icon: 'Music', learners: 3900, description: 'Play your favorite songs and create music.', level: 'Beginner' },
  { id: 'sk-8', name: 'Excel', category: 'Business', icon: 'Table2', learners: 3600, description: 'Master spreadsheets and boost productivity.', level: 'Intermediate' },
  { id: 'sk-9', name: 'English', category: 'Languages', icon: 'MessageCircle', learners: 3200, description: 'Improve your English speaking skills.', level: 'All Levels' },
  { id: 'sk-10', name: 'Illustration', category: 'Creative', icon: 'PenTool', learners: 2900, description: 'Create stunning illustrations and digital art.', level: 'Beginner' },
  { id: 'sk-11', name: 'React', category: 'Technology', icon: 'Component', learners: 9100, description: 'Build modern web apps with React.', level: 'Intermediate' },
  { id: 'sk-12', name: 'Spanish', category: 'Languages', icon: 'Languages', learners: 5400, description: 'Conversational Spanish from day one.', level: 'Beginner' },
  { id: 'sk-13', name: 'Yoga', category: 'Lifestyle', icon: 'Flower', learners: 2800, description: 'Find balance through yoga practice.', level: 'All Levels' },
  { id: 'sk-14', name: 'Piano', category: 'Music', icon: 'Piano', learners: 2400, description: 'Learn piano from sheet music to improvisation.', level: 'Beginner' },
  { id: 'sk-15', name: 'Data Science', category: 'Technology', icon: 'BarChart3', learners: 7800, description: 'Analyze data and uncover insights.', level: 'Advanced' },
  { id: 'sk-16', name: 'Cooking', category: 'Lifestyle', icon: 'ChefHat', learners: 4100, description: 'Master techniques from cuisines worldwide.', level: 'All Levels' },
  { id: 'sk-17', name: 'Writing', category: 'Creative', icon: 'PenLine', learners: 3300, description: 'Craft compelling stories and essays.', level: 'All Levels' },
  { id: 'sk-18', name: 'Mathematics', category: 'Academic', icon: 'Sigma', learners: 2200, description: 'Conquer math from algebra to calculus.', level: 'Intermediate' },
];
