import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SkillType } from '@/types';

interface SkillBadgeProps {
  name: string;
  type?: SkillType;
  level?: string;
  size?: 'sm' | 'md';
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const colorMap: Record<SkillType, string> = {
  teach: 'bg-success/15 text-success border-success/30',
  learn: 'bg-primary/15 text-primary-glow border-primary/30',
  neutral: 'bg-muted text-muted-foreground border-border',
};

export const SkillBadge = ({ name, type = 'neutral', level, size = 'md', selected, onClick, icon }: SkillBadgeProps) => {
  const Comp = onClick ? motion.button : motion.span;
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      whileTap={onClick ? { scaleX: [1, 0.85, 1.1, 1], scaleY: [1, 1.15, 0.9, 1] } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        colorMap[type],
        selected && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
        onClick && 'cursor-pointer hover:bg-card-hover'
      )}
    >
      {icon}
      <span>{name}</span>
      {level && <span className="opacity-70 text-[0.7em] uppercase tracking-wider">· {level}</span>}
    </Comp>
  );
};
