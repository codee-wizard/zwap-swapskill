import { motion } from 'framer-motion';
import { Bell, MessageSquare, Sparkles, Star, Calendar, UserPlus, Info } from 'lucide-react';
import type { Notification, NotificationType } from '@/types';
import { cn } from '@/lib/utils';
import { formatRelative } from '@/utils/formatters';
import { PixelAvatar } from './PixelAvatar';

const iconMap: Record<NotificationType, React.ReactNode> = {
  match: <Sparkles className="h-4 w-4" />,
  message: <MessageSquare className="h-4 w-4" />,
  request: <UserPlus className="h-4 w-4" />,
  accepted: <Bell className="h-4 w-4" />,
  review: <Star className="h-4 w-4" />,
  session: <Calendar className="h-4 w-4" />,
  system: <Info className="h-4 w-4" />,
};

interface Props { n: Notification; onClick?: () => void; }

export const NotificationItem = ({ n, onClick }: Props) => (
  <motion.button
    onClick={onClick}
    whileHover={{ x: 2 }}
    className={cn(
      'w-full text-left flex items-start gap-3 p-3.5 rounded-lg border transition-colors',
      n.read ? 'bg-card border-border' : 'bg-primary/5 border-primary/30'
    )}
  >
    {n.avatar ? (
      <PixelAvatar src={n.avatar} name={n.title} size="md" />
    ) : (
      <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary-glow">
        {iconMap[n.type]}
      </div>
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 justify-between">
        <p className="font-medium text-sm">{n.title}</p>
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{formatRelative(n.createdAt)}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{n.body}</p>
    </div>
    {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-2" />}
  </motion.button>
);
