import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Props { steps: string[]; current: number; }

export const StepIndicator = ({ steps, current }: Props) => (
  <div className="flex items-center w-full">
    {steps.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={i} className="flex-1 flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors',
                done && 'bg-primary border-primary text-primary-foreground',
                active && 'border-primary text-primary bg-background',
                !done && !active && 'border-border text-muted-foreground bg-card'
              )}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn('mt-2 text-[10px] uppercase tracking-wider hidden sm:block', active ? 'text-primary' : 'text-muted-foreground')}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn('flex-1 h-0.5 mx-2 rounded-full transition-colors', done ? 'bg-primary' : 'bg-border')} />
          )}
        </div>
      );
    })}
  </div>
);
