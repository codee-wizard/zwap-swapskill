import { Button } from '@/components/ui/button';
import { NotificationItem } from '@/components/shared/NotificationItem';
import { useNotificationsStore } from '@/store/notifications.store';
import { Bell, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationsPage = () => {
  const { notifications, unreadCount, markRead, markAllRead } = useNotificationsStore();

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 max-w-3xl">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2"><Bell className="h-6 w-6" /> Notifications</h1>
          <p className="text-muted-foreground mt-1">{unreadCount} unread</p>
        </div>
        <Button variant="outline" onClick={markAllRead} className="gap-2"><CheckCheck className="h-4 w-4" /> Mark all read</Button>
      </div>
      <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }} className="space-y-2">
        {notifications.map(n => (
          <motion.div key={n.id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
            <NotificationItem n={n} onClick={() => markRead(n.id)} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default NotificationsPage;
