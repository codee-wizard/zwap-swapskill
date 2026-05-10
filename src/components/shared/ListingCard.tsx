import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PixelAvatar } from './PixelAvatar';
import { SkillBadge } from './SkillBadge';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowLeftRight, Bookmark } from 'lucide-react';
import type { Listing } from '@/types';
import { formatRelative } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useState } from 'react';

interface Props { listing: Listing; }

export const ListingCard = ({ listing }: Props) => {
  const [saved, setSaved] = useState(false);
  
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="h-full">
      <Card className="bg-card border-border/60 hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/10 transition-all duration-300 p-6 h-full flex flex-col rounded-2xl group">
        
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <Badge className={`font-semibold tracking-wide px-3 py-1 text-xs ${listing.type === 'offer' ? 'bg-success/15 text-success hover:bg-success/25 border-0' : 'bg-primary/15 text-primary-glow hover:bg-primary/25 border-0'}`}>
            {listing.type === 'offer' ? 'OFFERING' : 'WANTED'}
          </Badge>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">{formatRelative(listing.createdAt)}</span>
            <button onClick={(e) => { e.preventDefault(); setSaved(!saved); }} className="text-muted-foreground hover:text-primary transition-colors focus:outline-none group/btn">
              <Bookmark className={`h-4 w-4 transition-transform group-hover/btn:scale-110 ${saved ? 'fill-primary text-primary' : ''}`} />
            </button>
          </div>
        </div>

        {/* Middle: Title & Desc */}
        <h3 className="font-bold text-xl leading-tight text-foreground group-hover:text-primary transition-colors">{listing.title}</h3>
        <p className="mt-2 text-base text-muted-foreground/90 line-clamp-2 leading-relaxed">{listing.description}</p>

        {/* Skill Tag */}
        <div className="mt-4 mb-1">
          <SkillBadge name={listing.skill.name} type={listing.type === 'offer' ? 'teach' : 'learn'} size="sm" level={listing.level} />
        </div>
        
        {/* Exchange Section */}
        {listing.wantsInReturn && listing.wantsInReturn.length > 0 && (
          <div className="mt-4 p-3.5 bg-card-hover/50 rounded-xl border border-border/40 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground font-bold">
              <ArrowLeftRight className="h-3.5 w-3.5" /> WANTS IN RETURN
            </div>
            <div className="flex flex-wrap gap-2">
              {listing.wantsInReturn.map(s => <SkillBadge key={s.id} name={s.name} type="learn" size="sm" />)}
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/40">
          <Link to={ROUTES.PROFILE(listing.author.id)} className="flex items-center gap-3 group/user">
            <PixelAvatar src={listing.author.avatar} name={listing.author.name} size="sm" />
            <div className="text-sm">
              <div className="font-semibold text-foreground group-hover/user:text-primary transition-colors">{listing.author.name}</div>
              <div className="text-muted-foreground flex items-center gap-1.5 mt-0.5 text-xs font-medium">
                 <span className="text-yellow-500">★</span> {listing.author.rating} <span className="opacity-40">•</span> {listing.responses} replies
              </div>
            </div>
          </Link>
          <Button size="sm" className="gap-2 bg-primary hover:bg-primary-hover hover:scale-105 transition-transform shadow-sm font-semibold rounded-lg px-4">
            <MessageSquare className="h-4 w-4" /> Reply
          </Button>
        </div>

      </Card>
    </motion.div>
  );
};
