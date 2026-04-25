import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { PixelAvatar } from './PixelAvatar';

interface Props {
  open: boolean;
  userAName: string;
  userAAvatar: string;
  userBName: string;
  userBAvatar: string;
  onLeaveReview?: () => void;
  onClose: () => void;
}

export const CelebrationOverlay = ({ open, userAName, userAAvatar, userBName, userBAvatar, onLeaveReview, onClose }: Props) => {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    if (!open) return;
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 }, colors: ['#7C3AED', '#22C55E', '#14B8A6', '#EAB308'] });
    setProgress(100);
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.max(0, 100 - ((Date.now() - start) / 5000) * 100);
      setProgress(p);
      if (p === 0) { clearInterval(id); onClose(); }
    }, 50);
    return () => clearInterval(id);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 0.95, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="bg-gradient-card border border-primary/40 rounded-2xl p-8 max-w-md text-center shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.svg
              width="80" height="80" viewBox="0 0 80 80" className="mx-auto"
            >
              <motion.circle cx="40" cy="40" r="36" fill="none" stroke="hsl(var(--success))" strokeWidth="4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              <motion.path d="M24 42 L36 54 L58 30" fill="none" stroke="hsl(var(--success))" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              />
            </motion.svg>
            <h2 className="text-2xl font-bold mt-4">Swap complete!</h2>
            <p className="text-muted-foreground mt-2">You and {userBName} finished your skill exchange.</p>

            <div className="flex items-center justify-center gap-3 mt-5">
              <PixelAvatar src={userAAvatar} name={userAName} size="lg" />
              <div className="text-2xl">🎉</div>
              <PixelAvatar src={userBAvatar} name={userBName} size="lg" />
            </div>

            <div className="mt-6 flex gap-2 justify-center">
              <Button onClick={onLeaveReview} className="bg-primary hover:bg-primary-hover">Leave a review</Button>
              <Button onClick={onClose} variant="ghost">Close</Button>
            </div>
            <div className="mt-4 h-1 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-primary transition-[width]" style={{ width: `${progress}%` }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
