import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, Users as UsersIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { MASTER_SKILLS, SKILL_CATEGORIES } from '@/constants/skills';
import type { Skill } from '@/types';
import { searchSkills } from '@/api/skills.api';
import { useDebounce } from '@/hooks/useDebounce';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { formatNumber } from '@/utils/formatters';
import { PixelAvatar } from '@/components/shared/PixelAvatar';
import { PageHeader } from '@/components/shared/PageHeader';

const POPULAR = ['Python', 'UI/UX Design', 'Excel', 'Video Editing', 'Public Speaking'];

const FEATURED_CREATORS = [
  { id: '1', name: 'Alice Chen', role: 'UX Designer', avatar: undefined, rating: 4.9 },
  { id: '2', name: 'Bob Smith', role: 'Data Scientist', avatar: undefined, rating: 4.8 },
  { id: '3', name: 'Charlie Liu', role: 'Frontend Eng', avatar: undefined, rating: 5.0 },
];

const DiscoverPage = () => {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 250);
  const [category, setCategory] = useState<'All' | string>('All');
  const [skills, setSkills] = useState<Skill[] | null>(null);

  useEffect(() => {
    setSkills(null);
    searchSkills(debounced).then(setSkills);
  }, [debounced]);

  const filtered = useMemo(() => {
    if (!skills) return null;
    return category === 'All' ? skills : skills.filter(s => s.category === category);
  }, [skills, category]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-10">
      
      <PageHeader 
        title="Discover" 
        description="Search thousands of skills and connect with experts ready to swap." 
      />
      
      {/* Search Bar */}
      <div className="flex flex-col items-center max-w-3xl mx-auto space-y-6">
        <div className="w-full relative shadow-lg shadow-primary/5 rounded-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Search for Python, Marketing, Guitar..." 
            className="pl-12 pr-4 py-6 rounded-full bg-card border-border text-base focus-visible:ring-primary/50" 
          />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 mr-1 text-primary" /> Trending:
          {POPULAR.map(p => (
            <button key={p} onClick={() => setQuery(p)} className="px-3 py-1 rounded-full bg-card hover:bg-primary/10 hover:text-primary border border-border transition-colors">
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Creators Section */}
      {!query && category === 'All' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><UsersIcon className="h-5 w-5 text-primary" /> Top Mentors This Week</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_CREATORS.map(c => (
              <Card key={c.id} className="p-4 bg-card border-border hover:border-primary/30 transition-colors flex items-center gap-4">
                <PixelAvatar src={c.avatar} name={c.name} size="md" />
                <div>
                  <h3 className="font-semibold text-sm">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.role}</p>
                  <div className="text-xs font-medium text-yellow-500 mt-1">★ {c.rating}</div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto text-xs h-7 px-2">View</Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Browse Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Browse Categories</h2>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
          {(['All', ...SKILL_CATEGORIES] as const).map(c => (
            <button
              key={c} onClick={() => setCategory(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === c ? 'bg-primary/15 text-primary-glow border border-primary/40 shadow-sm' : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {!filtered ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-2xl shimmer" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground bg-card border border-border rounded-2xl">
            <p className="font-medium text-foreground">No skills found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map(s => {
              const Icon = (Icons as unknown as Record<string, React.ComponentType<{className?: string}>>)[s.icon ?? 'Sparkles'] ?? Icons.Sparkles;
              return (
                <motion.div key={s.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -4 }}>
                  <Card className="p-5 bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all h-full rounded-2xl flex flex-col group">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg leading-tight">{s.name}</h3>
                    <p className="text-xs font-medium text-muted-foreground mt-1.5">{formatNumber(s.learners ?? 0)} active swappers</p>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed flex-1">{s.description}</p>
                    <Link to={`${ROUTES.DASHBOARD}?category=${encodeURIComponent(s.name)}`} className="mt-4 block">
                      <Button size="sm" variant="secondary" className="w-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        View active listings
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;
