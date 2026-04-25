import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeftRight, Bookmark, BookmarkCheck, Check, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PixelAvatar } from './PixelAvatar';
import { SkillBadge } from './SkillBadge';
import { Link } from 'react-router-dom';
import type { Match } from '@/types';
import { ROUTES } from '@/constants/routes';

interface MatchCardProps {
  match: Match;
  onConnect?: (id: string) => void;
}

export const MatchCard = ({ match, onConnect }: MatchCardProps) => {
  const [state, setState] = useState<'default' | 'connecting' | 'connected'>(
    match.status === 'connected' ? 'connected' : 'default'
  );
  const [saved, setSaved] = useState(false);

  const handleConnect = () => {
    setState('connecting');
    setTimeout(() => {
      setState('connected');
      onConnect?.(match.id);
    }, 700);
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <Card className="bg-gradient-card border-border hover:border-primary/50 transition-colors overflow-hidden p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <Link to={ROUTES.PROFILE(match.user.id)} className="flex items-center gap-3 group">
            <PixelAvatar src={match.user.avatar} name={match.user.name} size="lg" online={match.user.isOnline} />
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{match.user.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3" /> {match.user.location?.split(',')[0]}
              </div>
            </div>
          </Link>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/15 border border-primary/30">
              <Sparkles className="h-3 w-3 text-primary-glow" />
              <span className="text-xs font-bold text-primary-glow">{match.compatibility}%</span>
            </div>
            <button
              onClick={() => setSaved(s => !s)}
              className="text-muted-foreground hover:text-warning transition-colors p-1"
              aria-label="Save match"
            >
              {saved ? <BookmarkCheck className="h-4 w-4 text-warning" /> : <Bookmark className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">They teach</div>
            <div className="flex flex-wrap gap-1.5">
              {match.theyTeach.map(s => <SkillBadge key={s.id} name={s.name} type="teach" size="sm" />)}
            </div>
          </div>
          <div className="flex items-center justify-center text-muted-foreground">
            <ArrowLeftRight className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">You teach</div>
            <div className="flex flex-wrap gap-1.5">
              {match.youTeach.map(s => <SkillBadge key={s.id} name={s.name} type="learn" size="sm" />)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{match.sharedAvailability} shared time slots</span>
          <span>★ {match.user.rating}</span>
        </div>

        <motion.div className="mt-4">
          <Button
            onClick={handleConnect}
            disabled={state !== 'default'}
            className={
              state === 'connected'
                ? 'w-full bg-success hover:bg-success/90 text-success-foreground'
                : 'w-full bg-primary hover:bg-primary-hover'
            }
          >
            {state === 'connecting' && (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                <Sparkles className="h-4 w-4 mr-2" />
              </motion.div>
            )}
            {state === 'connected' ? <><Check className="h-4 w-4 mr-2" /> Sent</> :
              state === 'connecting' ? 'Sending…' : 'Connect'}
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};
