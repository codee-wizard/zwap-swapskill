import { motion, type HTMLMotionProps } from 'framer-motion';
import { type PropsWithChildren } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';
const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

interface SlideInProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'exit'> {
  direction?: Direction;
  delay?: number;
  duration?: number;
}

export const SlideIn = ({ children, direction = 'up', delay = 0, duration = 0.4, ...props }: PropsWithChildren<SlideInProps>) => {
  const o = offsets[direction];
  return (
    <motion.div
      initial={{ opacity: 0, ...o }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
