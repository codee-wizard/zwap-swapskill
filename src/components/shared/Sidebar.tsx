import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Compass, Users, MessageSquare, Bell, Settings, LogOut } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { ZwapLogo } from './ZwapLogo';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.DISCOVER, label: 'Discover', icon: Compass },
  { to: ROUTES.CONNECTIONS, label: 'Connections', icon: Users },
  { to: ROUTES.MESSAGES, label: 'Messages', icon: MessageSquare },
  { to: ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell },
  { to: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const sidebarOpen = useUIStore(s => s.sidebarOpen);
  const setSidebar = useUIStore(s => s.setSidebar);
  const logout = useAuthStore(s => s.logout);

  const NavItems = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 flex flex-col gap-1 px-4 py-6">
      {items.map(it => (
        <NavLink
          key={it.to}
          to={it.to}
          end
          onClick={onClick}
          className={({ isActive }) => cn(
            'flex flex-row items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-150',
            isActive
              ? 'bg-primary/20 text-primary-glow'
              : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-foreground'
          )}
        >
          {({ isActive }) => (
            <>
              <it.icon className={cn("h-6 w-6 shrink-0", isActive ? "text-primary-glow" : "text-sidebar-foreground/70")} />
              <span>{it.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar — always visible, no collapse */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-sidebar-border bg-sidebar h-screen sticky top-0 z-50">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border shrink-0">
          <ZwapLogo />
        </div>

        <NavItems />

        {/* Sign out */}
        <div className="px-4 py-5 border-t border-sidebar-border shrink-0">
          <button
            onClick={logout}
            className="w-full flex flex-row items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-foreground transition-all"
          >
            <LogOut className="h-6 w-6 shrink-0" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
              onClick={() => setSidebar(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col"
            >
              <div className="h-16 flex items-center px-6 border-b border-sidebar-border shrink-0">
                <ZwapLogo />
              </div>
              <NavItems onClick={() => setSidebar(false)} />
              <div className="px-4 py-5 border-t border-sidebar-border shrink-0">
                <button
                  onClick={() => { logout(); setSidebar(false); }}
                  className="w-full flex flex-row items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-foreground transition-all"
                >
                  <LogOut className="h-6 w-6 shrink-0" />
                  <span>Sign out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 h-14 border-t border-border bg-background/95 backdrop-blur-md flex items-center justify-around">
        {items.slice(0, 5).map(it => (
          <Link
            key={it.to} to={it.to}
            className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
          >
            <it.icon className="h-5 w-5" />
            <span className="text-[10px]">{it.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};
