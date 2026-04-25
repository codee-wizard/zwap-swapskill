import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import { MASTER_SKILLS, SKILL_CATEGORIES } from '@/constants/skills';
import type { Skill } from '@/types';
import { searchSkills } from '@/api/skills.api';
import { useDebounce } from '@/hooks/useDebounce';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { formatNumber } from '@/utils/formatters';
import discoverImg from '@/assets/discover-illustration.jpg';

const POPULAR = ['Python', 'UI/UX Design', 'Excel', 'Video Editing', 'Public Speaking'];

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
    <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
      <Card className="bg-gradient-card border-border p-6 lg:p-8 mb-6 overflow-hidden relative">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary-glow mb-3">Browse skills</div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              Explore skills.<br />
              <span className="text-gradient">Find your next swap.</span>
            </h1>
            <p className="text-muted-foreground mt-3 max-w-md">
              Discover skills you want to learn or teach. Connect and grow together.
            </p>
          </div>
          <img src={discoverImg} alt="" className="rounded-xl border border-border max-h-56 object-cover w-full hidden lg:block" loading="lazy" />
        </div>
      </Card>

      <div className="bg-card border border-border rounded-2xl p-3 mb-6 flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search skills or what you want to learn..." className="pl-9 bg-transparent border-0 focus-visible:ring-0" />
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          Popular:
          {POPULAR.map(p => (
            <button key={p} onClick={() => setQuery(p)} className="px-2.5 py-1 rounded-full bg-card-hover border border-border hover:border-primary/50 transition-colors">
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {(['All', ...SKILL_CATEGORIES] as const).map(c => (
          <button
            key={c} onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              category === c ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {!filtered ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-2xl shimmer" />)}
        </div>
      ) : (
        <motion.div
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {filtered.map(s => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{className?: string}>>)[s.icon ?? 'Sparkles'] ?? Icons.Sparkles;
            return (
              <motion.div key={s.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
              >
                <Card className="p-5 bg-gradient-card border-border hover:border-primary/50 transition-colors h-full">
                  <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-primary-glow" />
                  </div>
                  <h3 className="font-semibold">{s.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{formatNumber(s.learners ?? 0)} learners</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.description}</p>
                  <Link to={ROUTES.LISTINGS}>
                    <Button size="sm" variant="ghost" className="mt-3 px-2 h-7 text-primary-glow hover:bg-primary/10">View listings →</Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default DiscoverPage;
