import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Availability, AvailabilitySlot, DayKey } from '@/types';

const DAYS: { key: DayKey; label: string }[] = [
  { key: 'mon', label: 'Mon' }, { key: 'tue', label: 'Tue' }, { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' }, { key: 'fri', label: 'Fri' }, { key: 'sat', label: 'Sat' }, { key: 'sun', label: 'Sun' },
];
const SLOTS: { key: AvailabilitySlot; label: string }[] = [
  { key: 'morning', label: 'AM' }, { key: 'afternoon', label: 'PM' }, { key: 'evening', label: 'EVE' },
];

interface AvailabilityGridProps {
  availability: Availability;
  editable?: boolean;
  onChange?: (next: Availability) => void;
  className?: string;
}

export const AvailabilityGrid = ({ availability, editable, onChange, className }: AvailabilityGridProps) => {
  const toggle = (day: DayKey, slot: AvailabilitySlot) => {
    if (!editable || !onChange) return;
    onChange({ ...availability, [day]: { ...availability[day], [slot]: !availability[day][slot] } });
  };
  return (
    <div className={cn('inline-grid gap-1.5', className)} style={{ gridTemplateColumns: 'auto repeat(7, minmax(0, 1fr))' }}>
      <div />
      {DAYS.map(d => <div key={d.key} className="text-[10px] uppercase tracking-wider text-muted-foreground text-center font-medium">{d.label}</div>)}
      {SLOTS.map(slot => (
        <>
          <div key={slot.key} className="text-[10px] uppercase tracking-wider text-muted-foreground self-center font-medium">{slot.label}</div>
          {DAYS.map(day => {
            const on = availability[day.key]?.[slot.key];
            return (
              <motion.button
                key={`${day.key}-${slot.key}`}
                type="button"
                whileTap={editable ? { scale: [1, 1.3, 1] } : undefined}
                onClick={() => toggle(day.key, slot.key)}
                className={cn(
                  'h-7 rounded-md border transition-colors',
                  on ? 'bg-success/30 border-success' : 'bg-card border-border hover:bg-card-hover',
                  !editable && 'cursor-default'
                )}
                aria-label={`${day.label} ${slot.label}`}
              >
                {on ? <span className="block h-1.5 w-1.5 mx-auto rounded-full bg-success" /> : null}
              </motion.button>
            );
          })}
        </>
      ))}
    </div>
  );
};
