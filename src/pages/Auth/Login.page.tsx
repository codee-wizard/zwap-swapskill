import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants/routes';
import { isEmail, minLength } from '@/utils/validators';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoginPage = () => {
  const { login, loginAsGuest, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? ROUTES.HOME;

  const [email, setEmail] = useState('alex@zwap.app');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isEmail(email)) return setError('Enter a valid email.');
    if (!minLength(password, 6)) return setError('Password must be 6+ characters.');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  const guest = async () => {
    await loginAsGuest();
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-8 shadow-card">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome back to Zwap</h1>
        <p className="text-muted-foreground text-sm mt-1">Sign in to continue your swap journey.</p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-hover">
          {isLoading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
      </div>

      <Button onClick={guest} variant="outline" className="w-full gap-2">
        <Sparkles className="h-4 w-4 text-primary-glow" /> Continue as guest
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-6">
        New to Zwap? <Link to={ROUTES.ONBOARDING} className="text-primary-glow font-medium hover:underline">Create your profile</Link>
      </p>
    </motion.div>
  );
};

export default LoginPage;
