import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PixelAvatar } from './PixelAvatar';
import { SkillBadge } from './SkillBadge';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowLeftRight } from 'lucide-react';
import type { Listing } from '@/types';
import { formatRelative } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface Props { listing: Listing; }

export const ListingCard = ({ listing }: Props) => (
  <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
    <Card className="bg-gradient-card border-border hover:border-primary/50 p-5 shadow-card h-full flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <Badge variant="outline" className={listing.type === 'offer' ? 'border-success/40 text-success' : 'border-primary/40 text-primary-glow'}>
          {listing.type === 'offer' ? 'OFFERING' : 'WANTED'}
        </Badge>
        <span className="text-xs text-muted-foreground">{formatRelative(listing.createdAt)}</span>
      </div>
      <h3 className="mt-3 font-semibold text-lg leading-snug">{listing.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{listing.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <SkillBadge name={listing.skill.name} type={listing.type === 'offer' ? 'teach' : 'learn'} size="sm" level={listing.level} />
      </div>
      {listing.wantsInReturn && listing.wantsInReturn.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
            <ArrowLeftRight className="h-3 w-3" /> wants in return
          </div>
          <div className="flex flex-wrap gap-1.5">
            {listing.wantsInReturn.map(s => <SkillBadge key={s.id} name={s.name} type="learn" size="sm" />)}
          </div>
        </div>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/60">
        <Link to={ROUTES.PROFILE(listing.author.id)} className="flex items-center gap-2 group">
          <PixelAvatar src={listing.author.avatar} name={listing.author.name} size="sm" />
          <div className="text-xs">
            <div className="font-medium group-hover:text-primary transition-colors">{listing.author.name}</div>
            <div className="text-muted-foreground">★ {listing.author.rating} · {listing.responses} responses</div>
          </div>
        </Link>
        <Button size="sm" variant="secondary" className="gap-1.5">
          <MessageSquare className="h-3.5 w-3.5" /> Reply
        </Button>
      </div>
    </Card>
  </motion.div>
);
