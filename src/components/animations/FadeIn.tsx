import { motion, type HTMLMotionProps } from 'framer-motion';
import { type PropsWithChildren } from 'react';

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'exit'> {
  delay?: number;
  duration?: number;
}

export const FadeIn = ({ children, delay = 0, duration = 0.3, ...props }: PropsWithChildren<FadeInProps>) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration, delay, ease: 'easeOut' }}
    {...props}
  >
    {children}
  </motion.div>
);
