import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { initials } from '@/utils/formatters';
import { cn } from '@/lib/utils';

interface PixelAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-24 w-24 text-2xl',
};

export const PixelAvatar = ({ src, name, size = 'md', online, className }: PixelAvatarProps) => (
  <div className={cn('relative inline-block', className)}>
    <Avatar className={cn(sizeMap[size], 'ring-2 ring-border bg-card')}>
      {src && <AvatarImage src={src} alt={name} className="bg-card" />}
      <AvatarFallback className="bg-primary/20 text-primary font-pixel">
        {initials(name)}
      </AvatarFallback>
    </Avatar>
    {online !== undefined && (
      <span
        className={cn(
          'absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background',
          online ? 'bg-success' : 'bg-muted-foreground'
        )}
      />
    )}
  </div>
);
