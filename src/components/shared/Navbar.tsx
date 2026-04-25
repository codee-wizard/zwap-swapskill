import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useNotificationsStore } from '@/store/notifications.store';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { ZwapLogo } from './ZwapLogo';
import { PixelAvatar } from './PixelAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const NAV = [
  { label: 'How it works', href: '/#how' },
  { label: 'Browse Skills', href: ROUTES.DISCOVER },
  { label: 'Community', href: '/#community' },
];

export const Navbar = ({ landing = false }: { landing?: boolean }) => {
  const { user, isAuthenticated } = useAuthStore();
  const unread = useNotificationsStore(s => s.unreadCount);
  const toggleSidebar = useUIStore(s => s.toggleSidebar);
  const location = useLocation();
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (unread > 0) {
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 600);
      return () => clearTimeout(t);
    }
  }, [unread]);

  if (landing) {
    return (
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <ZwapLogo />
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(n => (
              <Link key={n.href} to={n.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link to={ROUTES.HOME}><Button className="bg-primary hover:bg-primary-hover">Open app</Button></Link>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}><Button variant="ghost">Sign in</Button></Link>
                <Link to={ROUTES.ONBOARDING}><Button className="bg-primary hover:bg-primary-hover">Start Swapping</Button></Link>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border h-16 flex items-center px-4 lg:px-6">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden mr-2">
        <Menu className="h-5 w-5" />
      </Button>
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold capitalize">
          {location.pathname.split('/')[1] || 'Home'}
        </h1>
      </div>
      <div className="flex-1 max-w-xl mx-auto px-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search people, skills, listings…"
            className="w-full h-9 pl-9 pr-3 rounded-full bg-card border border-border focus:border-primary outline-none text-sm transition-colors"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link to={ROUTES.NOTIFICATIONS} className="relative">
          <Button variant="ghost" size="icon">
            <motion.div animate={shaking ? { rotate: [0, -10, 10, -8, 8, -5, 5, 0] } : { rotate: 0 }} transition={{ duration: 0.5 }}>
              <Bell className="h-5 w-5" />
            </motion.div>
          </Button>
          <AnimatePresence>
            {unread > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center"
              >
                {unread}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Link to={ROUTES.PROFILE_ME}>
          <PixelAvatar src={user?.avatar} name={user?.name ?? 'You'} size="md" online />
        </Link>
      </div>
    </header>
  );
};
