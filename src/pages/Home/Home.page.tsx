import { useEffect, useState } from 'react';
import { MatchCard } from '@/components/shared/MatchCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { getMatches } from '@/api/matches.api';
import type { Match } from '@/types';
import { useAuthStore } from '@/store/auth.store';
import { motion } from 'framer-motion';
import { Filter, Sparkles } from 'lucide-react';

const HomePage = () => {
  const user = useAuthStore(s => s.user);
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [mode, setMode] = useState<'best' | 'newest' | 'nearby'>('best');

  useEffect(() => {
    if (!user) return;
    getMatches(user.id).then(setMatches);
  }, [user]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-muted-foreground mt-1">{matches?.length ?? '…'} fresh matches based on your skills.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-full p-1">
          {(['best', 'newest', 'nearby'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize transition-colors ${
                mode === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {m === 'best' && <Sparkles className="h-3 w-3 inline mr-1" />} {m}
            </button>
          ))}
          <Button size="sm" variant="ghost" className="ml-1"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      {!matches ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl shimmer" />
          ))}
        </div>
      ) : (
        <motion.div
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {matches.map(m => (
            <motion.div key={m.id} variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
            }}>
              <MatchCard match={m} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
