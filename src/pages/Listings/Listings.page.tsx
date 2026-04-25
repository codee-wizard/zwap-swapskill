import { useEffect, useState } from 'react';
import { ListingCard } from '@/components/shared/ListingCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { getListings } from '@/api/listings.api';
import type { Listing, ListingType } from '@/types';
import { SKILL_CATEGORIES } from '@/constants/skills';
import { useDebounce } from '@/hooks/useDebounce';
import { motion } from 'framer-motion';

const ListingsPage = () => {
  const [type, setType] = useState<'all' | ListingType>('all');
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 250);
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    setListings(null);
    getListings({
      type: type === 'all' ? undefined : type,
      category: category === 'All' ? undefined : category,
      query: debounced || undefined,
    }).then(setListings);
  }, [type, category, debounced]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Skill board</h1>
          <p className="text-muted-foreground mt-1">Offers and requests posted by the community.</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover gap-2">
          <Plus className="h-4 w-4" /> Post a listing
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-3 mb-6 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search listings…" className="pl-9 bg-transparent border-0 focus-visible:ring-0" />
        </div>
        <div className="flex items-center gap-1 bg-card-hover rounded-full p-1">
          {(['all', 'offer', 'request'] as const).map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize transition-colors ${
                type === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'all' ? 'All' : t === 'offer' ? 'Offering' : 'Wanted'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {(['All', ...SKILL_CATEGORIES] as const).map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              category === c ? 'bg-primary/15 text-primary-glow border border-primary/40' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
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
        <div className="text-center py-16 text-muted-foreground">No listings match those filters.</div>
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
  );
};

export default ListingsPage;
