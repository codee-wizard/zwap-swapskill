import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

import LandingPage from '@/pages/Landing/Landing.page';
import LoginPage from '@/pages/Auth/Login.page';
import OnboardingPage from '@/pages/Onboarding/Onboarding.page';
import HomePage from '@/pages/Home/Home.page';
import DiscoverPage from '@/pages/Discover/Discover.page';
import ListingsPage from '@/pages/Listings/Listings.page';
import ConnectionsPage from '@/pages/Connections/Connections.page';
import MessagesPage from '@/pages/Messages/Messages.page';
import ProfilePage from '@/pages/Profile/Profile.page';
import NotificationsPage from '@/pages/Notifications/Notifications.page';
import SettingsPage from '@/pages/Settings/Settings.page';
import ResourcesPage from '@/pages/Resources/Resources.page';
import NotFound from '@/pages/NotFound';

import { AppLayout } from '@/layouts/AppLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { LandingLayout } from '@/layouts/LandingLayout';

const PageWrap = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
    className="min-h-full"
  >
    {children}
  </motion.div>
);

export const AppRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split('/')[1] || 'root'}>
        <Route path={ROUTES.LANDING} element={<PublicRoute><LandingLayout><PageWrap><LandingPage /></PageWrap></LandingLayout></PublicRoute>} />
        <Route path={ROUTES.LOGIN} element={<PublicRoute redirectAuthed><AuthLayout><PageWrap><LoginPage /></PageWrap></AuthLayout></PublicRoute>} />
        <Route path={ROUTES.ONBOARDING} element={<PublicRoute><AuthLayout><PageWrap><OnboardingPage /></PageWrap></AuthLayout></PublicRoute>} />

        <Route path={ROUTES.HOME} element={<ProtectedRoute><AppLayout><PageWrap><HomePage /></PageWrap></AppLayout></ProtectedRoute>} />
        <Route path={ROUTES.DISCOVER} element={<ProtectedRoute><AppLayout><PageWrap><DiscoverPage /></PageWrap></AppLayout></ProtectedRoute>} />
        <Route path={ROUTES.LISTINGS} element={<ProtectedRoute><AppLayout><PageWrap><ListingsPage /></PageWrap></AppLayout></ProtectedRoute>} />
        <Route path={ROUTES.CONNECTIONS} element={<ProtectedRoute><AppLayout><PageWrap><ConnectionsPage /></PageWrap></AppLayout></ProtectedRoute>} />
        <Route path={ROUTES.MESSAGES} element={<ProtectedRoute><AppLayout><PageWrap><MessagesPage /></PageWrap></AppLayout></ProtectedRoute>} />
        <Route path="/messages/:swapId" element={<ProtectedRoute><AppLayout><PageWrap><MessagesPage /></PageWrap></AppLayout></ProtectedRoute>} />
        <Route path="/profile/:userId" element={<ProtectedRoute><AppLayout><PageWrap><ProfilePage /></PageWrap></AppLayout></ProtectedRoute>} />
        <Route path={ROUTES.NOTIFICATIONS} element={<ProtectedRoute><AppLayout><PageWrap><NotificationsPage /></PageWrap></AppLayout></ProtectedRoute>} />
        <Route path={ROUTES.RESOURCES} element={<ProtectedRoute><AppLayout><PageWrap><ResourcesPage /></PageWrap></AppLayout></ProtectedRoute>} />
        <Route path={ROUTES.SETTINGS} element={<ProtectedRoute><AppLayout><PageWrap><SettingsPage /></PageWrap></AppLayout></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};
