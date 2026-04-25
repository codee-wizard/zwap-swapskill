import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants/routes';
import { type PropsWithChildren } from 'react';

export const PublicRoute = ({ children, redirectAuthed = false }: PropsWithChildren<{ redirectAuthed?: boolean }>) => {
  const { isAuthenticated } = useAuthStore();
  if (redirectAuthed && isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;
  return <>{children}</>;
};
