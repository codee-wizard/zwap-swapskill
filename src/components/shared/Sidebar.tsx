import { NavLink, Link } from 'react-router-dom';
import { Home, Compass, ClipboardList, Users, MessageSquare, Bell, User, Settings, LogOut } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { ZwapLogo } from './ZwapLogo';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  { to: ROUTES.HOME, label: 'Home', icon: Home },
  { to: ROUTES.DISCOVER, label: 'Discover', icon: Compass },
  { to: ROUTES.LISTINGS, label: 'Listings', icon: ClipboardList },
  { to: ROUTES.CONNECTIONS, label: 'Connections', icon: Users },
  { to: ROUTES.MESSAGES, label: 'Messages', icon: MessageSquare },
  { to: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell },
  { to: ROUTES.PROFILE_ME, label: 'Profile', icon: User },
  { to: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const sidebarOpen = useUIStore(s => s.sidebarOpen);
  const setSidebar = useUIStore(s => s.setSidebar);
  const logout = useAuthStore(s => s.logout);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-sidebar-border bg-sidebar h-screen sticky top-0">
        <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
          <ZwapLogo />
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {items.map(it => (
            <NavLink
              key={it.to}
              to={it.to}
              end
              className={({ isActive }) => cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary/15 text-primary-glow'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:translate-x-0.5'
              )}
            >
              <it.icon className="h-4 w-4 shrink-0" />
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
              onClick={() => setSidebar(false)}
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="lg:hidden fixed top-0 left-0 z-50 h-full w-60 bg-sidebar border-r border-sidebar-border flex flex-col"
            >
              <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
                <ZwapLogo />
              </div>
              <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                {items.map(it => (
                  <NavLink
                    key={it.to} to={it.to} end onClick={() => setSidebar(false)}
                    className={({ isActive }) => cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                      isActive ? 'bg-primary/15 text-primary-glow' : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    )}
                  >
                    <it.icon className="h-4 w-4" /> {it.label}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 h-14 border-t border-border bg-background/95 backdrop-blur-md flex items-center justify-around">
        {items.slice(0, 5).map(it => (
          <Link key={it.to} to={it.to} className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors">
            <it.icon className="h-5 w-5" />
            <span className="text-[10px]">{it.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};
