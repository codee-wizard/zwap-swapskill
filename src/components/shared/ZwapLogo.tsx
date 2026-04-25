import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import logo from '@/assets/zwap-logo.png';

export const ZwapLogo = ({ className, withText = true }: { className?: string; withText?: boolean }) => (
  <Link to={ROUTES.LANDING} className={cn('flex items-center gap-2 group', className)}>
    <motion.div
      whileHover={{ rotate: [0, -8, 8, 0] }}
      transition={{ duration: 0.5 }}
      className="h-9 w-9 rounded-lg border-2 border-dashed border-primary flex items-center justify-center bg-primary/10"
    >
      <img src={logo} alt="Zwap" className="h-6 w-6" />
    </motion.div>
    {withText && (
      <span className="text-xl font-bold tracking-tight">
        <span className="text-foreground">Z</span><span className="text-primary-glow">wap</span>
      </span>
    )}
  </Link>
);
