import { motion, useInView, type HTMLMotionProps } from 'framer-motion';
import { useRef, type PropsWithChildren } from 'react';

interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate'> {
  delay?: number;
  y?: number;
}

export const ScrollReveal = ({ children, delay = 0, y = 30, ...props }: PropsWithChildren<ScrollRevealProps>) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
