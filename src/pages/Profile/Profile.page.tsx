import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PixelAvatar } from '@/components/shared/PixelAvatar';
import { SkillBadge } from '@/components/shared/SkillBadge';
import { AvailabilityGrid } from '@/components/shared/AvailabilityGrid';
import { getUserById } from '@/api/users.api';
import { getReviewsForUser } from '@/api/reviews.api';
import type { User, Review } from '@/types';
import { MapPin, Star, Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { formatDate, formatRelative } from '@/utils/formatters';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    setUser(null); setReviews(null);
    getUserById(userId ?? 'me').then(u => {
      setUser(u);
      if (u) getReviewsForUser(u.id).then(setReviews);
    });
  }, [userId]);

  const isMe = userId === 'me' || user?.id === 'u-me';

  if (!user) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 space-y-4">
        <Skeleton className="h-40 rounded-2xl shimmer" />
        <div className="grid lg:grid-cols-3 gap-4">
          <Skeleton className="h-64 rounded-2xl shimmer lg:col-span-2" />
          <Skeleton className="h-64 rounded-2xl shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-card border-border p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow opacity-30" />
        <div className="relative flex flex-col md:flex-row gap-6 items-start">
          <PixelAvatar src={user.avatar} name={user.name} size="xl" online={user.isOnline} />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl lg:text-3xl font-bold">{user.name}</h1>
              {user.badges?.map(b => <Badge key={b} className="bg-primary/20 text-primary-glow border-primary/40">{b}</Badge>)}
            </div>
            <div className="text-sm text-muted-foreground">@{user.username}</div>
            <p className="mt-3 text-foreground/90 max-w-xl">{user.bio}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
              {user.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {user.location}</span>}
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-warning" /> {user.rating} rating</span>
              <span>{user.swapsCompleted} swaps completed</span>
              <span>Joined {formatDate(user.joinedAt)}</span>
            </div>
          </div>
          {!isMe && (
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary-hover gap-2"><Sparkles className="h-4 w-4" /> Connect</Button>
              <Button variant="outline" className="gap-2"><MessageSquare className="h-4 w-4" /> Message</Button>
            </div>
          )}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Teaches</div>
                <div className="flex flex-wrap gap-2">
                  {user.teachSkills.map(s => <SkillBadge key={s.skill.id} name={s.skill.name} type="teach" level={s.level} />)}
                  {user.teachSkills.length === 0 && <span className="text-sm text-muted-foreground">No teaching skills yet.</span>}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Learning</div>
                <div className="flex flex-wrap gap-2">
                  {user.learnSkills.map(s => <SkillBadge key={s.skill.id} name={s.skill.name} type="learn" level={s.level} />)}
                  {user.learnSkills.length === 0 && <span className="text-sm text-muted-foreground">Not actively learning.</span>}
                </div>
              </div>
            </div>
          </Card>

          {/* Reviews */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Reviews</h2>
            {!reviews ? (
              <div className="space-y-3">{Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg shimmer" />)}</div>
            ) : reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            ) : (
              <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="space-y-4">
                {reviews.map(r => (
                  <motion.div key={r.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <PixelAvatar src={r.fromUserAvatar} name={r.fromUserName} size="md" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm">{r.fromUserName}</span>
                        <span className="text-xs text-muted-foreground">{formatRelative(r.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < r.rating ? 'fill-warning text-warning' : 'text-muted-foreground/30'}`} />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">· {r.skill}</span>
                      </div>
                      <p className="text-sm mt-2">{r.comment}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          {/* Availability */}
          <Card className="bg-card border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-primary-glow" />
              <h2 className="text-lg font-semibold">Availability</h2>
            </div>
            <div className="overflow-x-auto">
              <AvailabilityGrid availability={user.availability} />
            </div>
            <p className="text-xs text-muted-foreground mt-3">Timezone: {user.timezone}</p>
          </Card>

          {!isMe && (
            <Card className="bg-gradient-card border-primary/30 p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary-glow" /> Compatibility</h2>
              <div className="text-5xl font-bold text-gradient mt-3">87%</div>
              <p className="text-sm text-muted-foreground mt-2">You both teach skills the other wants to learn — strong swap candidate.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
