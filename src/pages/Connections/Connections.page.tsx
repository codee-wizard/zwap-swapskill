import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PixelAvatar } from '@/components/shared/PixelAvatar';
import { SkillBadge } from '@/components/shared/SkillBadge';
import { CelebrationOverlay } from '@/components/shared/CelebrationOverlay';
import { Progress } from '@/components/ui/progress';
import { getSwaps, getPendingSwaps, completeSwap } from '@/api/swaps.api';
import type { Swap } from '@/types';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Calendar, Check, MessageSquare, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { formatRelative } from '@/utils/formatters';

const SwapRow = ({ swap, onComplete }: { swap: Swap; onComplete?: () => void }) => {
  const me = swap.participants[0];
  const them = swap.participants[1];
  return (
    <Card className="bg-gradient-card border-border p-5 hover:border-primary/40 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3">
          <PixelAvatar src={them.avatar} name={them.name} size="lg" online={them.isOnline} />
          <div>
            <Link to={ROUTES.PROFILE(them.id)} className="font-semibold hover:text-primary-glow">{them.name}</Link>
            <div className="text-xs text-muted-foreground mt-0.5">Started {formatRelative(swap.startedAt)}</div>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3">
          <SkillBadge name={swap.skillA.name} type="learn" size="sm" />
          <ArrowLeftRight className="h-4 w-4 text-primary" />
          <SkillBadge name={swap.skillB.name} type="teach" size="sm" />
        </div>
        {swap.status === 'active' && (
          <div className="flex-1 max-w-[160px]">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>{swap.sessionsCompleted}/{swap.totalSessions} sessions</span>
              <span>{Math.round((swap.sessionsCompleted / swap.totalSessions) * 100)}%</span>
            </div>
            <Progress value={(swap.sessionsCompleted / swap.totalSessions) * 100} className="h-1.5" />
          </div>
        )}
        <div className="flex gap-2">
          {swap.status === 'pending' ? (
            <>
              <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground"><Check className="h-4 w-4 mr-1" /> Accept</Button>
              <Button size="sm" variant="ghost"><X className="h-4 w-4" /></Button>
            </>
          ) : swap.status === 'active' ? (
            <>
              <Link to={ROUTES.MESSAGE_THREAD(swap.id)}><Button size="sm" variant="secondary"><MessageSquare className="h-4 w-4 mr-1" /> Chat</Button></Link>
              <Button size="sm" variant="outline"><Calendar className="h-4 w-4 mr-1" /> Schedule</Button>
              <Button size="sm" onClick={onComplete} className="bg-primary hover:bg-primary-hover">Complete</Button>
            </>
          ) : (
            <Button size="sm" variant="ghost"><Star className="h-4 w-4 mr-1 text-warning" /> Review</Button>
          )}
        </div>
      </div>
      {void me; null}
    </Card>
  );
};

const ConnectionsPage = () => {
  const [active, setActive] = useState<Swap[] | null>(null);
  const [pending, setPending] = useState<Swap[] | null>(null);
  const [past, setPast] = useState<Swap[] | null>(null);
  const [celebrate, setCelebrate] = useState<Swap | null>(null);

  useEffect(() => {
    getSwaps().then(all => {
      setActive(all.filter(s => s.status === 'active'));
      setPast(all.filter(s => s.status === 'completed'));
    });
    getPendingSwaps().then(setPending);
  }, []);

  const handleComplete = (s: Swap) => {
    completeSwap(s.id);
    setActive(prev => prev ? prev.filter(x => x.id !== s.id) : prev);
    setPast(prev => prev ? [{ ...s, status: 'completed', completedAt: new Date().toISOString() }, ...prev] : prev);
    setCelebrate(s);
  };

  const renderList = (data: Swap[] | null, empty: string, withComplete = false) => {
    if (!data) return <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl shimmer" />)}</div>;
    if (data.length === 0) return <div className="text-center py-12 text-muted-foreground">{empty}</div>;
    return (
      <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} className="space-y-3">
        {data.map(s => (
          <motion.div key={s.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
            <SwapRow swap={s} onComplete={withComplete ? () => handleComplete(s) : undefined} />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold">Connections</h1>
        <p className="text-muted-foreground mt-1">Your active, pending, and past skill swaps.</p>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="active">Active ({active?.length ?? '…'})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pending?.length ?? '…'})</TabsTrigger>
          <TabsTrigger value="past">Past ({past?.length ?? '…'})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">{renderList(active, 'No active swaps yet.', true)}</TabsContent>
        <TabsContent value="pending" className="mt-6">{renderList(pending, 'No pending requests.')}</TabsContent>
        <TabsContent value="past" className="mt-6">{renderList(past, 'No completed swaps yet.')}</TabsContent>
      </Tabs>

      <CelebrationOverlay
        open={!!celebrate}
        userAName={celebrate?.participants[0].name ?? ''}
        userAAvatar={celebrate?.participants[0].avatar ?? ''}
        userBName={celebrate?.participants[1].name ?? ''}
        userBAvatar={celebrate?.participants[1].avatar ?? ''}
        onClose={() => setCelebrate(null)}
      />
    </div>
  );
};

export default ConnectionsPage;
