import { useEffect, useState } from 'react';
import { ListingCard } from '@/components/shared/ListingCard';
import { MatchCard } from '@/components/shared/MatchCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Activity, MessageSquare, GraduationCap, CheckCircle } from 'lucide-react';
import { getListings } from '@/api/listings.api';
import { getMatches } from '@/api/matches.api';
import type { Listing, ListingType, Match } from '@/types';
import { SKILL_CATEGORIES } from '@/constants/skills';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuthStore } from '@/store/auth.store';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';

const STATS = [
  { label: 'Active Swaps', value: '3', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Unread Messages', value: '12', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { label: 'Skills Learned', value: '5', icon: GraduationCap, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Profile Health', value: '85%', icon: CheckCircle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

const DashboardPage = () => {
  const user = useAuthStore(s => s.user);
  const [type, setType] = useState<'all' | ListingType>('all');
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 250);
  
  const [listings, setListings] = useState<Listing[] | null>(null);
  const [matches, setMatches] = useState<Match[] | null>(null);

  useEffect(() => {
    if (!user) return;
    getMatches(user.id).then(setMatches);
  }, [user]);

  useEffect(() => {
    setListings(null);
    getListings({
      type: type === 'all' ? undefined : type,
      category: category === 'All' ? undefined : category,
      query: debounced || undefined,
    }).then(setListings);
  }, [type, category, debounced]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-10">
      
      {/* Header */}
      <PageHeader 
        title={`Dashboard`} 
        description={`Welcome back, ${user?.name?.split(' ')[0]} 👋 Here's what's happening.`}
        action={
          <Button className="bg-primary hover:bg-primary-hover gap-2">
            <Plus className="h-4 w-4" /> Post a listing
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/50 transition-colors"
          >
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommended Matches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recommended Matches</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">View all</Button>
        </div>
        {!matches ? (
          <div className="flex gap-4 overflow-x-hidden">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="min-w-[300px] md:min-w-[350px] h-72 rounded-2xl shimmer" />)}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
            {matches.slice(0, 5).map(m => (
              <div key={m.id} className="min-w-[300px] md:min-w-[350px] snap-start">
                <MatchCard match={m} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explore Listings */}
      <div>
        <h2 className="text-xl font-bold mb-4">Explore Listings</h2>
        <div className="bg-card border border-border rounded-2xl p-3 mb-6 flex flex-col lg:flex-row gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search listings…" className="pl-9 bg-transparent border-0 focus-visible:ring-0" />
          </div>
          <div className="flex items-center gap-1 bg-card-hover rounded-full p-1">
            {(['all', 'offer', 'request'] as const).map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize transition-colors ${
                  type === t ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t === 'all' ? 'All' : t === 'offer' ? 'Offering' : 'Wanted'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 hide-scrollbar">
          {(['All', ...SKILL_CATEGORIES] as const).map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === c ? 'bg-primary/15 text-primary-glow border border-primary/40' : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {!listings ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl shimmer" />)}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground bg-card border border-border rounded-2xl">
            <p className="font-medium text-foreground">No listings found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden" animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {listings.map(l => (
              <motion.div key={l.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
                <ListingCard listing={l} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;
