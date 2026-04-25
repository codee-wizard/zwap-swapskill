import { motion, type HTMLMotionProps } from 'framer-motion';
import { Children, type PropsWithChildren } from 'react';

interface StaggerProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'variants'> {
  delay?: number;
  staggerDelay?: number;
}

export const StaggerChildren = ({ children, delay = 0, staggerDelay = 0.08, ...props }: PropsWithChildren<StaggerProps>) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={{
      hidden: {},
      show: { transition: { delayChildren: delay, staggerChildren: staggerDelay } },
    }}
    {...props}
  >
    {Children.map(children, (child, i) => (
      <motion.div
        key={i}
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
        }}
      >
        {child}
      </motion.div>
    ))}
  </motion.div>
);
