import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Message } from '@/types';

interface Props { message: Message; isMine: boolean; }

export const MessageBubble = ({ message, isMine }: Props) => (
  <motion.div
    initial={{ x: isMine ? 20 : -20, rotate: isMine ? 2 : -2, opacity: 0 }}
    animate={{ x: 0, rotate: 0, opacity: 1 }}
    transition={{ duration: 0.18, ease: 'easeOut' }}
    className={cn('flex w-full', isMine ? 'justify-end' : 'justify-start')}
  >
    <div
      className={cn(
        'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-card',
        isMine
          ? 'bg-primary text-primary-foreground rounded-br-sm'
          : 'bg-card text-card-foreground rounded-bl-sm border border-border'
      )}
    >
      {message.text}
    </div>
  </motion.div>
);
